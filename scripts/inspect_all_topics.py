import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Inspect all topic titles and their page numbers
print("TOPICS OVERVIEW:")
for p in pages:
    txt = p['full_text']
    for line in txt.split('\n'):
        if 'TOPIC ' in line:
            print(f"P{p['page_number']:03d}: {line.strip()}")
            break
