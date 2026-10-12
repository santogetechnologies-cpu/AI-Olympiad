# Class 6 • Chapter 1: AI Basics
## Lesson 2: Learning from Examples

**Syllabus Reference:** Class 6, Chapter 1 (AI Basics) — Lesson 2: *Learning from Examples*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Define** core machine learning terms: Dataset, Training Data, Features, Labels, and Model.
2. **Explain** how supervised learning uses positive and negative examples to establish decision boundaries.
3. **Construct** a structured feature table representing real-world objects using numerical and categorical attributes.
4. **Identify** dataset bias and understand how skewed training sets lead to flawed classifications.
5. **Implement** a basic feature-matching classifier in Python using dictionaries.

#### Prerequisite Knowledge
- Understanding the difference between rule-based programs and AI (Lesson 1).
- Basic table reading skills (identifying rows, columns, and data entries).
- Elementary arithmetic (percentages and ratios).

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Project Cyber-Pet Sorter*  
> **Mission Briefing:** The Galactic Spaceport Security Terminal has been flooded with hundreds of lost alien pets!  
> Some pets are harmless, cuddly **"Fluff-Puffs"** (authorized companions), while others are mischievous, electric **"Zap-Goblins"** (require special handling).  
> The customs scanner does not know how to tell them apart. It has never seen either species before!  
> As the Spaceport AI Training Specialist, you cannot write an infinite list of rules because alien pets mutate slightly. Instead, you must curate a **Balanced Training Dataset**, extract discriminating physical features (ear shape, tail length, bio-glow frequency), and teach the customs scanner how to classify incoming mystery pets accurately!

---

### 3. Core Concept Explanations & Real-World Examples

#### The Anatomy of Supervised Learning
How does a computer "learn" from examples? It requires three essential ingredients:

```
┌─────────────────────────────────────────────────────────────┐
│                 SUPERVISED LEARNING PIPELINE                │
├─────────────────┬──────────────────────┬────────────────────┤
│ 1. DATASET      │ 2. FEATURE EXTRACTION│ 3. MODEL TRAINING  │
│ Labeled records │ Distinguishing traits│ Learning the math  │
│ (Input + Answer)│ (Weight, Ear Shape)  │ that maps X -> Y   │
└─────────────────┴──────────────────────┴────────────────────┘
```

1. **Features (The Clues):** Measurable properties or characteristics of the object being observed (e.g., ear shape, height, presence of fur, number of legs).
2. **Labels (The Answers):** The ground-truth category or classification assigned to each example (e.g., "Cat" or "Dog", "Spam" or "Not Spam").
3. **Training Data:** The collection of paired examples `(Features + Label)` shown to the algorithm during its learning phase.
4. **Model:** The resulting mathematical mathematical formula or pattern engine that can now take new, unseen features and predict their label.

#### Structured Feature Table: Pet Recognition Example

| Pet ID | Ear Shape (Feature 1) | Whisker Length (Feature 2) | Tail Type (Feature 3) | Bark Sound? (Feature 4) | Correct Label (Target) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **P-01** | Pointed | Long (>6 cm) | Fluffy / Curled | No | **Cat** |
| **P-02** | Floppy / Drooping | Short (<3 cm) | Straight Wagging | Yes | **Dog** |
| **P-03** | Pointed | Long (>5 cm) | Thin / Sleek | No | **Cat** |
| **P-04** | Floppy / Drooping | Short (<2 cm) | Bushy Wagging | Yes | **Dog** |
| **P-05** | Pointed | Short (<2 cm) | Straight Wagging | Yes | **Dog (German Shepherd!)** |

> **Key Discovery:** Look at Pet P-05! It has *pointed ears* like a cat, but it *barks* and has a *straight wagging tail*. If our AI only checked ear shape, it would misclassify this dog! This demonstrates why AI models need **multiple independent features** to make robust decisions.

#### Positive vs Negative Examples
When teaching a model what an object *is*, you must also teach it what an object *is not*:
- **Positive Examples:** Samples belonging to the target class (e.g., 50 pictures of apples).
- **Negative Examples:** Samples belonging to other classes that share similar characteristics (e.g., 50 pictures of red tomatoes, red balls, and red peppers).
- *Without negative examples*, an AI might learn that "anything red and round is an apple", causing embarrassing classification failures in the real world.

---

### 4. Guided Reasoning & Experiment

#### Interactive Experiment: The "Biased Fruit Crate"
Imagine an engineer trains an AI fruit sorter with the following 10 training images:
- 8 Golden Yellow Bananas
- 2 Bright Yellow Ripe Lemons

**The Test:** A farmer brings a crate of **Green Unripe Bananas** and **Bright Yellow Tennis Balls**.
1. *What will the AI predict for the Green Banana?*
   - Because the training data only contained *yellow* bananas, the AI prioritized color over curved shape. It fails to identify the green banana!
2. *What will the AI predict for the Yellow Tennis Ball?*
   - Because yellow was over-represented, the model predicts the tennis ball is a fruit (likely a lemon or small banana)!
3. *The Fix:* We must retrain the model with **Data Diversity**:
   - Add green bananas, brown spotted bananas, and miniature red bananas.
   - Add yellow non-fruits (tennis balls, plastic duck toys) labeled as "Non-Fruit".

---

### 5. Interactive Game Specification

#### Game Title: *The Training Ground*
- **Game Engine Type:** Dataset Curation & Generalization Battle.
- **Educational Objective:** Hands-on experience in selecting balanced training samples to maximize generalization on unseen test data.

#### Game Rules & Mechanics:
1. **Card Pool (30 Available Creature Cards):**
   - 10 Fluff-Puffs (Round body, soft fur, antenna, peaceful eyes).
   - 10 Zap-Goblins (Angular body, metallic scales, glowing horn, sharp claws).
   - 10 Trickster Mutants (Creatures with mixed traits: e.g., round body but sharp claws).
2. **Player Mission (Curation Phase):**
   - The player has a budget to pick exactly **12 Training Cards** to feed the AI.
   - If the player picks 10 easy Fluff-Puffs and only 2 Zap-Goblins, their dataset is heavily **imbalanced**.
   - If the player ignores the Trickster Mutants, their dataset lacks **edge-case diversity**.
3. **The Gauntlet (Testing Phase):**
   - The AI model is compiled from the player's 12 cards.
   - 8 Mystery Alien Cards are drawn from a hidden deck.
   - The AI predicts the label for each card. The player receives instant feedback on whether the model generalized correctly.

#### Scoring & Achievement:
- **Accuracy Metric:**
  - 8/8 Correct: 400 XP + 🏆 *Master Data Scientist Badge*
  - 6-7/8 Correct: 250 XP + 🥈 *Data Curator Badge*
  - < 6 Correct: 100 XP (Prompts student to rebalance the training set)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *Handmade Dataset Architect*
**Objective:** Build a 10-item paper or digital tabular dataset to train an AI to classify between **"Healthy Snacks"** and **"Junk Snacks"**.

**Requirements:**
1. Define at least 3 distinct numerical or categorical features:
   - Feature 1: Sugar content per serving (Grams)
   - Feature 2: High dietary fiber? (Yes / No)
   - Feature 3: Artificial food coloring present? (Yes / No)
2. Fill out 10 rows: 5 Positive Examples (Healthy) and 5 Negative Examples (Junk).
3. Include at least 1 tricky edge case (e.g., Dried raisins: high natural sugar, but high fiber and zero artificial coloring).
4. Formulate the decision rule the AI should learn from your table.

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement a simple rule-learning classifier in Python that evaluates mystery animals based on feature dictionaries.

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 1 LESSON 2
# PYTHON FEATURE-MATCHING CLASSIFIER SIMULATION
# =====================================================================

# 1. Training Dataset: Labeled Examples
training_dataset = [
    {"name": "Persian", "ears": "pointed", "tail": "fluffy", "barks": False, "label": "Cat"},
    {"name": "Siamese", "ears": "pointed", "tail": "sleek", "barks": False, "label": "Cat"},
    {"name": "Beagle",  "ears": "floppy",  "tail": "straight", "barks": True,  "label": "Dog"},
    {"name": "Husky",   "ears": "pointed", "tail": "bushy", "barks": True,  "label": "Dog"},
    {"name": "Pug",     "ears": "floppy",  "tail": "curled", "barks": True,  "label": "Dog"}
]

def classify_mystery_animal(ears, tail, barks):
    """
    Classifies an animal based on feature weights learned from examples.
    Observation: In our dataset, 'barks=True' is 100% indicative of Dog.
    If 'barks=False', pointed ears indicate Cat.
    """
    cat_score = 0
    dog_score = 0
    
    # Feature 1: Barking behavior (High weight)
    if barks:
        dog_score += 3
    else:
        cat_score += 3
        
    # Feature 2: Ear shape
    if ears == "pointed":
        cat_score += 1
        dog_score += 0.5  # Huskies also have pointed ears
    elif ears == "floppy":
        dog_score += 1
        
    # Decision output based on highest score
    if dog_score > cat_score:
        confidence = (dog_score / (dog_score + cat_score)) * 100
        return "Dog", round(confidence, 1)
    else:
        confidence = (cat_score / (dog_score + cat_score)) * 100
        return "Cat", round(confidence, 1)

# ----------------- EVALUATION ON UNSEEN TEST CASES -----------------
test_cases = [
    {"test_id": "Mystery-A", "ears": "pointed", "tail": "sleek", "barks": False},
    {"test_id": "Mystery-B", "ears": "pointed", "tail": "bushy", "barks": True},
    {"test_id": "Mystery-C", "ears": "floppy",  "tail": "fluffy", "barks": True}
]

print("=== CYBER-PET CLASSIFIER INFERENCE RUN ===")
for test in test_cases:
    prediction, conf = classify_mystery_animal(test['ears'], test['tail'], test['barks'])
    print(f"[{test['test_id']}] Traits: Ears={test['ears']}, Barks={test['barks']} "
          f"--> Predicted: {prediction} ({conf}% confidence)")
```

#### Expected Program Output:
```text
=== CYBER-PET CLASSIFIER INFERENCE RUN ===
[Mystery-A] Traits: Ears=pointed, Barks=False --> Predicted: Cat (88.9% confidence)
[Mystery-B] Traits: Ears=pointed, Barks=True --> Predicted: Dog (77.8% confidence)
[Mystery-C] Traits: Ears=floppy, Barks=True --> Predicted: Dog (100.0% confidence)
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Core Definitions)
In a dataset designed to train an AI model to detect whether incoming emails are "Spam" or "Legitimate", what do the individual words in the email represent, and what does the "Spam / Legitimate" tag represent?
- **A)** The words are Labels; the tag is a Feature.
- **B)** The words are Features; the tag is a Label.
- **C)** Both the words and the tag are Models.
- **D)** The words are Predictions; the tag is a Training Pass.
- **Correct Answer:** **B**
- **Explanation:** In supervised machine learning, the observable characteristics or variables extracted from the input data (such as specific keywords like "Discount", "Winner", or "Free") are called **Features**. The target category or ground-truth answer that the model is trying to predict is called the **Label**.

#### Question 2 (Dataset Balance & Distribution)
A developer trains an image classifier to detect bicycle helmets. The training dataset consists of 990 images of cyclists wearing black helmets and only 10 images of cyclists wearing bright yellow helmets. When tested on a new photo of a cyclist wearing a bright yellow helmet in daylight, the AI fails to detect it. What is the fundamental cause?
- **A)** The camera resolution was too sharp.
- **B)** Class imbalance and lack of feature variation in the training data.
- **C)** Yellow helmets cannot be photographed by digital sensors.
- **D)** Machine learning algorithms only understand monochrome data.
- **Correct Answer:** **B**
- **Explanation:** The dataset suffered from severe **class/attribute imbalance**. Because 99% of the training images featured black helmets, the model learned to associate helmet detection almost entirely with the color black. To build a robust model, the training dataset must include diverse colors, shapes, and lighting conditions.

#### Question 3 (Higher-Order Thinking: Feature Selection)
A hospital wants to build an AI system to predict which patients are at high risk of developing severe asthma attacks. Which of the following sets of features would be most clinically relevant and informative for the model?
- **A)** Patient's shoe size, favorite color, and home Wi-Fi password.
- **B)** Daily pollen count, air quality index (PM2.5), past hospital visits, and lung capacity test score.
- **C)** Mother's high school graduation year and patient's preferred television channel.
- **D)** The brand of smartphone the patient carries and their cafeteria lunch tray number.
- **Correct Answer:** **B**
- **Explanation:** Effective machine learning depends heavily on **Feature Selection**—choosing attributes that possess causal or strong statistical relationships with the outcome. Air quality, pollen levels, past medical history, and spirometry (lung capacity) have direct physiological links to asthma exacerbations, whereas shoe size and favorite colors are irrelevant noise.

#### Question 4 (Supervised Learning Methodology)
Why is it essential to test an AI model using data that was **never** included in its training set?
- **A)** Because computers delete their memory after training.
- **B)** To evaluate if the model has genuinely learned to generalize patterns or if it simply memorized the specific training examples (overfitting).
- **C)** Because running the training data twice breaks the computer processor.
- **D)** Unseen data is always smaller in file size.
- **Correct Answer:** **B**
- **Explanation:** If you test a student using the exact same math problems they practiced the night before, they might score 100% simply by memorizing the answers without understanding the underlying math concepts. In AI, testing on unseen data verifies **Generalization**—the ability to apply learned patterns to brand new situations.

#### Question 5 (Data Quality & Integrity)
The phrase *"Garbage In, Garbage Out"* is a foundational rule in AI engineering. What does it signify?
- **A)** AI models can only be trained on recycled electronic computer chips.
- **B)** If an AI model is trained on inaccurate, noisy, biased, or corrupted data, its predictions will be equally flawed and unreliable.
- **C)** Computers automatically delete all files placed in the recycle bin after 24 hours.
- **D)** Old machine learning models must be discarded into the waste bin every month.
- **Correct Answer:** **B**
- **Explanation:** An AI model is only as smart as the data used to train it. If training data contains incorrect labels, measurement errors, or severe omissions, the model will faithfully internalize those flaws, producing disastrously poor predictions when deployed.

---

### 9. Responsible AI & Ethical Reflection

#### Who Decides What the AI Learns?
When an AI model makes an unfair decision, who is responsible?
- **Human Authorship of Data:** Data does not fall from the sky. Humans choose which photos to collect, which questions to ask in surveys, and how items are labeled. If human collectors carry personal biases, those biases are baked directly into the training data.
- **Representational Fairness:** If a facial recognition AI is trained on 90% light-skinned male faces and only 10% dark-skinned or female faces, it will perform significantly worse on women and minorities. AI engineers have an ethical duty to audit training sets for fairness, diversity, and balance before deploying models in society.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Terminology** | Correctly defines Dataset, Feature, Label, and Model. | 100 XP | Data Cadet |
| **Pillar 2: Game Mastery** | Scores 6+ on *The Training Ground* mystery gauntlet. | 100 XP | Model Trainer |
| **Pillar 3: Python Coding** | Runs and explains the feature-matching scoring script. | 100 XP | Algorithm Apprentice |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad multiple-choice questions. | 100 XP | Olympiad Scholar |
| **Bonus: Dataset Architect** | Creates a complete 10-row balanced snack dataset table. | 50 XP | Master Curator |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
