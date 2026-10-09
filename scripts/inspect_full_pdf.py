import json

with open('scratch/pdf_pages_summary.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p in pages:
    page_num = p['page']
    lines = p['lines']
    hdr = ' | '.join(lines[:4]) if lines else 'COVER/EMPTY'
    print(f"P{page_num:03d}: {hdr}")
