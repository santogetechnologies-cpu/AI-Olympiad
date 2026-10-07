// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 5 (12 DISTINCT LESSONS)
// Foundations of Smart Computing • Ages 10-11
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS5_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'the secret behind ai': {
    title: 'The Secret Behind AI',
    hook: 'How does an AI recognize a picture of a cat it has never seen before? Does a programmer write 10 million IF statements?',
    goal: 'Understand the secret of machine learning: how computers learn from training data examples rather than fixed manual rules.',
    learnPoints: [
      'Understand how traditional programming differs from machine learning',
      'Learn what a training dataset is: showing thousands of labeled examples',
      'Discover how weights and pattern recognition allow computers to generalize'
    ],
    analogy: 'Traditional programming is like following a rigid cake recipe, while Machine Learning is like a master chef tasting 1,000 cakes until they can invent the perfect recipe on their own!',
    explanationHtml: `<h3>The Big Secret: Learning from Data</h3>
<p>In traditional coding, human programmers write every rule: <code>if fruit == 'yellow' and shape == 'curved': banana</code>. But what if a banana is green or sliced?</p>
<h4>Machine Learning to the Rescue</h4>
<p>Instead of writing rules, we feed the computer 50,000 photos of bananas and 50,000 photos of apples. The computer's neural network adjusts its mathematical connections until it spots the visual patterns on its own!</p>`,
    step1: {
      title: '1. Collecting Labeled Training Data',
      desc: 'Gathering thousands of diverse photos labeled "Cat" or "Dog".',
      detail: 'High quality, varied datasets prevent biased mistakes.',
      code: '# Training Dataset\ntraining_data = [\n    {"image": "cat1.jpg", "label": "Cat"},\n    {"image": "dog1.jpg", "label": "Dog"}\n]'
    },
    step2: {
      title: '2. Training the Model (Finding Patterns)',
      desc: 'The neural network extracts whiskers, ear shapes, and snout textures.',
      detail: 'It updates connection weights after every sample.',
      code: 'model = NeuralNetwork()\nmodel.train(training_data, epochs=100)\nprint("Training complete: Accuracy 96.4%")'
    },
    step3: {
      title: '3. Predicting New Unseen Images (Inference)',
      desc: 'When given a brand new photo, the model calculates probability confidence.',
      detail: 'Outputs prediction with percentage score.',
      code: 'prediction = model.predict("new_mystery_pet.jpg")\n# Output: "Cat (94% confidence)"'
    },
    realScenario: 'A veterinary hospital used a machine learning vision model trained on 10,000 pet dental photos. The model helped vets detect early tooth decay in rescue dogs in 5 seconds with 98% accuracy.',
    useCases: [
      'Photo apps automatically grouping pictures of your pets and family members',
      'Plant identifier apps diagnosing garden leaf diseases from camera photos',
      'Wildlife camera traps counting endangered snow leopards in the Himalayas'
    ],
    simCode: 'def classify_pet(features):\n    if features["whiskers"] and features["pointy_ears"]:\n        return "🐱 Cat (98% confidence)"\n    return "🐶 Dog (95% confidence)"\n\nprint(classify_pet({"whiskers": True, "pointy_ears": True}))',
    simOutput: '🐱 Cat (98% confidence)',
    pairs: [
      { id: 'p1', term: 'Training Data', definition: 'Thousands of examples used to teach an AI model patterns' },
      { id: 'p2', term: 'Inference', definition: 'When a trained AI makes a prediction on brand new, unseen data' },
      { id: 'p3', term: 'Neural Network', definition: 'A computer system inspired by interconnected brain neurons that learns from data' }
    ],
    practice: {
      q: 'How does a Machine Learning model learn to recognize apples vs oranges?',
      opts: [
        'By analyzing thousands of labeled photos of apples and oranges to discover visual patterns',
        'By reading a dictionary definition once',
        'By flipping a coin in the server room',
        'By asking a programmer to draw every pixel by hand'
      ],
      correct: 0,
      exp: 'Machine Learning trains on large datasets of examples to identify distinguishing features.',
      hint: 'Think about learning by looking at many examples.'
    },
    quizzes: [
      {
        q: 'What is the main difference between traditional programming and machine learning?',
        opts: [
          { text: 'Traditional coding uses fixed manual rules; Machine Learning learns patterns from data examples', isCorrect: true },
          { text: 'Traditional coding only works on Sundays', isCorrect: false }
        ],
        exp: 'Machine learning automatically derives pattern weights from training data.'
      }
    ],
    practicalTask: {
      title: 'AI Feature Extractor Experiment',
      objective: 'List 3 visual features that distinguish a bicycle from a motorcycle for a computer vision model.',
      steps: [
        '1. Feature 1: Engine block vs Pedals and Chain.',
        '2. Feature 2: Heavy exhaust pipe vs Lightweight frame.',
        '3. Feature 3: Tire thickness.',
        'Write how an AI model weighs these 3 features to classify vehicles.'
      ],
      expectedResult: 'You will understand how neural networks extract mathematical features from images.'
    },
    recall: {
      q: 'What is the secret behind AI?',
      a: 'Learning from data! Instead of programmers writing every rule, machines learn patterns from thousands of examples!'
    },
    takeaways: [
      'Machine Learning discovers patterns automatically from large training datasets.',
      'Neural networks adjust mathematical weights to classify images, sounds, and text.',
      'High-quality, diverse data is essential to train accurate, unbiased AI models.'
    ]
  },

  'learning machines': {
    title: 'Learning Machines',
    hook: 'How can an AI teach itself to become a world-champion chess master in just 4 hours without ever reading a human strategy book?',
    goal: 'Explore the 3 main types of Machine Learning: Supervised, Unsupervised, and Reinforcement Learning.',
    learnPoints: [
      'Understand Supervised Learning: Learning with a teacher and labeled flashcards',
      'Understand Unsupervised Learning: Finding hidden clusters and patterns on its own',
      'Understand Reinforcement Learning: Learning through trial, error, and game rewards'
    ],
    analogy: 'Supervised learning is like studying with flashcards (Q&A provided); Unsupervised is like sorting toys into bins by color; Reinforcement is like training a puppy with tasty treats!',
    explanationHtml: `<h3>The Three Ways Machines Learn</h3>
<p>Just like humans learn through teachers, exploration, and practice, computers learn using three primary paradigms:</p>
<h4>1. Supervised Learning (Labeled Data)</h4>
<p>The computer is given input data along with the correct answers (labels). Example: 10,000 photos marked "Cat" or "Dog".</p>
<h4>2. Unsupervised Learning (Clustering)</h4>
<p>The computer is given unlabeled data and discovers natural groups. Example: Grouping customers by shopping styles.</p>
<h4>3. Reinforcement Learning (Rewards & Penalties)</h4>
<p>An AI agent plays games millions of times, earning +10 points for good moves and -10 for mistakes until it masters the game!</p>`,
    step1: {
      title: '1. Supervised Learning (Teacher & Labels)',
      desc: 'The model learns mapping from input X to target label Y.',
      detail: 'Uses loss functions to correct errors.',
      code: 'model.fit(X_train_images, y_labels)'
    },
    step2: {
      title: '2. Unsupervised Clustering',
      desc: 'Algorithms find geometric clusters without human tags.',
      detail: 'K-Means groups similar data points together.',
      code: 'clusters = KMeans(n_clusters=3).fit(customer_data)'
    },
    step3: {
      title: '3. Reinforcement Trial & Reward',
      desc: 'The agent takes actions in a simulation to maximize total score.',
      detail: 'Q-Learning updates reward tables.',
      code: 'if won_chess_match: reward += 100\nagent.update_policy(reward)'
    },
    realScenario: 'DeepMind’s AlphaZero started knowing only the basic legal moves of chess. By playing against itself for 4 hours using Reinforcement Learning, it defeated the reigning world computer chess champion.',
    useCases: [
      'Supervised: Spam email classification (Spam vs Inbox)',
      'Unsupervised: Recommending similar songs based on acoustic frequencies',
      'Reinforcement: Robotic arms learning to balance walking quadrupeds over rough rocks'
    ],
    simCode: 'score = 0\nfor game in range(3):\n    # Simulated reinforcement trial\n    score += 15 # Reward for safe obstacle jump\nprint(f"Reinforcement Learning Policy Score: {score} XP ⭐")',
    simOutput: 'Reinforcement Learning Policy Score: 45 XP ⭐',
    pairs: [
      { id: 'p1', term: 'Supervised Learning', definition: 'Learning with labeled examples and ground-truth answers' },
      { id: 'p2', term: 'Unsupervised Learning', definition: 'Discovering hidden patterns and clusters in unlabeled data' },
      { id: 'p3', term: 'Reinforcement Learning', definition: 'Learning optimal strategies through trial, error, and game rewards' }
    ],
    practice: {
      q: 'Which machine learning type teaches a game-playing AI through score rewards and penalties?',
      opts: [
        'Reinforcement Learning',
        'Manual Typing',
        'Unsupervised Clustering',
        'Database Cable Splicing'
      ],
      correct: 0,
      exp: 'Reinforcement learning trains agents to maximize cumulative rewards through trial and error.',
      hint: 'Look for the learning method based on rewards and penalties.'
    },
    quizzes: [
      {
        q: 'What is an example of Supervised Learning?',
        opts: [
          { text: 'Teaching an AI to identify spam emails using 10,000 emails marked "Spam" or "Not Spam"', isCorrect: true },
          { text: 'Letting a robot wander in a forest with no goal', isCorrect: false }
        ],
        exp: 'Supervised learning requires labeled inputs (Spam / Not Spam).'
      }
    ],
    practicalTask: {
      title: 'ML Paradigm Matcher',
      objective: 'Classify 3 real-world scenarios into Supervised, Unsupervised, or Reinforcement Learning.',
      steps: [
        '1. Scenario A: Diagnosing X-rays labeled "Healthy" or "Pneumonia" (Supervised).',
        '2. Scenario B: Grouping supermarket shoppers into 4 buying personas (Unsupervised).',
        '3. Scenario C: A robot car learning to parallel park by trying 500 times (Reinforcement).',
        'Write 1 sentence explanation for each.'
      ],
      expectedResult: 'You will master the three foundational branches of modern artificial intelligence.'
    },
    recall: {
      q: 'What are the 3 main types of Machine Learning?',
      a: '1. Supervised (Labeled data), 2. Unsupervised (Clustering), and 3. Reinforcement (Trial & Reward)!'
    },
    takeaways: [
      'Supervised learning learns from teacher-labeled flashcards.',
      'Unsupervised learning discovers hidden patterns and clusters without labels.',
      'Reinforcement learning masters games and robotics through rewards and penalties.'
    ]
  },

  'crack the logic!': {
    title: 'Crack the Logic!',
    hook: 'Can you solve the classic riddle of the farmer, the wolf, the goat, and the cabbage crossing a river without anything getting eaten?',
    goal: 'Master algorithmic problem solving, logic puzzles, boolean truth tables (AND, OR, NOT), and state-space tree traversal.',
    learnPoints: [
      'Master Boolean logic gates: AND (both true), OR (either true), NOT (inverts)',
      'Understand Decision Trees and condition branching',
      'Learn how search algorithms find winning game states'
    ],
    analogy: 'Boolean logic is like the security gates at an amusement park: AND requires a ticket AND a wristband; OR lets you on if you have a VIP pass OR cash!',
    explanationHtml: `<h3>Cracking Problems with Computational Logic</h3>
<p>Computers do not guess; they evaluate logical propositions with mathematical certainty using Boolean operators.</p>
<h4>The 3 Core Boolean Gates</h4>
<ul>
  <li><strong>AND:</strong> Returns True only if BOTH conditions are satisfied (e.g. <code>has_ticket and is_tall_enough</code>).</li>
  <li><strong>OR:</strong> Returns True if AT LEAST ONE condition is met (e.g. <code>is_weekend or is_holiday</code>).</li>
  <li><strong>NOT:</strong> Flips True to False and False to True (e.g. <code>not is_raining</code>).</li>
</ul>`,
    step1: {
      title: '1. Constructing Boolean Conditions',
      desc: 'Combine variables using logical operators.',
      detail: 'Evaluates compound expressions to a single boolean value.',
      code: 'can_ride_rollercoaster = (height >= 120) and (has_fast_pass or has_regular_ticket)'
    },
    step2: {
      title: '2. Decision Tree Branching',
      desc: 'Structure complex choices into hierarchical IF-ELIF-ELSE trees.',
      detail: 'Guarantees every edge case is handled.',
      code: 'if is_raining:\n    action = "Take Umbrella ☔"\nelif is_sunny:\n    action = "Wear Sunglasses 🕶️"\nelse:\n    action = "Walk to Park 🌳"'
    },
    step3: {
      title: '3. State Space Exploration',
      desc: 'Search possible future moves to reach the goal state while avoiding danger states.',
      detail: 'Backtracks if a dead-end is hit.',
      code: 'if wolf_eats_goat(state): return "INVALID_STATE"'
    },
    realScenario: 'A student wrote a game login script with nested logic: `if (username_correct and password_correct) and not account_locked:` ensuring only authorized students could access school computers.',
    useCases: [
      'Security alarm systems triggering sirens only IF motion detected AND system armed',
      'Medical triage algorithms prioritizing emergency patients based on vital signs',
      'Search engines filtering results: "Robots AND Space NOT Movie"'
    ],
    simCode: 'has_key = True\nknows_password = True\nis_banned = False\n\nif has_key and knows_password and not is_banned:\n    print("Access Granted: Welcome to Secret Lab! 🔬🔓")\nelse:\n    print("Access Denied! 🛑")',
    simOutput: 'Access Granted: Welcome to Secret Lab! 🔬🔓',
    pairs: [
      { id: 'p1', term: 'AND Operator', definition: 'Requires all connected conditions to be true simultaneously' },
      { id: 'p2', term: 'OR Operator', definition: 'Requires at least one condition to be true' },
      { id: 'p3', term: 'NOT Operator', definition: 'Inverts a boolean condition (True becomes False, False becomes True)' }
    ],
    practice: {
      q: 'If `is_sunny = True` and `has_sunscreen = False`, what is the result of `is_sunny and has_sunscreen`?',
      opts: [
        'False (Because AND requires BOTH to be True)',
        'True',
        'Maybe',
        'Error'
      ],
      correct: 0,
      exp: 'The AND operator evaluates to True only when every condition is True.',
      hint: 'Remember that AND requires both sides to be True.'
    },
    quizzes: [
      {
        q: 'What does the NOT operator do in logic?',
        opts: [
          { text: 'It reverses a boolean value (turns True into False and vice-versa)', isCorrect: true },
          { text: 'It deletes the computer memory', isCorrect: false }
        ],
        exp: 'NOT is the logical negation operator.'
      }
    ],
    practicalTask: {
      title: 'Amusement Park Ride Admission Logic',
      objective: 'Write the boolean logic expression for entering a water slide.',
      steps: [
        'Rules: Rider must be at least 130cm tall AND know how to swim.',
        'Bonus: OR have an adult guardian present.',
        'Write the complete boolean formula in Python syntax.',
        'Test with 3 sample riders.'
      ],
      expectedResult: 'You will experience how Boolean logic controls real-world automated access systems.'
    },
    recall: {
      q: 'What are the 3 foundational Boolean logic operators?',
      a: 'AND, OR, and NOT!'
    },
    takeaways: [
      'Boolean logic (AND, OR, NOT) allows computers to make complex decisions with precision.',
      'Decision trees break complicated problems down into simple yes/no branches.',
      'Logical problem-solving is the bedrock of computer science and algorithm design.'
    ]
  },

  'command to creation': {
    title: 'Command to Creation',
    hook: 'How can typing 5 lines of Python code generate a colorful geometric mandala or a 3D animated solar system?',
    goal: 'Learn programmatic creation: procedural generation, loops, coordinate geometry, and building interactive software artifacts from code.',
    learnPoints: [
      'Understand Procedural Generation: creating art, maps, and music through algorithms',
      'Master FOR and WHILE loops to repeat actions without repetitive code',
      'Use Cartesian coordinates (X, Y) to place visual objects with pixel precision'
    ],
    analogy: 'Procedural coding is like having an automated paintbrush with an infinite ruler: you give it one repeating mathematical rule, and it paints a million perfect snowflake crystals!',
    explanationHtml: `<h3>From Commands to Digital Creations</h3>
<p>In procedural generation, developers don't draw every tree in a giant video game forest by hand. Instead, they write an algorithm with a loop that plants 10,000 unique trees across the map automatically!</p>
<h4>The Power of Loops</h4>
<p>A loop tells the computer: <em>"Repeat these 3 actions 100 times, but change the size and rotation slightly on each turn."</em> This creates breathtaking geometric fractals, particle effects, and procedural game worlds.</p>`,
    step1: {
      title: '1. Setting Coordinates & Canvas',
      desc: 'Initialize a digital 2D/3D workspace with (X, Y) pixel origins.',
      detail: 'Coordinates anchor every visual element.',
      code: 'canvas = create_canvas(width=800, height=600)\norigin_x, origin_y = 400, 300'
    },
    step2: {
      title: '2. Writing Iterative Generation Loops',
      desc: 'Use a FOR loop to iterate through geometric rotations.',
      detail: 'Iterating with math angles creates symmetry.',
      code: 'for angle in range(0, 360, 30):\n    draw_petal(origin_x, origin_y, angle, length=80)'
    },
    step3: {
      title: '3. Adding Randomness & Variety',
      desc: 'Introduce bounded random variations in color palettes and petal sizes.',
      detail: 'Ensures natural, organic aesthetics.',
      code: 'color = get_random_hue()\ndraw_crystal(size=random.randint(10, 40), color=color)'
    },
    realScenario: 'Video game creators used procedural generation algorithms in Minecraft and No Man’s Sky to generate billions of unique mountains, caves, and planets using mathematics.',
    useCases: [
      'Minecraft generating endless procedural voxel landscapes as players walk',
      'Visual effects artists generating swirling galaxy star clusters in sci-fi movies',
      'Fashion designers creating generative geometric textile knitwear patterns'
    ],
    simCode: 'print("🎨 Procedural Generation Starting...")\nfor i in range(1, 4):\n    print(f"Drawing Ring {i}: Radius {i * 20}px with {i * 6} geometric facets 💠")\nprint("✨ Generative Mandala Created!")',
    simOutput: '🎨 Procedural Generation Starting...\nDrawing Ring 1: Radius 20px with 6 geometric facets 💠\nDrawing Ring 2: Radius 40px with 12 geometric facets 💠\nDrawing Ring 3: Radius 60px with 18 geometric facets 💠\n✨ Generative Mandala Created!',
    pairs: [
      { id: 'p1', term: 'Procedural Generation', definition: 'Creating game worlds, graphics, or music automatically using mathematical algorithms' },
      { id: 'p2', term: 'FOR Loop', definition: 'A programming structure that repeats a block of instructions a specific number of times' },
      { id: 'p3', term: 'Cartesian Coordinates', definition: 'The (X, Y) grid numbers used to position objects on a digital screen' }
    ],
    practice: {
      q: 'How does a game like Minecraft generate millions of different mountain caves without human artists building each one?',
      opts: [
        'Using procedural generation algorithms that calculate terrain with mathematical noise',
        'By hiring 1 million builders to work 24/7',
        'By taking photos of real mountains with cameras',
        'By copying the same room 100 times'
      ],
      correct: 0,
      exp: 'Procedural generation uses algorithms (like Perlin noise) to synthesize endless varied terrain.',
      hint: 'Think about automated mathematical creation.'
    },
    quizzes: [
      {
        q: 'What does a FOR loop do in coding?',
        opts: [
          { text: 'Repeats a sequence of commands a specified number of times', isCorrect: true },
          { text: 'Turns off the computer fan', isCorrect: false }
        ],
        exp: 'Loops automate repetitive tasks efficiently.'
      }
    ],
    practicalTask: {
      title: 'Procedural Starfield Generator',
      objective: 'Write pseudocode for a loop that generates 50 stars at random screen coordinates.',
      steps: [
        '1. Set canvas to 800x600.',
        '2. Write: FOR star from 1 to 50.',
        '3. Pick random X (0 to 800) and random Y (0 to 600).',
        '4. Draw white star circle at (X, Y).'
      ],
      expectedResult: 'You will understand how simple loops generate complex digital backgrounds.'
    },
    recall: {
      q: 'What is Procedural Generation?',
      a: 'Creating digital worlds, graphics, and music automatically using mathematical algorithms and loops!'
    },
    takeaways: [
      'Procedural generation uses loops and algorithms to build vast digital worlds effortlessly.',
      'Loops eliminate boring repetitive code by executing instructions hundreds of times in seconds.',
      'Combining geometry, coordinates, and randomness creates organic digital art.'
    ]
  },

  'ai in the hospital': {
    title: 'AI in the Hospital',
    hook: 'How can a computer look at a chest X-ray and spot a tiny pneumonia spot that is invisible to tired human eyes?',
    goal: 'Explore AI in modern medicine: medical imaging computer vision, robotic surgery precision, and early disease detection.',
    learnPoints: [
      'Learn how computer vision analyzes MRI, CT, and X-ray scans with pixel-level precision',
      'Understand how robotic surgical arms provide superhuman tremor-free dexterity to doctors',
      'Discover how AI accelerates drug discovery from years to weeks'
    ],
    analogy: 'AI in medicine is like a doctor’s ultimate high-power magnifying glass: it highlights suspicious cells with glowing boxes so doctors can treat illnesses faster!',
    explanationHtml: `<h3>Artificial Intelligence Saving Lives</h3>
<p>Modern hospitals are adopting AI systems to support doctors and nurses, reduce diagnostic errors, and improve patient recovery times.</p>
<h4>1. Computer Vision Imaging</h4>
<p>Medical AI models trained on millions of anonymized scans detect microscopic fractures, tumors, and eye diseases at earlier, curable stages.</p>
<h4>2. Robotic Surgical Assistants</h4>
<p>Surgeons control robotic arms with 360-degree micro-wrists that filter out hand tremors, enabling minimally invasive operations with millimeter accuracy.</p>`,
    step1: {
      title: '1. Medical Image Preprocessing',
      desc: 'High-resolution DICOM scans are normalized for contrast and brightness.',
      detail: 'Prepares raw X-ray pixels for neural feature extraction.',
      code: 'scan = load_dicom_scan("chest_xray_042.dcm")\nnormalized_image = enhance_contrast(scan)'
    },
    step2: {
      title: '2. Deep Learning Lesion Segmentation',
      desc: 'Convolutional neural networks highlight regions of interest with heatmaps.',
      detail: 'Flags potential anomalies with confidence probabilities.',
      code: 'heatmap = vision_model.segment_lesions(normalized_image)\nconfidence = 0.96'
    },
    step3: {
      title: '3. Physician Review & Final Diagnosis',
      desc: 'The human doctor evaluates AI findings and determines the treatment plan.',
      detail: 'AI assists; human doctors make final decisions.',
      code: 'doctor_notes = review_and_approve(heatmap, confidence)'
    },
    realScenario: 'An eye clinic used an AI retinal scanner to screen 500 rural patients for diabetic retinopathy. The AI flagged 14 early cases in 2 minutes each, allowing doctors to provide laser treatments that saved their eyesight.',
    useCases: [
      'AI retinal scanners diagnosing diabetic eye diseases in remote clinics without specialists',
      'Smart hospital monitors predicting sepsis infections 6 hours before symptoms appear',
      'AlphaFold predicting 3D structures of 200 million proteins to discover new medicines'
    ],
    simCode: 'scan_id = "MRI_BRAIN_881"\nscan_result = {"status": "ANOMALY_DETECTED", "location": "Right Temporal Lobe", "confidence": 0.94}\nif scan_result["confidence"] > 0.90:\n    print(f"Hospital Alert 🏥: Urgent review requested for {scan_id} by Chief Neurologist!")',
    simOutput: 'Hospital Alert 🏥: Urgent review requested for MRI_BRAIN_881 by Chief Neurologist!',
    pairs: [
      { id: 'p1', term: 'Medical Imaging', definition: 'Techniques like X-rays, MRIs, and CT scans that view inside the human body' },
      { id: 'p2', term: 'Robotic Surgery', definition: 'Tremor-free robotic arms controlled by surgeons for delicate operations' },
      { id: 'p3', term: 'AlphaFold', definition: 'An AI system that solved the 50-year-old biology challenge of predicting 3D protein structures' }
    ],
    practice: {
      q: 'Who makes the final medical decision when AI analyzes a patient’s scan in a hospital?',
      opts: [
        'The human doctor after carefully reviewing the AI recommendations',
        'The robot operating independently with no humans',
        'The hospital receptionist',
        'An internet poll'
      ],
      correct: 0,
      exp: 'AI serves as a clinical decision support tool; licensed human physicians always retain final authority.',
      hint: 'Think about medical responsibility and physician oversight.'
    },
    quizzes: [
      {
        q: 'How does AI help in medical drug discovery?',
        opts: [
          { text: 'By predicting 3D protein folding structures and simulating chemical interactions at supercomputer speed', isCorrect: true },
          { text: 'By mixing random liquids in plastic cups', isCorrect: false }
        ],
        exp: 'Computational biology AI simulates molecular binding to accelerate drug design.'
      }
    ],
    practicalTask: {
      title: 'Hospital Tech Triage Workflow',
      objective: 'Map the 3-step path of a patient scan from X-ray machine to treatment.',
      steps: [
        'Step 1: Patient takes X-ray scan.',
        'Step 2: AI highlights suspicious regions with glowing heatmap.',
        'Step 3: Specialist doctor confirms diagnosis and prescribes medicine.',
        'Draw this workflow as a clean flowchart.'
      ],
      expectedResult: 'You will understand how human-AI collaboration works in modern healthcare.'
    },
    recall: {
      q: 'How does AI save lives in hospitals?',
      a: 'By detecting diseases on scans early, assisting surgeons with precision, and discovering new medicines!'
    },
    takeaways: [
      'AI analyzes medical scans with pixel-level precision to detect early signs of illness.',
      'Robotic surgical assistants provide steady, minimally invasive precision.',
      'Human doctors and AI form a life-saving team, combining medical empathy with computational speed.'
    ]
  },

  'ai in the classroom': {
    title: 'AI in the Classroom',
    hook: 'What if you had a personal AI tutor that never got tired, explained math concepts using your favorite video games, and cheered for every correct answer?',
    goal: 'Explore AI in modern education: adaptive learning pathways, real-time grammar feedback, language translation, and intelligent study companions.',
    learnPoints: [
      'Learn how adaptive learning platforms customize pace and difficulty for every student',
      'Understand how speech recognition AI helps students practice speaking new languages',
      'Discover how teachers use AI tools to generate engaging quizzes and lesson materials'
    ],
    analogy: 'An adaptive AI tutor is like a personalized GPS for your brain: if you take a wrong turn on a fraction problem, it reroutes you through simple visual stepping stones until you master it!',
    explanationHtml: `<h3>Personalized Learning for Every Student</h3>
<p>In a traditional classroom of 30 students, some students find the lesson too fast while others find it too slow. Intelligent Tutoring Systems (ITS) solve this by adapting in real-time to each student’s unique learning speed.</p>
<h4>How Smart Tutoring Systems Work</h4>
<p>When you solve a quiz, the system tracks which concepts you master and which need review. If you struggle with fractions, it shows visual pizza slices; if you master them quickly, it unlocks advanced challenges!</p>`,
    step1: {
      title: '1. Diagnostic Knowledge Mapping',
      desc: 'Evaluates student strengths across core concept prerequisites.',
      detail: 'Builds an individual mastery graph.',
      code: 'student_mastery = {"addition": 1.0, "fractions": 0.6, "geometry": 0.85}'
    },
    step2: {
      title: '2. Dynamic Content Generation',
      desc: 'Serves customized problems that match the student’s zone of proximal development.',
      detail: 'Keeps learning engaging and confidence high.',
      code: 'if student_mastery["fractions"] < 0.7:\n    serve_interactive_visual_fraction_game()'
    },
    step3: {
      title: '3. Real-Time Formative Feedback',
      desc: 'Provides instant step-by-step guidance when a mistake occurs.',
      detail: 'Encourages growth mindset.',
      code: 'provide_encouraging_hint("Try finding the common denominator first! 🍕")'
    },
    realScenario: 'A student learning Spanish practiced conversation with an AI speech tutor app. The AI gently corrected vowel pronunciations in real-time, helping the student earn an A on their oral speaking exam.',
    useCases: [
      'Language learning apps listening to spoken accents and guiding pronunciation',
      'Math game platforms adapting difficulty to keep students in the "Flow Zone"',
      'Accessibility screen readers converting textbooks into natural spoken audio for blind students'
    ],
    simCode: 'student_progress = {"subject": "Fractions", "level": 3, "streak": 5}\nif student_progress["streak"] >= 5:\n    next_challenge = "🌟 Master Quest: Mixed Numbers Unlocked!"\nprint("Adaptive Classroom:", next_challenge)',
    simOutput: 'Adaptive Classroom: 🌟 Master Quest: Mixed Numbers Unlocked!',
    pairs: [
      { id: 'p1', term: 'Intelligent Tutoring System', definition: 'Software that provides personalized instruction and feedback tailored to each student' },
      { id: 'p2', term: 'Mastery Graph', definition: 'A visual map showing which educational concepts a student has mastered' },
      { id: 'p3', term: 'Formative Feedback', definition: 'Helpful hints and corrections provided during practice to guide learning' }
    ],
    practice: {
      q: 'What is the main benefit of an adaptive AI tutor for students?',
      opts: [
        'It customizes learning pace, hints, and difficulty to match each student’s unique needs',
        'It does all homework so students can sleep',
        'It gives everyone the exact same test regardless of skill',
        'It turns off during exams'
      ],
      correct: 0,
      exp: 'Adaptive learning tailors educational pathways to support every learner at their own pace.',
      hint: 'Think about personalized pace and helpful hints.'
    },
    quizzes: [
      {
        q: 'How do speech recognition AI apps help students learn new languages?',
        opts: [
          { text: 'By listening to spoken words, analyzing pronunciation waveforms, and giving gentle correction hints', isCorrect: true },
          { text: 'By translating everything into silent movies', isCorrect: false }
        ],
        exp: 'Phonetic speech AI models evaluate pronunciation accuracy in real time.'
      }
    ],
    practicalTask: {
      title: 'Design Your AI Study Buddy Feature',
      objective: 'Invent a feature for an AI classroom tutor that makes learning your hardest subject fun.',
      steps: [
        '1. Pick your hardest subject (e.g. Long Division).',
        '2. Invent an interactive game theme (e.g. Space Rocket Fuel Division).',
        '3. Describe how the AI helps when you get a wrong answer.',
        'Write 3 sentences explaining your idea.'
      ],
      expectedResult: 'You will discover how gamification and adaptive AI make difficult concepts approachable.'
    },
    recall: {
      q: 'What does an Intelligent Tutoring System do?',
      a: 'It adapts lesson difficulty, offers personalized hints, and helps students learn at their own pace!'
    },
    takeaways: [
      'Adaptive learning platforms personalize education for each student’s speed and style.',
      'Speech AI allows students to practice foreign languages with instant phonetic feedback.',
      'AI empowers teachers to spend more one-on-one time mentoring and inspiring students.'
    ]
  },

  'my future with ai': {
    title: 'My Future with AI',
    hook: 'In the year 2040, will you be riding in flying electric air taxis, designing green smart cities, or living in smart habitat domes on Mars?',
    goal: 'Envision your personal future in an AI-augmented world: career adaptability, lifelong learning, and using technology to solve global challenges.',
    learnPoints: [
      'Understand how AI will amplify human capabilities across science, art, and leadership',
      'Discover global challenges AI helps solve: climate change, clean energy, ocean cleanup',
      'Cultivate the lifelong learning mindset needed in a rapidly evolving technological era'
    ],
    analogy: 'Living in an AI-augmented future is like having a digital co-pilot in every adventure: you decide where the spaceship flies, and the AI calculates the orbital trajectories!',
    explanationHtml: `<h3>Thriving in an AI-Augmented World</h3>
<p>Artificial intelligence is not just a technological tool; it is a catalyst that will empower your generation to solve humanity's greatest challenges: curing diseases, reversing climate change, and exploring space.</p>
<h4>Human Agency in the Driver's Seat</h4>
<p>No matter how powerful algorithms become, human beings determine the goals, values, and ethics of technology. Your empathy, creativity, and moral judgment will always lead the way.</p>`,
    step1: {
      title: '1. Defining Your Vision & Purpose',
      desc: 'Connect what you care about deeply to technological solutions.',
      detail: 'Identify real-world problems to solve.',
      code: 'vision = "Clean Ocean Energy"\ntechnology_stack = ["Marine Robotics", "AI Climate Modeling"]'
    },
    step2: {
      title: '2. Developing Hybrid Skillsets',
      desc: 'Combine domain knowledge (biology, design, law) with computational AI literacy.',
      detail: 'Interdisciplinary thinkers drive innovation.',
      code: 'skills = {"Domain": "Marine Biology", "Tech": "Computer Vision Coral Mapping"}'
    },
    step3: {
      title: '3. Ethical Leadership & Responsibility',
      desc: 'Lead technology projects that prioritize human well-being, fairness, and sustainability.',
      detail: 'Build technology that benefits all humankind.',
      code: 'deploy_project(fairness_guarantee=True, eco_friendly=True)'
    },
    realScenario: 'A group of student inventors built an AI-powered solar-powered river trash skimmer that removed 5,000 kg of plastic waste from their local river before it reached the sea.',
    useCases: [
      'AI climate models predicting renewable wind turbine power generation 48 hours in advance',
      'Autonomous electric tractors managing regenerative organic farms with zero chemical runoff',
      'Smart micro-grids sharing excess rooftop solar electricity between neighborhood homes'
    ],
    simCode: 'future_year = 2040\nmy_mission = "Build solar desalination plants using AI thermodynamic optimization 🌊☀️"\nprint(f"Vision for {future_year}: {my_mission}")',
    simOutput: 'Vision for 2040: Build solar desalination plants using AI thermodynamic optimization 🌊☀️',
    pairs: [
      { id: 'p1', term: 'AI-Augmented', definition: 'Human capability enhanced and accelerated by smart computer tools' },
      { id: 'p2', term: 'Interdisciplinary', definition: 'Combining knowledge from two or more different fields (like Biology + AI Coding)' },
      { id: 'p3', term: 'Sustainability', definition: 'Using technology in ways that protect nature and conserve resources for future generations' }
    ],
    practice: {
      q: 'What is the most effective mindset for preparing for an AI-powered future?',
      opts: [
        'Cultivating curiosity, adaptability, human empathy, and learning how to use AI tools creatively',
        'Trying to memorize every telephone number in the city',
        'Refusing to touch computers forever',
        'Letting computers make all personal decisions'
      ],
      correct: 0,
      exp: 'Curiosity, adaptability, empathy, and AI literacy empower you to lead in the modern era.',
      hint: 'Look for the option focused on curiosity, empathy, and creative problem solving.'
    },
    quizzes: [
      {
        q: 'Who decides the goals and moral values of artificial intelligence systems?',
        opts: [
          { text: 'Human beings—scientists, ethicists, citizens, and you!', isCorrect: true },
          { text: 'The metal cables inside servers', isCorrect: false }
        ],
        exp: 'Human developers and society establish the objectives and ethical guardrails of AI.'
      }
    ],
    practicalTask: {
      title: 'My 2040 Innovation Blueprint',
      objective: 'Design an invention for the year 2040 that solves an environmental or health challenge.',
      steps: [
        '1. Name your 2040 Invention (e.g. ReefRevive AI Drone).',
        '2. What global problem does it solve? (e.g. Restoring coral reefs).',
        '3. What role does AI play? (e.g. Seeds healthy coral larvae on bleached rock).',
        '4. What human skills were needed to invent it?'
      ],
      expectedResult: 'You will synthesize domain curiosity with technical innovation to build visionary solutions.'
    },
    recall: {
      q: 'What is the role of humans in an AI-powered future?',
      a: 'Humans provide the vision, values, empathy, and creativity, while AI acts as a powerful computational assistant!'
    },
    takeaways: [
      'AI enhances human problem-solving across health, clean energy, and planetary conservation.',
      'Interdisciplinary skills combining art, science, and AI literacy will lead the future.',
      'Human values, kindness, and moral ethics will always be the guiding compass of technology.'
    ]
  },

  'skills of tomorrow': {
    title: 'Skills of Tomorrow',
    hook: 'If calculators can do math and AI can write essays, what skills will make you stand out and shine in the future?',
    goal: 'Master the 4Cs of 21st-century skills: Critical Thinking, Creativity, Collaboration, and Communication in the age of AI.',
    learnPoints: [
      'Master the 4Cs: Critical Thinking, Creativity, Collaboration, Communication',
      'Understand why emotional intelligence (EQ) and empathy cannot be replicated by algorithms',
      'Learn how to evaluate digital information critically and solve complex problems'
    ],
    analogy: 'The skills of tomorrow are like the four pillars of a grand temple: Critical Thinking is the foundation, Creativity is the architecture, Collaboration is the team of builders, and Communication is the welcoming doors!',
    explanationHtml: `<h3>The 4Cs: Your Future Superpowers</h3>
<p>While artificial intelligence excels at memorizing data and calculating numbers, uniquely human cognitive and social skills become more valuable than ever:</p>
<h4>1. Critical Thinking</h4>
<p>Questioning assumptions, identifying bias, verifying sources, and evaluating logical consistency.</p>
<h4>2. Creativity</h4>
<p>Connecting unrelated concepts in surprising new ways to invent original solutions.</p>
<h4>3. Collaboration</h4>
<p>Working effectively across diverse teams with empathy, active listening, and shared goals.</p>
<h4>4. Communication</h4>
<p>Articulating complex ideas clearly, persuasively, and with emotional resonance.</p>`,
    step1: {
      title: '1. Practicing Critical Evaluation',
      desc: 'Ask: "Who created this data? What evidence supports it? Could there be an error?"',
      detail: 'Develops deep analytical skepticism.',
      code: 'def evaluate_information(claim):\n    return check_evidence(claim) and check_bias(claim)'
    },
    step2: {
      title: '2. Fostering Creative Synthesis',
      desc: 'Combine ideas from music, nature, and programming to design novel concepts.',
      detail: 'Cross-pollinates ideas for innovation.',
      code: 'novel_concept = synthesize(["Bird Wing Aerodynamics", "Solar Cells", "Drone Routing"])'
    },
    step3: {
      title: '3. Empathetic Team Communication',
      desc: 'Listen actively to teammates and express technical ideas with clarity and kindness.',
      detail: 'Unlocks high-performing team synergy.',
      code: 'team.communicate_vision(clarity=1.0, empathy=1.0)'
    },
    realScenario: 'A student robotics team won 1st place in an international competition not because they had the fastest robot, but because their clear communication and seamless teamwork solved every unexpected challenge.',
    useCases: [
      'Software engineers collaborating with hospital nurses to design intuitive patient care apps',
      'Architects using creative thinking to design buildings that cool themselves naturally using wind currents',
      'Journalists applying critical thinking to audit deepfakes and fake news on social networks'
    ],
    simCode: 'skills = {"Critical Thinking": 95, "Creativity": 98, "Collaboration": 92, "Communication": 96}\nfor skill, score in skills.items():\n    print(f"4C Skill: {skill} → Mastery Level: {score}% ⭐")',
    simOutput: '4C Skill: Critical Thinking → Mastery Level: 95% ⭐\n4C Skill: Creativity → Mastery Level: 98% ⭐\n4C Skill: Collaboration → Mastery Level: 92% ⭐\n4C Skill: Communication → Mastery Level: 96% ⭐',
    pairs: [
      { id: 'p1', term: 'Critical Thinking', definition: 'Evaluating facts, evidence, and logic carefully instead of accepting claims blindly' },
      { id: 'p2', term: 'Emotional Intelligence (EQ)', definition: 'The ability to understand, manage, and empathize with human emotions' },
      { id: 'p3', term: '4Cs Framework', definition: 'Critical Thinking, Creativity, Collaboration, and Communication' }
    ],
    practice: {
      q: 'Which of the following is one of the essential 4C skills of tomorrow?',
      opts: [
        'Critical Thinking (analyzing evidence and questioning assumptions)',
        'Speed typing with your elbows',
        'Memorizing the dictionary front to back',
        'Never speaking to team members'
      ],
      correct: 0,
      exp: 'Critical Thinking is one of the four foundational 21st-century skills alongside Creativity, Collaboration, and Communication.',
      hint: 'Look for the 4C skill focused on analytical reasoning.'
    },
    quizzes: [
      {
        q: 'Why is Emotional Intelligence (EQ) irreplaceable by AI models?',
        opts: [
          { text: 'Because computers lack genuine human feelings, consciousness, and real-life emotional empathy', isCorrect: true },
          { text: 'Because computers only like math equations', isCorrect: false }
        ],
        exp: 'AI can simulate conversational text, but it cannot experience authentic human empathy or emotion.'
      }
    ],
    practicalTask: {
      title: 'The 4Cs Project Pitch',
      objective: 'Practice pitching a science project idea using the 4Cs framework.',
      steps: [
        '1. Critical Thinking: Identify 1 problem in your school (e.g. plastic water bottle waste).',
        '2. Creativity: Invent 1 fun solution (e.g. Gamified smart bottle refill stations with digital badges).',
        '3. Collaboration: Assign roles for 3 friends.',
        '4. Communication: Write a 30-second spoken pitch.'
      ],
      expectedResult: 'You will apply the 4Cs to turn a real-world challenge into an actionable project.'
    },
    recall: {
      q: 'What are the 4Cs of 21st-century skills?',
      a: 'Critical Thinking, Creativity, Collaboration, and Communication!'
    },
    takeaways: [
      'The 4Cs (Critical Thinking, Creativity, Collaboration, Communication) are your greatest future assets.',
      'Emotional intelligence and human empathy set you apart from algorithmic machines.',
      'Combining strong human skills with AI tools creates unstoppable problem solvers.'
    ]
  },

  'ai study buddy': {
    title: 'AI Study Buddy',
    hook: 'How can you transform an AI from a boring search engine into your personal Socratic tutor that tests your memory and makes studying feel like a video game?',
    goal: 'Learn Socratic prompting: using AI as an interactive study partner for quizzing, flashcards, concept analogies, and exam preparation.',
    learnPoints: [
      'Learn the Socratic Method: asking AI to guide you with questions instead of giving away answers',
      'Master prompt templates for custom flashcard generation and memory drills',
      'Understand active recall and spaced repetition study techniques'
    ],
    analogy: 'Using an AI as a Socratic study buddy is like practicing tennis with a smart ball machine: it hits the ball right to your racket, challenging you to swing and build muscle memory yourself!',
    explanationHtml: `<h3>The Socratic AI Tutor</h3>
<p>If you ask an AI <em>"What is the answer to question 4?"</em> and copy it, your brain learns nothing. But if you tell the AI <em>"Act as my Socratic study buddy. Ask me 1 question about the water cycle at a time, and give me a hint if I get stuck"</em>, you become an active learner!</p>
<h4>Active Recall vs. Passive Reading</h4>
<p>Active recall forces your brain to retrieve knowledge from memory, creating 300% stronger neural connections than just re-reading a textbook.</p>`,
    step1: {
      title: '1. Defining the Persona & Rules',
      desc: 'Instruct the AI to act as an encouraging, patient tutor.',
      detail: 'Explicit rules prevent answer dumping.',
      code: 'prompt = "Act as my Socratic tutor for Class 5 Science. Ask 1 question at a time. Do not give the answer. Guide me with hints."'
    },
    step2: {
      title: '2. Interactive Q&A Drills',
      desc: 'Engage in back-and-forth conversational practice.',
      detail: 'Tests memory retrieval under friendly conditions.',
      code: 'student_reply = "Evaporation is when water turns to vapor from heat."\nai_response = evaluate_and_ask_next(student_reply)'
    },
    step3: {
      title: '3. Generating Custom Analogies',
      desc: 'Ask the AI to explain tricky concepts using things you love (like sports, Minecraft, or baking).',
      detail: 'Analogies cement understanding.',
      code: 'prompt = "Explain photosynthesis using a kitchen restaurant analogy."'
    },
    realScenario: 'A student used the Socratic prompt technique for 15 minutes a day before their history exam, practicing timeline recall, and scored 98% by engaging in active dialogue.',
    useCases: [
      'Generating practice quizzes with multiple choice options and detailed explanations',
      'Converting long textbook chapters into bullet-point memory flashcards',
      'Practicing debate arguments by asking AI to play friendly devil’s advocate'
    ],
    simCode: 'tutor_prompt = "Socratic Tutor Active: Topic: Solar System 🪐"\nq1 = "Tutor: What is the hottest planet in our solar system? (Hint: It has thick greenhouse clouds!)"\nprint(tutor_prompt)\nprint(q1)',
    simOutput: 'Socratic Tutor Active: Topic: Solar System 🪐\nTutor: What is the hottest planet in our solar system? (Hint: It has thick greenhouse clouds!)',
    pairs: [
      { id: 'p1', term: 'Socratic Method', definition: 'Teaching through dialogue and guided questions rather than direct lecturing' },
      { id: 'p2', term: 'Active Recall', definition: 'Testing yourself to retrieve knowledge from memory to build strong neural pathways' },
      { id: 'p3', term: 'Spaced Repetition', definition: 'Reviewing difficult concepts at increasing intervals of time for long-term retention' }
    ],
    practice: {
      q: 'Which prompt will help you learn a topic most effectively with AI?',
      opts: [
        'Act as my tutor: Ask me 3 practice questions one by one and give me hints if I make a mistake',
        'Do my homework for me',
        'Write 10 pages about rocks',
        'Give me the answers to page 50'
      ],
      correct: 0,
      exp: 'Socratic questioning forces active memory retrieval and deeper conceptual understanding.',
      hint: 'Choose the prompt that asks for guided practice questions and hints.'
    },
    quizzes: [
      {
        q: 'Why is asking AI to test you with questions better than asking it for direct answers?',
        opts: [
          { text: 'Because active recall trains your brain to remember concepts independently for tests and life', isCorrect: true },
          { text: 'Because it uses less battery', isCorrect: false }
        ],
        exp: 'Active memory retrieval strengthens synaptic memory consolidation.'
      }
    ],
    practicalTask: {
      title: 'Build a Socratic Study Prompt',
      objective: 'Write a 3-part Socratic Study Prompt for your next science or social studies chapter.',
      steps: [
        '1. Role: "Act as a friendly Science Coach."',
        '2. Topic: Specify chapter title.',
        '3. Rule: "Ask me 1 question at a time. If I am wrong, give a small clue instead of the answer."',
        'Test your prompt with an AI assistant or classmate.'
      ],
      expectedResult: 'You will experience the dramatic difference between passive reading and active Socratic learning.'
    },
    recall: {
      q: 'What is a Socratic Prompt?',
      a: 'A prompt that asks the AI to test you with guided questions and clues instead of just giving away the answer!'
    },
    takeaways: [
      'Using AI as a Socratic study buddy turns passive reading into active, effective learning.',
      'Active recall and spaced repetition build long-lasting memory connections.',
      'You can ask AI to explain difficult concepts using custom analogies tailored to your hobbies.'
    ]
  },

  'ai creative corner': {
    title: 'AI Creative Corner',
    hook: 'Can an AI help you compose a catchy hip-hop song about renewable solar energy or design an original superhero comic book?',
    goal: 'Explore multimodal generative AI: combining text generation, AI melody synthesis, and visual art into creative multimedia projects.',
    learnPoints: [
      'Understand Multimodal AI: systems that combine text, audio, images, and video simultaneously',
      'Learn how to compose song lyrics, rhyme schemes, and musical prompts with AI',
      'Create an integrated multimedia project (Comic Strip, Song, or Illustrated Story)'
    ],
    analogy: 'Multimodal AI is like having an entire creative movie production studio inside your laptop: a scriptwriter, an illustrator, and a music composer all waiting for your artistic direction!',
    explanationHtml: `<h3>Multimodal Creative Expression</h3>
<p>Modern generative AI models are <strong>Multimodal</strong>, meaning they process and generate multiple media formats simultaneously: words, melodies, paintings, and animation frames.</p>
<h4>Directing Your Creative Studio</h4>
<p>You are the Director. The AI provides building blocks—rhymes, chord progressions, and concept sketches—while you curate, edit, and assemble the final masterpiece with your unique creative vision.</p>`,
    step1: {
      title: '1. Conceptualizing the Multimedia Theme',
      desc: 'Choose a unified artistic theme (e.g. Cyberpunk Solar Rovers).',
      detail: 'Aligns tone across text, visual art, and music.',
      code: 'theme = "Futuristic Solar Rovers Exploring Neon Canyons"'
    },
    step2: {
      title: '2. Generating Rhyme Schemes & Lyrics',
      desc: 'Use LLM prompting to brainstorm verses with AABB or ABAB rhyming structures.',
      detail: 'Crafts rhythmic cadence.',
      code: 'lyrics = generate_lyrics(topic=theme, genre="Upbeat Hip-Hop", meter="4/4")'
    },
    step3: {
      title: '3. Synthesizing Matching Visual Panels',
      desc: 'Prompt image diffusion models to generate matching comic book panels.',
      detail: 'Maintains character consistency across frames.',
      code: 'panel_1 = render_diffusion("Solar Rover charging under twin suns, comic book style")'
    },
    realScenario: 'A 5th-grade student created a 4-panel illustrated comic with an accompanying theme song about ocean cleanup robots, winning the school digital arts festival.',
    useCases: [
      'Musicians using AI melody generators to brainstorm guitar chord progressions',
      'Animators creating digital storyboard animatics for animated short films',
      'Game developers generating dynamic background ambient music that changes with game tension'
    ],
    simCode: 'song_prompt = "Genre: Electronic Synthwave | Theme: Robot Exploring Mars 🚀"\nverse1 = "Neon tracks in the crimson sand, Solar panels across the land! ⚡"\nprint(song_prompt)\nprint(f"Verse 1: {verse1}")',
    simOutput: 'Genre: Electronic Synthwave | Theme: Robot Exploring Mars 🚀\nVerse 1: Neon tracks in the crimson sand, Solar panels across the land! ⚡',
    pairs: [
      { id: 'p1', term: 'Multimodal AI', definition: 'Artificial intelligence that understands and creates text, images, audio, and video together' },
      { id: 'p2', term: 'Creative Director', definition: 'The human visionary who guides, edits, and curates artistic AI outputs into a finished work' },
      { id: 'p3', term: 'Storyboarding', definition: 'Drawing a sequence of visual panels to plan out a comic or movie scene' }
    ],
    practice: {
      q: 'What does "Multimodal AI" mean?',
      opts: [
        'An AI that can understand and generate multiple types of media: text, images, audio, and video',
        'An AI that only works in cars',
        'A computer with two power buttons',
        'A robot that can only speak French'
      ],
      correct: 0,
      exp: 'Multimodal models integrate vision, sound, text, and data into unified representations.',
      hint: 'Think about "multi" meaning many modes of media.'
    },
    quizzes: [
      {
        q: 'Who is the true author and artist when creating an AI-assisted creative project?',
        opts: [
          { text: 'The human creator who directed the vision, wrote prompts, and edited the final work', isCorrect: true },
          { text: 'The computer monitor screen', isCorrect: false }
        ],
        exp: 'Human curation, original vision, and editorial choices drive authentic artistic creation.'
      }
    ],
    practicalTask: {
      title: 'Comic Strip Storyboard Creator',
      objective: 'Design a 3-panel comic strip storyboard with character prompts and dialogue.',
      steps: [
        'Panel 1: Introduce the Hero Robot in their workshop.',
        'Panel 2: A sudden mystery alert appears on the screen.',
        'Panel 3: The hero blasts off into adventure.',
        'Write the visual prompt description and speech bubble for each panel.'
      ],
      expectedResult: 'You will understand how to direct multimodal story generation step-by-step.'
    },
    recall: {
      q: 'What is Multimodal AI?',
      a: 'An AI that can create and understand text, images, audio, and video all at the same time!'
    },
    takeaways: [
      'Multimodal AI unites lyrics, visual art, and music into immersive creative projects.',
      'You are the creative director: your taste, humor, and curation make the art unique.',
      'Generative tools empower anyone with an imaginative idea to produce professional multimedia.'
    ]
  },

  'can ai be wrong?': {
    title: 'Can AI Be Wrong?',
    hook: 'If a self-driving car misinterprets a white billboard as an open sky or an AI claims that George Washington drove an electric Tesla, how do these mistakes happen?',
    goal: 'Understand the limitations, bias, edge-case failures, and hallucinations of artificial intelligence models.',
    learnPoints: [
      'Understand how training data bias leads to algorithmic errors and unfairness',
      'Learn what Edge Cases and Out-of-Distribution data are in machine learning',
      'Master the principle of Human-in-the-Loop oversight for high-stakes decisions'
    ],
    analogy: 'An AI model is like someone who has only ever seen green apples their entire life: if you show them a red apple, they might insist with 100% confidence that it must be a tomato!',
    explanationHtml: `<h3>Why and How AI Makes Mistakes</h3>
<p>Artificial intelligence does not possess common sense or real-world grounding. It is a mathematical reflection of the data it was trained on.</p>
<h4>The 3 Major Causes of AI Errors</h4>
<ul>
  <li><strong>1. Biased Training Data:</strong> If a facial recognition model is trained on 90% photos of one demographic, it will fail when recognizing others.</li>
  <li><strong>2. Hallucinations:</strong> Language models predict words based on statistical probability, not factual truth.</li>
  <li><strong>3. Edge Cases:</strong> Unusual situations the AI has never encountered before (e.g. a snowman sitting in the middle of a highway).</li>
</ul>`,
    step1: {
      title: '1. Identifying Training Data Bias',
      desc: 'Audit the diversity and balance of datasets before training.',
      detail: 'Unbalanced datasets produce flawed models.',
      code: 'dataset_balance = calculate_class_distribution(training_samples)\nif dataset_balance["minority_class"] < 0.2: flag_bias_warning()'
    },
    step2: {
      title: '2. Detecting Edge Cases & Anomalies',
      desc: 'Detect when input telemetry is far outside normal statistical distributions.',
      detail: 'Falls back to safe default behaviors.',
      code: 'if is_out_of_distribution(sensor_input):\n    trigger_safe_failsafe_mode()'
    },
    step3: {
      title: '3. Human-in-the-Loop Oversight',
      desc: 'Require human authorization for all critical healthcare, legal, and safety choices.',
      detail: 'Ensures accountability.',
      code: 'require_human_confirmation(action="DISPATCH_EMERGENCY_TEAM")'
    },
    realScenario: 'A self-driving test vehicle encountered a person riding a unicycle dressed in a dinosaur costume. The AI classifier became confused because it had never seen a unicycle dinosaur in its training data, and safely passed control back to the human safety driver.',
    useCases: [
      'Auditing facial recognition cameras to eliminate racial and gender recognition bias',
      'Financial fraud systems flagging suspicious edge-case bank transactions for human review',
      'Autonomous aircraft autopilot handing controls to human pilots during extreme turbulence'
    ],
    simCode: 'model_confidence = 0.52 # Low confidence edge case\nif model_confidence < 0.85:\n    print("⚠️ Warning: Edge case detected! Passing decision to Human Expert.")\nelse:\n    print("Automated execution safe.")',
    simOutput: '⚠️ Warning: Edge case detected! Passing decision to Human Expert.',
    pairs: [
      { id: 'p1', term: 'Data Bias', definition: 'Unfairness or blind spots in AI caused by unbalanced or skewed training data' },
      { id: 'p2', term: 'Edge Case', definition: 'An unusual, rare situation that the AI model never encountered during training' },
      { id: 'p3', term: 'Human-in-the-Loop', definition: 'A safety design where human experts review and confirm AI decisions' }
    ],
    practice: {
      q: 'Why can an AI model make mistakes when encountering a rare situation?',
      opts: [
        'Because if an edge case was never included in its training data, the AI has no pattern to match against',
        'Because computers get sleepy after 5 PM',
        'Because the screen ran out of pixels',
        'Because AI models always guess randomly'
      ],
      correct: 0,
      exp: 'Machine learning models can only generalize based on patterns present in their training datasets.',
      hint: 'Think about what happens when a machine sees something totally new.'
    },
    quizzes: [
      {
        q: 'What is "Human-in-the-Loop" in AI safety?',
        opts: [
          { text: 'A system where human experts verify and supervise critical AI decisions to prevent errors', isCorrect: true },
          { text: 'A human running around a computer in a circle', isCorrect: false }
        ],
        exp: 'Human-in-the-loop ensures human judgment and accountability oversee algorithmic predictions.'
      }
    ],
    practicalTask: {
      title: 'Bias Detective Case Study',
      objective: 'Analyze an AI pet door that lets cats in but locks out a fluffy white Persian cat.',
      steps: [
        '1. Why did the door fail? (Training data only had photos of short-haired brown cats).',
        '2. How would you fix the training dataset? (Add 1,000 photos of fluffy white, black, and orange cats).',
        '3. Write the rule for balanced training data.'
      ],
      expectedResult: 'You will understand how diverse training data eliminates algorithmic bias.'
    },
    recall: {
      q: 'Can AI be wrong?',
      a: 'Yes! AI makes mistakes due to biased training data, hallucinations, and unfamiliar edge cases!'
    },
    takeaways: [
      'AI models reflect the flaws, limitations, and blind spots of their training data.',
      'Unusual edge cases can confuse algorithms that lack common sense understanding.',
      'Human-in-the-loop oversight is essential to keep high-stakes AI applications safe.'
    ]
  },

  'be a smart ai user': {
    title: 'Be a Smart AI User',
    hook: 'What separates an average technology user who believes everything online from a savvy digital detective who uses AI like a master innovator?',
    goal: 'Master smart digital citizenship: ethical AI usage, privacy protection, critical fact-checking, and creative problem solving.',
    learnPoints: [
      'Master the Smart AI User Checklist: Protect Privacy, Verify Facts, Add Originality, Give Credit',
      'Understand the ethics of intellectual property, originality, and transparency',
      'Become an empowered digital creator who shapes technology positively'
    ],
    analogy: 'Being a smart AI user is like being a skilled master chef: you might use modern blenders and smart ovens, but your unique culinary recipe, taste, and seasoning make the dish unforgettable!',
    explanationHtml: `<h3>The Code of the Smart AI User</h3>
<p>As artificial intelligence becomes ubiquitous, being a smart, responsible digital citizen is your greatest superpower. Follow the four golden pillars:</p>
<h4>1. Protect Your Privacy</h4>
<p>Never feed confidential secrets, passwords, or personal identifying data into public AI models.</p>
<h4>2. Verify Before You Trust</h4>
<p>Cross-reference claims with trusted library books, academic sources, and teacher guidance.</p>
<h4>3. Add Your Human Touch</h4>
<p>Never submit unedited, raw AI text. Add your own voice, stories, personal humor, and reflections.</p>
<h4>4. Give Honest Attribution</h4>
<p>Be transparent and proud when you use AI tools as research assistants.</p>`,
    step1: {
      title: '1. Privacy Shield Active',
      desc: 'Verify that prompts contain zero personal addresses, passwords, or friend details.',
      detail: 'Maintains digital hygiene.',
      code: 'sanitize_prompt_remove_private_info(user_prompt)'
    },
    step2: {
      title: '2. Triple Fact-Checking Protocol',
      desc: 'Check 2 independent authoritative sources for every factual assertion.',
      detail: 'Eliminates reliance on hallucinations.',
      code: 'if verify_with_encyclopedia(fact) and verify_with_textbook(fact):\n    include_in_report()'
    },
    step3: {
      title: '3. Adding Authentic Voice & Attribution',
      desc: 'Write original conclusions and add a clear citation disclosure.',
      detail: 'Upholds academic and creative integrity.',
      code: 'add_disclosure("Research brainstormed with AI Assistant; written and verified by Author.")'
    },
    realScenario: 'A student used AI to brainstorm 5 interview questions about solar energy for a local engineer, recorded the live interview, and wrote an award-winning school newspaper article with full transparency.',
    useCases: [
      'Students disclosing AI brainstorm assistance on science fair display boards',
      'Authors verifying historical facts with museum archives before publishing novels',
      'Engineers auditing software code generated by AI for security vulnerabilities before deployment'
    ],
    simCode: 'checklist = {"Privacy Protected": True, "Facts Verified": True, "Original Voice Added": True, "Credit Given": True}\nif all(checklist.values()):\n    print("🌟 Certified Smart AI User: 100% Ethical & Empowered! 🚀")',
    simOutput: '🌟 Certified Smart AI User: 100% Ethical & Empowered! 🚀',
    pairs: [
      { id: 'p1', term: 'Smart AI Citizen', definition: 'A user who uses AI tools ethically, protects privacy, verifies facts, and adds original creativity' },
      { id: 'p2', term: 'Attribution', definition: 'Transparently giving credit to tools, authors, and sources used in research' },
      { id: 'p3', term: 'Digital Hygiene', definition: 'Regular habits of keeping passwords secure, auditing privacy settings, and staying safe online' }
    ],
    practice: {
      q: 'What is the hallmark of a Smart AI User when doing a school research project?',
      opts: [
        'Using AI to brainstorm and understand concepts, verifying facts with trusted sources, and writing in their own original voice with honest credit',
        'Copy-pasting whatever the chatbot says and turning it in without reading it',
        'Claiming they invented the computer',
        'Typing their home address into every prompt'
      ],
      correct: 0,
      exp: 'Smart AI users combine research assistance with verification, human originality, and transparency.',
      hint: 'Look for the option highlighting verification, originality, and honest credit.'
    },
    quizzes: [
      {
        q: 'Why should you always add your own human stories, humor, and thoughts to AI-assisted work?',
        opts: [
          { text: 'Because your unique human perspective, emotions, and creativity are what make work truly meaningful and authentic', isCorrect: true },
          { text: 'Because computers don’t like punctuation', isCorrect: false }
        ],
        exp: 'Human authenticity, original insight, and lived experience cannot be replicated by algorithms.'
      }
    ],
    practicalTask: {
      title: 'Smart AI User Pledge Certificate',
      objective: 'Write and sign your 4-point Smart AI User Pledge for your study notebook.',
      steps: [
        '1. I will protect my private information and passwords.',
        '2. I will always fact-check surprising claims with trusted sources.',
        '3. I will infuse my own creativity, humor, and voice into everything I create.',
        '4. I will be honest, transparent, and kind as a digital citizen.',
        'Sign and date your pledge!'
      ],
      expectedResult: 'You will graduate as an empowered, ethical digital leader ready to shape the future of technology.'
    },
    recall: {
      q: 'What are the 4 Golden Rules of a Smart AI User?',
      a: '1. Protect Privacy, 2. Verify Facts, 3. Add Original Voice, 4. Give Honest Credit!'
    },
    takeaways: [
      'Smart AI users harness technology as a creative amplifier, not a replacement for thinking.',
      'Always verify facts with authoritative sources and protect confidential private data.',
      'Your human empathy, ethics, and authentic voice are your greatest superpowers in the digital age.'
    ]
  }
}
