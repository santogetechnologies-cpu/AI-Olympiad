# -*- coding: utf-8 -*-
"""
Full Generator for middle-class6-ch6-l1.json
Chapter 6 • Lesson 1: Protect Your Data
Mascot: Algo
Permissions audit (flashlight app wanting contacts), 2FA, passphrases, free app data tracking, Wi-Fi security.
"""

import json
import os
import sys

def build_lesson():
    target_path = "public/content/middle/middle-class6-ch6-l1.json"
    
    data = {
      "lessonId": "l1",
      "title": "Protect Your Data",
      "level": "middle",
      "class": "class6",
      "classNumber": 6,
      "chapter": "ch6",
      "chapterNumber": 6,
      "chapterTitle": "Responsible AI",
      "chapterTheme": "CARE",
      "lessonNumber": 1,
      "lessonTitle": "Protect Your Data",
      "filename": "middle-class6-ch6-l1.json",
      "mascot": {
        "name": "Algo",
        "emoji": "🧠🤖",
        "personality": "Vigilant, friendly, cyber-smart protector who teaches Class 6 students how to lock their digital front doors, audit suspicious app permissions, and build unbreakable account fortresses!",
        "catchphrase": "Your data is your digital treasure; never hand the keys to a flashlight app!",
        "voiceStyle": "Alert, warm, empowering, articulate, and friendly cybersecurity mentor voice"
      },
      "metadata": {
        "duration": "45 minutes",
        "ageGroup": "11-12 years",
        "difficulty": "intermediate",
        "totalWords": 12000,
        "version": "1.0",
        "lastUpdated": "2026-10-13",
        "tags": [
          "data privacy",
          "app permissions",
          "permissions audit",
          "flashlight app contacts",
          "two factor authentication",
          "strong passphrases",
          "data brokers",
          "free app tracking",
          "home wifi security"
        ],
        "prerequisites": ["middle-class6-ch5-l2.json"],
        "nextLesson": "middle-class6-ch6-l2.json"
      },
      "content": {
        "introduction": {
          "algoWelcome": {
            "dialog": "Hello, digital guardians! 🧠🤖 I am Algo, your cybersecurity and digital safety companion! Imagine you moved into a brand-new house with a sturdy front door and shiny brass locks. Would you hand a copy of your house keys to a random stranger walking down the street who offered you a free plastic toy? Of course not! That sounds completely crazy! But guess what? Millions of middle school students do the EXACT same thing on their smartphones every single day! When you download a free flashlight app or an offline calculator, and it pops up asking: 'Allow access to your Contacts, Camera, and GPS Location?', most people blindly tap 'ALLOW' just to start playing! Why does a flashlight app want to read your family phonebook? That is a massive RED FLAG! 🚩 Today, we are going to learn how to lock our digital doors, audit app permissions, build unbreakable passphrases, and defend our personal data like true cyber champions! Put on your detective badge and let's protect our treasure! 🛡️📱🔐",
            "toastMessage": "🛡️ Welcome to Lesson 1! Tap START to audit your digital privacy with Algo! 🧠✨",
            "animationHint": "Algo floats into view holding a holographic digital shield and a magnifying glass, scanning a smartphone app permissions list and flashing green checkmarks and red caution sirens"
          },
          "story": {
            "title": "The Mystery of the Noisy Flashlight: How Kabir Caught a Digital Spy 📱🔦🕵️‍♂️",
            "totalWords": 1340,
            "content": """It was 8:30 PM on a Friday evening at Kabir's house.
Outside, a sudden thunderstorm had knocked out the power lines in the neighborhood.
The ceiling fans stopped spinning. The lights went black: CLICK!
Darkness swallowed the living room.

'Kabir, do we have a torch?' his mother called out from the kitchen, where she was trying to locate the candle box in the pantry.
'Don't worry, Mom! I'll download a flashlight app on my phone!' eleven-year-old Kabir replied.

Kabir unlocked his smartphone.
He opened the app store and typed 'Flashlight'.
Hundreds of search results popped up.
Kabir scrolled past the official system settings and tapped the first colorful icon he saw: 'Super Ultra Bright Neon Flashlight 3D — 100% FREE!' 🌟🔦
He clicked 'INSTALL'.

Three seconds later, the download finished. Kabir tapped 'OPEN'.
Immediately, a large pop-up box covered his screen:
*'Super Flashlight requires the following permissions to function:
1. Access your Contacts & Phonebook
2. Access your Precise GPS Location (Always)
3. Access your Microphone & Audio Recording
4. Access your Photos & Media Storage'*

[IMAGE_PLACEHOLDER: Smartphone app permissions modal showing flashlight app requesting suspicious contacts access]

Kabir was in a hurry. The room was pitch dark. His thumb hovered over the big green button: 'ALLOW ALL PERMISSIONS'.
He was about to press it when a sharp, bright blue hologram chimed from his smartwatch:
BEEP-BEEP-ALARM! 🚨⚡
A glowing icon of Algo popped onto his watch screen!

'HALT, KABIR!' Algo's voice warned in a firm, urgent whisper. 'Do not press Allow! Sensor scan indicates a catastrophic privacy breach!'

Kabir blinked in surprise:
'Algo? Why are you sounding an alarm? It's just a flashlight! I need light so my mom doesn't bump her toe in the kitchen!'

Algo asked a very simple, calm question:
'Kabir, what physical component on your phone produces light when you turn on a flashlight?'

Kabir thought for a moment:
'The little LED flash bulb on the back next to the camera lens.' 💡

'Correct!' Algo replied. 'Now answer this: Does that tiny LED light bulb need to know your best friend Aarav's home phone number to turn on?'
'No...' Kabir said slowly.

'Does the LED light bulb need to track your GPS coordinates to know which street you are walking on?'
'No...'

'Does the LED light bulb need to listen to your microphone while you talk to your grandmother?'
'NO!' Kabir gasped, his eyes going wide. 'Why on earth is it asking for my contacts and microphone then?!'

Algo's digital screen turned amber:
'Because, Kabir, that app is NOT really a flashlight company!
That app is an undercover DATA BROKER SPY! 🕵️‍♂️💰
The flashlight feature is just the cheap piece of cheese inside a mousetrap!
Once you tap Allow, that app copies every phone number in your contact list—your parents, your cousins, your school teachers.
It tracks your GPS location everywhere you walk.
And it silently bundles that data into a digital profile and sells it to shady advertising networks and telemarketers for money!
That is why the app is 'free'! You are not paying with money; you are paying with your family's private data!' 😱

Kabir's hand pulled back from the screen as if the phone was on fire.
'That is terrifying! What should I do?'

'Tap DENY on every single permission!' Algo instructed.
'Or even better: uninstall this spy app immediately! Your phone already has a built-in flashlight switch in the swipe-down quick settings menu that requires zero internet and zero permissions!'

Kabir deleted the shady flashlight app in two seconds.
He swiped down from the top of his screen and tapped the phone's native flashlight icon:
CLICK! 💡
A brilliant beam of clean white light flooded the living room, guiding his mother safely to the candle drawer.

Kabir sat on the sofa by candlelight, looking at his smartphone with a brand-new sense of awe and caution:
'Algo, how many other apps on my phone have been secretly spying on me?'

Algo smiled with twinkling blue eyes:
'That, my young cyber detective, is why we are going to run a full Mobile Permissions Audit tonight! Grab your magnifying glass—it's time to take back your privacy!' 🛡️🔍👑""",
            "images": [
              {
                "id": "intro-ch6-l1-1",
                "src": "/content/middle/images/ch6-l1/flashlight-permissions-modal.png",
                "alt": "Smartphone app permissions modal showing flashlight app requesting suspicious contacts access",
                "caption": "Red Flag Alert: Why would an offline flashlight need access to your private phonebook and location? 🚩📱"
              },
              {
                "id": "intro-ch6-l1-2",
                "src": "/content/middle/images/ch6-l1/data-broker-infographic.png",
                "alt": "Infographic showing how free apps harvest location and contacts to sell to third-party ad networks",
                "caption": "If an app is free and requests excessive permissions, your personal data is the product being sold! 🕵️‍♂️💰"
              }
            ]
          },
          "learningObjectives": [
            {
              "id": "obj-ch6-l1-1",
              "emoji": "📱",
              "text": "Master the Smartphone Permissions Audit!",
              "childFriendlyExplanation": "Learn how to inspect app permissions (Camera, Mic, GPS, Contacts) and spot suspicious red flags like flashlight apps demanding contacts! 🚩"
            },
            {
              "id": "obj-ch6-l1-2",
              "emoji": "🕵️‍♂️",
              "text": "Unmask the 'Free' App Illusion and Data Brokers!",
              "childFriendlyExplanation": "Understand how free games monetize your digital footprint by harvesting location tracking data for targeted ad networks! 🎮💰"
            },
            {
              "id": "obj-ch6-l1-3",
              "emoji": "🔐",
              "text": "Construct Unbreakable Multi-Word Passphrases!",
              "childFriendlyExplanation": "Discover why short passwords get cracked in milliseconds, while four-word passphrases take supercomputers billions of years to guess! 🗝️"
            },
            {
              "id": "obj-ch6-l1-4",
              "emoji": "🛡️",
              "text": "Activate Two-Factor Authentication (2FA) Deadbolts!",
              "childFriendlyExplanation": "Learn how 2FA adds a second verification shield to your school email and gaming accounts, stopping password thieves cold! 📱🔒"
            },
            {
              "id": "obj-ch6-l1-5",
              "emoji": "🏠",
              "text": "Fortify Your Home Wi-Fi Network & Default Router Passwords!",
              "childFriendlyExplanation": "Safeguard your home wireless network from unauthorized snooping by changing factory default router credentials and enabling WPA3 encryption! 📡"
            }
          ],
          "algoGuidance": {
            "title": "Algo's Digital Shield Oath 🧠📜",
            "content": "Repeat after me: 'My personal data is my private treasure! I will never give flashlight apps the keys to my phonebook! I will audit my permissions, lock my accounts with passphrases and 2FA, and guard my digital perimeter!' When you practice cyber hygiene, you become an untouchable fortress in the digital age! 🛡️🔐🌟",
            "toastPrompt": "Audit permissions: Deny contacts and location access for the offline calculator."
          },
          "toastGuidance": {
            "tap_prompt": "Audit permissions: Deny contacts and location access for the offline calculator.",
            "great_job": "Permission denied! Offline tools do not require access to your private phonebook.",
            "try_again": "Suspicious request: A flashlight app never requires access to location or contacts."
          }
        },
        "sections": [
          {
            "sectionId": "section1",
            "sectionNumber": 1,
            "title": "The App Permissions Audit: Why Does a Flashlight Need Your Phonebook? 📱🔦🚩",
            "emoji": "📱",
            "totalWords": 2750,
            "algoIntro": "Welcome to Section 1, cyber defenders! 🧠 Every time you install an app on your smartphone, tablet, or laptop, that app asks for 'Permissions'. Permissions are the digital keys to your private life! Today, we uncover how permissions work, how shady apps exploit them, and how to conduct a ruthless permissions audit! Let's inspect the perimeter! 📱🔑✨",
            "toastGuidance": {
              "tap_prompt": "Audit permissions: Deny contacts and location access for the offline calculator.",
              "great_job": "Permission denied! Offline tools do not require access to your private phonebook.",
              "try_again": "Suspicious request: A flashlight app never requires access to location or contacts."
            },
            "content": """Think of your smartphone as a private five-room house where you live. 🏠📱
Inside this house:
- Room 1 is your **CONTACTS BOOK**: it contains the personal phone numbers, home addresses, and emails of your mother, father, grandparents, and best friends. 📒
- Room 2 is your **PHOTO GALLERY**: it contains photos of your birthday parties, family vacations, report cards, and private moments. 📸
- Room 3 is your **MICROPHONE & CAMERA**: an open window through which someone could listen to your living room conversations or watch your bedroom. 🎙️👁️
- Room 4 is your **GPS LOCATION SENSOR**: a real-time satellite beacon that broadcasts the exact street, school building, and park bench where you are standing right now! 📍
- Room 5 is your **STORAGE DRIVE**: containing your downloaded school worksheets, diaries, and private documents. 📁

Now, imagine someone knocks on your front door.
It is an electrician you called to fix a light bulb in the ceiling. 💡
The electrician stands on your porch and says:
*'Hello! To screw in this light bulb, you must first give me the keys to your photo album, your family telephone directory, and a live microphone feed from your bedroom!'*

What would your parents do?
They would slam the door in the electrician's face and call the police! 🚨🚪
Why? Because changing a light bulb has NOTHING to do with reading private phone numbers!

YET MILLIONS OF PEOPLE DO THIS WITH SMARTPHONE APPS EVERY SINGLE DAY! 📱😱

---

### WHAT ARE APP PERMISSIONS? (THE GATEKEEPER SYSTEM) 🔑🛡️
When software engineers build an operating system like Android or Apple iOS, they build a security wall (called a **SANDBOX**) around each app.
By default, when an app is installed, it is trapped inside its own sandbox.
It cannot touch your camera. It cannot read your text messages. It cannot see where you are.

To step outside its sandbox, the app must ask **YOU** for permission!
When the pop-up appears on screen:
*'Allow Calculator to access your Contacts?'*
The phone's operating system is literally asking you:
*'Should I hand the keys to Room 1 over to this stranger?'*

---

### THE GOLDEN AUDIT RULE: THE PRINCIPLE OF LEAST PRIVILEGE ⚖️🔍
In computer security, there is an ancient and unbreakable rule called **THE PRINCIPLE OF LEAST PRIVILEGE**:
*An app should ONLY be given the absolute minimum permissions strictly necessary to perform its advertised job!*

Let's test this rule against real-world apps:

| App Type | What Does It Actually Do? | Legitimate Necessary Permission | SUSPICIOUS RED FLAG PERMISSION! 🚩 |
| :--- | :--- | :--- | :--- |
| **Flashlight App** 🔦 | Turns on the rear LED light bulb | Camera (hardware control of flash) | **Contacts, GPS Location, Microphone!** 🚩 |
| **Offline Calculator** 🧮 | Adds, subtracts, and multiplies numbers | NONE! (Math runs locally in CPU) | **Contacts, Photos, Internet, Location!** 🚩 |
| **Maps & Navigation** 🗺️ | Gives driving directions | GPS Location (While Using App) | **Contacts, Text Messages, Microphone!** 🚩 |
| **Camera & Photo Filter** 📸 | Takes photos and applies funny stickers | Camera, Photo Storage | **Contacts, SMS Messages, Phone Calls!** 🚩 |
| **Voice Recorder** 🎙️ | Records school lectures and voice notes | Microphone, Storage | **Precise GPS Location, Contacts!** 🚩 |

Look at the third column versus the fourth column!
Notice the pattern?
Why would an offline calculator need to read your contacts?
It doesn't!
If a calculator asks to read your contacts, it is NOT just doing math.
It is harvesting your phonebook to sell to telemarketers who will call your parents during dinner to sell car insurance! 📞🍕😤

[IMAGE_PLACEHOLDER: Smartphone app permissions modal showing flashlight app requesting suspicious contacts access]

---

### THE THREE TIERS OF PERMISSION ACCESS: ALWAYS VS. WHILE IN USE 🚦
Modern smartphones give you granular choices when an app asks for sensitive data like Location or Microphone:

1. **'Allow Only While Using the App' (THE SAFE DEFAULT) 🟢**
   This means the app can only check your location when you have the app open on your screen. The moment you press the home button, the door slams shut!
2. **'Ask Every Time' (THE HIGH-SECURITY CHOICE) 🟡**
   Every single time the app wants to use the camera or microphone, a prompt appears. You have 100% control.
3. **'Allow All the Time' (THE HIGH-RISK DANGER ZONE) 🔴**
   The app can track your location in the background 24 hours a day, even while your phone is asleep in your pocket, and upload your movements to foreign servers!
   **NEVER give 'Allow All the Time' location permissions to games or utilities!** 🚫

---

### HOW TO CONDUCT A 5-MINUTE PERMISSIONS AUDIT ON YOUR PHONE 📱🕵️‍♂️
Here is Algo's step-by-step audit mission:
1. Open your phone's **SETTINGS** menu. ⚙️
2. Scroll to **PRIVACY & SECURITY** -> tap **PERMISSION MANAGER** (or App Permissions). 🛡️
3. Tap on **LOCATION**: Look at the list of apps. If you see an offline puzzle game or a wallpaper app with location access, tap it and switch it to **DON'T ALLOW**!
4. Tap on **MICROPHONE**: If you see a shopping app or flashlight app with mic access, switch it to **DON'T ALLOW**!
5. Tap on **CONTACTS**: Revoke access from every game, calculator, and photo editor!

Remember our toast guidance:
- `tap_prompt`: *"Audit permissions: Deny contacts and location access for the offline calculator."*
- `great_job`: *"Permission denied! Offline tools do not require access to your private phonebook."*
- `try_again`: *"Suspicious request: A flashlight app never requires access to location or contacts."*

Every permission you revoke is a deadbolt locked on your digital front door! 🔐🏠👑""",
            "deepDiveStory": {
              "title": "The Strange Case of the Geometry Homework App 📐🕵️‍♂️",
              "totalWords": 640,
              "content": """It was Tuesday afternoon in Class 6-C.
The math teacher had assigned 15 complex geometry angle problems.
Twelve-year-old Rohan was struggling to calculate complementary angles.
A classmate whispered to him: 'Download AngleMaster 3D from the app store! It has an automated protractor that measures angles using your phone!'

Rohan downloaded the app.
When he opened it, a permission prompt flashed:
*'AngleMaster requests permission to access: 1. Camera, 2. Contacts, 3. Call Logs, 4. Precise GPS Location.'*
Rohan paused.
He remembered Algo's lesson on the Principle of Least Privilege:
'Why does a digital protractor need my call logs and contacts?' 🤔

Rohan tapped 'DENY' on Contacts.
He tapped 'DENY' on Call Logs.
He tapped 'DENY' on Location.
He only allowed Camera (which made sense, because the app needed to look at the paper worksheet).

Guess what happened?
A big red error screen flashed:
*'FATAL ERROR: Permissions denied! AngleMaster cannot function without Contacts and Call Logs access. App closing!'*
And the app crashed! 💥

Rohan was stunned.
He opened the app review section on the app store and filtered by '1-Star Reviews'.
There, dozens of cybersecurity warnings were posted by angry parents:
*'WARNING! This app is spyware! After installing, my contacts received spam scam messages from international numbers!'*
*'DO NOT DOWNLOAD! Harvests phone numbers and sells them to spam call centers!'*

Rohan immediately uninstalled the app and reported it to the app store security team.
He took out his physical plastic protractor, sat down with his textbook, and solved the geometry problems with his own brain and pencil.
The next morning, his math teacher praised him:
'Rohan, three students downloaded a scam geometry app yesterday and had their family numbers compromised. You were the only one smart enough to audit the permissions and protect your privacy!' 🥇📐🛡️"""
            },
            "examples": [
              {
                "id": "ex-ch6-l1-1",
                "title": "The Suspicious Permissions Audit Checklist 📋",
                "app": "Offline Calculator 🧮",
                "demandedPermissions": "Contacts, Location, Storage",
                "action": "DENY IMMEDIATELY! Offline math calculations require zero external personal data.",
                "rule": "If an app refuses to function without unnecessary permissions, delete it!"
              },
              {
                "id": "ex-ch6-l1-2",
                "title": "The Three-Tier Location Rule 🚦",
                "safe": "Allow Only While Using App (Navigation apps)",
                "safer": "Ask Every Time (Ride-sharing, food delivery)",
                "dangerous": "Allow All the Time (Games, wallpapers, calculators — REVOKE!)"
              }
            ],
            "keyPoints": [
              "App permissions are digital keys that give software access to your private camera, microphone, GPS, and contacts 🔑",
              "The Principle of Least Privilege: Only grant the absolute minimum permissions necessary for an app's core function ⚖️",
              "Flashlight apps, calculators, and offline games requesting contacts or location are RED FLAGS indicating data harvesting 🚩",
              "Regularly audit your phone's Permission Manager in Settings and revoke background access from non-essential apps 🛡️"
            ],
            "miniQuiz": {
              "question": "An offline calculator app requests access to your phone's contacts and GPS location. What should you do?",
              "options": [
                { "id": "a", "text": "Allow all permissions because more permissions make the calculator do math faster ➕", "correct": False, "feedback": "Permissions have nothing to do with math calculation speed!" },
                { "id": "b", "text": "DENY the permissions immediately! An offline calculator never requires access to your private phonebook or location! 🧮🚫", "correct": True, "feedback": "🌟 EXACTLY! Offline tools do not require access to your private data—it's a red flag!" },
                { "id": "c", "text": "Give the phone to a stranger on the bus to fix it", "correct": False, "feedback": "Never hand your device to strangers!" }
              ]
            }
          },
          {
            "sectionId": "section2",
            "sectionNumber": 2,
            "title": "The 'Free' Game Illusion: If You Aren't Paying, YOU Are the Product! 🎮🕵️‍♂️💰",
            "emoji": "🎮",
            "totalWords": 2850,
            "algoIntro": "BEEP BOOP! 🧠 Welcome to Section 2! Have you ever wondered why game developers spend three years writing millions of lines of code, designing 3D graphics, hiring voice actors, and maintaining cloud servers—only to put the game on the app store for ZERO RUPEES? Are they just generous digital philanthropists? Let's pull back the curtain on the multi-billion-dollar Data Broker industry! 🎮🕵️‍♂️💸",
            "toastGuidance": {
              "tap_prompt": "Audit permissions: Deny contacts and location access for the offline calculator.",
              "great_job": "Permission denied! Offline tools do not require access to your private phonebook.",
              "try_again": "Suspicious request: A flashlight app never requires access to location or contacts."
            },
            "content": """Let us ask a fundamental economic question that every middle school student must learn:
**HOW MUCH DOES IT COST TO RUN A MODERN MOBILE GAME?** 🕹️💻
- A team of 10 software engineers costs over 50 lakh rupees a year in salaries.
- High-speed cloud servers to host multiplayer matches cost thousands of dollars every month.
- Graphic designers, sound engineers, and office rent cost money.

So when you browse the app store and see a flashy 3D multiplayer game that says:
**'FREE TO DOWNLOAD! FREE TO PLAY! NO PAYMENT REQUIRED!'**
You have to ask yourself:
*Who is paying the electricity bill? Who is paying the programmers?*

There is an old, profound rule of the modern internet that every digital citizen should engrave in their mind:
**"IF YOU ARE NOT PAYING FOR THE PRODUCT, YOU ARE NOT THE CUSTOMER — YOU ARE THE PRODUCT BEING SOLD!"** 📦🏷️😱

---

### MEET THE INVISIBLE MIDDLEMEN: DATA BROKERS 🕵️‍♂️📊
Who is buying you?
Enter the world of **DATA BROKERS** and **ADVERTISING NETWORKS**!
A Data Broker is a corporation that exists solely to collect, aggregate, package, and sell personal information about billions of human beings.

They don't care about your high score in *Candy Blast* or *Subway Runner*.
What they care about is your **DIGITAL FOOTPRINT**:
1. **Your Exact Daily Route (GPS Tracking):**
   What time do you leave home in the morning? Which school do you attend? Which tuition center do you visit on Thursdays? Which playground do you visit on weekends?
2. **Your Social Graph (Contacts & Bluetooth):**
   Whose phones are sitting within 3 meters of your phone during recess? Who are your best friends?
3. **Your Device Fingerprint:**
   What exact model of phone do you use? What is your battery level? What Wi-Fi networks do you connect to?
4. **Your Demographic Profile:**
   Estimated age, gender, favorite fast-food snacks, and gaming habits.

---

### HOW FREE GAMING APPS HARVEST YOUR DATA FOR AD NETWORKS 🎮📡
Let's trace how a free gaming app turns your playtime into cold, hard cash:
1. **The SDK Trove:** When game developers build a free game, they embed tiny pre-built software packages called **Advertising SDKs** (Software Development Kits) from ad networks.
2. **The Background Siphon:** While you are jumping over trains or blasting colored gems, the SDK is working in the background. It checks your GPS location every 30 seconds. It checks your IP address.
3. **The Dossier Auction:** The SDK transmits this data to a cloud server:
   *'User #849201 is an 11-year-old in South Bengaluru who visits a badminton academy every Tuesday at 5:00 PM and plays games for 45 minutes after school.'*
4. **Targeted Ad Bidding (Real-Time Bidding):**
   An athletic shoe brand or a fast-food chain wants to advertise badminton rackets or cheesy burgers to kids in South Bengaluru.
   In less than 50 milliseconds—faster than a human can blink—an automated auction takes place!
   The shoe brand pays 2 rupees to display an unskippable video ad on your screen!

Have you ever noticed that after you walk past a pizza shop with your phone in your pocket, twenty minutes later you open a free game and see an advertisement for THAT EXACT PIZZA SHOP? 🍕👀
You might whisper to your friends: *'My phone is reading my mind!'*
No, your phone is NOT reading your mind!
Your free game was simply tracking your GPS location and selling your physical coordinates to the local pizza ad network!

---

### THE HIDDEN COSTS: BATTERY DRAIN, LAG, AND PRIVACY LOSS 🔋📉
Giving free apps access to background location tracking doesn't just erode your privacy—it physically degrades your phone!
- **Battery Drain:** Your phone's GPS chip requires substantial battery power. When three different free games are constantly pinging GPS satellites in the background, your battery drains twice as fast!
- **Data Plan Usage:** Those apps are constantly uploading data packets over your mobile internet plan.
- **Permanent Digital Dossiers:** Information collected about you today can be stored in corporate databases for decades, linked to your phone number and email address!

---

### THREE GOLDEN DEFENSES AGAINST THE 'FREE' APP TRAP 🛡️🎮

#### Defense 1: The Airplane Mode & Offline Rule ✈️
If you are playing a single-player puzzle game, offline runner, or coloring app, turn off Wi-Fi and mobile data, or switch your phone to **AIRPLANE MODE**!
Without an internet connection, the game cannot load ad trackers, cannot upload telemetry data, and cannot interrupt you with annoying video ads!

#### Defense 2: Deny Location Permissions to All Games 📍🚫
No puzzle game, racing game, or platformer requires your real-world GPS coordinates to let you steer a car or jump over obstacles! Set location permissions for games to **NEVER ALLOW**!

#### Defense 3: The App Diet (Delete Unused Clutter) 🧹
If you haven't played a game in two weeks, **UNINSTALL IT**!
Unused apps sitting on your home screen continue running background services and collecting diagnostic data. Keep your device lean, clean, and secure! 🧼📱✨""",
            "deepDiveStory": {
              "title": "The Case of the Creepy Shoe Commercial 👟🕵️‍♂️",
              "totalWords": 620,
              "content": """Ten-year-old Meera loved running track for her school athletics team.
On Saturday morning, Meera and her father visited a specialty running shoe store on Brigade Road to try on blue marathon sneakers.
Meera tried on three pairs of blue lightweight racing shoes, walked around the shop carpet, and decided to think about it before buying.
Meera did not type a single word into Google. She did not take any photos. Her phone stayed zipped inside her jacket pocket the entire time.

That afternoon at home, Meera opened her favorite free mobile game, *Galaxy Gem Blast*.
Between Level 14 and Level 15, a video ad popped up on screen.
Meera's jaw dropped in shock:
The ad was a video commercial for the EXACT brand of blue running shoes she had tried on three hours earlier, offering a 10% discount at the Brigade Road store! 👟😲

Meera ran into the study room in a panic:
'Algo! My phone is psychic! It read my thoughts! How did it know I was looking at blue running shoes on Brigade Road?!'

Algo chuckled with gentle digital wisdom:
'Meera, your phone is not psychic, and it did not read your thoughts. Open the permissions settings for *Galaxy Gem Blast* right now!'
Meera opened the Settings menu.
There it was:
*'Galaxy Gem Blast: Location Permission — ALLOWED ALL THE TIME.'* 📍🔴

Algo explained:
'When you downloaded *Galaxy Gem Blast* last month, you granted it background GPS access.
While you were trying on shoes, the game's advertising SDK tracked your GPS coordinates standing inside that specific athletic shoe store for 25 minutes.
The ad network instantly categorized your device ID under 'Interested in running shoes'.
When you opened the game at home, the shoe store's automated ad campaign bought your screen space for 50 paise!'

Meera shivered: 'That feels so creepy! It feels like an invisible spy followed me into the store!'
Algo nodded: 'It IS an invisible spy. Now change that permission to 'DON'T ALLOW'!'
Meera revoked the location access instantly.
From that day forward, Meera never allowed another free game to track her physical steps in the real world! 🛡️🏃‍♀️👑"""
            },
            "examples": [
              {
                "id": "ex-ch6-l1-3",
                "title": "The 'Free' App Monetization Cycle 🔄",
                "step1": "User downloads free game with zero upfront payment 🎮",
                "step2": "Game demands background GPS and device tracking permissions 📍",
                "step3": "Ad network builds digital profile of user's habits and physical locations 🕵️‍♂️",
                "step4": "Advertisers pay the developer to show hyper-targeted local ads 💰"
              },
              {
                "id": "ex-ch6-l1-4",
                "title": "Airplane Mode Game Hack ✈️",
                "benefit": "Playing single-player games offline eliminates ad interruptions, stops background telemetry, and doubles battery life!"
              }
            ],
            "keyPoints": [
              "Free apps are funded by advertising networks and data brokers who harvest your digital footprint 💰",
              "Data brokers collect GPS routes, device identifiers, and usage patterns to build targeted advertising dossiers 🕵️‍♂️",
              "Hyper-targeted ads after visiting real-world stores are the result of background location tracking, not 'mind reading' 📍",
              "Protect yourself by disabling location access for all games, playing offline in Airplane Mode, and deleting unused apps 🛡️"
            ],
            "miniQuiz": {
              "question": "Why did a mobile game show an advertisement for a shoe store after the player visited the shop?",
              "options": [
                { "id": "a", "text": "The phone has magical psychic powers that read human brain waves 🔮", "correct": False, "feedback": "Phones do not possess psychic powers!" },
                { "id": "b", "text": "The game was tracking the player's physical GPS location in the background and sold that coordinate data to ad networks! 📍🕵️‍♂️", "correct": True, "feedback": "🌟 EXACTLY! Background GPS tracking allows ad networks to serve hyper-local targeted ads!" },
                { "id": "c", "text": "The shoe store manager hacked the phone with a laser", "correct": False, "feedback": "No laser hacking—just standard ad tracking SDKs!" }
              ]
            }
          },
          {
            "sectionId": "section3",
            "sectionNumber": 3,
            "title": "Fortifying Your Accounts: Passphrases, 2FA, and Wi-Fi Defense! 🛡️🔐🔑",
            "emoji": "🛡️",
            "totalWords": 2850,
            "algoIntro": "BEEP BOOP! 🧠 Welcome to Section 3: The Digital Fortress! Locking app permissions stops data leaks from the inside; now we must build unbreakable fortress walls to defend against attackers from the OUTSIDE! Today, we master the three pillars of account defense: MULTI-WORD PASSPHRASES, TWO-FACTOR AUTHENTICATION (2FA), and HOME WI-FI SECURITY! Grab your armor! 🛡️🔐🏰✨",
            "toastGuidance": {
              "tap_prompt": "Audit permissions: Deny contacts and location access for the offline calculator.",
              "great_job": "Permission denied! Offline tools do not require access to your private phonebook.",
              "try_again": "Suspicious request: A flashlight app never requires access to location or contacts."
            },
            "content": """Let us begin with a sobering reality check about computer power in the 21st century:
When an attacker tries to break into your school email, gaming account, or social media profile, they do NOT sit at a keyboard typing guesses one by one like a human. ⌨️😴
They use **BRUTE-FORCE AUTOMATION SCRIPTS**! 🤖⚡
A modern graphics card or automated cracking rig can test **OVER 100 BILLION PASSWORD COMBINATIONS PER SECOND**!

Now, let us examine the passwords that most middle school students use:
- `password123`
- `football2024`
- `ilovepizza`
- `aarav123`
- Their dog's name or their birthday (`15august2012`)

How long does it take a brute-force computer to crack `password123`?
**LESS THAN 0.0002 MILLISECONDS!** ⏱️💥
It takes longer to blink your eye than it takes for a bot to crack your predictable password!

THIS IS WHY WE MUST ABANDON SHORT PASSWORDS AND ADOPT THE PASSPHRASE! 🗝️🛡️

---

### THE PASSPHRASE REVOLUTION: LENGTH BEATS COMPLEXITY! 📏💪
For years, websites forced users to create short, annoying passwords like `P@$$w0rd!`.
They are impossible for humans to remember, yet surprisingly easy for computers to crack because they are only 8 or 9 characters long!

The secret of cybersecurity mathematics is:
**LENGTH MATTERS FAR MORE THAN COMPLEXITY!**

Instead of a short, scrambled password, use a **FOUR-WORD PASSPHRASE**:
Pick four completely random, unrelated, concrete words that paint a funny picture in your mind, separated by spaces or symbols!

Look at this example:
`BlueCactusJumpsFast!7` 🌵🏃‍♂️💨
- It has 21 characters!
- It is super easy for your human brain to visualize (a blue cactus running in sneakers!).
- How long would it take a supercomputer trying 100 billion guesses a second to crack that 21-character passphrase?
**OVER 400 TRILLION YEARS!** ⏳🌌
That is longer than the age of the entire universe!

[IMAGE_PLACEHOLDER: Visual guide contrasting weak predictable passwords with strong passphrases]

---

### TWO-FACTOR AUTHENTICATION (2FA): THE DIGITAL DEADBOLT 🚪🔐📱
Even with an unbreakable passphrase, what happens if a website where you have an account suffers a server breach, or you accidentally enter your passphrase into a sneaky phishing link?
If your password is stolen, is your account doomed?

NOT IF YOU HAVE TWO-FACTOR AUTHENTICATION (2FA) ACTIVATED! 🛡️✨

#### What is Two-Factor Authentication?
Think of your front door:
- Factor 1: The standard brass key lock (Something you **KNOW** — your password).
- Factor 2: A biometric fingerprint scanner or a secondary heavy steel deadbolt that only opens with a physical token in your pocket (Something you **HAVE** — your phone).

Even if a burglar steals your brass key, can they enter your house?
**NO!** Because they don't have the secondary deadbolt token!

#### How 2FA Works in Real Life:
1. You go to your school email portal or gaming account. You enter your username and passphrase.
2. The server says: *'Passphrase correct! But before I open the door, I am sending a 6-digit one-time code to Kabir's registered mobile device!'* 📲
3. A notification pops up on your phone: `Verification Code: 492-817`.
4. You type `492-817` into the computer screen, and your portal opens!

[IMAGE_PLACEHOLDER: Two-factor authentication verification prompt on mobile screen]

Now imagine a hacker in another country stole your password:
They type your password on their computer.
The screen says: *'Enter the 6-digit code sent to Kabir's phone.'*
The hacker does NOT have your phone! They are thousands of miles away!
They are completely locked out! The account is 100% safe! 🛡️👑

**Every Class 6 student should turn on 2FA on their school Google/Microsoft account, gaming accounts (Roblox, Minecraft, Steam), and personal email!**

---

### FORTIFYING YOUR HOME WI-FI: THE SILENT INTRUSION 📡🏠
The final fortress wall is right in your living room: **YOUR HOME WI-FI ROUTER**!
Every smart TV, laptop, phone, and tablet in your house connects to the internet through that little plastic box with blinking lights.

Many families make two critical mistakes with their home Wi-Fi:
1. **Keeping the Factory Default Admin Password:**
   Almost every router comes out of the box with the administrator login set to:
   Username: `admin` | Password: `admin` (or `password`).
   If a neighbor or someone sitting in a car outside connects to your Wi-Fi, they can type `192.168.1.1` into a web browser, log in with `admin/admin`, and control your entire home network!
2. **Using Weak WEP Encryption:**
   Old routers used outdated security protocols that can be cracked in minutes with free tools.

#### The Home Wi-Fi Defense Checklist:
- **Change the Admin Password:** Have a parent log into the router settings and change the administrator password to a strong passphrase!
- **Enable WPA3 (or WPA2-AES) Encryption:** Ensure your Wi-Fi encryption is set to modern standards.
- **Set a Strong Wi-Fi Passphrase:** Never use your street address or phone number as the Wi-Fi password.
- **Create a 'Guest Network':** Set up a separate guest network for smart TVs and visitors so your family's personal computers stay on an isolated, secure channel! 📡🛡️✨""",
            "deepDiveStory": {
              "title": "The Great School Email Lockout Prank That Failed 🏫🔐🛡️",
              "totalWords": 630,
              "content": """It was the week before the Class 6 student council elections at National Public School.
Maya was running for Student Council President.
Her campaign speeches, poster designs, and slides were stored in her school Google Workspace drive.

In the computer lab during Friday afternoon lunch break, a mischievous classmate named Kevin wanted to play a prank.
Kevin had peeked over Maya's shoulder in class two weeks earlier and noticed her password was predictable: `MayaSoccer2024!`.
When the lab was empty, Kevin sat down at Terminal 4.
He typed Maya's school email address: `maya.sharma@nps.edu`.
He entered the password: `MayaSoccer2024!`.
Kevin smirked, ready to delete her presentation slides as a prank.

He pressed ENTER.
Kevin waited for the inbox to open.
BUT LOOK AT WHAT POPPED UP ON THE SCREEN INSTEAD!
A giant red shield flashed:
*'2-FACTOR AUTHENTICATION REQUIRED!
A 6-digit verification code has been dispatched to Maya's registered security device.
Enter code within 60 seconds to proceed.'* 📲🛡️

Across the courtyard, Maya was sitting on a stone bench eating lunch with her friends.
Suddenly, her phone in her pocket buzzed:
CHIME!
A high-priority Google security alert appeared:
*'Sign-in attempt detected from NPS Computer Lab Terminal 4. Did you just attempt to sign in? [YES] [NO — DENY ACCESS]'*

Maya's eyebrows shot up: 'I'm outside eating a sandwich! I'm not in the computer lab!'
Maya immediately tapped **'NO — DENY ACCESS'**!
Then she tapped **'Change Passphrase'** and created an unbreakable four-word passphrase:
`PurpleOctopusEatsSamosas#9`! 🐙🥟

Back in the computer lab, Terminal 4 instantly locked with a siren sound:
*'ACCESS DENIED! Unauthorized sign-in attempt flagged and logged. Lab administrator notified.'*
Kevin scrambled out of his chair and dashed out the back door in sheer panic!

When Maya won the election the following Tuesday, her campaign presentation was completely intact.
She told her classmates during her victory speech:
'A great leader knows how to protect what matters! Activate Two-Factor Authentication today—it is the greatest digital shield in the world!' 🥇🎤👑"""
            },
            "examples": [
              {
                "id": "ex-ch6-l1-5",
                "title": "Password vs. Passphrase Crack Time Comparison ⏱️",
                "weakPassword": "'ilovepizza' (10 letters) -> Cracked in 0.003 seconds by automated bots 💥",
                "scrambledWeak": "'P@$$w0rd' (8 letters) -> Cracked in 4 seconds 🤖",
                "strongPassphrase": "'BlueCactusJumpsFast!7' (21 characters) -> 400 Trillion Years to crack! ⏳🌌"
              },
              {
                "id": "ex-ch6-l1-6",
                "title": "The Two Locks on the Door (2FA) 🚪🔐",
                "lock1": "Something you KNOW (Your strong passphrase)",
                "lock2": "Something you HAVE (A 6-digit code sent to your physical phone)",
                "result": "Even if an attacker steals your password, they cannot enter without your physical device!"
              }
            ],
            "keyPoints": [
              "Short passwords are cracked in milliseconds by automated brute-force computer scripts testing billions of guesses per second 🤖💥",
              "Length beats complexity: Four-word passphrases (e.g., 'BlueCactusJumpsFast!7') take supercomputers trillions of years to crack 🌵⏳",
              "Two-Factor Authentication (2FA) adds an impenetrable second deadbolt: even stolen passwords cannot breach an account without your phone 📲🛡️",
              "Protect home Wi-Fi by changing factory default router admin credentials (`admin/admin`) and enabling WPA3 encryption 📡"
            ],
            "miniQuiz": {
              "question": "Why is a four-word passphrase like 'BlueCactusJumpsFast!7' significantly safer than a password like 'P@$$w0rd'?",
              "options": [
                { "id": "a", "text": "Because blue cacti have natural thorns that hurt computer wires 🌵", "correct": False, "feedback": "That's a funny mental picture, but not the mathematical reason!" },
                { "id": "b", "text": "Because its length (21 characters) creates an astronomical number of mathematical combinations that take supercomputers trillions of years to crack! ⏳💪", "correct": True, "feedback": "🌟 EXACTLY! Mathematical length exponentially increases brute-force crack time!" },
                { "id": "c", "text": "Because passphrases don't use the English alphabet", "correct": False, "feedback": "Passphrases use standard words!" }
              ]
            }
          }
        ],
        "games": [
          {
            "gameId": "game-ch6-l1-1",
            "gameType": "permissions-detective",
            "title": "The Permissions Detective: Permit or Deny? 📱🕵️‍♂️",
            "emoji": "🕵️‍♂️",
            "description": "Step into the Chief Security Officer role! Audit three incoming mobile app permission requests. Decide whether to grant permission or slam the digital door shut!",
            "difficulty": "intermediate",
            "duration": "10 minutes",
            "algoIntro": "BEEP BOOP! 🧠 Security audit terminal online! Three apps are requesting sensitive phone keys. Apply the Principle of Least Privilege and deny suspicious requests! 📱🛡️✨",
            "instructions": [
              "Read the app description and the permissions requested.",
              "Determine if the permission is strictly necessary for the core function.",
              "Choose GRANT or DENY to earn 25 security points per audit!"
            ],
            "items": [
              {
                "caseId": "audit-1",
                "appName": "Flashlight Neon Glow 🔦",
                "requestedPermissions": "Contacts & Phonebook, GPS Location (Always)",
                "options": [
                  { "id": "a1-a", "text": "GRANT: Maybe the flashlight needs to find my friends in the dark! 🔦", "correct": False, "feedback": "Flashlights only need LED hardware control! This is an undercover spy app!" },
                  { "id": "a1-b", "text": "DENY: Suspicious request! A flashlight app never requires access to location or contacts! 🚩🚫", "correct": True, "feedback": "🌟 SECURITY MASTER! Permission denied! Offline tools do not require access to your private phonebook!" },
                  { "id": "a1-c", "text": "GRANT LOCATION ONLY", "correct": False, "feedback": "Flashlights don't need location either!" }
                ],
                "points": 25
              },
              {
                "caseId": "audit-2",
                "appName": "Simple Offline Calculator 🧮",
                "requestedPermissions": "Contacts, Storage, GPS Location",
                "options": [
                  { "id": "a2-a", "text": "DENY: Offline tools do not require access to your private phonebook or location! 🧮🚫", "correct": True, "feedback": "🌟 FLAWLESS AUDIT! Math calculations happen locally in CPU with zero external data!" },
                  { "id": "a2-b", "text": "GRANT: Math requires phonebook numbers to calculate equations", "correct": False, "feedback": "Calculators calculate numbers you type, not private phone contacts!" },
                  { "id": "a2-c", "text": "GRANT ALL", "correct": False, "feedback": "Massive privacy risk!" }
                ],
                "points": 25
              },
              {
                "caseId": "audit-3",
                "appName": "City Transit & Metro Map 🗺️",
                "requestedPermissions": "Precise GPS Location (While Using App)",
                "options": [
                  { "id": "a3-a", "text": "DENY: Maps should guess where I am without satellites", "correct": False, "feedback": "Navigation maps genuinely need real-time GPS coordinates to give route directions!" },
                  { "id": "a3-b", "text": "GRANT (While Using App): Legitimate navigation requirement strictly while using the app! 🗺️✅", "correct": True, "feedback": "🌟 BALANCED SECURITY! Navigation requires location, and 'While Using App' protects you when closed!" },
                  { "id": "a3-c", "text": "GRANT ALWAYS (24/7 background tracking)", "correct": False, "feedback": "No need for background 24/7 tracking!" }
                ],
                "points": 25
              }
            ],
            "buddyMeter": {
              "current": 75,
              "maxScore": 75,
              "levels": [
                { "score": 25, "label": "Security Cadet 🔍", "message": "Good start! Spotting red flags!" },
                { "score": 50, "label": "Cyber Detective 🕵️‍♂️", "message": "Two audits cleared! Private phonebooks protected!" },
                { "score": 75, "label": "Chief Information Security Officer 👑", "message": "PERFECTION! Your digital perimeter is impenetrable!" }
              ]
            },
            "scoring": { "pointsPerCorrect": 25, "totalPossible": 75 },
            "toastGuidance": {
              "tap_prompt": "Audit permissions: Deny contacts and location access for the offline calculator.",
              "great_job": "Permission denied! Offline tools do not require access to your private phonebook.",
              "try_again": "Suspicious request: A flashlight app never requires access to location or contacts."
            },
            "auraGuidance": {
              "slowBoldVoice": True,
              "tone": "Sharp, commanding, vigilant cybersecurity tone"
            }
          },
          {
            "gameId": "game-ch6-l1-2",
            "gameType": "passphrase-builder-arena",
            "title": "The Passphrase Builder Arena! 🗝️🏰",
            "emoji": "🗝️",
            "description": "Construct four-word passphrases to defeat brute-force supercomputers attempting to crack your accounts!",
            "difficulty": "intermediate",
            "duration": "10 minutes",
            "algoIntro": "BEEP BOOP! 🧠 Supercomputers are attacking the gate with 100 billion guesses per second! Assemble strong multi-word passphrases to withstand the siege! 🏰⚡",
            "instructions": [
              "Evaluate the candidate password/passphrase.",
              "Select the strongest option based on mathematical length and memorability.",
              "Earn 25 fortress points per unbreakable defense!"
            ],
            "items": [
              {
                "targetAccount": "School Google Workspace Email 📧",
                "options": [
                  { "id": "p1-a", "text": "aarav2012 (Short, predictable birthday)", "correct": False, "feedback": "Cracked in 0.001 seconds by basic dictionary bots!" },
                  { "id": "p1-b", "text": "P@ssw0rd1! (Short, common substitutions)", "correct": False, "feedback": "Predictable pattern cracked in 3 seconds!" },
                  { "id": "p1-c", "text": "SilverDolphinEatsMango#8 (24 characters, 4 words, memorable!) 🐬🥭", "correct": True, "feedback": "🌟 UNBREAKABLE! Would take supercomputers 800 trillion years to crack! 🛡️" }
                ],
                "points": 25
              },
              {
                "targetAccount": "Multiplayer Gaming Profile 🎮",
                "options": [
                  { "id": "p2-a", "text": "gamerboy99 (Cliché username password)", "correct": False, "feedback": "In top 100 most hacked passwords!" },
                  { "id": "p2-b", "text": "GoldenFalconFliesHigh!22 (23 characters, concrete imagery) 🦅✨", "correct": True, "feedback": "🌟 FORTRESS LEVEL! Visual, long, and mathematically impossible to brute-force! 🏰" },
                  { "id": "p2-c", "text": "123456789 (Sequential numbers)", "correct": False, "feedback": "Cracked in 0.00001 milliseconds!" }
                ],
                "points": 25
              },
              {
                "targetAccount": "Home Wi-Fi Admin Router 📡",
                "options": [
                  { "id": "p3-a", "text": "admin (Factory default)", "correct": False, "feedback": "Every hacker in the world knows the factory default!" },
                  { "id": "p3-b", "text": "password (Factory default)", "correct": False, "feedback": "Instant compromise!" },
                  { "id": "p3-c", "text": "QuietThunderRumblesDeep$4 (25 characters, unique to home) ⛈️🔒", "correct": True, "feedback": "🌟 HOME WI-FI FORTIFIED! Rogue devices outside cannot penetrate this network! 📡👑" }
                ],
                "points": 25
              }
            ],
            "buddyMeter": {
              "current": 75,
              "maxScore": 75,
              "levels": [
                { "score": 25, "label": "Key Maker 🗝️", "message": "Good password length awareness!" },
                { "score": 50, "label": "Vault Architect 🏰", "message": "Two fortress passphrases built!" },
                { "score": 75, "label": "Grand Cryptographer 👑", "message": "UNTOUCHABLE! Supercomputers will never crack your accounts!" }
              ]
            },
            "scoring": { "pointsPerCorrect": 25, "totalPossible": 75 },
            "toastGuidance": {
              "start": "🗝️ Assemble 4-word passphrases! Defeat brute-force bots!",
              "correct": "🌟 MATHEMATICAL FORTRESS! 400 trillion years to crack! ⏳💪",
              "incorrect": "🤔 Remember: Length beats complexity! Combine four random concrete words!",
              "complete": "🏆 PASSPHRASE MASTER TROPHY EARNED! Unbreakable security! 🗝️👑"
            },
            "auraGuidance": {
              "slowBoldVoice": True,
              "tone": "Bold, strategic, cryptographic mentor voice"
            }
          },
          {
            "gameId": "game-ch6-l1-3",
            "gameType": "two-factor-defense-sim",
            "title": "The 2FA Shield Defense Arena! 🛡️📱",
            "emoji": "🛡️",
            "description": "Simulate phishing attacks and password breaches to experience how Two-Factor Authentication stops cyber intruders cold!",
            "difficulty": "intermediate",
            "duration": "8 minutes",
            "algoIntro": "BEEP BOOP! 📱 Phishing alert incoming! An attacker has obtained a stolen password. Watch how your mobile 2FA prompt acts as the ultimate digital deadbolt! 🚨🛡️",
            "instructions": [
              "Analyze the security breach scenario.",
              "Choose the correct 2FA response action.",
              "Score 25 points per neutralized threat!"
            ],
            "items": [
              {
                "scenarioId": "sim-1",
                "attackDescription": "You receive a sudden SMS with a 6-digit login code: 'Your verification code is 829-104', but you are sitting in class eating a snack and did NOT attempt to log in!",
                "options": [
                  { "id": "s1-a", "text": "Text the code back to the number that sent it", "correct": False, "feedback": "Never share verification codes with anyone!" },
                  { "id": "s1-b", "text": "Someone has stolen your password and is trying to breach your account! DO NOT share the code, and immediately change your password from your device! 🚨🛡️", "correct": True, "feedback": "🌟 PERFECT REACTION! 2FA blocked the hacker! Changing the compromised password seals the breach!" },
                  { "id": "s1-c", "text": "Post the code on your social media story to ask friends what it means", "correct": False, "feedback": "Sharing codes publicly compromises your account!" }
                ],
                "points": 25
              },
              {
                "scenarioId": "sim-2",
                "attackDescription": "A stranger in a gaming chat promises you 5,000 free game coins if you tell them the 6-digit code that was just texted to your phone.",
                "options": [
                  { "id": "s2-a", "text": "Tell them the code to get the free coins 🪙", "correct": False, "feedback": "This is a classic account theft scam! They will steal your entire account!" },
                  { "id": "s2-b", "text": "Block and report the user! Legitimate companies and game developers will NEVER ask for your 2FA verification code! 🚫🛡️", "correct": True, "feedback": "🌟 SCAM NEUTRALIZED! Verification codes are private keys—never share them with anyone!" },
                  { "id": "s2-c", "text": "Give them half the digits", "correct": False, "feedback": "Never share any verification information!" }
                ],
                "points": 25
              },
              {
                "scenarioId": "sim-3",
                "attackDescription": "Your school IT administrator asks the class to set up 2FA on their student portals before the exam term.",
                "options": [
                  { "id": "s3-a", "text": "Ignore the announcement because passwords are good enough", "correct": False, "feedback": "Passwords alone leave accounts vulnerable to breaches!" },
                  { "id": "s3-b", "text": "Enable 2FA immediately using an authenticator app or registered family phone number to protect your exam papers and grades! 📲✅", "correct": True, "feedback": "🌟 MODEL CYBER CITIZEN! 2FA ensures only you can access your schoolwork!" },
                  { "id": "s3-c", "text": "Share your account with three friends", "correct": False, "feedback": "Never share personal accounts!" }
                ],
                "points": 25
              }
            ],
            "buddyMeter": {
              "current": 75,
              "maxScore": 75,
              "levels": [
                { "score": 25, "label": "Shield Bearer 🛡️", "message": "Good defense awareness!" },
                { "score": 50, "label": "Perimeter Defender 🏰", "message": "Two phishing attacks neutralized!" },
                { "score": 75, "label": "Master Cyber Guardian 👑", "message": "IMPERVIOUS FORTRESS! You are protected against all credential theft!" }
              ]
            },
            "scoring": { "pointsPerCorrect": 25, "totalPossible": 75 },
            "toastGuidance": {
              "start": "📱 2FA Shield active! Neutralize credential theft attempts!",
              "correct": "🌟 ATTACK BLOCKED! Digital deadbolt held firm! 🛡️🔒",
              "incorrect": "Never submit unedited AI output without fact-checking and personal reflection.",
              "complete": "🏆 2FA GUARDIAN MEDAL EARNED! Unhackable defense! 🎖️👑"
            },
            "auraGuidance": {
              "slowBoldVoice": True,
              "tone": "Vigilant, protective, tactical cyber trainer voice"
            }
          }
        ],
        "activities": [
          {
            "activityId": "activity-ch6-l1-1",
            "title": "Mobile Permissions Audit Inspector",
            "type": "hands-on-privacy-audit",
            "duration": "20 minutes",
            "emoji": "📱",
            "totalWords": 640,
            "description": "Become an official Cybersecurity Inspector! Perform a real-world, step-by-step privacy audit on your smartphone, tablet, or a family device. You will navigate to the operating system's Permission Manager, inspect five sensitive hardware sensors, revoke suspicious permissions from utility apps and games, and record your findings in an official Audit Report!",
            "materials": [
              "A smartphone or tablet (Android or Apple iOS) 📱",
              "Your student cybersecurity notebook and pen 📓🖊️",
              "A parent or guardian's permission to inspect device settings 👨‍👩‍👧‍👦"
            ],
            "setup": {
              "goal": "Audit and lock down all unnecessary app permissions on your mobile device, specifically targeting Location, Microphone, Camera, and Contacts!",
              "instruction": "Follow the 5-step inspection checklist. Identify at least three apps with excessive or suspicious permissions and revoke them!"
            },
            "steps": [
              {
                "step": 1,
                "emoji": "⚙️",
                "instruction": "Navigate to the Security Bridge: Open your device's Settings menu. Scroll down and tap 'Privacy & Security' (or 'Privacy' -> 'Permission Manager' on Android; 'Privacy & Security' on iOS).",
                "buddyTip": "BEEP BOOP! You have just entered the central control bridge of your smartphone! 🚀"
              },
              {
                "step": 2,
                "emoji": "📍",
                "instruction": "Inspect Location Permissions: Tap on 'Location'. Review the list of apps. If you see any offline calculator, flashlight, single-player puzzle game, or wallpaper app with location access, tap it and switch it to 'DON'T ALLOW'!",
                "buddyTip": "BEEP BOOP! Remember our toast prompt: Audit permissions: Deny contacts and location access for the offline calculator! 🧮🚫"
              },
              {
                "step": 3,
                "emoji": "🎙️",
                "instruction": "Audit the Microphone Sensor: Tap on 'Microphone'. Look at every app that has microphone access. Ask yourself: 'Does this app genuinely need to record my voice for its core job?' If a shopping app or casual game has mic access, switch to 'Don't Allow'!",
                "buddyTip": "BEEP BOOP! Guard the ears of your device! No background eavesdropping allowed! 👂"
              },
              {
                "step": 4,
                "emoji": "📒",
                "instruction": "Audit the Contacts Phonebook: Tap on 'Contacts'. Ensure that ONLY dedicated communication apps (like phone dialer, messaging, and parent-approved chat) have access. Revoke contacts access from ALL games and photo editors!",
                "buddyTip": "BEEP BOOP! Permission denied! Offline tools do not require access to your private phonebook! 🛑"
              },
              {
                "step": 5,
                "emoji": "📝",
                "instruction": "Compile Your Inspection Report: In your notebook, draw a 3-column table: 'App Name | Suspicious Permission Found | Action Taken (Revoked/Uninstalled)'. Write down at least three apps you successfully audited!",
                "buddyTip": "BEEP BOOP! Show your completed audit report to your parents—they will be amazed at your cyber detective skills! 🏆"
              }
            ],
            "familyConnection": {
              "prompt": "Offer to run a free 10-minute 'Privacy Audit Service' on your parents' or grandparents' smartphones!",
              "activity": "Help them audit flashlight apps, online shopping apps, and ride-hailing permissions. Explain the Principle of Least Privilege to them!"
            },
            "learningOutcome": "Empowers students with practical, actionable hardware security skills, transforming theoretical digital safety into lifelong real-world cyber hygiene habits.",
            "buddyFeedback": "BEEP BOOP! 🧠 CHIEF INSPECTOR SALUTE! You audited the gates, revoked shady permissions, and secured your personal data perimeter! You are officially an untouchable digital fortress! 🛡️📱👑🌟",
            "toastGuidance": {
              "start": "Audit permissions: Deny contacts and location access for the offline calculator.",
              "progress": "Inspecting Location and Microphone sensors—revoking red flags! 🚩",
              "complete": "Permission denied! Offline tools do not require access to your private phonebook."
            }
          },
          {
            "activityId": "activity-ch6-l1-2",
            "title": "The Passphrase Vault & Home Wi-Fi Safety Checklist 🔐🏠",
            "type": "hands-on-cyber-fortification",
            "duration": "15 minutes",
            "emoji": "🔐",
            "totalWords": 560,
            "description": "Construct your own personalized, unbreakable 4-word passphrases using a physical word-dice system, and conduct a collaborative home Wi-Fi security audit with your family!",
            "materials": [
              "A sheet of paper and a pen 📄🖊️",
              "A six-sided playing die (or a random number generator) 🎲",
              "Your home Wi-Fi router information (located on the bottom sticker of your living room router) 📡"
            ],
            "setup": {
              "goal": "Generate two 20+ character memorable passphrases and verify home Wi-Fi router admin credentials!",
              "instruction": "Step 1: Use the 4-word randomizer table to build your passphrase. Step 2: Test its crack time. Step 3: Check your home router with a parent to ensure the factory default admin password is changed!"
            },
            "steps": [
              {
                "step": 1,
                "emoji": "🎲",
                "instruction": "Roll the Word Randomizer: Roll your die four times to pick: 1 Color (Blue, Silver, Golden, Emerald), 1 Animal (Falcon, Dolphin, Panda, Cheetah), 1 Action Verb (Jumps, Dances, Soars, Sprints), and 1 Favorite Snack (Mango, Samosa, Jalebi, Cookie).",
                "buddyTip": "BEEP BOOP! Combining concrete words creates vivid mental imagery that is easy for you to remember but impossible for computers to guess! 🌵"
              },
              {
                "step": 2,
                "emoji": "🗝️",
                "instruction": "Assemble the Passphrase: Join the words with a symbol and number. Example: 'EmeraldDolphinSprintsSamosa!9'. Count the characters (over 25 characters!).",
                "buddyTip": "BEEP BOOP! Over 400 trillion years crack time! Supercomputers defeated! ⏳"
              },
              {
                "step": 3,
                "emoji": "📡",
                "instruction": "The Home Wi-Fi Router Audit: With a parent, check your home Wi-Fi router sticker. Is the admin password still set to the default 'admin' or 'password'?",
                "buddyTip": "BEEP BOOP! If it's still default, help your parent change it to a strong family passphrase immediately! 🏠"
              },
              {
                "step": 4,
                "emoji": "🛡️",
                "instruction": "Check Network Encryption: Ensure your home Wi-Fi security setting is set to WPA2-AES or WPA3 in the router admin console.",
                "buddyTip": "BEEP BOOP! WPA3 encryption scrambles data packets so eavesdroppers outside cannot decode them! 🔒"
              },
              {
                "step": 5,
                "emoji": "✅",
                "instruction": "Activate 2FA on School Accounts: Log into your school student portal or Google account and verify that Two-Factor Authentication is toggled ON.",
                "buddyTip": "BEEP BOOP! The double lock on the door is complete! 🚪🔐"
              }
            ],
            "familyConnection": {
              "prompt": "Share your newly created passphrase method with your parents!",
              "activity": "Help each family member create their own memorable 4-word passphrase for their personal email accounts."
            },
            "learningOutcome": "Imparts foundational knowledge of entropy, password cracking mathematics, network security protocols, and collaborative household cyber defense.",
            "buddyFeedback": "BEEP BOOP! 🔐 VAULT ARCHITECT GRAND MASTER! Your accounts are fortified, your router is secured, and your family's digital perimeter is safe! High-fives! 🖐️🏰🌟",
            "toastGuidance": {
              "start": "🗝️ Roll the randomizer! Build a 4-word passphrase!",
              "progress": "Auditing home Wi-Fi router credentials with family! 📡",
              "complete": "🏆 ACCOUNT DEFENSE MASTER! 400 trillion years to crack! 🛡️👑"
            }
          }
        ],
        "realWorldExamples": [
          {
            "id": "ex-1",
            "title": "Free gaming apps collecting location data for ad networks 🎮🕵️‍♂️",
            "scenario": "Kabir's Endless Runner Battery Mystery!",
            "aiConnection": "Background telemetry and mobile advertising SDKs utilize GPS sensors and device identifiers to construct behavioral profiles for automated ad auctions.",
            "observation": "Kabir noticed that whenever he played a free 3D racing game, his phone became hot to the touch and the battery drained from 80% to 20% in one hour.",
            "discussion": "Kabir checked the battery usage stats in Settings. Over 45% of the battery was consumed by 'Background GPS Location Services' running inside the free racing game! The game was pinging satellite coordinates every 15 seconds to stream location data to commercial ad networks. Kabir switched the game's location permission to 'DON'T ALLOW', and immediately his phone stayed cool and the battery lasted all day! 📱🔋🛡️"
          },
          {
            "id": "ex-2",
            "title": "Setting up two-factor verification on school email 📧🔒",
            "scenario": "Maya's School Election Drive Defense!",
            "aiConnection": "Multi-factor authentication (MFA/2FA) protocols introduce cryptographic challenge-response mechanisms that decouple account access from single static credentials.",
            "observation": "A rival classmate discovered Maya's school email password and attempted to log in during lunch break to tamper with her student council campaign files.",
            "discussion": "Because Maya had enabled Two-Factor Authentication on her school Google account, the unauthorized sign-in was blocked instantly. The server demanded a 6-digit verification code that was routed exclusively to Maya's physical phone. Maya denied the access request, updated her passphrase, and kept her campaign files 100% secure! 📲🛡️🥇"
          },
          {
            "id": "ex-3",
            "title": "Protecting Wi-Fi passwords at home 📡🏠",
            "scenario": "Rohan's Living Room Router Security Overhaul!",
            "aiConnection": "Wireless access point vulnerabilities (such as default administrative credentials and unencrypted traffic) expose all connected Internet-of-Things devices to lateral network attacks.",
            "observation": "Rohan's family noticed their home internet was sluggish. A network scan showed 14 connected devices, but the family only owned 6 gadgets!",
            "discussion": "Rohan inspected the home router. The administrator password was still set to the factory default `admin/admin`, and the Wi-Fi password was simply their house street number! Neighbors on the street had guessed the password and were leeching bandwidth. Rohan and his father logged into the router console, changed the admin password to a strong passphrase, enabled WPA3 encryption, and kicked off all unauthorized snoopers, instantly restoring blazing-fast internet speeds! 📡⚡🏠"
          }
        ],
        "practiceExercises": [
          {
            "exerciseId": "ex-vocab-1",
            "type": "word-matching",
            "title": "Algo's Data Privacy Vocabulary Bank 🧠📝",
            "instruction": "Match each cybersecurity and digital privacy term to its correct definition and real-world defense principle!",
            "wordBank": [
              "App Permissions",
              "Data Broker",
              "Principle of Least Privilege",
              "AI Hallucination",
              "Passphrase",
              "Two-Factor Authentication (2FA)",
              "Digital Footprint",
              "Brute-Force Attack"
            ],
            "sentences": [
              {
                "id": "sent-1",
                "sentence": "The digital access controls on a smartphone that govern whether an app can touch the Camera, Microphone, GPS, or Contacts are ______.",
                "targetWord": "App Permissions",
                "hint": "The digital keys to your phone's rooms! 📱🔑",
                "explanation": "App permissions act as gatekeepers between software and sensitive hardware sensors!"
              },
              {
                "id": "sent-2",
                "sentence": "A corporation that collects, packages, and sells personal information (like physical GPS coordinates and device usage) to advertising networks is a ______.",
                "targetWord": "Data Broker",
                "hint": "The hidden middlemen behind 'free' apps! 🕵️‍♂️💰",
                "explanation": "Data brokers monetize consumer behavior and location tracking data without direct consumer relationships!"
              },
              {
                "id": "sent-3",
                "sentence": "The core cybersecurity rule stating that software should only receive the minimum permissions strictly necessary for its job is the ______.",
                "targetWord": "Principle of Least Privilege",
                "hint": "Why a flashlight should only get camera flash control! ⚖️",
                "explanation": "The Principle of Least Privilege limits damage from compromised or malicious software!"
              },
              {
                "id": "sent-4",
                "sentence": "A long, memorable security credential made of multiple random words (e.g., 'BlueCactusJumpsFast!7') that resists automated cracking is a ______.",
                "targetWord": "Passphrase",
                "hint": "Length beats complexity! 🌵🗝️",
                "explanation": "Passphrases provide astronomical entropy while remaining easy for human memory!"
              },
              {
                "id": "sent-5",
                "sentence": "A security system requiring two independent verification factors (something you know + something you have on your phone) is ______.",
                "targetWord": "Two-Factor Authentication (2FA)",
                "hint": "The secondary steel deadbolt on the door! 🚪🔐",
                "explanation": "2FA neutralizes password breaches by requiring access to a physical secondary device!"
              },
              {
                "id": "sent-6",
                "sentence": "The trail of data, location coordinates, clicks, and permissions you leave behind while navigating the internet is your ______.",
                "targetWord": "Digital Footprint",
                "hint": "The breadcrumbs that follow you online! 👣🌐",
                "explanation": "Your digital footprint forms the basis of corporate ad profiling and identity tracking!"
              },
              {
                "id": "sent-7",
                "sentence": "An automated hacking method where computer scripts test billions of password combinations per second until cracking the code is a ______.",
                "targetWord": "Brute-Force Attack",
                "hint": "Why 'password123' gets cracked in 0.002 milliseconds! 🤖💥",
                "explanation": "Brute-force scripts rapidly defeat short, predictable passwords through sheer computational volume!"
              },
              {
                "id": "sent-8",
                "sentence": "When a computer language model invents convincing-sounding false facts out of thin air, it is experiencing an ______.",
                "targetWord": "AI Hallucination",
                "hint": "Reviewed from Chapter 5! 🤥🤖",
                "explanation": "AI hallucinations generate plausible text lacking empirical truth!"
              }
            ],
            "scoring": { "pointsPerCorrect": 10, "totalPossible": 80 }
          },
          {
            "exerciseId": "ex-decision-2",
            "type": "cyber-hygiene-decision",
            "title": "Cyber Guardian vs. Reckless Risk Decision Tree! ⚖️🛡️",
            "instruction": "Evaluate 6 everyday technology scenarios and decide whether the student is acting as a Vigilant Cyber Guardian 🛡️ or taking a Reckless Digital Risk 🚩!",
            "questions": [
              {
                "id": "q-scen-1",
                "situation": "Aarav downloads an offline sudoku game. The game asks for access to his Contacts and Location. Aarav taps 'DENY' on both.",
                "decision": "Vigilant Cyber Guardian 🛡️",
                "feedback": "GUARDIAN! Aarav applied the Principle of Least Privilege: sudoku puzzles require zero contact list data! 🧮✅"
              },
              {
                "id": "q-scen-2",
                "situation": "Divya uses the password 'divya2012' for her school email, gaming account, and tablet unlock code so she doesn't forget it.",
                "decision": "Reckless Digital Risk 🚩",
                "feedback": "RECKLESS! Reusing a short, predictable password across multiple accounts means one breach compromises her entire digital life! 💥❌"
              },
              {
                "id": "q-scen-3",
                "situation": "Kabir receives a prompt on his phone asking for a 2FA verification code that he did not request. He immediately taps 'DENY' and changes his account password.",
                "decision": "Vigilant Cyber Guardian 🛡️",
                "feedback": "GUARDIAN! Kabir recognized an active unauthorized intrusion attempt and used 2FA to seal the perimeter! 📲🛡️"
              },
              {
                "id": "q-scen-4",
                "situation": "Pooja's new home Wi-Fi router was set up by the cable technician with the admin password set to 'admin'. Pooja leaves it unchanged because 'nobody will guess it'.",
                "decision": "Reckless Digital Risk 🚩",
                "feedback": "RECKLESS! 'admin/admin' is the #1 default credential tested by automated router scanners! Anyone outside can hijack the network! 📡❌"
              },
              {
                "id": "q-scen-5",
                "situation": "Tariq constructs a 22-character passphrase: 'FlyingOtterDrinksChai!5' for his gaming account and writes it down in a private notebook kept safely in his study desk drawer.",
                "decision": "Vigilant Cyber Guardian 🛡️",
                "feedback": "GUARDIAN! Tariq used an unbreakable multi-word passphrase and stored it securely in the physical world away from internet scrapers! 🦦☕"
              },
              {
                "id": "q-scen-6",
                "situation": "Leo connects his phone to an unencrypted 'Free Public Airport Wi-Fi' with no password and logs into his school email without a VPN or 2FA.",
                "decision": "Reckless Digital Risk 🚩",
                "feedback": "RECKLESS! Unencrypted open Wi-Fi networks allow eavesdroppers on the same network to intercept unencrypted traffic! 📶⚠️"
              }
            ],
            "scoring": { "pointsPerCorrect": 10, "totalPossible": 60 }
          }
        ],
        "lessonSummary": {
          "algoConclusion": "BEEP BOOP! 🧠🎉 CONGRATULATIONS, CHIEF CYBER GUARDIANS OF CLASS 6! Today, you graduated from vulnerable internet surfers to UNTOUCHABLE DEFENDERS OF DATA PRIVACY! You learned that app permissions are the digital keys to your home—and that a flashlight app or offline calculator asking for your family phonebook is a massive red flag! 🚩 You pulled back the curtain on the multi-billion-dollar data broker economy and discovered that 'free' apps monetize your physical GPS footprints. Most importantly, you built an impenetrable perimeter with multi-word passphrases, two-factor authentication deadbolts, and fortified home Wi-Fi networks! Remember Algo's golden rule: Your data is your personal treasure; never hand the keys to a flashlight app! Wear the Cyber Guardian Shield with pride! High-fives, green checkmarks, locked vaults, and celebration confetti! 🖐️🛡️🔐📱🎉",
          "keyTakeaways": [
            { "emoji": "📱", "takeaway": "App Permissions Gatekeeping: Apps are sandboxed by default; they can only access cameras, mics, GPS, and contacts if you grant permission." },
            { "emoji": "🚩", "takeaway": "The Flashlight Red Flag: Offline tools and flashlights demanding contacts or location are harvesting data to sell to third-party ad brokers." },
            { "emoji": "⚖️", "takeaway": "The Principle of Least Privilege: Always grant the absolute minimum permissions strictly necessary for an app's primary job." },
            { "emoji": "🎮", "takeaway": "The Free App Economy: If you are not paying with money, you are paying with your personal location data and digital footprint." },
            { "emoji": "🗝️", "takeaway": "Passphrases Defeat Supercomputers: Four-word passphrases (e.g., 'BlueCactusJumpsFast!7') take 400 trillion years to crack, beating short passwords." },
            { "emoji": "📲", "takeaway": "Two-Factor Authentication (2FA): The secondary deadbolt! Stolen passwords cannot breach an account without your physical verification phone." },
            { "emoji": "📡", "takeaway": "Home Wi-Fi Hygiene: Always change factory default router admin logins (`admin/admin`) and enable modern WPA3 encryption." },
            { "emoji": "🛡️", "takeaway": "Toast Guidance: 'Audit permissions: Deny contacts and location access for the offline calculator.' Protect your digital perimeter!" }
          ],
          "studentReflection": {
            "question": "Which app on your smartphone or family tablet surprised you most during your permissions audit? What unnecessary permission did you find, and how did it feel to revoke it?",
            "prompts": [
              "Did a drawing app have access to your microphone? 🎙️",
              "Did an offline game have 24/7 background location access? 📍",
              "How will you help your family audit their phones this weekend? 👨‍👩‍👧‍👦"
            ]
          },
          "nextLesson": {
            "title": "Using AI Wisely — Ethics, Bias & Fairness in Algorithms",
            "preview": "In Lesson 2 of Chapter 6, we explore algorithmic fairness! How do AI systems develop bias? Why do facial recognition systems sometimes fail? And how can young engineers design AI that treats every human being with dignity and justice?",
            "emoji": "⚖️🤖🌍",
            "algoTeaser": "BEEP BOOP! Ready to become an algorithmic justice champion? In Lesson 2, we uncover how AI learns biases and how WE can fix them! See you in the Ethics Arena! ⚖️🧠✨"
          },
          "parentNote": "In this vital Chapter 6 lesson, your sixth-grader explored practical cybersecurity and data privacy. By demystifying the business model of 'free' mobile apps and demonstrating how data brokers monetize location and contact permissions, children learn to navigate the digital world with healthy critical skepticism. Reinforce this at home by collaborating with your child on the 'Mobile Permissions Audit Inspector' activity, reviewing app permissions together, changing factory-default Wi-Fi router passwords, and activating Two-Factor Authentication on family accounts.",
          "teacherNote": "Classroom Pedagogy Guide: Execute the 'Mobile Permissions Audit Inspector' as an in-class laboratory! Have students navigate device settings, identify permissions requested by popular gaming apps, and graph the percentage of apps requesting unnecessary location data. Emphasize the Principle of Least Privilege and contrast weak predictable passwords with 20-character passphrases. Directly fulfills national digital citizenship, cybersecurity literacy, and online safety curricula.",
          "auraClosing": {
            "congratulations": "LESSON 1 COMPLETE! You are an Official Master of Mobile Data Defense! 🛡️📱🔐",
            "achievement": "You earned: 🏆 Golden Cyber Shield Trophy plus 🎖️ Master Permissions Inspector Badge!",
            "nextStep": "Ready for Lesson 2? Join Algo in the Algorithmic Bias & Ethics Lab! ⚖️🤖",
            "totalPoints": 500,
            "starRating": "⭐⭐⭐⭐⭐"
          }
        }
      },
      "assessment": {
        "quizTitle": "Algo's Protect Your Data Master Examination! 🧠🏆",
        "quizType": "interactive_multiple_choice",
        "buddyIntro": "BEEP BOOP! 🧠 The Class 6 Chapter 6 Board Examination is here, Chief Cyber Guardian! Ten questions testing permissions audits, flashlight app red flags, data brokers, 4-word passphrases, 2FA deadbolts, and Wi-Fi security! Trust your cyber instincts and let's score 100%! 🛡️🏆🌟",
        "totalQuestions": 10,
        "passingScore": 70,
        "questions": [
          {
            "id": "q-ch6-l1-1",
            "type": "tap_correct",
            "emoji": "🔦",
            "question": "Why is it a massive red flag when a free flashlight app asks for access to your Contacts and GPS Location?",
            "options": [
              { "id": "q1-a", "text": "Because flashlight bulbs need to know your friends' phone numbers to shine brighter 💡", "correct": False, "feedback": "Hardware LED bulbs only need electrical power and camera flash control!" },
              { "id": "q1-b", "text": "Because offline flashlights only need hardware control of the LED light; requesting contacts and location indicates the app is harvesting personal data to sell to ad brokers! 🚩🕵️‍♂️", "correct": True, "emoji": "✅", "feedback": "🌟 EXACTLY! A flashlight app never requires access to location or contacts—it's spyware!" },
              { "id": "q1-c", "text": "Because flashlight apps only work during daytime solar eclipses", "correct": False, "feedback": "Flashlights work anytime in the dark!" },
              { "id": "q1-d", "text": "Because contacts lists are made of glass that reflects light 🪞", "correct": False, "feedback": "Digital contacts lists are software data, not glass mirrors!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ RED FLAG MASTER! Flashlights don't need phonebooks! Data harvest blocked! 🚩🛡️",
              "incorrect": "BEEP BOOP! Remember: A flashlight app never requires access to location or contacts!"
            }
          },
          {
            "id": "q-ch6-l1-2",
            "type": "tap_correct",
            "emoji": "⚖️",
            "question": "What is the 'Principle of Least Privilege' in cybersecurity?",
            "options": [
              { "id": "q2-a", "text": "Granting every app every permission so you never see pop-up notifications again", "correct": False, "feedback": "That leaves your device completely exposed to spyware!" },
              { "id": "q2-b", "text": "Granting software only the absolute minimum permissions strictly necessary to perform its core job! ⚖️🛡️", "correct": True, "emoji": "✅", "feedback": "🌟 BINGO! Only grant permissions strictly necessary for the app's primary advertised function!" },
              { "id": "q2-c", "text": "Only using smartphones for 5 minutes per week", "correct": False, "feedback": "The principle applies to software security, not screen time limits!" },
              { "id": "q2-d", "text": "Giving your phone password to everyone in your class", "correct": False, "feedback": "Never share your phone password!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ PRINCIPLE OF LEAST PRIVILEGE MASTERED! Minimum keys, maximum security! ⚖️👑",
              "incorrect": "BEEP BOOP! The Principle of Least Privilege means granting only the minimum necessary permissions!"
            }
          },
          {
            "id": "q-ch6-l1-3",
            "type": "tap_correct",
            "emoji": "🧮",
            "question": "What does the lesson's toast guidance instruct you to do when an offline calculator requests contacts?",
            "options": [
              { "id": "q3-a", "text": "'Audit permissions: Deny contacts and location access for the offline calculator.' 🧮🚫", "correct": True, "emoji": "✅", "feedback": "🌟 PERFECT! Toast rule: Permission denied! Offline tools do not require access to your private phonebook!" },
              { "id": "q3-b", "text": "'Allow all contacts so the calculator can text math answers to your friends'", "correct": False, "feedback": "Calculators don't need to text contacts!" },
              { "id": "q3-c", "text": "'Throw the calculator into a bucket of water'", "correct": False, "feedback": "Water damages electronic devices!" },
              { "id": "q3-d", "text": "'Pay the calculator 100 rupees'", "correct": False, "feedback": "No payment needed—just deny the permission!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ TOAST COMMAND CLEARED! Permission denied! Offline tools don't need phonebooks! 🧮✅",
              "incorrect": "BEEP BOOP! Remember: 'Audit permissions: Deny contacts and location access for the offline calculator.'"
            }
          },
          {
            "id": "q-ch6-l1-4",
            "type": "tap_correct",
            "emoji": "💰",
            "question": "What is the true business model behind many '100% Free' mobile games and utilities?",
            "options": [
              { "id": "q2-a", "text": "Game developers find gold coins buried under their office desks", "correct": False, "feedback": "Software companies have real salaries and server bills!" },
              { "id": "q4-b", "text": "If you are not paying with money, your personal data (GPS location, device IDs) is harvested and sold to ad networks—YOU are the product! 🎮🕵️‍♂️💰", "correct": True, "emoji": "✅", "feedback": "🌟 PROFOUND TRUTH! Free apps monetize users by packaging their data footprint for advertising networks!" },
              { "id": "q4-c", "text": "App stores are funded entirely by benevolent extraterrestrials 👽", "correct": False, "feedback": "No extraterrestrial funding!" },
              { "id": "q4-d", "text": "Free apps don't cost any money to build or operate", "correct": False, "feedback": "Cloud servers and developers cost millions of dollars!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ ECONOMIC REALITY UNMASKED! If you aren't paying, your data is the product! 📦🏷️",
              "incorrect": "BEEP BOOP! Free apps monetize by packaging and selling user location and behavioral data!"
            }
          },
          {
            "id": "q-ch6-l1-5",
            "type": "tap_correct",
            "emoji": "⏱️",
            "question": "How fast can automated brute-force cracking tools test and breach short passwords like 'password123'?",
            "options": [
              { "id": "q5-a", "text": "It takes 50 years of hard human typing", "correct": False, "feedback": "Bots test billions of guesses per second!" },
              { "id": "q5-b", "text": "In less than 0.002 milliseconds (faster than the blink of an eye)! 🤖💥", "correct": True, "emoji": "✅", "feedback": "🌟 EXACTLY! Modern brute-force rigs test over 100 billion combinations per second!" },
              { "id": "q5-c", "text": "It takes exactly 3 weeks", "correct": False, "feedback": "Short dictionary passwords fall in milliseconds!" },
              { "id": "q5-d", "text": "Short passwords are mathematically impossible to crack", "correct": False, "feedback": "Short passwords are the easiest to crack!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ BRUTE-FORCE REALITY! Automated bots shred short passwords in milliseconds! 🤖⚡",
              "incorrect": "BEEP BOOP! Short predictable passwords fall in less than a millisecond!"
            }
          },
          {
            "id": "q-ch6-l1-6",
            "type": "tap_correct",
            "emoji": "🌵",
            "question": "Why is a four-word passphrase like 'BlueCactusJumpsFast!7' vastly superior to 'P@$$w0rd'?",
            "options": [
              { "id": "q6-a", "text": "Because mathematical LENGTH (21 characters) creates an astronomical number of combinations that take supercomputers over 400 trillion years to crack! ⏳💪", "correct": True, "emoji": "✅", "feedback": "🌟 CRYPTOGRAPHIC GENIUS! Length beats complexity! Easy for humans to remember, impossible for bots to guess!" },
              { "id": "q6-b", "text": "Because computers cannot type the word 'cactus'", "correct": False, "feedback": "Computers can type any dictionary word!" },
              { "id": "q6-c", "text": "Because it uses secret alien symbols", "correct": False, "feedback": "It uses standard English words and numbers!" },
              { "id": "q6-d", "text": "Because shorter passwords are always safer", "correct": False, "feedback": "Shorter passwords have vastly fewer mathematical combinations!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ LENGTH BEATS COMPLEXITY! 400 trillion years to crack! Untouchable! 🌵⏳",
              "incorrect": "BEEP BOOP! Mathematical length creates astronomical entropy that defies brute-force attacks!"
            }
          },
          {
            "id": "q-ch6-l1-7",
            "type": "tap_correct",
            "emoji": "📲",
            "question": "How does Two-Factor Authentication (2FA) protect your account even if a hacker steals your password?",
            "options": [
              { "id": "q7-a", "text": "It sends a police car to the hacker's house automatically 🚓", "correct": False, "feedback": "2FA is digital cryptography, not a police siren!" },
              { "id": "q7-b", "text": "It requires a secondary verification deadbolt (a one-time code sent to your physical phone) that the remote hacker does not have! 📲🛡️", "correct": True, "emoji": "✅", "feedback": "🌟 THE DIGITAL DEADBOLT! Even with the password, the intruder is locked out without your physical device!" },
              { "id": "q7-c", "text": "It deletes your account permanently so nobody can use it", "correct": False, "feedback": "Your account stays safe and intact!" },
              { "id": "q7-d", "text": "It tells the hacker your secret password", "correct": False, "feedback": "It protects your password!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ 2FA DEADBOLT MASTER! Password + Physical Device = Impenetrable defense! 🛡️🔑",
              "incorrect": "BEEP BOOP! 2FA requires a one-time code from your physical device, blocking remote password thieves!"
            }
          },
          {
            "id": "q-ch6-l1-8",
            "type": "tap_correct",
            "emoji": "📡",
            "question": "What dangerous mistake do many families make with their home Wi-Fi router?",
            "options": [
              { "id": "q8-a", "text": "Painting the router box blue", "correct": False, "feedback": "Paint color doesn't affect wireless security!" },
              { "id": "q8-b", "text": "Leaving the factory default admin credentials set to 'admin/admin', allowing unauthorized neighbors to control the network! 📡🚩", "correct": True, "emoji": "✅", "feedback": "🌟 EXACTLY! Default router credentials are well-known vulnerabilities that must be changed immediately!" },
              { "id": "q8-c", "text": "Turning the router off during lightning storms ⚡", "correct": False, "feedback": "Protecting electronics during storms is a safe hardware habit!" },
              { "id": "q8-d", "text": "Using a router that has flashing lights", "correct": False, "feedback": "All routers have diagnostic indicator lights!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ HOME WI-FI FORTIFIED! Change 'admin/admin' to a strong passphrase today! 📡🏠",
              "incorrect": "BEEP BOOP! Leaving factory default admin credentials allows unauthorized access to home networks!"
            }
          },
          {
            "id": "q-ch6-l1-9",
            "type": "tap_correct",
            "emoji": "✈️",
            "question": "What is a simple, effective way to stop free offline games from tracking your location and showing ad pop-ups?",
            "options": [
              { "id": "q9-a", "text": "Throw the phone in the freezer", "correct": False, "feedback": "Freezing damages the battery and screen!" },
              { "id": "q9-b", "text": "Switch the phone to Airplane Mode or turn off Wi-Fi/Data while playing single-player games! ✈️🎮", "correct": True, "emoji": "✅", "feedback": "🌟 AIRPLANE MODE HACK! Without an internet connection, ad trackers cannot load and telemetry is stopped!" },
              { "id": "q9-c", "text": "Press the screen with three fingers simultaneously", "correct": False, "feedback": "Screen gestures don't stop network telemetry!" },
              { "id": "q9-d", "text": "Uninstall the operating system", "correct": False, "feedback": "You need the operating system to run your phone!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ AIRPLANE HACK CHAMPION! No internet = zero ads and zero telemetry! ✈️🎮",
              "incorrect": "BEEP BOOP! Playing offline in Airplane Mode cuts off telemetry and stops ad trackers!"
            }
          },
          {
            "id": "q-ch6-l1-10",
            "type": "tap_correct",
            "emoji": "📱",
            "question": "In the hands-on activity, what is the name of the real-world privacy inspection you conduct?",
            "options": [
              { "id": "q10-a", "text": "The Battery Destroyer Challenge 🔋", "correct": False, "feedback": "We protect battery and privacy, not destroy it!" },
              { "id": "q10-b", "text": "Mobile Permissions Audit Inspector 📱🕵️‍♂️", "correct": True, "emoji": "✅", "feedback": "🌟 BINGO! 'Mobile Permissions Audit Inspector' is where you audit permissions and lock down your digital perimeter!" },
              { "id": "q10-c", "text": "The Flashlight Buying Contest 🔦", "correct": False, "feedback": "We avoid suspicious flashlight apps!" },
              { "id": "q10-d", "text": "The Social Media Follower Race 🏃‍♂️", "correct": False, "feedback": "This lesson is about data privacy, not follower counts!" }
            ],
            "points": 10,
            "buddyFeedback": {
              "correct": "BEEP BOOP! ⭐ 100% PERFECT SCORE! You are an Official Chief Information Security Officer of Class 6! 🛡️👑🌟",
              "incorrect": "BEEP BOOP! Remember: The activity is called 'Mobile Permissions Audit Inspector'!"
            }
          }
        ]
      },
      "resources": [
        {
          "title": "Interactive Mobile Permissions Audit Guide 📱🔍",
          "type": "Interactive Web Tool",
          "url": "https://kids-learning.ai/permissions-inspector",
          "description": "Step-by-step interactive simulator showing students how to audit Android and iOS settings to revoke risky permissions."
        },
        {
          "title": "Passphrase Entropy Calculator & Dice Roller 🗝️🎲",
          "type": "Cybersecurity Tool",
          "url": "https://kids-learning.ai/passphrase-dice-vault",
          "description": "Learn the mathematics of entropy by rolling digital word dice to build uncrackable 4-word passphrases."
        },
        {
          "title": "Two-Factor Authentication Setup Guide for Students 📲🛡️",
          "type": "Printable Guide",
          "url": "https://kids-learning.ai/2fa-student-setup.pdf",
          "description": "A visual step-by-step checklist for configuring 2FA on school Google Workspace, Microsoft 365, and gaming accounts."
        },
        {
          "title": "Parent & Family Guide: Home Wi-Fi Network Fortification 📡🏠",
          "type": "Family Security Handbook",
          "url": "https://kids-learning.ai/home-wifi-fortification.pdf",
          "description": "A non-technical, family-friendly guide for changing default router admin credentials and securing home wireless networks."
        }
      ]
    }
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Generated {target_path} successfully!")
    
    # Read back and stats
    with open(target_path, "r", encoding="utf-8") as f:
        content = f.read()
        lines = len(content.splitlines())
        words = len(content.split())
        print(f"Total Lines: {lines}")
        print(f"Total Words: {words}")
        print(f"Total Bytes: {len(content.encode('utf-8'))}")

if __name__ == "__main__":
    build_lesson()
