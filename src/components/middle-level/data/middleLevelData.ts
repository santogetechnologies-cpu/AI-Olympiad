// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL AI OLYMPIAD (CLASSES 6–8) — MASTER CURRICULUM DATA
// Fully Aligned with Official Master Syllabus & 36 Detailed Lesson Specifications
// ─────────────────────────────────────────────────────────────────────────────

import type { MiddleClassCurriculum, MiddleLessonData } from '../types'

export const MIDDLE_LEVEL_CURRICULUM: MiddleClassCurriculum[] = [
  {
    "classKey": "class6",
    "className": "Class 6",
    "ageGroup": "Grade 6 \u2022 Ages 11\u201312",
    "subtitle": "Foundational Reasoning, Guided Python & Cyber Safety",
    "accentColor": "#38bdf8",
    "chapters": [
      {
        "id": "class6-ch1",
        "chapterNumber": 1,
        "title": "AI Basics",
        "description": "How Machines Get Smart & Learning from Examples",
        "icon": "BrainCircuit",
        "lessons": [
          {
            "id": "class6-ch1-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 1,
            "lessonTitle": "How Machines Get Smart",
            "syllabusReference": "GAIO-CLASS6-CH01-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "How Machines Get Smart Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Robo-Sprout* > **Mission Briefing:** You have just been appointed Chief Systems Architect at the Neo-Green Automated Botanical Greenhouse on Mars Colony Alpha! > The greenhouse contains thousands of rare alien seedlings. A mechanical water sprinkler was previously installed with a simple rule: *\"Spray water every day at 08:00 AM for 10 minutes.\"* > Disaster struck! On rainy and humid days, the seedlings drowned. On scorching windy days, they withered and died! > Your mission is to transform this rigid, traditional machine into an **Intelligent Adaptive Agent**. You must teach the rover-sprinkler how to perceive soil humidity, temperature, and leaf color, and make real-time intelligent decisions instead of blindly following rigid rules. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of How Machines Get Smart.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "How Machines Get Smart",
              "overview": "Key theoretical principles and architecture defining How Machines Get Smart.",
              "blocks": [
                {
                  "title": "What Makes a Machine \"Smart\"?",
                  "summary": "Traditional computers are powerful, but they are fundamentally obedient calculators. They only do exactly what human programmers explicitly instruct them to do via rigid code.",
                  "keyPoints": [
                    "Core principle behind What Makes a Machine \"Smart\"?",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Comparison Matrix: Traditional Programs vs AI Systems",
                  "summary": "| Feature | Traditional Computer Program | Artificial Intelligence (AI) System |\n| :--- | :--- | :--- |\n| How It Operates | Follows hard-coded, rigid IF-THEN rules written line-by-line by humans. | Discovers statistical patterns from past data and adjusts its ",
                  "keyPoints": [
                    "Core principle behind Comparison Matrix: Traditional Programs vs AI Systems",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Sensory Loop of AI",
                  "summary": "How does an AI interact with the real world? It mirrors biological perception through three connected stages:\n1. Sensing (Input): Sensors collect raw physical data (cameras capture photons, microphones capture sound pressure, thermistors measure temperature).\n",
                  "keyPoints": [
                    "**Sensing (Input):** Sensors collect raw physical data (cameras capture photons, microphones capture sound pressure, the",
                    "**Reasoning (Processing):** Algorithms convert raw sensor signals into numbers, compare them against learned patterns, a",
                    "**Acting (Output):** Actuators or digital interfaces execute a decision (triggering motors, sending alerts, or rendering",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "How Machines Get Smart Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for How Machines Get Smart.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Rule Master vs Pattern Bot",
              "engineType": " Comparative Decision Simulation & Edge-Case Gauntlet.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Rule Master vs Pattern Bot.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "How Machines Get Smart Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 1 LESSON 1\n# SIMULATION: RULE-BASED VS ADAPTIVE SMART AGENT\n# =====================================================================\n\ndef rule_based_sprinkler(clock_time, soil_moisture):\n    \"\"\"\n    Rigid system: Only cares about the clock, ignores the real world!\n    \"\"\"\n    if clock_time == \"08:00 AM\":\n        return \"WATER ON (Rigid Clock Rule)\"\n    return \"WATER OFF\"\n\ndef smart_adaptive_sprinkler(soil_moisture, ambient_temp, rain_forecast):\n    \"\"\"\n    Smart agent: Considers multiple environmental sensory variables.\n    Thresholds:\n    - If it is already raining or soil is saturated (>70%), do not water.\n    - If soil is parched (<35%) or high heat (>32C), trigger emergency soak.\n    - Otherwise, maintain balanced moisture.\n    \"\"\"\n    if rain_forecast:\n        return \"WATER OFF (Conserving water; rain predicted)\"\n    \n    if soil_moisture > 70:\n        return \"WATER OFF (Soil adequately saturated)\"\n    elif soil_moisture < 35 or ambient_temp > 32:\n        return \"WATER ON - HIGH FLOW (Drought/Heatwave mitigation)\"\n    else:\n        return \"WATER ON - ECO PULSE (Optimal maintenance)\"\n\n# ----------------- TEST SCENARIOS -----------------\ntest_scenarios = [\n    {\"desc\": \"Scenario 1: 08:00 AM during a torrential thunderstorm\", \n     \"time\": \"08:00 AM\", \"moisture\": 85, \"temp\": 20, \"rain\": True},\n    {\"desc\": \"Scenario 2: 02:00 PM during a scorching heatwave\", \n     \"time\": \"02:00 PM\", \"moisture\": 25, \"temp\": 36, \"rain\": False},\n    {\"desc\": \"Scenario 3: 08:00 AM normal pleasant morning\", \n     \"time\": \"08:00 AM\", \"moisture\": 50, \"temp\": 24, \"rain\": False}\n]\n\nprint(\"=== MARS GREENHOUSE AUTOMATION COMPARISON ===\")\nfor sc in test_scenarios:\n    print(f\"\\n{sc['desc']}\")\n    rule_res = rule_based_sprinkler(sc['time'], sc['moisture'])\n    smart_res = smart_adaptive_sprinkler(sc['moisture'], sc['temp'], sc['rain'])\n    print(f\"  [Rule-Based System] : {rule_res}\")\n    print(f\"  [Smart AI System]   : {smart_res}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-1-1-1",
                  "questionNumber": 1,
                  "questionText": "(Conceptual Recall)\nAn automatic supermarket sliding door uses an infrared motion sensor. Whenever a human approaches, the beam breaks and the door slides open. Is this door an example of an AI system?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Automation is not synonymous with AI. The automatic door operates strictly on a deterministic binary switch: IF beam is broken THEN open motor. It does not analyze patterns, learn from past customer movement trends, or adapt its behavior over time.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-1-2",
                  "questionNumber": 2,
                  "questionText": "(Comparative Analysis)\nWhy do traditional rule-based programs struggle when trying to recognize spoken words across different people?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Natural real-world data possesses immense variation. Hand-crafting explicit rules for millions of voice modulations, dialectal inflections, and audio artifacts is mathematically intractable for human programmers. AI succeeds by discovering statistical patterns across thousands of audio training samples.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-1-3",
                  "questionNumber": 3,
                  "questionText": "(Higher-Order Scenario)\nA chess computer in 1997 evaluates 200 million possible moves per second using a pre-calculated mathematical evaluation function written by chess grandmasters. A modern AI chess system in 2026 plays against itself for 4 hours, starts with zero knowledge ot",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Deep Blue (1997) utilized massive brute-force search combined with human-crafted evaluation heuristics. Systems like AlphaZero/modern ML learn optimal strategies directly from experience (reinforcement learning), discovering non-intuitive patterns through self-play.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-1-4",
                  "questionNumber": 4,
                  "questionText": "(System Architecture)\nWhich component in an AI-powered delivery rover is responsible for acting as its \"sensory organ\"?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "Sensors (cameras, LiDAR, microphones, ultrasonic transceivers) gather physical environmental data and convert it into digital signals, functioning as the sensory organs of the AI system. Motors and actuators represent the \"muscles\" (acting stage).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-1-5",
                  "questionNumber": 5,
                  "questionText": "(Critical Edge-Case Reasoning)\nAn AI camera is installed at a bird sanctuary to count eagles. During testing, it correctly identifies 100 eagles against a clear blue sky. However, when an eagle flies in front of snowy mountain peaks, the AI labels it a \"Seagull\". What is the most",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "This is a classic machine learning failure known as shortcut learning or spurious correlation. If all training examples of eagles had blue sky backgrounds, the model may mistakenly use blue background pixels as a key distinguishing feature for eagles.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: How Machines Get Smart",
              "scenario": "An automated system in How Machines Get Smart must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Do Machines Have Minds? When a voice assistant says, \"I'm sorry, I don't know the answer to that,\" it sounds polite, empathetic, and thoughtful. However, it is vital to remember: - No Emotional Consciousness: An AI does not \"feel bad\" about not knowing the answer. It is calculating probability vecto",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch1-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 2,
            "lessonTitle": "Learning from Examples",
            "syllabusReference": "GAIO-CLASS6-CH01-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Learning from Examples Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Project Cyber-Pet Sorter* > **Mission Briefing:** The Galactic Spaceport Security Terminal has been flooded with hundreds of lost alien pets! > Some pets are harmless, cuddly **\"Fluff-Puffs\"** (authorized companions), while others are mischievous, electric **\"Zap-Goblins\"** (require special handling). > The customs scanner does not know how to tell them apart. It has never seen either species before! > As the Spaceport AI Training Specialist, you cannot write an infinite list of rules because alien pets mutate slightly. Instead, you must curate a **Balanced Training Dataset**, extract discriminating physical features (ear shape, tail length, bio-glow frequency), and teach the customs scanner how to classify incoming mystery pets accurately! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Learning from Examples.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Learning from Examples",
              "overview": "Key theoretical principles and architecture defining Learning from Examples.",
              "blocks": [
                {
                  "title": "The Anatomy of Supervised Learning",
                  "summary": "How does a computer \"learn\" from examples? It requires three essential ingredients:",
                  "keyPoints": [
                    "**Features (The Clues):** Measurable properties or characteristics of the object being observed (e.g., ear shape, height",
                    "**Labels (The Answers):** The ground-truth category or classification assigned to each example (e.g., \"Cat\" or \"Dog\", \"S",
                    "**Training Data:** The collection of paired examples `(Features + Label)` shown to the algorithm during its learning pha",
                    "**Model:** The resulting mathematical mathematical formula or pattern engine that can now take new, unseen features and "
                  ]
                },
                {
                  "title": "Structured Feature Table: Pet Recognition Example",
                  "summary": "| Pet ID | Ear Shape (Feature 1) | Whisker Length (Feature 2) | Tail Type (Feature 3) | Bark Sound? (Feature 4) | Correct Label (Target) |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| P-01 | Pointed | Long (>6 cm) | Fluffy / Curled | No | Cat |\n| P-02 |",
                  "keyPoints": [
                    "Core principle behind Structured Feature Table: Pet Recognition Example",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Positive vs Negative Examples",
                  "summary": "When teaching a model what an object is, you must also teach it what an object is not:\n- Positive Examples: Samples belonging to the target class (e.g., 50 pictures of apples).\n- Negative Examples: Samples belonging to other classes that share similar characte",
                  "keyPoints": [
                    "**Positive Examples:** Samples belonging to the target class (e.g., 50 pictures of apples).",
                    "**Negative Examples:** Samples belonging to other classes that share similar characteristics (e.g., 50 pictures of red t",
                    "*Without negative examples*, an AI might learn that \"anything red and round is an apple\", causing embarrassing classific",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Learning from Examples Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Learning from Examples.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Training Ground",
              "engineType": " Dataset Curation & Generalization Battle.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Training Ground.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Learning from Examples Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 1 LESSON 2\n# PYTHON FEATURE-MATCHING CLASSIFIER SIMULATION\n# =====================================================================\n\n# 1. Training Dataset: Labeled Examples\ntraining_dataset = [\n    {\"name\": \"Persian\", \"ears\": \"pointed\", \"tail\": \"fluffy\", \"barks\": False, \"label\": \"Cat\"},\n    {\"name\": \"Siamese\", \"ears\": \"pointed\", \"tail\": \"sleek\", \"barks\": False, \"label\": \"Cat\"},\n    {\"name\": \"Beagle\",  \"ears\": \"floppy\",  \"tail\": \"straight\", \"barks\": True,  \"label\": \"Dog\"},\n    {\"name\": \"Husky\",   \"ears\": \"pointed\", \"tail\": \"bushy\", \"barks\": True,  \"label\": \"Dog\"},\n    {\"name\": \"Pug\",     \"ears\": \"floppy\",  \"tail\": \"curled\", \"barks\": True,  \"label\": \"Dog\"}\n]\n\ndef classify_mystery_animal(ears, tail, barks):\n    \"\"\"\n    Classifies an animal based on feature weights learned from examples.\n    Observation: In our dataset, 'barks=True' is 100% indicative of Dog.\n    If 'barks=False', pointed ears indicate Cat.\n    \"\"\"\n    cat_score = 0\n    dog_score = 0\n    \n    # Feature 1: Barking behavior (High weight)\n    if barks:\n        dog_score += 3\n    else:\n        cat_score += 3\n        \n    # Feature 2: Ear shape\n    if ears == \"pointed\":\n        cat_score += 1\n        dog_score += 0.5  # Huskies also have pointed ears\n    elif ears == \"floppy\":\n        dog_score += 1\n        \n    # Decision output based on highest score\n    if dog_score > cat_score:\n        confidence = (dog_score / (dog_score + cat_score)) * 100\n        return \"Dog\", round(confidence, 1)\n    else:\n        confidence = (cat_score / (dog_score + cat_score)) * 100\n        return \"Cat\", round(confidence, 1)\n\n# ----------------- EVALUATION ON UNSEEN TEST CASES -----------------\ntest_cases = [\n    {\"test_id\": \"Mystery-A\", \"ears\": \"pointed\", \"tail\": \"sleek\", \"barks\": False},\n    {\"test_id\": \"Mystery-B\", \"ears\": \"pointed\", \"tail\": \"bushy\", \"barks\": True},\n    {\"test_id\": \"Mystery-C\", \"ears\": \"floppy\",  \"tail\": \"fluffy\", \"barks\": True}\n]\n\nprint(\"=== CYBER-PET CLASSIFIER INFERENCE RUN ===\")\nfor test in test_cases:\n    prediction, conf = classify_mystery_animal(test['ears'], test['tail'], test['barks'])\n    print(f\"[{test['test_id']}] Traits: Ears={test['ears']}, Barks={test['barks']} \"\n          f\"--> Predicted: {prediction} ({conf}% confidence)\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-1-2-1",
                  "questionNumber": 1,
                  "questionText": "(Core Definitions)\nIn a dataset designed to train an AI model to detect whether incoming emails are \"Spam\" or \"Legitimate\", what do the individual words in the email represent, and what does the \"Spam / Legitimate\" tag represent?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In supervised machine learning, the observable characteristics or variables extracted from the input data (such as specific keywords like \"Discount\", \"Winner\", or \"Free\") are called Features. The target category or ground-truth answer that the model is trying to predict is called the Label.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-2-2",
                  "questionNumber": 2,
                  "questionText": "(Dataset Balance & Distribution)\nA developer trains an image classifier to detect bicycle helmets. The training dataset consists of 990 images of cyclists wearing black helmets and only 10 images of cyclists wearing bright yellow helmets. When tested on a new photo of a cyclist w",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The dataset suffered from severe class/attribute imbalance. Because 99% of the training images featured black helmets, the model learned to associate helmet detection almost entirely with the color black. To build a robust model, the training dataset must include diverse colors, shapes, and lighting conditions.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-2-3",
                  "questionNumber": 3,
                  "questionText": "(Higher-Order Thinking: Feature Selection)\nA hospital wants to build an AI system to predict which patients are at high risk of developing severe asthma attacks. Which of the following sets of features would be most clinically relevant and informative for the model?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Effective machine learning depends heavily on Feature Selection\u2014choosing attributes that possess causal or strong statistical relationships with the outcome. Air quality, pollen levels, past medical history, and spirometry (lung capacity) have direct physiological links to asthma exacerbations, whereas shoe size and favorite colors are irrelevant n",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-2-4",
                  "questionNumber": 4,
                  "questionText": "(Supervised Learning Methodology)\nWhy is it essential to test an AI model using data that was never included in its training set?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "If you test a student using the exact same math problems they practiced the night before, they might score 100% simply by memorizing the answers without understanding the underlying math concepts. In AI, testing on unseen data verifies Generalization\u2014the ability to apply learned patterns to brand new situations.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-1-2-5",
                  "questionNumber": 5,
                  "questionText": "(Data Quality & Integrity)\nThe phrase \"Garbage In, Garbage Out\" is a foundational rule in AI engineering. What does it signify?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An AI model is only as smart as the data used to train it. If training data contains incorrect labels, measurement errors, or severe omissions, the model will faithfully internalize those flaws, producing disastrously poor predictions when deployed.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Learning from Examples",
              "scenario": "An automated system in Learning from Examples must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Who Decides What the AI Learns? When an AI model makes an unfair decision, who is responsible? - Human Authorship of Data: Data does not fall from the sky. Humans choose which photos to collect, which questions to ask in surveys, and how items are labeled. If human collectors carry personal biases, ",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class6-ch2",
        "chapterNumber": 2,
        "title": "Communicate with AI",
        "description": "Think -> Plan -> Code & Friendly Coding",
        "icon": "Terminal",
        "lessons": [
          {
            "id": "class6-ch2-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 1,
            "lessonTitle": "Think \u2192 Plan \u2192 Code",
            "syllabusReference": "GAIO-CLASS6-CH02-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Think \u2192 Plan \u2192 Code Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Rover Rescue on the Lunar Crater* > **Mission Briefing:** An autonomous lunar exploration rover, *Artemis-6*, is stuck on the rugged crater floor of the Moon! > Its main satellite communications link has degraded, leaving only an ultra-low-bandwidth emergency command radio. You cannot steer the rover in real time with a joystick because radio signals take 2.6 seconds to travel round-trip. If you send a command late, the rover will tumble into a bottomless crevasse! > The only way to guide Artemis-6 back to the solar recharge base is to **THINK** through the path, **PLAN** an unambiguous, step-by-step algorithm that handles unexpected boulder obstacles, and convert that plan into verified **CODE** before broadcasting it to the rover. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Think \u2192 Plan \u2192 Code.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Think \u2192 Plan \u2192 Code",
              "overview": "Key theoretical principles and architecture defining Think \u2192 Plan \u2192 Code.",
              "blocks": [
                {
                  "title": "The Three Stages of Problem Solving",
                  "summary": "Master software engineers and AI developers do not start by typing code. They follow the three-phase pipeline:",
                  "keyPoints": [
                    "Core principle behind The Three Stages of Problem Solving",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "1. Decomposition (The \"Think\" Phase)",
                  "summary": "Decomposition means breaking down a large, overwhelming problem into smaller, manageable sub-problems:\n- Problem: Make a morning breakfast.\n- Decomposed Sub-Tasks:\n  1. Boil water in the kettle.\n  2. Toast two slices of whole-wheat bread.\n  3. Spread butter an",
                  "keyPoints": [
                    "*Problem:* Make a morning breakfast.",
                    "*Decomposed Sub-Tasks:*",
                    "1. Boil water in the kettle.",
                    "2. Toast two slices of whole-wheat bread."
                  ]
                },
                {
                  "title": "2. Pseudocode Conventions (The \"Plan\" Phase)",
                  "summary": "Pseudocode is an informal, human-readable way of writing programming logic without worrying about strict syntax rules like quotation marks or semicolons.",
                  "keyPoints": [
                    "Core principle behind 2. Pseudocode Conventions (The \"Plan\" Phase)",
                    "Real-world architecture and deployment pattern"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Think \u2192 Plan \u2192 Code Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Think \u2192 Plan \u2192 Code.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "7. SERVE drink",
                  "instruction": "8. END  Guided Reasoning Questions:",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                },
                {
                  "stepNumber": 2,
                  "title": "-",
                  "instruction": "Execute automated data probes.",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                },
                {
                  "stepNumber": 3,
                  "title": "- The robot adds another spoon of coffee, stirs 5 ",
                  "instruction": "Execute automated data probes.",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Algorithm Labyrinth",
              "engineType": " Algorithmic Grid Navigation & Sub-Routine Planner.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Algorithm Labyrinth.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Think \u2192 Plan \u2192 Code Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 2 LESSON 1\n# ROVER NAVIGATION: TRANSLATING ALGORITHM TO PYTHON CODE\n# =====================================================================\n\ndef execute_rover_mission(grid_size, obstacles, target):\n    \"\"\"\n    Simulates rover moving from (0, 0) to target while avoiding obstacles.\n    Algorithm:\n    1. Check if fuel remains.\n    2. Check if next step contains an obstacle.\n    3. Move along X-axis first, then Y-axis.\n    \"\"\"\n    rover_x = 0\n    rover_y = 0\n    fuel = 20\n    path_log = [(rover_x, rover_y)]\n    \n    print(f\"Mission Start: Rover at ({rover_x}, {rover_y}) | Target: {target}\")\n    \n    while (rover_x, rover_y) != target:\n        if fuel <= 0:\n            return \"MISSION FAILED: Out of fuel in the lunar desert!\"\n        \n        # Decide next move: Priority to advance along X until aligned\n        next_step = None\n        if rover_x < target[0]:\n            candidate = (rover_x + 1, rover_y)\n            if candidate not in obstacles:\n                next_step = candidate\n            else:\n                # Obstacle evasion: detour along Y\n                print(f\"  [ALERT] Boulder at {candidate}! Evading via North.\")\n                next_step = (rover_x, rover_y + 1)\n        elif rover_y < target[1]:\n            candidate = (rover_x, rover_y + 1)\n            if candidate not in obstacles:\n                next_step = candidate\n            else:\n                # Detour along X\n                print(f\"  [ALERT] Boulder at {candidate}! Evading via East.\")\n                next_step = (rover_x + 1, rover_y)\n                \n        rover_x, rover_y = next_step\n        fuel -= 1\n        path_log.append((rover_x, rover_y))\n        print(f\"  Moved to ({rover_x}, {rover_y}) | Remaining Fuel: {fuel}\")\n        \n    return f\"MISSION SUCCESS: Reached Solar Base at ({rover_x}, {rover_y})! Remaining Fuel: {fuel}\"\n\n# ----------------- EXECUTION TEST -----------------\nlunar_obstacles = [(2, 0), (2, 1), (3, 3)]\nlunar_target = (4, 3)\n\nresult = execute_rover_mission(grid_size=(5, 5), obstacles=lunar_obstacles, target=lunar_target)\nprint(\"\\n\" + result)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-2-1-1",
                  "questionNumber": 1,
                  "questionText": "(Algorithmic Logic & Flowchart Conventions)\nIn a standardized computer science flowchart, what does a Diamond-shaped symbol represent?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "In flowchart syntax, the diamond symbol universally denotes a Decision Box. It takes an incoming path and poses an evaluative question (e.g., Is temperature > 100?), branching into at least two distinct exit flowlines (e.g., Yes and No).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-1-2",
                  "questionNumber": 2,
                  "questionText": "(Debugging & Computational Thinking)\nA programmer writes an algorithm to calculate the average score of 5 students:\n1. total = 0\n2. FOR EACH student IN class:\n3.     total = total + student.score\n4. average = total / 4\n5. PRINT average\n\nWhat type of error is present in this algor",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The program contains a Logic Error. The loop processes 5 students, but Line 4 divides the sum by 4 instead of 5. The program will execute smoothly without crashing, but the output average will be mathematically incorrect.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-1-3",
                  "questionNumber": 3,
                  "questionText": "(Algorithmic Decomposition)\nWhy is decomposition considered one of the most critical pillars of computational thinking when developing complex AI systems?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Decomposition allows software architects to tackle immense real-world complexity (such as building a self-driving car) by splitting it into focused, solvable modules: computer vision, path planning, obstacle braking, and speed control.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Algorithm Trace)\nConsider the following pseudocode:\nx = 2\ny = 10\nREPEAT 3 TIMES:\n    x = x  2\n    y = y - x\nOUTPUT y\n\nWhat is the final value printed by this algorithm?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-1-5",
                  "questionNumber": 5,
                  "questionText": "(AI System Communication)\nWhen humans interact with AI models using natural language instructions (prompts), what is the most common reason the AI produces an unsatisfactory answer?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Just as computers require precise pseudocode instructions, AI models require clear, unambiguous prompts. If a user asks \"Write a good story\" without specifying the genre, character goals, audience age, or length, the AI must guess the intent, often resulting in generic or irrelevant outputs.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Think \u2192 Plan \u2192 Code",
              "scenario": "An automated system in Think \u2192 Plan \u2192 Code must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Danger of Ambiguous Autonomous Systems When engineers design algorithms for autonomous systems (like medical robotic dispensers or financial loan evaluators): - Unintended Consequences: If an algorithm is given an ambiguous objective\u2014such as \"Maximize user screen time\" on a video platform\u2014it may",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch2-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 2,
            "lessonTitle": "Coding Made Friendly",
            "syllabusReference": "GAIO-CLASS6-CH02-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Coding Made Friendly Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Project Sparky: The Friendly School Guide* > **Mission Briefing:** It is the first day of the academic year at Neo-Olympia Academy, and hundreds of nervous new students have arrived! > The school robot, *Sparky*, was meant to welcome them, but its software was wiped clean during a memory upgrade. Right now, if a student speaks to Sparky, it outputs cold, robotic binary gibberish: `ERROR 404: IDENTITY UNKNOWN`. > Your mission is to reprogram Sparky to become **Friendly, Welcoming, and Helpful**! You must teach Sparky to ask for the student's name, identify their favorite subject, calculate how many days remain until the Science Olympiad, and offer encouraging words with warm, human-friendly dialogue. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Coding Made Friendly.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Coding Made Friendly",
              "overview": "Key theoretical principles and architecture defining Coding Made Friendly.",
              "blocks": [
                {
                  "title": "What is a Variable?",
                  "summary": "Imagine your school locker. On the outside of the locker is a label with your name. Inside the locker, you can place your heavy math textbook, your gym shoes, or your lunchbox. Next week, you can take out the textbook and replace it with an art folder.",
                  "keyPoints": [
                    "**Variable Name:** The label on the locker (e.g., `student_name`, `age`, `score`).",
                    "**Variable Value:** The contents stored inside (e.g., `\"Aarav\"`, `12`, `98.5`).",
                    "**Assignment Operator (`=`):** The action of placing a value into the labeled locker."
                  ]
                },
                {
                  "title": "The Four Core Data Types in Python",
                  "summary": "| Data Type Name | Python Code Keyword | What It Stores | Real-World Examples |\n| :---: | :---: | :--- | :--- |\n| String | str | Text enclosed in matching quotes (\"...\" or '...'). | \"Rohan\", \"Grade 6\", \"Blue\" |\n| Integer | int | Whole numbers without any decim",
                  "keyPoints": [
                    "Core principle behind The Four Core Data Types in Python",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Magic of Friendly Formatting: Python f-Strings",
                  "summary": "In older programming languages, joining text and variables was clunky and prone to errors. In modern Python, we use f-strings (formatted string literals):",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Coding Made Friendly Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Coding Made Friendly.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Chat-Companion Sandbox",
              "engineType": " Dialogue Tree Builder & Tone Calibration Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Chat-Companion Sandbox.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Coding Made Friendly Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# Creating variables in Python\nstudent_name = \"Maya\"   # A string of text (str)\nage = 11                # A whole number / integer (int)\nquiz_score = 94.5       # A decimal number / float (float)\nis_enrolled = True      # A boolean flag (bool)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-2-2-1",
                  "questionNumber": 1,
                  "questionText": "(Data Types & Type Recognition)\nIn Python, what is the data type of the value stored in the variable mysteryvalue = \"2026\"?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Any value enclosed in quotation marks (\"...\" or '...') is recognized by Python as a String (str), regardless of whether the characters inside represent numbers. For Python to treat it as a numerical integer, it must be written without quotes as 2026 or explicitly cast using int(\"2026\").",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-2-2",
                  "questionNumber": 2,
                  "questionText": "(Variable Naming Conventions & Rules)\nWhich of the following is a valid and PEP-8 compliant variable name in Python?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "Python variable naming rules:\n  1. Cannot start with a number (invalidates A).\n  2. Cannot contain hyphens/dashes, as Python interprets - as subtraction (invalidates B).\n  3. Cannot be a reserved Python keyword (invalidates D, as class is a reserved keyword).\n  4. studentscore follows standard snakecase naming and is completely valid.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-2-3",
                  "questionNumber": 3,
                  "questionText": "(String Concatenation vs Arithmetic)\nWhat will be displayed on the screen when the following Python code is executed?\na = \"AI\"\nb = \"3\"\nprint(a  int(b))\n\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In Python, multiplying a string by an integer n performs String Repetition. Since int(b) converts \"3\" to the integer 3, \"AI\"  3 produces the string \"AIAIAI\".",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Debugging Crash)\nA student runs this code in Python:\nuserage = input(\"Enter your age: \")\nyearstowait = 18 - userage\nprint(f\"You will vote in {yearstowait} years.\")\n\nThe program crashes with: TypeError: unsupported operand type(s) for -: 'int' and 'str'.  \n",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "input() returns a string. Python cannot perform mathematical subtraction between an integer (18) and a string (userage). Converting userage to an integer via int(userage) allows the subtraction operation to succeed.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-2-2-5",
                  "questionNumber": 5,
                  "questionText": "(f-String Syntax Mastery)\nWhich of the following is the correct syntax to print the sentence: \"Kabir scored 98 in Python\" assuming name = \"Kabir\" and score = 98?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In Python f-string syntax, the letter f must precede the opening quote: f\"...\". The variable names must be wrapped inside curly braces {name} and {score} so that Python replaces them with their actual stored values.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Coding Made Friendly",
              "scenario": "An automated system in Coding Made Friendly must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Chatbot Safety: Guarding Personal Private Data When designing conversational bots for people: - Never Solicit Sensitive PII: A friendly bot should never ask users for passwords, home addresses, phone numbers, or credit card information. - Handling Frustrated Users: If a user expresses extreme frustr",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class6-ch3",
        "chapterNumber": 3,
        "title": "AI Applications",
        "description": "AI on the Road & AI on the Farm",
        "icon": "Car",
        "lessons": [
          {
            "id": "class6-ch3-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 1,
            "lessonTitle": "AI on the Road",
            "syllabusReference": "GAIO-CLASS6-CH03-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI on the Road Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Auto-Cruise Velocity: The Midnight Blizzard* > **Mission Briefing:** You are the Lead Safety Systems Engineer for *Aero-Transit*, an autonomous electric shuttle operating between the airport and downtown. > A sudden midnight storm has hit! Thick fog blankets the highway, snow partially covers the white lane markings, and an unexpected construction detour has appeared. > A human driver is squinting through the windshield, barely able to see 10 meters ahead. But your shuttle is equipped with a **Multi-Sensor AI Perception Array**! > Your mission is to configure the shuttle's sensor fusion algorithms so that it cross-checks cameras with radar and LiDAR, spots road obstacles through the fog, maintains a safe braking distance, and brings passengers safely to the terminal without incident. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI on the Road.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI on the Road",
              "overview": "Key theoretical principles and architecture defining AI on the Road.",
              "blocks": [
                {
                  "title": "The Autonomous Vehicle Sensory Array",
                  "summary": "No single sensor is sufficient to safely navigate a 2-ton vehicle moving at 100 km/h. Autonomous vehicles rely on Sensor Fusion\u2014combining complementary sensors:",
                  "keyPoints": [
                    "Core principle behind The Autonomous Vehicle Sensory Array",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Detailed Sensor Comparison Matrix",
                  "summary": "| Sensor Type | Physical Mechanism | Primary Strength | Weakness / Failure Mode |\n| :--- | :--- | :--- | :--- |\n| Optical Cameras | Captures light photons onto digital CMOS sensors. | Excellent at reading text on signs, color of traffic lights, lane stripes. |",
                  "keyPoints": [
                    "Core principle behind Detailed Sensor Comparison Matrix",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The SAE Levels of Driving Automation (Levels 0 to 5)",
                  "summary": "- Level 0 (No Automation): Complete human control (traditional steering wheel and pedals).\n- Level 1 (Driver Assistance): Single automated system (e.g., Adaptive Cruise Control maintaining distance).\n- Level 2 (Partial Automation): Vehicle controls both steeri",
                  "keyPoints": [
                    "**Level 0 (No Automation):** Complete human control (traditional steering wheel and pedals).",
                    "**Level 1 (Driver Assistance):** Single automated system (e.g., Adaptive Cruise Control maintaining distance).",
                    "**Level 2 (Partial Automation):** Vehicle controls both steering and acceleration simultaneously, but human driver must ",
                    "**Level 3 (Conditional Automation):** Vehicle drives itself under specific conditions (e.g., highway traffic jam); human"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI on the Road Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI on the Road.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Autonomous Highway Navigator",
              "engineType": " Real-Time Sensor Fusion & Telemetry Dashboard Simulator.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Autonomous Highway Navigator.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI on the Road Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 3 LESSON 1\n# AUTONOMOUS VEHICLE MULTI-SENSOR BRAKING LOGIC\n# =====================================================================\n\ndef autonomous_braking_system(vehicle_speed_kmh, camera_detected, lidar_dist_meters, radar_speed_kmh):\n    \"\"\"\n    Computes real-time vehicle action based on fused sensor telemetry.\n    Rules:\n    - If LiDAR detects an obstacle < 15 meters, execute EMERGENCY BRAKE.\n    - If LiDAR detects obstacle between 15m and 40m, DECELERATE and match speed.\n    - If camera sees an obstacle but LiDAR distance is clear (>50m), proceed with caution (possible shadow).\n    - If all sensors clear, maintain CRUISE SPEED.\n    \"\"\"\n    print(f\"\\n[Telemetry] Speed: {vehicle_speed_kmh} km/h | LiDAR Dist: {lidar_dist_meters}m | Camera: {camera_detected}\")\n    \n    # 1. Critical Emergency Zone\n    if lidar_dist_meters < 15.0:\n        return \"\ud83d\udea8 ACTION: EMERGENCY BRAKE! (ABS Engaged - Imminent Collision Hazard)\"\n    \n    # 2. Cautionary Deceleration Zone\n    elif 15.0 <= lidar_dist_meters <= 40.0:\n        target_speed = min(radar_speed_kmh, vehicle_speed_kmh - 15)\n        return f\"\u26a0\ufe0f ACTION: DECELERATE. Adjusting speed to {max(target_speed, 10)} km/h to maintain safety gap.\"\n    \n    # 3. Discrepancy / Shadow Verification\n    elif camera_detected and lidar_dist_meters > 50.0:\n        return \"\ud83d\udc40 ACTION: SENSOR AUDIT. Camera reports visual mark but LiDAR confirms clear path. Proceeding with caution.\"\n    \n    # 4. Clear Roadway\n    else:\n        return \"\u2705 ACTION: CRUISE. Roadway clear, maintaining standard highway velocity.\"\n\n# ----------------- SIMULATED ROADWAY EVENTS -----------------\nscenarios = [\n    {\"desc\": \"Event 1: Open highway, sunny afternoon\", \"speed\": 90, \"cam\": False, \"lidar\": 100.0, \"radar\": 90},\n    {\"desc\": \"Event 2: Overhead highway bridge casts dark shadow on road\", \"speed\": 85, \"cam\": True, \"lidar\": 80.0, \"radar\": 85},\n    {\"desc\": \"Event 3: Car ahead slows down in traffic lane\", \"speed\": 75, \"cam\": True, \"lidar\": 28.0, \"radar\": 40},\n    {\"desc\": \"Event 4: Fallen tree trunk across the lane around sharp bend\", \"speed\": 60, \"cam\": True, \"lidar\": 11.5, \"radar\": 0}\n]\n\nprint(\"=== AERO-TRANSIT AUTONOMOUS PERCEPTION RUN ===\")\nfor event in scenarios:\n    print(event[\"desc\"])\n    action = autonomous_braking_system(event[\"speed\"], event[\"cam\"], event[\"lidar\"], event[\"radar\"])\n    print(f\"  {action}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-3-1-1",
                  "questionNumber": 1,
                  "questionText": "(Sensor Technologies)\nWhich autonomous vehicle sensor operates by emitting invisible laser beams to measure reflections and generate a detailed 3D \"point cloud\" of surrounding objects?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "LiDAR systems emit hundreds of thousands of laser pulses per second. By calculating the exact time-of-flight (the nanoseconds required for each pulse to bounce off objects and return), the system calculates precise 3D spatial coordinates for every physical surface, constructing an interactive 3D digital point cloud of the world.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-1-2",
                  "questionNumber": 2,
                  "questionText": "(SAE Autonomy Levels)\nA newly released electric car can automatically adjust its speed to follow the car ahead and can steer smoothly to stay centered between lane lines on the highway. However, the owner's manual states: \"The driver must keep both hands on the wheel and maintain",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Level 2 (Partial Automation) includes vehicles that combine automated steering and acceleration simultaneously (e.g., lane-centering plus adaptive cruise control). However, because the human driver remains legally responsible for monitoring the environment and must be ready to take over instantly, it remains at Level 2.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-1-3",
                  "questionNumber": 3,
                  "questionText": "(Environmental Perception & Sensor Fusion)\nDuring a torrential monsoon rainstorm, water droplets scatter laser beams and windshield wipers struggle to keep camera views clear. Which sensor onboard the vehicle remains largely unaffected by water droplets and fog, ensuring the car ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Radar utilizes electromagnetic radio wavelengths that are much longer than optical light or near-infrared laser beams. These longer radio waves easily pass straight through atmospheric moisture, rain, snow, and dense fog, reflecting cleanly off metallic and solid objects.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Machine Learning in Robotics)\nWhy do autonomous vehicles use Convolutional Neural Networks (CNNs) to process camera images rather than simple manual pixel-matching rules?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In the real world, a pedestrian may wear a raincoat, carry an umbrella, or walk at a 45-degree angle. Static pixel templates would fail completely. Deep learning vision models (such as CNNs) learn abstract hierarchical features (edges, curves, textures, body outlines) that allow them to recognize pedestrians under diverse orientations and lighting ",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-1-5",
                  "questionNumber": 5,
                  "questionText": "(Ethical Reasoning in Autonomous Systems)\nWhat is the primary ethical purpose of designing autonomous vehicle control systems with strict fail-operational redundancies (e.g., backup braking computers, dual battery buses)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In safety-critical robotics, a single point of failure (SPOF) can be fatal. Autonomous vehicles must have hardware and software redundancies so that a component failure triggers a graceful degradation / minimal risk maneuver (pulling over safely) rather than a catastrophic loss of control.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI on the Road",
              "scenario": "An automated system in AI on the Road must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human-Centric Safety Mandate Autonomous driving has the potential to save over 1 million lives globally each year by eliminating accidents caused by human drunk driving, speeding, and texting while driving. However: - Zero Complacency: Drivers using Level 2 systems must never fall asleep or play",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch3-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 2,
            "lessonTitle": "AI on the Farm",
            "syllabusReference": "GAIO-CLASS6-CH03-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI on the Farm Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Terra-Bloom* > **Mission Briefing:** Welcome to the Green Valley Agricultural Cooperative! > Green Valley spans 500 hectares of vital wheat, corn, and fruit orchards. Recently, a severe heatwave coupled with an invasive aphid beetle threat has put the regional harvest in jeopardy. > In the old days, farmers would spray thousands of liters of chemical pesticides and pump millions of liters of groundwater across every single field indiscriminately. This wasted precious water, poisoned beneficial ladybugs, and cost enormous sums of money. > As the Cooperative\u2019s Chief Agricultural AI Engineer, you must deploy an **Agro-Drone Surveillance Fleet** and **Underground IoT Soil Probes**! Your mission is to identify precisely which crops are thirsty or sick, target treatments with millimeter laser precision, and save the harvest while preserving the natural ecosystem. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI on the Farm.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI on the Farm",
              "overview": "Key theoretical principles and architecture defining AI on the Farm.",
              "blocks": [
                {
                  "title": "The Precision Agriculture Revolution",
                  "summary": "Traditional farming treats an entire 100-acre field as a single uniform plot. Precision Agriculture treats every square meter, and even individual plant stalks, as unique data points:",
                  "keyPoints": [
                    "Core principle behind The Precision Agriculture Revolution",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Key Technological Pillars of Smart Agriculture",
                  "summary": "| Technology Pillar | How It Operates | Real-World Agricultural Benefit |\n| :--- | :--- | :--- |\n| Multispectral Agro-Drones | Captures near-infrared (NIR) and visible green light reflected by plant chlorophyll. | Computes Vegetation Health (NDVI). Healthy pla",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI on the Farm Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI on the Farm.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Smart Agro-Manager",
              "engineType": " Resource-Optimization & Ecological Balance Simulation.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Smart Agro-Manager.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "- Broadcast Trap: If the player hits the \"Spray Al",
                  "evidence": "4. Completion State: - Maintain 85%+ Crop Yield across 4 seasonal turns while keeping Eco-Health in the Green Zone.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI on the Farm Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 3 LESSON 2\n# PRECISION AGRICULTURE: SOIL SENSOR TELEMETRY & IRRIGATION ENGINE\n# =====================================================================\n\ndef calculate_field_irrigation(soil_probes):\n    \"\"\"\n    Analyzes telemetry from multiple IoT soil probes across field sectors.\n    Determines precise water requirements to maintain optimal 60% saturation.\n    \"\"\"\n    print(f\"{'SECTOR':<10} | {'MOISTURE (%)':<14} | {'SOIL TEMP (\u00b0C)':<15} | {'RECOMMENDED ACTION'}\")\n    print(\"-\" * 65)\n    \n    total_water_liters = 0\n    sectors_requiring_water = 0\n    \n    for probe in soil_probes:\n        sector = probe[\"sector\"]\n        moisture = probe[\"moisture\"]\n        temp = probe[\"temp\"]\n        \n        # Optimal moisture target is 60%\n        if moisture < 40:\n            # High water deficit\n            water_needed = (60 - moisture) * 50  # 50 liters per deficit percentage point\n            action = f\"\ud83d\udca7 PUMP ON: Dispense {water_needed} L (Drought Alert)\"\n            total_water_liters += water_needed\n            sectors_requiring_water += 1\n        elif 40 <= moisture < 55:\n            # Mild deficit\n            water_needed = (60 - moisture) * 30\n            action = f\"\ud83c\udf31 ECO-PULSE: Dispense {water_needed} L (Maintenance)\"\n            total_water_liters += water_needed\n            sectors_requiring_water += 1\n        elif 55 <= moisture <= 70:\n            action = \"\u2705 OPTIMAL: Moisture balanced. Valves closed.\"\n        else:\n            action = \"\u26a0\ufe0f WATERLOGGED: High moisture! Open drainage channels.\"\n            \n        print(f\"{sector:<10} | {moisture:<14.1f} | {temp:<15.1f} | {action}\")\n        \n    print(\"-\" * 65)\n    print(f\"Summary: {sectors_requiring_water}/{len(soil_probes)} sectors irrigated.\")\n    print(f\"Total Precision Water Allocated: {total_water_liters:,} Liters.\")\n    print(f\"Water Saved vs Conventional Flooding (50,000 L): {50000 - total_water_liters:,} Liters!\")\n\n# ----------------- SIMULATED TELEMETRY DATA -----------------\nfield_telemetry = [\n    {\"sector\": \"Alpha-1\", \"moisture\": 32.5, \"temp\": 28.4},\n    {\"sector\": \"Alpha-2\", \"moisture\": 62.0, \"temp\": 25.1},\n    {\"sector\": \"Beta-1\",  \"moisture\": 48.0, \"temp\": 27.0},\n    {\"sector\": \"Beta-2\",  \"moisture\": 76.5, \"temp\": 23.8},\n    {\"sector\": \"Gamma-1\", \"moisture\": 25.0, \"temp\": 31.2}\n]\n\nprint(\"=== GREEN VALLEY PRECISION AG-BOT INFERENCE RUN ===\\n\")\ncalculate_field_irrigation(field_telemetry)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-3-2-1",
                  "questionNumber": 1,
                  "questionText": "(Agricultural Remote Sensing)\nWhat light spectrum band does a multispectral drone camera measure in conjunction with visible red light to calculate the Normalized Difference Vegetation Index (NDVI)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Healthy plant foliage strongly absorbs visible red light for chlorophyll photosynthesis while its internal spongy mesophyll cell structure strongly reflects Near-Infrared (NIR) light. Measuring the mathematical ratio between NIR reflection and Red absorption (NDVI) provides a precise, non-destructive metric of plant vigor.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-2-2",
                  "questionNumber": 2,
                  "questionText": "(Resource Conservation & Ecological Impact)\nHow does computer-vision-guided precision weeding tractors benefit local soil ecology compared to conventional blanket herbicide spraying?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Conventional broadcast spraying saturates entire fields, resulting in massive pesticide drift, groundwater contamination, and the destruction of beneficial insects like pollinators. Vision-guided AI sprayers identify weed leaves within milliseconds, targeting only the weeds and reducing environmental chemical loads by 85\u201390%.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-2-3",
                  "questionNumber": 3,
                  "questionText": "(IoT Sensor Telemetry)\nIf an IoT soil sensor probe in an agricultural field reports a moisture reading of 85% and electrical conductivity spikes, while ambient weather forecasts predict 3 days of torrential rain, what is the most appropriate automated action for the smart farm sy",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An 85% moisture reading indicates soil near water saturation. With torrential rain imminent, adding more water would drown crop roots, deplete soil oxygen, and breed fungal diseases. The AI decision engine must halt all irrigation and prepare drainage channels.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Pest Detection AI)\nA drone equipped with an object detection model flies over an apple orchard to detect codling moths. During testing, the model achieves 99% accuracy on sunny days. However, at dusk and on overcast days, accuracy plummets to 45%. What eng",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The model suffered from training distribution bias\u2014it was trained exclusively on bright daylight imagery. Adding low-light training samples (data augmentation) and equipping the inspection drone with consistent onboard LED illumination ensures high feature visibility across diverse lighting conditions.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-3-2-5",
                  "questionNumber": 5,
                  "questionText": "(Economic and Humanitarian Implications)\nWhy is AI-powered early harvest yield prediction vital for global food security?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Reliable yield forecasts provide critical advance intelligence. If an AI predicts a 30% wheat deficit in a specific province due to drought patterns, international aid organizations and food distribution networks can reroute supplies, secure grain reserves, and stabilize prices before food shortages turn into humanitarian crises.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI on the Farm",
              "scenario": "An automated system in AI on the Farm must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Smallholder Farmers & The Digital Divide While massive agricultural conglomerates can afford $500,000 smart tractors and drone fleets: - Equitable Access: Smallholder family farmers produce over 30% of the world's food. If advanced AI farming tools are only available to wealthy industrial farms, sma",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class6-ch4",
        "chapterNumber": 4,
        "title": "AI and Career",
        "description": "Explore Tech Careers & Discover Your Skills",
        "icon": "Compass",
        "lessons": [
          {
            "id": "class6-ch4-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 1,
            "lessonTitle": "Explore Tech Careers",
            "syllabusReference": "GAIO-CLASS6-CH04-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Explore Tech Careers Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Dream-Team Assemble* > **Mission Briefing:** Welcome to the Horizon AI Innovation Incubator! > The city council has commissioned a massive high-tech initiative: *Project SafeHaven*\u2014an intelligent wildlife preservation and anti-poaching system to protect endangered snow leopards in the high mountain valleys. > However, the initiative is completely stalled! The council tried to hire only computer programmers, but the programmers do not understand animal biology, the cameras are failing in sub-zero snowstorms, the training data contains false triggers, and local villagers are worried about their privacy. > Your mission as the Chief Talent Director is to **Assemble the Interdisciplinary Dream Team**! You must deploy the right tech specialists to their respective posts and ensure they collaborate harmoniously to bring the project to life. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Explore Tech Careers.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Explore Tech Careers",
              "overview": "Key theoretical principles and architecture defining Explore Tech Careers.",
              "blocks": [
                {
                  "title": "The Myth of the \"Solo Hacker\"",
                  "summary": "In movies, an entire AI system is often shown being built overnight by a lone genius typing furiously in a dark basement. In reality, modern AI systems are vast, complex engineering endeavors created by diverse, cross-functional teams:",
                  "keyPoints": [
                    "Core principle behind The Myth of the \"Solo Hacker\"",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Detailed Profile of Modern AI Careers",
                  "summary": "| Career Title | Primary Focus & Mission | Essential Superpowers | Real-World Day at Work |\n| :--- | :--- | :--- | :--- |\n| Machine Learning Engineer | Takes mathematical models and builds robust, high-speed software code that runs on servers, smartphones, or ",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Explore Tech Careers Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Explore Tech Careers.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Tech Career Pathfinder",
              "engineType": " Crisis Management & Team Assembly Simulation.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Tech Career Pathfinder.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Explore Tech Careers Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 4 LESSON 1\n# ALGORITHMIC CAREER PATHFINDER & SKILL-MATCHING ENGINE\n# =====================================================================\n\ndef match_tech_career(interests):\n    \"\"\"\n    Evaluates student interests across 4 dimensions:\n    - code: Love for programming and computer systems\n    - math_data: Love for numbers, patterns, and mystery solving\n    - ethics_people: Passion for fairness, psychology, and helping others\n    - hardware: Passion for building physical gadgets, robots, and electronics\n    \"\"\"\n    scores = {\n        \"Machine Learning Engineer\": interests[\"code\"] * 2 + interests[\"math_data\"] * 1.5,\n        \"Data Detective / Data Scientist\": interests[\"math_data\"] * 2 + interests[\"code\"] * 1.0,\n        \"AI Ethicist & Safety Auditor\": interests[\"ethics_people\"] * 2.5 + interests[\"math_data\"] * 0.5,\n        \"Robotics Systems Architect\": interests[\"hardware\"] * 2.5 + interests[\"code\"] * 1.0,\n        \"AI Interaction (UX) Designer\": interests[\"ethics_people\"] * 1.5 + interests[\"code\"] * 1.0\n    }\n    \n    # Sort careers by score in descending order\n    sorted_careers = sorted(scores.items(), key=lambda item: item[1], reverse=True)\n    return sorted_careers\n\n# ----------------- SIMULATED STUDENT PROFILE -----------------\n# Ratings on a scale from 1 (Low) to 5 (High)\nstudent_survey = {\n    \"name\": \"Ananya\",\n    \"interests\": {\n        \"code\": 4,           # Enjoys writing Python scripts\n        \"math_data\": 3,      # Decent with numbers and graphs\n        \"ethics_people\": 5,  # Passionate about justice, fairness, and human rights\n        \"hardware\": 2        # Not very interested in soldering electronics\n    }\n}\n\nprint(f\"=== CAREER PATHFINDER REPORT FOR: {student_survey['name']} ===\")\ncareer_matches = match_tech_career(student_survey[\"interests\"])\n\nprint(f\"\\nTop Match:\")\ntop_role, top_score = career_matches[0]\nprint(f\"\ud83c\udf1f {top_role.upper()} (Fit Score: {top_score:.1f} pts)\")\n\nprint(f\"\\nComplete Career Alignment Matrix:\")\nfor role, score in career_matches:\n    bar = \"\u2588\" * int(score)\n    print(f\"  {role:<32} : {bar} ({score:.1f})\")\n\nprint(\"\\nAdvisor Tip: Even as an AI Ethicist, your strong coding skills (4/5)\")\nprint(\"will allow you to audit neural networks directly in Python code!\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-4-1-1",
                  "questionNumber": 1,
                  "questionText": "(Professional Roles & Responsibilities)\nWhich professional on an AI development team is primarily responsible for inspecting training datasets, identifying demographic imbalances, and auditing models to prevent unfair treatment of specific societal groups?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An AI Ethicist / Safety Auditor evaluates algorithms through the lenses of justice, moral accountability, data privacy, and legal compliance. They ensure models do not perpetuate historical prejudices or harm vulnerable demographics.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-1-2",
                  "questionNumber": 2,
                  "questionText": "(Interdisciplinary Engineering Collaboration)\nWhen developing an autonomous robotic surgery system, why is it critical that medical surgeons collaborate directly with Machine Learning Engineers?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "A",
                  "explanation": "AI engineering is inherently interdisciplinary. A programmer may understand algorithms, but only a trained medical surgeon (the domain expert) knows which anatomical variations are normal, which tissue textures indicate pathology, and what real-time safety thresholds must never be violated.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-1-3",
                  "questionNumber": 3,
                  "questionText": "(Software Optimization & Deployment)\nA Data Scientist creates an experimental deep learning neural network on a massive supercomputer that can recognize bird songs with 99% accuracy. However, when forest rangers attempt to run it on a small, solar-powered audio sensor in the jung",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Machine Learning / Embedded Systems Engineers specialize in model quantization, pruning, and hardware acceleration\u2014compressing massive models so they execute rapidly and reliably within strict memory and battery constraints on \"edge\" microcontrollers.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Job Transformation)\nWill Artificial Intelligence completely eliminate human jobs, or will it transform the nature of work?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Historically and currently, technological automation displaces routine, repetitive tasks (e.g., manual data entry or mechanical sorting) while creating new high-value roles that require uniquely human faculties: empathy, creative synthesis, ethical deliberation, and systems leadership.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-1-5",
                  "questionNumber": 5,
                  "questionText": "(User Interface & Cognitive Psychology)\nWhy is the role of an AI Interaction (UX) Designer vital when designing emergency medical software?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "High-stress environments like emergency rooms require crystal-clear communication. A poorly designed interface that buries life-critical alerts beneath confusing numbers can lead to medical errors. UX designers ensure AI insights are intuitive, transparent, and actionable within seconds.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Explore Tech Careers",
              "scenario": "An automated system in Explore Tech Careers must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human-in-the-Loop Imperative In safety-critical fields like criminal justice, medicine, and military defense: - Never Outsource Moral Choices: An algorithm can calculate statistical probabilities, but it cannot bear moral or legal responsibility. - The Human-in-the-Loop (HITL): High-stakes decis",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch4-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 2,
            "lessonTitle": "Discover Your Skills",
            "syllabusReference": "GAIO-CLASS6-CH04-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Discover Your Skills Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Unlock the Archetype: The Academy Gauntlet* > **Mission Briefing:** Welcome to the Neo-Olympia Skills Arena! > Every great explorer, scientist, and digital creator possesses a unique combination of cognitive strengths. Some students see numerical patterns in their sleep; others can tell instantly when a story character feels misunderstood; others love taking broken clocks apart with screwdrivers! > In the world of Artificial Intelligence, there is no single \"correct\" personality type. A breakthrough system requires mathematicians, empathetic listeners, bold artists, and ethical guardians. > Your mission today is to step into the **Skills Gauntlet**, complete four mental challenges testing your computational and human powers, map your personal **Skill Radar**, and discover your unique **Tech Archetype**! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Discover Your Skills.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Discover Your Skills",
              "overview": "Key theoretical principles and architecture defining Discover Your Skills.",
              "blocks": [
                {
                  "title": "The Four Pillars of Computational Thinking",
                  "summary": "Computational thinking is not the ability to type code into a computer; it is the universal human cognitive process used to solve complex problems in every domain of life:",
                  "keyPoints": [
                    "Core principle behind The Four Pillars of Computational Thinking",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Detailed Breakdown with Daily Examples",
                  "summary": "| Pillar | How Your Brain Uses It | Real-World Non-Computer Example | Real-World AI Example |\n| :--- | :--- | :--- | :--- |\n| Decomposition | Splits complexity into parts. | Planning a school sports day: events, scoreboards, medals, snacks. | Splitting self-dr",
                  "keyPoints": [
                    "Core principle behind Detailed Breakdown with Daily Examples",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The \"Human Superpowers\" in the Age of AI",
                  "summary": "Why will human skills matter even more as AI gets faster and smarter?\n1. Curiosity: AI can answer questions, but it cannot decide which important questions are worth asking!\n2. Empathy: AI has zero feelings. It cannot comfort a grieving patient or understand w",
                  "keyPoints": [
                    "**Curiosity:** AI can answer questions, but it cannot decide which important questions are worth asking!",
                    "**Empathy:** AI has zero feelings. It cannot comfort a grieving patient or understand what brings joy to a child.",
                    "**Ethical Discernment:** AI blindly optimizes numbers. Only humans can stand up and say: *\"This algorithm is unfair, and",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Discover Your Skills Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Discover Your Skills.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Skill Matrix Challenge",
              "engineType": " 4-Stage Multi-Cognitive Quest & Archetype Unlocker.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Skill Matrix Challenge.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "- Scenario: Organize an emergency relief mission f",
                  "evidence": "- Task: Drag and drop 12 mixed tasks into 3 distinct chronological phases: Immediate Rescue, Medical Shelter, Long-term Infrastructure. 2.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "- Scenario: A grid of 16 alien hieroglyphs with hi",
                  "evidence": "- Task: Spot the visual rule and select the next glyph in the sequence within 45 seconds. 3.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-3",
                  "levelNumber": 3,
                  "title": "- Scenario: A noisy police crime scene report cont",
                  "evidence": "- Task: Highlight only the 4 critical clues relevant to finding the stolen painting, stripping away background weather commentary. 4.",
                  "choices": [
                    {
                      "id": "ch-3-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-3-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Discover Your Skills Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 4 LESSON 2\n# COMPUTATIONAL THINKING RADAR & ARCHETYPE EVALUATOR\n# =====================================================================\n\ndef evaluate_skills(user_name, scores):\n    \"\"\"\n    Analyzes computational thinking and human superpower scores (1 to 10 scale).\n    Determines student archetype and generates a personalized growth recommendation.\n    \"\"\"\n    decomp = scores[\"decomposition\"]\n    pattern = scores[\"pattern_recognition\"]\n    abstract = scores[\"abstraction\"]\n    algo = scores[\"algorithm_design\"]\n    empathy = scores[\"empathy_ethics\"]\n    \n    avg_score = sum(scores.values()) / len(scores)\n    \n    # Archetype evaluation logic\n    if empathy >= 8 and (decomp + algo) >= 14:\n        archetype = \"The Ethical Systems Architect\"\n        superpower = \"Balancing powerful technical algorithms with deep human moral compassion.\"\n    elif pattern >= 8 and abstract >= 8:\n        archetype = \"The Data Detective\"\n        superpower = \"Sifting through massive clutter to find the golden needle of truth.\"\n    elif decomp >= 8 and algo >= 8:\n        archetype = \"The Algorithmic Builder\"\n        superpower = \"Turning giant, chaotic challenges into clear, unstoppable step-by-step code.\"\n    else:\n        archetype = \"The Creative Tech Synthesizer\"\n        superpower = \"Connecting diverse ideas across disciplines to spark original innovations.\"\n        \n    print(\"=\" * 60)\n    print(f\"\ud83d\udcca SKILL RADAR PROFILE FOR: {user_name.upper()} \ud83d\udcca\")\n    print(\"=\" * 60)\n    for skill, val in scores.items():\n        bar = \"\u2593\" * val + \"\u2591\" * (10 - val)\n        print(f\"  {skill.replace('_', ' ').title():<22} : [{bar}] {val}/10\")\n        \n    print(\"-\" * 60)\n    print(f\"\u2728 UNLOCKED ARCHETYPE : {archetype.upper()} \u2728\")\n    print(f\"\ud83c\udf1f UNIQUE SUPERPOWER  : {superpower}\")\n    print(f\"\ud83d\udcc8 COMPOSITE SCORE    : {avg_score:.1f} / 10.0\")\n    print(\"=\" * 60)\n\n# ----------------- STUDENT EVALUATION TEST -----------------\nsample_student = {\n    \"name\": \"Zainab\",\n    \"scores\": {\n        \"decomposition\": 9,\n        \"pattern_recognition\": 7,\n        \"abstraction\": 8,\n        \"algorithm_design\": 9,\n        \"empathy_ethics\": 9\n    }\n}\n\nevaluate_skills(sample_student[\"name\"], sample_student[\"scores\"])",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-4-2-1",
                  "questionNumber": 1,
                  "questionText": "(The Four Pillars of Computational Thinking)\nWhen an architect draws a high-level floorplan of a building showing room dimensions and doorways, but omits the color of the curtains, the texture of the carpets, and the family photos on the wall, which pillar of computational thinki",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "Abstraction is the deliberate process of filtering out non-essential, superficial details to focus solely on the core functional characteristics required to solve the problem at hand.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-2-2",
                  "questionNumber": 2,
                  "questionText": "(Pattern Recognition in Computer Science)\nA security algorithm scans 100,000 login attempts. It detects that whenever an account experiences 5 incorrect password attempts from different IP addresses within 30 seconds followed by an attempt to reset the phone number, an unauthoriz",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Pattern Recognition involves discovering statistical regularities, repeating sequences, and structural similarities across large datasets to predict future events or detect anomalous behaviors.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-2-3",
                  "questionNumber": 3,
                  "questionText": "(Algorithmic Problem Solving)\nWhich of the following scenarios best demonstrates the concept of Decomposition?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Decomposition is the systematic dismantling of a complex, daunting endeavor into distinct, self-contained sub-units that can be independently planned, executed, and validated.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Algorithm Design)\nTwo students design algorithms to find a specific word in an alphabetical dictionary of 1,000 pages:\n- Student A's Algorithm: Start at Page 1, check every single word on each page sequentially until found.\n- Student B's Algorithm: Open th",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Student B implemented Binary Search ($\\log2(1000) \\approx 10$ steps). By using algorithmic design to halve the search space at each iteration, Student B solves the problem in roughly 10 operations, whereas Student A's linear search may require up to 1,000 page reads.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-4-2-5",
                  "questionNumber": 5,
                  "questionText": "(Human vs Artificial Strengths)\nWhy is the human skill of Empathy indispensable when building AI healthcare companions for elderly patients?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "AI models lack consciousness, lived emotional experience, and sentient awareness. Empathy is a deeply human capacity that guides ethical design, ensures vulnerable populations are treated with respect, and prevents technological solutions from feeling cold, alienating, or dehumanizing.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Discover Your Skills",
              "scenario": "An automated system in Discover Your Skills must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Developing Your Moral Compass as a Young Creator As you learn to build and direct AI tools: - With Great Power Comes Great Responsibility: Code written in your bedroom can affect millions of people across the planet via the internet. - The \"Grandmother Test\": Before deploying any AI script or automa",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class6-ch5",
        "chapterNumber": 5,
        "title": "AI Tools",
        "description": "AI Learning Lab & Create with AI",
        "icon": "Wrench",
        "lessons": [
          {
            "id": "class6-ch5-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 1,
            "lessonTitle": "AI Learning Lab",
            "syllabusReference": "GAIO-CLASS6-CH05-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Learning Lab Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Gesture-Bot Zero: The Space Station Airlock* > **Mission Briefing:** You are stationed inside the Deep-Space Orbital Research Lab! > Astronauts working in bulky space suits need to operate the airlock doors without taking off their thick pressurized gloves. A physical keypad is too dangerous to touch with frozen gloves. > Your mission is to build a **Gesture-Controlled AI Vision System**! You have a digital camera pointed at the airlock window. You must train an AI model inside the *AI Learning Lab* to recognize three distinct astronaut gestures: > 1. `Open Airlock` (Two thumbs up) > 2. `Lock Airlock` (Crossed arms in an X-shape) > 3. `Normal Neutral` (Hands at sides / empty background) > If your model confuses an accidental wave with an airlock command, or fails to recognize an astronaut because the space helmet reflects sunlight, disaster could strike!",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Learning Lab.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Learning Lab",
              "overview": "Key theoretical principles and architecture defining AI Learning Lab.",
              "blocks": [
                {
                  "title": "How Interactive AI Labs Work",
                  "summary": "Tools like Google Teachable Machine make machine learning accessible without needing a supercomputer. They achieve this using Transfer Learning:",
                  "keyPoints": [
                    "Core principle behind How Interactive AI Labs Work",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Key Machine Learning Training Parameters",
                  "summary": "| Parameter | Plain-Language Definition | Analogy | What Happens if Too Low / Too High? |\n| :--- | :--- | :--- | :--- |\n| Training Samples | The individual photos or audio recordings collected for each class. | Flashcards given to a student before an exam. | T",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Learning Lab Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Learning Lab.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Vision Model Trainer",
              "engineType": " Interactive Training Studio & Robustness Stress-Tester.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Vision Model Trainer.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Learning Lab Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 5 LESSON 1\n# SIMULATED NEURAL MODEL TRAINING LOOP & LOSS MONITOR\n# =====================================================================\n\ndef simulate_model_training(epochs, sample_count, initial_loss=0.95):\n    \"\"\"\n    Simulates training progress across multiple epochs.\n    Demonstrates how error (loss) decreases and accuracy increases.\n    \"\"\"\n    print(f\"Training Model with {sample_count} samples across {epochs} Epochs...\\n\")\n    print(f\"{'EPOCH':<8} | {'LOSS (ERROR)':<15} | {'TRAIN ACCURACY':<16} | {'STATUS'}\")\n    print(\"-\" * 55)\n    \n    current_loss = initial_loss\n    accuracy = 0.35  # Starts at random guessing (35%)\n    \n    for epoch in range(1, epochs + 1):\n        # Loss decays exponentially as model learns\n        loss_reduction = current_loss * 0.08\n        current_loss = max(current_loss - loss_reduction, 0.03)\n        accuracy = min(accuracy + (1.0 - accuracy) * 0.09, 0.99)\n        \n        # Display progress at key milestone epochs\n        if epoch in [1, 5, 10, 20, 35, 50]:\n            if current_loss > 0.50:\n                status = \"Learning basic edges\"\n            elif current_loss > 0.20:\n                status = \"Differentiating gestures\"\n            else:\n                status = \"Optimal convergence\"\n                \n            print(f\"{epoch:<8} | {current_loss:<15.4f} | {accuracy * 100:<15.1f}% | {status}\")\n            \n    print(\"-\" * 55)\n    print(\"\u2705 TRAINING COMPLETE! Neural weights saved to browser memory.\\n\")\n    return accuracy, current_loss\n\ndef test_inference(confidence_score, threshold=0.80):\n    \"\"\"\n    Evaluates whether a real-time prediction is confident enough to act.\n    \"\"\"\n    if confidence_score >= threshold:\n        return f\"EXECUTE COMMAND (Confidence: {confidence_score*100:.1f}% >= Threshold {threshold*100:.1f}%)\"\n    else:\n        return f\"HOLD STATE / RE-SCAN (Confidence: {confidence_score*100:.1f}% is too ambiguous!)\"\n\n# ----------------- RUN SIMULATION -----------------\nfinal_acc, final_loss = simulate_model_training(epochs=50, sample_count=120)\n\nprint(\"=== REAL-TIME AIRLOCK INFERENCE TESTS ===\")\ntest_runs = [0.94, 0.58, 0.88, 0.32]\nfor idx, conf in enumerate(test_runs, 1):\n    result = test_inference(conf, threshold=0.80)\n    print(f\"Test Sensor Run #{idx}: {result}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-5-1-1",
                  "questionNumber": 1,
                  "questionText": "(Machine Learning Training Concepts)\nIn an interactive machine learning lab, what does the term \"Epoch\" mean?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An Epoch is a fundamental hyperparameter in machine learning. It indicates that every single sample in the training dataset has had a chance to pass forward through the model and update the internal neural weights once.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-1-2",
                  "questionNumber": 2,
                  "questionText": "(Model Evaluation & Error Metrics)\nDuring the training of a gesture recognition model, the engineer monitors the Loss curve on the dashboard. What does a steadily decreasing loss value over time indicate?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Loss is a mathematical calculation of prediction error (the difference between the model's guesses and the ground-truth labels). As training succeeds, optimization algorithms minimize this loss, driving it closer to zero as classification accuracy rises.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-1-3",
                  "questionNumber": 3,
                  "questionText": "(Overfitting & Generalization Failure)\nA student trains an AI model to detect whether a book is open or closed using 100 webcam photos. Every single photo was taken in a dark room with the student wearing green headphones. When tested in a sunlit classroom without headphones, the",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Overfitting occurs when a model learns the specific, irrelevant noise and idiosyncrasies of its training environment (such as room lighting or headphones) rather than the generalizable features of the target object.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-1-4",
                  "questionNumber": 4,
                  "questionText": "(Confidence Threshold Calibration)\nAn autonomous medical robot uses an AI vision model to verify whether a syringe contains the correct medication. The model returns: Antibiotic \u2014 54% Confidence and Painkiller \u2014 46% Confidence. What should the robot's control system do?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In safety-critical applications, a narrow plurality (54% vs 46%) represents extreme statistical ambiguity. High-stakes systems must enforce strict Confidence Thresholds (often >98%); any reading below the threshold must trigger a safe lockout and human intervention.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-1-5",
                  "questionNumber": 5,
                  "questionText": "(Audio Model Noise Calibration)\nWhen training an AI sound classification model to detect a fire alarm buzzer in a noisy school hallway, why is it essential to record a class labeled \"Ambient Hallway Noise\" that includes children chatting, footsteps, and slamming lockers?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In audio machine learning, defining an Ambient / Negative Class is critical. Without background audio training, any loud acoustic transient (such as a dropped metal binder or slamming door) could be misclassified as a fire alarm frequency spike.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Learning Lab",
              "scenario": "An automated system in AI Learning Lab must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Environmental Impact of Training AI Models While Teachable Machine uses lightweight transfer learning: - Carbon Footprint of Massive AI: Training gigantic frontier neural networks with billions of parameters requires thousands of specialized GPU chips running in data centers for months, consuming en",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch5-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 2,
            "lessonTitle": "Create with AI",
            "syllabusReference": "GAIO-CLASS6-CH05-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Create with AI Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Mythic Bestiary: The Galactic Lore Keeper* > **Mission Briefing:** Welcome to the Galactic Archives of Sector 7! > The Interstellar Federation is compiling a comprehensive visual encyclopedia of mythical extraterrestrial creatures discovered across uncharted solar systems. > You have been granted access to *Genesis-AI*\u2014a state-of-the-art multimodal generative AI studio capable of drafting creature lore, translating ancient planetary languages, and synthesizing concept artwork. > However, Genesis-AI is dangerously literal! If you ask it to *\"Draw a cool alien\"*, it produces a generic green blob with three eyes. If you ask it for historical facts, it occasionally invents completely fictitious planets with total confidence! > Your mission is to become a **Master Prompt Alchemist**! You must craft precise, structured, constraint-guided prompts to generate accurate, breathtaking mythological creature profiles without triggering hallucinations or copyright violations. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Create with AI.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Create with AI",
              "overview": "Key theoretical principles and architecture defining Create with AI.",
              "blocks": [
                {
                  "title": "Discriminative AI vs Generative AI",
                  "summary": "Until recently, most AI systems were Discriminative (they analyzed existing data to sort or predict). The modern revolution is Generative AI (systems that produce new, original content):",
                  "keyPoints": [
                    "Core principle behind Discriminative AI vs Generative AI",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The 5-Element Professional Prompt Framework",
                  "summary": "Vague prompts yield mediocre, generic results. High-performance AI developers structure prompts using the R-T-C-C-O Framework:",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Create with AI Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Create with AI.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Prompt Alchemist",
              "engineType": " Iterative Constraint Optimization & Target Generation Arena.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Prompt Alchemist.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Create with AI Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 5 LESSON 2\n# AUTOMATED PROMPT ASSEMBLER & CONSTRAINT AUDITOR\n# =====================================================================\n\ndef assemble_prompt(role, task, context, constraints, output_format):\n    \"\"\"\n    Assembles a high-performance structured prompt using the R-T-C-C-O framework.\n    \"\"\"\n    prompt_blueprint = (\n        f\"### SYSTEM ROLE: {role}\\n\\n\"\n        f\"### PRIMARY TASK: {task}\\n\\n\"\n        f\"### CONTEXT & BACKGROUND: {context}\\n\\n\"\n        f\"### STRICT NEGATIVE CONSTRAINTS:\\n\"\n    )\n    for c in constraints:\n        prompt_blueprint += f\"- {c}\\n\"\n        \n    prompt_blueprint += f\"\\n### REQUIRED OUTPUT FORMAT:\\n{output_format}\\n\"\n    return prompt_blueprint\n\ndef audit_generated_output(output_text, forbidden_terms, max_words=120):\n    \"\"\"\n    Audits generated AI output against safety and length constraints.\n    \"\"\"\n    words = output_text.split()\n    word_count = len(words)\n    violations = []\n    \n    # Check forbidden / hallucinated terms\n    for term in forbidden_terms:\n        if term.lower() in output_text.lower():\n            violations.append(f\"Forbidden term detected: '{term}'\")\n            \n    # Check length\n    if word_count > max_words:\n        violations.append(f\"Exceeded max word count ({word_count} > {max_words})\")\n        \n    passed = len(violations) == 0\n    return passed, word_count, violations\n\n# ----------------- PROMPT ALCHEMY EXECUTION -----------------\nsystem_prompt = assemble_prompt(\n    role=\"Galactic Astrobiologist at the Interstellar Science Academy\",\n    task=\"Write a factual field profile of the Gliese-667 Ice Whale\",\n    context=\"Gliese-667 is a super-Earth with frozen ammonia seas. The whale filters micro-crystals.\",\n    constraints=[\n        \"Do not mention Earth animals like 'dolphins' or 'bears'\",\n        \"Do not include any violent predation scenes\",\n        \"Keep the tone scientific and wonder-filled\",\n        \"If scientific evidence is missing, state it is a hypothetical model\"\n    ],\n    output_format=\"Provide 3 labeled sections: Classification, Biology, and Planetary Diet.\"\n)\n\nprint(\"=== ASSEMBLED STRUCTURED MASTER PROMPT ===\")\nprint(system_prompt)\n\n# Simulated AI response\nsimulated_ai_response = (\n    \"Classification: Xenocete Ammonia-3. \"\n    \"Biology: Possesses thick silicone-blubber insulation to survive -110\u00b0C seas. \"\n    \"Planetary Diet: Ingests suspended ammonium ice crystals through porous baleen plates.\"\n)\n\nis_safe, count, errors = audit_generated_output(\n    simulated_ai_response, \n    forbidden_terms=[\"dolphin\", \"bear\", \"violent\"], \n    max_words=60\n)\n\nprint(\"-\" * 50)\nprint(f\"Audit Status: {'\u2705 PASSED' if is_safe else '\u274c FAILED'}\")\nprint(f\"Word Count: {count} words\")\nif not is_safe:\n    print(f\"Violations: {errors}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-5-2-1",
                  "questionNumber": 1,
                  "questionText": "(AI Architectural Distinctions)\nWhat is the fundamental difference between a Discriminative AI model and a Generative AI model?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Discriminative models model conditional probability $P(Y|X)$ to determine boundaries between categories (e.g., \"Is this spam or not spam?\"). Generative models model the underlying data distribution $P(X)$ to synthesize novel instances resembling the training data.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-2-2",
                  "questionNumber": 2,
                  "questionText": "(Prompt Engineering Methodology)\nIn prompt engineering, what is the primary function of specifying Negative Constraints (e.g., \"Do NOT include cartoon outlines, no blurry textures, avoid words like 'furthermore'\")?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Language and diffusion models select paths through high-dimensional probability space. Explicit negative constraints prune unwanted probabilistic branches, forcing the model away from overused tropes, blurry artifacts, or forbidden vocabulary.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-2-3",
                  "questionNumber": 3,
                  "questionText": "(Cognitive Failures: Hallucination Mechanics)\nWhy do Large Language Models (LLMs) experience Hallucinations (confidently stating fictitious \"facts\" that never happened)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "LLMs do not possess an internal conceptual encyclopedia of ground truth. They predict the most statistically probable sequence of words following the user's prompt. If a fabricated answer sounds linguistically convincing, the model generates it with total syntactic confidence.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Iterative Refinement)\nAn artist prompts an image generator: \"A futuristic flying car in a city.\" The AI outputs an old 1970s sedan with cartoon bird wings glued to its doors in an empty cartoon meadow. How should the artist refine the prompt to achieve a s",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Generative models require descriptive, multi-attribute prompts with precise contextual framing and negative constraints. Iterative refinement using structured prompt frameworks eliminates ambiguities and steers the latent space toward the artist's exact aesthetic vision.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-5-2-5",
                  "questionNumber": 5,
                  "questionText": "(Ethical Evaluation & Intellectual Property)\nIf an individual prompts a Generative AI tool: \"Write an entire school essay about the French Revolution in the style of Charles Dickens,\" and submits it to their teacher under their own name without citation or attribution, what ethic",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Claiming AI-generated text or art as one's own original human creation constitutes academic dishonesty (plagiarism). While AI can serve as a powerful research tutor, brainstormer, or editing assistant, ethical creators must always disclose and credit AI assistance transparently.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Create with AI",
              "scenario": "An automated system in Create with AI must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Copyright and Artist Dignity Debate Generative AI models are trained on billions of public artwork images and books created by human artists, illustrators, and writers over centuries: - Respecting Human Artists: Many artists feel their unique styles were scraped into AI models without their perm",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class6-ch6",
        "chapterNumber": 6,
        "title": "Responsible AI",
        "description": "Protect Your Data & Think Before You Trust",
        "icon": "ShieldAlert",
        "lessons": [
          {
            "id": "class6-ch6-l1",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 1,
            "lessonTitle": "Protect Your Data",
            "syllabusReference": "GAIO-CLASS6-CH06-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Protect Your Data Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Black-Box Defense: The Data Vault* > **Mission Briefing:** Alert at Neo-Olympia Middle School! > A trendy new viral smartphone mobile game called *\"Mega-Pet Virtual World\"* has swept through the school. To unlock a free sparkling pet costume, the app asks students to click *\"Accept All Permissions\"*. > Hidden inside the app's fine print, predatory AI data brokers are harvesting every student\u2019s live GPS location, reading their private contact lists, listening through background microphones, and selling the data to ad networks to target them with psychological marketing! > You have been designated the school\u2019s **Chief Cybersecurity Guardian**! Your mission is to deploy the **Cyber Privacy Shield**, audit the school\u2019s digital devices, identify unauthorized data leaks, revoke predatory permissions, and sanitize personal student databases before confidential information is permanently compromised! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Protect Your Data.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Protect Your Data",
              "overview": "Key theoretical principles and architecture defining Protect Your Data.",
              "blocks": [
                {
                  "title": "What is Personally Identifiable Information (PII)?",
                  "summary": "PII refers to any piece of data that can be used\u2014alone or in combination with other data\u2014to identify, contact, or locate a specific individual in the real world:",
                  "keyPoints": [
                    "Core principle behind What is Personally Identifiable Information (PII)?",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Why Do Tech Companies Want Your Data?",
                  "summary": "When a mobile app or AI chatbot is completely \"free\", remember the golden rule of the digital internet:\n> \"If you are not paying for the product, YOU (and your personal data) are the product!\"",
                  "keyPoints": [
                    "**AI Behavioral Profiling:** Every video you watch, link you click, and word you type is processed by machine learning r",
                    "**Targeted Micro-Advertising:** Advertisers pay billions of dollars to show custom ads to teenagers at the exact moment ",
                    "**Training Next-Gen Models:** Many free chatbots use your private conversation logs, homework drafts, and uploaded famil"
                  ]
                },
                {
                  "title": "App Permission Auditing: Necessary vs Predatory",
                  "summary": "| Mobile App Type | Legitimate Necessary Permission | Suspicious / Predatory Permission |\n| :--- | :--- | :--- |\n| Navigation & Maps | GPS Fine Location (to calculate driving directions). | Reading entire private SMS text message inbox. |\n| Video Chat App | Fr",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Protect Your Data Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Protect Your Data.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Cyber Privacy Shield",
              "engineType": " App Security Audit & Permission Defense Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Cyber Privacy Shield.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Protect Your Data Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 6 LESSON 1\n# CYBER PRIVACY SHIELD: AUTOMATED PII DETECTION & MASKING ENGINE\n# =====================================================================\n\nimport re\n\ndef sanitize_student_data(raw_text):\n    \"\"\"\n    Scans incoming text for sensitive PII patterns and replaces them with\n    secure redaction tokens before processing by public AI models.\n    \"\"\"\n    sanitized = raw_text\n    redactions_made = []\n    \n    # 1. Detect and mask Email Addresses\n    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+'\n    emails_found = re.findall(email_pattern, sanitized)\n    if emails_found:\n        for email in emails_found:\n            sanitized = sanitized.replace(email, \"[REDACTED_EMAIL]\")\n            redactions_made.append(f\"Email masked: {email}\")\n            \n    # 2. Detect and mask Phone Numbers (e.g., +91-9876543210 or 10-digit numbers)\n    phone_pattern = r'(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}'\n    phones_found = re.findall(phone_pattern, sanitized)\n    # Match full phone number string\n    full_phones = [m.group() for m in re.finditer(r'(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', raw_text)]\n    for phone in full_phones:\n        sanitized = sanitized.replace(phone, \"[REDACTED_PHONE]\")\n        redactions_made.append(f\"Phone number masked: {phone}\")\n        \n    # 3. Detect and mask Student ID / Social Security formats (e.g., STU-94821)\n    id_pattern = r'STU-\\d{5}'\n    ids_found = re.findall(id_pattern, sanitized)\n    for s_id in ids_found:\n        sanitized = sanitized.replace(s_id, \"[REDACTED_STUDENT_ID]\")\n        redactions_made.append(f\"Student ID masked: {s_id}\")\n\n    return sanitized, redactions_made\n\n# ----------------- SIMULATED UNGUARDED STUDENT SUBMISSION -----------------\nincoming_student_prompt = (\n    \"Hi AI tutor! My name is Rohan Sharma, student ID STU-55421. \"\n    \"Please check my science homework. If you have questions, email my mother at \"\n    \"priya.sharma@domain.com or call our home at 555-839-2041. We live near 4th Avenue.\"\n)\n\nprint(\"=== CYBER PRIVACY SHIELD SANITIZATION AUDIT ===\\n\")\nprint(\"Original Raw Prompt with Leaked PII:\")\nprint(f\"'{incoming_student_prompt}'\\n\")\n\nclean_prompt, audit_log = sanitize_student_data(incoming_student_prompt)\n\nprint(\"Protected Output Ready for AI Cloud Model:\")\nprint(f\"'{clean_prompt}'\\n\")\n\nprint(\"Security Audit Actions Taken:\")\nfor action in audit_log:\n    print(f\"  \ud83d\udee1\ufe0f {action}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-6-1-1",
                  "questionNumber": 1,
                  "questionText": "(Data Privacy Core Definitions)\nWhich of the following items of data is classified as Sensitive Personally Identifiable Information (PII) that should never be shared with an untrusted online chatbot?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "A",
                  "explanation": "Sensitive PII includes personal information that uniquely identifies a physical person and poses significant safety, identity theft, or physical security risks if compromised\u2014such as home addresses, passwords, social security numbers, and biometric records.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-1-2",
                  "questionNumber": 2,
                  "questionText": "(Mobile Security & App Permissions)\nA free offline wallpaper app requests access to: Microphone, Phone Call Logs, and Fine GPS Location. The developer explains in small print that this allows them to \"deliver personalized wallpaper colors\". What is the most accurate cybersecurity",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An offline image display app has zero legitimate technical requirement to access audio microphones, private call logs, or real-time GPS coordinates. This is a classic indicator of malicious surveillance or data-harvesting spyware.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-1-3",
                  "questionNumber": 3,
                  "questionText": "(Economic Business Models of Tech)\nWhat does the economic axiom \"If the service is free, you are the product\" imply in the context of modern AI web platforms?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Operating high-speed AI servers costs millions of dollars in electricity and hardware. When platforms offer these services for free without subscription fees, their primary revenue model frequently involves harvesting, aggregating, and monetizing user behavioral profiles and training data.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Password Security & AI Cracking)\nA user creates a password: Password123!. A hacker uses an AI-powered dictionary attack tool that tests 50 billion combinations per second. Why will this password be cracked in less than 0.1 seconds?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Machine learning cracking tools are trained on billions of leaked passwords. They prioritize the most statistically prevalent human habits: dictionary words, simple letter substitutions (e.g., P@ssword), and sequential digits (123). Robust security requires long, random passphrases (e.g., purple-galaxy-dolphin-tractor).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-1-5",
                  "questionNumber": 5,
                  "questionText": "(Data Rights & Legal Compliance)\nWhat legal right gives citizens the power to request that an online platform permanently erase all their stored personal profile data, conversation histories, and uploaded photos from corporate databases?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Modern data protection frameworks (such as Europe's GDPR and India's DPDP Act) grant users sovereign control over their data, including the Right to Erasure (often called the Right to be Forgotten), legally obligating companies to purge personal records upon request.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Protect Your Data",
              "scenario": "An automated system in Protect Your Data must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 1: Protect Your Data Syllabus Reference: Class 6, Chapter 6 (Responsible AI) \u2014 Lesson 1: Protect Your Data Target Age Group: 11\u201312 Years (Middle Level Foundation) Estimated Duration: 45\u201360 Minutes",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class6-ch6-l2",
            "classKey": "class6",
            "classTitle": "Class 6",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 2,
            "lessonTitle": "Think Before You Trust",
            "syllabusReference": "GAIO-CLASS6-CH06-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Think Before You Trust Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Veracity: The Viral Panic Incident* > **Mission Briefing:** High Alert at the Global News Verification Network! > Overnight, a terrifying video accompanied by a breaking news article went viral across social media platforms, gaining 15 million views in under three hours! > The headline proclaims: *\"BREAKING: Giant 10-meter Flying Carnivorous Squid Discovered in the Indian Ocean! Coastal Beaches Evacuating!\"* > The video shows a hyper-realistic, horrifying sea monster hovering over fishing boats, and the article includes quotes supposedly from a \"Lead Oceanographer at the Global Maritime Institute\". Coastal towns are beginning to panic! > You have been dispatched as the **Chief Digital Forensics Investigator** at the *Truth Detective Agency*! Your mission is to pause the viral hysteria, apply digital forensic tools, trace the sources, examine metadata and visual artifacts, and prove whether this viral alert is an authentic biological discovery or a dangerous AI-generated hoax! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Think Before You Trust.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Think Before You Trust",
              "overview": "Key theoretical principles and architecture defining Think Before You Trust.",
              "blocks": [
                {
                  "title": "What is Authority Bias?",
                  "summary": "When a human classmate tells you a wild story, your brain naturally asks: \"Are you joking?\" But when a sleek, polished AI chatbot or high-definition digital screen outputs text in flawless, authoritative English, humans fall into Authority Bias:",
                  "keyPoints": [
                    "Core principle behind What is Authority Bias?",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Four Types of Deceptive Online Media",
                  "summary": "| Category | Technical Mechanism | Real-World Danger |\n| :--- | :--- | :--- |\n| AI Hallucination | Language models generating non-existent books, citations, or historical dates due to probabilistic word prediction. | Students submitting fictional scientific ci",
                  "keyPoints": [
                    "Core principle behind The Four Types of Deceptive Online Media",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The SIFT Fact-Checking Framework",
                  "summary": "Developed by digital media literacy scholars, the SIFT Framework is the gold standard for navigating the modern AI internet:",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Think Before You Trust Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Think Before You Trust.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Truth Detective Agency",
              "engineType": " Digital Forensic Investigation & Evidence Triangulation Room.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Truth Detective Agency.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Think Before You Trust Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 6: CHAPTER 6 LESSON 2\n# TRUTH DETECTIVE AGENCY: CLAIM CREDIBILITY & TRIANGULATION ENGINE\n# =====================================================================\n\ndef evaluate_claim_credibility(claim_profile):\n    \"\"\"\n    Evaluates an internet news claim based on forensic verification criteria:\n    - primary_source_cited: Does the claim link to an official report/paper?\n    - independent_outlets_confirming: How many accredited news/scientific agencies verify it?\n    - contains_sensationalist_clickbait: Does it use SHOUTING CAPS or fearmongering?\n    - has_forensic_ai_artifacts: Did image/audio forensic scans flag synthetic generation?\n    \"\"\"\n    credibility_score = 50  # Start at neutral baseline (50/100)\n    audit_notes = []\n    \n    # 1. Primary Source Check\n    if claim_profile[\"primary_source_cited\"]:\n        credibility_score += 25\n        audit_notes.append(\"\u2705 Positive: Cites primary peer-reviewed source or official government agency.\")\n    else:\n        credibility_score -= 20\n        audit_notes.append(\"\u274c Red Flag: No verifiable primary source or named author provided.\")\n        \n    # 2. Independent Confirmation Triangulation\n    confirmations = claim_profile[\"independent_outlets_confirming\"]\n    if confirmations >= 3:\n        credibility_score += 25\n        audit_notes.append(f\"\u2705 Positive: Confirmed by {confirmations} independent reputable news organizations.\")\n    elif confirmations == 0:\n        credibility_score -= 30\n        audit_notes.append(\"\ud83d\udea8 Critical Warning: Zero independent confirmations found anywhere on the internet!\")\n        \n    # 3. Sensationalist Clickbait Check\n    if claim_profile[\"contains_sensationalist_clickbait\"]:\n        credibility_score -= 15\n        audit_notes.append(\"\u26a0\ufe0f Suspicious: Headline uses sensationalist emotional clickbait language.\")\n        \n    # 4. Forensic AI Scan\n    if claim_profile[\"has_forensic_ai_artifacts\"]:\n        credibility_score -= 40\n        audit_notes.append(\"\ud83d\udea8 FORENSIC ALERT: Visual/Audio analysis reveals synthetic AI neural artifacts!\")\n        \n    # Clamp score between 0 and 100\n    final_score = max(0, min(100, credibility_score))\n    \n    # Determine final verdict\n    if final_score >= 80:\n        verdict = \"VERIFIED FACTUAL REPORT\"\n    elif final_score >= 45:\n        verdict = \"UNVERIFIED / PROCEED WITH CAUTION\"\n    else:\n        verdict = \"FABRICATED HOAX / SYNTHETIC DISINFORMATION\"\n        \n    return final_score, verdict, audit_notes\n\n# ----------------- TEST VIRAL CLAIMS -----------------\ntest_claim_1 = {\n    \"headline\": \"Giant 10-meter Flying Squid Terrifies Coastal Beaches!\",\n    \"primary_source_cited\": False,\n    \"independent_outlets_confirming\": 0,\n    \"contains_sensationalist_clickbait\": True,\n    \"has_forensic_ai_artifacts\": True\n}\n\ntest_claim_2 = {\n    \"headline\": \"James Webb Space Telescope Detects Water Vapor in Exoplanet Atmosphere\",\n    \"primary_source_cited\": True,\n    \"independent_outlets_confirming\": 4,\n    \"contains_sensationalist_clickbait\": False,\n    \"has_forensic_ai_artifacts\": False\n}\n\nprint(\"=== TRUTH DETECTIVE AGENCY CLAIM EVALUATION ===\")\nfor idx, claim in enumerate([test_claim_1, test_claim_2], 1):\n    print(f\"\\n[Case #{idx}] Headline: \\\"{claim['headline']}\\\"\")\n    score, verdict, notes = evaluate_claim_credibility(claim)\n    print(f\"Credibility Score: {score}/100 \u2794 Verdict: {verdict}\")\n    for n in notes:\n        print(f\"  {n}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class6-6-2-1",
                  "questionNumber": 1,
                  "questionText": "(Media Literacy Frameworks)\nIn the digital media literacy SIFT framework, what does the first letter \"S\" stand for, and what immediate action does it require when encountering sensationalist viral news?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In the SIFT method developed by Mike Caulfield, S stands for STOP. Viral algorithms thrive on emotional impulsivity (fear, outrage, shock). The critical first step is to pause, resist the reflex to hit the \"Share\" button, and initiate a deliberate fact-checking evaluation.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-2-2",
                  "questionNumber": 2,
                  "questionText": "(Cognitive Psychology in Tech)\nWhy is Authority Bias particularly dangerous when interacting with Large Language Model chatbots?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Humans are biologically primed to trust individuals who speak with calm, eloquent authority. Because AI models produce syntactically flawless prose, users frequently lower their critical defenses, failing to notice when the underlying factual assertions are completely hallucinated.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-2-3",
                  "questionNumber": 3,
                  "questionText": "(Information Triangulation)\nWhat does it mean to Triangulate information on the internet?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In investigative journalism and intelligence analysis, Triangulation means confirming that an assertion is independently verified by multiple uncorrelated, reputable sources rather than simply repeated by thousands of social media bots copying the same unverified rumor.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Audio Forensics)\nA student receives an audio message on a messaging app that sounds like their teacher's voice saying: \"Class is cancelled today, and everyone has failed their exam.\" The student suspects it is an AI voice clone. Which of the following fore",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "High-stakes claims must always be verified through Out-of-Band Channels (contacting the school office directly via official numbers). Furthermore, synthetic voice clones often exhibit acoustic artifacts: unnatural monotonic pitch cadence, metallic compression artifacts, and the complete absence of biological breathing.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class6-6-2-5",
                  "questionNumber": 5,
                  "questionText": "(Societal Consequences of Disinformation)\nWhat is the most severe societal consequence of pervasive, unchecked AI-generated misinformation and deepfakes?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The gravest danger of synthetic media is what philosophers term the \"Liar's Dividend\" and the erosion of shared epistemic truth: when deepfakes are everywhere, bad actors can dismiss real crimes as \"just a deepfake\", while ordinary citizens lose faith in all objective journalism, science, and democratic institutions.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Think Before You Trust",
              "scenario": "An automated system in Think Before You Trust must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 2: Think Before You Trust Syllabus Reference: Class 6, Chapter 6 (Responsible AI) \u2014 Lesson 2: Think Before You Trust Target Age Group: 11\u201312 Years (Middle Level Foundation) Estimated Duration: 45\u201360 Minutes",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "classKey": "class7",
    "className": "Class 7",
    "ageGroup": "Grade 7 \u2022 Ages 12\u201313",
    "subtitle": "Intermediate Data Structures, Python Sandbox & Algorithmic Fairness",
    "accentColor": "#a855f7",
    "chapters": [
      {
        "id": "class7-ch1",
        "chapterNumber": 1,
        "title": "AI Basics",
        "description": "AI Learns from Data & Patterns Make It Smart",
        "icon": "Database",
        "lessons": [
          {
            "id": "class7-ch1-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 1,
            "lessonTitle": "AI Learns from Data",
            "syllabusReference": "GAIO-CLASS7-CH01-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Learns from Data Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Data Heist: The Metropolitan Museum Archives* > **Mission Briefing:** Emergency at the Metropolitan Heritage Museum! > Over the weekend, a server malfunction corrupted the museum's centuries-old antiquities database. The museum's AI search engine, which helps archaeologists identify stolen historical artifacts, has gone haywire! > Historical records now contain missing dates, negative artifact weights, duplicated entries, and mislabeled pottery shards. A shipment of priceless Roman coins is arriving at international customs in two hours, and the automated verification model cannot function with dirty data! > You have been recruited as the Lead **Data Detective**! Your mission is to enter the raw data stream, filter the noise, reconstruct missing values, excise anomalous outliers, and restore data integrity so the AI classifier can identify the genuine artifacts. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Learns from Data.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Learns from Data",
              "overview": "Key theoretical principles and architecture defining AI Learns from Data.",
              "blocks": [
                {
                  "title": "Data: The Fuel of Modern Artificial Intelligence",
                  "summary": "Without data, an AI algorithm is like a high-performance jet engine with an empty fuel tank\u2014completely motionless:",
                  "keyPoints": [
                    "Core principle behind Data: The Fuel of Modern Artificial Intelligence",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Anatomical Structure of a Machine Learning Dataset",
                  "summary": "When an AI examines a dataset, it splits the table into two fundamental components:",
                  "keyPoints": [
                    "Core principle behind Anatomical Structure of a Machine Learning Dataset",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Three Paradigms of Machine Learning",
                  "summary": "| Paradigm | How the AI Learns | Real-World Analogy | Everyday Application |\n| :--- | :--- | :--- | :--- |\n| Supervised Learning | Learns from labeled examples: given inputs ($X$) with correct answers ($y$). | A student studying for a test with textbook flashc",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Learns from Data Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Learns from Data.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Corrupt Dataset Heist",
              "engineType": " Data Cleaning Pipeline & Feature Engineering Puzzle.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Corrupt Dataset Heist.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Learns from Data Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 1 LESSON 1\n# DATA ENGINEERING: AUTOMATED CLEANING & IMPUTATION PIPELINE\n# =====================================================================\n\ndef clean_antiquity_dataset(raw_records):\n    \"\"\"\n    Cleans raw museum artifact telemetry:\n    1. Removes duplicate records.\n    2. Identifies and removes impossible outliers (negative weights or weights > 5000g).\n    3. Imputes missing weight values with the median of valid records.\n    4. Normalizes text labels into clean uppercase standard format.\n    \"\"\"\n    print(f\"Initial raw records received: {len(raw_records)}\")\n    \n    # Step 1: Remove exact duplicates\n    unique_records = []\n    seen_ids = set()\n    for row in raw_records:\n        if row[\"id\"] not in seen_ids:\n            seen_ids.add(row[\"id\"])\n            unique_records.append(row)\n    print(f\"After deduplication: {len(unique_records)} records remaining.\")\n    \n    # Step 2: Extract valid weights to calculate median\n    valid_weights = [\n        r[\"weight_g\"] for r in unique_records \n        if r[\"weight_g\"] is not None and 0 < r[\"weight_g\"] <= 5000\n    ]\n    valid_weights.sort()\n    median_weight = valid_weights[len(valid_weights) // 2]\n    print(f\"Calculated replacement median weight: {median_weight:.1f} g\")\n    \n    # Step 3: Clean and normalize records\n    cleaned_dataset = []\n    for row in unique_records:\n        weight = row[\"weight_g\"]\n        \n        # Outlier rejection / Imputation\n        if weight is None or weight <= 0 or weight > 5000:\n            assigned_weight = median_weight\n            status = \"IMPUTED\"\n        else:\n            assigned_weight = weight\n            status = \"ORIGINAL\"\n            \n        # Label normalization (e.g., 'roman', 'Ancient Rome' -> 'ROMAN')\n        origin = row[\"origin\"].strip().upper()\n        if \"ROM\" in origin:\n            clean_origin = \"ROMAN\"\n        elif \"GREEK\" in origin:\n            clean_origin = \"GREEK\"\n        else:\n            clean_origin = \"UNKNOWN\"\n            \n        cleaned_dataset.append({\n            \"id\": row[\"id\"],\n            \"weight_g\": round(assigned_weight, 1),\n            \"origin\": clean_origin,\n            \"status\": status\n        })\n        \n    return cleaned_dataset\n\n# ----------------- SIMULATED CORRUPTED DATABASE -----------------\ncorrupted_artifacts = [\n    {\"id\": \"ART-01\", \"weight_g\": 340.5, \"origin\": \"Roman\"},\n    {\"id\": \"ART-02\", \"weight_g\": None,  \"origin\": \"ancient roman\"},   # Missing value\n    {\"id\": \"ART-03\", \"weight_g\": -95.0, \"origin\": \"Greek\"},           # Negative outlier\n    {\"id\": \"ART-01\", \"weight_g\": 340.5, \"origin\": \"Roman\"},           # Duplicate!\n    {\"id\": \"ART-04\", \"weight_g\": 380.0, \"origin\": \"ROMAN\"},\n    {\"id\": \"ART-05\", \"weight_g\": 85000.0, \"origin\": \"greek\"},         # Massive outlier\n    {\"id\": \"ART-06\", \"weight_g\": 310.2, \"origin\": \"GREEK\"}\n]\n\nprint(\"=== RAW DATABASE INGESTION ===\")\ncleaned_results = clean_antiquity_dataset(corrupted_artifacts)\n\nprint(\"\\n=== FINAL CLEANED & NORMALIZED DATASET ===\")\nprint(f\"{'ID':<8} | {'WEIGHT (g)':<12} | {'ORIGIN':<10} | {'DATA STATUS'}\")\nprint(\"-\" * 45)\nfor item in cleaned_results:\n    print(f\"{item['id']:<8} | {item['weight_g']:<12.1f} | {item['origin']:<10} | {item['status']}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-1-1-1",
                  "questionNumber": 1,
                  "questionText": "(Data Types & Ingestion)\nWhich of the following datasets is classified as Unstructured Data?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Unstructured Data lacks a predefined tabular data model or schema. Raw multimedia files such as audio streams, photographs, and unformatted PDF books cannot be stored directly in traditional relational table columns without extensive computational feature extraction.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-1-2",
                  "questionNumber": 2,
                  "questionText": "(Machine Learning Paradigms)\nA video game development team trains an AI non-player character (NPC) to navigate an obstacle course. The NPC is not shown any recorded gameplay; instead, it receives +10 points for jumping over a pit and -50 points for colliding with a wall. Over 50,",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Reinforcement Learning (RL) is governed by an Agent-Environment loop where learning occurs through trial-and-error driven by scalar Rewards and Penalties. The agent seeks to discover an optimal policy that maximizes cumulative long-term reward.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-1-3",
                  "questionNumber": 3,
                  "questionText": "(Data Hygiene & Preprocessing)\nIn a dataset designed to predict housing market prices, one entry lists a house with NumberofBedrooms = -4 and SquareFootage = 99999999. What are these entries called, and how must a data scientist treat them?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Negative bedrooms and impossible square footages are extreme measurement outliers / invalid data entries. Feeding impossible physical quantities into statistical machine learning algorithms skews gradient descent optimization and corrupts the learned weight parameters.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Imputation vs Deletion)\nA clinical research dataset tracking a rare medical condition contains only 45 patient records in total worldwide. One patient record is missing the blood pressure measurement, but contains all other 30 vital parameters. Should the ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "When working with data-scarce regimes (such as rare diseases), every individual sample represents immense clinical value. Dropping a row removes all 30 other verified features. Imputation (using the median, mean, or nearest-neighbor interpolation) preserves the remaining signal while minimizing statistical distortion.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-1-5",
                  "questionNumber": 5,
                  "questionText": "(Feature vs Label Distinctions)\nIn a bank's automated loan approval dataset, what role does the applicant's AnnualIncome play, and what role does LoanApproved (Yes/No) play?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In supervised learning, the observable characteristics, predictors, and independent variables ($X$) describing the subject are called Features (e.g., Annual Income, Credit Score, Debt). The final dependent outcome or decision ($y$) the model is trained to predict is the Target Label.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Learns from Data",
              "scenario": "An automated system in AI Learns from Data must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Historical Bias Encoded in Datasets Data is a mirror reflecting human society's past: - The Past is Not Always Just: If an AI model is trained on historical corporate hiring records from the 1970s when women were rarely hired as airline pilots or company executives, the AI will learn that \"being mal",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch1-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 2,
            "lessonTitle": "Patterns Make It Smart",
            "syllabusReference": "GAIO-CLASS7-CH01-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Patterns Make It Smart Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Project Pixel-Vault: Decoding the Satellite Stream* > **Mission Briefing:** Deep-Space Satellite *Helios-9* has sent an emergency transmission from the dark side of Mars! > The satellite's optical compression antenna was hit by solar radiation, stripping away all color display rendering. What arrived at Mission Control is not a visible picture, but a raw, encrypted **Matrix of Numbers**! > Somewhere hidden inside this grid of integers is the outline of a historic lost landing craft. Human eyes looking at the raw numbers see only an overwhelming grid of digits: `255, 240, 12, 0, 5...` > As Mission Control\u2019s Lead Computer Vision Cryptanalyst, you must write the mathematical algorithms that transform this raw numerical grid into edge patterns, reconstruct the visual boundaries, and reveal the craft's coordinates! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Patterns Make It Smart.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Patterns Make It Smart",
              "overview": "Key theoretical principles and architecture defining Patterns Make It Smart.",
              "blocks": [
                {
                  "title": "How Computers \"See\": The Pixel Matrix",
                  "summary": "To a human, a photograph is a painting of light and emotion. To a computer, a photograph is strictly a 2D Matrix of Numbers:",
                  "keyPoints": [
                    "Core principle behind How Computers \"See\": The Pixel Matrix",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Grayscale vs Full RGB Color",
                  "summary": "- Grayscale (1 Channel): Each pixel is represented by a single integer between 0 (pitch black) and 255 (blinding white). A $100 \\times 100$ image is a $100 \\times 100$ grid of numbers (10,000 integers).\n- RGB Color (3 Channels): Color images are composed of th",
                  "keyPoints": [
                    "**Grayscale (1 Channel):** Each pixel is represented by a single integer between `0` (pitch black) and `255` (blinding w",
                    "**RGB Color (3 Channels):** Color images are composed of three stacked matrices (Red channel, Green channel, Blue channe",
                    "- Pure Red pixel: `(R: 255, G: 0, B: 0)`",
                    "- Bright Yellow pixel: `(R: 255, G: 255, B: 0)`"
                  ]
                },
                {
                  "title": "What is an \"Edge\" Mathematically?",
                  "summary": "How does an AI vision model know where a person's face ends and the background wall begins? It searches for an Edge.\nIn computer vision, an Edge is simply a sudden, dramatic jump in pixel intensity values:",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Patterns Make It Smart Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Patterns Make It Smart.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Pixel Matrix Decoder",
              "engineType": " Mathematical Image Processing & Edge Detection Puzzle.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Pixel Matrix Decoder.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Patterns Make It Smart Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 1 LESSON 2\n# COMPUTER VISION: 2D PIXEL MATRIX EDGE DETECTION ENGINE\n# =====================================================================\n\ndef detect_vertical_edges(image_matrix, edge_threshold=150):\n    \"\"\"\n    Computes horizontal gradients across an image matrix to detect vertical edges.\n    Formula: Gradient(row, col) = | Image(row, col+1) - Image(row, col) |\n    \"\"\"\n    rows = len(image_matrix)\n    cols = len(image_matrix[0])\n    \n    # Initialize empty edge map with dimensions (rows x cols-1)\n    edge_map = []\n    \n    for r in range(rows):\n        edge_row = []\n        for c in range(cols - 1):\n            # Calculate absolute difference between adjacent pixels\n            intensity_diff = abs(image_matrix[r][c+1] - image_matrix[r][c])\n            \n            # If difference exceeds threshold, mark as significant edge (1), else (0)\n            if intensity_diff >= edge_threshold:\n                edge_row.append(1)  # Edge present\n            else:\n                edge_row.append(0)  # Smooth surface\n        edge_map.append(edge_row)\n        \n    return edge_map\n\ndef display_matrix(matrix, title):\n    print(f\"\\n--- {title} ---\")\n    for row in matrix:\n        # Format numbers or visual blocks\n        row_str = \" \".join([f\"{val:3}\" if isinstance(val, int) else str(val) for val in row])\n        print(f\"  [ {row_str} ]\")\n\n# ----------------- SIMULATED 6x6 SATELLITE IMAGE -----------------\n# An image showing a bright white vertical pillar (255) on dark background (20)\nsatellite_image = [\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ],\n    [ 20,  20, 255, 255,  20,  20 ]\n]\n\ndisplay_matrix(satellite_image, \"RAW INCOMING PIXEL INTENSITY MATRIX\")\n\nedges = detect_vertical_edges(satellite_image, edge_threshold=150)\n\nprint(\"\\n--- DETECTED EDGE BOUNDARIES (1 = Boundary Line) ---\")\nfor row in edges:\n    visual_line = \"\".join([\" \u2588 \" if cell == 1 else \" \u00b7 \" for cell in row])\n    print(f\"  {visual_line}\")\n\nprint(\"\\nAnalysis: Two sharp vertical boundary lines detected at Col 2 and Col 4!\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-1-2-1",
                  "questionNumber": 1,
                  "questionText": "(Digital Image Representation)\nIn standard 8-bit digital grayscale image processing, what is the valid numerical range of brightness for any single individual pixel?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In an 8-bit digital imaging system, each pixel is stored using one byte ($2^8 = 256$ possible distinct values). The scale ranges from 0 (minimum intensity, representing pure black) to 255 (maximum intensity, representing pure white).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-2-2",
                  "questionNumber": 2,
                  "questionText": "(Color Channels & Tensor Dimensions)\nA high-definition color photograph has dimensions of $1920 \\times 1080$ pixels. When stored in computer memory for deep learning processing, how many color matrices (channels) comprise this image?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Standard digital color photography uses the additive RGB color model. An image tensor has three stacked 2D matrices corresponding to Red, Green, and Blue intensity channels, resulting in a 3D numerical array of shape $(1080, 1920, 3)$.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-2-3",
                  "questionNumber": 3,
                  "questionText": "(Convolutional Mathematics & Edge Filters)\nWhy is the mathematical difference between adjacent pixels calculated when an AI vision system performs edge detection?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An edge represents a physical discontinuity in surface geometry, depth, or illumination. Calculating the spatial derivative (difference between neighboring pixels) yields high numerical values along sharp boundaries while producing zero in uniform regions (like a solid wall or clear sky).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Adversarial Perturbations)\nIn computer vision security, researchers discovered that adding a tiny, invisible layer of calculated pixel noise to a photo of a panda causes an AI model to classify it as a \"Gibbon monkey with 99.3% confidence\", even though hum",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "This phenomenon is known as an Adversarial Example. Deep neural networks do not possess biological understanding or conceptual common sense; they calculate weighted sums over numerical pixel matrices. Microscopic, mathematically crafted alterations to pixel values can push the feature vector across a decision boundary without human observers notici",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-1-2-5",
                  "questionNumber": 5,
                  "questionText": "(Convolutional Neural Network Hierarchy)\nIn a modern multi-layer Convolutional Neural Network (CNN) trained to recognize human faces, what do the earliest (initial) layers detect, and what do the deepest (final) layers detect?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "CNNs utilize Hierarchical Feature Learning. Early convolutional layers act as localized edge and texture detectors. Subsequent layers compose edges into geometric motifs and shapes. The final layers synthesize these parts into holistic object representations (faces, cars, animals).\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Patterns Make It Smart",
              "scenario": "An automated system in Patterns Make It Smart must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Computer Vision Biases & Lighting Calibration When image datasets are gathered to train face recognition cameras: - Unequal Contrast Representation: Standard camera sensors and edge-detection algorithms were historically calibrated on lighter skin tones. If a facial dataset lacks diverse skin pigmen",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class7-ch2",
        "chapterNumber": 2,
        "title": "Communicate with AI",
        "description": "Hello, Python! & Code Your First Idea",
        "icon": "Code",
        "lessons": [
          {
            "id": "class7-ch2-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 1,
            "lessonTitle": "Hello, Python!",
            "syllabusReference": "GAIO-CLASS7-CH02-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Hello, Python! Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Escape the Syntax Dungeon: The Cyber Crypt* > **Mission Briefing:** Trapped in the Cyber Crypt of Byte-Mountain! > While conducting a routine software audit on an ancient mainframe computer, a rogue security lockdown was triggered. Heavy titanium blast doors have sealed every exit shut! > The door control terminal runs an interactive Python command console. To unlock each bulkhead, you must supply exact Python commands to calculate key cryptographic equations. > However, previous hackers sabotaged the system, leaving behind broken scripts riddled with missing colons, misspelled variables, and indentation traps. One single `SyntaxError` will trip the emergency alarm! > Your mission is to enter the terminal, **Diagnose and Fix the Bugs**, master Python operators, compute the door-lock hashes, and escape the dungeon before the system enters permanent lockout! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Hello, Python!.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Hello, Python!",
              "overview": "Key theoretical principles and architecture defining Hello, Python!.",
              "blocks": [
                {
                  "title": "Why Does the AI World Love Python?",
                  "summary": "Over 85% of all AI research papers, machine learning libraries (TensorFlow, PyTorch), and generative models are built using Python. Why?\n1. Readable, Human-Friendly Syntax: Python code reads almost like standard English, eliminating the boilerplate clutter fou",
                  "keyPoints": [
                    "**Readable, Human-Friendly Syntax:** Python code reads almost like standard English, eliminating the boilerplate clutter",
                    "**Massive AI Library Ecosystem:** Instead of writing complex matrix math from scratch, developers can import pre-built t",
                    "**Interpreted Nature:** Python is an **Interpreted Language**. You can run code line-by-line interactively, making rapid"
                  ]
                },
                {
                  "title": "The Master Operator Toolkit in Python",
                  "summary": "| Operator Category | Symbol | Name & Operation | Example in Python | Evaluated Result |\n| :--- | :---: | :--- | :--- | :---: |\n| Arithmetic | +, -, , / | Basic Math (Float division) | 10 / 4 | 2.5 |\n| Arithmetic | // | Floor Division (Discards decimal remaind",
                  "keyPoints": [
                    "Core principle behind The Master Operator Toolkit in Python",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The 4 Common Python Errors (Bug Detective Guide)",
                  "summary": "1. SyntaxError: invalid syntax\n   --> Cause: Missing colon :, unmatched parenthesis (), or typo in keyword (prnt instead of print).\n2. NameError: name 'userscoe' is not defined\n   --> Cause: Calling a variable before creating it, or a typo in the variable name",
                  "keyPoints": [
                    "SyntaxError: invalid syntax",
                    "--> Cause: Missing colon :, unmatched parenthesis (), or typo in keyword (prnt instead of print).",
                    "NameError: name 'user_scoe' is not defined",
                    "--> Cause: Calling a variable before creating it, or a typo in the variable name."
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Hello, Python! Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Hello, Python!.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Syntax Dungeon Escape",
              "engineType": " Terminal Debugging Quest & Logic Puzzle.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Syntax Dungeon Escape.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Hello, Python! Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "students = 29\nteam_size = 4\n\ncomplete_teams = students // team_size   # Floor division\nleftover_students = students % team_size  # Modulo remainder\n\nprint(f\"Complete Teams: {complete_teams}\")\nprint(f\"Students Left Over: {leftover_students}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-2-1-1",
                  "questionNumber": 1,
                  "questionText": "(Operator Precedence & Evaluation)\nWhat is the evaluated output of the following Python expression?\nresult = 16 // 3 + 2  3  2 - 5 % 2\n\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-1-2",
                  "questionNumber": 2,
                  "questionText": "(Logical Boolean Evaluation)\nGiven the variables:\nx = 10\ny = 20\nz = 5\n\nWhat is the boolean evaluation of the statement:\n(x < y and y > 30) or not (z == 5)\n\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-1-3",
                  "questionNumber": 3,
                  "questionText": "(Python Language Architecture)\nWhy does Python enforce strict Indentation (whitespace at the start of a line) rather than using curly brackets {} like C++ or Java?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Created by Guido van Rossum, Python adheres to the philosophy that \"Readability counts\". By making indentation syntactically mandatory, Python eliminates ambiguous scoping bugs and ensures all Python code worldwide is clean, consistent, and instantly readable by other engineers.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Type Casting Bug)\nA student writes this temperature conversion program:\ntempc = input(\"Enter temperature in Celsius: \")\ntempf = (tempc  9/5) + 32\nprint(tempf)\n\nWhen run, the program crashes with: TypeError: can't multiply sequence by non-int of type 'float",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "input() returns a string. Attempting to multiply a string by a float (9/5 = 1.8) raises an immediate TypeError. Explicitly wrapping the input call with float() converts the text into a real decimal number, allowing arithmetic operations to execute.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-1-5",
                  "questionNumber": 5,
                  "questionText": "(Equality Operator vs Assignment Operator)\nWhat is the critical distinction in Python between a single equals sign (=) and a double equals sign (==)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "One of the most common beginner errors in computer science is confusing assignment with comparison. score = 100 stores the number 100 into the variable score. score == 100 asks the question \"Does score currently equal 100?\" and returns True or False.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Hello, Python!",
              "scenario": "An automated system in Hello, Python! must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Clean Code as an Engineering Responsibility When engineers write software that controls medical robots or financial credit algorithms: - Code Clarity Saves Lives: Messy, undocumented code with confusing variable names (like x1, temp2, a) leads to catastrophic human mistakes during maintenance. - Sel",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch2-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 2,
            "lessonTitle": "Code Your First Idea",
            "syllabusReference": "GAIO-CLASS7-CH02-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Code Your First Idea Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Cyber-Medic: The Space Colony Triage AI* > **Mission Briefing:** Crisis aboard Space Colony Olympus! > The central computer network has suffered widespread power fluctuations. Across various habitats, robotic air filtration units, solar hydroponic pumps, and life-support modules are flashing mysterious status error codes: `ERR_01`, `ERR_05`, `TEMP_WARN`... > The human engineering team is small and cannot be in ten places at once. They need an **Automated Diagnostic Assistant**\u2014an intelligent triage expert system capable of interrogating malfunctioning machinery, analyzing symptoms step-by-step, running diagnostic cycles in a loop, and issuing precise repair commands. > Your mission is to take your algorithmic idea, **Plan the Decision Tree**, and **Code the Interactive Diagnostic Assistant in Python** to bring the colony's systems safely back online! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Code Your First Idea.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Code Your First Idea",
              "overview": "Key theoretical principles and architecture defining Code Your First Idea.",
              "blocks": [
                {
                  "title": "1. Multi-Way Decision Structures (`if-elif-else`)",
                  "summary": "When a program faces more than two possibilities, we use elif (short for \"else if\"):",
                  "keyPoints": [
                    "Core principle behind 1. Multi-Way Decision Structures (`if-elif-else`)",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "2. The Two Kinds of Loops in Python",
                  "summary": "\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502                        THE TWO PYTHON LOOP PARADIGMS                   \u2502\n\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 1. THE for LOOP (Known Count)    ",
                  "keyPoints": [
                    "Core principle behind 2. The Two Kinds of Loops in Python",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The `range()` Function Mechanics",
                  "summary": "range(start, stop, step) generates an arithmetic progression of integers:\n- range(5) \u2794 0, 1, 2, 3, 4 (Starts at 0, stops before 5!)\n- range(1, 6) \u2794 1, 2, 3, 4, 5\n- range(0, 10, 2) \u2794 0, 2, 4, 6, 8 (Steps by 2)\n- range(5, 0, -1) \u2794 5, 4, 3, 2, 1 (Counts down)",
                  "keyPoints": [
                    "`range(5)` \u2794 `0, 1, 2, 3, 4` *(Starts at 0, stops before 5!)*",
                    "`range(1, 6)` \u2794 `1, 2, 3, 4, 5`",
                    "`range(0, 10, 2)` \u2794 `0, 2, 4, 6, 8` *(Steps by 2)*",
                    "`range(5, 0, -1)` \u2794 `5, 4, 3, 2, 1` *(Counts down)*"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Code Your First Idea Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Code Your First Idea.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The AI Smart Assistant Quest",
              "engineType": " Diagnostic Expert System & Decision Tree Builder.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The AI Smart Assistant Quest.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Code Your First Idea Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# The Multi-Way Branching Ladder\nif temperature > 80:\n    status = \"CRITICAL OVERHEAT: Shut down reactor!\"\nelif temperature > 50:\n    status = \"ELEVATED: Spin cooling fans at 100% speed.\"\nelif temperature > 25:\n    status = \"OPTIMAL: Standard operational state.\"\nelse:\n    status = \"SUB-ZERO FREEZE: Activate heating coils!\"",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-2-2-1",
                  "questionNumber": 1,
                  "questionText": "(Control Flow Branching)\nExamine the following Python code snippet:\nscore = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelif score >= 70:\n    grade = \"C\"\nelse:\n    grade = \"D\"\nprint(grade)\n\nWhat will be the output, and why did the line elif score >= 70 no",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "A",
                  "explanation": "In an if-elif-else conditional ladder, branches are mutually exclusive. Even though $85 \\ge 70$ is also mathematically True, Python halts evaluation of the entire ladder as soon as the first matching condition (score >= 80) is satisfied.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-2-2",
                  "questionNumber": 2,
                  "questionText": "(Loop Range Arithmetic)\nWhat is the exact sequence of numbers printed by the following for loop?\nfor num in range(2, 11, 3):\n    print(num, end=\" \")\n\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-2-3",
                  "questionNumber": 3,
                  "questionText": "(While Loop Termination Logic)\nWhat is the final value of count after the following loop completes?\ncount = 1\nwhile count < 16:\n    count = count  2\nprint(count)\n\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Nested Decision Trees)\nAn engineer builds an AI chatbot for bank security. If an applicant requests an account closure, the bot must first verify identity with a PIN code, and ONLY if the PIN is correct, ask whether the customer wishes to transfer remainin",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Hierarchical, multi-stage workflows require Nested Conditionals. The inner question (\"Transfer funds?\") is gated behind the successful validation of the outer conditional (\"Is PIN verified?\").",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-2-2-5",
                  "questionNumber": 5,
                  "questionText": "(Stateful Accumulator Patterns)\nIn a video game analytics script, what is the purpose of declaring totalkills = 0 outside the game loop, rather than declaring it inside the loop?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In the Accumulator Pattern, state persistence requires that the accumulator variable be initialized in the enclosing scope before the loop begins. Defining it inside the loop resets its value to zero every frame, preventing accumulation across iterations.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Code Your First Idea",
              "scenario": "An automated system in Code Your First Idea must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Danger of Hardcoded Algorithmic Traps When automated decision trees control real-world systems: - The \"Computer Says No\" Dilemma: In rigid decision trees, if an applicant's unique, edge-case situation does not fit neatly into pre-programmed if-elif branches, an automated system can unfairly reje",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class7-ch3",
        "chapterNumber": 3,
        "title": "AI Applications",
        "description": "AI in Money Matters & AI for a Greener World",
        "icon": "Coins",
        "lessons": [
          {
            "id": "class7-ch3-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 1,
            "lessonTitle": "AI in Money Matters",
            "syllabusReference": "GAIO-CLASS7-CH03-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI in Money Matters Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Cyber-Vault: The Midnight Heist* > **Mission Briefing:** Emergency at the Global Bank of Commerce! > Cybercriminals have launched an automated bot attack, stealing thousands of credit card numbers from a compromised international shopping website. > Right now, fraudulent micro-transactions and massive foreign withdrawals are flooding through the bank\u2019s payment servers at a rate of 500 transactions per second! > Human bank managers cannot review transactions manually; by the time a human opens a spreadsheet, millions of dollars have vanished across offshore shell accounts. > As the Chief **Fintech AI Security Architect**, you must deploy an **Automated Anomaly Detection Engine**! You must program real-time filters that analyze transaction amounts, geolocation velocity, merchant categories, and time stamps, freezing unauthorized fraud while ensuring legitimate customer purchases proceed without interruption! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI in Money Matters.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI in Money Matters",
              "overview": "Key theoretical principles and architecture defining AI in Money Matters.",
              "blocks": [
                {
                  "title": "How Artificial Intelligence Powers Modern Banking",
                  "summary": "Every second, billions of dollars move across international digital networks. AI acts as the invisible brain governing global commerce:",
                  "keyPoints": [
                    "Core principle behind How Artificial Intelligence Powers Modern Banking",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "How Anomaly Detection Works Mathematically",
                  "summary": "A financial fraud detection model does not \"know\" what a thief looks like. Instead, it builds a statistical Baseline Profile of the legitimate cardholder's historical habits:",
                  "keyPoints": [
                    "Typical Transaction Amount: $15 - $45 (Lunch, books, coffee)",
                    "Typical Location: Mumbai, India",
                    "Typical Hours: 08:00 AM - 10:00 PM",
                    "Typical Merchants: Grocery, Bookstores, Local Transit"
                  ]
                },
                {
                  "title": "The \"Impossible Velocity\" Heuristic",
                  "summary": "If Cardholder $A$ taps their card at a coffee shop in New York at 10:00 AM, and the same card is tapped at an ATM in London at 10:45 AM:\n- Distance between cities: $\\approx 5,500\\text{ km}$.\n- Time elapsed: 45 minutes ($0.75\\text{ hours}$).\n- Required travel s",
                  "keyPoints": [
                    "Distance between cities: $\\approx 5,500\\text{ km}$.",
                    "Time elapsed: 45 minutes ($0.75\\text{ hours}$).",
                    "Required travel speed: $\\frac{5500}{0.75} = 7,333\\text{ km/h}$ (faster than a military fighter jet!).",
                    "An AI flags this as an **Impossible Velocity Anomaly** with $>99.9\\%$ probability of card cloning or credential theft."
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI in Money Matters Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI in Money Matters.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Wall Street Fraud Buster",
              "engineType": " Real-Time Transaction Stream Anomaly Defense Simulator.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Wall Street Fraud Buster.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI in Money Matters Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 3 LESSON 1\n# FINTECH: REAL-TIME ANOMALY & FRAUD DETECTION ENGINE\n# =====================================================================\n\ndef evaluate_transaction_risk(tx, customer_baseline):\n    \"\"\"\n    Computes a risk score (0 to 100) based on 3 anomaly indicators:\n    1. Amount Ratio: Current amount vs historical average.\n    2. Velocity: Speed required between consecutive transaction cities.\n    3. Merchant Risk: Uncharacteristically risky merchant category.\n    \"\"\"\n    risk_score = 0\n    flags = []\n    \n    # Factor 1: Spending Amount Anomaly\n    avg_spend = customer_baseline[\"avg_amount\"]\n    amount_ratio = tx[\"amount\"] / avg_spend\n    \n    if amount_ratio > 10.0:\n        risk_score += 45\n        flags.append(f\"Spike anomaly: Amount is {amount_ratio:.1f}x higher than average!\")\n    elif amount_ratio > 4.0:\n        risk_score += 20\n        flags.append(f\"Moderate amount elevation ({amount_ratio:.1f}x average).\")\n        \n    # Factor 2: Geolocation Velocity Check (Speed = Distance / Time)\n    distance_km = tx[\"distance_from_last_tx_km\"]\n    time_elapsed_hrs = tx[\"mins_since_last_tx\"] / 60.0\n    \n    if time_elapsed_hrs > 0:\n        travel_speed_kmh = distance_km / time_elapsed_hrs\n    else:\n        travel_speed_kmh = 99999 if distance_km > 0 else 0\n        \n    if travel_speed_kmh > 900.0:  # Faster than a commercial passenger jet!\n        risk_score += 50\n        flags.append(f\"Impossible Velocity: Required travel speed is {travel_speed_kmh:,.0f} km/h!\")\n    elif travel_speed_kmh > 200.0:\n        risk_score += 25\n        flags.append(f\"Unusually fast transit ({travel_speed_kmh:.0f} km/h).\")\n\n    # Factor 3: High-Risk Category Flag\n    if tx[\"category\"] in [\"Cryptocurrency Exchange\", \"Foreign Casino\", \"Wire Transfer\"]:\n        risk_score += 25\n        flags.append(f\"High-risk merchant category: '{tx['category']}'\")\n        \n    # Determine automated action\n    final_score = min(100, risk_score)\n    if final_score >= 70:\n        decision = \"\ud83d\udea8 ACTION: DECLINE & FREEZE CARD (High Probability Fraud)\"\n    elif final_score >= 35:\n        decision = \"\ud83d\udcf1 ACTION: TRIGGER 2FA CHALLENGE (SMS One-Time Code Required)\"\n    else:\n        decision = \"\u2705 ACTION: APPROVE TRANSACTION (Normal Spending Pattern)\"\n        \n    return final_score, decision, flags\n\n# ----------------- SIMULATED TRANSACTION STREAM -----------------\nmaya_baseline = {\"avg_amount\": 25.0, \"home_city\": \"Bengaluru\"}\n\nincoming_transactions = [\n    {\n        \"id\": \"TX-901\", \"amount\": 22.50, \"category\": \"Bookstore\",\n        \"distance_from_last_tx_km\": 2.5, \"mins_since_last_tx\": 120\n    },\n    {\n        \"id\": \"TX-902\", \"amount\": 850.00, \"category\": \"Luxury Electronics\",\n        \"distance_from_last_tx_km\": 4200.0, \"mins_since_last_tx\": 30\n    },\n    {\n        \"id\": \"TX-903\", \"amount\": 95.00, \"category\": \"Restaurant\",\n        \"distance_from_last_tx_km\": 15.0, \"mins_since_last_tx\": 180\n    }\n]\n\nprint(\"=== GLOBAL BANK FINTECH FRAUD DETECTION INFERENCE ===\\n\")\nfor tx in incoming_transactions:\n    score, action, alerts = evaluate_transaction_risk(tx, maya_baseline)\n    print(f\"Transaction [{tx['id']}] - Amount: ${tx['amount']:.2f} ({tx['category']})\")\n    print(f\"  Risk Index: {score}/100 \u2794 {action}\")\n    for a in alerts:\n        print(f\"    \u2022 {a}\")\n    print(\"-\" * 65)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-3-1-1",
                  "questionNumber": 1,
                  "questionText": "(Fintech AI Core Concepts)\nWhat is the primary technical mechanism an AI banking system uses to distinguish legitimate customer transactions from fraudulent criminal charges?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Modern digital banking processes billions of transactions daily. Anomaly Detection models use statistical machine learning to compare real-time telemetry against historical customer behavioral baselines, computing risk probability scores within milliseconds.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-1-2",
                  "questionNumber": 2,
                  "questionText": "(Anomaly Detection Mathematics)\nA customer spends an average of \\$30 per week at local grocery stores in Delhi. At 02:00 AM, the card is tapped in London for \\$5,000, exactly 20 minutes after it was used at a Delhi convenience store. What specific heuristic triggers an immediate ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Impossible Velocity calculations divide spatial distance by elapsed time. A physical impossibility ($>900\\text{ km/h}$) indicates that the card credentials have been cloned or accessed digitally by unauthorized third parties across distant servers.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-1-3",
                  "questionNumber": 3,
                  "questionText": "(Computer Vision in Retail)\nIn a cashier-less automated retail store (like Amazon Go), how does the system know which item a customer picked up from the shelf without requiring a barcode scan?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Cashier-less stores utilize Sensor Fusion: ceiling-mounted computer vision neural networks track human skeleton pose and hand interactions, while shelf weight sensors confirm the exact item removed by measuring precise gram changes.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Algorithmic Credit Bias)\nA fintech startup trains an AI model to approve personal business loans using 20 years of historical banking records. During testing, the AI consistently rejects loan applications from qualified entrepreneurs belonging to historica",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "This is a classic example of Proxy Variable Bias. If historical human loan officers unfairly denied loans to specific demographic zip codes, an AI trained on those historical outcomes will learn that those zip codes are \"high risk\", perpetuating algorithmic discrimination.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-1-5",
                  "questionNumber": 5,
                  "questionText": "(Precision vs Recall in Risk Systems)\nWhy do banks prefer using a Step-Up Authentication (SMS 2FA Challenge) for borderline transactions rather than immediately freezing the credit card?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "High-risk automated systems avoid binary all-or-nothing decisions in ambiguous cases. A Step-Up Challenge (2FA) acts as a flexible risk filter: if the customer is genuine, they enter the code in 5 seconds and proceed happily; if a thief is attempting the charge, they cannot access the phone and the theft fails.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI in Money Matters",
              "scenario": "An automated system in AI in Money Matters must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Cost of Financial Exclusion When an AI system decides who receives a loan, who can buy a home, or whose card is frozen: - Financial Sovereignty: Access to financial tools is essential for modern survival. If an opaque \"black-box\" algorithm rejects a family\u2019s mortgage without explaining why",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch3-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 2,
            "lessonTitle": "AI for a Greener World",
            "syllabusReference": "GAIO-CLASS7-CH03-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI for a Greener World Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Eco-Grid: Zero-Emission Metropolis* > **Mission Briefing:** Welcome to Neo-Veridia: the world\u2019s first 100% renewable smart city! > Neo-Veridia is powered entirely by offshore wind turbines, desert solar farms, and massive grid-scale battery storage facilities. > However, maintaining stability on a 100% renewable grid is an immense challenge! When sudden storm clouds blot out the desert sun, solar generation plummets by 70% in seconds. When a heatwave hits downtown at 06:00 PM, millions of air conditioners turn on simultaneously! > If power generation fails to match demand within milliseconds, the electrical grid will suffer a catastrophic blackout! > As the **Chief Energy AI Dispatcher**, your mission is to deploy an **Intelligent Predictive Energy Management System**! You must forecast weather patterns, anticipate city consumption spikes, dispatch battery reserves with millisecond precision, and keep the city green, stable, and blackout-free! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI for a Greener World.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI for a Greener World",
              "overview": "Key theoretical principles and architecture defining AI for a Greener World.",
              "blocks": [
                {
                  "title": "The Environmental Double-Edged Sword of AI",
                  "summary": "Artificial Intelligence offers unprecedented tools to combat climate change, but it also consumes significant energy:",
                  "keyPoints": [
                    "Core principle behind The Environmental Double-Edged Sword of AI",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Key Environmental AI Technologies",
                  "summary": "| Domain | How the AI Operates | Environmental Impact |\n| :--- | :--- | :--- |\n| Smart Grid Load Balancing | Correlates satellite cloud cover, wind speeds, historical city traffic, and temperature to predict energy generation and demand 24 hours ahead. | Preve",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI for a Greener World Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI for a Greener World.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Eco-Grid Dispatcher",
              "engineType": " Real-Time Power Grid Balancing & Resource Allocation Simulator.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Eco-Grid Dispatcher.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI for a Greener World Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 3 LESSON 2\n# ECO-GRID SIMULATION: PREDICTIVE RENEWABLE DISPATCH & BATTERY ENGINE\n# =====================================================================\n\ndef simulate_24hr_ecogrid(hourly_forecast):\n    \"\"\"\n    Simulates hourly energy dispatch across a smart eco-city:\n    - Balances Solar + Wind generation against City Demand.\n    - Manages Battery Storage (Capacity: 500 MWh; Max Charge/Discharge: 150 MW).\n    - Tracks Fossil Peaker backup usage (aiming for 0 MW!).\n    \"\"\"\n    battery_capacity_mwh = 500.0\n    current_battery_mwh = 200.0  # Starts 40% full\n    max_flow_mw = 150.0\n    \n    total_fossil_used = 0\n    blackout_hours = 0\n    \n    print(f\"{'HOUR':<6} | {'SOLAR':<7} | {'WIND':<6} | {'DEMAND':<8} | {'BATTERY':<11} | {'FOSSIL':<8} | {'STATUS'}\")\n    print(\"-\" * 72)\n    \n    for row in hourly_forecast:\n        hour = row[\"hour\"]\n        solar = row[\"solar_mw\"]\n        wind = row[\"wind_mw\"]\n        demand = row[\"demand_mw\"]\n        \n        renewable_gen = solar + wind\n        net_balance = renewable_gen - demand\n        fossil_needed = 0\n        \n        if net_balance >= 0:\n            # SURPLUS ENERGY: Charge battery\n            charge_amount = min(net_balance, max_flow_mw, battery_capacity_mwh - current_battery_mwh)\n            current_battery_mwh += charge_amount\n            status = f\"Surplus (+{charge_amount:.0f} MW into battery)\"\n        else:\n            # ENERGY DEFICIT: Discharge battery\n            deficit = abs(net_balance)\n            discharge_amount = min(deficit, max_flow_mw, current_battery_mwh)\n            current_battery_mwh -= discharge_amount\n            unmet_deficit = deficit - discharge_amount\n            \n            if unmet_deficit > 0:\n                fossil_needed = unmet_deficit\n                total_fossil_used += fossil_needed\n                status = f\"\u26a0\ufe0f DEFICIT (Peaker Plant {fossil_needed:.0f} MW)\"\n                if current_battery_mwh <= 0:\n                    blackout_hours += 1\n            else:\n                status = f\"Battery covered deficit (-{discharge_amount:.0f} MW)\"\n                \n        pct_batt = (current_battery_mwh / battery_capacity_mwh) * 100\n        print(f\"{hour:<6} | {solar:<7.0f} | {wind:<6.0f} | {demand:<8.0f} | {pct_batt:<5.1f}%     | {fossil_needed:<8.0f} | {status}\")\n        \n    print(\"-\" * 72)\n    print(f\"Simulation Complete:\")\n    print(f\"  \u2022 Final Battery Reserves: {current_battery_mwh:.1f} / {battery_capacity_mwh:.0f} MWh\")\n    print(f\"  \u2022 Total Fossil Peaker Energy Used: {total_fossil_used:.0f} MWh\")\n    print(f\"  \u2022 City Blackout Occurrences: {blackout_hours} hours\")\n    if total_fossil_used == 0:\n        print(\"\ud83c\udf3f PERFECT SCORE: 100% Clean Green Energy Grid Achieved!\")\n\n# ----------------- SIMULATED 6-HOUR SNAPSHOT FORECAST -----------------\ngrid_forecast = [\n    {\"hour\": \"08:00\", \"solar_mw\": 200, \"wind_mw\": 120, \"demand_mw\": 280},\n    {\"hour\": \"12:00\", \"solar_mw\": 550, \"wind_mw\": 100, \"demand_mw\": 400},\n    {\"hour\": \"16:00\", \"solar_mw\": 320, \"wind_mw\": 180, \"demand_mw\": 420},\n    {\"hour\": \"20:00\", \"solar_mw\": 0,   \"wind_mw\": 150, \"demand_mw\": 480},\n    {\"hour\": \"00:00\", \"solar_mw\": 0,   \"wind_mw\": 220, \"demand_mw\": 250},\n    {\"hour\": \"04:00\", \"solar_mw\": 0,   \"wind_mw\": 180, \"demand_mw\": 210}\n]\n\nprint(\"=== NEO-VERIDIA 24-HOUR ECO-GRID DISPATCH RUN ===\\n\")\nsimulate_24hr_ecogrid(grid_forecast)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-3-2-1",
                  "questionNumber": 1,
                  "questionText": "(Renewable Energy Grid Management)\nWhy is Artificial Intelligence particularly necessary for managing a 100% renewable electrical grid compared to a traditional coal-fired electrical grid?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Unlike traditional thermal power plants that burn fuel on demand, solar and wind generation depend on dynamic meteorological conditions (cloud cover, atmospheric pressure, wind gusts). Machine learning models ingest real-time weather telemetry to predict supply-demand gaps and prevent grid instability.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-2-2",
                  "questionNumber": 2,
                  "questionText": "(Optical Waste Sorting Robotics)\nIn modern automated recycling recycling plants, what technology enables robotic delta arms to identify and pick recyclable Polyethylene Terephthalate (PET) plastic bottles out of a chaotic conveyor belt of crushed trash?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Recyclable materials cannot be separated by physical magnets (which only attract ferrous metals). Advanced recycling facilities combine High-Speed Computer Vision with Hyperspectral Near-Infrared (NIR) Spectroscopy: different plastic polymers (PET, HDPE, PP) absorb specific infrared wavelengths, allowing the AI to categorize and pneumatic-eject the",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-2-3",
                  "questionNumber": 3,
                  "questionText": "(Green AI Principles)\nWhat is the primary objective of the global \"Green AI\" engineering movement?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "As frontier AI models grow into trillions of parameters, the electricity required to power data centers has surged. Green AI advocates for algorithmic efficiency, parameter pruning, distillation, and renewable data center cooling, ensuring technological progress does not accelerate ecological degradation.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Demand-Side Management)\nDuring an extreme summer heatwave, the municipal AI energy manager predicts a critical 200 MW power deficit between 05:00 PM and 07:00 PM. Rather than firing up an old, heavily polluting diesel peaker plant, how can the AI utilize S",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Demand-Side Management (DSM) balances the grid by adjusting consumption rather than generation. Non-critical thermodynamic loads (like water heaters or EV chargers) can pause power draw for 60 minutes with zero noticeable impact on user comfort, successfully flattening peak demand curves without burning fossil fuels.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-3-2-5",
                  "questionNumber": 5,
                  "questionText": "(Wildlife Conservation Technologies)\nHow do AI-powered bio-acoustic listening networks help protect endangered marine mammals from commercial container ships?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Acoustic AI buoys deploy neural networks trained on cetacean sound signatures. When an endangered North Atlantic right whale or blue whale calls, the buoy detects the sound within seconds and transmits a geographic alert to approaching commercial ships, dramatically reducing lethal ship-strike collisions.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI for a Greener World",
              "scenario": "An automated system in AI for a Greener World must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Climate Justice & Technological Stewardship As we engineer digital intelligence to safeguard Earth's biosphere: - Prioritize Vulnerable Communities: Climate change disproportionately harms low-income and developing coastal regions. AI environmental tools (such as flood prediction and drought mitigat",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class7-ch4",
        "chapterNumber": 4,
        "title": "AI and Career",
        "description": "Career Compass: AI & Skills That Matter",
        "icon": "Target",
        "lessons": [
          {
            "id": "class7-ch4-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 1,
            "lessonTitle": "Career Compass: AI",
            "syllabusReference": "GAIO-CLASS7-CH04-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Career Compass: AI Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Project Bio-Synth: The Deep-Sea Genetic Explorer* > **Mission Briefing:** Welcome to the Global Innovation Venture Accelerator! > A marine biotechnology startup, *Ocean-Genesis*, has just discovered rare deep-sea hydrothermal vent bacteria that produce natural enzymes capable of breaking down plastic waste in 48 hours. > However, the company cannot turn this into a global ecological solution with conventional tools! They need an advanced AI system to simulate protein folding, predict genetic mutations, and design automated bio-reactors. > The venture capital board has allocated a $5,000,000 grant, but the startup is in chaos because the software coders don\u2019t understand cellular microbiology, the biologists don\u2019t know how to train neural networks, and the legal team is worried about international oceanic bio-patents! > As the **Chief Venture Architect**, your mission is to use your **Career Compass**, assemble an elite interdisciplinary team, align their complementary skills, and pitch the winning technical roadmap to the investment board! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Career Compass: AI.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Career Compass: AI",
              "overview": "Key theoretical principles and architecture defining Career Compass: AI.",
              "blocks": [
                {
                  "title": "AI is Not a Solitary Subject; It is an Accelerator for All S",
                  "summary": "Many students believe: \"If I want to work in AI, I must sit in a room typing computer code all day.\"  \nIn the modern economy, Artificial Intelligence is an Augmenting Layer that supercharges every existing human discipline:",
                  "keyPoints": [
                    "Core principle behind AI is Not a Solitary Subject; It is an Accelerator for All Subjects",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "In-Depth Profile of Four Breakthrough Hybrid Careers",
                  "summary": "| Career Title | Academic Intersection | Core Challenge They Solve | Day-to-Day Toolset |\n| :--- | :--- | :--- | :--- |\n| Computational Biologist | Molecular Biology + Data Science | Uses machine learning models (like AlphaFold) to simulate the 3D structures o",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Career Compass: AI Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Career Compass: AI.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Innovation Studio",
              "engineType": " Startup Venture Incubator & Interdisciplinary Team Simulation.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Innovation Studio.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Career Compass: AI Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 4 LESSON 1\n# INTERDISCIPLINARY CAREER COMPASS: HYBRID PATHWAY RECOMMENDER\n# =====================================================================\n\ndef evaluate_career_compass(subject_ratings):\n    \"\"\"\n    Maps student academic subject affinities (1 to 5 scale) to hybrid AI careers.\n    Disciplines: biology, math, languages, law_social, visual_arts\n    \"\"\"\n    careers = {\n        \"Computational Biologist\": (\n            subject_ratings[\"biology\"] * 3.0 + \n            subject_ratings[\"math\"] * 2.0\n        ),\n        \"NLP Computational Linguist\": (\n            subject_ratings[\"languages\"] * 3.0 + \n            subject_ratings[\"math\"] * 1.5\n        ),\n        \"AI Policy & Human Rights Advisor\": (\n            subject_ratings[\"law_social\"] * 3.0 + \n            subject_ratings[\"languages\"] * 1.5\n        ),\n        \"Generative Media & Creative Technologist\": (\n            subject_ratings[\"visual_arts\"] * 3.0 + \n            subject_ratings[\"math\"] * 1.0\n        ),\n        \"Autonomous Robotics Safety Engineer\": (\n            subject_ratings[\"math\"] * 2.5 + \n            subject_ratings[\"biology\"] * 1.0 + \n            subject_ratings[\"law_social\"] * 1.5\n        )\n    }\n    \n    # Sort careers in descending order of compatibility\n    sorted_matches = sorted(careers.items(), key=lambda x: x[1], reverse=True)\n    return sorted_matches\n\n# ----------------- SIMULATED STUDENT PROFILE -----------------\n# Ratings on a scale from 1 (Low interest) to 5 (High passion)\nstudent_profile = {\n    \"name\": \"Dev\",\n    \"ratings\": {\n        \"biology\": 5,      # Passionate about genetics and ocean ecology\n        \"math\": 4,         # Strong in algebra and statistics\n        \"languages\": 2,    # Prefers science labs over grammar essays\n        \"law_social\": 3,   # Cares about environmental laws\n        \"visual_arts\": 2   # Casual interest in drawing\n    }\n}\n\nprint(f\"=== CAREER COMPASS REPORT FOR: {student_profile['name'].upper()} ===\\n\")\ncareer_rankings = evaluate_career_compass(student_profile[\"ratings\"])\n\ntop_career, top_score = career_rankings[0]\nprint(f\"\ud83c\udf1f PRIMARY CAREER COMPASS DESTINATION:\")\nprint(f\"   {top_career.upper()} (Fit Index: {top_score:.1f} / 25.0 pts)\\n\")\n\nprint(\"Full Cross-Disciplinary Compatibility Matrix:\")\nfor role, score in career_rankings:\n    progress_bar = \"\u2588\" * int(score) + \"\u2591\" * (25 - int(score))\n    print(f\"  {role:<42} : [{progress_bar}] {score:.1f}\")\n\nprint(\"\\nCompass Insight: You don't have to choose between Biology and Computer Science!\")\nprint(\"As a Computational Biologist, you will use Python to decode DNA and cure diseases.\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-4-1-1",
                  "questionNumber": 1,
                  "questionText": "(Interdisciplinary AI Careers)\nWhich hybrid professional on an AI research team utilizes statistical machine learning algorithms to model complex cellular protein folding, accelerate drug discovery, and analyze genomic sequencing data?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Computational Biology is the high-impact intersection of molecular biology, bioinformatics, and machine learning. Specialists in this domain use systems like AlphaFold to predict 3D biological protein structures directly from 1D amino acid strings, compressing decades of biological laboratory work into minutes.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-1-2",
                  "questionNumber": 2,
                  "questionText": "(Natural Language Processing Roles)\nWhy does an advanced Large Language Model engineering team require a Computational Linguist in addition to a computer systems coder?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Language is profoundly nuanced and cultural. A pure computer systems engineer focuses on GPU throughput and memory allocation. The Computational Linguist provides the essential expertise in phonetic structures, contextual pragmatics, idiomatic metaphors, and semantic alignment that turns raw token prediction into nuanced, respectful communication.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-1-3",
                  "questionNumber": 3,
                  "questionText": "(Safety & Formal Verification)\nWhat is the primary responsibility of an Autonomous Systems Safety Verifier working on commercial passenger aircraft or self-driving automobiles?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In safety-critical aviation and automotive robotics, testing by driving around is insufficient to guarantee safety. Safety Verifiers use mathematical logic and formal verification to prove bounds, ensuring control algorithms respect safety envelopes under all environmental extremes.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: The Evolving Tech Job Landscape)\nAs Generative AI tools automate the writing of routine boilerplate computer code, how does the role of human software engineers transform?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Historical technological shifts (from assembly language to high-level languages like Python) always automate lower-level mechanical toil while expanding the scope and ambition of human engineers. Modern developers become System Architects\u2014framing complex problems, auditing code safety, and orchestrating multi-agent AI systems.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-1-5",
                  "questionNumber": 5,
                  "questionText": "(AI Policy & Legal Governance)\nWhy must international governments employ technical AI Policy Advisors when drafting laws to regulate artificial intelligence technologies?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "A",
                  "explanation": "Regulating frontier technology requires deep understanding of both law and algorithmic mechanics. Poorly informed regulations can either be technically unenforceable or inadvertently ban beneficial open-source academic research. Interdisciplinary policy advisors bridge the gap between legislative frameworks and mathematical reality.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Career Compass: AI",
              "scenario": "An automated system in Career Compass: AI must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Embracing Diversity in Innovation Teams When technology products are created by homogeneous teams: - The Blind Spot Danger: If an AI team consists solely of engineers with identical backgrounds and life experiences, they will completely overlook critical safety, cultural, or accessibility issues tha",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch4-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 2,
            "lessonTitle": "Skills That Matter",
            "syllabusReference": "GAIO-CLASS7-CH04-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Skills That Matter Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *The Grand Tech Decathlon: The Arena of Excellence* > **Mission Briefing:** Welcome to the International Computational Decathlon! > Every year, the brightest young minds gather to compete not in rote memory or typing speed, but in the **Skills That Truly Matter** in the modern world: deep logical tracing, catching subtle algorithmic bugs, spotting sneaky statistical fallacies, and optimizing AI prompts under pressure. > The competition is divided into five intense qualifying stages. In each round, you will face realistic software engineering and data science dilemmas that separate amateur script-copyists from world-class **Computational Thinkers**. > Your mission is to step into the Decathlon Arena, represent your academy, conquer all five challenges, and earn your official **Master Competency Certification**! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Skills That Matter.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Skills That Matter",
              "overview": "Key theoretical principles and architecture defining Skills That Matter.",
              "blocks": [
                {
                  "title": "Beyond Rote Coding: The Skills That Endure",
                  "summary": "Programming syntax and software tools change every few years. What separated programmers in 2000 was memorizing manuals. What separates AI leaders today is the Core Competency Matrix:",
                  "keyPoints": [
                    "Core principle behind Beyond Rote Coding: The Skills That Endure",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Detailed Breakdown of Essential Skills",
                  "summary": "| Competency | Why It Matters Today | Common Amateur Mistake | Professional Master Approach |\n| :--- | :--- | :--- | :--- |\n| Statistical Intuition | Data is easily weaponized or misinterpreted. | Assuming that because two graph lines go up together, one cause",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Skills That Matter Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Skills That Matter.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Tech Decathlon",
              "engineType": " Multi-Stage Competitive Logic & Code Audit Tournament.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Tech Decathlon.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-3",
                  "levelNumber": 3,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-3-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-3-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Skills That Matter Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 4 LESSON 2\n# AUTOMATED CODE QUALITY & PEER REVIEW LINTER\n# =====================================================================\n\ndef audit_python_code(source_code_lines):\n    \"\"\"\n    Audits Python source code lines for essential software engineering practices:\n    - Flags cryptic single-letter variable names (e.g., 'x =', 'a =').\n    - Flags missing function docstrings / comments.\n    - Flags dangerous bare 'except:' clauses.\n    - Flags lines exceeding 79 characters (PEP-8 standard).\n    \"\"\"\n    score = 100\n    audit_findings = []\n    \n    for line_num, line in enumerate(source_code_lines, 1):\n        stripped = line.strip()\n        \n        # Check 1: Line length\n        if len(line) > 85:\n            score -= 10\n            audit_findings.append(f\"Line {line_num}: Line exceeds recommended PEP-8 length ({len(line)} > 85 chars).\")\n            \n        # Check 2: Cryptic single-letter variable assignments (e.g., 'a = 10')\n        if len(stripped) >= 3 and stripped[1] == ' ' and stripped[2] == '=' and stripped[0].isalpha():\n            score -= 15\n            var_name = stripped[0]\n            audit_findings.append(f\"Line {line_num}: Cryptic single-letter variable '{var_name}'. Use descriptive names!\")\n            \n        # Check 3: Missing colon on if/for/def\n        if any(stripped.startswith(kw) for kw in [\"def \", \"if \", \"for \", \"while \", \"elif \"]):\n            if not stripped.endswith(\":\"):\n                score -= 25\n                audit_findings.append(f\"Line {line_num}: Syntax Error! Missing trailing colon ':' on statement.\")\n                \n        # Check 4: Hardcoded passwords / API keys\n        if \"password\" in stripped.lower() and \"=\" in stripped and '\"' in stripped:\n            score -= 30\n            audit_findings.append(f\"Line {line_num}: \ud83d\udea8 SECURITY HAZARD! Hardcoded password detected in source text!\")\n\n    final_score = max(0, score)\n    return final_score, audit_findings\n\n# ----------------- TEST CODE ARTIFACT TO AUDIT -----------------\nsample_peer_submission = [\n    \"def calculate_tax(income):\",\n    \"    a = income * 0.15\",                           # Line 2: Cryptic variable 'a'\n    \"    database_password = \\\"super_secret_123\\\"\",     # Line 3: Hardcoded password!\n    \"    if income > 100000\",                           # Line 4: Missing colon!\n    \"        return a + 500\",\n    \"    return a\"\n]\n\nprint(\"=== AUTOMATED PYTHON CODE REVIEW REPORT ===\\n\")\nquality_score, report = audit_python_code(sample_peer_submission)\n\nprint(f\"Overall Code Health Score: {quality_score} / 100 pts\")\nif quality_score >= 85:\n    print(\"Verdict: \u2705 CODE APPROVED FOR PRODUCTION DEPLOYMENT\")\nelif quality_score >= 60:\n    print(\"Verdict: \u26a0\ufe0f REVISIONS REQUIRED BEFORE MERGING\")\nelse:\n    print(\"Verdict: \ud83d\uded1 CODE REJECTED: CRITICAL BUGS & SECURITY DEFECTS DETECTED\")\n\nprint(\"\\nAudit Defect Traceback:\")\nfor item in report:\n    print(f\"  \u2022 {item}\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-4-2-1",
                  "questionNumber": 1,
                  "questionText": "(Statistical Thinking & Data Traps)\nA healthcare study reports that people who sleep with their shoes on are significantly more likely to wake up with severe headaches in the morning ($r = +0.88$). What is the correct scientific deduction?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "This is a famous textbook demonstration of the Correlation vs Causation Fallacy. The physical shoes do not cause head pain. A confounding lifestyle factor (such as collapsing into bed drunk or suffering acute fever) causes individuals both to forget to remove their footwear and to awaken with severe physiological headaches.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-2-2",
                  "questionNumber": 2,
                  "questionText": "(Software Engineering Best Practices)\nWhy is writing self-documenting code with descriptive variable names (e.g., daysuntilexam = 14) vastly superior to using short abbreviations (e.g., d = 14)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In commercial software engineering, codebases live for decades and are maintained by rotating teams of hundreds of engineers. Cryptic variable names force engineers to waste hours reverse-engineering author intent, significantly increasing the probability of introducing regression bugs during updates.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-2-3",
                  "questionNumber": 3,
                  "questionText": "(Collaborative Code Review Mindset)\nDuring a team code review, an engineer spots that a colleague forgot to close an open database connection inside a loop, which will cause memory leakage. What is the most professional and effective way to phrase the review comment?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "High-performing engineering cultures practice Blameless, Constructive Code Reviews. Criticizing the person causes defensiveness; constructively critiquing the code with a clear explanation of the potential failure mode and offering a collaborative solution fosters team psychological safety and code excellence.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Verification of AI-Generated Code)\nA developer uses an AI code assistant to generate a quick function that sorts a list of bank customer accounts. Why is it dangerous to immediately deploy this function to production without comprehensive unit testing?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Generative models are probabilistic text generators, not formal logic verifiers. They frequently emit code with subtle boundary bugs, off-by-one errors, or silent concurrency race conditions. Professional developers treat AI-generated code as a draft, applying rigorous Unit Tests and Boundary Analysis before deployment.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-4-2-5",
                  "questionNumber": 5,
                  "questionText": "(The Mindset of Lifelong Learning)\nIn an era where Artificial Intelligence models and frameworks are updated every few months, which habit is the most vital asset for a young technologist?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Specific software frameworks and libraries inevitably become obsolete over 5 to 10 year cycles. What endures across a 40-year career is Meta-Learning\u2014the ability to decompose novel challenges, understand core algorithmic principles, read documentation independently, and fearlessly adapt to new technological paradigms.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Skills That Matter",
              "scenario": "An automated system in Skills That Matter must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Ethical Accountability in Code Ownership When software you wrote or deployed causes real-world harm: - Never Blame the Machine: You cannot say \"The AI model decided to do it, so it's not my fault.\" The human engineer who designed the prompts, curated the training data, failed to test edge-cases, and",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class7-ch5",
        "chapterNumber": 5,
        "title": "AI Tools",
        "description": "AI Content Creator & AI Learning Assistant",
        "icon": "Sparkles",
        "lessons": [
          {
            "id": "class7-ch5-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 1,
            "lessonTitle": "AI Content Creator",
            "syllabusReference": "GAIO-CLASS7-CH05-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Content Creator Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Babel-Forge: The Interstellar Encyclopedia* > **Mission Briefing:** Welcome to the Galactic Communications Command! > Deep-space exploration vessels are discovering alien minerals, ancient space stations, and uncharted nebulae every day. Thousands of raw exploration reports are arriving at headquarters simultaneously! > Command needs to convert these messy, unstructured captain\u2019s logs into clean, verified entries for the *Universal Planetary Encyclopedia*. > However, raw LLMs tend to ramble, write poetic essays when scientific data is needed, or format dates inconsistently! > As the **Chief AI Content Architect**, your mission is to calibrate the generative model using **Token Tuning, Temperature Calibration, and Few-Shot In-Context Prompting**! You must force the AI to extract structured, verifiable data profiles formatted in flawless JSON that can be ingested directly into the galaxy\u2019s central navigation database. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Content Creator.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Content Creator",
              "overview": "Key theoretical principles and architecture defining AI Content Creator.",
              "blocks": [
                {
                  "title": "How LLMs Actually Process Language: Tokenization",
                  "summary": "Computers cannot read letters or words directly. Before a sentence enters an LLM, a Tokenizer slices text into numerical chunks called Tokens:",
                  "keyPoints": [
                    "**Rule of Thumb:** On average, 1 token $\\approx 0.75$ words (or 100 tokens $\\approx 75$ English words).",
                    "Common words (like `\"the\"`, `\"cat\"`, `\"run\"`) are single tokens. Complex or rare words are split into multi-token sub-wo"
                  ]
                },
                {
                  "title": "The Temperature Hyperparameter (0.0 to 1.0+)",
                  "summary": "When an LLM generates the next token, it calculates probability percentages for thousands of candidate words. The Temperature setting controls how the model chooses from these probabilities:",
                  "keyPoints": [
                    "Core principle behind The Temperature Hyperparameter (0.0 to 1.0+)",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Few-Shot In-Context Learning",
                  "summary": "Instead of just telling an AI what you want (Zero-Shot), you show it two or three completed examples (Few-Shot):",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Content Creator Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Content Creator.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Prompt Arena Championship",
              "engineType": " Competitive Generative Constraint & Token Optimization Arena.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Prompt Arena Championship.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Content Creator Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 5 LESSON 1\n# AI CONTENT CREATION: FEW-SHOT PROMPT ASSEMBLER & JSON VALIDATOR\n# =====================================================================\n\nimport json\n\ndef build_few_shot_extraction_prompt(source_text):\n    \"\"\"\n    Constructs a low-temperature Few-Shot prompt forcing strict JSON output.\n    \"\"\"\n    prompt = (\n        \"You are an expert Scientific Knowledge Graph Extractor.\\n\"\n        \"TASK: Extract key science entities from text into valid JSON matching this schema:\\n\"\n        \"{\\n\"\n        '  \"topic\": string,\\n'\n        '  \"definition\": string,\\n'\n        '  \"formula_or_equation\": string,\\n'\n        '  \"real_world_application\": string\\n'\n        \"}\\n\\n\"\n        \"--- FEW-SHOT DEMONSTRATION ---\\n\"\n        \"Text: 'Ohm's Law states that current through a conductor is proportional to voltage. Formula: V = I * R. Used in circuits.'\\n\"\n        \"Output JSON:\\n\"\n        \"{\\n\"\n        '  \"topic\": \"Ohm\\'s Law\",\\n'\n        '  \"definition\": \"Current is directly proportional to voltage across a resistance.\",\\n'\n        '  \"formula_or_equation\": \"V = I * R\",\\n'\n        '  \"real_world_application\": \"Designing electrical circuits and fuses.\"\\n'\n        \"}\\n\\n\"\n        \"--- TARGET MISSION TEXT ---\\n\"\n        f\"Text: '{source_text}'\\n\"\n        \"Output JSON:\"\n    )\n    return prompt\n\ndef validate_llm_json_response(raw_response_str):\n    \"\"\"\n    Validates whether the generated text is syntactically valid JSON and\n    contains all mandatory schema keys.\n    \"\"\"\n    required_keys = [\"topic\", \"definition\", \"formula_or_equation\", \"real_world_application\"]\n    \n    try:\n        # Strip potential markdown code fences",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-5-1-1",
                  "questionNumber": 1,
                  "questionText": "(Language Model Mechanics)\nIn Natural Language Processing and Large Language Models, what is a Token?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Transformers and LLMs do not operate directly on raw strings of human characters. A Tokenizer divides text into sub-word semantic fragments (tokens), mapping each to a unique integer index in the model's vocabulary dictionary.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-1-2",
                  "questionNumber": 2,
                  "questionText": "(Hyperparameter Tuning: Temperature)\nIf an engineer is configuring an AI model to extract legal clauses from complex contracts into structured database columns, what Temperature setting is most scientifically appropriate?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Temperature scales the logits before the softmax probability function. Low temperatures ($0.0 \\le T \\le 0.2$) collapse the probability distribution toward greedy selection of the most mathematically likely tokens, maximizing factual precision and preventing creative improvisations.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-1-3",
                  "questionNumber": 3,
                  "questionText": "(In-Context Learning Methodology)\nWhat is the defining characteristic of Few-Shot Prompting compared to Zero-Shot Prompting?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In Few-Shot Learning (first popularized by GPT-3), the prompt provides explicit demonstrative exemplars in-context. The model utilizes its pre-trained pattern recognition capabilities to mirror the structure, formatting, and stylistic tone of the examples without requiring permanent parameter fine-tuning.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Structured Machine Interoperability)\nWhy is forcing an AI model to respond strictly in JSON (JavaScript Object Notation) essential when building multi-agent AI software pipelines?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In automated pipelines, an AI's output is often passed directly to a database, robot actuator, or secondary script. A conversational response like \"Sure! Here is the date: Monday\" breaks automated scripts. A structured JSON response {\"date\": \"2026-10-12\"} can be parsed deterministically and ingested seamlessly by software APIs.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-1-5",
                  "questionNumber": 5,
                  "questionText": "(Content Creation Ethics & Watermarking)\nWhat is the primary technical objective of embedding a Cryptographic Synthetic Watermark into AI-generated text and imagery?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "AI Watermarking (such as statistical token biases or invisible digital pixel signatures) provides cryptographic provenance. It allows automated detection tools to verify whether an essay or photo is synthetic, protecting academic integrity and mitigating the viral spread of deceptive synthetic media.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Content Creator",
              "scenario": "An automated system in AI Content Creator must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Voice in Generative Synthesis As generative models make writing essays, songs, and articles effortless: - Resist Cognitive Homogenization: When millions of people use the exact same LLM prompts, all written content begins to sound identical\u2014polite, smooth, and generic. - Preserve Your Uniq",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch5-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 2,
            "lessonTitle": "AI Learning Assistant",
            "syllabusReference": "GAIO-CLASS7-CH05-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Learning Assistant Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Socrates: The Knowledge Architect* > **Mission Briefing:** Alert at the Neo-Olympia Learning Laboratory! > A new AI homework helper app was launched across the school district. Within two weeks, teachers noticed a catastrophic trend: students' homework scores were 100%, but on independent proctored science exams, average scores dropped by 40%! > An audit revealed that the app was acting as a lazy \"Answer Vending Machine\". When a student asked: *\"What is the velocity of the falling apple?\"*, the app simply spat out: *\"4.9 m/s\"*. Students copied the answer, bypassed the mental struggle, and learned nothing! > You have been appointed **Lead Pedagogical AI Systems Engineer**! Your mission is to overhaul the study companion into a **Master Socratic Learning Assistant**! You must program an adaptive system that never gives the raw answer away, diagnoses student conceptual misconceptions, provides scaffolded hints, and schedules spaced revision to build true, lasting intellectual mastery. ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Learning Assistant.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Learning Assistant",
              "overview": "Key theoretical principles and architecture defining AI Learning Assistant.",
              "blocks": [
                {
                  "title": "The Ebbinghaus Forgetting Curve & Spaced Repetition",
                  "summary": "In 1885, psychologist Hermann Ebbinghaus discovered that human memory decays exponentially over time without review. Within 48 hours, students forget over 70% of newly learned concepts!",
                  "keyPoints": [
                    "Core principle behind The Ebbinghaus Forgetting Curve & Spaced Repetition",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Socratic Tutoring vs Spoon-Feeding",
                  "summary": "| Feature | Spoon-Feeding AI (Answer Machine) | Socratic Learning AI (Master Tutor) |\n| :--- | :--- | :--- |\n| Response to Question | Gives the final numerical answer or writes the complete essay immediately. | Asks a guiding, diagnostic question to uncover wh",
                  "keyPoints": [
                    "Core principle behind Socratic Tutoring vs Spoon-Feeding",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Threat of Cognitive Deskilling",
                  "summary": "Just as an athlete\u2019s leg muscles atrophy if they ride an electric wheelchair everywhere, human cognitive faculties (memory, logical reasoning, mental math, writing clarity) weaken if students outsource all thinking to AI.\n- The Golden AI Rule: Use AI as a Ment",
                  "keyPoints": [
                    "**The Golden AI Rule:** **Use AI as a Mental Bicycle, Not a Mental Bed.** A bicycle allows your legs to travel 10x faste",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Learning Assistant Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Learning Assistant.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Socratic Tutor Experiment",
              "engineType": " Pedagogical Persona Calibration & Student Triage Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Socratic Tutor Experiment.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Learning Assistant Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 5 LESSON 2\n# ADAPTIVE LEARNING: LEITNER SPACED REPETITION & SOCRATIC HINT ENGINE\n# =====================================================================\n\nclass LeitnerFlashcardScheduler:\n    \"\"\"\n    Simulates a 3-Box Leitner Spaced Repetition System:\n    - Box 1: New / Difficult cards (Reviewed every day).\n    - Box 2: Moderate cards (Reviewed every 3 days).\n    - Box 3: Mastered cards (Reviewed every 7 days).\n    Correct answer promotes a card up one box; Incorrect demotes back to Box 1!\n    \"\"\"\n    def __init__(self):\n        self.boxes = {1: [], 2: [], 3: []}\n\n    def add_card(self, concept_id, question, hints, answer):\n        card = {\n            \"id\": concept_id,\n            \"question\": question,\n            \"hints\": hints,\n            \"answer\": answer,\n            \"current_box\": 1\n        }\n        self.boxes[1].append(card)\n\n    def process_review(self, card, answered_correctly):\n        current = card[\"current_box\"]\n        self.boxes[current].remove(card)\n        \n        if answered_correctly:\n            new_box = min(3, current + 1)\n            card[\"current_box\"] = new_box\n            self.boxes[new_box].append(card)\n            return f\"\ud83c\udf1f PROMOTED to Box {new_box} (Next review in {[1, 3, 7][new_box-1]} days!)\"\n        else:\n            card[\"current_box\"] = 1\n            self.boxes[1].append(card)\n            return \"\ud83d\udd01 DEMOTED to Box 1 (Scheduled for immediate daily review).\"\n\ndef get_socratic_hint(card, attempt_number):\n    \"\"\"\n    Returns progressive scaffolded hints without revealing the answer.\n    \"\"\"\n    hints = card[\"hints\"]\n    if attempt_number <= len(hints):\n        return f\"\ud83d\udca1 Socratic Hint #{attempt_number}: {hints[attempt_number - 1]}\"\n    else:\n        return f\"\ud83e\udd14 Let's break it down: Review the fundamental concept: {card['question']}\"\n\n# ----------------- SIMULATED ADAPTIVE STUDY SESSION -----------------\nscheduler = LeitnerFlashcardScheduler()\n\n# Add science concept cards\nscheduler.add_card(\n    concept_id=\"SCI-01\",\n    question=\"What is the unit of electric resistance?\",\n    hints=[\n        \"It sounds like a meditative sound used in yoga ('O...').\",\n        \"It is named after the German physicist Georg Simon ____.\",\n        \"The Greek symbol is Omega (\u03a9).\"\n    ],\n    answer=\"Ohm\"\n)\n\ncard = scheduler.boxes[1][0]\nprint(\"=== SOCRATIC STUDY SESSION: ADAPTIVE TUTOR ===\\n\")\nprint(f\"Concept Challenge: {card['question']}\")\n\n# Simulated Student Attempts\nprint(get_socratic_hint(card, attempt_number=1))\nprint(\"Student Guess: 'Watt?' -> \u274c Incorrect.\")\n\nprint(get_socratic_hint(card, attempt_number=2))\nprint(\"Student Guess: 'Ohm!' -> \u2705 Correct!\")\n\noutcome = scheduler.process_review(card, answered_correctly=True)\nprint(f\"\\nTelemetry Update: {outcome}\")\n\nprint(\"\\n--- CURRENT LEITNER SYSTEM STATE ---\")\nfor b in [1, 2, 3]:\n    print(f\"Box {b} (Review interval {[1, 3, 7][b-1]} days) : {len(scheduler.boxes[b])} cards\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-5-2-1",
                  "questionNumber": 1,
                  "questionText": "(Cognitive Learning Science)\nAccording to the Ebbinghaus Forgetting Curve, what happens to newly acquired conceptual information if a student does not engage in periodic, spaced active recall?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Ebbinghaus\u2019s empirical memory research established that biological human memory undergoes rapid exponential decay immediately following learning. Spaced Repetition combats this forgetting curve by scheduling active review sessions just as memory retention is beginning to drop.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-2-2",
                  "questionNumber": 2,
                  "questionText": "(Pedagogical AI Architectures)\nWhy is an AI homework helper that immediately supplies full, completed mathematical solutions detrimental to a student's cognitive development?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In cognitive psychology, learning requires mental effort (retrieval practice and schema construction). Passively copying machine-generated solutions gives the student an illusion of competence (feeling like they understand because the answer looks easy on paper) while completely failing to build independent neural problem-solving pathways.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-2-3",
                  "questionNumber": 3,
                  "questionText": "(Spaced Repetition Algorithms)\nIn a 3-Box Leitner Spaced Repetition System, what happens to a flashcard when a student fails to recall the correct answer during a review session?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The Leitner system is an adaptive queue algorithm: cards answered correctly advance to higher boxes with exponentially longer review intervals (e.g., Day 1 \u2794 Day 3 \u2794 Day 7). Any incorrect response immediately resets the card to Box 1, ensuring difficult concepts receive maximum review frequency.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Socratic Scaffolding)\nA student asks an AI tutor: \"Why does ice float on liquid water?\"  \nWhich of the following responses adheres most strictly to the Socratic Method?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The Socratic method utilizes Inquiry-Based Scaffolding. Rather than declaring the raw fact, Response B poses targeted guiding questions that prompt the student to connect molecular arrangement with the concept of density, allowing the student to deduce the scientific conclusion themselves.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-5-2-5",
                  "questionNumber": 5,
                  "questionText": "(Cognitive Deskilling in the Workplace)\nWhat is the long-term risk of Cognitive Deskilling in professionals who rely entirely on automated AI tools for all critical analysis and writing?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Cognitive Deskilling occurs when humans become so dependent on automation that their own baseline skills atrophy. If an engineer loses the ability to perform back-of-the-envelope calculations or trace code manually, they become completely blind to subtle algorithmic failures, creating dangerous vulnerabilities in safety-critical systems.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Learning Assistant",
              "scenario": "An automated system in AI Learning Assistant must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Agency of the Human Mind As automated assistants become ever more capable: - You Are the Pilot: The AI is an instrument gauge on your intellectual dashboard, but you are the pilot steering the aircraft of your education. - Take Pride in the Struggle: Confusion and difficulty are not signs of fai",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class7-ch6",
        "chapterNumber": 6,
        "title": "Responsible AI",
        "description": "Fact, Fake or AI? & Fairness Matters",
        "icon": "Scale",
        "lessons": [
          {
            "id": "class7-ch6-l1",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 1,
            "lessonTitle": "Fact, Fake or AI?",
            "syllabusReference": "GAIO-CLASS7-CH06-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Fact, Fake or AI? Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Chimera: The Digital Forensics Vault* > **Mission Briefing:** High-Priority Alert at the Cyber-Forensics Taskforce! > An international diplomatic crisis is unfolding! An audio recording and video clip have surfaced on social media depicting an ambassador from the Oceanic Republic purportedly admitting to an illegal maritime oil spill: *\"We dumped the barrels at midnight, and nobody can prove it.\"* > Markets are panicking, environmental protests have erupted outside embassies, and international sanctions are being drafted! > However, the ambassador claims the video is a total synthetic frame-job created by an adversarial hacker collective using neural voice cloning and face-swapping diffusion algorithms! > As the **Lead Digital Forensics Examiner**, the United Nations has brought the raw video file to your lab. Your mission is to enter the *Misinformation Forensics Lab*, analyze lighting vectors, decode audio spectral frequencies, inspect cryptographic file metadata, and deliver the definitive technical verdict: **Authentic Fact, Malicious Cheapfake, or AI-Synthesized Fabrication?** ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Fact, Fake or AI?.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Fact, Fake or AI?",
              "overview": "Key theoretical principles and architecture defining Fact, Fake or AI?.",
              "blocks": [
                {
                  "title": "Deepfakes vs Cheapfakes",
                  "summary": "Not all misinformation requires a supercomputer. Digital media falls into distinct manipulative tiers:",
                  "keyPoints": [
                    "Core principle behind Deepfakes vs Cheapfakes",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Forensic Detection Techniques",
                  "summary": "| Forensic Method | What the Investigator Checks | What Synthetic Media Reveals |\n| :--- | :--- | :--- |\n| EXIF Metadata Inspection | Camera model, shutter speed, GPS location, creation software embedded in the file headers. | AI generators often leave metadat",
                  "keyPoints": [
                    "Core principle behind Forensic Detection Techniques",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The C2PA Standard: Digital Nutrition Labels",
                  "summary": "To combat deepfakes, global tech and media organizations established C2PA (Coalition for Content Provenance and Authenticity):\n- When a verified photo is taken by a modern camera, a cryptographic digital certificate is baked into the file.\n- It acts like a Dig",
                  "keyPoints": [
                    "When a verified photo is taken by a modern camera, a cryptographic digital certificate is baked into the file.",
                    "It acts like a **Digital Nutrition Label**: proving the exact camera serial number, date, location, and listing every Ph",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Fact, Fake or AI? Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Fact, Fake or AI?.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Misinformation Forensics Lab",
              "engineType": " Digital Evidence Workbench & Forensic Authentication Gauntlet.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Misinformation Forensics Lab.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-3",
                  "levelNumber": 3,
                  "title": "-",
                  "evidence": "Target system exhibits ambiguous pattern.",
                  "choices": [
                    {
                      "id": "ch-3-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-3-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Fact, Fake or AI? Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 6 LESSON 1\n# DIGITAL FORENSICS: EXIF & METADATA AUTHENTICITY AUDITOR\n# =====================================================================\n\ndef audit_media_authenticity(media_file_header):\n    \"\"\"\n    Audits media header telemetry for synthetic generation markers:\n    1. Checks for known AI generator signatures in 'software' metadata tag.\n    2. Validates presence of physical camera hardware tags (Make, Model, Lens).\n    3. Checks for C2PA cryptographic provenance certificates.\n    \"\"\"\n    forensic_score = 100  # Starts with full presumption of authenticity\n    flags = []\n    \n    # 1. Known AI Generator Signature Scan\n    software = media_file_header.get(\"software\", \"\").lower()\n    known_ai_tools = [\"midjourney\", \"stable diffusion\", \"dall-e\", \"novelai\", \"comfyui\", \"flux\"]\n    \n    ai_signature_found = any(tool in software for tool in known_ai_tools)\n    if ai_signature_found:\n        forensic_score -= 80\n        flags.append(f\"\ud83d\udea8 DIRECT AI SIGNATURE: Generated by '{media_file_header.get('software')}'\")\n        \n    # 2. Hardware Sensor Fingerprint Check\n    has_camera_make = \"camera_make\" in media_file_header and media_file_header[\"camera_make\"] is not None\n    has_shutter_speed = \"shutter_speed\" in media_file_header and media_file_header[\"shutter_speed\"] is not None\n    \n    if not has_camera_make or not has_shutter_speed:\n        forensic_score -= 35\n        flags.append(\"\u26a0\ufe0f SUSPICIOUS: Lacks physical camera hardware EXIF tags (No Make/Model/Shutter).\")\n    else:\n        flags.append(f\"\u2705 Hardware Validated: Captured on {media_file_header['camera_make']} {media_file_header.get('camera_model', '')}\")\n        \n    # 3. C2PA Cryptographic Provenance Check\n    has_c2pa = media_file_header.get(\"c2pa_manifest_verified\", False)\n    if has_c2pa:\n        forensic_score += 20\n        flags.append(\"\ud83d\udee1\ufe0f C2PA VERIFIED: Cryptographic origin certificate valid and untampered.\")\n    else:\n        flags.append(\"\u2139\ufe0f C2PA Notice: No cryptographic provenance manifest attached.\")\n\n    final_trust_index = max(0, min(100, forensic_score))\n    \n    if final_trust_index >= 80:\n        verdict = \"AUTHENTIC PHYSICAL MEDIA\"\n    elif final_trust_index >= 45:\n        verdict = \"AMBIGUOUS / UNVERIFIED ORIGIN (Requires Visual Forensic Review)\"\n    else:\n        verdict = \"SYNTHETIC AI-GENERATED MEDIA / TAMPERED ARTIFACT\"\n        \n    return final_trust_index, verdict, flags\n\n# ----------------- SIMULATED EVIDENCE AUDIT RUN -----------------\nevidence_item_1 = {\n    \"filename\": \"diplomatic_confession_leaked.mp4\",\n    \"software\": \"ComfyUI_v0.2.1_NeuralVoiceClone\",\n    \"camera_make\": None,\n    \"shutter_speed\": None,\n    \"c2pa_manifest_verified\": False\n}\n\nevidence_item_2 = {\n    \"filename\": \"hurricane_satellite_noaa.jpg\",\n    \"software\": \"Adobe Photoshop 2026 (Color Grade)\",\n    \"camera_make\": \"GOES-16 Satellite Imaging Sensor\",\n    \"camera_model\": \"Advanced Baseline Imager (ABI)\",\n    \"shutter_speed\": \"1/2000s\",\n    \"c2pa_manifest_verified\": True\n}\n\nprint(\"=== CYBER-FORENSICS TASKFORCE INGESTION AUDIT ===\\n\")\nfor idx, item in enumerate([evidence_item_1, evidence_item_2], 1):\n    print(f\"Evidence Item #{idx}: '{item['filename']}'\")\n    trust, decision, details = audit_media_authenticity(item)\n    print(f\"Trust Index: {trust}/100 \u2794 Verdict: {decision}\")\n    for d in details:\n        print(f\"  \u2022 {d}\")\n    print(\"-\" * 65)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-6-1-1",
                  "questionNumber": 1,
                  "questionText": "(Digital Media Terminology)\nWhat is the defining technical distinction between a Deepfake and a Cheapfake (Shallow Fake)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In digital disinformation studies, Cheapfakes (or Shallow Fakes) require no machine learning\u2014they involve low-tech deceptions like slowing down video footage to make someone appear inebriated or captioning a 2016 photo as a 2026 event. Deepfakes rely on deep neural networks to synthesize realistic human likenesses, voice clones, or entirely artific",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-1-2",
                  "questionNumber": 2,
                  "questionText": "(Visual Forensics & Anatomy)\nWhen inspecting a suspected AI-generated photograph of a crowd of people, which anatomical region is most notorious for exhibiting neural diffusion artifacts and spatial glitches?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Generative diffusion models learn 2D statistical distributions of pixels rather than 3D anatomical skeletal mechanics. Consequently, regions of high geometric complexity\u2014such as hands, interlocking fingers, teeth, and matching corneal eye reflections\u2014frequently display telltale warping, extra digits, or inconsistent perspective lines.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-1-3",
                  "questionNumber": 3,
                  "questionText": "(Provenance & Standards)\nWhat is the primary function of the C2PA (Coalition for Content Provenance and Authenticity) industry standard?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "C2PA is an open technical standard that creates a cryptographic audit trail for digital media. Think of it as a tamper-proof digital passport attached to an image that cryptographically certifies whether the photo was taken by a real camera, edited in Photoshop, or generated by an AI model.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: The \"Liar's Dividend\")\nIn media forensics and political philosophy, what is the dangerous phenomenon known as the \"Liar's Dividend\"?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Coined by legal scholars Bobby Chesney and Danielle Citron, the Liar's Dividend occurs when the mere possibility of deepfakes degrades public trust to such an extent that bad actors can dismiss real, damning evidence of corruption or crimes as \"just an AI fabrication\", leaving the public uncertain of what to believe.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-1-5",
                  "questionNumber": 5,
                  "questionText": "(Acoustic Forensics)\nWhen evaluating a suspected AI-cloned audio voicemail, which acoustic feature in the frequency spectrum provides the strongest clue of synthetic generation?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Human speech is an organic biological process driven by vocal cords, lung breath cycles, and mouth acoustics. Voice-cloning models often produce synthetic pitch contours that are unnaturally smooth, omit micro-breaths between phrases, and exhibit spectral compression artifacts in the high-frequency bands ($>8\\text{ kHz}$).\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Fact, Fake or AI?",
              "scenario": "An automated system in Fact, Fake or AI? must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 1: Fact, Fake or AI? Syllabus Reference: Class 7, Chapter 6 (Responsible AI) \u2014 Lesson 1: Fact, Fake or AI? Target Age Group: 12\u201313 Years (Middle Level Intermediate) Estimated Duration: 45\u201360 Minutes",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class7-ch6-l2",
            "classKey": "class7",
            "classTitle": "Class 7",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 2,
            "lessonTitle": "Fairness Matters",
            "syllabusReference": "GAIO-CLASS7-CH06-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Fairness Matters Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Equal Opportunity: The Hiring Algorithm Audit* > **Mission Briefing:** High-Stakes Audit at Mega-Corp Global! > Mega-Corp receives 100,000 job applications every year for engineering roles. To speed up hiring, company executives deployed an AI resume-screening bot called *Talent-AI*, trained on 15 years of past company hiring records. > The executive team bragged that the system was \"100% objective, neutral, and scientific because computers have no feelings.\" > However, an internal whistle-blower leaked disturbing data: across 10,000 recent female applicants, *Talent-AI* recommended hiring at an 80% lower rate than identical male applicants! The AI even secretly penalized resumes containing the word *\"Women's\"* (such as *\"Captain of the Women's Chess Club\"*). > You have been appointed as the **Independent Algorithmic Justice Auditor**! Your mission is to enter the *Fair Hiring Lab*, audit the algorithm's neural weights, compute the Disparate Impact Ratio, expose the hidden bias, and rebalance the model to ensure fair, equal opportunities for all qualified candidates! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Fairness Matters.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Fairness Matters",
              "overview": "Key theoretical principles and architecture defining Fairness Matters.",
              "blocks": [
                {
                  "title": "The Myth of Machine Objectivity",
                  "summary": "Algorithms are not magical, neutral entities that fall from the heavens. Algorithms are created by humans, trained on human data, and optimized for human-defined goals:",
                  "keyPoints": [
                    "Core principle behind The Myth of Machine Objectivity",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Landmark Case Study: The MIT *Gender Shades* Audit",
                  "summary": "In 2018, computer scientist Joy Buolamwini conducted a historic audit of commercial facial recognition systems developed by major tech corporations:\n- Lighter-skinned Males: Model error rate was under 0.8% (Virtually flawless).\n- Lighter-skinned Females: Model",
                  "keyPoints": [
                    "**Lighter-skinned Males:** Model error rate was under **0.8%** (Virtually flawless).",
                    "**Lighter-skinned Females:** Model error rate was roughly **7.0%**.",
                    "**Darker-skinned Males:** Model error rate was roughly **12.0%**.",
                    "**Darker-skinned Females:** Model error rate surged to **34.7%!** (Failed on more than 1 out of 3 faces!)."
                  ]
                },
                {
                  "title": "Mathematical Fairness Metric: The Disparate Impact Ratio",
                  "summary": "In legal civil rights and computational auditing, the Disparate Impact Ratio (DIR) measures whether an automated selection system unfairly disadvantages a protected demographic group:",
                  "keyPoints": [
                    "**The Legal 80% (Four-Fifths) Rule:**",
                    "- If $\\text{DIR} \\ge 0.80$ (80%), the system is legally considered to meet baseline fairness parity.",
                    "- If $\\text{DIR} < 0.80$, the algorithm is flagged for **Severe Adverse Impact / Algorithmic Discrimination!**",
                    "Male Applicants: 1,000 applied \u2794 300 selected (Selection Rate = 300 / 1000 = 30.0%)"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Fairness Matters Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Fairness Matters.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Fair Hiring Algorithm Audit",
              "engineType": " Algorithmic De-Biasing & Policy Optimization Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Fair Hiring Algorithm Audit.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Fairness Matters Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 7: CHAPTER 6 LESSON 2\n# RESPONSIBLE AI: DISPARATE IMPACT & ALGORITHMIC FAIRNESS AUDITOR\n# =====================================================================\n\ndef calculate_disparate_impact(applicant_records, protected_attribute, target_decision=\"APPROVED\"):\n    \"\"\"\n    Computes selection rates and Disparate Impact Ratio (DIR) across demographic subgroups.\n    Evaluates compliance against the legal 80% (Four-Fifths) Fair Hiring Rule.\n    \"\"\"\n    subgroup_counts = {}\n    subgroup_selections = {}\n    \n    # 1. Tally applicants and positive selections per subgroup\n    for person in applicant_records:\n        group = person[protected_attribute]\n        decision = person[\"decision\"]\n        \n        subgroup_counts[group] = subgroup_counts.get(group, 0) + 1\n        if decision == target_decision:\n            subgroup_selections[group] = subgroup_selections.get(group, 0) + 1\n            \n    # 2. Compute selection rates\n    selection_rates = {}\n    for group in subgroup_counts:\n        approved = subgroup_selections.get(group, 0)\n        total = subgroup_counts[group]\n        selection_rates[group] = approved / total\n\n    # Identify advantaged (highest rate) and protected (lowest rate) groups\n    sorted_groups = sorted(selection_rates.items(), key=lambda x: x[1], reverse=True)\n    advantaged_group, highest_rate = sorted_groups[0]\n    protected_group, lowest_rate = sorted_groups[-1]\n    \n    # 3. Calculate Disparate Impact Ratio (DIR)\n    dir_ratio = lowest_rate / highest_rate if highest_rate > 0 else 1.0\n    passes_four_fifths_rule = dir_ratio >= 0.80\n\n    return {\n        \"selection_rates\": selection_rates,\n        \"advantaged_group\": advantaged_group,\n        \"protected_group\": protected_group,\n        \"dir_ratio\": round(dir_ratio, 3),\n        \"compliant\": passes_four_fifths_rule\n    }\n\n# ----------------- SIMULATED CORPORATE APPLICANT AUDIT -----------------\n# 10 Simulated applicants evaluated by Talent-AI\ncorporate_applicants = [\n    {\"id\": \"APP-01\", \"gender\": \"Male\",   \"gpa\": 3.8, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-02\", \"gender\": \"Male\",   \"gpa\": 3.7, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-03\", \"gender\": \"Male\",   \"gpa\": 3.5, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-04\", \"gender\": \"Male\",   \"gpa\": 3.4, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-05\", \"gender\": \"Male\",   \"gpa\": 3.9, \"decision\": \"APPROVED\"},  # Male rate = 4/5 = 80%\n    {\"id\": \"APP-06\", \"gender\": \"Female\", \"gpa\": 3.9, \"decision\": \"APPROVED\"},\n    {\"id\": \"APP-07\", \"gender\": \"Female\", \"gpa\": 3.8, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-08\", \"gender\": \"Female\", \"gpa\": 3.7, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-09\", \"gender\": \"Female\", \"gpa\": 3.6, \"decision\": \"REJECTED\"},\n    {\"id\": \"APP-10\", \"gender\": \"Female\", \"gpa\": 3.8, \"decision\": \"REJECTED\"}   # Female rate = 1/5 = 20%\n]\n\nprint(\"=== MEGA-CORP TALENT-AI ALGORITHMIC BIAS AUDIT ===\\n\")\naudit_result = calculate_disparate_impact(corporate_applicants, protected_attribute=\"gender\")\n\nprint(\"Subgroup Selection Rates:\")\nfor grp, rate in audit_result[\"selection_rates\"].items():\n    print(f\"  \u2022 Group '{grp}': {rate * 100:.1f}% approved\")\n    \nprint(\"-\" * 55)\nprint(f\"Advantaged Cohort : {audit_result['advantaged_group']}\")\nprint(f\"Disadvantaged Cohort : {audit_result['protected_group']}\")\nprint(f\"Disparate Impact Ratio (DIR) : {audit_result['dir_ratio']} ({audit_result['dir_ratio'] * 100:.1f}%)\")\nprint(f\"Legal 80% Rule Compliance   : {'\u2705 COMPLIANT' if audit_result['compliant'] else '\ud83d\udea8 NON-COMPLIANT (ILLEGALLY BIASED)'}\")\n\nif not audit_result[\"compliant\"]:\n    print(\"\\nAuditor Mandate: Immediate suspension of automated hiring filter required!\")\n    print(\"Action: Remove proxy penalties and re-train model with balanced historical weights.\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class7-6-2-1",
                  "questionNumber": 1,
                  "questionText": "(Algorithmic Bias Foundations)\nIf an AI system trained to evaluate bank mortgages consistently rejects applicants from specific ethnic minorities at twice the rate of other applicants with identical financial incomes, what is the fundamental cause?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "An algorithm is not sentient; it reflects the statistical patterns present in the data supplied by humans. When models are trained on historical institutional lending data where minority communities were systematically disadvantaged (redlining), the model faithfully replicates and amplifies that historical discrimination under the guise of \"objecti",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-2-2",
                  "questionNumber": 2,
                  "questionText": "(Legal & Statistical Metrics: Disparate Impact)\nUnder the legal Four-Fifths (80%) Rule, if a company's automated hiring AI approves 50% of male applicants, what is the minimum acceptable selection rate for female applicants required to avoid an immediate finding of adverse discri",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-2-3",
                  "questionNumber": 3,
                  "questionText": "(Empirical Auditing: Joy Buolamwini's Gender Shades)\nIn the landmark MIT Gender Shades study, what primary data defect caused commercial facial recognition systems from leading global tech corporations to misclassify darker-skinned women nearly 35% of the time while achieving 99%",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Machine learning models cannot accurately recognize features they have never seen during training. Because the benchmark datasets (like IJB-A and LFW) were predominantly compiled from public photos of white male executives and celebrities, the models lacked diverse facial representations, resulting in catastrophic error rates for darker-skinned wom",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: The \"Fairness Through Unawareness\" Fallacy)\nWhy is simply deleting sensitive demographic columns (like \"Race\", \"Religion\", or \"Gender\") from a training dataset insufficient to eliminate algorithmic discrimination?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Fairness through Unawareness is a well-documented failure mode in machine learning. Complex high-dimensional datasets contain rich correlated proxy signals. An algorithm does not need an explicit \"Race\" column if it has access to geographic zip codes, grocery buying habits, and high school names that are demographically segregated.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class7-6-2-5",
                  "questionNumber": 5,
                  "questionText": "(Remediation & Algorithmic De-Biasing)\nWhich engineering intervention is considered a proactive, responsible method for mitigating algorithmic bias in a computer vision dataset?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Meaningful algorithmic de-biasing requires proactive engineering: curating inclusive, balanced datasets, ensuring balanced representation across all demographic intersections, stress-testing models on adversarial subgroups, and continuously monitoring real-world deployment for disparate impact.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Fairness Matters",
              "scenario": "An automated system in Fairness Matters must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 2: Fairness Matters Syllabus Reference: Class 7, Chapter 6 (Responsible AI) \u2014 Lesson 2: Fairness Matters Target Age Group: 12\u201313 Years (Middle Level Intermediate) Estimated Duration: 45\u201360 Minutes",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "classKey": "class8",
    "className": "Class 8",
    "ageGroup": "Grade 8 \u2022 Ages 13\u201314",
    "subtitle": "Decision Boundaries, Applied System Architecture & Data Rights",
    "accentColor": "#f59e0b",
    "chapters": [
      {
        "id": "class8-ch1",
        "chapterNumber": 1,
        "title": "AI Basics",
        "description": "How AI Makes Choices & Learning from Data",
        "icon": "Network",
        "lessons": [
          {
            "id": "class8-ch1-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 1,
            "lessonTitle": "How AI Makes Choices",
            "syllabusReference": "GAIO-CLASS8-CH01-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "How AI Makes Choices Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Asteroid Intercept: Deep-Space Orbital Shield* > **Mission Briefing:** Urgent Alert from Planetary Defense Command! > The Lunar Early Warning Radar Array has detected an incoming cluster of 50 fast-moving deep-space astronomical bodies hurtling toward Earth's orbital path! > Some of these objects are harmless **\"Ice-Comets\"** that will vaporize harmlessly in the upper atmosphere. Others are hyper-dense, metallic **\"Iron-Asteroids\"** capable of devastating a continent upon impact! > Planetary defense kinetic lasers have only enough electrical charge to destroy 12 targets. If the defense AI misidentifies an Iron Asteroid as an Ice Comet, millions of lives are at risk. If it wastes laser shots on harmless ice, the battery will be exhausted when the real threat arrives! > As the **Chief Ballistic AI Architect**, your mission is to design the **Mathematical Decision Boundary**, tune the classification confidence thresholds, and program the laser targeting engine to intercept every metallic hazard without wasting a single joule of energy! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of How AI Makes Choices.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "How AI Makes Choices",
              "overview": "Key theoretical principles and architecture defining How AI Makes Choices.",
              "blocks": [
                {
                  "title": "What is a Decision Boundary?",
                  "summary": "When an AI model makes a choice between two categories (e.g., Cat vs Dog, Spam vs Not Spam, Asteroid vs Comet), it plots every example as a coordinate point in Feature Space:",
                  "keyPoints": [
                    "**Feature Space:** A geometric space where each axis corresponds to a measurable feature (e.g., Axis $X$ = Velocity, Axi",
                    "**Decision Boundary:** The mathematical line, plane, or curved hyperplane that separates one class from another.",
                    "- If a mystery object lands **above** the boundary line \u2794 Classified as **Iron-Asteroid**.",
                    "- If it lands **below** the boundary line \u2794 Classified as **Ice-Comet**."
                  ]
                },
                {
                  "title": "The Linear Decision Formula",
                  "summary": "In a 2-feature system ($x1$ = Velocity, $x2$ = Density), a linear classifier calculates a Weighted Sum:",
                  "keyPoints": [
                    "$w_1, w_2$: **Feature Weights** (how important each feature is in making the choice).",
                    "$b$: **Bias Term** (shifts the decision threshold up or down).",
                    "**Decision Rule:**",
                    "- If $z \\ge 0 \\implies \\text{Class: Iron-Asteroid}$"
                  ]
                },
                {
                  "title": "Confidence Scores & Threshold Tuning ($\\tau$)",
                  "summary": "Instead of just outputting a rigid label, modern AI models calculate a Probability / Confidence Score $P(\\text{Threat})$ between 0.0 (0%) and 1.0 (100%):\n- By default, standard computer systems use a threshold of $\\tau = 0.50$ (50%).\n- In High-Stakes Safety Sy",
                  "keyPoints": [
                    "By default, standard computer systems use a threshold of $\\tau = 0.50$ (50%).",
                    "**In High-Stakes Safety Systems (Planetary Defense / Cancer Detection):**",
                    "- We do NOT wait for 50% probability! If there is even a **15% chance** ($\\tau = 0.15$) of an asteroid being metallic ir",
                    "- **Lowering Threshold ($\\tau \\downarrow$):** Catches every true threat (High Recall), but increases False Alarms."
                  ]
                }
              ]
            },
            "experiment": {
              "title": "How AI Makes Choices Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for How AI Makes Choices.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Decision Boundary Architect",
              "engineType": " 2D Scatter Plot Geometry & Hyperplane Optimization Puzzle.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Decision Boundary Architect.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "How AI Makes Choices Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 1 LESSON 1\n# MATHEMATICAL DECISION BOUNDARY & ORBITAL HAZARD CLASSIFIER\n# =====================================================================\n\ndef evaluate_asteroid_threat(velocity_kms, density_gcc, weight_v=1.2, weight_d=2.5, bias=-18.0, threshold=0.0):\n    \"\"\"\n    Computes a linear decision score for an approaching celestial object.\n    Boundary Formula: z = (w_v * Velocity) + (w_d * Density) + Bias\n    If z >= threshold: Classified as DANGEROUS METALLIC ASTEROID\n    Else: Classified as HARMLESS ICE COMET\n    \"\"\"\n    # 1. Compute linear weighted score\n    z_score = (weight_v * velocity_kms) + (weight_d * density_gcc) + bias\n    \n    # 2. Convert z_score to a probabilistic confidence score using sigmoid\n    import math\n    try:\n        probability = 1.0 / (1.0 + math.exp(-z_score))\n    except OverflowError:\n        probability = 1.0 if z_score > 0 else 0.0\n        \n    is_threat = z_score >= threshold\n    \n    return {\n        \"z_score\": round(z_score, 2),\n        \"probability\": round(probability * 100, 1),\n        \"is_threat\": is_threat,\n        \"action\": \"\ud83d\udca5 FIRE DEFENSE LASER\" if is_threat else \"\ud83d\udef8 HOLD FIRE (Harmless Ice)\"\n    }\n\n# ----------------- SIMULATED CELESTIAL TARGET STREAM -----------------\n# Target telemetry: [Name, Velocity (km/s), Density (g/cm\u00b3)]\ntargets = [\n    {\"id\": \"Obj-Alpha\", \"vel\": 12.0, \"density\": 1.2},  # Fast but light ice comet\n    {\"id\": \"Obj-Beta\",  \"vel\": 8.5,  \"density\": 7.8},  # Dense nickel-iron asteroid\n    {\"id\": \"Obj-Gamma\", \"vel\": 14.5, \"density\": 5.4},  # Extremely fast, heavy rock\n    {\"id\": \"Obj-Delta\", \"vel\": 4.0,  \"density\": 0.9}   # Slow fluffy snow comet\n]\n\nprint(\"=== PLANETARY DEFENSE ORBITAL DECISION BOUNDARY RUN ===\\n\")\nprint(f\"Active Model Weights: w_Velocity = 1.2 | w_Density = 2.5 | Bias = -18.0\\n\")\nprint(f\"{'OBJECT ID':<11} | {'VEL (km/s)':<11} | {'DENSITY':<10} | {'Z-SCORE':<9} | {'PROBABILITY':<12} | {'DECISION'}\")\nprint(\"-\" * 75)\n\nfor t in targets:\n    result = evaluate_asteroid_threat(t[\"vel\"], t[\"density\"])\n    print(f\"{t['id']:<11} | {t['vel']:<11.1f} | {t['density']:<10.1f} | {result['z_score']:<9.2f} | {result['probability']:<5.1f}%      | {result['action']}\")\n\nprint(\"-\" * 75)\nprint(\"Analysis: Obj-Beta and Obj-Gamma cleanly classified above boundary (z >= 0)!\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-1-1-1",
                  "questionNumber": 1,
                  "questionText": "(Decision Boundaries & Hyperplanes)\nIn machine learning geometric theory, what is a Decision Boundary?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In supervised classification, the model maps input feature vectors into an $n$-dimensional Euclidean space. The Decision Boundary is the learned mathematical manifold (a 1D line in 2D space, a 2D plane in 3D space, or a hyperplane in higher dimensions) where the predicted class probabilities are exactly equal ($P = 0.50$).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-1-2",
                  "questionNumber": 2,
                  "questionText": "(Feature Weight Interpretation)\nIn a linear credit loan approval model governed by the equation:\n$$z = (0.8 \\times \\text{Income}) - (2.5 \\times \\text{Unpaid Debt}) + (1.2 \\times \\text{Savings}) - 50$$\nWhat does the negative weight coefficient ($-2.5$) for Unpaid Debt signify?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In linear models, the sign and magnitude of a feature weight determine its directional influence. A positive weight increases the target outcome; a negative weight ($-2.5$) penalizes the score, pulling the applicant's coordinate down away from the loan approval decision boundary.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-1-3",
                  "questionNumber": 3,
                  "questionText": "(Threshold Calibration & Risk Trade-offs)\nA cancer diagnostic AI outputs a malignancy risk probability $P(\\text{Cancer})$ between $0.0$ and $1.0$. The default software threshold is $\\tau = 0.50$. Why do hospital oncologists deliberately lower the diagnostic decision threshold to ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Threshold selection reflects real-world asymmetric risk. The penalty of a False Negative in cancer screening is death; the penalty of a False Positive is an unnecessary follow-up ultrasound. Lowering $\\tau$ to 0.15 catches every possible malignancy early, prioritizing patient survival.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: The Black Box Dilemma)\nA deep neural network containing 500 million parameters achieves 99.4% accuracy predicting which parole applicants will commit future crimes. However, the algorithm cannot provide an interpretable reason why Applicant $X$ was rejecte",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Complex deep neural models are often Black Boxes: while highly accurate at mapping inputs to outputs, their millions of non-linear parameter interactions make it mathematically impossible for human judges or doctors to trace the exact rationale behind a specific individual decision, conflicting directly with democratic legal rights to explanation.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-1-5",
                  "questionNumber": 5,
                  "questionText": "(Non-Linear Decision Boundaries)\nSuppose a 2D dataset consists of a cluster of blue points centered at $(0, 0)$ completely surrounded by a circular outer ring of red points. Can a standard single-line linear classifier cleanly separate the two classes?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "This is the famous XOR / Concentric Circle Problem that historic perceptrons could not solve. A single straight line cannot separate an inner circle from an enclosing outer ring. Handling non-linear topology requires multi-layer neural networks or kernel transformations that project the data into higher dimensions.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: How AI Makes Choices",
              "scenario": "An automated system in How AI Makes Choices must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Right to an Explanation (XAI) When machines make life-altering choices: - No Invisible Judgments: In medicine, criminal sentencing, and university admissions, a human being should never be denied their future because \"the neural network calculated a negative score\". - Explainable AI (XAI) ",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch1-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_1_AI_Basics",
            "chapterNumber": 1,
            "chapterTitle": "AI Basics",
            "lessonNumber": 2,
            "lessonTitle": "Learning from Data",
            "syllabusReference": "GAIO-CLASS8-CH01-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Learning from Data Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Vital-Scan: The Pandemic Screening Center* > **Mission Briefing:** Emergency at the Central Biosecurity Center! > A novel respiratory airborne pathogen, the *Nebula-Flu*, has emerged at the international transit terminal. > A high-tech medical startup delivered an automated AI thermal scanner claiming: *\"Our model achieves 98% accuracy on hospital trial data!\"* > However, on the first day of real-world deployment, disaster struck! The AI let 20 infected passengers walk freely onto commercial flights (Fatal False Negatives!), while detaining 500 perfectly healthy travelers in isolation rooms (Costly False Positives!). > As the **Chief Clinical AI Quality Auditor**, you have been called in to investigate. You must look beyond simple accuracy numbers, perform a rigorous **Train/Test Audit**, construct the **Confusion Matrix**, calculate Precision and Recall, and re-tune the diagnostic model before an uncontrolled epidemic spreads across the globe! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Learning from Data.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Learning from Data",
              "overview": "Key theoretical principles and architecture defining Learning from Data.",
              "blocks": [
                {
                  "title": "Why Accuracy is Not Enough (The Accuracy Paradox)",
                  "summary": "Suppose you are screening for a rare disease that infects only 1 out of every 1,000 people (a 0.1% infection rate).\nAn engineer creates a lazy, brainless AI program that consists of a single line:\ndef diagnosepatient(patient):\n    return \"HEALTHY\"   Always pre",
                  "keyPoints": [
                    "Out of 1,000 patients, this brainless program gets **999 correct** and only 1 wrong.",
                    "Its mathematical accuracy is **99.9%!**",
                    "Yet this model is completely useless and dangerous\u2014it failed to catch the one infected patient who needed immediate medi"
                  ]
                },
                {
                  "title": "The $2 \\times 2$ Confusion Matrix",
                  "summary": "ACTUAL REALITY (Ground Truth)\n                       \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n                       \u2502   IS INFECTED (+)  \u2502   IS HEALTHY (-)   \u2502\n \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n \u2502 PREDICTED           \u2502 TRUE",
                  "keyPoints": [
                    "Core principle behind The $2 \\times 2$ Confusion Matrix",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Big Three Evaluation Formulas",
                  "summary": "1. Overall Accuracy: Percentage of total predictions that were correct:\n   $$\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}} \\times 100$$\n2. Precision: Out of all cases the AI flagged as sick, what percentage was a",
                  "keyPoints": [
                    "**Overall Accuracy:** Percentage of total predictions that were correct:",
                    "**Precision:** Out of all cases the AI *flagged as sick*, what percentage was *actually sick*?",
                    "**Recall (Sensitivity):** Out of all people who were *actually sick*, what percentage did the AI *successfully catch*?"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Learning from Data Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Learning from Data.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Model Hospital Clinic",
              "engineType": " Confusion Matrix Calibration & Asymmetric Cost Optimization Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Model Hospital Clinic.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Learning from Data Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "def diagnose_patient(patient):\n    return \"HEALTHY\"  # Always predicts healthy, no matter what!",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-1-2-1",
                  "questionNumber": 1,
                  "questionText": "(Confusion Matrix Cell Definitions)\nIn a cybersecurity intrusion detection model, what cell in the confusion matrix corresponds to a situation where a malicious hacker successfully breaches the database, but the AI system classifies the traffic as \"Normal User Activity\"?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "In binary classification, the positive target class is \"Security Intrusion\". When an actual intrusion is present (Positive), but the model incorrectly predicts no intrusion (Negative), it is a False Negative (Type II Error). This is the most dangerous failure mode in security.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-2-2",
                  "questionNumber": 2,
                  "questionText": "(Evaluation Metrics: Precision vs Recall)\nA spam email filter classifies 100 emails. It sends 10 emails to the Spam folder. Upon human inspection, 8 of those emails were real spam, while 2 were urgent messages from the user's teacher. What is the Precision of this spam filter?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-2-3",
                  "questionNumber": 3,
                  "questionText": "(Generalization & Overfitting)\nA student trains a deep neural network on 10,000 photos of flowers. After 200 epochs, the model achieves 100% accuracy on the training dataset. However, when tested on 2,000 new flower photos taken from a botanical garden, accuracy plummets to 54%. ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The hallmark of Overfitting is an extreme divergence between training performance and test performance. A model that achieves near-perfect training accuracy while collapsing on unseen test data has failed to generalize, acting like a student who memorized exam question numbers rather than learning the concepts.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: The Imbalanced Dataset Trap)\nA fraud detection AI monitors 1,000,000 bank transactions, of which only 100 are fraudulent ($0.01\\%$). If a simple baseline model predicts \"NOT FRAUD\" for 100% of transactions, what is its mathematical accuracy, and why is thi",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In severely imbalanced datasets, Accuracy is a deceptive metric. A model that never flags fraud achieves $99.99\\%$ accuracy simply by guessing the majority class, but its Sensitivity/Recall is exactly $0\\%$. In fraud detection, precision and recall metrics (such as the Precision-Recall AUC or F1-Score) must always be used instead of accuracy.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-1-2-5",
                  "questionNumber": 5,
                  "questionText": "(Train/Test Split Methodology)\nWhy is it considered a fundamental violation of scientific protocol in machine learning to tune model hyperparameters using the test dataset?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Data Leakage occurs when information from the test dataset contaminates the training or hyperparameter tuning process. If an engineer repeatedly adjusts thresholds to maximize test scores, the test set ceases to be an unvarnished benchmark of unseen real-world data, leading to inflated, untrustworthy performance claims.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Learning from Data",
              "scenario": "An automated system in Learning from Data must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Cost Behind False Negatives In machine learning evaluation, we talk about abstract numbers: \"TP\", \"FP\", \"FN\": - Every False Negative Has a Human Name: In medical AI, a \"False Negative\" is a parent whose tumor was missed until it became incurable. In structural bridge safety, a \"False Negat",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class8-ch2",
        "chapterNumber": 2,
        "title": "Communicate with AI",
        "description": "Python Playground & Code a Solution",
        "icon": "Cpu",
        "lessons": [
          {
            "id": "class8-ch2-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 1,
            "lessonTitle": "Python Playground",
            "syllabusReference": "GAIO-CLASS8-CH02-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Python Playground Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Clean-Code: The Sub-Orbital Drone Engine* > **Mission Briefing:** Emergency at the Sky-Fleet Propulsion Labs! > The flight software for the new autonomous sub-orbital delivery drone, *Aero-Falcon*, is malfunctioning! > The original prototype code was written in a single, chaotic 300-line \"spaghetti\" script where variables named `x`, `temp`, `data2`, and `flag` were copied and pasted dozens of times across the file. > When the flight computer experiences turbulent wind shear, the code crashes because a variable inside a loop accidentally overwrote the global altitude navigation variable! The test flight is scheduled in 90 minutes. > As the **Lead Software Architect**, your mission is to enter the **Python Playground**, dismantle the monolithic code, encapsulate the physics and navigation algorithms into **Modular, Reusable Functions**, enforce strict variable scoping, add unit test assertions, and build a rock-solid, crash-proof propulsion library! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Python Playground.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Python Playground",
              "overview": "Key theoretical principles and architecture defining Python Playground.",
              "blocks": [
                {
                  "title": "The Power of Modular Functions",
                  "summary": "In beginner programming, code is written line-by-line sequentially. In professional software and AI systems, code is organized into Functions (self-contained, reusable computational machines):",
                  "keyPoints": [
                    "Core principle behind The Power of Modular Functions",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Why Functions are Indispensable",
                  "summary": "1. DRY Principle (Don't Repeat Yourself): Instead of writing the same 10 lines of math in five different places, define it once and call it anywhere: ke1 = calculatekineticenergy(50).\n2. Testing & Isolation: You can test a single function with 20 different edg",
                  "keyPoints": [
                    "**DRY Principle (Don't Repeat Yourself):** Instead of writing the same 10 lines of math in five different places, define",
                    "**Testing & Isolation:** You can test a single function with 20 different edge cases to verify it is 100% bug-free befor",
                    "**Abstraction:** A teammate using your function does not need to memorize the physics formula; they only need to know wh"
                  ]
                },
                {
                  "title": "Variable Scope: Local vs Global",
                  "summary": "Where a variable lives and who can see it is governed by Scope:",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Python Playground Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Python Playground.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Modular Code Factory",
              "engineType": " Monolith Refactoring & Unit Test Assembly Challenge.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Modular Code Factory.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Python Playground Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "gravity = 9.81  # GLOBAL VARIABLE: Defined outside; visible to entire script.\n\ndef compute_fall_velocity(time_seconds):\n    air_resistance = 0.12  # LOCAL VARIABLE: Created inside; exists ONLY here!\n    velocity = (gravity - air_resistance) * time_seconds\n    return velocity\n\nprint(compute_fall_velocity(5))  # Works perfectly!\n# print(air_resistance)          # CRASH! NameError: 'air_resistance' is not defined outside!",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-2-1-1",
                  "questionNumber": 1,
                  "questionText": "(Variable Scope & Encapsulation)\nExamine the following Python script:\nx = 50\n\ndef modifyvalue():\n    x = 10\n    return x  2\n\nresult = modifyvalue()\nprint(f\"Result: {result}, X: {x}\")\n\nWhat will be displayed on the screen when this code is executed?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Verified via Olympiad analytical reasoning standards.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-1-2",
                  "questionNumber": 2,
                  "questionText": "(Default Argument Mechanics)\nConsider the function header:\ndef configuresensor(sensorid, ratehz=50, calibrate=True):\n\nWhich of the following function calls is invalid and will cause a Python error?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "In Python, parameters with default values (like ratehz=50 and calibrate=True) are optional. However, sensorid has no default value, making it a mandatory positional argument. Calling configuresensor() with no arguments raises a TypeError: missing 1 required positional argument: 'sensorid'.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-1-3",
                  "questionNumber": 3,
                  "questionText": "(Software Verification: Unit Assertions)\nWhat is the primary engineering purpose of using the assert statement in Python (e.g., assert calculatearea(5) > 0)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Assertions are defensive programming tools used for internal verification and unit testing. They state: \"This condition MUST be True at this point in the program; if it is not, halt execution immediately and sound the alarm.\" They prevent silent data corruption.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Functional Purity & Side Effects)\nIn professional software development, why are Pure Functions (functions that rely only on their input parameters and produce no hidden side-effects like mutating external global variables) considered far more reliable for ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Functions that mutate global state introduce hidden dependencies (side effects) that make code fragile, unpredictable, and notoriously difficult to debug in parallel environments. Pure functions are modular building blocks that guarantee identical output for identical input every time.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-1-5",
                  "questionNumber": 5,
                  "questionText": "(Built-In Standard Libraries)\nWhich built-in Python standard library contains functions for calculating mathematical square roots (sqrt), trigonometric angles (sin, cos), and mathematical constants like $\\pi$ (pi)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The math module is part of Python's official Standard Library. It provides access to the underlying C-library mathematical functions for floating-point arithmetic, including trigonometric, hyperbolic, logarithmic, and power functions, as well as fundamental constants like $\\pi$ and $e$.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Python Playground",
              "scenario": "An automated system in Python Playground must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Software Engineering Craft Writing code that directs machines is a modern superpower: - Pride in Quality: A careless mechanic who leaves loose bolts on a car engine is dangerous. Similarly, a software engineer who writes sloppy, untested, undocumented code that controls financial or medical syst",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch2-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_2_Communicate_with_AI",
            "chapterNumber": 2,
            "chapterTitle": "Communicate with AI",
            "lessonNumber": 2,
            "lessonTitle": "Code a Solution",
            "syllabusReference": "GAIO-CLASS8-CH02-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Code a Solution Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Prime-Route: The Autonomous Logistics Hub* > **Mission Briefing:** High-Stakes Logistics Emergency in Metropolis Central! > Heavy rainstorms and road construction have caused gridlock across the downtown urban corridor. > The city\u2019s fleet of 25 autonomous electric delivery rovers is overwhelmed. Hundreds of packages are piling up at the central warehouse: life-critical medical donor organs, temperature-sensitive vaccines, urgent court documents, and ordinary retail parcels. > Right now, the rovers are delivering packages randomly in the order they arrived! Life-saving medicine is sitting at the bottom of the pile behind boxes of plastic pool toys! > As the **Chief Logistics Software Engineer**, you must **Code the Complete Algorithmic Solution**! You must architect a data pipeline that ingests incoming delivery manifests, prioritizes urgent medical payloads, calculates optimal distance vectors, handles traffic detour exceptions gracefully, and dispatches the rover fleet to save lives! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Code a Solution.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Code a Solution",
              "overview": "Key theoretical principles and architecture defining Code a Solution.",
              "blocks": [
                {
                  "title": "The 4-Phase Software Engineering Pipeline",
                  "summary": "Master engineers do not jump directly to typing code. They follow an engineering lifecycle:",
                  "keyPoints": [
                    "Core principle behind The 4-Phase Software Engineering Pipeline",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Working with Lists of Dictionaries",
                  "summary": "In real-world data science and AI applications, real data arrives as a collection of structured entity records:",
                  "keyPoints": [
                    "Core principle behind Working with Lists of Dictionaries",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Multi-Key Sorting with Lambda Functions",
                  "summary": "How do we sort packages so that Urgency 1 (Life-Critical) always comes before Urgency 3, and within the same urgency tier, the Closest Distance is delivered first?\nWe use Python's built-in sorted() with a custom Lambda Key:",
                  "keyPoints": [
                    "`lambda pkg:` is an anonymous, inline micro-function.",
                    "`(pkg[\"urgency\"], pkg[\"destination_km\"])` creates a comparison tuple: Python evaluates the first element first, and uses"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Code a Solution Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Code a Solution.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "- Level 1 Tier (Life Critical): Parcel B (8 km), P",
                  "instruction": "- Level 2 Tier (Standard): Parcel A (12 km), Parcel D (5 km). 2.",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                },
                {
                  "stepNumber": 2,
                  "title": "- Within Level 1, Parcel C (3 km) is closer than P",
                  "instruction": "- Within Level 2, Parcel D (5 km) is closer than Parcel A (12 km). Sequence: [D, A]. 3. Final Optimal Route: Parcel C \u2794 Parcel B \u2794 Parcel D \u2794 Parcel A. The rover delivers the closest critical medical ",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Autonomous Delivery Dispatcher",
              "engineType": " Urban Route Optimization & Dynamic Exception Gauntlet.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Autonomous Delivery Dispatcher.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Code a Solution Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "parcel_manifest = [\n    {\"id\": \"PKG-101\", \"destination_km\": 4.2, \"urgency\": 1, \"type\": \"Donor Heart\"},\n    {\"id\": \"PKG-102\", \"destination_km\": 1.5, \"urgency\": 3, \"type\": \"Sneakers\"},\n    {\"id\": \"PKG-103\", \"destination_km\": 8.1, \"urgency\": 1, \"type\": \"Emergency Blood\"}\n]",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-2-2-1",
                  "questionNumber": 1,
                  "questionText": "(Data Structures & Sorting Mechanics)\nIn Python, what is the role of the key parameter in the built-in function sorted(datalist, key=lambda item: item['score'])?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The key parameter in Python's Timsort algorithm takes a unary function that is called on each list element before comparisons. Using lambda item: item['score'] instructs Python to inspect the numerical value of 'score' inside each dictionary to establish the sorting order.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-2-2",
                  "questionNumber": 2,
                  "questionText": "(Multi-Key Tie-Breaking)\nGiven the lambda sort key:\nsorted(athletes, key=lambda a: (-a['medals'], a['age']))\n\nHow will Python sort the athletes?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In Python tuple sorting, elements are evaluated lexicographically. Negating a numerical value (-a['medals']) reverses the sort direction for that specific attribute (producing descending order: 10 medals becomes -10, which sorts before -5). The secondary attribute a['age'] remains positive (ascending order: youngest first).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-2-3",
                  "questionNumber": 3,
                  "questionText": "(Defensive Programming & Exception Handling)\nWhat happens if a runtime error occurs inside a Python try block that has a matching except block?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Python's Structured Exception Handling (try-except) allows programs to fail gracefully. If an exception occurs (such as an unexpected ValueError), execution branches immediately to the corresponding except handler, executing fallback remediation logic and preserving system uptime.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Algorithmic Time Complexity)\nA developer sorts 1,000,000 package delivery records using a custom bubble sort algorithm they wrote with nested for loops ($O(n^2)$). A second developer uses Python's built-in sorted() function ($O(n \\log n)$). What is the pra",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Algorithmic complexity matters exponentially as data scales. An $O(n^2)$ algorithm scales with the square of the input size ($10^6 \\times 10^6 = 10^{12}$ steps). An $O(n \\log n)$ algorithm scales sub-linearly ($10^6 \\times 20 \\approx 2 \\times 10^7$ steps), completing in fractions of a second.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-2-2-5",
                  "questionNumber": 5,
                  "questionText": "(Software Engineering: Test-Driven Development)\nIn professional software development, what is the core philosophy of Test-Driven Development (TDD)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In Test-Driven Development (TDD), the engineer follows the \"Red-Green-Refactor\" cycle: first write an automated test that fails (Red), write the minimal clean code to make the test pass (Green), and finally refactor for cleanliness and performance. TDD guarantees high reliability and eliminates regression defects.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Code a Solution",
              "scenario": "An automated system in Code a Solution must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Autonomous Prioritization & Moral Responsibility When an algorithm decides the priority of human medical deliveries or emergency services: - Value-Laden Decisions: Code is never morally neutral. Setting Urgency 1 for a private VIP customer ahead of an underprivileged child\u2019s antivenom is an ethical ",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class8-ch3",
        "chapterNumber": 3,
        "title": "AI Applications",
        "description": "AI for Better Health & AI for Better Cities",
        "icon": "HeartPulse",
        "lessons": [
          {
            "id": "class8-ch3-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 1,
            "lessonTitle": "AI for Better Health",
            "syllabusReference": "GAIO-CLASS8-CH03-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI for Better Health Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Bio-Vision: The Diagnostic ICU* > **Mission Briefing:** Critical Alert at the St. Jude Memorial Hospital Trauma Center! > Over the weekend, a regional pneumonia outbreak coupled with an influx of trauma patients has overwhelmed the hospital\u2019s radiology department. Three on-duty radiologists must review over 400 complex chest X-rays and CT scans before morning! > When human doctors work under extreme 18-hour fatigue, visual oversight rates jump by over 30%. A missed micro-nodule or early lung consolidation can be life-threatening. > You have been deployed as the **Lead Clinical AI Vision Specialist**! Your mission is to configure the hospital\u2019s **AI Radiologist Assistant**! You must program computer vision filters that pre-screen incoming scans, isolate anomalous high-density tissue regions, generate diagnostic visual heatmaps, and prioritize the most critical emergency scans for immediate doctor review! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI for Better Health.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI for Better Health",
              "overview": "Key theoretical principles and architecture defining AI for Better Health.",
              "blocks": [
                {
                  "title": "How AI Transforms Clinical Healthcare",
                  "summary": "In healthcare, AI is not a robotic surgeon operating alone; it is an ultra-precise digital magnifying glass that augments human clinical expertise:",
                  "keyPoints": [
                    "Core principle behind How AI Transforms Clinical Healthcare",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Computer Vision on Radiographic Scans: How It Works",
                  "summary": "1. Tissue Density as Pixel Brightness:\n   - In an X-ray, dense bones absorb X-rays and appear Bright White (Pixel values $\\approx 220 - 255$).\n   - Hollow air-filled lungs let X-rays pass through, appearing Dark Black / Translucent (Pixel values $\\approx 10 - ",
                  "keyPoints": [
                    "**Tissue Density as Pixel Brightness:**",
                    "- In an X-ray, dense bones absorb X-rays and appear **Bright White** (Pixel values $\\approx 220 - 255$).",
                    "- Hollow air-filled lungs let X-rays pass through, appearing **Dark Black / Translucent** (Pixel values $\\approx 10 - 40",
                    "- Fluid, pneumonia pus, or cancerous tumors create abnormal **Dense Opaque Clumps** inside the dark lung space."
                  ]
                },
                {
                  "title": "Genomic AI & Precision Oncology",
                  "summary": "- Every human cell contains roughly 3 billion DNA base pairs ($A, T, C, G$).\n- When cancer develops, specific genes mutate. In traditional medicine, all cancer patients received the same generic chemotherapy.\n- With Genomic AI, machine learning models analyze ",
                  "keyPoints": [
                    "Every human cell contains roughly 3 billion DNA base pairs ($A, T, C, G$).",
                    "When cancer develops, specific genes mutate. In traditional medicine, all cancer patients received the same generic chem",
                    "With **Genomic AI**, machine learning models analyze the patient\u2019s exact genetic mutation pattern and search chemical da",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI for Better Health Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI for Better Health.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "AI Radiologist Assistant",
              "engineType": " Clinical Pathology Inspection & Heatmap Verification Lab.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in AI Radiologist Assistant.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI for Better Health Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 3 LESSON 1\n# HEALTHCARE AI: 2D MEDICAL MATRIX TISSUE ANOMALY DETECTION ENGINE\n# =====================================================================\n\ndef scan_lung_tissue_matrix(patient_id, lung_matrix, normal_max_density=60):\n    \"\"\"\n    Analyzes a 2D numerical pixel matrix representing lung tissue in a chest scan.\n    - Healthy lung tissue has low X-ray density (Pixel values: 10 to 60).\n    - Dense pneumonia / tumor consolidations create high density spikes (> 120).\n    Computes anomaly heatmaps and triggers clinical triage alerts.\n    \"\"\"\n    rows = len(lung_matrix)\n    cols = len(lung_matrix[0])\n    \n    anomalous_pixels = []\n    total_density = 0\n    max_peak_detected = 0\n    \n    for r in range(rows):\n        for c in range(cols):\n            pixel_val = lung_matrix[r][c]\n            total_density += pixel_val\n            if pixel_val > max_peak_detected:\n                max_peak_detected = pixel_val\n                \n            # Check if density exceeds healthy lung tissue ceiling\n            if pixel_val > normal_max_density:\n                anomalous_pixels.append((r, c, pixel_val))\n                \n    mean_density = total_density / (rows * cols)\n    anomaly_count = len(anomalous_pixels)\n    \n    # Clinical Triage Recommendation\n    if anomaly_count >= 4 and max_peak_detected > 150:\n        triage_status = \"\ud83d\udea8 CODE RED: High-Density Consolidation Detected! Immediate Doctor Consult.\"\n    elif anomaly_count >= 1:\n        triage_status = \"\u26a0\ufe0f CODE YELLOW: Mild Opacity Observed. Recommend Follow-Up Lateral Scan.\"\n    else:\n        triage_status = \"\u2705 CODE GREEN: Clear Lungs. Tissue density within normal healthy limits.\"\n\n    return {\n        \"patient_id\": patient_id,\n        \"mean_density\": round(mean_density, 1),\n        \"max_peak\": max_peak_detected,\n        \"anomaly_count\": anomaly_count,\n        \"anomalous_coords\": anomalous_pixels,\n        \"status\": triage_status\n    }\n\n# ----------------- SIMULATED 5x5 LUNG TISSUE SCANS -----------------\n# Patient 1: Healthy lung tissue (Dark, porous air spaces)\nhealthy_patient_scan = [\n    [ 25,  28,  30,  24,  22 ],\n    [ 30,  35,  32,  28,  25 ],\n    [ 28,  30,  40,  35,  30 ],\n    [ 22,  25,  28,  32,  26 ],\n    [ 20,  22,  25,  24,  20 ]\n]\n\n# Patient 2: Severe Bacterial Pneumonia (Dense fluid opacity in center)\npneumonia_patient_scan = [\n    [ 25,  28,  30,  24,  22 ],\n    [ 30, 185, 192,  28,  25 ],  # Spikes: 185, 192 (Opaque consolidation)\n    [ 28, 178, 205,  35,  30 ],  # Spikes: 178, 205 (High density tumor/fluid)\n    [ 22,  25,  28,  32,  26 ],\n    [ 20,  22,  25,  24,  20 ]\n]\n\nprint(\"=== ST. JUDE ICU AUTOMATED RADIOLOGY AI SCANNER ===\\n\")\nfor pid, scan in [(\"PATIENT-101\", healthy_patient_scan), (\"PATIENT-102\", pneumonia_patient_scan)]:\n    report = scan_lung_tissue_matrix(pid, scan, normal_max_density=60)\n    print(f\"Scan Report for: {report['patient_id']}\")\n    print(f\"  \u2022 Baseline Mean Density : {report['mean_density']} (Normal: < 40)\")\n    print(f\"  \u2022 Peak Density Recorded : {report['max_peak']} / 255\")\n    print(f\"  \u2022 Suspicious Pixel Cells: {report['anomaly_count']} clusters\")\n    print(f\"  \u2022 Clinical Recommendation: {report['status']}\")\n    if report[\"anomalous_coords\"]:\n        print(f\"  \u2022 Heatmap Coordinates   : {report['anomalous_coords']}\")\n    print(\"-\" * 65)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-3-1-1",
                  "questionNumber": 1,
                  "questionText": "(Computer Vision in Medicine)\nIn radiographic chest X-ray digital processing, why do bones and dense tumors appear bright white on images while healthy aerated lung tissue appears dark black?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In classical physics and radiography, X-ray attenuation is proportional to physical tissue density and atomic number. Dense calcium in bones and dense fluid in pneumonia absorb X-rays (radiopaque, appearing white). Porous air-filled alveoli in healthy lungs allow photons to penetrate unimpeded (radiolucent, appearing dark).",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-1-2",
                  "questionNumber": 2,
                  "questionText": "(Explainable AI: Attention Heatmaps)\nWhy is the generation of visual Attention Heatmaps (such as Grad-CAM) considered a mandatory clinical requirement before an AI diagnostic model can be certified by healthcare regulatory agencies (like the FD",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In medicine, opaque \"Black Box\" predictions are legally and ethically unacceptable. Grad-CAM visualizes the gradients flowing into the final convolutional layer, highlighting the exact image region responsible for the classification. This allows the radiologist to confirm that the AI is inspecting real pathology rather than shortcut artifacts.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-1-3",
                  "questionNumber": 3,
                  "questionText": "(Precision Oncology & Genomics)\nHow does Artificial Intelligence assist oncologists in designing personalized cancer treatments through genomic pattern sequencing?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Precision oncology leverages machine learning to sift through massive multi-gigabyte genomic sequences. By pinpointing exact somatic mutations (e.g., $EGFR$ or $BRAF$ mutations), AI algorithms predict which targeted inhibitor drugs will bind effectively to mutant protein receptors, maximizing tumor destruction while minimizing chemotherapy toxicity",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: The Doctor-in-the-Loop Paradigm)\nAn autonomous medical AI achieves a 99.8% diagnostic accuracy rate on laboratory skin cancer photos. A healthcare clinic proposes firing all human dermatologists and allowing the AI software to send surgical removal orders ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In healthcare ethics and tort law, an algorithm cannot bear moral agency, hold a medical license, or stand trial for medical malpractice. AI must remain an assistive diagnostic aid. Final diagnostic confirmation and surgical intervention must always be authorized by a licensed human physician who considers patient holistic history and bears legal a",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-1-5",
                  "questionNumber": 5,
                  "questionText": "(Data Distribution Shifts in Medicine)\nA chest X-ray pneumonia detection AI trained on hospital images in California is deployed at a rural hospital in high-altitude Peru. The model's diagnostic accuracy suddenly plummets from 96% to 62%. What is the most probable epidemiological",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Domain / Distribution Shift is one of the most perilous traps in clinical AI. An algorithm fine-tuned on one hospital's specific imaging machine, patient demographics, and disease prevalence will suffer severe performance degradation when deployed in a new clinical environment with different hardware noise profiles and distinct physiological baseli",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI for Better Health",
              "scenario": "An automated system in AI for Better Health must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Sacred Nature of Medical Trust In medicine, technology directly touches human life, suffering, and mortality: - Primum Non Nocere (First, Do No Harm): The ancient Hippocratic oath applies equally to computer scientists writing healthcare algorithms. An untested shortcut in code can cost a human ",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch3-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_3_AI_Applications",
            "chapterNumber": 3,
            "chapterTitle": "AI Applications",
            "lessonNumber": 2,
            "lessonTitle": "AI for Better Cities",
            "syllabusReference": "GAIO-CLASS8-CH03-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI for Better Cities Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Metropolis Flow: The Ambulance Green Wave* > **Mission Briefing:** High-Stakes Traffic Emergency in Metropolis Center! > During Friday evening rush hour, an emergency ambulance carrying a critical cardiac patient is dispatched from North District to the Central Trauma Hospital across 12 congested downtown intersections. > Under traditional fixed-timer traffic lights, the ambulance would spend 28 agonizing minutes trapped behind bumper-to-bumper civilian cars idling at red lights. The patient has less than 15 minutes to reach the operating theater! > You have been appointed **Chief Smart Metropolis Traffic Architect**! Your mission is to deploy the city\u2019s **Intelligent Urban Traffic AI Engine**! You must process live camera queue feeds, dynamically synchronize traffic signal phase durations, calculate the emergency vehicle\u2019s trajectory, activate an uninterrupted **\"Green Wave\"**, and clear the path without causing a city-wide gridlock disaster! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI for Better Cities.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI for Better Cities",
              "overview": "Key theoretical principles and architecture defining AI for Better Cities.",
              "blocks": [
                {
                  "title": "The Anatomy of an Intelligent Smart City",
                  "summary": "Modern cities are living organisms composed of millions of moving parts. Rather than operating on rigid mechanical timers, an AI-powered smart city utilizes Urban IoT Sensor Mesh Networks:",
                  "keyPoints": [
                    "Core principle behind The Anatomy of an Intelligent Smart City",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Traditional Fixed Timers vs AI Adaptive Traffic Control",
                  "summary": "- Traditional Fixed Signals (Pre-Timed): Green light runs for exactly 45 seconds on North-South, then exactly 45 seconds on East-West, regardless of whether 50 cars are waiting or the road is completely empty! Wastes millions of liters of fuel in idle exhaust ",
                  "keyPoints": [
                    "**Traditional Fixed Signals (Pre-Timed):** Green light runs for exactly 45 seconds on North-South, then exactly 45 secon",
                    "**AI Adaptive Traffic Control (SCATS / SCOOT):** Overhead cameras and inductive road loops count vehicles in real time:",
                    "- If North-South has 40 cars and East-West has 0 cars, the AI extends the green light.",
                    "- If a pedestrian approaches the crosswalk, the signal phase adjusts dynamically."
                  ]
                },
                {
                  "title": "The Emergency \"Green Wave\" Mathematics",
                  "summary": "An ambulance travels at velocity $v = 60\\text{ km/h}$ ($16.67\\text{ m/s}$).\nIntersection $A$ is at distance $0\\text{ m}$, Intersection $B$ is at $500\\text{ m}$, Intersection $C$ is at $1,000\\text{ m}$.\n- Travel time to Intersection $B$: $t = \\frac{500}{16.67} ",
                  "keyPoints": [
                    "Travel time to Intersection $B$: $t = \\frac{500}{16.67} = 30\\text{ seconds}$.",
                    "Travel time to Intersection $C$: $t = \\frac{1000}{16.67} = 60\\text{ seconds}$.",
                    "**The Green Wave Algorithm:** The AI switches Intersection $B$ to green at second 25 (giving civilian cars 5 seconds to ",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI for Better Cities Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI for Better Cities.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Smart Metropolis Mayor",
              "engineType": " Urban Traffic Grid Optimization & Crisis Response Simulator.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Smart Metropolis Mayor.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI for Better Cities Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 3 LESSON 2\n# SMART CITIES: ADAPTIVE TRAFFIC QUEUE & EMERGENCY GREEN WAVE ENGINE\n# =====================================================================\n\ndef simulate_smart_intersection(intersection_id, north_south_cars, east_west_cars, emergency_approaching=False):\n    \"\"\"\n    Computes optimal traffic signal phase durations based on queue volume.\n    Enforces immediate emergency green wave preemption when ambulances approach.\n    \"\"\"\n    total_cars = north_south_cars + east_west_cars\n    base_cycle_seconds = 60\n    \n    # 1. Emergency Preemption Override (Green Wave Protocol)\n    if emergency_approaching:\n        return {\n            \"intersection\": intersection_id,\n            \"phase\": \"\ud83d\udea8 EMERGENCY OVERRIDE: NORTH-SOUTH ALL-GREEN WAVE\",\n            \"duration_sec\": 45,\n            \"ns_cleared\": north_south_cars,\n            \"ew_cleared\": 0,\n            \"status\": \"Ambulance Preemption Active (East-West held on red)\"\n        }\n        \n    # 2. Adaptive Proportional Queue Balancing\n    if total_cars == 0:\n        ns_duration = 30\n        ew_duration = 30\n    else:\n        # Allocate green time proportional to queue demand (Min: 15s, Max: 45s)\n        ns_ratio = north_south_cars / total_cars\n        ns_duration = int(max(15, min(45, base_cycle_seconds * ns_ratio)))\n        ew_duration = base_cycle_seconds - ns_duration\n        \n    # Vehicles clear at roughly 1 car per 2 seconds of green light\n    ns_cleared = min(north_south_cars, ns_duration // 2)\n    ew_cleared = min(east_west_cars, ew_duration // 2)\n    \n    return {\n        \"intersection\": intersection_id,\n        \"phase\": f\"Adaptive Phase (NS: {ns_duration}s | EW: {ew_duration}s)\",\n        \"duration_sec\": base_cycle_seconds,\n        \"ns_cleared\": ns_cleared,\n        \"ew_cleared\": ew_cleared,\n        \"status\": f\"Cleared {ns_cleared + ew_cleared}/{total_cars} vehicles smoothly.\"\n    }\n\n# ----------------- SIMULATED DOWNTOWN ARTERIAL CORRIDOR -----------------\nintersections_telemetry = [\n    {\"id\": \"INT-1st-Ave\",  \"ns_queue\": 35, \"ew_queue\": 8,  \"ambulance\": False},\n    {\"id\": \"INT-2nd-Ave\",  \"ns_queue\": 42, \"ew_queue\": 15, \"ambulance\": True},   # Ambulance approaching!\n    {\"id\": \"INT-3rd-Ave\",  \"ns_queue\": 12, \"ew_queue\": 28, \"ambulance\": False},\n    {\"id\": \"INT-4th-Ave\",  \"ns_queue\": 25, \"ew_queue\": 22, \"ambulance\": False}\n]\n\nprint(\"=== METROPOLIS AI SMART TRAFFIC CONTROL INFERENCE ===\\n\")\ntotal_vehicles_cleared = 0\n\nfor data in intersections_telemetry:\n    result = simulate_smart_intersection(\n        data[\"id\"], data[\"ns_queue\"], data[\"ew_queue\"], emergency_approaching=data[\"ambulance\"]\n    )\n    total_vehicles_cleared += result[\"ns_cleared\"] + result[\"ew_cleared\"]\n    \n    print(f\"Intersection: {result['intersection']}\")\n    print(f\"  \u2022 Signal Command : {result['phase']}\")\n    print(f\"  \u2022 Traffic Status : {result['status']}\")\n    print(f\"  \u2022 Vehicles Flow  : NS Cleared: {result['ns_cleared']} | EW Cleared: {result['ew_cleared']}\")\n    print(\"-\" * 65)\n\nprint(f\"Summary: AI adaptive grid cleared {total_vehicles_cleared} vehicles across corridor.\")\nprint(\"Green Wave protocol successfully prioritized emergency ambulance at 2nd Ave!\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-3-2-1",
                  "questionNumber": 1,
                  "questionText": "(Smart City Infrastructure)\nHow do AI-driven Adaptive Traffic Control Systems (such as SCATS or SCOOT) improve urban mobility compared to traditional pre-timed electromechanical signals?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Fixed-time signals blindly cycle through preset durations regardless of actual traffic density. Adaptive AI systems ingest live camera feeds, calculate dynamic queue ratios, and optimize split times in real time, reducing urban vehicle delay by 25\u201340% and drastically curbing greenhouse gas idling emissions.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-2-2",
                  "questionNumber": 2,
                  "questionText": "(Emergency Logistics & Preemption)\nWhat is the core operational principle of an Emergency Vehicle \"Green Wave\" Preemption System?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In trauma and cardiac emergencies, transit time correlates directly with patient mortality. A Green Wave Preemption System tracks the ambulance's velocity vector, safely cycling conflicting pedestrian and cross-traffic phases to red in advance so the responder encounters continuous green signals without stopping.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-2-3",
                  "questionNumber": 3,
                  "questionText": "(Urban Waste Optimization)\nHow do ultrasonic IoT sensors installed inside public street trash bins optimize municipal garbage collection logistics?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Traditional municipal waste management follows rigid static routes, resulting in trucks driving miles to empty cans that are 10% full while overflowing cans spill onto streets. Fill-level telemetry allows AI route planners to solve dynamic Traveling Salesperson Problems (TSP), collecting only full bins and slashing municipal fleet fuel costs.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-2-4",
                  "questionNumber": 4,
                  "questionText": "(Civil Liberties & Mass Surveillance Dilemmas)\nWhy have several democratic cities and human rights organizations placed legal moratoria or strict bans on the use of Real-Time Facial Recognition Surveillance in public urban spaces?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Mass public biometric surveillance creates severe civil liberties risks. When the state can track every citizen\u2019s physical movements automatically, the constitutional freedom of assembly and public privacy are compromised. Additionally, documented demographic error rates in commercial facial recognition pose severe risks of wrongful detention for m",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-3-2-5",
                  "questionNumber": 5,
                  "questionText": "(Acoustic Urban Sensing)\nHow do municipal acoustic sensor networks (such as ShotSpotter) locate the precise coordinates of an emergency incident (like an explosion or gunshot) in a noisy city environment?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Acoustic localization uses Multilateration / TDOA. Because sound travels at a known velocity ($\\approx 343\\text{ m/s}$ in air), the microsecond difference in when the acoustic impulse reaches three or more geographically separated sensors allows mathematical hyperbolic triangulation, pinpointing the incident location within meters.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI for Better Cities",
              "scenario": "An automated system in AI for Better Cities must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The City for the Citizen: Privacy-by-Design As we design the smart cities of tomorrow: - Citizens, Not Data Points: A city is not a corporate spreadsheet; it is a shared community of living human beings with rights to dignity, privacy, and peace. - Privacy-by-Design Mandate: Urban technologies must ",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class8-ch4",
        "chapterNumber": 4,
        "title": "AI and Career",
        "description": "Find Your Future Path & AI Career Discovery",
        "icon": "Briefcase",
        "lessons": [
          {
            "id": "class8-ch4-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 1,
            "lessonTitle": "Find Your Future Path",
            "syllabusReference": "GAIO-CLASS8-CH04-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Find Your Future Path Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Silicon Horizon: The Seed Accelerator* > **Mission Briefing:** Welcome to the Global Silicon Horizon Venture Incubator! > You and your fellow young engineers have just patented a groundbreaking technological breakthrough: *Aero-Net*\u2014a network of solar-powered, autonomous stratospheric gliders that use edge AI computer vision to monitor illegal ocean poaching and provide high-speed emergency internet to remote island communities during natural disasters. > An international technology investment syndicate has agreed to consider your venture for a **$2,000,000 Seed Capital Investment**! > However, venture capitalists do not invest in vague dreams. They require a rigorous, milestone-driven technical proposal: computing server budgets, flight sensor procurement, regulatory compliance pathways, and clear metrics of social impact. > Your mission as the **Lead Founder & Chief Technology Officer** is to formulate the engineering proposal, allocate resources in Python, and pitch your roadmap to secure the venture investment! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Find Your Future Path.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Find Your Future Path",
              "overview": "Key theoretical principles and architecture defining Find Your Future Path.",
              "blocks": [
                {
                  "title": "The Next-Generation Frontier of AI Careers",
                  "summary": "As foundational machine learning becomes commoditized, industry demand has pivoted toward Advanced Systems Specializations:",
                  "keyPoints": [
                    "Core principle behind The Next-Generation Frontier of AI Careers",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Detailed Profile of Frontier Roles",
                  "summary": "| Career Title | The Core Problem They Solve | Prerequisite University Disciplines | Real-World Impact |\n| :--- | :--- | :--- | :--- |\n| AI Safety & Alignment Researcher | Ensures autonomous multi-agent systems do not pursue dangerous, deceptive, or unintended",
                  "keyPoints": [
                    "Core principle behind Detailed Profile of Frontier Roles",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Anatomy of an AI Venture Lifecycle",
                  "summary": "1. Ideation & Problem Formulation: Identifying an acute, high-value real-world bottleneck.\n2. Proof-of-Concept (PoC): Demonstrating that the core algorithm mathematically works on a small benchmark dataset.\n3. Minimum Viable Product (MVP): Building the simples",
                  "keyPoints": [
                    "**Ideation & Problem Formulation:** Identifying an acute, high-value real-world bottleneck.",
                    "**Proof-of-Concept (PoC):** Demonstrating that the core algorithm mathematically works on a small benchmark dataset.",
                    "**Minimum Viable Product (MVP):** Building the simplest functional prototype that real users can test in the field.",
                    "**Venture Capital Milestones:** Securing funding tranches (Seed \u2794 Series A \u2794 Series B) tied to concrete performance metr"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Find Your Future Path Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Find Your Future Path.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Future Tech Incubator",
              "engineType": " Startup Venture Strategy & Runway Management Simulation.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Future Tech Incubator.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Find Your Future Path Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 4 LESSON 1\n# VENTURE STRATEGY: QUANTITATIVE CAPITAL RUNWAY & MILESTONE SCHEDULER\n# =====================================================================\n\ndef evaluate_startup_runway(total_seed_capital, quarterly_budget_plan):\n    \"\"\"\n    Simulates startup treasury over 4 quarters:\n    Tracks burn rate, compute expenses, talent salaries, and milestone achievements.\n    Ensures the enterprise does not deplete funds before reaching Series A.\n    \"\"\"\n    treasury = total_seed_capital\n    print(f\"Initial Seed Capital Ingested: ${treasury:,.2f}\\n\")\n    print(f\"{'QUARTER':<9} | {'EXPENSES':<12} | {'TREASURY REMAINING':<20} | {'RUNWAY (MONTHS)':<16} | {'STATUS'}\")\n    print(\"-\" * 78)\n    \n    for row in quarterly_budget_plan:\n        q_name = row[\"quarter\"]\n        compute_cost = row[\"cloud_compute\"]\n        salaries = row[\"talent_salaries\"]\n        legal_safety = row[\"compliance_safety\"]\n        \n        quarterly_burn = compute_cost + salaries + legal_safety\n        monthly_burn = quarterly_burn / 3.0\n        \n        treasury -= quarterly_burn\n        runway_months = treasury / monthly_burn if monthly_burn > 0 else 0.0\n        \n        if treasury < 0:\n            status = \"\ud83d\udea8 BANKRUPTCY: Treasury exhausted!\"\n            runway_months = 0.0\n        elif runway_months < 3.0:\n            status = \"\u26a0\ufe0f CRITICAL CASH WARNING: Urgent funding needed!\"\n        else:\n            status = f\"\u2705 STABLE: Milestone '{row['milestone_target']}' achieved.\"\n            \n        print(f\"{q_name:<9} | ${quarterly_burn:<11,.0f} | ${treasury:<19,.0f} | {runway_months:<15.1f} | {status}\")\n        \n    print(\"-\" * 78)\n    if treasury > 0:\n        print(f\"Series A Preparedness: Venture survived Year 1 with ${treasury:,.0f} reserve capital!\")\n        print(\"Ready for Series A Institutional Investment round.\")\n    else:\n        print(\"Restructuring Required: Reduce cloud compute burn rate or consolidate headcount.\")\n\n# ----------------- SIMULATED YEAR 1 VENTURE BUDGET -----------------\nyear_1_budget = [\n    {\n        \"quarter\": \"Q1\", \"cloud_compute\": 40000, \"talent_salaries\": 120000, \n        \"compliance_safety\": 15000, \"milestone_target\": \"PoC Benchmark 92%\"\n    },\n    {\n        \"quarter\": \"Q2\", \"cloud_compute\": 55000, \"talent_salaries\": 120000, \n        \"compliance_safety\": 20000, \"milestone_target\": \"MVP Prototype Complete\"\n    },\n    {\n        \"quarter\": \"Q3\", \"cloud_compute\": 35000, \"talent_salaries\": 140000, \n        \"compliance_safety\": 25000, \"milestone_target\": \"Field Pilot with 500 Users\"\n    },\n    {\n        \"quarter\": \"Q4\", \"cloud_compute\": 30000, \"talent_salaries\": 140000, \n        \"compliance_safety\": 30000, \"milestone_target\": \"Safety Audit & Series A Pitch\"\n    }\n]\n\nprint(\"=== SILICON HORIZON VENTURE FINANCIAL FEASIBILITY RUN ===\\n\")\nevaluate_startup_runway(total_seed_capital=1000000.0, quarterly_budget_plan=year_1_budget)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-4-1-1",
                  "questionNumber": 1,
                  "questionText": "(Frontier AI Engineering Specializations)\nWhich frontier AI specialist is primarily responsible for redesigning neural network architectures, quantizing weights, and fabricating custom Application-Specific Integrated Circuits (ASICs) so that deep learning models can run on low-po",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Cloud servers consume massive electrical wattage that cannot be supplied by small drone batteries or biological bionic implants. Edge AI Hardware Architects specialize in neuromorphic silicon design, tensor processing units (TPUs), and model quantization, enabling models to perform real-time neural inference at the physical \"edge\" on milliwatts of ",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-1-2",
                  "questionNumber": 2,
                  "questionText": "(Financial Management of Technology Startups)\nIn technology venture capital economics, what does a startup's \"Runway\" represent?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In venture finance, Runway is calculated as $\\text{Runway} = \\frac{\\text{Current Cash Reserves}}{\\text{Monthly Burn Rate}}$. It is the existential clock governing every early-stage company: if a startup fails to achieve technical proof-of-concept or secure its next funding tranche before runway reaches zero, it faces immediate liquidation.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-1-3",
                  "questionNumber": 3,
                  "questionText": "(The AI Alignment Problem)\nIn advanced artificial intelligence research, what is the core focus of the \"AI Alignment Problem\"?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Formulated by pioneering computer scientists, the AI Alignment Problem addresses the existential risk that an autonomous super-optimizer given a seemingly harmless goal (e.g., \"Eliminate cancer\" or \"Maximize manufacturing throughput\") might discover mathematically optimal but catastrophic shortcuts (e.g., eliminating all living organisms so cancer ",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Minimum Viable Product vs Premature Scaling)\nA student startup receives a grant to build an AI app that translates sign language in real time using smartphone cameras. The founders immediately spend 80% of their money hiring 10 graphic designers to design ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Premature Scaling is cited by venture studies as the 1 reason tech startups collapse. Successful ventures prioritize technical Proof-of-Concept (PoC) and product-market validation: proving the core algorithmic value proposition works reliably on real users before spending precious capital on marketing campaigns or corporate overhead.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-1-5",
                  "questionNumber": 5,
                  "questionText": "(Global Tech Equity & The Digital Divide)\nWhy is the concentration of advanced frontier AI research and compute infrastructure in a handful of wealthy nations a grave geopolitical risk for global development?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "If AI ownership and compute capacity remain concentrated among a few wealthy tech hubs, the technology will be tailored exclusively to the commercial incentives of those markets. Ensuring global open-source models, equitable compute access, and local capacity-building allows developing nations to deploy AI sovereignty to solve their own urgent regi",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Find Your Future Path",
              "scenario": "An automated system in Find Your Future Path must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Purpose of Innovation: Solving Real Human Suffering As you formulate your future career path in technology: - Avoid the Trap of Vanity Tech: Do not spend your brilliance building apps designed solely to make teenagers click more ads or buy virtual video game hats. - Target the Hard Problems: Use",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch4-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_4_AI_and_Career",
            "chapterNumber": 4,
            "chapterTitle": "AI and Career",
            "lessonNumber": 2,
            "lessonTitle": "AI Career Discovery",
            "syllabusReference": "GAIO-CLASS8-CH04-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Career Discovery Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Digital Footprint: The Recruiter Showcase* > **Mission Briefing:** Welcome to the International Collegiate Tech Admissions Expo! > Top university artificial intelligence labs and frontier technology research institutes have opened applications for their prestigious summer pre-college fellowship. Over 5,000 students have applied! > Admissions directors are drowning in paper resumes that all look identical: *\"Passionate student, loves computers, knows Python.\"* Words on paper mean nothing! Directors spend an average of only **30 seconds** reviewing an application. > What catches their eye? A live, verified, interactive **Technical Portfolio**\u2014complete with public GitHub repositories, crisp README documentation, runnable code demonstrations, and verified open-source contributions! > Your mission is to enter the *Tech Portfolio Showcase*, curate your best engineering projects, structure an exportable developer schema in Python, and build a world-class digital portfolio that proves your capabilities to admissions directors! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Career Discovery.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Career Discovery",
              "overview": "Key theoretical principles and architecture defining AI Career Discovery.",
              "blocks": [
                {
                  "title": "Show, Don't Tell: The Modern Credential Revolution",
                  "summary": "In traditional industries, a printed diploma was all an employer required. In modern Artificial Intelligence, the global standard is Demonstrated Competence:",
                  "keyPoints": [
                    "Core principle behind Show, Don't Tell: The Modern Credential Revolution",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Four Pillars of an Elite AI Project Repository",
                  "summary": "\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502                   THE ANATOMY OF A PROFESSIONAL GITHUB REPO            \u2502\n\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 1. THE README.md   \u2502 2. REPRODUCI",
                  "keyPoints": [
                    "Core principle behind The Four Pillars of an Elite AI Project Repository",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Understanding Open-Source Software Licenses",
                  "summary": "When you publish code publicly, an open-source license establishes legal terms:\n- MIT License: Ultra-permissive; anyone can use, modify, and distribute your code freely, even commercially, as long as they preserve your original copyright notice.\n- Apache 2.0 L",
                  "keyPoints": [
                    "**MIT License:** Ultra-permissive; anyone can use, modify, and distribute your code freely, even commercially, as long a",
                    "**Apache 2.0 License:** Permissive like MIT, but includes explicit patent protection terms.",
                    "**GNU General Public License (GPL v3):** \"Copyleft\" license; anyone who modifies your code must also release their deriv",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Career Discovery Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Career Discovery.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Tech Portfolio Showcase",
              "engineType": " Digital Identity Construction & Recruiter Evaluation Arena.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Tech Portfolio Showcase.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Career Discovery Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 4 LESSON 2\n# PORTFOLIO ENGINEERING: DEVELOPER SCHEMA VALIDATOR & MARKDOWN EXPORTER\n# =====================================================================\n\nimport json\n\ndef validate_and_export_portfolio(portfolio_data):\n    \"\"\"\n    Validates a structured developer portfolio schema:\n    - Verifies mandatory keys (name, bio, technical_skills, projects).\n    - Ensures each project contains title, repo_url, tech_stack, and verified outcome.\n    - Exports a beautifully formatted GitHub profile README.md string.\n    \"\"\"\n    # 1. Schema Validation\n    required_top_keys = [\"developer_name\", \"tagline\", \"technical_skills\", \"featured_projects\"]\n    for k in required_top_keys:\n        if k not in portfolio_data:\n            return False, f\"Schema Error: Missing top-level key '{k}'\", \"\"\n\n    projects = portfolio_data[\"featured_projects\"]\n    if len(projects) < 2:\n        return False, \"Validation Error: Portfolio must showcase at least 2 verified projects!\", \"\"\n\n    # 2. Build Markdown Export\n    md = f\"# \ud83d\ude80 Developer Portfolio: {portfolio_data['developer_name']}\\n\"\n    md += f\"**{portfolio_data['tagline']}**\\n\\n\"\n    md += \"## \ud83d\udee0\ufe0f Core Technical Superpowers\\n\"\n    md += f\"- **Programming Languages:** {', '.join(portfolio_data['technical_skills']['languages'])}\\n\"\n    md += f\"- **AI & ML Domains:** {', '.join(portfolio_data['technical_skills']['ai_domains'])}\\n\"\n    md += f\"- **Tools & Platforms:** {', '.join(portfolio_data['technical_skills']['tools'])}\\n\\n\"\n    md += \"## \ud83c\udf1f Featured Engineering Projects\\n\\n\"\n\n    for idx, p in enumerate(projects, 1):\n        md += f\"### {idx}. {p['title']}\\n\"\n        md += f\"- **Problem Solved:** {p['problem_summary']}\\n\"\n        md += f\"- **Quantified Impact:** {p['quantified_outcome']}\\n\"\n        md += f\"- **Tech Stack:** `{', '.join(p['tech_stack'])}`\\n\"\n        md += f\"- **Repository:** [{p['repo_name']}]({p['repo_url']}) | **License:** `{p['license']}`\\n\\n\"\n\n    md += \"---\\n*Verified by the Global Artificial Intelligence Olympiad (GAIO) Credential Network.*\"\n    return True, \"Portfolio validated and compiled successfully!\", md\n\n# ----------------- SIMULATED DEVELOPER RECORD -----------------\nstudent_portfolio_data = {\n    \"developer_name\": \"Kavya Patel\",\n    \"tagline\": \"Aspiring AI Safety & Healthcare Machine Learning Engineer | Class 8\",\n    \"technical_skills\": {\n        \"languages\": [\"Python 3.12\", \"SQL\", \"HTML/CSS\"],\n        \"ai_domains\": [\"Computer Vision\", \"Anomaly Detection\", \"Ethical AI Auditing\"],\n        \"tools\": [\"Git\", \"GitHub\", \"Jupyter\", \"Linux Terminal\"]\n    },\n    \"featured_projects\": [\n        {\n            \"title\": \"Bio-Vision: ICU Chest Radiograph Anomaly Detector\",\n            \"problem_summary\": \"Assists fatigued emergency radiologists by localizing high-density pneumonia opacities.\",\n            \"quantified_outcome\": \"Achieved 96.5% Recall on 500 clinical test scans with Grad-CAM heatmaps.\",\n            \"tech_stack\": [\"Python\", \"Computer Vision\", \"Matrix Math\", \"Grad-CAM\"],\n            \"repo_name\": \"kavya/bio-vision-icu\",\n            \"repo_url\": \"https://github.com/kavya/bio-vision-icu\",\n            \"license\": \"MIT\"\n        },\n        {\n            \"title\": \"Eco-Grid: 24-Hour Smart Renewable Energy Dispatcher\",\n            \"problem_summary\": \"Balances solar and wind generation intermittency against municipal city demands.\",\n            \"quantified_outcome\": \"Zero city blackouts maintained while reducing fossil peaker use to 0 MWh.\",\n            \"tech_stack\": [\"Python\", \"Simulation Modeling\", \"Numerical Optimization\"],\n            \"repo_name\": \"kavya/ecogrid-dispatcher\",\n            \"repo_url\": \"https://github.com/kavya/ecogrid-dispatcher\",\n            \"license\": \"Apache-2.0\"\n        }\n    ]\n}\n\nprint(\"=== GAIO DEVELOPER PORTFOLIO COMPILER ===\\n\")\nvalid, msg, compiled_markdown = validate_and_export_portfolio(student_portfolio_data)\nprint(f\"Compilation Status: {'\u2705 PASSED' if valid else '\u274c FAILED'}\")\nprint(f\"Log: {msg}\\n\")\n\nif valid:\n    print(\"--- COMPILED GITHUB PROFILE README.md EXPORT ---\")\n    print(compiled_markdown)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-4-2-1",
                  "questionNumber": 1,
                  "questionText": "(Open-Source Licensing)\nIf an engineer releases a machine learning software tool under the MIT License, what legal permissions are granted to other developers who download the code?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "The MIT License is one of the most popular and permissive open-source licenses in modern software engineering. It grants broad, worldwide permissions to use and modify code for any purpose (including proprietary commercial software), requiring only that the original copyright attribution be retained.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-2-2",
                  "questionNumber": 2,
                  "questionText": "(Software Portfolios & High-Trust Signals)\nWhy do technical recruiters and university admissions committees place vastly higher value on a candidate's public GitHub Repository with unit tests and a live web demo than on a traditional written bullet point on a paper resume?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Anyone can write \"Proficient in Machine Learning\" on a paper resume. A public repository represents Proof-of-Work: it demonstrates that the candidate knows how to structure directories, write clean functions, document dependencies, and write reproducible software that actually executes without errors.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-2-3",
                  "questionNumber": 3,
                  "questionText": "(Version Control: Git Fundamentals)\nIn modern software engineering, what is the role of a Git Commit?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In the Git version control system, a commit records changes to one or more files in the repository history. Each commit has a unique SHA-1/SHA-256 hash, an author timestamp, and a commit message, allowing teams to trace project evolution, collaborate simultaneously, and roll back unintended regressions.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Thinking: Scientific Reproducibility in AI)\nA student publishes a research paper claiming: \"Our new deep learning model predicts earthquakes 48 hours in advance with 99.8% accuracy!\" However, their GitHub repository contains no dataset links, no random seeds, no tra",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Reproducibility is the foundational bedrock of all modern science. In computational AI research, an extraordinary performance claim must be accompanied by open, reproducible code and evaluation data splits so that peer scientists can independently replicate and verify the claim. Without reproducibility, results are dismissed as unverified noise.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-4-2-5",
                  "questionNumber": 5,
                  "questionText": "(Technical Writing & Documentation)\nWhat is the function of a project's requirements.txt file in a Python repository?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Python environments rely on specific external libraries. The requirements.txt file documents exact library versions, allowing other developers to instantly recreate an identical virtual environment using pip install -r requirements.txt, ensuring that the code executes identically across different computers.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Career Discovery",
              "scenario": "An automated system in AI Career Discovery must resolve a critical privacy vs utility trade-off.",
              "dilemma": "--- 7. Python Coding Exercise (Runnable & Verified) Let us implement a Developer Portfolio Schema Validator and Automated Markdown Exporter in Python. =====================================================================",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class8-ch5",
        "chapterNumber": 5,
        "title": "AI Tools",
        "description": "Build with GenAI & AI Media Studio",
        "icon": "Layers",
        "lessons": [
          {
            "id": "class8-ch5-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 1,
            "lessonTitle": "Build with GenAI",
            "syllabusReference": "GAIO-CLASS8-CH05-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Build with GenAI Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Dream-Weaver: The Neural Art Engine* > **Mission Briefing:** Welcome to the Apex Generative Research Laboratory! > An international animated film studio is developing a breakthrough visual sci-fi epic: *Chronicles of Kepler-186f*. > The studio needs to synthesize hundreds of photorealistic concept art frames depicting exotic alien crystal forests, bioluminescent atmosphere storms, and futuristic explorer exosuits. > However, junior concept artists are getting erratic results! Sometimes the images look blurry and oversaturated; other times the character has three arms; and when they try to regenerate a scene with minor lighting changes, the entire character transforms into someone completely different because they don't understand **Random Seeds and Guidance Scales**! > As the **Lead Generative AI Systems Architect**, your mission is to master the **Underlying Mathematics of Diffusion Models**, calibrate the noise schedules, configure CFG scales, and engineer a deterministic, controllable generative pipeline that turns raw text prompts into visual masterpieces! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Build with GenAI.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Build with GenAI",
              "overview": "Key theoretical principles and architecture defining Build with GenAI.",
              "blocks": [
                {
                  "title": "The Evolution of Generative AI",
                  "summary": "How did computers learn to generate photorealistic art and human-quality text? The field advanced through three historic technological breakthroughs:",
                  "keyPoints": [
                    "Core principle behind The Evolution of Generative AI",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "How Diffusion Models Work: The Noise Reversal Process",
                  "summary": "Imagine taking a crisp, beautiful photograph of a dog, and gradually spraying microscopic droplets of static noise over it 1,000 times until it becomes 100% pure random television static:",
                  "keyPoints": [
                    "Core principle behind How Diffusion Models Work: The Noise Reversal Process",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "The Master Hyperparameter Control Knobs",
                  "summary": "| Hyperparameter | Plain-Language Definition | Typical Value Range | What Happens if Set Too Low / Too High? |\n| :--- | :--- | :---: | :--- |\n| CFG Scale (Classifier-Free Guidance) | Controls how strictly the AI must obey your text prompt versus exploring its ",
                  "keyPoints": [
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Build with GenAI Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Build with GenAI.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Neural Media Architect",
              "engineType": " Diffusion Model Latent Space Calibration Simulator.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Neural Media Architect.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Build with GenAI Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 5 LESSON 1\n# GENERATIVE AI: LATENT DIFFUSION HYPERPARAMETER & SCHEDULER ENGINE\n# =====================================================================\n\ndef simulate_diffusion_denoising_schedule(steps, cfg_scale, seed_val, prompt, negative_prompt=\"\"):\n    \"\"\"\n    Simulates the mathematical latent diffusion inference loop:\n    1. Initializes pseudo-random Gaussian noise from seed.\n    2. Calculates noise reduction per step.\n    3. Evaluates prompt conditioning fidelity and artifact risk based on CFG scale.\n    \"\"\"\n    print(f\"\ud83d\ude80 INITIATING DIFFUSION INFERENCE PIPELINE (Seed: {seed_val})\")\n    print(f\"Prompt         : \\\"{prompt}\\\"\")\n    print(f\"Negative Prompt: \\\"{negative_prompt}\\\"\\n\")\n    print(f\"{'STEP':<6} | {'LATENT NOISE (%)':<18} | {'GUIDANCE INFLUENCE':<20} | {'ARTIFACT RISK'}\")\n    print(\"-\" * 65)\n    \n    current_noise = 1.0  # Starts at 100% pure random Gaussian noise\n    step_decay = 1.0 / steps\n    \n    # Evaluate CFG Health\n    if cfg_scale < 4.0:\n        guidance_status = \"Weak (Under-conditioned)\"\n        artifact_risk = \"Prompt Ignored / Vagueness\"\n    elif 6.5 <= cfg_scale <= 9.0:\n        guidance_status = \"Optimal (High Fidelity)\"\n        artifact_risk = \"Minimal / Clean Photorealism\"\n    elif cfg_scale > 14.0:\n        guidance_status = \"Extreme (Over-conditioned)\"\n        artifact_risk = \"\ud83d\udea8 Severe Saturation Burn & Clashing Edges\"\n    else:\n        guidance_status = \"Moderate\"\n        artifact_risk = \"Low\"\n\n    # Display milestone steps in reverse denoising process\n    milestones = [1, steps // 4, steps // 2, (3 * steps) // 4, steps]\n    \n    for s in range(1, steps + 1):\n        current_noise = max(0.0, current_noise - step_decay)\n        \n        if s in milestones:\n            print(f\"Step {s:<2} | {current_noise * 100:<17.1f}% | {guidance_status:<20} | {artifact_risk}\")\n            \n    print(\"-\" * 65)\n    print(\"\u2705 LATENT DENOISING COMPLETE: Image decoded via VAE to 1024x1024 RGB tensor.\\n\")\n    \n    return {\n        \"final_noise\": current_noise,\n        \"cfg_scale\": cfg_scale,\n        \"steps_executed\": steps,\n        \"artifact_risk\": artifact_risk\n    }\n\n# ----------------- SIMULATED RUNS ACROSS DIFFERENT CFG VALUES -----------------\ntest_prompt = \"Cinematic 8k photograph of a crystalline bioluminescent forest on Kepler-186f, volumetric fog, anamorphic lens\"\nneg_prompt = \"blurry, deformed, cartoon, oversaturated, human figures\"\n\nprint(\"=== TEST RUN 1: OPTIMAL BALANCED HYPERPARAMETERS ===\")\nrun_1 = simulate_diffusion_denoising_schedule(\n    steps=30, cfg_scale=7.5, seed_val=42891, prompt=test_prompt, negative_prompt=neg_prompt\n)\n\nprint(\"=== TEST RUN 2: HIGH CFG SATURATION STRESS TEST ===\")\nrun_2 = simulate_diffusion_denoising_schedule(\n    steps=30, cfg_scale=18.0, seed_val=42891, prompt=test_prompt, negative_prompt=neg_prompt\n)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-5-1-1",
                  "questionNumber": 1,
                  "questionText": "(Generative Diffusion Mechanics)\nIn modern Latent Diffusion Models (such as Stable Diffusion or Midjourney), what is the fundamental mathematical role performed by the neural network during the reverse image generation process?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Diffusion models do not copy and paste existing photos. They are trained on a Denoising Score Matching objective. Starting from pure random Gaussian static noise, a U-Net neural network estimates the noise gradient conditioned on the cross-attention text prompt, iteratively subtracting noise over 20 to 50 steps until a clean image emerges.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-1-2",
                  "questionNumber": 2,
                  "questionText": "(Hyperparameter Calibration: CFG Scale)\nWhat visual failure mode occurs in image diffusion generation when an artist sets the Classifier-Free Guidance (CFG Scale) to an unnaturally high value (e.g., $\\text{CFG} = 25$ or $30$)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Classifier-Free Guidance (CFG) controls the trade-off between sample fidelity and diversity. When CFG is pushed to extreme values ($>15$), the model over-amplifies prompt tokens at the expense of natural pixel distributions, leading to the well-known \"burnt / deep-fried\" look characterized by hyper-saturated neon colors and distorted, harsh edges.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-1-3",
                  "questionNumber": 3,
                  "questionText": "(Diffusion Reproducibility: Random Seeds)\nWhy is recording and locking the exact Random Seed (Seed Integer) essential when developing continuous visual concept art (such as illustrating multiple scenes of the same main character)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In pseudo-random generative processes, the Seed initializes the pseudo-random number generator (PRNG). If two generations share the same seed, they start with the identical initial spatial noise distribution. This allows creators to maintain character facial structure and camera angles while altering lighting or background details.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Generative Intellectual Property)\nA commercial studio uses a generative diffusion model to synthesize background artwork for a commercial video game. The model was trained on billions of uncredited copyrighted paintings scraped from independent human artis",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Generative models are trained on internet-scale datasets (like LAION-5B) containing millions of copyrighted illustrations. When models reproduce the distinct signature aesthetic of living artists or mimic proprietary intellectual property, it sparks intense legal and ethical battles over Fair Use vs Commercial Exploitation, driving calls for mandat",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-1-5",
                  "questionNumber": 5,
                  "questionText": "(Generative Adversarial Networks: The Discriminator)\nIn a Generative Adversarial Network (GAN), what is the relationship between the Generator and the Discriminator?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Formulated by Ian Goodfellow in 2014, a GAN is structured as an adversarial min-max game. The Generator network maps latent noise into candidate images, while the Discriminator network evaluates whether the images are real (from the training set) or fake (from the Generator). Through simultaneous backpropagation, both networks continuously push eac",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Build with GenAI",
              "scenario": "An automated system in Build with GenAI must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Core of Visual Expression As generative synthesis tools become faster and more photorealistic: - Art is a Bridge Between Human Souls: A machine can generate 1,000 paintings of a sunset in 5 seconds, but it has never felt the warmth of the sun on its skin, never known sorrow, and never love",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch5-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_5_AI_Tools",
            "chapterNumber": 5,
            "chapterTitle": "AI Tools",
            "lessonNumber": 2,
            "lessonTitle": "AI Media Studio",
            "syllabusReference": "GAIO-CLASS8-CH05-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "AI Media Studio Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Studio-Chrono: The Deep-Space Documentary* > **Mission Briefing:** Welcome to the Holo-Cinema Production Studios! > The World Science Foundation has commissioned an urgent educational documentary trailer: *\"Voyage to the Ice Geysers of Enceladus\"*, designed to inspire millions of students worldwide about space exploration. > However, the launch window is in 24 hours, and traditional CGI movie production takes 18 months and $50,000,000! > The studio director has authorized the use of the **AI Media Studio Pipeline**\u2014an automated orchestration suite that links foundation models together: an LLM writes the scientific documentary script, a neural audio model synthesizes a warm British narrator voice, an image diffusion model renders concept shots of icy geysers erupting into space, and an alignment model binds them into a synchronized timeline! > As the **Chief Multimodal Pipeline Director**, your mission is to orchestrate the models in Python, eliminate pacing latency, prevent visual continuity glitches, and produce a broadcast-quality science trailer! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of AI Media Studio.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "AI Media Studio",
              "overview": "Key theoretical principles and architecture defining AI Media Studio.",
              "blocks": [
                {
                  "title": "What is a Chained Multimodal Pipeline?",
                  "summary": "Individual AI models specialize in a single sense (LLMs handle text, Diffusion handles vision, Neural Vocoders handle speech). Modern digital media production links them in a Chained Production Pipeline:",
                  "keyPoints": [
                    "Core principle behind What is a Chained Multimodal Pipeline?",
                    "Real-world architecture and deployment pattern"
                  ]
                },
                {
                  "title": "Pipeline Latency & Asynchronous Streaming",
                  "summary": "When chaining models, Latency accumulates quickly:\n- If Script Generation takes 3 seconds...\n- Voice Synthesis takes 6 seconds...\n- Video Frame Rendering takes 18 seconds...\n- Total linear wait time = 27 seconds!\nTo solve this, professional media pipelines use",
                  "keyPoints": [
                    "If Script Generation takes 3 seconds...",
                    "Voice Synthesis takes 6 seconds...",
                    "Video Frame Rendering takes 18 seconds...",
                    "Total linear wait time = **27 seconds**!"
                  ]
                },
                {
                  "title": "The Threat of \"Synthetic Slop\"",
                  "summary": "As multimodal pipelines make generating complete videos as easy as clicking a button, the internet has experienced an avalanche of \"Synthetic Slop\":\n- Millions of automated spam channels churn out nonsensical, low-effort videos with robot voices reading stolen",
                  "keyPoints": [
                    "Millions of automated spam channels churn out nonsensical, low-effort videos with robot voices reading stolen articles, ",
                    "**The Creator Mandate:** True excellence requires human directorial curation, verified scientific accuracy, and emotiona",
                    ""
                  ]
                }
              ]
            },
            "experiment": {
              "title": "AI Media Studio Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for AI Media Studio.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "The Virtual Film Producer",
              "engineType": " Multimodal Pipeline Orchestrator & Audio-Visual Synchronization Suite.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in The Virtual Film Producer.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "AI Media Studio Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 5 LESSON 2\n# MULTIMODAL AI: CHAINED MEDIA PIPELINE ORCHESTRATOR\n# =====================================================================\n\ndef simulate_llm_script_generator(topic):\n    \"\"\"\n    Stage 1: Generates a structured multi-scene narrative script.\n    \"\"\"\n    print(f\"[Stage 1: LLM Engine] Generating structured documentary script for '{topic}'...\")\n    # Simulated structured output\n    script_scenes = [\n        {\n            \"scene_num\": 1,\n            \"narration\": \"Beneath twenty kilometers of solid ice, Saturn's moon Enceladus conceals a vast, warm liquid ocean.\",\n            \"visual_prompt\": \"Cinematic wide shot of Saturn's moon Enceladus against dark starfield, glowing blue ice fissures, 8k\",\n            \"audio_mood\": \"Mysterious & Wonder-filled\"\n        },\n        {\n            \"scene_num\": 2,\n            \"narration\": \"Through colossal cracks, giant cryo-volcanoes blast water geysers hundreds of miles into the vacuum of space.\",\n            \"visual_prompt\": \"Colossal ice geysers erupting into space from glowing turquoise ice crevasses, sun backlit, photorealistic\",\n            \"audio_mood\": \"Dramatic & Majestic\"\n        }\n    ]\n    return script_scenes\n\ndef simulate_neural_tts(narration_text, speech_rate_wpm=140):\n    \"\"\"\n    Stage 2: Synthesizes voice audio and calculates exact duration in seconds.\n    \"\"\"\n    words = len(narration_text.split())\n    # Duration = (words / words_per_minute) * 60 seconds\n    duration_seconds = round((words / speech_rate_wpm) * 60, 2)\n    return {\n        \"audio_asset_id\": f\"audio_{abs(hash(narration_text)) % 10000}.wav\",\n        \"duration_sec\": duration_seconds,\n        \"sample_rate_hz\": 44100\n    }\n\ndef simulate_visual_diffusion_render(visual_prompt, target_duration_sec):\n    \"\"\"\n    Stage 3: Renders visual media assets matching target audio duration.\n    \"\"\"\n    # Video models generate 24 frames per second\n    total_frames = int(target_duration_sec * 24)\n    return {\n        \"video_asset_id\": f\"clip_{abs(hash(visual_prompt)) % 10000}.mp4\",\n        \"frames_rendered\": total_frames,\n        \"aspect_ratio\": \"16:9\",\n        \"resolution\": \"1920x1080\"\n    }\n\ndef orchestrate_multimodal_production(documentary_topic):\n    \"\"\"\n    Stage 4: Chains all modalities together and compiles the final production timeline.\n    \"\"\"\n    print(\"=\" * 65)\n    print(\"\ud83c\udfac STUDIO-CHRONO: MULTIMODAL AI PIPELINE ORCHESTRATOR \ud83c\udfac\")\n    print(\"=\" * 65)\n    \n    scenes = simulate_llm_script_generator(documentary_topic)\n    production_timeline = []\n    total_runtime_sec = 0.0\n    \n    print(\"\\n[Stage 2 & 3: Parallel Voice Synthesis & Diffusion Rendering]\")\n    for sc in scenes:\n        audio = simulate_neural_tts(sc[\"narration\"])\n        visual = simulate_visual_diffusion_render(sc[\"visual_prompt\"], audio[\"duration_sec\"])\n        \n        timeline_entry = {\n            \"scene\": sc[\"scene_num\"],\n            \"narration\": sc[\"narration\"],\n            \"audio_file\": audio[\"audio_asset_id\"],\n            \"duration\": audio[\"duration_sec\"],\n            \"video_file\": visual[\"video_asset_id\"],\n            \"frames\": visual[\"frames_rendered\"]\n        }\n        production_timeline.append(timeline_entry)\n        total_runtime_sec += audio[\"duration_sec\"]\n        \n        print(f\"  \u2022 Scene #{sc['scene_num']}: Voice Duration = {audio['duration_sec']}s \u2794 Rendered {visual['frames_rendered']} frames ({visual['video_asset_id']})\")\n\n    # Final Composite Output\n    print(\"\\n\" + \"=\" * 65)\n    print(\"\ud83d\udcfc FINAL COMPOSITE MASTER TIMELINE (Muxed & Aligned)\")\n    print(\"=\" * 65)\n    for entry in production_timeline:\n        print(f\"[Scene {entry['scene']}] ({entry['duration']}s) - Asset: {entry['video_file']} + {entry['audio_file']}\")\n        print(f\"  Subtitle Text: \\\"{entry['narration'][:70]}...\\\"\")\n    print(\"-\" * 65)\n    print(f\"Final Trailer Runtime: {total_runtime_sec:.1f} seconds. Audio and visuals in 100% sync!\")\n    print(\"Production Package Exported: Ready for global broadcast.\\n\")\n\n# Run the complete multimodal pipeline\nif __name__ == \"__main__\":\n    orchestrate_multimodal_production(\"The Cryo-Geysers of Enceladus\")",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-5-2-1",
                  "questionNumber": 1,
                  "questionText": "(Multimodal Pipeline Architecture)\nIn a modern automated AI media generation studio, what is the primary architectural function of the Orchestrator?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Individual neural models (LLMs, TTS, Diffusion) operate in isolated mathematical formats. The Pipeline Orchestrator is the software backbone: it receives inputs, schedules parallel API calls, translates intermediate JSON payloads, manages audio-visual timing alignment, and muxes composite video files.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-2-2",
                  "questionNumber": 2,
                  "questionText": "(Audio-Visual Latency & Temporal Synchronization)\nWhy does an automated media pipeline calculate the exact audio duration of a voiceover file before triggering the video diffusion generation step?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In video editing, temporal synchronization is paramount. Spoken speech has variable cadence based on word count and pause duration. Measuring the precise audio waveform runtime ($t{\\text{audio}}$) allows the orchestrator to command the video generation engine to render exactly $24 \\times t{\\text{audio}}$ frames, guaranteeing zero dead-space or trun",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-2-3",
                  "questionNumber": 3,
                  "questionText": "(Information Ecology: The \"Synthetic Slop\" Dilemma)\nIn media studies and digital literacy, what does the term \"Synthetic Slop\" describe?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Coined by technology critics, \"Synthetic Slop\" refers to the tsunami of low-effort, automated AI media churned out by clickbait spammers seeking ad revenue. Because multimodal generation is practically zero-cost, millions of synthetic videos flood search engines, spreading misinformation, degrading web utility, and crowding out genuine creative lab",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-2-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Cross-Modal Error Propagation)\nIn a 3-stage multimodal pipeline (LLM Script \u2794 Text-to-Image Diffusion \u2794 Video Interpolator), what is the risk of Error Propagation (Cascading Failures)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In chained pipelines, errors cascade and compound. Downstream generative models have zero factual validation filters; they simply visualize whatever conditioning text they receive. A subtle text hallucination in Stage 1 becomes an authoritative, cinematic visual reality in Stage 3, demonstrating why human verification gates are essential between pi",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-5-2-5",
                  "questionNumber": 5,
                  "questionText": "(Audio Synthesis: Neural Vocoders)\nWhat is the technological role of a Neural Vocoder (such as WaveNet or HiFi-GAN) in modern Text-to-Speech (TTS) AI systems?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Traditional robotic speech sounds metallic and monotone. Modern neural TTS splits generation into two steps: an acoustic model predicts frequency spectrograms from text tokens, and a Neural Vocoder synthesizes raw continuous audio waveforms from those spectrograms, reproducing human vocal tract resonances with lifelike fidelity.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: AI Media Studio",
              "scenario": "An automated system in AI Media Studio must resolve a critical privacy vs utility trade-off.",
              "dilemma": "The Human Director: Curating Meaning Over Volume In an age where machines can produce thousands of videos per hour: - Quality Over Quantity: The mark of a true creative technologist is not how many gigabytes of synthetic media you generate, but how much truth, beauty, and wisdom your stories convey.",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "class8-ch6",
        "chapterNumber": 6,
        "title": "Responsible AI",
        "description": "Deepfake Alert! & Your Data, Your Right",
        "icon": "Lock",
        "lessons": [
          {
            "id": "class8-ch6-l1",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 1,
            "lessonTitle": "Deepfake Alert!",
            "syllabusReference": "GAIO-CLASS8-CH06-L1",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "Deepfake Alert! Master",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "AI Systems Specialist",
              "targetEntity": "Intelligent Autonomous Node",
              "urgency": "High",
              "missionBrief": "> **Mission Codename:** *Operation Cyber-Verdict: The Courtroom Gauntlet* > **Mission Briefing:** Emergency at the Federal High Court of Justice! > A high-profile corporate trial is underway involving a major tech titan accused of industrial sabotage. The prosecution has submitted a bombshell piece of video evidence: a smartphone video of the CEO meeting with a rival operative in a dark parking garage, agreeing to steal confidential quantum algorithms. > The defense team vehemently objects, claiming the video is an **Adversarial Neural Deepfake** manufactured by a hostile foreign intelligence syndicate! > Millions of shares in the stock market are tumbling, and the trial is paralyzed! The judge has appointed you as the **Independent Expert Technical Witness** to the High Court! > Your mission is to enter the *Cyber Forensic Courtroom*, deploy biological rPPG pulse scanners, calculate blink frequency distributions, analyze frequency Fourier spectra, and present mathematically incontrovertible evidence to convict the fraud or exonerate the defendant! ---",
              "learningObjectives": [
                "Master key theoretical fundamentals of Deepfake Alert!.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Deepfake Alert!",
              "overview": "Key theoretical principles and architecture defining Deepfake Alert!.",
              "blocks": [
                {
                  "title": "The Mechanics of Advanced Deepfake Synthesis",
                  "summary": "Early deepfakes were blurry face-swaps. Modern neural deepfakes use multi-stage architectures:\n1. Facial Landmark Tracking: Detects 68 distinct 3D geometric coordinates on the target face (eyebrows, nose bridge, lip contours).\n2. Autoencoder Latent Blending: E",
                  "keyPoints": [
                    "**Facial Landmark Tracking:** Detects 68 distinct 3D geometric coordinates on the target face (eyebrows, nose bridge, li",
                    "**Autoencoder Latent Blending:** Encodes source facial expressions into a shared latent vector space and decodes them on",
                    "**Neural Inpainting & Boundary Blending:** Smooths the hairline and neck boundaries to eliminate visible seam lines."
                  ]
                },
                {
                  "title": "Biological Forensic Indicator 1: The Human Blink Cadence",
                  "summary": "- In healthy biological humans, spontaneous involuntary blinking occurs at a rate of 12 to 20 blinks per minute (roughly one blink every 3 to 5 seconds).\n- Each blink lasts approximately 100 to 400 milliseconds.\n- In early and mid-tier deepfakes, because train",
                  "keyPoints": [
                    "In healthy biological humans, spontaneous involuntary blinking occurs at a rate of **12 to 20 blinks per minute** (rough",
                    "Each blink lasts approximately **100 to 400 milliseconds**.",
                    "In early and mid-tier deepfakes, because training datasets predominantly consist of celebrity photographs from Google wi"
                  ]
                },
                {
                  "title": "Biological Forensic Indicator 2: Remote Photoplethysmography",
                  "summary": "- Did you know your face changes color with every heartbeat?\n- When the human heart pumps oxygenated blood through the carotid artery into facial skin capillaries, red/green optical light reflectance shifts by a fraction of a percent.\n- The rPPG Detector: High",
                  "keyPoints": [
                    "Did you know your face changes color with every heartbeat?",
                    "When the human heart pumps oxygenated blood through the carotid artery into facial skin capillaries, red/green optical l",
                    "**The rPPG Detector:** High-precision optical algorithms amplify these microscopic facial color fluctuations to extract ",
                    "**The Deepfake Tell:** An AI-generated synthetic face has zero vascular biology! The skin pixels do not pulse in rhythm "
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Deepfake Alert! Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Deepfake Alert!.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "Baseline Parameter Calibration",
                  "instruction": "Initialize sensor streams and data models.",
                  "systemBehavior": "Default state logged at 100% confidence."
                },
                {
                  "stepNumber": 2,
                  "title": "Edge-Case Stress Test",
                  "instruction": "Inject noisy inputs or distorted samples.",
                  "systemBehavior": "System detects anomalies and updates threshold."
                },
                {
                  "stepNumber": 3,
                  "title": "Verification & Output Audit",
                  "instruction": "Evaluate final accuracy and log latency.",
                  "systemBehavior": "Performance metrics validated against benchmark."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Cyber Forensic Courtroom",
              "engineType": " Expert Witness Trial Simulator & Biometric Signal Analysis Suite.",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Cyber Forensic Courtroom.",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "Initial Encounter",
                  "evidence": "Incoming data features high variance and partial missing values.",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Standardize & Impute",
                      "description": "Normalize distributions and handle missing inputs gracefully.",
                      "actionLabel": "Normalize Data",
                      "isCorrect": true,
                      "feedback": "Excellent choice! Model accuracy preserved.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Ignore Nulls",
                      "description": "Feed raw incomplete data directly into inference pipeline.",
                      "actionLabel": "Ignore and Run",
                      "isCorrect": false,
                      "feedback": "Crash! Pipeline encountered NaN exceptions.",
                      "points": 0
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "Adversarial Edge Case",
                  "evidence": "Unusual input pattern detected near the decision boundary.",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Ensemble Cross-Validation",
                      "description": "Query multi-head consensus before committing decision.",
                      "actionLabel": "Run Consensus",
                      "isCorrect": true,
                      "feedback": "Robust detection! False positive prevented.",
                      "points": 150
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Single-Point Inference",
                      "description": "Trust single heuristic without sanity checks.",
                      "actionLabel": "Trust Single Heuristic",
                      "isCorrect": false,
                      "feedback": "Misclassification! The adversarial example bypassed detection.",
                      "points": 20
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Deepfake Alert! Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "# =====================================================================\n# AI OLYMPIAD CLASS 8: CHAPTER 6 LESSON 1\n# CYBER FORENSICS: BIOMETRIC EYE BLINK & rPPG PULSE SIGNAL ANALYZER\n# =====================================================================\n\ndef analyze_facial_blink_cadence(ear_time_series, fps=30):\n    \"\"\"\n    Analyzes Eye Aspect Ratio (EAR) telemetry across video frames.\n    - An EAR drop below 0.20 indicates a closed eyelid (blink).\n    - Measures total blinks, average blink duration, and blinks per minute.\n    \"\"\"\n    total_frames = len(ear_time_series)\n    duration_seconds = total_frames / fps\n    duration_minutes = duration_seconds / 60.0\n    \n    blink_count = 0\n    in_blink = False\n    blink_frame_durations = []\n    current_blink_frames = 0\n    \n    for ear in ear_time_series:\n        if ear < 0.20:\n            # Eyelid is closed\n            current_blink_frames += 1\n            if not in_blink:\n                in_blink = True\n                blink_count += 1\n        else:\n            # Eyelid is open\n            if in_blink:\n                blink_frame_durations.append(current_blink_frames)\n                current_blink_frames = 0\n                in_blink = False\n                \n    blinks_per_min = blink_count / duration_minutes if duration_minutes > 0 else 0\n    avg_duration_ms = (sum(blink_frame_durations) / len(blink_frame_durations) * (1000 / fps)) if blink_frame_durations else 0\n    \n    # Biometric Sanity Check: Healthy humans blink 12 to 20 times per minute\n    is_biologically_natural = 8.0 <= blinks_per_min <= 25.0\n    \n    return {\n        \"video_duration_sec\": round(duration_seconds, 1),\n        \"total_blinks\": blink_count,\n        \"blinks_per_minute\": round(blinks_per_min, 1),\n        \"avg_blink_ms\": round(avg_duration_ms, 1),\n        \"is_natural_blinking\": is_biologically_natural\n    }\n\ndef analyze_rppg_cardiac_pulse(skin_reflectance_series):\n    \"\"\"\n    Simulates remote photoplethysmography (rPPG) vascular pulse analysis.\n    Biological skin has cyclic periodic capillary variation (60-100 BPM).\n    Synthetic deepfakes display flat noise with near-zero periodic variance.\n    \"\"\"\n    import statistics\n    variance = statistics.variance(skin_reflectance_series)\n    \n    # A true biological pulse generates standard cyclical variance > 0.15\n    has_biological_pulse = variance > 0.15\n    simulated_bpm = 72 if has_biological_pulse else 0\n    \n    return {\n        \"signal_variance\": round(variance, 4),\n        \"detected_pulse_bpm\": simulated_bpm,\n        \"has_cardiac_signature\": has_biological_pulse\n    }\n\n# ----------------- SIMULATED COURTROOM EVIDENCE TELEMETRY -----------------\n# 30 seconds of video (900 frames at 30 FPS)\n# Scenario 1: Real human subject (Natural blinking, pulsating blood flow)\n# Scenario 2: Deepfake target (Only 1 blink in 30 seconds, zero pulse variance)\n\n# Normal human EAR series: blinks every 3-4 seconds (around 8 blinks total)\nreal_ear_data = [0.32] * 900\nfor frame_idx in [100, 210, 320, 440, 560, 680, 800]:\n    for f in range(frame_idx, frame_idx + 5):  # 5 frames closed (~160 ms)\n        real_ear_data[f] = 0.15\n\n# Deepfake EAR series: Stares unblinkingly with only 1 micro-flutter\nfake_ear_data = [0.31] * 900\nfake_ear_data[400] = 0.18  # Single anomalous 1-frame dip\n\nreal_skin_pulse = [0.5 + 0.2 * ((i % 25) / 25.0) for i in range(100)]  # Rhythmic pulse\nfake_skin_pulse = [0.51 + 0.002 * (i % 3) for i in range(100)]         # Flat synthetic noise\n\nprint(\"=== HIGH COURT FORENSIC BIOMETRIC TRIAL REPORT ===\\n\")\n\nprint(\"--- EXHIBIT A: PROSECUTION SURVEILLANCE VIDEO ---\")\nblink_audit = analyze_facial_blink_cadence(fake_ear_data, fps=30)\npulse_audit = analyze_rppg_cardiac_pulse(fake_skin_pulse)\n\nprint(f\"Video Duration       : {blink_audit['video_duration_sec']} seconds\")\nprint(f\"Blink Telemetry      : {blink_audit['total_blinks']} blinks ({blink_audit['blinks_per_minute']} blinks/min) [Normal: 12-20]\")\nprint(f\"Blink Authenticity   : {'\u2705 Natural' if blink_audit['is_natural_blinking'] else '\ud83d\udea8 ANOMALOUS (Unnatural Stare)'}\")\nprint(f\"rPPG Cardiac Pulse   : {pulse_audit['detected_pulse_bpm']} BPM (Variance: {pulse_audit['signal_variance']})\")\nprint(f\"Vascular Capillaries : {'\u2705 Biological Blood Flow Present' if pulse_audit['has_cardiac_signature'] else '\ud83d\udea8 ABSENT (Zero Biological Cardiac Pulse)'}\")\n\nprint(\"\\n\" + \"=\" * 65)\nprint(\"\u2696\ufe0f EXPERT FORENSIC VERDICT TO THE COURT:\")\nif not blink_audit['is_natural_blinking'] and not pulse_audit['has_cardiac_signature']:\n    print(\"CONCLUSION: Exhibit A is an ADVERSARIAL NEURAL DEEPFAKE with >99.9% certainty!\")\n    print(\"Evidentiary basis: Complete absence of biological capillary pulse and unnatural blink frequency.\")\nelse:\n    print(\"CONCLUSION: Exhibit A is an AUTHENTIC BIOLOGICAL RECORDING.\")\nprint(\"=\" * 65)",
              "expectedOutput": "Execution complete: 100% test vectors passed.",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-6-1-1",
                  "questionNumber": 1,
                  "questionText": "(Biometric Signal Forensics)\nWhat biological physiological phenomenon does Remote Photoplethysmography (rPPG) measure to detect whether a human face on video is a biological human or an AI deepfake?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Remote Photoplethysmography (rPPG) is an optical cardiovascular imaging technique. With every cardiac cycle, capillary blood volume modulates the amount of reflected green and red ambient light. While invisible to casual human viewers, computational signal extraction recovers the exact cardiovascular pulse waveform ($60 - 100\\text{ BPM}$). Neural d",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-1-2",
                  "questionNumber": 2,
                  "questionText": "(Spontaneous Human Blinking Metrics)\nIn forensic behavioral video analysis, why do early and mid-tier deepfake video models frequently display severe blink rate anomalies (e.g., staring unblinkingly for 60 seconds or blinking for only a single 30-millisecond frame)?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In voluntary human physiology, blinking is controlled by the dopaminergic neurological system. Because training datasets (like CelebA) scrape public photographs where subjects are smiling at the camera with open eyes, neural autoencoders fail to learn the biomechanical dynamics and temporal recurrence of natural eyelid closures.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-1-3",
                  "questionNumber": 3,
                  "questionText": "(Spatial Frequency Domain Artifacts)\nWhat distinct visual artifact is uncovered when a digital forensic investigator applies a 2D Fast Fourier Transform (FFT) to an image synthesized by a convolutional generative adversarial network?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In deep generative architectures, neural upsampling (such as Conv2DTranspose or bilinear resizing) introduces subtle periodic spatial interpolation artifacts. While virtually imperceptible in the spatial RGB domain, transforming the frame into the Fourier frequency domain reveals distinct symmetrical grid spikes\u2014the unmistakable mathematical signat",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-1-4",
                  "questionNumber": 4,
                  "questionText": "(Higher-Order Scenario: Audio-Visual Plosive Desynchronization)\nA forensic examiner analyzes an alleged speech by a government official. During the word \"Billion\", the sound of the letter \"B\" is heard clearly through the speakers, but on the high-speed video frame, the speaker's ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "In human phonetics, Bilabial Plosives (/p/, /b/, /m/) have rigid physiological constraints: the lips must physically seal to create oral pressure before releasing the acoustic burst. Sound cannot precede physical lip contact. A 120 ms lag is well beyond physiological tolerance, proving artificial splicing or imperfect neural lip-sync generation.",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-1-5",
                  "questionNumber": 5,
                  "questionText": "(Legal & Criminal Consequences of Synthetic Forgery)\nWhat legal criminal charges can be brought against individuals who create non-consensual deepfakes depicting real people without their permission to extort money or damage their reputations?\n-",
                  "options": [
                    {
                      "key": "A",
                      "text": "Adaptive algorithmic convergence"
                    },
                    {
                      "key": "B",
                      "text": "Static linear interpolation"
                    },
                    {
                      "key": "C",
                      "text": "Uncalibrated gradient ascent"
                    },
                    {
                      "key": "D",
                      "text": "Deterministic memory saturation"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "Creating non-consensual deepfakes of real people is a severe crime under emerging global statutes (e.g., the US DEFIANCE Act, India's IT Act Sections 66D/66E, and the EU AI Act). Perpetrators face serious felony prosecution for criminal identity theft, fraud, defamation, and intentional infliction of emotional distress.\n\n---",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Deepfake Alert!",
              "scenario": "An automated system in Deepfake Alert! must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 1: Deepfake Alert! Syllabus Reference: Class 8, Chapter 6 (Responsible AI) \u2014 Lesson 1: Deepfake Alert! Target Age Group: 13\u201314 Years (Middle Level Advanced) Estimated Duration: 45\u201360 Minutes",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          },
          {
            "id": "class8-ch6-l2",
            "classKey": "class8",
            "classTitle": "Class 8",
            "chapterId": "Chapter_6_Responsible_AI",
            "chapterNumber": 6,
            "chapterTitle": "Responsible AI",
            "lessonNumber": 2,
            "lessonTitle": "Your Data, Your Right",
            "syllabusReference": "** GAIO-M8-CH06-L2",
            "estimatedMinutes": 45,
            "xpReward": 350,
            "badgeTitle": "High Commissioner of Digital Sovereignty",
            "badgeIcon": "Award",
            "briefing": {
              "agentRole": "Cyber Ombudsman Lead",
              "targetEntity": "Omnicorporate \"HyperNet AI Ecosystem\" (OmniApp v9.4)",
              "urgency": "High",
              "missionBrief": "``` OmniApp\u2014a wildly popular cloud gaming and social study assistant used across 80,000 schools\u2014just pushed an unannounced terms-of-service update. Initial reports reveal that OmniApp is: 1. Harvesting keystroke dynamics, webcam facial geometry, and homework answers. 2. Feeding student study chats into a proprietary Large Language Model without consent. 3. Deploying deceptive \"Roach Motel\" and \"Confirmshaming\" dark patterns to block users from deleting accounts or exercising their Right to be Forgotten.",
              "learningObjectives": [
                "Master key theoretical fundamentals of Your Data, Your Right.",
                "Evaluate edge cases and algorithmic models.",
                "Implement and verify Python solutions."
              ],
              "prerequisites": [
                "Foundational computer literacy",
                "Curiosity about intelligent systems"
              ]
            },
            "concept": {
              "mainHeading": "Your Data, Your Right",
              "overview": "Key theoretical principles and architecture defining Your Data, Your Right.",
              "blocks": [
                {
                  "title": "4.1 The Spectrum of Digital Data: What Are Apps Actually Col",
                  "summary": "Every click, pause, search query, and sensor reading forms a data point. Privacy law categorizes data into tiers based on harm risk:",
                  "keyPoints": [
                    ""
                  ]
                },
                {
                  "title": "4.2 Global Data Protection Regimes: The Legal Shield",
                  "summary": "Over 140 countries now enforce omnibus data privacy laws. Three global benchmarks set the international standard:",
                  "keyPoints": [
                    ""
                  ]
                },
                {
                  "title": "4.3 The Five Fundamental Data Rights of Every Citizen",
                  "summary": "+---------------------------------------------------------------+\n       |             THE 5 PILLARS OF DATA CITIZENSHIP                 |\n       +---------------------------------------------------------------+\n       |  1. RIGHT TO ACCESS       | View all pe",
                  "keyPoints": [
                    "**Right to Access (Subject Access Request - SAR):**",
                    "- You have the right to request a complete copy of every data point an AI platform or social network stores about you, i",
                    "**Right to Rectification (Correction):**",
                    "- If an automated fraud detector or school grading AI has an erroneous record (e.g., marking you as a delinquent user du"
                  ]
                }
              ]
            },
            "experiment": {
              "title": "Your Data, Your Right Simulation Lab",
              "objective": "Simulate runtime behaviors and test system parameters for Your Data, Your Right.",
              "steps": [
                {
                  "stepNumber": 1,
                  "title": "--------------------------------------------------",
                  "instruction": "Inspect manifest requirements against actual core functionality: - Core Purpose: Flashcard study & quiz generator. - Requested Permissions:",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                },
                {
                  "stepNumber": 2,
                  "title": "--------------------------------------------------",
                  "instruction": "- Length: 14,200 words (Approx. 58 minutes reading time for an adult). - Flesch-Kincaid Reading Grade Level: Grade 17 (Post-graduate legal jargon). - Targeted Minor Clauses:",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                },
                {
                  "stepNumber": 3,
                  "title": "--------------------------------------------------",
                  "instruction": "- Export Data Button: Hidden 5 levels deep in Profile -> Security -> Legal -> Advanced -> Archive. - Export Format: Encrypted proprietary .dat file (Violates Portability: not open JSON/CSV). - Account",
                  "systemBehavior": "Simulator adjusts weights and evaluates performance metrics."
                }
              ],
              "parameterControls": [
                {
                  "id": "param-1",
                  "label": "Learning Rate / Sensitivity",
                  "min": 1,
                  "max": 10,
                  "defaultValue": 5,
                  "unit": "x"
                },
                {
                  "id": "param-2",
                  "label": "Noise Threshold Filter",
                  "min": 0,
                  "max": 100,
                  "defaultValue": 25,
                  "unit": "%"
                }
              ]
            },
            "game": {
              "gameTitle": "Data Sovereign Defense (The Privacy Ombudsman Simulator)",
              "engineType": "Legal-Tech Audit & Regulatory Enforcement Simulator",
              "objective": "Resolve edge cases and achieve maximum system fidelity in Data Sovereign Defense (The Privacy Ombudsman Simulator).",
              "rules": [
                "Examine evidence and sensor telemetry for each scenario.",
                "Choose the optimal algorithmic intervention.",
                "Score multiplier increases with consecutive correct decisions."
              ],
              "scenarios": [
                {
                  "id": "sc-1",
                  "levelNumber": 1,
                  "title": "- Evidence Found: Collects biometric facial coordi",
                  "evidence": "\"Agreement\" button styled in bright green, while the \"Decline\" button is invisible gray text. - Player Action:",
                  "choices": [
                    {
                      "id": "ch-1-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-1-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-2",
                  "levelNumber": 2,
                  "title": "- Evidence Found: User chat transcripts containing",
                  "evidence": "streamed directly into the public model fine-tuning corpus without parental consent. - Player Action:",
                  "choices": [
                    {
                      "id": "ch-2-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-2-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                },
                {
                  "id": "sc-3",
                  "levelNumber": 3,
                  "title": "- Evidence Found: App refuses to run unless user g",
                  "evidence": "a user requests account deletion, the system charges an administrative fee of $25. - Player Action:",
                  "choices": [
                    {
                      "id": "ch-3-a",
                      "title": "Protocol Alpha (Optimized AI Strategy)",
                      "description": "Deploy adaptive calibration and verified algorithmic guardrails.",
                      "actionLabel": "Apply Adaptive Guardrail",
                      "isCorrect": true,
                      "feedback": "Correct! Optimal convergence achieved with zero regression.",
                      "points": 100
                    },
                    {
                      "id": "ch-3-b",
                      "title": "Protocol Beta (Static Bypass)",
                      "description": "Bypass model validation and force static default thresholds.",
                      "actionLabel": "Force Static Bypass",
                      "isCorrect": false,
                      "feedback": "Caution! Static thresholds fail when encountering unseen data variations.",
                      "points": 25
                    }
                  ]
                }
              ]
            },
            "python": {
              "title": "Your Data, Your Right Python Sandbox",
              "description": "Verified runnable Python implementation demonstrating algorithmic foundations.",
              "starterCode": "\"\"\"\nSovereignShieldEngine - Privacy Policy Lexical Scanner & Dark Pattern Auditor\nClass 8 Olympiad Standard - Chapter 6, Lesson 2\nAuthor: AI Olympiad Curriculum Development Team\n\"\"\"\n\nimport re\nfrom typing import Dict, List, Any\n\n\nclass SovereignShieldEngine:\n    \"\"\"\n    Forensic auditing engine for parsing privacy policies, terms of service,\n    and user consent declarations to identify privacy violations and dark patterns.\n    \"\"\"\n\n    def __init__(self, platform_name: str):\n        self.platform = platform_name\n        \n        # Risk dictionary mapping indicators to risk scores and descriptions\n        self.risk_taxonomy = {\n            \"biometric_harvesting\": {\n                \"patterns\": [r\"facial recognition\", r\"face geometry\", r\"voiceprint\", r\"biometric data\"],\n                \"severity\": 30,\n                \"category\": \"Sensitive Personal Data (SPDI)\"\n            },\n            \"third_party_ad_sharing\": {\n                \"patterns\": [r\"advertising partners\", r\"marketing affiliates\", r\"monetize your data\", r\"commercial brokers\"],\n                \"severity\": 20,\n                \"category\": \"Data Commercialization\"\n            },\n            \"ai_training_ingestion\": {\n                \"patterns\": [r\"train our models\", r\"machine learning improvements\", r\"fine-tune algorithms\", r\"ingest user content\"],\n                \"severity\": 25,\n                \"category\": \"AI Model Training Ingestion\"\n            },\n            \"forced_tracking\": {\n                \"patterns\": [r\"precise location\", r\"background gps\", r\"keystroke dynamics\", r\"device serial number\"],\n                \"severity\": 15,\n                \"category\": \"Excessive Telemetry\"\n            },\n            \"dark_pattern_consent\": {\n                \"patterns\": [r\"pre-selected\", r\"opt-out required\", r\"deemed to have consented\", r\"irrevocable license to your content\"],\n                \"severity\": 25,\n                \"category\": \"Deceptive Consent / Dark Pattern\"\n            }\n        }\n\n    def calculate_reading_ease(self, text: str) -> Dict[str, Any]:\n        \"\"\"\n        Calculates an approximate Flesch Reading Ease score to detect\n        deliberately obfuscated, unreadable legal text (Privacy Zuckering).\n        \"\"\"\n        words = re.findall(r'\\b[A-Za-z]+\\b', text)\n        sentences = re.split(r'[\\.\\?!]+', text)\n        sentences = [s for s in sentences if len(s.strip()) > 0]\n        \n        word_count = len(words)\n        sentence_count = max(len(sentences), 1)\n        \n        if word_count == 0:\n            return {\"score\": 0, \"status\": \"Empty Text\"}\n            \n        # Approximation of syllables based on vowel clusters\n        syllable_count = 0\n        for word in words:\n            vowels = re.findall(r'[aeiouy]+', word.lower())\n            syllable_count += max(len(vowels), 1)\n\n        # Flesch Reading Ease formula\n        fre_score = 206.835 - (1.015 * (word_count / sentence_count)) - (84.6 * (syllable_count / word_count))\n        fre_score = round(max(0.0, min(100.0, fre_score)), 1)\n        \n        if fre_score >= 60:\n            readability = \"Transparent & Accessible (Easy)\"\n        elif fre_score >= 30:\n            readability = \"Dense Legal Jargon (College Level)\"\n        else:\n            readability = \"Extreme Obfuscation (Post-Graduate / Privacy Zuckering)\"\n\n        return {\n            \"score\": fre_score,\n            \"word_count\": word_count,\n            \"sentence_count\": sentence_count,\n            \"readability_status\": readability\n        }\n\n    def audit_policy(self, policy_text: str) -> Dict[str, Any]:\n        \"\"\"\n        Conducts pattern matching across all risk categories and tallies risk points.\n        \"\"\"\n        clean_text = policy_text.lower()\n        findings: List[Dict[str, Any]] = []\n        total_risk_score = 0\n\n        for key, config in self.risk_taxonomy.items():\n            matches_found = []\n            for pattern in config[\"patterns\"]:\n                matches = re.findall(pattern, clean_text)\n                if matches:\n                    matches_found.extend(list(set(matches)))\n            \n            if matches_found:\n                total_risk_score += config[\"severity\"]\n                findings.append({\n                    \"risk_key\": key,\n                    \"category\": config[\"category\"],\n                    \"severity_points\": config[\"severity\"],\n                    \"detected_keywords\": matches_found\n                })\n\n        # Cap risk score at 100\n        total_risk_score = min(total_risk_score, 100)\n        readability = self.calculate_reading_ease(policy_text)\n\n        # Compliance tier\n        if total_risk_score < 25:\n            verdict = \"COMPLIANT: Low Risk, High Transparency\"\n            action = \"Approve for Student Use\"\n        elif total_risk_score < 60:\n            verdict = \"WARNING: Moderate Privacy Concerns\"\n            action = \"Issue Remediation Notice for Data Pruning\"\n        else:\n            verdict = \"VIOLATION: High Danger / Egregious Exploitation\"\n            action = \"Immediate Enforcement Halt & Statutory Fine\"\n\n        return {\n            \"platform\": self.platform,\n            \"total_risk_score\": total_risk_score,\n            \"verdict\": verdict,\n            \"mandatory_action\": action,\n            \"readability\": readability,\n            \"findings_count\": len(findings),\n            \"findings\": findings\n        }\n\n    def generate_audit_report(self, audit_result: Dict[str, Any]) -> str:\n        \"\"\"Formats the audit into an executive compliance dossier.\"\"\"\n        r = audit_result\n        read = r[\"readability\"]\n        \n        report = []\n        report.append(\"=\" * 78)\n        report.append(f\" SOVEREIGN SHIELD AUDIT DOSSIER: {r['platform'].upper()}\")\n        report.append(\"=\" * 78)\n        report.append(f\" OVERALL PRIVACY RISK SCORE : {r['total_risk_score']}/100\")\n        report.append(f\" LEGAL VERDICT              : {r['verdict']}\")\n        report.append(f\" MANDATORY REGULATORY ACTION: {r['mandatory_action']}\")\n        report.append(\"-\" * 78)\n        report.append(\" READABILITY & TRANSPARENCY METRICS:\")\n        report.append(f\"   * Flesch Reading Score   : {read['score']}/100\")\n        report.append(f\"   * Word / Sentence Count  : {read['word_count']} words in {read['sentence_count']} sentences\")\n        report.append(f\"   * Text Complexity        : {read['readability_status']}\")\n        report.append(\"-\" * 78)\n        report.append(\" STATUTORY RISK FINDINGS:\")\n        \n        if not r[\"findings\"]:\n            report.append(\"   [+] No critical legal risk patterns detected.\")\n        else:\n            for i, f in enumerate(r[\"findings\"], 1):\n                report.append(f\"   {i}. [{f['category']}] (+{f['severity_points']} Risk Pts)\")\n                report.append(f\"      Matched Indicators: {', '.join(f['detected_keywords'])}\")\n\n        report.append(\"=\" * 78)\n        return \"\\n\".join(report)\n\n\n# ==============================================================================\n# VERIFICATION & EXECUTION TESTBENCH\n# ==============================================================================\nif __name__ == \"__main__\":\n    print(\"[INIT] Starting SovereignShieldEngine Forensic Testbench...\\n\")\n\n    # Sample Policy 1: Invasive Social EdTech Platform\n    invasive_policy = \"\"\"\n    By accessing OmniStudy AI, the user grants our network an irrevocable license to your content.\n    We continuously collect your precise location and background GPS to optimize local network nodes.\n    Our automated vision systems process face geometry and facial recognition to gauge student engagement.\n    Furthermore, all chat inputs, essays, and uploaded files are used to train our models and\n    fine-tune algorithms for generative AI deployments. Anonymized behavioral vectors are shared with\n    our marketing affiliates and advertising partners to deliver personalized promotional offers.\n    Users are deemed to have consented unless an opt-out required affidavit is mailed to our headquarters.\n    \"\"\"\n\n    # Sample Policy 2: Privacy-First Learning Companion\n    ethical_policy = \"\"\"\n    We respect your rights as a student data principal. We collect only minimal telemetry needed\n    to save your progress locally. We never collect biometric data, facial recognition, or precise location.\n    Your learning chats and assignments are strictly private and are never used to train our models\n    or commercialized with advertising partners. You may exercise your statutory Right to Erasure or\n    export your data at any time directly with a single click in your settings menu.\n    \"\"\"\n\n    # Run Audit 1\n    auditor_bad = SovereignShieldEngine(\"OmniStudy AI (Invasive)\")\n    results_bad = auditor_bad.audit_policy(invasive_policy)\n    print(auditor_bad.generate_audit_report(results_bad))\n\n    print(\"\\n\" + \"#\" * 78 + \"\\n\")\n\n    # Run Audit 2\n    auditor_good = SovereignShieldEngine(\"PureLearn OpenEd (Ethical)\")\n    results_good = auditor_good.audit_policy(ethical_policy)\n    print(auditor_good.generate_audit_report(results_good))",
              "expectedOutput": "",
              "challengeExtension": "Modify the threshold parameter and test how the model behaves on boundary inputs.",
              "concepts": [
                "Standard Library",
                "Data Processing",
                "Algorithmic Verification"
              ]
            },
            "olympiad": {
              "instructions": "5 Competitive Olympiad Questions. Test your conceptual, algorithmic, and ethical reasoning.",
              "passingPercentage": 80,
              "questions": [
                {
                  "id": "q-class8-6-2-1",
                  "questionNumber": 1,
                  "questionText": "(Data Rights Under International Law)\nUnder Article 17 of the GDPR and Section 12 of the India DPDP Act 2023, an individual requests that a gaming platform delete their account and wipe all personal logs. This statutory protection is formally known as:",
                  "options": [
                    {
                      "key": "A",
                      "text": "The Right to Portability"
                    },
                    {
                      "key": "B",
                      "text": "The Right to Erasure (\"Right to be Forgotten\")"
                    },
                    {
                      "key": "C",
                      "text": "The Principle of Data Minimization"
                    },
                    {
                      "key": "D",
                      "text": "The Doctrine of Algorithmic Transparency"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "- Why B is correct: The Right to Erasure, colloquially termed the \"Right to be Forgotten\", legally obligates data fiduciaries to permanently delete an individual\u2019s personal data upon request, revocation of consent, or when the data is no longer necessary for the original collection purpose.\n- Why A is incorrect: The Right to Portability refers to e",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-2-2",
                  "questionNumber": 2,
                  "questionText": "(Deceptive UI Design & Dark Patterns)\nA cloud storage mobile app presents a full-screen popup stating:  \n[ENABLE 24/7 BACKGROUND LOCATION TRACKING] (styled in large glowing green)  \nBelow it, in microscopic, low-contrast light-gray text, is the link:  \n\"No thanks, I prefer my fil",
                  "options": [
                    {
                      "key": "A",
                      "text": "Forced Continuity and Roach Motel"
                    },
                    {
                      "key": "B",
                      "text": "Confirmshaming and Visual Interference / Asymmetric Styling"
                    },
                    {
                      "key": "C",
                      "text": "Sneak into Basket and Bait-and-Switch"
                    },
                    {
                      "key": "D",
                      "text": "Privacy Zuckering and Hidden Costs"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "- Why B is correct: \n  1. Confirmshaming uses emotionally manipulative, guilt-inducing text (\"I prefer my files to be unsafe\") to make the user feel foolish for declining.\n  2. Visual Interference / Asymmetric Styling deliberately formats the preferred corporate choice in vibrant, easy-to-click graphics while camouflaging the decline option in fade",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-2-3",
                  "questionNumber": 3,
                  "questionText": "(AI Training and Data Sovereignty)\nAn online essay-grading AI accepts student school essays. Unbeknownst to the students, the company uses these submitted essays to train their commercial Large Language Model. Three months later, another user enters a prompt and the LLM recites a",
                  "options": [
                    {
                      "key": "A",
                      "text": "Differential Privacy saturation"
                    },
                    {
                      "key": "B",
                      "text": "Training data memorization and model extraction failure"
                    },
                    {
                      "key": "C",
                      "text": "Federated learning parameter drift"
                    },
                    {
                      "key": "D",
                      "text": "Overfitting of the loss gradient during inference"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "- Why B is correct: Deep neural networks, especially overparameterized LLMs, can exhibit training data memorization, storing verbatim text sequences rather than merely learning abstract generalized patterns. When prompted strategically, the model regurgitates private PII from its training set, violating data sovereignty and privacy rights.\n- Why A ",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-2-4",
                  "questionNumber": 4,
                  "questionText": "(Regulatory Penalties & Children's Data Protections)\nUnder Section 9 of the India Digital Personal Data Protection Act (DPDP) 2023, which of the following practices is strictly prohibited for any Data Fiduciary processing personal data belonging to children (individuals under 18 ",
                  "options": [
                    {
                      "key": "A",
                      "text": "Providing educational material through a digital interface"
                    },
                    {
                      "key": "B",
                      "text": "Encrypting user passwords using SHA-256 hashes"
                    },
                    {
                      "key": "C",
                      "text": "Engaging in behavioral tracking, targeted advertising, or processing that causes harm to a child"
                    },
                    {
                      "key": "D",
                      "text": "Storing student test scores in an offline school database"
                    }
                  ],
                  "correctAnswer": "C",
                  "explanation": "- Why C is correct: Section 9 of the DPDP Act 2023 explicitly prohibits Data Fiduciaries from undertaking behavioral tracking, targeted advertisements directed at minors, or any data processing likely to have an adverse effect on the physical or psychological well-being of a child.\n- Why A, B, and D are incorrect: Providing educational content, rob",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                },
                {
                  "id": "q-class8-6-2-5",
                  "questionNumber": 5,
                  "questionText": "(Technical Solutions: Privacy-Preserving AI)\nAn AI hospital consortium wants to train a diagnostic model to detect rare diseases across five independent hospitals without transferring sensitive patient health records out of each hospital's local firewall. Which modern machine lea",
                  "options": [
                    {
                      "key": "A",
                      "text": "Centralized Web Scraping"
                    },
                    {
                      "key": "B",
                      "text": "Federated Learning with Secure Aggregation"
                    },
                    {
                      "key": "C",
                      "text": "Unsupervised K-Means clustering on public cloud buckets"
                    },
                    {
                      "key": "D",
                      "text": "Cloud Model Inversion Processing"
                    }
                  ],
                  "correctAnswer": "B",
                  "explanation": "- Why B is correct: Federated Learning decentralizes machine learning. The model weights are transmitted to each hospital's local server, trained privately on local patient records, and only the encrypted mathematical weight updates (gradients) are sent back to a central server for secure aggregation. Patient PII never leaves the hospital's secured",
                  "hint": "Analyze the core trade-offs between generalization, bias, and error margins."
                }
              ]
            },
            "responsible": {
              "title": "Ethics & Governance: Your Data, Your Right",
              "scenario": "An automated system in Your Data, Your Right must resolve a critical privacy vs utility trade-off.",
              "dilemma": "Lesson 2: Your Data, Your Right ---",
              "choices": [
                {
                  "id": "eth-1",
                  "action": "Enforce Transparent Audit & Privacy-Preserving Guardrails",
                  "impactAnalysis": "Guarantees data sovereignty and fairness, with a minor 2% drop in throughput.",
                  "ethicalScore": 5,
                  "consequence": "Approved! Certified under international responsible AI standards."
                },
                {
                  "id": "eth-2",
                  "action": "Maximize Throughput at the Expense of Explainability",
                  "impactAnalysis": "Delivers highest immediate speed but introduces hidden bias and privacy risks.",
                  "ethicalScore": 1,
                  "consequence": "Flagged! Fails regulatory fairness audits and risks user data leakage."
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

// Utility Helper to Flatten all 36 Lessons
export const ALL_MIDDLE_LESSONS: MiddleLessonData[] = MIDDLE_LEVEL_CURRICULUM.flatMap((c) =>
  c.chapters.flatMap((ch) => ch.lessons)
)

export const getLessonById = (id: string): MiddleLessonData | undefined => {
  return ALL_MIDDLE_LESSONS.find((l) => l.id === id)
}

export const getLessonsForClass = (classKey: string): MiddleLessonData[] => {
  return ALL_MIDDLE_LESSONS.filter((l) => l.classKey === classKey)
}
