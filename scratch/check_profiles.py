import sys, re
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['src/services/curriculumTopicProfilesClass4.ts', 'src/services/curriculumTopicProfilesClass5.ts', 'src/services/curriculumTopicProfiles.ts']:
    try:
        with open(fname, encoding='utf-8') as f:
            content = f.read()
            keys = re.findall(r"^\s*'([^']+)':\s*\{", content, re.MULTILINE)
            print(f"=== {fname} (length {len(content)}) ===")
            print("Keys found:", keys)
    except Exception as e:
        print(f"Error {fname}: {e}")
