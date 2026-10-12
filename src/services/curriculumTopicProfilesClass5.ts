// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC JUNIOR AI OLYMPIAD CURRICULUM: CLASS 5 (12 DISTINCT LESSONS)
// Foundations of Smart Computing • Ages 10-11
// Authoritative Syllabus: Chapters 1-6 (2 Lessons per Chapter)
// Reference: AI Learning Machines Notes Class 5 & Official Syllabus Specs
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS5_TOPIC_PROFILES: Record<string, TopicProfile> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 1: AI BASICS (The Big Secret, Machine Learning & Neural Networks)
  // ═══════════════════════════════════════════════════════════════════════════

  'the secret behind ai': {
    title: 'The Secret Behind AI',
    hook: 'How can a computer recognise a fluffy cat when no human programmer ever wrote rules for every single cat fur and whisker in the universe?',
    goal: 'Uncover the big secret of Artificial Intelligence: learning from thousands of examples rather than hand-coded rules, and explore how artificial neural networks mimic the human brain.',
    learnPoints: [
      'Discover the big secret: AI learns patterns from MANY EXAMPLES (data), just like a child learns by seeing cats and dogs',
      'Understand the 3 core ingredients of Machine Learning: Data, Patterns, and Practice',
      'Explore the Artificial Neural Network: Input Layer &rarr; Thinking Layers (Hidden Neurons with Weights) &rarr; Output Layer'
    ],
    analogy: 'An Artificial Neural Network is like a relay team of thousands of tiny detectives: Detective 1 checks for pointy ears, Detective 2 checks for whiskers, Detective 3 checks for a snout, and together they vote on whether the photo is a cat or a dog!',
    explanationHtml: `<h3>The Big Secret: Learning from Examples</h3>
<p>When you were a toddler, your family never handed you a 500-page rulebook with math formulas describing a cat. Instead, you saw cats in books, in the garden, and on street corners. Your family said, <em>"Look, a cat!"</em> After seeing hundreds of cats, your brain naturally learned the pattern.</p>
<h4>Normal Computer Code vs Machine Learning</h4>
<ul>
  <li><strong>Traditional Computer Code:</strong> A programmer writes rigid rules: <code>IF speed > 60 THEN warning()</code>. If a situation was not programmed, the computer fails.</li>
  <li><strong>Machine Learning AI:</strong> We show the machine 50,000 photos labeled "Cat" or "Dog". The computer searches for repeating pixel combinations and discovers the rules by itself!</li>
</ul>
<h4>The Machine\'s Brain: Artificial Neural Network</h4>
<p>Scientists were inspired by the billions of biological neurons in the human brain:</p>
<ol>
  <li><strong>Input Layer:</strong> Takes in raw pixel numbers from a digital photo or sound wave.</li>
  <li><strong>Thinking Layers (Hidden Layers):</strong> Multiple layers of connected mathematical nodes (artificial neurons). Each connection has a number called a <strong>Weight</strong>.</li>
  <li><strong>Output Layer:</strong> Produces the final prediction and confidence score: e.g. <em>"Cat (94% confidence)"</em>.</li>
</ol>
<p><strong>What is 'Learning'?</strong> Learning is simply tuning connection weights! Each time the AI makes a mistake, feedback adjusts the weights a tiny bit until mistakes drop close to zero.</p>`,
    step1: {
      title: '1. Ingesting Labeled Example Datasets',
      desc: 'Humans collect thousands of photos and tag each one with a ground-truth label.',
      detail: 'Labels like "Cat" or "Dog" serve as the answer key for training.',
      code: '# Dataset Ingestion\ntraining_samples = load_labeled_dataset(count=50000)\nfeatures = extract_edges_and_textures(training_samples)'
    },
    step2: {
      title: '2. Forward Propagation through Neural Layers',
      desc: 'Signals flow from input nodes across hidden layers multiplied by connection weights.',
      detail: 'Neurons fire if the combined signal exceeds their activation threshold.',
      code: 'hidden_activation = activation_function(dot_product(inputs, weights) + bias)\noutput_prediction = softmax(hidden_activation)'
    },
    step3: {
      title: '3. Backpropagation and Weight Adjustment',
      desc: 'The difference between prediction and label (error) calculates weight adjustments.',
      detail: 'Tiny mathematical nudges make the neural network slightly more accurate with every batch.',
      code: 'loss = calculate_error(output_prediction, true_label)\nweights = update_weights(weights, loss, learning_rate=0.01)'
    },
    realScenario: 'In a nature sanctuary, an automatic camera needed to spot endangered snow leopards in snow blizzards. Instead of writing code for every snow angle, rangers trained a deep neural network on 15,000 mountain photos. Within weeks, the AI could spot a camouflaged leopard behind a frosty boulder in 0.05 seconds!',
    useCases: [
      'Speech recognition systems transforming diverse accents into text using acoustic neural networks',
      'Postal sorting centers using optical character neural nets to read handwritten postal pin codes',
      'Medical vision models learning to distinguish healthy cells from diseased tissue across biopsy scans'
    ],
    simCode: 'weights = 0.5\ninput_val = 2.0\nprediction = input_val * weights\ntrue_target = 1.4\nerror = prediction - true_target\nweights -= 0.1 * error\nprint(f"Prediction: {prediction:.2f}, Error: {error:.2f}, Adjusted Weight: {weights:.2f}")',
    simOutput: 'Prediction: 1.00, Error: -0.40, Adjusted Weight: 0.54',
    pairs: [
      { id: 'p1', term: 'Artificial Neural Network', definition: 'A computer program composed of layers of connected artificial neurons inspired by the human brain' },
      { id: 'p2', term: 'Weight', definition: 'A numerical value on a neural connection that gets tuned during training to make predictions accurate' },
      { id: 'p3', term: 'Label', definition: 'The correct name or tag written on a training example (like "Cat" or "Dog")' }
    ],
    practice: {
      q: 'What actually happens inside an artificial neural network when a machine "learns"?',
      opts: [
        'The computer screen grows real biological brain cells',
        'The mathematical connection numbers (weights) between neurons are adjusted so errors become smaller',
        'The computer deletes all its memory files and starts over',
        'A human technician types in the answer to every photo manually'
      ],
      correct: 1,
      exp: 'Learning in artificial neural networks means adjusting connection weights via mathematical optimization so the network makes fewer prediction errors over time.',
      hint: 'Think about what numerical values change between the artificial neurons.'
    },
    quizzes: [
      {
        q: 'Why was the idea of neural networks inspired by human biology?',
        opts: [
          { text: 'Because scientists observed how billions of interconnected neurons in the human brain communicate and learn from experience', isCorrect: true },
          { text: 'Because computer microchips have real hearts and lungs', isCorrect: false },
          { text: 'Because computers need to drink water to stay cool', isCorrect: false },
          { text: 'Because keyboards are shaped like human hands', isCorrect: false }
        ],
        exp: 'Artificial neural networks were directly inspired by biological neuroscience: networks of simple interconnected units passing electrical/numerical signals.'
      },
      {
        q: 'In a neural network, what is the role of the Input Layer?',
        opts: [
          { text: 'It produces the final answer like "Cat" or "Dog"', isCorrect: false },
          { text: 'It receives raw data signals, such as image pixel brightness values or audio waveforms', isCorrect: true },
          { text: 'It shuts down the computer when it gets too hot', isCorrect: false },
          { text: 'It charges the battery', isCorrect: false }
        ],
        exp: 'The input layer accepts external data signals (such as raw pixel matrix values) and feeds them into the hidden thinking layers.'
      }
    ],
    practicalTask: {
      title: 'Draw and Trace a 3-Layer Neural Network',
      objective: 'Diagram an Artificial Neural Network classifying apples vs oranges and calculate signal propagation.',
      steps: [
        'Draw 3 Input Neurons: [Color Hue], [Roundness], [Skin Texture].',
        'Draw 2 Hidden Layer Neurons: [Fruit Detective A], [Fruit Detective B] and connect every input neuron with lines (representing weights).',
        'Draw 2 Output Neurons: [Apple], [Orange].',
        'Trace an input: Color=Bright Orange (0.9), Texture=Bumpy (0.8). Show how strong signals flow to the [Orange] output neuron.'
      ],
      expectedResult: 'You will visually map how multi-layer neural architecture processes inputs into classified outputs.'
    },
    recall: {
      q: 'What is the secret behind AI learning machines?',
      a: 'They learn patterns from many labeled examples using neural networks with adjustable mathematical weights!'
    },
    takeaways: [
      'Machine Learning teaches computers through data and examples rather than fixed hand-coded rules.',
      'Artificial neural networks consist of Input, Hidden (thinking), and Output layers.',
      'Learning is the systematic adjustment of connection weights to reduce prediction errors.'
    ],
    gameMechanic: {
      title: 'Neural Net Neuron Linker & Weight Tuner',
      scenario: 'You are the Lead Neural Engineer at DeepBrain Academy. A newborn 3-layer neural network has arrived to classify images of Kittens vs Puppies. The connection weights are currently random, so the model is guessing with only 50% accuracy! You must tune the weight knobs across 3 training epochs.',
      objective: 'Tune the connection weights for Ear Shape, Whisker Length, and Snout Curvature to achieve 95%+ classification accuracy.',
      rules: [
        'Rule 1: Pointy Ears signal must route with high positive weight to Kitten Neuron.',
        'Rule 2: Floppy Ears signal must route with high positive weight to Puppy Neuron.',
        'Rule 3: Observe the loss curve drop as you calibrate the weight sliders.'
      ],
      choices: [
        'Tune Whisker Weight: Increase to +0.85 for Kitten feature path',
        'Tune Snout Weight: Increase to +0.80 for Puppy feature path',
        'Tune Bounding Threshold: Set activation bias to 0.5 to balance false positives'
      ],
      progression: [
        'Epoch 1: Weights calibrated; accuracy rises from 50% to 72% (+100 pts)',
        'Epoch 2: Error loss drops by half; tricky fluffy dog breeds classified (+120 pts)',
        'Epoch 3: Neural network reaches 98.4% benchmark accuracy (+140 pts)'
      ],
      completion: 'Neural network trained to master level! Awarded the Neural Network Architect Badge.',
      badge: 'Neural Network Architect 🧠',
      points: 360
    },
    reflectionSafety: {
      prompt: 'If a neural network makes a prediction, can it explain "why" in simple human words? Why is this a challenge in sensitive areas like medicine?',
      rule: 'Explainability & Oversight Rule: Neural networks are complex mathematical webs. For life-critical decisions, humans must always verify the logic behind AI suggestions.',
      discussion: 'Why do computer scientists work hard to make "black-box" neural networks transparent and explainable?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What are the three essential ingredients of Machine Learning?',
        opts: [
          'Wires, Batteries, and Screens',
          'Data (examples), Patterns (repeating clues), and Practice (tuning feedback)',
          'Paper, Pencils, and Erasers',
          'Internet, WiFi, and Bluetooth'
        ],
        correct: 1,
        exp: 'Machine Learning requires Data (examples to learn from), Patterns (repeating structures the machine discovers), and Practice (iterative error correction).',
        hint: 'What does a machine need to see, discover, and do repeatedly to get smart?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: What is a "weight" in an artificial neural network?',
        opts: [
          'How heavy the computer monitor is in kilograms',
          'A mathematical number that determines the strength of the connection between two neurons',
          'The number of fans cooling the processor',
          'The price of the software license'
        ],
        correct: 1,
        exp: 'Weights are the adjustable parameters that scale the signal passing between neurons, representing the learned memory of the network.',
        hint: 'Is weight a physical measurement or a mathematical multiplier?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An image classifier has 3 layers: an input layer of 784 pixels, a hidden layer of 16 neurons, and an output layer of 10 digits (0 to 9). Why is the hidden layer called "hidden"?',
        opts: [
          'Because programmers hide the code so nobody steals it',
          'Because it sits between the external input and the final output, performing intermediate mathematical feature extraction out of direct view',
          'Because the neurons are invisible to microscopes',
          'Because it is turned off during the daytime'
        ],
        correct: 1,
        exp: 'Hidden layers are called "hidden" simply because they do not directly interact with the external world (neither receiving direct raw input nor producing final external output).',
        hint: 'Think about its position between the input layer and output layer.',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'learning machines': {
    title: 'Learning Machines',
    hook: 'When an AI model first tries to tell dogs from wolves, it scores 50% wrong. After 10,000 feedback rounds, it gets 99% right! How does a machine learn from its mistakes without feeling sad?',
    goal: 'Master the 5-step Machine Learning feedback cycle: Collect Data, Find Patterns, Predict, Receive Feedback, and Adjust (Guess, Check, Fix, Repeat), and understand training vs testing datasets.',
    learnPoints: [
      'Master the 5 steps of Machine Learning: 1. Collect Data &rarr; 2. Find Patterns &rarr; 3. Predict &rarr; 4. Get Feedback &rarr; 5. Adjust & Get Smarter',
      'Understand the Golden Formula: Learning = Guess, Check, Fix, Repeat',
      'Distinguish between Training Data (used for practice) and Test Data (used for the final exam)'
    ],
    analogy: 'Teaching a machine is just like practicing archery: on your first shot, the arrow lands way to the left (Error!); your coach says "Aim 5cm to the right" (Feedback!); you adjust your grip (Fix!); and with repeated practice, you hit the bullseye every single time!',
    explanationHtml: `<h3>The 5-Step Machine Learning Cycle</h3>
<p>A machine does not get smarter through magic. It gets smarter through a structured mathematical loop of trial, error, and correction. This loop repeats thousands or millions of times!</p>
<h4>The 5 Steps Explained</h4>
<ol>
  <li><strong>Step 1: Collect Data 📸:</strong> Gather thousands of high-quality examples with verified labels (e.g., 10,000 cat photos, 10,000 dog photos).</li>
  <li><strong>Step 2: Find Patterns 🔍:</strong> The machine scans the images and identifies repeating mathematical features (ear contours, snout width, eye distances).</li>
  <li><strong>Step 3: Practice and Guess (Predict) 🎯:</strong> The machine is shown an image and makes a prediction: <em>"I guess this is a Dog with 60% confidence."</em></li>
  <li><strong>Step 4: Receive Feedback 📢:</strong> The training algorithm compares the guess against the true label. If wrong, it calculates the mathematical <strong>Error (Loss)</strong>.</li>
  <li><strong>Step 5: Adjust and Improve (Fix) 🔄:</strong> The algorithm updates connection weights. The machine fixes itself a little and repeats!</li>
</ol>
<h4>Training Data vs Testing Data</h4>
<p>Just like a teacher gives you practice worksheets during class (Training Data) and then tests you with brand new questions on exam day (Test Data), an AI must be tested on photos it has <strong>never seen before</strong> to prove it has truly learned general patterns rather than simply memorizing answers!</p>`,
    step1: {
      title: '1. Partitioning Training and Test Datasets',
      desc: 'Split data into 80% for training (practice) and 20% for testing (evaluation).',
      detail: 'Ensures the model generalises to unseen real-world cases.',
      code: '# Data Partitioning\ntrain_data, test_data = train_test_split(dataset, ratio=0.8)'
    },
    step2: {
      title: '2. Running the Training Epoch Loop',
      desc: 'Feed training batches through the model, computing loss across thousands of samples.',
      detail: 'Loss curves start high and steadily slope downward as accuracy climbs.',
      code: 'for epoch in range(100):\n    predictions = model(train_data)\n    loss = loss_func(predictions, train_labels)\n    optimizer.step(loss)'
    },
    step3: {
      title: '3. Validating on Independent Test Data',
      desc: 'Evaluate model accuracy on the held-out test dataset without giving answers.',
      detail: 'If the model scores 96% on test data, it is ready for deployment.',
      code: 'test_accuracy = evaluate(model, test_data)\nprint(f"Final Test Accuracy: {test_accuracy}%")'
    },
    realScenario: 'Engineers trained a fruit-sorting machine at an apple orchard. On Day 1, the camera confused green bruised apples with ripe apples. After 50,000 feedback cycles where human sorters corrected its guesses, the machine’s neural net achieved 99.2% accuracy, sorting 10 apples per second without bruising a single one.',
    useCases: [
      'Email spam filters improving daily by learning from emails marked as "Report Spam" by users',
      'Handwriting recognizers learning cursive letters across thousands of student sample sheets',
      'Voice assistants improving transcription accuracy across different regional accents and dialects'
    ],
    simCode: 'accuracy = 50.0\nfor epoch in range(1, 6):\n    accuracy += (100.0 - accuracy) * 0.4\n    print(f"Practice Round {epoch}: Accuracy = {accuracy:.1f}%")\nprint("Final Result: Machine reached high mastery!")',
    simOutput: 'Practice Round 1: Accuracy = 70.0%\nPractice Round 2: Accuracy = 82.0%\nPractice Round 3: Accuracy = 89.2%\nPractice Round 4: Accuracy = 93.5%\nPractice Round 5: Accuracy = 96.1%\nFinal Result: Machine reached high mastery!',
    pairs: [
      { id: 'p1', term: 'Training Data', definition: 'The practice examples (with labels) used to teach an AI model patterns' },
      { id: 'p2', term: 'Test Data', definition: 'Brand new examples held back to evaluate whether the AI can solve unseen problems' },
      { id: 'p3', term: 'Loss / Error', definition: 'The mathematical measurement of how far off an AI\'s prediction was from the correct answer' }
    ],
    practice: {
      q: 'Why must we test an AI model on brand new "Test Data" that it was NOT shown during training?',
      opts: [
        'To make sure the model has truly learned general patterns rather than just memorizing the practice photos',
        'Because computers forget old photos after 5 minutes',
        'Because test data takes up less electrical power',
        'To see if the screen glass breaks'
      ],
      correct: 0,
      exp: 'Testing on unseen data proves whether the model can generalize its pattern recognition to novel real-world situations, rather than merely memorizing training examples.',
      hint: 'Think about why your teacher gives you new questions on exam day rather than the exact same worksheet sums.'
    },
    quizzes: [
      {
        q: 'What is the simple formula that summarizes how machine learning works?',
        opts: [
          { text: 'Sleep, Forget, Restart, Delete', isCorrect: false },
          { text: 'Guess, Check, Fix, Repeat', isCorrect: true },
          { text: 'Buy, Sell, Trade, Profit', isCorrect: false },
          { text: 'Type, Print, Cut, Paste', isCorrect: false }
        ],
        exp: 'Machine learning is an iterative optimization cycle: make a guess, compare with ground truth (check), update parameters (fix), and repeat until accurate.'
      },
      {
        q: 'What happens to the error (loss) graph of an AI model as it receives more good practice rounds?',
        opts: [
          { text: 'The error graph slopes downward toward zero as the model gets smarter', isCorrect: true },
          { text: 'The error graph goes straight up because the computer gets tired', isCorrect: false },
          { text: 'The graph turns into a circle and stops', isCorrect: false },
          { text: 'The graph disappears completely', isCorrect: false }
        ],
        exp: 'As feedback corrects connection weights, the model makes fewer mistakes, causing the loss curve to decrease steadily.'
      }
    ],
    practicalTask: {
      title: 'The Paper Flashcard Machine Learning Experiment',
      objective: 'Simulate the 5-step machine learning loop with a partner using paper cards and token counters.',
      steps: [
        'Prepare 10 index cards with drawings of fictional alien creatures (5 "Zorks" with horns, 5 "Glibs" with antennae).',
        'Student A acts as the "Learning Machine" with 0 initial knowledge.',
        'Student B shows cards one by one. Student A guesses: "Is this a Zork?".',
        'Student B provides feedback: "Correct" (+1 token) or "Wrong: Zorks always have horns" (Adjust rule!).',
        'Track Student A’s accuracy score over Round 1 vs Round 2 to witness learning in action.'
      ],
      expectedResult: 'You will experience firsthand how feedback loops transform initial guesswork into structured pattern mastery.'
    },
    recall: {
      q: 'What are the 5 steps of machine learning?',
      a: '1. Collect Data &rarr; 2. Find Patterns &rarr; 3. Predict &rarr; 4. Get Feedback &rarr; 5. Adjust & Get Smarter (Guess, Check, Fix, Repeat)!'
    },
    takeaways: [
      'Machine learning follows the loop: Guess, Check, Fix, and Repeat.',
      'Training data teaches the model; unseen Test data evaluates its real-world generalization.',
      'As high-quality practice cycles increase, model loss decreases and accuracy climbs.'
    ],
    gameMechanic: {
      title: 'Data Training Gym: Train the Classifier',
      scenario: 'You are the Head Coach at the AI Data Training Gym. Your student model, "PixelBot", must be trained to separate apples from tomatoes on an automated grocery conveyor belt. You must manage dataset balance, trigger the feedback loop, and verify the loss curve.',
      objective: 'Run 3 training batches, balance training examples, eliminate false classifications, and achieve 98% accuracy on the unseen Test Conveyor.',
      rules: [
        'Rule 1: Add balanced samples of Green Apples, Red Apples, Cherry Tomatoes, and Beefsteak Tomatoes.',
        'Rule 2: Trigger the Guess-Check-Fix backpropagation training step.',
        'Rule 3: Test on the Mystery Grocery Box with unseen produce.'
      ],
      choices: [
        'Batch 1 Setup: Feed 50 Red Apples and 50 Red Tomatoes (Add texture/stem feature labels)',
        'Batch 2 Feedback: Adjust loss on stem detection when smooth cherry tomatoes are misidentified',
        'Batch 3 Final Test: Deploy PixelBot to inspect 20 unknown mystery produce items'
      ],
      progression: [
        'Round 1: Initial training run completed; error rate drops from 48% to 22% (+110 pts)',
        'Round 2: Stem and calyx feature weights tuned; loss curve plummets (+120 pts)',
        'Round 3: Perfect 20/20 score on the unseen mystery produce evaluation (+140 pts)'
      ],
      completion: 'PixelBot passed the supermarket robotics qualification exam! Awarded the Machine Learning Trainer Badge.',
      badge: 'Machine Learning Trainer 🏋️‍♂️',
      points: 370
    },
    reflectionSafety: {
      prompt: 'If you train a machine with only 10 blurry photos, can it become a reliable AI assistant? Why is data quality so important?',
      rule: 'Garbage In, Garbage Out Rule: If you feed an AI poor, noisy, or unfair data, it will produce poor, noisy, and unfair results.',
      discussion: 'Why do data scientists spend most of their time cleaning and verifying training datasets?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: In the machine learning cycle, what is the role of "Feedback"?',
        opts: [
          'To tell the computer that its battery is full',
          'To inform the model whether its guess was right or wrong so it can adjust its weights',
          'To make a loud beeping sound to wake up the user',
          'To clean the camera lens'
        ],
        correct: 1,
        exp: 'Feedback provides error signal information, allowing the optimization algorithm to adjust internal weights in the direction that minimizes mistakes.',
        hint: 'What does a student need to know after taking a practice quiz to improve?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: An engineer trains a self-driving car vision model on 100,000 photos taken on sunny California highways. When tested on snowy roads in Canada, the car makes frequent mistakes. What was the cause of this failure?',
        opts: [
          'The car\'s heater was broken',
          'The training dataset lacked diversity and had zero snow examples, so the model never learned patterns for icy or snowy roads',
          'Canadian road signs are written in an invisible font',
          'The tires were too small'
        ],
        correct: 1,
        exp: 'Models can only learn patterns present in their training data. A model trained exclusively on sunny roads fails to generalize to snowy environments.',
        hint: 'Did the model see snow during its practice training stage?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI developer notices that their model scores 100% accuracy on its training worksheet photos, but drops to 52% on the independent test exam photos. What phenomenon has occurred, and how is it resolved?',
        opts: [
          'Overfitting: the model simply memorized the specific training photos instead of general patterns; resolved by gathering diverse data and applying regularization',
          'Underclocking: the computer processor needs to be submerged in ice water',
          'The test exam was written upside down',
          'The model ran out of internet bandwidth'
        ],
        correct: 0,
        exp: 'Overfitting occurs when a complex model memorizes idiosyncratic noise in training data rather than underlying patterns. It scores high on training data but fails on novel test data.',
        hint: 'What happens when a student memorizes page numbers instead of understanding the science concept?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 2: COMMUNICATE WITH AI (Logic Gates, Branching & Prompt Recipes)
  // ═══════════════════════════════════════════════════════════════════════════

  'crack the logic!': {
    title: 'Crack the Logic!',
    hook: 'An automated greenhouse bot turned on the sprinklers and soaked the flowers while heavy rain was already pouring from the sky! What logical flaw was hiding in its computer instructions?',
    goal: 'Master algorithmic logic, Boolean operators (AND, OR, NOT), conditional branching (IF-THEN-ELSE), and decision trees to build smart, error-free automated systems.',
    learnPoints: [
      'Understand how computers evaluate logical conditions: TRUE or FALSE (Boolean Logic)',
      'Master the three fundamental logical gates: AND (both must be true), OR (at least one is true), and NOT (the opposite)',
      'Construct decision trees and conditional branching (IF-THEN-ELSE) to solve real-world problems'
    ],
    analogy: 'Boolean logic is like packing for school: you take your umbrella IF it is raining OR the forecast predicts storms; you go outside to play IF homework is finished AND the rain has stopped!',
    explanationHtml: `<h3>Cracking the Code of Computer Logic</h3>
<p>Computers do not have human intuition. Underneath every screen, robot, and AI algorithm lies <strong>Boolean Logic</strong>—a mathematical system where every statement evaluates strictly to <strong>TRUE</strong> or <strong>FALSE</strong>.</p>
<h4>The Three Core Logic Gates</h4>
<ul>
  <li><strong>1. AND 🤝:</strong> ALL conditions must be true for the action to happen.<br/>
  <em>Example:</em> <code>IF soil_is_dry == True AND raining_outside == False: turn_on_sprinklers()</code></li>
  <li><strong>2. OR 🔀:</strong> AT LEAST ONE condition must be true.<br/>
  <em>Example:</em> <code>IF smoke_detected == True OR fire_alarm_pressed == True: trigger_evacuation_alarm()</code></li>
  <li><strong>3. NOT 🚫:</strong> Inverts the condition (turns True into False, and False into True).<br/>
  <em>Example:</em> <code>IF NOT door_is_locked: sound_warning_beep()</code></li>
</ul>
<h4>Decision Trees: Mapping Complex Choices</h4>
<p>A Decision Tree is a branching roadmap of questions. Starting from the root, every answer splits into two branches until you reach the final decision. This is exactly how diagnostic bots, game characters, and AI recommendation systems evaluate conditions!</p>`,
    step1: {
      title: '1. Defining Boolean Truth States',
      desc: 'Formulate conditions that evaluate strictly to True or False without ambiguity.',
      detail: 'Sensors report binary values: water_level > 50 (True or False).',
      code: '# Boolean Evaluation\nsoil_dry = True\nis_raining = False'
    },
    step2: {
      title: '2. Combining Conditions with AND / OR / NOT',
      desc: 'Link multiple criteria to prevent contradictory or wasteful system actions.',
      detail: 'Ensure automated sprinklers check weather conditions before pumping water.',
      code: 'should_water = soil_dry and (not is_raining)\nprint("Activate Sprinklers?", should_water)'
    },
    step3: {
      title: '3. Executing Branching IF-THEN-ELSE Logic',
      desc: 'Direct the computer along distinct action pathways based on the outcome.',
      detail: 'Provides fallback safety rules when unexpected situations occur.',
      code: 'if should_water:\n    pump_water(duration_secs=30)\nelse:\n    log_status("Sprinklers remain OFF - conditions not met")'
    },
    realScenario: 'A student coded an automatic pet door: `IF pet_microchip_matches == True AND time_of_day < 21: open_door()`. The door let the family cat in during the afternoon, but safely locked at 9:00 PM to prevent wild raccoons from wandering into the kitchen at night.',
    useCases: [
      'Smart thermostats heating rooms: `IF temperature < 18 AND human_present == True`',
      'Autonomous emergency brakes: `IF obstacle_ahead == True AND brake_pedal_pressed == False`',
      'ATM cash dispensers: `IF pin_correct == True AND account_balance >= requested_amount`'
    ],
    simCode: 'soil_dry = True\nis_raining = True\n# Flawed logic: only checks soil_dry!\n# Correct logic: checks both!\nflawed_action = "Water plants!" if soil_dry else "Wait"\nsmart_action = "Water plants!" if (soil_dry and not is_raining) else "Keep sprinklers off!"\nprint("Flawed Bot:", flawed_action)\nprint("Smart Bot:", smart_action)',
    simOutput: 'Flawed Bot: Water plants!\nSmart Bot: Keep sprinklers off!',
    pairs: [
      { id: 'p1', term: 'Boolean Logic', definition: 'A branch of mathematics where statements evaluate strictly to TRUE or FALSE' },
      { id: 'p2', term: 'AND Operator', definition: 'A logical rule requiring ALL listed conditions to be true simultaneously' },
      { id: 'p3', term: 'OR Operator', definition: 'A logical rule requiring at least ONE condition to be true' }
    ],
    practice: {
      q: 'A smart street lamp should turn ON only when it is dark outside AND someone is walking on the sidewalk. Which logical condition matches this rule?',
      opts: [
        'IF dark == True OR walking == True: lamp_on()',
        'IF dark == True AND walking == True: lamp_on()',
        'IF NOT dark: lamp_on()',
        'IF walking == False: lamp_on()'
      ],
      correct: 1,
      exp: 'Both conditions must be met simultaneously: it must be dark AND a person must be present. The AND operator enforces this rule.',
      hint: 'Remember that BOTH criteria must happen together, not just one.'
    },
    quizzes: [
      {
        q: 'What is the output of the logical statement: `True AND False`?',
        opts: [
          { text: 'True', isCorrect: false },
          { text: 'False, because the AND operator requires BOTH sides to be True', isCorrect: true },
          { text: 'Maybe', isCorrect: false },
          { text: 'None of the above', isCorrect: false }
        ],
        exp: 'For an AND condition to evaluate to True, every connected sub-condition must be True. If even one is False, the result is False.'
      },
      {
        q: 'In a smart home security system, which operator should be used for fire alarms: `smoke_detected [?] heat_spike_detected`?',
        opts: [
          { text: 'OR — because you want the alarm to sound if EITHER smoke OR dangerous heat is detected to protect lives quickly', isCorrect: true },
          { text: 'AND — because you must wait for both before warning anyone', isCorrect: false },
          { text: 'NOT — because alarms should never sound', isCorrect: false },
          { text: 'NONE — alarms should only be rung manually with a bell', isCorrect: false }
        ],
        exp: 'Safety systems use OR for emergency triggers so that detection of either danger immediately activates alarms.'
      }
    ],
    practicalTask: {
      title: 'Map a "What to Wear" Decision Tree',
      objective: 'Draw a complete branching decision tree for selecting school attire based on morning weather conditions.',
      steps: [
        'Root Question: "Is Temperature < 15°C?". Split into YES and NO branches.',
        'YES Branch: Question: "Is it Raining?". YES &rarr; Warm Jacket + Rain Boots; NO &rarr; Warm Sweater + Sneakers.',
        'NO Branch: Question: "Is it Sunny?". YES &rarr; T-Shirt + Sun Cap; NO &rarr; Regular School Uniform.',
        'Trace 2 test days through your tree with a classmate.'
      ],
      expectedResult: 'You will demonstrate how multi-level conditional branching solves decision problems methodically.'
    },
    recall: {
      q: 'What are the three fundamental Boolean logic operators?',
      a: 'AND (both must be true), OR (either can be true), and NOT (inverts truth to false and vice-versa)!'
    },
    takeaways: [
      'Computers evaluate decisions using Boolean True/False logic.',
      'AND requires all criteria; OR requires at least one; NOT flips the condition.',
      'Decision trees organize complex branching choices into predictable, reliable rules.'
    ],
    gameMechanic: {
      title: 'Logic Gate Maze: Automated Greenhouse',
      scenario: 'You are Chief Automation Engineer at the Lunar Biosphere Greenhouse. Rare alien orchids need exact climate care. Sudden environmental shifts (meteor dust, solar heat spikes, moisture drops) are threatening the crops. You must wire the Boolean logic gates to the climate control pumps!',
      objective: 'Wire AND, OR, and NOT logic gate circuits across 3 levels to maintain optimal greenhouse conditions.',
      rules: [
        'Level 1: Connect Sprinkler &rarr; [Soil Moisture < 20%] AND [NOT Raining].',
        'Level 2: Connect Solar Shade &rarr; [Sun Radiation > 80%] OR [Inside Temp > 32°C].',
        'Level 3: Connect Emergency Oxygen &rarr; [O2 Level < 19%] AND [Dome Air Seal == Intact].'
      ],
      choices: [
        'Circuit Board 1: Wire AND gate to Sprinkler pump lines',
        'Circuit Board 2: Wire OR gate to Solar Shade motor lines',
        'Circuit Board 3: Wire NOT gate to Invert Rain sensor feed'
      ],
      progression: [
        'Sector 1: Soil irrigation circuit stabilized; orchids hydrated (+110 pts)',
        'Sector 2: Thermal heat spike shielded automatically (+120 pts)',
        'Sector 3: Biosphere oxygen balance restored to 100% (+140 pts)'
      ],
      completion: 'The Lunar Biosphere achieved autonomous climate perfection! Awarded the Logic Gate Master Badge.',
      badge: 'Logic Gate Master ⚡',
      points: 370
    },
    reflectionSafety: {
      prompt: 'If a programmer forgets to add an "emergency override" rule in an automated elevator system, what could happen during a power outage?',
      rule: 'Fail-Safe Engineering Principle: Every automated logical system must include a manual or battery-backed safety override to protect human lives.',
      discussion: 'Why do elevators have mechanical emergency brakes that activate automatically even if all computer chips lose power?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: If condition A is False and condition B is True, what does the expression `(A OR B)` evaluate to?',
        opts: [
          'False',
          'True',
          'Zero',
          'Syntax Error'
        ],
        correct: 1,
        exp: 'The OR operator requires only one condition to be True. Since B is True, `(A OR B)` evaluates to True.',
        hint: 'Does OR need both conditions, or just at least one?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: An automated school bell algorithm is written as: `IF (time == 13:00 AND is_weekend == False AND is_holiday == False): ring_bell()`. On Sunday at 13:00, will the bell ring?',
        opts: [
          'Yes, because it is 13:00',
          'No, because `is_weekend` is True on Sunday, so the condition `is_weekend == False` becomes False, stopping the AND expression',
          'Yes, because bells love ringing on Sundays',
          'No, because clocks stop working on weekends'
        ],
        correct: 1,
        exp: 'Since it is Sunday, `is_weekend` is True. The condition requires `is_weekend == False`. In an AND expression, one False makes the entire statement False.',
        hint: 'Examine what happens to the AND condition when one of the three requirements fails.',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: Look at this logic gate combination: `Output = NOT (Sensor_A AND Sensor_B)`. If Sensor_A is 1 (True) and Sensor_B is 1 (True), what is the final Output?',
        opts: [
          '1 (True)',
          '0 (False)',
          '2',
          'Undefined'
        ],
        correct: 1,
        exp: 'First evaluate inside the parentheses: `(1 AND 1)` equals 1 (True). Then apply the NOT operator: `NOT (True)` equals 0 (False). This is a NAND logic gate.',
        hint: 'Evaluate the AND inside the parentheses first, then apply the NOT flip.',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'command to creation': {
    title: 'Command to Creation',
    hook: 'Two students ask an AI for study help. Student A types "help me with science" and gets a confusing 10-page wall of text. Student B gets a fun 5-question riddle quiz with helpful hints! What was Student B\'s secret recipe?',
    goal: 'Master advanced Prompt Engineering using the 4-Block Command Recipe: WHO (Role) + WHAT (Task) + DETAILS (Context) + HOW (Format & Constraints), and practice iterative prompt refinement.',
    learnPoints: [
      'Master the 4-block Command Recipe: WHO (Role) + WHAT (Task) + DETAILS (Topic/Context) + HOW (Style & Length)',
      'Learn the iterative improvement loop: Try, Check, and Refine',
      'Understand how structured prompting unlocks high-quality stories, study quizzes, science analogies, and diagrams'
    ],
    analogy: 'Crafting an AI command is like ordering a custom sandwich at a deli: if you yell "Food!", you might get plain bread; if you specify "You are the head chef (WHO), make a toasted sandwich (WHAT) with cheddar cheese and tomatoes (DETAILS), cut into triangles on a paper plate (HOW)", you get your dream lunch!',
    explanationHtml: `<h3>The Architecture of a Powerful Prompt</h3>
<p>When communicating with generative AI models, the words you provide are called the <strong>Prompt (Command)</strong>, and what the AI generates is called the <strong>Creation</strong>. The quality of the creation depends 100% on the clarity and structure of your command!</p>
<h4>The 4-Block Command Recipe</h4>
<table border="1" cellpadding="6">
  <tr><th>Building Block</th><th>What It Does</th><th>Example Ingredient</th></tr>
  <tr><td><strong>1. WHO (Role)</strong></td><td>Tells the AI what perspective or persona to adopt</td><td>"You are an encouraging Std 5 science teacher."</td></tr>
  <tr><td><strong>2. WHAT (Task)</strong></td><td>Tells the AI the exact job or action to execute</td><td>"Explain how solar eclipses work."</td></tr>
  <tr><td><strong>3. DETAILS (Context)</strong></td><td>Provides specific facts, vocabulary, or audience details</td><td>"Use a simple flashlight-and-orange analogy for a 10-year-old."</td></tr>
  <tr><td><strong>4. HOW (Format)</strong></td><td>Defines output length, style, and presentation constraints</td><td>"Format as 3 numbered steps under 100 words, ending with a quiz question."</td></tr>
</table>
<h4>The Try &rarr; Check &rarr; Refine Loop</h4>
<p>Never give up if the first AI answer isn\'t perfect! Expert creators inspect the result, identify what was missing (too long? too complicated? wrong tone?), and provide follow-up steering commands: <em>"Make it shorter and add a bulleted list!"</em></p>`,
    step1: {
      title: '1. Assembling the 4 Command Blocks',
      desc: 'Combine WHO + WHAT + DETAILS + HOW into a single coherent prompt prompt block.',
      detail: 'Eliminates vague generalities and focuses the AI on your specific educational goal.',
      code: '# 4-Block Prompt Synthesis\nprompt = {\n    "who": "experienced_childrens_astronomy_guide",\n    "what": "explain_lunar_phases",\n    "details": "use_tennis_ball_and_lamp_model",\n    "how": "4_bullet_points_under_80_words"\n}'
    },
    step2: {
      title: '2. Reviewing Output for Factuality and Tone',
      desc: 'Evaluate whether the generated response matches all requested constraints.',
      detail: 'Check word count, readability, and ensure no hallucinated errors exist.',
      code: 'response = call_llm(prompt)\nverify_constraints(response, max_words=80)'
    },
    step3: {
      title: '3. Iterative Prompt Refinement (Steering)',
      desc: 'Issue targeted follow-up instructions to sharpen, simplify, or reformat.',
      detail: 'Iterative refinement transforms a mediocre draft into an exceptional educational asset.',
      code: 'refinement = "Great! Now convert Step 2 into a rhyming riddle for Std 5."\nfinal_output = call_llm(refinement)'
    },
    realScenario: 'Rohan wanted to understand fractions. Instead of asking "explain fractions", he used the recipe: "You are a master pizza chef (WHO). Explain how 1/2, 1/4, and 3/8 work (WHAT) using slices of a mushroom pizza (DETAILS). Keep it to 5 sentences with emojis (HOW)." The AI response made fractions crystal clear in 2 minutes!',
    useCases: [
      'Students generating customized revision flashcards with targeted difficulty levels',
      'Debaters asking an AI to play the devil\'s advocate to test the strength of their arguments',
      'Writers prompting for 5 alternative metaphors to describe a stormy ocean'
    ],
    simCode: 'def build_recipe(who, what, details, how):\n    return f"Role: {who} | Task: {what} | Context: {details} | Format: {how}"\np = build_recipe("Math Tutor", "Explain Prime Numbers", "Numbers with only 2 factors (1 and self)", "3 bullet points + 1 riddle")\nprint("Master Prompt Compiled:")\nprint(p)',
    simOutput: 'Master Prompt Compiled:\nRole: Math Tutor | Task: Explain Prime Numbers | Context: Numbers with only 2 factors (1 and self) | Format: 3 bullet points + 1 riddle',
    pairs: [
      { id: 'p1', term: 'Prompt', definition: 'The instructions, questions, and parameters you give to an AI system' },
      { id: 'p2', term: 'Refinement', definition: 'Improving and sharpening your prompt after checking the initial output' },
      { id: 'p3', term: 'Persona / Role', definition: 'The specific character or expert identity you instruct the AI to adopt (the WHO block)' }
    ],
    practice: {
      q: 'Which component of the Command Recipe specifies that the answer should be "formatted in 4 bullet points with a 60-word limit"?',
      opts: [
        'The WHO block',
        'The WHAT block',
        'The DETAILS block',
        'The HOW block'
      ],
      correct: 3,
      exp: 'The HOW block establishes formatting, structural constraints, length limitations, and presentation style.',
      hint: 'Think about which block defines "HOW" the response should look.'
    },
    quizzes: [
      {
        q: 'Why does assigning a persona (e.g., "You are an astrophysicist for 10-year-olds") improve an AI\'s response?',
        opts: [
          { text: 'It guides the AI\'s vocabulary, tone, and depth to match the intended audience precisely', isCorrect: true },
          { text: 'It forces the AI to wear a space suit', isCorrect: false },
          { text: 'It speeds up the computer processor clock', isCorrect: false },
          { text: 'It saves battery power on the device', isCorrect: false }
        ],
        exp: 'Specifying a persona primes the language model to select appropriate vocabulary, analogies, and pacing suitable for that expert viewpoint and target audience.'
      },
      {
        q: 'If an AI provides a response that is too long and complicated, what should you do next?',
        opts: [
          { text: 'Delete the app and give up', isCorrect: false },
          { text: 'Refine your prompt by saying: "Summarize the above into 3 simple sentences using 5th-grade words"', isCorrect: true },
          { text: 'Copy the long text without reading it', isCorrect: false },
          { text: 'Print it out 10 times', isCorrect: false }
        ],
        exp: 'Iterative refinement is the cornerstone of prompt engineering: guide the AI to reformat or condense its previous answer.'
      }
    ],
    practicalTask: {
      title: 'The 4-Block Command Upgrade Lab',
      objective: 'Transform 3 vague prompts into precision 4-block master commands.',
      steps: [
        'Vague Prompt 1: "Explain photosynthesis." &rarr; Upgrade using WHO + WHAT + DETAILS + HOW.',
        'Upgrade: [WHO: Botanist Guide] + [WHAT: Explain how plants make food] + [DETAILS: Use the kitchen/cooking analogy with sunlight, water, and CO2] + [HOW: 4 numbered steps, under 70 words, ending with 1 quiz question].',
        'Vague Prompt 2: "Tell me about Mars." &rarr; Write your upgraded 4-block command.',
        'Vague Prompt 3: "Help me with long division." &rarr; Write your upgraded 4-block command.',
        'Compare your upgraded commands with a classmate.'
      ],
      expectedResult: 'You will master the ability to engineer structured prompts that reliably produce high-quality outputs.'
    },
    recall: {
      q: 'What are the 4 building blocks of the Command Recipe?',
      a: 'WHO (Role) + WHAT (Task) + DETAILS (Context & Topic) + HOW (Format & Style)!'
    },
    takeaways: [
      'Prompt quality directly dictates AI creation quality.',
      'The 4-block recipe (WHO, WHAT, DETAILS, HOW) removes ambiguity and directs output format.',
      'Refining and steering prompts iteratively is the mark of a skilled AI communicator.'
    ],
    gameMechanic: {
      title: 'Prompt Recipe Kitchen: 4-Block Builder',
      scenario: 'You are the Executive Chef at the Generative Prompt Kitchen! 3 demanding VIP clients have placed orders for custom AI content: a historical roleplay dialogue, an eco-science poem, and a fractions study guide. You must assemble the perfect 4-block recipe cards to satisfy each client!',
      objective: 'Select and snap together the correct WHO, WHAT, DETAILS, and HOW ingredient blocks for all 3 client orders to earn a 3-Star Michelin Prompt Rating.',
      rules: [
        'Rule 1: Snap exactly 1 card of each color (Blue WHO, Green WHAT, Yellow DETAILS, Orange HOW).',
        'Rule 2: Evaluate the simulated Output Score Meter (must reach 90%+).',
        'Rule 3: Execute 1 iterative refinement step to polish the final dish.'
      ],
      choices: [
        'Select WHO Card: [Archaeologist Explorer] OR [Friendly Fractions Chef] OR [Eco-Poet]',
        'Select WHAT Card: [Explain Pyramid Engineering] OR [Teach Dividing Halves] OR [Compose Ocean Stanzas]',
        'Select DETAILS Card: [Limestone Ramps & Levers] OR [Pizza Slices & Crumb Math] OR [Bioluminescent Coral]',
        'Select HOW Card: [3 Bullet Points + 1 Quiz] OR [4 Rhyming Couplets] OR [Step-by-Step Recipe with Emojis]'
      ],
      progression: [
        'Dish 1: History roleplay prompt cooked to perfection (+110 pts)',
        'Dish 2: Fractions chef recipe achieved 96% student comprehension score (+120 pts)',
        'Dish 3: Ocean eco-poem synthesized with high lyrical polish (+130 pts)'
      ],
      completion: 'All 3 client dishes served with 5-star ratings! Awarded the Prompt Engineering Specialist Hat Badge.',
      badge: 'Prompt Engineering Specialist 🧑‍🍳',
      points: 360
    },
    reflectionSafety: {
      prompt: 'If you prompt an AI: "Write an unkind joke making fun of a classmate\'s appearance", what should the AI\'s safety filter do, and why should YOU never prompt such things?',
      rule: 'Digital Kindness Mandate: Never use prompt engineering to generate hurtful, bullying, or derogatory content. Use your skills to uplift, educate, and inspire.',
      discussion: 'How do responsible developers install ethical guardrails to prevent AI tools from generating harmful text?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: In prompt engineering, what does the "WHO" block specify?',
        opts: [
          'The student\'s home phone number',
          'The persona or expert role the AI should adopt when generating the response',
          'The model number of the laptop',
          'The time of day the prompt was submitted'
        ],
        correct: 1,
        exp: 'The WHO block establishes the persona, background, or identity the AI model embodies (e.g., "You are a marine biologist").',
        hint: 'What does "WHO" refer to when describing a character or role?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Look at this prompt: "Write a summary of the water cycle. You are a meteorologist. Explain evaporation, condensation, and precipitation for 5th graders. Present as 3 bullet points with a diagram description." Which part represents the DETAILS block?',
        opts: [
          '"You are a meteorologist" (WHO)',
          '"Write a summary" (WHAT)',
          '"Explain evaporation, condensation, and precipitation for 5th graders" (DETAILS)',
          '"Present as 3 bullet points with a diagram description" (HOW)'
        ],
        correct: 2,
        exp: 'Specifying the core concepts (evaporation, condensation, precipitation) and the target grade level constitutes the contextual DETAILS block.',
        hint: 'Which section provides the specific topic terms and audience context?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI was asked to write a 100-word paragraph explaining gravity. Its response was 350 words long and contained university-level calculus equations. What was missing from the user\'s original prompt?',
        opts: [
          'A clear HOW block specifying the 100-word length constraint and an age-appropriate target reading level',
          'The letter \'G\' in the keyboard',
          'A high-speed graphics card',
          'A louder voice when typing'
        ],
        correct: 0,
        exp: 'Without explicit constraints on length and reading level in the HOW block, the model defaulted to broad academic information retrieval without boundaries.',
        hint: 'Which block sets limits on length, complexity, and format?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 3: AI APPLICATIONS (Healthcare Imaging & Personalised Classrooms)
  // ═══════════════════════════════════════════════════════════════════════════

  'ai in the hospital': {
    title: 'AI in the Hospital',
    hook: 'A hospital X-ray camera scans a patient\'s chest. A specialized AI spots a tiny 2-millimeter shadow that human eyes might miss after a 12-hour shift. Who makes the final decision about surgery: the computer or the doctor?',
    goal: 'Explore AI in modern medicine—medical imaging, wearable health sensors, robotic surgical assistants, and drug discovery—while understanding the vital Human-in-the-Loop principle.',
    learnPoints: [
      'Discover how Computer Vision assists radiologists in analyzing X-rays, CT scans, and retina images',
      'Understand how smart health wearables monitor heart rate telemetry and alert doctors to anomalies',
      'Master the golden medical rule: AI is a diagnostic assistant, but licensed human doctors always make the final medical decision!'
    ],
    analogy: 'AI in a hospital is like a copilot with eagle eyes: it spots distant warning signs on the radar and alerts the chief captain, but the experienced human pilot is the only one who steers the plane and safely lands the passengers!',
    explanationHtml: `<h3>The AI Assistant in Modern Healthcare</h3>
<p>Hospitals are bustling centers where doctors and nurses care for hundreds of patients daily. Artificial Intelligence is transforming medicine by analyzing diagnostic scans, monitoring vital signs, and organizing hospital logistics.</p>
<h4>1. Reading Medical Scans with Computer Vision</h4>
<p>Deep neural networks trained on millions of historical X-ray and MRI scans can highlight microscopic fractures, lung infections, or early-stage anomalies with colored heatmaps. This helps doctors catch illnesses weeks earlier than previously possible!</p>
<h4>2. Continuous Health Telemetry</h4>
<p>Smartwatches and wearable hospital monitors track heartbeats, blood oxygen levels, and body temperatures 24 hours a day. If an irregular rhythm (such as arrhythmia) occurs, the AI alerts the emergency ward immediately.</p>
<h4>3. The Golden Rule: Human-in-the-Loop</h4>
<table border="1" cellpadding="6">
  <tr><th>What AI Does Best 🤖</th><th>What the Doctor Does Best 🩺</th></tr>
  <tr><td>Scans 10,000 X-ray images in seconds</td><td>Examines the whole patient, listening to symptoms and history</td></tr>
  <tr><td>Detects microscopic pixel changes</td><td>Comforts anxious families with warmth, empathy, and care</td></tr>
  <tr><td>Flags potential anomalies with heatmaps</td><td>Makes the final clinical diagnosis and prescribes safe treatments</td></tr>
</table>
<p><strong>Remember:</strong> AI never replaces caring doctors and nurses; AI makes doctors faster and more precise!</p>`,
    step1: {
      title: '1. Ingesting High-Resolution Medical Scans',
      desc: 'Radiology imaging systems capture DICOM scans with millions of pixel values.',
      detail: 'Scans are anonymized to protect patient medical privacy before analysis.',
      code: '# Medical Scan Anonymization\nscan_data = load_dicom_scan(patient_id="ANON_7842")\nanonymize_metadata(scan_data)'
    },
    step2: {
      title: '2. Running Anomaly Detection Neural Networks',
      desc: 'Computer vision models highlight suspicious tissue densities with color heatmaps.',
      detail: 'Assigns confidence probability scores to flagged regions.',
      code: 'heatmap_overlay = medical_cnn.detect_anomalies(scan_data)\nprob_score = medical_cnn.get_confidence()'
    },
    step3: {
      title: '3. Physician Clinical Review and Final Sign-Off',
      desc: 'The licensed medical doctor examines the scan, patient history, and AI notes.',
      detail: 'The doctor makes the authoritative clinical decision and outlines treatment.',
      code: 'if doctor_approves(scan_data, heatmap_overlay):\n    schedule_treatment_plan()'
    },
    realScenario: 'In a busy rural clinic, a patient arrived with persistent coughing. The clinic lacked a full-time lung specialist, but their X-ray unit used an AI diagnostic helper. The AI flagged an early shadow on the lower left lung. The clinic doctor consulted an online specialist, caught pneumonia in its first stage, and cured the patient with simple medicine before severe illness developed.',
    useCases: [
      'Smartwatches detecting sudden falls in elderly citizens and automatically dialing emergency services with GPS coordinates',
      'Hospital delivery robots carrying sterile surgical instruments through hospital corridors autonomously',
      'AI algorithms simulating millions of molecular combinations to accelerate the discovery of life-saving cancer medicines'
    ],
    simCode: 'scan_analyzed = True\nai_finding = "Potential 3mm lung nodule detected (88% confidence) 🔍"\ndoctor_action = "Doctor reviewed scan, confirmed finding, and prescribed antibiotics."\nprint("AI Assistant:", ai_finding)\nprint("Clinical Authority:", doctor_action)',
    simOutput: 'AI Assistant: Potential 3mm lung nodule detected (88% confidence) 🔍\nClinical Authority: Doctor reviewed scan, confirmed finding, and prescribed antibiotics.',
    pairs: [
      { id: 'p1', term: 'Medical Imaging', definition: 'Technologies like X-rays, CT scans, and MRIs that create pictures of the inside of the human body' },
      { id: 'p2', term: 'Human-in-the-Loop', definition: 'A safety workflow where an AI assists, but a qualified human expert makes the final decision' },
      { id: 'p3', term: 'Telemetry', definition: 'Automated remote measurement and transmission of health data (like heartbeat and oxygen levels)' }
    ],
    practice: {
      q: 'Who should always make the final decision about a patient\'s medical treatment and surgery in a hospital?',
      opts: [
        'The hospital computer monitor',
        'The licensed human doctor and medical team',
        'The internet search engine',
        'The software salesperson'
      ],
      correct: 1,
      exp: 'Licensed doctors understand the complete medical history, emotional state, and physical health of the patient, and are legally and ethically responsible for patient care.',
      hint: 'Who has medical training and human empathy to care for a sick person?'
    },
    quizzes: [
      {
        q: 'Why are patient health records and medical scans protected by strict privacy laws?',
        opts: [
          { text: 'Because health information is deeply personal and confidential, and must never be leaked or shared without patient consent', isCorrect: true },
          { text: 'Because medical scans are too heavy to send over email', isCorrect: false },
          { text: 'Because hospital computers turn off if anyone looks at a chart', isCorrect: false },
          { text: 'Because doctors don\'t like using passwords', isCorrect: false }
        ],
        exp: 'Medical records contain intimate health details. Safeguarding medical privacy is a fundamental human right and legal obligation.'
      },
      {
        q: 'How does an AI diagnostic assistant help prevent doctor fatigue during long emergency shifts?',
        opts: [
          { text: 'By making coffee for the hospital staff', isCorrect: false },
          { text: 'By serving as a second pair of tireless eyes that flags subtle scan anomalies for the doctor\'s review', isCorrect: true },
          { text: 'By replacing all the nurses so doctors can sleep', isCorrect: false },
          { text: 'By turning off the hospital lights', isCorrect: false }
        ],
        exp: 'AI scan readers assist tired human physicians by highlighting potential areas of concern that warrant extra clinical inspection.'
      }
    ],
    practicalTask: {
      title: 'Compare "Doctor Superpowers" vs "AI Superpowers"',
      objective: 'Create a two-column medical collaboration matrix in your notebook.',
      steps: [
        'Column 1: AI Assistant Superpowers (High speed, never gets tired, scans millions of pixels, compares against 50,000 past medical cases).',
        'Column 2: Human Doctor Superpowers (Empathy, holding hands, listening to patient stories, understanding family values, moral accountability).',
        'Write a short paragraph at the bottom explaining why "Doctor + AI" saves more lives than either one working alone.',
        'Share your matrix with your science teacher.'
      ],
      expectedResult: 'You will clearly grasp the complementary synergy between clinical compassion and computational speed.'
    },
    recall: {
      q: 'What is the role of AI in hospital diagnostics?',
      a: 'AI acts as a high-speed diagnostic assistant that flags anomalies on scans, while the human doctor makes all final medical choices!'
    },
    takeaways: [
      'AI analyzes medical scans and telemetry to assist doctors in early disease detection.',
      'Human-in-the-Loop ensures licensed medical physicians retain complete clinical authority.',
      'Patient health records must always be protected with rigorous digital privacy safeguards.'
    ],
    gameMechanic: {
      title: 'Hospital Diagnostic Assistant: Team Human + AI',
      scenario: 'You are Chief Medical Informatics Officer assisting Chief Radiologist Dr. Sharma at City Care Hospital. 3 complex patient scan cases have arrived: a chest X-ray, an ultrasound scan, and an MRI brain scan. You must run the AI heatmap detector, analyze the confidence score, and present the diagnostic brief to Dr. Sharma for final sign-off.',
      objective: 'Accurately inspect all 3 medical cases with the AI diagnostic viewer and obtain Dr. Sharma’s clinical approval.',
      rules: [
        'Rule 1: Activate the Computer Vision Heatmap overlay on the scan.',
        'Rule 2: Review patient vital telemetry and AI anomaly confidence score.',
        'Rule 3: Recommend clinical action for Dr. Sharma\'s final authorization.'
      ],
      choices: [
        'Case 1: Chest X-ray &rarr; AI flags 4mm bronchial shadow (89% confidence) &rarr; Recommend antibiotics follow-up',
        'Case 2: Knee Ultrasound &rarr; AI flags hairline ligament tear (92% confidence) &rarr; Recommend physical therapy',
        'Case 3: Retina Scan &rarr; AI flags healthy blood vessels with zero diabetic retinopathy (99% normal) &rarr; Clear patient'
      ],
      progression: [
        'Case 1: Early bronchial infection caught and verified (+110 pts)',
        'Case 2: Knee ligament tear accurately diagnosed and brace ordered (+120 pts)',
        'Case 3: Healthy retina verified; patient reassured with empathy (+130 pts)'
      ],
      completion: 'All 3 patients successfully diagnosed with zero false positives! Earn the Medical Tech Associate Badge.',
      badge: 'Medical Tech Associate 🩺',
      points: 360
    },
    reflectionSafety: {
      prompt: 'If an online health symptom checker tells you to take a specific pill, why should you NEVER take it without asking your parents and a real doctor?',
      rule: 'Patient Medication Safety: Never self-medicate or take medicine based on website or chatbot advice. Only licensed doctors and your parents can safely administer medicine.',
      discussion: 'Why can taking the wrong medicine be dangerous to a growing child\'s body?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is the main benefit of using AI to analyze chest X-ray scans in hospitals?',
        opts: [
          'It makes the X-ray picture glow in neon colors',
          'It helps doctors spot microscopic signs of illness early by comparing against thousands of historical medical examples',
          'It eliminates the need for any hospitals or doctors',
          'It makes the X-ray machine run without electricity'
        ],
        correct: 1,
        exp: 'AI analyzes pixel density patterns against vast databases of historical medical scans, helping clinicians detect microscopic abnormalities at their earliest stages.',
        hint: 'How does comparing against thousands of past examples help catch problems early?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: What does the term "Human-in-the-Loop" mean in medical AI systems?',
        opts: [
          'A doctor running in circles around the hospital',
          'A workflow design where the AI provides recommendations, but a qualified human physician reviews the evidence and makes the final decision',
          'A patient wearing a round medical bandage',
          'A computer that only works when a human holds its cord'
        ],
        correct: 1,
        exp: '"Human-in-the-Loop" ensures that high-stakes algorithms are supervised by human professionals who verify predictions and retain ultimate accountability.',
        hint: 'Does the human supervise the process or let the machine act alone?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI diagnostic tool was trained on 50,000 adult chest scans. A 7-year-old child arrives at the emergency ward with chest pains. Why must doctors be extra cautious when using this AI tool on a young child?',
        opts: [
          'Because children have smaller batteries',
          'Because a child’s growing bones, rib cage, and organ proportions differ significantly from adult anatomy, meaning a model trained only on adults may misinterpret normal pediatric growth as illness',
          'Because children are not allowed to be photographed',
          'Because computers dislike children'
        ],
        correct: 1,
        exp: 'Training data mismatch! A model trained on adult anatomy will produce inaccurate predictions when applied to pediatric patients whose bones and tissues are still actively developing.',
        hint: 'Are a 7-year-old child\'s growing bones identical in proportion to adult bones?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'ai in the classroom': {
    title: 'AI in the Classroom',
    hook: 'In a classroom of 35 students, everyone learns math at a different pace. How can an AI study app give Priya challenging fraction puzzles while simultaneously giving Rohan step-by-step division hints at the exact same second?',
    goal: 'Understand Personalised Learning systems, adaptive difficulty calibration, automated homework feedback, and speech-to-text accessibility tools, while valuing the teacher’s mentorship.',
    learnPoints: [
      'Discover Personalised Learning: how AI adapts question difficulty and hints to fit every student\'s unique learning pace',
      'Learn about educational accessibility: real-time speech translation, text-to-speech for visually impaired learners, and dyslexia-friendly reading helpers',
      'Understand the role of human teachers: inspiring curiosity, building character, and mentoring hearts'
    ],
    analogy: 'Personalised learning is like having a magical math staircase that adjusts its step height to your legs: if you take giant leaps, it builds higher steps for you to climb; if you stumble on a tricky step, it gently lowers the step and holds out a helpful railing!',
    explanationHtml: `<h3>The Smart Classroom: Learning That Fits YOU</h3>
<p>In traditional classrooms, one teacher must balance 30 or 40 energetic students. Some students understand a topic in 2 minutes and get bored; other students need 15 minutes and feel shy about raising their hands. Artificial Intelligence enables <strong>Personalised Learning</strong>!</p>
<h4>How Adaptive Learning Apps Work</h4>
<ul>
  <li><strong>1. Diagnostic Assessment:</strong> When you start a practice round, the AI observes which questions you answer easily and where you hesitate.</li>
  <li><strong>2. Dynamic Difficulty Adjustment:</strong>
    <ul>
      <li>If you get 3 math sums right in a row &rarr; the AI introduces a slightly more challenging puzzle to keep your brain growing!</li>
      <li>If you struggle with a sum &rarr; the AI does not give you a low grade. Instead, it breaks the problem into a simpler step and offers an encouraging visual hint!</li>
    </ul>
  </li>
  <li><strong>3. Instant Helpful Feedback:</strong> You don\'t have to wait 2 weeks for exam papers to be graded; you learn from your mistakes the instant they happen.</li>
</ul>
<h4>Accessibility for All Children</h4>
<p>AI helps every child learn without barriers: real-time speech-to-text helps deaf students follow classroom lectures; text-to-speech reads books aloud to visually impaired children; and language translators help immigrant students learn in their native tongue.</p>
<p><strong>Remember:</strong> AI gives personalized practice, but your teacher is the inspiring guide who believes in you, encourages your dreams, and teaches you how to be a wonderful human being!</p>`,
    step1: {
      title: '1. Tracking Student Mastery Signals',
      desc: 'The learning platform tracks accuracy, response times, and hint requests.',
      detail: 'Builds a dynamic knowledge map without saving private personal secrets.',
      code: '# Mastery State Tracker\nstudent_mastery["fractions_addition"] = 0.85 # 85% mastery\nstudent_mastery["fractions_division"] = 0.40 # Needs hints'
    },
    step2: {
      title: '2. Calibrating Question Difficulty (Zone of Proximal Development)',
      desc: 'Selects problems that are neither too easy (boring) nor too difficult (frustrating).',
      detail: 'Serves hints precisely when the learner encounters a stumbling block.',
      code: 'next_question = select_adaptive_problem(target_skill="fractions_division", difficulty="scaffolded_with_hints")'
    },
    step3: {
      title: '3. Generating Teacher Insights Summaries',
      desc: 'Summarizes whole-class concept hurdles so the teacher can plan targeted group activities.',
      detail: 'Frees teacher time from tedious grading so they can mentor students one-on-one.',
      code: 'teacher_dashboard.alert("5 students need extra help with long division remainder concepts 📊")'
    },
    realScenario: 'Arun was embarrassed to ask his teacher how to do 3-digit subtraction. In math lab, the adaptive learning app noticed he stumbled on borrowing zeros. The app gently showed a 30-second cartoon showing how tens lend to ones. Arun practiced 4 guided problems in private, understood the logic, and smiled with newfound confidence.',
    useCases: [
      'Language learning apps listening to student pronunciation and giving gentle accent feedback',
      'Automated quiz platforms marking 100 student essays for grammatical structure in 10 seconds',
      'Classroom screen readers translating English science lessons into regional languages in real time'
    ],
    simCode: 'student_score = 90\nif student_score > 85:\n    next_level = "Challenge Level: Advanced Fraction Puzzles 🚀"\nelif student_score > 60:\n    next_level = "Practice Level: Standard Exercises 👍"\nelse:\n    next_level = "Guided Level: Step-by-Step Visual Hints 💡"\nprint("Adaptive Engine:", next_level)',
    simOutput: 'Adaptive Engine: Challenge Level: Advanced Fraction Puzzles 🚀',
    pairs: [
      { id: 'p1', term: 'Personalised Learning', definition: 'Educational technology that adjusts the pace, difficulty, and hints to fit each individual student' },
      { id: 'p2', term: 'Adaptive Engine', definition: 'The AI software algorithm that calculates which question a student should try next based on past answers' },
      { id: 'p3', term: 'Accessibility Tool', definition: 'Technology that helps students with diverse physical or learning needs access education equally' }
    ],
    practice: {
      q: 'What does an adaptive AI learning app do when a student gets 3 difficult questions wrong in a row?',
      opts: [
        'It closes the app and gives the student a failing score',
        'It lowers the difficulty, provides a helpful step-by-step hint, and lets the student try again',
        'It makes the screen flash red and plays an alarm',
        'It forces the student to buy extra coins'
      ],
      correct: 1,
      exp: 'Adaptive engines are designed to support learning. When a student struggles, the AI scaffolds the material by lowering difficulty and offering conceptual hints.',
      hint: 'Does a helpful tutor punish you or give you a helpful hint when you struggle?'
    },
    quizzes: [
      {
        q: 'Why can an AI learning app NEVER replace a real human teacher in school?',
        opts: [
          { text: 'Because teachers provide emotional encouragement, mentorship, moral values, and understand each child\'s heart—qualities machines lack', isCorrect: true },
          { text: 'Because computers don\'t know how to write on chalkboards', isCorrect: false },
          { text: 'Because schools don\'t have enough electrical plugs', isCorrect: false },
          { text: 'Because robots are too tall to stand in classrooms', isCorrect: false }
        ],
        exp: 'Teaching is fundamentally a human relationship. While AI delivers practice questions, human teachers inspire, mentor, and cultivate character.'
      },
      {
        q: 'How does real-time speech-to-text AI make classrooms more inclusive for all children?',
        opts: [
          { text: 'It allows students who are deaf or hard of hearing to read live captions of the teacher\'s words in real time', isCorrect: true },
          { text: 'It lets students play video games during lecture time', isCorrect: false },
          { text: 'It whispers test answers into headphones', isCorrect: false },
          { text: 'It turns off the school bell', isCorrect: false }
        ],
        exp: 'Real-time captioning and assistive speech tech ensure students with hearing impairments can fully participate in classroom learning.'
      }
    ],
    practicalTask: {
      title: 'Design Your Dream AI Classroom Companion',
      objective: 'Invent a helpful AI classroom feature on paper that solves a real learning challenge.',
      steps: [
        'Give your AI helper a friendly name (e.g. "Vocabulary Spark", "Math Mentor Milo").',
        'Choose 1 Learning Challenge it solves (e.g. Explaining difficult words, reading aloud, generating fun math riddles).',
        'Write 2 Features it has and 1 Golden Safety Rule it must always obey (e.g. "Never give direct answers to homework without hints").',
        'Present your invention to your class or teacher.'
      ],
      expectedResult: 'You will creatively explore how educational technology can be purposefully designed for student empowerment.'
    },
    recall: {
      q: 'What is personalised learning in an AI-powered classroom?',
      a: 'Learning that dynamically adapts question difficulty, pacing, and visual hints to suit every individual student\'s unique needs!'
    },
    takeaways: [
      'Adaptive AI tunes practice difficulty so students are neither bored nor frustrated.',
      'Accessibility tools ensure all children, regardless of physical ability or language, can learn.',
      'Teachers are the heart of the classroom; AI is a tool that frees teachers to mentor.'
    ],
    gameMechanic: {
      title: 'Adaptive Learning Engine Simulator',
      scenario: 'You are Chief EdTech Architect at Future School! 3 virtual students are logging into the morning math portal: Sarah (excels at geometry, struggles with fractions), Leo (fast reader, needs step-by-step division practice), and Ananya (learning English as a second language). You must calibrate the Adaptive Learning Engine settings!',
      objective: 'Configure difficulty thresholds, hint triggers, and language accessibility overlays to optimize learning gains for all 3 students.',
      rules: [
        'Rule 1: Set Sarah\'s portal &rarr; Scaffolded Visual Fraction Bars + Advanced Geometry Quests.',
        'Rule 2: Set Leo\'s portal &rarr; Division Step-by-Step Hints + Rapid Math Challenge.',
        'Rule 3: Set Ananya\'s portal &rarr; Bilingual Dual-Subtitles + Visual Vocabulary Flashcards.'
      ],
      choices: [
        'Calibrate Sarah: Enable Fraction Scaffolding Mode (+110 pts)',
        'Calibrate Leo: Activate Division Intermediate Hint Cascade (+120 pts)',
        'Calibrate Ananya: Enable Dual-Language Speech Accessibility (+130 pts)'
      ],
      progression: [
        'Phase 1: Sarah mastered fractions without frustration (+110 pts)',
        'Phase 2: Leo completed 10 division problems independently (+120 pts)',
        'Phase 3: Ananya scored 100% on the bilingual science quiz (+130 pts)'
      ],
      completion: 'All 3 students achieved mastery in their optimal learning zones! Earn the EdTech Innovator Trophy.',
      badge: 'EdTech Innovator 🎓',
      points: 360
    },
    reflectionSafety: {
      prompt: 'If an AI homework helper app gives you the complete answer to an essay without making you think, does that help you learn? What should a smart student do?',
      rule: 'Honest Learning Principle: Never use AI to skip thinking. True learning happens when you struggle a little, understand the logic, and write with your own brain.',
      discussion: 'Why is getting a question wrong and understanding the correction more valuable than copying an answer sheet?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What does "adaptive difficulty" mean in educational computer games?',
        opts: [
          'The computer screen gets darker every 5 minutes',
          'The game automatically becomes easier when you need help, and harder when you answer correctly',
          'The game requires a special steering wheel controller',
          'The game cannot be saved'
        ],
        correct: 1,
        exp: 'Adaptive difficulty algorithms continuously adjust challenge levels based on real-time student performance to maintain optimal engagement and learning.',
        hint: 'How does the difficulty "adapt" to your score?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A school uses an AI assessment tool to score 200 math quizzes in 1 minute. How does this benefit the human classroom teacher?',
        opts: [
          'The teacher can take the rest of the week off and stay home',
          'The teacher saves hours of repetitive mechanical grading and can use that time to sit with struggling students for one-on-one mentorship',
          'The teacher no longer needs to prepare lesson plans',
          'The teacher must buy 200 new red pens'
        ],
        correct: 1,
        exp: 'Automating mechanical grading frees educators to focus on high-impact pedagogical activities: personalized tutoring, mentorship, and inspiring discussion.',
        hint: 'What high-value human activity can the teacher do with the saved time?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An adaptive reading app notices that a student frequently pauses on words with complex vowel combinations (like "thorough" and "thought"). How should a well-designed pedagogical AI respond?',
        opts: [
          'Display a big red "X" and subtract 50 points immediately',
          'Silently flag the phonics pattern, generate a playful 2-minute rhyming mini-game highlighting that specific phoneme, and alert the teacher in the weekly summary report',
          'Lock the student out of the reading library',
          'Skip all words containing vowels forever'
        ],
        correct: 1,
        exp: 'Constructive pedagogical AI provides targeted scaffolding: identifying specific conceptual hurdles and creating micro-learning interventions rather than punitive penalties.',
        hint: 'How does a compassionate educational tool help a student overcome a specific phonetic difficulty?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 4: AI AND CAREER (Emerging Occupations & The Enduring Human Edge)
  // ═══════════════════════════════════════════════════════════════════════════

  'my future with ai': {
    title: 'My Future with AI',
    hook: 'Meet Maya in 2035: she doesn’t spend 8 hours a day writing repetitive code lines; she directs a swarm of autonomous eco-drones planting millions of mangrove trees along the coast! What skills got her there?',
    goal: 'Explore the emerging landscape of technology careers—AI Ethics Auditors, Robotics Technicians, Prompt Architects, and Climate Data Scientists—and build a personal roadmap for the future.',
    learnPoints: [
      'Understand how AI creates brand-new professions at the intersection of technology, nature, healthcare, and art',
      'Explore emerging high-impact roles: AI Safety Auditor, Machine Learning Engineer, and Bio-Robotics Specialist',
      'Learn how lifelong curiosity and adaptability will be the greatest career assets in the 21st century'
    ],
    analogy: 'Preparing for your future career is like learning to sail a modern sailboat: the wind (AI technology) provides tremendous automated power, but you are the skilled captain holding the rudder, reading the stars, and steering the ship to land!',
    explanationHtml: `<h3>Careers in the Era of Intelligent Systems</h3>
<p>In every historical era, major technological shifts changed the world of work. When electricity arrived, candle-makers became electrical engineers; when airplanes arrived, carriage drivers became commercial pilots. AI is creating the most exciting careers in human history!</p>
<h4>Exciting Emerging Professions for Class 5 Students</h4>
<ul>
  <li><strong>1. AI Ethics & Fairness Auditor:</strong> Reviews machine learning datasets and algorithms to verify they are free from harmful bias and protect civil privacy.</li>
  <li><strong>2. Bio-Robotics Specialist:</strong> Designs animal-inspired robots (like robotic fish that clean microplastics or robotic bees that pollinate crops).</li>
  <li><strong>3. Climate Data Scientist:</strong> Analyzes satellite thermal imaging, cloud radar, and ocean currents using AI models to predict cyclones and combat global warming.</li>
  <li><strong>4. AI Prompt & Workflow Architect:</strong> Crafts precision multi-step prompts and automation pipelines connecting AI engines to real-world business tools.</li>
</ul>
<h4>The Future Belongs to the Curious!</h4>
<p>You don\'t need to know everything today. The most important skill you can practice right now is <strong>Learning How to Learn</strong>: asking thoughtful questions, testing ideas, building projects, and collaborating with diverse friends.</p>`,
    step1: {
      title: '1. Identify Your Core Human Interests',
      desc: 'Discover what problems in the world you genuinely care about solving.',
      detail: 'Protecting wildlife, curing illnesses, designing games, or exploring space.',
      code: '# Career Compass\npassions = ["Marine Biology", "Robotics", "Climate Action"]'
    },
    step2: {
      title: '2. Understand the Technological Multiplier',
      desc: 'Learn how smart computational tools can amplify your impact in that field.',
      detail: 'A marine biologist with AI cameras can monitor 1,000 coral reefs instead of just 1.',
      code: 'impact_multiplier = pair_passion_with_ai(passions[0], tool="computer_vision_drones")'
    },
    step3: {
      title: '3. Build a Portfolio of Curiosity Projects',
      desc: 'Create real projects today: science fair models, coding games, and logic puzzles.',
      detail: 'Hands-on creation demonstrates your ability to innovate and solve problems.',
      code: 'portfolio.add(["Scratch Maze Game", "Recycling Sorter Prototype"])'
    },
    realScenario: 'When Tariq was in Class 5, he loved watching birds. Instead of just reading books, he joined a school club that built a solar-powered bird feeder with a small camera. An AI model identified 40 bird species and counted migratory populations. By age 22, Tariq was Chief Wildlife Data Scientist at a national national park!',
    useCases: [
      'Civil engineers using generative 3D simulators to design zero-carbon wooden skyscrapers',
      'Sports analysts using computer vision cameras to track athletic movements and prevent player injuries',
      'Astronomers using deep learning models to discover hundreds of exoplanets in distant star systems'
    ],
    simCode: 'tech_careers = {\n    "Eco-Robotics Specialist": "Designs autonomous drones to plant 1M trees 🌲",\n    "AI Medical Scout": "Helps doctors detect rare pediatric conditions 🩺",\n    "Algorithmic Fairness Auditor": "Ensures smart systems treat all communities equally ⚖️"\n}\nfor role, desc in tech_careers.items():\n    print(f"Role: {role} -> {desc}")',
    simOutput: 'Role: Eco-Robotics Specialist -> Designs autonomous drones to plant 1M trees 🌲\nRole: AI Medical Scout -> Helps doctors detect rare pediatric conditions 🩺\nRole: Algorithmic Fairness Auditor -> Ensures smart systems treat all communities equally ⚖️',
    pairs: [
      { id: 'p1', term: 'Machine Learning Engineer', definition: 'A computer scientist who designs, trains, and optimizes machine learning models' },
      { id: 'p2', term: 'AI Ethics Auditor', definition: 'A specialist who tests technology systems to ensure they are fair, unbiased, and safe for society' },
      { id: 'p3', term: 'Portfolio', definition: 'A collection of real projects, code, and inventions demonstrating your skills to others' }
    ],
    practice: {
      q: 'Which future professional would be responsible for checking whether a facial recognition camera works equally well for people of all skin tones?',
      opts: [
        'A battery factory manager',
        'An AI Ethics & Fairness Auditor',
        'A computer graphics card salesperson',
        'A glass repair technician'
      ],
      correct: 1,
      exp: 'AI Ethics and Fairness Auditors evaluate datasets and model outputs to guarantee equitable performance across diverse human demographics.',
      hint: 'Who specializes in auditing technology for fairness and equality?'
    },
    quizzes: [
      {
        q: 'Why will understanding how AI works be beneficial for future doctors, artists, and farmers?',
        opts: [
          { text: 'Because AI tools will be integrated into virtually every industry, allowing professionals who understand them to innovate and lead', isCorrect: true },
          { text: 'Because everyone will be forced to stop farming and write code all day', isCorrect: false },
          { text: 'Because plants and animals will only listen to computers in the future', isCorrect: false },
          { text: 'Because paintbrushes will be outlawed', isCorrect: false }
        ],
        exp: 'AI is a cross-disciplinary multiplier: doctors use medical vision, artists use generative studios, and farmers use precision drone monitors.'
      },
      {
        q: 'What is the most effective way for a Std 5 student to prepare for the job market of 2035?',
        opts: [
          { text: 'Memorize phonebooks and never play outdoors', isCorrect: false },
          { text: 'Cultivate strong curiosity, practice problem solving, learn basic coding logic, and practice teamwork with friends', isCorrect: true },
          { text: 'Wait until university before touching any technology', isCorrect: false },
          { text: 'Let computers do all homework and stop reading books', isCorrect: false }
        ],
        exp: 'Developing adaptable foundational skills—curiosity, logical problem solving, communication, and digital literacy—prepares learners for evolving careers.'
      }
    ],
    practicalTask: {
      title: 'Author Your "Future Career 2035 Profile"',
      objective: 'Create a personal professional profile dossier envisioning your work in the year 2035.',
      steps: [
        'Write your Futuristic Job Title: e.g. "Chief Oceanic Autonomous Drone Commander".',
        'Write your Mission Statement: e.g. "Restoring marine biodiversity across tropical coral reefs using solar-powered AI gliders".',
        'List 3 Daily Tasks you perform alongside your AI assistant.',
        'List 2 Human Superpowers (like Empathy or Creativity) that make you indispensable in this role.',
        'Illustrate your future self at your high-tech workstation.'
      ],
      expectedResult: 'You will connect personal aspirations with practical technological pathways.'
    },
    recall: {
      q: 'How does AI impact future career opportunities?',
      a: 'It automates routine tasks and creates high-impact new roles in ethics, robotics, climate science, and human-AI collaboration!'
    },
    takeaways: [
      'Technology shifts the workplace from manual repetition to high-level creative problem solving.',
      'New careers like AI Ethics Auditors and Climate Data Scientists are multiplying rapidly.',
      'Cultivating curiosity, adaptability, and ethical judgment prepares you for the jobs of tomorrow.'
    ],
    gameMechanic: {
      title: 'Career Quest 2035: Future Tech Strategist',
      scenario: 'You have entered the 2035 Global Innovation Expo! 3 specialized career hubs require expert mission deployment: The Climate Bio-Dome, The Orbital Satellite Station, and The Healthcare Ethics Tribunal. You must assemble the required credentials, tools, and human leadership skills to complete each quest!',
      objective: 'Deploy the correct combination of human talent, AI tool, and ethical principle to solve all 3 hub missions.',
      rules: [
        'Rule 1: Select Mission Hub and review societal problem.',
        'Rule 2: Equip 1 Emerging Tech Specialization + 1 AI Tool + 1 Core Human Skill.',
        'Rule 3: Achieve 100% mission clearance rating.'
      ],
      choices: [
        'Hub 1 (Climate): Climate Scientist + Drone Thermal Scanner + Persistence & Curiosity',
        'Hub 2 (Space): Orbital Robotics Engineer + Autonomous Docking AI + Precise Math Logic',
        'Hub 3 (Ethics): AI Fairness Auditor + Bias Sieve Tool + Compassion & Moral Integrity'
      ],
      progression: [
        'Hub 1: 50,000 hectares of forest mapped for wildfire prevention (+120 pts)',
        'Hub 2: Autonomous satellite debris collection system deployed (+120 pts)',
        'Hub 3: Biased loan algorithm audited and corrected for fairness (+130 pts)'
      ],
      completion: 'All 3 Expo career quests cleared! Awarded the Future Career Strategist Gold Medal.',
      badge: 'Future Career Strategist 🌟',
      points: 370
    },
    reflectionSafety: {
      prompt: 'If a company creates an AI tool that can replace 20 workers, what ethical responsibility does the company have toward those human employees?',
      rule: 'Ethical Workplace Transition: Responsible leaders use technology to support workers, offering retraining and creating new meaningful opportunities rather than casting people aside.',
      discussion: 'Why should society value people\'s livelihoods and dignity above pure machine automation speed?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is a primary duty of a "Climate Data Scientist"?',
        opts: [
          'Selling umbrellas on rainy days',
          'Analyzing satellite radar, thermal maps, and ocean sensor streams using AI to model climate change and predict extreme weather',
          'Painting weather vanes with oil paint',
          'Setting the thermostat in the office building'
        ],
        correct: 1,
        exp: 'Climate data scientists apply machine learning models to massive environmental datasets to monitor planetary health and predict climate risks.',
        hint: 'What does a climate scientist do with big satellite data?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Why will "Prompt Architects" and "AI Workflow Designers" be important in future organizations?',
        opts: [
          'Because computers do not have electrical power cords',
          'Because companies need skilled professionals who know how to formulate precise instructions, test model outputs, and chain AI tools into reliable business workflows',
          'Because keyboards are too difficult for normal people to press',
          'Because all software will be deleted'
        ],
        correct: 1,
        exp: 'As generative tools proliferate, organizations require specialists who master prompt engineering, workflow automation, and output validation.',
        hint: 'Who knows how to direct and connect AI systems to get reliable results?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An autonomous agricultural robot is designed to harvest strawberries. Why does the engineering team require both a computer vision specialist AND a plant biologist?',
        opts: [
          'Because robots only work when someone is watering them',
          'Because the computer vision specialist understands pixel neural nets, while the plant biologist understands ripeness, fruit firmness, and stem biology—combining technical and biological domain expertise',
          'Because biologists like eating strawberries during lunch',
          'Because strawberries are made of silicon microchips'
        ],
        correct: 1,
        exp: 'Interdisciplinary domain expertise is essential: successful robotic systems marry AI engineering with biological knowledge of plant delicacy, color ripeness, and harvesting mechanics.',
        hint: 'Why do AI engineers need subject-matter experts to build effective real-world tools?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'skills of tomorrow': {
    title: 'Skills of Tomorrow',
    hook: 'If machines can calculate in microseconds, write boilerplate code, and remember all of Wikipedia, which 6 human super-skills will guarantee that YOU are always indispensable?',
    goal: 'Master the 6 enduring human super-skills: Creativity, Critical Thinking, Communication, Teamwork, Kindness/Empathy, and Curiosity, and learn how to practice them daily.',
    learnPoints: [
      'Discover the Six Enduring Skills: Creativity, Critical Thinking, Communication, Teamwork, Kindness, and Curiosity',
      'Understand why machines can never truly possess empathy, moral conscience, or lived emotional experiences',
      'Build daily learning habits that strengthen your human edge alongside smart computational tools'
    ],
    analogy: 'Your skills of tomorrow are like the instruments in a grand orchestra: AI is the electric synthesizer that can make loud beats, but YOU are the soulful violin, the passionate cello, and the human conductor who creates the moving symphony!',
    explanationHtml: `<h3>The Enduring Human Superpowers</h3>
<p>Whatever career you choose in 2035—whether you become an astronaut, a doctor, a video game director, or a civil rights lawyer—these six human capabilities will make you stand out. Machines have memory and math; you have heart, soul, and imagination!</p>
<h4>The Six Essential Skills Explained</h4>
<ol>
  <li><strong>1. Creativity 🎨:</strong> The power to imagine original stories, invent novel solutions, and make connections between ideas that never met before.</li>
  <li><strong>2. Critical Thinking 🔍:</strong> Asking <em>"Is this really true? What is the evidence? Could the AI be hallucinating?"</em> before accepting claims.</li>
  <li><strong>3. Communication 🗣️:</strong> Explaining your vision with clarity, listening deeply to others, and speaking with authentic warmth.</li>
  <li><strong>4. Teamwork 🤝:</strong> Collaborating with friends who have different backgrounds, talents, and opinions to achieve a shared mission.</li>
  <li><strong>5. Kindness & Empathy 💛:</strong> Caring about the feelings of others. An AI can type "I am sorry", but it has zero genuine feelings. True empathy is uniquely human.</li>
  <li><strong>6. Curiosity 🚀:</strong> Asking "Why?" and "How?", exploring new hobbies, and finding joy in learning every single day!</li>
</ol>`,
    step1: {
      title: '1. Practice Daily Critical Thinking (The Truth Sieve)',
      desc: 'Never accept information passively just because it appeared on a glowing screen.',
      detail: 'Ask for sources, check textbooks, and evaluate author intent.',
      code: '# Critical Thinking Filter\ndef evaluate_claim(claim, source):\n    return verify_with_peer_reviewed_records(claim)'
    },
    step2: {
      title: '2. Exercise Original Creative Imagination',
      desc: 'Dedicate time every day to draw, write, build, and invent without screens.',
      detail: 'Strengthens your unique artistic voice and emotional narrative capacity.',
      code: 'daily_creativity = brainstorm_original_concepts(limit=5)'
    },
    step3: {
      title: '3. Lead with Active Empathy and Teamwork',
      desc: 'Collaborate with peers, resolve conflicts with kindness, and listen actively.',
      detail: 'Creates inclusive teams that invent technology serving all of humanity.',
      code: 'team.collaborate(values=["kindness", "inclusion", "active_listening"])'
    },
    realScenario: 'A team of university engineers built an AI disaster-relief shelter. The computer calculated the cheapest materials: thin corrugated tin. But 10-year-old student advisor Ananya pointed out: \'Tin roofs make a deafening noise during monsoon rain, which will terrify displaced children!\' She recommended sound-dampening bamboo thatch. Her empathy made the shelter a true place of comfort.',
    useCases: [
      'Leaders bringing diverse community groups together to resolve water-sharing disputes with empathy',
      'Filmmakers writing deeply moving scripts about family love that bring audiences to tears',
      'Scientists asking bold, unconventional "Why?" questions that overturn outdated physics theories'
    ],
    simCode: 'skills = ["Creativity 🎨", "Critical Thinking 🔍", "Communication 🗣️", "Teamwork 🤝", "Kindness 💛", "Curiosity 🚀"]\nfor i, s in enumerate(skills, 1):\n    print(f"Skill {i}: {s} - Essential Human Edge!")',
    simOutput: 'Skill 1: Creativity 🎨 - Essential Human Edge!\nSkill 2: Critical Thinking 🔍 - Essential Human Edge!\nSkill 3: Communication 🗣️ - Essential Human Edge!\nSkill 4: Teamwork 🤝 - Essential Human Edge!\nSkill 5: Kindness 💛 - Essential Human Edge!\nSkill 6: Curiosity 🚀 - Essential Human Edge!',
    pairs: [
      { id: 'p1', term: 'Critical Thinking', definition: 'Analyzing facts, questioning assumptions, and checking evidence before believing claims' },
      { id: 'p2', term: 'Empathy', definition: 'The capacity to understand, share, and care about the emotional feelings of others' },
      { id: 'p3', term: 'Curiosity', definition: 'The active desire to explore, investigate, ask questions, and learn new things' }
    ],
    practice: {
      q: 'Which of the following skills is IMPOSSIBLE for an AI computer to genuinely experience?',
      opts: [
        'Calculating 15 multiplied by 400',
        'Feeling genuine empathy and heartbreak when someone is hurt',
        'Sorting photos by timestamp',
        'Translating a sentence from French to German'
      ],
      correct: 1,
      exp: 'AI possesses no consciousness, feelings, or emotional heart. Genuine empathy and compassion are uniquely biological and human.',
      hint: 'Which option requires real human feelings and emotional consciousness?'
    },
    quizzes: [
      {
        q: 'Why does Critical Thinking become MORE important—not less—in an era full of powerful AI tools?',
        opts: [
          { text: 'Because AI tools can generate convincing, plausible-sounding hallucinations and fake claims, requiring humans to verify truth', isCorrect: true },
          { text: 'Because computers refuse to work unless humans think hard', isCorrect: false },
          { text: 'Because critical thinking makes computer fans spin faster', isCorrect: false },
          { text: 'Because search engines stop working', isCorrect: false }
        ],
        exp: 'With AI able to generate realistic fake content in seconds, human critical thinking is essential to separate factual truth from deceptive hallucination.'
      },
      {
        q: 'What is the "Curiosity Staircase" habit that builds lifelong intelligence?',
        opts: [
          { text: 'Stop asking questions once you finish school', isCorrect: false },
          { text: 'Always asking "Why?" and "How?", reading broadly, and trying new creative challenges regularly', isCorrect: true },
          { text: 'Copying homework from online forums', isCorrect: false },
          { text: 'Only watching 5-second video clips all day', isCorrect: false }
        ],
        exp: 'Continuous curiosity—asking questions, reading books, and tackling creative projects—is the proven driver of cognitive growth and innovation.'
      }
    ],
    practicalTask: {
      title: 'The 1-Week "Curiosity & Kindness" Journal',
      objective: 'Log one curious question asked and one act of human kindness performed every day for 5 days.',
      steps: [
        'Create a table in your notebook with 3 columns: Day, "Curious Question I Asked", "Act of Kindness I Did".',
        'Day 1 Example Question: "Why do leaves change color in autumn?" (Researched in library).',
        'Day 1 Example Kindness: "Helped a classmate pick up their scattered pencils with a smile."',
        'Reflect on Day 5: How did exercising your curiosity and kindness make you feel stronger and happier?'
      ],
      expectedResult: 'You will actively practice the soft skills that define your irreplaceable human identity.'
    },
    recall: {
      q: 'What are the 6 enduring human skills of tomorrow?',
      a: 'Creativity, Critical Thinking, Communication, Teamwork, Kindness/Empathy, and Curiosity!'
    },
    takeaways: [
      'While machines master computation, humans lead with conscience and empathy.',
      'Critical thinking protects you from online hallucinations and misinformation.',
      'Curiosity and kindness are the twin engines of joyful, meaningful human progress.'
    ],
    gameMechanic: {
      title: 'Skills Matrix Arena: The Human Edge',
      scenario: 'You are Chief Coordinator of the Global Resilience Task Force! A major metropolitan emergency has struck: a flash flood has knocked out power to the central hospital, and community rumors are spreading panicky misinformation online. You must deploy your 6 Human Skill Cards alongside your AI data tools!',
      objective: 'Deploy the correct Human Skill Cards to resolve the medical power crisis, calm community rumors, and restore mutual cooperation.',
      rules: [
        'Crisis 1 (Hospital Power): Deploy Critical Thinking + Creative Engineering to route solar backup batteries.',
        'Crisis 2 (Panic Rumors): Deploy Clear Communication + Fact-Checking to broadcast verified safety bulletins.',
        'Crisis 3 (Elderly Evacuation): Deploy Empathy & Kindness + Teamwork to rescue stranded families.'
      ],
      choices: [
        'Select Skill Combo 1: Critical Thinking (Analyze power grid) + Teamwork (Coordinate linemen)',
        'Select Skill Combo 2: Communication (Broadcaster) + Truth Verification (Debunk rumors)',
        'Select Skill Combo 3: Empathy (Warm blankets & care) + Active Kindness (Comfort children)'
      ],
      progression: [
        'Round 1: Hospital backup batteries powered life-support wards (+120 pts)',
        'Round 2: False panic quelled with transparent, calm safety broadcasts (+120 pts)',
        'Round 3: 200 families sheltered with warm meals and compassionate care (+130 pts)'
      ],
      completion: 'The city was saved through the triumphant balance of technology and human heart! Awarded the Human Edge Champion Laurels.',
      badge: 'Human Edge Champion 🏅',
      points: 370
    },
    reflectionSafety: {
      prompt: 'If an AI chatbot tells a student: "You are not smart enough to study science", how should the student react, and why is the AI\'s judgment completely meaningless?',
      rule: 'Self-Worth Shield: An AI has no consciousness, knows nothing of your potential, and cannot measure your human worth. Never let an algorithm limit your dreams.',
      discussion: 'Why is human potential something that grows with practice, courage, and dedication rather than a fixed computer score?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is the best example of "Critical Thinking" when using an AI search tool?',
        opts: [
          'Accepting the first search result without reading the second sentence',
          'Asking "Who wrote this information, what evidence supports it, and does a textbook confirm it?"',
          'Clicking on every colorful advertisement banner on the screen',
          'Assuming that anything written on a computer is automatically true'
        ],
        correct: 1,
        exp: 'Critical thinking requires evaluating sources, questioning assertions, and checking corroborating evidence before accepting claims as factual.',
        hint: 'Which option involves questioning evidence and checking reliable sources?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A computer algorithm designs a park bench made of polished cold metal that is mathematically indestructible. A human designer adds curved wooden armrests and warm wooden slats. Why did the human designer make this change?',
        opts: [
          'Because the designer wanted to waste extra materials',
          'Because the human designer used empathy to consider human physical comfort, knowing that metal gets uncomfortably freezing in winter and burning hot in summer',
          'Because wood is lighter to carry',
          'Because the computer crashed'
        ],
        correct: 1,
        exp: 'Empathy in design focuses on human comfort, physical dignity, and emotional well-being—considerations that pure mathematical optimization overlooks.',
        hint: 'How does a cold metal bench feel to sit on in the middle of winter?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI translation model translates an ancient poem from Sanskrit to English. The translation is grammatically accurate, but feels dry and wooden. A human poet rewrites the English translation, preserving the musical cadence, emotional longing, and metaphorical beauty. What did the human poet provide that the AI could not?',
        opts: [
          'Faster keyboard typing speed',
          'Lived emotional depth, cultural resonance, and artistic poetic sensitivity',
          'A larger dictionary of words',
          'More electricity'
        ],
        correct: 1,
        exp: 'Poetic translation requires cultural sensibility, emotional resonance, and metaphorical feeling born of human lived experience—qualities beyond statistical word substitution.',
        hint: 'What gives poetry its emotional power to move human hearts?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 5: AI TOOLS (Conversational Tutoring & Multimodal Co-Creation)
  // ═══════════════════════════════════════════════════════════════════════════

  'ai study buddy': {
    title: 'AI Study Buddy',
    hook: 'Arjun used an AI chatbot to write his entire science homework in 30 seconds. On test day, he stared at question 1 in total silence! How can you use an AI Study Buddy to make yourself brilliant rather than helpless?',
    goal: 'Master conversational tutoring with AI: utilizing Socratic questioning, study timetable planning, concept simplification, and the golden rule of "Try First, Ask Second, Check Third".',
    learnPoints: [
      'Learn how to configure an AI Study Buddy for Socratic tutoring (giving hints and guided questions rather than direct answers)',
      'Master the Golden Study Protocol: 1. Try First &rarr; 2. Ask Second &rarr; 3. Check Third',
      'Discover smart study workflows: generating practice flashcards, analogies for difficult terms, and structured study plans'
    ],
    analogy: 'An AI Study Buddy is like a running coach jogging beside you: a great coach doesn\'t carry you across the finish line in a golf cart (that wouldn\'t make you fit!); a great coach cheers, gives form tips, and helps YOU run faster with your own strong legs!',
    explanationHtml: `<h3>The Smart Companion for Active Learning</h3>
<p>An AI Study Buddy is an interactive conversational tool that is always patient, never gets tired, and is ready to explain a hard science or math concept ten different ways until you finally say: <em>"Aha! Now I get it!"</em></p>
<h4>Smart Use vs Unsmart Use</h4>
<table border="1" cellpadding="6">
  <tr><th>Smart Student (Gets Stronger! 🧠)</th><th>Unsmart Student (Learns Nothing! 📉)</th></tr>
  <tr><td>"I tried dividing 144 by 12 and got 11. Can you explain where my remainder step went wrong?"</td><td>"Do my math homework for me so I can copy it."</td></tr>
  <tr><td>"Give me 3 practice multiple-choice questions on photosynthesis to test my memory."</td><td>"Write my science essay so I don\'t have to read."</td></tr>
  <tr><td>"Explain what 'ecosystem' means using a coral reef analogy for a 5th grader."</td><td>"Write my book report about a book I never opened."</td></tr>
</table>
<h4>The 4 Golden Steps of Study Buddy Mastery</h4>
<ol>
  <li><strong>1. TRY FIRST:</strong> Always attempt the problem with your own brain and pen first.</li>
  <li><strong>2. ASK SECOND:</strong> If stuck, ask the AI for a hint, an analogy, or a simpler explanation.</li>
  <li><strong>3. CHECK THIRD:</strong> Verify the AI\'s facts against your official textbook or with your teacher.</li>
  <li><strong>4. WRITE FOURTH:</strong> Put the screen away and write the final solution in your own words!</li>
</ol>`,
    step1: {
      title: '1. Establish Socratic Tutoring Mode',
      desc: 'Instruct the AI to act as a supportive tutor that prompts you with questions rather than spoiling answers.',
      detail: 'Use prompt: "Do not give direct answers. Guide me with step-by-step Socratic hints."',
      code: 'tutor_prompt = "You are a Socratic study tutor. Guide the student with 1 hint at a time."'
    },
    step2: {
      title: '2. Isolate the Conceptual Friction Point',
      desc: 'Explain exactly where your understanding breaks down instead of asking for total completion.',
      detail: 'Say: "I understand numerator, but I am confused by least common denominator."',
      code: 'student_query = "Explain finding LCD for 1/3 and 1/4 using pizza slices"'
    },
    step3: {
      title: '3. Verify and Synthesize in Your Own Words',
      desc: 'Cross-check the explanation with your school book and summarize in your notebook.',
      detail: 'Transcribing in your own handwriting seals memory pathways in the brain.',
      code: 'textbook_verified = verify_formula(student_query, standard_textbook)\nstudent_notes.write()'
    },
    realScenario: 'Priya struggled to understand how the human circulatory system works. She prompted her AI Study Buddy: "I am studying for my Class 5 exam. Pretend you are a red blood cell taking a journey through the heart and lungs. Describe your adventure in 4 stops." The story made pulmonary circulation unforgettable, and Priya scored 100% on her exam!',
    useCases: [
      'Students generating customized 20-minute daily study schedules balancing sports and homework',
      'Language learners asking for interactive dialogues ordering food in conversational Spanish',
      'Test preparation: generating 5 rapid-fire practice quizzes with detailed answer explanations'
    ],
    simCode: 'def study_protocol(mode, question):\n    if mode == "cheat":\n        return "⚠️ Copying answers builds zero brain strength. You learn nothing."\n    return f"💡 Socratic Hint: Think about what happens when you multiply the denominators 3 and 4! What common multiple do they share?"\nprint(study_protocol("cheat", "solve 1/3 + 1/4"))\nprint(study_protocol("socratic", "solve 1/3 + 1/4"))',
    simOutput: '⚠️ Copying answers builds zero brain strength. You learn nothing.\n💡 Socratic Hint: Think about what happens when you multiply the denominators 3 and 4! What common multiple do they share?',
    pairs: [
      { id: 'p1', term: 'Socratic Method', definition: 'A teaching method where the tutor asks guided questions to help the student discover the answer independently' },
      { id: 'p2', term: 'Study Buddy', definition: 'An AI conversational assistant configured to explain concepts, quiz memory, and offer helpful learning hints' },
      { id: 'p3', term: 'Active Learning', definition: 'Engaging your own brain by solving problems, testing memory, and explaining concepts in your own words' }
    ],
    practice: {
      q: 'Which prompt demonstrates the smartest, most effective use of an AI Study Buddy?',
      opts: [
        'Write my entire 5-page history report so I can copy it into my notebook',
        'I am preparing for a Class 5 quiz on the Solar System. Ask me 3 challenging questions one at a time, wait for my answers, and tell me if I am right!',
        'Give me the answers to all the odd-numbered sums in my textbook',
        'Type a story and don\'t let me read it'
      ],
      correct: 1,
      exp: 'Prompt 2 engages active retrieval practice: it asks the AI to test the student one question at a time, providing feedback that strengthens long-term memory.',
      hint: 'Which option tests your brain and gives feedback instead of doing the work for you?'
    },
    quizzes: [
      {
        q: 'What does the rule "Try First, Ask Second, Check Third" protect you from?',
        opts: [
          { text: 'It protects you from becoming dependent on machines and prevents you from accepting unverified AI errors', isCorrect: true },
          { text: 'It protects your keyboard from dust', isCorrect: false },
          { text: 'It prevents computer batteries from getting full', isCorrect: false },
          { text: 'It stops books from closing', isCorrect: false }
        ],
        exp: 'Trying first strengthens your brain; asking second resolves obstacles; checking third ensures you never memorize an inaccurate hallucinated claim.'
      },
      {
        q: 'Why is an AI Study Buddy especially helpful when you don\'t understand a concept the first time?',
        opts: [
          { text: 'Because you can ask it to re-explain using different analogies, simpler words, or funny stories without it ever getting impatient', isCorrect: true },
          { text: 'Because it will do all your chores for you', isCorrect: false },
          { text: 'Because it calls your teacher on the telephone', isCorrect: false },
          { text: 'Because it changes your grades in the school computer', isCorrect: false }
        ],
        exp: 'Patience and adaptability are great strengths of conversational tutors: they can generate dozens of fresh analogies tailored to your specific learning style.'
      }
    ],
    practicalTask: {
      title: 'Craft Your Socratic Tutor Prompt',
      objective: 'Author a master Socratic study prompt for a difficult topic you are currently learning in school.',
      steps: [
        'Identify a topic you find tricky (e.g. Long Division, Photosynthesis, Water Cycle, Magnetism).',
        'Use the Socratic Recipe: "You are a friendly 5th-grade study tutor. I am studying [Topic]. Do NOT give me the direct answers. Ask me 1 guiding question at a time to help me figure out the concept. If I am wrong, give a gentle hint."',
        'Test the prompt with a friend or in your study lab.',
        'Record the 3 guided questions and write what you learned.'
      ],
      expectedResult: 'You will gain the practical capability to turn conversational chatbots into interactive learning partners.'
    },
    recall: {
      q: 'What are the 4 golden steps of using an AI Study Buddy?',
      a: '1. Try First &rarr; 2. Ask Second &rarr; 3. Check Third &rarr; 4. Write Fourth in your own words!'
    },
    takeaways: [
      'A true study buddy guides with hints and questions rather than doing your homework for you.',
      'Socratic dialogue strengthens neural pathways and deepens conceptual understanding.',
      'Always cross-check critical science and history facts against official school textbooks.'
    ],
    gameMechanic: {
      title: 'Socratic Study Buddy Lab',
      scenario: 'You are studying for the Junior AI Olympiad finals! The study chatbot has two modes: "Cheat Mode" (gives raw answers that make you fail tests) and "Socratic Tutor Mode" (asks sharp questions that make you an Olympiad Champion). You must calibrate the study engine and crack 3 multi-step logic riddles!',
      objective: 'Solve 3 multi-step Olympiad logic riddles using only Socratic hint prompts to achieve Master Scholar status.',
      rules: [
        'Rule 1: Switch chatbot engine from Answer Mode to Socratic Mentor Mode.',
        'Rule 2: Read each Socratic hint and input your reasoned hypothesis.',
        'Rule 3: Achieve 3 consecutive riddle breakthroughs without requesting raw answers.'
      ],
      choices: [
        'Riddle 1 (Fractions): "If 1/2 of a pizza is 4 slices, how many slices is 3/4?" &rarr; Reason through single-quarter unit values (+110 pts)',
        'Riddle 2 (Circuits): "Two switches must both be on to light the lamp. Which logic gate is this?" &rarr; Identify AND gate (+120 pts)',
        'Riddle 3 (AI Training): "If training error is zero but test error is 50%, what is the flaw?" &rarr; Diagnose Overfitting (+130 pts)'
      ],
      progression: [
        'Riddle 1: Pizza unit fraction calculated through guided hints (+110 pts)',
        'Riddle 2: Series circuit logic deduced through Socratic dialogue (+120 pts)',
        'Riddle 3: Overfitting diagnosis cracked independently (+130 pts)'
      ],
      completion: 'All 3 Olympiad riddles cracked with pure human reasoning! Earn the Certified Master Scholar Badge.',
      badge: 'Certified Master Scholar 🦉',
      points: 360
    },
    reflectionSafety: {
      prompt: 'If you use an AI Study Buddy late at night when you should be sleeping, how does lack of sleep affect your brain\'s ability to learn?',
      rule: 'Sleep & Brain Health Rule: Sleep is when your biological brain files away memories and strengthens neural connections. AI study tools should never replace a good night\'s rest.',
      discussion: 'Why is an 8-hour sleep schedule more powerful for exam performance than staying up all night on screens?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is the main advantage of the "Socratic Method" in an AI study tutor?',
        opts: [
          'It tells you the answer in 1 second so you can close your books',
          'It guides you with progressive questions and hints, forcing your own brain to think and truly understand the concept',
          'It writes the exam for you',
          'It translates text into Latin'
        ],
        correct: 1,
        exp: 'The Socratic method fosters active cognitive retrieval and conceptual reasoning by asking guiding questions rather than spoon-feeding direct answers.',
        hint: 'Does true understanding come from being told the answer or figuring it out with guided hints?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Sanya asks an AI study buddy: "What was the capital of the Maurya Empire?" The AI answers: "Pataliputra." Sanya wants to follow the "Check Third" rule. Which action should she take?',
        opts: [
          'Immediately post the answer on social media',
          'Verify the historical fact in her Class 5 Social Studies textbook or library encyclopedia to confirm it is accurate',
          'Ask the AI 50 more times to see if it changes its mind',
          'Delete her history notes'
        ],
        correct: 1,
        exp: 'Following the "Check Third" rule means cross-referencing AI outputs against authoritative school textbooks and historical encyclopedias before accepting them as factual truth.',
        hint: 'How do good researchers confirm historical facts?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI study app claims: "Using our app means students will never need to read books again." Why is this statement pedagogically false and dangerous?',
        opts: [
          'Because books are cheaper than electricity',
          'Because reading physical books trains deep attention, sustained focus, complex vocabulary, and critical contemplation that short digital chat snippets cannot replicate',
          'Because books have prettier covers',
          'Because computer screens are made of plastic'
        ],
        correct: 1,
        exp: 'Deep long-form reading builds sustained cognitive stamina, imagination, and analytical synthesis. Interactive chat snippets are supplementary aids, never complete replacements for deep reading.',
        hint: 'What cognitive benefits does deep book reading provide that short chat messages cannot?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'ai creative corner': {
    title: 'AI Creative Corner',
    hook: 'A 10-year-old student game developer creates a magnificent video game about cleaning up ocean coral reefs. She uses AI to brainstorm creature names and compose background music loops, while writing all the game rules, coding, and character heart herself! How did she direct the ultimate creative team?',
    goal: 'Master Multimodal Co-Creation across text, visual art, audio soundtracks, and code logic, understanding that human vision leads while AI assists.',
    learnPoints: [
      'Understand Multimodal AI: tools that combine text, image synthesis, sound generation, and coding logic',
      'Master the Co-Creative Workflow: 1. Human Vision First &rarr; 2. Multimodal AI Prototyping Second &rarr; 3. Human Assembly & Credit Third',
      'Practice ethical creative attribution: being honest about AI assistance and celebrating original human storytelling'
    ],
    analogy: 'Multimodal AI is like having a fully equipped digital movie studio in your bedroom: you have a costume department (image generator), a soundtrack orchestra (music AI), and a script editor (text AI)—but YOU are the movie director who decides the plot, the mood, and the final cut!',
    explanationHtml: `<h3>The Multimodal Creative Studio</h3>
<p>In the past, making an animated story or video game required a team of 50 people: illustrators, musicians, writers, and programmers. Today, <strong>Multimodal AI</strong> tools allow a single creative student to bring ambitious artistic dreams to life!</p>
<h4>What Does "Multimodal" Mean?</h4>
<ul>
  <li><strong>Text Mode:</strong> Writing dialogue, world lore, character backstories, and riddle rhymes.</li>
  <li><strong>Visual Mode:</strong> Synthesizing 2D sprite characters, background landscapes, and game title banners.</li>
  <li><strong>Audio Mode:</strong> Generating atmospheric background music loops (e.g. "whimsical underwater acoustic guitar with bubble sounds").</li>
  <li><strong>Logic Mode:</strong> Brainstorming simple coding snippets in block-based languages or Python.</li>
</ul>
<h4>The Creative Director’s Golden Code of Honor</h4>
<ol>
  <li><strong>You Are the Author:</strong> The core idea, emotional message, and character values must come from your own imagination.</li>
  <li><strong>Curate and Refine:</strong> Never accept the first output blindly. Tweak, edit, recombine, and paint over digital assets.</li>
  <li><strong>Honest Attribution:</strong> Always include an Acknowledgments slide: <em>"Story, characters, and coding by Meera. Concept brainstorm assisted by AI Studio."</em></li>
</ol>`,
    step1: {
      title: '1. Establish the Unified Creative Lore',
      desc: 'Define the world-building rules, visual color palette, and musical tone.',
      detail: 'Ensures that story, artwork, and music share a consistent thematic style.',
      code: '# World Lore Engine\nworld = {"theme": "solar_punk_floating_islands", "palette": ["emerald", "sky_blue", "gold"]}'
    },
    step2: {
      title: '2. Orchestrate Multimodal Asset Synthesis',
      desc: 'Generate aligned text descriptions, visual concepts, and audio ambience.',
      detail: 'Cross-reference visual prompts with world lore descriptors.',
      code: 'char_sprite = generate_concept_art(world["theme"], character="Kiko the flying squirrel")\nbgm_track = generate_audio_loop(mood="whimsical_flute_and_wind_chimes")'
    },
    step3: {
      title: '3. Assemble, Code, and Acknowledge',
      desc: 'Bring assets into your game engine or presentation, adding your personal code.',
      detail: 'Add proper credits acknowledging AI co-creation tools.',
      code: 'game.load_assets(char_sprite, bgm_track)\ngame.credits = "Created by Student Architect. AI assisted brainstorming."'
    },
    realScenario: 'For an environmental science festival, Vikram designed an interactive digital comic book about saving honeybees. He wrote the script about Maya the Worker Bee, used an AI tool to brainstorm comic panel backgrounds, and generated a gentle acoustic guitar soundtrack. His comic received a standing ovation for its emotional storytelling and multimedia polish!',
    useCases: [
      'Young game creators prototyping fantasy character sprites and sound effects for school game jams',
      'Music students generating accompanying rhythmic drum beats while playing real violin melodies',
      'Student filmmakers creating storyboards and moodboards before filming school video projects'
    ],
    simCode: 'multimodal_pipeline = [\n    "1. Story Lore: Written by Student ✍️",\n    "2. Character Art: Brainstormed with Diffusion AI 🎨",\n    "3. Ambient Audio: Synthesized with Audio AI 🎵",\n    "4. Final Assembly: Programmed in Scratch with Human Heart 💖"\n]\nfor step in multimodal_pipeline:\n    print(step)',
    simOutput: '1. Story Lore: Written by Student ✍️\n2. Character Art: Brainstormed with Diffusion AI 🎨\n3. Ambient Audio: Synthesized with Audio AI 🎵\n4. Final Assembly: Programmed in Scratch with Human Heart 💖',
    pairs: [
      { id: 'p1', term: 'Multimodal AI', definition: 'AI systems capable of processing and generating multiple forms of media (text, images, audio, video)' },
      { id: 'p2', term: 'Creative Attribution', definition: 'Clearly stating how digital tools helped you brainstorm, while celebrating your original creative direction' },
      { id: 'p3', term: 'World Lore', definition: 'The background history, rules, ecology, and atmosphere of a fictional universe' }
    ],
    practice: {
      q: 'When creating a digital game using AI-generated art and sound helpers, who should be credited as the creator of the game?',
      opts: [
        'The AI tool company only',
        'The student designer (with a note thanking AI tools for concept brainstorming)',
        'Nobody, because computers own everything',
        'The person who manufactured the keyboard'
      ],
      correct: 1,
      exp: 'The student is the creative director and author. Best practice in ethical creative computing is crediting the student while transparently noting AI assistance in the project credits.',
      hint: 'Who came up with the idea, designed the game, and directed the tools?'
    },
    quizzes: [
      {
        q: 'What is the danger of letting an AI generate 100% of your art, story, and music without any personal editing?',
        opts: [
          { text: 'The project will feel generic, repetitive, and devoid of your personal voice, memories, and emotional heart', isCorrect: true },
          { text: 'The computer will run out of colors', isCorrect: false },
          { text: 'The file will become too loud', isCorrect: false },
          { text: 'The monitor will melt', isCorrect: false }
        ],
        exp: 'Uncurated AI generation lacks personal perspective and authentic emotional resonance. Human curation, editing, and intention give art its soul.'
      },
      {
        q: 'What does "multimodal" mean in modern Artificial Intelligence?',
        opts: [
          { text: 'Operating only in black and white text', isCorrect: false },
          { text: 'Working across multiple media modes simultaneously, such as text, speech, images, and music', isCorrect: true },
          { text: 'Running on multiple batteries', isCorrect: false },
          { text: 'A computer with three wheels', isCorrect: false }
        ],
        exp: '"Multimodal" systems process and synthesize multiple sensory modalities—text, vision, audio, and code—within unified architectures.'
      }
    ],
    practicalTask: {
      title: 'Produce a 1-Page Multimodal Game Bible',
      objective: 'Design a creative blueprint for an eco-adventure game combining lore, visual prompt, and audio mood.',
      steps: [
        'Title & Hero: Name your game and hero (e.g. "Echo the Coral Guardian").',
        'Lore Summary: Write a 3-sentence backstory for your game world.',
        'Visual Prompt: Write a precision 3-token prompt for your main character sprite (Subject + Art Style + Lighting).',
        'Audio Prompt: Write a 1-sentence prompt describing the title screen background music mood.',
        'Attribution Badge: Write your ethical creator pledge at the bottom: "Conceived, authored, and directed by [Your Name]."'
      ],
      expectedResult: 'You will experience the complete multimodal creative director pipeline from vision to asset specification.'
    },
    recall: {
      q: 'What is multimodal creative AI?',
      a: 'AI tools that combine text, image generation, audio synthesis, and code to help human creators build rich multimedia worlds!'
    },
    takeaways: [
      'Multimodal AI connects text, visuals, audio, and code into unified creative workflows.',
      'Human vision, curation, and emotional direction turn raw generated assets into meaningful art.',
      'Always practice honest creative attribution by giving credit where AI tools assisted.'
    ],
    gameMechanic: {
      title: 'Multimodal Studio: Game Design Sprint',
      scenario: 'You are Creative Director at Pixel Craft Studios! You have 15 minutes to assemble a prototype multimedia pitch for a new children\'s game: "Cosmic Gardeners of Europa". You must coordinate the Lore Writer (Text), the Sprite Painter (Vision), and the Audio Composer (Music) to produce a cohesive pitch deck!',
      objective: 'Synthesize lore, visual character sprite, and audio soundtrack tokens into a harmonized game concept deck.',
      rules: [
        'Rule 1: Match Lore Theme (Ice Moon Greenhouse) with Visual Style (Luminescent Bioluminescence).',
        'Rule 2: Match Soundtrack Mood (Ethereal synthesizer chimes with ice crackles).',
        'Rule 3: Achieve 100% thematic harmony across all 3 modes.'
      ],
      choices: [
        'Lore Card: "A robotic botanist nurturing cosmic orchids beneath the ice sheet of Europa"',
        'Visual Token: "Cute round robot tending glowing cyan flowers under ice domes, 3D claymation"',
        'Audio Token: "Gentle crystal chimes, ambient space pad, soft heartbeat rhythm"'
      ],
      progression: [
        'Sprint 1: Lore narrative approved with high environmental resonance (+120 pts)',
        'Sprint 2: Visual sprite synthesized with matching bioluminescent palette (+120 pts)',
        'Sprint 3: Soundtrack aligned seamlessly with visual mood (+130 pts)'
      ],
      completion: 'The game pitch deck achieved unanimous greenlight approval! Awarded the Multimodal Creator Trophy.',
      badge: 'Multimodal Creator 🎬',
      points: 370
    },
    reflectionSafety: {
      prompt: 'If you use AI to create a song that sounds exactly like a famous real-world singer without their permission, why is that ethically problematic?',
      rule: 'Voice & Identity Respect Rule: Never impersonate or clone real human artists\' voices without permission. True creators respect fellow artists\' rights and identities.',
      discussion: 'Why is protecting artists\' voices and likenesses an essential part of copyright and human respect?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is an example of "Multimodal AI"?',
        opts: [
          'A calculator that only does multiplication',
          'A system that takes a written text prompt and generates both a matching 3D image and an orchestral background music track',
          'A mechanical alarm clock with ringing bells',
          'A plain paper notebook'
        ],
        correct: 1,
        exp: 'Multimodal AI operates across multiple modalities—in this case, translating textual language inputs into visual and auditory outputs.',
        hint: 'Which option operates across multiple forms of media (text, image, audio)?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Sanya wants her game character to look consistent across all 10 levels. When using an AI image generator, she gets a completely different-looking character every time she types the prompt. What technique should she use to maintain visual consistency?',
        opts: [
          'Give up on making games',
          'Use seed numbers, consistent reference image embeddings, and strict descriptive prompt tokens that define exact clothing, hair color, and facial traits',
          'Shake the computer monitor',
          'Type the prompt in capital letters only'
        ],
        correct: 1,
        exp: 'Using fixed seed parameters, character anchor descriptions, and image-to-image reference conditioning enables generative models to maintain consistent character identity across scenes.',
        hint: 'How do prompt engineers lock specific visual traits across multiple generated images?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An international game competition has a rule: "Projects using generative AI must include an Attribution Disclosure." What is the purpose of this rule?',
        opts: [
          'To ban computers from all classrooms',
          'To ensure honesty, transparency, and fairness, celebrating the human author\'s creative vision while clearly acknowledging the algorithmic tools used',
          'To charge extra registration fees for using software',
          'To make students write by hand only'
        ],
        correct: 1,
        exp: 'Attribution disclosures promote academic and artistic integrity, acknowledging the role of computational tools while recognizing authentic human authorship.',
        hint: 'Why do scientific papers and art exhibitions include acknowledgments?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 6: RESPONSIBLE AI (Hallucinations, Dataset Bias & Cyber Captains)
  // ═══════════════════════════════════════════════════════════════════════════

  'can ai be wrong?': {
    title: 'Can AI Be Wrong?',
    hook: 'An image recognition model was trained on 20,000 photos of orange domestic cats. When a student showed it a picture of a sleek black panther, the AI confidently declared: "Not a Cat! It is a Black Car!" Why did the machine fail so hilariously?',
    goal: 'Understand the root causes of AI errors: dataset bias, lack of common sense, knowledge cutoffs, and confident hallucinations, and master the art of bias auditing.',
    learnPoints: [
      'Discover why AI makes mistakes: incomplete or biased training data (the "Orange Cat vs Black Cat" problem)',
      'Understand why an AI sounds 100% confident even when its answer is completely fabricated (Hallucination)',
      'Learn how to audit datasets for fairness, balance, and real-world diversity'
    ],
    analogy: 'An AI is like a tourist who spent their whole life in a desert: if you show them an orange desert fox, they recognize it instantly; but if you show them an arctic polar bear, they might guess "giant marshmallow" because they have never seen snow in their life! It only knows what its data contained!',
    explanationHtml: `<h3>The Fallibility of Artificial Intelligence</h3>
<p>Because AI systems use fluent language and polite words, people often make the dangerous mistake of believing that computers are infallible. The truth is simple: <strong>AI makes mistakes constantly!</strong></p>
<h4>Four Major Reasons Why AI Gets Confused</h4>
<ol>
  <li><strong>1. Biased or Incomplete Training Data:</strong> The famous <em>Orange Cat Dilemma</em>! If an AI model only saw sunny daytime photos of orange cats, it will fail when shown a black cat at dusk. If the training examples are incomplete, the AI\'s worldview is flawed!</li>
  <li><strong>2. Lack of Common Sense and Embodied Understanding:</strong> An AI does not know that water is wet, that fire burns, or that drop-kicking a smartphone breaks the glass. It predicts word probabilities without physical understanding.</li>
  <li><strong>3. Hallucinations (Confidently Making Things Up):</strong> When an AI does not know the answer, it rarely says "I don\'t know." It often invents fake citations, fake math calculations, or fictional historical treaties with extreme confidence.</li>
  <li><strong>4. Knowledge Cutoffs & Outdated Information:</strong> AI models only know what existed up to the date their training data was finalized. If a new scientific discovery was made yesterday, the model remains blind to it.</li>
</ol>
<h4>The Golden Rule of Dataset Fairness</h4>
<p>Fair examples make a fair AI! When we build datasets, we must deliberately include diverse examples from all cultures, colors, geographic terrains, and lighting conditions to ensure the technology works equitably for everyone.</p>`,
    step1: {
      title: '1. Auditing Training Data Distributions',
      desc: 'Inspect dataset class frequencies to identify underrepresented groups or missing categories.',
      detail: 'If class A has 10,000 samples and class B has only 20 samples, the model will be heavily biased.',
      code: '# Dataset Distribution Audit\nclass_counts = count_samples_by_category(dataset)\nif class_counts["black_cat"] < class_counts["orange_cat"] * 0.1:\n    flag_dataset_bias("Severe underrepresentation of dark animal coats")'
    },
    step2: {
      title: '2. Rebalancing and Augmenting Data',
      desc: 'Collect diverse real-world samples and apply data augmentation (flips, contrast shifts, night lighting).',
      detail: 'Ensures the neural network learns generalized, robust feature representations.',
      code: 'balanced_dataset = balance_classes(dataset, target_ratio="1:1")\naugmented_data = apply_night_lighting_filters(balanced_dataset)'
    },
    step3: {
      title: '3. Testing Against Adversarial Edge Cases',
      desc: 'Stress-test the trained model with difficult, ambiguous, and low-light examples.',
      detail: 'Identify blind spots before deploying the system in real-world environments.',
      code: 'edge_case_accuracy = evaluate_on_adversarial_set(model, night_animal_photos)\nassert edge_case_accuracy > 0.90'
    },
    realScenario: 'A municipal city rolled out an AI recycling bin with a camera. In testing, it separated white plastic milk jugs perfectly. But when children dropped dark blue or black juice bottles into the bin, the AI categorized them as "Garbage" and sent them to landfills. Engineers discovered that 100% of the training photos were white milk jugs! Once they added 5,000 photos of colorful bottles, the bin sorted all plastics accurately.',
    useCases: [
      'Self-driving car teams collecting millions of hours of driving footage in blizzards, desert sandstorms, and night rain to prevent sensor blind spots',
      'Language translation developers including regional dialects and colloquial expressions to prevent cultural misinterpretations',
      'Voice assistants being retrained on children\'s high-pitched voices so smart educational tools understand younger students'
    ],
    simCode: 'dataset = {"Orange Cats": 5000, "Black Cats": 12}\nbias_ratio = dataset["Orange Cats"] / dataset["Black Cats"]\nprint(f"Dataset Skew Ratio: {bias_ratio:.1f}:1")\nif bias_ratio > 10:\n    print("⚠️ ALERT: High risk of dataset bias! Model will misclassify black cats.")',
    simOutput: 'Dataset Skew Ratio: 416.7:1\n⚠️ ALERT: High risk of dataset bias! Model will misclassify black cats.',
    pairs: [
      { id: 'p1', term: 'Dataset Bias', definition: 'When training data overrepresents certain groups or examples while excluding others, causing unfair AI predictions' },
      { id: 'p2', term: 'Data Augmentation', definition: 'Creating varied training examples by rotating, darkening, or flipping photos to help AI handle diverse real-world conditions' },
      { id: 'p3', term: 'Knowledge Cutoff', definition: 'The specific date when an AI\'s training data ended, after which it has no knowledge of new world events' }
    ],
    practice: {
      q: 'An AI image recognition model was trained ONLY on photos of red sports cars taken in bright sunshine. What will most likely happen when it encounters a blue electric car driving at night?',
      opts: [
        'It will recognize it with 100% perfection',
        'It will likely misclassify or fail to detect it because it never learned features for blue paint or nighttime shadow patterns',
        'The car will automatically turn into a red sports car',
        'The computer screen will display a red traffic light'
      ],
      correct: 1,
      exp: 'Machine learning models rely entirely on statistical patterns from their training data. Lack of color and lighting diversity creates severe blind spots in novel real-world conditions.',
      hint: 'Did the model see blue cars or nighttime shadows during training?'
    },
    quizzes: [
      {
        q: 'Why does an AI often sound so polite and confident even when giving completely false information?',
        opts: [
          { text: 'Because large language models are trained to mimic confident, authoritative human writing style, regardless of factual truth', isCorrect: true },
          { text: 'Because computers are legally forbidden from being wrong', isCorrect: false },
          { text: 'Because the internet verifies every single word before displaying it', isCorrect: false },
          { text: 'Because keyboards only type correct facts', isCorrect: false }
        ],
        exp: 'Generative models predict probable linguistic tokens that sound natural and convincing; they do not have an internal consciousness that verifies objective truth.'
      },
      {
        q: 'How can engineers fix an AI model that exhibits dataset bias?',
        opts: [
          { text: 'By painting the computer case with gold paint', isCorrect: false },
          { text: 'By collecting diverse, balanced training examples from all demographic groups and environmental conditions', isCorrect: true },
          { text: 'By deleting the word "bias" from the computer dictionary', isCorrect: false },
          { text: 'By unplugging the mouse', isCorrect: false }
        ],
        exp: 'Mitigating dataset bias requires intentional data curation: gathering balanced, representative samples that reflect real-world diversity.'
      }
    ],
    practicalTask: {
      title: 'The Dataset Bias Audit Checklist',
      objective: 'Audit a hypothetical animal classification dataset and identify 3 critical representation gaps.',
      steps: [
        'Examine Dataset A: 10,000 photos of birds (8,000 pigeons in city parks, 1,900 sparrows on fences, 100 penguins in snow).',
        'Identify Gap 1: What bird habitats are missing? (Tropical rainforests, wetlands, deep oceans).',
        'Identify Gap 2: What bird types are missing? (Flightless birds, raptors, owls, flamingos).',
        'Write an Action Plan: How many new photos of each missing bird species must be gathered to make the dataset balanced?',
        'Present your balanced data curation strategy to your teacher.'
      ],
      expectedResult: 'You will understand how biased data sampling occurs and how engineers proactively balance training datasets.'
    },
    recall: {
      q: 'Why can AI be wrong?',
      a: 'Because AI depends strictly on its training data; biased examples, missing diversity, and lack of real-world understanding cause errors!'
    },
    takeaways: [
      'Fair, diverse examples create fair, reliable AI systems.',
      'Sounding confident does NOT mean an AI is factually correct.',
      'Auditing datasets for missing groups and edge cases is essential before deploying technology.'
    ],
    gameMechanic: {
      title: 'Dataset Bias & Hallucination Buster',
      scenario: 'You are Chief AI Fairness Inspector at the Global Robotics Testing Grounds! A newly submitted wildlife camera model has high error rates during twilight hours. You must inspect its training dataset, spot the representation bias, inject balanced data samples, and bust 3 hallucinated predictions before the camera is deployed into the national park!',
      objective: 'Balance the training distribution across 3 animal classes and catch all 3 hallucinated animal identifications.',
      rules: [
        'Rule 1: Identify the skewed class distribution on the Data Balance Sieve.',
        'Rule 2: Drag 500 nocturnal animal and diverse coat pattern cards into the training pool.',
        'Rule 3: Retrain model and test on the Twilight Wildlife Trail.'
      ],
      choices: [
        'Audit 1: Orange Cats vs Black Panthers &rarr; Inject 1,000 black panther night photos (+120 pts)',
        'Audit 2: Daytime Deer vs Dawn Elk &rarr; Inject 800 fog and dawn lighting samples (+120 pts)',
        'Audit 3: Hallucination Buster: AI labeled a tree stump as a "Grizzly Bear" &rarr; Rebalance texture weights (+140 pts)'
      ],
      progression: [
        'Audit 1: Feline coat color bias eliminated across all lighting angles (+120 pts)',
        'Audit 2: Dawn forest navigation accuracy increased from 52% to 96% (+120 pts)',
        'Audit 3: Tree stump false-positive hallucination resolved (+140 pts)'
      ],
      completion: 'Wildlife model verified 100% fair and robust across all 24-hour cycles! Awarded the AI Fairness Auditor Trophy.',
      badge: 'AI Fairness Auditor ⚖️',
      points: 380
    },
    reflectionSafety: {
      prompt: 'If a school admissions AI was trained on past records where girls were discouraged from taking advanced robotics, what might the AI mistakenly learn, and how must humans intervene?',
      rule: 'Historical Bias Protection: AI learns historical patterns, including past human prejudices. Humans must actively correct historical biases to ensure equal opportunity for all children.',
      discussion: 'Why is human moral judgment essential to ensure machines do not perpetuate past unfairness?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is the "Orange Cat Dilemma" an analogy for in machine learning?',
        opts: [
          'Cats liking orange juice for breakfast',
          'Dataset bias: when an AI is trained on only one narrow category of examples and fails when exposed to real-world diversity',
          'Cats shedding orange fur on computer keyboards',
          'The price of orange paint for robot toys'
        ],
        correct: 1,
        exp: 'The Orange Cat Dilemma illustrates dataset bias: models trained on narrow, homogeneous data fail when encountering novel variations present in the real world.',
        hint: 'What happened when the cat classifier saw a black cat after only training on orange cats?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A student asks a chatbot: "Who won the World Cup in 2045?" The chatbot answers: "The Mars United Rover Club won the 2045 World Cup 3-0 against Jupiter." What error has the chatbot made?',
        opts: [
          'A simple typo',
          'A hallucination: the chatbot cannot know future events and hallucinated a fictional sci-fi answer instead of stating that 2045 is in the future',
          'A correct prediction because computers can see the future',
          'A battery drainage glitch'
        ],
        correct: 1,
        exp: 'The model hallucinated. Instead of recognizing that 2045 has not occurred yet, it generated a statistically plausible but completely fabricated response.',
        hint: 'Has the year 2045 happened yet?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An automated hiring tool used by a technology corporation rejected all job applicants whose resumes contained the word "Women’s" (such as "Captain of Women’s Chess Club"). Why did this happen?',
        opts: [
          'The computer had a broken monitor',
          'The training dataset was trained on 10 years of past resumes where 90% of hired engineers were men, causing the machine learning model to associate male gender markers with success',
          'Chess is not a real game',
          'The printer ran out of black toner'
        ],
        correct: 1,
        exp: 'Historical dataset bias! Because past hiring data was skewed toward men, the machine learned an unfair correlation, penalizing women\'s credentials. This demonstrates why algorithmic auditing is vital.',
        hint: 'What pattern did the algorithm discover in the past 10 years of skewed company records?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'be a smart ai user': {
    title: 'Be a Smart AI User',
    hook: 'A mysterious audio message lands on your phone with the principal\'s voice saying: "School is cancelled tomorrow! Click this link to download free video games!" But wait... the principal never sends voice notes on messaging apps! What should a SMART cyber citizen do?',
    goal: 'Master the S.M.A.R.T. Framework (Stay safe, Make sure, Ask grown-ups, Respect others, Think for yourself), understand deepfakes, and become a responsible Cyber Captain.',
    learnPoints: [
      'Master the 5 habits of the S.M.A.R.T. Framework: Safe, Make sure, Ask, Respect, Think',
      'Learn about Deepfakes (synthesized voice and video) and why you must verify sensational claims with adults',
      'Embrace your role as the Captain of Technology: humans steer, humans decide, and humans protect one another'
    ],
    analogy: 'Using AI is like driving a powerful supersonic sports car: the engine (AI) has unbelievable horsepower and speed, but YOU are the captain behind the steering wheel wearing your seatbelt, obeying the traffic signals, and keeping everyone on the road safe!',
    explanationHtml: `<h3>The Cyber Captain’s Code of Honor</h3>
<p>As you grow up in a world filled with artificial intelligence, smart algorithms, and synthetic media, the most valuable superpower you can possess is <strong>Responsible Digital Citizenship</strong>. You are the captain of your digital journey!</p>
<h4>The S.M.A.R.T. Framework for Every Young Scientist</h4>
<ul>
  <li>🛡️ <strong>S — Stay Safe:</strong> Never type your real name, home address, phone numbers, school name, or passwords into any website or AI tool.</li>
  <li>🔍 <strong>M — Make Sure:</strong> Cross-check important facts in school textbooks or trusted encyclopedias. Never accept surprising claims blindly.</li>
  <li>👨‍👩‍👧 <strong>A — Ask a Grown-Up:</strong> If you see an audio message, video, or link that feels strange, scary, or too good to be true, ask a parent or teacher immediately.</li>
  <li>💛 <strong>R — Respect Others:</strong> Never use AI to tease, trick, generate fake pictures of classmates, or spread rumors. Treat everyone with kindness online.</li>
  <li>🧠 <strong>T — Think for Yourself:</strong> Always try solving problems with your own mind first. Use AI as a helpful telescope, not as a replacement for your brain!</li>
</ul>
<h4>Understanding Deepfakes and Synthetic Media</h4>
<p>Generative AI can now clone voices and animate photos to make it look like someone said something they never actually said (called a <strong>Deepfake</strong>). When you encounter shocking audio or videos online, always use the Traffic Light: <strong>STOP, THINK, and VERIFY with trusted adults!</strong></p>`,
    step1: {
      title: '1. Recognize Synthetic and Deepfake Clues',
      desc: 'Look for unnatural blinking, metallic voice artifacts, and sensational claims.',
      detail: 'Sensational claims designed to cause panic or promise free gifts are major red flags.',
      code: '# Deepfake & Phishing Sieve\nif message.is_sensational() and message.requests_link_click():\n    alert_parent_and_verify()'
    },
    step2: {
      title: '2. Deploy the S.M.A.R.T. Protocol',
      desc: 'Filter every online interaction through the five ethical principles.',
      detail: 'Protects personal privacy, prevents cyberbullying, and champions truth.',
      code: 'for habit in ["Safe", "Make_Sure", "Ask_Adult", "Respect", "Think"]:\n    apply_habit(habit)'
    },
    step3: {
      title: '3. Lead as a Conscious Digital Citizen',
      desc: 'Use technology to solve real community problems and empower peers with kindness.',
      detail: 'Stand up against cyberbullying and share educational discoveries generously.',
      code: 'cyber_captain.pledge("I use technology with honesty, kindness, and courage 🌟")'
    },
    realScenario: 'During exam week, an anonymous social media post circulated a voice recording that sounded like the math teacher saying: \'Exam cancelled due to flood!\' Most students cheered, but 10-year-old Rohan remembered the SMART rules: \'Ask a Grown-Up!\' He showed the clip to his father, who called the school office. The principal confirmed the recording was a fake computer clone. Thanks to Rohan, students revised and aced their exam!',
    useCases: [
      'Families setting up a secret "Family Safe Word" to verify emergency phone calls against AI voice scams',
      'Schools implementing digital honor codes where students celebrate original creative writing',
      'Community centers teaching senior citizens how to spot AI phishing calls and protect bank savings'
    ],
    simCode: 'smart_habits = {\n    "S": "Stay Safe (Lock private data) 🔒",\n    "M": "Make Sure (Verify facts in books) 📚",\n    "A": "Ask a Grown-Up (When in doubt, consult parents) 👨‍👩‍👧",\n    "R": "Respect Others (Kindness in every message) 💛",\n    "T": "Think for Yourself (Train your own brain) 🧠"\n}\nfor letter, rule in smart_habits.items():\n    print(f"[{letter}] -> {rule}")',
    simOutput: '[S] -> Stay Safe (Lock private data) 🔒\n[M] -> Make Sure (Verify facts in books) 📚\n[A] -> Ask a Grown-Up (When in doubt, consult parents) 👨‍👩‍👧\n[R] -> Respect Others (Kindness in every message) 💛\n[T] -> Think for Yourself (Train your own brain) 🧠',
    pairs: [
      { id: 'p1', term: 'Deepfake', definition: 'Synthetic media (video or audio) generated by AI to convincingly imitate a real person\'s face or voice' },
      { id: 'p2', term: 'S.M.A.R.T. Framework', definition: 'The 5 essential habits of responsible AI computing: Safe, Make sure, Ask, Respect, Think' },
      { id: 'p3', term: 'Digital Citizen', definition: 'A responsible member of the online community who uses technology safely, honestly, and kindly' }
    ],
    practice: {
      q: 'You receive a video online that shows a famous scientist saying something completely absurd and claiming the Earth is flat. What is the smartest action to take?',
      opts: [
        'Share the video immediately with 50 classmates to be the first to spread the news',
        'Use the SMART framework: Stop, do not share, check verified science books, and show the video to your science teacher to investigate whether it is an AI deepfake',
        'Assume the scientist has lost their mind and believe the Earth is flat',
        'Throw your phone in the trash'
      ],
      correct: 1,
      exp: 'Responsible digital citizens do not spread unverified sensational media. Applying the SMART framework means pausing, checking reliable sources, and asking teachers.',
      hint: 'Remember the SMART rule: Make sure, and Ask a grown-up!'
    },
    quizzes: [
      {
        q: 'What does the letter "R" stand for in the S.M.A.R.T. AI Framework?',
        opts: [
          { text: 'Run as fast as possible', isCorrect: false },
          { text: 'Respect others — never use AI to tease, trick, bully, or hurt anyone', isCorrect: true },
          { text: 'Restart the computer every hour', isCorrect: false },
          { text: 'Record secret videos of people', isCorrect: false }
        ],
        exp: 'R stands for Respect Others: using technology with empathy, dignity, and kindness, while rejecting cyberbullying and deceptive tricks.',
        hint: 'Which option represents digital kindness and empathy toward peers?'
      },
      {
        q: 'In the team of human and technology, who is always the "Captain" responsible for decisions?',
        opts: [
          { text: 'The human person, because humans possess moral responsibility, empathy, and ethical agency', isCorrect: true },
          { text: 'The computer graphics card', isCorrect: false },
          { text: 'The WiFi router', isCorrect: false },
          { text: 'The algorithm code', isCorrect: false }
        ],
        exp: 'Humans are always the captains. Machines are tools. Humans bear ethical, legal, and moral responsibility for how technology is directed.'
      }
    ],
    practicalTask: {
      title: 'Design and Sign the "Junior Cyber Captain Pledge"',
      objective: 'Author a personal Cyber Captain Charter and sign it alongside your parent or teacher.',
      steps: [
        'Draw a large golden captain’s shield on a clean page in your notebook.',
        'Write out the 5 S.M.A.R.T. Rules clearly in decorative lettering.',
        'At the bottom, write your personal commitment: "I, [Your Name], pledge to use Artificial Intelligence as a force for good, to guard privacy, to verify truth, and to treat all people with kindness."',
        'Have a parent or teacher co-sign your charter as Official Witness.',
        'Display your pledge proudly on your study desk!'
      ],
      expectedResult: 'You will establish a conscious, enduring ethical commitment to responsible digital computing.'
    },
    recall: {
      q: 'What does S.M.A.R.T. stand for when using AI?',
      a: 'Stay safe, Make sure, Ask a grown-up, Respect others, and Think for yourself!'
    },
    takeaways: [
      'The S.M.A.R.T. framework provides 5 daily habits for safe, ethical digital citizenship.',
      'Be alert to synthetic deepfakes: sensational audio and video claims must always be verified.',
      'You are the Captain of your technology—use your mind and heart to make the world a better place.'
    ],
    gameMechanic: {
      title: 'Cyber Captain: S.M.A.R.T. Shield Simulator',
      scenario: 'You are Commander of the Cyber Safety Patrol! 4 digital dilemma scenarios have arrived at the Mission Control screen: an emergency deepfake voice note, an app demanding personal phone numbers, an unkind AI caricature meme, and a shortcut homework cheat. You must apply the S.M.A.R.T. traffic light to navigate each dilemma safely!',
      objective: 'Resolve all 4 cyber dilemmas using the S.M.A.R.T. rules to earn the Certified Cyber Captain Laurels.',
      rules: [
        'Dilemma 1 (Voice Scam): Activate [A — Ask a Grown-Up] + Family Safe Word Verification.',
        'Dilemma 2 (App PII Request): Activate [S — Stay Safe] + Block contact permissions.',
        'Dilemma 3 (Unkind Meme): Activate [R — Respect Others] + Refuse to share and support classmate.',
        'Dilemma 4 (Homework Shortcut): Activate [T — Think for Yourself] + Use Socratic hints only.'
      ],
      choices: [
        'Dilemma 1: Verify Voice Clone with Teacher/Parents (+120 pts)',
        'Dilemma 2: Shield PII from shady gaming app (+120 pts)',
        'Dilemma 3: Stand up for peer against cyberbullying (+130 pts)',
        'Dilemma 4: Choose active brain thinking over passive copying (+130 pts)'
      ],
      progression: [
        'Mission 1: Deepfake phone scam caught and reported to family (+120 pts)',
        'Mission 2: Private contact data protected behind titanium firewall (+120 pts)',
        'Mission 3: Cyber kindness upheld; peer supported with empathy (+130 pts)',
        'Mission 4: Homework completed with authentic student brainpower (+130 pts)'
      ],
      completion: 'All 4 cyber dilemmas resolved with 100% honor score! Awarded the Certified Cyber Captain Golden Shield.',
      badge: 'Certified Cyber Captain 🛡️',
      points: 500
    },
    reflectionSafety: {
      prompt: 'What kind of digital world do YOU want to build for yourself and your friends as you grow up?',
      rule: 'The Golden Digital Rule: Use technology to create, to heal, to discover, and to connect. Never use technology to deceive, exploit, or hurt another living being.',
      discussion: 'How can small acts of digital kindness make the internet a safer, happier place for all children?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is a "deepfake"?',
        opts: [
          'A deep hole dug in the ground by a construction digger',
          'Synthetic audio, photo, or video generated by AI that convincingly impersonates a real person saying or doing something they never did',
          'A computer that has fallen into swimming pool water',
          'A type of encrypted password'
        ],
        correct: 1,
        exp: 'Deepfakes use generative neural networks to manipulate or create realistic synthetic depictions of individuals, making verification essential.',
        hint: 'Which option describes artificial audio or video that mimics a real person?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Sanya sees a meme online that uses an AI filter to make a classmate look ridiculous, and other students are laughing and forwarding it. According to the S.M.A.R.T. framework, what is the ethical response?',
        opts: [
          'Forward it to 10 more friends so everyone sees it',
          'Follow the "R — Respect Others" habit: do not share or laugh at the hurtful meme, ask peers to stop, and offer friendly support to the classmate',
          'Make an even meaner meme in response',
          'Save the meme on your computer desktop'
        ],
        correct: 1,
        exp: 'Respecting others is the core of ethical citizenship: refusing to amplify hurtful content, standing up against bullying, and treating peers with kindness.',
        hint: 'What does digital kindness require when someone is being teased online?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI company creates a smart companion robot for children. Which design principle demonstrates true responsible AI leadership?',
        opts: [
          'Programming the robot to secretly record audio in the child\'s bedroom and sell product ads to toy companies',
          'Building on-device local processing, zero storage of biometric PII, clear parental controls, transparent privacy policies, and encouraging real-world family interaction',
          'Encouraging children to talk to the robot instead of making human friends',
          'Hiding the power switch so the robot can never be turned off'
        ],
        correct: 1,
        exp: 'Responsible AI prioritizes child safety, on-device privacy protection, transparent parental oversight, and healthy real-world human relationships.',
        hint: 'Which option puts child safety, family transparency, and privacy first?',
        difficulty: 'Olympiad Championship'
      }
    ]
  }
}
