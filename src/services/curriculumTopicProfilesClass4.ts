// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 4 (12 DISTINCT LESSONS)
// Elementary AI & Algorithmic Patterns • Ages 9-10
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS4_TOPIC_PROFILES: Record<string, TopicProfile> = {
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
          { text: 'By asking the weather forecaster', isCorrect: false }
        ],
        exp: 'Recommendation engines analyze historical listening patterns to find similar tracks.'
      }
    ],
    practicalTask: {
      title: 'Hidden AI Detective Hunt',
      objective: 'Find 3 invisible AI features on a smartphone or computer with an adult.',
      steps: [
        'Open a camera app: Point it at a person and observe face autofocus boxes.',
        'Open a text app: Type "Tomorow I will" and check the 3 predictive words.',
        'Write down how these 2 AI tools save time.'
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
</ul>`,
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
          { text: 'They throw packages out the windows', isCorrect: false }
        ],
        exp: 'Warehouse robots prevent human injuries from heavy lifting and speed up shipping.'
      }
    ],
    practicalTask: {
      title: 'Autonomous Rover Obstacle Course',
      objective: 'Draw a top-down obstacle course and map the sensor rules a robot needs to navigate it.',
      steps: [
        'Draw a 4x4 grid maze with 2 obstacles and 1 goal.',
        'Draw the path your rover must take from (0,0) to the goal.',
        'Write 3 IF-THEN sensor rules.'
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
  },

  'say it clearly!': {
    title: 'Say It Clearly!',
    hook: 'Why do computers fail when you give them ambiguous instructions like "Put that thing over there"?',
    goal: 'Learn the precision of computer language: how computers need exact syntax, parameters, and unambiguous commands.',
    learnPoints: [
      'Understand why human words are often ambiguous and how computers need precision',
      'Learn what Syntax and Parameters mean in coding',
      'Practice transforming fuzzy ideas into exact step-by-step algorithms'
    ],
    analogy: 'Programming is like baking with a picky chef: if you say "Add a pinch of salt", they won’t move; you must say "Add exactly 2 grams of sea salt!"',
    explanationHtml: `<h3>The Importance of Precision</h3>
<p>Humans understand context, tone, and facial expressions. Computers only understand exact mathematical logic and explicit keywords. If a single comma is missing or a word is ambiguous, the computer reports a <strong>Syntax Error</strong>.</p>`,
    step1: {
      title: '1. Eliminating Ambiguity',
      desc: 'Replace fuzzy words like "soon" or "big" with exact numbers and measurements.',
      detail: 'Use 50px instead of "a little bit".',
      code: '# Ambiguous: draw_circle("medium")\n# Exact:\ndraw_circle(radius=25, color="blue")'
    },
    step2: {
      title: '2. Following Strict Syntax Rules',
      desc: 'Match parentheses, quotes, and punctuation required by the language.',
      detail: 'Syntax rules keep computer instructions unambiguous.',
      code: 'print("Mission Accomplished!") # Correct syntax'
    },
    step3: {
      title: '3. Testing Edge Cases',
      desc: 'Run instructions with different numbers to make sure logic never breaks.',
      detail: 'Ensure inputs like 0 or negative numbers are handled.',
      code: 'if speed > 100: speed = 100 # Safety clamp'
    },
    realScenario: 'A student wrote a game script with exact instructions: `jump(height=40, duration=0.5)`. The character leaped smoothly onto the platform every time.',
    useCases: [
      'Air traffic control software tracking flight altitudes with exact foot measurements',
      '3D printers extruding plastic with millimeter precision',
      'Spacecraft navigation software calculating orbital burns to the microsecond'
    ],
    simCode: 'def set_temperature(target_celsius):\n    if target_celsius > 28:\n        return "Too hot! Clamping to 24°C"\n    return f"Thermostat precisely set to {target_celsius}°C"\nprint(set_temperature(22))',
    simOutput: 'Thermostat precisely set to 22°C',
    pairs: [
      { id: 'p1', term: 'Syntax', definition: 'The exact spelling and grammar rules of a programming language' },
      { id: 'p2', term: 'Parameter', definition: 'A specific value or number that gives exact detail to a command' },
      { id: 'p3', term: 'Syntax Error', definition: 'A computer mistake caused by a typo, missing bracket, or unclear word' }
    ],
    practice: {
      q: 'Which instruction is clear and unambiguous for a drawing robot?',
      opts: [
        'Draw a square with 10cm sides using red ink',
        'Draw something pretty on the paper',
        'Make a shape over there',
        'Do some art quickly'
      ],
      correct: 0,
      exp: 'Exact dimensions (10cm) and colors (red) give the robot specific parameters.',
      hint: 'Look for the option that gives exact numbers and colors.'
    },
    quizzes: [
      {
        q: 'What is a "Syntax Error" in computing?',
        opts: [
          { text: 'A mistake in code grammar or punctuation that prevents the program from running', isCorrect: true },
          { text: 'A cracked screen', isCorrect: false }
        ],
        exp: 'Syntax errors happen when code violates the spelling or grammar rules of the language.'
      }
    ],
    practicalTask: {
      title: 'Exact Recipe Challenge',
      objective: 'Write a crystal-clear 4-step algorithm for making a sandwich that a robot could follow without making a mess.',
      steps: [
        'Step 1: Specify exact slice count (2 slices).',
        'Step 2: Specify spread amount (1 spoonful peanut butter).',
        'Step 3: Specify placement orientation.',
        'Step 4: Verify with a classmate.'
      ],
      expectedResult: 'You will learn why explicit details prevent algorithmic errors.'
    },
    recall: {
      q: 'Why can’t computers understand fuzzy instructions?',
      a: 'Because computers lack human intuition; they need exact numbers, syntax, and keywords to execute commands!'
    },
    takeaways: [
      'Clear, precise instructions prevent software crashes and syntax errors.',
      'Parameters provide exact numbers and measurements to commands.',
      'Writing clearly is the first superpower of every great coder.'
    ]
  },

  'mission: instructions': {
    title: 'Mission: Instructions',
    hook: 'How do Mars rovers like Perseverance navigate craters and collect rock samples millions of kilometers away from Earth?',
    goal: 'Understand batch instruction sets, conditionals (IF/THEN), and autonomous execution in robotics and computer missions.',
    learnPoints: [
      'Learn how space rovers receive batches of instructions due to radio delay',
      'Master conditional branching: IF obstacle detected, THEN turn around',
      'Understand how loops repeat actions efficiently'
    ],
    analogy: 'Sending a mission instruction set to a Mars rover is like packing a detailed treasure map and survival guide for an explorer before they sail across the ocean!',
    explanationHtml: `<h3>Autonomous Mission Planning</h3>
<p>Because Mars is up to 400 million kilometers away, radio signals take up to 20 minutes to reach the rover. Scientists cannot use a joystick in real-time. Instead, they upload a complete <strong>Mission Instruction File</strong> once per day!</p>`,
    step1: {
      title: '1. Building the Mission Plan',
      desc: 'Scientists write a list of 100 sequential waypoint coordinates.',
      detail: 'Each waypoint has target rock analysis tasks.',
      code: 'mission_queue = [\n    {"action": "DRIVE", "meters": 15},\n    {"action": "SCAN_ROCK", "target": "Crater Ridge"}\n]'
    },
    step2: {
      title: '2. Conditional Hazard Avoidance',
      desc: 'The rover evaluates local terrain hazards using on-board stereo cameras.',
      detail: 'If a steep slope > 25° is found, it replans around it.',
      code: 'for task in mission_queue:\n    if hazard_sensor.detect_boulder():\n        rover.reroute_safely()'
    },
    step3: {
      title: '3. Data Transmission & Telemetry',
      desc: 'The rover beams high-resolution photos and mineral analysis back to NASA antennas.',
      detail: 'Scientists review results for the next mission cycle.',
      code: 'transmit_telemetry(photos, rock_sample_data)'
    },
    realScenario: 'NASA’s Perseverance rover drove 300 meters across Martian sand dunes completely autonomously, using its AutoNav AI computer to avoid sharp boulders.',
    useCases: [
      'Mars rovers exploring alien planets without real-time human joysticks',
      'Deep-sea submersibles mapping hydrothermal vents under extreme water pressure',
      'Automated disaster rescue drones scanning collapsed buildings for survivors'
    ],
    simCode: 'rover_status = {"battery": 88, "boulder_ahead": False}\nif rover_status["boulder_ahead"]:\n    print("Alert: Re-routing around rock 🪨")\nelse:\n    print("Path Clear: Advancing 20 meters toward Jezero Crater 🚀")',
    simOutput: 'Path Clear: Advancing 20 meters toward Jezero Crater 🚀',
    pairs: [
      { id: 'p1', term: 'Conditional (IF/THEN)', definition: 'A decision rule that executes an action only when a specific condition is met' },
      { id: 'p2', term: 'Telemetry', definition: 'Measurements and status data transmitted back from a remote machine' },
      { id: 'p3', term: 'Autonomous Navigation', definition: 'A vehicle driving and making route choices without human remote control' }
    ],
    practice: {
      q: 'Why can’t NASA scientists steer Mars rovers using a real-time video game joystick?',
      opts: [
        'Radio signals take up to 20 minutes to travel the vast distance between Earth and Mars',
        'Mars has no electricity',
        'The rover only moves at night',
        'Joysticks don’t work on computers'
      ],
      correct: 0,
      exp: 'Radio signals travel at the speed of light, causing a 5 to 20 minute delay over space distances.',
      hint: 'Think about how far away the planet Mars is from Earth.'
    },
    quizzes: [
      {
        q: 'What does a conditional IF statement allow a robot to do?',
        opts: [
          { text: 'Make decisions based on sensor feedback (e.g. IF obstacle, THEN turn)', isCorrect: true },
          { text: 'Turn into a spaceship', isCorrect: false }
        ],
        exp: 'Conditionals allow programs to branch and react dynamically to changes.'
      }
    ],
    practicalTask: {
      title: 'Mars Rover Mission Blueprint',
      objective: 'Write a 4-step mission plan for a rover with 1 IF-THEN conditional safety rule.',
      steps: [
        'Step 1: Drive 10 meters north.',
        'Step 2: IF rock detected, scan sample.',
        'Step 3: Take panorama photo.',
        'Step 4: Transmit data to Earth base.'
      ],
      expectedResult: 'You will experience how space engineers program autonomous explorers.'
    },
    recall: {
      q: 'What is a conditional instruction in programming?',
      a: 'An IF-THEN rule that tells the computer to take an action only when a certain condition is true!'
    },
    takeaways: [
      'Robots operating far away rely on autonomous batch instructions and conditionals.',
      'Conditionals (IF/THEN) allow machines to react to unexpected hazards safely.',
      'Space rovers demonstrate the incredible power of autonomous computer programming.'
    ]
  },

  'ai in my mobile': {
    title: 'AI in My Mobile',
    hook: 'When you unlock a smartphone with your face or filter a selfie with puppy ears, how does the phone know where your nose and eyes are?',
    goal: 'Explore mobile AI features: Face Unlock, camera scene optimization, predictive text, and battery management.',
    learnPoints: [
      'Learn how Face ID creates a 3D infrared depth map of facial landmarks',
      'Understand how camera AI enhances lighting and sharpens night photos',
      'Discover battery management AI that extends phone life'
    ],
    analogy: 'Face Unlock is like an ultra-detailed sculptor: it projects 30,000 invisible dots onto your face to check your unique cheekbone and nose shape in milliseconds!',
    explanationHtml: `<h3>The AI Supercomputer in Your Pocket</h3>
<p>Modern smartphones have a dedicated <strong>Neural Processing Unit (NPU)</strong> chip built alongside the CPU to run machine learning calculations at lightning speed.</p>
<h4>How Face Unlock Works</h4>
<p>An infrared dot projector casts 30,000 invisible light dots onto your face. A neural network analyzes the depth map and unlocks the phone only if the mathematical facial coordinates match yours perfectly—even in total darkness!</p>`,
    step1: {
      title: '1. Infrared Facial Dot Projection',
      desc: 'Projects 30,000 invisible infrared dots onto the user’s face.',
      detail: 'Reads contours regardless of lighting.',
      code: 'depth_map = infrared_scanner.capture_mesh()'
    },
    step2: {
      title: '2. Neural Coordinate Verification',
      desc: 'Matches nose depth, eye distance, and jawline against encrypted owner data.',
      detail: 'Rejects photos or masks.',
      code: 'if neural_face_matcher.verify(depth_map):\n    unlock_phone()'
    },
    step3: {
      title: '3. Adaptive Learning of Aging & Glasses',
      desc: 'Updates facial model if you put on glasses or change hairstyles.',
      detail: 'Adapts safely over time.',
      code: 'neural_model.update_weights(depth_map)'
    },
    realScenario: 'A user tried unlocking their phone in a pitch black room. The infrared dot projector read their facial contours instantly and unlocked without needing screen glare.',
    useCases: [
      'Face ID securely authenticating payments and unlocking apps',
      'Camera night mode merging 8 exposures into one bright photo',
      'Adaptive battery predicting your daily app usage to save energy'
    ],
    simCode: 'face_match_score = 0.98\nif face_match_score >= 0.95:\n    print("Phone Unlocked 🔓: Welcome back, Explorer!")\nelse:\n    print("Phone Locked 🔒: Face not recognized")',
    simOutput: 'Phone Unlocked 🔓: Welcome back, Explorer!',
    pairs: [
      { id: 'p1', term: 'NPU (Neural Processing Unit)', definition: 'A specialized microchip inside smartphones designed for AI calculations' },
      { id: 'p2', term: 'Biometrics', definition: 'Measuring unique biological features like faces or fingerprints for security' },
      { id: 'p3', term: 'Depth Map', definition: 'A 3D grid of measurements showing how far away each part of your face is' }
    ],
    practice: {
      q: 'How does Face Unlock verify your identity safely even in the dark?',
      opts: [
        'By projecting invisible infrared depth dots that an IR camera reads',
        'By guessing based on the time of day',
        'By shining a blinding flashlight in your eyes',
        'By measuring the weight of your hand'
      ],
      correct: 0,
      exp: 'Infrared sensors do not need visible light to capture 3D facial depth contours.',
      hint: 'Think about invisible infrared light sensors.'
    },
    quizzes: [
      {
        q: 'What is the special phone chip that speeds up AI calculations called?',
        opts: [
          { text: 'NPU (Neural Processing Unit)', isCorrect: true },
          { text: 'A paper clip', isCorrect: false }
        ],
        exp: 'NPUs accelerate matrix multiplications required by neural network models.'
      }
    ],
    practicalTask: {
      title: 'Mobile AI Audit',
      objective: 'List 3 features on a smartphone that use artificial intelligence.',
      steps: [
        '1. Test Camera Portrait Mode / Night Mode.',
        '2. Test predictive text bar in keyboard.',
        '3. Test Voice Assistant or Face Unlock.',
        'Write 1 sentence explaining how 1 feature works.'
      ],
      expectedResult: 'You will identify the active AI micro-services running on mobile hardware.'
    },
    recall: {
      q: 'What is an NPU inside a phone?',
      a: 'A Neural Processing Unit—a specialized hardware chip built specifically to run fast AI models!'
    },
    takeaways: [
      'Smartphones use NPUs to run AI locally without needing internet connection.',
      'Face Unlock uses 3D infrared dot depth mapping for ultra-secure authentication.',
      'Camera and battery AI work silently to improve photo clarity and battery longevity.'
    ]
  },

  'ai on the move': {
    title: 'AI on the Move',
    hook: 'How does Google Maps or Apple Maps know there is a 15-minute traffic jam ahead before you even turn onto the highway?',
    goal: 'Understand intelligent transportation systems: live GPS routing, speed telemetry aggregation, and smart traffic signal optimization.',
    learnPoints: [
      'Learn how navigation apps collect anonymized speed telemetry from thousands of cars',
      'Understand shortest-path graph algorithms (like Dijkstra and A*)',
      'Discover smart city traffic lights that change green when emergency ambulances approach'
    ],
    analogy: 'Navigation AI is like having a helicopter scout flying above the city: it spots bottlenecks miles ahead and tells you to take a peaceful side street!',
    explanationHtml: `<h3>Smart Navigation & Transportation</h3>
<p>Modern GPS navigation isn't just a static street map. It is a live, dynamic neural network connecting millions of traveling vehicles in real time.</p>
<h4>How Live Traffic Maps Work</h4>
<p>Every smartphone with GPS sends anonymous speed updates: <em>"Vehicle moving at 10 km/h on Main Street"</em>. When 50 phones report slow speeds in the same block, the AI flags heavy traffic (Red) and recalculates faster detour routes for incoming drivers.</p>`,
    step1: {
      title: '1. Telemetry Speed Ingestion',
      desc: 'Aggregates anonymous speed data from thousands of vehicles every 10 seconds.',
      detail: 'Converts speeds into road congestion scores.',
      code: 'road_speed = get_average_speed("Highway 101")\nif road_speed < 20: traffic_status = "HEAVY"'
    },
    step2: {
      title: '2. Dynamic Detour Calculation',
      desc: 'Graph algorithms calculate alternative routes through side avenues.',
      detail: 'Estimates arrival time to the minute.',
      code: 'best_route = calculate_fastest_path(start, end, live_traffic=True)'
    },
    step3: {
      title: '3. Real-Time Turn-by-Turn Guidance',
      desc: 'Displays reroute alerts: "Traffic ahead, saved 6 mins via Oak Street".',
      detail: 'Smoothes traffic flow across the whole city.',
      code: 'display_reroute_prompt("Saved 6 minutes via Oak Street")'
    },
    realScenario: 'During a sudden thunderstorm, navigation AI rerouted 2,000 commuters around a flooded bridge, keeping traffic flowing smoothly through alternate elevated roads.',
    useCases: [
      'Navigation apps saving millions of liters of fuel by avoiding traffic jams',
      'Delivery vans optimizing package delivery routes to 120 houses in sequence',
      'Ambulance dispatch systems automatically triggering green traffic lights'
    ],
    simCode: 'route_a_time = 35 # minutes via highway (traffic jam)\nroute_b_time = 22 # minutes via scenic avenue\nif route_b_time < route_a_time:\n    print(f"Rerouting: Take Route B to save {route_a_time - route_b_time} minutes! 🚗💨")',
    simOutput: 'Rerouting: Take Route B to save 13 minutes! 🚗💨',
    pairs: [
      { id: 'p1', term: 'Telemetry', definition: 'Live speed and location data sent anonymously by GPS devices' },
      { id: 'p2', term: 'Reroute', definition: 'Calculating a faster detour path when obstacles or traffic appear' },
      { id: 'p3', term: 'Smart Traffic Light', definition: 'Signals that change dynamically based on camera vehicle counts' }
    ],
    practice: {
      q: 'How does a navigation app know when a highway has a traffic jam?',
      opts: [
        'By analyzing anonymous speed data from many phones moving slowly on that road',
        'By sending pigeons to count cars',
        'By guessing based on the day of the week only',
        'By listening to car horns through microphones'
      ],
      correct: 0,
      exp: 'When many phone GPS signals report low speeds on a road, the app marks it red.',
      hint: 'Think about live speed data reported by phones in cars.'
    },
    quizzes: [
      {
        q: 'Why does optimizing vehicle routes help our planet?',
        opts: [
          { text: 'It reduces idling time in traffic jams, saving fuel and lowering air pollution', isCorrect: true },
          { text: 'It turns gasoline into water', isCorrect: false }
        ],
        exp: 'Efficient navigation cuts carbon emissions and fuel waste.'
      }
    ],
    practicalTask: {
      title: 'Traffic Scout Simulation',
      objective: 'Draw a mini city road grid with 2 routes and choose the fastest path based on traffic points.',
      steps: [
        'Draw Route A (Highway, 30 mins) with 1 red traffic block (+15 mins).',
        'Draw Route B (Side street, 25 mins, green clear).',
        'Calculate total minutes for both and pick the best path.'
      ],
      expectedResult: 'You will understand how pathfinding algorithms optimize commute times.'
    },
    recall: {
      q: 'How does AI help vehicles on the move?',
      a: 'It analyzes live speed data to route drivers away from traffic jams, saving time and fuel!'
    },
    takeaways: [
      'Live navigation uses speed data from thousands of vehicles to spot congestion.',
      'Graph algorithms find the fastest detours to keep cities moving smoothly.',
      'Smart transportation reduces fuel consumption and emergency response times.'
    ]
  },

  'future job hunt': {
    title: 'Future Job Hunt',
    hook: 'What kind of jobs will you do in 2035 that don’t even have names yet today?',
    goal: 'Explore emerging technology careers: Prompt Engineers, Robot Ethics Specialists, Space Data Analysts, and Virtual Reality World Builders.',
    learnPoints: [
      'Discover future careers created by AI: AI Ethicist, VR Architect, Prompt Engineer',
      'Understand how existing jobs like farming, sports coaching, and medicine are transforming',
      'Learn the vital human skills: empathy, creative design, and critical thinking'
    ],
    analogy: 'AI in future jobs is like an electric guitar: the guitar produces incredible electric sounds, but it still needs a passionate human musician to compose the song!',
    explanationHtml: `<h3>The Changing Landscape of Careers</h3>
<p>Just as the invention of airplanes created airline pilots and flight attendants, artificial intelligence is creating hundreds of brand-new, exciting career fields!</p>`,
    step1: {
      title: '1. Identifying Emerging Tech Fields',
      desc: 'Explore careers in robotics, ethical AI auditing, and spatial computing.',
      detail: 'New disciplines combine science with art.',
      code: 'careers_2035 = ["AI Ethicist", "Drone Fleet Manager", "Bio-Coder"]'
    },
    step2: {
      title: '2. Combining Human Strengths with AI',
      desc: 'Humans provide empathy and ethical judgment; AI provides computational speed.',
      detail: 'Synergy unlocks breakthroughs.',
      code: 'teamwork = {"Human": "Empathy & Strategy", "AI": "Data Processing"}'
    },
    step3: {
      title: '3. Lifelong Curiosity & Learning',
      desc: 'Developing adaptable problem-solving skills that thrive in changing tech environments.',
      detail: 'Curiosity is your superpower.',
      code: 'skills.append("Adaptability")'
    },
    realScenario: 'A high school graduate became a Virtual Reality World Builder, designing interactive 3D historical museums where students could walk with dinosaurs.',
    useCases: [
      'Sports coaches using AI vision to track athlete sprint posture and prevent injuries',
      'Marine biologists using underwater drones to monitor coral reef health',
      'Film directors using generative AI to create fantastical alien city backdrops'
    ],
    simCode: 'my_passion = "Animals & Technology"\nfuture_role = "Wildlife AI Drone Conservator 🐘"\nprint("My 2035 Career Plan:", future_role)',
    simOutput: 'My 2035 Career Plan: Wildlife AI Drone Conservator 🐘',
    pairs: [
      { id: 'p1', term: 'AI Ethicist', definition: 'A specialist who ensures computer algorithms are fair, safe, and unbiased' },
      { id: 'p2', term: 'Prompt Engineer', definition: 'An expert who designs precise questions and instructions to guide AI models' },
      { id: 'p3', term: 'VR World Builder', definition: 'A 3D designer creating immersive virtual reality educational environments' }
    ],
    practice: {
      q: 'Which career is an example of a brand-new role created by artificial intelligence?',
      opts: [
        'AI Ethics Auditor and Safety Tester',
        'Horse buggy wheel blacksmith',
        'Manual telegraph operator',
        'Stone wall chisel carver'
      ],
      correct: 0,
      exp: 'AI Ethics Auditors review machine learning systems to ensure fairness and safety.',
      hint: 'Look for the job focused on algorithmic safety and fairness.'
    },
    quizzes: [
      {
        q: 'Why will human creativity and empathy always be valuable in future jobs?',
        opts: [
          { text: 'Because machines cannot feel compassion, understand emotions, or invent authentic art', isCorrect: true },
          { text: 'Because robots refuse to work on Mondays', isCorrect: false }
        ],
        exp: 'Human emotional intelligence and moral compass cannot be replaced by algorithms.'
      }
    ],
    practicalTask: {
      title: 'Future Career Interview Roleplay',
      objective: 'Invent a future job title and write answers to 2 job interview questions.',
      steps: [
        'Job Title: (e.g. Smart City Energy Architect).',
        'Question 1: What problem do you solve for citizens?',
        'Question 2: What AI tool assists you in your daily work?'
      ],
      expectedResult: 'You will articulate how technological tools enhance career problem-solving.'
    },
    recall: {
      q: 'What is the most important skill for thriving in future careers?',
      a: 'Lifelong curiosity, adaptability, and combining human empathy with technology!'
    },
    takeaways: [
      'AI creates exciting new careers in ethics, prompt design, and virtual architecture.',
      'Traditional fields like medicine, sports, and farming are enhanced with AI tools.',
      'Human traits like empathy, compassion, and artistic vision remain irreplaceable.'
    ]
  },

  'my technology talent': {
    title: 'My Technology Talent',
    hook: 'Are you better at drawing, storytelling, solving puzzles, or helping friends? Every single talent has a superpower in technology!',
    goal: 'Discover your unique strengths and see how logic, visual art, writing, and empathy connect to computing and technology roles.',
    learnPoints: [
      'Map personal strengths to computing disciplines (Art → UI Design, Logic → Coding, Writing → Prompting)',
      'Learn how diverse strengths make tech teams successful',
      'Build confidence in your unique digital abilities'
    ],
    analogy: 'A technology team is like a superhero squad: the coder is like Iron Man with gadgets, the designer is like Doctor Strange with visual magic, and the communicator brings everyone together!',
    explanationHtml: `<h3>Finding Your Digital Superpower</h3>
<p>You don't have to be a math genius to build great technology. The best apps require a blend of different human talents:</p>
<ul>
  <li><strong>Love Drawing?</strong> You can become a <em>UI/UX Designer</em> creating beautiful buttons and interfaces.</li>
  <li><strong>Love Storytelling?</strong> You can become a <em>Game Narrative Writer</em> creating epic character quests.</li>
  <li><strong>Love Puzzles?</strong> You can become a <em>Software Developer</em> solving algorithmic riddles.</li>
  <li><strong>Love Helping People?</strong> You can become an <em>Accessibility Specialist</em> making apps usable for blind or deaf users.</li>
</ul>`,
    step1: {
      title: '1. Identifying Your Natural Strengths',
      desc: 'Reflect on what activities give you the most energy and joy.',
      detail: 'Creativity, logic, and communication are equally valuable.',
      code: 'my_talents = ["Visual Art", "Kindness", "Puzzle Solving"]'
    },
    step2: {
      title: '2. Matching Talents to Digital Tools',
      desc: 'Pair your strength with modern digital software.',
      detail: 'Artists use Figma; coders use Python; writers use prompt labs.',
      code: 'tool_match = {"Visual Art": "Figma & 3D Blender", "Logic": "Python & Scratch"}'
    },
    step3: {
      title: '3. Building Your First Passion Project',
      desc: 'Create something small and meaningful that showcases your talent.',
      detail: 'Share with friends and family.',
      code: 'project = build_portfolio_demo("Interactive Illustrated Storybook")'
    },
    realScenario: 'A 4th-grade student who loved drawing comics used Scratch to animate her drawings, creating a game that taught her classmates about saving ocean turtles.',
    useCases: [
      'Artists designing sleek mobile app icons and themes',
      'Storytellers writing dialogue branches for video game characters',
      'Logical problem solvers finding security vulnerabilities in software'
    ],
    simCode: 'talent = "Storytelling 📖"\ncareer_match = "AI Interactive Game Narrative Designer 🎮"\nprint(f"My Talent: {talent}")\nprint(f"My Tech Role: {career_match}")',
    simOutput: 'My Talent: Storytelling 📖\nMy Tech Role: AI Interactive Game Narrative Designer 🎮',
    pairs: [
      { id: 'p1', term: 'UI/UX Design', definition: 'Designing how digital apps look, feel, and flow so they are fun to use' },
      { id: 'p2', term: 'Accessibility', definition: 'Ensuring apps can be used easily by people with visual, hearing, or physical challenges' },
      { id: 'p3', term: 'Passion Project', definition: 'A creative project you build based on something you genuinely love' }
    ],
    practice: {
      q: 'If you love drawing and choosing colors, which tech role matches your talent best?',
      opts: [
        'UI/UX Visual Designer',
        'Database Cable Splicer',
        'Server Room Air Filter Cleaner',
        'Hardware Screw Sorter'
      ],
      correct: 0,
      exp: 'UI/UX designers craft the visual layouts, color palettes, and icons for apps.',
      hint: 'Look for the design role focused on visuals and aesthetics.'
    },
    quizzes: [
      {
        q: 'Do you need to be good at only math to work in technology?',
        opts: [
          { text: 'No, great technology requires artists, writers, managers, and problem solvers of all kinds', isCorrect: true },
          { text: 'Yes, only math counts', isCorrect: false }
        ],
        exp: 'Technology thrives on multidisciplinary talent from art, writing, logic, and ethics.'
      }
    ],
    practicalTask: {
      title: 'My Digital Superpower Card',
      objective: 'Create a personal profile card listing your top talent and a tech project you want to build.',
      steps: [
        '1. Name your Top Talent (e.g. Storytelling).',
        '2. Invent an app idea that uses this talent (e.g. Magical Animal Encyclopedia).',
        '3. Draw the home screen of your app idea.'
      ],
      expectedResult: 'You will connect your personal hobbies to digital software creation.'
    },
    recall: {
      q: 'How do different human talents help tech teams?',
      a: 'Artists make apps beautiful, writers make them engaging, and coders make them run fast!'
    },
    takeaways: [
      'Every natural talent—art, writing, logic, or empathy—has an exciting place in tech.',
      'UI/UX designers, narrative writers, and accessibility specialists shape modern software.',
      'Building passion projects builds confidence in your unique abilities.'
    ]
  },

  'create a story': {
    title: 'Create a Story',
    hook: 'Can an AI help you invent a fantasy world where trees whisper secrets and dragons bake birthday cakes?',
    goal: 'Learn how generative AI models understand story structure: characters, conflicts, plots, and resolutions, and co-write creative tales.',
    learnPoints: [
      'Understand how LLMs predict the next word in a story sequence',
      'Learn the 4 pillars of storytelling: Character, Setting, Problem, Resolution',
      'Practice collaborative co-writing: guiding the AI with imaginative plot twists'
    ],
    analogy: 'Co-writing a story with AI is like playing an improv storytelling game with a friend: you say "Once upon a time in a floating cloud castle...", and the AI says "Yes, and a flying squirrel lived there!"',
    explanationHtml: `<h3>Collaborative Storytelling with AI</h3>
<p>Generative Large Language Models (LLMs) have read millions of classic stories, fairy tales, and poems. They understand narrative arcs and can help brainstorm creative twists.</p>
<h4>The 4 Pillars of Storytelling</h4>
<ul>
  <li><strong>1. Character:</strong> Who is the hero? (e.g. Pippin the clockwork owl)</li>
  <li><strong>2. Setting:</strong> Where does it happen? (e.g. An enchanted library in the sky)</li>
  <li><strong>3. Conflict:</strong> What problem arises? (e.g. The magic bookmarks lost their glow)</li>
  <li><strong>4. Resolution:</strong> How do they solve it? (e.g. By singing ancient alphabet songs)</li>
</ul>`,
    step1: {
      title: '1. Setting the Story Blueprint',
      desc: 'Define the main hero, quirky sidekick, and whimsical setting.',
      detail: 'Gives the AI clear parameters.',
      code: 'hero = "Oliver, a young boy with a magical sketchpad"\nsetting = "Whispering Crystal Forest"'
    },
    step2: {
      title: '2. Generating the Plot Twist',
      desc: 'Ask the AI to introduce a sudden, surprising mystery.',
      detail: 'Creates exciting tension.',
      code: 'prompt = f"Write chapter 2 where {hero} in {setting} discovers a glowing door under the moss."'
    },
    step3: {
      title: '3. Human Editing & Polish',
      desc: 'Revise sentences to add your own personal humor and emotional warmth.',
      detail: 'Human creativity makes the story shine.',
      code: 'story_draft = edit_and_add_humor(ai_output)'
    },
    realScenario: 'A classroom used generative AI to co-write an adventure story about an astronaut cat named Cosmo who discovered that Saturn’s rings were made of rainbow candy.',
    useCases: [
      'Children writing custom bedtime stories with their own names as the hero',
      'Game designers generating branching quest dialogues for RPG games',
      'Teachers creating fun reading comprehension passages tailored to students’ interests'
    ],
    simCode: 'story_starter = "Deep in the enchanted forest, Pippin the owl found a brass key..."\nai_continuation = "The key had a tiny glowing compass that pointed straight toward the Whispering Waterfall! 🗝️✨"\nprint(story_starter + " " + ai_continuation)',
    simOutput: 'Deep in the enchanted forest, Pippin the owl found a brass key... The key had a tiny glowing compass that pointed straight toward the Whispering Waterfall! 🗝️✨',
    pairs: [
      { id: 'p1', term: 'Generative AI', definition: 'Artificial intelligence capable of creating new text, stories, images, or music' },
      { id: 'p2', term: 'Plot Twist', definition: 'An unexpected turn of events in a story that surprises the reader' },
      { id: 'p3', term: 'Co-Writing', definition: 'A human writer and AI collaborating together to develop ideas' }
    ],
    practice: {
      q: 'What is the role of human writers when co-writing stories with AI?',
      opts: [
        'Providing the creative vision, emotion, character depth, and editing the draft',
        'Sleeping while the computer does everything',
        'Copying random sentences without reading them',
        'Deleting the keyboard'
      ],
      correct: 0,
      exp: 'Humans provide the soul, humor, empathy, and direction for AI-assisted writing.',
      hint: 'Think about how human imagination shapes the story.'
    },
    quizzes: [
      {
        q: 'What are the 4 main pillars of a great story?',
        opts: [
          { text: 'Character, Setting, Conflict, and Resolution', isCorrect: true },
          { text: 'Screws, Wires, Batteries, and Metal', isCorrect: false }
        ],
        exp: 'Every narrative arc revolves around characters solving problems in a setting.'
      }
    ],
    practicalTask: {
      title: 'Choose Your Own Adventure Branch',
      objective: 'Write a story paragraph that gives the reader 2 different choices to continue.',
      steps: [
        '1. Write an opening paragraph with a mystery door.',
        '2. Choice A: Open the brass door with the silver key.',
        '3. Choice B: Climb the ivy trellis to the roof.',
        '4. Write 1 sentence outcome for each choice.'
      ],
      expectedResult: 'You will understand branching narrative logic used in interactive digital stories.'
    },
    recall: {
      q: 'How does Generative AI help writers?',
      a: 'It brainstorms plot ideas, describes magical settings, and helps overcome writer’s block!'
    },
    takeaways: [
      'Generative AI understands narrative structure and can brainstorm story scenes.',
      'Human writers guide the theme, add humor, and make the story emotionally resonant.',
      'Co-writing combines human imagination with rapid digital brainstorming.'
    ]
  },

  'design with ai': {
    title: 'Design with AI',
    hook: 'How can typing "A cozy treehouse illuminated by bioluminescent fairy lanterns, 3D clay style" turn into a stunning digital painting in 5 seconds?',
    goal: 'Explore text-to-image diffusion models, understand how descriptive style keywords guide image generation, and practice creative visual promptcraft.',
    learnPoints: [
      'Understand how diffusion models turn random static noise into clear artwork',
      'Master prompt modifiers: Lighting, Medium (Watercolor, Clay, 3D, Oil), and Color Palette',
      'Respect original artists and understand the ethics of visual art AI'
    ],
    analogy: 'A text-to-image AI is like a master sculptor carving away rough stone: it starts with blurry digital noise and chips away the static until your vision appears clearly!',
    explanationHtml: `<h3>How Diffusion Models Generate Art</h3>
<p>Modern visual AI systems (like Midjourney, DALL-E, and Stable Diffusion) do not copy and paste existing photos from the internet. Instead, they learn the mathematical relationships between words and visual textures.</p>
<h4>The Magic of Diffusion</h4>
<p>The AI starts with a canvas filled with random fuzzy dots (noise). Step by step, it removes the noise and refines edges, colors, and lighting until a crisp, original image emerges!</p>`,
    step1: {
      title: '1. Subject & Action Specification',
      desc: 'Describe the main subject clearly in the prompt.',
      detail: 'Avoid single words; describe details.',
      code: 'subject = "A friendly robot gardening red roses in space"'
    },
    step2: {
      title: '2. Adding Style & Lighting Modifiers',
      desc: 'Add artistic parameters like watercolor, origami, or golden-hour cinematic sunlight.',
      detail: 'Dictates mood and texture.',
      code: 'style = "Studio Ghibli anime style, warm sunlight, soft pastel colors"'
    },
    step3: {
      title: '3. Diffusion Rendering & Selection',
      desc: 'The diffusion model generates 4 variations from pure noise in 20 diffusion steps.',
      detail: 'Select and upscale the best composition.',
      code: 'image_grid = diffusion_model.render(subject + ", " + style, steps=20)'
    },
    realScenario: 'An elementary school science club generated custom illustrated badges of solar flare rovers for their astronomy club T-shirts, printing unique badges for every student.',
    useCases: [
      'Book illustrators generating concept character moodboards in minutes',
      'Architects creating visual mockups of eco-friendly futuristic green parks',
      'Game artists designing texture patterns for fantasy creature armor'
    ],
    simCode: 'prompt = "Cyberpunk treehouse library, warm glowing lanterns, watercolor style"\nprint("🎨 Diffusion Engine Starting...")\nprint("Step 5/20: Denoising background...")\nprint("Step 20/20: Image Rendered: 🖼️ High-Res Concept Art Generated!")',
    simOutput: '🎨 Diffusion Engine Starting...\nStep 5/20: Denoising background...\nStep 20/20: Image Rendered: 🖼️ High-Res Concept Art Generated!',
    pairs: [
      { id: 'p1', term: 'Diffusion Model', definition: 'An AI image system that creates artwork by clearing away random pixel noise' },
      { id: 'p2', term: 'Prompt Modifier', definition: 'Keywords added to describe lighting, style, camera angle, and artistic medium' },
      { id: 'p3', term: 'Denoising', definition: 'The mathematical process of turning fuzzy dots into sharp lines and shapes' }
    ],
    practice: {
      q: 'Which prompt will generate the most specific and visually stunning fantasy illustration?',
      opts: [
        'A glowing crystal castle on a floating mossy island, sunset lighting, digital painting style',
        'Castle',
        'Make me something cool with buildings',
        'Pic'
      ],
      correct: 0,
      exp: 'Specific details (crystal, floating mossy island) plus lighting (sunset) and medium (digital painting) give the AI exact creative direction.',
      hint: 'Look for the prompt with descriptive subject, lighting, and style keywords.'
    },
    quizzes: [
      {
        q: 'How does a diffusion AI model generate an image from a prompt?',
        opts: [
          { text: 'By starting with random pixel noise and iteratively refining it into a clean image', isCorrect: true },
          { text: 'By cutting photos out of magazines with scissors', isCorrect: false }
        ],
        exp: 'Diffusion models reverse noise to reconstruct clear photographic and artistic textures.'
      }
    ],
    practicalTask: {
      title: 'Art Director Prompt Lab',
      objective: 'Write 3 distinct prompt styles for the exact same subject (e.g. "A sleepy baby dragon").',
      steps: [
        'Style 1: Claymation / 3D Toy style.',
        'Style 2: Traditional Japanese Watercolor style.',
        'Style 3: Futuristic Neon Cyberpunk style.',
        'Describe how the colors and mood change in each.'
      ],
      expectedResult: 'You will learn how artistic modifiers completely transform visual aesthetics.'
    },
    recall: {
      q: 'What is Denoising in visual AI?',
      a: 'The step-by-step process of turning random fuzzy noise into a crisp, detailed digital painting!'
    },
    takeaways: [
      'Visual diffusion models synthesize original artwork from text descriptions.',
      'Style modifiers (lighting, medium, camera angle) give precise control over visual mood.',
      'AI acts as a visual brainstorming partner for human artists and designers.'
    ]
  },

  'secret or share?': {
    title: 'Secret or Share?',
    hook: 'If a cool online avatar quiz asks: "What is your mother’s maiden name and your school’s address?", is it safe to answer?',
    goal: 'Master digital privacy boundaries: distinguish between public shareable information and confidential private data, and recognize phishing tactics.',
    learnPoints: [
      'Classify data into Green (Safe to Share) and Red (Strictly Secret)',
      'Recognize deceptive quizzes and fake prize pop-ups designed to steal data',
      'Understand how companies collect and protect user profiles'
    ],
    analogy: 'Your personal data is like your bedroom: your favorite posters can be seen by guests (Public), but your diary stays locked in your drawer (Secret)!',
    explanationHtml: `<h3>The Secret vs. Share Traffic Light</h3>
<p>Whenever an app, game, or website asks for information, use the <strong>Data Traffic Light Rule</strong>:</p>
<ul>
  <li><strong style="color: green;">🟢 Green (Safe to Share):</strong> Your favorite cartoon, your favorite food, your high score in a math game.</li>
  <li><strong style="color: red;">🔴 Red (Strictly Secret):</strong> Your full name, home address, phone number, school location, passwords, parent credit cards.</li>
</ul>`,
    step1: {
      title: '1. Auditing Input Prompts',
      desc: 'Inspect whether an online form is requesting red-flag personal data.',
      detail: 'Stop immediately if passwords or addresses are asked.',
      code: 'def is_safe_input(field_name):\n    secret_list = ["password", "address", "phone", "school"]\n    return field_name.lower() not in secret_list'
    },
    step2: {
      title: '2. Spotting Sneaky Phishing Traps',
      desc: 'Identify fake online quizzes that disguise private data questions as games.',
      detail: 'Quizzes asking "What street did you grow up on?" are password recovery traps.',
      code: 'if quiz_asks_security_questions():\n    warn_user("Potential Phishing Trap ⚠️")'
    },
    step3: {
      title: '3. Activating Guardian Assistance',
      desc: 'Consult a parent or teacher whenever an unfamiliar app asks for account permissions.',
      detail: 'Never click "Accept All" blindly.',
      code: 'request_parental_consent()'
    },
    realScenario: 'A student playing an online game noticed a pop-up promising 1,000 free gems in exchange for their parent’s phone number. The student remembered the Red Light rule, closed the tab, and reported the scam to their parents.',
    useCases: [
      'Two-factor authentication keeping student school accounts secure',
      'Privacy settings in educational platforms hiding real student last names',
      'Ad-blockers preventing deceptive pop-ups on school study tablets'
    ],
    simCode: 'data_item = "Home Street Address"\nif data_item in ["Home Street Address", "Password", "Phone Number"]:\n    privacy_level = "🔴 STRICTLY SECRET: Do not type online!"\nprint(f"{data_item} → {privacy_level}")',
    simOutput: 'Home Street Address → 🔴 STRICTLY SECRET: Do not type online!',
    pairs: [
      { id: 'p1', term: 'Phishing', definition: 'A sneaky trick where scammers pretend to be a trusted game or app to steal secrets' },
      { id: 'p2', term: 'Confidential Data', definition: 'Private information that should never be revealed on public websites' },
      { id: 'p3', term: 'Two-Factor Authentication', definition: 'A double-lock security system requiring both a password and a phone code' }
    ],
    practice: {
      q: 'Which of the following is STRICTLY SECRET (Red Light) and should NEVER be entered into a public online chatbot?',
      opts: [
        'Your home Wi-Fi password and your apartment address',
        'Your favorite planet in the solar system (Saturn)',
        'Your favorite type of ice cream (Mint Chocolate Chip)',
        'Your drawing of a cartoon robot'
      ],
      correct: 0,
      exp: 'Passwords and home addresses are confidential and must never be entered into public chatbots.',
      hint: 'Look for the personal details that could compromise your family’s safety.'
    },
    quizzes: [
      {
        q: 'What is Phishing in cybersecurity?',
        opts: [
          { text: 'A deceptive trap where scammers try to trick you into revealing personal passwords or information', isCorrect: true },
          { text: 'Catching salmon in a river with a rod', isCorrect: false }
        ],
        exp: 'Phishing exploits trust to harvest confidential credentials.'
      }
    ],
    practicalTask: {
      title: 'Privacy Traffic Light Sorter',
      objective: 'Sort 6 data items into Green (Safe to Share) and Red (Strictly Secret) columns.',
      steps: [
        'Items: 1. Favorite color, 2. School Name, 3. Home address, 4. Favorite song, 5. Computer Password, 6. Pet’s nickname.',
        'Draw a table with Green and Red columns.',
        'Sort all 6 items correctly.'
      ],
      expectedResult: 'You will master the boundary between shareable hobbies and confidential private data.'
    },
    recall: {
      q: 'What is the Data Traffic Light Rule?',
      a: 'Green means safe hobbies are okay to share; Red means passwords, names, and addresses stay strictly secret!'
    },
    takeaways: [
      'Never type passwords, addresses, full names, or phone numbers into public chatbots or games.',
      'Phishing traps disguise private data theft as free prize quizzes.',
      'When in doubt, always pause and ask a parent or teacher before entering information.'
    ]
  },

  'ai: right or wrong?': {
    title: 'AI: Right or Wrong?',
    hook: 'If an AI gives you an answer with complete confidence, does that mean it is 100% true?',
    goal: 'Understand AI hallucinations, bias, and the necessity of human fact-checking and critical evaluation.',
    learnPoints: [
      'Learn what an AI Hallucination is: when a model invents plausible-sounding falsehoods',
      'Understand why AI does not "know" truth; it calculates word probabilities',
      'Master the 3-Step Verification Rule: Check Source, Verify with Book, Ask Teacher'
    ],
    analogy: 'An AI is like an enthusiastic parrot that repeats words it heard: it can recite beautiful poetry, but it doesn’t actually understand what is true or false in the real world!',
    explanationHtml: `<h3>Can AI Make Mistakes?</h3>
<p>Yes! Even the smartest AI models in the world can make silly mistakes. When an AI invents a fake fact that sounds believable, computer scientists call it a <strong>Hallucination</strong>.</p>
<h4>Why Does AI Hallucinate?</h4>
<p>Large Language Models do not possess conscious understanding. They are mathematical prediction engines calculating which word is most likely to come next. If an uncommon question is asked, it might assemble a sentence that sounds smart but is completely wrong!</p>`,
    step1: {
      title: '1. Spotting Unverified Claims',
      desc: 'Identify when an AI output lacks citations or provides suspicious historical dates.',
      detail: 'Never copy-paste homework blindly.',
      code: 'def verify_claim(claim_text):\n    sources = cross_reference_encyclopedia(claim_text)\n    return len(sources) >= 2'
    },
    step2: {
      title: '2. The 3-Step Fact-Check Protocol',
      desc: '1. Check official library books. 2. Verify with reputable educational sites. 3. Ask a teacher.',
      detail: 'Triple verification guarantees factual accuracy.',
      code: 'if not verify_claim(fact):\n    flag_as_unverified()'
    },
    step3: {
      title: '3. Responsible Academic Integrity',
      desc: 'Use AI for brainstorming and explanations, but write original final assignments.',
      detail: 'Always disclose AI assistance responsibly.',
      code: 'cite_ai_assistance("Brainstormed outline with AI Assistant")'
    },
    realScenario: 'A student asked an AI: "When did elephants land on the Moon?" The AI jokingly replied "Elephants landed on the moon in 1972 on Apollo 18." The student checked their science book, realized Apollo 18 never happened, and avoided a hilarious mistake on their test!',
    useCases: [
      'Fact-checking historical dates generated by chatbots against encyclopedia databases',
      'Medical researchers verifying AI-generated chemical formulas in laboratory trials',
      'Journalists checking eyewitness reports before publishing news articles'
    ],
    simCode: 'ai_output = "The Eiffel Tower was moved to Tokyo in 1985."\nfact_check = "FALSE: The Eiffel Tower is in Paris, France 🇫🇷"\nprint("AI Claim:", ai_output)\nprint("Fact-Check Result:", fact_check)',
    simOutput: 'AI Claim: The Eiffel Tower was moved to Tokyo in 1985.\nFact-Check Result: FALSE: The Eiffel Tower is in Paris, France 🇫🇷',
    pairs: [
      { id: 'p1', term: 'Hallucination', definition: 'When an AI model generates fake facts or made-up information with confident tone' },
      { id: 'p2', term: 'Fact-Checking', definition: 'Verifying claims against trusted, authoritative reference books and encyclopedias' },
      { id: 'p3', term: 'Academic Integrity', definition: 'Being honest about your own schoolwork and giving credit to tools and sources' }
    ],
    practice: {
      q: 'What should you always do when an AI tells you a surprising historical fact for your school project?',
      opts: [
        'Check the fact in a trusted school library book or reputable encyclopedia website',
        'Believe it immediately and print 100 posters',
        'Assume the AI is an all-knowing wizard',
        'Argue with your teacher that the computer is never wrong'
      ],
      correct: 0,
      exp: 'Always cross-reference AI claims with trusted reference sources to catch hallucinations.',
      hint: 'Think about how you verify information in school research.'
    },
    quizzes: [
      {
        q: 'What does "AI Hallucination" mean in computer science?',
        opts: [
          { text: 'When an AI confidently makes up incorrect facts or stories that are not true', isCorrect: true },
          { text: 'When the computer monitor changes color', isCorrect: false }
        ],
        exp: 'Hallucination occurs when probability models predict fluent words that lack factual grounding.'
      }
    ],
    practicalTask: {
      title: 'AI Fact-Checker Detective',
      objective: 'Practice identifying which statement is a real fact and which is an AI hallucination.',
      steps: [
        'Statement A: "Honeybees communicate with each other using a special waggle dance."',
        'Statement B: "Benjamin Franklin invented the internet in 1776."',
        'Identify which is TRUE (A) and which is an AI Hallucination (B).',
        'Write 1 sentence explaining why verification is important.'
      ],
      expectedResult: 'You will build critical thinking habits and learn to verify all digital claims.'
    },
    recall: {
      q: 'Why can AI make confident mistakes?',
      a: 'Because AI predicts words mathematically; it does not actually know or understand real-world truth!'
    },
    takeaways: [
      'AI models can hallucinate plausible-sounding mistakes and fake historical facts.',
      'Always verify critical facts using textbooks, encyclopedias, and teacher guidance.',
      'Critical thinking and human fact-checking are essential for every smart digital user.'
    ]
  }
}
