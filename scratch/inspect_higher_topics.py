import re

with open('src/services/curriculumTopicProfilesHigher.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

topics = []
for line in lines:
    m = re.match(r"^\s*'([^']+)':\s*\{", line)
    if m:
        topics.append(m.group(1))

print(f"Total topics in curriculumTopicProfilesHigher.ts: {len(topics)}")
for i, t in enumerate(topics):
    print(f"{i+1}. {t}")
