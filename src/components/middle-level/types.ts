// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL AI OLYMPIAD (CLASSES 6–8) — TYPES & DATA CONTRACTS
// Official Syllabus Aligned: 6 Chapters per Class × 2 Lessons per Chapter
// ─────────────────────────────────────────────────────────────────────────────

export type MiddleClassKey = 'class6' | 'class7' | 'class8'

export type LessonStageKey =
  | 'briefing'
  | 'concept'
  | 'experiment'
  | 'game'
  | 'python'
  | 'olympiad'
  | 'responsible'

export interface OlympiadQuestion {
  id: string
  questionNumber: number
  questionText: string
  options: {
    key: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  hint?: string
}

export interface GameScenarioChoice {
  id: string
  title: string
  description: string
  actionLabel: string
  isCorrect: boolean
  feedback: string
  points: number
}

export interface GameScenarioItem {
  id: string
  levelNumber: number
  title: string
  evidence: string
  choices: GameScenarioChoice[]
}

export interface InteractiveGameData {
  gameTitle: string
  engineType: string
  objective: string
  rules: string[]
  scenarios: GameScenarioItem[]
}

export interface PythonExerciseData {
  title: string
  description: string
  starterCode: string
  expectedOutput: string
  challengeExtension: string
  concepts: string[]
}

export interface GuidedExperimentData {
  title: string
  objective: string
  steps: {
    stepNumber: number
    title: string
    instruction: string
    systemBehavior: string
  }[]
  parameterControls?: {
    id: string
    label: string
    min: number
    max: number
    defaultValue: number
    unit?: string
  }[]
}

export interface ConceptBlock {
  title: string
  summary: string
  keyPoints: string[]
  comparisonTable?: {
    headers: string[]
    rows: string[][]
  }
}

export interface ResponsibleDilemmaData {
  title: string
  scenario: string
  dilemma: string
  choices: {
    id: string
    action: string
    impactAnalysis: string
    ethicalScore: number // 1 to 5
    consequence: string
  }[]
}

export interface MiddleLessonData {
  id: string
  classKey: MiddleClassKey
  classTitle: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  lessonTitle: string
  syllabusReference: string
  estimatedMinutes: number
  xpReward: number
  badgeTitle: string
  badgeIcon: string
  
  // 7 Modular Stages
  briefing: {
    agentRole: string
    targetEntity: string
    urgency: 'Routine' | 'High' | 'Critical'
    missionBrief: string
    learningObjectives: string[]
    prerequisites: string[]
  }
  concept: {
    mainHeading: string
    overview: string
    blocks: ConceptBlock[]
  }
  experiment: GuidedExperimentData
  game: InteractiveGameData
  python: PythonExerciseData
  olympiad: {
    instructions: string
    passingPercentage: number
    questions: OlympiadQuestion[]
  }
  responsible: ResponsibleDilemmaData
}

export interface MiddleChapterData {
  id: string
  chapterNumber: number
  title: string
  description: string
  icon: string
  lessons: MiddleLessonData[]
}

export interface MiddleClassCurriculum {
  classKey: MiddleClassKey
  className: string
  ageGroup: string
  subtitle: string
  accentColor: string
  chapters: MiddleChapterData[]
}

export interface MiddleStudentProgress {
  currentClass: MiddleClassKey
  currentLessonId: string
  currentStage: LessonStageKey
  completedLessonIds: string[]
  completedStageIds: { [lessonId: string]: LessonStageKey[] }
  olympiadAnswers: { [questionId: string]: { selected: string; isCorrect: boolean } }
  gameScores: { [lessonId: string]: number }
  totalXp: number
  stars: number
  badgesEarned: string[]
}
