import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { LoadingState, ErrorState, Button, Badge } from '../../components/ui'
import { chapterService } from '../../services/chapterService'
import { chapterContentService } from '../../services/chapterContentService'
import { progressService } from '../../services/progressService'
import { learningProgressTracker } from '../../services/learningProgressTracker'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import { type Chapter, type ChapterContent } from '../../types'
import { type LevelData, type ChapterData } from '../../services/curriculumData'
import { gamification, type StudentStats } from '../../utils/gamification'
import { ThemeHeaderNavigation } from '../../components/content/fullpage/ThemeHeaderNavigation'
import { LearningSidebar } from '../../components/learning/LearningSidebar'
import { LearningExperienceDispatcher } from '../../components/learning/LearningExperienceDispatcher'
import { LearningNavigationContext } from '../../components/learning/LearningNavigationContext'
import { gameAudio } from '../../utils/gameAudio'
import { auraSpeechService } from '../../services/auraSpeechService'
import {
  Award, Sparkles, Check, ChevronRight, Video, BookOpen,
  Compass, FileEdit, Gamepad2, FlaskConical, Trophy
} from 'lucide-react'
import { GaioInteractiveBookApp } from '../../components/gaio/GaioInteractiveBookApp'

import { supabase } from '../../lib/supabase'

const SECTION_ICONS = [
  Video,
  BookOpen,
  Compass,
  FileEdit,
  Gamepad2,
  FlaskConical,
  Award,
  Trophy
]

const isUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

export interface CanonicalSection {
  id: string
  sectionNumber: number
  contentType: string
  title: string
  subtitle?: string
  description: string
  estimatedMinutes: number
  xpReward: number
  videoUrl?: string
  videoDescription?: string
  htmlContent?: string
  imageSrc?: string
  imageCaption?: string
  topicTitle?: string
  canonicalType?: string
  lessonJourney?: any
  matchingPairs?: { id: string; term: string; definition: string }[]
  mcq?: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
    hint: string
  }
  workbookPrompts?: string
  flashcards?: any[]
  labChecklist?: string[]
  labStarter?: string
  assignmentBrief?: string
  assignmentMarks?: number
  quizQuestions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz1Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz2Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz3Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
}

export default function ChapterLearningPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Initialize active section from URL search param if present (1-indexed ?section=N)
  const getSectionIdxFromUrl = (): number => {
    const sParam = searchParams.get('section')
    if (sParam) {
      const parsed = parseInt(sParam, 10) - 1
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 7) return parsed
    }
    return 0
  }

  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [currentGradeKey, setCurrentGradeKey] = useState<string>('class3')
  const [sections, setSections] = useState<CanonicalSection[]>([])
  const [currentSectionIdx, setCurrentSectionIdx] = useState<number>(getSectionIdxFromUrl)
  const [completedSectionIds, setCompletedSectionIds] = useState<string[]>([])
  const [mobileViewMode, setMobileViewMode] = useState<'sections' | 'lesson'>(() => {
    return searchParams.has('section') ? 'lesson' : 'sections'
  })
  const [loading, setLoading] = useState(true)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))
  const [classUnlockData, setClassUnlockData] = useState<{
    completedClassName: string
    nextClassName: string
    nextSubjectName: string
    nextGradeKey?: string
  } | null>(null)
  const [showClassUnlockModal, setShowClassUnlockModal] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const handleCloseSection = useCallback(() => {
    auraSpeechService.stop()
    setMobileViewMode('sections')
    setSearchParams({})
  }, [setSearchParams])

  // Stop any active Aura speech on section change or page unmount
  useEffect(() => {
    auraSpeechService.stop()
  }, [currentSectionIdx])

  useEffect(() => {
    return () => {
      auraSpeechService.stop()
    }
  }, [])

  // Synchronize currentSectionIdx & mobileViewMode when searchParams changes (browser back/forward/refresh)
  useEffect(() => {
    const targetIdx = getSectionIdxFromUrl()
    if (targetIdx !== currentSectionIdx) {
      setCurrentSectionIdx(targetIdx)
    }
    if (searchParams.has('section')) {
      setMobileViewMode('lesson')
    }
  }, [searchParams])

  // Scroll to absolute top whenever active section changes
  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      mainContainerRef.current.scrollTop = 0
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [currentSectionIdx])

  const studentId = user?.id || 'guest-student'
  const orgId = user?.organization_id || ''

  // Load Chapter & 8 Canonical Sections
  const loadData = useCallback(async () => {
    if (!chapterId) return
    try {
      setLoading(true)

      let chap: Chapter | null = null
      let resolvedGrade = 'class3'
      let resolvedChapNum = '1'

      if (chapterId.startsWith('cat-') || chapterId.startsWith('catalog-')) {
        const lvlFromId = curriculumCatalogService.getLevelData(chapterId)
        if (lvlFromId) {
          resolvedGrade = lvlFromId.gradeKey
        } else {
          const parts = chapterId.split('-')
          resolvedGrade = parts[1] || 'class3'
        }

        const chapMatch = chapterId.match(/[-_](\d+)$/)
        if (chapMatch) {
          resolvedChapNum = chapMatch[1]
        } else {
          const parts = chapterId.split('-')
          resolvedChapNum = parts[2] || '1'
        }

        const allLevelsData = curriculumCatalogService.getAllLevelsData()
        const lvl = allLevelsData.find((l: LevelData) => l.gradeKey === resolvedGrade) || allLevelsData[0]
        const cData = lvl.chapters.find((c: ChapterData) => c.chapterNumber === resolvedChapNum) || lvl.chapters[0]

        chap = {
          id: chapterId,
          organization_id: orgId,
          subject_id: `cat-sub-${lvl.gradeKey}`,
          title: cData.chapterTitle,
          chapter_number: cData.chapterNumber,
          short_description: cData.shortDescription,
          description: cData.description,
          status: 'published',
          estimated_duration: cData.duration,
          display_order: parseInt(cData.chapterNumber, 10),
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          subject: {
            id: `cat-sub-${lvl.gradeKey}`,
            organization_id: orgId,
            class_id: `cat-cls-${lvl.gradeKey}`,
            name: lvl.subjectName,
            code: lvl.subjectCode,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        }
      } else {
        chap = await chapterService.getById(chapterId)
        if (chap.chapter_number) resolvedChapNum = String(chap.chapter_number)

        const matchedLvl =
          curriculumCatalogService.getLevelData(chap.subject?.class?.name) ||
          curriculumCatalogService.getLevelData(chap.subject?.class?.code) ||
          curriculumCatalogService.getLevelData(chap.subject?.name) ||
          curriculumCatalogService.getLevelData(chap.subject?.code) ||
          curriculumCatalogService.getLevelData(chap.title) ||
          curriculumCatalogService.getLevelData(chap.description) ||
          curriculumCatalogService.getLevelData(chap.subject?.class_id) ||
          curriculumCatalogService.getLevelData(chap.subject_id)

        if (matchedLvl) {
          resolvedGrade = matchedLvl.gradeKey
        }
      }

      setCurrentGradeKey(resolvedGrade)
      setChapter(chap)
      setStats(gamification.getStats(studentId))

      // Fetch CMS DB items from Supabase
      let dbItems: ChapterContent[] = []
      try {
        dbItems = await chapterContentService.getPublishedByChapter(chapterId)
      } catch {
        dbItems = []
      }

      const catContent = curriculumCatalogService.getCurriculumChapterContent(resolvedGrade, resolvedChapNum)

      // Helper to find DB item matching a canonical slot
      const findDbItemForSlot = (slotNum: number) => {
        if (!dbItems || dbItems.length === 0) return undefined
        // 1. Match by display_order
        const byOrder = dbItems.find(i => i.display_order === slotNum)
        if (byOrder) return byOrder

        // 2. Match by content_type and title keywords
        if (slotNum === 1) return dbItems.find(i => i.content_type === 'video')
        if (slotNum === 2) return dbItems.find(i => i.content_type === 'lesson' && (i.title?.toLowerCase().includes('lesson 1') || i.title?.toLowerCase().includes('1')))
        if (slotNum === 3) return dbItems.find(i => i.content_type === 'lesson' && (i.title?.toLowerCase().includes('lesson 2') || i.title?.toLowerCase().includes('2')))
        if (slotNum === 4) return dbItems.find(i => i.content_type === 'worksheet')
        if (slotNum === 5) return dbItems.find(i => i.content_type === 'activity')
        if (slotNum === 6) return dbItems.find(i => i.content_type === 'lesson' && (i.title?.toLowerCase().includes('lesson 3') || i.title?.toLowerCase().includes('lab') || i.title?.toLowerCase().includes('discovery') || i.title?.toLowerCase().includes('3')))
        if (slotNum === 7) return dbItems.find(i => i.content_type === 'assignment')
        if (slotNum === 8) return dbItems.find(i => i.content_type === 'quiz')
        return undefined
      }

      // Construct Authoritative 8 Canonical Sections
      const canonicalSections: CanonicalSection[] = [
        // 1. VIDEO BRIEFING
        (() => {
          const dbItem = findDbItemForSlot(1)
          const assignedVideo = localStorage.getItem(`cms_section_video_${dbItem?.id || `${chapterId}-sec-1`}`) || dbItem?.video?.video_url || undefined
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-1`}`) || undefined
          return {
            id: dbItem?.id || `${chapterId}-sec-1`,
            sectionNumber: 1,
            contentType: 'video',
            title: dbItem?.title || `Video Briefing: ${chap?.title || catContent.topic1}`,
            subtitle: 'Section 1 · Cinematic Briefing',
            description: dbItem?.description || `Visual walkthrough and interactive animation covering ${catContent.topic1}, ${catContent.topic2} and ${catContent.topic3}.`,
            estimatedMinutes: dbItem?.video?.duration || 8,
            xpReward: 15,
            videoUrl: assignedVideo,
            videoDescription: dbItem?.video?.description || `Comprehensive multimedia introduction exploring ${catContent.topic1}, ${catContent.topic2} & ${catContent.topic3}.`,
            imageSrc: assignedImg,
            topicTitle: catContent.topic1,
            canonicalType: catContent.canonicalType,
          }
        })(),

        // 2. LESSON 1: CONCEPT DISCOVERY
        (() => {
          const dbItem = findDbItemForSlot(2)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-2`}`) || undefined
          const rawContent = dbItem?.lesson?.content || ''
          const isLegacy = !rawContent || rawContent.includes('content-image-placeholder') || rawContent.includes('Upload process charts') || rawContent.includes('Write your detailed lesson')
          return {
            id: dbItem?.id || `${chapterId}-sec-2`,
            sectionNumber: 2,
            contentType: 'lesson',
            title: dbItem?.title && !dbItem.title.toLowerCase().includes('untitled') ? dbItem.title : `Lesson 1: ${catContent.topic1}`,
            subtitle: 'Section 2 · Visual Concept Exploration',
            description: dbItem?.description || `Conceptual foundation and verified models for ${catContent.topic1}.`,
            estimatedMinutes: dbItem?.lesson?.estimated_duration || 15,
            xpReward: 20,
            lessonJourney: catContent.lesson1Journey,
            htmlContent: isLegacy ? catContent.lesson1Content : rawContent,
            imageSrc: assignedImg,
            imageCaption: assignedImg ? `Concept diagram for ${catContent.topic1}.` : undefined,
            topicTitle: catContent.topic1,
            canonicalType: catContent.canonicalType,
            matchingPairs: catContent.matchingPairs,
          }
        })(),

        // 3. LESSON 2: SCENARIO MISSION
        (() => {
          const dbItem = findDbItemForSlot(3)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-3`}`) || undefined
          const rawContent = dbItem?.lesson?.content || ''
          const isLegacy = !rawContent || rawContent.includes('content-image-placeholder') || rawContent.includes('Upload process charts') || rawContent.includes('Write your detailed lesson')
          return {
            id: dbItem?.id || `${chapterId}-sec-3`,
            sectionNumber: 3,
            contentType: 'lesson',
            title: dbItem?.title && !dbItem.title.toLowerCase().includes('untitled') ? dbItem.title : `Lesson 2: ${catContent.topic2}`,
            subtitle: 'Section 3 · Scenario & Problem-Solving Mission',
            description: dbItem?.description || `Real-world scenario case study and problem-solving mission for ${catContent.topic2}.`,
            estimatedMinutes: dbItem?.lesson?.estimated_duration || 15,
            xpReward: 20,
            lessonJourney: catContent.lesson2Journey,
            htmlContent: isLegacy ? catContent.lesson2Content : rawContent,
            imageSrc: assignedImg,
            imageCaption: assignedImg ? `Applied mechanism diagram for ${catContent.topic2}.` : undefined,
            topicTitle: catContent.topic2,
            canonicalType: catContent.canonicalType,
            mcq: catContent.mcq,
          }
        })(),

        // 4. WORKSHEET: TACTILE WORKBOOK
        (() => {
          const dbItem = findDbItemForSlot(4)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-4`}`) || undefined
          return {
            id: dbItem?.id || `${chapterId}-sec-4`,
            sectionNumber: 4,
            contentType: 'worksheet',
            title: dbItem?.title || `Interactive Workbook: ${catContent.topic1}`,
            subtitle: 'Section 4 · Interactive Student Workbook',
            description: dbItem?.description || 'Structured analytical reflection questions and tactile classification.',
            estimatedMinutes: 10,
            xpReward: 20,
            workbookPrompts: dbItem?.worksheet?.instructions || catContent.workbookPrompts,
            imageSrc: assignedImg,
            topicTitle: catContent.topic1,
            canonicalType: catContent.canonicalType,
          }
        })(),

        // 5. ACTIVITY: INTERACTIVE CHALLENGE GAME
        (() => {
          const dbItem = findDbItemForSlot(5)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-5`}`) || undefined
          return {
            id: dbItem?.id || `${chapterId}-sec-5`,
            sectionNumber: 5,
            contentType: 'activity',
            title: dbItem?.title || `Interactive Challenge: ${catContent.topic1}`,
            subtitle: 'Section 5 · Educational Game & Challenge',
            description: dbItem?.description || `Rapid-fire classification challenge and interactive reflex test for ${catContent.topic1}.`,
            estimatedMinutes: 12,
            xpReward: 20,
            flashcards: catContent.flashcards,
            imageSrc: assignedImg,
            topicTitle: catContent.topic1,
            canonicalType: catContent.canonicalType,
          }
        })(),

        // 6. LESSON 3 / DISCOVERY LAB: PRACTICAL EXPERIMENTATION STUDIO
        (() => {
          const dbItem = findDbItemForSlot(6)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-6`}`) || undefined
          const rawContent = dbItem?.lesson?.content || ''
          const isLegacy = !rawContent || rawContent.includes('content-image-placeholder') || rawContent.includes('Upload process charts') || rawContent.includes('Write your detailed lesson')
          return {
            id: dbItem?.id || `${chapterId}-sec-6`,
            sectionNumber: 6,
            contentType: 'lesson',
            title: dbItem?.title && !dbItem.title.toLowerCase().includes('untitled') ? dbItem.title : `Lesson 3: Discovery Lab - ${catContent.topic3}`,
            subtitle: 'Section 6 · Practical Discovery Studio',
            description: dbItem?.description || `Hands-on practical exploration, interactive experimentation studio, and mastery of ${catContent.topic3}.`,
            estimatedMinutes: dbItem?.lesson?.estimated_duration || 15,
            xpReward: 25,
            lessonJourney: catContent.lesson3Journey,
            htmlContent: isLegacy ? catContent.lesson3Content : rawContent,
            imageSrc: assignedImg,
            imageCaption: assignedImg ? `Lab architecture & theory diagram for ${catContent.topic3}.` : undefined,
            topicTitle: catContent.topic3,
            canonicalType: catContent.canonicalType,
            labChecklist: catContent.labChecklist,
            labStarter: catContent.labStarter,
          }
        })(),

        // 7. ASSIGNMENT: CAPSTONE PROJECT / SHOW & TELL
        (() => {
          const dbItem = findDbItemForSlot(7)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-7`}`) || undefined
          return {
            id: dbItem?.id || `${chapterId}-sec-7`,
            sectionNumber: 7,
            contentType: 'assignment',
            title: dbItem?.title || `Capstone Project: ${catContent.topic2}`,
            subtitle: 'Section 7 · Project Workspace',
            description: dbItem?.description || `Apply your knowledge to design, showcase, and submit your creative project.`,
            estimatedMinutes: 20,
            xpReward: 25,
            assignmentBrief: dbItem?.assignment?.instructions || catContent.assignmentBrief,
            assignmentMarks: dbItem?.assignment?.maximum_marks || catContent.assignmentMarks,
            imageSrc: assignedImg,
            topicTitle: catContent.topic2,
            canonicalType: catContent.canonicalType,
          }
        })(),

        // 8. FINAL MASTERY QUIZ: 3-STAGE ACCORDION ASSESSMENT
        (() => {
          const dbItem = findDbItemForSlot(8)
          const assignedImg = localStorage.getItem(`cms_section_media_${dbItem?.id || `${chapterId}-sec-8`}`) || undefined
          return {
            id: dbItem?.id || `${chapterId}-sec-8`,
            sectionNumber: 8,
            contentType: 'quiz',
            title: dbItem?.title || `Mastery Assessment: ${chap?.title || catContent.topic1}`,
            subtitle: 'Section 8 · 3-Stage Mastery Series',
            description: dbItem?.description || `Official 3-stage timed assessment verifying knowledge retention, analytical deduction, and subject mastery across all chapter lessons.`,
            estimatedMinutes: 15,
            xpReward: 50,
            quizQuestions: catContent.quizQuestions,
            quiz1Questions: catContent.quiz1Questions,
            quiz2Questions: catContent.quiz2Questions,
            quiz3Questions: catContent.quiz3Questions,
            imageSrc: assignedImg,
            topicTitle: chap?.title || catContent.topic1,
            canonicalType: catContent.canonicalType,
          }
        })(),
      ]

      setSections(canonicalSections)

      // Restore stored progress from database strictly for this chapter's 8 sections
      try {
        const canonicalIds = canonicalSections.map(s => s.id)
        const completedIds = await progressService.getCompletedSectionIds(studentId, chapterId, canonicalIds)
        setCompletedSectionIds(completedIds)
      } catch (err) {
        console.warn('Notice loading completed sections in chapter page:', err)
      }
    } catch {
      toast.error('Failed to load chapter content')
    } finally {
      setLoading(false)
    }
  }, [chapterId, studentId, orgId])

  useEffect(() => {
    loadData()

    const handleCmsUpdate = () => {
      loadData()
    }
    const handleGamificationUpdate = () => {
      setStats(gamification.getStats(studentId))
    }

    window.addEventListener('cms_content_updated', handleCmsUpdate)
    window.addEventListener('gamification_stats_updated', handleGamificationUpdate)

    return () => {
      window.removeEventListener('cms_content_updated', handleCmsUpdate)
      window.removeEventListener('gamification_stats_updated', handleGamificationUpdate)
    }
  }, [loadData, studentId, orgId])

  const totalSections = sections.length || 8
  const currentSection = sections[currentSectionIdx] || sections[0]

  // Section completion handler - ONLY called after authentic completion of required content/game
  const markSectionDone = async (sectionId: string) => {
    // 1. Prevent duplicate completion records
    if (completedSectionIds.includes(sectionId)) {
      return
    }

    // 2. Add to completed sections list
    const updated = Array.from(new Set([...completedSectionIds, sectionId]))
    setCompletedSectionIds(updated)

    // 3. Persist genuine section completion record in database
    await progressService.recordSectionCompletion({
      studentId,
      classId: currentGradeKey,
      chapterId: chapterId || '',
      sectionId,
      organizationId: orgId,
    })

    // 4. Award XP (idempotently handled)
    await learningProgressTracker.trackSectionCompleted({
      studentId,
      orgId,
      classId: currentGradeKey,
      chapterId: chapterId || '',
      sectionId,
      xpReward: currentSection?.xpReward || 20,
    })

    // 5. Notify UI of progress update
    window.dispatchEvent(new CustomEvent('chapter_progress_updated', {
      detail: { chapterId, studentId, completedSectionIds: updated, completedCount: updated.length }
    }))

    // 6. Chapter is complete ONLY when all 8 distinct sections are completed
    if (updated.length === 8) {
      try {
        const res = await progressService.checkAndAdvanceClassProgression(studentId, orgId || 'default-org', chapterId)
        if (res.classCompleted && res.nextClassName) {
          setClassUnlockData({
            completedClassName: res.currentClassName || 'Current Level',
            nextClassName: res.nextClassName,
            nextSubjectName: res.nextSubjectName || 'Next Curriculum',
            nextGradeKey: res.nextGradeKey
          })
          setShowClassUnlockModal(true)
        }
      } catch (err) {
        console.error('Progression check error:', err)
      }
    }

    setStats(gamification.getStats(studentId))
  }

  const chapNum = parseInt(String(chapter?.chapter_number || '1'), 10)
  const isFinalChapter = chapNum >= 6

  const handleContinueNextChapter = async () => {
    if (isFinalChapter) {
      handleCompleteClass()
      return
    }

    const nextChapNum = chapNum + 1
    let nextId = `cat-${currentGradeKey}-${nextChapNum}`

    if (chapter && !chapter.id.startsWith('cat-') && chapter.subject_id) {
      try {
        const chaps = await chapterService.getPublished(orgId, chapter.subject_id)
        const found = chaps.find(c => parseInt(String(c.chapter_number), 10) === nextChapNum)
        if (found) {
          nextId = found.id
        }
      } catch {}
    }

    setCurrentSectionIdx(0)
    setSearchParams({ section: '1' })
    toast.success(`Advancing to Chapter ${nextChapNum}...`)
    navigate(`/student/learning/${nextId}?section=1`)
  }

  const handleCompleteClass = async () => {
    try {
      const res = await progressService.checkAndAdvanceClassProgression(studentId, orgId || 'default-org', chapterId || '')
      if (res.classCompleted && res.nextClassName) {
        setClassUnlockData({
          completedClassName: res.currentClassName || 'Current Level',
          nextClassName: res.nextClassName,
          nextSubjectName: res.nextSubjectName || 'Next Level',
          nextGradeKey: res.nextGradeKey
        })
        setShowClassUnlockModal(true)
      } else {
        toast.success('Academic level completed! Returning to learning roadmap.')
        navigate('/student/learning')
      }
    } catch {
      navigate('/student/learning')
    }
  }

  const handleSelectSection = (idx: number) => {
    const clamped = Math.max(0, Math.min(7, idx))
    setCurrentSectionIdx(clamped)
    setMobileViewMode('lesson')
    setIsMobileDrawerOpen(false)
    setSearchParams({ section: String(clamped + 1) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextSection = () => {
    gameAudio.playSuccess()
    if (currentSectionIdx < sections.length - 1) {
      const nextIdx = currentSectionIdx + 1
      setCurrentSectionIdx(nextIdx)
      setIsMobileDrawerOpen(false)
      setSearchParams({ section: String(nextIdx + 1) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevSection = () => {
    gameAudio.playTap()
    if (currentSectionIdx > 0) {
      const prevIdx = currentSectionIdx - 1
      setCurrentSectionIdx(prevIdx)
      setIsMobileDrawerOpen(false)
      setSearchParams({ section: String(prevIdx + 1) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (loading) return <AppLayout><LoadingState message="Loading chapter..." /></AppLayout>
  if (!chapter) return <AppLayout><ErrorState message="Chapter not found" /></AppLayout>

  const activeTopicTitle = currentSection?.topicTitle || currentSection?.title || chapter.title

  const resolvedTier: 'primary' | 'middle' | 'high' | 'ug' | 'pg' = (() => {
    const k = currentGradeKey.toLowerCase()
    if (k.includes('class3') || k.includes('class4') || k.includes('class5')) return 'primary'
    if (k.includes('class6') || k.includes('class7') || k.includes('class8')) return 'middle'
    if (k.includes('class9') || k.includes('class10') || k.includes('class11') || k.includes('class12')) return 'high'
    if (k.includes('ug')) return 'ug'
    if (k.includes('pg')) return 'pg'
    return 'primary'
  })()

  // ─── CLASS 3 AUTHENTIC DIGITAL BOOK EXPERIENCE (GAIO Class 3 Book.pdf) ───
  // Complete replacement of LMS template with exact interactive book experience
  if (currentGradeKey === 'class3') {
    const cNum = parseInt(String(chapter?.chapter_number || '1'), 10) || 1
    return (
      <AppLayout>
        <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-900/5 overflow-hidden">
          <GaioInteractiveBookApp
            initialMonth={cNum >= 1 && cNum <= 6 ? cNum : 1}
            studentName={user?.profile?.full_name || 'Super Student'}
            onExit={() => navigate('/student/learning')}
            onComplete={() => {
              if (currentSection) {
                markSectionDone(currentSection.id)
              }
              toast.success(`Congratulations! You completed Chapter ${cNum} in the GAIO Class 3 Book!`)
            }}
          />
        </div>
      </AppLayout>
    )
  }

  return (
    <LearningNavigationContext.Provider
      value={{
        onClose: handleCloseSection,
        onReturnToSections: handleCloseSection,
        currentSectionIdx,
      }}
    >
      <div className="h-[100dvh] max-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 w-full overflow-hidden select-none">
        {/* Dynamic Theme Header Navigation (Fixed Top Bar) */}
        <div className="shrink-0 z-40 w-full">
          <ThemeHeaderNavigation
            gradeKey={currentGradeKey}
            chapterNum={chapter.chapter_number || '1'}
            chapterTitle={chapter.title}
            topicTitle={activeTopicTitle}
            currentSectionIdx={currentSectionIdx}
            totalSections={totalSections}
            completedSectionIds={completedSectionIds}
            sectionIds={sections.map(s => s.id)}
            onSelectSection={handleSelectSection}
            onNextSection={handleNextSection}
            onPrevSection={handlePrevSection}
            onToggleMobileMenu={() => setIsMobileDrawerOpen(prev => !prev)}
            stats={stats}
            tier={resolvedTier}
          />
        </div>

        {/* Main Learning Layout: Fixed Left Sidebar + Dedicated Game Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row w-full min-h-0 overflow-hidden">
          {/* Left-Side Learning Navigation (Desktop) - 100% Fixed, Zero Scroll, Touching Left Edge */}
          <div className="hidden lg:flex flex-col shrink-0 h-full overflow-hidden border-r border-slate-200/90 bg-white">
            <LearningSidebar
              gradeKey={currentGradeKey}
              chapterNum={chapter.chapter_number || '1'}
              chapterTitle={chapter.title}
              topicTitle={activeTopicTitle}
              sections={sections}
              currentSectionIdx={currentSectionIdx}
              completedSectionIds={completedSectionIds}
              onSelectSection={handleSelectSection}
              tier={resolvedTier}
            />
          </div>

          {/* Mobile Sections Navigation Drawer Modal */}
          {isMobileDrawerOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex animate-in fade-in">
              <div className="w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
                <div className="flex items-center justify-between p-3 border-b border-slate-100 shrink-0 bg-slate-50">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Chapter Navigation
                  </span>
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 text-xs font-bold px-2 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <LearningSidebar
                    gradeKey={currentGradeKey}
                    chapterNum={chapter.chapter_number || '1'}
                    chapterTitle={chapter.title}
                    topicTitle={activeTopicTitle}
                    sections={sections}
                    currentSectionIdx={currentSectionIdx}
                    completedSectionIds={completedSectionIds}
                    onSelectSection={handleSelectSection}
                    tier={resolvedTier}
                  />
                </div>
              </div>
              {/* Backdrop click dismiss */}
              <div
                className="flex-1 h-full"
                onClick={() => setIsMobileDrawerOpen(false)}
              />
            </div>
          )}

          {/* Dynamic 8-Section Experience Workspace or Mobile Chapter Overview */}
          <main
            ref={mainContainerRef}
            className="flex-1 flex flex-col min-w-0 h-full overflow-hidden w-full relative"
          >
            {/* Mobile Chapter & Sections Overview (When student is viewing sections on mobile) */}
            <div className={`${mobileViewMode === 'sections' ? 'flex' : 'hidden'} lg:hidden flex-1 flex-col w-full h-full min-h-0 bg-slate-50 overflow-y-auto px-3 py-3 space-y-3`}>
              {/* Chapter Hero Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentGradeKey.toUpperCase()} · Chapter {chapter.chapter_number || '1'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {completedSectionIds.length} of {totalSections} Completed
                  </span>
                </div>
                <h1 className="text-base font-black text-slate-900 leading-tight">
                  {chapter.title}
                </h1>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {chapter.short_description || chapter.description}
                </p>
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${Math.round((completedSectionIds.length / totalSections) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 8 Canonical Section Cards */}
              <div className="space-y-2 pb-6">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Chapter Curriculum Sections
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600">
                    Tap to Open
                  </span>
                </div>

                {sections.map((sec, idx) => {
                  const isSecDone = completedSectionIds.includes(sec.id)
                  const isSecActive = idx === currentSectionIdx
                  const SecIcon = SECTION_ICONS[idx] || BookOpen

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSelectSection(idx)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSecDone
                          ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                          : isSecActive
                          ? 'bg-indigo-50/40 border-indigo-300 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSecDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {isSecDone ? <Check size={18} /> : <SecIcon size={18} />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                              Section {idx + 1}
                            </span>
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              +{sec.xpReward} XP
                            </span>
                          </div>
                          <h3 className="text-xs font-black text-slate-900 truncate mt-0.5">
                            {sec.title}
                          </h3>
                          <p className="text-[10px] text-slate-500 truncate">
                            {sec.subtitle || sec.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {isSecDone ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check size={11} /> Done
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                            Start <ChevronRight size={12} />
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Section Experience Dispatcher (Desktop ALWAYS, Mobile when in 'lesson' mode) */}
            <div className={`${mobileViewMode === 'lesson' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col w-full h-full min-h-0 overflow-hidden`}>
              {currentSection && (
                <LearningExperienceDispatcher
                  gradeKey={currentGradeKey}
                  chapterNum={chapter.chapter_number || '1'}
                  chapterTitle={chapter.title}
                  topicTitle={activeTopicTitle}
                  currentSectionIdx={currentSectionIdx}
                  canonicalSection={currentSection}
                  completedSectionIds={completedSectionIds}
                  onCompleteSection={() => markSectionDone(currentSection.id)}
                  onJumpToSection={handleSelectSection}
                  onContinueNextChapter={handleContinueNextChapter}
                  isFinalChapter={isFinalChapter}
                  tier={resolvedTier}
                />
              )}
            </div>
          </main>
        </div>

        {/* Class Mastery & Level Progression Modal */}
        {showClassUnlockModal && classUnlockData && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-slate-900 shadow-2xl border border-slate-200 text-center space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
                <Award size={44} className="text-amber-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <Sparkles size={13} className="text-emerald-600" /> Academic Level Mastered!
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
                  Congratulations!
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Outstanding dedication! You have successfully mastered all 6 chapters of <strong className="text-slate-900">{classUnlockData.completedClassName}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <Check size={14} className="text-emerald-600" /> Next Academic Level Unlocked
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{classUnlockData.nextClassName}</h4>
                    <p className="text-xs text-slate-500">{classUnlockData.nextSubjectName}</p>
                  </div>
                  <Badge variant="success" className="font-bold">Enrolled</Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowClassUnlockModal(false)}
                  className="flex-1 border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Review Current Level
                </Button>
                <Button
                  onClick={() => navigate('/student/learning')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md border-0"
                  icon={<ChevronRight size={16} />}
                >
                  Begin Next Class
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LearningNavigationContext.Provider>
  )
}
