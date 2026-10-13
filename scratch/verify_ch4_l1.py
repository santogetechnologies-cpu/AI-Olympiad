import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("public/content/junior/junior-class5-ch4-l1.json", "r", encoding="utf-8") as f:
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
with open("public/content/junior/junior-class5-ch4-l1.json", "r", encoding="utf-8") as f:
    text = f.read()
lines = len(text.splitlines())
words = len(text.split())
print(f"Total Lines: {lines} (Req: >1200) => {lines >= 1200}")
print(f"Total Words: {words} (Req: ~12000) => {words >= 12000}")

print("\n=== EXACT PROMPT REQUIREMENTS ===")
checks = [
    "🩺", "🍦", "🌾", "🎨", "👨‍🍳", "👩‍🌾", "🚀", "🌟",
    "BEEP BOOP! AI is like a magic pencil—it doesn't replace the artist, it helps you draw wonders!",
    '"tap_prompt": "👇 Pair Chef Raj with the AI Recipe Flavor Generator!"',
    '"great_job": "🍦 YUMMY SUCCESS! Mango-cardamom ice cream invented!"',
    '"try_again": "🌾 Drones help farmers watch crops from the sky—connect drone to farmer!"',
    "Swiggy delivery captains using GPS route AI",
    "architects using 3D house modeling AI",
    "fashion designers creating virtual dresses",
    "Dream Job + AI Sidekick Match Board 🦸🤖",
    "Doctor + AI = Saves more lives",
    "Chef + AI = invents yummy new ice cream flavors",
    "Farmer + AI = waters crops with smart drones",
    "Artist + AI = paints cosmic animated galaxies"
]

for c in checks:
    status = c in text or c.lower() in text.lower()
    print(f"Check [{c[:50]}]: {status}")
