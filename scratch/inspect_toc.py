import os
import pypdf

folder = r'C:\Users\Admin\Downloads\12th to ug 2nd'
for f in os.listdir(folder):
    if f.endswith('.pdf'):
        p = os.path.join(folder, f)
        reader = pypdf.PdfReader(p)
        print("="*40)
        print(f, f"Pages: {len(reader.pages)}")
        # Check bookmarks / outline
        try:
            outline = reader.outline
            print("Outline items:", len(outline) if outline else "None")
        except Exception as e:
            print("Outline err:", e)
        # Extract text from page 1-6
        for page_num in range(min(6, len(reader.pages))):
            text = reader.pages[page_num].extract_text() or ""
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            print(f"--- Page {page_num+1} ({len(lines)} lines) ---")
            print("\n".join(lines[:10]))
