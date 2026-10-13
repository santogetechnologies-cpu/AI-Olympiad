import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("public/content/junior/junior-class5-ch3-l2.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print("=== SCHEMA CHECKS ===")
print("lessonId:", d.get("lessonId"))
print("title:", d.get("title"))
print("lessonTitle:", d.get("lessonTitle"))
print("level:", d.get("level"))
print("class:", d.get("class"))
print("chapter:", d.get("chapter"))
print("mascot name:", d.get("mascot", {}).get("name"))
print("mascot catchphrase:", d.get("mascot", {}).get("catchphrase"))

print("\n=== METRIC CHECKS ===")
with open("public/content/junior/junior-class5-ch3-l2.json", "r", encoding="utf-8") as f:
    text = f.read()
lines = len(text.splitlines())
words = len(text.split())
print(f"Total Lines: {lines} (Req: >1200) => {lines >= 1200}")
print(f"Total Words: {words} (Req: ~12000) => {words >= 12000}")

print("\n=== EXACT PROMPT REQUIREMENTS ===")
checks = [
    "🏫", "🎒", "📐", "🧩", "📊", "🥇", "🎯", "💡",
    "BEEP BOOP! I adapt to YOU! No rush, no stress, just fun learning at your own pace!",
    '"tap_prompt": "👇 Tap the math puzzle matching your comfort level!"',
    '"great_job": "🎯 LEVEL UP! You conquered the easy puzzle, here comes a fun bonus challenge!"',
    '"try_again": "💡 No worries! Let\'s try an easier picture clue first!"',
    "Duolingo repeating tricky words you forgot",
    "Khan Academy giving hint videos when a math question is tough",
    "smartboards showing interactive 3D solar system models",
    "The Adaptive Quiz Level-Up Arena 🎯"
]

for c in checks:
    status = c in text
    print(f"Check [{c[:50]}]: {status}")
