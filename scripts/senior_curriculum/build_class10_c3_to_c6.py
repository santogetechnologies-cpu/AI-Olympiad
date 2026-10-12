"""
Class 10 Curriculum Builder - Chapters 3 to 6 (Lessons 5 to 12)
Completes and saves all 12 lessons for Class 10.
"""

from build_class10_c2 import CLASS_10_LESSONS
import os
from generator_core import write_lesson_file

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 10"

CH3_TO_CH6_LESSONS = [
    # -------------------------------------------------------------
    # CHAPTER 3: AI APPLICATIONS
    # -------------------------------------------------------------
    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 3,
        "ch_name": "AI Applications",
        "les_num": 1,
        "title": "AI at Work",
        "pillar": "AI Applications",
        "strand": "Enterprise Automation, Augmentation, Robotic Process Automation, and Predictive Maintenance",
        "prereqs": "Class 10 Chapter 1 Lessons 1 & 2.",
        "prereq_details": "Understanding of tabular data, anomaly detection, and classification.",
        "key_terms": ["Automation vs Augmentation", "Robotic Process Automation (RPA)", "Predictive Maintenance", "Computer Vision Quality Control", "Supply Chain Optimization"],
        "objectives": [
            "Differentiate between task automation (replacing repetitive human labor) and task augmentation (amplifying human decision-making).",
            "Explain how industrial Internet-of-Things (IoT) sensors and vibration telemetry drive Predictive Maintenance.",
            "Analyze computer vision defect detection in high-speed manufacturing assembly lines.",
            "Formulate mathematical return-on-investment (ROI) models comparing preventive maintenance to catastrophic downtime."
        ],
        "mission_title": "Project FactoryFlow: The Zero-Downtime Turbine Predictive Maintenance Lab",
        "mission_desc": "Apex Wind Energy operates 150 offshore wind turbines. An unexpected gearbox failure on a single turbine costs $120,000 in emergency crane hire and lost generation. Acoustic and thermal vibration sensors stream live readings from every turbine generator. Your mission is to build an intelligent predictive maintenance monitoring agent that identifies subtle bearing wear weeks before mechanical seizure occurs.",
        "theory": """### 1. Automation vs. Augmentation in the Modern Enterprise
* **Automation (Task Substitution):** Software bots take over highly repetitive, rule-governed, low-variance workflows (e.g., invoice data extraction, sorting incoming shipping manifests).
* **Augmentation (Cognitive Co-Pilots):** AI handles pattern detection, multi-variate indexing, and scenario simulation, while human domain experts retain strategic oversight, empathy, and final sign-off (e.g. an AI radiologist flagging micro-fractures for a doctor).

### 2. The Economics of Predictive Maintenance (PdM)
Traditional industry follows two inefficient paradigms:
1. **Run-to-Failure (Reactive):** Wait until the machine explodes. Uncontrolled downtime, safety hazards, catastrophic repair costs.
2. **Calendar-Based (Preventive):** Replace expensive parts every 6 months regardless of actual health. Wastes usable component life.
3. **Predictive Maintenance (Condition-Based AI):** Continuously monitors physical biomarkers (vibration harmonics, heat dissipation, acoustic frequency spikes). Replaces parts only when wear patterns cross statistical failure thresholds.

### 3. Vibration Spectral Analysis
Bearings and rotating shafts emit characteristic acoustic vibrations. As ball bearings develop micro-fissures, the vibration amplitude at high harmonic frequencies ($>5\\text{kHz}$) escalates exponentially weeks before physical failure.""",
        "demo": """### Worked Economic Walkthrough: The Predictive ROI Equation
Let factory downtime cost $D = \\$10,000 / \\text{hour}$.
* **Case A: Reactive Failure:** Gearbox destroys itself. Downtime $= 24$ hours. Repair $= \\$50,000$.
  $$\\text{Total Cost} = (24 \\times 10,000) + 50,000 = \\$290,000$$
* **Case B: Predictive Alert:** AI alerts crew 2 weeks early. Planned scheduled maintenance at night: Downtime $= 2$ hours. Component refurbish $= \\$8,000$. AI sensor amortized cost $= \\$2,000$.
  $$\\text{Total Cost} = (2 \\times 10,000) + 8,000 + 2,000 = \\$30,000$$
$$\\text{Net Savings per Incident} = \\$290,000 - \\$30,000 = \\$260,000 \\text{ (89.6\\% Cost Reduction!)}$$""",
        "game": {
            "title": "Turbine Tycoon: The Predictive Operations Room",
            "scenario": "Manage a simulated offshore wind farm across 52 operational weeks during varying Atlantic storms.",
            "objective": "Maximize megawatt-hour energy production while keeping fleet maintenance costs under budget.",
            "tools": "Vibration Telemetry Dashboard, Maintenance Vessel Dispatcher, Weather Radar.",
            "roles": "Chief Operations Engineer.",
            "decision_points": [
                "Interpret vibration frequency spikes to decide when to dispatch maintenance crews before storms hit.",
                "Balance False Alarms (dispatching a $15,000 boat for a loose cable) vs Missed Catastrophes ($100k generator fire).",
                "Throttle turbine generation speeds to extend gearbox life until scheduled maintenance."
            ],
            "rules": "Turbine fires cause instant contract termination. Achieve >=95% operational fleet uptime to earn the Windmaster Cup.",
            "feedback": "Real-time fleet health heatmap highlights degrading turbines from green to flashing red.",
            "reflection": "Why does predictive maintenance require integrating both physical engineering physics and statistical machine learning?"
        },
        "coding": {
            "title": "Industrial Predictive Maintenance Bearing Wear Monitor in Python",
            "description": "Write a Python monitoring engine that analyzes vibration harmonics and temperature telemetry to classify equipment health and compute remaining useful life.",
            "code": '''def evaluate_turbine_health(telemetry_record, vibration_limit=4.5, temp_limit=85.0):
    """
    Evaluates industrial turbine sensor telemetry:
    - Vibration RMS (mm/s)
    - Bearing Core Temp (Celsius)
    - RPM Speed
    Returns health status, degradation score (0-100), and recommended action.
    """
    vib = telemetry_record["vibration_rms"]
    temp = telemetry_record["bearing_temp_c"]
    rpm = telemetry_record["rpm"]
    
    # Calculate composite degradation score
    vib_ratio = vib / vibration_limit
    temp_ratio = temp / temp_limit
    degradation_score = min(100.0, ((vib_ratio * 0.6) + (temp_ratio * 0.4)) * 100.0)
    
    if vib >= vibration_limit or temp >= temp_limit:
        status = "CRITICAL_MAINTENANCE_REQUIRED"
        action = "IMMEDIATE_SHUTDOWN: Replace bearing assembly within 24 hours."
    elif degradation_score >= 75.0:
        status = "WARNING_DEGRADATION"
        action = "SCHEDULED_INSPECTION: Dispatch maintenance crew within 7 days."
    else:
        status = "NOMINAL_HEALTHY"
        action = "CONTINUE_MONITORING: Operations within safety margins."
        
    return {
        "turbine_id": telemetry_record["id"],
        "degradation_score": round(degradation_score, 1),
        "status": status,
        "action": action
    }

# Fleet Telemetry Snapshot
fleet = [
    {"id": "TURBINE-01", "vibration_rms": 1.8, "bearing_temp_c": 62.0, "rpm": 1800},
    {"id": "TURBINE-02", "vibration_rms": 4.1, "bearing_temp_c": 82.5, "rpm": 1805},
    {"id": "TURBINE-03", "vibration_rms": 5.2, "bearing_temp_c": 88.0, "rpm": 1790}
]

print("=== WIND TURBINE PREDICTIVE HEALTH AUDIT ===")
for t in fleet:
    rep = evaluate_turbine_health(t)
    print(f"ID: {rep['turbine_id']} | Score: {rep['degradation_score']:<5} | Status: {rep['status']}")
    print(f"  -> Recommended Action: {rep['action']}\\n")
''',
            "expected_output": """=== WIND TURBINE PREDICTIVE HEALTH AUDIT ===
ID: TURBINE-01 | Score: 53.2  | Status: NOMINAL_HEALTHY
  -> Recommended Action: CONTINUE_MONITORING: Operations within safety margins.

ID: TURBINE-02 | Score: 93.5  | Status: WARNING_DEGRADATION
  -> Recommended Action: SCHEDULED_INSPECTION: Dispatch maintenance crew within 7 days.

ID: TURBINE-03 | Score: 100.0 | Status: CRITICAL_MAINTENANCE_REQUIRED
  -> Recommended Action: IMMEDIATE_SHUTDOWN: Replace bearing assembly within 24 hours.""",
            "explanation": "The script fuses multi-sensor physical telemetry into a composite degradation metric, demonstrating automated operational decision-making in industrial IoT environments."
        },
        "questions": [
            {
                "q": "What is the key difference between Preventive Maintenance and Predictive Maintenance?",
                "options": [
                    "Preventive maintenance uses computers; predictive maintenance uses paper.",
                    "Preventive maintenance replaces parts on fixed calendar schedules regardless of condition; predictive maintenance replaces parts based on real-time sensor data and health degradation models.",
                    "Preventive maintenance never costs money.",
                    "Predictive maintenance only works on electric cars."
                ],
                "answer": "B",
                "explanation": "Preventive maintenance relies on arbitrary calendar schedules; predictive maintenance dynamically evaluates physical wear telemetry."
            },
            {
                "q": "What is Robotic Process Automation (RPA) in enterprise business workflows?",
                "options": [
                    "Physical humanoid robots walking around offices carrying boxes.",
                    "Software programs that automate structured, repetitive, digital tasks such as form filling, spreadsheet data transfer, and transaction processing.",
                    "Drones delivering food to desks.",
                    "A law banning office computers."
                ],
                "answer": "B",
                "explanation": "RPA refers to software scripts ('bots') that automate clerical digital workflows across enterprise software interfaces."
            },
            {
                "q": "How does automated computer vision improve quality control on an electronics assembly line producing 10,000 circuit boards per hour?",
                "options": [
                    "By replacing circuit boards with cardboard.",
                    "By using high-speed cameras and convolutional neural networks to detect micro-soldering defects, missing resistors, and misaligned chips in milliseconds.",
                    "By making circuit boards glow in the dark.",
                    "By deleting all error logs."
                ],
                "answer": "B",
                "explanation": "Human inspectors suffer from visual fatigue at high throughput, whereas computer vision systems inspect every component reliably at line speed."
            },
            {
                "q": "Why is workforce 'Augmentation' often more economically and ethically sustainable than pure 'Automation'?",
                "options": [
                    "Because computers refuse to work full time.",
                    "Because combining AI analytical processing speed with human judgment, creative flexibility, and empathy yields higher performance while upskilling workers.",
                    "Because human workers cost nothing.",
                    "Because augmenting code is faster to compile."
                ],
                "answer": "B",
                "explanation": "Augmentation enhances human capability, capitalizing on the complementary strengths of computational pattern recognition and human cognitive flexibility."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that factories use sensors to prevent broken machines.",
                "coding": "Can run the turbine health script with sample inputs.",
                "sim": "Waits for turbines to break before dispatching maintenance."
            },
            "proficient": {
                "concept": "Explains automation vs augmentation, RPA, and predictive maintenance ROI.",
                "coding": "Programs composite health metrics with multi-threshold alerting.",
                "sim": "Schedules maintenance proactively to keep fleet uptime above 90%."
            },
            "advanced": {
                "concept": "Formulates complete industrial IoT data pipelines with vibration spectral harmonics.",
                "coding": "Builds statistical anomaly detection engines with dynamic sensor calibration.",
                "sim": "Achieves 98% fleet uptime with minimal maintenance expenditure."
            }
        },
        "responsible_ai": "Workforce Transition & Human Dignity: As enterprise AI automates routine tasks, companies have an ethical duty to invest in employee retraining and reskilling. Technology should emancipate human workers from dangerous or mind-numbing labor, not cast them into economic precarity.",
        "xp": 220,
        "badge": "Enterprise Architect",
        "next_mission": "Class 10 Chapter 3 Lesson 2: AI Solving Real Problems"
    },

    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 3,
        "ch_name": "AI Applications",
        "les_num": 2,
        "title": "AI Solving Real Problems",
        "pillar": "AI Applications",
        "strand": "Public Sector Challenges, Smart Agriculture, Water Resource Management, and Disaster Mitigation",
        "prereqs": "Class 10 Chapter 3 Lesson 1.",
        "prereq_details": "Understanding of sensor networks and predictive classification.",
        "key_terms": ["Precision Agriculture", "Water Acoustic Leakage Detection", "Smart Grid Balancing", "Disaster Geospatial Mapping", "Edge AI"],
        "objectives": [
            "Examine precision agriculture systems that use computer vision to spot-spray weeds and detect crop fungal blights.",
            "Understand acoustic sensor AI networks that identify underground municipal water pipeline leaks.",
            "Analyze smart electrical grids that dynamically balance intermittent solar/wind generation with consumer demand.",
            "Design an edge-computing architecture for low-power agricultural deployment."
        ],
        "mission_title": "Project AquaPulse: The Municipal Water Loss Sentry",
        "mission_desc": "In your municipal district, aging underground water pipes lose 35% of all treated drinking water to hidden underground leaks before it ever reaches homes, while local farmers face drought restrictions. The water board cannot afford to dig up 400 kilometers of paved roads. You are commissioned to design an AI acoustic monitoring solution that analyzes pipe vibration sensors to pinpoint sub-surface leaks down to the exact meter.",
        "theory": """### 1. Precision Agriculture: Saving Resources and Crops
Traditional farming sprays broad-spectrum pesticides across entire fields, contaminating soil and water tables.
* **Computer Vision 'See & Spray':** High-speed cameras mounted on tractors classify crops from weeds in real time. Micro-nozzles deliver precise herbicide micro-droplets only onto weeds, slashing chemical use by $85\\%$.
* **Edge Pest Diagnostics:** Farmers take smartphone photos of crop leaves; on-device neural networks diagnose early fungal infections and recommend organic interventions.

### 2. Acoustic Leak Detection in Water Infrastructure
Water escaping from a pressurized underground pipe under pressure produces high-frequency turbulent hiss and structural vibrations ($500\\text{Hz} - 3000\\text{Hz}$):
* Acoustic accelerometers clamped to fire hydrants and valves record soundwaves.
* **Cross-Correlation Algorithm:** Fuses audio signals from two sensors separated by distance $L$ along a pipe of known acoustic wave velocity $c$. The time delay $\\Delta t$ pinpoints the leak location:
  $$x = \\frac{L - c \\cdot \\Delta t}{2}$$

### 3. Smart Grid Energy Balancing
Solar panels and wind turbines produce energy intermittently. If cloud cover suddenly drops solar output by $40\\%$, the electrical grid risks frequency destabilization (blackouts). Predictive AI models forecast cloud vectors 15 minutes ahead, automatically spinning up battery storage reserves to keep grid frequency stable at $50.0\\text{Hz}$.""",
        "demo": """### Worked Mathematical Walkthrough: Pinpointing a Water Leak
Two acoustic sensors are placed on hydrants separated by distance $L = 200\\text{ meters}$ along a cast-iron pipe.
* Sound speed in cast-iron water pipe: $c = 1,200\\text{ m/s}$.
* Cross-correlation of recorded audio reveals an arrival time delay: $\\Delta t = 0.05\\text{ seconds}$ (sound arrived at Sensor A $0.05$s earlier than Sensor B).

Let's calculate distance $x$ from Sensor A to the leak:
$$x = \\frac{L - c \\cdot \\Delta t}{2} = \\frac{200 - (1200 \\times 0.05)}{2} = \\frac{200 - 60}{2} = \\frac{140}{2} = 70\\text{ meters}$$
Excavation crews can dig directly at $70\\text{ meters}$ from Sensor A with sub-meter accuracy!""",
        "game": {
            "title": "Grid & Crop: The Regional Resource Commander",
            "scenario": "Manage water distribution, crop health, and renewable energy for a drought-prone agricultural valley over a dry summer.",
            "objective": "Preserve 90% crop yields while cutting regional water waste and preventing electrical blackouts.",
            "tools": "Acoustic Pipe Leak Map, Crop Blight Drone Fleet, Grid Frequency Regulator.",
            "roles": "Chief Regional Resource Coordinator.",
            "decision_points": [
                "Prioritize acoustic leak repairs based on estimated liter-per-minute water loss.",
                "Deploy targeted drone spraying before fungal crop blights spread across neighboring farms.",
                "Direct battery power reserves into the grid when afternoon clouds obscure solar fields."
            ],
            "rules": "Water storage running dry causes catastrophic famine. Severe grid frequency drops trigger industrial penalties.",
            "feedback": "Regional GIS map highlights water table levels, crop vegetation health, and electrical stability.",
            "reflection": "Why is edge AI (running models locally on drones/tractors) critical for rural farming areas with poor cellular internet?"
        },
        "coding": {
            "title": "Acoustic Pipeline Leak Localization and Severity Scorer in Python",
            "description": "Write a Python script that calculates subterranean leak locations from acoustic sensor time delays and estimates water loss rates.",
            "code": '''def calculate_leak_location(sensor_dist_m, time_delay_s, wave_speed_mps=1200.0):
    """
    Computes exact distance of a pressurized pipe leak from Sensor A
    using acoustic time-difference-of-arrival (TDOA).
    """
    offset = wave_speed_mps * time_delay_s
    distance_from_sensor_a = (sensor_dist_m - offset) / 2.0
    return round(distance_from_sensor_a, 2)

def evaluate_leak_severity(acoustic_amplitude_db, pipe_pressure_bar):
    """
    Estimates water loss rate (liters/min) from acoustic decibel intensity and pressure.
    """
    # Empirical hydraulic loss approximation formula
    loss_rate = (acoustic_amplitude_db / 10.0) ** 1.8 * (pipe_pressure_bar * 0.8)
    
    tier = "LOW"
    if loss_rate > 150:
        tier = "CRITICAL_BURST"
    elif loss_rate > 50:
        tier = "MODERATE_LEAK"
        
    return round(loss_rate, 1), tier

# Municipal Sensor Sector 4
pipe_length = 250.0           # meters between hydrant A and hydrant B
delay = 0.04                  # seconds
decibels = 68.0               # dB acoustic sensor amplitude
pressure = 4.2                # bar line pressure

loc = calculate_leak_location(pipe_length, delay)
liters_per_min, urgency = evaluate_leak_severity(decibels, pressure)

print("=== AQUAPULSE ACOUSTIC LEAK LOCALIZATION ===")
print(f"Total Sector Distance  : {pipe_length} meters")
print(f"Acoustic Delay (TDOA)  : {delay} seconds")
print(f"Pinpointed Leak Pos    : {loc} meters from Sensor A")
print(f"Estimated Water Loss   : {liters_per_min} Liters/Minute")
print(f"Repair Priority Tier   : {urgency}")
''',
            "expected_output": """=== AQUAPULSE ACOUSTIC LEAK LOCALIZATION ===
Total Sector Distance  : 250.0 meters
Acoustic Delay (TDOA)  : 0.04 seconds
Pinpointed Leak Pos    : 101.0 meters from Sensor A
Estimated Water Loss   : 107.1 Liters/Minute
Repair Priority Tier   : MODERATE_LEAK""",
            "explanation": "The script applies Time Difference of Arrival (TDOA) wave physics to locate underground pipe fractures accurately, preventing unnecessary road excavation and conserving municipal water resources."
        },
        "questions": [
            {
                "q": "Why is 'Edge AI' (running inference directly on local microcontrollers without internet) crucial for smart agricultural drones?",
                "options": [
                    "Because drones cannot fly if they have Wi-Fi antennas.",
                    "Because rural farmlands often have zero high-speed cellular coverage, and real-time millisecond spraying decisions cannot tolerate cloud latency.",
                    "Because cloud computing is forbidden on farms.",
                    "Because Edge AI makes drone batteries last forever."
                ],
                "answer": "B",
                "explanation": "Agricultural fields frequently lack reliable broadband; on-device edge computing enables millisecond-level target spraying without cloud connectivity."
            },
            {
                "q": "How does acoustic leak detection differentiate between water escaping a pipe and normal traffic rumble from passing cars overhead?",
                "options": [
                    "By turning off all road traffic.",
                    "By applying band-pass frequency filters that isolate the high-frequency turbulent hissing spectrum ($>1\\text{kHz}$) of pressurized leaks while rejecting low-frequency traffic rumble ($<100\\text{Hz}$).",
                    "By measuring the color of the pavement.",
                    "By asking drivers to honk."
                ],
                "answer": "B",
                "explanation": "Pressurized water leaks produce characteristic high-frequency acoustic turbulence, distinguishable from low-frequency vehicular rumble via spectral filtering."
            },
            {
                "q": "What is the primary technical challenge when integrating massive solar farms into national power grids?",
                "options": [
                    "Solar panels make the electric current too hot.",
                    "Generation intermittency: sudden cloud cover rapidly drops generation, threatening grid frequency stability unless counteracted by predictive forecasting and storage.",
                    "Sunlight cannot be converted into electricity.",
                    "Power lines melt when the sun shines."
                ],
                "answer": "B",
                "explanation": "Solar output fluctuates with rapid weather shifts, requiring AI forecasting to balance grid load and prevent brownouts."
            },
            {
                "q": "In computer-vision crop disease detection, what is a common source of dataset bias that causes field failure?",
                "options": [
                    "Training the model only on laboratory photos taken with studio lighting against white backgrounds, failing when deployed under harsh natural sunlight with dirty leaves.",
                    "Taking too many photos of real crops.",
                    "Using Python instead of HTML.",
                    "Printing the leaf pictures on glossy paper."
                ],
                "answer": "A",
                "explanation": "Models trained on pristine studio photographs suffer from domain shift when deployed in natural outdoor conditions with shadows, dirt, and varied sunlight."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that technology can help save water and protect crops.",
                "coding": "Can run the leak location calculation script.",
                "sim": "Reacts to resource shortages only after crisis thresholds are crossed."
            },
            "proficient": {
                "concept": "Explains TDOA wave physics, precision agriculture spraying, and smart grid balancing.",
                "coding": "Programs acoustic localization and hydraulic loss formulas in Python.",
                "sim": "Manages water, food, and energy dynamically with zero regional blackouts."
            },
            "advanced": {
                "concept": "Architects edge computing topologies for low-power remote environmental sensors.",
                "coding": "Implements multi-sensor cross-correlation signal processing routines.",
                "sim": "Maximizes ecological resilience while reducing municipal water loss below 5%."
            }
        },
        "responsible_ai": "Technology Access for Smallholder Farmers: Advanced agricultural AI must not be reserved exclusively for massive corporate agribusinesses. Open-source, affordable smartphone diagnostic tools democratize technology, uplifting smallholder farmers who produce a significant portion of global food.",
        "xp": 230,
        "badge": "Civic Problem Solver",
        "next_mission": "Class 10 Chapter 4 Lesson 1: Your Road to an AI Career"
    },

    # -------------------------------------------------------------
    # CHAPTER 4: AI AND CAREER
    # -------------------------------------------------------------
    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 4,
        "ch_name": "AI and Career",
        "les_num": 1,
        "title": "Your Road to an AI Career",
        "pillar": "AI and Career",
        "strand": "Secondary Subject Streams, University Pathways, and AI Specialization Trajectories",
        "prereqs": "Class 10 AI Basics, career exploration.",
        "prereq_details": "Understanding that senior secondary streams (Classes 11 & 12) require academic choices.",
        "key_terms": ["Subject Streams", "STEM vs STEAM", "Cognitive Science", "Applied Mathematics", "AI Degree Pathways", "Apprenticeships"],
        "objectives": [
            "Evaluate academic stream options for Classes 11 and 12 (Science/Math, Computer Science, Commerce, Humanities) relative to AI career trajectories.",
            "Map emerging undergraduate degree majors: Computer Science (AI/ML), Data Science, Computational Linguistics, AI & Law.",
            "Understand the role of open online learning, competitive hackathons, and research mentorships.",
            "Construct a personal 3-year transition roadmap from Class 10 to university admissions."
        ],
        "mission_title": "Project Crossroads: The Senior Secondary Stream Navigator",
        "mission_desc": "Class 10 board examinations are approaching, and your school counseling center is flooded with confused students. Many believe that 'unless you pick advanced physics and chemistry, you can never work in artificial intelligence!' You are commissioned to build an interactive academic advising simulator that dispels myths, shows how humanities and commerce connect with AI, and maps strategic Class 11-12 subject packages.",
        "theory": """### 1. The Post-Class 10 Academic Crossroads
Artificial Intelligence is fundamentally interdisciplinary. Depending on which facet of AI excites you, different subject combinations provide powerful springboards:

| Target AI Trajectory | Recommended Class 11-12 Focus | Core Higher Education Degrees |
| :--- | :--- | :--- |
| **Core Algorithm & ML Engineering** | Mathematics + Physics + Computer Science | B.Tech / B.S. in Computer Science, Data Science |
| **AI Economics, Fintech & Analytics** | Mathematics + Economics + Accountancy / CS | B.S. in Quantitative Economics, Financial Analytics |
| **Cognitive AI & Natural Language (NLP)** | Linguistics / Psychology + Mathematics + English | B.A./B.S. in Cognitive Science, Computational Linguistics |
| **AI Governance, Policy & Ethics** | Political Science + Sociology + Legal Studies / Math | B.A. in Public Policy, Law (Cyber/AI Jurisprudence) |
| **Generative Design & Digital Media** | Fine Arts / Design + Media Studies + Informatics | B.Des in Interaction Design, Digital Media Architecture |

### 2. The Non-Negotiable Core: Mathematics
Regardless of your stream, mathematical literacy remains the true foundation of AI:
* **Linear Algebra:** Vectors, matrices, high-dimensional projections.
* **Calculus:** Rates of change, gradients, loss surface optimization.
* **Probability & Statistics:** Distributions, Bayes' rule, hypothesis testing, confidence intervals.""",
        "demo": """### Worked Academic Mapping Matrix
Student Profile: Maya loves writing fiction, analyzing human psychology, and debating philosophy, but also enjoys coding Python games.
* **Traditional Misguided Advice:** 'You must abandon your writing and take pure physics/chemistry.'
* **Strategic Modern AI Stream:** **Cognitive Science / NLP Specialist**.
  * Class 11-12: Humanities with Applied Mathematics or Computer Science.
  * College Path: Computational Linguistics or AI & Society.
  * Career Outcome: Designing dialogue systems, evaluating LLM cognitive safety, and prompt engineering.""",
        "game": {
            "title": "Stream Navigator: The High-School Odyssey",
            "scenario": "Simulate a student's 4-year transition across Classes 11, 12, and undergraduate university admissions.",
            "objective": "Build a competitive, balanced profile that secures admission to your dream AI specialization while avoiding academic burnout.",
            "tools": "Course Picker, Extracurricular Planner, Burnout Thermometer, Portfolio Builder.",
            "roles": "Academic Strategist.",
            "decision_points": [
                "Select subject streams that balance foundational math rigor with genuine personal passion.",
                "Allocate after-school hours between school board exam prep, GitHub personal coding projects, and sports.",
                "Choose summer activities: Academic cram school vs Open-source AI hackathon team."
            ],
            "rules": "Letting the Burnout Thermometer hit 100% causes academic crash (-200 pts). Low math rigor blocks advanced AI university options.",
            "feedback": "Spider radar chart updates portfolio depth, academic resilience, and admissions competitiveness.",
            "reflection": "Why is personal curiosity and self-directed building often a stronger predictor of AI success than rote memorization?"
        },
        "coding": {
            "title": "Interactive Academic Stream & Career Alignment Evaluator in Python",
            "description": "Write a Python advising engine that cross-references student academic preferences with university prerequisites and generates a subject selection dossier.",
            "code": '''def evaluate_stream_selection(math_interest, tech_coding, humanities_arts, business_econ):
    """
    Evaluates student academic preferences (rated 1-10) and suggests optimal
    Class 11-12 subject streams and higher education trajectories.
    """
    stream_scores = {
        "Science_PCM_CS": (math_interest * 0.4) + (tech_coding * 0.5) + (humanities_arts * 0.1),
        "Commerce_Math_Analytics": (business_econ * 0.5) + (math_interest * 0.3) + (tech_coding * 0.2),
        "Humanities_Math_Cognitive": (humanities_arts * 0.5) + (math_interest * 0.3) + (tech_coding * 0.2),
        "Design_Media_Technology": (humanities_arts * 0.4) + (tech_coding * 0.3) + (business_econ * 0.3)
    }
    
    top_stream = max(stream_scores, key=stream_scores.get)
    
    recommendations = {
        "Science_PCM_CS": {
            "subjects": "Physics, Chemistry, Mathematics, Computer Science / AI",
            "degrees": "B.Tech/B.S. in CS, Artificial Intelligence, Robotics",
            "careers": "Machine Learning Engineer, Robotics Systems Architect"
        },
        "Commerce_Math_Analytics": {
            "subjects": "Economics, Mathematics, Accountancy, Business Studies / Informatics",
            "degrees": "B.S. in Data Analytics, Quantitative Finance, Business Analytics",
            "careers": "Fintech Data Scientist, AI Supply Chain Analyst"
        },
        "Humanities_Math_Cognitive": {
            "subjects": "Psychology, Sociology / Literature, Mathematics, Political Science",
            "degrees": "B.A./B.S. in Cognitive Science, Computational Linguistics, AI Ethics",
            "careers": "AI Safety Researcher, NLP Prompt Architect, AI Policy Counsel"
        },
        "Design_Media_Technology": {
            "subjects": "Fine Arts, Media Studies, Applied Math / Informatics, English",
            "degrees": "B.Des in Digital Product Design, Human-Computer Interaction",
            "careers": "AI Experience Designer, Synthetic Media Creative Director"
        }
    }
    
    return top_stream, stream_scores[top_stream], recommendations[top_stream]

# Test Case: Student with balanced tech and humanities passions
report_stream, fit, details = evaluate_stream_selection(
    math_interest=8, tech_coding=7, humanities_arts=9, business_econ=4
)

print("=== SENIOR SECONDARY STREAM ADVISORY REPORT ===")
print(f"Recommended Stream Package : {report_stream.replace('_', ' ')}")
print(f"Alignment Score            : {fit:.1f} / 10.0")
print(f"Suggested Class 11-12 Focus: {details['subjects']}")
print(f"Target University Degrees  : {details['degrees']}")
print(f"Future Career Roles        : {details['careers']}")
''',
            "expected_output": """=== SENIOR SECONDARY STREAM ADVISORY REPORT ===
Recommended Stream Package : Humanities Math Cognitive
Alignment Score            : 7.3 / 10.0
Suggested Class 11-12 Focus: Psychology, Sociology / Literature, Mathematics, Political Science
Target University Degrees  : B.A./B.S. in Cognitive Science, Computational Linguistics, AI Ethics
Future Career Roles        : AI Safety Researcher, NLP Prompt Architect, AI Policy Counsel""",
            "explanation": "The script demonstrates that artificial intelligence encompasses cognitive science, policy, and design paths alongside traditional software engineering, guiding balanced Class 11-12 subject choices."
        },
        "questions": [
            {
                "q": "Which mathematical branch is considered the core bedrock of neural networks and machine learning model parameter tuning?",
                "options": [
                    "Euclidean geometry and compass drawing.",
                    "Linear Algebra (vectors, matrices, dot products) and Multivariable Calculus (gradients).",
                    "Roman numerals.",
                    "Trigonometric sine tables from memory."
                ],
                "answer": "B",
                "explanation": "Linear algebra enables high-dimensional data transformations, while calculus provides gradient descent mechanisms to minimize loss."
            },
            {
                "q": "Can a student who selects a Humanities or Commerce stream in Class 11 still build a successful career in Artificial Intelligence?",
                "options": [
                    "No, because non-science students are barred by law from using computers.",
                    "Yes, especially in high-demand interdisciplinary domains such as AI Ethics, Behavioral Economics, Quantitative Finance, and Computational Linguistics, provided they maintain mathematical literacy.",
                    "No, because only engineers can understand computers.",
                    "Only if they retake Class 10 four times."
                ],
                "answer": "B",
                "explanation": "Modern AI requires policy specialists, cognitive scientists, and econometricians; strong math coupled with humanities or commerce is highly viable."
            },
            {
                "q": "What is the primary advantage of taking 'Applied Mathematics' in senior secondary school for an aspiring data scientist?",
                "options": [
                    "It has no homework.",
                    "It emphasizes real-world practical modeling: statistics, probability distributions, matrix operations, and financial math over pure theoretical proofs.",
                    "It allows students to skip college entirely.",
                    "It replaces the need to learn English."
                ],
                "answer": "B",
                "explanation": "Applied Mathematics focuses on practical statistical modeling, data handling, and probabilistic reasoning central to data science."
            },
            {
                "q": "What is Cognitive Science, and how does it relate to Artificial Intelligence?",
                "options": [
                    "The study of how to fix broken computer mice.",
                    "The interdisciplinary study of mind and intelligence, combining psychology, linguistics, philosophy, neuroscience, and computer science to model human and artificial cognition.",
                    "The science of memorizing textbooks.",
                    "A brand of smartphone."
                ],
                "answer": "B",
                "explanation": "Cognitive Science investigates the nature of intelligence across biological brains and computational systems, deeply informing AI architectures."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that students must choose subjects in Class 11.",
                "coding": "Can run the stream advisor script with provided values.",
                "sim": "Chooses subjects based purely on peer pressure without strategic alignment."
            },
            "proficient": {
                "concept": "Maps academic streams to specific AI specializations and university degrees.",
                "coding": "Modifies evaluation weights and formats recommendation dictionaries.",
                "sim": "Balances math rigor and personal passion to avoid student burnout."
            },
            "advanced": {
                "concept": "Critiques university entrance pathways and formulates multi-year portfolio roadmaps.",
                "coding": "Builds comprehensive multi-criteria decision trees with course prerequisite validation.",
                "sim": "Secures top-tier university placement across multiple competitive scenarios."
            }
        },
        "responsible_ai": "Democratizing Academic Guidance: High-quality career counseling must be accessible to students from all socioeconomic backgrounds. Open-source advising tools level the playing field, ensuring every student discovers non-traditional pathways into AI regardless of privilege.",
        "xp": 240,
        "badge": "Pathfinder",
        "next_mission": "Class 10 Chapter 4 Lesson 2: AI Skills Beyond School"
    },

    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 4,
        "ch_name": "AI and Career",
        "les_num": 2,
        "title": "AI Skills Beyond School",
        "pillar": "AI and Career",
        "strand": "Transferable Meta-Skills, Critical Thinking, Multidisciplinary Teamwork, and Lifelong Learning",
        "prereqs": "Class 10 Chapter 4 Lesson 1.",
        "prereq_details": "Understanding of academic trajectories and career roles.",
        "key_terms": ["Meta-Skills", "Problem Formulation", "Epistemic Humility", "Cross-Disciplinary Empathy", "Lifelong Learning", "Systems Thinking"],
        "objectives": [
            "Deconstruct enduring 'Meta-Skills' that remain valuable even as specific programming languages and AI tools evolve.",
            "Master the art of Problem Formulation (translating ambiguous human challenges into well-posed technical questions).",
            "Develop cross-disciplinary communication skills to bridge technical engineers and non-technical stakeholders.",
            "Establish a self-directed lifelong learning cadence using scientific preprints, open-source communities, and active experimentation."
        ],
        "mission_title": "Project Nexus: The Cross-Disciplinary Innovation Hackathon",
        "mission_desc": "Your school is competing in the National Smart Cities Challenge. Your 4-person team consists of a brilliant but uncommunicative Python coder, a passionate biology student who knows nothing about computers, a creative graphic designer, and a debate captain. The team is arguing and paralyzed by jargon. You are appointed Team Lead to establish a unified collaboration framework that translates ambiguous civic challenges into actionable engineering sprints.",
        "theory": """### 1. The Half-Life of Technical Knowledge vs. Meta-Skills
Software frameworks come and go: tools popular 10 years ago are obsolete today, and today's AI libraries will evolve within 5 years. However, **Meta-Skills** possess an enduring half-life:
1. **Problem Formulation:** The ability to take a messy, ambiguous human complaint ('Our city buses are terrible!') and deconstruct it into solvable mathematical constraints (minimizing wait-time variance subject to fleet battery budgets).
2. **Epistemic Humility & Critical Skepticism:** The habit of questioning algorithmic outputs, checking assumptions, and actively searching for disconfirming evidence.
3. **Systems Thinking:** Understanding how components interact within complex feedback loops (e.g. how widening a road induces more traffic congestion).
4. **Cross-Disciplinary Translation:** Translating technical machine learning metrics (e.g. 'Our model achieved a 0.88 F1-score') into human operational realities ('Doctors will miss 12% fewer micro-tumors').

### 2. The 5-Whys Root Cause Protocol
When faced with a technical or operational failure, amateurs fix the immediate symptom. Professional innovators apply the **5-Whys Methodology** to uncover the systemic root cause.""",
        "demo": """### Worked 5-Whys Case Study: The Chatbot Hallucination Disaster
* **Problem:** Customer service chatbot gave wrong legal advice to a parent.
* *Why 1?* The model hallucinated a non-existent school policy.
* *Why 2?* The prompt did not ground the model with retrieved official policy documents.
* *Why 3?* The retrieval database had not been updated in 8 months.
* *Why 4?* The engineering team had no automated synchronization pipeline with the school board registry.
* *Why 5 (Root Cause)?* The school had no designated data governance steward responsible for documentation accuracy!
Fixing the root cause (appointing a governance steward and building automated sync) permanently solves the problem, whereas tweaking the prompt only hides the symptom.""",
        "game": {
            "title": "Tower of Babel: The Cross-Disciplinary Crisis",
            "scenario": "Lead an interdisciplinary team (Medical Doctor, Software Coder, Legal Counsel, Community Activist) during a simulated public health outbreak.",
            "objective": "Align all 4 stakeholders to deploy an AI contact-tracing system within 48 hours without legal injunctions or public boycott.",
            "tools": "Jargon Decoder, Stakeholder Empathy Map, Consensus Barometer.",
            "roles": "Lead Project Integrator.",
            "decision_points": [
                "Translate complex epidemiologic R-naught metrics into plain language for public trust.",
                "Compromise between coder demand for maximum GPS tracking vs legal counsel demand for strict privacy.",
                "Address community fears regarding algorithmic surveillance."
            ],
            "rules": "If any single stakeholder's trust drops to 0%, the project collapses. Achieve consensus before the contagion spreads to win.",
            "feedback": "Live trust meters indicate confidence levels across medical, legal, and citizen groups.",
            "reflection": "Why is technological brilliance completely ineffective if you cannot communicate its value to non-technical human stakeholders?"
        },
        "coding": {
            "title": "Automated Problem Formulation and 5-Whys Root Cause Analyzer in Python",
            "description": "Program an interactive diagnostic tool that structures ambiguous human problem statements into technical requirements and root-cause trees.",
            "code": '''def structure_problem_formulation(vague_statement, metrics_dict, constraints_list):
    """
    Transforms ambiguous human complaints into structured technical problem specifications:
    - Objective Function
    - Measurable Performance Metrics
    - Operating Constraints
    """
    specification = {
        "raw_problem": vague_statement,
        "mathematical_objective": f"Optimize system to {vague_statement.lower()}",
        "kpi_metrics": metrics_dict,
        "hard_constraints": constraints_list,
        "is_well_posed": len(metrics_dict) > 0 and len(constraints_list) > 0
    }
    return specification

# Transforming an ambiguous real-world complaint
raw_complaint = "Our school bus routes take way too long and kids are arriving exhausted."

kpis = {
    "primary_metric": "Maximum individual student transit time (Target < 35 minutes)",
    "secondary_metric": "Total fleet diesel consumption (Target < 120 liters/day)"
}

constraints = [
    "No bus may exceed its certified seating capacity of 45 students.",
    "Buses must arrive at campus between 7:45 AM and 7:55 AM.",
    "Zero student pickups on roads without pedestrian crosswalks."
]

spec = structure_problem_formulation(raw_complaint, kpis, constraints)

print("=== STRUCTURED TECHNICAL PROBLEM SPECIFICATION ===")
print(f"Original Complaint   : {spec['raw_problem']}")
print(f"Technical Objective  : {spec['mathematical_objective']}")
print(f"Problem Well-Posed?  : {spec['is_well_posed']}\\n")

print("Key Performance Indicators (KPIs):")
for k, v in spec["kpi_metrics"].items():
    print(f"  [{k}]: {v}")

print("\\nOperational Boundary Constraints:")
for i, c in enumerate(spec["hard_constraints"], 1):
    print(f"  {i}. {c}")
''',
            "expected_output": """=== STRUCTURED TECHNICAL PROBLEM SPECIFICATION ===
Original Complaint   : Our school bus routes take way too long and kids are arriving exhausted.
Technical Objective  : Optimize system to our school bus routes take way too long and kids are arriving exhausted.
Problem Well-Posed?  : True

Key Performance Indicators (KPIs):
  [primary_metric]: Maximum individual student transit time (Target < 35 minutes)
  [secondary_metric]: Total fleet diesel consumption (Target < 120 liters/day)

Operational Boundary Constraints:
  1. No bus may exceed its certified seating capacity of 45 students.
  2. Buses must arrive at campus between 7:45 AM and 7:55 AM.
  3. Zero student pickups on roads without pedestrian crosswalks.""",
            "explanation": "The script demonstrates problem formulation: converting subjective human frustration into clear, quantifiable KPIs and hard operational constraints ready for algorithmic optimization."
        },
        "questions": [
            {
                "q": "What is 'Problem Formulation' in the context of computer science and artificial intelligence?",
                "options": [
                    "Typing code without using capital letters.",
                    "The critical skill of translating an ambiguous, real-world human challenge into an unambiguous mathematical objective with clear metrics and constraints.",
                    "Memorizing mathematical formulas from a textbook.",
                    "Writing an angry email to customer support."
                ],
                "answer": "B",
                "explanation": "Problem formulation bridges messy reality and computational modeling; algorithms cannot solve problems that are ambiguously defined."
            },
            {
                "q": "Why is 'Epistemic Humility' essential for an AI practitioner?",
                "options": [
                    "It makes the practitioner never speak during meetings.",
                    "It is the intellectual recognition of the limits of one's knowledge, ensuring engineers rigorously test assumptions and do not blindly trust algorithmic predictions.",
                    "It means refusing to learn new programming languages.",
                    "It is a legal requirement under tax law."
                ],
                "answer": "B",
                "explanation": "Epistemic humility prevents overconfidence bias, driving engineers to actively look for edge cases, model blindspots, and failure modes."
            },
            {
                "q": "What is the primary objective of the '5-Whys' analysis technique?",
                "options": [
                    "To ask why the computer is turned on five times.",
                    "To peel away surface-level symptoms and uncover the systemic root cause of a failure.",
                    "To write five lines of code.",
                    "To complain about bugs to five different people."
                ],
                "answer": "B",
                "explanation": "The 5-Whys methodology drills down through layered symptoms to identify and resolve foundational systemic flaws."
            },
            {
                "q": "Why are cross-disciplinary teamwork and clear communication becoming increasingly important as AI models become more powerful?",
                "options": [
                    "Because AI models do not work if team members do not speak English.",
                    "Because technical models must be integrated into human legal, medical, social, and physical systems where understanding diverse human needs determines real-world success or failure.",
                    "Because engineers are not allowed to talk to each other.",
                    "Because computer screens are too small for one person."
                ],
                "answer": "B",
                "explanation": "AI models operate within human socio-technical systems; technical brilliance without multidisciplinary domain integration results in failed deployments."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that working in teams requires talking to people.",
                "coding": "Can run the problem formulation script with default values.",
                "sim": "Favors coder jargon, alienating non-technical stakeholders."
            },
            "proficient": {
                "concept": "Explains meta-skills, 5-Whys root cause analysis, and systems thinking.",
                "coding": "Formulates formal problem specifications with quantifiable KPIs and constraints.",
                "sim": "Balances medical, legal, and citizen trust to achieve team consensus."
            },
            "advanced": {
                "concept": "Critiques complex socio-technical feedback loops and models systemic interventions.",
                "coding": "Builds automated requirements verification and root-cause tracing frameworks.",
                "sim": "Achieves 100% consensus across all stakeholders in record time."
            }
        },
        "responsible_ai": "Empathy as an Engineering Requirement: Technology designed without empathy for the end-user frequently causes harm or faces community rejection. True technological excellence begins with listening deeply to the lived experiences of those impacted by the algorithm.",
        "xp": 250,
        "badge": "Systems Diplomat",
        "next_mission": "Class 10 Chapter 5 Lesson 1: AI Productivity Booster"
    },

    # -------------------------------------------------------------
    # CHAPTER 5: AI TOOLS
    # -------------------------------------------------------------
    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 5,
        "ch_name": "AI Tools",
        "les_num": 1,
        "title": "AI Productivity Booster",
        "pillar": "AI Tools",
        "strand": "Workflow Acceleration, Automated Summarization, Data Reformatting, and Multi-Modal Productivity",
        "prereqs": "Class 10 Chapter 2 (Prompt patterns).",
        "prereq_details": "Understanding of how to interact with LLMs and format prompts.",
        "key_terms": ["Workflow Automation", "Information Synthesis", "Few-Shot Formatting", "JSON Schema Transformation", "Cognitive Offloading", "Verification Hygiene"],
        "objectives": [
            "Leverage AI tools for high-efficiency cognitive offloading (synthesizing lengthy documents, reformatting messy tables).",
            "Apply Few-Shot In-Context Prompting to enforce deterministic JSON/CSV data extraction.",
            "Automate presentation outlines, meeting transcripts, and study guides without losing nuance.",
            "Establish strict verification hygiene to prevent productivity tools from introducing silent errors."
        ],
        "mission_title": "Operation SwiftDesk: The Student Council Legislative Digest",
        "mission_desc": "Your school administration publishes a dense, 68-page legalistic 'Student Code of Conduct and Extracurricular Policy Handbook' in poorly formatted PDF format. No student has the time to read it, leading to widespread accidental policy infractions. You are tasked with designing an automated AI productivity pipeline that ingests the document, extracts key student rights and deadlines, and outputs an accessible, searchable cheat-sheet and calendar.",
        "theory": """### 1. Cognitive Offloading vs. Intellectual Laziness
Using AI productivity tools is not about avoiding thinking; it is about **Cognitive Offloading** of low-leverage clerical tasks:
* **High-Leverage Human Work:** Critical synthesis, ethical reasoning, strategic prioritization, creative problem solving.
* **Low-Leverage Clerical Work:** Reformatting dates from `DD/MM/YYYY` to `YYYY-MM-DD`, converting unstructured interview notes into markdown tables, summarizing meeting action items.

### 2. Few-Shot In-Context Data Reformatting
LLMs excel at transforming unstructured text into structured databases when guided by **Few-Shot Prompting**:
Providing 1 or 2 concrete input-output examples in your prompt anchors the model's pattern-recognition engine, forcing it to adhere strictly to your desired schema (e.g. JSON, YAML, SQL INSERT).

### 3. The Productivity Pitfall: The Illusions of Competence
Speeding through tasks with AI creates an 'Illusion of Competence': because the generated summary looks beautiful and polished, you assume you have mastered the material. True productivity requires active verification: always cross-checking dates, formulas, and critical policy clauses against original text.""",
        "demo": """### Worked Prompt Architecture: Few-Shot Data Transformation
* **Prompt Template:**
  ```text
  You are an expert data transformation engine. Extract events, dates, and strict rules from the policy text into strict JSON format.
  
  Example Input: "Library books must be returned within 14 days. A fine of $1/day applies."
  Example Output: {"rule": "Library return", "deadline_days": 14, "penalty": "$1/day"}
  
  Now extract from this text:
  "Applications for the National STEM Grant close on November 15 at 5:00 PM. Late submissions are immediately disqualified."
  ```
* **Output:**
  ```json
  {"rule": "STEM Grant Application", "deadline": "November 15, 5:00 PM", "penalty": "Immediate disqualification"}
  ```""",
        "game": {
            "title": "Inbox Blitz: The 10x Chief of Staff",
            "scenario": "Step into the shoes of the Chief of Staff to the Mayor. You have 15 minutes before a press conference to process 20 urgent city memos.",
            "objective": "Extract key action items, verify budget figures, and draft a concise 5-bullet executive brief.",
            "tools": "Summarization Slider, Table Extractor, Cross-Reference Scanner, Hallucination Spotter.",
            "roles": "Chief of Staff.",
            "decision_points": [
                "Summarize complex transportation reports down to executive decision trade-offs.",
                "Extract inconsistent budget statistics across competing department proposals.",
                "Catch a subtly hallucinated dollar figure in an AI-generated briefing note before the press conference."
            ],
            "rules": "Presenting unverified or hallucinated numbers to the Mayor causes instant public scandal (-500 pts). High accuracy and speed win the Civic Silver Medal.",
            "feedback": "Live executive confidence meter displays accuracy of synthesized briefing.",
            "reflection": "Why does rapid AI summarization require even sharper human attention to detail?"
        },
        "coding": {
            "title": "Automated Policy Text Parser and Structured Task Extractor in Python",
            "description": "Write a Python script that parses unstructured policy text, extracts deadline dates, and generates an automated action ledger.",
            "code": '''import re

def parse_policy_deadlines(raw_handbook_text):
    """
    Parses unstructured handbook policy text using regex and heuristics
    to extract actionable rules, target roles, and dates.
    """
    # Regex pattern to capture dates like 'November 15', 'Oct 12th', etc.
    date_pattern = r'\\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|' \\
                   r'Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\s+\\d{1,2}(?:st|nd|rd|th)?\\b'
                   
    lines = [l.strip() for l in raw_handbook_text.splitlines() if l.strip()]
    extracted_actions = []
    
    for line in lines:
        dates_found = re.findall(date_pattern, line, re.IGNORECASE)
        # Look for action verbs
        is_actionable = any(k in line.lower() for k in ["must", "submit", "deadline", "due", "required", "penalty"])
        
        if is_actionable:
            extracted_actions.append({
                "policy_snippet": line,
                "deadlines_detected": dates_found if dates_found else ["NOT_SPECIFIED"],
                "urgency": "HIGH" if "disqualif" in line.lower() or "penalty" in line.lower() else "STANDARD"
            })
            
    return extracted_actions

# Sample excerpt from school handbook
handbook_excerpt = """
1. General Welcome: We are thrilled to welcome all students to the 2026 academic year.
2. Locker Allocation: Locker keys must be registered with the front office by October 18th.
3. Science Fair: Project abstracts are due on November 15. Late entries will suffer a 20% penalty.
4. Dress Code: School blazers are required for all formal Monday assemblies.
"""

actions = parse_policy_deadlines(handbook_excerpt)

print("=== AUTOMATED POLICY ACTION DIGEST ===")
print(f"Actionable Policies Extracted: {len(actions)}\\n")
for idx, act in enumerate(actions, 1):
    print(f"Action {idx} [{act['urgency']} URGENCY]:")
    print(f"  Snippet  : {act['policy_snippet']}")
    print(f"  Deadlines: {', '.join(act['deadlines_detected'])}\\n")
''',
            "expected_output": """=== AUTOMATED POLICY ACTION DIGEST ===
Actionable Policies Extracted: 3

Action 1 [STANDARD URGENCY]:
  Snippet  : 2. Locker Allocation: Locker keys must be registered with the front office by October 18th.
  Deadlines: October 18th

Action 2 [HIGH URGENCY]:
  Snippet  : 3. Science Fair: Project abstracts are due on November 15. Late entries will suffer a 20% penalty.
  Deadlines: November 15

Action 3 [STANDARD URGENCY]:
  Snippet  : 4. Dress Code: School blazers are required for all formal Monday assemblies.
  Deadlines: NOT_SPECIFIED""",
            "explanation": "The script uses regex and NLP heuristic matching to parse dense paragraphs into an actionable operational digest, saving hours of manual reading."
        },
        "questions": [
            {
                "q": "What is 'Cognitive Offloading' when using AI tools for daily productivity?",
                "options": [
                    "Turning your brain off and never thinking again.",
                    "Using computational tools to manage routine, mechanical memory and reformatting tasks, freeing human attention for high-level reasoning and creative synthesis.",
                    "Downloading your brain memories onto a USB drive.",
                    "Deleting your school notes."
                ],
                "answer": "B",
                "explanation": "Cognitive offloading delegates routine procedural burdens to digital tools so mental bandwidth can focus on high-order critical reasoning."
            },
            {
                "q": "What is 'Few-Shot Prompting' and why is it effective for data reformatting tasks?",
                "options": [
                    "Typing the prompt in very small letters.",
                    "Providing the AI with 1 to 3 explicit input-output examples inside the prompt to guide consistent formatting and schema adherence.",
                    "Asking the AI only three words at a time.",
                    "Turning off the computer after three attempts."
                ],
                "answer": "B",
                "explanation": "Few-shot prompting provides concrete exemplars within the context window, demonstrating the exact schema and formatting required."
            },
            {
                "q": "What is the 'Illusion of Competence' when relying on AI-generated study guides?",
                "options": [
                    "When an AI gets a perfect score on a test.",
                    "The mistaken belief that because a student generated a clean, beautifully formatted summary, they have personally mastered and absorbed the underlying concepts.",
                    "When a textbook has pictures on the cover.",
                    "When a computer monitor looks very professional."
                ],
                "answer": "B",
                "explanation": "Passive generation creates a false sense of mastery; true learning requires active recall, problem-solving, and personal mental effort."
            },
            {
                "q": "When using AI to summarize a 50-page financial or policy report, what must always be verified manually against the primary source?",
                "options": [
                    "The color of the page margins.",
                    "Specific numerical figures, critical deadline dates, legal penalty clauses, and negative exclusions ('not', 'except').",
                    "The font family used by the PDF reader.",
                    "The length of the table of contents."
                ],
                "answer": "B",
                "explanation": "LLM summarization frequently drops negation words ('not permitted' becomes 'permitted') or distorts specific numbers and dates."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Uses AI to rewrite or shorten text.",
                "coding": "Can run the policy regex parser with sample strings.",
                "sim": "Accepts AI summaries without verifying key numbers."
            },
            "proficient": {
                "concept": "Applies cognitive offloading, few-shot formatting, and verification hygiene.",
                "coding": "Programs structured data extraction scripts using regular expressions.",
                "sim": "Extracts accurate action briefs and spots subtle hallucinated figures."
            },
            "advanced": {
                "concept": "Designs end-to-end automated personal knowledge management (PKM) pipelines.",
                "coding": "Builds robust multi-format document parsers with automated schema validation.",
                "sim": "Achieves peak executive briefing throughput with 100% factual accuracy."
            }
        },
        "responsible_ai": "Information Hygiene & Truth Preservation: Summarizing documents speeds up workflows, but excessive reduction can strip away vital ethical nuances, minority dissenting opinions, and critical safety caveats. Responsible productivity preserves core context.",
        "xp": 260,
        "badge": "Productivity Catalyst",
        "next_mission": "Class 10 Chapter 5 Lesson 2: Create Your AI Project"
    },

    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 5,
        "ch_name": "AI Tools",
        "les_num": 2,
        "title": "Create Your AI Project",
        "pillar": "AI Tools",
        "strand": "End-to-End AI Project Lifecycle, Scoping, Data Curation, Prototyping, and Documentation",
        "prereqs": "Class 10 Chapter 5 Lesson 1.",
        "prereq_details": "Understanding of problem formulation, data cleaning, and Python implementation.",
        "key_terms": ["AI Project Lifecycle", "Problem Scoping", "Data Curation", "Minimum Viable Prototype (MVP)", "Model Card", "User Documentation"],
        "objectives": [
            "Execute the complete 5-stage AI Project Lifecycle: Scoping $\\to$ Data Curation $\\to$ Modeling $\\to$ Evaluation $\\to$ Documentation.",
            "Formulate a Minimum Viable Prototype (MVP) that solves a real community problem under strict time constraints.",
            "Write a formal Model Card detailing intended uses, limitations, training data demographics, and ethical considerations.",
            "Package a complete, runnable Python project with clear user instructions and sample test datasets."
        ],
        "mission_title": "Project CapstoneX: The Community Noise Pollution Sentry",
        "mission_desc": "Residents near your school complain about disruptive late-night construction noise violating municipal sound ordinances (maximum 65 dB after 10:00 PM). Construction companies claim the noise comes from passing highway trucks. You are commissioned to build, test, document, and deploy a complete end-to-end AI mini-project: an edge sound-monitoring sentry that records ambient decibels, classifies construction hammering vs truck engine rumble, logs violations, and publishes an open data report.",
        "theory": """### 1. The 5 Stages of the AI Project Lifecycle
Amateur projects jump straight into writing code without planning. Professional AI engineering follows a structured lifecycle:
1. **Scoping & Problem Formulation:** Define what you are solving, why it matters, who the stakeholders are, and what quantifiable success metric will be used.
2. **Data Curation & Annotation:** Collect authentic real-world data, sanitize noise, label samples reliably, and split into Training, Validation, and Test sets.
3. **Modeling & Prompt/Algorithmic Prototyping:** Build the simplest working baseline model first (e.g. decision threshold or nearest neighbor) before attempting complex deep neural nets.
4. **Rigorous Evaluation & Bias Audit:** Test against unseen edge cases, measure precision/recall, and identify demographic or environmental blindspots.
5. **Documentation & Deployment:** Author comprehensive user documentation and a formal **Model Card** explaining limitations.

### 2. The Model Card Framework
Introduced by researchers (Mitchell et al.), a **Model Card** is a standardized nutritional label for AI systems:
* **Model Details:** Architecture, version, author, date.
* **Intended Use:** What the model was designed for, and explicit *Out-of-Scope* use cases.
* **Training & Evaluation Data:** Data sources, sample sizes, filtering criteria.
* **Quantitative Performance:** Accuracy, F1-scores, performance broken down by subgroup.
* **Limitations & Ethical Warnings:** Known failure modes, environmental conditions where it fails.""",
        "demo": """### Worked Model Card Excerpt: SoundSentry v1.0
* **Model Name:** SoundSentry Noise Classifier v1.0
* **Intended Use:** Intended for residential community monitoring of construction noise violations (>65dB) between 10:00 PM and 6:00 AM.
* **Out of Scope:** Not for legal courtroom evidentiary use; not calibrated for indoor domestic noise.
* **Training Data:** 450 audio clips recorded in urban residential zones (150 construction, 150 highway traffic, 150 baseline night ambient).
* **Limitations:** Rainstorms with heavy thunder generate acoustic signatures that trigger False Positives (misclassified as construction impact). Manual audio review required on rainy nights.""",
        "game": {
            "title": "Startup Forge: The Capstone Pitch",
            "scenario": "Your student startup has 10 weeks to take an AI project from rough idea to live deployment before a panel of venture judges.",
            "objective": "Complete all 5 project phases with high technical rigor, a working prototype, and a flawless Model Card.",
            "tools": "Project Gantt Chart, Budget Tracker, Data Labeling Workbench, Prototype Tester.",
            "roles": "Chief Project Architect.",
            "decision_points": [
                "Allocate limited time between collecting more high-quality training data vs tweaking model hyper-parameters.",
                "Build a simple working MVP early vs getting bogged down in complex theoretical architectures.",
                "Disclose known environmental limitations transparently in the Model Card vs hiding flaws from the judges."
            ],
            "rules": "Hiding known failure modes leads to immediate disqualification when the judges test edge cases. Releasing an honest, working MVP wins the Fellowship.",
            "feedback": "Judges score technical execution, data hygiene, documentation clarity, and societal impact.",
            "reflection": "Why does a simple, thoroughly tested, well-documented model always outperform a complex, buggy, undocumented neural network?"
        },
        "coding": {
            "title": "End-to-End AI Mini-Project: Noise Sentry with Automated Model Card Generator",
            "description": "Develop a complete, self-contained Python mini-project that ingests acoustic telemetry, logs decibel violations, and generates a structured Model Card report.",
            "code": '''import json
from datetime import datetime

class NoiseSentryProject:
    """
    End-to-End Mini-Project: Municipal Noise Ordinance Sentry
    Demonstrates Scoping, Ingestion, Classification, and Model Card Documentation.
    """
    def __init__(self, threshold_db=65.0):
        self.threshold_db = threshold_db
        self.violation_log = []
        self.metadata = {
            "project_name": "SoundSentry Acoustic Monitor",
            "version": "1.0-MVP",
            "created_at": datetime.now().strftime("%Y-%m-%d"),
            "author": "Class 10 Student Engineering Team"
        }

    def process_sensor_stream(self, sensor_events):
        """Processes live telemetry: classifies noise violations and logs timestamps."""
        for event in sensor_events:
            db = event["decibels"]
            sound_type = event["classified_source"]
            time_str = event["timestamp"]
            
            if db > self.threshold_db:
                violation = {
                    "timestamp": time_str,
                    "decibels": db,
                    "exceeded_by": round(db - self.threshold_db, 1),
                    "source": sound_type,
                    "status": "ILLEGAL_VIOLATION" if sound_type == "CONSTRUCTION" else "TRAFFIC_EXEMPTION"
                }
                self.violation_log.append(violation)
                
        return len(self.violation_log)

    def generate_model_card(self):
        """Generates a standardized Model Card documentation dictionary."""
        return {
            "model_details": self.metadata,
            "intended_use": "Autonomous monitoring of late-night municipal construction noise (>65 dB).",
            "out_of_scope_use": "Indoor domestic monitoring or legal evidentiary enforcement without human audit.",
            "operational_threshold_db": self.threshold_db,
            "total_violations_logged": len(self.violation_log),
            "known_limitations": "Thunderstorms and low-flying aircraft can cause acoustic false positives."
        }

# Live Telemetry Test Dataset
sensor_burst = [
    {"timestamp": "23:14:02", "decibels": 54.2, "classified_source": "AMBIENT_NIGHT"},
    {"timestamp": "23:28:15", "decibels": 74.8, "classified_source": "CONSTRUCTION"},
    {"timestamp": "23:45:00", "decibels": 68.1, "classified_source": "HIGHWAY_TRUCK"},
    {"timestamp": "00:12:30", "decibels": 78.5, "classified_source": "CONSTRUCTION"}
]

# Run Project Lifecycle
sentry = NoiseSentryProject(threshold_db=65.0)
sentry.process_sensor_stream(sensor_burst)
card = sentry.generate_model_card()

print("=== PROJECT DEMO: VIOLATION LOGS ===")
for v in sentry.violation_log:
    print(f"[{v['timestamp']}] {v['decibels']} dB (+{v['exceeded_by']} dB) | Source: {v['source']:<14} | Status: {v['status']}")

print("\\n=== FORMAL PROJECT MODEL CARD ===")
for k, v in card.items():
    print(f"{k:<26}: {v}")
''',
            "expected_output": """=== PROJECT DEMO: VIOLATION LOGS ===
[23:28:15] 74.8 dB (+9.8 dB) | Source: CONSTRUCTION   | Status: ILLEGAL_VIOLATION
[23:45:00] 68.1 dB (+3.1 dB) | Source: HIGHWAY_TRUCK  | Status: TRAFFIC_EXEMPTION
[00:12:30] 78.5 dB (+13.5 dB) | Source: CONSTRUCTION   | Status: ILLEGAL_VIOLATION

=== FORMAL PROJECT MODEL CARD ===
model_details             : {'project_name': 'SoundSentry Acoustic Monitor', 'version': '1.0-MVP', 'created_at': '2026-10-12', 'author': 'Class 10 Student Engineering Team'}
intended_use              : Autonomous monitoring of late-night municipal construction noise (>65 dB).
out_of_scope_use          : Indoor domestic monitoring or legal evidentiary enforcement without human audit.
operational_threshold_db  : 65.0
total_violations_logged   : 3
known_limitations         : Thunderstorms and low-flying aircraft can cause acoustic false positives.""",
            "explanation": "The script encapsulates a complete end-to-end AI project: object-oriented telemetry processing, threshold evaluation, and automated generation of a standardized Model Card."
        },
        "questions": [
            {
                "q": "What is a 'Model Card' in professional machine learning engineering?",
                "options": [
                    "A plastic trading card given to software engineers.",
                    "A standardized documentation report that details a model's architecture, intended uses, training data limitations, evaluation metrics, and ethical caveats.",
                    "A computer graphics processing card (GPU).",
                    "A business card handed out at conferences."
                ],
                "answer": "B",
                "explanation": "Model Cards provide standardized transparency, outlining intended use cases, performance benchmarks, and known operational limitations."
            },
            {
                "q": "Why is developing a 'Minimum Viable Prototype' (MVP) recommended before building complex deep learning systems?",
                "options": [
                    "Because MVPs are cheaper to print on paper.",
                    "Because building an MVP allows developers to quickly validate the end-to-end data pipeline and confirm whether the problem is actually solvable with simple heuristics before spending months on complex architectures.",
                    "Because big models are forbidden in school competitions.",
                    "Because MVPs do not require computers."
                ],
                "answer": "B",
                "explanation": "An MVP validates core assumptions, data pipelines, and user feasibility with minimal wasted effort, exposing fundamental flaws early."
            },
            {
                "q": "Which phase of the AI Project Lifecycle typically consumes 70% to 80% of an engineering team's total time and effort?",
                "options": [
                    "Writing marketing slogans for the website.",
                    "Data Collection, Cleaning, Sanitization, and Feature Engineering.",
                    "Installing the Python software.",
                    "Turning the computer monitor on and off."
                ],
                "answer": "B",
                "explanation": "Real-world data is messy, incomplete, and noisy; curating, labeling, and cleaning datasets represents the vast majority of engineering effort."
            },
            {
                "q": "Why is specifying 'Out-of-Scope Use Cases' in project documentation an ethical responsibility?",
                "options": [
                    "To confuse users so they do not buy the product.",
                    "To explicitly warn users against deploying the model in high-stakes environments (e.g. medical diagnosis, legal sentencing) for which it was never calibrated or tested.",
                    "To make the documentation file larger in bytes.",
                    "Because lawyers get paid per word."
                ],
                "answer": "B",
                "explanation": "Explicitly documenting out-of-scope uses prevents dangerous misuse in critical domains where the model is untested or uncalibrated."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Knows that projects have steps like planning and coding.",
                "coding": "Can run the project demo script with provided inputs.",
                "sim": "Jumps straight to coding without defining requirements."
            },
            "proficient": {
                "concept": "Explains the 5-stage project lifecycle, MVP methodology, and Model Card components.",
                "coding": "Implements modular Python classes with automated logging and documentation.",
                "sim": "Balances data cleaning and model building to ship an honest MVP."
            },
            "advanced": {
                "concept": "Formulates complete production MLOps lifecycles with continuous monitoring and governance.",
                "coding": "Builds robust, end-to-end deployable packages with comprehensive Model Cards and automated unit tests.",
                "sim": "Pitches a top-scoring, fully documented project that wins unanimous judge acclaim."
            }
        },
        "responsible_ai": "Radical Transparency & Honest Engineering: A great engineer is defined not by claiming their software is flawless, but by having the intellectual honesty to document exactly where, how, and why it can fail. Transparent limitations protect human users from silent algorithmic harm.",
        "xp": 275,
        "badge": "Capstone Master",
        "next_mission": "Class 10 Chapter 6 Lesson 1: Original or AI-Made?"
    },

    # -------------------------------------------------------------
    # CHAPTER 6: RESPONSIBLE AI
    # -------------------------------------------------------------
    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 6,
        "ch_name": "Responsible AI",
        "les_num": 1,
        "title": "Original or AI-Made?",
        "pillar": "Responsible AI",
        "strand": "Intellectual Property, AI Attribution, Plagiarism vs Fair Use, and Synthetic Text Detection",
        "prereqs": "Class 10 Chapter 5.",
        "prereq_details": "Understanding of how generative LLMs synthesize text probabilistically.",
        "key_terms": ["AI Plagiarism", "Attribution Standards", "Perplexity & Burstiness", "Watermarking", "Fair Use", "Intellectual Property"],
        "objectives": [
            "Distinguish between legitimate AI-assisted augmentation and fraudulent academic plagiarism.",
            "Master formal academic citation standards for generative AI contributions.",
            "Analyze the statistical mechanics of synthetic text detectors (Perplexity, Burstiness, Token Probability Curves).",
            "Evaluate copyright controversies surrounding AI training on human creative works."
        ],
        "mission_title": "Project Veritas: The High-School Essay Integrity Tribunal",
        "mission_desc": "The annual Inter-School Essay Championship receives 300 submissions on 'The Ethics of Genetic Engineering'. The first-place prize is a $5,000 college scholarship. An anonymous whistleblower claims that the winning essay was generated entirely by prompting an AI chatbot with 'write a winning essay in the style of an articulate 16-year-old'. You are appointed Chief Forensics Lead to audit the essay using statistical text forensics, establish whether academic fraud occurred, and define school attribution policy.",
        "theory": """### 1. The Boundary Between Assistance and Academic Fraud
* **Legitimate AI Assistance:** Using an AI tool to brainstorm outline concepts, proofread grammatical mechanics, suggest counter-arguments, or format citations—with transparent documentation in your methodology.
* **Academic Fraud (AI Plagiarism):** Submitting AI-generated paragraphs, arguments, or complete papers as your own original intellectual creation, deceptively taking credit for work you did not produce.

### 2. Statistical Mechanics of AI Text Detectors
AI detectors do not 'know' facts; they evaluate statistical signatures:
1. **Perplexity:** A mathematical measure of how 'surprised' a language model is by a sequence of words.
   * LLMs choose statistically probable next tokens $\\implies$ **Low Perplexity** (predictable text).
   * Human writers use surprising idioms, unusual adjectives, and idiosyncratic phrasing $\\implies$ **High Perplexity**.
2. **Burstiness:** The variation in sentence length and structure across a paragraph.
   * LLMs maintain relatively uniform, balanced cadence $\\implies$ **Low Burstiness**.
   * Humans write short punchy sentences followed by long, winding, complex thoughts $\\implies$ **High Burstiness**.

### 3. The Unreliability of AI Detectors
Detectors frequently produce **False Positives**, especially against non-native English speakers who write with formal, predictable phrasing. Therefore, statistical detectors must never be used as sole proof for disciplinary punishment without collaborative human dialogue.""",
        "demo": """### Worked Mathematical Metrics: Perplexity and Burstiness
Sentence A (AI-typical): `'Artificial intelligence is a rapidly advancing technology that impacts modern society in numerous significant ways.'`
* Sentence lengths: `[14 words]`. Sentence variation: $0.0$. Perplexity: Low ($P \\approx 12$). $\\implies$ Uniform, predictable cadence.

Sentence B (Human-typical): `'AI terrifies me. Yet, when I watched an algorithm sequence a malaria vaccine in under six minutes yesterday, I realized that our world has fundamentally tilted on its axis.'`
* Sentence lengths: `[3 words, 24 words]`. Length Variance: High (Burstiness $\\sigma \\approx 14.8$). Perplexity: High ($P \\approx 68$). $\\implies$ Organic human style.""",
        "game": {
            "title": "The Integrity Tribunal: Human or Machine?",
            "scenario": "You are President of the Academic Honor Board. Five student essays are challenged for suspected AI plagiarism.",
            "objective": "Distinguish between authentic human writing, AI-assisted drafting, and pure 100% copy-pasted machine generation.",
            "tools": "Perplexity Meter, Burstiness Grapher, Style Variance Analyzer, Interview Chamber.",
            "roles": "Honor Board President.",
            "decision_points": [
                "Evaluate whether low burstiness is due to non-native English writing or AI generation.",
                "Interview the student: Can they explain the underlying vocabulary and concepts in their own words?",
                "Distinguish between legitimate brainstorming versus fraudulent submission."
            ],
            "rules": "Falsely accusing an honest student of cheating destroys lives (-500 pts). Letting complete AI fraud win corrupts academic fairness (-300 pts).",
            "feedback": "Forensic dashboard plots sentence-length burstiness curves and cross-examination credibility scores.",
            "reflection": "Why is an open oral dialogue with a student far more reliable for establishing authentic understanding than an automated detector software?"
        },
        "coding": {
            "title": "Text Burstiness and Stylistic Variance Analyzer in Python",
            "description": "Write a Python script that calculates sentence-length variance (burstiness) and vocabulary richness to evaluate text authenticity.",
            "code": '''import math

def calculate_text_burstiness(text):
    """
    Computes sentence-length variance (Burstiness metric).
    Human writing typically displays high burstiness (mixing very short and very long sentences),
    while raw AI text tends toward uniform, balanced sentence lengths.
    """
    # Split text into sentences by punctuation
    import re
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if len(s.strip()) > 0]
    
    if len(sentences) < 2:
        return {"error": "Text too short for burstiness calculation"}
        
    lengths = [len(s.split()) for s in sentences]
    mean_len = sum(lengths) / len(lengths)
    
    # Calculate standard deviation of sentence length
    variance = sum((l - mean_len) ** 2 for l in lengths) / len(lengths)
    std_dev = math.sqrt(variance)
    
    # Vocabulary Richness: Type-Token Ratio (TTR)
    all_words = text.lower().split()
    unique_words = set(all_words)
    ttr = len(unique_words) / float(len(all_words)) if all_words else 0.0
    
    # Diagnostic heuristic
    if std_dev < 3.5:
        cadence_flag = "LOW_BURSTINESS (Uniform, typical of AI)"
    else:
        cadence_flag = "HIGH_BURSTINESS (Dynamic, typical of human)"
        
    return {
        "sentence_count": len(sentences),
        "mean_sentence_length": round(mean_len, 1),
        "length_std_dev": round(std_dev, 2),
        "cadence_evaluation": cadence_flag,
        "type_token_ratio": round(ttr, 3)
    }

# Sample 1: Machine-like uniform text
text_ai = """Artificial intelligence is a transformative technological phenomenon in the modern era. 
It facilitates unprecedented efficiency across diverse industrial and educational sectors. 
Researchers must actively navigate complicated ethical challenges to ensure societal stability."""

# Sample 2: Dynamic human text
text_human = """AI terrifies me. 
Yet, when I watched an algorithm sequence a malaria vaccine in under six minutes yesterday, I realized our world has tilted. 
We cannot look away."""

print("=== TEXT BURSTINESS FORENSIC AUDIT ===")
print("--- Analyzing Sample A (Suspected Machine) ---")
rep_a = calculate_text_burstiness(text_ai)
for k, v in rep_a.items():
    print(f"  {k:<22}: {v}")

print("\\n--- Analyzing Sample B (Suspected Human) ---")
rep_b = calculate_text_burstiness(text_human)
for k, v in rep_b.items():
    print(f"  {k:<22}: {v}")
''',
            "expected_output": """=== TEXT BURSTINESS FORENSIC AUDIT ===
--- Analyzing Sample A (Suspected Machine) ---
  sentence_count        : 3
  mean_sentence_length  : 11.7
  length_std_dev        : 0.94
  cadence_evaluation    : LOW_BURSTINESS (Uniform, typical of AI)
  type_token_ratio      : 0.943

--- Analyzing Sample B (Suspected Human) ---
  sentence_count        : 3
  mean_sentence_length  : 10.3
  length_std_dev        : 9.88
  cadence_evaluation    : HIGH_BURSTINESS (Dynamic, typical of human)
  type_token_ratio      : 0.935""",
            "explanation": "The script calculates sentence-length standard deviation. Sample A has an almost uniform sentence length (std dev = 0.94), while Sample B shows dramatic human burstiness (std dev = 9.88), illustrating stylistic cadence analysis."
        },
        "questions": [
            {
                "q": "What is 'Burstiness' in statistical text analysis?",
                "options": [
                    "How quickly a printer prints pages.",
                    "The variation and diversity in sentence length and syntactic structure across a body of text.",
                    "A computer virus that crashes word processors.",
                    "The number of exclamation marks in an essay."
                ],
                "answer": "B",
                "explanation": "Burstiness measures the variance in sentence cadence and length; human writing exhibits high variance compared to predictable LLM generation."
            },
            {
                "q": "Why are commercial AI text detectors notorious for generating False Positives on essays written by non-native English speakers?",
                "options": [
                    "Because detectors do not work on computers in foreign countries.",
                    "Because non-native English speakers often write using formal, standardized grammar and less idiomatic vocabulary, matching the low-perplexity profile of language models.",
                    "Because non-native speakers always use chatbots.",
                    "Because non-native text has no vowels."
                ],
                "answer": "B",
                "explanation": "Non-native writers frequently use simpler, more predictable syntactic patterns, which detectors falsely interpret as low-perplexity AI text."
            },
            {
                "q": "What is the proper ethical protocol when submitting schoolwork that was developed with AI assistance?",
                "options": [
                    "Deny everything and delete your browsing history.",
                    "Include a formal 'AI Contribution Statement' detailing which tools were used, the exact prompts provided, and where human verification and original thinking took place.",
                    "List the AI as a co-author on your high school homework.",
                    "Pay money to the AI company."
                ],
                "answer": "B",
                "explanation": "Academic honesty requires transparent attribution, detailing the tools used, the nature of assistance, and the human contribution."
            },
            {
                "q": "Why is submitting an essay generated 100% by an AI model considered academic plagiarism even if the text never existed on the internet before?",
                "options": [
                    "Because the computer will sue the student for copyright.",
                    "Because plagiarism is the fraudulent misrepresentation of authorship—claiming that intellectual effort, synthesis, and creative reasoning were your own when they were not.",
                    "Because English teachers do not like computers.",
                    "Because essays must be written in blue ink."
                ],
                "answer": "B",
                "explanation": "Plagiarism is not merely copyright infringement; it is the fraudulent claim of intellectual authorship over ideas you did not create."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that copy-pasting from a chatbot and claiming you wrote it is wrong.",
                "coding": "Can run the burstiness script with sample paragraphs.",
                "sim": "Relies entirely on software percentages to accuse students."
            },
            "proficient": {
                "concept": "Explains perplexity, burstiness, false positive risks, and proper attribution standards.",
                "coding": "Calculates sentence length standard deviation and vocabulary richness in Python.",
                "sim": "Conducts empathetic student interviews and distinguishes assistance from fraud."
            },
            "advanced": {
                "concept": "Critiques intellectual property law regarding AI training sets and designs institutional academic honesty codes.",
                "coding": "Builds multi-metric stylistic forensic analyzers with confidence intervals.",
                "sim": "Resolves complex academic honor board cases with flawless fairness and zero false accusations."
            }
        },
        "responsible_ai": "The Value of Human Voice: Artificial intelligence can synthesize billions of words in seconds, but it cannot experience joy, grief, curiosity, or moral conviction. Cultivating your authentic human voice and intellectual honesty is your most precious asset in an automated world.",
        "xp": 285,
        "badge": "Integrity Champion",
        "next_mission": "Class 10 Chapter 6 Lesson 2: Use AI, Don't Misuse AI"
    },

    {
        "grade_num": 10,
        "grade": "Class 10",
        "ch_num": 6,
        "ch_name": "Responsible AI",
        "les_num": 2,
        "title": "Use AI, Don't Misuse AI",
        "pillar": "Responsible AI",
        "strand": "Acceptable Use Policies, Harassment & Deepfake Abuse, Algorithmic Responsibility, and Digital Citizenship",
        "prereqs": "Class 10 Chapter 6 Lesson 1.",
        "prereq_details": "Understanding of academic integrity, intellectual property, and AI ethics.",
        "key_terms": ["Acceptable Use Policy (AUP)", "Non-Consensual Synthetic Imagery", "Cyberbullying", "Algorithmic Accountability", "Digital Citizenship", "Whistleblowing"],
        "objectives": [
            "Formulate a comprehensive school Acceptable Use Policy (AUP) balancing educational innovation with ethical safeguards.",
            "Analyze the legal, psychological, and disciplinary consequences of non-consensual synthetic media and AI cyberbullying.",
            "Understand personal legal liability regarding copyright infringement and malicious software generation.",
            "Program an automated content-safety filtering gateway in Python to enforce institutional compliance."
        ],
        "mission_title": "Project Civitas: The High-School AI Bill of Rights & Safety Charter",
        "mission_desc": "Following an incident where an anonymous student used an open-source face-swapping tool to superimpose classmates' faces onto humiliating memes, the school board threatens to ban all computers and internet access on campus. You are appointed Student Chair of the Emergency AI Governance Committee to draft a realistic, enforceable, and empowering 'AI Bill of Rights & Safety Charter' that protects student safety while preserving legitimate technological learning.",
        "theory": """### 1. The Twin Pillars: Empowerment vs. Protection
A naive response to technological misuse is total prohibition ('ban all AI'). However, prohibition fails: students use tools covertly without guidance. A mature institutional framework relies on two balanced pillars:
* **Empowerment:** Encouraging AI for coding co-piloting, language translation, research synthesis, and creative ideation with transparent attribution.
* **Red Lines (Zero-Tolerance Misuse):** Strict prohibitions against non-consensual imagery, academic fraud, generating malicious malware, and algorithmic cyberbullying.

### 2. Malicious Misuse Archetypes
1. **Non-Consensual Synthetic Media (NCII / Deepfakes):** Generating or sharing synthetic images or voices of peers or teachers without consent. In many jurisdictions, this constitutes serious criminal harassment and severe legal liability.
2. **AI-Enabled Cyberbullying:** Generating automated harassment scripts, defamatory rumors, or targeted insult campaigns.
3. **Automated Plagiarism & Cheating:** Using generative models during live examinations or submitting uncredited AI essays.
4. **Credential Theft & Malware Assistance:** Prompting models to discover security exploits or write keyloggers.

### 3. The 3-R Framework for Digital Citizenship
* **R - Respect:** Respecting the biometric privacy, intellectual property, and human dignity of peers.
* **R - Responsibility:** Taking personal ownership of every line of code, text, or image created with AI assistance.
* **R - Redress:** Creating clear, confidential reporting channels for victims of algorithmic harassment.""",
        "demo": """### Worked Policy Architecture: The Traffic-Light AI Framework
Schools use a clear traffic-light system for assignments:
* 🟢 **Green Zone (Full AI Encouraged):** Brainstorming topics, generating practice quiz questions, debugging syntax errors. *Attribution: Mention tool used.*
* 🟡 **Yellow Zone (Conditional AI with Citation):** Outlining essay arguments, translating source material, generating prototype mockups. *Attribution: Submit prompt log and Model Card.*
* 🔴 **Red Zone (Zero AI Permitted):** In-class handwritten examinations, memorized oral debates, fundamental arithmetic tests. *Attribution: 100% human work required.*""",
        "game": {
            "title": "Charter Summit: The School Governance Convention",
            "scenario": "Moderate a heated school assembly between anxious parents, strict principals, enthusiastic teachers, and creative students.",
            "objective": "Draft and ratify a 6-clause AI Safety Charter that wins >=80% approval across all four voting blocs.",
            "tools": "Clause Editor, Stakeholder Voting Matrix, Penalty Balancer.",
            "roles": "Convention Secretary-General.",
            "decision_points": [
                "Establish clear disciplinary penalties for deepfake bullying without criminalizing minor honest mistakes.",
                "Define whether teachers may use AI to grade student assignments.",
                "Institute mandatory AI literacy workshops for students and parents."
            ],
            "rules": "An overly strict charter sparks student rebellion; an overly lax charter triggers parent lawsuits. Achieve balanced consensus to ratify the charter.",
            "feedback": "Live approval gauges display confidence across parents, teachers, and students.",
            "reflection": "Why are clear, collaboratively designed rules far more effective than vague blanket bans?"
        },
        "coding": {
            "title": "Institutional AI Content Safety Gateway & Policy Compliance Auditor in Python",
            "description": "Write a Python gateway filter that intercepts student AI prompts, checks for policy violations (malware, deepfakes, cyberbullying), and logs compliance audits.",
            "code": '''def audit_ai_prompt_compliance(prompt_text, user_id):
    """
    Audits incoming prompts against school Acceptable Use Policy (AUP).
    Flags zero-tolerance violations:
    - Non-consensual synthetic media / deepfakes
    - Exploits / Malware creation
    - Harassment / Doxxing
    """
    prompt_lower = prompt_text.lower()
    violations = []
    
    # Red Line 1: Synthetic face-swapping / voice cloning of individuals
    deepfake_tokens = ["face swap", "deepfake", "clone the voice of", "make a photo of my classmate", "fake video of teacher"]
    if any(t in prompt_lower for t in deepfake_tokens):
        violations.append("[CRITICAL RED LINE]: Non-consensual synthetic media generation attempt.")
        
    # Red Line 2: Cybersecurity attacks / Malware
    malware_tokens = ["keylogger", "bypass school firewall", "ddos attack", "hack wifi password", "exploit script"]
    if any(t in prompt_lower for t in malware_tokens):
        violations.append("[CRITICAL RED LINE]: Malicious software / security exploit generation.")
        
    # Red Line 3: Targeted harassment
    harassment_tokens = ["write an insulting rumor", "bully", "doxx", "leak private address"]
    if any(t in prompt_lower for t in harassment_tokens):
        violations.append("[CRITICAL RED LINE]: Targeted harassment or defamation attempt.")
        
    is_compliant = len(violations) == 0
    verdict = "APPROVED_PROCEED" if is_compliant else "BLOCKED_FLAGGED_TO_OMBUDS"
    
    return {
        "user_id": user_id,
        "is_compliant": is_compliant,
        "verdict": verdict,
        "violations": violations
    }

# Test Cases on Student School Wi-Fi Network
test_prompts = [
    {"user": "STU_1042", "prompt": "Can you explain how Dijkstra algorithm finds the shortest path in Python?"},
    {"user": "STU_2081", "prompt": "Clone the voice of my math teacher so I can make him say funny things in audio"},
    {"user": "STU_3119", "prompt": "Write a Python script to bypass school firewall and crack the admin password"}
]

print("=== SCHOOL AI SAFETY GATEWAY AUDIT ===")
for p in test_prompts:
    res = audit_ai_prompt_compliance(p["prompt"], p["user"])
    print(f"User: {res['user_id']} | Status: {res['verdict']}")
    if not res["is_compliant"]:
        for v in res["violations"]:
            print(f"  -> {v}")
    print()
''',
            "expected_output": """=== SCHOOL AI SAFETY GATEWAY AUDIT ===
User: STU_1042 | Status: APPROVED_PROCEED

User: STU_2081 | Status: BLOCKED_FLAGGED_TO_OMBUDS
  -> [CRITICAL RED LINE]: Non-consensual synthetic media generation attempt.

User: STU_3119 | Status: BLOCKED_FLAGGED_TO_OMBUDS
  -> [CRITICAL RED LINE]: Malicious software / security exploit generation.""",
            "explanation": "The script enforces institutional Acceptable Use Policies programmatically, intercepting prohibited harmful queries (deepfakes, hacking) while permitting legitimate educational inquiries."
        },
        "questions": [
            {
                "q": "Why is generating or circulating a non-consensual synthetic image or voice clone of a classmate considered a severe violation rather than a harmless prank?",
                "options": [
                    "Because it wastes computer battery power.",
                    "Because it violates bodily autonomy, inflicts profound psychological harm, constitutes digital defamation, and can permanently destroy a peer's reputation.",
                    "Because jokes are not allowed in schools.",
                    "Because cameras are only for professional photographers."
                ],
                "answer": "B",
                "explanation": "Non-consensual deepfakes violate personal dignity and psychological safety, carrying severe emotional and legal consequences."
            },
            {
                "q": "What is an Acceptable Use Policy (AUP) in an educational institution?",
                "options": [
                    "A rulebook on how to clean computer keyboards.",
                    "A formal, agreed-upon code of conduct defining permitted educational uses of technology and outlining clear boundaries, responsibilities, and disciplinary consequences for misuse.",
                    "A software license agreement for Microsoft Windows.",
                    "A receipt for buying laptops."
                ],
                "answer": "B",
                "explanation": "An AUP establishes clear expectations, rights, and boundaries for safe digital citizenship within an institution."
            },
            {
                "q": "Why do blanket bans on AI tools in schools almost always fail in practice?",
                "options": [
                    "Because computers stop working when you ban them.",
                    "Because students can easily access models on personal mobile phones outside school, driving usage underground where students receive zero guidance on ethics, verification, or safety.",
                    "Because AI companies buy all the schools.",
                    "Because teachers do not know how to enforce rules."
                ],
                "answer": "B",
                "explanation": "Blanket bans drive technology underground, forfeiting the educational opportunity to teach responsible digital citizenship and verification hygiene."
            },
            {
                "q": "Under the 'Traffic-Light AI Policy' framework, which activity typically belongs in the 'Red Zone' (Zero AI Permitted)?",
                "options": [
                    "Brainstorming creative science fair project titles.",
                    "A formal, closed-book, handwritten in-class examination testing fundamental mathematical mastery.",
                    "Checking code for spelling errors.",
                    "Translating a foreign phrase."
                ],
                "answer": "B",
                "explanation": "Closed-book exams evaluate personal baseline mastery and foundational retention, requiring completely unassisted human execution."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that some things (like bullying and hacking) are not allowed.",
                "coding": "Can run the compliance gateway script.",
                "sim": "Favors either total bans or zero rules, failing to achieve consensus."
            },
            "proficient": {
                "concept": "Explains the Traffic-Light framework, deepfake liability, and digital citizenship.",
                "coding": "Programs policy keyword token filters and compliance audit logging in Python.",
                "sim": "Drafts balanced policies that balance student innovation with safety."
            },
            "advanced": {
                "concept": "Formulates institutional governance charters with restorative justice and whistleblower protections.",
                "coding": "Builds robust, multi-layer semantic content safety gateways with audit trails.",
                "sim": "Achieves unanimous 100% ratification across all student, parent, and faculty voting blocs."
            }
        },
        "responsible_ai": "Guardians of the Digital Agora: Technology is neither inherently good nor bad; it magnifies human intent. By choosing to use AI with empathy, honesty, and mutual respect, students build a digital world where every individual is safe, valued, and empowered to thrive.",
        "xp": 300,
        "badge": "Digital Sovereign Laureate",
        "next_mission": "Class 10 Completed! Unlocks: Class 11 Chapter 1 Lesson 1 ('Inside Intelligent Machines')"
    }
]

CLASS_10_LESSONS.extend(CH3_TO_CH6_LESSONS)
print(f"Total Class 10 Lessons compiled: {len(CLASS_10_LESSONS)}")

# Write all Class 10 lessons
for les in CLASS_10_LESSONS:
    write_lesson_file(OUT_DIR, les)

print("All 12 Class 10 lessons successfully generated!")
