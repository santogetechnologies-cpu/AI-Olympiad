import pymupdf
import json
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = pymupdf.open(pdf_path)

print(f"Total pages: {len(doc)}")

output_pages = []

for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    header = lines[0] if lines else ""
    topic_lines = [l for l in lines if "TOPIC" in l.upper() or "MONTH" in l.upper() or "CHAPTER" in l.upper() or "LET'S" in l.upper()]
    output_pages.append({
        "page_num": i + 1,
        "line_count": len(lines),
        "header": header,
        "topic_lines": topic_lines[:4],
        "first_5_lines": lines[:5],
        "full_text": text
    })

# Save full extracted text to json
with open(r"c:\Users\abish\OneDrive\Desktop\nanjilproject\scratch\class3_all_pages.json", "w", encoding="utf-8") as f:
    json.dump(output_pages, f, indent=2, ensure_ascii=False)

print("Saved scratch/class3_all_pages.json successfully!")

# Also let's inspect the first 25 pages specifically for Topic 1
with open(r"c:\Users\abish\OneDrive\Desktop\nanjilproject\scratch\topic1_overview.txt", "w", encoding="utf-8") as f:
    for p in output_pages[:20]:
        f.write(f"\n==================== PAGE {p['page_num']} ====================\n")
        f.write(p['full_text'])

print("Saved scratch/topic1_overview.txt successfully!")
