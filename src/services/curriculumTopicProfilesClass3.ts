// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 3 (12 DISTINCT LESSONS)
// Junior AI & Playful Logic • Ages 8-9
// ─────────────────────────────────────────────────────────────────────────────

export interface TopicProfile {
  title: string
  hook: string
  goal: string
  learnPoints: [string, string, string]
  analogy: string
  explanationHtml: string
  step1: { title: string; desc: string; detail: string; code?: string }
  step2: { title: string; desc: string; detail: string; code?: string }
  step3: { title: string; desc: string; detail: string; code?: string }
  realScenario: string
  useCases: [string, string, string]
  simCode?: string
  simOutput?: string
  pairs: { id: string; term: string; definition: string }[]
  practice: { q: string; opts: string[]; correct: number; exp: string; hint: string }
  quizzes: { q: string; opts: { text: string; isCorrect: boolean }[]; exp: string }[]
  practicalTask: { title: string; objective: string; steps: string[]; expectedResult: string }
  recall: { q: string; a: string }
  takeaways: [string, string, string]
}

export const CLASS3_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'meet my ai friend': {
    title: 'Meet My AI Friend',
    hook: 'Have you ever spoken to a smart speaker like Alexa or Siri and wondered how it understands your words?',
    goal: 'Learn what an AI friend is, how smart voice helpers listen to sound waves, and how they assist us every day.',
    learnPoints: [
      'Discover that an AI friend is computer software designed to listen and assist',
      'Understand how microphones turn sound waves into computer signals',
      'Learn to talk clearly and politely with voice assistants'
    ],
    analogy: 'An AI friend is like a super-fast librarian who has read millions of books and can find the exact answer to your question in a second!',
    explanationHtml: `<h3>What is an AI Friend?</h3>
<p>An <strong>AI Friend</strong> is a computer program that can understand human speech, answer questions, and perform helpful tasks. Unlike a regular toy that only makes one sound when you press a button, an AI friend listens to what you say and thinks about the best answer.</p>
<h4>How Does It Listen?</h4>
<p>When you speak, sound waves travel through the air. The microphone captures these vibrations and converts them into digital numbers. The AI checks those numbers against words in its dictionary to understand your question.</p>`,
    step1: {
      title: '1. Listening with Microphones',
      desc: 'Smart sensors hear your spoken words and turn vibrations into digital signals.',
      detail: 'The computer isolates your voice from background room noise.',
      code: 'sound_wave = record_audio()\nprint("Audio captured!")'
    },
    step2: {
      title: '2. Understanding Words',
      desc: 'Speech recognition matches sound patterns to known English words.',
      detail: 'It translates sounds into text the computer can read.',
      code: 'text = speech_to_text(sound_wave)\nprint("You said:", text)'
    },
    step3: {
      title: '3. Speaking Back',
      desc: 'The smart helper generates clear speech audio through speakers.',
      detail: 'It answers with a helpful, friendly voice.',
      code: 'speak("Hello! The capital of France is Paris.")'
    },
    realScenario: 'A student asked a smart speaker: "How far is the Moon from Earth?" The AI instantly answered "384,400 kilometers!", helping the class finish their astronomy project.',
    useCases: [
      'Smart speakers answering school homework questions',
      'Reading toys pronouncing difficult words for kids',
      'Voice bedtime lamps dimming when told "Goodnight"'
    ],
    simCode: 'user_voice = "Tell me a joke"\nif "joke" in user_voice:\n    ai_reply = "Why did the computer squeak? Because someone touched its mouse! 🐭"\nprint("AI Friend:", ai_reply)',
    simOutput: 'AI Friend: Why did the computer squeak? Because someone touched its mouse! 🐭',
    pairs: [
      { id: 'p1', term: 'Microphone', definition: 'The ear of the computer that records spoken sound waves' },
      { id: 'p2', term: 'Speech Recognition', definition: 'The AI brain turning spoken sound into text words' },
      { id: 'p3', term: 'Speaker', definition: 'The voice box of the computer that speaks answers out loud' }
    ],
    practice: {
      q: 'How does an AI friend hear what you say?',
      opts: [
        'Through a microphone that captures sound vibrations',
        'Through a camera watching your shoes',
        'By reading your private mind with magic',
        'By shaking the desk'
      ],
      correct: 0,
      exp: 'Microphones capture sound vibrations and convert them to digital signals.',
      hint: 'Think about which device component acts like an ear.'
    },
    quizzes: [
      {
        q: 'Which of these is an example of an AI voice helper?',
        opts: [
          { text: 'Alexa or Siri', isCorrect: true },
          { text: 'A wooden chair', isCorrect: false },
          { text: 'A glass bottle', isCorrect: false }
        ],
        exp: 'Alexa and Siri use speech recognition and AI to understand questions.'
      }
    ],
    practicalTask: {
      title: 'Voice Assistant Interview',
      objective: 'Practice asking structured questions to a smart helper and observing the answers.',
      steps: [
        'Ask a voice assistant: "What is the largest animal on Earth?"',
        'Listen carefully to its response (Blue Whale).',
        'Write one sentence about how the AI helped you learn.'
      ],
      expectedResult: 'You will experience how AI processes spoken queries and returns educational facts.'
    },
    recall: {
      q: 'What is the main purpose of an AI friend?',
      a: 'To listen to our questions, understand what we need, and help us learn or complete tasks!'
    },
    takeaways: [
      'AI helpers use microphones to hear and speech recognition to understand words.',
      'They are friendly software tools that help us learn and answer questions.',
      'Always speak clearly and politely when interacting with voice assistants.'
    ]
  },

  'machines that help us': {
    title: 'Machines That Help Us',
    hook: 'Why is a robotic vacuum cleaner smarter than a regular broom?',
    goal: 'Understand the difference between simple tools, automatic machines, and smart AI machines that sense their environment.',
    learnPoints: [
      'Distinguish manual tools, automatic machines, and smart robots',
      'Learn how sensors help smart machines avoid bumping into obstacles',
      'Discover how smart helpers save time for families and doctors'
    ],
    analogy: 'A broom is like a pencil (you do all work), an electric vacuum is like a scooter (you steer it), and a robot vacuum is like a smart puppy that cleans your room on its own!',
    explanationHtml: `<h3>Three Kinds of Machines</h3>
<p>Humans have always built machines to make work easier. Today, machines come in three main types:</p>
<ul>
  <li><strong>Manual Tools:</strong> Brooms and scissors that require your muscle power.</li>
  <li><strong>Automatic Machines:</strong> Toasters on simple timers that turn off without thinking.</li>
  <li><strong>Smart AI Machines:</strong> Robotic vacuums that map rooms with sensors and make driving choices.</li>
</ul>`,
    step1: {
      title: '1. Sensing the Environment',
      desc: 'Infrared distance sensors bounce light off walls to measure room boundaries.',
      detail: 'If an obstacle is 10cm away, the sensor detects it.',
      code: 'distance = check_infrared_sensor()\nif distance < 10: obstacle = True'
    },
    step2: {
      title: '2. Deciding the Path',
      desc: 'The computer calculates a new turn to keep cleaning without crashing.',
      detail: 'It chooses between turning left or right.',
      code: 'if obstacle: robot.turn_left(90)'
    },
    step3: {
      title: '3. Auto-Recharging',
      desc: 'When the battery is low, the robot navigates back to its charging dock.',
      detail: 'It recharges itself for the next cleaning cycle.',
      code: 'if battery < 15: robot.dock()'
    },
    realScenario: 'A robotic vacuum cleaned 3 bedrooms while a family was at school, navigating around toys and stairs without falling down.',
    useCases: [
      'Robotic vacuums cleaning floors automatically',
      'Smart dishwashers sensing dirty plates to save water',
      'Hospital delivery carts transporting medicine between nurse stations'
    ],
    simCode: 'battery = 12 # percent\nif battery < 20:\n    action = "Navigate to Charging Station ⚡"\nelse:\n    action = "Continue Cleaning Bedroom 🧹"\nprint("Robot Vacuum:", action)',
    simOutput: 'Robot Vacuum: Navigate to Charging Station ⚡',
    pairs: [
      { id: 'p1', term: 'Sensor', definition: 'An electronic eye or ear that detects light, touch, or distance' },
      { id: 'p2', term: 'Actuator', definition: 'The motor or wheel that physically moves the robot' },
      { id: 'p3', term: 'Charging Dock', definition: 'The home base where a robot recharges its battery' }
    ],
    practice: {
      q: 'What makes a robot vacuum smart compared to a regular broom?',
      opts: [
        'It has sensors to detect obstacles and navigates on its own',
        'It is made of wood',
        'It needs a rope to pull it',
        'It only works outdoors'
      ],
      correct: 0,
      exp: 'Sensors allow smart machines to observe the room and make navigation decisions.',
      hint: 'Look for the option mentioning sensors and navigation.'
    },
    quizzes: [
      {
        q: 'What prevents a robotic vacuum from falling down stairs?',
        opts: [
          { text: 'Cliff drop-off sensors underneath that detect empty space', isCorrect: true },
          { text: 'A parachute', isCorrect: false },
          { text: 'It flies in the air', isCorrect: false }
        ],
        exp: 'Cliff sensors bounce infrared light down to make sure solid floor exists.'
      }
    ],
    practicalTask: {
      title: 'Smart Machine Scavenger Hunt',
      objective: 'Identify manual, automatic, and smart machines in your school or home.',
      steps: [
        'Find 1 manual tool (scissors).',
        'Find 1 automatic machine (toaster).',
        'Find 1 smart device (robot vacuum or phone).',
        'Write what makes the smart device different.'
      ],
      expectedResult: 'You will distinguish how sensors and computers make machines smart.'
    },
    recall: {
      q: 'What are the three main parts of a smart machine?',
      a: 'Sensors (eyes/ears), a Computer Brain (decision maker), and Actuators (motors/wheels)!'
    },
    takeaways: [
      'Simple tools need human power, automatic machines run timers, smart machines use sensors.',
      'Smart machines make our lives easier, safer, and cleaner.',
      'Sensors help machines see obstacles, detect drops, and find their charging docks.'
    ]
  },

  'give me a command!': {
    title: 'Give Me a Command!',
    hook: 'If you tell a robot "Make me food," why will it just sit there and look confused?',
    goal: 'Understand what a computer command is, why computers need exact instructions, and how inputs lead to outputs.',
    learnPoints: [
      'Learn that computers cannot guess; they only follow exact commands',
      'Understand the Input → Process → Output model',
      'Practice writing clear, bug-free commands'
    ],
    analogy: 'Giving commands to a computer is like giving directions to an alien visitor: you must say "Take 3 steps forward and turn left!" instead of "Go over there!"',
    explanationHtml: `<h3>What is a Command?</h3>
<p>A <strong>Command</strong> is a specific, clear instruction given to a computer or robot. Computers do not possess human imagination or common sense. If an instruction is vague, the machine cannot act.</p>
<h4>The Input → Process → Output Flow</h4>
<p>Every time you press a button (Input), the computer thinks about your command (Process), and performs the requested action on screen or in the room (Output).</p>`,
    step1: {
      title: '1. Defining the Action',
      desc: 'Choose a clear command keyword from the computer vocabulary.',
      detail: 'Keywords like MOVE, TURN, and GRAB tell the robot what to do.',
      code: 'command = "MOVE_FORWARD"\nsteps = 5'
    },
    step2: {
      title: '2. Adding Parameters',
      desc: 'Specify exact speed, distance, or direction.',
      detail: 'Parameters give the computer exact details.',
      code: 'robot.set_speed("MEDIUM")\nrobot.set_direction("NORTH")'
    },
    step3: {
      title: '3. Executing the Command',
      desc: 'The robot executes the action and waits for the next input.',
      detail: 'When finished, it confirms completion.',
      code: 'robot.run_command(command, steps)'
    },
    realScenario: 'Students programmed a rover robot with exact commands: "FORWARD 10cm, STOP, LOWER_ARM", successfully delivering a block across the table.',
    useCases: [
      'TV remotes sending channel button signals',
      'Game controllers sending jump and run commands',
      'Factory robotic arms assembling products with precision'
    ],
    simCode: 'commands = ["STEP_FORWARD", "STEP_FORWARD", "TURN_RIGHT", "WAVE_HAND"]\nfor c in commands:\n    print("Executing:", c)\nprint("Mission completed safely! 🤖")',
    simOutput: 'Executing: STEP_FORWARD\nExecuting: STEP_FORWARD\nExecuting: TURN_RIGHT\nExecuting: WAVE_HAND\nMission completed safely! 🤖',
    pairs: [
      { id: 'p1', term: 'Command', definition: 'A clear instruction telling a computer what action to take' },
      { id: 'p2', term: 'Input', definition: 'Information or button clicks sent into a computer' },
      { id: 'p3', term: 'Output', definition: 'The physical movement or screen result produced' }
    ],
    practice: {
      q: 'Which command will a robot understand best?',
      opts: [
        'FORWARD 3 STEPS',
        'Go somewhere fun',
        'Do the thing from yesterday',
        'Move around maybe'
      ],
      correct: 0,
      exp: 'FORWARD 3 STEPS has exact direction and distance.',
      hint: 'Pick the command that has clear numbers and specific directions.'
    },
    quizzes: [
      {
        q: 'What is the "Input" when typing on a keyboard?',
        opts: [
          { text: 'The keys you press with your fingers', isCorrect: true },
          { text: 'The paper from the printer', isCorrect: false },
          { text: 'The computer fan noise', isCorrect: false }
        ],
        exp: 'Pressing keys sends digital signals (input) into the computer.'
      }
    ],
    practicalTask: {
      title: 'Be the Robot Game',
      objective: 'Practice giving and following exact sequential commands with a partner.',
      steps: [
        'Pair up: One is Programmer, one is Robot.',
        'Programmer gives 3 exact commands (e.g., Take 2 steps forward).',
        'Robot only moves if the command is 100% clear.'
      ],
      expectedResult: 'You will understand why clear syntax is necessary for computing.'
    },
    recall: {
      q: 'What happens if a computer command is unclear?',
      a: 'The computer stops, displays an error message, or cannot complete the task!'
    },
    takeaways: [
      'Computers follow exact commands without guessing.',
      'Input is what you send in; Process is the computer thinking; Output is what comes out.',
      'Clear instructions make robots reliable and accurate.'
    ]
  },

  'put it in order!': {
    title: 'Put It in Order!',
    hook: 'What would happen if you put on your shoes BEFORE putting on your socks?',
    goal: 'Master sequencing and algorithms by ordering steps logically to solve problems.',
    learnPoints: [
      'Understand that order (sequencing) is the foundation of computer algorithms',
      'Learn how bugs happen when steps are out of order',
      'Create step-by-step recipes for daily tasks'
    ],
    analogy: 'An algorithm is like a delicious cake recipe: if you bake before mixing the flour, you get a giant kitchen mess!',
    explanationHtml: `<h3>What is Sequencing?</h3>
<p><strong>Sequencing</strong> means putting steps in the exact order from first to last. In computer science, an ordered list of instructions that solves a problem is called an <strong>Algorithm</strong>.</p>
<h4>Why Order Matters</h4>
<p>If steps are shuffled, programs fail or create funny bugs. Ensuring each step follows naturally from the previous one guarantees success.</p>`,
    step1: {
      title: '1. Starting Initialization',
      desc: 'Prepare materials and initial state.',
      detail: 'Setting variables is Step 1.',
      code: 'bowl_ready = True\nmilk_ready = True'
    },
    step2: {
      title: '2. Sequential Actions',
      desc: 'Execute steps one after another in strict logical sequence.',
      detail: 'Step 1 leads to Step 2 smoothly.',
      code: 'pour_cereal()\npour_milk()'
    },
    step3: {
      title: '3. Reaching the Goal',
      desc: 'Verify completion and enjoy the result.',
      detail: 'The algorithm terminates when the goal is achieved.',
      code: 'print("Breakfast is ready to eat!")'
    },
    realScenario: 'A rocket countdown computer follows an exact sequence: 1. Check fuel, 2. Clear pad, 3. Ignite engines, 4. Lift off, ensuring 100% safety.',
    useCases: [
      'Cartoon animations playing frames in sequence',
      'Traffic lights cycling Green → Yellow → Red',
      'Assembly lines welding car doors in order'
    ],
    simCode: 'morning_steps = ["1. Wake up ⏰", "2. Brush teeth 🪥", "3. Put on shoes 👟", "4. Walk to school 🎒"]\nfor step in morning_steps:\n    print(step)',
    simOutput: '1. Wake up ⏰\n2. Brush teeth 🪥\n3. Put on shoes 👟\n4. Walk to school 🎒',
    pairs: [
      { id: 'p1', term: 'Sequence', definition: 'The specific order in which steps must be performed' },
      { id: 'p2', term: 'Algorithm', definition: 'A step-by-step set of instructions to solve a task' },
      { id: 'p3', term: 'Bug', definition: 'A mistake in order or code that makes a program fail' }
    ],
    practice: {
      q: 'What is the correct sequence for planting a seed?',
      opts: [
        '1. Dig soil → 2. Place seed → 3. Cover soil → 4. Water gently',
        '1. Water → 2. Cover → 3. Eat seed → 4. Dig',
        '1. Pick flower → 2. Plant seed',
        '1. Cover → 2. Dig → 3. Buy seed'
      ],
      correct: 0,
      exp: 'You must dig first before placing the seed and watering.',
      hint: 'Think about what you must do before you can drop the seed into the ground.'
    },
    quizzes: [
      {
        q: 'What is a computer algorithm?',
        opts: [
          { text: 'A step-by-step recipe of instructions to complete a task', isCorrect: true },
          { text: 'A broken screen', isCorrect: false },
          { text: 'A computer battery', isCorrect: false }
        ],
        exp: 'Algorithms are ordered sets of instructions designed to solve problems.'
      }
    ],
    practicalTask: {
      title: 'Make a Paper Airplane Algorithm',
      objective: 'Write and test a 4-step sequence to build a paper glider.',
      steps: [
        'Fold paper in half lengthwise.',
        'Fold top two corners into a triangle.',
        'Fold sides down to form wings.',
        'Test fly your airplane!'
      ],
      expectedResult: 'You will see how following physical steps in sequence builds a working glider.'
    },
    recall: {
      q: 'What do we call a mistake in the order of computer steps?',
      a: 'A Bug! When we fix the order, we call it Debugging.'
    },
    takeaways: [
      'Sequencing means following steps in the right order from start to finish.',
      'An algorithm is a step-by-step recipe that computers use to solve challenges.',
      'Correct order ensures safety, accuracy, and working software.'
    ]
  },

  'ai goes to school': {
    title: 'AI Goes to School',
    hook: 'How can a learning app on a tablet know when a math question is too easy or too hard for you?',
    goal: 'Discover how AI educational tools adapt to each student, provide personalized hints, and help teachers make learning fun.',
    learnPoints: [
      'Understand adaptive learning and difficulty scaling',
      'Learn how educational AI gives helpful hints without spoiling answers',
      'Discover that AI assists human teachers'
    ],
    analogy: 'Adaptive AI is like a smart bicycle with training wheels that gently support you when learning and let you pedal faster as you grow confident!',
    explanationHtml: `<h3>Smart Classrooms</h3>
<p>Schools today use smart technology to make learning fun and personalized for every student through adaptive learning algorithms.</p>`,
    step1: {
      title: '1. Checking Answers',
      desc: 'The app evaluates correctness in real-time.',
      detail: 'Tracks progress without stress.',
      code: 'if answer == correct_answer: score += 1'
    },
    step2: {
      title: '2. Adjusting Difficulty',
      desc: 'Selects the next question at your exact skill level.',
      detail: 'Neither too hard nor too easy.',
      code: 'if score >= 3: level = "CHALLENGE"\nelse: level = "PRACTICE"'
    },
    step3: {
      title: '3. Mascot Hints',
      desc: 'Friendly mascot offers a visual hint when you get stuck.',
      detail: 'Guides thinking step by step.',
      code: 'show_hint("Count the blue dots to solve!")'
    },
    realScenario: 'An AI reading app heard a 3rd grader stumble on "dinosaur" and gently sounded out "die-no-saur" with a cartoon graphic.',
    useCases: [
      'Language apps practicing speech pronunciation',
      'Math games offering visual fraction bars',
      'Library apps recommending books based on reading history'
    ],
    simCode: 'student_streak = 3\nif student_streak >= 3:\n    difficulty = "🌟 Star Quest Mode (Level 2)"\nprint("Adaptive Quiz:", difficulty)',
    simOutput: 'Adaptive Quiz: 🌟 Star Quest Mode (Level 2)',
    pairs: [
      { id: 'p1', term: 'Adaptive Learning', definition: 'Software that changes question difficulty to match student skill' },
      { id: 'p2', term: 'Hint', definition: 'A clue that guides you to find the answer yourself' },
      { id: 'p3', term: 'Mascot Guide', definition: 'A friendly character that cheers you on while studying' }
    ],
    practice: {
      q: 'What does a smart learning app do if you miss a question?',
      opts: [
        'Offers a friendly visual hint to help you try again',
        'Turns off the tablet forever',
        'Deletes all your games',
        'Makes loud siren noises'
      ],
      correct: 0,
      exp: 'Educational AI supports learners with friendly hints and encouragement.',
      hint: 'Think about how a good teacher helps when you make a mistake.'
    },
    quizzes: [
      {
        q: 'Why do schools use AI learning apps?',
        opts: [
          { text: 'To give every student personalized practice at their own pace', isCorrect: true },
          { text: 'Because teachers want to sleep all day', isCorrect: false }
        ],
        exp: 'Personalized learning helps each child master topics without feeling rushed.'
      }
    ],
    practicalTask: {
      title: 'Design Your Dream AI School Helper',
      objective: 'Draw and describe an AI companion for your classroom.',
      steps: [
        'Draw your AI school helper character.',
        'Name your helper (e.g. Professor Pixel).',
        'List 2 superpowers it has to help you learn.'
      ],
      expectedResult: 'You will imagine how educational technology can assist student learning.'
    },
    recall: {
      q: 'What does "Adaptive Learning" mean?',
      a: 'It means the computer app changes its difficulty so it is never too hard or too easy for you!'
    },
    takeaways: [
      'Smart educational apps adapt difficulty to match each student’s pace.',
      'AI tools provide hints and encouragement to build confidence.',
      'Human teachers use AI insights to make learning more engaging for everyone.'
    ]
  },

  'ai comes home': {
    title: 'AI Comes Home',
    hook: 'How does a smart thermostat know when to make the living room cozy before your family even wakes up?',
    goal: 'Explore how smart home devices use sensors and schedules to save electricity, keep homes safe, and bring comfort to families.',
    learnPoints: [
      'Discover thermostats, smart lights, and video doorbells',
      'Understand how smart devices save energy by turning off when empty',
      'Learn basic home safety rules for smart appliances'
    ],
    analogy: 'A smart home is like a caring house with a gentle watchdog: it notices when you enter, turns on warm lights, and keeps temperature perfect!',
    explanationHtml: `<h3>What is a Smart Home?</h3>
<p>A <strong>Smart Home</strong> connects household appliances to a central hub to learn family routines, save electricity, and provide safety.</p>`,
    step1: {
      title: '1. Motion & Light Sensing',
      desc: 'Sensors detect whether rooms are occupied and measure sunlight.',
      detail: 'Measures room brightness.',
      code: 'motion = check_motion("Living Room")'
    },
    step2: {
      title: '2. Energy Optimization',
      desc: 'Turns off lights in empty rooms to save power.',
      detail: 'Protects natural resources.',
      code: 'if not motion and time_empty > 10: turn_off_lights()'
    },
    step3: {
      title: '3. Nighttime Safety',
      desc: 'Locks doors and sets nightlight modes automatically.',
      detail: 'Secures the house for sleep.',
      code: 'set_security_mode("LOCKED")'
    },
    realScenario: 'A smart home lowered water heater temperatures while a family went on vacation, saving 30% electricity.',
    useCases: [
      'Smart AC units lowering electric bills',
      'Voice light switches helping elderly individuals',
      'Smart smoke alarms announcing exact room locations'
    ],
    simCode: 'room_occupied = False\nif not room_occupied:\n    lights = "OFF (Energy Saved 💡)"\nprint("Living Room Lighting:", lights)',
    simOutput: 'Living Room Lighting: OFF (Energy Saved 💡)',
    pairs: [
      { id: 'p1', term: 'Smart Thermostat', definition: 'A temperature controller that learns family comfort preferences' },
      { id: 'p2', term: 'Eco Mode', definition: 'A setting that reduces electricity consumption to help the planet' },
      { id: 'p3', term: 'Motion Sensor', definition: 'A tiny electronic device that detects when people enter a room' }
    ],
    practice: {
      q: 'How do smart lights help our planet?',
      opts: [
        'They turn off automatically in empty rooms to save power',
        'They glow in rainbow colors during rain',
        'They make breakfast',
        'They turn water into juice'
      ],
      correct: 0,
      exp: 'Turning off lights in empty rooms saves valuable electrical energy.',
      hint: 'Think about how saving electricity helps conserve resources.'
    },
    quizzes: [
      {
        q: 'Which device cleans floors automatically using sensors?',
        opts: [
          { text: 'A robotic vacuum cleaner', isCorrect: true },
          { text: 'A wooden chair', isCorrect: false }
        ],
        exp: 'Robotic vacuums use sensors and electric motors to clean autonomously.'
      }
    ],
    practicalTask: {
      title: 'Smart Home Energy Patrol',
      objective: 'Inspect your home to find opportunities where smart energy habits help save electricity.',
      steps: [
        'Walk through your home with an adult.',
        'Turn off lights in empty rooms.',
        'Draw a map showing where 1 smart sensor could save power.'
      ],
      expectedResult: 'You will learn how smart sensors and habits reduce energy waste.'
    },
    recall: {
      q: 'What is the main benefit of a Smart Home?',
      a: 'It keeps our families safe, comfortable, and saves electricity for our planet!'
    },
    takeaways: [
      'Smart home devices connect together to make living safe and easy.',
      'Energy-saving features turn off appliances in empty rooms.',
      'Always ask parents before changing smart home settings.'
    ]
  },

  'when i grow up': {
    title: 'When I Grow Up',
    hook: 'What kind of exciting jobs with robots and computers will exist when you graduate from school?',
    goal: 'Explore future careers in AI, robotics, digital animation, and game design, and discover how technology enhances every profession.',
    learnPoints: [
      'Discover careers: AI Game Designer, Robot Doctor, Wildlife Drone Pilot',
      'Understand that future jobs combine human empathy and smart tools',
      'Learn that every career will use smart technology'
    ],
    analogy: 'Using AI in your future job is like having a superhero suit: it gives your brain superpowers to build and cure faster!',
    explanationHtml: `<h3>Exciting Careers of Tomorrow</h3>
<p>Future careers like AI Game World Designers, Wildlife Drone Pilots, and Smart City Architects unite human creativity with smart computing!</p>`,
    step1: {
      title: '1. Following Your Passion',
      desc: 'Connect what you love (animals, drawing, coding) to future tech roles.',
      detail: 'Every passion connects to digital tools.',
      code: 'passion = "Ocean Wildlife"\nrole = "AI Marine Drone Pilot"'
    },
    step2: {
      title: '2. Building Core Skills',
      desc: 'Practice curiosity, problem solving, and teamwork every day.',
      detail: 'Human empathy is vital.',
      code: 'skills = ["Curiosity", "Logic", "Empathy"]'
    },
    step3: {
      title: '3. Human + AI Teamwork',
      desc: 'Use software to perform calculations while you provide vision.',
      detail: 'AI handles heavy math.',
      code: 'project = build_invention(human_creativity=True)'
    },
    realScenario: 'An agricultural scientist used AI drone cameras to scan 1,000 apple trees in 10 minutes and spot 3 trees that needed extra water.',
    useCases: [
      'Doctors using robotic arms for surgery precision',
      'Fashion designers creating zero-waste clothing with 3D AI',
      'Chefs using smart ovens that bake bread to perfection'
    ],
    simCode: 'dream_career = "Wildlife AI Ranger 🐯"\ntool = "Smart thermal cameras to protect forest animals"\nprint("My Future Role:", dream_career)\nprint("My Super Tool:", tool)',
    simOutput: 'My Future Role: Wildlife AI Ranger 🐯\nMy Super Tool: Smart thermal cameras to protect forest animals',
    pairs: [
      { id: 'p1', term: 'AI Game Designer', definition: 'Creates virtual worlds, characters, and quests using smart tools' },
      { id: 'p2', term: 'Robotics Engineer', definition: 'Designs and builds physical metal robots with motors and sensors' },
      { id: 'p3', term: 'Wildlife Drone Pilot', definition: 'Flies camera drones to track and protect endangered animals' }
    ],
    practice: {
      q: 'Which skill will always be important for humans in future careers?',
      opts: [
        'Creativity, empathy, and kindness to others',
        'Memorizing a phone book',
        'Never speaking to anyone',
        'Doing math on paper for 20 hours'
      ],
      correct: 0,
      exp: 'Human creativity, ethics, and empathy are uniquely human strengths.',
      hint: 'Think about qualities that make humans special and compassionate.'
    },
    quizzes: [
      {
        q: 'How will doctors use AI in the future?',
        opts: [
          { text: 'To analyze medical scans faster and discover cures', isCorrect: true },
          { text: 'To turn patients into robots', isCorrect: false }
        ],
        exp: 'AI assists doctors with imaging analysis and drug discovery.'
      }
    ],
    practicalTask: {
      title: 'Future Job Badge Creator',
      objective: 'Invent a future career title and draw your professional technology badge.',
      steps: [
        'Invent a job title (e.g. Deep Sea AI Explorer).',
        'Draw a job badge showing a tool you will use.',
        'Write 2 sentences explaining how your job helps people.'
      ],
      expectedResult: 'You will connect your current interests to inspiring technology careers.'
    },
    recall: {
      q: 'Will robots replace all human jobs?',
      a: 'No! Humans provide creativity, empathy, and leadership, while AI handles repetitive tasks!'
    },
    takeaways: [
      'Future careers will combine human imagination with smart technology tools.',
      'Fields like healthcare, farming, gaming, and space will all use AI.',
      'Curiosity, problem solving, and kindness are your most powerful future skills.'
    ]
  },

  'people behind technology': {
    title: 'People Behind Technology',
    hook: 'Who wrote the very first computer program, and who writes the code for smart robots today?',
    goal: 'Meet pioneering scientists, coders, and ethical creators behind modern computing and learn how diverse teams build software.',
    learnPoints: [
      'Discover Ada Lovelace, the first computer programmer',
      'Understand what Software Engineers, Data Scientists, and UX Designers do',
      'Learn that making technology requires team collaboration'
    ],
    analogy: 'Building a software app is like building a skyscraper: architects design blueprints (UX Designers), engineers build walls (Coders), and inspectors check safety (Testers)!',
    explanationHtml: `<h3>The Pioneers of Computing</h3>
<p>Every piece of technology was created by curious people like Ada Lovelace, who wrote the world's first algorithm in 1843!</p>`,
    step1: {
      title: '1. Designing the Idea',
      desc: 'Creative thinkers brainstorm what problem the app will solve.',
      detail: 'They draw wireframes and mascots.',
      code: 'app = "Reading Buddy"\nmission = "Help children pronounce words"'
    },
    step2: {
      title: '2. Writing the Code',
      desc: 'Software developers write Python instructions to build the app.',
      detail: 'They test every line.',
      code: 'def pronounce_word(word): return generate_phonics(word)'
    },
    step3: {
      title: '3. Safety & Ethics Testing',
      desc: 'Testers verify the app is safe, friendly, and protects privacy.',
      detail: 'Ensures quality for all kids.',
      code: 'run_safety_checks()\nprint("App certified safe!")'
    },
    realScenario: 'A team of 4 students combined drawing, Python coding, and user testing to create a sign-language translation app for deaf children.',
    useCases: [
      'Engineers coding flight autopilot software',
      'Scientists analyzing satellite photos to detect forest fires',
      'Artists modeling 3D animated movie characters'
    ],
    simCode: 'team = {"Programmer": "Writes Python Code", "Artist": "Designs Game Characters", "Tester": "Finds & Fixes Bugs"}\nfor role, duty in team.items():\n    print(f"{role}: {duty}")',
    simOutput: 'Programmer: Writes Python Code\nArtist: Designs Game Characters\nTester: Finds & Fixes Bugs',
    pairs: [
      { id: 'p1', term: 'Ada Lovelace', definition: 'The world’s first computer programmer who wrote the first algorithm in 1843' },
      { id: 'p2', term: 'Software Engineer', definition: 'A person who writes code to build apps and systems' },
      { id: 'p3', term: 'UX Designer', definition: 'An artist who designs how apps look and feel so they are easy to use' }
    ],
    practice: {
      q: 'Who was the first person in history to write a computer algorithm?',
      opts: [
        'Ada Lovelace',
        'Julius Caesar',
        'Alexander the Great',
        'King Arthur'
      ],
      correct: 0,
      exp: 'Ada Lovelace published the first computer algorithm in 1843.',
      hint: 'Look for the famous 19th-century mathematician.'
    },
    quizzes: [
      {
        q: 'Why do computer teams need different kinds of people?',
        opts: [
          { text: 'Because great apps need coding, design, testing, and diverse creative ideas', isCorrect: true },
          { text: 'So they can eat more snacks', isCorrect: false }
        ],
        exp: 'Multidisciplinary collaboration creates well-rounded, user-friendly software.'
      }
    ],
    practicalTask: {
      title: 'App Creator Team Roleplay',
      objective: 'Plan a software project by assigning responsibilities to your team members.',
      steps: [
        'Imagine a new educational app.',
        'Assign 3 roles: Programmer, Artist, Safety Tester.',
        'Write 1 main feature your app will have.'
      ],
      expectedResult: 'You will experience how team collaboration turns ideas into working software.'
    },
    recall: {
      q: 'Who creates technology?',
      a: 'Curious, creative people working together in teams: coders, artists, scientists, and testers!'
    },
    takeaways: [
      'Ada Lovelace created the first algorithm, pioneering modern computer programming.',
      'Building software requires team skills: programming, design, testing, and ethics.',
      'Anyone with curiosity and passion can grow up to create world-changing technology.'
    ]
  },

  'ask & explore': {
    title: 'Ask & Explore',
    hook: 'How can asking the right question to an AI helper help you discover secrets of the deep ocean or distant galaxies?',
    goal: 'Master the art of prompting: learn how to ask clear, curious, and specific questions to get the most helpful educational answers.',
    learnPoints: [
      'Understand what a Prompt is and why clear questions give better answers',
      'Learn the difference between vague prompts and Super Prompts',
      'Practice asking follow-up questions to explore topics deeply'
    ],
    analogy: 'Asking an AI a prompt is like using a magnifying glass on a treasure map: if you focus on the exact island marked X, you find the treasure!',
    explanationHtml: `<h3>The Power of a Great Question</h3>
<p>When you ask a computer a question, your words are called a <strong>Prompt</strong>. AI models read your prompt word by word to predict the most helpful response.</p>`,
    step1: {
      title: '1. Choosing a Specific Topic',
      desc: 'Pick an exact subject you are curious about instead of a single vague word.',
      detail: 'Focusing finds detailed facts.',
      code: 'topic = "How honeybees make honey from nectar"'
    },
    step2: {
      title: '2. Adding Constraints',
      desc: 'Tell the AI how long the answer should be and what format to use.',
      detail: 'Specifying length prevents confusing walls of text.',
      code: 'prompt = f"Explain {topic} in 3 simple bullet points for Class 3."'
    },
    step3: {
      title: '3. Asking Follow-Ups',
      desc: 'Ask a second question to explore an interesting detail further.',
      detail: 'Deepens learning.',
      code: 'follow_up = "How do bees communicate where flowers are?"'
    },
    realScenario: 'A student preparing a science poster asked AI: "Explain why volcanoes erupt using kitchen analogies." The AI compared magma to shaken soda bottles!',
    useCases: [
      'Asking AI to explain history events in story format',
      'Generating times table practice quiz questions',
      'Requesting simple science experiments using kitchen items'
    ],
    simCode: 'prompt = "Explain why the ocean is blue in 1 simple sentence for a 8 year old"\nai_response = "The ocean looks blue because water absorbs red sunlight and scatters the blue light back to our eyes! 🌊"\nprint("Prompt Answer:", ai_response)',
    simOutput: 'Prompt Answer: The ocean looks blue because water absorbs red sunlight and scatters the blue light back to our eyes! 🌊',
    pairs: [
      { id: 'p1', term: 'Prompt', definition: 'The exact question or instruction you type or speak to an AI model' },
      { id: 'p2', term: 'Constraint', definition: 'A helpful rule you add (like "3 sentences" or "simple words")' },
      { id: 'p3', term: 'Follow-up', definition: 'A second question you ask to explore an interesting detail further' }
    ],
    practice: {
      q: 'Which of these is the best prompt to learn about space travel?',
      opts: [
        'How do astronaut spacesuits protect people from cold space in 3 simple facts?',
        'Space',
        'Tell me everything about the universe right now',
        'Astronaut stuff'
      ],
      correct: 0,
      exp: 'Specific prompts with clear questions and format constraints produce the clearest answers.',
      hint: 'Choose the option that asks a precise question with clear details.'
    },
    quizzes: [
      {
        q: 'What is a "Prompt" in AI?',
        opts: [
          { text: 'The question or instruction you provide to the AI system', isCorrect: true },
          { text: 'A plastic keyboard cover', isCorrect: false }
        ],
        exp: 'Prompts guide generative AI to produce relevant, targeted responses.'
      }
    ],
    practicalTask: {
      title: 'Prompt Detective Challenge',
      objective: 'Practice writing 3 Super Prompts on your favorite science topic.',
      steps: [
        'Choose a favorite animal (e.g. Cheetah).',
        'Write 1 Super Prompt with: Topic + Format + Audience.',
        'Read the answer with an adult and note 1 fact learned.'
      ],
      expectedResult: 'You will master how clear prompts unlock accurate, exciting learning answers.'
    },
    recall: {
      q: 'What are the 3 ingredients of a Super Prompt?',
      a: 'Topic (what you want), Format (how it should look), and Audience (who is reading)!'
    },
    takeaways: [
      'Clear, specific prompts give much better answers than single vague words.',
      'You can ask AI to explain things in poems, bullet points, or simple analogies.',
      'Asking follow-up questions turns curiosity into deep learning.'
    ]
  },

  'draw & imagine': {
    title: 'Draw & Imagine',
    hook: 'How can a computer look at a rough doodle of three circles and instantly guess: "I know, it’s a snowman!"?',
    goal: 'Understand how AI recognizes hand-drawn doodles, recognizes shapes and patterns, and collaborates with humans to create artwork.',
    learnPoints: [
      'Learn how stroke recognition algorithms match doodle lines to shape libraries',
      'Discover interactive drawing AI tools like Google Quick, Draw! and AutoDraw',
      'Understand how artists use generative AI as an imaginative sketchbook'
    ],
    analogy: 'Doodle recognition AI is like a friend playing Pictionary with you: with every pen stroke you draw, it compares your lines against millions of drawings to guess what you are creating!',
    explanationHtml: `<h3>How Computers "See" Your Drawings</h3>
<p>When you draw on a tablet screen, your finger leaves a trail of digital coordinates. The computer records stroke directions, curves, and order to recognize shapes.</p>`,
    step1: {
      title: '1. Tracking Pen Strokes',
      desc: 'The touchscreen records coordinates and curvature of your finger lines.',
      detail: 'Converts curves to vector strokes.',
      code: 'strokes = record_touch_points()\ncurve = calculate_curvature(strokes)'
    },
    step2: {
      title: '2. Pattern Matching',
      desc: 'The model checks your stroke pattern against millions of known drawings.',
      detail: 'Ranks top likely objects.',
      code: 'guess = model.predict(strokes)\nprint("AI Guess:", guess)'
    },
    step3: {
      title: '3. Vector Clipart Suggestions',
      desc: 'The tool suggests clean, professional vector illustrations matching your sketch.',
      detail: 'You customize colors and layout.',
      code: 'suggest_clipart(["🐱 Cat", "🐯 Tiger"])'
    },
    realScenario: 'Students used AutoDraw to turn rough squiggles into clean marine illustrations for an ocean conservation school poster.',
    useCases: [
      'Google Quick, Draw! testing stroke recognition with millions of players',
      'AutoDraw helping students create clean presentation diagrams',
      'Color palette generators suggesting harmonious theme colors'
    ],
    simCode: 'drawing_strokes = ["circle", "circle_on_top", "stick_arms", "carrot_nose"]\nif "carrot_nose" in drawing_strokes:\n    prediction = "⛄ Snowman (99% match!)"\nprint("QuickDraw AI:", prediction)',
    simOutput: 'QuickDraw AI: ⛄ Snowman (99% match!)',
    pairs: [
      { id: 'p1', term: 'Stroke', definition: 'A single continuous line drawn on a digital touchscreen' },
      { id: 'p2', term: 'Pattern Recognition', definition: 'The AI matching shapes and curves to known drawing objects' },
      { id: 'p3', term: 'Vector Clipart', definition: 'Clean, professional digital artwork suggested by the drawing app' }
    ],
    practice: {
      q: 'How does a doodle-guessing AI know what you are drawing?',
      opts: [
        'It compares line strokes and shapes against millions of drawings in its database',
        'It reads your mind with magic',
        'It peeks with a spy glass',
        'It always guesses potato'
      ],
      correct: 0,
      exp: 'Neural networks recognize stroke order, curves, and geometric patterns.',
      hint: 'Think about how the computer matches visual line patterns to known objects.'
    },
    quizzes: [
      {
        q: 'What is Google Quick, Draw! an example of?',
        opts: [
          { text: 'An AI game that learns how people draw everyday objects', isCorrect: true },
          { text: 'A store selling pencils', isCorrect: false }
        ],
        exp: 'Quick, Draw! uses neural networks trained on millions of player sketches.'
      }
    ],
    practicalTask: {
      title: 'Shape to Superhero Transformation',
      objective: 'Draw 3 simple geometric shapes and transform them into imaginative characters.',
      steps: [
        'Draw a square, circle, and triangle.',
        'Add eyes, gadgets, and superhero capes.',
        'Write 1 line describing each shape robot.'
      ],
      expectedResult: 'You will discover how simple stroke patterns combine into creative visual designs.'
    },
    recall: {
      q: 'How does drawing AI help us create?',
      a: 'It recognizes our rough doodle shapes and suggests clean, colorful art we can customize!'
    },
    takeaways: [
      'Computers recognize drawings by analyzing stroke directions, curves, and angles.',
      'Interactive tools like AutoDraw turn quick sketches into polished illustrations.',
      'AI serves as an inspiring sketchbook for human imagination and artistic expression.'
    ]
  },

  'my ai safety rules': {
    title: 'My AI Safety Rules',
    hook: 'If an online chatbot asks: "What is your home address and your parent’s phone number?", what should you do?',
    goal: 'Learn vital digital safety rules: protect private personal information, recognize safe digital boundaries, and know when to ask an adult.',
    learnPoints: [
      'Memorize the Private Info List: Name, Address, School, Passwords, Phone Numbers',
      'Understand why personal information must never be typed into public chatbots',
      'Know the Golden Rule: Always inform a trusted adult if something feels wrong'
    ],
    analogy: 'Your personal information is like your house key: you keep it safely in your pocket and never hand it out to strangers passing by on the street!',
    explanationHtml: `<h3>Golden Rules of Digital Safety</h3>
<p>Never share your full legal name, home address, school, passwords, or phone numbers with any online chatbot or app.</p>`,
    step1: {
      title: '1. Spotting Private Data Requests',
      desc: 'Check every prompt and form before typing to ensure no secrets are entered.',
      detail: 'Stop if private data is requested.',
      code: 'if asks_for_private_info(form): block_input()'
    },
    step2: {
      title: '2. Keeping Passwords Secret',
      desc: 'Never share passwords with anyone except your parents.',
      detail: 'Do not share even with friends.',
      code: 'password = "SecretPassword123!" # Share ONLY with parents'
    },
    step3: {
      title: '3. Alerting a Trusted Adult',
      desc: 'If an online message makes you feel uncomfortable, tell an adult immediately.',
      detail: 'Parents and teachers protect you.',
      code: 'notify_adult("Teacher assistance requested")'
    },
    realScenario: 'A 3rd grader spotted a suspicious pop-up asking for a home address to claim a toy, immediately called their teacher, and avoided a scam.',
    useCases: [
      'Safe filtered educational search engines blocking dangerous sites',
      'Kids using avatars instead of real photos in online games',
      'Screen time limits maintaining a healthy balance with outdoor play'
    ],
    simCode: 'incoming_request = "Please type your school address to get free coins"\nif "address" in incoming_request or "school" in incoming_request:\n    safety_action = "🛑 BLOCKED: Personal info detected. Alerting parent!"\nprint("Safety Shield:", safety_action)',
    simOutput: 'Safety Shield: 🛑 BLOCKED: Personal info detected. Alerting parent!',
    pairs: [
      { id: 'p1', term: 'Private Information', definition: 'Secrets like your home address, school, phone number, and passwords' },
      { id: 'p2', term: 'Shield Habit', definition: 'Stopping and thinking before typing any information online' },
      { id: 'p3', term: 'Trusted Adult', definition: 'A parent, guardian, or teacher who helps keep you safe' }
    ],
    practice: {
      q: 'Which of the following is SAFE to share with an AI learning app?',
      opts: [
        'Your favorite color (Blue) and favorite dinosaur (Stegosaurus)',
        'Your home street address and door key code',
        'Your parent’s credit card number',
        'Your school bus stop location and timing'
      ],
      correct: 0,
      exp: 'Favorite colors or school topics are safe; never share contact details.',
      hint: 'Look for fun favorite things rather than private locations.'
    },
    quizzes: [
      {
        q: 'Who is the only person you should share your computer password with?',
        opts: [
          { text: 'Your parents or guardians', isCorrect: true },
          { text: 'A stranger in an online game chat', isCorrect: false }
        ],
        exp: 'Passwords must remain confidential within your family.'
      }
    ],
    practicalTask: {
      title: 'Digital Privacy Shield Badge',
      objective: 'Create a personal Safety Shield checklist for your study desk.',
      steps: [
        'Draw a colorful shield on a card.',
        'List: 1. Passwords Safe, 2. Address Private, 3. Tell Adult.',
        'Tape the card near your computer desk.'
      ],
      expectedResult: 'You will establish an active reminder to protect your personal privacy online.'
    },
    recall: {
      q: 'What are the 5 things you must NEVER share online?',
      a: 'Full Name, Home Address, School Name, Phone Number, and Passwords!'
    },
    takeaways: [
      'Keep your personal information private from all online apps and chatbots.',
      'Never share passwords with anyone except your parents.',
      'Always ask a trusted adult if something online seems strange or confusing.'
    ]
  },

  'share with care': {
    title: 'Share with Care',
    hook: 'Once you post a photo or message on the internet, can you ever take it back completely?',
    goal: 'Understand your Digital Footprint, learn the importance of kind communication, and practice thoughtful sharing habits.',
    learnPoints: [
      'Understand what a Digital Footprint is: the permanent trail of words and photos',
      'Learn the THINK test: Is it True? Helpful? Inspiring? Necessary? Kind?',
      'Respect copyright by giving credit to creators'
    ],
    analogy: 'Sharing on the internet is like writing in wet cement: once it dries, it stays there forever, so make sure you leave behind something kind and beautiful!',
    explanationHtml: `<h3>Your Digital Footprint</h3>
<p>Every time you send a message, post a drawing, or play a game online, you leave behind a trail called your <strong>Digital Footprint</strong>. Always use the T.H.I.N.K. test (True, Helpful, Inspiring, Necessary, Kind) before posting.</p>`,
    step1: {
      title: '1. Thinking Before Sending',
      desc: 'Review your message through the eyes of others before clicking send.',
      detail: 'Ensure words are kind and encouraging.',
      code: 'if is_kind(message) and is_truthful(message): send_message()'
    },
    step2: {
      title: '2. Protecting Friends’ Privacy',
      desc: 'Never post photos of friends without asking their permission first.',
      detail: 'Respect your classmates.',
      code: 'if has_friend_permission: share_photo()'
    },
    step3: {
      title: '3. Giving Attribution',
      desc: 'Always cite where you found photos or facts used in your school slides.',
      detail: 'Respects copyright.',
      code: 'add_citation("Photo Credit: NASA Observatory")'
    },
    realScenario: 'Students made a recycling presentation using free educational photos with clean credits to photographers, winning a school citizenship award.',
    useCases: [
      'Writing positive, encouraging comments on classmates’ shared digital projects',
      'Asking friends before sharing group photos',
      'Using Creative Commons educational photos in school presentations'
    ],
    simCode: 'message = "Great drawing in art class today! 🎨"\nthink_test = {"True": True, "Helpful": True, "Inspiring": True, "Necessary": True, "Kind": True}\nif all(think_test.values()):\n    print("Message Approved for Sending! ✨")',
    simOutput: 'Message Approved for Sending! ✨',
    pairs: [
      { id: 'p1', term: 'Digital Footprint', definition: 'The permanent record of things you share, post, and click online' },
      { id: 'p2', term: 'Attribution', definition: 'Giving credit to the original author, photographer, or artist' },
      { id: 'p3', term: 'Digital Citizen', definition: 'A person who uses technology kindly, safely, and responsibly' }
    ],
    practice: {
      q: 'What should you do before posting a funny photo of your friend at school?',
      opts: [
        'Ask your friend for their permission first and make sure it doesn’t embarrass them',
        'Post it immediately so everyone on the internet sees it',
        'Add a mean caption to make strangers laugh',
        'Send it to 50 strangers online'
      ],
      correct: 0,
      exp: 'Always ask permission before sharing photos or stories about other people.',
      hint: 'Think about how you would want a friend to treat your own photos.'
    },
    quizzes: [
      {
        q: 'What does the "K" stand for in the T.H.I.N.K. test?',
        opts: [
          { text: 'Is it Kind?', isCorrect: true },
          { text: 'Is it Kangaroo?', isCorrect: false }
        ],
        exp: 'K stands for Kind—treating others respectfully online.'
      }
    ],
    practicalTask: {
      title: 'The Kindness Pledge Card',
      objective: 'Write and sign a personal Digital Citizenship promise.',
      steps: [
        'Write out the 5 letters of T.H.I.N.K. on a card.',
        'Write 1 sentence beside each letter (e.g. T = True facts only).',
        'Read your pledge aloud to your family.'
      ],
      expectedResult: 'You will reinforce positive digital citizenship and respectful online communication.'
    },
    recall: {
      q: 'What does it mean to "Share with Care"?',
      a: 'It means making sure everything you post is True, Kind, and respects other people’s privacy!'
    },
    takeaways: [
      'Your digital footprint stays online for a very long time.',
      'Use the THINK test (True, Helpful, Inspiring, Necessary, Kind) before sending messages.',
      'Always give credit to original artists and respect your friends’ privacy.'
    ]
  }
}
