# Postgraduate 1st Year (PG-1) — Chapter 6: Responsible AI

---

## Lesson 1: Transparent AI

### 1. Metadata and Syllabus Mapping
- **Academic Level:** Postgraduate 1st Year (PG-1)
- **Chapter:** 6. Responsible AI
- **Lesson Title:** Transparent AI
- **Syllabus Topic:** Mechanistic Interpretability, Induction Heads, Residual Stream Decomposition, Probing Representations, and Logit Lens.
- **Bloom's Taxonomy Level:** Level 5 (Evaluate) & Level 6 (Create)

---

### 2. Learning Outcomes and Prerequisites
- **Learning Outcomes:**
  1. Analyze Transformer internal representations using the Linear Representation Hypothesis and Residual Stream decomposition.
  2. Implement an activation patching and logit lens diagnostic harness to pinpoint circuits responsible for specific in-context behaviors (e.g., induction heads, indirect object identification).
  3. Train linear probes to detect latent knowledge and evaluate whether representations reflect truthful states versus deceptive generation.
- **Prerequisites:** Transformer architecture internals (Q, K, V projections, residual streams), linear algebra (SVD, projections), and PyTorch.

---

### 3. Realistic Professional Scenario
You are a Lead AI Alignment Researcher at a major foundation model lab. During red-teaming evaluations of a 14B parameter reasoning model, the model demonstrates "sycophancy" (agreeing with demonstrably false user assertions) and conceals strategic goal formulations in its internal representations. Traditional post-hoc explainability methods like SHAP and Integrated Gradients fail to reveal the underlying mechanisms because they treat the model as a black box.

Your mandate is to perform mechanistic interpretability on the model: decompose the residual stream, locate the specific attention heads that mediate sycophantic behavior using activation patching, and surgically edit or ablate the circuits to enforce epistemic truthfulness without degrading general reasoning capabilities.

---

### 4. Mathematical and Conceptual Foundations

#### A. The Residual Stream as a Communication Channel
In Transformer models (Elhage et al., Anthropic), the residual stream $\mathbf{x}_l$ acts as a shared linear bus of dimension $d_{\text{model}}$:
$$\mathbf{x}_L = \mathbf{x}_0 + \sum_{l=1}^L \sum_{h=1}^H \text{head}_{l, h}(\mathbf{x}_{l-1}) + \sum_{l=1}^L \text{mlp}_l(\mathbf{x}_{l-1})$$
Each attention head and MLP layer reads from the residual stream via projection and writes its output directly back to the stream additively:
$$\Delta \mathbf{x}_{l, h} = \mathbf{W}_O^{(l, h)} \text{Attention}(\mathbf{W}_Q \mathbf{x}, \mathbf{W}_K \mathbf{x}, \mathbf{W}_V \mathbf{x})$$

#### B. The Logit Lens
Because the final prediction is obtained by applying the unembedding matrix $\mathbf{W}_U \in \mathbb{R}^{d_{\text{model}} \times V}$ to the final stream state $\mathbf{x}_L$:
$$\mathbf{y} = \text{Softmax}(\mathbf{W}_U \text{LayerNorm}(\mathbf{x}_L))$$
The **Logit Lens** applies $\mathbf{W}_U$ directly to intermediate states $\mathbf{x}_l$ across layers $l \in \{1, \dots, L-1\}$. This reveals at which layer the model converges on candidate token predictions.

#### C. Activation Patching (Causal Tracing)
To determine if a specific head $h$ in layer $l$ causally mediates a task:
1. Run a clean prompt: $P_{\text{clean}} \to \mathbf{y}_{\text{clean}}$
2. Run a corrupted prompt: $P_{\text{corrupt}} \to \mathbf{y}_{\text{corrupt}}$
3. Replace the activation of head $(l, h)$ in the corrupted run with the activation from the clean run: $\mathbf{a}_{l, h}^{\text{patched}} = \mathbf{a}_{l, h}^{\text{clean}}$
4. Measure the recovery of clean logit difference:
$$\text{Causal Effect} = \frac{\text{LogitDiff}(\mathbf{y}_{\text{patched}}) - \text{LogitDiff}(\mathbf{y}_{\text{corrupt}})}{\text{LogitDiff}(\mathbf{y}_{\text{clean}}) - \text{LogitDiff}(\mathbf{y}_{\text{corrupt}})}$$

---

### 5. Mechanistic Circuit Diagram

```mermaid
graph TD
    A[Token Inputs: [A] [B] ... [A]] --> B[Layer 0 Residual Stream]
    B --> C[Layer 1: Previous-Token Head L1H4]
    C -->|Copies Token Identity to Next Position| D[Layer 2 Residual Stream]
    D --> E[Layer 3: Induction Head L3H2]
    E -->|Searches for Prior [A] and Predicts [B]| F[Logit Lens Projection W_U]
    F --> G[Predicted Output Token: [B]]
```

---

### 6. Guided Technical Implementation: Logit Lens & Activation Probing

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MiniTransformerBlock(nn.Module):
    """Minimal transformer block tracking residual stream additions."""
    def __init__(self, d_model: int):
        super().__init__()
        self.attn = nn.Linear(d_model, d_model)
        self.mlp = nn.Sequential(
            nn.Linear(d_model, d_model * 2),
            nn.GELU(),
            nn.Linear(d_model * 2, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Residual connection 1: Attention
        x = x + self.attn(self.norm1(x))
        # Residual connection 2: MLP
        x = x + self.mlp(self.norm2(x))
        return x

class MechanisticModel(nn.Module):
    def __init__(self, vocab_size: int = 100, d_model: int = 64, num_layers: int = 4):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, d_model)
        self.layers = nn.ModuleList([MiniTransformerBlock(d_model) for _ in range(num_layers)])
        self.ln_final = nn.LayerNorm(d_model)
        self.unembed = nn.Linear(d_model, vocab_size, bias=False)

    def forward_with_residual_trace(self, input_ids: torch.Tensor):
        """Executes forward pass while collecting residual stream snapshots."""
        stream = self.embed(input_ids)
        snapshots = [stream.clone()]

        for layer in self.layers:
            stream = layer(stream)
            snapshots.append(stream.clone())

        stream = self.ln_final(stream)
        logits = self.unembed(stream)
        return logits, snapshots

def logit_lens_analysis(model: MechanisticModel, input_ids: torch.Tensor, target_token_id: int):
    """Projects intermediate residual stream states directly to vocabulary logits."""
    model.eval()
    with torch.no_grad():
        logits, snapshots = model.forward_with_residual_trace(input_ids)

        print(f"\n--- LOGIT LENS ANALYSIS (Target Token ID: {target_token_id}) ---")
        for layer_idx, state in enumerate(snapshots):
            # Project intermediate state through final unembedding
            normed_state = model.ln_final(state)
            intermediate_logits = model.unembed(normed_state)
            
            # Extract last token position probabilities
            probs = F.softmax(intermediate_logits[0, -1, :], dim=-1)
            target_prob = probs[target_token_id].item()
            top_token = torch.argmax(probs).item()
            print(f"Layer {layer_idx:02d} | Target Prob: {target_prob:.4f} | Top Predicted Token: {top_token}")

if __name__ == "__main__":
    torch.manual_seed(42)
    model = MechanisticModel()
    dummy_input = torch.tensor([[12, 45, 88, 12]]) # Pattern repeats token 12
    target_token = 45 # In-context pattern predicts 45 follows 12

    logit_lens_analysis(model, dummy_input, target_token)
```

---

### 7. Interactive Research Mission: "The Induction Head Hunt"
- **Mission Environment:** A pre-trained 6-layer Transformer undergoing mechanistic reverse-engineering.
- **Mission Goal:**
  - Create random repeated sequences $[A, B, C, \dots, A, ?]$.
  - Run activation patching across all $6 \times 8 = 48$ attention heads.
  - Locate the induction heads (heads that attend to $B$ given $A$ in the prompt prefix) and report their layer/head indices.
- **Victory Condition:** Successfully identify the induction circuit with $>90\%$ causal attribution score while achieving zero false-positive head deletions.

---

### 8. Practical Research Activity
1. Implement a Linear Representation Probe to test whether the concept of truthfulness is linearly represented:
   - Construct pairs of true/false factual statements.
   - Extract residual stream vectors at middle layers.
   - Train a logistic regression probe: $P(\text{True}) = \sigma(\mathbf{w}^T \mathbf{x} + b)$.
2. Measure probe accuracy on out-of-distribution evaluation datasets.

---

### 9. Deliverable Specifications
- A fully reproducible Python script executing Logit Lens analysis and causal activation patching.
- A heat map visualization matrix plotting Causal Effect across all layers and attention heads.
- A research report analyzing the linearity of semantic representations in the residual stream.

---

### 10. Evaluation Criteria & Technical Metrics
- **Causal Rigor (35%):** Correct application of activation patching with appropriate counterfactual baselines.
- **Circuit Identification Accuracy (35%):** Definitive localization of attention circuits (e.g., previous-token, induction, duplicate-token heads).
- **Probing Validity (15%):** Addressing potential probe memorization via cross-validation and control probes (Hewitt & Liang).
- **Scientific Clarity (15%):** Precise mathematical descriptions adhering to the Anthropic Mechanistic Interpretability taxonomy.

---

### 11. Olympiad-Style Assessments

#### Conceptual Assessment
According to the Linear Representation Hypothesis in mechanistic interpretability, how are semantic concepts (such as "truthfulness" or "sentiment") organized within the high-dimensional activations of large language models?
- A) Concepts are encoded as discrete, disjoint clusters across individual isolated neurons (one neuron per concept).
- B) Concepts are represented as linear directions (one-dimensional subspaces) in the model's activation space, where projecting an activation onto the concept vector yields the concept's value.
- C) Concepts can only be extracted by non-linear deep convolutional networks.
- D) Semantic concepts exist only in the attention weights and never enter the residual stream.

#### Applied Scenario Assessment
You are patching activations from a clean prompt into a corrupted prompt to identify which layer writes the final answer into the residual stream. You notice that patching Layer 8 restores $85\%$ of the logit difference, but patching the MLP of Layer 8 only restores $10\%$, and patching individual attention heads in Layer 8 restores at most $12\%$ each. What does this indicate?
- A) The experiment is broken and must be restarted.
- B) The causal contribution in Layer 8 is mediated by an ensemble of attention heads working in parallel, where individual heads distribute the computation rather than relying on a single dominant head.
- C) The model is hallucinating random numbers.
- D) The residual stream is non-linear at Layer 8.

---

### 12. Assessment Solutions & Scoring Guidance
- **Conceptual Answer:** **B**. The Linear Representation Hypothesis posits that features correspond to 1D direction vectors in activation space, enabling linear extraction and steering via vector arithmetic.
- **Applied Scenario Answer:** **B**. Distributed circuits frequently utilize multiple attention heads operating concurrently to write different components of a representation into the residual stream.

---

### 13. Limitations, Risks, and Responsible-AI Considerations
- **Polysemanticity & Superposition:** Individual neurons frequently activate on multiple unrelated concepts because the model packs more features than available dimensions (Toy Models of Superposition). Linear probes can produce false confidence if features are entangled.
- **Surgical Steering Risks:** Ablating circuits to reduce toxicity can inadvertently degrade downstream reasoning or safety refusal boundaries.

---

### 14. Completion Criteria & Milestone Feedback
- Complete the activation patching matrix across all attention heads.
- Achieve probe classification accuracy $> 85\%$ on holdout factual evaluations.
- **Milestone Unlocked:** `Mechanistic Interpretability Pioneer` (Level PG-1).

---
---

## Lesson 2: Trustworthy AI Systems

### 1. Metadata and Syllabus Mapping
- **Academic Level:** Postgraduate 1st Year (PG-1)
- **Chapter:** 6. Responsible AI
- **Lesson Title:** Trustworthy AI Systems
- **Syllabus Topic:** Certified Adversarial Robustness, Randomized Smoothing, Conformal Prediction with Finite-Sample Guarantees, and Differential Privacy ($(\epsilon, \delta)$-DP).
- **Bloom's Taxonomy Level:** Level 5 (Evaluate) & Level 6 (Create)

---

### 2. Learning Outcomes and Prerequisites
- **Learning Outcomes:**
  1. Prove and implement certified adversarial robustness bounds using Randomized Smoothing under $\ell_2$ norm perturbations.
  2. Implement Conformal Prediction to produce mathematically guaranteed prediction sets with distribution-free, finite-sample coverage coverage error $\le \alpha$.
  3. Formulate and train differentially private models using DP-SGD with Rényi Differential Privacy (RDP) accounting.
- **Prerequisites:** Probability theory, concentration inequalities, convex optimization, and PyTorch Opacus basics.

---

### 3. Realistic Professional Scenario
You are the Chief AI Safety Officer for an autonomous surgical robotics and radiological diagnostics platform. Regulators from the FDA and the European Medicines Agency (EMA) have issued strict compliance mandates:
1. The diagnostic classifier must provide a **formal mathematical guarantee** that its predictions cannot be altered by input perturbations (sensor noise or adversarial attacks) within an $\ell_2$ radius $R = 0.5$.
2. Any confidence score provided to surgeons must have **provable finite-sample calibration**: if the system reports $95\%$ confidence, the true diagnosis must fall within the prediction set with probability $\ge 0.95$, regardless of underlying data distribution.

Standard empirical defense methods (like adversarial training or temperature scaling) do not satisfy these statutory requirements because they provide zero formal guarantees. Your mandate is to construct a certified pipeline using Randomized Smoothing and Split Conformal Prediction.

---

### 4. Mathematical Foundations

#### A. Certified Robustness via Randomized Smoothing (Cohen et al.)
Let $f: \mathbb{R}^d \to \mathcal{Y}$ be an arbitrary base classifier. Define the smoothed classifier $g(\mathbf{x})$:
$$g(\mathbf{x}) = \arg\max_{c \in \mathcal{Y}} \mathbb{P}_{\mathbf{\epsilon} \sim \mathcal{N}(0, \sigma^2 \mathbf{I})}(f(\mathbf{x} + \mathbf{\epsilon}) = c)$$
Let $p_A = \mathbb{P}(f(\mathbf{x} + \mathbf{\epsilon}) = c_A)$ be the probability of the most likely class, and $p_B = \max_{c \ne c_A} \mathbb{P}(f(\mathbf{x} + \mathbf{\epsilon}) = c)$ be the probability of the second most likely class.

If $p_A > p_B$, then the smoothed classifier $g(\mathbf{x} + \mathbf{\delta}) = c_A$ is **provably constant** for all perturbations $\|\mathbf{\delta}\|_2 < R$, where the certified radius is:
$$R = \frac{\sigma}{2} \left( \Phi^{-1}(p_A) - \Phi^{-1}(p_B) \right)$$
where $\Phi^{-1}$ is the inverse standard Gaussian CDF (probit function).

#### B. Distribution-Free Conformal Prediction
Given calibration data $\{(\mathbf{x}_i, y_i)\}_{i=1}^n$ drawn exchangeably from an unknown distribution, define non-conformity scores:
$$s_i = 1 - \hat{f}(\mathbf{x}_i)_{y_i}$$
For a target error rate $\alpha \in (0, 1)$, define the critical quantile $\hat{q}$:
$$\hat{q} = \text{Quantile}\left(\{s_1, \dots, s_n\}, \frac{\lceil (n + 1)(1 - \alpha) \rceil}{n}\right)$$
For a new unseen point $\mathbf{x}_{n+1}$, the prediction set:
$$C(\mathbf{x}_{n+1}) = \left\{ c \in \mathcal{Y} : 1 - \hat{f}(\mathbf{x}_{n+1})_c \le \hat{q} \right\}$$
guarantees finite-sample coverage:
$$\mathbb{P}\left(Y_{n+1} \in C(\mathbf{X}_{n+1})\right) \ge 1 - \alpha$$

---

### 5. Certified Trust Architecture

```mermaid
graph TD
    A[Medical Imaging Input X] --> B[Randomized Gaussian Noise Sampling: epsilon ~ N 0, sigma^2 I]
    B --> C[Monte Carlo Inference Across N=10,000 Samples]
    C --> D[Confidence Bound Estimation: Clopper-Pearson Test]
    D --> E[Compute Certified Radius R]
    E -->|Perturbation ||delta|| < R| F[Guaranteed Stable Prediction c_A]
    A --> G[Conformal Prediction Engine: Calibration Quantile q_hat]
    G --> H[Provably Calibrated Prediction Set C_X: Coverage >= 1 - alpha]
```

---

### 6. Guided Technical Implementation: Conformal Prediction & Certified Radius

```python
import numpy as np
from scipy.stats import norm

class TrustworthyPredictor:
    """Implements Randomized Smoothing Certification and Conformal Prediction."""
    
    @staticmethod
    def compute_certified_radius(p_a_lower: float, p_b_upper: float, sigma: float = 0.5) -> float:
        """
        Computes Cohen's certified L2 radius.
        Returns 0.0 if p_a_lower <= 0.5 (cannot certify).
        """
        if p_a_lower <= 0.5:
            return 0.0
        radius = (sigma / 2.0) * (norm.ppf(p_a_lower) - norm.ppf(p_b_upper))
        return max(0.0, float(radius))

    @staticmethod
    def split_conformal_prediction(
        calib_probs: np.ndarray, 
        calib_labels: np.ndarray, 
        alpha: float = 0.05
    ) -> float:
        """
        Computes the conformal non-conformity quantile q_hat.
        Guarantees 1 - alpha coverage on exchangeable test distributions.
        """
        n = len(calib_labels)
        # Non-conformity score: 1 - prob(true_class)
        true_class_probs = calib_probs[np.arange(n), calib_labels]
        nonconformity_scores = 1.0 - true_class_probs

        # Finite-sample adjusted quantile
        quantile_idx = int(np.ceil((n + 1) * (1.0 - alpha))) / n
        q_hat = np.quantile(nonconformity_scores, min(1.0, quantile_idx), method="higher")
        return float(q_hat)

    @staticmethod
    def get_prediction_set(test_probs: np.ndarray, q_hat: float) -> list:
        """Constructs calibrated prediction sets where 1 - prob <= q_hat."""
        prediction_sets = []
        for p in test_probs:
            valid_classes = np.where((1.0 - p) <= q_hat)[0].tolist()
            prediction_sets.append(valid_classes)
        return prediction_sets

if __name__ == "__main__":
    print("=== TRUSTWORTHY AI CERTIFICATION ENGINE ===")
    
    # 1. Verification of Certified Radius
    sigma = 0.5
    p_a = 0.88 # Lower confidence bound on Top class
    p_b = 0.08 # Upper confidence bound on 2nd class
    radius = TrustworthyPredictor.compute_certified_radius(p_a, p_b, sigma)
    print(f"Randomized Smoothing Certified L2 Radius: R = {radius:.4f} (sigma = {sigma})")

    # 2. Conformal Prediction Calibration
    np.random.seed(42)
    n_calib = 1000
    num_classes = 5
    
    # Simulate calibration probabilities
    simulated_probs = np.random.dirichlet(np.ones(num_classes) * 0.5, size=n_calib)
    simulated_labels = np.random.randint(0, num_classes, size=n_calib)

    alpha = 0.05 # 95% guaranteed coverage
    q_hat = TrustworthyPredictor.split_conformal_prediction(simulated_probs, simulated_labels, alpha)
    print(f"Conformal Calibration Quantile (1 - alpha = 0.95): q_hat = {q_hat:.4f}")

    # Generate prediction set for a test case
    test_case = np.array([[0.70, 0.15, 0.05, 0.08, 0.02]])
    pred_set = TrustworthyPredictor.get_prediction_set(test_case, q_hat)
    print(f"Test Case Prediction Set with 95% Certified Coverage: {pred_set[0]}")
```

---

### 7. Interactive Engineering Mission: "The Provable Defense Tournament"
- **Mission Scenario:** An adversarial attacker executes untracked projected gradient descent (PGD-100) attacks against an intensive care unit vital signs monitor.
- **Mission Challenge:**
  - Build a smoothed classifier with parameter $\sigma = 0.25$.
  - Evaluate certified accuracy curves from $R = 0.0$ to $R = 1.0$.
  - Maintain certified accuracy $\ge 72.0\%$ at radius $R = 0.50$ while maintaining unperturbed accuracy $\ge 88.0\%$.

---

### 8. Practical Research Activity
1. Implement Differentially Private Stochastic Gradient Descent (DP-SGD) using gradient clipping and Gaussian noise injection:
   $$\mathbf{g}_t = \frac{1}{|B|} \left( \sum_{i \in B} \text{clip}\left(\nabla_\theta \mathcal{L}_i, C\right) + \mathcal{N}\left(0, \sigma^2 C^2 \mathbf{I}\right) \right)$$
2. Track the privacy loss budget $(\epsilon, \delta)$ using Rényi Differential Privacy (RDP) composition.
3. Quantify the Pareto trade-off between privacy budget $\epsilon$ and final validation accuracy.

---

### 9. Deliverable Specifications
- A fully reproducible Python module executing Randomized Smoothing and Split Conformal Prediction.
- Certified accuracy vs. $\ell_2$ radius plots comparing smoothed base classifiers.
- A technical regulatory compliance brief satisfying FDA SaMD (Software as a Medical Device) guidelines.

---

### 10. Evaluation Criteria & Technical Metrics
- **Mathematical Soundness (35%):** Correct Clopper-Pearson binomial confidence interval bounding in randomized smoothing.
- **Calibration Precision (35%):** Empirical validation that conformal prediction coverage error strictly satisfies $\le \alpha$.
- **Privacy Budgeting (15%):** Validated Rényi DP accounting with zero information leakage.
- **Code Performance (15%):** Vectorized Monte Carlo inference routines.

---

### 11. Olympiad-Style Assessments

#### Conceptual Assessment
In Split Conformal Prediction, what fundamental assumption is required for the finite-sample coverage guarantee $\mathbb{P}(Y_{n+1} \in C(X_{n+1})) \ge 1 - \alpha$ to hold mathematically?
- A) The data must follow a multivariate Gaussian distribution.
- B) The base neural network must be strictly convex.
- C) The calibration and test sample pairs $\{(X_i, Y_i)\}_{i=1}^{n+1}$ must be exchangeable (e.g., independently and identically distributed - i.i.d.).
- D) The number of calibration samples $n$ must approach infinity ($n \to \infty$).

#### Applied Scenario Assessment
A team claims that adversarial training with PGD defends a neural network against all $\ell_\infty$ perturbations up to $\epsilon = 8/255$. When evaluated against an adaptive AutoAttack suite, the accuracy drops to $2\%$. Why did the empirical defense fail?
- A) PGD is incompatible with GPUs.
- B) The model suffered from gradient masking (obfuscated gradients), creating a false sense of security during standard PGD while remaining fragile to zero-order or adaptive attacks. Certified defenses are required for true robustness.
- C) The batch size was too small during testing.
- D) Conformal prediction was applied incorrectly.

---

### 12. Assessment Solutions & Scoring Guidance
- **Conceptual Answer:** **C**. Exchangeability is the sole requirement for conformal prediction; it is distribution-free and provides exact finite-sample guarantees for any finite $n$.
- **Applied Scenario Answer:** **B**. Heuristic empirical defenses frequently induce gradient masking, leading to apparent robustness that collapses under adaptive attacks (Athalye et al., ICML 2018).

---

### 13. Limitations, Risks, and Responsible-AI Considerations
- **The "Curse of Dimensionality" in Smoothing:** As input dimensionality $d$ grows into millions (high-resolution video), the certified radius $R$ decays $\mathcal{O}(1/\sqrt{d})$ unless structure-aware smoothing is used.
- **Prediction Set Utility:** At high error tolerance (e.g., $\alpha = 0.01$), conformal prediction sets can become vacuous (containing all classes) if the base model is severely uncalibrated.

---

### 14. Completion Criteria & Milestone Feedback
- Attain certified radius $R \ge 0.40$ on test data with Clopper-Pearson error probability $\alpha < 0.001$.
- Implement a verified conformal prediction pipeline with empirical coverage $\ge 95\%$.
- **Milestone Unlocked:** `Certified AI Trust & Safety Architect` (Level PG-1).
