import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

ws_pages = [27, 50, 73, 96, 119, 142]
for p_num in ws_pages:
    p = pages[p_num - 1]
    print(f"=== WORD SEARCH P{p_num} ===")
    lines = [b['text'].replace('\n', ' ') for b in p['blocks']]
    for l in lines[:10]:
        print("  ", l)
