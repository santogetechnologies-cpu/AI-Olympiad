import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    c4 = f.read()

print("Class 4 total characters:", len(c4))
for key in ['where is ai hiding?', 'meet the smart machines', 'say it clearly!', 'mission: instructions',
            'ai in my mobile', 'ai on the move', 'future job hunt', 'my technology talent',
            'create a story', 'design with ai', 'secret or share?', 'ai: right or wrong?']:
    idx = c4.find(f"'{key}':")
    print(f"Key '{key}' exists: {idx != -1}")

with open('src/services/curriculumTopicProfilesClass5.ts', encoding='utf-8') as f:
    c5 = f.read()

print("Class 5 total characters:", len(c5))
for key in ['the secret behind ai', 'learning machines', 'crack the logic!', 'command to creation',
            'ai in the hospital', 'ai in the classroom', 'my future with ai', 'skills of tomorrow',
            'ai study buddy', 'ai creative corner', 'can ai be wrong?', 'be a smart ai user']:
    idx = c5.find(f"'{key}':")
    print(f"Key '{key}' exists: {idx != -1}")
