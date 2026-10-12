import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    c4 = f.read()

import re
c4_lessons = re.findall(r"'([^']+)':\s*\{\s*title:\s*'([^']+)'", c4)
print("=== Class 4 Lessons in profile ===")
for k, t in c4_lessons:
    print(f"Key: {k} | Title: {t}")

with open('src/services/curriculumTopicProfilesClass5.ts', encoding='utf-8') as f:
    c5 = f.read()

c5_lessons = re.findall(r"'([^']+)':\s*\{\s*title:\s*'([^']+)'", c5)
print("\n=== Class 5 Lessons in profile ===")
for k, t in c5_lessons:
    print(f"Key: {k} | Title: {t}")
