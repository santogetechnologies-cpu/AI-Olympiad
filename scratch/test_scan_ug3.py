import pymupdf

doc = pymupdf.open("public/books/ug3.pdf")
print("Total pages:", len(doc))
found_total = 0
for pno in range(len(doc)):
    p = doc[pno]
    pw, ph = p.rect.width, p.rect.height
    imgs = p.get_image_info(xrefs=True)
    valid = []
    for img in imgs:
        x0, y0, x1, y1 = img["bbox"]
        w, h = x1 - x0, y1 - y0
        if w >= 35 and h >= 35 and not (w > pw * 0.85 and h > ph * 0.85):
            valid.append((img["xref"], round(w, 1), round(h, 1)))
    if valid:
        found_total += len(valid)
        if pno < 35:
            print(f"Page {pno+1}: {len(valid)} images -> {valid}")

print(f"Total valid draggable images across all {len(doc)} pages: {found_total}")
