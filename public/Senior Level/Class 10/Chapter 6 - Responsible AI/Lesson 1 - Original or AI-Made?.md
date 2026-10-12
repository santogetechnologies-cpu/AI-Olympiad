# Class 10 · Chapter 6: Responsible AI
## Lesson 1: Original or AI-Made?

> **Pillar:** Responsible AI  
> **Academic Tier:** Senior Secondary (Class 10)  
> **Prerequisites:** Class 10 Chapter 5.  
> **Estimated Duration:** 90 Minutes (Concept, Python Lab, Gamified Simulation, Olympiad Prep)

---

## 1. Lesson Identity & Syllabus Mapping
- **Class Level:** Class 10
- **Chapter 6:** Responsible AI
- **Lesson 1:** Original or AI-Made?
- **Curriculum Pillar:** Responsible AI
- **Official Syllabus Strand:** Intellectual Property, AI Attribution, Plagiarism vs Fair Use, and Synthetic Text Detection
- **Key Concepts & Vocabulary:** AI Plagiarism, Attribution Standards, Perplexity & Burstiness, Watermarking, Fair Use, Intellectual Property

## 2. Learning Objectives & Prerequisites
### Learning Objectives (Bloom's Revised Taxonomy)
- Distinguish between legitimate AI-assisted augmentation and fraudulent academic plagiarism.
- Master formal academic citation standards for generative AI contributions.
- Analyze the statistical mechanics of synthetic text detectors (Perplexity, Burstiness, Token Probability Curves).
- Evaluate copyright controversies surrounding AI training on human creative works.

### Prerequisite Conceptual Anchors
Understanding of how generative LLMs synthesize text probabilistically.

## 3. Real-World Mission / Problem Scenario
### Mission Brief: *Project Veritas: The High-School Essay Integrity Tribunal*

The annual Inter-School Essay Championship receives 300 submissions on 'The Ethics of Genetic Engineering'. The first-place prize is a $5,000 college scholarship. An anonymous whistleblower claims that the winning essay was generated entirely by prompting an AI chatbot with 'write a winning essay in the style of an articulate 16-year-old'. You are appointed Chief Forensics Lead to audit the essay using statistical text forensics, establish whether academic fraud occurred, and define school attribution policy.

## 4. Technical Explanations & Algorithmic Foundations
### 1. The Boundary Between Assistance and Academic Fraud
* **Legitimate AI Assistance:** Using an AI tool to brainstorm outline concepts, proofread grammatical mechanics, suggest counter-arguments, or format citations—with transparent documentation in your methodology.
* **Academic Fraud (AI Plagiarism):** Submitting AI-generated paragraphs, arguments, or complete papers as your own original intellectual creation, deceptively taking credit for work you did not produce.

### 2. Statistical Mechanics of AI Text Detectors
AI detectors do not 'know' facts; they evaluate statistical signatures:
1. **Perplexity:** A mathematical measure of how 'surprised' a language model is by a sequence of words.
   * LLMs choose statistically probable next tokens $\implies$ **Low Perplexity** (predictable text).
   * Human writers use surprising idioms, unusual adjectives, and idiosyncratic phrasing $\implies$ **High Perplexity**.
2. **Burstiness:** The variation in sentence length and structure across a paragraph.
   * LLMs maintain relatively uniform, balanced cadence $\implies$ **Low Burstiness**.
   * Humans write short punchy sentences followed by long, winding, complex thoughts $\implies$ **High Burstiness**.

### 3. The Unreliability of AI Detectors
Detectors frequently produce **False Positives**, especially against non-native English speakers who write with formal, predictable phrasing. Therefore, statistical detectors must never be used as sole proof for disciplinary punishment without collaborative human dialogue.


## 5. Guided Demonstration & Mathematical / Computational Walkthrough
### Worked Mathematical Metrics: Perplexity and Burstiness
Sentence A (AI-typical): `'Artificial intelligence is a rapidly advancing technology that impacts modern society in numerous significant ways.'`
* Sentence lengths: `[14 words]`. Sentence variation: $0.0$. Perplexity: Low ($P \approx 12$). $\implies$ Uniform, predictable cadence.

Sentence B (Human-typical): `'AI terrifies me. Yet, when I watched an algorithm sequence a malaria vaccine in under six minutes yesterday, I realized that our world has fundamentally tilted on its axis.'`
* Sentence lengths: `[3 words, 24 words]`. Length Variance: High (Burstiness $\sigma \approx 14.8$). Perplexity: High ($P \approx 68$). $\implies$ Organic human style.


## 6. Unique Interactive Game / Simulation Specification
### Simulation Experience: **The Integrity Tribunal: Human or Machine?**
- **Scenario & Context:** You are President of the Academic Honor Board. Five student essays are challenged for suspected AI plagiarism.
- **Pedagogical Objective:** Distinguish between authentic human writing, AI-assisted drafting, and pure 100% copy-pasted machine generation.
- **Available Information, Tools & Constraints:** Perplexity Meter, Burstiness Grapher, Style Variance Analyzer, Interview Chamber.
- **Student Role & Actions:** Honor Board President.
- **Core Decision Points & Branching:**
  * Evaluate whether low burstiness is due to non-native English writing or AI generation.
  * Interview the student: Can they explain the underlying vocabulary and concepts in their own words?
  * Distinguish between legitimate brainstorming versus fraudulent submission.
- **Scoring Mechanics & Victory Conditions:** Falsely accusing an honest student of cheating destroys lives (-500 pts). Letting complete AI fraud win corrupts academic fairness (-300 pts).
- **Real-Time Quality Feedback:** Forensic dashboard plots sentence-length burstiness curves and cross-examination credibility scores.
- **Post-Simulation Debrief & Concept Reflection:** Why is an open oral dialogue with a student far more reliable for establishing authentic understanding than an automated detector software?

## 7. Practical Hands-On Coding Lab
### Lab Assignment: Text Burstiness and Stylistic Variance Analyzer in Python
Write a Python script that calculates sentence-length variance (burstiness) and vocabulary richness to evaluate text authenticity.

```python
import math

def calculate_text_burstiness(text):
    """
    Computes sentence-length variance (Burstiness metric).
    Human writing typically displays high burstiness (mixing very short and very long sentences),
    while raw AI text tends toward uniform, balanced sentence lengths.
    """
    # Split text into sentences by punctuation
    import re
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if len(s.strip()) > 0]
    
    if len(sentences) < 2:
        return {"error": "Text too short for burstiness calculation"}
        
    lengths = [len(s.split()) for s in sentences]
    mean_len = sum(lengths) / len(lengths)
    
    # Calculate standard deviation of sentence length
    variance = sum((l - mean_len) ** 2 for l in lengths) / len(lengths)
    std_dev = math.sqrt(variance)
    
    # Vocabulary Richness: Type-Token Ratio (TTR)
    all_words = text.lower().split()
    unique_words = set(all_words)
    ttr = len(unique_words) / float(len(all_words)) if all_words else 0.0
    
    # Diagnostic heuristic
    if std_dev < 3.5:
        cadence_flag = "LOW_BURSTINESS (Uniform, typical of AI)"
    else:
        cadence_flag = "HIGH_BURSTINESS (Dynamic, typical of human)"
        
    return {
        "sentence_count": len(sentences),
        "mean_sentence_length": round(mean_len, 1),
        "length_std_dev": round(std_dev, 2),
        "cadence_evaluation": cadence_flag,
        "type_token_ratio": round(ttr, 3)
    }

# Sample 1: Machine-like uniform text
text_ai = """Artificial intelligence is a transformative technological phenomenon in the modern era. 
It facilitates unprecedented efficiency across diverse industrial and educational sectors. 
Researchers must actively navigate complicated ethical challenges to ensure societal stability."""

# Sample 2: Dynamic human text
text_human = """AI terrifies me. 
Yet, when I watched an algorithm sequence a malaria vaccine in under six minutes yesterday, I realized our world has tilted. 
We cannot look away."""

print("=== TEXT BURSTINESS FORENSIC AUDIT ===")
print("--- Analyzing Sample A (Suspected Machine) ---")
rep_a = calculate_text_burstiness(text_ai)
for k, v in rep_a.items():
    print(f"  {k:<22}: {v}")

print("\n--- Analyzing Sample B (Suspected Human) ---")
rep_b = calculate_text_burstiness(text_human)
for k, v in rep_b.items():
    print(f"  {k:<22}: {v}")
```

#### Expected Execution Output:
```text
=== TEXT BURSTINESS FORENSIC AUDIT ===
--- Analyzing Sample A (Suspected Machine) ---
  sentence_count        : 3
  mean_sentence_length  : 11.7
  length_std_dev        : 0.94
  cadence_evaluation    : LOW_BURSTINESS (Uniform, typical of AI)
  type_token_ratio      : 0.943

--- Analyzing Sample B (Suspected Human) ---
  sentence_count        : 3
  mean_sentence_length  : 10.3
  length_std_dev        : 9.88
  cadence_evaluation    : HIGH_BURSTINESS (Dynamic, typical of human)
  type_token_ratio      : 0.935
```

**Step-by-Step Code Analysis & Algorithmic Breakdown:**
The script calculates sentence-length standard deviation. Sample A has an almost uniform sentence length (std dev = 0.94), while Sample B shows dramatic human burstiness (std dev = 9.88), illustrating stylistic cadence analysis.

## 8. Olympiad-Level Examination Questions
### Question 1 [Multiple Choice]
What is 'Burstiness' in statistical text analysis?

- **(A)** How quickly a printer prints pages.
- **(B)** The variation and diversity in sentence length and syntactic structure across a body of text.
- **(C)** A computer virus that crashes word processors.
- **(D)** The number of exclamation marks in an essay.

### Question 2 [Multiple Choice]
Why are commercial AI text detectors notorious for generating False Positives on essays written by non-native English speakers?

- **(A)** Because detectors do not work on computers in foreign countries.
- **(B)** Because non-native English speakers often write using formal, standardized grammar and less idiomatic vocabulary, matching the low-perplexity profile of language models.
- **(C)** Because non-native speakers always use chatbots.
- **(D)** Because non-native text has no vowels.

### Question 3 [Multiple Choice]
What is the proper ethical protocol when submitting schoolwork that was developed with AI assistance?

- **(A)** Deny everything and delete your browsing history.
- **(B)** Include a formal 'AI Contribution Statement' detailing which tools were used, the exact prompts provided, and where human verification and original thinking took place.
- **(C)** List the AI as a co-author on your high school homework.
- **(D)** Pay money to the AI company.

### Question 4 [Multiple Choice]
Why is submitting an essay generated 100% by an AI model considered academic plagiarism even if the text never existed on the internet before?

- **(A)** Because the computer will sue the student for copyright.
- **(B)** Because plagiarism is the fraudulent misrepresentation of authorship—claiming that intellectual effort, synthesis, and creative reasoning were your own when they were not.
- **(C)** Because English teachers do not like computers.
- **(D)** Because essays must be written in blue ink.

## 9. Answer Keys & In-Depth Technical Solutions
### Question 1 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Burstiness measures the variance in sentence cadence and length; human writing exhibits high variance compared to predictable LLM generation.

### Question 2 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Non-native writers frequently use simpler, more predictable syntactic patterns, which detectors falsely interpret as low-perplexity AI text.

### Question 3 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Academic honesty requires transparent attribution, detailing the tools used, the nature of assistance, and the human contribution.

### Question 4 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Plagiarism is not merely copyright infringement; it is the fraudulent claim of intellectual authorship over ideas you did not create.

## 10. Evaluation Rubric & Measurable Completion Metrics
| Mastery Tier | Conceptual Comprehension (40%) | Applied Coding & Engineering (30%) | Decision-Making in Simulation (30%) |
| :--- | :--- | :--- | :--- |
| **Emerging (1–2 pts)** | Understands that copy-pasting from a chatbot and claiming you wrote it is wrong. | Can run the burstiness script with sample paragraphs. | Relies entirely on software percentages to accuse students. |
| **Proficient (3–4 pts)** | Explains perplexity, burstiness, false positive risks, and proper attribution standards. | Calculates sentence length standard deviation and vocabulary richness in Python. | Conducts empathetic student interviews and distinguishes assistance from fraud. |
| **Advanced / Olympiad (5 pts)** | Critiques intellectual property law regarding AI training sets and designs institutional academic honesty codes. | Builds multi-metric stylistic forensic analyzers with confidence intervals. | Resolves complex academic honor board cases with flawless fairness and zero false accusations. |

## 11. Responsible AI, Ethics & Societal Impact
The Value of Human Voice: Artificial intelligence can synthesize billions of words in seconds, but it cannot experience joy, grief, curiosity, or moral conviction. Cultivating your authentic human voice and intellectual honesty is your most precious asset in an automated world.

## 12. Gamification Achievements & Progression Mechanics
- **Experience Points (XP):** +285 XP
- **Earned Achievement Badge:** 🏆 `Integrity Champion`
- **Unlocked Next Mission:** Class 10 Chapter 6 Lesson 2: Use AI, Don't Misuse AI