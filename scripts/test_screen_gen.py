import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Loaded {len(pages)} extracted pages.")

screens = []
screen_counter = 1

def add_screen(pdf_page, part_idx, total_parts, interaction_type, title, subtitle, block_title, month_num, month_title, topic_num, topic_title, header_cat, header_title, payload):
    global screen_counter
    screen_id = f"p{pdf_page}-s{part_idx}"
    s = {
        "id": screen_id,
        "screenIndex": screen_counter - 1,
        "screenNumber": screen_counter,
        "pdfPageNumber": pdf_page,
        "pdfPartIndex": part_idx,
        "pdfTotalParts": total_parts,
        "monthNumber": month_num,
        "monthTitle": month_title,
        "topicNumber": topic_num,
        "topicTitle": topic_title,
        "pageHeaderCategory": header_cat,
        "pageHeaderTitle": header_title,
        "title": title,
        "subtitle": subtitle,
        "contentBlockTitle": block_title,
        "interactionType": interaction_type,
        "sourcePdfImage": f"/gaio/class3/pages/page_{pdf_page}.png",
        "payload": payload
    }
    screens.append(s)
    screen_counter += 1

# Define topics mapping
topics_info = {
    1: {"month": 1, "mtitle": "AI DISCOVER", "area": "AI BASICS", "title": "Meet My AI Friend", "pages": list(range(6, 16))},
    2: {"month": 1, "mtitle": "AI DISCOVER", "area": "AI BASICS", "title": "Machines That Help Us", "pages": list(range(16, 26))},
    3: {"month": 2, "mtitle": "AI CONNECT", "area": "COMMUNICATE WITH AI", "title": "Give Me a Command!", "pages": list(range(29, 39))},
    4: {"month": 2, "mtitle": "AI CONNECT", "area": "COMMUNICATE WITH AI", "title": "Put It in Order!", "pages": list(range(39, 49))},
    5: {"month": 3, "mtitle": "AI SOLVE", "area": "AI APPLICATIONS", "title": "AI Goes to School", "pages": list(range(52, 62))},
    6: {"month": 3, "mtitle": "AI SOLVE", "area": "AI APPLICATIONS", "title": "AI Comes Home", "pages": list(range(62, 72))},
    7: {"month": 4, "mtitle": "AI RISE", "area": "AI & CAREER", "title": "When I Grow Up", "pages": list(range(75, 85))},
    8: {"month": 4, "mtitle": "AI RISE", "area": "AI & CAREER", "title": "People Behind Technology", "pages": list(range(85, 95))},
    9: {"month": 5, "mtitle": "AI CREATE", "area": "AI TOOLS", "title": "Ask & Explore", "pages": list(range(98, 108))},
    10: {"month": 5, "mtitle": "AI CREATE", "area": "AI TOOLS", "title": "Draw & Imagine", "pages": list(range(108, 118))},
    11: {"month": 6, "mtitle": "AI CARE", "area": "RESPONSIBLE AI", "title": "My AI Safety Rules", "pages": list(range(121, 131))},
    12: {"month": 6, "mtitle": "AI CARE", "area": "RESPONSIBLE AI", "title": "Share with Care", "pages": list(range(131, 141))},
}

months_info = {
    1: {"title": "AI DISCOVER", "sub": "See • Understand • Explore", "cover": 5, "review": 26, "wordsearch": 27},
    2: {"title": "AI CONNECT", "sub": "Listen • Order • Command", "cover": 28, "review": 49, "wordsearch": 50},
    3: {"title": "AI SOLVE", "sub": "Learn • Assist • Solve", "cover": 51, "review": 72, "wordsearch": 73},
    4: {"title": "AI RISE", "sub": "Aspire • Create • Build", "cover": 74, "review": 95, "wordsearch": 96},
    5: {"title": "AI CREATE", "sub": "Imagine • Express • Discover", "cover": 97, "review": 118, "wordsearch": 119},
    6: {"title": "AI CARE", "sub": "Verify • Protect • Respect", "cover": 120, "review": 141, "wordsearch": 142},
}

# 1. P1: BOOK COVER
add_screen(
    pdf_page=1, part_idx=1, total_parts=1,
    interaction_type="book_cover",
    title="GLOBAL ARTIFICIAL INTELLIGENCE OLYMPIAD",
    subtitle="Class 3 • Beginner AI Coursebook & Activity Guide",
    block_title="Coursebook Front Cover",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="GLOBAL AI OLYMPIAD", header_title="CLASS 3 BOOK",
    payload={"mascot": "Bolt", "edition": "2026 Edition", "tagline": "A Playful Journey into Artificial Intelligence for Young Minds"}
)

# 2. P2: WELCOME & MEET BOLT (Split into 2 screens)
add_screen(
    pdf_page=2, part_idx=1, total_parts=2,
    interaction_type="welcome_bolt",
    title="Welcome to AI Olympiad! • Meet Bolt",
    subtitle="Hello, Super Kids! Meet your friendly AI robot companion.",
    block_title="Meet Bolt Introduction",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="WELCOME!",
    payload={
        "greeting": "Hello, Super Kids! MEET BOLT!",
        "introText": "Hi! I am Bolt, your robot friend. Together we will see, play, build and learn all about AI. Are you ready? Let's go!",
        "speech": "Hi! I am Bolt, your robot friend. Together we will see, play, build and learn all about AI. Are you ready? Let's go!"
    }
)
add_screen(
    pdf_page=2, part_idx=2, total_parts=2,
    interaction_type="book_guide",
    title="Look for These Pictures in Your Book!",
    subtitle="Your Visual Icon Guide to Activities & Lessons",
    block_title="Activity Guide & Icons Key",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="ACTIVITY GUIDE",
    payload={
        "guideItems": [
            {"name": "LET'S LEARN", "desc": "Learn something new with Bolt", "icon": "BookOpen"},
            {"name": "PICTURE STORY", "desc": "Read an illustrated comic story", "icon": "MessageSquare"},
            {"name": "LOOK AROUND YOU", "desc": "See AI helpers in real life", "icon": "Compass"},
            {"name": "LET'S DO IT!", "desc": "Hands-on playful activity", "icon": "Gamepad2"},
            {"name": "WORKSHEET", "desc": "Write, tick and solve tasks", "icon": "CheckSquare"},
            {"name": "PUZZLE FUN", "desc": "Solve visual logic puzzles", "icon": "Puzzle"},
            {"name": "TRACE & COLOUR", "desc": "Trace words and colour art", "icon": "Palette"},
            {"name": "QUIZ TIME", "desc": "Earn stars with quiz questions", "icon": "Star"},
            {"name": "TRUE OR FALSE", "desc": "Identify facts and connect at home", "icon": "CheckCircle2"},
            {"name": "MAGIC WORDS", "desc": "Key AI vocabulary words", "icon": "Sparkles"}
        ]
    }
)

# 3. P3: ALL ABOUT ME (Split into 2 screens)
add_screen(
    pdf_page=3, part_idx=1, total_parts=2,
    interaction_type="student_profile",
    title="All About Me! • My AI Student Profile",
    subtitle="Personalize your official AI Olympiad coursebook",
    block_title="Student ID & Drawing",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="STUDENT PROFILE",
    payload={
        "fields": ["My Name", "My Age", "My Class", "My Teacher"],
        "drawingPrompt": "My photo or drawing"
    }
)
add_screen(
    pdf_page=3, part_idx=2, total_parts=2,
    interaction_type="student_faves",
    title="My Favourite Things & Bolt Asks",
    subtitle="Tell Bolt what you love and what you want to explore",
    block_title="Favourites & Bolt's Question",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="FAVOURITES & GOALS",
    payload={
        "favouriteCategories": ["Colour", "Food", "Animal", "Game", "Book", "Dream job"],
        "boltQuestion": "Bolt asks: What do you want to learn about AI?"
    }
)

# 4. P4: MY 6-MONTH AI JOURNEY (Split into 2 screens)
add_screen(
    pdf_page=4, part_idx=1, total_parts=2,
    interaction_type="journey_map",
    title="My 6-Month AI Journey • Semester 1",
    subtitle="Follow the learning path: Months 1, 2, and 3",
    block_title="Journey Path Part 1 (Months 1-3)",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="JOURNEY ROADMAP",
    payload={
        "months": [
            {"month": 1, "title": "MONTH 1: AI DISCOVER", "area": "AI Basics", "topics": ["Meet My AI Friend", "Machines That Help Us"]},
            {"month": 2, "title": "MONTH 2: AI CONNECT", "area": "Communicate with AI", "topics": ["Give Me a Command!", "Put It in Order!"]},
            {"month": 3, "title": "MONTH 3: AI SOLVE", "area": "AI Applications", "topics": ["AI Goes to School", "AI Comes Home"]}
        ]
    }
)
add_screen(
    pdf_page=4, part_idx=2, total_parts=2,
    interaction_type="journey_map",
    title="My 6-Month AI Journey • Semester 2",
    subtitle="Follow the learning path: Months 4, 5, and 6",
    block_title="Journey Path Part 2 (Months 4-6)",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="JOURNEY ROADMAP",
    payload={
        "months": [
            {"month": 4, "title": "MONTH 4: AI RISE", "area": "AI & Career", "topics": ["When I Grow Up", "People Behind Technology"]},
            {"month": 5, "title": "MONTH 5: AI CREATE", "area": "AI Tools", "topics": ["Ask & Explore", "Draw & Imagine"]},
            {"month": 6, "title": "MONTH 6: AI CARE", "area": "Responsible AI", "topics": ["My AI Safety Rules", "Share with Care"]}
        ]
    }
)

print(f"Generated {len(screens)} intro screens so far.")
