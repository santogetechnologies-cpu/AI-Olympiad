# Class 6 • Chapter 2: Communicate with AI
## Lesson 1: Think → Plan → Code

**Syllabus Reference:** Class 6, Chapter 2 (Communicate with AI) — Lesson 1: *Think → Plan → Code*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Apply Computational Decomposition** to break down complex, multi-step real-world problems into clear, sequential sub-tasks.
2. **Formulate Pseudocode** using standard structured conventions (START, INPUT, IF/THEN, REPEAT, OUTPUT).
3. **Map Algorithms to Flowcharts** using standardized geometric notation (Terminator, Process, Decision, Input/Output).
4. **Identify and rectify logical flaws** (infinite loops, unhandled conditions, ambiguous instructions) prior to writing code.
5. **Translate an algorithmic plan into a functional, runnable Python script.**

#### Prerequisite Knowledge
- Basic understanding of how computers follow sequential instructions.
- Familiarity with basic mathematical operations and comparisons (`>`, `<`, `==`).

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Rover Rescue on the Lunar Crater*  
> **Mission Briefing:** An autonomous lunar exploration rover, *Artemis-6*, is stuck on the rugged crater floor of the Moon!  
> Its main satellite communications link has degraded, leaving only an ultra-low-bandwidth emergency command radio. You cannot steer the rover in real time with a joystick because radio signals take 2.6 seconds to travel round-trip. If you send a command late, the rover will tumble into a bottomless crevasse!  
> The only way to guide Artemis-6 back to the solar recharge base is to **THINK** through the path, **PLAN** an unambiguous, step-by-step algorithm that handles unexpected boulder obstacles, and convert that plan into verified **CODE** before broadcasting it to the rover.

---

### 3. Core Concept Explanations & Algorithmic Foundations

#### The Three Stages of Problem Solving
Master software engineers and AI developers do not start by typing code. They follow the three-phase pipeline:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   1. THINK      │ ───> │    2. PLAN      │ ───> │    3. CODE      │
│ Deconstruct the │      │ Design steps in │      │ Translate into  │
│ real problem    │      │ pseudocode/flow │      │ executable lang │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

#### 1. Decomposition (The "Think" Phase)
Decomposition means breaking down a large, overwhelming problem into smaller, manageable sub-problems:
- *Problem:* Make a morning breakfast.
- *Decomposed Sub-Tasks:*
  1. Boil water in the kettle.
  2. Toast two slices of whole-wheat bread.
  3. Spread butter and jam evenly.
  4. Pour tea into a cup.

#### 2. Pseudocode Conventions (The "Plan" Phase)
Pseudocode is an informal, human-readable way of writing programming logic without worrying about strict syntax rules like quotation marks or semicolons.

```text
ALGORITHM: Smart Streetlight Control
START
    INPUT ambient_lux_level
    IF ambient_lux_level < 30 THEN
        SET light_brightness = 100%
        OUTPUT "Lights Activated"
    ELSE
        SET light_brightness = 0%
        OUTPUT "Lights Deactivated (Daylight Detected)"
    ENDIF
END
```

#### 3. Standard Flowchart Geometric Symbols

| Symbol Shape | Standard Name | Technical Function | Example in Program |
| :---: | :--- | :--- | :--- |
| **Oval / Rounded Box** | Terminator | Represents the formal start or end of an algorithm. | `START` or `END` |
| **Parallelogram** | Input / Output | Represents reading data from sensors or printing results. | `READ soil_moisture` or `PRINT "Alert"` |
| **Rectangle** | Process Box | Represents an arithmetic calculation or internal variable update. | `SET total = score + bonus` |
| **Diamond** | Decision Box | Represents a conditional branch evaluating to `True` or `False`. | `IS battery < 20%?` |
| **Arrow** | Flowline | Connects symbols to indicate the exact direction of execution. | `───>` |

---

### 4. Guided Reasoning & Experiment

#### Interactive Trace: The "Infinite Coffee Maker" Bug
Examine the following flawed algorithm designed for an automated beverage robot:

```text
1. START
2. PLACE mug on tray
3. POUR hot water until mug is full
4. ADD 1 spoon of coffee powder
5. STIR spoon 5 times
6. GOTO Step 4
7. SERVE drink
8. END
```

**Guided Reasoning Questions:**
1. *What happens at Step 6?*
   - Step 6 commands the robot: `GOTO Step 4`.
   - The robot adds another spoon of coffee, stirs 5 times, and returns to Step 4 again!
2. *Will Step 7 ("SERVE drink") ever execute?*
   - Never! This program is trapped in an **Infinite Loop**. The mug will overflow with mountains of coffee powder until the robot's motor burns out.
3. *How do we fix it?*
   - Remove the `GOTO Step 4` line or replace it with a controlled condition: `IF coffee_strength < desired_level THEN ADD spoon`.

---

### 5. Interactive Game Specification

#### Game Title: *The Algorithm Labyrinth*
- **Game Engine Type:** Algorithmic Grid Navigation & Sub-Routine Planner.
- **Educational Objective:** Hands-on practice in step-by-step logic, loop optimization, and avoiding unhandled runtime conditions.

#### Game Rules & Mechanics:
1. **Grid Setup:**
   - Artemis-6 starts at Coordinate `(0, 0)` facing East.
   - Solar Recharge Base is at `(5, 5)`.
   - Obstacles: 3 Lunar Boulders and 2 Deep Craters are randomly generated on the grid.
2. **Player Action (Command Card Deck):**
   - The player cannot use direct keyboard arrow controls.
   - The player must construct a complete command sequence using cards:
     - `MOVE_FORWARD(n)`
     - `TURN_LEFT(90)` / `TURN_RIGHT(90)`
     - `SCAN_FRONT()`
     - `IF obstacle_ahead THEN [Sub-Routine]`
     - `REPEAT (n) TIMES`
3. **Execution Phase:**
   - The player hits **"TRANSMIT CODE"**.
   - The rover executes the sequence step-by-step on the lunar map.
   - If the rover collides with a crater: Mission Failed. Student receives an automated telemetry traceback showing the exact step that caused the error.

#### Scoring & Achievement:
- **Optimal Efficiency Bonus:** Achieving the goal with the minimum number of commands using loops (+100 XP).
- **Badges:**
  - 🥉 *Navigator* (Reached Base)
  - 🥈 *Loop Master* (Used REPEAT to compress code by >40%)
  - 🥇 *Autonomous Commander* (Handled all dynamic boulders with conditional scans)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *Decompose Your School Morning*
**Objective:** Create a complete, unambiguous algorithm that an automated home robot could execute to pack your school backpack.

**Requirements:**
1. **Inputs:** Day of the week (Monday through Friday), Weather forecast (Rainy / Sunny / Cold).
2. **Decomposition:**
   - Sub-task A: Check timetable for required subject notebooks.
   - Sub-task B: Check if Physical Education (PE) kit is required today.
   - Sub-task C: Check if an umbrella or raincoat must be packed based on weather.
3. **Deliverable:** Write the solution in clean, formatted pseudocode using `IF-THEN-ELSE` and `OUTPUT` statements.

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us translate an algorithmic plan for an autonomous rover into verified Python code with obstacle detection and fuel monitoring.

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 2 LESSON 1
# ROVER NAVIGATION: TRANSLATING ALGORITHM TO PYTHON CODE
# =====================================================================

def execute_rover_mission(grid_size, obstacles, target):
    """
    Simulates rover moving from (0, 0) to target while avoiding obstacles.
    Algorithm:
    1. Check if fuel remains.
    2. Check if next step contains an obstacle.
    3. Move along X-axis first, then Y-axis.
    """
    rover_x = 0
    rover_y = 0
    fuel = 20
    path_log = [(rover_x, rover_y)]
    
    print(f"Mission Start: Rover at ({rover_x}, {rover_y}) | Target: {target}")
    
    while (rover_x, rover_y) != target:
        if fuel <= 0:
            return "MISSION FAILED: Out of fuel in the lunar desert!"
        
        # Decide next move: Priority to advance along X until aligned
        next_step = None
        if rover_x < target[0]:
            candidate = (rover_x + 1, rover_y)
            if candidate not in obstacles:
                next_step = candidate
            else:
                # Obstacle evasion: detour along Y
                print(f"  [ALERT] Boulder at {candidate}! Evading via North.")
                next_step = (rover_x, rover_y + 1)
        elif rover_y < target[1]:
            candidate = (rover_x, rover_y + 1)
            if candidate not in obstacles:
                next_step = candidate
            else:
                # Detour along X
                print(f"  [ALERT] Boulder at {candidate}! Evading via East.")
                next_step = (rover_x + 1, rover_y)
                
        rover_x, rover_y = next_step
        fuel -= 1
        path_log.append((rover_x, rover_y))
        print(f"  Moved to ({rover_x}, {rover_y}) | Remaining Fuel: {fuel}")
        
    return f"MISSION SUCCESS: Reached Solar Base at ({rover_x}, {rover_y})! Remaining Fuel: {fuel}"

# ----------------- EXECUTION TEST -----------------
lunar_obstacles = [(2, 0), (2, 1), (3, 3)]
lunar_target = (4, 3)

result = execute_rover_mission(grid_size=(5, 5), obstacles=lunar_obstacles, target=lunar_target)
print("\n" + result)
```

#### Expected Program Output:
```text
Mission Start: Rover at (0, 0) | Target: (4, 3)
  Moved to (1, 0) | Remaining Fuel: 19
  [ALERT] Boulder at (2, 0)! Evading via North.
  Moved to (1, 1) | Remaining Fuel: 18
  [ALERT] Boulder at (2, 1)! Evading via North.
  Moved to (1, 2) | Remaining Fuel: 17
  Moved to (2, 2) | Remaining Fuel: 16
  Moved to (3, 2) | Remaining Fuel: 15
  Moved to (4, 2) | Remaining Fuel: 14
  Moved to (4, 3) | Remaining Fuel: 13

MISSION SUCCESS: Reached Solar Base at (4, 3)! Remaining Fuel: 13
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Algorithmic Logic & Flowchart Conventions)
In a standardized computer science flowchart, what does a **Diamond-shaped** symbol represent?
- **A)** The initialization or termination of the algorithm.
- **B)** An automated mathematical arithmetic calculation.
- **C)** A conditional decision point that branches into two paths based on a True or False condition.
- **D)** An external data storage peripheral.
- **Correct Answer:** **C**
- **Explanation:** In flowchart syntax, the diamond symbol universally denotes a **Decision Box**. It takes an incoming path and poses an evaluative question (e.g., `Is temperature > 100?`), branching into at least two distinct exit flowlines (e.g., `Yes` and `No`).

#### Question 2 (Debugging & Computational Thinking)
A programmer writes an algorithm to calculate the average score of 5 students:
```text
1. total = 0
2. FOR EACH student IN class:
3.     total = total + student.score
4. average = total / 4
5. PRINT average
```
What type of error is present in this algorithm?
- **A)** A Syntax Error that prevents the computer from running.
- **B)** A Logic Error that produces an incorrect numerical calculation.
- **C)** A Hardware Sensor Fault.
- **D)** A Run-time Memory Overflow.
- **Correct Answer:** **B**
- **Explanation:** The program contains a **Logic Error**. The loop processes 5 students, but Line 4 divides the sum by `4` instead of `5`. The program will execute smoothly without crashing, but the output average will be mathematically incorrect.

#### Question 3 (Algorithmic Decomposition)
Why is decomposition considered one of the most critical pillars of computational thinking when developing complex AI systems?
- **A)** Because computers can only execute programs that have fewer than 10 lines of code.
- **B)** Breaking a massive, ambiguous problem into smaller, isolated sub-problems makes each part easier to understand, code, test, and debug.
- **C)** Decomposed programs run 100 times faster on all computer hardware.
- **D)** Decomposition eliminates the need to write computer programs altogether.
- **Correct Answer:** **B**
- **Explanation:** **Decomposition** allows software architects to tackle immense real-world complexity (such as building a self-driving car) by splitting it into focused, solvable modules: computer vision, path planning, obstacle braking, and speed control.

#### Question 4 (Higher-Order Scenario: Algorithm Trace)
Consider the following pseudocode:
```text
x = 2
y = 10
REPEAT 3 TIMES:
    x = x * 2
    y = y - x
OUTPUT y
```
What is the final value printed by this algorithm?
- **A)** 4
- **B)** -18
- **C)** -4
- **D)** 2
- **Correct Answer:** **B**
- **Trace Walkthrough:**
  - *Initial state:* `x = 2`, `y = 10`
  - *Iteration 1:* `x = 2 * 2 = 4`; `y = 10 - 4 = 6`
  - *Iteration 2:* `x = 4 * 2 = 8`; `y = 6 - 8 = -2`
  - *Iteration 3:* `x = 8 * 2 = 16`; `y = -2 - 16 = -18`
  - *Result printed:* `-18`.

#### Question 5 (AI System Communication)
When humans interact with AI models using natural language instructions (prompts), what is the most common reason the AI produces an unsatisfactory answer?
- **A)** The AI computer is angry with the user.
- **B)** The user's prompt was vague, ambiguous, or lacked clear contextual constraints.
- **C)** The internet connection was only at 4G speeds.
- **D)** AI systems only understand raw binary numbers (`0`s and `1`s).
- **Correct Answer:** **B**
- **Explanation:** Just as computers require precise pseudocode instructions, AI models require clear, unambiguous prompts. If a user asks *"Write a good story"* without specifying the genre, character goals, audience age, or length, the AI must guess the intent, often resulting in generic or irrelevant outputs.

---

### 9. Responsible AI & Ethical Reflection

#### The Danger of Ambiguous Autonomous Systems
When engineers design algorithms for autonomous systems (like medical robotic dispensers or financial loan evaluators):
- **Unintended Consequences:** If an algorithm is given an ambiguous objective—such as *"Maximize user screen time"* on a video platform—it may learn that recommending sensationalist, alarming, or fake videos keeps people glued to screens longer.
- **Ethical Specification:** Responsible AI design requires programmers to think through not just the primary goal, but the safety boundaries, ethical rules, and human protections that must constrain the system.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Algorithmic Planning** | Writes structured pseudocode with clear START, DECISION, and END blocks. | 100 XP | Logic Architect |
| **Pillar 2: Labyrinth Navigation** | Solves the *Algorithm Labyrinth* without triggering infinite loops or crashes. | 100 XP | Master Navigator |
| **Pillar 3: Python Coding** | Runs the obstacle evasion Python script and successfully reaches the target. | 100 XP | Python Explorer |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad trace and computational reasoning questions. | 100 XP | Olympiad Scholar |
| **Bonus: Flowchart Drafter** | Correctly maps the 5 standard flowchart shapes to real-world tasks. | 50 XP | System Designer |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
