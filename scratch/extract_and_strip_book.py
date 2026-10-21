import pymupdf
import json
import os
import sys

def process_book(class_id, max_pages=None):
    pdf_in = f"public/books/{class_id}.pdf"
    pdf_out = f"public/books/{class_id}_stripped.pdf"
    manifest_file = f"public/manifests/{class_id}_manifest.json"
    img_dir = "public/books/images"
    os.makedirs(img_dir, exist_ok=True)

    if not os.path.exists(pdf_in):
        print(f"Error: {pdf_in} does not exist!")
        return

    print(f"--- Processing {class_id} ---")
    doc = pymupdf.open(pdf_in)
    total_pages = len(doc)
    pages_to_process = min(total_pages, max_pages) if max_pages else total_pages
    print(f"Scanning {pages_to_process} pages in {class_id}...")

    extracted_xrefs = {}
    new_regions_by_page = {}
    total_extracted = 0

    for pno in range(pages_to_process):
        page_num = pno + 1
        page = doc[pno]
        pw, ph = page.rect.width, page.rect.height
        
        imgs = page.get_image_info(xrefs=True)
        if not imgs:
            continue

        page_regions = []
        xrefs_to_delete = set()

        for idx, img in enumerate(imgs):
            xref = img.get("xref")
            if not xref:
                continue

            x0, y0, x1, y1 = img["bbox"]
            w = x1 - x0
            h = y1 - y0

            # Filter: ignore tiny icons, decorative lines, or full-page backgrounds
            if w < 35 or h < 35:
                continue
            if w > pw * 0.85 and h > ph * 0.85:
                continue

            # Save PNG if not already saved
            img_filename = f"{class_id}_p{page_num}_x{xref}.png"
            img_rel_path = f"/books/images/{img_filename}"
            img_disk_path = os.path.join(img_dir, img_filename)

            if xref not in extracted_xrefs:
                try:
                    pix = pymupdf.Pixmap(doc, xref)
                    # Check for alpha mask (transparency)
                    sm = doc.extract_image(xref).get("smask")
                    if sm:
                        pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(doc, sm))
                    # Convert CMYK to RGB
                    if pix.colorspace and pix.colorspace.n > 3:
                        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                    
                    pix.save(img_disk_path)
                    extracted_xrefs[xref] = img_rel_path
                    total_extracted += 1
                except Exception as e:
                    print(f"Error extracting xref {xref} on p.{page_num}: {e}")
                    continue

            page_regions.append({
                "id": f"drag_p{page_num}_x{xref}_{idx}",
                "type": "draggable",
                "bbox": [round(x0, 2), round(y0, 2), round(w, 2), round(h, 2)],
                "imageSrc": extracted_xrefs[xref],
                "label": f"Figure (p.{page_num})"
            })
            xrefs_to_delete.add(xref)

        # Strip extracted images from this page
        for xref in xrefs_to_delete:
            try:
                page.delete_image(xref)
            except Exception as e:
                print(f"Warning: could not delete xref {xref} on p.{page_num}: {e}")

        if page_regions:
            new_regions_by_page[page_num] = page_regions

    print(f"Saving stripped PDF to {pdf_out}...")
    # Fast save without full compression re-encode
    doc.save(pdf_out, garbage=1, deflate=False)
    doc.close()
    print(f"Saved {pdf_out} ({os.path.getsize(pdf_out):,} bytes)!")

    # Now update the manifest
    if os.path.exists(manifest_file):
        print(f"Updating manifest {manifest_file}...")
        with open(manifest_file, "r", encoding="utf-8") as f:
            manifest = json.load(f)

        pages = manifest.get("pages", [])
        updated_pages_count = 0

        for page_data in pages:
            p_num = page_data.get("pageNumber")
            if p_num in new_regions_by_page:
                # Retain existing non-draggable regions (like sayIt)
                existing = [r for r in page_data.get("regions", []) if r.get("type") != "draggable"]
                # Append new draggable regions
                page_data["regions"] = existing + new_regions_by_page[p_num]
                page_data["hasDraggableImages"] = True
                updated_pages_count += 1

        with open(manifest_file, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)

        print(f"Manifest updated: {updated_pages_count} pages now have draggable images!")
    else:
        print(f"Note: Manifest {manifest_file} not found to update.")

    print(f"Done {class_id}! Extracted {total_extracted} unique images across {len(new_regions_by_page)} pages.")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "ug3"
    process_book(target)
