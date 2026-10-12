import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    lines = f.readlines()[:40]
print(''.join(lines))
