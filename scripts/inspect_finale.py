import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p_num in range(143, 150):
    p = pages[p_num - 1]
    print(f"=== PAGE {p_num} ===")
    for b in p['blocks']:
        print("  ", b['text'].replace('\n', ' ')[:100])
