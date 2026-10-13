# -*- coding: utf-8 -*-
"""
Generator for middle-class8-ch2-l2.json
Level: middle
Class: class8 (Class 8 • Age 13-14)
Chapter: ch2 (Communicate with AI • CONNECT)
Lesson Title: Code a Solution
Lesson ID: l2
Filename: middle-class8-ch2-l2.json
Mascot: Cipher (The Analytical Guide)

Requirements:
- >= 12,000 words
- >= 1,200 lines
- SIMPLICITY & PROBLEM SOLVING: How to take a genuine school or community problem (library book return reminders, water bottle refill tracking) and design an automated digital solution. Zero advanced math or coding syntax. Accessible to everyone.
- Clean visual style: minimal icons, academic clarity, zero emoji spam.
- Image placeholders included verbatim:
  - "[IMAGE_PLACEHOLDER: Student problem-solving whiteboard mapping community issue to digital solution stages]"
  - "[IMAGE_PLACEHOLDER: UI wireframe of a school library book tracker showing days remaining before due date]"
  - "[IMAGE_PLACEHOLDER: Flow diagram: Scan Student ID -> Calculate Return Date -> Send Reminder SMS]"
- Toast guidance included verbatim:
  - "tap_prompt": "Set the notification rule: IF due_date <= 2 days THEN send SMS reminder."
  - "great_job": "Notification logic verified! Students receive friendly alerts before overdue fines accrue."
  - "try_again": "Verify the calculation: Subtract checkout date from return date to find days remaining."
- Real-life examples: School library automated return alerts, community recycling reward point counters, cafeteria weekly meal planner balance.
- Activity: "Library Alert Solution Architect".
- Output JSON Schema: lessonId, title, level, class, chapter, introduction, sections, activities, summary, assessment, resources.
"""

import json
import os
import sys

def build_lesson():
    target_path = "public/content/middle/middle-class8-ch2-l2.json"

    data = {
        "lessonId": "l2",
        "title": "Code a Solution",
        "level": "middle",
        "class": "class8",
        "classNumber": 8,
        "chapter": "ch2",
        "chapterNumber": 2,
        "chapterTitle": "Communicate with AI",
        "chapterTheme": "CONNECT",
        "lessonNumber": 2,
        "lessonTitle": "Code a Solution",
        "filename": "middle-class8-ch2-l2.json",
        "mascot": {
            "name": "Cipher",
            "title": "The Analytical Guide",
            "personality": "Analytical, patient, and methodical guide who empowers students to become problem-solving architects by transforming everyday community frustrations into clean, automated digital solutions.",
            "catchphrase": "Every great program begins not with code, but with empathy and clear problem decomposition.",
            "voiceStyle": "Analytical, calm, patient, structured, and crystal-clear"
        },
        "metadata": {
            "duration": "45 mins",
            "ageGroup": "13-14 years",
            "grade": "Class 8",
            "difficulty": "introductory",
            "totalWords": 12000,
            "version": "1.0",
            "lastUpdated": "2026-10-13",
            "tags": [
                "problem solving",
                "solution architecture",
                "computational thinking",
                "library book tracker",
                "decomposition",
                "flow diagrams",
                "notification rules",
                "edge cases",
                "user testing"
            ],
            "prerequisites": ["middle-class8-ch2-l1.json"],
            "nextLesson": "middle-class8-ch3-l1.json"
        },
        "toastGuidance": {
            "tap_prompt": "Set the notification rule: IF due_date <= 2 days THEN send SMS reminder.",
            "great_job": "Notification logic verified! Students receive friendly alerts before overdue fines accrue.",
            "try_again": "Verify the calculation: Subtract checkout date from return date to find days remaining."
        },
        "introduction": {
            "overview": (
                "Every day around your school and neighborhood, people encounter frustrating, repetitive problems. "
                "Students borrow exciting books from the school library, get caught up in midterm examinations, forget the return date, "
                "and face embarrassing overdue fines. Water refill coolers in the hallway run dry in the middle of a hot afternoon because "
                "nobody tracked consumption. Family recycling bins overflow with plastic bottles because there is no motivating system to reward sorting. "
                "How do we solve these real-world challenges? The answer does not require waiting for adult engineers or buying million-dollar software. "
                "You can architect an automated digital solution using computational thinking! "
                "[IMAGE_PLACEHOLDER: Student problem-solving whiteboard mapping community issue to digital solution stages]\n\n"
                "In our previous lesson, we explored the Python Playground, learning how variables store memory, conditions make choices, and loops "
                "repeat tasks. But writing code in isolation is like holding a hammer when you have nothing to build. The true purpose of programming "
                "is to serve human beings and improve communities. Software engineering is eighty percent clear problem decomposition and only twenty percent "
                "writing instructions. If you cannot describe a solution in plain, logical steps on a whiteboard, no computer programming language can save you. "
                "However, once you map out the inputs, the decision rules, and the expected outputs, translating your plan into software becomes smooth, natural, and exciting.\n\n"
                "In this lesson, we will step into the shoes of a software architect. We will take real-world school and community problems—starting with "
                "a school library book return alert system—and guide you through the three foundational phases of engineering: "
                "Phase 1: Problem Identification and Decomposition (breaking a messy problem into manageable parts); "
                "Phase 2: Logical Blueprinting (designing variables, calculation rules, and condition triggers); and "
                "Phase 3: User Testing, Edge Cases, and Iteration (testing with real students, handling weekends and holidays, and refining feedback). "
                "Cipher will guide you through visual diagrams, interactive wireframes, and practical case studies, showing you how thoughtful logic "
                "can transform everyday school life for thousands of peers."
            ),
            "learningObjectives": [
                "Decompose complex school and community challenges into clear inputs, processes, and outputs",
                "Design step-by-step algorithmic flowcharts and conditional notification rules for real-world problems",
                "Identify and resolve critical edge cases such as weekends, school holidays, and missing user contact data",
                "Apply empathetic, human-centered design principles to automated messaging and digital workflows"
            ],
            "duration": "45 mins",
            "cipherWelcome": {
                "dialogue": (
                    "Welcome, students of Class 8. I am Cipher, your analytical guide. "
                    "In our last lesson, you discovered the three foundational building blocks of programming: variables, conditions, and loops. "
                    "Today, we put those building blocks to work on real human problems. "
                    "A great programmer is not someone who types the fastest or memorizes the most commands. "
                    "A great programmer is a thoughtful listener who observes where people are struggling, breaks the issue down into clear steps, "
                    "and designs an elegant, reliable automated solution. "
                    "Today, we will build a complete digital blueprint for our school library, tracking books and sending friendly alerts "
                    "so that students never face overdue fines again. Let us begin our architectural journey."
                ),
                "toastPrompt": "Set the notification rule: IF due_date <= 2 days THEN send SMS reminder."
            },
            "story": {
                "title": "The Library Fine Crisis: How Maya and Kabir Designed BookGuard",
                "content": (
                    "It was 3:15 PM on a Friday afternoon at Greenwood High School. "
                    "Fourteen-year-old Maya stood in front of the library circulation desk, holding a notice paper with a disappointed expression. "
                    "Beside her stood Mrs. D'Souza, the school librarian, looking equally disheartened.\n\n"
                    "'I am so sorry, Maya,' Mrs. D'Souza said softly. 'Because the historical fiction novel was due ten days ago, "
                    "the school system automatically generated an overdue fine of 50 rupees, and your borrowing privileges are suspended until Monday.'\n\n"
                    "'I completely forgot about the return date!' Maya explained with genuine regret. 'We had our science exhibition on Wednesday "
                    "and our math Olympiad yesterday. The book was sitting safely on my study desk the entire time! If only I had received a tiny reminder "
                    "two days before the deadline, I would have returned it during morning recess.'\n\n"
                    "Her classmate Kabir, who was shelving returned encyclopedias as a student volunteer, walked over. "
                    "'Mrs. D'Souza, how many students received overdue fines this month?'\n\n"
                    "Mrs. D'Souza clicked her desktop mouse and pulled up the monthly library report. Her eyes widened: "
                    "'Over 140 students! That is nearly a quarter of the entire middle school! "
                    "I spend two hours every Friday afternoon printing paper fine slips, stamping disciplinary warnings, and calling homeroom teachers. "
                    "It is exhausting for me, and it discourages students from reading books.'\n\n"
                    "A soft analytical chime sounded from Kabir's tablet as Cipher appeared on the screen. "
                    "'This is a classic systems failure,' Cipher observed in its calm, structured cadence. "
                    "'Notice what is happening: the students are not dishonest or careless; they are simply busy humans with full academic schedules. "
                    "The librarian does not enjoy collecting fines; it creates stressful administrative paperwork. "
                    "The problem is not human failure. The problem is that the library relies on passive memory instead of proactive automated communication.'\n\n"
                    "Maya leaned forward. 'Can we code a solution for this? Our school doesn't have a software budget to hire a commercial company.'\n\n"
                    "'You do not need a commercial company, Maya,' Cipher answered with encouraging clarity. "
                    "'You already understand variables, conditions, and loops. Let us design an automated system called 'BookGuard'. "
                    "We will map the problem into three simple stages: "
                    "First, when a book is scanned, we store the checkout date and calculate the return deadline. "
                    "Second, a daily background loop checks the days remaining for every borrowed book. "
                    "Third, if a book has two days remaining, the system sends an automated, friendly SMS notification to the student's registered guardian phone!'\n\n"
                    "Kabir pulled out a whiteboard marker. 'Let's map it out on the library whiteboard right now!'\n\n"
                    "[IMAGE_PLACEHOLDER: Student problem-solving whiteboard mapping community issue to digital solution stages]\n\n"
                    "Over the next thirty minutes, Maya, Kabir, and Cipher mapped out the entire software blueprint: "
                    "defining variables for `studentID`, `bookBarcode`, and `daysRemaining`, constructing conditional alert thresholds, "
                    "and drafting warm, helpful SMS templates. "
                    "By the time they finished, Mrs. D'Souza was beaming with hope: 'If we deploy this, no student will ever feel embarrassed "
                    "at my circulation desk again!' "
                    "Let us explore how Maya and Kabir broke down this challenge and architected a real-world digital solution."
                )
            }
        },
        "sections": [
            {
                "sectionId": "section1",
                "title": "Problem Identification and Decomposition",
                "content": (
                    "Deep, intuitive explanation of problem decomposition in software engineering. "
                    "How to take messy, emotional, real-world frustrations and break them down into structured inputs, processes, and outputs. "
                    "[IMAGE_PLACEHOLDER: Student problem-solving whiteboard mapping community issue to digital solution stages]\n\n"
                    "When novice programmers want to build a software application, they often make a classic mistake: "
                    "they immediately open a code editor, start typing commands, and hope that everything works out. "
                    "Inevitably, they get confused after ten minutes, get lost in syntax, and give up in frustration. "
                    "Professional software architects do something completely different: they do not touch a keyboard for days! "
                    "Instead, they grab a blank piece of paper, a whiteboard, or sticky notes, and they spend their time understanding the problem.\n\n"
                    "In computer science, this foundational discipline is known as **Computational Problem Decomposition**. "
                    "Decomposition means taking a large, overwhelming, complicated problem and breaking it down into small, bite-sized, "
                    "manageable pieces that can be solved one step at a time. Think of eating a meal: you do not try to swallow a whole pizza in a single bite; "
                    "you slice it into triangular pieces and eat one bite at a time. Decomposition slices complex challenges into simple logic.\n\n"
                    "### The Three-Part Solution Framework: IPO (Input, Process, Output) \n"
                    "Every digital solution ever built—from a simple kitchen microwave timer to a self-driving Tesla car—can be decomposed "
                    "into three universal stages:\n\n"
                    "1. **INPUT (What Information Does the System Receive?)**: "
                    "These are the raw facts, measurements, or user actions fed into the machine. Without inputs, a system is blind. "
                    "In our school library scenario, what are the essential inputs?\n"
                    "   - The Student's Identity (Student ID number and registered mobile phone number).\n"
                    "   - The Book's Identity (Book title and unique barcode number).\n"
                    "   - The Transaction Timestamp (The exact date and time the book passed over the checkout scanner).\n\n"
                    "2. **PROCESS (What Logic and Calculations Must Happen?)**: "
                    "This is the computational engine where variables, conditions, and loops do the heavy lifting. "
                    "What processing steps must our library system execute?\n"
                    "   - Calculate the Return Due Date: Add 14 days to the checkout date (`dueDate = checkoutDate + 14`).\n"
                    "   - Track Daily Passage of Time: Every midnight, calculate `daysRemaining = dueDate - currentDate`.\n"
                    "   - Evaluate Alert Conditions: Ask: `Is daysRemaining equal to 2?` If yes, trigger the notification protocol.\n\n"
                    "3. **OUTPUT (What Action or Feedback Is Produced?)**: "
                    "This is the visible result that helps human beings. "
                    "What outputs does our library system generate?\n"
                    "   - An on-screen confirmation card displaying: 'Book issued: Due in 14 days.'\n"
                    "   - An automated, friendly SMS notification sent to the student's mobile phone: 'Hi Maya! A quick reminder that your book *The Secret of the Old Clock* is due in 2 days. Return or renew it during recess!'\n"
                    "   - An overdue warning alert sent to the librarian if `daysRemaining < 0`.\n\n"
                    "[IMAGE_PLACEHOLDER: UI wireframe of a school library book tracker showing days remaining before due date]\n\n"
                    "### The Golden Rule of Problem Framing: Listen Before You Build \n"
                    "Before writing a single line of logic, an engineer must talk to the people who experience the problem every day. "
                    "In our school library case, Maya and Kabir interviewed three different stakeholders:\n\n"
                    "- **The Student**: 'I don't mind returning the book. I just forget the date because my backpack has four different subject notebooks, and I don't check the paper stamp inside the back cover.'\n"
                    "- **The Librarian**: 'I hate charging fines! It creates tension between me and the students. I just want the books back on the shelves so other children can read them.'\n"
                    "- **The School Principal**: 'We don't want punitive systems that punish students. We want restorative systems that encourage responsible habits.'\n\n"
                    "Notice what this interview revealed: the goal of the software is NOT to collect fines faster! "
                    "The goal of the software is to **prevent fines entirely** by providing timely, friendly reminders! "
                    "This fundamental insight changes how the entire software is designed. It shifts the project from a harsh 'fine collector' "
                    "to a supportive 'reading companion'."
                ),
                "examples": [
                    {
                        "title": "School Library Automated Return Alerts",
                        "description": "A school library tracks borrowed books by scanning student ID cards and book barcodes, computing remaining loan days, and transmitting automated text message alerts 48 hours prior to due dates.",
                        "realLifeScenario": "School library circulation desk • Automatically reminding middle school students to return borrowed science books before due dates"
                    },
                    {
                        "title": "Community Recycling Reward Point Counters",
                        "description": "A neighborhood recycling depot uses smart weight scales: when a resident deposits aluminum cans, the system inputs the weight, processes points (10 points per kilogram), and outputs an updated digital token balance.",
                        "realLifeScenario": "Neighborhood green initiative • Incentivizing waste segregation by crediting loyalty points for clean plastic and metal recycling"
                    },
                    {
                        "title": "Cafeteria Weekly Meal Planner Balance",
                        "description": "A school dining hall tracks student prepaid lunch cards: inputs scan student wristbands, processes current balance minus lunch meal price, and outputs an alert SMS to parents if the card balance falls below 100 rupees.",
                        "realLifeScenario": "School cafeteria cash register • Preventing lunch disruptions by warning families before meal balances expire"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: The Hallway Water Cooler That Always Ran Dry",
                    "content": (
                        "In the eighth-grade corridor of Modern Public School, students faced a daily drought. "
                        "Every afternoon around 1:30 PM, right after sports period, students rushed to the hallway water filtration cooler, "
                        "only to find the digital dispenser flashing: 'ERROR: TANK EMPTY—REFILL REQUIRED'. "
                        "Over three hundred thirsty athletes had to walk down two flights of stairs to the ground-floor canteen.\n\n"
                        "The maintenance supervisor, Mr. Kishan, was frustrated: 'I check the cooler every morning at 7:00 AM and fill it to the brim! "
                        "I cannot stand in the hallway all day watching people fill water bottles.'\n\n"
                        "Two students, Ananya and Rohan, decided to apply computational problem decomposition to the issue:\n\n"
                        "- Input: How can we measure water without buying expensive digital flow sensors? "
                        "They noticed that every time someone fills a standard 750 ml school water bottle, the dispenser button is held down for approximately 12 seconds.\n"
                        "- Process: Instead of measuring water volume directly, the system can measure dispenser button active seconds! "
                        "The cooler tank holds 60 liters (enough for 80 bottle fills = 960 active dispenser seconds). "
                        "Each time the button is pressed, a timer accumulates active seconds: `totalDispenseSeconds = totalDispenseSeconds + buttonPressDuration`. "
                        "When `totalDispenseSeconds >= 750` (meaning 80% of the water has been consumed), a condition triggers.\n"
                        "- Output: Instead of waiting for the tank to run completely dry at 1:30 PM, the system sends an automated notification "
                        "to Mr. Kishan's maintenance tablet at 11:45 AM: 'Corridor Cooler #2 is at 20% capacity. Please dispatch secondary refill canister before lunch recess.'\n\n"
                        "Mr. Kishan refilled the cooler during morning class hours when the hallway was empty. "
                        "When students burst out of sports practice at 1:30 PM, ice-cold water poured smoothly into every bottle.\n\n"
                        "'You see,' Cipher highlighted, 'the students did not install expensive plumbing. "
                        "They used decomposition to identify a clever proxy input (button press seconds), calculated consumption logically, "
                        "and delivered proactive output before the problem impacted human beings. That is computational thinking at its finest.'"
                    )
                },
                "keyPoints": [
                    "Problem decomposition breaks large, messy real-world challenges into manageable sub-components",
                    "The Input-Process-Output (IPO) model provides a universal framework for designing software systems",
                    "Effective software engineering begins with listening to stakeholders and understanding human needs",
                    "A well-framed problem focuses on proactive prevention rather than punitive enforcement",
                    "Clever proxy measurements (like button duration) can solve complex tracking problems affordably",
                    "Clear problem definitions make subsequent coding fast, focused, and error-free"
                ]
            },
            {
                "sectionId": "section2",
                "title": "Logical Blueprinting and Algorithmic Design",
                "content": (
                    "Deep, intuitive explanation of algorithmic blueprinting, flow diagrams, and condition rules. "
                    "How to connect variables, arithmetic calculations, and notification triggers into a seamless automated pipeline. "
                    "[IMAGE_PLACEHOLDER: Flow diagram: Scan Student ID -> Calculate Return Date -> Send Reminder SMS]\n\n"
                    "Now that we have decomposed our school library challenge into clear inputs, processes, and outputs, "
                    "we are ready for the second crucial phase of software engineering: **Logical Blueprinting**. "
                    "Think of an architect designing a house. Before construction workers pour concrete, lay bricks, or install electrical wiring, "
                    "the architect draws a detailed floor plan on blueprint paper. The blueprint shows where every doorway connects, "
                    "where the water pipes run, and where the light switches are positioned. "
                    "In software engineering, our blueprint is called an **Algorithmic Flowchart** or a **System Logic Model**.\n\n"
                    "Let us trace the complete logical blueprint for our 'BookGuard' automated library alert system step by step:\n\n"
                    "### Step 1: The Checkout Transaction Event \n"
                    "The journey begins at the library circulation desk when a student borrows a book. "
                    "The optical barcode reader scans two items in rapid succession:\n"
                    "1. The student's ID card: `studentID = 'STU-8042'`, `guardianPhone = '+91-9876543210'`.\n"
                    "2. The book's barcode: `bookBarcode = 'BK-9914'`, `bookTitle = 'The Mystery of the Black Sand'`.\n\n"
                    "The system captures the current calendar date: `checkoutDate = CurrentDate()` (for example, October 10th). "
                    "Immediately, the algorithm executes its primary calculation rule:\n"
                    "```text\n"
                    "dueDate = checkoutDate + 14 days\n"
                    "```\n"
                    "The system stores this record safely in the library database and prints an on-screen confirmation card: "
                    "'Book issued to Maya. Due Date: October 24th.'\n\n"
                    "### Step 2: The Daily Midnight Clock Loop ⏰\n"
                    "How does the software keep track of passing time without requiring human librarians to press buttons every hour? "
                    "It uses an automated scheduled loop that executes once every day at midnight (00:01 AM):\n\n"
                    "```text\n"
                    "FOR each borrowedBook in activeLoansDatabase:\n"
                    "    daysRemaining = borrowedBook.dueDate - CurrentDate()\n"
                    "```\n\n"
                    "Let us trace this calculation across three sample days:\n"
                    "- On October 18th: `daysRemaining = 24 - 18 = 6 days`. (No alert needed; student still has plenty of time).\n"
                    "- On October 22nd: `daysRemaining = 24 - 22 = 2 days`. (THRESHOLD REACHED! Trigger notification protocol!).\n"
                    "- On October 24th: `daysRemaining = 24 - 24 = 0 days`. (DUE TODAY! Trigger final day reminder).\n"
                    "- On October 25th: `daysRemaining = 24 - 25 = -1 days`. (OVERDUE! Trigger friendly grace-period alert).\n\n"
                    "### Step 3: The Conditional Notification Engine \n"
                    "Now comes the condition fork where the algorithm decides what message to send based on `daysRemaining`. "
                    "Notice how clean and human-friendly our logic rules are:\n\n"
                    "```text\n"
                    "IF daysRemaining == 2:\n"
                    "    message = 'Hi ' + studentName + '! Quick reminder: Your library book (' + bookTitle + ') is due in 2 days on ' + dueDate + '. Return or renew it during morning recess to keep your borrowing record spotless!'\n"
                    "    send_sms(guardianPhone, message)\n\n"
                    "ELIF daysRemaining == 0:\n"
                    "    message = 'Hi ' + studentName + '! Your library book (' + bookTitle + ') is due TODAY. Please drop it into the library returns bin before 3:30 PM.'\n"
                    "    send_sms(guardianPhone, message)\n\n"
                    "ELIF daysRemaining < 0:\n"
                    "    overdueDays = abs(daysRemaining)\n"
                    "    message = 'Hi ' + studentName + '! Your book (' + bookTitle + ') is ' + overdueDays + ' days overdue. Please return it tomorrow morning so your classmates can borrow it!'\n"
                    "    send_sms(guardianPhone, message)\n"
                    "```\n\n"
                    "During interactive blueprinting sessions, students practice wiring notification rules with clear toast feedback: "
                    "`tap_prompt`: \"Set the notification rule: IF due_date <= 2 days THEN send SMS reminder.\" "
                    "When the student connects the condition diamond correctly, the system validates the logic: "
                    "`great_job`: \"Notification logic verified! Students receive friendly alerts before overdue fines accrue.\" "
                    "If the student miscalculates the date subtraction, the system provides gentle corrective guidance: "
                    "`try_again`: \"Verify the calculation: Subtract checkout date from return date to find days remaining.\""
                ),
                "examples": [
                    {
                        "title": "Automated Book Due Date Calculator",
                        "description": "A circulation database calculates loan durations: upon scanning, dueDate = checkoutDate + 14; a nightly loop computes daysRemaining = dueDate - currentDate to identify books due within 48 hours.",
                        "realLifeScenario": "School library database • Accurately tracking active book loans and identifying upcoming return deadlines automatically"
                    },
                    {
                        "title": "SMS Notification Gateway Rule Trigger",
                        "description": "An automated notification engine checks daysRemaining: if daysRemaining == 2, generate personalized text message including student name, book title, and return date, transmitting payload via SMS gateway.",
                        "realLifeScenario": "School communication platform • Delivering proactive WhatsApp and SMS notifications to student mobile phones"
                    },
                    {
                        "title": "Recycling Point Accumulation Engine",
                        "description": "A smart recycling depot weighs sorted deposits: pointsEarned = depositWeightKg * 10; userTotalPoints = userTotalPoints + pointsEarned; if userTotalPoints >= 100, trigger digital eco-canteen voucher generation.",
                        "realLifeScenario": "Community sustainability program • Rewarding students who recycle plastic bottles with cafeteria snack vouchers"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: The Great Date Subtraction Blunder in the Cafeteria App",
                    "content": (
                        "When eighth-grade programmer Arjun was building an automated alert for the school dining hall, "
                        "he wanted to warn parents when a student's weekly meal card balance had only two days of credit remaining.\n\n"
                        "Arjun wrote his date subtraction logic late at night:\n\n"
                        "```text\n"
                        "daysRemaining = currentDate - expiryDate\n"
                        "```\n\n"
                        "The next morning, the school cafeteria system went haywire! "
                        "Every parent in Class 8 received an urgent panicked alert on their smartphones at 7:00 AM: "
                        "'WARNING! Your child's meal plan expired negative-five days ago! Refill immediately!' "
                        "Over fifty concerned parents phoned the school front office before homeroom period began.\n\n"
                        "Arjun and Cipher sat down to diagnose the blueprint. "
                        "Cipher pointed to the subtraction formula: "
                        "'Look at the order of your subtraction, Arjun. "
                        "Today is October 15th (`currentDate = 15`). "
                        "The student's meal plan expires on October 20th (`expiryDate = 20`). "
                        "What is 15 minus 20?'\n\n"
                        "Arjun slapped his forehead. '15 minus 20 is NEGATIVE FIVE! "
                        "I subtracted the future date from the present date! "
                        "To find the days remaining in the future, you must subtract the present date from the future date: "
                        "`daysRemaining = expiryDate - currentDate` (20 - 15 = +5 days)!'\n\n"
                        "'Precisely,' Cipher smiled calmly. 'In arithmetic, order matters. "
                        "A simple reversal turned five days of safe remaining buffer into an emergency negative debt alert. "
                        "That is why software engineers verify their formulas with sample test dates before going live! "
                        "Always test your logic with real numbers on paper first.'\n\n"
                        "Arjun corrected the line: `daysRemaining = expiryDate - currentDate`. "
                        "The system instantly stabilized, reporting 5 days remaining with tranquil blue checkmarks."
                    )
                },
                "keyPoints": [
                    "Logical blueprinting maps out variables, calculations, and triggers before writing code",
                    "Algorithmic flowcharts visually trace how data moves from input capture to output delivery",
                    "Date arithmetic requires careful operand ordering: future dueDate minus currentDate yields positive daysRemaining",
                    "Threshold conditions (like daysRemaining == 2) pinpoint the exact moment an automated action should trigger",
                    "Personalized notification templates make automated messages warm, clear, and actionable",
                    "Verifying calculations on paper with concrete sample numbers prevents real-world deployment bugs"
                ]
            },
            {
                "sectionId": "section3",
                "title": "User Testing, Edge Cases, and Iteration",
                "content": (
                    "Deep, intuitive explanation of edge case analysis, user acceptance testing, and iterative refinement. "
                    "How to handle school holidays, weekends, missing contact numbers, and human emotions in automated systems. "
                    "[IMAGE_PLACEHOLDER: UI wireframe of a school library book tracker showing days remaining before due date]\n\n"
                    "Imagine you design a brilliant digital door lock for your school gymnasium. During testing on a sunny Wednesday afternoon, "
                    "the lock works flawlessly: students tap their badges, the green light flashes, and the heavy double doors unlock in half a second. "
                    "You declare your project complete and go home feeling triumphant.\n\n"
                    "Then, Saturday arrives. A heavy thunderstorm knocks out the neighborhood electric power grid. "
                    "A student running from the rain tries to enter the gymnasium, but the digital scanner is completely dark. "
                    "Because there is no physical mechanical keyhole or backup battery, the door stays permanently locked, stranding the student in the storm! "
                    "What happened? You designed for the **happy path**—the sunny day when everything works perfectly—but you completely forgot the **Edge Cases**!\n\n"
                    "In software engineering, an 'Edge Case' is an unusual, extreme, or unexpected situation that occurs outside normal operating conditions. "
                    "A novice programmer only tests the happy path. A master software architect spends eighty percent of their energy hunting down edge cases, "
                    "ensuring that the system fails safely, gracefully, and kindly when the unexpected happens.\n\n"
                    "Let us examine the critical edge cases that Maya, Kabir, and Cipher had to solve before deploying the 'BookGuard' library system:\n\n"
                    "### Edge Case 1: The Weekend and Public Holiday Trap ️️\n"
                    "Suppose a student borrows a book on Friday, October 11th. The standard loan rule adds 14 days, making the book due on Friday, October 25th. "
                    "Now suppose another student borrows a book on Monday, October 14th. Adding 14 days makes the book due on Monday, October 28th. "
                    "What if the due date lands on a **Sunday** when the school is locked? "
                    "Or what if the due date lands on **Diwali** or **Gandhi Jayanti** when the entire school campus is closed for a three-day national holiday?\n\n"
                    "If the software mindlessly executed `daysRemaining == 0` on a closed holiday, it would send an urgent alert: 'Book due today!' "
                    "Students would panic, knowing they cannot enter the school building to return it, and would face an unjust fine on Monday morning! "
                    "To solve this edge case, our blueprint includes a **Holiday Calendar Exception Rule**:\n\n"
                    "```text\n"
                    "WHILE dueDate is on a Weekend OR dueDate is in SchoolHolidayCalendar:\n"
                    "    dueDate = dueDate + 1 day\n"
                    "```\n\n"
                    "If a book's due date lands on a Sunday, the algorithm automatically rolls the deadline forward to Monday morning at zero cost to the student! "
                    "Fairness is hardcoded directly into the algorithm.\n\n"
                    "### Edge Case 2: The Missing or Changed Phone Number \n"
                    "What happens if a student's family recently switched mobile service providers, or the phone number in the school database has a typo? "
                    "If the system simply attempts to send an SMS and fails silently, the student never receives the reminder, assumes everything is fine, "
                    "and arrives at school shocked by an overdue fine.\n\n"
                    "Our solution incorporates a **Multi-Channel Fallback Rule**:\n\n"
                    "```text\n"
                    "IF smsDeliveryStatus == 'FAILED':\n"
                    "    send_backup_email(studentSchoolEmail)\n"
                    "    flag_homeroom_rollcall_notice(studentID)\n"
                    "```\n\n"
                    "If the text message cannot reach the mobile phone, the system automatically routes a notice to the student's morning homeroom teacher, "
                    "who can gently remind the student in person during attendance roll call.\n\n"
                    "### Edge Case 3: Empathetic Messaging (Tone Matters!) ️\n"
                    "In software engineering, the wording of automated messages is just as important as the underlying code. "
                    "Compare these two automated reminder messages sent to an eighth-grade student:\n\n"
                    "- **Draft A (Harsh & Cold)**: 'WARNING: Book BK-9914 overdue in 48 hours. Failure to return will result in disciplinary action and monetary penalties.'\n"
                    "- **Draft B (Supportive & Kind)**: 'Hi Maya! Hope you are enjoying *The Secret of the Old Clock*. Just a friendly heads-up that it is due in 2 days (Oct 24). You can drop it in the library returns bin or renew it for another week during recess. Happy reading!'\n\n"
                    "Draft A makes students feel anxious, defensive, and alienated from the school library. "
                    "Draft B makes students feel supported, respected, and eager to participate in school life. "
                    "Empathetic design costs zero dollars, yet it completely transforms how communities interact with automated technology.\n\n"
                    "### The Iterative Refinement Cycle: Test, Learn, Improve ️\n"
                    "Before launching BookGuard school-wide, Maya and Kabir conducted a two-week pilot test with thirty Class 8 students. "
                    "During the pilot, they discovered two fascinating user behaviors:\n\n"
                    "1. Students loved the two-day reminder, but requested a morning reminder at 7:30 AM rather than an evening reminder at 8:00 PM, "
                    "so they could slip the book into their backpack right before leaving home!\n"
                    "2. Several students wanted a 'One-Click Renew' feature allowing them to reply 'RENEW' via SMS to extend their loan by seven days "
                    "if no other student had reserved the title.\n\n"
                    "Maya and Kabir added both features to the blueprint. "
                    "When the system officially launched across all grades, library overdue fines dropped by an astounding **ninety-two percent**! "
                    "Students read more books, Mrs. D'Souza smiled every afternoon, and the school library became a vibrant, welcoming hub of joy."
                ),
                "examples": [
                    {
                        "title": "Weekend and Holiday Rollover Engine",
                        "description": "An automated loan manager evaluates calendar metadata: if a computed return date coincides with a weekend or gazetted school holiday, the deadline automatically advances to the next official school operational day.",
                        "realLifeScenario": "School administration system • Ensuring students are never unfairly penalized when deadlines land on campus closure dates"
                    },
                    {
                        "title": "Multi-Channel Communication Fallback",
                        "description": "A notification dispatcher evaluates transmission receipts: if SMS gateway reports delivery failure due to network disconnection, payload is instantly re-routed to student school email and homeroom roll call notices.",
                        "realLifeScenario": "Emergency school broadcast system • Guaranteeing vital school announcements reach families even when cellular connectivity fluctuates"
                    },
                    {
                        "title": "Interactive SMS One-Click Renewal Handler",
                        "description": "A two-way messaging parser listens for inbound replies: when a student texts 'RENEW' within 48 hours of expiration, the system checks reservation queues and extends loan deadline by seven additional days automatically.",
                        "realLifeScenario": "Library self-service portal • Empowering students to extend book loans with a simple two-letter text message from home"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: The Pilot Test That Saved the School Science Fair Registration",
                    "content": (
                        "When Class 8 student leaders built an online registration portal for the regional school science fair, "
                        "they designed a sleek digital submission form where students uploaded project titles, team members, and abstract summaries.\n\n"
                        "The submission deadline was set for Friday, November 15th at 5:00 PM. "
                        "During internal developer testing, the team tested the form five times with small 2-paragraph summaries. Everything worked seamlessly.\n\n"
                        "However, during user pilot testing on Wednesday evening, three eighth-grade teams tried to submit their entries: "
                        "Team 1 had four students with identical first names (Aarav). "
                        "Team 2 uploaded a project poster photograph that was 45 megabytes in size (exceeding server upload limits). "
                        "Team 3 hit the 'Submit' button at 5:01 PM because their home Wi-Fi stuttered for sixty seconds.\n\n"
                        "The system crashed on Team 2's huge image, locked out Team 3 by one single minute, and merged Team 1's duplicate names into one person!\n\n"
                        "The student developers panicked. Cipher stepped forward with a calm, analytical debrief: "
                        "'Do not despair; this is why we conduct user pilot testing! Pilot testing is not a test of your intelligence; "
                        "it is a stress test of your edge cases. Let us address each failure mode systematically:\n\n"
                        "1. For duplicate names: Never identify users by first name alone! Use unique Student ID numbers as primary keys.\n"
                        "2. For large poster images: Add client-side image compression that resizes photos before uploading.\n"
                        "3. For the strict 5:00 PM deadline: Add a compassionate 15-minute grace period buffer (`gracePeriodMinutes = 15`) "
                        "so honest students with slow internet connections are never locked out of scientific opportunities!'\n\n"
                        "The student developers implemented all three fixes on Thursday afternoon. "
                        "When Friday's official registration opened, over two hundred student teams submitted their projects without a single error or lockout.\n\n"
                        "'A good programmer,' Cipher concluded, 'celebrates when edge cases appear during testing. "
                        "Every edge case caught in a pilot is a real human frustration prevented in the real world.'"
                    )
                },
                "keyPoints": [
                    "Edge cases represent unusual, extreme, or unexpected conditions outside normal operating routines",
                    "Designing exclusively for the 'happy path' leaves software vulnerable to catastrophic real-world failure",
                    "School schedules require automated calendar exception rules to handle weekends and public holidays fairly",
                    "Multi-channel fallbacks ensure critical notices reach families even when primary delivery routes fail",
                    "Empathetic, respectful message phrasing builds trust, encouragement, and community cooperation",
                    "User pilot testing uncovers behavioral blind spots, allowing iterative refinement before widespread deployment"
                ]
            }
        ],
        "activities": [
            {
                "activityId": "activity1",
                "title": "Library Alert Solution Architect",
                "description": (
                    "Design, wireframe, and test the complete 3-stage 'BookGuard' automated library book return reminder pipeline. "
                    "Define data inputs, configure the due date calculation formula, set the 48-hour notification condition rule, and draft compassionate SMS templates. "
                    "[IMAGE_PLACEHOLDER: Flow diagram: Scan Student ID -> Calculate Return Date -> Send Reminder SMS]"
                ),
                "instructions": [
                    "1. Define the 3 core inputs: studentID, bookBarcode, checkoutDate.",
                    "2. Set the calculation formula: 'dueDate = checkoutDate + 14 days' and 'daysRemaining = dueDate - currentDate'.",
                    "3. Set the notification rule: IF due_date <= 2 days THEN send SMS reminder.",
                    "4. Configure the weekend exception rule: if dueDate is on Sunday, advance dueDate by +1 day."
                ],
                "materials": "Interactive solution architecture canvas, mock library barcode scanner deck, SMS simulator console",
                "duration": "15 mins",
                "stepByStepGuide": [
                    "Step 1: Open the Solution Architecture Canvas and place the three Input Blocks: `studentID`, `bookBarcode`, and `checkoutDate`.",
                    "Step 2: Connect the Date Processor Block, configuring `dueDate = checkoutDate + 14 days`.",
                    "Step 3: Connect the Daily Clock Tracker Block: `daysRemaining = dueDate - currentDate`.",
                    "Step 4: Connect the Condition Diamond: Set condition rule `daysRemaining <= 2`.",
                    "Step 5: Attach the Notification Action Block: Draft the warm, friendly SMS template and press TEST RUN to verify output!"
                ],
                "toastFeedback": {
                    "tap_prompt": "Set the notification rule: IF due_date <= 2 days THEN send SMS reminder.",
                    "great_job": "Notification logic verified! Students receive friendly alerts before overdue fines accrue.",
                    "try_again": "Verify the calculation: Subtract checkout date from return date to find days remaining."
                }
            },
            {
                "activityId": "activity2",
                "title": "Water Bottle Refill Hydration Tracker Blueprint",
                "description": "Design an automated school water cooler refill notification engine that uses dispenser button active seconds to predict tank depletion and alert maintenance staff before noon recess.",
                "instructions": [
                    "1. Define proxy input: totalDispenseSeconds accumulated from dispenser button presses.",
                    "2. Set capacity threshold: total tank capacity = 960 seconds; warning threshold = 750 seconds (80% full).",
                    "3. Configure notification trigger: IF totalDispenseSeconds >= 750 THEN send maintenance alert tablet notification.",
                    "4. Test with three simulated school day hydration patterns."
                ],
                "materials": "Hydration tracking logic canvas, maintenance dashboard simulator",
                "duration": "15 mins"
            },
            {
                "activityId": "activity3",
                "title": "Community Recycling Points Engine",
                "description": "Architect an automated community recycling rewards system that inputs weighed recyclable materials, calculates eco-points, and outputs digital token vouchers for local community gardens.",
                "instructions": [
                    "1. Define inputs: residentID, materialType ('Plastic', 'Aluminum', 'Paper'), and weightKg.",
                    "2. Set calculation rules: Aluminum = 15 pts/kg, Plastic = 10 pts/kg, Paper = 5 pts/kg.",
                    "3. Set reward threshold: IF residentPoints >= 100 THEN generate 50-rupee eco-canteen voucher and deduct 100 points.",
                    "4. Simulate three family recycling deposits."
                ],
                "materials": "Recycling logic block workspace, virtual scale terminal",
                "duration": "15 mins"
            },
            {
                "activityId": "activity4",
                "title": "Cafeteria Meal Balance Alert Designer",
                "description": "Construct an automated dining balance warning system that subtracts daily lunch purchases and dispatches proactive balance notifications before Friday afternoon.",
                "instructions": [
                    "1. Define inputs: studentCardID, mealCost, currentBalance.",
                    "2. Configure update arithmetic: currentBalance = currentBalance - mealCost.",
                    "3. Set notification condition: IF currentBalance < 100 THEN send guardian low-balance SMS with online recharge link.",
                    "4. Verify that balances above 100 maintain silent green confirmation."
                ],
                "materials": "Cafeteria account logic simulator, SMS preview console",
                "duration": "15 mins"
            },
            {
                "activityId": "activity5",
                "title": "Edge Case Detective Challenge",
                "description": "Inspect four real-world school automation blueprints, identify hidden edge cases (sick days, power failures, calendar leap years), and patch the logic with fail-safe exception rules.",
                "instructions": [
                    "1. Analyze Blueprint A (student attendance tracker failing on excused medical leave).",
                    "2. Analyze Blueprint B (library system failing on February 29th leap year calculations).",
                    "3. Analyze Blueprint C (sports tournament bracket crashing on tie scores).",
                    "4. Write exception rules to ensure all systems fail safely and compassionately."
                ],
                "materials": "Edge case diagnostic scenario cards, exception rule builder",
                "duration": "15 mins"
            }
        ],
        "summary": {
            "recap": (
                "Cipher: You mastered the art of coding a solution by learning that great engineering begins not with code, "
                "but with human empathy and structured computational problem decomposition. "
                "You learned how to slice messy real-world challenges into clean Inputs, Processes, and Outputs. "
                "You designed complete logical blueprints connecting variables, calculation formulas, and conditional notification triggers "
                "to solve real community issues like library book overdue fines and hallway water shortages. "
                "Finally, you explored the critical world of edge cases, discovering that true software reliability comes from anticipating weekends, "
                "public holidays, and network failures, while framing all human communication with kindness, clarity, and respect. "
                "You are no longer just a student of code; you are an architect of solutions for your school and community."
            ),
            "keyTakeaways": [
                "Software engineering is eighty percent problem decomposition and twenty percent coding",
                "The Input-Process-Output (IPO) model provides an organized foundation for every digital solution",
                "Computational thinking solves community problems proactively rather than punitively",
                "Date calculations must maintain proper operand order: future dueDate minus currentDate yields positive daysRemaining",
                "Conditional notification rules trigger automated communication at the precise moment action is needed",
                "Edge cases like weekends and school holidays must be accommodated with automated exception rules",
                "Multi-channel fallbacks ensure vital information reaches users even during connectivity failures",
                "Empathetic, supportive language in automated messaging transforms technology into a trusted community partner"
            ]
        },
        "assessment": [
            {
                "id": "q1",
                "question": "What is the very first step a software engineer should take when solving a real-world community problem?",
                "options": [
                    { "id": "a", "text": "Immediately start typing random lines of code into a computer editor.", "correct": False, "feedback": "Incorrect. Coding without a clear plan leads to confusion and bugs." },
                    { "id": "b", "text": "Listen to stakeholders, understand human needs, and decompose the problem into inputs, processes, and outputs.", "correct": True, "feedback": "Correct! Problem understanding and decomposition must always precede coding." },
                    { "id": "c", "text": "Buy the most expensive computer hardware available in stores.", "correct": False, "feedback": "Incorrect. Expensive hardware cannot fix unclear problem logic." },
                    { "id": "d", "text": "Memorize the entire dictionary of programming commands.", "correct": False, "feedback": "Incorrect. Software design is about logical problem-solving, not rote memorization." }
                ],
                "explanation": "Effective engineering begins with human empathy, stakeholder interviews, and structured problem decomposition before touching a keyboard."
            },
            {
                "id": "q2",
                "question": "In the Input-Process-Output (IPO) framework for our library book tracker, which of the following is an INPUT?",
                "options": [
                    { "id": "a", "text": "The student's ID number and the scanned book barcode.", "correct": True, "feedback": "Correct! Scanned IDs and barcodes are raw input data received by the system." },
                    { "id": "b", "text": "The SMS text message received by the student's guardian.", "correct": False, "feedback": "Incorrect. The SMS message is an output, not an input." },
                    { "id": "c", "text": "The mathematical subtraction of dates to find days remaining.", "correct": False, "feedback": "Incorrect. Date subtraction is a process, not an input." },
                    { "id": "d", "text": "The librarian's cup of tea on the circulation desk.", "correct": False, "feedback": "Incorrect. Personal beverage items are not system inputs." }
                ],
                "explanation": "Inputs represent the raw data captured by the system (such as scanned barcodes, student IDs, and checkout timestamps)."
            },
            {
                "id": "q3",
                "question": "What is the correct arithmetic formula to calculate the days remaining before a book is due?",
                "options": [
                    { "id": "a", "text": "daysRemaining = currentDate - dueDate", "correct": False, "feedback": "Incorrect. Subtracting a future due date from current date produces a negative number!" },
                    { "id": "b", "text": "daysRemaining = dueDate - currentDate", "correct": True, "feedback": "Correct! Future due date minus current date yields the positive number of remaining days." },
                    { "id": "c", "text": "daysRemaining = dueDate * currentDate", "correct": False, "feedback": "Incorrect. Multiplying calendar dates has no physical or logical meaning." },
                    { "id": "d", "text": "daysRemaining = checkoutDate + 14", "correct": False, "feedback": "Incorrect. That formula calculates dueDate, not daysRemaining." }
                ],
                "explanation": "To determine how many days remain in the future, subtract the current date from the future due date (dueDate - currentDate)."
            },
            {
                "id": "q4",
                "question": "Why is the notification rule 'IF due_date <= 2 days THEN send SMS reminder' effective for students?",
                "options": [
                    { "id": "a", "text": "It gives students a timely 48-hour buffer to find and return the book before any overdue fines accrue.", "correct": True, "feedback": "Correct! A 48-hour advance notice provides actionable time to return or renew books peacefully." },
                    { "id": "b", "text": "It automatically charges 100 rupees to the student's bank account.", "correct": False, "feedback": "Incorrect. The purpose of the alert is to prevent financial fines entirely." },
                    { "id": "c", "text": "It deletes the student's homework assignments from the school computer.", "correct": False, "feedback": "Incorrect. Library systems do not alter classroom homework." },
                    { "id": "d", "text": "It forces the student to read the entire book in two minutes.", "correct": False, "feedback": "Incorrect. The alert manages loan deadlines, not reading speed." }
                ],
                "explanation": "Alerting students 48 hours before deadlines provides practical lead time to locate books and return them during school hours."
            },
            {
                "id": "q5",
                "question": "What is an 'Edge Case' in software engineering?",
                "options": [
                    { "id": "a", "text": "The sharp physical plastic corner of a computer monitor.", "correct": False, "feedback": "Incorrect. The term refers to algorithmic boundary conditions, not physical furniture." },
                    { "id": "b", "text": "An unusual, unexpected, or extreme scenario outside normal operating conditions (like weekends, holidays, or power outages).", "correct": True, "feedback": "Correct! Edge cases test system resilience during abnormal conditions." },
                    { "id": "c", "text": "A special game level where characters can walk along the edge of the screen.", "correct": False, "feedback": "Incorrect. Edge cases are general programming concepts, not video game levels." },
                    { "id": "d", "text": "A computer keyboard that has missing arrow keys.", "correct": False, "feedback": "Incorrect. Hardware defects are not algorithmic edge cases." }
                ],
                "explanation": "Edge cases occur at the boundaries of normal operating parameters, requiring special handling logic to prevent system failures."
            },
            {
                "id": "q6",
                "question": "If a library book due date lands on a Sunday when school is closed, what should a well-designed algorithm do?",
                "options": [
                    { "id": "a", "text": "Charge the student a double fine for not breaking into the school building on Sunday.", "correct": False, "feedback": "Incorrect. Unfair penalties alienate users and punish honest students." },
                    { "id": "b", "text": "Execute a weekend exception rule that automatically rolls the due date forward to Monday morning at no penalty.", "correct": True, "feedback": "Correct! Responsible systems accommodate school operational schedules fairly." },
                    { "id": "c", "text": "Delete the book's record and pretend the book never existed.", "correct": False, "feedback": "Incorrect. Databases must preserve accurate inventory records." },
                    { "id": "d", "text": "Sound a loud siren through the student's bedroom speakers at midnight.", "correct": False, "feedback": "Incorrect. Automated communication must remain respectful and appropriate." }
                ],
                "explanation": "Automated calendar rollover logic advances deadlines falling on campus closures to the next official operational school day."
            },
            {
                "id": "q7",
                "question": "In the hallway water cooler case study, how did the students measure water consumption without expensive flow sensors?",
                "options": [
                    { "id": "a", "text": "They weighed every student before and after drinking water.", "correct": False, "feedback": "Incorrect. Weighing humans is intrusive and impractical." },
                    { "id": "b", "text": "They used dispenser button active seconds as a clever proxy measurement of water volume.", "correct": True, "feedback": "Correct! Measuring button duration provided an accurate, inexpensive proxy for water usage." },
                    { "id": "c", "text": "They guessed randomly and hoped for the best.", "correct": False, "feedback": "Incorrect. Engineering solutions rely on measurable proxies, not random guesses." },
                    { "id": "d", "text": "They banned all students from drinking water during sports practice.", "correct": False, "feedback": "Incorrect. That would harm student health rather than solve the problem." }
                ],
                "explanation": "Proxy metrics (like accumulated button press duration) allow engineers to track complex variables reliably without costly hardware."
            },
            {
                "id": "q8",
                "question": "Why is empathetic, friendly phrasing important in automated reminder messages?",
                "options": [
                    { "id": "a", "text": "Supportive tone builds trust, reduces anxiety, and encourages cooperative community habits rather than fear.", "correct": True, "feedback": "Correct! Human-centered communication encourages positive engagement." },
                    { "id": "b", "text": "Friendly words use fewer bytes of internet data than harsh words.", "correct": False, "feedback": "Incorrect. Word data size is determined by character count, not emotional tone." },
                    { "id": "c", "text": "Friendly messages automatically unlock the school gates.", "correct": False, "feedback": "Incorrect. Physical security systems operate independently of SMS tone." },
                    { "id": "d", "text": "Computers only know how to send friendly messages.", "correct": False, "feedback": "Incorrect. Computers send whatever text developers program them to send." }
                ],
                "explanation": "Human-centered language frames automation as a helpful partner, fostering positive community relationships and higher compliance."
            },
            {
                "id": "q9",
                "question": "What is the purpose of conducting a 'Pilot Test' with a small group of users before school-wide launch?",
                "options": [
                    { "id": "a", "text": "To discover hidden edge cases, test user reactions, and refine software logic in a safe, controlled setting.", "correct": True, "feedback": "Correct! Pilot testing uncovers flaws before they impact the broader community." },
                    { "id": "b", "text": "To celebrate the project by eating ice cream in the computer lab.", "correct": False, "feedback": "Incorrect. Pilot testing is a rigorous evaluation phase." },
                    { "id": "c", "text": "To make sure no other students in the school ever learn how to code.", "correct": False, "feedback": "Incorrect. Educational technology aims to empower all students." },
                    { "id": "d", "text": "To delete all user accounts before launching.", "correct": False, "feedback": "Incorrect. Pilot testing evaluates live user interaction data." }
                ],
                "explanation": "Pilot testing exposes real-world edge cases (like timing preferences and duplicate names) that developer testing overlooked."
            },
            {
                "id": "q10",
                "question": "In the science fair case study, why did the registration system crash on Team 2's submission?",
                "options": [
                    { "id": "a", "text": "Because the students did not wear safety goggles while typing.", "correct": False, "feedback": "Incorrect. Physical goggles are for chemistry labs, not web submission." },
                    { "id": "b", "text": "Because the team uploaded a massive 45-megabyte photograph that exceeded server upload limits.", "correct": True, "feedback": "Correct! Unconstrained file uploads can overwhelm server memory and bandwidth." },
                    { "id": "c", "text": "Because the science fair project was about solar panels.", "correct": False, "feedback": "Incorrect. Project topic content does not crash web servers." },
                    { "id": "d", "text": "Because the computer was allergic to science projects.", "correct": False, "feedback": "Incorrect. Machines execute code instructions, not biological allergies." }
                ],
                "explanation": "Unchecked file sizes represent an input edge case: adding client-side image compression prevents server crashes."
            },
            {
                "id": "q11",
                "question": "What is a 'Multi-Channel Fallback' in an automated notification system?",
                "options": [
                    { "id": "a", "text": "A safety rule that routes messages through backup channels (like email or roll call) if the primary SMS fails.", "correct": True, "feedback": "Correct! Fallback channels ensure delivery resilience when primary routes fail." },
                    { "id": "b", "text": "A television remote control with fifty buttons.", "correct": False, "feedback": "Incorrect. The term refers to data transmission redundancy, not television remotes." },
                    { "id": "c", "text": "A system that deletes user contact information after one try.", "correct": False, "feedback": "Incorrect. Robust systems preserve contact data." },
                    { "id": "d", "text": "A radio antenna that only works during thunderstorms.", "correct": False, "feedback": "Incorrect. Fallback architectures enhance reliability under all conditions." }
                ],
                "explanation": "Multi-channel fallbacks guarantee delivery by trying alternative communication paths (e.g., email or teacher notice) if SMS fails."
            },
            {
                "id": "q12",
                "question": "How does the community recycling rewards system connect inputs, processing, and outputs?",
                "options": [
                    { "id": "a", "text": "Input: deposited material weight; Process: calculate eco-points; Output: digital canteen reward voucher.", "correct": True, "feedback": "Correct! This cleanly maps the complete IPO pipeline for the sustainability program." },
                    { "id": "b", "text": "Input: throwing trash on the floor; Process: ignore it; Output: dirty school courtyard.", "correct": False, "feedback": "Incorrect. That represents littering, not an engineered recycling system." },
                    { "id": "c", "text": "Input: electricity bill; Process: divide by zero; Output: computer fire.", "correct": False, "feedback": "Incorrect. Software solutions must have safe mathematical operations." },
                    { "id": "d", "text": "Input: weather forecast; Process: rain dance; Output: water bottle.", "correct": False, "feedback": "Incorrect. Systems rely on verified sensor data and algorithms." }
                ],
                "explanation": "Recycling systems take physical deposit weights (inputs), compute mathematical eco-points (process), and deliver incentive vouchers (output)."
            },
            {
                "id": "q13",
                "question": "Why should database records identify students by unique Student ID numbers rather than first names alone?",
                "options": [
                    { "id": "a", "text": "Because multiple students can share the exact same first name, causing data collisions and mistaken identity.", "correct": True, "feedback": "Correct! Unique identifiers (primary keys) prevent record confusion among students with identical names." },
                    { "id": "b", "text": "Because first names take up too much physical electricity on the mother board.", "correct": False, "feedback": "Incorrect. Text strings require negligible memory." },
                    { "id": "c", "text": "Because computers refuse to display alphabetical letters.", "correct": False, "feedback": "Incorrect. Computers process text and numbers equally well." },
                    { "id": "d", "text": "Because names are deleted every morning at sunrise.", "correct": False, "feedback": "Incorrect. Databases maintain persistent records." }
                ],
                "explanation": "Unique identification keys prevent name collision bugs when multiple students share common names in school databases."
            },
            {
                "id": "q14",
                "question": "What is the benefit of adding a 'One-Click SMS Renewal' feature to the library reminder system?",
                "options": [
                    { "id": "a", "text": "It allows students to extend their book loan instantly from home with a simple reply, reducing unnecessary library desk queues.", "correct": True, "feedback": "Correct! Self-service renewal empowers students and saves administrative desk time." },
                    { "id": "b", "text": "It orders pizza to the student's house automatically.", "correct": False, "feedback": "Incorrect. Library systems manage book inventory, not food delivery." },
                    { "id": "c", "text": "It prevents any other student in the school from ever reading books.", "correct": False, "feedback": "Incorrect. Renewal checks reservation queues to ensure fair access." },
                    { "id": "d", "text": "It turns the student's smartphone into a digital flashlight.", "correct": False, "feedback": "Incorrect. SMS renewal communicates with database loan records." }
                ],
                "explanation": "Two-way self-service interaction reduces administrative friction, allowing students to manage loans responsibly with minimal effort."
            },
            {
                "id": "q15",
                "question": "What is the ultimate definition of success for a student-engineered software solution?",
                "options": [
                    { "id": "a", "text": "The solution operates quietly, reliably, and compassionately in the background, solving a genuine human frustration.", "correct": True, "feedback": "Correct! The true measure of technology is how gracefully and effectively it serves human well-being." },
                    { "id": "b", "text": "The code has ten million lines and uses the most confusing words possible.", "correct": False, "feedback": "Incorrect. Great software is concise, elegant, and maintainable." },
                    { "id": "c", "text": "The computer makes loud beeping sounds twenty-four hours a day.", "correct": False, "feedback": "Incorrect. Unnecessary noise is poor user experience." },
                    { "id": "d", "text": "The project costs more money than the entire school budget.", "correct": False, "feedback": "Incorrect. High cost is not a mark of engineering success." }
                ],
                "explanation": "True engineering success is measured by human impact: reliable, compassionate automation that quietly improves daily community life."
            }
        ],
        "resources": [
            {
                "title": "Interactive Solution Architecture Canvas",
                "type": "Interactive Web Tool",
                "url": "https://ai-olympiad.org/tools/solution-architect-canvas",
                "description": "A browser-based drag-and-drop workspace allowing middle school students to map community problems into inputs, processes, and outputs with simulated testing."
            },
            {
                "title": "The Computational Problem Decomposition Handbook",
                "type": "Printable Student Guide",
                "url": "https://ai-olympiad.org/guides/problem-decomposition-handbook.pdf",
                "description": "An illustrated student guide explaining how to interview community stakeholders, identify proxy metrics, and draft flowchart blueprints."
            },
            {
                "title": "Edge Case Detective Worksheet & Testing Matrix",
                "type": "Classroom Activity Sheet",
                "url": "https://ai-olympiad.org/worksheets/edge-case-matrix.pdf",
                "description": "A hands-on testing rubric featuring twenty challenging real-world scenarios (holidays, leap years, power cuts) for student stress-testing."
            },
            {
                "title": "Human-Centered Design in School Automation",
                "type": "Educational Video Explainer",
                "url": "https://ai-olympiad.org/learn/empathetic-automation",
                "description": "A case-study video showing how student engineers reduced school library fines and corridor water shortages using compassionate automated logic."
            }
        ]
    }

    # Add mirror content field to support legacy viewers expecting lesson.content
    data["content"] = {
        "introduction": data["introduction"],
        "sections": data["sections"],
        "activities": data["activities"],
        "summary": data["summary"],
        "toastGuidance": data["toastGuidance"],
        "assessment": data["assessment"],
        "resources": data["resources"]
    }

    os.makedirs(os.path.dirname(target_path), exist_ok=True)

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Generated lesson successfully at {target_path}")

if __name__ == "__main__":
    build_lesson()
