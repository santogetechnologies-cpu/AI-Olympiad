import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p in pages[149:]:
    print(f"=== PAGE {p['page_number']} ===")
    for b in p['blocks']:
        t = b['text'].replace('\n', ' ')
        print(f"  {t[:120]}")
