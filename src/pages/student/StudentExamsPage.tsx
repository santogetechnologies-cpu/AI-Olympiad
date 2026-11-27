import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import {
  GraduationCap, Clock, FileCheck2, Lock, ArrowRight, BookOpen, HelpCircle, Play, CalendarClock,
  Trophy, Eye, Hourglass, ListChecks, Target,
} from 'lucide-react'
import { AppLayout } from '../../components/layout/AppLayout'
import { LoadingState, Modal } from '../../components/ui'
import { ExamReviewList } from '../../components/exams/ExamReviewList'
import { useAuth } from '../../contexts/AuthContext'
import {
  examService, examWindowState, type Exam, type ExamAttempt, type ReviewItem,
} from '../../services/examService'

const fmtDuration = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`

export const StudentExamsPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const studentGrade = (user?.profile as any)?.class_grade || 'AI Olympiad Candidate'

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [exams, setExams] = useState<Exam[]>([])
  const [attempts, setAttempts] = useState<ExamAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState<{ attempt: ExamAttempt; exam?: Exam } | null>(null)
  const [review, setReview] = useState<ReviewItem[] | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [e, a] = await Promise.all([examService.listForStudent(), examService.getMyAttempts()])
      setExams(e)
      setAttempts(a)
    } catch (err: any) {
      toast.error(err.message || 'Failed to load exams')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const examById = useMemo(() => new Map(exams.map(e => [e.id, e])), [exams])
  const attemptsByExam = useMemo(() => {
    const m = new Map<string, ExamAttempt[]>()
    attempts.forEach(a => m.set(a.exam_id, [...(m.get(a.exam_id) || []), a]))
    return m
  }, [attempts])

  const available = exams.filter(e => {
    const state = examWindowState(e)
    const used = attemptsByExam.get(e.id)?.length || 0
    return e.status === 'published' && state !== 'closed' && used < e.max_attempts
  })

  const openReview = async (attempt: ExamAttempt) => {
    setReviewing({ attempt, exam: examById.get(attempt.exam_id) })
    setReview(null)
    try {
      setReview(await examService.getReview(attempt.id))
    } catch (err: any) {
      toast.error(err.message)
      setReviewing(null)
    }
  }

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/90">
                <GraduationCap size={13} className="text-amber-600" />
                Examination Hall
              </span>
              <span className="text-xs text-slate-400 font-medium">• {studentGrade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Olympiad Examinations</h1>
            <p className="text-sm text-slate-500 mt-1">Take your published exams and review your scores.</p>
          </div>
          <Link to="/student/help" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 w-fit">
            <HelpCircle size={15} /><span>Ask Admin about Schedule</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {([['upcoming', `Upcoming & Active Exams (${available.length})`], ['completed', `Past Attempts & Scores (${attempts.length})`]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === key ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
              {label}
            </button>
          ))}
        </div>

        {loading ? <LoadingState message="Loading exams..." /> : activeTab === 'upcoming' ? (
          available.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-50 to-blue-50 border border-slate-200/80 flex items-center justify-center mb-5">
                <div className="relative">
                  <GraduationCap size={38} className="text-blue-600" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center border-2 border-white"><Lock size={10} /></span>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">No Exams Right Now</h2>
              <p className="max-w-xl mx-auto text-sm text-slate-600 mb-6">When your exam administrator publishes a test for you, it will appear here.</p>
              <Link to="/student/learning" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700">
                <BookOpen size={14} /><span>Continue Curriculum Chapters</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {available.map(exam => {
                const state = examWindowState(exam)
                const used = attemptsByExam.get(exam.id)?.length || 0
                return (
                  <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-slate-900">{exam.title}</h3>
                        {exam.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{exam.description}</p>}
                      </div>
                      {state === 'open'
                        ? <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 shrink-0">Open</span>
                        : <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 shrink-0">Upcoming</span>}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><ListChecks size={13} /> {exam.question_count} questions</span>
                      <span className="flex items-center gap-1"><Target size={13} /> {Number(exam.total_marks)} marks</span>
                      <span className="flex items-center gap-1"><Hourglass size={13} /> {exam.duration_minutes ? `${exam.duration_minutes} min` : 'No time limit'}</span>
                      <span className="flex items-center gap-1"><Play size={13} /> Attempt {used + 1} of {exam.max_attempts}</span>
                    </div>
                    {exam.end_at && state === 'open' && (
                      <p className="text-xs text-rose-600 flex items-center gap-1"><Clock size={12} /> Closes {formatDistanceToNow(new Date(exam.end_at), { addSuffix: true })}</p>
                    )}
                    {state === 'upcoming' && exam.start_at ? (
                      <p className="mt-auto text-xs font-semibold text-amber-700 flex items-center gap-1"><CalendarClock size={14} /> Opens {format(new Date(exam.start_at), 'dd MMM yyyy, HH:mm')}</p>
                    ) : (
                      <button onClick={() => navigate(`/student/exams/${exam.id}`)}
                        className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700">
                        Start Exam <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )
        ) : attempts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4"><FileCheck2 size={30} /></div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Past Exam Records</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Once you finish an exam, your scorecard and answer breakdown appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.map(a => {
              const exam = examById.get(a.exam_id)
              return (
                <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{exam?.title || 'Exam'}</h3>
                    <p className="text-xs text-slate-500">Submitted {format(new Date(a.submitted_at), 'dd MMM yyyy, HH:mm')} · {fmtDuration(a.time_taken_seconds)}</p>
                  </div>
                  {a.results_visible ? (
                    <>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-black text-slate-900 flex items-center gap-1"><Trophy size={16} className="text-amber-500" /> {Number(a.score)} / {Number(a.total_marks)}</span>
                        <span className="text-slate-600">{Number(a.percentage)}%</span>
                        <span className="text-xs"><span className="text-emerald-600">{a.correct_count}✓</span> <span className="text-rose-600">{a.wrong_count}✗</span> <span className="text-slate-400">{a.unanswered_count}–</span></span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${a.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{a.passed ? 'Pass' : 'Fail'}</span>
                      </div>
                      <button onClick={() => openReview(a)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100"><Eye size={14} /> Review</button>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-700 bg-amber-50"><Clock size={14} /> Results pending</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Modal open={!!reviewing} onClose={() => setReviewing(null)} size="xl"
        title={reviewing ? `${reviewing.exam?.title || 'Exam'} — ${Number(reviewing.attempt.score)}/${Number(reviewing.attempt.total_marks)}` : ''}>
        <div className="p-6 bg-slate-50">{review ? <ExamReviewList items={review} /> : <LoadingState message="Loading answers..." />}</div>
      </Modal>
    </AppLayout>
  )
}

export default StudentExamsPage
