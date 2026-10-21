import pypdf
import os

files = [
    ("ug3", r"C:\Users\Admin\Downloads\ug3rd to pg 2nd yr\GAIO UG 3rd year Book.pdf"),
    ("ug4", r"C:\Users\Admin\Downloads\ug3rd to pg 2nd yr\GAIO UG 4th year Book.pdf"),
    ("pg1", r"C:\Users\Admin\Downloads\ug3rd to pg 2nd yr\GAIO PG 1st year Book.pdf"),
    ("pg2", r"C:\Users\Admin\Downloads\ug3rd to pg 2nd yr\GAIO PG 2nd year Book.pdf"),
]

for key, path in files:
    r = pypdf.PdfReader(path)
    print("===", key, "===")
    months_found = {}
    for i, page in enumerate(r.pages):
        txt = (page.extract_text() or "")[:300].upper()
        # Look for headers like MONTH 1: AI DISCOVER
        for m in range(1, 7):
            m_header = f"MONTH {m}:"
            if m_header in txt and m not in months_found:
                months_found[m] = i + 1
        if "OLYMPIAD FINALE" in txt or "FINALE &" in txt or "PRACTICE PAPERS" in txt or "MOCK EXAM" in txt:
            if "finale" not in months_found and (i + 1) > 230:
                months_found["finale"] = i + 1
    print(months_found)
