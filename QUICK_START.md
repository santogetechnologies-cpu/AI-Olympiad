# 🚀 QUICK START GUIDE - AI OLYMPIAD CONTENT GENERATION

## FOR YOUR MANAGER (30-SECOND OVERVIEW)

We restructured the app into 4 levels with JSON-based content:
- ✅ Junior (Classes 3-5)
- ✅ Middle (Classes 6-8)  
- ✅ Senior (Classes 9-12)
- ✅ Super Senior (UG-PG)

4 people can now work in parallel generating 12,000-word lessons in 2 minutes each using AI.

**Total time: 2 hours for all 216 lessons**

---

## FOR YOUR TEAM (2-MINUTE SETUP)

### Step 1: Assign People
- **Person 1**: Junior (Classes 3-5) + Start of Middle
- **Person 2**: Middle (Classes 7-8) + Senior (Classes 9-11)
- **Person 3**: Senior (Class 12) + Super Senior (UG1-UG3)
- **Person 4**: Super Senior (PG1-PG2) + Backup

See detailed assignments in `WORK_ASSIGNMENT.md`

### Step 2: Open Required Files
Each person opens:
1. `AI_GENERATION_PROMPT.md` - The prompt template
2. `WORK_ASSIGNMENT.md` - Your specific lesson list
3. ChatGPT or Claude in browser
4. VS Code with the project open

### Step 3: Generation Loop (2 min per lesson)
```
1. Copy prompt from AI_GENERATION_PROMPT.md
2. Replace [PLACEHOLDERS] with your lesson info
3. Paste into ChatGPT/Claude
4. Wait 30-60 seconds
5. Copy JSON output
6. Save as filename.json in correct folder
7. Next lesson!
```

### Step 4: File Locations
Save JSON files in:
- Junior: `public/content/junior/`
- Middle: `public/content/middle/`
- Senior: `public/content/senior/`
- Super Senior: `public/content/supersenior/`

---

## EXAMPLE WORKFLOW

**Person 1 generating first lesson:**

1. Opens `AI_GENERATION_PROMPT.md`
2. Copies the prompt
3. Replaces:
   - [LEVEL_NAME] → Junior
   - [CLASS_NAME] → Class 3
   - [CHAPTER_TITLE] → AI Basics
   - [LESSON_TITLE] → What is AI?
   - [FILENAME] → junior-class3-ch1-l1.json
   - [LESSON_ID] → l1
   - [LEVEL] → junior
   - [CLASS] → class3
   - [CHAPTER] → ch1
4. Pastes into ChatGPT
5. Gets JSON output in 60 seconds
6. Saves as `public/content/junior/junior-class3-ch1-l1.json`
7. Moves to lesson 2

**Time: 2 minutes ✓**

---

## ARCHITECTURE OVERVIEW

### Folder Structure
```
public/content/
├── junior/
│   ├── junior-manifest.json
│   └── [36 lesson JSON files]
├── middle/
│   ├── middle-manifest.json
│   └── [36 lesson JSON files]
├── senior/
│   ├── senior-manifest.json
│   └── [48 lesson JSON files]
└── supersenior/
    ├── supersenior-manifest.json
    └── [60 lesson JSON files]
```

### Frontend Integration (Already Set Up)
```typescript
// Load lesson content
const lesson = useLessonContent('junior', 'junior-class3-ch1-l1');

// Load manifest
const manifest = useLevelManifest('junior');

// Load all levels config
const config = useLevelsConfig();
```

Component: `src/components/LessonViewer.tsx`
Hooks: `src/hooks/useContentLoader.ts`

---

## CHECKLIST FOR SUCCESS

### Before Starting (5 min)
- [ ] All 4 people have VS Code open with project
- [ ] All 4 people have `AI_GENERATION_PROMPT.md` open
- [ ] All 4 people have `WORK_ASSIGNMENT.md` open
- [ ] All 4 people have ChatGPT/Claude open
- [ ] Everyone knows their assigned lessons

### During Generation (2 hours)
- [ ] Person 1: Completing Junior + Middle start (54 lessons)
- [ ] Person 2: Completing Middle + Senior (54 lessons)
- [ ] Person 3: Completing Senior + Super Senior (54 lessons)
- [ ] Person 4: Completing Super Senior + Backup (54 lessons)

### After Generation (5 min)
- [ ] All JSON files saved in correct folders
- [ ] Quick test: Load one lesson in the app
- [ ] Verify file count: 216 JSON files total
- [ ] Commit to git

---

## TROUBLESHOOTING

**Q: AI generates incomplete JSON**
A: Ask "Please complete the entire JSON structure"

**Q: JSON has syntax errors**
A: Paste into VS Code, it will highlight errors. Ask AI to fix.

**Q: Taking longer than 2 minutes**
A: You might be over-editing. Just generate and save, perfect later.

**Q: Not sure which folder**
A: Check filename prefix:
   - junior-* → junior folder
   - middle-* → middle folder
   - senior-* → senior folder
   - supersenior-* → supersenior folder

**Q: Person finishes early**
A: Help others or start quality checking existing files

---

## SUCCESS METRICS

✅ **2 hours from now:**
- 216 JSON lesson files created
- All files in correct folders
- Each file ~12,000 words
- Simple language with real-world examples
- Ready to connect to React frontend

---

## NEXT STEPS (AFTER 2 HOURS)

1. Test loading lessons in the app
2. Make any minor corrections
3. Add images/assets if needed
4. Deploy!

---

**Questions? Issues? Keep moving forward - perfect later!**

**Your manager will be impressed. Let's do this! 💪**
