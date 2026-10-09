// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 BOOK CONFIGURATION — EXACT SOURCE OF TRUTH (GAIO Class3 Book.pdf)
// Complete verbatim configuration for Month 1 (Pages 1 to 27)
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioPageConfig } from '../types'

export const CLASS3_BOOK_MONTH1_PAGES: GaioPageConfig[] = [
  // ─── PDF PAGE 1: BOOK COVER ────────────────────────────────────────────────
  {
    pdfPageNumber: 1,
    displayPageNumber: 1,
    pageType: 'book_cover',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    pageHeaderCategory: 'GLOBAL AI OLYMPIAD',
    pageHeaderTitle: 'CLASS 3 BOOK',
    title: 'GLOBAL ARTIFICIAL INTELLIGENCE OLYMPIAD',
    subtitle: 'Class 3 • Beginner AI Coursebook & Activity Guide',
    assets: {
      pagePreview: '/gaio/class3/pages/page_1.png',
      heroImage: '/gaio/class3/pages/page_1.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
  },

  // ─── PDF PAGE 2: WELCOME TO AI OLYMPIAD! ───────────────────────────────────
  {
    pdfPageNumber: 2,
    displayPageNumber: 2,
    pageType: 'intro_welcome',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    pageHeaderCategory: 'AI OLYMPIAD • CLASS 3',
    pageHeaderTitle: 'WELCOME!',
    title: 'Welcome to AI Olympiad!',
    subtitle: 'Meet Bolt, your friendly robot companion on this exciting journey.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_2.png',
      heroImage: '/gaio/class3/images/p6_img_1.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
  },

  // ─── PDF PAGE 5: MONTH 1 COVER: AI DISCOVER ────────────────────────────────
  {
    pdfPageNumber: 5,
    displayPageNumber: 5,
    pageType: 'month_cover',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    pageHeaderCategory: 'AI OLYMPIAD • CLASS 3',
    pageHeaderTitle: 'MONTH 1: AI DISCOVER',
    title: 'MONTH 1: AI DISCOVER',
    subtitle: 'See • Understand • Explore',
    assets: {
      pagePreview: '/gaio/class3/pages/page_5.png',
      heroImage: '/gaio/class3/pages/page_5.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
  },

  // ─── PDF PAGE 6: TOPIC 1 — LET'S LEARN: Meet My AI Friend ───────────────────
  {
    pdfPageNumber: 6,
    displayPageNumber: 6,
    pageType: 'lets_learn',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'TOPIC 1 • MONTH 1 • AI BASICS',
    title: 'Meet My AI Friend',
    subtitle: "LET'S LEARN",
    magicWords: ['Robot', 'Helper', 'Smart'],
    assets: {
      pagePreview: '/gaio/class3/pages/page_6.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      heroImage: '/gaio/class3/images/p6_img_1.png',
      extraImages: [
        '/gaio/class3/images/p6_img_7.png', // Smart phone
        '/gaio/class3/images/p6_img_8.png', // Smart speaker
        '/gaio/class3/images/p6_img_9.png', // Robot
        '/gaio/class3/images/p6_img_10.png', // Computer
      ]
    },
  },

  // ─── PDF PAGE 7: PICTURE STORY: Meet My AI Friend ──────────────────────────
  {
    pdfPageNumber: 7,
    displayPageNumber: 7,
    pageType: 'picture_story',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'PICTURE STORY: Meet My AI Friend',
    title: 'Picture Story: Meet My AI Friend',
    subtitle: 'Look at the pictures. Read the story with your teacher.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_7.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      extraImages: [
        '/gaio/class3/images/p7_img_1.png',
        '/gaio/class3/images/p7_img_2.png',
        '/gaio/class3/images/p7_img_3.png',
        '/gaio/class3/images/p7_img_4.png',
      ]
    },
    storyPanels: [
      {
        panelNumber: 1,
        text: 'Meera was drawing. She could not find her yellow crayon.',
        imageSrc: '/gaio/class3/images/p7_img_1.png',
        alt: 'Meera drawing at her desk',
        audioText: 'Meera was drawing. She could not find her yellow crayon.'
      },
      {
        panelNumber: 2,
        text: 'Beep-boop! I saw it under the table!',
        imageSrc: '/gaio/class3/images/p7_img_2.png',
        alt: 'Bolt points under the table',
        audioText: 'Beep-boop! I saw it under the table!'
      },
      {
        panelNumber: 3,
        text: 'Meera and Bolt became best friends.',
        imageSrc: '/gaio/class3/images/p7_img_3.png',
        alt: 'Meera and Bolt high-five',
        audioText: 'Meera and Bolt became best friends.'
      },
      {
        panelNumber: 4,
        text: 'Can you feel happy like me? Bolt said: No, but I can help you draw!',
        imageSrc: '/gaio/class3/images/p7_img_4.png',
        alt: 'Meera asks Bolt if he can feel feelings',
        audioText: 'Can you feel happy like me? Bolt said: No, but I can help you draw!'
      }
    ]
  },

  // ─── PDF PAGE 8: LOOK AROUND YOU: AI Friends All Around Us ─────────────────
  {
    pdfPageNumber: 8,
    displayPageNumber: 8,
    pageType: 'look_around_you',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'LOOK AROUND YOU: AI friends all around us',
    title: 'Look Around You: AI Friends All Around Us',
    subtitle: 'Tap each helper to see how AI works in our daily lives!',
    assets: {
      pagePreview: '/gaio/class3/pages/page_8.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    helpers: [
      {
        id: 'speaker',
        name: 'Smart Speaker',
        description: 'Plays your song when you ask nicely',
        imageSrc: '/gaio/class3/images/p8_img_0.png',
        category: 'Audio Helper'
      },
      {
        id: 'vacuum',
        name: 'Robot Vacuum',
        description: 'Cleans the floor on its own',
        imageSrc: '/gaio/class3/images/p8_img_1.png',
        category: 'Home Helper'
      },
      {
        id: 'drone',
        name: 'Drone Camera',
        description: 'Flies high in the sky to take photos',
        imageSrc: '/gaio/class3/images/p8_img_2.png',
        category: 'Flying Helper'
      },
      {
        id: 'phone',
        name: 'Face Unlock Phone',
        description: 'Opens when it sees your smiling face',
        imageSrc: '/gaio/class3/images/p8_img_3.png',
        category: 'Vision Helper'
      },
      {
        id: 'toy',
        name: 'Smart Toy',
        description: 'Talks and plays games with you',
        imageSrc: '/gaio/class3/images/p8_img_4.png',
        category: 'Play Helper'
      },
      {
        id: 'tv',
        name: 'Smart TV',
        description: 'Shows cartoons you love to watch',
        imageSrc: '/gaio/class3/images/p8_img_5.png',
        category: 'Screen Helper'
      }
    ]
  },

  // ─── PDF PAGE 9: LET'S DO IT! Robot Says! ──────────────────────────────────
  {
    pdfPageNumber: 9,
    displayPageNumber: 9,
    pageType: 'lets_do_it',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: "LET'S DO IT! Robot Says!",
    title: "LET'S DO IT! Robot Says!",
    subtitle: 'Give Bolt a command and watch him follow your instructions!',
    assets: {
      pagePreview: '/gaio/class3/pages/page_9.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      heroImage: '/gaio/class3/images/p9_img_2.png',
    },
    robotCommands: [
      { id: 'c1', command: 'Robot, jump!', actionName: 'jump', speech: 'Boing! Jumping high into the sky!' },
      { id: 'c2', command: 'Robot, wave!', actionName: 'wave', speech: 'Hello friend! Waving my hands to you!' },
      { id: 'c3', command: 'Robot, dance!', actionName: 'dance', speech: 'Groovy robotic beats! Let us dance!' },
      { id: 'c4', command: 'Robot, spin!', actionName: 'spin', speech: 'Wheee! Spinning 360 degrees around!' },
    ]
  },

  // ─── PDF PAGE 10: WORKSHEET (Part A): Does it use AI? ──────────────────────
  {
    pdfPageNumber: 10,
    displayPageNumber: 10,
    pageType: 'worksheet_a',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'WORKSHEET: Meet My AI Friend (Part A)',
    title: 'Worksheet: Meet My AI Friend (Part A)',
    subtitle: '1. Does it use AI? Tick YES or NO.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_10.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    worksheetAItems: [
      { id: 'w1', text: 'Smart speaker (plays music when asked)', imageSrc: '/gaio/class3/images/p10_img_1.png', isAi: true },
      { id: 'w2', text: 'Wooden chair', imageSrc: '/gaio/class3/images/p10_img_2.png', isAi: false },
      { id: 'w3', text: 'Self-driving car', imageSrc: '/gaio/class3/images/p10_img_3.png', isAi: true },
      { id: 'w4', text: 'Bicycle', imageSrc: '/gaio/class3/images/p10_img_4.png', isAi: false },
      { id: 'w5', text: 'Phone that recognizes your face', imageSrc: '/gaio/class3/images/p10_img_5.png', isAi: true }
    ]
  },

  // ─── PDF PAGE 11: WORKSHEET (Part B): Match helper to job ──────────────────
  {
    pdfPageNumber: 11,
    displayPageNumber: 11,
    pageType: 'worksheet_b',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'WORKSHEET: Meet My AI Friend (Part B)',
    title: 'Worksheet: Meet My AI Friend (Part B)',
    subtitle: '1. Match each AI helper to its job. 2. Fill in the blanks.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_11.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    matchingPairs: [
      {
        id: 'm1',
        leftId: 'speaker',
        leftLabel: 'Smart Speaker',
        leftImageSrc: '/gaio/class3/images/p11_img_1.png',
        rightId: 'music',
        rightLabel: 'Plays your favorite music',
      },
      {
        id: 'm2',
        leftId: 'drone',
        leftLabel: 'Drone Camera',
        leftImageSrc: '/gaio/class3/images/p11_img_2.png',
        rightId: 'sky',
        rightLabel: 'Takes photos from high in the sky',
      },
      {
        id: 'm3',
        leftId: 'vacuum',
        leftLabel: 'Robot Vacuum',
        leftImageSrc: '/gaio/class3/images/p11_img_3.png',
        rightId: 'floor',
        rightLabel: 'Cleans the floor',
      },
      {
        id: 'm4',
        leftId: 'phone',
        leftLabel: 'Face Unlock',
        leftImageSrc: '/gaio/class3/images/p11_img_4.png',
        rightId: 'face',
        rightLabel: 'Opens the phone when it sees you',
      }
    ],
    wordBoxBlanks: [
      { sentence: 'AI is a _____ that does jobs.', beforeWord: 'AI is a', afterWord: 'that does jobs.', answerWord: 'helper' },
      { sentence: 'AI can _____ and learn a little.', beforeWord: 'AI can', afterWord: 'and learn a little.', answerWord: 'think' },
      { sentence: 'A _____ phone has AI inside.', beforeWord: 'A', afterWord: 'phone has AI inside.', answerWord: 'smart' }
    ]
  },

  // ─── PDF PAGE 12: PUZZLE FUN: Odd one out & Count ──────────────────────────
  {
    pdfPageNumber: 12,
    displayPageNumber: 12,
    pageType: 'puzzle_fun',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'PUZZLE FUN: Meet My AI Friend',
    title: 'Puzzle Fun: Meet My AI Friend',
    subtitle: '1. Odd one out! 2. Count and write!',
    assets: {
      pagePreview: '/gaio/class3/pages/page_12.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    puzzleRows: [
      {
        rowNumber: 1,
        title: 'Row 1',
        items: [
          { id: 'r1_1', name: 'Smart speaker', imageSrc: '/gaio/class3/images/p12_img_1.png', isOddOneOut: false, explanation: 'Smart speaker uses AI' },
          { id: 'r1_2', name: 'Smart phone', imageSrc: '/gaio/class3/images/p12_img_2.png', isOddOneOut: false, explanation: 'Smart phone uses AI' },
          { id: 'r1_3', name: 'Apple', imageSrc: '/gaio/class3/images/p12_img_3.png', isOddOneOut: true, explanation: 'Correct! An apple is fresh fruit, not a smart machine!' },
          { id: 'r1_4', name: 'Computer', imageSrc: '/gaio/class3/images/p12_img_4.png', isOddOneOut: false, explanation: 'Computer is a machine' }
        ]
      },
      {
        rowNumber: 2,
        title: 'Row 2',
        items: [
          { id: 'r2_1', name: 'Pencil', imageSrc: '/gaio/class3/images/p12_img_5.png', isOddOneOut: true, explanation: 'Correct! A pencil is a simple drawing tool, not a powered robot!' },
          { id: 'r2_2', name: 'Robot', imageSrc: '/gaio/class3/images/p12_img_6.png', isOddOneOut: false, explanation: 'Robot is an automated helper' },
          { id: 'r2_3', name: 'Self-driving car', imageSrc: '/gaio/class3/images/p12_img_7.png', isOddOneOut: false, explanation: 'Car uses smart sensors' },
          { id: 'r2_4', name: 'Drone', imageSrc: '/gaio/class3/images/p12_img_8.png', isOddOneOut: false, explanation: 'Drone flies using smart controls' }
        ]
      }
    ],
    countItems: [
      { id: 'robots', name: 'Robots', imageSrc: '/gaio/class3/images/p12_img_9.png', targetCount: 4 },
      { id: 'phones', name: 'Smartphones', imageSrc: '/gaio/class3/images/p12_img_10.png', targetCount: 3 },
      { id: 'drones', name: 'Drones', imageSrc: '/gaio/class3/images/p12_img_11.png', targetCount: 2 }
    ]
  },

  // ─── PDF PAGE 13: TRACE & COLOUR: Meet My AI Friend ────────────────────────
  {
    pdfPageNumber: 13,
    displayPageNumber: 13,
    pageType: 'trace_colour',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'TRACE & COLOUR: Meet My AI Friend',
    title: 'Trace & Colour: Meet My AI Friend',
    subtitle: 'Trace the magic words. Then give Bolt colorful robot armor!',
    assets: {
      pagePreview: '/gaio/class3/pages/page_13.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      heroImage: '/gaio/class3/images/p13_img_9.png',
    },
    traceWords: ['ARTIFICIAL', 'INTELLIGENCE', 'HELPER']
  },

  // ─── PDF PAGE 14: QUIZ TIME: Meet My AI Friend ─────────────────────────────
  {
    pdfPageNumber: 14,
    displayPageNumber: 14,
    pageType: 'quiz_time',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'QUIZ TIME: Meet My AI Friend',
    title: 'Quiz Time: Meet My AI Friend',
    subtitle: 'Circle the right answer! Earn gold stars for each correct answer.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_14.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    quizQuestions: [
      {
        id: 'q1',
        questionNumber: 1,
        questionText: 'Q1. AI is short for...',
        options: ['Apple Inside', 'Artificial Intelligence', 'Always Interesting'],
        correctIndex: 1,
        explanation: 'AI stands for Artificial Intelligence!'
      },
      {
        id: 'q2',
        questionNumber: 2,
        questionText: 'Q2. Which of these uses AI?',
        options: ['Smart speaker', 'Wooden pencil', 'Cardboard box'],
        correctIndex: 0,
        explanation: 'Smart speakers listen and answer using AI!'
      },
      {
        id: 'q3',
        questionNumber: 3,
        questionText: 'Q3. Can AI feel sad when it rains?',
        options: ['Yes', 'No', 'Only sometimes'],
        correctIndex: 1,
        explanation: 'AI has no feelings. It is a computer helper!'
      },
      {
        id: 'q4',
        questionNumber: 4,
        questionText: "Q4. What was the robot's name in the story?",
        options: ['Bolt', 'Max', 'Luna'],
        correctIndex: 0,
        explanation: 'Bolt is Meera\'s friendly AI robot!'
      },
      {
        id: 'q5',
        questionNumber: 5,
        questionText: 'Q5. Which one is NOT an AI helper?',
        options: ['Robot vacuum', 'Drone camera', 'Wooden chair'],
        correctIndex: 2,
        explanation: 'A wooden chair is simple furniture, not an AI helper!'
      }
    ]
  },

  // ─── PDF PAGE 15: TRUE OR FALSE: Meet My AI Friend ─────────────────────────
  {
    pdfPageNumber: 15,
    displayPageNumber: 15,
    pageType: 'true_or_false',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 1,
    topicTitle: 'Meet My AI Friend',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'TRUE OR FALSE: Meet My AI Friend',
    title: 'True or False: Meet My AI Friend',
    subtitle: 'Look at the statements. Tick TRUE or FALSE.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_15.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      extraImages: [
        '/gaio/class3/images/p15_img_0.png', // Home connect
        '/gaio/class3/images/p15_img_1.png', // Rating faces
      ]
    },
    trueFalseItems: [
      { id: 'tf1', statementNumber: 1, statementText: 'AI means Artificial Intelligence.', isTrue: true },
      { id: 'tf2', statementNumber: 2, statementText: 'A regular bicycle uses AI.', isTrue: false },
      { id: 'tf3', statementNumber: 3, statementText: 'AI can help clean floors.', isTrue: true },
      { id: 'tf4', statementNumber: 4, statementText: 'AI can feel angry.', isTrue: false },
      { id: 'tf5', statementNumber: 5, statementText: 'Smart speakers can play music when you ask.', isTrue: true },
      { id: 'tf6', statementNumber: 6, statementText: 'AI is here to help us.', isTrue: true },
    ],
    homeConnectPrompt: 'Ask someone at home: "Do we have any smart devices in our house?" Make a list together!'
  },

  // ─── PDF PAGE 16: TOPIC 2 — LET'S LEARN: Machines That Help Us ──────────────
  {
    pdfPageNumber: 16,
    displayPageNumber: 16,
    pageType: 'lets_learn',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 2,
    topicTitle: 'Machines That Help Us',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'TOPIC 2 • MONTH 1 • AI BASICS',
    title: 'Machines That Help Us',
    subtitle: "LET'S LEARN",
    magicWords: ['Machine', 'Power', 'Smart'],
    assets: {
      pagePreview: '/gaio/class3/pages/page_16.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
      heroImage: '/gaio/class3/pages/page_16.png',
    },
  },

  // ─── PDF PAGE 17: PICTURE STORY: Machines That Help Us ──────────────────────
  {
    pdfPageNumber: 17,
    displayPageNumber: 17,
    pageType: 'picture_story',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    topicNumber: 2,
    topicTitle: 'Machines That Help Us',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'PICTURE STORY: Machines That Help Us',
    title: 'Picture Story: Machines That Help Us',
    subtitle: 'Look at the pictures. Read the story with your teacher.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_17.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    storyPanels: [
      {
        panelNumber: 1,
        text: 'Ravi was washing his socks by hand. It took a very long time.',
        imageSrc: '/gaio/class3/pages/page_17.png',
        alt: 'Washing by hand',
        audioText: 'Ravi was washing his socks by hand. It took a very long time.'
      },
      {
        panelNumber: 2,
        text: 'Mom put the clothes in the washing machine. Whirrr! Clean in minutes!',
        imageSrc: '/gaio/class3/pages/page_17.png',
        alt: 'Washing machine running',
        audioText: 'Mom put the clothes in the washing machine. Whirrr! Clean in minutes!'
      },
      {
        panelNumber: 3,
        text: 'A smart machine can even choose the right water temperature!',
        imageSrc: '/gaio/class3/pages/page_17.png',
        alt: 'Smart dials',
        audioText: 'A smart machine can even choose the right water temperature!'
      },
      {
        panelNumber: 4,
        text: 'Machines save our time so we can learn and play more!',
        imageSrc: '/gaio/class3/pages/page_17.png',
        alt: 'Happy children playing',
        audioText: 'Machines save our time so we can learn and play more!'
      }
    ]
  },

  // ─── PDF PAGE 26: UNIT REVIEW: AI DISCOVER ─────────────────────────────────
  {
    pdfPageNumber: 26,
    displayPageNumber: 26,
    pageType: 'unit_review',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'UNIT REVIEW: AI DISCOVER',
    title: 'Unit Review: AI Discover',
    subtitle: 'Great job completing Month 1! Test what you have learned.',
    assets: {
      pagePreview: '/gaio/class3/pages/page_26.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    reviewQuestions: [
      {
        id: 'rq1',
        questionNumber: 1,
        questionText: 'What makes a smart machine different from a regular machine?',
        options: ['It uses batteries', 'It can think and learn a little', 'It is made of wood'],
        correctIndex: 1,
        explanation: 'Smart machines have AI inside that lets them learn and assist!'
      },
      {
        id: 'rq2',
        questionNumber: 2,
        questionText: 'Which helper can fly to capture videos?',
        options: ['Drone camera', 'Smart TV', 'Robot vacuum'],
        correctIndex: 0,
        explanation: 'Drones fly in the sky!'
      }
    ]
  },

  // ─── PDF PAGE 27: WORD SEARCH: AI DISCOVER ─────────────────────────────────
  {
    pdfPageNumber: 27,
    displayPageNumber: 27,
    pageType: 'word_search',
    monthNumber: 1,
    monthTitle: 'AI DISCOVER',
    pageHeaderCategory: 'MONTH 1: AI DISCOVER',
    pageHeaderTitle: 'WORD SEARCH: AI DISCOVER',
    title: 'Word Search: AI Discover',
    subtitle: 'Find these words: ROBOT, SMART, HELPER, THINK, DRONE',
    assets: {
      pagePreview: '/gaio/class3/pages/page_27.png',
      mascotImage: '/gaio/class3/images/p6_img_0.png',
    },
    wordSearchData: {
      grid: [
        ['R', 'O', 'B', 'O', 'T', 'X'],
        ['H', 'E', 'L', 'P', 'E', 'R'],
        ['S', 'M', 'A', 'R', 'T', 'A'],
        ['T', 'H', 'I', 'N', 'K', 'I'],
        ['D', 'R', 'O', 'N', 'E', 'Z']
      ],
      wordsToFind: ['ROBOT', 'HELPER', 'SMART', 'THINK', 'DRONE']
    }
  }
]
