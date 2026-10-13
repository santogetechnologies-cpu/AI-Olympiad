# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = "public/content/middle/middle-class8-ch1-l1.json"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())

print(f"Total Lines: {lines}")
print(f"Total Words: {words}")

checks = [
    ("lessonId == 'l1'", data.get("lessonId") == "l1"),
    ("title == 'How AI Makes Choices'", data.get("title") == "How AI Makes Choices"),
    ("level == 'middle'", data.get("level") == "middle"),
    ("class == 'class8'", data.get("class") == "class8"),
    ("chapter == 'ch1'", data.get("chapter") == "ch1"),
    ("Mascot Mentor Cipher", data.get("mascot", {}).get("name") == "Cipher"),
    ("Lines >= 1200", lines >= 1200),
    ("Words >= 12000", words >= 12000),
    (
        "Image Placeholder 1 (Student checking weather)",
        "[IMAGE_PLACEHOLDER: Student checking outdoor weather before picking school gear]" in text
    ),
    (
        "Image Placeholder 2 (Flowing branching tree diagram)",
        "[IMAGE_PLACEHOLDER: Flowing branching decision tree diagram showing choices based on weather, temperature, and weekend plans]" in text
    ),
    (
        "Image Placeholder 3 (Visual decision tree raining)",
        "[IMAGE_PLACEHOLDER: Visual decision tree showing: Is it raining? -> Yes -> Wear raincoat / No -> Wear regular uniform]" in text
    ),
    (
        "Image Placeholder 4 (Balancing scale humidity vs day of week)",
        "[IMAGE_PLACEHOLDER: Balancing scale graphic showing heavy factors like humidity vs light factors like day of the week]" in text
    ),
    (
        "Image Placeholder 5 (Confidence score 94% match)",
        "[IMAGE_PLACEHOLDER: UI screenshot showing an AI recommendation displaying confidence score: 94% match]" in text
    ),
    (
        "Image Placeholder 6 (Alert dialog confidence 45%)",
        "[IMAGE_PLACEHOLDER: Alert dialog displaying: 'Confidence 45% - Please confirm with user' alongside medical or banking decisions]" in text
    ),
    (
        "Image Placeholder 7 (Interactive decision tree builder)",
        "[IMAGE_PLACEHOLDER: Interactive decision tree builder with drag-and-drop condition branches]" in text
    ),
    (
        "Image Placeholder 8 (Interactive node-linking canvas)",
        "[IMAGE_PLACEHOLDER: Interactive node-linking canvas with branch condition blocks and outcome cards]" in text
    ),
    (
        "Toast tap_prompt",
        "Follow the decision branch: Is temperature below 18°C? Select Yes or No." in text
    ),
    (
        "Toast great_job",
        "Decision path verified! The system recommended a warm jacket based on weighted weather clues." in text
    ),
    (
        "Toast try_again",
        "Re-evaluate the condition threshold before taking the branch." in text
    ),
    (
        "Real-life example: E-Commerce cricket recommendation",
        "cricket pads and batting gloves" in text.lower() and "cricket bat" in text.lower()
    ),
    (
        "Real-life example: Netflix sports documentary",
        "sports documentary" in text.lower() and "netflix" in text.lower()
    ),
    (
        "Real-life example: Spam filter lottery claim",
        "claim lottery prize immediately" in text.lower() and "junk folder" in text.lower()
    ),
    (
        "Real-life example: Medical symptom checker",
        "medical symptom checkers" in text.lower() and "cough" in text.lower()
    ),
    (
        "Activity 1: Decision Tree Branch Builder",
        data.get("activities", [{}])[0].get("title") == "Decision Tree Branch Builder"
    ),
    (
        "Activity 1 instruction: root question 'Is ground waterlogged?'",
        "Is ground waterlogged?" in str(data.get("activities", [{}])[0].get("instructions", []))
    ),
    (
        "Summary recap contains Cipher message",
        "Cipher: You learned how machines evaluate clues using decision trees and weighted scores." in data.get("summary", {}).get("recap", "")
    ),
    (
        "Summary key takeaways contains 3 required takeaways",
        "AI makes choices through weighted branching logic rather than intuition" in str(data.get("summary", {}).get("keyTakeaways", [])) and
        "Confidence percentages reflect how strongly evidence supports a conclusion" in str(data.get("summary", {}).get("keyTakeaways", [])) and
        "Human oversight remains essential when confidence levels are low" in str(data.get("summary", {}).get("keyTakeaways", []))
    ),
    (
        "Clean visual style (zero emoji spam)",
        text.count("🚀") == 0 and text.count("🎉") == 0 and text.count("🐶") == 0
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
