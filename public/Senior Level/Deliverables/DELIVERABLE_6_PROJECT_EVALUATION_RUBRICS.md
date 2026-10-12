# DELIVERABLE 6: CAPSTONE PROJECT & EVALUATION RUBRICS

## Executive Overview
This document establishes standardized evaluation rubrics, Model Card documentation templates, and capstone project specifications for Senior Level AI Olympiad candidates across Classes 9 to 12.

Evaluation is structured across three progressive mastery tiers:
* **Emerging (1–2 Points):** Basic procedural compliance, superficial conceptual awareness, requires guided prompting.
* **Proficient (3–4 Points):** Independent problem solving, correct mathematical/algorithmic formulation, defensive coding, robust testing.
* **Advanced / Olympiad (5 Points):** Theoretical mastery, rigorous optimization, comprehensive edge-case resilience, radical ethical transparency.

---

## 1. Master Evaluation Rubric Matrix

| Dimension | Weight | Emerging Tier (1–2 Pts) | Proficient Tier (3–4 Pts) | Advanced / Olympiad Tier (5 Pts) |
| :--- | :---: | :--- | :--- | :--- |
| **1. Problem Scoping & Formulation** | 20% | Vague objectives; fails to define measurable metrics or constraints. | Clearly defined mathematical objective; quantifiable KPIs and realistic constraints. | Rigorous problem decomposition; identifies multi-stakeholder trade-offs, Pareto bounds, and failure modes. |
| **2. Data Curation & Hygiene** | 20% | Accepts raw dirty data blindly; ignores outliers, missing values, and data leakage. | Sanitizes noise, implements defensive range bounds, enforces clean Train/Val/Test partitioning. | Quantifies signal-to-noise ratio; audits representation bias; designs automated continuous data validation. |
| **3. Algorithmic Rigor & Architecture** | 25% | Relies on brittle, hard-coded rules; ignores time/space algorithmic complexity. | Implements modular, idiomatic algorithms (OOP, vectorization, heuristics); optimizes loss metrics. | Mathematically defends architecture choice; proves convergence properties; minimizes latency & compute FLOPs. |
| **4. Testing & Verification** | 15% | Tests only with 1 or 2 happy-path examples; no automated assertions. | Implements automated unit test suites; tests boundary conditions (nulls, extremes, tie-breaks). | Full Test-Driven Development (TDD); adversarial red-teaming; automated eval harnesses with regression tracking. |
| **5. Ethical Governance & Documentation** | 20% | Omits documentation; conceals known model flaws; ignores privacy/bias risks. | Authors comprehensive Model Card; audits Disparate Impact; implements Meaningful Human Control. | Radical transparency; formal Verification Log; mathematical differential privacy; ethical deployment charters. |

---

## 2. Standardized Senior Olympiad Model Card Template

Every student capstone project must submit a formal Model Card adhering to the following schema:

```markdown
# 🏷️ MODEL CARD: [Project Name & Version]

## 1. Model Details
- **Architect/Team:** [Student Name(s) & Grade]
- **Date & Version:** [YYYY-MM-DD | v1.0-MVP]
- **Architecture Type:** [e.g. 1D CNN, Heuristic Greedy Dispatcher, RAG Pipeline, ReAct Agent]
- **License & Repository:** [Open Source MIT / Link to GitHub]

## 2. Intended Use & Target Domain
- **Primary Operational Objective:** [Clear 1-sentence statement of what the model does]
- **Target End-Users:** [e.g. Rural Telemedicine Clinicians, Solar Kart Drivers, Municipal Water Board]
- **Out-of-Scope & Prohibited Uses:** [Explicit warning against high-stakes uncalibrated deployment]

## 3. Data Ingestion & Curation
- **Data Sources:** [Physical IoT sensors, public benchmark repositories, synthetic simulation]
- **Dataset Size & Class Distribution:** [Sample count, majority/minority class breakdown]
- **Preprocessing & Cleaning Pipeline:** [Outlier clamping, normalization, imputation, train/val/test splits]

## 4. Quantitative Performance Benchmarks
- **Evaluation Metrics:** [Accuracy, Precision, Recall, F1-Score, MAE/RMSE, P99 Latency]
- **Benchmark Results:**
  - Training Set: [Score]
  - Validation Set: [Score]
  - Unseen Test Set: [Score]
- **Hardware Profile:** [Tested on Raspberry Pi 4 / M2 Mac / Intel i5; Latency in ms]

## 5. Algorithmic Fairness & Bias Audit
- **Audited Demographic / Protected Attributes:** [e.g. Geographic Region, Gender, Equipment Age]
- **Disparate Impact Ratio (DIR):** [Calculated DIR score | Must be >= 0.80]
- **Identified Proxy Features:** [List of stripped or mitigated proxy variables]

## 6. Known Limitations & Failure Modes
- **Environmental Edge Cases:** [Conditions where accuracy degrades, e.g. heavy rainstorms, dead digital silence]
- **Hallucination Risk Profile:** [Estimated hallucination rate on out-of-scope prompts]
- **Meaningful Human Control Protocol:** [Human specialist sign-off requirement for Tier 3 actions]
```

---

## 3. Flagship Class Capstone Project Specifications

### Class 9 Capstone: The Autonomous Canteen & Bio-Waste Minimizer
* **Mission:** Ingest 3 months of raw cafeteria logs, filter corrupted keyboard anomalies, train an environmental demand predictor, and generate daily procurement recommendations with a 15% safety buffer.
* **Deliverables:** Cleaned dataset, Python baseline regression script, confusion matrix, and waste reduction report.

### Class 10 Capstone: Subterranean Acoustic Water Loss Sentry (AquaPulse)
* **Mission:** Process acoustic accelerometer readings from municipal hydrants, compute Time Difference of Arrival (TDOA) wave physics, localize pipe fractures to within 1 meter, and estimate liter-per-minute hydraulic water loss.
* **Deliverables:** Object-oriented Python localization engine, unit test suite covering acoustic delays, Model Card, and civic water board brief.

### Class 11 Capstone: Autonomous Island Smart Microgrid Balancer (TerraGrid)
* **Mission:** Architect an object-oriented Python balancing agent encapsulating lithium battery storage, solar/wind generation, and consumer loads. Implement priority heuristics to prevent grid blackouts while minimizing carbon-heavy backup diesel.
* **Deliverables:** Full OOP class hierarchy, battery state encapsulation, automated load-shedding test suite, and ethical priority charter.

### Class 12 Capstone: Sovereign Enterprise RAG Engine (VaultRAG)
* **Mission:** Build an on-premises Retrieval-Augmented Generation system for a hospital network. Implement document chunking, semantic vector indexing, cosine similarity retrieval, and grounded prompt synthesis that guarantees zero hallucinations and P99 latency <1,200ms.
* **Deliverables:** In-memory vector database script, grounded prompt compiler, automated evaluation harness with LLM-as-a-Judge, and complete GitHub README.
