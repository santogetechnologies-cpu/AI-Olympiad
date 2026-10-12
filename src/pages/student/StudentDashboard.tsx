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

        {/* ─── Clean Home Workspace Overview & Learning Navigation ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Action Banner: Jump to Learn */}
          <Card className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
                  <BookOpen size={13} />
                  <span>Enrolled Curriculum Track</span>
                </span>
                {assignedClass && (
                  <Badge variant="info" className="font-bold text-xs">
                    {assignedClass.name}
                  </Badge>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {assignedSubject?.name || 'Junior AI & Playful Logic Track'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Your learning curriculum contains {counts.total || 8} structured chapters with hands-on discovery activities, scenario missions, and interactive digital book pages.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/student/learning"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <BookOpen size={17} />
                <span>Open Learn & Chapters</span>
                <ChevronRight size={16} />
              </Link>

              <Link
                to="/student/progress"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-5 py-3 rounded-2xl transition-colors cursor-pointer"
              >
                <TrendingUp size={16} />
                <span>View Full Progress</span>
              </Link>
            </div>
          </Card>

          {/* Quick Stats Summary Card */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                Learning Milestone
              </span>
              <h3 className="text-lg font-black mt-3 text-white">
                Olympiad Readiness
              </h3>
              <p className="text-xs text-blue-200/80 mt-1 leading-relaxed">
                Complete all chapter activities to earn your official AI Olympiad certificate.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-200">Chapters Completed</span>
                <span className="font-black text-white">{counts.completed} / {counts.total || 8}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${data?.overallPercentage || 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-blue-300">
                <span>Overall Mastery</span>
                <span className="font-bold text-emerald-400">{data?.overallPercentage || 0}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
