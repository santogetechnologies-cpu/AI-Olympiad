import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { ArrowLeft, Download, Eye, EyeOff, RotateCcw, Search, Trophy, Users, Target, CheckCircle2 } from 'lucide-react'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button, ConfirmDialog, ErrorState, LoadingState, Modal, StatCard } from '../../components/ui'
import { ExamReviewList } from '../../components/exams/ExamReviewList'
import { examService, type Exam, type ExamAttempt, type ReviewItem } from '../../services/examService'

const fmtDuration = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`

export default function AdminExamResultsPage() {
  const { examId } = useParams()
  const [exam, setExam] = useState<Exam | null>(null)
  const [attempts, setAttempts] = useState<ExamAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [bestOnly, setBestOnly] = useState(true)
  const [reviewing, setReviewing] = useState<ExamAttempt | null>(null)
  const [review, setReview] = useState<ReviewItem[] | null>(null)
  const [resetting, setResetting] = useState<ExamAttempt | null>(null)

  const load = useCallback(async () => {
    if (!examId) return
    setLoading(true)
    setError(null)
    try {
      const [{ exam: e }, a] = await Promise.all([examService.getWithAnswerKey(examId), examService.getAttemptsForExam(examId)])
      setExam(e)
      setAttempts(a)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [examId])

  useEffect(() => { load() }, [load])

  const rows = useMemo(() => {
    let list = attempts
    if (bestOnly) {
      const best = new Map<string, ExamAttempt>()
      for (const a of attempts) {
        const key = a.student_id || a.id
        const cur = best.get(key)
        if (!cur || Number(a.score) > Number(cur.score)) best.set(key, a)
      }
      list = [...best.values()]
    }
    const q = search.trim().toLowerCase()
    if (q) list = list.filter(a => `${a.student?.full_name} ${a.student?.email} ${a.student?.student_id_number || ''}`.toLowerCase().includes(q))
    return [...list].sort((a, b) => Number(b.score) - Number(a.score) || a.time_taken_seconds - b.time_taken_seconds)
  }, [attempts, bestOnly, search])

  const stats = useMemo(() => {
    const scored = rows.map(r => Number(r.percentage) || 0)
    const n = scored.length
    return {
      students: new Set(attempts.map(a => a.student_id)).size,
      avg: n ? Math.round(scored.reduce((s, x) => s + x, 0) / n) : 0,
      top: n ? Math.max(...scored) : 0,
      passRate: n ? Math.round((rows.filter(r => r.passed).length / n) * 100) : 0,
    }
  }, [rows, attempts])

  const openReview = async (a: ExamAttempt) => {
    setReviewing(a)
    setReview(null)
    try {
      setReview(await examService.getReview(a.id))
    } catch (err: any) {
      toast.error(err.message)
      setReviewing(null)
    }
  }

  const toggleResults = async () => {
    if (!exam) return
    try {
      await examService.setResultsPublished(exam.id, !exam.results_published)
      setExam({ ...exam, results_published: !exam.results_published })
      toast.success(exam.results_published ? 'Results hidden from students' : 'Results published to students')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const resetAttempt = async () => {
    if (!resetting) return
    try {
      await examService.deleteAttempt(resetting.id)
      toast.success('Attempt removed — the student can retake the exam')
      setResetting(null)
      load()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const exportCsv = () => {
    const header = ['Rank', 'Name', 'Email', 'Student ID', 'Score', 'Total', 'Percentage', 'Correct', 'Wrong', 'Unanswered', 'Result', 'Time Taken', 'Submitted']
    const lines = rows.map((r, i) => [
      i + 1, r.student?.full_name || '', r.student?.email || '', r.student?.student_id_number || '',
      r.score, r.total_marks, r.percentage, r.correct_count, r.wrong_count, r.unanswered_count,
      r.passed ? 'Pass' : 'Fail', fmtDuration(r.time_taken_seconds), format(new Date(r.submitted_at), 'yyyy-MM-dd HH:mm'),
    ].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exam?.title || 'exam'}-results.csv`.replace(/[^\w.-]+/g, '_')
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <AppLayout><LoadingState message="Loading results..." /></AppLayout>
  if (error || !exam) return <AppLayout><ErrorState message={error || 'Exam not found'} onRetry={load} /></AppLayout>

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/admin/exams" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><ArrowLeft size={18} /></Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{exam.title} — Results</h1>
              <p className="text-sm text-slate-500">{Number(exam.total_marks)} marks · pass at {Number(exam.pass_percentage)}% · status {exam.status}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {exam.results_visibility === 'manual' && (
              <Button variant={exam.results_published ? 'outline' : 'primary'} icon={exam.results_published ? <EyeOff size={16} /> : <Eye size={16} />} onClick={toggleResults}>
                {exam.results_published ? 'Hide from Students' : 'Publish Results'}
              </Button>
            )}
            <Button variant="outline" icon={<Download size={16} />} onClick={exportCsv} disabled={!rows.length}>Export CSV</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Students attempted" value={stats.students} icon={<Users size={20} />} color="blue" />
          <StatCard label="Average score" value={`${stats.avg}%`} icon={<Target size={20} />} color="purple" />
          <StatCard label="Top score" value={`${stats.top}%`} icon={<Trophy size={20} />} color="amber" />
          <StatCard label="Pass rate" value={`${stats.passRate}%`} icon={<CheckCircle2 size={20} />} color="green" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-200">
            <div className="relative flex-1 min-w-48">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={bestOnly} onChange={e => setBestOnly(e.target.checked)} /> Best attempt per student
            </label>
          </div>
          {rows.length === 0 ? (
            <p className="p-10 text-center text-sm text-slate-500">No submissions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-right">Score</th>
                    <th className="px-4 py-3 text-right">%</th>
                    <th className="px-4 py-3 text-center">✓ / ✗ / –</th>
                    <th className="px-4 py-3 text-center">Result</th>
                    <th className="px-4 py-3 text-right">Time</th>
                    <th className="px-4 py-3 text-right">Submitted</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r, i) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{r.student?.full_name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{r.student?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-right font-bold">{Number(r.score)} / {Number(r.total_marks)}</td>
                      <td className="px-4 py-3 text-right">{Number(r.percentage)}%</td>
                      <td className="px-4 py-3 text-center text-xs"><span className="text-emerald-600">{r.correct_count}</span> / <span className="text-rose-600">{r.wrong_count}</span> / <span className="text-slate-400">{r.unanswered_count}</span></td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{r.passed ? 'Pass' : 'Fail'}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs">{fmtDuration(r.time_taken_seconds)}</td>
                      <td className="px-4 py-3 text-right text-xs text-slate-500">{format(new Date(r.submitted_at), 'dd MMM, HH:mm')}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openReview(r)} className="p-1.5 rounded hover:bg-slate-100 text-slate-600" title="View answers"><Eye size={16} /></button>
                        <button onClick={() => setResetting(r)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete attempt (allow retake)"><RotateCcw size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal open={!!reviewing} onClose={() => setReviewing(null)} size="xl"
        title={reviewing ? `${reviewing.student?.full_name || 'Student'} — ${Number(reviewing.score)}/${Number(reviewing.total_marks)}` : ''}>
        <div className="p-6 bg-slate-50">{review ? <ExamReviewList items={review} /> : <LoadingState message="Loading answers..." />}</div>
      </Modal>

      <ConfirmDialog open={!!resetting} danger title="Delete this attempt?" confirmLabel="Delete attempt"
        message={`${resetting?.student?.full_name || 'This student'}'s attempt will be permanently removed, giving them an attempt back.`}
        onConfirm={resetAttempt} onCancel={() => setResetting(null)} />
    </AppLayout>
  )
}
