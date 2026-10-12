// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC JUNIOR AI OLYMPIAD CURRICULUM: CLASS 4 (12 DISTINCT LESSONS)
// Elementary AI & Algorithmic Patterns • Ages 9-10
// Authoritative Syllabus: Chapters 1-6 (2 Lessons per Chapter)
// Reference: AI Olympiad Book – Std 4 & Official Primary Syllabus Specs
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS4_TOPIC_PROFILES: Record<string, TopicProfile> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 1: AI BASICS (Elementary Intelligence, Everyday Places & Machines)
  // ═══════════════════════════════════════════════════════════════════════════

  'where is ai hiding?': {
    title: 'Where Is AI Hiding?',
    hook: 'Robo-Pi has a mystery: AI is secretly living inside your living room, your TV remote, and your camera. Can you spot the invisible brain?',
    goal: 'Identify the invisible AI systems embedded in daily gadgets, streaming platforms, camera portrait mode, autocomplete keyboards, and voice helpers.',
    learnPoints: [
      'Spot AI hiding in everyday devices: camera portrait mode, keyboard autocorrect, and video recommendations',
      'Distinguish between normal machines (switch on/off) and AI machines (learn from data and patterns)',
      'Understand that AI needs data just like humans need food to grow and learn'
    ],
    analogy: 'AI in daily life is like an invisible helpful assistant sitting inside your smartphone: when you type a message with a typo, it gently taps the right letter into place before you even notice!',
    explanationHtml: `<h3>The Secret Helper in Everyday Gadgets</h3>
<p>Hello young scientist! You don\'t need a giant metal robot with flashing eyes to see Artificial Intelligence. AI is like a secret helper built quietly into everyday apps and gadgets.</p>
<h4>1. How to Tell a Normal Machine from an AI Machine</h4>
<ul>
  <li><strong>Normal Machine:</strong> Follows fixed manual buttons and never gets smarter. Example: A wooden ruler, a pencil, or a ceiling fan with only a switch.</li>
  <li><strong>AI Machine:</strong> Collects information, recognises patterns, and makes smart predictions. Example: Face unlock on a phone, predictive keyboard, or streaming recommendations.</li>
</ul>
<h4>2. Everyday Places Where AI Hides</h4>
<ul>
  <li><strong>Smartphone Camera:</strong> Uses Computer Vision to recognise human faces and softly blur the background in Portrait Mode.</li>
  <li><strong>Video & Music Apps:</strong> A Recommendation System suggests cartoons and songs based on what you enjoyed watching yesterday.</li>
  <li><strong>Smart Maps & GPS:</strong> Calculates the fastest route home by checking live traffic data from thousands of cars on the road.</li>
</ul>`,
    step1: {
      title: '1. Spotting the Sensor Clues',
      desc: 'Look for cameras, microphones, or GPS chips that collect information (data).',
      detail: 'Sensors act as the digital eyes and ears of the machine.',
      code: '# Sensor Data Collection\nsensor_type = "camera_lens"\nframe_data = capture_room_pixels()'
    },
    step2: {
      title: '2. Detecting Pattern Recognition',
      desc: 'The machine searches the data for familiar shapes, sounds, or words it studied earlier.',
      detail: 'Just like spotting a friend in a crowd, AI matches pixels to learned face patterns.',
      code: 'if detect_human_face(frame_data):\n    apply_portrait_blur(background=True)'
    },
    step3: {
      title: '3. Providing Smart Assistance',
      desc: 'The device acts on its decision in a fraction of a second to make your life easier.',
      detail: 'From auto-suggesting words to clearing photo glare, AI works quietly in the background.',
      code: 'show_recommendation(["Space Rockets", "Cute Animals"])'
    },
    realScenario: 'While waiting for the school bus, Maya typed "Tomorow we hav" on her mother’s phone. The keyboard immediately popped up with "Tomorrow we have", saving her time and correcting two spelling mistakes automatically.',
    useCases: [
      'Smartphone camera portrait mode automatically blurring backgrounds around smiling faces',
      'Streaming platforms suggesting animal documentaries after you watch dinosaur videos',
      'Email apps filtering out noisy scam emails into the spam folder using text filters'
    ],
    simCode: 'user_history = ["Robot Cartoon", "Space Shuttle Video"]\nif "Space" in user_history[1]:\n    next_video = "Journey to Mars for Kids 🚀"\nprint("AI Recommended Next:", next_video)',
    simOutput: 'AI Recommended Next: Journey to Mars for Kids 🚀',
    pairs: [
      { id: 'p1', term: 'Data', definition: 'Information like photos, numbers, words, and sounds that AI learns from' },
      { id: 'p2', term: 'Normal Machine', definition: 'A machine with fixed buttons that never learns or adapts (like a ceiling fan)' },
      { id: 'p3', term: 'Recommendation System', definition: 'An AI helper that suggests videos or songs you might enjoy based on your past picks' }
    ],
    practice: {
      q: 'Which of the following items uses Artificial Intelligence?',
      opts: [
        'A wooden ruler measuring centimetres',
        'A face-unlock camera on a smartphone',
        'A standard ceiling fan with a simple wall switch',
        'A graphite pencil in a pencil case'
      ],
      correct: 1,
      exp: 'A face-unlock camera uses AI Computer Vision to recognise facial features, while rulers and plain fans only follow fixed physical designs.',
      hint: 'Think about which item can "recognise" and decide who you are.'
    },
    quizzes: [
      {
        q: 'Why is data called "the food of AI"?',
        opts: [
          { text: 'Because AI computers eat vegetables and fruit', isCorrect: false },
          { text: 'Because AI needs many examples (data) to learn patterns and become smart', isCorrect: true },
          { text: 'Because computers need electricity to charge their batteries', isCorrect: false },
          { text: 'Because data smells delicious to robots', isCorrect: false }
        ],
        exp: 'Just as children need healthy food to grow, AI needs lots of high-quality data examples to learn patterns accurately.'
      },
      {
        q: 'When a video app recommends a new cartoon you might like, what is choosing it?',
        opts: [
          { text: 'A computer recommendation program that spotted patterns in what you watched', isCorrect: true },
          { text: 'A person watching you through the window', isCorrect: false },
          { text: 'A lucky coin flip inside the phone screen', isCorrect: false },
          { text: 'The battery running low', isCorrect: false }
        ],
        exp: 'Recommendation algorithms analyze your viewing history to predict what topics interest you.'
      }
    ],
    practicalTask: {
      title: 'The Home AI Detective Mission',
      objective: 'Inspect 4 items around your house with an adult and classify them as AI-Powered or Normal Machine.',
      steps: [
        'Examine an electric ceiling fan or table lamp: Does it learn who you are or adapt? (Normal Machine)',
        'Look at a smartphone camera: Does it draw a box around faces or focus on smiles? (AI Machine)',
        'Check a television remote control vs a voice-search remote: Does it listen to speech commands? (AI Machine)',
        'Record your findings in a two-column chart: "Normal Tools" vs "Smart AI Helpers".'
      ],
      expectedResult: 'You will spot at least 2 real-world AI systems working in everyday household devices.'
    },
    recall: {
      q: 'Where does AI hide in our daily lives?',
      a: 'Inside smartphone cameras, predictive keyboards, streaming recommendation rows, and map traffic navigators!'
    },
    takeaways: [
      'AI is an invisible helper embedded in everyday apps, cameras, and navigation tools.',
      'Normal machines follow fixed switches, but AI machines learn from examples and data.',
      'Always remember: Data is the food that makes AI systems smart and capable.'
    ],
    gameMechanic: {
      title: 'AI Detective: The Invisible Signal Hunt',
      scenario: 'Robo-Pi needs your help! The Mystery Mansion has 5 rooms with hidden gadgets. Some gadgets are ordinary wooden or electric tools, while others contain secret AI chips emitting glowing blue sensor signals.',
      objective: 'Scan room objects with the Digital Magnifier, identify the 3 AI-powered gadgets, and explain what pattern each gadget recognises.',
      rules: [
        'Rule 1: Click any object to activate the Sensor Scanner.',
        'Rule 2: If the item learns, decides, or recognises patterns, tag it as "AI FOUND!".',
        'Rule 3: If the item only follows a physical switch or manual motion, tag it as "NORMAL TOOL".'
      ],
      choices: [
        'Scan Living Room: Smart TV Voice Remote vs Plain Plastic Clock',
        'Scan Kitchen: Robot Vacuum Floor Mapper vs Traditional Broom',
        'Scan Study Desk: Smartphone Face Unlock vs Wooden 30cm Ruler'
      ],
      progression: [
        'Room 1: Living Room — Discover the Voice Remote microphone waveform signal (+100 pts)',
        'Room 2: Kitchen — Map the Robot Vacuum ultrasonic obstacle sensor (+100 pts)',
        'Room 3: Study Desk — Isolate the Smartphone Portrait Depth Neural Net (+100 pts)'
      ],
      completion: 'All 3 hidden AI signals discovered with zero false alarms! Earn the Certified AI Detective Golden Badge.',
      badge: 'Certified AI Detective 🕵️‍♂️',
      points: 300
    },
    reflectionSafety: {
      prompt: 'When using smart gadgets at home, why should we always ask a parent before enabling location or camera permissions?',
      rule: 'Golden Safety Rule: Never turn on cameras or microphones in apps without permission from a parent or teacher.',
      discussion: 'Discuss with a classmate: If your phone camera knows what your face looks like, where should that private information stay?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is the best definition of Artificial Intelligence for Std 4?',
        opts: [
          'A walking metal toy that can clean dishes and fly',
          'A computer or machine created by humans that can learn from data and act smart',
          'A magical battery that never runs out of power',
          'An internet cable that connects computers across cities'
        ],
        correct: 1,
        exp: 'Artificial = made by humans; Intelligence = ability to learn, think, and solve problems from data.',
        hint: 'Break the words into "Artificial" (human-made) and "Intelligence" (smart learning).',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Rohan takes a photograph of his pet dog. The camera screen immediately draws a yellow square around the dog’s eyes. Which AI capability is at work?',
        opts: [
          'Sound wave acoustic filtering',
          'Computer Vision pattern recognition',
          'Battery temperature regulation',
          'Mechanical gear rotation'
        ],
        correct: 1,
        exp: 'Computer Vision allows software to detect and locate visual features like eyes, ears, and faces in images.',
        hint: 'Which branch of AI gives computers the ability to "see" and recognise pictures?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI was trained to recognise cats, but all the training pictures were of orange cats sitting indoors. When shown a photo of a black cat climbing a tree, the AI guessed "Squirrel". Why did this happen?',
        opts: [
          'The AI was sleepy and tired from looking at photos',
          'The AI only learned patterns from orange indoor cat data and lacked varied examples',
          'Black cats are not actually members of the feline family',
          'The computer screen brightness was turned down too low'
        ],
        correct: 1,
        exp: 'AI can only learn from the data examples it was given. Incomplete or biased training data leads to mistakes on new, unfamiliar examples.',
        hint: 'Think about what kind of examples the AI was fed during its learning stage.',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'meet the smart machines': {
    title: 'Meet the Smart Machines',
    hook: 'How does a robot vacuum navigate around furniture without bumping into walls, and how can space rovers explore the red deserts of Mars all by themselves?',
    goal: 'Understand the Sense-Think-Act cycle that powers smart machines, explore autonomous rovers and drones, and discover helper robots.',
    learnPoints: [
      'Master the 3-step cycle of smart machines: SENSE (sensors), THINK (AI brain), ACT (motors and speakers)',
      'Learn about autonomous machines: self-driving shuttles, delivery drones, and Mars rovers',
      'Discover helper robots in factories, deep oceans, and hospitals that do dangerous or dull work'
    ],
    analogy: 'A smart robot is like an explorer wearing night-vision goggles and hiking boots: its sensors explore the path, its computer brain picks the safest trail, and its motors walk forward without slipping!',
    explanationHtml: `<h3>Robots with Senses, Brains, and Muscles</h3>
<p>A robot is a machine that can carry out tasks automatically or with a little help from humans. But not all robots look like shiny humans! Many robots look like mechanical arms, rolling discs, or flying quadcopters.</p>
<h4>The Golden Cycle: Sense, Think, Act!</h4>
<p>Every intelligent machine follows three continuous steps:</p>
<ol>
  <li><strong>1. SENSE 👀:</strong> Cameras, microphones, touch bumpers, and ultrasonic sensors collect real-time signals from the surroundings.</li>
  <li><strong>2. THINK 🧠:</strong> The computer processor running AI algorithms examines the sensor data, consults its rules or neural network, and decides the best action.</li>
  <li><strong>3. ACT 💪:</strong> Motors turn wheels, robotic arms lift packages, or speakers give voice alerts to execute the decision.</li>
</ol>
<h4>Smart Helpers in Extreme Places</h4>
<ul>
  <li><strong>Space Rovers:</strong> Explore planets like Mars where signals take 20 minutes to reach Earth, meaning the rover must steer around boulders autonomously!</li>
  <li><strong>Warehouse Robots:</strong> Carry 500-kilogram shelves across fulfillment centers without human drivers.</li>
  <li><strong>Underwater Explorers:</strong> Dive thousands of meters into pitch-black oceans where water pressure would crush humans.</li>
</ul>`,
    step1: {
      title: '1. SENSE: Capturing Environmental Signals',
      desc: 'Sensors measure distance to walls, ambient light levels, or surface temperatures.',
      detail: 'Ultrasonic sensors bounce sound waves to measure how far away an obstacle is.',
      code: 'ultrasonic_distance = read_distance_sensor() # e.g. 12 cm'
    },
    step2: {
      title: '2. THINK: Computing the Next Decision',
      desc: 'The onboard AI evaluates whether the path ahead is clear or blocked.',
      detail: 'If the distance is less than 20 cm, the computer decides to steer left.',
      code: 'if ultrasonic_distance < 20:\n    decision = "TURN_LEFT_90_DEG"\nelse:\n    decision = "MOVE_FORWARD"'
    },
    step3: {
      title: '3. ACT: Triggering Mechanical Motors',
      desc: 'The microcontroller sends electrical pulses to the wheel motors to execute the turn.',
      detail: 'The robot smoothly spins and continues vacuuming or exploring without crashing.',
      code: 'execute_motor_command(decision, speed=30)'
    },
    realScenario: 'On Mars, the Perseverance rover spotted a jagged rock 3 meters ahead. Because human radio signals take many minutes to travel from Earth, Perseverance’s AI AutoNav system sensed the rock, planned a gentle detour around it, and drove safely to its science target.',
    useCases: [
      'Robot vacuum cleaners mapping living room corners and reversing away from staircase drops',
      'Self-driving shuttles scanning pedestrians at crosswalks and gently braking to a stop',
      'Agricultural drones spraying fertilizer only on diseased crop patches detected by cameras'
    ],
    simCode: 'sensor_front_obstacle = True\nif sensor_front_obstacle:\n    action = "STOP motors and spin wheels 45 degrees right 🔄"\nelse:\n    action = "Drive forward at steady speed ⏩"\nprint("Robot Vacuum:", action)',
    simOutput: 'Robot Vacuum: STOP motors and spin wheels 45 degrees right 🔄',
    pairs: [
      { id: 'p1', term: 'SENSE', definition: 'Using cameras, radar, or ultrasonic waves to collect information from surroundings' },
      { id: 'p2', term: 'THINK', definition: 'The computer processor deciding what to do based on sensor signals and rules' },
      { id: 'p3', term: 'ACT', definition: 'Motors, wheels, or robotic grippers carrying out the physical movement' }
    ],
    practice: {
      q: 'What are the three essential steps of an intelligent machine?',
      opts: [
        'Eat, Sleep, Play',
        'Sense, Think, Act',
        'Read, Write, Draw',
        'Charge, Wait, Beep'
      ],
      correct: 1,
      exp: 'Smart machines operate via the Sense-Think-Act loop: gathering data with sensors, deciding with AI, and executing with motors.',
      hint: 'Remember the sequence: eyes first, brain second, muscles third.'
    },
    quizzes: [
      {
        q: 'Why do Mars rovers need autonomous AI instead of being steered live with a joystick from Earth?',
        opts: [
          { text: 'Because radio signals between Earth and Mars take several minutes, making live joystick steering impossible', isCorrect: true },
          { text: 'Because astronauts on Earth forget their joysticks', isCorrect: false },
          { text: 'Because rovers run on solar power only at night', isCorrect: false },
          { text: 'Because Mars has no gravity', isCorrect: false }
        ],
        exp: 'Radio signals travel at the speed of light, taking 5 to 20 minutes to cross interplanetary space. A rover would crash into a crater before Earth received the picture!'
      },
      {
        q: 'Which machine part acts like the "eyes" of a robot?',
        opts: [
          { text: 'The battery pack', isCorrect: false },
          { text: 'Sensors and digital cameras', isCorrect: true },
          { text: 'The rubber tires', isCorrect: false },
          { text: 'The metal outer casing', isCorrect: false }
        ],
        exp: 'Sensors and cameras capture environmental signals, serving as the sensory organs of robotic systems.'
      }
    ],
    practicalTask: {
      title: 'Design an Automatic Pet Feeder Blueprint',
      objective: 'Draw a top-down blueprint for an automated pet food dispenser and label its Sense, Think, and Act components.',
      steps: [
        'Label the SENSE component: An infrared motion sensor or food bowl weight sensor.',
        'Label the THINK component: A microchip checking: "Is the bowl empty AND has 4 hours passed?".',
        'Label the ACT component: A small motor that rotates a dispenser wheel to drop crunchy kibble into the bowl.',
        'Share your diagram with a partner and trace how signals flow through the 3 steps.'
      ],
      expectedResult: 'You will illustrate how the Sense-Think-Act paradigm powers everyday automated robotics.'
    },
    recall: {
      q: 'How does a smart machine interact with the physical world?',
      a: 'Through the continuous Sense-Think-Act cycle: collecting sensor data, computing decisions with AI, and moving actuators!'
    },
    takeaways: [
      'Smart machines operate in three connected steps: Sense, Think, and Act.',
      'Robots come in all shapes and sizes, from factory arms to Martian rovers and vacuum discs.',
      'Robots excel at jobs that are dull, dangerous, dirty, or located in extreme environments.'
    ],
    gameMechanic: {
      title: 'Sense-Think-Act Mission Commander',
      scenario: 'You are Mission Commander for Rover Pi in an alien volcanic maze. Lava cracks, boulder fields, and crystal sample sites lie ahead. You must equip the correct sensor, program the thinking rule, and engage the proper motor action.',
      objective: 'Safely guide Rover Pi to 3 crystal sample sites and reach the charging beacon without tumbling into a crater.',
      rules: [
        'Rule 1: Select the matching sensor for the obstacle (e.g. Infrared Heat Sensor for Lava, LiDAR for Boulders).',
        'Rule 2: Choose the logical Think Rule (IF distance < 1m THEN Stop and Reverse).',
        'Rule 3: Execute the Act Motor (Pivot Right, Lower Drill Arm, Accelerate).'
      ],
      choices: [
        'Encounter 1: Deep Volcanic Fissure — Ultrasonic Depth Sensor + "IF fissure depth > 50cm THEN Turn 90°" + Right Wheel Motor',
        'Encounter 2: Rare Blue Crystal — Optical Colour Camera + "IF hue == Blue THEN Deploy Arm" + Robotic Arm Actuator',
        'Encounter 3: Sudden Dust Storm — Barometric Pressure Sensor + "IF wind > 40km/h THEN Lock Stabilisers" + Magnetic Foot Clamps'
      ],
      progression: [
        'Checkpoint 1: Successfully sensed and navigated the volcanic fissure (+100 pts)',
        'Checkpoint 2: Identified and sampled the glowing blue crystal (+120 pts)',
        'Checkpoint 3: Sensed storm winds and locked down safely until clear (+130 pts)'
      ],
      completion: 'Rover Pi reached the docking station with all scientific samples intact! Awarded the Autonomous Systems Commander Badge.',
      badge: 'Autonomous Systems Commander 🦾',
      points: 350
    },
    reflectionSafety: {
      prompt: 'Self-driving cars have sensors all around them. If a dirty mud puddle covers a camera lens, what should the car do to remain safe?',
      rule: 'Fail-Safe Safety Rule: When an AI sensor is blinded or uncertain, the machine must slow down, pull over safely, or ask a human to take control.',
      discussion: 'Why is it important that humans always test and supervise autonomous machines in real-world environments?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is an example of the "ACT" step in a robot vacuum?',
        opts: [
          'The camera detecting a table leg',
          'The microchip calculating a left turn',
          'The electric motor spinning the wheels to turn left',
          'The battery storing electrical charge'
        ],
        correct: 2,
        exp: 'Act involves physical execution via motors, speakers, or grippers. Spinning the wheels is the physical action.',
        hint: 'Which option involves physical movement or muscle work?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A warehouse sorting robot uses a laser barcode scanner. What role does the barcode scanner play in the Sense-Think-Act cycle?',
        opts: [
          'Think — because it calculates shipping taxes',
          'Sense — because it collects optical identification data from the package label',
          'Act — because it moves the package across the conveyor belt',
          'Sleep — because it turns off the robot'
        ],
        correct: 1,
        exp: 'Scanners, cameras, and microphones are sensors that collect environmental information (Sense).',
        hint: 'Is the scanner gathering information or moving a motor?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An automated airport shuttle bus detects an obstacle 10 meters ahead. Sensor A (Camera) sees a shadow on the tarmac. Sensor B (LiDAR laser) reports that the road ahead is completely empty and flat. The shuttle slows down smoothly to 5 km/h while checking again. What is this technique called?',
        opts: [
          'Random Guessing System',
          'Sensor Fusion and Fail-Safe Caution',
          'Manual Gear Shifting',
          'Battery Drainage Panic'
        ],
        correct: 1,
        exp: 'Sensor Fusion combines data from multiple sensors (cameras and lasers) to make reliable, safe decisions even when one sensor is tricked by shadows.',
        hint: 'Think about how combining multiple senses helps machines avoid mistakes.',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 2: COMMUNICATE WITH AI (Instructions, Precision & Algorithmic Logic)
  // ═══════════════════════════════════════════════════════════════════════════

  'say it clearly!': {
    title: 'Say It Clearly!',
    hook: 'If you tell a human friend "Draw a big red fruit", they draw an apple. But if you tell a computer, it might draw a giant strawberry on top of a car! Why do computers get confused?',
    goal: 'Understand the difference between ambiguous human language and precise computer instructions, and learn how exact parameters produce intended AI creations.',
    learnPoints: [
      'Understand why fuzzy, ambiguous words cause AI and computers to guess incorrectly',
      'Learn what Parameters and Keywords mean when commanding digital systems',
      'Master the art of giving clear, specific, step-by-step instructions'
    ],
    analogy: 'Giving instructions to an AI is like baking with a fussy chef: if you say "Add some sugar", the chef freezes; but if you say "Add exactly 2 tablespoons of brown sugar", you get delicious cookies every time!',
    explanationHtml: `<h3>Talking to Computers: Precision Matters!</h3>
<p>When you talk to your best friend, your friend can see your face, hear your laughter, and guess what you mean even if you leave out details. Computers and AI don’t have a human gut feeling. They follow exactly what your words say!</p>
<h4>Ambiguous vs Precise Commands</h4>
<table border="1" cellpadding="6">
  <tr><th>Unclear (Fuzzy) Command</th><th>Clear (Precise) Command</th><th>Why It Works Better</th></tr>
  <tr><td>"Draw something cool."</td><td>"Draw a smiling blue robot wearing a graduation cap on Mars."</td><td>Provides subject, colour, clothing, and background setting.</td></tr>
  <tr><td>"Tell me about animals."</td><td>"List 3 surprising facts about African elephants in 4 simple sentences."</td><td>Specifies animal, number of facts, and exact sentence length.</td></tr>
  <tr><td>"Make a snack."</td><td>"Place 1 cheese slice between 2 slices of wholewheat bread and toast for 2 minutes."</td><td>Specifies ingredients, quantities, and cooking duration.</td></tr>
</table>
<p><strong>Remember:</strong> AI cannot read your mind. The clearer your instructions, the closer the AI\'s creation will be to your imagination!</p>`,
    step1: {
      title: '1. Identify the Main Subject (WHO/WHAT)',
      desc: 'State the exact character, object, or topic you want the AI to focus on.',
      detail: 'Instead of "a vehicle", say "a solar-powered lunar rover".',
      code: 'subject = "solar_powered_lunar_rover"'
    },
    step2: {
      title: '2. Add Key Modifiers & Details (WHERE/HOW)',
      desc: 'Include colors, background settings, emotions, and specific attributes.',
      detail: 'Add descriptive adjectives that paint a sharp digital picture.',
      code: 'details = {"color": "silver and gold", "terrain": "lunar crater", "sky": "black with Earth in background"}'
    },
    step3: {
      title: '3. Set Output Boundaries (CONSTRAINTS)',
      desc: 'Define the format, length, or style you expect.',
      detail: 'Specify 3 bullet points, 5 lines, or watercolor illustration style.',
      code: 'constraints = {"format": "bullet_points", "max_items": 3, "reading_level": "Grade 4"}'
    },
    realScenario: 'In an art competition, Ananya typed "castle". The AI generated an old grey crumbling ruin. She refined her prompt to: "A fairy-tale crystal castle on a rainbow cloud at sunset, children’s storybook watercolor style." The AI produced the exact magical scene she envisioned and won first prize!',
    useCases: [
      'Voice assistants playing the exact song when you state the artist name and track title',
      'Image generators producing accurate science diagrams when given exact labels and view angles',
      'Study helper bots summarising chapters into 5 simple bullet points instead of long essays'
    ],
    simCode: 'def test_prompt(user_text):\n    if len(user_text.split()) < 3:\n        return "⚠️ Prompt is too vague! AI has to guess."\n    return f"✅ Clear prompt received! Generating: {user_text}"\nprint(test_prompt("robot"))\nprint(test_prompt("A friendly blue robot waving from a rocket"))',
    simOutput: '⚠️ Prompt is too vague! AI has to guess.\n✅ Clear prompt received! Generating: A friendly blue robot waving from a rocket',
    pairs: [
      { id: 'p1', term: 'Ambiguity', definition: 'Words that are vague or open to multiple interpretations (like "make it nice")' },
      { id: 'p2', term: 'Precision', definition: 'Exact, clear, and detailed instructions that leave no room for guesswork' },
      { id: 'p3', term: 'Parameter', definition: 'A specific detail or limit given to a computer (like color="blue", length=5)' }
    ],
    practice: {
      q: 'Which prompt will help an AI draw the exact picture a student wants?',
      opts: [
        'Draw a nice animal in a place',
        'Make something pretty for my wall',
        'Draw a fluffy orange kitten sleeping inside a green basket under a sunflower, cartoon style',
        'A picture with colours and things'
      ],
      correct: 2,
      exp: 'The third option provides clear details on subject (kitten), colours (orange, green), action (sleeping), setting (basket, sunflower), and style (cartoon).',
      hint: 'Look for the option with the most specific colours, objects, and art style.'
    },
    quizzes: [
      {
        q: 'Why does an AI sometimes give unexpected or strange answers to a short prompt?',
        opts: [
          { text: 'Because when a prompt is too short, the AI must guess from millions of possibilities', isCorrect: true },
          { text: 'Because the AI computer dislikes short sentences', isCorrect: false },
          { text: 'Because the keyboard ran out of memory', isCorrect: false },
          { text: 'Because the internet disconnects whenever prompts are short', isCorrect: false }
        ],
        exp: 'Short, ambiguous prompts lack constraints, forcing the AI to guess randomly among thousands of possible interpretations.'
      },
      {
        q: 'What is the role of the human when talking to an AI system?',
        opts: [
          { text: 'To be the boss who gives clear instructions and evaluates the result', isCorrect: true },
          { text: 'To do whatever the AI tells them to do without thinking', isCorrect: false },
          { text: 'To let the AI run without any supervision', isCorrect: false },
          { text: 'To turn off their own brain and copy answers', isCorrect: false }
        ],
        exp: 'Humans are the directors who provide guidance, establish boundaries, and critically evaluate the AI output.'
      }
    ],
    practicalTask: {
      title: 'The Blindfold Sandwich Simulator',
      objective: 'Demonstrate the necessity of precise instructions through a two-person paper sandwich activity.',
      steps: [
        'Student A pretends to be a computer with no common sense (Robot Chef).',
        'Student B gives instructions to make a paper sandwich. Ambiguous command: "Put peanut butter on the bread." (Robot Chef places the entire unopened jar on the paper!).',
        'Student B refines command: "Unscrew the lid. Pick up the plastic knife. Scoop 1 spoonful. Spread evenly across the slice."',
        'Reflect together on why computers require exact, sequential actions.'
      ],
      expectedResult: 'Students will internalize how computers interpret literal instructions without assuming implied steps.'
    },
    recall: {
      q: 'Why must we say commands clearly to an AI?',
      a: 'Because AI follows exact words rather than human thoughts; precision eliminates guesswork and produces accurate creations!'
    },
    takeaways: [
      'Ambiguous prompts result in confusing, unpredictable AI responses.',
      'A powerful command includes the subject, descriptive details, and output limits.',
      'Refining your prompt step-by-step is how expert creators collaborate with AI.'
    ],
    gameMechanic: {
      title: 'Chef Bot Recipe Precision Challenge',
      scenario: 'Chef Bot 3000 is running the digital bakery, but Chef Bot takes words 100% literally! If you say "Bake something sweet", Chef Bot bakes sugar cubes in a frying pan! You must refine 3 messy cooking orders into exact recipes before the bakery opening bell rings.',
      objective: 'Rewrite and assemble precision ingredient and temperature cards to guide Chef Bot in baking a magnificent Strawberry Birthday Cake.',
      rules: [
        'Rule 1: Eliminate fuzzy words like "some", "a lot", and "hot".',
        'Rule 2: Select exact measurements (grams, milliliters, degrees Celsius).',
        'Rule 3: Test your refined recipe on the Chef Bot Virtual Oven.'
      ],
      choices: [
        'Ingredient Card: "Add some flour" VS "Measure 250 grams of sifted wheat flour"',
        'Mixing Card: "Stir it around" VS "Whisk batter clockwise for 3 minutes until smooth"',
        'Baking Card: "Put in hot oven" VS "Bake at 180°C for 25 minutes on center rack"'
      ],
      progression: [
        'Phase 1: Precision ingredient measurement successfully passed (+100 pts)',
        'Phase 2: Correct mixing timing and technique verified (+110 pts)',
        'Phase 3: Thermal oven parameters set with zero burnt crust (+130 pts)'
      ],
      completion: 'The Strawberry Birthday Cake baked to golden perfection! Earn the Master Clarifier Chef Hat Badge.',
      badge: 'Master Clarifier Chef 👨‍🍳',
      points: 340
    },
    reflectionSafety: {
      prompt: 'If you ask an AI to help write a birthday card for your grandmother, why is it better to add your own personal memories rather than using only the AI words?',
      rule: 'Authenticity Rule: AI can suggest rhyming words and ideas, but your real feelings and personal memories make creations truly special.',
      discussion: 'Discuss with a friend: How does adding your own ideas make an AI-assisted project unique?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following words is considered "ambiguous" when programming a robot?',
        opts: [
          'Rotate 90 degrees clockwise',
          'Drive forward for 5 seconds at speed 10',
          'Move a little bit over there',
          'Stop motors when distance < 15 centimeters'
        ],
        correct: 2,
        exp: '"A little bit over there" is completely ambiguous because it does not specify distance, direction, or target coordinates.',
        hint: 'Which option lacks exact numbers or directions?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Vikram wants an AI image tool to create a drawing for his science project on space. Which prompt follows best practices for prompt clarity?',
        opts: [
          'Space picture please',
          'A cross-section illustration of the planet Saturn showing its icy rings, labeled core layers, science textbook style',
          'Make it look very cool and awesome with planets',
          'Everything about the solar system in bright colors'
        ],
        correct: 1,
        exp: 'It specifies the exact celestial body (Saturn), key visual elements (icy rings, labeled core layers), and target style (science textbook cross-section).',
        hint: 'Which prompt gives the AI clear instructions on subject, details, and style?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI chatbot answered a student\'s question with completely inaccurate numbers about dinosaur sizes. What is the most effective next step for the student?',
        opts: [
          'Assume the textbook is outdated and memorize the AI answer',
          'Refine the prompt with specific references: "Check historical fossil records for Tyrannosaurus Rex adult hip height in meters and cite the museum source"',
          'Delete the app and never study dinosaurs again',
          'Keep typing the word "No" until the AI changes its mind'
        ],
        correct: 1,
        exp: 'Effective users refine their prompts by adding specific parameters, requesting reliable sources, and cross-checking answers against authoritative textbooks.',
        hint: 'How do smart creators improve prompts when they need verified factual answers?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'mission: instructions': {
    title: 'Mission: Instructions',
    hook: 'Space Rover Pi is perched on a Martian cliff! If it executes Step 3 (drive forward) before Step 2 (extend bridge), it will tumble down the canyon! Why does the sequence of steps matter so much?',
    goal: 'Master algorithmic sequencing, understand why instruction order is critical for computers, and learn how to construct bug-free step-by-step algorithms.',
    learnPoints: [
      'Understand that an Algorithm is a step-by-step recipe to complete a specific task',
      'Learn why the chronological order (sequence) of instructions determines success or failure',
      'Identify and fix sequence errors (bugs) in everyday and computational tasks'
    ],
    analogy: 'An algorithm is like getting dressed in the morning: if you put on your shoes BEFORE your socks, you get a silly mess! The steps must follow the exact right sequence to work!',
    explanationHtml: `<h3>The Power of Step-by-Step Instructions</h3>
<p>An <strong>Algorithm</strong> is a list of step-by-step instructions designed to finish a task or solve a problem. Computers cannot guess what to do next; they execute instructions in strict order, from top to bottom.</p>
<h4>Why Order Matters: The Sandwich Disaster</h4>
<ol>
  <li><strong>Correct Sequence:</strong> 1. Take two bread slices &rarr; 2. Spread peanut butter &rarr; 3. Place apple slices &rarr; 4. Close sandwich &rarr; 5. Enjoy delicious lunch! 🥪</li>
  <li><strong>Broken Sequence:</strong> 1. Close sandwich &rarr; 2. Spread peanut butter on outside crust &rarr; 3. Take two bread slices... Sticky hands everywhere! 😱</li>
</ol>
<h4>Key Concepts of Algorithmic Thinking</h4>
<ul>
  <li><strong>Sequencing:</strong> Executing commands one after another in exact chronological order.</li>
  <li><strong>Conditional Check (IF-THEN):</strong> Doing an action only if a condition is met (e.g., <em>IF light is red, THEN stop</em>).</li>
  <li><strong>Debugging:</strong> Finding the mistaken step in a sequence and moving it into its correct position.</li>
</ul>`,
    step1: {
      title: '1. Break the Big Mission into Small Steps',
      desc: 'Deconstruct a complex task into tiny, atomic actions that a computer can perform.',
      detail: 'Instead of "Clean room", break into "Pick up books", "Make bed", "Sweep floor".',
      code: '# Deconstruction\nsteps = ["find_charging_dock", "align_sensors", "dock_and_charge"]'
    },
    step2: {
      title: '2. Arrange Steps in Strict Chronological Sequence',
      desc: 'Ensure prerequisite steps happen before dependent steps.',
      detail: 'You cannot open a door before turning the handle.',
      code: 'for step in steps:\n    execute(step)'
    },
    step3: {
      title: '3. Add Conditional Checks for Safety',
      desc: 'Include IF-THEN checkpoints to prevent errors during execution.',
      detail: 'Check for obstacles or low battery before taking the next step.',
      code: 'if obstacle_detected():\n    wait_or_turn()\nelse:\n    drive_forward(meters=1)'
    },
    realScenario: 'A student wrote an algorithm to make their animated video game dragon fly. In their original script, `flap_wings()` came after `fall_to_ground()`. The dragon crashed every time! When they flipped the sequence so `flap_wings()` ran continuously, the dragon soared across the mountains!',
    useCases: [
      'Traffic light algorithms cycling smoothly through Red, Yellow, and Green to prevent road gridlock',
      'Automated washing machines executing Soak &rarr; Wash &rarr; Rinse &rarr; Spin in exact sequence',
      'Rocket launch countdown computers checking 500 safety sensors in strict 10-second order'
    ],
    simCode: 'sequence = ["1. Spread butter", "2. Cut bread", "3. Eat toast"]\n# Notice the bug: Step 1 occurs before Step 2!\ncorrected = ["1. Cut bread", "2. Spread butter", "3. Eat toast"]\nprint("Corrected Algorithm:", " -> ".join(corrected))',
    simOutput: 'Corrected Algorithm: 1. Cut bread -> 2. Spread butter -> 3. Eat toast',
    pairs: [
      { id: 'p1', term: 'Algorithm', definition: 'A step-by-step list of instructions to complete a specific task' },
      { id: 'p2', term: 'Sequence', definition: 'The exact order in which computer instructions are performed' },
      { id: 'p3', term: 'Bug', definition: 'A mistake or out-of-order step in an algorithm that causes an error' }
    ],
    practice: {
      q: 'Which of the following represents the correct algorithm for brushing your teeth?',
      opts: [
        'Rinse mouth &rarr; Put paste on brush &rarr; Brush teeth for 2 mins &rarr; Wet toothbrush',
        'Wet toothbrush &rarr; Put paste on brush &rarr; Brush teeth for 2 mins &rarr; Rinse mouth with water',
        'Brush teeth for 2 mins &rarr; Put paste on brush &rarr; Put brush in cup',
        'Put paste in sink &rarr; Brush teeth &rarr; Wet brush'
      ],
      correct: 1,
      exp: 'You must prepare the brush, apply the toothpaste, perform the cleaning action, and finally rinse. Changing the order produces errors.',
      hint: 'Think about what you must do before you put the brush inside your mouth.'
    },
    quizzes: [
      {
        q: 'What happens if a computer algorithm has one instruction in the wrong order?',
        opts: [
          { text: 'The computer will produce a mistake, glitch, or wrong result (a bug)', isCorrect: true },
          { text: 'The computer will automatically fix the whole algorithm by itself', isCorrect: false },
          { text: 'The computer monitor turns completely pink', isCorrect: false },
          { text: 'Nothing happens at all', isCorrect: false }
        ],
        exp: 'Computers execute instructions literally in the given order. An out-of-order step creates a bug.'
      },
      {
        q: 'Why are algorithms compared to recipes in cooking?',
        opts: [
          { text: 'Because both require specific ingredients and must follow exact steps in order', isCorrect: true },
          { text: 'Because computers are made of chocolate and dough', isCorrect: false },
          { text: 'Because you eat computer chips for dinner', isCorrect: false },
          { text: 'Because chefs use keyboards to cook soup', isCorrect: false }
        ],
        exp: 'Both recipes and algorithms require accurate inputs and an ordered sequence of actions to produce a successful outcome.'
      }
    ],
    practicalTask: {
      title: 'Write a 5-Step Toothbrushing Algorithm with One IF-THEN Rule',
      objective: 'Author an unambiguous 5-step algorithm for getting ready for school with one conditional safety rule.',
      steps: [
        'Write Step 1: Pack books and homework in the school bag.',
        'Write Step 2: Put on school uniform.',
        'Write Step 3: Eat healthy breakfast.',
        'Write Step 4 (Conditional): IF it is raining outside, THEN put the raincoat inside the bag; ELSE wear regular cap.',
        'Write Step 5: Put on shoes and walk to the school bus.'
      ],
      expectedResult: 'You will demonstrate understanding of algorithmic sequence and conditional branching.'
    },
    recall: {
      q: 'What is an algorithm and why does order matter?',
      a: 'An algorithm is a step-by-step list of instructions to complete a task. Order matters because computers execute steps literally in sequence!'
    },
    takeaways: [
      'An algorithm is a recipe of precise steps that solves a problem.',
      'Sequencing ensures steps happen in the correct chronological order.',
      'Debugging is finding and rearranging flawed or out-of-order steps.'
    ],
    gameMechanic: {
      title: 'Rover Launch Sequence Programmer',
      scenario: 'Rover Pi has touched down in Chryse Planitia on Mars! To deploy its scientific solar wings and soil drill, the Mission Control computer requires an exact 5-block execution sequence. A solar flare shuffled the command queue into chaos!',
      objective: 'Rearrange the scrambled instruction blocks into the only safe sequence that lands, deploys solar panels, drives to the red rock, and drills for soil samples.',
      rules: [
        'Rule 1: Drag instruction blocks into the timeline slots 1 through 5.',
        'Rule 2: Solar panels MUST deploy before driving (to prevent battery depletion).',
        'Rule 3: Obstacle scan MUST happen before moving forward.'
      ],
      choices: [
        'Block A: Deploy Solar Charging Wings ☀️',
        'Block B: Extend Titanium Soil Drill ⛏️',
        'Block C: Soft Touchdown on Landing Skids 🛬',
        'Block D: Drive Forward 5 Meters toward Red Crater 🚗',
        'Block E: Scan 360° Terrain for Boulder Obstacles 🔍'
      ],
      progression: [
        'Step 1-2: Land Skids (C) &rarr; Deploy Wings (A) (+100 pts)',
        'Step 3-4: Scan Terrain (E) &rarr; Drive Forward (D) (+120 pts)',
        'Step 5: Extend Drill & Collect Sample (B) (+130 pts)'
      ],
      completion: 'Launch sequence executed with 100% precision! Rover Pi successfully stored Martian soil sample #1. Awarded the Algorithm Architect Badge.',
      badge: 'Algorithm Architect 📐',
      points: 350
    },
    reflectionSafety: {
      prompt: 'If a self-driving delivery robot encounters an open gate with a playful puppy running toward it, what safety instruction should take top priority?',
      rule: 'Human & Pet Safety Priority: In any autonomous algorithm, stopping immediately for living beings always overrides destination speed.',
      discussion: 'Why do software engineers write safety checks at the very top of robot algorithms?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is the best definition of an "algorithm"?',
        opts: [
          'A metal wire inside a laptop screen',
          'A step-by-step list of instructions to finish a task or solve a problem',
          'A type of computer virus that deletes pictures',
          'A high-speed internet satellite in orbit'
        ],
        correct: 1,
        exp: 'An algorithm is a set of defined, step-by-step rules or instructions designed to solve a problem or accomplish a task.',
        hint: 'Think of an algorithm as a recipe for a computer.',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Look at the following robot steps: 1. Pour water into kettle. 2. Boil water for 3 minutes. 3. Plug in the electric kettle. 4. Pour boiled water into cup. Which two steps are in the WRONG order?',
        opts: [
          'Step 1 and Step 4',
          'Step 2 and Step 3 (the kettle must be plugged in BEFORE it can boil water)',
          'Step 1 and Step 2',
          'Step 3 and Step 4'
        ],
        correct: 1,
        exp: 'An electric kettle cannot boil water until it is plugged into electrical power. Step 3 must happen before Step 2.',
        hint: 'Can an appliance heat up before it gets electrical power?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An autonomous rover uses this algorithm: [Loop: Move Forward 1m &rarr; Scan Obstacle &rarr; IF Obstacle Detected THEN Stop]. If a boulder suddenly rolls onto the path while the rover is moving, why might this simple algorithm fail?',
        opts: [
          'Because the rover only scans AFTER it has already completed the 1-meter forward move, creating a blind movement interval',
          'Because boulders on Mars are made of rubber',
          'Because loops do not work on computers',
          'Because the battery gets too hot'
        ],
        correct: 0,
        exp: 'If scanning happens only after moving, the rover moves blind for 1 meter. A safe algorithm scans continuously WHILE moving or checks BEFORE every step.',
        hint: 'What happens during the moment the rover is driving forward before the scan runs?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 3: AI APPLICATIONS (Mobile Intelligence & Autonomous Mobility)
  // ═══════════════════════════════════════════════════════════════════════════

  'ai in my mobile': {
    title: 'AI in My Mobile',
    hook: 'How can your smartphone recognise your face in the dark, predict what word you will type next, and organize photos of your dog into a secret album without you lifting a finger?',
    goal: 'Explore the embedded AI technologies inside modern smartphones, including biometric face unlock, predictive keyboards, computational photography, and photo grouping.',
    learnPoints: [
      'Discover how biometric Face Unlock uses 3D infrared depth points to verify your identity',
      'Understand how predictive keyboards use language models to anticipate your next words',
      'Learn how smartphone photo galleries use Computer Vision to automatically cluster photos by pets, people, and places'
    ],
    analogy: 'Your smartphone is like a pocket-sized Swiss Army knife full of invisible AI specialists: a portrait photographer, a speedy spelling tutor, and a multilingual translator all working inside one glass screen!',
    explanationHtml: `<h3>The Miniature Supercomputer in Your Pocket</h3>
<p>Modern smartphones are packed with dedicated AI processors called <strong>Neural Processing Units (NPUs)</strong>. These microchips perform billions of calculations per second right inside the phone without sending your private pictures to the internet.</p>
<h4>1. Face Unlock (Biometric Vision)</h4>
<p>When you look at your screen, invisible infrared dots project a 3D mesh across your face. The AI compares your eye distance, nose bridge, and facial contours against the stored owner profile in less than 0.2 seconds!</p>
<h4>2. Predictive Text & Auto-Correct</h4>
<p>As your thumbs fly across the glass, the keyboard AI tracks letter coordinates. If you tap near the 'B' instead of 'V', it recognizes common language n-grams and gently inserts the word you intended.</p>
<h4>3. Smart Photo Albums</h4>
<p>Open your photo gallery search bar and type <em>"dog"</em> or <em>"beach"</em>. The AI scanned visual features inside your photos, cataloguing canine ears and sandy waves without needing manual tags!</p>`,
    step1: {
      title: '1. On-Device Sensor Capture',
      desc: 'Cameras, microphones, and touchscreens capture live user input signals.',
      detail: 'Sensors take high-speed measurements without storing raw uncompressed files.',
      code: '# On-Device Face Mesh\nface_mesh = infrared_dot_projector.scan_3d()'
    },
    step2: {
      title: '2. NPU Neural Processing',
      desc: 'The Neural Engine processes mathematical feature vectors in real time.',
      detail: 'It checks whether current facial features match the registered mathematical owner hash.',
      code: 'match_score = compare_biometric_hashes(face_mesh, registered_user)\nif match_score > 0.98: unlock_screen()'
    },
    step3: {
      title: '3. Instant User Experience Action',
      desc: 'The phone unlocks, auto-completes words, or enhances portrait colors.',
      detail: 'All calculations complete in under 50 milliseconds directly on the phone.',
      code: 'display_ui("Screen Unlocked 🔓")'
    },
    realScenario: 'Tanya took a photo of her cat sleeping in a dim bedroom. Her phone’s Night Mode AI combined 8 rapid exposure frames, aligned them to prevent blur, and produced a clear, colorful, bright photo without needing an annoying flash that would startle the pet.',
    useCases: [
      'Smart voice dictation converting spoken audio into punctuated text messages in real time',
      'Spam call blocker AI detecting robocall frequency patterns and muting incoming scams',
      'Battery management AI learning your sleep schedule to charge slowly overnight and protect battery health'
    ],
    simCode: 'word_input = "How r u"\npredictions = {"How r u": "How are you doing today? 😊", "I am h": "I am having lunch 🥪"}\nprint("Phone Autocorrect Suggestion:", predictions.get(word_input, "Unknown"))',
    simOutput: 'Phone Autocorrect Suggestion: How are you doing today? 😊',
    pairs: [
      { id: 'p1', term: 'Biometrics', definition: 'Using unique physical characteristics like face shape or fingerprints to unlock devices' },
      { id: 'p2', term: 'Predictive Text', definition: 'AI software guessing the next word you want to type based on language patterns' },
      { id: 'p3', term: 'NPU (Neural Processing Unit)', definition: 'A dedicated computer microchip inside a smartphone designed for fast AI calculations' }
    ],
    practice: {
      q: 'Which smartphone feature uses Computer Vision to automatically find pictures of your friends in your gallery?',
      opts: [
        'The volume rocker button',
        'Facial recognition and photo clustering AI',
        'The battery charging cable',
        'The screen brightness slider'
      ],
      correct: 1,
      exp: 'Photo gallery apps use Computer Vision models to recognize face structures and group matching pictures into personal albums.',
      hint: 'Think about which software capability can "see" and compare pictures.'
    },
    quizzes: [
      {
        q: 'Why is it safer when a smartphone runs Face Unlock on its own chip rather than sending the face scan to an online server?',
        opts: [
          { text: 'Because keeping biometric data on the local device protects user privacy and works offline without internet', isCorrect: true },
          { text: 'Because servers on the internet only like words, not pictures', isCorrect: false },
          { text: 'Because smartphone screens get warmer when connected to the web', isCorrect: false },
          { text: 'Because the camera turns off when internet is connected', isCorrect: false }
        ],
        exp: 'On-device AI keeps sensitive personal biometric information safe inside secure hardware enclaves without risking data leaks over networks.'
      },
      {
        q: 'What does a predictive keyboard use to suggest the next word while you type?',
        opts: [
          { text: 'Statistical language patterns learned from millions of common sentences', isCorrect: true },
          { text: 'A tiny human hidden under the glass screen', isCorrect: false },
          { text: 'A random number wheel that picks words alphabetically', isCorrect: false },
          { text: 'The battery percentage indicator', isCorrect: false }
        ],
        exp: 'Predictive text algorithms use language models trained on common sentence structures to anticipate the most probable subsequent word.'
      }
    ],
    practicalTask: {
      title: 'Smartphone AI Feature Audit',
      objective: 'Audit 3 smart features on a family smartphone with an adult and record their AI mechanisms.',
      steps: [
        'Open Camera App: Check if it highlights faces with yellow tracking boxes (Object Detection).',
        'Open Gallery Search: Type "cat", "car", or "tree" and observe how it finds photos without human tags (Image Classification).',
        'Open Keyboard: Type "Good morn" and see what word appears in the center prediction bubble (Natural Language Prediction).',
        'Summarise in your notebook how these 3 features save time and protect privacy.'
      ],
      expectedResult: 'You will observe 3 distinct AI models operating seamlessly on a modern mobile device.'
    },
    recall: {
      q: 'Name three places where AI operates inside a smartphone.',
      a: 'Face Unlock biometric vision, Predictive text auto-complete, and Computational photo night/portrait mode!'
    },
    takeaways: [
      'Smartphones contain specialized Neural Processing Units (NPUs) for fast on-device AI.',
      'Computer Vision powers face unlocking, portrait blurring, and gallery photo searching.',
      'Predictive keyboards analyze sentence patterns to speed up typing and correct typos.'
    ],
    gameMechanic: {
      title: 'Mobile Neural Feature Inspector',
      scenario: 'You are the Chief Hardware Engineer at SmartPhone Labs. A prototype phone has arrived with 4 disconnected feature circuits: Face Biometrics, Night Camera, Predictive Keyboard, and Battery Optimizer. You must connect each phone feature to its correct onboard AI engine.',
      objective: 'Link all 4 smartphone apps to their respective neural engine modules to achieve 100% benchmark performance score.',
      rules: [
        'Rule 1: Drag the glowing circuit line from the app icon to the corresponding AI Engine chip.',
        'Rule 2: Match Face Unlock &rarr; 3D Infrared Biometric Vision Engine.',
        'Rule 3: Match Predictive Text &rarr; Natural Language N-Gram Predictor.',
        'Rule 4: Match Night Mode &rarr; Multi-Frame Exposure Computational Vision.'
      ],
      choices: [
        'Connect Keyboard to NLP Language Engine',
        'Connect Front Camera to Biometric Enclave',
        'Connect Photo Gallery to Object Classifier',
        'Connect Battery to Adaptive Energy Predictor'
      ],
      progression: [
        'Circuit 1: Face Unlock verified in 0.18 seconds (+100 pts)',
        'Circuit 2: Autocomplete typing speed doubled (+100 pts)',
        'Circuit 3: Low-light photography noise eliminated (+120 pts)'
      ],
      completion: 'Smartphone prototype achieved 100% performance rating! Awarded the Mobile Tech Architect Badge.',
      badge: 'Mobile Tech Architect 📱',
      points: 320
    },
    reflectionSafety: {
      prompt: 'Why should you never use someone else\'s face or secretly look at their phone passcode without their permission?',
      rule: 'Digital Privacy Respect: A person’s phone contains their private family photos and messages. Always respect personal digital boundaries.',
      discussion: 'Why do operating systems ask for adult permission before granting apps access to your camera and microphone?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is the main job of the Neural Processing Unit (NPU) inside a smartphone?',
        opts: [
          'To make the phone casing waterproof',
          'To perform specialized AI and machine learning calculations at high speed on the device',
          'To clean the camera glass with tiny wipers',
          'To play ringtones louder'
        ],
        correct: 1,
        exp: 'An NPU is a specialized microchip optimized for running neural networks and AI models quickly and efficiently on smartphones.',
        hint: 'What does "Neural" refer to in modern computer hardware?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: When you search for "birthday cake" in your smartphone photo album, photos from three years ago appear even though you never typed a caption on them. How does the phone achieve this?',
        opts: [
          'The phone calls the bakery to ask when you bought cake',
          'Computer Vision models analyze the image pixels to recognise visual patterns of candles, frosting, and cake shapes',
          'The phone guesses randomly until it finds round objects',
          'A person at the phone company manually views all your photos'
        ],
        correct: 1,
        exp: 'Computer vision algorithms scan visual features (layers of frosting, candles, shapes) and tag images locally for instant keyword searching.',
        hint: 'Which AI technology enables software to recognise visual objects inside photos?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An app asks for permission to access your smartphone\'s Contacts, Microphone, Camera, and GPS Location just to play a simple offline tic-tac-toe game. What is the safest action?',
        opts: [
          'Grant all permissions immediately so the game loads faster',
          'Deny unnecessary permissions or uninstall the app because a simple puzzle game does not need private contacts and cameras',
          'Give the phone to a friend so they deal with it',
          'Turn the phone volume to zero and keep playing'
        ],
        correct: 1,
        exp: 'Responsible users practice the principle of least privilege: simple games do not require sensitive personal sensors (mic, camera, contacts) to operate.',
        hint: 'Does a simple tic-tac-toe board require access to your personal family phonebook?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'ai on the move': {
    title: 'AI on the Move',
    hook: 'How can an ambulance driver find the quickest way to the hospital during rush hour when streets are jammed, and how do self-driving shuttles see in foggy rain?',
    goal: 'Explore AI navigation, shortest-path algorithms, dynamic traffic heatmaps, and autonomous vehicles on modern roads and skies.',
    learnPoints: [
      'Learn how navigation apps use graph search algorithms to compute the fastest route in real time',
      'Discover how crowdsourced GPS data creates live green, orange, and red traffic heatmaps',
      'Understand how autonomous shuttles and delivery drones navigate safely using sensor fusion'
    ],
    analogy: 'AI in navigation is like an eagle soaring high above the city: while cars on the ground only see the bumper ahead, the eagle sees all the streets, knows where jams are building, and whispers the clearest detour in your ear!',
    explanationHtml: `<h3>Smart Mobility and Autonomous Roads</h3>
<p>Every minute of the day, millions of people travel to school, work, and markets. Managing traffic in giant cities used to be pure guesswork. Today, Artificial Intelligence coordinates traffic lights, navigation routes, and self-driving vehicles.</p>
<h4>1. How Map Apps Predict Traffic</h4>
<p>Smartphones travelling in vehicles anonymously share their speed and GPS location with navigation servers. If 50 phones suddenly slow from 50 km/h to 5 km/h on Main Street, the AI updates the street color to <strong>RED</strong> (Heavy Congestion) and redirects subsequent cars down alternative avenues.</p>
<h4>2. Shortest Distance vs Fastest Time</h4>
<ul>
  <li><strong>Shortest Distance:</strong> A direct line through narrow downtown lanes with 12 red traffic lights (Takes 25 minutes).</li>
  <li><strong>Fastest Route (AI Optimized):</strong> A slightly longer bypass highway with free-flowing traffic (Takes only 12 minutes!).</li>
</ul>
<h4>3. Autonomous Shuttles and Delivery Drones</h4>
<p>Autonomous electric shuttles use LiDAR lasers, radar, and cameras to navigate fixed college or airport campuses. Delivery drones use GPS waypoints and computer vision obstacle detectors to drop medical supplies in remote mountain clinics safely.</p>`,
    step1: {
      title: '1. Ingesting Real-Time Road Signals',
      desc: 'GPS satellites and road sensor beacons stream vehicle velocity data.',
      detail: 'Aggregated velocity feeds update digital city maps every 10 seconds.',
      code: 'road_speeds = get_live_gps_speeds("Main_Street") # e.g. 4 km/h'
    },
    step2: {
      title: '2. Running Graph Optimization (A* Search)',
      desc: 'The routing engine evaluates thousands of road intersections and traffic weights.',
      detail: 'It calculates estimated time of arrival (ETA) for each possible path.',
      code: 'best_route = calculate_fastest_route(origin, destination, traffic_weights)'
    },
    step3: {
      title: '3. Delivering Dynamic Turn-by-Turn Guidance',
      desc: 'The voice navigator announces detours before the vehicle gets trapped in gridlock.',
      detail: 'Saves fuel, reduces pollution, and cuts emergency vehicle travel times.',
      code: 'display_guidance("Turn right onto River Road to save 8 minutes 🟢")'
    },
    realScenario: 'During heavy monsoon rains, a fallen tree blocked the main highway leading to the city airport. An AI navigation app detected cars halting, immediately flagged the obstruction, and rerouted 400 travelers via an elevated bypass, preventing hundreds of missed flights.',
    useCases: [
      'Emergency ambulance dispatchers finding the fastest path through city rush hour to save lives',
      'Delivery vans optimizing 80 parcel drop-offs into an efficient fuel-saving delivery route',
      'Smart city traffic lights extending green light durations when sensor cameras detect heavy bus traffic'
    ],
    simCode: 'routes = {"Route A (Downtown)": {"km": 5, "min": 25}, "Route B (Bypass)": {"km": 9, "min": 12}}\nfastest = min(routes.items(), key=lambda x: x[1]["min"])\nprint(f"AI Navigation Recommendation: {fastest[0]} ({fastest[1][\'min\']} mins)")',
    simOutput: 'AI Navigation Recommendation: Route B (Bypass) (12 mins)',
    pairs: [
      { id: 'p1', term: 'GPS (Global Positioning System)', definition: 'A network of satellites orbiting Earth that pinpoint the location of devices on maps' },
      { id: 'p2', term: 'Traffic Heatmap', definition: 'Color-coded road lines (Green, Orange, Red) showing live traffic speeds' },
      { id: 'p3', term: 'Estimated Time of Arrival (ETA)', definition: 'The AI’s prediction of when you will reach your destination based on distance and traffic' }
    ],
    practice: {
      q: 'Why might a map app recommend a route that is 3 kilometres LONGER than the direct road?',
      opts: [
        'Because the app wants your car to burn more petrol',
        'Because the direct road has heavy traffic delays, so the longer highway route is much faster in time',
        'Because computers cannot measure kilometres properly',
        'Because the longer road has more ice cream shops'
      ],
      correct: 1,
      exp: 'Navigation AI prioritizes total arrival time. A slightly longer distance on an empty highway is frequently much faster than a short road stuck in gridlock.',
      hint: 'Think about whether you want the shortest distance or the fastest arrival time.'
    },
    quizzes: [
      {
        q: 'How does a navigation app know that a road is experiencing a traffic jam before any police officer reports it?',
        opts: [
          { text: 'By detecting that many smartphones travelling on that street have slowed down together', isCorrect: true },
          { text: 'By guessing randomly every Tuesday', isCorrect: false },
          { text: 'By calling every driver on the phone individually', isCorrect: false },
          { text: 'By asking the birds flying overhead', isCorrect: false }
        ],
        exp: 'Anonymous crowdsourced GPS data shows the app when hundreds of phones slow down simultaneously, indicating a traffic jam.'
      },
      {
        q: 'What color on a map app typically indicates smooth, free-flowing traffic?',
        opts: [
          { text: 'Dark Red', isCorrect: false },
          { text: 'Bright Green', isCorrect: true },
          { text: 'Flashing Purple', isCorrect: false },
          { text: 'Black', isCorrect: false }
        ],
        exp: 'Green indicates smooth free-flowing traffic, orange indicates slow-moving vehicles, and red indicates heavy congestion.'
      }
    ],
    practicalTask: {
      title: 'Route Comparison Experiment with an Adult',
      objective: 'Compare two routes to your school or local park using an online map application.',
      steps: [
        'Open a map application with a parent or teacher and type your school address.',
        'Compare Route 1 (Distance in km, Time in minutes) vs Route 2.',
        'Observe where the map lines turn yellow or red and identify why (construction, narrow lanes, traffic signals).',
        'Explain to your family which route is best and why time and distance are different.'
      ],
      expectedResult: 'You will understand how traffic density changes travel time independently of raw physical distance.'
    },
    recall: {
      q: 'How does AI help vehicles move efficiently through cities?',
      a: 'By analyzing live GPS traffic crowdsourcing and calculating the fastest detour routes to avoid traffic jams!'
    },
    takeaways: [
      'Navigation AI optimizes for arrival time rather than shortest physical distance.',
      'Crowdsourced vehicle speeds create live traffic heatmaps (Green, Orange, Red).',
      'Autonomous shuttles and drones rely on sensors and AI maps to travel safely.'
    ],
    gameMechanic: {
      title: 'Smart City Traffic Dispatcher',
      scenario: 'A major thunderstorm has caused traffic bottlenecks across Metro City. An ambulance, a school bus, and an eco-delivery shuttle need urgent routes to their destinations. You control the Central AI Traffic Dispatch Console!',
      objective: 'Reroute the 3 vehicles around flooded avenues and red gridlocks, reaching their destinations within the target time limits.',
      rules: [
        'Rule 1: Priority 1 to Emergency Ambulance (must reach hospital in < 10 mins).',
        'Rule 2: Click junctions to toggle AI detour bypasses.',
        'Rule 3: Avoid red congestion zones which add +8 penalty minutes.'
      ],
      choices: [
        'Ambulance Route: Bridge Route (Red Jam - 16m) VS Expressway Bypass (Green - 8m)',
        'School Bus Route: Market Street (Flooded - 20m) VS Outer Ring Road (Green - 11m)',
        'Delivery Shuttle Route: Main Avenue (Orange - 14m) VS Hill Parkway (Green - 9m)'
      ],
      progression: [
        'Mission 1: Ambulance reached Hospital Emergency Ward in 7m 45s (+120 pts)',
        'Mission 2: School bus delivered children safely to campus on schedule (+110 pts)',
        'Mission 3: Eco-shuttle completed deliveries with zero carbon delay (+110 pts)'
      ],
      completion: 'All city vehicles navigated through the storm with zero accidents! Awarded the Master City Navigator Badge.',
      badge: 'Master City Navigator 🚦',
      points: 340
    },
    reflectionSafety: {
      prompt: 'Why should a driver always keep their eyes on the actual road ahead, even if the GPS voice is giving instructions?',
      rule: 'Human Driver Responsibility: GPS is a helper. The human driver is always legally and ethically responsible for seeing pedestrians and following road safety.',
      discussion: 'What could happen if a driver looks at a smartphone screen instead of watching the crosswalk?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: In a GPS map application, what does a red colored road line mean?',
        opts: [
          'The road is made of red bricks',
          'Traffic is moving very slowly or completely jammed with congestion',
          'Only red colored sports cars are allowed on that street',
          'The road is closed forever'
        ],
        correct: 1,
        exp: 'Red signifies heavy traffic congestion with low average vehicle speeds.',
        hint: 'Like a red stop light, red indicates severe traffic slowdown.',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: An autonomous delivery drone is flying toward a customer\'s home. A sudden strong gust of wind pushes a flock of pigeons into its flight path. Which sensor system helps the drone detect and steer around the birds?',
        opts: [
          'Computer Vision optical cameras and ultrasonic proximity sensors',
          'The battery charging plug',
          'The plastic propeller guard color',
          'The cardboard shipping box weight'
        ],
        correct: 0,
        exp: 'Optical cameras and proximity sensors continuously scan the flight path, allowing flight control computers to execute evasive maneuvers.',
        hint: 'Which components provide eyes and spatial awareness for the drone?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI traffic light system in a busy city notices that Southbound traffic has 40 cars waiting while Eastbound traffic has only 2 cars. How does an adaptive smart traffic light respond differently from an old mechanical timer light?',
        opts: [
          'It turns off all lights and goes to sleep',
          'It dynamically extends the green light for the Southbound road until the 40 cars clear, rather than waiting for a fixed 60-second timer',
          'It blinks yellow and sounds an alarm siren',
          'It takes a photograph and posts it on social media'
        ],
        correct: 1,
        exp: 'Smart adaptive traffic systems adjust signal phase timings dynamically based on measured vehicle queue lengths, minimizing unnecessary waiting times.',
        hint: 'How does an intelligent system adapt to real-time road conditions?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 4: AI AND CAREER (Future Occupations & Human Technology Talents)
  // ═══════════════════════════════════════════════════════════════════════════

  'future job hunt': {
    title: 'Future Job Hunt',
    hook: 'When your grandparents were children, jobs like "App Developer" and "Drone Pilot" did not exist! What exciting new AI careers will be waiting for YOU when you grow up?',
    goal: 'Discover how AI transforms the workplace, automate repetitive tasks, and creates brand new professions like AI Trainers, Robotics Designers, and Digital Safety Guardians.',
    learnPoints: [
      'Understand that AI changes jobs rather than eliminating human work, automating repetitive chores and freeing people for creative tasks',
      'Discover exciting new careers: AI Trainer, Robotics Engineer, Data Detective, and Ethical Tech Auditor',
      'Learn why people who understand how to work alongside AI helpers will have great opportunities'
    ],
    analogy: 'AI in future jobs is like a power tool for a master carpenter: the electric saw cuts wood ten times faster, but you still need the clever carpenter to design the beautiful treehouse!',
    explanationHtml: `<h3>The Workplaces of Tomorrow</h3>
<p>Will robots take away all jobs? The answer from scientists is an emphatic <strong>NO</strong>! Technology changes the nature of work. Just as the invention of tractors helped farmers grow food with less backbreaking shovel work, AI is taking over boring, repeated, and dangerous tasks.</p>
<h4>Exciting New Careers Emerging with AI</h4>
<ul>
  <li><strong>AI Trainer / Prompt Specialist:</strong> Teaches AI systems by selecting good examples, curating fair data, and writing clear prompt guidelines.</li>
  <li><strong>Robotics Design Engineer:</strong> Builds and programs helpful robots for hospitals, underwater research, and space exploration.</li>
  <li><strong>Wildlife Conservation Drone Pilot:</strong> Uses AI computer vision drones to protect endangered tigers, elephants, and rainforests from poachers.</li>
  <li><strong>Digital Ethics & Safety Auditor:</strong> Tests new apps and algorithms to ensure they are fair, honest, and safe for children and families.</li>
</ul>
<p><strong>The Winning Formula:</strong> Human Heart + AI Brain = Incredible Progress! People bring empathy, kindness, and big dreams, while AI brings speed and memory.</p>`,
    step1: {
      title: '1. Automating the 3 D\'s: Dull, Dirty, and Dangerous',
      desc: 'Machines take over tasks that are hazardous or mind-numbing for people.',
      detail: 'Sorting 50,000 barcode labels or inspecting deep underwater oil pipes.',
      code: '# Repetitive Task Automation\nfor item in 50000_parcels:\n    sort_by_destination_zipcode(item)'
    },
    step2: {
      title: '2. Amplifying Human Creativity and Problem Solving',
      desc: 'Professionals use AI helpers to test ideas and prototype solutions quickly.',
      detail: 'Architects sketch 10 energy-saving eco-house concepts in one morning.',
      code: 'eco_designs = ai_generate_solar_layouts(budget=10000)'
    },
    step3: {
      title: '3. Creating New Collaborative Roles',
      desc: 'New job titles emerge that focus on guiding, testing, and auditing AI systems.',
      detail: 'Ensures technology serves human well-being with fairness and care.',
      code: 'verify_algorithm_fairness(model="admissions_checker")'
    },
    realScenario: 'Dr. Anita used to spend 4 hours every evening typing clinical notes and organizing paper files. Now, an AI voice transcription assistant drafts her reports in 10 minutes. Dr. Anita uses the saved hours to sit with sick children, listen to their concerns, and comfort anxious parents.',
    useCases: [
      'Architects using AI design simulators to plan earthquake-proof, solar-powered schools',
      'Marine biologists using underwater AI cameras to count coral reef species without disturbing fish',
      'Fashion designers collaborating with generative AI to weave fabrics made from recycled ocean plastics'
    ],
    simCode: 'jobs_2040 = ["AI Wildlife Protector 🐅", "Robotics Healthcare Nurse 🩺", "Space Colony Architect 🚀"]\nfor i, job in enumerate(jobs_2040, 1):\n    print(f"Emerging Career {i}: {job}")',
    simOutput: 'Emerging Career 1: AI Wildlife Protector 🐅\nEmerging Career 2: Robotics Healthcare Nurse 🩺\nEmerging Career 3: Space Colony Architect 🚀',
    pairs: [
      { id: 'p1', term: 'AI Trainer', definition: 'A person who teaches AI models by feeding them high-quality, balanced examples' },
      { id: 'p2', term: 'Automation', definition: 'Using machines or computers to perform repetitive tasks automatically' },
      { id: 'p3', term: 'Human-AI Collaboration', definition: 'Humans and AI working together as a team to achieve better results than either could alone' }
    ],
    practice: {
      q: 'Which of the following is an example of an emerging future career created by technology?',
      opts: [
        'Stone Age spear sharpener',
        'AI Data Detective and Ethics Auditor',
        'Horse buggy wheel greaser',
        'Handwritten scroll courier'
      ],
      correct: 1,
      exp: 'AI Data Detectives and Ethics Auditors test machine learning systems to ensure fairness, accuracy, and safety.',
      hint: 'Look for the career that deals with data, technology, and modern ethics.'
    },
    quizzes: [
      {
        q: 'What type of tasks are robots best suited for in factories and workplaces?',
        opts: [
          { text: 'Tasks that are dull, repetitive, dangerous, or require lifting heavy weights', isCorrect: true },
          { text: 'Tasks that require comforting sad patients with warm hugs', isCorrect: false },
          { text: 'Inventing imaginative fairy-tale stories from childhood memories', isCorrect: false },
          { text: 'Solving playground arguments with empathy', isCorrect: false }
        ],
        exp: 'Robots excel at dull, repetitive, and physically hazardous jobs, while humans excel at empathy, creativity, and moral judgment.'
      },
      {
        q: 'How does learning about AI now help Std 4 students in their future careers?',
        opts: [
          { text: 'It prepares them to understand, use, and guide smart tools in whatever career they choose', isCorrect: true },
          { text: 'It forces everyone to become computer hardware repairers', isCorrect: false },
          { text: 'It means they will never need to read books again', isCorrect: false },
          { text: 'It lets computers do all their thinking for them', isCorrect: false }
        ],
        exp: 'Understanding how AI works enables students to thrive in any profession—from medicine and arts to sports and engineering.'
      }
    ],
    practicalTask: {
      title: 'Design Your 2040 Business Card',
      objective: 'Invent a futuristic career card for yourself in the year 2040 combining your passions with an AI helper.',
      steps: [
        'Choose what you love today: Animals, Space, Sports, Art, Cooking, or Medicine.',
        'Combine it with an AI tool: e.g., "AI Wildlife Sanctuary Director", "Galactic Rover Mechanic", or "Digital Animated Film Architect".',
        'Write your Job Title, your Motto, and 2 ways your AI assistant helps you do good in the world.',
        'Decorate your card and present it to your class or family.'
      ],
      expectedResult: 'You will envision yourself as an active leader shaping technology rather than a passive observer.'
    },
    recall: {
      q: 'Will AI take away all future jobs?',
      a: 'No! AI automates repetitive tasks and creates exciting new careers where humans and smart machines collaborate!'
    },
    takeaways: [
      'Technology changes jobs by taking over dull, dirty, and dangerous repetitive tasks.',
      'New careers like AI Trainers, Robotics Designers, and Ethics Auditors are rapidly emerging.',
      'The future belongs to people who combine human creativity and empathy with smart AI tools.'
    ],
    gameMechanic: {
      title: '2040 Career Time Capsule Matcher',
      scenario: 'A time capsule from the year 2040 has landed at your school! Inside are 3 urgent community challenges that need future experts. You must match each challenge to the right future professional and equip them with the proper AI tool.',
      objective: 'Solve all 3 future challenges by assembling the right team of human specialists and AI assistants.',
      rules: [
        'Rule 1: Read the community challenge card carefully.',
        'Rule 2: Select the matching human professional role.',
        'Rule 3: Pair them with the specialized AI assistant tool.'
      ],
      choices: [
        'Challenge 1: Coral Bleaching in the Ocean &rarr; Marine Biologist + Deep-Sea AI Camera Rover',
        'Challenge 2: Traffic Gridlock in Flying Shuttle Port &rarr; Skyport Logistics Architect + Air Traffic Radar AI',
        'Challenge 3: Rare Plant Disease in Community Greenhouse &rarr; Botanical Tech Specialist + Crop Health Drone'
      ],
      progression: [
        'Mission 1: Coral reef saved and baby corals mapped (+110 pts)',
        'Mission 2: Skyport flight paths aligned with zero delays (+120 pts)',
        'Mission 3: Greenhouse plants cured with targeted organic nutrients (+120 pts)'
      ],
      completion: 'All 3 future challenges solved! Earn the Future Career Pioneer Badge.',
      badge: 'Future Career Pioneer 🚀',
      points: 350
    },
    reflectionSafety: {
      prompt: 'If an AI can write an essay in 5 seconds, why is it still important for you to practice writing and thinking for yourself?',
      rule: 'Brain Growth Rule: Your brain is like a muscle. When you write, solve puzzles, and think for yourself, your brain becomes stronger and more creative.',
      discussion: 'What happens to an athlete\'s muscles if a robot carries them everywhere instead of running?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is the main reason robots are used in car manufacturing factories instead of humans for heavy welding?',
        opts: [
          'Robots can lift heavy steel frames repeatedly without getting tired or burned by sparks',
          'Robots like the smell of paint',
          'Cars made by robots are painted with chocolate',
          'Humans are not allowed inside factories'
        ],
        correct: 0,
        exp: 'Industrial robots excel at tasks with extreme weight, heat, and high repetition where humans would risk severe fatigue and physical injury.',
        hint: 'Think about fatigue and safety in heavy industrial environments.',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Which of the following best describes the role of an "AI Ethics Auditor"?',
        opts: [
          'A technician who polishes computer screens with cloth',
          'An expert who reviews and tests AI algorithms to ensure they treat all people fairly and keep private data secure',
          'A gamer who plays video games 24 hours a day',
          'A salesperson who sells smartphones in a shop'
        ],
        correct: 1,
        exp: 'Ethics Auditors ensure algorithms adhere to human values: fairness, transparency, privacy, and safety.',
        hint: 'What does "Ethics" mean when designing technology?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An architectural firm adopted an AI program that generates 50 building blueprints in seconds. How did the job of the human architects change?',
        opts: [
          'All architects lost their jobs and the building designed itself',
          'The architects stopped drawing brick by brick; instead, they focused on interviewing community families, selecting the most beautiful eco-friendly designs, and verifying safety',
          'The architects threw away their computers and returned to drawing on stone tablets',
          'The buildings were built out of cardboard'
        ],
        correct: 1,
        exp: 'AI automates drafting speed, elevating humans to higher-level design judgment, empathy with community residents, and structural safety verification.',
        hint: 'How does high-level human judgment guide automated design proposals?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'my technology talent': {
    title: 'My Technology Talent',
    hook: 'A computer can calculate 10 million math sums in a blink, but it cannot feel happy when you smile or understand why a friend is crying. What are YOUR human superpowers that no machine can ever replace?',
    goal: 'Celebrate irreplaceable human capabilities—Empathy, Creativity, Moral reasoning, Teamwork, and Curiosity—and understand how they complement computer strengths.',
    learnPoints: [
      'Identify what machines do best (speed, calculation, memory, pattern recognition across big data)',
      'Celebrate what humans do best (empathy, kindness, imagination, ethics, and emotional connection)',
      'Discover your own personal technology talents and learn how to use them to help others'
    ],
    analogy: 'A computer is like a high-speed calculator: lightning fast at numbers, but with zero heart. You are the artist, poet, and friend who gives technology its purpose, kindness, and soul!',
    explanationHtml: `<h3>The Human Superpower vs The Machine Brain</h3>
<p>Sometimes people worry: <em>"If computers are so smart, what will be left for me to do?"</em> The secret is understanding that computers and humans are smart in completely different ways!</p>
<h4>The Great Comparison Table</h4>
<table border="1" cellpadding="6">
  <tr><th>Machine Strengths 🤖</th><th>Human Superpowers 🧒</th></tr>
  <tr><td>Calculating millions of math sums in 1 second</td><td>Imagining new fairy tales and original stories</td></tr>
  <tr><td>Scanning 100,000 photos without getting sleepy</td><td>Feeling true empathy when a friend is hurt</td></tr>
  <tr><td>Remembering huge tables of facts and numbers</td><td>Understanding fairness, justice, and right from wrong</td></tr>
  <tr><td>Repeating identical mechanical motions forever</td><td>Laughing at a silly joke and sharing kindness</td></tr>
</table>
<h4>Your Six Future Super-Skills</h4>
<ul>
  <li><strong>1. Creativity:</strong> Inventing original ideas that never existed before.</li>
  <li><strong>2. Critical Thinking:</strong> Asking "Is this really true?" and checking facts before trusting.</li>
  <li><strong>3. Communication:</strong> Sharing your ideas with warmth, clarity, and listening to others.</li>
  <li><strong>4. Teamwork:</strong> Cooperating with diverse friends to achieve a shared dream.</li>
  <li><strong>5. Kindness & Empathy:</strong> Caring about how others feel and helping those in need.</li>
  <li><strong>6. Curiosity:</strong> Asking "Why?" and "How?" and never losing the joy of learning!</li>
</ul>`,
    step1: {
      title: '1. Recognize Computational Tasks (Delegate to AI)',
      desc: 'Use computers for rapid calculations, data sorting, and pattern checks.',
      detail: 'Let the calculator do the arithmetic; let the camera count the pixels.',
      code: '# Machine calculation\nresult = sum(range(1, 1000000))'
    },
    step2: {
      title: '2. Deploy Human Judgment (Lead with Values)',
      desc: 'Apply your ethical values to decide what is fair, kind, and beneficial.',
      detail: 'A machine can suggest three routes, but a human decides which route is safe.',
      code: 'if is_fair_and_kind(action):\n    proceed()'
    },
    step3: {
      title: '3. Spark Original Creativity (Bring Unique Ideas)',
      desc: 'Infuse your unique life experiences and imagination into creations.',
      detail: 'Your drawings, stories, and inventions carry your personal heart and voice.',
      code: 'create_original_story(theme="Kindness in Outer Space")'
    },
    realScenario: 'When designing a children\'s playground, an AI engineering tool generated 30 slide structures with zero friction calculations. But 9-year-old Kabir noticed that none of the designs had ramps for children in wheelchairs. Kabir added gentle accessible ramps, creating a playground where every child could play together.',
    useCases: [
      'Doctors holding a nervous patient’s hand with warmth while using AI scan readers to check reports',
      'Teachers encouraging a shy student to speak up while using adaptive learning apps for math practice',
      'Game designers writing heartwarming stories about friendship while AI engines render the 3D graphics'
    ],
    simCode: 'human_talents = ["Empathy 💛", "Imagination 🎨", "Kindness 🤝", "Curiosity 🔍"]\nfor talent in human_talents:\n    print(f"Human Superpower unlocked: {talent}")',
    simOutput: 'Human Superpower unlocked: Empathy 💛\nHuman Superpower unlocked: Imagination 🎨\nHuman Superpower unlocked: Kindness 🤝\nHuman Superpower unlocked: Curiosity 🔍',
    pairs: [
      { id: 'p1', term: 'Empathy', definition: 'The ability to understand, share, and care about the feelings of another person' },
      { id: 'p2', term: 'Critical Thinking', definition: 'Asking questions and verifying facts carefully before accepting information' },
      { id: 'p3', term: 'Creativity', definition: 'The superpower of imagining and producing fresh, original, and innovative ideas' }
    ],
    practice: {
      q: 'Which of the following is a uniquely human superpower that AI systems do NOT have?',
      opts: [
        'Calculating 500 divided by 25',
        'Feeling genuine kindness and comforting a crying friend',
        'Storing 10,000 photos on a hard drive',
        'Searching for words in an online dictionary'
      ],
      correct: 1,
      exp: 'AI has no feelings, consciousness, or emotional empathy. Empathy and kindness are uniquely human capabilities.',
      hint: 'Which option involves feelings and caring for someone\'s heart?'
    },
    quizzes: [
      {
        q: 'Why will human creativity always remain essential, even as AI image and story tools get faster?',
        opts: [
          { text: 'Because AI only remix patterns from past human data, while humans invent original ideas with feelings and lived experiences', isCorrect: true },
          { text: 'Because computers run out of paper', isCorrect: false },
          { text: 'Because humans have faster clock speeds than microchips', isCorrect: false },
          { text: 'Because AI tools turn off whenever someone has a good idea', isCorrect: false }
        ],
        exp: 'Generative AI models combine patterns from existing data. Genuine originality, lived emotional experiences, and fresh creative purpose come from human imagination.'
      },
      {
        q: 'When working in a team project with smart technology, what is the best role for the human student?',
        opts: [
          { text: 'The creative thinker and ethical decision-maker who guides the tools', isCorrect: true },
          { text: 'A silent observer who copies whatever the screen shows', isCorrect: false },
          { text: 'Someone who ignores all tools and works in the dark', isCorrect: false },
          { text: 'A machine operator who never talks to teammates', isCorrect: false }
        ],
        exp: 'Students should lead with their human thinking, ethical principles, and creative direction when utilizing digital tools.'
      }
    ],
    practicalTask: {
      title: 'Build Your "Tech Talent Tree"',
      objective: 'Create a visual poster identifying your top 3 human superpowers and how you will use them alongside technology.',
      steps: [
        'Draw a tree with 3 strong branches on paper.',
        'Branch 1: Label your top Creative Talent (Drawing, Storytelling, Music, Building).',
        'Branch 2: Label your top Social Talent (Listening, Teamwork, Kindness, Cheering up friends).',
        'Branch 3: Label your top Thinking Talent (Curiosity, Asking Questions, Spotting patterns).',
        'At the roots, write your Golden Motto: "I am the captain of my technology!"'
      ],
      expectedResult: 'You will build confidence in your distinct human strengths that make you irreplaceable.'
    },
    recall: {
      q: 'What is the biggest difference between a machine brain and a human brain?',
      a: 'Machines excel at speed, calculation, and data memory; humans have heart, empathy, kindness, imagination, and moral judgment!'
    },
    takeaways: [
      'Computers process data and numbers at blinding speeds, but have zero feelings.',
      'Human superpowers include Empathy, Creativity, Critical Thinking, and Kindness.',
      'When humans lead with their values and use AI as a helper, great things are possible.'
    ],
    gameMechanic: {
      title: 'Human Superpower vs Robot Calculator',
      scenario: 'The Grand Talent Arena has a giant balance scale! 6 challenge cards have appeared. You must classify each task: Does it belong on the "Robot Calculator" tray (speed, big numbers, repeated tasks) or the "Human Superpower" tray (empathy, original art, kindness, moral fairness)?',
      objective: 'Balance the scale with 100% accuracy to unlock the Golden Human Edge Trophy.',
      rules: [
        'Rule 1: Drag cards with math, data, or mechanical repetition to the Robot side.',
        'Rule 2: Drag cards with feelings, ethical choices, or artistic imagination to the Human side.',
        'Rule 3: Achieve a balanced score across both trays.'
      ],
      choices: [
        'Card A: Finding spelling typos across 200 pages &rarr; Robot Calculator',
        'Card B: Comforting a teammate who lost a game &rarr; Human Superpower',
        'Card C: Sorting 10,000 photos by file size &rarr; Robot Calculator',
        'Card D: Deciding if a new school rule is fair to everyone &rarr; Human Superpower',
        'Card E: Calculating rocket fuel burns &rarr; Robot Calculator',
        'Card F: Writing a heartfelt poem for your mother &rarr; Human Superpower'
      ],
      progression: [
        'Sort 1: Calculated and repetitive cards placed on robot side (+100 pts)',
        'Sort 2: Emotional and ethical cards placed on human side (+120 pts)',
        'Sort 3: The Golden Balance Scale leveled perfectly (+120 pts)'
      ],
      completion: 'The arena cheered as the perfect balance between human heart and robot calculation was achieved! Awarded the Human Edge Champion Badge.',
      badge: 'Human Edge Champion 🌟',
      points: 340
    },
    reflectionSafety: {
      prompt: 'If a computer program tells you that a student should be excluded from a school play based on an algorithm score, should the teacher accept it blindly?',
      rule: 'Moral Responsibility Rule: Never allow an algorithm to make decisions that harm or exclude people. Humans must always step in with kindness and fairness.',
      discussion: 'Why can a machine never truly understand what is fair and kind?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following tasks is performed much better and faster by an AI computer than by a human child?',
        opts: [
          'Feeling happy when seeing a beautiful rainbow',
          'Sorting 200,000 library books by serial number in 3 seconds',
          'Making friends on the first day of school',
          'Showing compassion to an injured puppy'
        ],
        correct: 1,
        exp: 'Computers excel at high-speed sorting and database searches across vast quantities of data.',
        hint: 'Which task involves processing hundreds of thousands of numbers or records?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Maya is writing a fantasy story about a girl who befriends a talking dolphin. She uses an AI chatbot to brainstorm 3 fantasy dolphin names. Who is the true creator and author of the story?',
        opts: [
          'The AI chatbot, because it provided names',
          'Maya, because she envisioned the story, chose the best ideas, wrote the plot, and gave the story its emotional heart',
          'The computer manufacturer company',
          'Nobody owns the story'
        ],
        correct: 1,
        exp: 'Maya is the author and creator. Using an AI tool to brainstorm ideas is like consulting a dictionary; the human writer directs the vision and emotional narrative.',
        hint: 'Who had the original idea and makes the creative narrative decisions?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI was trained to evaluate student artwork and score it from 1 to 10. A student submitted an unusual painting of a purple sunflower crying rainbow tears. The AI gave it a score of 1 because it had never seen a purple crying sunflower in its training photos. Why was the AI score flawed?',
        opts: [
          'Because the computer was out of ink',
          'Because AI judges art based only on past common patterns, lacking the emotional capacity to appreciate original, metaphorical human creativity',
          'Because purple is a bad color',
          'Because sunflowers are never tall'
        ],
        correct: 1,
        exp: 'AI evaluates conformity to past statistical patterns. True human art often breaks past patterns intentionally to evoke unique emotion and meaning.',
        hint: 'Does AI understand metaphorical meaning and emotional symbolism in art?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 5: AI TOOLS (Story Co-Creation & Generative Visual Design)
  // ═══════════════════════════════════════════════════════════════════════════

  'create a story': {
    title: 'Create a Story',
    hook: 'Have you ever had a brilliant idea for a galactic pirate rabbit, but got stuck staring at a blank piece of paper? How can an AI story helper help you brainstorm without writing the whole book for you?',
    goal: 'Master the collaborative art of story co-creation with generative AI, using character prompts, plot branching, descriptive adjectives, and ethical attribution.',
    learnPoints: [
      'Learn the 3-step co-creation cycle: Your Idea First &rarr; AI Brainstorms Second &rarr; You Choose and Polish Third',
      'Discover how to craft rich narrative prompts specifying Characters, Setting, Problem, and Twist',
      'Understand the ethics of story creation: never copying blindly and always adding your own heart'
    ],
    analogy: 'Using an AI story tool is like playing tennis with a friendly wall: you hit your original idea forward, the wall bounces back three fun twists, and you choose the best shot to score a winning match!',
    explanationHtml: `<h3>The Co-Author Studio: Writing Stories Together</h3>
<p>Generative AI tools can generate paragraphs, dialogues, and poems in seconds. But an AI has never lived a human life—it has never tasted ice cream on a hot day, felt nervous on the first day of school, or celebrated a birthday. That’s why the best stories come from <strong>Human-AI Co-Creation</strong>!</p>
<h4>The Golden Rule of Co-Creation</h4>
<ol>
  <li><strong>1. You Bring the Spark:</strong> Come up with your original concept, hero character, and core message.</li>
  <li><strong>2. AI Brainstorms Variations:</strong> Ask the AI for 3 surprising plot twists or 5 funny catchphrases.</li>
  <li><strong>3. You Steer the Story:</strong> Pick the twist you love, change the words into your own voice, and write the final ending!</li>
</ol>
<h4>The 4-Part Story Prompt Blueprint</h4>
<ul>
  <li><strong>Hero Character:</strong> "A tiny mechanical owl who is afraid of thunder."</li>
  <li><strong>Atmospheric Setting:</strong> "In a clocktower library during a midnight thunderstorm."</li>
  <li><strong>Core Conflict:</strong> "The clock gears get jammed by an ancient glowing vine."</li>
  <li><strong>Tone & Style:</strong> "A whimsical, suspenseful, 6-line children\'s story with a warm happy ending."</li>
</ul>`,
    step1: {
      title: '1. Plant the Narrative Seed',
      desc: 'Define the protagonist character and setting with unique details.',
      detail: 'Choose an unexpected personality trait (e.g. a dragon who loves gardening).',
      code: 'character = "Pip the clockwork hummingbird"\nsetting = "A garden made of glowing copper gears"'
    },
    step2: {
      title: '2. Generate Plot Alternatives with AI',
      desc: 'Request 3 distinct obstacles or plot branches to overcome writer’s block.',
      detail: 'Inspect the suggestions and select the one that surprises you most.',
      code: 'prompt = f"Give 3 funny obstacles for {character} in {setting}"\noptions = ai_generate_ideas(prompt)'
    },
    step3: {
      title: '3. Personalize and Polish in Your Own Voice',
      desc: 'Rewrite sentences, remove clunky phrasing, and write your own genuine ending.',
      detail: 'Ensure the story expresses your intended values of bravery and kindness.',
      code: 'final_story = polish_in_student_voice(selected_option)'
    },
    realScenario: 'Zoya had writer\'s block during creative writing class. She prompted an AI helper: "What are 3 funny reasons why a spaceship engine might stop working?" The AI suggested: \'An alien space hamster hid a giant walnut in the fuel pipe!\' Zoya burst out laughing and wrote a 3-page comedic space adventure that delighted her teacher.',
    useCases: [
      'Students brainstorming creative metaphors and character names for school literature projects',
      'Game authors drafting branching dialogue choices for adventure video games',
      'Teachers generating rhyming riddles to make history lessons memorable'
    ],
    simCode: 'prompt_blocks = {"Hero": "Barnaby the detective badger", "Mystery": "Missing library book", "Twist": "The book was borrowed by the school ghost"}\nprint("Crafting Collaborative Story Outline...")\nprint(f"Title: {prompt_blocks[\'Hero\']} and the {prompt_blocks[\'Mystery\']}")',
    simOutput: 'Crafting Collaborative Story Outline...\nTitle: Barnaby the detective badger and the Missing library book',
    pairs: [
      { id: 'p1', term: 'Generative AI', definition: 'AI tools capable of creating new text, pictures, or sounds from written prompts' },
      { id: 'p2', term: 'Co-Creation', definition: 'The collaborative process where a human director guides an AI tool to produce creative works' },
      { id: 'p3', term: 'Plot Twist', definition: 'An unexpected turn of events in a story that surprises and delights the reader'
    }
  ],
    practice: {
      q: 'What is the most creative way for a student to use an AI tool when writing a story?',
      opts: [
        'Ask the AI to write the whole story, copy-paste it, and pretend you wrote every word',
        'Use the AI to brainstorm 3 plot twists, select the best one, and write the story in your own words with your own feelings',
        'Let the AI choose your character, ending, and title without reading it',
        'Avoid reading any books and only watch screens'
      ],
      correct: 1,
      exp: 'Co-creation means using AI as a brainstorming buddy while keeping your own voice, thoughts, and emotional ending at the center of the story.',
      hint: 'Which option combines AI brainstorming with your own real writing and ideas?'
    },
    quizzes: [
      {
        q: 'Why should a student NOT copy-paste an entire AI-generated story and claim they wrote it?',
        opts: [
          { text: 'Because that is dishonest (plagiarism), and you miss the opportunity to develop your own writing and thinking skills', isCorrect: true },
          { text: 'Because computers will send a letter to your house', isCorrect: false },
          { text: 'Because the font will turn invisible', isCorrect: false },
          { text: 'Because AI words have a bad smell' },
        ],
        exp: 'Claiming someone else’s (or an AI’s) work as your own is dishonest. The true value of school writing is training your own brain muscles.'
      },
      {
        q: 'Which prompt gives the AI the best information to suggest a fun story opening?',
        opts: [
          { text: 'Write a story.', isCorrect: false },
          { text: 'A short funny opening about Leo, a clumsy baby dragon who accidentally sneezes bubbles instead of fire, children\'s book style', isCorrect: true },
          { text: 'Dragon story please.', isCorrect: false },
          { text: 'Something about an animal doing things.', isCorrect: false }
        ],
        exp: 'Specifying the character name, unique trait (sneezes bubbles), tone (funny), and style produces tailored creative suggestions.'
      }
    ],
    practicalTask: {
      title: 'Co-Author a 4-Line Rhyming Fable',
      objective: 'Compose a 4-line rhyming fable about kindness using the 3-step co-creation method.',
      steps: [
        'Step 1 (Your Idea): Choose two animal heroes (e.g., An Ant and a Bear).',
        'Step 2 (AI Helper): Ask an AI helper: \"Suggest 3 pairs of rhyming words for Bear and Care in a fable about sharing fruit.\"',
        'Step 3 (Your Words): Choose the best rhyming pair and write your 4-line poem by hand in your notebook.',
        'Draw an illustration beside your fable and share it with your family.'
      ],
      expectedResult: 'You will experience the joy of directing technology to enrich your personal creative writing.'
    },
    recall: {
      q: 'What are the three steps of healthy AI co-creation?',
      a: '1. Your idea first &rarr; 2. AI brainstorms options second &rarr; 3. You choose, personalize, and write in your own voice third!'
    },
    takeaways: [
      'Generative AI is a powerful brainstorming partner for overcoming writer’s block.',
      'A great story prompt specifies Character, Setting, Conflict, and Tone.',
      'Always remain honest: use AI to inspire your imagination, never to replace your own thinking.'
    ],
    gameMechanic: {
      title: 'Co-Author Story Quest Studio',
      scenario: 'The Whispering Library has a magical storybook whose pages have vanished! You and Robo-Pi must co-author an interactive 3-chapter mystery: "The Mystery of the Clockwork Owl". At each chapter crossroad, you must craft the prompt, pick the plot branch, and rewrite the final sentence!',
      objective: 'Complete all 3 chapters of the mystery storybook and earn a 5-star author rating.',
      rules: [
        'Rule 1: Build the prompt using Character + Setting + Conflict blocks.',
        'Rule 2: Choose between 2 generated branch paths (e.g. Hidden Tunnel vs Sky Tower).',
        'Rule 3: Polish the chapter climax sentence in your own words.'
      ],
      choices: [
        'Chapter 1: Meet Barnaby the Clockwork Owl in the Grand Attic',
        'Chapter 2 Choice: Investigate the rattling gears OR Follow the silver pawprints',
        'Chapter 3 Climax: Solve the riddle of the golden key and restore the library clock'
      ],
      progression: [
        'Chapter 1: Character established and attic mystery atmosphere set (+100 pts)',
        'Chapter 2: Clues gathered along the silver pawprint trail (+120 pts)',
        'Chapter 3: Heartwarming friendship ending authored with high polish (+130 pts)'
      ],
      completion: 'The storybook illuminated with glowing golden ink! Awarded the Master Storyteller Quill Badge.',
      badge: 'Master Storyteller 🪶',
      points: 350
    },
    reflectionSafety: {
      prompt: 'If you use an AI tool to help brainstorm ideas for a school writing competition, what should you tell your teacher?',
      rule: 'Honesty & Attribution Rule: Always be honest with teachers and parents about how technology helped you brainstorm.',
      discussion: 'Why do true creators take pride in giving credit to their tools and inspirations?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: What is "Generative AI"?',
        opts: [
          'A battery charger that generates electricity for phones',
          'AI computer programs that can generate new text, stories, images, or audio from prompts',
          'A factory robot that welds car doors',
          'A computer screen that generates heat'
        ],
        correct: 1,
        exp: 'Generative AI refers to algorithms (like large language models and diffusion models) that generate novel content based on user prompts.',
        hint: 'What does the word "generate" mean?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: Sanya wants to write a mystery story. Which step should she complete BEFORE asking an AI tool for writing assistance?',
        opts: [
          'She should print out 50 blank sheets of paper',
          'She should brainstorm her own core idea, main character, and the moral lesson of the story',
          'She should ask the AI to write her whole school exam',
          'She should turn off her imagination'
        ],
        correct: 1,
        exp: 'In effective co-creation, the human establishes the creative spark, values, and narrative intention before using digital brainstorming tools.',
        hint: 'Remember the rule: Whose idea comes first in co-creation?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI story tool wrote this sentence: "The astronaut took off her helmet to enjoy the cool breeze on the surface of the Moon." What factual error did the AI make, and why did it make it?',
        opts: [
          'No error; astronauts love breezes',
          'The AI hallucinated: the Moon has no atmosphere or air, so there is no breeze. The AI mixed poetic story words with science facts',
          'The Moon is made of cheese so it is warm',
          'Helmets cannot be worn on the Moon'
        ],
        correct: 1,
        exp: 'AI predicts words based on statistical associations (enjoy + cool breeze), lacking genuine physical understanding of the airless lunar environment. Humans must always fact-check.',
        hint: 'Is there breathable air or wind on the surface of the Moon?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'design with ai': {
    title: 'Design with AI',
    hook: 'How can you transform a simple written sentence like "A magical treehouse powered by glowing fireflies at twilight" into a stunning digital painting in 10 seconds?',
    goal: 'Explore AI image generation and computer-assisted visual design, mastering style keywords, composition parameters, lighting descriptors, and ethical digital art practices.',
    learnPoints: [
      'Learn how text-to-image AI tools turn descriptive words into visual pixel compositions',
      'Master prompt tokens for style (watercolor, pixel art, 3D clay), lighting (golden hour, neon glow), and viewpoint (wide angle, macro closeup)',
      'Understand ethical digital design: respecting artists, never creating misleading images, and adding your own artistic touch'
    ],
    analogy: 'Using an AI design tool is like being an art director at a movie studio: you don\'t have to mix every paint pigment yourself, but you must describe the exact mood, lighting, costumes, and camera angles for your team to create your masterpiece!',
    explanationHtml: `<h3>The AI Art Director’s Studio</h3>
<p>Modern AI tools can create pictures, posters, and illustrations from simple text descriptions. But an AI doesn’t "know" what beauty is; it studied millions of captioned photos and paintings to learn which pixel patterns correspond to words like <em>"sunset"</em>, <em>"watercolor"</em>, or <em>"castle"</em>.</p>
<h4>The 3 Magic Ingredients of a Visual Prompt</h4>
<ol>
  <li><strong>1. Subject & Action:</strong> Exactly who or what is in the picture? (e.g. <em>"A smiling golden retriever puppy wearing a red superhero cape running through autumn leaves"</em>).</li>
  <li><strong>2. Artistic Medium & Style:</strong> How is it rendered? (e.g. <em>"Vibrant children\'s storybook illustration", "Soft watercolor wash", "Retro 8-bit pixel art", "Playful 3D claymation"</em>).</li>
  <li><strong>3. Lighting & Environment:</strong> What is the mood and atmosphere? (e.g. <em>"Warm golden hour sunlight, sparkling dust motes, pastel sky"</em>).</li>
</ol>
<h4>Using Visual AI Responsibly</h4>
<p>Never generate fake pictures to trick, embarrass, or tease people. Always use design tools to inspire joy, celebrate science, and create beautiful educational posters!</p>`,
    step1: {
      title: '1. Select the Core Visual Subject',
      desc: 'Define the focal point clearly with colours, poses, and accessories.',
      detail: 'Avoid vague phrases like "a building"; specify "an eco-friendly treehouse school with solar leaves".',
      code: 'subject = "futuristic_treehouse_with_solar_panels"'
    },
    step2: {
      title: '2. Specify Art Medium and Style Modifiers',
      desc: 'Guide the visual texture by choosing a distinct artistic medium.',
      detail: 'Add style tokens like "claymation", "vector flat art", or "watercolor wash".',
      code: 'style = ["claymation_texture", "playful_pastel_colors", "macro_lens_focus"]'
    },
    step3: {
      title: '3. Calibrate Lighting and Camera Perspective',
      desc: 'Direct the camera position and atmospheric lighting conditions.',
      detail: 'Use terms like "birds-eye view", "warm sunset illumination", or "soft diffused studio light".',
      code: 'lighting = "warm_golden_hour_sunlight"\nview = "low_angle_hero_shot"'
    },
    realScenario: 'For the School Science Fair, Meera wanted a poster on ocean clean-up. She combined prompt tokens: "A friendly solar-powered turtle submarine collecting plastic bottles from coral reefs, vibrant 3D cartoon style, crystal-clear turquoise water, bright sunny lighting." The resulting poster drew the largest crowd at the exhibition!',
    useCases: [
      'Students illustrating science fair posters and presentation slide covers',
      'Indie game creators prototyping 2D sprite characters and fantasy landscape backgrounds',
      'Authors designing visual mockups of book covers before hiring professional illustrators'
    ],
    simCode: 'prompt_builder = ["Subject: Solar Eco-School", "Style: 3D Claymation", "Lighting: Sunset Warm Glow"]\nprint("Compiling Visual Synthesis Prompt:")\nprint(" + ".join(prompt_builder))',
    simOutput: 'Compiling Visual Synthesis Prompt:\nSubject: Solar Eco-School + Style: 3D Claymation + Lighting: Sunset Warm Glow',
    pairs: [
      { id: 'p1', term: 'Text-to-Image AI', definition: 'AI software that generates visual artwork and photos from descriptive written text prompts' },
      { id: 'p2', term: 'Art Style Token', definition: 'Keywords that instruct the AI on visual textures (such as watercolor, claymation, or pixel art)' },
      { id: 'p3', term: 'Composition', definition: 'The arrangement of characters, objects, and background elements within a picture frame' }
    ],
    practice: {
      q: 'Which prompt will generate the most visually distinct and appealing book cover illustration?',
      opts: [
        'A nice picture with flowers and trees',
        'Draw something for a book',
        'A whimsical cottage nestled inside a giant glowing mushroom, cozy watercolor style, soft evening firefly lighting, children\'s book art',
        'Cool house in forest'
      ],
      correct: 2,
      exp: 'Option 3 specifies subject (cottage inside giant glowing mushroom), art style (cozy watercolor), lighting (evening firefly glow), and target genre (children\'s book).',
      hint: 'Which prompt gives the AI clear details on subject, medium, and lighting?'
    },
    quizzes: [
      {
        q: 'How did text-to-image AI tools learn what a "watercolor painting" looks like?',
        opts: [
          { text: 'By studying millions of digitized artwork images paired with text descriptions during training', isCorrect: true },
          { text: 'By putting a real paintbrush into the USB slot', isCorrect: false },
          { text: 'By buying paints at the local craft store', isCorrect: false },
          { text: 'By asking cameras to paint on paper', isCorrect: false }
        ],
        exp: 'AI models learn mathematical correlations between visual pixel patterns and descriptive text tags across massive training datasets.'
      },
      {
        q: 'Why is it wrong to generate a realistic fake image showing a classmate doing something embarrassing?',
        opts: [
          { text: 'Because generating fake misleading images to tease or hurt people is cyberbullying and violates digital safety rules', isCorrect: true },
          { text: 'Because computer ink is too expensive', isCorrect: false },
          { text: 'Because digital pictures don\'t look good', isCorrect: false },
          { text: 'Because the teacher will delete your internet browser', isCorrect: false }
        ],
        exp: 'Using AI to create deceptive or humiliating imagery is unethical, unkind, and constitutes a severe breach of digital ethics.'
      }
    ],
    practicalTask: {
      title: 'Prompt Art Director Challenge',
      objective: 'Write three distinct prompt variations for your dream futuristic vehicle using different artistic styles.',
      steps: [
        'Choose your vehicle: e.g., "A flying solar scooter with butterfly wings".',
        'Prompt 1 (Pixel Art Style): Write the prompt for a retro 8-bit video game look.',
        'Prompt 2 (Claymation Style): Write the prompt describing dough textures, handmade fingerprints, and bright clay colors.',
        'Prompt 3 (Watercolor Style): Write the prompt describing soft pastel washes and delicate ink outlines.',
        'Share your 3 written prompts with a friend and discuss which visual feeling each style creates.'
      ],
      expectedResult: 'You will understand how stylistic modifiers completely transform visual output interpretation.'
    },
    recall: {
      q: 'What are the three essential components of an effective visual AI prompt?',
      a: '1. Subject & Action, 2. Artistic Medium & Style, and 3. Lighting & Environment!'
    },
    takeaways: [
      'Text-to-image AI translates written descriptions into visual pixel compositions.',
      'Style, lighting, and camera angle keywords allow you to direct the mood of digital images.',
      'Always use creative design tools with kindness, never to deceive or hurt others.'
    ],
    gameMechanic: {
      title: 'Prompt Canvas Art Director Studio',
      scenario: 'You are Art Director for the National Children\'s Science Gala. You must design 3 promotional festival banners: "The Solar Butterfly", "The Deep Sea Explorer", and "The Robot Bakery". You have a palette of Style, Lighting, and Subject tokens to assemble on the director console.',
      objective: 'Assemble the optimal 3-token prompt recipes to match each target client theme and achieve a 100% gallery showcase score.',
      rules: [
        'Rule 1: Select 1 Subject Token + 1 Style Token + 1 Lighting Token per banner.',
        'Rule 2: Banner 1 requires Nature-Tech theme (Solar Butterfly + Watercolor + Golden Hour).',
        'Rule 3: Banner 2 requires Ocean Mystery theme (Submarine + 3D Clay + Bioluminescent Neon).'
      ],
      choices: [
        'Select Style Token: [Retro Pixel Art] OR [Storybook Watercolor] OR [3D Claymation]',
        'Select Lighting Token: [Golden Hour Sunset] OR [Deep Neon Bioluminescence] OR [Soft Diffused Day]',
        'Select Subject Token: [Solar Butterfly in Meadow] OR [Deep Sea Submarine] OR [Robot Baker Kneading Dough]'
      ],
      progression: [
        'Banner 1: "The Solar Butterfly" rendered with delicate watercolor washes (+110 pts)',
        'Banner 2: "Deep Sea Explorer" synthesized with glowing underwater neon (+120 pts)',
        'Banner 3: "Robot Bakery" completed in playful claymation (+120 pts)'
      ],
      completion: 'All 3 festival banners approved by the Exhibition Committee! Earn the AI Art Director Golden Palette Badge.',
      badge: 'AI Art Director 🎨',
      points: 350
    },
    reflectionSafety: {
      prompt: 'If you see an astonishing picture online of a dog flying with real eagle wings, why should you pause and think before believing it is real?',
      rule: 'Image Verification Habit: Generative AI can create photorealistic images of impossible things. Always check with adults before believing unbelievable pictures online.',
      discussion: 'How can people spot clues that a photo might be AI-generated rather than a real camera photograph?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: In digital art prompting, what does the keyword "golden hour" specify?',
        opts: [
          'A clock made of real gold',
          'Warm, gentle, reddish-gold sunlight that occurs just after sunrise or before sunset',
          'A time when schools are closed',
          'A 60-minute countdown timer on a phone'
        ],
        correct: 1,
        exp: '"Golden hour" is a photography and lighting term referring to the warm, soft, low-angle natural sunlight around sunrise and sunset.',
        hint: 'Think about what sunlight looks like right before sunset.',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A student prompts an AI image tool with only one word: "Cat". The tool generates 4 pictures of normal domestic cats. Why did it not generate a cartoon cat on Mars or a cat made of ice?',
        opts: [
          'Because the prompt had zero modifiers, forcing the AI to default to the most statistically common cat images in its training data',
          'Because computers do not know what Mars is',
          'Because cats are afraid of ice',
          'Because the screen was dirty'
        ],
        correct: 0,
        exp: 'Without specific adjectives, modifiers, or style tokens, AI models revert to statistical averages—ordinary photos of common domestic cats.',
        hint: 'What does an AI do when you give it no extra creative instructions?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An online contest offers a $100 prize for original handmade charcoal sketches. An entrant types "charcoal sketch of an eagle" into an AI app, prints the image on paper, and submits it as their own hand-drawn artwork. Why is this considered an ethical violation?',
        opts: [
          'Because charcoal is too messy for competitions',
          'Because the entrant misrepresented machine-synthesized pixels as their own manual drawing skill and violated contest rules',
          'Because eagles are a protected bird species',
          'Because printers use electricity'
        ],
        correct: 1,
        exp: 'Honesty and authenticity require transparency. Passing off automated machine synthesis as manual human artistic drawing is deceitful and violates integrity rules.',
        hint: 'Did the entrant actually use a stick of charcoal with their own hands?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 6: RESPONSIBLE AI (Digital Privacy Shield & Truth Verification)
  // ═══════════════════════════════════════════════════════════════════════════

  'secret or share?': {
    title: 'Secret or Share?',
    hook: 'A friendly talking game robot pops up on your tablet screen and says: "To unlock 1,000 free bonus diamonds, type your home address and your mother’s phone number!" Should you share it?',
    goal: 'Master digital personal data privacy, understand what Personally Identifiable Information (PII) means, and learn how to guard confidential secrets when using online tools.',
    learnPoints: [
      'Distinguish between Private Personal Information (secrets that must never be typed online) and Safe Public Topics (fun general ideas)',
      'Understand what happens to data when you type it into apps and chatbots: it can be stored, analyzed, or shared',
      'Learn the Cyber Privacy Shield rules: Stop, Think, and Ask a trusted adult before sharing anything personal'
    ],
    analogy: 'Your personal information is like the front door key to your house: you wouldn\'t hand your house key to a stranger on the street just because they offered you a piece of candy; keep your private data locked safely in your pocket!',
    explanationHtml: `<h3>Guarding Your Digital Footprint</h3>
<p>Whenever you use the internet, smart speakers, or AI apps, your words travel across digital networks. Companies and algorithms store data to train future models. That is why smart students always know what is safe to share and what must stay strictly secret!</p>
<h4>The Privacy Sorting Sieve</h4>
<table border="1" cellpadding="6">
  <tr><th>🔒 Top Secret: NEVER Share Online</th><th>🌟 Safe to Share: Fun & General</th></tr>
  <tr><td>Your Full Name and Birthday</td><td>Your favorite color (e.g. "I love emerald green")</td></tr>
  <tr><td>Your Home Address & Street Name</td><td>A topic for a science project (e.g. "Tell me about Jupiter")</td></tr>
  <tr><td>Your School Name & Classroom Number</td><td>A question about how photosynthesis works</td></tr>
  <tr><td>Your Passwords & Secret PINs</td><td>Ideas for a birthday party game</td></tr>
  <tr><td>Your Phone Number & Family Photographs</td><td>A prompt for a poem about a friendly dragon</td></tr>
</table>
<h4>Why Do Some Apps Ask for Private Data?</h4>
<p>Some apps collect data to show advertisements or track users. Always ask a parent or teacher before installing any new app or creating an account. <strong>Remember: You are the guardian of your own digital privacy!</strong></p>`,
    step1: {
      title: '1. Recognize Personal Identifiable Information (PII)',
      desc: 'Identify details that could reveal who you are or where you live in the real world.',
      detail: 'Addresses, phone numbers, school names, and passwords are PII.',
      code: '# Privacy Filter\nif contains_pii(user_input):\n    block_and_alert_parent()'
    },
    step2: {
      title: '2. Apply the Digital Shield Check',
      desc: 'Before clicking \'Send\', pause and ask: "Is this a general idea or my private life?".',
      detail: 'If it feels personal or strange, keep your fingers off the keyboard.',
      code: 'user_prompt = "Tell me 3 facts about blue whales" # Safe! No personal secrets.'
    },
    step3: {
      title: '3. Seek Trusted Adult Guidance',
      desc: 'Consult a parent or teacher whenever an app prompts you for names or location.',
      detail: 'Adults can verify privacy policies and protect family security.',
      code: 'if app_requests_location():\n    ask_permission_from_adult()'
    },
    realScenario: 'While playing a multiplayer drawing game, a pop-up asked Aarav: "What school do you go to, so we can give your school free coins?" Aarav remembered the Golden Safety Rule: his school name is private! He clicked \'Cancel\', showed the screen to his teacher, and his teacher commended him for protecting his classmates’ privacy.',
    useCases: [
      'Children using AI study buddies safely by asking about math concepts without sharing their personal names',
      'Smart home speakers configured with parental controls to prevent accidental online purchases',
      'School coding portals keeping student login passwords encrypted and confidential'
    ],
    simCode: 'input_text = "My password is secret123"\npii_keywords = ["password", "address", "phone", "school name"]\nif any(k in input_text.lower() for k in pii_keywords):\n    action = "🚨 SHIELD ACTIVATED: Blocked private personal data!"\nelse:\n    action = "✅ SAFE: General prompt allowed."\nprint(action)',
    simOutput: '🚨 SHIELD ACTIVATED: Blocked private personal data!',
    pairs: [
      { id: 'p1', term: 'Private Information (PII)', definition: 'Personal details like your full name, home address, school, and passwords that must be kept safe' },
      { id: 'p2', term: 'Public Information', definition: 'General, non-personal topics like science questions, favorite colors, or hobbies' },
      { id: 'p3', term: 'Digital Footprint', definition: 'The trail of information, messages, and searches you leave behind when using online technology' }
    ],
    practice: {
      q: 'Which of the following is completely SAFE to type into an AI chatbot?',
      opts: [
        'My home street address and door number',
        'My mother’s telephone number',
        'Can you explain why the sky is blue in simple words for Std 4?',
        'My computer login password'
      ],
      correct: 2,
      exp: 'Asking a general science question about the sky is completely safe. Addresses, phone numbers, and passwords are confidential personal secrets.',
      hint: 'Which option is a general science question rather than private family information?'
    },
    quizzes: [
      {
        q: 'Why should you never share your school name and home address with an online AI chatbot?',
        opts: [
          { text: 'Because that private information can be saved on servers, and strangers could find out where you live and study', isCorrect: true },
          { text: 'Because computer screens get full of text', isCorrect: false },
          { text: 'Because chatbots don\'t like buildings', isCorrect: false },
          { text: 'Because school names make the keyboard slow down', isCorrect: false }
        ],
        exp: 'Sharing personal locations online endangers your privacy and real-world safety. Personal data must remain strictly confidential.'
      },
      {
        q: 'What should you do if an app or website asks you to enter your phone number to continue playing?',
        opts: [
          { text: 'Type your phone number immediately so you can keep playing', isCorrect: false },
          { text: 'Stop immediately and ask a parent or teacher before typing anything', isCorrect: true },
          { text: 'Type your best friend’s phone number instead', isCorrect: false },
          { text: 'Make up a fake emergency number', isCorrect: false }
        ],
        exp: 'Whenever an online service requests personal contact information, a trusted grown-up must inspect the app and evaluate its safety.'
      }
    ],
    practicalTask: {
      title: 'Make a "Never Share Online" Door Hanger',
      objective: 'Create a colorful privacy shield door hanger for your study desk reminding you of safe computing habits.',
      steps: [
        'Cut out a sturdy cardboard rectangle with a door-knob hole at the top.',
        'Draw a big glowing silver shield on the front.',
        'Inside the shield, write the 4 Secrets to Lock: 1. Full Name, 2. Home Address, 3. School Name, 4. Passwords.',
        'At the bottom, write the Golden Rule: "Stop, Think, and Ask a Grown-Up!"',
        'Hang it beside your family computer or tablet workstation.'
      ],
      expectedResult: 'You will establish an active physical reminder to safeguard your personal privacy every time you go online.'
    },
    recall: {
      q: 'What is the Golden Rule of digital privacy?',
      a: 'Never share private personal information (name, address, passwords, school) online. Stop, think, and ask a grown-up!'
    },
    takeaways: [
      'Private personal details must never be typed into public websites or AI chatbots.',
      'General topics like science questions, math riddles, and creative stories are safe to share.',
      'Always consult a parent or teacher before installing new apps or sharing contact details.'
    ],
    gameMechanic: {
      title: 'Privacy Vault Shield: Safe vs Secret Sieve',
      scenario: 'You are the Guardian of the Digital Vault! 6 incoming information packets are flying toward the internet gateway. You control the Privacy Sieve Gate. You must pass safe general topics into the World Wide Web and slam the Titanium Shield shut on private secrets!',
      objective: 'Correctly classify all 6 data packets without allowing a single private leak or blocking a safe science inquiry.',
      rules: [
        'Rule 1: Green Button (PASS) for general science, stories, and educational queries.',
        'Rule 2: Red Shield (LOCK) for passwords, phone numbers, addresses, and school names.',
        'Rule 3: Achieve a 100% Cyber Security rating.'
      ],
      choices: [
        'Packet 1: "How many legs does a spider have?" &rarr; PASS (Safe Science)',
        'Packet 2: "My home is at 42 Maple Street" &rarr; LOCK SHIELD (Private PII)',
        'Packet 3: "Give me 5 facts about Mars" &rarr; PASS (Safe Education)',
        'Packet 4: "My secret tablet password is SuperStar99" &rarr; LOCK SHIELD (Private Security)',
        'Packet 5: "Write a poem about rain" &rarr; PASS (Safe Creative)',
        'Packet 6: "I study at Green Valley Primary School in Class 4" &rarr; LOCK SHIELD (Private Location)'
      ],
      progression: [
        'Round 1: General science packets safely routed to internet (+100 pts)',
        'Round 2: Address and password leak attempts blocked at the gate (+120 pts)',
        'Round 3: Perfect data firewall maintained with zero leaks (+130 pts)'
      ],
      completion: 'The Digital Vault remained 100% secure! Awarded the Cyber Vault Guardian Shield Badge.',
      badge: 'Cyber Vault Guardian 🛡️',
      points: 350
    },
    reflectionSafety: {
      prompt: 'If an AI chatbot seems very friendly and calls you by a nickname, is it your real human friend who will keep your secrets safe?',
      rule: 'Chatbot Reality Check: A chatbot is a computer software program, not a human being. It cannot keep real-world secrets like a trustworthy friend or parent.',
      discussion: 'Why is it important to talk about your real feelings and worries with parents and teachers rather than chatbots?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: Which of the following is considered Personally Identifiable Information (PII) that should NOT be typed into an online chatbot?',
        opts: [
          'The recipe for chocolate chip cookies',
          'Your home address and family phone number',
          'The distance from Earth to the Moon',
          'The definition of a triangle'
        ],
        correct: 1,
        exp: 'Home addresses and phone numbers identify you and your family in the physical world and must remain confidential.',
        hint: 'Which option contains private details about your real-world family home?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: A free online photo editing website says: "Upload 5 photos of yourself and your school ID card to get a free cartoon avatar." What is the biggest danger of this offer?',
        opts: [
          'The website might download too slowly',
          'Your school ID card contains your real name, photo, school name, and student number, which can be stolen and misused by bad actors',
          'The cartoon avatar might be painted the wrong color',
          'The mouse cursor will get stuck'
        ],
        correct: 1,
        exp: 'School ID cards contain sensitive official identity data. Uploading identity cards to unknown websites creates severe identity theft and privacy risks.',
        hint: 'What sensitive information is printed on a school identity card?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: An AI smart speaker in the kitchen accidentally recorded a private family discussion about finances because someone said a word that sounded like its wake-word. What privacy feature allows families to protect themselves?',
        opts: [
          'Painting the smart speaker purple',
          'Using the hardware microphone mute switch and reviewing/deleting voice history recordings in privacy settings with an adult',
          'Putting a blanket over the refrigerator',
          'Talking only in whispers forever'
        ],
        correct: 1,
        exp: 'Hardware microphone disconnect buttons cut physical power to the mic, and companion app privacy settings allow users to inspect and delete stored audio clips.',
        hint: 'Which physical switch cuts electrical power to the smart speaker microphone?',
        difficulty: 'Olympiad Championship'
      }
    ]
  },

  'ai: right or wrong?': {
    title: 'AI: Right or Wrong?',
    hook: 'Did you know that an AI once looked at photos of blueberry muffins and guessed that they were fluffy Chihuahua puppies? Why can even the smartest AI make silly mistakes, and what must WE do about it?',
    goal: 'Understand why AI systems make mistakes, discover hallucinations and training data gaps, and master the STOP-THINK-CHECK method to verify facts.',
    learnPoints: [
      'Learn why AI can make mistakes: incomplete training examples, lack of real understanding, and hallucinated answers',
      'Understand that an AI sounds very confident and polite even when its answer is completely wrong!',
      'Master the 3-step verification method: STOP, THINK, and CHECK against authoritative books and teachers'
    ],
    analogy: 'AI is like a super-fast parrot: it can repeat and remix thousands of phrases it heard before, but it doesn\'t actually understand what words mean. If you ask it a tricky question, it might parrot back nonsense with a very confident chirp!',
    explanationHtml: `<h3>Smart, but Not Perfect!</h3>
<p>AI can calculate in microseconds, beat grandmasters at chess, and generate rhyming poems. But Artificial Intelligence is <strong>not magic and not all-knowing</strong>. AI makes mistakes just like humans do. The big difference is that an AI often sounds 100% sure of itself even when it is totally wrong!</p>
<h4>Why Does AI Make Mistakes?</h4>
<ul>
  <li><strong>1. Incomplete or Skewed Data:</strong> If an AI only saw photos of orange cats, it will fail when shown a black cat. The machine is only as good as the examples it learned from!</li>
  <li><strong>2. Confusing Similar Patterns:</strong> Famous AI image classifiers once mixed up chihuahuas and blueberry muffins because dark berries look just like puppy eyes and noses!</li>
  <li><strong>3. Hallucinations (Making Things Up):</strong> When an AI doesn\'t know an answer, it doesn\'t say "I don\'t know." Instead, it strings together words that sound plausible, inventing fake book titles, fake dates, or fake science facts!</li>
  <li><strong>4. Zero Real Understanding:</strong> AI matches mathematical patterns in pixels and words; it has no common sense or feelings.</li>
</ul>
<h4>The Golden Traffic Light: STOP, THINK, CHECK!</h4>
<p>Whenever you receive an important answer from an AI helper, use the traffic light:</p>
<ul>
  <li>🔴 <strong>STOP:</strong> Don\'t copy or believe the answer instantly.</li>
  <li>🟡 <strong>THINK:</strong> Does this make sense in the real world? Could it be a hallucination?</li>
  <li>🟢 <strong>CHECK:</strong> Verify the fact in your school textbook, encyclopaedia, or ask your teacher!</li>
</ul>`,
    step1: {
      title: '1. Recognize the Hallucination Risk',
      desc: 'Be aware that AI predicts likely word patterns rather than verifying factual truth.',
      detail: 'A confident tone does not equal accurate information.',
      code: '# Fact Verification Check\nif ai_answer.sounds_confident():\n    verify_with_textbook(ai_answer)'
    },
    step2: {
      title: '2. Deploy the STOP-THINK-CHECK Routine',
      desc: 'Pause before using any generated fact in homework, science, or health matters.',
      detail: 'Ask yourself: "Does a spider really have 6 legs or 8 legs?".',
      code: 'if answer["spiders_legs"] == 6: # FALSE!\n    flag_error("Spiders are arachnids with 8 legs 🕷️")'
    },
    step3: {
      title: '3. Cross-Check Against Trusted Authoritative Sources',
      desc: 'Consult verified textbooks, school libraries, and expert teachers.',
      detail: 'Always make sure human critical thinking has the final say.',
      code: 'final_truth = check_encyclopedia("Arachnida")'
    },
    realScenario: 'During a science quiz prep, a study chatbot told Kabir that "Sharks are friendly mammals that sleep in pine trees." Kabir laughed because he remembered the STOP-THINK-CHECK rule! He checked his standard science book, saw that sharks are ocean-dwelling fish with gills, and corrected the mistake before his test.',
    useCases: [
      'Students checking math solutions step-by-step with pen and paper rather than blindly accepting calculator outputs',
      'Doctors always reviewing AI diagnostic scan suggestions before deciding on patient surgery',
      'Fact-checkers using verified library archives to debunk fake AI-generated news rumors on the internet'
    ],
    simCode: 'ai_statements = [\n    {"statement": "The Sun rises in the East", "fact": True},\n    {"statement": "A spider has 6 legs", "fact": False}, # Spiders have 8!\n    {"statement": "5 x 6 = 36", "fact": False} # 5 x 6 = 30!\n]\nfor item in ai_statements:\n    status = "✅ Verified True" if item["fact"] else "❌ AI Mistake Detected!"\n    print(f"\'{item[\'statement\']}\' -> {status}")',
    simOutput: '\'The Sun rises in the East\' -> ✅ Verified True\n\'A spider has 6 legs\' -> ❌ AI Mistake Detected!\n\'5 x 6 = 36\' -> ❌ AI Mistake Detected!',
    pairs: [
      { id: 'p1', term: 'Hallucination', definition: 'When an AI makes up false facts that sound convincing and confident' },
      { id: 'p2', term: 'Fact-Checking', definition: 'Verifying information by comparing it against trustworthy books, encyclopedias, and teachers' },
      { id: 'p3', term: 'STOP, THINK, CHECK', definition: 'The 3-step traffic light rule to evaluate whether an AI answer is accurate and trustworthy' }
    ],
    practice: {
      q: 'An AI helper confidently tells you: "Water boils at 50 degrees Celsius at sea level." What should you do?',
      opts: [
        'Believe it immediately because computers are never wrong',
        'Use STOP, THINK, CHECK: verify the science fact in your school textbook, which shows water boils at 100°C',
        'Tell your science teacher that the textbook is wrong',
        'Turn off your computer and drink water'
      ],
      correct: 1,
      exp: 'Water boils at 100°C at sea level. The AI gave a confident but wrong answer. Verifying against school textbooks catches the error.',
      hint: 'What does your science textbook say about the boiling point of water?'
    },
    quizzes: [
      {
        q: 'Why does an AI sometimes mix up photos of blueberry muffins and chihuahua puppies?',
        opts: [
          { text: 'Because dark blueberries on a muffin resemble the black eyes and nose of a puppy in pixel patterns, and AI lacks real understanding', isCorrect: true },
          { text: 'Because puppies love eating blueberries for breakfast', isCorrect: false },
          { text: 'Because muffins bark when they come out of the oven', isCorrect: false },
          { text: 'Because the camera was hungry' }
        ],
        exp: 'Computer vision models analyze pixel contrasts. Dark dots on a golden background create matching mathematical features for both muffins and puppy faces.'
      },
      {
        q: 'Who is the "captain" in any team consisting of a human and an AI assistant?',
        opts: [
          { text: 'The human person, because humans have responsibility, ethics, common sense, and the final decision', isCorrect: true },
          { text: 'The AI computer mouse', isCorrect: false },
          { text: 'The electrical power company', isCorrect: false },
          { text: 'The WiFi router on the wall', isCorrect: false }
        ],
        exp: 'Humans are always the captains of technology. We are responsible for making wise, ethical, and safe choices.'
      }
    ],
    practicalTask: {
      title: 'The AI Mistake Detective Hunt',
      objective: 'Audit 5 factual statements with your teacher and label each as Right (R) or Wrong (W), noting your verification source.',
      steps: [
        'Statement 1: "The Sun rises in the West." &rarr; WRONG (Rises in the East). Verified: Science book / Compass.',
        'Statement 2: "Water boils at 100°C at sea level." &rarr; RIGHT. Verified: Physics chapter.',
        'Statement 3: "A spider has 6 legs." &rarr; WRONG (Spiders have 8 legs). Verified: Biology guide.',
        'Statement 4: "The Bengal Tiger is the national animal of India." &rarr; RIGHT. Verified: Social studies textbook.',
        'Statement 5: "5 x 6 = 36." &rarr; WRONG (5 x 6 = 30). Verified: Multiplication table.',
        'Reflect together on why critical thinking is a vital superpower.'
      ],
      expectedResult: 'You will gain the habit of verifying digital claims rather than accepting them passively.'
    },
    recall: {
      q: 'Can an AI assistant be wrong, and how should we respond?',
      a: 'Yes, AI often makes confident mistakes! We must use STOP, THINK, CHECK to verify important facts with books, teachers, and parents!'
    },
    takeaways: [
      'AI can sound very confident and polite while being completely factually incorrect.',
      'Mistakes happen because of missing training data, confusing patterns, and hallucinations.',
      'Always remember: You are the captain who verifies facts and makes wise decisions.'
    ],
    gameMechanic: {
      title: 'Fact-Check Detective: Spot the Hallucination',
      scenario: 'ChatterBot 2.0 has been answering student science inquiries, but a glitch caused it to mix up facts with fairy tales! You are equipped with the Fact-Checking Magnifier and the Golden Encyclopedia of Truth. 4 claims are on the board. You must identify the truth and stamp out the hallucinations!',
      objective: 'Evaluate 4 generated statements, identify the 2 false AI hallucinations, and correct them with encyclopedic proof.',
      rules: [
        'Rule 1: Inspect each statement with the Fact Magnifier.',
        'Rule 2: Click "VERIFIED FACT" for true statements.',
        'Rule 3: Click "HALLUCINATION DETECTED" for false claims and drag the correct truth stamp.'
      ],
      choices: [
        'Claim 1: "Penguins are birds that can swim underwater but cannot fly in the air" &rarr; VERIFIED FACT',
        'Claim 2: "The Great Wall of China is made of solid chocolate candy" &rarr; HALLUCINATION DETECTED (Made of stone and brick)',
        'Claim 3: "Honeybees communicate with each other using a special dance called the waggle dance" &rarr; VERIFIED FACT',
        'Claim 4: "Spiders have 6 legs and chew bubblegum in webs" &rarr; HALLUCINATION DETECTED (Arachnids have 8 legs)'
      ],
      progression: [
        'Round 1: Penguin biology verified with high scientific confidence (+100 pts)',
        'Round 2: Chocolate wall hallucination spotted and corrected (+120 pts)',
        'Round 3: Honeybee dance confirmed and spider leg count corrected (+120 pts)'
      ],
      completion: 'All 4 statements audited with 100% accuracy! Earn the Master Truth Detective Golden Badge.',
      badge: 'Master Truth Detective 🔍',
      points: 340
    },
    reflectionSafety: {
      prompt: 'Why is it dangerous to believe an unverified medical or health tip you read on an internet forum or chatbot?',
      rule: 'Health & Medical Verification Rule: Never take medicine or health advice from a chatbot. Health decisions must ALWAYS be made by a real doctor and your parents.',
      discussion: 'Why do real doctors spend many years studying in medical school before treating patients?'
    },
    olympiadQuestions: [
      {
        q: 'Olympiad Stage 1: When an AI chatbot generates an answer that is completely made up and false, what is this called in computer science?',
        opts: [
          'A computer battery recharge',
          'An AI Hallucination',
          'A screen saver animation',
          'A volume spike'
        ],
        correct: 1,
        exp: 'An AI hallucination occurs when a model generates false, illogical, or made-up information while presenting it as fact.',
        hint: 'Which term means perceiving or making up something that is not real?',
        difficulty: 'Olympiad Stage 1'
      },
      {
        q: 'Olympiad Stage 2: An image recognition model was trained on 10,000 photos of dogs in grassy parks. When shown a photo of a dog sitting on a snowbank, it guessed "Polar Bear". Why did the model get confused?',
        opts: [
          'The dog was wearing a polar bear costume',
          'The model learned to rely on the green grass background as part of its pattern, and the white snow confused its prediction',
          'Dogs turn into bears when it gets cold',
          'The camera was out of battery'
        ],
        correct: 1,
        exp: 'This is a classic dataset shortcut error: if all training examples have green grass, the AI mistakenly correlates green backgrounds with dogs. Snow breaks the pattern.',
        hint: 'What was different in the background of the snow photo compared to the training pictures?',
        difficulty: 'Olympiad Stage 2'
      },
      {
        q: 'Olympiad Championship: What is the most responsible way to use an AI assistant when studying for your Class 4 school exams?',
        opts: [
          'Copy its answers directly onto your exam paper without reading them',
          'Use the AI to explain hard concepts in simple words, practice quizzes, and then cross-check every key fact with your official school textbook',
          'Never use books again and rely 100% on whatever the screen says',
          'Ask the AI to change your school marks'
        ],
        correct: 1,
        exp: 'Responsible students use AI to explain, test themselves, and clarify doubts, while always verifying facts against official textbooks and teachers.',
        hint: 'How do smart students combine digital explanations with verified textbook facts?',
        difficulty: 'Olympiad Championship'
      }
    ]
  }
}
