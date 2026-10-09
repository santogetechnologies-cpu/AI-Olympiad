// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 INTERACTIVE BOOK — TYPES & DATA CONTRACTS
// Exact Source of Truth: GAIO Class3 Book.pdf (All 153 Pages)
// Supports Content-to-Screen Mapping: PDF Page Count != Website Screen Count
// ─────────────────────────────────────────────────────────────────────────────

export type GaioInteractionType =
  | 'book_cover'
  | 'welcome_bolt'
  | 'book_guide'
  | 'student_profile'
  | 'student_faves'
  | 'journey_map'
  | 'month_cover'
  | 'lets_learn_intro'
  | 'lets_learn_words'
  | 'picture_story_part1'
  | 'picture_story_part2'
  | 'look_around_grid'
  | 'look_around_bolt'
  | 'lets_do_it_steps'
  | 'lets_do_it_reflection'
  | 'worksheet_choice'
  | 'worksheet_draw'
  | 'worksheet_matching'
  | 'worksheet_blanks'
  | 'puzzle_odd_one'
  | 'puzzle_count'
  | 'trace_words'
  | 'colour_canvas'
  | 'quiz_part1'
  | 'quiz_part2'
  | 'true_false'
  | 'home_connect'
  | 'unit_review_part1'
  | 'unit_review_part2'
  | 'word_search'
  | 'picture_dictionary'
  | 'olympiad_quiz'
  | 'certificate'
  | 'answer_key'

export interface GaioScreenItem {
  id: string                   // Unique ID e.g. "p2-s1", "p10-s2"
  screenIndex: number          // 0-indexed position (0 to 285)
  screenNumber: number         // 1-indexed display number (1 to 286)
  pdfPageNumber: number        // Exact source PDF page index (1 to 153)
  pdfPartIndex: number         // 1-based part for this PDF page (e.g. 1 of 2)
  pdfTotalParts: number        // Total website screens for this PDF page (e.g. 2)
  monthNumber: number          // 1 to 6 (0 for intro, 7 for finale)
  monthTitle: string           // "AI DISCOVER", "AI CONNECT", etc.
  topicNumber?: number | null  // 1 to 12 if topic page
  topicTitle?: string | null   // "Meet My AI Friend", etc.
  pageHeaderCategory: string   // "MONTH 1: AI DISCOVER", "AI OLYMPIAD • CLASS 3"
  pageHeaderTitle: string      // "TOPIC 1 • MONTH 1 • AI BASICS", "WELCOME!"
  title: string
  subtitle?: string
  contentBlockTitle: string    // Specific content block or activity name
  interactionType: GaioInteractionType
  sourcePdfImage: string       // Path to authentic rendered PDF page PNG
  sectionCropImage?: string    // Path to authentic high-resolution cropped section PNG
  extractedAssets?: any[]      // List of authentic embedded image assets for this screen
  payload: any                 // Structured data payload for this screen
}

export interface GaioStudentProgressState {
  currentScreenIndex: number   // 0-indexed into screens array
  completedScreenIds: string[] // List of screen IDs marked complete
  starsCollected: number
  xpEarned: number
  answers: {
    [screenId: string]: any
  }
}

// ── Legacy Compatibility Types (if needed by older components) ──
export type GaioPageType =
  | 'book_cover'
  | 'intro_welcome'
  | 'month_cover'
  | 'lets_learn'
  | 'picture_story'
  | 'look_around_you'
  | 'lets_do_it'
  | 'worksheet_a'
  | 'worksheet_b'
  | 'puzzle_fun'
  | 'trace_colour'
  | 'quiz_time'
  | 'true_or_false'
  | 'unit_review'
  | 'word_search'

export interface GaioStoryPanel {
  panelNumber: number
  text: string
  imageSrc: string
  alt: string
  audioText?: string
}

export interface GaioHelperItem {
  id: string
  name: string
  description: string
  imageSrc: string
  category?: string
  funFact?: string
}

export interface GaioWorksheetAItem {
  id: string
  text: string
  imageSrc?: string
  isAi: boolean
}

export interface GaioMatchingPair {
  id: string
  leftId: string
  leftLabel: string
  leftImageSrc: string
  rightId: string
  rightLabel: string
  rightDescription?: string
}

export interface GaioPuzzleRow {
  rowNumber: number
  title?: string
  items: {
    id: string
    name: string
    imageSrc?: string
    isOddOneOut: boolean
    explanation: string
  }[]
}

export interface GaioCountItem {
  id: string
  name: string
  imageSrc: string
  targetCount: number
}

export interface GaioQuizQuestion {
  id: string
  questionNumber: number
  questionText: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface GaioTrueFalseItem {
  id: string
  statementNumber: number
  statementText: string
  isTrue: boolean
  imageSrc?: string
  explanation?: string
}

export interface GaioPageConfig {
  pdfPageNumber: number
  displayPageNumber: number
  pageType: GaioPageType
  monthNumber: number
  monthTitle: string
  topicNumber?: number
  topicTitle?: string
  pageHeaderCategory: string
  pageHeaderTitle: string
  title: string
  subtitle?: string
  magicWords?: string[]
  assets: {
    heroImage?: string
    mascotImage?: string
    pagePreview?: string
    extraImages?: string[]
  }
  storyPanels?: GaioStoryPanel[]
  helpers?: GaioHelperItem[]
  robotCommands?: { id: string; command: string; actionName: 'jump' | 'wave' | 'dance' | 'spin'; speech: string }[]
  worksheetAItems?: GaioWorksheetAItem[]
  matchingPairs?: GaioMatchingPair[]
  wordBoxBlanks?: { sentence: string; beforeWord: string; afterWord: string; answerWord: string }[]
  puzzleRows?: GaioPuzzleRow[]
  countItems?: GaioCountItem[]
  traceWords?: string[]
  quizQuestions?: GaioQuizQuestion[]
  trueFalseItems?: GaioTrueFalseItem[]
  homeConnectPrompt?: string
  reviewQuestions?: GaioQuizQuestion[]
  wordSearchData?: { grid: string[][]; wordsToFind: string[] }
}
