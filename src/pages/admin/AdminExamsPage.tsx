import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import {
  Plus, GraduationCap, Pencil, Trash2, BarChart3, Send, Lock, Unlock, Clock, FileQuestion, EyeOff,
} from 'lucide-react'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button, ConfirmDialog, EmptyState, ErrorState, LoadingState } from '../../components/ui'
import { examService, type Exam, type ExamStatus } from '../../services/examService'

const STATUS_STYLE: Record<ExamStatus, string> = {
  draft: 'bg-slate-100 text-slate-700',
  published: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-rose-100 text-rose-700',
}

export default function AdminExamsPage() {
  const navigate = useNavigate()
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | ExamStatus>('all')
  const [toDelete, setToDelete] = useState<Exam | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setExams(await examService.listAll())
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const changeStatus = async (exam: Exam, status: ExamStatus) => {
    if (status === 'published' && !exam.question_count) {
      toast.error('Add questions before publishing')
      return
    }
    try {
      await examService.setStatus(exam.id, status)
      toast.success(status === 'published' ? 'Exam published' : status === 'closed' ? 'Exam closed' : 'Moved to draft')
      load()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const confirmDelete = async () => {
    if (!toDelete) return
    setBusy(true)
    try {
      await examService.remove(toDelete.id)
      toast.success('Exam deleted')
      setToDelete(null)
      load()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const visible = filter === 'all' ? exams : exams.filter(e => e.status === filter)

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><GraduationCap className="text-blue-600" /> Exams</h1>
            <p className="text-sm text-slate-500">Create multiple-choice exams, publish them to students and review results.</p>
          </div>
          <Button icon={<Plus size={16} />} onClick={() => navigate('/admin/exams/new')}>Create Exam</Button>
        </div>

        <div className="flex gap-2">
          {(['all', 'draft', 'published', 'closed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              {f} {f === 'all' ? `(${exams.length})` : `(${exams.filter(e => e.status === f).length})`}
            </button>
          ))}
        </div>

        {loading ? <LoadingState message="Loading exams..." /> : error ? <ErrorState message={error} onRetry={load} /> : visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200">
            <EmptyState icon={<FileQuestion size={48} />} title="No exams yet" description="Create your first multiple-choice exam."
              action={{ label: 'Create Exam', onClick: () => navigate('/admin/exams/new') }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visible.map(exam => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{exam.title}</h3>
                    <p className="text-xs text-slate-500">{exam.class?.name || 'All students'}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_STYLE[exam.status]}`}>{exam.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 py-2"><p className="text-lg font-black text-slate-900">{exam.question_count}</p><p className="text-[11px] text-slate-500">Questions</p></div>
                  <div className="rounded-xl bg-slate-50 py-2"><p className="text-lg font-black text-slate-900">{Number(exam.total_marks)}</p><p className="text-[11px] text-slate-500">Marks</p></div>
                  <div className="rounded-xl bg-slate-50 py-2"><p className="text-lg font-black text-slate-900">{exam.duration_minutes ? `${exam.duration_minutes}m` : '∞'}</p><p className="text-[11px] text-slate-500">Duration</p></div>
                </div>
                {(exam.start_at || exam.end_at) && (
                  <p className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12} />
                    {exam.start_at ? format(new Date(exam.start_at), 'dd MMM yyyy, HH:mm') : 'Now'} → {exam.end_at ? format(new Date(exam.end_at), 'dd MMM yyyy, HH:mm') : 'No end'}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
                  <Link to={`/admin/exams/${exam.id}/edit`}><Button size="sm" variant="outline" icon={<Pencil size={14} />}>Edit</Button></Link>
                  <Link to={`/admin/exams/${exam.id}/results`}><Button size="sm" variant="outline" icon={<BarChart3 size={14} />}>Results</Button></Link>
                  {exam.status !== 'published' && <Button size="sm" variant="secondary" icon={exam.status === 'closed' ? <Unlock size={14} /> : <Send size={14} />} onClick={() => changeStatus(exam, 'published')}>{exam.status === 'closed' ? 'Reopen' : 'Publish'}</Button>}
                  {exam.status === 'published' && <Button size="sm" variant="secondary" icon={<Lock size={14} />} onClick={() => changeStatus(exam, 'closed')}>Close</Button>}
                  {exam.status === 'published' && <Button size="sm" variant="ghost" icon={<EyeOff size={14} />} onClick={() => changeStatus(exam, 'draft')}>Unpublish</Button>}
                  <Button size="sm" variant="ghost" className="ml-auto text-red-600" icon={<Trash2 size={14} />} onClick={() => setToDelete(exam)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog open={!!toDelete} title="Delete exam?" danger loading={busy} confirmLabel="Delete"
        message={`"${toDelete?.title}" and all its questions and student results will be permanently deleted.`}
        onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />
    </AppLayout>
  )
}
