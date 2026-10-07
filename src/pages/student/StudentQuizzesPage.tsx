import { useEffect, useState, useCallback } from 'react'
import { Award, Sparkles, Play, GraduationCap, Zap, Target } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, Badge, LoadingState, Button } from '../../components/ui'
import { quizService } from '../../services/contentServices'
import { enrollmentService } from '../../services/progressService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterService } from '../../services/chapterService'
import { chapterContentService } from '../../services/chapterContentService'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import { lessonQuizService, type GeneratedQuiz } from '../../services/lessonQuizService'
import { DynamicQuizModal } from '../../components/quiz/DynamicQuizModal'
import type { Class } from '../../types'
import toast from 'react-hot-toast'

interface LevelOption {
  id: string
  name: string
  code: string
  gradeKey?: string
}

interface SubjectOption {
  id: string
  name: string
  class_id?: string
  code?: string
}

interface ChapterOption {
  id: string
  title: string
  chapter_number?: string | number
  subject_id?: string
  description?: string
}

interface LessonOption {
  id: string
  title: string
  chapter_id?: string
  content_type?: string
  lesson_content?: string
}

export default function StudentQuizzesPage() {
  const { user } = useAuth()
  const orgId = user?.organization_id || ''
  const studentId = user?.id || ''

  // Attempt History
  const [attempts, setAttempts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Cascading Selection State
  const [levels, setLevels] = useState<LevelOption[]>([])
  const [selectedLevelId, setSelectedLevelId] = useState<string>('')

  const [subjects, setSubjects] = useState<SubjectOption[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('')

  const [chapters, setChapters] = useState<ChapterOption[]>([])
  const [selectedChapterId, setSelectedChapterId] = useState<string>('')

  const [lessons, setLessons] = useState<LessonOption[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<string>('')

  // Active Quiz Modal State
  const [activeQuizModal, setActiveQuizModal] = useState(false)
  const [activeQuizData, setActiveQuizData] = useState<GeneratedQuiz | null>(null)
  const [activeContentId, setActiveContentId] = useState<string | undefined>(undefined)
  const [generatingQuiz, setGeneratingQuiz] = useState(false)

  // 1. Initial Load: Academic Levels, DB Quizzes & Attempts
  const loadInitialData = useCallback(async () => {
    if (!studentId || !orgId) return
    try {
      setLoading(true)
      const [enrs, _allQuizzes, myAttempts, loadedClasses] = await Promise.all([
        enrollmentService.getStudentEnrollments(studentId).catch(() => []),
        quizService.getAllForStudent(studentId).catch(() => []),
        quizService.getAllAttemptsForStudent(studentId).catch(() => []),
        classService.getAll(orgId).catch(() => []),
      ])

      setAttempts(myAttempts)

      // Build unified academic levels combining DB classes & curriculum catalog specs
      const catalogSpecs = curriculumCatalogService.getAllSpecs()
      const unifiedLevels: LevelOption[] = []

      // Add DB classes first
      if (loadedClasses && loadedClasses.length > 0) {
        loadedClasses.forEach((c: Class) => {
          const matchingSpec = catalogSpecs.find(s => s.name.toLowerCase() === c.name.toLowerCase())
          unifiedLevels.push({
            id: c.id,
            name: c.name,
            code: c.code || matchingSpec?.code || 'CLASS',
            gradeKey: matchingSpec?.gradeKey,
          })
        })
      }

      // Add any catalog specs not already in unifiedLevels
      catalogSpecs.forEach(spec => {
        if (!unifiedLevels.some(l => l.name.toLowerCase() === spec.name.toLowerCase())) {
          unifiedLevels.push({
            id: `catalog-lvl-${spec.gradeKey}`,
            name: spec.name,
            code: spec.code,
            gradeKey: spec.gradeKey,
          })
        }
      })

      setLevels(unifiedLevels)

      // Determine initial level: check active enrolled class or first level
      const activeEnr = enrs.find(e => e.status === 'active') || enrs[enrs.length - 1]
      const cleanActiveName = activeEnr?.class?.name?.toLowerCase().replace(/[\s-_]/g, '')
      const cleanActiveCode = activeEnr?.class?.code?.toLowerCase().replace(/[\s-_]/g, '')

      const initialLevel = unifiedLevels.find(l =>
        (activeEnr?.class_id && l.id === activeEnr.class_id) ||
        (cleanActiveName && l.name.toLowerCase().replace(/[\s-_]/g, '') === cleanActiveName) ||
        (cleanActiveCode && l.code.toLowerCase().replace(/[\s-_]/g, '') === cleanActiveCode)
      ) || unifiedLevels[0]

      if (initialLevel) {
        setSelectedLevelId(initialLevel.id)
      }
    } catch (e) {
      console.error('Failed to load initial quiz data:', e)
    } finally {
      setLoading(false)
    }
  }, [studentId, orgId])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  // 2. Cascade Step 1: When Level changes -> Load Subjects
  useEffect(() => {
    if (!selectedLevelId) return

    const curLevel = levels.find(l => l.id === selectedLevelId)
    const gradeKey = curLevel?.gradeKey || 'class3'
    const spec = curriculumCatalogService.getAllSpecs().find(s => s.gradeKey === gradeKey || s.name === curLevel?.name)

    const fetchSubjects = async () => {
      let subs: SubjectOption[] = []

      // If this is a real DB class ID, query DB subjects
      if (!selectedLevelId.startsWith('catalog-lvl-')) {
        try {
          const dbSubs = await subjectService.getAll(orgId, selectedLevelId)
          if (dbSubs && dbSubs.length > 0) {
            subs = dbSubs.map(s => ({
              id: s.id,
              name: s.name,
              class_id: s.class_id,
              code: s.code,
            }))
          }
        } catch (e) {
          console.warn('Could not query DB subjects:', e)
        }
      }

      // Fallback to curriculum catalog subject if DB returned none
      if (subs.length === 0) {
        const defaultName = spec ? `AI Olympiad (${spec.name})` : 'AI Olympiad Core Curriculum'
        subs = [{
          id: `catalog-sub-${gradeKey}`,
          name: defaultName,
          class_id: selectedLevelId,
          code: spec?.code ? `AIO-${spec.code}` : 'AIO-STD',
        }]
      }

      setSubjects(subs)
      if (subs.length > 0) {
        setSelectedSubjectId(subs[0].id)
      } else {
        setSelectedSubjectId('')
      }
    }

    fetchSubjects()
  }, [selectedLevelId, levels, orgId])

  // 3. Cascade Step 2: When Subject changes -> Load Chapters
  useEffect(() => {
    if (!selectedSubjectId) {
      setChapters([])
      setSelectedChapterId('')
      return
    }

    const curLevel = levels.find(l => l.id === selectedLevelId)
    const gradeKey = curLevel?.gradeKey || 'class3'

    const fetchChapters = async () => {
      let chaps: ChapterOption[] = []

      // Query DB if subject is from DB
      if (!selectedSubjectId.startsWith('catalog-sub-')) {
        try {
          const dbChaps = await chapterService.getPublished(orgId, selectedSubjectId)
          if (dbChaps && dbChaps.length > 0) {
            chaps = dbChaps.map(ch => ({
              id: ch.id,
              title: ch.title,
              chapter_number: ch.chapter_number,
              subject_id: ch.subject_id,
              description: ch.description,
            }))
          }
        } catch (e) {
          console.warn('Could not query DB chapters:', e)
        }
      }

      // Fallback to curriculum catalog chapters
      if (chaps.length === 0) {
        const lvl = curriculumCatalogService.getLevelData(gradeKey) || curriculumCatalogService.getAllLevelsData()[0]
        chaps = lvl.chapters.map(c => ({
          id: `catalog-chap-${lvl.gradeKey}-${c.chapterNumber}`,
          title: `Chapter ${c.chapterNumber} — ${c.chapterTitle}`,
          chapter_number: c.chapterNumber,
          subject_id: selectedSubjectId,
          description: c.description,
        }))
      }

      setChapters(chaps)
      if (chaps.length > 0) {
        setSelectedChapterId(chaps[0].id)
      } else {
        setSelectedChapterId('')
      }
    }

    fetchChapters()
  }, [selectedSubjectId, selectedLevelId, levels, orgId])

  // 4. Cascade Step 3: When Chapter changes -> Load Lessons / Sections
  useEffect(() => {
    if (!selectedChapterId) {
      setLessons([])
      setSelectedLessonId('')
      return
    }

    const curLevel = levels.find(l => l.id === selectedLevelId)
    const curChap = chapters.find(c => c.id === selectedChapterId)
    const gradeKey = curLevel?.gradeKey || 'class3'
    const chapNum = String(curChap?.chapter_number || '1')
    const chapContent = curriculumCatalogService.getCurriculumChapterContent(gradeKey, chapNum)

    const fetchLessons = async () => {
      let items: LessonOption[] = []

      // Query DB if chapter is from DB
      if (!selectedChapterId.startsWith('catalog-chap-')) {
        try {
          const dbContents = await chapterContentService.getByChapter(selectedChapterId, false)
          if (dbContents && dbContents.length > 0) {
            const dbLessons = dbContents.filter(c => c.content_type === 'lesson')
            if (dbLessons.length > 0) {
              items = dbLessons.map((c, idx) => ({
                id: c.id,
                title: c.title.startsWith('Lesson') ? c.title : `Lesson: ${c.title}`,
                chapter_id: c.chapter_id,
                content_type: c.content_type,
                lesson_content: c.lesson?.content || (idx === 0 ? chapContent.lesson1Content : chapContent.lesson2Content),
              }))
            } else {
              items = dbContents.map((c, idx) => ({
                id: c.id,
                title: c.title,
                chapter_id: c.chapter_id,
                content_type: c.content_type,
                lesson_content: c.lesson?.content || (idx % 2 === 0 ? chapContent.lesson1Content : chapContent.lesson2Content),
              }))
            }
          }
        } catch (e) {
          console.warn('Could not query DB contents:', e)
        }
      }

      // If no DB lessons or catalog chapter, provide the chapter's authentic lessons & assessment
      if (items.length === 0) {
        items = [
          {
            id: `catalog-les-${gradeKey}-${chapNum}-1`,
            title: `Lesson 1: ${chapContent.topic1}`,
            chapter_id: selectedChapterId,
            content_type: 'lesson',
            lesson_content: chapContent.lesson1Content,
          },
          {
            id: `catalog-les-${gradeKey}-${chapNum}-2`,
            title: `Lesson 2: ${chapContent.topic2}`,
            chapter_id: selectedChapterId,
            content_type: 'lesson',
            lesson_content: chapContent.lesson2Content,
          },
          {
            id: `catalog-les-${gradeKey}-${chapNum}-full`,
            title: `Full Chapter Assessment: ${curChap?.title || 'Chapter Assessment'}`,
            chapter_id: selectedChapterId,
            content_type: 'quiz',
            lesson_content: `${chapContent.lesson1Content}\n\n${chapContent.lesson2Content}`,
          },
        ]
      }

      setLessons(items)
      if (items.length > 0) {
        setSelectedLessonId(items[0].id)
      } else {
        setSelectedLessonId('')
      }
    }

    fetchLessons()
  }, [selectedChapterId, selectedLevelId, levels, chapters, orgId])

  // ─── START DYNAMIC LESSON QUIZ ───────────────────────────────────────────────
  const handleStartLessonQuiz = async (overrideLesson?: LessonOption) => {
    const targetLesson = overrideLesson || lessons.find(l => l.id === selectedLessonId)
    if (!targetLesson) {
      toast.error('Please select a lesson to take the quiz')
      return
    }

    const curLevel = levels.find(l => l.id === selectedLevelId)
    const curSubject = subjects.find(s => s.id === selectedSubjectId)
    const curChapter = chapters.find(c => c.id === selectedChapterId)
    const gradeKey = curLevel?.gradeKey || 'class3'
    const chapNum = String(curChapter?.chapter_number || '1')

    setGeneratingQuiz(true)
    try {
      const isFull = targetLesson.id.endsWith('-full') || targetLesson.title.toLowerCase().includes('full chapter')
      const generated = await lessonQuizService.getQuizForLesson({
        subjectName: curSubject?.name || 'AI Basics',
        chapterTitle: curChapter?.title || 'Chapter',
        lessonTitle: targetLesson.title,
        academicLevel: curLevel?.name || 'Academic Tier',
        contentId: targetLesson.id.startsWith('catalog-') ? undefined : targetLesson.id,
        chapterId: curChapter?.id.startsWith('catalog-') ? undefined : curChapter?.id,
        lessonContent: targetLesson.lesson_content,
        gradeKey,
        chapterNum: chapNum,
        isFullChapter: isFull,
      })

      setActiveQuizData(generated)
      setActiveContentId(targetLesson.id.startsWith('catalog-') ? undefined : targetLesson.id)
      setActiveQuizModal(true)
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to generate quiz: ' + (err.message || 'Unknown error'))
    } finally {
      setGeneratingQuiz(false)
    }
  }

  // ─── START FROM CHAPTER CARD / FULL CHAPTER ─────────────────────────────────
  const handleStartChapterQuiz = async (ch?: ChapterOption) => {
    const targetChapter = ch || chapters.find(c => c.id === selectedChapterId)
    if (!targetChapter) {
      toast.error('Please select a chapter to take the assessment')
      return
    }

    const curLevel = levels.find(l => l.id === selectedLevelId)
    const curSubject = subjects.find(s => s.id === selectedSubjectId)
    const gradeKey = curLevel?.gradeKey || 'class3'
    const chapNum = String(targetChapter.chapter_number || '1')
    const chapContent = curriculumCatalogService.getCurriculumChapterContent(gradeKey, chapNum)

    setGeneratingQuiz(true)
    try {
      const generated = await lessonQuizService.getQuizForLesson({
        subjectName: curSubject?.name || 'AI Basics',
        chapterTitle: targetChapter.title,
        lessonTitle: `${targetChapter.title} — Full Chapter Assessment`,
        academicLevel: curLevel?.name || 'Academic Tier',
        contentId: targetChapter.id.startsWith('catalog-') ? undefined : targetChapter.id,
        chapterId: targetChapter.id.startsWith('catalog-') ? undefined : targetChapter.id,
        lessonContent: `${chapContent.lesson1Content}\n\n${chapContent.lesson2Content}`,
        gradeKey,
        chapterNum: targetChapter.chapter_number,
        isFullChapter: true,
      })

      setActiveQuizData(generated)
      setActiveContentId(targetChapter.id.startsWith('catalog-') ? undefined : targetChapter.id)
      setActiveQuizModal(true)
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to start quiz: ' + (err.message || 'Unknown error'))
    } finally {
      setGeneratingQuiz(false)
    }
  }

  // Reload attempts on completion
  const handleQuizCompleted = async () => {
    try {
      const myAttempts = await quizService.getAllAttemptsForStudent(studentId)
      setAttempts(myAttempts)
    } catch (e) {
      console.error(e)
    }
  }

  // Active level and subject labels for UI
  const activeLevelName = levels.find(l => l.id === selectedLevelId)?.name || 'Enrolled Level'
  const activeSubjectName = subjects.find(s => s.id === selectedSubjectId)?.name || 'AI Olympiad'

  if (loading) {
    return (
      <AppLayout>
        <LoadingState message="Loading your quizzes and assessment studio..." />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 fade-in space-y-6 sm:space-y-8 max-w-6xl mx-auto">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-20 translate-x-20 blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-blue-200 mb-2.5 sm:mb-3 border border-white/10">
                <Sparkles size={13} className="text-yellow-300" />
                <span>AI Olympiad Dynamic Assessment</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">Interactive Quiz & Mastery Studio</h1>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Test your knowledge dynamically on any specific Subject, Chapter, and Lesson. Questions are intelligently synthesized to focus strictly on your chosen lesson concepts.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 text-center min-w-[120px] sm:min-w-[140px] flex-shrink-0 self-start md:self-auto">
              <p className="text-[11px] sm:text-xs text-blue-200 font-medium">Completed Quizzes</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{attempts.length}</p>
              <span className="text-[9px] sm:text-[10px] text-green-300 font-semibold uppercase tracking-wider mt-0.5 sm:mt-1 block">Active Tracking</span>
            </div>
          </div>
        </div>

        {/* ─── 1. TARGETED LESSON QUIZ GENERATOR ──────────────────────────────── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm space-y-4 sm:space-y-5">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={15} /> Targeted Lesson & Chapter Quiz Studio
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                Select Academic Level, Subject, Chapter & Lesson
              </h2>
              <p className="text-xs text-slate-500">
                Choose a specific lesson to test that topic only, or run a Full Chapter Quiz to test all lessons in the chapter.
              </p>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <Zap size={13} className="text-emerald-600" /> Instant Adaptive Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1 sm:pt-2">
            
            {/* 1. Academic Level */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                1. Academic Level ({levels.length})
              </label>
              <select
                value={selectedLevelId}
                onChange={e => setSelectedLevelId(e.target.value)}
                className="w-full h-10 sm:h-11 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
              >
                {levels.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Subject */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                2. Subject
              </label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                disabled={subjects.length === 0}
                className="w-full h-10 sm:h-11 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 disabled:opacity-50"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Chapter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                3. Chapter
              </label>
              <select
                value={selectedChapterId}
                onChange={e => setSelectedChapterId(e.target.value)}
                disabled={chapters.length === 0}
                className="w-full h-10 sm:h-11 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 disabled:opacity-50"
              >
                {chapters.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </select>
            </div>

            {/* 4. Lesson / Topic */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                4. Lesson / Scope
              </label>
              <select
                value={selectedLessonId}
                onChange={e => setSelectedLessonId(e.target.value)}
                disabled={lessons.length === 0}
                className="w-full h-10 sm:h-11 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 disabled:opacity-50"
              >
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3.5 sm:pt-4 border-t border-slate-100 gap-3">
            <span className="text-xs text-slate-500">
              Passing score: 60% &bull; Earn <strong>+30 XP</strong> and Quiz Master Badge
            </span>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={() => handleStartLessonQuiz()}
                loading={generatingQuiz}
                disabled={!selectedLessonId}
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 sm:px-6 shadow-md w-full sm:w-auto justify-center min-h-[42px]"
                icon={<Play size={15} />}
              >
                Start Lesson Quiz
              </Button>

              <Button
                onClick={() => handleStartChapterQuiz()}
                loading={generatingQuiz}
                disabled={!selectedChapterId}
                size="md"
                variant="outline"
                className="border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold px-5 sm:px-6 shadow-sm w-full sm:w-auto justify-center min-h-[42px]"
                icon={<Award size={15} />}
              >
                Full Chapter Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* ─── 2. READY-TO-TAKE CHAPTER QUIZZES ──────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Award size={18} className="text-blue-600" />
                <span>Chapter Assessments for {activeLevelName} ({chapters.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Launch a full chapter mastery assessment or individual lesson quizzes with 1-click.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {activeSubjectName}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map(ch => {
              const myAttemptsForCh = attempts.filter((a: any) =>
                a.quiz_id === ch.id || a.quiz?.chapter_content?.chapter_id === ch.id
              )
              const lastAttempt = myAttemptsForCh[0]
              const isPassed = myAttemptsForCh.some((a: any) => a.passed)

              const curLevel = levels.find(l => l.id === selectedLevelId)
              const gradeKey = curLevel?.gradeKey || 'class3'
              const chapNum = String(ch.chapter_number || '1')
              const chapContent = curriculumCatalogService.getCurriculumChapterContent(gradeKey, chapNum)

              return (
                <Card key={ch.id} className="p-5 border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        Ch. {ch.chapter_number || '1'} &bull; 2 Lessons
                      </span>
                      <Badge variant={isPassed ? 'success' : myAttemptsForCh.length > 0 ? 'danger' : 'default'}>
                        {isPassed ? 'Passed ✓' : myAttemptsForCh.length > 0 ? 'Retry Needed' : 'Ready'}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                      {ch.description || 'Comprehensive evaluation covering all core topics and practical activities in this chapter.'}
                    </p>

                    {/* Quick Lesson Quiz Buttons */}
                    <div className="space-y-1.5 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <button
                        onClick={() => handleStartLessonQuiz({
                          id: `catalog-les-${gradeKey}-${chapNum}-1`,
                          title: `Lesson 1: ${chapContent.topic1}`,
                          lesson_content: chapContent.lesson1Content,
                        })}
                        className="w-full text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between p-1 rounded hover:bg-white transition-colors"
                      >
                        <span className="truncate flex items-center gap-1"><Target size={13} className="text-blue-600" /> L1: {chapContent.topic1}</span>
                        <span className="text-[10px] text-blue-600 font-bold ml-1 flex-shrink-0">Quiz →</span>
                      </button>

                      <button
                        onClick={() => handleStartLessonQuiz({
                          id: `catalog-les-${gradeKey}-${chapNum}-2`,
                          title: `Lesson 2: ${chapContent.topic2}`,
                          lesson_content: chapContent.lesson2Content,
                        })}
                        className="w-full text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between p-1 rounded hover:bg-white transition-colors"
                      >
                        <span className="truncate flex items-center gap-1"><Target size={13} className="text-blue-600" /> L2: {chapContent.topic2}</span>
                        <span className="text-[10px] text-blue-600 font-bold ml-1 flex-shrink-0">Quiz →</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      {lastAttempt?.percentage != null ? `Best: ${Math.round(lastAttempt.percentage)}%` : 'Full Chapter'}
                    </span>

                    <Button
                      onClick={() => handleStartChapterQuiz(ch)}
                      size="sm"
                      variant={isPassed ? 'outline' : 'primary'}
                      icon={<Play size={13} />}
                    >
                      {isPassed ? 'Retake Full Quiz' : 'Full Chapter Quiz'}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* ─── 3. RECENT ATTEMPTS HISTORY ────────────────────────────────────── */}
        {attempts.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Your Attempt History ({attempts.length})</h2>
            <Card className="overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Quiz / Lesson</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Score</th>
                      <th className="px-5 py-3">Percentage</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attempts.map((att: any) => (
                      <tr key={att.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-slate-800">
                          {att.quiz?.chapter_content?.title || att.quiz?.title || 'Lesson Assessment Quiz'}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-500 font-mono">
                          {att.started_at ? new Date(att.started_at).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {att.scored_marks} / {att.total_marks}
                        </td>
                        <td className="px-5 py-3.5 font-bold">
                          <span className={att.passed ? 'text-green-600' : 'text-red-500'}>
                            {Math.round(att.percentage || 0)}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant={att.passed ? 'success' : 'danger'}>
                            {att.passed ? 'Passed ✓' : 'Failed'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Dynamic Quiz Modal */}
        <DynamicQuizModal
          open={activeQuizModal}
          onClose={() => setActiveQuizModal(false)}
          quizData={activeQuizData}
          studentId={studentId}
          orgId={orgId}
          contentId={activeContentId}
          onQuizCompleted={handleQuizCompleted}
        />
      </div>
    </AppLayout>
  )
}
