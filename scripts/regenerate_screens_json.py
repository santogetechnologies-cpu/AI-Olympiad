"""
Regenerate gaioFullBookScreens.json with complete, topic-specific payload data.
Uses topic_content_data.json as the source of truth.
"""
import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/topic_content_data.json', 'r', encoding='utf-8') as f:
    content_data = json.load(f)

topics = content_data['topics']
word_searches = content_data['wordSearches']
unit_reviews = content_data['unitReviews']

topics_meta = [
    {"num": 1,  "month": 1, "mtitle": "AI DISCOVER",  "area": "AI BASICS",            "title": "Meet My AI Friend",       "start_p": 6},
    {"num": 2,  "month": 1, "mtitle": "AI DISCOVER",  "area": "AI BASICS",            "title": "Machines That Help Us",   "start_p": 16},
    {"num": 3,  "month": 2, "mtitle": "AI CONNECT",   "area": "COMMUNICATE WITH AI",  "title": "Give Me a Command!",      "start_p": 29},
    {"num": 4,  "month": 2, "mtitle": "AI CONNECT",   "area": "COMMUNICATE WITH AI",  "title": "Put It in Order!",        "start_p": 39},
    {"num": 5,  "month": 3, "mtitle": "AI SOLVE",     "area": "AI APPLICATIONS",      "title": "AI Goes to School",       "start_p": 52},
    {"num": 6,  "month": 3, "mtitle": "AI SOLVE",     "area": "AI APPLICATIONS",      "title": "AI Comes Home",           "start_p": 62},
    {"num": 7,  "month": 4, "mtitle": "AI RISE",      "area": "AI & CAREER",          "title": "When I Grow Up",          "start_p": 75},
    {"num": 8,  "month": 4, "mtitle": "AI RISE",      "area": "AI & CAREER",          "title": "People Behind Technology","start_p": 85},
    {"num": 9,  "month": 5, "mtitle": "AI CREATE",    "area": "AI TOOLS",             "title": "Ask & Explore",           "start_p": 98},
    {"num": 10, "month": 5, "mtitle": "AI CREATE",    "area": "AI TOOLS",             "title": "Draw & Imagine",          "start_p": 108},
    {"num": 11, "month": 6, "mtitle": "AI CARE",      "area": "RESPONSIBLE AI",       "title": "My AI Safety Rules",      "start_p": 121},
    {"num": 12, "month": 6, "mtitle": "AI CARE",      "area": "RESPONSIBLE AI",       "title": "Share with Care",         "start_p": 131},
]

months_meta = [
    {"num": 1, "title": "AI DISCOVER", "sub": "See • Understand • Explore",    "cover": 5,   "review": 26, "wordsearch": 27},
    {"num": 2, "title": "AI CONNECT",  "sub": "Listen • Order • Command",      "cover": 28,  "review": 49, "wordsearch": 50},
    {"num": 3, "title": "AI SOLVE",    "sub": "Learn • Assist • Solve",        "cover": 51,  "review": 72, "wordsearch": 73},
    {"num": 4, "title": "AI RISE",     "sub": "Aspire • Create • Build",       "cover": 74,  "review": 95, "wordsearch": 96},
    {"num": 5, "title": "AI CREATE",   "sub": "Imagine • Express • Discover", "cover": 97,  "review": 118, "wordsearch": 119},
    {"num": 6, "title": "AI CARE",     "sub": "Verify • Protect • Respect",    "cover": 120, "review": 141, "wordsearch": 142},
]

screens = []
screen_counter = 1

def add_screen(pdf_page, part_idx, total_parts, interaction_type, title, subtitle,
               block_title, month_num, month_title, topic_num, topic_title,
               header_cat, header_title, payload):
    global screen_counter
    s = {
        "id": f"p{pdf_page}-s{part_idx}",
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

# ─────────────────────────────────────────────────────────────────────
# 1. INTRO SCREENS (Pages 1–4) — 7 screens
# ─────────────────────────────────────────────────────────────────────
add_screen(1, 1, 1, "book_cover",
    "GLOBAL ARTIFICIAL INTELLIGENCE OLYMPIAD",
    "Class 3 • Beginner AI Coursebook & Activity Guide",
    "Coursebook Front Cover", 0, "WELCOME", None, None,
    "GLOBAL AI OLYMPIAD", "CLASS 3 BOOK",
    {"mascot": "Bolt", "edition": "2026 Edition",
     "tagline": "A Playful Journey into Artificial Intelligence for Young Minds"})

add_screen(2, 1, 2, "welcome_bolt",
    "Welcome to AI Olympiad! • Meet Bolt",
    "Hello, Super Kids! Meet your friendly AI robot companion.",
    "Meet Bolt Introduction", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "WELCOME!",
    {"greeting": "Hello, Super Kids! MEET BOLT!",
     "speech": "Hi! I am Bolt, your robot friend. Together we will see, play, build and learn all about AI. Are you ready? Let's go!"})

add_screen(2, 2, 2, "book_guide",
    "Look for These Pictures in Your Book!",
    "Your Visual Icon Guide to Activities & Lessons",
    "Activity Guide & Icons Key", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "ACTIVITY GUIDE",
    {"guideItems": [
        {"name": "LET'S LEARN",     "desc": "Learn something new with Bolt",      "icon": "BookOpen"},
        {"name": "PICTURE STORY",   "desc": "Read an illustrated comic story",     "icon": "MessageSquare"},
        {"name": "LOOK AROUND YOU", "desc": "See AI helpers in real life",         "icon": "Compass"},
        {"name": "LET'S DO IT!",    "desc": "Hands-on playful activity",           "icon": "Gamepad2"},
        {"name": "WORKSHEET",       "desc": "Write, tick and solve tasks",          "icon": "CheckSquare"},
        {"name": "PUZZLE FUN",      "desc": "Solve visual logic puzzles",           "icon": "Puzzle"},
        {"name": "TRACE & COLOUR",  "desc": "Trace words and colour art",           "icon": "Palette"},
        {"name": "QUIZ TIME",       "desc": "Earn stars with quiz questions",        "icon": "Star"},
        {"name": "TRUE OR FALSE",   "desc": "Identify facts and connect at home",   "icon": "CheckCircle2"},
        {"name": "MAGIC WORDS",     "desc": "Key AI vocabulary words",              "icon": "Sparkles"},
    ]})

add_screen(3, 1, 2, "student_profile",
    "All About Me! • My AI Student Profile",
    "Personalize your official AI Olympiad coursebook",
    "Student ID & Drawing", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "STUDENT PROFILE",
    {"fields": ["My Name", "My Age", "My Class", "My Teacher"], "drawingPrompt": "My photo or drawing"})

add_screen(3, 2, 2, "student_faves",
    "My Favourite Things & Bolt Asks",
    "Tell Bolt what you love and what you want to explore",
    "Favourites & Bolt's Question", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "FAVOURITES & GOALS",
    {"favouriteCategories": ["Colour", "Food", "Animal", "Game", "Book", "Dream job"],
     "boltQuestion": "Bolt asks: What do you want to learn about AI?"})

add_screen(4, 1, 2, "journey_map",
    "My 6-Month AI Journey • Semester 1",
    "Follow the learning path: Months 1, 2, and 3",
    "Journey Path Part 1 (Months 1-3)", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "JOURNEY ROADMAP",
    {"semester": 1, "months": [
        {"month": 1, "title": "MONTH 1: AI DISCOVER", "area": "AI Basics",         "topics": ["Meet My AI Friend", "Machines That Help Us"]},
        {"month": 2, "title": "MONTH 2: AI CONNECT",  "area": "Communicate with AI","topics": ["Give Me a Command!", "Put It in Order!"]},
        {"month": 3, "title": "MONTH 3: AI SOLVE",    "area": "AI Applications",    "topics": ["AI Goes to School", "AI Comes Home"]},
    ]})

add_screen(4, 2, 2, "journey_map",
    "My 6-Month AI Journey • Semester 2",
    "Follow the learning path: Months 4, 5, and 6",
    "Journey Path Part 2 (Months 4-6)", 0, "WELCOME", None, None,
    "AI OLYMPIAD • CLASS 3", "JOURNEY ROADMAP",
    {"semester": 2, "months": [
        {"month": 4, "title": "MONTH 4: AI RISE",   "area": "AI & Career",   "topics": ["When I Grow Up", "People Behind Technology"]},
        {"month": 5, "title": "MONTH 5: AI CREATE", "area": "AI Tools",      "topics": ["Ask & Explore", "Draw & Imagine"]},
        {"month": 6, "title": "MONTH 6: AI CARE",   "area": "Responsible AI","topics": ["My AI Safety Rules", "Share with Care"]},
    ]})


# ─────────────────────────────────────────────────────────────────────
# 2. MONTHS 1–6 (Pages 5–142) — 264 screens
# ─────────────────────────────────────────────────────────────────────
for m_meta in months_meta:
    m_num    = m_meta["num"]
    m_title  = m_meta["title"]
    m_sub    = m_meta["sub"]
    m_cover  = m_meta["cover"]
    m_review = m_meta["review"]
    m_ws     = m_meta["wordsearch"]

    t_first  = topics_meta[(m_num - 1) * 2]
    t_second = topics_meta[(m_num - 1) * 2 + 1]

    # ── Month Cover (1 screen)
    add_screen(m_cover, 1, 1, "month_cover",
        f"MONTH {m_num}: {m_title}", m_sub,
        f"Month {m_num} Overview",
        m_num, m_title, None, None,
        "AI OLYMPIAD • CLASS 3", f"MONTH {m_num}: {m_title}",
        {"monthNumber": m_num, "monthTitle": m_title, "subtitle": m_sub,
         "topics": [
             {"topicNumber": t_first["num"],  "title": t_first["title"],  "area": t_first["area"]},
             {"topicNumber": t_second["num"], "title": t_second["title"], "area": t_second["area"]},
         ]})

    for tm in [t_first, t_second]:
        t_num   = tm["num"]
        t_title = tm["title"]
        t_area  = tm["area"]
        t_start = tm["start_p"]
        td      = topics[str(t_num)]

        h_cat   = f"MONTH {m_num}: {m_title}"
        h_title = f"TOPIC {t_num} • MONTH {m_num} • {t_area}"

        # ── Page +0: LET'S LEARN (2 screens)
        add_screen(t_start, 1, 2, "lets_learn_intro",
            f"Let's Learn: {t_title}",
            "Read and explore the core concept with Bolt",
            "Core Lesson Concept & AI Helpers",
            m_num, m_title, t_num, t_title, h_cat, h_title,
            {"topicNumber": t_num, "topicTitle": t_title, "area": t_area,
             "concepts": td["concepts"],
             "helpers": td.get("lookData", {}).get("examples", [])[:4]})

        add_screen(t_start, 2, 2, "lets_learn_words",
            f"Magic Words: {t_title}",
            "Important new words to learn and remember!",
            "Magic Words Vocabulary Cards",
            m_num, m_title, t_num, t_title, h_cat, h_title,
            {"magicWords": td["magicWords"]})

        # ── Page +1: PICTURE STORY (2 screens)
        add_screen(t_start + 1, 1, 2, "picture_story_part1",
            f"Picture Story: {t_title} (Part 1)",
            "Look at the pictures. Read the story with Bolt!",
            "Story Panels 1 & 2",
            m_num, m_title, t_num, t_title, h_cat, f"PICTURE STORY: {t_title.upper()}",
            {"storyTitle": t_title,
             "panels": td["storyPanels"][:4],
             "panelStart": 1})

        add_screen(t_start + 1, 2, 2, "picture_story_part2",
            f"Picture Story: {t_title} (Part 2)",
            "Panels 3 & 4, discussion and draw picture 5!",
            "Story Panels 3 & 4 + Discussion & Drawing",
            m_num, m_title, t_num, t_title, h_cat, f"PICTURE STORY: {t_title.upper()}",
            {"storyTitle": t_title,
             "panels": td["storyPanels"][4:8] if len(td["storyPanels"]) > 4 else td["storyPanels"][-2:],
             "panelStart": 3,
             "discussionPrompt": "What happened in the story? What would YOU do?",
             "drawPrompt": "What happens next? Draw picture 5!"})

        # ── Page +2: LOOK AROUND YOU (2 screens)
        look_data = td.get("lookData", {})
        add_screen(t_start + 2, 1, 2, "look_around_grid",
            f"Look Around You: {t_title}",
            "See how AI and technology appear in our everyday lives",
            "Real-Life Technology Examples",
            m_num, m_title, t_num, t_title, h_cat, f"LOOK AROUND YOU: {t_title.upper()}",
            {"topicTitle": t_title,
             "examples": look_data.get("examples", []),
             "iSpyPrompt": f"I spy AI! Find one example of {t_title.lower()} near you."})

        add_screen(t_start + 2, 2, 2, "look_around_bolt",
            f"Bolt Says & Fun Fact: {t_title}",
            "Bolt's insight, an amazing fact, and I Spy activity!",
            "Bolt Says & Fun Fact & I Spy Activity",
            m_num, m_title, t_num, t_title, h_cat, f"LOOK AROUND YOU: {t_title.upper()}",
            {"topicTitle": t_title,
             "boltSays": look_data.get("boltSays", f"Look around you! {t_title} is everywhere!"),
             "funFact": look_data.get("funFact", f"AI is helping with {t_title.lower()} all over the world!"),
             "iSpyPrompt": "I spy AI! Draw one AI helper you saw today."})

        # ── Page +3: LET'S DO IT! (2 screens)
        add_screen(t_start + 3, 1, 2, "lets_do_it_steps",
            f"Let's Do It! • {t_title}",
            "Interactive step-by-step playful challenge",
            "Activity Instructions & Step Checklist",
            m_num, m_title, t_num, t_title, h_cat, f"LET'S DO IT! • {t_title.upper()}",
            {"topicTitle": t_title,
             "steps": td.get("activitySteps", [])})

        add_screen(t_start + 3, 2, 2, "lets_do_it_reflection",
            f"Think & Talk • {t_title}",
            "Reflect on what you discovered and sketch your work",
            "Think & Talk Discussion & Drawing Canvas",
            m_num, m_title, t_num, t_title, h_cat, f"LET'S DO IT! • {t_title.upper()}",
            {"topicTitle": t_title,
             "talkPrompt": td.get("homeConnect", {}).get("talkPrompt", "Tell your family what you learned today!"),
             "drawPrompt": td.get("homeConnect", {}).get("drawPrompt", "Draw what you did and share with your teacher!")})

        # ── Page +4: WORKSHEET PART A (2 screens)
        add_screen(t_start + 4, 1, 2, "worksheet_choice",
            f"Worksheet: {t_title} (Part A • Task 1)",
            "Identify, classify, and tick the right choices",
            "Task 1: Choice & Classification Exercise",
            m_num, m_title, t_num, t_title, h_cat, f"WORKSHEET: {t_title.upper()} (PART A)",
            {"topicTitle": t_title,
             "taskTitle": "Task 1: Tick the Right Answers",
             "items": look_data.get("examples", [f"AI helper {i+1}" for i in range(6)])[:6],
             "instruction": f"Tick the things related to {t_title.lower()}:"})

        add_screen(t_start + 4, 2, 2, "worksheet_draw",
            f"Worksheet: {t_title} (Part A • Task 2)",
            "Creative drawing and naming activity",
            "Task 2: Creative Drawing & Canvas",
            m_num, m_title, t_num, t_title, h_cat, f"WORKSHEET: {t_title.upper()} (PART A)",
            {"topicTitle": t_title,
             "taskTitle": "Task 2: Draw & Name",
             "prompt": f"Draw your favourite example of {t_title.lower()} below:",
             "namingPrompt": "Write its name here:"})

        # ── Page +5: WORKSHEET PART B (2 screens)
        add_screen(t_start + 5, 1, 2, "worksheet_matching",
            f"Worksheet: {t_title} (Part B • Task 1)",
            "Match items to their definitions or jobs",
            "Task 1: Interactive Matching Pairs",
            m_num, m_title, t_num, t_title, h_cat, f"WORKSHEET: {t_title.upper()} (PART B)",
            {"topicTitle": t_title,
             "taskTitle": "Task 1: Match the Pairs",
             "pairs": [{"left": w["word"], "right": w["definition"]} for w in td["magicWords"]]})

        add_screen(t_start + 5, 2, 2, "worksheet_blanks",
            f"Worksheet: {t_title} (Part B • Task 2)",
            "Fill in the blanks using words from the Word Box",
            "Task 2: Word Box Fill-in-the-Blanks",
            m_num, m_title, t_num, t_title, h_cat, f"WORKSHEET: {t_title.upper()} (PART B)",
            {"topicTitle": t_title,
             "taskTitle": "Task 2: Fill in the Blanks",
             "wordBox": [w["word"] for w in td["magicWords"]],
             "sentences": [
                f"AI stands for ___ Intelligence.",
                f"A {td['magicWords'][0]['word'].lower()} is: {td['magicWords'][0]['definition'][:30]}...",
                f"Bolt is a friendly AI ___.",
             ]})

        # ── Page +6: PUZZLE FUN (2 screens)
        add_screen(t_start + 6, 1, 2, "puzzle_odd_one",
            f"Puzzle Fun: {t_title} • Odd One Out!",
            "Circle the picture that does not belong in each row",
            "Task 1: Odd One Out Challenge",
            m_num, m_title, t_num, t_title, h_cat, f"PUZZLE FUN: {t_title.upper()}",
            {"topicTitle": t_title,
             "correctOddIndices": td.get("oddOneCorrects", [3, 2, 3]),
             "rows": [
                {"items": look_data.get("examples", ["Robot", "Phone", "Speaker", "Stone"])[:4], "oddIdx": td.get("oddOneCorrects", [3,2,3])[0]},
                {"items": [w["word"] for w in td["magicWords"]] + ["Apple"], "oddIdx": td.get("oddOneCorrects", [3,2,3])[1]},
                {"items": td["concepts"][:3] + ["Eat pizza"], "oddIdx": td.get("oddOneCorrects", [3,2,3])[2] if len(td.get("oddOneCorrects", [])) > 2 else 3},
             ]})

        add_screen(t_start + 6, 2, 2, "puzzle_count",
            f"Puzzle Fun: {t_title} • Count & Write!",
            "How many can you see? Count the hidden items",
            "Task 2: Count and Write Challenge",
            m_num, m_title, t_num, t_title, h_cat, f"PUZZLE FUN: {t_title.upper()}",
            {"topicTitle": t_title,
             "targetCounts": td.get("countTargets", [4, 3, 5]),
             "items": [
                {"label": td["magicWords"][0]["word"] if td["magicWords"] else "Robot", "count": td.get("countTargets", [4,3,5])[0]},
                {"label": td["magicWords"][1]["word"] if len(td["magicWords"]) > 1 else "Helper", "count": td.get("countTargets", [4,3,5])[1]},
                {"label": "AI helpers", "count": td.get("countTargets", [4,3,5])[2]},
             ]})

        # ── Page +7: TRACE & COLOUR (2 screens)
        add_screen(t_start + 7, 1, 2, "trace_words",
            f"Trace & Write: {t_title}",
            "Trace the magic words and write them letter by letter",
            "Task 1: Magic Word Letter Tracing",
            m_num, m_title, t_num, t_title, h_cat, f"TRACE & COLOUR: {t_title.upper()}",
            {"topicTitle": t_title,
             "wordsToTrace": td.get("traceWords", [w["word"] for w in td["magicWords"][:3]])})

        add_screen(t_start + 7, 2, 2, "colour_canvas",
            f"Colour Me Brightly: {t_title}",
            "Bring Bolt and the robot helpers to life with colours!",
            "Task 2: Digital Colouring Studio",
            m_num, m_title, t_num, t_title, h_cat, f"TRACE & COLOUR: {t_title.upper()}",
            {"topicTitle": t_title,
             "palette": ["#EF4444", "#F59E0B", "#10B981", "#0288D1", "#8B5CF6", "#EC4899", "#1F2937", "#64748B"],
             "prompt": f"Colour the {t_title} scene!"})

        # ── Page +8: QUIZ TIME (2 screens)
        quiz_qs = td.get("quizQuestions", [])
        add_screen(t_start + 8, 1, 2, "quiz_part1",
            f"Quiz Time: {t_title} (Questions 1 - 3)",
            "Test what you have learned and earn your stars!",
            "Quiz Questions 1, 2, and 3",
            m_num, m_title, t_num, t_title, h_cat, f"QUIZ TIME: {t_title.upper()}",
            {"topicTitle": t_title,
             "questions": quiz_qs[:3]})

        add_screen(t_start + 8, 2, 2, "quiz_part2",
            f"Quiz Time: {t_title} (Questions 4 - 5 & Stars)",
            "Answer the final questions and unlock your star rating!",
            "Quiz Questions 4, 5 & My Stars Celebration",
            m_num, m_title, t_num, t_title, h_cat, f"QUIZ TIME: {t_title.upper()}",
            {"topicTitle": t_title,
             "questions": quiz_qs[3:5]})

        # ── Page +9: TRUE OR FALSE + HOME CONNECT (2 screens)
        tf_stmts = td.get("trueFalse", [])
        add_screen(t_start + 9, 1, 2, "true_false",
            f"True or False: {t_title}",
            "Look at each statement. Is it True or False?",
            "True or False Statements",
            m_num, m_title, t_num, t_title, h_cat, f"TRUE OR FALSE: {t_title.upper()}",
            {"topicTitle": t_title,
             "statements": tf_stmts})

        add_screen(t_start + 9, 2, 2, "home_connect",
            f"Home Connect: {t_title}",
            "Connect your learning with home activities!",
            "Home Connect Activity & Self-Assessment",
            m_num, m_title, t_num, t_title, h_cat, f"HOME CONNECT: {t_title.upper()}",
            {"topicTitle": t_title,
             "prompt": td.get("homeConnect", {}).get("prompt", f"Find one {t_title.lower()} example at home!"),
             "talkPrompt": td.get("homeConnect", {}).get("talkPrompt", "Tell your family what you learned today!"),
             "selfAssess": ["I know it well!", "I know some.", "I need practice."]})

    # ── MONTH REVIEW PAGE (2 screens)
    rev_data = unit_reviews.get(str(m_num), {})
    rev_qs = rev_data.get("questions", [f"What did you learn in Month {m_num}?"])
    add_screen(m_review, 1, 2, "unit_review_part1",
        f"Month {m_num} Review: {m_title} (Part 1)",
        "Reflect on everything you learned this month!",
        f"Month {m_num} Unit Review Part 1",
        m_num, m_title, None, None,
        f"AI OLYMPIAD • CLASS 3", f"MONTH {m_num} REVIEW",
        {"monthTitle": m_title,
         "questions": rev_qs[:3] if rev_qs else [f"What did you learn this month?", f"Name one AI helper.", "Draw your favourite activity."]})

    add_screen(m_review, 2, 2, "unit_review_part2",
        f"Month {m_num} Review: {m_title} (Part 2)",
        "Complete the review and earn your Month Badge!",
        f"Month {m_num} Unit Review Part 2 & Badge",
        m_num, m_title, None, None,
        f"AI OLYMPIAD • CLASS 3", f"MONTH {m_num} REVIEW",
        {"monthTitle": m_title,
         "questions": rev_qs[3:6] if len(rev_qs) > 3 else [f"Which topic was your favourite?", f"What was the hardest part?", f"What will you explore next?"],
         "badgeLabel": f"Month {m_num} Complete!"})

    # ── WORD SEARCH (1 screen)
    ws_data = word_searches.get(str(m_num), {})
    add_screen(m_ws, 1, 1, "word_search",
        f"Word Search: {m_title}",
        f"Find all the hidden AI words from Month {m_num}!",
        f"Month {m_num} Word Search",
        m_num, m_title, None, None,
        f"AI OLYMPIAD • CLASS 3", f"WORD SEARCH: {m_title}",
        {"monthTitle": m_title,
         "hiddenWords": ws_data.get("words", ["AI", "ROBOT", "SMART", "LEARN", "HELPER", "BOLT"])})


# ─────────────────────────────────────────────────────────────────────
# 3. FINALE SCREENS (Pages 143–153) — 15 screens
# ─────────────────────────────────────────────────────────────────────
# Picture Dictionary (Pages 143-144) — 2 screens
add_screen(143, 1, 2, "picture_dictionary",
    "AI Picture Dictionary (A–M)",
    "Flip through the AI Olympiad visual dictionary!",
    "Picture Dictionary Part 1: Letters A to M",
    7, "FINALE", None, None,
    "AI OLYMPIAD • CLASS 3", "PICTURE DICTIONARY",
    {"words": [
        {"word": "Algorithm", "definition": "A set of steps to solve a problem", "emoji": "📋"},
        {"word": "Artificial Intelligence", "definition": "A smart helper that can learn and think", "emoji": "🤖"},
        {"word": "Bolt", "definition": "Your AI robot learning companion", "emoji": "⚡"},
        {"word": "Command", "definition": "A clear instruction given to a machine", "emoji": "📢"},
        {"word": "Data", "definition": "Information collected and used by AI", "emoji": "💾"},
        {"word": "Engineer", "definition": "Someone who designs and builds machines", "emoji": "🔧"},
        {"word": "Future", "definition": "What comes next — shaped by learning today", "emoji": "🚀"},
    ]})

add_screen(144, 2, 2, "picture_dictionary",
    "AI Picture Dictionary (N–Z)",
    "Explore more AI vocabulary words!",
    "Picture Dictionary Part 2: Letters N to Z",
    7, "FINALE", None, None,
    "AI OLYMPIAD • CLASS 3", "PICTURE DICTIONARY",
    {"words": [
        {"word": "Robot", "definition": "A machine that can move and do tasks", "emoji": "🤖"},
        {"word": "Safe", "definition": "Protected from harm, especially online", "emoji": "🛡️"},
        {"word": "Smart", "definition": "Able to learn and respond to inputs", "emoji": "💡"},
        {"word": "Technology", "definition": "Tools and machines made by humans", "emoji": "💻"},
        {"word": "Voice", "definition": "Sound used to give commands to AI", "emoji": "🎙️"},
        {"word": "Wisdom", "definition": "Using knowledge in a good and kind way", "emoji": "📚"},
        {"word": "eXplore", "definition": "To discover and ask questions curiously", "emoji": "🔍"},
    ]})

# GAIO Olympiad Quiz — 8 screens (4 parts × 2)
olympiad_qs = [
    [
        {"id":1,"q":"Q1. AI stands for Artificial...","options":["Intelligence","Ice-cream","Interest"],"correct":0},
        {"id":2,"q":"Q2. Bolt is a friendly AI...","options":["Dog","Robot","Fish"],"correct":1},
        {"id":3,"q":"Q3. A command is a clear...","options":["Story","Instruction","Game"],"correct":1},
    ],
    [
        {"id":4,"q":"Q4. Steps in the right order make an...","options":["Album","Algorithm","Alphabet"],"correct":1},
        {"id":5,"q":"Q5. AI at school can help with...","options":["Cooking","Learning","Sleeping"],"correct":1},
        {"id":6,"q":"Q6. A smart home device is a...","options":["Brick","Chair","Smart speaker"],"correct":2},
    ],
    [
        {"id":7,"q":"Q7. To be safe online, always...","options":["Share everything","Ask a trusted adult","Hide your device"],"correct":1},
        {"id":8,"q":"Q8. Private information includes your...","options":["Favourite colour","Home address","Dream job"],"correct":1},
        {"id":9,"q":"Q9. AI can help artists by...","options":["Eating pizza","Creating images","Playing cricket"],"correct":1},
    ],
    [
        {"id":10,"q":"Q10. Who makes AI robots work?","options":["Magic","Coders and engineers","Plants"],"correct":1},
        {"id":11,"q":"Q11. The STOP-THINK-ASK rule is for...","options":["Cooking","Online safety","Sports"],"correct":1},
        {"id":12,"q":"Q12. AI learns from...","options":["Pizza","Examples and data","Sleeping"],"correct":1},
    ],
]

for i, q_set in enumerate(olympiad_qs):
    part = i + 1
    add_screen(145 + i, 1, 2, "olympiad_quiz",
        f"GAIO Olympiad Quiz! Part {part}A",
        f"Questions {(part-1)*3+1} to {(part-1)*3+3}",
        f"Olympiad Quiz Part {part} Questions",
        7, "FINALE", None, None,
        "GLOBAL AI OLYMPIAD", f"OLYMPIAD QUIZ • PART {part}",
        {"partNumber": part, "questions": q_set})

    add_screen(145 + i, 2, 2, "olympiad_quiz",
        f"GAIO Olympiad Quiz! Part {part}B",
        "Check your answers and see how many you got right!",
        f"Olympiad Quiz Part {part} Results",
        7, "FINALE", None, None,
        "GLOBAL AI OLYMPIAD", f"OLYMPIAD QUIZ • PART {part}",
        {"partNumber": part, "isResults": True, "questions": q_set})

# Answer Key (Pages 149-152) — 4 screens
answer_keys = [
    {"month": "Month 1", "topics": ["Meet My AI Friend", "Machines That Help Us"]},
    {"month": "Month 2", "topics": ["Give Me a Command!", "Put It in Order!"]},
    {"month": "Month 3", "topics": ["AI Goes to School", "AI Comes Home"]},
    {"month": "Months 4-6", "topics": ["When I Grow Up", "People Behind Technology", "Ask & Explore", "Draw & Imagine", "My AI Safety Rules", "Share with Care"]},
]
for i, ak in enumerate(answer_keys):
    add_screen(149 + i, 1, 1, "answer_key",
        f"Answer Key: {ak['month']}",
        f"Check your answers for {', '.join(ak['topics'][:2])}",
        f"Answer Key for {ak['month']}",
        7, "FINALE", None, None,
        "AI OLYMPIAD • CLASS 3", f"ANSWER KEY: {ak['month'].upper()}",
        {"monthLabel": ak['month'], "topicsCovered": ak['topics']})

# Certificate (Page 153) — 1 screen
add_screen(153, 1, 1, "certificate",
    "Certificate of Completion!",
    "Congratulations, AI Explorer! You finished the GAIO Class 3 Book!",
    "AI Olympiad Certificate of Achievement",
    7, "FINALE", None, None,
    "GLOBAL AI OLYMPIAD", "CERTIFICATE",
    {"title": "Certificate of Achievement",
     "body": "This is to certify that you have successfully completed the GAIO Class 3 AI Coursebook!",
     "badge": "AI Explorer",
     "emoji": "🏆"})


# ─────────────────────────────────────────────────────────────────────
# SAVE
# ─────────────────────────────────────────────────────────────────────
print(f"Total screens generated: {len(screens)}")

# Validate IDs are unique
ids = [s["id"] for s in screens]
if len(ids) != len(set(ids)):
    dupes = [x for x in ids if ids.count(x) > 1]
    print(f"WARNING: Duplicate IDs found: {set(dupes)}")
else:
    print("✅ All screen IDs are unique")

with open('src/components/gaio/config/gaioFullBookScreens.json', 'w', encoding='utf-8') as f:
    json.dump(screens, f, ensure_ascii=False, indent=2)

print(f"✅ Saved gaioFullBookScreens.json with {len(screens)} screens")

# Show breakdown
from collections import Counter
types = Counter(s["interactionType"] for s in screens)
months = Counter(s["monthNumber"] for s in screens)
print("\nInteraction type counts:")
for t, c in sorted(types.items()):
    print(f"  {t}: {c}")
print("\nMonth counts:")
for m, c in sorted(months.items()):
    print(f"  Month {m}: {c} screens")
