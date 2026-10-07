import { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, TrendingUp, CheckCircle, ChevronRight,
  Play, Sparkles, Flame, Zap, Clock, RotateCw, AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, StatCard, LoadingState, Badge, Button } from '../../components/ui'
import {
  progressService,
  type StudentDashboardData,
  type StudentChapterProgressionItem
} from '../../services/progressService'
import { gamification, type StudentStats } from '../../utils/gamification'
import toast from 'react-hot-toast'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState<StudentDashboardData | null>(null)
  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all')

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (!user) return
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const dashData = await progressService.getStudentDetailedDashboard(user.id, user.organization_id)
      setData(dashData)

      // Sync real gamification stats
      const currentStats = gamification.getStats(user.id)
      setStats(currentStats)
      gamification.syncWithDatabase(user.id, user.organization_id).then(s => setStats(s)).catch(() => {})

      if (isRefresh) {
        toast.success('Curriculum progress refreshed!')
      }
    } catch (err: unknown) {
      console.error('Failed to load student dashboard:', err)
      setError(err instanceof Error ? err.message : 'Failed to load curriculum dashboard')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [user])

  useEffect(() => {
    loadDashboard()

    const handleProgressUpdate = () => {
      loadDashboard()
    }
    const handleEnrollmentUpdate = () => {
      loadDashboard()
    }
    const handleGamificationUpdate = (e: any) => {
      const updated = e?.detail?.stats || (user?.id ? gamification.getStats(user.id) : null)
      if (updated) setStats(updated)
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadDashboard()
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nanjil_enrollment_last_changed' || e.key?.startsWith(`nanjil_enrollment_${user?.id}`)) {
        loadDashboard()
      }
    }

    window.addEventListener('chapter_progress_updated', handleProgressUpdate)
    window.addEventListener('learning_event', handleProgressUpdate)
    window.addEventListener('student_enrollment_updated', handleEnrollmentUpdate)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('class_progression_advanced', handleProgressUpdate)
    window.addEventListener('gamification_stats_updated', handleGamificationUpdate)
    window.addEventListener('focus', handleProgressUpdate)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('chapter_progress_updated', handleProgressUpdate)
      window.removeEventListener('learning_event', handleProgressUpdate)
      window.removeEventListener('student_enrollment_updated', handleEnrollmentUpdate)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('class_progression_advanced', handleProgressUpdate)
      window.removeEventListener('gamification_stats_updated', handleGamificationUpdate)
      window.removeEventListener('focus', handleProgressUpdate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [loadDashboard, user?.id])

  // Filtered assigned chapters
  const filteredChapters = useMemo(() => {
    if (!data?.assignedChapters) return []
    return data.assignedChapters.filter(chap => {
      if (statusFilter === 'completed') return chap.is_completed
      if (statusFilter === 'in_progress') return chap.is_in_progress
      if (statusFilter === 'not_started') return chap.is_not_started
      return true
    })
  }, [data?.assignedChapters, statusFilter])

  // Quick action destination (opens exact current or first assigned chapter)
  const nextDestination = useMemo(() => {
    if (data?.nextLesson?.chapterId) {
      return `/student/learning/${data.nextLesson.chapterId}`
    }
    if (data?.currentChapter?.id) {
      return `/student/learning/${data.currentChapter.id}`
    }
    if (data?.assignedChapters && data.assignedChapters.length > 0) {
      return `/student/learning/${data.assignedChapters[0].id}`
    }
    return null
  }, [data])

  const counts = useMemo(() => {
    const list = data?.assignedChapters || []
    return {
      total: list.length,
      completed: list.filter(c => c.is_completed).length,
      inProgress: list.filter(c => c.is_in_progress).length,
      notStarted: list.filter(c => c.is_not_started).length,
    }
  }, [data?.assignedChapters])

  if (loading) {
    return (
      <AppLayout>
        <LoadingState message="Loading your assigned curriculum..." />
      </AppLayout>
    )
  }

  const assignedClass = data?.assignedClass
  const assignedSubject = data?.assignedSubject
  const hasChapters = (data?.assignedChapters?.length || 0) > 0
  const isAllCompleted = hasChapters && counts.completed === counts.total

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 fade-in max-w-7xl mx-auto">
        {/* Error notification if any */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-red-800 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => loadDashboard()}>
              Retry
            </Button>
          </div>
        )}

        {/* Welcome & Next Lesson Hero */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-20 translate-x-20 blur-2xl pointer-events-none" />
          <div className="absolute right-32 bottom-0 w-40 h-40 bg-blue-400/10 rounded-full translate-y-12 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-blue-200 mb-3 border border-white/10">
                <Sparkles size={13} className="text-yellow-300" />
                <span className="truncate max-w-[240px] sm:max-w-none">
                  {assignedClass ? `Assigned: ${assignedClass.name}` : 'Enrolled Student'}
                  {assignedSubject ? ` • ${assignedSubject.name}` : ''}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 text-white">
                Welcome back, {user?.profile?.full_name?.split(' ')[0] || 'Student'}!
              </h1>

              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                {data?.nextLesson ? (
                  <>
                    Next Up: <strong className="text-white">{data.nextLesson.chapterTitle}</strong> — {data.nextLesson.contentTitle}
                  </>
                ) : isAllCompleted ? (
                  'Congratulations! You have completed all assigned chapters in your curriculum.'
                ) : hasChapters ? (
                  'Begin your assigned curriculum and master every lesson step-by-step.'
                ) : (
                  'Your curriculum is being prepared by your instructor. Please check back shortly.'
                )}
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                {nextDestination ? (
                  <Link to={nextDestination} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all shadow-md active:scale-98 cursor-pointer">
                      <Play size={15} className="fill-blue-900 text-blue-900" />
                      {(data?.overallPercentage || 0) > 0 ? 'Resume Next Lesson' : 'Start First Lesson'}
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => loadDashboard(true)}
                    disabled={refreshing}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <RotateCw size={15} className={refreshing ? 'animate-spin' : ''} />
                    Check for Assignments
                  </button>
                )}

                <button
                  onClick={() => loadDashboard(true)}
                  disabled={refreshing}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl sm:rounded-2xl hover:bg-white/20 transition-colors border border-white/15 active:scale-98 cursor-pointer"
                >
                  <RotateCw size={14} className={refreshing ? 'animate-spin' : ''} />
                  <span>Refresh Progress</span>
                </button>
              </div>
            </div>

            {/* Progress Gauge Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 w-full lg:w-auto lg:min-w-[240px] text-center flex-shrink-0">
              <p className="text-[11px] sm:text-xs font-semibold text-blue-200 uppercase tracking-wider">
                Curriculum Mastery
              </p>
              <div className="text-4xl font-black text-white my-1.5">
                {data?.overallPercentage || 0}%
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden mb-2">
                <div
                  className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${data?.overallPercentage || 0}%` }}
                />
              </div>
              <p className="text-[11px] text-blue-100">
                {data?.completedChapters || 0} of {data?.totalChapters || 0} Chapters Completed
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="Completed Chapters"
            value={`${data?.completedChapters || 0} / ${data?.totalChapters || 0}`}
            icon={<CheckCircle size={20} />}
            color="green"
          />
          <StatCard
            label="Overall Progress"
            value={`${data?.overallPercentage || 0}%`}
            icon={<TrendingUp size={20} />}
            color="blue"
          />
          <StatCard
            label="Total Earned XP"
            value={`${stats.xp} XP`}
            icon={<Zap size={20} className="fill-amber-500 text-amber-500" />}
            color="amber"
          />
          <StatCard
            label="Active Streak"
            value={`${stats.streak} Days`}
            icon={<Flame size={20} className="fill-orange-500 text-orange-500" />}
            color="purple"
          />
        </div>

        {/* ─── MY ASSIGNED CURRICULUM (Shows ONLY assigned chapters) ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                  <BookOpen size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  My Assigned Curriculum
                </h2>
                {assignedClass && (
                  <Badge variant="info" className="ml-1 font-semibold text-xs">
                    {assignedClass.name}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {hasChapters
                  ? `Showing only the ${counts.total} chapters assigned to your learning path.`
                  : 'Currently enrolled curriculum and assigned chapters.'}
              </p>
            </div>

            {/* Quick Status Filter Tabs (Only shown if chapters are assigned) */}
            {hasChapters && (
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    statusFilter === 'all'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({counts.total})
                </button>
                <button
                  onClick={() => setStatusFilter('in_progress')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    statusFilter === 'in_progress'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  In Progress ({counts.inProgress})
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    statusFilter === 'completed'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Completed ({counts.completed})
                </button>
              </div>
            )}
          </div>

          {/* EMPTY STATE: Student has no assigned curriculum/chapters */}
          {!hasChapters && (
            <Card className="p-10 sm:p-14 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <BookOpen size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No Curriculum Assigned Yet
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
                Your administrator has not assigned any chapters to your account yet.
                Once you are enrolled into a class or subject, your assigned chapters and progress will appear here automatically.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  onClick={() => loadDashboard(true)}
                  variant="outline"
                  icon={<RotateCw size={15} className={refreshing ? 'animate-spin' : ''} />}
                >
                  Refresh Dashboard
                </Button>
              </div>
            </Card>
          )}

          {/* CHAPTERS GRID: Shows ONLY assigned chapters for this student */}
          {hasChapters && (
            <>
              {filteredChapters.length === 0 ? (
                <Card className="p-8 text-center bg-white border border-slate-200 rounded-2xl">
                  <p className="text-slate-500 text-sm">
                    No chapters match the selected filter.
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setStatusFilter('all')}
                    className="mt-2 text-blue-600 font-semibold"
                  >
                    View All ({counts.total}) Chapters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredChapters.map((chap: StudentChapterProgressionItem, idx: number) => {
                    return (
                      <Link
                        key={chap.id}
                        to={`/student/learning/${chap.id}`}
                        className="flex flex-col group focus:outline-none"
                      >
                        <Card className="h-full p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-200 hover:border-blue-400 group-hover:-translate-y-0.5 rounded-2xl bg-white">
                          <div>
                            {/* Card Top Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  Ch.{chap.chapter_number || idx + 1}
                                </span>
                                {chap.subject_name && (
                                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]">
                                    {chap.subject_name}
                                  </span>
                                )}
                              </div>

                              {/* Real-time Status Badge */}
                              {chap.is_completed ? (
                                <Badge variant="success" className="font-semibold text-[11px] flex items-center gap-1">
                                  <CheckCircle size={12} /> Completed
                                </Badge>
                              ) : chap.is_in_progress ? (
                                <Badge variant="info" className="font-semibold text-[11px]">
                                  In Progress ({chap.percentage}%)
                                </Badge>
                              ) : (
                                <Badge variant="default" className="text-slate-500 font-medium text-[11px]">
                                  Ready to Learn
                                </Badge>
                              )}
                            </div>

                            {/* Chapter Title */}
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-base">
                              {chap.title}
                            </h3>

                            {/* Chapter Description */}
                            {chap.short_description && (
                              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed min-h-[32px]">
                                {chap.short_description}
                              </p>
                            )}
                          </div>

                          {/* Progress and Footer */}
                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                              <span>
                                {chap.completedSections} of {chap.totalSections} Sections Complete
                              </span>
                              <span className="font-bold text-slate-700">
                                {chap.percentage}%
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  chap.is_completed
                                    ? 'bg-emerald-500'
                                    : chap.is_in_progress
                                    ? 'bg-blue-600'
                                    : 'bg-transparent'
                                }`}
                                style={{ width: `${chap.percentage}%` }}
                              />
                            </div>

                            {/* Card Action Link */}
                            <div className="flex items-center justify-between pt-2 text-xs">
                              <span className="text-slate-400 flex items-center gap-1">
                                <Clock size={12} />
                                {chap.estimated_duration ? `${chap.estimated_duration} min` : 'Self-paced'}
                              </span>
                              <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                {chap.is_completed
                                  ? 'Review Chapter'
                                  : chap.is_in_progress
                                  ? 'Resume Learning'
                                  : 'Start Chapter'}
                                <ChevronRight size={13} />
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
