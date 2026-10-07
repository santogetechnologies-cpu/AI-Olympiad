import { supabase, isUuid } from '../lib/supabase'
import type { StudentContentProgress, Enrollment, Class, Subject } from '../types'
import { SYLLABUS_SPECS, ALL_LEVELS_CURRICULUM } from './curriculumData'
import { curriculumCatalogService } from './curriculumCatalogService'

export interface ProgressionResult {
  lessonCompleted: boolean
  chapterCompleted: boolean
  classCompleted: boolean
  currentGradeKey?: string
  currentClassName?: string
  nextGradeKey?: string
  nextClassName?: string
  nextSubjectName?: string
  nextChapterId?: string
  message?: string
}

export interface StudentChapterProgressionItem {
  id: string
  organization_id?: string
  subject_id?: string
  subject_name?: string
  chapter_number: string | number
  title: string
  short_description?: string
  description?: string
  status: 'published' | 'draft' | 'archived'
  estimated_duration?: number
  display_order?: number
  progress: {
    total: number
    completed: number
    percentage: number
  }
  completedSections: number
  totalSections: number
  percentage: number
  is_completed: boolean
  is_in_progress: boolean
  is_not_started: boolean
}

export interface StudentDashboardData {
  assignedClass: Class | null
  assignedSubject: Subject | null
  assignedChapters: StudentChapterProgressionItem[]
  totalChapters: number
  completedChapters: number
  overallPercentage: number
  currentChapter: StudentChapterProgressionItem | null
  currentSection: string | null
  nextLesson: {
    chapterId: string
    chapterTitle: string
    chapterNumber: string | number
    contentTitle: string
  } | null
  pendingActivities: number
  quizAvg: number
  totalQuizzesTaken: number
  enrollments: Enrollment[]
}

export const progressService = {
  async upsertProgress(payload: Partial<StudentContentProgress> & {
    student_id: string
    chapter_content_id: string
    organization_id: string
  }): Promise<StudentContentProgress> {
    if (!isUuid(payload.student_id) || !isUuid(payload.chapter_content_id) || !isUuid(payload.organization_id)) {
      return {
        id: `mock-prog-${payload.chapter_content_id}`,
        student_id: payload.student_id,
        chapter_content_id: payload.chapter_content_id,
        organization_id: payload.organization_id,
        status: payload.status || 'completed',
        completion_percentage: payload.completion_percentage || 100,
        time_spent: payload.time_spent || 0,
        last_accessed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as StudentContentProgress
    }

    const { data, error } = await supabase
      .from('student_content_progress')
      .upsert(
        { ...payload, last_accessed_at: new Date().toISOString() },
        { onConflict: 'student_id,chapter_content_id' }
      )
      .select()
      .single()
    if (error) throw error
    return data
  },

  async markCompleted(studentId: string, contentId: string, organizationId: string): Promise<StudentContentProgress> {
    const res = await progressService.upsertProgress({
      student_id: studentId,
      chapter_content_id: contentId,
      organization_id: organizationId,
      status: 'completed',
      completion_percentage: 100,
      completed_at: new Date().toISOString(),
    })

    // Trigger asynchronous progression check
    setTimeout(() => {
      progressService.checkAndAdvanceClassProgression(studentId, organizationId).catch(() => {})
    }, 100)

    return res
  },

  async updateVideoProgress(studentId: string, contentId: string, organizationId: string, position: number, duration: number) {
    const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0
    const status = pct >= 90 ? 'completed' : pct > 0 ? 'in_progress' : 'not_started'
    return progressService.upsertProgress({
      student_id: studentId,
      chapter_content_id: contentId,
      organization_id: organizationId,
      video_position: position,
      completion_percentage: pct,
      status: status as 'not_started' | 'in_progress' | 'completed',
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {}),
      ...(pct > 0 ? { started_at: new Date().toISOString() } : {}),
    })
  },

  async getChapterProgress(studentId: string, chapterId: string): Promise<{
    total: number
    required: number
    completed: number
    requiredCompleted: number
    percentage: number
  }> {
    // Check local fallback first for instant responsiveness
    let localCompletedCount = 0
    try {
      const stored = localStorage.getItem(`progress_${studentId}_${chapterId}`)
      if (stored) {
        const arr = JSON.parse(stored)
        localCompletedCount = Array.isArray(arr) ? arr.length : 0
      }
    } catch {}

    if (!isUuid(chapterId)) {
      const total = 8
      const percentage = Math.min(100, Math.round((localCompletedCount / 8) * 1000) / 10)
      return { total, required: total, completed: Math.min(8, localCompletedCount), requiredCompleted: Math.min(8, localCompletedCount), percentage }
    }

    const { data: contentItems } = await supabase
      .from('chapter_content')
      .select('id, is_required')
      .eq('chapter_id', chapterId)
      .neq('status', 'archived')
    
    if (!contentItems || contentItems.length === 0) {
      const total = 8
      const percentage = Math.min(100, Math.round((localCompletedCount / 8) * 1000) / 10)
      return { total, required: total, completed: Math.min(8, localCompletedCount), requiredCompleted: Math.min(8, localCompletedCount), percentage }
    }

    const ids = contentItems.map(i => i.id).filter(id => isUuid(id))
    if (ids.length === 0 || !isUuid(studentId)) {
      const total = 8
      const percentage = Math.min(100, Math.round((localCompletedCount / 8) * 1000) / 10)
      return { total, required: total, completed: Math.min(8, localCompletedCount), requiredCompleted: Math.min(8, localCompletedCount), percentage }
    }

    const { data: progressItems } = await supabase
      .from('student_content_progress')
      .select('chapter_content_id, status')
      .eq('student_id', studentId)
      .in('chapter_content_id', ids)

    const completedIds = new Set(
      (progressItems || []).filter(p => p.status === 'completed').map(p => p.chapter_content_id)
    )

    const total = 8
    const dbCompleted = contentItems.filter(i => completedIds.has(i.id)).length
    const completed = Math.min(8, Math.max(dbCompleted, localCompletedCount))
    const requiredCompleted = completed
    const percentage = Math.min(100, Math.round((completed / 8) * 1000) / 10)

    return { total, required: 8, completed, requiredCompleted, percentage }
  },

  async getProgressForContents(studentId: string, contentIds: string[]): Promise<Map<string, StudentContentProgress>> {
    const validIds = contentIds.filter(id => isUuid(id))
    if (validIds.length === 0 || !isUuid(studentId)) return new Map()
    const { data } = await supabase
      .from('student_content_progress')
      .select('*')
      .eq('student_id', studentId)
      .in('chapter_content_id', validIds)
    const map = new Map<string, StudentContentProgress>()
    ;(data || []).forEach(p => map.set(p.chapter_content_id, p))
    return map
  },

  async getStudentOverallProgress(studentId: string, organizationId: string) {
    if (!isUuid(studentId) || !isUuid(organizationId)) {
      return { completed: 0, totalTime: 0, quizAvg: 0, totalItems: 0 }
    }
    const { data, error } = await supabase
      .from('student_content_progress')
      .select('status, time_spent, completion_percentage')
      .eq('student_id', studentId)
      .eq('organization_id', organizationId)
    if (error) return { completed: 0, totalTime: 0, quizAvg: 0, totalItems: 0 }
    const items = data || []
    const completed = items.filter(i => i.status === 'completed').length
    const totalTime = items.reduce((sum, i) => sum + (i.time_spent || 0), 0)
    const avgCompletion = items.length > 0 
      ? items.reduce((sum, i) => sum + i.completion_percentage, 0) / items.length 
      : 0
    return { completed, totalTime, quizAvg: avgCompletion, totalItems: items.length }
  },

  async checkAndAdvanceClassProgression(
    studentId: string,
    organizationId: string,
    _chapterId?: string
  ): Promise<ProgressionResult> {
    const enrollments = await enrollmentService.getAllStudentEnrollments(studentId)
    const activeEnr = enrollments.find(e => e.status === 'active') || enrollments[enrollments.length - 1]

    let classCompleted = false
    let currentGradeKey: string | undefined
    let currentClassName: string | undefined
    let nextGradeKey: string | undefined
    let nextClassName: string | undefined
    let nextSubjectName: string | undefined
    let message: string | undefined

    // Determine student's current level index in SYLLABUS_SPECS
    let currentSpecIdx = 0
    if (activeEnr) {
      const cleanName = activeEnr.class?.name?.toLowerCase().replace(/[\s-_]/g, '')
      const cleanCode = activeEnr.class?.code?.toLowerCase().replace(/[\s-_]/g, '')
      const idx = SYLLABUS_SPECS.findIndex(s =>
        (cleanName && s.name.toLowerCase().replace(/[\s-_]/g, '') === cleanName) ||
        (cleanCode && s.code.toLowerCase().replace(/[\s-_]/g, '') === cleanCode) ||
        activeEnr.class_id?.includes(s.gradeKey)
      )
      if (idx !== -1) currentSpecIdx = idx
    }

    const currentSpec = SYLLABUS_SPECS[currentSpecIdx]
    currentGradeKey = currentSpec.gradeKey
    currentClassName = currentSpec.name

    // Check all 6 chapters for the CURRENT active class
    let totalCompletedChapters = 0
    const totalChaps = 6

    for (let chIdx = 1; chIdx <= totalChaps; chIdx++) {
      const catChapId = `cat-${currentSpec.gradeKey}-${chIdx}`
      let isChapDone = false

      // Check database first
      const { data: dbChaps } = await supabase
        .from('chapters')
        .select('id, subject:subjects!inner(class:classes!inner(name))')
        .ilike('subject.class.name', `%${currentSpec.name}%`)
        .eq('chapter_number', String(chIdx))
      
      if (dbChaps && dbChaps.length > 0) {
        const prog = await progressService.getChapterProgress(studentId, dbChaps[0].id)
        if (prog.percentage >= 100) {
          isChapDone = true
        }
      }

      // Check local storage progress fallback
      if (!isChapDone) {
        try {
          const stored = localStorage.getItem(`progress_${studentId}_${catChapId}`)
          if (stored) {
            const arr = JSON.parse(stored)
            if (Array.isArray(arr) && arr.length >= 8) {
              isChapDone = true
            }
          }
        } catch {}
      }

      if (isChapDone) {
        totalCompletedChapters++
      }
    }

    // Only if ALL 6 chapters in the current class are 100% completed
    if (totalCompletedChapters >= totalChaps) {
      classCompleted = true

      // 1. Mark current and any prior active enrollments as 'completed' in Supabase
      try {
        const { data: currentDbClasses } = await supabase
          .from('classes')
          .select('id')
          .ilike('name', `%${currentSpec.name}%`)
        const classIdsToComplete = (currentDbClasses || []).map(c => c.id).filter(id => isUuid(id))

        if (classIdsToComplete.length > 0 && isUuid(studentId)) {
          await supabase
            .from('enrollments')
            .update({ status: 'completed' })
            .eq('student_id', studentId)
            .in('class_id', classIdsToComplete)
        }

        // Also ensure no multiple lingering active enrollments
        if (isUuid(studentId)) {
          await supabase
            .from('enrollments')
            .update({ status: 'completed' })
            .eq('student_id', studentId)
            .eq('status', 'active')
        }
      } catch (err) {
        console.warn('Failed to update completed enrollment status in DB:', err)
      }

      // 2. Check if there is a next class in the sequential syllabus (Class 3 -> 4 -> 5...)
      if (currentSpecIdx < SYLLABUS_SPECS.length - 1) {
        const nextSpec = SYLLABUS_SPECS[currentSpecIdx + 1]
        nextGradeKey = nextSpec.gradeKey
        nextClassName = nextSpec.name
        nextSubjectName = nextSpec.subjectName

        // Find or create next class in Database
        let nextDbClass: any = null
        if (organizationId && isUuid(organizationId)) {
          const { data: foundCls } = await supabase
            .from('classes')
            .select('id, organization_id')
            .eq('organization_id', organizationId)
            .ilike('name', `%${nextSpec.name}%`)
            .maybeSingle()
          nextDbClass = foundCls
        }

        if (!nextDbClass && organizationId && isUuid(organizationId)) {
          const { data: newCls } = await supabase
            .from('classes')
            .insert({
              organization_id: organizationId,
              name: nextSpec.name,
              code: nextSpec.code,
              status: 'published',
              display_order: currentSpecIdx + 2,
            })
            .select()
            .single()
          nextDbClass = newCls
        }

        // Find or create next subject in Database
        let nextSubId: string | undefined
        if (nextDbClass && isUuid(nextDbClass.id) && organizationId && isUuid(organizationId)) {
          let { data: nextDbSub } = await supabase
            .from('subjects')
            .select('id')
            .eq('organization_id', organizationId)
            .eq('class_id', nextDbClass.id)
            .maybeSingle()

          if (!nextDbSub) {
            const { data: newSub } = await supabase
              .from('subjects')
              .insert({
                organization_id: organizationId,
                class_id: nextDbClass.id,
                name: nextSpec.subjectName,
                code: nextSpec.subjectCode,
                description: `Curriculum for ${nextSpec.name}`,
                status: 'published',
                display_order: 1,
              })
              .select()
              .single()
            nextDbSub = newSub
          }
          nextSubId = nextDbSub?.id
        }

        // 3. Automatically enroll ONLY the next class with status 'active' in Database
        try {
          if (isUuid(studentId) && nextDbClass?.id && isUuid(nextDbClass.id)) {
            await supabase
              .from('enrollments')
              .insert({
                student_id: studentId,
                organization_id: organizationId || nextDbClass.organization_id,
                class_id: nextDbClass.id,
                ...(nextSubId && isUuid(nextSubId) ? { subject_id: nextSubId } : {}),
                status: 'active',
                enrolled_at: new Date().toISOString(),
              })
          }
        } catch (err) {
          console.warn('Failed to insert next enrollment in Supabase:', err)
        }

        // Set local storage to have only the new active class key
        try {
          const enrKey = `enrolled_classes_${studentId}`
          localStorage.setItem(enrKey, JSON.stringify([nextSpec.gradeKey]))
        } catch {}

        message = `Academic Level Mastered! You have completed ${currentSpec.name} and moved to ${nextSpec.name} (${nextSpec.subjectName})!`
        
        // Dispatch window event for live UI reactivity across Dashboard, My Learning, and Header
        window.dispatchEvent(new CustomEvent('class_progression_advanced', {
          detail: {
            completedClass: currentSpec.name,
            nextClass: nextSpec.name,
            nextGradeKey: nextSpec.gradeKey,
            nextSubjectName: nextSpec.subjectName,
          }
        }))
      } else {
        // Mastered final level (PG Final Year)
        message = `Ultimate Academic Achievement! You have mastered the entire AI Olympiad curriculum through ${currentSpec.name}!`
      }
    }

    return {
      lessonCompleted: true,
      chapterCompleted: true,
      classCompleted,
      currentGradeKey,
      currentClassName,
      nextGradeKey,
      nextClassName,
      nextSubjectName,
      message,
    }
  },

  async getSubjectProgressionMap(studentId: string, _orgId?: string, subjectId?: string) {
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*, contents:chapter_content(id, is_required, status)')
      .eq('subject_id', subjectId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (error || !chapters || chapters.length === 0) {
      // Query subject details from DB if subjectId is a UUID
      let subjectMeta: any = null
      if (subjectId && !subjectId.startsWith('cat-')) {
        try {
          const { data: sData } = await supabase
            .from('subjects')
            .select('*, class:classes(*)')
            .eq('id', subjectId)
            .single()
          subjectMeta = sData
        } catch {}
      }

      // Return catalog chapters mapped with progress
      const lvl =
        curriculumCatalogService.getLevelData(subjectMeta?.class?.name) ||
        curriculumCatalogService.getLevelData(subjectMeta?.class?.code) ||
        curriculumCatalogService.getLevelData(subjectMeta?.name) ||
        curriculumCatalogService.getLevelData(subjectMeta?.code) ||
        curriculumCatalogService.getLevelData(subjectId) ||
        ALL_LEVELS_CURRICULUM[0]
      return lvl.chapters.map((c) => {
        const catId = `cat-${lvl.gradeKey}-${c.chapterNumber}`
        let doneSecs = 0
        try {
          const stored = localStorage.getItem(`progress_${studentId}_${catId}`)
          if (stored) {
            const arr = JSON.parse(stored)
            doneSecs = Array.isArray(arr) ? Math.min(8, arr.length) : 0
          }
        } catch {}

        const percentage = Math.min(100, Math.round((doneSecs / 8) * 1000) / 10)
        const isDone = doneSecs >= 8
        const isLocked = false

        return {
          id: catId,
          chapter_number: c.chapterNumber,
          title: c.chapterTitle,
          short_description: c.shortDescription,
          estimated_duration: c.duration,
          progress: { total: 8, required: 8, completed: doneSecs, requiredCompleted: doneSecs, percentage },
          is_completed: isDone,
          is_locked: isLocked,
        }
      })
    }

    const chapterList = []

    for (let idx = 0; idx < chapters.length; idx++) {
      const chap = chapters[idx]
      const prog = await progressService.getChapterProgress(studentId, chap.id)
      const isCompleted = prog.percentage === 100
      const isLocked = false

      chapterList.push({
        ...chap,
        progress: prog,
        is_completed: isCompleted,
        is_locked: isLocked,
      })
    }

    return chapterList
  },

  async getStudentDetailedDashboard(studentId: string, orgId: string): Promise<StudentDashboardData> {
    // 1. Fetch student enrollments
    const enrollments = await enrollmentService.getAllStudentEnrollments(studentId)
    const activeEnr = enrollments.find(e => e.status === 'active') || (enrollments.length > 0 ? enrollments[enrollments.length - 1] : null)

    if (!activeEnr) {
      return {
        assignedClass: null,
        assignedSubject: null,
        assignedChapters: [],
        totalChapters: 0,
        completedChapters: 0,
        overallPercentage: 0,
        currentChapter: null,
        currentSection: null,
        nextLesson: null,
        pendingActivities: 0,
        quizAvg: 0,
        totalQuizzesTaken: 0,
        enrollments: [],
      }
    }

    // 2. Resolve enrolled Class and Subject
    let enrolledClass = activeEnr.class || null
    let enrolledSubject = activeEnr.subject || null

    if (!enrolledClass && activeEnr.class_id && isUuid(activeEnr.class_id)) {
      try {
        const { data: cData } = await supabase.from('classes').select('*, category:categories(*)').eq('id', activeEnr.class_id).maybeSingle()
        if (cData) enrolledClass = cData
      } catch {}
    }
    if (!enrolledSubject && activeEnr.subject_id && isUuid(activeEnr.subject_id)) {
      try {
        const { data: sData } = await supabase.from('subjects').select('*').eq('id', activeEnr.subject_id).maybeSingle()
        if (sData) enrolledSubject = sData
      } catch {}
    }

    // 3. Find ONLY the assigned chapters for this student
    let chapList: any[] = []

    // If specific subject assigned
    if (activeEnr.subject_id && isUuid(activeEnr.subject_id)) {
      const { data: dbChaps } = await supabase
        .from('chapters')
        .select('*, subject:subjects(id, name, class_id), contents:chapter_content(id, title, content_type, is_required, status, display_order)')
        .eq('subject_id', activeEnr.subject_id)
        .neq('status', 'archived')
        .order('display_order', { ascending: true })

      if (dbChaps && dbChaps.length > 0) {
        chapList = dbChaps
      }
    } else if (activeEnr.class_id && isUuid(activeEnr.class_id)) {
      // Find all published subjects for this class
      const { data: classSubs } = await supabase
        .from('subjects')
        .select('id, name, class_id')
        .eq('class_id', activeEnr.class_id)
        .neq('status', 'archived')

      if (classSubs && classSubs.length > 0) {
        const subIds = classSubs.map(s => s.id)
        const { data: dbChaps } = await supabase
          .from('chapters')
          .select('*, subject:subjects(id, name, class_id), contents:chapter_content(id, title, content_type, is_required, status, display_order)')
          .in('subject_id', subIds)
          .neq('status', 'archived')
          .order('display_order', { ascending: true })

        if (dbChaps && dbChaps.length > 0) {
          chapList = dbChaps
        }
      }
    }

    // If no custom DB chapters exist, check if class/subject corresponds to the AI Olympiad Curriculum Catalog
    if (chapList.length === 0) {
      const allLevelsData = curriculumCatalogService.getAllLevelsData()
      const cleanClassName = enrolledClass?.name?.toLowerCase().replace(/[\s-_]/g, '') || ''
      const cleanClassCode = enrolledClass?.code?.toLowerCase().replace(/[\s-_]/g, '') || ''

      const matchedLvl = allLevelsData.find(l =>
        (cleanClassName && l.name.toLowerCase().replace(/[\s-_]/g, '') === cleanClassName) ||
        (cleanClassCode && l.code.toLowerCase().replace(/[\s-_]/g, '') === cleanClassCode) ||
        (cleanClassName && l.name.toLowerCase().includes(cleanClassName)) ||
        (cleanClassName && cleanClassName.includes(l.name.toLowerCase().replace(/[\s-_]/g, ''))) ||
        (activeEnr.class_id && activeEnr.class_id.includes(l.gradeKey))
      )

      if (matchedLvl) {
        if (!enrolledClass) {
          enrolledClass = {
            id: `cat-cls-${matchedLvl.gradeKey}`,
            organization_id: orgId,
            category_id: `cat-${matchedLvl.gradeKey}`,
            name: matchedLvl.name,
            code: matchedLvl.code,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }
        if (!enrolledSubject) {
          enrolledSubject = {
            id: `cat-sub-${matchedLvl.gradeKey}`,
            organization_id: orgId,
            class_id: enrolledClass.id,
            name: matchedLvl.subjectName,
            code: matchedLvl.subjectCode,
            description: matchedLvl.description,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }

        chapList = matchedLvl.chapters.map(c => ({
          id: `cat-${matchedLvl.gradeKey}-${c.chapterNumber}`,
          organization_id: orgId,
          subject_id: enrolledSubject?.id || `cat-sub-${matchedLvl.gradeKey}`,
          subject_name: matchedLvl.subjectName,
          title: c.chapterTitle,
          chapter_number: c.chapterNumber,
          short_description: c.shortDescription,
          description: c.description,
          status: 'published',
          estimated_duration: c.duration,
          display_order: parseInt(c.chapterNumber, 10),
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      }
    }

    // 4. Calculate REAL progress for every assigned chapter
    const assignedChapters: StudentChapterProgressionItem[] = []
    let completedChaptersCount = 0
    let totalSectionsPossible = 0
    let totalSectionsDone = 0
    let firstIncompleteChap: any = null

    for (const chap of chapList) {
      const prog = await progressService.getChapterProgress(studentId, chap.id)
      const totalSec = 8
      const doneSec = Math.min(8, prog.completed)
      const pct = Math.min(100, Math.round((doneSec / 8) * 1000) / 10)
      const isDone = doneSec >= 8
      const isInProg = !isDone && doneSec > 0
      const isNotStarted = doneSec === 0

      if (isDone) {
        completedChaptersCount++
      } else if (!firstIncompleteChap) {
        firstIncompleteChap = {
          ...chap,
          completedSections: doneSec,
          totalSections: totalSec,
        }
      }

      totalSectionsPossible += totalSec
      totalSectionsDone += doneSec

      assignedChapters.push({
        id: chap.id,
        organization_id: chap.organization_id,
        subject_id: chap.subject_id,
        subject_name: chap.subject?.name || enrolledSubject?.name || 'AI Curriculum',
        chapter_number: chap.chapter_number || '1',
        title: chap.title,
        short_description: chap.short_description,
        description: chap.description,
        status: chap.status || 'published',
        estimated_duration: chap.estimated_duration || 45,
        display_order: chap.display_order,
        progress: {
          total: totalSec,
          completed: doneSec,
          percentage: pct,
        },
        completedSections: doneSec,
        totalSections: totalSec,
        percentage: pct,
        is_completed: isDone,
        is_in_progress: isInProg,
        is_not_started: isNotStarted,
      })
    }

    const overallPercentage = totalSectionsPossible > 0
      ? Math.min(100, Math.round((totalSectionsDone / totalSectionsPossible) * 1000) / 10)
      : 0

    const currentChapter = firstIncompleteChap || (assignedChapters.length > 0 ? assignedChapters[0] : null)

    const nextLesson = firstIncompleteChap ? {
      chapterId: firstIncompleteChap.id,
      chapterTitle: firstIncompleteChap.title,
      chapterNumber: firstIncompleteChap.chapter_number,
      contentTitle: firstIncompleteChap.completedSections > 0
        ? `Resume Section ${firstIncompleteChap.completedSections + 1}`
        : 'Start Section 1',
    } : null

    // Quizzes & Submissions
    let quizAvg = 0
    let totalQuizzesTaken = 0
    try {
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('scored_marks, total_marks, percentage, passed')
        .eq('student_id', studentId)
        .eq('status', 'completed')

      const completedAttempts = attempts || []
      totalQuizzesTaken = completedAttempts.length
      if (completedAttempts.length > 0) {
        quizAvg = Math.round(completedAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / completedAttempts.length)
      }
    } catch {}

    return {
      assignedClass: enrolledClass,
      assignedSubject: enrolledSubject,
      assignedChapters,
      totalChapters: assignedChapters.length,
      completedChapters: completedChaptersCount,
      overallPercentage,
      currentChapter,
      currentSection: nextLesson?.contentTitle || (completedChaptersCount >= assignedChapters.length && assignedChapters.length > 0 ? 'All Chapters Mastered' : null),
      nextLesson,
      pendingActivities: Math.max(0, assignedChapters.length - completedChaptersCount),
      quizAvg,
      totalQuizzesTaken,
      enrollments,
    }
  },
}

export const enrollmentService = {
  async enroll(payload: Partial<Enrollment> & { organization_id: string; student_id: string }): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ ...payload, enrolled_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    const all = await enrollmentService.getAllStudentEnrollments(studentId)
    const active = all.filter(e => e.status === 'active')
    return active.length > 0 ? [active[0]] : []
  },

  async getAllStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    let localEnrs: Enrollment[] = []
    try {
      const stored = localStorage.getItem(`nanjil_enrollment_${studentId}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        localEnrs = Array.isArray(parsed) ? parsed : [parsed]
      }
    } catch {}

    if (!isUuid(studentId)) {
      return localEnrs
    }

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
        .eq('student_id', studentId)
        .order('enrolled_at', { ascending: false })

      if (error) {
        console.warn('Error fetching enrollments from Supabase:', error)
        return localEnrs
      }

      if (data && data.length > 0) {
        // Hydrate any missing class or subject info from catalog if relation was unlinked
        const hydrated = data.map(enr => {
          if (!enr.class && enr.class_id) {
            const spec = SYLLABUS_SPECS.find(s =>
              enr.class_id === `cat-cls-${s.gradeKey}` ||
              enr.class_id.toLowerCase().includes(s.gradeKey.toLowerCase())
            )
            if (spec) {
              enr.class = {
                id: enr.class_id,
                organization_id: enr.organization_id,
                category_id: `cat-${spec.gradeKey}`,
                name: spec.name,
                code: spec.code,
                status: 'published',
                display_order: 1,
                created_by: 'system',
                created_at: enr.enrolled_at,
                updated_at: enr.enrolled_at,
              }
            }
          }
          return enr
        })

        // Active enrollments always take absolute priority
        const activeList = hydrated.filter(e => e.status === 'active')
        if (activeList.length > 0) {
          return activeList
        }
        return hydrated
      }
      return localEnrs
    } catch {
      return localEnrs
    }
  },

  async getActiveEnrollment(studentId: string): Promise<Enrollment | null> {
    const all = await enrollmentService.getAllStudentEnrollments(studentId)
    const active = all.filter(e => e.status === 'active')
    return active.length > 0 ? active[0] : (all.length > 0 ? all[0] : null)
  },

  async assignStudentClass({
    studentId,
    organizationId,
    classId,
    subjectId,
  }: {
    studentId: string
    organizationId: string
    classId: string
    subjectId?: string
  }): Promise<Enrollment> {
    if (!studentId) throw new Error('Student ID is required')
    if (!organizationId) throw new Error('Organization ID is required')
    if (!classId) throw new Error('Class ID is required')

    // 1. Match class specification (supports UUID, cat-cls-*, gradeKey, name, code)
    const spec = SYLLABUS_SPECS.find(s =>
      s.gradeKey.toLowerCase() === classId.toLowerCase().replace(/^(cat-cls-|cls-)/, '') ||
      s.name.toLowerCase().replace(/[\s-_]/g, '') === classId.toLowerCase().replace(/[\s-_]/g, '') ||
      (s.code && s.code.toLowerCase() === classId.toLowerCase()) ||
      classId.toLowerCase().includes(s.gradeKey.toLowerCase())
    )

    let realClass: any = null

    // If already a valid UUID, check in Supabase classes table
    if (isUuid(classId)) {
      try {
        const { data: directCls } = await supabase
          .from('classes')
          .select('*, category:categories(*)')
          .eq('id', classId)
          .maybeSingle()
        if (directCls) realClass = directCls
      } catch {}
    }

    // If not found by UUID, look up in database by name/code
    if (!realClass) {
      try {
        const { data: dbClasses } = await supabase
          .from('classes')
          .select('*, category:categories(*)')
          .eq('organization_id', organizationId)
          .neq('status', 'archived')

        if (dbClasses && dbClasses.length > 0) {
          const matched = dbClasses.find(c =>
            (spec && c.name.toLowerCase().replace(/[\s-_]/g, '') === spec.name.toLowerCase().replace(/[\s-_]/g, '')) ||
            (spec?.code && c.code && c.code.toLowerCase() === spec.code.toLowerCase()) ||
            c.name.toLowerCase().replace(/[\s-_]/g, '') === classId.toLowerCase().replace(/[\s-_]/g, '') ||
            (spec && c.name.toLowerCase().includes(spec.name.toLowerCase()))
          )
          if (matched) realClass = matched
        }
      } catch {}
    }

    // If still not in database, create the class row in Supabase
    if (!realClass) {
      try {
        let { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('organization_id', organizationId)
          .limit(1)
          .maybeSingle()

        if (!cat) {
          const { data: newCat } = await supabase
            .from('categories')
            .insert({
              organization_id: organizationId,
              name: 'AI Olympiad Curriculum',
              slug: 'ai-curriculum',
              status: 'published',
              display_order: 1
            })
            .select('id')
            .single()
          cat = newCat
        }

        const className = spec?.name || classId
        const classCode = spec?.code || `CL-${Date.now()}`
        const dispOrder = spec ? SYLLABUS_SPECS.indexOf(spec) + 1 : 1

        const { data: createdCls, error: createErr } = await supabase
          .from('classes')
          .insert({
            organization_id: organizationId,
            category_id: cat?.id,
            name: className,
            code: classCode,
            status: 'published',
            display_order: dispOrder
          })
          .select('*, category:categories(*)')
          .single()

        if (!createErr && createdCls) {
          realClass = createdCls
        }
      } catch (err) {
        console.warn('Notice creating database class:', err)
      }
    }

    // Fallback representation if DB creation was restricted
    if (!realClass) {
      realClass = {
        id: isUuid(classId) ? classId : `cat-cls-${spec?.gradeKey || 'class3'}`,
        organization_id: organizationId,
        category_id: `cat-${spec?.gradeKey || 'class3'}`,
        name: spec?.name || classId,
        code: spec?.code || classId,
        status: 'published',
        display_order: spec ? SYLLABUS_SPECS.indexOf(spec) + 1 : 1
      }
    }

    // 2. Resolve Subject for this class
    let realSubject: any = null
    if (subjectId && isUuid(subjectId)) {
      try {
        const { data: directSub } = await supabase
          .from('subjects')
          .select('*')
          .eq('id', subjectId)
          .maybeSingle()
        if (directSub) realSubject = directSub
      } catch {}
    }

    if (!realSubject && isUuid(realClass.id)) {
      try {
        const { data: existingSub } = await supabase
          .from('subjects')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('class_id', realClass.id)
          .maybeSingle()

        if (existingSub) {
          realSubject = existingSub
        } else {
          const subName = spec?.subjectName || `${realClass.name} Curriculum`
          const subCode = spec?.subjectCode || `${realClass.code || 'SUB'}-CURR`
          const { data: newSub } = await supabase
            .from('subjects')
            .insert({
              organization_id: organizationId,
              class_id: realClass.id,
              name: subName,
              code: subCode,
              description: `Curriculum for ${realClass.name}`,
              status: 'published',
              display_order: 1
            })
            .select()
            .single()
          if (newSub) realSubject = newSub
        }
      } catch {}
    }

    if (!realSubject) {
      realSubject = {
        id: isUuid(subjectId) ? subjectId : `cat-sub-${spec?.gradeKey || 'class3'}`,
        organization_id: organizationId,
        class_id: realClass.id,
        name: spec?.subjectName || `${realClass.name} Subject`,
        code: spec?.subjectCode || 'SUB',
        status: 'published',
        display_order: 1
      }
    }

    // 3. Database Enrollment Update:
    // Deactivate ALL previous active classes so there is NO duplicate active class
    let activeEnrollmentRecord: any = null

    if (isUuid(studentId) && isUuid(realClass.id)) {
      try {
        // Step A: Mark all previous active classes as inactive
        await supabase
          .from('enrollments')
          .update({ status: 'inactive' })
          .eq('student_id', studentId)
          .eq('organization_id', organizationId)

        // Step B: Check if an enrollment for this student exists
        const { data: existingEnrs } = await supabase
          .from('enrollments')
          .select('id, class_id')
          .eq('student_id', studentId)
          .eq('organization_id', organizationId)

        const matchingClassEnr = existingEnrs?.find(e => e.class_id === realClass.id)

        if (matchingClassEnr) {
          const { data: updated } = await supabase
            .from('enrollments')
            .update({
              status: 'active',
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              enrolled_at: new Date().toISOString()
            })
            .eq('id', matchingClassEnr.id)
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = updated
        } else if (existingEnrs && existingEnrs.length > 0) {
          // Update the first enrollment to the newly assigned active class
          const { data: updated } = await supabase
            .from('enrollments')
            .update({
              class_id: realClass.id,
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              status: 'active',
              enrolled_at: new Date().toISOString()
            })
            .eq('id', existingEnrs[0].id)
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = updated
        } else {
          // Insert fresh active enrollment
          const { data: inserted } = await supabase
            .from('enrollments')
            .insert({
              student_id: studentId,
              organization_id: organizationId,
              class_id: realClass.id,
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              status: 'active',
              enrolled_at: new Date().toISOString()
            })
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = inserted
        }
      } catch (dbErr) {
        console.warn('Database enrollment update notice:', dbErr)
      }
    }

    // 4. Construct unified active enrollment object
    const finalEnrollment: Enrollment = {
      id: activeEnrollmentRecord?.id || `enr-${Date.now()}`,
      student_id: studentId,
      organization_id: organizationId,
      class_id: realClass.id,
      subject_id: realSubject?.id || null,
      status: 'active',
      class: realClass,
      subject: realSubject,
      enrolled_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }

    // 5. Update local storage caches for instant local synchronization
    try {
      localStorage.setItem(`nanjil_enrollment_${studentId}`, JSON.stringify([finalEnrollment]))
      localStorage.setItem(`nanjil_active_class_${studentId}`, JSON.stringify(realClass))
      localStorage.setItem('nanjil_enrollment_last_changed', `${studentId}:${realClass.id}:${Date.now()}`)
    } catch {}

    // 6. Broadcast event so student screen immediately updates
    window.dispatchEvent(new CustomEvent('student_enrollment_updated', {
      detail: { studentId, enrollment: finalEnrollment, classId: realClass.id, className: realClass.name }
    }))

    return finalEnrollment
  },

  async ensureInitialEnrollment(
    studentId: string,
    organizationId: string,
    defaultGradeKey: string = 'class3'
  ): Promise<Enrollment | null> {
    try {
      const all = await enrollmentService.getAllStudentEnrollments(studentId)
      if (all.length > 0) {
        return all.find(e => e.status === 'active') || all[all.length - 1]
      }

      const spec = SYLLABUS_SPECS.find(s => s.gradeKey === defaultGradeKey) || SYLLABUS_SPECS[0]
      let { data: dbClass } = await supabase
        .from('classes')
        .select('id, name')
        .eq('organization_id', organizationId)
        .ilike('name', `%${spec.name}%`)
        .maybeSingle()

      if (!dbClass) {
        const { data: newCls } = await supabase
          .from('classes')
          .insert({
            organization_id: organizationId,
            name: spec.name,
            code: spec.code,
            status: 'published',
            display_order: 1,
          })
          .select()
          .single()
        dbClass = newCls
      }

      let subId: string | undefined
      if (dbClass) {
        let { data: dbSub } = await supabase
          .from('subjects')
          .select('id')
          .eq('organization_id', organizationId)
          .eq('class_id', dbClass.id)
          .maybeSingle()

        if (!dbSub) {
          const { data: newSub } = await supabase
            .from('subjects')
            .insert({
              organization_id: organizationId,
              class_id: dbClass.id,
              name: spec.subjectName,
              code: spec.subjectCode,
              description: `Curriculum for ${spec.name}`,
              status: 'published',
              display_order: 1,
            })
            .select()
            .single()
          dbSub = newSub
        }
        subId = dbSub?.id
      }

      const { data: enr, error: enrErr } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          organization_id: organizationId,
          class_id: dbClass?.id || `cat-cls-${spec.gradeKey}`,
          subject_id: subId || `cat-sub-${spec.gradeKey}`,
          status: 'active',
          enrolled_at: new Date().toISOString(),
        })
        .select('*, class:classes(*), subject:subjects(*)')
        .single()

      if (!enrErr && enr) return enr
    } catch (err) {
      console.warn('ensureInitialEnrollment notice:', err)
    }
    return null
  },

  async getByClass(classId: string): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, student:profiles(*)')
      .eq('class_id', classId)
      .eq('status', 'active')
    if (error) throw error
    return data || []
  },

  async unenroll(id: string) {
    const { error } = await supabase
      .from('enrollments')
      .update({ status: 'inactive' })
      .eq('id', id)
    if (error) throw error
  },

  async isEnrolled(studentId: string, classId?: string, subjectId?: string): Promise<boolean> {
    let query = supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', studentId)
      .eq('status', 'active')
    if (classId) query = query.eq('class_id', classId)
    if (subjectId) query = query.eq('subject_id', subjectId)
    const { data } = await query
    return (data?.length || 0) > 0
  },
}
