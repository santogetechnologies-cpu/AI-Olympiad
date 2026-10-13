import json
import sys

sys.stdout.reconfigure(encoding="utf-8")
with open("public/content/junior/junior-class5-ch2-l1.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print("Root title present:", "title" in d)
print("Root lessonTitle present:", "lessonTitle" in d)

txt = json.dumps(d, ensure_ascii=False)
items = [
    "IF hungry 🍎 THEN eat",
    "IF raining 🌧️ THEN open umbrella ☂️",
    "IF traffic light RED 🔴 THEN stop 🛑",
    "IF homework done 📚 THEN playtime 🎮",
    "BEEP BOOP! Computers think with magic IF-THEN rules! Let's crack the logic code!",
    "Traffic Light & Daily Routine Logic Builder 🚦",
    "Smart streetlights turning ON if the sun sets",
    "refrigerator beeping if door stays open for 1 minute",
    "automatic soap dispenser pumping soap if hand is placed under it",
    '"tap_prompt": "👇 Complete the rule: IF the alarm rings at 7 AM THEN..."',
    '"great_job": "⏰ WAKE UP & SMILE! Perfect IF-THEN rule!"',
    '"try_again": "🌧️ If it rains, you need an umbrella, not sunglasses!"'
]

for item in items:
    print(f"Checking {item[:45]}... => {item in txt}")
