// ─────────────────────────────────────────────────────────────────────────────
// HIGHER EDUCATION GAMIFIED INTERACTIVE LEARNING — TYPES & DATA CONTRACTS
// Covers Undergraduate (UG 1–4) and Postgraduate (PG 1–2) Levels
// Minimalist, high-tech, screen-by-screen mission-driven learning flow
// ─────────────────────────────────────────────────────────────────────────────

export type HigherEdLevelKey = 'ug1' | 'ug2' | 'ug3' | 'ug4' | 'pg1' | 'pg2'

export type HigherEdScreenType =
  | 'briefing'       // Screen 1: Tactical scenario, mathematical formulas, theory
  | 'architecture'   // Screen 2: Interactive system architecture, dataflow inspection
  | 'code_lab'       // Screen 3: Runnable Python/PyTorch code editor with live execution
  | 'mission'        // Screen 4: Gamified interactive mission / engineering quest
  | 'olympiad_quiz'  // Screen 5: Conceptual & scenario Olympiad assessments + certification

export interface HigherEdArchitectureNode {
  id: string
  name: string
  role: string
  status: 'active' | 'standby' | 'monitored' | 'critical'
  details: string
  metric?: string
}

export interface HigherEdArchitectureData {
  title: string
  subtitle: string
  nodes: HigherEdArchitectureNode[]
  dataflowDescription: string
  invariants: string[]
}

export interface HigherEdCodeLabData {
  language: string
  filename: string
  code: string
  parameters: {
    id: string
    label: string
    min: number
    max: number
    step: number
    defaultValue: number
    unit?: string
  }[]
  executionLogs: (params: Record<string, number>) => {
    output: string[]
    metrics: Record<string, string | number>
    success: boolean
  }
}

export type HigherEdMissionType =
  | 'parameter_tuner'      // Sliders to reach target performance without exceeding bounds
  | 'architecture_match'   // Match subsystems to roles/threats
  | 'bug_patcher'          // Inspect code snippet and select the fatal flaw + patch
  | 'decision_matrix'      // Multi-criteria trade-off scenario with quantitative scoring

export interface HigherEdMissionData {
  missionType: HigherEdMissionType
  badge: string
  missionTitle: string
  brief: string
  constraints: string[]
  successCriteria: string
  // For parameter tuner:
  tunerConfig?: {
    sliders: {
      id: string
      name: string
      min: number
      max: number
      step: number
      initial: number
      targetMin: number
      targetMax: number
      unit: string
    }[]
    targetGoalText: string
  }
  // For architecture match:
  matchPairs?: {
    id: string
    subsystem: string
    purpose: string
  }[]
  // For bug patcher:
  bugConfig?: {
    codeSnippet: string
    vulnerabilities: {
      id: string
      description: string
      isCritical: boolean
      explanation: string
    }[]
    fixAction: string
  }
  // For decision matrix:
  decisions?: {
    id: string
    title: string
    description: string
    impact: { latency: string; accuracy: string; cost: string; safety: string }
    score: number
    isOptimal: boolean
    feedback: string
  }[]
}

export interface HigherEdQuizQuestion {
  id: string
  type: 'conceptual' | 'scenario'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  hint?: string
}

export interface HigherEdScreenItem {
  id: string
  screenNumber: number       // 1 to 5 within lesson
  totalScreensInLesson: number // 5
  screenType: HigherEdScreenType
  levelKey: HigherEdLevelKey
  chapterNumber: number      // 1 to 6
  lessonNumber: number       // 1 or 2
  lessonTitle: string
  chapterTitle: string
  title: string
  subtitle: string
  // Payload variants based on screenType:
  briefingPayload?: {
    scenario: string
    theoryLatex: string
    theoryText: string
    learningOutcomes: string[]
    prerequisites: string[]
  }
  architecturePayload?: HigherEdArchitectureData
  codeLabPayload?: HigherEdCodeLabData
  missionPayload?: HigherEdMissionData
  quizPayload?: {
    questions: HigherEdQuizQuestion[]
    xpReward: number
    badgeEarned: string
  }
}

export interface HigherEdLesson {
  lessonNumber: 1 | 2
  title: string
  syllabusTopic: string
  screens: HigherEdScreenItem[]
}

export interface HigherEdChapter {
  chapterNumber: number
  title: string
  description: string
  lessons: [HigherEdLesson, HigherEdLesson]
}

export interface HigherEdLevel {
  levelKey: HigherEdLevelKey
  name: string
  shortCode: string
  tier: 'Undergraduate' | 'Postgraduate'
  themeColor: string
  description: string
  chapters: HigherEdChapter[]
}

export interface HigherEdProgressState {
  completedScreenIds: string[]
  completedLessons: string[]
  xpEarned: number
  unlockedBadges: string[]
  answers: Record<string, any>
}
