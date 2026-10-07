// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE CURRICULUM TOPIC PROFILES: PRIMARY TIER (CLASSES 3, 4, 5)
// Real, researched educational content, topic-specific analogies, steps,
// practical tasks, interactive pairs, and verified quizzes.
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

export const PRIMARY_TOPIC_PROFILES: Record<string, TopicProfile> = {
  // ═════════════════════════════════════════════════════════════════════════════
  // CLASS 3 TOPICS
  // ═════════════════════════════════════════════════════════════════════════════
  'meet my ai friend': {
    title: 'Meet My AI Friend',
    hook: 'Have you ever spoken to a smart speaker like Alexa or Siri and wondered how it understands your words?',
    goal: 'Learn what an AI friend is, how smart voice helpers listen to sound waves, and how they assist us every day.',
    learnPoints: [
      'Discover that an AI friend is computer software designed to listen, learn, and assist',
      'Understand how microphones turn spoken sound waves into computer signals',
      'Learn how to talk politely and clearly to voice assistants'
    ],
    analogy: 'An AI friend is like a super-fast librarian who has read millions of books and can find the exact answer to your question in a second!',
    explanationHtml: `<h3>What is an AI Friend?</h3>
<p>An <strong>AI Friend</strong> is a computer program that can understand human speech, answer questions, and perform helpful tasks. Unlike a regular toy that only makes one sound when you press a button, an AI friend listens to what you say and thinks about the best answer.</p>
<h4>How Does It Listen?</h4>
<p>When you speak, sound waves travel through the air. The microphone on a smart speaker captures these vibrations and converts them into digital numbers. The AI computer checks those numbers against words in its dictionary to understand your question.</p>
<h4>What Can Your AI Friend Do?</h4>
<ul>
  <li><strong>Tell Bedtime Stories:</strong> Read stories with fun character voices.</li>
  <li><strong>Play Music:</strong> Find your favorite nursery rhymes and songs.</li>
  <li><strong>Answer Questions:</strong> Explain why the sky is blue or how big dinosaurs were.</li>
</ul>`,
    step1: {
      title: '1. Listening with Microphones',
      desc: 'Smart sensors hear your spoken words and turn sound vibrations into digital signals.',
      detail: 'The computer isolates your voice from background room noise.',
      code: '# Voice Input Capture\nspoken_words = "Play my favorite rhyme"\nsound_wave = capture_microphone_input()\nprint("Sound detected!")'
    },
    step2: {
      title: '2. Understanding the Words (Speech Recognition)',
      desc: 'The AI checks its word bank to figure out what each sound means.',
      detail: 'It matches sound patterns to known English words.',
      code: 'recognized_text = convert_speech_to_text(sound_wave)\nif "favorite rhyme" in recognized_text:\n    action = "find_song"'
    },
    step3: {
      title: '3. Speaking Back with a Friendly Voice',
      desc: 'The smart helper generates speech audio through speakers to answer you.',
      detail: 'It speaks in a clear, friendly voice so you understand the answer.',
      code: 'speak_to_user("Sure! Playing Twinkle Twinkle Little Star now!")'
    },
    realScenario: 'In school, young students asked a smart voice helper: "How far is the Moon from Earth?" The AI helper instantly replied: "The Moon is about 384,400 kilometers away!" helping the class finish their space drawing.',
    useCases: [
      'Smart speakers answering homework questions in the living room',
      'Interactive reading toys that pronounce difficult new words',
      'Voice-controlled bedtime lamps that dim when you say "Goodnight"'
    ],
    simCode: 'voice_input = "Hello AI friend!"\nprint("You said:", voice_input)\nprint("AI Friend: Hello! Ready to learn something fun today?")',
    simOutput: 'You said: Hello AI friend!\nAI Friend: Hello! Ready to learn something fun today?',
    pairs: [
      { id: 'p1', term: 'Microphone', definition: 'The ear of the computer that hears spoken sound waves' },
      { id: 'p2', term: 'Speech Recognition', definition: 'The AI brain converting spoken sounds into text words' },
      { id: 'p3', term: 'Speaker', definition: 'The voice box of the computer that speaks answers out loud' }
    ],
    practice: {
      q: 'How does an AI friend hear what you say?',
      opts: [
        'Through a microphone that captures sound vibrations',
        'Through a camera that watches your feet',
        'By reading your private mind with magic',
        'By shaking the table'
      ],
      correct: 0,
      exp: 'Smart assistants use microphones to hear sound waves in the air and turn them into computer signals.',
      hint: 'Think about which part of a phone or speaker acts like an ear.'
    },
    quizzes: [
      {
        q: 'Which of these is an example of an AI helper?',
        opts: [
          { text: 'A voice assistant like Alexa or Siri', isCorrect: true },
          { text: 'A wooden pencil', isCorrect: false },
          { text: 'A glass cup', isCorrect: false },
          { text: 'A paper notebook', isCorrect: false }
        ],
        exp: 'Voice assistants use artificial intelligence to understand and answer questions.'
      },
      {
        q: 'What should you do if an AI assistant doesn’t understand you?',
        opts: [
          { text: 'Speak clearly at a normal speed without yelling', isCorrect: true },
          { text: 'Throw the speaker out the window', isCorrect: false },
          { text: 'Cry and give up', isCorrect: false },
          { text: 'Whisper so quietly no one can hear', isCorrect: false }
        ],
        exp: 'Speaking clearly and steadily helps the microphone capture clean sound waves.'
      }
    ],
    practicalTask: {
      title: 'Voice Assistant Interview',
      objective: 'Practice asking structured questions to a smart helper and observing the answers.',
      steps: [
        'Ask a voice assistant: "What is the largest animal on Earth?"',
        'Listen carefully to its response and note the key fact (Blue Whale).',
        'Draw the animal and write one sentence about how the AI helped you learn.'
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
      'Distinguish between simple manual tools, motorized machines, and smart AI machines',
      'Learn how sensors help smart machines avoid bumping into furniture',
      'Discover how smart helpers save time for families and doctors'
    ],
    analogy: 'A broom is like a pencil (you do all the work), an electric vacuum is like a motorized scooter (you steer it), and a robot vacuum is like a smart puppy that cleans your room all by itself!',
    explanationHtml: `<h3>Three Kinds of Machines</h3>
<p>Humans have always built machines to make work easier. Today, machines come in three main types:</p>
<ol>
  <li><strong>Manual Tools:</strong> A broom or hand-saw that only moves when you push it.</li>
  <li><strong>Automatic Machines:</strong> A toaster or washing machine that runs on a timer but cannot see what is around it.</li>
  <li><strong>Smart AI Machines:</strong> A robotic lawnmower or vacuum that has sensor eyes, maps the room, and avoids obstacles.</li>
</ol>
<h4>How Smart Machines Sense the Room</h4>
<p>Smart machines use infrared and bumper sensors. When an obstacle is near, the sensor bounces a beam of light off the wall to calculate distance and turns the wheels before crashing!</p>`,
    step1: {
      title: '1. Sensing the Environment',
      desc: 'Distance sensors send out invisible light pulses to measure room boundaries.',
      detail: 'If a wall is 10 centimeters away, the machine detects the bounce.',
      code: '# Sensor Check\nfront_distance = check_infrared_sensor()\nif front_distance < 10:\n    obstacle_detected = True'
    },
    step2: {
      title: '2. Deciding the Best Path',
      desc: 'The onboard microcontroller calculates a new path to keep cleaning without stopping.',
      detail: 'It chooses between turning 90 degrees left or right.',
      code: 'if obstacle_detected:\n    turn_robot("LEFT", degrees=90)\n    move_forward(speed=5)'
    },
    step3: {
      title: '3. Returning Home to Recharge',
      desc: 'When the battery gets low, the machine follows an infrared beacon back to its dock.',
      detail: 'It plugs itself in to charge for the next cleaning cycle.',
      code: 'if battery_percentage < 15:\n    navigate_to_charging_dock()'
    },
    realScenario: 'A busy family set their robotic vacuum to clean while they were at school and work. The robot avoided pet bowls and stairs, cleaned 3 rooms, and parked itself in the charging dock with a full dustbin.',
    useCases: [
      'Robotic vacuums navigating around chairs and rugs automatically',
      'Smart dishwashers sensing how dirty plates are to save water',
      'Hospital delivery carts transporting medicine between nurse stations'
    ],
    simCode: 'sensor_reading = "Wall at 5cm"\nif "Wall" in sensor_reading:\n    action = "Turn Right 90 Degrees"\nprint("Robot Action:", action)',
    simOutput: 'Robot Action: Turn Right 90 Degrees',
    pairs: [
      { id: 'p1', term: 'Sensor', definition: 'A tiny electronic part that detects light, touch, or distance' },
      { id: 'p2', term: 'Actuator', definition: 'The motor or wheel that makes the machine move physically' },
      { id: 'p3', term: 'Charging Dock', definition: 'The home base where a smart robot recharges its battery' }
    ],
    practice: {
      q: 'What makes a robot vacuum "smart" compared to a normal broom?',
      opts: [
        'It has sensors to detect obstacles and navigates on its own',
        'It is made of wood and requires you to push it',
        'It only works when you pull a rope',
        'It sings opera songs but does not clean'
      ],
      correct: 0,
      exp: 'Sensors allow smart machines to observe the room and make navigation decisions independently.',
      hint: 'Look for the option that mentions sensors and automatic navigation.'
    },
    quizzes: [
      {
        q: 'What prevents a robotic vacuum from tumbling down a staircase?',
        opts: [
          { text: 'Cliff/drop-off sensors underneath that detect empty space', isCorrect: true },
          { text: 'A parachute attached to the wheels', isCorrect: false },
          { text: 'It has wings and flies away', isCorrect: false },
          { text: 'Someone catches it with a net', isCorrect: false }
        ],
        exp: 'Cliff sensors constantly check that floor is underneath the robot wheels.'
      },
      {
        q: 'Which machine uses AI to help doctors?',
        opts: [
          { text: 'A smart scanner that spots broken bones in X-rays', isCorrect: true },
          { text: 'A wooden ruler', isCorrect: false },
          { text: 'A water bottle', isCorrect: false },
          { text: 'A cardboard box', isCorrect: false }
        ],
        exp: 'Medical AI assists doctors by analyzing detailed medical scans.'
      }
    ],
    practicalTask: {
      title: 'Smart Machine Scavenger Hunt',
      objective: 'Identify manual, automatic, and smart machines in your school or home.',
      steps: [
        'Look around your classroom or house and find 1 manual tool (e.g. scissors).',
        'Find 1 automatic machine (e.g. microwave or toaster).',
        'Find 1 smart device (e.g. smartphone or robot vacuum).',
        'Write down what makes the smart device different from the other two.'
      ],
      expectedResult: 'You will be able to distinguish how sensors and computers make machines smart.'
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
      'Learn that computers cannot guess; they only follow precise commands',
      'Understand the Input → Process → Output model in everyday technology',
      'Practice writing simple, bug-free commands for robots'
    ],
    analogy: 'Giving commands to a computer is like giving directions to an alien visitor: you cannot say "Go over there," you must say "Take 3 steps forward and turn left!"',
    explanationHtml: `<h3>What is a Command?</h3>
<p>A <strong>Command</strong> is a specific, clear instruction given to a computer or robot. Computers do not possess human imagination or common sense. If an instruction is vague, the machine cannot act.</p>
<h4>Input, Process, Output (IPO)</h4>
<ul>
  <li><strong>Input:</strong> The command or button you press (e.g., clicking "Print").</li>
  <li><strong>Process:</strong> The computer brain reads the command and prepares the file.</li>
  <li><strong>Output:</strong> The printer feeds paper and prints your colorful drawing.</li>
</ul>`,
    step1: {
      title: '1. Defining the Exact Action',
      desc: 'Choose a clear command keyword from the computer’s instruction vocabulary.',
      detail: 'Keywords like MOVE, TURN, and GRAB tell the robot exactly what to do.',
      code: '# Robot Commands\ncommand = "MOVE_FORWARD"\nsteps = 5\nprint(f"Executing: {command} {steps} steps")'
    },
    step2: {
      title: '2. Adding Important Parameters',
      desc: 'Specify how fast, how far, or what direction the command should execute.',
      detail: 'Parameters give the computer exact details.',
      code: 'speed = "MEDIUM"\ndirection = "NORTH"\nrobot.set_heading(direction, speed)'
    },
    step3: {
      title: '3. Executing the Command',
      desc: 'The machine runs the instruction and confirms completion.',
      detail: 'When the step finishes, the robot awaits the next command.',
      code: 'robot.execute()\nprint("Command completed successfully! Ready for next input.")'
    },
    realScenario: 'In a coding class, students programmed a mini rover robot to carry a ball across the table. When they gave exact commands: "FORWARD 10cm, STOP, LOWER_ARM", the rover delivered the ball without dropping it!',
    useCases: [
      'Smart TV remotes turning channel buttons into television signals',
      'Video game controllers sending button commands to jump and run',
      'Factory arms moving parts with sub-millimeter precision'
    ],
    simCode: 'def send_robot_command(action, value):\n    return f"Robot executed: {action} by {value} units"\n\nprint(send_robot_command("WALK", 3))',
    simOutput: 'Robot executed: WALK by 3 units',
    pairs: [
      { id: 'p1', term: 'Command', definition: 'A clear instruction telling a computer or robot what action to take' },
      { id: 'p2', term: 'Input', definition: 'Information or button clicks sent into the computer' },
      { id: 'p3', term: 'Output', definition: 'The result or physical movement the machine produces' }
    ],
    practice: {
      q: 'Which command will a robot understand best?',
      opts: [
        'FORWARD 3 STEPS',
        'Go somewhere fun',
        'Do the thing you did yesterday',
        'Move around maybe'
      ],
      correct: 0,
      exp: '"FORWARD 3 STEPS" gives an exact direction and an exact distance.',
      hint: 'Pick the command that has clear numbers and specific directions.'
    },
    quizzes: [
      {
        q: 'What is the "Input" when you type on a keyboard?',
        opts: [
          { text: 'The letters you press on the keys', isCorrect: true },
          { text: 'The paper coming out of the printer', isCorrect: false },
          { text: 'The sound coming out of the speaker', isCorrect: false },
          { text: 'The screen brightness', isCorrect: false }
        ],
        exp: 'Key presses are input signals sent into the computer.'
      },
      {
        q: 'Why can’t a robot guess what you want?',
        opts: [
          { text: 'It has no human feelings or imagination; it only follows code', isCorrect: true },
          { text: 'It is too lazy', isCorrect: false },
          { text: 'It is sleeping all day', isCorrect: false },
          { text: 'It is eating batteries', isCorrect: false }
        ],
        exp: 'Computers are deterministic machines that strictly follow instructions.'
      }
    ],
    practicalTask: {
      title: 'Be the Robot Game',
      objective: 'Practice giving and following exact sequential commands with a partner.',
      steps: [
        'Pair up with a friend: One person is the "Programmer", the other is the "Robot".',
        'The Programmer gives 3 exact commands: e.g. "Stand up", "Take 2 steps forward", "Wave right hand".',
        'The Robot must only move if the command is completely clear!',
        'Switch roles and test a new command sequence.'
      ],
      expectedResult: 'You will understand why clear syntax and parameters are necessary for computing.'
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
    goal: 'Master the concept of sequencing and algorithms by ordering steps logically to solve problems.',
    learnPoints: [
      'Understand that order (sequencing) is the foundation of computer algorithms',
      'Learn how bugs happen when steps are arranged out of order',
      'Create step-by-step recipes for digital and daily activities'
    ],
    analogy: 'An algorithm is like a delicious cake recipe: if you bake the cake before mixing the flour and eggs, you will have a big kitchen mess!',
    explanationHtml: `<h3>What is Sequencing?</h3>
<p><strong>Sequencing</strong> means putting steps in the exact order from first to last. In computer science, an ordered list of instructions that solves a problem is called an <strong>Algorithm</strong>.</p>
<h4>Why Order is Everything</h4>
<p>Consider brushing your teeth: 1. Pick up toothbrush, 2. Add toothpaste, 3. Brush teeth, 4. Rinse mouth. If you mix up the order, the task fails! Computers execute steps one by one in the exact order you write them.</p>`,
    step1: {
      title: '1. Identifying the Starting Step',
      desc: 'Determine what must be prepared first before any action can happen.',
      detail: 'Setting initial variables and getting materials ready is Step 1.',
      code: '# Step 1: Initialization\nbowl_empty = True\nmilk_ready = True\nprint("Step 1: Place bowl on table")'
    },
    step2: {
      title: '2. Following the Middle Actions in Sequence',
      desc: 'Execute each action strictly one after another without skipping.',
      detail: 'Step 2 leads to Step 3 smoothly.',
      code: 'print("Step 2: Pour cereal into bowl")\nprint("Step 3: Pour milk over cereal")'
    },
    step3: {
      title: '3. Checking the Final Goal',
      desc: 'Confirm the objective is reached and complete the sequence.',
      detail: 'The algorithm terminates when the goal is achieved.',
      code: 'print("Step 4: Pick up spoon and enjoy breakfast!")\nbreakfast_ready = True'
    },
    realScenario: 'A rocket launch computer follows an exact countdown sequence: "1. Check fuel, 2. Clear launchpad, 3. Ignite engines, 4. Lift off". Because the computer never mixes up the order, the rocket reaches space safely every single time.',
    useCases: [
      'Animation software playing drawing frames in rapid sequence to create cartoons',
      'Traffic light controllers cycling from Green → Yellow → Red in strict order',
      'Assembly line robots welding car doors in a 12-step sequence'
    ],
    simCode: 'sequence = ["1. Wash Hands", "2. Eat Lunch", "3. Wipe Table"]\nfor step in sequence:\n    print(step)',
    simOutput: '1. Wash Hands\n2. Eat Lunch\n3. Wipe Table',
    pairs: [
      { id: 'p1', term: 'Sequence', definition: 'The specific order in which steps must be performed' },
      { id: 'p2', term: 'Algorithm', definition: 'A step-by-step set of instructions to solve a task' },
      { id: 'p3', term: 'Bug', definition: 'A mistake in order or code that makes a program fail' }
    ],
    practice: {
      q: 'Which is the correct sequence for planting a flower seed?',
      opts: [
        '1. Dig soil → 2. Place seed → 3. Cover with soil → 4. Water gently',
        '1. Water gently → 2. Cover with soil → 3. Eat seed → 4. Dig soil',
        '1. Pick flower → 2. Plant seed → 3. Dig hole',
        '1. Cover with soil → 2. Dig soil → 3. Buy seed'
      ],
      correct: 0,
      exp: 'Digging the hole first allows you to place the seed, cover it, and add water so it grows.',
      hint: 'Think about what you must do before you can drop the seed into the ground.'
    },
    quizzes: [
      {
        q: 'What is a computer algorithm?',
        opts: [
          { text: 'A step-by-step recipe of instructions to complete a task', isCorrect: true },
          { text: 'A type of video game controller', isCorrect: false },
          { text: 'A broken computer screen', isCorrect: false },
          { text: 'A battery charger', isCorrect: false }
        ],
        exp: 'An algorithm is an ordered sequence of logical steps.'
      },
      {
        q: 'What happens if you reverse the order of steps in a computer program?',
        opts: [
          { text: 'The program will produce the wrong result or cause an error (bug)', isCorrect: true },
          { text: 'The computer turns into gold', isCorrect: false },
          { text: 'The program runs 100 times faster', isCorrect: false },
          { text: 'Nothing changes at all', isCorrect: false }
        ],
        exp: 'Computers follow code sequentially; reversing order changes the outcome completely.'
      }
    ],
    practicalTask: {
      title: 'Make a Paper Airplane Algorithm',
      objective: 'Write and test a 4-step sequence to build a paper glider.',
      steps: [
        'Fold a sheet of paper in half lengthwise (Step 1).',
        'Fold the top two corners down into a triangle point (Step 2).',
        'Fold the sides down to create the two wings (Step 3).',
        'Hold the center crease and test fly your airplane (Step 4)!'
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
      'Understand adaptive learning: how apps adjust difficulty based on your answers',
      'Learn how educational AI gives instant helpful hints without giving away the final answer',
      'Discover that AI is a helper for human teachers, not a replacement'
    ],
    analogy: 'Adaptive AI is like a smart bicycle with training wheels: when you are learning it supports you gently, and as you get faster and more confident, it lets you ride higher and faster on your own!',
    explanationHtml: `<h3>Smart Classrooms</h3>
<p>Schools today use smart technology to make learning fun and personalized for every student.</p>
<h4>How Adaptive Learning Works</h4>
<p>When you answer questions in a smart learning game, getting questions right unlocks fun bonus levels, while finding questions tricky triggers visual hints to help you understand without giving up!</p>`,
    step1: {
      title: '1. Checking Student Answers',
      desc: 'The app checks whether your response was correct or needs a little help.',
      detail: 'It tracks learning progress gently in real-time.',
      code: 'student_score = check_math_quiz(question_id=4, answer=8)\nif student_score == "correct":\n    streak += 1'
    },
    step2: {
      title: '2. Adjusting the Challenge Level',
      desc: 'The AI selects the next question at the perfect difficulty for you.',
      detail: 'Neither too hard nor too boring—just the right level to help you grow.',
      code: 'if streak >= 3:\n    next_level = "CHALLENGE_STARS"\nelse:\n    next_level = "GUIDED_PRACTICE"'
    },
    step3: {
      title: '3. Delivering Helpful Hints',
      desc: 'When you get stuck, a friendly mascot pops up with a clue.',
      detail: 'Visual clues guide your thinking step-by-step.',
      code: 'show_mascot_hint("Count the blue dots on the screen to find the sum!")'
    },
    realScenario: 'In a 3rd grade reading class, an AI reading app listened to students read aloud. When a student stumbled on the word "dinosaur", the app gently sounded out "die-no-saur" with an animated friendly cartoon, helping the student read the sentence happily.',
    useCases: [
      'Language apps listening to pronunciation and showing tongue positioning tips',
      'Math games giving visual fraction bars when students need help',
      'Smart library catalogs recommending books based on what you loved reading last week'
    ],
    simCode: 'score = 3\nif score >= 3:\n    print("🌟 Unlocked: Space Explorer Math Bonus Level!")\nelse:\n    print("Keep practicing with RoboBuddy!")',
    simOutput: '🌟 Unlocked: Space Explorer Math Bonus Level!',
    pairs: [
      { id: 'p1', term: 'Adaptive Learning', definition: 'Software that changes question difficulty to match your skills' },
      { id: 'p2', term: 'Hint', definition: 'A helpful clue that guides you to find the answer yourself' },
      { id: 'p3', term: 'Mascot Guide', definition: 'A friendly digital character that cheers you on while studying' }
    ],
    practice: {
      q: 'What does a smart learning app do if you miss a question?',
      opts: [
        'It offers a helpful visual hint and lets you try again',
        'It turns off the tablet forever',
        'It makes loud siren noises and laughs',
        'It erases all your favorite games'
      ],
      correct: 0,
      exp: 'Educational AI supports learners with friendly hints and encouraging practice.',
      hint: 'Think about how a good teacher helps you when you make a small mistake.'
    },
    quizzes: [
      {
        q: 'Why do schools use AI learning apps?',
        opts: [
          { text: 'To give every student personalized practice at their own pace', isCorrect: true },
          { text: 'Because teachers want to stay home and sleep', isCorrect: false },
          { text: 'To make all homework 100 pages long', isCorrect: false },
          { text: 'To stop students from reading books', isCorrect: false }
        ],
        exp: 'AI helps personalize practice so every student learns comfortably.'
      },
      {
        q: 'Who is the most important guide in your classroom?',
        opts: [
          { text: 'Your human teacher', isCorrect: true },
          { text: 'A plastic robot toy', isCorrect: false },
          { text: 'A smartphone battery', isCorrect: false },
          { text: 'A television cable', isCorrect: false }
        ],
        exp: 'Teachers inspire, care, and guide; AI is just a helpful digital assistant tool.'
      }
    ],
    practicalTask: {
      title: 'Design Your Dream AI School Helper',
      objective: 'Draw and describe an AI companion for your classroom.',
      steps: [
        'Draw your AI school helper character (robot, friendly animal, or magic star).',
        'Name your helper (e.g., Professor Pixel).',
        'List 2 superpowers it has to help you learn.',
        'Share your drawing with your teacher or classmates!'
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
      'Discover smart home devices: thermostats, smart lights, robot cleaners, and video doorbells',
      'Understand how smart devices save energy by turning off when rooms are empty',
      'Learn basic safety rules for smart appliances at home'
    ],
    analogy: 'A smart home is like a friendly house with a gentle watchdog and a caring butler: it notices when you walk in, turns on warm lights, and keeps the temperature perfect!',
    explanationHtml: `<h3>What is a Smart Home?</h3>
<p>A <strong>Smart Home</strong> connects household appliances to a central internet hub. Devices talk to each other and learn family routines to save power and provide safety.</p>`,
    step1: {
      title: '1. Detecting Presence and Sunlight',
      desc: 'Motion sensors and light meters detect whether people are inside the room.',
      detail: 'Sensors measure ambient room brightness in lux.',
      code: '# Smart Home Sensor Read\nmotion = check_motion_sensor("Living Room")\nsunlight_level = check_light_sensor()\nprint(f"Motion: {motion} | Sunlight: {sunlight_level}")'
    },
    step2: {
      title: '2. Applying Energy Saving Rules',
      desc: 'The central hub adjusts electricity use based on real-time activity.',
      detail: 'If nobody is in the bedroom for 10 minutes, the lights shut off.',
      code: 'if motion == False and time_empty > 10:\n    turn_off_lights("Living Room")\n    adjust_ac_eco_mode()'
    },
    step3: {
      title: '3. Keeping the Home Safe and Cozy',
      desc: 'Smart door locks and cameras verify that doors are securely latched at night.',
      detail: 'The family rests peacefully knowing their home is secure.',
      code: 'set_night_mode()\nprint("🌙 Night mode activated: Doors locked, nightlights on 10% brightness.")'
    },
    realScenario: 'When the Sharma family went on a weekend holiday, their smart home system lowered the water heater temperature to save electricity, kept exterior security lights on a realistic timer, and sent a phone alert when a package was safely delivered on the porch.',
    useCases: [
      'Smart AC units lowering electricity bills by running efficiently',
      'Voice-activated light switches helping people with mobility challenges',
      'Smart smoke alarms that speak an exact room location if smoke is detected'
    ],
    simCode: 'room_motion = False\nif not room_motion:\n    status = "Eco Mode: Lights OFF to save electricity 💡"\nprint("Home Hub:", status)',
    simOutput: 'Home Hub: Eco Mode: Lights OFF to save electricity 💡',
    pairs: [
      { id: 'p1', term: 'Smart Thermostat', definition: 'A temperature controller that learns family comfort preferences' },
      { id: 'p2', term: 'Smart Light', definition: 'A bulb you can control with voice, timers, or phone apps' },
      { id: 'p3', term: 'Eco Mode', definition: 'A smart setting that reduces power consumption to protect the planet' }
    ],
    practice: {
      q: 'How do smart lights help our planet?',
      opts: [
        'They turn off automatically when no one is in the room, saving power',
        'They glow in rainbow colors during thunderstorms',
        'They make toast for breakfast',
        'They change water into apple juice'
      ],
      correct: 0,
      exp: 'Turning off lights in empty rooms saves valuable electrical energy.',
      hint: 'Think about how saving electricity helps conserve natural resources.'
    },
    quizzes: [
      {
        q: 'What should you do if a smart home device makes an unexpected alert sound?',
        opts: [
          { text: 'Tell a parent or adult immediately so they can check it', isCorrect: true },
          { text: 'Hide under your blanket and ignore it', isCorrect: false },
          { text: 'Throw water on the electrical socket', isCorrect: false },
          { text: 'Hit the device with a heavy stick', isCorrect: false }
        ],
        exp: 'Always notify an adult if an alarm or smart device signals an alert.'
      },
      {
        q: 'Which device helps clean floors automatically while you play?',
        opts: [
          { text: 'A robotic vacuum cleaner', isCorrect: true },
          { text: 'A regular wooden table', isCorrect: false },
          { text: 'A plastic toy car', isCorrect: false },
          { text: 'A storybook', isCorrect: false }
        ],
        exp: 'Robotic vacuums clean carpets and floors automatically using sensors.'
      }
    ],
    practicalTask: {
      title: 'Smart Home Energy Patrol',
      objective: 'Inspect your home to find opportunities where smart energy habits help save electricity.',
      steps: [
        'Walk through your home with an adult and count how many light switches exist.',
        'Check if any lights or fans are running in empty rooms and turn them off.',
        'Draw a simple map of your house showing where 1 smart sensor could help save power.'
      ],
      expectedResult: 'You will learn how smart sensors and thoughtful habits reduce energy waste.'
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
      'Discover future careers: AI Prompt Designer, Robot Doctor, Video Game Creator, Space Tech Engineer',
      'Understand that future jobs combine human creativity, empathy, and smart computer tools',
      'Learn that every career (veterinarian, chef, architect) will use smart technology'
    ],
    analogy: 'Using AI in your future job is like having an iron superhero suit: it doesn’t replace who you are, it gives your brain superpowers to build, cure, and create faster!',
    explanationHtml: `<h3>Exciting Careers of Tomorrow</h3>
<p>As technology grows, amazing new jobs are created every year. Roles like AI Game World Designers, Wildlife Drone Pilots, and Smart City Architects unite human creativity with smart computing!</p>`,
    step1: {
      title: '1. Exploring What You Love',
      desc: 'Think about what excites you: drawing, building blocks, caring for pets, or solving puzzles.',
      detail: 'Every passion connects to exciting modern digital tools.',
      code: '# Career Dream\npassion = "Animals & Nature"\nfuture_role = "AI Wildlife Biologist"\nprint(f"Goal: Use smart sensors to protect endangered species!")'
    },
    step2: {
      title: '2. Building Core Superpowers',
      desc: 'Practice curiosity, teamwork, reading, and logical thinking.',
      detail: 'Human creativity is the most valuable tool in any career.',
      code: 'skills = ["Curiosity", "Problem Solving", "Teamwork", "Kindness"]\nprint("Building daily habits:", skills)'
    },
    step3: {
      title: '3. Teaming Up with Smart Technology',
      desc: 'Learn how software assists your work to bring big dreams to life.',
      detail: 'AI handles heavy calculations while you provide vision and heart.',
      code: 'project = create_future_invention(human_creativity=True, ai_compute=True)\nprint("Invention Ready: Clean Ocean Solar Boat!")'
    },
    realScenario: 'An agricultural scientist used AI drone cameras to scan 1,000 apple trees in 10 minutes. The AI spotted 3 trees that needed extra water, helping the farmer save water and harvest delicious, healthy apples for the whole town.',
    useCases: [
      'Doctors using surgical robotics to perform tiny operations safely',
      'Fashion designers using 3D AI modeling to create zero-waste clothing',
      'Chefs using smart ovens that cook bread to golden perfection every morning'
    ],
    simCode: 'dream_job = "Robot Explorer Designer"\nmission = "Build rovers that search for water on Mars 🚀"\nprint("My Future Career:", dream_job)\nprint("Mission:", mission)',
    simOutput: 'My Future Career: Robot Explorer Designer\nMission: Build rovers that search for water on Mars 🚀',
    pairs: [
      { id: 'p1', term: 'AI Game Designer', definition: 'Creates characters, magical quests, and smart gameplay worlds' },
      { id: 'p2', term: 'Robotics Engineer', definition: 'Builds physical metal robot helpers with motors and sensors' },
      { id: 'p3', term: 'Wildlife Biologist', definition: 'Uses smart tracking collars and drones to protect wild animals' }
    ],
    practice: {
      q: 'Which skill will always be important for humans in the future?',
      opts: [
        'Creative thinking, empathy, and kindness to others',
        'Memorizing the entire phone book by heart',
        'Never speaking to anyone all day',
        'Doing math on paper with no mistakes for 20 hours'
      ],
      correct: 0,
      exp: 'Human empathy, imagination, and ethics are uniquely human strengths.',
      hint: 'Think about the qualities that make humans special and compassionate.'
    },
    quizzes: [
      {
        q: 'How will doctors use AI in the future?',
        opts: [
          { text: 'To analyze medical scans faster and find cures for diseases', isCorrect: true },
          { text: 'To turn patients into robots', isCorrect: false },
          { text: 'To replace hospital beds with trampolines', isCorrect: false },
          { text: 'To stop giving medicine', isCorrect: false }
        ],
        exp: 'Doctors use AI tools to detect illnesses early and plan effective treatments.'
      },
      {
        q: 'Can an artist or musician use AI?',
        opts: [
          { text: 'Yes! They use AI as a creative partner to explore new colors, beats, and ideas', isCorrect: true },
          { text: 'No, computers destroy all art forever', isCorrect: false },
          { text: 'No, AI only likes math and dislikes colors', isCorrect: false },
          { text: 'Only on Mondays', isCorrect: false }
        ],
        exp: 'Creative artists use AI tools to draft concepts, experiment with sounds, and render 3D art.'
      }
    ],
    practicalTask: {
      title: 'Future Job Badge Creator',
      objective: 'Invent a future career title and draw your professional technology badge.',
      steps: [
        'Invent a future job title (e.g., Deep Sea AI Explorer, Solar City Engineer).',
        'Draw an official job badge showing a tool you will use.',
        'Write 2 sentences explaining how your future job will help people or protect nature.'
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
    goal: 'Meet the pioneering scientists, coders, and ethical creators behind modern computing and learn how diverse teams build software.',
    learnPoints: [
      'Discover Ada Lovelace, the world’s first computer programmer, and Alan Turing, pioneer of AI',
      'Understand what Software Engineers, Data Scientists, and UX Designers do',
      'Learn that making technology requires team collaboration and diverse ideas'
    ],
    analogy: 'Building a great software app is like building a skyscraper: architects design the blueprints (UX Designers), builders assemble the steel beams (Engineers), and inspectors ensure it is safe for everyone (Testers & Ethics Specialists)!',
    explanationHtml: `<h3>The Pioneers of Computing</h3>
<p>Every piece of technology you enjoy was created by curious, hardworking people like Ada Lovelace, who wrote the world's first algorithm in 1843!</p>`,
    step1: {
      title: '1. Designing the Idea (Architects & Designers)',
      desc: 'Creative thinkers brainstorm what problem the app will solve for people.',
      detail: 'They draw wireframes showing buttons and friendly mascots.',
      code: '# Project Plan\napp_name = "Reading Buddy"\nmission = "Help children learn pronunciation with colorful phonics!"'
    },
    step2: {
      title: '2. Writing the Code (Software Engineers)',
      desc: 'Developers write Python instructions to turn the design into a working program.',
      detail: 'They test every line of code to make sure it runs without errors.',
      code: 'def pronounce_word(word):\n    audio = generate_phonics(word)\n    play_speaker(audio)\n    return "Word pronounced clearly!"'
    },
    step3: {
      title: '3. Testing for Safety and Fairness (Quality & Ethics)',
      desc: 'Testers verify the app works smoothly on all devices and protects child privacy.',
      detail: 'The app is polished before being released to schools and families.',
      code: 'run_safety_checks()\nprint("✅ App verified safe, friendly, and privacy-protected!")'
    },
    realScenario: 'A team of 4 college students from different backgrounds teamed up for a weekend hackathon. Combining artistic drawing, Python coding, and user testing, they created a sign-language translation app that helps deaf children communicate with their hearing teachers.',
    useCases: [
      'Engineers coding flight control software that keeps airplanes on steady autopilot',
      'Scientists analyzing satellite photos to detect forest fires early',
      'Artists modeling 3D characters for animated movies and educational games'
    ],
    simCode: 'team = ["1. Programmer (Python Code)", "2. Artist (Graphics & UI)", "3. Tester (Safety & Bugs)"]\nfor member in team:\n    print("Team Role:", member)',
    simOutput: 'Team Role: 1. Programmer (Python Code)\nTeam Role: 2. Artist (Graphics & UI)\nTeam Role: 3. Tester (Safety & Bugs)',
    pairs: [
      { id: 'p1', term: 'Ada Lovelace', definition: 'The world’s first computer programmer who wrote the first algorithm' },
      { id: 'p2', term: 'Software Engineer', definition: 'A person who writes code to build computer software and apps' },
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
      exp: 'Ada Lovelace published the first computer algorithm in 1843 for the Analytical Engine.',
      hint: 'Look for the famous 19th-century mathematician celebrated on Ada Lovelace Day.'
    },
    quizzes: [
      {
        q: 'Why do computer teams need different kinds of people?',
        opts: [
          { text: 'Because great apps need code, art, security, and diverse creative ideas', isCorrect: true },
          { text: 'So they can eat more snacks', isCorrect: false },
          { text: 'Because one person is only allowed to type 5 letters a day', isCorrect: false },
          { text: 'So they can argue all day', isCorrect: false }
        ],
        exp: 'Diverse teams bring together engineering, design, accessibility, and ethics.'
      },
      {
        q: 'What is a "Bug Tester" responsible for?',
        opts: [
          { text: 'Finding mistakes in the software before real students use it', isCorrect: true },
          { text: 'Catching grasshoppers in the garden', isCorrect: false },
          { text: 'Painting walls with green paint', isCorrect: false },
          { text: 'Eating computer cables', isCorrect: false }
        ],
        exp: 'Quality assurance testers discover and fix bugs so software works reliably.'
      }
    ],
    practicalTask: {
      title: 'App Creator Team Roleplay',
      objective: 'Plan a software project by assigning responsibilities to your team members.',
      steps: [
        'Imagine creating a new educational app for your school.',
        'Assign 3 roles: Programmer, Artist, and Safety Tester.',
        'Write down 1 main feature your app will have and how each role contributes to it.'
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
      'Learn the difference between vague prompts ("Animals") and great prompts ("Explain how Emperor Penguins stay warm in Antarctica")',
      'Practice asking follow-up questions to explore topics deeply'
    ],
    analogy: 'Asking an AI a prompt is like using a magnifying glass on a treasure map: if you point it randomly at the ocean you see nothing, but if you focus on the island marked X, you find gold!',
    explanationHtml: `<h3>The Power of a Great Question</h3>
<p>When you ask a computer a question, your words are called a <strong>Prompt</strong>. AI models read your prompt word by word to predict the most helpful response.</p>`,
    step1: {
      title: '1. Choosing a Specific Topic',
      desc: 'Pick an exact subject you are curious about instead of a broad single word.',
      detail: 'Focusing on one specific question helps the AI find detailed facts.',
      code: '# Prompt Crafting\ntopic = "How honeybees make honey from nectar"\naudience = "Class 3 Student"\nformat_style = "3 fun bullet points"'
    },
    step2: {
      title: '2. Adding Helpful Constraints',
      desc: 'Tell the AI how long the answer should be and what format to use.',
      detail: 'Specifying length prevents getting a giant wall of confusing text.',
      code: 'prompt = f"Explain {topic} in {format_style} using simple words for a {audience}."'
    },
    step3: {
      title: '3. Reading and Asking Follow-Up Questions',
      desc: 'Read the response, think about what you learned, and ask another question.',
      detail: 'Follow-ups let you explore deeper into the topic.',
      code: 'follow_up = "How do bees communicate where flowers are located?"\nprint("Exploring deeper with follow-up question...")'
    },
    realScenario: 'A student preparing a science fair poster on volcanoes asked an AI helper: "What are the 3 main types of volcanoes and what happens when they erupt? Explain with everyday analogies." The AI compared shield volcanoes to pancake batter and stratovolcanoes to shaken soda bottles, making the presentation a hit!',
    useCases: [
      'Asking AI to explain complex history events in story format',
      'Requesting practice quiz questions on times tables before a school test',
      'Generating fun science experiment ideas using simple kitchen supplies'
    ],
    simCode: 'prompt = "Explain why rainbows have 7 colors in 2 simple sentences."\nresponse = "When sunlight passes through raindrops in the air, the light bends and splits into seven beautiful colors like a glass prism!"\nprint("Prompt:", prompt)\nprint("AI Answer:", response)',
    simOutput: 'Prompt: Explain why rainbows have 7 colors in 2 simple sentences.\nAI Answer: When sunlight passes through raindrops in the air, the light bends and splits into seven beautiful colors like a glass prism!',
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
        'Tell me everything that ever happened in the universe right now',
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
          { text: 'The plastic cover of the laptop keyboard', isCorrect: false },
          { text: 'The battery inside a mouse', isCorrect: false },
          { text: 'The sound of a printer paper jam', isCorrect: false }
        ],
        exp: 'Prompts are the input texts and queries that guide generative AI responses.'
      },
      {
        q: 'What should you do if an AI gives an answer that feels too long or complicated?',
        opts: [
          { text: 'Ask: "Can you explain that again using simpler words for a 3rd grader?"', isCorrect: true },
          { text: 'Throw the tablet on the floor', isCorrect: false },
          { text: 'Pretend you understood it even if you are confused', isCorrect: false },
          { text: 'Delete all your homework', isCorrect: false }
        ],
        exp: 'You can always ask the AI to simplify, summarize, or provide analogies.'
      }
    ],
    practicalTask: {
      title: 'Prompt Detective Challenge',
      objective: 'Practice writing 3 Super Prompts on your favorite science topic.',
      steps: [
        'Choose a favorite animal (e.g., Cheetah, Dolphin, Chameleon).',
        'Write 1 Super Prompt with: Topic + Format + Audience.',
        'Read the answer with an adult and write down 1 fascinating fact you learned.'
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
    analogy: 'Doodle recognition AI is like a friend playing Pictionary with you: with every pen stroke you draw, it compares your lines against millions of drawings it has seen to guess what you are creating!',
    explanationHtml: `<h3>How Computers "See" Your Drawings</h3>
<p>When you draw on a tablet screen, your finger leaves a trail of digital coordinates (X, Y points). The computer records the direction of your pen strokes, how curved they are, and the order you drew them.</p>`,
    step1: {
      title: '1. Tracking Pen Strokes in Real Time',
      desc: 'The screen records the coordinates and velocity of your finger as you sketch.',
      detail: 'Every curve is converted into mathematical vector strokes.',
      code: '# Stroke Tracker\nstroke_points = [(10, 20), (15, 30), (25, 45), (40, 50)]\ncurvature = calculate_curve(stroke_points)\nprint("Stroke captured: Circular Arc")'
    },
    step2: {
      title: '2. Matching Against Million-Drawing Databases',
      desc: 'The model checks your stroke pattern against 50 million sketches drawn by people worldwide.',
      detail: 'It ranks the top 3 most likely matching objects.',
      code: 'predictions = model.predict(stroke_points)\n# Output: [("Cat", 88%), ("Tiger", 8%), ("Teddy Bear", 4%)]\nprint("AI Guesses:", predictions[0][0])'
    },
    step3: {
      title: '3. Suggesting Beautiful Finished Art',
      desc: 'The tool offers polished vector clipart matching your sketch so you can color and build.',
      detail: 'You choose the best artwork and customize colors.',
      code: 'display_suggestions(["🐱 Cute Cat", "🐯 Happy Tiger"])\napply_color_palette("#FFB703")'
    },
    realScenario: 'In an art lesson, students used an AI drawing tool to design an ocean conservation poster. When students scribbled a simple fish outline, the AI suggested 10 clean marine illustrations (clownfish, sea turtle, coral reef), helping them create a stunning poster for the school hallway.',
    useCases: [
      'Google Quick, Draw! testing machine learning stroke recognition with millions of players',
      'AutoDraw helping teachers and students create clean diagrams quickly',
      'AI color palette generators suggesting harmonious pastel or vibrant color themes'
    ],
    simCode: 'doodle_strokes = ["Circle head", "Two triangle ears", "Whiskers"]\nif "Whiskers" in doodle_strokes and "triangle ears" in doodle_strokes[1]:\n    guess = "🐱 Cat"\nprint("AI Guess:", guess)',
    simOutput: 'AI Guess: 🐱 Cat',
    pairs: [
      { id: 'p1', term: 'Stroke', definition: 'A single continuous line drawn on a digital touchscreen' },
      { id: 'p2', term: 'Pattern Recognition', definition: 'The AI matching shapes and curves to known drawing objects' },
      { id: 'p3', term: 'Vector Clipart', definition: 'Clean, professional digital artwork suggested by the drawing app' }
    ],
    practice: {
      q: 'How does a doodle-guessing AI know what you are drawing?',
      opts: [
        'It compares your line strokes and shapes against millions of drawings in its database',
        'It uses a crystal ball to read your mind',
        'It peeks at your sketchbook with a secret spy glass',
        'It always guesses a potato for every drawing'
      ],
      correct: 0,
      exp: 'AI neural networks recognize stroke order, curves, and geometric patterns.',
      hint: 'Think about how the computer matches visual line patterns to known objects.'
    },
    quizzes: [
      {
        q: 'What is Google Quick, Draw! an example of?',
        opts: [
          { text: 'An AI game that learns how people around the world draw everyday objects', isCorrect: true },
          { text: 'A tool for washing paintbrushes', isCorrect: false },
          { text: 'A store that sells coloring pencils', isCorrect: false },
          { text: 'A keyboard typing speed test', isCorrect: false }
        ],
        exp: 'Quick, Draw! is a global research dataset for machine learning pattern recognition.'
      },
      {
        q: 'Can AI replace human creativity in art?',
        opts: [
          { text: 'No, human artists provide the imagination, stories, and emotions behind the artwork', isCorrect: true },
          { text: 'Yes, no human will ever draw anything again', isCorrect: false },
          { text: 'Yes, computers have human feelings and memories', isCorrect: false },
          { text: 'Only on Mondays', isCorrect: false }
        ],
        exp: 'AI is a tool that assists creativity; human vision and feeling drive real art.'
      }
    ],
    practicalTask: {
      title: 'Shape to Superhero Transformation',
      objective: 'Draw 3 simple geometric shapes and transform them into imaginative characters.',
      steps: [
        'Draw a square, a circle, and a triangle on a blank sheet of paper.',
        'Add eyes, gadgets, and superhero capes to turn each shape into a smart helper robot.',
        'Write 1 line describing the super gadget each shape helper carries.'
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
      'Memorize the "Private Information List": Name, Address, School, Passwords, Phone Numbers',
      'Understand why personal information must never be typed into public chatbots',
      'Know the Golden Rule of Online Safety: Always inform a trusted adult if something feels wrong'
    ],
    analogy: 'Your personal information is like your house key: you keep it safely in your pocket and never hand it out to strangers passing by on the street!',
    explanationHtml: `<h3>Golden Rules of Digital Safety</h3>
<p>The internet and AI tools are full of wonder, but just like crossing a busy street, we need smart safety habits to stay protected.</p>`,
    step1: {
      title: '1. Spotting Private Data Requests',
      desc: 'Check every prompt and form before typing to ensure no personal secrets are entered.',
      detail: 'If an app asks for your phone number or address, STOP.',
      code: '# Safety Privacy Filter\nuser_input = "My address is 123 Maple Street"\nif contains_private_info(user_input):\n    block_transmission()\n    print("⚠️ Privacy Alert: Never enter home addresses online!")'
    },
    step2: {
      title: '2. Keeping Passwords Super Secret',
      desc: 'Use strong passwords and never share them with anyone except your parents.',
      detail: 'Do not share passwords even with your best school friends.',
      code: 'password = "SuperSecretPassword123!"\n# Rule: Share ONLY with parents/guardians'
    },
    step3: {
      title: '3. Talking to a Trusted Adult',
      desc: 'Whenever an online message makes you feel uncomfortable or confused, tell an adult immediately.',
      detail: 'Teachers and parents are your safety champions.',
      code: 'notify_trusted_adult("Teacher / Parent assistance requested")'
    },
    realScenario: 'While playing a free online puzzle game, a pop-up window appeared saying: "You won a free iPad! Enter your home address to claim it!" A smart 3rd grader remembered their safety rules, immediately called their teacher, and the teacher closed the unsafe scam pop-up safely.',
    useCases: [
      'Schools using safe filtered AI search engines that block unsafe websites',
      'Kids creating fun usernames (like StarExplorer88) instead of using their real names',
      'Parents setting screen time limits to maintain a healthy balance between digital and outdoor play'
    ],
    simCode: 'message = "Enter your secret password to get 100 free game coins!"\nif "password" in message.lower():\n    action = "🚨 BLOCK & TELL PARENT IMMEDIATELY"\nprint("Safety Shield:", action)',
    simOutput: 'Safety Shield: 🚨 BLOCK & TELL PARENT IMMEDIATELY',
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
      exp: 'Sharing favorite colors or fun school topics is safe; never share private contact details.',
      hint: 'Look for the option that talks about fun favorite things rather than private locations.'
    },
    quizzes: [
      {
        q: 'What should you do if an online app asks for your home address?',
        opts: [
          { text: 'Do not enter it, and ask a parent or teacher immediately', isCorrect: true },
          { text: 'Type it in right away', isCorrect: false },
          { text: 'Give them your friend’s address instead', isCorrect: false },
          { text: 'Type it in 5 times fast', isCorrect: false }
        ],
        exp: 'Never share home addresses online without an adult’s permission.'
      },
      {
        q: 'Who is the only person you should share your computer password with?',
        opts: [
          { text: 'Your parents or guardians', isCorrect: true },
          { text: 'A stranger in an online game chat', isCorrect: false },
          { text: 'A random popup advertisement', isCorrect: false },
          { text: 'Everyone on the school bus', isCorrect: false }
        ],
        exp: 'Passwords must only be shared with your parents/guardians.'
      }
    ],
    practicalTask: {
      title: 'Digital Privacy Shield Badge',
      objective: 'Create a personal Safety Shield checklist for your study desk.',
      steps: [
        'Draw a colorful shield on a card with 3 sections: 1. Passwords Safe, 2. Address Private, 3. Tell an Adult.',
        'Sign your name at the bottom as a certified "Digital Safety Guardian".',
        'Tape the card near your computer desk as a reminder.'
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
      'Understand what a Digital Footprint is: the trail of words, photos, and clicks left online',
      'Learn the "THINK" test before sharing: Is it True? Helpful? Inspiring? Necessary? Kind?',
      'Respect copyright: always give credit when using someone else’s art or photos'
    ],
    analogy: 'Sharing on the internet is like writing in wet cement: once it dries, it stays there forever for anyone to see, so make sure you leave behind something kind and beautiful!',
    explanationHtml: `<h3>Your Digital Footprint</h3>
<p>Every time you send a message, post a drawing, or play a game online, you leave behind a trail called your <strong>Digital Footprint</strong>.</p>`,
    step1: {
      title: '1. Thinking Before Clicking "Send"',
      desc: 'Pause for 5 seconds to review your message through the eyes of others.',
      detail: 'Make sure your words are respectful and encouraging.',
      code: '# THINK Filter\nmessage = "Great project! I loved your dinosaur drawing!"\nif is_kind(message) and is_truthful(message):\n    allow_post()'
    },
    step2: {
      title: '2. Protecting Friends’ Privacy Too',
      desc: 'Never post photos or secrets of your classmates without asking their permission first.',
      detail: 'Being a good digital citizen means protecting your friends as well.',
      code: 'if has_friend_permission == True:\n    share_group_project_photo()'
    },
    step3: {
      title: '3. Giving Credit to Creators (Attribution)',
      desc: 'Always say where you found photos, music, or facts used in your school slides.',
      detail: 'Respecting copyright celebrates hardworking artists and scientists.',
      code: 'citation = "Photo Credit: NASA Solar Observatory"\nadd_footer_to_slide(citation)'
    },
    realScenario: 'A group of students made a presentation about recycling. Instead of copying pictures without asking, they used free educational photos from their school library and added clean captions giving credit to the photographers. The school principal awarded them the "Best Digital Citizenship" ribbon!',
    useCases: [
      'Writing positive, encouraging comments on classmates’ shared digital projects',
      'Asking your friend "Is it okay if I show this funny photo to my mom?" before sending',
      'Using public domain and Creative Commons educational photos in school presentations'
    ],
    simCode: 'comment = "You did a fantastic job on this volcano model! 🌋"\nprint("Running THINK Test: Passed Kind & Helpful!")\nprint("Comment Shared:", comment)',
    simOutput: 'Running THINK Test: Passed Kind & Helpful!\nComment Shared: You did a fantastic job on this volcano model! 🌋',
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
          { text: 'Is it Kangaroo?', isCorrect: false },
          { text: 'Is it Karate?', isCorrect: false },
          { text: 'Is it Ketchup?', isCorrect: false }
        ],
        exp: 'K stands for Kind: always ensure your online messages are considerate and respectful.'
      },
      {
        q: 'What is a Digital Footprint?',
        opts: [
          { text: 'The trail of information, photos, and messages left behind online', isCorrect: true },
          { text: 'A muddy shoe print on your computer screen', isCorrect: false },
          { text: 'A special battery charger for socks', isCorrect: false },
          { text: 'A video game about walking', isCorrect: false }
        ],
        exp: 'Your digital footprint is the permanent record of your online activity.'
      }
    ],
    practicalTask: {
      title: 'The Kindness Pledge Card',
      objective: 'Write and sign a personal Digital Citizenship promise.',
      steps: [
        'Write out the 5 letters of T.H.I.N.K. on a colorful index card.',
        'Write 1 sentence beside each letter (e.g. T = I will only share True facts).',
        'Read your pledge aloud to your family or teacher and keep it in your school binder.'
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
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // CLASS 4 TOPICS
  // ═════════════════════════════════════════════════════════════════════════════

  'where is ai hiding?': {
    title: 'Where Is AI Hiding?',
    hook: 'Did you know that AI is already hiding inside your television remote, your smartphone camera, and video game characters?',
    goal: 'Identify the invisible AI systems embedded in daily gadgets, streaming platforms, camera autofocus, and auto-correct.',
    learnPoints: [
      'Spot AI in everyday life: camera portrait mode, autocomplete text, streaming recommendations',
      'Understand how AI works quietly in the background to simplify daily tasks',
      'Distinguish between regular electronics and AI-augmented software'
    ],
    analogy: 'AI in daily life is like an invisible helpful assistant sitting inside your smartphone: when you type a message with a typo, it gently taps the right letter into place before you even notice!',
    explanationHtml: `<h3>The Hidden AI All Around Us</h3>
<p>You don't need a giant walking robot to see artificial intelligence. AI is built quietly into apps you use every single day:</p>
<h4>1. Smartphone Camera Portrait Mode</h4>
<p>When you take a photo, AI looks at every pixel, recognizes human hair and shoulders, and softly blurs the background to make the photo look like it was taken by a professional photographer.</p>
<h4>2. Keyboard Auto-Complete & Spell Check</h4>
<p>As you type <em>"How r u"</em>, the keyboard AI predicts you mean <em>"How are you"</em> by checking billions of common sentence patterns.</p>
<h4>3. Movie & Video Recommendations</h4>
<p>If you watch 3 cartoon episodes about space rockets, the streaming app’s recommendation AI suggests a cool space documentary next!</p>`,
    step1: {
      title: '1. Detecting Patterns in User Actions',
      desc: 'The software records what movies you enjoy or what words you type frequently.',
      detail: 'It builds a preference profile without storing private secrets.',
      code: '# Video Preference Tracker\nliked_genres = ["Space", "Robots", "Dinosaurs"]\ncurrent_watch = "Moon Explorer Episode 1"'
    },
    step2: {
      title: '2. Running Background Prediction Algorithms',
      desc: 'Recommendation algorithms match your preferences against thousands of available shows.',
      detail: 'It calculates match percentages for top suggested videos.',
      code: 'suggested_show = find_top_match(liked_genres, database)\nprint("Next Suggested Show:", suggested_show)'
    },
    step3: {
      title: '3. Delivering Seamless Enhancements',
      desc: 'The app shows the suggestion on your home screen or fixes the spelling typo instantly.',
      detail: 'The user gets a fast, effortless experience.',
      code: 'display_carousel_item("Recommended For You: Rover Adventure 3D")'
    },
    realScenario: 'A student was typing a book report on the solar system and accidentally typed "Jupitr is the bigest planet". The word processor’s AI spell checker automatically underlined the typos and suggested "Jupiter" and "biggest", helping the student submit a clean, polished report.',
    useCases: [
      'Streaming services suggesting music you will love based on your listening history',
      'Smartphone navigation apps avoiding traffic jams by analyzing live road speeds',
      'Email filters automatically sorting junk spam into the trash folder'
    ],
    simCode: 'history = ["Cat cartoon", "Dog rescue story"]\nif "Cat" in history[0] or "Dog" in history[1]:\n    recommendation = "Cute Animals of the African Safari"\nprint("Recommended for You:", recommendation)',
    simOutput: 'Recommended for You: Cute Animals of the African Safari',
    pairs: [
      { id: 'p1', term: 'Recommendation System', definition: 'An AI that suggests songs, movies, or books based on your taste' },
      { id: 'p2', term: 'Autocorrect', definition: 'Software that detects spelling mistakes and predicts intended words' },
      { id: 'p3', term: 'Spam Filter', definition: 'An AI security guard that blocks unwanted junk emails' }
    ],
    practice: {
      q: 'Which of these features uses hidden AI in a smartphone?',
      opts: [
        'Camera recognizing human faces and focusing automatically',
        'The glass screen reflecting light',
        'The metal screws holding the phone together',
        'The plastic phone case color'
      ],
      correct: 0,
      exp: 'Face detection in camera apps uses computer vision AI models.',
      hint: 'Look for the software feature that analyzes visual camera pixels.'
    },
    quizzes: [
      {
        q: 'How does a music streaming app know what songs you might like?',
        opts: [
          { text: 'By analyzing the tempo, artists, and genres of songs you listened to before', isCorrect: true },
          { text: 'By flipping a coin in the server room', isCorrect: false },
          { text: 'By asking the weather forecaster', isCorrect: false },
          { text: 'It plays only 1 song forever', isCorrect: false }
        ],
        exp: 'Recommendation engines analyze historical listening patterns to find similar tracks.'
      },
      {
        q: 'What is the purpose of an email spam filter?',
        opts: [
          { text: 'To automatically catch and hide dangerous or annoying junk mail', isCorrect: true },
          { text: 'To delete all your homework files', isCorrect: false },
          { text: 'To change your font color to purple', isCorrect: false },
          { text: 'To turn off your computer monitor', isCorrect: false }
        ],
        exp: 'Spam filters use text classification AI to protect your inbox from scams.'
      }
    ],
    practicalTask: {
      title: 'Hidden AI Detective Hunt',
      objective: 'Find 3 invisible AI features on a smartphone or computer with an adult.',
      steps: [
        'Open a camera app: Point it at a person and see if a yellow/white box appears around their face (Computer Vision).',
        'Open a text message app: Type "Tomorow I will" and see what 3 words appear above the keyboard (Predictive Text).',
        'Write down these 2 AI discoveries and explain how they help people save time.'
      ],
      expectedResult: 'You will spot real-world AI features operating inside everyday devices.'
    },
    recall: {
      q: 'Where does AI hide in our daily lives?',
      a: 'Inside cameras, search engines, keyboards, navigation apps, and streaming platforms!'
    },
    takeaways: [
      'AI is built quietly into apps to make tasks faster, safer, and more convenient.',
      'Features like autocorrect, portrait mode, and recommendations use pattern recognition.',
      'Understanding where AI is used helps us become smart, observant digital citizens.'
    ]
  },

  'meet the smart machines': {
    title: 'Meet the Smart Machines',
    hook: 'How can a self-driving car navigate city streets, stop for pedestrians, and read red traffic lights with no driver at the steering wheel?',
    goal: 'Explore autonomous vehicles, warehouse sorting robots, and robotic surgery assistants, and understand how sensors and AI work together.',
    learnPoints: [
      'Discover autonomous machines: self-driving cars, delivery drones, warehouse robots',
      'Learn how LiDAR, radar, and cameras give robots 360-degree vision',
      'Understand how robotic arms assemble cars and pack packages in seconds'
    ],
    analogy: 'A self-driving car is like a smart guide dog on wheels: it uses its eyes (cameras) and hearing (radar) to keep its passenger completely safe while navigating streets!',
    explanationHtml: `<h3>Robots with Brains and Senses</h3>
<p>Modern robots don't just repeat fixed mechanical motions; they react intelligently to dynamic changes in the real world.</p>
<h4>How Self-Driving Cars See</h4>
<ul>
  <li><strong>LiDAR (Laser Radar):</strong> Bounces millions of laser pulses per second to create a 3D millimeter-accurate map of the street.</li>
  <li><strong>High-Resolution Cameras:</strong> Read street speed signs, detect green/red traffic lights, and spot lane markings.</li>
  <li><strong>AI Neural Brain:</strong> Predicts if a bicyclist is about to turn left and slows down the vehicle safely.</li>
</ul>
<h4>Warehouse Sorting Robots</h4>
<p>Thousands of compact orange robots zip across giant fulfillment centers, lifting heavy shelves and carrying packages directly to human packing stations without ever colliding!</p>`,
    step1: {
      title: '1. 360-Degree Environmental Perception',
      desc: 'Sensors take 60 measurements per second in every direction around the machine.',
      detail: 'Cameras, LiDAR, and ultrasonic sensors fuse into a unified 3D digital map.',
      code: '# Sensor Fusion Perception\nlidar_points = scan_3d_lidar()\ncamera_frames = capture_all_cameras()\nobjects = detect_pedestrians_and_cars(lidar_points, camera_frames)'
    },
    step2: {
      title: '2. Trajectory & Motion Planning',
      desc: 'The AI plans a safe driving path 5 seconds into the future.',
      detail: 'It maintains a 3-second safe braking cushion behind other cars.',
      code: 'target_speed = 40 # km/h\nif red_light_ahead or pedestrian_in_crosswalk:\n    target_speed = 0\n    apply_brakes(smoothness="GENTLE")'
    },
    step3: {
      title: '3. Actuator Control & Steering',
      desc: 'Electronic motors steer the wheels and adjust acceleration smoothly.',
      detail: 'Passengers enjoy a smooth, safe ride to their destination.',
      code: 'steer_wheels(angle=0.0)\nset_motor_power(target_speed)'
    },
    realScenario: 'In a major city, an autonomous electric shuttle transported 500 passengers between the train station and a children’s hospital every day with zero traffic accidents, stopping gently whenever squirrels or children ran near the curb.',
    useCases: [
      'Self-driving shuttles providing green public transportation in modern cities',
      'Warehouse robots moving heavy 500kg pallets across logistics centers safely',
      'Agricultural weeding robots using computer vision to pluck weeds while sparing crops'
    ],
    simCode: 'sensor_distance = 15 # meters\ntraffic_light = "RED"\nif traffic_light == "RED" or sensor_distance < 5:\n    car_action = "STOP smoothly before the white line 🛑"\nprint("Autonomous Car:", car_action)',
    simOutput: 'Autonomous Car: STOP smoothly before the white line 🛑',
    pairs: [
      { id: 'p1', term: 'LiDAR', definition: 'Laser sensor that measures distance by bouncing light beams off objects' },
      { id: 'p2', term: 'Autonomous Vehicle', definition: 'A car or shuttle that drives itself safely using sensors and AI' },
      { id: 'p3', term: 'Sensor Fusion', definition: 'Combining camera, radar, and laser data into one accurate 3D view' }
    ],
    practice: {
      q: 'What sensor allows a self-driving car to read the color of a traffic light?',
      opts: [
        'High-resolution digital cameras with color recognition',
        'A temperature thermometer',
        'A tire air pressure gauge',
        'A radio antenna'
      ],
      correct: 0,
      exp: 'Cameras capture visual color spectrum pixels to detect red, yellow, and green lights.',
      hint: 'Think about which sensor captures visual colors just like human eyes.'
    },
    quizzes: [
      {
        q: 'Why are warehouse robots helpful in large shipping centers?',
        opts: [
          { text: 'They carry heavy shelves and organize millions of packages safely and quickly', isCorrect: true },
          { text: 'They eat all the cardboard boxes', isCorrect: false },
          { text: 'They sleep on the floor and block the doors', isCorrect: false },
          { text: 'They throw packages out the windows', isCorrect: false }
        ],
        exp: 'Warehouse robots prevent human injuries from heavy lifting and speed up shipping.'
      },
      {
        q: 'What does "Autonomous" mean in robotics?',
        opts: [
          { text: 'Able to operate and make decisions independently without human remote control', isCorrect: true },
          { text: 'Powered only by wind sails', isCorrect: false },
          { text: 'Painted bright yellow', isCorrect: false },
          { text: 'Made entirely out of paper', isCorrect: false }
        ],
        exp: 'Autonomous systems navigate and act independently using onboard sensors and AI.'
      }
    ],
    practicalTask: {
      title: 'Autonomous Rover Obstacle Course',
      objective: 'Draw a top-down obstacle course and map the sensor rules a robot needs to navigate it.',
      steps: [
        'Draw a 4x4 grid maze with 2 obstacles (rocks, puddle) and 1 goal (charging dock).',
        'Draw the path your rover must take from (0,0) to the goal.',
        'Write 3 IF-THEN sensor rules: e.g., "IF obstacle ahead, THEN turn right 90 degrees".'
      ],
      expectedResult: 'You will understand how autonomous path planning works in robotics.'
    },
    recall: {
      q: 'How do self-driving cars see their surroundings in 3D?',
      a: 'Using Sensor Fusion: combining LiDAR laser beams, radar, and high-resolution cameras!'
    },
    takeaways: [
      'Smart autonomous machines use sensors to perceive and navigate complex environments.',
      'Self-driving cars use LiDAR and cameras to read lights, signs, and protect pedestrians.',
      'Warehouse and medical robots assist humans with precision, strength, and safety.'
    ]
  }
}
