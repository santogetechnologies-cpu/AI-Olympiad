import pymupdf
import json

doc = pymupdf.open(r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf")

for p_num in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]:
    p = doc[p_num - 1]
    img_info = p.get_image_info()
    print(f"\n--- Page {p_num}: {len(img_info)} images placed on page ---")
    for idx, info in enumerate(img_info[:8]):
        b = info['bbox']
        print(f"  Img {idx}: bbox=({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}), size={info.get('width')}x{info.get('height')}")

