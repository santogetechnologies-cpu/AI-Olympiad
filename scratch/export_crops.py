import pymupdf
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = pymupdf.open(pdf_path)
out_dir = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\class3_assets"
os.makedirs(out_dir, exist_ok=True)

# Export all placed image crops
for p_num in range(6, 16):
    page = doc[p_num - 1]
    img_info = page.get_image_info()
    for idx, info in enumerate(img_info):
        b = info['bbox']
        # Expand slightly to avoid clipping border
        rect = pymupdf.Rect(b)
        pix = page.get_pixmap(clip=rect, dpi=250)
        img_name = f"p{p_num}_img_{idx}.png"
        pix.save(os.path.join(out_dir, img_name))

print("Successfully exported all placed image crops from pages 6-15!")
