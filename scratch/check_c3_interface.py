import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass3.ts', encoding='utf-8') as f:
    c3 = f.read()

idx1 = c3.find('export interface TopicProfile')
idx2 = c3.find('export const', idx1)
print(c3[idx1:idx2])
