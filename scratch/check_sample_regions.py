import json
with open('public/manifests/class10_manifest.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for p in d['pages']:
    for r in p.get('regions', []):
        if r.get('type') in ['colorFill', 'typeable', 'choose']:
            print(f"Page {p['pageNumber']} - {r['type']}:", json.dumps(r, indent=2))
            break
