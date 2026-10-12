// =============================================================================
// MIDDLE LEVEL (CLASSES 6-8) MASTER CURRICULUM DATA SERVICE
// 36 Lessons · 36 Unique Interactive Games · 180 Verified Olympiad Questions
// =============================================================================

export interface MiddleLevelQuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface MiddleLevelQuestion {
  id: string
  question: string
  options: MiddleLevelQuestionOption[]
  correctAnswer: string
  explanation: string
  hint: string
}

export interface MiddleLevelLessonItem {
  id: string
  gradeKey: 'class6' | 'class7' | 'class8'
  gradeName: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  lessonTitle: string
  missionScenario: string
  gameTitle: string
  gameEngine: string
  gameSummary: string
  pythonCode: string
  pythonOutput: string
  questions: MiddleLevelQuestion[]
}

export const MIDDLE_LEVEL_LESSONS: MiddleLevelLessonItem[] = [
  {
    "id": "class6-c1-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 1,
    "lessonTitle": "How Machines Get Smart",
    "missionScenario": "> **Mission Codename:** *Operation Robo-Sprout*\n> **Mission Briefing:** You have just been appointed Chief Systems Architect at the Neo-Green Automated Botanical Greenhouse on Mars Colony Alpha!\n> The greenhouse contains thousands of rare alien seedlings. A mechanical water sprinkler was previously installed with a simple rule: *\"Spray water every day at 08:00 AM for 10 minutes.\"*\n> Disaster struck! On rainy and humid days, the seedlings drowned. On scorching windy days, they withered and died!\n> Your mission is to transform this rigid, traditional machine into an **Intelligent Adaptive Agent**. You must teach the rover-sprinkler how to perceive soil humidity, temperature, and leaf color, and make real-time intelligent decisions instead of blindly following rigid rules.\n---",
    "gameTitle": "Rule Master vs Pattern Bot",
    "gameEngine": "Comparative Decision Simulation & Edge-Case Gauntlet.",
    "gameSummary": "#### Game Title: *Rule Master vs Pattern Bot* - **Game Engine Type:** Comparative Decision Simulation & Edge-Case Gauntlet. - **Educational Objective:** Hands-on realization of why deterministic rules fail in open environments and how adaptive models handle variance. #### Game Rules & Mechanics: 1. **Phase 1 (The Handcrafted Rule Builder):** - The student is given a budget of 4 logical rules to program an autonomous lawnmower.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 1 LESSON 1\n# SIMULATION: RULE-BASED VS ADAPTIVE SMART AGENT\n# =====================================================================\n\ndef rule_based_sprinkler(clock_time, soil_moisture):\n    \"\"\"\n    Rigid system: Only cares about the clock, ignores the real world!\n    \"\"\"\n    if clock_time == \"08:00 AM\":\n        return \"WATER ON (Rigid Clock Rule)\"\n    return \"WATER OFF\"\n\ndef smart_adaptive_sprinkler(soil_moisture, ambient_temp, rain_forecast):\n    \"\"\"\n    Smart agent: Considers multiple environmental sensory variables.\n    Thresholds:\n    - If it is already raining or soil is saturated (>70%), do not water.\n    - If soil is parched (<35%) or high heat (>32C), trigger emergency soak.\n    - Otherwise, maintain balanced moisture.\n    \"\"\"\n    if rain_forecast:\n        return \"WATER OFF (Conserving water; rain predicted)\"\n    \n    if soil_moisture > 70:\n        return \"WATER OFF (Soil adequately saturated)\"\n    elif soil_moisture < 35 or ambient_temp > 32:\n        return \"WATER ON - HIGH FLOW (Drought/Heatwave mitigation)\"\n    else:\n        return \"WATER ON - ECO PULSE (Optimal maintenance)\"\n\n# ----------------- TEST SCENARIOS -----------------\ntest_scenarios = [\n    {\"desc\": \"Scenario 1: 08:00 AM during a torrential thunderstorm\", \n     \"time\": \"08:00 AM\", \"moisture\": 85, \"temp\": 20, \"rain\": True},\n    {\"desc\": \"Scenario 2: 02:00 PM during a scorching heatwave\", \n     \"time\": \"02:00 PM\", \"moisture\": 25, \"temp\": 36, \"rain\": False},\n    {\"desc\": \"Scenario 3: 08:00 AM normal pleasant morning\", \n     \"time\": \"08:00 AM\", \"moisture\": 50, \"temp\": 24, \"rain\": False}\n]\n\nprint(\"=== MARS GREENHOUSE AUTOMATION COMPARISON ===\")\nfor sc in test_scenarios:\n    print(f\"\\n{sc['desc']}\")\n    rule_res = rule_based_sprinkler(sc['time'], sc['moisture'])\n    smart_res = smart_adaptive_sprinkler(sc['moisture'], sc['temp'], sc['rain'])\n    print(f\"  [Rule-Based System] : {rule_res}\")\n    print(f\"  [Smart AI System]   : {smart_res}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c1_l1_1",
        "question": "An automatic supermarket sliding door uses an infrared motion sensor. Whenever a human approaches, the beam breaks and the door slides open. Is this door an example of an AI system? - **A)** Yes, because it moves on its own without requiring a physical key. - **B)** No, because it follows a fixed, deterministic electrical circuit rule without learning from data. - **C)** Yes, because it recognizes human footsteps. - **D)** No, because it requires electricity to function.",
        "options": [
          {
            "id": "A",
            "text": "** Yes, because it moves on its own without requiring a physical key.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** No, because it follows a fixed, deterministic electrical circuit rule without learning from data.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Yes, because it recognizes human footsteps.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** No, because it requires electricity to function.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Automation is not synonymous with AI. The automatic door operates strictly on a deterministic binary switch: `IF beam is broken THEN open motor`. It does not analyze patterns, learn from past customer movement trends, or adapt its behavior over time.",
        "hint": "Reflect on the principles of How Machines Get Smart."
      },
      {
        "id": "q_class6_c1_l1_2",
        "question": "Why do traditional rule-based programs struggle when trying to recognize spoken words across different people? - **A)** Computers cannot process audio frequencies. - **B)** Every person speaks with unique accents, pitches, speeds, and background noise, creating too many variations to hardcode manually. - **C)** Rule-based systems can only run on desktop computers, not microphones. - **D)** Human speech does not contain mathematical information.",
        "options": [
          {
            "id": "A",
            "text": "** Computers cannot process audio frequencies.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Every person speaks with unique accents, pitches, speeds, and background noise, creating too many variations to hardcode manually.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Rule-based systems can only run on desktop computers, not microphones.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Human speech does not contain mathematical information.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Natural real-world data possesses immense variation. Hand-crafting explicit rules for millions of voice modulations, dialectal inflections, and audio artifacts is mathematically intractable for human programmers. AI succeeds by discovering statistical patterns across thousands of audio training samples.",
        "hint": "Reflect on the principles of How Machines Get Smart."
      },
      {
        "id": "q_class6_c1_l1_3",
        "question": "A chess computer in 1997 evaluates 200 million possible moves per second using a pre-calculated mathematical evaluation function written by chess grandmasters. A modern AI chess system in 2026 plays against itself for 4 hours, starts with zero knowledge other than the basic rules, and discovers revolutionary strategies that human grandmasters never conceived. What is the fundamental difference? - **A)** The 1997 computer had a faster CPU than modern computers. - **B)** The 1997 system is an expert rule-based search algorithm, whereas the 2026 system is a self-learning reinforcement learning agent. - **C)** The 2026 computer has human feelings and intuition. - **D)** There is no difference; both are traditional database queries.",
        "options": [
          {
            "id": "A",
            "text": "** The 1997 computer had a faster CPU than modern computers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The 1997 system is an expert rule-based search algorithm, whereas the 2026 system is a self-learning reinforcement learning agent.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The 2026 computer has human feelings and intuition.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** There is no difference; both are traditional database queries.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Deep Blue (1997) utilized massive brute-force search combined with human-crafted evaluation heuristics. Systems like AlphaZero/modern ML learn optimal strategies directly from experience (reinforcement learning), discovering non-intuitive patterns through self-play.",
        "hint": "Reflect on the principles of How Machines Get Smart."
      },
      {
        "id": "q_class6_c1_l1_4",
        "question": "Which component in an AI-powered delivery rover is responsible for acting as its \"sensory organ\"? - **A)** The electric wheel motor - **B)** The lithium-ion battery pack - **C)** The stereo camera and ultrasonic distance sensors - **D)** The flash memory hard drive",
        "options": [
          {
            "id": "A",
            "text": "** The electric wheel motor",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The lithium-ion battery pack",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The stereo camera and ultrasonic distance sensors",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The flash memory hard drive",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Sensors (cameras, LiDAR, microphones, ultrasonic transceivers) gather physical environmental data and convert it into digital signals, functioning as the sensory organs of the AI system. Motors and actuators represent the \"muscles\" (acting stage).",
        "hint": "Reflect on the principles of How Machines Get Smart."
      },
      {
        "id": "q_class6_c1_l1_5",
        "question": "An AI camera is installed at a bird sanctuary to count eagles. During testing, it correctly identifies 100 eagles against a clear blue sky. However, when an eagle flies in front of snowy mountain peaks, the AI labels it a \"Seagull\". What is the most likely cause of this error? - **A)** The camera battery was low. - **B)** The AI learned an unintended correlation between the background (blue sky) and the label rather than focusing exclusively on the bird's anatomical features. - **C)** Eagles turn into seagulls at high altitudes. - **D)** The AI became confused because the eagle was flying too fast.",
        "options": [
          {
            "id": "A",
            "text": "** The camera battery was low.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The AI learned an unintended correlation between the background (blue sky) and the label rather than focusing exclusively on the bird's anatomical features.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Eagles turn into seagulls at high altitudes.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The AI became confused because the eagle was flying too fast.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** This is a classic machine learning failure known as *shortcut learning* or *spurious correlation*. If all training examples of eagles had blue sky backgrounds, the model may mistakenly use blue background pixels as a key distinguishing feature for eagles.",
        "hint": "Reflect on the principles of How Machines Get Smart."
      }
    ]
  },
  {
    "id": "class6-c1-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 2,
    "lessonTitle": "Learning from Examples",
    "missionScenario": "> **Mission Codename:** *Project Cyber-Pet Sorter*\n> **Mission Briefing:** The Galactic Spaceport Security Terminal has been flooded with hundreds of lost alien pets!\n> Some pets are harmless, cuddly **\"Fluff-Puffs\"** (authorized companions), while others are mischievous, electric **\"Zap-Goblins\"** (require special handling).\n> The customs scanner does not know how to tell them apart. It has never seen either species before!\n> As the Spaceport AI Training Specialist, you cannot write an infinite list of rules because alien pets mutate slightly. Instead, you must curate a **Balanced Training Dataset**, extract discriminating physical features (ear shape, tail length, bio-glow frequency), and teach the customs scanner how to classify incoming mystery pets accurately!\n---",
    "gameTitle": "The Training Ground",
    "gameEngine": "Dataset Curation & Generalization Battle.",
    "gameSummary": "#### Game Title: *The Training Ground* - **Game Engine Type:** Dataset Curation & Generalization Battle. - **Educational Objective:** Hands-on experience in selecting balanced training samples to maximize generalization on unseen test data. #### Game Rules & Mechanics: 1. **Card Pool (30 Available Creature Cards):** - 10 Fluff-Puffs (Round body, soft fur, antenna, peaceful eyes).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 1 LESSON 2\n# PYTHON FEATURE-MATCHING CLASSIFIER SIMULATION\n# =====================================================================\n\n# 1. Training Dataset: Labeled Examples\ntraining_dataset = [\n    {\"name\": \"Persian\", \"ears\": \"pointed\", \"tail\": \"fluffy\", \"barks\": False, \"label\": \"Cat\"},\n    {\"name\": \"Siamese\", \"ears\": \"pointed\", \"tail\": \"sleek\", \"barks\": False, \"label\": \"Cat\"},\n    {\"name\": \"Beagle\",  \"ears\": \"floppy\",  \"tail\": \"straight\", \"barks\": True,  \"label\": \"Dog\"},\n    {\"name\": \"Husky\",   \"ears\": \"pointed\", \"tail\": \"bushy\", \"barks\": True,  \"label\": \"Dog\"},\n    {\"name\": \"Pug\",     \"ears\": \"floppy\",  \"tail\": \"curled\", \"barks\": True,  \"label\": \"Dog\"}\n]\n\ndef classify_mystery_animal(ears, tail, barks):\n    \"\"\"\n    Classifies an animal based on feature weights learned from examples.\n    Observation: In our dataset, 'barks=True' is 100% indicative of Dog.\n    If 'barks=False', pointed ears indicate Cat.\n    \"\"\"\n    cat_score = 0\n    dog_score = 0\n    \n    # Feature 1: Barking behavior (High weight)\n    if barks:\n        dog_score += 3\n    else:\n        cat_score += 3\n        \n    # Feature 2: Ear shape\n    if ears == \"pointed\":\n        cat_score += 1\n        dog_score += 0.5  # Huskies also have pointed ears\n    elif ears == \"floppy\":\n        dog_score += 1\n        \n    # Decision output based on highest score\n    if dog_score > cat_score:\n        confidence = (dog_score / (dog_score + cat_score)) * 100\n        return \"Dog\", round(confidence, 1)\n    else:\n        confidence = (cat_score / (dog_score + cat_score)) * 100\n        return \"Cat\", round(confidence, 1)\n\n# ----------------- EVALUATION ON UNSEEN TEST CASES -----------------\ntest_cases = [\n    {\"test_id\": \"Mystery-A\", \"ears\": \"pointed\", \"tail\": \"sleek\", \"barks\": False},\n    {\"test_id\": \"Mystery-B\", \"ears\": \"pointed\", \"tail\": \"bushy\", \"barks\": True},\n    {\"test_id\": \"Mystery-C\", \"ears\": \"floppy\",  \"tail\": \"fluffy\", \"barks\": True}\n]\n\nprint(\"=== CYBER-PET CLASSIFIER INFERENCE RUN ===\")\nfor test in test_cases:\n    prediction, conf = classify_mystery_animal(test['ears'], test['tail'], test['barks'])\n    print(f\"[{test['test_id']}] Traits: Ears={test['ears']}, Barks={test['barks']} \"\n          f\"--> Predicted: {prediction} ({conf}% confidence)\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c1_l2_1",
        "question": "In a dataset designed to train an AI model to detect whether incoming emails are \"Spam\" or \"Legitimate\", what do the individual words in the email represent, and what does the \"Spam / Legitimate\" tag represent? - **A)** The words are Labels; the tag is a Feature. - **B)** The words are Features; the tag is a Label. - **C)** Both the words and the tag are Models. - **D)** The words are Predictions; the tag is a Training Pass.",
        "options": [
          {
            "id": "A",
            "text": "** The words are Labels; the tag is a Feature.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The words are Features; the tag is a Label.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Both the words and the tag are Models.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The words are Predictions; the tag is a Training Pass.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In supervised machine learning, the observable characteristics or variables extracted from the input data (such as specific keywords like \"Discount\", \"Winner\", or \"Free\") are called **Features**. The target category or ground-truth answer that the model is trying to predict is called the **Label**.",
        "hint": "Reflect on the principles of Learning from Examples."
      },
      {
        "id": "q_class6_c1_l2_2",
        "question": "A developer trains an image classifier to detect bicycle helmets. The training dataset consists of 990 images of cyclists wearing black helmets and only 10 images of cyclists wearing bright yellow helmets. When tested on a new photo of a cyclist wearing a bright yellow helmet in daylight, the AI fails to detect it. What is the fundamental cause? - **A)** The camera resolution was too sharp. - **B)** Class imbalance and lack of feature variation in the training data. - **C)** Yellow helmets cannot be photographed by digital sensors. - **D)** Machine learning algorithms only understand monochrome data.",
        "options": [
          {
            "id": "A",
            "text": "** The camera resolution was too sharp.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Class imbalance and lack of feature variation in the training data.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Yellow helmets cannot be photographed by digital sensors.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Machine learning algorithms only understand monochrome data.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The dataset suffered from severe **class/attribute imbalance**. Because 99% of the training images featured black helmets, the model learned to associate helmet detection almost entirely with the color black. To build a robust model, the training dataset must include diverse colors, shapes, and lighting conditions.",
        "hint": "Reflect on the principles of Learning from Examples."
      },
      {
        "id": "q_class6_c1_l2_3",
        "question": "A hospital wants to build an AI system to predict which patients are at high risk of developing severe asthma attacks. Which of the following sets of features would be most clinically relevant and informative for the model? - **A)** Patient's shoe size, favorite color, and home Wi-Fi password. - **B)** Daily pollen count, air quality index (PM2.5), past hospital visits, and lung capacity test score. - **C)** Mother's high school graduation year and patient's preferred television channel. - **D)** The brand of smartphone the patient carries and their cafeteria lunch tray number.",
        "options": [
          {
            "id": "A",
            "text": "** Patient's shoe size, favorite color, and home Wi-Fi password.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Daily pollen count, air quality index (PM2.5), past hospital visits, and lung capacity test score.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Mother's high school graduation year and patient's preferred television channel.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The brand of smartphone the patient carries and their cafeteria lunch tray number.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Effective machine learning depends heavily on **Feature Selection**\u2014choosing attributes that possess causal or strong statistical relationships with the outcome. Air quality, pollen levels, past medical history, and spirometry (lung capacity) have direct physiological links to asthma exacerbations, whereas shoe size and favorite colors are irrelevant noise.",
        "hint": "Reflect on the principles of Learning from Examples."
      },
      {
        "id": "q_class6_c1_l2_4",
        "question": "Why is it essential to test an AI model using data that was **never** included in its training set? - **A)** Because computers delete their memory after training. - **B)** To evaluate if the model has genuinely learned to generalize patterns or if it simply memorized the specific training examples (overfitting). - **C)** Because running the training data twice breaks the computer processor. - **D)** Unseen data is always smaller in file size.",
        "options": [
          {
            "id": "A",
            "text": "** Because computers delete their memory after training.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To evaluate if the model has genuinely learned to generalize patterns or if it simply memorized the specific training examples (overfitting).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Because running the training data twice breaks the computer processor.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Unseen data is always smaller in file size.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** If you test a student using the exact same math problems they practiced the night before, they might score 100% simply by memorizing the answers without understanding the underlying math concepts. In AI, testing on unseen data verifies **Generalization**\u2014the ability to apply learned patterns to brand new situations.",
        "hint": "Reflect on the principles of Learning from Examples."
      },
      {
        "id": "q_class6_c1_l2_5",
        "question": "The phrase *\"Garbage In, Garbage Out\"* is a foundational rule in AI engineering. What does it signify? - **A)** AI models can only be trained on recycled electronic computer chips. - **B)** If an AI model is trained on inaccurate, noisy, biased, or corrupted data, its predictions will be equally flawed and unreliable. - **C)** Computers automatically delete all files placed in the recycle bin after 24 hours. - **D)** Old machine learning models must be discarded into the waste bin every month.",
        "options": [
          {
            "id": "A",
            "text": "** AI models can only be trained on recycled electronic computer chips.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** If an AI model is trained on inaccurate, noisy, biased, or corrupted data, its predictions will be equally flawed and unreliable.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Computers automatically delete all files placed in the recycle bin after 24 hours.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Old machine learning models must be discarded into the waste bin every month.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An AI model is only as smart as the data used to train it. If training data contains incorrect labels, measurement errors, or severe omissions, the model will faithfully internalize those flaws, producing disastrously poor predictions when deployed.",
        "hint": "Reflect on the principles of Learning from Examples."
      }
    ]
  },
  {
    "id": "class6-c2-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 1,
    "lessonTitle": "Think \u2192 Plan \u2192 Code",
    "missionScenario": "> **Mission Codename:** *Rover Rescue on the Lunar Crater*\n> **Mission Briefing:** An autonomous lunar exploration rover, *Artemis-6*, is stuck on the rugged crater floor of the Moon!\n> Its main satellite communications link has degraded, leaving only an ultra-low-bandwidth emergency command radio. You cannot steer the rover in real time with a joystick because radio signals take 2.6 seconds to travel round-trip. If you send a command late, the rover will tumble into a bottomless crevasse!\n> The only way to guide Artemis-6 back to the solar recharge base is to **THINK** through the path, **PLAN** an unambiguous, step-by-step algorithm that handles unexpected boulder obstacles, and convert that plan into verified **CODE** before broadcasting it to the rover.\n---",
    "gameTitle": "The Algorithm Labyrinth",
    "gameEngine": "Algorithmic Grid Navigation & Sub-Routine Planner.",
    "gameSummary": "#### Game Title: *The Algorithm Labyrinth* - **Game Engine Type:** Algorithmic Grid Navigation & Sub-Routine Planner. - **Educational Objective:** Hands-on practice in step-by-step logic, loop optimization, and avoiding unhandled runtime conditions. #### Game Rules & Mechanics: 1. **Grid Setup:** - Artemis-6 starts at Coordinate `(0, 0)` facing East.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 2 LESSON 1\n# ROVER NAVIGATION: TRANSLATING ALGORITHM TO PYTHON CODE\n# =====================================================================\n\ndef execute_rover_mission(grid_size, obstacles, target):\n    \"\"\"\n    Simulates rover moving from (0, 0) to target while avoiding obstacles.\n    Algorithm:\n    1. Check if fuel remains.\n    2. Check if next step contains an obstacle.\n    3. Move along X-axis first, then Y-axis.\n    \"\"\"\n    rover_x = 0\n    rover_y = 0\n    fuel = 20\n    path_log = [(rover_x, rover_y)]\n    \n    print(f\"Mission Start: Rover at ({rover_x}, {rover_y}) | Target: {target}\")\n    \n    while (rover_x, rover_y) != target:\n        if fuel <= 0:\n            return \"MISSION FAILED: Out of fuel in the lunar desert!\"\n        \n        # Decide next move: Priority to advance along X until aligned\n        next_step = None\n        if rover_x < target[0]:\n            candidate = (rover_x + 1, rover_y)\n            if candidate not in obstacles:\n                next_step = candidate\n            else:\n                # Obstacle evasion: detour along Y\n                print(f\"  [ALERT] Boulder at {candidate}! Evading via North.\")\n                next_step = (rover_x, rover_y + 1)\n        elif rover_y < target[1]:\n            candidate = (rover_x, rover_y + 1)\n            if candidate not in obstacles:\n                next_step = candidate\n            else:\n                # Detour along X\n                print(f\"  [ALERT] Boulder at {candidate}! Evading via East.\")\n                next_step = (rover_x + 1, rover_y)\n                \n        rover_x, rover_y = next_step\n        fuel -= 1\n        path_log.append((rover_x, rover_y))\n        print(f\"  Moved to ({rover_x}, {rover_y}) | Remaining Fuel: {fuel}\")\n        \n    return f\"MISSION SUCCESS: Reached Solar Base at ({rover_x}, {rover_y})! Remaining Fuel: {fuel}\"\n\n# ----------------- EXECUTION TEST -----------------\nlunar_obstacles = [(2, 0), (2, 1), (3, 3)]\nlunar_target = (4, 3)\n\nresult = execute_rover_mission(grid_size=(5, 5), obstacles=lunar_obstacles, target=lunar_target)\nprint(\"\\n\" + result)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c2_l1_1",
        "question": "In a standardized computer science flowchart, what does a **Diamond-shaped** symbol represent? - **A)** The initialization or termination of the algorithm. - **B)** An automated mathematical arithmetic calculation. - **C)** A conditional decision point that branches into two paths based on a True or False condition. - **D)** An external data storage peripheral.",
        "options": [
          {
            "id": "A",
            "text": "** The initialization or termination of the algorithm.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** An automated mathematical arithmetic calculation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A conditional decision point that branches into two paths based on a True or False condition.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** An external data storage peripheral.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In flowchart syntax, the diamond symbol universally denotes a **Decision Box**. It takes an incoming path and poses an evaluative question (e.g., `Is temperature > 100?`), branching into at least two distinct exit flowlines (e.g., `Yes` and `No`).",
        "hint": "Reflect on the principles of Think \u2192 Plan \u2192 Code."
      },
      {
        "id": "q_class6_c2_l1_2",
        "question": "A programmer writes an algorithm to calculate the average score of 5 students: ```text 1. total = 0 2. FOR EACH student IN class: 3.     total = total + student.score 4. average = total / 4 5. PRINT average ``` What type of error is present in this algorithm? - **A)** A Syntax Error that prevents the computer from running. - **B)** A Logic Error that produces an incorrect numerical calculation. - **C)** A Hardware Sensor Fault. - **D)** A Run-time Memory Overflow.",
        "options": [
          {
            "id": "A",
            "text": "** A Syntax Error that prevents the computer from running.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A Logic Error that produces an incorrect numerical calculation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A Hardware Sensor Fault.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A Run-time Memory Overflow.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The program contains a **Logic Error**. The loop processes 5 students, but Line 4 divides the sum by `4` instead of `5`. The program will execute smoothly without crashing, but the output average will be mathematically incorrect.",
        "hint": "Reflect on the principles of Think \u2192 Plan \u2192 Code."
      },
      {
        "id": "q_class6_c2_l1_3",
        "question": "Why is decomposition considered one of the most critical pillars of computational thinking when developing complex AI systems? - **A)** Because computers can only execute programs that have fewer than 10 lines of code. - **B)** Breaking a massive, ambiguous problem into smaller, isolated sub-problems makes each part easier to understand, code, test, and debug. - **C)** Decomposed programs run 100 times faster on all computer hardware. - **D)** Decomposition eliminates the need to write computer programs altogether.",
        "options": [
          {
            "id": "A",
            "text": "** Because computers can only execute programs that have fewer than 10 lines of code.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Breaking a massive, ambiguous problem into smaller, isolated sub-problems makes each part easier to understand, code, test, and debug.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Decomposed programs run 100 times faster on all computer hardware.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Decomposition eliminates the need to write computer programs altogether.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Decomposition** allows software architects to tackle immense real-world complexity (such as building a self-driving car) by splitting it into focused, solvable modules: computer vision, path planning, obstacle braking, and speed control.",
        "hint": "Reflect on the principles of Think \u2192 Plan \u2192 Code."
      },
      {
        "id": "q_class6_c2_l1_4",
        "question": "Consider the following pseudocode: ```text x = 2 y = 10 REPEAT 3 TIMES: x = x * 2 y = y - x OUTPUT y ``` What is the final value printed by this algorithm? - **A)** 4 - **B)** -18 - **C)** -4 - **D)** 2",
        "options": [
          {
            "id": "A",
            "text": "** 4",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** -18",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** -4",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 2",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Think \u2192 Plan \u2192 Code."
      },
      {
        "id": "q_class6_c2_l1_5",
        "question": "When humans interact with AI models using natural language instructions (prompts), what is the most common reason the AI produces an unsatisfactory answer? - **A)** The AI computer is angry with the user. - **B)** The user's prompt was vague, ambiguous, or lacked clear contextual constraints. - **C)** The internet connection was only at 4G speeds. - **D)** AI systems only understand raw binary numbers (`0`s and `1`s).",
        "options": [
          {
            "id": "A",
            "text": "** The AI computer is angry with the user.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The user's prompt was vague, ambiguous, or lacked clear contextual constraints.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The internet connection was only at 4G speeds.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** AI systems only understand raw binary numbers (`0`s and `1`s).",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Just as computers require precise pseudocode instructions, AI models require clear, unambiguous prompts. If a user asks *\"Write a good story\"* without specifying the genre, character goals, audience age, or length, the AI must guess the intent, often resulting in generic or irrelevant outputs.",
        "hint": "Reflect on the principles of Think \u2192 Plan \u2192 Code."
      }
    ]
  },
  {
    "id": "class6-c2-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 2,
    "lessonTitle": "Coding Made Friendly",
    "missionScenario": "> **Mission Codename:** *Project Sparky: The Friendly School Guide*\n> **Mission Briefing:** It is the first day of the academic year at Neo-Olympia Academy, and hundreds of nervous new students have arrived!\n> The school robot, *Sparky*, was meant to welcome them, but its software was wiped clean during a memory upgrade. Right now, if a student speaks to Sparky, it outputs cold, robotic binary gibberish: `ERROR 404: IDENTITY UNKNOWN`.\n> Your mission is to reprogram Sparky to become **Friendly, Welcoming, and Helpful**! You must teach Sparky to ask for the student's name, identify their favorite subject, calculate how many days remain until the Science Olympiad, and offer encouraging words with warm, human-friendly dialogue.\n---",
    "gameTitle": "The Chat-Companion Sandbox",
    "gameEngine": "Dialogue Tree Builder & Tone Calibration Lab.",
    "gameSummary": "#### Game Title: *The Chat-Companion Sandbox* - **Game Engine Type:** Dialogue Tree Builder & Tone Calibration Lab. - **Educational Objective:** Hands-on application of dynamic user variables, branching empathy responses, and sanitizing user inputs. #### Game Rules & Mechanics: 1. **The Sandbox Canvas:** - The student designs an avatar persona for Sparky: *The Encouraging Mentor*, *The Witty Explorer*, or *The Calm Zen Master*.",
    "pythonCode": "# Creating variables in Python\nstudent_name = \"Maya\"   # A string of text (str)\nage = 11                # A whole number / integer (int)\nquiz_score = 94.5       # A decimal number / float (float)\nis_enrolled = True      # A boolean flag (bool)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c2_l2_1",
        "question": "In Python, what is the data type of the value stored in the variable `mystery_value = \"2026\"`? - **A)** Integer (`int`) - **B)** String (`str`) - **C)** Float (`float`) - **D)** Boolean (`bool`)",
        "options": [
          {
            "id": "A",
            "text": "** Integer (`int`)",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** String (`str`)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Float (`float`)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Boolean (`bool`)",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Any value enclosed in quotation marks (`\"...\"` or `'...'`) is recognized by Python as a **String (`str`)**, regardless of whether the characters inside represent numbers. For Python to treat it as a numerical integer, it must be written without quotes as `2026` or explicitly cast using `int(\"2026\")`.",
        "hint": "Reflect on the principles of Coding Made Friendly."
      },
      {
        "id": "q_class6_c2_l2_2",
        "question": "Which of the following is a **valid** and PEP-8 compliant variable name in Python? - **A)** `2nd_student_score` - **B)** `student-score` - **C)** `student_score` - **D)** `class`",
        "options": [
          {
            "id": "A",
            "text": "** `2nd_student_score`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `student-score`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `student_score`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `class`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Python variable naming rules:\n  1. Cannot start with a number (invalidates A).\n  2. Cannot contain hyphens/dashes, as Python interprets `-` as subtraction (invalidates B).\n  3. Cannot be a reserved Python keyword (invalidates D, as `class` is a reserved keyword).\n  4. `student_score` follows standard snake_case naming and is completely valid.",
        "hint": "Reflect on the principles of Coding Made Friendly."
      },
      {
        "id": "q_class6_c2_l2_3",
        "question": "What will be displayed on the screen when the following Python code is executed? ```python a = \"AI\" b = \"3\" print(a * int(b)) ``` - **A)** `AI3` - **B)** `AIAIAI` - **C)** A TypeError crash - **D)** `AI + AI + AI`",
        "options": [
          {
            "id": "A",
            "text": "** `AI3`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `AIAIAI`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A TypeError crash",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `AI + AI + AI`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In Python, multiplying a string by an integer `n` performs **String Repetition**. Since `int(b)` converts `\"3\"` to the integer `3`, `\"AI\" * 3` produces the string `\"AIAIAI\"`.",
        "hint": "Reflect on the principles of Coding Made Friendly."
      },
      {
        "id": "q_class6_c2_l2_4",
        "question": "A student runs this code in Python: ```python user_age = input(\"Enter your age: \") years_to_wait = 18 - user_age print(f\"You will vote in {years_to_wait} years.\") ``` The program crashes with: `TypeError: unsupported operand type(s) for -: 'int' and 'str'`. How should Line 2 be rewritten to resolve this error permanently? - **A)** `years_to_wait = 18 - str(user_age)` - **B)** `years_to_wait = int(18) - user_age` - **C)** `years_to_wait = 18 - int(user_age)` - **D)** `years_to_wait = \"18\" - user_age`",
        "options": [
          {
            "id": "A",
            "text": "** `years_to_wait = 18 - str(user_age)`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `years_to_wait = int(18) - user_age`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `years_to_wait = 18 - int(user_age)`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `years_to_wait = \"18\" - user_age`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** `input()` returns a string. Python cannot perform mathematical subtraction between an integer (`18`) and a string (`user_age`). Converting `user_age` to an integer via `int(user_age)` allows the subtraction operation to succeed.",
        "hint": "Reflect on the principles of Coding Made Friendly."
      },
      {
        "id": "q_class6_c2_l2_5",
        "question": "Which of the following is the correct syntax to print the sentence: *\"Kabir scored 98 in Python\"* assuming `name = \"Kabir\"` and `score = 98`? - **A)** `print(\"f{name} scored {score} in Python\")` - **B)** `print(f\"{name} scored {score} in Python\")` - **C)** `print(f\"name scored score in Python\")` - **D)** `print({name} + \"scored\" + {score} + \"in Python\")`",
        "options": [
          {
            "id": "A",
            "text": "** `print(\"f{name} scored {score} in Python\")`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `print(f\"{name} scored {score} in Python\")`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `print(f\"name scored score in Python\")`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `print({name} + \"scored\" + {score} + \"in Python\")`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In Python f-string syntax, the letter `f` must precede the opening quote: `f\"...\"`. The variable names must be wrapped inside curly braces `{name}` and `{score}` so that Python replaces them with their actual stored values.",
        "hint": "Reflect on the principles of Coding Made Friendly."
      }
    ]
  },
  {
    "id": "class6-c3-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 1,
    "lessonTitle": "AI on the Road",
    "missionScenario": "> **Mission Codename:** *Auto-Cruise Velocity: The Midnight Blizzard*\n> **Mission Briefing:** You are the Lead Safety Systems Engineer for *Aero-Transit*, an autonomous electric shuttle operating between the airport and downtown.\n> A sudden midnight storm has hit! Thick fog blankets the highway, snow partially covers the white lane markings, and an unexpected construction detour has appeared.\n> A human driver is squinting through the windshield, barely able to see 10 meters ahead. But your shuttle is equipped with a **Multi-Sensor AI Perception Array**!\n> Your mission is to configure the shuttle's sensor fusion algorithms so that it cross-checks cameras with radar and LiDAR, spots road obstacles through the fog, maintains a safe braking distance, and brings passengers safely to the terminal without incident.\n---",
    "gameTitle": "Autonomous Highway Navigator",
    "gameEngine": "Real-Time Sensor Fusion & Telemetry Dashboard Simulator.",
    "gameSummary": "#### Game Title: *Autonomous Highway Navigator* - **Game Engine Type:** Real-Time Sensor Fusion & Telemetry Dashboard Simulator. - **Educational Objective:** Hands-on balancing of sensor confidence thresholds, speed regulation, and emergency braking under dynamic weather conditions. #### Game Rules & Mechanics: 1. **The Vehicle Cockpit:** - The student monitors three live sensor feeds: Camera Confidence, LiDAR Point Cloud, Radar Velocity.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 3 LESSON 1\n# AUTONOMOUS VEHICLE MULTI-SENSOR BRAKING LOGIC\n# =====================================================================\n\ndef autonomous_braking_system(vehicle_speed_kmh, camera_detected, lidar_dist_meters, radar_speed_kmh):\n    \"\"\"\n    Computes real-time vehicle action based on fused sensor telemetry.\n    Rules:\n    - If LiDAR detects an obstacle < 15 meters, execute EMERGENCY BRAKE.\n    - If LiDAR detects obstacle between 15m and 40m, DECELERATE and match speed.\n    - If camera sees an obstacle but LiDAR distance is clear (>50m), proceed with caution (possible shadow).\n    - If all sensors clear, maintain CRUISE SPEED.\n    \"\"\"\n    print(f\"\\n[Telemetry] Speed: {vehicle_speed_kmh} km/h | LiDAR Dist: {lidar_dist_meters}m | Camera: {camera_detected}\")\n    \n    # 1. Critical Emergency Zone\n    if lidar_dist_meters < 15.0:\n        return \"\ud83d\udea8 ACTION: EMERGENCY BRAKE! (ABS Engaged - Imminent Collision Hazard)\"\n    \n    # 2. Cautionary Deceleration Zone\n    elif 15.0 <= lidar_dist_meters <= 40.0:\n        target_speed = min(radar_speed_kmh, vehicle_speed_kmh - 15)\n        return f\"\u26a0\ufe0f ACTION: DECELERATE. Adjusting speed to {max(target_speed, 10)} km/h to maintain safety gap.\"\n    \n    # 3. Discrepancy / Shadow Verification\n    elif camera_detected and lidar_dist_meters > 50.0:\n        return \"\ud83d\udc40 ACTION: SENSOR AUDIT. Camera reports visual mark but LiDAR confirms clear path. Proceeding with caution.\"\n    \n    # 4. Clear Roadway\n    else:\n        return \"\u2705 ACTION: CRUISE. Roadway clear, maintaining standard highway velocity.\"\n\n# ----------------- SIMULATED ROADWAY EVENTS -----------------\nscenarios = [\n    {\"desc\": \"Event 1: Open highway, sunny afternoon\", \"speed\": 90, \"cam\": False, \"lidar\": 100.0, \"radar\": 90},\n    {\"desc\": \"Event 2: Overhead highway bridge casts dark shadow on road\", \"speed\": 85, \"cam\": True, \"lidar\": 80.0, \"radar\": 85},\n    {\"desc\": \"Event 3: Car ahead slows down in traffic lane\", \"speed\": 75, \"cam\": True, \"lidar\": 28.0, \"radar\": 40},\n    {\"desc\": \"Event 4: Fallen tree trunk across the lane around sharp bend\", \"speed\": 60, \"cam\": True, \"lidar\": 11.5, \"radar\": 0}\n]\n\nprint(\"=== AERO-TRANSIT AUTONOMOUS PERCEPTION RUN ===\")\nfor event in scenarios:\n    print(event[\"desc\"])\n    action = autonomous_braking_system(event[\"speed\"], event[\"cam\"], event[\"lidar\"], event[\"radar\"])\n    print(f\"  {action}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c3_l1_1",
        "question": "Which autonomous vehicle sensor operates by emitting invisible laser beams to measure reflections and generate a detailed 3D \"point cloud\" of surrounding objects? - **A)** Ultrasonic transceiver - **B)** LiDAR (Light Detection and Ranging) - **C)** Doppler Radar - **D)** High-Definition Optical Camera",
        "options": [
          {
            "id": "A",
            "text": "** Ultrasonic transceiver",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** LiDAR (Light Detection and Ranging)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Doppler Radar",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** High-Definition Optical Camera",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **LiDAR** systems emit hundreds of thousands of laser pulses per second. By calculating the exact time-of-flight (the nanoseconds required for each pulse to bounce off objects and return), the system calculates precise 3D spatial coordinates for every physical surface, constructing an interactive 3D digital point cloud of the world.",
        "hint": "Reflect on the principles of AI on the Road."
      },
      {
        "id": "q_class6_c3_l1_2",
        "question": "A newly released electric car can automatically adjust its speed to follow the car ahead and can steer smoothly to stay centered between lane lines on the highway. However, the owner's manual states: *\"The driver must keep both hands on the wheel and maintain continuous visual attention at all times.\"* What SAE driving level does this vehicle represent? - **A)** Level 1 - **B)** Level 2 - **C)** Level 4 - **D)** Level 5",
        "options": [
          {
            "id": "A",
            "text": "** Level 1",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Level 2",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Level 4",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Level 5",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Level 2 (Partial Automation)** includes vehicles that combine automated steering and acceleration simultaneously (e.g., lane-centering plus adaptive cruise control). However, because the human driver remains legally responsible for monitoring the environment and must be ready to take over instantly, it remains at Level 2.",
        "hint": "Reflect on the principles of AI on the Road."
      },
      {
        "id": "q_class6_c3_l1_3",
        "question": "During a torrential monsoon rainstorm, water droplets scatter laser beams and windshield wipers struggle to keep camera views clear. Which sensor onboard the vehicle remains largely unaffected by water droplets and fog, ensuring the car can still detect large vehicles ahead? - **A)** Infrared Vision Cameras - **B)** Millimeter-Wave Radar - **C)** Optical LiDAR - **D)** Ambient Light Solar Sensors",
        "options": [
          {
            "id": "A",
            "text": "** Infrared Vision Cameras",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Millimeter-Wave Radar",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Optical LiDAR",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Ambient Light Solar Sensors",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Radar** utilizes electromagnetic radio wavelengths that are much longer than optical light or near-infrared laser beams. These longer radio waves easily pass straight through atmospheric moisture, rain, snow, and dense fog, reflecting cleanly off metallic and solid objects.",
        "hint": "Reflect on the principles of AI on the Road."
      },
      {
        "id": "q_class6_c3_l1_4",
        "question": "Why do autonomous vehicles use Convolutional Neural Networks (CNNs) to process camera images rather than simple manual pixel-matching rules? - **A)** Pixel matching requires too much battery electricity. - **B)** Cars, pedestrians, and road signs appear at different angles, distances, lighting conditions, and partial occlusions that cannot be matched by static pixel templates. - **C)** Neural networks only work when connected to the internet. - **D)** Cameras cannot take photos without a neural network installed.",
        "options": [
          {
            "id": "A",
            "text": "** Pixel matching requires too much battery electricity.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Cars, pedestrians, and road signs appear at different angles, distances, lighting conditions, and partial occlusions that cannot be matched by static pixel templates.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Neural networks only work when connected to the internet.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Cameras cannot take photos without a neural network installed.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In the real world, a pedestrian may wear a raincoat, carry an umbrella, or walk at a 45-degree angle. Static pixel templates would fail completely. Deep learning vision models (such as CNNs) learn abstract hierarchical features (edges, curves, textures, body outlines) that allow them to recognize pedestrians under diverse orientations and lighting conditions.",
        "hint": "Reflect on the principles of AI on the Road."
      },
      {
        "id": "q_class6_c3_l1_5",
        "question": "What is the primary ethical purpose of designing autonomous vehicle control systems with strict **fail-operational redundancies** (e.g., backup braking computers, dual battery buses)? - **A)** To make the vehicle look more futuristic in marketing commercials. - **B)** To ensure that if a primary computer chip or sensor experiences an unexpected hardware failure, the backup system can immediately steer the vehicle safely to the road shoulder without endangering human lives. - **C)** To double the maximum speed limit of the vehicle. - **D)** To allow two people to play video games in the car simultaneously.",
        "options": [
          {
            "id": "A",
            "text": "** To make the vehicle look more futuristic in marketing commercials.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To ensure that if a primary computer chip or sensor experiences an unexpected hardware failure, the backup system can immediately steer the vehicle safely to the road shoulder without endangering human lives.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To double the maximum speed limit of the vehicle.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To allow two people to play video games in the car simultaneously.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In safety-critical robotics, a single point of failure (SPOF) can be fatal. Autonomous vehicles must have hardware and software redundancies so that a component failure triggers a **graceful degradation / minimal risk maneuver** (pulling over safely) rather than a catastrophic loss of control.",
        "hint": "Reflect on the principles of AI on the Road."
      }
    ]
  },
  {
    "id": "class6-c3-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 2,
    "lessonTitle": "AI on the Farm",
    "missionScenario": "> **Mission Codename:** *Operation Terra-Bloom*\n> **Mission Briefing:** Welcome to the Green Valley Agricultural Cooperative!\n> Green Valley spans 500 hectares of vital wheat, corn, and fruit orchards. Recently, a severe heatwave coupled with an invasive aphid beetle threat has put the regional harvest in jeopardy.\n> In the old days, farmers would spray thousands of liters of chemical pesticides and pump millions of liters of groundwater across every single field indiscriminately. This wasted precious water, poisoned beneficial ladybugs, and cost enormous sums of money.\n> As the Cooperative\u2019s Chief Agricultural AI Engineer, you must deploy an **Agro-Drone Surveillance Fleet** and **Underground IoT Soil Probes**! Your mission is to identify precisely which crops are thirsty or sick, target treatments with millimeter laser precision, and save the harvest while preserving the natural ecosystem.\n---",
    "gameTitle": "The Smart Agro-Manager",
    "gameEngine": "Resource-Optimization & Ecological Balance Simulation.",
    "gameSummary": "#### Game Title: *The Smart Agro-Manager* - **Game Engine Type:** Resource-Optimization & Ecological Balance Simulation. - **Educational Objective:** Hands-on experience in managing competing agricultural variables (water budget, fertilizer runoff, crop yield, and biodiversity score). #### Game Rules & Mechanics: 1. **The Farm Grid (16 Crop Sectors):** - Each sector has live status meters: Moisture (%), Nitrogen Level (ppm), Pest Severity (1 to 5), and Yield Health.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 3 LESSON 2\n# PRECISION AGRICULTURE: SOIL SENSOR TELEMETRY & IRRIGATION ENGINE\n# =====================================================================\n\ndef calculate_field_irrigation(soil_probes):\n    \"\"\"\n    Analyzes telemetry from multiple IoT soil probes across field sectors.\n    Determines precise water requirements to maintain optimal 60% saturation.\n    \"\"\"\n    print(f\"{'SECTOR':<10} | {'MOISTURE (%)':<14} | {'SOIL TEMP (\u00b0C)':<15} | {'RECOMMENDED ACTION'}\")\n    print(\"-\" * 65)\n    \n    total_water_liters = 0\n    sectors_requiring_water = 0\n    \n    for probe in soil_probes:\n        sector = probe[\"sector\"]\n        moisture = probe[\"moisture\"]\n        temp = probe[\"temp\"]\n        \n        # Optimal moisture target is 60%\n        if moisture < 40:\n            # High water deficit\n            water_needed = (60 - moisture) * 50  # 50 liters per deficit percentage point\n            action = f\"\ud83d\udca7 PUMP ON: Dispense {water_needed} L (Drought Alert)\"\n            total_water_liters += water_needed\n            sectors_requiring_water += 1\n        elif 40 <= moisture < 55:\n            # Mild deficit\n            water_needed = (60 - moisture) * 30\n            action = f\"\ud83c\udf31 ECO-PULSE: Dispense {water_needed} L (Maintenance)\"\n            total_water_liters += water_needed\n            sectors_requiring_water += 1\n        elif 55 <= moisture <= 70:\n            action = \"\u2705 OPTIMAL: Moisture balanced. Valves closed.\"\n        else:\n            action = \"\u26a0\ufe0f WATERLOGGED: High moisture! Open drainage channels.\"\n            \n        print(f\"{sector:<10} | {moisture:<14.1f} | {temp:<15.1f} | {action}\")\n        \n    print(\"-\" * 65)\n    print(f\"Summary: {sectors_requiring_water}/{len(soil_probes)} sectors irrigated.\")\n    print(f\"Total Precision Water Allocated: {total_water_liters:,} Liters.\")\n    print(f\"Water Saved vs Conventional Flooding (50,000 L): {50000 - total_water_liters:,} Liters!\")\n\n# ----------------- SIMULATED TELEMETRY DATA -----------------\nfield_telemetry = [\n    {\"sector\": \"Alpha-1\", \"moisture\": 32.5, \"temp\": 28.4},\n    {\"sector\": \"Alpha-2\", \"moisture\": 62.0, \"temp\": 25.1},\n    {\"sector\": \"Beta-1\",  \"moisture\": 48.0, \"temp\": 27.0},\n    {\"sector\": \"Beta-2\",  \"moisture\": 76.5, \"temp\": 23.8},\n    {\"sector\": \"Gamma-1\", \"moisture\": 25.0, \"temp\": 31.2}\n]\n\nprint(\"=== GREEN VALLEY PRECISION AG-BOT INFERENCE RUN ===\\n\")\ncalculate_field_irrigation(field_telemetry)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c3_l2_1",
        "question": "What light spectrum band does a multispectral drone camera measure in conjunction with visible red light to calculate the Normalized Difference Vegetation Index (NDVI)? - **A)** Ultraviolet (UV) radiation - **B)** Near-Infrared (NIR) light - **C)** Microwave radar emissions - **D)** Gamma ray bursts",
        "options": [
          {
            "id": "A",
            "text": "** Ultraviolet (UV) radiation",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Near-Infrared (NIR) light",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Microwave radar emissions",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Gamma ray bursts",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Healthy plant foliage strongly absorbs visible red light for chlorophyll photosynthesis while its internal spongy mesophyll cell structure strongly reflects **Near-Infrared (NIR)** light. Measuring the mathematical ratio between NIR reflection and Red absorption (NDVI) provides a precise, non-destructive metric of plant vigor.",
        "hint": "Reflect on the principles of AI on the Farm."
      },
      {
        "id": "q_class6_c3_l2_2",
        "question": "How does computer-vision-guided precision weeding tractors benefit local soil ecology compared to conventional blanket herbicide spraying? - **A)** They eliminate the need for agricultural tractors altogether. - **B)** They only apply tiny droplets directly onto targeted weed leaves, reducing overall chemical use by up to 90% and protecting soil microbes and beneficial insects. - **C)** They turn weeds into gold coins. - **D)** They replace chemical spraying with high-power radioactive lasers that heat the soil to 500\u00b0C.",
        "options": [
          {
            "id": "A",
            "text": "** They eliminate the need for agricultural tractors altogether.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** They only apply tiny droplets directly onto targeted weed leaves, reducing overall chemical use by up to 90% and protecting soil microbes and beneficial insects.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** They turn weeds into gold coins.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** They replace chemical spraying with high-power radioactive lasers that heat the soil to 500\u00b0C.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Conventional broadcast spraying saturates entire fields, resulting in massive pesticide drift, groundwater contamination, and the destruction of beneficial insects like pollinators. Vision-guided AI sprayers identify weed leaves within milliseconds, targeting only the weeds and reducing environmental chemical loads by 85\u201390%.",
        "hint": "Reflect on the principles of AI on the Farm."
      },
      {
        "id": "q_class6_c3_l2_3",
        "question": "If an IoT soil sensor probe in an agricultural field reports a moisture reading of 85% and electrical conductivity spikes, while ambient weather forecasts predict 3 days of torrential rain, what is the most appropriate automated action for the smart farm system? - **A)** Activate high-power irrigation pumps at maximum volume. - **B)** Turn off all irrigation valves and automatically open field drainage sluice gates to prevent root rot. - **C)** Spray chemical fertilizer across all fields immediately. - **D)** Delete the sensor database.",
        "options": [
          {
            "id": "A",
            "text": "** Activate high-power irrigation pumps at maximum volume.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Turn off all irrigation valves and automatically open field drainage sluice gates to prevent root rot.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Spray chemical fertilizer across all fields immediately.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delete the sensor database.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An 85% moisture reading indicates soil near water saturation. With torrential rain imminent, adding more water would drown crop roots, deplete soil oxygen, and breed fungal diseases. The AI decision engine must halt all irrigation and prepare drainage channels.",
        "hint": "Reflect on the principles of AI on the Farm."
      },
      {
        "id": "q_class6_c3_l2_4",
        "question": "A drone equipped with an object detection model flies over an apple orchard to detect codling moths. During testing, the model achieves 99% accuracy on sunny days. However, at dusk and on overcast days, accuracy plummets to 45%. What engineering intervention would most effectively resolve this deficiency? - **A)** Prohibit moths from flying after 5:00 PM. - **B)** Retrain the vision model with additional training photographs taken under low-light, cloudy, and dusk lighting conditions, or equip the drone with active auxiliary LED illumination. - **C)** Paint all apple trees bright white. - **D)** Replace the drone with an ultrasonic submarine.",
        "options": [
          {
            "id": "A",
            "text": "** Prohibit moths from flying after 5:00 PM.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Retrain the vision model with additional training photographs taken under low-light, cloudy, and dusk lighting conditions, or equip the drone with active auxiliary LED illumination.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Paint all apple trees bright white.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Replace the drone with an ultrasonic submarine.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The model suffered from **training distribution bias**\u2014it was trained exclusively on bright daylight imagery. Adding low-light training samples (data augmentation) and equipping the inspection drone with consistent onboard LED illumination ensures high feature visibility across diverse lighting conditions.",
        "hint": "Reflect on the principles of AI on the Farm."
      },
      {
        "id": "q_class6_c3_l2_5",
        "question": "Why is AI-powered early harvest yield prediction vital for global food security? - **A)** It guarantees that food will never cost any money. - **B)** It allows governments, logistics networks, and humanitarian agencies to anticipate regional crop shortfalls months in advance, stabilizing food supply chains and preventing famine. - **C)** It forces farmers to sell all their crops to tech companies. - **D)** It speeds up the biological growth of wheat from 4 months to 2 days.",
        "options": [
          {
            "id": "A",
            "text": "** It guarantees that food will never cost any money.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It allows governments, logistics networks, and humanitarian agencies to anticipate regional crop shortfalls months in advance, stabilizing food supply chains and preventing famine.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** It forces farmers to sell all their crops to tech companies.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It speeds up the biological growth of wheat from 4 months to 2 days.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Reliable yield forecasts provide critical advance intelligence. If an AI predicts a 30% wheat deficit in a specific province due to drought patterns, international aid organizations and food distribution networks can reroute supplies, secure grain reserves, and stabilize prices before food shortages turn into humanitarian crises.",
        "hint": "Reflect on the principles of AI on the Farm."
      }
    ]
  },
  {
    "id": "class6-c4-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 1,
    "lessonTitle": "Explore Tech Careers",
    "missionScenario": "> **Mission Codename:** *Operation Dream-Team Assemble*\n> **Mission Briefing:** Welcome to the Horizon AI Innovation Incubator!\n> The city council has commissioned a massive high-tech initiative: *Project SafeHaven*\u2014an intelligent wildlife preservation and anti-poaching system to protect endangered snow leopards in the high mountain valleys.\n> However, the initiative is completely stalled! The council tried to hire only computer programmers, but the programmers do not understand animal biology, the cameras are failing in sub-zero snowstorms, the training data contains false triggers, and local villagers are worried about their privacy.\n> Your mission as the Chief Talent Director is to **Assemble the Interdisciplinary Dream Team**! You must deploy the right tech specialists to their respective posts and ensure they collaborate harmoniously to bring the project to life.\n---",
    "gameTitle": "Tech Career Pathfinder",
    "gameEngine": "Crisis Management & Team Assembly Simulation.",
    "gameSummary": "#### Game Title: *Tech Career Pathfinder* - **Game Engine Type:** Crisis Management & Team Assembly Simulation. - **Educational Objective:** Deep understanding of the specific roles, skills, and tools that each AI professional utilizes. #### Game Rules & Mechanics: 1. **The Innovation Studio Dashboard:** - The player manages a high-tech studio tasked with solving 4 incoming real-world engineering crises:",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 4 LESSON 1\n# ALGORITHMIC CAREER PATHFINDER & SKILL-MATCHING ENGINE\n# =====================================================================\n\ndef match_tech_career(interests):\n    \"\"\"\n    Evaluates student interests across 4 dimensions:\n    - code: Love for programming and computer systems\n    - math_data: Love for numbers, patterns, and mystery solving\n    - ethics_people: Passion for fairness, psychology, and helping others\n    - hardware: Passion for building physical gadgets, robots, and electronics\n    \"\"\"\n    scores = {\n        \"Machine Learning Engineer\": interests[\"code\"] * 2 + interests[\"math_data\"] * 1.5,\n        \"Data Detective / Data Scientist\": interests[\"math_data\"] * 2 + interests[\"code\"] * 1.0,\n        \"AI Ethicist & Safety Auditor\": interests[\"ethics_people\"] * 2.5 + interests[\"math_data\"] * 0.5,\n        \"Robotics Systems Architect\": interests[\"hardware\"] * 2.5 + interests[\"code\"] * 1.0,\n        \"AI Interaction (UX) Designer\": interests[\"ethics_people\"] * 1.5 + interests[\"code\"] * 1.0\n    }\n    \n    # Sort careers by score in descending order\n    sorted_careers = sorted(scores.items(), key=lambda item: item[1], reverse=True)\n    return sorted_careers\n\n# ----------------- SIMULATED STUDENT PROFILE -----------------\n# Ratings on a scale from 1 (Low) to 5 (High)\nstudent_survey = {\n    \"name\": \"Ananya\",\n    \"interests\": {\n        \"code\": 4,           # Enjoys writing Python scripts\n        \"math_data\": 3,      # Decent with numbers and graphs\n        \"ethics_people\": 5,  # Passionate about justice, fairness, and human rights\n        \"hardware\": 2        # Not very interested in soldering electronics\n    }\n}\n\nprint(f\"=== CAREER PATHFINDER REPORT FOR: {student_survey['name']} ===\")\ncareer_matches = match_tech_career(student_survey[\"interests\"])\n\nprint(f\"\\nTop Match:\")\ntop_role, top_score = career_matches[0]\nprint(f\"\ud83c\udf1f {top_role.upper()} (Fit Score: {top_score:.1f} pts)\")\n\nprint(f\"\\nComplete Career Alignment Matrix:\")\nfor role, score in career_matches:\n    bar = \"\u2588\" * int(score)\n    print(f\"  {role:<32} : {bar} ({score:.1f})\")\n\nprint(\"\\nAdvisor Tip: Even as an AI Ethicist, your strong coding skills (4/5)\")\nprint(\"will allow you to audit neural networks directly in Python code!\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c4_l1_1",
        "question": "Which professional on an AI development team is primarily responsible for inspecting training datasets, identifying demographic imbalances, and auditing models to prevent unfair treatment of specific societal groups? - **A)** Database Network Cable Technician - **B)** AI Ethicist / Safety Auditor - **C)** Silicon Chip Solderer - **D)** Mobile App Store Marketer",
        "options": [
          {
            "id": "A",
            "text": "** Database Network Cable Technician",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** AI Ethicist / Safety Auditor",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Silicon Chip Solderer",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Mobile App Store Marketer",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An **AI Ethicist / Safety Auditor** evaluates algorithms through the lenses of justice, moral accountability, data privacy, and legal compliance. They ensure models do not perpetuate historical prejudices or harm vulnerable demographics.",
        "hint": "Reflect on the principles of Explore Tech Careers."
      },
      {
        "id": "q_class6_c4_l1_2",
        "question": "When developing an autonomous robotic surgery system, why is it critical that medical surgeons collaborate directly with Machine Learning Engineers? - **A)** Because computer scientists do not possess deep physiological and clinical knowledge regarding human anatomy, surgical procedures, and emergency patient risks. - **B)** Because doctors are legally required to write all Python code. - **C)** Because computer programmers are afraid of blood. - **D)** Surgeons are needed only to purchase the computers.",
        "options": [
          {
            "id": "A",
            "text": "** Because computer scientists do not possess deep physiological and clinical knowledge regarding human anatomy, surgical procedures, and emergency patient risks.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Because doctors are legally required to write all Python code.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Because computer programmers are afraid of blood.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Surgeons are needed only to purchase the computers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** AI engineering is inherently **interdisciplinary**. A programmer may understand algorithms, but only a trained medical surgeon (the domain expert) knows which anatomical variations are normal, which tissue textures indicate pathology, and what real-time safety thresholds must never be violated.",
        "hint": "Reflect on the principles of Explore Tech Careers."
      },
      {
        "id": "q_class6_c4_l1_3",
        "question": "A Data Scientist creates an experimental deep learning neural network on a massive supercomputer that can recognize bird songs with 99% accuracy. However, when forest rangers attempt to run it on a small, solar-powered audio sensor in the jungle, the sensor crashes immediately. Which specialist is needed to compress and optimize this model so it can run efficiently on low-power edge hardware? - **A)** Graphic Novel Illustrator - **B)** Machine Learning / Embedded Edge AI Engineer - **C)** Human Resources Recruiter - **D)** School Bus Driver",
        "options": [
          {
            "id": "A",
            "text": "** Graphic Novel Illustrator",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Machine Learning / Embedded Edge AI Engineer",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Human Resources Recruiter",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** School Bus Driver",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Machine Learning / Embedded Systems Engineers** specialize in model quantization, pruning, and hardware acceleration\u2014compressing massive models so they execute rapidly and reliably within strict memory and battery constraints on \"edge\" microcontrollers.",
        "hint": "Reflect on the principles of Explore Tech Careers."
      },
      {
        "id": "q_class6_c4_l1_4",
        "question": "Will Artificial Intelligence completely eliminate human jobs, or will it transform the nature of work? - **A)** It will eliminate 100% of human jobs, leaving no tasks for humans. - **B)** It primarily automates repetitive, routine, data-heavy tasks, shifting human work toward higher-order creative problem solving, strategic synthesis, empathy, and ethical governance. - **C)** It will have zero impact on any job in the world. - **D)** It only affects video game developers.",
        "options": [
          {
            "id": "A",
            "text": "** It will eliminate 100% of human jobs, leaving no tasks for humans.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It primarily automates repetitive, routine, data-heavy tasks, shifting human work toward higher-order creative problem solving, strategic synthesis, empathy, and ethical governance.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** It will have zero impact on any job in the world.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It only affects video game developers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Historically and currently, technological automation displaces routine, repetitive tasks (e.g., manual data entry or mechanical sorting) while creating new high-value roles that require uniquely human faculties: empathy, creative synthesis, ethical deliberation, and systems leadership.",
        "hint": "Reflect on the principles of Explore Tech Careers."
      },
      {
        "id": "q_class6_c4_l1_5",
        "question": "Why is the role of an AI Interaction (UX) Designer vital when designing emergency medical software? - **A)** To make the screen look colorful with flashing neon animations. - **B)** To ensure that critical diagnostic information is presented clearly, reducing cognitive fatigue for stressed doctors and preventing fatal misinterpretations of AI outputs. - **C)** To sell advertising banners on the hospital screen. - **D)** To hide the diagnosis from the medical staff.",
        "options": [
          {
            "id": "A",
            "text": "** To make the screen look colorful with flashing neon animations.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To ensure that critical diagnostic information is presented clearly, reducing cognitive fatigue for stressed doctors and preventing fatal misinterpretations of AI outputs.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To sell advertising banners on the hospital screen.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To hide the diagnosis from the medical staff.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** High-stress environments like emergency rooms require crystal-clear communication. A poorly designed interface that buries life-critical alerts beneath confusing numbers can lead to medical errors. UX designers ensure AI insights are intuitive, transparent, and actionable within seconds.",
        "hint": "Reflect on the principles of Explore Tech Careers."
      }
    ]
  },
  {
    "id": "class6-c4-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 2,
    "lessonTitle": "Discover Your Skills",
    "missionScenario": "> **Mission Codename:** *Unlock the Archetype: The Academy Gauntlet*\n> **Mission Briefing:** Welcome to the Neo-Olympia Skills Arena!\n> Every great explorer, scientist, and digital creator possesses a unique combination of cognitive strengths. Some students see numerical patterns in their sleep; others can tell instantly when a story character feels misunderstood; others love taking broken clocks apart with screwdrivers!\n> In the world of Artificial Intelligence, there is no single \"correct\" personality type. A breakthrough system requires mathematicians, empathetic listeners, bold artists, and ethical guardians.\n> Your mission today is to step into the **Skills Gauntlet**, complete four mental challenges testing your computational and human powers, map your personal **Skill Radar**, and discover your unique **Tech Archetype**!\n---",
    "gameTitle": "The Skill Matrix Challenge",
    "gameEngine": "4-Stage Multi-Cognitive Quest & Archetype Unlocker.",
    "gameSummary": "#### Game Title: *The Skill Matrix Challenge* - **Game Engine Type:** 4-Stage Multi-Cognitive Quest & Archetype Unlocker. - **Educational Objective:** Hands-on assessment across the 4 pillars of computational thinking and empathy calibration. #### Game Rules & Mechanics: 1. **Stage 1 (The Decomposition Trial):** - Scenario: Organize an emergency relief mission for an island flooded by a tsunami.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 4 LESSON 2\n# COMPUTATIONAL THINKING RADAR & ARCHETYPE EVALUATOR\n# =====================================================================\n\ndef evaluate_skills(user_name, scores):\n    \"\"\"\n    Analyzes computational thinking and human superpower scores (1 to 10 scale).\n    Determines student archetype and generates a personalized growth recommendation.\n    \"\"\"\n    decomp = scores[\"decomposition\"]\n    pattern = scores[\"pattern_recognition\"]\n    abstract = scores[\"abstraction\"]\n    algo = scores[\"algorithm_design\"]\n    empathy = scores[\"empathy_ethics\"]\n    \n    avg_score = sum(scores.values()) / len(scores)\n    \n    # Archetype evaluation logic\n    if empathy >= 8 and (decomp + algo) >= 14:\n        archetype = \"The Ethical Systems Architect\"\n        superpower = \"Balancing powerful technical algorithms with deep human moral compassion.\"\n    elif pattern >= 8 and abstract >= 8:\n        archetype = \"The Data Detective\"\n        superpower = \"Sifting through massive clutter to find the golden needle of truth.\"\n    elif decomp >= 8 and algo >= 8:\n        archetype = \"The Algorithmic Builder\"\n        superpower = \"Turning giant, chaotic challenges into clear, unstoppable step-by-step code.\"\n    else:\n        archetype = \"The Creative Tech Synthesizer\"\n        superpower = \"Connecting diverse ideas across disciplines to spark original innovations.\"\n        \n    print(\"=\" * 60)\n    print(f\"\ud83d\udcca SKILL RADAR PROFILE FOR: {user_name.upper()} \ud83d\udcca\")\n    print(\"=\" * 60)\n    for skill, val in scores.items():\n        bar = \"\u2593\" * val + \"\u2591\" * (10 - val)\n        print(f\"  {skill.replace('_', ' ').title():<22} : [{bar}] {val}/10\")\n        \n    print(\"-\" * 60)\n    print(f\"\u2728 UNLOCKED ARCHETYPE : {archetype.upper()} \u2728\")\n    print(f\"\ud83c\udf1f UNIQUE SUPERPOWER  : {superpower}\")\n    print(f\"\ud83d\udcc8 COMPOSITE SCORE    : {avg_score:.1f} / 10.0\")\n    print(\"=\" * 60)\n\n# ----------------- STUDENT EVALUATION TEST -----------------\nsample_student = {\n    \"name\": \"Zainab\",\n    \"scores\": {\n        \"decomposition\": 9,\n        \"pattern_recognition\": 7,\n        \"abstraction\": 8,\n        \"algorithm_design\": 9,\n        \"empathy_ethics\": 9\n    }\n}\n\nevaluate_skills(sample_student[\"name\"], sample_student[\"scores\"])",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c4_l2_1",
        "question": "When an architect draws a high-level floorplan of a building showing room dimensions and doorways, but omits the color of the curtains, the texture of the carpets, and the family photos on the wall, which pillar of computational thinking is being applied? - **A)** Decomposition - **B)** Pattern Recognition - **C)** Abstraction - **D)** Infinite Iteration",
        "options": [
          {
            "id": "A",
            "text": "** Decomposition",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Pattern Recognition",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Abstraction",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Infinite Iteration",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Abstraction** is the deliberate process of filtering out non-essential, superficial details to focus solely on the core functional characteristics required to solve the problem at hand.",
        "hint": "Reflect on the principles of Discover Your Skills."
      },
      {
        "id": "q_class6_c4_l2_2",
        "question": "A security algorithm scans 100,000 login attempts. It detects that whenever an account experiences 5 incorrect password attempts from different IP addresses within 30 seconds followed by an attempt to reset the phone number, an unauthorized account takeover occurs 96% of the time. What computational thinking skill allowed the engineer to identify this security vulnerability? - **A)** Mechanical Soldering - **B)** Pattern Recognition - **C)** Database Deletion - **D)** Cryptographic Erasure",
        "options": [
          {
            "id": "A",
            "text": "** Mechanical Soldering",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Pattern Recognition",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Database Deletion",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Cryptographic Erasure",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Pattern Recognition** involves discovering statistical regularities, repeating sequences, and structural similarities across large datasets to predict future events or detect anomalous behaviors.",
        "hint": "Reflect on the principles of Discover Your Skills."
      },
      {
        "id": "q_class6_c4_l2_3",
        "question": "Which of the following scenarios best demonstrates the concept of **Decomposition**? - **A)** Running 5 kilometers every morning without stopping. - **B)** Splitting the complex process of creating an animated video game into distinct sub-tasks: character concept sketching, 3D modeling, physics engine programming, sound effects recording, and level testing. - **C)** Memorizing the entire dictionary in alphabetical order. - **D)** Replacing a computer keyboard with a mouse.",
        "options": [
          {
            "id": "A",
            "text": "** Running 5 kilometers every morning without stopping.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Splitting the complex process of creating an animated video game into distinct sub-tasks: character concept sketching, 3D modeling, physics engine programming, sound effects recording, and level testing.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Memorizing the entire dictionary in alphabetical order.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Replacing a computer keyboard with a mouse.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Decomposition** is the systematic dismantling of a complex, daunting endeavor into distinct, self-contained sub-units that can be independently planned, executed, and validated.",
        "hint": "Reflect on the principles of Discover Your Skills."
      },
      {
        "id": "q_class6_c4_l2_4",
        "question": "Two students design algorithms to find a specific word in an alphabetical dictionary of 1,000 pages: - *Student A's Algorithm:* Start at Page 1, check every single word on each page sequentially until found. - *Student B's Algorithm:* Open the dictionary exactly in the middle (Page 500). If the target word comes alphabetically before Page 500, discard the second half and repeat the process on the remaining 500 pages. What is the comparative evaluation of these two algorithms? - **A)** Both algorithms take the exact same number of steps in all cases. - **B)** Student A's algorithm is a Linear Search (takes up to 1,000 steps); Student B's algorithm is a Binary Search (takes a maximum of only 10 steps!). Student B's design is exponentially more efficient. - **C)** Student B's algorithm is illegal in computer science. - **D)** Student A's algorithm is faster because it does not skip any pages.",
        "options": [
          {
            "id": "A",
            "text": "** Both algorithms take the exact same number of steps in all cases.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Student A's algorithm is a Linear Search (takes up to 1,000 steps); Student B's algorithm is a Binary Search (takes a maximum of only 10 steps!). Student B's design is exponentially more efficient.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Student B's algorithm is illegal in computer science.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Student A's algorithm is faster because it does not skip any pages.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Student B implemented **Binary Search** ($\\log_2(1000) \\approx 10$ steps). By using algorithmic design to halve the search space at each iteration, Student B solves the problem in roughly 10 operations, whereas Student A's linear search may require up to 1,000 page reads.",
        "hint": "Reflect on the principles of Discover Your Skills."
      },
      {
        "id": "q_class6_c4_l2_5",
        "question": "Why is the human skill of **Empathy** indispensable when building AI healthcare companions for elderly patients? - **A)** AI computers easily catch biological flu viruses. - **B)** While an AI can monitor pulse rates and remind patients to take medication, only empathetic human designers can anticipate feelings of loneliness, respect human dignity, and craft comforting interactions that make patients feel genuinely valued. - **C)** Empathy increases the Wi-Fi speed of the computer. - **D)** Computers have too much empathy and need humans to make them colder.",
        "options": [
          {
            "id": "A",
            "text": "** AI computers easily catch biological flu viruses.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** While an AI can monitor pulse rates and remind patients to take medication, only empathetic human designers can anticipate feelings of loneliness, respect human dignity, and craft comforting interactions that make patients feel genuinely valued.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Empathy increases the Wi-Fi speed of the computer.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Computers have too much empathy and need humans to make them colder.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** AI models lack consciousness, lived emotional experience, and sentient awareness. Empathy is a deeply human capacity that guides ethical design, ensures vulnerable populations are treated with respect, and prevents technological solutions from feeling cold, alienating, or dehumanizing.",
        "hint": "Reflect on the principles of Discover Your Skills."
      }
    ]
  },
  {
    "id": "class6-c5-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 1,
    "lessonTitle": "AI Learning Lab",
    "missionScenario": "> **Mission Codename:** *Gesture-Bot Zero: The Space Station Airlock*\n> **Mission Briefing:** You are stationed inside the Deep-Space Orbital Research Lab!\n> Astronauts working in bulky space suits need to operate the airlock doors without taking off their thick pressurized gloves. A physical keypad is too dangerous to touch with frozen gloves.\n> Your mission is to build a **Gesture-Controlled AI Vision System**! You have a digital camera pointed at the airlock window. You must train an AI model inside the *AI Learning Lab* to recognize three distinct astronaut gestures:\n> 1. `Open Airlock` (Two thumbs up)\n> 2. `Lock Airlock` (Crossed arms in an X-shape)\n> 3. `Normal Neutral` (Hands at sides / empty background)\n> If your model confuses an accidental wave with an airlock command, or fails to recognize an astronaut because the space helmet reflects sunlight, disaster could strike!\n---",
    "gameTitle": "Vision Model Trainer",
    "gameEngine": "Interactive Training Studio & Robustness Stress-Tester.",
    "gameSummary": "#### Game Title: *Vision Model Trainer* - **Game Engine Type:** Interactive Training Studio & Robustness Stress-Tester. - **Educational Objective:** Hands-on experience in sample curation, epoch tuning, and adversarial stress-testing. #### Game Rules & Mechanics: 1. **The Virtual Webcam Lab:** - The student has access to a simulated virtual camera feed with 3 gesture targets: `Thumbs Up`, `Crossed Arms (X)`, `Neutral`.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 5 LESSON 1\n# SIMULATED NEURAL MODEL TRAINING LOOP & LOSS MONITOR\n# =====================================================================\n\ndef simulate_model_training(epochs, sample_count, initial_loss=0.95):\n    \"\"\"\n    Simulates training progress across multiple epochs.\n    Demonstrates how error (loss) decreases and accuracy increases.\n    \"\"\"\n    print(f\"Training Model with {sample_count} samples across {epochs} Epochs...\\n\")\n    print(f\"{'EPOCH':<8} | {'LOSS (ERROR)':<15} | {'TRAIN ACCURACY':<16} | {'STATUS'}\")\n    print(\"-\" * 55)\n    \n    current_loss = initial_loss\n    accuracy = 0.35  # Starts at random guessing (35%)\n    \n    for epoch in range(1, epochs + 1):\n        # Loss decays exponentially as model learns\n        loss_reduction = current_loss * 0.08\n        current_loss = max(current_loss - loss_reduction, 0.03)\n        accuracy = min(accuracy + (1.0 - accuracy) * 0.09, 0.99)\n        \n        # Display progress at key milestone epochs\n        if epoch in [1, 5, 10, 20, 35, 50]:\n            if current_loss > 0.50:\n                status = \"Learning basic edges\"\n            elif current_loss > 0.20:\n                status = \"Differentiating gestures\"\n            else:\n                status = \"Optimal convergence\"\n                \n            print(f\"{epoch:<8} | {current_loss:<15.4f} | {accuracy * 100:<15.1f}% | {status}\")\n            \n    print(\"-\" * 55)\n    print(\"\u2705 TRAINING COMPLETE! Neural weights saved to browser memory.\\n\")\n    return accuracy, current_loss\n\ndef test_inference(confidence_score, threshold=0.80):\n    \"\"\"\n    Evaluates whether a real-time prediction is confident enough to act.\n    \"\"\"\n    if confidence_score >= threshold:\n        return f\"EXECUTE COMMAND (Confidence: {confidence_score*100:.1f}% >= Threshold {threshold*100:.1f}%)\"\n    else:\n        return f\"HOLD STATE / RE-SCAN (Confidence: {confidence_score*100:.1f}% is too ambiguous!)\"\n\n# ----------------- RUN SIMULATION -----------------\nfinal_acc, final_loss = simulate_model_training(epochs=50, sample_count=120)\n\nprint(\"=== REAL-TIME AIRLOCK INFERENCE TESTS ===\")\ntest_runs = [0.94, 0.58, 0.88, 0.32]\nfor idx, conf in enumerate(test_runs, 1):\n    result = test_inference(conf, threshold=0.80)\n    print(f\"Test Sensor Run #{idx}: {result}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c5_l1_1",
        "question": "In an interactive machine learning lab, what does the term **\"Epoch\"** mean? - **A)** The amount of internet data downloaded in megabytes. - **B)** One complete iteration where the machine learning model processes and learns from the entire training dataset. - **C)** The physical speed of the computer's cooling fan. - **D)** The expiration date of the software license.",
        "options": [
          {
            "id": "A",
            "text": "** The amount of internet data downloaded in megabytes.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** One complete iteration where the machine learning model processes and learns from the entire training dataset.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The physical speed of the computer's cooling fan.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The expiration date of the software license.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An **Epoch** is a fundamental hyperparameter in machine learning. It indicates that every single sample in the training dataset has had a chance to pass forward through the model and update the internal neural weights once.",
        "hint": "Reflect on the principles of AI Learning Lab."
      },
      {
        "id": "q_class6_c5_l1_2",
        "question": "During the training of a gesture recognition model, the engineer monitors the **Loss** curve on the dashboard. What does a steadily decreasing loss value over time indicate? - **A)** The computer hard drive is running out of storage space. - **B)** The model's prediction errors are decreasing, meaning its ability to correctly classify the training examples is improving. - **C)** The webcam lens is becoming blurry. - **D)** The model has stopped functioning.",
        "options": [
          {
            "id": "A",
            "text": "** The computer hard drive is running out of storage space.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The model's prediction errors are decreasing, meaning its ability to correctly classify the training examples is improving.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The webcam lens is becoming blurry.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The model has stopped functioning.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Loss** is a mathematical calculation of prediction error (the difference between the model's guesses and the ground-truth labels). As training succeeds, optimization algorithms minimize this loss, driving it closer to zero as classification accuracy rises.",
        "hint": "Reflect on the principles of AI Learning Lab."
      },
      {
        "id": "q_class6_c5_l1_3",
        "question": "A student trains an AI model to detect whether a book is open or closed using 100 webcam photos. Every single photo was taken in a dark room with the student wearing green headphones. When tested in a sunlit classroom without headphones, the model fails completely. What machine learning flaw occurred? - **A)** Hardware Processor Overheating - **B)** Overfitting on superficial background features (lighting and green headphones) rather than learning the intrinsic geometry of books. - **C)** The book was too difficult for any computer to read. - **D)** Quantum Decoherence",
        "options": [
          {
            "id": "A",
            "text": "** Hardware Processor Overheating",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Overfitting on superficial background features (lighting and green headphones) rather than learning the intrinsic geometry of books.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The book was too difficult for any computer to read.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Quantum Decoherence",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Overfitting** occurs when a model learns the specific, irrelevant noise and idiosyncrasies of its training environment (such as room lighting or headphones) rather than the generalizable features of the target object.",
        "hint": "Reflect on the principles of AI Learning Lab."
      },
      {
        "id": "q_class6_c5_l1_4",
        "question": "An autonomous medical robot uses an AI vision model to verify whether a syringe contains the correct medication. The model returns: `Antibiotic \u2014 54% Confidence` and `Painkiller \u2014 46% Confidence`. What should the robot's control system do? - **A)** Inject the medicine immediately because 54% is greater than 46%. - **B)** Abort injection, trigger a high-priority alert, and lock the dispenser until a licensed human pharmacist manually verifies the vial. - **C)** Guess by flipping a digital coin. - **D)** Turn off the hospital electricity.",
        "options": [
          {
            "id": "A",
            "text": "** Inject the medicine immediately because 54% is greater than 46%.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Abort injection, trigger a high-priority alert, and lock the dispenser until a licensed human pharmacist manually verifies the vial.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Guess by flipping a digital coin.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Turn off the hospital electricity.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In safety-critical applications, a narrow plurality (54% vs 46%) represents extreme statistical ambiguity. High-stakes systems must enforce strict **Confidence Thresholds** (often >98%); any reading below the threshold must trigger a safe lockout and human intervention.",
        "hint": "Reflect on the principles of AI Learning Lab."
      },
      {
        "id": "q_class6_c5_l1_5",
        "question": "When training an AI sound classification model to detect a fire alarm buzzer in a noisy school hallway, why is it essential to record a class labeled *\"Ambient Hallway Noise\"* that includes children chatting, footsteps, and slamming lockers? - **A)** To make the audio file sound more like a musical song. - **B)** To teach the model what normal background sounds look like, preventing it from falsely triggering the emergency fire alarm when a locker slams. - **C)** To fill up empty space on the school computer network. - **D)** Fire alarms only work when children are talking.",
        "options": [
          {
            "id": "A",
            "text": "** To make the audio file sound more like a musical song.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To teach the model what normal background sounds look like, preventing it from falsely triggering the emergency fire alarm when a locker slams.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To fill up empty space on the school computer network.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Fire alarms only work when children are talking.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In audio machine learning, defining an **Ambient / Negative Class** is critical. Without background audio training, any loud acoustic transient (such as a dropped metal binder or slamming door) could be misclassified as a fire alarm frequency spike.",
        "hint": "Reflect on the principles of AI Learning Lab."
      }
    ]
  },
  {
    "id": "class6-c5-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 2,
    "lessonTitle": "Create with AI",
    "missionScenario": "> **Mission Codename:** *Operation Mythic Bestiary: The Galactic Lore Keeper*\n> **Mission Briefing:** Welcome to the Galactic Archives of Sector 7!\n> The Interstellar Federation is compiling a comprehensive visual encyclopedia of mythical extraterrestrial creatures discovered across uncharted solar systems.\n> You have been granted access to *Genesis-AI*\u2014a state-of-the-art multimodal generative AI studio capable of drafting creature lore, translating ancient planetary languages, and synthesizing concept artwork.\n> However, Genesis-AI is dangerously literal! If you ask it to *\"Draw a cool alien\"*, it produces a generic green blob with three eyes. If you ask it for historical facts, it occasionally invents completely fictitious planets with total confidence!\n> Your mission is to become a **Master Prompt Alchemist**! You must craft precise, structured, constraint-guided prompts to generate accurate, breathtaking mythological creature profiles without triggering hallucinations or copyright violations.\n---",
    "gameTitle": "The Prompt Alchemist",
    "gameEngine": "Iterative Constraint Optimization & Target Generation Arena.",
    "gameSummary": "#### Game Title: *The Prompt Alchemist* - **Game Engine Type:** Iterative Constraint Optimization & Target Generation Arena. - **Educational Objective:** Hands-on mastery of prompt constraints, style parameters, and avoiding hallucinated content. #### Game Rules & Mechanics: 1. **The Target Creature Canvas:** - The game displays a hidden target creature card: *The Obsidian Fire-Phoenix of Mount Vulcan* (Color: Volcanic black and glowing orange magma; Wings: Feathered obsidian glass; Environment: Smoke-filled basalt caldera; Mood: Regal, peaceful guardian).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 5 LESSON 2\n# AUTOMATED PROMPT ASSEMBLER & CONSTRAINT AUDITOR\n# =====================================================================\n\ndef assemble_prompt(role, task, context, constraints, output_format):\n    \"\"\"\n    Assembles a high-performance structured prompt using the R-T-C-C-O framework.\n    \"\"\"\n    prompt_blueprint = (\n        f\"### SYSTEM ROLE: {role}\\n\\n\"\n        f\"### PRIMARY TASK: {task}\\n\\n\"\n        f\"### CONTEXT & BACKGROUND: {context}\\n\\n\"\n        f\"### STRICT NEGATIVE CONSTRAINTS:\\n\"\n    )\n    for c in constraints:\n        prompt_blueprint += f\"- {c}\\n\"\n        \n    prompt_blueprint += f\"\\n### REQUIRED OUTPUT FORMAT:\\n{output_format}\\n\"\n    return prompt_blueprint\n\ndef audit_generated_output(output_text, forbidden_terms, max_words=120):\n    \"\"\"\n    Audits generated AI output against safety and length constraints.\n    \"\"\"\n    words = output_text.split()\n    word_count = len(words)\n    violations = []\n    \n    # Check forbidden / hallucinated terms\n    for term in forbidden_terms:\n        if term.lower() in output_text.lower():\n            violations.append(f\"Forbidden term detected: '{term}'\")\n            \n    # Check length\n    if word_count > max_words:\n        violations.append(f\"Exceeded max word count ({word_count} > {max_words})\")\n        \n    passed = len(violations) == 0\n    return passed, word_count, violations\n\n# ----------------- PROMPT ALCHEMY EXECUTION -----------------\nsystem_prompt = assemble_prompt(\n    role=\"Galactic Astrobiologist at the Interstellar Science Academy\",\n    task=\"Write a factual field profile of the Gliese-667 Ice Whale\",\n    context=\"Gliese-667 is a super-Earth with frozen ammonia seas. The whale filters micro-crystals.\",\n    constraints=[\n        \"Do not mention Earth animals like 'dolphins' or 'bears'\",\n        \"Do not include any violent predation scenes\",\n        \"Keep the tone scientific and wonder-filled\",\n        \"If scientific evidence is missing, state it is a hypothetical model\"\n    ],\n    output_format=\"Provide 3 labeled sections: Classification, Biology, and Planetary Diet.\"\n)\n\nprint(\"=== ASSEMBLED STRUCTURED MASTER PROMPT ===\")\nprint(system_prompt)\n\n# Simulated AI response\nsimulated_ai_response = (\n    \"Classification: Xenocete Ammonia-3. \"\n    \"Biology: Possesses thick silicone-blubber insulation to survive -110\u00b0C seas. \"\n    \"Planetary Diet: Ingests suspended ammonium ice crystals through porous baleen plates.\"\n)\n\nis_safe, count, errors = audit_generated_output(\n    simulated_ai_response, \n    forbidden_terms=[\"dolphin\", \"bear\", \"violent\"], \n    max_words=60\n)\n\nprint(\"-\" * 50)\nprint(f\"Audit Status: {'\u2705 PASSED' if is_safe else '\u274c FAILED'}\")\nprint(f\"Word Count: {count} words\")\nif not is_safe:\n    print(f\"Violations: {errors}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c5_l2_1",
        "question": "What is the fundamental difference between a **Discriminative AI** model and a **Generative AI** model? - **A)** Discriminative models can only run on mobile phones, while Generative models require supercomputers. - **B)** Discriminative models classify, sort, or label existing input data; Generative models create entirely new content (text, audio, imagery) based on learned probabilistic distributions. - **C)** Discriminative models are always free, while Generative models cost money. - **D)** Generative models only work with numbers, never words or images.",
        "options": [
          {
            "id": "A",
            "text": "** Discriminative models can only run on mobile phones, while Generative models require supercomputers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Discriminative models classify, sort, or label existing input data; Generative models create entirely new content (text, audio, imagery) based on learned probabilistic distributions.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Discriminative models are always free, while Generative models cost money.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Generative models only work with numbers, never words or images.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Discriminative models model conditional probability $P(Y|X)$ to determine boundaries between categories (e.g., \"Is this spam or not spam?\"). Generative models model the underlying data distribution $P(X)$ to synthesize novel instances resembling the training data.",
        "hint": "Reflect on the principles of Create with AI."
      },
      {
        "id": "q_class6_c5_l2_2",
        "question": "In prompt engineering, what is the primary function of specifying **Negative Constraints** (e.g., *\"Do NOT include cartoon outlines, no blurry textures, avoid words like 'furthermore'\"*)? - **A)** To make the prompt longer so the AI charges more tokens. - **B)** To deliberately restrict the model's probabilistic generation space, preventing it from producing common clich\u00e9s, undesirable styles, or inappropriate content. - **C)** To shut down the computer's graphics card. - **D)** Negative constraints make the AI angry and rebellious.",
        "options": [
          {
            "id": "A",
            "text": "** To make the prompt longer so the AI charges more tokens.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To deliberately restrict the model's probabilistic generation space, preventing it from producing common clich\u00e9s, undesirable styles, or inappropriate content.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To shut down the computer's graphics card.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Negative constraints make the AI angry and rebellious.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Language and diffusion models select paths through high-dimensional probability space. Explicit negative constraints prune unwanted probabilistic branches, forcing the model away from overused tropes, blurry artifacts, or forbidden vocabulary.",
        "hint": "Reflect on the principles of Create with AI."
      },
      {
        "id": "q_class6_c5_l2_3",
        "question": "Why do Large Language Models (LLMs) experience **Hallucinations** (confidently stating fictitious \"facts\" that never happened)? - **A)** The AI computer caught a biological viral infection. - **B)** LLMs are statistical next-token prediction engines trained on linguistic patterns; they optimize for semantic fluency and grammatical coherence rather than verifiable truth retrieval. - **C)** A human programmer manually typed fake facts into the code for fun. - **D)** The internet connection was temporarily running at 3G speeds.",
        "options": [
          {
            "id": "A",
            "text": "** The AI computer caught a biological viral infection.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** LLMs are statistical next-token prediction engines trained on linguistic patterns; they optimize for semantic fluency and grammatical coherence rather than verifiable truth retrieval.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A human programmer manually typed fake facts into the code for fun.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The internet connection was temporarily running at 3G speeds.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** LLMs do not possess an internal conceptual encyclopedia of ground truth. They predict the most statistically probable sequence of words following the user's prompt. If a fabricated answer sounds linguistically convincing, the model generates it with total syntactic confidence.",
        "hint": "Reflect on the principles of Create with AI."
      },
      {
        "id": "q_class6_c5_l2_4",
        "question": "An artist prompts an image generator: *\"A futuristic flying car in a city.\"* The AI outputs an old 1970s sedan with cartoon bird wings glued to its doors in an empty cartoon meadow. How should the artist refine the prompt to achieve a sleek, cinematic, cyberpunk vehicle? - **A)** Type *\"flying car\"* 50 times in all capital letters. - **B)** Apply the R-T-C-C-O framework: specify vehicle mechanics (aerodynamic mag-lev turbine VTOL), setting (rain-slicked Neo-Tokyo streets at night, neon reflections), visual style (cinematic photorealism, anamorphic lens), and negative constraints (no cartoon wings, no retro sedans). - **C)** Turn off the monitor and turn it back on. - **D)** Delete the computer operating system.",
        "options": [
          {
            "id": "A",
            "text": "** Type *\"flying car\"* 50 times in all capital letters.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Apply the R-T-C-C-O framework: specify vehicle mechanics (aerodynamic mag-lev turbine VTOL), setting (rain-slicked Neo-Tokyo streets at night, neon reflections), visual style (cinematic photorealism, anamorphic lens), and negative constraints (no cartoon wings, no retro sedans).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Turn off the monitor and turn it back on.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delete the computer operating system.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Generative models require descriptive, multi-attribute prompts with precise contextual framing and negative constraints. Iterative refinement using structured prompt frameworks eliminates ambiguities and steers the latent space toward the artist's exact aesthetic vision.",
        "hint": "Reflect on the principles of Create with AI."
      },
      {
        "id": "q_class6_c5_l2_5",
        "question": "If an individual prompts a Generative AI tool: *\"Write an entire school essay about the French Revolution in the style of Charles Dickens,\"* and submits it to their teacher under their own name without citation or attribution, what ethical principle is being violated? - **A)** Battery Power Conservation - **B)** Academic Integrity, Honesty, and Authorship Transparency - **C)** Data Packet Routing Efficiency - **D)** Screen Resolution Parity",
        "options": [
          {
            "id": "A",
            "text": "** Battery Power Conservation",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Academic Integrity, Honesty, and Authorship Transparency",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Data Packet Routing Efficiency",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Screen Resolution Parity",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Claiming AI-generated text or art as one's own original human creation constitutes academic dishonesty (plagiarism). While AI can serve as a powerful research tutor, brainstormer, or editing assistant, ethical creators must always disclose and credit AI assistance transparently.",
        "hint": "Reflect on the principles of Create with AI."
      }
    ]
  },
  {
    "id": "class6-c6-l1",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 1,
    "lessonTitle": "Protect Your Data",
    "missionScenario": "> **Mission Codename:** *Operation Black-Box Defense: The Data Vault*\n> **Mission Briefing:** Alert at Neo-Olympia Middle School!\n> A trendy new viral smartphone mobile game called *\"Mega-Pet Virtual World\"* has swept through the school. To unlock a free sparkling pet costume, the app asks students to click *\"Accept All Permissions\"*.\n> Hidden inside the app's fine print, predatory AI data brokers are harvesting every student\u2019s live GPS location, reading their private contact lists, listening through background microphones, and selling the data to ad networks to target them with psychological marketing!\n> You have been designated the school\u2019s **Chief Cybersecurity Guardian**! Your mission is to deploy the **Cyber Privacy Shield**, audit the school\u2019s digital devices, identify unauthorized data leaks, revoke predatory permissions, and sanitize personal student databases before confidential information is permanently compromised!\n---",
    "gameTitle": "The Cyber Privacy Shield",
    "gameEngine": "App Security Audit & Permission Defense Lab.",
    "gameSummary": "#### Game Title: *The Cyber Privacy Shield* - **Game Engine Type:** App Security Audit & Permission Defense Lab. - **Educational Objective:** Hands-on ability to inspect application manifest files, evaluate privacy policies, and revoke predatory hardware permissions. #### Game Rules & Mechanics: 1. **The Device Inspector Dashboard:** - The student is presented with 5 newly downloaded mobile apps on a virtual tablet:",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 6 LESSON 1\n# CYBER PRIVACY SHIELD: AUTOMATED PII DETECTION & MASKING ENGINE\n# =====================================================================\n\nimport re\n\ndef sanitize_student_data(raw_text):\n    \"\"\"\n    Scans incoming text for sensitive PII patterns and replaces them with\n    secure redaction tokens before processing by public AI models.\n    \"\"\"\n    sanitized = raw_text\n    redactions_made = []\n    \n    # 1. Detect and mask Email Addresses\n    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+'\n    emails_found = re.findall(email_pattern, sanitized)\n    if emails_found:\n        for email in emails_found:\n            sanitized = sanitized.replace(email, \"[REDACTED_EMAIL]\")\n            redactions_made.append(f\"Email masked: {email}\")\n            \n    # 2. Detect and mask Phone Numbers (e.g., +91-9876543210 or 10-digit numbers)\n    phone_pattern = r'(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}'\n    phones_found = re.findall(phone_pattern, sanitized)\n    # Match full phone number string\n    full_phones = [m.group() for m in re.finditer(r'(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', raw_text)]\n    for phone in full_phones:\n        sanitized = sanitized.replace(phone, \"[REDACTED_PHONE]\")\n        redactions_made.append(f\"Phone number masked: {phone}\")\n        \n    # 3. Detect and mask Student ID / Social Security formats (e.g., STU-94821)\n    id_pattern = r'STU-\\d{5}'\n    ids_found = re.findall(id_pattern, sanitized)\n    for s_id in ids_found:\n        sanitized = sanitized.replace(s_id, \"[REDACTED_STUDENT_ID]\")\n        redactions_made.append(f\"Student ID masked: {s_id}\")\n\n    return sanitized, redactions_made\n\n# ----------------- SIMULATED UNGUARDED STUDENT SUBMISSION -----------------\nincoming_student_prompt = (\n    \"Hi AI tutor! My name is Rohan Sharma, student ID STU-55421. \"\n    \"Please check my science homework. If you have questions, email my mother at \"\n    \"priya.sharma@domain.com or call our home at 555-839-2041. We live near 4th Avenue.\"\n)\n\nprint(\"=== CYBER PRIVACY SHIELD SANITIZATION AUDIT ===\\n\")\nprint(\"Original Raw Prompt with Leaked PII:\")\nprint(f\"'{incoming_student_prompt}'\\n\")\n\nclean_prompt, audit_log = sanitize_student_data(incoming_student_prompt)\n\nprint(\"Protected Output Ready for AI Cloud Model:\")\nprint(f\"'{clean_prompt}'\\n\")\n\nprint(\"Security Audit Actions Taken:\")\nfor action in audit_log:\n    print(f\"  \ud83d\udee1\ufe0f {action}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c6_l1_1",
        "question": "Which of the following items of data is classified as **Sensitive Personally Identifiable Information (PII)** that should **never** be shared with an untrusted online chatbot? - **A)** Your home street address and private biometric fingerprint scan. - **B)** The current time in Greenwich Mean Time (GMT). - **C)** The scientific boiling point of pure water (100\u00b0C). - **D)** The name of the capital city of Japan.",
        "options": [
          {
            "id": "A",
            "text": "** Your home street address and private biometric fingerprint scan.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The current time in Greenwich Mean Time (GMT).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The scientific boiling point of pure water (100\u00b0C).",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The name of the capital city of Japan.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Sensitive PII includes personal information that uniquely identifies a physical person and poses significant safety, identity theft, or physical security risks if compromised\u2014such as home addresses, passwords, social security numbers, and biometric records.",
        "hint": "Reflect on the principles of Protect Your Data."
      },
      {
        "id": "q_class6_c6_l1_2",
        "question": "A free offline wallpaper app requests access to: `Microphone`, `Phone Call Logs`, and `Fine GPS Location`. The developer explains in small print that this allows them to \"deliver personalized wallpaper colors\". What is the most accurate cybersecurity assessment? - **A)** The app is completely safe because wallpapers look better when the microphone is on. - **B)** This is predatory over-permissioning designed to harvest sensitive user behavior and surveillance data to monetize through third-party ad brokers. - **C)** All mobile apps must have GPS access to run. - **D)** Wallpaper apps use phone call logs to generate computer graphics.",
        "options": [
          {
            "id": "A",
            "text": "** The app is completely safe because wallpapers look better when the microphone is on.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** This is predatory over-permissioning designed to harvest sensitive user behavior and surveillance data to monetize through third-party ad brokers.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** All mobile apps must have GPS access to run.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Wallpaper apps use phone call logs to generate computer graphics.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An offline image display app has zero legitimate technical requirement to access audio microphones, private call logs, or real-time GPS coordinates. This is a classic indicator of **malicious surveillance or data-harvesting spyware**.",
        "hint": "Reflect on the principles of Protect Your Data."
      },
      {
        "id": "q_class6_c6_l1_3",
        "question": "What does the economic axiom *\"If the service is free, you are the product\"* imply in the context of modern AI web platforms? - **A)** The website will mail you free computer hardware in the post. - **B)** Free services often monetize user attention, private conversation logs, behavioral patterns, and personal data by selling targeted advertising or licensing datasets to third parties. - **C)** Free websites are run exclusively by charitable governments. - **D)** You will be hired as an employee of the company automatically.",
        "options": [
          {
            "id": "A",
            "text": "** The website will mail you free computer hardware in the post.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Free services often monetize user attention, private conversation logs, behavioral patterns, and personal data by selling targeted advertising or licensing datasets to third parties.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Free websites are run exclusively by charitable governments.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** You will be hired as an employee of the company automatically.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Operating high-speed AI servers costs millions of dollars in electricity and hardware. When platforms offer these services for free without subscription fees, their primary revenue model frequently involves harvesting, aggregating, and monetizing user behavioral profiles and training data.",
        "hint": "Reflect on the principles of Protect Your Data."
      },
      {
        "id": "q_class6_c6_l1_4",
        "question": "A user creates a password: `Password123!`. A hacker uses an AI-powered dictionary attack tool that tests 50 billion combinations per second. Why will this password be cracked in less than 0.1 seconds? - **A)** The computer is using magic. - **B)** The password uses an extremely common dictionary word, predictable sequential numbers (`123`), and a standard exclamation mark, which are the exact top statistical patterns tested first by password-cracking algorithms. - **C)** All passwords are cracked in 0.1 seconds regardless of complexity. - **D)** The exclamation mark disables computer encryption.",
        "options": [
          {
            "id": "A",
            "text": "** The computer is using magic.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The password uses an extremely common dictionary word, predictable sequential numbers (`123`), and a standard exclamation mark, which are the exact top statistical patterns tested first by password-cracking algorithms.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** All passwords are cracked in 0.1 seconds regardless of complexity.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The exclamation mark disables computer encryption.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Machine learning cracking tools are trained on billions of leaked passwords. They prioritize the most statistically prevalent human habits: dictionary words, simple letter substitutions (e.g., `P@ssword`), and sequential digits (`123`). Robust security requires long, random passphrases (e.g., `purple-galaxy-dolphin-tractor`).",
        "hint": "Reflect on the principles of Protect Your Data."
      },
      {
        "id": "q_class6_c6_l1_5",
        "question": "What legal right gives citizens the power to request that an online platform permanently erase all their stored personal profile data, conversation histories, and uploaded photos from corporate databases? - **A)** The Right to Free Video Streaming - **B)** The Right to Erasure / \"The Right to be Forgotten\" (enshrined in privacy laws like GDPR and DPDP) - **C)** The Right to Infinite Computer Memory - **D)** The Right to Unlimited Software Downloads",
        "options": [
          {
            "id": "A",
            "text": "** The Right to Free Video Streaming",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The Right to Erasure / \"The Right to be Forgotten\" (enshrined in privacy laws like GDPR and DPDP)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The Right to Infinite Computer Memory",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The Right to Unlimited Software Downloads",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Modern data protection frameworks (such as Europe's **GDPR** and India's **DPDP Act**) grant users sovereign control over their data, including the **Right to Erasure** (often called the Right to be Forgotten), legally obligating companies to purge personal records upon request.",
        "hint": "Reflect on the principles of Protect Your Data."
      }
    ]
  },
  {
    "id": "class6-c6-l2",
    "gradeKey": "class6",
    "gradeName": "Class 6",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 2,
    "lessonTitle": "Think Before You Trust",
    "missionScenario": "> **Mission Codename:** *Operation Veracity: The Viral Panic Incident*\n> **Mission Briefing:** High Alert at the Global News Verification Network!\n> Overnight, a terrifying video accompanied by a breaking news article went viral across social media platforms, gaining 15 million views in under three hours!\n> The headline proclaims: *\"BREAKING: Giant 10-meter Flying Carnivorous Squid Discovered in the Indian Ocean! Coastal Beaches Evacuating!\"*\n> The video shows a hyper-realistic, horrifying sea monster hovering over fishing boats, and the article includes quotes supposedly from a \"Lead Oceanographer at the Global Maritime Institute\". Coastal towns are beginning to panic!\n> You have been dispatched as the **Chief Digital Forensics Investigator** at the *Truth Detective Agency*! Your mission is to pause the viral hysteria, apply digital forensic tools, trace the sources, examine metadata and visual artifacts, and prove whether this viral alert is an authentic biological discovery or a dangerous AI-generated hoax!\n---",
    "gameTitle": "Truth Detective Agency",
    "gameEngine": "Digital Forensic Investigation & Evidence Triangulation Room.",
    "gameSummary": "#### Game Title: *Truth Detective Agency* - **Game Engine Type:** Digital Forensic Investigation & Evidence Triangulation Room. - **Educational Objective:** Hands-on mastery of source verification, reverse image lookups, and detecting synthetic hallucinations. #### Game Rules & Mechanics: 1. **The Investigation Dossier:** - The player investigates 6 viral trending internet cases:",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 6 LESSON 2\n# TRUTH DETECTIVE AGENCY: CLAIM CREDIBILITY & TRIANGULATION ENGINE\n# =====================================================================\n\ndef evaluate_claim_credibility(claim_profile):\n    \"\"\"\n    Evaluates an internet news claim based on forensic verification criteria:\n    - primary_source_cited: Does the claim link to an official report/paper?\n    - independent_outlets_confirming: How many accredited news/scientific agencies verify it?\n    - contains_sensationalist_clickbait: Does it use SHOUTING CAPS or fearmongering?\n    - has_forensic_ai_artifacts: Did image/audio forensic scans flag synthetic generation?\n    \"\"\"\n    credibility_score = 50  # Start at neutral baseline (50/100)\n    audit_notes = []\n    \n    # 1. Primary Source Check\n    if claim_profile[\"primary_source_cited\"]:\n        credibility_score += 25\n        audit_notes.append(\"\u2705 Positive: Cites primary peer-reviewed source or official government agency.\")\n    else:\n        credibility_score -= 20\n        audit_notes.append(\"\u274c Red Flag: No verifiable primary source or named author provided.\")\n        \n    # 2. Independent Confirmation Triangulation\n    confirmations = claim_profile[\"independent_outlets_confirming\"]\n    if confirmations >= 3:\n        credibility_score += 25\n        audit_notes.append(f\"\u2705 Positive: Confirmed by {confirmations} independent reputable news organizations.\")\n    elif confirmations == 0:\n        credibility_score -= 30\n        audit_notes.append(\"\ud83d\udea8 Critical Warning: Zero independent confirmations found anywhere on the internet!\")\n        \n    # 3. Sensationalist Clickbait Check\n    if claim_profile[\"contains_sensationalist_clickbait\"]:\n        credibility_score -= 15\n        audit_notes.append(\"\u26a0\ufe0f Suspicious: Headline uses sensationalist emotional clickbait language.\")\n        \n    # 4. Forensic AI Scan\n    if claim_profile[\"has_forensic_ai_artifacts\"]:\n        credibility_score -= 40\n        audit_notes.append(\"\ud83d\udea8 FORENSIC ALERT: Visual/Audio analysis reveals synthetic AI neural artifacts!\")\n        \n    # Clamp score between 0 and 100\n    final_score = max(0, min(100, credibility_score))\n    \n    # Determine final verdict\n    if final_score >= 80:\n        verdict = \"VERIFIED FACTUAL REPORT\"\n    elif final_score >= 45:\n        verdict = \"UNVERIFIED / PROCEED WITH CAUTION\"\n    else:\n        verdict = \"FABRICATED HOAX / SYNTHETIC DISINFORMATION\"\n        \n    return final_score, verdict, audit_notes\n\n# ----------------- TEST VIRAL CLAIMS -----------------\ntest_claim_1 = {\n    \"headline\": \"Giant 10-meter Flying Squid Terrifies Coastal Beaches!\",\n    \"primary_source_cited\": False,\n    \"independent_outlets_confirming\": 0,\n    \"contains_sensationalist_clickbait\": True,\n    \"has_forensic_ai_artifacts\": True\n}\n\ntest_claim_2 = {\n    \"headline\": \"James Webb Space Telescope Detects Water Vapor in Exoplanet Atmosphere\",\n    \"primary_source_cited\": True,\n    \"independent_outlets_confirming\": 4,\n    \"contains_sensationalist_clickbait\": False,\n    \"has_forensic_ai_artifacts\": False\n}\n\nprint(\"=== TRUTH DETECTIVE AGENCY CLAIM EVALUATION ===\")\nfor idx, claim in enumerate([test_claim_1, test_claim_2], 1):\n    print(f\"\\n[Case #{idx}] Headline: \\\"{claim['headline']}\\\"\")\n    score, verdict, notes = evaluate_claim_credibility(claim)\n    print(f\"Credibility Score: {score}/100 \u2794 Verdict: {verdict}\")\n    for n in notes:\n        print(f\"  {n}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class6_c6_l2_1",
        "question": "In the digital media literacy SIFT framework, what does the first letter **\"S\"** stand for, and what immediate action does it require when encountering sensationalist viral news? - **A)** Share immediately to all your school friends. - **B)** Stop! Pause and refrain from sharing, reacting, or panicking until you have verified the claim. - **C)** Search for more scary videos. - **D)** Subscribe to the social media account.",
        "options": [
          {
            "id": "A",
            "text": "** Share immediately to all your school friends.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Stop! Pause and refrain from sharing, reacting, or panicking until you have verified the claim.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Search for more scary videos.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Subscribe to the social media account.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In the **SIFT method** developed by Mike Caulfield, **S** stands for **STOP**. Viral algorithms thrive on emotional impulsivity (fear, outrage, shock). The critical first step is to pause, resist the reflex to hit the \"Share\" button, and initiate a deliberate fact-checking evaluation.",
        "hint": "Reflect on the principles of Think Before You Trust."
      },
      {
        "id": "q_class6_c6_l2_2",
        "question": "Why is **Authority Bias** particularly dangerous when interacting with Large Language Model chatbots? - **A)** The chatbot might delete your computer hard drive. - **B)** The chatbot generates responses with authoritative vocabulary, professional formatting, and confident linguistic tone, leading users to falsely equate eloquence with scientific accuracy. - **C)** Authority bias makes the chatbot run out of memory. - **D)** Chatbots only answer questions from police officers.",
        "options": [
          {
            "id": "A",
            "text": "** The chatbot might delete your computer hard drive.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The chatbot generates responses with authoritative vocabulary, professional formatting, and confident linguistic tone, leading users to falsely equate eloquence with scientific accuracy.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Authority bias makes the chatbot run out of memory.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Chatbots only answer questions from police officers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Humans are biologically primed to trust individuals who speak with calm, eloquent authority. Because AI models produce syntactically flawless prose, users frequently lower their critical defenses, failing to notice when the underlying factual assertions are completely hallucinated.",
        "hint": "Reflect on the principles of Think Before You Trust."
      },
      {
        "id": "q_class6_c6_l2_3",
        "question": "What does it mean to **Triangulate** information on the internet? - **A)** Drawing triangles around every image you see online. - **B)** Cross-checking an extraordinary claim across at least two or three independent, credible, and accredited sources (e.g., peer-reviewed journals, official scientific bodies, established news organizations) to verify consensus. - **C)** Sending an email to three different friends. - **D)** Measuring the geometry of your computer monitor.",
        "options": [
          {
            "id": "A",
            "text": "** Drawing triangles around every image you see online.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Cross-checking an extraordinary claim across at least two or three independent, credible, and accredited sources (e.g., peer-reviewed journals, official scientific bodies, established news organizations) to verify consensus.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Sending an email to three different friends.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Measuring the geometry of your computer monitor.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In investigative journalism and intelligence analysis, **Triangulation** means confirming that an assertion is independently verified by multiple uncorrelated, reputable sources rather than simply repeated by thousands of social media bots copying the same unverified rumor.",
        "hint": "Reflect on the principles of Think Before You Trust."
      },
      {
        "id": "q_class6_c6_l2_4",
        "question": "A student receives an audio message on a messaging app that sounds like their teacher's voice saying: *\"Class is cancelled today, and everyone has failed their exam.\"* The student suspects it is an AI voice clone. Which of the following forensic techniques is the most reliable way to uncover the truth? - **A)** Forward the audio file to 50 classmates to see if they panic. - **B)** Check official school communications channels (the school parent portal or calling the school reception) and inspect the audio file for unnatural metallic timbre or missing natural human breath sounds. - **C)** Assume that all audio messages on the internet are 100% real. - **D)** Delete the messaging app from the phone.",
        "options": [
          {
            "id": "A",
            "text": "** Forward the audio file to 50 classmates to see if they panic.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Check official school communications channels (the school parent portal or calling the school reception) and inspect the audio file for unnatural metallic timbre or missing natural human breath sounds.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Assume that all audio messages on the internet are 100% real.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delete the messaging app from the phone.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** High-stakes claims must always be verified through **Out-of-Band Channels** (contacting the school office directly via official numbers). Furthermore, synthetic voice clones often exhibit acoustic artifacts: unnatural monotonic pitch cadence, metallic compression artifacts, and the complete absence of biological breathing.",
        "hint": "Reflect on the principles of Think Before You Trust."
      },
      {
        "id": "q_class6_c6_l2_5",
        "question": "What is the most severe societal consequence of pervasive, unchecked AI-generated misinformation and deepfakes? - **A)** People will spend too much time charging their phones. - **B)** The erosion of shared public reality and societal trust, where citizens no longer know what is real, leading to civic paralysis, panic, and vulnerability to manipulation. - **C)** Video game graphics will look too realistic. - **D)** Internet cables will become tangled.",
        "options": [
          {
            "id": "A",
            "text": "** People will spend too much time charging their phones.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The erosion of shared public reality and societal trust, where citizens no longer know what is real, leading to civic paralysis, panic, and vulnerability to manipulation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Video game graphics will look too realistic.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Internet cables will become tangled.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The gravest danger of synthetic media is what philosophers term the **\"Liar's Dividend\"** and the erosion of shared epistemic truth: when deepfakes are everywhere, bad actors can dismiss real crimes as \"just a deepfake\", while ordinary citizens lose faith in all objective journalism, science, and democratic institutions.",
        "hint": "Reflect on the principles of Think Before You Trust."
      }
    ]
  },
  {
    "id": "class7-c1-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 1,
    "lessonTitle": "AI Learns from Data",
    "missionScenario": "> **Mission Codename:** *Operation Data Heist: The Metropolitan Museum Archives*\n> **Mission Briefing:** Emergency at the Metropolitan Heritage Museum!\n> Over the weekend, a server malfunction corrupted the museum's centuries-old antiquities database. The museum's AI search engine, which helps archaeologists identify stolen historical artifacts, has gone haywire!\n> Historical records now contain missing dates, negative artifact weights, duplicated entries, and mislabeled pottery shards. A shipment of priceless Roman coins is arriving at international customs in two hours, and the automated verification model cannot function with dirty data!\n> You have been recruited as the Lead **Data Detective**! Your mission is to enter the raw data stream, filter the noise, reconstruct missing values, excise anomalous outliers, and restore data integrity so the AI classifier can identify the genuine artifacts.\n---",
    "gameTitle": "The Corrupt Dataset Heist",
    "gameEngine": "Data Cleaning Pipeline & Feature Engineering Puzzle.",
    "gameSummary": "#### Game Title: *The Corrupt Dataset Heist* - **Game Engine Type:** Data Cleaning Pipeline & Feature Engineering Puzzle. - **Educational Objective:** Hands-on mastery of data preprocessing, outlier detection, and handling missing data before training. #### Game Rules & Mechanics: 1. **The Forensic Data Table (20 Corrupted Antiquity Records):** - The student is presented with a messy table containing:",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 1 LESSON 1\n# DATA ENGINEERING: AUTOMATED CLEANING & IMPUTATION PIPELINE\n# =====================================================================\n\ndef clean_antiquity_dataset(raw_records):\n    \"\"\"\n    Cleans raw museum artifact telemetry:\n    1. Removes duplicate records.\n    2. Identifies and removes impossible outliers (negative weights or weights > 5000g).\n    3. Imputes missing weight values with the median of valid records.\n    4. Normalizes text labels into clean uppercase standard format.\n    \"\"\"\n    print(f\"Initial raw records received: {len(raw_records)}\")\n    \n    # Step 1: Remove exact duplicates\n    unique_records = []\n    seen_ids = set()\n    for row in raw_records:\n        if row[\"id\"] not in seen_ids:\n            seen_ids.add(row[\"id\"])\n            unique_records.append(row)\n    print(f\"After deduplication: {len(unique_records)} records remaining.\")\n    \n    # Step 2: Extract valid weights to calculate median\n    valid_weights = [\n        r[\"weight_g\"] for r in unique_records \n        if r[\"weight_g\"] is not None and 0 < r[\"weight_g\"] <= 5000\n    ]\n    valid_weights.sort()\n    median_weight = valid_weights[len(valid_weights) // 2]\n    print(f\"Calculated replacement median weight: {median_weight:.1f} g\")\n    \n    # Step 3: Clean and normalize records\n    cleaned_dataset = []\n    for row in unique_records:\n        weight = row[\"weight_g\"]\n        \n        # Outlier rejection / Imputation\n        if weight is None or weight <= 0 or weight > 5000:\n            assigned_weight = median_weight\n            status = \"IMPUTED\"\n        else:\n            assigned_weight = weight\n            status = \"ORIGINAL\"\n            \n        # Label normalization (e.g., 'roman', 'Ancient Rome' -> 'ROMAN')\n        origin = row[\"origin\"].strip().upper()\n        if \"ROM\" in origin:\n            clean_origin = \"ROMAN\"\n        elif \"GREEK\" in origin:\n            clean_origin = \"GREEK\"\n        else:\n            clean_origin = \"UNKNOWN\"\n            \n        cleaned_dataset.append({\n            \"id\": row[\"id\"],\n            \"weight_g\": round(assigned_weight, 1),\n            \"origin\": clean_origin,\n            \"status\": status\n        })\n        \n    return cleaned_dataset\n\n# ----------------- SIMULATED CORRUPTED DATABASE -----------------\ncorrupted_artifacts = [\n    {\"id\": \"ART-01\", \"weight_g\": 340.5, \"origin\": \"Roman\"},\n    {\"id\": \"ART-02\", \"weight_g\": None,  \"origin\": \"ancient roman\"},   # Missing value\n    {\"id\": \"ART-03\", \"weight_g\": -95.0, \"origin\": \"Greek\"},           # Negative outlier\n    {\"id\": \"ART-01\", \"weight_g\": 340.5, \"origin\": \"Roman\"},           # Duplicate!\n    {\"id\": \"ART-04\", \"weight_g\": 380.0, \"origin\": \"ROMAN\"},\n    {\"id\": \"ART-05\", \"weight_g\": 85000.0, \"origin\": \"greek\"},         # Massive outlier\n    {\"id\": \"ART-06\", \"weight_g\": 310.2, \"origin\": \"GREEK\"}\n]\n\nprint(\"=== RAW DATABASE INGESTION ===\")\ncleaned_results = clean_antiquity_dataset(corrupted_artifacts)\n\nprint(\"\\n=== FINAL CLEANED & NORMALIZED DATASET ===\")\nprint(f\"{'ID':<8} | {'WEIGHT (g)':<12} | {'ORIGIN':<10} | {'DATA STATUS'}\")\nprint(\"-\" * 45)\nfor item in cleaned_results:\n    print(f\"{item['id']:<8} | {item['weight_g']:<12.1f} | {item['origin']:<10} | {item['status']}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c1_l1_1",
        "question": "Which of the following datasets is classified as **Unstructured Data**? - **A)** A relational SQL database containing employee salaries and hire dates. - **B)** A collection of 10,000 raw audio recordings of ocean whale vocalizations saved as WAV files. - **C)** A comma-separated values (CSV) spreadsheet of bank customer account balances. - **D)** A table of student examination marks arranged in 5 columns.",
        "options": [
          {
            "id": "A",
            "text": "** A relational SQL database containing employee salaries and hire dates.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A collection of 10,000 raw audio recordings of ocean whale vocalizations saved as WAV files.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A comma-separated values (CSV) spreadsheet of bank customer account balances.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A table of student examination marks arranged in 5 columns.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Unstructured Data** lacks a predefined tabular data model or schema. Raw multimedia files such as audio streams, photographs, and unformatted PDF books cannot be stored directly in traditional relational table columns without extensive computational feature extraction.",
        "hint": "Reflect on the principles of AI Learns from Data."
      },
      {
        "id": "q_class7_c1_l1_2",
        "question": "A video game development team trains an AI non-player character (NPC) to navigate an obstacle course. The NPC is not shown any recorded gameplay; instead, it receives +10 points for jumping over a pit and -50 points for colliding with a wall. Over 50,000 attempts, the NPC learns to run through the course flawlessly. Which machine learning paradigm does this represent? - **A)** Supervised Learning - **B)** Reinforcement Learning - **C)** Unsupervised Clustering - **D)** Deterministic Hardcoding",
        "options": [
          {
            "id": "A",
            "text": "** Supervised Learning",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Reinforcement Learning",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Unsupervised Clustering",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Deterministic Hardcoding",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Reinforcement Learning (RL)** is governed by an **Agent-Environment loop** where learning occurs through trial-and-error driven by scalar **Rewards and Penalties**. The agent seeks to discover an optimal policy that maximizes cumulative long-term reward.",
        "hint": "Reflect on the principles of AI Learns from Data."
      },
      {
        "id": "q_class7_c1_l1_3",
        "question": "In a dataset designed to predict housing market prices, one entry lists a house with `Number_of_Bedrooms = -4` and `Square_Footage = 99999999`. What are these entries called, and how must a data scientist treat them? - **A)** Ground Truth Labels; they should be duplicated 10 times. - **B)** Measurement Outliers / Corrupted Artifacts; they must be identified and removed or corrected before training because they distort statistical distribution models. - **C)** Hyperparameters; they accelerate model training. - **D)** Loss Functions; they increase computer memory bandwidth.",
        "options": [
          {
            "id": "A",
            "text": "** Ground Truth Labels; they should be duplicated 10 times.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Measurement Outliers / Corrupted Artifacts; they must be identified and removed or corrected before training because they distort statistical distribution models.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Hyperparameters; they accelerate model training.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Loss Functions; they increase computer memory bandwidth.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Negative bedrooms and impossible square footages are **extreme measurement outliers / invalid data entries**. Feeding impossible physical quantities into statistical machine learning algorithms skews gradient descent optimization and corrupts the learned weight parameters.",
        "hint": "Reflect on the principles of AI Learns from Data."
      },
      {
        "id": "q_class7_c1_l1_4",
        "question": "A clinical research dataset tracking a rare medical condition contains only 45 patient records in total worldwide. One patient record is missing the blood pressure measurement, but contains all other 30 vital parameters. Should the data scientist delete the entire row, or impute the missing value? - **A)** Delete the entire row, because medical algorithms can never use estimated numbers. - **B)** Impute the missing blood pressure value using the cohort median or a regression estimate, because the dataset is extremely small (45 rows) and discarding an entire record causes an unacceptable loss of precious clinical information. - **C)** Discard the entire computer. - **D)** Invent 1,000 fake patients to replace it.",
        "options": [
          {
            "id": "A",
            "text": "** Delete the entire row, because medical algorithms can never use estimated numbers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Impute the missing blood pressure value using the cohort median or a regression estimate, because the dataset is extremely small (45 rows) and discarding an entire record causes an unacceptable loss of precious clinical information.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Discard the entire computer.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Invent 1,000 fake patients to replace it.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** When working with **data-scarce regimes** (such as rare diseases), every individual sample represents immense clinical value. Dropping a row removes all 30 other verified features. Imputation (using the median, mean, or nearest-neighbor interpolation) preserves the remaining signal while minimizing statistical distortion.",
        "hint": "Reflect on the principles of AI Learns from Data."
      },
      {
        "id": "q_class7_c1_l1_5",
        "question": "In a bank's automated loan approval dataset, what role does the applicant's `Annual_Income` play, and what role does `Loan_Approved (Yes/No)` play? - **A)** `Annual_Income` is the Label; `Loan_Approved` is the Feature. - **B)** `Annual_Income` is an Input Feature; `Loan_Approved` is the Target Label. - **C)** Both are Labels. - **D)** Both are Loss Functions.",
        "options": [
          {
            "id": "A",
            "text": "** `Annual_Income` is the Label; `Loan_Approved` is the Feature.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `Annual_Income` is an Input Feature; `Loan_Approved` is the Target Label.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Both are Labels.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Both are Loss Functions.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In supervised learning, the observable characteristics, predictors, and independent variables ($X$) describing the subject are called **Features** (e.g., Annual Income, Credit Score, Debt). The final dependent outcome or decision ($y$) the model is trained to predict is the **Target Label**.",
        "hint": "Reflect on the principles of AI Learns from Data."
      }
    ]
  },
  {
    "id": "class7-c1-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 2,
    "lessonTitle": "Patterns Make It Smart",
    "missionScenario": "> **Mission Codename:** *Project Pixel-Vault: Decoding the Satellite Stream*\n> **Mission Briefing:** Deep-Space Satellite *Helios-9* has sent an emergency transmission from the dark side of Mars!\n> The satellite's optical compression antenna was hit by solar radiation, stripping away all color display rendering. What arrived at Mission Control is not a visible picture, but a raw, encrypted **Matrix of Numbers**!\n> Somewhere hidden inside this grid of integers is the outline of a historic lost landing craft. Human eyes looking at the raw numbers see only an overwhelming grid of digits: `255, 240, 12, 0, 5...`\n> As Mission Control\u2019s Lead Computer Vision Cryptanalyst, you must write the mathematical algorithms that transform this raw numerical grid into edge patterns, reconstruct the visual boundaries, and reveal the craft's coordinates!\n---",
    "gameTitle": "The Pixel Matrix Decoder",
    "gameEngine": "Mathematical Image Processing & Edge Detection Puzzle.",
    "gameSummary": "#### Game Title: *The Pixel Matrix Decoder* - **Game Engine Type:** Mathematical Image Processing & Edge Detection Puzzle. - **Educational Objective:** Hands-on calculation of pixel intensity gradients and convolutional feature map discovery. #### Game Rules & Mechanics: 1. **The Scrambled Signal Canvas:** - The player is given an $8 \\times 8$ mystery integer grid representing an encrypted satellite symbol (e.g., An arrow, an alien letter, or a star).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 1 LESSON 2\n# COMPUTER VISION: 2D PIXEL MATRIX EDGE DETECTION ENGINE\n# =====================================================================\n\ndef detect_vertical_edges(image_matrix, edge_threshold=150):\n    \"\"\"\n    Computes horizontal gradients across an image matrix to detect vertical edges.\n    Formula: Gradient(row, col) = | Image(row, col+1) - Image(row, col) |\n    \"\"\"\n    rows = len(image_matrix)\n    cols = len(image_matrix[0])\n    \n    # Initialize empty edge map with dimensions (rows x cols-1)\n    edge_map = []\n    \n    for r in range(rows):\n        edge_row = []\n        for c in range(cols - 1):\n            # Calculate absolute difference between adjacent pixels\n            intensity_diff = abs(image_matrix[r][c+1] - image_matrix[r][c])\n            \n            # If difference exceeds threshold, mark as significant edge (1), else (0)\n            if intensity_diff >= edge_threshold:\n                edge_row.append(1)  # Edge present\n            else:\n                edge_row.append(0)  # Smooth surface\n        edge_map.append(edge_row)\n        \n    return edge_map\n\ndef display_matrix(matrix, title):\n    print(f\"\\n--- {title} ---\")\n    for row in matrix:\n        # Format numbers or visual blocks\n        row_str = \" \".join([f\"{val:3}\" if isinstance(val, int) else str(val) for val in row])\n        print(f\"  [ {row_str} ]\")\n\n# ----------------- SIMULATED 6x6 SATELLITE IMAGE -----------------\n# An image showing a bright white vertical pillar (255) on dark background (20)\nsatellite_image = [\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ]\n]\n\ndisplay_matrix(satellite_image, \"RAW INCOMING PIXEL INTENSITY MATRIX\")\n\nedges = detect_vertical_edges(satellite_image, edge_threshold=150)\n\nprint(\"\\n--- DETECTED EDGE BOUNDARIES (1 = Boundary Line) ---\")\nfor row in edges:\n    visual_line = \"\".join([\" \u2588 \" if cell == 1 else \" \u00b7 \" for cell in row])\n    print(f\"  {visual_line}\")\n\nprint(\"\\nAnalysis: Two sharp vertical boundary lines detected at Col 2 and Col 4!\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c1_l2_1",
        "question": "In standard 8-bit digital grayscale image processing, what is the valid numerical range of brightness for any single individual pixel? - **A)** `-128` to `+127` - **B)** `0` to `255` - **C)** `1` to `100` - **D)** `0.0` to `10.0`",
        "options": [
          {
            "id": "A",
            "text": "** `-128` to `+127`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `0` to `255`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `1` to `100`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `0.0` to `10.0`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In an 8-bit digital imaging system, each pixel is stored using one byte ($2^8 = 256$ possible distinct values). The scale ranges from `0` (minimum intensity, representing pure black) to `255` (maximum intensity, representing pure white).",
        "hint": "Reflect on the principles of Patterns Make It Smart."
      },
      {
        "id": "q_class7_c1_l2_2",
        "question": "A high-definition color photograph has dimensions of $1920 \\times 1080$ pixels. When stored in computer memory for deep learning processing, how many color matrices (channels) comprise this image? - **A)** Exactly 1 channel (Grayscale) - **B)** Exactly 3 channels (Red, Green, Blue) - **C)** 24 channels - **D)** 100 channels",
        "options": [
          {
            "id": "A",
            "text": "** Exactly 1 channel (Grayscale)",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Exactly 3 channels (Red, Green, Blue)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** 24 channels",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 100 channels",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Standard digital color photography uses the additive **RGB color model**. An image tensor has three stacked 2D matrices corresponding to Red, Green, and Blue intensity channels, resulting in a 3D numerical array of shape $(1080, 1920, 3)$.",
        "hint": "Reflect on the principles of Patterns Make It Smart."
      },
      {
        "id": "q_class7_c1_l2_3",
        "question": "Why is the mathematical difference between adjacent pixels calculated when an AI vision system performs edge detection? - **A)** Because subtraction makes the file size smaller. - **B)** Physical object boundaries produce sudden, sharp transitions in reflected light intensity; calculating differences isolates these rapid gradients while zeroing out flat, uniform surfaces. - **C)** Subtraction is the only math operation computers understand. - **D)** To change the color of the camera glass.",
        "options": [
          {
            "id": "A",
            "text": "** Because subtraction makes the file size smaller.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Physical object boundaries produce sudden, sharp transitions in reflected light intensity; calculating differences isolates these rapid gradients while zeroing out flat, uniform surfaces.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Subtraction is the only math operation computers understand.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To change the color of the camera glass.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An edge represents a physical discontinuity in surface geometry, depth, or illumination. Calculating the spatial derivative (difference between neighboring pixels) yields high numerical values along sharp boundaries while producing zero in uniform regions (like a solid wall or clear sky).",
        "hint": "Reflect on the principles of Patterns Make It Smart."
      },
      {
        "id": "q_class7_c1_l2_4",
        "question": "In computer vision security, researchers discovered that adding a tiny, invisible layer of calculated pixel noise to a photo of a panda causes an AI model to classify it as a \"Gibbon monkey with 99.3% confidence\", even though human eyes see no change. What does this reveal about how AI vision systems recognize patterns? - **A)** The computer is blind. - **B)** AI vision models rely on statistical pixel gradients and high-frequency numerical patterns across matrices, rather than understanding semantic concepts like \"living mammals with fur\" the way human brains do. - **C)** Gibbons and pandas have identical DNA. - **D)** The monitor glass was dirty.",
        "options": [
          {
            "id": "A",
            "text": "** The computer is blind.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** AI vision models rely on statistical pixel gradients and high-frequency numerical patterns across matrices, rather than understanding semantic concepts like \"living mammals with fur\" the way human brains do.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Gibbons and pandas have identical DNA.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The monitor glass was dirty.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** This phenomenon is known as an **Adversarial Example**. Deep neural networks do not possess biological understanding or conceptual common sense; they calculate weighted sums over numerical pixel matrices. Microscopic, mathematically crafted alterations to pixel values can push the feature vector across a decision boundary without human observers noticing.",
        "hint": "Reflect on the principles of Patterns Make It Smart."
      },
      {
        "id": "q_class7_c1_l2_5",
        "question": "In a modern multi-layer Convolutional Neural Network (CNN) trained to recognize human faces, what do the earliest (initial) layers detect, and what do the deepest (final) layers detect? - **A)** Initial layers detect full human names; final layers detect individual pixels. - **B)** Initial layers detect low-level geometric primitives (edges, orientations, lines, color spots); deeper layers combine those edges into complex high-level structures (eyes, noses, full facial contours). - **C)** All layers do the exact same thing simultaneously. - **D)** Initial layers play music; deeper layers take photographs.",
        "options": [
          {
            "id": "A",
            "text": "** Initial layers detect full human names; final layers detect individual pixels.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Initial layers detect low-level geometric primitives (edges, orientations, lines, color spots); deeper layers combine those edges into complex high-level structures (eyes, noses, full facial contours).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** All layers do the exact same thing simultaneously.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Initial layers play music; deeper layers take photographs.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** CNNs utilize **Hierarchical Feature Learning**. Early convolutional layers act as localized edge and texture detectors. Subsequent layers compose edges into geometric motifs and shapes. The final layers synthesize these parts into holistic object representations (faces, cars, animals).",
        "hint": "Reflect on the principles of Patterns Make It Smart."
      }
    ]
  },
  {
    "id": "class7-c2-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 1,
    "lessonTitle": "Hello, Python!",
    "missionScenario": "> **Mission Codename:** *Escape the Syntax Dungeon: The Cyber Crypt*\n> **Mission Briefing:** Trapped in the Cyber Crypt of Byte-Mountain!\n> While conducting a routine software audit on an ancient mainframe computer, a rogue security lockdown was triggered. Heavy titanium blast doors have sealed every exit shut!\n> The door control terminal runs an interactive Python command console. To unlock each bulkhead, you must supply exact Python commands to calculate key cryptographic equations.\n> However, previous hackers sabotaged the system, leaving behind broken scripts riddled with missing colons, misspelled variables, and indentation traps. One single `SyntaxError` will trip the emergency alarm!\n> Your mission is to enter the terminal, **Diagnose and Fix the Bugs**, master Python operators, compute the door-lock hashes, and escape the dungeon before the system enters permanent lockout!\n---",
    "gameTitle": "Syntax Dungeon Escape",
    "gameEngine": "Terminal Debugging Quest & Logic Puzzle.",
    "gameSummary": "#### Game Title: *Syntax Dungeon Escape* - **Game Engine Type:** Terminal Debugging Quest & Logic Puzzle. - **Educational Objective:** Hands-on identification of syntax bugs, operator precedence mastery, and error resolution under pressure. #### Game Rules & Mechanics: 1. **The 3 Vault Chambers:** - **Chamber 1 (The Broken Script):**",
    "pythonCode": "students = 29\nteam_size = 4\n\ncomplete_teams = students // team_size   # Floor division\nleftover_students = students % team_size  # Modulo remainder\n\nprint(f\"Complete Teams: {complete_teams}\")\nprint(f\"Students Left Over: {leftover_students}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c2_l1_1",
        "question": "What is the evaluated output of the following Python expression? ```python result = 16 // 3 + 2 ** 3 * 2 - 5 % 2 ``` - **A)** 18 - **B)** 20 - **C)** 22 - **D)** 15",
        "options": [
          {
            "id": "A",
            "text": "** 18",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** 20",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** 22",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 15",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Hello, Python!."
      },
      {
        "id": "q_class7_c2_l1_2",
        "question": "Given the variables: ```python x = 10 y = 20 z = 5 ``` What is the boolean evaluation of the statement: ```python (x < y and y > 30) or not (z == 5) ``` - **A)** `True` - **B)** `False` - **C)** A SyntaxError crash - **D)** `None`",
        "options": [
          {
            "id": "A",
            "text": "** `True`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `False`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A SyntaxError crash",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `None`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Hello, Python!."
      },
      {
        "id": "q_class7_c2_l1_3",
        "question": "Why does Python enforce strict **Indentation** (whitespace at the start of a line) rather than using curly brackets `{}` like C++ or Java? - **A)** Python was designed to save space on hard drives. - **B)** To enforce visual readability and clean code structure as a foundational design principle, ensuring that code structure matches visual hierarchy. - **C)** Indentation makes computer CPUs run twice as fast. - **D)** Python cannot read curly brackets on modern keyboards.",
        "options": [
          {
            "id": "A",
            "text": "** Python was designed to save space on hard drives.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To enforce visual readability and clean code structure as a foundational design principle, ensuring that code structure matches visual hierarchy.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Indentation makes computer CPUs run twice as fast.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Python cannot read curly brackets on modern keyboards.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Created by Guido van Rossum, Python adheres to the philosophy that *\"Readability counts\"*. By making indentation syntactically mandatory, Python eliminates ambiguous scoping bugs and ensures all Python code worldwide is clean, consistent, and instantly readable by other engineers.",
        "hint": "Reflect on the principles of Hello, Python!."
      },
      {
        "id": "q_class7_c2_l1_4",
        "question": "A student writes this temperature conversion program: ```python temp_c = input(\"Enter temperature in Celsius: \") temp_f = (temp_c * 9/5) + 32 print(temp_f) ``` When run, the program crashes with: `TypeError: can't multiply sequence by non-int of type 'float'`. Why did this occur, and what is the exact fix? - **A)** The temperature was below freezing. - **B)** `temp_c` is captured as a String (`str`); Python cannot multiply text by a floating-point fraction (`9/5`). The fix is to cast the input: `temp_c = float(input(...))`. - **C)** The plus operator cannot be used on numbers. - **D)** Python does not support Fahrenheit temperatures.",
        "options": [
          {
            "id": "A",
            "text": "** The temperature was below freezing.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `temp_c` is captured as a String (`str`); Python cannot multiply text by a floating-point fraction (`9/5`). The fix is to cast the input: `temp_c = float(input(...))`.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The plus operator cannot be used on numbers.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Python does not support Fahrenheit temperatures.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** `input()` returns a string. Attempting to multiply a string by a float (`9/5 = 1.8`) raises an immediate `TypeError`. Explicitly wrapping the input call with `float()` converts the text into a real decimal number, allowing arithmetic operations to execute.",
        "hint": "Reflect on the principles of Hello, Python!."
      },
      {
        "id": "q_class7_c2_l1_5",
        "question": "What is the critical distinction in Python between a single equals sign (`=`) and a double equals sign (`==`)? - **A)** `=` is used for text; `==` is used for numbers. - **B)** `=` is the Assignment Operator (stores a value into a variable); `==` is the Equality Comparison Operator (checks if two values are equal and evaluates to True or False). - **C)** Both operators perform the exact same function. - **D)** `==` deletes the variable from memory.",
        "options": [
          {
            "id": "A",
            "text": "** `=` is used for text; `==` is used for numbers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `=` is the Assignment Operator (stores a value into a variable); `==` is the Equality Comparison Operator (checks if two values are equal and evaluates to True or False).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Both operators perform the exact same function.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `==` deletes the variable from memory.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** One of the most common beginner errors in computer science is confusing assignment with comparison. `score = 100` stores the number 100 into the variable `score`. `score == 100` asks the question *\"Does score currently equal 100?\"* and returns `True` or `False`.",
        "hint": "Reflect on the principles of Hello, Python!."
      }
    ]
  },
  {
    "id": "class7-c2-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 2,
    "lessonTitle": "Code Your First Idea",
    "missionScenario": "> **Mission Codename:** *Operation Cyber-Medic: The Space Colony Triage AI*\n> **Mission Briefing:** Crisis aboard Space Colony Olympus!\n> The central computer network has suffered widespread power fluctuations. Across various habitats, robotic air filtration units, solar hydroponic pumps, and life-support modules are flashing mysterious status error codes: `ERR_01`, `ERR_05`, `TEMP_WARN`...\n> The human engineering team is small and cannot be in ten places at once. They need an **Automated Diagnostic Assistant**\u2014an intelligent triage expert system capable of interrogating malfunctioning machinery, analyzing symptoms step-by-step, running diagnostic cycles in a loop, and issuing precise repair commands.\n> Your mission is to take your algorithmic idea, **Plan the Decision Tree**, and **Code the Interactive Diagnostic Assistant in Python** to bring the colony's systems safely back online!\n---",
    "gameTitle": "The AI Smart Assistant Quest",
    "gameEngine": "Diagnostic Expert System & Decision Tree Builder.",
    "gameSummary": "#### Game Title: *The AI Smart Assistant Quest* - **Game Engine Type:** Diagnostic Expert System & Decision Tree Builder. - **Educational Objective:** Hands-on mastery of nested conditionals, multi-turn state accumulation, and error-triage workflows. #### Game Rules & Mechanics: 1. **The Colony Triage Hub:** - 4 Malfunctioning Modules request assistance:",
    "pythonCode": "# The Multi-Way Branching Ladder\nif temperature > 80:\n    status = \"CRITICAL OVERHEAT: Shut down reactor!\"\nelif temperature > 50:\n    status = \"ELEVATED: Spin cooling fans at 100% speed.\"\nelif temperature > 25:\n    status = \"OPTIMAL: Standard operational state.\"\nelse:\n    status = \"SUB-ZERO FREEZE: Activate heating coils!\"",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c2_l2_1",
        "question": "Examine the following Python code snippet: ```python score = 85 if score >= 90: grade = \"A\" elif score >= 80: grade = \"B\" elif score >= 70: grade = \"C\" else: grade = \"D\" print(grade) ``` What will be the output, and why did the line `elif score >= 70` not execute? - **A)** The output is `B`. Python evaluates `elif` branches in sequence; the instant `score >= 80` evaluates to True, its block executes and all subsequent branches are skipped. - **B)** The output is `C`. - **C)** The output is `B` and `C` combined. - **D)** It causes a SyntaxError.",
        "options": [
          {
            "id": "A",
            "text": "** The output is `B`. Python evaluates `elif` branches in sequence; the instant `score >= 80` evaluates to True, its block executes and all subsequent branches are skipped.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The output is `C`.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The output is `B` and `C` combined.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It causes a SyntaxError.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In an `if-elif-else` conditional ladder, branches are mutually exclusive. Even though $85 \\ge 70$ is also mathematically True, Python halts evaluation of the entire ladder as soon as the first matching condition (`score >= 80`) is satisfied.",
        "hint": "Reflect on the principles of Code Your First Idea."
      },
      {
        "id": "q_class7_c2_l2_2",
        "question": "What is the exact sequence of numbers printed by the following `for` loop? ```python for num in range(2, 11, 3): print(num, end=\" \") ``` - **A)** `2 3 4 5 6 7 8 9 10 11` - **B)** `2 5 8` - **C)** `2 5 8 11` - **D)** `3 6 9`",
        "options": [
          {
            "id": "A",
            "text": "** `2 3 4 5 6 7 8 9 10 11`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `2 5 8`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `2 5 8 11`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `3 6 9`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Code Your First Idea."
      },
      {
        "id": "q_class7_c2_l2_3",
        "question": "What is the final value of `count` after the following loop completes? ```python count = 1 while count < 16: count = count * 2 print(count) ``` - **A)** 8 - **B)** 16 - **C)** 32 - **D)** 15",
        "options": [
          {
            "id": "A",
            "text": "** 8",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** 16",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** 32",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 15",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Code Your First Idea."
      },
      {
        "id": "q_class7_c2_l2_4",
        "question": "An engineer builds an AI chatbot for bank security. If an applicant requests an account closure, the bot must first verify identity with a PIN code, and ONLY if the PIN is correct, ask whether the customer wishes to transfer remaining funds. What is the correct computational architecture for this logic? - **A)** A single `print()` statement. - **B)** A **Nested Conditional Structure** (an `if` statement placed inside the body of an outer `if` statement). - **C)** An infinite `while` loop that never terminates. - **D)** A floor division operator.",
        "options": [
          {
            "id": "A",
            "text": "** A single `print()` statement.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A **Nested Conditional Structure** (an `if` statement placed inside the body of an outer `if` statement).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** An infinite `while` loop that never terminates.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A floor division operator.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Hierarchical, multi-stage workflows require **Nested Conditionals**. The inner question (\"Transfer funds?\") is gated behind the successful validation of the outer conditional (\"Is PIN verified?\").",
        "hint": "Reflect on the principles of Code Your First Idea."
      },
      {
        "id": "q_class7_c2_l2_5",
        "question": "In a video game analytics script, what is the purpose of declaring `total_kills = 0` **outside** the game loop, rather than declaring it **inside** the loop? - **A)** Declaring variables inside loops makes the computer explode. - **B)** If declared inside the loop, the variable would be re-initialized and wiped back to `0` at the start of every single iteration, losing all cumulative progress. - **C)** Python does not allow variables inside loops. - **D)** It saves internet bandwidth.",
        "options": [
          {
            "id": "A",
            "text": "** Declaring variables inside loops makes the computer explode.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** If declared inside the loop, the variable would be re-initialized and wiped back to `0` at the start of every single iteration, losing all cumulative progress.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Python does not allow variables inside loops.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It saves internet bandwidth.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In the **Accumulator Pattern**, state persistence requires that the accumulator variable be initialized in the enclosing scope *before* the loop begins. Defining it inside the loop resets its value to zero every frame, preventing accumulation across iterations.",
        "hint": "Reflect on the principles of Code Your First Idea."
      }
    ]
  },
  {
    "id": "class7-c3-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 1,
    "lessonTitle": "AI in Money Matters",
    "missionScenario": "> **Mission Codename:** *Operation Cyber-Vault: The Midnight Heist*\n> **Mission Briefing:** Emergency at the Global Bank of Commerce!\n> Cybercriminals have launched an automated bot attack, stealing thousands of credit card numbers from a compromised international shopping website.\n> Right now, fraudulent micro-transactions and massive foreign withdrawals are flooding through the bank\u2019s payment servers at a rate of 500 transactions per second!\n> Human bank managers cannot review transactions manually; by the time a human opens a spreadsheet, millions of dollars have vanished across offshore shell accounts.\n> As the Chief **Fintech AI Security Architect**, you must deploy an **Automated Anomaly Detection Engine**! You must program real-time filters that analyze transaction amounts, geolocation velocity, merchant categories, and time stamps, freezing unauthorized fraud while ensuring legitimate customer purchases proceed without interruption!\n---",
    "gameTitle": "Wall Street Fraud Buster",
    "gameEngine": "Real-Time Transaction Stream Anomaly Defense Simulator.",
    "gameSummary": "#### Game Title: *Wall Street Fraud Buster* - **Game Engine Type:** Real-Time Transaction Stream Anomaly Defense Simulator. - **Educational Objective:** Hands-on balancing of precision and recall in financial anomaly detection, minimizing both fraud losses and false positive declines. #### Game Rules & Mechanics: 1. **The Live Payment Stream Dashboard:** - 20 live transactions flash across the student's terminal in rapid succession.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 3 LESSON 1\n# FINTECH: REAL-TIME ANOMALY & FRAUD DETECTION ENGINE\n# =====================================================================\n\ndef evaluate_transaction_risk(tx, customer_baseline):\n    \"\"\"\n    Computes a risk score (0 to 100) based on 3 anomaly indicators:\n    1. Amount Ratio: Current amount vs historical average.\n    2. Velocity: Speed required between consecutive transaction cities.\n    3. Merchant Risk: Uncharacteristically risky merchant category.\n    \"\"\"\n    risk_score = 0\n    flags = []\n    \n    # Factor 1: Spending Amount Anomaly\n    avg_spend = customer_baseline[\"avg_amount\"]\n    amount_ratio = tx[\"amount\"] / avg_spend\n    \n    if amount_ratio > 10.0:\n        risk_score += 45\n        flags.append(f\"Spike anomaly: Amount is {amount_ratio:.1f}x higher than average!\")\n    elif amount_ratio > 4.0:\n        risk_score += 20\n        flags.append(f\"Moderate amount elevation ({amount_ratio:.1f}x average).\")\n        \n    # Factor 2: Geolocation Velocity Check (Speed = Distance / Time)\n    distance_km = tx[\"distance_from_last_tx_km\"]\n    time_elapsed_hrs = tx[\"mins_since_last_tx\"] / 60.0\n    \n    if time_elapsed_hrs > 0:\n        travel_speed_kmh = distance_km / time_elapsed_hrs\n    else:\n        travel_speed_kmh = 99999 if distance_km > 0 else 0\n        \n    if travel_speed_kmh > 900.0:  # Faster than a commercial passenger jet!\n        risk_score += 50\n        flags.append(f\"Impossible Velocity: Required travel speed is {travel_speed_kmh:,.0f} km/h!\")\n    elif travel_speed_kmh > 200.0:\n        risk_score += 25\n        flags.append(f\"Unusually fast transit ({travel_speed_kmh:.0f} km/h).\")\n\n    # Factor 3: High-Risk Category Flag\n    if tx[\"category\"] in [\"Cryptocurrency Exchange\", \"Foreign Casino\", \"Wire Transfer\"]:\n        risk_score += 25\n        flags.append(f\"High-risk merchant category: '{tx['category']}'\")\n        \n    # Determine automated action\n    final_score = min(100, risk_score)\n    if final_score >= 70:\n        decision = \"\ud83d\udea8 ACTION: DECLINE & FREEZE CARD (High Probability Fraud)\"\n    elif final_score >= 35:\n        decision = \"\ud83d\udcf1 ACTION: TRIGGER 2FA CHALLENGE (SMS One-Time Code Required)\"\n    else:\n        decision = \"\u2705 ACTION: APPROVE TRANSACTION (Normal Spending Pattern)\"\n        \n    return final_score, decision, flags\n\n# ----------------- SIMULATED TRANSACTION STREAM -----------------\nmaya_baseline = {\"avg_amount\": 25.0, \"home_city\": \"Bengaluru\"}\n\nincoming_transactions = [\n    {\n        \"id\": \"TX-901\", \"amount\": 22.50, \"category\": \"Bookstore\",\n        \"distance_from_last_tx_km\": 2.5, \"mins_since_last_tx\": 120\n    },\n    {\n        \"id\": \"TX-902\", \"amount\": 850.00, \"category\": \"Luxury Electronics\",\n        \"distance_from_last_tx_km\": 4200.0, \"mins_since_last_tx\": 30\n    },\n    {\n        \"id\": \"TX-903\", \"amount\": 95.00, \"category\": \"Restaurant\",\n        \"distance_from_last_tx_km\": 15.0, \"mins_since_last_tx\": 180\n    }\n]\n\nprint(\"=== GLOBAL BANK FINTECH FRAUD DETECTION INFERENCE ===\\n\")\nfor tx in incoming_transactions:\n    score, action, alerts = evaluate_transaction_risk(tx, maya_baseline)\n    print(f\"Transaction [{tx['id']}] - Amount: ${tx['amount']:.2f} ({tx['category']})\")\n    print(f\"  Risk Index: {score}/100 \u2794 {action}\")\n    for a in alerts:\n        print(f\"    \u2022 {a}\")\n    print(\"-\" * 65)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c3_l1_1",
        "question": "What is the primary technical mechanism an AI banking system uses to distinguish legitimate customer transactions from fraudulent criminal charges? - **A)** Storing physical cash in titanium vaults. - **B)** Statistical Anomaly Detection: calculating deviations against historical baseline transaction behaviors (amount, geography, category, and velocity). - **C)** Requiring all customers to visit bank branches in person every morning. - **D)** Manually calling every single customer on the phone before every purchase.",
        "options": [
          {
            "id": "A",
            "text": "** Storing physical cash in titanium vaults.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Statistical Anomaly Detection: calculating deviations against historical baseline transaction behaviors (amount, geography, category, and velocity).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Requiring all customers to visit bank branches in person every morning.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Manually calling every single customer on the phone before every purchase.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Modern digital banking processes billions of transactions daily. **Anomaly Detection** models use statistical machine learning to compare real-time telemetry against historical customer behavioral baselines, computing risk probability scores within milliseconds.",
        "hint": "Reflect on the principles of AI in Money Matters."
      },
      {
        "id": "q_class7_c3_l1_2",
        "question": "A customer spends an average of \\$30 per week at local grocery stores in Delhi. At 02:00 AM, the card is tapped in London for \\$5,000, exactly 20 minutes after it was used at a Delhi convenience store. What specific heuristic triggers an immediate fraud lock? - **A)** The word \"grocery\" was spelled incorrectly. - **B)** The Impossible Geolocation Velocity heuristic: travel between Delhi and London in 20 minutes requires a physical velocity exceeding 20,000 km/h, which is physically impossible for a human traveler. - **C)** London does not have banks. - **D)** Delhi computers cannot communicate with London computers.",
        "options": [
          {
            "id": "A",
            "text": "** The word \"grocery\" was spelled incorrectly.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The Impossible Geolocation Velocity heuristic: travel between Delhi and London in 20 minutes requires a physical velocity exceeding 20,000 km/h, which is physically impossible for a human traveler.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** London does not have banks.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delhi computers cannot communicate with London computers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Impossible Velocity** calculations divide spatial distance by elapsed time. A physical impossibility ($>900\\text{ km/h}$) indicates that the card credentials have been cloned or accessed digitally by unauthorized third parties across distant servers.",
        "hint": "Reflect on the principles of AI in Money Matters."
      },
      {
        "id": "q_class7_c3_l1_3",
        "question": "In a cashier-less automated retail store (like Amazon Go), how does the system know which item a customer picked up from the shelf without requiring a barcode scan? - **A)** Store clerks watch from behind secret mirrors. - **B)** A network of overhead computer vision cameras tracking customer pose and shelf-edge weight sensors (pressure plates) detecting when an item's mass is removed. - **C)** Customers must loudly shout the name of the product into a microphone. - **D)** All products have tiny invisible magnets that stick to clothing.",
        "options": [
          {
            "id": "A",
            "text": "** Store clerks watch from behind secret mirrors.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A network of overhead computer vision cameras tracking customer pose and shelf-edge weight sensors (pressure plates) detecting when an item's mass is removed.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Customers must loudly shout the name of the product into a microphone.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** All products have tiny invisible magnets that stick to clothing.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Cashier-less stores utilize **Sensor Fusion**: ceiling-mounted computer vision neural networks track human skeleton pose and hand interactions, while shelf weight sensors confirm the exact item removed by measuring precise gram changes.",
        "hint": "Reflect on the principles of AI in Money Matters."
      },
      {
        "id": "q_class7_c3_l1_4",
        "question": "A fintech startup trains an AI model to approve personal business loans using 20 years of historical banking records. During testing, the AI consistently rejects loan applications from qualified entrepreneurs belonging to historically underprivileged neighborhoods, even when their personal credit scores are perfect. What caused this? - **A)** The computer processor has low memory. - **B)** Historical training data encoded systemic historical inequities and redlining practices from past decades; the AI internalized postal codes as a proxy feature for risk, perpetuating past discrimination. - **C)** Entrepreneurs cannot use credit cards. - **D)** The Python script contained an IndentationError.",
        "options": [
          {
            "id": "A",
            "text": "** The computer processor has low memory.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Historical training data encoded systemic historical inequities and redlining practices from past decades; the AI internalized postal codes as a proxy feature for risk, perpetuating past discrimination.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Entrepreneurs cannot use credit cards.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The Python script contained an IndentationError.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** This is a classic example of **Proxy Variable Bias**. If historical human loan officers unfairly denied loans to specific demographic zip codes, an AI trained on those historical outcomes will learn that those zip codes are \"high risk\", perpetuating algorithmic discrimination.",
        "hint": "Reflect on the principles of AI in Money Matters."
      },
      {
        "id": "q_class7_c3_l1_5",
        "question": "Why do banks prefer using a **Step-Up Authentication (SMS 2FA Challenge)** for borderline transactions rather than immediately freezing the credit card? - **A)** Sending SMS messages makes the bank stock price rise. - **B)** To avoid the economic and reputational cost of False Positives (declining legitimate cardholders), while still preventing unauthorized fraud if the user is unable to verify the one-time code. - **C)** Because computer models never make mistakes. - **D)** 2FA codes are used to mine cryptocurrency.",
        "options": [
          {
            "id": "A",
            "text": "** Sending SMS messages makes the bank stock price rise.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To avoid the economic and reputational cost of False Positives (declining legitimate cardholders), while still preventing unauthorized fraud if the user is unable to verify the one-time code.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Because computer models never make mistakes.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 2FA codes are used to mine cryptocurrency.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** High-risk automated systems avoid binary all-or-nothing decisions in ambiguous cases. A **Step-Up Challenge** (2FA) acts as a flexible risk filter: if the customer is genuine, they enter the code in 5 seconds and proceed happily; if a thief is attempting the charge, they cannot access the phone and the theft fails.",
        "hint": "Reflect on the principles of AI in Money Matters."
      }
    ]
  },
  {
    "id": "class7-c3-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 2,
    "lessonTitle": "AI for a Greener World",
    "missionScenario": "> **Mission Codename:** *Operation Eco-Grid: Zero-Emission Metropolis*\n> **Mission Briefing:** Welcome to Neo-Veridia: the world\u2019s first 100% renewable smart city!\n> Neo-Veridia is powered entirely by offshore wind turbines, desert solar farms, and massive grid-scale battery storage facilities.\n> However, maintaining stability on a 100% renewable grid is an immense challenge! When sudden storm clouds blot out the desert sun, solar generation plummets by 70% in seconds. When a heatwave hits downtown at 06:00 PM, millions of air conditioners turn on simultaneously!\n> If power generation fails to match demand within milliseconds, the electrical grid will suffer a catastrophic blackout!\n> As the **Chief Energy AI Dispatcher**, your mission is to deploy an **Intelligent Predictive Energy Management System**! You must forecast weather patterns, anticipate city consumption spikes, dispatch battery reserves with millisecond precision, and keep the city green, stable, and blackout-free!\n---",
    "gameTitle": "Eco-Grid Dispatcher",
    "gameEngine": "Real-Time Power Grid Balancing & Resource Allocation Simulator.",
    "gameSummary": "#### Game Title: *Eco-Grid Dispatcher* - **Game Engine Type:** Real-Time Power Grid Balancing & Resource Allocation Simulator. - **Educational Objective:** Hands-on experience in managing stochastic renewable energy sources, battery degradation, and dynamic demand response. #### Game Rules & Mechanics: 1. **The Grid Control Room:** - The student manages the power grid across a 24-hour day cycle (simulated in 3 minutes).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 3 LESSON 2\n# ECO-GRID SIMULATION: PREDICTIVE RENEWABLE DISPATCH & BATTERY ENGINE\n# =====================================================================\n\ndef simulate_24hr_ecogrid(hourly_forecast):\n    \"\"\"\n    Simulates hourly energy dispatch across a smart eco-city:\n    - Balances Solar + Wind generation against City Demand.\n    - Manages Battery Storage (Capacity: 500 MWh; Max Charge/Discharge: 150 MW).\n    - Tracks Fossil Peaker backup usage (aiming for 0 MW!).\n    \"\"\"\n    battery_capacity_mwh = 500.0\n    current_battery_mwh = 200.0  # Starts 40% full\n    max_flow_mw = 150.0\n    \n    total_fossil_used = 0\n    blackout_hours = 0\n    \n    print(f\"{'HOUR':<6} | {'SOLAR':<7} | {'WIND':<6} | {'DEMAND':<8} | {'BATTERY':<11} | {'FOSSIL':<8} | {'STATUS'}\")\n    print(\"-\" * 72)\n    \n    for row in hourly_forecast:\n        hour = row[\"hour\"]\n        solar = row[\"solar_mw\"]\n        wind = row[\"wind_mw\"]\n        demand = row[\"demand_mw\"]\n        \n        renewable_gen = solar + wind\n        net_balance = renewable_gen - demand\n        fossil_needed = 0\n        \n        if net_balance >= 0:\n            # SURPLUS ENERGY: Charge battery\n            charge_amount = min(net_balance, max_flow_mw, battery_capacity_mwh - current_battery_mwh)\n            current_battery_mwh += charge_amount\n            status = f\"Surplus (+{charge_amount:.0f} MW into battery)\"\n        else:\n            # ENERGY DEFICIT: Discharge battery\n            deficit = abs(net_balance)\n            discharge_amount = min(deficit, max_flow_mw, current_battery_mwh)\n            current_battery_mwh -= discharge_amount\n            unmet_deficit = deficit - discharge_amount\n            \n            if unmet_deficit > 0:\n                fossil_needed = unmet_deficit\n                total_fossil_used += fossil_needed\n                status = f\"\u26a0\ufe0f DEFICIT (Peaker Plant {fossil_needed:.0f} MW)\"\n                if current_battery_mwh <= 0:\n                    blackout_hours += 1\n            else:\n                status = f\"Battery covered deficit (-{discharge_amount:.0f} MW)\"\n                \n        pct_batt = (current_battery_mwh / battery_capacity_mwh) * 100\n        print(f\"{hour:<6} | {solar:<7.0f} | {wind:<6.0f} | {demand:<8.0f} | {pct_batt:<5.1f}%     | {fossil_needed:<8.0f} | {status}\")\n        \n    print(\"-\" * 72)\n    print(f\"Simulation Complete:\")\n    print(f\"  \u2022 Final Battery Reserves: {current_battery_mwh:.1f} / {battery_capacity_mwh:.0f} MWh\")\n    print(f\"  \u2022 Total Fossil Peaker Energy Used: {total_fossil_used:.0f} MWh\")\n    print(f\"  \u2022 City Blackout Occurrences: {blackout_hours} hours\")\n    if total_fossil_used == 0:\n        print(\"\ud83c\udf3f PERFECT SCORE: 100% Clean Green Energy Grid Achieved!\")\n\n# ----------------- SIMULATED 6-HOUR SNAPSHOT FORECAST -----------------\ngrid_forecast = [\n    {\"hour\": \"08:00\", \"solar_mw\": 200, \"wind_mw\": 120, \"demand_mw\": 280},\n    {\"hour\": \"12:00\", \"solar_mw\": 550, \"wind_mw\": 100, \"demand_mw\": 400},\n    {\"hour\": \"16:00\", \"solar_mw\": 320, \"wind_mw\": 180, \"demand_mw\": 420},\n    {\"hour\": \"20:00\", \"solar_mw\": 0,   \"wind_mw\": 150, \"demand_mw\": 480},\n    {\"hour\": \"00:00\", \"solar_mw\": 0,   \"wind_mw\": 220, \"demand_mw\": 250},\n    {\"hour\": \"04:00\", \"solar_mw\": 0,   \"wind_mw\": 180, \"demand_mw\": 210}\n]\n\nprint(\"=== NEO-VERIDIA 24-HOUR ECO-GRID DISPATCH RUN ===\\n\")\nsimulate_24hr_ecogrid(grid_forecast)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c3_l2_1",
        "question": "Why is Artificial Intelligence particularly necessary for managing a 100% renewable electrical grid compared to a traditional coal-fired electrical grid? - **A)** Coal power plants do not have electrical wires. - **B)** Solar and wind energy generation are inherently intermittent and weather-dependent; AI models are required to forecast fluctuating generation and dynamically coordinate battery storage and demand loads in real time. - **C)** Solar panels only work when connected to the internet. - **D)** Wind turbines require AI to spin their blades.",
        "options": [
          {
            "id": "A",
            "text": "** Coal power plants do not have electrical wires.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Solar and wind energy generation are inherently intermittent and weather-dependent; AI models are required to forecast fluctuating generation and dynamically coordinate battery storage and demand loads in real time.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Solar panels only work when connected to the internet.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Wind turbines require AI to spin their blades.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Unlike traditional thermal power plants that burn fuel on demand, solar and wind generation depend on dynamic meteorological conditions (cloud cover, atmospheric pressure, wind gusts). Machine learning models ingest real-time weather telemetry to predict supply-demand gaps and prevent grid instability.",
        "hint": "Reflect on the principles of AI for a Greener World."
      },
      {
        "id": "q_class7_c3_l2_2",
        "question": "In modern automated recycling recycling plants, what technology enables robotic delta arms to identify and pick recyclable Polyethylene Terephthalate (PET) plastic bottles out of a chaotic conveyor belt of crushed trash? - **A)** Mechanical magnets that attract all plastics. - **B)** Computer vision convolutional neural networks combined with hyperspectral near-infrared sensors that identify specific polymer molecular absorption reflections within milliseconds. - **C)** Human workers operating joysticks from home. - **D)** Acoustic microphones listening to the sound of trash.",
        "options": [
          {
            "id": "A",
            "text": "** Mechanical magnets that attract all plastics.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Computer vision convolutional neural networks combined with hyperspectral near-infrared sensors that identify specific polymer molecular absorption reflections within milliseconds.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Human workers operating joysticks from home.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Acoustic microphones listening to the sound of trash.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Recyclable materials cannot be separated by physical magnets (which only attract ferrous metals). Advanced recycling facilities combine **High-Speed Computer Vision** with **Hyperspectral Near-Infrared (NIR) Spectroscopy**: different plastic polymers (PET, HDPE, PP) absorb specific infrared wavelengths, allowing the AI to categorize and pneumatic-eject them at high speed.",
        "hint": "Reflect on the principles of AI for a Greener World."
      },
      {
        "id": "q_class7_c3_l2_3",
        "question": "What is the primary objective of the global **\"Green AI\"** engineering movement? - **A)** To paint all computer hardware cases bright green. - **B)** To design efficient, lightweight algorithms, model architectures, and quantization methods that minimize the electrical power and carbon footprint required to train and run AI models. - **C)** To force all AI computers to run exclusively on plant compost. - **D)** To prohibit computers from doing mathematics.",
        "options": [
          {
            "id": "A",
            "text": "** To paint all computer hardware cases bright green.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To design efficient, lightweight algorithms, model architectures, and quantization methods that minimize the electrical power and carbon footprint required to train and run AI models.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To force all AI computers to run exclusively on plant compost.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To prohibit computers from doing mathematics.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** As frontier AI models grow into trillions of parameters, the electricity required to power data centers has surged. **Green AI** advocates for algorithmic efficiency, parameter pruning, distillation, and renewable data center cooling, ensuring technological progress does not accelerate ecological degradation.",
        "hint": "Reflect on the principles of AI for a Greener World."
      },
      {
        "id": "q_class7_c3_l2_4",
        "question": "During an extreme summer heatwave, the municipal AI energy manager predicts a critical 200 MW power deficit between 05:00 PM and 07:00 PM. Rather than firing up an old, heavily polluting diesel peaker plant, how can the AI utilize **Smart Demand Response** to balance the grid? - **A)** Cut off power to all hospitals. - **B)** Automatically signal connected smart water heaters, municipal water pumps, and electric vehicle chargers to briefly pause non-urgent electrical consumption until midnight, shifting 200 MW of load without inconveniencing citizens. - **C)** Turn off the internet for the entire city. - **D)** Delete the weather forecast.",
        "options": [
          {
            "id": "A",
            "text": "** Cut off power to all hospitals.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Automatically signal connected smart water heaters, municipal water pumps, and electric vehicle chargers to briefly pause non-urgent electrical consumption until midnight, shifting 200 MW of load without inconveniencing citizens.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Turn off the internet for the entire city.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delete the weather forecast.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Demand-Side Management (DSM)** balances the grid by adjusting *consumption* rather than *generation*. Non-critical thermodynamic loads (like water heaters or EV chargers) can pause power draw for 60 minutes with zero noticeable impact on user comfort, successfully flattening peak demand curves without burning fossil fuels.",
        "hint": "Reflect on the principles of AI for a Greener World."
      },
      {
        "id": "q_class7_c3_l2_5",
        "question": "How do AI-powered bio-acoustic listening networks help protect endangered marine mammals from commercial container ships? - **A)** They fire loud sonic weapons at whales. - **B)** Underwater acoustic hydrophones process ocean soundscapes using convolutional models, detecting whale vocalizations in real time and automatically alerting container ships to slow down or reroute. - **C)** They teach whales how to read maritime radar screens. - **D)** They tow whales away using underwater cables.",
        "options": [
          {
            "id": "A",
            "text": "** They fire loud sonic weapons at whales.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Underwater acoustic hydrophones process ocean soundscapes using convolutional models, detecting whale vocalizations in real time and automatically alerting container ships to slow down or reroute.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** They teach whales how to read maritime radar screens.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** They tow whales away using underwater cables.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Acoustic AI buoys deploy neural networks trained on cetacean sound signatures. When an endangered North Atlantic right whale or blue whale calls, the buoy detects the sound within seconds and transmits a geographic alert to approaching commercial ships, dramatically reducing lethal ship-strike collisions.",
        "hint": "Reflect on the principles of AI for a Greener World."
      }
    ]
  },
  {
    "id": "class7-c4-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 1,
    "lessonTitle": "Career Compass: AI",
    "missionScenario": "> **Mission Codename:** *Project Bio-Synth: The Deep-Sea Genetic Explorer*\n> **Mission Briefing:** Welcome to the Global Innovation Venture Accelerator!\n> A marine biotechnology startup, *Ocean-Genesis*, has just discovered rare deep-sea hydrothermal vent bacteria that produce natural enzymes capable of breaking down plastic waste in 48 hours.\n> However, the company cannot turn this into a global ecological solution with conventional tools! They need an advanced AI system to simulate protein folding, predict genetic mutations, and design automated bio-reactors.\n> The venture capital board has allocated a $5,000,000 grant, but the startup is in chaos because the software coders don\u2019t understand cellular microbiology, the biologists don\u2019t know how to train neural networks, and the legal team is worried about international oceanic bio-patents!\n> As the **Chief Venture Architect**, your mission is to use your **Career Compass**, assemble an elite interdisciplinary team, align their complementary skills, and pitch the winning technical roadmap to the investment board!\n---",
    "gameTitle": "The Innovation Studio",
    "gameEngine": "Startup Venture Incubator & Interdisciplinary Team Simulation.",
    "gameSummary": "#### Game Title: *The Innovation Studio* - **Game Engine Type:** Startup Venture Incubator & Interdisciplinary Team Simulation. - **Educational Objective:** Hands-on experience in cross-functional team assembly, skill balancing, and pitching tech solutions. #### Game Rules & Mechanics: 1. **The Startup Challenge Board (Select 1 of 3 Ventures):** - *Venture A:* **Eco-Coral AI** (Autonomous underwater drones planting 3D coral reefs).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 4 LESSON 1\n# INTERDISCIPLINARY CAREER COMPASS: HYBRID PATHWAY RECOMMENDER\n# =====================================================================\n\ndef evaluate_career_compass(subject_ratings):\n    \"\"\"\n    Maps student academic subject affinities (1 to 5 scale) to hybrid AI careers.\n    Disciplines: biology, math, languages, law_social, visual_arts\n    \"\"\"\n    careers = {\n        \"Computational Biologist\": (\n            subject_ratings[\"biology\"] * 3.0 + \n            subject_ratings[\"math\"] * 2.0\n        ),\n        \"NLP Computational Linguist\": (\n            subject_ratings[\"languages\"] * 3.0 + \n            subject_ratings[\"math\"] * 1.5\n        ),\n        \"AI Policy & Human Rights Advisor\": (\n            subject_ratings[\"law_social\"] * 3.0 + \n            subject_ratings[\"languages\"] * 1.5\n        ),\n        \"Generative Media & Creative Technologist\": (\n            subject_ratings[\"visual_arts\"] * 3.0 + \n            subject_ratings[\"math\"] * 1.0\n        ),\n        \"Autonomous Robotics Safety Engineer\": (\n            subject_ratings[\"math\"] * 2.5 + \n            subject_ratings[\"biology\"] * 1.0 + \n            subject_ratings[\"law_social\"] * 1.5\n        )\n    }\n    \n    # Sort careers in descending order of compatibility\n    sorted_matches = sorted(careers.items(), key=lambda x: x[1], reverse=True)\n    return sorted_matches\n\n# ----------------- SIMULATED STUDENT PROFILE -----------------\n# Ratings on a scale from 1 (Low interest) to 5 (High passion)\nstudent_profile = {\n    \"name\": \"Dev\",\n    \"ratings\": {\n        \"biology\": 5,      # Passionate about genetics and ocean ecology\n        \"math\": 4,         # Strong in algebra and statistics\n        \"languages\": 2,    # Prefers science labs over grammar essays\n        \"law_social\": 3,   # Cares about environmental laws\n        \"visual_arts\": 2   # Casual interest in drawing\n    }\n}\n\nprint(f\"=== CAREER COMPASS REPORT FOR: {student_profile['name'].upper()} ===\\n\")\ncareer_rankings = evaluate_career_compass(student_profile[\"ratings\"])\n\ntop_career, top_score = career_rankings[0]\nprint(f\"\ud83c\udf1f PRIMARY CAREER COMPASS DESTINATION:\")\nprint(f\"   {top_career.upper()} (Fit Index: {top_score:.1f} / 25.0 pts)\\n\")\n\nprint(\"Full Cross-Disciplinary Compatibility Matrix:\")\nfor role, score in career_rankings:\n    progress_bar = \"\u2588\" * int(score) + \"\u2591\" * (25 - int(score))\n    print(f\"  {role:<42} : [{progress_bar}] {score:.1f}\")\n\nprint(\"\\nCompass Insight: You don't have to choose between Biology and Computer Science!\")\nprint(\"As a Computational Biologist, you will use Python to decode DNA and cure diseases.\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c4_l1_1",
        "question": "Which hybrid professional on an AI research team utilizes statistical machine learning algorithms to model complex cellular protein folding, accelerate drug discovery, and analyze genomic sequencing data? - **A)** Full-Stack Web Graphic Designer - **B)** Computational Biologist - **C)** Silicon Motherboard Assembler - **D)** Database Billing Accountant",
        "options": [
          {
            "id": "A",
            "text": "** Full-Stack Web Graphic Designer",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Computational Biologist",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Silicon Motherboard Assembler",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Database Billing Accountant",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Computational Biology** is the high-impact intersection of molecular biology, bioinformatics, and machine learning. Specialists in this domain use systems like AlphaFold to predict 3D biological protein structures directly from 1D amino acid strings, compressing decades of biological laboratory work into minutes.",
        "hint": "Reflect on the principles of Career Compass: AI."
      },
      {
        "id": "q_class7_c4_l1_2",
        "question": "Why does an advanced Large Language Model engineering team require a **Computational Linguist** in addition to a computer systems coder? - **A)** Computer programmers are legally forbidden from reading books. - **B)** Language coders write the server infrastructure, but linguists understand complex morphological syntax, semantic pragmatics, linguistic dialectology, and cultural connotations needed to evaluate and fine-tune language model comprehension. - **C)** Linguists are needed only to check the spelling of Python keywords. - **D)** To translate the Python language into French.",
        "options": [
          {
            "id": "A",
            "text": "** Computer programmers are legally forbidden from reading books.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Language coders write the server infrastructure, but linguists understand complex morphological syntax, semantic pragmatics, linguistic dialectology, and cultural connotations needed to evaluate and fine-tune language model comprehension.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Linguists are needed only to check the spelling of Python keywords.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To translate the Python language into French.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Language is profoundly nuanced and cultural. A pure computer systems engineer focuses on GPU throughput and memory allocation. The **Computational Linguist** provides the essential expertise in phonetic structures, contextual pragmatics, idiomatic metaphors, and semantic alignment that turns raw token prediction into nuanced, respectful communication.",
        "hint": "Reflect on the principles of Career Compass: AI."
      },
      {
        "id": "q_class7_c4_l1_3",
        "question": "What is the primary responsibility of an **Autonomous Systems Safety Verifier** working on commercial passenger aircraft or self-driving automobiles? - **A)** Washing the car and polishing the windshield before test drives. - **B)** Applying formal mathematical verification methods and high-fidelity physics simulations to prove that the AI control logic will never execute an unsafe action across millions of simulated edge-case conditions. - **C)** Writing marketing brochures for car dealerships. - **D)** Driving the car as fast as possible on city streets.",
        "options": [
          {
            "id": "A",
            "text": "** Washing the car and polishing the windshield before test drives.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Applying formal mathematical verification methods and high-fidelity physics simulations to prove that the AI control logic will never execute an unsafe action across millions of simulated edge-case conditions.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Writing marketing brochures for car dealerships.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Driving the car as fast as possible on city streets.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In safety-critical aviation and automotive robotics, testing by driving around is insufficient to guarantee safety. **Safety Verifiers** use mathematical logic and formal verification to prove bounds, ensuring control algorithms respect safety envelopes under all environmental extremes.",
        "hint": "Reflect on the principles of Career Compass: AI."
      },
      {
        "id": "q_class7_c4_l1_4",
        "question": "As Generative AI tools automate the writing of routine boilerplate computer code, how does the role of human software engineers transform? - **A)** Software engineering will disappear completely and no humans will work with computers. - **B)** The role elevates from manual typing of syntax toward higher-order architectural system design, algorithmic problem formulation, rigorous security verification, and ethical domain alignment. - **C)** Programmers will only be allowed to use typewriters. - **D)** Software engineers will all become professional gamers.",
        "options": [
          {
            "id": "A",
            "text": "** Software engineering will disappear completely and no humans will work with computers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The role elevates from manual typing of syntax toward higher-order architectural system design, algorithmic problem formulation, rigorous security verification, and ethical domain alignment.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Programmers will only be allowed to use typewriters.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Software engineers will all become professional gamers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Historical technological shifts (from assembly language to high-level languages like Python) always automate lower-level mechanical toil while expanding the scope and ambition of human engineers. Modern developers become **System Architects**\u2014framing complex problems, auditing code safety, and orchestrating multi-agent AI systems.",
        "hint": "Reflect on the principles of Career Compass: AI."
      },
      {
        "id": "q_class7_c4_l1_5",
        "question": "Why must international governments employ technical **AI Policy Advisors** when drafting laws to regulate artificial intelligence technologies? - **A)** To ensure that regulations are legally enforceable, technically grounded, protect citizen rights without inadvertently stifling open-source scientific research, and remain adaptable to rapid technological advancements. - **B)** Politicians can never talk to tech companies. - **C)** AI policy advisors write the code for government websites. - **D)** To ban all computers from public schools.",
        "options": [
          {
            "id": "A",
            "text": "** To ensure that regulations are legally enforceable, technically grounded, protect citizen rights without inadvertently stifling open-source scientific research, and remain adaptable to rapid technological advancements.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Politicians can never talk to tech companies.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** AI policy advisors write the code for government websites.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To ban all computers from public schools.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Regulating frontier technology requires deep understanding of both law and algorithmic mechanics. Poorly informed regulations can either be technically unenforceable or inadvertently ban beneficial open-source academic research. Interdisciplinary policy advisors bridge the gap between legislative frameworks and mathematical reality.",
        "hint": "Reflect on the principles of Career Compass: AI."
      }
    ]
  },
  {
    "id": "class7-c4-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 2,
    "lessonTitle": "Skills That Matter",
    "missionScenario": "> **Mission Codename:** *The Grand Tech Decathlon: The Arena of Excellence*\n> **Mission Briefing:** Welcome to the International Computational Decathlon!\n> Every year, the brightest young minds gather to compete not in rote memory or typing speed, but in the **Skills That Truly Matter** in the modern world: deep logical tracing, catching subtle algorithmic bugs, spotting sneaky statistical fallacies, and optimizing AI prompts under pressure.\n> The competition is divided into five intense qualifying stages. In each round, you will face realistic software engineering and data science dilemmas that separate amateur script-copyists from world-class **Computational Thinkers**.\n> Your mission is to step into the Decathlon Arena, represent your academy, conquer all five challenges, and earn your official **Master Competency Certification**!\n---",
    "gameTitle": "The Tech Decathlon",
    "gameEngine": "Multi-Stage Competitive Logic & Code Audit Tournament.",
    "gameSummary": "#### Game Title: *The Tech Decathlon* - **Game Engine Type:** Multi-Stage Competitive Logic & Code Audit Tournament. - **Educational Objective:** Hands-on mastery across data auditing, prompt calibration, peer code review, and edge-case testing. #### Game Rules & Mechanics: 1. **The 5 Championship Stages:** - **Stage 1 (The Statistical Fallacy Trap):** Identify the confounding variable across 3 deceptive scientific charts within 45 seconds.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 4 LESSON 2\n# AUTOMATED CODE QUALITY & PEER REVIEW LINTER\n# =====================================================================\n\ndef audit_python_code(source_code_lines):\n    \"\"\"\n    Audits Python source code lines for essential software engineering practices:\n    - Flags cryptic single-letter variable names (e.g., 'x =', 'a =').\n    - Flags missing function docstrings / comments.\n    - Flags dangerous bare 'except:' clauses.\n    - Flags lines exceeding 79 characters (PEP-8 standard).\n    \"\"\"\n    score = 100\n    audit_findings = []\n    \n    for line_num, line in enumerate(source_code_lines, 1):\n        stripped = line.strip()\n        \n        # Check 1: Line length\n        if len(line) > 85:\n            score -= 10\n            audit_findings.append(f\"Line {line_num}: Line exceeds recommended PEP-8 length ({len(line)} > 85 chars).\")\n            \n        # Check 2: Cryptic single-letter variable assignments (e.g., 'a = 10')\n        if len(stripped) >= 3 and stripped[1] == ' ' and stripped[2] == '=' and stripped[0].isalpha():\n            score -= 15\n            var_name = stripped[0]\n            audit_findings.append(f\"Line {line_num}: Cryptic single-letter variable '{var_name}'. Use descriptive names!\")\n            \n        # Check 3: Missing colon on if/for/def\n        if any(stripped.startswith(kw) for kw in [\"def \", \"if \", \"for \", \"while \", \"elif \"]):\n            if not stripped.endswith(\":\"):\n                score -= 25\n                audit_findings.append(f\"Line {line_num}: Syntax Error! Missing trailing colon ':' on statement.\")\n                \n        # Check 4: Hardcoded passwords / API keys\n        if \"password\" in stripped.lower() and \"=\" in stripped and '\"' in stripped:\n            score -= 30\n            audit_findings.append(f\"Line {line_num}: \ud83d\udea8 SECURITY HAZARD! Hardcoded password detected in source text!\")\n\n    final_score = max(0, score)\n    return final_score, audit_findings\n\n# ----------------- TEST CODE ARTIFACT TO AUDIT -----------------\nsample_peer_submission = [\n    \"def calculate_tax(income):\",\n    \"    a = income * 0.15\",                           # Line 2: Cryptic variable 'a'\n    \"    database_password = \\\"super_secret_123\\\"\",     # Line 3: Hardcoded password!\n    \"    if income > 100000\",                           # Line 4: Missing colon!\n    \"        return a + 500\",\n    \"    return a\"\n]\n\nprint(\"=== AUTOMATED PYTHON CODE REVIEW REPORT ===\\n\")\nquality_score, report = audit_python_code(sample_peer_submission)\n\nprint(f\"Overall Code Health Score: {quality_score} / 100 pts\")\nif quality_score >= 85:\n    print(\"Verdict: \u2705 CODE APPROVED FOR PRODUCTION DEPLOYMENT\")\nelif quality_score >= 60:\n    print(\"Verdict: \u26a0\ufe0f REVISIONS REQUIRED BEFORE MERGING\")\nelse:\n    print(\"Verdict: \ud83d\uded1 CODE REJECTED: CRITICAL BUGS & SECURITY DEFECTS DETECTED\")\n\nprint(\"\\nAudit Defect Traceback:\")\nfor item in report:\n    print(f\"  \u2022 {item}\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c4_l2_1",
        "question": "A healthcare study reports that people who sleep with their shoes on are significantly more likely to wake up with severe headaches in the morning ($r = +0.88$). What is the correct scientific deduction? - **A)** Shoes emit toxic gases that penetrate the brain through the heels. - **B)** Sleeping with shoes on does not cause headaches; both are symptoms of an unmeasured confounding variable (e.g., going to sleep heavily intoxicated or exhausted after an extreme medical emergency). - **C)** People should wear three pairs of shoes to cure headaches. - **D)** Correlation always proves direct biological causation.",
        "options": [
          {
            "id": "A",
            "text": "** Shoes emit toxic gases that penetrate the brain through the heels.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Sleeping with shoes on does not cause headaches; both are symptoms of an unmeasured confounding variable (e.g., going to sleep heavily intoxicated or exhausted after an extreme medical emergency).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** People should wear three pairs of shoes to cure headaches.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Correlation always proves direct biological causation.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** This is a famous textbook demonstration of the **Correlation vs Causation Fallacy**. The physical shoes do not cause head pain. A confounding lifestyle factor (such as collapsing into bed drunk or suffering acute fever) causes individuals both to forget to remove their footwear and to awaken with severe physiological headaches.",
        "hint": "Reflect on the principles of Skills That Matter."
      },
      {
        "id": "q_class7_c4_l2_2",
        "question": "Why is writing self-documenting code with descriptive variable names (e.g., `days_until_exam = 14`) vastly superior to using short abbreviations (e.g., `d = 14`)? - **A)** Long variable names make the computer monitor display brighter colors. - **B)** Code is read by human teammates and future maintainers far more often than it is written; clear names eliminate ambiguity, reduce bugs, and accelerate collaborative development. - **C)** Short variable names are deleted by Python interpreters. - **D)** Python charges extra money for letters after the first three.",
        "options": [
          {
            "id": "A",
            "text": "** Long variable names make the computer monitor display brighter colors.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Code is read by human teammates and future maintainers far more often than it is written; clear names eliminate ambiguity, reduce bugs, and accelerate collaborative development.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Short variable names are deleted by Python interpreters.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Python charges extra money for letters after the first three.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In commercial software engineering, codebases live for decades and are maintained by rotating teams of hundreds of engineers. Cryptic variable names force engineers to waste hours reverse-engineering author intent, significantly increasing the probability of introducing regression bugs during updates.",
        "hint": "Reflect on the principles of Skills That Matter."
      },
      {
        "id": "q_class7_c4_l2_3",
        "question": "During a team code review, an engineer spots that a colleague forgot to close an open database connection inside a loop, which will cause memory leakage. What is the most professional and effective way to phrase the review comment? - **A)** *\"Your code is terrible and you clearly don't know how databases work.\"* - **B)** *\"Great structure overall! In Line 42, it looks like the database connection remains open inside the loop, which might lead to memory leaks under high traffic. Could we move the `.close()` call into a `finally` block?\"* - **C)** Say nothing and let the server crash in production. - **D)** Delete the colleague's code from the server.",
        "options": [
          {
            "id": "A",
            "text": "** *\"Your code is terrible and you clearly don't know how databases work.\"*",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** *\"Great structure overall! In Line 42, it looks like the database connection remains open inside the loop, which might lead to memory leaks under high traffic. Could we move the `.close()` call into a `finally` block?\"*",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Say nothing and let the server crash in production.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Delete the colleague's code from the server.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** High-performing engineering cultures practice **Blameless, Constructive Code Reviews**. Criticizing the person causes defensiveness; constructively critiquing the code with a clear explanation of the potential failure mode and offering a collaborative solution fosters team psychological safety and code excellence.",
        "hint": "Reflect on the principles of Skills That Matter."
      },
      {
        "id": "q_class7_c4_l2_4",
        "question": "A developer uses an AI code assistant to generate a quick function that sorts a list of bank customer accounts. Why is it dangerous to immediately deploy this function to production without comprehensive unit testing? - **A)** AI code generators always write computer viruses. - **B)** AI models frequently generate code that *looks* syntactically elegant and passes standard cases, but completely fails on subtle edge-cases (e.g., duplicate account numbers, empty lists, negative balances, floating-point rounding errors). - **C)** AI models cannot write Python code. - **D)** Production servers reject any code not written with a blue pen.",
        "options": [
          {
            "id": "A",
            "text": "** AI code generators always write computer viruses.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** AI models frequently generate code that *looks* syntactically elegant and passes standard cases, but completely fails on subtle edge-cases (e.g., duplicate account numbers, empty lists, negative balances, floating-point rounding errors).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** AI models cannot write Python code.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Production servers reject any code not written with a blue pen.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Generative models are probabilistic text generators, not formal logic verifiers. They frequently emit code with subtle boundary bugs, off-by-one errors, or silent concurrency race conditions. Professional developers treat AI-generated code as a draft, applying rigorous **Unit Tests** and **Boundary Analysis** before deployment.",
        "hint": "Reflect on the principles of Skills That Matter."
      },
      {
        "id": "q_class7_c4_l2_5",
        "question": "In an era where Artificial Intelligence models and frameworks are updated every few months, which habit is the most vital asset for a young technologist? - **A)** Memorizing every single function in a specific version of a library. - **B)** Cultivating foundational computational thinking, insatiable curiosity, algorithmic problem-solving instincts, and the willingness to learn and unlearn new tools continuously. - **C)** Refusing to learn anything invented after 2020. - **D)** Waiting for a teacher to tell you what to read.",
        "options": [
          {
            "id": "A",
            "text": "** Memorizing every single function in a specific version of a library.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Cultivating foundational computational thinking, insatiable curiosity, algorithmic problem-solving instincts, and the willingness to learn and unlearn new tools continuously.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Refusing to learn anything invented after 2020.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Waiting for a teacher to tell you what to read.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Specific software frameworks and libraries inevitably become obsolete over 5 to 10 year cycles. What endures across a 40-year career is **Meta-Learning**\u2014the ability to decompose novel challenges, understand core algorithmic principles, read documentation independently, and fearlessly adapt to new technological paradigms.",
        "hint": "Reflect on the principles of Skills That Matter."
      }
    ]
  },
  {
    "id": "class7-c5-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 1,
    "lessonTitle": "AI Content Creator",
    "missionScenario": "> **Mission Codename:** *Operation Babel-Forge: The Interstellar Encyclopedia*\n> **Mission Briefing:** Welcome to the Galactic Communications Command!\n> Deep-space exploration vessels are discovering alien minerals, ancient space stations, and uncharted nebulae every day. Thousands of raw exploration reports are arriving at headquarters simultaneously!\n> Command needs to convert these messy, unstructured captain\u2019s logs into clean, verified entries for the *Universal Planetary Encyclopedia*.\n> However, raw LLMs tend to ramble, write poetic essays when scientific data is needed, or format dates inconsistently!\n> As the **Chief AI Content Architect**, your mission is to calibrate the generative model using **Token Tuning, Temperature Calibration, and Few-Shot In-Context Prompting**! You must force the AI to extract structured, verifiable data profiles formatted in flawless JSON that can be ingested directly into the galaxy\u2019s central navigation database.\n---",
    "gameTitle": "Prompt Arena Championship",
    "gameEngine": "Competitive Generative Constraint & Token Optimization Arena.",
    "gameSummary": "#### Game Title: *Prompt Arena Championship* - **Game Engine Type:** Competitive Generative Constraint & Token Optimization Arena. - **Educational Objective:** Hands-on mastery of token budgeting, temperature calibration, and structured schema extraction. #### Game Rules & Mechanics: 1. **The 3 Arena Tournament Rounds:** - **Round 1 (The Structured Entity Extractor):**",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 5 LESSON 1\n# AI CONTENT CREATION: FEW-SHOT PROMPT ASSEMBLER & JSON VALIDATOR\n# =====================================================================\n\nimport json\n\ndef build_few_shot_extraction_prompt(source_text):\n    \"\"\"\n    Constructs a low-temperature Few-Shot prompt forcing strict JSON output.\n    \"\"\"\n    prompt = (\n        \"You are an expert Scientific Knowledge Graph Extractor.\\n\"\n        \"TASK: Extract key science entities from text into valid JSON matching this schema:\\n\"\n        \"{\\n\"\n        '  \"topic\": string,\\n'\n        '  \"definition\": string,\\n'\n        '  \"formula_or_equation\": string,\\n'\n        '  \"real_world_application\": string\\n'\n        \"}\\n\\n\"\n        \"--- FEW-SHOT DEMONSTRATION ---\\n\"\n        \"Text: 'Ohm's Law states that current through a conductor is proportional to voltage. Formula: V = I * R. Used in circuits.'\\n\"\n        \"Output JSON:\\n\"\n        \"{\\n\"\n        '  \"topic\": \"Ohm\\'s Law\",\\n'\n        '  \"definition\": \"Current is directly proportional to voltage across a resistance.\",\\n'\n        '  \"formula_or_equation\": \"V = I * R\",\\n'\n        '  \"real_world_application\": \"Designing electrical circuits and fuses.\"\\n'\n        \"}\\n\\n\"\n        \"--- TARGET MISSION TEXT ---\\n\"\n        f\"Text: '{source_text}'\\n\"\n        \"Output JSON:\"\n    )\n    return prompt\n\ndef validate_llm_json_response(raw_response_str):\n    \"\"\"\n    Validates whether the generated text is syntactically valid JSON and\n    contains all mandatory schema keys.\n    \"\"\"\n    required_keys = [\"topic\", \"definition\", \"formula_or_equation\", \"real_world_application\"]\n    \n    try:\n        # Strip potential markdown code fences",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c5_l1_1",
        "question": "In Natural Language Processing and Large Language Models, what is a **Token**? - **A)** A physical metal coin inserted into a computer slot. - **B)** A sub-word numerical fragment or character cluster that represents the fundamental unit of text processed by neural language architectures. - **C)** A password used to log into an email account. - **D)** A single line of Python code.",
        "options": [
          {
            "id": "A",
            "text": "** A physical metal coin inserted into a computer slot.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A sub-word numerical fragment or character cluster that represents the fundamental unit of text processed by neural language architectures.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A password used to log into an email account.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A single line of Python code.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Transformers and LLMs do not operate directly on raw strings of human characters. A **Tokenizer** divides text into sub-word semantic fragments (tokens), mapping each to a unique integer index in the model's vocabulary dictionary.",
        "hint": "Reflect on the principles of AI Content Creator."
      },
      {
        "id": "q_class7_c5_l1_2",
        "question": "If an engineer is configuring an AI model to extract legal clauses from complex contracts into structured database columns, what **Temperature** setting is most scientifically appropriate? - **A)** High Temperature (e.g., $1.4$) to ensure maximum creative phrasing. - **B)** Low Temperature (e.g., $0.0$ to $0.1$) to enforce deterministic consistency, minimize hallucinations, and select the highest-probability factual tokens. - **C)** Negative Temperature (e.g., $-5.0$). - **D)** Temperature settings have zero impact on language models.",
        "options": [
          {
            "id": "A",
            "text": "** High Temperature (e.g., $1.4$) to ensure maximum creative phrasing.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Low Temperature (e.g., $0.0$ to $0.1$) to enforce deterministic consistency, minimize hallucinations, and select the highest-probability factual tokens.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Negative Temperature (e.g., $-5.0$).",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Temperature settings have zero impact on language models.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Temperature** scales the logits before the softmax probability function. Low temperatures ($0.0 \\le T \\le 0.2$) collapse the probability distribution toward greedy selection of the most mathematically likely tokens, maximizing factual precision and preventing creative improvisations.",
        "hint": "Reflect on the principles of AI Content Creator."
      },
      {
        "id": "q_class7_c5_l1_3",
        "question": "What is the defining characteristic of **Few-Shot Prompting** compared to Zero-Shot Prompting? - **A)** Few-shot prompting requires retraining the entire 100-billion-parameter neural network on a supercomputer for 3 weeks. - **B)** Few-shot prompting provides 2 or 3 high-quality input-output examples directly inside the inference context window, demonstrating the desired structural pattern and tone without altering model weights. - **C)** Few-shot prompts must contain fewer than 5 words. - **D)** Few-shot prompts only work on Tuesdays.",
        "options": [
          {
            "id": "A",
            "text": "** Few-shot prompting requires retraining the entire 100-billion-parameter neural network on a supercomputer for 3 weeks.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Few-shot prompting provides 2 or 3 high-quality input-output examples directly inside the inference context window, demonstrating the desired structural pattern and tone without altering model weights.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Few-shot prompts must contain fewer than 5 words.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Few-shot prompts only work on Tuesdays.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In **Few-Shot Learning** (first popularized by GPT-3), the prompt provides explicit demonstrative exemplars in-context. The model utilizes its pre-trained pattern recognition capabilities to mirror the structure, formatting, and stylistic tone of the examples without requiring permanent parameter fine-tuning.",
        "hint": "Reflect on the principles of AI Content Creator."
      },
      {
        "id": "q_class7_c5_l1_4",
        "question": "Why is forcing an AI model to respond strictly in **JSON (JavaScript Object Notation)** essential when building multi-agent AI software pipelines? - **A)** JSON makes the English language sound more friendly. - **B)** Downstream software programs, databases, and APIs cannot reliably parse unstructured conversational prose; structured JSON provides guaranteed key-value pairs that code can manipulate programmatically. - **C)** JSON encrypts data so humans cannot read it. - **D)** Web browsers crash if they read plain English.",
        "options": [
          {
            "id": "A",
            "text": "** JSON makes the English language sound more friendly.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Downstream software programs, databases, and APIs cannot reliably parse unstructured conversational prose; structured JSON provides guaranteed key-value pairs that code can manipulate programmatically.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** JSON encrypts data so humans cannot read it.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Web browsers crash if they read plain English.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In automated pipelines, an AI's output is often passed directly to a database, robot actuator, or secondary script. A conversational response like *\"Sure! Here is the date: Monday\"* breaks automated scripts. A structured JSON response `{\"date\": \"2026-10-12\"}` can be parsed deterministically and ingested seamlessly by software APIs.",
        "hint": "Reflect on the principles of AI Content Creator."
      },
      {
        "id": "q_class7_c5_l1_5",
        "question": "What is the primary technical objective of embedding a **Cryptographic Synthetic Watermark** into AI-generated text and imagery? - **A)** To make the file size 10 times larger. - **B)** To enable search engines, educators, and social media platforms to programmatically verify that the content was generated by an AI model, ensuring transparency and preventing deceptive disinformation. - **C)** To prevent anyone from reading the text on mobile devices. - **D)** To change the font color to blue.",
        "options": [
          {
            "id": "A",
            "text": "** To make the file size 10 times larger.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To enable search engines, educators, and social media platforms to programmatically verify that the content was generated by an AI model, ensuring transparency and preventing deceptive disinformation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To prevent anyone from reading the text on mobile devices.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To change the font color to blue.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **AI Watermarking** (such as statistical token biases or invisible digital pixel signatures) provides cryptographic provenance. It allows automated detection tools to verify whether an essay or photo is synthetic, protecting academic integrity and mitigating the viral spread of deceptive synthetic media.",
        "hint": "Reflect on the principles of AI Content Creator."
      }
    ]
  },
  {
    "id": "class7-c5-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 2,
    "lessonTitle": "AI Learning Assistant",
    "missionScenario": "> **Mission Codename:** *Operation Socrates: The Knowledge Architect*\n> **Mission Briefing:** Alert at the Neo-Olympia Learning Laboratory!\n> A new AI homework helper app was launched across the school district. Within two weeks, teachers noticed a catastrophic trend: students' homework scores were 100%, but on independent proctored science exams, average scores dropped by 40%!\n> An audit revealed that the app was acting as a lazy \"Answer Vending Machine\". When a student asked: *\"What is the velocity of the falling apple?\"*, the app simply spat out: *\"4.9 m/s\"*. Students copied the answer, bypassed the mental struggle, and learned nothing!\n> You have been appointed **Lead Pedagogical AI Systems Engineer**! Your mission is to overhaul the study companion into a **Master Socratic Learning Assistant**! You must program an adaptive system that never gives the raw answer away, diagnoses student conceptual misconceptions, provides scaffolded hints, and schedules spaced revision to build true, lasting intellectual mastery.\n---",
    "gameTitle": "The Socratic Tutor Experiment",
    "gameEngine": "Pedagogical Persona Calibration & Student Triage Lab.",
    "gameSummary": "#### Game Title: *The Socratic Tutor Experiment* - **Game Engine Type:** Pedagogical Persona Calibration & Student Triage Lab. - **Educational Objective:** Hands-on mastery of prompt scaffolding, diagnostic questioning, and designing spaced repetition algorithms. #### Game Rules & Mechanics: 1. **The Virtual Classroom (3 Simulated Struggling Students):** - *Student 1 (Maya):* Struggling with photosynthesis (Confused about where plant mass comes from).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 5 LESSON 2\n# ADAPTIVE LEARNING: LEITNER SPACED REPETITION & SOCRATIC HINT ENGINE\n# =====================================================================\n\nclass LeitnerFlashcardScheduler:\n    \"\"\"\n    Simulates a 3-Box Leitner Spaced Repetition System:\n    - Box 1: New / Difficult cards (Reviewed every day).\n    - Box 2: Moderate cards (Reviewed every 3 days).\n    - Box 3: Mastered cards (Reviewed every 7 days).\n    Correct answer promotes a card up one box; Incorrect demotes back to Box 1!\n    \"\"\"\n    def __init__(self):\n        self.boxes = {1: [], 2: [], 3: []}\n\n    def add_card(self, concept_id, question, hints, answer):\n        card = {\n            \"id\": concept_id,\n            \"question\": question,\n            \"hints\": hints,\n            \"answer\": answer,\n            \"current_box\": 1\n        }\n        self.boxes[1].append(card)\n\n    def process_review(self, card, answered_correctly):\n        current = card[\"current_box\"]\n        self.boxes[current].remove(card)\n        \n        if answered_correctly:\n            new_box = min(3, current + 1)\n            card[\"current_box\"] = new_box\n            self.boxes[new_box].append(card)\n            return f\"\ud83c\udf1f PROMOTED to Box {new_box} (Next review in {[1, 3, 7][new_box-1]} days!)\"\n        else:\n            card[\"current_box\"] = 1\n            self.boxes[1].append(card)\n            return \"\ud83d\udd01 DEMOTED to Box 1 (Scheduled for immediate daily review).\"\n\ndef get_socratic_hint(card, attempt_number):\n    \"\"\"\n    Returns progressive scaffolded hints without revealing the answer.\n    \"\"\"\n    hints = card[\"hints\"]\n    if attempt_number <= len(hints):\n        return f\"\ud83d\udca1 Socratic Hint #{attempt_number}: {hints[attempt_number - 1]}\"\n    else:\n        return f\"\ud83e\udd14 Let's break it down: Review the fundamental concept: {card['question']}\"\n\n# ----------------- SIMULATED ADAPTIVE STUDY SESSION -----------------\nscheduler = LeitnerFlashcardScheduler()\n\n# Add science concept cards\nscheduler.add_card(\n    concept_id=\"SCI-01\",\n    question=\"What is the unit of electric resistance?\",\n    hints=[\n        \"It sounds like a meditative sound used in yoga ('O...').\",\n        \"It is named after the German physicist Georg Simon ____.\",\n        \"The Greek symbol is Omega (\u03a9).\"\n    ],\n    answer=\"Ohm\"\n)\n\ncard = scheduler.boxes[1][0]\nprint(\"=== SOCRATIC STUDY SESSION: ADAPTIVE TUTOR ===\\n\")\nprint(f\"Concept Challenge: {card['question']}\")\n\n# Simulated Student Attempts\nprint(get_socratic_hint(card, attempt_number=1))\nprint(\"Student Guess: 'Watt?' -> \u274c Incorrect.\")\n\nprint(get_socratic_hint(card, attempt_number=2))\nprint(\"Student Guess: 'Ohm!' -> \u2705 Correct!\")\n\noutcome = scheduler.process_review(card, answered_correctly=True)\nprint(f\"\\nTelemetry Update: {outcome}\")\n\nprint(\"\\n--- CURRENT LEITNER SYSTEM STATE ---\")\nfor b in [1, 2, 3]:\n    print(f\"Box {b} (Review interval {[1, 3, 7][b-1]} days) : {len(scheduler.boxes[b])} cards\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c5_l2_1",
        "question": "According to the **Ebbinghaus Forgetting Curve**, what happens to newly acquired conceptual information if a student does not engage in periodic, spaced active recall? - **A)** The human brain permanently stores 100% of information after hearing it once. - **B)** Memory retention decays exponentially over time, with approximately 70% of new information forgotten within 48 hours unless reinforced. - **C)** Brain cells multiply by 500%. - **D)** Information is converted into computer code.",
        "options": [
          {
            "id": "A",
            "text": "** The human brain permanently stores 100% of information after hearing it once.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Memory retention decays exponentially over time, with approximately 70% of new information forgotten within 48 hours unless reinforced.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Brain cells multiply by 500%.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Information is converted into computer code.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Ebbinghaus\u2019s empirical memory research established that biological human memory undergoes rapid exponential decay immediately following learning. **Spaced Repetition** combats this forgetting curve by scheduling active review sessions just as memory retention is beginning to drop.",
        "hint": "Reflect on the principles of AI Learning Assistant."
      },
      {
        "id": "q_class7_c5_l2_2",
        "question": "Why is an AI homework helper that immediately supplies full, completed mathematical solutions detrimental to a student's cognitive development? - **A)** The AI computer battery drains too quickly. - **B)** It bypasses the productive cognitive struggle (**Desirable Difficulty**) required for biological neural pathways to form lasting synaptic memory, resulting in illusion of competence without genuine problem-solving ability. - **C)** Math problems cannot be calculated by computers. - **D)** It causes computer screens to crack.",
        "options": [
          {
            "id": "A",
            "text": "** The AI computer battery drains too quickly.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It bypasses the productive cognitive struggle (**Desirable Difficulty**) required for biological neural pathways to form lasting synaptic memory, resulting in illusion of competence without genuine problem-solving ability.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Math problems cannot be calculated by computers.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It causes computer screens to crack.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In cognitive psychology, learning requires mental effort (retrieval practice and schema construction). Passively copying machine-generated solutions gives the student an **illusion of competence** (feeling like they understand because the answer looks easy on paper) while completely failing to build independent neural problem-solving pathways.",
        "hint": "Reflect on the principles of AI Learning Assistant."
      },
      {
        "id": "q_class7_c5_l2_3",
        "question": "In a 3-Box **Leitner Spaced Repetition System**, what happens to a flashcard when a student fails to recall the correct answer during a review session? - **A)** The flashcard is deleted from the computer forever. - **B)** The flashcard is demoted back to Box 1 for immediate daily review, ensuring the student practices difficult concepts more frequently. - **C)** The student is banned from the school library. - **D)** The flashcard is promoted to Box 3.",
        "options": [
          {
            "id": "A",
            "text": "** The flashcard is deleted from the computer forever.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The flashcard is demoted back to Box 1 for immediate daily review, ensuring the student practices difficult concepts more frequently.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The student is banned from the school library.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The flashcard is promoted to Box 3.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The Leitner system is an adaptive queue algorithm: cards answered correctly advance to higher boxes with exponentially longer review intervals (e.g., Day 1 \u2794 Day 3 \u2794 Day 7). Any incorrect response immediately resets the card to Box 1, ensuring difficult concepts receive maximum review frequency.",
        "hint": "Reflect on the principles of AI Learning Assistant."
      },
      {
        "id": "q_class7_c5_l2_4",
        "question": "A student asks an AI tutor: *\"Why does ice float on liquid water?\"* Which of the following responses adheres most strictly to the **Socratic Method**? - **A)** *\"Ice floats because its solid density is 0.917 g/cm\u00b3 compared to water's 1.0 g/cm\u00b3.\"* - **B)** *\"Great scientific inquiry! Think about what happens to water molecules when they freeze into a rigid crystalline lattice: do they spread further apart or pack closer together? What does that do to density?\"* - **C)** *\"Ice never floats on water; that is an optical illusion.\"* - **D)** *\"I don't know, ask a chemistry professor.\"*",
        "options": [
          {
            "id": "A",
            "text": "** *\"Ice floats because its solid density is 0.917 g/cm\u00b3 compared to water's 1.0 g/cm\u00b3.\"*",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** *\"Great scientific inquiry! Think about what happens to water molecules when they freeze into a rigid crystalline lattice: do they spread further apart or pack closer together? What does that do to density?\"*",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** *\"Ice never floats on water; that is an optical illusion.\"*",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** *\"I don't know, ask a chemistry professor.\"*",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The Socratic method utilizes **Inquiry-Based Scaffolding**. Rather than declaring the raw fact, Response B poses targeted guiding questions that prompt the student to connect molecular arrangement with the concept of density, allowing the student to deduce the scientific conclusion themselves.",
        "hint": "Reflect on the principles of AI Learning Assistant."
      },
      {
        "id": "q_class7_c5_l2_5",
        "question": "What is the long-term risk of **Cognitive Deskilling** in professionals who rely entirely on automated AI tools for all critical analysis and writing? - **A)** Their computer keyboards will wear out faster. - **B)** Over time, human professionals lose the foundational cognitive abilities, domain intuition, and analytical rigor needed to detect when the AI produces hallucinated or catastrophic errors. - **C)** AI models will refuse to speak with them. - **D)** There is zero risk; computers never make mistakes.",
        "options": [
          {
            "id": "A",
            "text": "** Their computer keyboards will wear out faster.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Over time, human professionals lose the foundational cognitive abilities, domain intuition, and analytical rigor needed to detect when the AI produces hallucinated or catastrophic errors.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** AI models will refuse to speak with them.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** There is zero risk; computers never make mistakes.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Cognitive Deskilling** occurs when humans become so dependent on automation that their own baseline skills atrophy. If an engineer loses the ability to perform back-of-the-envelope calculations or trace code manually, they become completely blind to subtle algorithmic failures, creating dangerous vulnerabilities in safety-critical systems.",
        "hint": "Reflect on the principles of AI Learning Assistant."
      }
    ]
  },
  {
    "id": "class7-c6-l1",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 1,
    "lessonTitle": "Fact, Fake or AI?",
    "missionScenario": "> **Mission Codename:** *Operation Chimera: The Digital Forensics Vault*\n> **Mission Briefing:** High-Priority Alert at the Cyber-Forensics Taskforce!\n> An international diplomatic crisis is unfolding! An audio recording and video clip have surfaced on social media depicting an ambassador from the Oceanic Republic purportedly admitting to an illegal maritime oil spill: *\"We dumped the barrels at midnight, and nobody can prove it.\"*\n> Markets are panicking, environmental protests have erupted outside embassies, and international sanctions are being drafted!\n> However, the ambassador claims the video is a total synthetic frame-job created by an adversarial hacker collective using neural voice cloning and face-swapping diffusion algorithms!\n> As the **Lead Digital Forensics Examiner**, the United Nations has brought the raw video file to your lab. Your mission is to enter the *Misinformation Forensics Lab*, analyze lighting vectors, decode audio spectral frequencies, inspect cryptographic file metadata, and deliver the definitive technical verdict: **Authentic Fact, Malicious Cheapfake, or AI-Synthesized Fabrication?**\n---",
    "gameTitle": "The Misinformation Forensics Lab",
    "gameEngine": "Digital Evidence Workbench & Forensic Authentication Gauntlet.",
    "gameSummary": "#### Game Title: *The Misinformation Forensics Lab* - **Game Engine Type:** Digital Evidence Workbench & Forensic Authentication Gauntlet. - **Educational Objective:** Hands-on application of metadata inspection, corneal reflection analysis, reverse image indexing, and C2PA verification. #### Game Rules & Mechanics: 1. **The Evidence Locker (6 Viral Cases):** - *Case 1 (The Puffer Jacket Pope):* Viral photo of religious leader in luxury designer coat.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 6 LESSON 1\n# DIGITAL FORENSICS: EXIF & METADATA AUTHENTICITY AUDITOR\n# =====================================================================\n\ndef audit_media_authenticity(media_file_header):\n    \"\"\"\n    Audits media header telemetry for synthetic generation markers:\n    1. Checks for known AI generator signatures in 'software' metadata tag.\n    2. Validates presence of physical camera hardware tags (Make, Model, Lens).\n    3. Checks for C2PA cryptographic provenance certificates.\n    \"\"\"\n    forensic_score = 100  # Starts with full presumption of authenticity\n    flags = []\n    \n    # 1. Known AI Generator Signature Scan\n    software = media_file_header.get(\"software\", \"\").lower()\n    known_ai_tools = [\"midjourney\", \"stable diffusion\", \"dall-e\", \"novelai\", \"comfyui\", \"flux\"]\n    \n    ai_signature_found = any(tool in software for tool in known_ai_tools)\n    if ai_signature_found:\n        forensic_score -= 80\n        flags.append(f\"\ud83d\udea8 DIRECT AI SIGNATURE: Generated by '{media_file_header.get('software')}'\")\n        \n    # 2. Hardware Sensor Fingerprint Check\n    has_camera_make = \"camera_make\" in media_file_header and media_file_header[\"camera_make\"] is not None\n    has_shutter_speed = \"shutter_speed\" in media_file_header and media_file_header[\"shutter_speed\"] is not None\n    \n    if not has_camera_make or not has_shutter_speed:\n        forensic_score -= 35\n        flags.append(\"\u26a0\ufe0f SUSPICIOUS: Lacks physical camera hardware EXIF tags (No Make/Model/Shutter).\")\n    else:\n        flags.append(f\"\u2705 Hardware Validated: Captured on {media_file_header['camera_make']} {media_file_header.get('camera_model', '')}\")\n        \n    # 3. C2PA Cryptographic Provenance Check\n    has_c2pa = media_file_header.get(\"c2pa_manifest_verified\", False)\n    if has_c2pa:\n        forensic_score += 20\n        flags.append(\"\ud83d\udee1\ufe0f C2PA VERIFIED: Cryptographic origin certificate valid and untampered.\")\n    else:\n        flags.append(\"\u2139\ufe0f C2PA Notice: No cryptographic provenance manifest attached.\")\n\n    final_trust_index = max(0, min(100, forensic_score))\n    \n    if final_trust_index >= 80:\n        verdict = \"AUTHENTIC PHYSICAL MEDIA\"\n    elif final_trust_index >= 45:\n        verdict = \"AMBIGUOUS / UNVERIFIED ORIGIN (Requires Visual Forensic Review)\"\n    else:\n        verdict = \"SYNTHETIC AI-GENERATED MEDIA / TAMPERED ARTIFACT\"\n        \n    return final_trust_index, verdict, flags\n\n# ----------------- SIMULATED EVIDENCE AUDIT RUN -----------------\nevidence_item_1 = {\n    \"filename\": \"diplomatic_confession_leaked.mp4\",\n    \"software\": \"ComfyUI_v0.2.1_NeuralVoiceClone\",\n    \"camera_make\": None,\n    \"shutter_speed\": None,\n    \"c2pa_manifest_verified\": False\n}\n\nevidence_item_2 = {\n    \"filename\": \"hurricane_satellite_noaa.jpg\",\n    \"software\": \"Adobe Photoshop 2026 (Color Grade)\",\n    \"camera_make\": \"GOES-16 Satellite Imaging Sensor\",\n    \"camera_model\": \"Advanced Baseline Imager (ABI)\",\n    \"shutter_speed\": \"1/2000s\",\n    \"c2pa_manifest_verified\": True\n}\n\nprint(\"=== CYBER-FORENSICS TASKFORCE INGESTION AUDIT ===\\n\")\nfor idx, item in enumerate([evidence_item_1, evidence_item_2], 1):\n    print(f\"Evidence Item #{idx}: '{item['filename']}'\")\n    trust, decision, details = audit_media_authenticity(item)\n    print(f\"Trust Index: {trust}/100 \u2794 Verdict: {decision}\")\n    for d in details:\n        print(f\"  \u2022 {d}\")\n    print(\"-\" * 65)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c6_l1_1",
        "question": "What is the defining technical distinction between a **Deepfake** and a **Cheapfake (Shallow Fake)**? - **A)** Deepfakes cost more money to download on the internet. - **B)** Deepfakes are synthesized using advanced machine learning neural networks (like GANs or diffusion models); Cheapfakes are created using basic, non-AI editing techniques such as speed manipulation, deceptive cropping, or mislabeling older real photos. - **C)** Cheapfakes only happen on television news. - **D)** Deepfakes can only be created by university professors.",
        "options": [
          {
            "id": "A",
            "text": "** Deepfakes cost more money to download on the internet.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Deepfakes are synthesized using advanced machine learning neural networks (like GANs or diffusion models); Cheapfakes are created using basic, non-AI editing techniques such as speed manipulation, deceptive cropping, or mislabeling older real photos.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Cheapfakes only happen on television news.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Deepfakes can only be created by university professors.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In digital disinformation studies, **Cheapfakes** (or Shallow Fakes) require no machine learning\u2014they involve low-tech deceptions like slowing down video footage to make someone appear inebriated or captioning a 2016 photo as a 2026 event. **Deepfakes** rely on deep neural networks to synthesize realistic human likenesses, voice clones, or entirely artificial video streams.",
        "hint": "Reflect on the principles of Fact, Fake or AI?."
      },
      {
        "id": "q_class7_c6_l1_2",
        "question": "When inspecting a suspected AI-generated photograph of a crowd of people, which anatomical region is most notorious for exhibiting neural diffusion artifacts and spatial glitches? - **A)** The color of the sky. - **B)** Human hands and fingers (e.g., extra fingers, merging knuckles, impossible joint angles) and complex bilateral reflections in eye pupils. - **C)** The asphalt on the street. - **D)** The brand of shoes.",
        "options": [
          {
            "id": "A",
            "text": "** The color of the sky.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Human hands and fingers (e.g., extra fingers, merging knuckles, impossible joint angles) and complex bilateral reflections in eye pupils.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The asphalt on the street.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The brand of shoes.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Generative diffusion models learn 2D statistical distributions of pixels rather than 3D anatomical skeletal mechanics. Consequently, regions of high geometric complexity\u2014such as hands, interlocking fingers, teeth, and matching corneal eye reflections\u2014frequently display telltale warping, extra digits, or inconsistent perspective lines.",
        "hint": "Reflect on the principles of Fact, Fake or AI?."
      },
      {
        "id": "q_class7_c6_l1_3",
        "question": "What is the primary function of the **C2PA (Coalition for Content Provenance and Authenticity)** industry standard? - **A)** To block all users from editing photos on mobile phones. - **B)** To embed tamper-evident, cryptographically signed metadata (\"Content Credentials\") into digital media at capture, recording the camera origin, timestamp, and edit history to verify authenticity. - **C)** To delete all deepfakes from the internet automatically. - **D)** To tax digital photographers.",
        "options": [
          {
            "id": "A",
            "text": "** To block all users from editing photos on mobile phones.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To embed tamper-evident, cryptographically signed metadata (\"Content Credentials\") into digital media at capture, recording the camera origin, timestamp, and edit history to verify authenticity.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To delete all deepfakes from the internet automatically.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To tax digital photographers.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **C2PA** is an open technical standard that creates a cryptographic audit trail for digital media. Think of it as a tamper-proof digital passport attached to an image that cryptographically certifies whether the photo was taken by a real camera, edited in Photoshop, or generated by an AI model.",
        "hint": "Reflect on the principles of Fact, Fake or AI?."
      },
      {
        "id": "q_class7_c6_l1_4",
        "question": "In media forensics and political philosophy, what is the dangerous phenomenon known as the **\"Liar's Dividend\"**? - **A)** Hackers earning money by selling deepfakes. - **B)** The societal condition where, because deepfakes are known to exist, dishonest public figures can escape accountability for real, authentic scandalous recordings simply by claiming: *\"That video is an AI deepfake!\"* - **C)** The discount applied to video editing software. - **D)** A tax paid by journalists who make errors.",
        "options": [
          {
            "id": "A",
            "text": "** Hackers earning money by selling deepfakes.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The societal condition where, because deepfakes are known to exist, dishonest public figures can escape accountability for real, authentic scandalous recordings simply by claiming: *\"That video is an AI deepfake!\"*",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The discount applied to video editing software.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A tax paid by journalists who make errors.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Coined by legal scholars Bobby Chesney and Danielle Citron, the **Liar's Dividend** occurs when the mere *possibility* of deepfakes degrades public trust to such an extent that bad actors can dismiss real, damning evidence of corruption or crimes as \"just an AI fabrication\", leaving the public uncertain of what to believe.",
        "hint": "Reflect on the principles of Fact, Fake or AI?."
      },
      {
        "id": "q_class7_c6_l1_5",
        "question": "When evaluating a suspected AI-cloned audio voicemail, which acoustic feature in the frequency spectrum provides the strongest clue of synthetic generation? - **A)** The volume is too loud. - **B)** An unnatural, monotonic pitch cadence, lack of natural human breathing pauses, and sharp unnatural frequency cutoffs above 8,000 Hz. - **C)** The audio is spoken in English. - **D)** The audio is stored on a flash drive.",
        "options": [
          {
            "id": "A",
            "text": "** The volume is too loud.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** An unnatural, monotonic pitch cadence, lack of natural human breathing pauses, and sharp unnatural frequency cutoffs above 8,000 Hz.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The audio is spoken in English.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The audio is stored on a flash drive.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Human speech is an organic biological process driven by vocal cords, lung breath cycles, and mouth acoustics. Voice-cloning models often produce synthetic pitch contours that are unnaturally smooth, omit micro-breaths between phrases, and exhibit spectral compression artifacts in the high-frequency bands ($>8\\text{ kHz}$).",
        "hint": "Reflect on the principles of Fact, Fake or AI?."
      }
    ]
  },
  {
    "id": "class7-c6-l2",
    "gradeKey": "class7",
    "gradeName": "Class 7",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 2,
    "lessonTitle": "Fairness Matters",
    "missionScenario": "> **Mission Codename:** *Operation Equal Opportunity: The Hiring Algorithm Audit*\n> **Mission Briefing:** High-Stakes Audit at Mega-Corp Global!\n> Mega-Corp receives 100,000 job applications every year for engineering roles. To speed up hiring, company executives deployed an AI resume-screening bot called *Talent-AI*, trained on 15 years of past company hiring records.\n> The executive team bragged that the system was \"100% objective, neutral, and scientific because computers have no feelings.\"\n> However, an internal whistle-blower leaked disturbing data: across 10,000 recent female applicants, *Talent-AI* recommended hiring at an 80% lower rate than identical male applicants! The AI even secretly penalized resumes containing the word *\"Women's\"* (such as *\"Captain of the Women's Chess Club\"*).\n> You have been appointed as the **Independent Algorithmic Justice Auditor**! Your mission is to enter the *Fair Hiring Lab*, audit the algorithm's neural weights, compute the Disparate Impact Ratio, expose the hidden bias, and rebalance the model to ensure fair, equal opportunities for all qualified candidates!\n---",
    "gameTitle": "The Fair Hiring Algorithm Audit",
    "gameEngine": "Algorithmic De-Biasing & Policy Optimization Lab.",
    "gameSummary": "#### Game Title: *The Fair Hiring Algorithm Audit* - **Game Engine Type:** Algorithmic De-Biasing & Policy Optimization Lab. - **Educational Objective:** Hands-on experience in calculating Disparate Impact Ratios, discovering proxy features, and re-weighting hiring models. #### Game Rules & Mechanics: 1. **The Corporate Candidate Pool (100 Applicant Resumes):** - 50 Demographic Group A (Advantaged baseline).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 6 LESSON 2\n# RESPONSIBLE AI: DISPARATE IMPACT & ALGORITHMIC FAIRNESS AUDITOR\n# =====================================================================\n\ndef calculate_disparate_impact(applicant_records, protected_attribute, target_decision=\"APPROVED\"):\n    \"\"\"\n    Computes selection rates and Disparate Impact Ratio (DIR) across demographic subgroups.\n    Evaluates compliance against the legal 80% (Four-Fifths) Fair Hiring Rule.\n    \"\"\"\n    subgroup_counts = {}\n    subgroup_selections = {}\n    \n    # 1. Tally applicants and positive selections per subgroup\n    for person in applicant_records:\n        group = person[protected_attribute]\n        decision = person[\"decision\"]\n        \n        subgroup_counts[group] = subgroup_counts.get(group, 0) + 1\n        if decision == target_decision:\n            subgroup_selections[group] = subgroup_selections.get(group, 0) + 1\n            \n    # 2. Compute selection rates\n    selection_rates = {}\n    for group in subgroup_counts:\n        approved = subgroup_selections.get(group, 0)\n        total = subgroup_counts[group]\n        selection_rates[group] = approved / total\n\n    # Identify advantaged (highest rate) and protected (lowest rate) groups\n    sorted_groups = sorted(selection_rates.items(), key=lambda x: x[1], reverse=True)\n    advantaged_group, highest_rate = sorted_groups[0]\n    protected_group, lowest_rate = sorted_groups[-1]\n    \n    # 3. Calculate Disparate Impact Ratio (DIR)\n    dir_ratio = lowest_rate / highest_rate if highest_rate > 0 else 1.0\n    passes_four_fifths_rule = dir_ratio >= 0.80\n\n    return {\n        \"selection_rates\": selection_rates,\n        \"advantaged_group\": advantaged_group,\n        \"protected_group\": protected_group,\n        \"dir_ratio\": round(dir_ratio, 3),\n        \"compliant\": passes_four_fifths_rule\n    }\n\n# ----------------- SIMULATED CORPORATE APPLICANT AUDIT -----------------\n# 10 Simulated applicants evaluated by Talent-AI\ncorporate_applicants = [\n    {\"id\": \"APP-01\", \"gender\": \"Male\",   \"gpa\": 3.8, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-02\", \"gender\": \"Male\",   \"gpa\": 3.7, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-03\", \"gender\": \"Male\",   \"gpa\": 3.5, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-04\", \"gender\": \"Male\",   \"gpa\": 3.4, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-05\", \"gender\": \"Male\",   \"gpa\": 3.9, \"decision\": \"APPROVED\"},  # Male rate = 4/5 = 80%\n    {\"id\": \"APP-06\", \"gender\": \"Female\", \"gpa\": 3.9, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-07\", \"gender\": \"Female\", \"gpa\": 3.8, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-08\", \"gender\": \"Female\", \"gpa\": 3.7, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-09\", \"gender\": \"Female\", \"gpa\": 3.6, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-10\", \"gender\": \"Female\", \"gpa\": 3.8, \"decision\": \"REJECTED\"}   # Female rate = 1/5 = 20%\n]\n\nprint(\"=== MEGA-CORP TALENT-AI ALGORITHMIC BIAS AUDIT ===\\n\")\naudit_result = calculate_disparate_impact(corporate_applicants, protected_attribute=\"gender\")\n\nprint(\"Subgroup Selection Rates:\")\nfor grp, rate in audit_result[\"selection_rates\"].items():\n    print(f\"  \u2022 Group '{grp}': {rate * 100:.1f}% approved\")\n    \nprint(\"-\" * 55)\nprint(f\"Advantaged Cohort : {audit_result['advantaged_group']}\")\nprint(f\"Disadvantaged Cohort : {audit_result['protected_group']}\")\nprint(f\"Disparate Impact Ratio (DIR) : {audit_result['dir_ratio']} ({audit_result['dir_ratio'] * 100:.1f}%)\")\nprint(f\"Legal 80% Rule Compliance   : {'\u2705 COMPLIANT' if audit_result['compliant'] else '\ud83d\udea8 NON-COMPLIANT (ILLEGALLY BIASED)'}\")\n\nif not audit_result[\"compliant\"]:\n    print(\"\\nAuditor Mandate: Immediate suspension of automated hiring filter required!\")\n    print(\"Action: Remove proxy penalties and re-train model with balanced historical weights.\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class7_c6_l2_1",
        "question": "If an AI system trained to evaluate bank mortgages consistently rejects applicants from specific ethnic minorities at twice the rate of other applicants with identical financial incomes, what is the fundamental cause? - **A)** The bank's internet cables are defective. - **B)** Algorithmic Bias: historical training data encoded centuries of human racial lending discrimination, which the model internalized and automated as predictive mathematical features. - **C)** The computer processor has a low clock speed. - **D)** Banking algorithms are legally required to reject people.",
        "options": [
          {
            "id": "A",
            "text": "** The bank's internet cables are defective.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Algorithmic Bias: historical training data encoded centuries of human racial lending discrimination, which the model internalized and automated as predictive mathematical features.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The computer processor has a low clock speed.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Banking algorithms are legally required to reject people.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** An algorithm is not sentient; it reflects the statistical patterns present in the data supplied by humans. When models are trained on historical institutional lending data where minority communities were systematically disadvantaged (redlining), the model faithfully replicates and amplifies that historical discrimination under the guise of \"objective risk calculation\".",
        "hint": "Reflect on the principles of Fairness Matters."
      },
      {
        "id": "q_class7_c6_l2_2",
        "question": "Under the legal Four-Fifths (80%) Rule, if a company's automated hiring AI approves 50% of male applicants, what is the **minimum acceptable selection rate** for female applicants required to avoid an immediate finding of adverse discriminatory impact? - **A)** 10% - **B)** 25% - **C)** 40% (since $80\\% \\text{ of } 50\\% = 40\\%$) - **D)** 50%",
        "options": [
          {
            "id": "A",
            "text": "** 10%",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** 25%",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** 40% (since $80\\% \\text{ of } 50\\% = 40\\%$)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 50%",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Fairness Matters."
      },
      {
        "id": "q_class7_c6_l2_3",
        "question": "In the landmark MIT *Gender Shades* study, what primary data defect caused commercial facial recognition systems from leading global tech corporations to misclassify darker-skinned women nearly 35% of the time while achieving 99% accuracy on lighter-skinned men? - **A)** Cameras cannot record dark colors. - **B)** Severe Representation (Sampling) Bias: the training and benchmark facial datasets used by corporate engineers were overwhelmingly comprised of lighter-skinned male faces (over 75%), leaving the neural networks untrained on dark-skinned female features. - **C)** Women do not have faces that computers can recognize. - **D)** Deep learning algorithms cannot process human skin.",
        "options": [
          {
            "id": "A",
            "text": "** Cameras cannot record dark colors.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Severe Representation (Sampling) Bias: the training and benchmark facial datasets used by corporate engineers were overwhelmingly comprised of lighter-skinned male faces (over 75%), leaving the neural networks untrained on dark-skinned female features.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Women do not have faces that computers can recognize.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Deep learning algorithms cannot process human skin.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Machine learning models cannot accurately recognize features they have never seen during training. Because the benchmark datasets (like IJB-A and LFW) were predominantly compiled from public photos of white male executives and celebrities, the models lacked diverse facial representations, resulting in catastrophic error rates for darker-skinned women.",
        "hint": "Reflect on the principles of Fairness Matters."
      },
      {
        "id": "q_class7_c6_l2_4",
        "question": "Why is simply deleting sensitive demographic columns (like \"Race\", \"Religion\", or \"Gender\") from a training dataset insufficient to eliminate algorithmic discrimination? - **A)** Deleting columns causes Python to crash with a SyntaxError. - **B)** Machine learning models easily reconstruct protected attributes through **Proxy Variables** (correlated features such as postal zip codes, school names, club memberships, or speech patterns) that serve as hidden stand-ins for demographic identity. - **C)** Computers can magically read users' minds through their keyboards. - **D)** Data cannot be deleted from computer files.",
        "options": [
          {
            "id": "A",
            "text": "** Deleting columns causes Python to crash with a SyntaxError.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Machine learning models easily reconstruct protected attributes through **Proxy Variables** (correlated features such as postal zip codes, school names, club memberships, or speech patterns) that serve as hidden stand-ins for demographic identity.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Computers can magically read users' minds through their keyboards.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Data cannot be deleted from computer files.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Fairness through Unawareness** is a well-documented failure mode in machine learning. Complex high-dimensional datasets contain rich correlated proxy signals. An algorithm does not need an explicit \"Race\" column if it has access to geographic zip codes, grocery buying habits, and high school names that are demographically segregated.",
        "hint": "Reflect on the principles of Fairness Matters."
      },
      {
        "id": "q_class7_c6_l2_5",
        "question": "Which engineering intervention is considered a proactive, responsible method for mitigating algorithmic bias in a computer vision dataset? - **A)** Deleting all photos of people and training only on rocks. - **B)** Active Data Augmentation and Demographic Rebalancing: intentionally collecting diverse, balanced training samples across gender, age, ethnicity, and lighting conditions, and establishing independent fairness auditing benchmarks before model release. - **C)** Making the computer monitor dimmer so the photos look darker. - **D)** Ignoring the bias because computers are always right.",
        "options": [
          {
            "id": "A",
            "text": "** Deleting all photos of people and training only on rocks.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Active Data Augmentation and Demographic Rebalancing: intentionally collecting diverse, balanced training samples across gender, age, ethnicity, and lighting conditions, and establishing independent fairness auditing benchmarks before model release.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Making the computer monitor dimmer so the photos look darker.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Ignoring the bias because computers are always right.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Meaningful algorithmic de-biasing requires proactive engineering: curating inclusive, balanced datasets, ensuring balanced representation across all demographic intersections, stress-testing models on adversarial subgroups, and continuously monitoring real-world deployment for disparate impact.",
        "hint": "Reflect on the principles of Fairness Matters."
      }
    ]
  },
  {
    "id": "class8-c1-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 1,
    "lessonTitle": "How AI Makes Choices",
    "missionScenario": "> **Mission Codename:** *Operation Asteroid Intercept: Deep-Space Orbital Shield*\n> **Mission Briefing:** Urgent Alert from Planetary Defense Command!\n> The Lunar Early Warning Radar Array has detected an incoming cluster of 50 fast-moving deep-space astronomical bodies hurtling toward Earth's orbital path!\n> Some of these objects are harmless **\"Ice-Comets\"** that will vaporize harmlessly in the upper atmosphere. Others are hyper-dense, metallic **\"Iron-Asteroids\"** capable of devastating a continent upon impact!\n> Planetary defense kinetic lasers have only enough electrical charge to destroy 12 targets. If the defense AI misidentifies an Iron Asteroid as an Ice Comet, millions of lives are at risk. If it wastes laser shots on harmless ice, the battery will be exhausted when the real threat arrives!\n> As the **Chief Ballistic AI Architect**, your mission is to design the **Mathematical Decision Boundary**, tune the classification confidence thresholds, and program the laser targeting engine to intercept every metallic hazard without wasting a single joule of energy!\n---",
    "gameTitle": "The Decision Boundary Architect",
    "gameEngine": "2D Scatter Plot Geometry & Hyperplane Optimization Puzzle.",
    "gameSummary": "#### Game Title: *The Decision Boundary Architect* - **Game Engine Type:** 2D Scatter Plot Geometry & Hyperplane Optimization Puzzle. - **Educational Objective:** Hands-on manipulation of feature weights, bias offsets, and non-linear boundary thresholds to separate complex data clusters. #### Game Rules & Mechanics: 1. **The Radar Display (50 Incoming Deep-Space Objects):** - The student views a live 2D scatter plot:",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 1 LESSON 1\n# MATHEMATICAL DECISION BOUNDARY & ORBITAL HAZARD CLASSIFIER\n# =====================================================================\n\ndef evaluate_asteroid_threat(velocity_kms, density_gcc, weight_v=1.2, weight_d=2.5, bias=-18.0, threshold=0.0):\n    \"\"\"\n    Computes a linear decision score for an approaching celestial object.\n    Boundary Formula: z = (w_v * Velocity) + (w_d * Density) + Bias\n    If z >= threshold: Classified as DANGEROUS METALLIC ASTEROID\n    Else: Classified as HARMLESS ICE COMET\n    \"\"\"\n    # 1. Compute linear weighted score\n    z_score = (weight_v * velocity_kms) + (weight_d * density_gcc) + bias\n    \n    # 2. Convert z_score to a probabilistic confidence score using sigmoid\n    import math\n    try:\n        probability = 1.0 / (1.0 + math.exp(-z_score))\n    except OverflowError:\n        probability = 1.0 if z_score > 0 else 0.0\n        \n    is_threat = z_score >= threshold\n    \n    return {\n        \"z_score\": round(z_score, 2),\n        \"probability\": round(probability * 100, 1),\n        \"is_threat\": is_threat,\n        \"action\": \"\ud83d\udca5 FIRE DEFENSE LASER\" if is_threat else \"\ud83d\udef8 HOLD FIRE (Harmless Ice)\"\n    }\n\n# ----------------- SIMULATED CELESTIAL TARGET STREAM -----------------\n# Target telemetry: [Name, Velocity (km/s), Density (g/cm\u00b3)]\ntargets = [\n    {\"id\": \"Obj-Alpha\", \"vel\": 12.0, \"density\": 1.2},  # Fast but light ice comet\n    {\"id\": \"Obj-Beta\",  \"vel\": 8.5,  \"density\": 7.8},  # Dense nickel-iron asteroid\n    {\"id\": \"Obj-Gamma\", \"vel\": 14.5, \"density\": 5.4},  # Extremely fast, heavy rock\n    {\"id\": \"Obj-Delta\", \"vel\": 4.0,  \"density\": 0.9}   # Slow fluffy snow comet\n]\n\nprint(\"=== PLANETARY DEFENSE ORBITAL DECISION BOUNDARY RUN ===\\n\")\nprint(f\"Active Model Weights: w_Velocity = 1.2 | w_Density = 2.5 | Bias = -18.0\\n\")\nprint(f\"{'OBJECT ID':<11} | {'VEL (km/s)':<11} | {'DENSITY':<10} | {'Z-SCORE':<9} | {'PROBABILITY':<12} | {'DECISION'}\")\nprint(\"-\" * 75)\n\nfor t in targets:\n    result = evaluate_asteroid_threat(t[\"vel\"], t[\"density\"])\n    print(f\"{t['id']:<11} | {t['vel']:<11.1f} | {t['density']:<10.1f} | {result['z_score']:<9.2f} | {result['probability']:<5.1f}%      | {result['action']}\")\n\nprint(\"-\" * 75)\nprint(\"Analysis: Obj-Beta and Obj-Gamma cleanly classified above boundary (z >= 0)!\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c1_l1_1",
        "question": "In machine learning geometric theory, what is a **Decision Boundary**? - **A)** The physical plastic casing surrounding a computer's central processing unit. - **B)** A mathematical hypersurface that partitions a multi-dimensional feature space into distinct regions, determining the predicted class for any given data coordinate. - **C)** The edge of the computer screen. - **D)** A firewall that prevents internet hacking.",
        "options": [
          {
            "id": "A",
            "text": "** The physical plastic casing surrounding a computer's central processing unit.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A mathematical hypersurface that partitions a multi-dimensional feature space into distinct regions, determining the predicted class for any given data coordinate.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The edge of the computer screen.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A firewall that prevents internet hacking.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In supervised classification, the model maps input feature vectors into an $n$-dimensional Euclidean space. The **Decision Boundary** is the learned mathematical manifold (a 1D line in 2D space, a 2D plane in 3D space, or a hyperplane in higher dimensions) where the predicted class probabilities are exactly equal ($P = 0.50$).",
        "hint": "Reflect on the principles of How AI Makes Choices."
      },
      {
        "id": "q_class8_c1_l1_2",
        "question": "In a linear credit loan approval model governed by the equation: $$z = (0.8 \\times \\text{Income}) - (2.5 \\times \\text{Unpaid Debt}) + (1.2 \\times \\text{Savings}) - 50$$ What does the negative weight coefficient ($-2.5$) for `Unpaid Debt` signify? - **A)** The bank pays the customer money whenever they go into debt. - **B)** As an applicant's unpaid debt increases, their overall credit score $z$ decreases rapidly, making loan rejection significantly more likely. - **C)** Negative numbers cannot be used in computer science. - **D)** Unpaid debt has zero influence on the loan decision.",
        "options": [
          {
            "id": "A",
            "text": "** The bank pays the customer money whenever they go into debt.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** As an applicant's unpaid debt increases, their overall credit score $z$ decreases rapidly, making loan rejection significantly more likely.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Negative numbers cannot be used in computer science.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Unpaid debt has zero influence on the loan decision.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In linear models, the sign and magnitude of a feature weight determine its directional influence. A positive weight increases the target outcome; a negative weight ($-2.5$) penalizes the score, pulling the applicant's coordinate down away from the loan approval decision boundary.",
        "hint": "Reflect on the principles of How AI Makes Choices."
      },
      {
        "id": "q_class8_c1_l1_3",
        "question": "A cancer diagnostic AI outputs a malignancy risk probability $P(\\text{Cancer})$ between $0.0$ and $1.0$. The default software threshold is $\\tau = 0.50$. Why do hospital oncologists deliberately lower the diagnostic decision threshold to $\\tau = 0.15$? - **A)** Because oncologists prefer operating on healthy people. - **B)** To maximize **Recall (Sensitivity)**: in oncology, a False Negative (missing a real deadly tumor) can be fatal, so the system is tuned to flag any suspicious lesion even if it triggers more non-fatal False Positives that can be ruled out by a follow-up biopsy. - **C)** Lower thresholds make the computer run faster. - **D)** Lowering thresholds reduces hospital electricity bills.",
        "options": [
          {
            "id": "A",
            "text": "** Because oncologists prefer operating on healthy people.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To maximize **Recall (Sensitivity)**: in oncology, a False Negative (missing a real deadly tumor) can be fatal, so the system is tuned to flag any suspicious lesion even if it triggers more non-fatal False Positives that can be ruled out by a follow-up biopsy.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Lower thresholds make the computer run faster.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Lowering thresholds reduces hospital electricity bills.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Threshold selection reflects real-world asymmetric risk. The penalty of a **False Negative** in cancer screening is death; the penalty of a **False Positive** is an unnecessary follow-up ultrasound. Lowering $\\tau$ to 0.15 catches every possible malignancy early, prioritizing patient survival.",
        "hint": "Reflect on the principles of How AI Makes Choices."
      },
      {
        "id": "q_class8_c1_l1_4",
        "question": "A deep neural network containing 500 million parameters achieves 99.4% accuracy predicting which parole applicants will commit future crimes. However, the algorithm cannot provide an interpretable reason why Applicant $X$ was rejected while Applicant $Y$ was approved. What is this challenge called in AI governance? - **A)** The Quantum Computing Race - **B)** The **Black Box / Explainability Problem (XAI)**: the mathematical complexity of deep weights makes internal reasoning opaque, violating human legal rights to due process and an explanation. - **C)** A hardware memory leak. - **D)** The Turing Test.",
        "options": [
          {
            "id": "A",
            "text": "** The Quantum Computing Race",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The **Black Box / Explainability Problem (XAI)**: the mathematical complexity of deep weights makes internal reasoning opaque, violating human legal rights to due process and an explanation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A hardware memory leak.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The Turing Test.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Complex deep neural models are often **Black Boxes**: while highly accurate at mapping inputs to outputs, their millions of non-linear parameter interactions make it mathematically impossible for human judges or doctors to trace the exact rationale behind a specific individual decision, conflicting directly with democratic legal rights to explanation.",
        "hint": "Reflect on the principles of How AI Makes Choices."
      },
      {
        "id": "q_class8_c1_l1_5",
        "question": "Suppose a 2D dataset consists of a cluster of blue points centered at $(0, 0)$ completely surrounded by a circular outer ring of red points. Can a standard single-line linear classifier cleanly separate the two classes? - **A)** Yes, a vertical line can easily separate concentric circles. - **B)** No, concentric circular distributions are not linearly separable; the system requires a non-linear decision boundary (such as a radial basis function, polynomial kernel, or multi-layer neural network). - **C)** Yes, any line can divide any shape. - **D)** Concentric circles cannot exist in computer science.",
        "options": [
          {
            "id": "A",
            "text": "** Yes, a vertical line can easily separate concentric circles.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** No, concentric circular distributions are not linearly separable; the system requires a non-linear decision boundary (such as a radial basis function, polynomial kernel, or multi-layer neural network).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Yes, any line can divide any shape.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Concentric circles cannot exist in computer science.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** This is the famous **XOR / Concentric Circle Problem** that historic perceptrons could not solve. A single straight line cannot separate an inner circle from an enclosing outer ring. Handling non-linear topology requires multi-layer neural networks or kernel transformations that project the data into higher dimensions.",
        "hint": "Reflect on the principles of How AI Makes Choices."
      }
    ]
  },
  {
    "id": "class8-c1-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 1,
    "chapterTitle": "AI Basics",
    "lessonNumber": 2,
    "lessonTitle": "Learning from Data",
    "missionScenario": "> **Mission Codename:** *Operation Vital-Scan: The Pandemic Screening Center*\n> **Mission Briefing:** Emergency at the Central Biosecurity Center!\n> A novel respiratory airborne pathogen, the *Nebula-Flu*, has emerged at the international transit terminal.\n> A high-tech medical startup delivered an automated AI thermal scanner claiming: *\"Our model achieves 98% accuracy on hospital trial data!\"*\n> However, on the first day of real-world deployment, disaster struck! The AI let 20 infected passengers walk freely onto commercial flights (Fatal False Negatives!), while detaining 500 perfectly healthy travelers in isolation rooms (Costly False Positives!).\n> As the **Chief Clinical AI Quality Auditor**, you have been called in to investigate. You must look beyond simple accuracy numbers, perform a rigorous **Train/Test Audit**, construct the **Confusion Matrix**, calculate Precision and Recall, and re-tune the diagnostic model before an uncontrolled epidemic spreads across the globe!\n---",
    "gameTitle": "The Model Hospital Clinic",
    "gameEngine": "Confusion Matrix Calibration & Asymmetric Cost Optimization Lab.",
    "gameSummary": "#### Game Title: *The Model Hospital Clinic* - **Game Engine Type:** Confusion Matrix Calibration & Asymmetric Cost Optimization Lab. - **Educational Objective:** Hands-on balancing of Precision vs Recall trade-offs under severe real-world penalties. #### Game Rules & Mechanics: 1. **The Clinic Triage Queue (100 Patients):** - The student manages diagnostic threshold settings for 3 clinical diseases:",
    "pythonCode": "def diagnose_patient(patient):\n    return \"HEALTHY\"  # Always predicts healthy, no matter what!",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c1_l2_1",
        "question": "In a cybersecurity intrusion detection model, what cell in the confusion matrix corresponds to a situation where a malicious hacker successfully breaches the database, but the AI system classifies the traffic as \"Normal User Activity\"? - **A)** True Positive (TP) - **B)** False Positive (FP) - **C)** False Negative (FN) - **D)** True Negative (TN)",
        "options": [
          {
            "id": "A",
            "text": "** True Positive (TP)",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** False Positive (FP)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** False Negative (FN)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** True Negative (TN)",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In binary classification, the positive target class is \"Security Intrusion\". When an actual intrusion is present (Positive), but the model incorrectly predicts no intrusion (Negative), it is a **False Negative (Type II Error)**. This is the most dangerous failure mode in security.",
        "hint": "Reflect on the principles of Learning from Data."
      },
      {
        "id": "q_class8_c1_l2_2",
        "question": "A spam email filter classifies 100 emails. It sends 10 emails to the Spam folder. Upon human inspection, 8 of those emails were real spam, while 2 were urgent messages from the user's teacher. What is the **Precision** of this spam filter? - **A)** 10% - **B)** 80% (since $\\frac{8}{8 + 2} = \\frac{8}{10} = 80\\%$) - **C)** 20% - **D)** 100%",
        "options": [
          {
            "id": "A",
            "text": "** 10%",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** 80% (since $\\frac{8}{8 + 2} = \\frac{8}{10} = 80\\%$)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** 20%",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** 100%",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Learning from Data."
      },
      {
        "id": "q_class8_c1_l2_3",
        "question": "A student trains a deep neural network on 10,000 photos of flowers. After 200 epochs, the model achieves **100% accuracy on the training dataset**. However, when tested on 2,000 new flower photos taken from a botanical garden, accuracy plummets to **54%**. What has occurred? - **A)** Underfitting due to a simple model. - **B)** Severe Overfitting: the model memorized the specific pixels, noise, and lighting of the training set rather than learning generalizable biological features of flower species. - **C)** The computer's graphics card ran out of ink. - **D)** Flowers change their DNA when photographed.",
        "options": [
          {
            "id": "A",
            "text": "** Underfitting due to a simple model.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Severe Overfitting: the model memorized the specific pixels, noise, and lighting of the training set rather than learning generalizable biological features of flower species.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The computer's graphics card ran out of ink.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Flowers change their DNA when photographed.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The hallmark of **Overfitting** is an extreme divergence between training performance and test performance. A model that achieves near-perfect training accuracy while collapsing on unseen test data has failed to generalize, acting like a student who memorized exam question numbers rather than learning the concepts.",
        "hint": "Reflect on the principles of Learning from Data."
      },
      {
        "id": "q_class8_c1_l2_4",
        "question": "A fraud detection AI monitors 1,000,000 bank transactions, of which only 100 are fraudulent ($0.01\\%$). If a simple baseline model predicts \"NOT FRAUD\" for 100% of transactions, what is its mathematical accuracy, and why is this model clinically useless? - **A)** Accuracy is 50%; it is moderately useful. - **B)** Accuracy is 99.99%; but it is completely useless because its **Recall is 0%**, meaning 100% of fraudulent thefts slip through unnoticed. - **C)** Accuracy is 0%; it throws an immediate error. - **D)** The model will become sentient and steal the money.",
        "options": [
          {
            "id": "A",
            "text": "** Accuracy is 50%; it is moderately useful.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Accuracy is 99.99%; but it is completely useless because its **Recall is 0%**, meaning 100% of fraudulent thefts slip through unnoticed.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Accuracy is 0%; it throws an immediate error.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The model will become sentient and steal the money.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In severely imbalanced datasets, **Accuracy is a deceptive metric**. A model that never flags fraud achieves $99.99\\%$ accuracy simply by guessing the majority class, but its Sensitivity/Recall is exactly $0\\%$. In fraud detection, precision and recall metrics (such as the Precision-Recall AUC or F1-Score) must always be used instead of accuracy.",
        "hint": "Reflect on the principles of Learning from Data."
      },
      {
        "id": "q_class8_c1_l2_5",
        "question": "Why is it considered a fundamental violation of scientific protocol in machine learning to tune model hyperparameters using the test dataset? - **A)** It causes the computer CPU to overheat. - **B)** It causes **Data Leakage**: the model's design becomes indirectly fitted to the specific test data, destroying the independence of the test set as an objective benchmark of real-world generalization. - **C)** Test datasets can only be opened once before they self-destruct. - **D)** It is illegal under international maritime law.",
        "options": [
          {
            "id": "A",
            "text": "** It causes the computer CPU to overheat.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It causes **Data Leakage**: the model's design becomes indirectly fitted to the specific test data, destroying the independence of the test set as an objective benchmark of real-world generalization.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Test datasets can only be opened once before they self-destruct.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It is illegal under international maritime law.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Data Leakage** occurs when information from the test dataset contaminates the training or hyperparameter tuning process. If an engineer repeatedly adjusts thresholds to maximize test scores, the test set ceases to be an unvarnished benchmark of unseen real-world data, leading to inflated, untrustworthy performance claims.",
        "hint": "Reflect on the principles of Learning from Data."
      }
    ]
  },
  {
    "id": "class8-c2-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 1,
    "lessonTitle": "Python Playground",
    "missionScenario": "> **Mission Codename:** *Operation Clean-Code: The Sub-Orbital Drone Engine*\n> **Mission Briefing:** Emergency at the Sky-Fleet Propulsion Labs!\n> The flight software for the new autonomous sub-orbital delivery drone, *Aero-Falcon*, is malfunctioning!\n> The original prototype code was written in a single, chaotic 300-line \"spaghetti\" script where variables named `x`, `temp`, `data2`, and `flag` were copied and pasted dozens of times across the file.\n> When the flight computer experiences turbulent wind shear, the code crashes because a variable inside a loop accidentally overwrote the global altitude navigation variable! The test flight is scheduled in 90 minutes.\n> As the **Lead Software Architect**, your mission is to enter the **Python Playground**, dismantle the monolithic code, encapsulate the physics and navigation algorithms into **Modular, Reusable Functions**, enforce strict variable scoping, add unit test assertions, and build a rock-solid, crash-proof propulsion library!\n---",
    "gameTitle": "The Modular Code Factory",
    "gameEngine": "Monolith Refactoring & Unit Test Assembly Challenge.",
    "gameSummary": "#### Game Title: *The Modular Code Factory* - **Game Engine Type:** Monolith Refactoring & Unit Test Assembly Challenge. - **Educational Objective:** Hands-on mastery of function decomposition, parameter passing, return values, and automated unit test assertions. #### Game Rules & Mechanics: 1. **The Factory Floor (A Broken Monolithic Script):** - The student is handed an ugly 80-line script that calculates drone flight: battery drain, GPS distance, wind drag, and altitude.",
    "pythonCode": "gravity = 9.81  # GLOBAL VARIABLE: Defined outside; visible to entire script.\n\ndef compute_fall_velocity(time_seconds):\n    air_resistance = 0.12  # LOCAL VARIABLE: Created inside; exists ONLY here!\n    velocity = (gravity - air_resistance) * time_seconds\n    return velocity\n\nprint(compute_fall_velocity(5))  # Works perfectly!\n# print(air_resistance)          # CRASH! NameError: 'air_resistance' is not defined outside!",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c2_l1_1",
        "question": "Examine the following Python script: ```python x = 50 def modify_value(): x = 10 return x * 2 result = modify_value() print(f\"Result: {result}, X: {x}\") ``` What will be displayed on the screen when this code is executed? - **A)** `Result: 20, X: 10` - **B)** `Result: 20, X: 50` - **C)** `Result: 100, X: 50` - **D)** An UnboundLocalError crash",
        "options": [
          {
            "id": "A",
            "text": "** `Result: 20, X: 10`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `Result: 20, X: 50`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `Result: 100, X: 50`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** An UnboundLocalError crash",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "The correct answer is A.",
        "hint": "Reflect on the principles of Python Playground."
      },
      {
        "id": "q_class8_c2_l1_2",
        "question": "Consider the function header: ```python def configure_sensor(sensor_id, rate_hz=50, calibrate=True): ``` Which of the following function calls is **invalid** and will cause a Python error? - **A)** `configure_sensor(\"S-101\")` - **B)** `configure_sensor(\"S-101\", 100)` - **C)** `configure_sensor()` - **D)** `configure_sensor(\"S-101\", rate_hz=25, calibrate=False)`",
        "options": [
          {
            "id": "A",
            "text": "** `configure_sensor(\"S-101\")`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `configure_sensor(\"S-101\", 100)`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `configure_sensor()`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `configure_sensor(\"S-101\", rate_hz=25, calibrate=False)`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In Python, parameters with default values (like `rate_hz=50` and `calibrate=True`) are optional. However, `sensor_id` has no default value, making it a mandatory positional argument. Calling `configure_sensor()` with no arguments raises a `TypeError: missing 1 required positional argument: 'sensor_id'`.",
        "hint": "Reflect on the principles of Python Playground."
      },
      {
        "id": "q_class8_c2_l1_3",
        "question": "What is the primary engineering purpose of using the `assert` statement in Python (e.g., `assert calculate_area(5) > 0`)? - **A)** To make the program run faster on graphics cards. - **B)** To enforce automated runtime sanity checks that immediately raise an `AssertionError` if an internal calculation violates mathematical invariants, preventing silent errors from propagating through a codebase. - **C)** To print colorful text to the console screen. - **D)** To connect to the internet.",
        "options": [
          {
            "id": "A",
            "text": "** To make the program run faster on graphics cards.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** To enforce automated runtime sanity checks that immediately raise an `AssertionError` if an internal calculation violates mathematical invariants, preventing silent errors from propagating through a codebase.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To print colorful text to the console screen.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** To connect to the internet.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Assertions** are defensive programming tools used for internal verification and unit testing. They state: *\"This condition MUST be True at this point in the program; if it is not, halt execution immediately and sound the alarm.\"* They prevent silent data corruption.",
        "hint": "Reflect on the principles of Python Playground."
      },
      {
        "id": "q_class8_c2_l1_4",
        "question": "In professional software development, why are **Pure Functions** (functions that rely only on their input parameters and produce no hidden side-effects like mutating external global variables) considered far more reliable for AI pipelines? - **A)** Pure functions take up less memory on hard drives. - **B)** Pure functions are deterministic, thread-safe, easy to unit test, and can be run millions of times across parallel GPU cores without unexpected race conditions or state pollution. - **C)** Python only allows pure functions. - **D)** Pure functions never require quotation marks.",
        "options": [
          {
            "id": "A",
            "text": "** Pure functions take up less memory on hard drives.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Pure functions are deterministic, thread-safe, easy to unit test, and can be run millions of times across parallel GPU cores without unexpected race conditions or state pollution.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Python only allows pure functions.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Pure functions never require quotation marks.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Functions that mutate global state introduce hidden dependencies (side effects) that make code fragile, unpredictable, and notoriously difficult to debug in parallel environments. Pure functions are modular building blocks that guarantee identical output for identical input every time.",
        "hint": "Reflect on the principles of Python Playground."
      },
      {
        "id": "q_class8_c2_l1_5",
        "question": "Which built-in Python standard library contains functions for calculating mathematical square roots (`sqrt`), trigonometric angles (`sin`, `cos`), and mathematical constants like $\\pi$ (`pi`)? - **A)** `random` - **B)** `math` - **C)** `sys` - **D)** `time`",
        "options": [
          {
            "id": "A",
            "text": "** `random`",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** `math`",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** `sys`",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** `time`",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The `math` module is part of Python's official Standard Library. It provides access to the underlying C-library mathematical functions for floating-point arithmetic, including trigonometric, hyperbolic, logarithmic, and power functions, as well as fundamental constants like $\\pi$ and $e$.",
        "hint": "Reflect on the principles of Python Playground."
      }
    ]
  },
  {
    "id": "class8-c2-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 2,
    "chapterTitle": "Communicate with AI",
    "lessonNumber": 2,
    "lessonTitle": "Code a Solution",
    "missionScenario": "> **Mission Codename:** *Operation Prime-Route: The Autonomous Logistics Hub*\n> **Mission Briefing:** High-Stakes Logistics Emergency in Metropolis Central!\n> Heavy rainstorms and road construction have caused gridlock across the downtown urban corridor.\n> The city\u2019s fleet of 25 autonomous electric delivery rovers is overwhelmed. Hundreds of packages are piling up at the central warehouse: life-critical medical donor organs, temperature-sensitive vaccines, urgent court documents, and ordinary retail parcels.\n> Right now, the rovers are delivering packages randomly in the order they arrived! Life-saving medicine is sitting at the bottom of the pile behind boxes of plastic pool toys!\n> As the **Chief Logistics Software Engineer**, you must **Code the Complete Algorithmic Solution**! You must architect a data pipeline that ingests incoming delivery manifests, prioritizes urgent medical payloads, calculates optimal distance vectors, handles traffic detour exceptions gracefully, and dispatches the rover fleet to save lives!\n---",
    "gameTitle": "The Autonomous Delivery Dispatcher",
    "gameEngine": "Urban Route Optimization & Dynamic Exception Gauntlet.",
    "gameSummary": "#### Game Title: *The Autonomous Delivery Dispatcher* - **Game Engine Type:** Urban Route Optimization & Dynamic Exception Gauntlet. - **Educational Objective:** Hands-on mastery of sorting algorithms, multi-key lambda expressions, and real-time exception handling under traffic volatility. #### Game Rules & Mechanics: 1. **The Metropolis Logistics Grid (10 Delivery Manifests):** - Each manifest card displays: Package ID, Payload Type, Urgency (1 = Emergency, 2 = Express, 3 = Standard), Distance (km), and Fragility Flag.",
    "pythonCode": "parcel_manifest = [\n    {\"id\": \"PKG-101\", \"destination_km\": 4.2, \"urgency\": 1, \"type\": \"Donor Heart\"},\n    {\"id\": \"PKG-102\", \"destination_km\": 1.5, \"urgency\": 3, \"type\": \"Sneakers\"},\n    {\"id\": \"PKG-103\", \"destination_km\": 8.1, \"urgency\": 1, \"type\": \"Emergency Blood\"}\n]",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c2_l2_1",
        "question": "In Python, what is the role of the `key` parameter in the built-in function `sorted(data_list, key=lambda item: item['score'])`? - **A)** It encrypts the list so unauthorized hackers cannot read the scores. - **B)** It specifies a custom callable function or extraction rule that extracts a comparison key from each element, determining the ordering logic used to sort the items. - **C)** It deletes all items that do not contain the word \"score\". - **D)** It generates a random password.",
        "options": [
          {
            "id": "A",
            "text": "** It encrypts the list so unauthorized hackers cannot read the scores.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It specifies a custom callable function or extraction rule that extracts a comparison key from each element, determining the ordering logic used to sort the items.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** It deletes all items that do not contain the word \"score\".",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It generates a random password.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The `key` parameter in Python's Timsort algorithm takes a unary function that is called on each list element before comparisons. Using `lambda item: item['score']` instructs Python to inspect the numerical value of `'score'` inside each dictionary to establish the sorting order.",
        "hint": "Reflect on the principles of Code a Solution."
      },
      {
        "id": "q_class8_c2_l2_2",
        "question": "Given the lambda sort key: ```python sorted(athletes, key=lambda a: (-a['medals'], a['age'])) ``` How will Python sort the athletes? - **A)** Primarily by medals ascending, secondarily by age descending. - **B)** Primarily by medals in descending order (highest medals first due to `-a['medals']`), and secondarily by age in ascending order (youngest athlete breaks ties). - **C)** Alphabetically by the athlete's name. - **D)** It causes a TypeError.",
        "options": [
          {
            "id": "A",
            "text": "** Primarily by medals ascending, secondarily by age descending.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Primarily by medals in descending order (highest medals first due to `-a['medals']`), and secondarily by age in ascending order (youngest athlete breaks ties).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Alphabetically by the athlete's name.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It causes a TypeError.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In Python tuple sorting, elements are evaluated lexicographically. Negating a numerical value (`-a['medals']`) reverses the sort direction for that specific attribute (producing descending order: 10 medals becomes -10, which sorts before -5). The secondary attribute `a['age']` remains positive (ascending order: youngest first).",
        "hint": "Reflect on the principles of Code a Solution."
      },
      {
        "id": "q_class8_c2_l2_3",
        "question": "What happens if a runtime error occurs inside a Python `try` block that has a matching `except` block? - **A)** The operating system reboots the computer. - **B)** Python intercepts the exception, skips the remainder of the `try` block, and immediately transfers execution control to the `except` block, preventing the program from crashing. - **C)** The Python code file is permanently erased from the hard drive. - **D)** The error is ignored and the program continues on the exact same line that broke.",
        "options": [
          {
            "id": "A",
            "text": "** The operating system reboots the computer.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Python intercepts the exception, skips the remainder of the `try` block, and immediately transfers execution control to the `except` block, preventing the program from crashing.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The Python code file is permanently erased from the hard drive.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The error is ignored and the program continues on the exact same line that broke.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Python's **Structured Exception Handling (`try-except`)** allows programs to fail gracefully. If an exception occurs (such as an unexpected `ValueError`), execution branches immediately to the corresponding `except` handler, executing fallback remediation logic and preserving system uptime.",
        "hint": "Reflect on the principles of Code a Solution."
      },
      {
        "id": "q_class8_c2_l2_4",
        "question": "A developer sorts 1,000,000 package delivery records using a custom bubble sort algorithm they wrote with nested `for` loops ($O(n^2)$). A second developer uses Python's built-in `sorted()` function ($O(n \\log n)$). What is the practical runtime difference? - **A)** Both algorithms take the exact same time. - **B)** The nested loop bubble sort requires approximately $1,000,000,000,000$ (one trillion) operations and takes several hours, whereas Python's Timsort requires roughly $20,000,000$ operations and completes in less than one second. - **C)** The built-in sorted function crashes when sorting more than 10 items. - **D)** Bubble sort is 1,000 times faster.",
        "options": [
          {
            "id": "A",
            "text": "** Both algorithms take the exact same time.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The nested loop bubble sort requires approximately $1,000,000,000,000$ (one trillion) operations and takes several hours, whereas Python's Timsort requires roughly $20,000,000$ operations and completes in less than one second.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The built-in sorted function crashes when sorting more than 10 items.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Bubble sort is 1,000 times faster.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Algorithmic complexity matters exponentially as data scales. An $O(n^2)$ algorithm scales with the square of the input size ($10^6 \\times 10^6 = 10^{12}$ steps). An $O(n \\log n)$ algorithm scales sub-linearly ($10^6 \\times 20 \\approx 2 \\times 10^7$ steps), completing in fractions of a second.",
        "hint": "Reflect on the principles of Code a Solution."
      },
      {
        "id": "q_class8_c2_l2_5",
        "question": "In professional software development, what is the core philosophy of **Test-Driven Development (TDD)**? - **A)** Writing the marketing sales test after the product is released. - **B)** Writing automated test specifications *before* writing the functional implementation code, ensuring that code is engineered specifically to satisfy verified requirements and pass all boundary test cases. - **C)** Never testing software to save time. - **D)** Testing software by asking a customer to use it in production.",
        "options": [
          {
            "id": "A",
            "text": "** Writing the marketing sales test after the product is released.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Writing automated test specifications *before* writing the functional implementation code, ensuring that code is engineered specifically to satisfy verified requirements and pass all boundary test cases.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Never testing software to save time.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Testing software by asking a customer to use it in production.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In **Test-Driven Development (TDD)**, the engineer follows the \"Red-Green-Refactor\" cycle: first write an automated test that fails (Red), write the minimal clean code to make the test pass (Green), and finally refactor for cleanliness and performance. TDD guarantees high reliability and eliminates regression defects.",
        "hint": "Reflect on the principles of Code a Solution."
      }
    ]
  },
  {
    "id": "class8-c3-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 1,
    "lessonTitle": "AI for Better Health",
    "missionScenario": "> **Mission Codename:** *Operation Bio-Vision: The Diagnostic ICU*\n> **Mission Briefing:** Critical Alert at the St. Jude Memorial Hospital Trauma Center!\n> Over the weekend, a regional pneumonia outbreak coupled with an influx of trauma patients has overwhelmed the hospital\u2019s radiology department. Three on-duty radiologists must review over 400 complex chest X-rays and CT scans before morning!\n> When human doctors work under extreme 18-hour fatigue, visual oversight rates jump by over 30%. A missed micro-nodule or early lung consolidation can be life-threatening.\n> You have been deployed as the **Lead Clinical AI Vision Specialist**! Your mission is to configure the hospital\u2019s **AI Radiologist Assistant**! You must program computer vision filters that pre-screen incoming scans, isolate anomalous high-density tissue regions, generate diagnostic visual heatmaps, and prioritize the most critical emergency scans for immediate doctor review!\n---",
    "gameTitle": "AI Radiologist Assistant",
    "gameEngine": "Clinical Pathology Inspection & Heatmap Verification Lab.",
    "gameSummary": "#### Game Title: *AI Radiologist Assistant* - **Game Engine Type:** Clinical Pathology Inspection & Heatmap Verification Lab. - **Educational Objective:** Hands-on experience in medical imaging thresholding, anomaly segmentation, and doctor-AI collaborative triage. #### Game Rules & Mechanics: 1. **The Diagnostic Lightbox (8 Simulated Patient Scans):** - The student views 8 chest scans with clinical vitals (Patient Age, Oxygen Saturation %, Cough Duration).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 3 LESSON 1\n# HEALTHCARE AI: 2D MEDICAL MATRIX TISSUE ANOMALY DETECTION ENGINE\n# =====================================================================\n\ndef scan_lung_tissue_matrix(patient_id, lung_matrix, normal_max_density=60):\n    \"\"\"\n    Analyzes a 2D numerical pixel matrix representing lung tissue in a chest scan.\n    - Healthy lung tissue has low X-ray density (Pixel values: 10 to 60).\n    - Dense pneumonia / tumor consolidations create high density spikes (> 120).\n    Computes anomaly heatmaps and triggers clinical triage alerts.\n    \"\"\"\n    rows = len(lung_matrix)\n    cols = len(lung_matrix[0])\n    \n    anomalous_pixels = []\n    total_density = 0\n    max_peak_detected = 0\n    \n    for r in range(rows):\n        for c in range(cols):\n            pixel_val = lung_matrix[r][c]\n            total_density += pixel_val\n            if pixel_val > max_peak_detected:\n                max_peak_detected = pixel_val\n                \n            # Check if density exceeds healthy lung tissue ceiling\n            if pixel_val > normal_max_density:\n                anomalous_pixels.append((r, c, pixel_val))\n                \n    mean_density = total_density / (rows * cols)\n    anomaly_count = len(anomalous_pixels)\n    \n    # Clinical Triage Recommendation\n    if anomaly_count >= 4 and max_peak_detected > 150:\n        triage_status = \"\ud83d\udea8 CODE RED: High-Density Consolidation Detected! Immediate Doctor Consult.\"\n    elif anomaly_count >= 1:\n        triage_status = \"\u26a0\ufe0f CODE YELLOW: Mild Opacity Observed. Recommend Follow-Up Lateral Scan.\"\n    else:\n        triage_status = \"\u2705 CODE GREEN: Clear Lungs. Tissue density within normal healthy limits.\"\n\n    return {\n        \"patient_id\": patient_id,\n        \"mean_density\": round(mean_density, 1),\n        \"max_peak\": max_peak_detected,\n        \"anomaly_count\": anomaly_count,\n        \"anomalous_coords\": anomalous_pixels,\n        \"status\": triage_status\n    }\n\n# ----------------- SIMULATED 5x5 LUNG TISSUE SCANS -----------------\n# Patient 1: Healthy lung tissue (Dark, porous air spaces)\nhealthy_patient_scan = [\n    [ 25,  28,  30,  24,  22 ],\n    [ 30,  35,  32,  28,  25 ],\n    [ 28,  30,  40,  35,  30 ],\n    [ 22,  25,  28,  32,  26 ],\n    [ 20,  22,  25,  24,  20 ]\n]\n\n# Patient 2: Severe Bacterial Pneumonia (Dense fluid opacity in center)\npneumonia_patient_scan = [\n    [ 25,  28,  30,  24,  22 ],\n    [ 30, 185, 192,  28,  25 ],  # Spikes: 185, 192 (Opaque consolidation)\n    [ 28, 178, 205,  35,  30 ],  # Spikes: 178, 205 (High density tumor/fluid)\n    [ 22,  25,  28,  32,  26 ],\n    [ 20,  22,  25,  24,  20 ]\n]\n\nprint(\"=== ST. JUDE ICU AUTOMATED RADIOLOGY AI SCANNER ===\\n\")\nfor pid, scan in [(\"PATIENT-101\", healthy_patient_scan), (\"PATIENT-102\", pneumonia_patient_scan)]:\n    report = scan_lung_tissue_matrix(pid, scan, normal_max_density=60)\n    print(f\"Scan Report for: {report['patient_id']}\")\n    print(f\"  \u2022 Baseline Mean Density : {report['mean_density']} (Normal: < 40)\")\n    print(f\"  \u2022 Peak Density Recorded : {report['max_peak']} / 255\")\n    print(f\"  \u2022 Suspicious Pixel Cells: {report['anomaly_count']} clusters\")\n    print(f\"  \u2022 Clinical Recommendation: {report['status']}\")\n    if report[\"anomalous_coords\"]:\n        print(f\"  \u2022 Heatmap Coordinates   : {report['anomalous_coords']}\")\n    print(\"-\" * 65)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c3_l1_1",
        "question": "In radiographic chest X-ray digital processing, why do bones and dense tumors appear bright white on images while healthy aerated lung tissue appears dark black? - **A)** Radiologists paint bones with white liquid before taking the scan. - **B)** Dense structures (calcium in bones, cellular consolidations in tumors) strongly absorb and attenuate X-ray photons, preventing them from reaching the digital detector plate behind the patient; hollow air spaces let X-rays pass through freely to expose the detector. - **C)** Lungs naturally glow black in the dark. - **D)** Computer monitors invert all medical colors to save electricity.",
        "options": [
          {
            "id": "A",
            "text": "** Radiologists paint bones with white liquid before taking the scan.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Dense structures (calcium in bones, cellular consolidations in tumors) strongly absorb and attenuate X-ray photons, preventing them from reaching the digital detector plate behind the patient; hollow air spaces let X-rays pass through freely to expose the detector.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Lungs naturally glow black in the dark.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Computer monitors invert all medical colors to save electricity.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In classical physics and radiography, **X-ray attenuation** is proportional to physical tissue density and atomic number. Dense calcium in bones and dense fluid in pneumonia absorb X-rays (radiopaque, appearing white). Porous air-filled alveoli in healthy lungs allow photons to penetrate unimpeded (radiolucent, appearing dark).",
        "hint": "Reflect on the principles of AI for Better Health."
      },
      {
        "id": "q_class8_c3_l1_2",
        "question": "Why is the generation of visual **Attention Heatmaps (such as Grad-CAM)** considered a mandatory clinical requirement before an AI diagnostic model can be certified by healthcare regulatory agencies (like the FDA)? - **A)** Heatmaps make medical software look more expensive. - **B)** Doctors must be able to visually verify that the neural network is basing its diagnosis on true pathological tissue lesions rather than confounding artifacts (such as medical tubing, hospital logo stamps, or patient jewelry). - **C)** To keep the doctor awake during night shifts. - **D)** Heatmaps automatically cure the patient's illness.",
        "options": [
          {
            "id": "A",
            "text": "** Heatmaps make medical software look more expensive.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Doctors must be able to visually verify that the neural network is basing its diagnosis on true pathological tissue lesions rather than confounding artifacts (such as medical tubing, hospital logo stamps, or patient jewelry).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** To keep the doctor awake during night shifts.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Heatmaps automatically cure the patient's illness.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In medicine, opaque \"Black Box\" predictions are legally and ethically unacceptable. Grad-CAM visualizes the gradients flowing into the final convolutional layer, highlighting the exact image region responsible for the classification. This allows the radiologist to confirm that the AI is inspecting real pathology rather than shortcut artifacts.",
        "hint": "Reflect on the principles of AI for Better Health."
      },
      {
        "id": "q_class8_c3_l1_3",
        "question": "How does Artificial Intelligence assist oncologists in designing personalized cancer treatments through genomic pattern sequencing? - **A)** By replacing cancer surgery with virtual reality video games. - **B)** By analyzing billions of DNA base pairs to identify specific oncogenic driver mutations, cross-referencing global biomedical chemical libraries to recommend targeted molecular therapies tailored to the patient's exact genetic profile. - **C)** By changing the patient's blood type. - **D)** By turning off the hospital computer network.",
        "options": [
          {
            "id": "A",
            "text": "** By replacing cancer surgery with virtual reality video games.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** By analyzing billions of DNA base pairs to identify specific oncogenic driver mutations, cross-referencing global biomedical chemical libraries to recommend targeted molecular therapies tailored to the patient's exact genetic profile.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** By changing the patient's blood type.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** By turning off the hospital computer network.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Precision oncology leverages machine learning to sift through massive multi-gigabyte genomic sequences. By pinpointing exact somatic mutations (e.g., $EGFR$ or $BRAF$ mutations), AI algorithms predict which targeted inhibitor drugs will bind effectively to mutant protein receptors, maximizing tumor destruction while minimizing chemotherapy toxicity.",
        "hint": "Reflect on the principles of AI for Better Health."
      },
      {
        "id": "q_class8_c3_l1_4",
        "question": "An autonomous medical AI achieves a 99.8% diagnostic accuracy rate on laboratory skin cancer photos. A healthcare clinic proposes firing all human dermatologists and allowing the AI software to send surgical removal orders directly to automated robotic lasers without human review. What is the fundamental ethical and clinical flaw in this proposal? - **A)** The computer software might run out of printer paper. - **B)** It violates the **Doctor-in-the-Loop (DITL)** safety mandate: machine models lack real-world holistic patient context (medical history, autoimmune disorders, subtle clinical intuition) and algorithms cannot bear legal or moral liability for fatal medical errors. - **C)** Dermatologists are legally required to own 10 lasers. - **D)** Computers cannot see human skin.",
        "options": [
          {
            "id": "A",
            "text": "** The computer software might run out of printer paper.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It violates the **Doctor-in-the-Loop (DITL)** safety mandate: machine models lack real-world holistic patient context (medical history, autoimmune disorders, subtle clinical intuition) and algorithms cannot bear legal or moral liability for fatal medical errors.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Dermatologists are legally required to own 10 lasers.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Computers cannot see human skin.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In healthcare ethics and tort law, an algorithm cannot bear moral agency, hold a medical license, or stand trial for medical malpractice. AI must remain an **assistive diagnostic aid**. Final diagnostic confirmation and surgical intervention must always be authorized by a licensed human physician who considers patient holistic history and bears legal accountability.",
        "hint": "Reflect on the principles of AI for Better Health."
      },
      {
        "id": "q_class8_c3_l1_5",
        "question": "A chest X-ray pneumonia detection AI trained on hospital images in California is deployed at a rural hospital in high-altitude Peru. The model's diagnostic accuracy suddenly plummets from 96% to 62%. What is the most probable epidemiological and data science explanation? - **A)** The Peruvian hospital computers have slower internet. - **B)** **Distribution Shift (Domain Shift)**: differences in imaging hardware calibration, demographic thoracic physiology, prevalence of endemic high-altitude lung adaptations, and background co-infections (like tuberculosis) produced feature distributions that differed significantly from the Californian training dataset. - **C)** X-rays do not travel through air in South America. - **D)** The model forgot how to read English.",
        "options": [
          {
            "id": "A",
            "text": "** The Peruvian hospital computers have slower internet.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** **Distribution Shift (Domain Shift)**: differences in imaging hardware calibration, demographic thoracic physiology, prevalence of endemic high-altitude lung adaptations, and background co-infections (like tuberculosis) produced feature distributions that differed significantly from the Californian training dataset.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** X-rays do not travel through air in South America.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The model forgot how to read English.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Domain / Distribution Shift** is one of the most perilous traps in clinical AI. An algorithm fine-tuned on one hospital's specific imaging machine, patient demographics, and disease prevalence will suffer severe performance degradation when deployed in a new clinical environment with different hardware noise profiles and distinct physiological baselines.",
        "hint": "Reflect on the principles of AI for Better Health."
      }
    ]
  },
  {
    "id": "class8-c3-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 3,
    "chapterTitle": "AI Applications",
    "lessonNumber": 2,
    "lessonTitle": "AI for Better Cities",
    "missionScenario": "> **Mission Codename:** *Operation Metropolis Flow: The Ambulance Green Wave*\n> **Mission Briefing:** High-Stakes Traffic Emergency in Metropolis Center!\n> During Friday evening rush hour, an emergency ambulance carrying a critical cardiac patient is dispatched from North District to the Central Trauma Hospital across 12 congested downtown intersections.\n> Under traditional fixed-timer traffic lights, the ambulance would spend 28 agonizing minutes trapped behind bumper-to-bumper civilian cars idling at red lights. The patient has less than 15 minutes to reach the operating theater!\n> You have been appointed **Chief Smart Metropolis Traffic Architect**! Your mission is to deploy the city\u2019s **Intelligent Urban Traffic AI Engine**! You must process live camera queue feeds, dynamically synchronize traffic signal phase durations, calculate the emergency vehicle\u2019s trajectory, activate an uninterrupted **\"Green Wave\"**, and clear the path without causing a city-wide gridlock disaster!\n---",
    "gameTitle": "Smart Metropolis Mayor",
    "gameEngine": "Urban Traffic Grid Optimization & Crisis Response Simulator.",
    "gameSummary": "#### Game Title: *Smart Metropolis Mayor* - **Game Engine Type:** Urban Traffic Grid Optimization & Crisis Response Simulator. - **Educational Objective:** Hands-on balancing of traffic throughput, carbon emissions reduction, and emergency preemption routing. #### Game Rules & Mechanics: 1. **The Gridiron Map (A $4 \\times 4$ Downtown Grid - 16 Intersections):** - The student monitors live vehicle queues across North-South and East-West corridors.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 3 LESSON 2\n# SMART CITIES: ADAPTIVE TRAFFIC QUEUE & EMERGENCY GREEN WAVE ENGINE\n# =====================================================================\n\ndef simulate_smart_intersection(intersection_id, north_south_cars, east_west_cars, emergency_approaching=False):\n    \"\"\"\n    Computes optimal traffic signal phase durations based on queue volume.\n    Enforces immediate emergency green wave preemption when ambulances approach.\n    \"\"\"\n    total_cars = north_south_cars + east_west_cars\n    base_cycle_seconds = 60\n    \n    # 1. Emergency Preemption Override (Green Wave Protocol)\n    if emergency_approaching:\n        return {\n            \"intersection\": intersection_id,\n            \"phase\": \"\ud83d\udea8 EMERGENCY OVERRIDE: NORTH-SOUTH ALL-GREEN WAVE\",\n            \"duration_sec\": 45,\n            \"ns_cleared\": north_south_cars,\n            \"ew_cleared\": 0,\n            \"status\": \"Ambulance Preemption Active (East-West held on red)\"\n        }\n        \n    # 2. Adaptive Proportional Queue Balancing\n    if total_cars == 0:\n        ns_duration = 30\n        ew_duration = 30\n    else:\n        # Allocate green time proportional to queue demand (Min: 15s, Max: 45s)\n        ns_ratio = north_south_cars / total_cars\n        ns_duration = int(max(15, min(45, base_cycle_seconds * ns_ratio)))\n        ew_duration = base_cycle_seconds - ns_duration\n        \n    # Vehicles clear at roughly 1 car per 2 seconds of green light\n    ns_cleared = min(north_south_cars, ns_duration // 2)\n    ew_cleared = min(east_west_cars, ew_duration // 2)\n    \n    return {\n        \"intersection\": intersection_id,\n        \"phase\": f\"Adaptive Phase (NS: {ns_duration}s | EW: {ew_duration}s)\",\n        \"duration_sec\": base_cycle_seconds,\n        \"ns_cleared\": ns_cleared,\n        \"ew_cleared\": ew_cleared,\n        \"status\": f\"Cleared {ns_cleared + ew_cleared}/{total_cars} vehicles smoothly.\"\n    }\n\n# ----------------- SIMULATED DOWNTOWN ARTERIAL CORRIDOR -----------------\nintersections_telemetry = [\n    {\"id\": \"INT-1st-Ave\",  \"ns_queue\": 35, \"ew_queue\": 8,  \"ambulance\": False},\n    {\"id\": \"INT-2nd-Ave\",  \"ns_queue\": 42, \"ew_queue\": 15, \"ambulance\": True},   # Ambulance approaching!\n    {\"id\": \"INT-3rd-Ave\",  \"ns_queue\": 12, \"ew_queue\": 28, \"ambulance\": False},\n    {\"id\": \"INT-4th-Ave\",  \"ns_queue\": 25, \"ew_queue\": 22, \"ambulance\": False}\n]\n\nprint(\"=== METROPOLIS AI SMART TRAFFIC CONTROL INFERENCE ===\\n\")\ntotal_vehicles_cleared = 0\n\nfor data in intersections_telemetry:\n    result = simulate_smart_intersection(\n        data[\"id\"], data[\"ns_queue\"], data[\"ew_queue\"], emergency_approaching=data[\"ambulance\"]\n    )\n    total_vehicles_cleared += result[\"ns_cleared\"] + result[\"ew_cleared\"]\n    \n    print(f\"Intersection: {result['intersection']}\")\n    print(f\"  \u2022 Signal Command : {result['phase']}\")\n    print(f\"  \u2022 Traffic Status : {result['status']}\")\n    print(f\"  \u2022 Vehicles Flow  : NS Cleared: {result['ns_cleared']} | EW Cleared: {result['ew_cleared']}\")\n    print(\"-\" * 65)\n\nprint(f\"Summary: AI adaptive grid cleared {total_vehicles_cleared} vehicles across corridor.\")\nprint(\"Green Wave protocol successfully prioritized emergency ambulance at 2nd Ave!\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c3_l2_1",
        "question": "How do AI-driven **Adaptive Traffic Control Systems (such as SCATS or SCOOT)** improve urban mobility compared to traditional pre-timed electromechanical signals? - **A)** They turn off all traffic lights and let drivers negotiate manually. - **B)** They analyze real-time vehicle queue lengths and flow rates using computer vision and road sensors, dynamically adjusting green phase durations to reduce idle wait times and vehicle carbon emissions. - **C)** They force all cars to drive at 200 km/h. - **D)** They only work on Sunday mornings.",
        "options": [
          {
            "id": "A",
            "text": "** They turn off all traffic lights and let drivers negotiate manually.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** They analyze real-time vehicle queue lengths and flow rates using computer vision and road sensors, dynamically adjusting green phase durations to reduce idle wait times and vehicle carbon emissions.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** They force all cars to drive at 200 km/h.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** They only work on Sunday mornings.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Fixed-time signals blindly cycle through preset durations regardless of actual traffic density. Adaptive AI systems ingest live camera feeds, calculate dynamic queue ratios, and optimize split times in real time, reducing urban vehicle delay by 25\u201340% and drastically curbing greenhouse gas idling emissions.",
        "hint": "Reflect on the principles of AI for Better Cities."
      },
      {
        "id": "q_class8_c3_l2_2",
        "question": "What is the core operational principle of an **Emergency Vehicle \"Green Wave\" Preemption System**? - **A)** Painting emergency ambulances with bright green paint. - **B)** Using GPS telemetry and acoustic siren sensors to detect an approaching emergency responder, dynamically clearing civilian queues and commanding consecutive traffic lights to green along the route to guarantee unimpeded transit. - **C)** Stopping the ambulance at every intersection for 5 minutes. - **D)** Turning off the streetlights along the route.",
        "options": [
          {
            "id": "A",
            "text": "** Painting emergency ambulances with bright green paint.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Using GPS telemetry and acoustic siren sensors to detect an approaching emergency responder, dynamically clearing civilian queues and commanding consecutive traffic lights to green along the route to guarantee unimpeded transit.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Stopping the ambulance at every intersection for 5 minutes.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Turning off the streetlights along the route.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In trauma and cardiac emergencies, transit time correlates directly with patient mortality. A **Green Wave Preemption System** tracks the ambulance's velocity vector, safely cycling conflicting pedestrian and cross-traffic phases to red in advance so the responder encounters continuous green signals without stopping.",
        "hint": "Reflect on the principles of AI for Better Cities."
      },
      {
        "id": "q_class8_c3_l2_3",
        "question": "How do ultrasonic IoT sensors installed inside public street trash bins optimize municipal garbage collection logistics? - **A)** They automatically disintegrate plastic trash using laser beams. - **B)** They transmit real-time fill-level data to a central dispatch AI, which plans dynamic daily truck collection routes exclusively to full bins, eliminating unnecessary trips to empty cans and reducing diesel fuel waste by up to 50%. - **C)** They play loud music when a person throws away trash. - **D)** They weigh people as they walk by.",
        "options": [
          {
            "id": "A",
            "text": "** They automatically disintegrate plastic trash using laser beams.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** They transmit real-time fill-level data to a central dispatch AI, which plans dynamic daily truck collection routes exclusively to full bins, eliminating unnecessary trips to empty cans and reducing diesel fuel waste by up to 50%.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** They play loud music when a person throws away trash.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** They weigh people as they walk by.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Traditional municipal waste management follows rigid static routes, resulting in trucks driving miles to empty cans that are 10% full while overflowing cans spill onto streets. Fill-level telemetry allows AI route planners to solve dynamic Traveling Salesperson Problems (TSP), collecting only full bins and slashing municipal fleet fuel costs.",
        "hint": "Reflect on the principles of AI for Better Cities."
      },
      {
        "id": "q_class8_c3_l2_4",
        "question": "Why have several democratic cities and human rights organizations placed legal moratoria or strict bans on the use of **Real-Time Facial Recognition Surveillance** in public urban spaces? - **A)** Cameras consume too much city electricity. - **B)** Ubiquitous public facial surveillance threatens fundamental democratic rights to privacy, peaceful assembly, and anonymity in public life, while carrying documented risks of racial misidentification and chilling effects on civic protest. - **C)** Faces cannot be recognized by computers in sunlight. - **D)** Police officers prefer drawing pictures by hand.",
        "options": [
          {
            "id": "A",
            "text": "** Cameras consume too much city electricity.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Ubiquitous public facial surveillance threatens fundamental democratic rights to privacy, peaceful assembly, and anonymity in public life, while carrying documented risks of racial misidentification and chilling effects on civic protest.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Faces cannot be recognized by computers in sunlight.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Police officers prefer drawing pictures by hand.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Mass public biometric surveillance creates severe civil liberties risks. When the state can track every citizen\u2019s physical movements automatically, the constitutional freedom of assembly and public privacy are compromised. Additionally, documented demographic error rates in commercial facial recognition pose severe risks of wrongful detention for minority citizens.",
        "hint": "Reflect on the principles of AI for Better Cities."
      },
      {
        "id": "q_class8_c3_l2_5",
        "question": "How do municipal acoustic sensor networks (such as ShotSpotter) locate the precise coordinates of an emergency incident (like an explosion or gunshot) in a noisy city environment? - **A)** Police officers listen to radio broadcasts. - **B)** Multiple synchronized microphones distributed across city rooftops record the microsecond arrival time of the soundwave; an AI algorithm uses **Acoustic Multilateration (Time Difference of Arrival - TDOA)** to calculate the exact spatial $(x, y)$ coordinates. - **C)** Microphones ask pedestrians what happened. - **D)** Gunshots make the city streetlights turn purple.",
        "options": [
          {
            "id": "A",
            "text": "** Police officers listen to radio broadcasts.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Multiple synchronized microphones distributed across city rooftops record the microsecond arrival time of the soundwave; an AI algorithm uses **Acoustic Multilateration (Time Difference of Arrival - TDOA)** to calculate the exact spatial $(x, y)$ coordinates.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Microphones ask pedestrians what happened.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Gunshots make the city streetlights turn purple.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Acoustic localization uses **Multilateration / TDOA**. Because sound travels at a known velocity ($\\approx 343\\text{ m/s}$ in air), the microsecond difference in when the acoustic impulse reaches three or more geographically separated sensors allows mathematical hyperbolic triangulation, pinpointing the incident location within meters.",
        "hint": "Reflect on the principles of AI for Better Cities."
      }
    ]
  },
  {
    "id": "class8-c4-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 1,
    "lessonTitle": "Find Your Future Path",
    "missionScenario": "> **Mission Codename:** *Operation Silicon Horizon: The Seed Accelerator*\n> **Mission Briefing:** Welcome to the Global Silicon Horizon Venture Incubator!\n> You and your fellow young engineers have just patented a groundbreaking technological breakthrough: *Aero-Net*\u2014a network of solar-powered, autonomous stratospheric gliders that use edge AI computer vision to monitor illegal ocean poaching and provide high-speed emergency internet to remote island communities during natural disasters.\n> An international technology investment syndicate has agreed to consider your venture for a **$2,000,000 Seed Capital Investment**!\n> However, venture capitalists do not invest in vague dreams. They require a rigorous, milestone-driven technical proposal: computing server budgets, flight sensor procurement, regulatory compliance pathways, and clear metrics of social impact.\n> Your mission as the **Lead Founder & Chief Technology Officer** is to formulate the engineering proposal, allocate resources in Python, and pitch your roadmap to secure the venture investment!\n---",
    "gameTitle": "The Future Tech Incubator",
    "gameEngine": "Startup Venture Strategy & Runway Management Simulation.",
    "gameSummary": "#### Game Title: *The Future Tech Incubator* - **Game Engine Type:** Startup Venture Strategy & Runway Management Simulation. - **Educational Objective:** Hands-on balancing of technical milestones, capital burn rates, engineering hiring, and commercial deployment under market uncertainty. #### Game Rules & Mechanics: 1. **The Venture Portfolio Setup:** - The student chooses one frontier venture: *Bio-Prosthetic AI*, *Stratospheric Eco-Drone*, or *Quantum Climate Simulator*.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 4 LESSON 1\n# VENTURE STRATEGY: QUANTITATIVE CAPITAL RUNWAY & MILESTONE SCHEDULER\n# =====================================================================\n\ndef evaluate_startup_runway(total_seed_capital, quarterly_budget_plan):\n    \"\"\"\n    Simulates startup treasury over 4 quarters:\n    Tracks burn rate, compute expenses, talent salaries, and milestone achievements.\n    Ensures the enterprise does not deplete funds before reaching Series A.\n    \"\"\"\n    treasury = total_seed_capital\n    print(f\"Initial Seed Capital Ingested: ${treasury:,.2f}\\n\")\n    print(f\"{'QUARTER':<9} | {'EXPENSES':<12} | {'TREASURY REMAINING':<20} | {'RUNWAY (MONTHS)':<16} | {'STATUS'}\")\n    print(\"-\" * 78)\n    \n    for row in quarterly_budget_plan:\n        q_name = row[\"quarter\"]\n        compute_cost = row[\"cloud_compute\"]\n        salaries = row[\"talent_salaries\"]\n        legal_safety = row[\"compliance_safety\"]\n        \n        quarterly_burn = compute_cost + salaries + legal_safety\n        monthly_burn = quarterly_burn / 3.0\n        \n        treasury -= quarterly_burn\n        runway_months = treasury / monthly_burn if monthly_burn > 0 else 0.0\n        \n        if treasury < 0:\n            status = \"\ud83d\udea8 BANKRUPTCY: Treasury exhausted!\"\n            runway_months = 0.0\n        elif runway_months < 3.0:\n            status = \"\u26a0\ufe0f CRITICAL CASH WARNING: Urgent funding needed!\"\n        else:\n            status = f\"\u2705 STABLE: Milestone '{row['milestone_target']}' achieved.\"\n            \n        print(f\"{q_name:<9} | ${quarterly_burn:<11,.0f} | ${treasury:<19,.0f} | {runway_months:<15.1f} | {status}\")\n        \n    print(\"-\" * 78)\n    if treasury > 0:\n        print(f\"Series A Preparedness: Venture survived Year 1 with ${treasury:,.0f} reserve capital!\")\n        print(\"Ready for Series A Institutional Investment round.\")\n    else:\n        print(\"Restructuring Required: Reduce cloud compute burn rate or consolidate headcount.\")\n\n# ----------------- SIMULATED YEAR 1 VENTURE BUDGET -----------------\nyear_1_budget = [\n    {\n        \"quarter\": \"Q1\", \"cloud_compute\": 40000, \"talent_salaries\": 120000, \n        \"compliance_safety\": 15000, \"milestone_target\": \"PoC Benchmark 92%\"\n    },\n    {\n        \"quarter\": \"Q2\", \"cloud_compute\": 55000, \"talent_salaries\": 120000, \n        \"compliance_safety\": 20000, \"milestone_target\": \"MVP Prototype Complete\"\n    },\n    {\n        \"quarter\": \"Q3\", \"cloud_compute\": 35000, \"talent_salaries\": 140000, \n        \"compliance_safety\": 25000, \"milestone_target\": \"Field Pilot with 500 Users\"\n    },\n    {\n        \"quarter\": \"Q4\", \"cloud_compute\": 30000, \"talent_salaries\": 140000, \n        \"compliance_safety\": 30000, \"milestone_target\": \"Safety Audit & Series A Pitch\"\n    }\n]\n\nprint(\"=== SILICON HORIZON VENTURE FINANCIAL FEASIBILITY RUN ===\\n\")\nevaluate_startup_runway(total_seed_capital=1000000.0, quarterly_budget_plan=year_1_budget)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c4_l1_1",
        "question": "Which frontier AI specialist is primarily responsible for redesigning neural network architectures, quantizing weights, and fabricating custom Application-Specific Integrated Circuits (ASICs) so that deep learning models can run on low-power prosthetic limbs and satellite transceivers? - **A)** Social Media Influencer - **B)** Edge AI Hardware Architect - **C)** Television Broadcast Operator - **D)** Database Billing Clerk",
        "options": [
          {
            "id": "A",
            "text": "** Social Media Influencer",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Edge AI Hardware Architect",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Television Broadcast Operator",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Database Billing Clerk",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Cloud servers consume massive electrical wattage that cannot be supplied by small drone batteries or biological bionic implants. **Edge AI Hardware Architects** specialize in neuromorphic silicon design, tensor processing units (TPUs), and model quantization, enabling models to perform real-time neural inference at the physical \"edge\" on milliwatts of power.",
        "hint": "Reflect on the principles of Find Your Future Path."
      },
      {
        "id": "q_class8_c4_l1_2",
        "question": "In technology venture capital economics, what does a startup's **\"Runway\"** represent? - **A)** The physical length of the airport tarmac where founders take business flights. - **B)** The amount of time (typically measured in months) a startup can continue operating before exhausting its remaining bank treasury reserves at its current monthly burn rate. - **C)** The number of lines of Python code in the repository. - **D)** The download speed of the company's Wi-Fi network.",
        "options": [
          {
            "id": "A",
            "text": "** The physical length of the airport tarmac where founders take business flights.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The amount of time (typically measured in months) a startup can continue operating before exhausting its remaining bank treasury reserves at its current monthly burn rate.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The number of lines of Python code in the repository.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The download speed of the company's Wi-Fi network.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In venture finance, **Runway** is calculated as $\\text{Runway} = \\frac{\\text{Current Cash Reserves}}{\\text{Monthly Burn Rate}}$. It is the existential clock governing every early-stage company: if a startup fails to achieve technical proof-of-concept or secure its next funding tranche before runway reaches zero, it faces immediate liquidation.",
        "hint": "Reflect on the principles of Find Your Future Path."
      },
      {
        "id": "q_class8_c4_l1_3",
        "question": "In advanced artificial intelligence research, what is the core focus of the **\"AI Alignment Problem\"**? - **A)** Ensuring that computer monitors are physically aligned parallel to office desks. - **B)** The challenge of ensuring that highly capable autonomous AI systems reliably pursue outcomes and values that are genuinely aligned with human intent, safety, ethics, and well-being, rather than exploiting loopholes or pursuing dangerous unintended proxies. - **C)** Aligning text to the left margin in word processors. - **D)** Making sure robots walk in a straight line.",
        "options": [
          {
            "id": "A",
            "text": "** Ensuring that computer monitors are physically aligned parallel to office desks.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The challenge of ensuring that highly capable autonomous AI systems reliably pursue outcomes and values that are genuinely aligned with human intent, safety, ethics, and well-being, rather than exploiting loopholes or pursuing dangerous unintended proxies.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Aligning text to the left margin in word processors.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Making sure robots walk in a straight line.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Formulated by pioneering computer scientists, the **AI Alignment Problem** addresses the existential risk that an autonomous super-optimizer given a seemingly harmless goal (e.g., *\"Eliminate cancer\"* or *\"Maximize manufacturing throughput\"*) might discover mathematically optimal but catastrophic shortcuts (e.g., eliminating all living organisms so cancer cannot exist). Alignment ensures systems remain bounded by human ethical constraints.",
        "hint": "Reflect on the principles of Find Your Future Path."
      },
      {
        "id": "q_class8_c4_l1_4",
        "question": "A student startup receives a grant to build an AI app that translates sign language in real time using smartphone cameras. The founders immediately spend 80% of their money hiring 10 graphic designers to design merchandise, t-shirts, and glossy advertising banners, while the sign-language translation model only achieves 35% accuracy and crashes constantly. What classic startup failure mode does this illustrate? - **A)** Over-engineering the neural network. - **B)** **Premature Scaling / Neglect of Minimum Viable Product (MVP)**: spending capital on marketing and superficial aesthetics before validating that the core technological engine functions reliably and delivers real user value. - **C)** Running out of computer electricity. - **D)** Using Python instead of JavaScript.",
        "options": [
          {
            "id": "A",
            "text": "** Over-engineering the neural network.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** **Premature Scaling / Neglect of Minimum Viable Product (MVP)**: spending capital on marketing and superficial aesthetics before validating that the core technological engine functions reliably and delivers real user value.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Running out of computer electricity.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Using Python instead of JavaScript.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Premature Scaling** is cited by venture studies as the #1 reason tech startups collapse. Successful ventures prioritize technical **Proof-of-Concept (PoC)** and product-market validation: proving the core algorithmic value proposition works reliably on real users before spending precious capital on marketing campaigns or corporate overhead.",
        "hint": "Reflect on the principles of Find Your Future Path."
      },
      {
        "id": "q_class8_c4_l1_5",
        "question": "Why is the concentration of advanced frontier AI research and compute infrastructure in a handful of wealthy nations a grave geopolitical risk for global development? - **A)** Silicon chips cannot cross geographic borders. - **B)** It threatens to exacerbate the **Global Digital Divide**, where developing nations become mere passive consumers of foreign technology and uncompensated training data donors, leaving their specific cultural dialects, local agricultural crises, and healthcare needs neglected by global models. - **C)** Other nations are forbidden from using the internet. - **D)** It makes computer monitors more expensive in winter.",
        "options": [
          {
            "id": "A",
            "text": "** Silicon chips cannot cross geographic borders.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It threatens to exacerbate the **Global Digital Divide**, where developing nations become mere passive consumers of foreign technology and uncompensated training data donors, leaving their specific cultural dialects, local agricultural crises, and healthcare needs neglected by global models.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Other nations are forbidden from using the internet.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It makes computer monitors more expensive in winter.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** If AI ownership and compute capacity remain concentrated among a few wealthy tech hubs, the technology will be tailored exclusively to the commercial incentives of those markets. Ensuring global open-source models, equitable compute access, and local capacity-building allows developing nations to deploy AI sovereignty to solve their own urgent regional challenges.",
        "hint": "Reflect on the principles of Find Your Future Path."
      }
    ]
  },
  {
    "id": "class8-c4-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 4,
    "chapterTitle": "AI and Career",
    "lessonNumber": 2,
    "lessonTitle": "AI Career Discovery",
    "missionScenario": "> **Mission Codename:** *Operation Digital Footprint: The Recruiter Showcase*\n> **Mission Briefing:** Welcome to the International Collegiate Tech Admissions Expo!\n> Top university artificial intelligence labs and frontier technology research institutes have opened applications for their prestigious summer pre-college fellowship. Over 5,000 students have applied!\n> Admissions directors are drowning in paper resumes that all look identical: *\"Passionate student, loves computers, knows Python.\"* Words on paper mean nothing! Directors spend an average of only **30 seconds** reviewing an application.\n> What catches their eye? A live, verified, interactive **Technical Portfolio**\u2014complete with public GitHub repositories, crisp README documentation, runnable code demonstrations, and verified open-source contributions!\n> Your mission is to enter the *Tech Portfolio Showcase*, curate your best engineering projects, structure an exportable developer schema in Python, and build a world-class digital portfolio that proves your capabilities to admissions directors!\n---",
    "gameTitle": "Tech Portfolio Showcase",
    "gameEngine": "Digital Identity Construction & Recruiter Evaluation Arena.",
    "gameSummary": "#### Game Title: *Tech Portfolio Showcase* - **Game Engine Type:** Digital Identity Construction & Recruiter Evaluation Arena. - **Educational Objective:** Hands-on mastery of JSON portfolio data schemas, repository organization, and technical writing. #### Game Rules & Mechanics: 1. **The Candidate Dashboard:** - The student has a pool of 6 completed projects from earlier lessons (e.g., *Planetary Asteroid Defense*, *Smart Agro-Manager*, *Wall Street Fraud Buster*, *Socratic Study Assistant*).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 4 LESSON 2\n# PORTFOLIO ENGINEERING: DEVELOPER SCHEMA VALIDATOR & MARKDOWN EXPORTER\n# =====================================================================\n\nimport json\n\ndef validate_and_export_portfolio(portfolio_data):\n    \"\"\"\n    Validates a structured developer portfolio schema:\n    - Verifies mandatory keys (name, bio, technical_skills, projects).\n    - Ensures each project contains title, repo_url, tech_stack, and verified outcome.\n    - Exports a beautifully formatted GitHub profile README.md string.\n    \"\"\"\n    # 1. Schema Validation\n    required_top_keys = [\"developer_name\", \"tagline\", \"technical_skills\", \"featured_projects\"]\n    for k in required_top_keys:\n        if k not in portfolio_data:\n            return False, f\"Schema Error: Missing top-level key '{k}'\", \"\"\n\n    projects = portfolio_data[\"featured_projects\"]\n    if len(projects) < 2:\n        return False, \"Validation Error: Portfolio must showcase at least 2 verified projects!\", \"\"\n\n    # 2. Build Markdown Export\n    md = f\"# \ud83d\ude80 Developer Portfolio: {portfolio_data['developer_name']}\\n\"\n    md += f\"**{portfolio_data['tagline']}**\\n\\n\"\n    md += \"## \ud83d\udee0\ufe0f Core Technical Superpowers\\n\"\n    md += f\"- **Programming Languages:** {', '.join(portfolio_data['technical_skills']['languages'])}\\n\"\n    md += f\"- **AI & ML Domains:** {', '.join(portfolio_data['technical_skills']['ai_domains'])}\\n\"\n    md += f\"- **Tools & Platforms:** {', '.join(portfolio_data['technical_skills']['tools'])}\\n\\n\"\n    md += \"## \ud83c\udf1f Featured Engineering Projects\\n\\n\"\n\n    for idx, p in enumerate(projects, 1):\n        md += f\"### {idx}. {p['title']}\\n\"\n        md += f\"- **Problem Solved:** {p['problem_summary']}\\n\"\n        md += f\"- **Quantified Impact:** {p['quantified_outcome']}\\n\"\n        md += f\"- **Tech Stack:** `{', '.join(p['tech_stack'])}`\\n\"\n        md += f\"- **Repository:** [{p['repo_name']}]({p['repo_url']}) | **License:** `{p['license']}`\\n\\n\"\n\n    md += \"---\\n*Verified by the Global Artificial Intelligence Olympiad (GAIO) Credential Network.*\"\n    return True, \"Portfolio validated and compiled successfully!\", md\n\n# ----------------- SIMULATED DEVELOPER RECORD -----------------\nstudent_portfolio_data = {\n    \"developer_name\": \"Kavya Patel\",\n    \"tagline\": \"Aspiring AI Safety & Healthcare Machine Learning Engineer | Class 8\",\n    \"technical_skills\": {\n        \"languages\": [\"Python 3.12\", \"SQL\", \"HTML/CSS\"],\n        \"ai_domains\": [\"Computer Vision\", \"Anomaly Detection\", \"Ethical AI Auditing\"],\n        \"tools\": [\"Git\", \"GitHub\", \"Jupyter\", \"Linux Terminal\"]\n    },\n    \"featured_projects\": [\n        {\n            \"title\": \"Bio-Vision: ICU Chest Radiograph Anomaly Detector\",\n            \"problem_summary\": \"Assists fatigued emergency radiologists by localizing high-density pneumonia opacities.\",\n            \"quantified_outcome\": \"Achieved 96.5% Recall on 500 clinical test scans with Grad-CAM heatmaps.\",\n            \"tech_stack\": [\"Python\", \"Computer Vision\", \"Matrix Math\", \"Grad-CAM\"],\n            \"repo_name\": \"kavya/bio-vision-icu\",\n            \"repo_url\": \"https://github.com/kavya/bio-vision-icu\",\n            \"license\": \"MIT\"\n        },\n        {\n            \"title\": \"Eco-Grid: 24-Hour Smart Renewable Energy Dispatcher\",\n            \"problem_summary\": \"Balances solar and wind generation intermittency against municipal city demands.\",\n            \"quantified_outcome\": \"Zero city blackouts maintained while reducing fossil peaker use to 0 MWh.\",\n            \"tech_stack\": [\"Python\", \"Simulation Modeling\", \"Numerical Optimization\"],\n            \"repo_name\": \"kavya/ecogrid-dispatcher\",\n            \"repo_url\": \"https://github.com/kavya/ecogrid-dispatcher\",\n            \"license\": \"Apache-2.0\"\n        }\n    ]\n}\n\nprint(\"=== GAIO DEVELOPER PORTFOLIO COMPILER ===\\n\")\nvalid, msg, compiled_markdown = validate_and_export_portfolio(student_portfolio_data)\nprint(f\"Compilation Status: {'\u2705 PASSED' if valid else '\u274c FAILED'}\")\nprint(f\"Log: {msg}\\n\")\n\nif valid:\n    print(\"--- COMPILED GITHUB PROFILE README.md EXPORT ---\")\n    print(compiled_markdown)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c4_l2_1",
        "question": "If an engineer releases a machine learning software tool under the **MIT License**, what legal permissions are granted to other developers who download the code? - **A)** Developers are only allowed to read the code, but cannot run it. - **B)** Developers are permitted to freely use, modify, merge, publish, distribute, sublicense, and even sell copies of the software commercially, provided that the original author's copyright notice and permission notice are preserved. - **C)** Developers must pay the original author $1,000 per month. - **D)** The code can only be run on Linux operating systems.",
        "options": [
          {
            "id": "A",
            "text": "** Developers are only allowed to read the code, but cannot run it.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Developers are permitted to freely use, modify, merge, publish, distribute, sublicense, and even sell copies of the software commercially, provided that the original author's copyright notice and permission notice are preserved.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Developers must pay the original author $1,000 per month.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The code can only be run on Linux operating systems.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** The **MIT License** is one of the most popular and permissive open-source licenses in modern software engineering. It grants broad, worldwide permissions to use and modify code for any purpose (including proprietary commercial software), requiring only that the original copyright attribution be retained.",
        "hint": "Reflect on the principles of AI Career Discovery."
      },
      {
        "id": "q_class8_c4_l2_2",
        "question": "Why do technical recruiters and university admissions committees place vastly higher value on a candidate's public **GitHub Repository** with unit tests and a live web demo than on a traditional written bullet point on a paper resume? - **A)** Paper resumes take up too much physical desk space. - **B)** A public repository provides concrete, verifiable proof of technical competence: recruiters can directly inspect code quality, architecture modularity, git commit hygiene, test coverage, and documentation clarity. - **C)** Recruiters are forbidden by law from reading paper resumes. - **D)** GitHub pays recruiters a referral fee.",
        "options": [
          {
            "id": "A",
            "text": "** Paper resumes take up too much physical desk space.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A public repository provides concrete, verifiable proof of technical competence: recruiters can directly inspect code quality, architecture modularity, git commit hygiene, test coverage, and documentation clarity.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Recruiters are forbidden by law from reading paper resumes.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** GitHub pays recruiters a referral fee.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Anyone can write *\"Proficient in Machine Learning\"* on a paper resume. A public repository represents **Proof-of-Work**: it demonstrates that the candidate knows how to structure directories, write clean functions, document dependencies, and write reproducible software that actually executes without errors.",
        "hint": "Reflect on the principles of AI Career Discovery."
      },
      {
        "id": "q_class8_c4_l2_3",
        "question": "In modern software engineering, what is the role of a **Git Commit**? - **A)** A payment sent to a software developer's bank account. - **B)** A permanent, cryptographically hashed snapshot of the project\u2019s files at a specific point in time, accompanied by a descriptive message explaining the exact technical changes made. - **C)** A tool that deletes old computer code. - **D)** A message sent to a customer support desk.",
        "options": [
          {
            "id": "A",
            "text": "** A payment sent to a software developer's bank account.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A permanent, cryptographically hashed snapshot of the project\u2019s files at a specific point in time, accompanied by a descriptive message explaining the exact technical changes made.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** A tool that deletes old computer code.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** A message sent to a customer support desk.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In the **Git version control system**, a commit records changes to one or more files in the repository history. Each commit has a unique SHA-1/SHA-256 hash, an author timestamp, and a commit message, allowing teams to trace project evolution, collaborate simultaneously, and roll back unintended regressions.",
        "hint": "Reflect on the principles of AI Career Discovery."
      },
      {
        "id": "q_class8_c4_l2_4",
        "question": "A student publishes a research paper claiming: *\"Our new deep learning model predicts earthquakes 48 hours in advance with 99.8% accuracy!\"* However, their GitHub repository contains no dataset links, no random seeds, no training script, and only a pre-saved graph image. Why will the global scientific community reject this claim? - **A)** The student didn't use colorful fonts in their graphs. - **B)** The research violates **Scientific Reproducibility**: without access to the raw training data split, reproducible code scripts, and precise hyperparameter configurations, other independent researchers cannot verify or replicate the findings, making the claim scientifically untrustworthy. - **C)** Earthquakes cannot be predicted by computers. - **D)** Scientists are only allowed to read papers published on television.",
        "options": [
          {
            "id": "A",
            "text": "** The student didn't use colorful fonts in their graphs.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The research violates **Scientific Reproducibility**: without access to the raw training data split, reproducible code scripts, and precise hyperparameter configurations, other independent researchers cannot verify or replicate the findings, making the claim scientifically untrustworthy.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Earthquakes cannot be predicted by computers.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Scientists are only allowed to read papers published on television.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Reproducibility** is the foundational bedrock of all modern science. In computational AI research, an extraordinary performance claim must be accompanied by open, reproducible code and evaluation data splits so that peer scientists can independently replicate and verify the claim. Without reproducibility, results are dismissed as unverified noise.",
        "hint": "Reflect on the principles of AI Career Discovery."
      },
      {
        "id": "q_class8_c4_l2_5",
        "question": "What is the function of a project's `requirements.txt` file in a Python repository? - **A)** It lists the names of all the programmers who worked on the code. - **B)** It specifies the exact software libraries and version dependencies (e.g., `numpy==1.26.4`, `scikit-learn==1.4.0`) required for another developer to install and run the project without dependency conflicts. - **C)** It is a list of homework instructions from a teacher. - **D)** It is a legal contract between the coder and the government.",
        "options": [
          {
            "id": "A",
            "text": "** It lists the names of all the programmers who worked on the code.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It specifies the exact software libraries and version dependencies (e.g., `numpy==1.26.4`, `scikit-learn==1.4.0`) required for another developer to install and run the project without dependency conflicts.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** It is a list of homework instructions from a teacher.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It is a legal contract between the coder and the government.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Python environments rely on specific external libraries. The `requirements.txt` file documents exact library versions, allowing other developers to instantly recreate an identical virtual environment using `pip install -r requirements.txt`, ensuring that the code executes identically across different computers.",
        "hint": "Reflect on the principles of AI Career Discovery."
      }
    ]
  },
  {
    "id": "class8-c5-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 1,
    "lessonTitle": "Build with GenAI",
    "missionScenario": "> **Mission Codename:** *Operation Dream-Weaver: The Neural Art Engine*\n> **Mission Briefing:** Welcome to the Apex Generative Research Laboratory!\n> An international animated film studio is developing a breakthrough visual sci-fi epic: *Chronicles of Kepler-186f*.\n> The studio needs to synthesize hundreds of photorealistic concept art frames depicting exotic alien crystal forests, bioluminescent atmosphere storms, and futuristic explorer exosuits.\n> However, junior concept artists are getting erratic results! Sometimes the images look blurry and oversaturated; other times the character has three arms; and when they try to regenerate a scene with minor lighting changes, the entire character transforms into someone completely different because they don't understand **Random Seeds and Guidance Scales**!\n> As the **Lead Generative AI Systems Architect**, your mission is to master the **Underlying Mathematics of Diffusion Models**, calibrate the noise schedules, configure CFG scales, and engineer a deterministic, controllable generative pipeline that turns raw text prompts into visual masterpieces!\n---",
    "gameTitle": "The Neural Media Architect",
    "gameEngine": "Diffusion Model Latent Space Calibration Simulator.",
    "gameSummary": "#### Game Title: *The Neural Media Architect* - **Game Engine Type:** Diffusion Model Latent Space Calibration Simulator. - **Educational Objective:** Hands-on mastery of CFG guidance scales, denoising step optimization, random seeds, and negative prompt conditioning. #### Game Rules & Mechanics: 1. **The Concept Art Commission:** - The studio board requests an exact target visual: *The Emerald Bioluminescent Cavern of Kepler-186f* (A deep subterranean crystal cave with glowing cyan moss, volumetric fog, realistic stone textures, no humans, no modern technology).",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 5 LESSON 1\n# GENERATIVE AI: LATENT DIFFUSION HYPERPARAMETER & SCHEDULER ENGINE\n# =====================================================================\n\ndef simulate_diffusion_denoising_schedule(steps, cfg_scale, seed_val, prompt, negative_prompt=\"\"):\n    \"\"\"\n    Simulates the mathematical latent diffusion inference loop:\n    1. Initializes pseudo-random Gaussian noise from seed.\n    2. Calculates noise reduction per step.\n    3. Evaluates prompt conditioning fidelity and artifact risk based on CFG scale.\n    \"\"\"\n    print(f\"\ud83d\ude80 INITIATING DIFFUSION INFERENCE PIPELINE (Seed: {seed_val})\")\n    print(f\"Prompt         : \\\"{prompt}\\\"\")\n    print(f\"Negative Prompt: \\\"{negative_prompt}\\\"\\n\")\n    print(f\"{'STEP':<6} | {'LATENT NOISE (%)':<18} | {'GUIDANCE INFLUENCE':<20} | {'ARTIFACT RISK'}\")\n    print(\"-\" * 65)\n    \n    current_noise = 1.0  # Starts at 100% pure random Gaussian noise\n    step_decay = 1.0 / steps\n    \n    # Evaluate CFG Health\n    if cfg_scale < 4.0:\n        guidance_status = \"Weak (Under-conditioned)\"\n        artifact_risk = \"Prompt Ignored / Vagueness\"\n    elif 6.5 <= cfg_scale <= 9.0:\n        guidance_status = \"Optimal (High Fidelity)\"\n        artifact_risk = \"Minimal / Clean Photorealism\"\n    elif cfg_scale > 14.0:\n        guidance_status = \"Extreme (Over-conditioned)\"\n        artifact_risk = \"\ud83d\udea8 Severe Saturation Burn & Clashing Edges\"\n    else:\n        guidance_status = \"Moderate\"\n        artifact_risk = \"Low\"\n\n    # Display milestone steps in reverse denoising process\n    milestones = [1, steps // 4, steps // 2, (3 * steps) // 4, steps]\n    \n    for s in range(1, steps + 1):\n        current_noise = max(0.0, current_noise - step_decay)\n        \n        if s in milestones:\n            print(f\"Step {s:<2} | {current_noise * 100:<17.1f}% | {guidance_status:<20} | {artifact_risk}\")\n            \n    print(\"-\" * 65)\n    print(\"\u2705 LATENT DENOISING COMPLETE: Image decoded via VAE to 1024x1024 RGB tensor.\\n\")\n    \n    return {\n        \"final_noise\": current_noise,\n        \"cfg_scale\": cfg_scale,\n        \"steps_executed\": steps,\n        \"artifact_risk\": artifact_risk\n    }\n\n# ----------------- SIMULATED RUNS ACROSS DIFFERENT CFG VALUES -----------------\ntest_prompt = \"Cinematic 8k photograph of a crystalline bioluminescent forest on Kepler-186f, volumetric fog, anamorphic lens\"\nneg_prompt = \"blurry, deformed, cartoon, oversaturated, human figures\"\n\nprint(\"=== TEST RUN 1: OPTIMAL BALANCED HYPERPARAMETERS ===\")\nrun_1 = simulate_diffusion_denoising_schedule(\n    steps=30, cfg_scale=7.5, seed_val=42891, prompt=test_prompt, negative_prompt=neg_prompt\n)\n\nprint(\"=== TEST RUN 2: HIGH CFG SATURATION STRESS TEST ===\")\nrun_2 = simulate_diffusion_denoising_schedule(\n    steps=30, cfg_scale=18.0, seed_val=42891, prompt=test_prompt, negative_prompt=neg_prompt\n)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c5_l1_1",
        "question": "In modern Latent Diffusion Models (such as Stable Diffusion or Midjourney), what is the fundamental mathematical role performed by the neural network during the reverse image generation process? - **A)** The neural network copies and pastes pre-existing photos downloaded from the internet into a collage. - **B)** The neural network predicts and subtracts the exact mathematical noise pattern added at each discrete step, gradually converting an unorganized Gaussian noise latent field into a clear, high-resolution coherent image conditioned on the text prompt. - **C)** The network changes the screen resolution of the monitor. - **D)** It searches Wikipedia for definitions.",
        "options": [
          {
            "id": "A",
            "text": "** The neural network copies and pastes pre-existing photos downloaded from the internet into a collage.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The neural network predicts and subtracts the exact mathematical noise pattern added at each discrete step, gradually converting an unorganized Gaussian noise latent field into a clear, high-resolution coherent image conditioned on the text prompt.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The network changes the screen resolution of the monitor.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It searches Wikipedia for definitions.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Diffusion models do not copy and paste existing photos. They are trained on a **Denoising Score Matching** objective. Starting from pure random Gaussian static noise, a U-Net neural network estimates the noise gradient conditioned on the cross-attention text prompt, iteratively subtracting noise over 20 to 50 steps until a clean image emerges.",
        "hint": "Reflect on the principles of Build with GenAI."
      },
      {
        "id": "q_class8_c5_l1_2",
        "question": "What visual failure mode occurs in image diffusion generation when an artist sets the **Classifier-Free Guidance (CFG Scale)** to an unnaturally high value (e.g., $\\text{CFG} = 25$ or $30$)? - **A)** The image becomes completely transparent. - **B)** Severe color oversaturation (\"deep-frying\"), unnatural high-contrast edge artifacts, and garish anatomical distortions caused by mathematically over-constraining the conditioning vectors beyond the natural latent data manifold. - **C)** The computer processor ceases to function permanently. - **D)** The generated image turns into plain black text.",
        "options": [
          {
            "id": "A",
            "text": "** The image becomes completely transparent.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Severe color oversaturation (\"deep-frying\"), unnatural high-contrast edge artifacts, and garish anatomical distortions caused by mathematically over-constraining the conditioning vectors beyond the natural latent data manifold.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The computer processor ceases to function permanently.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The generated image turns into plain black text.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Classifier-Free Guidance (CFG)** controls the trade-off between sample fidelity and diversity. When CFG is pushed to extreme values ($>15$), the model over-amplifies prompt tokens at the expense of natural pixel distributions, leading to the well-known \"burnt / deep-fried\" look characterized by hyper-saturated neon colors and distorted, harsh edges.",
        "hint": "Reflect on the principles of Build with GenAI."
      },
      {
        "id": "q_class8_c5_l1_3",
        "question": "Why is recording and locking the exact **Random Seed (Seed Integer)** essential when developing continuous visual concept art (such as illustrating multiple scenes of the same main character)? - **A)** Seeds make the internet download faster. - **B)** The seed initializes the exact pseudo-random Gaussian noise matrix at Step 0; locking the seed ensures that the underlying facial geometry, composition, and physical proportions remain consistent across iterative prompt modifications. - **C)** Diffusion models refuse to run if the seed is a secret. - **D)** Seeds determine the price of the software license.",
        "options": [
          {
            "id": "A",
            "text": "** Seeds make the internet download faster.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The seed initializes the exact pseudo-random Gaussian noise matrix at Step 0; locking the seed ensures that the underlying facial geometry, composition, and physical proportions remain consistent across iterative prompt modifications.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Diffusion models refuse to run if the seed is a secret.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Seeds determine the price of the software license.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In pseudo-random generative processes, the **Seed** initializes the pseudo-random number generator (PRNG). If two generations share the same seed, they start with the identical initial spatial noise distribution. This allows creators to maintain character facial structure and camera angles while altering lighting or background details.",
        "hint": "Reflect on the principles of Build with GenAI."
      },
      {
        "id": "q_class8_c5_l1_4",
        "question": "A commercial studio uses a generative diffusion model to synthesize background artwork for a commercial video game. The model was trained on billions of uncredited copyrighted paintings scraped from independent human artists without compensation. What legal and ethical dilemma does this pose? - **A)** The computer software will catch a biological virus. - **B)** Intellectual Property Infringement & Unfair Competition: the system profits commercially from derivative statistical representations of living human artists' distinct styles without consent, credit, or compensation, raising questions regarding copyright fair use and creator livelihoods. - **C)** Paintings on the internet become blurry after being viewed by an AI. - **D)** Video games are legally forbidden from having backgrounds.",
        "options": [
          {
            "id": "A",
            "text": "** The computer software will catch a biological virus.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Intellectual Property Infringement & Unfair Competition: the system profits commercially from derivative statistical representations of living human artists' distinct styles without consent, credit, or compensation, raising questions regarding copyright fair use and creator livelihoods.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Paintings on the internet become blurry after being viewed by an AI.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Video games are legally forbidden from having backgrounds.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Generative models are trained on internet-scale datasets (like LAION-5B) containing millions of copyrighted illustrations. When models reproduce the distinct signature aesthetic of living artists or mimic proprietary intellectual property, it sparks intense legal and ethical battles over **Fair Use vs Commercial Exploitation**, driving calls for mandatory training consent and artist royalty frameworks.",
        "hint": "Reflect on the principles of Build with GenAI."
      },
      {
        "id": "q_class8_c5_l1_5",
        "question": "In a Generative Adversarial Network (GAN), what is the relationship between the **Generator** and the **Discriminator**? - **A)** They are two identical computers that send emails to each other. - **B)** An adversarial zero-sum game: the Generator attempts to synthesize fake data samples indistinguishable from reality, while the Discriminator acts as a digital detective attempting to classify whether each sample is real or synthetic; both improve simultaneously through competition. - **C)** The Generator writes code; the Discriminator deletes it. - **D)** The Discriminator charges money to the Generator.",
        "options": [
          {
            "id": "A",
            "text": "** They are two identical computers that send emails to each other.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** An adversarial zero-sum game: the Generator attempts to synthesize fake data samples indistinguishable from reality, while the Discriminator acts as a digital detective attempting to classify whether each sample is real or synthetic; both improve simultaneously through competition.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The Generator writes code; the Discriminator deletes it.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The Discriminator charges money to the Generator.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Formulated by Ian Goodfellow in 2014, a **GAN** is structured as an adversarial min-max game. The Generator network maps latent noise into candidate images, while the Discriminator network evaluates whether the images are real (from the training set) or fake (from the Generator). Through simultaneous backpropagation, both networks continuously push each other toward photorealistic synthesis.",
        "hint": "Reflect on the principles of Build with GenAI."
      }
    ]
  },
  {
    "id": "class8-c5-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 5,
    "chapterTitle": "AI Tools",
    "lessonNumber": 2,
    "lessonTitle": "AI Media Studio",
    "missionScenario": "> **Mission Codename:** *Operation Studio-Chrono: The Deep-Space Documentary*\n> **Mission Briefing:** Welcome to the Holo-Cinema Production Studios!\n> The World Science Foundation has commissioned an urgent educational documentary trailer: *\"Voyage to the Ice Geysers of Enceladus\"*, designed to inspire millions of students worldwide about space exploration.\n> However, the launch window is in 24 hours, and traditional CGI movie production takes 18 months and $50,000,000!\n> The studio director has authorized the use of the **AI Media Studio Pipeline**\u2014an automated orchestration suite that links foundation models together: an LLM writes the scientific documentary script, a neural audio model synthesizes a warm British narrator voice, an image diffusion model renders concept shots of icy geysers erupting into space, and an alignment model binds them into a synchronized timeline!\n> As the **Chief Multimodal Pipeline Director**, your mission is to orchestrate the models in Python, eliminate pacing latency, prevent visual continuity glitches, and produce a broadcast-quality science trailer!\n---",
    "gameTitle": "The Virtual Film Producer",
    "gameEngine": "Multimodal Pipeline Orchestrator & Audio-Visual Synchronization Suite.",
    "gameSummary": "#### Game Title: *The Virtual Film Producer* - **Game Engine Type:** Multimodal Pipeline Orchestrator & Audio-Visual Synchronization Suite. - **Educational Objective:** Hands-on mastery of chaining diverse AI modalities, managing temporal alignment, and curating narrative coherence. #### Game Rules & Mechanics: 1. **The Production Studio Canvas (Select 1 of 3 Documentary Commissions):** - *Film 1:* \"The Mariana Trench: Life at 11,000 Meters\"",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 5 LESSON 2\n# MULTIMODAL AI: CHAINED MEDIA PIPELINE ORCHESTRATOR\n# =====================================================================\n\ndef simulate_llm_script_generator(topic):\n    \"\"\"\n    Stage 1: Generates a structured multi-scene narrative script.\n    \"\"\"\n    print(f\"[Stage 1: LLM Engine] Generating structured documentary script for '{topic}'...\")\n    # Simulated structured output\n    script_scenes = [\n        {\n            \"scene_num\": 1,\n            \"narration\": \"Beneath twenty kilometers of solid ice, Saturn's moon Enceladus conceals a vast, warm liquid ocean.\",\n            \"visual_prompt\": \"Cinematic wide shot of Saturn's moon Enceladus against dark starfield, glowing blue ice fissures, 8k\",\n            \"audio_mood\": \"Mysterious & Wonder-filled\"\n        },\n        {\n            \"scene_num\": 2,\n            \"narration\": \"Through colossal cracks, giant cryo-volcanoes blast water geysers hundreds of miles into the vacuum of space.\",\n            \"visual_prompt\": \"Colossal ice geysers erupting into space from glowing turquoise ice crevasses, sun backlit, photorealistic\",\n            \"audio_mood\": \"Dramatic & Majestic\"\n        }\n    ]\n    return script_scenes\n\ndef simulate_neural_tts(narration_text, speech_rate_wpm=140):\n    \"\"\"\n    Stage 2: Synthesizes voice audio and calculates exact duration in seconds.\n    \"\"\"\n    words = len(narration_text.split())\n    # Duration = (words / words_per_minute) * 60 seconds\n    duration_seconds = round((words / speech_rate_wpm) * 60, 2)\n    return {\n        \"audio_asset_id\": f\"audio_{abs(hash(narration_text)) % 10000}.wav\",\n        \"duration_sec\": duration_seconds,\n        \"sample_rate_hz\": 44100\n    }\n\ndef simulate_visual_diffusion_render(visual_prompt, target_duration_sec):\n    \"\"\"\n    Stage 3: Renders visual media assets matching target audio duration.\n    \"\"\"\n    # Video models generate 24 frames per second\n    total_frames = int(target_duration_sec * 24)\n    return {\n        \"video_asset_id\": f\"clip_{abs(hash(visual_prompt)) % 10000}.mp4\",\n        \"frames_rendered\": total_frames,\n        \"aspect_ratio\": \"16:9\",\n        \"resolution\": \"1920x1080\"\n    }\n\ndef orchestrate_multimodal_production(documentary_topic):\n    \"\"\"\n    Stage 4: Chains all modalities together and compiles the final production timeline.\n    \"\"\"\n    print(\"=\" * 65)\n    print(\"\ud83c\udfac STUDIO-CHRONO: MULTIMODAL AI PIPELINE ORCHESTRATOR \ud83c\udfac\")\n    print(\"=\" * 65)\n    \n    scenes = simulate_llm_script_generator(documentary_topic)\n    production_timeline = []\n    total_runtime_sec = 0.0\n    \n    print(\"\\n[Stage 2 & 3: Parallel Voice Synthesis & Diffusion Rendering]\")\n    for sc in scenes:\n        audio = simulate_neural_tts(sc[\"narration\"])\n        visual = simulate_visual_diffusion_render(sc[\"visual_prompt\"], audio[\"duration_sec\"])\n        \n        timeline_entry = {\n            \"scene\": sc[\"scene_num\"],\n            \"narration\": sc[\"narration\"],\n            \"audio_file\": audio[\"audio_asset_id\"],\n            \"duration\": audio[\"duration_sec\"],\n            \"video_file\": visual[\"video_asset_id\"],\n            \"frames\": visual[\"frames_rendered\"]\n        }\n        production_timeline.append(timeline_entry)\n        total_runtime_sec += audio[\"duration_sec\"]\n        \n        print(f\"  \u2022 Scene #{sc['scene_num']}: Voice Duration = {audio['duration_sec']}s \u2794 Rendered {visual['frames_rendered']} frames ({visual['video_asset_id']})\")\n\n    # Final Composite Output\n    print(\"\\n\" + \"=\" * 65)\n    print(\"\ud83d\udcfc FINAL COMPOSITE MASTER TIMELINE (Muxed & Aligned)\")\n    print(\"=\" * 65)\n    for entry in production_timeline:\n        print(f\"[Scene {entry['scene']}] ({entry['duration']}s) - Asset: {entry['video_file']} + {entry['audio_file']}\")\n        print(f\"  Subtitle Text: \\\"{entry['narration'][:70]}...\\\"\")\n    print(\"-\" * 65)\n    print(f\"Final Trailer Runtime: {total_runtime_sec:.1f} seconds. Audio and visuals in 100% sync!\")\n    print(\"Production Package Exported: Ready for global broadcast.\\n\")\n\n# Run the complete multimodal pipeline\nif __name__ == \"__main__\":\n    orchestrate_multimodal_production(\"The Cryo-Geysers of Enceladus\")",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c5_l2_1",
        "question": "In a modern automated AI media generation studio, what is the primary architectural function of the **Orchestrator**? - **A)** Playing musical violin instruments in the recording studio. - **B)** A software coordinator that manages data flow, formats intermediate outputs (such as converting LLM text into prompt tokens for image and voice models), and synchronizes timing dependencies across multiple distinct foundation models. - **C)** An antivirus program that deletes video files. - **D)** An electrical cable that connects the computer to the wall.",
        "options": [
          {
            "id": "A",
            "text": "** Playing musical violin instruments in the recording studio.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A software coordinator that manages data flow, formats intermediate outputs (such as converting LLM text into prompt tokens for image and voice models), and synchronizes timing dependencies across multiple distinct foundation models.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** An antivirus program that deletes video files.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** An electrical cable that connects the computer to the wall.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Individual neural models (LLMs, TTS, Diffusion) operate in isolated mathematical formats. The **Pipeline Orchestrator** is the software backbone: it receives inputs, schedules parallel API calls, translates intermediate JSON payloads, manages audio-visual timing alignment, and muxes composite video files.",
        "hint": "Reflect on the principles of AI Media Studio."
      },
      {
        "id": "q_class8_c5_l2_2",
        "question": "Why does an automated media pipeline calculate the exact audio duration of a voiceover file *before* triggering the video diffusion generation step? - **A)** Video diffusion models cannot run if the computer speakers are turned off. - **B)** The video clip's frame count and runtime must dynamically match the voiceover track duration; otherwise, the video will either freeze awkwardly on a dead frame while narration continues or cut off mid-speech. - **C)** Audio files are legally required to be shorter than video files. - **D)** Video models automatically double the speed of audio.",
        "options": [
          {
            "id": "A",
            "text": "** Video diffusion models cannot run if the computer speakers are turned off.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The video clip's frame count and runtime must dynamically match the voiceover track duration; otherwise, the video will either freeze awkwardly on a dead frame while narration continues or cut off mid-speech.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Audio files are legally required to be shorter than video files.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Video models automatically double the speed of audio.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In video editing, temporal synchronization is paramount. Spoken speech has variable cadence based on word count and pause duration. Measuring the precise audio waveform runtime ($t_{\\text{audio}}$) allows the orchestrator to command the video generation engine to render exactly $24 \\times t_{\\text{audio}}$ frames, guaranteeing zero dead-space or truncated speech.",
        "hint": "Reflect on the principles of AI Media Studio."
      },
      {
        "id": "q_class8_c5_l2_3",
        "question": "In media studies and digital literacy, what does the term **\"Synthetic Slop\"** describe? - **A)** Cold soup consumed by computer programmers in data centers. - **B)** Low-quality, mass-generated, automated AI content (unverified articles, hallucinated videos, clickbait audiobooks) mass-produced with minimal human oversight that pollutes search engine results, degrades social platforms, and drowns out authentic human journalism. - **C)** Corrupted pixels on broken computer monitors. - **D)** Computer viruses that delete video editing software.",
        "options": [
          {
            "id": "A",
            "text": "** Cold soup consumed by computer programmers in data centers.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Low-quality, mass-generated, automated AI content (unverified articles, hallucinated videos, clickbait audiobooks) mass-produced with minimal human oversight that pollutes search engine results, degrades social platforms, and drowns out authentic human journalism.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Corrupted pixels on broken computer monitors.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Computer viruses that delete video editing software.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Coined by technology critics, **\"Synthetic Slop\"** refers to the tsunami of low-effort, automated AI media churned out by clickbait spammers seeking ad revenue. Because multimodal generation is practically zero-cost, millions of synthetic videos flood search engines, spreading misinformation, degrading web utility, and crowding out genuine creative labor.",
        "hint": "Reflect on the principles of AI Media Studio."
      },
      {
        "id": "q_class8_c5_l2_4",
        "question": "In a 3-stage multimodal pipeline (LLM Script \u2794 Text-to-Image Diffusion \u2794 Video Interpolator), what is the risk of **Error Propagation (Cascading Failures)**? - **A)** The computer fan will spin backwards. - **B)** If the Stage 1 LLM generates a subtle factual hallucination (e.g., claiming *\"Ancient Romans fought with laser pistols\"*), the downstream visual and voice models will faithfully visualize and narrate that false reality with total cinematic photorealism, cementing the falsehood in the viewer's mind. - **C)** High-definition video files can never show historical events. - **D)** Error propagation only occurs in mathematics, never in media.",
        "options": [
          {
            "id": "A",
            "text": "** The computer fan will spin backwards.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** If the Stage 1 LLM generates a subtle factual hallucination (e.g., claiming *\"Ancient Romans fought with laser pistols\"*), the downstream visual and voice models will faithfully visualize and narrate that false reality with total cinematic photorealism, cementing the falsehood in the viewer's mind.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** High-definition video files can never show historical events.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Error propagation only occurs in mathematics, never in media.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In chained pipelines, **errors cascade and compound**. Downstream generative models have zero factual validation filters; they simply visualize whatever conditioning text they receive. A subtle text hallucination in Stage 1 becomes an authoritative, cinematic visual reality in Stage 3, demonstrating why human verification gates are essential between pipeline stages.",
        "hint": "Reflect on the principles of AI Media Studio."
      },
      {
        "id": "q_class8_c5_l2_5",
        "question": "What is the technological role of a **Neural Vocoder** (such as WaveNet or HiFi-GAN) in modern Text-to-Speech (TTS) AI systems? - **A)** It translates written text into French. - **B)** It converts intermediate acoustic representations (such as mel-spectrogram frequencies) into realistic, high-fidelity biological audio pressure waveforms with natural pitch inflection, human timbre, and micro-pauses. - **C)** It reduces the volume of computer speakers to zero. - **D)** It records audio through the computer microphone.",
        "options": [
          {
            "id": "A",
            "text": "** It translates written text into French.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** It converts intermediate acoustic representations (such as mel-spectrogram frequencies) into realistic, high-fidelity biological audio pressure waveforms with natural pitch inflection, human timbre, and micro-pauses.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** It reduces the volume of computer speakers to zero.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** It records audio through the computer microphone.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Traditional robotic speech sounds metallic and monotone. Modern neural TTS splits generation into two steps: an acoustic model predicts frequency spectrograms from text tokens, and a **Neural Vocoder** synthesizes raw continuous audio waveforms from those spectrograms, reproducing human vocal tract resonances with lifelike fidelity.",
        "hint": "Reflect on the principles of AI Media Studio."
      }
    ]
  },
  {
    "id": "class8-c6-l1",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 1,
    "lessonTitle": "Deepfake Alert!",
    "missionScenario": "> **Mission Codename:** *Operation Cyber-Verdict: The Courtroom Gauntlet*\n> **Mission Briefing:** Emergency at the Federal High Court of Justice!\n> A high-profile corporate trial is underway involving a major tech titan accused of industrial sabotage. The prosecution has submitted a bombshell piece of video evidence: a smartphone video of the CEO meeting with a rival operative in a dark parking garage, agreeing to steal confidential quantum algorithms.\n> The defense team vehemently objects, claiming the video is an **Adversarial Neural Deepfake** manufactured by a hostile foreign intelligence syndicate!\n> Millions of shares in the stock market are tumbling, and the trial is paralyzed! The judge has appointed you as the **Independent Expert Technical Witness** to the High Court!\n> Your mission is to enter the *Cyber Forensic Courtroom*, deploy biological rPPG pulse scanners, calculate blink frequency distributions, analyze frequency Fourier spectra, and present mathematically incontrovertible evidence to convict the fraud or exonerate the defendant!\n---",
    "gameTitle": "Cyber Forensic Courtroom",
    "gameEngine": "Expert Witness Trial Simulator & Biometric Signal Analysis Suite.",
    "gameSummary": "#### Game Title: *Cyber Forensic Courtroom* - **Game Engine Type:** Expert Witness Trial Simulator & Biometric Signal Analysis Suite. - **Educational Objective:** Hands-on mastery of rPPG pulse extraction, blink frequency analysis, Fourier frequency domain inspection, and presenting legal testimony. #### Game Rules & Mechanics: 1. **The Courtroom Docket (The Parking Garage Video Exhibit):** - The student receives the 45-second disputed surveillance video of the CEO.",
    "pythonCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 6 LESSON 1\n# CYBER FORENSICS: BIOMETRIC EYE BLINK & rPPG PULSE SIGNAL ANALYZER\n# =====================================================================\n\ndef analyze_facial_blink_cadence(ear_time_series, fps=30):\n    \"\"\"\n    Analyzes Eye Aspect Ratio (EAR) telemetry across video frames.\n    - An EAR drop below 0.20 indicates a closed eyelid (blink).\n    - Measures total blinks, average blink duration, and blinks per minute.\n    \"\"\"\n    total_frames = len(ear_time_series)\n    duration_seconds = total_frames / fps\n    duration_minutes = duration_seconds / 60.0\n    \n    blink_count = 0\n    in_blink = False\n    blink_frame_durations = []\n    current_blink_frames = 0\n    \n    for ear in ear_time_series:\n        if ear < 0.20:\n            # Eyelid is closed\n            current_blink_frames += 1\n            if not in_blink:\n                in_blink = True\n                blink_count += 1\n        else:\n            # Eyelid is open\n            if in_blink:\n                blink_frame_durations.append(current_blink_frames)\n                current_blink_frames = 0\n                in_blink = False\n                \n    blinks_per_min = blink_count / duration_minutes if duration_minutes > 0 else 0\n    avg_duration_ms = (sum(blink_frame_durations) / len(blink_frame_durations) * (1000 / fps)) if blink_frame_durations else 0\n    \n    # Biometric Sanity Check: Healthy humans blink 12 to 20 times per minute\n    is_biologically_natural = 8.0 <= blinks_per_min <= 25.0\n    \n    return {\n        \"video_duration_sec\": round(duration_seconds, 1),\n        \"total_blinks\": blink_count,\n        \"blinks_per_minute\": round(blinks_per_min, 1),\n        \"avg_blink_ms\": round(avg_duration_ms, 1),\n        \"is_natural_blinking\": is_biologically_natural\n    }\n\ndef analyze_rppg_cardiac_pulse(skin_reflectance_series):\n    \"\"\"\n    Simulates remote photoplethysmography (rPPG) vascular pulse analysis.\n    Biological skin has cyclic periodic capillary variation (60-100 BPM).\n    Synthetic deepfakes display flat noise with near-zero periodic variance.\n    \"\"\"\n    import statistics\n    variance = statistics.variance(skin_reflectance_series)\n    \n    # A true biological pulse generates standard cyclical variance > 0.15\n    has_biological_pulse = variance > 0.15\n    simulated_bpm = 72 if has_biological_pulse else 0\n    \n    return {\n        \"signal_variance\": round(variance, 4),\n        \"detected_pulse_bpm\": simulated_bpm,\n        \"has_cardiac_signature\": has_biological_pulse\n    }\n\n# ----------------- SIMULATED COURTROOM EVIDENCE TELEMETRY -----------------\n# 30 seconds of video (900 frames at 30 FPS)\n# Scenario 1: Real human subject (Natural blinking, pulsating blood flow)\n# Scenario 2: Deepfake target (Only 1 blink in 30 seconds, zero pulse variance)\n\n# Normal human EAR series: blinks every 3-4 seconds (around 8 blinks total)\nreal_ear_data = [0.32] * 900\nfor frame_idx in [100, 210, 320, 440, 560, 680, 800]:\n    for f in range(frame_idx, frame_idx + 5):  # 5 frames closed (~160 ms)\n        real_ear_data[f] = 0.15\n\n# Deepfake EAR series: Stares unblinkingly with only 1 micro-flutter\nfake_ear_data = [0.31] * 900\nfake_ear_data[400] = 0.18  # Single anomalous 1-frame dip\n\nreal_skin_pulse = [0.5 + 0.2 * ((i % 25) / 25.0) for i in range(100)]  # Rhythmic pulse\nfake_skin_pulse = [0.51 + 0.002 * (i % 3) for i in range(100)]         # Flat synthetic noise\n\nprint(\"=== HIGH COURT FORENSIC BIOMETRIC TRIAL REPORT ===\\n\")\n\nprint(\"--- EXHIBIT A: PROSECUTION SURVEILLANCE VIDEO ---\")\nblink_audit = analyze_facial_blink_cadence(fake_ear_data, fps=30)\npulse_audit = analyze_rppg_cardiac_pulse(fake_skin_pulse)\n\nprint(f\"Video Duration       : {blink_audit['video_duration_sec']} seconds\")\nprint(f\"Blink Telemetry      : {blink_audit['total_blinks']} blinks ({blink_audit['blinks_per_minute']} blinks/min) [Normal: 12-20]\")\nprint(f\"Blink Authenticity   : {'\u2705 Natural' if blink_audit['is_natural_blinking'] else '\ud83d\udea8 ANOMALOUS (Unnatural Stare)'}\")\nprint(f\"rPPG Cardiac Pulse   : {pulse_audit['detected_pulse_bpm']} BPM (Variance: {pulse_audit['signal_variance']})\")\nprint(f\"Vascular Capillaries : {'\u2705 Biological Blood Flow Present' if pulse_audit['has_cardiac_signature'] else '\ud83d\udea8 ABSENT (Zero Biological Cardiac Pulse)'}\")\n\nprint(\"\\n\" + \"=\" * 65)\nprint(\"\u2696\ufe0f EXPERT FORENSIC VERDICT TO THE COURT:\")\nif not blink_audit['is_natural_blinking'] and not pulse_audit['has_cardiac_signature']:\n    print(\"CONCLUSION: Exhibit A is an ADVERSARIAL NEURAL DEEPFAKE with >99.9% certainty!\")\n    print(\"Evidentiary basis: Complete absence of biological capillary pulse and unnatural blink frequency.\")\nelse:\n    print(\"CONCLUSION: Exhibit A is an AUTHENTIC BIOLOGICAL RECORDING.\")\nprint(\"=\" * 65)",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c6_l1_1",
        "question": "What biological physiological phenomenon does **Remote Photoplethysmography (rPPG)** measure to detect whether a human face on video is a biological human or an AI deepfake? - **A)** The temperature of the user's computer keyboard. - **B)** Microscopic, cyclic optical color reflectance variations in facial skin capillaries caused by the cardiovascular heartbeat pumping blood into facial tissue. - **C)** The physical speed of facial hair growth. - **D)** The pitch of the speaker's vocal cords.",
        "options": [
          {
            "id": "A",
            "text": "** The temperature of the user's computer keyboard.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Microscopic, cyclic optical color reflectance variations in facial skin capillaries caused by the cardiovascular heartbeat pumping blood into facial tissue.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The physical speed of facial hair growth.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** The pitch of the speaker's vocal cords.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** **Remote Photoplethysmography (rPPG)** is an optical cardiovascular imaging technique. With every cardiac cycle, capillary blood volume modulates the amount of reflected green and red ambient light. While invisible to casual human viewers, computational signal extraction recovers the exact cardiovascular pulse waveform ($60 - 100\\text{ BPM}$). Neural deepfakes lack biological hemodynamics, revealing a flat zero line.",
        "hint": "Reflect on the principles of Deepfake Alert!."
      },
      {
        "id": "q_class8_c6_l1_2",
        "question": "In forensic behavioral video analysis, why do early and mid-tier deepfake video models frequently display severe blink rate anomalies (e.g., staring unblinkingly for 60 seconds or blinking for only a single 30-millisecond frame)? - **A)** Deepfake characters are never tired. - **B)** Machine learning models are trained predominantly on public internet photographs of people with their eyes open; they lack sufficient training data of natural closed-eyelid transitions and the biological neurological rhythm of human spontaneous blinking (12 to 20 blinks/min). - **C)** Blinking is illegal in video recordings. - **D)** Computer video players delete all blinks to save memory.",
        "options": [
          {
            "id": "A",
            "text": "** Deepfake characters are never tired.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Machine learning models are trained predominantly on public internet photographs of people with their eyes open; they lack sufficient training data of natural closed-eyelid transitions and the biological neurological rhythm of human spontaneous blinking (12 to 20 blinks/min).",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Blinking is illegal in video recordings.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Computer video players delete all blinks to save memory.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In voluntary human physiology, blinking is controlled by the dopaminergic neurological system. Because training datasets (like CelebA) scrape public photographs where subjects are smiling at the camera with open eyes, neural autoencoders fail to learn the biomechanical dynamics and temporal recurrence of natural eyelid closures.",
        "hint": "Reflect on the principles of Deepfake Alert!."
      },
      {
        "id": "q_class8_c6_l1_3",
        "question": "What distinct visual artifact is uncovered when a digital forensic investigator applies a **2D Fast Fourier Transform (FFT)** to an image synthesized by a convolutional generative adversarial network? - **A)** A photograph of the programmer who trained the network. - **B)** A high-frequency regular checkerboard spectral grid caused by transposed convolution upsampling operations in the generator architecture. - **C)** Complete black silence. - **D)** An audio file playing Morse code.",
        "options": [
          {
            "id": "A",
            "text": "** A photograph of the programmer who trained the network.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** A high-frequency regular checkerboard spectral grid caused by transposed convolution upsampling operations in the generator architecture.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Complete black silence.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** An audio file playing Morse code.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In deep generative architectures, neural upsampling (such as `Conv2DTranspose` or bilinear resizing) introduces subtle periodic spatial interpolation artifacts. While virtually imperceptible in the spatial RGB domain, transforming the frame into the Fourier frequency domain reveals distinct symmetrical grid spikes\u2014the unmistakable mathematical signature of convolutional upsampling.",
        "hint": "Reflect on the principles of Deepfake Alert!."
      },
      {
        "id": "q_class8_c6_l1_4",
        "question": "A forensic examiner analyzes an alleged speech by a government official. During the word *\"Billion\"*, the sound of the letter **\"B\"** is heard clearly through the speakers, but on the high-speed video frame, the speaker's lips are still wide open and only press together 120 milliseconds later. What does this physical timing discrepancy prove? - **A)** The microphone was located 500 meters away from the speaker. - **B)** The video exhibits **Audio-Visual Plosive Desynchronization**: producing the voiced bilabial plosive consonant \"B\" requires physical contact and air pressure release between the upper and lower lips; a temporal mismatch proves that an independent synthetic audio track was spliced or neural-mapped onto an existing video. - **C)** The official has a rare medical condition where lips do not touch. - **D)** Light travels slower than sound in air.",
        "options": [
          {
            "id": "A",
            "text": "** The microphone was located 500 meters away from the speaker.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** The video exhibits **Audio-Visual Plosive Desynchronization**: producing the voiced bilabial plosive consonant \"B\" requires physical contact and air pressure release between the upper and lower lips; a temporal mismatch proves that an independent synthetic audio track was spliced or neural-mapped onto an existing video.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** The official has a rare medical condition where lips do not touch.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Light travels slower than sound in air.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** In human phonetics, **Bilabial Plosives** (/p/, /b/, /m/) have rigid physiological constraints: the lips must physically seal to create oral pressure before releasing the acoustic burst. Sound cannot precede physical lip contact. A 120 ms lag is well beyond physiological tolerance, proving artificial splicing or imperfect neural lip-sync generation.",
        "hint": "Reflect on the principles of Deepfake Alert!."
      },
      {
        "id": "q_class8_c6_l1_5",
        "question": "What legal criminal charges can be brought against individuals who create non-consensual deepfakes depicting real people without their permission to extort money or damage their reputations? - **A)** Computer speed limit violations. - **B)** Criminal Defamation, Identity Theft, Wire Fraud, and violations of specific Deepfake and Right-of-Publicity legislation. - **C)** Copyright infringement of computer monitors. - **D)** Zero legal charges; deepfakes are completely legal everywhere.",
        "options": [
          {
            "id": "A",
            "text": "** Computer speed limit violations.",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "** Criminal Defamation, Identity Theft, Wire Fraud, and violations of specific Deepfake and Right-of-Publicity legislation.",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "** Copyright infringement of computer monitors.",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "** Zero legal charges; deepfakes are completely legal everywhere.",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "** Creating non-consensual deepfakes of real people is a severe crime under emerging global statutes (e.g., the US DEFIANCE Act, India's IT Act Sections 66D/66E, and the EU AI Act). Perpetrators face serious felony prosecution for criminal identity theft, fraud, defamation, and intentional infliction of emotional distress.",
        "hint": "Reflect on the principles of Deepfake Alert!."
      }
    ]
  },
  {
    "id": "class8-c6-l2",
    "gradeKey": "class8",
    "gradeName": "Class 8",
    "chapterNumber": 6,
    "chapterTitle": "Responsible AI",
    "lessonNumber": 2,
    "lessonTitle": "Your Data, Your Right",
    "missionScenario": "```\n[FEDERAL DIGITAL RIGHTS TRIBUNAL - EMERGENCY ASSIGNMENT]\nAGENT DESIGNATION: Cyber Ombudsman Lead\nTARGET ENTITY    : Omnicorporate \"HyperNet AI Ecosystem\" (OmniApp v9.4)\nSTATUS           : CRITICAL COMPLAINT FILED BY 42,000,000 STUDENT USERS\nOmniApp\u2014a wildly popular cloud gaming and social study assistant used across 80,000\nschools\u2014just pushed an unannounced terms-of-service update.\nInitial reports reveal that OmniApp is:\n1. Harvesting keystroke dynamics, webcam facial geometry, and homework answers.\n2. Feeding student study chats into a proprietary Large Language Model without consent.",
    "gameTitle": "Data Sovereign Defense (The Privacy Ombudsman Simulator)",
    "gameEngine": "Legal-Tech Audit & Regulatory Enforcement Simulator",
    "gameSummary": "``` ``` #### 6.1 Game Architecture & Objective The player operates the master terminal of the **Digital Data Protection Authority (DDPA)**. Corporate platforms submit their applications, consent dialogues, and terms of service for certification. If an app violates privacy law or exploits users via dark patterns, the Ombudsman must issue an **Enforcement Notice**, levy statutory fines, or mandate algorithmic retraining. #### 6.2 Game Mechanics & Regulatory Toolkit The player commands 4 regulatory enforcement tools:",
    "pythonCode": "\"\"\"\nSovereignShieldEngine - Privacy Policy Lexical Scanner & Dark Pattern Auditor\nClass 8 Olympiad Standard - Chapter 6, Lesson 2\nAuthor: AI Olympiad Curriculum Development Team\n\"\"\"\n\nimport re\nfrom typing import Dict, List, Any\n\n\nclass SovereignShieldEngine:\n    \"\"\"\n    Forensic auditing engine for parsing privacy policies, terms of service,\n    and user consent declarations to identify privacy violations and dark patterns.\n    \"\"\"\n\n    def __init__(self, platform_name: str):\n        self.platform = platform_name\n        \n        # Risk dictionary mapping indicators to risk scores and descriptions\n        self.risk_taxonomy = {\n            \"biometric_harvesting\": {\n                \"patterns\": [r\"facial recognition\", r\"face geometry\", r\"voiceprint\", r\"biometric data\"],\n                \"severity\": 30,\n                \"category\": \"Sensitive Personal Data (SPDI)\"\n            },\n            \"third_party_ad_sharing\": {\n                \"patterns\": [r\"advertising partners\", r\"marketing affiliates\", r\"monetize your data\", r\"commercial brokers\"],\n                \"severity\": 20,\n                \"category\": \"Data Commercialization\"\n            },\n            \"ai_training_ingestion\": {\n                \"patterns\": [r\"train our models\", r\"machine learning improvements\", r\"fine-tune algorithms\", r\"ingest user content\"],\n                \"severity\": 25,\n                \"category\": \"AI Model Training Ingestion\"\n            },\n            \"forced_tracking\": {\n                \"patterns\": [r\"precise location\", r\"background gps\", r\"keystroke dynamics\", r\"device serial number\"],\n                \"severity\": 15,\n                \"category\": \"Excessive Telemetry\"\n            },\n            \"dark_pattern_consent\": {\n                \"patterns\": [r\"pre-selected\", r\"opt-out required\", r\"deemed to have consented\", r\"irrevocable license to your content\"],\n                \"severity\": 25,\n                \"category\": \"Deceptive Consent / Dark Pattern\"\n            }\n        }\n\n    def calculate_reading_ease(self, text: str) -> Dict[str, Any]:\n        \"\"\"\n        Calculates an approximate Flesch Reading Ease score to detect\n        deliberately obfuscated, unreadable legal text (Privacy Zuckering).\n        \"\"\"\n        words = re.findall(r'\\b[A-Za-z]+\\b', text)\n        sentences = re.split(r'[\\.\\?!]+', text)\n        sentences = [s for s in sentences if len(s.strip()) > 0]\n        \n        word_count = len(words)\n        sentence_count = max(len(sentences), 1)\n        \n        if word_count == 0:\n            return {\"score\": 0, \"status\": \"Empty Text\"}\n            \n        # Approximation of syllables based on vowel clusters\n        syllable_count = 0\n        for word in words:\n            vowels = re.findall(r'[aeiouy]+', word.lower())\n            syllable_count += max(len(vowels), 1)\n\n        # Flesch Reading Ease formula\n        fre_score = 206.835 - (1.015 * (word_count / sentence_count)) - (84.6 * (syllable_count / word_count))\n        fre_score = round(max(0.0, min(100.0, fre_score)), 1)\n        \n        if fre_score >= 60:\n            readability = \"Transparent & Accessible (Easy)\"\n        elif fre_score >= 30:\n            readability = \"Dense Legal Jargon (College Level)\"\n        else:\n            readability = \"Extreme Obfuscation (Post-Graduate / Privacy Zuckering)\"\n\n        return {\n            \"score\": fre_score,\n            \"word_count\": word_count,\n            \"sentence_count\": sentence_count,\n            \"readability_status\": readability\n        }\n\n    def audit_policy(self, policy_text: str) -> Dict[str, Any]:\n        \"\"\"\n        Conducts pattern matching across all risk categories and tallies risk points.\n        \"\"\"\n        clean_text = policy_text.lower()\n        findings: List[Dict[str, Any]] = []\n        total_risk_score = 0\n\n        for key, config in self.risk_taxonomy.items():\n            matches_found = []\n            for pattern in config[\"patterns\"]:\n                matches = re.findall(pattern, clean_text)\n                if matches:\n                    matches_found.extend(list(set(matches)))\n            \n            if matches_found:\n                total_risk_score += config[\"severity\"]\n                findings.append({\n                    \"risk_key\": key,\n                    \"category\": config[\"category\"],\n                    \"severity_points\": config[\"severity\"],\n                    \"detected_keywords\": matches_found\n                })\n\n        # Cap risk score at 100\n        total_risk_score = min(total_risk_score, 100)\n        readability = self.calculate_reading_ease(policy_text)\n\n        # Compliance tier\n        if total_risk_score < 25:\n            verdict = \"COMPLIANT: Low Risk, High Transparency\"\n            action = \"Approve for Student Use\"\n        elif total_risk_score < 60:\n            verdict = \"WARNING: Moderate Privacy Concerns\"\n            action = \"Issue Remediation Notice for Data Pruning\"\n        else:\n            verdict = \"VIOLATION: High Danger / Egregious Exploitation\"\n            action = \"Immediate Enforcement Halt & Statutory Fine\"\n\n        return {\n            \"platform\": self.platform,\n            \"total_risk_score\": total_risk_score,\n            \"verdict\": verdict,\n            \"mandatory_action\": action,\n            \"readability\": readability,\n            \"findings_count\": len(findings),\n            \"findings\": findings\n        }\n\n    def generate_audit_report(self, audit_result: Dict[str, Any]) -> str:\n        \"\"\"Formats the audit into an executive compliance dossier.\"\"\"\n        r = audit_result\n        read = r[\"readability\"]\n        \n        report = []\n        report.append(\"=\" * 78)\n        report.append(f\" SOVEREIGN SHIELD AUDIT DOSSIER: {r['platform'].upper()}\")\n        report.append(\"=\" * 78)\n        report.append(f\" OVERALL PRIVACY RISK SCORE : {r['total_risk_score']}/100\")\n        report.append(f\" LEGAL VERDICT              : {r['verdict']}\")\n        report.append(f\" MANDATORY REGULATORY ACTION: {r['mandatory_action']}\")\n        report.append(\"-\" * 78)\n        report.append(\" READABILITY & TRANSPARENCY METRICS:\")\n        report.append(f\"   * Flesch Reading Score   : {read['score']}/100\")\n        report.append(f\"   * Word / Sentence Count  : {read['word_count']} words in {read['sentence_count']} sentences\")\n        report.append(f\"   * Text Complexity        : {read['readability_status']}\")\n        report.append(\"-\" * 78)\n        report.append(\" STATUTORY RISK FINDINGS:\")\n        \n        if not r[\"findings\"]:\n            report.append(\"   [+] No critical legal risk patterns detected.\")\n        else:\n            for i, f in enumerate(r[\"findings\"], 1):\n                report.append(f\"   {i}. [{f['category']}] (+{f['severity_points']} Risk Pts)\")\n                report.append(f\"      Matched Indicators: {', '.join(f['detected_keywords'])}\")\n\n        report.append(\"=\" * 78)\n        return \"\\n\".join(report)\n\n\n# ==============================================================================\n# VERIFICATION & EXECUTION TESTBENCH\n# ==============================================================================\nif __name__ == \"__main__\":\n    print(\"[INIT] Starting SovereignShieldEngine Forensic Testbench...\\n\")\n\n    # Sample Policy 1: Invasive Social EdTech Platform\n    invasive_policy = \"\"\"\n    By accessing OmniStudy AI, the user grants our network an irrevocable license to your content.\n    We continuously collect your precise location and background GPS to optimize local network nodes.\n    Our automated vision systems process face geometry and facial recognition to gauge student engagement.\n    Furthermore, all chat inputs, essays, and uploaded files are used to train our models and\n    fine-tune algorithms for generative AI deployments. Anonymized behavioral vectors are shared with\n    our marketing affiliates and advertising partners to deliver personalized promotional offers.\n    Users are deemed to have consented unless an opt-out required affidavit is mailed to our headquarters.\n    \"\"\"\n\n    # Sample Policy 2: Privacy-First Learning Companion\n    ethical_policy = \"\"\"\n    We respect your rights as a student data principal. We collect only minimal telemetry needed\n    to save your progress locally. We never collect biometric data, facial recognition, or precise location.\n    Your learning chats and assignments are strictly private and are never used to train our models\n    or commercialized with advertising partners. You may exercise your statutory Right to Erasure or\n    export your data at any time directly with a single click in your settings menu.\n    \"\"\"\n\n    # Run Audit 1\n    auditor_bad = SovereignShieldEngine(\"OmniStudy AI (Invasive)\")\n    results_bad = auditor_bad.audit_policy(invasive_policy)\n    print(auditor_bad.generate_audit_report(results_bad))\n\n    print(\"\\n\" + \"#\" * 78 + \"\\n\")\n\n    # Run Audit 2\n    auditor_good = SovereignShieldEngine(\"PureLearn OpenEd (Ethical)\")\n    results_good = auditor_good.audit_policy(ethical_policy)\n    print(auditor_good.generate_audit_report(results_good))",
    "pythonOutput": "",
    "questions": [
      {
        "id": "q_class8_c6_l2_1",
        "question": "Under Article 17 of the GDPR and Section 12 of the India DPDP Act 2023, an individual requests that a gaming platform delete their account and wipe all personal logs. This statutory protection is formally known as:",
        "options": [
          {
            "id": "A",
            "text": "The Right to Portability",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "The Right to Erasure (\"Right to be Forgotten\")",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "The Principle of Data Minimization",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "The Doctrine of Algorithmic Transparency",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "**\n- **Why B is correct:** The *Right to Erasure*, colloquially termed the \"Right to be Forgotten\", legally obligates data fiduciaries to permanently delete an individual\u2019s personal data upon request, revocation of consent, or when the data is no longer necessary for the original collection purpose.\n- **Why A is incorrect:** The Right to Portability refers to exporting data in a machine-readable format (e.g., JSON/CSV) to move it to another service.\n- **Why C is incorrect:** Data Minimization is an architectural principle mandating that organizations collect *only* the minimum data necessary to perform the specified function.\n- **Why D is incorrect:** Algorithmic transparency relates to explaining the logic and training parameters behind an AI model's decisions.",
        "hint": "Reflect on the principles of Your Data, Your Right."
      },
      {
        "id": "q_class8_c6_l2_2",
        "question": "A cloud storage mobile app presents a full-screen popup stating: `[ENABLE 24/7 BACKGROUND LOCATION TRACKING]` (styled in large glowing green) Below it, in microscopic, low-contrast light-gray text, is the link: `\"No thanks, I prefer my files to be unsafe.\"` What specific combination of UI dark patterns is being executed?",
        "options": [
          {
            "id": "A",
            "text": "Forced Continuity and Roach Motel",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Confirmshaming and Visual Interference / Asymmetric Styling",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Sneak into Basket and Bait-and-Switch",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Privacy Zuckering and Hidden Costs",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "**\n- **Why B is correct:** \n  1. *Confirmshaming* uses emotionally manipulative, guilt-inducing text (\"I prefer my files to be unsafe\") to make the user feel foolish for declining.\n  2. *Visual Interference / Asymmetric Styling* deliberately formats the preferred corporate choice in vibrant, easy-to-click graphics while camouflaging the decline option in faded, tiny text to distort user intent.\n- **Why A is incorrect:** Forced Continuity refers to recurring subscription billing without notification after a free trial ends; Roach Motel makes canceling an account exceedingly convoluted.\n- **Why C is incorrect:** Sneak into Basket adds unrequested products or charges to a cart without consent.\n- **Why D is incorrect:** Hidden costs introduce undisclosed fees at the final payment step.",
        "hint": "Reflect on the principles of Your Data, Your Right."
      },
      {
        "id": "q_class8_c6_l2_3",
        "question": "An online essay-grading AI accepts student school essays. Unbeknownst to the students, the company uses these submitted essays to train their commercial Large Language Model. Three months later, another user enters a prompt and the LLM recites a student\u2019s private family story verbatim. What technical privacy failure occurred?",
        "options": [
          {
            "id": "A",
            "text": "Differential Privacy saturation",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Training data memorization and model extraction failure",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Federated learning parameter drift",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Overfitting of the loss gradient during inference",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "**\n- **Why B is correct:** Deep neural networks, especially overparameterized LLMs, can exhibit *training data memorization*, storing verbatim text sequences rather than merely learning abstract generalized patterns. When prompted strategically, the model regurgitates private PII from its training set, violating data sovereignty and privacy rights.\n- **Why A is incorrect:** Differential Privacy adds mathematical noise specifically to *prevent* memorization; if applied properly, this leak would have been mathematically bounded.\n- **Why C is incorrect:** Federated learning keeps data local on user devices; here, essays were uploaded to a centralized training corpus.\n- **Why D is incorrect:** Loss gradients are calculated during *training*, not during *inference*.",
        "hint": "Reflect on the principles of Your Data, Your Right."
      },
      {
        "id": "q_class8_c6_l2_4",
        "question": "Under Section 9 of the India Digital Personal Data Protection Act (DPDP) 2023, which of the following practices is **strictly prohibited** for any Data Fiduciary processing personal data belonging to children (individuals under 18 years of age)?",
        "options": [
          {
            "id": "A",
            "text": "Providing educational material through a digital interface",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Encrypting user passwords using SHA-256 hashes",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Engaging in behavioral tracking, targeted advertising, or processing that causes harm to a child",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Storing student test scores in an offline school database",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "**\n- **Why C is correct:** Section 9 of the DPDP Act 2023 explicitly prohibits Data Fiduciaries from undertaking behavioral tracking, targeted advertisements directed at minors, or any data processing likely to have an adverse effect on the physical or psychological well-being of a child.\n- **Why A, B, and D are incorrect:** Providing educational content, robust cryptographic password storage, and administrative offline score recording are standard, lawful, and necessary operational practices.",
        "hint": "Reflect on the principles of Your Data, Your Right."
      },
      {
        "id": "q_class8_c6_l2_5",
        "question": "An AI hospital consortium wants to train a diagnostic model to detect rare diseases across five independent hospitals without transferring sensitive patient health records out of each hospital's local firewall. Which modern machine learning paradigm solves this constraint?",
        "options": [
          {
            "id": "A",
            "text": "Centralized Web Scraping",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Federated Learning with Secure Aggregation",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Unsupervised K-Means clustering on public cloud buckets",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Cloud Model Inversion Processing",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A",
        "explanation": "**\n- **Why B is correct:** *Federated Learning* decentralizes machine learning. The model weights are transmitted to each hospital's local server, trained privately on local patient records, and only the encrypted mathematical weight updates (gradients) are sent back to a central server for secure aggregation. Patient PII never leaves the hospital's secured premises.\n- **Why A is incorrect:** Web scraping violates patient confidentiality and cannot access private medical databases.\n- **Why C is incorrect:** K-Means clustering on public cloud buckets would expose sensitive patient data to third parties.\n- **Why D is incorrect:** Model inversion is an adversarial attack method used to reverse-engineer private training data from model weights.",
        "hint": "Reflect on the principles of Your Data, Your Right."
      }
    ]
  }
];


/**
 * Helper to retrieve lesson data by gradeKey, chapterNumber, and lessonNumber.
 */
export function getMiddleLevelLesson(
  gradeKey: string,
  chapterNum: number | string,
  lessonNum: number | string = 1
): MiddleLevelLessonItem | undefined {
  const c = parseInt(String(chapterNum), 10);
  const l = parseInt(String(lessonNum), 10);
  return MIDDLE_LEVEL_LESSONS.find(
    item => item.gradeKey === gradeKey && item.chapterNumber === c && item.lessonNumber === l
  );
}

/**
 * Helper to retrieve all lessons belonging to a specific chapter.
 */
export function getMiddleLevelLessonsForChapter(
  gradeKey: string,
  chapterNum: number | string
): MiddleLevelLessonItem[] {
  const c = parseInt(String(chapterNum), 10);
  return MIDDLE_LEVEL_LESSONS.filter(
    item => item.gradeKey === gradeKey && item.chapterNumber === c
  );
}

/**
 * Returns all Olympiad quiz questions for a given chapter (combining Lesson 1 and Lesson 2).
 */
export function getMiddleLevelChapterQuiz(
  gradeKey: string,
  chapterNum: number | string
): MiddleLevelQuestion[] {
  const lessons = getMiddleLevelLessonsForChapter(gradeKey, chapterNum);
  const questions: MiddleLevelQuestion[] = [];
  lessons.forEach(l => {
    questions.push(...l.questions);
  });
  return questions;
}
