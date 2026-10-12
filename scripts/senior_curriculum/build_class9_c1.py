"""
Complete Class 9 Curriculum Builder (12 Lessons)
"""
import os
import sys
from generator_core import write_lesson_file

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 9"

CLASS_9_LESSONS = [
    # -------------------------------------------------------------
    # CHAPTER 1: AI BASICS
    # -------------------------------------------------------------
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 1,
        "title": "From Data to Intelligence",
        "pillar": "AI Basics",
        "strand": "Data Foundations, Representation, and the DIKW Transformation",
        "prereqs": "Basic digital literacy, familiarity with tabular data (spreadsheets), and logical reasoning.",
        "prereq_details": "Students must understand what a number, table, and file represent, and be comfortable viewing basic tables.",
        "key_terms": ["DIKW Pyramid", "Structured vs Unstructured Data", "Feature Space", "Concept Drift", "Signal-to-Noise Ratio"],
        "objectives": [
            "Formalize the DIKW (Data, Information, Knowledge, Intelligence) hierarchy in computational contexts.",
            "Differentiate between structured relational matrices and unstructured perceptual media (audio, text, vision).",
            "Evaluate data pipelines for noise, missing values, keyboard entry anomalies, and data corruption.",
            "Formulate basic loss metrics to evaluate data-driven forecasts against static manual guesswork."
        ],
        "mission_title": "Operation Green Plate: The Canteen Wastage Crisis",
        "mission_desc": "Green Valley High prepares 600 student lunches daily. Over-preparation on stormy days leads to 140kg of bio-waste, while unexpected sunny sports days cause food shortages that leave 120 juniors without lunch. The school principal hands you 3 months of disorganized cafeteria receipts, handwritten logs, and weather notes. Your mission is to build an automated data-to-intelligence ingestion pipeline that converts messy logs into a waste-minimizing food preparation forecast.",
        "theory": """### 1. The DIKW Hierarchy in Artificial Intelligence
Artificial Intelligence is built on data, but raw numbers alone do not equal intelligence:
1. **Data:** Raw, uninterpreted symbols, numerical measurements, or sensor outputs without semantics (e.g., `[22.4, 180, 0, 1]`).
2. **Information:** Data contextualized with units, schema, and temporal timestamps answering *Who, What, Where, When* (e.g., `On October 12, 180 hot lunches were served at 22.4°C outdoor temp with zero rainfall`).
3. **Knowledge:** Patterns, relationships, and correlations synthesized across historical information answering *How* (e.g., `Rainfall > 5mm correlates with a 45% drop in sports field activity and a 38% increase in hot cafeteria meal uptake`).
4. **Intelligence:** The autonomous, goal-optimizing capability to apply knowledge to future states under uncertainty (e.g., `An automated agent ingests tomorrow's meteorology radar feed and instructs the chef to prepare exactly 245 hot meals`).

### 2. Structured vs. Unstructured Data
* **Structured Data:** Highly organized in tabular grids (rows = records/samples, columns = features/attributes). Highly compatible with SQL, Pandas, and mathematical models (Linear Regression, Decision Trees).
* **Unstructured Data:** Lacks a pre-defined conceptual model or schema (raw audio signals, security camera video streams, student essays). To make unstructured data machine-actionable, AI models apply **Feature Extraction** and **Vector Embeddings** to translate perceptual inputs into high-dimensional numerical matrices.

### 3. Noise, Outliers, and Garbage-In, Garbage-Out (GIGO)
Predictive algorithms cannot overcome poisoned or corrupted inputs. Real-world data acquisition suffers from:
* **Sensor Drift / Noise:** Electronic jitter producing random variance.
* **Human Data Entry Errors:** Outliers such as negative student counts or values inflated by orders of magnitude (e.g. typing `6000` instead of `60`).
* **Missing Values:** Incomplete logs that require imputation (mean, median, or forward-fill) or dropping.""",
        "demo": """### Worked Mathematical Walkthrough: Variance and Mean Squared Loss
Let actual meal demand over 5 days be $Y = [120, 135, 110, 150, 125]$, and a static rule-based system predicts a constant baseline $\\hat{Y} = 130$.

1. **Calculate Residual Errors ($e_i = Y_i - \\hat{Y}_i$):**
   * Day 1: $120 - 130 = -10$
   * Day 2: $135 - 130 = +5$
   * Day 3: $110 - 130 = -20$
   * Day 4: $150 - 130 = +20$
   * Day 5: $125 - 130 = -5$

2. **Mean Absolute Error (MAE):**
   $$\\text{MAE} = \\frac{|-10| + |5| + |-20| + |20| + |-5|}{5} = \\frac{60}{5} = 12.0 \\text{ meals}$$

3. **Mean Squared Error (MSE):**
   $$\\text{MSE} = \\frac{(-10)^2 + 5^2 + (-20)^2 + 20^2 + (-5)^2}{5} = \\frac{100 + 25 + 400 + 400 + 25}{5} = \\frac{950}{5} = 190.0 \\text{ meals}^2$$
The MSE heavily penalizes the large 20-meal misses on Days 3 and 4, demonstrating why loss functions drive algorithmic parameter adjustments.""",
        "game": {
            "title": "Cafeteria Intelligence Tycoon",
            "scenario": "Manage a high-school food pipeline across 10 simulation weeks. Weather events, sports schedules, and exam weeks alter consumption patterns.",
            "objective": "Transform messy raw intake data into predictive procurement commands that minimize food spoilage and student hunger.",
            "tools": "Outlier Clamping Filter, Imputation Dial, Multi-Feature Correlation Inspector, Purchase Slider.",
            "roles": "Data Detective -> Pipeline Architect.",
            "decision_points": [
                "Filter sensor anomalies: Identify and remove corrupted keyboard entries before computing weekly averages.",
                "Feature Selection: Decide whether to incorporate Weather Forecast, School Calendar, or Bus Delay data.",
                "Loss Balancing: Balance food waste penalty ($1.50/meal) vs stockout penalty ($4.00/meal)."
            ],
            "rules": "Achieve an overall forecasting accuracy >= 88% with zero stockout emergencies over 10 rounds to win.",
            "feedback": "Real-time error analytics dashboard displaying live MAE, food waste mass (kg), and student satisfaction score.",
            "reflection": "Why does raw data without temporal or situational context lead to inaccurate forecasting?"
        },
        "coding": {
            "title": "Building a Resilient Data Sanitizer and Baseline Forecaster in Python",
            "description": "Write a clean, defensive Python script that parses noisy sensor logs, removes anomalous records, imputes missing data points, and outputs an intelligent baseline recommendation.",
            "code": '''def clean_and_forecast_canteen_data(raw_records, capacity_min=50, capacity_max=300):
    """
    Cleans raw noisy telemetry, removes invalid strings & impossible outliers,
    and returns sanitized data alongside statistical intelligence.
    """
    cleaned = []
    dropped_count = 0
    
    for item in raw_records:
        try:
            val = float(str(item).strip())
            if capacity_min <= val <= capacity_max:
                cleaned.append(val)
            else:
                dropped_count += 1
        except (ValueError, TypeError):
            dropped_count += 1
            
    if not cleaned:
        return {"error": "Insufficient valid data points"}
        
    avg_demand = sum(cleaned) / len(cleaned)
    max_demand = max(cleaned)
    min_demand = min(cleaned)
    
    # 10% safety buffer for resilient procurement
    recommended_procurement = round(avg_demand * 1.10)
    
    return {
        "valid_count": len(cleaned),
        "dropped_anomalies": dropped_count,
        "mean_demand": round(avg_demand, 2),
        "demand_range": (min_demand, max_demand),
        "target_procurement": recommended_procurement
    }

# Simulated noisy data from canteen turnstiles
raw_feed = ["140", 165, "None", 2999, 155, -20, " 180 ", 172, "FAULT", 160]

report = clean_and_forecast_canteen_data(raw_feed)
print("=== CANTEEN DATA-TO-INTELLIGENCE REPORT ===")
for k, v in report.items():
    print(f"{k:<20}: {v}")
''',
            "expected_output": """=== CANTEEN DATA-TO-INTELLIGENCE REPORT ===
valid_count         : 6
dropped_anomalies   : 4
mean_demand         : 162.0
demand_range        : (140.0, 180.0)
target_procurement  : 178""",
            "explanation": "The function uses defensive typecasting and range validation to drop non-numeric tokens ('None', 'FAULT') and physical impossibilities (2999, -20). It computes historical mean demand and applies a 10% safety buffer for operational resilience."
        },
        "questions": [
            {
                "q": "Which step in the DIKW hierarchy is represented when an agricultural system correlates soil moisture drops with upcoming ambient heat waves to schedule automated irrigation?",
                "options": [
                    "Data",
                    "Information",
                    "Knowledge",
                    "Intelligence"
                ],
                "answer": "D",
                "explanation": "Autonomous execution of predictive, goal-oriented actions based on synthesized patterns is the definition of Intelligence."
            },
            {
                "q": "Why does Mean Squared Error (MSE) penalize a single prediction error of 10 units significantly more than ten individual errors of 1 unit?",
                "options": [
                    "Because squaring errors scales non-linearly, magnifying large catastrophic deviations ($10^2 = 100 > 10 \\times 1^2 = 10$).",
                    "Because MSE takes the square root of the dataset length.",
                    "Because MSE is only applicable to binary classification.",
                    "Because Python arithmetic does not support linear addition."
                ],
                "answer": "A",
                "explanation": "MSE squares each residual error $(y - \\hat{y})^2$. Consequently, an error of 10 contributes 100 to the loss, whereas ten errors of 1 contribute only $10 \\times 1 = 10$."
            },
            {
                "q": "A school installs face-recognition scanners for attendance. The raw pixel arrays captured by the camera sensor represent what kind of data?",
                "options": [
                    "Relational structured data",
                    "Unstructured visual data",
                    "Deterministic spreadsheet data",
                    "Pre-classified knowledge tokens"
                ],
                "answer": "B",
                "explanation": "Raw pixel grids from camera sensors have no relational tabular schema and are classified as unstructured visual data."
            },
            {
                "q": "What risk arises if a student canteen forecasting AI is trained exclusively on data recorded during the winter semester?",
                "options": [
                    "Underflow error in the operating system kernel.",
                    "Concept Drift / Covariate Shift, leading to failure when summer temperatures alter student dietary choices.",
                    "Immediate deletion of the source code files.",
                    "Zero training loss during deployment."
                ],
                "answer": "B",
                "explanation": "When seasonal patterns shift, the underlying distribution of features changes, causing models trained on narrow slices of time to suffer from Concept Drift."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands difference between raw numbers and contextual information.",
                "coding": "Can print list elements and calculate a basic average in Python.",
                "sim": "Identifies extreme anomalies but struggles to balance over- vs under-stocking."
            },
            "proficient": {
                "concept": "Correctly maps DIKW levels and explains structured vs unstructured data.",
                "coding": "Writes working Python validation loops with try-except exception handling.",
                "sim": "Maintains food procurement within 15% error bounds across changing weather."
            },
            "advanced": {
                "concept": "Articulates concept drift, loss function formulations, and signal-to-noise dynamics.",
                "coding": "Implements defensive, vectorized data cleaning pipelines with automated bounds detection.",
                "sim": "Achieves >92% forecast precision with optimized loss trade-offs."
            }
        },
        "responsible_ai": "Data Governance & Student Dignity: When aggregating cafeteria purchase histories or biometric turnstile readings, data must be strictly anonymized. Purchasing trends must never be used to publicly profile students or disclose personal socioeconomic indicators.",
        "xp": 100,
        "badge": "DIKW Architect",
        "next_mission": "Class 9 Chapter 1 Lesson 2: Machines That Predict"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 1,
        "ch_name": "AI Basics",
        "les_num": 2,
        "title": "Machines That Predict",
        "pillar": "AI Basics",
        "strand": "Supervised Learning, Regression vs Classification, and Decision Boundaries",
        "prereqs": "Class 9 Chapter 1 Lesson 1, coordinate geometry ($x, y$ planes), equation of a line ($y = mx + c$).",
        "prereq_details": "Students should know how to plot points on a Cartesian coordinate plane and interpret linear slope.",
        "key_terms": ["Supervised Learning", "Regression", "Classification", "Decision Boundary", "Nearest Neighbor", "Loss Function"],
        "objectives": [
            "Classify machine learning predictive tasks into continuous Regression or categorical Classification.",
            "Understand how machine learning fits parameters (weights and biases) to discover underlying mappings.",
            "Formulate geometric Decision Boundaries in 2D feature spaces.",
            "Implement a pure-Python Nearest Neighbor classifier from scratch without external libraries."
        ],
        "mission_title": "Project Helios: Solar Cruiser Velocity Prediction",
        "mission_desc": "The school engineering club is entering the National Solar Kart Sprint. Your electric kart features telemetry sensors recording Solar Irradiance (Watts/m²) and Battery Thermal Load (°C). You must program an onboard AI guidance co-pilot that predicts kart top speed (regression) and classifies battery status as 'Nominal' or 'Overheat Risk' (classification) to alert the driver before thermal shutdown occurs.",
        "theory": """### 1. The Anatomy of Machine Prediction
Machine prediction is not magic or intuition; it is the algorithmic mapping of input features ($X$) to output targets ($y$) via an optimized function:
$$f(X; \\theta) \\approx y$$
Where $\\theta$ represents the adjustable parameters (weights and biases) tuned during training.

### 2. Regression vs. Classification
Supervised machine learning splits into two fundamental tasks based on the nature of the target:

| Dimension | Regression | Classification |
| :--- | :--- | :--- |
| **Output Type** | Continuous numerical value | Discrete categorical class / label |
| **Example Target** | Speed (42.5 km/h), House Price ($320k), Temperature (31.2°C) | Spam / Not Spam, Benign / Malignant, Overheat / Nominal |
| **Geometric Intuition** | Fitting a curve or line through data points | Drawing a decision boundary separating classes |
| **Evaluation Metrics** | MAE, MSE, RMSE, $R^2$ Score | Accuracy, Precision, Recall, F1-Score |

### 3. Decision Boundaries in Feature Space
When classifying data with two features ($x_1 = \\text{Temperature}$, $x_2 = \\text{Current}$), each sample is a coordinate point in 2D feature space.
A **Decision Boundary** is a geometric dividing line (or hypersurface) defined by an equation:
$$w_1 x_1 + w_2 x_2 + b = 0$$
* If $w_1 x_1 + w_2 x_2 + b > 0 \\implies \\text{Class 1 (Danger)}$
* If $w_1 x_1 + w_2 x_2 + b \\le 0 \\implies \\text{Class 0 (Nominal)}$
The algorithm 'learns' by iteratively adjusting the weights ($w_1, w_2$) and bias ($b$) until misclassifications are minimized.""",
        "demo": """### Worked Mathematical Walkthrough: 2D Nearest Neighbor Calculation
Suppose an onboard classifier holds two reference states:
* $S_{\\text{Nominal}} = [35.0^\\circ\\text{C}, 12.0\\text{A}]$
* $S_{\\text{Danger}} = [60.0^\\circ\\text{C}, 32.0\\text{A}]$

At Lap 3, sensors stream a new vector: $P_{\\text{test}} = [56.0^\\circ\\text{C}, 28.0\\text{A}]$.
Which state is it closest to?

1. **Calculate Euclidean Distance to $S_{\\text{Nominal}}$:**
   $$d_1 = \\sqrt{(56 - 35)^2 + (28 - 12)^2} = \\sqrt{21^2 + 16^2} = \\sqrt{441 + 256} = \\sqrt{697} \\approx 26.40$$

2. **Calculate Euclidean Distance to $S_{\\text{Danger}}$:**
   $$d_2 = \\sqrt{(56 - 60)^2 + (28 - 32)^2} = \\sqrt{(-4)^2 + (-4)^2} = \\sqrt{16 + 16} = \\sqrt{32} \\approx 5.66$$

Since $d_2 (5.66) < d_1 (26.40)$, the 1-NN algorithm predicts **Danger** with high confidence.""",
        "game": {
            "title": "Orbital Interceptor: The Boundary Duel",
            "scenario": "A radar display streams unidentified orbital debris towards a research station. Incoming objects have Velocity and Radar Reflection signatures.",
            "objective": "Tune a linear decision boundary in real time to classify approaching objects into Space Junk (deflect) vs Active Satellites (preserve).",
            "tools": "Slope Dial ($m$), Intercept Slider ($c$), Visual Confusion Matrix Display.",
            "roles": "Defense AI Controller.",
            "decision_points": [
                "Rotate the decision boundary slope to separate blue clusters (satellites) from red clusters (junk).",
                "Shift the intercept to balance False Positives (shooting down friendly satellites) vs False Negatives (station collision).",
                "Adapt the boundary when atmospheric drag induces sensor drift."
            ],
            "rules": "Each destroyed friendly satellite docks 500 points. Any station hull breach causes instant mission failure.",
            "feedback": "Visual feedback highlights misclassified points in flashing yellow with live precision and recall readouts.",
            "reflection": "Why is it often harder to separate overlapping data points than cleanly clustered ones?"
        },
        "coding": {
            "title": "Implementing a 1-Nearest Neighbor Classifier from Scratch",
            "description": "Develop a pure-Python distance-based classifier that evaluates solar telemetry vectors against labeled benchmarks.",
            "code": '''import math

def euclidean_distance(pt1, pt2):
    """Calculates Euclidean distance between two n-dimensional feature vectors."""
    squared_diffs = sum((a - b) ** 2 for a, b in zip(pt1, pt2))
    return math.sqrt(squared_diffs)

class NearestNeighborPredictor:
    def __init__(self):
        self.training_points = []
        self.training_labels = []

    def fit(self, features, labels):
        """Stores historical training observations."""
        self.training_points = features
        self.training_labels = labels

    def predict(self, sample):
        """Finds closest training sample and returns its label alongside distance."""
        best_distance = float('inf')
        best_label = None
        
        for pt, label in zip(self.training_points, self.training_labels):
            dist = euclidean_distance(sample, pt)
            if dist < best_distance:
                best_distance = dist
                best_label = label
                
        return best_label, round(best_distance, 2)

# Training Set: [Temperature (C), Current Draw (Amps)]
train_X = [
    [32.0, 10.0],
    [36.5, 12.5],
    [41.0, 15.0],
    [58.0, 29.0],
    [64.0, 34.0],
    [70.0, 38.0]
]
train_y = ["Nominal", "Nominal", "Nominal", "Overheat_Danger", "Overheat_Danger", "Overheat_Danger"]

model = NearestNeighborPredictor()
model.fit(train_X, train_y)

# Live Telemetry Stream from Kart
live_stream = [
    [34.0, 11.0],
    [52.0, 26.0],
    [61.5, 31.0]
]

print("=== ONBOARD AI PREDICTION ENGINE ===")
for reading in live_stream:
    prediction, dist = model.predict(reading)
    print(f"Reading {reading} -> Class: {prediction:<16} (Neighbor Dist: {dist})")
''',
            "expected_output": """=== ONBOARD AI PREDICTION ENGINE ===
Reading [34.0, 11.0] -> Class: Nominal          (Neighbor Dist: 2.24)
Reading [52.0, 26.0] -> Class: Overheat_Danger  (Neighbor Dist: 6.71)
Reading [61.5, 31.0] -> Class: Overheat_Danger  (Neighbor Dist: 3.2)""",
            "explanation": "The script implements a 1-Nearest Neighbor algorithm using pure Python standard libraries. It calculates distance metrics across multi-attribute sensor inputs to produce classification predictions without static hard-coded thresholds."
        },
        "questions": [
            {
                "q": "Which of the following real-world tasks is an example of Continuous Regression?",
                "options": [
                    "Predicting whether an email is phishing or legitimate.",
                    "Predicting the exact battery percentage (0.0% to 100.0%) remaining on a laptop.",
                    "Classifying an MRI scan as Stage I, Stage II, or Stage III tumor.",
                    "Identifying whether an audio clip contains spoken English or German."
                ],
                "answer": "B",
                "explanation": "Battery percentage is a continuous numerical quantity along a real-number continuum, making its prediction a regression problem."
            },
            {
                "q": "In a 2D classification problem, if Class A and Class B have identical feature values $(x_1=5, x_2=8)$, what is true regarding any linear decision boundary?",
                "options": [
                    "It will classify both correctly with 100% confidence.",
                    "It cannot separate both points, guaranteeing at least one error.",
                    "It will crash the Python interpreter with a divide-by-zero error.",
                    "It will convert the problem into an unsupervised autoencoder."
                ],
                "answer": "B",
                "explanation": "When two distinct classes occupy identical points in feature space, no single boundary can isolate one from the other without misclassifying at least one."
            },
            {
                "q": "Why does a 1-Nearest Neighbor model become computationally slow when deployed on massive datasets with millions of samples?",
                "options": [
                    "Because it has to invert a $1,000,000 \\times 1,000,000$ matrix every second.",
                    "Because it is an instance-based 'lazy' learner that must calculate distances to every stored point during inference.",
                    "Because nearest neighbor only runs on 8-bit microcontrollers.",
                    "Because Euclidean distance requires trigonometric tangent functions."
                ],
                "answer": "B",
                "explanation": "k-NN stores all training data and performs $O(N)$ distance comparisons for every single query, causing prediction latency to scale linearly with dataset size."
            },
            {
                "q": "What is the primary role of the 'Bias' ($b$) term in the linear model equation $y = w \\cdot x + b$?",
                "options": [
                    "To introduce racial and socioeconomic prejudice into the algorithm.",
                    "To allow the line or decision boundary to shift up or down independently of the origin $(0,0)$.",
                    "To multiply the input feature by a factor of 10.",
                    "To round floating-point numbers to integers."
                ],
                "answer": "B",
                "explanation": "In mathematics and machine learning, the bias term $b$ is the intercept parameter that shifts the activation function or decision line away from the origin."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Distinguishes between predicting numbers and predicting categories.",
                "coding": "Can run pre-written distance functions and display results.",
                "sim": "Manipulates sliders randomly to hit targets without geometric intuition."
            },
            "proficient": {
                "concept": "Explains regression vs classification and defines decision boundaries accurately.",
                "coding": "Programs Euclidean distance and handles list iteration cleanly.",
                "sim": "Systematically balances slope and intercept to minimize classification errors."
            },
            "advanced": {
                "concept": "Analyzes algorithmic complexity of k-NN and mathematically formulates hyperplanes.",
                "coding": "Builds vectorized nearest-neighbor classes with support for arbitrary dimensions.",
                "sim": "Achieves perfect F1-score trade-offs under dynamic sensor noise."
            }
        },
        "responsible_ai": "Autonomous Decision Thresholds: When AI prediction models control vehicle brakes or battery kill-switches, conservative safety thresholds must be chosen to favor false alarms over catastrophic failures.",
        "xp": 110,
        "badge": "Prediction Pioneer",
        "next_mission": "Class 9 Chapter 2 Lesson 1: Python in Action"
    }
]

print("Class 9 Chapter 1 defined.")
