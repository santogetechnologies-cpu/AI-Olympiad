import os
import pypdf

folder = r'C:\Users\Admin\Downloads\12th to ug 2nd'
for f in os.listdir(folder):
    if f.endswith('.pdf'):
        p = os.path.join(folder, f)
        reader = pypdf.PdfReader(p)
        print(f"{f}: {len(reader.pages)} pages")
