import os
import pymupdf
import docx
import json

senior_dir = "/Users/ashlinjeshma/Desktop/Project/public/Senior Level "

def inspect_pdf(pdf_path):
    doc = pymupdf.open(pdf_path)
    pages_data = []
    for i in range(len(doc)):
        text = doc[i].get_text()
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        pages_data.append({
            "page": i + 1,
            "header": lines[0] if lines else "",
            "lines_sample": lines[:5],
            "full_text": text
        })
    return pages_data

def inspect_docx(docx_path):
    doc = docx.Document(docx_path)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    tables_data = []
    for t in doc.tables:
        t_rows = []
        for r in t.rows:
            row_txt = [c.text.strip().replace("\n", " ") for c in r.cells]
            t_rows.append(row_txt)
        tables_data.append(t_rows)
    return paras, tables_data

# Let's inspect Class 9 PDF
c9_path = os.path.join(senior_dir, "AI_Olympiad_Class9_Vol1_Month1 (2).pdf")
c9_pages = inspect_pdf(c9_path)
print(f"Class 9 PDF has {len(c9_pages)} pages.")
print("Class 9 Outline:")
for p in c9_pages:
    hdr = " | ".join(p['lines_sample'][:3])
    print(f"P{p['page']:02d}: {hdr}")

print("\n" + "="*80 + "\n")

# Let's inspect Class 10 PDF
c10_path = os.path.join(senior_dir, "GAIO_Class10_Student_Book_25pp_Chapters.pdf")
c10_pages = inspect_pdf(c10_path)
print(f"Class 10 PDF has {len(c10_pages)} pages.")
print("Class 10 Outline:")
# Check TOC pages (pages 3-4)
for p in c10_pages[2:8]:
    print(f"P{p['page']:02d}:")
    print(p['full_text'][:500])
    print("-" * 40)

