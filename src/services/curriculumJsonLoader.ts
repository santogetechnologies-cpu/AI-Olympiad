// ─────────────────────────────────────────────────────────────────────────────
// CURRICULUM JSON LOADER
// Loads lesson data from /public/content/{gradeKey}/curriculum.json
// Falls back gracefully to the built-in syllabus spec if the file is missing.
// ─────────────────────────────────────────────────────────────────────────────

export interface CurriculumLessonJson {
  lessonNumber: number
  monthNumber: number
  lessonTitle: string
  intro: string
  learnPoints: string[]
  auraScript: string
  realLifeTitle: string
  realLifeScenario: string
  realLifeIcon: string
  activityTitle: string
  activitySteps: string[]
  worksheetSortItems: string[]
  worksheetPairs: { left: string; right: string }[]
  quizMatchPairs: { left: string; right: string; icon: string }[]
  quizSequence: { id: string; step: number; text: string; icon: string }[]
  completionTask: string
  imagePlaceholders: {
    intro: string
    story: string
    activity: string
  }
}

export interface CurriculumChapterJson {
  chapterNumber: number
  chapterTitle: string
  canonicalKey: 'discover' | 'connect' | 'solve' | 'rise' | 'create' | 'care'
  lessons: CurriculumLessonJson[]
}

export interface CurriculumJson {
  gradeKey: string
  gradeTitle: string
  mascot: string
  mascotEmoji: string
  chapters: CurriculumChapterJson[]
}

// ─── In-memory cache ───────────────────────────────────────────────────────
const CACHE: Record<string, CurriculumJson | null> = {}

/**
 * Attempt to load curriculum JSON from /public/content/{gradeKey}/curriculum.json
 * Returns null if the file does not exist or cannot be parsed.
 */
export async function loadCurriculumJson(gradeKey: string): Promise<CurriculumJson | null> {
  const normKey = gradeKey.toLowerCase()

  if (normKey in CACHE) return CACHE[normKey]

  try {
    const url = `/content/${normKey}/curriculum.json`
    const res = await fetch(url)
    if (!res.ok) {
      CACHE[normKey] = null
      return null
    }
    const data: CurriculumJson = await res.json()
    CACHE[normKey] = data
    return data
  } catch {
    CACHE[normKey] = null
    return null
  }
}

/**
 * Synchronously retrieve a cached curriculum if it was already loaded.
 */
export function getCachedCurriculum(gradeKey: string): CurriculumJson | null {
  return CACHE[gradeKey.toLowerCase()] ?? null
}

/**
 * Pre-warm the cache for all known grade keys.
 * Call this once at app startup (fire-and-forget).
 */
export const ALL_GRADE_KEYS = [
  'class3','class4','class5',
  'class6','class7','class8',
  'class9','class10','class11','class12',
  'ug1','ug2','ug3','ug4',
  'pg1','pg2',
]

export async function prewarmCurriculumCache(): Promise<void> {
  await Promise.allSettled(ALL_GRADE_KEYS.map(loadCurriculumJson))
}
