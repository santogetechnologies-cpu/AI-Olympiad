import os
import pypdf
import re

folder = r'C:\Users\Admin\Downloads\12th to ug 2nd'
for f in os.listdir(folder):
    if not f.endswith('.pdf'): continue
    p = os.path.join(folder, f)
    reader = pypdf.PdfReader(p)
    print("="*50)
    print(f, f"Total Pages: {len(reader.pages)}")
    
    # Scan pages to find Month 1, Month 2, ..., Finale
    milestones = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        first_few = " ".join(text.split()[:20]).upper()
        # Look for headers like MONTH 1, MONTH 2, etc.
        m = re.search(r'MONTH\s+([1-6])', first_few)
        if m:
            milestones.append((i + 1, f"Month {m.group(1)}"))
        elif "FINALE" in first_few or "PRACTICE" in first_few or "OLYMPIAD FINALE" in text.upper()[:200]:
            if "OLYMPIAD FINALE" in text.upper()[:200]:
                milestones.append((i + 1, "Olympiad Finale"))
    
    # Deduplicate consecutive milestones of same name
    deduped = []
    for pg, name in milestones:
        if not deduped or deduped[-1][1] != name:
            deduped.append((pg, name))
    
    print("Detected sections:")
    for pg, name in deduped:
        print(f"  Page {pg}: {name}")
