// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL GRADE SCREENS REGISTRY (ALL 16 ACADEMIC LEVELS)
// Spans Class 3 through PG Final Year strictly following official syllabus
// Guarantees EXACT Class 3 reference structure for EVERY class:
//   a. Lesson Introduction (Everyday Real-Life Situation)
//   b. Learn with Pictures (Rich Cards + Visual Image Placeholders)
//   c. Aura AI Teaches (Step-by-step Spoken Audio)
//   d. Real-Life Example (From 100 Simple Everyday AI Examples)
//   e. Guided Activity (Visual Moving, Connecting, Sorting)
//   f. WORKSHEET (Pure Visual Interactive Game Mechanics)
//   g. QUIZ TIME (Pure Visual Knowledge-Check Games — ZERO MCQs)
//   h. Completion Feedback (Celebration Stars & What's Next)
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioScreenItem, GaioInteractionType } from '../types'
import { SYLLABUS_SPECS } from '../../../services/curriculumData'
import { CLASS3_BOOK_ALL_SCREENS } from './class3BookScreens'
import type { GradeKey } from '../../../services/progressService'

// 100 Real-life everyday examples mapped by chapter category
const REAL_LIFE_EXAMPLES_MAP: Record<string, { title: string; scenario: string; icon: string }[]> = {
  discover: [
    { title: 'Face Unlock', scenario: 'Your smartphone unlocks instantly when camera sees your face.', icon: '📱' },
    { title: 'Voice Understanding', scenario: 'Smart assistant understands your spoken words and answers.', icon: '🎙️' },
    { title: 'Fastest Map Route', scenario: 'Google Maps calculates the fastest way home around traffic.', icon: '🗺️' },
    { title: 'Weather Forecast', scenario: 'Weather app predicts rain tomorrow by analyzing cloud sensors.', icon: '🌦️' },
    { title: 'Robot Vacuum', scenario: 'Smart vacuum navigates around chairs and cleans the floor.', icon: '🤖' },
  ],
  connect: [
    { title: 'Word Suggestions', scenario: 'Your phone keyboard predicts the exact next word you want to type.', icon: '⌨️' },
    { title: 'Spam Separation', scenario: 'Email system filters unwanted spam messages into the junk folder.', icon: '📧' },
    { title: 'Photo Grouping', scenario: 'Photo gallery automatically creates albums of family and cats.', icon: '📸' },
    { title: 'Dark Photo Fix', scenario: 'Night camera mode brightens dark photos using neural processing.', icon: '📷' },
    { title: 'Noise Cancellation', scenario: 'Headphones cancel loud background street noise so you hear clearly.', icon: '🎧' },
  ],
  solve: [
    { title: 'Shopping Suggestions', scenario: 'Online store recommends shirts and shoes that match your style.', icon: '🛍️' },
    { title: 'Fraud Alert', scenario: 'Banking app alerts you instantly if a suspicious payment is attempted.', icon: '💳' },
    { title: 'Delivery ETA', scenario: 'Food delivery app tracks driver location and estimates exact arrival.', icon: '🛵' },
    { title: 'Smart Farming', scenario: 'Farmer uses camera sensor to detect thirsty crops and save water.', icon: '🌾' },
    { title: 'Hospital Records', scenario: 'Medical system highlights abnormal patterns in laboratory reports.', icon: '🏥' },
  ],
  rise: [
    { title: 'Drone Inspection', scenario: 'Autonomous drone scans bridges and tall windmills for tiny cracks.', icon: '🚁' },
    { title: 'Traffic Flow Control', scenario: 'City AI switches traffic lights dynamically to clear traffic jams.', icon: '🚦' },
    { title: 'Factory Automation', scenario: 'Robotic arms assemble circuit boards with micron precision.', icon: '🏭' },
    { title: 'Airline Chatbot', scenario: 'Digital assistant answers ticket and baggage questions 24/7.', icon: '✈️' },
    { title: 'Low-Stock Alerts', scenario: 'Store inventory system automatically reorders supplies before they run out.', icon: '📦' },
  ],
  create: [
    { title: 'Image Generation', scenario: 'Creative AI produces a vibrant illustration from a text prompt.', icon: '🎨' },
    { title: 'Story Assistant', scenario: 'Writing companion suggests creative story twists and dialogue.', icon: '📖' },
    { title: 'Music Composition', scenario: 'Smart audio generator composes custom background music for a video.', icon: '🎵' },
    { title: 'Presentation Polish', scenario: 'AI summarizes bullet points into clear presentation slides.', icon: '📊' },
    { title: 'Code Companion', scenario: 'Coding helper explains tricky functions and suggests bug fixes.', icon: '💻' },
  ],
  care: [
    { title: 'Phishing Warning', scenario: 'Browser warns you immediately before you open a dangerous fake website.', icon: '🛡️' },
    { title: 'Data Privacy Control', scenario: 'Smartphone lets you choose exactly which apps can access location.', icon: '🔒' },
    { title: 'Deepfake Detection', scenario: 'Media verification tool identifies synthetic manipulated video faces.', icon: '🔍' },
    { title: 'Fairness Check', scenario: 'Auditing system checks loan applications to ensure fair evaluation.', icon: '⚖️' },
    { title: 'Digital Wellbeing', scenario: 'Phone reminds you to rest your eyes after long screen usage.', icon: '🌱' },
  ],
}

const GRADE_METADATA: Record<string, { mascot: string; icon: string; title: string }> = {
  class3: { mascot: 'Bolt', icon: '⚡', title: 'Class 3' },
  class4: { mascot: 'Robo-Pi', icon: '🤖', title: 'Class 4' },
  class5: { mascot: 'Data-Volt', icon: '⚡', title: 'Class 5' },
  class6: { mascot: 'Algo', icon: '🧠', title: 'Class 6' },
  class7: { mascot: 'Pythia', icon: '🐍', title: 'Class 7' },
  class8: { mascot: 'Neural', icon: '🕸️', title: 'Class 8' },
  class9: { mascot: 'DataBot', icon: '📊', title: 'Class 9' },
  class10: { mascot: 'Perceptron', icon: '🔮', title: 'Class 10' },
  class11: { mascot: 'Tensor', icon: '🔥', title: 'Class 11' },
  class12: { mascot: 'Transformer', icon: '✨', title: 'Class 12' },
  ug1: { mascot: 'Grad', icon: '🎓', title: 'UG 1st Year' },
  ug2: { mascot: 'Scholar', icon: '📚', title: 'UG 2nd Year' },
  ug3: { mascot: 'Architect', icon: '🏗️', title: 'UG 3rd Year' },
  ug4: { mascot: 'Captain', icon: '🚀', title: 'UG Final Year' },
  pg1: { mascot: 'Researcher', icon: '🔬', title: 'PG 1st Year' },
  pg2: { mascot: 'Professor', icon: '🧑‍🔬', title: 'PG Final Year' },
}

/**
 * Generates an authentic, complete set of GaioScreenItems for any given academic grade.
 * Strictly maintains identical lesson length and organization to Class 3 reference.
 */
export function buildScreensForGrade(gradeKey: string): GaioScreenItem[] {
  // Use authentic hand-crafted screens for Class 3
  if (gradeKey === 'class3') {
    return CLASS3_BOOK_ALL_SCREENS
  }

  const spec = SYLLABUS_SPECS.find((s) => s.gradeKey === gradeKey) || SYLLABUS_SPECS[0]
  const meta = GRADE_METADATA[gradeKey] || { mascot: 'Aura', icon: '🤖', title: spec.name }
  const screens: GaioScreenItem[] = []

  let screenIndex = 0

  const pushScreen = (
    item: Omit<GaioScreenItem, 'screenIndex' | 'screenNumber'>
  ) => {
    const sNum = screenIndex + 1
    screens.push({
      ...item,
      screenIndex,
      screenNumber: sNum,
    })
    screenIndex++
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MONTH 0: WELCOME & ORIENTATION (Screens 1 to 5)
  // ─────────────────────────────────────────────────────────────────────────
  pushScreen({
    id: `${gradeKey}-p1-s1`,
    pdfPageNumber: 1,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'WELCOME',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: 'COURSEBOOK & INTERACTIVE LAB',
    title: `Global AI Olympiad: ${meta.title}`,
    subtitle: `${spec.subjectName} • Mascot ${meta.mascot} ${meta.icon}`,
    contentBlockTitle: 'Book Cover',
    interactionType: 'book_cover',
    sourcePdfImage: `/gaio/${gradeKey}/pages/cover.png`,
    payload: {
      gradeKey,
      gradeTitle: meta.title,
      mascotName: meta.mascot,
      mascotEmoji: meta.icon,
      tagline: 'See • Learn • Create • Protect',
      imagePlaceholder: {
        caption: `${meta.title} Coursebook Cover Illustration`,
        alt: `Cover artwork for ${spec.subjectName}`,
      },
    },
  })

  pushScreen({
    id: `${gradeKey}-p2-s1`,
    pdfPageNumber: 2,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'WELCOME',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: `MEET ${meta.mascot.toUpperCase()}`,
    title: `Welcome! Meet Your AI Guide ${meta.mascot} ${meta.icon}`,
    subtitle: `Step-by-step learning companion for ${meta.title}`,
    contentBlockTitle: `Meet ${meta.mascot}`,
    interactionType: 'welcome_bolt',
    sourcePdfImage: `/gaio/${gradeKey}/pages/welcome.png`,
    payload: {
      mascotName: meta.mascot,
      mascotEmoji: meta.icon,
      welcomeSpeech: `Hello! I am ${meta.mascot}, your friendly AI guide. Together we will discover smart technologies, build visual solutions, and master the AI Olympiad!`,
      skills: [
        'Real-Life AI Recognition 🔍',
        'Visual Problem Solving 🧩',
        'Responsible AI Citizenship 🛡️',
        'Creative Innovation 🚀',
      ],
      imagePlaceholder: {
        caption: `Mascot Avatar: ${meta.mascot} in the AI Lab`,
        alt: `${meta.mascot} AI Guide mascot illustration`,
      },
    },
  })

  pushScreen({
    id: `${gradeKey}-p3-s1`,
    pdfPageNumber: 3,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'WELCOME',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: 'HOW TO USE THIS INTERACTIVE APP',
    title: 'How to Learn with Aura AI',
    subtitle: 'Every lesson is short, visual, practical, and interactive!',
    contentBlockTitle: 'Book Guide',
    interactionType: 'book_guide',
    sourcePdfImage: `/gaio/${gradeKey}/pages/guide.png`,
    payload: {
      signs: [
        { icon: '💡', title: 'Learn with Pictures', desc: 'Visual examples and real-life situations.' },
        { icon: '🎙️', title: 'Aura AI Guidance', desc: 'Calm, patient spoken explanations.' },
        { icon: '🧩', title: 'Visual Worksheets', desc: 'Drag, sort, match, and connect objects.' },
        { icon: '⭐', title: 'Quiz Time Games', desc: 'Interactive knowledge-check games — no written quizzes.' },
      ],
    },
  })

  pushScreen({
    id: `${gradeKey}-p4-s1`,
    pdfPageNumber: 4,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 0,
    monthTitle: 'WELCOME',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: 'STUDENT EXPLORER BADGE',
    title: 'My AI Explorer Passport',
    subtitle: 'Your credentials for the Global AI Olympiad',
    contentBlockTitle: 'Student Profile',
    interactionType: 'student_profile',
    sourcePdfImage: `/gaio/${gradeKey}/pages/profile.png`,
    payload: {
      gradeTitle: meta.title,
      defaultRank: 'AI Explorer Cadet',
    },
  })

  pushScreen({
    id: `${gradeKey}-p4-s2`,
    pdfPageNumber: 4,
    pdfPartIndex: 2,
    pdfTotalParts: 2,
    monthNumber: 0,
    monthTitle: 'WELCOME',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: '6-CHAPTER LEARNING JOURNEY',
    title: 'Your 6-Chapter Learning Adventure',
    subtitle: 'Follow the path: Discover • Connect • Solve • Rise • Create • Care',
    contentBlockTitle: 'Journey Map',
    interactionType: 'journey_map',
    sourcePdfImage: `/gaio/${gradeKey}/pages/journey.png`,
    payload: {
      chapters: [
        { num: 1, title: 'AI Discover', subtitle: `${spec.c1[0]} & ${spec.c1[1]}` },
        { num: 2, title: 'AI Connect', subtitle: `${spec.c2[0]} & ${spec.c2[1]}` },
        { num: 3, title: 'AI Solve', subtitle: `${spec.c3[0]} & ${spec.c3[1]}` },
        { num: 4, title: 'AI Rise', subtitle: `${spec.c4[0]} & ${spec.c4[1]}` },
        { num: 5, title: 'AI Create', subtitle: `${spec.c5[0]} & ${spec.c5[1]}` },
        { num: 6, title: 'AI Care', subtitle: `${spec.c6[0]} & ${spec.c6[1]}` },
      ],
    },
  })

  // ─────────────────────────────────────────────────────────────────────────
  // MONTHS 1 TO 6: THE 6 CORE CHAPTERS (IDENTICAL STRUCTURE TO CLASS 3 REFERENCE)
  // ─────────────────────────────────────────────────────────────────────────
  const chapterSpecs = [
    { month: 1, key: 'discover', title: 'AI DISCOVER', topics: [spec.c1[0], spec.c1[1]] },
    { month: 2, key: 'connect', title: 'AI CONNECT', topics: [spec.c2[0], spec.c2[1]] },
    { month: 3, key: 'solve', title: 'AI SOLVE', topics: [spec.c3[0], spec.c3[1]] },
    { month: 4, key: 'rise', title: 'AI RISE', topics: [spec.c4[0], spec.c4[1]] },
    { month: 5, key: 'create', title: 'AI CREATE', topics: [spec.c5[0], spec.c5[1]] },
    { month: 6, key: 'care', title: 'AI CARE', topics: [spec.c6[0], spec.c6[1]] },
  ]

  chapterSpecs.forEach((ch, chIdx) => {
    const monthNum = ch.month
    const startPdfPage = 20 + chIdx * 20

    // 1. Month Cover Screen
    pushScreen({
      id: `${gradeKey}-m${monthNum}-cover`,
      pdfPageNumber: startPdfPage,
      pdfPartIndex: 1,
      pdfTotalParts: 1,
      monthNumber: monthNum,
      monthTitle: ch.title,
      pageHeaderCategory: `MONTH ${monthNum}: ${ch.title}`,
      pageHeaderTitle: `CHAPTER ${monthNum} OVERVIEW`,
      title: `${ch.title}: ${ch.topics[0]} & ${ch.topics[1]}`,
      subtitle: `Explore authentic real-world AI applications for ${meta.title}`,
      contentBlockTitle: 'Month Cover',
      interactionType: 'month_cover',
      sourcePdfImage: `/gaio/${gradeKey}/pages/m${monthNum}_cover.png`,
      payload: {
        topics: [
          { topicNumber: chIdx * 2 + 1, title: ch.topics[0], area: spec.subjectName },
          { topicNumber: chIdx * 2 + 2, title: ch.topics[1], area: spec.subjectName },
        ],
        imagePlaceholder: {
          caption: `Visual theme illustration for Chapter ${monthNum}: ${ch.title}`,
          alt: `Illustration of ${ch.title}`,
        },
      },
    })

    // 2 Topics per Chapter
    ch.topics.forEach((topicName, tIdx) => {
      const topicNum = chIdx * 2 + tIdx + 1
      const examplesList = REAL_LIFE_EXAMPLES_MAP[ch.key] || REAL_LIFE_EXAMPLES_MAP.discover
      const ex1 = examplesList[tIdx * 2 % examplesList.length]
      const ex2 = examplesList[(tIdx * 2 + 1) % examplesList.length]

      // a. Lesson Introduction — simple introduction using familiar everyday situation
      pushScreen({
        id: `${gradeKey}-t${topicNum}-intro`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 1,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'LESSON INTRODUCTION',
        title: `Introduction: ${topicName}`,
        subtitle: `A familiar real-life look at how AI works in our daily world`,
        contentBlockTitle: "Lesson Introduction",
        interactionType: 'lets_learn_intro',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_intro.png`,
        payload: {
          concepts: [
            `${topicName} is used in everyday technology we see all around us.`,
            `Instead of rigid manual rules, AI systems learn from examples.`,
            `Machines help people make decisions faster and safer.`,
          ],
          helpers: [ex1.title, ex2.title, 'Smart Devices', 'Everyday Apps'],
          imagePlaceholder: {
            caption: `Real-life situation: ${ex1.title} in everyday life`,
            alt: `Illustration of ${ex1.title}`,
          },
        },
      })

      // b. Learn with Pictures — clear pictures, visual cards, image placeholders
      pushScreen({
        id: `${gradeKey}-t${topicNum}-words`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 2,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'LEARN WITH PICTURES',
        title: `Learn with Pictures: ${topicName}`,
        subtitle: `Visual representations of key AI concepts and mechanisms`,
        contentBlockTitle: 'Learn with Pictures',
        interactionType: 'lets_learn_words',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_words.png`,
        payload: {
          words: [
            { word: 'Data', meaning: 'The input examples AI learns from (photos, words, numbers).' },
            { word: 'Model', meaning: 'The digital brain that spots patterns in data.' },
            { word: 'Prediction', meaning: 'The smart answer or decision output by the AI.' },
          ],
          imagePlaceholder: {
            caption: `Step-by-step visual diagram explaining ${topicName}`,
            alt: `Infographic representing Data -> Model -> Prediction for ${topicName}`,
          },
        },
      })

      // c. Aura AI Teaches — step by step spoken explanation
      pushScreen({
        id: `${gradeKey}-t${topicNum}-story1`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 3,
        pdfPartIndex: 1,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'AURA AI TEACHES • REAL-LIFE STORY',
        title: `Aura AI Teaches: ${topicName}`,
        subtitle: `Listen to Aura AI explain the concept step-by-step`,
        contentBlockTitle: 'Aura AI Story Part 1',
        interactionType: 'picture_story_part1',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_story1.png`,
        payload: {
          storyTitle: topicName,
          panels: [
            { speaker: 'Aura AI', speech: `Think about ${ex1.title}. ${ex1.scenario}` },
            { speaker: 'Student', speech: `So the machine learned from thousands of examples to do that?` },
          ],
          imagePlaceholder: {
            caption: `Story Panel 1 & 2: Aura AI demonstrating ${topicName}`,
            alt: `Visual story scene illustrating ${ex1.title}`,
          },
        },
      })

      // d. Real-Life Example — connecting concept to everyday experience
      pushScreen({
        id: `${gradeKey}-t${topicNum}-story2`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 4,
        pdfPartIndex: 2,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'REAL-LIFE EXAMPLE IN ACTION',
        title: `Everyday Example: ${ex2.title}`,
        subtitle: `How ${topicName} powers tools you use every week`,
        contentBlockTitle: 'Aura AI Story Part 2',
        interactionType: 'picture_story_part2',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_story2.png`,
        payload: {
          storyTitle: topicName,
          panels: [
            { speaker: 'Aura AI', speech: `Exactly! Take ${ex2.title} for instance. ${ex2.scenario}` },
            { speaker: 'Student', speech: `Now I see AI everywhere around me in real life!` },
          ],
          discussionPrompt: `Where else have you seen ${topicName} in action?`,
          drawPrompt: `Sketch an idea of how ${topicName} can help your school or neighborhood:`,
          imagePlaceholder: {
            caption: `Story Panel 3 & 4: Everyday application of ${ex2.title}`,
            alt: `Real life illustration for ${ex2.title}`,
          },
        },
      })

      // e. Guided Activity — moving, matching, connecting visual objects
      pushScreen({
        id: `${gradeKey}-t${topicNum}-act1`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 5,
        pdfPartIndex: 1,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: "GUIDED ACTIVITY • LET'S DO IT!",
        title: `Guided Activity: Hands-on Lab`,
        subtitle: `Follow the interactive steps with Aura AI guidance`,
        contentBlockTitle: "Guided Activity Steps",
        interactionType: 'lets_do_it_steps',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_act1.png`,
        payload: {
          steps: [
            { step: 1, desc: `Examine the everyday scenario of ${ex1.title}.` },
            { step: 2, desc: `Identify which parts represent Data, Model, and Output.` },
            { step: 3, desc: `Complete the interactive simulation challenge below.` },
          ],
        },
      })

      pushScreen({
        id: `${gradeKey}-t${topicNum}-act2`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 5,
        pdfPartIndex: 2,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'GUIDED ACTIVITY • LAB ARENA',
        title: `Interactive Lab: ${topicName}`,
        subtitle: `Complete the mission challenge with Aura AI`,
        contentBlockTitle: 'Interactive Game Challenge',
        interactionType: 'lets_do_it_reflection',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_act2.png`,
        payload: {
          gameTitle: `${topicName} Interactive Simulation`,
          objective: `Activate the 3 stages of ${topicName} to earn bonus XP!`,
          choices: [
            `Collect clean input examples for ${topicName}`,
            `Train the neural weights with feedback`,
            `Test predictions against real outcomes`,
          ],
          progression: [
            'Data verified (+100 pts)',
            'Model trained (+100 pts)',
            'System deployed (+100 pts)',
          ],
          points: 300,
        },
      })

      // f. WORKSHEET Part A — Sort the Cards (Visual Game Mechanic)
      pushScreen({
        id: `${gradeKey}-t${topicNum}-wsa`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 6,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'WORKSHEET PART A • SORT THE CARDS',
        title: `Worksheet: Sort the Cards`,
        subtitle: `Classify each item into the correct category`,
        contentBlockTitle: 'Worksheet Part A',
        interactionType: 'worksheet_choice',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_wsa.png`,
        payload: {
          taskTitle: 'WORKSHEET PART A • SORT THE CARDS',
          instruction: `Sort items related to ${topicName}: Does it use smart learning or is it a simple tool?`,
          items: [ex1.title, 'Simple Wooden Chair', ex2.title, 'Metal Paperclip', 'Autonomous Helper'],
        },
      })

      // f. WORKSHEET Part B — Match the Pairs (Visual Game Mechanic)
      pushScreen({
        id: `${gradeKey}-t${topicNum}-wsb`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 7,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'WORKSHEET PART B • MATCH THE PAIRS',
        title: `Worksheet: Match the Pairs`,
        subtitle: `Drag or tap matching cards together`,
        contentBlockTitle: 'Worksheet Part B',
        interactionType: 'worksheet_matching',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_wsb.png`,
        payload: {
          taskTitle: 'WORKSHEET PART B • MATCH THE PAIRS',
          pairs: [
            { left: ex1.title, right: `Solves ${ex1.scenario.split(' ')[0]} tasks` },
            { left: ex2.title, right: `Recognizes patterns dynamically` },
            { left: 'Training Data', right: 'Input examples used for learning' },
            { left: 'AI Algorithm', right: 'Calculates the best prediction' },
          ],
        },
      })

      // g. QUIZ TIME Part 1 — Visual Match Game (ZERO MCQs)
      pushScreen({
        id: `${gradeKey}-t${topicNum}-qp1`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 8,
        pdfPartIndex: 1,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'QUIZ TIME • REAL LIFE MATCH (PART 1)',
        title: `Quiz Time: Real Life Match`,
        subtitle: `Match real-life situations with AI concepts — No written test!`,
        contentBlockTitle: 'Quiz Time Part 1',
        interactionType: 'quiz_part1',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_qp1.png`,
        payload: {
          pairs: [
            { left: ex1.title, right: 'Machine Learning Application', icon: ex1.icon },
            { left: ex2.title, right: 'Smart Prediction Engine', icon: ex2.icon },
            { left: 'High Quality Data', right: 'Accurate Results', icon: '✨' },
            { left: 'Sensory Input', right: 'Camera & Microphone', icon: '📷' },
          ],
        },
      })

      // g. QUIZ TIME Part 2 — Pipeline Sequencing & Gold Stars (ZERO MCQs)
      pushScreen({
        id: `${gradeKey}-t${topicNum}-qp2`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 8,
        pdfPartIndex: 2,
        pdfTotalParts: 2,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'QUIZ TIME • BUILD THE SEQUENCE (PART 2)',
        title: `Quiz Time: Build the Sequence`,
        subtitle: `Order the steps correctly to earn 5 Gold Stars!`,
        contentBlockTitle: 'Quiz Time Part 2',
        interactionType: 'quiz_part2',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_qp2.png`,
        payload: {
          sequence: [
            { id: 'q_s1', step: 1, text: 'Collect Real-World Examples', icon: '📦' },
            { id: 'q_s2', step: 2, text: 'Train Neural Weights', icon: '🧠' },
            { id: 'q_s3', step: 3, text: 'Validate Accuracy on Test Data', icon: '🎯' },
            { id: 'q_s4', step: 4, text: 'Deploy Smart Application', icon: '🚀' },
          ],
        },
      })

      // h. Completion Feedback & Home Connect
      pushScreen({
        id: `${gradeKey}-t${topicNum}-hc`,
        pdfPageNumber: startPdfPage + tIdx * 8 + 9,
        pdfPartIndex: 1,
        pdfTotalParts: 1,
        monthNumber: monthNum,
        monthTitle: ch.title,
        topicNumber: topicNum,
        topicTitle: topicName,
        pageHeaderCategory: `TOPIC ${topicNum} • MONTH ${monthNum}`,
        pageHeaderTitle: 'COMPLETION FEEDBACK & HOME CONNECT',
        title: `Lesson Complete: ${topicName}`,
        subtitle: `Celebrate what you learned and share with family!`,
        contentBlockTitle: 'Home Connect',
        interactionType: 'home_connect',
        sourcePdfImage: `/gaio/${gradeKey}/pages/t${topicNum}_hc.png`,
        payload: {
          task: `Look for ${ex1.title} and ${ex2.title} around your house or school. Explain how ${topicName} works to someone in your family!`,
          prompt: 'Who did you share this lesson with?',
        },
      })
    })

    // ───────────────────────────────────────────────────────────────────────
    // CHAPTER UNIT REVIEW (END OF MONTH 1 TO 6)
    // ───────────────────────────────────────────────────────────────────────
    pushScreen({
      id: `${gradeKey}-m${monthNum}-rev1`,
      pdfPageNumber: startPdfPage + 17,
      pdfPartIndex: 1,
      pdfTotalParts: 2,
      monthNumber: monthNum,
      monthTitle: ch.title,
      pageHeaderCategory: `MONTH ${monthNum}: ${ch.title}`,
      pageHeaderTitle: 'UNIT REVIEW • SPOT THE ANOMALY',
      title: `Unit Review: Spot the Outlier`,
      subtitle: `Identify the unusual pattern that triggers an AI alert!`,
      contentBlockTitle: 'Unit Review Part 1',
      interactionType: 'unit_review_part1',
      sourcePdfImage: `/gaio/${gradeKey}/pages/m${monthNum}_rev1.png`,
      payload: {
        anomalyItems: [
          { id: 'u_an1', name: 'Regular Data Flow 100 KB/s', icon: '📊', isOutlier: false },
          { id: 'u_an2', name: 'Regular Data Flow 120 KB/s', icon: '📊', isOutlier: false },
          { id: 'u_an3', name: 'UNEXPECTED SPIKE 99,000 KB/s', icon: '🚨', isOutlier: true },
          { id: 'u_an4', name: 'Regular Data Flow 110 KB/s', icon: '📊', isOutlier: false },
        ],
      },
    })

    pushScreen({
      id: `${gradeKey}-m${monthNum}-rev2`,
      pdfPageNumber: startPdfPage + 18,
      pdfPartIndex: 2,
      pdfTotalParts: 2,
      monthNumber: monthNum,
      monthTitle: ch.title,
      pageHeaderCategory: `MONTH ${monthNum}: ${ch.title}`,
      pageHeaderTitle: 'UNIT REVIEW • MODEL TRAINING & TROPHY',
      title: `Unit Review: Feed the AI & Win Trophy`,
      subtitle: `Feed high quality data into the model to unlock Month ${monthNum} Trophy!`,
      contentBlockTitle: 'Unit Review Part 2',
      interactionType: 'unit_review_part2',
      sourcePdfImage: `/gaio/${gradeKey}/pages/m${monthNum}_rev2.png`,
      payload: {
        feedItems: [
          { id: 'u_fd1', name: '10,000 Verified Labeled Examples', icon: '📦', isGoodData: true },
          { id: 'u_fd2', name: 'Corrupted Incomplete Pixels', icon: '🌫️', isGoodData: false },
          { id: 'u_fd3', name: 'Diverse Real-World Sensor Logs', icon: '⚡', isGoodData: true },
          { id: 'u_fd4', name: 'Random Background Static', icon: '🔊', isGoodData: false },
        ],
      },
    })

    pushScreen({
      id: `${gradeKey}-m${monthNum}-ws`,
      pdfPageNumber: startPdfPage + 19,
      pdfPartIndex: 1,
      pdfTotalParts: 1,
      monthNumber: monthNum,
      monthTitle: ch.title,
      pageHeaderCategory: `MONTH ${monthNum}: ${ch.title}`,
      pageHeaderTitle: 'VISUAL VOCABULARY FINDER',
      title: `Month ${monthNum} Vocabulary Discovery`,
      subtitle: `Tap the key AI concepts you explored this month`,
      contentBlockTitle: 'Word Search',
      interactionType: 'word_search',
      sourcePdfImage: `/gaio/${gradeKey}/pages/m${monthNum}_ws.png`,
      payload: {
        words: ['DATA', 'MODEL', 'TRAIN', 'SMART', 'ETHICS'],
      },
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // MONTH 7: OLYMPIAD MASTERY FINALE
  // ─────────────────────────────────────────────────────────────────────────
  pushScreen({
    id: `${gradeKey}-finale-cert`,
    pdfPageNumber: 150,
    pdfPartIndex: 1,
    pdfTotalParts: 1,
    monthNumber: 7,
    monthTitle: 'FINALE',
    pageHeaderCategory: `AI OLYMPIAD • ${meta.title.toUpperCase()}`,
    pageHeaderTitle: 'OLYMPIAD MASTERY & CERTIFICATION',
    title: `Olympiad Mastery Certificate: ${meta.title}`,
    subtitle: `Awarded for completing all 6 chapters with distinction!`,
    contentBlockTitle: 'Certificate of Mastery',
    interactionType: 'certificate',
    sourcePdfImage: `/gaio/${gradeKey}/pages/certificate.png`,
    payload: {
      gradeTitle: meta.title,
      subjectName: spec.subjectName,
      mascotName: meta.mascot,
      starsCollected: 120,
    },
  })

  return screens
}

// Global cache for fast retrieval
const SCREENS_CACHE: Record<string, GaioScreenItem[]> = {}

export function getScreensForAnyGrade(gradeKey: GradeKey | string): GaioScreenItem[] {
  const normKey = (gradeKey || 'class3').toLowerCase()
  if (!SCREENS_CACHE[normKey]) {
    SCREENS_CACHE[normKey] = buildScreensForGrade(normKey)
  }
  return SCREENS_CACHE[normKey]
}
