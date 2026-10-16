import pypdf
files = [
  ('GAIO Class11 Book.pdf', 260),
  ('GAIO Class12 Book.pdf', 260),
  ('GAIO UG 1st year Book.pdf', 250),
  ('GAIO UG 2nd year Book.pdf', 249)
]
for fname, start in files:
    r = pypdf.PdfReader(f'C:/Users/Admin/Downloads/12th to ug 2nd/{fname}')
    for p in range(start, len(r.pages)):
        txt = r.pages[p].extract_text() or ''
        if any(w in txt.upper() for w in ['FINALE', 'PRACTICE', 'OLYMPIAD FINALE']):
            print(fname, 'Found on page', p+1, repr(txt[:80]))
            break
