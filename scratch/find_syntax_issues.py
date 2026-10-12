import subprocess
import re

files = [
    'src/services/curriculumTopicProfilesClass4.ts',
    'src/services/curriculumTopicProfilesClass5.ts'
]

# First, fix line 1563 in Class 4:
with open('src/services/curriculumTopicProfilesClass4.ts', 'r', encoding='utf-8') as f:
    c4 = f.read()

c4 = c4.replace(
    "Ask an AI helper: \"Suggest 3 pairs of rhyming words for 'Bear' and 'Care' in a fable about sharing fruit.\"",
    "Ask an AI helper: \\\"Suggest 3 pairs of rhyming words for Bear and Care in a fable about sharing fruit.\\\""
)
with open('src/services/curriculumTopicProfilesClass4.ts', 'w', encoding='utf-8') as f:
    f.write(c4)

# Let's check for any other lines with single quotes inside single quotes
for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for idx, line in enumerate(lines):
        # find if there is an unescaped ' inside a single-quoted string
        # e.g. line starts with spaces + '...' or spaces + key: '...'
        m = re.match(r"^(\s*(?:[a-zA-Z0-9_]+:\s*)?')([^']*)'([^'\n]*)'([^'\n]*)'(.*)$", line)
        if m:
            print(f"Possible inner quote at {fname}:{idx+1}: {line.strip()[:110]}")
