import pymupdf
import os
import glob
import re

pdf_files = sorted(glob.glob('public/books/*.pdf'))
print(f"Scanning {len(pdf_files)} PDFs...\n")

results = {}

for pdf_path in pdf_files:
    fname = os.path.basename(pdf_path)
    grade_key = os.path.splitext(fname)[0]
    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    
    month_starts = {}
    finale_start = None
    
    for p in range(total_pages):
        page_num = p + 1
        text = doc[p].get_text()
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        
        # Check for Month 1-6 cover
        # Typically on pages > 5, has "MONTH X" on its own line near top, followed by unit title
        if page_num > 5:
            for m in range(1, 7):
                if m not in month_starts:
                    # Look for lines matching "MONTH X" or "MONTH X:" or "MONTH X -"
                    for i, line in enumerate(lines[:8]):
                        if re.match(rf'^MONTH\s+{m}\b', line, re.IGNORECASE) and not re.search(r'My 6-Month|Follow the path', text):
                            # Ensure it's a section start (not just a passing header)
                            # Section start usually has "MONTH X" as a prominent line
                            # or "In this unit" or "Area:" or topic list
                            if 'In this unit' in text or 'Area:' in text or 'UNIT' in text.upper() or i <= 3:
                                month_starts[m] = page_num
                                break
                                
        # Check for Certificate / Finale
        # User prompt: "Finale must start from the actual Certificate page and continue until the last page of the original PDF. The Certificate page and all subsequent pages belong to Finale only."
        if page_num > 150: # Certificate is always near the end
            for line in lines[:8]:
                if 'CERTIFICATE' in line.upper() and finale_start is None:
                    finale_start = page_num
                    break
            if finale_start is None and ('FINALE' in text.upper() or 'FINAL ASSESSMENT' in text.upper()):
                for line in lines[:5]:
                    if 'FINALE' in line.upper():
                        finale_start = page_num
                        break
                        
    results[grade_key] = {
        'total_pages': total_pages,
        'months': month_starts,
        'finale': finale_start
    }
    print(f"Grade: {grade_key:8s} | Total: {total_pages:3d} | Months: {month_starts} | Finale: {finale_start}")

print("\n--- Summary complete ---")

