import json
import re
import os
import pypdf

books = [
    {
        "classId": "class11",
        "title": "GAIO Class 11 Book",
        "file": "public/books/class11.pdf",
        "output": "public/manifests/class11_manifest.json",
        "level": "senior"
    },
    {
        "classId": "class12",
        "title": "GAIO Class 12 Book",
        "file": "public/books/class12.pdf",
        "output": "public/manifests/class12_manifest.json",
        "level": "scholar"
    },
    {
        "classId": "ug1",
        "title": "GAIO UG 1st Year Book",
        "file": "public/books/ug1.pdf",
        "output": "public/manifests/ug1_manifest.json",
        "level": "ug"
    },
    {
        "classId": "ug2",
        "title": "GAIO UG 2nd Year Book",
        "file": "public/books/ug2.pdf",
        "output": "public/manifests/ug2_manifest.json",
        "level": "ug"
    }
]

for b in books:
    print(f"Generating manifest for {b['classId']}...")
    reader = pypdf.PdfReader(b["file"])
    total_pages = len(reader.pages)
    
    pages = []
    for page_idx in range(total_pages):
        page_num = page_idx + 1
        page = reader.pages[page_idx]
        text = page.extract_text() or ""
        
        # Determine page type
        page_lower = text.lower()
        if "worksheet" in page_lower or "exercise" in page_lower or "practice test" in page_lower:
            page_type = "worksheet"
        elif "challenge" in page_lower or "quiz" in page_lower or "activity" in page_lower:
            page_type = "interactive"
        elif "color" in page_lower or "draw" in page_lower or "diagram" in page_lower:
            page_type = "activity"
        else:
            page_type = "reading"
            
        regions = []
        # Find candidate sayIt words (words with 5+ letters that are capitalized or key terms)
        words = re.findall(r'\b[A-Za-z]{4,}\b', text)
        say_it_words = []
        seen = set()
        for w in words:
            clean = w.strip()
            if clean.lower() not in seen and len(clean) > 3 and clean.lower() not in {"this", "that", "with", "from", "have", "were", "been", "they", "will"}:
                seen.add(clean.lower())
                say_it_words.append(clean)
                if len(say_it_words) >= 6:
                    break
                    
        for idx, sw in enumerate(say_it_words):
            regions.append({
                "id": f"say_{page_num}_{idx}",
                "type": "sayIt",
                "targetWord": sw,
                "label": f'Say "{sw}"'
            })
            
        # Detect blanks or questions for typeable regions
        has_blank = "_" in text or "Q1" in text or "Q2" in text or "Answer:" in text or "worksheet" in page_lower
        if has_blank:
            regions.append({
                "id": f"type_{page_num}_0",
                "type": "typeable",
                "bbox": [100.0, 150.0, 220.0, 28.0],
                "prompt": "Enter your notes / answer here...",
                "placeholder": "Type answer...",
                "fontSize": 13.0
            })
            
        # Add colorFill region for interactive or drawing pages
        has_color = page_type in ["activity", "worksheet"] or "diagram" in page_lower or "color" in page_lower or page_num % 4 == 0
        if has_color:
            regions.append({
                "id": f"color_{page_num}_0",
                "type": "colorFill",
                "label": "Color Fill Studio",
                "bbox": [50.0, 200.0, 490.0, 300.0]
            })

        pages.append({
            "pageNumber": page_num,
            "pageType": page_type,
            "width": 595.3,
            "height": 841.9,
            "regions": regions,
            "hasTypeable": has_blank,
            "hasChoose": "choose" in page_lower or "option" in page_lower,
            "hasColorFill": has_color,
            "sayItWords": say_it_words
        })
        
    manifest = {
        "classId": b["classId"],
        "totalPages": total_pages,
        "profile": {
            "title": b["title"],
            "level": b["level"],
            "features": ["voice", "type", "drag", "color", "trace", "stamps", "olympiad"]
        },
        "pages": pages
    }
    
    with open(b["output"], "w", encoding="utf-8") as out_f:
        json.dump(manifest, out_f, indent=2)
    print(f"Wrote {b['output']} with {len(pages)} pages.")
print("All manifests generated successfully!")
