import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, LoadingState } from '../../components/ui'
import { TrendingUp, CheckCircle, Clock, Star, BookOpen } from 'lucide-react'
import { progressService, enrollmentService, formatProgressPercentage } from '../../services/progressService'

export default function StudentProgressPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ completed: 0, totalTime: 0, quizAvg: 0, totalItems: 0 })
  const [chapterList, setChapterList] = useState<Array<{
    index: number
    key: string
    code: string
    title: string
    totalPages: number
    completedPages: number
    percentage: number
    isCompleted: boolean
  }>>([])
  const [loading, setLoading] = useState(true)

  const loadProgressData = useCallback(async () => {
    if (!user) return
    try {
      const assigned = await enrollmentService.getStudentAssignedGrade(user.id, user.organization_id)
      const gradeKey = assigned?.gradeKey || 'class3'

      const [overall, chapters] = await Promise.all([
        progressService.getStudentOverallProgress(user.id, user.organization_id),
        progressService.getAllChaptersProgress(user.id, gradeKey),
      ])

      setStats(overall)
      setChapterList(chapters)
    } catch (err) {
      console.warn('Could not load student progress data:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadProgressData()

    let debounceTimer: any = null
    const handleUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        loadProgressData()
      }, 150)
    }
    window.addEventListener('chapter_progress_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      window.removeEventListener('chapter_progress_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [loadProgressData])

  const progressPct = formatProgressPercentage(stats.completed, stats.totalItems).numeric
  const hours = Math.floor(stats.totalTime / 3600)
  const minutes = Math.floor((stats.totalTime % 3600) / 60)

  if (loading) return <AppLayout><LoadingState /></AppLayout>

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 fade-in max-w-5xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Progress</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Track your authentic learning journey across all chapters</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="p-4 sm:p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{progressPct}%</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Overall Progress</p>
          </Card>
          <Card className="p-4 sm:p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.completed}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Pages Completed</p>
          </Card>
          <Card className="p-4 sm:p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Clock size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{hours > 0 ? `${hours}h` : `${minutes}m`}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Learning Time</p>
          </Card>
          <Card className="p-4 sm:p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Star size={20} className="text-amber-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.quizAvg > 0 ? `${Math.round(stats.quizAvg)}%` : 'N/A'}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Quiz Average</p>
          </Card>
        </div>

        {/* Overall progress bar */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">Overall Completion</h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 progress-bar" style={{ height: '10px' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700 w-10 sm:w-12 text-right">{progressPct}%</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-3">{stats.completed} of {stats.totalItems} pages completed across all chapters</p>
        </Card>

        {/* Individual Chapter Progress Breakdown */}
        {chapterList.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
              Individual Chapter Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {chapterList.map((ch) => (
                <Card key={ch.key} className="p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {ch.code}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">
                        {ch.title}
                      </h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      ch.isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {ch.isCompleted ? 'Completed ✓' : `${ch.percentage}%`}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{ch.completedPages} of {ch.totalPages} pages</span>
                      <span className="font-semibold text-slate-700">{ch.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          ch.isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${ch.percentage}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {stats.totalItems === 0 && (
          <Card className="p-12 text-center">
            <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Start learning to see your progress here!</p>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
