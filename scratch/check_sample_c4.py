import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    c4 = f.read()

# Let's inspect 'say it clearly!' in class 4
idx = c4.find("'say it clearly!':")
print(c4[idx:idx+2500])
