import { supabase } from '../lib/supabase'
import { chapterService } from './chapterService'
import { chapterContentService } from './chapterContentService'
import {
  lessonService,
  videoService,
  worksheetService,
  activityService,
  assignmentService,
  quizService,
  questionService,
} from './contentServices'
import {
  ALL_LEVELS_CURRICULUM,
  SYLLABUS_SPECS,
  type LevelData,
  type ChapterData,
} from './curriculumData'
import type { ChapterContent } from '../types'

export interface LevelCurriculum {
  className: string
  classCode: string
  ageGroup: string
  description: string
  tier: 'primary' | 'middle' | 'secondary' | 'ug' | 'pg'
  subjects: {
    name: string
    code: string
    description: string
    chapters: {
      chapterNumber: string
      title: string
      shortDescription: string
      description: string
      duration: number
      sections: {
        title: string
        type: 'video' | 'lesson' | 'worksheet' | 'resource' | 'activity' | 'assignment' | 'quiz'
        description: string
        isRequired: boolean
        data: {
          videoUrl?: string
          videoDescription?: string
          lessonContent?: string
          imageSrc?: string
          imageCaption?: string
          imageAlt?: string
          mcq?: {
            question: string
            options: string[]
            correctIndex: number
            explanation: string
            hint: string
          }
          matchingPairs?: {
            title: string
            pairs: { id: string; term: string; definition: string }[]
          }
          workbookInstructions?: string
          questions?: { q: string; a: string }[]
          practicalTasks?: {
            checklist: string[]
            starterPrompt: string
          }
          assignmentInstructions?: string
          maxMarks?: number
          quiz?: {
            instructions: string
            passingPercentage: number
            timeLimit: number
            questions: {
              question: string
              options: { text: string; isCorrect: boolean }[]
              explanation: string
            }[]
          }
        }
      }[]
    }[]
  }[]
}

function buildSectionsForChapter(level: LevelData, chap: ChapterData) {
  const l1 = chap.lesson1
  const l2 = chap.lesson2
  const l3 = chap.lesson3

  return [
    // 1. Video Briefing
    {
      title: `Video Briefing: ${chap.chapterTitle}`,
      type: 'video' as const,
      description: `Visual walkthrough and interactive animation covering ${chap.topic1}, ${chap.topic2} and ${chap.topic3}.`,
      isRequired: true,
      data: {
        videoUrl: undefined,
        videoDescription: `Comprehensive multimedia introduction for ${level.name} exploring ${chap.topic1}, ${chap.topic2} & ${chap.topic3}.`,
      },
    },
    // 2. Lesson 1
    {
      title: `Lesson 1: ${chap.topic1}`,
      type: 'lesson' as const,
      description: `Conceptual foundation, real-world examples, and visual analogies for ${chap.topic1}.`,
      isRequired: true,
      data: {
        lessonContent: l1.htmlContent,
        imageSrc: undefined,
        imageCaption: `Concept diagram for ${chap.topic1} in ${level.name}.`,
        imageAlt: `${chap.topic1} diagram`,
        matchingPairs: l1.matchingPairs
          ? {
              title: `Match the Concepts: ${chap.topic1}`,
              pairs: l1.matchingPairs,
            }
          : undefined,
      },
    },
    // 3. Lesson 2
    {
      title: `Lesson 2: ${chap.topic2}`,
      type: 'lesson' as const,
      description: `Deep-dive study, workflow mechanisms, and interactive knowledge check for ${chap.topic2}.`,
      isRequired: true,
      data: {
        lessonContent: l2.htmlContent,
        mcq: l2.mcq,
      },
    },
    // 4. Interactive Reflection Workbook
    {
      title: `Interactive Reflection Workbook`,
      type: 'worksheet' as const,
      description: `Structured analytical questions to record personal reflections, conceptual summaries, and peer discussion notes.`,
      isRequired: true,
      data: {
        workbookInstructions: chap.workbookPrompts,
      },
    },
    // 5. Educational Challenge & Activity Game
    {
      title: `Activity Challenge: ${chap.topic1}`,
      type: 'activity' as const,
      description: `Hands-on educational challenge, rapid-fire classification, and interactive gameplay for ${chap.topic1}.`,
      isRequired: true,
      data: {
        activityType: 'challenge',
        flashcards: chap.flashcards,
        matchingPairs: l1.matchingPairs
          ? {
              title: `Match the Concepts: ${chap.topic1}`,
              pairs: l1.matchingPairs,
            }
          : undefined,
      },
    },
    // 6. Lesson 3
    {
      title: `Lesson 3: ${chap.topic3}`,
      type: 'lesson' as const,
      description: `Comprehensive theory, real-world applications, and discovery studio for ${chap.topic3}.`,
      isRequired: true,
      data: {
        lessonContent: l3.htmlContent,
        journey: l3.journey,
        topicTitle: chap.topic3,
        practicalTasks: {
          checklist: chap.labChecklist,
          starterPrompt: chap.labStarter,
        },
      },
    },
    // 7. Graded Assignment
    {
      title: `Graded Capstone Assignment`,
      type: 'assignment' as const,
      description: `Academic problem statement, real-world scenario evaluation, rubric criteria, and document submission.`,
      isRequired: true,
      data: {
        assignmentInstructions: chap.assignmentBrief,
        maxMarks: chap.assignmentMarks,
      },
    },
    // 8. Mastery Assessment Quiz (3-Stage Mastery Series)
    {
      title: `Mastery Assessment Quiz`,
      type: 'quiz' as const,
      description: `Comprehensive 3-stage mastery assessment testing knowledge retention, analytical thinking, and application skills across all chapter lessons.`,
      isRequired: true,
      data: {
        quiz: {
          instructions: `Complete all 3 mastery quizzes to test your mastery of ${chap.chapterTitle}.`,
          passingPercentage: 60,
          timeLimit: 15,
          questions: chap.chapterQuizQuestions,
          quiz1Questions: chap.quiz1Questions,
          quiz2Questions: chap.quiz2Questions,
          quiz3Questions: chap.quiz3Questions,
        },
      },
    },
  ]
}

function convertLevelDataToCurriculum(lvl: LevelData): LevelCurriculum {
  return {
    className: lvl.name,
    classCode: lvl.code,
    ageGroup: lvl.age,
    description: lvl.description,
    tier: lvl.tier,
    subjects: [
      {
        name: lvl.subjectName,
        code: lvl.subjectCode,
        description: lvl.description,
        chapters: lvl.chapters.map(chap => ({
          chapterNumber: chap.chapterNumber,
          title: chap.chapterTitle,
          shortDescription: chap.shortDescription,
          description: chap.description,
          duration: chap.duration,
          sections: buildSectionsForChapter(lvl, chap),
        })),
      },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE IMPLEMENTATION
// ─────────────────────────────────────────────────────────────────────────────

export const curriculumCatalogService = {
  getAllSpecs() {
    return SYLLABUS_SPECS
  },

  getAllLevelsData(): LevelData[] {
    return ALL_LEVELS_CURRICULUM
  },

  getLevelData(gradeKeyOrName: string | undefined | null): LevelData | undefined {
    if (!gradeKeyOrName) return undefined
    const raw = String(gradeKeyOrName).trim().toLowerCase()

    // 1. Direct exact or alphanumeric matches
    const cleanKey = raw.replace(/[\s-_]/g, '')
    const directMatch = ALL_LEVELS_CURRICULUM.find(
      l =>
        l.gradeKey.toLowerCase() === raw ||
        l.gradeKey.toLowerCase().replace(/[\s-_]/g, '') === cleanKey ||
        l.name.toLowerCase() === raw ||
        l.name.toLowerCase().replace(/[\s-_]/g, '') === cleanKey ||
        l.code.toLowerCase() === raw ||
        l.code.toLowerCase().replace(/[\s-_]/g, '') === cleanKey ||
        l.subjectName.toLowerCase() === raw ||
        l.subjectName.toLowerCase().replace(/[\s-_]/g, '') === cleanKey ||
        l.subjectCode.toLowerCase() === raw ||
        l.subjectCode.toLowerCase().replace(/[\s-_]/g, '') === cleanKey
    )
    if (directMatch) return directMatch

    // 2. Stripping common catalog / DB prefix patterns
    const stripped = raw
      .replace(/^(catalog|cat)[-_](chap|lvl|cls|sub)[-_]/, '')
      .replace(/^(catalog|cat)[-_]/, '')
      .replace(/^(cls|sub)[-_]/, '')
      .split(/[-_]/)[0]

    const strippedClean = stripped.replace(/[\s-_]/g, '')
    const strippedMatch = ALL_LEVELS_CURRICULUM.find(
      l =>
        l.gradeKey.toLowerCase() === stripped ||
        l.gradeKey.toLowerCase().replace(/[\s-_]/g, '') === strippedClean ||
        l.code.toLowerCase().replace(/[\s-_]/g, '') === strippedClean
    )
    if (strippedMatch) return strippedMatch

    // 3. Regex token extraction for standard grade keys (class3..class12, ug1..ug4, pg1..pg2)
    const classNumMatch = raw.match(/\b(?:class|grade|cls)\s*(\d{1,2})\b/i) || raw.match(/class(\d{1,2})/i) || raw.match(/cls(\d{1,2})/i)
    if (classNumMatch) {
      const num = classNumMatch[1]
      const found = ALL_LEVELS_CURRICULUM.find(l => l.gradeKey === `class${num}`)
      if (found) return found
    }

    const ugMatch = raw.match(/\bug\s*([1-4]|first|second|third|final|1st|2nd|3rd|4th)\b/i) || raw.match(/\b(ug[1-4])\b/i)
    if (ugMatch) {
      const token = ugMatch[1].toLowerCase()
      let mapped = ''
      if (token === '1' || token === 'first' || token === '1st' || token === 'ug1') mapped = 'ug1'
      else if (token === '2' || token === 'second' || token === '2nd' || token === 'ug2') mapped = 'ug2'
      else if (token === '3' || token === 'third' || token === '3rd' || token === 'ug3') mapped = 'ug3'
      else if (token === '4' || token === 'final' || token === '4th' || token === 'ug4') mapped = 'ug4'
      const found = ALL_LEVELS_CURRICULUM.find(l => l.gradeKey === mapped)
      if (found) return found
    }

    const pgMatch = raw.match(/\bpg\s*([1-2]|first|final|1st|2nd)\b/i) || raw.match(/\b(pg[1-2])\b/i)
    if (pgMatch) {
      const token = pgMatch[1].toLowerCase()
      let mapped = ''
      if (token === '1' || token === 'first' || token === '1st' || token === 'pg1') mapped = 'pg1'
      else if (token === '2' || token === 'final' || token === '2nd' || token === 'pg2') mapped = 'pg2'
      const found = ALL_LEVELS_CURRICULUM.find(l => l.gradeKey === mapped)
      if (found) return found
    }

    // 4. Substring and subject / chapter / topic inclusion match
    const fuzzyMatch = ALL_LEVELS_CURRICULUM.find(
      l =>
        raw.includes(l.gradeKey.toLowerCase()) ||
        raw.includes(l.name.toLowerCase()) ||
        raw.includes(l.subjectName.toLowerCase()) ||
        l.subjectName.toLowerCase().includes(raw) ||
        l.chapters.some(
          c =>
            raw.includes(c.chapterTitle.toLowerCase()) ||
            c.chapterTitle.toLowerCase().includes(raw) ||
            raw.includes(c.topic1.toLowerCase()) ||
            raw.includes(c.topic2.toLowerCase())
        )
    )
    if (fuzzyMatch) return fuzzyMatch

    return undefined
  },

  getCurricula(): LevelCurriculum[] {
    return ALL_LEVELS_CURRICULUM.map(convertLevelDataToCurriculum)
  },

  getCurriculumChapterContent(gradeKeyOrName: string, chapterNum: string | number) {
    let lvl = this.getLevelData(gradeKeyOrName)
    if (!lvl) {
      const chStr = String(chapterNum).toLowerCase()
      lvl = ALL_LEVELS_CURRICULUM.find(l =>
        l.chapters.some(
          c =>
            c.chapterTitle.toLowerCase().includes(chStr) ||
            c.topic1.toLowerCase().includes(chStr) ||
            c.topic2.toLowerCase().includes(chStr)
        )
      )
    }
    if (!lvl) {
      lvl = ALL_LEVELS_CURRICULUM[0]
    }

    const chNum = String(chapterNum).trim()
    const chap =
      lvl.chapters.find(c => c.chapterNumber === chNum) ||
      lvl.chapters.find(c => c.chapterTitle.toLowerCase().includes(chNum.toLowerCase())) ||
      lvl.chapters.find(
        c =>
          c.topic1.toLowerCase().includes(chNum.toLowerCase()) ||
          c.topic2.toLowerCase().includes(chNum.toLowerCase())
      ) ||
      lvl.chapters[0]

    return {
      canonicalType: chap.canonicalType,
      topic1: chap.topic1,
      topic2: chap.topic2,
      topic3: chap.topic3,
      lesson1Content: chap.lesson1.htmlContent,
      lesson2Content: chap.lesson2.htmlContent,
      lesson3Content: chap.lesson3.htmlContent,
      lesson1Journey: chap.lesson1.journey,
      lesson2Journey: chap.lesson2.journey,
      lesson3Journey: chap.lesson3.journey,
      matchingPairs: chap.lesson1.matchingPairs,
      mcq: chap.lesson2.mcq,
      workbookPrompts: chap.workbookPrompts,
      flashcards: chap.flashcards,
      labChecklist: chap.labChecklist,
      labStarter: chap.labStarter,
      assignmentBrief: chap.assignmentBrief,
      assignmentMarks: chap.assignmentMarks,
      lesson1QuizQuestions: chap.lesson1.quizQuestions,
      lesson2QuizQuestions: chap.lesson2.quizQuestions,
      lesson3QuizQuestions: chap.lesson3.quizQuestions,
      quiz1Questions: chap.quiz1Questions,
      quiz2Questions: chap.quiz2Questions,
      quiz3Questions: chap.quiz3Questions,
      quizQuestions: chap.chapterQuizQuestions,
    }
  },

  getChapterContentItems(gradeKeyOrName: string, chapterNum: string | number, chapterId: string, orgId: string = ''): ChapterContent[] {
    const lvl = this.getLevelData(gradeKeyOrName) || ALL_LEVELS_CURRICULUM[0]
    const chNum = String(chapterNum)
    const chap =
      lvl.chapters.find(c => c.chapterNumber === chNum) ||
      lvl.chapters.find(c => c.chapterTitle.includes(chNum)) ||
      lvl.chapters[0]

    const baseCreatedAt = new Date().toISOString()

    return [
      {
        id: `${chapterId}-sec-1-video`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'video',
        title: `Video Briefing: ${chap.chapterTitle}`,
        description: `Visual walkthrough and interactive animation covering ${chap.topic1}, ${chap.topic2} and ${chap.topic3}.`,
        display_order: 1,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        video: {
          id: `${chapterId}-video-1`,
          organization_id: orgId,
          chapter_content_id: `${chapterId}-sec-1-video`,
          video_url: '',
          description: `Comprehensive multimedia introduction for ${lvl.name} exploring ${chap.topic1}, ${chap.topic2} & ${chap.topic3}.`,
          duration: 12,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-2-lesson1`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'lesson',
        title: `Lesson 1: ${chap.topic1}`,
        description: `Conceptual foundation, real-world examples, and visual analogies for ${chap.topic1}.`,
        display_order: 2,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        lesson: {
          id: `${chapterId}-lesson-1`,
          chapter_content_id: `${chapterId}-sec-2-lesson1`,
          content: chap.lesson1.htmlContent,
          estimated_duration: 15,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-3-lesson2`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'lesson',
        title: `Lesson 2: ${chap.topic2}`,
        description: `Deep-dive study, workflow mechanisms, and interactive knowledge check for ${chap.topic2}.`,
        display_order: 3,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        lesson: {
          id: `${chapterId}-lesson-2`,
          chapter_content_id: `${chapterId}-sec-3-lesson2`,
          content: chap.lesson2.htmlContent,
          estimated_duration: 15,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-4-worksheet`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'worksheet',
        title: `Interactive Reflection Workbook`,
        description: `Structured analytical questions to record personal reflections and conceptual summaries.`,
        display_order: 4,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        worksheet: {
          id: `${chapterId}-ws-1`,
          chapter_content_id: `${chapterId}-sec-4-worksheet`,
          instructions: chap.workbookPrompts,
          worksheet_type: 'interactive',
          maximum_marks: 20,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-5-activity`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'activity',
        title: `Interactive Challenge: ${chap.topic1}`,
        description: `Educational game and rapid classification challenge for ${chap.topic1}.`,
        display_order: 5,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        activity: {
          id: `${chapterId}-act-1`,
          chapter_content_id: `${chapterId}-sec-5-activity`,
          activity_type: 'multiple_choice',
          instructions: `Complete the interactive challenge to demonstrate mastery of ${chap.topic1}.`,
          maximum_marks: 20,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-6-lesson3`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'lesson',
        title: `Lesson 3: ${chap.topic3}`,
        description: `Comprehensive theory, real-world applications, and discovery studio for ${chap.topic3}.`,
        display_order: 6,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        lesson: {
          id: `${chapterId}-lesson-3`,
          chapter_content_id: `${chapterId}-sec-6-lesson3`,
          content: chap.lesson3.htmlContent,
          estimated_duration: 15,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-7-assignment`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'assignment',
        title: `Graded Capstone Assignment`,
        description: chap.assignmentBrief,
        display_order: 7,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        assignment: {
          id: `${chapterId}-asgn-1`,
          chapter_content_id: `${chapterId}-sec-7-assignment`,
          instructions: chap.assignmentBrief,
          maximum_marks: chap.assignmentMarks,
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        },
      },
      {
        id: `${chapterId}-sec-8-quiz`,
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: 'quiz',
        title: `Mastery Assessment Quiz`,
        description: `Comprehensive 3-stage mastery assessment testing knowledge retention across all chapter lessons.`,
        display_order: 8,
        is_required: true,
        status: 'published',
        created_by: 'system',
        created_at: baseCreatedAt,
        updated_at: baseCreatedAt,
        quiz: {
          id: `${chapterId}-quiz-1`,
          chapter_content_id: `${chapterId}-sec-8-quiz`,
          instructions: `Answer all questions across Quiz 1, 2 and 3 to test your mastery of ${chap.chapterTitle}.`,
          passing_percentage: 60,
          time_limit: 15,
          maximum_attempts: 10,
          randomize_questions: false,
          randomize_answers: false,
          negative_marks: 0,
          questions: chap.chapterQuizQuestions as any,
          quiz1Questions: chap.quiz1Questions as any,
          quiz2Questions: chap.quiz2Questions as any,
          quiz3Questions: chap.quiz3Questions as any,
          created_at: baseCreatedAt,
          updated_at: baseCreatedAt,
        } as any,
      },
    ]
  },

  async seedLevelKey(orgId: string, gradeKey: string, userId: string, forceUpdate: boolean = false): Promise<{ success: boolean; message: string }> {
    const lvl = this.getLevelData(gradeKey) || ALL_LEVELS_CURRICULUM[0]
    const curriculum = convertLevelDataToCurriculum(lvl)
    return this.seedLevelCurriculum(orgId, curriculum, userId, forceUpdate)
  },

  async seedAllLevels(orgId: string, userId: string, forceUpdate: boolean = false): Promise<{ success: boolean; message: string; count: number }> {
    let seededCount = 0
    for (const lvl of ALL_LEVELS_CURRICULUM) {
      const curriculum = convertLevelDataToCurriculum(lvl)
      const res = await this.seedLevelCurriculum(orgId, curriculum, userId, forceUpdate)
      if (res.success) seededCount++
    }
    return {
      success: true,
      message: `Successfully populated authentic 6-month AI Olympiad curricula for all ${seededCount} academic levels (Class 3 to PG Final Year)!`,
      count: seededCount,
    }
  },

  async seedLevelCurriculum(orgId: string, level: LevelCurriculum, userId: string, forceUpdate: boolean = false): Promise<{ success: boolean; message: string }> {
    try {
      if (!orgId) throw new Error('Organization ID is required')

      // 1. Get or create Category
      let catId: string = ''
      const { data: existingCat } = await supabase
        .from('categories')
        .select('*')
        .eq('organization_id', orgId)
        .eq('name', 'AI Olympiad 6-Month Curriculum')
        .single()

      if (existingCat) {
        catId = existingCat.id
      } else {
        const { data: newCat, error: catErr } = await supabase
          .from('categories')
          .insert({
            organization_id: orgId,
            name: 'AI Olympiad 6-Month Curriculum',
            description: 'Official multi-tier 6-month AI Olympiad curriculum spanning Class 3 to PG Final Year.',
            status: 'published',
            created_by: userId,
          })
          .select()
          .single()
        if (catErr) throw catErr
        catId = newCat.id
      }

      // 2. Get or create Class
      let { data: cls } = await supabase
        .from('classes')
        .select('*')
        .eq('organization_id', orgId)
        .eq('name', level.className)
        .single()

      if (!cls) {
        const { data: newCls, error: clsErr } = await supabase
          .from('classes')
          .insert({
            organization_id: orgId,
            category_id: catId,
            name: level.className,
            code: level.classCode,
            description: level.description,
            display_order: 1,
            status: 'published',
            created_by: userId,
          })
          .select()
          .single()
        if (clsErr) throw clsErr
        cls = newCls
      }

      // 3. For each Subject
      for (const subj of level.subjects) {
        let { data: subject } = await supabase
          .from('subjects')
          .select('*')
          .eq('organization_id', orgId)
          .eq('class_id', cls.id)
          .eq('name', subj.name)
          .single()

        if (!subject) {
          const { data: newSubj, error: subjErr } = await supabase
            .from('subjects')
            .insert({
              organization_id: orgId,
              class_id: cls.id,
              name: subj.name,
              code: subj.code,
              description: subj.description,
              display_order: 1,
              status: 'published',
              created_by: userId,
            })
            .select()
            .single()
          if (subjErr) throw subjErr
          subject = newSubj
        }

        // 4. For each Chapter
        for (const chap of subj.chapters) {
          let { data: chapter } = await supabase
            .from('chapters')
            .select('*')
            .eq('organization_id', orgId)
            .eq('subject_id', subject.id)
            .eq('title', chap.title)
            .single()

          if (!chapter) {
            chapter = await chapterService.create({
              organization_id: orgId,
              subject_id: subject.id,
              title: chap.title,
              chapter_number: chap.chapterNumber,
              short_description: chap.shortDescription,
              description: chap.description,
              estimated_duration: chap.duration,
              display_order: parseInt(chap.chapterNumber, 10) || 1,
              status: 'published',
              created_by: userId,
            })
          }

          // 5. For each 8 canonical Sections
          const existingSections = await chapterContentService.getByChapter(chapter.id, false)
          if (existingSections.length === 0) {
            for (let sIdx = 0; sIdx < chap.sections.length; sIdx++) {
              const sec = chap.sections[sIdx]
              const createdSec = await chapterContentService.create({
                organization_id: orgId,
                chapter_id: chapter.id,
                content_type: sec.type,
                title: sec.title,
                description: sec.description,
                display_order: sIdx + 1,
                is_required: sec.isRequired,
                status: 'published',
                created_by: userId,
              })

              // Persist specific section details
              if (sec.type === 'video' && sec.data.videoUrl) {
                await videoService.upsert({
                  organization_id: orgId,
                  chapter_content_id: createdSec.id,
                  video_url: sec.data.videoUrl,
                  description: sec.data.videoDescription,
                })
              } else if (sec.type === 'lesson' && sec.data.lessonContent) {
                await lessonService.upsert({
                  chapter_content_id: createdSec.id,
                  content: sec.data.lessonContent,
                  estimated_duration: 20,
                })
              } else if (sec.type === 'worksheet') {
                await worksheetService.upsert({
                  chapter_content_id: createdSec.id,
                  description: sec.description,
                  instructions: sec.data.workbookInstructions || 'Complete the workbook prompts.',
                  worksheet_type: 'interactive',
                  maximum_marks: 50,
                })
              } else if (sec.type === 'activity') {
                await activityService.upsert({
                  chapter_content_id: createdSec.id,
                  activity_type: 'short_answer',
                  instructions: sec.data.practicalTasks ? JSON.stringify(sec.data.practicalTasks) : sec.description,
                  maximum_marks: 25,
                })
              } else if (sec.type === 'assignment') {
                await assignmentService.upsert({
                  chapter_content_id: createdSec.id,
                  instructions: sec.data.assignmentInstructions || sec.description,
                  maximum_marks: sec.data.maxMarks || 50,
                })
              } else if (sec.type === 'quiz' && sec.data.quiz) {
                const quiz = await quizService.upsert({
                  chapter_content_id: createdSec.id,
                  instructions: sec.data.quiz.instructions,
                  passing_percentage: sec.data.quiz.passingPercentage,
                  time_limit: sec.data.quiz.timeLimit,
                  maximum_attempts: 3,
                  randomize_questions: false,
                  randomize_answers: false,
                  negative_marks: 0,
                })

                // Add quiz questions
                for (let qIdx = 0; qIdx < sec.data.quiz.questions.length; qIdx++) {
                  const qq = sec.data.quiz.questions[qIdx]
                  const q = await questionService.create(
                    {
                      organization_id: orgId,
                      question: qq.question,
                      question_type: 'mcq',
                      marks: 1,
                      difficulty: 'medium',
                      explanation: qq.explanation,
                      created_by: userId,
                    },
                    qq.options.map((o, idx) => ({
                      option_text: o.text,
                      is_correct: o.isCorrect,
                      display_order: idx + 1,
                    }))
                  )

                  await quizService.addQuestion(quiz.id, q.id, qIdx + 1)
                }
              }
            }
          } else if (forceUpdate) {
            // Update existing sections with authentic curriculum content
            for (let sIdx = 0; sIdx < chap.sections.length; sIdx++) {
              const sec = chap.sections[sIdx]
              const existing = existingSections[sIdx]
              if (existing) {
                await chapterContentService.update(existing.id, {
                  title: sec.title,
                  description: sec.description,
                  status: 'published',
                })
                if (sec.type === 'lesson' && sec.data.lessonContent) {
                  await lessonService.upsert({
                    chapter_content_id: existing.id,
                    content: sec.data.lessonContent,
                    estimated_duration: 20,
                  })
                } else if (sec.type === 'worksheet' && sec.data.workbookInstructions) {
                  await worksheetService.upsert({
                    chapter_content_id: existing.id,
                    instructions: sec.data.workbookInstructions,
                    worksheet_type: 'interactive',
                    maximum_marks: 50,
                  })
                } else if (sec.type === 'assignment' && sec.data.assignmentInstructions) {
                  await assignmentService.upsert({
                    chapter_content_id: existing.id,
                    instructions: sec.data.assignmentInstructions,
                    maximum_marks: sec.data.maxMarks || 50,
                  })
                }
              }
            }
          }
        }
      }

      return { success: true, message: `Successfully populated authentic curriculum for ${level.className}!` }
    } catch (err: unknown) {
      console.error('Curriculum seeding error:', err)
      return { success: false, message: err instanceof Error ? err.message : 'Curriculum generation failed' }
    }
  },
}
