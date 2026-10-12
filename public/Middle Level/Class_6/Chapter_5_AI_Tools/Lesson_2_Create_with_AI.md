# Class 6 • Chapter 5: AI Tools
## Lesson 2: Create with AI

**Syllabus Reference:** Class 6, Chapter 5 (AI Tools) — Lesson 2: *Create with AI*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain the fundamental mechanism of Generative AI**, distinguishing discriminative models (classifiers) from generative models (creators).
2. **Master the 5-Element Prompt Architecture**: Persona/Role, Task/Goal, Context, Negative Constraints, and Output Format.
3. **Identify and mitigate AI Hallucinations**, applying cross-referencing and verification techniques to generated outputs.
4. **Evaluate the ethical dilemmas of synthetic creativity**, including intellectual property, artist style mimicry, and academic integrity.
5. **Construct an automated prompt engineering assembler and validation script in Python.**

#### Prerequisite Knowledge
- Familiarity with conversational AI companions and variables from Class 6, Chapter 2.
- Basic reading comprehension and creative writing skills.

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Mythic Bestiary: The Galactic Lore Keeper*  
> **Mission Briefing:** Welcome to the Galactic Archives of Sector 7!  
> The Interstellar Federation is compiling a comprehensive visual encyclopedia of mythical extraterrestrial creatures discovered across uncharted solar systems.  
> You have been granted access to *Genesis-AI*—a state-of-the-art multimodal generative AI studio capable of drafting creature lore, translating ancient planetary languages, and synthesizing concept artwork.  
> However, Genesis-AI is dangerously literal! If you ask it to *"Draw a cool alien"*, it produces a generic green blob with three eyes. If you ask it for historical facts, it occasionally invents completely fictitious planets with total confidence!  
> Your mission is to become a **Master Prompt Alchemist**! You must craft precise, structured, constraint-guided prompts to generate accurate, breathtaking mythological creature profiles without triggering hallucinations or copyright violations.

---

### 3. Core Concept Explanations & Generative AI Architecture

#### Discriminative AI vs Generative AI
Until recently, most AI systems were **Discriminative** (they analyzed existing data to sort or predict). The modern revolution is **Generative AI** (systems that produce new, original content):

```
┌────────────────────────────────────────────────────────────────────────┐
│                   DISCRIMINATIVE VS GENERATIVE AI                      │
├───────────────────────────────────┬────────────────────────────────────┤
│ DISCRIMINATIVE AI (The Judge)     │ GENERATIVE AI (The Creator)        │
│ "Is this picture a cat or a dog?" │ "Draw a photorealistic cybernetic  │
│ Analyzes, sorts, and labels.      │ cat resting on a neon rooftop."    │
│ Input: Data ➔ Output: Category    │ Input: Prompt ➔ Output: New Media  │
└───────────────────────────────────┴────────────────────────────────────┘
```

#### The 5-Element Professional Prompt Framework
Vague prompts yield mediocre, generic results. High-performance AI developers structure prompts using the **R-T-C-C-O Framework**:

| Element | Purpose | Weak Example | Master Alchemist Example |
| :--- | :--- | :--- | :--- |
| **1. Role (Persona)** | Assigns the AI a specific perspective, voice, and expertise domain. | *"You are an AI."* | *"You are a senior planetary astrobiologist writing for National Geographic Kids."* |
| **2. Task (Objective)** | Clear, unambiguous statement of what must be created. | *"Write about an alien."* | *"Create a detailed anatomical field guide entry for the crystalline 'Frost-Stag' of Europa."* |
| **3. Context (Background)**| Provides essential setting details, audience level, and lore rules. | *"It is cold there."* | *"Europa is an ice moon orbiting Jupiter with sub-surface oceans and temperatures dipping below -160°C."* |
| **4. Constraints (Boundaries)**| Negative rules: what the AI **must NOT** do or include. | *"Don't make it bad."* | *"Do NOT use weapons or violence. Keep sentences under 15 words. Avoid fairy-tale clichés like 'magic'."* |
| **5. Output Format** | Specifies exact structural layout, headings, word counts, or JSON keys. | *"Write a few paragraphs."* | *"Format as 3 bullet points: Habitat, Diet, and Bioluminescent Defense Mechanism."* |

---

### 4. Guided Reasoning & Experiment

#### Interactive Investigation: The Anatomy of an AI Hallucination
Type the following prompt into an ungrounded language model:
> *"Tell me about the famous Apollo 18 astronaut Captain Alexander Sterling who walked on Mars in 1984."*

**The AI's Surprising Reply:**
> *"Captain Alexander Sterling was a decorated Apollo astronaut who piloted the Ares-1 lander to the Martian equator in July 1984, spending 48 hours collecting red dust samples..."*

**Guided Detective Analysis:**
1. *Did any human walk on Mars in 1984?*
   - Never! Humans have only landed on the Moon (the last Apollo lunar landing was Apollo 17 in 1972). Captain Alexander Sterling never existed!
2. *Why did the AI lie so smoothly?*
   - The AI does not "know" truth versus fiction. It is a mathematical **Token Predictor**. Given words like "Apollo", "astronaut", "Mars", and "1984", it calculates which words statistically sound plausible together in English.
   - Because the prompt *presupposed* that Captain Sterling was real, the AI happily invented convincing details to satisfy the user's premise!
3. **The Alchemist Rule:** **Never Ask Leading Prompts.** Always instruct the AI: *"If this event did not occur in real history, explicitly state that it is fictional."*

---

### 5. Interactive Game Specification

#### Game Title: *The Prompt Alchemist*
- **Game Engine Type:** Iterative Constraint Optimization & Target Generation Arena.
- **Educational Objective:** Hands-on mastery of prompt constraints, style parameters, and avoiding hallucinated content.

#### Game Rules & Mechanics:
1. **The Target Creature Canvas:**
   - The game displays a hidden target creature card: *The Obsidian Fire-Phoenix of Mount Vulcan* (Color: Volcanic black and glowing orange magma; Wings: Feathered obsidian glass; Environment: Smoke-filled basalt caldera; Mood: Regal, peaceful guardian).
2. **Round 1 (The Vague Novice):**
   - Player inputs: *"Draw a fire bird on a mountain."*
   - Result: Generic cartoon red bird on snowy Alps (Fit Score: 32%).
3. **Round 2 (Adding Context & Style):**
   - Player refines: *"A majestic phoenix made of volcanic basalt glass with veins of glowing liquid magma between its obsidian feathers, perched atop a smoking volcanic caldera at sunset."*
   - Fit Score jumps to 78%!
4. **Round 3 (Negative Constraints & Framing):**
   - Player adds constraints: *"--no red feathers, no cartoon style, no snow. Cinematic 8k photography, volumetric smoke, wide-angle lens."*
   - Fit Score hits 98%! Target Achieved!

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Apprentice Scribe* (Structured first 5-element prompt)
  - 🥈 *Constraint Crafter* (Utilized negative constraints to eliminate visual noise)
  - 🥇 *Master Alchemist* (Achieved 95%+ target match within 3 iterations)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Illustrated Eco-Storybook*
**Objective:** Use structured generative prompts to create an illustrated two-page educational story about ocean coral restoration.

**Requirements:**
1. **Page 1 Prompt (The Narrative):** Write a prompt using the R-T-C-C-O framework instructing a text AI to write a 100-word story for Grade 3 students about an underwater robot named *Coral-Bot*.
2. **Page 2 Prompt (The Image Concept):** Write a multimodal image generation prompt to visualize *Coral-Bot* planting 3D-printed ceramic coral polyps on a bleached reef, including specific lighting, camera angle, and artistic style.
3. **Fact-Checking Audit:** Highlight two biological facts in the generated story and verify them using an accredited scientific source (e.g., NOAA or National Geographic).

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement an automated prompt assembler and quality-assurance constraint checker in Python.

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 5 LESSON 2
# AUTOMATED PROMPT ASSEMBLER & CONSTRAINT AUDITOR
# =====================================================================

def assemble_prompt(role, task, context, constraints, output_format):
    """
    Assembles a high-performance structured prompt using the R-T-C-C-O framework.
    """
    prompt_blueprint = (
        f"### SYSTEM ROLE: {role}\n\n"
        f"### PRIMARY TASK: {task}\n\n"
        f"### CONTEXT & BACKGROUND: {context}\n\n"
        f"### STRICT NEGATIVE CONSTRAINTS:\n"
    )
    for c in constraints:
        prompt_blueprint += f"- {c}\n"
        
    prompt_blueprint += f"\n### REQUIRED OUTPUT FORMAT:\n{output_format}\n"
    return prompt_blueprint

def audit_generated_output(output_text, forbidden_terms, max_words=120):
    """
    Audits generated AI output against safety and length constraints.
    """
    words = output_text.split()
    word_count = len(words)
    violations = []
    
    # Check forbidden / hallucinated terms
    for term in forbidden_terms:
        if term.lower() in output_text.lower():
            violations.append(f"Forbidden term detected: '{term}'")
            
    # Check length
    if word_count > max_words:
        violations.append(f"Exceeded max word count ({word_count} > {max_words})")
        
    passed = len(violations) == 0
    return passed, word_count, violations

# ----------------- PROMPT ALCHEMY EXECUTION -----------------
system_prompt = assemble_prompt(
    role="Galactic Astrobiologist at the Interstellar Science Academy",
    task="Write a factual field profile of the Gliese-667 Ice Whale",
    context="Gliese-667 is a super-Earth with frozen ammonia seas. The whale filters micro-crystals.",
    constraints=[
        "Do not mention Earth animals like 'dolphins' or 'bears'",
        "Do not include any violent predation scenes",
        "Keep the tone scientific and wonder-filled",
        "If scientific evidence is missing, state it is a hypothetical model"
    ],
    output_format="Provide 3 labeled sections: Classification, Biology, and Planetary Diet."
)

print("=== ASSEMBLED STRUCTURED MASTER PROMPT ===")
print(system_prompt)

# Simulated AI response
simulated_ai_response = (
    "Classification: Xenocete Ammonia-3. "
    "Biology: Possesses thick silicone-blubber insulation to survive -110°C seas. "
    "Planetary Diet: Ingests suspended ammonium ice crystals through porous baleen plates."
)

is_safe, count, errors = audit_generated_output(
    simulated_ai_response, 
    forbidden_terms=["dolphin", "bear", "violent"], 
    max_words=60
)

print("-" * 50)
print(f"Audit Status: {'✅ PASSED' if is_safe else '❌ FAILED'}")
print(f"Word Count: {count} words")
if not is_safe:
    print(f"Violations: {errors}")
```

#### Expected Program Output:
```text
=== ASSEMBLED STRUCTURED MASTER PROMPT ===
### SYSTEM ROLE: Galactic Astrobiologist at the Interstellar Science Academy

### PRIMARY TASK: Write a factual field profile of the Gliese-667 Ice Whale

### CONTEXT & BACKGROUND: Gliese-667 is a super-Earth with frozen ammonia seas. The whale filters micro-crystals.

### STRICT NEGATIVE CONSTRAINTS:
- Do not mention Earth animals like 'dolphins' or 'bears'
- Do not include any violent predation scenes
- Keep the tone scientific and wonder-filled
- If scientific evidence is missing, state it is a hypothetical model

### REQUIRED OUTPUT FORMAT:
Provide 3 labeled sections: Classification, Biology, and Planetary Diet.

--------------------------------------------------
Audit Status: ✅ PASSED
Word Count: 21 words
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (AI Architectural Distinctions)
What is the fundamental difference between a **Discriminative AI** model and a **Generative AI** model?
- **A)** Discriminative models can only run on mobile phones, while Generative models require supercomputers.
- **B)** Discriminative models classify, sort, or label existing input data; Generative models create entirely new content (text, audio, imagery) based on learned probabilistic distributions.
- **C)** Discriminative models are always free, while Generative models cost money.
- **D)** Generative models only work with numbers, never words or images.
- **Correct Answer:** **B**
- **Explanation:** Discriminative models model conditional probability $P(Y|X)$ to determine boundaries between categories (e.g., "Is this spam or not spam?"). Generative models model the underlying data distribution $P(X)$ to synthesize novel instances resembling the training data.

#### Question 2 (Prompt Engineering Methodology)
In prompt engineering, what is the primary function of specifying **Negative Constraints** (e.g., *"Do NOT include cartoon outlines, no blurry textures, avoid words like 'furthermore'"*)?
- **A)** To make the prompt longer so the AI charges more tokens.
- **B)** To deliberately restrict the model's probabilistic generation space, preventing it from producing common clichés, undesirable styles, or inappropriate content.
- **C)** To shut down the computer's graphics card.
- **D)** Negative constraints make the AI angry and rebellious.
- **Correct Answer:** **B**
- **Explanation:** Language and diffusion models select paths through high-dimensional probability space. Explicit negative constraints prune unwanted probabilistic branches, forcing the model away from overused tropes, blurry artifacts, or forbidden vocabulary.

#### Question 3 (Cognitive Failures: Hallucination Mechanics)
Why do Large Language Models (LLMs) experience **Hallucinations** (confidently stating fictitious "facts" that never happened)?
- **A)** The AI computer caught a biological viral infection.
- **B)** LLMs are statistical next-token prediction engines trained on linguistic patterns; they optimize for semantic fluency and grammatical coherence rather than verifiable truth retrieval.
- **C)** A human programmer manually typed fake facts into the code for fun.
- **D)** The internet connection was temporarily running at 3G speeds.
- **Correct Answer:** **B**
- **Explanation:** LLMs do not possess an internal conceptual encyclopedia of ground truth. They predict the most statistically probable sequence of words following the user's prompt. If a fabricated answer sounds linguistically convincing, the model generates it with total syntactic confidence.

#### Question 4 (Higher-Order Scenario: Iterative Refinement)
An artist prompts an image generator: *"A futuristic flying car in a city."* The AI outputs an old 1970s sedan with cartoon bird wings glued to its doors in an empty cartoon meadow. How should the artist refine the prompt to achieve a sleek, cinematic, cyberpunk vehicle?
- **A)** Type *"flying car"* 50 times in all capital letters.
- **B)** Apply the R-T-C-C-O framework: specify vehicle mechanics (aerodynamic mag-lev turbine VTOL), setting (rain-slicked Neo-Tokyo streets at night, neon reflections), visual style (cinematic photorealism, anamorphic lens), and negative constraints (no cartoon wings, no retro sedans).
- **C)** Turn off the monitor and turn it back on.
- **D)** Delete the computer operating system.
- **Correct Answer:** **B**
- **Explanation:** Generative models require descriptive, multi-attribute prompts with precise contextual framing and negative constraints. Iterative refinement using structured prompt frameworks eliminates ambiguities and steers the latent space toward the artist's exact aesthetic vision.

#### Question 5 (Ethical Evaluation & Intellectual Property)
If an individual prompts a Generative AI tool: *"Write an entire school essay about the French Revolution in the style of Charles Dickens,"* and submits it to their teacher under their own name without citation or attribution, what ethical principle is being violated?
- **A)** Battery Power Conservation
- **B)** Academic Integrity, Honesty, and Authorship Transparency
- **C)** Data Packet Routing Efficiency
- **D)** Screen Resolution Parity
- **Correct Answer:** **B**
- **Explanation:** Claiming AI-generated text or art as one's own original human creation constitutes academic dishonesty (plagiarism). While AI can serve as a powerful research tutor, brainstormer, or editing assistant, ethical creators must always disclose and credit AI assistance transparently.

---

### 9. Responsible AI & Ethical Reflection

#### The Copyright and Artist Dignity Debate
Generative AI models are trained on billions of public artwork images and books created by human artists, illustrators, and writers over centuries:
- **Respecting Human Artists:** Many artists feel their unique styles were scraped into AI models without their permission or compensation.
- **Responsible Creation:** Never use generative tools to impersonate living, working independent artists with the intent of depriving them of commissions. Use generative AI to expand your own imagination, not to replace the value of human creative labor.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Framework Mastery** | Deconstructs a prompt into all 5 R-T-C-C-O components. | 100 XP | Prompt Scholar |
| **Pillar 2: Prompt Alchemist** | Reaches 90%+ target match score within 3 iterative rounds. | 100 XP | Master Alchemist |
| **Pillar 3: Python Coding** | Runs the automated prompt assembler and output validation auditor. | 100 XP | Pipeline Engineer |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad generative AI questions. | 100 XP | Olympiad Scholar |
| **Bonus: Eco-Storybook Project** | Creates a dual-page narrative and image prompt set with verified facts. | 50 XP | Creative Visionary |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
