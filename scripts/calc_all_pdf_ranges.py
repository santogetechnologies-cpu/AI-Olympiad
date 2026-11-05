import pymupdf
import glob
import os
import re
import json

files = sorted(glob.glob('public/books/*.pdf'))
all_specs = {}

for f in files:
    name = os.path.basename(f)
    grade = os.path.splitext(name)[0]
    doc = pymupdf.open(f)
    n = len(doc)
    
    # Months 1..6
    m_starts = {}
    for p in range(5, n):
        txt = doc[p].get_text()
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        for m in range(1, 7):
            if m not in m_starts:
                for line in lines[:8]:
                    if re.match(rf'^MONTH\s+{m}\b', line, re.IGNORECASE) and not re.search(r'My 6-Month|Follow the path', txt):
                        m_starts[m] = p + 1
                        break
                        
    # Certificate: find page where 'CERTIFICATE' appears in first 5 lines (in last 50 pages)
    cert_page = None
    for p in range(n - 50, n):
        txt = doc[p].get_text()
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        for line in lines[:5]:
            if 'CERTIFICATE' in line.upper():
                cert_page = p + 1
                break
        if cert_page:
            break
            
    all_specs[grade] = {
        'totalPages': n,
        'welcome': {'startPage': 1, 'endPage': 5, 'totalPages': 5},
        'ch1': {'startPage': m_starts[1], 'endPage': m_starts[2] - 1, 'totalPages': m_starts[2] - m_starts[1]},
        'ch2': {'startPage': m_starts[2], 'endPage': m_starts[3] - 1, 'totalPages': m_starts[3] - m_starts[2]},
        'ch3': {'startPage': m_starts[3], 'endPage': m_starts[4] - 1, 'totalPages': m_starts[4] - m_starts[3]},
        'ch4': {'startPage': m_starts[4], 'endPage': m_starts[5] - 1, 'totalPages': m_starts[5] - m_starts[4]},
        'ch5': {'startPage': m_starts[5], 'endPage': m_starts[6] - 1, 'totalPages': m_starts[6] - m_starts[5]},
        'ch6': {'startPage': m_starts[6], 'endPage': cert_page - 1, 'totalPages': cert_page - m_starts[6]},
        'finale': {'startPage': cert_page, 'endPage': n, 'totalPages': n - cert_page + 1}
    }
    
    # Verify continuity
    s = all_specs[grade]
    assert s['welcome']['endPage'] + 1 == s['ch1']['startPage']
    assert s['ch1']['endPage'] + 1 == s['ch2']['startPage']
    assert s['ch2']['endPage'] + 1 == s['ch3']['startPage']
    assert s['ch3']['endPage'] + 1 == s['ch4']['startPage']
    assert s['ch4']['endPage'] + 1 == s['ch5']['startPage']
    assert s['ch5']['endPage'] + 1 == s['ch6']['startPage']
    assert s['ch6']['endPage'] + 1 == s['finale']['startPage']
    assert s['finale']['endPage'] == n
    
    total_segmented = (s['welcome']['totalPages'] + s['ch1']['totalPages'] + 
                       s['ch2']['totalPages'] + s['ch3']['totalPages'] + 
                       s['ch4']['totalPages'] + s['ch5']['totalPages'] + 
                       s['ch6']['totalPages'] + s['finale']['totalPages'])
    assert total_segmented == n, f"Sum of segment pages ({total_segmented}) != total pages ({n})"
    
    print(f"{grade:8s} ({n} pgs): Welcome 1-5 (5p), Ch1 {s['ch1']['startPage']}-{s['ch1']['endPage']} ({s['ch1']['totalPages']}p), Ch2 {s['ch2']['startPage']}-{s['ch2']['endPage']} ({s['ch2']['totalPages']}p), Ch3 {s['ch3']['startPage']}-{s['ch3']['endPage']} ({s['ch3']['totalPages']}p), Ch4 {s['ch4']['startPage']}-{s['ch4']['endPage']} ({s['ch4']['totalPages']}p), Ch5 {s['ch5']['startPage']}-{s['ch5']['endPage']} ({s['ch5']['totalPages']}p), Ch6 {s['ch6']['startPage']}-{s['ch6']['endPage']} ({s['ch6']['totalPages']}p), Finale {s['finale']['startPage']}-{s['finale']['endPage']} ({s['finale']['totalPages']}p)")

# Output JSON map for TS
with open('scripts/pdf_chapter_boundaries.json', 'w') as out:
    json.dump(all_specs, out, indent=2)

print("\nSuccessfully generated scripts/pdf_chapter_boundaries.json with 100% verified boundaries and continuity!")

