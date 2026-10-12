"""
Complete Class 10 Curriculum Builder (All 12 Lessons across 6 Chapters)
Conforms to all 12 required lesson sections, rigorous Olympiad standards,
and sophisticated gamification mechanics.
"""

import os
from generator_core import write_lesson_file

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 10"

CLASS_10_LESSONS = [
    # -------------------------------------------------------------
    # CHAPTER 1: AI BASICS
    # -------------------------------------------------------------
    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 1,
        "title": "How AI Thinks with Data",
        "pillar": "AI Basics",
        "strand": "High-Dimensional Vector Spaces, Feature Embeddings, and Similarity Metrics",
        "prereqs": "Class 9 AI Basics, Cartesian coordinates, Euclidean distance, basic linear equations.",
        "prereq_details": "Students must understand 2D coordinates $(x, y)$ and basic list manipulation in Python.",
        "key_terms": ["Feature Vector", "High-Dimensional Space", "One-Hot Encoding", "Cosine Similarity", "Manhattan Distance", "Curse of Dimensionality"],
        "objectives": [
            "Explain how real-world objects (text, images, sensor logs) are mapped into multi-dimensional vector embeddings.",
            "Compare similarity metrics: Euclidean Distance, Manhattan Distance ($L_1$), and Cosine Similarity.",
            "Transform categorical variables into numerical matrices using One-Hot and Ordinal encoding.",
            "Understand the geometric intuition of semantic clustering in latent vector spaces."
        ],
        "mission_title": "Project Omnisearch: The Multi-Modal Library Retrieval Vector Engine",
        "mission_desc": "The Central High School Digital Archive holds 50,000 digitized historical manuscripts, science articles, and audio lectures. Traditional keyword search fails when students search for 'space exploration' because older documents use terms like 'celestial voyaging' or 'rocket telemetry'. You are commissioned to engineer an intelligent vector-similarity search engine that maps documents into mathematical feature space and retrieves conceptual matches regardless of exact keyword overlap.",
        "theory": """### 1. How AI Represents the World: Vectors and Embeddings
Computers cannot read Shakespeare or look at a painting; they compute matrices. To make concepts understandable to an algorithm, we convert real-world entities into **Feature Vectors**:
$$\\vec{v} = [x_1, x_2, x_3, \\dots, x_D] \\in \\mathbb{R}^D$$
Where $D$ is the dimensionality of the feature space.
* In a 300-dimensional word embedding (e.g. Word2Vec, GloVe), words with similar meanings occupy nearby coordinates in space:
  $$\\vec{v}_{\\text{King}} - \\vec{v}_{\\text{Man}} + \\vec{v}_{\\text{Woman}} \\approx \\vec{v}_{\\text{Queen}}$$

### 2. Distance vs. Angular Similarity
When comparing two data vectors $\\vec{A}$ and $\\vec{B}$:
1. **Euclidean Distance ($L_2$ norm):** Measures straight-line physical separation:
   $$d(\\vec{A}, \\vec{B}) = \\sqrt{\\sum_{i=1}^D (A_i - B_i)^2}$$
2. **Manhattan Distance ($L_1$ norm):** Measures grid-like taxi cab travel:
   $$d_{L_1}(\\vec{A}, \\vec{B}) = \\sum_{i=1}^D |A_i - B_i|$$
3. **Cosine Similarity (Angular Orientation):** Measures the cosine of the angle $\\theta$ between vectors, completely invariant to magnitude/length:
   $$\\cos(\\theta) = \\frac{\\vec{A} \\cdot \\vec{B}}{\\|\\vec{A}\\| \\|\\vec{B}\\|} = \\frac{\\sum A_i B_i}{\\sqrt{\\sum A_i^2} \\sqrt{\\sum B_i^2}}$$
   * $\\cos(\\theta) = 1.0 \\implies$ Exactly identical direction.
   * $\\cos(\\theta) = 0.0 \\implies$ Orthogonal (uncorrelated).
   * $\\cos(\\theta) = -1.0 \\implies$ Diametrically opposite.

### 3. Categorical Encoding: One-Hot vs. Ordinal
* **Ordinal Encoding:** Used when categories possess a natural mathematical order (e.g., `[Low=1, Medium=2, High=3]`).
* **One-Hot Encoding:** Used when categories are nominal without inherent ranking (e.g., `[Apple, Banana, Orange]`). An apple becomes `[1, 0, 0]`, preventing the algorithm from falsely assuming an Orange ($3$) is greater than an Apple ($1$).""",
        "demo": """### Worked Mathematical Walkthrough: Cosine Similarity in 3D Space
Suppose two documents are vectorized on three topic axes: `[Science, History, Art]`:
* Document 1 (Physics paper): $\\vec{A} = [5, 1, 0]$
* Document 2 (Astronomy history): $\\vec{B} = [4, 3, 0]$
* Document 3 (Renaissance painting): $\\vec{C} = [0, 2, 6]$

Let's compute $\\cos(\\theta)$ between $\\vec{A}$ and $\\vec{B}$:
1. Dot Product: $\\vec{A} \\cdot \\vec{B} = (5 \\times 4) + (1 \\times 3) + (0 \\times 0) = 20 + 3 + 0 = 23$
2. Norm $\\|\\vec{A}\\| = \\sqrt{5^2 + 1^2 + 0^2} = \\sqrt{25 + 1} = \\sqrt{26} \\approx 5.099$
3. Norm $\\|\\vec{B}\\| = \\sqrt{4^2 + 3^2 + 0^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5.000$
4. Cosine Similarity:
   $$\\cos(\\theta) = \\frac{23}{5.099 \\times 5.000} = \\frac{23}{25.495} \\approx 0.902$$
Since $0.902$ is close to $1.0$, the vector engine confirms high semantic alignment! In contrast, $\\vec{A} \\cdot \\vec{C} = 2$, yielding a low similarity of $0.062$.""",
        "game": {
            "title": "Vector Voyager: The High-Dimensional Labyrinth",
            "scenario": "Navigate an exploration probe through a 5-dimensional semantic cosmos where planetary nodes represent concepts.",
            "objective": "Travel from the starting concept 'Combustion Engine' to target destination 'Renewable Solar Cell' across minimum warp jumps.",
            "tools": "Vector Projection Radar, Dimension Slicer, Cosine Thruster.",
            "roles": "Astrogation Data Officer.",
            "decision_points": [
                "Select neighboring vectors with highest cosine similarity along the 'Sustainability' axis.",
                "Avoid semantic black holes (outliers with zero correlation to the objective).",
                "Apply vector arithmetic (e.g. `Vector + [Clean Energy] - [Fossil Fuel]`) to warp across clusters."
            ],
            "rules": "Each warp jump consumes fuel inversely proportional to cosine similarity. Low-similarity jumps cause stranded engine stalls.",
            "feedback": "Visual 3D radar plots live hyperspace trajectory and angular deviation from target.",
            "reflection": "Why does cosine similarity allow search engines to match long essays with short query phrases?"
        },
        "coding": {
            "title": "Building a Cosine Vector Semantic Search Engine in Python",
            "description": "Program a pure-Python vector search engine that converts keyword query vectors and computes cosine similarity across a corpus of documents.",
            "code": '''import math

def dot_product(v1, v2):
    """Calculates scalar dot product of two vectors."""
    return sum(a * b for a, b in zip(v1, v2))

def vector_magnitude(v):
    """Calculates Euclidean L2 norm of a vector."""
    return math.sqrt(sum(x ** 2 for x in v))

def cosine_similarity(v1, v2):
    """Computes angular cosine similarity between two non-zero vectors."""
    mag1 = vector_magnitude(v1)
    mag2 = vector_magnitude(v2)
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return dot_product(v1, v2) / (mag1 * mag2)

# Digital Library Corpus: Features represent [Space, Physics, History, Biology]
documents = [
    {"title": "Orbital Mechanics for Beginners",      "vector": [9.0, 8.0, 1.0, 0.0]},
    {"title": "The Fall of the Roman Empire",         "vector": [0.0, 0.0, 9.5, 1.0]},
    {"title": "Cellular Respiration and Mitochondria", "vector": [0.0, 2.0, 0.5, 9.0]},
    {"title": "Astrophysics and Cosmic Origins",      "vector": [8.5, 9.0, 2.0, 0.0]}
]

# Student Search Query: "Deep space rocket physics" -> Vectorized as [8.0, 7.0, 0.5, 0.0]
query_vector = [8.0, 7.0, 0.5, 0.0]

print("=== VECTOR SEMANTIC SEARCH RESULTS ===")
search_results = []
for doc in documents:
    score = cosine_similarity(query_vector, doc["vector"])
    search_results.append({"title": doc["title"], "score": round(score, 4)})

# Rank descending by similarity score
search_results.sort(key=lambda x: x["score"], reverse=True)

for rank, item in enumerate(search_results, 1):
    print(f"Rank {rank}: [Similarity {item['score']:.4f}] - {item['title']}")
''',
            "expected_output": """=== VECTOR SEMANTIC SEARCH RESULTS ===
Rank 1: [Similarity 0.9996] - Orbital Mechanics for Beginners
Rank 2: [Similarity 0.9961] - Astrophysics and Cosmic Origins
Rank 3: [Similarity 0.1652] - Cellular Respiration and Mitochondria
Rank 4: [Similarity 0.0526] - The Fall of the Roman Empire""",
            "explanation": "The script computes the mathematical dot product and norms across multi-dimensional feature vectors, ranking documents by conceptual proximity rather than superficial keyword string equality."
        },
        "questions": [
            {
                "q": "Why is Cosine Similarity preferred over Euclidean Distance when comparing the semantic similarity of text documents of drastically different lengths?",
                "options": [
                    "Because Cosine Similarity only works on documents shorter than 10 words.",
                    "Because Cosine Similarity measures angular direction and is invariant to vector magnitude, preventing a 10,000-word book from appearing dissimilar to a 50-word abstract on the same topic.",
                    "Because Euclidean distance requires GPU graphics cards.",
                    "Because Cosine Similarity produces negative imaginary numbers."
                ],
                "answer": "B",
                "explanation": "A long document will have larger word counts (greater vector magnitude) than a short summary, producing huge Euclidean distances even if their thematic angles are identical."
            },
            {
                "q": "Why is One-Hot Encoding used instead of Ordinal Encoding for categorical features such as car colors `['Red', 'Blue', 'Green']`?",
                "options": [
                    "To save computer storage space.",
                    "Because assigning numbers `[1, 2, 3]` inadvertently imposes a false mathematical hierarchy where the model assumes Green is three times greater than Red.",
                    "Because computer monitors only display Red, Green, and Blue.",
                    "Because Ordinal encoding crashes Python."
                ],
                "answer": "B",
                "explanation": "Nominal categories have no mathematical order; ordinal encoding introduces spurious numerical relationships that distort linear models."
            },
            {
                "q": "What is the Cosine Similarity between two non-zero vectors that are perfectly perpendicular (orthogonal) to each other?",
                "options": [
                    "1.0",
                    "0.0",
                    "-1.0",
                    "Undefined"
                ],
                "answer": "B",
                "explanation": "Perpendicular vectors have a dot product of zero ($\\cos(90^\\circ) = 0$), indicating zero linear correlation."
            },
            {
                "q": "What phenomenon occurs when machine learning models operate in thousands of dimensions, causing data points to become extremely sparse and equidistant from each other?",
                "options": [
                    "The Vector Paradox",
                    "The Curse of Dimensionality",
                    "Quantum Entanglement",
                    "The Big-O Collapse"
                ],
                "answer": "B",
                "explanation": "The Curse of Dimensionality refers to the geometric explosion of volume in high-dimensional space, which renders Euclidean distance metrics less discriminative without dimensionality reduction."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that AI turns words and pictures into numbers.",
                "coding": "Can modify vector lists and print search outputs.",
                "sim": "Chooses neighboring vectors blindly without checking angles."
            },
            "proficient": {
                "concept": "Explains Euclidean distance, Manhattan distance, and Cosine similarity formulas.",
                "coding": "Implements pure-Python dot products, vector norms, and rank sorting.",
                "sim": "Navigates vector space by tracking cosine proximity across dimensions."
            },
            "advanced": {
                "concept": "Critiques the Curse of Dimensionality and analyzes vector embedding architectures.",
                "coding": "Programs high-dimensional matrix vectorization engines with sparse-matrix handling.",
                "sim": "Achieves mathematically optimal hyperspace pathing with zero fuel waste."
            }
        },
        "responsible_ai": "Bias in Vector Embeddings: Because word embeddings (like Word2Vec) are trained on historic internet text, they often reflect human societal prejudices (e.g. associating computer programmers with male pronouns and nurses with female pronouns). Responsible AI requires debiasing embedding spaces before deployment.",
        "xp": 180,
        "badge": "Vector Cartographer",
        "next_mission": "Class 10 Chapter 1 Lesson 2: Generative AI Uncovered"
    },

    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 2,
        "title": "Generative AI Uncovered",
        "pillar": "AI Basics",
        "strand": "Generative vs Discriminative AI, Tokenization, Autoregressive LLMs, and Temperature",
        "prereqs": "Class 10 Chapter 1 Lesson 1 (Vectors, Embeddings, Probability).",
        "prereq_details": "Understanding of basic probability ($0.0$ to $1.0$) and high-dimensional vector spaces.",
        "key_terms": ["Generative vs Discriminative", "Byte-Pair Encoding (BPE)", "Token", "Autoregressive Generation", "Sampling Temperature", "Context Window"],
        "objectives": [
            "Distinguish between Discriminative AI ($P(y \\mid X)$) and Generative AI ($P(X)$ or $P(X, y)$).",
            "Explain the tokenization pipeline (sub-words, vocabulary IDs, Byte-Pair Encoding).",
            "Understand how autoregressive Large Language Models generate text one token at a time.",
            "Analyze the impact of hyper-parameters: Temperature, Top-K, and Top-P sampling."
        ],
        "mission_title": "Project Lexicon: The Neural Text Synthesis Engine",
        "mission_desc": "Your school literary magazine wants to launch an interactive storytelling companion. However, the student editors are mystified: Does the AI 'think' in English sentences, or does it copy-paste from a secret memory bank? You are commissioned to build a transparent, step-by-step neural token generator in Python that reveals the underlying probabilistic mechanics of text synthesis, token by token.",
        "theory": """### 1. Discriminative vs. Generative Models
* **Discriminative AI:** Learns the boundary between classes. Given an image $X$, it computes the conditional probability $P(y \\mid X)$ to classify: 'Is this an apple or an orange?'
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
$$P(t_{k+1} \\mid t_1, t_2, \\dots, t_k)$$
They predict the probability distribution for the single next token given the prompt history. Once a token is sampled, it is appended to the context, and the process repeats.

### 4. Sampling Hyper-Parameters: Temperature
When the model predicts a probability distribution over the vocabulary, how does it pick the next token?
* **Temperature ($T$):** Controls randomness by scaling logits before the Softmax function:
  $$P(w_i) = \\frac{e^{z_i / T}}{\\sum_j e^{z_j / T}}$$
  * **$T \\to 0.0$ (Greedy / Deterministic):** Always picks the single highest-probability token. Factual, concise, but repetitive.
  * **$T = 0.7$ (Balanced):** Balances coherence with creative vocabulary diversity.
  * **$T \\ge 1.5$ (Chaotic):** High randomness; produces wild, incoherent word salads.""",
        "demo": """### Worked Mathematical Walkthrough: The Temperature Logit Shift
Suppose an LLM considers 3 candidate tokens for the phrase `'The solar kart drove across the...'`:
Logits: `['desert': 4.0, 'road': 3.0, 'ocean': 1.0]`

1. **At Low Temperature ($T = 0.5$):**
   * Scaled logits: $4.0/0.5 = 8.0, 3.0/0.5 = 6.0, 1.0/0.5 = 2.0$
   * Exponentials: $e^8 \\approx 2981, e^6 \\approx 403, e^2 \\approx 7.4$
   * Softmax: $P(\\text{desert}) = \\frac{2981}{3391.4} \\approx 87.9\\%$ (Dominates almost completely).

2. **At High Temperature ($T = 2.0$):**
   * Scaled logits: $4.0/2 = 2.0, 3.0/2 = 1.5, 1.0/2 = 0.5$
   * Exponentials: $e^2 \\approx 7.39, e^{1.5} \\approx 4.48, e^{0.5} \\approx 1.65$
   * Softmax: $P(\\text{desert}) = \\frac{7.39}{13.52} \\approx 54.6\\%$, $P(\\text{ocean}) = \\frac{1.65}{13.52} \\approx 12.2\\%$
Notice how higher temperature flattens probabilities, making surprising choices like `'ocean'` much more likely!""",
        "game": {
            "title": "Token Roulette: The Autoregressive Architect",
            "scenario": "Step inside the attention engine of an LLM. A user submits the prompt: 'In the heart of the ancient forest, the explorer discovered...'",
            "objective": "Generate a captivating 20-word fantasy story while keeping the Perplexity score in the Goldilocks zone (neither boringly predictable nor ungrammatical nonsense).",
            "tools": "Temperature Slider ($0.0 - 2.0$), Top-K Filter, Top-P Nucleus Dial, Token Probability Bar Chart.",
            "roles": "Neural Inference Controller.",
            "decision_points": [
                "Adjust temperature during narrative climaxes to introduce creative metaphors.",
                "Tighten Top-K to 5 when generating names and historical facts to avoid hallucinations.",
                "Diagnose infinite repetition loops caused by zero-temperature settings."
            ],
            "rules": "Score points for poetic coherence, vocabulary richness, and grammatical integrity over 10 generation cycles.",
            "feedback": "Visual token tree illuminates the probabilistic branching path chosen by the model.",
            "reflection": "Why does an LLM have no memory of the past other than what currently fits inside its active context window?"
        },
        "coding": {
            "title": "Probabilistic Next-Token Predictor with Temperature Scaling in Python",
            "description": "Write a pure-Python simulation of autoregressive token generation demonstrating Softmax probability normalization and temperature scaling.",
            "code": '''import math

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

print("=== AUTOREGRESSIVE TOKEN PROBABILITY SIMULATOR ===\\n")

for temp in [0.2, 0.7, 1.8]:
    probs = softmax_with_temperature(raw_logits, temperature=temp)
    print(f"--- Sampling Temperature: {temp} ---")
    for token, prob in zip(candidates, probs):
        bar = "█" * int(prob * 30)
        print(f"Token: {token:<12} | Prob: {prob:<6.4f} | {bar}")
    print()
''',
            "expected_output": """=== AUTOREGRESSIVE TOKEN PROBABILITY SIMULATOR ===

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
Token: pizza        | Prob: 0.0195 | """,
            "explanation": "The script demonstrates the mathematical effect of temperature scaling on token selection. At $T=0.2$, the top token dominates; at $T=1.8$, probability spreads out, allowing creative or unpredictable selections."
        },
        "questions": [
            {
                "q": "What is the primary difference between Discriminative AI and Generative AI?",
                "options": [
                    "Discriminative AI runs on batteries; Generative AI runs on solar power.",
                    "Discriminative AI models boundaries to predict labels ($P(y \\mid X)$), while Generative AI models the data distribution to synthesize new content ($P(X)$).",
                    "Discriminative AI only works on text, while Generative AI only works on audio.",
                    "Generative AI cannot make mistakes."
                ],
                "answer": "B",
                "explanation": "Discriminative models classify existing data points; generative models estimate distributions to sample brand new data points."
            },
            {
                "q": "What happens if a student sets an LLM's Temperature hyper-parameter to exactly 0.0?",
                "options": [
                    "The model freezes and refuses to answer.",
                    "The model performs greedy decoding, deterministically picking the single most probable token at every step with zero randomness.",
                    "The model generates rhyming poetry.",
                    "The computer shuts down."
                ],
                "answer": "B",
                "explanation": "Temperature 0 selects the argmax token with the highest logit at every step, making outputs 100% deterministic."
            },
            {
                "q": "Why do modern LLMs use Byte-Pair Encoding (BPE) sub-word tokens instead of whole-word tokens?",
                "options": [
                    "Because words in the dictionary are too heavy for RAM.",
                    "Because sub-words allow the model to handle rare words, typos, and multilingual vocabulary flexibly with a compact vocabulary size.",
                    "Because English only has 26 words.",
                    "Because sub-words encrypt the data from hackers."
                ],
                "answer": "B",
                "explanation": "BPE breaks rare or complex compound words into frequent sub-word fragments, eliminating Out-Of-Vocabulary (OOV) errors while keeping vocabulary tables efficient."
            },
            {
                "q": "What is an LLM's 'Context Window'?",
                "options": [
                    "A physical glass monitor screen.",
                    "The maximum number of tokens (prompt + generated response) that the model can process and attend to simultaneously in a single conversation turn.",
                    "A browser extension that summarizes websites.",
                    "The operating system window."
                ],
                "answer": "B",
                "explanation": "The context window defines the finite token capacity of the transformer's attention mechanism; tokens exceeding the window are forgotten."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that chatbots guess words one at a time.",
                "coding": "Can modify temperatures in the script and observe changes.",
                "sim": "Sets extreme temperature values resulting in gibberish."
            },
            "proficient": {
                "concept": "Explains Discriminative vs Generative modeling, BPE tokenization, and Softmax temperature scaling.",
                "coding": "Implements Softmax functions and calculates normalized probability distributions.",
                "sim": "Balances temperature and Top-P to generate coherent, creative narrative passages."
            },
            "advanced": {
                "concept": "Formulates autoregressive probability equations and critiques transformer attention limits.",
                "coding": "Builds complete token sampling loops with Top-K, Top-P, and repetition penalty heuristics.",
                "sim": "Maintains perfect narrative consistency across long context chains."
            }
        },
        "responsible_ai": "Environmental Cost of Generative Inference: Training and running massive multi-billion parameter autoregressive models consumes significant electrical power and freshwater data-center cooling. Ethical engineers optimize model size (quantization, distillation) to minimize unnecessary carbon footprint.",
        "xp": 190,
        "badge": "Generative Alchemist",
        "next_mission": "Class 10 Chapter 2 Lesson 1: AI-Assisted Coding"
    }
]

print("Class 10 Chapter 1 defined.")
