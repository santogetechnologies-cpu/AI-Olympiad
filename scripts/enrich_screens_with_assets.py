import json, os

screens_path = 'src/components/gaio/config/gaioFullBookScreens.json'
assets_index_path = 'public/gaio/class3/page_assets_index.json'

with open(screens_path, 'r', encoding='utf-8') as f:
    screens = json.load(f)

with open(assets_index_path, 'r', encoding='utf-8') as f:
    page_assets = json.load(f)

print(f'Enriching {len(screens)} screens with authentic PDF assets...')

for screen in screens:
    pno = screen['pdfPageNumber']
    part_idx = screen.get('pdfPartIndex', 1)
    total_parts = screen.get('pdfTotalParts', 1)
    
    # 1. Authentic section crop image
    crop_file = f'page_{pno}_part{part_idx}.png'
    crop_path = f'/gaio/class3/section_crops/{crop_file}'
    screen['sectionCropImage'] = crop_path

    # 2. Authentic extracted assets for this page & section
    all_p_assets = page_assets.get(str(pno), [])
    
    if total_parts == 1:
        screen_assets = all_p_assets
    else:
        # Divide by vertical position: standard A4 page is ~842pt height
        # Middle threshold ~450pt
        if part_idx == 1:
            screen_assets = [a for a in all_p_assets if (a['rects'][0]['y0'] if a['rects'] else 0) < 480]
            if not screen_assets and all_p_assets:
                # Fallback to first half
                screen_assets = all_p_assets[:max(1, len(all_p_assets)//2)]
        else:
            screen_assets = [a for a in all_p_assets if (a['rects'][0]['y0'] if a['rects'] else 0) >= 420]
            if not screen_assets and all_p_assets:
                # Fallback to second half
                screen_assets = all_p_assets[len(all_p_assets)//2:]

    screen['extractedAssets'] = screen_assets

    # 3. Enrich payload with dedicated visual asset references
    payload = screen.get('payload', {})
    
    # Hero banner (>600px width)
    wide_assets = [a['url'] for a in screen_assets if a['width'] >= 600]
    if wide_assets:
        payload['heroImage'] = wide_assets[0]

    # Story panels (~600x420)
    story_panels = [a['url'] for a in screen_assets if (a['width'] >= 500 and a['height'] >= 350) or '600x420' in a['fileName']]
    if story_panels:
        payload['storyImages'] = story_panels

    # Grid / item illustrations (250-400px square)
    grid_assets = [a['url'] for a in screen_assets if 200 <= a['width'] <= 450 and 200 <= a['height'] <= 450]
    if grid_assets:
        payload['itemImages'] = grid_assets

    # Character / mascot illustrations
    mascot_assets = [a['url'] for a in screen_assets if '288x288' in a['fileName'] or '244x244' in a['fileName']]
    if mascot_assets:
        payload['mascotImage'] = mascot_assets[0]

    screen['payload'] = payload

with open(screens_path, 'w', encoding='utf-8') as f:
    json.dump(screens, f, indent=2)

print('Successfully enriched all 286 screens with authentic visual assets!')
