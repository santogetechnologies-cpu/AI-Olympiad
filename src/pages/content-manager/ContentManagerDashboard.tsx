import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Sliders, Plus, Trash2, Edit, Eye, ExternalLink,
  Upload, Copy, Check, FolderOpen, HelpCircle,
  ArrowUp, ArrowDown, Search, FileCheck, CheckCircle,
  Sparkles, Image as ImageIcon
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button, LoadingState, Modal, Input, Textarea, Select, ConfirmDialog } from '../../components/ui'
import { ContentTypeIcon, ContentTypeBadge } from '../../components/content/ContentTypeIcon'
import { RichTextEditor } from '../../components/editor/RichTextEditor'
import { chapterService } from '../../services/chapterService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterContentService } from '../../services/chapterContentService'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import {
  workbookService, lessonService, videoService, worksheetService,
  activityService, assignmentService, quizService, questionService
} from '../../services/contentServices'
import { storageService } from '../../services/storageService'
import { formatVideoUrl } from '../../utils/mediaUtils'
import { VisualImageManager } from '../../components/content/VisualImageManager'
import type { Class, Subject, Chapter, ChapterContent, ContentType, Question, QuestionType } from '../../types'
import toast from 'react-hot-toast'

const CONTENT_TYPES: ContentType[] = ['lesson', 'video', 'worksheet', 'activity', 'assignment', 'quiz', 'resource']

export default function ContentManagerDashboard() {
  const { user } = useAuth()
  const orgId = user?.organization_id || ''

  // CMS Tab State
  const [viewMode, setViewMode] = useState<'curriculum' | 'visuals' | 'media' | 'submissions'>('curriculum')

  // Academic Hierarchy State
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string>('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('')
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [chapterSearch, setChapterSearch] = useState('')

  // Chapter Sections State
  const [sections, setSections] = useState<ChapterContent[]>([])
  const [activeSection, setActiveSection] = useState<ChapterContent | null>(null)
  const [loading, setLoading] = useState(true)

  // Media Asset State
  const [uploadedImages, setUploadedImages] = useState<{ url: string; name: string }[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Submissions State
  const [pendingWorkbooks, setPendingWorkbooks] = useState<any[]>([])
  const [gradingModal, setGradingModal] = useState<{ open: boolean; item?: any }>({ open: false })
  const [feedbackText, setFeedbackText] = useState('')
  const [savingFeedback, setSavingFeedback] = useState(false)

  // Chapter Modal
  const [chapterModal, setChapterModal] = useState<{ open: boolean; editing?: Chapter }>({ open: false })
  const [chapterForm, setChapterForm] = useState({
    title: '',
    chapter_number: '1',
    short_description: '',
    description: '',
    estimated_duration: 30,
    status: 'published' as 'draft' | 'published' | 'archived',
  })
  const [savingChapter, setSavingChapter] = useState(false)
  const [deleteChapterConfirm, setDeleteChapterConfirm] = useState<{ open: boolean; chapter?: Chapter }>({ open: false })

  // Section Modal
  const [sectionModal, setSectionModal] = useState(false)
  const [newSectionType, setNewSectionType] = useState<ContentType>('lesson')
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newSectionDesc, setNewSectionDesc] = useState('')
  const [newSectionRequired, setNewSectionRequired] = useState(true)
  const [savingSection, setSavingSection] = useState(false)
  const [deleteSectionConfirm, setDeleteSectionConfirm] = useState<{ open: boolean; section?: ChapterContent }>({ open: false })

  // Quiz Questions Manager State
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [questionModal, setQuestionModal] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('mcq')
  const [questionMarks, setQuestionMarks] = useState(1)
  const [questionOptions, setQuestionOptions] = useState([
    { text: 'Option A', isCorrect: true },
    { text: 'Option B', isCorrect: false },
    { text: 'Option C', isCorrect: false },
    { text: 'Option D', isCorrect: false },
  ])
  const [savingQuestion, setSavingQuestion] = useState(false)

  // Quick Academic Level & Subject Modals
  const [quickClassModal, setQuickClassModal] = useState({ open: false, name: '', code: '' })
  const [quickSubjectModal, setQuickSubjectModal] = useState({ open: false, name: '', code: '' })
  const [savingQuick, setSavingQuick] = useState(false)

  // Seeding Modal (Class 3 to PG)
  const [seedingModal, setSeedingModal] = useState(false)
  const [seedingProgress, setSeedingProgress] = useState(false)
  const [seedTierFilter, setSeedTierFilter] = useState<'all' | 'primary' | 'middle' | 'secondary' | 'ug' | 'pg'>('all')

  // 1. Initial Load: Classes & Submissions & Stored Media Assets
  const loadInitial = useCallback(async () => {
    try {
      const storedMedia = localStorage.getItem('cms_uploaded_media')
      if (storedMedia) {
        setUploadedImages(JSON.parse(storedMedia))
      }
    } catch {}

    if (!orgId) return
    try {
      setLoading(true)
      const [allCls, workbooks] = await Promise.all([
        classService.getAll(orgId),
        workbookService.getAllPendingReview(orgId),
      ])
      setClasses(allCls)
      setPendingWorkbooks(workbooks)
      if (allCls.length > 0 && !selectedClassId) {
        setSelectedClassId(allCls[0].id)
      }
    } catch {
      toast.error('Failed to load classes')
    } finally {
      setLoading(false)
    }
  }, [orgId, selectedClassId])

  useEffect(() => {
    loadInitial()
  }, [loadInitial])

  // 2. Load Subjects when Class Changes
  useEffect(() => {
    if (!orgId || !selectedClassId) return
    subjectService.getAll(orgId).then(subs => {
      const filtered = subs.filter(s => s.class_id === selectedClassId && s.status !== 'archived')
      setSubjects(filtered)
      if (filtered.length > 0) {
        setSelectedSubjectId(filtered[0].id)
      } else {
        setSelectedSubjectId('')
        setChapters([])
        setSelectedChapter(null)
      }
    })
  }, [orgId, selectedClassId])

  // 3. Load Chapters when Subject Changes
  const loadChapters = useCallback(async () => {
    if (!orgId || !selectedSubjectId) {
      setChapters([])
      setSelectedChapter(null)
      return
    }
    try {
      const chaps = await chapterService.getAll(orgId, selectedSubjectId)
      setChapters(chaps)
      if (chaps.length > 0 && !selectedChapter) {
        setSelectedChapter(chaps[0])
      } else if (selectedChapter) {
        const found = chaps.find(c => c.id === selectedChapter.id)
        setSelectedChapter(found || chaps[0] || null)
      }
    } catch {
      toast.error('Failed to load chapters')
    }
  }, [orgId, selectedSubjectId, selectedChapter])

  useEffect(() => {
    loadChapters()
  }, [orgId, selectedSubjectId])

  // 4. Load Sections when Chapter Changes
  const loadSections = useCallback(async () => {
    if (!selectedChapter) {
      setSections([])
      setActiveSection(null)
      return
    }
    try {
      const items = await chapterContentService.getByChapter(selectedChapter.id, true)
      setSections(items)
      if (items.length > 0) {
        if (!activeSection || !items.find(i => i.id === activeSection.id)) {
          setActiveSection(items[0])
        } else {
          const fresh = items.find(i => i.id === activeSection.id)
          setActiveSection(fresh || items[0])
        }
      } else {
        setActiveSection(null)
      }
    } catch {
      toast.error('Failed to load chapter sections')
    }
  }, [selectedChapter, activeSection])

  useEffect(() => {
    loadSections()
  }, [selectedChapter])

  // 5. Load Quiz Questions if active section is a quiz
  const loadQuizQuestions = useCallback(async () => {
    if (activeSection?.content_type === 'quiz' && activeSection.quiz?.id) {
      const qs = await quizService.getQuestionsForQuiz(activeSection.quiz.id)
      setQuizQuestions(qs)
    } else {
      setQuizQuestions([])
    }
  }, [activeSection])

  useEffect(() => {
    loadQuizQuestions()
  }, [activeSection, loadQuizQuestions])

  // ── Chapter CRUD & Controls ──────────────────────────────────────────────────
  const openCreateChapter = () => {
    setChapterForm({
      title: '',
      chapter_number: (chapters.length + 1).toString(),
      short_description: '',
      description: '',
      estimated_duration: 30,
      status: 'published',
    })
    setChapterModal({ open: true })
  }

  const openEditChapter = (chap: Chapter) => {
    setChapterForm({
      title: chap.title,
      chapter_number: chap.chapter_number?.toString() || '1',
      short_description: chap.short_description || '',
      description: chap.description || '',
      estimated_duration: chap.estimated_duration || 30,
      status: chap.status,
    })
    setChapterModal({ open: true, editing: chap })
  }

  const handleSaveChapter = async () => {
    if (!chapterForm.title.trim()) {
      toast.error('Chapter title is required')
      return
    }
    setSavingChapter(true)
    try {
      if (chapterModal.editing) {
        await chapterService.update(chapterModal.editing.id, {
          title: chapterForm.title.trim(),
          chapter_number: chapterForm.chapter_number,
          short_description: chapterForm.short_description,
          description: chapterForm.description,
          estimated_duration: chapterForm.estimated_duration,
          status: chapterForm.status,
        })
        toast.success('Chapter updated! Reflected on Student Page ✓')
      } else {
        const created = await chapterService.create({
          organization_id: orgId,
          subject_id: selectedSubjectId,
          title: chapterForm.title.trim(),
          chapter_number: chapterForm.chapter_number,
          short_description: chapterForm.short_description,
          description: chapterForm.description,
          estimated_duration: chapterForm.estimated_duration,
          status: chapterForm.status,
          display_order: chapters.length + 1,
        })
        setSelectedChapter(created)
        toast.success('Chapter created! Reflected on Student Page ✓')
      }
      setChapterModal({ open: false })
      await loadChapters()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to save chapter')
    } finally {
      setSavingChapter(false)
    }
  }

  const handleToggleChapterStatus = async (chap: Chapter) => {
    const newStatus = chap.status === 'published' ? 'draft' : 'published'
    try {
      await chapterService.update(chap.id, { status: newStatus })
      toast.success(`Chapter marked as ${newStatus}!`)
      await loadChapters()
    } catch {
      toast.error('Failed to change chapter status')
    }
  }

  const handleMoveChapter = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= chapters.length) return
    const reordered = [...chapters]
    const temp = reordered[index]
    reordered[index] = reordered[targetIndex]
    reordered[targetIndex] = temp

    setChapters(reordered)
    try {
      await chapterService.reorder(reordered.map((c, i) => ({ id: c.id, display_order: i + 1 })))
      toast.success('Chapter order updated! ✓')
    } catch {
      toast.error('Failed to reorder chapters')
      await loadChapters()
    }
  }

  const handleDeleteChapter = async () => {
    if (!deleteChapterConfirm.chapter) return
    try {
      await chapterService.delete(deleteChapterConfirm.chapter.id)
      toast.success('Chapter deleted')
      setDeleteChapterConfirm({ open: false })
      setSelectedChapter(null)
      await loadChapters()
    } catch {
      toast.error('Failed to delete chapter')
    }
  }

  // ── Section (Content Item) CRUD & Controls ───────────────────────────────────
  const handleAddSection = async () => {
    if (!selectedChapter || !newSectionTitle.trim()) {
      toast.error('Please enter section title')
      return
    }
    setSavingSection(true)
    try {
      const item = await chapterContentService.create({
        organization_id: orgId,
        chapter_id: selectedChapter.id,
        content_type: newSectionType,
        title: newSectionTitle.trim(),
        description: newSectionDesc.trim(),
        display_order: sections.length + 1,
        is_required: newSectionRequired,
        status: 'published',
        created_by: user!.id,
      })

      // Scaffold type-specific initial record
      if (newSectionType === 'lesson') await lessonService.upsert({ chapter_content_id: item.id, content: '<p>Write your detailed lesson content here...</p>' })
      if (newSectionType === 'video') await videoService.upsert({ chapter_content_id: item.id, organization_id: orgId })
      if (newSectionType === 'worksheet') await worksheetService.upsert({ chapter_content_id: item.id, worksheet_type: 'interactive', instructions: 'Answer the workbook questions below.' })
      if (newSectionType === 'activity') await activityService.upsert({ chapter_content_id: item.id, instructions: 'Complete the hands-on activity steps.' })
      if (newSectionType === 'assignment') await assignmentService.upsert({ chapter_content_id: item.id, instructions: 'Complete the assignment solution.' })
      if (newSectionType === 'quiz') await quizService.upsert({ chapter_content_id: item.id, passing_percentage: 50, maximum_attempts: 3 })

      toast.success(`${newSectionType.toUpperCase()} section added! Reflected on Student Page ✓`)
      setSectionModal(false)
      setNewSectionTitle('')
      setNewSectionDesc('')
      await loadSections()
      setActiveSection(item)
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to add section')
    } finally {
      setSavingSection(false)
    }
  }

  const handleToggleSectionStatus = async (sec: ChapterContent) => {
    const newStatus = sec.status === 'published' ? 'draft' : 'published'
    try {
      await chapterContentService.update(sec.id, { status: newStatus })
      toast.success(`Section marked as ${newStatus}!`)
      await loadSections()
    } catch {
      toast.error('Failed to change section status')
    }
  }

  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sections.length) return
    const reordered = [...sections]
    const temp = reordered[index]
    reordered[index] = reordered[targetIndex]
    reordered[targetIndex] = temp

    setSections(reordered)
    try {
      await chapterContentService.reorder(reordered.map((s, i) => ({ id: s.id, display_order: i + 1 })))
      toast.success('Section order updated! ✓')
    } catch {
      toast.error('Failed to reorder sections')
      await loadSections()
    }
  }

  const handleDeleteSection = async () => {
    if (!deleteSectionConfirm.section) return
    try {
      await chapterContentService.delete(deleteSectionConfirm.section.id)
      toast.success('Section deleted')
      setDeleteSectionConfirm({ open: false })
      await loadSections()
    } catch {
      toast.error('Failed to delete section')
    }
  }

  // ── Image Upload & Asset Management ──────────────────────────────────────────
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const url = await storageService.uploadImage(file, orgId)
      setUploadedImages(prev => {
        const updated = [{ url, name: file.name }, ...prev.filter(p => p.url !== url)]
        try {
          localStorage.setItem('cms_uploaded_media', JSON.stringify(updated))
        } catch {}
        return updated
      })
      toast.success('Image uploaded to Asset Library! ✓')
    } catch {
      toast.error('Image upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast.success('Image URL copied to clipboard! Ready to paste into lessons.')
    setTimeout(() => setCopiedUrl(null), 2500)
  }

  // ── Quiz Question CRUD ───────────────────────────────────────────────────────
  const handleAddQuestion = async () => {
    if (!activeSection?.quiz?.id || !questionText.trim()) {
      toast.error('Question text is required')
      return
    }
    setSavingQuestion(true)
    try {
      const opts = (questionType === 'mcq' || questionType === 'multiple_select' || questionType === 'true_false')
        ? questionOptions.map((opt, i) => ({
            option_text: opt.text,
            is_correct: opt.isCorrect,
            display_order: i + 1,
          }))
        : []

      const q = await questionService.create({
        organization_id: orgId,
        question: questionText.trim(),
        question_type: questionType,
        marks: questionMarks,
        difficulty: 'medium',
        created_by: user!.id,
      }, opts)

      await quizService.addQuestion(activeSection.quiz.id, q.id, quizQuestions.length + 1)
      toast.success('Question added to quiz! ✓')
      setQuestionModal(false)
      setQuestionText('')
      await loadQuizQuestions()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to add question')
    } finally {
      setSavingQuestion(false)
    }
  }

  const handleDeleteQuestion = async (qqId: string) => {
    try {
      await quizService.removeQuestion(qqId)
      toast.success('Question removed')
      await loadQuizQuestions()
    } catch {
      toast.error('Failed to remove question')
    }
  }

  // ── Feedback & Grading ───────────────────────────────────────────────────────
  const handleSaveFeedback = async () => {
    if (!gradingModal.item) return
    setSavingFeedback(true)
    try {
      await workbookService.submitWorkbook({
        chapter_content_id: gradingModal.item.chapter_content_id,
        student_id: gradingModal.item.student_id,
        organization_id: orgId,
        responses: gradingModal.item.responses || {},
        feedback: feedbackText,
        status: 'reviewed',
      })
      toast.success('Feedback recorded and sent to student! ✓')
      setGradingModal({ open: false })
      setFeedbackText('')
      await loadInitial()
    } catch {
      toast.error('Failed to save feedback')
    } finally {
      setSavingFeedback(false)
    }
  }

  // ── Quick Class & Subject Creation ─────────────────────────────────────────
  const handleCreateQuickClass = async () => {
    if (!quickClassModal.name.trim()) {
      toast.error('Class name is required (e.g., "Class 3", "Class 10", "PG - Master in AI")')
      return
    }
    setSavingQuick(true)
    try {
      const created = await classService.create({
        organization_id: orgId,
        name: quickClassModal.name.trim(),
        code: quickClassModal.code.trim() || undefined,
        status: 'published'
      })
      toast.success(`Academic level "${created.name}" created!`)
      setQuickClassModal({ open: false, name: '', code: '' })
      const updatedClasses = await classService.getAll(orgId)
      setClasses(updatedClasses)
      setSelectedClassId(created.id)
    } catch {
      toast.error('Failed to create class')
    } finally {
      setSavingQuick(false)
    }
  }

  const handleCreateQuickSubject = async () => {
    if (!selectedClassId) {
      toast.error('Please select an academic class first')
      return
    }
    if (!quickSubjectModal.name.trim()) {
      toast.error('Subject name is required (e.g., "Science", "Physics", "Artificial Intelligence")')
      return
    }
    setSavingQuick(true)
    try {
      const created = await subjectService.create({
        organization_id: orgId,
        class_id: selectedClassId,
        name: quickSubjectModal.name.trim(),
        code: quickSubjectModal.code.trim() || undefined,
        status: 'published'
      })
      toast.success(`Subject "${created.name}" created!`)
      setQuickSubjectModal({ open: false, name: '', code: '' })
      const subs = await subjectService.getAll(orgId)
      const filtered = subs.filter(s => s.class_id === selectedClassId && s.status !== 'archived')
      setSubjects(filtered)
      setSelectedSubjectId(created.id)
    } catch {
      toast.error('Failed to create subject')
    } finally {
      setSavingQuick(false)
    }
  }

  const handleSeedCurriculum = async (gradeKey: string) => {
    if (!orgId) return
    setSeedingProgress(true)
    const userId = user?.id || ''
    try {
      if (gradeKey === 'all') {
        toast.loading('Generating authentic Class 3 to PG Final Year AI Olympiad curricula into database...', { id: 'seed' })
        const res = await curriculumCatalogService.seedAllLevels(orgId, userId)
        if (res.success) {
          toast.success(res.message, { id: 'seed' })
        } else {
          toast.error(res.message, { id: 'seed' })
        }
      } else {
        const spec = curriculumCatalogService.getAllSpecs().find(s => s.gradeKey === gradeKey)
        const name = spec?.name || gradeKey
        toast.loading(`Generating 6 chapters & 8-section Duolingo modules for ${name}...`, { id: 'seed' })
        const res = await curriculumCatalogService.seedLevelKey(orgId, gradeKey, userId)
        if (res.success) {
          toast.success(res.message, { id: 'seed' })
        } else {
          toast.error(res.message, { id: 'seed' })
        }
      }
      setSeedingModal(false)
      await loadInitial()
      if (selectedSubjectId) {
        await loadChapters()
      }
    } catch (err: any) {
      toast.error(`Seeding failed: ${err.message || 'Unknown error'}`, { id: 'seed' })
    } finally {
      setSeedingProgress(false)
    }
  }

  const filteredChapters = chapters.filter(c =>
    !chapterSearch ||
    c.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    c.chapter_number?.includes(chapterSearch)
  )

  const publishedChaptersCount = chapters.filter(c => c.status === 'published').length
  const totalSectionsCount = sections.length

  if (loading) return <AppLayout><LoadingState message="Loading Content Management Dashboard..." /></AppLayout>

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto fade-in">
        
        {/* ─── 1. CMS STUDIO HEADER & KPI METRICS BAR ─────────────────────────── */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-blue-500/30 mb-3">
                <Sliders size={13} />
                <span>Centralized Content Management Studio (CMS)</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Student Learning Content Manager</h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
                Add, edit, reorder, upload media, and publish all chapters, interactive video lessons, workbooks, assignments, and quiz assessments shown to students.
              </p>
            </div>

            {/* View Mode Switching Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 backdrop-blur-md overflow-x-auto max-w-full">
              <button
                onClick={() => setViewMode('curriculum')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  viewMode === 'curriculum'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FolderOpen size={14} />
                <span>Curriculum Editor</span>
              </button>
              <button
                onClick={() => setViewMode('visuals')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  viewMode === 'visuals'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ImageIcon size={14} className="text-amber-400" />
                <span>Lesson Images</span>
              </button>
              <button
                onClick={() => setViewMode('media')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  viewMode === 'media'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Upload size={14} />
                <span>Media Assets</span>
              </button>
              <button
                onClick={() => setViewMode('submissions')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative whitespace-nowrap ${
                  viewMode === 'submissions'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileCheck size={14} />
                <span>Submissions Queue</span>
                {pendingWorkbooks.filter(w => w.status === 'submitted').length > 0 && (
                  <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                    {pendingWorkbooks.filter(w => w.status === 'submitted').length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Total Chapters</p>
              <p className="text-2xl font-black text-white mt-1">{chapters.length}</p>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle size={12} /> {publishedChaptersCount} Live to Students
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Active Chapter Sections</p>
              <p className="text-2xl font-black text-blue-400 mt-1">{totalSectionsCount}</p>
              <p className="text-[11px] text-slate-400 mt-1">Lessons, videos, workbooks, quizzes</p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Pending Review</p>
              <p className="text-2xl font-black text-amber-400 mt-1">
                {pendingWorkbooks.filter(w => w.status === 'submitted').length}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Student submissions awaiting marks</p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Live Synchronization</p>
              <p className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Database Sync
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Updates immediately reflect on Student Page</p>
            </div>
          </div>
        </div>

        {/* ─── 1.5 VIEW: VISUAL & IMAGE PLACEMENT MANAGER ─────────────────────── */}
        {viewMode === 'visuals' && (
          <VisualImageManager />
        )}

        {/* ─── 2. VIEW 1: CURRICULUM & SECTIONS CMS WORKSPACE ──────────────────── */}
        {viewMode === 'curriculum' && (
          <div className="space-y-6">
            
            {/* Academic Class & Subject Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div className="w-64">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Academic Class / Level
                    </label>
                    <button
                      type="button"
                      onClick={() => setQuickClassModal({ open: true, name: '', code: '' })}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 hover:underline"
                    >
                      <Plus size={11} /> New Class
                    </button>
                  </div>
                  <select
                    value={selectedClassId}
                    onChange={e => setSelectedClassId(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="w-64">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Select Subject
                    </label>
                    <button
                      type="button"
                      onClick={() => setQuickSubjectModal({ open: true, name: '', code: '' })}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 hover:underline"
                    >
                      <Plus size={11} /> New Subject
                    </button>
                  </div>
                  <select
                    value={selectedSubjectId}
                    onChange={e => setSelectedSubjectId(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Search Chapters
                  </label>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter by chapter title or number..."
                      value={chapterSearch}
                      onChange={e => setChapterSearch(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-4">
                <Button
                  onClick={() => setSeedingModal(true)}
                  variant="secondary"
                  size="md"
                  icon={<Sparkles size={14} className="text-amber-500" />}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-900 font-bold hover:bg-amber-100 shadow-sm"
                >
                  ⚡ Generate Curricula (Class 3 to PG)
                </Button>

                <Button onClick={openCreateChapter} icon={<Plus size={14} />} className="shadow-sm">
                  Add Chapter
                </Button>
              </div>
            </div>

            {/* Split Management Workspace: Chapters on Left, Sections on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Chapters Table & Ordering */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Chapters Directory ({filteredChapters.length})
                      </h2>
                      <p className="text-xs text-slate-400">Click a chapter to edit its learning content</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                    {filteredChapters.map((chap, idx) => {
                      const isSelected = selectedChapter?.id === chap.id
                      return (
                        <div
                          key={chap.id}
                          onClick={() => setSelectedChapter(chap)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                              : 'border-slate-200/90 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                                Ch.{chap.chapter_number || idx + 1}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                chap.status === 'published' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {chap.status}
                              </span>
                            </div>

                            {/* Move Up / Down Buttons for Chapter Reordering */}
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => handleMoveChapter(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                                title="Move Chapter Up"
                              >
                                <ArrowUp size={13} />
                              </button>
                              <button
                                onClick={() => handleMoveChapter(idx, 'down')}
                                disabled={idx === chapters.length - 1}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                                title="Move Chapter Down"
                              >
                                <ArrowDown size={13} />
                              </button>
                            </div>
                          </div>

                          <h3 className="font-bold text-xs text-slate-900 mt-2 line-clamp-1">
                            {chap.title}
                          </h3>

                          {chap.short_description && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {chap.short_description}
                            </p>
                          )}

                          {/* Action Toolbar */}
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100/80" onClick={e => e.stopPropagation()}>
                            <span className="text-[11px]">{chap.estimated_duration || 30} mins</span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleToggleChapterStatus(chap)}
                                className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                                  chap.status === 'published'
                                    ? 'text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100'
                                    : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                                }`}
                                title="Toggle Live Publication"
                              >
                                {chap.status === 'published' ? 'Unpublish' : 'Publish'}
                              </button>

                              <button
                                onClick={() => openEditChapter(chap)}
                                className="p-1 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                                title="Edit Chapter Details"
                              >
                                <Edit size={13} />
                              </button>

                              <Link
                                to={`/student/learning/${chap.id}`}
                                target="_blank"
                                className="p-1 text-slate-500 hover:text-emerald-600 rounded hover:bg-slate-100"
                                title="Live Preview on Student Learning Page"
                              >
                                <Eye size={13} />
                              </Link>

                              <button
                                onClick={() => setDeleteChapterConfirm({ open: true, chapter: chap })}
                                className="p-1 text-slate-500 hover:text-red-600 rounded hover:bg-slate-100"
                                title="Delete Chapter"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {filteredChapters.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-8">
                        No chapters found. Click "+ Add New Chapter" to create one.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: In-Depth Section Authoring Studio */}
              <div className="lg:col-span-7 space-y-6">
                {selectedChapter ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                    
                    {/* Active Chapter Header Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                            Chapter {selectedChapter.chapter_number}
                          </span>
                          <h2 className="text-base font-bold text-slate-900">{selectedChapter.title}</h2>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {selectedChapter.short_description || 'Manage educational sections, media, activities, and quizzes.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/student/learning/${selectedChapter.id}`} target="_blank">
                          <Button variant="outline" size="sm" icon={<ExternalLink size={13} />}>
                            Preview Student Page
                          </Button>
                        </Link>
                        <Button onClick={() => setSectionModal(true)} size="sm" icon={<Plus size={13} />}>
                          Add Section
                        </Button>
                      </div>
                    </div>

                    {/* Section Horizontal Reordering Tabs */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Chapter Learning Sections ({sections.length})
                      </label>
                      
                      <div className="space-y-2">
                        {sections.map((sec, idx) => {
                          const isSecActive = activeSection?.id === sec.id
                          return (
                            <div
                              key={sec.id}
                              onClick={() => setActiveSection(sec)}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                isSecActive
                                  ? 'bg-blue-50 border-blue-500 shadow-sm'
                                  : 'border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleMoveSection(idx, 'up')}
                                    disabled={idx === 0}
                                    className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                                    title="Move Section Up"
                                  >
                                    <ArrowUp size={12} />
                                  </button>
                                  <button
                                    onClick={() => handleMoveSection(idx, 'down')}
                                    disabled={idx === sections.length - 1}
                                    className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                                    title="Move Section Down"
                                  >
                                    <ArrowDown size={12} />
                                  </button>
                                </div>

                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                                  <ContentTypeIcon type={sec.content_type} size={15} />
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-900 truncate">
                                      #{idx + 1} {sec.title}
                                    </span>
                                    <ContentTypeBadge type={sec.content_type} />
                                  </div>
                                  {sec.description && (
                                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{sec.description}</p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => handleToggleSectionStatus(sec)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                    sec.status === 'published'
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                      : 'bg-slate-100 text-slate-600 border-slate-200'
                                  }`}
                                  title="Toggle Section Published Status"
                                >
                                  {sec.status}
                                </button>

                                <button
                                  onClick={() => setDeleteSectionConfirm({ open: true, section: sec })}
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                                  title="Delete Section"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          )
                        })}

                        {sections.length === 0 && (
                          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                            <p className="text-xs">This chapter has no learning sections yet.</p>
                            <Button size="sm" onClick={() => setSectionModal(true)} icon={<Plus size={13} />} className="mt-3">
                              Add First Section
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active Section In-Depth Editor */}
                    {activeSection && (
                      <div className="pt-4 border-t border-slate-200 space-y-4">
                        <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2">
                            <ContentTypeIcon type={activeSection.content_type} size={16} />
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                              Editing {activeSection.content_type.toUpperCase()}: {activeSection.title}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">Auto-saves to database</span>
                        </div>

                        {/* 1. LESSON EDITOR */}
                        {activeSection.content_type === 'lesson' && (
                          <LessonSectionEditor
                            section={activeSection}
                            chapter={selectedChapter}
                            className={classes.find(c => c.id === selectedClassId)?.name || 'Class 3'}
                            orgId={orgId}
                            onSave={loadSections}
                          />
                        )}

                        {/* 2. VIDEO EDITOR */}
                        {activeSection.content_type === 'video' && (
                          <VideoSectionEditor section={activeSection} orgId={orgId} onSave={loadSections} />
                        )}

                        {/* 3. WORKBOOK / WORKSHEET EDITOR */}
                        {activeSection.content_type === 'worksheet' && (
                          <WorkbookSectionEditor section={activeSection} orgId={orgId} onSave={loadSections} />
                        )}

                        {/* 4. ACTIVITY EDITOR */}
                        {activeSection.content_type === 'activity' && (
                          <ActivitySectionEditor section={activeSection} onSave={loadSections} />
                        )}

                        {/* 5. ASSIGNMENT EDITOR */}
                        {activeSection.content_type === 'assignment' && (
                          <AssignmentSectionEditor section={activeSection} onSave={loadSections} />
                        )}

                        {/* 6. QUIZ & QUESTIONS BANK */}
                        {activeSection.content_type === 'quiz' && (
                          <div className="space-y-6">
                            <QuizSectionEditor section={activeSection} onSave={loadSections} />

                            {/* Quiz Questions Bank Management */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <HelpCircle size={15} className="text-blue-600" />
                                    <span>Questions Bank ({quizQuestions.length})</span>
                                  </h4>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    Questions presented to students during this chapter assessment.
                                  </p>
                                </div>
                                <Button size="sm" onClick={() => setQuestionModal(true)} icon={<Plus size={13} />}>
                                  Add Question
                                </Button>
                              </div>

                              <div className="space-y-3">
                                {quizQuestions.map((qq, idx) => {
                                  const q: Question = qq.question
                                  return (
                                    <div key={qq.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-bold text-xs text-blue-600 font-mono">Q{idx + 1}</span>
                                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded uppercase">
                                            {q.question_type}
                                          </span>
                                          <span className="text-xs text-slate-400">· {q.marks || 1} mark(s)</span>
                                        </div>
                                        <p className="font-semibold text-xs text-slate-800">{q.question}</p>
                                        
                                        {q.options && q.options.length > 0 && (
                                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            {q.options.map((opt: any) => (
                                              <div key={opt.id} className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                                                opt.is_correct ? 'bg-emerald-50 border-emerald-200 font-bold text-emerald-800' : 'border-slate-100'
                                              }`}>
                                                {opt.is_correct ? '✓' : '•'} {opt.option_text}
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>

                                      <button
                                        onClick={() => handleDeleteQuestion(qq.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                                        title="Delete Question"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  )
                                })}

                                {quizQuestions.length === 0 && (
                                  <p className="text-xs text-slate-400 text-center py-4">
                                    No questions in this quiz. Click "+ Add Question" to create questions.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 7. RESOURCE EDITOR */}
                        {activeSection.content_type === 'resource' && (
                          <ResourceSectionEditor section={activeSection} onSave={loadSections} />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Select a chapter on the left to manage its educational learning sections.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── 3. VIEW 2: MEDIA & EDUCATIONAL IMAGE ASSETS ────────────────────── */}
        {viewMode === 'media' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload size={18} className="text-blue-600" />
                  <span>Media Assets & Diagram Library</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload learning images, diagrams, and educational assets. Copy CDN URLs to embed directly inside lesson texts.
                </p>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
                  <Upload size={14} />
                  <span>{uploadingImage ? 'Uploading to Storage...' : 'Upload Image Asset'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImage}
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadedImages.map((img, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2 group">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200/80">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 truncate">{img.name}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => handleCopyUrl(img.url)}
                    icon={copiedUrl === img.url ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  >
                    {copiedUrl === img.url ? 'Copied URL!' : 'Copy Image Link'}
                  </Button>
                </div>
              ))}

              {uploadedImages.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400">
                  <p className="text-xs">No media uploaded in this session. Click "Upload Image Asset" to store assets permanently.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── 4. VIEW 3: STUDENT SUBMISSIONS & GRADING QUEUE ─────────────────── */}
        {viewMode === 'submissions' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck size={18} className="text-blue-600" />
                <span>Student Submissions & Evaluation Queue</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and evaluate student workbook responses and assignment tasks. Provide feedback and marks.
              </p>
            </div>

            {pendingWorkbooks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Workbook Section</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Submission Date</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingWorkbooks.map((sub: any) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{sub.student?.full_name || 'Student'}</td>
                        <td className="p-3 text-slate-700">{sub.chapter_content?.title || 'Interactive Workbook'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'reviewed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {sub.status || 'submitted'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{new Date(sub.submitted_at || sub.created_at).toLocaleDateString()}</td>
                        <td className="p-3 text-right">
                          <Button
                            size="sm"
                            onClick={() => {
                              setGradingModal({ open: true, item: sub })
                              setFeedbackText(sub.feedback || '')
                            }}
                          >
                            {sub.status === 'reviewed' ? 'Edit Feedback' : 'Grade & Feedback'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">No student submissions pending review.</p>
            )}
          </div>
        )}

        {/* ─── MODALS & CMS DIALOGS ─────────────────────────────────────────── */}

        {/* Chapter Modal */}
        <Modal
          open={chapterModal.open}
          onClose={() => setChapterModal({ open: false })}
          title={chapterModal.editing ? 'Edit Chapter Metadata' : 'Add New Chapter'}
        >
          <div className="p-6 space-y-4">
            <Input
              label="Chapter Title *"
              placeholder="e.g. AI DISCOVER: Meet My AI Friend"
              value={chapterForm.title}
              onChange={e => setChapterForm(f => ({ ...f, title: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Chapter Number"
                type="text"
                value={chapterForm.chapter_number}
                onChange={e => setChapterForm(f => ({ ...f, chapter_number: e.target.value }))}
              />
              <Input
                label="Duration (Mins)"
                type="number"
                value={chapterForm.estimated_duration}
                onChange={e => setChapterForm(f => ({ ...f, estimated_duration: parseInt(e.target.value) || 30 }))}
              />
            </div>
            <Input
              label="Short Tagline"
              placeholder="Brief summary for curriculum cards..."
              value={chapterForm.short_description}
              onChange={e => setChapterForm(f => ({ ...f, short_description: e.target.value }))}
            />
            <Textarea
              label="Full Description (optional)"
              rows={3}
              value={chapterForm.description}
              onChange={e => setChapterForm(f => ({ ...f, description: e.target.value }))}
            />
            <Select
              label="Status"
              options={[
                { value: 'published', label: 'Published (Live to Students)' },
                { value: 'draft', label: 'Draft (Hidden from Students)' },
              ]}
              value={chapterForm.status}
              onChange={e => setChapterForm(f => ({ ...f, status: e.target.value as any }))}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setChapterModal({ open: false })}>Cancel</Button>
              <Button onClick={handleSaveChapter} loading={savingChapter}>
                {chapterModal.editing ? 'Save Changes' : 'Create Chapter'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Chapter Confirm */}
        <ConfirmDialog
          open={deleteChapterConfirm.open}
          onCancel={() => setDeleteChapterConfirm({ open: false })}
          onConfirm={handleDeleteChapter}
          title="Delete Chapter"
          message={`Are you sure you want to delete chapter "${deleteChapterConfirm.chapter?.title}"? All sections, lessons, quizzes, and workbooks in this chapter will be permanently removed.`}
          confirmLabel="Delete Chapter"
          danger={true}
        />

        {/* Section Create Modal */}
        <Modal
          open={sectionModal}
          onClose={() => setSectionModal(false)}
          title="Add New Section to Chapter"
        >
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Section Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CONTENT_TYPES.map(t => {
                  const isSel = newSectionType === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewSectionType(t)}
                      className={`p-3 rounded-xl border text-xs font-bold capitalize flex flex-col items-center gap-1.5 transition-all ${
                        isSel ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <ContentTypeIcon type={t} size={18} />
                      <span>{t}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <Input
              label="Section Title *"
              placeholder="e.g. AI Video Walkthrough / Hands-on Lab"
              value={newSectionTitle}
              onChange={e => setNewSectionTitle(e.target.value)}
            />
            <Textarea
              label="Description / Brief"
              rows={2}
              placeholder="Summary of what the student will learn..."
              value={newSectionDesc}
              onChange={e => setNewSectionDesc(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sec_req_cms"
                checked={newSectionRequired}
                onChange={e => setNewSectionRequired(e.target.checked)}
                className="rounded text-blue-600"
              />
              <label htmlFor="sec_req_cms" className="text-xs font-semibold text-slate-700">Required for curriculum completion</label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setSectionModal(false)}>Cancel</Button>
              <Button onClick={handleAddSection} loading={savingSection}>Create Section</Button>
            </div>
          </div>
        </Modal>

        {/* Delete Section Confirm */}
        <ConfirmDialog
          open={deleteSectionConfirm.open}
          onCancel={() => setDeleteSectionConfirm({ open: false })}
          onConfirm={handleDeleteSection}
          title="Delete Section"
          message={`Are you sure you want to delete section "${deleteSectionConfirm.section?.title}"?`}
          confirmLabel="Delete Section"
          danger={true}
        />

        {/* Add Question Modal */}
        <Modal
          open={questionModal}
          onClose={() => setQuestionModal(false)}
          title="Add Question to Quiz"
        >
          <div className="p-6 space-y-4">
            <Textarea
              label="Question Text *"
              rows={3}
              placeholder="Type the question here..."
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Question Type"
                options={[
                  { value: 'mcq', label: 'Single Choice (MCQ)' },
                  { value: 'multiple_select', label: 'Multiple Choice' },
                  { value: 'true_false', label: 'True / False' },
                  { value: 'short_answer', label: 'Short Answer' },
                ]}
                value={questionType}
                onChange={e => setQuestionType(e.target.value as any)}
              />
              <Input
                label="Marks"
                type="number"
                value={questionMarks}
                onChange={e => setQuestionMarks(parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Options */}
            {(questionType === 'mcq' || questionType === 'multiple_select' || questionType === 'true_false') && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Answer Options & Correct Answer</label>
                {questionOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type={questionType === 'multiple_select' ? 'checkbox' : 'radio'}
                      name="correct_opt_cms"
                      checked={opt.isCorrect}
                      onChange={() => {
                        if (questionType === 'multiple_select') {
                          setQuestionOptions(opts => opts.map((o, idx) => idx === i ? { ...o, isCorrect: !o.isCorrect } : o))
                        } else {
                          setQuestionOptions(opts => opts.map((o, idx) => ({ ...o, isCorrect: idx === i })))
                        }
                      }}
                      className="text-blue-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      className="flex-1 h-9 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={opt.text}
                      onChange={e => {
                        const val = e.target.value
                        setQuestionOptions(opts => opts.map((o, idx) => idx === i ? { ...o, text: val } : o))
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setQuestionModal(false)}>Cancel</Button>
              <Button onClick={handleAddQuestion} loading={savingQuestion}>Add Question</Button>
            </div>
          </div>
        </Modal>

        {/* Student Submission Review Modal */}
        <Modal
          open={gradingModal.open}
          onClose={() => setGradingModal({ open: false })}
          title="Review Student Submission"
        >
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Responses:</p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-1.5 space-y-2 text-xs text-slate-800 max-h-60 overflow-y-auto leading-relaxed">
                {gradingModal.item?.responses ? (
                  Object.entries(gradingModal.item.responses).map(([k, v]) => (
                    <div key={k} className="border-b border-slate-200 pb-2">
                      <strong className="capitalize text-slate-900">{k.replace('_', ' ')}:</strong>
                      <p className="mt-0.5 text-slate-700">{String(v)}</p>
                    </div>
                  ))
                ) : (
                  <p>No response content found.</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instructor Feedback & Comments
              </label>
              <textarea
                rows={4}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write constructive review feedback for the student..."
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setGradingModal({ open: false })}>Cancel</Button>
              <Button onClick={handleSaveFeedback} loading={savingFeedback}>Save Feedback & Mark Reviewed</Button>
            </div>
          </div>
        </Modal>

        {/* Quick Class Modal */}
        <Modal
          open={quickClassModal.open}
          onClose={() => setQuickClassModal({ open: false, name: '', code: '' })}
          title="Add New Academic Class / Level"
        >
          <div className="p-6 space-y-4">
            <Input
              label="Class / Grade Name *"
              placeholder="e.g. Class 3, Class 6, Class 10, PG - AI/ML"
              value={quickClassModal.name}
              onChange={e => setQuickClassModal(s => ({ ...s, name: e.target.value }))}
            />
            <Input
              label="Class Code (Optional)"
              placeholder="e.g. CLS-03, CLS-10, PG-AIML"
              value={quickClassModal.code}
              onChange={e => setQuickClassModal(s => ({ ...s, code: e.target.value }))}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setQuickClassModal({ open: false, name: '', code: '' })}>Cancel</Button>
              <Button onClick={handleCreateQuickClass} loading={savingQuick}>Create Academic Level</Button>
            </div>
          </div>
        </Modal>

        {/* Quick Subject Modal */}
        <Modal
          open={quickSubjectModal.open}
          onClose={() => setQuickSubjectModal({ open: false, name: '', code: '' })}
          title="Add New Subject"
        >
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500">
              Adding subject to currently selected class:{' '}
              <strong className="text-slate-800">
                {classes.find(c => c.id === selectedClassId)?.name || 'Select Class'}
              </strong>
            </p>
            <Input
              label="Subject Name *"
              placeholder="e.g. Environmental Science, Physics, Artificial Intelligence"
              value={quickSubjectModal.name}
              onChange={e => setQuickSubjectModal(s => ({ ...s, name: e.target.value }))}
            />
            <Input
              label="Subject Code (Optional)"
              placeholder="e.g. SCI-301, PHY-601, AI-901"
              value={quickSubjectModal.code}
              onChange={e => setQuickSubjectModal(s => ({ ...s, code: e.target.value }))}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setQuickSubjectModal({ open: false, name: '', code: '' })}>Cancel</Button>
              <Button onClick={handleCreateQuickSubject} loading={savingQuick}>Create Subject</Button>
            </div>
          </div>
        </Modal>

        {/* Multi-tier Academic Curriculum Generator Modal */}
        <Modal
          open={seedingModal}
          onClose={() => !seedingProgress && setSeedingModal(false)}
          title="⚡ Generate 6-Month AI Olympiad Curricula (Class 3 to PG Final Year)"
        >
          <div className="p-6 space-y-5">
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate complete, age-appropriate 6-month AI Olympiad curricula (6 Chapters: <strong>AI DISCOVER, AI CONNECT, AI SOLVE, AI RISE, AI CREATE, AI CARE</strong>) with full 8-section Duolingo modules (Video Briefing, Lessons, Visuals, Interactive Workbook, Olympiad Flashcards, Practical Lab & Observation Sandbox, Graded Assignment & Mastery Quiz).
            </p>

            {/* Tier Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'all', label: 'All 16 Grades' },
                { id: 'primary', label: 'Primary (Class 3–5)' },
                { id: 'middle', label: 'Middle (Class 6–8)' },
                { id: 'secondary', label: 'Secondary (Class 9–12)' },
                { id: 'ug', label: 'Undergraduate (UG 1–4)' },
                { id: 'pg', label: 'Postgraduate (PG 1–2)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSeedTierFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    seedTierFilter === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List of 16 Specs */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {curriculumCatalogService.getAllSpecs()
                .filter(s => seedTierFilter === 'all' || s.tier === seedTierFilter)
                .map(spec => (
                  <div
                    key={spec.gradeKey}
                    onClick={() => !seedingProgress && handleSeedCurriculum(spec.gradeKey)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          spec.tier === 'primary' ? 'bg-emerald-100 text-emerald-800' :
                          spec.tier === 'middle' ? 'bg-blue-100 text-blue-800' :
                          spec.tier === 'secondary' ? 'bg-purple-100 text-purple-800' :
                          spec.tier === 'ug' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {spec.tier.toUpperCase()}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {spec.name} ({spec.age})
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        Ch 1: {spec.c1[0]} &bull; Ch 2: {spec.c2[0]} &bull; Ch 3: {spec.c3[0]}
                      </p>
                    </div>
                    <Button size="sm" variant="secondary" loading={seedingProgress} className="flex-shrink-0">
                      Generate
                    </Button>
                  </div>
                ))}
            </div>

            {/* Mass Seeder Button */}
            <div className="pt-2 border-t border-slate-200">
              <Button
                onClick={() => !seedingProgress && handleSeedCurriculum('all')}
                loading={seedingProgress}
                className="w-full justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-3 text-sm shadow-md hover:opacity-95"
                icon={<Sparkles size={16} />}
              >
                ⚡ Generate All 16 AI Olympiad Curricula Simultaneously
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  )
}

// ─── CMS IN-PLACE SECTION EDITORS ─────────────────────────────────────────────

function LessonSectionEditor({
  section,
  chapter,
  className = 'Class 3',
  orgId,
  onSave,
}: {
  section: ChapterContent
  chapter?: Chapter | null
  className?: string
  orgId: string
  onSave: () => void
}) {
  const [content, setContent] = useState(section.lesson?.content || '')
  const [duration, setDuration] = useState(section.lesson?.estimated_duration || 15)
  const [sectionImage, setSectionImage] = useState<string>(() => {
    try {
      return localStorage.getItem(`cms_section_media_${section.id}`) || ''
    } catch {
      return ''
    }
  })
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGraphic, setUploadingGraphic] = useState(false)
  const [assetPickerOpen, setAssetPickerOpen] = useState(false)

  // Sync state when active section changes
  useEffect(() => {
    setContent(section.lesson?.content || '')
    setDuration(section.lesson?.estimated_duration || 15)
    try {
      setSectionImage(localStorage.getItem(`cms_section_media_${section.id}`) || '')
    } catch {}
  }, [section.id, section.lesson?.content, section.lesson?.estimated_duration])

  // Detect if current content is an empty state or legacy placeholder
  const isLegacy =
    content.includes('content-image-placeholder') ||
    content.includes('Upload process charts') ||
    content.includes('Write your detailed lesson content here') ||
    content.trim().length === 0

  const handleLoadOfficialContent = () => {
    const isSecondLesson = section.display_order >= 2 || section.title.toLowerCase().includes('lesson 2')
    const cat = curriculumCatalogService.getCurriculumChapterContent(
      className || 'class3',
      chapter?.chapter_number || '1'
    )
    const officialNotes = isSecondLesson ? cat.lesson2Content : cat.lesson1Content
    setContent(officialNotes)
    toast.success(`Loaded authentic topic-specific notes for "${isSecondLesson ? cat.topic2 : cat.topic1}"!`)
  }

  // Load available assets
  const availableImages = (() => {
    try {
      const stored = localStorage.getItem('cms_uploaded_media')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })()

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const url = await storageService.uploadImage(file, orgId)
      const imgTag = `<p><img src="${url}" alt="${file.name}" style="max-width: 100%; border-radius: 12px; margin: 16px 0;" /></p>`
      setContent(prev => prev + imgTag)
      toast.success('Image uploaded and inserted into lesson content!')
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSectionGraphicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingGraphic(true)
    try {
      const url = await storageService.uploadImage(file, orgId)
      setSectionImage(url)
      try {
        localStorage.setItem(`cms_section_media_${section.id}`, url)
        window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, imageUrl: url } }))
      } catch {}
      toast.success('Section graphic assigned and saved! ✓')
    } catch {
      toast.error('Failed to upload graphic')
    } finally {
      setUploadingGraphic(false)
    }
  }

  const handleSelectAssetForGraphic = (url: string) => {
    setSectionImage(url)
    try {
      localStorage.setItem(`cms_section_media_${section.id}`, url)
      window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, imageUrl: url } }))
    } catch {}
    setAssetPickerOpen(false)
    toast.success('Asset assigned as section diagram! Reflects on Student Page ✓')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await lessonService.upsert({
        chapter_content_id: section.id,
        content,
        estimated_duration: duration,
      })
      try {
        if (sectionImage) {
          localStorage.setItem(`cms_section_media_${section.id}`, sectionImage)
        } else {
          localStorage.removeItem(`cms_section_media_${section.id}`)
        }
        window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, imageUrl: sectionImage } }))
      } catch {}
      toast.success('Lesson updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save lesson')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Legacy Placeholder Alert */}
      {isLegacy && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs text-amber-900 font-medium">
            ⚠️ <strong>Placeholder or Empty Content Detected:</strong> Click below to load authentic, topic-specific curriculum notes for this lesson.
          </div>
          <Button size="sm" variant="outline" onClick={handleLoadOfficialContent} icon={<Sparkles size={13} className="text-amber-600" />}>
            Load Authentic Notes
          </Button>
        </div>
      )}

      {/* Section Concept Diagram Assignment Panel */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>🖼️ Section Concept Graphic / Diagram (Displayed to Students)</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Only images assigned by Content Manager will appear on the student lesson page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => setAssetPickerOpen(prev => !prev)}
            >
              {assetPickerOpen ? 'Close Library' : 'Pick from Asset Library'}
            </Button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
              <Upload size={13} />
              <span>{uploadingGraphic ? 'Uploading...' : 'Upload Diagram'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSectionGraphicUpload}
                disabled={uploadingGraphic}
              />
            </label>
          </div>
        </div>

        {/* Direct Image URL input */}
        <div className="flex gap-2">
          <Input
            placeholder="Or enter direct image URL (https://...)"
            value={sectionImage}
            onChange={e => {
              setSectionImage(e.target.value)
              try {
                localStorage.setItem(`cms_section_media_${section.id}`, e.target.value)
              } catch {}
            }}
          />
          {sectionImage && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-rose-600 hover:text-rose-700"
              onClick={() => {
                setSectionImage('')
                try {
                  localStorage.removeItem(`cms_section_media_${section.id}`)
                  window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, imageUrl: '' } }))
                } catch {}
                toast.success('Section graphic removed.')
              }}
            >
              Remove
            </Button>
          )}
        </div>

        {/* Asset Library Picker Grid Drawer */}
        {assetPickerOpen && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Select an Asset from Media Library:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              {availableImages.map((img: { url: string; name: string }, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectAssetForGraphic(img.url)}
                  className={`border rounded-lg p-1 transition-all overflow-hidden group text-left ${
                    sectionImage === img.url ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-14 object-cover rounded group-hover:scale-105 transition-transform" />
                  <p className="text-[10px] font-medium text-slate-700 truncate mt-1">{img.name}</p>
                </button>
              ))}
              {availableImages.length === 0 && (
                <p className="col-span-full text-xs text-slate-400 py-3 text-center">No images in library yet. Click "Upload Diagram" above.</p>
              )}
            </div>
          </div>
        )}

        {/* Live Graphic Preview */}
        {sectionImage && (
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200">
            <img src={sectionImage} alt="Assigned Graphic" className="w-16 h-16 object-cover rounded-lg border border-slate-100" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Assigned Graphic Active
              </span>
              <p className="text-xs text-slate-500 truncate mt-1">{sectionImage}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lesson Rich Content Editor</label>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Button size="sm" variant="outline" onClick={handleLoadOfficialContent} icon={<Sparkles size={13} className="text-blue-600" />}>
            Load Syllabus Notes
          </Button>

          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold cursor-pointer border border-blue-200 transition-colors">
            <Upload size={13} />
            <span>{uploadingImage ? 'Uploading...' : 'Insert Inline Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInlineImageUpload}
              disabled={uploadingImage}
            />
          </label>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Est. Read Time:</span>
            <input
              type="number"
              className="w-16 h-8 px-2 text-xs border border-slate-300 rounded-lg"
              value={duration}
              onChange={e => setDuration(parseInt(e.target.value) || 10)}
            />
            <span className="text-xs text-slate-400">mins</span>
          </div>
        </div>
      </div>

      <RichTextEditor content={content} onChange={setContent} />

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving} size="lg">Save Lesson Changes</Button>
      </div>
    </div>
  )
}

function VideoSectionEditor({ section, orgId, onSave }: { section: ChapterContent; orgId: string; onSave: () => void }) {
  const [videoUrl, setVideoUrl] = useState(section.video?.video_url || '')
  const [desc, setDesc] = useState(section.video?.description || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Keep state synchronized when section changes
  useEffect(() => {
    setVideoUrl(section.video?.video_url || '')
    setDesc(section.video?.description || '')
  }, [section.id, section.video?.video_url, section.video?.description])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await storageService.uploadVideo(file, orgId)
      setVideoUrl(url)
      // Auto-save immediately to database and local store so video is immediately visible on student page
      await videoService.upsert({
        chapter_content_id: section.id,
        organization_id: orgId,
        video_url: url,
        description: desc,
      })
      try {
        localStorage.setItem(`cms_section_video_${section.id}`, url)
        window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, videoUrl: url } }))
      } catch {}
      toast.success('Video uploaded and saved! Visible on Student Page ✓')
      onSave()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await videoService.upsert({
        chapter_content_id: section.id,
        organization_id: orgId,
        video_url: videoUrl,
        description: desc,
      })
      try {
        if (videoUrl) {
          localStorage.setItem(`cms_section_video_${section.id}`, videoUrl)
        } else {
          localStorage.removeItem(`cms_section_video_${section.id}`)
        }
        window.dispatchEvent(new CustomEvent('cms_content_updated', { detail: { sectionId: section.id, videoUrl } }))
      } catch {}
      toast.success('Video updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save video')
    } finally {
      setSaving(false)
    }
  }

  const previewInfo = formatVideoUrl(videoUrl)

  return (
    <div className="space-y-4">
      <Input
        label="Video Stream URL (Direct MP4, YouTube, Vimeo, or Hosted Video)"
        placeholder="https://... or upload a video file below"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
      />

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Or Direct Upload Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          disabled={uploading}
          className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        {uploading && <p className="text-xs text-blue-600 mt-1 font-semibold animate-pulse">Uploading video file to storage and publishing...</p>}
      </div>

      {/* Live Video Player Preview */}
      {videoUrl && (
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Eye size={13} className="text-blue-400" />
            <span>Interactive Video Player Preview (As Seen by Students)</span>
          </p>
          <div className="rounded-xl overflow-hidden max-h-72 bg-black flex items-center justify-center">
            {previewInfo.isEmbed ? (
              <iframe
                src={previewInfo.embedUrl}
                title="Video Preview"
                className="w-full aspect-video min-h-[240px] max-h-72 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : previewInfo.directUrl ? (
              <video
                src={previewInfo.directUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full max-h-72 object-contain"
              />
            ) : null}
          </div>
        </div>
      )}

      <Textarea
        label="Video Key Takeaways & Educational Summary"
        rows={3}
        placeholder="Key summary points for students..."
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving} size="lg">Save Video Section</Button>
      </div>
    </div>
  )
}

function WorkbookSectionEditor({ section, orgId, onSave }: { section: ChapterContent; orgId: string; onSave: () => void }) {
  const [instructions, setInstructions] = useState(section.worksheet?.instructions || '')
  const [maxMarks, setMaxMarks] = useState(section.worksheet?.maximum_marks || 10)
  const [fileUrl, setFileUrl] = useState(section.worksheet?.file_url || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await storageService.uploadDocument(file, orgId)
      setFileUrl(url)
      toast.success('Worksheet document attached!')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await worksheetService.upsert({
        chapter_content_id: section.id,
        worksheet_type: 'interactive',
        instructions,
        maximum_marks: maxMarks,
        file_url: fileUrl,
      })
      toast.success('Workbook updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save workbook')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        label="Workbook Instructions & Exercise Brief"
        rows={4}
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Maximum Marks"
          type="number"
          value={maxMarks}
          onChange={e => setMaxMarks(parseInt(e.target.value) || 10)}
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Attach Reference PDF</label>
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {fileUrl && (
            <p className="text-xs text-emerald-600 mt-1">
              ✓ Attached: <a href={fileUrl} target="_blank" rel="noreferrer" className="underline font-semibold">View PDF</a>
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving} size="lg">Save Workbook Section</Button>
      </div>
    </div>
  )
}

function ActivitySectionEditor({ section, onSave }: { section: ChapterContent; onSave: () => void }) {
  const [instructions, setInstructions] = useState(section.activity?.instructions || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await activityService.upsert({
        chapter_content_id: section.id,
        instructions,
      })
      toast.success('Activity updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save activity')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        label="Hands-on Activity Steps & Simulation Tasks"
        rows={5}
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving} size="lg">Save Activity Changes</Button>
      </div>
    </div>
  )
}

function AssignmentSectionEditor({ section, onSave }: { section: ChapterContent; onSave: () => void }) {
  const [instructions, setInstructions] = useState(section.assignment?.instructions || '')
  const [maxMarks, setMaxMarks] = useState(section.assignment?.maximum_marks || 100)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await assignmentService.upsert({
        chapter_content_id: section.id,
        instructions,
        maximum_marks: maxMarks,
      })
      toast.success('Assignment updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save assignment')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        label="Assignment Problem Statement & Rubric Criteria"
        rows={5}
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />
      <Input
        label="Maximum Marks"
        type="number"
        value={maxMarks}
        onChange={e => setMaxMarks(parseInt(e.target.value) || 100)}
      />
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving} size="lg">Save Assignment Changes</Button>
      </div>
    </div>
  )
}

function QuizSectionEditor({ section, onSave }: { section: ChapterContent; onSave: () => void }) {
  const [passingPct, setPassingPct] = useState(section.quiz?.passing_percentage || 50)
  const [timeLimit, setTimeLimit] = useState(section.quiz?.time_limit || 15)
  const [maxAttempts, setMaxAttempts] = useState(section.quiz?.maximum_attempts || 3)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await quizService.upsert({
        chapter_content_id: section.id,
        passing_percentage: passingPct,
        time_limit: timeLimit,
        maximum_attempts: maxAttempts,
      })
      toast.success('Quiz rules updated! Automatically reflected on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save quiz rules')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quiz Rules & Evaluation Parameters</h4>
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Passing Percentage (%)"
          type="number"
          value={passingPct}
          onChange={e => setPassingPct(parseInt(e.target.value) || 50)}
        />
        <Input
          label="Time Limit (Minutes)"
          type="number"
          value={timeLimit}
          onChange={e => setTimeLimit(parseInt(e.target.value) || 15)}
        />
        <Input
          label="Maximum Attempts"
          type="number"
          value={maxAttempts}
          onChange={e => setMaxAttempts(parseInt(e.target.value) || 3)}
        />
      </div>
      <div className="flex justify-end pt-1">
        <Button onClick={handleSave} loading={saving}>Save Quiz Rules</Button>
      </div>
    </div>
  )
}

function ResourceSectionEditor({ section, onSave }: { section: ChapterContent; onSave: () => void }) {
  const [desc, setDesc] = useState(section.description || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await chapterContentService.update(section.id, {
        description: desc,
      })
      toast.success('Learning resource updated! Reflects on Student Page ✓')
      onSave()
    } catch {
      toast.error('Failed to save resource')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        label="Resource Details, Reference Links & Notes"
        rows={4}
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Provide documentation links, downloadable guide details, or instructions..."
      />
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} loading={saving}>Save Resource</Button>
      </div>
    </div>
  )
}
