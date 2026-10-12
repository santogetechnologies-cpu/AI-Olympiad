# Class 7 • Chapter 1: AI Basics
## Lesson 1: AI Learns from Data

**Syllabus Reference:** Class 7, Chapter 1 (AI Basics) — Lesson 1: *AI Learns from Data*  
**Target Age Group:** 12–13 Years (Middle Level Intermediate)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Categorize data into Structured, Unstructured, and Semi-Structured formats**, explaining how each is ingested by AI pipelines.
2. **Deconstruct tabular datasets into Rows (Instances), Columns (Features), and Target Variables (Labels).**
3. **Identify common data hygiene defects**: Missing values (`NaN`), duplicate rows, measurement outliers, and conflicting labels.
4. **Contrast the Three Primary Machine Learning Paradigms**: Supervised Learning, Unsupervised Learning, and Reinforcement Learning.
5. **Implement an automated Data Cleaning & Normalization Pipeline in Python** using lists of dictionaries.

#### Prerequisite Knowledge
- Foundational understanding of datasets and features from Class 6, Chapter 1.
- Basic spreadsheet literacy (understanding tables, rows, and columns).
- Intermediate arithmetic (calculating means, medians, and ranges).

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Data Heist: The Metropolitan Museum Archives*  
> **Mission Briefing:** Emergency at the Metropolitan Heritage Museum!  
> Over the weekend, a server malfunction corrupted the museum's centuries-old antiquities database. The museum's AI search engine, which helps archaeologists identify stolen historical artifacts, has gone haywire!  
> Historical records now contain missing dates, negative artifact weights, duplicated entries, and mislabeled pottery shards. A shipment of priceless Roman coins is arriving at international customs in two hours, and the automated verification model cannot function with dirty data!  
> You have been recruited as the Lead **Data Detective**! Your mission is to enter the raw data stream, filter the noise, reconstruct missing values, excise anomalous outliers, and restore data integrity so the AI classifier can identify the genuine artifacts.

---

### 3. Core Concept Explanations & Data Engineering Foundations

#### Data: The Fuel of Modern Artificial Intelligence
Without data, an AI algorithm is like a high-performance jet engine with an empty fuel tank—completely motionless:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE THREE FORMS OF DATA                         │
├────────────────────┬─────────────────────┬─────────────────────────────┤
│ 1. STRUCTURED DATA │ 2. UNSTRUCTURED DATA│ 3. SEMI-STRUCTURED DATA    │
│ Highly organized   │ Raw files with no   │ Hybrid formats with tags    │
│ tables with clear  │ fixed tabular       │ and metadata.               │
│ rows and columns.  │ layout.             │                             │
│ Examples: SQL DBs, │ Examples: Videos,   │ Examples: JSON files,       │
│ Excel spreadsheets.│ audio files, photos.│ XML feeds, email headers.   │
└────────────────────┴─────────────────────┴─────────────────────────────┘
```

#### Anatomical Structure of a Machine Learning Dataset
When an AI examines a dataset, it splits the table into two fundamental components:

```
Dataset Matrix = Feature Matrix (X) + Label Vector (y)
```

| Artifact ID | Material (Feature $x_1$) | Weight (g) (Feature $x_2$) | Oxidation Level (Feature $x_3$) | Origin Century (Label $y$) |
| :---: | :---: | :---: | :---: | :---: |
| **A-101** | Bronze | 450.2 | Medium (3/5) | **4th Century BCE** |
| **A-102** | Terracotta | 1200.0 | Low (1/5) | **1st Century CE** |
| **A-103** | Gold | 88.5 | None (0/5) | **6th Century BCE** |
| **A-104** | Bronze | 462.0 | Medium (3/5) | **4th Century BCE** |

#### The Three Paradigms of Machine Learning

| Paradigm | How the AI Learns | Real-World Analogy | Everyday Application |
| :--- | :--- | :--- | :--- |
| **Supervised Learning** | Learns from labeled examples: given inputs ($X$) with correct answers ($y$). | A student studying for a test with textbook flashcards containing answers on the back. | Email spam detection; medical image tumor classification. |
| **Unsupervised Learning** | Explores raw unlabeled data to discover natural clusters, groupings, and hidden anomalies on its own. | Sorting a box of mixed unsorted LEGO bricks into piles based on color and shape without an instruction booklet. | Customer shopping segmentation; bank fraud anomaly detection. |
| **Reinforcement Learning** | An agent learns by interacting with a dynamic environment through trial-and-error, receiving **Rewards** (+1) for good actions and **Penalties** (-1) for bad ones. | Training a puppy with treats when it sits and gentle reprimands when it jumps. | Autonomous self-driving cars; AlphaGo and chess-playing bots. |

---

### 4. Guided Reasoning & Experiment

#### Interactive Experiment: The Anatomy of "Dirty Data"
Look at the following raw data collected by an environmental sensor:

```text
[Row 1] Temperature: 24.5°C | Humidity: 65% | Air Quality (AQI): 42
[Row 2] Temperature: 25.1°C | Humidity: 63% | Air Quality (AQI): 45
[Row 3] Temperature: 999.0°C | Humidity: 64% | Air Quality (AQI): 40  <-- OUTLIER SENSOR FAULT!
[Row 4] Temperature: 24.8°C | Humidity: None | Air Quality (AQI): 44  <-- MISSING VALUE (NaN)!
[Row 5] Temperature: 24.5°C | Humidity: 65% | Air Quality (AQI): 42  <-- DUPLICATE RECORD!
```

**Guided Investigation:**
1. *What happens if we feed Row 3 directly into our machine learning model?*
   - An outlier of `999.0°C` will completely skew the mathematical average. The model will assume that normal room temperature can reach boiling temperatures, ruining all predictive calculations!
2. *How do we handle Row 4 (Missing Value)?*
   - We have two strategies: **Deletion** (drop the row entirely if data is abundant) or **Imputation** (replace the missing value with the mean of the surrounding healthy records, e.g., $\frac{65 + 63}{2} = 64\%$).
3. *How do we handle Row 5?*
   - De-duplicate: Keep exactly one instance to prevent artificial weighting.

---

### 5. Interactive Game Specification

#### Game Title: *The Corrupt Dataset Heist*
- **Game Engine Type:** Data Cleaning Pipeline & Feature Engineering Puzzle.
- **Educational Objective:** Hands-on mastery of data preprocessing, outlier detection, and handling missing data before training.

#### Game Rules & Mechanics:
1. **The Forensic Data Table (20 Corrupted Antiquity Records):**
   - The student is presented with a messy table containing:
     - 4 Records with missing values (`None`).
     - 3 Duplicated rows.
     - 2 Extreme measurement errors (e.g., Coin weight: `-500 grams` or Pottery age: `Year 35,000 CE`).
     - 11 Clean records.
2. **Player Toolkit (Data Pipeline Operations):**
   - 🧹 *Operation A: Deduplicate* (Scans and purges identical hashes).
   - 🎯 *Operation B: Impute via Mean* (Calculates average of clean rows and fills empty cells).
   - ✂️ *Operation C: Outlier Trimmer* (Flags values $>3$ standard deviations from the median and discards or caps them).
   - 🏷️ *Operation D: Label Normalizer* (Standardizes messy strings: e.g., converts `"rome"`, `"ROMAN"`, and `"Ancient Rome"` into a single unified category `"Roman"`).
3. **The Validation Gate:**
   - The player runs their cleaned table through the virtual AI model.
   - If data hygiene reaches $>95\%$, the model unlocks customs clearance!

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Data Janitor* (Removed all duplicate records)
  - 🥈 *Outlier Hunter* (Spotted the negative weight sensor error)
  - 🥇 *Master Data Architect* (Cleaned dataset achieved 100% classification accuracy on customs test)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The School Cafeteria Dataset Audit*
**Objective:** Build a clean, structured dataset measuring student lunch nutrition.

**Requirements:**
1. Create a table with 8 rows and 5 columns:
   - `Student_ID` (e.g., S-01 to S-08)
   - `Meal_Type` (e.g., Vegetarian, Chicken Rice, Pasta)
   - `Calories` (Numerical)
   - `Fruit_Portion_Eaten` (Boolean: True / False)
   - `Satisfaction_Rating` (1 to 5)
2. Deliberately introduce one dirty record: an outlier (e.g., Calories = 50,000) and one missing entry.
3. Write a 3-step cleaning script or protocol explaining how a data scientist would resolve these two errors before using the table to predict student meal satisfaction.

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement an automated Data Cleaning and Imputation Pipeline in Python.

```python
# =====================================================================
# AI OLYMPIAD CLASS 7: CHAPTER 1 LESSON 1
# DATA ENGINEERING: AUTOMATED CLEANING & IMPUTATION PIPELINE
# =====================================================================

def clean_antiquity_dataset(raw_records):
    """
    Cleans raw museum artifact telemetry:
    1. Removes duplicate records.
    2. Identifies and removes impossible outliers (negative weights or weights > 5000g).
    3. Imputes missing weight values with the median of valid records.
    4. Normalizes text labels into clean uppercase standard format.
    """
    print(f"Initial raw records received: {len(raw_records)}")
    
    # Step 1: Remove exact duplicates
    unique_records = []
    seen_ids = set()
    for row in raw_records:
        if row["id"] not in seen_ids:
            seen_ids.add(row["id"])
            unique_records.append(row)
    print(f"After deduplication: {len(unique_records)} records remaining.")
    
    # Step 2: Extract valid weights to calculate median
    valid_weights = [
        r["weight_g"] for r in unique_records 
        if r["weight_g"] is not None and 0 < r["weight_g"] <= 5000
    ]
    valid_weights.sort()
    median_weight = valid_weights[len(valid_weights) // 2]
    print(f"Calculated replacement median weight: {median_weight:.1f} g")
    
    # Step 3: Clean and normalize records
    cleaned_dataset = []
    for row in unique_records:
        weight = row["weight_g"]
        
        # Outlier rejection / Imputation
        if weight is None or weight <= 0 or weight > 5000:
            assigned_weight = median_weight
            status = "IMPUTED"
        else:
            assigned_weight = weight
            status = "ORIGINAL"
            
        # Label normalization (e.g., 'roman', 'Ancient Rome' -> 'ROMAN')
        origin = row["origin"].strip().upper()
        if "ROM" in origin:
            clean_origin = "ROMAN"
        elif "GREEK" in origin:
            clean_origin = "GREEK"
        else:
            clean_origin = "UNKNOWN"
            
        cleaned_dataset.append({
            "id": row["id"],
            "weight_g": round(assigned_weight, 1),
            "origin": clean_origin,
            "status": status
        })
        
    return cleaned_dataset

# ----------------- SIMULATED CORRUPTED DATABASE -----------------
corrupted_artifacts = [
    {"id": "ART-01", "weight_g": 340.5, "origin": "Roman"},
    {"id": "ART-02", "weight_g": None,  "origin": "ancient roman"},   # Missing value
    {"id": "ART-03", "weight_g": -95.0, "origin": "Greek"},           # Negative outlier
    {"id": "ART-01", "weight_g": 340.5, "origin": "Roman"},           # Duplicate!
    {"id": "ART-04", "weight_g": 380.0, "origin": "ROMAN"},
    {"id": "ART-05", "weight_g": 85000.0, "origin": "greek"},         # Massive outlier
    {"id": "ART-06", "weight_g": 310.2, "origin": "GREEK"}
]

print("=== RAW DATABASE INGESTION ===")
cleaned_results = clean_antiquity_dataset(corrupted_artifacts)

print("\n=== FINAL CLEANED & NORMALIZED DATASET ===")
print(f"{'ID':<8} | {'WEIGHT (g)':<12} | {'ORIGIN':<10} | {'DATA STATUS'}")
print("-" * 45)
for item in cleaned_results:
    print(f"{item['id']:<8} | {item['weight_g']:<12.1f} | {item['origin']:<10} | {item['status']}")
```

#### Expected Program Output:
```text
=== RAW DATABASE INGESTION ===
Initial raw records received: 7
After deduplication: 6 records remaining.
Calculated replacement median weight: 340.5 g

=== FINAL CLEANED & NORMALIZED DATASET ===
ID       | WEIGHT (g)   | ORIGIN     | DATA STATUS
-------------------------------------------------
ART-01   | 340.5        | ROMAN      | ORIGINAL
ART-02   | 340.5        | ROMAN      | IMPUTED
ART-03   | 340.5        | GREEK      | IMPUTED
ART-04   | 380.0        | ROMAN      | ORIGINAL
ART-05   | 340.5        | GREEK      | IMPUTED
ART-06   | 310.2        | GREEK      | ORIGINAL
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Data Types & Ingestion)
Which of the following datasets is classified as **Unstructured Data**?
- **A)** A relational SQL database containing employee salaries and hire dates.
- **B)** A collection of 10,000 raw audio recordings of ocean whale vocalizations saved as WAV files.
- **C)** A comma-separated values (CSV) spreadsheet of bank customer account balances.
- **D)** A table of student examination marks arranged in 5 columns.
- **Correct Answer:** **B**
- **Explanation:** **Unstructured Data** lacks a predefined tabular data model or schema. Raw multimedia files such as audio streams, photographs, and unformatted PDF books cannot be stored directly in traditional relational table columns without extensive computational feature extraction.

#### Question 2 (Machine Learning Paradigms)
A video game development team trains an AI non-player character (NPC) to navigate an obstacle course. The NPC is not shown any recorded gameplay; instead, it receives +10 points for jumping over a pit and -50 points for colliding with a wall. Over 50,000 attempts, the NPC learns to run through the course flawlessly. Which machine learning paradigm does this represent?
- **A)** Supervised Learning
- **B)** Reinforcement Learning
- **C)** Unsupervised Clustering
- **D)** Deterministic Hardcoding
- **Correct Answer:** **B**
- **Explanation:** **Reinforcement Learning (RL)** is governed by an **Agent-Environment loop** where learning occurs through trial-and-error driven by scalar **Rewards and Penalties**. The agent seeks to discover an optimal policy that maximizes cumulative long-term reward.

#### Question 3 (Data Hygiene & Preprocessing)
In a dataset designed to predict housing market prices, one entry lists a house with `Number_of_Bedrooms = -4` and `Square_Footage = 99999999`. What are these entries called, and how must a data scientist treat them?
- **A)** Ground Truth Labels; they should be duplicated 10 times.
- **B)** Measurement Outliers / Corrupted Artifacts; they must be identified and removed or corrected before training because they distort statistical distribution models.
- **C)** Hyperparameters; they accelerate model training.
- **D)** Loss Functions; they increase computer memory bandwidth.
- **Correct Answer:** **B**
- **Explanation:** Negative bedrooms and impossible square footages are **extreme measurement outliers / invalid data entries**. Feeding impossible physical quantities into statistical machine learning algorithms skews gradient descent optimization and corrupts the learned weight parameters.

#### Question 4 (Higher-Order Scenario: Imputation vs Deletion)
A clinical research dataset tracking a rare medical condition contains only 45 patient records in total worldwide. One patient record is missing the blood pressure measurement, but contains all other 30 vital parameters. Should the data scientist delete the entire row, or impute the missing value?
- **A)** Delete the entire row, because medical algorithms can never use estimated numbers.
- **B)** Impute the missing blood pressure value using the cohort median or a regression estimate, because the dataset is extremely small (45 rows) and discarding an entire record causes an unacceptable loss of precious clinical information.
- **C)** Discard the entire computer.
- **D)** Invent 1,000 fake patients to replace it.
- **Correct Answer:** **B**
- **Explanation:** When working with **data-scarce regimes** (such as rare diseases), every individual sample represents immense clinical value. Dropping a row removes all 30 other verified features. Imputation (using the median, mean, or nearest-neighbor interpolation) preserves the remaining signal while minimizing statistical distortion.

#### Question 5 (Feature vs Label Distinctions)
In a bank's automated loan approval dataset, what role does the applicant's `Annual_Income` play, and what role does `Loan_Approved (Yes/No)` play?
- **A)** `Annual_Income` is the Label; `Loan_Approved` is the Feature.
- **B)** `Annual_Income` is an Input Feature; `Loan_Approved` is the Target Label.
- **C)** Both are Labels.
- **D)** Both are Loss Functions.
- **Correct Answer:** **B**
- **Explanation:** In supervised learning, the observable characteristics, predictors, and independent variables ($X$) describing the subject are called **Features** (e.g., Annual Income, Credit Score, Debt). The final dependent outcome or decision ($y$) the model is trained to predict is the **Target Label**.

---

### 9. Responsible AI & Ethical Reflection

#### Historical Bias Encoded in Datasets
Data is a mirror reflecting human society's past:
- **The Past is Not Always Just:** If an AI model is trained on historical corporate hiring records from the 1970s when women were rarely hired as airline pilots or company executives, the AI will learn that "being male is a key feature for leadership".
- **Active De-biasing:** Data scientists have an active moral duty to identify historical biases in training datasets and rebalance them before algorithms automate and perpetuate past injustices into the future.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Data Architecture** | Differentiates Structured, Unstructured, and Semi-structured data with examples. | 100 XP | Data Theorist |
| **Pillar 2: Dataset Heist Game** | Successfully sanitizes the 20-record antiquities dataset with $>95\%$ hygiene. | 100 XP | Forensic Cleaner |
| **Pillar 3: Python Coding** | Runs the automated imputation and label normalization script. | 100 XP | Pipeline Coder |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad data engineering questions. | 100 XP | Olympiad Scholar |
| **Bonus: Cafeteria Audit** | Submits a completed 8-row nutrition table with an outlier resolution protocol. | 50 XP | Chief Data Detective |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
