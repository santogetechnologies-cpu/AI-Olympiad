import pymupdf
import os

pdf_path = r"c:\Users\abish\OneDrive\Desktop\nanjilproject\public\GAIO Class3 Book.pdf"
doc = pymupdf.open(pdf_path)

print(f"Total pages: {len(doc)}")

image_count = 0
for i in range(min(20, len(doc))):
    page = doc[i]
    images = page.get_images()
    print(f"Page {i+1}: {len(images)} images")
    image_count += len(images)

print(f"Total images in first 20 pages: {image_count}")
