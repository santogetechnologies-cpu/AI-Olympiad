# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = "public/content/middle/middle-class8-ch2-l2.json"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())

print(f"Total Lines: {lines}")
print(f"Total Words: {words}")

checks = [
    ("lessonId == 'l2'", data.get("lessonId") == "l2"),
    ("title == 'Code a Solution'", data.get("title") == "Code a Solution"),
    ("level == 'middle'", data.get("level") == "middle"),
    ("class == 'class8'", data.get("class") == "class8"),
    ("chapter == 'ch2'", data.get("chapter") == "ch2"),
    ("Mascot Mentor Cipher", data.get("mascot", {}).get("name") == "Cipher"),
    ("Lines >= 1200", lines >= 1200),
    ("Words >= 12000", words >= 12000),
    (
        "Image Placeholder 1 (Student whiteboard mapping issue to solution stages)",
        "[IMAGE_PLACEHOLDER: Student problem-solving whiteboard mapping community issue to digital solution stages]" in text
    ),
    (
        "Image Placeholder 2 (UI wireframe of library book tracker)",
        "[IMAGE_PLACEHOLDER: UI wireframe of a school library book tracker showing days remaining before due date]" in text
    ),
    (
        "Image Placeholder 3 (Flow diagram Scan Student ID -> Calculate Return Date -> Send Reminder SMS)",
        "[IMAGE_PLACEHOLDER: Flow diagram: Scan Student ID -> Calculate Return Date -> Send Reminder SMS]" in text
    ),
    (
        "Toast tap_prompt",
        "Set the notification rule: IF due_date <= 2 days THEN send SMS reminder." in text
    ),
    (
        "Toast great_job",
        "Notification logic verified! Students receive friendly alerts before overdue fines accrue." in text
    ),
    (
        "Toast try_again",
        "Verify the calculation: Subtract checkout date from return date to find days remaining." in text
    ),
    (
        "Real-life example: School library automated return alerts",
        "school library" in text.lower() and "overdue" in text.lower()
    ),
    (
        "Real-life example: Community recycling reward point counters",
        "recycling" in text.lower() and "point" in text.lower()
    ),
    (
        "Real-life example: Cafeteria weekly meal planner balance",
        "cafeteria" in text.lower() and "balance" in text.lower()
    ),
    (
        "Activity: Library Alert Solution Architect",
        data.get("activities", [{}])[0].get("title") == "Library Alert Solution Architect"
    ),
    (
        "Section 1: Problem Identification",
        any("problem identification" in s.get("title", "").lower() or "decomposition" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 2: Logical Blueprinting",
        any("blueprint" in s.get("title", "").lower() or "algorithmic" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 3: User Testing & Edge Cases",
        any("testing" in s.get("title", "").lower() or "edge case" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Clean visual style (zero emoji spam)",
        text.count("🚀") == 0 and text.count("🎉") == 0 and text.count("🐶") == 0 and text.count("🎯") == 0
    )
]

all_passed = True
for label, passed in checks:
    status = "PASS" if passed else "FAIL"
    if not passed:
        all_passed = False
    print(f"[{status}] {label}")

print(f"\nOverall result: {'ALL PASSED' if all_passed else 'SOME FAILED'}")

if not all_passed:
    sys.exit(1)
