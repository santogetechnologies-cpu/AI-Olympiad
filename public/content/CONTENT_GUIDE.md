# AI Olympiad — Curriculum JSON Content Guide

## Folder Structure
```
public/content/
├── class3/curriculum.json    ← Junior (built into app code)
├── class4/curriculum.json
├── class5/curriculum.json
├── class6/curriculum.json    ← REFERENCE COMPLETE ✅
├── class7/curriculum.json    ← To be filled
├── class8/curriculum.json
├── class9/curriculum.json
├── class10/curriculum.json
├── class11/curriculum.json
├── class12/curriculum.json
├── ug1/curriculum.json
├── ug2/curriculum.json
├── ug3/curriculum.json
├── ug4/curriculum.json
├── pg1/curriculum.json
└── pg2/curriculum.json
```

## How the App Uses These Files
- On app load, it fetches `/content/{gradeKey}/curriculum.json`
- If the file exists, it builds ALL lesson screens from the JSON
- If the file is missing, the app falls back to the built-in template
- No code changes needed — just add/update JSON files!

## JSON Schema (copy this for each grade)

```json
{
  "gradeKey": "class7",
  "gradeTitle": "Class 7",
  "mascot": "Nova",
  "mascotEmoji": "⚡",
  "chapters": [
    {
      "chapterNumber": 1,
      "chapterTitle": "AI Basics",
      "canonicalKey": "discover",
      "lessons": [
        {
          "lessonNumber": 1,
          "monthNumber": 1,
          "lessonTitle": "Your lesson title here",
          "intro": "2 sentences — what will students learn and why it matters in daily life.",
          "learnPoints": [
            "Point 1 — real-life example, max 20 words",
            "Point 2 — real-life example, max 20 words",
            "Point 3 — real-life example, max 20 words"
          ],
          "auraScript": "What Aura AI says aloud — 3-4 sentences, very simple, like talking to a 12-year-old. Use an everyday Indian scenario.",
          "realLifeTitle": "Short name of the real-life example",
          "realLifeScenario": "One sentence describing where students see this in their daily life.",
          "realLifeIcon": "📱",
          "activityTitle": "Name of the hands-on activity",
          "activitySteps": [
            "Step 1 — what students physically do",
            "Step 2 — what students observe or discuss",
            "Step 3 — what students share with class"
          ],
          "worksheetSortItems": [
            "Real item related to lesson topic ✅",
            "Unrelated everyday item (decoy)",
            "Real item related to lesson topic ✅",
            "Unrelated everyday item (decoy)",
            "Real item related to lesson topic ✅",
            "Unrelated everyday item (decoy)"
          ],
          "worksheetPairs": [
            { "left": "Concept A", "right": "What Concept A means in real life" },
            { "left": "Concept B", "right": "What Concept B means in real life" },
            { "left": "Concept C", "right": "What Concept C means in real life" },
            { "left": "Concept D", "right": "What Concept D means in real life" }
          ],
          "quizMatchPairs": [
            { "left": "Real situation 1", "right": "AI concept it represents", "icon": "📱" },
            { "left": "Real situation 2", "right": "AI concept it represents", "icon": "🏥" },
            { "left": "Real situation 3", "right": "AI concept it represents", "icon": "🚗" },
            { "left": "Real situation 4", "right": "AI concept it represents", "icon": "⭐" }
          ],
          "quizSequence": [
            { "id": "s1", "step": 1, "text": "First thing that happens", "icon": "📦" },
            { "id": "s2", "step": 2, "text": "Second thing that happens", "icon": "🔍" },
            { "id": "s3", "step": 3, "text": "Third thing that happens", "icon": "🎯" },
            { "id": "s4", "step": 4, "text": "Final result!", "icon": "🚀" }
          ],
          "completionTask": "One sentence — something students do at home to connect this lesson to real life. They report back next class.",
          "imagePlaceholders": {
            "intro": "Photo placeholder: describe the real-life photo that should go here",
            "story": "Illustration placeholder: describe the illustration that explains the concept",
            "activity": "Visual placeholder: describe what the activity scene should look like"
          }
        }
      ]
    }
  ]
}
```

## Content Rules (MUST FOLLOW)

### For ALL Levels (Class 6–12)
- NO Python code, NO syntax teaching
- Every example must be from daily Indian life: mobile, food, traffic, school, farm, hospital, bank, home
- Keep language at the level of the students (Class 6 = age 11-12, Class 12 = age 17-18)
- Aura script must be 3-4 sentences max, conversational, NOT textbook language

### For UG/PG Levels
- Still very simple — explain concepts through professional real-life scenarios
- Examples: hospital AI, banking fraud detection, HR recruitment AI, supply chain AI
- No academic jargon — explain every technical term with a real-world analogy first

### Chapter Canonical Keys (keep these exact)
| Chapter | Key |
|---------|-----|
| 1. AI Basics | `discover` |
| 2. Communicate with AI | `connect` |
| 3. AI Applications | `solve` |
| 4. AI and Career | `rise` |
| 5. AI Tools | `create` |
| 6. Responsible AI | `care` |

### Month Numbers
- Each lesson has a unique monthNumber (1–12)
- Chapter 1 → Months 1–2, Chapter 2 → Months 3–4, Chapter 3 → Months 5–6
- Chapter 4 → Months 7–8, Chapter 5 → Months 9–10, Chapter 6 → Months 11–12

## Grade Key Reference
| Grade | gradeKey | mascot | mascotEmoji |
|-------|----------|--------|-------------|
| Class 3 | class3 | Byte | 🤖 |
| Class 4 | class4 | Pixel | ✨ |
| Class 5 | class5 | Spark | ⚡ |
| Class 6 | class6 | Algo | 🧠 |
| Class 7 | class7 | Nova | 🌟 |
| Class 8 | class8 | Cipher | 🔐 |
| Class 9 | class9 | Vector | 📊 |
| Class 10 | class10 | Matrix | 🎯 |
| Class 11 | class11 | Nexus | 🔗 |
| Class 12 | class12 | Apex | 🏆 |
| UG Year 1 | ug1 | Synapse | 🧬 |
| UG Year 2 | ug2 | Flux | 🌊 |
| UG Year 3 | ug3 | Core | ⚙️ |
| UG Year 4 | ug4 | Prime | 💎 |
| PG Year 1 | pg1 | Summit | 🗻 |
| PG Year 2 | pg2 | Zenith | 🌌 |
