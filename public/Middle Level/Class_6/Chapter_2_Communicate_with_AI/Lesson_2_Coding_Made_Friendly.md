# Class 6 • Chapter 2: Communicate with AI
## Lesson 2: Coding Made Friendly

**Syllabus Reference:** Class 6, Chapter 2 (Communicate with AI) — Lesson 2: *Coding Made Friendly*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain the concept of Variables** as labeled memory containers that store different types of data (strings, integers, floats, booleans).
2. **Collect and sanitize User Input** using Python's `input()` function and type casting (`int()`, `float()`).
3. **Format Dynamic Outputs** using modern Python f-strings to build polite, conversational interactions.
4. **Identify and resolve TypeErrors** caused by mixing incompatible data types (e.g., adding text to numbers).
5. **Construct an interactive console-based AI Study Companion** that delivers personalized, empathetic responses.

#### Prerequisite Knowledge
- Basic understanding of pseudocode and algorithmic planning (Lesson 1).
- Familiarity with keyboard input and console screen output.

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Project Sparky: The Friendly School Guide*  
> **Mission Briefing:** It is the first day of the academic year at Neo-Olympia Academy, and hundreds of nervous new students have arrived!  
> The school robot, *Sparky*, was meant to welcome them, but its software was wiped clean during a memory upgrade. Right now, if a student speaks to Sparky, it outputs cold, robotic binary gibberish: `ERROR 404: IDENTITY UNKNOWN`.  
> Your mission is to reprogram Sparky to become **Friendly, Welcoming, and Helpful**! You must teach Sparky to ask for the student's name, identify their favorite subject, calculate how many days remain until the Science Olympiad, and offer encouraging words with warm, human-friendly dialogue.

---

### 3. Core Concept Explanations & Real-World Examples

#### What is a Variable?
Imagine your school locker. On the outside of the locker is a label with your name. Inside the locker, you can place your heavy math textbook, your gym shoes, or your lunchbox. Next week, you can take out the textbook and replace it with an art folder.

In programming:
- **Variable Name:** The label on the locker (e.g., `student_name`, `age`, `score`).
- **Variable Value:** The contents stored inside (e.g., `"Aarav"`, `12`, `98.5`).
- **Assignment Operator (`=`):** The action of placing a value into the labeled locker.

```python
# Creating variables in Python
student_name = "Maya"   # A string of text (str)
age = 11                # A whole number / integer (int)
quiz_score = 94.5       # A decimal number / float (float)
is_enrolled = True      # A boolean flag (bool)
```

#### The Four Core Data Types in Python

| Data Type Name | Python Code Keyword | What It Stores | Real-World Examples |
| :---: | :---: | :--- | :--- |
| **String** | `str` | Text enclosed in matching quotes (`"..."` or `'...'`). | `"Rohan"`, `"Grade 6"`, `"Blue"` |
| **Integer** | `int` | Whole numbers without any decimal point (positive or negative). | `12`, `0`, `-5`, `1000` |
| **Float** | `float` | Numbers that contain a fractional or decimal point. | `98.6`, `3.14159`, `0.75` |
| **Boolean** | `bool` | Binary truth states: exactly `True` or `False`. | `True`, `False` |

#### The Magic of Friendly Formatting: Python f-Strings
In older programming languages, joining text and variables was clunky and prone to errors. In modern Python, we use **f-strings** (formatted string literals):

```python
name = "Diya"
grade = 6
target_score = 95

# The Friendly f-String Way:
message = f"Welcome aboard, {name}! You are doing great in Grade {grade} toward your {target_score}% goal!"
print(message)
```

Notice the lowercase `f` placed directly before the opening quotation mark! Anything inside `{curly_brackets}` is evaluated dynamically by Python and seamlessly converted into beautiful text.

---

### 4. Guided Reasoning & Experiment

#### Interactive Experiment: The "Sneaky String Addition" Trap
Type or examine the following short Python script:

```python
num1 = input("Enter first number: ")  # User types 5
num2 = input("Enter second number: ")  # User types 7
total = num1 + num2
print(f"The total is: {total}")
```

**What do you expect the program to print?**
- You might think it prints: `The total is: 12`.
- But Python actually prints: `The total is: 57`!

**Why did this happen? (Guided Investigation):**
1. Python's `input()` function **ALWAYS** captures whatever the user types as a **String of Text (`str`)**, even if they type numbers!
2. When you use the `+` operator between two strings, Python performs **Concatenation** (gluing text together), not mathematical addition! `"5" + "7"` becomes `"57"`.
3. **The Fix (Type Casting):** We must convert the string into an integer using `int()`:
   ```python
   num1 = int(input("Enter first number: "))
   num2 = int(input("Enter second number: "))
   total = num1 + num2   # Now mathematically equals 12!
   ```

---

### 5. Interactive Game Specification

#### Game Title: *The Chat-Companion Sandbox*
- **Game Engine Type:** Dialogue Tree Builder & Tone Calibration Lab.
- **Educational Objective:** Hands-on application of dynamic user variables, branching empathy responses, and sanitizing user inputs.

#### Game Rules & Mechanics:
1. **The Sandbox Canvas:**
   - The student designs an avatar persona for Sparky: *The Encouraging Mentor*, *The Witty Explorer*, or *The Calm Zen Master*.
2. **Phase 1 (Variable Registration):**
   - The student creates 4 slots to store user data:
     - Slot A: `user_name` (Text)
     - Slot B: `mood_rating` (Scale 1 to 10)
     - Slot C: `favorite_olympiad_topic` (Options: Space, Robotics, Coding)
3. **Phase 2 (Dynamic Response Calibration):**
   - Students write dynamic f-string replies with conditional branching:
     - `IF mood_rating <= 4: Offer reassuring quote and a fun trivia fact.`
     - `IF mood_rating >= 8: Offer an advanced coding challenge puzzle.`
4. **Phase 3 (The Student Test Gauntlet):**
   - 5 simulated virtual students with different moods and names interact with the bot.
   - The system scores the bot on **Friendliness**, **Accuracy of Variable Insertion**, and **Crash Resistance** (handling when a student enters non-numeric text for their mood).

#### Scoring & Achievement:
- **Maximum XP:** 350 XP
- **Badges:**
  - 🥉 *Friendly Coder* (Zero program crashes)
  - 🥈 *Empathy Engineer* (Provided correct personalized responses for all 5 moods)
  - 🥇 *Master Companion Architect* (Implemented safe type-casting with friendly fallbacks)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Study Buddy Onboarding Bot*
**Objective:** Write a complete Python interactive onboarding assistant for your school study club.

**Specifications:**
1. Greet the user warmly and ask for their name.
2. Ask how many hours per week they currently study for the AI Olympiad.
3. Calculate their total study hours over the upcoming 6-month semester (assume 24 weeks).
4. Provide a personalized message using an f-string:
   - If total hours > 100: *"Outstanding dedication, {name}! You are well on your way to Gold Tier!"*
   - Otherwise: *"Great start, {name}! Increasing your study time by just 30 minutes a week will unlock Gold Tier!"*
5. Display a clean, formatted ASCII banner at the end of the session.

---

### 7. Python Coding Exercise (Runnable & Verified)

Here is the complete, runnable Python code for Sparky the Friendly AI Companion:

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 2 LESSON 2
# SPARKY: THE FRIENDLY CONVERSATIONAL AI COMPANION
# =====================================================================

def run_friendly_companion():
    print("=" * 55)
    print("🤖 HELLO! I AM SPARKY, YOUR AI OLYMPIAD COMPANION! 🤖")
    print("=" * 55)
    
    # 1. Collecting text input
    user_name = input("What should I call you, friend? ").strip()
    if not user_name:
        user_name = "Young Explorer"
        
    print(f"\nDelighted to meet you, {user_name}! Let's make learning fun today.")
    
    # 2. Collecting and type-casting numeric input safely
    while True:
        try:
            energy_level = int(input(f"On a scale of 1 to 10, how is your energy level right now, {user_name}? "))
            if 1 <= energy_level <= 10:
                break
            else:
                print("Please pick a number between 1 and 10!")
        except ValueError:
            print("Oops! Please enter a whole number, not words.")

    # 3. Personalized conditional response
    print("\n" + "-" * 40)
    if energy_level >= 8:
        print(f"🔥 WOW, {user_name}! Energy level {energy_level}/10 is unstoppable!")
        print("Recommendation: Tackle the advanced Python algorithmic quest today!")
    elif energy_level >= 5:
        print(f"✨ Great balance, {user_name}! A steady energy level of {energy_level}/10.")
        print("Recommendation: Review the Chapter 1 pattern recognition flashcards.")
    else:
        print(f"🍵 It's completely okay to feel low on energy, {user_name} ({energy_level}/10).")
        print("Recommendation: Take a 5-minute stretch, sip water, and enjoy a short AI comic!")
        
    print("-" * 40)
    print(f"Sparky is always in your corner, {user_name}. Keep shining!\n")

# Run the interactive companion
if __name__ == "__main__":
    run_friendly_companion()
```

#### Sample Simulated Interactive Run:
```text
=======================================================
🤖 HELLO! I AM SPARKY, YOUR AI OLYMPIAD COMPANION! 🤖
=======================================================
What should I call you, friend? Kavya

Delighted to meet you, Kavya! Let's make learning fun today.
On a scale of 1 to 10, how is your energy level right now, Kavya? 9

----------------------------------------
🔥 WOW, Kavya! Energy level 9/10 is unstoppable!
Recommendation: Tackle the advanced Python algorithmic quest today!
----------------------------------------
Sparky is always in your corner, Kavya. Keep shining!
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Data Types & Type Recognition)
In Python, what is the data type of the value stored in the variable `mystery_value = "2026"`?
- **A)** Integer (`int`)
- **B)** String (`str`)
- **C)** Float (`float`)
- **D)** Boolean (`bool`)
- **Correct Answer:** **B**
- **Explanation:** Any value enclosed in quotation marks (`"..."` or `'...'`) is recognized by Python as a **String (`str`)**, regardless of whether the characters inside represent numbers. For Python to treat it as a numerical integer, it must be written without quotes as `2026` or explicitly cast using `int("2026")`.

#### Question 2 (Variable Naming Conventions & Rules)
Which of the following is a **valid** and PEP-8 compliant variable name in Python?
- **A)** `2nd_student_score`
- **B)** `student-score`
- **C)** `student_score`
- **D)** `class`
- **Correct Answer:** **C**
- **Explanation:** Python variable naming rules:
  1. Cannot start with a number (invalidates A).
  2. Cannot contain hyphens/dashes, as Python interprets `-` as subtraction (invalidates B).
  3. Cannot be a reserved Python keyword (invalidates D, as `class` is a reserved keyword).
  4. `student_score` follows standard snake_case naming and is completely valid.

#### Question 3 (String Concatenation vs Arithmetic)
What will be displayed on the screen when the following Python code is executed?
```python
a = "AI"
b = "3"
print(a * int(b))
```
- **A)** `AI3`
- **B)** `AIAIAI`
- **C)** A TypeError crash
- **D)** `AI + AI + AI`
- **Correct Answer:** **B**
- **Explanation:** In Python, multiplying a string by an integer `n` performs **String Repetition**. Since `int(b)` converts `"3"` to the integer `3`, `"AI" * 3` produces the string `"AIAIAI"`.

#### Question 4 (Higher-Order Thinking: Debugging Crash)
A student runs this code in Python:
```python
user_age = input("Enter your age: ")
years_to_wait = 18 - user_age
print(f"You will vote in {years_to_wait} years.")
```
The program crashes with: `TypeError: unsupported operand type(s) for -: 'int' and 'str'`.  
How should Line 2 be rewritten to resolve this error permanently?
- **A)** `years_to_wait = 18 - str(user_age)`
- **B)** `years_to_wait = int(18) - user_age`
- **C)** `years_to_wait = 18 - int(user_age)`
- **D)** `years_to_wait = "18" - user_age`
- **Correct Answer:** **C**
- **Explanation:** `input()` returns a string. Python cannot perform mathematical subtraction between an integer (`18`) and a string (`user_age`). Converting `user_age` to an integer via `int(user_age)` allows the subtraction operation to succeed.

#### Question 5 (f-String Syntax Mastery)
Which of the following is the correct syntax to print the sentence: *"Kabir scored 98 in Python"* assuming `name = "Kabir"` and `score = 98`?
- **A)** `print("f{name} scored {score} in Python")`
- **B)** `print(f"{name} scored {score} in Python")`
- **C)** `print(f"name scored score in Python")`
- **D)** `print({name} + "scored" + {score} + "in Python")`
- **Correct Answer:** **B**
- **Explanation:** In Python f-string syntax, the letter `f` must precede the opening quote: `f"..."`. The variable names must be wrapped inside curly braces `{name}` and `{score}` so that Python replaces them with their actual stored values.

---

### 9. Responsible AI & Ethical Reflection

#### Chatbot Safety: Guarding Personal Private Data
When designing conversational bots for people:
- **Never Solicit Sensitive PII:** A friendly bot should never ask users for passwords, home addresses, phone numbers, or credit card information.
- **Handling Frustrated Users:** If a user expresses extreme frustration, grief, or distress, a responsible bot must not give dismissive or artificial answers; it should provide supportive, neutral responses and recommend speaking with a trusted adult, parent, or teacher.
- **Transparency:** The bot must clearly identify itself as an artificial software assistant, never deceiving users into believing it is a real human being.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Data Type Fluency** | Correctly classifies variables into str, int, float, and bool. | 100 XP | Variable Wizard |
| **Pillar 2: Sandbox Dialogue** | Successfully builds a 3-turn friendly dialogue without crashes. | 100 XP | Dialogue Designer |
| **Pillar 3: Python Coding** | Runs the Sparky companion script and implements robust input handling. | 100 XP | Python Craftsman |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad questions with clear justifications. | 100 XP | Olympiad Scholar |
| **Bonus: Study Buddy Project** | Produces a fully functional 6-month study hours projection script. | 50 XP | Master Companion |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
