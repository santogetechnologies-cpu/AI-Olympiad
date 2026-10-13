import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('public/content/junior/junior-class5-ch4-l2.json', 'r', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())
print(f"Lines: {lines}")
print(f"Words: {words}")

checks = [
    ("lessonId == l2", data.get("lessonId") == "l2"),
    ("title == Skills of Tomorrow", data.get("title") == "Skills of Tomorrow"),
    ("level == junior", data.get("level") == "junior"),
    ("class == class5", data.get("class") == "class5"),
    ("chapter == ch4", data.get("chapter") == "ch4"),
    ("Buddy quote in text", "BEEP BOOP! I can calculate 10,000 numbers in a blink, but I can never comfort a crying friend or share my tiffin box!" in text),
    ("tap_prompt in text", "👇 Tap the superpower that belongs ONLY to human children!" in text),
    ("great_job in text", "🤗 HEART POWER! Empathy and caring are human superpowers that machines will never have!" in text),
    ("try_again in text", "⚡ Fast calculation is a calculator skill—look for the warm hug!" in text),
    ("raincoat example", "raincoat" in text.lower()),
    ("lost a race example", "lost a race" in text.lower()),
    ("playground disagreement", "playground disagreement" in text.lower()),
    ("Human Superpower Trophy Showcase 🏆❤️", "Human Superpower Trophy Showcase 🏆❤️" in text),
    ("HEART emoji ❤️", "❤️" in text),
    ("KINDNESS emoji 🤗", "🤗" in text),
    ("TEAMWORK emoji 🤝", "🤝" in text),
    ("CREATIVITY emoji 🦄", "🦄" in text),
    ("LIGHTBULB emoji 💡", "💡" in text),
    ("CUPCAKE emoji 🧁", "🧁" in text),
    ("MEDAL emoji 🥇", "🥇" in text),
    ("RAINBOW emoji 🌈", "🌈" in text),
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
