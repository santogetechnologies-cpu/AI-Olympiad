import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ArrowLeft, ArrowRight, Clock, Flag, Send, ListChecks, Target, Hourglass, AlertTriangle, Trophy, CheckCircle2, XCircle,
} from 'lucide-react'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button, ErrorState, LoadingState, Modal } from '../../components/ui'
import { ExamReviewList } from '../../components/exams/ExamReviewList'
import { useAuth } from '../../contexts/AuthContext'
import {
  examService, examWindowState, type Exam, type ExamAttempt, type ExamQuestion, type ReviewItem,
} from '../../services/examService'

interface Session {
  startedAt: string
  order: string[] // question ids in display order
  optionOrder: Record<string, number[]> // question id -> original option indexes in display order
  answers: Record<string, number> // question id -> ORIGINAL option index
  flagged: string[]
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const fmtClock = (s: number) => {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

export default function StudentExamTakePage() {
  const { examId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const storageKey = `exam_session_${user?.id}_${examId}`

  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [attemptsUsed, setAttemptsUsed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [current, setCurrent] = useState(0)
  const [now, setNow] = useState(Date.now())
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<ExamAttempt | null>(null)
  const [review, setReview] = useState<ReviewItem[] | null>(null)
  const submittedRef = useRef(false)

  useEffect(() => {
    if (!examId) return
    Promise.all([examService.getExamForStudent(examId), examService.getQuestionsForStudent(examId), examService.getMyAttempts()])
      .then(([e, qs, attempts]) => {
        setExam(e)
        setQuestions(qs)
        setAttemptsUsed(attempts.filter(a => a.exam_id === examId).length)
        try {
          const saved = localStorage.getItem(storageKey)
          if (saved) {
            const s = JSON.parse(saved) as Session
            if (s.order?.length === qs.length) setSession(s)
          }
        } catch { /* ignore corrupt session */ }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [examId, storageKey])

  // Persist progress so a refresh doesn't lose answers
  useEffect(() => {
    if (session && !result) localStorage.setItem(storageKey, JSON.stringify(session))
  }, [session, storageKey, result])

  useEffect(() => {
    if (!session || result) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => { clearInterval(t); window.removeEventListener('beforeunload', warn) }
  }, [session, result])

  const deadline = useMemo(() => {
    if (!session || !exam) return null
    const limits: number[] = []
    if (exam.duration_minutes) limits.push(new Date(session.startedAt).getTime() + exam.duration_minutes * 60_000)
    if (exam.end_at) limits.push(new Date(exam.end_at).getTime())
    return limits.length ? Math.min(...limits) : null
  }, [session, exam])
  const remaining = deadline ? Math.max(0, Math.floor((deadline - now) / 1000)) : null

  const qById = useMemo(() => new Map(questions.map(q => [q.id, q])), [questions])

  const start = () => {
    if (!exam) return
    const ids = questions.map(q => q.id)
    const order = exam.shuffle_questions ? shuffled(ids) : ids
    const optionOrder: Record<string, number[]> = {}
    questions.forEach(q => {
      const idx = q.options.map((_, i) => i)
      optionOrder[q.id] = exam.shuffle_options ? shuffled(idx) : idx
    })
    setSession({ startedAt: new Date().toISOString(), order, optionOrder, answers: {}, flagged: [] })
    setCurrent(0)
  }

  const submit = useCallback(async (auto = false) => {
    if (!session || !exam || submittedRef.current) return
    submittedRef.current = true
    setSubmitting(true)
    try {
      const attemptId = await examService.submit(exam.id, session.answers, session.startedAt)
      localStorage.removeItem(storageKey)
      const mine = await examService.getMyAttempts()
      const attempt = mine.find(a => a.id === attemptId) || null
      setResult(attempt)
      setConfirmOpen(false)
      toast.success(auto ? "Time's up — your exam was submitted" : 'Exam submitted')
    } catch (err: any) {
      submittedRef.current = false
      toast.error(err.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [session, exam, storageKey])

  useEffect(() => {
    if (remaining === 0 && session && !result) submit(true)
  }, [remaining, session, result, submit])

  if (loading) return <AppLayout><LoadingState message="Loading exam..." /></AppLayout>
  if (error || !exam) return <AppLayout><ErrorState message={error || 'Exam not found'} onRetry={() => navigate('/student/exams')} /></AppLayout>

  // ─── Result screen ──────────────────────────────────────────────────────
  if (result) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center">
            {result.results_visible ? (
              <>
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${result.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {result.passed ? <Trophy size={32} /> : <XCircle size={32} />}
                </div>
                <h1 className="text-2xl font-black text-slate-900">{result.passed ? 'Well done, you passed!' : 'Exam submitted'}</h1>
                <p className="text-4xl font-black text-blue-600 my-3">{Number(result.score)} <span className="text-xl text-slate-400">/ {Number(result.total_marks)}</span></p>
                <p className="text-sm text-slate-600">{Number(result.percentage)}% · {result.correct_count} correct · {result.wrong_count} wrong · {result.unanswered_count} unanswered</p>
                <div className="flex justify-center gap-3 mt-6">
                  <Button variant="outline" onClick={() => navigate('/student/exams')}>Back to Exams</Button>
                  {!review && <Button onClick={() => examService.getReview(result.id).then(setReview).catch(e => toast.error(e.message))}>Review Answers</Button>}
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><CheckCircle2 size={32} /></div>
                <h1 className="text-2xl font-black text-slate-900">Exam submitted</h1>
                <p className="text-sm text-slate-600 mt-2">Your answers are saved. Results will appear under <b>Past Attempts & Scores</b> once your administrator releases them.</p>
                <Button className="mt-6" onClick={() => navigate('/student/exams')}>Back to Exams</Button>
              </>
            )}
          </div>
          {review && <ExamReviewList items={review} />}
        </div>
      </AppLayout>
    )
  }

  // ─── Instructions screen ────────────────────────────────────────────────
  if (!session) {
    const state = examWindowState(exam)
    const blocked = exam.status !== 'published' ? 'This exam is not open.'
      : state === 'upcoming' ? 'This exam has not opened yet.'
      : state === 'closed' ? 'This exam has closed.'
      : attemptsUsed >= exam.max_attempts ? 'You have used all your attempts for this exam.'
      : !questions.length ? 'This exam has no questions yet.'
      : null
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
          <Link to="/student/exams" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"><ArrowLeft size={16} /> All exams</Link>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{exam.title}</h1>
              {exam.description && <p className="text-sm text-slate-600 mt-1">{exam.description}</p>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3"><ListChecks className="mx-auto text-blue-600 mb-1" size={18} /><p className="font-black">{questions.length}</p><p className="text-[11px] text-slate-500">Questions</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><Target className="mx-auto text-blue-600 mb-1" size={18} /><p className="font-black">{Number(exam.total_marks)}</p><p className="text-[11px] text-slate-500">Marks</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><Hourglass className="mx-auto text-blue-600 mb-1" size={18} /><p className="font-black">{exam.duration_minutes ? `${exam.duration_minutes} min` : '—'}</p><p className="text-[11px] text-slate-500">Duration</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><CheckCircle2 className="mx-auto text-blue-600 mb-1" size={18} /><p className="font-black">{Number(exam.pass_percentage)}%</p><p className="text-[11px] text-slate-500">To pass</p></div>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
              {exam.instructions?.split('\n').filter(l => l.trim()).map((l, i) => <li key={i}>{l}</li>)}
              <li>Each question has one correct answer.</li>
              {Number(exam.negative_marking) > 0
                ? <li className="text-rose-700">Negative marking: {Math.round(Number(exam.negative_marking) * 100)}% of a question's marks is deducted for each wrong answer. Unanswered questions score 0.</li>
                : <li>There is no negative marking.</li>}
              {exam.duration_minutes && <li>The exam submits automatically when the timer reaches zero.</li>}
              <li>Attempts used: {attemptsUsed} of {exam.max_attempts}.</li>
            </ul>
            {blocked ? (
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 rounded-xl p-3"><AlertTriangle size={16} /> {blocked}</p>
            ) : (
              <Button size="lg" className="w-full" onClick={start}>Start Exam</Button>
            )}
          </div>
        </div>
      </AppLayout>
    )
  }

  // ─── Exam in progress ───────────────────────────────────────────────────
  const qid = session.order[current]
  const q = qById.get(qid)!
  const answeredCount = Object.keys(session.answers).length
  const flagged = new Set(session.flagged)
  const lowTime = remaining !== null && remaining <= 60

  const choose = (originalIndex: number) =>
    setSession(s => s && { ...s, answers: { ...s.answers, [qid]: originalIndex } })
  const clear = () =>
    setSession(s => { if (!s) return s; const a = { ...s.answers }; delete a[qid]; return { ...s, answers: a } })
  const toggleFlag = () =>
    setSession(s => s && { ...s, flagged: flagged.has(qid) ? s.flagged.filter(f => f !== qid) : [...s.flagged, qid] })

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3 sticky top-0 z-10">
          <div className="min-w-0">
            <h1 className="font-black text-slate-900 truncate">{exam.title}</h1>
            <p className="text-xs text-slate-500">{answeredCount} of {questions.length} answered</p>
          </div>
          <div className="flex items-center gap-3">
            {remaining !== null && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm ${lowTime ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-800'}`}>
                <Clock size={16} /> {fmtClock(remaining)}
              </span>
            )}
            <Button icon={<Send size={16} />} onClick={() => setConfirmOpen(true)}>Submit</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">Question {current + 1} of {questions.length}</span>
              <span className="text-xs text-slate-500">{q.marks} marks</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 whitespace-pre-wrap">{q.question_text}</p>
            <div className="space-y-2.5">
              {session.optionOrder[qid].map((orig, displayIdx) => {
                const selected = session.answers[qid] === orig
                return (
                  <button key={orig} onClick={() => choose(orig)}
                    className={`w-full flex items-center gap-3 text-left rounded-xl border-2 px-4 py-3 transition-all ${selected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}>
                    <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{String.fromCharCode(65 + displayIdx)}</span>
                    <span className="text-sm text-slate-800">{q.options[orig]}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={clear} disabled={session.answers[qid] === undefined}>Clear answer</Button>
                <Button variant="ghost" size="sm" icon={<Flag size={14} className={flagged.has(qid) ? 'fill-amber-400 text-amber-500' : ''} />} onClick={toggleFlag}>
                  {flagged.has(qid) ? 'Unmark review' : 'Mark for review'}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<ArrowLeft size={14} />} disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>Previous</Button>
                {current < questions.length - 1
                  ? <Button size="sm" onClick={() => setCurrent(c => c + 1)}>Next <ArrowRight size={14} /></Button>
                  : <Button size="sm" icon={<Send size={14} />} onClick={() => setConfirmOpen(true)}>Finish</Button>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 h-fit">
            <h3 className="text-xs font-bold text-slate-700 mb-3">Question palette</h3>
            <div className="grid grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-80 overflow-y-auto">
              {session.order.map((id, i) => {
                const answered = session.answers[id] !== undefined
                const isFlagged = flagged.has(id)
                return (
                  <button key={id} onClick={() => setCurrent(i)}
                    className={`relative h-9 rounded-lg text-xs font-bold border ${i === current ? 'ring-2 ring-blue-500' : ''} ${answered ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300'}`}>
                    {i + 1}
                    {isFlagged && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white" />}
                  </button>
                )
              })}
            </div>
            <div className="mt-3 space-y-1 text-[11px] text-slate-500">
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500" /> Answered</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded border border-slate-300" /> Not answered</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400" /> Marked for review</p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={confirmOpen} onClose={() => !submitting && setConfirmOpen(false)} size="sm">
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Submit exam?</h3>
          <p className="text-sm text-slate-600">You answered <b>{answeredCount}</b> of <b>{questions.length}</b> questions.</p>
          {questions.length - answeredCount > 0 && <p className="text-sm text-amber-700">{questions.length - answeredCount} question(s) are unanswered.</p>}
          {flagged.size > 0 && <p className="text-sm text-amber-700">{flagged.size} question(s) are marked for review.</p>}
          <p className="text-xs text-slate-500">You can't change your answers after submitting.</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={submitting}>Keep working</Button>
            <Button loading={submitting} onClick={() => submit(false)}>Submit now</Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
