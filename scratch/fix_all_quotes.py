import re

def fix_all_single_quotes_in_file(fname):
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace unescaped single quotes inside text: '...', q: '...', exp: '...', etc.
    # A robust regex or state machine:
    # Let's inspect any line with single quotes that might have syntax errors.
    lines = content.split('\n')
    new_lines = []
    fixed_count = 0

    for idx, line in enumerate(lines):
        # Check if line has unescaped apostrophe in words like don't, it's, dragon's, children's, wasn't, etc.
        # Or more generally: a single quote preceded by a letter and followed by a letter (contraction or possessive)
        # e.g., r"(?<=[a-zA-Z])'(?=[a-zA-Z])" -> r"\'"
        # Let's test if replacing letter'letter with letter\'letter fixes it.
        # But wait! Does JavaScript single quote string use \' ? Yes!
        # And if it is already \' it has a backslash before it, so (?<!\\)'
        new_line = re.sub(r"(?<!\\)(?<=[a-zA-Z])'(?=[a-zA-Z])", r"\'", line)
        if new_line != line:
            fixed_count += 1
            print(f"Fixed line {idx+1} in {fname}")
        new_lines.append(new_line)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Total fixed in {fname}: {fixed_count}")

fix_all_single_quotes_in_file('src/services/curriculumTopicProfilesClass4.ts')
fix_all_single_quotes_in_file('src/services/curriculumTopicProfilesClass5.ts')
