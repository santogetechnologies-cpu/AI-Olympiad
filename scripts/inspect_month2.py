import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Let's inspect pages 28 to 50 (Month 2)
print("=== MONTH 2 SAMPLE ===")
for p_num in [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 49, 50]:
    p = pages[p_num - 1]
    title = p['blocks'][1]['text'].replace('\n', ' ') if len(p['blocks']) > 1 else 'None'
    print(f"P{p_num}: {title[:80]}")
