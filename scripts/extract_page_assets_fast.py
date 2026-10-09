import fitz, os, json

doc = fitz.open('public/GAIO Class3 Book.pdf')
out_dir = 'public/gaio/class3/page_assets'
os.makedirs(out_dir, exist_ok=True)

page_assets = {}

for pno in range(len(doc)):
    page = doc[pno]
    p_num = pno + 1
    p_dir = os.path.join(out_dir, f'page_{p_num}')
    os.makedirs(p_dir, exist_ok=True)

    seen_xrefs = set()
    img_list = []

    # Fast filter using tuple fields: (xref, smask, width, height, bpc, colorspace, ...)
    for img_info in page.get_images():
        xref = img_info[0]
        w = img_info[2]
        h = img_info[3]
        if w < 40 or h < 40 or xref in seen_xrefs:
            continue
        seen_xrefs.add(xref)

        rects = page.get_image_rects(xref)
        if not rects:
            continue

        ext = img_info[8] if len(img_info) > 8 else 'png'
        # Get actual image bytes
        img_dict = doc.extract_image(xref)
        actual_ext = img_dict['ext']
        fname = f'img_{xref}_{w}x{h}.{actual_ext}'
        fpath = os.path.join(p_dir, fname)
        rel_url = f'/gaio/class3/page_assets/page_{p_num}/{fname}'

        if not os.path.exists(fpath):
            with open(fpath, 'wb') as f:
                f.write(img_dict['image'])

        img_list.append({
            'xref': xref,
            'width': w,
            'height': h,
            'ext': actual_ext,
            'fileName': fname,
            'url': rel_url,
            'rects': [{'x0': r.x0, 'y0': r.y0, 'x1': r.x1, 'y1': r.y1} for r in rects]
        })

    # Sort images by vertical appearance on the page (y0)
    img_list.sort(key=lambda x: x['rects'][0]['y0'] if x['rects'] else 0)
    page_assets[p_num] = img_list
    if p_num % 10 == 0 or p_num == len(doc):
        print(f'Processed up to page {p_num}/{len(doc)}')

with open('public/gaio/class3/page_assets_index.json', 'w', encoding='utf-8') as f:
    json.dump(page_assets, f, indent=2)

print('Successfully extracted all page assets and generated page_assets_index.json!')
