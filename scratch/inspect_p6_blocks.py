import pymupdf
import json
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = pymupdf.open(pdf_path)

# Let's inspect page 6 drawings and images
p6 = doc[5] # 0-indexed, page 6
print("Page 6 rect:", p6.rect)
blocks = p6.get_text("blocks")
print(f"Page 6 text blocks ({len(blocks)}):")
for b in blocks:
    print(f"  bbox: ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}) -> {repr(b[4][:40])}")

