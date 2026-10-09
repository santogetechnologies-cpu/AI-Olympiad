// ─────────────────────────────────────────────────────────────────────────────
// HIGHER EDUCATION TOPIC PROFILES (UG 1st Year to PG Final Year)
// Spanning all 72 distinct Higher Education topics across 6 academic levels
// Written in simple, clear, crystal-understandable English:
// What is it? -> Simple Meaning -> Example -> How it works -> Key Points
// Deep technical concepts explained easily with ZERO heavy academic jargon
// ─────────────────────────────────────────────────────────────────────────────

import type { TopicProfile } from './curriculumTopicRegistry'

export const HIGHER_TOPIC_PROFILES: Record<string, TopicProfile> = {
  // ===========================================================================
  // UG 1st YEAR (12 Topics)
  // ===========================================================================
  'AI Demystified': {
    title: 'AI Demystified',
    hook: 'What is artificial intelligence really doing inside the computer?',
    goal: 'Understand the simple truth of how AI uses patterns and math instead of magic to solve problems.',
    learnPoints: [
      'What AI is: A computer program that learns from examples instead of needing manual rules for every single action.',
      'How it learns: By testing predictions, measuring mistakes, and tweaking its numbers to get more accurate.',
      'Where it helps: In voice recognition, medical scanning, translation, and automated engineering calculations.'
    ],
    analogy: 'Like an apprentice chef who tastes 1,000 soup recipes and learns exactly how much salt makes the soup delicious without needing a strict rulebook every time.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is AI Demystified?</h3>
        <p class="text-xs leading-relaxed">
          Artificial Intelligence is not magic or human thinking. It is a smart computer program that finds patterns in large amounts of data and uses those patterns to answer questions and make predictions.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 space-y-1 text-xs">
          <p><strong>Simple Meaning:</strong> Instead of writing thousands of lines of manual IF-ELSE rules, we show the computer thousands of examples and let it learn the best way to solve the task.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Take in Data',
      desc: 'Feed examples like numbers, words, or images into the system.',
      detail: 'The computer turns real-world inputs into numbers it can calculate with.',
      code: 'inputs = [0.2, 0.8, 0.5]'
    },
    step2: {
      title: '2. Spot the Pattern',
      desc: 'The model multiplies inputs by internal weights to calculate an answer.',
      detail: 'It compares its output with the correct answer and measures any mistake.',
      code: 'prediction = model.predict(inputs)'
    },
    step3: {
      title: '3. Improve Accuracy',
      desc: 'The model adjusts its internal weights so its next guess is even better.',
      detail: 'Repeated over thousands of cycles, the model becomes fast and reliable.',
      code: 'model.learn_from_mistake(error)'
    },
    realScenario: 'Engineering teams use AI to spot micro-cracks in bridge structures by analyzing camera photos in seconds.',
    useCases: [
      'Automated quality inspection in manufacturing lines.',
      'Smart energy grid monitoring to prevent blackouts.',
      'Language translation tools helping international teams communicate.'
    ],
    simCode: `# Simple AI Prediction Demonstration
def simple_ai_predictor(temperature, humidity):
    # Combines data signals with learned weights
    rain_score = (temperature * 0.3) + (humidity * 0.7)
    return "Rain Expected" if rain_score > 60 else "Clear Skies"

print("AI Prediction:", simple_ai_predictor(28, 85))`,
    simOutput: 'AI Prediction: Rain Expected',
    pairs: [
      { id: 'p1', term: 'Pattern Learning', definition: 'Finding repeated clues in past examples to predict future outcomes.' },
      { id: 'p2', term: 'Training', definition: 'Practicing on sample data so the AI gets more accurate over time.' },
      { id: 'p3', term: 'Inference', definition: 'Using the trained AI model to solve new, real-world problems.' }
    ],
    practice: {
      question: 'What is the main way modern AI learns to recognize objects in photos?',
      options: [
        'By reviewing thousands of labeled photo examples and adjusting internal numbers to minimize mistakes.',
        'By having a human manually type every possible pixel location.',
        'By guessing randomly every single time.',
        'By connecting directly to a human brain.'
      ],
      correctIndex: 0,
      explanation: 'AI learns by seeing thousands of examples and continuously adjusting its internal parameters to get more accurate.',
      hint: 'Think about learning from repeated examples.'
    },
    quizzes: [
      {
        question: 'What makes AI different from a traditional calculator?',
        options: [
          { text: 'AI can learn patterns from data and generalize to new examples, while a calculator only follows fixed formulas.', isCorrect: true },
          { text: 'A calculator uses electricity, but AI does not.', isCorrect: false },
          { text: 'AI can only add numbers up to 10.', isCorrect: false },
          { text: 'There is no difference between them.', isCorrect: false }
        ],
        explanation: 'AI adapts its internal parameters from data to make predictions on new situations.'
      }
    ],
    practicalTask: {
      title: 'Build a Simple Pattern Predictor',
      objective: 'Write a clean Python function that calculates a risk score based on three input metrics.',
      steps: [
        'Define input weights for speed, distance, and road condition.',
        'Compute weighted sum score.',
        'Output a clean safety recommendation.'
      ],
      expectedResult: 'Function outputs accurate safety recommendations for test inputs.'
    },
    recall: {
      question: 'In simple terms, how does AI make a decision?',
      answer: 'By comparing new data against patterns it learned from thousands of past training examples.'
    },
    takeaways: [
      'AI is grounded in pattern recognition, math, and data.',
      'Learning from examples is faster and more flexible than hardcoding every single rule.',
      'Testing on unseen data proves whether the AI has truly learned.'
    ]
  },

  'The Intelligence Behind Machines': {
    title: 'The Intelligence Behind Machines',
    hook: 'How do computers measure information and reduce uncertainty?',
    goal: 'Learn how smart machines turn noisy data into clear, actionable knowledge.',
    learnPoints: [
      'Information as clarity: How math helps machines measure surprise and remove confusion.',
      'Feature extraction: Turning complex images and sounds into simple numbers.',
      'Decision boundaries: How machines draw clean dividing lines between categories.'
    ],
    analogy: 'Like tuning an old radio dial: at first there is loud static noise (high uncertainty), but as you turn the dial to the exact station, the music becomes crystal clear (pure information).',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is the Intelligence Behind Machines?</h3>
        <p class="text-xs leading-relaxed">
          Machine intelligence is the mathematical process of turning messy real-world data into clear, reliable answers.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> Machines measure how much uncertainty is in data, filter out background noise, and keep only the important clues that solve the problem.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Filter the Noise',
      desc: 'Discard useless background static from the input data.',
      detail: 'Keep only the essential signals and measurements.',
      code: 'clean_signal = remove_background_noise(raw_data)'
    },
    step2: {
      title: '2. Measure Uncertainty',
      desc: 'Calculate how confident the system is in its prediction.',
      detail: 'Lower uncertainty means higher prediction accuracy.',
      code: 'confidence = calculate_probability(clean_signal)'
    },
    step3: {
      title: '3. Choose the Best Outcome',
      desc: 'Pick the outcome with the highest statistical likelihood.',
      detail: 'Output the verified decision to the user.',
      code: 'return best_prediction'
    },
    realScenario: 'Radio telescopes filter out cosmic background noise to detect clean, faint radio signals from distant planets.',
    useCases: [
      'Noise-cancelling headphones filtering street sounds from music.',
      'Spam filters separating genuine letters from junk mail.',
      'Weather models isolating storm patterns from daily wind variance.'
    ],
    simCode: `# Measuring Information Clarity
import numpy as np

def calculate_clarity(probabilities):
    # Clean probability measure
    return np.max(probabilities)

probs = [0.88, 0.08, 0.04]
print("Top Prediction Confidence:", f"{calculate_clarity(probs) * 100:.1f}%")`,
    simOutput: 'Top Prediction Confidence: 88.0%',
    pairs: [
      { id: 'p1', term: 'Signal', definition: 'The meaningful, useful part of data that carries the answer.' },
      { id: 'p2', term: 'Noise', definition: 'Random, unwanted background variation that can confuse predictions.' },
      { id: 'p3', term: 'Confidence', definition: 'The statistical certainty of an AI prediction between 0% and 100%.' }
    ],
    practice: {
      question: 'When an AI system filters noise from audio data, what is it trying to achieve?',
      options: [
        'To isolate the clear voice signal so speech recognition can understand the words accurately.',
        'To make the computer louder.',
        'To delete all files on the hard drive.',
        'To slow down the internet speed.'
      ],
      correctIndex: 0,
      explanation: 'Filtering noise isolates the true signal, increasing speech recognition accuracy.',
      hint: 'Think about isolating clean speech from background noise.'
    },
    quizzes: [
      {
        question: 'What does a high confidence score (e.g. 98%) mean for an AI prediction?',
        options: [
          { text: 'The model has strong, clear evidence matching its learned patterns.', isCorrect: true },
          { text: 'The computer is running out of battery.', isCorrect: false },
          { text: 'The prediction is guaranteed to be random.', isCorrect: false },
          { text: 'The program has stopped working.', isCorrect: false }
        ],
        explanation: 'High confidence indicates strong mathematical alignment between the input features and the learned model weights.'
      }
    ],
    practicalTask: {
      title: 'Calculate Confidence Score for Sample Classifications',
      objective: 'Write a small script that takes prediction probabilities and outputs the top prediction with its confidence level.',
      steps: [
        'Define a list of class labels and probabilities.',
        'Find the index of the maximum probability.',
        'Print formatted classification summary.'
      ],
      expectedResult: 'Script outputs the most probable label and confidence percentage cleanly.'
    },
    recall: {
      question: 'What is the difference between signal and noise in computing?',
      answer: 'Signal is the valuable information we want; noise is the unwanted background clutter.'
    },
    takeaways: [
      'Machine intelligence relies on measuring and reducing uncertainty.',
      'Filtering noise helps computers focus on the key features of the problem.',
      'Confidence scores give engineers visibility into how reliable a prediction is.'
    ]
  },

  'Python + AI Starter': {
    title: 'Python + AI Starter',
    hook: 'Why is Python the world standard language for AI development?',
    goal: 'Learn how simple Python code loads datasets, runs smart models, and outputs predictions.',
    learnPoints: [
      'Simple syntax: Why Python reads like plain English and makes AI coding approachable.',
      'Libraries: How pre-built tools like NumPy and PyTorch save thousands of hours.',
      'Running your first model: Writing 5 lines of code to classify data.'
    ],
    analogy: 'Like using LEGO building blocks: instead of carving every brick out of raw plastic, you snap together powerful pre-built pieces to build a spaceship in minutes.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is Python + AI Starter?</h3>
        <p class="text-xs leading-relaxed">
          Python is the most popular programming language in the world for AI because its code is clean, simple to read, and supported by powerful AI libraries.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> Python allows engineers to build, train, and test smart AI systems with just a few lines of easy-to-understand code.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Import the AI Library',
      desc: 'Load pre-built machine learning tools into your script.',
      detail: 'Libraries provide ready-to-use functions for arrays, matrices, and neural networks.',
      code: 'import torch\nimport numpy as np'
    },
    step2: {
      title: '2. Prepare the Numbers',
      desc: 'Store inputs as clean arrays and matrices.',
      detail: 'Python structures data in organized lists and tables.',
      code: 'data = np.array([[1.0, 2.0], [3.0, 4.0]])'
    },
    step3: {
      title: '3. Run the Prediction',
      desc: 'Call the model function to get the computed result.',
      detail: 'Print the prediction clearly to the console.',
      code: 'print("Result:", model(data))'
    },
    realScenario: 'Data science teams use Python scripts to forecast regional electricity demand and schedule clean solar energy distribution.',
    useCases: [
      'Automated data cleaning and analysis pipelines.',
      'Building predictive machine learning models in healthcare.',
      'Creating interactive web AI applications using Streamlit and FastAPI.'
    ],
    simCode: `# Clean Python AI Starter
data_points = [12, 15, 18, 22, 28]
average_value = sum(data_points) / len(data_points)
print(f"Dataset Points: {data_points}")
print(f"Calculated Mean: {average_value:.1f}")`,
    simOutput: 'Dataset Points: [12, 15, 18, 22, 28]\nCalculated Mean: 19.0',
    pairs: [
      { id: 'p1', term: 'NumPy', definition: 'A Python library designed for fast mathematical calculations and array operations.' },
      { id: 'p2', term: 'PyTorch', definition: 'A popular Python framework used to build and train deep neural networks.' },
      { id: 'p3', term: 'Script', definition: 'A file containing readable Python code instructions executed in order.' }
    ],
    practice: {
      question: 'Why do AI engineers prefer Python over older low-level languages for research?',
      options: [
        'Python has clear, readable syntax and a massive ecosystem of pre-built AI libraries.',
        'Python only works when the computer is disconnected from power.',
        'Python cannot run on modern computers.',
        'Python requires writing 10,000 lines for a simple print statement.'
      ],
      correctIndex: 0,
      explanation: 'Python offers clean syntax and powerful libraries like PyTorch, scikit-learn, and NumPy that accelerate AI development.',
      hint: 'Think about readability and pre-built tools.'
    },
    quizzes: [
      {
        question: 'What is the role of an AI library in Python?',
        options: [
          { text: 'To provide tested, high-performance mathematical functions so developers do not have to code algorithms from scratch.', isCorrect: true },
          { text: 'To change the desktop wallpaper color.', isCorrect: false },
          { text: 'To shut down the computer automatically.', isCorrect: false },
          { text: 'To replace the monitor screen.', isCorrect: false }
        ],
        explanation: 'Libraries contain optimized algorithms and data structures that simplify AI engineering.'
      }
    ],
    practicalTask: {
      title: 'Write a Python Script to Normalize Data',
      objective: 'Create a function that scales a list of numbers between 0 and 1.',
      steps: [
        'Find the minimum and maximum values in the list.',
        'Apply formula: (x - min) / (max - min) to each item.',
        'Return normalized list.'
      ],
      expectedResult: 'List values are transformed cleanly between 0.0 and 1.0.'
    },
    recall: {
      question: 'Name two popular Python libraries used in modern AI engineering.',
      answer: 'NumPy (for matrix math) and PyTorch (for neural network training).'
    },
    takeaways: [
      'Python is the industry standard language for machine learning.',
      'Pre-built libraries let you focus on solving problems rather than reinventing basics.',
      'Clean data structures are the starting point for every machine learning model.'
    ]
  },

  'Prompt with Purpose': {
    title: 'Prompt with Purpose',
    hook: 'How do precise words unlock accurate, reliable answers from language models?',
    goal: 'Master the principles of clear prompt engineering: role, context, task, format, and constraints.',
    learnPoints: [
      'Clear instructions: Why specific context produces much better results than vague questions.',
      'Role definition: Assigning an expert persona (e.g., "Act as a Senior Cloud Architect").',
      'Format specification: Demanding structured outputs like JSON, bullet points, or tables.'
    ],
    analogy: 'Like ordering food at a restaurant: saying "bring me food" gets you a random dish, but saying "bring me one hot bowl of vegetable noodle soup with no peanuts" gets you exactly what you wanted.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is Prompt with Purpose?</h3>
        <p class="text-xs leading-relaxed">
          Prompting with purpose is the skill of giving clear, structured instructions to an AI model so it produces accurate, useful, and properly formatted results.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> When you tell the AI exactly who it is, what task to do, what rules to follow, and what format to use, its answers become much more helpful and reliable.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Set the Role',
      desc: 'Tell the AI what expert hat to wear.',
      detail: 'Example: "You are an expert Python tutor explaining to a beginner."',
      code: 'role = "You are a Senior Data Engineer."'
    },
    step2: {
      title: '2. Define the Task & Rules',
      desc: 'State the exact task and any boundaries or restrictions.',
      detail: 'Example: "Summarize this article in 3 bullet points. Do not exceed 50 words."',
      code: 'task = "Summarize the text in 3 bullet points with no technical jargon."'
    },
    step3: {
      title: '3. Request Structured Format',
      desc: 'Specify the exact output layout needed.',
      detail: 'Example: "Output as a clean JSON object with keys: title, summary, score."',
      code: 'format = "Output format: JSON {title, key_points, action_items}"'
    },
    realScenario: 'Customer support teams write structured prompts to automatically categorize incoming customer tickets into Urgent, Billing, or Technical issues.',
    useCases: [
      'Automated code documentation generation.',
      'Extracting clean structured data from invoices and receipts.',
      'Drafting professional business communications with consistent brand voice.'
    ],
    simCode: `# Structured Prompt Template Generator
def build_structured_prompt(role, task, format_type):
    return f"ROLE: {role}\nTASK: {task}\nFORMAT: {format_type}\nRULE: Keep response concise and factual."

prompt = build_structured_prompt(
    role="Database Architect",
    task="Explain the difference between SQL and NoSQL databases",
    format_type="2-column markdown table"
)
print(prompt)`,
    simOutput: 'ROLE: Database Architect\nTASK: Explain the difference between SQL and NoSQL databases\nFORMAT: 2-column markdown table\nRULE: Keep response concise and factual.',
    pairs: [
      { id: 'p1', term: 'Role Prompting', definition: 'Setting a specific expert persona to guide the tone and depth of the AI response.' },
      { id: 'p2', term: 'Few-Shot Examples', definition: 'Providing 2-3 sample input/output pairs inside the prompt to demonstrate the desired format.' },
      { id: 'p3', term: 'Output Constraint', definition: 'Explicit rules like word limits or JSON schemas that restrict the response format.' }
    ],
    practice: {
      question: 'Which of the following prompts will produce the most reliable and useful response from an AI?',
      options: [
        '"Act as a cybersecurity analyst. Review this login script for SQL injection risks. Provide 3 specific fixes in numbered bullet points."',
        '"Fix my code now."',
        '"Tell me about computers."',
        '"Write something cool about technology."'
      ],
      correctIndex: 0,
      explanation: 'Prompt 1 specifies a clear role, exact task, target risk, and structured output format.',
      hint: 'Look for the prompt with clear role, task, and formatting guidelines.'
    },
    quizzes: [
      {
        question: 'Why is specifying an output format (like JSON or Markdown table) helpful when integrating AI with other software?',
        options: [
          { text: 'It makes the AI output predictable and easy for downstream code to parse automatically.', isCorrect: true },
          { text: 'It makes the computer run out of memory.', isCorrect: false },
          { text: 'It deletes the prompt text.', isCorrect: false },
          { text: 'It forces the AI to turn off.', isCorrect: false }
        ],
        explanation: 'Structured formats like JSON allow other software systems to parse and consume AI outputs reliably.'
      }
    ],
    practicalTask: {
      title: 'Design a 4-Part Structured Prompt Template',
      objective: 'Write a template containing Role, Context, Task, and Output Format for a technical code review task.',
      steps: [
        'Define Role: Senior Security Auditor.',
        'Define Context: A web application accepting user input.',
        'Define Task: Identify any unescaped inputs.',
        'Define Format: JSON object containing vulnerability list.'
      ],
      expectedResult: 'Complete, structured prompt template ready for production LLM API calls.'
    },
    recall: {
      question: 'What are the 4 key components of a well-engineered prompt?',
      answer: 'Role, Context, Task, and Output Format (with constraints).'
    },
    takeaways: [
      'Specific, structured prompts yield significantly more accurate outputs.',
      'Setting roles and constraints prevents vague or off-topic responses.',
      'Requesting structured formats like JSON enables clean software integration.'
    ]
  },

  'AI in the Real World': {
    title: 'AI in the Real World',
    hook: 'Where is artificial intelligence solving critical challenges today?',
    goal: 'Explore practical enterprise and civic AI deployments across healthcare, transit, finance, and logistics.',
    learnPoints: [
      'Healthcare: Assisting doctors in detecting medical anomalies in X-rays and MRI scans.',
      'Transit: Optimizing urban traffic lights and navigating autonomous delivery rovers.',
      'Logistics: Predicting warehouse inventory needs and optimizing global shipping routes.'
    ],
    analogy: 'Like an air traffic control radar screen that tracks 500 airplanes simultaneously, warning pilots of weather storms hours before they arrive.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is AI in the Real World?</h3>
        <p class="text-xs leading-relaxed">
          AI in the real world refers to production applications where machine learning models work alongside humans to improve safety, speed, and accuracy in daily operations.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> Smart computer tools that help doctors spot illnesses earlier, help pilots fly safely, and help businesses deliver goods on time.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Collect Real-Time Data',
      desc: 'Sensors, cameras, and logs feed current data into the system.',
      detail: 'Data is cleaned and formatted in milliseconds.',
      code: 'live_data = sensor_stream.read_latest()'
    },
    step2: {
      title: '2. Run AI Model',
      desc: 'The trained model evaluates the current situation.',
      detail: 'It checks for anomalies, patterns, or optimization opportunities.',
      code: 'status = model.evaluate(live_data)'
    },
    step3: {
      title: '3. Execute Helpful Action',
      desc: 'Alert human operators or adjust automated settings.',
      detail: 'Improves safety and operational efficiency in real time.',
      code: 'dispatch_action(status)'
    },
    realScenario: 'Modern hospitals use AI triage assistants to scan 1,000 emergency room chest X-rays an hour, immediately flagging critical cases for urgent doctor review.',
    useCases: [
      'Early detection of diabetic retinopathy from retinal eye scans.',
      'Predictive maintenance in passenger airplanes before mechanical wear occurs.',
      'Smart grid energy balancing that routes clean solar power during peak hours.'
    ],
    simCode: `# Real-World Hospital Triage Simulation
patient_scans = [
    {"patient_id": 101, "lesion_detected": False, "urgency": "Normal"},
    {"patient_id": 102, "lesion_detected": True, "urgency": "CRITICAL_ALERT"},
    {"patient_id": 103, "lesion_detected": False, "urgency": "Normal"}
]

for scan in patient_scans:
    if scan["lesion_detected"]:
        print(f"Priority Alert: Patient {scan['patient_id']} flagged for immediate specialist review.")`,
    simOutput: 'Priority Alert: Patient 102 flagged for immediate specialist review.',
    pairs: [
      { id: 'p1', term: 'Predictive Maintenance', definition: 'Using sensor data to repair machines before they break down.' },
      { id: 'p2', term: 'Clinical Decision Support', definition: 'AI tools that assist healthcare professionals in diagnosing and treating patients.' },
      { id: 'p3', term: 'Edge AI', definition: 'Running AI models directly on local devices like drones and cameras without internet lag.' }
    ],
    practice: {
      question: 'How does AI predictive maintenance save money for airlines and transport companies?',
      options: [
        'By analyzing vibration sensors to detect engine part wear early, preventing expensive breakdowns and delays.',
        'By making the airplane fly without wings.',
        'By turning off the aircraft radio.',
        'By painting the airplane a different color.'
      ],
      correctIndex: 0,
      explanation: 'Predictive maintenance detects wear early through vibration and temperature telemetry, avoiding catastrophic failure.',
      hint: 'Think about detecting wear before machines fail.'
    },
    quizzes: [
      {
        question: 'What is the primary role of AI in medical imaging?',
        options: [
          { text: 'To act as a second pair of eyes that assists doctors by rapidly highlighting potential areas of concern.', isCorrect: true },
          { text: 'To replace all human doctors entirely.', isCorrect: false },
          { text: 'To print physical film paper only.', isCorrect: false },
          { text: 'To delete patient records.', isCorrect: false }
        ],
        explanation: 'AI assists medical professionals by highlighting anomalies, improving diagnostic speed and reducing missed findings.'
      }
    ],
    practicalTask: {
      title: 'Simulate a Smart Traffic Signal Optimizer',
      objective: 'Write a logic rule that switches traffic lights green when vehicle count on a lane exceeds a threshold.',
      steps: [
        'Read vehicle count from North, South, East, West lanes.',
        'Identify lane with maximum waiting vehicles.',
        'Output green signal duration proportional to vehicle density.'
      ],
      expectedResult: 'System allocates green light time dynamically to reduce average waiting time.'
    },
    recall: {
      question: 'Give two examples of AI working in real-world infrastructure.',
      answer: 'Smart traffic light grid optimization and hospital medical scan triage.'
    },
    takeaways: [
      'Real-world AI focuses on enhancing human capabilities and safety.',
      'Industries from healthcare to aviation rely on predictive AI models.',
      'Real-time data feeds allow AI to react and assist in critical situations.'
    ]
  },

  'The Age of AI Agents': {
    title: 'The Age of AI Agents',
    hook: 'How do autonomous AI agents plan, use tools, and solve multi-step tasks on their own?',
    goal: 'Understand the architecture of AI agents: perception, memory, goal planning, tool execution, and reflection.',
    learnPoints: [
      'From chatbot to agent: Chatbots only write text, but agents can browse files, run code, and complete goals.',
      'Planning loops: How an agent breaks a big task into smaller step-by-step actions.',
      'Tools and APIs: Connecting AI to databases, web search, and terminal commands.'
    ],
    analogy: 'A chatbot is like a travel advisor who gives you a list of hotels; an AI Agent is like a personal travel assistant that searches prices, checks your calendar, books the room, and emails you the confirmed ticket.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What is The Age of AI Agents?</h3>
        <p class="text-xs leading-relaxed">
          An AI Agent is an autonomous software system that can make plans, use digital tools, and complete multi-step goals without needing human guidance at every click.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> Instead of just answering questions, an AI agent takes actions: it can search files, run code, fix bugs, and verify its own work until the mission is accomplished.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Understand the Goal',
      desc: 'The agent receives a goal and breaks it down into clear steps.',
      detail: 'It creates an internal plan with checkpoints and safety boundaries.',
      code: 'plan = agent.decompose_goal("Generate monthly sales report")'
    },
    step2: {
      title: '2. Execute Tools',
      desc: 'The agent calls APIs, queries databases, or writes files.',
      detail: 'It observes the output of each tool call before deciding what to do next.',
      code: 'tool_output = agent.call_tool("query_database", params)'
    },
    step3: {
      title: '3. Reflect and Complete',
      desc: 'The agent checks if the goal was achieved and reports back.',
      detail: 'If an error occurs, it fixes its plan and retries automatically.',
      code: 'if agent.is_goal_met(): return summary_report'
    },
    realScenario: 'Software engineering agents inspect bug reports on GitHub, find the broken lines in the codebase, write a unit test, fix the code, and submit a pull request automatically.',
    useCases: [
      'Autonomous customer support agents that look up order details and process refunds.',
      'Research agents that summarize 50 papers and compile a bibliography.',
      'DevOps agents that monitor server errors and restart failing pods.'
    ],
    simCode: `# Autonomous Agent Execution Loop
class SimpleAgent:
    def __init__(self, name):
        self.name = name
        
    def solve_task(self, goal):
        print(f"[{self.name}] Goal Received: {goal}")
        print(f"[{self.name}] Step 1: Querying database for records...")
        data = {"users": 1500, "active": 1420}
        print(f"[{self.name}] Step 2: Calculating active engagement: {data['active']/data['users']*100:.1f}%")
        print(f"[{self.name}] Step 3: Generating PDF report.")
        return "Task Completed Successfully"

agent = SimpleAgent("AnalyticsBot")
result = agent.solve_task("Audit weekly user activity")`,
    simOutput: '[AnalyticsBot] Goal Received: Audit weekly user activity\n[AnalyticsBot] Step 1: Querying database for records...\n[AnalyticsBot] Step 2: Calculating active engagement: 94.7%\n[AnalyticsBot] Step 3: Generating PDF report.',
    pairs: [
      { id: 'p1', term: 'Autonomous Agent', definition: 'An AI system that plans and executes multi-step tool actions to achieve a goal.' },
      { id: 'p2', term: 'Tool Use / MCP', definition: 'The ability of an AI model to call external functions like databases, search engines, and terminals.' },
      { id: 'p3', term: 'Reflection', definition: 'When an agent evaluates its own output and corrects mistakes before completing the task.' }
    ],
    practice: {
      question: 'What is the main difference between a basic language model and an autonomous AI agent?',
      options: [
        'An agent can plan steps, call external tools (like databases and APIs), and verify its own results to achieve a goal.',
        'An agent only works on calculators.',
        'A basic language model has physical arms and legs.',
        'There is no difference between them.'
      ],
      correctIndex: 0,
      explanation: 'Agents combine reasoning with the ability to plan, use tools, and take multi-step actions in external environments.',
      hint: 'Think about planning and executing tools in addition to text generation.'
    },
    quizzes: [
      {
        question: 'What happens in an agent reflection loop when a tool returns an error code?',
        options: [
          { text: 'The agent inspects the error message, adjusts its plan, and tries an alternative method to complete the task.', isCorrect: true },
          { text: 'The computer catches fire.', isCorrect: false },
          { text: 'The agent permanently deletes the internet.', isCorrect: false },
          { text: 'The agent shuts down forever.', isCorrect: false }
        ],
        explanation: 'Reflection allows agents to recover from unexpected errors and adapt their strategy dynamically.'
      }
    ],
    practicalTask: {
      title: 'Design an Agent Tool Workflow',
      objective: 'Map out the sequence of 3 tools an AI agent should call to book a meeting for two busy executives.',
      steps: [
        'Tool 1: Read calendar availability for both attendees.',
        'Tool 2: Find common free time slot.',
        'Tool 3: Send calendar invite and confirmation email.'
      ],
      expectedResult: 'Clean, logical 3-step tool sequence with error checks.'
    },
    recall: {
      question: 'What are the 3 key phases of an autonomous agent execution loop?',
      answer: 'Plan, Act (call tools), and Reflect (verify result).'
    },
    takeaways: [
      'Agents represent the shift from passive text generation to active problem-solving.',
      'Connecting models to tools and memory enables real-world workflow automation.',
      'Reflection and error recovery make agent workflows robust and dependable.'
    ]
  },

  'Frontiers of AI': {
    title: 'Frontiers of AI',
    hook: 'What breakthroughs are pushing the boundaries of artificial intelligence today?',
    goal: 'Explore frontier AI research: multimodal models, reasoning models, foundation architectures, and scaling laws.',
    learnPoints: [
      'Multimodal models: AI that processes text, voice, video, and code in a single unified system.',
      'Reasoning models: Systems that think step-by-step before answering complex math and logic challenges.',
      'Scaling laws: How compute, model size, and clean data drive steady improvements in intelligence.'
    ],
    analogy: 'Like going from a simple pocket flashlight to the James Webb Space Telescope: every generation of engineering lets us see deeper and discover new capabilities we could never see before.',
    explanationHtml: `
      <div class="space-y-4 text-slate-800">
        <h3 class="text-sm font-bold text-indigo-900">What are the Frontiers of AI?</h3>
        <p class="text-xs leading-relaxed">
          The frontiers of AI represent the latest breakthroughs in machine learning, where new architectures and training methods allow AI to reason, see, hear, and solve complex scientific problems.
        </p>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
          <p><strong>Simple Meaning:</strong> The newest and most advanced AI systems that can solve difficult math proofs, design new medicine molecules, and understand images, audio, and code together seamlessly.</p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Unify Modalities',
      desc: 'Process text, images, video, and audio through a shared neural network.',
      detail: 'Information from different senses is mapped into the same mathematical space.',
      code: 'tokens = tokenizer.encode(image, audio, text)'
    },
    step2: {
      title: '2. Enable Deep Reasoning',
      desc: 'Allow the model to generate internal thoughts before giving a final answer.',
      detail: 'Chain-of-thought processing significantly improves accuracy on complex tasks.',
      code: 'thoughts = model.reason_step_by_step(problem)'
    },
    step3: {
      title: '3. Scale Responsibly',
      desc: 'Test safety boundaries, verify alignment, and deploy with safeguards.',
      detail: 'Ensures advanced models remain helpful, honest, and harmless.',
      code: 'safety_check = verify_alignment(response)'
    },
    realScenario: 'Biologists use frontier AI models like AlphaFold to predict the 3D structures of 200 million proteins, accelerating cancer and vaccine research by decades.',
    useCases: [
      'Scientific discovery in quantum materials and clean fusion energy.',
      'Unified multimodal assistants that assist visually impaired users in navigating cities.',
      'Automated formal mathematical theorem verification.'
    ],
    simCode: `# Frontier Multimodal Token Processing Concept
modalities = ["Text Query", "Camera Frame", "Microphone Audio"]
unified_embedding_dim = 1024

print("Frontier Multimodal Pipeline:")
for m in modalities:
    print(f" - Mapped '{m}' -> {unified_embedding_dim}-dimensional vector representation")
print("Status: All sensory streams unified in shared latent space.")`,
    simOutput: 'Frontier Multimodal Pipeline:\n - Mapped \'Text Query\' -> 1024-dimensional vector representation\n - Mapped \'Camera Frame\' -> 1024-dimensional vector representation\n - Mapped \'Microphone Audio\' -> 1024-dimensional vector representation\nStatus: All sensory streams unified in shared latent space.',
    pairs: [
      { id: 'p1', term: 'Multimodal AI', definition: 'A single AI model that can understand and generate text, images, voice, and video.' },
      { id: 'p2', term: 'Chain-of-Thought', definition: 'A reasoning method where the AI breaks complex logic into intermediate steps before answering.' },
      { id: 'p3', term: 'Scaling Law', definition: 'The observed mathematical relationship where increasing compute and data predictably increases model intelligence.' }
    ],
    practice: {
      question: 'How do frontier reasoning models solve difficult mathematical problems more accurately than older models?',
      options: [
        'By thinking through step-by-step intermediate reasoning paths before producing the final answer.',
        'By answering in less than one nanosecond without checking.',
        'By turning off the calculation unit.',
        'By printing random numbers.'
      ],
      correctIndex: 0,
      explanation: 'Reasoning models allocate extra compute at inference time to generate intermediate steps, verifying logic before outputting the final result.',
      hint: 'Think about step-by-step reasoning before answering.'
    },
    quizzes: [
      {
        question: 'What is a key benefit of multimodal foundation models over separate single-task models?',
        options: [
          { text: 'They can combine visual, auditory, and textual context simultaneously to understand complex real-world situations.', isCorrect: true },
          { text: 'They only work on black-and-white monitors.', isCorrect: false },
          { text: 'They cannot process words.', isCorrect: false },
          { text: 'They require no computer memory.', isCorrect: false }
        ],
        explanation: 'Multimodal models integrate context across modalities, enabling richer understanding of the physical world.'
      }
    ],
    practicalTask: {
      title: 'Analyze Chain-of-Thought Reasoning Steps',
      objective: 'Break down a multi-step logic problem into distinct intermediate reasoning steps.',
      steps: [
        'Identify given variables and goal.',
        'Write out Step 1 calculation explicitly.',
        'Write out Step 2 verification.',
        'State final concluded answer.'
      ],
      expectedResult: 'Clear, verifiable step-by-step reasoning chain with no skipped logic.'
    },
    recall: {
      question: 'What does "multimodal AI" mean?',
      answer: 'An AI model capable of understanding and generating multiple data types, such as text, images, and audio.'
    },
    takeaways: [
      'Frontier AI models unify multiple senses into a single architecture.',
      'Inference-time reasoning allows models to solve complex logic and science challenges.',
      'Scientific discovery in biology and energy is being accelerated by frontier models.'
    ]
  }
}
