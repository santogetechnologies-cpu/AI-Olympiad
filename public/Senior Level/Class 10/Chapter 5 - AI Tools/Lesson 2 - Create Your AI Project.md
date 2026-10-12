# Class 10 · Chapter 5: AI Tools
## Lesson 2: Create Your AI Project

> **Pillar:** AI Tools  
> **Academic Tier:** Senior Secondary (Class 10)  
> **Prerequisites:** Class 10 Chapter 5 Lesson 1.  
> **Estimated Duration:** 90 Minutes (Concept, Python Lab, Gamified Simulation, Olympiad Prep)

---

## 1. Lesson Identity & Syllabus Mapping
- **Class Level:** Class 10
- **Chapter 5:** AI Tools
- **Lesson 2:** Create Your AI Project
- **Curriculum Pillar:** AI Tools
- **Official Syllabus Strand:** End-to-End AI Project Lifecycle, Scoping, Data Curation, Prototyping, and Documentation
- **Key Concepts & Vocabulary:** AI Project Lifecycle, Problem Scoping, Data Curation, Minimum Viable Prototype (MVP), Model Card, User Documentation

## 2. Learning Objectives & Prerequisites
### Learning Objectives (Bloom's Revised Taxonomy)
- Execute the complete 5-stage AI Project Lifecycle: Scoping $\to$ Data Curation $\to$ Modeling $\to$ Evaluation $\to$ Documentation.
- Formulate a Minimum Viable Prototype (MVP) that solves a real community problem under strict time constraints.
- Write a formal Model Card detailing intended uses, limitations, training data demographics, and ethical considerations.
- Package a complete, runnable Python project with clear user instructions and sample test datasets.

### Prerequisite Conceptual Anchors
Understanding of problem formulation, data cleaning, and Python implementation.

## 3. Real-World Mission / Problem Scenario
### Mission Brief: *Project CapstoneX: The Community Noise Pollution Sentry*

Residents near your school complain about disruptive late-night construction noise violating municipal sound ordinances (maximum 65 dB after 10:00 PM). Construction companies claim the noise comes from passing highway trucks. You are commissioned to build, test, document, and deploy a complete end-to-end AI mini-project: an edge sound-monitoring sentry that records ambient decibels, classifies construction hammering vs truck engine rumble, logs violations, and publishes an open data report.

## 4. Technical Explanations & Algorithmic Foundations
### 1. The 5 Stages of the AI Project Lifecycle
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
* **Limitations & Ethical Warnings:** Known failure modes, environmental conditions where it fails.


## 5. Guided Demonstration & Mathematical / Computational Walkthrough
### Worked Model Card Excerpt: SoundSentry v1.0
* **Model Name:** SoundSentry Noise Classifier v1.0
* **Intended Use:** Intended for residential community monitoring of construction noise violations (>65dB) between 10:00 PM and 6:00 AM.
* **Out of Scope:** Not for legal courtroom evidentiary use; not calibrated for indoor domestic noise.
* **Training Data:** 450 audio clips recorded in urban residential zones (150 construction, 150 highway traffic, 150 baseline night ambient).
* **Limitations:** Rainstorms with heavy thunder generate acoustic signatures that trigger False Positives (misclassified as construction impact). Manual audio review required on rainy nights.


## 6. Unique Interactive Game / Simulation Specification
### Simulation Experience: **Startup Forge: The Capstone Pitch**
- **Scenario & Context:** Your student startup has 10 weeks to take an AI project from rough idea to live deployment before a panel of venture judges.
- **Pedagogical Objective:** Complete all 5 project phases with high technical rigor, a working prototype, and a flawless Model Card.
- **Available Information, Tools & Constraints:** Project Gantt Chart, Budget Tracker, Data Labeling Workbench, Prototype Tester.
- **Student Role & Actions:** Chief Project Architect.
- **Core Decision Points & Branching:**
  * Allocate limited time between collecting more high-quality training data vs tweaking model hyper-parameters.
  * Build a simple working MVP early vs getting bogged down in complex theoretical architectures.
  * Disclose known environmental limitations transparently in the Model Card vs hiding flaws from the judges.
- **Scoring Mechanics & Victory Conditions:** Hiding known failure modes leads to immediate disqualification when the judges test edge cases. Releasing an honest, working MVP wins the Fellowship.
- **Real-Time Quality Feedback:** Judges score technical execution, data hygiene, documentation clarity, and societal impact.
- **Post-Simulation Debrief & Concept Reflection:** Why does a simple, thoroughly tested, well-documented model always outperform a complex, buggy, undocumented neural network?

## 7. Practical Hands-On Coding Lab
### Lab Assignment: End-to-End AI Mini-Project: Noise Sentry with Automated Model Card Generator
Develop a complete, self-contained Python mini-project that ingests acoustic telemetry, logs decibel violations, and generates a structured Model Card report.

```python
import json
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

print("\n=== FORMAL PROJECT MODEL CARD ===")
for k, v in card.items():
    print(f"{k:<26}: {v}")
```

#### Expected Execution Output:
```text
=== PROJECT DEMO: VIOLATION LOGS ===
[23:28:15] 74.8 dB (+9.8 dB) | Source: CONSTRUCTION   | Status: ILLEGAL_VIOLATION
[23:45:00] 68.1 dB (+3.1 dB) | Source: HIGHWAY_TRUCK  | Status: TRAFFIC_EXEMPTION
[00:12:30] 78.5 dB (+13.5 dB) | Source: CONSTRUCTION   | Status: ILLEGAL_VIOLATION

=== FORMAL PROJECT MODEL CARD ===
model_details             : {'project_name': 'SoundSentry Acoustic Monitor', 'version': '1.0-MVP', 'created_at': '2026-10-12', 'author': 'Class 10 Student Engineering Team'}
intended_use              : Autonomous monitoring of late-night municipal construction noise (>65 dB).
out_of_scope_use          : Indoor domestic monitoring or legal evidentiary enforcement without human audit.
operational_threshold_db  : 65.0
total_violations_logged   : 3
known_limitations         : Thunderstorms and low-flying aircraft can cause acoustic false positives.
```

**Step-by-Step Code Analysis & Algorithmic Breakdown:**
The script encapsulates a complete end-to-end AI project: object-oriented telemetry processing, threshold evaluation, and automated generation of a standardized Model Card.

## 8. Olympiad-Level Examination Questions
### Question 1 [Multiple Choice]
What is a 'Model Card' in professional machine learning engineering?

- **(A)** A plastic trading card given to software engineers.
- **(B)** A standardized documentation report that details a model's architecture, intended uses, training data limitations, evaluation metrics, and ethical caveats.
- **(C)** A computer graphics processing card (GPU).
- **(D)** A business card handed out at conferences.

### Question 2 [Multiple Choice]
Why is developing a 'Minimum Viable Prototype' (MVP) recommended before building complex deep learning systems?

- **(A)** Because MVPs are cheaper to print on paper.
- **(B)** Because building an MVP allows developers to quickly validate the end-to-end data pipeline and confirm whether the problem is actually solvable with simple heuristics before spending months on complex architectures.
- **(C)** Because big models are forbidden in school competitions.
- **(D)** Because MVPs do not require computers.

### Question 3 [Multiple Choice]
Which phase of the AI Project Lifecycle typically consumes 70% to 80% of an engineering team's total time and effort?

- **(A)** Writing marketing slogans for the website.
- **(B)** Data Collection, Cleaning, Sanitization, and Feature Engineering.
- **(C)** Installing the Python software.
- **(D)** Turning the computer monitor on and off.

### Question 4 [Multiple Choice]
Why is specifying 'Out-of-Scope Use Cases' in project documentation an ethical responsibility?

- **(A)** To confuse users so they do not buy the product.
- **(B)** To explicitly warn users against deploying the model in high-stakes environments (e.g. medical diagnosis, legal sentencing) for which it was never calibrated or tested.
- **(C)** To make the documentation file larger in bytes.
- **(D)** Because lawyers get paid per word.

## 9. Answer Keys & In-Depth Technical Solutions
### Question 1 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Model Cards provide standardized transparency, outlining intended use cases, performance benchmarks, and known operational limitations.

### Question 2 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** An MVP validates core assumptions, data pipelines, and user feasibility with minimal wasted effort, exposing fundamental flaws early.

### Question 3 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Real-world data is messy, incomplete, and noisy; curating, labeling, and cleaning datasets represents the vast majority of engineering effort.

### Question 4 Solution Breakdown
- **Correct Answer:** Option **B**
- **Detailed Explanation & Error Analysis:** Explicitly documenting out-of-scope uses prevents dangerous misuse in critical domains where the model is untested or uncalibrated.

## 10. Evaluation Rubric & Measurable Completion Metrics
| Mastery Tier | Conceptual Comprehension (40%) | Applied Coding & Engineering (30%) | Decision-Making in Simulation (30%) |
| :--- | :--- | :--- | :--- |
| **Emerging (1–2 pts)** | Knows that projects have steps like planning and coding. | Can run the project demo script with provided inputs. | Jumps straight to coding without defining requirements. |
| **Proficient (3–4 pts)** | Explains the 5-stage project lifecycle, MVP methodology, and Model Card components. | Implements modular Python classes with automated logging and documentation. | Balances data cleaning and model building to ship an honest MVP. |
| **Advanced / Olympiad (5 pts)** | Formulates complete production MLOps lifecycles with continuous monitoring and governance. | Builds robust, end-to-end deployable packages with comprehensive Model Cards and automated unit tests. | Pitches a top-scoring, fully documented project that wins unanimous judge acclaim. |

## 11. Responsible AI, Ethics & Societal Impact
Radical Transparency & Honest Engineering: A great engineer is defined not by claiming their software is flawless, but by having the intellectual honesty to document exactly where, how, and why it can fail. Transparent limitations protect human users from silent algorithmic harm.

## 12. Gamification Achievements & Progression Mechanics
- **Experience Points (XP):** +275 XP
- **Earned Achievement Badge:** 🏆 `Capstone Master`
- **Unlocked Next Mission:** Class 10 Chapter 6 Lesson 1: Original or AI-Made?