import fitz # PyMuPDF
import json
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Print Table of Contents
toc = doc.get_toc()
print(f"Table of contents: {toc}")

# Print first 10 pages text summary
for i in range(min(15, len(doc))):
    page = doc[i]
    text = page.get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    first_few = " | ".join(lines[:6]) if lines else "EMPTY"
    print(f"--- Page {i+1} ({len(lines)} lines) ---")
    print(first_few[:200])

