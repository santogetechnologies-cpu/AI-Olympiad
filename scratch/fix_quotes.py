import re

def fix_file(fname):
    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    fixed = []
    for i, line in enumerate(lines):
        # If line is like: key: '...words...'
        # look for unescaped apostrophes inside: e.g. student's, grandmother's, child's, isn't, don't, etc.
        # specifically between an opening single quote and closing single quote
        m = re.match(r"^(\s*[a-zA-Z0-9_]+:\s*')(.*)('(?:,)?\s*)$", line)
        if m:
            prefix = m.group(1)
            inner = m.group(2)
            suffix = m.group(3)
            # escape any unescaped single quote inside inner
            # an unescaped single quote is not preceded by a backslash
            fixed_inner = re.sub(r"(?<!\\)'", r"\'", inner)
            if fixed_inner != inner:
                print(f"Fixed {fname}:{i+1}")
                line = prefix + fixed_inner + suffix
        fixed.append(line)
        
    with open(fname, 'w', encoding='utf-8') as f:
        f.writelines(fixed)

fix_file('src/services/curriculumTopicProfilesClass4.ts')
fix_file('src/services/curriculumTopicProfilesClass5.ts')
print("Done fixing quotes.")
