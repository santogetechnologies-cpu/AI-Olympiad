import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  DragDropContext, Droppable, Draggable, type DropResult
} from '@hello-pangea/dnd'
import {
  GripVertical, Plus, Save, Globe, ArrowLeft,
  Trash2, Star, StarOff, Edit,
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Breadcrumbs } from '../../components/layout/Breadcrumbs'
import { Button, Modal, Input, Textarea, Select, Badge, LoadingState, EmptyState, ConfirmDialog } from '../../components/ui'
import { ContentTypeIcon, ContentTypeBadge, CONTENT_TYPE_CONFIG } from '../../components/content/ContentTypeIcon'
import { RichTextEditor } from '../../components/editor/RichTextEditor'
import { SectionImageEditor } from '../../components/content/SectionImageEditor'
import { chapterService } from '../../services/chapterService'
import { chapterContentService } from '../../services/chapterContentService'
import { videoService, lessonService, worksheetService, activityService, assignmentService, quizService, questionService } from '../../services/contentServices'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import { storageService } from '../../services/storageService'
import { formatVideoUrl } from '../../utils/mediaUtils'
import { auditService } from '../../services/analyticsService'
import type { Chapter, ChapterContent, ContentType, Question } from '../../types'
import toast from 'react-hot-toast'

const CONTENT_TYPES: ContentType[] = ['video', 'lesson', 'worksheet', 'activity', 'assignment', 'quiz', 'resource']


// ─── Video Editor ─────────────────────────────────────────────────────────────
function VideoEditor({ contentItem, orgId, onSave }: { contentItem: ChapterContent; orgId: string; onSave: () => void }) {
  const [videoUrl, setVideoUrl] = useState(contentItem.video?.video_url || '')
  const [description, setDescription] = useState(contentItem.video?.description || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Sync state with incoming contentItem changes
  useEffect(() => {
    setVideoUrl(contentItem.video?.video_url || '')
    setDescription(contentItem.video?.description || '')
  }, [contentItem.id, contentItem.video?.video_url, contentItem.video?.description])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await storageService.uploadVideo(file, orgId)
      setVideoUrl(url)
      // Auto-save immediately to database
      await videoService.upsert({
        chapter_content_id: contentItem.id,
        organization_id: orgId,
        video_url: url,
        description,
      })
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
        chapter_content_id: contentItem.id,
        organization_id: orgId,
        video_url: videoUrl,
        description,
      })
      toast.success('Video saved')
      onSave()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const previewInfo = formatVideoUrl(videoUrl)

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Video URL</label>
        <div className="flex gap-2">
          <input
            className="flex-1 h-9 px-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://... (YouTube, Vimeo, MP4) or upload below"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">Paste a video URL or upload a file below</p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Upload Video File</label>
        <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
          <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          <div className="text-center">
            {uploading ? (
              <p className="text-sm text-blue-600 font-medium animate-pulse">Uploading and publishing video...</p>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-700">Click to upload video</p>
                <p className="text-xs text-slate-400 mt-1">MP4, WebM, OGG supported</p>
              </>
            )}
          </div>
        </label>
      </div>

      {videoUrl && (
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Preview</label>
          <div className="rounded-xl overflow-hidden max-h-72 bg-black flex items-center justify-center">
            {previewInfo.isEmbed ? (
              <iframe
                src={previewInfo.embedUrl}
                title="Video Preview"
                className="w-full aspect-video min-h-[220px] max-h-72 border-0"
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

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="Video description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Video</Button>
    </div>
  )
}

// ─── Lesson Editor ────────────────────────────────────────────────────────────
function LessonEditor({ contentItem, chapter, onSave }: { contentItem: ChapterContent; chapter?: Chapter | null; onSave: () => void }) {
  const [content, setContent] = useState(contentItem.lesson?.content || '')
  const [estimatedDuration, setEstimatedDuration] = useState(contentItem.lesson?.estimated_duration?.toString() || '')
  const [saving, setSaving] = useState(false)

  // Detect if current content is an empty state or legacy placeholder
  const isLegacy =
    content.includes('content-image-placeholder') ||
    content.includes('Upload process charts') ||
    content.includes('Write your detailed lesson content here') ||
    content.trim().length === 0

  const handleLoadOfficialContent = () => {
    const isSecondLesson = contentItem.display_order >= 2 || contentItem.title.toLowerCase().includes('lesson 2')
    const cat = curriculumCatalogService.getCurriculumChapterContent(
      chapter?.subject?.class?.name || chapter?.subject?.class?.code || 'class3',
      chapter?.chapter_number || '1'
    )
    const officialNotes = isSecondLesson ? cat.lesson2Content : cat.lesson1Content
    setContent(officialNotes)
    toast.success(`Loaded authentic topic-specific notes for "${isSecondLesson ? cat.topic2 : cat.topic1}"!`)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await lessonService.upsert({
        chapter_content_id: contentItem.id,
        content,
        estimated_duration: estimatedDuration ? parseInt(estimatedDuration) : undefined,
      })
      toast.success('Lesson saved and reflected immediately on Student Page! ✓')
      onSave()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      {isLegacy && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs text-amber-900 font-medium">
            ⚠️ <strong>Placeholder Content Detected:</strong> Click below to load the authentic topic-specific curriculum notes for this lesson.
          </div>
          <Button size="sm" variant="outline" onClick={handleLoadOfficialContent} icon={<Sparkles size={13} className="text-amber-600" />}>
            Load Topic Notes
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Estimated duration (min)"
            className="w-48 h-9 px-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={estimatedDuration}
            onChange={e => setEstimatedDuration(e.target.value)}
          />
          <span className="text-sm text-slate-500">minutes</span>
        </div>

        <Button size="sm" variant="outline" onClick={handleLoadOfficialContent} icon={<Sparkles size={14} className="text-blue-600" />}>
          Load Official Syllabus Content
        </Button>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Lesson Educational Content & Theory</label>
        <RichTextEditor content={content} onChange={setContent} placeholder="Start writing your lesson content..." />
      </div>
      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Lesson Changes</Button>
    </div>
  )
}

// ─── Worksheet Editor ─────────────────────────────────────────────────────────
function WorksheetEditor({ contentItem, orgId, onSave }: { contentItem: ChapterContent; orgId: string; onSave: () => void }) {
  const ws = contentItem.worksheet
  const [instructions, setInstructions] = useState(ws?.instructions || '')
  const [fileUrl, setFileUrl] = useState(ws?.file_url || '')
  const [worksheetType, setWorksheetType] = useState(ws?.worksheet_type || 'pdf')
  const [maxMarks, setMaxMarks] = useState(ws?.maximum_marks?.toString() || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await storageService.uploadWorksheet(file, orgId)
      setFileUrl(url)
      toast.success('File uploaded!')
    } catch (err: unknown) { toast.error('Upload failed') } finally { setUploading(false) }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await worksheetService.upsert({
        chapter_content_id: contentItem.id,
        instructions, file_url: fileUrl,
        worksheet_type: worksheetType as 'pdf' | 'interactive',
        maximum_marks: maxMarks ? parseFloat(maxMarks) : undefined,
      })
      toast.success('Worksheet saved')
      onSave()
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Save failed') } finally { setSaving(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Select
          label="Type"
          options={[{ value: 'pdf', label: 'PDF Worksheet' }, { value: 'interactive', label: 'Interactive' }]}
          value={worksheetType}
          onChange={e => setWorksheetType(e.target.value as 'pdf' | 'interactive')}
        />
        <Input label="Maximum Marks" type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} className="w-36" />
      </div>
      <Textarea label="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Instructions for students..." rows={3} />
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Upload PDF Worksheet</label>
        <label className="flex items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
          <div className="text-center">
            {uploading ? <p className="text-sm text-blue-600">Uploading...</p> : (
              <><p className="text-sm font-medium text-slate-700">Upload PDF</p><p className="text-xs text-slate-400 mt-1">PDF files only</p></>
            )}
          </div>
        </label>
        {fileUrl && <p className="text-xs text-green-600 mt-1">✓ File uploaded: <a href={fileUrl} target="_blank" rel="noreferrer" className="underline">View</a></p>}
      </div>
      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Worksheet</Button>
    </div>
  )
}

// ─── Assignment Editor ────────────────────────────────────────────────────────
function AssignmentEditor({ contentItem, onSave }: { contentItem: ChapterContent; onSave: () => void }) {
  const asgn = contentItem.assignment
  const [instructions, setInstructions] = useState(asgn?.instructions || '')
  const [maxMarks, setMaxMarks] = useState(asgn?.maximum_marks?.toString() || '')
  const [dueDate, setDueDate] = useState(asgn?.due_date?.slice(0, 16) || '')
  const [maxAttempts, setMaxAttempts] = useState(asgn?.maximum_attempts?.toString() || '1')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await assignmentService.upsert({
        chapter_content_id: contentItem.id,
        instructions,
        maximum_marks: maxMarks ? parseFloat(maxMarks) : undefined,
        due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
        maximum_attempts: parseInt(maxAttempts),
      })
      toast.success('Assignment saved')
      onSave()
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Save failed') } finally { setSaving(false) }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Maximum Marks" type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} />
        <Input label="Max Attempts" type="number" value={maxAttempts} onChange={e => setMaxAttempts(e.target.value)} />
      </div>
      <Input label="Due Date (Optional)" type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <Textarea label="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Assignment instructions..." rows={5} />
      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Assignment</Button>
    </div>
  )
}

// ─── Quiz Editor ──────────────────────────────────────────────────────────────
function QuizEditor({ contentItem, orgId, onSave }: { contentItem: ChapterContent; orgId: string; onSave: () => void }) {
  const qz = contentItem.quiz
  const [instructions, setInstructions] = useState(qz?.instructions || '')
  const [timeLimit, setTimeLimit] = useState(qz?.time_limit?.toString() || '')
  const [passingPct, setPassingPct] = useState(qz?.passing_percentage?.toString() || '50')
  const [maxAttempts, setMaxAttempts] = useState(qz?.maximum_attempts?.toString() || '3')
  const [randomQ, setRandomQ] = useState(qz?.randomize_questions || false)
  const [randomA, setRandomA] = useState(qz?.randomize_answers || false)
  const [negativeMarks, setNegativeMarks] = useState(qz?.negative_marks?.toString() || '0')
  const [saving, setSaving] = useState(false)
  const [quizId, setQuizId] = useState(qz?.id || '')
  const [questions, setQuestions] = useState<any[]>([])
  const [showQBank, setShowQBank] = useState(false)
  const [bankQuestions, setBankQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState({ question: '', question_type: 'mcq', marks: '1', difficulty: 'medium' as 'easy'|'medium'|'hard' })
  const [newOptions, setNewOptions] = useState([{ text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }])

  const handleSave = async () => {
    setSaving(true)
    try {
      const saved = await quizService.upsert({
        chapter_content_id: contentItem.id,
        instructions,
        time_limit: timeLimit ? parseInt(timeLimit) : undefined,
        passing_percentage: parseFloat(passingPct),
        maximum_attempts: parseInt(maxAttempts),
        randomize_questions: randomQ,
        randomize_answers: randomA,
        negative_marks: parseFloat(negativeMarks),
      })
      setQuizId(saved.id)
      toast.success('Quiz settings saved')
      onSave()
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Save failed') } finally { setSaving(false) }
  }

  useEffect(() => {
    if (quizId) {
      quizService.getQuestionsForQuiz(quizId).then(setQuestions)
    }
  }, [quizId])

  const loadBankQuestions = async () => {
    const qs = await questionService.getAll(orgId)
    setBankQuestions(qs)
    setShowQBank(true)
  }

  const addFromBank = async (q: Question) => {
    if (!quizId) { toast.error('Save quiz settings first'); return }
    await quizService.addQuestion(quizId, q.id, questions.length)
    const updated = await quizService.getQuestionsForQuiz(quizId)
    setQuestions(updated)
    toast.success('Question added')
  }

  const createAndAddQuestion = async () => {
    if (!newQuestion.question.trim()) return
    if (!quizId) { toast.error('Save quiz settings first'); return }
    const options = newOptions.filter(o => o.text.trim()).map((o, i) => ({
      option_text: o.text, is_correct: o.correct, display_order: i
    }))
    const q = await questionService.create({
      organization_id: orgId, question: newQuestion.question,
      question_type: newQuestion.question_type as any,
      marks: parseFloat(newQuestion.marks),
      difficulty: newQuestion.difficulty, status: 'active',
    }, options)
    await quizService.addQuestion(quizId, q.id, questions.length)
    const updated = await quizService.getQuestionsForQuiz(quizId)
    setQuestions(updated)
    setNewQuestion({ question: '', question_type: 'mcq', marks: '1', difficulty: 'medium' })
    setNewOptions([{ text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }])
    toast.success('Question created and added')
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Time Limit (minutes)" type="number" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} placeholder="No limit" />
        <Input label="Passing %" type="number" value={passingPct} onChange={e => setPassingPct(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Max Attempts" type="number" value={maxAttempts} onChange={e => setMaxAttempts(e.target.value)} />
        <Input label="Negative Marks" type="number" step="0.25" value={negativeMarks} onChange={e => setNegativeMarks(e.target.value)} />
      </div>
      <Textarea label="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows={3} />
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={randomQ} onChange={e => setRandomQ(e.target.checked)} className="rounded" />
          Randomize Questions
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={randomA} onChange={e => setRandomA(e.target.checked)} className="rounded" />
          Randomize Answers
        </label>
      </div>
      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Quiz Settings</Button>

      {/* Questions */}
      {quizId && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-800">Questions ({questions.length})</h4>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={loadBankQuestions}>From Question Bank</Button>
            </div>
          </div>
          {questions.map((qq, idx) => (
            <div key={qq.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg mb-2 border border-slate-200">
              <span className="text-xs font-mono text-slate-400 mt-1 flex-shrink-0">Q{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800 font-medium">{qq.question?.question}</p>
                <p className="text-xs text-slate-500 mt-0.5">{qq.question?.marks} mark(s) · {qq.question?.difficulty} · {qq.question?.question_type}</p>
              </div>
              <button onClick={async () => {
                await quizService.removeQuestion(qq.id)
                setQuestions(prev => prev.filter(q => q.id !== qq.id))
              }} className="p-1 text-slate-400 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {/* Create new question inline */}
          <div className="border border-dashed border-slate-300 rounded-lg p-4 mt-3 space-y-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Create New Question</p>
            <Input placeholder="Question text" value={newQuestion.question} onChange={e => setNewQuestion(p => ({ ...p, question: e.target.value }))} />
            <div className="grid grid-cols-3 gap-2">
              <Select options={[{ value: 'mcq', label: 'MCQ' }, { value: 'true_false', label: 'True/False' }, { value: 'fill_blank', label: 'Fill Blank' }, { value: 'short_answer', label: 'Short Answer' }]} value={newQuestion.question_type} onChange={e => setNewQuestion(p => ({ ...p, question_type: e.target.value }))} />
              <Input placeholder="Marks" type="number" value={newQuestion.marks} onChange={e => setNewQuestion(p => ({ ...p, marks: e.target.value }))} />
              <Select options={[{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} value={newQuestion.difficulty} onChange={e => setNewQuestion(p => ({ ...p, difficulty: e.target.value as any }))} />
            </div>
            {(newQuestion.question_type === 'mcq' || newQuestion.question_type === 'multiple_select') && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500">Options (check correct answer):</p>
                {newOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="checkbox" checked={opt.correct} onChange={e => setNewOptions(prev => prev.map((o, i) => i === idx ? { ...o, correct: e.target.checked } : newQuestion.question_type === 'mcq' ? { ...o, correct: false } : o))} />
                    <input
                      className="flex-1 h-8 px-2 text-sm border border-slate-300 rounded-lg"
                      placeholder={`Option ${idx + 1}`}
                      value={opt.text}
                      onChange={e => setNewOptions(prev => prev.map((o, i) => i === idx ? { ...o, text: e.target.value } : o))}
                    />
                  </div>
                ))}
              </div>
            )}
            <Button size="sm" variant="secondary" onClick={createAndAddQuestion}><Plus size={13} /> Create & Add Question</Button>
          </div>
        </div>
      )}

      {/* Question Bank Modal */}
      <Modal open={showQBank} onClose={() => setShowQBank(false)} title="Question Bank" size="lg">
        <div className="p-4">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {bankQuestions.map(q => (
              <div key={q.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium truncate">{q.question}</p>
                  <p className="text-xs text-slate-500">{q.marks} mark(s) · {q.difficulty} · {q.question_type}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => addFromBank(q)}>Add</Button>
              </div>
            ))}
            {bankQuestions.length === 0 && <p className="text-sm text-slate-500 text-center py-8">No questions in bank yet</p>}
          </div>
        </div>
      </Modal>
    </div>
  )
}

// ─── Activity Editor ──────────────────────────────────────────────────────────
function ActivityEditor({ contentItem, onSave }: { contentItem: ChapterContent; onSave: () => void }) {
  const act = contentItem.activity
  const [activityType, setActivityType] = useState(act?.activity_type || 'multiple_choice')
  const [instructions, setInstructions] = useState(act?.instructions || '')
  const [maxMarks, setMaxMarks] = useState(act?.maximum_marks?.toString() || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await activityService.upsert({
        chapter_content_id: contentItem.id,
        activity_type: activityType as any,
        instructions,
        maximum_marks: maxMarks ? parseFloat(maxMarks) : undefined,
      })
      toast.success('Activity saved')
      onSave()
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Save failed') } finally { setSaving(false) }
  }

  return (
    <div className="space-y-4">
      <Select
        label="Activity Type"
        options={[
          { value: 'multiple_choice', label: 'Multiple Choice' },
          { value: 'true_false', label: 'True / False' },
          { value: 'fill_blank', label: 'Fill in the Blank' },
          { value: 'match_following', label: 'Match the Following' },
          { value: 'ordering', label: 'Ordering' },
          { value: 'short_answer', label: 'Short Answer' },
          { value: 'long_answer', label: 'Long Answer' },
        ]}
        value={activityType}
        onChange={e => setActivityType(e.target.value as any)}
      />
      <Input label="Maximum Marks" type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} />
      <Textarea label="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows={4} />
      <Button onClick={handleSave} loading={saving}><Save size={14} /> Save Activity</Button>
    </div>
  )
}

// ─── Resource Editor ──────────────────────────────────────────────────────────
function ResourceEditor({ orgId }: { contentItem: ChapterContent; orgId: string; onSave: () => void }) {
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fileUrl = await storageService.uploadDocument(file, orgId)
      setUrl(fileUrl)
      toast.success('Resource uploaded!')
    } catch { toast.error('Upload failed') } finally { setUploading(false) }
  }

  return (
    <div className="space-y-4">
      <Input label="External URL (optional)" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">Or Upload File</label>
        <label className="flex items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          <p className="text-sm text-slate-600">{uploading ? 'Uploading...' : 'Click to upload file'}</p>
        </label>
        {url && <p className="text-xs text-green-600 mt-1">✓ <a href={url} target="_blank" rel="noreferrer" className="underline">View file</a></p>}
      </div>
      <p className="text-sm text-slate-500">Resource URL is stored in the chapter content title/description.</p>
    </div>
  )
}

// ─── Main Content Builder ─────────────────────────────────────────────────────
export default function ContentBuilderPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [contentItems, setContentItems] = useState<ChapterContent[]>([])
  const [activeItem, setActiveItem] = useState<ChapterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addingType, setAddingType] = useState<ContentType | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newRequired, setNewRequired] = useState(true)
  const [addingContent, setAddingContent] = useState(false)
  const [archiveConfirm, setArchiveConfirm] = useState<{ open: boolean; item?: ChapterContent }>({ open: false })
  const [publishing, setPublishing] = useState(false)
  const [editSectionModal, setEditSectionModal] = useState<{ open: boolean; item?: ChapterContent }>({ open: false })
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)

  const orgId = user!.organization_id

  const load = useCallback(async () => {
    if (!chapterId) return
    setLoading(true)
    try {
      const [chap, items] = await Promise.all([
        chapterService.getById(chapterId),
        chapterContentService.getByChapter(chapterId, true),
      ])
      setChapter(chap)
      setContentItems(items)
      if (items.length > 0 && !activeItem) setActiveItem(items[0])
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [chapterId])

  useEffect(() => { load() }, [load])

  // Refresh active item after save
  const refreshActive = async () => {
    if (!activeItem) return
    const updated = await chapterContentService.getById(activeItem.id)
    if (updated) {
      setActiveItem(updated)
      setContentItems(prev => prev.map(i => i.id === updated.id ? updated : i))
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(contentItems)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    const reordered = items.map((item, idx) => ({ ...item, display_order: idx }))
    setContentItems(reordered)
    try {
      await chapterContentService.reorder(reordered.map(i => ({ id: i.id, display_order: i.display_order })))
      toast.success('Order saved')
    } catch { toast.error('Failed to save order') }
  }

  const handleAddContent = async () => {
    if (!addingType || !newTitle.trim() || !chapterId) return
    setAddingContent(true)
    try {
      const item = await chapterContentService.create({
        organization_id: orgId,
        chapter_id: chapterId,
        content_type: addingType,
        title: newTitle.trim(),
        description: newDescription,
        display_order: contentItems.length,
        is_required: newRequired,
        created_by: user!.id,
      })
      // Create type-specific record
      if (addingType === 'video') await videoService.upsert({ chapter_content_id: item.id, organization_id: orgId })
      if (addingType === 'lesson') await lessonService.upsert({ chapter_content_id: item.id, content: '' })
      if (addingType === 'worksheet') await worksheetService.upsert({ chapter_content_id: item.id, worksheet_type: 'pdf' })
      if (addingType === 'activity') await activityService.upsert({ chapter_content_id: item.id, activity_type: 'multiple_choice' })
      if (addingType === 'assignment') await assignmentService.upsert({ chapter_content_id: item.id })
      if (addingType === 'quiz') await quizService.upsert({ chapter_content_id: item.id, randomize_questions: false, randomize_answers: false, negative_marks: 0 })

      await auditService.log({ organization_id: orgId, user_id: user!.id, action: 'CREATE', entity_type: 'chapter_content', entity_id: item.id, new_data: { type: addingType, title: newTitle } })
      toast.success(`${addingType} created`)
      setShowAddModal(false)
      setNewTitle('')
      setNewDescription('')
      setAddingType(null)
      await load()
      setActiveItem(await chapterContentService.getById(item.id))
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to create')
    } finally {
      setAddingContent(false)
    }
  }

  const handleTogglePublish = async (item: ChapterContent) => {
    try {
      if (item.status === 'published') {
        await chapterContentService.unpublish(item.id)
        toast.success('Unpublished')
      } else {
        await chapterContentService.publish(item.id)
        toast.success('Published')
      }
      await load()
      if (activeItem?.id === item.id) {
        setActiveItem(await chapterContentService.getById(item.id))
      }
    } catch { toast.error('Failed') }
  }

  const handleToggleRequired = async (item: ChapterContent) => {
    try {
      await chapterContentService.update(item.id, { is_required: !item.is_required })
      await load()
    } catch { toast.error('Failed') }
  }

  const handleOpenEditSection = (item: ChapterContent) => {
    setEditTitle(item.title)
    setEditDescription(item.description || '')
    setEditSectionModal({ open: true, item })
  }

  const handleSaveSectionDetails = async () => {
    if (!editSectionModal.item || !editTitle.trim()) return
    setSavingEdit(true)
    try {
      await chapterContentService.update(editSectionModal.item.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      toast.success('Section updated')
      setEditSectionModal({ open: false })
      await load()
      const updated = await chapterContentService.getById(editSectionModal.item.id)
      if (updated) setActiveItem(updated)
    } catch {
      toast.error('Failed to update section')
    } finally {
      setSavingEdit(false)
    }
  }

  const handleArchive = async () => {
    if (!archiveConfirm.item) return
    try {
      await chapterContentService.archive(archiveConfirm.item.id)
      toast.success('Content archived')
      setArchiveConfirm({ open: false })
      setActiveItem(null)
      await load()
    } catch { toast.error('Failed') }
  }

  const handlePublishChapter = async () => {
    if (!chapter) return
    setPublishing(true)
    try {
      await chapterService.publish(chapter.id)
      setChapter(prev => prev ? { ...prev, status: 'published' } : prev)
      toast.success('Chapter published!')
    } catch { toast.error('Failed to publish') } finally { setPublishing(false) }
  }

  const navigateContent = (direction: 'prev' | 'next') => {
    if (!activeItem) return
    const idx = contentItems.findIndex(i => i.id === activeItem.id)
    const nextIdx = direction === 'next' ? idx + 1 : idx - 1
    if (nextIdx >= 0 && nextIdx < contentItems.length) {
      chapterContentService.getById(contentItems[nextIdx].id).then(setActiveItem)
    }
  }

  if (loading) return <AppLayout><LoadingState message="Loading content builder..." /></AppLayout>

  const breadcrumbs = chapter ? [
    { label: 'Academic', href: user?.role === 'admin' ? '/admin/academic' : '/content-manager/academic' },
    ...(chapter.subject?.class?.category ? [{ label: chapter.subject.class.category.name, href: '#' }] : []),
    ...(chapter.subject?.class ? [{ label: chapter.subject.class.name, href: '#' }] : []),
    ...(chapter.subject ? [{ label: chapter.subject.name, href: '#' }] : []),
    { label: chapter.title },
  ] : []

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex-shrink-0">
              <ArrowLeft size={16} />
            </button>
            <div className="min-w-0">
              <Breadcrumbs items={breadcrumbs} />
              <div className="flex items-center gap-2 mt-0.5">
                <h1 className="text-base font-bold text-slate-900 truncate">{chapter?.title}</h1>
                <Badge variant={chapter?.status as 'draft' | 'published'}>{chapter?.status}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-500">{contentItems.filter(i => i.status === 'published').length}/{contentItems.length} published</span>
            {chapter?.status !== 'published' && (
              <Button variant="primary" size="sm" loading={publishing} onClick={handlePublishChapter} icon={<Globe size={14} />}>
                Publish Chapter
              </Button>
            )}
          </div>
        </div>

        {/* Builder workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel — content list */}
          <div className="w-72 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Chapter Content</span>
              <span className="text-xs text-slate-400">{contentItems.length} items</span>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="content-list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="px-2 space-y-1">
                      {contentItems.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                          <p className="text-sm">No content yet</p>
                          <p className="text-xs mt-1">Click + Add Content below</p>
                        </div>
                      ) : (
                        contentItems.map((item, idx) => (
                          <Draggable key={item.id} draggableId={item.id} index={idx}>
                            {(prov, snap) => (
                              <div
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                onClick={() => chapterContentService.getById(item.id).then(setActiveItem)}
                                className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all border ${
                                  activeItem?.id === item.id
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                                } ${snap.isDragging ? 'shadow-lg' : ''}`}
                              >
                                <div {...prov.dragHandleProps} className="drag-handle text-slate-300 hover:text-slate-500 flex-shrink-0">
                                  <GripVertical size={14} />
                                </div>
                                <ContentTypeIcon type={item.content_type} size={13} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-slate-800 truncate">{item.title}</p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className="text-[10px] text-slate-400">#{idx + 1}</span>
                                    {item.is_required && <span className="text-[10px] text-amber-600">Required</span>}
                                    <span className={`text-[10px] ${item.status === 'published' ? 'text-green-600' : 'text-slate-400'}`}>
                                      {item.status === 'published' ? '● Published' : '○ Draft'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-0.5 flex-shrink-0">
                                  <button
                                    onClick={e => { e.stopPropagation(); handleTogglePublish(item) }}
                                    className={`p-0.5 rounded text-[10px] ${item.status === 'published' ? 'text-green-600 hover:text-slate-400' : 'text-slate-300 hover:text-green-600'}`}
                                    title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                                  >
                                    <Globe size={11} />
                                  </button>
                                  <button
                                    onClick={e => { e.stopPropagation(); setArchiveConfirm({ open: true, item }) }}
                                    className="p-0.5 rounded text-slate-300 hover:text-red-500"
                                    title="Archive"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="p-3 border-t border-slate-200">
              <Button
                variant="outline"
                className="w-full"
                size="sm"
                onClick={() => setShowAddModal(true)}
                icon={<Plus size={14} />}
              >
                Add Content
              </Button>
            </div>
          </div>

          {/* Right panel — editor */}
          <div className="flex-1 overflow-y-auto bg-slate-50">
            {activeItem ? (
              <div className="max-w-3xl mx-auto p-6 fade-in">
                {/* Item header */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-5 shadow-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <ContentTypeIcon type={activeItem.content_type} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-bold text-slate-900">{activeItem.title}</h2>
                          <button
                            onClick={() => handleOpenEditSection(activeItem)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="Edit Section Details"
                          >
                            <Edit size={14} />
                          </button>
                          <ContentTypeBadge type={activeItem.content_type} />
                          <Badge variant={activeItem.status as 'draft' | 'published'}>{activeItem.status}</Badge>
                          {activeItem.is_required && <Badge variant="warning">Required</Badge>}
                        </div>
                        {activeItem.description && <p className="text-sm text-slate-500 mt-1">{activeItem.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleToggleRequired(activeItem)}
                        className={`p-1.5 rounded-lg border transition-colors ${activeItem.is_required ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'}`}
                        title={activeItem.is_required ? 'Mark Optional' : 'Mark Required'}
                      >
                        {activeItem.is_required ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                      </button>
                      <button
                        onClick={() => handleTogglePublish(activeItem)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          activeItem.status === 'published'
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                        }`}
                      >
                        <Globe size={12} />
                        {activeItem.status === 'published' ? 'Published' : 'Publish'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content editor */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-5 shadow-xs">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                    {CONTENT_TYPE_CONFIG[activeItem.content_type].label} Content
                  </h3>
                  {activeItem.content_type === 'video' && <VideoEditor contentItem={activeItem} orgId={orgId} onSave={refreshActive} />}
                  {activeItem.content_type === 'lesson' && <LessonEditor contentItem={activeItem} chapter={chapter} onSave={refreshActive} />}
                  {activeItem.content_type === 'worksheet' && <WorksheetEditor contentItem={activeItem} orgId={orgId} onSave={refreshActive} />}
                  {activeItem.content_type === 'activity' && <ActivityEditor contentItem={activeItem} onSave={refreshActive} />}
                  {activeItem.content_type === 'assignment' && <AssignmentEditor contentItem={activeItem} onSave={refreshActive} />}
                  {activeItem.content_type === 'quiz' && <QuizEditor contentItem={activeItem} orgId={orgId} onSave={refreshActive} />}
                  {activeItem.content_type === 'resource' && <ResourceEditor contentItem={activeItem} orgId={orgId} onSave={refreshActive} />}
                </div>

                {/* Section Image Management: Upload, Replace, Remove, Preview & Save */}
                <SectionImageEditor
                  classKey={chapter?.subject?.class?.name || chapter?.subject?.class?.code || 'class3'}
                  className={chapter?.subject?.class?.name || 'Class'}
                  chapterNum={chapter?.chapter_number || '1'}
                  chapterTitle={chapter?.title || 'Chapter'}
                  sectionKey={activeItem.id || (activeItem.content_type === 'lesson' ? (activeItem.display_order >= 2 ? 'lesson2' : 'lesson1') : activeItem.content_type)}
                  sectionTitle={activeItem.title}
                  onUpdated={refreshActive}
                />

                {/* Previous / Next */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateContent('prev')}
                    disabled={contentItems.findIndex(i => i.id === activeItem?.id) === 0}
                    icon={<ChevronLeft size={14} />}
                  >Previous</Button>
                  <span className="text-xs text-slate-400">
                    {contentItems.findIndex(i => i.id === activeItem?.id) + 1} / {contentItems.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateContent('next')}
                    disabled={contentItems.findIndex(i => i.id === activeItem?.id) === contentItems.length - 1}
                  >Next <ChevronRight size={14} /></Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <EmptyState
                  title="No Content Yet"
                  description="Add your first video, lesson, worksheet, activity, assignment or quiz to get started."
                  icon={<Plus size={48} />}
                  action={{ label: '+ Add Content', onClick: () => setShowAddModal(true) }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Content Modal */}
      <Modal open={showAddModal} onClose={() => { setShowAddModal(false); setAddingType(null) }} title="Add Content" size="sm">
        <div className="p-4">
          {!addingType ? (
            <div className="grid grid-cols-2 gap-3">
              {CONTENT_TYPES.map(type => {
                const config = CONTENT_TYPE_CONFIG[type]
                const Icon = config.icon
                return (
                  <button
                    key={type}
                    onClick={() => { setAddingType(type); setNewTitle(config.label + ' ' + (contentItems.filter(i => i.content_type === type).length + 1)) }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md ${config.bg} ${config.border} ${config.color}`}
                  >
                    <Icon size={22} />
                    <span className="text-xs font-semibold">{config.label}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ContentTypeIcon type={addingType} />
                <span className="font-semibold text-slate-800">{CONTENT_TYPE_CONFIG[addingType].label}</span>
                <button onClick={() => setAddingType(null)} className="ml-auto text-xs text-slate-400 hover:text-slate-600">Change type</button>
              </div>
              <Input label="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Lesson 1: Introduction" required />
              <Textarea label="Description (optional)" value={newDescription} onChange={e => setNewDescription(e.target.value)} rows={2} />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={newRequired} onChange={e => setNewRequired(e.target.checked)} className="rounded" />
                <span className="text-slate-700">Mark as Required</span>
              </label>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button onClick={handleAddContent} loading={addingContent} disabled={!newTitle.trim()}>Create {CONTENT_TYPE_CONFIG[addingType].label}</Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <ConfirmDialog
        open={archiveConfirm.open}
        title="Archive Content"
        message={`Archive "${archiveConfirm.item?.title}"? Students will no longer see this content.`}
        onConfirm={handleArchive}
        onCancel={() => setArchiveConfirm({ open: false })}
        confirmLabel="Archive"
        danger
      />

      {/* Edit Section Details Modal */}
      <Modal
        open={editSectionModal.open}
        onClose={() => setEditSectionModal({ open: false })}
        title="Edit Section Details"
        size="sm"
      >
        <div className="p-4 space-y-4">
          <Input
            label="Section Title"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="e.g. Lesson 1: Introduction"
            required
          />
          <Textarea
            label="Description (optional)"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            rows={3}
            placeholder="Brief overview of what students will learn in this section..."
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => setEditSectionModal({ open: false })}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSectionDetails}
              loading={savingEdit}
              disabled={!editTitle.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
