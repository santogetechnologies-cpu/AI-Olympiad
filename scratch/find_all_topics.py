import json

with open(r"c:\Users\abish\OneDrive\Desktop\nanjilproject\scratch\class3_all_pages.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

print(f"Total pages: {len(pages)}")

topics = []
for p in pages:
    lines = [l.strip() for l in p['full_text'].split('\n') if l.strip()]
    for i, l in enumerate(lines):
        if "TOPIC" in l.upper():
            topics.append({
                "page": p['page_num'],
                "topic_line": l,
                "context": lines[max(0, i-1):min(len(lines), i+4)]
            })

print(f"Found {len(topics)} topic markers:")
for t in topics:
    print(f"Page {t['page']}: {t['topic_line']} -> {' / '.join(t['context'])}")
