import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("public/content/junior/junior-class5-ch3-l1.json", "r", encoding="utf-8") as f:
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
with open("public/content/junior/junior-class5-ch3-l1.json", "r", encoding="utf-8") as f:
    text = f.read()
lines = len(text.splitlines())
words = len(text.split())
print(f"Total Lines: {lines} (Req: >1200) => {lines >= 1200}")
print(f"Total Words: {words} (Req: ~12000) => {words >= 12000}")

print("\n=== EXACT PROMPT REQUIREMENTS ===")
checks = [
    "superhero x-ray eyes",
    "🏥", "🩺", "🦴", "👨‍⚕️", "👩‍⚕️", "💊", "💓", "🩹",
    "BEEP BOOP! AI helps doctors spot broken bones in half a second!",
    '"tap_prompt": "👇 Tap the glowing fracture on the bone X-ray to help Doctor Maya!"',
    '"great_job": "🦴 SPOTTED! The AI scanner circled the hairline crack so the doctor can put a plaster cast!"',
    '"try_again": "🔍 Look closer near the wrist bone!"',
    "thermometer beeping with fever",
    "smartwatch counting heartbeat during sports",
    "smart medicine reminder app playing chimes for Dadi",
    "Doctor's Superhero X-Ray Assistant 🦴🏥"
]

for c in checks:
    status = c.lower() in text.lower() if "tap_prompt" not in c and "great_job" not in c and "try_again" not in c else c in text
    print(f"Check [{c[:50]}]: {status}")
