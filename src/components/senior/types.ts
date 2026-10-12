// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL AI OLYMPIAD INTERACTIVE BOOK — TYPES & DATA CONTRACTS
// Classes 9, 10, 11, and 12 (Authoritative 6-Month Senior Curriculum)
// ─────────────────────────────────────────────────────────────────────────────

export type SeniorStageType =
  | 'mission_briefing'
  | 'deep_theory'
  | 'guided_walkthrough'
  | 'interactive_simulation'
  | 'python_code_lab'
  | 'olympiad_arena'
  | 'responsible_ai_debrief'

export interface OlympiadOption {
  key: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface OlympiadQuestion {
  questionNumber: number
  stem: string
  options: OlympiadOption[]
  correctOption: 'A' | 'B' | 'C' | 'D'
  explanation: string
}

export interface SeniorLessonData {
  grade: string              // "Class 9", "Class 10", "Class 11", "Class 12"
  gradeNumber: number        // 9, 10, 11, 12
  chapterNumber: number      // 1 to 6
  chapterTitle: string       // "AI Basics", etc.
  lessonNumber: number       // 1 or 2
  lessonTitle: string        // "From Data to Intelligence", etc.
  strand: string
  vocab: string[]
  objectives: string[]
  mission: {
    title: string
    body: string
  }
  theory: {
    fullText: string
  }
  walkthrough: {
    fullText: string
  }
  simulation: {
    type: string
    title: string
    spec: string
  }
  codeLab: {
    title: string
    code: string
    expectedOutput: string
  }
  olympiad: OlympiadQuestion[]
  reflection: {
    text: string
    rubric: {
      exemplary: string
      proficient: string
      developing: string
    }
    badgeTitle: string
    xpReward: number
  }
}

export interface SeniorScreenItem {
  id: string                   // "g9-c1-l1-s1"
  screenIndex: number          // 0 to 335
  screenNumber: number         // 1 to 336
  stepNumber: number           // 1 to 7
  totalLessonSteps: number     // 7
  stageType: SeniorStageType
  stageTitle: string
  grade: string
  gradeNumber: number
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  lessonTitle: string
  strand: string
  vocab: string[]
  lesson: SeniorLessonData
}

export interface SeniorProgressState {
  currentScreenIndex: number
  completedScreenIds: string[]
  starsCollected: number
  xpEarned: number
  streakDays: number
  answers: {
    [key: string]: any
  }
}
