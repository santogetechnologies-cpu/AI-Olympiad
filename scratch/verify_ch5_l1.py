import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('public/content/junior/junior-class5-ch5-l1.json', 'r', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())
print(f"Lines: {lines}")
print(f"Words: {words}")

checks = [
    ("lessonId == l1", data.get("lessonId") == "l1"),
    ("title == AI Study Buddy", data.get("title") == "AI Study Buddy"),
    ("level == junior", data.get("level") == "junior"),
    ("class == class5", data.get("class") == "class5"),
    ("chapter == ch5", data.get("chapter") == "ch5"),
    ("Buddy quote in text", "BEEP BOOP! Don't understand long division? Let's slice it like a cheese pizza!" in text),
    ("tap_prompt in text", "👇 Ask Buddy to explain fractions with pizza slices!" in text),
    ("great_job in text", "🍕 DELICIOUS! 2 out of 4 slices = half the pizza! Fractions mastered!" in text),
    ("try_again in text", "💡 Want another explanation? Tap the Chocolate Bar button!" in text),
    ("spelling voice feedback example", "practicing english spelling words with voice feedback" in text.lower()),
    ("solar system orbits example", "learning solar system planets with interactive orbits" in text.lower()),
    ("flashcard memory games example", "flashcard memory games before exams" in text.lower()),
    ("The Pizza Fraction Study Arena 🍕", "The Pizza Fraction Study Arena 🍕" in text),
    ("Emoji 🍕", "🍕" in text),
    ("Emoji 📚", "📚" in text),
    ("Emoji ❓", "❓" in text),
    ("Emoji ⏰", "⏰" in text),
    ("Emoji 💡", "💡" in text),
    ("Emoji 🎒", "🎒" in text),
    ("Emoji 📝", "📝" in text),
    ("Emoji 🌟", "🌟" in text),
    ("Lines >= 1200", lines >= 1200),
    ("Words >= 12000", words >= 12000)
]

all_passed = True
for label, passed in checks:
    status = "PASS" if passed else "FAIL"
    if not passed:
        all_passed = False
    print(f"[{status}] {label}")

print(f"\nOverall result: {'ALL PASSED' if all_passed else 'SOME FAILED'}")
