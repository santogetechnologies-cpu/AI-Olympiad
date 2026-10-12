"""
Class 9 Curriculum Builder - Chapters 3 to 6 (Lessons 5 to 12)
Completes all 12 lessons for Class 9.
"""

from build_class9_c2 import CLASS_9_LESSONS

CH3_TO_CH6_LESSONS = [
    # -------------------------------------------------------------
    # CHAPTER 3: AI APPLICATIONS
    # -------------------------------------------------------------
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 3,
        "ch_name": "AI Applications",
        "les_num": 1,
        "title": "AI for Our Planet",
        "pillar": "AI Applications",
        "strand": "Environmental AI, Satellite Earth Observation, Bioacoustics, and Conservation",
        "prereqs": "Class 9 Chapter 1 Lessons 1 & 2 (Data representation, Classification).",
        "prereq_details": "Understanding of spatial coordinates, image pixels, and basic ecology concepts.",
        "key_terms": ["Earth Observation", "Normalized Difference Vegetation Index (NDVI)", "Bioacoustics", "Computer Vision Segmentation", "Wildfire Spread Modeling"],
        "objectives": [
            "Explain how Computer Vision and Remote Sensing process multi-spectral satellite imagery to monitor deforestation.",
            "Understand bioacoustic AI pipelines for non-invasive biodiversity tracking in endangered habitats.",
            "Calculate and interpret vegetation indices (NDVI) to detect ecological distress.",
            "Design an automated anomaly detection workflow for early wildfire ignition alert."
        ],
        "mission_title": "Project CanopyShield: Automated Rainforest Deforestation Sentry",
        "mission_desc": "Illegal logging syndicates operate deep inside protected rainforest reserves, evading sparse park ranger patrols. Your mission is to deploy an edge-computing AI sentinel system that combines satellite multi-spectral vegetation analysis with solar-powered acoustic audio listening posts to pinpoint chainsaw activity and rapid canopy loss in real time.",
        "theory": """### 1. Earth Observation and Satellite Remote Sensing
Modern environmental satellites capture multi-spectral imagery across visible and infrared spectrums:
* Healthy photosynthetic vegetation absorbs red light and strongly reflects Near-Infrared (NIR) light.
* Unhealthy or cleared land reflects more red light and less NIR light.
* **NDVI Formula:**
  $$\\text{NDVI} = \\frac{\\text{NIR} - \\text{Red}}{\\text{NIR} + \\text{Red}}$$
  NDVI values range from $-1.0$ to $+1.0$. Dense canopy scores between $0.6$ and $0.9$; cleared bare soil scores around $0.1$ to $0.2$.

### 2. Bioacoustics: Listening to Ecosystem Health
Old smartphones and specialized microphone nodes mounted in tree canopies continuously stream acoustic audio waveforms:
1. Audio is converted into a visual frequency spectrum called a **Spectrogram**.
2. A Convolutional Neural Network (CNN) scans spectrogram patterns to classify species calls (e.g. endangered hornbills) and flag anomalous industrial sounds (chainsaws, truck engines, gunshots).""",
        "demo": """### Worked Calculation: Quantifying Forest Canopy Loss via NDVI
A satellite cell records: $\\text{NIR} = 0.72$, $\\text{Red} = 0.08$.
$$\\text{NDVI}_{\\text{healthy}} = \\frac{0.72 - 0.08}{0.72 + 0.08} = \\frac{0.64}{0.80} = +0.80 \\implies \\text{Dense Pristine Canopy}$$
Three months later, logging clears the sector: $\\text{NIR} = 0.22$, $\\text{Red} = 0.18$.
$$\\text{NDVI}_{\\text{cleared}} = \\frac{0.22 - 0.18}{0.22 + 0.18} = \\frac{0.04}{0.40} = +0.10 \\implies \\text{Severe Deforestation}$$
The difference $\\Delta \\text{NDVI} = -0.70$ triggers an automated alert.""",
        "game": {
            "title": "Canopy Guard: The Rainforest Defense Network",
            "scenario": "Deploy and manage 6 listening posts and satellite radar passes over the Amazon basin to interdict illegal logging syndicates.",
            "objective": "Detect chainsaw intrusions and arrest poachers within 30 minutes of initial canopy disturbance.",
            "tools": "Spectrogram Audio Analyzer, Satellite Thermal Infrared Feed, Ranger Dispatch Radio.",
            "roles": "Chief Conservation Technologist.",
            "decision_points": [
                "Calibrate acoustic sensitivity: Filter out loud rainstorms and cicada swarms without missing muffled chainsaw engines.",
                "Deploy aerial thermal drones to verify coordinates before dispatching ground ranger units.",
                "Manage solar sensor battery reserves during prolonged overcast cloud cover."
            ],
            "rules": "Each illegal logging site halted preserves 50 hectares of forest. False alarms waste ranger fuel (-100 pts).",
            "feedback": "Interactive ecological map updates forest loss rate and species diversity score.",
            "reflection": "Why is combining multiple sensor modalities (audio + satellite) more resilient than relying on a single sensor?"
        },
        "coding": {
            "title": "Automated Satellite NDVI Deforestation Alert System in Python",
            "description": "Write a Python script that analyzes multi-spectral satellite grid readings, computes NDVI, and outputs a geospatial alert report.",
            "code": '''def calculate_ndvi(nir, red):
    """Calculates Normalized Difference Vegetation Index with zero-division guard."""
    denominator = nir + red
    if denominator == 0:
        return 0.0
    return (nir - red) / denominator

def analyze_forest_sectors(sector_data, distress_threshold=0.35):
    """
    Evaluates satellite sectors and flags areas experiencing severe canopy loss.
    """
    alerts = []
    summary = []
    
    for sector in sector_data:
        s_id = sector["id"]
        ndvi = calculate_ndvi(sector["nir"], sector["red"])
        status = "HEALTHY_CANOPY"
        
        if ndvi < distress_threshold:
            status = "CRITICAL_DEFORESTATION"
            alerts.append(f"[CANOPY ALARM] Sector {s_id}: NDVI={ndvi:.2f} indicates severe clearing!")
            
        summary.append({
            "sector": s_id,
            "ndvi": round(ndvi, 3),
            "status": status
        })
        
    return summary, alerts

# Satellite telemetry: NIR and Red band reflectance values (0.0 to 1.0)
satellite_feed = [
    {"id": "SEC-A1", "nir": 0.78, "red": 0.09},
    {"id": "SEC-A2", "nir": 0.65, "red": 0.12},
    {"id": "SEC-B1", "nir": 0.24, "red": 0.20},  # Suspected clear-cut
    {"id": "SEC-B2", "nir": 0.71, "red": 0.08},
    {"id": "SEC-C1", "nir": 0.18, "red": 0.22}   # Road expansion
]

records, alarms = analyze_forest_sectors(satellite_feed)

print("=== CANOPY SHIELD SATELLITE AUDIT ===")
for r in records:
    print(f"Sector: {r['sector']} | NDVI: {r['ndvi']:<5} | Status: {r['status']}")

print("\\n=== AUTOMATED DISPATCH ALERTS ===")
for a in alarms:
    print(a)
''',
            "expected_output": """=== CANOPY SHIELD SATELLITE AUDIT ===
Sector: SEC-A1 | NDVI: 0.793 | Status: HEALTHY_CANOPY
Sector: SEC-A2 | NDVI: 0.688 | Status: HEALTHY_CANOPY
Sector: SEC-B1 | NDVI: 0.091 | Status: CRITICAL_DEFORESTATION
Sector: SEC-B2 | NDVI: 0.797 | Status: HEALTHY_CANOPY
Sector: SEC-C1 | NDVI: -0.1   | Status: CRITICAL_DEFORESTATION

=== AUTOMATED DISPATCH ALERTS ===
[CANOPY ALARM] Sector SEC-B1: NDVI=0.09 indicates severe clearing!
[CANOPY ALARM] Sector SEC-C1: NDVI=-0.10 indicates severe clearing!""",
            "explanation": "The script calculates NDVI mathematically for each geographical sector and automatically flags illegal clearing events using threshold heuristics."
        },
        "questions": [
            {
                "q": "What physical property enables satellite sensors to distinguish healthy vegetation from cleared barren land?",
                "options": [
                    "Healthy chlorophyll strongly absorbs green light and reflects ultraviolet light.",
                    "Healthy chlorophyll strongly absorbs red light for photosynthesis while cell structures reflect Near-Infrared (NIR) light.",
                    "Cleared land produces radio waves that interfere with satellites.",
                    "Trees emit magnetic pulses detected by compasses."
                ],
                "answer": "B",
                "explanation": "Chlorophyll pigments absorb visible red light, while spongy mesophyll leaf tissue strongly scatters Near-Infrared radiation."
            },
            {
                "q": "If a bioacoustic AI model trained in Malaysian rainforests is deployed directly in the Siberian Taiga without retraining, what will happen?",
                "options": [
                    "It will work with even higher accuracy because snow reflects sound.",
                    "It will perform poorly due to domain shift: different background ambient noises, wind acoustics, and native animal frequencies.",
                    "The microphone will catch fire.",
                    "The neural network will translate animal noises into Russian."
                ],
                "answer": "B",
                "explanation": "Domain shift occurs when the operating environment's acoustic properties differ significantly from the training distribution."
            },
            {
                "q": "Why is bioacoustic sensor monitoring considered more non-invasive than traditional wildlife tagging methods?",
                "options": [
                    "It requires capturing and sedating every animal in the forest.",
                    "It captures soundscapes passively without trapping, handling, or disrupting animal behavior.",
                    "It only works on domesticated animals.",
                    "It costs more than building physical cages."
                ],
                "answer": "B",
                "explanation": "Passive bioacoustics records ambient ecological audio without physical human contact or physiological stress on wildlife."
            },
            {
                "q": "An NDVI score of -0.3 is calculated for a sector. What does this most likely indicate?",
                "options": [
                    "Dense tropical rainforest canopy.",
                    "Water bodies, snow, or clouds (which have higher red reflectance than NIR).",
                    "A field of healthy sunflowers.",
                    "A dense bamboo forest."
                ],
                "answer": "B",
                "explanation": "Negative NDVI values are typical of open water bodies, snow cover, or clouds, where visible reflectance exceeds near-infrared reflectance."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Identifies that satellites and microphones help protect nature.",
                "coding": "Runs basic math operations on satellite numbers.",
                "sim": "Notices alert popups but dispatches units slowly."
            },
            "proficient": {
                "concept": "Understands NDVI formula and bioacoustic spectrogram transformation.",
                "coding": "Implements threshold-based detection scripts in Python.",
                "sim": "Balances sensor trade-offs to halt deforestation efficiently."
            },
            "advanced": {
                "concept": "Formulates multi-modal data fusion architecture for environmental protection.",
                "coding": "Writes vectorized geospatial matrix processing scripts with error bounds.",
                "sim": "Achieves >95% interdiction rate with minimal false dispatches."
            }
        },
        "responsible_ai": "Indigenous Sovereignty & Environmental Justice: Environmental AI monitoring must respect the territorial autonomy of indigenous tribes. Forest surveillance systems must never be weaponized against local foraging communities or compromise human rights.",
        "xp": 130,
        "badge": "Canopy Guardian",
        "next_mission": "Class 9 Chapter 3 Lesson 2: AI for Public Good"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 3,
        "ch_name": "AI Applications",
        "les_num": 2,
        "title": "AI for Public Good",
        "pillar": "AI Applications",
        "strand": "Public Sector AI, Healthcare Triage, Urban Mobility, and Disaster Response",
        "prereqs": "Class 9 Chapter 3 Lesson 1.",
        "prereq_details": "Understanding of data pipelines and algorithmic optimization.",
        "key_terms": ["Public Good AI", "Emergency Triage", "Traffic Signal Optimization", "Computer-Aided Dispatch", "Assistive Technology"],
        "objectives": [
            "Analyze how machine intelligence optimizes emergency healthcare triage and resource distribution.",
            "Explain adaptive AI traffic networks that reduce congestion and carbon emissions.",
            "Examine assistive computer vision tools that empower visually impaired citizens.",
            "Evaluate algorithmic trade-offs between speed, equity, and human oversight in public service."
        ],
        "mission_title": "Project MetroPulse: The Smart City Emergency Grid",
        "mission_desc": "During a torrential flash-flood crisis in Metro City, 14 ambulances are stuck in gridlock, emergency room beds are overwhelmed, and citizens are calling emergency dispatch faster than human operators can triage. You are appointed Chief Systems Architect to configure an AI public service coordination hub that dynamically synchronizes traffic light green corridors with hospital intake capacity.",
        "theory": """### 1. Defining AI for Public Good
Public Good AI refers to machine learning systems engineered to deliver non-excludable, non-rivalrous societal benefits:
* **Healthcare Equity:** Automated screening tools identifying high-risk diabetic retinopathy in rural clinics lacking specialist doctors.
* **Urban Mobility:** Reinforcement learning agents controlling traffic signals to reduce vehicle idling time and particulate emissions.
* **Disaster Resilience:** Satellite damage assessment models mapping earthquake debris to route rescue bulldozers.

### 2. The Mechanics of Automated Triage
Hospital emergency intake uses predictive classification algorithms to assign clinical priority:
* **Input Features:** Heart rate, Blood oxygen ($SpO_2$), Systolic pressure, Age, Symptom severity.
* **Target Classes:** Resuscitation (Code Red), Emergent (Code Orange), Urgent (Code Yellow), Non-Urgent (Code Green).
* **The High-Stakes Dilemma:** An algorithmic false negative in clinical triage can result in patient death, requiring conservative risk thresholds and mandatory human doctor sign-off.""",
        "demo": """### Worked Mathematical Triage Model
Patient triage index scoring formula:
$$T = (100 - SpO_2) \\times 2 + \\frac{|HR - 75|}{5} + S$$
Where $SpO_2$ is blood oxygen percentage, $HR$ is heart rate in BPM, and $S$ is pain score ($0-10$).
* **Patient A:** $SpO_2 = 98\\%$, $HR = 80$, $S = 4$:
  $$T_A = (100 - 98) \\times 2 + \\frac{|80 - 75|}{5} + 4 = 4 + 1 + 4 = 9 \\implies \\text{Non-Urgent}$$
* **Patient B:** $SpO_2 = 88\\%$, $HR = 130$, $S = 8$:
  $$T_B = (100 - 88) \\times 2 + \\frac{|130 - 75|}{5} + 8 = 24 + 11 + 8 = 43 \\implies \\text{Code Red (Immediate ICU)}$$""",
        "game": {
            "title": "Gridlock Hero: The Smart City Triage Simulator",
            "scenario": "Manage traffic signals and ambulance dispatch across 12 city intersections during an extreme storm.",
            "objective": "Clear emergency corridors for ambulances while preventing catastrophic citywide gridlock.",
            "tools": "Dynamic Signal Overrides, Hospital Capacity Heatmaps, Route Predictor.",
            "roles": "Urban Incident Commander.",
            "decision_points": [
                "Trigger green-wave corridors: Prioritize Code Red ambulances even if cross-street traffic backs up.",
                "Reroute incoming ambulances away from overwhelmed central hospitals to regional facilities.",
                "Balance pedestrian crossing safety timers against vehicle queue clearance."
            ],
            "rules": "Each patient arriving at hospital within survival window saves a life. Overwhelming any hospital beyond bed capacity causes penalties.",
            "feedback": "City dashboard shows live average transit time, carbon footprint, and patient survival rate.",
            "reflection": "Why must public infrastructure algorithms prioritize vulnerable human lives over simple vehicle throughput?"
        },
        "coding": {
            "title": "Automated Hospital Triage and Intelligent Dispatching in Python",
            "description": "Program an emergency triage evaluator that scores patient vitals and matches them with available hospital beds.",
            "code": '''def calculate_triage_score(vitals):
    """
    Computes emergency severity index from vital signs.
    Returns score and assigned triage classification.
    """
    spo2 = vitals["spo2"]
    hr = vitals["heart_rate"]
    pain = vitals["pain_scale"]
    
    # Mathematical triage formula
    severity = (100 - spo2) * 2 + abs(hr - 75) / 5.0 + pain
    
    if severity >= 35 or spo2 < 90:
        tier = "CODE_RED_IMMEDIATE"
    elif severity >= 20:
        tier = "CODE_ORANGE_URGENT"
    else:
        tier = "CODE_GREEN_STABLE"
        
    return round(severity, 1), tier

def dispatch_patients(patient_list, hospital_beds):
    """
    Allocates patients to hospitals based on severity and available capacity.
    """
    dispatch_log = []
    
    # Sort patients descending by severity score
    evaluated = []
    for p in patient_list:
        score, tier = calculate_triage_score(p["vitals"])
        evaluated.append({**p, "score": score, "tier": tier})
        
    evaluated.sort(key=lambda x: x["score"], reverse=True)
    
    for p in evaluated:
        # Find nearest hospital with open beds
        allocated = False
        for h in hospital_beds:
            if h["icu_beds" if p["tier"] == "CODE_RED_IMMEDIATE" else "general_beds"] > 0:
                bed_key = "icu_beds" if p["tier"] == "CODE_RED_IMMEDIATE" else "general_beds"
                h[bed_key] -= 1
                dispatch_log.append(f"Dispatch {p['name']} ({p['tier']}, Score {p['score']}) -> {h['name']}")
                allocated = True
                break
        if not allocated:
            dispatch_log.append(f"[CAPACITY OVERFLOW]: No beds for {p['name']} ({p['tier']})! Route to external field unit.")
            
    return dispatch_log

# Live patient vitals in ER intake
patients = [
    {"name": "Citizen Alex", "vitals": {"spo2": 86, "heart_rate": 135, "pain_scale": 9}},
    {"name": "Citizen Maya", "vitals": {"spo2": 97, "heart_rate": 78, "pain_scale": 3}},
    {"name": "Citizen Ravi", "vitals": {"spo2": 92, "heart_rate": 110, "pain_scale": 6}}
]

hospitals = [
    {"name": "City General", "icu_beds": 1, "general_beds": 2},
    {"name": "St. Jude Metro", "icu_beds": 0, "general_beds": 1}
]

actions = dispatch_patients(patients, hospitals)

print("=== SMART TRIAGE AND DISPATCH LOG ===")
for action in actions:
    print(action)
''',
            "expected_output": """=== SMART TRIAGE AND DISPATCH LOG ===
Dispatch Citizen Alex (CODE_RED_IMMEDIATE, Score 49.0) -> City General
Dispatch Citizen Ravi (CODE_ORANGE_URGENT, Score 29.0) -> City General
Dispatch Citizen Maya (CODE_GREEN_STABLE, Score 9.6) -> City General""",
            "explanation": "The script scores clinical urgency mathematically from biometric sensor streams and allocates finite hospital bed resources according to clinical priority rather than first-come-first-served."
        },
        "questions": [
            {
                "q": "Why is a First-Come, First-Served (FCFS) queuing model considered unethical in emergency hospital management compared to an AI triage model?",
                "options": [
                    "Because FCFS requires more computer electricity.",
                    "Because a critically unstable patient arriving 5 minutes later could die waiting behind stable patients with minor ailments.",
                    "Because doctors prefer writing code over seeing patients.",
                    "Because hospitals are legally required to use Python."
                ],
                "answer": "B",
                "explanation": "Clinical ethics dictates that medical care must be prioritized based on immediate risk to human life rather than queue arrival timestamp."
            },
            {
                "q": "How does an adaptive AI traffic signal system reduce carbon footprint across a metropolitan area?",
                "options": [
                    "By turning off all streetlights permanently.",
                    "By minimizing repetitive stop-and-go acceleration cycles and idle waiting times at empty intersections.",
                    "By forcing drivers to convert cars into electric scooters.",
                    "By blowing wind across roads with fans."
                ],
                "answer": "B",
                "explanation": "Internal combustion engines emit peak greenhouse gases and particulates during idle standing and repeated acceleration. Smoothing traffic flow reduces total fuel consumed."
            },
            {
                "q": "Computer vision assistive tools for visually impaired citizens primarily utilize which pipeline?",
                "options": [
                    "Converting audio to text and printing it on paper.",
                    "Camera frames $\\to$ Object Detection/Scene Description CNN $\\to$ Text-to-Speech audio synthesis.",
                    "Scanning barcodes and deleting the product.",
                    "Encrypting visual images with passwords."
                ],
                "answer": "B",
                "explanation": "Assistive visual AI captures real-time video, identifies obstacles and text using deep learning, and whispers navigational cues to the user via audio."
            },
            {
                "q": "What is the primary danger of deploying an AI dispatch system without human medical supervisors in the loop?",
                "options": [
                    "The computer processor will become physically hot.",
                    "An unspotted sensor glitch (e.g. detached sensor clip) could misdiagnose a critical patient as stable, resulting in unattended fatalities.",
                    "The hospital electricity bill will double.",
                    "The operating system will revert to MS-DOS."
                ],
                "answer": "B",
                "explanation": "AI systems lack common sense and clinical intuition; a dislodged sensor reading zero pulse could be misinterpreted without human validation."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Explains that AI can help ambulances and doctors save lives.",
                "coding": "Modifies simple variable values in the triage script.",
                "sim": "Allows traffic jams to form before reacting to ambulance sirens."
            },
            "proficient": {
                "concept": "Explains algorithmic triage logic, smart grid traffic flow, and assistive tech.",
                "coding": "Implements sorting algorithms and capacity allocation in Python.",
                "sim": "Coordinates green wave corridors while keeping city traffic flowing."
            },
            "advanced": {
                "concept": "Formulates ethical resource allocation frameworks and multi-criteria optimization.",
                "coding": "Writes resilient, multi-hospital queue dispatchers with overflow safety routines.",
                "sim": "Achieves 100% survival rate with zero hospital bed over-commitments."
            }
        },
        "responsible_ai": "Algorithmic Equity in Public Services: Public infrastructure algorithms must never allocate fewer emergency resources to underserved or low-income neighborhoods. Audits must ensure response times are democratically equal across all postal codes.",
        "xp": 135,
        "badge": "Civic AI Architect",
        "next_mission": "Class 9 Chapter 4 Lesson 1: Design Your AI Future"
    },

    # -------------------------------------------------------------
    # CHAPTER 4: AI AND CAREER
    # -------------------------------------------------------------
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 4,
        "ch_name": "AI and Career",
        "les_num": 1,
        "title": "Design Your AI Future",
        "pillar": "AI and Career",
        "strand": "AI Career Landscape, Interdisciplinary Roles, and Future of Work",
        "prereqs": "General awareness of technology careers and secondary school education paths.",
        "prereq_details": "Understanding that modern careers combine technical tools with domain specializations.",
        "key_terms": ["Machine Learning Engineer", "Data Scientist", "AI Ethicist", "Prompt Engineer", "Domain Specialist", "Portfolio"],
        "objectives": [
            "Deconstruct the diverse landscape of modern AI professions beyond pure programming.",
            "Analyze how traditional careers (medicine, law, architecture, agriculture) are augmented by AI co-pilots.",
            "Identify the technical vs human-centric skills required for high-impact AI careers.",
            "Construct a personal 4-year development plan toward secondary-school AI excellence."
        ],
        "mission_title": "Project FutureSelf: The AI Career Blueprint",
        "mission_desc": "Your school is hosting the 2030 Career Expo. You are appointed to design an interactive career guidance engine that matches student strengths (logic, empathy, visual creativity, mathematical curiosity) with burgeoning AI career specializations and specifies the exact high-school competencies needed to thrive in them.",
        "theory": """### 1. The Expanding Taxonomy of AI Professions
The AI job market has evolved far beyond solitary computer programmers:

| Career Title | Primary Focus | Key Toolkit | Core Background |
| :--- | :--- | :--- | :--- |
| **Machine Learning Engineer** | Designing, training, and deploying production algorithms | Python, PyTorch, Docker, Cloud APIs | Computer Science, Linear Algebra |
| **Data Scientist** | Finding patterns in complex datasets to drive strategy | SQL, Pandas, Statistics, Storytelling | Mathematics, Statistics |
| **AI Ethicist / Compliance Auditor** | Auditing models for bias, privacy violations, and legal safety | Philosophy, Policy, AI Governance Frameworks | Law, Sociology, Ethics |
| **AI Solutions Architect** | Connecting business problems with ready-made AI toolkits | Cloud Infrastructure, APIs, System Design | Systems Engineering |
| **Domain-Specific AI Innovator** | Applying AI to biology, climate, law, or music | CRISPR AI, Legal NLP, CAD Generative Design | Medicine, Law, Architecture |

### 2. The 'T-Shaped' Professional in the AI Era
The most resilient professionals in an automated world possess a **T-Shaped Profile**:
* **Broad Horizontal Bar:** General literacy across AI capabilities, communication, prompt engineering, critical verification, and ethical awareness.
* **Deep Vertical Stem:** Deep, specialized mastery in one specific domain (e.g. marine biology, mechanical robotics, constitutional law, or algorithmic optimization).""",
        "demo": """### Worked Skill-Alignment Matrix
Consider a Class 9 student who loves biology and drawing, but finds low-level assembly coding tedious.
* **Bad Advice:** 'You must become a software engineer or you will have no future.'
* **Strategic AI Alignment:** **Bio-Medical Visualization Specialist** or **Computational Ecology Researcher**.
  * Skill Mix: Biology fundamentals (70%) + Python data science (20%) + Prompted visual simulation tools (10%).
  * Outcome: Using AI models like AlphaFold to visualize protein synthesis and discover new medicines.""",
        "game": {
            "title": "FutureCraft: The AI Career Simulator",
            "scenario": "Step into the shoes of a technology advisor navigating career paths over a simulated 15-year timeline (2025–2040).",
            "objective": "Build a robust professional profile that survives three major technological disruption waves (Generative Boom, Quantum Leap, Autonomous Robotics).",
            "tools": "Skill Tree Upgrader, Time-Investment Allocator, Project Portfolio Builder.",
            "roles": "Career Strategist.",
            "decision_points": [
                "Allocate study hours between foundational math, hands-on coding, and domain specialization.",
                "Choose between chasing fleeting trendy tool fads vs investing in immutable principles (logic, statistics).",
                "Publish open-source projects vs pursuing traditional standardized test memorization."
            ],
            "rules": "Maintain high employability and personal fulfillment metrics through shifting economic shocks.",
            "feedback": "Radar charts illustrate technical depth, adaptability index, and creative uniqueness.",
            "reflection": "Why are foundational principles (like statistics and problem decomposition) more future-proof than specific software libraries?"
        },
        "coding": {
            "title": "Interactive AI Career Path Matcher & Competency Planner in Python",
            "description": "Develop a rule-based career guidance script that ingests student aptitude ratings and generates a tailored career roadmap.",
            "code": '''def match_ai_career_profile(strengths):
    """
    Evaluates student aptitude vectors across 4 dimensions:
    [math_logic, coding_tech, design_creativity, ethics_humanities]
    Returns top career role and recommended high-school learning modules.
    """
    m = strengths["math_logic"]
    c = strengths["coding_tech"]
    d = strengths["design_creativity"]
    e = strengths["ethics_humanities"]
    
    # Calculate alignment scores
    scores = {
        "Machine Learning Engineer": (c * 0.5) + (m * 0.4) + (d * 0.1),
        "Data Scientist": (m * 0.5) + (c * 0.3) + (e * 0.2),
        "AI UX & Interaction Designer": (d * 0.5) + (c * 0.2) + (e * 0.3),
        "AI Policy & Ethics Officer": (e * 0.6) + (m * 0.2) + (c * 0.2),
        "AI Healthcare Specialist": (m * 0.3) + (e * 0.4) + (d * 0.3)
    }
    
    # Identify top career match
    best_role = max(scores, key=scores.get)
    
    # Roadmap recommendations
    roadmaps = {
        "Machine Learning Engineer": ["Python OOP", "Linear Algebra", "Kaggle Competitions", "PyTorch Basics"],
        "Data Scientist": ["Statistics & Probability", "SQL Databases", "Pandas Dataframes", "Data Storytelling"],
        "AI UX & Interaction Designer": ["Figma Prototyping", "Prompt Engineering", "User Psychology", "Frontend UI"],
        "AI Policy & Ethics Officer": ["Philosophy of Technology", "Data Privacy Laws", "Bias Auditing", "Debating"],
        "AI Healthcare Specialist": ["AP Biology", "Biostatistics", "Medical Imaging AI", "Health Informatics"]
    }
    
    return best_role, scores[best_role], roadmaps[best_role]

# Student Self-Assessment Profile (Rated 1 to 10)
student_profile = {
    "math_logic": 7,
    "coding_tech": 5,
    "design_creativity": 9,
    "ethics_humanities": 8
}

role, fit_score, roadmap = match_ai_career_profile(student_profile)

print("=== AI CAREER LAUNCHPAD REPORT ===")
print(f"Top Recommended Role : {role}")
print(f"Role Affinity Score  : {fit_score:.1f} / 10.0")
print("Recommended 4-Year Milestone Roadmap:")
for i, step in enumerate(roadmap, 1):
    print(f"  Year {i}: Focus on {step}")
''',
            "expected_output": """=== AI CAREER LAUNCHPAD REPORT ===
Top Recommended Role : AI UX & Interaction Designer
Role Affinity Score  : 7.9 / 10.0
Recommended 4-Year Milestone Roadmap:
  Year 1: Focus on Figma Prototyping
  Year 2: Focus on Prompt Engineering
  Year 3: Focus on User Psychology
  Year 4: Focus on Frontend UI""",
            "explanation": "The script applies weighted linear scoring to student aptitude profiles and produces personalized career trajectories, proving that AI careers accommodate creative, ethical, and analytical minds alike."
        },
        "questions": [
            {
                "q": "What is the primary responsibility of an AI Ethicist or Compliance Auditor?",
                "options": [
                    "Soldering circuit boards in a computer factory.",
                    "Evaluating AI models for algorithmic bias, safety risks, privacy violations, and legal regulatory adherence.",
                    "Fixing broken printer cables.",
                    "Selling software subscriptions to consumers."
                ],
                "answer": "B",
                "explanation": "AI Ethicists audit systems to ensure algorithms do not discriminate, violate human rights, or breach data protection laws."
            },
            {
                "q": "What does having a 'T-shaped skill profile' mean in the modern technology economy?",
                "options": [
                    "Working only on keyboards shaped like the letter T.",
                    "Combining broad general knowledge across multiple fields with deep, specialized mastery in one core discipline.",
                    "Being capable of doing only one single repetitive job.",
                    "Spending all day on television networks."
                ],
                "answer": "B",
                "explanation": "The horizontal bar represents broad interdisciplinary collaboration skills, while the vertical stroke represents deep technical or domain expertise."
            },
            {
                "q": "Why is an open-source project portfolio or GitHub repository often more valuable to modern AI hiring managers than a printed resume?",
                "options": [
                    "Because hiring managers do not know how to read paper.",
                    "Because a project portfolio provides tangible proof of runnable code, problem-solving ability, documentation skill, and collaborative version control.",
                    "Because GitHub pays students money to upload code.",
                    "Because printed resumes are illegal under copyright law."
                ],
                "answer": "B",
                "explanation": "Working code, public commits, and documented repositories provide verifiable evidence of practical competence."
            },
            {
                "q": "Which skill is least likely to be made obsolete by generative AI tools?",
                "options": [
                    "Copy-pasting basic boilerplate code from memory.",
                    "Critical problem formulation, ethical judgment, and complex system design.",
                    "Typing 80 words per minute on a typewriter.",
                    "Memorizing multiplication tables up to 100."
                ],
                "answer": "B",
                "explanation": "Generative AI excels at syntax synthesis and boilerplate, but human critical reasoning, ethical judgment, and novel problem formulation remain essential."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that there are many different jobs related to technology.",
                "coding": "Can modify profile scores in the Python script.",
                "sim": "Chooses skills randomly without clear long-term strategy."
            },
            "proficient": {
                "concept": "Identifies roles (ML Engineer, Data Scientist, Ethicist) and explains T-shaped skill profiles.",
                "coding": "Programs scoring algorithms and formats roadmap dictionaries.",
                "sim": "Balances fundamental math and domain skills to survive technological disruptions."
            },
            "advanced": {
                "concept": "Critically analyzes future workforce dynamics and formulates personalized portfolio strategies.",
                "coding": "Builds multi-criteria career decision engines with dynamic skill-gap analysis.",
                "sim": "Maximizes career resilience across all disruption scenarios."
            }
        },
        "responsible_ai": "Inclusivity in the AI Workforce: The AI revolution must not be restricted to an elite cadre of coders. Diverse representation across genders, cultural backgrounds, and humanities perspectives is vital to creating AI that serves all humanity.",
        "xp": 140,
        "badge": "Future Navigator",
        "next_mission": "Class 9 Chapter 4 Lesson 2: Skill-to-Career Map"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 4,
        "ch_name": "AI and Career",
        "les_num": 2,
        "title": "Skill-to-Career Map",
        "pillar": "AI and Career",
        "strand": "Competency Frameworks, Portfolio Engineering, and Practical Learning Pathways",
        "prereqs": "Class 9 Chapter 4 Lesson 1.",
        "prereq_details": "Understanding of AI career roles and self-assessment concepts.",
        "key_terms": ["Competency Framework", "Skill Matrix", "Git & GitHub", "Micro-Credentials", "Portfolio Project", "Mentorship"],
        "objectives": [
            "Map high-school STEM and humanities subjects directly to professional AI industry competencies.",
            "Understand how to architect a verifiable digital project portfolio showcasing AI problem solving.",
            "Formulate realistic milestones across Class 9, 10, 11, and 12.",
            "Program a skill-gap analyzer that identifies missing prerequisites for target dream careers."
        ],
        "mission_title": "Project PortfolioX: Architecting the High-School AI Showcase",
        "mission_desc": "You are preparing your application for the prestigious International Youth AI Fellowship. Rather than submitting a generic list of school grades, you must assemble a digital portfolio showcasing 3 concrete projects: a data cleaning pipeline, a predictive simulation, and an ethical AI audit. You must program a skill-gap tracking tool to audit your readiness.",
        "theory": """### 1. The Four Competency Pillars of AI
To become a competent AI contributor, students build strength across four interdependent pillars:
1. **Mathematical Foundations:** Linear algebra (vectors, matrices), statistics (mean, variance, normal distribution), and probability.
2. **Computational Thinking:** Python syntax, data structures, algorithms, debugging, version control (Git).
3. **Domain Expertise:** Understanding the real-world context—medicine, agriculture, finance, literature, or art.
4. **Ethics & Human Communication:** Clear technical writing, presenting to non-technical stakeholders, bias detection, and safety.

### 2. Anatomy of a World-Class Student Portfolio Project
A winning portfolio project does not merely repeat a classroom tutorial. It follows the **STAR Methodology**:
* **Situation:** Clear real-world problem (e.g. food waste in school canteen).
* **Task:** Quantifiable objective (e.g. reduce meal forecast error below 10%).
* **Action:** Authentic implementation (e.g. scraped weather data, trained 1-NN predictor, built CLI tool in Python).
* **Result:** Measurable outcome and critical reflection on limitations.""",
        "demo": """### Worked Skill-Gap Calculation
Target Career: **Computer Vision Engineer** requires:
* Linear Algebra: Level 8
* Python: Level 8
* Image Processing: Level 7
* Web Development: Level 3

Current Student Skills:
`Current = {"Linear Algebra": 5, "Python": 7, "Image Processing": 3, "Web Development": 4}`
* Linear Algebra Gap: $8 - 5 = 3$ (High Priority)
* Python Gap: $8 - 7 = 1$ (Minor Polish)
* Image Processing Gap: $7 - 3 = 4$ (Critical Priority)
* Web Development Gap: $3 - 4 = -1$ (Surplus / Sufficient)
Action: Direct next semester's study hours toward Linear Algebra and Image Processing.""",
        "game": {
            "title": "SkillTree: The Level-Up Odyssey",
            "scenario": "You have 100 skill points to distribute across 4 school years. Unlocking advanced AI nodes requires prerequisite masteries.",
            "objective": "Unlock the ultimate capstone badge 'Olympiad Gold Researcher' before graduation.",
            "tools": "Interactive Skill Tree, Time Management Calendar, Hackathon Simulator.",
            "roles": "Student Strategist.",
            "decision_points": [
                "Invest points into Math fundamentals first vs jumping directly into deep learning libraries.",
                "Choose whether to build an independent passion project or join a collaborative hackathon team.",
                "Spend summer break on an open-source AI contribution vs memorizing trivia."
            ],
            "rules": "Attempting advanced nodes without foundational prerequisites triggers the 'Confusion Penalty' (loss of 15 study points).",
            "feedback": "Visual skill web expands dynamically, lighting up unlocked professional capabilities.",
            "reflection": "Why does skipping mathematical prerequisites cause students to hit a steep ceiling when building complex AI models?"
        },
        "coding": {
            "title": "Automated Skill-Gap Auditor and Curriculum Planner in Python",
            "description": "Write a Python tool that audits a student's current competencies against industry benchmarks and generates an action plan.",
            "code": '''def analyze_skill_gap(current_skills, target_benchmark):
    """
    Computes numerical skill deficiencies and outputs prioritized study targets.
    """
    gap_report = []
    total_gap = 0
    
    for skill, target_level in target_benchmark.items():
        current_level = current_skills.get(skill, 0)
        gap = target_level - current_level
        
        status = "COMPLETE" if gap <= 0 else f"DEFICIT (-{gap})"
        if gap > 0:
            total_gap += gap
            
        gap_report.append({
            "skill": skill,
            "current": current_level,
            "target": target_level,
            "gap": max(0, gap),
            "status": status
        })
        
    # Sort descending by largest deficit
    gap_report.sort(key=lambda x: x["gap"], reverse=True)
    return gap_report, total_gap

# Target: Junior AI Research Apprentice
target_role = {
    "Python_Programming": 8,
    "Statistics_Probability": 7,
    "Data_Structures": 7,
    "Git_Version_Control": 6,
    "Technical_Writing": 6
}

# Class 9 Student Self-Audit
my_skills = {
    "Python_Programming": 6,
    "Statistics_Probability": 4,
    "Data_Structures": 3,
    "Git_Version_Control": 2,
    "Technical_Writing": 5
}

report, deficit_sum = analyze_skill_gap(my_skills, target_role)

print("=== SKILL-GAP AUDIT & PRIORITY PLAN ===")
print(f"Total Cumulative Skill Points Needed: {deficit_sum}\\n")
print(f"{'Competency Area':<24} | {'Current':<7} | {'Target':<6} | {'Status'}")
print("-" * 55)
for item in report:
    print(f"{item['skill']:<24} | {item['current']:<7} | {item['target']:<6} | {item['status']}")
''',
            "expected_output": """=== SKILL-GAP AUDIT & PRIORITY PLAN ===
Total Cumulative Skill Points Needed: 12

Competency Area          | Current | Target | Status
-------------------------------------------------------
Data_Structures          | 3       | 7      | DEFICIT (-4)
Git_Version_Control      | 2       | 6      | DEFICIT (-4)
Statistics_Probability   | 4       | 7      | DEFICIT (-3)
Python_Programming       | 6       | 8      | DEFICIT (-2)
Technical_Writing        | 5       | 6      | DEFICIT (-1)""",
            "explanation": "The script computes precise competency deficits between current and target benchmarks, sorting by urgency to guide efficient study time allocation."
        },
        "questions": [
            {
                "q": "Why is version control (such as Git and GitHub) considered a non-negotiable core skill for modern AI practitioners?",
                "options": [
                    "Because it is required to play video games online.",
                    "Because it tracks code history, enables collaborative development, ensures reproducibility, and acts as a verifiable public portfolio.",
                    "Because it automatically writes machine learning equations.",
                    "Because Git replaces the need for a CPU."
                ],
                "answer": "B",
                "explanation": "Git allows teams to track changes, collaborate across branches, reproduce scientific results, and demonstrate authentic project contributions."
            },
            {
                "q": "Which project description best demonstrates the 'STAR' methodology in an AI portfolio?",
                "options": [
                    "'I wrote some Python code about trees and it was really cool.'",
                    "'Faced with high cafeteria food waste (S), I engineered an automated telemetry pipeline (T) that cleaned 3 months of logs and trained an NDVI predictor (A), reducing forecast error by 38% (R).'",
                    "'I watched 50 hours of YouTube tutorials on artificial intelligence.'",
                    "'My teacher gave me an A+ on my computer science test.'"
                ],
                "answer": "B",
                "explanation": "Option B outlines Situation, Task, Action, and quantifiable Results, demonstrating rigorous professional communication."
            },
            {
                "q": "If a student attempts to study deep neural networks before mastering basic Python functions and algebra, what is the most likely outcome?",
                "options": [
                    "They will invent a new quantum computer in 2 weeks.",
                    "They will memorize library syntax blindly without understanding error messages, hitting a steep wall when debugging real-world systems.",
                    "Their computer monitor will malfunction.",
                    "They will immediately win the Turing Award."
                ],
                "answer": "B",
                "explanation": "Without fundamentals, learners rely on rote memorization of high-level code snippets, leaving them incapable of diagnosing subtle algorithmic errors."
            },
            {
                "q": "What is the primary value of participating in student AI Olympiads and collaborative hackathons?",
                "options": [
                    "Winning plastic trophies.",
                    "Applying theoretical knowledge under time constraints, learning team dynamics, and solving open-ended problems.",
                    "Avoiding having to study mathematics.",
                    "Getting free stickers."
                ],
                "answer": "B",
                "explanation": "Competitions provide rigorous problem-solving practice, foster peer collaboration, and simulate real-world engineering constraints."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Lists subjects like math and coding as useful for technology.",
                "coding": "Can run the skill-gap script with default inputs.",
                "sim": "Chooses skills without checking prerequisite requirements."
            },
            "proficient": {
                "concept": "Maps the 4 competency pillars and explains STAR portfolio structure.",
                "coding": "Modifies and interprets skill-gap analysis dictionaries.",
                "sim": "Plans progressive skill upgrades that unlock intermediate milestones."
            },
            "advanced": {
                "concept": "Critiques institutional curriculum models and architects comprehensive 4-year portfolios.",
                "coding": "Builds automated portfolio audit tools with dynamic progress visualization.",
                "sim": "Achieves the Gold Researcher milestone with optimal point efficiency."
            }
        },
        "responsible_ai": "Academic Authenticity & Intellectual Honesty: When building portfolios, students must never claim AI-generated code as their own unassisted work. True engineering integrity involves transparently documenting where AI tools assisted and where human innovation took place.",
        "xp": 145,
        "badge": "Portfolio Architect",
        "next_mission": "Class 9 Chapter 5 Lesson 1: AI Research Room"
    },

    # -------------------------------------------------------------
    # CHAPTER 5: AI TOOLS
    # -------------------------------------------------------------
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 5,
        "ch_name": "AI Tools",
        "les_num": 1,
        "title": "AI Research Room",
        "pillar": "AI Tools",
        "strand": "Systematic AI-Assisted Research, Academic Search, Synthesis, and Verification",
        "prereqs": "Basic web browsing, understanding of search keywords and citations.",
        "prereq_details": "Familiarity with finding articles on the internet and citing school sources.",
        "key_terms": ["AI Search Engine", "Boolean Query", "Source Triangulation", "Syntopical Reading", "Hallucination Check", "Citation Integrity"],
        "objectives": [
            "Leverage AI research assistants effectively while avoiding passive copy-pasting.",
            "Formulate precise, multi-parameter search queries using Boolean operators and system prompts.",
            "Apply the Source Triangulation Framework to verify claims across peer-reviewed sources.",
            "Program an automated citation-checker that flags unverified URLs and hallucinated references."
        ],
        "mission_title": "Operation FactFinder: The Microplastics Investigation",
        "mission_desc": "Your school science journal is preparing an investigative report on microplastic contamination in local tap water. A popular AI chatbot claims: 'A 2024 Harvard study proved that 99.8% of school tap water contains toxic nano-polymers.' The claim sounds alarming. You must establish an AI Research Room workflow to verify this claim, locate the authentic primary literature, and synthesize a rigorous, fact-checked report.",
        "theory": """### 1. The Two Faces of AI Research Assistants
Modern AI tools (Perplexity, Elicit, Semantic Scholar, Claude) can accelerate literature reviews, but they also present serious pitfalls:
* **The Benefit:** High-speed semantic indexing, cross-lingual translation, mathematical summarization, and concept extraction.
* **The Pitfall:** LLMs are autoregressive next-token predictors, not databases of facts. When pressured for specific citations, they frequently fabricate non-existent journal titles, fake DOIs, and imaginary author lists with high confidence (**Hallucinations**).

### 2. The STOP Verification Protocol
When conducting academic research with AI:
* **S - Slow down:** Do not accept the first generated response as truth.
* **T - Trace the Source:** Demand direct primary source links and DOIs; never accept synthesized summaries without verification.
* **O - Origin Check:** Investigate the reputation, funding, and peer-review status of the cited publisher.
* **P - Pinpoint Triangulation:** Corroborate claims across at least three independent, reputable academic sources.

### 3. Prompting for Scholarly Precision
To extract high-quality analysis rather than generic fluff:
* Define your role and domain constraints.
* Request counter-evidence and alternative hypotheses.
* Forbid speculative claims and instruct the model to explicitly reply 'I do not have sufficient peer-reviewed data' if evidence is missing.""",
        "demo": """### Worked Prompt Architecture: Research Room Template
* **Weak Query:** *'Tell me about microplastics in drinking water.'*
  * *Result:* Generic 3-paragraph summary with unsubstantiated statistics.
* **Scholarly Structured Prompt:**
  ```text
  [ROLE]: Senior Environmental Toxicologist.
  [TASK]: Synthesize peer-reviewed findings on microplastic particles (<5mm) in municipal drinking water from 2020-2024.
  [CONSTRAINTS]: 
  - Cite only indexed journals (e.g. Nature, Environmental Science & Technology).
  - Explicitly distinguish between microplastics and nanoplastics.
  - State conflicting findings regarding human absorption rates.
  - If a quantitative figure is cited, provide the exact methodology used.
  - Do NOT generate speculative estimates.
  ```
  * *Result:* Rigorous, nuanced literature synthesis with traceable citations.""",
        "game": {
            "title": "Fact or Phantom: The Citations Tribunal",
            "scenario": "You are the Editor-in-Chief of a premier scientific journal. Contributors submit 5 research dossiers generated with AI assistance.",
            "objective": "Identify fabricated citations, cherry-picked statistics, and AI hallucinations before publication.",
            "tools": "DOI Lookup Engine, Author Index Verifier, Reverse Citation Search.",
            "roles": "Chief Science Auditor.",
            "decision_points": [
                "Verify whether cited authors actually exist and wrote the claimed paper.",
                "Distinguish between correlation and causation in summarized health claims.",
                "Reject dossiers containing non-existent DOIs."
            ],
            "rules": "Approving a hallucinated paper destroys journal credibility (-500 pts). Rejecting genuine research delays science (-100 pts).",
            "feedback": "Instant audit report highlights hallucinated reference strings in neon magenta.",
            "reflection": "Why does a plausible-sounding tone in AI text make human researchers dangerously susceptible to believing falsehoods?"
        },
        "coding": {
            "title": "Automated Research Dossier Citation Verifier in Python",
            "description": "Write a Python script that audits research text, validates DOI formatting, and verifies claims against a database of verified literature.",
            "code": '''import re

def verify_research_dossier(dossier_text, verified_database):
    """
    Parses research dossier for citations, checks DOI format validity,
    and cross-references citations against verified literature databases.
    """
    # Regex pattern for Digital Object Identifier (DOI) e.g., 10.1016/j.envsci.2023.01.002
    doi_pattern = r'10\\.\\d{4,9}/[-._;()/:A-Za-z0-9]+'
    found_dois = re.findall(doi_pattern, dossier_text)
    
    audit_results = []
    hallucination_flags = 0
    
    for doi in found_dois:
        if doi in verified_database:
            paper = verified_database[doi]
            audit_results.append({
                "doi": doi,
                "status": "VERIFIED",
                "title": paper["title"],
                "journal": paper["journal"]
            })
        else:
            hallucination_flags += 1
            audit_results.append({
                "doi": doi,
                "status": "UNVERIFIED_SUSPECTED_HALLUCINATION",
                "title": "UNKNOWN",
                "journal": "UNKNOWN"
            })
            
    return audit_results, hallucination_flags

# Verified Academic Database of Real Papers
peer_reviewed_db = {
    "10.1038/s41565-021-00987-w": {
        "title": "Microplastics in Global Freshwater Reservoirs",
        "journal": "Nature Nanotechnology"
    },
    "10.1021/acs.est.2c03841": {
        "title": "Quantification of Polyethylene Particles in Municipal Water",
        "journal": "Environmental Science & Technology"
    }
}

# Submitted AI-Generated Student Dossier
submission = """
Recent investigations (DOI: 10.1038/s41565-021-00987-w) demonstrated particulate 
detection in municipal reservoirs. Furthermore, a dramatic claim citing 99.8% 
contamination was reported in (DOI: 10.9999/fake.journal.hallucination.404). 
Finally, baseline filtration was analyzed in (DOI: 10.1021/acs.est.2c03841).
"""

results, flags = verify_research_dossier(submission, peer_reviewed_db)

print("=== RESEARCH CITATION AUDIT REPORT ===")
print(f"Total DOIs Identified : {len(results)}")
print(f"Suspected Hallucinations: {flags}\\n")
for r in results:
    print(f"DOI: {r['doi']:<38} | Status: {r['status']}")
    if r['status'] == "VERIFIED":
        print(f"  -> Title: {r['title']} ({r['journal']})")
''',
            "expected_output": """=== RESEARCH CITATION AUDIT REPORT ===
Total DOIs Identified : 3
Suspected Hallucinations: 1

DOI: 10.1038/s41565-021-00987-w            | Status: VERIFIED
  -> Title: Microplastics in Global Freshwater Reservoirs (Nature Nanotechnology)
DOI: 10.9999/fake.journal.hallucination.404 | Status: UNVERIFIED_SUSPECTED_HALLUCINATION
DOI: 10.1021/acs.est.2c03841               | Status: VERIFIED
  -> Title: Quantification of Polyethylene Particles in Municipal Water (Environmental Science & Technology)""",
            "explanation": "The script uses regular expressions to isolate academic DOIs from raw text and matches them against verified registers, exposing fabricated AI citations."
        },
        "questions": [
            {
                "q": "Why do Large Language Models (LLMs) hallucinate academic citations with plausible-sounding journal titles and real author names?",
                "options": [
                    "They are deliberately programmed to deceive humans.",
                    "They predict tokens based on statistical co-occurrence of words rather than querying an internal relational database of verified facts.",
                    "Their storage hard drives have bad sectors.",
                    "Because universities pay them to invent fake research."
                ],
                "answer": "B",
                "explanation": "LLMs generate text probabilistically based on pattern continuity; author names and journal formatting co-occur frequently, producing realistic-looking synthetic citations."
            },
            {
                "q": "What is 'Source Triangulation' in scientific research?",
                "options": [
                    "Using a triangular ruler to measure geometry papers.",
                    "Corroborating a factual claim across at least three independent, reputable, and methodologically diverse primary sources.",
                    "Asking three different chatbots the exact same prompt.",
                    "Printing three copies of a Wikipedia page."
                ],
                "answer": "B",
                "explanation": "Triangulation requires independent verification from diverse primary sources to eliminate single-source bias or error."
            },
            {
                "q": "Which search query uses Boolean operators most effectively to research solar panel efficiency without consumer sales ads?",
                "options": [
                    "buy cheap solar panels for my house",
                    "\"photovoltaic efficiency\" AND (\"perovskite\" OR \"silicon\") AND \"peer-reviewed\" -commercial -buy -sale",
                    "what is the best solar panel in the whole world please tell me",
                    "solar panels good or bad"
                ],
                "answer": "B",
                "explanation": "Option B uses exact phrase quotes, Boolean AND/OR logic, and negative exclusion operators (`-buy`, `-sale`) to isolate scholarly literature."
            },
            {
                "q": "When reviewing an AI summary of a medical paper, what must an ethical student researcher always verify first?",
                "options": [
                    "The font size of the text.",
                    "Whether the original study was conducted on humans, animals, or in vitro, and whether sample sizes were statistically significant.",
                    "The computer monitor refresh rate.",
                    "The number of emojis in the output."
                ],
                "answer": "B",
                "explanation": "AI summaries frequently omit critical experimental methodology details, confusing early animal trials with confirmed human clinical trials."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that chatbots can make mistakes and fake things.",
                "coding": "Can run the citation regex script with provided strings.",
                "sim": "Accepts plausible-sounding claims without checking source DOIs."
            },
            "proficient": {
                "concept": "Applies the STOP protocol, uses Boolean queries, and explains hallucination mechanics.",
                "coding": "Modifies regular expressions and builds verification lookup dictionaries.",
                "sim": "Catches obvious hallucinations and verifies primary sources."
            },
            "advanced": {
                "concept": "Designs end-to-end multi-modal research synthesis workflows with automated audit trails.",
                "coding": "Develops production-grade automated literature scrapers with DOI and ISSN cross-validation.",
                "sim": "Achieves perfect editorial accuracy across all submitted research dossiers."
            }
        },
        "responsible_ai": "Research Integrity & Epistemic Duty: Using AI to streamline research is encouraged, but uncritically citing hallucinated evidence in school or public reports corrupts human knowledge. Academic honesty demands that every citation cited has been personally read and validated.",
        "xp": 150,
        "badge": "Fact Detective",
        "next_mission": "Class 9 Chapter 5 Lesson 2: AI Creator Studio"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 5,
        "ch_name": "AI Tools",
        "les_num": 2,
        "title": "AI Creator Studio",
        "pillar": "AI Tools",
        "strand": "Multi-Modal Generative AI, Prompt Architecture, and Human-in-the-Loop Creative Workflows",
        "prereqs": "Class 9 Chapter 5 Lesson 1 (Prompt structuring and critical evaluation).",
        "prereq_details": "Understanding how text prompts guide AI generative models.",
        "key_terms": ["Diffusion Models", "Latent Space", "Negative Prompts", "Style Tokens", "Human-in-the-Loop", "Synthetic Media"],
        "objectives": [
            "Explain how Diffusion Models transform random Gaussian noise into coherent visual images via text guidance.",
            "Master structured prompt engineering for multi-modal generation (subject, lighting, composition, camera parameters, style tokens).",
            "Utilize Negative Prompting to constrain model output and eliminate generative artifacts.",
            "Establish a Human-in-the-Loop creative workflow combining AI speed with human curation and storytelling."
        ],
        "mission_title": "Project EcoNarrative: The Climate Awareness Visual Campaign",
        "mission_desc": "The United Nations Environment Programme is sponsoring a youth graphic novel campaign illustrating coastal communities adapting to rising sea levels. Your team must create a compelling 4-panel visual storyboard. Rather than settling for random, distorted images with mangled hands and surreal artifacts, you must configure a professional AI Creator Studio workflow with precise prompt parameters, consistent characters, and disciplined human editing.",
        "theory": """### 1. How Generative Image AI Operates: Diffusion Models
Unlike GANs (Generative Adversarial Networks) that pit two networks against each other, modern image generators (Stable Diffusion, Midjourney, DALL-E 3) use **Diffusion**:
1. **Forward Diffusion:** The algorithm progressively adds mathematical Gaussian noise to an image over hundreds of steps until it becomes pure static noise.
2. **Reverse Diffusion (Denoising):** A U-Net neural network learns to predict and subtract the added noise step-by-step, guided by text embeddings from a text encoder (CLIP / T5).
3. **Latent Space:** Diffusion operates inside a compressed mathematical representation (latent space), reducing computational load while preserving semantic meaning.

### 2. Anatomy of a Professional Multi-Modal Prompt
Amateur prompts produce generic, unpredictable images. Professional prompt architecture employs structured layers:
* **Core Subject:** Exact anatomical and action description (e.g., `A 15-year-old female marine biologist examining a bioluminescent coral colony`).
* **Environment & Staging:** Lighting conditions, atmospheric weather, depth of field (e.g., `Underwater marine research trench, cinematic volumetric god-rays filtering through deep ocean water, macro shallow depth of field`).
* **Artistic Medium / Camera:** Technical rendering specs (e.g., `National Geographic documentary photography, Hasselblad 50mm f/1.8 lens, 8k resolution, raw color grading`).
* **Negative Prompting:** Explicitly listing forbidden tokens to suppress unwanted artifacts (e.g., `blurry, extra fingers, cartoon, distorted anatomy, oversaturated, text watermark`).""",
        "demo": """### Worked Prompt Transformation
* **Basic Prompt:** *'Draw an underwater city.'*
  * *Result:* Generic fantasy castle submerged under blue water, blurry edges.
* **Structured Studio Prompt:**
  ```text
  [PROMPT]: An architectural cutaway of a geodesic ocean-floor research biodome anchored to a coral reef, 
  warm interior laboratory lights contrasting with deep navy ocean depths, schools of glassfish swimming 
  overhead, architectural concept art, photorealistic, 35mm cinematic lens, crisp micro-details, octane render.
  [NEGATIVE PROMPT]: cartoon, fantasy, ruined sunken ship, murky water, blur, low resolution, warped geometry.
  ```
  * *Result:* Coherent, believable, publication-ready architectural concept art.""",
        "game": {
            "title": "Prompt Sculptor: The Art Director's Gauntlet",
            "scenario": "You are Art Director for a graphic novel studio. Clients provide vague one-line briefs; you must engineer prompts that match target mood boards across 5 rounds.",
            "objective": "Achieve >=90% stylistic consistency and zero anatomical glitches across all 4 panels.",
            "tools": "Token Weight Adjuster, Seed Locker, Style Preset Library, Negative Filter Deck.",
            "roles": "Lead Prompt Engineer & Art Director.",
            "decision_points": [
                "Adjust token weights (e.g. `(bioluminescent:1.3)`) to emphasize focal elements.",
                "Lock the random seed integer to maintain character facial consistency across panels.",
                "Diagnose and eliminate common generative artifacts (mutated hands, text gibberish)."
            ],
            "rules": "Each visual artifact (e.g. 6 fingers) reduces panel quality score by 25 points. Consistency across panels yields 100 bonus pts.",
            "feedback": "Visual critic inspects image vectors and outputs cosine similarity score against target mood board.",
            "reflection": "Why does true creative mastery with AI require deep knowledge of lighting, art history, and camera optics rather than just button clicking?"
        },
        "coding": {
            "title": "Multi-Modal Prompt Compiler and Token Weight Optimizer in Python",
            "description": "Write a Python script that ingests creative parameters and compiles a structured prompt payload with automated negative filters and token weighting.",
            "code": '''def compile_creative_prompt(subject, setting, style, camera, negative_exclusions):
    """
    Compiles structured multi-modal prompt payloads with standardized syntax,
    token weighting, and defensive negative exclusions.
    """
    # Core prompt construction
    prompt_components = [
        subject.strip(),
        f"set in {setting.strip()}",
        f"rendered in {style.strip()} style",
        f"captured with {camera.strip()}",
        "hyper-detailed, award-winning composition, 8k"
    ]
    
    full_positive_prompt = ", ".join(prompt_components)
    
    # Universal studio baseline negative prompt
    baseline_negatives = [
        "deformed anatomy", "extra limbs", "fused fingers", "mutated hands",
        "blurry", "watermark", "signature", "jpeg artifacts", "oversaturated"
    ]
    
    # Merge custom exclusions
    combined_negatives = list(set(baseline_negatives + [x.strip() for x in negative_exclusions if x.strip()]))
    full_negative_prompt = ", ".join(combined_negatives)
    
    return {
        "positive_prompt": full_positive_prompt,
        "negative_prompt": full_negative_prompt,
        "token_count_approx": len(full_positive_prompt.split()),
        "generation_params": {
            "steps": 30,
            "cfg_scale": 7.5,
            "sampler": "Euler_a"
        }
    }

# Client Request: Coastal Climate Storyboard Panel 1
payload = compile_creative_prompt(
    subject="A teenage climatologist installing a solar wave sensor on a tidal seawall",
    setting="rugged Pacific Northwest coastline during a foggy sunrise",
    style="cinematic graphic novel illustration",
    camera="wide angle 24mm lens, soft morning backlighting",
    negative_exclusions=["sunny blue sky", "anime", "modern skyscrapers"]
)

print("=== AI CREATOR STUDIO PROMPT PAYLOAD ===")
print(f"POSITIVE PROMPT :\\n{payload['positive_prompt']}\\n")
print(f"NEGATIVE PROMPT :\\n{payload['negative_prompt']}\\n")
print(f"Estimated Tokens: {payload['token_count_approx']}")
print(f"CFG Guidance    : {payload['generation_params']['cfg_scale']}")
''',
            "expected_output": """=== AI CREATOR STUDIO PROMPT PAYLOAD ===
POSITIVE PROMPT :
A teenage climatologist installing a solar wave sensor on a tidal seawall, set in rugged Pacific Northwest coastline during a foggy sunrise, rendered in cinematic graphic novel illustration style, captured with wide angle 24mm lens, soft morning backlighting, hyper-detailed, award-winning composition, 8k

NEGATIVE PROMPT :
mutated hands, anime, sunny blue sky, extra limbs, watermark, modern skyscrapers, deformed anatomy, signature, fused fingers, blurry, jpeg artifacts, oversaturated

Estimated Tokens: 42
CFG Guidance    : 7.5""",
            "explanation": "The script compiles standardized prompt strings, injects defensive anatomical safeguards into the negative prompt, and calculates execution parameters for generative diffusion engines."
        },
        "questions": [
            {
                "q": "What is the fundamental mathematical mechanism of modern Latent Diffusion Models (LDMs)?",
                "options": [
                    "They paste together chopped-up Google image search thumbnails.",
                    "They progressively remove learned mathematical Gaussian noise from a latent tensor space, guided by text embeddings.",
                    "They convert text into MIDI audio and graph the sound waves.",
                    "They store all existing photos on Earth in a massive secret zip file."
                ],
                "answer": "B",
                "explanation": "Diffusion models generate novel imagery through reverse denoising over a latent space guided by cross-attention text embeddings."
            },
            {
                "q": "What is the primary function of a 'Negative Prompt' in an image generation engine?",
                "options": [
                    "To insult the AI until it works faster.",
                    "To specify unwanted attributes, artifacts, or styles that the diffusion model should actively steer away from during denoising.",
                    "To generate black-and-white photo negatives.",
                    "To delete the output image after creation."
                ],
                "answer": "B",
                "explanation": "Negative prompts mathematically penalize specific semantic directions in latent space, suppressing undesirable artifacts like deformed hands or watermarks."
            },
            {
                "q": "Why is 'Human-in-the-Loop' (HITL) essential for high-quality creative work produced with generative AI?",
                "options": [
                    "Because computers cannot turn on without human physical contact.",
                    "Because AI lacks genuine intentionality, emotional empathy, cultural nuance, and editorial judgment, requiring human direction and refinement.",
                    "Because AI images are always copyrighted by computers.",
                    "Because AI models refuse to generate images unless a human is watching."
                ],
                "answer": "B",
                "explanation": "AI models generate statistical variations, but discerning narrative consistency, thematic resonance, and ethical suitability requires human taste and curation."
            },
            {
                "q": "What happens if you set the Classifier-Free Guidance (CFG) scale parameter excessively high (e.g. CFG = 25)?",
                "options": [
                    "The computer creates an authentic painting by Rembrandt.",
                    "The model over-constrains the latent vectors, resulting in severe image burning, harsh oversaturated colors, and distorted artifacts.",
                    "The generation completes in 0.001 seconds.",
                    "The model generates text documents instead of pictures."
                ],
                "answer": "B",
                "explanation": "Overly high CFG forces the model to aggressively obey every prompt token at the expense of natural image manifolds, causing severe visual artifacts and color distortion."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that typing text makes the computer draw pictures.",
                "coding": "Changes subject words in the Python prompt generator.",
                "sim": "Accepts distorted hands and blurry images without attempting prompt tuning."
            },
            "proficient": {
                "concept": "Explains diffusion denoising, latent space, negative prompts, and CFG scales.",
                "coding": "Constructs structured prompt payloads with automated negative filtering.",
                "sim": "Maintains character and style consistency across multiple panels."
            },
            "advanced": {
                "concept": "Analyzes cross-attention mechanisms, CLIP embeddings, and IP copyright implications.",
                "coding": "Develops programmatic seed-locking and token-weight optimization pipelines.",
                "sim": "Achieves professional studio-grade visual storyboards with zero anatomical defects."
            }
        },
        "responsible_ai": "Copyright, Attribution, and Artist Livelihoods: Generative image models are trained on billions of human artworks, often without explicit consent. Ethical creators never impersonate living independent artists using specific `in the style of [Artist Name]` tokens, and transparently credit AI assistance.",
        "xp": 155,
        "badge": "Studio Visionary",
        "next_mission": "Class 9 Chapter 6 Lesson 1: Think Before You Believe"
    },

    # -------------------------------------------------------------
    # CHAPTER 6: RESPONSIBLE AI
    # -------------------------------------------------------------
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 6,
        "ch_name": "Responsible AI",
        "les_num": 1,
        "title": "Think Before You Believe",
        "pillar": "Responsible AI",
        "strand": "AI Hallucinations, Deepfakes, Misinformation Vectors, and Critical Verification",
        "prereqs": "Class 9 Chapter 5 Lessons 1 & 2.",
        "prereq_details": "Understanding of how AI generates text and images probabilistically.",
        "key_terms": ["AI Hallucination", "Deepfake", "Synthetic Disinformation", "Confirmation Bias", "SRA Verification Framework", "Digital Provenance"],
        "objectives": [
            "Deconstruct why generative AI models hallucinate plausible-sounding falsehoods.",
            "Analyze the socio-technical architecture of synthetic deepfakes (voice cloning, face swaps).",
            "Examine cognitive vulnerabilities (confirmation bias, emotional outrage) exploited by synthetic disinformation.",
            "Implement a forensic verification pipeline in Python to analyze metadata and text consistency."
        ],
        "mission_title": "Operation DeepShield: The Viral Election Audio Probe",
        "mission_desc": "Forty-eight hours before the high-school student council elections, an audio recording goes viral on school messaging groups. The voice sounds identical to the leading candidate, seemingly confessing to tampering with test papers. The student body is in uproar. You are appointed Student Ombudsperson to perform a digital forensic audit: Is this authentic audio, or a synthetic AI voice clone engineered to rig the election?",
        "theory": """### 1. The Anatomy of AI Hallucinations
Generative Language Models (LLMs) do not possess a conscious model of truth. They are trained on next-token prediction:
$$P(w_t \\mid w_1, w_2, \\dots, w_{t-1})$$
* If an answer sounds grammatically elegant and semantically confident, humans tend to trust it (**Automation Bias**).
* However, when an LLM lacks factual training data on a niche topic, it does not stop; it predicts the most statistically probable continuation of words, fabricating plausible-sounding falsehoods (**Hallucinations**).

### 2. Deepfakes: Synthetic Audio and Video Manipulation
A **Deepfake** is synthetic media generated through deep neural networks:
* **Voice Cloning:** As little as 3 seconds of reference audio allows a diffusion or autoregressive audio model to extract an acoustic timbre embedding and synthesize arbitrary speech with matching pitch, inflection, and accent.
* **Face Swapping / Lip Sync:** Latent diffusion and autoencoders align source facial landmarks onto target video frames.

### 3. Forensic Indicators of Synthetic Media
While improving rapidly, synthetic media exhibits physical and acoustic telltale anomalies:
* **Audio:** Unnatural respiratory breathing rhythms, lack of ambient room reverberation, robotic micro-glitches during consonant plosives ($p, b, t$).
* **Video:** Inconsistent specular eye reflections (catchlights), unnatural blinking rates, hair and ear boundary blurring, lighting angle mismatches.""",
        "demo": """### Worked Forensic Walkthrough: Audio Spectral Inspection
Authentic human speech displays natural ambient background noise floors and irregular breathing gaps.
* **Recording A:** Background room tone $= -42\\text{dB}$, breathing intake pause every $4.2\\text{s}$, natural frequency decay above $8\\text{kHz}$. $\\implies$ Consistent with physical microphone acoustic recording.
* **Recording B:** Background floor $= -\\infty$ (dead digital silence during pauses), speech cuts abruptly without breath intakes, unnatural spectral cutoff at exactly $4\\text{kHz}$ (compression artifact of free AI voice-cloning APIs). $\\implies$ High probability of synthetic clone!""",
        "game": {
            "title": "Deepfake Detective: The Forensic Lab",
            "scenario": "Review 6 viral media clips (3 synthetic, 3 authentic) under a ticking clock during a breaking news crisis.",
            "objective": "Classify authentic vs synthetic media with zero false accusations.",
            "tools": "Audio Frequency Spectrogram, Eye Specular Reflection Zoom, Error Level Analysis (ELA).",
            "roles": "Chief Digital Forensic Analyst.",
            "decision_points": [
                "Examine corneal reflections in viral video frames to verify whether light sources match the room.",
                "Listen to voice track pauses to detect missing respiratory acoustic signatures.",
                "Audit cryptographic digital provenance (C2PA metadata seals)."
            ],
            "rules": "Falsely labeling real news as fake destroys credibility (-300 pts). Letting a deepfake slip unflagged causes panic (-500 pts).",
            "feedback": "Spectrogram highlights synthetic frequency artifacts in vivid heatmaps.",
            "reflection": "Why is the spread of deepfakes dangerous not just for spreading lies, but for making people disbelieve real truth ('The Liar's Dividend')?"
        },
        "coding": {
            "title": "Synthetic Audio Anomaly and Metadata Auditor in Python",
            "description": "Develop a Python forensic verification script that audits audio telemetry metadata and checks for synthetic signatures.",
            "code": '''def forensic_audit_audio_telemetry(audio_metadata):
    """
    Audits audio clip technical properties for synthetic cloning signatures:
    - Zero noise-floor during pauses
    - Missing breath events
    - Synthetic sample rate mismatches
    """
    risk_score = 0
    anomalies_detected = []
    
    # Check 1: Background Noise Floor (True acoustic mics always capture ambient room tone)
    if audio_metadata["noise_floor_db"] < -70:
        risk_score += 40
        anomalies_detected.append("[ANOMALY]: Unnaturally dead digital silence during pauses (< -70dB).")
        
    # Check 2: Respiratory Breath Signatures
    if audio_metadata["breath_events_per_minute"] < 4:
        risk_score += 35
        anomalies_detected.append("[ANOMALY]: Missing natural human respiratory intake pauses.")
        
    # Check 3: Spectral Cutoff (Many consumer cloning APIs compress at 16kHz or 22kHz)
    if audio_metadata["frequency_cutoff_khz"] in [16, 22.05]:
        risk_score += 25
        anomalies_detected.append(f"[ANOMALY]: Artificial frequency ceiling at {audio_metadata['frequency_cutoff_khz']}kHz.")
        
    # Evaluate final risk
    if risk_score >= 60:
        verdict = "HIGH_PROBABILITY_SYNTHETIC_DEEPFAKE"
    elif risk_score >= 30:
        verdict = "SUSPICIOUS_REQUIRES_SPECTRAL_LAB"
    else:
        verdict = "CONSISTENT_WITH_AUTHENTIC_RECORDING"
        
    return {
        "clip_id": audio_metadata["id"],
        "composite_risk_score": risk_score,
        "verdict": verdict,
        "anomalies": anomalies_detected
    }

# Forensic Telemetry of the Viral School Council Audio Clip
viral_clip = {
    "id": "VIRAL_LEAK_01.WAV",
    "noise_floor_db": -85,            # Unnaturally sterile
    "breath_events_per_minute": 1,     # Speaker talks for 60s without taking a breath
    "frequency_cutoff_khz": 16,        # Standard consumer web-API voice cloner ceiling
    "duration_seconds": 45
}

audit_report = forensic_audit_audio_telemetry(viral_clip)

print("=== DIGITAL FORENSIC AUDIT REPORT ===")
print(f"File Audited     : {audit_report['clip_id']}")
print(f"Risk Score       : {audit_report['composite_risk_score']} / 100")
print(f"Forensic Verdict : {audit_report['verdict']}\\n")
print("Identified Forensic Indicators:")
for item in audit_report["anomalies"]:
    print(f"  {item}")
''',
            "expected_output": """=== DIGITAL FORENSIC AUDIT REPORT ===
File Audited     : VIRAL_LEAK_01.WAV
Risk Score       : 100 / 100
Forensic Verdict : HIGH_PROBABILITY_SYNTHETIC_DEEPFAKE

Identified Forensic Indicators:
  [ANOMALY]: Unnaturally dead digital silence during pauses (< -70dB).
  [ANOMALY]: Missing natural human respiratory intake pauses.
  [ANOMALY]: Artificial frequency ceiling at 16kHz.""",
            "explanation": "The script demonstrates forensic heuristics used by digital investigators. By analyzing room tone acoustics, respiratory biology, and API compression ceilings, it detects synthetic audio manipulation."
        },
        "questions": [
            {
                "q": "What is the 'Liar's Dividend' phenomenon in the age of generative AI?",
                "options": [
                    "A cash prize paid to computer hackers.",
                    "A dangerous situation where corrupt individuals caught on real, authentic recording can falsely claim 'That's an AI deepfake!', evading accountability.",
                    "The cost of running an AI chatbot.",
                    "An interest rate charged by digital banks."
                ],
                "answer": "B",
                "explanation": "The Liar's Dividend occurs when the mere existence of deepfakes allows guilty actors to dismiss genuine, incriminating evidence as fake."
            },
            {
                "q": "Why do humans frequently fall victim to AI-generated misinformation even when the facts are easily disproven?",
                "options": [
                    "Because humans are incapable of reading.",
                    "Because Confirmation Bias leads people to eagerly believe and share content that confirms their existing prejudices or triggers emotional outrage.",
                    "Because AI signals travel directly into human brainwaves.",
                    "Because smartphones delete true news automatically."
                ],
                "answer": "B",
                "explanation": "Psychological confirmation bias and emotional resonance often override critical skepticism, causing users to share plausible-sounding falsehoods without checking."
            },
            {
                "q": "What is C2PA (Coalition for Content Provenance and Authenticity)?",
                "options": [
                    "A video game championship for teenagers.",
                    "An open technical standard that embeds cryptographically signed digital metadata into media at the moment of capture, proving provenance and edit history.",
                    "A computer virus that deletes digital photos.",
                    "A law banning cameras."
                ],
                "answer": "B",
                "explanation": "C2PA provides tamper-evident cryptographic metadata (Content Credentials) proving who created an image and what edits were made."
            },
            {
                "q": "Which physical artifact is a common telltale sign of an AI-generated portrait?",
                "options": [
                    "The person is wearing clothing.",
                    "Inconsistent corneal light reflections (catchlights) in the eyes, asymmetric earrings, and teeth blending into gums.",
                    "The background is in color.",
                    "The person has two ears."
                ],
                "answer": "B",
                "explanation": "AI models often fail to maintain precise geometric symmetry across paired accessories, corneal specular highlights, and dental boundaries."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that AI can clone voices and make fake videos.",
                "coding": "Can run the forensic script and read the final verdict.",
                "sim": "Struggles to spot subtle acoustic or visual artifacts."
            },
            "proficient": {
                "concept": "Explains hallucination token prediction, voice cloning mechanics, and confirmation bias.",
                "coding": "Modifies acoustic thresholds and evaluates multi-indicator risk matrices.",
                "sim": "Accurately identifies deepfakes using spectrogram and reflection analysis."
            },
            "advanced": {
                "concept": "Critiques the Liar's Dividend, cryptographic provenance standards (C2PA), and epistemic security.",
                "coding": "Develops multi-layer forensic detection suites with statistical confidence intervals.",
                "sim": "Achieves 100% forensic classification accuracy under breaking-news constraints."
            }
        },
        "responsible_ai": "Epistemic Security & Civic Responsibility: Spreading unverified media—especially during elections or crises—damages the social fabric. Before hitting 'share', citizens have a moral duty to verify provenance, check primary sources, and avoid weaponizing synthetic content.",
        "xp": 160,
        "badge": "Forensic Arbiter",
        "next_mission": "Class 9 Chapter 6 Lesson 2: Digital Footprints & AI"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 6,
        "ch_name": "Responsible AI",
        "les_num": 2,
        "title": "Digital Footprints & AI",
        "pillar": "Responsible AI",
        "strand": "Algorithmic Profiling, Data Harvesting, Behavioral Ad Targeting, and Privacy Hygiene",
        "prereqs": "Class 9 Chapter 6 Lesson 1.",
        "prereq_details": "Understanding of how data fuels machine learning models.",
        "key_terms": ["Digital Footprint", "Passive vs Active Footprint", "Algorithmic Profiling", "Data Brokers", "Behavioral Ad Targeting", "Data Minimization"],
        "objectives": [
            "Distinguish between Active digital footprints (deliberate posts) and Passive digital footprints (telemetry, clickstreams, sensor logs).",
            "Analyze how AI recommender engines synthesize micro-behaviors into psychographic user profiles.",
            "Examine the business architecture of Data Brokers and predictive behavioral targeting.",
            "Implement automated privacy hygiene workflows and programmatic data sanitization in Python."
        ],
        "mission_title": "Project ShadowAudit: The Invisible Profiling Experiment",
        "mission_desc": "Over a single school week, you install a diagnostic network monitoring tool on your personal mobile device. You discover that 42 background advertising trackers recorded your precise GPS coordinates, screen dwell-time on social media posts, battery levels, and Wi-Fi networks—building an algorithmic shadow profile that predicts your mood and purchasing impulses. Your mission is to audit this shadow profile, quantify your digital footprint risk, and deploy protective privacy defenses.",
        "theory": """### 1. The Anatomy of a Digital Footprint
Every interaction with modern digital platforms leaves an indelible record:
* **Active Footprint:** Intentional data you submit (photos uploaded, messages sent, survey forms completed).
* **Passive Footprint:** Ambient telemetry harvested silently in the background (mouse scroll speeds, screen touch coordinates, battery status, accelerometer micro-movements, IP geolocation).

### 2. Algorithmic Profiling and Psychometrics
To an AI advertising system, you are not a human name; you are a multi-dimensional vector in a latent feature space:
$$\\vec{u} = [\\text{sleep\\_pattern}, \\text{stress\\_index}, \\text{impulse\\_score}, \\text{political\\_affinity}, \\dots]$$
Machine learning models (collaborative filtering, neural recommenders) process these passive vectors to predict:
* **Dwell Time:** Exactly how many milliseconds you pause on a controversial post.
* **Emotional State:** When your typing speed and late-night scrolling indicate loneliness or stress, triggering targeted impulse shopping ads.

### 3. The Principle of Data Minimization
Under privacy frameworks (GDPR, DPDP Act), **Data Minimization** mandates that organizations should only collect the absolute minimum data necessary to perform the specific function requested by the user, and delete it immediately thereafter.""",
        "demo": """### Worked Mathematical Model: Tracking Dwell-Time Probability
Suppose a social media feed monitors screen pause time ($t$ in seconds) on an advertisement.
The algorithm calculates purchase probability via a logistic sigmoid function:
$$P(\\text{Click}) = \\frac{1}{1 + e^{-(0.8 t - 3.2)}}$$
* If you scroll quickly past ($t = 1.0\\text{s}$):
  $$z = 0.8(1.0) - 3.2 = -2.4 \\implies P = \\frac{1}{1 + e^{2.4}} = \\frac{1}{1 + 11.02} \\approx 0.083 \\text{ (8.3\\%)}$$
* If you pause and linger ($t = 6.0\\text{s}$):
  $$z = 0.8(6.0) - 3.2 = +1.6 \\implies P = \\frac{1}{1 + e^{-1.6}} = \\frac{1}{1 + 0.20} \\approx 0.833 \\text{ (83.3\\%)}$$
The 5-second pause updates your user embedding, immediately populating your feed with similar ads.""",
        "game": {
            "title": "Privacy Sentinel: Evading the Shadow Broker",
            "scenario": "Navigate a typical online day (browsing, shopping, gaming, chatting) while an AI Shadow Broker attempts to reconstruct your identity.",
            "objective": "Complete daily tasks while keeping your Algorithmic Identification Risk below 20%.",
            "tools": "Tracker Blocker, VPN Shield, Cookie Sanitizer, Pseudonym Generator.",
            "roles": "Privacy Defense Specialist.",
            "decision_points": [
                "Decline invasive app permissions (e.g. flashlight app requesting Contacts and GPS).",
                "Sanitize tracking parameters (`?utm_source=...`) from shared URLs.",
                "Replace centralized third-party logins with isolated disposable aliases."
            ],
            "rules": "Each leaked tracking vector increases broker profile accuracy. Hitting 100% deanonymization causes identity compromise.",
            "feedback": "Live radar shows corporate tracking nodes capturing data packets in real time.",
            "reflection": "Why is 'I have nothing to hide' a flawed response to mass algorithmic data harvesting?"
        },
        "coding": {
            "title": "Automated URL Tracking Sanitizer and Footprint Risk Evaluator in Python",
            "description": "Write a Python utility that strips surveillance tracking tokens from URLs and audits passive tracking permissions in mobile apps.",
            "code": '''import urllib.parse

def sanitize_tracking_url(raw_url):
    """
    Strips surveillance parameters (UTM tags, click IDs, Facebook tracking tags)
    from shared URLs to prevent cross-site identity linkage.
    """
    parsed = urllib.parse.urlparse(raw_url)
    query_params = urllib.parse.parse_qs(parsed.query)
    
    # Common surveillance tracking keys
    invasive_trackers = {
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'fbclid', 'gclid', 'msclkid', 'mc_eid', 'igshid', '_hsenc'
    }
    
    cleaned_params = {k: v for k, v in query_params.items() if k.lower() not in invasive_trackers}
    
    # Reconstruct query string
    clean_query = urllib.parse.urlencode(cleaned_params, doseq=True)
    sanitized = urllib.parse.urlunparse((
        parsed.scheme, parsed.netloc, parsed.path,
        parsed.params, clean_query, parsed.fragment
    ))
    
    removed_count = len(query_params) - len(cleaned_params)
    return sanitized, removed_count

def audit_app_permissions(app_name, permissions):
    """Evaluates privacy risk of requested mobile application permissions."""
    high_risk_keys = {"ACCESS_FINE_LOCATION", "READ_CONTACTS", "RECORD_AUDIO", "READ_SMS"}
    flagged = [p for p in permissions if p in high_risk_keys]
    
    risk_level = "CRITICAL" if len(flagged) >= 2 else ("MEDIUM" if flagged else "LOW")
    return {
        "app": app_name,
        "flagged_permissions": flagged,
        "risk_level": risk_level
    }

# 1. Test URL Sanitization
tracking_url = "https://shop.example.com/item/42?utm_source=instagram&fbclid=IwAR234908sdfa&ref=holiday_sale"
clean_url, stripped = sanitize_tracking_url(tracking_url)

print("=== URL SURVEILLANCE SANITIZER ===")
print(f"Original URL : {tracking_url}")
print(f"Sanitized URL: {clean_url}")
print(f"Trackers Stripped: {stripped}\\n")

# 2. Test Mobile App Permission Audit
app_report = audit_app_permissions("FlashlightPro_Calculator", [
    "INTERNET", "ACCESS_FINE_LOCATION", "READ_CONTACTS", "CAMERA"
])

print("=== APP PRIVACY RISK AUDIT ===")
print(f"Application Name: {app_report['app']}")
print(f"Privacy Risk    : {app_report['risk_level']}")
print(f"Flagged Invasions: {app_report['flagged_permissions']}")
''',
            "expected_output": """=== URL SURVEILLANCE SANITIZER ===
Original URL : https://shop.example.com/item/42?utm_source=instagram&fbclid=IwAR234908sdfa&ref=holiday_sale
Sanitized URL: https://shop.example.com/item/42?ref=holiday_sale
Trackers Stripped: 2

=== APP PRIVACY RISK AUDIT ===
Application Name: FlashlightPro_Calculator
Privacy Risk    : CRITICAL
Flagged Invasions: ['ACCESS_FINE_LOCATION', 'READ_CONTACTS']""",
            "explanation": "The script demonstrates proactive privacy hygiene. It strips surveillance parameters from URLs and detects suspiciously excessive mobile app permissions."
        },
        "questions": [
            {
                "q": "What is the key difference between an Active Digital Footprint and a Passive Digital Footprint?",
                "options": [
                    "Active footprints only happen when running, passive footprints happen when sitting.",
                    "Active footprints consist of intentional posts and uploads, while passive footprints are collected silently without explicit user awareness (clickstreams, sensor logs, IP addresses).",
                    "Passive footprints are always encrypted with military passwords.",
                    "Active footprints cannot be seen by search engines."
                ],
                "answer": "B",
                "explanation": "Active footprints are deliberately created by the user, whereas passive footprints are harvested silently in the background."
            },
            {
                "q": "Why is the common argument 'I have nothing to hide, so privacy does not matter to me' considered flawed in the era of AI profiling?",
                "options": [
                    "Because privacy only matters to international spies.",
                    "Because algorithmic profiling uses aggregated behavioral data to manipulate purchasing habits, predict insurance risks, influence voting, and reinforce discriminatory biases regardless of personal guilt.",
                    "Because computers cannot understand private thoughts.",
                    "Because everyone has broken the law at least once."
                ],
                "answer": "B",
                "explanation": "Privacy is about autonomy and protection from non-transparent predictive manipulation, not merely concealing wrongdoing."
            },
            {
                "q": "What does the principle of 'Data Minimization' require of software developers?",
                "options": [
                    "Writing code in the smallest possible font size.",
                    "Collecting only the strictly necessary data points required to deliver a service and deleting them when no longer required.",
                    "Storing all company data on a single USB thumb drive.",
                    "Deleting the entire database every evening at midnight."
                ],
                "answer": "B",
                "explanation": "Data minimization is a core privacy principle mandating that organizations limit data collection to what is strictly necessary."
            },
            {
                "q": "How do Data Brokers create unified psychographic profiles of internet users across multiple unrelated websites?",
                "options": [
                    "By guessing random passwords.",
                    "By stitching together cross-site cookies, mobile advertising IDs (IDFA/GAID), IP subnets, and browser fingerprints into persistent identity graphs.",
                    "By reading physical paper letters delivered by postal workers.",
                    "By sending secret emails to school principals."
                ],
                "answer": "B",
                "explanation": "Data brokers aggregate tracking tokens, device fingerprinting, and advertising identifiers across diverse platforms to link fragmented digital behaviors."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that websites track what you click on.",
                "coding": "Can run the URL sanitizer script.",
                "sim": "Accepts default app permissions without checking risk."
            },
            "proficient": {
                "concept": "Explains active vs passive footprints, psychographic profiling, and data minimization.",
                "coding": "Modifies regex and query parsing logic to strip custom trackers.",
                "sim": "Configures privacy tools to maintain profile risk below 20%."
            },
            "advanced": {
                "concept": "Critiques surveillance capitalism architectures and formulates technical defense protocols.",
                "coding": "Builds robust, automated privacy proxies and permission audit engines.",
                "sim": "Achieves 100% mission completion with near-zero digital footprint leakage."
            }
        },
        "responsible_ai": "Digital Self-Determination & Human Autonomy: Human beings are not mere behavioral datasets to be monetized. Practicing privacy hygiene and advocating for strong data protection laws protects democratic freedom and personal autonomy in the AI era.",
        "xp": 175,
        "badge": "Digital Sovereign",
        "next_mission": "Class 9 Completed! Unlocks: Class 10 Chapter 1 Lesson 1 ('How AI Thinks with Data')"
    }
]

CLASS_9_LESSONS.extend(CH3_TO_CH6_LESSONS)
print(f"Total Class 9 Lessons compiled: {len(CLASS_9_LESSONS)}")

# Write all Class 9 lessons
import os
from generator_core import write_lesson_file

OUT_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 9"

for les in CLASS_9_LESSONS:
    write_lesson_file(OUT_DIR, les)

print("All 12 Class 9 lessons successfully generated!")
