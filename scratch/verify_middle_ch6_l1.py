import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('public/content/middle/middle-class6-ch6-l1.json', 'r', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())
print(f"Lines: {lines}")
print(f"Words: {words}")

checks = [
    ("lessonId == l1", data.get("lessonId") == "l1"),
    ("title == Protect Your Data", data.get("title") == "Protect Your Data"),
    ("level == middle", data.get("level") == "middle"),
    ("class == class6", data.get("class") == "class6"),
    ("chapter == ch6", data.get("chapter") == "ch6"),
    ("Mascot Mentor Algo", data.get("mascot", {}).get("name") == "Algo"),
    ("Image Placeholder 1", "[IMAGE_PLACEHOLDER: Smartphone app permissions modal showing flashlight app requesting suspicious contacts access]" in text),
    ("Image Placeholder 2", "[IMAGE_PLACEHOLDER: Visual guide contrasting weak predictable passwords with strong passphrases]" in text),
    ("Image Placeholder 3", "[IMAGE_PLACEHOLDER: Two-factor authentication verification prompt on mobile screen]" in text),
    ("Toast tap_prompt", "Audit permissions: Deny contacts and location access for the offline calculator." in text),
    ("Toast great_job", "Permission denied! Offline tools do not require access to your private phonebook." in text),
    ("Toast try_again", "Suspicious request: A flashlight app never requires access to location or contacts." in text),
    ("Real-life example 1: gaming apps location data", "free gaming apps collecting location data for ad networks" in text.lower()),
    ("Real-life example 2: two-factor school email", "setting up two-factor verification on school email" in text.lower()),
    ("Real-life example 3: protecting wi-fi passwords", "protecting wi-fi passwords at home" in text.lower()),
    ("Activity: Mobile Permissions Audit Inspector", "Mobile Permissions Audit Inspector" in text),
    ("Section on Mobile Permission Audits", any("permission" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
    ("Section on Privacy Trade-offs", any("free" in s.get("title", "").lower() or "illusion" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
    ("Section on Account Defense Strategies", any("account" in s.get("title", "").lower() or "fortifying" in s.get("title", "").lower() or "defense" in s.get("title", "").lower() for s in data.get("content", {}).get("sections", []))),
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
