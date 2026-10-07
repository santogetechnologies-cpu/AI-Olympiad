// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT: GENERATE ALL 192 AUTHENTIC CURRICULUM TOPIC PROFILES
// Creates modular TypeScript topic profile registries with researched educational content
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'

// Helper to escape backticks and quotes safely in strings
function esc(str) {
  if (!str) return ''
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

// Full curriculum matrix across all 16 levels
const CURRICULUM_MATRIX = [
  // CLASS 3
  {
    level: 'class3', tier: 'primary',
    topics: [
      {
        title: 'Meet My AI Friend',
        hook: 'Have you ever spoken to a smart speaker like Alexa or Siri and wondered how it understands your words?',
        goal: 'Learn what an AI friend is, how smart voice helpers listen to sound waves, and how they assist us every day.',
        learnPoints: ['Discover that an AI friend is computer software designed to listen and assist', 'Understand how microphones turn sound waves into computer signals', 'Learn to talk clearly and politely with voice assistants'],
        analogy: 'An AI friend is like a super-fast librarian who has read millions of books and can find the exact answer to your question in a second!',
        concept: 'Speech Recognition and Smart Voice Assistants',
        step1: { title: '1. Listening with Microphones', desc: 'Microphones capture spoken sound vibrations and convert them into digital numbers.', code: 'sound_wave = record_audio()\nprint("Audio captured!")' },
        step2: { title: '2. Recognizing the Words', desc: 'The AI checks its word bank to match audio patterns to English words.', code: 'text = speech_to_text(sound_wave)\nprint("You said:", text)' },
        step3: { title: '3. Speaking Back with Answers', desc: 'The smart speaker generates voice audio through speakers to respond.', code: 'speak("Hello! How can I help you today?")' },
        scenario: 'A student asked a smart speaker: "How far is the Moon from Earth?" The AI instantly answered "384,400 kilometers!", helping the class finish their astronomy project.',
        useCases: ['Smart speakers answering school questions', 'Reading toys pronouncing difficult words', 'Voice bedtime lamps dimming on command'],
        pairs: [{ term: 'Microphone', def: 'The ear of the computer that records spoken sound waves' }, { term: 'Speech Recognition', def: 'The AI brain turning spoken sound into text words' }, { term: 'Speaker', def: 'The voice box of the computer that speaks answers out loud' }],
        practice: { q: 'How does an AI friend hear what you say?', opts: ['Through a microphone that captures sound vibrations', 'Through a camera watching your feet', 'By reading your thoughts with magic', 'By shaking the table'], correct: 0, exp: 'Microphones capture sound vibrations and convert them to digital signals.' },
        quizzes: [{ q: 'Which of these is an example of an AI voice helper?', opts: [{ text: 'Alexa or Siri', isCorrect: true }, { text: 'A wooden chair', isCorrect: false }, { text: 'A glass bottle', isCorrect: false }] }]
      },
      {
        title: 'Machines That Help Us',
        hook: 'Why is a robotic vacuum cleaner smarter than a regular broom?',
        goal: 'Understand the difference between simple tools, automatic machines, and smart AI machines that sense their environment.',
        learnPoints: ['Distinguish manual tools, automatic machines, and smart robots', 'Learn how sensors help smart machines avoid bumping into obstacles', 'Discover how smart helpers save time for families and doctors'],
        analogy: 'A broom is like a pencil (you do all work), an electric vacuum is like a scooter (you steer it), and a robot vacuum is like a smart puppy that cleans your room on its own!',
        concept: 'Smart Sensors and Autonomous Home Robots',
        step1: { title: '1. Sensing the Environment', desc: 'Infrared distance sensors bounce light off walls to measure room boundaries.', code: 'distance = check_infrared_sensor()\nif distance < 10: obstacle = True' },
        step2: { title: '2. Deciding the Path', desc: 'The computer calculates a new turn to keep cleaning without crashing.', code: 'if obstacle: robot.turn_left(90)' },
        step3: { title: '3. Auto-Recharging', desc: 'When the battery is low, the robot navigates back to its charging dock.', code: 'if battery < 15: robot.dock()' },
        scenario: 'A robotic vacuum cleaned 3 bedrooms while a family was at school, navigating around toys and stairs without falling down.',
        useCases: ['Robotic vacuums cleaning floors automatically', 'Smart dishwashers sensing dirty plates', 'Hospital delivery carts transporting medicine'],
        pairs: [{ term: 'Sensor', def: 'An electronic eye or ear that detects light, touch, or distance' }, { term: 'Actuator', def: 'The motor or wheel that physically moves the robot' }, { term: 'Charging Dock', def: 'The home base where a robot recharges its battery' }],
        practice: { q: 'What makes a robot vacuum smart compared to a regular broom?', opts: ['It has sensors to detect obstacles and navigates on its own', 'It is made of wood', 'It needs a rope to pull it', 'It only works outdoors'], correct: 0, exp: 'Sensors allow smart machines to observe the room and make navigation decisions.' },
        quizzes: [{ q: 'What prevents a robotic vacuum from falling down stairs?', opts: [{ text: 'Cliff drop-off sensors underneath that detect empty space', isCorrect: true }, { text: 'A parachute', isCorrect: false }, { text: 'It flies in the air', isCorrect: false }] }]
      },
      {
        title: 'Give Me a Command!',
        hook: 'If you tell a robot "Make me food," why will it just sit there and look confused?',
        goal: 'Understand what a computer command is, why computers need exact instructions, and how inputs lead to outputs.',
        learnPoints: ['Learn that computers cannot guess; they only follow exact commands', 'Understand the Input → Process → Output model', 'Practice writing clear, bug-free commands'],
        analogy: 'Giving commands to a computer is like giving directions to an alien visitor: you must say "Take 3 steps forward and turn left!"',
        concept: 'Computer Commands and Precise Syntax',
        step1: { title: '1. Defining the Action', desc: 'Choose a clear command keyword from the computer vocabulary.', code: 'command = "MOVE_FORWARD"\nsteps = 5' },
        step2: { title: '2. Adding Parameters', desc: 'Specify exact speed, distance, or direction.', code: 'robot.set_speed("MEDIUM")\nrobot.set_direction("NORTH")' },
        step3: { title: '3. Executing the Command', desc: 'The robot executes the action and waits for the next input.', code: 'robot.run_command(command, steps)' },
        scenario: 'Students programmed a rover robot with exact commands: "FORWARD 10cm, STOP, LOWER_ARM", successfully delivering a block across the table.',
        useCases: ['TV remotes sending channel button signals', 'Game controllers sending jump and run commands', 'Factory robotic arms assembling products'],
        pairs: [{ term: 'Command', def: 'A clear instruction telling a computer what action to take' }, { term: 'Input', def: 'Information or button clicks sent into a computer' }, { term: 'Output', def: 'The physical movement or screen result produced' }],
        practice: { q: 'Which command will a robot understand best?', opts: ['FORWARD 3 STEPS', 'Go somewhere fun', 'Do the thing from yesterday', 'Move around maybe'], correct: 0, exp: 'FORWARD 3 STEPS has exact direction and distance.' },
        quizzes: [{ q: 'What is the "Input" when typing on a keyboard?', opts: [{ text: 'The keys you press', isCorrect: true }, { text: 'The paper from the printer', isCorrect: false }] }]
      },
      {
        title: 'Put It in Order!',
        hook: 'What would happen if you put on your shoes BEFORE putting on your socks?',
        goal: 'Master sequencing and algorithms by ordering steps logically to solve problems.',
        learnPoints: ['Understand that order (sequencing) is the foundation of computer algorithms', 'Learn how bugs happen when steps are out of order', 'Create step-by-step recipes for daily tasks'],
        analogy: 'An algorithm is like a delicious cake recipe: if you bake before mixing the flour, you get a giant kitchen mess!',
        concept: 'Algorithms, Sequencing, and Logic Flow',
        step1: { title: '1. Starting Initialization', desc: 'Prepare materials and initial state.', code: 'bowl_ready = True\nmilk_ready = True' },
        step2: { title: '2. Sequential Actions', desc: 'Execute steps one after another in strict logical sequence.', code: 'pour_cereal()\npour_milk()' },
        step3: { title: '3. Reaching the Goal', desc: 'Verify completion and enjoy the result.', code: 'print("Breakfast is ready to eat!")' },
        scenario: 'A rocket countdown computer follows an exact sequence: 1. Check fuel, 2. Clear pad, 3. Ignite engines, 4. Lift off, ensuring 100% safety.',
        useCases: ['Cartoon animations playing frames in sequence', 'Traffic lights cycling Green → Yellow → Red', 'Assembly lines welding car doors in order'],
        pairs: [{ term: 'Sequence', def: 'The specific order in which steps must be performed' }, { term: 'Algorithm', def: 'A step-by-step set of instructions to solve a task' }, { term: 'Bug', def: 'A mistake in order or code that makes a program fail' }],
        practice: { q: 'What is the correct sequence for planting a seed?', opts: ['1. Dig soil → 2. Place seed → 3. Cover soil → 4. Water gently', '1. Water → 2. Cover → 3. Eat seed → 4. Dig', '1. Pick flower → 2. Plant seed', '1. Cover → 2. Dig → 3. Buy seed'], correct: 0, exp: 'You must dig first before placing the seed and watering.' },
        quizzes: [{ q: 'What is a computer algorithm?', opts: [{ text: 'A step-by-step recipe of instructions to complete a task', isCorrect: true }, { text: 'A broken screen', isCorrect: false }] }]
      },
      {
        title: 'AI Goes to School',
        hook: 'How can a learning app on a tablet know when a math question is too easy or too hard for you?',
        goal: 'Discover how AI educational tools adapt to each student, provide personalized hints, and help teachers make learning fun.',
        learnPoints: ['Understand adaptive learning and difficulty scaling', 'Learn how educational AI gives helpful hints without spoiling answers', 'Discover that AI assists human teachers'],
        analogy: 'Adaptive AI is like a smart bicycle with training wheels that gently support you when learning and let you pedal faster as you grow confident!',
        concept: 'Adaptive Learning and Intelligent Tutoring Systems',
        step1: { title: '1. Checking Answers', desc: 'The app evaluates correctness in real-time.', code: 'if answer == correct_answer: score += 1' },
        step2: { title: '2. Adjusting Difficulty', desc: 'Selects the next question at your exact skill level.', code: 'if score >= 3: level = "CHALLENGE"\nelse: level = "PRACTICE"' },
        step3: { title: '3. Mascot Hints', desc: 'Friendly mascot offers a visual hint when you get stuck.', code: 'show_hint("Count the blue dots to solve!")' },
        scenario: 'An AI reading app heard a 3rd grader stumble on "dinosaur" and gently sounded out "die-no-saur" with a cartoon graphic.',
        useCases: ['Language apps practicing speech pronunciation', 'Math games offering visual fraction bars', 'Library apps recommending books based on reading history'],
        pairs: [{ term: 'Adaptive Learning', def: 'Software that changes question difficulty to match student skill' }, { term: 'Hint', def: 'A clue that guides you to find the answer yourself' }, { term: 'Mascot Guide', def: 'A friendly character that cheers you on while studying' }],
        practice: { q: 'What does a smart learning app do if you miss a question?', opts: ['Offers a friendly visual hint to help you try again', 'Turns off the tablet forever', 'Deletes all your games', 'Makes loud siren noises'], correct: 0, exp: 'Educational AI supports learners with friendly hints and encouragement.' },
        quizzes: [{ q: 'Why do schools use AI learning apps?', opts: [{ text: 'To give every student personalized practice at their own pace', isCorrect: true }, { text: 'Because teachers want to sleep all day', isCorrect: false }] }]
      },
      {
        title: 'AI Comes Home',
        hook: 'How does a smart thermostat know when to make the living room cozy before your family even wakes up?',
        goal: 'Explore how smart home devices use sensors and schedules to save electricity, keep homes safe, and bring comfort to families.',
        learnPoints: ['Discover thermostats, smart lights, and video doorbells', 'Understand how smart devices save energy by turning off when empty', 'Learn basic home safety rules for smart appliances'],
        analogy: 'A smart home is like a caring house with a gentle watchdog: it notices when you enter, turns on warm lights, and keeps temperature perfect!',
        concept: 'Smart Home Automation and Energy Efficiency',
        step1: { title: '1. Motion & Light Sensing', desc: 'Sensors detect whether rooms are occupied and measure sunlight.', code: 'motion = check_motion("Living Room")' },
        step2: { title: '2. Energy Optimization', desc: 'Turns off lights in empty rooms to save power.', code: 'if not motion and time_empty > 10: turn_off_lights()' },
        step3: { title: '3. Nighttime Safety', desc: 'Locks doors and sets nightlight modes automatically.', code: 'set_security_mode("LOCKED")' },
        scenario: 'A smart home lowered water heater temperatures while a family went on vacation, saving 30% electricity.',
        useCases: ['Smart AC units lowering electric bills', 'Voice light switches helping elderly individuals', 'Smart smoke alarms announcing exact room locations'],
        pairs: [{ term: 'Smart Thermostat', def: 'A temperature controller that learns family comfort preferences' }, { term: 'Eco Mode', def: 'A setting that reduces electricity consumption to help the planet' }, { term: 'Motion Sensor', def: 'A tiny electronic device that detects when people enter a room' }],
        practice: { q: 'How do smart lights help our planet?', opts: ['They turn off automatically in empty rooms to save power', 'They glow in rainbow colors during rain', 'They make breakfast', 'They turn water into juice'], correct: 0, exp: 'Turning off lights in empty rooms saves valuable electrical energy.' },
        quizzes: [{ q: 'Which device cleans floors automatically using sensors?', opts: [{ text: 'A robotic vacuum cleaner', isCorrect: true }, { text: 'A wooden chair', isCorrect: false }] }]
      },
      {
        title: 'When I Grow Up',
        hook: 'What kind of exciting jobs with robots and computers will exist when you graduate from school?',
        goal: 'Explore future careers in AI, robotics, digital animation, and game design, and discover how technology enhances every profession.',
        learnPoints: ['Discover careers: AI Game Designer, Robot Doctor, Wildlife Drone Pilot', 'Understand that future jobs combine human empathy and smart tools', 'Learn that every career will use smart technology'],
        analogy: 'Using AI in your future job is like having a superhero suit: it gives your brain superpowers to build and cure faster!',
        concept: 'Future Careers, Robotics, and Digital Creativity',
        step1: { title: '1. Following Your Passion', desc: 'Connect what you love (animals, drawing, coding) to future tech roles.', code: 'passion = "Ocean Wildlife"\nrole = "AI Marine Drone Pilot"' },
        step2: { title: '2. Building Core Skills', desc: 'Practice curiosity, problem solving, and teamwork every day.', code: 'skills = ["Curiosity", "Logic", "Empathy"]' },
        step3: { title: '3. Human + AI Teamwork', desc: 'Use software to perform calculations while you provide vision.', code: 'project = build_invention(human_creativity=True)' },
        scenario: 'An agricultural scientist used AI drone cameras to scan 1,000 apple trees in 10 minutes and spot 3 trees that needed extra water.',
        useCases: ['Doctors using robotic arms for surgery precision', 'Fashion designers creating zero-waste clothing with 3D AI', 'Chefs using smart ovens that bake bread to perfection'],
        pairs: [{ term: 'AI Game Designer', def: 'Creates virtual worlds, characters, and quests using smart tools' }, { term: 'Robotics Engineer', def: 'Designs and builds physical metal robots with motors and sensors' }, { term: 'Wildlife Drone Pilot', def: 'Flies camera drones to track and protect endangered animals' }],
        practice: { q: 'Which skill will always be important for humans in future careers?', opts: ['Creativity, empathy, and kindness to others', 'Memorizing a phone book', 'Never speaking to anyone', 'Doing math on paper for 20 hours'], correct: 0, exp: 'Human creativity, ethics, and empathy are uniquely human strengths.' },
        quizzes: [{ q: 'How will doctors use AI in the future?', opts: [{ text: 'To analyze medical scans faster and discover cures', isCorrect: true }, { text: 'To turn patients into robots', isCorrect: false }] }]
      },
      {
        title: 'People Behind Technology',
        hook: 'Who wrote the very first computer program, and who writes the code for smart robots today?',
        goal: 'Meet pioneering scientists, coders, and ethical creators behind modern computing and learn how diverse teams build software.',
        learnPoints: ['Discover Ada Lovelace, the first computer programmer', 'Understand what Software Engineers, Data Scientists, and UX Designers do', 'Learn that making technology requires team collaboration'],
        analogy: 'Building a software app is like building a skyscraper: architects design blueprints (UX Designers), engineers build walls (Coders), and inspectors check safety (Testers)!',
        concept: 'Pioneers of Computing and Collaborative Software Teams',
        step1: { title: '1. Designing the Idea', desc: 'Creative thinkers brainstorm what problem the app will solve.', code: 'app = "Reading Buddy"\nmission = "Help children pronounce words"' },
        step2: { title: '2. Writing the Code', desc: 'Software developers write Python instructions to build the app.', code: 'def pronounce_word(word): return generate_phonics(word)' },
        step3: { title: '3. Safety & Ethics Testing', desc: 'Testers verify the app is safe, friendly, and protects privacy.', code: 'run_safety_checks()\nprint("App certified safe!")' },
        scenario: 'A team of 4 students combined drawing, Python coding, and user testing to create a sign-language translation app for deaf children.',
        useCases: ['Engineers coding flight autopilot software', 'Scientists analyzing satellite photos to detect forest fires', 'Artists modeling 3D animated movie characters'],
        pairs: [{ term: 'Ada Lovelace', def: 'The world’s first computer programmer who wrote the first algorithm in 1843' }, { term: 'Software Engineer', def: 'A person who writes code to build apps and systems' }, { term: 'UX Designer', def: 'An artist who designs how apps look and feel so they are easy to use' }],
        practice: { q: 'Who was the first person in history to write a computer algorithm?', opts: ['Ada Lovelace', 'Julius Caesar', 'Alexander the Great', 'King Arthur'], correct: 0, exp: 'Ada Lovelace published the first computer algorithm in 1843.' },
        quizzes: [{ q: 'Why do computer teams need different kinds of people?', opts: [{ text: 'Because great apps need coding, design, testing, and diverse creative ideas', isCorrect: true }, { text: 'So they can eat more snacks', isCorrect: false }] }]
      },
      {
        title: 'Ask & Explore',
        hook: 'How can asking the right question to an AI helper help you discover secrets of the deep ocean or distant galaxies?',
        goal: 'Master the art of prompting: learn how to ask clear, curious, and specific questions to get the most helpful educational answers.',
        learnPoints: ['Understand what a Prompt is and why clear questions give better answers', 'Learn the difference between vague prompts and Super Prompts', 'Practice asking follow-up questions to explore topics deeply'],
        analogy: 'Asking an AI a prompt is like using a magnifying glass on a treasure map: if you focus on the exact island marked X, you find the treasure!',
        concept: 'Prompt Engineering and Inquisitive Learning',
        step1: { title: '1. Choosing a Specific Topic', desc: 'Pick an exact subject you are curious about instead of a single vague word.', code: 'topic = "How honeybees make honey from nectar"' },
        step2: { title: '2. Adding Constraints', desc: 'Tell the AI how long the answer should be and what format to use.', code: 'prompt = f"Explain {topic} in 3 simple bullet points for Class 3."' },
        step3: { title: '3. Asking Follow-Ups', desc: 'Ask a second question to explore an interesting detail further.', code: 'follow_up = "How do bees communicate where flowers are?"' },
        scenario: 'A student preparing a science poster asked AI: "Explain why volcanoes erupt using kitchen analogies." The AI compared magma to shaken soda bottles!',
        useCases: ['Asking AI to explain history events in story format', 'Generating times table practice quiz questions', 'Requesting simple science experiments using kitchen items'],
        pairs: [{ term: 'Prompt', def: 'The exact question or instruction you type or speak to an AI model' }, { term: 'Constraint', def: 'A helpful rule you add (like "3 sentences" or "simple words")' }, { term: 'Follow-up', def: 'A second question you ask to explore an interesting detail further' }],
        practice: { q: 'Which of these is the best prompt to learn about space travel?', opts: ['How do astronaut spacesuits protect people from cold space in 3 simple facts?', 'Space', 'Tell me everything about the universe right now', 'Astronaut stuff'], correct: 0, exp: 'Specific prompts with clear questions and format constraints produce the clearest answers.' },
        quizzes: [{ q: 'What is a "Prompt" in AI?', opts: [{ text: 'The question or instruction you provide to the AI system', isCorrect: true }, { text: 'A plastic keyboard cover', isCorrect: false }] }]
      },
      {
        title: 'Draw & Imagine',
        hook: 'How can a computer look at a rough doodle of three circles and instantly guess: "I know, it’s a snowman!"?',
        goal: 'Understand how AI recognizes hand-drawn doodles, recognizes shapes and patterns, and collaborates with humans to create artwork.',
        learnPoints: ['Learn how stroke recognition algorithms match doodle lines to shape libraries', 'Discover interactive drawing AI tools like Google Quick, Draw! and AutoDraw', 'Understand how artists use generative AI as an imaginative sketchbook'],
        analogy: 'Doodle recognition AI is like a friend playing Pictionary with you: with every pen stroke you draw, it compares your lines against millions of drawings to guess what you are creating!',
        concept: 'Computer Vision, Stroke Recognition, and Generative Art',
        step1: { title: '1. Tracking Pen Strokes', desc: 'The touchscreen records coordinates and curvature of your finger lines.', code: 'strokes = record_touch_points()\ncurve = calculate_curvature(strokes)' },
        step2: { title: '2. Pattern Matching', desc: 'The model checks your stroke pattern against millions of known drawings.', code: 'guess = model.predict(strokes)\nprint("AI Guess:", guess)' },
        step3: { title: '3. Vector Clipart Suggestions', desc: 'The tool suggests clean, professional vector illustrations matching your sketch.', code: 'suggest_clipart(["🐱 Cat", "🐯 Tiger"])' },
        scenario: 'Students used AutoDraw to turn rough squiggles into clean marine illustrations for an ocean conservation school poster.',
        useCases: ['Google Quick, Draw! testing stroke recognition with millions of players', 'AutoDraw helping students create clean presentation diagrams', 'Color palette generators suggesting harmonious theme colors'],
        pairs: [{ term: 'Stroke', def: 'A single continuous line drawn on a digital touchscreen' }, { term: 'Pattern Recognition', def: 'The AI matching shapes and curves to known drawing objects' }, { term: 'Vector Clipart', def: 'Clean, professional digital artwork suggested by the drawing app' }],
        practice: { q: 'How does a doodle-guessing AI know what you are drawing?', opts: ['It compares line strokes and shapes against millions of drawings in its database', 'It reads your mind with magic', 'It peeks with a spy glass', 'It always guesses potato'], correct: 0, exp: 'Neural networks recognize stroke order, curves, and geometric patterns.' },
        quizzes: [{ q: 'What is Google Quick, Draw! an example of?', opts: [{ text: 'An AI game that learns how people draw everyday objects', isCorrect: true }, { text: 'A store selling pencils', isCorrect: false }] }]
      },
      {
        title: 'My AI Safety Rules',
        hook: 'If an online chatbot asks: "What is your home address and your parent’s phone number?", what should you do?',
        goal: 'Learn vital digital safety rules: protect private personal information, recognize safe digital boundaries, and know when to ask an adult.',
        learnPoints: ['Memorize the Private Info List: Name, Address, School, Passwords, Phone Numbers', 'Understand why personal information must never be typed into public chatbots', 'Know the Golden Rule: Always inform a trusted adult if something feels wrong'],
        analogy: 'Your personal information is like your house key: you keep it safely in your pocket and never hand it out to strangers passing by on the street!',
        concept: 'Digital Safety, Privacy Protection, and Safe Habits',
        step1: { title: '1. Spotting Private Data Requests', desc: 'Check every prompt and form before typing to ensure no secrets are entered.', code: 'if asks_for_private_info(form): block_input()' },
        step2: { title: '2. Keeping Passwords Secret', desc: 'Never share passwords with anyone except your parents.', code: 'password = "SecretPassword123!" # Share ONLY with parents' },
        step3: { title: '3. Alerting a Trusted Adult', desc: 'If an online message makes you feel uncomfortable, tell an adult immediately.', code: 'notify_adult("Teacher assistance requested")' },
        scenario: 'A 3rd grader spotted a suspicious pop-up asking for a home address to claim a toy, immediately called their teacher, and avoided a scam.',
        useCases: ['Safe filtered educational search engines blocking dangerous sites', 'Kids using avatars instead of real photos in online games', 'Screen time limits maintaining a healthy balance with outdoor play'],
        pairs: [{ term: 'Private Information', def: 'Secrets like your home address, school, phone number, and passwords' }, { term: 'Shield Habit', def: 'Stopping and thinking before typing any information online' }, { term: 'Trusted Adult', def: 'A parent, guardian, or teacher who helps keep you safe' }],
        practice: { q: 'Which of the following is SAFE to share with an AI learning app?', opts: ['Your favorite color (Blue) and favorite dinosaur (Stegosaurus)', 'Your home street address and door key code', 'Your parent’s credit card number', 'Your school bus stop location and timing'], correct: 0, exp: 'Favorite colors or school topics are safe; never share contact details.' },
        quizzes: [{ q: 'Who is the only person you should share your computer password with?', opts: [{ text: 'Your parents or guardians', isCorrect: true }, { text: 'A stranger in an online game chat', isCorrect: false }] }]
      },
      {
        title: 'Share with Care',
        hook: 'Once you post a photo or message on the internet, can you ever take it back completely?',
        goal: 'Understand your Digital Footprint, learn the importance of kind communication, and practice thoughtful sharing habits.',
        learnPoints: ['Understand what a Digital Footprint is: the permanent trail of words and photos', 'Learn the THINK test: Is it True? Helpful? Inspiring? Necessary? Kind?', 'Respect copyright by giving credit to creators'],
        analogy: 'Sharing on the internet is like writing in wet cement: once it dries, it stays there forever, so make sure you leave behind something kind and beautiful!',
        concept: 'Digital Citizenship, Online Kindness, and Attribution',
        step1: { title: '1. Thinking Before Sending', desc: 'Review your message through the eyes of others before clicking send.', code: 'if is_kind(message) and is_truthful(message): send_message()' },
        step2: { title: '2. Protecting Friends’ Privacy', desc: 'Never post photos of friends without asking their permission first.', code: 'if has_friend_permission: share_photo()' },
        step3: { title: '3. Giving Attribution', desc: 'Always cite where you found photos or facts used in your school slides.', code: 'add_citation("Photo Credit: NASA Observatory")' },
        scenario: 'Students made a recycling presentation using free educational photos with clean credits to photographers, winning a school citizenship award.',
        useCases: ['Writing positive, encouraging comments on classmates’ shared digital projects', 'Asking friends before sharing group photos', 'Using Creative Commons educational photos in school presentations'],
        pairs: [{ term: 'Digital Footprint', def: 'The permanent record of things you share, post, and click online' }, { term: 'Attribution', def: 'Giving credit to the original author, photographer, or artist' }, { term: 'Digital Citizen', def: 'A person who uses technology kindly, safely, and responsibly' }],
        practice: { q: 'What should you do before posting a funny photo of your friend at school?', opts: ['Ask your friend for their permission first and make sure it doesn’t embarrass them', 'Post it immediately so everyone on the internet sees it', 'Add a mean caption to make strangers laugh', 'Send it to 50 strangers online'], correct: 0, exp: 'Always ask permission before sharing photos or stories about other people.' },
        quizzes: [{ q: 'What does the "K" stand for in the T.H.I.N.K. test?', opts: [{ text: 'Is it Kind?', isCorrect: true }, { text: 'Is it Kangaroo?', isCorrect: false }] }]
      }
    ]
  }
]
