import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Loaded {len(pages)} pages.")

# Let's inspect each topic's 10 pages
topics_meta = [
    {"num": 1, "month": 1, "mtitle": "AI DISCOVER", "area": "AI BASICS", "title": "Meet My AI Friend", "start_p": 6},
    {"num": 2, "month": 1, "mtitle": "AI DISCOVER", "area": "AI BASICS", "title": "Machines That Help Us", "start_p": 16},
    {"num": 3, "month": 2, "mtitle": "AI CONNECT", "area": "COMMUNICATE WITH AI", "title": "Give Me a Command!", "start_p": 29},
    {"num": 4, "month": 2, "mtitle": "AI CONNECT", "area": "COMMUNICATE WITH AI", "title": "Put It in Order!", "start_p": 39},
    {"num": 5, "month": 3, "mtitle": "AI SOLVE", "area": "AI APPLICATIONS", "title": "AI Goes to School", "start_p": 52},
    {"num": 6, "month": 3, "mtitle": "AI SOLVE", "area": "AI APPLICATIONS", "title": "AI Comes Home", "start_p": 62},
    {"num": 7, "month": 4, "mtitle": "AI RISE", "area": "AI & CAREER", "title": "When I Grow Up", "start_p": 75},
    {"num": 8, "month": 4, "mtitle": "AI RISE", "area": "AI & CAREER", "title": "People Behind Technology", "start_p": 85},
    {"num": 9, "month": 5, "mtitle": "AI CREATE", "area": "AI TOOLS", "title": "Ask & Explore", "start_p": 98},
    {"num": 10, "month": 5, "mtitle": "AI CREATE", "area": "AI TOOLS", "title": "Draw & Imagine", "start_p": 108},
    {"num": 11, "month": 6, "mtitle": "AI CARE", "area": "RESPONSIBLE AI", "title": "My AI Safety Rules", "start_p": 121},
    {"num": 12, "month": 6, "mtitle": "AI CARE", "area": "RESPONSIBLE AI", "title": "Share with Care", "start_p": 131},
]

for tm in topics_meta:
    p_learn = tm["start_p"]
    learn_page = pages[p_learn - 1]
    learn_blocks = [b['text'].replace('\n', ' ') for b in learn_page['blocks']]
    print(f"Topic {tm['num']}: {tm['title']} (P{p_learn}) - blocks count: {len(learn_blocks)}")
    print(f"   First block: {learn_blocks[1] if len(learn_blocks) > 1 else 'N/A'}")
