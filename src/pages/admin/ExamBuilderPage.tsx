import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Plus, Trash2, Copy, ChevronUp, ChevronDown, CheckCircle2, Circle,
  ClipboardPaste, Save, Send, AlertTriangle, Settings2, ListChecks, Clock, Target,
} from 'lucide-react'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button, LoadingState, Modal } from '../../components/ui'
import { useAuth } from '../../contexts/AuthContext'
import { classService } from '../../services/classService'
import {
  examService, type ExamPayload, type ExamQuestionDraft, type ExamStatus, type ResultsVisibility,
} from '../../services/examService'
import type { Class } from '../../types'
import { blankQuestion, round2, distributeEqually, toLocalInput, fromLocalInput, parseBulk } from '../../utils/examBuilder'

const MARK_PRESETS = [25, 50, 100, 200]
const NEGATIVE_PRESETS = [
  { label: 'None', value: 0 },
  { label: '¼', value: 0.25 },
  { label: '⅓', value: 1 / 3 },
  { label: '½', value: 0.5 },
  { label: 'Full', value: 1 },
]
const MAX_OPTIONS = 8
const MAX_QUESTIONS = 500

export default function ExamBuilderPage() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isEdit = !!examId

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [classes, setClasses] = useState<Class[]>([])
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [bulkMode, setBulkMode] = useState<'append' | 'replace'>('append')

  // Details
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [classId, setClassId] = useState('')
  const [currentStatus, setCurrentStatus] = useState<ExamStatus>('draft')

  // Scoring
  const [totalMarks, setTotalMarks] = useState(100)
  const [marksMode, setMarksMode] = useState<'equal' | 'custom'>('equal')
  const [passPercentage, setPassPercentage] = useState(40)
  const [negativeMarking, setNegativeMarking] = useState(0)

  // Timing & behaviour
  const [timed, setTimed] = useState(true)
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [maxAttempts, setMaxAttempts] = useState(1)
  const [shuffleQuestions, setShuffleQuestions] = useState(false)
  const [shuffleOptions, setShuffleOptions] = useState(false)
  const [resultsVisibility, setResultsVisibility] = useState<ResultsVisibility>('immediate')
  const [showAnswersInReview, setShowAnswersInReview] = useState(true)
  const [defaultOptionCount, setDefaultOptionCount] = useState(4)

  // Questions
  const [questions, setQuestions] = useState<ExamQuestionDraft[]>(() => [blankQuestion(4)])
  const [countInput, setCountInput] = useState('1')

  useEffect(() => {
    if (user?.organization_id) classService.getAll(user.organization_id).then(setClasses).catch(() => setClasses([]))
  }, [user?.organization_id])

  useEffect(() => {
    if (!examId) return
    examService.getWithAnswerKey(examId)
      .then(({ exam, questions: qs }) => {
        setTitle(exam.title)
        setDescription(exam.description || '')
        setInstructions(exam.instructions || '')
        setClassId(exam.class_id || '')
        setCurrentStatus(exam.status)
        setTotalMarks(Number(exam.total_marks))
        setPassPercentage(Number(exam.pass_percentage))
        setNegativeMarking(Number(exam.negative_marking))
        setTimed(!!exam.duration_minutes)
        setDurationMinutes(exam.duration_minutes || 60)
        setStartAt(toLocalInput(exam.start_at))
        setEndAt(toLocalInput(exam.end_at))
        setMaxAttempts(exam.max_attempts)
        setShuffleQuestions(exam.shuffle_questions)
        setShuffleOptions(exam.shuffle_options)
        setResultsVisibility(exam.results_visibility)
        setShowAnswersInReview(exam.show_answers_in_review)
        const loaded = qs.length ? qs : [blankQuestion(4)]
        setQuestions(loaded)
        setCountInput(String(loaded.length))
        const equal = distributeEqually(loaded, Number(exam.total_marks))
        setMarksMode(loaded.every((q, i) => Math.abs(q.marks - equal[i].marks) < 0.01) ? 'equal' : 'custom')
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [examId])

  // In equal mode, keep marks distributed whenever count or total changes
  const effectiveQuestions = useMemo(
    () => (marksMode === 'equal' ? distributeEqually(questions, totalMarks) : questions),
    [questions, totalMarks, marksMode],
  )
  const marksSum = round2(effectiveQuestions.reduce((s, q) => s + (Number(q.marks) || 0), 0))

  const issues = useMemo(() => {
    const list: string[] = []
    if (!title.trim()) list.push('Exam title is required')
    if (!questions.length) list.push('Add at least one question')
    if (totalMarks <= 0) list.push('Total marks must be greater than 0')
    if (marksMode === 'custom' && Math.abs(marksSum - totalMarks) > 0.01)
      list.push(`Question marks add up to ${marksSum}, but total marks is ${totalMarks}`)
    if (startAt && endAt && new Date(endAt) <= new Date(startAt)) list.push('End time must be after start time')
    questions.forEach((q, i) => {
      const n = i + 1
      if (!q.question_text.trim()) list.push(`Q${n}: question text is empty`)
      const filled = q.options.filter(o => o.trim()).length
      if (filled < 2) list.push(`Q${n}: needs at least 2 options`)
      else if (filled !== q.options.length) list.push(`Q${n}: has an empty option`)
      if (q.correct_option === null) list.push(`Q${n}: correct answer not set`)
    })
    return list
  }, [title, questions, totalMarks, marksMode, marksSum, startAt, endAt])

  const updateQ = (i: number, patch: Partial<ExamQuestionDraft>) =>
    setQuestions(qs => qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)))

  const setQuestionCount = (raw: string) => {
    setCountInput(raw)
    const n = Math.min(MAX_QUESTIONS, Math.max(1, Math.floor(Number(raw))))
    if (!Number.isFinite(n) || !raw) return
    setQuestions(qs => {
      if (n === qs.length) return qs
      if (n < qs.length) return qs.slice(0, n)
      return [...qs, ...Array.from({ length: n - qs.length }, () => blankQuestion(defaultOptionCount))]
    })
  }

  const mutateQuestions = (fn: (qs: ExamQuestionDraft[]) => ExamQuestionDraft[]) => {
    setQuestions(qs => {
      const next = fn(qs)
      setCountInput(String(next.length))
      return next
    })
  }

  const moveQ = (i: number, dir: -1 | 1) =>
    mutateQuestions(qs => {
      const j = i + dir
      if (j < 0 || j >= qs.length) return qs
      const copy = [...qs]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })

  const removeOption = (qi: number, oi: number) => {
    const q = questions[qi]
    if (q.options.length <= 2) return
    let correct = q.correct_option
    if (correct === oi) correct = null
    else if (correct !== null && correct > oi) correct -= 1
    updateQ(qi, { options: q.options.filter((_, idx) => idx !== oi), correct_option: correct })
  }

  const applyBulk = () => {
    const parsed = parseBulk(bulkText)
    if (!parsed.length) {
      toast.error('No questions recognised. Check the format.')
      return
    }
    mutateQuestions(qs => {
      const keep = bulkMode === 'replace' ? [] : qs.filter(q => q.question_text.trim() || q.options.some(o => o.trim()))
      return [...keep, ...parsed].slice(0, MAX_QUESTIONS)
    })
    const missing = parsed.filter(q => q.correct_option === null).length
    toast.success(`Imported ${parsed.length} questions${missing ? ` (${missing} without an answer)` : ''}`)
    setBulkOpen(false)
    setBulkText('')
  }

  const save = async (status: ExamStatus) => {
    if (!title.trim()) {
      toast.error('Exam title is required')
      return
    }
    if (status === 'published' && issues.length) {
      toast.error('Fix the issues listed before publishing')
      return
    }
    setSaving(true)
    try {
      const payload: ExamPayload = {
        organization_id: user?.organization_id || null,
        class_id: classId || null,
        title: title.trim(),
        description: description.trim() || null,
        instructions: instructions.trim() || null,
        total_marks: totalMarks,
        duration_minutes: timed ? durationMinutes : null,
        pass_percentage: passPercentage,
        negative_marking: negativeMarking,
        max_attempts: maxAttempts,
        shuffle_questions: shuffleQuestions,
        shuffle_options: shuffleOptions,
        show_answers_in_review: showAnswersInReview,
        results_visibility: resultsVisibility,
        start_at: fromLocalInput(startAt),
        end_at: fromLocalInput(endAt),
        status,
        ...(isEdit ? {} : { created_by: user?.id || null }),
      }
      await examService.save(examId || null, payload, effectiveQuestions)
      toast.success(status === 'published' ? 'Exam published to students' : 'Exam saved')
      navigate('/admin/exams')
    } catch (err: any) {
      toast.error(err.message || 'Failed to save exam')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AppLayout><LoadingState message="Loading exam..." /></AppLayout>

  const answered = questions.filter(q => q.correct_option !== null).length
  const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelCls = 'block text-xs font-semibold text-slate-600 mb-1'

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/admin/exams" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><ArrowLeft size={18} /></Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Exam' : 'Create Exam'}</h1>
              <p className="text-sm text-slate-500">
                {questions.length} questions · {answered}/{questions.length} answers set · {totalMarks} marks
                {isEdit && <> · currently <span className="font-semibold">{currentStatus}</span></>}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Save size={16} />} loading={saving} onClick={() => save('draft')}>Save Draft</Button>
            <Button icon={<Send size={16} />} loading={saving} onClick={() => save('published')}>
              {currentStatus === 'published' ? 'Save & Keep Published' : 'Publish'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings column */}
          <div className="space-y-4 lg:col-span-1">
            <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Settings2 size={16} /> Details</h2>
              <div>
                <label className={labelCls}>Test name *</label>
                <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. AI Olympiad Mock Test 1" />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={inputCls} rows={2} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Instructions shown before starting</label>
                <textarea className={inputCls} rows={3} value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="One instruction per line" />
              </div>
              <div>
                <label className={labelCls}>Assigned to</label>
                <select className={inputCls} value={classId} onChange={e => setClassId(e.target.value)}>
                  <option value="">All students</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Target size={16} /> Scoring</h2>
              <div>
                <label className={labelCls}>Total marks</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {MARK_PRESETS.map(m => (
                    <button key={m} type="button" onClick={() => setTotalMarks(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${totalMarks === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
                      {m}
                    </button>
                  ))}
                </div>
                <input type="number" min={1} className={inputCls} value={totalMarks} onChange={e => setTotalMarks(Math.max(0, Number(e.target.value)))} />
              </div>
              <div>
                <label className={labelCls}>Marks per question</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['equal', 'custom'] as const).map(m => (
                    <button key={m} type="button"
                      onClick={() => {
                        if (m === 'custom' && marksMode === 'equal') setQuestions(distributeEqually(questions, totalMarks))
                        setMarksMode(m)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${marksMode === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'}`}>
                      {m === 'equal' ? 'Split equally' : 'Custom per question'}
                    </button>
                  ))}
                </div>
                <p className={`text-xs mt-1 ${Math.abs(marksSum - totalMarks) > 0.01 ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
                  {marksMode === 'equal'
                    ? `≈ ${round2(totalMarks / Math.max(1, questions.length))} marks each`
                    : `Assigned ${marksSum} of ${totalMarks}`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Pass %</label>
                  <input type="number" min={0} max={100} className={inputCls} value={passPercentage} onChange={e => setPassPercentage(Math.min(100, Math.max(0, Number(e.target.value))))} />
                </div>
                <div>
                  <label className={labelCls}>Options per new question</label>
                  <input type="number" min={2} max={MAX_OPTIONS} className={inputCls} value={defaultOptionCount} onChange={e => setDefaultOptionCount(Math.min(MAX_OPTIONS, Math.max(2, Number(e.target.value))))} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Negative marking (share of question marks lost per wrong answer)</label>
                <div className="flex flex-wrap gap-2">
                  {NEGATIVE_PRESETS.map(p => (
                    <button key={p.label} type="button" onClick={() => setNegativeMarking(p.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${Math.abs(negativeMarking - p.value) < 0.001 ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-700 border-slate-300'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Clock size={16} /> Timing & Rules</h2>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={timed} onChange={e => setTimed(e.target.checked)} /> Timed exam
              </label>
              {timed && (
                <div>
                  <label className={labelCls}>Duration (minutes)</label>
                  <input type="number" min={1} className={inputCls} value={durationMinutes} onChange={e => setDurationMinutes(Math.max(1, Number(e.target.value)))} />
                </div>
              )}
              <div>
                <label className={labelCls}>Opens at (optional)</label>
                <input type="datetime-local" className={inputCls} value={startAt} onChange={e => setStartAt(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Closes at (optional)</label>
                <input type="datetime-local" className={inputCls} value={endAt} onChange={e => setEndAt(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Attempts allowed</label>
                <input type="number" min={1} className={inputCls} value={maxAttempts} onChange={e => setMaxAttempts(Math.max(1, Number(e.target.value)))} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={shuffleQuestions} onChange={e => setShuffleQuestions(e.target.checked)} /> Shuffle question order
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={shuffleOptions} onChange={e => setShuffleOptions(e.target.checked)} /> Shuffle option order
              </label>
              <div>
                <label className={labelCls}>Students see results</label>
                <select className={inputCls} value={resultsVisibility} onChange={e => setResultsVisibility(e.target.value as ResultsVisibility)}>
                  <option value="immediate">Immediately after submitting</option>
                  <option value="after_end">After the exam closes</option>
                  <option value="manual">When I publish them</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={showAnswersInReview} onChange={e => setShowAnswersInReview(e.target.checked)} /> Show correct answers in student review
              </label>
            </section>

            {issues.length > 0 && (
              <section className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2"><AlertTriangle size={14} /> Before publishing ({issues.length})</h3>
                <ul className="text-xs text-amber-800 space-y-0.5 max-h-48 overflow-y-auto">
                  {issues.slice(0, 30).map(i => <li key={i}>• {i}</li>)}
                  {issues.length > 30 && <li>…and {issues.length - 30} more</li>}
                </ul>
              </section>
            )}
          </div>

          {/* Questions column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-end gap-3 sticky top-0 z-10">
              <div>
                <label className={labelCls}>Number of questions</label>
                <input type="number" min={1} max={MAX_QUESTIONS} className={`${inputCls} w-28`} value={countInput}
                  onChange={e => setQuestionCount(e.target.value)} onBlur={() => setCountInput(String(questions.length))} />
              </div>
              <Button variant="outline" icon={<Plus size={16} />} onClick={() => mutateQuestions(qs => [...qs, blankQuestion(defaultOptionCount)])}>Add Question</Button>
              <Button variant="outline" icon={<ClipboardPaste size={16} />} onClick={() => setBulkOpen(true)}>Bulk Paste</Button>
              <span className="ml-auto text-xs text-slate-500 flex items-center gap-1"><ListChecks size={14} /> {answered}/{questions.length} answers set</span>
            </div>

            {questions.map((q, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">Q{i + 1}</span>
                  <div className="flex items-center gap-1">
                    {marksMode === 'custom' ? (
                      <label className="flex items-center gap-1 text-xs text-slate-500 mr-2">
                        Marks
                        <input type="number" min={0} step="0.25" className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm"
                          value={q.marks} onChange={e => updateQ(i, { marks: Math.max(0, Number(e.target.value)) })} />
                      </label>
                    ) : (
                      <span className="text-xs text-slate-500 mr-2">{effectiveQuestions[i]?.marks} marks</span>
                    )}
                    <button title="Move up" onClick={() => moveQ(i, -1)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><ChevronUp size={16} /></button>
                    <button title="Move down" onClick={() => moveQ(i, 1)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><ChevronDown size={16} /></button>
                    <button title="Duplicate" onClick={() => mutateQuestions(qs => [...qs.slice(0, i + 1), { ...qs[i], id: undefined, options: [...qs[i].options] }, ...qs.slice(i + 1)])} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><Copy size={16} /></button>
                    <button title="Delete" disabled={questions.length <= 1} onClick={() => mutateQuestions(qs => qs.filter((_, idx) => idx !== i))} className="p-1.5 rounded hover:bg-red-50 text-red-500 disabled:opacity-30"><Trash2 size={16} /></button>
                  </div>
                </div>

                <textarea className={inputCls} rows={2} placeholder="Type the question..." value={q.question_text}
                  onChange={e => updateQ(i, { question_text: e.target.value })} />

                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isCorrect = q.correct_option === oi
                    return (
                      <div key={oi} className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 ${isCorrect ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200'}`}>
                        <button type="button" title="Mark as correct answer" onClick={() => updateQ(i, { correct_option: oi })}
                          className={isCorrect ? 'text-emerald-600' : 'text-slate-300 hover:text-emerald-500'}>
                          {isCorrect ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                        <span className="text-xs font-bold text-slate-500 w-4">{String.fromCharCode(65 + oi)}</span>
                        <input className="flex-1 bg-transparent text-sm focus:outline-none" placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                          value={opt} onChange={e => updateQ(i, { options: q.options.map((o, idx) => (idx === oi ? e.target.value : o)) })} />
                        <button disabled={q.options.length <= 2} onClick={() => removeOption(i, oi)} className="p-1 text-slate-400 hover:text-red-500 disabled:opacity-30"><Trash2 size={14} /></button>
                      </div>
                    )
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {q.options.length < MAX_OPTIONS && (
                    <button onClick={() => updateQ(i, { options: [...q.options, ''] })} className="text-xs font-semibold text-blue-600 hover:underline">+ Add option</button>
                  )}
                  {q.correct_option === null && <span className="text-xs text-amber-600 font-semibold">Click a circle to set the correct answer</span>}
                </div>
                <input className={`${inputCls} text-xs`} placeholder="Explanation shown in review (optional)" value={q.explanation || ''}
                  onChange={e => updateQ(i, { explanation: e.target.value })} />
              </div>
            ))}

            <Button variant="outline" className="w-full" icon={<Plus size={16} />} onClick={() => mutateQuestions(qs => [...qs, blankQuestion(defaultOptionCount)])}>Add Question</Button>
          </div>
        </div>
      </div>

      <Modal open={bulkOpen} onClose={() => setBulkOpen(false)} title="Bulk paste questions" size="lg">
        <div className="p-6 space-y-3">
          <p className="text-xs text-slate-600">Separate questions with a blank line. Set the answer with an <code>Answer: B</code> line, or put <code>*</code> before the correct option.</p>
          <pre className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-600">{`1. What does AI stand for?
A) Automatic Input
B) Artificial Intelligence
C) Advanced Internet
D) Analog Interface
Answer: B
Explanation: AI = Artificial Intelligence

2. Which one is a robot?
A) A rock
*B) A machine that follows instructions`}</pre>
          <textarea className={`${inputCls} font-mono text-xs`} rows={12} value={bulkText} onChange={e => setBulkText(e.target.value)} placeholder="Paste questions here..." />
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-sm text-slate-700">
              <label className="flex items-center gap-1"><input type="radio" checked={bulkMode === 'append'} onChange={() => setBulkMode('append')} /> Add to existing</label>
              <label className="flex items-center gap-1"><input type="radio" checked={bulkMode === 'replace'} onChange={() => setBulkMode('replace')} /> Replace all</label>
            </div>
            <Button onClick={applyBulk}>Import {bulkText.trim() ? `(${parseBulk(bulkText).length})` : ''}</Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
