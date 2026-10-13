# -*- coding: utf-8 -*-
"""
Generator for middle-class8-ch1-l1.json
Level: middle
Class: class8 (Class 8 • Age 13-14)
Chapter: ch1 (AI Basics • DISCOVER)
Lesson Title: How AI Makes Choices
Lesson ID: l1
Filename: middle-class8-ch1-l1.json
Mascot: Cipher (The Analytical Guide)

Requirements:
- >= 12,000 words
- >= 1,200 lines
- Simple, relatable explanation of decision-making algorithms, decision trees, weights, and confidence percentages. Zero advanced math or coding syntax.
- Clean visual style: minimal icons, clean structured presentation, zero emoji spam.
- Image placeholders included verbatim.
- Cipher spoken narration and guidance.
- Toast guidance included verbatim.
- Real-life examples: e-commerce recommendations, Netflix sports documentary, spam filters, medical symptom checkers.
"""

import json
import os
import sys

def build_lesson():
    target_path = "public/content/middle/middle-class8-ch1-l1.json"

    # Core required fields matching both top-level schema and internal system standards
    data = {
        "lessonId": "l1",
        "title": "How AI Makes Choices",
        "level": "middle",
        "class": "class8",
        "classNumber": 8,
        "chapter": "ch1",
        "chapterNumber": 1,
        "chapterTitle": "AI Basics",
        "chapterTheme": "DISCOVER",
        "lessonNumber": 1,
        "lessonTitle": "How AI Makes Choices",
        "filename": "middle-class8-ch1-l1.json",
        "mascot": {
            "name": "Cipher",
            "title": "The Analytical Guide",
            "personality": "Analytical, patient, and methodical guide who breaks down complex decision algorithms into clear, step-by-step visual logic without unnecessary jargon or complicated math.",
            "catchphrase": "Every great choice begins by evaluating the clues step by step.",
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
                "decision trees",
                "branching logic",
                "weighted factors",
                "confidence percentages",
                "recommendation algorithms",
                "handling uncertainty",
                "human-in-the-loop"
            ],
            "prerequisites": [],
            "nextLesson": "middle-class8-ch1-l2.json"
        },
        "toastGuidance": {
            "tap_prompt": "Follow the decision branch: Is temperature below 18°C? Select Yes or No.",
            "great_job": "Decision path verified! The system recommended a warm jacket based on weighted weather clues.",
            "try_again": "Re-evaluate the condition threshold before taking the branch."
        },
        "introduction": {
            "overview": (
                "When you decide what clothes to wear in the morning, your brain rapidly evaluates clues: "
                "Is it cloudy? Is it physical education day? Do I have sports practice? AI makes choices in "
                "a very similar way by weighing factors and tracing branches in a decision tree. "
                "[IMAGE_PLACEHOLDER: Student checking outdoor weather before picking school gear]\n\n"
                "Decision-making feels effortless to humans because our brains process multiple sensory signals in parallel. "
                "You glance outside your window, notice the grey sky, feel a cool draft against your arms, and remember "
                "that your timetable includes morning football training. Without solving a single written equation, you reach "
                "for your athletic track pants, pack your sports jersey in your bag, and slip a compact umbrella into your side pocket. "
                "To an outside observer, this process looks like pure intuition or an instant hunch. However, beneath the surface, "
                "your mind executed an organized series of evaluations. You checked a sequence of conditions: Was the sky dark? "
                "Yes. Was the ground wet? No. Was physical activity scheduled? Yes. Was cold rain likely? Yes. Each condition narrowed "
                "your possible choices until you arrived at the single best combination of clothing for the day.\n\n"
                "Artificial intelligence systems do not possess human emotions, biological brains, or gut instincts. An algorithm "
                "cannot look out of a window and 'feel' that it might rain. Yet, modern computer systems make millions of choices every "
                "second: streaming apps pick the next song you hear, navigation systems steer buses around sudden traffic jams, online "
                "stores recommend the exact sports equipment you were looking for, and email services block dangerous messages before "
                "they clutter your inbox. How can a machine that only processes numbers make decisions that feel so thoughtful and intelligent? "
                "The answer lies in two straightforward concepts: structured branching paths called decision trees, and numerical balancing "
                "scores called weights and confidence percentages.\n\n"
                "In this lesson, we will demystify how automated systems think. You do not need complex mathematics, university-level algebra, "
                "or computer programming syntax to master this topic. Decision logic is fundamentally about asking the right questions in the right order. "
                "By exploring everyday examples—from packing your school backpack to filtering junk email and assisting medical doctors—you will "
                "discover how algorithms trace clear pathways, weigh heavy clues against light clues, calculate certainty scores, and recognize "
                "their own limits when information is missing or uncertain. Let us begin our analytical journey with Cipher, your guide through "
                "the architecture of automated decision-making."
            ),
            "learningObjectives": [
                "Understand how decision trees and weighted factors guide machine choices",
                "Interpret confidence percentages in automated recommendations",
                "Differentiate between random guessing and algorithmic decision logic"
            ],
            "duration": "45 mins",
            "cipherWelcome": {
                "dialogue": (
                    "Welcome, students of Class 8. I am Cipher, your analytical guide. "
                    "When people hear about artificial intelligence, they often picture a mysterious, all-knowing machine that operates through magic. "
                    "In reality, computer intelligence is orderly, transparent, and completely grounded in logic. A computer never guesses blindly. "
                    "It follows a systematic set of rules, calculates the importance of each clue, and measures how sure it is of its conclusion. "
                    "Today, we will examine the building blocks of algorithmic choices: decision trees, weights, and confidence scores. "
                    "By the time we finish, you will look at every digital recommendation—from your favorite music app to your shopping cart suggestions—with "
                    "a clear, analytical understanding of how the machine arrived at that choice. Follow along step by step, evaluate the evidence carefully, "
                    "and let us build your analytical intuition."
                ),
                "toastPrompt": "Follow the decision branch: Is temperature below 18°C? Select Yes or No."
            },
            "story": {
                "title": "The Morning of Five Clues: How Maya and Cipher Solved the Field Trip Puzzle",
                "content": (
                    "It was 6:15 on a Tuesday morning in late October. Fourteen-year-old Maya stood in front of her open wardrobe, looking puzzled. "
                    "Today was not an ordinary school day. Her eighth-grade class was embarking on an all-day field excursion to the Green Ridge Nature Reserve. "
                    "The excursion involved a morning science laboratory session indoors, a four-kilometer outdoor hiking trail through rocky hills in the afternoon, "
                    "and an outdoor picnic lunch in an open meadow.\n\n"
                    "The weather forecast on Maya's tablet was frustratingly mixed. The screen reported: 'Morning temperature 16 degrees Celsius, cool morning breeze, "
                    "cloud cover 45 percent, afternoon high reaching 26 degrees Celsius, 35 percent probability of scattered showers after 2:00 PM.'\n\n"
                    "Maya held three different items in her hands: her heavy winter blazer, a lightweight breathable rain jacket, and her standard cotton school sweater. "
                    "She also had to choose footwear: heavy rubber gumboots, stiff formal leather school shoes, or flexible trail walking sneakers. "
                    "'If I wear the heavy winter blazer, I will be comfortable at 7:00 AM at the bus stop, but I will be drenched in sweat during the hill climb at 1:00 PM,' "
                    "Maya thought out loud. 'If I wear only the cotton sweater and the afternoon showers arrive, I will be soaking wet and miserable. If I wear the gumboots, "
                    "my feet will hurt during the four-kilometer hike.'\n\n"
                    "A soft chime sounded from her tablet screen. Cipher's clean interface appeared with an analytical visual workspace.\n\n"
                    "'Good morning, Maya,' Cipher spoke with a calm, measured cadence. 'You appear to be experiencing decision fatigue. When a person faces multiple variables "
                    "—temperature fluctuations, physical activity demands, terrain conditions, and precipitation risks—trying to hold all those clues in your head simultaneously "
                    "causes confusion. Let us do what an analytical decision algorithm does: let us break the dilemma down into a clear decision tree.'\n\n"
                    "Maya leaned closer to the screen. 'Can a computer really figure out what I should wear better than I can?'\n\n"
                    "'A computer cannot feel the breeze or appreciate fashion,' Cipher replied patiently. 'However, a computer is exceptional at evaluating conditions without panicking. "
                    "Let us set our root condition first. What is the single most restrictive constraint of your day? Is it the morning cold, or is it the four-kilometer trail terrain?'\n\n"
                    "Maya reflected on the question. 'The trail terrain. If I hurt my feet or get blisters on the rocks, the entire day is ruined. The indoor lab and picnic do not cause blisters.'\n\n"
                    "'Precisely,' said Cipher. 'Condition 1: Does the schedule require extensive walking on unpaved rock paths? The answer is Yes. Therefore, all stiff leather formal shoes and "
                    "inflexible heavy gumboots are immediately eliminated from our decision path. The trail walking sneakers take priority. We have eliminated two-thirds of the footwear choices in a single step.'\n\n"
                    "Maya smiled as she set the trail sneakers beside her backpack. 'That was surprisingly quick. What about my clothes?'\n\n"
                    "'Now we examine Condition 2: Is the morning temperature below 18 degrees Celsius?' Cipher asked.\n\n"
                    "'Yes,' Maya answered. 'It is currently 16 degrees.'\n\n"
                    "'Follow the decision branch: Is temperature below 18°C? Select Yes or No.' Cipher noted. Maya selected Yes on the screen.\n\n"
                    "'Decision path verified! The system recommended a warm jacket based on weighted weather clues,' Cipher's feedback confirmed. 'Now, we reach Condition 3: Will the afternoon temperature "
                    "rise above 24 degrees with physical exertion? The forecast confirms 26 degrees. Therefore, a single monolithic heavy garment like your winter blazer fails because it cannot be adjusted. "
                    "The tree directs us toward layered clothing: a breathable cotton shirt base, topped with an easily removable outer layer.'\n\n"
                    "'That leaves either the sweater or the lightweight rain jacket,' Maya observed.\n\n"
                    "'Correct,' Cipher continued. 'Condition 4: Is there a measurable precipitation risk during the outdoor segment? The forecast indicates a 35 percent chance of showers. "
                    "While 35 percent is not a certainty, getting wet in an outdoor forest when the temperature drops in late afternoon represents a high-risk outcome. A standard cotton sweater absorbs water "
                    "like a sponge and retains moisture. A lightweight technical rain jacket blocks wind, sheds water, folds into the size of a fist, and weighs less than 200 grams. "
                    "When we weigh wind protection, water resistance, and portability, the rain jacket achieves a 94 percent decision match score.'\n\n"
                    "Maya placed the folded lightweight rain jacket into her backpack and put on her breathable school polo shirt and trail sneakers. "
                    "'Looking at it as a tree made the choice obvious. There was no guesswork involved at all.'\n\n"
                    "'That is the beauty of analytical logic, Maya,' Cipher concluded. 'By isolating each question and following the branches step by step, complex problems turn into simple, manageable answers. "
                    "Now let us examine how computers build and navigate these trees across millions of everyday real-world systems.'"
                )
            }
        },
        "sections": [
            {
                "sectionId": "section1",
                "title": "The Decision Tree in Your Brain",
                "content": (
                    "Deep, intuitive explanation of branching logic. Decision trees break complicated questions into simple yes-or-no branches. "
                    "[IMAGE_PLACEHOLDER: Visual decision tree showing: Is it raining? -> Yes -> Wear raincoat / No -> Wear regular uniform]\n\n"
                    "Every human being uses decision trees every day without realizing it. When you wake up, when you decide whether to take an umbrella to school, "
                    "when you choose which homework assignment to complete first, or when a football referee decides whether to blow the whistle for a foul, the human brain "
                    "evaluates a chain of conditions. A decision tree is simply a visual and mathematical map of those conditions. It is called a 'tree' because it starts at a single "
                    "starting point—the trunk or root—and then branches out in different directions depending on the answers to specific questions. Each branch leads either to another question "
                    "or to a final outcome, known in computer science as a leaf node.\n\n"
                    "To understand how simple and powerful this structure is, imagine asking yourself: 'Should our school cricket match proceed this afternoon?' "
                    "If you try to think about the pitch, the clouds, the temperature, the wind speed, the opposing team's travel time, and the referee's schedule all at the exact same instant, "
                    "your thoughts become tangled. But if you turn the problem into a tree, you ask one question at a time:\n"
                    "1. Is the playing pitch waterlogged from yesterday's storm? If Yes, stop immediately: the match is postponed. If No, proceed to the next branch.\n"
                    "2. Is it currently raining hard? If Yes, stop: wait 30 minutes under the pavilion. If No, proceed to the next branch.\n"
                    "3. Is the lighting adequate for safety? If Yes, start the match! If No, turn on ground floodlights.\n\n"
                    "Notice what happened: a decision that seemed complicated was resolved in three simple, clear steps. At each checkpoint, you only had to answer 'Yes' or 'No'. "
                    "You did not need advanced mathematics. You did not need to guess. The structure of the tree carried you directly from uncertainty to a clear, logical conclusion.\n\n"
                    "[IMAGE_PLACEHOLDER: Flowing branching decision tree diagram showing choices based on weather, temperature, and weekend plans]\n\n"
                    "In computer systems, decision trees are one of the most reliable and widely used tools in artificial intelligence. Software engineers love decision trees because they are "
                    "completely transparent. Many modern AI models, such as deep neural networks, act like mysterious black boxes: you feed in data, and they spit out an answer, but even the programmers "
                    "cannot easily see exactly why the machine picked that specific result. A decision tree is the opposite: it is an open glass box. Every branch is visible, every question is clear, "
                    "and anyone can trace the exact path the algorithm took to arrive at its final recommendation.\n\n"
                    "[IMAGE_PLACEHOLDER: Interactive decision tree builder with drag-and-drop condition branches]\n\n"
                    "Let us explore the core anatomical parts of every decision tree:\n\n"
                    "1. The Root Node: This is the very first question at the top of the tree. The root node is the master question that splits your data into the two biggest, most distinct groups. "
                    "For example, in a medical triage app, the root question might be: 'Is the patient experiencing difficulty breathing?' If the answer is yes, the system branches immediately to emergency care. "
                    "A good root node tackles the single most critical factor first.\n\n"
                    "2. The Branches: The lines that connect one question to another. In standard binary decision trees, each branch represents an outcome: typically 'Yes' or 'No', 'True' or 'False', "
                    "or 'Above Threshold' versus 'Below Threshold'. When you follow a branch, you discard all the possibilities that belonged to the other branch, instantly cutting your problem in half.\n\n"
                    "3. Internal Decision Nodes: These are the intermediate questions located along the branches. Once you pass the root question, internal nodes check secondary details. For instance, "
                    "if it is not raining, an internal node might ask: 'Is the temperature above 32 degrees Celsius?' If yes, the system suggests carrying an extra bottle of water.\n\n"
                    "4. Leaf Nodes (Terminal Outcomes): These are the end points of the branches. A leaf node contains no more questions. It provides the final action, recommendation, or classification. "
                    "Examples of leaf nodes include: 'Wear raincoat', 'Recommend cricket bat', 'Mark email as spam', or 'Delay match by one hour'.\n\n"
                    "Because trees operate sequentially, machines calculate the shortest, most accurate branch paths. If an answer can be decided after two questions, the algorithm does not waste time asking ten. "
                    "This makes decision trees extraordinarily fast, energy-efficient, and easy to run on everything from massive supercomputers to tiny microchips inside smart watches and washing machines.\n\n"
                    "During interactive activities, students can practice navigating condition thresholds with clear toast feedback. "
                    "When evaluating whether to wear warm outerwear, the system prompts: 'Follow the decision branch: Is temperature below 18°C? Select Yes or No.' "
                    "If a student takes the wrong branch or overlooks a threshold, the system provides helpful guidance: 'Re-evaluate the condition threshold before taking the branch.' "
                    "Once the correct branch is taken, the verification confirms: 'Decision path verified! The system recommended a warm jacket based on weighted weather clues.'"
                ),
                "examples": [
                    {
                        "title": "E-Commerce Shopping Recommendations",
                        "description": "Amazon notices you purchased cricket pads and batting gloves last week. Its decision tree predicts with 88% probability that you will be interested in a cricket bat next.",
                        "realLifeScenario": "Shopping portal • Helpful bundle suggestions appearing during checkout based on complementary items"
                    },
                    {
                        "title": "Streaming Entertainment Recommendations",
                        "description": "Netflix checks your watch history: Did you watch a sports documentary? Yes. Did you rate it 5 stars? Yes. Did you complete the entire series within three days? Yes. The recommendation tree branches directly to a newly released championship tennis documentary.",
                        "realLifeScenario": "Video streaming platform • Personalized 'Because you watched...' recommendations appearing on your homepage"
                    },
                    {
                        "title": "Smart GPS Route Selection",
                        "description": "A navigation application checks real-time road conditions: Is the main highway experiencing heavy gridlock? Yes. Does an alternate residential detour save more than 8 minutes? Yes. Is the detour suitable for school buses? Yes. The tree updates the turn-by-turn directions to the alternate route.",
                        "realLifeScenario": "Traffic navigation app • Dynamic route recalculation steering morning school buses away from construction zones"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: How an Online Sports Shop Predicted Arjun's Cricket Bat Need",
                    "content": (
                        "Arjun, a 13-year-old student from Pune, joined his school's under-14 cricket training camp. "
                        "On Monday evening, Arjun and his mother visited a major sports e-commerce website to purchase basic protective gear. "
                        "They added a pair of youth-size batting pads and padded batting gloves to their digital cart and completed the purchase.\n\n"
                        "Behind the scenes, the website's recommendation engine woke up. The algorithm did not have human feelings, and it did not know Arjun personally. "
                        "Instead, it evaluated Arjun's account through a clear decision tree constructed from the shopping habits of over 50,000 previous cricket players:\n\n"
                        "- Root Question: Did the customer purchase specialized cricket batting protection (pads and gloves) in the last 7 days? Branch: YES.\n"
                        "- Internal Question 1: Does the customer account already have a cricket bat registered as purchased in the last 12 months? Branch: NO.\n"
                        "- Internal Question 2: Is the gear sized for youth / junior categories? Branch: YES.\n"
                        "- Internal Question 3: Is the current month within the active school sports season (September to February)? Branch: YES.\n\n"
                        "At the end of this branch sat a leaf node: 'Recommend English Willow / Kashmir Willow Size 5-6 Cricket Bats with matching grip bundle'. "
                        "The algorithm calculated an 88% match probability. When Arjun's mother opened the website three days later to check the delivery tracking status of the pads, "
                        "the top banner gently displayed: 'Popular companion gear for your cricket kit: Top-rated junior cricket bats with protective toe guards.'\n\n"
                        "Arjun's mother remarked, 'How clever! We actually do need a bat before Saturday's friendly match!' "
                        "What felt like mind reading was simply a well-structured decision tree that mapped the natural sequence of how athletes build their gear kits."
                    )
                },
                "keyPoints": [
                    "Decision trees evaluate conditions through sequential branch questions",
                    "Each branch narrows down choices toward an optimal outcome",
                    "Machines calculate the shortest, most accurate branch paths",
                    "The root node addresses the most decisive initial condition in the problem",
                    "Leaf nodes represent terminal outcomes where no further questions are needed",
                    "Decision trees are transparent, explainable, and easy for humans to inspect and verify"
                ]
            },
            {
                "sectionId": "section2",
                "title": "Weights and Confidence Scores",
                "content": (
                    "Explanation of how some clues carry more weight than others. In predicting rain, dark storm clouds carry 80% weight, while day of the week carries 0% weight. "
                    "[IMAGE_PLACEHOLDER: Balancing scale graphic showing heavy factors like humidity vs light factors like day of the week]\n\n"
                    "In our first section, we saw how decision trees evaluate clear yes-or-no questions. But in the real world, not every clue is equally important. "
                    "Some clues are heavy, dependable anchors of truth. Other clues are light, minor hints. And some clues are completely useless noise that should be totally ignored.\n\n"
                    "Imagine you are standing on your front balcony trying to predict whether a sudden rain shower will start within the next twenty minutes. You look around and notice five distinct clues:\n"
                    "1. The sky overhead has turned dark purple-black, with thick, rumbling thunderclouds moving in fast.\n"
                    "2. The air temperature suddenly dropped by five degrees, and you can smell the sharp scent of damp earth and ozone.\n"
                    "3. The weather app on your phone reports local atmospheric humidity at 92 percent.\n"
                    "4. Today is a Wednesday.\n"
                    "5. Your neighbor down the street is riding a green bicycle.\n\n"
                    "If you treated every clue as having equal value, you would be hopelessly confused. Does the fact that today is Wednesday have anything to do with rain? Absolutely not. "
                    "Wednesday does not make clouds form. Does the neighbor's green bicycle cause water droplets to condense in the upper atmosphere? Of course not. "
                    "Clues 4 and 5 carry zero predictive power. If a computer system treated Wednesday as having the same importance as dark thunderclouds, it would make foolish mistakes.\n\n"
                    "This is where the concept of 'weights' becomes fundamental to artificial intelligence. A weight is simply a number that indicates how much an algorithm cares about a specific clue. "
                    "Think of a physical balancing scale. You place different clues on one side of the scale, and the outcome sits on the other. Heavy clues push the scale down with tremendous force; "
                    "light clues barely tilt it at all; and zero-weight clues are tossed off the scale entirely.\n\n"
                    "In our rain prediction system, the computer might assign weights on a 100-point scale like this:\n"
                    "- Dark storm clouds visible: 50 points (Heavy weight)\n"
                    "- Rapid temperature drop and thunder: 25 points (Moderate weight)\n"
                    "- Humidity above 90%: 20 points (Moderate weight)\n"
                    "- Gentle morning breeze: 5 points (Light weight)\n"
                    "- Day of the week is Wednesday: 0 points (Zero weight)\n"
                    "- Color of neighbor's bicycle: 0 points (Zero weight)\n\n"
                    "When the algorithm checks the weather, it tallies up the points for all active clues. If it observes dark clouds (50) + temperature drop (25) + high humidity (20), "
                    "the total score is 95 out of 100. That combined total is translated directly into a 'Confidence Score' or confidence percentage: 95% certainty of rain!\n\n"
                    "[IMAGE_PLACEHOLDER: UI screenshot showing an AI recommendation displaying confidence score: 94% match]\n\n"
                    "What exactly does a confidence percentage mean? When an AI system displays: 'Confidence Score: 94% match', it is not expressing human pride or claiming to be infallible. "
                    "A confidence percentage is a statistical measure of evidence. It means: 'Based on thousands of historical examples that looked like this one, when these specific weighted clues "
                    "were present together, the prediction was correct 94 times out of 100.'\n\n"
                    "Now comes the crucial operational question: What does the machine do with this percentage? This is governed by an automated boundary called a 'Decision Threshold'. "
                    "A decision threshold is the cut-off line established by system designers. For example:\n"
                    "- If the threshold for sending a severe rain warning is set at 80%, our score of 95% easily clears the bar. The system automatically triggers the smartphone alert.\n"
                    "- If the score had only been 65% (perhaps some humidity was present, but no dark clouds or thunder), the score would remain below the 80% threshold. "
                    "The system would refrain from ringing alarm bells, avoiding annoying and unnecessary interruptions for millions of users.\n\n"
                    "Consider how email spam filters use weighted clues every second of the day. Every email service receives billions of incoming messages every day. "
                    "A massive fraction of those messages are fraudulent advertisements, fake lottery notices, or malicious phishing attempts designed to steal passwords. "
                    "How does the email provider sort the mail before it reaches your eyes?\n\n"
                    "The spam filter inspects incoming messages for specific weighted clues:\n"
                    "- Clue 1: Does the subject line contain urgent, high-pressure money phrases like 'Claim your $1,000,000 lottery prize immediately' or 'Urgent: Wire funds now'? Weight: +40 spam points.\n"
                    "- Clue 2: Is the sender's email address pretending to be a bank, but sent from an unrecognized, suspicious domain like 'secure-bank-login-xyz892.biz'? Weight: +45 spam points.\n"
                    "- Clue 3: Does the email body contain hidden links that redirect to an unverified IP address? Weight: +25 spam points.\n"
                    "- Clue 4: Is the email sent to 50,000 recipients at the exact same second? Weight: +20 spam points.\n"
                    "- Clue 5: On the other hand, is the sender's address in your existing personal contact book? Weight: -60 spam points (Strong evidence that the email is safe!).\n\n"
                    "If a scammer sends a fake prize notification from an unknown domain, the positive spam clues add up: 40 + 45 + 25 = 110 points! "
                    "The spam probability hits 98%. Because the spam threshold is set at 85%, the filter automatically diverts the message away from your primary inbox and drops it into the junk folder. "
                    "Meanwhile, an email from your school principal announcing next week's annual sports day contains no suspicious links, originates from the verified school domain, "
                    "and carries a negative spam score. It sails straight into your primary inbox with 99% safety confidence.\n\n"
                    "In interactive learning modules, students practice evaluating thresholds with responsive toast guidance: "
                    "'Follow the decision branch: Is temperature below 18°C? Select Yes or No.' "
                    "When the user confirms the branch, the system reinforces the learning: 'Decision path verified! The system recommended a warm jacket based on weighted weather clues.' "
                    "If the user takes an incorrect path, the system gently corrects: 'Re-evaluate the condition threshold before taking the branch.'"
                ),
                "examples": [
                    {
                        "title": "Email Spam Filters",
                        "description": "An email with the words 'Claim lottery prize immediately' gets a high spam score. If sent from an unknown domain, the score hits 98% and moves to the junk folder.",
                        "realLifeScenario": "Email inbox • Important school circulars reaching your main inbox while suspicious ads are filtered out"
                    },
                    {
                        "title": "Automated Weather Alert Systems",
                        "description": "A meteorological model assigns 45% weight to rapid barometric pressure drops, 35% weight to Doppler radar cloud density, and 15% weight to ground humidity. When the combined index exceeds the 80% warning threshold, phones in the district receive an automated thunderstorm advisory.",
                        "realLifeScenario": "Mobile phone weather service • Early morning notifications prompting students and parents to pack umbrellas"
                    },
                    {
                        "title": "Music Streaming Daily Discovery",
                        "description": "A streaming platform calculates user affinity: listening to an entire 4-minute instrumental song awards +25 points; adding the song to a personal playlist awards +40 points; skipping a song within the first 5 seconds deducts -35 points. The weighted sum updates the user's weekly recommendation mix.",
                        "realLifeScenario": "Music streaming platform • Curating personalized morning playlists matching your listening tempo"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: The Anatomy of a Junk Mail Filter: How Priya's Inbox Stayed Safe",
                    "content": (
                        "Priya is an eighth-grader who uses her school-issued email account to collaborate on science projects and receive notices from teachers. "
                        "One Thursday afternoon, while working on a robotics presentation, an automated notification popped up in her junk mail folder counter. "
                        "Curious about why it didn't land in her main inbox, Priya opened the folder under her teacher's supervision to inspect the blocked message.\n\n"
                        "The email claimed to come from: 'Global Youth Science Scholarship Committee'.\n"
                        "The subject read: 'CONGRATULATIONS! You have won a $5,000 cash grant! Click here to claim your cash immediately!'\n"
                        "To an untrained reader, the email looked exciting and potentially real. But the school's automated email defense filter had dissected the message analytically:\n\n"
                        "- Signal 1: Urgent monetary payout keywords ('CONGRATULATIONS', 'cash grant', 'claim cash immediately'). Clue Weight: +35.\n"
                        "- Signal 2: Sender domain mismatch. The header claimed to be from an official scholarship foundation, but the true sending mail server was registered in an offshore hosting service with no educational credentials. Clue Weight: +45.\n"
                        "- Signal 3: Embedded clickable hyperlink leading to an unencrypted login capture form. Clue Weight: +30.\n"
                        "- Signal 4: Recipient list contained 12,000 student email addresses arranged in alphabetical order. Clue Weight: +25.\n\n"
                        "Total Spam Score: 135 points out of a maximum 100 scale (Normalized Confidence: 99.4% certainty of malicious intent).\n"
                        "Because the school district established a strict spam threshold of 80%, the email was quarantined instantly. "
                        "Not a single student was exposed to the dangerous link during class hours.\n\n"
                        "'The filter did not know the email was a scam because it has feelings or instincts,' Cipher explained to Priya. "
                        "'It knew because each dishonest signal added heavy weight to the scale until the spam score was mathematically undeniable.'"
                    )
                },
                "keyPoints": [
                    "Not all clues are equal; algorithms assign numerical weights to critical factors",
                    "Confidence percentages represent the mathematical probability of a match",
                    "Thresholds determine whether an action is executed automatically",
                    "Heavy weights indicate decisive evidence, while zero weights filter out irrelevant distractions",
                    "A decision threshold prevents automated systems from acting on weak or insufficient clues",
                    "Combining multiple moderately weighted clues can produce high overall confidence"
                ]
            },
            {
                "sectionId": "section3",
                "title": "When Decisions Go Wrong: Handling Uncertainty",
                "content": (
                    "Discussion of what happens when data is missing or ambiguous. Good systems report lower confidence scores and request human verification instead of making reckless guesses. "
                    "[IMAGE_PLACEHOLDER: Alert dialog displaying: 'Confidence 45% - Please confirm with user' alongside medical or banking decisions]\n\n"
                    "So far, we have looked at scenarios where the clues were clean, clear, and abundant. When an email contains obvious scam keywords from a suspicious server, "
                    "the spam score is high and the choice is simple. When rain clouds are dark and humidity is 95%, predicting rain is straightforward. "
                    "However, in real life, data is rarely perfect. Clues can be missing, sensors can be dirty or broken, signals can contradict each other, and situations can be entirely novel.\n\n"
                    "What should an artificial intelligence do when it is NOT sure?\n\n"
                    "To understand the danger, consider what a reckless, poorly designed program might do. If a computer is programmed to always give a definite yes-or-no answer no matter what, "
                    "it is forced to make a blind guess whenever evidence is weak. Imagine a medical symptom checker app on a smartphone. A patient types in: 'Mild dry cough for two days, slight fatigue, "
                    "no fever, normal breathing.'\n\n"
                    "In medical science, those symptoms could match dozens of different conditions: a mild reaction to seasonal dust or pollen, a common head cold, dry air from an indoor air conditioner, "
                    "or the very early onset of a viral respiratory infection. The clues simply do not contain enough decisive weight to distinguish between a dust allergy and a viral infection. "
                    "If the app made a reckless guess and declared: 'You have a severe bacterial infection—start taking strong prescription antibiotics immediately!', the patient could take dangerous, "
                    "unnecessary medications and suffer harmful side effects. Conversely, if the app guessed: 'You only have harmless dust allergy—ignore it', the patient might fail to rest and spread a contagious virus.\n\n"
                    "A well-engineered, trustworthy AI system behaves completely differently: it acknowledges its own uncertainty. When the algorithm tallies the weighted symptoms, "
                    "its confidence score might only reach 45%. Instead of hiding this low score or flipping a coin, the system displays an explicit alert:\n"
                    "'Confidence Score: 45% (Low Certainty). The available symptoms are ambiguous and could indicate seasonal allergy or a mild viral infection. Automated diagnosis is not safe. "
                    "Please consult a certified medical doctor for a professional clinical examination.'\n\n"
                    "This principle is known across the world of computer science as 'Keeping Humans in the Loop' (HITL). "
                    "In low-stakes decisions—such as whether a music app recommends a jazz song or a pop song—a mistake is harmless. If Spotify recommends a song you dislike, you simply tap 'Skip'. "
                    "Nobody gets hurt, and the algorithm learns from your skip by adjusting its weights. "
                    "However, in high-stakes decisions—such as healthcare diagnostics, commercial aircraft navigation, court legal evaluations, nuclear plant monitoring, and banking security—automated systems "
                    "must never operate on blind guesses. High-stakes systems are designed to act as analytical assistants that support human experts, not replacements that operate without oversight.\n\n"
                    "Let us examine how this works in modern banking security. Imagine an eighth-grade teacher in Delhi uses her credit card at a local neighborhood grocery store at 3:15 PM on a Tuesday. "
                    "Then, at 3:28 PM—just thirteen minutes later—a transaction request for an expensive luxury watch worth 80,000 rupees arrives at the bank's computers from a boutique store in central London! "
                    "The bank's fraud detection decision tree runs instantly:\n"
                    "- Clue 1: Distance between Delhi and London is over 6,700 kilometers. Physical human travel between the two locations in 13 minutes is physically impossible according to the laws of physics. Clue Weight: +60 fraud risk.\n"
                    "- Clue 2: The purchase amount is fifteen times higher than the teacher's average transaction size. Clue Weight: +25 fraud risk.\n"
                    "- Clue 3: However, the cardholder's online profile shows she frequently purchases academic books online from international publishers in the United Kingdom. Clue Weight: -20 fraud risk (Ambiguity!).\n\n"
                    "The overall confidence that this is a fraudulent card clone is around 68%. Is 68% high enough to permanently cancel the card and accuse someone of theft? No, that might strand an innocent teacher "
                    "without payment options. But is it low enough to ignore? Absolutely not; 80,000 rupees could be stolen! "
                    "Because the score falls in the 'Uncertainty Zone' (between 50% and 80%), the system executes a safe fallback protocol: it temporarily freezes the single transaction, "
                    "keeps the account safe, and sends an urgent confirmation message directly to the teacher's registered mobile phone: "
                    "'Bank Security Alert: Did you just authorize an 80,000 INR transaction in London? Reply YES to approve, or NO to lock your card.' "
                    "The human is placed firmly in the loop. With one tap, the teacher replies 'NO', stopping the international fraudster cold in their tracks.\n\n"
                    "Engineers also study two critical types of decision errors when tuning thresholds:\n"
                    "1. False Positives (False Alarms): The algorithm flags an innocent event as dangerous. Example: A school smoke detector triggers the loud evacuation alarm because someone slightly burnt a slice of toast in the teachers' lounge. "
                    "While annoying, a false positive in safety is usually better than a false negative.\n"
                    "2. False Negatives (Missed Detections): The algorithm fails to detect a genuine problem. Example: A medical scanner fails to spot an early fracture on an X-ray because the hairline crack was faint, sending an injured athlete back onto the field. "
                    "False negatives in medicine and aviation can have severe consequences.\n\n"
                    "By understanding confidence percentages and setting strict thresholds, we ensure that artificial intelligence remains a safe, dependable, and humble partner to human judgment. "
                    "Smart technology is not defined by pretending to know everything; smart technology knows the precise boundaries of its own reliability."
                ),
                "examples": [
                    {
                        "title": "Medical Symptom Checkers",
                        "description": "When a health app cannot determine whether a cough is due to common dust allergy or viral infection, it prompts: 'Low certainty—please consult a doctor immediately.'",
                        "realLifeScenario": "Health app • Advising medical consultation rather than guessing medication"
                    },
                    {
                        "title": "Banking Fraud Prevention Safeguards",
                        "description": "When a credit card purchase occurs in a foreign country shortly after a domestic transaction, the fraud algorithm calculates an intermediate 68% certainty score, temporarily pauses the charge, and dispatches a verification SMS to the account holder.",
                        "realLifeScenario": "Banking security system • Instant two-way SMS verification preventing credit card theft while avoiding mistaken account closures"
                    },
                    {
                        "title": "Automated Examination Paper OCR Scanning",
                        "description": "An optical character recognition system scoring standardized school exam papers encounters smudged blue ink and folded paper corners. When handwriting recognition confidence drops to 41%, the system routes the paper to a human teacher for manual grading.",
                        "realLifeScenario": "School examination grading board • Ensuring fair marks by having human teachers grade smudged or ambiguous answers"
                    }
                ],
                "deepDiveStory": {
                    "title": "Case Study: The Night the Hospital AI Asked for Doctor Sharma's Opinion",
                    "content": (
                        "At 11:30 PM in the emergency ward of City Memorial Hospital, Dr. Sharma was reviewing digital chest scans. "
                        "The hospital had recently installed an advanced computer vision assistant designed to assist radiologists by screening X-rays for pneumonia and collapsed lung tissue.\n\n"
                        "On an ordinary scan, clear fluid accumulation in the lung produces crisp, distinctive shadows. In those typical cases, the AI assistant highlights the region in blue and reports: "
                        "'High Confidence: 96% match for bacterial pneumonia.' Dr. Sharma verifies the blue overlay, confirms the diagnosis, and prescribes targeted antibiotics in minutes.\n\n"
                        "However, near midnight, a scan arrived for an elderly patient who suffered from long-term asthma and had broken two ribs in a bicycle accident five years earlier. "
                        "The old healed bone fractures had left unusual calcium scar tissue across the lower ribs, right next to a small, faint shadow near the diaphragm.\n\n"
                        "The AI assistant began tracing its decision tree:\n"
                        "- Condition 1: Density of shadow above threshold? YES.\n"
                        "- Condition 2: Circular perimeter indicative of fluid pocket? AMBIGUOUS (48% match).\n"
                        "- Condition 3: Match with historical asthma scar tissue? AMBIGUOUS (51% match).\n\n"
                        "Instead of forcing a yes-or-no prediction, the screen displayed a distinct amber caution banner: "
                        "[IMAGE_PLACEHOLDER: Alert dialog displaying: 'Confidence 45% - Please confirm with user' alongside medical or banking decisions]\n\n"
                        "The interface read: 'Scan Analysis: Confidence 45%. Image exhibits overlapping features of chronic pleural thickening and acute infiltration. "
                        "Automated classification confidence is insufficient. Escalating image to attending physician for clinical correlation.'\n\n"
                        "Dr. Sharma pulled up the patient's historical medical records, conducted an in-person physical stethoscope examination, and listened to the lung sounds. "
                        "He recognized that the shadow was harmless scar tissue from the old bicycle fracture, combined with mild allergic bronchospasm. "
                        "He prescribed a soothing bronchodilator inhaler, and the patient went home comfortably that evening.\n\n"
                        "'The most impressive feature of this software,' Dr. Sharma later told the medical interns, 'is not how fast it flags easy pneumonia cases. "
                        "Its most valuable feature is that it knows when to stop, raise its hand, and say: Doctor, I am uncertain; please take over.'"
                    )
                },
                "keyPoints": [
                    "Low confidence scores alert users that automated predictions are uncertain",
                    "Critical decisions in health, aviation, and law must keep humans in the loop",
                    "Smart technology knows the boundaries of its own reliability",
                    "A responsible system never guesses blindly when evidence is incomplete or ambiguous",
                    "False positives and false negatives carry different costs depending on the scenario",
                    "Safe fallback protocols protect human safety whenever automated certainty falls below the threshold"
                ]
            }
        ],
        "activities": [
            {
                "activityId": "activity1",
                "title": "Decision Tree Branch Builder",
                "description": (
                    "Construct a 3-level decision tree that predicts whether an outdoor school sports match should proceed, be delayed, or moved indoors based on weather, ground condition, and temperature. "
                    "[IMAGE_PLACEHOLDER: Interactive node-linking canvas with branch condition blocks and outcome cards]"
                ),
                "instructions": [
                    "1. Set the root question: 'Is ground waterlogged?'",
                    "2. Add sub-branches for temperature and wind speed",
                    "3. Test the tree with 3 sample weather cards to verify outcomes"
                ],
                "materials": "Interactive branching canvas, weather scenario test deck",
                "duration": "15 mins",
                "stepByStepGuide": [
                    "Step 1: Open the Interactive Branching Canvas. Drag the primary condition card to the top slot and label it with the root question: 'Is ground waterlogged?'",
                    "Step 2: Connect the 'YES' branch directly to a terminal leaf node: 'Outcome A: Cancel outdoor match & reschedule'. Waterlogged turf causes slip injuries, making further weather checks unnecessary.",
                    "Step 3: Connect the 'NO' branch to your secondary decision node: 'Is active rain falling or forecast within 30 minutes?'",
                    "Step 4: If rain is falling, branch to 'Outcome B: Delay start by 45 minutes and re-evaluate under pavilion'. If no rain, branch to your tertiary condition node: 'Is wind speed above 45 km/h OR temperature below 14°C?'",
                    "Step 5: If wind or extreme cold is present, branch to 'Outcome C: Move match to indoor gymnasium'. If mild, branch to 'Outcome D: Proceed with outdoor sports match as scheduled!'"
                ],
                "sampleTestCards": [
                    {
                        "cardId": "test1",
                        "scenario": "Card A: Ground is dry, sky has scattered white clouds, wind speed 15 km/h, temperature 22°C.",
                        "expectedOutcome": "Outcome D: Proceed with outdoor sports match as scheduled (100% confidence path)."
                    },
                    {
                        "cardId": "test2",
                        "scenario": "Card B: Heavy overnight rain left 4 cm of standing puddles across the cricket pitch, no current rain, temperature 20°C.",
                        "expectedOutcome": "Outcome A: Cancel outdoor match & reschedule (Ground waterlogged root branch triggered immediately)."
                    },
                    {
                        "cardId": "test3",
                        "scenario": "Card C: Turf is dry, but an incoming storm front brings 55 km/h wind gusts and sudden 12°C chill.",
                        "expectedOutcome": "Outcome C: Move match to indoor gymnasium (Tertiary weather safety threshold triggered)."
                    }
                ],
                "toastFeedback": {
                    "tap_prompt": "Follow the decision branch: Is temperature below 18°C? Select Yes or No.",
                    "great_job": "Decision path verified! The system recommended a warm jacket based on weighted weather clues.",
                    "try_again": "Re-evaluate the condition threshold before taking the branch."
                }
            },
            {
                "activityId": "activity2",
                "title": "The Spam Detective Weighting Workshop",
                "description": "Assign numerical importance weights from 0 to 50 to six different email attributes, then calculate whether three incoming test emails cross the 75-point automated spam quarantine threshold.",
                "instructions": [
                    "1. Assign weights to six email clues: Unknown sender domain, urgent prize language, suspicious hyperlinks, known personal contact, attachment type, and email font color.",
                    "2. Explain why font color receives 0 weight while sender domain receives 45 weight.",
                    "3. Calculate the total score for three sample incoming emails and determine whether each message goes to the Inbox, Quarantine, or Junk Folder."
                ],
                "materials": "Digital clue weight slider interface, 3 test email cards",
                "duration": "15 mins"
            },
            {
                "activityId": "activity3",
                "title": "Human-in-the-Loop Threshold Simulator",
                "description": "Examine four automated decisions across medical triage, flight routing, banking fraud, and school exam grading, determining the required confidence threshold before allowing the system to act autonomously.",
                "instructions": [
                    "1. Review the four operational scenarios and assess the human consequences of a false positive versus a false negative.",
                    "2. Adjust the autonomous threshold slider for each scenario (e.g., 95% for medicine vs 70% for song recommendations).",
                    "3. Run 10 simulated test cases to observe how keeping a human in the loop prevents catastrophic mistakes."
                ],
                "materials": "Confidence threshold slider interface, 4 case scenario files",
                "duration": "15 mins"
            },
            {
                "activityId": "activity4",
                "title": "E-Commerce Recommendation Path Builder",
                "description": "Map out an automated shopping recommendation tree that suggests cricket accessories, rain gear, or school stationery based on recent purchases, season, and student grade level.",
                "instructions": [
                    "1. Define the root question: 'Did the user purchase sports protective equipment in the past 14 days?'",
                    "2. Build sub-branches evaluating weather forecasts (e.g., rain predicted -> rain jacket / waterproof backpack cover).",
                    "3. Test the pathway with three student buyer profiles and calculate match confidence percentages."
                ],
                "materials": "E-commerce decision node templates, customer profile cards",
                "duration": "15 mins"
            },
            {
                "activityId": "activity5",
                "title": "Medical vs Entertainment Risk Threshold Matrix",
                "description": "Compare decision risk thresholds across four domains: medical diagnostics, autonomous driving, email filtering, and video streaming recommendations.",
                "instructions": [
                    "1. Analyze the consequences of a false positive vs false negative in each domain.",
                    "2. Set appropriate autonomous action thresholds (e.g., 98% for healthcare vs 60% for streaming).",
                    "3. Write a two-sentence reflection explaining why entertainment systems can tolerate low confidence while medical systems require human-in-the-loop review."
                ],
                "materials": "Threshold calibration matrix sheet, risk evaluation rubric",
                "duration": "15 mins"
            }
        ],
        "summary": {
            "recap": (
                "Cipher: You learned how machines evaluate clues using decision trees and weighted scores. "
                "Understanding how AI makes choices helps you evaluate automated recommendations critically. "
                "Instead of operating by magic or intuition, automated decision systems rely on clean, structured logic. "
                "Decision trees break complex challenges into sequential, manageable questions that narrow down possibilities step by step. "
                "Weights ensure that critical indicators receive serious attention while irrelevant distractions are ignored. "
                "Confidence percentages reflect how strongly statistical evidence supports an outcome, and decision thresholds establish clear boundaries for automated action. "
                "Most importantly, you discovered that true intelligence includes knowing the limits of one's own certainty: in high-stakes fields like medicine, banking, and public safety, "
                "systems must report low confidence and keep human experts in the loop rather than making reckless guesses."
            ),
            "keyTakeaways": [
                "AI makes choices through weighted branching logic rather than intuition",
                "Confidence percentages reflect how strongly evidence supports a conclusion",
                "Human oversight remains essential when confidence levels are low",
                "Decision trees break complicated dilemmas into clear, verifiable yes-or-no branches",
                "Weights differentiate critical signals from irrelevant background noise",
                "A decision threshold establishes the minimum statistical certainty required before an automated action triggers",
                "In high-stakes applications like healthcare and aviation, keeping humans in the loop ensures safety and accountability",
                "Responsible technology is transparent, explainable, and capable of acknowledging its own uncertainty"
            ]
        },
        "assessment": [
            {
                "id": "q1",
                "question": "What is the primary function of the root node in a decision tree?",
                "options": [
                    { "id": "a", "text": "It displays the final answer and ends the decision process.", "correct": False, "feedback": "Incorrect. The final answer is located at a leaf node, not the root node." },
                    { "id": "b", "text": "It asks the single most decisive initial question that splits the data into primary branches.", "correct": True, "feedback": "Correct! The root node represents the master starting question that begins the branching process." },
                    { "id": "c", "text": "It randomly picks an outcome when the computer is running low on battery.", "correct": False, "feedback": "Incorrect. Decision trees never make random guesses." },
                    { "id": "d", "text": "It calculates the color theme of the user interface.", "correct": False, "feedback": "Incorrect. The root node evaluates data conditions, not visual styling." }
                ],
                "explanation": "The root node is the very top checkpoint of a decision tree, posing the primary condition that divides all possibilities into major sub-branches."
            },
            {
                "id": "q2",
                "question": "Why does a decision tree algorithm discard options along an unchosen branch?",
                "options": [
                    { "id": "a", "text": "Because unchosen branches represent conditions that have already been proven false for that scenario.", "correct": True, "feedback": "Correct! Once a condition is answered 'No', all possibilities that required 'Yes' are eliminated, simplifying the decision." },
                    { "id": "b", "text": "Because the computer's memory drive deletes them permanently.", "correct": False, "feedback": "Incorrect. The tree structure remains intact in memory; the algorithm simply does not traverse irrelevant paths." },
                    { "id": "c", "text": "Because computers can only read one sentence per minute.", "correct": False, "feedback": "Incorrect. Computers evaluate thousands of branches in fractions of a millisecond." },
                    { "id": "d", "text": "Because unchosen branches contain computer viruses.", "correct": False, "feedback": "Incorrect. Branches are simply logical rules, not security threats." }
                ],
                "explanation": "Branching allows an algorithm to eliminate irrelevant possibilities rapidly, focusing only on outcomes that match the verified clues."
            },
            {
                "id": "q3",
                "question": "In predicting whether it will rain today, why does the day of the week receive a weight of 0?",
                "options": [
                    { "id": "a", "text": "Because the calendar was invented before computers were built.", "correct": False, "feedback": "Incorrect. The history of calendars has no bearing on atmospheric physics." },
                    { "id": "b", "text": "Because whether today is Tuesday or Friday has zero physical relationship with cloud formation and precipitation.", "correct": True, "feedback": "Correct! Irrelevant factors receive zero weight so they do not distort the decision." },
                    { "id": "c", "text": "Because rain only falls on weekends.", "correct": False, "feedback": "Incorrect. Weather operates independently of the human school week." },
                    { "id": "d", "text": "Because 0 is the computer's favorite number.", "correct": False, "feedback": "Incorrect. Weights reflect statistical importance, not machine preferences." }
                ],
                "explanation": "Weights reflect cause-and-effect correlation. Clues with no predictive value are assigned zero weight to prevent false conclusions."
            },
            {
                "id": "q4",
                "question": "What does a confidence score of 94% displayed by an AI shopping recommendation indicate?",
                "options": [
                    { "id": "a", "text": "The computer is 94% proud of its work.", "correct": False, "feedback": "Incorrect. Machines do not have feelings or personal pride." },
                    { "id": "b", "text": "Based on historical customer patterns with similar gear purchases, the recommendation proved relevant 94 out of 100 times.", "correct": True, "feedback": "Correct! Confidence percentages express statistical probability based on observed patterns." },
                    { "id": "c", "text": "The price of the item has been discounted by 94 percent.", "correct": False, "feedback": "Incorrect. Confidence scores reflect prediction certainty, not retail discounts." },
                    { "id": "d", "text": "The item will be delivered within 94 minutes.", "correct": False, "feedback": "Incorrect. Confidence measures match likelihood, not shipping duration." }
                ],
                "explanation": "A confidence percentage represents mathematical probability calculated from weighted evidence and historical data."
            },
            {
                "id": "q5",
                "question": "What is a decision threshold in an automated classification system?",
                "options": [
                    { "id": "a", "text": "The minimum confidence score required before an automated action is triggered.", "correct": True, "feedback": "Correct! The threshold is the cutoff line that determines whether the system acts automatically." },
                    { "id": "b", "text": "The physical door frame leading into a computer server room.", "correct": False, "feedback": "Incorrect. A threshold in algorithms is a numerical decision boundary." },
                    { "id": "c", "text": "The maximum number of keys on a student's keyboard.", "correct": False, "feedback": "Incorrect. Keyboard hardware is unrelated to algorithmic thresholds." },
                    { "id": "d", "text": "The time it takes for a screen to turn off when idle.", "correct": False, "feedback": "Incorrect. That is a screen timeout, not a decision threshold." }
                ],
                "explanation": "Decision thresholds establish clear boundaries: evidence above the threshold triggers action; evidence below triggers caution or review."
            },
            {
                "id": "q6",
                "question": "How does an email spam filter handle a message containing suspicious lottery claims sent from an unknown domain?",
                "options": [
                    { "id": "a", "text": "It replies to the sender asking for free tickets.", "correct": False, "feedback": "Incorrect. Spam filters never reply to suspicious mail." },
                    { "id": "b", "text": "It tallies high weighted spam points, calculates a confidence score above 90%, and moves the message to junk.", "correct": True, "feedback": "Correct! Multiple suspicious clues accumulate heavy points until the spam threshold is crossed." },
                    { "id": "c", "text": "It shuts down the student's computer immediately.", "correct": False, "feedback": "Incorrect. Filtering happens at the mail server without crashing the device." },
                    { "id": "d", "text": "It forwards the email to all students in Class 8.", "correct": False, "feedback": "Incorrect. That would amplify the spam rather than block it." }
                ],
                "explanation": "Spam filters aggregate weighted risk indicators. Multiple strong signals push the score past the threshold into quarantine."
            },
            {
                "id": "q7",
                "question": "What should a responsible medical diagnostic AI do when patient symptoms yield only a 45% confidence score?",
                "options": [
                    { "id": "a", "text": "Make a random guess so the patient gets an instant prescription.", "correct": False, "feedback": "Incorrect. Guessing in healthcare can lead to dangerous and life-threatening mistakes." },
                    { "id": "b", "text": "Display a low certainty warning and advise the patient to consult a qualified human physician.", "correct": True, "feedback": "Correct! When confidence is low, safe systems acknowledge uncertainty and refer to human experts." },
                    { "id": "c", "text": "Invent a new medical disease that matches the 45% score.", "correct": False, "feedback": "Incorrect. Algorithms must never fabricate medical conditions." },
                    { "id": "d", "text": "Delete the patient's records from the database.", "correct": False, "feedback": "Incorrect. Medical data must be preserved for doctor evaluation." }
                ],
                "explanation": "Safe AI models know their limits. High uncertainty triggers human-in-the-loop escalation rather than automated guesswork."
            },
            {
                "id": "q8",
                "question": "What is meant by 'Keeping Humans in the Loop' (HITL)?",
                "options": [
                    { "id": "a", "text": "Forcing humans to do all math calculations by hand with paper and pencil.", "correct": False, "feedback": "Incorrect. Computers still assist with heavy computational work." },
                    { "id": "b", "text": "Designing high-stakes AI systems to assist human decision-makers rather than executing critical choices without oversight.", "correct": True, "feedback": "Correct! Human-in-the-loop ensures that human wisdom, context, and ethics oversee machine recommendations." },
                    { "id": "c", "text": "Tying computer cords into circular loops for cable management.", "correct": False, "feedback": "Incorrect. Cable management is physical, not an algorithmic concept." },
                    { "id": "d", "text": "Playing an endless music playlist on repeat.", "correct": False, "feedback": "Incorrect. HITL refers to decision governance, not audio playback." }
                ],
                "explanation": "Keeping humans in the loop pairs machine calculation speed with human judgment, moral responsibility, and common sense."
            },
            {
                "id": "q9",
                "question": "In the sports match activity, why does 'Is ground waterlogged?' make an ideal root node?",
                "options": [
                    { "id": "a", "text": "Because water is cold and players dislike cold water.", "correct": False, "feedback": "Incorrect. The issue is player safety and unplayable turf, not personal preference." },
                    { "id": "b", "text": "Because a waterlogged pitch prevents play regardless of what the sunshine or temperature does.", "correct": True, "feedback": "Correct! If the ground is flooded, all other weather questions become irrelevant, saving time and effort." },
                    { "id": "c", "text": "Because water evaporates after five minutes in all conditions.", "correct": False, "feedback": "Incorrect. Flooded pitches can take hours or days to drain." },
                    { "id": "d", "text": "Because water is the longest word in the dictionary.", "correct": False, "feedback": "Incorrect. Root nodes are chosen for logical priority, not word length." }
                ],
                "explanation": "An optimal root node addresses the single most decisive constraint that can resolve the dilemma with the fewest questions."
            },
            {
                "id": "q10",
                "question": "How does algorithmic decision logic differ fundamentally from human superstition or lucky guessing?",
                "options": [
                    { "id": "a", "text": "Algorithmic logic follows measurable evidence, weighted conditions, and verifiable rules rather than hunches.", "correct": True, "feedback": "Correct! Algorithms are reproducible, transparent, and grounded in systematic evidence." },
                    { "id": "b", "text": "Algorithms use magical fortune-telling cards inside the processor chip.", "correct": False, "feedback": "Incorrect. Computers run on transistors and logic, not magic." },
                    { "id": "c", "text": "Algorithms always choose the option with the most colorful picture.", "correct": False, "feedback": "Incorrect. Visual decoration does not determine logical decisions." },
                    { "id": "d", "text": "There is no difference; computers simply guess like humans.", "correct": False, "feedback": "Incorrect. Machines evaluate mathematical models, not intuitive hunches." }
                ],
                "explanation": "Algorithmic choices are deterministic, explainable, and based on weighted statistical evaluation rather than blind chance."
            },
            {
                "id": "q11",
                "question": "What is the difference between a False Positive and a False Negative in an automated system?",
                "options": [
                    { "id": "a", "text": "A False Positive raises a false alarm when nothing is wrong, while a False Negative fails to detect a genuine problem.", "correct": True, "feedback": "Correct! False positives cause unnecessary alarms, while false negatives miss actual hazards." },
                    { "id": "b", "text": "A False Positive is always mathematical, while a False Negative is always grammatical.", "correct": False, "feedback": "Incorrect. Both terms refer to classification errors in statistics and AI." },
                    { "id": "c", "text": "A False Positive only happens in sports apps, while a False Negative happens in music apps.", "correct": False, "feedback": "Incorrect. Both types of errors can occur across all algorithmic domains." },
                    { "id": "d", "text": "There is no difference; both mean the computer ran out of battery.", "correct": False, "feedback": "Incorrect. They represent opposite types of incorrect predictions." }
                ],
                "explanation": "A False Positive falsely detects something that is absent (false alarm); a False Negative misses something that is present (missed detection)."
            },
            {
                "id": "q12",
                "question": "In a spam filter model, what does a negative weight (such as -60 points) assigned to 'sender is in contacts' signify?",
                "options": [
                    { "id": "a", "text": "It means the computer will crash if the email is opened.", "correct": False, "feedback": "Incorrect. Negative weights are mathematical adjustments, not software errors." },
                    { "id": "b", "text": "It represents strong counter-evidence, substantially lowering the spam score because messages from known contacts are usually trustworthy.", "correct": True, "feedback": "Correct! Negative weights reduce the risk score when strong positive indicators of legitimacy are present." },
                    { "id": "c", "text": "It means the email contains 60 spelling errors.", "correct": False, "feedback": "Incorrect. Weights reflect statistical trust, not word counts." },
                    { "id": "d", "text": "It means the user is blocked from receiving emails for 60 minutes.", "correct": False, "feedback": "Incorrect. Negative weights do not block user accounts." }
                ],
                "explanation": "Negative weights act as trust boosters, pulling the cumulative spam score down away from the quarantine threshold."
            },
            {
                "id": "q13",
                "question": "Why are decision trees considered an example of 'Explainable AI' (XAI)?",
                "options": [
                    { "id": "a", "text": "Because they speak out loud in English using robotic voice synthesizers.", "correct": False, "feedback": "Incorrect. Explainability refers to model transparency, not audio speech." },
                    { "id": "b", "text": "Because every condition question, branch, and leaf node can be visually inspected and understood by human observers.", "correct": True, "feedback": "Correct! Decision trees are open and transparent, allowing humans to trace why every choice was made." },
                    { "id": "c", "text": "Because they are written in ancient Latin dictionaries.", "correct": False, "feedback": "Incorrect. Decision trees are modern computational logic structures." },
                    { "id": "d", "text": "Because computers automatically email their code to teachers every night.", "correct": False, "feedback": "Incorrect. Explainability is an architectural feature of the tree logic itself." }
                ],
                "explanation": "Explainable AI means the rationale behind every recommendation is visible and auditable, unlike opaque black-box neural networks."
            },
            {
                "id": "q14",
                "question": "If an autonomous surgical robot has an action threshold set at only 50%, what is the primary risk?",
                "options": [
                    { "id": "a", "text": "The robot might execute an irreversible medical procedure on a patient even when it is only 51% confident, risking severe patient harm.", "correct": True, "feedback": "Correct! Low thresholds in life-critical systems lead to reckless autonomous actions on ambiguous data." },
                    { "id": "b", "text": "The robot will operate too slowly and run out of electricity.", "correct": False, "feedback": "Incorrect. The danger of low thresholds is premature, unsafe action, not battery speed." },
                    { "id": "c", "text": "The hospital building will lose Wi-Fi connection.", "correct": False, "feedback": "Incorrect. Hospital networking is independent of algorithmic thresholds." },
                    { "id": "d", "text": "The robot will play loud music during surgery.", "correct": False, "feedback": "Incorrect. Thresholds govern surgical decisions, not entertainment media." }
                ],
                "explanation": "High-stakes domains demand extremely high certainty thresholds (e.g., 98%+) and mandatory human oversight to prevent harm."
            },
            {
                "id": "q15",
                "question": "How do e-commerce engines like Amazon use decision trees to suggest a cricket bat to a buyer of pads and gloves?",
                "options": [
                    { "id": "a", "text": "By checking sequential purchase history and complementary item bundles that historical athletes commonly require.", "correct": True, "feedback": "Correct! Decision trees evaluate prior purchases and sports context to recommend natural next-step companion items." },
                    { "id": "b", "text": "By randomly picking an item from the sports catalog that has the color blue.", "correct": False, "feedback": "Incorrect. Bundles are predicted through purchase association rules, not random color matching." },
                    { "id": "c", "text": "By asking the delivery driver what they personally enjoy playing.", "correct": False, "feedback": "Incorrect. Delivery personnel do not set automated recommendation logic." },
                    { "id": "d", "text": "By forcing all customers to buy cricket bats regardless of what they browsed.", "correct": False, "feedback": "Incorrect. Recommendations are personalized based on verified browsing and purchase clues." }
                ],
                "explanation": "Decision trees analyze complementary equipment relationships to offer helpful, high-probability companion items at checkout."
            }
        ],
        "resources": [
            {
                "title": "Interactive Visual Decision Tree Simulator",
                "type": "Interactive Web Tool",
                "url": "https://ai-olympiad.org/tools/decision-tree-simulator",
                "description": "An interactive digital sandbox allowing middle school students to construct custom multi-branch decision trees with drag-and-drop condition nodes and outcome cards."
            },
            {
                "title": "The Weighting Scale: How Recommendation Engines Score Interests",
                "type": "Educational Video & Explainer",
                "url": "https://ai-olympiad.org/learn/recommendation-weights",
                "description": "A visual breakdown explaining how e-commerce and streaming services calculate affinity weights and confidence match percentages for young learners."
            },
            {
                "title": "Human-in-the-Loop AI Ethics & Safety Handbook",
                "type": "Student Reference Guide",
                "url": "https://ai-olympiad.org/guides/hitl-safety-handbook.pdf",
                "description": "A comprehensive introductory guide discussing why life-critical systems in medicine, aviation, and law require human verification and safe failure modes."
            },
            {
                "title": "Spam Filter Laboratory: Analyzing Email Headers & Clues",
                "type": "Classroom Activity Sheet",
                "url": "https://ai-olympiad.org/worksheets/spam-detective-lab.pdf",
                "description": "A printable hands-on worksheet where students dissect mock email headers to identify red-flag domain mismatches, phishing links, and keyword weights."
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

    # Ensure output directory exists
    os.makedirs(os.path.dirname(target_path), exist_ok=True)

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Generated lesson successfully at {target_path}")

if __name__ == "__main__":
    build_lesson()
