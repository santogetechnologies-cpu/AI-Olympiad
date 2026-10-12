"""
Class 9 Curriculum Generator - Chapters 2 to 6
Adds complete lessons 3 to 12 for Class 9.
"""

from build_class9_c1 import CLASS_9_LESSONS

# Chapter 2: Communicate with AI
CH2_LESSONS = [
    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 2,
        "ch_name": "Communicate with AI",
        "les_num": 1,
        "title": "Python in Action",
        "pillar": "Communicate with AI",
        "strand": "Programming Foundations, Data Structures, and Algorithmic Communication",
        "prereqs": "Basic keyboarding, understanding of mathematical variables and Cartesian coordinates.",
        "prereq_details": "Students should understand what a variable represents in algebra ($x = 5$).",
        "key_terms": ["Variable Binding", "Dynamic Typing", "List Comprehension", "Dictionary Lookup", "Algorithmic Complexity"],
        "objectives": [
            "Translate logical problem formulations into structured Python data structures (lists, tuples, dicts).",
            "Write modular functions that ingest telemetry data and emit parsed status vectors.",
            "Utilize list comprehensions and dictionary lookups for high-speed algorithmic preprocessing.",
            "Debug common semantic and syntax errors in Python control loops."
        ],
        "mission_title": "Project ScoreGrid: The Inter-School Robotics Telemetry Engine",
        "mission_desc": "During the National Robotics Olympiad, 24 autonomous rovers transmit real-time telemetry (robot ID, battery voltage, motor RPM, infrared distance, and arena score) as comma-separated text strings. The judges' manual spreadsheet crashes constantly under load. You are tasked with engineering a high-throughput Python telemetry parser that digests raw sensor streams, validates packet integrity, and produces live leaderboard intelligence.",
        "theory": """### 1. Python: The Lingua Franca of Artificial Intelligence
Python dominates AI research and production because of its clean syntactic expressiveness, vast ecosystem (NumPy, PyTorch, Scikit-learn), and seamless support for data structures that map directly to mathematical vectors and tensors.

### 2. Core Data Structures for AI Data Pipelines
1. **Lists (Ordered, Mutable Sequences):** Ideal for sequential data, time-series measurements, and sliding windows.
   ```python
   temperatures = [21.5, 22.0, 21.8, 23.1]
   ```
2. **Dictionaries (Key-Value Hash Maps):** Ideal for labeled feature records, configuration payloads, and metadata lookups ($O(1)$ average time complexity).
   ```python
   rover_packet = {"id": "ROVER_04", "battery": 11.8, "status": "ACTIVE"}
   ```
3. **List Comprehensions:** Concise functional syntax for mathematical vector transformations.
   ```python
   normalized = [x / 100.0 for x in raw_scores]
   ```

### 3. Procedural Abstraction & Defensive Programming
In AI systems, software failure in production can cause physical harm or silent mathematical corruption. Writing production-grade code requires:
* Explicit type casting and boundary checks.
* Pure functions with predictable inputs and outputs.
* Graceful handling of null/corrupted network packets.""",
        "demo": """### Worked Walkthrough: Transforming Raw Telemetry into Ranked Leaderboards
Suppose 3 raw string packets arrive over radio:
`packets = ["R1:84:11.2", "R2:92:12.4", "R3:78:10.1"]` (Format: `ID:Score:Voltage`).

```python
# Parsing and filtering using dictionary comprehension
parsed = []
for p in packets:
    parts = p.split(":")
    parsed.append({
        "id": parts[0],
        "score": int(parts[1]),
        "voltage": float(parts[2])
    })

# Sort descending by score
ranked = sorted(parsed, key=lambda x: x["score"], reverse=True)
print("Winner:", ranked[0]["id"], "with score", ranked[0]["score"])
# Output: Winner: R2 with score 92
```""",
        "game": {
            "title": "Syntax Sprint: The Rover Packet Relay",
            "scenario": "Live radio interference is corrupting incoming packets from exploration rovers on an alien terrain grid. You must write and patch Python parsing blocks under a 60-second timer.",
            "objective": "Filter corrupted packets, extract coordinates, and navigate rovers around geothermal fissures.",
            "tools": "Interactive Python Shell, Packet Sniffer, Fissure Radar Grid.",
            "roles": "Mission Communications Lead.",
            "decision_points": [
                "Implement regex or string splitting to isolate damaged packet headers.",
                "Choose dictionary lookups vs linear list searches to maintain <10ms latency.",
                "Discard packets with voltage < 10.5V to prevent rover bricking."
            ],
            "rules": "Each parsed packet grants 50 exploration credits; each unhandled runtime crash costs 150 credits.",
            "feedback": "Terminal output displays real-time execution flame graphs and packet throughput metrics.",
            "reflection": "Why does algorithmic efficiency in data structures matter when scaling to millions of live sensor nodes?"
        },
        "coding": {
            "title": "High-Throughput Telemetry Parser & Anomaly Flagging Engine",
            "description": "Write a modular Python script that parses raw string packets, converts features into structured dictionaries, computes statistics, and flags low-battery anomalies.",
            "code": '''def parse_telemetry_stream(raw_stream):
    """
    Parses messy radio telemetry packets formatted as 'ROVER_ID|SCORE|BATTERY_VOLTS'.
    Returns structured list of dictionaries and an anomaly alert log.
    """
    clean_records = []
    alerts = []
    
    for packet in raw_stream:
        # Sanitize whitespace
        token = str(packet).strip()
        parts = token.split("|")
        
        if len(parts) != 3:
            alerts.append(f"[MALFORMED PACKET]: '{token}' does not match 3-field protocol.")
            continue
            
        r_id, score_str, volt_str = parts
        try:
            score = int(score_str)
            voltage = float(volt_str)
            
            # Hardware safety check
            if voltage < 10.5:
                alerts.append(f"[CRITICAL LOW VOLTAGE]: {r_id} at {voltage}V! Return to recharge.")
                
            clean_records.append({
                "id": r_id,
                "score": score,
                "voltage": voltage,
                "status": "DANGER" if voltage < 10.5 else "OPERATIONAL"
            })
        except ValueError:
            alerts.append(f"[CORRUPT NUMERIC DATA]: In packet '{token}'")
            
    return clean_records, alerts

# Simulated raw burst from stadium antennas
stream = [
    "ROVER_ALPHA|88|12.4",
    "ROVER_BETA|94|10.2",
    "ROVER_GAMMA|BROKEN|11.9",
    "ROVER_DELTA|76|11.5",
    "GARBAGE_TRANSMISSION_NOISE",
    "ROVER_EPSILON|91|12.1"
]

records, anomaly_log = parse_telemetry_stream(stream)

print("=== TELEMETRY SUMMARY ===")
for r in records:
    print(f"ID: {r['id']:<14} | Score: {r['score']:<3} | Volts: {r['voltage']:<4} | Status: {r['status']}")

print("\\n=== SYSTEM ALERTS ===")
for alert in anomaly_log:
    print(alert)
''',
            "expected_output": """=== TELEMETRY SUMMARY ===
ID: ROVER_ALPHA   | Score: 88  | Volts: 12.4 | Status: OPERATIONAL
ID: ROVER_BETA    | Score: 94  | Volts: 10.2 | Status: DANGER
ID: ROVER_DELTA   | Score: 76  | Volts: 11.5 | Status: OPERATIONAL
ID: ROVER_EPSILON | Score: 91  | Volts: 12.1 | Status: OPERATIONAL

=== SYSTEM ALERTS ===
[CRITICAL LOW VOLTAGE]: ROVER_BETA at 10.2V! Return to recharge.
[CORRUPT NUMERIC DATA]: In packet 'ROVER_GAMMA|BROKEN|11.9'
[MALFORMED PACKET]: 'GARBAGE_TRANSMISSION_NOISE' does not match 3-field protocol.""",
            "explanation": "The script handles string splitting, exception handling, data sanitization, and automated threshold alerts. It demonstrates structured data processing essential for feeding downstream AI algorithms."
        },
        "questions": [
            {
                "q": "What is the average time complexity of looking up a feature value by key in a Python dictionary containing 1,000,000 items?",
                "options": [
                    "$O(N)$ linear time",
                    "$O(1)$ constant time",
                    "$O(N^2)$ quadratic time",
                    "$O(\\log N)$ logarithmic time"
                ],
                "answer": "B",
                "explanation": "Python dictionaries are implemented as hash tables, providing average-case $O(1)$ constant time complexity for key lookups."
            },
            {
                "q": "What will the following Python list comprehension produce?\n`[x ** 2 for x in [1, 2, 3, 4] if x % 2 == 0]`",
                "options": [
                    "`[1, 4, 9, 16]`",
                    "`[4, 16]`",
                    "`[2, 4]`",
                    "`[1, 9]`"
                ],
                "answer": "B",
                "explanation": "The condition `if x % 2 == 0` filters for even numbers (2 and 4). Their squares ($2^2=4$ and $4^2=16$) yield `[4, 16]`."
            },
            {
                "q": "Why is handling exceptions with `try-except` critical when parsing real-world training datasets in Python?",
                "options": [
                    "To speed up the computer's clock frequency.",
                    "To prevent corrupted or missing records from abruptly crashing the entire ingestion script.",
                    "Because Python forbids running scripts without at least one try block.",
                    "To automatically generate neural network weights."
                ],
                "answer": "B",
                "explanation": "Exception handling allows programs to recover gracefully from missing data, bad formatting, or unexpected nulls without halting execution."
            },
            {
                "q": "Which data type is immutable in Python, preventing accidental modification of reference weights?",
                "options": [
                    "List",
                    "Dictionary",
                    "Tuple",
                    "Set"
                ],
                "answer": "C",
                "explanation": "Tuples are immutable; once instantiated, their elements cannot be appended, removed, or overwritten."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Knows how to declare variables and print text.",
                "coding": "Can write basic assignments and arithmetic in Python.",
                "sim": "Resolves basic syntax errors with hints."
            },
            "proficient": {
                "concept": "Understands list/dictionary operations and time-complexity trade-offs.",
                "coding": "Writes functions with loops, conditionals, and exception handling.",
                "sim": "Parses live telemetry streams with zero system crashes."
            },
            "advanced": {
                "concept": "Designs modular data pipelines with functional programming principles.",
                "coding": "Implements clean list comprehensions, lambda keys, and defensive type checks.",
                "sim": "Achieves peak throughput and optimizes memory allocation."
            }
        },
        "responsible_ai": "Code Reliability & Human Impact: Autonomous software errors in telemetry parsing can lead to physical accidents or misdiagnoses. Defensive coding is an ethical requirement, not merely a stylistic preference.",
        "xp": 115,
        "badge": "Python Mechanist",
        "next_mission": "Class 9 Chapter 2 Lesson 2: Solve It with Code"
    },

    {
        "grade_num": 9,
        "grade": "Class 9",
        "ch_num": 2,
        "ch_name": "Communicate with AI",
        "les_num": 2,
        "title": "Solve It with Code",
        "pillar": "Communicate with AI",
        "strand": "Algorithmic Problem-Solving, Search, Sorting, and Heuristics",
        "prereqs": "Class 9 Chapter 2 Lesson 1 (Python variables, lists, conditionals, functions).",
        "prereq_details": "Familiarity with writing Python functions and iterating through lists.",
        "key_terms": ["Algorithm", "Linear Search", "Binary Search", "Heuristic Search", "Greedy Algorithm", "Edge Cases"],
        "objectives": [
            "Deconstruct complex real-world problems into sequential, deterministic algorithmic steps.",
            "Compare the asymptotic efficiency of Linear Search ($O(N)$) vs Binary Search ($O(\\log N)$).",
            "Implement a Greedy Heuristic algorithm for resource allocation under constraints.",
            "Formulate comprehensive unit tests to uncover edge-case failures."
        ],
        "mission_title": "Operation ColdChain: Vaccine Drone Route Optimization",
        "mission_desc": "A fleet of medical delivery drones must distribute temperature-sensitive anti-venom across 5 remote mountain clinics before the cooling packs expire (maximum 45 minutes of total flight time). Distances and urgent patient counts vary across clinics. You must develop a Python algorithmic solver that evaluates destinations and selects the optimal delivery schedule to save the maximum number of critical patients within flight constraints.",
        "theory": """### 1. Algorithms: The Blueprint of Computational Intelligence
An **algorithm** is an unambiguous, finite sequence of computational steps that transforms an input into a desired output. AI systems are essentially composed of layered algorithms working in tandem (search algorithms, optimization algorithms, and pattern recognition heuristics).

### 2. Search Efficiency: Linear vs. Binary Search
* **Linear Search ($O(N)$):** Evaluates every item sequentially from index $0$ to $N-1$. Works on unsorted data. In the worst case of $1,000,000$ records, it requires $1,000,000$ comparisons.
* **Binary Search ($O(\\log_2 N)$):** Operates on pre-sorted data. Continuously cuts the search interval in half. For $1,000,000$ records, it finds the target in at most $\\approx 20$ comparisons!

### 3. Heuristics and Greedy Optimization
In many real-world AI problems (like autonomous routing or game playing), searching every possible combination takes billions of years (combinatorial explosion). AI systems rely on **Heuristics**—practical shortcuts or 'rules of thumb' that find good-enough solutions rapidly:
* **Greedy Algorithm:** At each decision step, selects the locally optimal choice hoping to achieve a globally optimal outcome (e.g. visiting the clinic with the highest patient-to-flight-time ratio first).""",
        "demo": """### Worked Mathematical Comparison: Binary Search Halving Steps
Searching for the ID `732` in a sorted medical registry of $1,024$ patient records:

1. Step 1: Interval $[0, 1023] \\implies$ Midpoint $= 511$. (Target > 511 $\\implies$ discard bottom 512).
2. Step 2: Interval $[512, 1023] \\implies$ Midpoint $= 767$. (Target < 767 $\\implies$ discard top 256).
3. Step 3: Interval $[512, 766] \\implies$ Midpoint $= 639$. (Target > 639).
4. Step 4: Interval $[640, 766] \\implies$ Midpoint $= 703$. (Target > 703).
5. Step 5: Interval $[704, 766] \\implies$ Midpoint $= 735$. (Target < 735).
6. Step 6: Interval $[704, 734] \\implies$ Midpoint $= 719$. (Target > 719).
7. Step 7: Interval $[720, 734] \\implies$ Midpoint $= 727$. (Target > 727).
8. Step 8: Interval $[728, 734] \\implies$ Midpoint $= 731$. (Target > 731).
9. Step 9: Interval $[732, 734] \\implies$ Midpoint $= 733$. (Target < 733).
10. Step 10: Interval $[732, 732] \\implies$ Midpoint $= 732$. **MATCH FOUND!**
Total checks: 10 steps ($2^{10} = 1024$). In contrast, linear search would have required 733 comparisons!""",
        "game": {
            "title": "ColdChain Dispatcher: The Heuristic Flight Simulator",
            "scenario": "Manage a command terminal directing 3 solar drones across a mountainous map. Dynamic wind gusts continuously alter battery consumption.",
            "objective": "Maximize patient deliveries before vaccine cold-packs degrade past 8°C.",
            "tools": "Routing Graph, Battery Telemetry, Patient Severity Queue.",
            "roles": "Chief Logistics Algorithmist.",
            "decision_points": [
                "Select routing strategy: Nearest-Neighbor heuristic vs Highest-Urgency greedy pick.",
                "Determine abort thresholds: Decide when a drone must divert home due to adverse head-winds.",
                "Dynamic rerouting: Reroute an airborne drone when an SOS emergency priority beacon triggers."
            ],
            "rules": "Each successful vaccine delivered = +100 points. Expired vaccine arrival = -200 points. Drone crash = Disqualification.",
            "feedback": "Visual HUD plots the Pareto frontier of flight time versus lives saved.",
            "reflection": "Why does a greedy heuristic sometimes get trapped in suboptimal solutions compared to global search?"
        },
        "coding": {
            "title": "Greedy Heuristic Dispatcher and Binary Search Verifier",
            "description": "Implement a binary search engine to locate clinic records and a greedy heuristic algorithm to prioritize drone deliveries within time constraints.",
            "code": '''def binary_search_clinics(sorted_ids, target_id):
    """Performs logarithmic binary search on sorted clinic ID list."""
    low = 0
    high = len(sorted_ids) - 1
    steps = 0
    
    while low <= high:
        steps += 1
        mid = (low + high) // 2
        if sorted_ids[mid] == target_id:
            return mid, steps
        elif sorted_ids[mid] < target_id:
            low = mid + 1
        else:
            high = mid - 1
    return -1, steps

def greedy_drone_dispatcher(clinics, max_flight_minutes=45):
    """
    Greedy heuristic: prioritize clinics maximizing (patients_at_risk / flight_time).
    """
    # Calculate efficiency ratio for each clinic
    scored_clinics = []
    for c in clinics:
        ratio = c["patients"] / c["flight_time"]
        scored_clinics.append({**c, "ratio": round(ratio, 2)})
        
    # Sort descending by priority ratio
    scored_clinics.sort(key=lambda x: x["ratio"], reverse=True)
    
    schedule = []
    time_used = 0
    total_patients_saved = 0
    
    for c in scored_clinics:
        if time_used + c["flight_time"] <= max_flight_minutes:
            time_used += c["flight_time"]
            total_patients_saved += c["patients"]
            schedule.append(c["name"])
            
    return schedule, time_used, total_patients_saved

# Data: Mountain Clinics
clinic_records = [
    {"name": "Valley North", "flight_time": 12, "patients": 4},
    {"name": "Eagle Peak",   "flight_time": 25, "patients": 11},
    {"name": "Riverbend",    "flight_time": 8,  "patients": 3},
    {"name": "Highland Ridge","flight_time": 18, "patients": 7},
    {"name": "Cedar Grove",  "flight_time": 15, "patients": 6}
]

# 1. Run Binary Search Check
sorted_ids = [102, 204, 308, 415, 520, 631, 742, 853]
target = 520
idx, comparisons = binary_search_clinics(sorted_ids, target)
print(f"Binary Search: ID {target} found at index {idx} in only {comparisons} checks.\\n")

# 2. Run Greedy Heuristic Dispatcher
itinerary, flight_mins, saved = greedy_drone_dispatcher(clinic_records, max_flight_minutes=45)
print("=== COLDCHAIN FLIGHT SCHEDULE ===")
print(f"Clinics Visited    : {itinerary}")
print(f"Total Flight Time  : {flight_mins} / 45 Minutes")
print(f"Patients Protected : {saved} individuals")
''',
            "expected_output": """Binary Search: ID 520 found at index 4 in only 1 checks.

=== COLDCHAIN FLIGHT SCHEDULE ===
Clinics Visited    : ['Eagle Peak', 'Cedar Grove']
Total Flight Time  : 40 / 45 Minutes
Patients Protected : 17 individuals""",
            "explanation": "Binary search demonstrates log-time access. The greedy heuristic sorts clinics by the utility-to-cost ratio (patients per flight minute) and selects actions greedily without exceeding the 45-minute battery deadline."
        },
        "questions": [
            {
                "q": "How many comparisons does Binary Search require in the absolute worst case to locate an item in a sorted list of 1,048,576 ($2^{20}$) elements?",
                "options": [
                    "20 comparisons",
                    "1,048,576 comparisons",
                    "524,288 comparisons",
                    "100 comparisons"
                ],
                "answer": "A",
                "explanation": "Binary search divides the problem space by 2 at each step. $\\log_2(2^{20}) = 20$ comparisons maximum."
            },
            {
                "q": "Why does Binary Search completely fail if executed on an unsorted array?",
                "options": [
                    "Because unsorted arrays cannot be stored in RAM.",
                    "Because the fundamental assumption that values to the left of midpoint are smaller and to the right are larger is violated.",
                    "Because Python converts unsorted arrays into strings.",
                    "Because division by zero occurs at the midpoint."
                ],
                "answer": "B",
                "explanation": "Binary search relies on the invariant of sorted order to safely discard half of the search space. Without sorting, discarding half may eliminate the target."
            },
            {
                "q": "In computer science, what distinguishes a 'Heuristic' from an 'Exact Algorithm'?",
                "options": [
                    "Heuristics always guarantee the provably absolute optimal mathematical solution.",
                    "Heuristics are rule-of-thumb approximations that prioritize speed and practicality when finding the exact optimum is computationally prohibitive.",
                    "Heuristics can only be executed by quantum computers.",
                    "Exact algorithms only work on text, while heuristics only work on numbers."
                ],
                "answer": "B",
                "explanation": "A heuristic is a problem-solving approach that employs a practical shortcut to produce solutions within a reasonable timeframe, without guaranteeing mathematical perfection."
            },
            {
                "q": "What is an 'Edge Case' in algorithmic software testing?",
                "options": [
                    "A graphical border rendered around a website button.",
                    "An operating condition occurring at an extreme boundary of operating parameters (e.g. empty list, negative input, capacity=0).",
                    "A variable named 'edge'.",
                    "A hardware wire connected to a peripheral device."
                ],
                "answer": "B",
                "explanation": "Edge cases are boundary conditions that frequently trigger unhandled exceptions or logical errors if not explicitly tested."
            }
        ],
        "rubric": {
            "beginner": {
                "concept": "Understands that algorithms are ordered steps for computers.",
                "coding": "Can trace a loop that searches for an item in a list.",
                "sim": "Delivers aid to nearby clinics without calculating time limits."
            },
            "proficient": {
                "concept": "Explains difference between linear and binary search complexity.",
                "coding": "Implements binary search and simple greedy heuristics.",
                "sim": "Optimizes flight plans to deliver medicine within time constraints."
            },
            "advanced": {
                "concept": "Formulates formal big-O notation and critiques greedy algorithm pitfalls.",
                "coding": "Writes complete optimization routines with edge-case test suites.",
                "sim": "Achieves mathematically optimal score using multi-variable heuristics."
            }
        },
        "responsible_ai": "Triage Ethics & Algorithmic Fairness: In emergency logistics, greedy algorithms that optimize purely for numerical count may systematically abandon isolated rural patients located far away. Ethical AI must incorporate equity constraints into objective functions.",
        "xp": 125,
        "badge": "Algorithm Tactician",
        "next_mission": "Class 9 Chapter 3 Lesson 1: AI for Our Planet"
    }
]

CLASS_9_LESSONS.extend(CH2_LESSONS)
print(f"Total Class 9 Lessons defined so far: {len(CLASS_9_LESSONS)}")
