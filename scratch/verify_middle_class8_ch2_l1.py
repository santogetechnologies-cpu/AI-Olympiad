# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = "public/content/middle/middle-class8-ch2-l1.json"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())

print(f"Total Lines: {lines}")
print(f"Total Words: {words}")

checks = [
    ("lessonId == 'l1'", data.get("lessonId") == "l1"),
    ("title == 'Python Playground'", data.get("title") == "Python Playground"),
    ("level == 'middle'", data.get("level") == "middle"),
    ("class == 'class8'", data.get("class") == "class8"),
    ("chapter == 'ch2'", data.get("chapter") == "ch2"),
    ("Mascot Mentor Cipher", data.get("mascot", {}).get("name") == "Cipher"),
    ("Lines >= 1200", lines >= 1200),
    ("Words >= 12000", words >= 12000),
    (
        "Image Placeholder 1 (Visual flow diagram while-loop 10-second sports timer)",
        "[IMAGE_PLACEHOLDER: Visual flow diagram showing a while-loop counting down a 10-second sports timer]" in text
    ),
    (
        "Image Placeholder 2 (Illustrated labeled boxes playerName, score, highscore)",
        "[IMAGE_PLACEHOLDER: Illustrated labeled boxes showing variables storing playerName, score, and highscore]" in text
    ),
    (
        "Image Placeholder 3 (Interactive logic blocks Repeat 5 times -> Ring school bell)",
        "[IMAGE_PLACEHOLDER: Interactive logic blocks showing: Repeat 5 times -> Ring school bell]" in text
    ),
    (
        "Toast tap_prompt",
        "Connect the loop block to repeat the bell chime 3 times." in text
    ),
    (
        "Toast great_job",
        "Loop executed! The bell rang exactly 3 times without repeating indefinitely." in text
    ),
    (
        "Toast try_again",
        "Ensure a stop condition is defined to prevent infinite repetition." in text
    ),
    (
        "Real-life example: Microwave timer counting down",
        "microwave" in text.lower() and "timer" in text.lower()
    ),
    (
        "Real-life example: Pedometer step counter foot strike",
        "pedometer" in text.lower() and "step" in text.lower()
    ),
    (
        "Real-life example: Game character jumping spacebar",
        "spacebar" in text.lower() and "jump" in text.lower()
    ),
    (
        "Activity: Interactive Sports Countdown Engine",
        data.get("activities", [{}])[0].get("title") == "Interactive Sports Countdown Engine"
    ),
    (
        "Section 1: Variables as Memory Boxes",
        any("variable" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 2: Condition Forks",
        any("condition" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 3: Repetition Loops",
        any("loop" in s.get("title", "").lower() for s in data.get("sections", []))
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
