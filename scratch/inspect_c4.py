import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    c4 = f.read()

# Check keys and sample first key
print("Class 4 sample length:", len(c4))
first_key_idx = c4.find("'where is ai hiding?':")
second_key_idx = c4.find("'meet the smart machines':")
print("First key preview:")
print(c4[first_key_idx:first_key_idx+1500])
