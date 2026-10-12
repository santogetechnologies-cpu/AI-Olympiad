import re

def fix_inner_quotes(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed_lines = []
    fixed_count = 0

    for i, line in enumerate(lines):
        orig = line
        # Match lines like: 'Some text 'Word' more text',
        # or '... 'Word' ...'
        # Let's inspect if line starts with indentation and `'` and ends with `',` or `'`
        m = re.match(r"^(\s*')([^'\n]+)('(?:\s*,)?\s*)$", line)
        if not m:
            # Maybe it has inner single quotes!
            # e.g., ^(\s*')(.+)('(?:\s*,)?\s*)$
            # If the line starts with spaces + ' and ends with ' or ',
            m2 = re.match(r"^(\s*')(.*)('(?:\s*,)?\s*)$", line)
            if m2:
                prefix = m2.group(1)
                inner = m2.group(2)
                suffix = m2.group(3)
                # If inner has any unescaped single quote:
                if "'" in inner:
                    # Escape all unescaped single quotes
                    fixed_inner = re.sub(r"(?<!\\)'", r"\'", inner)
                    if fixed_inner != inner:
                        line = prefix + fixed_inner + suffix
                        fixed_count += 1
                        print(f"Fixed string item in {filepath}:{i+1}")
            else:
                # Check for property: key: '... inner 'word' ...'
                m3 = re.match(r"^(\s*[a-zA-Z0-9_]+:\s*')(.*)('(?:\s*,)?\s*)$", line)
                if m3:
                    prefix = m3.group(1)
                    inner = m3.group(2)
                    suffix = m3.group(3)
                    if "'" in inner:
                        fixed_inner = re.sub(r"(?<!\\)'", r"\'", inner)
                        if fixed_inner != inner:
                            line = prefix + fixed_inner + suffix
                            fixed_count += 1
                            print(f"Fixed property item in {filepath}:{i+1}")

        fixed_lines.append(line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)
    print(f"Total fixed in {filepath}: {fixed_count}")

fix_inner_quotes('src/services/curriculumTopicProfilesClass4.ts')
fix_inner_quotes('src/services/curriculumTopicProfilesClass5.ts')
