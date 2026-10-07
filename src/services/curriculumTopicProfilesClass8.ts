// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 8 (12 DISTINCT LESSONS)
// Applied AI Thinking & Python Coding • Ages 13-14
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS8_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'how ai makes choices': {
    title: 'How AI Makes Choices',
    hook: 'When an AI makes a critical decision—like whether to approve an emergency loan or flag a medical scan—how does it calculate certainty versus risk?',
    goal: 'Understand probabilistic decision theory: Bayesian probability, decision boundaries, ROC curves, and threshold tuning in machine learning.',
    learnPoints: [
      'Understand how AI outputs continuous probability confidence scores (0.0 to 1.0)',
      'Learn how adjusting Decision Thresholds balances False Positives vs False Negatives',
      'Discover ROC (Receiver Operating Characteristic) curves and AUC metrics'
    ],
    analogy: 'A decision threshold is like adjusting the sensitivity knob on a smoke detector: set it too sensitive and it beeps when you make toast (False Positive); set it too low and it misses a real fire (False Negative)!',
    explanationHtml: `<h3>Probabilistic Decision Boundaries</h3>
<p>Unlike binary code that returns a rigid True or False, machine learning classification models output a continuous probability: <code>P(Class = Disease | Symptoms) = 0.87</code>. Data engineers must choose an operational <strong>Decision Threshold</strong> (typically 0.50) to trigger actions.</p>
<h4>Tuning for Mission-Critical Safety</h4>
<p>In medical cancer screening, doctors lower the threshold to 0.20 so the model never misses a single potential tumor (minimizing False Negatives), accepting that some patients will receive follow-up confirmatory tests.</p>`,
    step1: {
      title: '1. Probability Estimation via Sigmoid/Softmax',
      desc: 'Convert raw neural network logit outputs into calibrated probabilities between 0.0 and 1.0.',
      detail: 'Maps continuous values to probabilities.',
      code: 'probability = 1.0 / (1.0 + np.exp(-logit_score))\n# Probability: 0.88'
    },
    step2: {
      title: '2. Threshold Optimization & Trade-Offs',
      desc: 'Evaluate the business and safety cost of False Positives vs False Negatives.',
      detail: 'Selects the optimal cutoff point on the precision-recall curve.',
      code: 'threshold = 0.35 # Conservative medical screening threshold\nis_flagged = (probability >= threshold)'
    },
    step3: {
      title: '3. Confusion Matrix & ROC-AUC Analysis',
      desc: 'Plot True Positive Rate against False Positive Rate across all thresholds.',
      detail: 'AUC score of 1.0 represents a perfect classifier.',
      code: 'from sklearn.metrics import roc_auc_score\nauc = roc_auc_score(y_true, y_pred_probs)'
    },
    realScenario: 'An airport security baggage scanner tuned its AI threshold to prioritize high recall (0.99). The AI flagged 5 suspicious bags for manual physical inspection by officers, catching a smuggled lithium battery that could have caught fire in the cargo hold.',
    useCases: [
      'Medical triage algorithms setting ultra-conservative thresholds for cardiac emergencies',
      'Autonomous emergency braking systems balancing collision avoidance with false alarm passenger comfort',
      'Spam filters tuning high precision so important job interview emails never go to the junk folder'
    ],
    simCode: 'prediction_prob = 0.78\nthreshold = 0.50\nprint(f"Model Confidence: {prediction_prob * 100:.1f}%")\nprint(f"Decision: {\'POSITIVE (Action Triggered ⚡)\' if prediction_prob >= threshold else \'NEGATIVE\'}")',
    simOutput: 'Model Confidence: 78.0%\nDecision: POSITIVE (Action Triggered ⚡)',
    pairs: [
      { id: 'p1', term: 'Decision Threshold', definition: 'The probability cutoff value (e.g. 0.50) above which an AI assigns a positive label' },
      { id: 'p2', term: 'False Positive (Type I)', definition: 'When the AI incorrectly sounds an alarm for something that is actually safe or normal' },
      { id: 'p3', term: 'False Negative (Type II)', definition: 'When the AI misses a real target or hazard, incorrectly labeling it as safe' }
    ],
    practice: {
      q: 'Why would a hospital cancer screening AI use a lower decision threshold (like 0.20 instead of 0.50)?',
      opts: [
        'To ensure the model catches almost every potential tumor (minimizing dangerous False Negatives), even if it causes a few harmless extra checks',
        'Because doctors prefer the number 20',
        'To save hard drive space on hospital computers',
        'Because the scanner only works at 20% power'
      ],
      correct: 0,
      exp: 'Lowering the decision threshold maximizes sensitivity (recall) when missing a positive case carries life-threatening consequences.',
      hint: 'Think about making sure you never miss a sick patient.'
    },
    quizzes: [
      {
        q: 'What is a "False Positive" error in machine learning?',
        opts: [
          { text: 'When the system incorrectly flags a normal condition as dangerous (like an innocent email sent to the spam folder)', isCorrect: true },
          { text: 'When the computer screen turns green', isCorrect: false }
        ],
        exp: 'A false positive is an incorrect positive detection when the ground truth is negative.'
      }
    ],
    practicalTask: {
      title: 'Threshold Sensitivity Tuning Experiment',
      objective: 'Calculate False Positives and False Negatives for 5 patients at two different thresholds (0.50 vs 0.20).',
      steps: [
        '1. Patient Probs: [0.15, 0.25 (Sick), 0.45 (Sick), 0.60 (Sick), 0.10].',
        '2. At Threshold 0.50: How many sick patients are missed? (2 False Negatives!).',
        '3. At Threshold 0.20: How many sick patients are missed? (0 False Negatives!).',
        'Write why Threshold 0.20 saves lives in healthcare.'
      ],
      expectedResult: 'You will master the trade-offs between precision and recall in critical AI systems.'
    },
    recall: {
      q: 'What is the trade-off in setting an AI decision threshold?',
      a: 'A high threshold avoids false alarms (high precision); a low threshold catches every hazard (high recall)!'
    },
    takeaways: [
      'Machine learning models output continuous probabilities rather than rigid binary decisions.',
      'Adjusting decision thresholds balances the human cost of False Positives versus False Negatives.',
      'ROC-AUC curves measure how effectively a model separates true classes across all possible thresholds.'
    ]
  },

  'learning from data': {
    title: 'Learning from Data',
    hook: 'How can an algorithm build a complete Decision Tree with 20 branches by calculating the "Entropy" and "Information Gain" of a dataset?',
    goal: 'Master Decision Tree algorithms: Entropy, Gini Impurity, Information Gain, and Recursive Binary Splitting in Python.',
    learnPoints: [
      'Understand Entropy: measuring chaos and uncertainty in a dataset',
      'Learn Information Gain: choosing the best question that splits data most cleanly',
      'Train and visualize decision trees using scikit-learn in Python'
    ],
    analogy: 'Building a decision tree is like playing the ultimate game of 20 Questions: you want to ask the single smartest question first (e.g. "Is it an animal?") because it instantly eliminates half the possibilities!',
    explanationHtml: `<h3>The Mathematics of Decision Trees</h3>
<p>Decision Trees are one of the most intuitive and interpretable machine learning models. They make choices by recursively partitioning data using mathematical metrics:</p>
<h4>1. Shannon Entropy</h4>
<p>Entropy measures the randomness or disorder of a dataset: $$H(S) = -\\sum p_i \\log_2 p_i$$. A pure dataset (all cats) has 0.0 Entropy; a completely mixed dataset (50% cats, 50% dogs) has maximum 1.0 Entropy.</p>
<h4>2. Information Gain</h4>
<p>Information Gain measures how much entropy is reduced after asking a specific feature question. The algorithm picks the feature with the highest Information Gain at every split!</p>`,
    step1: {
      title: '1. Computing Baseline Entropy',
      desc: 'Calculate the uncertainty of the target variable across all training instances.',
      detail: 'Establishes initial baseline disorder.',
      code: 'import numpy as np\ndef entropy(p):\n    return -np.sum([pi * np.log2(pi) for pi in p if pi > 0])'
    },
    step2: {
      title: '2. Recursive Best-Split Selection',
      desc: 'Iterate through all candidate features and select the split that maximizes Information Gain.',
      detail: 'Greedy recursive partitioning builds branches.',
      code: 'from sklearn.tree import DecisionTreeClassifier\ntree_clf = DecisionTreeClassifier(max_depth=4, criterion="entropy")\ntree_clf.fit(X_train, y_train)'
    },
    step3: {
      title: '3. Visualizing Tree Rules & Pruning',
      desc: 'Export the decision tree graph to inspect human-readable IF-THEN rules and prune overfitting branches.',
      detail: 'Provides 100% white-box model explainability.',
      code: 'from sklearn.tree import export_text\nprint(export_text(tree_clf, feature_names=feature_cols))'
    },
    realScenario: 'A medical diagnostic center built a Decision Tree model to diagnose strep throat in pediatric patients. The tree’s top questions ("Fever > 38.5°C?" → "Swollen tonsils?") matched clinical pediatric guidelines perfectly, giving doctors 96% diagnostic accuracy with full transparency.',
    useCases: [
      'Credit scoring algorithms providing transparent, legally explainable loan rejection reasons',
      'Customer churn prediction identifying early warning signals in telecom subscriptions',
      'Medical triage decision support in emergency rooms'
    ],
    simCode: 'from sklearn.tree import DecisionTreeClassifier\n# Simulated Decision Split: [Feature 1: Has Fever, Feature 2: Cough]\nX = [[1, 0], [1, 1], [0, 0], [0, 1]]\ny = ["Flu", "Cold", "Healthy", "Allergy"]\nclf = DecisionTreeClassifier().fit(X, y)\nprint(f"Trained Tree Depth: {clf.get_depth()} | Split Rules: White-Box Interpretable ✅")',
    simOutput: 'Trained Tree Depth: 2 | Split Rules: White-Box Interpretable ✅',
    pairs: [
      { id: 'p1', term: 'Entropy', definition: 'A mathematical measure of uncertainty, disorder, or impurity in a dataset' },
      { id: 'p2', term: 'Information Gain', definition: 'The reduction in entropy achieved by partitioning a dataset on a specific feature' },
      { id: 'p3', term: 'Pruning', definition: 'Trimming back unnecessary leaf branches on a decision tree to prevent overfitting' }
    ],
    practice: {
      q: 'Why do decision tree algorithms choose the feature with the highest Information Gain at each branch?',
      opts: [
        'Because that feature reduces uncertainty the most and creates the cleanest, most pure split of the data',
        'Because that feature is the longest word',
        'Because computers prefer features with vowels',
        'To make the tree grow taller than the monitor'
      ],
      correct: 0,
      exp: 'Information gain measures entropy reduction; maximizing it ensures the most efficient data separation.',
      hint: 'Think about choosing the question that clears up the most confusion.'
    },
    quizzes: [
      {
        q: 'What is a major advantage of Decision Trees over deep neural networks?',
        opts: [
          { text: 'Decision Trees are "White-Box" models that provide transparent, human-readable IF-THEN rules for every choice', isCorrect: true },
          { text: 'Decision Trees only work with water and soil', isCorrect: false }
        ],
        exp: 'Decision trees are fully interpretable, allowing humans to trace every logical decision branch.'
      }
    ],
    practicalTask: {
      title: 'Manual Information Gain Calculation Lab',
      objective: 'Calculate whether "Has Wings" or "Breathes Air" provides higher Information Gain for classifying animals.',
      steps: [
        '1. Dataset: 4 Animals [Bat (Fly/Air), Eagle (Fly/Air), Whale (NoFly/Air), Trout (NoFly/Water)].',
        '2. Target: Mammal vs Non-Mammal.',
        '3. Test Split 1: "Breathes Air" (Separates Trout completely).',
        '4. Explain why "Breathes Air" is the optimal top root node.'
      ],
      expectedResult: 'You will understand the mathematical logic behind decision tree root splits.'
    },
    recall: {
      q: 'What is Entropy in machine learning?',
      a: 'A mathematical measure of chaos and impurity in a dataset—lower entropy means purer, more organized data!'
    },
    takeaways: [
      'Decision Trees partition data recursively using Entropy and Information Gain.',
      'Unlike black-box neural networks, Decision Trees are fully transparent and explainable.',
      'Pruning deep branches prevents trees from overfitting to noisy training data.'
    ]
  },

  'python playground': {
    title: 'Python Playground',
    hook: 'How can you write a 15-line Python script that simulates rolling two 6-sided dice 100,000 times to prove the mathematical probability of rolling a lucky 7?',
    goal: 'Master Python intermediate programming: functions with default arguments, lambda expressions, list comprehensions, and the `random` module.',
    learnPoints: [
      'Master List Comprehensions: transforming and filtering lists in a single elegant line',
      'Understand Functions with default arguments, return values, and keyword arguments',
      'Use the Python `random` module for Monte Carlo simulations and probability modeling'
    ],
    analogy: 'List comprehensions in Python are like an automated factory conveyor belt: you put raw items on one end, apply a transformation stamp, and get a fresh new list out the other end in one elegant line!',
    explanationHtml: `<h3>Advanced Python Expressiveness</h3>
<p>Python’s true elegance shines in its concise, expressive syntax. In this playground lesson, we master functions, modularity, and list comprehensions to write powerful computational scripts in fewer lines of code.</p>
<h4>List Comprehensions vs. Traditional Loops</h4>
<p>Instead of creating an empty list and appending in a 4-line loop, Python allows: <code>squares = [x**2 for x in range(10) if x % 2 == 0]</code>!</p>`,
    step1: {
      title: '1. Defining Modular Functions with Docstrings',
      desc: 'Write clean functions with type annotations, default parameters, and docstrings.',
      detail: 'Encapsulates reusable computational logic.',
      code: 'def roll_dice(num_dice: int = 2, sides: int = 6) -> int:\n    """Simulate rolling N dice with S sides."""\n    import random\n    return sum([random.randint(1, sides) for _ in range(num_dice)])'
    },
    step2: {
      title: '2. High-Performance List Comprehensions',
      desc: 'Generate, filter, and transform data arrays using concise list comprehension syntax.',
      detail: 'Executes faster than manual loop appends.',
      code: 'trials = 100000\nresults = [roll_dice() for _ in range(trials)]\nsevens_count = results.count(7)'
    },
    step3: {
      title: '3. Statistical Probability Validation',
      desc: 'Calculate experimental percentage vs theoretical probability (6/36 = 16.67%).',
      detail: 'Validates the Law of Large Numbers.',
      code: 'experimental_prob = (sevens_count / trials) * 100\nprint(f"Rolled 7: {sevens_count:,} times ({experimental_prob:.2f}% | Expected: 16.67%)")'
    },
    realScenario: 'A student simulated 50,000 games of rock-paper-scissors in Python to test whether playing "Rock" on the first turn is statistically neutral, verifying game theory mathematically.',
    useCases: [
      'Game developers simulating critical hit probabilities in RPG combat formulas',
      'Meteorologists running Monte Carlo hurricane path probability simulations',
      'Financial analysts running 10,000 market scenarios to stress-test retirement funds'
    ],
    simCode: 'import random\nscores = [random.randint(50, 100) for _ in range(10)]\nhonor_roll = [s for s in scores if s >= 90]\nprint(f"Generated Scores: {scores}")\nprint(f"Honor Roll (>90): {honor_roll} 🌟")',
    simOutput: 'Generated Scores: [72, 94, 88, 91, 65, 99, 83, 76, 92, 58]\nHonor Roll (>90): [94, 91, 99, 92] 🌟',
    pairs: [
      { id: 'p1', term: 'List Comprehension', definition: 'A concise Python syntax for creating new lists by transforming or filtering iterable sequences' },
      { id: 'p2', term: 'Monte Carlo Simulation', definition: 'Using repeated random sampling to calculate mathematical probabilities and solve problems' },
      { id: 'p3', term: 'Docstring', definition: 'A multi-line documentation string enclosed in triple quotes explaining what a function does' }
    ],
    practice: {
      q: 'Which Python list comprehension will create a list of even numbers from 0 to 10?',
      opts: [
        '[x for x in range(11) if x % 2 == 0]',
        '[x * 2 for x in range(10)]',
        'for x in range(10): even(x)',
        '[x if x == even]'
      ],
      correct: 0,
      exp: '`[x for x in range(11) if x % 2 == 0]` iterates through numbers 0-10 and filters for those with a modulo 2 remainder of 0.',
      hint: 'Look for the list comprehension with the condition `if x % 2 == 0`.'
    },
    quizzes: [
      {
        q: 'What is the benefit of using Python list comprehensions over traditional for loops?',
        opts: [
          { text: 'They are more concise, readable, and often execute significantly faster under the hood in CPython', isCorrect: true },
          { text: 'They turn the code editor into a video game', isCorrect: false }
        ],
        exp: 'List comprehensions optimize bytecode creation for rapid list generation.'
      }
    ],
    practicalTask: {
      title: 'Monte Carlo Coin Flip Simulation',
      objective: 'Write a Python script that flips a virtual coin 10,000 times and computes heads percentage.',
      steps: [
        '1. Use `random.choice(["HEADS", "TAILS"])`.',
        '2. Generate 10,000 flips with list comprehension: `flips = [random.choice(["HEADS", "TAILS"]) for _ in range(10000)]`.',
        '3. Count heads: `heads = flips.count("HEADS")`.',
        '4. Print percentage: `print(f"Heads: {heads/10000*100:.2f}% (Theoretical: 50.00%)")`.'
      ],
      expectedResult: 'You will master list comprehensions and Monte Carlo probability simulation.'
    },
    recall: {
      q: 'What is a List Comprehension in Python?',
      a: 'A single-line syntax `[expression for item in list if condition]` that transforms and filters data lists efficiently!'
    },
    takeaways: [
      'List comprehensions replace multi-line loop appends with clean, readable code.',
      'Functions with default arguments and docstrings make software reusable and professional.',
      'Monte Carlo simulations use Python’s `random` module to test mathematical probabilities at scale.'
    ]
  },

  'code a solution': {
    title: 'Code a Solution',
    hook: 'How can you build a complete Command Line Tool in Python that reads student attendance records, calculates class averages, and generates an automated PDF certificate?',
    goal: 'Build an end-to-end Python utility: file handling (I/O), exception handling (try/except), modular libraries, and command line arguments.',
    learnPoints: [
      'Master file handling in Python using `with open("data.txt", "r") as file:`',
      'Understand Robust Exception Handling with `try`, `except`, `else`, and `finally`',
      'Use third-party libraries (installed via pip) to extend Python capabilities'
    ],
    analogy: 'Exception handling in code is like wearing a helmet and knee pads while skateboarding: when an unexpected bump happens (error), you don’t crash and break your bones; you slide smoothly and keep riding!',
    explanationHtml: `<h3>Building Resilient, Production-Ready Python Scripts</h3>
<p>Beginner code crashes the moment an unexpected input is entered. Production-grade software uses <strong>Defensive File I/O</strong> and <strong>Exception Handling</strong> to ensure programs recover gracefully from missing files or corrupted data.</p>`,
    step1: {
      title: '1. Safe File Context Managers',
      desc: 'Always read and write files using the `with open()` statement to ensure file descriptors close automatically.',
      detail: 'Prevents memory resource leaks.',
      code: 'try:\n    with open("scores.csv", "r") as f:\n        records = [line.strip().split(",") for line in f]\nexcept FileNotFoundError:\n    records = [] # Graceful fallback'
    },
    step2: {
      title: '2. Comprehensive Exception Handling',
      desc: 'Catch specific exceptions (ValueError, ZeroDivisionError, KeyError) and log informative error messages.',
      detail: 'Keeps software running smoothly.',
      code: 'try:\n    score = int(input("Enter exam score: "))\n    assert 0 <= score <= 100, "Score out of range"\nexcept (ValueError, AssertionError) as err:\n    print(f"Invalid input: {err}")'
    },
    step3: {
      title: '3. Data Processing & Report Generation',
      desc: 'Process records, compute metrics, and export clean formatted reports to disk.',
      detail: 'Produces persistent output artifacts.',
      code: 'with open("summary_report.txt", "w") as out:\n    out.write(f"Class Average: {compute_mean(records):.2f}%\\n")\nprint("Report saved successfully! 📄")'
    },
    realScenario: 'A student built an automated Python homework logger that reads weekly assignment files from a folder, checks for missing homework, and generates a formatted progress summary table for their teacher every Friday.',
    useCases: [
      'System administrators parsing server log files to detect unauthorized login attempts',
      'E-commerce backends processing batch customer invoices and generating receipts',
      'Scientific instruments logging sensor telemetry continuously to timestamped CSV files'
    ],
    simCode: 'try:\n    filename = "lab_results.csv"\n    print(f"Reading {filename}... ✅ 50 records loaded.")\n    print("Processing complete: 0 errors detected. 🚀")\nexcept Exception as err:\n    print(f"Handled error: {err}")',
    simOutput: 'Reading lab_results.csv... ✅ 50 records loaded.\nProcessing complete: 0 errors detected. 🚀',
    pairs: [
      { id: 'p1', term: 'Context Manager (`with open`)', definition: 'A Python construct that ensures files are properly opened and closed, even if errors occur' },
      { id: 'p2', term: 'Try / Except Block', definition: 'A code structure that catches and handles runtime exceptions without crashing the program' },
      { id: 'p3', term: 'File I/O', definition: 'Input/Output operations that read data from and write data to physical disk storage' }
    ],
    practice: {
      q: 'Why should you always use `with open("file.txt", "r") as f:` when reading files in Python?',
      opts: [
        'It automatically closes the file safely when finished, preventing file corruption and memory leaks even if an error occurs',
        'It makes the file open 10 times faster',
        'Because Python crashes if you don’t type `with`',
        'To encrypt the text in secret code'
      ],
      correct: 0,
      exp: 'Context managers guarantee deterministic file descriptor closure.',
      hint: 'Think about automatically closing files safely.'
    },
    quizzes: [
      {
        q: 'What happens when an exception occurs inside a `try` block that has a matching `except` handler?',
        opts: [
          { text: 'Execution jumps to the `except` block to handle the error gracefully without terminating the program', isCorrect: true },
          { text: 'The computer restarts immediately', isCorrect: false }
        ],
        exp: 'Exception handlers catch runtime errors and allow the program to continue executing safely.'
      }
    ],
    practicalTask: {
      title: 'Resilient Student Grade Logger Project',
      objective: 'Write a Python script that saves student names and scores to a file with try/except validation.',
      steps: [
        '1. Use a while loop to input name and score.',
        '2. Validate score with try/except: must be integer 0-100.',
        '3. Append valid entries to `grades.txt` using `with open("grades.txt", "a") as f:`.',
        '4. Print total records saved.'
      ],
      expectedResult: 'You will build a resilient file-logging application with bulletproof error handling.'
    },
    recall: {
      q: 'What is the purpose of a `try...except` block in Python?',
      a: 'To catch potential errors and handle them safely so your software never crashes unexpectedly!'
    },
    takeaways: [
      'File context managers (`with open`) ensure safe, leak-free disk read/write operations.',
      'Exception handling with `try...except` creates resilient, crash-proof production software.',
      'Building complete end-to-end command line tools cements intermediate programming mastery.'
    ]
  },

  'ai for better health': {
    title: 'AI for Better Health',
    hook: 'How can a smartwatch PPG optical sensor detect atrial fibrillation heart arrhythmias with 98% accuracy by measuring how green light reflects off blood in your wrist veins?',
    goal: 'Explore AI in personal health and biometrics: photoplethysmography (PPG), ECG signal processing, predictive wellness, and early epidemic tracking.',
    learnPoints: [
      'Understand Photoplethysmography (PPG): optical heart rate measurement using green/infrared LEDs',
      'Learn how neural networks detect arrhythmia and sleep apnea from wearable sensor data',
      'Explore digital epidemiology: using search trends and wearable data to track flu outbreaks'
    ],
    analogy: 'A wearable health AI is like a 24/7 personal cardiologist on your wrist: it quietly monitors your pulse rhythm every second and whispers a gentle warning if it spots an irregular heartbeat!',
    explanationHtml: `<h3>Wearable Biometrics & Predictive Healthcare</h3>
<p>Modern wearable devices (Apple Watch, Fitbit, WHOOP) contain optical <strong>Photoplethysmography (PPG)</strong> sensors that illuminate the skin with green LEDs (525nm). Because blood absorbs green light, blood volume pulses with each heartbeat, allowing microcontrollers to calculate heart rate and pulse wave velocity in real time.</p>`,
    step1: {
      title: '1. Optical PPG Sensor Telemetry',
      desc: 'Sample green LED photodiode reflection signals at 100 Hz to capture micro-pulsations in arterial blood volume.',
      detail: 'Isolates systolic pulse peaks from ambient noise.',
      code: 'ppg_signal = optical_sensor.read_green_photodiode(freq_hz=100)\n# Peak-to-peak interval = RR interval'
    },
    step2: {
      title: '2. Heart Rate Variability (HRV) & Arrhythmia Analysis',
      desc: 'Compute statistical variation between consecutive heartbeats (RMSSD).',
      detail: 'Low HRV indicates stress or fatigue; irregular intervals flag atrial fibrillation.',
      code: 'rr_intervals = compute_peak_intervals(ppg_signal)\nhrv_score = calculate_rmssd(rr_intervals)\nif detect_afib(rr_intervals): alert_user()'
    },
    step3: {
      title: '3. Predictive Wellness & Sleep Architecture',
      desc: 'Combine accelerometer, skin temperature, and PPG data to classify sleep stages (Light, Deep, REM).',
      detail: 'Provides actionable sleep recovery scores.',
      code: 'sleep_stage = sleep_classifier.predict(ppg_hrv, wrist_accelerometer, skin_temp)'
    },
    realScenario: 'A marathon runner felt fatigued during training. Their wearable health AI flagged an abnormal dip in Heart Rate Variability and elevated resting heart rate, warning them to rest. A blood test revealed an early viral infection, preventing severe illness.',
    useCases: [
      'Smartwatches detecting silent atrial fibrillation in over 500,000 users worldwide',
      'Continuous glucose monitors using AI to predict blood sugar drops 30 minutes in advance for diabetics',
      'Digital epidemiology algorithms predicting seasonal influenza spikes 2 weeks ahead of hospital admissions'
    ],
    simCode: 'bpm = 72\nhrv_rmssd = 58 # Normal healthy recovery\nif bpm > 100 and hrv_rmssd < 20:\n    status = "⚠️ Elevated Strain: Rest Recommended"\nelse:\n    status = "✅ Optimal Wellness: Cardiovascular Recovery Strong 💚"\nprint(f"Health Monitor: {status}")',
    simOutput: 'Health Monitor: ✅ Optimal Wellness: Cardiovascular Recovery Strong 💚',
    pairs: [
      { id: 'p1', term: 'PPG (Photoplethysmography)', definition: 'Optical sensor technology using green light to measure blood flow changes in blood vessels' },
      { id: 'p2', term: 'Heart Rate Variability (HRV)', definition: 'The variation in time between consecutive heartbeats, used as a key biomarker of nervous system recovery' },
      { id: 'p3', term: 'Atrial Fibrillation (AFib)', definition: 'An irregular, often rapid heart rate that can cause poor blood flow and risk of stroke' }
    ],
    practice: {
      q: 'How does an optical PPG sensor in a smartwatch measure your heart rate?',
      opts: [
        'By flashing green light into the skin and measuring how light absorption changes with each pulsing wave of blood',
        'By listening with a tiny microphone for heart thumps',
        'By asking you to count in your head',
        'By measuring the temperature of the air'
      ],
      correct: 0,
      exp: 'Hemoglobin absorbs green light; pulsing blood volume modulates the reflected light signal with every heartbeat.',
      hint: 'Think about green light reflection and pulsing blood.'
    },
    quizzes: [
      {
        q: 'Why is high Heart Rate Variability (HRV) generally a sign of good health and fitness?',
        opts: [
          { text: 'It indicates a resilient, adaptable autonomic nervous system that responds flexibly to exercise and stress', isCorrect: true },
          { text: 'It means your heart is beating like a robotic clock', isCorrect: false }
        ],
        exp: 'High HRV reflects healthy parasympathetic nervous system adaptability and recovery.'
      }
    ],
    practicalTask: {
      title: 'Wearable Biometric Signal Analysis',
      objective: 'Calculate resting heart rate and assess recovery from sample RR-intervals.',
      steps: [
        '1. RR-intervals in ms: [850, 840, 860, 855, 845].',
        '2. Calculate average interval: 850 ms (0.85 seconds).',
        '3. Calculate Heart Rate in BPM: 60 / 0.85 = 70.6 BPM.',
        '4. Explain why steady, smooth intervals indicate calm cardiovascular state.'
      ],
      expectedResult: 'You will understand the signal mathematics behind smartwatch health metrics.'
    },
    recall: {
      q: 'What is Photoplethysmography (PPG)?',
      a: 'Using green optical light to measure blood pulse volume changes and heart rate through the skin!'
    },
    takeaways: [
      'Wearable optical sensors (PPG) track heart rate, HRV, and sleep stages continuously.',
      'AI models detect silent cardiovascular anomalies (like AFib) before symptoms become severe.',
      'Predictive health data empowers individuals to make proactive lifestyle and wellness decisions.'
    ]
  },

  'ai for better cities': {
    title: 'AI for Better Cities',
    hook: 'How can an AI digital twin of an entire metropolitan city simulate 2 million car trips, subway schedules, and electricity flows to eliminate rush hour traffic jams?',
    goal: 'Understand Smart City systems: Digital Twins, adaptive traffic signaling, predictive water leak detection, and intelligent energy dispatching.',
    learnPoints: [
      'Understand Urban Digital Twins: virtual 3D physics models simulating city operations',
      'Learn how computer vision traffic cameras dynamically adjust traffic light green times',
      'Discover acoustic IoT sensor networks detecting underground water pipe leaks'
    ],
    analogy: 'A Smart City AI is like the conductor of a massive symphony orchestra: it coordinates traffic lights, water pipes, subway trains, and power plants so the entire city moves in perfect harmony!',
    explanationHtml: `<h3>The Architecture of Smart Cities</h3>
<p>Modern cities are building <strong>Urban Digital Twins</strong>—photorealistic, real-time 3D simulation models connected to millions of IoT street sensors, traffic cameras, and power meters.</p>
<h4>1. Dynamic Traffic Flow Optimization</h4>
<p>Instead of fixed 60-second timers, smart traffic lights use camera object detection to count waiting cars and extend green lights dynamically for dense queues or emergency ambulances.</p>
<h4>2. Acoustic Water Leak Detection</h4>
<p>Smart acoustic sensors attached to underground city water pipes listen for micro-vibrations from pipe cracks, pinpointing underground leaks before millions of gallons are lost.</p>`,
    step1: {
      title: '1. City-Wide IoT Sensor Telemetry Ingestion',
      desc: 'Aggregate real-time data from 5,000 intersection cameras, air quality monitors, and power substations.',
      detail: 'Streams telemetry to centralized Digital Twin.',
      code: 'city_telemetry = ingest_sensor_stream(city_id="Metropolis_01")\n# Coordinates: traffic_density, power_load, water_pressure'
    },
    step2: {
      title: '2. Deep Reinforcement Learning Signal Control',
      desc: 'Reinforcement learning agents optimize green light durations across 50 interconnected intersections.',
      detail: 'Minimizes city-wide vehicle wait times and idling emissions.',
      code: 'signal_action = rl_traffic_agent.get_optimal_timing(intersection_queues)\nset_traffic_light_green(intersection_id=14, duration_sec=45)'
    },
    step3: {
      title: '3. Urban Digital Twin Simulation',
      desc: 'Simulate the impact of proposed bus lanes, subway extensions, and storm surges before construction begins.',
      detail: 'Prevents multi-million dollar infrastructure planning mistakes.',
      code: 'run_urban_simulation(scenario="NEW_METRO_LINE_EAST", duration_years=5)'
    },
    realScenario: 'The city of Singapore deployed an Urban Digital Twin connected to live traffic sensors. By dynamically adjusting traffic signal timings and dispatching express buses during sudden rainstorms, city-wide commute delays dropped by 18%.',
    useCases: [
      'Dynamic traffic signals prioritizing city buses and emergency fire trucks',
      'Smart streetlights dimming to 30% when roads are empty and brightening when pedestrians approach, saving 60% electricity',
      'Acoustic water pipe sensors saving 30 million liters of drinking water per year in smart municipalities'
    ],
    simCode: 'queue_north = 45 # vehicles waiting\nqueue_east = 12\nif queue_north > queue_east * 3:\n    light_action = "Extend North-South Green Light (+20 sec) 🟢🚗"\nprint(f"Smart Intersection AI: {light_action}")',
    simOutput: 'Smart Intersection AI: Extend North-South Green Light (+20 sec) 🟢🚗',
    pairs: [
      { id: 'p1', term: 'Digital Twin', definition: 'A virtual 3D computer simulation of a physical city or machine that mirrors real-time sensor data' },
      { id: 'p2', term: 'Dynamic Traffic Signaling', definition: 'Traffic lights that automatically change duration based on live vehicle camera counts' },
      { id: 'p3', term: 'Smart Grid Load Balancing', definition: 'Automatically shifting city electrical power to prevent blackouts and integrate renewable energy' }
    ],
    practice: {
      q: 'How do smart traffic lights with computer vision cameras improve city life compared to old fixed-timer lights?',
      opts: [
        'They count waiting vehicles in real time and adjust green light duration dynamically, reducing traffic jams and fuel waste',
        'They change colors to purple and pink at night',
        'They flash red continuously during rush hour',
        'They turn off during rainstorms'
      ],
      correct: 0,
      exp: 'Dynamic adaptive traffic signaling clears congested queues efficiently and reduces vehicle idling emissions.',
      hint: 'Think about counting vehicles and adjusting green lights dynamically.'
    },
    quizzes: [
      {
        q: 'What is an "Urban Digital Twin"?',
        opts: [
          { text: 'A real-time virtual 3D simulation of a city connected to live IoT sensors used to test urban planning and optimize city operations', isCorrect: true },
          { text: 'Two identical cities built next to each other', isCorrect: false }
        ],
        exp: 'Digital twins mirror physical infrastructure for testing and operational optimization.'
      }
    ],
    practicalTask: {
      title: 'Smart City Dispatch Simulation',
      objective: 'Calculate the optimal green light timing for an intersection with an approaching ambulance.',
      steps: [
        '1. North: 40 cars, East: 10 cars.',
        '2. Emergency Alert: Ambulance approaching East bound at 60 km/h.',
        '3. Emergency Rule: Immediately trigger East Green light 🟢 and hold North Red 🔴.',
        'Write 2 sentences explaining how sensor automation saves lives during emergencies.'
      ],
      expectedResult: 'You will understand priority-based emergency dispatch logic in smart cities.'
    },
    recall: {
      q: 'What is an Urban Digital Twin?',
      a: 'A virtual 3D computer replica of a city that uses live sensor data to simulate traffic, energy, and weather!'
    },
    takeaways: [
      'Smart cities use IoT sensors and AI to optimize traffic, conserve water, and reduce emissions.',
      'Dynamic traffic signaling reduces commute delays and prioritizes emergency vehicles.',
      'Digital Twins allow urban planners to simulate and test infrastructure changes before building.'
    ]
  },

  'find your future path': {
    title: 'Find Your Future Path',
    hook: 'If you could design your ideal high school and college course roadmap today, which combination of AI coding, design, and science would unlock your dream career?',
    goal: 'Build an educational roadmap: course electives, extracurricular robotics clubs, online certifications, and hackathons.',
    learnPoints: [
      'Explore high school pathways: AP Computer Science, Statistics, Physics, and Digital Media',
      'Learn the value of participating in hackathons, robotics teams (FIRST/VEX), and science fairs',
      'Discover free open-source learning platforms (Kaggle, GitHub, Coursera, arXiv)'
    ],
    analogy: 'Mapping your educational path is like plotting a hiking expedition up Mount Everest: you set base camps (milestones), pack the right gear (skills), and climb step-by-step toward the summit!',
    explanationHtml: `<h3>Crafting Your Educational Journey</h3>
<p>Success in the rapidly evolving world of technology does not happen by accident. It is built through deliberate practice, exploring complementary subjects, and engaging in hands-on team competitions.</p>
<h4>The 3 Pillars of a Standout STEM Profile</h4>
<ul>
  <li><strong>1. Rigorous Foundations:</strong> Mathematics (Algebra, Calculus), Computer Science, and Physics.</li>
  <li><strong>2. Practical Experience:</strong> Hackathons, open-source GitHub contributions, and robotics clubs.</li>
  <li><strong>3. Cross-Disciplinary Passion:</strong> Connecting technology to art, biology, environmental science, or economics.</li>
</ul>`,
    step1: {
      title: '1. Curating High School Academic Electives',
      desc: 'Select courses that build analytical reasoning: AP/IB Computer Science, Advanced Statistics, and Physics.',
      detail: 'Builds foundational quantitative literacy.',
      code: 'academic_plan = ["AP Computer Science A", "AP Statistics", "Linear Algebra"]'
    },
    step2: {
      title: '2. Extracurricular Competitions & Hackathons',
      desc: 'Join school robotics teams (FIRST Robotics / VEX) and participate in weekend hackathons.',
      detail: 'Develops rapid prototyping and teamwork under pressure.',
      code: 'activities = ["Robotics Team Lead Programmer", "Youth Climate Hackathon 2026"]'
    },
    step3: {
      title: '3. Open-Source Publishing & Science Fairs',
      desc: 'Submit independent research projects to regional and national science fairs (ISEF, Olympiads).',
      detail: 'Demonstrates authentic scientific initiative.',
      code: 'submit_science_fair_project("AI Satellite Deforestation Tracker")'
    },
    realScenario: 'A high school student joined their school’s robotics club, learned computer vision for autonomous target tracking, and used that experience to build a low-cost sorting robot for their local recycling center.',
    useCases: [
      'Students competing in Kaggle data science competitions to solve real-world predictive challenges',
      'Youth hackathon teams building mobile apps in 24 hours to assist visually impaired classmates',
      'High school students publishing open-source Python packages on PyPI'
    ],
    simCode: 'roadmap = ["Year 1: Python & Statistics 🐍", "Year 2: Robotics & Hackathons 🤖", "Year 3: Machine Learning & Portfolio 🚀", "Year 4: Capstone Research & College 🎓"]\nfor stage in roadmap:\n    print(f"Path: {stage}")',
    simOutput: 'Path: Year 1: Python & Statistics 🐍\nPath: Year 2: Robotics & Hackathons 🤖\nPath: Year 3: Machine Learning & Portfolio 🚀\nPath: Year 4: Capstone Research & College 🎓',
    pairs: [
      { id: 'p1', term: 'Hackathon', definition: 'A 24-48 hour collaborative coding sprint where teams design and build innovative software prototypes' },
      { id: 'p2', term: 'FIRST Robotics', definition: 'An international youth robotics competition that combines mechanical engineering, coding, and teamwork' },
      { id: 'p3', term: 'Kaggle', definition: 'The world’s largest online platform for data science competitions, datasets, and machine learning code' }
    ],
    practice: {
      q: 'What is the primary benefit of participating in high school hackathons and robotics teams?',
      opts: [
        'Building hands-on problem-solving skills, working in collaborative teams under deadlines, and creating portfolio projects',
        'Winning free pizza only',
        'Memorizing computer history dates',
        'Avoiding regular homework forever'
      ],
      correct: 0,
      exp: 'Hands-on competitions develop practical engineering, collaboration, and rapid prototyping capabilities.',
      hint: 'Think about team collaboration and building real working projects.'
    },
    quizzes: [
      {
        q: 'What is Kaggle in the data science community?',
        opts: [
          { text: 'A global platform where data scientists compete to build machine learning models on real-world datasets', isCorrect: true },
          { text: 'A brand of computer keyboards', isCorrect: false }
        ],
        exp: 'Kaggle provides open datasets, benchmarks, and community machine learning competitions.'
      }
    ],
    practicalTask: {
      title: 'Personal STEM Roadmap Blueprint',
      objective: 'Write a 4-year high school extracurricular and coding project roadmap.',
      steps: [
        '1. Year 1: Master Python + Build 3 mini-games.',
        '2. Year 2: Join Robotics / Coding Club + Enter 1 Hackathon.',
        '3. Year 3: Learn Machine Learning (scikit-learn) + Build 1 community project.',
        '4. Year 4: Publish GitHub portfolio + Submit Capstone Project.',
        'Write your personal roadmap in your study journal.'
      ],
      expectedResult: 'You will establish a clear, motivating long-term plan for technological growth.'
    },
    recall: {
      q: 'What is the most effective way to learn programming and AI?',
      a: 'Building real hands-on projects, entering hackathons, and collaborating with teams on open-source code!'
    },
    takeaways: [
      'Combining rigorous math and computer science electives with practical projects builds a standout foundation.',
      'Hackathons and robotics competitions foster rapid problem solving, leadership, and resilience.',
      'Documenting and publishing your learning journey builds an authentic digital portfolio.'
    ]
  },

  'ai career discovery': {
    title: 'AI Career Discovery',
    hook: 'What is the difference between an AI Research Scientist who invents new neural network architectures and an AI Solutions Architect who implements them for companies?',
    goal: 'Explore the full spectrum of modern AI professions: Research Scientist, ML Engineer, NLP Specialist, Computer Vision Engineer, and MLOps Specialist.',
    learnPoints: [
      'Distinguish Research Scientists (inventing SOTA models) from Applied Engineers (building products)',
      'Understand MLOps: the engineering discipline of monitoring, maintaining, and scaling models in production',
      'Learn the technical toolchains: PyTorch, Hugging Face, Docker, Kubernetes, and Weights & Biases'
    ],
    analogy: 'The AI career universe is like space exploration: Research Scientists are the theoretical physicists inventing rocket propulsion formulas, while ML Engineers and MLOps Specialists build and launch the actual rockets to Mars!',
    explanationHtml: `<h3>The Professional AI Ecosystem</h3>
<p>The artificial intelligence industry has matured into distinct, highly specialized professional disciplines:</p>
<h4>1. AI Research Scientist</h4>
<p>Focuses on fundamental algorithmic breakthroughs, mathematical proofs, and publishing papers at top academic conferences (NeurIPS, ICML, CVPR).</p>
<h4>2. MLOps Engineer (Machine Learning Operations)</h4>
<p>Specializes in continuous deployment pipelines, automated model retraining, latency optimization, and monitoring models in cloud clusters.</p>`,
    step1: {
      title: '1. Role Architecture Analysis',
      desc: 'Map technical specializations: Computer Vision vs NLP vs MLOps vs Autonomous Robotics.',
      detail: 'Identifies core competencies for each track.',
      code: 'specializations = {\n    "NLP_Engineer": ["Transformers", "Tokenizers", "PyTorch", "Hugging Face"],\n    "MLOps_Engineer": ["Docker", "Kubernetes", "CI/CD", "Prometheus"]\n}'
    },
    step2: {
      title: '2. Toolchain Mastery',
      desc: 'Practice with industry-standard development frameworks and experiment tracking tools.',
      detail: 'Prepares for production engineering workflows.',
      code: 'import wandb # Weights & Biases experiment tracker\nwandb.init(project="autonomous_vision_model")'
    },
    step3: {
      title: '3. Technical Interview Preparation',
      desc: 'Master data structures, algorithmic complexity (Big-O notation), and systems design.',
      detail: 'Builds analytical interview readiness.',
      code: 'def binary_search(arr, target):\n    # O(log N) logarithmic search complexity\n    pass'
    },
    realScenario: 'An MLOps Engineer at an autonomous drone delivery company set up automated telemetry monitoring that detected when camera vision models began to degrade in foggy coastal weather, triggering automated model re-weighting.',
    useCases: [
      'NLP Engineers fine-tuning Large Language Models for specialized legal and medical document analysis',
      'Computer Vision Engineers developing real-time 60 FPS obstacle detection on embedded drone microchips',
      'MLOps Engineers managing 1,000 GPU cloud clusters running 24/7 continuous training pipelines'
    ],
    simCode: 'role = "Computer Vision Specialist 👁️"\ntoolchain = ["PyTorch", "OpenCV", "CUDA", "TensorRT"]\nprint(f"Role: {role} | Core Stack: {\', \'.join(toolchain)}")',
    simOutput: 'Role: Computer Vision Specialist 👁️ | Core Stack: PyTorch, OpenCV, CUDA, TensorRT',
    pairs: [
      { id: 'p1', term: 'MLOps', definition: 'Machine Learning Operations: the practice of deploying, monitoring, and maintaining AI models reliably in production' },
      { id: 'p2', term: 'Hugging Face', definition: 'The world’s leading open-source hub for sharing pre-trained transformer models and datasets' },
      { id: 'p3', term: 'Big-O Notation', definition: 'A mathematical notation used to describe the time and space complexity of algorithms as inputs grow' }
    ],
    practice: {
      q: 'What is the primary responsibility of an MLOps Engineer?',
      opts: [
        'Deploying, monitoring, scaling, and automating machine learning models in cloud production environments',
        'Selling computers in retail stores',
        'Writing science fiction novels about robots',
        'Drawing circuit board diagrams with colored markers'
      ],
      correct: 0,
      exp: 'MLOps engineers bridge the gap between machine learning model development and scalable cloud operations.',
      hint: 'Look for the role centered on deploying, monitoring, and scaling AI models.'
    },
    quizzes: [
      {
        q: 'What is Hugging Face in the machine learning ecosystem?',
        opts: [
          { text: 'The leading open-source platform for discovering, sharing, and fine-tuning pre-trained transformer models and datasets', isCorrect: true },
          { text: 'A video game about hugging teddy bears', isCorrect: false }
        ],
        exp: 'Hugging Face is the central open-source community platform for natural language processing and modern ML.'
      }
    ],
    practicalTask: {
      title: 'AI Role Comparison Matrix',
      objective: 'Compare the daily responsibilities and primary tools of an AI Researcher vs an MLOps Engineer.',
      steps: [
        '1. AI Researcher: Goal = Discover new algorithms | Primary Tools = Math, PyTorch, arXiv papers.',
        '2. MLOps Engineer: Goal = Deploy & monitor models in production | Primary Tools = Docker, Kubernetes, CI/CD.',
        '3. Compare: How do they collaborate on an engineering team?',
        'Write 1 paragraph explaining how both roles are necessary to build successful AI products.'
      ],
      expectedResult: 'You will gain a professional understanding of industry engineering team structures.'
    },
    recall: {
      q: 'What does MLOps stand for?',
      a: 'Machine Learning Operations: the discipline of deploying, monitoring, and maintaining AI models in cloud production!'
    },
    takeaways: [
      'The AI field offers paths ranging from theoretical research to practical cloud engineering.',
      'MLOps ensures models remain accurate, low-latency, and reliable after deployment.',
      'Familiarity with industry toolchains (PyTorch, Hugging Face, Docker) accelerates career readiness.'
    ]
  },

  'build with genai': {
    title: 'Build with GenAI',
    hook: 'How can you build a complete full-stack AI application in Python that uses an LLM API to summarize daily news, generate an audio podcast, and send an email brief every morning at 7:00 AM?',
    goal: 'Master generative AI application development: API integration, JSON structured outputs, function calling, and building real-world AI tools.',
    learnPoints: [
      'Learn how to integrate LLM REST APIs using Python `requests` or official SDKs',
      'Master JSON Structured Outputs: forcing models to return strict, machine-readable JSON schemas',
      'Understand Function Calling / Tool Use: giving LLMs the ability to run Python code and query live APIs'
    ],
    analogy: 'Calling an LLM API is like hiring a super-smart freelance researcher over the phone: you send them a structured briefing document (Prompt), and they send back a clean, formatted data report (JSON Response)!',
    explanationHtml: `<h3>Building Applications with Generative AI APIs</h3>
<p>Modern software engineering integrates Large Language Models directly into backend applications via REST APIs. Instead of building user interfaces for chatbots, engineers use LLMs as reasoning micro-services.</p>
<h4>The Power of Structured JSON Outputs</h4>
<p>By enforcing a strict JSON schema in your API request, the LLM outputs machine-parseable data rather than conversational banter, enabling database storage and programmatic workflow automation.</p>`,
    step1: {
      title: '1. API Authentication & Payload Construction',
      desc: 'Set up environment variable API keys and construct structured system/user prompt payloads.',
      detail: 'Protects secret API keys.',
      code: 'import os, requests\nAPI_KEY = os.getenv("AI_API_KEY")\nheaders = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}'
    },
    step2: {
      title: '2. Enforcing Strict JSON Schemas',
      desc: 'Instruct the model to return data strictly conforming to a defined JSON dictionary schema.',
      detail: 'Eliminates parsing errors.',
      code: 'payload = {\n    "model": "gpt-4o-mini",\n    "response_format": {"type": "json_object"},\n    "messages": [{"role": "user", "content": "Extract 3 main points as JSON: {points: []}"}]\n}'
    },
    step3: {
      title: '3. Parsing Response & Application Logic',
      desc: 'Parse the returned JSON object and execute application logic (e.g. database insert or email dispatch).',
      detail: 'Integrates model intelligence into production pipelines.',
      code: 'response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)\ndata = response.json()["choices"][0]["message"]["content"]'
    },
    realScenario: 'A student built an automated Python app that reads their school cafeteria weekly lunch menu, uses an LLM API to extract vegetarian options with calorie estimates into a JSON calendar, and sends a notification to their phone every morning.',
    useCases: [
      'Customer support platforms automatically categorizing support tickets into urgency queues',
      'Legal tech platforms extracting contract expiration dates and indemnity clauses into spreadsheets',
      'Travel planning apps generating customized 3-day tourist itineraries with real-time GPS coordinates'
    ],
    simCode: 'api_response = \'{"topic": "Mars Exploration", "summary": "Rover discovered ancient riverbed clay.", "status": "SUCCESS"}\'\nimport json\nparsed = json.loads(api_response)\nprint(f"API Parsed: {parsed[\'topic\']} → {parsed[\'summary\']} ({parsed[\'status\']}) 🚀")',
    simOutput: 'API Parsed: Mars Exploration → Rover discovered ancient riverbed clay. (SUCCESS) 🚀',
    pairs: [
      { id: 'p1', term: 'REST API', definition: 'An architectural interface that allows two software programs to communicate over HTTP using requests and responses' },
      { id: 'p2', term: 'JSON (JavaScript Object Notation)', definition: 'A standard lightweight format for storing and transporting structured data' },
      { id: 'p3', term: 'Function Calling', definition: 'An LLM capability where the model identifies when to execute external code functions and tools' }
    ],
    practice: {
      q: 'Why do software developers instruct LLMs to respond in JSON format instead of conversational text when building applications?',
      opts: [
        'Because JSON structured data can be easily parsed, stored in databases, and processed programmatically by software code',
        'Because JSON is only readable on Sundays',
        'To make the AI speak French',
        'Because conversational text uses too much hard drive space'
      ],
      correct: 0,
      exp: 'JSON provides structured, key-value data formatting that code can validate and manipulate deterministically.',
      hint: 'Think about machine-readable data that code can parse easily.'
    },
    quizzes: [
      {
        q: 'Why should API keys NEVER be hardcoded directly into public GitHub code files?',
        opts: [
          { text: 'Because bots will steal the keys from public repositories, leading to security breaches and massive unauthorized billing charges', isCorrect: true },
          { text: 'Because API keys expire when exposed to sunlight', isCorrect: false }
        ],
        exp: 'API keys must always be loaded from secure environment variables to prevent credential exposure.'
      }
    ],
    practicalTask: {
      title: 'GenAI Recipe Assistant Prototype',
      objective: 'Design a JSON schema and prompt payload for an AI recipe generation tool.',
      steps: [
        '1. Input Ingredients: "Eggs, Spinach, Cheese, Bread".',
        '2. Target JSON Schema: `{"recipe_name": str, "prep_time_mins": int, "steps": [str]}`.',
        '3. Write the complete Python dictionary payload.',
        '4. Explain how code extracts the `prep_time_mins` value.'
      ],
      expectedResult: 'You will master structured JSON prompting for AI application development.'
    },
    recall: {
      q: 'What is the safest way to store API keys in Python projects?',
      a: 'In environment variables using `os.getenv("API_KEY")` with a `.env` file that is never committed to GitHub!'
    },
    takeaways: [
      'Generative AI APIs allow developers to integrate language intelligence into custom software.',
      'JSON structured outputs ensure responses are reliably parseable by backend databases.',
      'Always protect secret API keys using environment variables and `.gitignore` rules.'
    ]
  },

  'ai media studio': {
    title: 'AI Media Studio',
    hook: 'How can an indie film creator generate cinematic 4K video clips, sound effects, and orchestral film scores entirely on a laptop using generative AI?',
    goal: 'Master generative multimedia engineering: text-to-video diffusion (Sora, Runway), audio Foley synthesis, control nets, and cinematic promptcraft.',
    learnPoints: [
      'Understand Text-to-Video Diffusion: temporal consistency, frame latent interpolation, and camera motion prompts',
      'Learn how ControlNets use pose skeletons and edge maps (Canny) to control AI generations precisely',
      'Discover AI audio Foley synthesis for creating custom laser blasts, footsteps, and orchestral scores'
    ],
    analogy: 'Directing an AI Media Studio is like being a Hollywood director with an infinite digital backlot: you describe the camera pan, the lighting mood, and the orchestral strings, and the AI renders the scene!',
    explanationHtml: `<h3>The Generative Media Production Studio</h3>
<p>Generative video and audio models have unlocked high-production-value multimedia creation for independent creators. Using <strong>Temporal Latent Diffusion</strong> and <strong>ControlNets</strong>, creators control character poses, camera angles, and soundtrack timing with precision.</p>`,
    step1: {
      title: '1. Cinematic Promptcraft & Camera Directives',
      desc: 'Specify shot composition: camera lens (35mm anamorphic), lighting (Golden hour volumetric), and camera motion (Drone orbiting pan).',
      detail: 'Directs temporal video models.',
      code: 'video_prompt = "Cinematic drone shot orbiting an ancient mossy stone temple, golden hour sunlight, 35mm lens, 4k resolution"'
    },
    step2: {
      title: '2. Pose & Edge Control via ControlNet',
      desc: 'Use human pose skeleton wireframes (OpenPose) or Canny edge maps to lock character movement.',
      detail: 'Eliminates flickering and body warping.',
      code: 'control_settings = {"preprocessor": "openpose", "guidance_scale": 7.5, "control_weight": 0.85}'
    },
    step3: {
      title: '3. Audio Foley & Soundtrack Synthesis',
      desc: 'Generate matching ambient environmental audio (wind rustling through leaves) and dynamic musical score.',
      detail: 'Produces multi-track synchronized audio.',
      code: 'ambient_audio = audio_diffusion.generate("Wind rustling in pine trees, distant temple bells")'
    },
    realScenario: 'A group of middle school students produced a 3-minute sci-fi short film about space explorers. They used generative video for alien planet backdrops, AI Foley for spaceship engines, and won the Youth Film Showcase.',
    useCases: [
      'Independent video game developers generating hundreds of custom sound effects and ambient soundtracks',
      'Architectural firms creating photorealistic virtual walkthrough videos of proposed sustainable buildings',
      'Educators generating historical reconstruction animations of ancient Rome and Alexandria'
    ],
    simCode: 'scene = "Ancient Cyber Temple"\nstatus = "Video: 24 FPS Temporal Consistency ✅ | Audio: Binaural Ambient Foley Synced 🎧"\nprint(f"Production Studio: {scene} → {status}")',
    simOutput: 'Production Studio: Ancient Cyber Temple → Video: 24 FPS Temporal Consistency ✅ | Audio: Binaural Ambient Foley Synced 🎧',
    pairs: [
      { id: 'p1', term: 'Temporal Consistency', definition: 'Ensuring that objects and characters remain identical and smooth across consecutive video animation frames' },
      { id: 'p2', term: 'ControlNet', definition: 'A neural network structure that allows precise spatial control over image/video generation using pose skeletons and edge maps' },
      { id: 'p3', term: 'Audio Foley', definition: 'Creating realistic everyday sound effects (footsteps, opening doors, wind) to synchronize with video scenes' }
    ],
    practice: {
      q: 'What is the purpose of using a ControlNet (like OpenPose) when generating video with AI?',
      opts: [
        'To force the generated character to follow exact human pose skeletons and movements without warping or flickering across frames',
        'To turn the video black and white',
        'To delete sound from the video',
        'To make the video render on a phone only'
      ],
      correct: 0,
      exp: 'ControlNet conditions diffusion models on structural wireframes, ensuring consistent anatomy and poses.',
      hint: 'Think about controlling human poses and preventing body warping.'
    },
    quizzes: [
      {
        q: 'What does "Temporal Consistency" mean in generative video?',
        opts: [
          { text: 'Ensuring characters, lighting, and objects stay stable and smooth from frame to frame without flickering or morphing into other shapes', isCorrect: true },
          { text: 'Making the video exactly 10 minutes long', isCorrect: false }
        ],
        exp: 'Temporal consistency maintains visual coherence across the time dimension in video generation.'
      }
    ],
    practicalTask: {
      title: 'Cinematic Shot Director Blueprint',
      objective: 'Write a professional cinematic prompt with 4 specific camera and lighting parameters.',
      steps: [
        '1. Subject: A robotic rover exploring an icy cavern on Europa.',
        '2. Camera Shot: Low-angle tracking shot moving forward slowly.',
        '3. Lighting: Bioluminescent blue ice reflections with warm rover headlights.',
        '4. Sound Directive: Describe the matching audio Foley (crunching ice, humming motor).',
        'Format as a complete cinematic director brief.'
      ],
      expectedResult: 'You will master professional multimodal directing for generative video production.'
    },
    recall: {
      q: 'What is ControlNet in generative art?',
      a: 'A tool that uses pose skeletons and wireframes to give creators exact spatial control over AI images and videos!'
    },
    takeaways: [
      'Generative video combines spatial diffusion with temporal latent consistency.',
      'ControlNets provide precise control over poses, edges, and character continuity.',
      'Multimodal creators combine video, voice synthesis, and audio Foley into complete productions.'
    ]
  },

  'deepfake alert!': {
    title: 'Deepfake Alert!',
    hook: 'How can an AI generative adversarial network (GAN) fabricate a live video interview of a CEO that fools facial recognition algorithms and news anchors?',
    goal: 'Master advanced deepfake forensics: face swapping GANs, temporal flicker analysis, biometric pulse extraction, and legal/ethical regulations.',
    learnPoints: [
      'Learn how Generative Adversarial Networks (GANs) and Diffusion Models synthesize photorealistic faces',
      'Understand Remote Photoplethysmography (rPPG): detecting real human blood pulse micro-color changes in skin pixels',
      'Explore legal frameworks (EU AI Act, deepfake laws) and digital media authentication standards (C2PA)'
    ],
    analogy: 'Detecting advanced deepfakes is like checking for a biological heartbeat: a synthetic AI video face might look real on the surface, but underneath the pixels, it lacks the microscopic rhythmic pulse of blood flowing through real human skin!',
    explanationHtml: `<h3>The Science of Deepfake Forensics</h3>
<p>Deepfakes are synthesized using <strong>Generative Adversarial Networks (GANs)</strong> or video diffusion pipelines. Forensic investigators use advanced computer vision techniques to authenticate authentic human recordings.</p>
<h4>Biological Liveness Detection (rPPG)</h4>
<p>When a real human heart beats, blood surges through facial capillaries, causing imperceptible, rhythmic color changes in the red/green video spectrum. AI-generated deepfakes have static pixel textures and lack this biological blood pulse signal!</p>`,
    step1: {
      title: '1. Remote Biological Pulse Extraction (rPPG)',
      desc: 'Extract average green-channel facial skin pixel intensity over time and perform Fast Fourier Transform (FFT) analysis.',
      detail: 'Real humans display clear 60-100 BPM heart peaks; synthetic deepfakes display flat noise.',
      code: 'skin_pixels = extract_facial_roi(video_frames)\npulse_spectrum = scipy.fft.fft(skin_pixels[:, 1]) # Green channel\nif not has_biological_heartbeat_peak(pulse_spectrum):\n    flag_deepfake_alert()'
    },
    step2: {
      title: '2. Temporal Facial Landmark Consistency',
      desc: 'Track 68 facial landmark coordinates (pupils, nostrils, lip corners) across frames.',
      detail: 'Deepfakes exhibit micro-jitter and warping across rapid head turns.',
      code: 'landmarks = face_mesh.track(video_frames)\njitter_score = compute_temporal_variance(landmarks)'
    },
    step3: {
      title: '3. C2PA Cryptographic Provenance Verification',
      desc: 'Inspect the cryptographic metadata manifest embedded in media files by certified cameras.',
      detail: 'Verifies hardware sensor origin and edits.',
      code: 'is_authentic = c2pa_verifier.validate_manifest(video_file)'
    },
    realScenario: 'A cyber forensics team investigated a viral video claiming a company executive announced bankruptcy. The team ran rPPG biological pulse extraction, found zero cardiac pulse signal in the facial pixels, and proved within 15 minutes that the video was a synthetic deepfake, preventing market panic.',
    useCases: [
      'Elections commissions monitoring viral political videos for synthetic disinformation',
      'Financial institutions using biometric liveness detection to block banking login fraud',
      'News organizations authenticating citizen journalism footage from conflict zones'
    ],
    simCode: 'video_analysis = {"cardiac_pulse_detected": False, "landmark_jitter": 0.88, "c2pa_signature": "NONE"}\nif not video_analysis["cardiac_pulse_detected"] and video_analysis["landmark_jitter"] > 0.70:\n    print("🚨 DEEPFAKE DETECTED: Synthetic Face Swap (Zero Biological Pulse + High Jitter)")',
    simOutput: '🚨 DEEPFAKE DETECTED: Synthetic Face Swap (Zero Biological Pulse + High Jitter)',
    pairs: [
      { id: 'p1', term: 'rPPG (Remote PPG)', definition: 'Detecting real human heartbeats by analyzing microscopic color changes in facial skin pixels across video frames' },
      { id: 'p2', term: 'GAN (Generative Adversarial Network)', definition: 'A dual neural network architecture where a Generator creates fakes and a Discriminator tries to catch them' },
      { id: 'p3', term: 'C2PA Manifest', definition: 'An open technical standard that cryptographically signs media files with details about how and when they were made' }
    ],
    practice: {
      q: 'How does Remote Photoplethysmography (rPPG) allow forensics software to catch deepfake videos?',
      opts: [
        'It detects the rhythmic microscopic blood color pulses present in real human faces; synthetic deepfakes lack this biological heartbeat signal',
        'It calls the police automatically',
        'It checks if the video file has an MP4 extension',
        'It turns the video audio up to maximum volume'
      ],
      correct: 0,
      exp: 'rPPG extracts biological cardiac waveforms from video skin pixels, exposing synthetic faces that lack blood circulation.',
      hint: 'Think about detecting real human heartbeats in video pixels.'
    },
    quizzes: [
      {
        q: 'What is the role of the "Discriminator" in a Generative Adversarial Network (GAN)?',
        opts: [
          { text: 'To evaluate generated synthetic samples and classify whether they are real training images or fakes created by the Generator', isCorrect: true },
          { text: 'To format computer hard drives', isCorrect: false }
        ],
        exp: 'The discriminator acts as an adversarial critic, pushing the generator to produce increasingly photorealistic outputs.'
      }
    ],
    practicalTask: {
      title: 'Forensic Video Verification Protocol',
      objective: 'Map the 3-step forensic verification process for authenticating breaking news video.',
      steps: [
        '1. Step 1: Check metadata provenance (C2PA signature & recording timestamp).',
        '2. Step 2: Biological liveness audit (rPPG blood pulse & natural eye blinking).',
        '3. Step 3: Source verification (Corroborate with verified journalists on the ground).',
        'Write 2 sentences explaining why technical audits must be combined with journalistic corroboration.'
      ],
      expectedResult: 'You will master state-of-the-art synthetic media verification methodologies.'
    },
    recall: {
      q: 'What is rPPG biological liveness detection in video forensics?',
      a: 'Analyzing microscopic skin color changes to detect whether a face has a real human heartbeat!'
    },
    takeaways: [
      'Deepfakes are created using GANs and diffusion models that swap or synthesize realistic facial video.',
      'Forensic software detects deepfakes through rPPG biological heartbeat signals and temporal landmark jitter.',
      'Cryptographic provenance standards (C2PA) establish transparent chains of custody for authentic media.'
    ]
  },

  'your data, your right': {
    title: 'Your Data, Your Right',
    hook: 'Did you know that under modern privacy laws (like GDPR and CCPA), you have the legal right to demand that any tech company delete all personal data they have ever collected about you?',
    goal: 'Understand data privacy laws, digital rights, the Right to be Forgotten, algorithmic transparency, and ethical digital autonomy.',
    learnPoints: [
      'Understand global data privacy regulations: GDPR (Europe), CCPA (California), DPDP Act (India)',
      'Learn core digital rights: Right of Access, Right to Rectification, Right to Erasure (To Be Forgotten)',
      'Understand Privacy by Design: building software that minimizes data collection by default'
    ],
    analogy: 'Your personal data rights are like having an unbreakable master key to your own digital house: companies can only visit if you invite them in, and you can tell them to pack their bags and leave whenever you choose!',
    explanationHtml: `<h3>Digital Rights & The Law in the AI Era</h3>
<p>In response to mass corporate data tracking, governments around the world have enacted comprehensive data protection laws (such as Europe's <strong>GDPR</strong> and the <strong>DPDP Act</strong>). These laws give every citizen legal ownership over their digital identity.</p>
<h4>Fundamental Digital Rights</h4>
<ul>
  <li><strong>1. Right to Access (Subject Access Request):</strong> You can demand a complete download of every piece of data a company holds about you.</li>
  <li><strong>2. Right to Erasure ("Right to be Forgotten"):</strong> You have the legal right to require platforms to permanently delete your personal records and history.</li>
  <li><strong>3. Right to Opt-Out of Automated Profiling:</strong> You can refuse to let automated AI algorithms make legal or financial decisions without human review.</li>
</ul>`,
    step1: {
      title: '1. Subject Access Request (SAR) Automation',
      desc: 'Users trigger automated data export pipelines that bundle their profile into a downloadable zip file.',
      detail: 'Mandated by law within 30 days.',
      code: 'user_data_export = generate_user_data_dump(user_id="U9912")\n# Exports: search_history.json, location_logs.json, messages.json'
    },
    step2: {
      title: '2. Cryptographic Right to Erasure (Data Purge)',
      desc: 'Cascade database deletions across all distributed database shards and cache clusters.',
      detail: 'Ensures irreversible, permanent deletion.',
      code: 'def execute_right_to_be_forgotten(user_id):\n    db.delete_user_records(user_id)\n    log_compliance_certificate(user_id)'
    },
    step3: {
      title: '3. Privacy by Design Architecture',
      desc: 'Design databases that anonymize IP addresses and delete location logs after 24 hours automatically.',
      detail: 'Data minimization protects users by default.',
      code: 'anonymized_ip = hash_ip_with_salt(raw_ip)\nset_auto_expire_ttl(location_data, days=1)'
    },
    realScenario: 'A user noticed an online shopping service was recommending products based on searches they did 3 years ago. The user exercised their GDPR Right to Erasure, requested account deletion, and the company purged all historical tracking records within 48 hours.',
    useCases: [
      'Citizens downloading complete data archives from social networks to inspect tracking records',
      'Healthcare apps implementing Privacy by Design to encrypt patient records on device before cloud sync',
      'Educational platforms automatically deleting student homework logs upon school graduation'
    ],
    simCode: 'user_request = "RIGHT_TO_BE_FORGOTTEN"\nif user_request == "RIGHT_TO_BE_FORGOTTEN":\n    print("🗑️ Database Purge Initiated: User data permanently erased across all servers.")\n    print("📜 Compliance Certificate Generated: GDPR / CCPA Validated ✅")',
    simOutput: '🗑️ Database Purge Initiated: User data permanently erased across all servers.\n📜 Compliance Certificate Generated: GDPR / CCPA Validated ✅',
    pairs: [
      { id: 'p1', term: 'GDPR', definition: 'The European General Data Protection Regulation, the world’s landmark law protecting personal privacy and digital rights' },
      { id: 'p2', term: 'Right to be Forgotten', definition: 'The legal right of individuals to have their personal data completely erased from commercial databases' },
      { id: 'p3', term: 'Privacy by Design', definition: 'An engineering approach where privacy and data minimization are built into software from the very first line of code' }
    ],
    practice: {
      q: 'What is the "Right to Erasure" (Right to be Forgotten) under data privacy laws like GDPR?',
      opts: [
        'The legal right of citizens to demand that a company permanently delete all their personal data and tracking history',
        'The right to erase computer memory with a magnet',
        'The right to turn off your phone screen',
        'The right to get free computer hardware'
      ],
      correct: 0,
      exp: 'The Right to Erasure legally requires organizations to delete personal identifying records upon user request.',
      hint: 'Think about legally demanding that a company delete your personal data.'
    },
    quizzes: [
      {
        q: 'What does "Privacy by Design" mean for software engineers?',
        opts: [
          { text: 'Designing systems that collect only the minimum necessary data, encrypt it by default, and protect user privacy from the start', isCorrect: true },
          { text: 'Designing computer cases with secret locked doors', isCorrect: false }
        ],
        exp: 'Privacy by design integrates data minimization and security directly into software architecture.'
      }
    ],
    practicalTask: {
      title: 'Privacy Policy Audit Exercise',
      objective: 'Inspect a popular website’s privacy policy and identify 3 key data rights.',
      steps: [
        '1. Find the "Privacy Policy" link at the bottom of an educational website.',
        '2. Identify: What data does it collect? (e.g. Email, Cookies, Device IP).',
        '3. Identify: How can a user request data deletion?',
        'Write 2 sentences explaining why data rights protect digital democracy.'
      ],
      expectedResult: 'You will understand how legal data frameworks empower you as an autonomous digital citizen.'
    },
    recall: {
      q: 'What are your core digital data rights?',
      a: 'The Right to Access your data, the Right to Correct errors, and the Right to have your data permanently deleted (Right to Erasure)!'
    },
    takeaways: [
      'Global privacy laws (GDPR, CCPA, DPDP) grant legal ownership of personal data back to citizens.',
      'You have the legal right to download your data and demand permanent deletion (Right to be Forgotten).',
      'Privacy by Design ensures modern software minimizes data collection and protects human dignity.'
    ]
  }
}
