# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = "public/content/middle/middle-class8-ch1-l2.json"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()
    data = json.loads(text)

lines = len(text.splitlines())
words = len(text.split())

print(f"Total Lines: {lines}")
print(f"Total Words: {words}")

checks = [
    ("lessonId == 'l2'", data.get("lessonId") == "l2"),
    ("title == 'Learning from Data'", data.get("title") == "Learning from Data"),
    ("level == 'middle'", data.get("level") == "middle"),
    ("class == 'class8'", data.get("class") == "class8"),
    ("chapter == 'ch1'", data.get("chapter") == "ch1"),
    ("Mascot Mentor Cipher", data.get("mascot", {}).get("name") == "Cipher"),
    ("Lines >= 1200", lines >= 1200),
    ("Words >= 12000", words >= 12000),
    (
        "Image Placeholder 1 (Decomposing song into audio features)",
        "[IMAGE_PLACEHOLDER: Music player screen decomposing a song into audio features: tempo (BPM), acousticness, energy, danceability]" in text
    ),
    (
        "Image Placeholder 2 (Cluster diagram showing similar songs grouping)",
        "[IMAGE_PLACEHOLDER: Cluster diagram showing similar songs grouping together based on shared mathematical attributes]" in text
    ),
    (
        "Image Placeholder 3 (Interactive feature extraction slider)",
        "[IMAGE_PLACEHOLDER: Interactive feature extraction slider allowing students to tweak song attributes]" in text
    ),
    (
        "Toast tap_prompt",
        "Adjust the energy slider to match upbeat sports workout tracks." in text
    ),
    (
        "Toast great_job",
        "Feature match confirmed! High-energy acoustic tracks clustered into the playlist." in text
    ),
    (
        "Toast try_again",
        "Slow classical piano tracks have low energy and acoustic scores." in text
    ),
    (
        "Real-life example: Spotify Discover Weekly",
        "spotify discover weekly" in text.lower()
    ),
    (
        "Real-life example: YouTube Music acoustic & pop",
        "youtube music" in text.lower() and "acoustic" in text.lower()
    ),
    (
        "Real-life example: Movie streaming director and pacing",
        "director" in text.lower() and "pacing" in text.lower()
    ),
    (
        "Activity: Music Feature Clustering Lab",
        data.get("activities", [{}])[0].get("title") == "Music Feature Clustering Lab"
    ),
    (
        "Section 1: Feature Extraction",
        any("feature" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 2: Clustering Similar Items",
        any("cluster" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Section 3: Playlist Generation / Recommendation",
        any("playlist" in s.get("title", "").lower() or "recommendation" in s.get("title", "").lower() for s in data.get("sections", []))
    ),
    (
        "Clean visual style (zero emoji spam)",
        text.count("🚀") == 0 and text.count("🎉") == 0 and text.count("🐶") == 0 and text.count("🎯") == 0
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
