import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("public/content/junior/junior-class5-ch2-l2.json", "r", encoding="utf-8") as f:
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
with open("public/content/junior/junior-class5-ch2-l2.json", "r", encoding="utf-8") as f:
    text = f.read()
lines = len(text.splitlines())
words = len(text.split())
print(f"Total Lines: {lines} (Req: >1200) => {lines >= 1200}")
print(f"Total Words: {words} (Req: ~12000) => {words >= 12000}")

print("\n=== EXACT PROMPT REQUIREMENTS ===")
checks = [
    'Draw a house',
    'Draw a red brick house with a blue door, smoking chimney, and a big mango tree with swings in the front yard',
    '🏡', '🌳', '🐶', '🎨', '🥪', '🗣️', '💬', '🌟',
    "BEEP BOOP! Words are your paintbrush! Paint with lots of juicy details!",
    '"tap_prompt": "👇 Add 3 juicy details to transform this plain dog into a royal puppy!"',
    '"great_job": "👑 WOW! A golden puppy wearing a shiny crown and red bowtie! Perfect prompt!"',
    '"try_again": "💭 \'Just dog\' is too plain! Add what color and what it\'s wearing!"',
    'I want food',
    'hot cheesy paneer pizza with extra corn',
    'ice cream',
    'lost backpack',
    'school guard',
    'Juicy Details Prompt Upgrade Studio 🎨✨'
]

for c in checks:
    status = c in text
    print(f"Check [{c[:50]}]: {status}")
