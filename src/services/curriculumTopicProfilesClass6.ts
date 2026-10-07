// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: MIDDLE SCHOOL (CLASSES 6, 7, 8)
// 36 Distinct, authentic educational profiles for ages 11-14
// Algorithmic Foundations, Python Coding, Data Logic & Ethical Reasoning
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS6_TOPIC_PROFILES: Record<string, TopicProfile> = {
  // ═════════════════════════════════════════════════════════════════════════════
  // CLASS 6 TOPICS (12 Topics)
  // ═════════════════════════════════════════════════════════════════════════════
  'how machines get smart': {
    title: 'How Machines Get Smart',
    hook: 'How can a spam filter read 1 billion incoming emails a day and catch 99.9% of junk messages without a single human reading your private mail?',
    goal: 'Understand the mathematical foundations of machine learning: feature extraction, statistical correlation, and weight updates.',
    learnPoints: [
      'Learn how text and images are converted into numerical feature vectors',
      'Understand how correlation and loss calculation allow models to minimize error',
      'Distinguish rule-based expert systems from statistical machine learning models'
    ],
    analogy: 'Teaching an AI is like tuning a 100-string guitar: every time it hits a sour note (mistake), it slightly tightens or loosens each string (weight) until every chord sounds harmonious!',
    explanationHtml: `<h3>From Static Rules to Statistical Weights</h3>
<p>Early computers relied on hardcoded rule engines: <code>IF email contains "FREE PRIZE" THEN mark spam</code>. But spammers quickly adapted by writing <em>"F-R-E-E P-R-I-Z-E"</em>. Modern AI models get smart by converting words into numerical vector frequencies (TF-IDF and embeddings) and computing Bayesian probabilities.</p>`,
    step1: {
      title: '1. Numerical Vectorization',
      desc: 'Text words and image pixels are transformed into floating point feature arrays.',
      detail: 'Computers calculate with numbers, not raw words.',
      code: 'feature_vector = vectorize_text("Claim your prize today!")\n# Output: [0.82, 0.95, 0.12, 0.77]'
    },
    step2: {
      title: '2. Forward Pass & Probability Scoring',
      desc: 'The neural network computes dot products across trained weight matrices.',
      detail: 'Generates a spam probability between 0.0 and 1.0.',
      code: 'spam_prob = sigmoid(np.dot(weights, feature_vector) + bias)\n# Output: 0.94'
    },
    step3: {
      title: '3. Loss Calculation & Backpropagation',
      desc: 'If the prediction is incorrect, the error loss is calculated and weights are adjusted.',
      detail: 'Reduces future error across all similar patterns.',
      code: 'loss = calculate_cross_entropy(prediction, actual_label)\nweights -= learning_rate * compute_gradient(loss)'
    },
    realScenario: 'A cybersecurity firm deployed a machine learning spam classifier trained on 50 million emails. The model detected brand-new phishing variations with 99.4% accuracy, blocking malware before employees clicked malicious links.',
    useCases: [
      'Email servers filtering billions of spam messages and malware attachments daily',
      'Bank credit card fraud systems detecting stolen cards in 30 milliseconds',
      'Content recommendation algorithms analyzing user video watch patterns'
    ],
    simCode: 'email_words = ["prize", "claim", "urgent", "click"]\nspam_score = sum([0.25 for w in email_words if w in ["prize", "claim", "urgent", "click"]])\nprint(f"Spam Probability: {spam_score * 100:.0f}% → Action: Move to Junk 🗑️")',
    simOutput: 'Spam Probability: 100% → Action: Move to Junk 🗑️',
    pairs: [
      { id: 'p1', term: 'Feature Vector', definition: 'A list of numerical measurements representing text or images for machine learning' },
      { id: 'p2', term: 'Weight Matrix', definition: 'The learned numerical parameters that determine the importance of each feature' },
      { id: 'p3', term: 'Loss Function', definition: 'A mathematical formula that measures how far off the AI prediction was from the truth' }
    ],
    practice: {
      q: 'Why do modern computers convert words and images into numerical vectors before processing them?',
      opts: [
        'Because computer processors perform mathematical matrix operations on numbers, not abstract human concepts',
        'Because numbers look cooler on screens',
        'Because letters take up 1,000 times more hard drive space',
        'Because keyboards only type numbers'
      ],
      correct: 0,
      exp: 'Machine learning algorithms rely on linear algebra, dot products, and vector arithmetic.',
      hint: 'Think about what mathematical operations computer microprocessors execute.'
    },
    quizzes: [
      {
        q: 'What happens during "Weight Updates" in machine learning?',
        opts: [
          { text: 'The model slightly adjusts its mathematical parameters to reduce errors on future predictions', isCorrect: true },
          { text: 'The computer becomes physically heavier on the desk', isCorrect: false }
        ],
        exp: 'Gradient descent updates model weights to minimize the loss function.'
      }
    ],
    practicalTask: {
      title: 'Spam Feature Matrix Lab',
      objective: 'Assign feature weights to 4 words and compute the spam risk score for a sample email message.',
      steps: [
        '1. Words & Weights: "Urgent" (0.3), "Winner" (0.4), "Meeting" (-0.3), "Tomorrow" (-0.2).',
        '2. Email: "Urgent winner meeting tomorrow".',
        '3. Calculate score: 0.3 + 0.4 - 0.3 - 0.2 = 0.2.',
        '4. Explain why the legitimate words lowered the spam score.'
      ],
      expectedResult: 'You will experience how linear classifiers balance positive and negative feature weights.'
    },
    recall: {
      q: 'How do machines get smart?',
      a: 'By converting data into numerical vectors, making predictions, and updating mathematical weights based on error loss!'
    },
    takeaways: [
      'Machine learning turns real-world words and pixels into numerical feature vectors.',
      'Models learn through continuous weight adjustments driven by loss functions.',
      'Statistical pattern recognition enables software to adapt to new variations without rewriting rules.'
    ]
  },

  'learning from examples': {
    title: 'Learning from Examples',
    hook: 'If you want an AI to distinguish between poisonous mushrooms and delicious edible mushrooms, how many examples does it need to see?',
    goal: 'Understand dataset curation, training/testing splits, overfitting, underfitting, and generalization in machine learning.',
    learnPoints: [
      'Learn how datasets are split into Training (80%) and Testing (20%) sets',
      'Understand Overfitting: when a model memorizes training noise instead of general patterns',
      'Understand Underfitting: when a model is too simple to capture the underlying pattern'
    ],
    analogy: 'Training an AI is like studying for a math exam: if you just memorize the exact homework numbers (Overfitting), you will fail when the teacher changes the numbers on the test!',
    explanationHtml: `<h3>The Science of Generalization</h3>
<p>The ultimate goal of machine learning is <strong>Generalization</strong>—the ability of a model to perform accurately on brand new, unseen data that was never part of its training set.</p>
<h4>Train vs. Test Split</h4>
<p>To verify that an AI has truly learned concepts rather than just memorized answers, data scientists split datasets into a <strong>Training Set</strong> (used to learn weights) and a <strong>Test Set</strong> (held back as an unseen exam).</p>`,
    step1: {
      title: '1. Dataset Partitioning (80/20 Split)',
      desc: 'Randomly partition 10,000 samples into 8,000 training and 2,000 testing instances.',
      detail: 'Prevents data leakage into the test evaluation.',
      code: 'from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)'
    },
    step2: {
      title: '2. Model Fitting & Loss Monitoring',
      desc: 'Train the classifier while tracking training error and validation loss curves.',
      detail: 'Early stopping prevents overfitting.',
      code: 'model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=50)'
    },
    step3: {
      title: '3. Generalization Metric Evaluation',
      desc: 'Evaluate model accuracy, precision, and recall on the unseen test set.',
      detail: 'True test accuracy reflects real-world performance.',
      code: 'test_acc = model.score(X_test, y_test)\nprint(f"Unseen Test Generalization Accuracy: {test_acc * 100:.2f}%")'
    },
    realScenario: 'A botanical research institute trained a plant classifier on 20,000 leaf images. When tested on brand new forest leaves taken in different lighting, the model achieved 97.8% accuracy because it avoided overfitting.',
    useCases: [
      'Agriculture drones identifying invasive weed species in crop fields',
      'Autonomous vehicles recognizing pedestrian hand signals across different seasons',
      'Medical diagnostics classifying skin lesions across diverse skin tones'
    ],
    simCode: 'train_accuracy = 99.4 # High training score\ntest_accuracy = 96.8 # Strong generalization\nif train_accuracy - test_accuracy < 5.0:\n    print("✅ Model Well-Trained: Excellent Generalization, No Overfitting!")',
    simOutput: '✅ Model Well-Trained: Excellent Generalization, No Overfitting!',
    pairs: [
      { id: 'p1', term: 'Overfitting', definition: 'When an AI memorizes specific training data quirks and fails on new unseen examples' },
      { id: 'p2', term: 'Generalization', definition: 'The ability of a model to make accurate predictions on completely new data' },
      { id: 'p3', term: 'Test Set', definition: 'A portion of data kept secret from the AI during training to test its real accuracy' }
    ],
    practice: {
      q: 'Why do data scientists keep a separate "Test Set" of data that the AI is never allowed to see during training?',
      opts: [
        'To test whether the model has truly learned general patterns or just memorized the training examples',
        'To save hard drive storage space',
        'Because computers can only read 80% of files at once',
        'To hide mistakes from the client'
      ],
      correct: 0,
      exp: 'Test sets measure true generalization performance on unseen real-world data.',
      hint: 'Think about taking an exam with questions you haven’t seen before.'
    },
    quizzes: [
      {
        q: 'What is "Overfitting" in machine learning?',
        opts: [
          { text: 'When a model memorizes training noise so tightly that it performs poorly on new, unseen data', isCorrect: true },
          { text: 'When a computer case is too small for its motherboard', isCorrect: false }
        ],
        exp: 'Overfitting occurs when high-variance models fit noise instead of underlying signals.'
      }
    ],
    practicalTask: {
      title: 'Overfitting Diagnosis Lab',
      objective: 'Analyze two models and determine which one is overfitted.',
      steps: [
        'Model A: Train Accuracy 99.9%, Test Accuracy 62.1%.',
        'Model B: Train Accuracy 94.2%, Test Accuracy 93.8%.',
        'Identify which model is overfitted (Model A).',
        'Explain why Model B is superior for real-world deployment.'
      ],
      expectedResult: 'You will understand how to evaluate generalization gap in machine learning.'
    },
    recall: {
      q: 'What is the difference between training data and test data?',
      a: 'Training data is used by the AI to learn patterns; test data is held back to evaluate real-world accuracy!'
    },
    takeaways: [
      'Machine learning models must generalize to unseen data, not just memorize training samples.',
      'Overfitting occurs when a model learns training noise; underfitting occurs when it is too simple.',
      'Splitting data into 80% training and 20% testing provides an honest benchmark of AI performance.'
    ]
  },

  'think → plan → code': {
    title: 'Think → Plan → Code',
    hook: 'Why do master software architects spend 70% of their time drawing diagrams with pen and paper before writing a single line of code?',
    goal: 'Master computational thinking decomposition: breaking complex problems into algorithms, flowcharts, and pseudocode before implementation.',
    learnPoints: [
      'Master the 4 pillars of Computational Thinking: Decomposition, Pattern Recognition, Abstraction, Algorithm Design',
      'Learn flowchart standard symbols: Start/End, Process, Decision, Input/Output',
      'Write robust structured pseudocode before coding in Python'
    ],
    analogy: 'Coding without planning is like building a bridge by throwing bricks into the river: you need blueprints and structural calculations first so the bridge stands strong for 100 years!',
    explanationHtml: `<h3>The 4 Pillars of Computational Thinking</h3>
<p>Professional programmers never open an IDE and start typing blindly. They apply computational thinking:</p>
<ul>
  <li><strong>1. Decomposition:</strong> Breaking a massive problem into bite-sized sub-tasks.</li>
  <li><strong>2. Pattern Recognition:</strong> Spotting recurring similarities with previously solved challenges.</li>
  <li><strong>3. Abstraction:</strong> Filtering out irrelevant clutter to focus strictly on core logic.</li>
  <li><strong>4. Algorithm Design:</strong> Writing step-by-step instructions (pseudocode) to solve the problem.</li>
</ul>`,
    step1: {
      title: '1. Problem Decomposition & Abstraction',
      desc: 'Break the project into 3 distinct functional modules: Input, Logic Engine, and Presentation.',
      detail: 'Simplifies complex architectures.',
      code: '# Architecture Modules:\n# 1. read_sensor_inputs()\n# 2. compute_safety_thresholds()\n# 3. render_dashboard()'
    },
    step2: {
      title: '2. Flowcharting Decision Trees',
      desc: 'Draw diamond decision nodes for boundary conditions and loops.',
      detail: 'Identifies potential deadlocks before coding.',
      code: '# Pseudocode:\n# IF temperature > 100:\n#     activate_cooling_fans()\n# ELSE:\n#     maintain_idle_state()'
    },
    step3: {
      title: '3. Implementation & Modular Unit Testing',
      desc: 'Translate verified pseudocode into clean Python functions with docstrings.',
      detail: 'Test each function independently.',
      code: 'def activate_cooling(temp_celsius: float) -> str:\n    if temp_celsius > 100.0:\n        return "FANS_HIGH_SPEED"\n    return "FANS_OFF"'
    },
    realScenario: 'A student coding team planned an automated school bell schedule. By drawing a flowchart first, they spotted that holidays were scheduled to ring at 8:00 AM, fixed the logic in pseudocode, and wrote bug-free Python.',
    useCases: [
      'Rocket engineers planning orbital trajectory calculations before flight software compilation',
      'Game studios planning multiplayer inventory synchronization protocols',
      'Banking software architects designing transaction rollback pipelines'
    ],
    simCode: 'plan = ["1. Decompose problem 🧩", "2. Map Flowchart 📐", "3. Write Pseudocode 📝", "4. Code in Python 🐍"]\nfor step in plan:\n    print(step)',
    simOutput: '1. Decompose problem 🧩\n2. Map Flowchart 📐\n3. Write Pseudocode 📝\n4. Code in Python 🐍',
    pairs: [
      { id: 'p1', term: 'Decomposition', definition: 'Breaking down a complex problem into smaller, manageable sub-problems' },
      { id: 'p2', term: 'Abstraction', definition: 'Focusing on essential details while ignoring irrelevant information' },
      { id: 'p3', term: 'Pseudocode', definition: 'Plain English algorithmic steps structured like programming code' }
    ],
    practice: {
      q: 'What is the first step in the "Think → Plan → Code" methodology?',
      opts: [
        'Decomposing the problem and identifying essential requirements before writing code',
        'Opening a code editor and typing random keywords',
        'Copying code from a website without reading it',
        'Buying a new monitor'
      ],
      correct: 0,
      exp: 'Decomposition and requirement analysis form the essential foundation of computational problem-solving.',
      hint: 'Think about breaking the problem down before coding.'
    },
    quizzes: [
      {
        q: 'What shape represents a Decision (IF/THEN) in standard flowchart diagrams?',
        opts: [
          { text: 'A Diamond shape 🔶', isCorrect: true },
          { text: 'A Circle', isCorrect: false },
          { text: 'A Star', isCorrect: false }
        ],
        exp: 'Diamonds represent decision branching in standard flowchart notation.'
      }
    ],
    practicalTask: {
      title: 'ATM Cash Withdrawal Algorithm Blueprint',
      objective: 'Write pseudocode for an ATM cash withdrawal machine with 2 conditional security checks.',
      steps: [
        '1. Step 1: Input PIN and check IF PIN is correct.',
        '2. Step 2: Input amount and check IF balance >= amount.',
        '3. Step 3: Dispense cash and deduct balance.',
        '4. Step 4: Handle failure cases (Wrong PIN, Insufficient Funds).'
      ],
      expectedResult: 'You will master structured pseudocode and edge-case handling.'
    },
    recall: {
      q: 'What are the 4 pillars of Computational Thinking?',
      a: 'Decomposition, Pattern Recognition, Abstraction, and Algorithm Design!'
    },
    takeaways: [
      'Planning and pseudocode save hours of debugging time and prevent architectural failures.',
      'Decomposition breaks overwhelming problems into simple, manageable building blocks.',
      'Flowcharts visually reveal decision branches, loops, and edge cases before code implementation.'
    ]
  },

  'coding made friendly': {
    title: 'Coding Made Friendly',
    hook: 'Why is Python considered the world’s most popular programming language for artificial intelligence, data science, and web development?',
    goal: 'Learn foundational Python programming syntax: variables, data types, clean indentation, comments, and readable code design.',
    learnPoints: [
      'Understand core Python data types: Strings, Integers, Floats, Booleans',
      'Learn the power of variables, dynamic typing, and readable snake_case naming',
      'Understand how Python whitespace indentation enforces clean, organized code blocks'
    ],
    analogy: 'Writing Python code is like writing in clear English with mathematical superpowers: instead of cryptic symbols, it uses clean words like `if`, `in`, `for`, and `print`!',
    explanationHtml: `<h3>Why Python Powers the AI Revolution</h3>
<p>Python was created with a central philosophy: <strong>Readability Counts</strong>. Unlike languages that require curly braces <code>{}</code> and semicolons <code>;</code> on every line, Python uses clean indentation (4 spaces) to organize code blocks.</p>
<h4>Core Data Types in Python</h4>
<ul>
  <li><code>str</code> (String): Text enclosed in quotes (e.g. <code>"Autonomous Rover"</code>).</li>
  <li><code>int</code> (Integer): Whole numbers (e.g. <code>42</code>).</li>
  <li><code>float</code> (Floating Point): Decimal numbers (e.g. <code>3.14159</code>).</li>
  <li><code>bool</code> (Boolean): Truth values (<code>True</code> or <code>False</code>).</li>
</ul>`,
    step1: {
      title: '1. Declaring Variables & Types',
      desc: 'Store values in descriptive, snake_case variable names.',
      detail: 'Python dynamically infers data types.',
      code: 'robot_name = "Perseverance"\nspeed_kmh = 0.16\nbattery_percent = 92\nis_active = True'
    },
    step2: {
      title: '2. Formatted String Interpolation (f-strings)',
      desc: 'Inject variables cleanly into output strings using modern f-string syntax.',
      detail: 'Creates readable terminal logs.',
      code: 'status_report = f"Rover {robot_name} moving at {speed_kmh} km/h | Battery: {battery_percent}%"\nprint(status_report)'
    },
    step3: {
      title: '3. Functions & Modular Reusability',
      desc: 'Define reusable code blocks with the `def` keyword and type hints.',
      detail: 'Encapsulates logic for modular computing.',
      code: 'def calculate_travel_time(distance_km: float, speed_kmh: float) -> float:\n    """Calculate travel time in hours."""\n    return distance_km / speed_kmh'
    },
    realScenario: 'A student wrote a 10-line Python script that calculated their weekly study hours, converted them into gamified XP points, and generated a colorful progress bar in the terminal.',
    useCases: [
      'NASA using Python scripts to process James Webb Space Telescope telemetry',
      'Netflix using Python algorithms for backend recommendation services',
      'OpenAI and Google building neural network frameworks (PyTorch, TensorFlow) in Python'
    ],
    simCode: 'hero = "Ada"\nxp = 250\nlevel = xp // 100\nprint(f"Player: {hero} 🛡️ | XP: {xp} ⭐ | Level: {level} 🏆")',
    simOutput: 'Player: Ada 🛡️ | XP: 250 ⭐ | Level: 2 🏆',
    pairs: [
      { id: 'p1', term: 'Variable', definition: 'A labeled memory container that stores data values in a program' },
      { id: 'p2', term: 'f-string', definition: 'A clean Python syntax for embedding variables inside text strings (e.g. f"Score: {score}")' },
      { id: 'p3', term: 'Indentation', definition: 'The 4-space whitespace margin used by Python to define code blocks' }
    ],
    practice: {
      q: 'Which of the following is a valid integer variable declaration in Python?',
      opts: [
        'student_score = 95',
        'student_score = "95"',
        'student_score = 95.5',
        'int student_score = 95;'
      ],
      correct: 0,
      exp: '`student_score = 95` assigns a whole number (integer) without quotes.',
      hint: 'Look for the variable assigned to a whole number without quotation marks.'
    },
    quizzes: [
      {
        q: 'Why does Python use indentation (whitespace) instead of curly braces {}?',
        opts: [
          { text: 'To ensure code is visually clean, highly readable, and structured consistently across all developers', isCorrect: true },
          { text: 'Because Python dislikes the keyboard shift key', isCorrect: false }
        ],
        exp: 'Python’s design prioritizes human readability through mandatory structured indentation.'
      }
    ],
    practicalTask: {
      title: 'Student Grade Calculator Script',
      objective: 'Write a Python script that calculates average test scores and formats a report card.',
      steps: [
        '1. Declare 3 test variables: math = 88, science = 92, english = 90.',
        '2. Calculate average = (math + science + english) / 3.',
        '3. Print formatted output using f-string: f"Average Score: {average:.1f}%".'
      ],
      expectedResult: 'You will master basic arithmetic, variable storage, and string interpolation in Python.'
    },
    recall: {
      q: 'What is Python’s core design philosophy?',
      a: 'Readability counts! Clean, simple syntax that reads like structured English.'
    },
    takeaways: [
      'Python is the leading language for AI due to its clear, readable, and expressive syntax.',
      'Variables store strings, integers, floats, and booleans with dynamic typing.',
      'Functions encapsulate reusable logic, and f-strings produce elegant formatted output.'
    ]
  },

  'ai on the road': {
    title: 'AI on the Road',
    hook: 'How do self-driving robotaxis in San Francisco and Phoenix drive through heavy rain, construction zones, and busy pedestrian crosswalks with zero human drivers?',
    goal: 'Understand the autonomy stack: perception, sensor fusion, localization, behavior prediction, and path planning.',
    learnPoints: [
      'Understand the 6 levels of vehicle autonomy (Level 0: No Automation to Level 5: Full Autonomy)',
      'Learn how computer vision models perform Semantic Segmentation (labeling every pixel)',
      'Discover how motion prediction models anticipate pedestrian trajectory paths'
    ],
    analogy: 'An autonomous vehicle is like an elite chess grandmaster behind the steering wheel: it perceives the whole board in 360 degrees and calculates 20 possible future moves every second!',
    explanationHtml: `<h3>The Autonomous Driving Stack</h3>
<p>Self-driving cars don't just react to what is happening right now; they continuously predict what will happen 5 seconds into the future using a multi-layer autonomous stack:</p>
<h4>1. Perception & Semantic Segmentation</h4>
<p>Cameras and LiDAR classify every single pixel in the camera frame: Road (Purple), Pedestrian (Red), Vehicle (Blue), Sidewalk (Green).</p>
<h4>2. Behavior Prediction</h4>
<p>Recurrent models predict whether a walking pedestrian is about to step off the curb or wait for the walk signal.</p>
<h4>3. Trajectory Generation</h4>
<p>Path planning algorithms generate smooth, comfortable spline curves that respect traffic laws and passenger comfort.</p>`,
    step1: {
      title: '1. Semantic Segmentation Perception',
      desc: 'Neural networks classify each camera pixel into semantic object categories.',
      detail: 'Labels drivable surface vs obstacles.',
      code: 'segmented_frame = vision_model.segment_scene(camera_stream)\nroad_mask = (segmented_frame == "ROAD_SURFACE")'
    },
    step2: {
      title: '2. Pedestrian Trajectory Prediction',
      desc: 'Predict future coordinate positions of pedestrians over a 5-second sliding window.',
      detail: 'Estimates probability cones of movement.',
      code: 'predicted_paths = motion_predictor.forecast(tracked_pedestrians, horizon_sec=5.0)'
    },
    step3: {
      title: '3. Trajectory Spline Optimization',
      desc: 'Calculate steering angles and acceleration profiles that maintain safe margins.',
      detail: 'Executes smooth steering commands via drive-by-wire.',
      code: 'safe_trajectory = optimizer.solve_path(current_state, goal_state, obstacles)'
    },
    realScenario: 'A commercial robotaxi in Phoenix encountered a suddenly rolling basketball in a suburban street. The AI predicted a child might run after the ball, gently slowed to 10 km/h, and safely stopped as a child ran out to grab the ball.',
    useCases: [
      'Commercial robotaxi fleets providing millions of driverless rides in major cities',
      'Autonomous highway semi-trucks operating overnight long-haul freight corridors',
      'Automated airport shuttles moving passengers between terminals on dedicated lanes'
    ],
    simCode: 'distance_to_lead_car = 18.5 # meters\nspeed = 45 # km/h\nif distance_to_lead_car < 20.0:\n    action = "Smooth Deceleration (Regenerative Braking Active ⚡)"\nprint(f"Autopilot State: {action}")',
    simOutput: 'Autopilot State: Smooth Deceleration (Regenerative Braking Active ⚡)',
    pairs: [
      { id: 'p1', term: 'Semantic Segmentation', definition: 'An AI vision process that classifies every single pixel in an image into object categories' },
      { id: 'p2', term: 'Trajectory Planning', definition: 'Calculating the exact mathematical curves and speeds a vehicle will follow' },
      { id: 'p3', term: 'Drive-by-Wire', definition: 'Electronic computer signals controlling steering, braking, and throttle instead of mechanical cables' }
    ],
    practice: {
      q: 'What is Level 5 Vehicle Autonomy according to the SAE standard?',
      opts: [
        'Full automation where the vehicle drives in all conditions with no steering wheel or human driver needed',
        'Cruise control that only keeps speed on highways',
        'A remote control toy car',
        'A regular car with automatic wipers'
      ],
      correct: 0,
      exp: 'Level 5 autonomy represents full unconditional autonomous driving without human intervention.',
      hint: 'Think about the highest level of full autonomous capability.'
    },
    quizzes: [
      {
        q: 'How does Semantic Segmentation help a self-driving car?',
        opts: [
          { text: 'It colors and identifies every pixel as road, sidewalk, vehicle, or pedestrian so the car knows exactly where it can safely drive', isCorrect: true },
          { text: 'It plays music through the car stereo', isCorrect: false }
        ],
        exp: 'Pixel-level segmentation maps drivable free space and obstacles accurately.'
      }
    ],
    practicalTask: {
      title: 'Autonomy Perception Matrix',
      objective: 'Map 4 real-world road objects to their safety priority and perception sensor.',
      steps: [
        '1. Pedestrian at Crosswalk → Priority: Critical | Sensor: Camera + LiDAR.',
        '2. Red Traffic Light → Priority: Critical | Sensor: High-Res Color Camera.',
        '3. Pothole on Road → Priority: Medium | Sensor: LiDAR Depth Map.',
        '4. Speed Limit Sign → Priority: Standard | Sensor: OCR Camera.',
        'Write why multi-sensor redundancy protects lives.'
      ],
      expectedResult: 'You will understand how sensor fusion and safety priorities drive autonomous vehicles.'
    },
    recall: {
      q: 'What are the 3 main stages of the autonomous driving stack?',
      a: 'Perception (seeing), Behavior Prediction (anticipating), and Trajectory Planning (driving)!'
    },
    takeaways: [
      'Self-driving vehicles use sensor fusion (LiDAR, cameras, radar) for 360-degree situational awareness.',
      'Semantic segmentation labels every visual pixel to distinguish drivable road from hazards.',
      'Trajectory optimization ensures vehicles navigate safely, legally, and comfortably.'
    ]
  },

  'ai on the farm': {
    title: 'AI on the Farm',
    hook: 'How can a laser-equipped farming robot zap 200,000 weeds a day in an organic spinach field without spraying a single drop of chemical pesticide?',
    goal: 'Explore Precision Agriculture: multispectral satellite imagery, computer vision weeding rovers, automated drip irrigation, and soil sensor IoT.',
    learnPoints: [
      'Understand Precision Agriculture: targeted crop management instead of uniform spraying',
      'Learn how multispectral NDVI cameras measure plant chlorophyll and photosynthetic health',
      'Discover smart IoT drip irrigation systems that save 50% water'
    ],
    analogy: 'Precision farming AI is like a personal doctor for every single plant: instead of spraying medicine over the whole town, it gives the exact vitamin needed to individual sick plants!',
    explanationHtml: `<h3>The High-Tech Agricultural Revolution</h3>
<p>Modern farms are high-tech data centers. Farmers use drones, AI robots, and satellite sensors to grow more food using less water, less land, and zero harmful chemicals.</p>
<h4>How AI Laser Weeders Work</h4>
<p>As the robot rolls through the field at 8 km/h, high-speed cameras capture 60 frames per second. Deep learning models identify crop leaves (Spinach) vs weeds (Dandelion). A micro-laser zaps the weed in 12 milliseconds, destroying it instantly without touching the crop!</p>`,
    step1: {
      title: '1. Multispectral Aerial Crop Scanning',
      desc: 'Drones scan crop acreage using Normalized Difference Vegetation Index (NDVI) cameras.',
      detail: 'Measures near-infrared light absorption.',
      code: 'ndvi = (nir_band - red_band) / (nir_band + red_band)\nwater_stress_map = generate_irrigation_map(ndvi)'
    },
    step2: {
      title: '2. Real-Time Computer Vision Classification',
      desc: 'Deep learning classifiers differentiate target crop leaves from weeds with sub-centimeter bounding boxes.',
      detail: 'Processes video in 15ms.',
      code: 'detected_plants = weed_classifier.detect(camera_feed)\n# Label: {"type": "WEED", "x": 142, "y": 380}'
    },
    step3: {
      title: '3. Targeted Precision Actuation',
      desc: 'Directs laser pulse or micro-drop herbicide nozzle strictly to the target coordinates.',
      detail: 'Eliminates 95% of chemical runoff.',
      code: 'for target in detected_plants:\n    if target["type"] == "WEED":\n        laser_turret.zap(target["x"], target["y"])'
    },
    realScenario: 'An organic apple orchard deployed smart soil moisture sensors connected to an AI irrigation controller. The system automatically adjusted watering based on weather forecasts, saving 4 million liters of fresh water in one summer.',
    useCases: [
      'Laser weeding robots eliminating 200,000 weeds per hour with zero chemical pesticides',
      'Fruit-picking robots using soft silicone suction grippers to harvest ripe strawberries',
      'Satellite AI tracking soil nitrogen levels to optimize natural compost fertilizer application'
    ],
    simCode: 'soil_moisture = 22 # percent\nforecast_rain_prob = 85 # percent\nif soil_moisture < 30 and forecast_rain_prob < 50:\n    irrigation = "Activate Drip Lines 💧"\nelse:\n    irrigation = "Hold: Rain forecast arriving soon 🌧️ (Water Saved!)"\nprint(f"Smart Farm Controller: {irrigation}")',
    simOutput: 'Smart Farm Controller: Hold: Rain forecast arriving soon 🌧️ (Water Saved!)',
    pairs: [
      { id: 'p1', term: 'Precision Agriculture', definition: 'Using sensors, drones, and AI to care for individual crops with exact water and nutrients' },
      { id: 'p2', term: 'NDVI (Vegetation Index)', definition: 'A satellite/drone imaging formula that measures plant chlorophyll and health using infrared light' },
      { id: 'p3', term: 'Laser Weeding', definition: 'Using computer vision and targeted lasers to destroy weeds without chemical herbicides' }
    ],
    practice: {
      q: 'How does an AI smart irrigation system save millions of liters of water on a farm?',
      opts: [
        'By checking soil moisture sensors and satellite weather forecasts before deciding whether to water',
        'By turning sprinklers on 24 hours a day continuously',
        'By replacing plants with plastic artificial flowers',
        'By watering only at high noon during maximum sun heat'
      ],
      correct: 0,
      exp: 'Sensor-driven irrigation waters crops only when necessary, factoring in upcoming weather to conserve water.',
      hint: 'Think about checking soil moisture and weather forecasts.'
    },
    quizzes: [
      {
        q: 'Why is AI laser weeding better for the environment than chemical spraying?',
        opts: [
          { text: 'It destroys weeds using targeted light pulses without polluting soil, groundwater, or food with chemicals', isCorrect: true },
          { text: 'It turns weeds into gold coins', isCorrect: false }
        ],
        exp: 'Laser weeding provides organic, non-chemical weed suppression, preventing chemical runoff.'
      }
    ],
    practicalTask: {
      title: 'Smart Farm Sensor Architecture Map',
      objective: 'Draw a smart farm blueprint showing 3 connected IoT devices and their AI functions.',
      steps: [
        '1. Device 1: Soil Moisture Sensor in ground → Sends moisture data to AI hub.',
        '2. Device 2: Multispectral Drone in sky → Sends NDVI crop health map.',
        '3. Device 3: Automated Drip Valve → Receives open/close commands from AI.',
        'Write 2 sentences on how this system helps feed the world sustainably.'
      ],
      expectedResult: 'You will understand how IoT sensors and AI create sustainable, climate-smart agriculture.'
    },
    recall: {
      q: 'What is Precision Agriculture?',
      a: 'Using AI, sensors, and drones to manage crops with exact water, nutrients, and organic weed control!'
    },
    takeaways: [
      'AI-driven precision agriculture maximizes crop yields while dramatically conserving water.',
      'Computer vision allows robotic weeders to eliminate weeds organically without chemicals.',
      'Multispectral drone and satellite data detect plant disease and water stress before visible symptoms appear.'
    ]
  },

  'explore tech careers': {
    title: 'Explore Tech Careers',
    hook: 'What does a Data Scientist actually do every morning, and why is Machine Learning Engineering one of the highest-demand careers on the planet?',
    goal: 'Explore professional technology roles: Data Scientist, Machine Learning Engineer, Cloud Architect, Cybersecurity Analyst, and AI Product Manager.',
    learnPoints: [
      'Understand the responsibilities and daily tools of modern tech professionals',
      'Learn the difference between Data Science (discovering insights) and ML Engineering (deploying models)',
      'Map school subjects (Math, English, Science, Art) to tech career paths'
    ],
    analogy: 'Building a tech product is like running a Formula 1 racing team: the Data Scientist is the race telemetry analyst, the ML Engineer is the engine builder, and the Product Manager is the team principal strategist!',
    explanationHtml: `<h3>The Diverse World of Tech Careers</h3>
<p>The technology industry contains dozens of specialized disciplines catering to every skill set and interest:</p>
<h4>1. Machine Learning Engineer</h4>
<p>Builds, trains, and deploys neural network models into scalable production servers using Python, PyTorch, and Docker.</p>
<h4>2. Data Scientist</h4>
<p>Analyzes massive datasets using statistics and data visualization to discover business insights and trends.</p>
<h4>3. Cybersecurity Analyst</h4>
<p>Protects networks and computer infrastructure from hackers, malware, and unauthorized breaches.</p>`,
    step1: {
      title: '1. Exploring Core Role Archetypes',
      desc: 'Investigate tech careers based on analytical vs creative vs operational interests.',
      detail: 'Every role solves distinct challenges.',
      code: 'tech_roles = ["ML Engineer", "Data Scientist", "Cloud Architect", "AI Ethicist"]'
    },
    step2: {
      title: '2. Mapping Academic Pathways',
      desc: 'Connect school mathematics, programming, and communication to career prerequisites.',
      detail: 'Foundational literacy enables specialization.',
      code: 'prerequisites = {"ML Engineer": ["Calculus", "Linear Algebra", "Python", "Data Structures"]}'
    },
    step3: {
      title: '3. Building a Practical Portfolio',
      desc: 'Create GitHub open-source projects, Kaggle data analyses, and technical blog posts.',
      detail: 'Practical code showcases competence.',
      code: 'portfolio = ["Kaggle Titanic Prediction", "Autonomous Drone Simulator", "Climate Data App"]'
    },
    realScenario: 'A student interested in both marine biology and computer science became a Bio-Data Scientist, using machine learning to analyze whale audio recordings and track ocean pod migrations.',
    useCases: [
      'Data Scientists analyzing hospital admission records to reduce emergency room wait times',
      'ML Engineers optimizing transformer model inference speed from 500ms down to 45ms',
      'Cloud Architects designing resilient server clusters that serve 50 million concurrent video streams'
    ],
    simCode: 'my_interests = {"Subject": "Biology & Code", "Ideal Role": "Computational Biologist 🧬💻"}\nprint(f"Career Target: {my_interests[\'Ideal Role\']}")',
    simOutput: 'Career Target: Computational Biologist 🧬💻',
    pairs: [
      { id: 'p1', term: 'Data Scientist', definition: 'A professional who analyzes large datasets using statistics to uncover trends and patterns' },
      { id: 'p2', term: 'ML Engineer', definition: 'A software engineer who specializes in training, optimizing, and deploying AI models' },
      { id: 'p3', term: 'Cloud Architect', definition: 'An engineer who designs scalable, reliable server infrastructure across AWS, Google Cloud, or Azure' }
    ],
    practice: {
      q: 'What is the primary role of a Machine Learning Engineer on a software team?',
      opts: [
        'Designing, training, and deploying scalable AI models into production software systems',
        'Repairing broken office chairs and desks',
        'Painting computer monitors blue',
        'Manually typing emails for employees'
      ],
      correct: 0,
      exp: 'ML Engineers specialize in the end-to-end lifecycle of training, optimizing, and deploying models.',
      hint: 'Look for the role centered on designing, training, and deploying AI models.'
    },
    quizzes: [
      {
        q: 'What is the difference between a Data Scientist and a Software Developer?',
        opts: [
          { text: 'Data Scientists focus on statistical data analysis and predictive models; Software Developers build applications and system features', isCorrect: true },
          { text: 'Data Scientists only use pencils and paper', isCorrect: false }
        ],
        exp: 'Data science focuses on statistical inquiry, while software engineering focuses on building software infrastructure.'
      }
    ],
    practicalTask: {
      title: 'Tech Career Compass Map',
      objective: 'Research 2 tech careers and compare their daily tools and skills.',
      steps: [
        '1. Role A: Machine Learning Engineer (Tools: Python, PyTorch, GPUs).',
        '2. Role B: Cybersecurity Analyst (Tools: Wireshark, Linux, Firewalls).',
        '3. Compare: What kind of problems does each solve?',
        'Write 1 paragraph explaining which role excites you more.'
      ],
      expectedResult: 'You will gain clear insight into professional tech specializations.'
    },
    recall: {
      q: 'What does a Machine Learning Engineer do?',
      a: 'They design, train, test, and deploy artificial intelligence models into working software applications!'
    },
    takeaways: [
      'The tech ecosystem offers diverse roles: ML Engineers, Data Scientists, Security Analysts, and Architects.',
      'Combining your unique personal passions (biology, gaming, art) with code unlocks specialized careers.',
      'Hands-on coding projects and curiosity are the best preparation for future tech careers.'
    ]
  },

  'discover your skills': {
    title: 'Discover Your Skills',
    hook: 'How can building your own portfolio of mini-projects on GitHub help you land exciting internships and tech opportunities before you even finish school?',
    goal: 'Conduct a self-audit of technical and soft skills, build a project roadmap, and create a personal learning development portfolio.',
    learnPoints: [
      'Audit your current skill profile across Logic, Coding, Design, and Communication',
      'Learn how open-source collaboration and GitHub portfolios showcase real abilities',
      'Set SMART learning goals (Specific, Measurable, Achievable, Relevant, Time-bound)'
    ],
    analogy: 'Building your skill portfolio is like leveling up an RPG hero’s skill tree: every project you code unlocks new abilities, badges, and mastery levels!',
    explanationHtml: `<h3>Building Your Personal Tech Portfolio</h3>
<p>In the modern digital economy, employers and universities care far more about what you have actually built than what tests you memorized. A portfolio of working code proves your capabilities.</p>
<h4>The SMART Learning Framework</h4>
<ul>
  <li><strong>S (Specific):</strong> "Learn Python loops and lists."</li>
  <li><strong>M (Measurable):</strong> "Build 3 terminal games."</li>
  <li><strong>A (Achievable):</strong> "Dedicate 30 minutes a day for 2 weeks."</li>
  <li><strong>R (Relevant):</strong> "Prepares for machine learning data structures."</li>
  <li><strong>T (Time-bound):</strong> "Finish project by next Friday."</li>
</ul>`,
    step1: {
      title: '1. Conducting a 360° Skill Self-Audit',
      desc: 'Evaluate current proficiency across Python, algorithmic logic, UI design, and team collaboration.',
      detail: 'Identifies growth opportunities.',
      code: 'skills_matrix = {"Python": "Beginner", "Logic": "Intermediate", "UI Design": "Basic"}'
    },
    step2: {
      title: '2. Defining a SMART Project Goal',
      desc: 'Choose an achievable project that tackles a single new skill boundary.',
      detail: 'Prevents scope creep and keeps motivation high.',
      code: 'smart_goal = {\n    "project": "Interactive Text Adventure Game",\n    "deadline_days": 14,\n    "new_skills": ["Functions", "Dictionaries"]\n}'
    },
    step3: {
      title: '3. Publishing Open-Source Portfolio Work',
      desc: 'Document code with clean README markdown files, screenshots, and setup instructions.',
      detail: 'Demonstrates professional polish.',
      code: 'create_readme_file(title="Space Explorer Game", author="Alex", license="MIT")'
    },
    realScenario: 'A middle school student built a Python calculator app that helped their grandfather track blood pressure readings, shared the code on GitHub with a clean README, and won their school science fair.',
    useCases: [
      'Students publishing Python game projects on GitHub to demonstrate programming skills',
      'Developers contributing bug fixes to open-source libraries used by millions of people',
      'High school robotics teams documenting build logs and CAD files in team wikis'
    ],
    simCode: 'skill_tree = ["Variables 🟢", "Conditionals 🟢", "Loops 🟢", "Functions 🟡", "Neural Networks ⚪"]\nprint("Current Skill Tree Progress:")\nfor s in skill_tree:\n    print(f"  Level: {s}")',
    simOutput: 'Current Skill Tree Progress:\n  Level: Variables 🟢\n  Level: Conditionals 🟢\n  Level: Loops 🟢\n  Level: Functions 🟡\n  Level: Neural Networks ⚪',
    pairs: [
      { id: 'p1', term: 'Portfolio', definition: 'A curated collection of real projects that demonstrates your practical coding abilities' },
      { id: 'p2', term: 'SMART Goal', definition: 'Specific, Measurable, Achievable, Relevant, and Time-bound learning targets' },
      { id: 'p3', term: 'README.md', definition: 'A markdown document that explains what a project is, how it works, and how to run it' }
    ],
    practice: {
      q: 'Which of the following is an example of a SMART learning goal?',
      opts: [
        'Build a 3-question Python quiz app using functions by next Friday evening',
        'Become a billionaire with computers someday',
        'Learn all of programming tonight',
        'Code stuff quickly'
      ],
      correct: 0,
      exp: 'It is specific (Python quiz app), measurable (3 questions), achievable, relevant, and time-bound (next Friday).',
      hint: 'Look for the goal with specific details, clear measurements, and a realistic deadline.'
    },
    quizzes: [
      {
        q: 'Why is a portfolio of real projects valuable for young coders?',
        opts: [
          { text: 'It provides tangible, working proof of your problem-solving skills, creativity, and coding competence', isCorrect: true },
          { text: 'It takes up all your computer memory', isCorrect: false }
        ],
        exp: 'Portfolios demonstrate authentic practical ability and initiative.'
      }
    ],
    practicalTask: {
      title: 'SMART Project Roadmap Blueprint',
      objective: 'Write a SMART roadmap for your next personal Python mini-project.',
      steps: [
        '1. Specific Project Name: (e.g. Password Strength Checker).',
        '2. Measurable Features: (Check length, numbers, and symbols).',
        '3. Achievable Scope: (30 lines of Python code).',
        '4. Timeframe: (Completed in 7 days).',
        'Write your roadmap in your notebook.'
      ],
      expectedResult: 'You will experience how structured project management turns ambitious ideas into finished software.'
    },
    recall: {
      q: 'What does SMART stand for in goal setting?',
      a: 'Specific, Measurable, Achievable, Relevant, and Time-bound!'
    },
    takeaways: [
      'Auditing your skills helps you identify your strengths and target areas for growth.',
      'SMART goals keep coding projects focused, manageable, and rewarding.',
      'Documenting and publishing your projects on GitHub builds a valuable portfolio.'
    ]
  },

  'ai learning lab': {
    title: 'AI Learning Lab',
    hook: 'Can you train a computer vision model using your webcam in 60 seconds to recognize whether you are wearing glasses, holding a pencil, or waving your hand?',
    goal: 'Hands-on experimentation with Teachable Machine, interactive neural network sandboxes, confusion matrices, and model testing.',
    learnPoints: [
      'Collect and label real-time image, audio, or pose training samples using a webcam',
      'Train a lightweight MobileNet transfer learning model in the browser',
      'Evaluate model confidence scores and debug classification errors in real time'
    ],
    analogy: 'Teachable Machine is like an instant digital apprentice: you show it 30 thumbs-up gestures and 30 thumbs-down gestures, and it instantly learns to cheer whenever you give a thumbs up!',
    explanationHtml: `<h3>Interactive Machine Learning in Practice</h3>
<p>Modern machine learning is no longer confined to supercomputers. Tools like Google’s <strong>Teachable Machine</strong> and browser-based <strong>TensorFlow.js</strong> allow students to train real computer vision and audio classification models directly in the web browser!</p>
<h4>How Transfer Learning Works</h4>
<p>Instead of training billions of weights from scratch, the tool uses a pre-trained vision model (MobileNet) and quickly learns the top classification layer based on your custom webcam samples.</p>`,
    step1: {
      title: '1. Data Collection & Class Labeling',
      desc: 'Capture 50 camera frames for Class A ("Waving Hand") and 50 frames for Class B ("Resting Hand").',
      detail: 'Include varied lighting and angles.',
      code: 'samples_class_a = capture_webcam_stream(label="WAVING", count=50)\nsamples_class_b = capture_webcam_stream(label="RESTING", count=50)'
    },
    step2: {
      title: '2. Browser Transfer Learning Training',
      desc: 'Train a lightweight classification head on top of pre-trained feature embeddings in 20 epochs.',
      detail: 'Trains in seconds using WebGL acceleration.',
      code: 'model = train_transfer_head(samples_class_a, samples_class_b, epochs=20)'
    },
    step3: {
      title: '3. Real-Time Inference & Confidence Meter',
      desc: 'Run live webcam inference and observe the output confidence percentage bar change dynamically.',
      detail: 'Visualizes real-time model confidence.',
      code: 'live_prediction = model.predict(current_webcam_frame)\n# Output: {"WAVING": 0.98, "RESTING": 0.02}'
    },
    realScenario: 'A student used Teachable Machine to build an automated pet treat dispenser: whenever their rescue dog sat down in front of the camera, the model recognized the "Sitting" pose and triggered a motor to drop a treat.',
    useCases: [
      'Gesture-controlled games where raising your hand makes the character jump',
      'Accessibility voice switches for individuals who cannot use physical mice',
      'Classroom sound meters recognizing applause vs speaking noise'
    ],
    simCode: 'confidence_waving = 0.96\nconfidence_resting = 0.04\nif confidence_waving > 0.85:\n    action = "👋 Hello Explorer! Gesture Recognized!"\nprint(f"Prediction: {action} ({confidence_waving * 100:.0f}% confidence)")',
    simOutput: 'Prediction: 👋 Hello Explorer! Gesture Recognized! (96% confidence)',
    pairs: [
      { id: 'p1', term: 'Teachable Machine', definition: 'A web-based tool that lets beginners train machine learning models quickly using webcams and microphones' },
      { id: 'p2', term: 'Transfer Learning', definition: 'Reusing a powerful pre-trained neural network and fine-tuning it for a new task' },
      { id: 'p3', term: 'Confidence Score', definition: 'A percentage (0% to 100%) indicating how certain the AI is about its classification prediction' }
    ],
    practice: {
      q: 'Why is capturing diverse training samples (different angles, lighting, hand positions) important in a computer vision lab?',
      opts: [
        'It prevents the model from overfitting to one specific angle and helps it recognize the gesture in any real-world condition',
        'It makes the camera lenses cleaner',
        'Because computers like variety in colors',
        'It speeds up the internet connection'
      ],
      correct: 0,
      exp: 'Diverse training data enables robust feature generalization across varying environments.',
      hint: 'Think about how varying lighting and angles help the AI generalize.'
    },
    quizzes: [
      {
        q: 'What is Transfer Learning in machine learning?',
        opts: [
          { text: 'Using a model pre-trained on millions of images and adapting it to learn a new custom task in seconds', isCorrect: true },
          { text: 'Transferring files via USB drive', isCorrect: false }
        ],
        exp: 'Transfer learning leverages learned low-level visual features for fast training on small datasets.'
      }
    ],
    practicalTask: {
      title: 'Webcam Model Training Experiment',
      objective: 'Plan a 2-class gesture recognition model using Teachable Machine.',
      steps: [
        '1. Class 1: Thumbs Up (50 samples with left hand, right hand, close and far).',
        '2. Class 2: Thumbs Down (50 samples with left hand, right hand).',
        '3. Test edge case: What happens if you show an open palm?',
        '4. Write how you would improve the model to handle edge cases.'
      ],
      expectedResult: 'You will understand the complete machine learning training and testing loop.'
    },
    recall: {
      q: 'What is Transfer Learning?',
      a: 'Reusing a powerful pre-trained AI foundation to learn a new custom classification task in seconds!'
    },
    takeaways: [
      'Tools like Teachable Machine make training real computer vision models accessible directly in your browser.',
      'Transfer learning saves weeks of computing time by building upon pre-trained neural features.',
      'Testing edge cases reveals model blind spots and guides dataset improvements.'
    ]
  },

  'create with ai': {
    title: 'Create with AI',
    hook: 'Can you prompt an AI to design an interactive quiz game, code the HTML/CSS layout, and compose the celebratory victory sound effect in 10 minutes?',
    goal: 'Master generative AI development workflows: prototyping user interfaces, generating boilerplate code, and rapid digital product iteration.',
    learnPoints: [
      'Learn how developers use AI code assistants to write boilerplate code and debug errors',
      'Understand the iterative refinement loop: Prompt → Test → Refine → Deploy',
      'Maintain code ownership: understanding and auditing every line of AI-generated code'
    ],
    analogy: 'Using AI to build software is like having a skilled construction robot: it can assemble walls in seconds, but you are the master architect who checks the blueprints and ensures the roof won’t leak!',
    explanationHtml: `<h3>The AI-Assisted Creator Workflow</h3>
<p>Modern developers and designers use generative AI as an acceleration engine. Instead of writing 200 lines of repetitive HTML buttons and CSS colors from memory, creators prompt the AI for starter boilerplate and focus their time on custom logic and user experience.</p>
<h4>The Golden Rule of AI Coding</h4>
<p><strong>Never ship code you don't understand.</strong> Always read, test, and step through AI-assisted code line by line to verify safety, efficiency, and correctness.</p>`,
    step1: {
      title: '1. Structured Architecture Prompting',
      desc: 'Specify exact requirements, layout frameworks, and responsive design guidelines.',
      detail: 'Precise prompts yield clean starter code.',
      code: 'prompt = "Write a responsive HTML/CSS flashcard component with flip animation on click."'
    },
    step2: {
      title: '2. Code Integration & Local Testing',
      desc: 'Paste starter code into your IDE, run locally, and test interactive button states.',
      detail: 'Validates visual and logical integrity.',
      code: '# Test button triggers in browser\nrun_local_dev_server(port=5173)'
    },
    step3: {
      title: '3. Iterative Refinement & Customization',
      desc: 'Customize colors, typography, sound effects, and add custom game mechanics.',
      detail: 'Injects authentic human polish.',
      code: 'custom_theme = {"primary": "#3B82F6", "card_radius": "16px"}\napply_custom_branding(custom_theme)'
    },
    realScenario: 'A 6th-grade student used an AI coding companion to generate starter code for a solar system quiz app, customized the questions, added space NASA photos, and launched it for their class science project in 2 hours.',
    useCases: [
      'Web developers generating responsive navbar menus and modal dialog components',
      'Game developers creating procedural dialog systems for non-player characters',
      'App creators generating color palettes and accessibility contrast ratios automatically'
    ],
    simCode: 'feature = "Flashcard Flip Animation"\nstatus = "Code Generated → Tested → Customized → Deployed! 🚀"\nprint(f"Feature: {feature} | Status: {status}")',
    simOutput: 'Feature: Flashcard Flip Animation | Status: Code Generated → Tested → Customized → Deployed! 🚀',
    pairs: [
      { id: 'p1', term: 'Boilerplate Code', definition: 'Standard sections of code that must be included in many places with little alteration' },
      { id: 'p2', term: 'Iterative Refinement', definition: 'The process of continually testing, improving, and polishing software in small steps' },
      { id: 'p3', term: 'Code Ownership', definition: 'The professional responsibility to understand, audit, and maintain all code in your project' }
    ],
    practice: {
      q: 'What should a responsible programmer always do after receiving code from an AI assistant?',
      opts: [
        'Read, understand, test, and audit every line of code to verify safety and correctness before using it',
        'Copy-paste it directly into production without looking at it',
        'Delete their code editor',
        'Assume the AI code is 100% bug-free'
      ],
      correct: 0,
      exp: 'Programmers must understand and verify all AI-generated code to prevent security vulnerabilities and bugs.',
      hint: 'Think about professional code verification and testing.'
    },
    quizzes: [
      {
        q: 'How does generative AI accelerate web development?',
        opts: [
          { text: 'By rapidly generating starter boilerplate code, allowing developers to focus on creative logic and custom features', isCorrect: true },
          { text: 'By replacing the need for internet connections', isCorrect: false }
        ],
        exp: 'AI assistance eliminates repetitive boilerplate coding and speeds up initial prototyping.'
      }
    ],
    practicalTask: {
      title: 'AI Component Prototyping Sprint',
      objective: 'Write a prompt for a responsive flashcard UI component and customize its CSS styling.',
      steps: [
        '1. Write a precise prompt: "Create a flashcard with Front (Question) and Back (Answer) in clean HTML/CSS."',
        '2. Review generated code: Identify the flip CSS transform property.',
        '3. Customize: Change background gradient to deep ocean blue (#0F172A to #1E3A8A).',
        '4. Test interactive click behavior.'
      ],
      expectedResult: 'You will master the iterative AI-assisted web development workflow.'
    },
    recall: {
      q: 'What is the Golden Rule of AI Coding?',
      a: 'Never ship code you don’t understand! Always read, test, and verify AI-generated code.'
    },
    takeaways: [
      'AI coding assistants accelerate prototyping by generating boilerplate code instantly.',
      'The developer retains ownership: you must understand, test, and audit every line.',
      'Iterative refinement (Prompt → Test → Refine) turns rough starter code into polished applications.'
    ]
  },

  'protect your data': {
    title: 'Protect Your Data',
    hook: 'If a free mobile game doesn’t charge any money to download, how is the game company making billions of dollars in profit?',
    goal: 'Understand the data economy: telemetry tracking, digital advertising profiles, app permissions, encryption, and personal cybersecurity.',
    learnPoints: [
      'Understand the data economy: "If the product is free, your data is the product"',
      'Audit mobile app permissions: Camera, Microphone, Location, Contacts',
      'Learn how end-to-end encryption protects messages from eavesdropping'
    ],
    analogy: 'Your personal data is like gold nuggets in your backpack: if you leave the zippers open on public Wi-Fi without encryption, digital pickpockets can read your messages!',
    explanationHtml: `<h3>The Hidden Economy of Personal Data</h3>
<p>Free online games and social platforms are funded by <strong>Targeted Advertising</strong>. Every click, video watched, search query, and GPS location is aggregated into a digital advertising profile to predict your behavior.</p>
<h4>How to Defend Your Privacy</h4>
<ul>
  <li><strong>1. Permission Auditing:</strong> Never grant microphone or location access to apps that don’t strictly need them (like a flashlight app asking for contacts!).</li>
  <li><strong>2. End-to-End Encryption (E2EE):</strong> Encrypts messages so only the sender and receiver have the cryptographic decryption key.</li>
  <li><strong>3. Password Managers:</strong> Generate unique, complex 16-character passwords for every service.</li>
</ul>`,
    step1: {
      title: '1. App Permission Auditing',
      desc: 'Review device privacy settings and revoke unnecessary background location permissions.',
      detail: 'Blocks background telemetry harvesting.',
      code: '# Permission Check:\nif app_type == "CALCULATOR" and requested_perm == "LOCATION":\n    deny_permission()'
    },
    step2: {
      title: '2. End-to-End Encryption (E2EE)',
      desc: 'Encrypt sensitive text payloads using AES-256 or RSA asymmetric key pairs.',
      detail: 'Only authorized recipients can decrypt.',
      code: 'encrypted_payload = encrypt(message="Secret Note", public_key=recipient_key)\n# Ciphertext: "a8f93c01b2..."'
    },
    step3: {
      title: '3. Multi-Factor Authentication (MFA)',
      desc: 'Require an authenticator app code alongside passwords for all critical accounts.',
      detail: 'Blocks 99.9% of automated credential stuffing attacks.',
      code: 'if verify_password(pw) and verify_totp_code(code):\n    grant_secure_session()'
    },
    realScenario: 'A student downloaded a flashlight app that requested access to contacts and GPS location. The student realized a flashlight only needs camera flash access, denied the suspicious permissions, and deleted the spyware app.',
    useCases: [
      'End-to-end encrypted messaging apps (Signal, WhatsApp) protecting private family chats',
      'Operating systems alerting users with green camera indicators when microphones are active',
      'Hardware security keys (YubiKeys) protecting sensitive engineering and bank infrastructure'
    ],
    simCode: 'plaintext = "My Secret Homework Plan"\nencrypted = "🔒 8f4a9b2c8901e4"\nprint("Original Text:", plaintext)\nprint("Encrypted Over Network:", encrypted)\nprint("Decrypted at Destination:", plaintext)',
    simOutput: 'Original Text: My Secret Homework Plan\nEncrypted Over Network: 🔒 8f4a9b2c8901e4\nDecrypted at Destination: My Secret Homework Plan',
    pairs: [
      { id: 'p1', term: 'End-to-End Encryption', definition: 'A security system where only communicating users can read messages; no third party or server can listen' },
      { id: 'p2', term: 'Data Telemetry', definition: 'Automated collection of user clicks, location, and device metrics sent back to servers' },
      { id: 'p3', term: 'MFA (Multi-Factor Auth)', definition: 'A security login method requiring two or more proofs of identity (e.g. password + phone code)' }
    ],
    practice: {
      q: 'Why should you be suspicious if a simple calculator app requests permission to access your microphone and GPS location?',
      opts: [
        'A calculator only needs math processing; microphone and location permissions indicate possible data tracking spyware',
        'Because calculators cannot speak English',
        'Because microphones drain screen brightness',
        'Because calculators only work in the dark'
      ],
      correct: 0,
      exp: 'Apps should only request permissions strictly necessary for their core functionality (principle of least privilege).',
      hint: 'Think about whether a calculator needs to know where you are or record audio.'
    },
    quizzes: [
      {
        q: 'What does "End-to-End Encryption" ensure?',
        opts: [
          { text: 'That only the sender and intended receiver can read the message content, even if intercepted on the network', isCorrect: true },
          { text: 'That messages are translated into emojis', isCorrect: false }
        ],
        exp: 'E2EE ensures cryptographic confidentiality from device to device.'
      }
    ],
    practicalTask: {
      title: 'Mobile Privacy Permission Audit',
      objective: 'Inspect the permissions of 3 apps on a phone or tablet with a parent.',
      steps: [
        '1. Open Settings → Privacy → Permission Manager.',
        '2. Check: Which apps have access to Location "All the time"?',
        '3. Change location permissions to "Only while using app".',
        '4. Write down 1 permission that was surprising.'
      ],
      expectedResult: 'You will take control of your digital privacy and restrict background data harvesting.'
    },
    recall: {
      q: 'What does the phrase "If the product is free, your data is the product" mean?',
      a: 'Free platforms make money by collecting your activity data and selling targeted advertising!'
    },
    takeaways: [
      'Audit app permissions regularly and revoke access to cameras, microphones, and location when unnecessary.',
      'End-to-end encryption protects your messages from interception across public networks.',
      'Use multi-factor authentication and unique passwords to secure your digital identity.'
    ]
  },

  'think before you trust': {
    title: 'Think Before You Trust',
    hook: 'If you see a realistic video of a famous astronaut announcing that aliens were discovered on Mars, how can you prove within 60 seconds whether the video is real or an AI deepfake?',
    goal: 'Master digital forensics: deepfake detection, reverse image searching, verifying provenance metadata, and identifying algorithmic disinformation.',
    learnPoints: [
      'Learn how Deepfake generative adversarial networks synthesize realistic audio and video',
      'Master the Visual Artifact Checklist: Unnatural eye blinking, blurry ear contours, warped teeth, lighting mismatches',
      'Use professional fact-checking tools: Reverse Image Search, Provenance metadata (C2PA)'
    ],
    analogy: 'Fact-checking digital media is like examining a counterfeit bill with a magnifying glass: at a quick glance it looks real, but when you zoom into the fine lines and watermark, the fake details reveal themselves!',
    explanationHtml: `<h3>Spotting Deepfakes and AI Disinformation</h3>
<p>Generative AI models can create photorealistic images, clone voices from 3 seconds of audio, and generate convincing video clips. Being a critical digital detective requires looking for technical visual artifacts and verifying primary sources.</p>
<h4>The Deepfake Forensics Checklist</h4>
<ul>
  <li><strong>1. Eye Blinking & Glances:</strong> AI models often generate unnatural blinking rhythms or asymmetric iris reflections.</li>
  <li><strong>2. Ear, Hair & Jewelry Contours:</strong> Check complex fine structures like earlobes, glasses frames, and hair strands where diffusion models blend pixels irregularly.</li>
  <li><strong>3. Voice Cadence & Breaths:</strong> Synthetic voices often lack natural breath pauses, swallowing sounds, or pitch micro-variations.</li>
</ul>`,
    step1: {
      title: '1. Visual Artifact Inspection',
      desc: 'Zoom into hands, ears, shadows, and reflective surfaces to spot rendering distortions.',
      detail: 'Diffusion models struggle with consistent hand anatomy.',
      code: 'def inspect_image_artifacts(image_frame):\n    check_finger_count(image_frame)\n    check_reflection_symmetry(image_frame)'
    },
    step2: {
      title: '2. Reverse Image & Provenance Search',
      desc: 'Upload the image to Google Reverse Image Search or TinEye to find the original publication date and photographer.',
      detail: 'Exposes re-contextualized media.',
      code: 'search_results = reverse_search_image(suspicious_photo)\noriginal_source = search_results[0].earliest_date'
    },
    step3: {
      title: '3. Cross-Referencing Authoritative News Wires',
      desc: 'Verify whether major global news organizations (Reuters, AP News, BBC) have corroborated the breaking event.',
      detail: 'Major discoveries are never reported by only 1 anonymous social account.',
      code: 'if not is_reported_by_verified_wire_services(claim):\n    flag_disinformation_risk()'
    },
    realScenario: 'A student saw a viral social media photo claiming a volcano erupted in Paris. The student used Google Reverse Image Search, discovered the photo was generated by Midjourney AI by a digital artist, and stopped the rumor from spreading in their school chat.',
    useCases: [
      'Journalists verifying video footage from crisis zones before broadcasting on evening news',
      'Banks using voice biometric liveness detection to block AI voice cloning phone scams',
      'Social platforms labeling AI-generated images with C2PA digital watermarks'
    ],
    simCode: 'viral_claim = "Astronauts found alien fossils on Mars! 👽"\nsources_found = 0 # No verified science journals report this\nif sources_found == 0:\n    print("🛑 Unverified Viral Rumor: Probable AI Generated Disinformation. Do NOT share!")',
    simOutput: '🛑 Unverified Viral Rumor: Probable AI Generated Disinformation. Do NOT share!',
    pairs: [
      { id: 'p1', term: 'Deepfake', definition: 'Synthetic media (video or audio) created by AI that convincingly replaces a person’s likeness or voice' },
      { id: 'p2', term: 'Reverse Image Search', definition: 'Searching the web using an image instead of words to find where the picture originally came from' },
      { id: 'p3', term: 'C2PA Provenance', definition: 'Cryptographic digital watermarks embedded in photos to prove when and how an image was created' }
    ],
    practice: {
      q: 'What is the fastest and most reliable way to check if a viral photo on social media is real or AI-generated?',
      opts: [
        'Run a Reverse Image Search to find the original source and check if verified news organizations report the event',
        'Believe it if it has more than 10,000 likes',
        'Share it immediately with 50 friends to ask their opinion',
        'Assume everything on the internet is 100% true'
      ],
      correct: 0,
      exp: 'Reverse image search and primary source verification reliably reveal synthetic or out-of-context media.',
      hint: 'Think about checking primary sources and running reverse image searches.'
    },
    quizzes: [
      {
        q: 'What visual artifact often reveals that an image was created by an AI generator?',
        opts: [
          { text: 'Unnatural hand fingers, warped ear contours, and mismatched lighting reflections in the eyes', isCorrect: true },
          { text: 'The photo having colors in it', isCorrect: false }
        ],
        exp: 'Fine biological details and lighting physics are common failure modes for image generators.'
      }
    ],
    practicalTask: {
      title: 'Digital Forensic Detective Case',
      objective: 'Practice the 3-step verification protocol on a viral science claim.',
      steps: [
        '1. Step 1: Check source credibility (Anonymous meme account vs NASA.gov).',
        '2. Step 2: Inspect visual details (Check shadows, background blur, and lighting).',
        '3. Step 3: Run reverse search on the image.',
        'Write 2 sentences explaining why you should "Think Before You Trust".'
      ],
      expectedResult: 'You will develop the critical digital literacy habits of an empowered, discerning media consumer.'
    },
    recall: {
      q: 'What should you do when you encounter a shocking viral photo or video online?',
      a: 'Pause, inspect for AI visual artifacts, run a reverse image search, and verify with trusted news sources!'
    },
    takeaways: [
      'Generative AI can create convincing synthetic deepfakes of voices, photos, and videos.',
      'Check for visual artifacts around hands, ears, lighting reflections, and voice cadence.',
      'Always verify surprising viral claims through independent primary sources and reverse image searches.'
    ]
  }
}

export const MIDDLE_TOPIC_PROFILES = CLASS6_TOPIC_PROFILES
