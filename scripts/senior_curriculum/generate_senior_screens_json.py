#!/usr/bin/env python3
"""
Generate seniorBookData.json from the 48 authoritative Senior Level markdown files.
Produces 336 structured screens across Classes 9, 10, 11, and 12.
"""

import os
import glob
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MD_ROOT = os.path.join(BASE_DIR, "public", "Senior Level")
OUTPUT_JSON = os.path.join(BASE_DIR, "src", "components", "senior", "config", "seniorBookData.json")

def get_section(content, sec_title):
    pattern = rf"##\s+{re.escape(sec_title)}(.*?)(?=##\s+\d+\.|\Z)"
    m = re.search(pattern, content, re.DOTALL)
    return m.group(1).strip() if m else ""

def clean_markdown_text(text):
    return text.strip()

def parse_lesson_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine grade, chapter, lesson
    rel = os.path.relpath(file_path, MD_ROOT)
    parts = rel.split(os.sep)
    grade = parts[0] # "Class 9"
    grade_num = int(re.search(r"\d+", grade).group(0))

    chap_folder = parts[1] # "Chapter 1 - AI Basics"
    chap_m = re.search(r"Chapter\s+(\d+)\s*-\s*(.+)", chap_folder)
    chap_num = int(chap_m.group(1)) if chap_m else 1
    chap_title = chap_m.group(2).strip() if chap_m else chap_folder

    les_file = parts[2] # "Lesson 1 - From Data to Intelligence.md"
    les_m = re.search(r"Lesson\s+(\d+)\s*-\s*(.+)\.md", les_file)
    les_num = int(les_m.group(1)) if les_m else 1
    les_title = les_m.group(2).strip() if les_m else les_file

    # Extract sections
    s1 = get_section(content, "1. Lesson Identity & Syllabus Mapping")
    s2 = get_section(content, "2. Learning Objectives & Prerequisites")
    s3 = get_section(content, "3. Real-World Mission / Problem Scenario")
    s4 = get_section(content, "4. Technical Explanations & Algorithmic Foundations")
    s5 = get_section(content, "5. Guided Demonstration & Mathematical / Computational Walkthrough")
    s6 = get_section(content, "6. Unique Interactive Game / Simulation Specification")
    s7 = get_section(content, "7. Practical Hands-On Coding Lab")
    s8 = get_section(content, "8. Olympiad-Level Examination Questions")
    s9 = get_section(content, "9. Answer Keys & In-Depth Technical Solutions")
    s10 = get_section(content, "10. Evaluation Rubric & Measurable Completion Metrics")
    s11 = get_section(content, "11. Responsible AI, Ethics & Societal Impact")
    s12 = get_section(content, "12. Gamification Achievements & Progression Mechanics")

    # Metadata
    strand_m = re.search(r"\*\*Official Syllabus Strand:\*\*\s*(.*)", s1)
    strand = strand_m.group(1).strip() if strand_m else "AI Foundations"

    vocab_m = re.search(r"\*\*Key Concepts & Vocabulary:\*\*\s*(.*)", s1)
    vocab = [v.strip() for v in vocab_m.group(1).split(",") if v.strip()] if vocab_m else []

    # Learning Objectives
    obj_lines = re.findall(r"^-\s+(.*)", s2, re.MULTILINE)
    objectives = [o.strip() for o in obj_lines if not o.startswith("**") and len(o.strip()) > 5][:5]

    # Mission
    mission_title_m = re.search(r"### Mission Brief:\s*\*?(.*?)\*?\n", s3)
    mission_title = mission_title_m.group(1).strip() if mission_title_m else f"Mission: {les_title}"
    mission_body = re.sub(r"### Mission Brief:[^\n]*\n", "", s3).strip()

    # Simulation spec
    sim_title_m = re.search(r"### Simulation Experience:\s*\*?(.*?)\*?\n", s6)
    sim_title = sim_title_m.group(1).strip() if sim_title_m else f"Simulation: {les_title}"
    sim_body = re.sub(r"### Simulation Experience:[^\n]*\n", "", s6).strip()

    # Code Lab
    code_match = re.search(r"```python(.*?)```", s7, re.DOTALL)
    py_code = code_match.group(1).strip() if code_match else "# Code sample"
    
    output_match = re.search(r"```(?:text)?(.*?)```", s7[code_match.end():] if code_match else "", re.DOTALL)
    expected_output = output_match.group(1).strip() if output_match else "Execution verified."

    code_title_m = re.search(r"### Lab Assignment:\s*(.*)", s7)
    code_title = code_title_m.group(1).strip() if code_title_m else f"Python Lab: {les_title}"

    # Olympiad Questions (4 questions)
    q_blocks = re.findall(r"### Question\s+(\d+)[^\n]*\n(.*?)(?=### Question|\Z)", s8, re.DOTALL)
    sol_blocks = re.findall(r"### Question\s+(\d+)\s+Solution[^\n]*\n(.*?)(?=### Question|\Z)", s9, re.DOTALL)

    solutions_dict = {}
    for snum, stext in sol_blocks:
        ans_m = re.search(r"\*\*Correct Answer:\*\*\s*(?:Option\s*)?\*?\*?([A-D])\*?\*?", stext)
        correct_opt = ans_m.group(1) if ans_m else "A"
        exp_m = re.search(r"\*\*Detailed Explanation & Error Analysis:\*\*\s*(.*)", stext, re.DOTALL)
        exp_text = exp_m.group(1).strip() if exp_m else stext.strip()
        solutions_dict[int(snum)] = {
            "correctOption": correct_opt,
            "explanation": exp_text
        }

    olympiad_questions = []
    for qnum_str, qtext in q_blocks:
        qnum = int(qnum_str)
        # Parse options
        opts_raw = re.findall(r"-\s*\*\*\(?([A-D])\)?\*\*\s*(.*)", qtext)
        options = []
        for letter, opt_txt in opts_raw:
            options.append({
                "key": letter,
                "text": opt_txt.strip()
            })
        
        # Stem is the text before options
        stem_lines = []
        for line in qtext.strip().split("\n"):
            if re.match(r"^-\s*\*\*\(?[A-D]\)?\*\*", line.strip()):
                break
            stem_lines.append(line.strip())
        stem = " ".join([l for l in stem_lines if l]).strip()

        sol = solutions_dict.get(qnum, {"correctOption": "A", "explanation": "See authoritative answer key."})
        olympiad_questions.append({
            "questionNumber": qnum,
            "stem": stem,
            "options": options,
            "correctOption": sol["correctOption"],
            "explanation": sol["explanation"]
        })

    # Responsible AI Reflection
    refl_m = re.search(r"### [^\n]*Case Study[^\n]*\n(.*?)(?=###|\Z)", s11, re.DOTALL)
    refl_text = refl_m.group(1).strip() if refl_m else s11[:400]

    # Rubric
    rubric_m = re.search(r"\| Level \| Description \|.*?\| Exemplary \| (.*?) \|.*?\| Proficient \| (.*?) \|.*?\| Developing \| (.*?) \|", s10, re.DOTALL)
    rubric = {
        "exemplary": rubric_m.group(1).strip() if rubric_m else "Mastery of theoretical and computational AI concepts with full synthesis.",
        "proficient": rubric_m.group(2).strip() if rubric_m else "Accurate implementation and correct mathematical analysis.",
        "developing": rubric_m.group(3).strip() if rubric_m else "Partial code implementation needing architectural refinement."
    }

    # Gamification
    badge_m = re.search(r"\*\*Mastery Badge:\*\*\s*(.*)", s12)
    badge_title = badge_m.group(1).strip() if badge_m else f"{les_title} Champion"
    xp_m = re.search(r"\*\*Base XP:\*\*\s*(\d+)", s12)
    xp_reward = int(xp_m.group(1)) if xp_m else 300

    # Determine simulation engine archetype
    sim_type = "interactive_simulator"
    title_lower = les_title.lower() + " " + chap_title.lower()
    if "prompt" in title_lower or "trace" in title_lower or "communicate" in title_lower:
        sim_type = "trace_prompt_studio"
    elif "predict" in title_lower or "data" in title_lower or "learn" in title_lower or "neural" in title_lower:
        sim_type = "neural_decision_playground"
    elif "bias" in title_lower or "responsible" in title_lower or "ethic" in title_lower or "footprint" in title_lower:
        sim_type = "bias_fairness_auditor"
    elif "turbin" in title_lower or "work" in title_lower or "planet" in title_lower or "industry" in title_lower or "public good" in title_lower:
        sim_type = "telemetry_operations_matrix"
    elif "agent" in title_lower or "autonomous" in title_lower or "future" in title_lower or "career" in title_lower:
        sim_type = "agent_decision_lab"
    elif "tool" in title_lower or "studio" in title_lower or "research" in title_lower:
        sim_type = "feature_vector_explorer"
    else:
        sim_type = "neural_decision_playground"

    return {
        "grade": grade,
        "gradeNumber": grade_num,
        "chapterNumber": chap_num,
        "chapterTitle": chap_title,
        "lessonNumber": les_num,
        "lessonTitle": les_title,
        "strand": strand,
        "vocab": vocab,
        "objectives": objectives,
        "mission": {
            "title": mission_title,
            "body": mission_body
        },
        "theory": {
            "fullText": s4,
        },
        "walkthrough": {
            "fullText": s5,
        },
        "simulation": {
            "type": sim_type,
            "title": sim_title,
            "spec": sim_body
        },
        "codeLab": {
            "title": code_title,
            "code": py_code,
            "expectedOutput": expected_output
        },
        "olympiad": olympiad_questions,
        "reflection": {
            "text": refl_text,
            "rubric": rubric,
            "badgeTitle": badge_title,
            "xpReward": xp_reward
        }
    }

def main():
    print(f"Scanning markdown lessons in: {MD_ROOT}")
    files = sorted(glob.glob(os.path.join(MD_ROOT, "Class *", "Chapter *", "Lesson *.md")))
    print(f"Found {len(files)} files.")

    lessons = []
    for f in files:
        data = parse_lesson_file(f)
        lessons.append(data)

    # Sort strictly: Class 9 -> Class 10 -> Class 11 -> Class 12, then Chapter 1..6, Lesson 1..2
    lessons.sort(key=lambda x: (x["gradeNumber"], x["chapterNumber"], x["lessonNumber"]))

    # Now create 7 interactive screens for each lesson (total 48 * 7 = 336 screens)
    screens = []
    screen_counter = 1

    SCREEN_STAGES = [
        ("mission_briefing", "Mission Briefing & Real-World Hook", 1),
        ("deep_theory", "Core Theory & Algorithmic Architecture", 2),
        ("guided_walkthrough", "Mathematical Walkthrough & Demonstration", 3),
        ("interactive_simulation", "Interactive Gamified Cyber-Simulation", 4),
        ("python_code_lab", "Hands-On Python Sandbox & Live Runner", 5),
        ("olympiad_arena", "Olympiad Examination Challenge Arena", 6),
        ("responsible_ai_debrief", "Responsible AI Audit & Mastery Debrief", 7),
    ]

    for les in lessons:
        lesson_id = f"g{les['gradeNumber']}-c{les['chapterNumber']}-l{les['lessonNumber']}"

        for stage_type, stage_title, step_num in SCREEN_STAGES:
            screen_item = {
                "id": f"{lesson_id}-s{step_num}",
                "screenIndex": screen_counter - 1,
                "screenNumber": screen_counter,
                "stepNumber": step_num,
                "totalLessonSteps": 7,
                "stageType": stage_type,
                "stageTitle": stage_title,
                "grade": les["grade"],
                "gradeNumber": les["gradeNumber"],
                "chapterNumber": les["chapterNumber"],
                "chapterTitle": les["chapterTitle"],
                "lessonNumber": les["lessonNumber"],
                "lessonTitle": les["lessonTitle"],
                "strand": les["strand"],
                "vocab": les["vocab"],
                "lesson": les
            }
            screens.append(screen_item)
            screen_counter += 1

    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as out_fp:
        json.dump({
            "version": "2.0-SeniorGamified",
            "totalLessons": len(lessons),
            "totalScreens": len(screens),
            "lessons": lessons,
            "screens": screens
        }, out_fp, indent=2)

    print(f"Generated {len(screens)} screens across {len(lessons)} lessons.")
    print(f"Saved to: {OUTPUT_JSON} (File size: {os.path.getsize(OUTPUT_JSON):,} bytes)")

if __name__ == "__main__":
    main()
