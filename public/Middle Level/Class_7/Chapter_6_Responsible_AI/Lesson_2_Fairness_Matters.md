# Class 7 • Chapter 6: Responsible AI
## Lesson 2: Fairness Matters

**Syllabus Reference:** Class 7, Chapter 6 (Responsible AI) — Lesson 2: *Fairness Matters*  
**Target Age Group:** 12–13 Years (Middle Level Intermediate)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Define Algorithmic Bias** and trace its three root origins: Historical Bias, Representation/Sampling Bias, and Measurement/Labeling Bias.
2. **Analyze Landmark Real-World Case Studies of Algorithmic Injustice** (e.g., the MIT *Gender Shades* facial recognition audit and corporate resume screening systems).
3. **Calculate Mathematical Fairness Metrics**: Demographic Parity and the **Disparate Impact Ratio** (the legal 80% / Four-Fifths Rule).
4. **Evaluate Algorithmic De-Biasing Techniques**: Dataset rebalancing, feature anonymization, and post-processing threshold adjustments.
5. **Develop a Python Algorithmic Bias Audit Engine** that computes subgroup selection rates and flags unfair discrimination.

#### Prerequisite Knowledge
- Understanding of training data, features, and supervised learning from Chapter 1.
- Basic arithmetic ratios and percentage calculations.

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Equal Opportunity: The Hiring Algorithm Audit*  
> **Mission Briefing:** High-Stakes Audit at Mega-Corp Global!  
> Mega-Corp receives 100,000 job applications every year for engineering roles. To speed up hiring, company executives deployed an AI resume-screening bot called *Talent-AI*, trained on 15 years of past company hiring records.  
> The executive team bragged that the system was "100% objective, neutral, and scientific because computers have no feelings."  
> However, an internal whistle-blower leaked disturbing data: across 10,000 recent female applicants, *Talent-AI* recommended hiring at an 80% lower rate than identical male applicants! The AI even secretly penalized resumes containing the word *"Women's"* (such as *"Captain of the Women's Chess Club"*).  
> You have been appointed as the **Independent Algorithmic Justice Auditor**! Your mission is to enter the *Fair Hiring Lab*, audit the algorithm's neural weights, compute the Disparate Impact Ratio, expose the hidden bias, and rebalance the model to ensure fair, equal opportunities for all qualified candidates!

---

### 3. Core Concept Explanations & The Roots of Algorithmic Bias

#### The Myth of Machine Objectivity
Algorithms are not magical, neutral entities that fall from the heavens. Algorithms are created by humans, trained on human data, and optimized for human-defined goals:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE THREE ROOTS OF ALGORITHMIC BIAS                  │
├────────────────────┬─────────────────────┬─────────────────────────────┤
│ 1. HISTORICAL BIAS │ 2. REPRESENTATION   │ 3. MEASUREMENT / PROXY BIAS │
│ The training data  │ (SAMPLING) BIAS     │ Using a flawed substitute   │
│ faithfully records │ Specific demographic│ feature to stand in for a   │
│ real-world human   │ groups are missing  │ complex human quality.      │
│ prejudices from    │ or underrepresented │ Example: Using zip codes    │
│ past decades.      │ in the dataset.     │ as a proxy for credit risk. │
└────────────────────┴─────────────────────┴─────────────────────────────┘
```

#### Landmark Case Study: The MIT *Gender Shades* Audit
In 2018, computer scientist Joy Buolamwini conducted a historic audit of commercial facial recognition systems developed by major tech corporations:
- **Lighter-skinned Males:** Model error rate was under **0.8%** (Virtually flawless).
- **Lighter-skinned Females:** Model error rate was roughly **7.0%**.
- **Darker-skinned Males:** Model error rate was roughly **12.0%**.
- **Darker-skinned Females:** Model error rate surged to **34.7%!** (Failed on more than 1 out of 3 faces!).
- *Why did this happen?*
  - The benchmark facial datasets used by engineers were over **77% male** and over **83% lighter-skinned**! The neural networks had simply never seen enough diverse faces to learn their features properly.

#### Mathematical Fairness Metric: The Disparate Impact Ratio
In legal civil rights and computational auditing, the **Disparate Impact Ratio (DIR)** measures whether an automated selection system unfairly disadvantages a protected demographic group:

$$\text{Disparate Impact Ratio (DIR)} = \frac{\text{Selection Rate of Protected Group (e.g., Women)}}{\text{Selection Rate of Advantaged Group (e.g., Men)}}$$

- **The Legal 80% (Four-Fifths) Rule:**
  - If $\text{DIR} \ge 0.80$ (80%), the system is legally considered to meet baseline fairness parity.
  - If $\text{DIR} < 0.80$, the algorithm is flagged for **Severe Adverse Impact / Algorithmic Discrimination!**

```
Worked Example:
- Male Applicants: 1,000 applied ➔ 300 selected (Selection Rate = 300 / 1000 = 30.0%)
- Female Applicants: 1,000 applied ➔ 120 selected (Selection Rate = 120 / 1000 = 12.0%)

Disparate Impact Ratio = 12.0% / 30.0% = 0.40 (40%)
--> 40% is FAR BELOW the 80% threshold! THE ALGORITHM IS ILLEGALLY BIASED!
```

---

### 4. Guided Reasoning & Experiment

#### Interactive Experiment: The Proxy Feature Trap
A company wants to remove bias from their loan evaluation algorithm. They instruct engineers:
> *"Delete the 'Gender' and 'Ethnicity' columns from the dataset completely! If the AI doesn't know the applicant's gender, it cannot discriminate!"*

**The Surprise Finding:** After deleting the columns, the AI still rejects women at the exact same biased rate! Why?

**Guided Investigation:**
1. *What other columns remained in the table?*
   - Features included: Sports played, High School attended, Magazine subscriptions, Past career interruptions for maternity care.
2. *How the AI Reconstructed Gender (Proxy Features):*
   - The AI noticed that applicants who had a 1-year gap in work history at age 30, belonged to the "Softball League", and subscribed to parenting journals were historically rejected by past human managers.
   - The AI easily reconstructed gender using **Proxy Variables** without ever looking at the label!
3. **The Lesson:** **"Fairness through Unawareness" DOES NOT WORK.** You cannot fix bias simply by hiding demographic labels; you must actively audit and rebalance the mathematical relationships.

---

### 5. Interactive Game Specification

#### Game Title: *The Fair Hiring Algorithm Audit*
- **Game Engine Type:** Algorithmic De-Biasing & Policy Optimization Lab.
- **Educational Objective:** Hands-on experience in calculating Disparate Impact Ratios, discovering proxy features, and re-weighting hiring models.

#### Game Rules & Mechanics:
1. **The Corporate Candidate Pool (100 Applicant Resumes):**
   - 50 Demographic Group A (Advantaged baseline).
   - 50 Demographic Group B (Protected group).
   - Both groups have identical average GPA ($3.7/4.0$) and coding test scores ($88/100$).
2. **Phase 1 (The Biased Baseline Run):**
   - The original corporate model runs:
     - Group A: 35 candidates approved (70% selection rate).
     - Group B: 10 candidates approved (20% selection rate).
     - Calculated DIR: $\frac{20\%}{70\%} = 0.28$ (28% ➔ FAILED AUDIT!).
3. **Phase 2 (The Proxy Feature Hunt):**
   - The student inspects feature importance weights.
   - Finds hidden proxy penalty: Resumes with *"Women's Rugby"* or *"Maternity Gap"* received $-40$ penalty points!
   - *Action:* Student zeroes out the biased proxy penalties and re-normalizes feature weights to focus 100% on verified coding competence and problem-solving metrics.
4. **Phase 3 (The Rebalanced Validation Gate):**
   - The student re-evaluates the candidate pool.
   - Group A selection rate: 60%. Group B selection rate: 58%.
   - New DIR: $\frac{58\%}{60\%} = 0.967$ ($96.7\%$ ➔ **PASSED FAIRNESS AUDIT!**).

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Proxy Hunter* (Discovered the hidden negative penalty)
  - 🥈 *Four-Fifths Champion* (Elevated DIR above the legal 80% threshold)
  - 🥇 *Algorithmic Justice Commissioner* (Achieved 95%+ demographic parity while maintaining highest candidate talent quality)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Algorithmic Fairness Audit Blueprint*
**Objective:** Conduct a formal written fairness audit of an AI system used in your community (e.g., automated exam grading, facial recognition security cameras at airports, or social media recommendation algorithms).

**Audit Blueprint Sections:**
1. **System Under Review:** Describe what decisions the AI automates and who is affected.
2. **Vulnerability Analysis:** Which demographic groups are most vulnerable to being harmed by high error rates or bias in this system?
3. **Data Source Audit:** Where was the training data collected? Was there demographic under-representation?
4. **Remediation Plan:** Propose two concrete engineering actions the development team must take to restore fairness and balance.

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement an automated Disparate Impact & Subgroup Parity Calculator in Python.

```python
# =====================================================================
# AI OLYMPIAD CLASS 7: CHAPTER 6 LESSON 2
# RESPONSIBLE AI: DISPARATE IMPACT & ALGORITHMIC FAIRNESS AUDITOR
# =====================================================================

def calculate_disparate_impact(applicant_records, protected_attribute, target_decision="APPROVED"):
    """
    Computes selection rates and Disparate Impact Ratio (DIR) across demographic subgroups.
    Evaluates compliance against the legal 80% (Four-Fifths) Fair Hiring Rule.
    """
    subgroup_counts = {}
    subgroup_selections = {}
    
    # 1. Tally applicants and positive selections per subgroup
    for person in applicant_records:
        group = person[protected_attribute]
        decision = person["decision"]
        
        subgroup_counts[group] = subgroup_counts.get(group, 0) + 1
        if decision == target_decision:
            subgroup_selections[group] = subgroup_selections.get(group, 0) + 1
            
    # 2. Compute selection rates
    selection_rates = {}
    for group in subgroup_counts:
        approved = subgroup_selections.get(group, 0)
        total = subgroup_counts[group]
        selection_rates[group] = approved / total

    # Identify advantaged (highest rate) and protected (lowest rate) groups
    sorted_groups = sorted(selection_rates.items(), key=lambda x: x[1], reverse=True)
    advantaged_group, highest_rate = sorted_groups[0]
    protected_group, lowest_rate = sorted_groups[-1]
    
    # 3. Calculate Disparate Impact Ratio (DIR)
    dir_ratio = lowest_rate / highest_rate if highest_rate > 0 else 1.0
    passes_four_fifths_rule = dir_ratio >= 0.80

    return {
        "selection_rates": selection_rates,
        "advantaged_group": advantaged_group,
        "protected_group": protected_group,
        "dir_ratio": round(dir_ratio, 3),
        "compliant": passes_four_fifths_rule
    }

# ----------------- SIMULATED CORPORATE APPLICANT AUDIT -----------------
# 10 Simulated applicants evaluated by Talent-AI
corporate_applicants = [
    {"id": "APP-01", "gender": "Male",   "gpa": 3.8, "decision": "APPROVED"},
    {"id": "APP-02", "gender": "Male",   "gpa": 3.7, "decision": "APPROVED"},
    {"id": "APP-03", "gender": "Male",   "gpa": 3.5, "decision": "APPROVED"},
    {"id": "APP-04", "gender": "Male",   "gpa": 3.4, "decision": "REJECTED"},
    {"id": "APP-05", "gender": "Male",   "gpa": 3.9, "decision": "APPROVED"},  # Male rate = 4/5 = 80%
    {"id": "APP-06", "gender": "Female", "gpa": 3.9, "decision": "APPROVED"},
    {"id": "APP-07", "gender": "Female", "gpa": 3.8, "decision": "REJECTED"},
    {"id": "APP-08", "gender": "Female", "gpa": 3.7, "decision": "REJECTED"},
    {"id": "APP-09", "gender": "Female", "gpa": 3.6, "decision": "REJECTED"},
    {"id": "APP-10", "gender": "Female", "gpa": 3.8, "decision": "REJECTED"}   # Female rate = 1/5 = 20%
]

print("=== MEGA-CORP TALENT-AI ALGORITHMIC BIAS AUDIT ===\n")
audit_result = calculate_disparate_impact(corporate_applicants, protected_attribute="gender")

print("Subgroup Selection Rates:")
for grp, rate in audit_result["selection_rates"].items():
    print(f"  • Group '{grp}': {rate * 100:.1f}% approved")
    
print("-" * 55)
print(f"Advantaged Cohort : {audit_result['advantaged_group']}")
print(f"Disadvantaged Cohort : {audit_result['protected_group']}")
print(f"Disparate Impact Ratio (DIR) : {audit_result['dir_ratio']} ({audit_result['dir_ratio'] * 100:.1f}%)")
print(f"Legal 80% Rule Compliance   : {'✅ COMPLIANT' if audit_result['compliant'] else '🚨 NON-COMPLIANT (ILLEGALLY BIASED)'}")

if not audit_result["compliant"]:
    print("\nAuditor Mandate: Immediate suspension of automated hiring filter required!")
    print("Action: Remove proxy penalties and re-train model with balanced historical weights.")
```

#### Expected Program Output:
```text
=== MEGA-CORP TALENT-AI ALGORITHMIC BIAS AUDIT ===

Subgroup Selection Rates:
  • Group 'Male': 80.0% approved
  • Group 'Female': 20.0% approved
-------------------------------------------------------
Advantaged Cohort : Male
Disadvantaged Cohort : Female
Disparate Impact Ratio (DIR) : 0.25 (25.0%)
Legal 80% Rule Compliance   : 🚨 NON-COMPLIANT (ILLEGALLY BIASED)

Auditor Mandate: Immediate suspension of automated hiring filter required!
Action: Remove proxy penalties and re-train model with balanced historical weights.
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Algorithmic Bias Foundations)
If an AI system trained to evaluate bank mortgages consistently rejects applicants from specific ethnic minorities at twice the rate of other applicants with identical financial incomes, what is the fundamental cause?
- **A)** The bank's internet cables are defective.
- **B)** Algorithmic Bias: historical training data encoded centuries of human racial lending discrimination, which the model internalized and automated as predictive mathematical features.
- **C)** The computer processor has a low clock speed.
- **D)** Banking algorithms are legally required to reject people.
- **Correct Answer:** **B**
- **Explanation:** An algorithm is not sentient; it reflects the statistical patterns present in the data supplied by humans. When models are trained on historical institutional lending data where minority communities were systematically disadvantaged (redlining), the model faithfully replicates and amplifies that historical discrimination under the guise of "objective risk calculation".

#### Question 2 (Legal & Statistical Metrics: Disparate Impact)
Under the legal Four-Fifths (80%) Rule, if a company's automated hiring AI approves 50% of male applicants, what is the **minimum acceptable selection rate** for female applicants required to avoid an immediate finding of adverse discriminatory impact?
- **A)** 10%
- **B)** 25%
- **C)** 40% (since $80\% \text{ of } 50\% = 40\%$)
- **D)** 50%
- **Correct Answer:** **C**
- **Detailed Mathematical Trace:**
  - Advantaged Group Selection Rate = $50\%$ ($0.50$).
  - Four-Fifths Rule Threshold = $80\%$ ($0.80$).
  - Minimum Legal Selection Rate for Protected Group = $0.50 \times 0.80 = 0.40 = \mathbf{40\%}$.
  - Any selection rate below 40% is legally flagged as showing disparate adverse impact.

#### Question 3 (Empirical Auditing: Joy Buolamwini's *Gender Shades*)
In the landmark MIT *Gender Shades* study, what primary data defect caused commercial facial recognition systems from leading global tech corporations to misclassify darker-skinned women nearly 35% of the time while achieving 99% accuracy on lighter-skinned men?
- **A)** Cameras cannot record dark colors.
- **B)** Severe Representation (Sampling) Bias: the training and benchmark facial datasets used by corporate engineers were overwhelmingly comprised of lighter-skinned male faces (over 75%), leaving the neural networks untrained on dark-skinned female features.
- **C)** Women do not have faces that computers can recognize.
- **D)** Deep learning algorithms cannot process human skin.
- **Correct Answer:** **B**
- **Explanation:** Machine learning models cannot accurately recognize features they have never seen during training. Because the benchmark datasets (like IJB-A and LFW) were predominantly compiled from public photos of white male executives and celebrities, the models lacked diverse facial representations, resulting in catastrophic error rates for darker-skinned women.

#### Question 4 (Higher-Order Thinking: The "Fairness Through Unawareness" Fallacy)
Why is simply deleting sensitive demographic columns (like "Race", "Religion", or "Gender") from a training dataset insufficient to eliminate algorithmic discrimination?
- **A)** Deleting columns causes Python to crash with a SyntaxError.
- **B)** Machine learning models easily reconstruct protected attributes through **Proxy Variables** (correlated features such as postal zip codes, school names, club memberships, or speech patterns) that serve as hidden stand-ins for demographic identity.
- **C)** Computers can magically read users' minds through their keyboards.
- **D)** Data cannot be deleted from computer files.
- **Correct Answer:** **B**
- **Explanation:** **Fairness through Unawareness** is a well-documented failure mode in machine learning. Complex high-dimensional datasets contain rich correlated proxy signals. An algorithm does not need an explicit "Race" column if it has access to geographic zip codes, grocery buying habits, and high school names that are demographically segregated.

#### Question 5 (Remediation & Algorithmic De-Biasing)
Which engineering intervention is considered a proactive, responsible method for mitigating algorithmic bias in a computer vision dataset?
- **A)** Deleting all photos of people and training only on rocks.
- **B)** Active Data Augmentation and Demographic Rebalancing: intentionally collecting diverse, balanced training samples across gender, age, ethnicity, and lighting conditions, and establishing independent fairness auditing benchmarks before model release.
- **C)** Making the computer monitor dimmer so the photos look darker.
- **D)** Ignoring the bias because computers are always right.
- **Correct Answer:** **B**
- **Explanation:** Meaningful algorithmic de-biasing requires proactive engineering: curating inclusive, balanced datasets, ensuring balanced representation across all demographic intersections, stress-testing models on adversarial subgroups, and continuously monitoring real-world deployment for disparate impact.

---

### 9. Responsible AI & Ethical Reflection

#### The Moral Imperative of Algorithmic Justice
When algorithms make decisions that govern human lives:
- **Fairness is an Intentional Choice:** Left unmonitored, machine learning models will naturally take the path of least mathematical resistance, which often means magnifying existing societal inequalities.
- **The Voice of the Auditor:** As young engineers and citizens, you have the right and the responsibility to demand transparency. Never accept the excuse: *"The computer made the decision."* Demand to see the training data, inspect the fairness ratios, and insist that technology serves every human being with equal dignity and justice.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Bias Foundations** | Explains Historical, Representation, and Proxy Bias with concrete examples. | 100 XP | Justice Scholar |
| **Pillar 2: Fair Hiring Game** | Uncovers the proxy feature and rebalances Talent-AI to DIR $>90\%$. | 100 XP | Algorithmic Auditor |
| **Pillar 3: Python Coding** | Runs the Disparate Impact Ratio calculator and interprets the 80% rule. | 100 XP | Parity Coder |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad algorithmic fairness and ethics questions. | 100 XP | Olympiad Scholar |
| **Bonus: Fairness Blueprint** | Submits a comprehensive 4-part algorithmic fairness audit for a community AI. | 50 XP | Chief Ethics Commissioner |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
