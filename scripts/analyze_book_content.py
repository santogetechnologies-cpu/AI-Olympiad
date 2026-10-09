import fitz
import json

doc = fitz.open('public/GAIO Class3 Book.pdf')

pages = []

for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    blocks = page.get_text('blocks')
    # blocks: list of (x0, y0, x1, y1, text, block_no, block_type)
    cleaned_blocks = []
    for b in blocks:
        b_text = b[4].strip()
        if b_text:
            cleaned_blocks.append({
                'bbox': [round(b[0], 1), round(b[1], 1), round(b[2], 1), round(b[3], 1)],
                'text': b_text
            })
    
    pages.append({
        'page_number': i + 1,
        'full_text': text,
        'blocks': cleaned_blocks
    })

with open('scratch/full_pdf_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(pages)} pages with detailed blocks into scratch/full_pdf_extracted.json")
