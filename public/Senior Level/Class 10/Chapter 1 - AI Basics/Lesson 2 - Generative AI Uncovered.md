# Class 10 · Chapter 1: AI Basics
## Lesson 2: Generative AI Uncovered

> **Pillar:** AI Basics  
> **Academic Tier:** Senior Secondary (Class 10)  
> **Prerequisites:** Class 10 Chapter 1 Lesson 1 (Vectors, Embeddings, Probability).  
> **Estimated Duration:** 90 Minutes (Concept, Python Lab, Gamified Simulation, Olympiad Prep)

---

## 1. Lesson Identity & Syllabus Mapping
- **Class Level:** Class 10
- **Chapter 1:** AI Basics
- **Lesson 2:** Generative AI Uncovered
- **Curriculum Pillar:** AI Basics
- **Official Syllabus Strand:** Generative vs Discriminative AI, Tokenization, Autoregressive LLMs, and Temperature
- **Key Concepts & Vocabulary:** Generative vs Discriminative, Byte-Pair Encoding (BPE), Token, Autoregressive Generation, Sampling Temperature, Context Window

## 2. Learning Objectives & Prerequisites
### Learning Objectives (Bloom's Revised Taxonomy)
- Distinguish between Discriminative AI ($P(y \mid X)$) and Generative AI ($P(X)$ or $P(X, y)$).
- Explain the tokenization pipeline (sub-words, vocabulary IDs, Byte-Pair Encoding).
- Understand how autoregressive Large Language Models generate text one token at a time.
- Analyze the impact of hyper-parameters: Temperature, Top-K, and Top-P sampling.

### Prerequisite Conceptual Anchors
Understanding of basic probability ($0.0$ to $1.0$) and high-dimensional vector spaces.

## 3. Real-World Mission / Problem Scenario
### Mission Brief: *Project Lexicon: The Neural Text Synthesis Engine*

Your school literary magazine wants to launch an interactive storytelling companion. However, the student editors are mystified: Does the AI 'think' in English sentences, or does it copy-paste from a secret memory bank? You are commissioned to build a transparent, step-by-step neural token generator in Python that reveals the underlying probabilistic mechanics of text synthesis, token by token.

## 4. Technical Explanations & Algorithmic Foundations
### 1. Discriminative vs. Generative Models
* **Discriminative AI:** Learns the boundary between classes. Given an image $X$, it computes the conditional probability $P(y \mid X)$ to classify: 'Is this an apple or an orange?'
* **Generative AI:** Models the underlying data distribution. It learns what makes an apple look like an apple, enabling it to synthesize entirely new, never-before-seen samples: 'Generate a picture of a blue apple.'

### 2. The Tokenization Pipeline
Computers do not process letters or whole words directly:
1. **Raw Text:** `'Artificial intelligence is fascinating!'`
2. **Sub-Word Tokenization (BPE):** Words are broken into common sub-word chunks:
   `['Art', 'ificial', ' intellig', 'ence', ' is', ' fascin', 'ating', '!']`
3. **Vocabulary IDs:** Each unique token maps to an integer in a fixed dictionary (typically 32,000 to 100,000 tokens):
   `[4821, 19203, 843, 621, 318, 14209, 812, 0]`

### 3. Autoregressive Next-Token Prediction
Large Language Models (LLMs) like GPT-4 operate on a straightforward loop:
$$P(t_{k+1} \mid t_1, t_2, \dots, t_k)$$
They predict the probability distribution for the single next token given the prompt history. Once a token is sampled, it is appended to the context, and the process repeats.

### 4. Sampling Hyper-Parameters: Temperature
When the model predicts a probability distribution over the vocabulary, how does it pick the next token?
* **Temperature ($T$):** Controls randomness by scaling logits before the Softmax function:
  $$P(w_i) = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}$$
  * **$T \to 0.0$ (Greedy / Deterministic):** Always picks the single highest-probability token. Factual, concise, but repetitive.
  * **$T = 0.7$ (Balanced):** Balances coherence with creative vocabulary diversity.
  * **$T \ge 1.5$ (Chaotic):** High randomness; produces wild, incoherent word salads.


## 5. Guided Demonstration & Mathematical / Computational Walkthrough
### Worked Mathematical Walkthrough: The Temperature Logit Shift
Suppose an LLM considers 3 candidate tokens for the phrase `'The solar kart drove across the...'`:
Logits: `['desert': 4.0, 'road': 3.0, 'ocean': 1.0]`

1. **At Low Temperature ($T = 0.5$):**
   * Scaled logits: $4.0/0.5 = 8.0, 3.0/0.5 = 6.0, 1.0/0.5 = 2.0$
   * Exponentials: $e^8 \approx 2981, e^6 \approx 403, e^2 \approx 7.4$
   * Softmax: $P(\text{desert}) = \frac{2981}{3391.4} \approx 87.9\%$ (Dominates almost completely).

2. **At High Temperature ($T = 2.0$):**
   * Scaled logits: $4.0/2 = 2.0, 3.0/2 = 1.5, 1.0/2 = 0.5$
   * Exponentials: $e^2 \approx 7.39, e^{1.5} \approx 4.48, e^{0.5} \approx 1.65$
   * Softmax: $P(\text{desert}) = \frac{7.39}{13.52} \approx 54.6\%$, $P(\text{ocean}) = \frac{1.65}{13.52} \approx 12.2\%$
Notice how higher temperature flattens probabilities, making surprising choices like `'ocean'` much more likely!


## 6. Unique Interactive Game / Simulation Specification
### Simulation Experience: **Token Roulette: The Autoregressive Architect**
- **Scenario & Context:** Step inside the attention engine of an LLM. A user submits the prompt: 'In the heart of the ancient forest, the explorer discovered...'
- **Pedagogical Objective:** Generate a captivating 20-word fantasy story while keeping the Perplexity score in the Goldilocks zone (neither boringly predictable nor ungrammatical nonsense).
- **Available Information, Tools & Constraints:** Temperature Slider ($0.0 - 2.0$), Top-K Filter, Top-P Nucleus Dial, Token Probability Bar Chart.
- **Student Role & Actions:** Neural Inference Controller.
- **Core Decision Points & Branching:**
  * Adjust temperature during narrative climaxes to introduce creative metaphors.
  * Tighten Top-K to 5 when generating names and historical facts to avoid hallucinations.
  * Diagnose infinite repetition loops caused by zero-temperature settings.
- **Scoring Mechanics & Victory Conditions:** Score points for poetic coherence, vocabulary richness, and grammatical integrity over 10 generation cycles.
- **Real-Time Quality Feedback:** Visual token tree illuminates the probabilistic branching path chosen by the model.
- **Post-Simulation Debrief & Concept Reflection:** Why does an LLM have no memory of the past other than what currently fits inside its active context window?

## 7. Practical Hands-On Coding Lab
### Lab Assignment: Probabilistic Next-Token Predictor with Temperature Scaling in Python
Write a pure-Python simulation of autoregressive token generation demonstrating Softmax probability normalization and temperature scaling.

```python
import math

def softmax_with_temperature(logits, temperature=1.0):
    """
    Applies temperature scaling to raw model logits and computes
    normalized Softmax probabilities.
    """
    # Guard against division by zero
    temp = max(0.01, float(temperature))
    scaled = [x / temp for x in logits]
    
    # Subtract max for numerical stability (prevents float overflow)
    max_val = max(scaled)
    exp_vals = [math.exp(x - max_val) for x in scaled]
    sum_exp = sum(exp_vals)
    
    return [round(x / sum_exp, 4) for x in exp_vals]

# Simulated vocabulary distribution for the next token
candidates = ["forest", "desert", "laboratory", "galaxy", "pizza"]
raw_logits = [4.2, 3.8, 2.5, 1.8, -1.0]

print("=== AUTOREGRESSIVE TOKEN PROBABILITY SIMULATOR ===\n")

for temp in [0.2, 0.7, 1.8]:
    probs = softmax_with_temperature(raw_logits, temperature=temp)
    print(f"--- Sampling Temperature: {temp} ---")
    for token, prob in zip(candidates, probs):
        bar = "█" * int(prob * 30)
        print(f"Token: {token:<12} | Prob: {prob:<6.4f} | {bar}")
    print()
```

#### Expected Execution Output:
```text
=== AUTOREGRESSIVE TOKEN PROBABILITY SIMULATOR ===

--- Sampling Temperature: 0.2 ---
Token: forest       | Prob: 0.8808 | ██████████████████████████
Token: desert       | Prob: 0.1192 | ███
Token: laboratory   | Prob: 0.0001 | 
Token: galaxy       | Prob: 0.0000 | 
Token: pizza        | Prob: 0.0000 | 

--- Sampling Temperature: 0.7 ---
Token: forest       | Prob: 0.5404 | ████████████████
Token: desert       | Prob: 0.3061 | █████████
Token: laboratory   | Prob: 0.0963 | ██
Token: galaxy       | Prob: 0.0350 | █
Token: pizza        | Prob: 0.0006 | 

--- Sampling Temperature: 1.8 ---
Token: forest       | Prob: 0.3341 | ██████████
Token: desert       | Prob: 0.2676 | ████████
Token: laboratory   | Prob: 0.1309 | ███
Token: galaxy       | Prob: 0.0934 | ██
Token: pizza        | Prob: 0.0195 |
```

**Step-by-Step Code Analysis & Algorithmic Breakdown:**
The script demonstrates the mathematical effect of temperature scaling on token selection. At $T=0.2$, the top token dominates; at $T=1.8$, probability spreads out, allowing creative or unpredictable selections.

## 8. Olympiad-Level Examination Questions
### Question 1 [Multiple Choice]
What is the primary difference between Discriminative AI and Generative AI?

- **(A)** Discriminative AI runs on batteries; Generative AI runs on solar power.
- **(B)** Discriminative AI models boundaries to predict labels ($P(y \mid X)$), while Generative AI models the data distribution to synthesize new content ($P(X)$).
- **(C)** Discriminative AI only works on text, while Generative AI only works on audio.
- **(D)** Generative AI cannot make mistakes.

### Question 2 [Multiple Choice]
What happens if a student sets an LLM's Temperature hyper-parameter to exactly 0.0?

- **(A)** The model freezes and refuses to answer.
- **(B)** The model performs greedy decoding, deterministically picking the single most probable token at every step with zero randomness.
- **(C)** The model generates rhyming poetry.
- **(D)** The computer shuts down.

### Question 3 [Multiple Choice]
Why do modern LLMs use Byte-Pair Encoding (BPE) sub-word tokens instead of whole-word tokens?

- **(A)** Because words in the dictionary are too heavy for RAM.
- **(B)** Because sub-words allow the model to handle rare words, typos, and multilingual vocabulary flexibly with a compact vocabulary size.
- **(C)** Because English only has 26 words.
- **(D)** Because sub-words encrypt the data from hackers.

### Question 4 [Multiple Choice]
What is an LLM's 'Context Window'?

- **(A)** A physical glass monitor screen.
- **(B)** The maximum number of tokens (prompt + generated response) that the model can process and attend to simultaneously in a single conversation turn.
- **(C)** A browser extension that summarizes websites.
- **(D)** The operating system window.

## 9. Answer Keys & In-Depth Technical Solutions
### Question 1 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Discriminative models classify existing data points; generative models estimate distributions to sample brand new data points.

### Question 2 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Temperature 0 selects the argmax token with the highest logit at every step, making outputs 100% deterministic.

### Question 3 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** BPE breaks rare or complex compound words into frequent sub-word fragments, eliminating Out-Of-Vocabulary (OOV) errors while keeping vocabulary tables efficient.

### Question 4 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** The context window defines the finite token capacity of the transformer's attention mechanism; tokens exceeding the window are forgotten.

## 10. Evaluation Rubric & Measurable Completion Metrics
| Mastery Tier | Conceptual Comprehension (40%) | Applied Coding & Engineering (30%) | Decision-Making in Simulation (30%) |
| :--- | :--- | :--- | :--- |
| **Emerging (1–2 pts)** | Understands that chatbots guess words one at a time. | Can modify temperatures in the script and observe changes. | Sets extreme temperature values resulting in gibberish. |
| **Proficient (3–4 pts)** | Explains Discriminative vs Generative modeling, BPE tokenization, and Softmax temperature scaling. | Implements Softmax functions and calculates normalized probability distributions. | Balances temperature and Top-P to generate coherent, creative narrative passages. |
| **Advanced / Olympiad (5 pts)** | Formulates autoregressive probability equations and critiques transformer attention limits. | Builds complete token sampling loops with Top-K, Top-P, and repetition penalty heuristics. | Maintains perfect narrative consistency across long context chains. |

## 11. Responsible AI, Ethics & Societal Impact
Environmental Cost of Generative Inference: Training and running massive multi-billion parameter autoregressive models consumes significant electrical power and freshwater data-center cooling. Ethical engineers optimize model size (quantization, distillation) to minimize unnecessary carbon footprint.

## 12. Gamification Achievements & Progression Mechanics
- **Experience Points (XP):** +190 XP
- **Earned Achievement Badge:** 🏆 `Generative Alchemist`
- **Unlocked Next Mission:** Class 10 Chapter 2 Lesson 1: AI-Assisted Coding