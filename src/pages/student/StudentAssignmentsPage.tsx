import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, Badge, LoadingState, Button } from '../../components/ui'
import { assignmentService } from '../../services/contentServices'
import { enrollmentService } from '../../services/progressService'

export default function StudentAssignmentsPage() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all')

  useEffect(() => {
    if (!user) return
    const loadAssignments = async () => {
      try {
        setLoading(true)
        const enrs = await enrollmentService.getStudentEnrollments(user.id)
        const subjectIds = new Set(enrs.filter(e => e.subject_id).map(e => e.subject_id!))

        const allAsgns = await assignmentService.getAllForStudent(user.id)
        let myAsgns = allAsgns
        if (subjectIds.size > 0) {
          const filtered = allAsgns.filter((a: any) => {
            const sId = a.chapter_content?.chapter?.subject?.id || a.chapter_content?.chapter?.subject_id
            return subjectIds.has(sId)
          })
          if (filtered.length > 0) myAsgns = filtered
        }

        setAssignments(myAsgns)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadAssignments()
  }, [user])

  if (loading) return <AppLayout><LoadingState message="Loading your assignments..." /></AppLayout>

  const filtered = assignments.filter((a: any) => {
    const studentSub = (a.submissions || []).find((s: any) => s.student_id === user?.id)
    if (filter === 'pending') return !studentSub
    if (filter === 'submitted') return studentSub && studentSub.status === 'submitted'
    if (filter === 'graded') return studentSub && studentSub.status === 'graded'
    return true
  })

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 fade-in space-y-5 sm:space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 sm:gap-2.5">
              <FileText size={22} className="text-blue-600" />
              <span>My Assignments</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Track and submit chapter assignments</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
            {(['all', 'pending', 'submitted', 'graded'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors flex-1 sm:flex-initial text-center ${
                  filter === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filtered.map((asgn: any) => {
              const chap = asgn.chapter_content?.chapter
              const sub = (asgn.submissions || []).find((s: any) => s.student_id === user?.id)
              const isGraded = sub?.status === 'graded'
              const isSubmitted = !!sub

              return (
                <Card key={asgn.id} className="p-4 sm:p-6 hover:shadow-md transition-shadow border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[11px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wider">
                          {chap?.subject?.name || 'Curriculum'} · Chapter {chap?.chapter_number || '1'}
                        </span>
                        <Badge variant={isGraded ? 'success' : isSubmitted ? 'info' : 'warning'}>
                          {isGraded ? 'Graded' : isSubmitted ? 'Submitted' : 'Pending Submission'}
                        </Badge>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900">{asgn.chapter_content?.title || 'Chapter Assignment'}</h3>
                      {asgn.instructions && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{asgn.instructions}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 sm:mt-3 text-[11px] sm:text-xs text-slate-500">
                        {asgn.maximum_marks && <span>Max Marks: <strong>{asgn.maximum_marks}</strong></span>}
                        {asgn.due_date && <span>Due: <strong>{new Date(asgn.due_date).toLocaleDateString()}</strong></span>}
                        {sub?.marks != null && <span className="text-green-700 font-bold">Scored: {sub.marks} / {asgn.maximum_marks}</span>}
                      </div>

                      {sub?.feedback && (
                        <div className="mt-2.5 sm:mt-3 bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 sm:p-3 text-xs text-amber-900">
                          <strong>Feedback:</strong> {sub.feedback}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <Link to={`/student/learning/${chap?.id}`} className="w-full block md:inline-block">
                        <Button variant={isSubmitted ? 'outline' : 'primary'} size="sm" className="w-full md:w-auto justify-center">
                          {isSubmitted ? 'View Submission' : 'Open & Submit'} <ArrowRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white border border-slate-200 rounded-3xl">
            <FileText size={48} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Assignments Found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {filter === 'all'
                ? 'Assignments from your enrolled chapters will appear here once assigned.'
                : `No assignments matching filter "${filter}".`}
            </p>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
