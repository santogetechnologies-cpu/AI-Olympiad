import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/full_pdf_extracted.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Loaded {len(pages)} extracted pages.")

# Answer Keys dictionary
answers_by_topic = {
    1: {"quiz": [0, 1, 2, 0, 2], "tf": [True, False, True, False, True, True], "odd": [3, 2, 3], "counts": [4, 3, 5]},
    2: {"quiz": [1, 0, 2, 0, 1], "tf": [True, False, True, True, False, True], "odd": [3, 3, 1], "counts": [3, 4, 2]},
    3: {"quiz": [0, 1, 2, 0, 1], "tf": [True, False, True, True, False, True], "odd": [3, 3, 2], "counts": [3, 2, 4]},
    4: {"quiz": [1, 0, 2, 0, 1], "tf": [True, False, True, True, False, True], "odd": [3, 3, 2], "counts": [2, 4, 3]},
    5: {"quiz": [1, 0, 2, 0, 1], "tf": [True, True, False, True, False, True], "odd": [3, 3, 2], "counts": [4, 3, 2]},
    6: {"quiz": [2, 0, 1, 0, 2], "tf": [True, True, False, True, False, True], "odd": [3, 3, 2], "counts": [5, 2, 3]},
    7: {"quiz": [0, 1, 2, 0, 1], "tf": [True, True, False, True, False, True], "odd": [3, 3, 2], "counts": [3, 5, 2]},
    8: {"quiz": [1, 0, 2, 0, 1], "tf": [False, True, True, True, False, True], "odd": [3, 2, 3], "counts": [2, 4, 3]},
    9: {"quiz": [0, 1, 2, 0, 1], "tf": [True, False, True, True, False, True], "odd": [3, 3, 2], "counts": [4, 2, 3]},
    10: {"quiz": [0, 1, 2, 0, 1], "tf": [True, True, False, True, True, False], "odd": [3, 3, 2], "counts": [2, 5, 3]},
    11: {"quiz": [0, 1, 2, 0, 1], "tf": [True, False, True, False, True, True], "odd": [3, 3, 2], "counts": [3, 2, 4]},
    12: {"quiz": [2, 0, 1, 0, 2], "tf": [True, False, True, True, False, True], "odd": [3, 3, 2], "counts": [3, 4, 2]},
}

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

months_meta = [
    {"num": 1, "title": "AI DISCOVER", "sub": "See • Understand • Explore", "cover": 5, "review": 26, "wordsearch": 27},
    {"num": 2, "title": "AI CONNECT", "sub": "Listen • Order • Command", "cover": 28, "review": 49, "wordsearch": 50},
    {"num": 3, "title": "AI SOLVE", "sub": "Learn • Assist • Solve", "cover": 51, "review": 72, "wordsearch": 73},
    {"num": 4, "title": "AI RISE", "sub": "Aspire • Create • Build", "cover": 74, "review": 95, "wordsearch": 96},
    {"num": 5, "title": "AI CREATE", "sub": "Imagine • Express • Discover", "cover": 97, "review": 118, "wordsearch": 119},
    {"num": 6, "title": "AI CARE", "sub": "Verify • Protect • Respect", "cover": 120, "review": 141, "wordsearch": 142},
]

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

# ─────────────────────────────────────────────────────────────────────────────
# 1. INTRO SCREENS (Pages 1 to 4) -> 7 Screens
# ─────────────────────────────────────────────────────────────────────────────
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

add_screen(
    pdf_page=4, part_idx=1, total_parts=2,
    interaction_type="journey_map",
    title="My 6-Month AI Journey • Semester 1",
    subtitle="Follow the learning path: Months 1, 2, and 3",
    block_title="Journey Path Part 1 (Months 1-3)",
    month_num=0, month_title="WELCOME", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="JOURNEY ROADMAP",
    payload={
        "semester": 1,
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
        "semester": 2,
        "months": [
            {"month": 4, "title": "MONTH 4: AI RISE", "area": "AI & Career", "topics": ["When I Grow Up", "People Behind Technology"]},
            {"month": 5, "title": "MONTH 5: AI CREATE", "area": "AI Tools", "topics": ["Ask & Explore", "Draw & Imagine"]},
            {"month": 6, "title": "MONTH 6: AI CARE", "area": "Responsible AI", "topics": ["My AI Safety Rules", "Share with Care"]}
        ]
    }
)

# ─────────────────────────────────────────────────────────────────────────────
# 2. MONTHS 1 TO 6 (Pages 5 to 142) -> 264 Screens
# ─────────────────────────────────────────────────────────────────────────────
for m_idx, m_meta in enumerate(months_meta):
    m_num = m_meta["num"]
    m_title = m_meta["title"]
    m_sub = m_meta["sub"]
    m_cover_p = m_meta["cover"]
    m_review_p = m_meta["review"]
    m_ws_p = m_meta["wordsearch"]

    t_first = topics_meta[(m_num - 1) * 2]
    t_second = topics_meta[(m_num - 1) * 2 + 1]

    # Month Cover Screen (1 Screen)
    add_screen(
        pdf_page=m_cover_p, part_idx=1, total_parts=1,
        interaction_type="month_cover",
        title=f"MONTH {m_num}: {m_title}",
        subtitle=m_sub,
        block_title=f"Month {m_num} Overview",
        month_num=m_num, month_title=m_title, topic_num=None, topic_title=None,
        header_cat=f"AI OLYMPIAD • CLASS 3", header_title=f"MONTH {m_num}: {m_title}",
        payload={
            "monthNumber": m_num,
            "monthTitle": m_title,
            "subtitle": m_sub,
            "topics": [
                {"topicNumber": t_first["num"], "title": t_first["title"], "area": t_first["area"]},
                {"topicNumber": t_second["num"], "title": t_second["title"], "area": t_second["area"]}
            ]
        }
    )

    # Now each of the two topics in this month (10 pages each -> 20 screens each)
    for t_info in [t_first, t_second]:
        t_num = t_info["num"]
        t_title = t_info["title"]
        t_area = t_info["area"]
        t_start = t_info["start_p"]

        h_cat = f"MONTH {m_num}: {m_title}"
        h_title = f"TOPIC {t_num} • MONTH {m_num} • {t_area}"

        # -------------------------------------------------------------
        # P_START + 0: LET'S LEARN (2 Screens)
        # -------------------------------------------------------------
        p_learn = t_start
        p_learn_obj = pages[p_learn - 1]
        learn_blocks = [b['text'].strip() for b in p_learn_obj['blocks']]
        learn_text = p_learn_obj['full_text']

        # Extract magic words from text
        mw_match = re.search(r'MAGIC WORDS(.*?)(?:—|\d+|$)', learn_text, re.DOTALL)
        mw_raw = mw_match.group(1).strip() if mw_match else ""
        magic_words = []
        for line in mw_raw.split('\n'):
            line = line.strip()
            if line and not line.startswith('—') and len(line) > 2:
                parts = re.split(r'\s{2,}|\t|:', line, maxsplit=1)
                if len(parts) == 2:
                    magic_words.append({"word": parts[0].strip(), "definition": parts[1].strip()})
                elif len(magic_words) > 0 and len(parts) == 1:
                    magic_words[-1]["definition"] += " " + parts[0].strip()

        # Fallback default magic words if regex missed
        if len(magic_words) < 2:
            magic_words = [
                {"word": "AI", "definition": "A smart helper that thinks and learns a little"},
                {"word": "Machine", "definition": "A tool or device that does work to help us"},
                {"word": "Smart", "definition": "Able to learn and respond to inputs"}
            ]

        # Screen 1: Lesson Concept
        add_screen(
            pdf_page=p_learn, part_idx=1, total_parts=2,
            interaction_type="lets_learn_intro",
            title=f"Let's Learn: {t_title}",
            subtitle="Read and explore the core concept with Bolt",
            block_title="Core Lesson Concept & AI Helpers",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=h_title,
            payload={
                "topicNumber": t_num,
                "topicTitle": t_title,
                "area": t_area,
                "fullText": learn_text,
                "rawBlocks": learn_blocks[:6]
            }
        )
        # Screen 2: Magic Words
        add_screen(
            pdf_page=p_learn, part_idx=2, total_parts=2,
            interaction_type="lets_learn_words",
            title=f"Magic Words: {t_title}",
            subtitle="Important new words to learn and remember!",
            block_title="Magic Words Vocabulary Cards",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=h_title,
            payload={
                "magicWords": magic_words
            }
        )

        # -------------------------------------------------------------
        # P_START + 1: PICTURE STORY (2 Screens)
        # -------------------------------------------------------------
        p_story = t_start + 1
        p_story_obj = pages[p_story - 1]
        story_text = p_story_obj['full_text']

        # Parse panels
        # Screen 1: Panels 1 & 2
        add_screen(
            pdf_page=p_story, part_idx=1, total_parts=2,
            interaction_type="picture_story_part1",
            title=f"Picture Story: {t_title} (Part 1)",
            subtitle="Look at the pictures. Read the story with Bolt!",
            block_title="Story Panels 1 & 2",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"PICTURE STORY: {t_title.upper()}",
            payload={
                "panelNumberStart": 1,
                "storyTitle": t_title,
                "fullStoryText": story_text
            }
        )
        # Screen 2: Panels 3 & 4 + Talk About It & Draw Picture 5
        add_screen(
            pdf_page=p_story, part_idx=2, total_parts=2,
            interaction_type="picture_story_part2",
            title=f"Picture Story: {t_title} (Part 2)",
            subtitle="Panels 3 & 4, discussion and draw picture 5!",
            block_title="Story Panels 3 & 4 + Discussion & Drawing",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"PICTURE STORY: {t_title.upper()}",
            payload={
                "panelNumberStart": 3,
                "storyTitle": t_title,
                "discussionPrompt": "What happened in the story? What would YOU do?",
                "drawPrompt": "What happens next? Draw picture 5!"
            }
        )

        # -------------------------------------------------------------
        # P_START + 2: LOOK AROUND YOU (2 Screens)
        # -------------------------------------------------------------
        p_look = t_start + 2
        p_look_obj = pages[p_look - 1]
        look_text = p_look_obj['full_text']

        # Screen 1: 6 Real-Life Examples Grid
        add_screen(
            pdf_page=p_look, part_idx=1, total_parts=2,
            interaction_type="look_around_grid",
            title=f"Look Around You: {t_title}",
            subtitle="See how AI and technology appear in our everyday lives",
            block_title="Real-Life Technology Examples",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"LOOK AROUND YOU: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "fullText": look_text
            }
        )
        # Screen 2: Bolt Says + Fun Fact + I Spy AI
        add_screen(
            pdf_page=p_look, part_idx=2, total_parts=2,
            interaction_type="look_around_bolt",
            title=f"Bolt Says & Fun Fact: {t_title}",
            subtitle="Bolt's insight, an amazing fact, and I Spy activity!",
            block_title="Bolt Says & Fun Fact & I Spy Activity",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"LOOK AROUND YOU: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "fullText": look_text,
                "iSpyPrompt": "I spy AI! Draw one AI helper you saw today."
            }
        )

        # -------------------------------------------------------------
        # P_START + 3: LET'S DO IT! (2 Screens)
        # -------------------------------------------------------------
        p_do = t_start + 3
        p_do_obj = pages[p_do - 1]
        do_text = p_do_obj['full_text']

        # Screen 1: Activity Guide & Steps 1-4
        add_screen(
            pdf_page=p_do, part_idx=1, total_parts=2,
            interaction_type="lets_do_it_steps",
            title=f"Let's Do It! • Hands-on Activity",
            subtitle="Interactive step-by-step playful challenge",
            block_title="Activity Instructions & Step Checklist",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"LET'S DO IT! • {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "fullText": do_text
            }
        )
        # Screen 2: Think & Talk & Reflection Drawing
        add_screen(
            pdf_page=p_do, part_idx=2, total_parts=2,
            interaction_type="lets_do_it_reflection",
            title=f"Think & Talk • Reflection",
            subtitle="Reflect on what you discovered and sketch your work",
            block_title="Think & Talk Discussion & Drawing Canvas",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"LET'S DO IT! • {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "fullText": do_text,
                "prompt": "Draw what you did and share with your teacher!"
            }
        )

        # -------------------------------------------------------------
        # P_START + 4: WORKSHEET (Part A) (2 Screens)
        # -------------------------------------------------------------
        p_wsa = t_start + 4
        p_wsa_obj = pages[p_wsa - 1]
        wsa_text = p_wsa_obj['full_text']

        # Screen 1: Task 1: Interactive Choice / Identification
        add_screen(
            pdf_page=p_wsa, part_idx=1, total_parts=2,
            interaction_type="worksheet_choice",
            title=f"Worksheet: {t_title} (Part A • Task 1)",
            subtitle="Identify, classify, and tick the right choices",
            block_title="Task 1: Choice & Classification Exercise",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"WORKSHEET: {t_title.upper()} (PART A)",
            payload={
                "topicTitle": t_title,
                "taskTitle": "Task 1",
                "fullText": wsa_text
            }
        )
        # Screen 2: Task 2: Drawing & Creative Writing
        add_screen(
            pdf_page=p_wsa, part_idx=2, total_parts=2,
            interaction_type="worksheet_draw",
            title=f"Worksheet: {t_title} (Part A • Task 2)",
            subtitle="Creative drawing and naming activity",
            block_title="Task 2: Creative Drawing & Canvas",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"WORKSHEET: {t_title.upper()} (PART A)",
            payload={
                "topicTitle": t_title,
                "taskTitle": "Task 2",
                "fullText": wsa_text
            }
        )

        # -------------------------------------------------------------
        # P_START + 5: WORKSHEET (Part B) (2 Screens)
        # -------------------------------------------------------------
        p_wsb = t_start + 5
        p_wsb_obj = pages[p_wsb - 1]
        wsb_text = p_wsb_obj['full_text']

        # Screen 1: Task 1: Matching / Ordering
        add_screen(
            pdf_page=p_wsb, part_idx=1, total_parts=2,
            interaction_type="worksheet_matching",
            title=f"Worksheet: {t_title} (Part B • Task 1)",
            subtitle="Match items to their definitions or jobs",
            block_title="Task 1: Interactive Matching Pairs",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"WORKSHEET: {t_title.upper()} (PART B)",
            payload={
                "topicTitle": t_title,
                "taskTitle": "Task 1: Matching",
                "fullText": wsb_text
            }
        )
        # Screen 2: Task 2: Word Box Blanks
        add_screen(
            pdf_page=p_wsb, part_idx=2, total_parts=2,
            interaction_type="worksheet_blanks",
            title=f"Worksheet: {t_title} (Part B • Task 2)",
            subtitle="Fill in the blanks using words from the Word Box",
            block_title="Task 2: Word Box Fill-in-the-Blanks",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"WORKSHEET: {t_title.upper()} (PART B)",
            payload={
                "topicTitle": t_title,
                "taskTitle": "Task 2: Word Box Blanks",
                "fullText": wsb_text
            }
        )

        # -------------------------------------------------------------
        # P_START + 6: PUZZLE FUN (2 Screens)
        # -------------------------------------------------------------
        p_puz = t_start + 6
        p_puz_obj = pages[p_puz - 1]
        puz_text = p_puz_obj['full_text']
        odd_ans = answers_by_topic[t_num]["odd"]
        count_ans = answers_by_topic[t_num]["counts"]

        # Screen 1: Odd One Out
        add_screen(
            pdf_page=p_puz, part_idx=1, total_parts=2,
            interaction_type="puzzle_odd_one",
            title=f"Puzzle Fun: {t_title} • Odd One Out!",
            subtitle="Circle the picture that does not belong in each row",
            block_title="Task 1: Odd One Out Challenge",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"PUZZLE FUN: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "correctOddIndices": odd_ans,
                "fullText": puz_text
            }
        )
        # Screen 2: Count and Write
        add_screen(
            pdf_page=p_puz, part_idx=2, total_parts=2,
            interaction_type="puzzle_count",
            title=f"Puzzle Fun: {t_title} • Count & Write!",
            subtitle="How many can you see? Count the hidden items",
            block_title="Task 2: Count and Write Challenge",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"PUZZLE FUN: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "targetCounts": count_ans,
                "fullText": puz_text
            }
        )

        # -------------------------------------------------------------
        # P_START + 7: TRACE & COLOUR (2 Screens)
        # -------------------------------------------------------------
        p_trace = t_start + 7
        p_trace_obj = pages[p_trace - 1]
        trace_text = p_trace_obj['full_text']

        # Screen 1: Trace Magic Words
        add_screen(
            pdf_page=p_trace, part_idx=1, total_parts=2,
            interaction_type="trace_words",
            title=f"Trace & Write: {t_title}",
            subtitle="Trace the magic words and write them letter by letter",
            block_title="Task 1: Magic Word Letter Tracing",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"TRACE & COLOUR: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "wordsToTrace": [w["word"] for w in magic_words],
                "fullText": trace_text
            }
        )
        # Screen 2: Colour Canvas
        add_screen(
            pdf_page=p_trace, part_idx=2, total_parts=2,
            interaction_type="colour_canvas",
            title=f"Colour Me Brightly: {t_title}",
            subtitle="Bring Bolt and the robot helpers to life with colours!",
            block_title="Task 2: Digital Colouring Studio",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"TRACE & COLOUR: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "palette": ["#EF4444", "#F59E0B", "#10B981", "#0288D1", "#8B5CF6", "#EC4899", "#1F2937", "#64748B"],
                "fullText": trace_text
            }
        )

        # -------------------------------------------------------------
        # P_START + 8: QUIZ TIME (2 Screens)
        # -------------------------------------------------------------
        p_quiz = t_start + 8
        p_quiz_obj = pages[p_quiz - 1]
        quiz_text = p_quiz_obj['full_text']
        q_ans = answers_by_topic[t_num]["quiz"]

        # Parse questions
        # Screen 1: Q1, Q2, Q3
        add_screen(
            pdf_page=p_quiz, part_idx=1, total_parts=2,
            interaction_type="quiz_part1",
            title=f"Quiz Time: {t_title} (Questions 1 - 3)",
            subtitle="Test what you have learned and earn your stars!",
            block_title="Quiz Questions 1, 2, and 3",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"QUIZ TIME: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "questionsRange": [1, 2, 3],
                "correctAnswers": q_ans[:3],
                "fullText": quiz_text
            }
        )
        # Screen 2: Q4, Q5 & Stars
        add_screen(
            pdf_page=p_quiz, part_idx=2, total_parts=2,
            interaction_type="quiz_part2",
            title=f"Quiz Time: {t_title} (Questions 4 - 5 & Stars)",
            subtitle="Answer the final questions and unlock your star rating!",
            block_title="Quiz Questions 4, 5 & My Stars Celebration",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"QUIZ TIME: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "questionsRange": [4, 5],
                "correctAnswers": q_ans[3:],
                "fullText": quiz_text
            }
        )

        # -------------------------------------------------------------
        # P_START + 9: TRUE OR FALSE (2 Screens)
        # -------------------------------------------------------------
        p_tf = t_start + 9
        p_tf_obj = pages[p_tf - 1]
        tf_text = p_tf_obj['full_text']
        tf_ans = answers_by_topic[t_num]["tf"]

        # Screen 1: 6 Statements True or False
        add_screen(
            pdf_page=p_tf, part_idx=1, total_parts=2,
            interaction_type="true_false",
            title=f"True or False: {t_title}",
            subtitle="Look at each statement and tick TRUE or FALSE",
            block_title="6 True or False Verification Statements",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"TRUE OR FALSE: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "answers": tf_ans,
                "fullText": tf_text
            }
        )
        # Screen 2: Home Connect & Self Reflection
        add_screen(
            pdf_page=p_tf, part_idx=2, total_parts=2,
            interaction_type="home_connect",
            title=f"Home Connect & Self Rating: {t_title}",
            subtitle="Explore with your family and rate your confidence",
            block_title="Home Connect Family Activity & 3-Smile Rating",
            month_num=m_num, month_title=m_title, topic_num=t_num, topic_title=t_title,
            header_cat=h_cat, header_title=f"TRUE OR FALSE: {t_title.upper()}",
            payload={
                "topicTitle": t_title,
                "fullText": tf_text,
                "ratingPrompt": "How did I do? Colour a face: I know it well! / I know some. / I need practice."
            }
        )

    # -------------------------------------------------------------
    # UNIT REVIEW (2 Screens)
    # -------------------------------------------------------------
    p_rev = m_review_p
    p_rev_obj = pages[p_rev - 1]
    rev_text = p_rev_obj['full_text']

    # Screen 1: Questions 1, 2, 3
    add_screen(
        pdf_page=p_rev, part_idx=1, total_parts=2,
        interaction_type="unit_review_part1",
        title=f"Unit Review: {m_title} (Part 1)",
        subtitle="Review what you learned across Month " + str(m_num),
        block_title="Unit Review Questions 1, 2, and 3",
        month_num=m_num, month_title=m_title, topic_num=None, topic_title=None,
        header_cat=f"MONTH {m_num}: {m_title}", header_title=f"UNIT REVIEW: {m_title}",
        payload={
            "monthNumber": m_num,
            "monthTitle": m_title,
            "questionsRange": [1, 2, 3],
            "correctAnswers": [0, 1, 2],
            "fullText": rev_text
        }
    )
    # Screen 2: Questions 4, 5, 6 & Month Trophy
    add_screen(
        pdf_page=p_rev, part_idx=2, total_parts=2,
        interaction_type="unit_review_part2",
        title=f"Unit Review: {m_title} (Part 2 & Trophy)",
        subtitle="Questions 4, 5, 6 and unlock the Month " + str(m_num) + " Mastery Trophy!",
        block_title="Unit Review Questions 4, 5, 6 & Mastery Trophy",
        month_num=m_num, month_title=m_title, topic_num=None, topic_title=None,
        header_cat=f"MONTH {m_num}: {m_title}", header_title=f"UNIT REVIEW: {m_title}",
        payload={
            "monthNumber": m_num,
            "monthTitle": m_title,
            "questionsRange": [4, 5, 6],
            "correctAnswers": [0, 1, 2],
            "fullText": rev_text
        }
    )

    # -------------------------------------------------------------
    # WORD SEARCH (1 Screen)
    # -------------------------------------------------------------
    p_ws = m_ws_p
    p_ws_obj = pages[p_ws - 1]
    ws_text = p_ws_obj['full_text']

    # Extract words to find
    ws_words = {
        1: ["AI", "MACHINE", "SMART", "SIMPLE", "ROBOT", "HELPER"],
        2: ["COMMAND", "CLEAR", "LISTEN", "ORDER", "STEP", "ALGORITHM"],
        3: ["SCHOOL", "SMART", "BOARD", "GUIDE", "HOME", "REMINDER", "LEARN"],
        4: ["DREAM", "JOB", "FUTURE", "CODER", "ENGINEER", "SCIENTIST"],
        5: ["QUESTION", "EXPLORE", "CHECK", "IMAGINE", "ART", "PICTURE"],
        6: ["SAFE", "ASK", "PRIVATE", "SHARE", "KIND", "STOP"]
    }.get(m_num, ["ROBOT", "SMART", "HELPER"])

    add_screen(
        pdf_page=p_ws, part_idx=1, total_parts=1,
        interaction_type="word_search",
        title=f"Word Search: {m_title}",
        subtitle=f"Find the hidden words across and down!",
        block_title=f"Word Search Puzzle Grid",
        month_num=m_num, month_title=m_title, topic_num=None, topic_title=None,
        header_cat=f"MONTH {m_num}: {m_title}", header_title=f"WORD SEARCH: {m_title}",
        payload={
            "monthNumber": m_num,
            "monthTitle": m_title,
            "wordsToFind": ws_words,
            "fullText": ws_text
        }
    )

print(f"Months 1-6 generated. Screen count so far: {len(screens)}")

# ─────────────────────────────────────────────────────────────────────────────
# 3. FINALE SCREENS (Pages 143 to 153) -> 15 Screens
# ─────────────────────────────────────────────────────────────────────────────
# P143: Picture Dictionary (1/2) -> 1 Screen
p143_text = pages[142]['full_text']
add_screen(
    pdf_page=143, part_idx=1, total_parts=1,
    interaction_type="picture_dictionary",
    title="My Picture Dictionary (Part 1 • A to K)",
    subtitle="All the smart words you mastered in Class 3 AI!",
    block_title="Dictionary Terms A through K",
    month_num=7, month_title="FINALE", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="MY PICTURE DICTIONARY (1/2)",
    payload={
        "dictionaryRange": "A to K",
        "fullText": p143_text
    }
)

# P144: Picture Dictionary (2/2) -> 1 Screen
p144_text = pages[143]['full_text']
add_screen(
    pdf_page=144, part_idx=1, total_parts=1,
    interaction_type="picture_dictionary",
    title="My Picture Dictionary (Part 2 • L to S)",
    subtitle="Key AI definitions and concepts for young champions",
    block_title="Dictionary Terms L through S",
    month_num=7, month_title="FINALE", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="MY PICTURE DICTIONARY (2/2)",
    payload={
        "dictionaryRange": "L to S",
        "fullText": p144_text
    }
)

# P145-P148: Olympiad Practice Test (4 pages * 2 screens = 8 screens)
# Answers: 1-a, 2-b, 3-c, 4-a, 5-b, 6-c, 7-a, 8-b, 9-c, 10-a, 11-b, 12-c, 13-a, 14-b, 15-c, 16-a, 17-b, 18-c, 19-a, 20-b
olympiad_pages = [
    {"page": 145, "part": 1, "q_range": [1, 2, 3], "ans": [0, 1, 2]},
    {"page": 145, "part": 2, "q_range": [4, 5], "ans": [0, 1]},
    {"page": 146, "part": 1, "q_range": [6, 7, 8], "ans": [2, 0, 1]},
    {"page": 146, "part": 2, "q_range": [9, 10], "ans": [2, 0]},
    {"page": 147, "part": 1, "q_range": [11, 12, 13], "ans": [1, 2, 0]},
    {"page": 147, "part": 2, "q_range": [14, 15], "ans": [1, 2]},
    {"page": 148, "part": 1, "q_range": [16, 17, 18], "ans": [0, 1, 2]},
    {"page": 148, "part": 2, "q_range": [19, 20], "ans": [0, 1]},
]

for op in olympiad_pages:
    p_num = op["page"]
    p_part = op["part"]
    q_r = op["q_range"]
    p_obj = pages[p_num - 1]
    add_screen(
        pdf_page=p_num, part_idx=p_part, total_parts=2,
        interaction_type="olympiad_quiz",
        title=f"Olympiad Practice Test • Q{q_r[0]} - Q{q_r[-1]}",
        subtitle=f"Official 20-Question Olympiad Exam Practice",
        block_title=f"Questions Q{q_r[0]} through Q{q_r[-1]}",
        month_num=7, month_title="FINALE", topic_num=None, topic_title=None,
        header_cat="AI OLYMPIAD • CLASS 3", header_title=f"PRACTICE TEST • PART {p_num - 144}",
        payload={
            "testPart": p_num - 144,
            "questionsRange": q_r,
            "correctAnswers": op["ans"],
            "fullText": p_obj['full_text'],
            "isFinalScreen": (p_num == 148 and p_part == 2)
        }
    )

# P149: Certificate of AI Explorer (1 Screen)
p149_text = pages[148]['full_text']
add_screen(
    pdf_page=149, part_idx=1, total_parts=1,
    interaction_type="certificate",
    title="Official Certificate of AI Explorer",
    subtitle="Congratulations on completing the 6-Month AI Curriculum!",
    block_title="Personalized Official Certificate",
    month_num=7, month_title="FINALE", topic_num=None, topic_title=None,
    header_cat="AI OLYMPIAD • CLASS 3", header_title="CERTIFICATE OF COMPLETION",
    payload={
        "awardTitle": "Certificate of AI Explorer",
        "classGrade": "Class 3",
        "pillars": ["DISCOVER", "CONNECT", "SOLVE", "RISE", "CREATE", "CARE"],
        "fullText": p149_text
    }
)

# P150-P153: Answer Keys & Solutions (4 Screens)
ak_titles = [
    (150, "Answer Key • Topics 1 to 4", "Meet My AI Friend, Machines, Command, Order"),
    (151, "Answer Key • Topics 5 to 9", "AI at School, Home, When I Grow Up, People, Ask"),
    (152, "Answer Key • Topics 10 to 12 & Olympiad Test", "Draw & Imagine, Safety Rules, Share, Reviews & Test"),
    (153, "Word Search Solutions", "Complete word search answer keys for all 6 months")
]

for ak_p, ak_t, ak_sub in ak_titles:
    ak_obj = pages[ak_p - 1]
    add_screen(
        pdf_page=ak_p, part_idx=1, total_parts=1,
        interaction_type="answer_key",
        title=ak_t,
        subtitle=ak_sub,
        block_title="Teacher & Parent Verified Solution Key",
        month_num=7, month_title="FINALE", topic_num=None, topic_title=None,
        header_cat="AI OLYMPIAD • CLASS 3", header_title="ANSWER KEY & SOLUTIONS",
        payload={
            "solutionPageNumber": ak_p,
            "fullText": ak_obj['full_text']
        }
    )

print(f"Total screens compiled: {len(screens)}")

# Save to scratch/gaioFullBookScreens.json
with open('scratch/gaioFullBookScreens.json', 'w', encoding='utf-8') as f:
    json.dump(screens, f, indent=2, ensure_ascii=False)

print("Saved scratch/gaioFullBookScreens.json successfully!")
