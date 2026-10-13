# AI GENERATION PROMPT TEMPLATE

## Instructions for Your Team

Copy the prompt below, replace the placeholders, and paste into ChatGPT/Claude. Save the output as a JSON file.

---

## PROMPT TO COPY:

Generate a complete lesson JSON file following this exact structure. The lesson should be approximately 12,000 words total.

**Lesson Details:**
- Level: [LEVEL_NAME] (Junior/Middle/Senior/Super Senior)
- Class: [CLASS_NAME] (e.g., Class 3, Class 6, UG Year 1)
- Chapter: [CHAPTER_TITLE] (e.g., AI Basics, Communicate with AI)
- Lesson Title: [LESSON_TITLE]
- Filename: [FILENAME] (e.g., junior-class3-ch1-l1.json)

**Content Requirements:**
- Use VERY SIMPLE language suitable for the age group
- Use real-life everyday examples (home, school, toys, food, shopping)
- NO technical coding - only overview with real-world comparisons
- Make it relatable to daily life
- For younger ages (Class 3-5): Think LKG-level simplicity
- For Classes 6-12: Keep it simple, practical, no deep tech
- For UG-PG: Simple overview, real-world applications only

**JSON Structure:**

```json
{
  "lessonId": "[LESSON_ID]",
  "title": "[LESSON_TITLE]",
  "level": "[LEVEL]",
  "class": "[CLASS]",
  "chapter": "[CHAPTER]",
  "introduction": {
    "overview": "[2-3 paragraphs introducing the lesson topic with simple real-life examples]",
    "learningObjectives": [
      "[Objective 1]",
      "[Objective 2]",
      "[Objective 3]"
    ],
    "duration": "[Estimated time like 45 mins]"
  },
  "sections": [
    {
      "sectionId": "section1",
      "title": "[Section Title]",
      "content": "[4-5 paragraphs with simple explanations and real-world examples]",
      "examples": [
        {
          "title": "[Example Title]",
          "description": "[2-3 paragraphs explaining with daily life situations]",
          "realLifeScenario": "[Describe how this works in everyday life - shopping, playing, eating, etc.]"
        }
      ],
      "keyPoints": [
        "[Key point 1]",
        "[Key point 2]",
        "[Key point 3]"
      ]
    },
    {
      "sectionId": "section2",
      "title": "[Section Title]",
      "content": "[4-5 paragraphs]",
      "examples": [
        {
          "title": "[Example Title]",
          "description": "[2-3 paragraphs]",
          "realLifeScenario": "[Daily life example]"
        }
      ],
      "keyPoints": [
        "[Key point 1]",
        "[Key point 2]",
        "[Key point 3]"
      ]
    },
    {
      "sectionId": "section3",
      "title": "[Section Title]",
      "content": "[4-5 paragraphs]",
      "examples": [
        {
          "title": "[Example Title]",
          "description": "[2-3 paragraphs]",
          "realLifeScenario": "[Daily life example]"
        }
      ],
      "keyPoints": [
        "[Key point 1]",
        "[Key point 2]",
        "[Key point 3]"
      ]
    }
  ],
  "activities": [
    {
      "activityId": "activity1",
      "title": "[Activity Title]",
      "description": "[2-3 paragraphs describing a simple, fun activity]",
      "instructions": [
        "[Step 1]",
        "[Step 2]",
        "[Step 3]"
      ],
      "materials": "[What students need - paper, pencils, toys, etc.]",
      "duration": "[Time needed]"
    },
    {
      "activityId": "activity2",
      "title": "[Activity Title]",
      "description": "[2-3 paragraphs]",
      "instructions": [
        "[Step 1]",
        "[Step 2]",
        "[Step 3]"
      ],
      "materials": "[Materials needed]",
      "duration": "[Time needed]"
    }
  ],
  "discussion": {
    "questions": [
      "[Discussion question 1 that relates to daily life]",
      "[Discussion question 2]",
      "[Discussion question 3]"
    ],
    "reflectionPrompts": [
      "[Reflection prompt 1]",
      "[Reflection prompt 2]"
    ]
  },
  "summary": {
    "keyTakeaways": [
      "[Takeaway 1 - simple one-liner]",
      "[Takeaway 2]",
      "[Takeaway 3]"
    ],
    "recap": "[2-3 paragraphs summarizing the lesson with encouraging words]"
  },
  "additionalResources": [
    {
      "type": "video",
      "title": "[Resource Title]",
      "description": "[Brief description]",
      "url": "[URL or 'TBD']"
    },
    {
      "type": "article",
      "title": "[Resource Title]",
      "description": "[Brief description]",
      "url": "[URL or 'TBD']"
    }
  ],
  "assessmentQuestions": [
    {
      "questionId": "q1",
      "question": "[Simple question about the lesson]",
      "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
      "correctAnswer": "[Correct option]",
      "explanation": "[Why this is correct, in simple terms]"
    },
    {
      "questionId": "q2",
      "question": "[Question 2]",
      "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
      "correctAnswer": "[Correct option]",
      "explanation": "[Explanation]"
    },
    {
      "questionId": "q3",
      "question": "[Question 3]",
      "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
      "correctAnswer": "[Correct option]",
      "explanation": "[Explanation]"
    }
  ],
  "teacherNotes": {
    "preparation": "[What teachers should prepare before the lesson]",
    "tips": [
      "[Teaching tip 1]",
      "[Teaching tip 2]",
      "[Teaching tip 3]"
    ],
    "commonMisconceptions": [
      "[Misconception 1 and how to address it]",
      "[Misconception 2 and how to address it]"
    ]
  },
  "metadata": {
    "createdDate": "2026-10-13",
    "lastModified": "2026-10-13",
    "version": "1.0",
    "author": "AI Olympiad Team",
    "tags": ["[tag1]", "[tag2]", "[tag3]"]
  }
}
```

Generate the complete JSON with all fields filled with appropriate content. Make sure total word count is approximately 12,000 words across all sections.

---

## HOW TO USE:

1. Copy the prompt above
2. Replace placeholders:
   - [LEVEL_NAME]: Junior, Middle, Senior, or Super Senior
   - [CLASS_NAME]: Class 3, Class 6, UG Year 1, etc.
   - [CHAPTER_TITLE]: AI Basics, Communicate with AI, etc.
   - [LESSON_TITLE]: From your assigned list
   - [FILENAME]: From your assigned list
   - [LESSON_ID]: e.g., "l1", "l2"
   - [LEVEL]: "junior", "middle", "senior", "supersenior"
   - [CLASS]: "class3", "class6", "ug1", etc.
   - [CHAPTER]: "ch1", "ch2", etc.

3. Paste into ChatGPT or Claude
4. Copy the JSON output
5. Save as the filename from your assignment (e.g., junior-class3-ch1-l1.json)
6. Place in correct folder:
   - Junior lessons → public/content/junior/
   - Middle lessons → public/content/middle/
   - Senior lessons → public/content/senior/
   - Super Senior lessons → public/content/supersenior/

7. Move to next lesson!

**Time estimate: 2-3 minutes per lesson**

---

## EXAMPLE FILLED PROMPT:

Generate a complete lesson JSON file following this exact structure. The lesson should be approximately 12,000 words total.

**Lesson Details:**
- Level: Junior
- Class: Class 3
- Chapter: AI Basics
- Lesson Title: What is AI?
- Filename: junior-class3-ch1-l1.json

**Content Requirements:**
- Use VERY SIMPLE language suitable for Class 3 (age 8)
- Use real-life everyday examples (toys, games, cartoons, family)
- NO technical coding - only overview with real-world comparisons
- Make it relatable to an 8-year-old's daily life
- Think LKG-level simplicity

[... rest of JSON structure ...]

