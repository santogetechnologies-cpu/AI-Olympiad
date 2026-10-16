import json
with open('public/manifests/class10_manifest.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
types = set()
pages_with_regions = 0
for p in d['pages']:
    if p.get('regions'):
        pages_with_regions += 1
    for r in p.get('regions', []):
        types.add(r.get('type'))
print('Region types in class10:', types)
print('Total pages:', len(d['pages']), 'Pages with regions:', pages_with_regions)
if d['pages'][2].get('regions'):
    print('Sample region on page 3:', json.dumps(d['pages'][2]['regions'][:3], indent=2))
