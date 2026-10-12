"""
Core generator utilities for GAIO Senior Level Curriculum (Classes 9 - 12).
Ensures all 12 mandatory sections are thoroughly structured and formatted.
"""
import os
import json

def format_lesson_markdown(data):
    lines = []
    lines.append(f"# Class {data['grade_num']} · Chapter {data['ch_num']}: {data['ch_name']}")
    lines.append(f"## Lesson {data['les_num']}: {data['title']}\n")
    lines.append(f"> **Pillar:** {data['pillar']}  ")
    lines.append(f"> **Academic Tier:** Senior Secondary (Class {data['grade_num']})  ")
    lines.append(f"> **Prerequisites:** {data['prereqs']}  ")
    lines.append(f"> **Estimated Duration:** 90 Minutes (Concept, Python Lab, Gamified Simulation, Olympiad Prep)\n")
    lines.append("---\n")
    
    # 1. Lesson Identity & Syllabus Mapping
    lines.append("## 1. Lesson Identity & Syllabus Mapping")
    lines.append(f"- **Class Level:** {data['grade']}")
    lines.append(f"- **Chapter {data['ch_num']}:** {data['ch_name']}")
    lines.append(f"- **Lesson {data['les_num']}:** {data['title']}")
    lines.append(f"- **Curriculum Pillar:** {data['pillar']}")
    lines.append(f"- **Official Syllabus Strand:** {data['strand']}")
    lines.append(f"- **Key Concepts & Vocabulary:** {', '.join(data['key_terms'])}\n")
    
    # 2. Learning Objectives & Prerequisites
    lines.append("## 2. Learning Objectives & Prerequisites")
    lines.append("### Learning Objectives (Bloom's Revised Taxonomy)")
    for obj in data['objectives']:
        lines.append(f"- {obj}")
    lines.append(f"\n### Prerequisite Conceptual Anchors\n{data['prereq_details']}\n")
    
    # 3. Engaging Real-World Problem or Mission
    lines.append("## 3. Real-World Mission / Problem Scenario")
    lines.append(f"### Mission Brief: *{data['mission_title']}*\n")
    lines.append(f"{data['mission_desc']}\n")
    
    # 4. Detailed Technical Explanations with Examples
    lines.append("## 4. Technical Explanations & Algorithmic Foundations")
    lines.append(data['theory'])
    lines.append("\n")
    
    # 5. Guided Demonstrations, Worked Examples, or Experiments
    lines.append("## 5. Guided Demonstration & Mathematical / Computational Walkthrough")
    lines.append(data['demo'])
    lines.append("\n")
    
    # 6. Unique Interactive Game or Simulation
    lines.append("## 6. Unique Interactive Game / Simulation Specification")
    game = data['game']
    lines.append(f"### Simulation Experience: **{game['title']}**")
    lines.append(f"- **Scenario & Context:** {game['scenario']}")
    lines.append(f"- **Pedagogical Objective:** {game['objective']}")
    lines.append(f"- **Available Information, Tools & Constraints:** {game['tools']}")
    lines.append(f"- **Student Role & Actions:** {game['roles']}")
    lines.append(f"- **Core Decision Points & Branching:**")
    for dp in game['decision_points']:
        lines.append(f"  * {dp}")
    lines.append(f"- **Scoring Mechanics & Victory Conditions:** {game['rules']}")
    lines.append(f"- **Real-Time Quality Feedback:** {game['feedback']}")
    lines.append(f"- **Post-Simulation Debrief & Concept Reflection:** {game['reflection']}\n")
    
    # 7. Practical Coding Exercise / Assignment
    lines.append("## 7. Practical Hands-On Coding Lab")
    code = data['coding']
    lines.append(f"### Lab Assignment: {code['title']}")
    lines.append(f"{code['description']}\n")
    lines.append("```python")
    lines.append(code['code'].strip())
    lines.append("```\n")
    lines.append("#### Expected Execution Output:")
    lines.append("```text")
    lines.append(code['expected_output'].strip())
    lines.append("```\n")
    lines.append(f"**Step-by-Step Code Analysis & Algorithmic Breakdown:**\n{code['explanation']}\n")
    
    # 8. Olympiad-Level Questions
    lines.append("## 8. Olympiad-Level Examination Questions")
    for i, q in enumerate(data['questions'], 1):
        lines.append(f"### Question {i} [{q.get('type', 'Multiple Choice')}]")
        lines.append(f"{q['q']}\n")
        if 'options' in q and q['options']:
            for opt_idx, opt in zip(['A', 'B', 'C', 'D'], q['options']):
                lines.append(f"- **({opt_idx})** {opt}")
        lines.append("")
    
    # 9. Correct Answers, Reasoning, and Detailed Explanations
    lines.append("## 9. Answer Keys & In-Depth Technical Solutions")
    for i, q in enumerate(data['questions'], 1):
        lines.append(f"### Question {i} Solution Breakdown")
        lines.append(f"- **Correct Answer:** Option **{q['answer']}**")
        lines.append(f"- **Detailed Explanation & Error Analysis:** {q['explanation']}\n")
        
    # 10. Evaluation Criteria and Measurable Outcomes
    lines.append("## 10. Evaluation Rubric & Measurable Completion Metrics")
    rub = data['rubric']
    lines.append("| Mastery Tier | Conceptual Comprehension (40%) | Applied Coding & Engineering (30%) | Decision-Making in Simulation (30%) |")
    lines.append("| :--- | :--- | :--- | :--- |")
    lines.append(f"| **Emerging (1–2 pts)** | {rub['beginner']['concept']} | {rub['beginner']['coding']} | {rub['beginner']['sim']} |")
    lines.append(f"| **Proficient (3–4 pts)** | {rub['proficient']['concept']} | {rub['proficient']['coding']} | {rub['proficient']['sim']} |")
    lines.append(f"| **Advanced / Olympiad (5 pts)** | {rub['advanced']['concept']} | {rub['advanced']['coding']} | {rub['advanced']['sim']} |\n")
    
    # 11. Responsible-AI Reflection
    lines.append("## 11. Responsible AI, Ethics & Societal Impact")
    lines.append(f"{data['responsible_ai']}\n")
    
    # 12. Achievement, Feedback, or Progression Mechanics
    lines.append("## 12. Gamification Achievements & Progression Mechanics")
    lines.append(f"- **Experience Points (XP):** +{data['xp']} XP")
    lines.append(f"- **Earned Achievement Badge:** 🏆 `{data['badge']}`")
    lines.append(f"- **Unlocked Next Mission:** {data['next_mission']}")
    
    return "\n".join(lines)

def write_lesson_file(class_base_dir, lesson_data):
    ch_dir_name = f"Chapter {lesson_data['ch_num']} - {lesson_data['ch_name'].replace('/', '_')}"
    target_dir = os.path.join(class_base_dir, ch_dir_name)
    os.makedirs(target_dir, exist_ok=True)
    
    safe_title = lesson_data['title'].replace('/', '_').replace('→', 'to')
    file_name = f"Lesson {lesson_data['les_num']} - {safe_title}.md"
    file_path = os.path.join(target_dir, file_name)
    
    md_content = format_lesson_markdown(lesson_data)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"  [SAVED] {file_path} ({len(md_content)} bytes)")
    return file_path
