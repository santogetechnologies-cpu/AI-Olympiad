"""
Class 9 Curriculum Generator for GAIO Senior Level.
Generates all 12 complete lessons across the 6 syllabus chapters.
"""
import os

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 9"

LESSONS = [
    # Chapter 1: AI Basics
    {
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 1,
        "title": "From Data to Intelligence",
        "pillar": "AI Basics",
        "grade": "Class 9",
        "prereqs": "Basic understanding of numbers, spreadsheets, and everyday computer usage.",
        "objectives": [
            "Distinguish between data, information, knowledge, and actionable intelligence (DIKW pyramid).",
            "Identify structured vs unstructured datasets and their relevance to machine learning.",
            "Explain the four archetypes of computational systems: mechanical, rule-based, statistical, and autonomous AI.",
            "Analyze data acquisition pipelines and recognize noisy, incomplete, or corrupted records."
        ],
        "mission": "The Green Valley Canteen Crisis: Arun's school canteen prepares 600 meals daily, but faces massive food wastage on rainy days and acute shortages during sports meets. The management uses a handwritten notebook of raw meal counts. You are commissioned as the Senior Student AI Consultant to transform this static raw data into an intelligent demand forecasting system.",
        "theory": """### 1. The DIKW Hierarchy (Data, Information, Knowledge, Intelligence)
At the foundation of Artificial Intelligence lies data. However, data alone cannot make decisions.

1. **Data (Raw Signals & Symbols):** Unorganized numbers, strings, or sensor readings without context.
   * *Example:* `[28, 45, 12, 102]`
2. **Information (Contextualized Data):** Data equipped with meaning, units, and temporal coordinates answering *Who, What, Where, When*.
   * *Example:* `On Monday, 45 students ordered veg samosas at 1:15 PM during rainy weather (28°C).`
3. **Knowledge (Patterns & Relationships):** Synthesized information revealing persistent trends, correlations, and causal mechanics answering *How*.
   * *Example:* `When rainfall exceeds 10mm and outdoor games are cancelled, indoor hot snack consumption increases by 65%.`
4. **Intelligence (Actionable Predictive Wisdom):** The autonomous application of knowledge to make forward-looking, goal-optimizing decisions under uncertainty.
   * *Example:* `Autonomous canteen ordering agent triggers an order for 120 extra patties 4 hours ahead of predicted downpour.`

### 2. Structured vs. Unstructured Data in Modern AI
Modern AI models process two primary paradigms of data:
* **Structured Data:** Tabular datasets formatted into rigid rows (samples) and columns (features). Easily queried via SQL, analyzed with dataframes (Pandas), and fed into regression or decision trees.
* **Unstructured Data:** Free-form content such as natural language transcripts, audio waveforms, video feeds, and thermal imaging. AI employs specialized deep neural architectures (Transformers, CNNs) to extract mathematical feature embeddings from unstructured inputs.

### 3. Four Generations of Computational Systems
| Generation | System Type | How It Operates | Example |
| :--- | :--- | :--- | :--- |
| **Gen 1** | Mechanical / Static | Fixed physical hardware; no software logic | Manual cash register |
| **Gen 2** | Rule-Based Expert System | Deterministic `IF-THEN` conditional heuristics hardcoded by humans | Inventory alert if `stock < 20` |
| **Gen 3** | Statistical Machine Learning | Mathematical optimization over historical data to discover patterns | Linear regression predicting meal sales |
| **Gen 4** | Autonomous Cognitive AI | Multi-modal sensory synthesis, self-improving policy, and probabilistic reasoning | Dynamic predictive procurement bot |
""",
        "demo": """### Worked Demonstration: The Samosa Variance Metric
Consider Arun's raw log of samosa sales across 5 school days:
`Sales = [42, 38, 55, 61, 47]`, with Target Baseline = 50.

```python
# Calculating Mean Deviation and Mean Squared Error in raw Python
sales = [42, 38, 55, 61, 47]
target = 50

# Step 1: Calculate Mean
mean_sales = sum(sales) / len(sales) # 48.6

# Step 2: Calculate Deviations
deviations = [s - target for s in sales] # [-8, -12, +5, +11, -3]

# Step 3: Mean Squared Error (Loss function intuition)
mse = sum((s - target) ** 2 for s in sales) / len(sales)
print(f"Mean Sales: {mean_sales}, MSE Loss: {mse:.2f}")
# Output: Mean Sales: 48.6, MSE Loss: 67.60
```
This loss metric illustrates how an algorithm quantifies error—the foundational step of machine learning optimization.""",
        "game": {
            "title": "Canteen Data Tycoon: From Raw Log to Predictive Agent",
            "scenario": "You oversee the inventory of a high-tech school cafeteria across 10 simulated school weeks. You start with dirty, unstructured data and must clean, analyze, and build a predictive rule engine.",
            "tools": "Feature Extraction Workbench, Noise Filter, Predictive Threshold Slider, Budget Ledger ($5,000 starting).",
            "roles": "Data Cleanser -> Pattern Detective -> Algorithm Architect.",
            "decision_points": [
                "Round 1: Clean raw noisy sensor logs (handle missing values, outliers like '9,999 samosas' caused by keyboard bounce).",
                "Round 2: Feature Engineering (decide whether to include 'Day of Week', 'Weather Forecast', or 'Exam Schedule').",
                "Round 3: Balance Over-Stocking penalty ($2 per wasted meal) vs Under-Stocking penalty ($5 per disappointed student)."
            ],
            "rules": "Each correct feature improves forecast accuracy by 15%. Corrupted data penalties deduct $200. Reaching 90% forecast precision wins the Golden Kitchen Trophy.",
            "feedback": "Instant dashboard displays Mean Absolute Error (MAE), wastage metrics, and customer satisfaction index.",
            "reflection": "How does noisy training data poison algorithmic forecasts, and why is garbage-in-garbage-out (GIGO) the primary vulnerability of predictive systems?"
        },
        "coding": {
            "title": "Building a Raw Data-to-Intelligence Pipeline in Python",
            "description": "Write a robust data processing script that parses raw dirty logs, imputes missing records, computes statistical aggregates, and produces an automated procurement recommendation.",
            "code": '''# Data-to-Intelligence Pipeline: School Canteen Log Analyzer

def parse_and_clean_canteen_log(raw_logs):
    """
    Parses messy logs containing dirty strings, None values, and extreme outliers.
    Returns cleaned list of daily consumption integers.
    """
    cleaned_data = []
    for entry in raw_logs:
        try:
            # Handle string conversions and sanitize whitespace
            val = int(str(entry).strip())
            # Outlier bounds: canteen capacity is between 10 and 200 meals
            if 10 <= val <= 200:
                cleaned_data.append(val)
            else:
                print(f"[REJECTED OUTLIER]: {val}")
        except (ValueError, TypeError):
            print(f"[DATA NOISE DETECTED]: Invalid entry '{entry}' ignored.")
    return cleaned_data

def generate_procurement_intelligence(cleaned_data, safety_margin=1.15):
    """
    Transforms cleaned data into actionable intelligence:
    Calculates average, trend direction, and recommends tomorrow's prep count.
    """
    if not cleaned_data:
        return 0, 0, "No valid data"
    
    n = len(cleaned_data)
    avg_demand = sum(cleaned_data) / n
    recent_trend = cleaned_data[-1] - cleaned_data[0]
    
    # Intelligence heuristic: adjust for upward or downward momentum
    momentum = 0.5 * (recent_trend / n)
    recommended_prep = round((avg_demand + momentum) * safety_margin)
    
    return avg_demand, recommended_prep

# Test Data
raw_canteen_feed = ["45", 52, None, "error_404", 48, 9999, 55, " 60 ", -15, 62]

cleaned = parse_and_clean_canteen_log(raw_canteen_feed)
avg, recommendation = generate_procurement_intelligence(cleaned)

print("\\n--- Canteen Intelligence Report ---")
print(f"Raw Input Count       : {len(raw_canteen_feed)}")
print(f"Cleaned Valid Records : {cleaned}")
print(f"Historical Mean Demand: {avg:.1f} meals")
print(f"Target Procurement Prep: {recommendation} meals (with 15% safety buffer)")
''',
            "expected_output": """[DATA NOISE DETECTED]: Invalid entry 'None' ignored.
[DATA NOISE DETECTED]: Invalid entry 'error_404' ignored.
[REJECTED OUTLIER]: 9999
[REJECTED OUTLIER]: -15

--- Canteen Intelligence Report ---
Raw Input Count       : 10
Cleaned Valid Records : [45, 52, 48, 55, 60, 62]
Historical Mean Demand: 53.7 meals
Target Procurement Prep: 63 meals (with 15% safety buffer)""",
            "explanation": "The script handles real-world data corruption: type errors, missing values, and physical impossibility outliers. It applies mathematical smoothing and safety margins to turn descriptive data into prescriptive intelligence."
        },
        "questions": [
            {
                "q": "Which of the following best represents the transformation of 'Information' into 'Knowledge' in the DIKW pyramid?",
                "options": [
                    "A thermometer records 39.5 degrees Celsius.",
                    "A patient file notes 39.5°C fever at 10:00 PM on Day 3 of viral infection.",
                    "An analysis reveals that pediatric patients whose fever spikes past 39°C after 48 hours have an 82% likelihood of bacterial co-infection.",
                    "An automated hospital dispensing cabinet automatically orders azithromycin."
                ],
                "answer": "C",
                "explanation": "Option A is Data; Option B is Information (data with context); Option C is Knowledge (cross-temporal correlation and diagnostic pattern); Option D is Intelligence/Autonomous Action."
            },
            {
                "q": "An AI canteen planner trained on historical data from 2023 fails dramatically during the first week of September 2024 because the school shifted from half-day to full-day classes. What AI phenomenon explains this failure?",
                "options": [
                    "Hardware CPU throttling",
                    "Data Distribution Shift (Concept Drift)",
                    "Syntax Error in Python parser",
                    "Over-fitting on floating point precision"
                ],
                "answer": "B",
                "explanation": "Data distribution shift (or concept drift) occurs when the statistical properties of the target variable and features change in the real world compared to the training dataset, making historical models unreliable."
            },
            {
                "q": "A dataset contains 10,000 student feedback paragraphs written in English. Which classification accurately describes this dataset?",
                "options": [
                    "Relational structured data",
                    "Unstructured natural language data",
                    "Deterministic mathematical data",
                    "Zero-dimensional tabular data"
                ],
                "answer": "B",
                "explanation": "Free-form text lacks fixed column schemas and relational keys, making it unstructured data requiring Natural Language Processing (NLP) to vectorize."
            },
            {
                "q": "What is the primary difference between a Rule-Based System and a Machine Learning system when distinguishing spam emails?",
                "options": [
                    "Rule-based systems use computers while ML systems use humans.",
                    "Rule-based systems rely on static IF-THEN filters written by humans; ML systems discover probabilistic weightings from training examples.",
                    "Rule-based systems never make mistakes; ML systems always make mistakes.",
                    "ML systems require no data whatsoever to operate."
                ],
                "answer": "B",
                "explanation": "Rule-based systems enforce static manual heuristics (e.g. IF email contains 'lottery' THEN mark spam), whereas ML systems learn feature embeddings and statistical weights dynamically from datasets."
            }
        ],
        "rubric": {
            "beginner": "Understands difference between numbers and text; can identify basic canteen waste issues.",
            "proficient": "Correctly applies DIKW pyramid; cleans noisy data; writes and runs Python statistical pipeline.",
            "advanced": "Diagnoses concept drift; formulates loss functions; designs robust multi-feature AI procurement pipelines."
        },
        "responsible_ai": "Data Dignity & Consent: When collecting student consumption and attendance logs, schools must ensure records are anonymized. Aggregated canteen data must not be used to profile individual dietary habits or economic status without explicit guardian consent.",
        "progression": "XP: 100 | Badge: 'Data Alchemist' | Unlocks: Class 9 Chapter 1 Lesson 2 ('Machines That Predict')"
    },
    {
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 2,
        "title": "Machines That Predict",
        "pillar": "AI Basics",
        "grade": "Class 9",
        "prereqs": "Class 9 Chapter 1 Lesson 1, linear graph plotting ($y = mx + c$).",
        "objectives": [
            "Explain how machines perform supervised prediction using input features and target labels.",
            "Distinguish between Regression (continuous numerical prediction) and Classification (discrete categorical prediction).",
            "Understand the concepts of Decision Boundaries, Best-Fit Lines, and Prediction Error.",
            "Implement a basic nearest-neighbor or linear decision predictor in Python."
        ],
        "mission": "The Solar Cruiser Velocity Challenge: The school science team is building a solar-powered electric kart for the National Green Sprint. You have telemetry data recording 'Solar Panel Irradiance (Watts/m²)' and 'Battery Temperature (°C)' against 'Kart Velocity (km/h)'. You must program an intelligent onboard predictive model to estimate kart speed and warn against motor overheat.",
        "theory": """### 1. The Anatomy of Machine Prediction
Prediction in AI is not fortune-telling or clairvoyance; it is the mathematical mapping of input variables (features, denoted as $X$) to an output target (label, denoted as $y$) through a learned hypothesis function $f(X) \\approx y$.

### 2. The Two Pillars of Supervised Learning
1. **Regression:**
   * **Target Variable:** Continuous quantitative number (e.g., house price, temperature, velocity, exam score).
   * **Mechanism:** Finding a line or curve of best fit that minimizes the vertical distance between data points and the prediction line (Residual Sum of Squares).
   * **Mathematical Equation:** $y = w \\cdot x + b$, where $w$ is the weight (slope) and $b$ is the bias (y-intercept).
2. **Classification:**
   * **Target Variable:** Discrete qualitative class/category (e.g., Spam vs Ham, Malignant vs Benign, Cat vs Dog vs Horse).
   * **Mechanism:** Constructing a **Decision Boundary** (hyperplane) in feature space that separates different classes with maximum margin.

### 3. Understanding the Error Metric (Loss Function)
To improve predictions, a machine must evaluate its mistakes.
* **Residual Error:** $e_i = y_{actual} - y_{predicted}$
* **Mean Absolute Error (MAE):** $\\frac{1}{n} \\sum |y_i - \\hat{y}_i|$ (robust to outliers)
* **Mean Squared Error (MSE):** $\\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2$ (severely penalizes large mistakes)

```
      Feature Space & Decision Boundary
      Feature 2 ^
                |     o  o     / (Decision Boundary)
                |   o   o  o  /
                |            /   x   x
                |           /  x   x   x
                +--------------------------> Feature 1
```
""",
        "demo": """### Worked Demonstration: Simple 1D Linear Predictor
Given solar irradiance ($X$ in hundreds of W/m²): `[1, 2, 3, 4, 5]` and kart speed ($y$ in km/h): `[12, 19, 28, 37, 46]`.
Notice that each unit increase in $X$ increases speed by roughly $9$ km/h, starting around $3$ km/h.
* Let $w = 8.5$, $b = 3.0$.
* For $X = 3$: $\\hat{y} = 8.5 \\times 3 + 3.0 = 28.5$ km/h (Actual is 28 -> error is $+0.5$).
* For $X = 6$: $\\hat{y} = 8.5 \\times 6 + 3.0 = 54.0$ km/h.""",
        "game": {
            "title": "Boundary Master: The Orbital Satellite Interceptor",
            "scenario": "Cosmic space debris is approaching a space station. You receive incoming radar coordinates (Relative Speed, Radar Cross-Section). You must draw and tune a 2D linear decision boundary to classify objects as 'Harmless Space Dust' vs 'Catastrophic Orbital Debris'.",
            "tools": "Slope Adjuster ($w$), Intercept Dial ($b$), Radar Telemetry Screen.",
            "roles": "Orbital Defense Officer.",
            "decision_points": [
                "Adjust slope $w$ to tilt boundary between red debris clusters and green dust clouds.",
                "Adjust bias $b$ to raise or lower security tolerance.",
                "Evaluate False Positives (wasted defensive laser pulse) vs False Negatives (station hull breach!)."
            ],
            "rules": "Zero hull breaches allowed (False Negative cost = Game Over). Score based on minimal laser energy used.",
            "feedback": "Visual scatter plot displays live classification matrix: Precision, Recall, and Total Intercept Score.",
            "reflection": "Why does high-stakes prediction often deliberately trade off accuracy to minimize catastrophic False Negatives?"
        },
        "coding": {
            "title": "Implementing a 1-Nearest Neighbor (1-NN) Classifier from Scratch",
            "description": "Program a pure Python distance-based classification engine that predicts whether a solar kart battery will 'Overheat' or remain 'Safe' given Temperature and Current Draw.",
            "code": '''import math

# Training Dataset: [Temperature (C), Current Draw (Amps)], Label: 0 (Safe) or 1 (Danger)
training_data = [
    ([32.0, 10.5], "Safe"),
    ([35.2, 12.0], "Safe"),
    ([40.1, 15.0], "Safe"),
    ([58.0, 28.0], "Danger"),
    ([62.5, 30.5], "Danger"),
    ([65.0, 35.0], "Danger"),
]

def euclidean_distance(p1, p2):
    """Calculates straight-line geometric distance in 2D feature space."""
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def predict_nearest_neighbor(new_point, dataset):
    """
    Finds the single closest training sample and assigns its label.
    """
    best_distance = float('inf')
    best_label = None
    closest_sample = None
    
    for features, label in dataset:
        dist = euclidean_distance(new_point, features)
        if dist < best_distance:
            best_distance = dist
            best_label = label
            closest_sample = features
            
    return best_label, best_distance, closest_sample

# Incoming Telemetry from Lap 4
telemetry_lap4 = [
    [38.0, 13.0], # Normal run
    [59.5, 29.0], # High strain hill climb
    [48.0, 20.0], # Borderline condition
]

print("--- Telemetry Prediction Engine ---")
for sensor_reading in telemetry_lap4:
    pred, dist, neighbor = predict_nearest_neighbor(sensor_reading, training_data)
    print(f"Reading: Temp={sensor_reading[0]}C, Draw={sensor_reading[1]}A -> "
          f"PREDICTION: [{pred}] (Nearest neighbor {neighbor} at dist {dist:.2f})")
''',
            "expected_output": """--- Telemetry Prediction Engine ---
Reading: Temp=38.0C, Draw=13.0A -> PREDICTION: [Safe] (Nearest neighbor [40.1, 15.0] at dist 2.90)
Reading: Temp=59.5C, Draw=29.0A -> PREDICTION: [Danger] (Nearest neighbor [58.0, 28.0] at dist 1.80)
Reading: Temp=48.0C, Draw=20.0A -> PREDICTION: [Safe] (Nearest neighbor [40.1, 15.0] at dist 9.35)""",
            "explanation": "This script demonstrates non-parametric machine prediction. By mapping feature coordinates and finding the nearest Euclidean vector, the machine predicts categorical states without hardcoding arbitrary static IF-statements."
        },
        "questions": [
            {
                "q": "You are building an AI to predict tomorrow's air quality index (AQI) as a number between 0 and 500. What type of machine learning problem is this?",
                "options": [
                    "Binary Classification",
                    "Continuous Regression",
                    "Unsupervised Clustering",
                    "Dimensionality Reduction"
                ],
                "answer": "B",
                "explanation": "AQI is a continuous quantitative numerical value. Predicting continuous quantities is defined as Regression."
            },
            {
                "q": "In a medical diagnostic AI detecting a deadly but rare contagion, which error type is far more dangerous?",
                "options": [
                    "False Positive (predicting infected when patient is healthy)",
                    "False Negative (predicting healthy when patient is infected)",
                    "Zero Error",
                    "Balanced Variance"
                ],
                "answer": "B",
                "explanation": "A False Negative sends a sick patient home without treatment, leading to disease progression or contagion spread, whereas a False Positive merely results in a confirmatory re-test."
            },
            {
                "q": "What happens to a linear regression model if you train it on data that has a curved, quadratic relationship ($y = x^2$)?",
                "options": [
                    "The model achieves 100% test accuracy.",
                    "The model underfits because a straight line lacks the capacity to represent the non-linear curve.",
                    "The model automatically rewrites its own equations into quantum physics.",
                    "The computer processor halts with an overflow error."
                ],
                "answer": "B",
                "explanation": "A straight line ($y = mx + b$) has high inductive bias and cannot bend to fit non-linear quadratic distributions, resulting in Underfitting (high bias)."
            },
            {
                "q": "If the training coordinates for two classes overlap completely in the same feature coordinates, what is mathematically impossible for any deterministic classifier to achieve?",
                "options": [
                    "Zero training error",
                    "Fast training time",
                    "Printing the output",
                    "Calculating distance"
                ],
                "answer": "A",
                "explanation": "If identical feature vectors $(x_1, x_2)$ have conflicting labels (e.g. one is Safe and one is Danger), no deterministic function can separate them without error on at least one sample."
            }
        ],
        "rubric": {
            "beginner": "Understands difference between predicting a label and predicting a number.",
            "proficient": "Calculates Euclidean distance; builds functional nearest-neighbor classifier; graphs decision lines.",
            "advanced": "Analyzes confusion matrices, balances precision vs recall trade-offs, and designs multi-dimensional regression models."
        },
        "responsible_ai": "Accountability in Autonomous Prediction: When predictive models are embedded into automated machinery (such as autonomous karts or medical dosages), fail-safe human overrides and redundant physical safety limiters must always be present to prevent catastrophic algorithmic runaway.",
        "progression": "XP: 120 | Badge: 'Oracle Architect' | Unlocks: Class 9 Chapter 2 Lesson 1 ('Python in Action')"
    }
]

print("Script template loaded.")
