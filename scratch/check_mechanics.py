import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/gameMechanicRegistry.ts', encoding='utf-8') as f:
    text = f.read()

import re
mechs = re.findall(r"^\s*([a-z0-9_]+):\s*\{\s*id:", text, re.MULTILINE)
print("Total game mechanics in registry:", len(mechs))
print("Sample mechanics:", mechs[:15])
