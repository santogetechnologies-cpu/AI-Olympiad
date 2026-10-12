# Class 6 • Chapter 6: Responsible AI
## Lesson 1: Protect Your Data

**Syllabus Reference:** Class 6, Chapter 6 (Responsible AI) — Lesson 1: *Protect Your Data*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Identify and categorize Personally Identifiable Information (PII)** into sensitive and non-sensitive tiers.
2. **Explain how digital footprints and behavioral tracking cookies** are collected by online platforms to build AI advertising profiles.
3. **Audit smartphone and application permissions**, identifying predatory access requests (e.g., a flashlight app demanding GPS location and microphone access).
4. **Evaluate the privacy trade-offs of "free" AI services**, recognizing that user data often serves as the economic currency.
5. **Develop a Python data sanitizer script** that automatically detects and masks sensitive personal identifiers in raw text.

#### Prerequisite Knowledge
- Familiarity with common online apps, social media, smartphones, and mobile app stores.
- Basic understanding of how AI models consume data to find patterns.

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Black-Box Defense: The Data Vault*  
> **Mission Briefing:** Alert at Neo-Olympia Middle School!  
> A trendy new viral smartphone mobile game called *"Mega-Pet Virtual World"* has swept through the school. To unlock a free sparkling pet costume, the app asks students to click *"Accept All Permissions"*.  
> Hidden inside the app's fine print, predatory AI data brokers are harvesting every student’s live GPS location, reading their private contact lists, listening through background microphones, and selling the data to ad networks to target them with psychological marketing!  
> You have been designated the school’s **Chief Cybersecurity Guardian**! Your mission is to deploy the **Cyber Privacy Shield**, audit the school’s digital devices, identify unauthorized data leaks, revoke predatory permissions, and sanitize personal student databases before confidential information is permanently compromised!

---

### 3. Core Concept Explanations & Privacy Architecture

#### What is Personally Identifiable Information (PII)?
PII refers to any piece of data that can be used—alone or in combination with other data—to identify, contact, or locate a specific individual in the real world:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE TWO TIERS OF PERSONAL DATA (PII)                 │
├───────────────────────────────────┬────────────────────────────────────┤
│ TIER 1: HIGH-RISK SENSITIVE PII   │ TIER 2: GENERAL / ANONYMIZED DATA  │
│ • Full legal name & birth date    │ • Favorite video game genre        │
│ • Home address & GPS coordinates  │ • Generalized city / timezone      │
│ • Passwords & biometric face scans│ • Aggregated class test averages   │
│ • Phone number & medical records  │ • General hobby preferences        │
└───────────────────────────────────┴────────────────────────────────────┘
```

#### Why Do Tech Companies Want Your Data?
When a mobile app or AI chatbot is completely "free", remember the golden rule of the digital internet:
> **"If you are not paying for the product, YOU (and your personal data) are the product!"**

1. **AI Behavioral Profiling:** Every video you watch, link you click, and word you type is processed by machine learning recommendation algorithms to predict your emotional state, attention span, and purchasing impulses.
2. **Targeted Micro-Advertising:** Advertisers pay billions of dollars to show custom ads to teenagers at the exact moment their AI models predict they feel hungry, bored, or self-conscious.
3. **Training Next-Gen Models:** Many free chatbots use your private conversation logs, homework drafts, and uploaded family photos to train their next generation of foundation models without paying you a dime.

#### App Permission Auditing: Necessary vs Predatory

| Mobile App Type | Legitimate Necessary Permission | Suspicious / Predatory Permission |
| :--- | :--- | :--- |
| **Navigation & Maps** | GPS Fine Location (to calculate driving directions). | Reading entire private SMS text message inbox. |
| **Video Chat App** | Front Camera & Microphone (to broadcast your video/voice). | Continuous background location when the app is closed. |
| **Simple Flashlight Tool**| Camera Flash Hardware (to turn on the LED diode). | Full contact book, microphone, and precise GPS location! |
| **AI Homework Tutor** | Keyboard text input or optional camera photo of math problem. | Access to health fitness tracking data and personal photo gallery. |

---

### 4. Guided Reasoning & Experiment

#### Interactive Investigation: The "Harmless Quiz" Trap
You see a fun quiz on social media: *"Find out your magical wizard name!"*
- Question 1: What was the name of your first childhood pet?
- Question 2: What is your mother's maiden name?
- Question 3: What street did you grow up on?
- Question 4: What is your birth month and day?

**Guided Detective Analysis:**
1. *Does the quiz really care about magical wizards?*
   - Absolutely not! These exact four questions are the most common **Security Recovery Questions** used by banks, email providers, and gaming accounts to reset forgotten passwords!
2. *The Data Harvest:* Fraudsters use fun, colorful games to harvest personal identity answers from thousands of children and adults. By cross-referencing your username, they can use your quiz answers to break into your private email accounts!
3. **Golden Privacy Rule:** Never answer personal security questions on public forums or casual entertainment websites.

---

### 5. Interactive Game Specification

#### Game Title: *The Cyber Privacy Shield*
- **Game Engine Type:** App Security Audit & Permission Defense Lab.
- **Educational Objective:** Hands-on ability to inspect application manifest files, evaluate privacy policies, and revoke predatory hardware permissions.

#### Game Rules & Mechanics:
1. **The Device Inspector Dashboard:**
   - The student is presented with 5 newly downloaded mobile apps on a virtual tablet:
     - App 1: *Super-Torch Flashlight* (Demands: Camera, Contacts, GPS, Microphone).
     - App 2: *Astro-Math Calculator* (Demands: Keyboard only).
     - App 3: *Voice Voice-Changer* (Demands: Microphone, Storage; requests GPS: Deny!).
     - App 4: *Secret Diary AI* (Demands: All photos, Live GPS, Social media login).
     - App 5: *Puzzle Runner* (Demands: Bluetooth, Contacts, Background GPS).
2. **Player Mission (The Audit):**
   - For each app, the player must toggle permissions: `ALLOW`, `ALLOW ONLY WHILE USING`, or `PERMANENTLY REVOKE`.
   - Player inspects the Privacy Policy summary. If an app shares data with "Third-Party Ad Networks", player must flag it as *High Risk*.
3. **The Data Breach Simulation:**
   - The game simulates an external hacker attack targeting the device.
   - If the player revoked predatory permissions on *Super-Torch*, the hacker finds an empty, encrypted vault: Breach Blocked! (+100 XP).
   - If the player left *Secret Diary AI* wide open, student diary entries leak onto the dark web: Breach Penalty (-150 XP).

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Data Guardian* (Successfully audited all 5 apps)
  - 🥈 *Zero-Leak Defender* (Revoked all predatory permissions with zero false allowances)
  - 🥇 *Chief Information Security Officer* (Secured the school tablet fleet with 100% privacy compliance)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Personal Digital Footprint Audit*
**Objective:** Perform a personal privacy audit on your own mobile device or school computer.

**Requirements:**
1. **Settings Inspection:** Open your device's Settings ➔ Privacy ➔ Permission Manager.
2. **Find One Suspicious Permission:** Find at least one app that has access to your Location or Microphone that doesn't actually need it to perform its main function. Revoke that permission.
3. **Draft a 3-Rule Family Privacy Protocol:**
   - Rule 1: What personal details are forbidden from being posted on public social media?
   - Rule 2: How often should accounts update their master passwords?
   - Rule 3: What step must family members take before installing a new "free" app?

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement a Python PII Sanitizer script that automatically detects and masks email addresses, phone numbers, and identity codes before text is sent to an external AI server.

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 6 LESSON 1
# CYBER PRIVACY SHIELD: AUTOMATED PII DETECTION & MASKING ENGINE
# =====================================================================

import re

def sanitize_student_data(raw_text):
    """
    Scans incoming text for sensitive PII patterns and replaces them with
    secure redaction tokens before processing by public AI models.
    """
    sanitized = raw_text
    redactions_made = []
    
    # 1. Detect and mask Email Addresses
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    emails_found = re.findall(email_pattern, sanitized)
    if emails_found:
        for email in emails_found:
            sanitized = sanitized.replace(email, "[REDACTED_EMAIL]")
            redactions_made.append(f"Email masked: {email}")
            
    # 2. Detect and mask Phone Numbers (e.g., +91-9876543210 or 10-digit numbers)
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones_found = re.findall(phone_pattern, sanitized)
    # Match full phone number string
    full_phones = [m.group() for m in re.finditer(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', raw_text)]
    for phone in full_phones:
        sanitized = sanitized.replace(phone, "[REDACTED_PHONE]")
        redactions_made.append(f"Phone number masked: {phone}")
        
    # 3. Detect and mask Student ID / Social Security formats (e.g., STU-94821)
    id_pattern = r'STU-\d{5}'
    ids_found = re.findall(id_pattern, sanitized)
    for s_id in ids_found:
        sanitized = sanitized.replace(s_id, "[REDACTED_STUDENT_ID]")
        redactions_made.append(f"Student ID masked: {s_id}")

    return sanitized, redactions_made

# ----------------- SIMULATED UNGUARDED STUDENT SUBMISSION -----------------
incoming_student_prompt = (
    "Hi AI tutor! My name is Rohan Sharma, student ID STU-55421. "
    "Please check my science homework. If you have questions, email my mother at "
    "priya.sharma@domain.com or call our home at 555-839-2041. We live near 4th Avenue."
)

print("=== CYBER PRIVACY SHIELD SANITIZATION AUDIT ===\n")
print("Original Raw Prompt with Leaked PII:")
print(f"'{incoming_student_prompt}'\n")

clean_prompt, audit_log = sanitize_student_data(incoming_student_prompt)

print("Protected Output Ready for AI Cloud Model:")
print(f"'{clean_prompt}'\n")

print("Security Audit Actions Taken:")
for action in audit_log:
    print(f"  🛡️ {action}")
```

#### Expected Program Output:
```text
=== CYBER PRIVACY SHIELD SANITIZATION AUDIT ===

Original Raw Prompt with Leaked PII:
'Hi AI tutor! My name is Rohan Sharma, student ID STU-55421. Please check my science homework. If you have questions, email my mother at priya.sharma@domain.com or call our home at 555-839-2041. We live near 4th Avenue.'

Protected Output Ready for AI Cloud Model:
'Hi AI tutor! My name is Rohan Sharma, student ID [REDACTED_STUDENT_ID]. Please check my science homework. If you have questions, email my mother at [REDACTED_EMAIL] or call our home at [REDACTED_PHONE]. We live near 4th Avenue.'

Security Audit Actions Taken:
  🛡️ Email masked: priya.sharma@domain.com
  🛡️ Phone number masked: 555-839-2041
  🛡️ Student ID masked: STU-55421
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Data Privacy Core Definitions)
Which of the following items of data is classified as **Sensitive Personally Identifiable Information (PII)** that should **never** be shared with an untrusted online chatbot?
- **A)** Your home street address and private biometric fingerprint scan.
- **B)** The current time in Greenwich Mean Time (GMT).
- **C)** The scientific boiling point of pure water (100°C).
- **D)** The name of the capital city of Japan.
- **Correct Answer:** **A**
- **Explanation:** Sensitive PII includes personal information that uniquely identifies a physical person and poses significant safety, identity theft, or physical security risks if compromised—such as home addresses, passwords, social security numbers, and biometric records.

#### Question 2 (Mobile Security & App Permissions)
A free offline wallpaper app requests access to: `Microphone`, `Phone Call Logs`, and `Fine GPS Location`. The developer explains in small print that this allows them to "deliver personalized wallpaper colors". What is the most accurate cybersecurity assessment?
- **A)** The app is completely safe because wallpapers look better when the microphone is on.
- **B)** This is predatory over-permissioning designed to harvest sensitive user behavior and surveillance data to monetize through third-party ad brokers.
- **C)** All mobile apps must have GPS access to run.
- **D)** Wallpaper apps use phone call logs to generate computer graphics.
- **Correct Answer:** **B**
- **Explanation:** An offline image display app has zero legitimate technical requirement to access audio microphones, private call logs, or real-time GPS coordinates. This is a classic indicator of **malicious surveillance or data-harvesting spyware**.

#### Question 3 (Economic Business Models of Tech)
What does the economic axiom *"If the service is free, you are the product"* imply in the context of modern AI web platforms?
- **A)** The website will mail you free computer hardware in the post.
- **B)** Free services often monetize user attention, private conversation logs, behavioral patterns, and personal data by selling targeted advertising or licensing datasets to third parties.
- **C)** Free websites are run exclusively by charitable governments.
- **D)** You will be hired as an employee of the company automatically.
- **Correct Answer:** **B**
- **Explanation:** Operating high-speed AI servers costs millions of dollars in electricity and hardware. When platforms offer these services for free without subscription fees, their primary revenue model frequently involves harvesting, aggregating, and monetizing user behavioral profiles and training data.

#### Question 4 (Higher-Order Scenario: Password Security & AI Cracking)
A user creates a password: `Password123!`. A hacker uses an AI-powered dictionary attack tool that tests 50 billion combinations per second. Why will this password be cracked in less than 0.1 seconds?
- **A)** The computer is using magic.
- **B)** The password uses an extremely common dictionary word, predictable sequential numbers (`123`), and a standard exclamation mark, which are the exact top statistical patterns tested first by password-cracking algorithms.
- **C)** All passwords are cracked in 0.1 seconds regardless of complexity.
- **D)** The exclamation mark disables computer encryption.
- **Correct Answer:** **B**
- **Explanation:** Machine learning cracking tools are trained on billions of leaked passwords. They prioritize the most statistically prevalent human habits: dictionary words, simple letter substitutions (e.g., `P@ssword`), and sequential digits (`123`). Robust security requires long, random passphrases (e.g., `purple-galaxy-dolphin-tractor`).

#### Question 5 (Data Rights & Legal Compliance)
What legal right gives citizens the power to request that an online platform permanently erase all their stored personal profile data, conversation histories, and uploaded photos from corporate databases?
- **A)** The Right to Free Video Streaming
- **B)** The Right to Erasure / "The Right to be Forgotten" (enshrined in privacy laws like GDPR and DPDP)
- **C)** The Right to Infinite Computer Memory
- **D)** The Right to Unlimited Software Downloads
- **Correct Answer:** **B**
- **Explanation:** Modern data protection frameworks (such as Europe's **GDPR** and India's **DPDP Act**) grant users sovereign control over their data, including the **Right to Erasure** (often called the Right to be Forgotten), legally obligating companies to purge personal records upon request.

---

### 9. Responsible AI & Ethical Reflection

#### The Permanence of the Digital Footprint
Every photo uploaded, comment posted, and game played leaves an indelible digital trail:
- **The Internet Never Truly Forgets:** Even if you delete a post 5 minutes later, automated web bots, archival crawlers, or other users may have already screenshotted and archived it into massive training datasets.
- **Mindful Sharing:** Protect your friends and family as fiercely as you protect yourself. Never post photos or private stories about classmates without their explicit, enthusiastic consent.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: PII Classification** | Correctly differentiates Sensitive PII from Anonymized Data. | 100 XP | Privacy Scout |
| **Pillar 2: Shield Defense Game** | Audits all 5 apps and successfully prevents the simulated data breach. | 100 XP | Shield Defender |
| **Pillar 3: Python Coding** | Runs the PII redaction engine and demonstrates regular expression masking. | 100 XP | Security Coder |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad data privacy and security questions. | 100 XP | Olympiad Scholar |
| **Bonus: Device Audit** | Submits a completed 3-rule family digital privacy protocol. | 50 XP | Chief Privacy Officer |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
