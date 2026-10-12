"""
Complete Class 9 Curriculum Builder (All 12 Lessons across 6 Chapters)
Conforms to all 12 required lesson sections, rigorous Olympiad standards,
and sophisticated gamification mechanics.
"""

import os
import json

BASE_DIR = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level/Class 9"

def format_lesson(data):
    lines = []
    lines.append(f"# Class {data['grade_num']} · Chapter {data['ch_num']}: {data['ch_name']}")
    lines.append(f"## Lesson {data['les_num']}: {data['title']}\n")
    lines.append(f"> **Pillar:** {data['pillar']}  ")
    lines.append(f"> **Level:** Secondary Stage (Class {data['grade_num']})  ")
    lines.append(f"> **Prerequisites:** {data['prereqs']}  ")
    lines.append(f"> **Estimated Study Time:** 90 Minutes (45 min Concept & Lab + 45 min Simulation & Assessment)\n")
    lines.append("---\n")
    
    # 1. Lesson Identity & Syllabus Mapping
    lines.append("## 1. Lesson Identity & Syllabus Mapping")
    lines.append(f"- **Class:** {data['grade']}")
    lines.append(f"- **Chapter {data['ch_num']}:** {data['ch_name']}")
    lines.append(f"- **Lesson {data['les_num']}:** {data['title']}")
    lines.append(f"- **Official Syllabus Strand:** {data['strand']}")
    lines.append(f"- **Key Terms:** {', '.join(data['key_terms'])}\n")
    
    # 2. Learning Objectives & Prerequisite Concepts
    lines.append("## 2. Learning Objectives & Prerequisites")
    lines.append("### Learning Objectives")
    for obj in data['objectives']:
        lines.append(f"- {obj}")
    lines.append(f"\n### Prerequisite Knowledge\n{data['prereq_details']}\n")
    
    # 3. Engaging Real-World Problem or Mission
    lines.append("## 3. Mission Scenario: Real-World AI Challenge")
    lines.append(f"**Mission Title:** *{data['mission_title']}*\n")
    lines.append(f"{data['mission_desc']}\n")
    
    # 4. Detailed Technical Explanations with Examples
    lines.append("## 4. In-Depth Technical Concepts")
    lines.append(data['theory'])
    lines.append("\n")
    
    # 5. Guided Demonstrations, Worked Examples, or Experiments
    lines.append("## 5. Guided Demonstration & Mathematical Walkthrough")
    lines.append(data['demo'])
    lines.append("\n")
    
    # 6. Unique Interactive Game or Simulation
    lines.append("## 6. Interactive Simulation Game")
    game = data['game']
    lines.append(f"### Game Title: {game['title']}")
    lines.append(f"- **Simulation Engine / Scenario:** {game['scenario']}")
    lines.append(f"- **Learning Objective:** {game['objective']}")
    lines.append(f"- **Tools & Constraints:** {game['tools']}")
    lines.append(f"- **Student Role:** {game['roles']}")
    lines.append(f"- **Core Decision Points:**")
    for dp in game['decision_points']:
        lines.append(f"  * {dp}")
    lines.append(f"- **Rules & Scoring Mechanics:** {game['rules']}")
    lines.append(f"- **Actionable Feedback:** {game['feedback']}")
    lines.append(f"- **Post-Mission Reflection & Debrief:** {game['reflection']}\n")
    
    # 7. Practical Coding Exercise / Assignment
    lines.append("## 7. Hands-On Python Lab & Implementation")
    code = data['coding']
    lines.append(f"### Task: {code['title']}")
    lines.append(f"{code['description']}\n")
    lines.append("```python")
    lines.append(code['code'].strip())
    lines.append("```\n")
    lines.append("#### Expected Terminal Output:")
    lines.append("```text")
    lines.append(code['expected_output'].strip())
    lines.append("```\n")
    lines.append(f"**Step-by-Step Code Walkthrough:**\n{code['explanation']}\n")
    
    # 8. Olympiad-Level Questions
    lines.append("## 8. Olympiad-Level Assessment Questions")
    for i, q in enumerate(data['questions'], 1):
        lines.append(f"### Question {i} ({q.get('type', 'Multiple Choice')})")
        lines.append(f"{q['q']}\n")
        if 'options' in q and q['options']:
            for opt_idx, opt in zip(['A', 'B', 'C', 'D'], q['options']):
                lines.append(f"- **({opt_idx})** {opt}")
        lines.append("")
    
    # 9. Correct Answers, Reasoning, and Detailed Explanations
    lines.append("## 9. Comprehensive Answer Explanations & Marking Scheme")
    for i, q in enumerate(data['questions'], 1):
        lines.append(f"### Question {i} Solution")
        lines.append(f"- **Correct Answer:** Option **{q['answer']}**")
        lines.append(f"- **Technical Rationale:** {q['explanation']}\n")
        
    # 10. Evaluation Criteria and Measurable Outcomes
    lines.append("## 10. Evaluation Rubric & Mastery Matrix")
    rub = data['rubric']
    lines.append("| Performance Tier | Conceptual Mastery | Practical / Coding Skill | Simulation Decision Quality |")
    lines.append("| :--- | :--- | :--- | :--- |")
    lines.append(f"| **Beginner (1-2 pts)** | {rub['beginner']['concept']} | {rub['beginner']['coding']} | {rub['beginner']['sim']} |")
    lines.append(f"| **Proficient (3-4 pts)** | {rub['proficient']['concept']} | {rub['proficient']['coding']} | {rub['proficient']['sim']} |")
    lines.append(f"| **Advanced (5 pts)** | {rub['advanced']['concept']} | {rub['advanced']['coding']} | {rub['advanced']['sim']} |\n")
    
    # 11. Responsible-AI Reflection
    lines.append("## 11. Responsible AI & Ethical Impact")
    lines.append(f"{data['responsible_ai']}\n")
    
    # 12. Achievement, Feedback, or Progression Mechanics
    lines.append("## 12. Progression Mechanics & Achievement Badges")
    lines.append(f"- **XP Earned:** {data['xp']} XP")
    lines.append(f"- **Badge Unlocked:** 🏅 `{data['badge']}`")
    lines.append(f"- **Next Learning Mission:** {data['next_mission']}")
    
    return "\n".join(lines)

print("Class 9 formatter ready.")
