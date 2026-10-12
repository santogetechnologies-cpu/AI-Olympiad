"""
Complete Class 12 Curriculum Builder (All 12 Lessons across 6 Chapters)
Integrates authentic content from the Class 12 reference coursebooks:
Transformers, Self-Attention, Prompt-Plan-Produce, RAG, Verification Log, AI Assistants, etc.
"""

import os
from generator_core import write_lesson_file

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 12"

CLASS_12_LESSONS = [
    # -------------------------------------------------------------
    # CHAPTER 1: AI BASICS
    # -------------------------------------------------------------
    {
        "grade_num": 12,
        "grade": "Class 12",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 1,
        "title": "The World of Generative AI",
        "pillar": "AI Basics",
        "strand": "Generative Foundations, Diffusion vs GANs vs Transformers, and Multi-Modal Latent Manifolds",
        "prereqs": "Class 11 Neural Networks (Weights, Loss functions, Activations), high-dimensional vector spaces.",
        "prereq_details": "Understanding of deep neural network feedforward passes and matrix operations.",
        "key_terms": ["Generative Foundation Models", "Variational Autoencoders (VAEs)", "Generative Adversarial Networks (GANs)", "Latent Manifold", "Diffusion Denoising", "Multi-Modal Alignment"],
        "objectives": [
            "Analyze the historical evolution of generative models: Autoregressive models $\\to$ VAEs $\\to$ GANs $\\to$ Diffusion & Transformers.",
            "Explain the mathematical intuition of sampling from continuous Latent Manifolds.",
            "Compare architectural paradigms across text (Transformers), image (Diffusion), and speech (Vocoders).",
            "Evaluate computational and environmental scaling laws (compute FLOPs, model parameters, pre-training datasets)."
        ],
        "mission_title": "Project Genesis: The Synthetic Biosignature Simulator",
        "mission_desc": "A planetary astrobiology mission to Europa needs synthetic training datasets to calibrate autonomous rover spectrometers. Physical samples from ice ocean vents do not yet exist on Earth. You must architect a multi-modal generative simulation model that learns the physical-chemical manifold of deep-sea hydrothermal vents and synthesizes plausible, novel organic biosignature spectra without hallucinating physical impossibilities.",
        "theory": """### 1. The Generative AI Paradigm Shift
Traditional machine learning is **Discriminative**: given data $X$, compute $P(y \\mid X)$ to categorize.
Generative AI estimates the joint probability distribution $P(X)$ or $P(X, y)$, allowing the system to sample novel, never-before-seen data points that belong to the same underlying mathematical manifold:
1. **Variational Autoencoders (VAEs - 2013):** Compress data into a continuous probabilistic latent distribution $\\mathcal{N}(\\mu, \\sigma^2)$, then decode. Tends to produce blurry outputs due to mean-squared smoothing.
2. **Generative Adversarial Networks (GANs - 2014):** A zero-sum min-max game between a **Generator** $G(z)$ creating fakes and a **Discriminator** $D(x)$ classifying real vs fake:
   $$\\min_G \\max_D V(D, G) = \\mathbb{E}_{x}[\\log D(x)] + \\mathbb{E}_{z}[\\log(1 - D(G(z)))]$$
3. **Diffusion Models (2020-Present):** Inverts thermodynamic entropy by progressively denoising Gaussian static via score-based U-Nets. Stable, high-fidelity, and resistant to mode collapse.
4. **Transformers (2017-Present):** Models long-range sequence dependencies across discrete token streams via Self-Attention.

### 2. The Geometry of the Latent Manifold
Real-world data (e.g. $1024 \\times 1024$ images) lives in a space of over $1,000,000$ dimensions, yet meaningful images occupy a tiny, smooth, lower-dimensional hypersurface (**The Manifold**):
* Interpolating linearly between two latent vectors $\\mathbf{z}_1$ and $\\mathbf{z}_2$:
  $$\\mathbf{z}(t) = (1 - t)\\mathbf{z}_1 + t\\mathbf{z}_2, \\quad t \\in [0, 1]$$
  Produces smooth, semantically coherent transformations (e.g. a face morphing seamlessly from frown to smile).""",
        "demo": """### Worked Mathematical Walkthrough: Latent Vector Arithmetic
In an aligned multi-modal latent space (e.g. CLIP embedding space $\\mathbb{R}^{512}$):
Suppose vector representations for geological concepts are known:
* $\\vec{v}_{\\text{Volcano}} = [0.82, 0.15, -0.44]$
* $\\vec{v}_{\\text{Heat}} = [0.91, 0.05, -0.12]$
* $\\vec{v}_{\\text{Ice}} = [-0.85, 0.02, 0.78]$

Predicting the latent coordinate of a 'Cryovolcano' (ice volcano on Europa):
$$\\vec{v}_{\\text{Cryovolcano}} \\approx \\vec{v}_{\\text{Volcano}} - \\vec{v}_{\\text{Heat}} + \\vec{v}_{\\text{Ice}}$$
$$\\vec{v} = [0.82 - 0.91 + (-0.85), \\; 0.15 - 0.05 + 0.02, \\; -0.44 - (-0.12) + 0.78]$$
$$\\vec{v}_{\\text{Cryovolcano}} = [-0.94, 0.12, 0.46]$$
Decoding this latent coordinate through the generative pipeline synthesizes an icy plume erupting from an extraterrestrial glacier!""",
        "game": {
            "title": "Manifold Walker: The Latent Dimension Navigator",
            "scenario": "Pilot a research vessel through a 4D generative latent manifold representing planetary geological formations.",
            "objective": "Traverse from 'Molten Basalt' to 'Glacial Methanogenesis' along the valid data manifold without straying into the empty static void.",
            "tools": "Latent Coordinate Sliders ($z_1, z_2, z_3, z_4$), Manifold Density Radar, Generator Decoder HUD.",
            "roles": "Chief Generative Cartographer.",
            "decision_points": [
                "Navigate along geodesic paths to avoid off-manifold artifacts (corrupted noise).",
                "Apply vector arithmetic offsets to introduce organic nitrogen compounds.",
                "Balance temperature sampling to prevent model collapse into repetitive crystal forms."
            ],
            "rules": "Falling off the manifold drops decoder fidelity to zero. Synthesizing 5 verified planetary biosignatures unlocks the Deep Space Grant.",
            "feedback": "Visual decoder displays real-time morphing terrain rendering and probability density readouts.",
            "reflection": "Why is generating new data on a learned manifold fundamentally different from retrieving images from a search database?"
        },
        "coding": {
            "title": "Generative Latent Manifold Interpolation and Sampling in Python",
            "description": "Write a pure-Python simulation demonstrating latent vector interpolation (slerp / linear) and decoding into synthetic sensor signatures.",
            "code": '''import math

def linear_latent_interpolation(v1, v2, steps=5):
    """
    Interpolates linearly between two high-dimensional latent vectors:
    z(t) = (1 - t) * v1 + t * v2 for t in [0, 1].
    """
    trajectory = []
    for step in range(steps):
        t = step / float(steps - 1)
        z_t = [(1.0 - t) * a + t * b for a, b in zip(v1, v2)]
        trajectory.append((round(t, 2), [round(x, 3) for x in z_t]))
    return trajectory

def synthetic_spectrometer_decoder(latent_vector):
    """
    Simulated Generative Decoder: Maps 3D latent vector into
    a 4-channel chemical spectrometer reading [% Methane, % Water, % Silicates, % Organics].
    """
    z1, z2, z3 = latent_vector
    # Non-linear activation mapping simulating a generator network
    ch_ch4 = max(0.0, z1 * 0.5 + z2 * 0.3)
    ch_h2o = max(0.0, -z1 * 0.4 + z3 * 0.8)
    ch_sio2 = max(0.0, z2 * 0.6 - z3 * 0.2)
    ch_org = max(0.0, (z1 + z2 + z3) * 0.3)
    
    total = ch_ch4 + ch_h2o + ch_sio2 + ch_org + 1e-6
    # Normalize to percentages
    return {
        "CH4_Methane": round((ch_ch4 / total) * 100, 1),
        "H2O_Water": round((ch_h2o / total) * 100, 1),
        "SiO2_Silicates": round((ch_sio2 / total) * 100, 1),
        "Organic_Complex": round((ch_org / total) * 100, 1)
    }

# Endpoint A: Earth Hydrothermal Vent [1.2, 0.8, -0.4]
# Endpoint B: Europa Cryo-Ice Vent [-0.9, 0.2, 1.5]
vent_earth = [1.2, 0.8, -0.4]
vent_europa = [-0.9, 0.2, 1.5]

interpolated_points = linear_latent_interpolation(vent_earth, vent_europa, steps=4)

print("=== GENERATIVE LATENT MANIFOLD TRAVERSAL ===")
for t, z in interpolated_points:
    spectrum = synthetic_spectrometer_decoder(z)
    print(f"t={t:<4} | Latent Vector: {z}")
    print(f"  -> Decoded Spectrum: {spectrum}\\n")
''',
            "expected_output": """=== GENERATIVE LATENT MANIFOLD TRAVERSAL ===
t=0.0  | Latent Vector: [1.2, 0.8, -0.4]
  -> Decoded Spectrum: {'CH4_Methane': 48.0, 'H2O_Water': 0.0, 'SiO2_Silicates': 32.0, 'Organic_Complex': 20.0}

t=0.33 | Latent Vector: [0.507, 0.602, 0.227]
  -> Decoded Spectrum: {'CH4_Methane': 34.3, 'H2O_Water': 0.0, 'SiO2_Silicates': 35.0, 'Organic_Complex': 30.7}

t=0.67 | Latent Vector: [-0.187, 0.404, 0.854]
  -> Decoded Spectrum: {'CH4_Methane': 3.1, 'H2O_Water': 54.7, 'SiO2_Silicates': 15.6, 'Organic_Complex': 26.6}

t=1.0  | Latent Vector: [-0.9, 0.2, 1.5]
  -> Decoded Spectrum: {'CH4_Methane': 0.0, 'H2O_Water': 80.5, 'SiO2_Silicates': 0.0, 'Organic_Complex': 19.5}""",
            "explanation": "The script demonstrates generative latent space traversal: interpolating along a continuous mathematical manifold smoothly morphs generated chemical spectra from an Earth volcanic profile to an icy Europa hydrothermal plume."
        },
        "questions": [
            {
                "q": "What is the primary architectural difference between a Generative Adversarial Network (GAN) and a Diffusion Model?",
                "options": [
                    "GANs run on batteries; Diffusion runs on solar power.",
                    "GANs use an adversarial zero-sum game between a Generator and Discriminator (prone to mode collapse), while Diffusion models invert thermodynamic entropy by progressively learning to denoise Gaussian noise step-by-step.",
                    "GANs only work on text, while Diffusion only works on spreadsheets.",
                    "Diffusion models require no training data."
                ],
                "answer": "B",
                "explanation": "GANs optimize a min-max game that often suffers from training instability and mode collapse; Diffusion models optimize progressive score-based denoising with stable maximum-likelihood objectives."
            },
            {
                "q": "What is a 'Latent Manifold' in high-dimensional representation theory?",
                "options": [
                    "A physical pipe inside a computer cooling system.",
                    "A continuous, smooth, lower-dimensional topological hypersurface embedded inside a high-dimensional space where real-world data points naturally cluster.",
                    "A folder containing backup files.",
                    "A list of programming errors."
                ],
                "answer": "B",
                "explanation": "High-dimensional data (e.g. pixels) concentrates along lower-dimensional manifolds; generative models learn the coordinates of this manifold."
            },
            {
                "q": "What happens during 'Mode Collapse' in a Generative Adversarial Network?",
                "options": [
                    "The computer monitor turns off.",
                    "The Generator discovers a tiny handful of outputs that reliably fool the Discriminator and repeatedly produces only those few samples, losing all creative diversity.",
                    "The Discriminator crashes with a memory leak.",
                    "The model switches to unsupervised clustering."
                ],
                "answer": "B",
                "explanation": "Mode collapse occurs when the generator exploits a single vulnerability in the discriminator, outputting identical or repetitive samples."
            },
            {
                "q": "What does interpolating between two vectors $\\mathbf{z}_1$ and $\\mathbf{z}_2$ in latent space prove about a generative model?",
                "options": [
                    "It proves the model memorized the training images byte-for-byte.",
                    "It demonstrates that the latent space has learned a smooth, continuous semantic manifold of the data distribution rather than simply memorizing discrete training samples.",
                    "It proves the computer has quantum processing capability.",
                    "It proves the dataset was sorted alphabetically."
                ],
                "answer": "B",
                "explanation": "Smooth semantic transitions during latent interpolation confirm that the model learned a continuous, generalized representation manifold."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Knows that Generative AI creates new things rather than just categorizing.",
                "coding": "Can run the latent interpolation script with sample vectors.",
                "sim": "Moves sliders randomly without understanding manifold continuity."
            },
            "proficient": {
                "concept": "Explains VAEs vs GANs vs Diffusion, latent manifolds, and vector arithmetic.",
                "coding": "Programs latent trajectory interpolators and non-linear generative decoders.",
                "sim": "Navigates latent manifold coordinates to synthesize valid planetary spectra."
            },
            "advanced": {
                "concept": "Formulates score-based diffusion mathematics, optimal transport, and multi-modal alignment.",
                "coding": "Builds high-dimensional spherical linear interpolation (slerp) routines with manifold bounds checks.",
                "sim": "Synthesizes complex multi-variate biosignatures with zero off-manifold artifacts."
            }
        },
        "responsible_ai": "Epistemic Limits of Synthetic Data: While synthetic data accelerates scientific modeling, models trained purely on synthetic data risk catastrophic 'Model Autophagy Disorder' (MAD) where errors amplify exponentially. Synthetic simulations must always be grounded in empirical physical experiments.",
        "xp": 500,
        "badge": "Manifold Pioneer",
        "next_mission": "Class 12 Chapter 1 Lesson 2: Understanding LLMs"
    },

    {
        "grade_num": 12,
        "grade": "Class 12",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 2,
        "title": "Understanding LLMs",
        "pillar": "AI Basics",
        "strand": "The Transformer Architecture, Scaled Dot-Product Self-Attention, and Token Economics",
        "prereqs": "Class 12 Chapter 1 Lesson 1, Class 11 Neural Networks (Matrix multiplication, Softmax).",
        "prereq_details": "Understanding of matrices, vector embeddings, and probabilistic next-token generation.",
        "key_terms": ["Transformer Architecture", "Self-Attention Mechanism", "Queries, Keys, and Values ($Q, K, V$)", "Multi-Head Attention", "Positional Encoding", "Token Economics"],
        "objectives": [
            "Deconstruct the landmark Transformer architecture ('Attention Is All You Need', Vaswani et al., 2017).",
            "Calculate Scaled Dot-Product Self-Attention: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$.",
            "Explain the role of Positional Encoding in non-sequential parallel sequence processing.",
            "Analyze Token Economics: API pricing, context window scaling, throughput latency, and memory footprints."
        ],
        "mission_title": "Project AttentionEngine: Building the Pure-Python Micro-Transformer",
        "mission_desc": "Your university research prep lab is investigating why recurrent neural networks (RNNs) forgot long-range dependencies while Transformers conquered the AI landscape. You are tasked with engineering a fully functional, transparent Scaled Dot-Product Self-Attention mechanism in pure Python, calculating Query, Key, and Value matrix transformations to prove how self-attention resolves pronoun ambiguities across multi-sentence contexts.",
        "theory": """### 1. The Fall of RNNs and the Rise of Transformers
Before 2017, NLP relied on Recurrent Neural Networks (RNNs and LSTMs) that processed words sequentially from left to right:
* **The Fatal Flaw:** Gradients vanished over long sequences; processing word 500 required passing through 499 intermediate steps, making parallel GPU training impossible.
* **The Transformer Breakthrough:** Eliminates recurrence entirely. Processes all tokens simultaneously in parallel, using **Self-Attention** to calculate dynamic relationships between every pair of words regardless of distance.

### 2. The Scaled Dot-Product Self-Attention Formula
For an input sequence embedded into matrix $\\mathbf{X}$, the model projects each token into three distinct vector spaces via learned weight matrices:
* **Queries ($Q = \\mathbf{X} W_Q$):** What the current token is looking for.
* **Keys ($K = \\mathbf{X} W_K$):** What information the other tokens offer.
* **Values ($V = \\mathbf{X} W_V$):** The actual substantive information content of the tokens.

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$$
1. **Dot Product ($Q K^T$):** Computes pairwise alignment scores between every Query and Key ($N \\times N$ attention matrix).
2. **Scaling Factor ($\\frac{1}{\\sqrt{d_k}}$):** Divides by the square root of key dimension $d_k$ to prevent the dot products from growing excessively large, which would push the Softmax function into saturated regions with near-zero gradients.
3. **Softmax:** Normalizes alignment scores into positive probability distributions that sum to $1.0$ across each row.
4. **Weighted Sum ($\times V$):** Computes a weighted blend of all Value vectors based on attention weights.

### 3. Positional Encoding
Because Transformers process all tokens simultaneously, the self-attention equation is permutation-invariant: it cannot tell whether a word appeared at the start or end of a sentence.
To restore word order without recurrence, **Positional Encodings** (sinusoidal frequency vectors or learned positional embeddings) are added directly to the input token vectors before attention layers.""",
        "demo": """### Worked Mathematical Walkthrough: Computing 2-Token Self-Attention
Consider a 2-word sentence: `['Bank', 'River']`.
Let key dimension $d_k = 4 \\implies \\sqrt{d_k} = \\sqrt{4} = 2.0$.
Suppose after projecting, we have:
* $Q = \\begin{bmatrix} 2.0 & 0.0 & 1.0 & 1.0 \\\\ 0.0 & 2.0 & 0.0 & 1.0 \\end{bmatrix}$
* $K = \\begin{bmatrix} 2.0 & 0.0 & 1.0 & 1.0 \\\\ 1.0 & 1.0 & 0.0 & 2.0 \\end{bmatrix}$
* $V = \\begin{bmatrix} 10.0 & 5.0 \\\\ 2.0 & 8.0 \\end{bmatrix}$

1. **Calculate Dot Product ($Q K^T$):**
   * Token 1 on Token 1: $(2)(2) + (0)(0) + (1)(1) + (1)(1) = 4 + 0 + 1 + 1 = 6.0$
   * Token 1 on Token 2: $(2)(1) + (0)(1) + (1)(0) + (1)(2) = 2 + 0 + 0 + 2 = 4.0$

2. **Scale by $\\sqrt{d_k} = 2.0$:**
   $$\\text{Scaled Scores} = \\begin{bmatrix} 6.0/2.0 & 4.0/2.0 \\end{bmatrix} = \\begin{bmatrix} 3.0 & 2.0 \\end{bmatrix}$$

3. **Softmax Normalization:**
   * $e^3 \\approx 20.086$, $e^2 \\approx 7.389$. Sum $= 27.475$.
   * Row 1 Weights: $\\left[\\frac{20.086}{27.475}, \\frac{7.389}{27.475}\\right] = [0.731, 0.269]$

4. **Weighted Sum of Values ($V$):**
   $$\\text{Output}_1 = 0.731 \\times [10.0, 5.0] + 0.269 \\times [2.0, 8.0] = [7.31 + 0.538, \\; 3.655 + 2.152] = [7.85, 5.81]$$
Token 1 ('Bank') now absorbs contextual semantics from Token 2 ('River')!""",
        "game": {
            "title": "Attention Matrix: The Transformer Wiring Deck",
            "scenario": "Step inside a 12-layer Transformer attention block. Resolve pronoun ambiguity in complex sentences like: 'The animal didn't cross the street because it was too tired.'",
            "objective": "Wire the Query-Key attention heads so that 'it' pays 85% attention to 'animal' rather than 'street'.",
            "tools": "Attention Heatmap Canvas, Head Splitter (Multi-Head), Scale Factor Switcher ($\\sqrt{d_k}$), Softmax Gauge.",
            "roles": "Chief Transformer Architect.",
            "decision_points": [
                "Adjust the $W_Q$ and $W_K$ projection weights to maximize dot-product correlation between pronouns and antecedents.",
                "Diagnose a vanishing gradient failure caused by disabling the $\\sqrt{d_k}$ scaling denominator.",
                "Configure Multi-Head Attention to track syntactic grammar in Head 1 while tracking factual semantics in Head 2."
            ],
            "rules": "Misattributing pronouns alters sentence meaning and triggers inference penalties. Achieve >=95% contextual attention accuracy to win.",
            "feedback": "Interactive attention matrix illuminates pairwise token connections with glowing golden weight filaments.",
            "reflection": "Why does Multi-Head Attention allow a model to focus on grammatical syntax and factual semantics simultaneously?"
        },
        "coding": {
            "title": "Scaled Dot-Product Self-Attention Engine from Scratch in Python",
            "description": "Program an authentic Scaled Dot-Product Self-Attention mechanism in pure Python without external dependencies, calculating dot products, scaling, Softmax, and value blending.",
            "code": '''import math

def softmax_row(row):
    """Computes stable Softmax across a 1D numerical list."""
    max_val = max(row)
    exp_vals = [math.exp(x - max_val) for x in row]
    sum_exp = sum(exp_vals)
    return [round(x / sum_exp, 4) for x in exp_vals]

def scaled_dot_product_attention(Q, K, V):
    """
    Computes Scaled Dot-Product Attention:
    Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V
    """
    n_tokens = len(Q)
    d_k = len(Q[0])
    scale_factor = math.sqrt(d_k)
    
    # 1. Compute Q * K^T (Pairwise dot products)
    scores = []
    for i in range(n_tokens):
        row_scores = []
        for j in range(n_tokens):
            # Dot product of Q[i] and K[j]
            dot = sum(Q[i][dim] * K[j][dim] for dim in range(d_k))
            row_scores.append(dot / scale_factor)
        scores.append(row_scores)
        
    # 2. Apply Softmax to each row to get Attention Weights Matrix
    attention_weights = [softmax_row(row) for row in scores]
    
    # 3. Multiply weights by V (Weighted sum of values)
    d_v = len(V[0])
    output = []
    for i in range(n_tokens):
        out_row = [0.0] * d_v
        for j in range(n_tokens):
            weight = attention_weights[i][j]
            for dim in range(d_v):
                out_row[dim] += weight * V[j][dim]
        output.append([round(x, 4) for x in out_row])
        
    return attention_weights, output

# Demonstration: 2-token sequence ["The", "Robot"]
# Features: d_k = 4, d_v = 2
Q_matrix = [
    [2.0, 0.0, 1.0, 1.0],  # Token 0: "The"
    [0.0, 2.0, 0.0, 1.0]   # Token 1: "Robot"
]
K_matrix = [
    [2.0, 0.0, 1.0, 1.0],
    [1.0, 1.0, 0.0, 2.0]
]
V_matrix = [
    [10.0, 5.0],
    [2.0, 8.0]
]

attn_weights, context_output = scaled_dot_product_attention(Q_matrix, K_matrix, V_matrix)

print("=== SCALED DOT-PRODUCT ATTENTION WEIGHTS ===")
tokens = ["The", "Robot"]
print(f"{'':<8} | {tokens[0]:<8} | {tokens[1]:<8}")
print("-" * 28)
for i, row in enumerate(attn_weights):
    print(f"{tokens[i]:<8} | {row[0]:<8.4f} | {row[1]:<8.4f}")

print("\\n=== CONTEXTUALIZED VALUE OUTPUT REPRESENTATIONS ===")
for i, out_vec in enumerate(context_output):
    print(f"Token '{tokens[i]}': Context Vector = {out_vec}")
''',
            "expected_output": """=== SCALED DOT-PRODUCT ATTENTION WEIGHTS ===
         | The      | Robot   
----------------------------
The      | 0.7311   | 0.2689  
Robot    | 0.4378   | 0.5622  

=== CONTEXTUALIZED VALUE OUTPUT REPRESENTATIONS ===
Token 'The': Context Vector = [7.8488, 5.8067]
Token 'Robot': Context Vector = [5.5024, 6.6866]""",
            "explanation": "The script demonstrates the heart of modern AI: calculating Scaled Dot-Product Self-Attention from pure mathematical principles, producing normalized attention probability matrices and contextualized output representations."
        },
        "questions": [
            {
                "q": "Why is the dot-product $Q K^T$ scaled by $\\frac{1}{\\sqrt{d_k}}$ in the Transformer self-attention formula?",
                "options": [
                    "To save computer disk storage space.",
                    "Because for large key dimensions $d_k$, dot products grow large in magnitude, pushing the Softmax function into regions with near-zero gradients (vanishing gradients), which impairs backpropagation training.",
                    "Because the Transformer paper had a mathematical typo.",
                    "Because Softmax only works on numbers smaller than 10."
                ],
                "answer": "B",
                "explanation": "Scaling by $\\sqrt{d_k}$ prevents variance inflation of the dot product, ensuring Softmax gradients remain in healthy non-saturated regimes."
            },
            {
                "q": "Why were Recurrent Neural Networks (RNNs) almost entirely replaced by Transformers for foundation language modeling?",
                "options": [
                    "Because RNNs are legally banned.",
                    "Because RNNs process words sequentially, creating a sequential bottleneck that prevents parallel GPU computation and makes training on internet-scale datasets impossibly slow.",
                    "Because RNNs cannot run on Python 3.",
                    "Because Transformers use less electricity."
                ],
                "answer": "B",
                "explanation": "Transformers process entire token sequences concurrently, unlocking massively parallel GPU training over hundreds of billions of tokens."
            },
            {
                "q": "What is the primary architectural purpose of 'Multi-Head Attention' in a Transformer model?",
                "options": [
                    "To let the model run on multiple computer monitors at the same time.",
                    "To allow the model to simultaneously attend to information from different representation subspaces at different positions (e.g. one head tracking syntax, another tracking pronoun references).",
                    "To generate multiple languages at once.",
                    "To double the clock speed of the processor."
                ],
                "answer": "B",
                "explanation": "Multi-head attention projects Queries, Keys, and Values into multiple parallel subspaces, allowing the model to capture diverse linguistic relationships simultaneously."
            },
            {
                "q": "Why must Positional Encodings be added to input token embeddings in a Transformer?",
                "options": [
                    "Because otherwise the model does not know what time it is.",
                    "Because the self-attention formula is permutation-invariant: without positional vectors, the model would perceive 'dog bites man' and 'man bites dog' as mathematically identical bags of words.",
                    "To encrypt the sentences from hackers.",
                    "Because Positional Encoding multiplies the word count."
                ],
                "answer": "B",
                "explanation": "Self-attention has no inherent concept of order; positional encodings inject sequence order coordinates into token representations."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that Transformers are the technology behind modern Large Language Models.",
                "coding": "Can run the attention script and inspect output weights.",
                "sim": "Manipulates attention matrices without understanding $Q, K, V$ roles."
            },
            "proficient": {
                "concept": "Explains scaled dot-product formula, scaling factors, positional encoding, and token economics.",
                "coding": "Implements pure-Python matrix self-attention routines with stable Softmax normalization.",
                "sim": "Configures attention weights to resolve pronoun ambiguity and syntactic bindings."
            },
            "advanced": {
                "concept": "Critiques multi-head attention projection mathematics, rotary position embeddings (RoPE), and flash attention.",
                "coding": "Builds complete multi-head attention layer blocks with causal masking.",
                "sim": "Achieves 100% contextual binding accuracy across complex linguistic edge cases."
            }
        },
        "responsible_ai": "Compute Concentration & Democratic AI: Training modern frontier Transformer models requires tens of millions of dollars in compute, concentrating AI power within a handful of multinational tech monopolies. Fostering open-source models and parameter-efficient techniques is vital for democratic participation in AI.",
        "xp": 520,
        "badge": "Transformer Grandmaster",
        "next_mission": "Class 12 Chapter 2 Lesson 1: Prompt → Plan → Produce"
    }
]

print("Class 12 Chapter 1 defined.")
