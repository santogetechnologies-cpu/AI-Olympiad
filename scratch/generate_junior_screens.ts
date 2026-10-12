import fs from 'fs'
import path from 'path'
import { CLASS4_TOPIC_PROFILES } from '../src/services/curriculumTopicProfilesClass4'
import { CLASS5_TOPIC_PROFILES } from '../src/services/curriculumTopicProfilesClass5'
import type { GaioScreenItem } from '../src/components/gaio/types'

interface ChapterDef {
  num: number
  title: string
  subtitle: string
  t1Key: string
  t2Key: string
}

const CLASS4_CHAPTERS: ChapterDef[] = [
  { num: 1, title: 'AI Basics', subtitle: 'Where Is AI Hiding? & Meet the Smart Machines', t1Key: 'where is ai hiding?', t2Key: 'meet the smart machines' },
  { num: 2, title: 'Communicate with AI', subtitle: 'Say It Clearly! & Mission: Instructions', t1Key: 'say it clearly!', t2Key: 'mission: instructions' },
  { num: 3, title: 'AI Applications', subtitle: 'AI in My Mobile & AI on the Move', t1Key: 'ai in my mobile', t2Key: 'ai on the move' },
  { num: 4, title: 'AI and Career', subtitle: 'Future Job Hunt & My Technology Talent', t1Key: 'future job hunt', t2Key: 'my technology talent' },
  { num: 5, title: 'AI Tools', subtitle: 'Create a Story & Design with AI', t1Key: 'create a story', t2Key: 'design with ai' },
  { num: 6, title: 'Responsible AI', subtitle: 'Secret or Share? & AI: Right or Wrong?', t1Key: 'secret or share?', t2Key: 'ai: right or wrong?' },
]

const CLASS5_CHAPTERS: ChapterDef[] = [
  { num: 1, title: 'AI Basics', subtitle: 'The Secret Behind AI & Learning Machines', t1Key: 'the secret behind ai', t2Key: 'learning machines' },
  { num: 2, title: 'Communicate with AI', subtitle: 'Crack the Logic! & Command to Creation', t1Key: 'crack the logic!', t2Key: 'command to creation' },
  { num: 3, title: 'AI Applications', subtitle: 'AI in the Hospital & AI in the Classroom', t1Key: 'ai in the hospital', t2Key: 'ai in the classroom' },
  { num: 4, title: 'AI and Career', subtitle: 'My Future with AI & Skills of Tomorrow', t1Key: 'my future with ai', t2Key: 'skills of tomorrow' },
  { num: 5, title: 'AI Tools', subtitle: 'AI Study Buddy & AI Creative Corner', t1Key: 'ai study buddy', t2Key: 'ai creative corner' },
  { num: 6, title: 'Responsible AI', subtitle: 'Can AI Be Wrong? & Be a Smart AI User', t1Key: 'can ai be wrong?', t2Key: 'be a smart ai user' },
]

function buildScreensForGrade(
  gradeKey: 'class4' | 'class5',
  gradeTitle: string,
  mascotName: string,
  mascotEmoji: string,
  chapters: ChapterDef[],
  profiles: Record<string, any>
): GaioScreenItem[] {
  const screens: GaioScreenItem[] = []
  let screenIndex = 0
  let pdfPage = 1

  function addScreen(item: Omit<GaioScreenItem, 'screenIndex' | 'screenNumber'>) {
    const sNum = screenIndex + 1
    const screen: GaioScreenItem = {
      ...item,
      screenIndex,
      screenNumber: sNum,
    }
    screens.push(screen)
    screenIndex++
    return screen
  }

  // ─── 0. INTRO SCREENS (Month 0) ───
  // Screen 1: Book Cover
  addScreen({
    id: `${gradeKey}-p1-s1`,
    pdfPageNumber: 1,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'INTRODUCTION',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'COURSEBOOK & INTERACTIVE LAB',
    title: `Global AI Olympiad: ${gradeTitle}`,
    subtitle: `Beginner AI Coursebook & Interactive Lab • Mascot ${mascotName} ${mascotEmoji}`,
    contentBlockTitle: 'Book Cover',
    interactionType: 'book_cover',
    sourcePdfImage: `/gaio/${gradeKey}/pages/cover.png`,
    payload: {
      gradeKey,
      gradeTitle,
      mascotName,
      mascotEmoji,
      tagline: 'See • Learn • Create • Protect',
    }
  })

  // Screen 2: Welcome Mascot
  addScreen({
    id: `${gradeKey}-p2-s1`,
    pdfPageNumber: 2,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'INTRODUCTION',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: `MEET ${mascotName.toUpperCase()}`,
    title: `Welcome to ${gradeTitle}! Meet ${mascotName} ${mascotEmoji}`,
    subtitle: `Your friendly robotic guide through 6 exciting AI chapters!`,
    contentBlockTitle: `Meet ${mascotName}`,
    interactionType: 'welcome_bolt',
    sourcePdfImage: `/gaio/${gradeKey}/pages/welcome.png`,
    payload: {
      mascotName,
      mascotEmoji,
      welcomeSpeech: `Hello, champion! I am ${mascotName}, your friendly AI guide. Together we will uncover where AI hides, how smart machines think, and how you can be a responsible cyber captain!`,
      skills: ['Pattern Spotting 🔍', 'Sensor Navigation 🦾', 'Prompt Engineering 🧑‍🍳', 'Cyber Safety 🛡️'],
    }
  })

  // Screen 3: Book Guide
  addScreen({
    id: `${gradeKey}-p3-s1`,
    pdfPageNumber: 3,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'INTRODUCTION',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'HOW TO USE THIS BOOK',
    title: 'How to Learn with Robo-Lab',
    subtitle: 'Look for special icons in every lesson to guide your journey!',
    contentBlockTitle: 'Book Guide',
    interactionType: 'book_guide',
    sourcePdfImage: `/gaio/${gradeKey}/pages/guide.png`,
    payload: {
      signs: [
        { icon: '💡', title: 'Did You Know?', desc: 'Fascinating real-world discoveries and surprising fun facts.' },
        { icon: '🧠', title: 'Think Fast!', desc: 'Puzzles and mental challenges that train your logic muscles.' },
        { icon: '✏️', title: 'Try It Out!', desc: 'Hands-on creative activities, drawings, and coding simulations.' },
        { icon: '⭐', title: 'Golden Remember', desc: 'The most important concepts to remember for your Olympiad.' },
      ]
    }
  })

  // Screen 4: Student Profile
  addScreen({
    id: `${gradeKey}-p4-s1`,
    pdfPageNumber: 4,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'INTRODUCTION',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'STUDENT EXPLORER BADGE',
    title: 'My AI Explorer Passport',
    subtitle: 'Enter your explorer credentials to begin your quest!',
    contentBlockTitle: 'Student Profile',
    interactionType: 'student_profile',
    sourcePdfImage: `/gaio/${gradeKey}/pages/profile.png`,
    payload: {
      gradeTitle,
      defaultRank: 'Junior Tech Cadet',
    }
  })

  // Screen 5: Journey Map
  addScreen({
    id: `${gradeKey}-p4-s2`,
    pdfPageNumber: 4,
    pdfPartIndex: 2,
    pdfTotalParts: 2,
    monthNumber: 0,
    monthTitle: 'INTRODUCTION',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: '6-CHAPTER QUEST MAP',
    title: 'Your 6-Chapter Learning Adventure',
    subtitle: 'Travel from AI Basics to Responsible Digital Citizenship!',
    contentBlockTitle: 'Journey Map',
    interactionType: 'journey_map',
    sourcePdfImage: `/gaio/${gradeKey}/pages/journey.png`,
    payload: {
      chapters: chapters.map(ch => ({
        num: ch.num,
        title: ch.title,
        subtitle: ch.subtitle,
      }))
    }
  })

  // ─── 1 to 6. CHAPTER SCREENS (Months 1 to 6) ───
  chapters.forEach((ch) => {
    const m = ch.num
    pdfPage = m * 20

    const t1Num = (m - 1) * 2 + 1
    const t2Num = (m - 1) * 2 + 2
    const p1 = profiles[ch.t1Key] || {}
    const p2 = profiles[ch.t2Key] || {}

    // Month Cover
    addScreen({
      id: `${gradeKey}-m${m}-cover`,
      pdfPageNumber: pdfPage++,
      pdfPartIndex: 1,
      pdfTotalParts: 1,
      monthNumber: m,
      monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
      topicNumber: null,
      topicTitle: null,
      pageHeaderCategory: `CHAPTER ${m} • ${gradeTitle.toUpperCase()}`,
      pageHeaderTitle: ch.title.toUpperCase(),
      title: `Chapter ${m}: ${ch.title}`,
      subtitle: ch.subtitle,
      contentBlockTitle: 'Chapter Cover',
      interactionType: 'month_cover',
      sourcePdfImage: `/gaio/${gradeKey}/pages/ch${m}_cover.png`,
      payload: {
        monthNumber: m,
        monthTitle: ch.title,
        subtitle: ch.subtitle,
        topics: [
          { topicNumber: t1Num, title: p1.title || ch.t1Key, area: p1.goal || 'Foundations' },
          { topicNumber: t2Num, title: p2.title || ch.t2Key, area: p2.goal || 'Applications' },
        ]
      }
    })

    // ── Helper to build screens for one topic ──
    const buildTopicScreens = (topicNum: number, p: any, isLesson1: boolean) => {
      const topTitle = p.title || `Topic ${topicNum}`

      // 1. Let's Learn Intro
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-learn`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 2,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: `LET'S LEARN: ${topTitle.toUpperCase()}`,
        title: `Let's Learn: ${topTitle}`,
        subtitle: p.goal || 'Explore foundational concepts and real-world examples',
        contentBlockTitle: 'Core Concepts',
        interactionType: 'lets_learn_intro',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_learn.png`,
        payload: {
          topicNumber: topicNum,
          topicTitle: topTitle,
          area: ch.title,
          concepts: p.learnPoints || [
            'Understand foundational concepts clearly with simple examples.',
            'Discover how pattern recognition powers smart technology.',
            'Practice safe, ethical digital habits in every lesson.'
          ],
          helpers: p.useCases || ['Smartphones 📱', 'Camera Vision 📷', 'Robot Helpers 🤖', 'Smart Maps 🗺️']
        }
      })

      // 2. Magic Words (Vocabulary & Analogy)
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-words`,
        pdfPageNumber: pdfPage,
        pdfPartIndex: 2,
        pdfTotalParts: 2,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'MAGIC WORDS & MENTAL MODEL',
        title: `Magic Words: ${topTitle}`,
        subtitle: 'Key vocabulary to unlock your AI powers!',
        contentBlockTitle: 'Magic Words',
        interactionType: 'lets_learn_words',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_words.png`,
        payload: {
          magicWords: (p.pairs || []).map((pair: any) => ({
            word: pair.term,
            meaning: pair.definition,
          })),
          analogy: p.analogy || 'Think of AI as an assistant that learns by seeing many examples!'
        }
      })

      // 3. Picture Story (Hook & Scenario)
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-story`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'PICTURE STORY & MYSTERY',
        title: `The Story Behind ${topTitle}`,
        subtitle: p.hook || 'A curious real-world scenario to explore',
        contentBlockTitle: 'Picture Story',
        interactionType: 'picture_story_part1',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_story.png`,
        payload: {
          storyTitle: p.hook || `Discovering ${topTitle}`,
          panels: [
            { panelNumber: 1, text: (p.realScenario || '').slice(0, 160) + '...', imageSrc: '/gaio/scene1.png' },
            { panelNumber: 2, text: p.step1?.desc || 'Sensors gather digital signals.', imageSrc: '/gaio/scene2.png' },
            { panelNumber: 3, text: p.step2?.desc || 'The AI finds patterns in data.', imageSrc: '/gaio/scene3.png' },
            { panelNumber: 4, text: p.step3?.desc || 'The machine takes smart action.', imageSrc: '/gaio/scene4.png' }
          ]
        }
      })

      // 4. Guided Discovery Steps
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-steps`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'STEP-BY-STEP DISCOVERY',
        title: `Guided Discovery: ${topTitle}`,
        subtitle: 'Follow the 3-step computational workflow',
        contentBlockTitle: 'Discovery Steps',
        interactionType: 'lets_do_it_steps',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_steps.png`,
        payload: {
          topicTitle: topTitle,
          steps: [
            { stepNumber: 1, title: p.step1?.title || '1. Observe', desc: p.step1?.desc || '', detail: p.step1?.detail || '', code: p.step1?.code },
            { stepNumber: 2, title: p.step2?.title || '2. Think', desc: p.step2?.desc || '', detail: p.step2?.detail || '', code: p.step2?.code },
            { stepNumber: 3, title: p.step3?.title || '3. Act', desc: p.step3?.desc || '', detail: p.step3?.detail || '', code: p.step3?.code },
          ]
        }
      })

      // 5. Interactive Game Challenge
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-game`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'GAME CHALLENGE & LAB',
        title: p.gameMechanic?.title || `Game Challenge: ${topTitle}`,
        subtitle: p.gameMechanic?.objective || 'Complete the interactive mission to win stars!',
        contentBlockTitle: 'Interactive Game',
        interactionType: 'lets_do_it_reflection',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_game.png`,
        payload: {
          topicTitle: topTitle,
          talkPrompt: p.gameMechanic?.scenario || p.practicalTask?.objective,
          drawPrompt: (p.gameMechanic?.rules || p.practicalTask?.steps || []).join(' • '),
          gameTitle: p.gameMechanic?.title,
          objective: p.gameMechanic?.objective,
          choices: p.gameMechanic?.choices || [],
          points: p.gameMechanic?.points || 300,
          badge: p.gameMechanic?.badge || 'Master Explorer 🌟'
        }
      })

      // 6. Interactive Concept Matching
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-match`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'CONCEPT MATCHER',
        title: `Match the Concepts: ${topTitle}`,
        subtitle: 'Connect each term to its matching definition',
        contentBlockTitle: 'Matching Activity',
        interactionType: 'worksheet_matching',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_match.png`,
        payload: {
          topicTitle: topTitle,
          taskTitle: 'Match each term to its true meaning',
          pairs: (p.pairs || []).map((pair: any, idx: number) => ({
            id: `p${idx + 1}`,
            leftId: `l${idx + 1}`,
            rightId: `r${idx + 1}`,
            leftText: pair.term,
            rightText: pair.definition,
          }))
        }
      })

      // 7. Olympiad Practice Quiz
      addScreen({
        id: `${gradeKey}-m${m}-t${topicNum}-quiz`,
        pdfPageNumber: pdfPage++,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: m,
        monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
        topicNumber: topicNum,
        topicTitle: topTitle,
        pageHeaderCategory: `CHAPTER ${m} • TOPIC ${topicNum}`,
        pageHeaderTitle: 'OLYMPIAD PRACTICE QUIZ',
        title: `Olympiad Quiz: ${topTitle}`,
        subtitle: 'Test your knowledge with official Olympiad questions!',
        contentBlockTitle: 'Olympiad Quiz',
        interactionType: 'quiz_part1',
        sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_t${topicNum}_quiz.png`,
        payload: {
          topicTitle: topTitle,
          questions: (p.olympiadQuestions || p.quizzes || []).map((qItem: any, idx: number) => ({
            id: idx + 1,
            q: qItem.q || qItem.question,
            options: qItem.opts || (qItem.options || []).map((o: any) => o.text || o),
            correct: qItem.correct !== undefined ? qItem.correct : (qItem.options ? qItem.options.findIndex((o: any) => o.isCorrect) : 0),
            explanation: qItem.exp || qItem.explanation,
            hint: qItem.hint || 'Review the core explanation.',
            difficulty: qItem.difficulty || 'Olympiad Practice'
          }))
        }
      })

      // 8. Responsible AI & Safety (on Lesson 2 or Lesson 1)
      if (!isLesson1) {
        addScreen({
          id: `${gradeKey}-m${m}-safety`,
          pdfPageNumber: pdfPage++,
          pdfPartIndex: 1,
          pdfTotalParts: 1,
          monthNumber: m,
          monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
          topicNumber: topicNum,
          topicTitle: topTitle,
          pageHeaderCategory: `CHAPTER ${m} • DIGITAL SAFETY`,
          pageHeaderTitle: 'RESPONSIBLE AI HABIT',
          title: `Digital Safety: ${ch.title}`,
          subtitle: p.reflectionSafety?.rule || 'Golden rules to keep you safe and kind online',
          contentBlockTitle: 'Responsible AI',
          interactionType: 'home_connect',
          sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_safety.png`,
          payload: {
            topicTitle: topTitle,
            rule: p.reflectionSafety?.rule || 'Always protect private information and think for yourself!',
            prompt: p.reflectionSafety?.prompt || 'How do we use technology wisely?',
            discussion: p.reflectionSafety?.discussion || 'Share what you learned with your family.',
            takeaways: p.takeaways || []
          }
        })
      }
    }

    // Build Lesson 1
    buildTopicScreens(t1Num, p1, true)

    // Build Lesson 2
    buildTopicScreens(t2Num, p2, false)

    // Chapter Review & Badge
    addScreen({
      id: `${gradeKey}-m${m}-review`,
      pdfPageNumber: pdfPage++,
      pdfPartIndex: 1,
      pdfTotalParts: 1,
      monthNumber: m,
      monthTitle: `CHAPTER ${m}: ${ch.title.toUpperCase()}`,
      topicNumber: null,
      topicTitle: null,
      pageHeaderCategory: `CHAPTER ${m} REVIEW`,
      pageHeaderTitle: 'MASTERY CHECKPOINT',
      title: `Chapter ${m} Mastery: ${ch.title}`,
      subtitle: `Congratulations! You unlocked the Chapter ${m} Badge!`,
      contentBlockTitle: 'Chapter Review',
      interactionType: 'unit_review_part1',
      sourcePdfImage: `/gaio/${gradeKey}/pages/m${m}_review.png`,
      payload: {
        monthNumber: m,
        title: ch.title,
        takeaways: [
          ...(p1.takeaways || []),
          ...(p2.takeaways || [])
        ].slice(0, 4),
        badge: `Chapter ${m} Master Badge 🏆`
      }
    })
  })

  // ─── 7. FINALE SCREENS (Month 7) ───
  // Screen 1: Olympiad Championship Quiz
  addScreen({
    id: `${gradeKey}-finale-quiz`,
    pdfPageNumber: 150,
    pdfPartIndex: 1,
    pdfTotalParts: 3,
    monthNumber: 7,
    monthTitle: 'FINALE: OLYMPIAD MASTERY',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'CHAMPIONSHIP FINALS',
    title: 'Global AI Olympiad Championship Challenge',
    subtitle: 'The ultimate knowledge test across all 6 chapters!',
    contentBlockTitle: 'Olympiad Championship Quiz',
    interactionType: 'olympiad_quiz',
    sourcePdfImage: `/gaio/${gradeKey}/pages/finale_quiz.png`,
    payload: {
      gradeTitle,
      totalQuestions: 10,
    }
  })

  // Screen 2: Certificate of Completion
  addScreen({
    id: `${gradeKey}-finale-cert`,
    pdfPageNumber: 152,
    pdfPartIndex: 2,
    pdfTotalParts: 3,
    monthNumber: 7,
    monthTitle: 'FINALE: OLYMPIAD MASTERY',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'OFFICIAL CERTIFICATION',
    title: 'Official Junior AI Olympiad Certificate',
    subtitle: `Awarded to the young scientist for outstanding mastery of ${gradeTitle}!`,
    contentBlockTitle: 'Certificate of Mastery',
    interactionType: 'certificate',
    sourcePdfImage: `/gaio/${gradeKey}/pages/certificate.png`,
    payload: {
      gradeTitle,
      honors: 'Junior AI Olympiad Scholar with Distinction',
      mascotName,
    }
  })

  // Screen 3: Answer Key & Summary
  addScreen({
    id: `${gradeKey}-finale-answers`,
    pdfPageNumber: 153,
    pdfPartIndex: 3,
    pdfTotalParts: 3,
    monthNumber: 7,
    monthTitle: 'FINALE: OLYMPIAD MASTERY',
    topicNumber: null,
    topicTitle: null,
    pageHeaderCategory: `AI OLYMPIAD • ${gradeTitle.toUpperCase()}`,
    pageHeaderTitle: 'ANSWER KEY & SOLUTIONS',
    title: 'Master Solutions & Explanation Key',
    subtitle: 'Complete review of all answers, reasoning, and key takeaways.',
    contentBlockTitle: 'Master Answer Key',
    interactionType: 'answer_key',
    sourcePdfImage: `/gaio/${gradeKey}/pages/answers.png`,
    payload: {
      gradeTitle,
    }
  })

  return screens
}

console.log('Generating Class 4 screens...')
const class4Screens = buildScreensForGrade(
  'class4',
  'Class 4',
  'Robo-Pi',
  '🤖',
  CLASS4_CHAPTERS,
  CLASS4_TOPIC_PROFILES
)

console.log('Generating Class 5 screens...')
const class5Screens = buildScreensForGrade(
  'class5',
  'Class 5',
  'Data-Volt',
  '⚡',
  CLASS5_CHAPTERS,
  CLASS5_TOPIC_PROFILES
)

console.log(`Class 4 total screens: ${class4Screens.length}`)
console.log(`Class 5 total screens: ${class5Screens.length}`)

// Write JSON files
const configDir = path.resolve(process.cwd(), 'src/components/gaio/config')
fs.writeFileSync(
  path.join(configDir, 'class4BookScreens.json'),
  JSON.stringify(class4Screens, null, 2),
  'utf-8'
)
fs.writeFileSync(
  path.join(configDir, 'class5BookScreens.json'),
  JSON.stringify(class5Screens, null, 2),
  'utf-8'
)
console.log('Saved JSON files.')

// Write TypeScript helper files
const tsTemplate = (gKey: string, varName: string, jsonFile: string) => `// ─────────────────────────────────────────────────────────────────────────────
// GAIO ${gKey.toUpperCase()} INTERACTIVE BOOK — COMPLETE SCREEN MAPPING & CONFIGURATION
// Generated from Authentic Curriculum Topic Profiles
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioScreenItem } from '../types'
import allScreensData from './${jsonFile}'

export const ${varName}: GaioScreenItem[] = allScreensData as GaioScreenItem[]

export const TOTAL_WEBSITE_SCREENS = ${varName}.length

export function getScreenByIndex(index: number): GaioScreenItem | undefined {
  if (index < 0 || index >= ${varName}.length) return undefined
  return ${varName}[index]
}

export function getScreensByPdfPage(pdfPageNumber: number): GaioScreenItem[] {
  return ${varName}.filter((s) => s.pdfPageNumber === pdfPageNumber)
}

export function getScreensForTopic(topicNumber: number): GaioScreenItem[] {
  return ${varName}.filter((s) => s.topicNumber === topicNumber)
}

export function getScreensForMonth(monthNumber: number): GaioScreenItem[] {
  return ${varName}.filter((s) => s.monthNumber === monthNumber)
}

export function findScreenIndexById(screenId: string): number {
  return ${varName}.findIndex((s) => s.id === screenId)
}

export function findScreenIndexByPdfPage(pdfPageNumber: number): number {
  const idx = ${varName}.findIndex((s) => s.pdfPageNumber === pdfPageNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForMonth(monthNumber: number): number {
  if (monthNumber <= 0) return 0
  const idx = ${varName}.findIndex((s) => s.monthNumber === monthNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForTopic(topicNumber: number): number {
  const idx = ${varName}.findIndex((s) => s.topicNumber === topicNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForChapter(chapterNumber: number): number {
  return getStartingScreenIndexForMonth(chapterNumber)
}
`

fs.writeFileSync(
  path.join(configDir, 'class4BookScreens.ts'),
  tsTemplate('class4', 'CLASS4_BOOK_ALL_SCREENS', 'class4BookScreens.json'),
  'utf-8'
)

fs.writeFileSync(
  path.join(configDir, 'class5BookScreens.ts'),
  tsTemplate('class5', 'CLASS5_BOOK_ALL_SCREENS', 'class5BookScreens.json'),
  'utf-8'
)

console.log('Saved TypeScript helper files class4BookScreens.ts and class5BookScreens.ts successfully!')
