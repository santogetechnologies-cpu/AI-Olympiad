# Class 8 • Chapter 1: AI Basics
## Lesson 1: How AI Makes Choices

**Syllabus Reference:** Class 8, Chapter 1 (AI Basics) — Lesson 1: *How AI Makes Choices*  
**Target Age Group:** 13–14 Years (Middle Level Advanced)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain how machine learning models construct Decision Boundaries** to separate distinct classes in multi-dimensional feature space.
2. **Deconstruct Decision Trees and Weighted Linear Classifiers**, calculating probability scores and class boundaries mathematically.
3. **Analyze the impact of Confidence Thresholds ($\tau$)**, tuning trade-offs between precision, recall, and false alarms.
4. **Evaluate the "Black Box" Problem in Deep Learning**, contrasting opaque models with **Explainable AI (XAI)** frameworks.
5. **Implement an interactive linear decision boundary classifier in Python** that evaluates test instances against mathematical separation hyperplanes.

#### Prerequisite Knowledge
- Cartesian coordinate geometry ($x$ and $y$ planes, linear equations $y = mx + c$).
- Understanding of features, labels, and datasets from Class 7, Chapter 1.
- Basic Python functions and comparison operators.

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Asteroid Intercept: Deep-Space Orbital Shield*  
> **Mission Briefing:** Urgent Alert from Planetary Defense Command!  
> The Lunar Early Warning Radar Array has detected an incoming cluster of 50 fast-moving deep-space astronomical bodies hurtling toward Earth's orbital path!  
> Some of these objects are harmless **"Ice-Comets"** that will vaporize harmlessly in the upper atmosphere. Others are hyper-dense, metallic **"Iron-Asteroids"** capable of devastating a continent upon impact!  
> Planetary defense kinetic lasers have only enough electrical charge to destroy 12 targets. If the defense AI misidentifies an Iron Asteroid as an Ice Comet, millions of lives are at risk. If it wastes laser shots on harmless ice, the battery will be exhausted when the real threat arrives!  
> As the **Chief Ballistic AI Architect**, your mission is to design the **Mathematical Decision Boundary**, tune the classification confidence thresholds, and program the laser targeting engine to intercept every metallic hazard without wasting a single joule of energy!

---

### 3. Core Concept Explanations & The Geometry of Decisions

#### What is a Decision Boundary?
When an AI model makes a choice between two categories (e.g., Cat vs Dog, Spam vs Not Spam, Asteroid vs Comet), it plots every example as a coordinate point in **Feature Space**:

```
Feature 2: Density (g/cm³)
▲
│        [Iron-Asteroid]  *  *  (Dense Metal)
│                       *  *  *
│  ─────────────────────────────────────  <-- DECISION BOUNDARY (Separation Line!)
│       [Ice-Comet]   ·  ·
│                    ·  ·  ·   (Porous Ice)
└─────────────────────────────────────────► Feature 1: Velocity (km/s)
```

- **Feature Space:** A geometric space where each axis corresponds to a measurable feature (e.g., Axis $X$ = Velocity, Axis $Y$ = Density).
- **Decision Boundary:** The mathematical line, plane, or curved hyperplane that separates one class from another.
  - If a mystery object lands **above** the boundary line ➔ Classified as **Iron-Asteroid**.
  - If it lands **below** the boundary line ➔ Classified as **Ice-Comet**.

#### The Linear Decision Formula
In a 2-feature system ($x_1$ = Velocity, $x_2$ = Density), a linear classifier calculates a **Weighted Sum**:

$$z = (w_1 \cdot x_1) + (w_2 \cdot x_2) + b$$

- $w_1, w_2$: **Feature Weights** (how important each feature is in making the choice).
- $b$: **Bias Term** (shifts the decision threshold up or down).
- **Decision Rule:**
  - If $z \ge 0 \implies \text{Class: Iron-Asteroid}$
  - If $z < 0 \implies \text{Class: Ice-Comet}$

#### Confidence Scores & Threshold Tuning ($\tau$)
Instead of just outputting a rigid label, modern AI models calculate a **Probability / Confidence Score** $P(\text{Threat})$ between `0.0` (0%) and `1.0` (100%):
- By default, standard computer systems use a threshold of $\tau = 0.50$ (50%).
- **In High-Stakes Safety Systems (Planetary Defense / Cancer Detection):**
  - We do NOT wait for 50% probability! If there is even a **15% chance** ($\tau = 0.15$) of an asteroid being metallic iron, the system flags it for urgent defensive tracking.
  - **Lowering Threshold ($\tau \downarrow$):** Catches every true threat (High Recall), but increases False Alarms.
  - **Raising Threshold ($\tau \uparrow$):** Ensures zero false alarms (High Precision), but risks letting a real threat slip through (Fatal False Negative!).

---

### 4. Guided Reasoning & Experiment

#### Interactive Experiment: The Fruit Sorter Decision Line
Imagine an automated factory sorting **Oranges** from **Grapefruits** using two features:
- $x_1$: Weight in grams (Range: 100g to 300g).
- $x_2$: Diameter in centimeters (Range: 6cm to 14cm).

```text
Orange A:    Weight = 140g, Diameter = 7.2cm  (Label: Orange)
Orange B:    Weight = 160g, Diameter = 7.8cm  (Label: Orange)
Grapefruit C: Weight = 260g, Diameter = 11.5cm (Label: Grapefruit)
Grapefruit D: Weight = 290g, Diameter = 12.8cm (Label: Grapefruit)
```

**The Boundary Line Equation:**
Let the model learn the boundary: $\text{Weight} + 20 \times \text{Diameter} = 320$.

**The Test Object (Mystery Fruit X):**
- $\text{Weight} = 150\text{g}$, $\text{Diameter} = 7.5\text{cm}$.
- Compute score: $150 + (20 \times 7.5) = 150 + 150 = 300$.
- Is $300 < 320$? **Yes!**
- The point falls on the Orange side of the boundary. The AI predicts: **Orange (Confidence: 94%)**!

---

### 5. Interactive Game Specification

#### Game Title: *The Decision Boundary Architect*
- **Game Engine Type:** 2D Scatter Plot Geometry & Hyperplane Optimization Puzzle.
- **Educational Objective:** Hands-on manipulation of feature weights, bias offsets, and non-linear boundary thresholds to separate complex data clusters.

#### Game Rules & Mechanics:
1. **The Radar Display (50 Incoming Deep-Space Objects):**
   - The student views a live 2D scatter plot:
     - Blue Dots: Harmless Ice-Comets.
     - Red Triangles: Deadly Iron-Asteroids.
     - Yellow Stars: Mystery Interstellar Objects.
2. **Phase 1 (The Linear Slicer):**
   - The student adjusts sliders for **Weight 1 ($w_1$)**, **Weight 2 ($w_2$)**, and **Bias ($b$)**.
   - A bright laser line rotates and shifts across the grid in real time.
   - *Goal:* Position the line to cleanly separate all Red Triangles from Blue Dots with 0 misclassifications.
3. **Phase 2 (The Non-Linear Cluster Trap):**
   - An anomalous cluster appears: Some comets are dense, but extremely cold; some asteroids are small, but spinning fast! A single straight line cannot separate them!
   - *Student Action:* Unlock the **Polynomial / Decision Tree Mode**, carving out an adaptive rectangular or curved decision boundary.
4. **Phase 3 (The Intercept Gauntlet):**
   - Incoming mystery objects are streamed across the boundary.
   - The system triggers kinetic defense lasers based on the student's calibrated threshold ($\tau$).

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Boundary Draftsman* (Achieved clean linear separation on Phase 1)
  - 🥈 *Non-Linear Strategist* (Successfully handled the complex cluster in Phase 2)
  - 🥇 *Planetary Defense Commander* (100% intercept rate with zero wasted laser shots)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Medical Triage Decision Boundary*
**Objective:** Formulate a mathematical 2-variable decision boundary for an emergency room AI triage system that flags patients at high risk of cardiac arrest.

**Requirements:**
1. **Define Two Measurable Clinical Features:**
   - Feature 1 ($x_1$): Resting Heart Rate (Beats per minute, BPM).
   - Feature 2 ($x_2$): Systolic Blood Pressure (mmHg).
2. **Plot 6 Simulated Patients:**
   - 3 Low-Risk patients (Normal heart rate, normal blood pressure).
   - 3 High-Risk patients (Tachycardia $>120$ BPM, Hypertension $>160$ mmHg).
3. **Formulate the Linear Separation Inequality:** Write a mathematical inequality $(w_1 x_1 + w_2 x_2 > \text{Threshold})$ that triggers an **Emergency Code Red Alert**.
4. **Safety Analysis:** Explain why an emergency triage AI should intentionally tolerate False Alarms to prevent a fatal False Negative.

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement a 2-Feature Linear Decision Boundary Classifier in Python with dynamic threshold tuning.

```python
# =====================================================================
# AI OLYMPIAD CLASS 8: CHAPTER 1 LESSON 1
# MATHEMATICAL DECISION BOUNDARY & ORBITAL HAZARD CLASSIFIER
# =====================================================================

def evaluate_asteroid_threat(velocity_kms, density_gcc, weight_v=1.2, weight_d=2.5, bias=-18.0, threshold=0.0):
    """
    Computes a linear decision score for an approaching celestial object.
    Boundary Formula: z = (w_v * Velocity) + (w_d * Density) + Bias
    If z >= threshold: Classified as DANGEROUS METALLIC ASTEROID
    Else: Classified as HARMLESS ICE COMET
    """
    # 1. Compute linear weighted score
    z_score = (weight_v * velocity_kms) + (weight_d * density_gcc) + bias
    
    # 2. Convert z_score to a probabilistic confidence score using sigmoid
    import math
    try:
        probability = 1.0 / (1.0 + math.exp(-z_score))
    except OverflowError:
        probability = 1.0 if z_score > 0 else 0.0
        
    is_threat = z_score >= threshold
    
    return {
        "z_score": round(z_score, 2),
        "probability": round(probability * 100, 1),
        "is_threat": is_threat,
        "action": "💥 FIRE DEFENSE LASER" if is_threat else "🛸 HOLD FIRE (Harmless Ice)"
    }

# ----------------- SIMULATED CELESTIAL TARGET STREAM -----------------
# Target telemetry: [Name, Velocity (km/s), Density (g/cm³)]
targets = [
    {"id": "Obj-Alpha", "vel": 12.0, "density": 1.2},  # Fast but light ice comet
    {"id": "Obj-Beta",  "vel": 8.5,  "density": 7.8},  # Dense nickel-iron asteroid
    {"id": "Obj-Gamma", "vel": 14.5, "density": 5.4},  # Extremely fast, heavy rock
    {"id": "Obj-Delta", "vel": 4.0,  "density": 0.9}   # Slow fluffy snow comet
]

print("=== PLANETARY DEFENSE ORBITAL DECISION BOUNDARY RUN ===\n")
print(f"Active Model Weights: w_Velocity = 1.2 | w_Density = 2.5 | Bias = -18.0\n")
print(f"{'OBJECT ID':<11} | {'VEL (km/s)':<11} | {'DENSITY':<10} | {'Z-SCORE':<9} | {'PROBABILITY':<12} | {'DECISION'}")
print("-" * 75)

for t in targets:
    result = evaluate_asteroid_threat(t["vel"], t["density"])
    print(f"{t['id']:<11} | {t['vel']:<11.1f} | {t['density']:<10.1f} | {result['z_score']:<9.2f} | {result['probability']:<5.1f}%      | {result['action']}")

print("-" * 75)
print("Analysis: Obj-Beta and Obj-Gamma cleanly classified above boundary (z >= 0)!")
```

#### Expected Program Output:
```text
=== PLANETARY DEFENSE ORBITAL DECISION BOUNDARY RUN ===

Active Model Weights: w_Velocity = 1.2 | w_Density = 2.5 | Bias = -18.0

OBJECT ID   | VEL (km/s)  | DENSITY    | Z-SCORE   | PROBABILITY  | DECISION
---------------------------------------------------------------------------
Obj-Alpha   | 12.0        | 1.2        | -0.60     | 35.4%        | 🛸 HOLD FIRE (Harmless Ice)
Obj-Beta    | 8.5         | 7.8        | 11.70     | 100.0%       | 💥 FIRE DEFENSE LASER
Obj-Gamma   | 14.5        | 5.4        | 12.90     | 100.0%       | 💥 FIRE DEFENSE LASER
Obj-Delta   | 4.0         | 0.9        | -10.95    | 0.0%         | 🛸 HOLD FIRE (Harmless Ice)
---------------------------------------------------------------------------
Analysis: Obj-Beta and Obj-Gamma cleanly classified above boundary (z >= 0)!
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Decision Boundaries & Hyperplanes)
In machine learning geometric theory, what is a **Decision Boundary**?
- **A)** The physical plastic casing surrounding a computer's central processing unit.
- **B)** A mathematical hypersurface that partitions a multi-dimensional feature space into distinct regions, determining the predicted class for any given data coordinate.
- **C)** The edge of the computer screen.
- **D)** A firewall that prevents internet hacking.
- **Correct Answer:** **B**
- **Explanation:** In supervised classification, the model maps input feature vectors into an $n$-dimensional Euclidean space. The **Decision Boundary** is the learned mathematical manifold (a 1D line in 2D space, a 2D plane in 3D space, or a hyperplane in higher dimensions) where the predicted class probabilities are exactly equal ($P = 0.50$).

#### Question 2 (Feature Weight Interpretation)
In a linear credit loan approval model governed by the equation:
$$z = (0.8 \times \text{Income}) - (2.5 \times \text{Unpaid Debt}) + (1.2 \times \text{Savings}) - 50$$
What does the negative weight coefficient ($-2.5$) for `Unpaid Debt` signify?
- **A)** The bank pays the customer money whenever they go into debt.
- **B)** As an applicant's unpaid debt increases, their overall credit score $z$ decreases rapidly, making loan rejection significantly more likely.
- **C)** Negative numbers cannot be used in computer science.
- **D)** Unpaid debt has zero influence on the loan decision.
- **Correct Answer:** **B**
- **Explanation:** In linear models, the sign and magnitude of a feature weight determine its directional influence. A positive weight increases the target outcome; a negative weight ($-2.5$) penalizes the score, pulling the applicant's coordinate down away from the loan approval decision boundary.

#### Question 3 (Threshold Calibration & Risk Trade-offs)
A cancer diagnostic AI outputs a malignancy risk probability $P(\text{Cancer})$ between $0.0$ and $1.0$. The default software threshold is $\tau = 0.50$. Why do hospital oncologists deliberately lower the diagnostic decision threshold to $\tau = 0.15$?
- **A)** Because oncologists prefer operating on healthy people.
- **B)** To maximize **Recall (Sensitivity)**: in oncology, a False Negative (missing a real deadly tumor) can be fatal, so the system is tuned to flag any suspicious lesion even if it triggers more non-fatal False Positives that can be ruled out by a follow-up biopsy.
- **C)** Lower thresholds make the computer run faster.
- **D)** Lowering thresholds reduces hospital electricity bills.
- **Correct Answer:** **B**
- **Explanation:** Threshold selection reflects real-world asymmetric risk. The penalty of a **False Negative** in cancer screening is death; the penalty of a **False Positive** is an unnecessary follow-up ultrasound. Lowering $\tau$ to 0.15 catches every possible malignancy early, prioritizing patient survival.

#### Question 4 (Higher-Order Scenario: The Black Box Dilemma)
A deep neural network containing 500 million parameters achieves 99.4% accuracy predicting which parole applicants will commit future crimes. However, the algorithm cannot provide an interpretable reason why Applicant $X$ was rejected while Applicant $Y$ was approved. What is this challenge called in AI governance?
- **A)** The Quantum Computing Race
- **B)** The **Black Box / Explainability Problem (XAI)**: the mathematical complexity of deep weights makes internal reasoning opaque, violating human legal rights to due process and an explanation.
- **C)** A hardware memory leak.
- **D)** The Turing Test.
- **Correct Answer:** **B**
- **Explanation:** Complex deep neural models are often **Black Boxes**: while highly accurate at mapping inputs to outputs, their millions of non-linear parameter interactions make it mathematically impossible for human judges or doctors to trace the exact rationale behind a specific individual decision, conflicting directly with democratic legal rights to explanation.

#### Question 5 (Non-Linear Decision Boundaries)
Suppose a 2D dataset consists of a cluster of blue points centered at $(0, 0)$ completely surrounded by a circular outer ring of red points. Can a standard single-line linear classifier cleanly separate the two classes?
- **A)** Yes, a vertical line can easily separate concentric circles.
- **B)** No, concentric circular distributions are not linearly separable; the system requires a non-linear decision boundary (such as a radial basis function, polynomial kernel, or multi-layer neural network).
- **C)** Yes, any line can divide any shape.
- **D)** Concentric circles cannot exist in computer science.
- **Correct Answer:** **B**
- **Explanation:** This is the famous **XOR / Concentric Circle Problem** that historic perceptrons could not solve. A single straight line cannot separate an inner circle from an enclosing outer ring. Handling non-linear topology requires multi-layer neural networks or kernel transformations that project the data into higher dimensions.

---

### 9. Responsible AI & Ethical Reflection

#### The Human Right to an Explanation (XAI)
When machines make life-altering choices:
- **No Invisible Judgments:** In medicine, criminal sentencing, and university admissions, a human being should never be denied their future because *"the neural network calculated a negative score"*.
- **Explainable AI (XAI) Mandate:** Engineers must build systems with feature-attribution tools (like SHAP and LIME) that highlight the exact evidence used, ensuring human oversight, accountability, and the right to appeal algorithmic decisions.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Geometry of Decisions**| Explains feature space, decision boundaries, and threshold tuning ($\tau$). | 100 XP | Boundary Scholar |
| **Pillar 2: Architect Game** | Successfully calibrates weights to intercept targets in *Decision Boundary Architect*. | 100 XP | Orbital Strategist |
| **Pillar 3: Python Coding** | Runs the linear decision boundary script and explains z-score probabilities. | 100 XP | Hyperplane Coder |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad decision boundaries and XAI questions. | 100 XP | Olympiad Scholar |
| **Bonus: Triage Blueprint** | Formulates a two-variable clinical boundary with asymmetric risk analysis. | 50 XP | Chief Systems Architect |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
