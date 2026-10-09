import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Check Quiz pages: P14, P24, P37, P47, P60, P70, P83, P93, P106, P116, P129, P139
quiz_pages = [14, 24, 37, 47, 60, 70, 83, 93, 106, 116, 129, 139]
for qp in quiz_pages:
    p = pages[qp - 1]
    print(f"Quiz P{qp}: lines = {len(p['blocks'])}")
    qs = [b['text'].replace('\n', ' ') for b in p['blocks'] if 'Q' in b['text'] or '1.' in b['text']]
    print("  ", qs[:3])
