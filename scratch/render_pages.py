import pymupdf
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
out_dir = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\class3_book_pages"
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)

# Let's render the first 25 pages (Cover, Welcome, Journey, and Topic 1 + Topic 2) at dpi=150
for p in range(25):
    page = doc[p]
    pix = page.get_pixmap(dpi=150)
    out_file = os.path.join(out_dir, f"page_{p+1}.png")
    pix.save(out_file)
    print(f"Rendered page_{p+1}.png: {pix.width}x{pix.height}")

print("Done rendering pages 1 to 25!")
