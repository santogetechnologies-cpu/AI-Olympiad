// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 7 (12 DISTINCT LESSONS)
// Data Logic & Python Foundations • Ages 12-13
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS7_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'ai learns from data': {
    title: 'AI Learns from Data',
    hook: 'How can a machine learning algorithm look at 100,000 credit card purchases and detect a stolen card in 0.05 seconds?',
    goal: 'Master tabular data pipelines: feature engineering, data normalization, categorical encoding, and training tabular classification models.',
    learnPoints: [
      'Understand how raw tables (rows & columns) are preprocessed for machine learning',
      'Learn Numerical Normalization (Min-Max Scaling) and Categorical Encoding (One-Hot)',
      'Discover how tabular classifiers detect financial fraud, loan risk, and medical anomalies'
    ],
    analogy: 'Preprocessing tabular data is like preparing ingredients before cooking: you must wash, peel, and chop everything into uniform sizes so the recipe bakes evenly!',
    explanationHtml: `<h3>Turning Raw Tables into Intelligence</h3>
<p>Most real-world business and scientific data is stored in spreadsheets and relational databases (tabular data). Before a model can learn, raw strings and numbers must be transformed into clean numerical arrays.</p>
<h4>Core Tabular Preprocessing Steps</h4>
<ul>
  <li><strong>Handling Missing Values:</strong> Imputing missing numbers with column medians or removing corrupted rows.</li>
  <li><strong>One-Hot Encoding:</strong> Converting text categories (e.g. <code>"City": ["Tokyo", "Paris", "New York"]</code>) into binary 0/1 vectors.</li>
  <li><strong>Feature Scaling:</strong> Normalizing numbers to a 0.0 to 1.0 range so large values don't overpower smaller ones.</li>
</ul>`,
    step1: {
      title: '1. Tabular Ingestion & Cleaning',
      desc: 'Load CSV tables with pandas, drop duplicate rows, and impute missing numerical nulls.',
      detail: 'Ensures data cleanliness.',
      code: 'import pandas as pd\ndf = pd.read_csv("customer_transactions.csv")\ndf["amount"].fillna(df["amount"].median(), inplace=True)'
    },
    step2: {
      title: '2. One-Hot Encoding & Feature Scaling',
      desc: 'Encode categorical location strings and scale transaction amounts with StandardScaler.',
      detail: 'Standardizes numerical variance across features.',
      code: 'from sklearn.preprocessing import OneHotEncoder, StandardScaler\ndf_encoded = pd.get_dummies(df, columns=["merchant_category", "country"])'
    },
    step3: {
      title: '3. Model Training & Accuracy Metrics',
      desc: 'Train a Random Forest or Logistic Regression classifier to predict fraud probabilities.',
      detail: 'Generates precision-recall metrics.',
      code: 'from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)'
    },
    realScenario: 'A fraud analyst trained a Random Forest model on 200,000 e-commerce purchases. The model identified an overseas criminal card-testing ring within 3 minutes, automatically freezing 450 compromised cards and saving customers $120,000.',
    useCases: [
      'Banking fraud detection algorithms scoring transaction risk in milliseconds',
      'Hospital admission systems predicting ICU bed capacity 48 hours in advance',
      'Flight booking platforms predicting airline ticket price fluctuations'
    ],
    simCode: 'transaction = {"amount": 450.0, "location_mismatch": 1, "unusual_hour": 1}\nfraud_risk = 0.45 * transaction["amount"]/100 + 0.35 * transaction["location_mismatch"] + 0.20 * transaction["unusual_hour"]\nprint(f"Transaction Risk Score: {fraud_risk:.2f} → Status: {\'🚨 REVIEW REQUIRED\' if fraud_risk > 1.0 else \'✅ APPROVED\'}")',
    simOutput: 'Transaction Risk Score: 2.58 → Status: 🚨 REVIEW REQUIRED',
    pairs: [
      { id: 'p1', term: 'One-Hot Encoding', definition: 'Converting categorical text categories into separate binary (0 or 1) columns' },
      { id: 'p2', term: 'Feature Scaling', definition: 'Normalizing numerical ranges (e.g. 0 to 1) so large numbers don’t distort model training' },
      { id: 'p3', term: 'Random Forest', definition: 'A popular machine learning algorithm that combines hundreds of decision trees for accurate tabular prediction' }
    ],
    practice: {
      q: 'Why do data scientists convert text categories like "Tokyo", "Paris", and "New York" into binary 0/1 columns (One-Hot Encoding)?',
      opts: [
        'Because machine learning algorithms perform mathematical calculations that require numerical matrices rather than raw text strings',
        'Because computers only know how to read binary numbers in the morning',
        'To make the spreadsheet file 100 times larger',
        'Because city names are illegal in programming'
      ],
      correct: 0,
      exp: 'Mathematical optimization models require numeric matrix inputs.',
      hint: 'Think about converting text into numbers so algorithms can calculate with them.'
    },
    quizzes: [
      {
        q: 'What does "Feature Scaling" do in data preprocessing?',
        opts: [
          { text: 'It normalizes feature values to a standardized range (like 0 to 1) so large values don’t dominate small ones', isCorrect: true },
          { text: 'It weighs the computer on a digital scale', isCorrect: false }
        ],
        exp: 'Scaling equalizes feature contributions during gradient-based optimization.'
      }
    ],
    practicalTask: {
      title: 'Tabular Preprocessing Pipeline Lab',
      objective: 'Transform 3 raw customer records into a normalized machine-readable feature matrix.',
      steps: [
        '1. Record 1: Age 20, City "London", Purchase $10.',
        '2. Record 2: Age 60, City "Tokyo", Purchase $100.',
        '3. Encode Cities into [is_London, is_Tokyo].',
        '4. Normalize Ages between 0.0 and 1.0 (Age / 100).'
      ],
      expectedResult: 'You will understand how raw business records are structured into feature tensors.'
    },
    recall: {
      q: 'What is One-Hot Encoding?',
      a: 'Converting categorical text labels into binary 0 and 1 columns that machine learning models can compute!'
    },
    takeaways: [
      'Tabular data powers banking, healthcare, logistics, and scientific research.',
      'Data cleaning, scaling, and categorical encoding are essential before model training.',
      'Random Forests and decision trees excel at finding patterns across tabular columns.'
    ]
  },

  'patterns make it smart': {
    title: 'Patterns Make It Smart',
    hook: 'How can a fitness watch look at raw accelerometer vibrations on your wrist and know whether you are swimming, cycling, running, or sleeping?',
    goal: 'Understand time-series pattern recognition: signal processing, rolling averages, frequency analysis, and periodic pattern detection.',
    learnPoints: [
      'Learn how sensors record time-series data (values indexed in time order)',
      'Understand Rolling Averages and Noise Filtering for smoothing jumpy signals',
      'Discover Peak Detection algorithms that count steps, heartbeats, and ocean wave cycles'
    ],
    analogy: 'Time-series pattern recognition is like reading musical sheet music: the AI looks at the rhythm of the notes, the tempo, and the recurring chorus to recognize the song!',
    explanationHtml: `<h3>Unlocking Time-Series Patterns</h3>
<p>Smartwatches, weather stations, and seismic sensors generate <strong>Time-Series Data</strong>—measurements captured at regular millisecond intervals. AI algorithms analyze frequency peaks and valleys to identify human physical activities.</p>
<h4>How Step Counters Count Steps</h4>
<p>When you walk, your body bobs up and down with a rhythmic vertical acceleration wave. The AI filters out random hand twitches (noise) and counts the distinct cyclical peaks in acceleration!</p>`,
    step1: {
      title: '1. Raw Accelerometer Telemetry Streaming',
      desc: 'Ingest 3-axis accelerometer signals (X, Y, Z) sampled at 50 Hz.',
      detail: 'Records raw gravitational forces in milli-g.',
      code: 'raw_signal = stream_accelerometer(sample_rate_hz=50)\n# Magnitude: sqrt(x^2 + y^2 + z^2)'
    },
    step2: {
      title: '2. Low-Pass Noise Filtering',
      desc: 'Apply a rolling moving average filter to eliminate high-frequency hand tremors.',
      detail: 'Smooths the waveform to highlight true body motion.',
      code: 'smoothed_signal = apply_moving_average(raw_signal, window_size=5)'
    },
    step3: {
      title: '3. Peak Detection & Activity Classification',
      desc: 'Detect periodic wave peaks and classify cadence: 110 steps/min = Walking, 170 steps/min = Running.',
      detail: 'Counts steps with 99% accuracy.',
      code: 'peaks = scipy.signal.find_peaks(smoothed_signal, distance=25, height=1.2)\nstep_count = len(peaks[0])'
    },
    realScenario: 'A smartwatch detected an irregular heartbeat pattern in an elderly user during their morning walk, alerted the user to sit down, and automatically shared an ECG report with their doctor, preventing a cardiac event.',
    useCases: [
      'Smartwatches tracking daily step counts, calorie burn, and sleep cycles',
      'Seismology networks detecting early P-wave earthquake patterns to trigger rail brakes 30 seconds before shaking',
      'Acoustic underwater sensors listening to ocean soundwaves to detect submarine propellers'
    ],
    simCode: 'signal_peaks = [1.4, 0.8, 1.5, 0.9, 1.6, 0.7] # Acceleration peaks\nsteps = len([p for p in signal_peaks if p > 1.2])\nprint(f"Step Counter AI: {steps} Rhythmic Steps Counted 👟")\nprint("Activity Classified: Active Walking 🚶")',
    simOutput: 'Step Counter AI: 3 Rhythmic Steps Counted 👟\nActivity Classified: Active Walking 🚶',
    pairs: [
      { id: 'p1', term: 'Time-Series Data', definition: 'A sequence of data points recorded at successive, equally spaced points in time' },
      { id: 'p2', term: 'Moving Average', definition: 'A calculation that smooths out short-term fluctuations and highlights longer-term trends' },
      { id: 'p3', term: 'Peak Detection', definition: 'An algorithm that identifies local maximums in a continuous sensor signal wave' }
    ],
    practice: {
      q: 'How does a fitness tracker filter out random hand twitches so it doesn’t count them as walking steps?',
      opts: [
        'By applying moving average noise filters and requiring rhythmic, periodic peak patterns',
        'By asking you to type every step on the keyboard',
        'By turning off the sensor when you move your arm',
        'By guessing a random number between 1 and 10,000'
      ],
      correct: 0,
      exp: 'Moving average filters and frequency thresholding isolate true rhythmic gait patterns from erratic hand noise.',
      hint: 'Think about filtering out noise and looking for rhythmic wave patterns.'
    },
    quizzes: [
      {
        q: 'What is Time-Series data?',
        opts: [
          { text: 'A series of continuous measurements indexed in chronological time order (like ECG, weather, or stock prices)', isCorrect: true },
          { text: 'A collection of vintage antique clocks', isCorrect: false }
        ],
        exp: 'Time-series datasets track changing metrics across continuous temporal intervals.'
      }
    ],
    practicalTask: {
      title: 'Time-Series Pulse Counter Lab',
      objective: 'Calculate moving average for 5 pulse readings and identify true heartbeat peaks.',
      steps: [
        '1. Raw Signal: [70, 72, 110, 71, 115, 70, 112].',
        '2. Identify the 3 heartbeat peaks (> 100 BPM).',
        '3. Calculate heart rate in beats per minute.',
        '4. Explain why baseline noise (70-72) was ignored.'
      ],
      expectedResult: 'You will understand peak detection algorithms used in medical wearables.'
    },
    recall: {
      q: 'How do computers recognize activities from sensor data?',
      a: 'By analyzing time-series wave patterns, filtering out noise, and detecting rhythmic frequency peaks!'
    },
    takeaways: [
      'Time-series data tracks continuous measurements over time from wearables, satellites, and sensors.',
      'Noise filtering smooths out jumpy sensor readings to reveal true underlying patterns.',
      'Peak detection and frequency analysis classify human movement, heart rhythms, and environmental signals.'
    ]
  },

  'hello, python!': {
    title: 'Hello, Python!',
    hook: 'How can you write a 4-line Python program that asks for your birth year and instantly calculates how many days, hours, and seconds you have been alive on Earth?',
    goal: 'Master Python fundamentals: standard I/O, mathematical operators, conditional logic (if/elif/else), and string manipulation.',
    learnPoints: [
      'Master Python inputs with `input()` and type casting (`int()`, `float()`)',
      'Understand mathematical operations: `+`, `-`, `*`, `/`, `//` (floor div), `%` (modulo), `**` (power)',
      'Construct multi-branch conditional trees with comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)'
    ],
    analogy: 'Writing Python is like having a supercharged digital assistant: you give it clean instructions in plain English syntax, and it executes millions of calculations in a blink of an eye!',
    explanationHtml: `<h3>Welcome to Real-World Python Programming</h3>
<p>Python is the official language of modern AI research and backend engineering. In this lesson, we master how Python receives user inputs, processes calculations with arithmetic operators, and makes decisions with conditional branching.</p>`,
    step1: {
      title: '1. User Input & Type Casting',
      desc: 'Capture string inputs from the terminal and cast them into integers.',
      detail: 'Always convert string inputs before doing math.',
      code: 'birth_year = int(input("Enter your birth year (e.g. 2012): "))\ncurrent_year = 2026\nage = current_year - birth_year'
    },
    step2: {
      title: '2. Arithmetic & Time Calculations',
      desc: 'Compute days, hours, and seconds using multiplication operators.',
      detail: 'Python handles arbitrarily large integers without overflow.',
      code: 'days_alive = age * 365\nhours_alive = days_alive * 24\nseconds_alive = hours_alive * 3600'
    },
    step3: {
      title: '3. Multi-Branch Logic & Formatted Output',
      desc: 'Evaluate age categories and display formatted summary cards with f-strings.',
      detail: 'Structures decision outputs.',
      code: 'if age >= 18:\n    category = "Adult"\nelif age >= 13:\n    category = "Teenager"\nelse:\n    category = "Junior Explorer"\nprint(f"You are ~{days_alive:,} days old! [{category}]")'
    },
    realScenario: 'A student built an interactive carbon footprint calculator in Python that asked users for their daily commute kilometers, calculated annual CO2 emissions, and suggested green alternatives.',
    useCases: [
      'Automation scripts renaming 1,000 photo files in 2 seconds',
      'Financial scripts calculating compound interest and investment returns',
      'Chatbot engines parsing user text and routing customer service requests'
    ],
    simCode: 'user_name = "Maya"\nage = 13\ndays = age * 365\nprint(f"Hello, {user_name}! 🌟 You have explored Earth for ~{days:,} days! 🚀")',
    simOutput: 'Hello, Maya! 🌟 You have explored Earth for ~4,745 days! 🚀',
    pairs: [
      { id: 'p1', term: 'Type Casting', definition: 'Converting data from one type to another (e.g. converting string "13" into integer 13 using int())' },
      { id: 'p2', term: 'Modulo Operator (%)', definition: 'Returns the remainder of a division (e.g. 10 % 3 = 1)' },
      { id: 'p3', term: 'Floor Division (//)', definition: 'Divides two numbers and rounds down to the nearest whole integer (e.g. 10 // 3 = 3)' }
    ],
    practice: {
      q: 'What will be the result of the Python expression `15 % 4`?',
      opts: [
        '3 (Because 15 divided by 4 is 3 with a remainder of 3)',
        '3.75',
        '0',
        '60'
      ],
      correct: 0,
      exp: 'The modulo operator `%` calculates the integer remainder of division.',
      hint: 'Think about the remainder left over when 15 is divided by 4.'
    },
    quizzes: [
      {
        q: 'Why must you use `int(input("..."))` when capturing numbers from a user in Python?',
        opts: [
          { text: 'Because `input()` always returns a String; `int()` converts it into a number so you can do math', isCorrect: true },
          { text: 'Because Python forgets numbers after 10 seconds', isCorrect: false }
        ],
        exp: 'Type casting string inputs to integers is necessary for numerical arithmetic.'
      }
    ],
    practicalTask: {
      title: 'Space Weight Calculator Script',
      objective: 'Write a Python script that calculates how much a person weighs on the Moon and Mars.',
      steps: [
        '1. Input: earth_weight = float(input("Enter weight on Earth in kg: ")).',
        '2. Moon formula: moon_weight = earth_weight * 0.165.',
        '3. Mars formula: mars_weight = earth_weight * 0.38.',
        '4. Print formatted weights using f-strings with 2 decimal places (`:.2f`).'
      ],
      expectedResult: 'You will master float inputs, floating-point arithmetic, and formatted string outputs.'
    },
    recall: {
      q: 'What is the purpose of type casting in Python?',
      a: 'Converting data types (like turning string text into an integer number) so you can perform math operations!'
    },
    takeaways: [
      'Python `input()` captures user text, which must be cast to `int` or `float` for math.',
      'Comparison operators (`==`, `!=`, `<`, `>`) drive decision-making in `if/elif/else` blocks.',
      'f-strings format numbers with commas (`{num:,}`) and decimal precision (`{num:.2f}`).'
    ]
  },

  'code your first idea': {
    title: 'Code Your First Idea',
    hook: 'Can you build a text adventure game in Python where players explore a haunted space station, pick up laser tools, and battle alien glitches?',
    goal: 'Master Python data structures: Lists, Dictionaries, while loops, and building complete interactive terminal games.',
    learnPoints: [
      'Master Python Lists: appending, removing, indexing, and iterating',
      'Master Python Dictionaries: key-value pairs for game states and inventories',
      'Build game loops using `while is_running:` with user choice validation'
    ],
    analogy: 'A Python dictionary is like a player’s inventory backpack: each slot has an item name (Key) and a quantity or power level (Value)!',
    explanationHtml: `<h3>Building Interactive Software with Data Structures</h3>
<p>Every video game and software application relies on two foundational Python data structures:</p>
<h4>1. Lists (Ordered Collections)</h4>
<p>Store items in indexed order: <code>inventory = ["Laser Blaster", "Medkit", "Brass Key"]</code>.</p>
<h4>2. Dictionaries (Key-Value Mappings)</h4>
<p>Store structured attributes: <code>player = {"name": "Nova", "hp": 100, "shield": 50}</code>.</p>`,
    step1: {
      title: '1. Initializing Player State Dictionaries',
      desc: 'Define character attributes and empty inventory lists.',
      detail: 'Centralizes game state.',
      code: 'player = {\n    "name": "Commander Alex",\n    "hp": 100,\n    "inventory": ["Plasma Scanner"],\n    "room": "AIRLOCK"\n}'
    },
    step2: {
      title: '2. Constructing the Game World Graph',
      desc: 'Model rooms and directional exits using nested dictionaries.',
      detail: 'Enables dynamic room navigation.',
      code: 'rooms = {\n    "AIRLOCK": {"desc": "A cold metal chamber with red emergency lights.", "north": "LAB"},\n    "LAB": {"desc": "A science lab with glowing beakers.", "south": "AIRLOCK"}\n}'
    },
    step3: {
      title: '3. Implementing the Game Loop',
      desc: 'Run a `while True:` loop that prints the room, accepts user commands, and updates state.',
      detail: 'Terminates on win or game over.',
      code: 'while player["hp"] > 0:\n    current_room = rooms[player["room"]]\n    print(f"\\n--- {player[\'room\']} ---")\n    print(current_room["desc"])\n    action = input("Command (north/south/quit): ").strip().lower()\n    if action == "quit": break'
    },
    realScenario: 'A 7th-grade student built a 150-line text adventure game called "Escape from Cyber-City". Classmates played the game during lunch, trying different choice combinations to find the secret golden ending.',
    useCases: [
      'Game development engines managing player inventories and quest states',
      'E-commerce shopping cart systems adding and removing items from cart lists',
      'Contact management apps storing phone numbers mapped to contact names'
    ],
    simCode: 'inventory = ["Flashlight 🔦", "Keycard 🔑"]\ninventory.append("Energy Battery 🔋")\nprint("Current Player Inventory:")\nfor item in inventory:\n    print(f"  • {item}")',
    simOutput: 'Current Player Inventory:\n  • Flashlight 🔦\n  • Keycard 🔑\n  • Energy Battery 🔋',
    pairs: [
      { id: 'p1', term: 'List', definition: 'An ordered, mutable collection of items enclosed in square brackets (e.g. [1, 2, 3])' },
      { id: 'p2', term: 'Dictionary', definition: 'A collection of key-value pairs enclosed in curly braces (e.g. {"hp": 100})' },
      { id: 'p3', term: 'Game Loop', definition: 'A while loop that continuously accepts input, updates game state, and renders the screen' }
    ],
    practice: {
      q: 'How do you access the value of "hp" from a dictionary named `player = {"name": "Leo", "hp": 100}` in Python?',
      opts: [
        'player["hp"]',
        'player.get_hp()',
        'player(1)',
        'player.hp.value'
      ],
      correct: 0,
      exp: 'Square bracket key lookup `player["hp"]` retrieves the associated value 100.',
      hint: 'Look for the square bracket dictionary key syntax.'
    },
    quizzes: [
      {
        q: 'What is the method used to add a new item to the end of a Python list?',
        opts: [
          { text: '.append(item)', isCorrect: true },
          { text: '.push_to_end(item)', isCorrect: false },
          { text: '.insert_last(item)', isCorrect: false }
        ],
        exp: 'The `.append()` method adds an element to the end of an existing list.'
      }
    ],
    practicalTask: {
      title: 'Text Adventure Mini-Game Project',
      objective: 'Write a 3-room text adventure game with an inventory item pickup in Python.',
      steps: [
        '1. Create a player dictionary with name, hp=100, and inventory=[].',
        '2. Room 1 (Hallway): Pick up "Brass Key".',
        '3. Room 2 (Locked Vault): Requires "Brass Key" in inventory to open.',
        '4. Room 3 (Treasure Room): Win game!',
        'Test your game loop in terminal.'
      ],
      expectedResult: 'You will build a fully functional, interactive text game using data structures.'
    },
    recall: {
      q: 'What is the difference between a List and a Dictionary in Python?',
      a: 'A List is an ordered sequence of items `[1, 2]`; a Dictionary maps unique keys to values `{"key": "value"}`!'
    },
    takeaways: [
      'Lists store ordered sequences that can be appended, popped, and iterated through.',
      'Dictionaries store structured attributes using fast key-value lookups.',
      'A while game loop keeps programs running interactively until victory or exit conditions.'
    ]
  },

  'ai in money matters': {
    title: 'AI in Money Matters',
    hook: 'How can algorithmic trading bots execute 10,000 stock market trades in a single millisecond faster than human nerve impulses can travel?',
    goal: 'Explore AI in fintech: algorithmic high-frequency trading, credit risk assessment, robo-advisors, and real-time fraud prevention.',
    learnPoints: [
      'Understand Algorithmic Trading: mathematical execution of financial market orders',
      'Learn how Robo-Advisors use Modern Portfolio Theory to automate long-term investing',
      'Discover how credit scoring algorithms evaluate loan default probabilities'
    ],
    analogy: 'Fintech AI is like a digital financial accountant with a million calculators: it tracks market trends 24/7, protects your savings, and catches stolen credit card fraud in milliseconds!',
    explanationHtml: `<h3>Artificial Intelligence in Modern Finance</h3>
<p>The global financial system processes trillions of dollars every day. Financial technology (FinTech) uses machine learning algorithms to automate investments, evaluate loan risks, and protect digital wallets.</p>
<h4>1. Fraud Prevention</h4>
<p>Neural networks analyze transaction geolocation, purchase velocity, and merchant risk scores to block fraudulent card charges instantly.</p>
<h4>2. Robo-Advisors</h4>
<p>Automated platforms balance diversified portfolios across global index funds, reallocating assets automatically based on market movements.</p>`,
    step1: {
      title: '1. Transaction Telemetry Streaming',
      desc: 'Ingest live transaction payloads with timestamps, IP addresses, and merchant codes.',
      detail: 'Processes 50,000 transactions per second.',
      code: 'payload = {"user_id": "U4819", "amount": 1200.0, "device_ip": "192.168.1.1"}'
    },
    step2: {
      title: '2. Real-Time Anomaly Scoring',
      desc: 'Evaluate isolation forest anomaly models to detect deviations from user spending history.',
      detail: 'Scores transaction risk from 0 to 100.',
      code: 'risk_score = fraud_model.predict_anomaly(payload)\n# Risk: 92/100 (Unusual location & large amount)'
    },
    step3: {
      title: '3. Automated Security Interventions',
      desc: 'Block high-risk payments and dispatch instant 2FA push notifications to the user’s phone.',
      detail: 'Prevents financial loss before funds transfer.',
      code: 'if risk_score > 85:\n    block_transaction()\n    send_sms_verification()'
    },
    realScenario: 'A family traveling abroad had their credit card cloned at an airport cafe. The bank’s AI fraud detection flagged a simultaneous attempt to buy expensive jewelry 5,000 miles away 10 minutes later, freezing the transaction instantly.',
    useCases: [
      'Robo-advisors automatically rebalancing investment portfolios to maximize retirement savings',
      'Insurance algorithms estimating car accident repair costs from smartphone bumper photos',
      'Credit scoring models expanding fair micro-loans to small business entrepreneurs without traditional collateral'
    ],
    simCode: 'user_avg_spend = 25.0 # USD\ncurrent_charge = 1500.0 # USD in unknown country\nif current_charge > user_avg_spend * 20:\n    action = "🚨 TRANSACTION FROZEN: Unusual Spending Velocity"\nprint(f"Fintech Security Hub: {action}")',
    simOutput: 'Fintech Security Hub: 🚨 TRANSACTION FROZEN: Unusual Spending Velocity',
    pairs: [
      { id: 'p1', term: 'Robo-Advisor', definition: 'An automated digital investment platform that manages financial portfolios using algorithms' },
      { id: 'p2', term: 'Algorithmic Trading', definition: 'Using computer programs to execute financial market orders at superhuman speed' },
      { id: 'p3', term: 'Credit Risk Scoring', definition: 'Predicting the statistical likelihood that a borrower will repay a loan responsibly' }
    ],
    practice: {
      q: 'What triggers an AI fraud detection alert on a bank account?',
      opts: [
        'A sudden large purchase in a foreign country minutes after a local coffee purchase',
        'Buying groceries at your regular neighborhood store on Tuesday',
        'Checking your account balance on your phone',
        'Depositing a regular paycheck'
      ],
      correct: 0,
      exp: 'Geographical impossibility and unusual purchase amounts indicate stolen card credentials.',
      hint: 'Look for the suspicious activity that contradicts normal user spending habits.'
    },
    quizzes: [
      {
        q: 'How do Robo-Advisors help ordinary individuals save and invest money?',
        opts: [
          { text: 'By automatically building and rebalancing low-cost diversified investment portfolios tailored to individual goals', isCorrect: true },
          { text: 'By printing paper dollar bills at home', isCorrect: false }
        ],
        exp: 'Robo-advisors democratize automated wealth management using modern portfolio algorithms.'
      }
    ],
    practicalTask: {
      title: 'Fintech Risk Scoring Rulebook',
      objective: 'Write 3 automated security rules for a digital wallet application.',
      steps: [
        '1. Rule 1: Flag charge IF amount > $500 AND device is unrecognized.',
        '2. Rule 2: Flag charge IF 3 failed PIN attempts occur within 60 seconds.',
        '3. Rule 3: Flag charge IF location changes by > 500 km in under 1 hour.',
        'Write these 3 rules in clean Python IF statements.'
      ],
      expectedResult: 'You will understand how rule engines and anomaly models protect digital banking.'
    },
    recall: {
      q: 'How does AI protect digital banking and money?',
      a: 'By analyzing transactions in milliseconds to detect fraud, automating smart investments, and securing digital wallets!'
    },
    takeaways: [
      'Fintech AI processes transactions in milliseconds to catch fraudulent activity instantly.',
      'Robo-advisors provide automated, low-cost investment management for families.',
      'Financial algorithms must be audited for fairness to prevent discriminatory lending bias.'
    ]
  },

  'ai for a greener world': {
    title: 'AI for a Greener World',
    hook: 'How can artificial intelligence analyze satellite thermal maps to predict forest wildfires 2 hours before the first flame becomes visible to human lookouts?',
    goal: 'Explore AI for climate action: renewable energy grid optimization, wildlife poaching prevention drones, ocean cleanup, and carbon tracking.',
    learnPoints: [
      'Understand how AI optimizes renewable energy grids (matching wind/solar supply with city demand)',
      'Learn how computer vision camera traps and drones protect endangered wildlife from poachers',
      'Discover AI models predicting extreme weather, melting glaciers, and carbon footprints'
    ],
    analogy: 'Climate AI is like an intelligent planetary nervous system: thousands of satellite and ground sensors report the Earth’s vital signs so we can protect forests, clean oceans, and power cities sustainably!',
    explanationHtml: `<h3>Artificial Intelligence for Planetary Health</h3>
<p>Climate change is the defining engineering challenge of our century. Machine learning is being deployed globally as a powerful conservation accelerator across three critical domains:</p>
<h4>1. Renewable Energy Optimization</h4>
<p>Wind and solar power depend on weather. Deep learning weather models predict wind speeds 48 hours in advance, allowing smart power grids to store clean energy in giant battery banks before wind gusts arrive.</p>
<h4>2. Wildlife Protection & Anti-Poaching</h4>
<p>AI thermal cameras mounted on drones scan African national parks at night, identifying poachers and alerting wildlife rangers in real time.</p>`,
    step1: {
      title: '1. Renewable Energy Forecasting',
      desc: 'Train recurrent neural networks on meteorological satellite data to forecast solar irradiance.',
      detail: 'Predicts megawatts generated per hour.',
      code: 'solar_forecast_mw = weather_ai.predict_solar_output(satellite_cloud_vectors)'
    },
    step2: {
      title: '2. Smart Grid Battery Dispatching',
      desc: 'Automatically charge city grid batteries during excess wind generation and discharge during peak evening demand.',
      detail: 'Eliminates reliance on fossil fuel peaker plants.',
      code: 'if solar_forecast_mw > city_demand:\n    route_excess_power_to_batteries()'
    },
    step3: {
      title: '3. Satellite Deforestation & Biodiversity Monitoring',
      desc: 'Detect illegal logging roads in the Amazon rainforest from weekly synthetic aperture radar (SAR) scans.',
      detail: 'Alerts conservation authorities within hours.',
      code: 'if detect_tree_cover_loss(satellite_tile):\n    dispatch_ranger_alert(coordinates)'
    },
    realScenario: 'Conservation biologists deployed an AI acoustic monitoring network across a tropical rainforest. The AI recognized the sound of chainsaws and gunshot audio from 2 miles away, alerting rangers who intercepted illegal loggers and protected 5,000 hectares of virgin rainforest.',
    useCases: [
      'DeepMind AI optimizing Google data center cooling systems, reducing electricity consumption by 40%',
      'The Ocean Cleanup using computer vision cameras on ships to map floating plastic gyres in the Pacific Ocean',
      'NASA climate satellites tracking ice shelf melting rates in Greenland with millimeter laser radar'
    ],
    simCode: 'solar_generation = 450 # Megawatts (Sunny day)\ncity_demand = 320 # Megawatts\nexcess = solar_generation - city_demand\nprint(f"Clean Energy Grid: Demand satisfied 100% ☀️ | Storing {excess} MW in Green Batteries 🔋")',
    simOutput: 'Clean Energy Grid: Demand satisfied 100% ☀️ | Storing 130 MW in Green Batteries 🔋',
    pairs: [
      { id: 'p1', term: 'Smart Grid', definition: 'An electricity network that uses digital technology and AI to balance clean renewable power dynamically' },
      { id: 'p2', term: 'Acoustic Monitoring', definition: 'Using AI microphones in forests to detect chainsaws, gunshots, or animal species calls' },
      { id: 'p3', term: 'Carbon Footprint', definition: 'The total amount of greenhouse gases generated by human actions and products' }
    ],
    practice: {
      q: 'How does AI help renewable wind and solar power integrate into city electrical grids?',
      opts: [
        'By predicting wind speeds and sunlight hours in advance so energy grids can store clean power in batteries before it is needed',
        'By making the sun shine at night',
        'By blowing wind with giant fans',
        'By turning all light switches off'
      ],
      correct: 0,
      exp: 'Accurate predictive forecasting allows smart grids to balance intermittent renewable energy reliably.',
      hint: 'Think about predicting weather and storing excess solar power.'
    },
    quizzes: [
      {
        q: 'How do acoustic AI listening devices protect endangered tropical rainforests?',
        opts: [
          { text: 'By listening 24/7 for the sounds of illegal chainsaws and gunshots and alerting rangers instantly', isCorrect: true },
          { text: 'By singing songs to the monkeys', isCorrect: false }
        ],
        exp: 'Acoustic neural networks detect illegal logging sounds through dense forest canopies.'
      }
    ],
    practicalTask: {
      title: 'Green Tech Energy Optimizer Simulation',
      objective: 'Calculate how an AI controller manages a solar farm and battery storage.',
      steps: [
        '1. Hour 12:00 (Noon): Solar produces 500 MW, City needs 350 MW. (Store 150 MW in Battery).',
        '2. Hour 20:00 (Night): Solar produces 0 MW, City needs 400 MW. (Discharge 150 MW from Battery).',
        '3. Calculate how much fossil fuel energy was replaced by stored solar power.',
        'Write 2 sentences on how batteries and AI enable 24/7 clean energy.'
      ],
      expectedResult: 'You will understand how smart grid load balancing powers sustainable modern cities.'
    },
    recall: {
      q: 'How does AI fight climate change?',
      a: 'By predicting clean energy output, protecting forests from illegal logging, and optimizing energy efficiency in cities!'
    },
    takeaways: [
      'AI optimizes renewable wind and solar energy, reducing reliance on fossil fuels.',
      'Acoustic and satellite monitoring protect wildlife and rainforests from illegal exploitation.',
      'Applying machine learning to planetary data is vital for global climate resilience.'
    ]
  },

  'career compass: ai': {
    title: 'Career Compass: AI',
    hook: 'What does an AI Safety Officer or a Computational Neuroscientist actually do all day, and how do you prepare for careers that blend technology with humanities?',
    goal: 'Navigate emerging AI careers: AI Ethics & Safety, Prompt Architecture, Robotics Simulation, and Human-AI Interaction Design.',
    learnPoints: [
      'Explore emerging career profiles: AI Safety Researcher, Prompt Engineer, Bio-Informatics Analyst',
      'Understand the educational pathways: Computer Science, Mathematics, Cognitive Science, and Philosophy',
      'Learn how to build open-source contributions and technical problem-solving projects'
    ],
    analogy: 'Your career compass is like a multi-tool gadget: instead of having just one blade, you equip yourself with coding logic, clear writing, and human empathy so you can adapt to any new frontier!',
    explanationHtml: `<h3>Navigating the AI Career Frontier</h3>
<p>The AI revolution is creating new professions at the intersection of computer science, humanities, law, and biology:</p>
<h4>1. AI Safety & Alignment Researcher</h4>
<p>Ensures that advanced artificial intelligence systems remain aligned with human values, safe, honest, and controllable.</p>
<h4>2. Human-AI Interaction (HAI) Designer</h4>
<p>Designs intuitive conversational interfaces, voice interactions, and collaborative workbenches that make AI easy and empowering for humans to use.</p>`,
    step1: {
      title: '1. Mapping Your Passion Intersection',
      desc: 'Combine a human domain (e.g. Medicine, Space, Art) with an AI technical pillar (Vision, NLP, Robotics).',
      detail: 'Unlocks niche professional superpowers.',
      code: 'career_path = {"Domain": "Astrophysics", "AI_Specialization": "Computer Vision Galaxy Mapping"}'
    },
    step2: {
      title: '2. Curating Foundations & Mathematics',
      desc: 'Build competence in linear algebra, statistics, Python programming, and data structures.',
      detail: 'Core math stays relevant across decades.',
      code: 'core_competencies = ["Calculus", "Linear Algebra", "Python", "Ethical Reasoning"]'
    },
    step3: {
      title: '3. Building Real-World Solutions',
      desc: 'Deploy working demo web applications that solve real community challenges.',
      detail: 'Demonstrates tangible impact.',
      code: 'deploy_portfolio_app("Community Solar Sharing Platform")'
    },
    realScenario: 'A university graduate combined their love of linguistics and Python to become an NLP Prompt Architect at a major health tech startup, designing medical chatbots that explain lab results in simple, reassuring language.',
    useCases: [
      'AI Alignment Researchers testing large models for honesty, safety, and helpfulness',
      'Bio-Informatics Scientists discovering new antibiotic candidates from genomic datasets',
      'Robotics Simulation Engineers testing autonomous drones in photorealistic virtual physics worlds'
    ],
    simCode: 'skills = ["Python 🐍", "Statistics 📊", "Empathy 💡", "Creativity 🎨"]\nprint("My AI Career Compass Toolbox:")\nfor s in skills:\n    print(f"  ✓ {s}")',
    simOutput: 'My AI Career Compass Toolbox:\n  ✓ Python 🐍\n  ✓ Statistics 📊\n  ✓ Empathy 💡\n  ✓ Creativity 🎨',
    pairs: [
      { id: 'p1', term: 'AI Alignment', definition: 'The scientific subfield ensuring AI systems pursue human goals safely and ethically' },
      { id: 'p2', term: 'Bio-Informatics', definition: 'Combining biology, genetics, and computer science to analyze biological data' },
      { id: 'p3', term: 'HAI Design', definition: 'Human-AI Interaction design focused on making smart systems intuitive, safe, and helpful' }
    ],
    practice: {
      q: 'What is the primary responsibility of an AI Safety and Alignment Researcher?',
      opts: [
        'Ensuring that artificial intelligence models behave safely, truthfully, and in alignment with human values and ethics',
        'Selling computers in a shopping mall',
        'Replacing all human teachers with robots',
        'Writing computer viruses'
      ],
      correct: 0,
      exp: 'AI safety researchers develop mathematical safeguards, red-teaming protocols, and alignment benchmarks.',
      hint: 'Look for the role centered on human values, ethics, and safety.'
    },
    quizzes: [
      {
        q: 'Why is combining non-tech passions (like biology, art, or psychology) with coding so valuable in tech careers?',
        opts: [
          { text: 'Because the greatest technological breakthroughs happen when AI tools are applied to solve domain challenges in healthcare, arts, and society', isCorrect: true },
          { text: 'Because computer scientists are not allowed to study art', isCorrect: false }
        ],
        exp: 'Interdisciplinary domain experts drive the most impactful real-world applications of AI.'
      }
    ],
    practicalTask: {
      title: 'AI Career Intersection Blueprint',
      objective: 'Design your dream tech career by intersecting 1 human passion with 1 AI technology.',
      steps: [
        '1. Human Passion: (e.g. Wildlife Protection / Deep Ocean).',
        '2. AI Technology: (e.g. Computer Vision / Autonomous Drones).',
        '3. Invented Career Title: (e.g. Marine Biodiversity AI Specialist).',
        '4. Describe 1 project you will build in this role.'
      ],
      expectedResult: 'You will connect personal passions to high-impact future technological careers.'
    },
    recall: {
      q: 'What is AI Alignment?',
      a: 'The scientific field ensuring that AI systems act safely, truthfully, and benefit humanity!'
    },
    takeaways: [
      'Emerging careers like AI Safety, Prompt Engineering, and HAI Design combine tech with ethics and design.',
      'Strong foundations in mathematics, Python, and communication prepare you for lifelong adaptability.',
      'Intersecting your unique passions with code is the secret to building an extraordinary career.'
    ]
  },

  'skills that matter': {
    title: 'Skills That Matter',
    hook: 'When an AI can generate thousands of lines of Python code in 5 seconds, why is human critical reasoning and code review more important than ever?',
    goal: 'Master meta-cognitive skills: code debugging, prompt auditing, algorithmic bias detection, and cross-functional team communication.',
    learnPoints: [
      'Learn systematic debugging strategies: print tracing, breakpoint inspection, and unit testing',
      'Understand how to audit AI-generated code for security vulnerabilities and logical edge cases',
      'Master technical writing and documenting architectures for human collaboration'
    ],
    analogy: 'Reviewing AI code is like being the chief flight safety inspector of an airplane: the factory robots built the wings, but you inspect every bolt and rivet before passengers board!',
    explanationHtml: `<h3>Meta-Skills for the AI Era</h3>
<p>As automated code generation tools become widespread, the role of human engineers evolves from manual syntax typists to <strong>System Architects and Code Auditors</strong>. You must be able to verify, test, and debug complex software architectures.</p>
<h4>Systematic Debugging Protocol</h4>
<ul>
  <li><strong>1. Reproduce:</strong> Find the exact input that triggers the failure.</li>
  <li><strong>2. Isolate:</strong> Narrow the bug down to a single function or loop.</li>
  <li><strong>3. Hypothesize & Fix:</strong> Understand the root cause before changing code.</li>
  <li><strong>4. Test Regression:</strong> Verify that the fix didn't break other features.</li>
</ul>`,
    step1: {
      title: '1. Bug Reproduction & Isolation',
      desc: 'Write automated unit tests with pytest that trigger the erroneous state consistently.',
      detail: 'Isolates the bug in a controlled test case.',
      code: 'def test_division_by_zero():\n    assert safe_divide(10, 0) == "ERROR: Division by zero"'
    },
    step2: {
      title: '2. Security & Edge Case Auditing',
      desc: 'Audit AI code for boundary vulnerabilities, unvalidated inputs, and memory leaks.',
      detail: 'Ensures software resilience.',
      code: 'def validate_user_input(user_id: str):\n    if not user_id.isalnum(): raise ValueError("Invalid characters")'
    },
    step3: {
      title: '3. Technical Documentation & Mentorship',
      desc: 'Document code logic with clean docstrings, architecture diagrams, and changelogs.',
      detail: 'Facilitates seamless team collaboration.',
      code: '"""Module: Payment Gateway Adapter\nAuthor: Engineering Team\nAudited for PCI-DSS Compliance."""'
    },
    realScenario: 'A software engineer used an AI assistant that suggested code with an unvalidated SQL query. The engineer caught the security flaw during code review, rewrote it with parameterized queries, and prevented a major database breach.',
    useCases: [
      'Lead engineers conducting peer code reviews on mission-critical banking code',
      'Cybersecurity teams fuzz-testing AI generated code for buffer overflows',
      'Open-source maintainers auditing external code contributions for safety'
    ],
    simCode: 'code_status = {"Syntax Clean": True, "Security Audited": True, "Unit Tests Passing": True}\nif all(code_status.values()):\n    print("✅ Code Review Approved: Safe for Production Deployment! 🚀")',
    simOutput: '✅ Code Review Approved: Safe for Production Deployment! 🚀',
    pairs: [
      { id: 'p1', term: 'Unit Testing', definition: 'Writing small automated test functions to verify that individual code modules work correctly' },
      { id: 'p2', term: 'Code Review', definition: 'The professional practice of having human engineers inspect and audit code before merging' },
      { id: 'p3', term: 'Regression Bug', definition: 'A new bug introduced accidentally while trying to fix an older piece of code' }
    ],
    practice: {
      q: 'What is the purpose of writing automated Unit Tests in Python with pytest?',
      opts: [
        'To verify that individual functions produce correct outputs across various inputs and catch bugs automatically',
        'To make the computer type slower',
        'To delete old files from the hard drive',
        'To test if the monitor is plugged in'
      ],
      correct: 0,
      exp: 'Unit testing verifies that modular functions perform reliably according to specifications.',
      hint: 'Think about testing individual functions automatically.'
    },
    quizzes: [
      {
        q: 'Why is human code review essential when using AI coding assistants?',
        opts: [
          { text: 'Because AI assistants can generate subtle logical bugs, security flaws, or outdated syntax that require human expert verification', isCorrect: true },
          { text: 'Because AI code always self-destructs after 5 minutes', isCorrect: false }
        ],
        exp: 'Human oversight verifies security, architectural fit, and logical correctness in AI code.'
      }
    ],
    practicalTask: {
      title: 'Code Review & Debugging Challenge',
      objective: 'Find and fix the bug in a broken average calculation function.',
      steps: [
        '1. Broken Code: `def calc_avg(scores): return sum(scores) / len(scores)`',
        '2. Edge Case: What happens if `scores = []` (empty list)? (ZeroDivisionError!).',
        '3. Fix: Add `if len(scores) == 0: return 0.0`.',
        '4. Write a unit test verifying the fix.'
      ],
      expectedResult: 'You will master defensive programming and edge-case handling.'
    },
    recall: {
      q: 'What is Defensive Programming?',
      a: 'Writing code that anticipates unexpected inputs, handles errors gracefully, and never crashes!'
    },
    takeaways: [
      'Human critical thinking, debugging, and code review are more essential than ever.',
      'Writing automated unit tests ensures your software remains bug-free as it grows.',
      'Defensive programming handles boundary edge cases and protects software security.'
    ]
  },

  'ai content creator': {
    title: 'AI Content Creator',
    hook: 'How can you transform a 10-page dense science paper on black holes into an engaging 60-second animated video script with a matching podcast voiceover?',
    goal: 'Master generative content workflows: multi-format repurposing, prompt chaining, voice cloning synthesis, and video storyboarding.',
    learnPoints: [
      'Learn Prompt Chaining: linking the output of one AI model into the input of another',
      'Understand Neural Voice Synthesis (TTS): converting text scripts into natural expressive audio',
      'Repurpose long-form educational content into social infographics, podcasts, and video scripts'
    ],
    analogy: 'Content creation with AI is like running a multimedia newsroom: you are the Editor-in-Chief who directs researchers, scriptwriters, voice actors, and graphic illustrators to produce a viral educational series!',
    explanationHtml: `<h3>The Modern Content Creation Pipeline</h3>
<p>Content creators and educators use <strong>Prompt Chaining</strong> to transform complex research into accessible, engaging multimedia across platforms.</p>
<h4>The 3-Step Content Pipeline</h4>
<ul>
  <li><strong>1. Distillation:</strong> LLMs extract the 3 core takeaways from academic papers.</li>
  <li><strong>2. Scriptwriting:</strong> Transforming key takeaways into an engaging conversational script with hook, story, and punchline.</li>
  <li><strong>3. Voice & Visual Synthesis:</strong> Neural text-to-speech models generate voiceovers while diffusion models render illustrative storyboards.</li>
</ul>`,
    step1: {
      title: '1. Text Summarization & Key Takeaways',
      desc: 'Distill long articles into structured JSON outlines with core hooks and analogies.',
      detail: 'Extracts high-signal insights.',
      code: 'prompt_1 = "Summarize the James Webb telescope exoplanet findings into 3 bite-sized facts."'
    },
    step2: {
      title: '2. Conversational Scriptwriting',
      desc: 'Prompt chain the summary into a fast-paced 60-second video script with visual cues.',
      detail: 'Includes timing and camera angles.',
      code: 'prompt_2 = f"Using {summary}, write a 60-second video script with [Visual Action] markers."'
    },
    step3: {
      title: '3. Neural Voice Synthesis (TTS)',
      desc: 'Synthesize expressive, natural narration audio using models like ElevenLabs or Bark.',
      detail: 'Generates broadcast-quality MP3 audio.',
      code: 'audio_stream = tts_engine.generate_voice(script_text, voice_id="Warm_Narrator")'
    },
    realScenario: 'A science teacher used prompt chaining to convert textbook chapters into 2-minute illustrated animated video lessons. Student quiz scores rose 24% because the visual lessons made complex chemistry engaging.',
    useCases: [
      'Educational channels creating animated science explainer videos with AI narration',
      'Podcasters generating show notes, chapter timestamps, and transcripts automatically',
      'Journalists repurposing investigative articles into interactive visual carousels'
    ],
    simCode: 'pipeline = ["1. Research Distilled 📄", "2. Script Chained 📝", "3. Voice Synthesized 🎙️", "4. Visuals Rendered 🎬"]\nfor p in pipeline:\n    print(f"Content Studio: {p}")',
    simOutput: 'Content Studio: 1. Research Distilled 📄\nContent Studio: 2. Script Chained 📝\nContent Studio: 3. Voice Synthesized 🎙️\nContent Studio: 4. Visuals Rendered 🎬',
    pairs: [
      { id: 'p1', term: 'Prompt Chaining', definition: 'Feeding the output of one AI step directly into the next prompt to build complex workflows' },
      { id: 'p2', term: 'Neural TTS (Text-to-Speech)', definition: 'Deep learning models that convert written text into natural, expressive human-sounding speech' },
      { id: 'p3', term: 'Content Repurposing', definition: 'Adapting one core piece of research into multiple formats (article, video, podcast, infographic)' }
    ],
    practice: {
      q: 'What is "Prompt Chaining" in generative AI workflows?',
      opts: [
        'Taking the output of one AI prompt and feeding it as input into a second specialized prompt to create complex workflows',
        'Typing the same prompt 100 times in a row',
        'Locking a computer with a metal chain',
        'Deleting all prompts from memory'
      ],
      correct: 0,
      exp: 'Prompt chaining connects modular AI transformations (e.g. Extract → Script → Translate) sequentially.',
      hint: 'Think about linking steps together in a chain.'
    },
    quizzes: [
      {
        q: 'How does Neural Text-to-Speech (TTS) differ from old robotic computer voices?',
        opts: [
          { text: 'Neural TTS models model human vocal tract physics, natural pitch inflections, and breath pauses for realistic expression', isCorrect: true },
          { text: 'Neural TTS uses real cassette tapes inside the server', isCorrect: false }
        ],
        exp: 'Deep learning audio synthesis generates natural prosody, emotion, and cadence.'
      }
    ],
    practicalTask: {
      title: 'Prompt Chained Explainer Sprint',
      objective: 'Write a 2-step prompt chain that converts a science fact into a video script.',
      steps: [
        'Fact: "Octopuses have 3 hearts and blue copper-based blood."',
        'Prompt 1: Write a catchy 3-second hook for a YouTube Short.',
        'Prompt 2: Chain that hook into a 30-second script with 2 visual scene descriptions.',
        'Read your script aloud with timing.'
      ],
      expectedResult: 'You will master the prompt chaining pipeline used by top digital creators.'
    },
    recall: {
      q: 'What is Prompt Chaining?',
      a: 'Linking multiple AI prompts together so the output of one step becomes the input for the next creative task!'
    },
    takeaways: [
      'Generative pipelines transform complex technical research into engaging multimedia.',
      'Prompt chaining connects summarization, scriptwriting, and voiceover synthesis seamlessly.',
      'Human curation and original storytelling are the soul of captivating digital content.'
    ]
  },

  'ai learning assistant': {
    title: 'AI Learning Assistant',
    hook: 'How can you build a personalized Python study assistant that quizzes you on your hardest biology topics and tracks your memory retention over 30 days?',
    goal: 'Build an AI study assistant tool in Python: implementing spaced repetition (Leitner box system), flashcard decks, and active memory retrieval.',
    learnPoints: [
      'Learn the Leitner Spaced Repetition Box Algorithm in Python',
      'Implement JSON file persistence for saving student study streaks and scores',
      'Build an interactive CLI flashcard trainer with difficulty tracking'
    ],
    analogy: 'A spaced repetition study system is like a personal memory coach: it tests you on flashcards right before your brain is about to forget them, locking them permanently into long-term memory!',
    explanationHtml: `<h3>The Science of Spaced Repetition (The Leitner System)</h3>
<p>Hermann Ebbinghaus discovered the <strong>Forgetting Curve</strong>: humans forget 50% of new information within 24 hours unless they actively review it. The <strong>Leitner Box System</strong> optimizes study time by reviewing difficult flashcards frequently (every day) while easy flashcards are reviewed less often (once a week).</p>`,
    step1: {
      title: '1. Structuring Flashcard Deck Schema',
      desc: 'Model flashcards as JSON dictionaries with question, answer, box level (1-5), and last review date.',
      detail: 'Enables programmatic spaced scheduling.',
      code: 'deck = [\n    {"id": 1, "q": "What organelle produces ATP?", "a": "Mitochondria", "box": 1},\n    {"id": 2, "q": "What is the powerhouse of the cell?", "a": "Mitochondria", "box": 3}\n]'
    },
    step2: {
      title: '2. Leitner Box Transition Logic',
      desc: 'Promote correct answers to Box N+1; demote incorrect answers back to Box 1 for immediate daily review.',
      detail: 'Focuses study time on weak points.',
      code: 'def process_answer(card, is_correct: bool):\n    if is_correct:\n        card["box"] = min(5, card["box"] + 1)\n    else:\n        card["box"] = 1 # Reset to daily practice'
    },
    step3: {
      title: '3. JSON File Persistence',
      desc: 'Save and load the flashcard deck state to local disk using Python’s `json` library.',
      detail: 'Maintains progress across study sessions.',
      code: 'import json\nwith open("my_study_deck.json", "w") as f:\n    json.dump(deck, f, indent=2)'
    },
    realScenario: 'A student coded a 60-line Python Leitner flashcard trainer for their 100 Spanish vocabulary words. By studying 10 minutes a day using the algorithm, they scored 100% on their final exam with zero last-minute cramming.',
    useCases: [
      'Language learning apps (like Anki and Duolingo) scheduling vocabulary reviews using spaced repetition algorithms',
      'Medical students memorizing 5,000 anatomy terms using digital flashcard systems',
      'Flight pilots reviewing emergency cockpit checklists on tablet study trainers'
    ],
    simCode: 'card = {"q": "What is the speed of light?", "a": "300,000 km/s", "box": 1}\n# Student answered correctly!\ncard["box"] += 1\nprint(f"🎉 Correct! Card promoted to Box {card[\'box\']} → Next review in 3 days 📅")',
    simOutput: '🎉 Correct! Card promoted to Box 2 → Next review in 3 days 📅',
    pairs: [
      { id: 'p1', term: 'Spaced Repetition', definition: 'A memory technique where reviews are spaced at increasing intervals of time to cement long-term memory' },
      { id: 'p2', term: 'Leitner System', definition: 'A flashcard method where correct answers move to higher boxes (studied less often) and mistakes reset to Box 1' },
      { id: 'p3', term: 'Forgetting Curve', definition: 'The mathematical decline of memory retention over time when no attempt is made to review' }
    ],
    practice: {
      q: 'In the Leitner Box spaced repetition algorithm, what happens to a flashcard when you answer it INCORRECTLY?',
      opts: [
        'It is moved back to Box 1 so you practice it frequently until mastered',
        'It is deleted forever from the computer',
        'It is moved to Box 5 and never studied again',
        'The computer sounds a loud siren'
      ],
      correct: 0,
      exp: 'Mistakes reset cards to Box 1 for intensive daily review until long-term memory is established.',
      hint: 'Think about how you need to practice difficult cards more often.'
    },
    quizzes: [
      {
        q: 'Why is Spaced Repetition 300% more effective than last-minute cramming before an exam?',
        opts: [
          { text: 'Because reviewing right before memory decays strengthens synaptic neural pathways permanently for long-term retention', isCorrect: true },
          { text: 'Because cramming uses too much electricity', isCorrect: false }
        ],
        exp: 'Spaced memory retrieval stimulates memory consolidation in the brain.'
      }
    ],
    practicalTask: {
      title: 'Python Flashcard Engine Project',
      objective: 'Write a Python script that quizzes 3 flashcards and updates their box score.',
      steps: [
        '1. Create a list of 3 flashcard dictionaries.',
        '2. Loop through each card and prompt user for answer.',
        '3. IF answer matches: print "Correct! +1 Box".',
        '4. ELSE: print "Incorrect! Reset to Box 1".',
        '5. Print final box levels.'
      ],
      expectedResult: 'You will build a working spaced repetition learning assistant in Python.'
    },
    recall: {
      q: 'What is the Leitner Flashcard System?',
      a: 'A study method where mastered cards move to higher boxes studied less often, and mistakes return to Box 1 for daily practice!'
    },
    takeaways: [
      'The Forgetting Curve is defeated by spaced, active retrieval of concepts.',
      'The Leitner algorithm optimizes study time by focusing effort on your weakest flashcards.',
      'Building your own study tools in Python combines programming skills with academic mastery.'
    ]
  },

  'fact, fake or ai?': {
    title: 'Fact, Fake or AI?',
    hook: 'If someone sends you an audio voice recording of your principal announcing that school is canceled for a month, how do you verify if the voice is authentic or cloned by AI?',
    goal: 'Master digital forensics: acoustic voice cloning analysis, synthetic speech detection, reverse audio search, and digital media verification.',
    learnPoints: [
      'Learn how neural voice cloning models synthesize speech from 3-second audio samples',
      'Identify acoustic synthetic artifacts: robotic pitch monotone, missing breath sounds, unnatural cadence',
      'Understand ethical verification protocols for audio and video media'
    ],
    analogy: 'Detecting synthetic audio is like listening to a music box vs a live violinist: the live violinist has natural breath pauses, finger scrapes on strings, and emotional dynamics that machines struggle to imitate!',
    explanationHtml: `<h3>Forensics of Voice Cloning & Synthetic Audio</h3>
<p>Modern neural audio synthesis models (like VALL-E and ElevenLabs) can clone a human voice with remarkable fidelity from just a short audio clip. Becoming an audio forensic detective requires listening for specific acoustic anomalies.</p>
<h4>Acoustic Clues of Cloned Audio</h4>
<ul>
  <li><strong>1. Missing Breath Inhalations:</strong> Humans naturally inhale before long sentences; AI audio often lacks biological breath dynamics.</li>
  <li><strong>2. Flat Pitch Monotone:</strong> Synthetic voices struggle with genuine emotional micro-intonations during excitement or urgency.</li>
  <li><strong>3. Background Noise Splicing:</strong> Sudden cuts in ambient background room room noise reveal audio stitching.</li>
</ul>`,
    step1: {
      title: '1. Acoustic Waveform & Spectrogram Analysis',
      desc: 'Inspect audio frequencies using spectrogram tools (like Audacity) to spot unnatural frequency cuts.',
      detail: 'Synthetic audio exhibits distinct spectral banding.',
      code: 'spectrogram = compute_mel_spectrogram(audio_sample)\n# Check for high-frequency cutoff artifacts'
    },
    step2: {
      title: '2. Multi-Channel Corroboration Protocol',
      desc: 'Never rely on an isolated audio file received via messaging apps. Call the official school office directly.',
      detail: 'Direct verification defeats impersonation.',
      code: 'if is_unverified_audio_source(audio_clip):\n    confirm_via_official_phone_channel()'
    },
    step3: {
      title: '3. Digital Signature & Watermarking',
      desc: 'Verify if the audio payload includes cryptographic C2PA provenance metadata signatures.',
      detail: 'Verifies recording chain of custody.',
      code: 'provenance = verify_c2pa_audio_signature(audio_file)'
    },
    realScenario: 'A family received an urgent phone call that sounded like their cousin asking for emergency money. The family remembered the AI Voice Cloning rule, asked the caller a secret family question that only the real cousin would know, and exposed the scam immediately.',
    useCases: [
      'Banking voice authentication systems using biometric liveness detection to block voice clones',
      'Journalists verifying leaked political audio recordings before reporting breaking news',
      'Courtrooms using audio forensic experts to authenticate evidence recordings'
    ],
    simCode: 'audio_analysis = {"breath_pauses_present": False, "frequency_cut_at_16khz": True, "cadence_robotic": True}\nif not audio_analysis["breath_pauses_present"] and audio_analysis["frequency_cut_at_16khz"]:\n    print("🚨 FORENSIC ALERT: High probability of Synthetic AI Voice Cloning!")',
    simOutput: '🚨 FORENSIC ALERT: High probability of Synthetic AI Voice Cloning!',
    pairs: [
      { id: 'p1', term: 'Voice Cloning', definition: 'Using deep learning models to replicate a person’s exact vocal pitch, accent, and tone from sample audio' },
      { id: 'p2', term: 'Spectrogram', definition: 'A visual heat map showing how audio frequencies change over time' },
      { id: 'p3', term: 'Out-of-Band Verification', definition: 'Confirming suspicious messages by calling the person directly through a trusted, known phone number' }
    ],
    practice: {
      q: 'If you receive an urgent voice message from a friend asking for money, what is the safest first step?',
      opts: [
        'Call your friend directly on their known phone number to verify, or ask a question only your real friend knows',
        'Send money immediately without asking questions',
        'Forward the voice message to all your social media followers',
        'Post your credit card number in the chat'
      ],
      correct: 0,
      exp: 'Out-of-band direct verification protects against AI voice cloning impersonation scams.',
      hint: 'Think about verifying directly with the person via a trusted phone call.'
    },
    quizzes: [
      {
        q: 'What acoustic clue often reveals that a voice recording is synthetic AI audio?',
        opts: [
          { text: 'Lack of natural biological breath pauses, robotic pitch monotone, and spectral frequency cuts', isCorrect: true },
          { text: 'The voice speaking in English', isCorrect: false }
        ],
        exp: 'Synthetic speech models often lack biological breathing sounds and dynamic human vocal inflections.'
      }
    ],
    practicalTask: {
      title: 'Family Safe Word Protocol',
      objective: 'Establish a private family verification protocol to protect against voice cloning scams.',
      steps: [
        '1. Agree on a private, memorable "Family Safe Word" with your parents.',
        '2. Rule: If anyone ever calls claiming an emergency, they must state the safe word.',
        '3. Never write the safe word on social media or in public chats.',
        'Discuss why this simple habit provides 100% security against voice scams.'
      ],
      expectedResult: 'You will implement a real-world cybersecurity protocol that protects your family.'
    },
    recall: {
      q: 'What is Out-of-Band Verification?',
      a: 'Verifying a suspicious message by calling the person directly through a known, trusted phone number!'
    },
    takeaways: [
      'Voice cloning AI can imitate voices from short audio clips, requiring heightened vigilance.',
      'Listen for acoustic anomalies: missing breaths, unnatural pitch cadence, and frequency cutoffs.',
      'Always verify emergency claims through direct phone calls and private family safe words.'
    ]
  },

  'fairness matters': {
    title: 'Fairness Matters',
    hook: 'If a computer vision facial recognition model is tested in a tech lab and works 99% of the time on light-skinned men, but fails 35% of the time on darker-skinned women, why did this happen?',
    goal: 'Understand algorithmic bias, fairness metrics, disparate impact, demographic representation in datasets, and ethical AI governance.',
    learnPoints: [
      'Learn the landmark "Gender Shades" MIT study by Joy Buolamwini on facial recognition bias',
      'Understand how historical bias and unrepresentative datasets create discriminatory algorithms',
      'Master fairness auditing: testing models across diverse demographic cohorts'
    ],
    analogy: 'Training an AI on an unrepresentative dataset is like testing a winter coat only in a warm heated room: when someone wears it in a freezing snowstorm, the coat fails completely because it was never tested in real-world diversity!',
    explanationHtml: `<h3>The Fight for Algorithmic Fairness</h3>
<p>Computer algorithms are not automatically objective or neutral. They reflect the biases, blind spots, and historical inequalities present in their training datasets.</p>
<h4>The Landmark "Gender Shades" Study</h4>
<p>MIT researcher <strong>Joy Buolamwini</strong> discovered that commercial facial analysis models from major tech companies had error rates of only 0.8% on light-skinned men, but error rates of up to 34.7% on darker-skinned women. Why? Because the training datasets were over 75% male and over 80% light-skinned!</p>`,
    step1: {
      title: '1. Demographic Parity Audit',
      desc: 'Evaluate model accuracy, false positive rates, and false negative rates across all demographic subgroups.',
      detail: 'Exposes hidden performance disparities.',
      code: 'def audit_fairness_parity(model, test_dataset):\n    for group in ["Group_A", "Group_B", "Group_C"]:\n        group_acc = model.evaluate(test_dataset[group])\n        print(f"Accuracy for {group}: {group_acc:.2f}%")'
    },
    step2: {
      title: '2. Dataset Rebalancing & Augmentation',
      desc: 'Collect balanced, representative training samples across all skin tones, genders, and age groups.',
      detail: 'Eliminates structural representation gaps.',
      code: 'balanced_dataset = rebalance_classes(raw_data, target_equal_distribution=True)'
    },
    step3: {
      title: '3. Continuous Ethical Governance & Transparency',
      desc: 'Publish Model Cards detailing intended use, limitations, and demographic evaluation benchmarks.',
      detail: 'Ensures public accountability.',
      code: 'publish_model_card("FaceClassifier_v2", ethical_audit_passed=True)'
    },
    realScenario: 'A major university admissions office tested an AI resume screening tool and discovered it penalized student resumes that mentioned "women’s robotics club" because the historical hiring training data was 85% male. The university canceled the tool and instituted strict algorithmic fairness audits.',
    useCases: [
      'Facial recognition auditing ensuring airport biometric gates work equally well for all travelers',
      'Medical diagnostic algorithms trained on diverse skin tones to detect melanoma in all patients',
      'Speech recognition models trained on regional accents to ensure voice assistants understand all dialects'
    ],
    simCode: 'group_a_accuracy = 98.5\ngroup_b_accuracy = 97.9\nfairness_gap = abs(group_a_accuracy - group_b_accuracy)\nif fairness_gap < 2.0:\n    print(f"✅ Model Certified Fair: Fairness Gap is only {fairness_gap:.1f}% (Within Ethical Limits)")',
    simOutput: '✅ Model Certified Fair: Fairness Gap is only 0.6% (Within Ethical Limits)',
    pairs: [
      { id: 'p1', term: 'Algorithmic Bias', definition: 'Systematic, repeatable errors in computer systems that create unfair outcomes for certain groups' },
      { id: 'p2', term: 'Model Card', definition: 'A standard document that explains an AI model’s performance, training data, and fairness benchmarks' },
      { id: 'p3', term: 'Demographic Parity', definition: 'Ensuring that an algorithm performs with equal accuracy and fairness across all demographic groups' }
    ],
    practice: {
      q: 'Why did commercial facial recognition algorithms tested in the "Gender Shades" study fail on darker-skinned women?',
      opts: [
        'Because the training datasets used by the companies were overwhelmingly composed of photos of light-skinned males',
        'Because cameras cannot take photos of women',
        'Because computers only understand blue pixels',
        'Because darker colors cannot be processed by mathematics'
      ],
      correct: 0,
      exp: 'Under-representation in training datasets causes neural networks to learn inadequate feature weights for minority groups.',
      hint: 'Think about who was included in the original training photos.'
    },
    quizzes: [
      {
        q: 'What is an AI "Model Card"?',
        opts: [
          { text: 'A transparent public document detailing an AI system’s intended purpose, limitations, training data diversity, and fairness audit scores', isCorrect: true },
          { text: 'A plastic credit card used to buy computers', isCorrect: false }
        ],
        exp: 'Model cards standardize transparency and accountability in machine learning releases.'
      }
    ],
    practicalTask: {
      title: 'Algorithmic Fairness Audit Simulation',
      objective: 'Calculate the fairness gap of a speech recognition model across 3 dialect groups.',
      steps: [
        '1. Dialect A Accuracy: 96%.',
        '2. Dialect B Accuracy: 94%.',
        '3. Dialect C Accuracy: 71%.',
        '4. Identify the fairness failure (Dialect C: 25% gap!).',
        'Write 2 concrete steps the engineering team must take to fix Dialect C.'
      ],
      expectedResult: 'You will learn how to conduct quantitative algorithmic fairness evaluations.'
    },
    recall: {
      q: 'What causes algorithmic bias in AI?',
      a: 'Unbalanced, unrepresentative training datasets that reflect historical inequalities and blind spots!'
    },
    takeaways: [
      'Algorithms are only as fair as the data and human oversight used to train them.',
      'Auditing models across demographic groups is essential to prevent discrimination.',
      'Transparency, Model Cards, and diverse engineering teams build trustworthy, inclusive technology.'
    ]
  }
}
