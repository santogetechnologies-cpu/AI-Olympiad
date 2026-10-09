import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Total extracted pages: {len(pages)}")

# Print topic titles and months
for p in pages:
    page_num = p['page_number']
    text = p['full_text']
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    if any('TOPIC' in l for l in lines) or any('MONTH' in l and 'COVER' not in l for l in lines) or page_num in [1, 2, 3, 4, 143, 145, 149, 150]:
        first_few = ' | '.join(lines[:3])
        print(f"P{page_num:03d}: {first_few[:100]}")
