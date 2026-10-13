import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES FOR MANIFEST & UNIFIED CONTENT LOADER
// ─────────────────────────────────────────────────────────────────────────────

export interface ManifestLessonInfo {
  lessonNumber: number
  lessonId: string
  title: string
  lessonTitle?: string
  contentFile?: string
  status?: string
}

export interface ManifestChapterInfo {
  chapterNumber: number
  chapterId: string
  title: string
  chapterTitle?: string
  theme?: string
  months?: number[]
  lessons: ManifestLessonInfo[]
}

export interface ManifestClassInfo {
  classId: string
  classNumber: number
  className: string
  ageGroup?: string
  mascot?: string
  theme?: string
  description?: string
  chapters: ManifestChapterInfo[]
}

export interface LevelManifest {
  level: string
  levelName?: string
  classes: ManifestClassInfo[]
}

export interface LessonSectionExample {
  title: string
  description: string
  realLifeScenario?: string
}

export interface LessonSection {
  sectionId: string
  title: string
  content: string
  examples?: LessonSectionExample[]
  keyPoints?: string[]
}

export interface LessonActivity {
  activityId: string
  title: string
  description: string
  instructions: string[]
  materials: string
  duration: string
}

export interface LessonIntroduction {
  duration: string
  overview: string
  welcomeMessage?: string
  learningObjectives: string[]
}

export interface LessonSummary {
  recap: string
  keyTakeaways: string[]
}

export interface LessonData {
  lessonId: string
  title: string
  lessonTitle?: string
  level: string
  classNumber: number | string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  introduction: LessonIntroduction
  sections: LessonSection[]
  activities: LessonActivity[]
  summary: LessonSummary
  content?: any
  loading?: boolean
  error?: string | null
}

export interface LevelsConfig {
  levels: {
    id: string
    name: string
    description: string
    grades: string[]
  }[]
}

const DEFAULT_LEVELS_CONFIG: LevelsConfig = {
  levels: [
    {
      id: 'junior',
      name: 'Junior Level',
      description: 'Classes 3-5 (Foundational AI play & concepts)',
      grades: ['class3', 'class4', 'class5'],
    },
    {
      id: 'middle',
      name: 'Middle Level',
      description: 'Classes 6-8 (Everyday AI systems & exploration)',
      grades: ['class6', 'class7', 'class8'],
    },
    {
      id: 'senior',
      name: 'Senior Level',
      description: 'Classes 9-12 (Applied AI & real-world innovation)',
      grades: ['class9', 'class10', 'class11', 'class12'],
    },
    {
      id: 'supersenior',
      name: 'Super Senior Level',
      description: 'UG & PG (AI architecture, research & careers)',
      grades: ['ug1', 'ug2', 'ug3', 'ug4', 'pg1', 'pg2'],
    },
  ],
}

/**
 * Hook to retrieve configuration for all 4 academic tiers
 */
export function useLevelsConfig(): LevelsConfig {
  return DEFAULT_LEVELS_CONFIG
}

/**
 * Hook to fetch manifest for a level (e.g. 'junior', 'middle', 'senior', 'supersenior')
 */
export function useLevelManifest(level: string): LevelManifest | null {
  const [manifest, setManifest] = useState<LevelManifest | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = `/content/${level}/${level}-manifest.json`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Manifest not found at ${url}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        // Normalize classes/chapters/lessons data shape
        const normalizedClasses: ManifestClassInfo[] = (data.classes || []).map((cls: any) => ({
          classId: cls.classId || `class${cls.classNumber || 3}`,
          classNumber: cls.classNumber || 3,
          className: cls.className || `Class ${cls.classNumber || 3}`,
          ageGroup: cls.ageGroup,
          mascot: cls.mascot,
          theme: cls.theme,
          description: cls.description,
          chapters: (cls.chapters || []).map((ch: any) => ({
            chapterNumber: ch.chapterNumber || 1,
            chapterId: ch.chapterId || `ch${ch.chapterNumber || 1}`,
            title: ch.title || ch.chapterTitle || `Chapter ${ch.chapterNumber || 1}`,
            chapterTitle: ch.chapterTitle || ch.title,
            theme: ch.theme,
            months: ch.months,
            lessons: (ch.lessons || []).map((l: any) => ({
              lessonNumber: l.lessonNumber || 1,
              lessonId: l.lessonId || `l${l.lessonNumber || 1}`,
              title: l.title || l.lessonTitle || `Lesson ${l.lessonNumber || 1}`,
              lessonTitle: l.lessonTitle || l.title,
              contentFile: l.contentFile,
              status: l.status,
            })),
          })),
        }))

        setManifest({
          level: data.level || level,
          levelName: data.levelName || `${level.charAt(0).toUpperCase() + level.slice(1)} Level`,
          classes: normalizedClasses,
        })
      })
      .catch(() => {
        if (cancelled) return
        // Fallback default manifest if fetch fails
        setManifest({
          level,
          levelName: `${level.charAt(0).toUpperCase() + level.slice(1)} Level`,
          classes: [
            {
              classId: 'class3',
              classNumber: 3,
              className: 'Class 3',
              chapters: [
                {
                  chapterNumber: 1,
                  chapterId: 'ch1',
                  title: 'AI Basics',
                  lessons: [
                    {
                      lessonNumber: 1,
                      lessonId: 'l1',
                      title: 'Meet My AI Friend',
                    },
                  ],
                },
              ],
            },
          ],
        })
      })

    return () => {
      cancelled = true
    }
  }, [level])

  return manifest
}

/**
 * Hook to fetch lesson content JSON. Supports both signatures:
 * Signature 1: useLessonContent(level, filename)
 * Signature 2: useLessonContent(level, classNumber, chapterNumber, lessonNumber)
 */
export function useLessonContent(
  level: string,
  classOrFilename: string | number,
  chapterNumber?: number,
  lessonNumber?: number
): LessonData & { content: any; loading: boolean; error: string | null } {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    let url = ''
    if (typeof classOrFilename === 'string' && classOrFilename.endsWith('.json')) {
      url = `/content/${level}/${classOrFilename}`
    } else {
      const clsNum = classOrFilename
      const chNum = chapterNumber || 1
      const lNum = lessonNumber || 1
      url = `/content/${level}/${level}-class${clsNum}-ch${chNum}-l${lNum}.json`
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          // If specific file not found, try template
          return fetch('/content/lesson-template.json').then((tRes) => {
            if (!tRes.ok) throw new Error(`Could not load lesson from ${url}`)
            return tRes.json()
          })
        }
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Failed to load lesson')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [level, classOrFilename, chapterNumber, lessonNumber])

  // Adapt raw JSON into structured LessonData
  const title = data?.lessonTitle || data?.title || 'Interactive AI Lesson'
  const introduction: LessonIntroduction = {
    duration: data?.metadata?.duration || '45 mins',
    overview:
      data?.content?.introduction?.story?.content ||
      data?.content?.introduction?.welcomeMessage ||
      'Welcome to this hands-on AI Olympiad lesson.',
    welcomeMessage: data?.content?.introduction?.welcomeMessage || 'Welcome!',
    learningObjectives:
      data?.content?.introduction?.learningGoals ||
      data?.learningObjectives || [
        'Understand key AI concepts',
        'Recognize practical real-world applications',
        'Practice with hands-on activities',
      ],
  }

  const sections: LessonSection[] = (data?.content?.mainConcept?.sections || []).map(
    (sec: any, idx: number) => ({
      sectionId: sec.id || `sec-${idx}`,
      title: sec.title || `Concept ${idx + 1}`,
      content: sec.simpleExplanation || sec.content || '',
      examples: sec.realLifeExample
        ? [
            {
              title: sec.realLifeExample.scenario || 'Real-Life Example',
              description: sec.realLifeExample.aiConnection || '',
              realLifeScenario: sec.realLifeExample.observation || '',
            },
          ]
        : [],
      keyPoints: sec.keyPoints || [],
    })
  )

  const activities: LessonActivity[] = (data?.content?.activities || []).map(
    (act: any, idx: number) => ({
      activityId: act.activityId || `act-${idx}`,
      title: act.title || `Activity ${idx + 1}`,
      description: act.description || '',
      instructions: act.steps || act.instructions || [],
      materials: (act.materials || []).join(', ') || 'Paper, pencil, curious mind',
      duration: act.duration || '15 mins',
    })
  )

  const summary: LessonSummary = {
    recap:
      data?.content?.lessonSummary?.auraClosing?.congratulations ||
      'Great work completing this lesson! You are building your AI skills.',
    keyTakeaways:
      data?.content?.lessonSummary?.keyTakeaways || [
        'AI learns from patterns and examples',
        'AI assists in everyday life tasks',
        'Think carefully and use AI responsibly',
      ],
  }

  return {
    lessonId: data?.lessonId || 'lesson-1',
    title,
    lessonTitle: title,
    level,
    classNumber: data?.classNumber || 3,
    chapterNumber: data?.chapterNumber || 1,
    chapterTitle: data?.chapterTitle || 'AI Basics',
    lessonNumber: data?.lessonNumber || 1,
    introduction,
    sections,
    activities,
    summary,
    content: data,
    loading,
    error,
  }
}
