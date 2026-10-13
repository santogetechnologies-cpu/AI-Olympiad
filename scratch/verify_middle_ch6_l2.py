import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('public/content/middle/middle-class6-ch6-l2.json', 'r', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())
print(f"Lines: {lines}")
print(f"Words: {words}")

checks = [
    ("lessonId == l2", data.get("lessonId") == "l2"),
    ("title == Think Before You Trust", data.get("title") == "Think Before You Trust"),
    ("level == middle", data.get("level") == "middle"),
    ("class == class6", data.get("class") == "class6"),
    ("chapter == ch6", data.get("chapter") == "ch6"),
    ("Mascot Mentor Algo", data.get("mascot", {}).get("name") == "Algo"),
    ("Image Placeholder 1", "[IMAGE_PLACEHOLDER: Split comparison showing authentic video vs synthetic deepfake video with artifacts]" in text),
    ("Image Placeholder 2", "[IMAGE_PLACEHOLDER: Verification flowchart: Source check, date check, secondary news confirmation]" in text),
    ("Image Placeholder 3", "[IMAGE_PLACEHOLDER: Official PIB Fact Check banner disproving a viral message]" in text),
    ("Toast tap_prompt", "Run the 3-step fact check before forwarding the viral video." in text),
    ("Toast great_job", "Verification complete! Video was proven to be synthetic media from an old event." in text),
    ("Toast try_again", "Pause before forwarding: Check if any major verified news portal reported this." in text),
    ("Real-life example 1: schools closed fake holiday", "viral whatsapp forward claiming schools closed on a fake holiday" in text.lower()),
    ("Real-life example 2: voice clone relative in distress", "ai voice clone pretending to be a relative in distress" in text.lower()),
    ("Real-life example 3: government pib fact-check portal", "government pib fact-check portal" in text.lower()),
    ("Activity: Fact Checker Media Verification Lab", "Fact Checker Media Verification Lab" in text),
    ("Section on Synthetic Media Detection", any("synthetic" in s.get("title", "").lower() or "deepfake" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
    ("Section on Verification Habits", any("verification" in s.get("title", "").lower() or "hoax" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
    ("Section on Responsible Digital Citizenship", any("citizenship" in s.get("title", "").lower() or "responsible" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
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
