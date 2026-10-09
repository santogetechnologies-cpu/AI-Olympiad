import pymupdf
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = pymupdf.open(pdf_path)
out_dir = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\class3_assets"
os.makedirs(out_dir, exist_ok=True)

# For pages 6 to 15, let's extract images and render clean cropped sections
print("Extracting images from pages 6-15...")

extracted_count = 0
for page_num in range(6, 16):
    page = doc[page_num - 1]
    image_list = page.get_images(full=True)
    print(f"Page {page_num} has {len(image_list)} raw images")
    
    # Also we can render specific sub-rectangles (crops) of the page if needed
    # for instance headers, illustrations, cards, activities
    pix = page.get_pixmap(dpi=200)
    page_img_path = os.path.join(out_dir, f"page_{page_num}_hq.png")
    pix.save(page_img_path)

print("Saved high-res page images to public/class3_assets!")
