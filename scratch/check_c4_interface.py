import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    c4 = f.read()

# find interface
idx1 = c4.find('export interface')
idx2 = c4.find('export const', idx1)
print(c4[idx1:idx2])
