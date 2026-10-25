import { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, BarChart3, CheckCircle2, ChevronRight,
  Play, RotateCw, AlertCircle, Zap, Flame, Clock, Sparkles
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { LoadingState } from '../../components/ui'
import {
  progressService,
  type StudentDashboardData
} from '../../services/progressService'
import { gamification, type StudentStats } from '../../utils/gamification'
import toast from 'react-hot-toast'

export default function StudentDashboard() {
  const { user } = useAuth()
  
  // Instant cache retrieval so student home loads in 0ms without showing loading state
  const [data, setData] = useState<StudentDashboardData | null>(() => {
    try {
      // Check for user-specific cache or fallback recent cache
      if (user?.id) {
        const cached = localStorage.getItem(`student_dash_cache_${user.id}`)
        if (cached) return JSON.parse(cached)
      }
      // Or check if any recent student dashboard is cached
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('student_dash_cache_')) {
          const val = localStorage.getItem(key)
          if (val) return JSON.parse(val)
        }
      }
    } catch {
      // Fallback
    }
    return null
  })

  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))
  // If we have cached data, don't show full-screen blocking loader
  const [loading, setLoading] = useState<boolean>(() => {
    try {
      if (user?.id && localStorage.getItem(`student_dash_cache_${user.id}`)) return false
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('student_dash_cache_')) return false
      }
    } catch {}
    return true
  })
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (!user) return
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else if (!data) {
        setLoading(true)
      }
      setError(null)

      const dashData = await progressService.getStudentDetailedDashboard(user.id, user.organization_id)
      setData(dashData)

      // Save to localStorage for instant 0ms load next time
      try {
        localStorage.setItem(`student_dash_cache_${user.id}`, JSON.stringify(dashData))
      } catch {
        // Ignore quota errors
      }

      // Sync real gamification stats
      const currentStats = gamification.getStats(user.id)
      setStats(currentStats)
      gamification.syncWithDatabase(user.id, user.organization_id).then(s => setStats(s)).catch(() => {})

      if (isRefresh) {
        toast.success('Curriculum progress refreshed!')
      }
    } catch (err: unknown) {
      console.error('Failed to load student dashboard:', err)
      if (!data) {
        setError(err instanceof Error ? err.message : 'Failed to load curriculum dashboard')
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [user, data])

  useEffect(() => {
    loadDashboard()

    const handleProgressUpdate = () => loadDashboard()
    const handleEnrollmentUpdate = () => loadDashboard()
    const handleGamificationUpdate = (e: any) => {
      const updated = e?.detail?.stats || (user?.id ? gamification.getStats(user.id) : null)
      if (updated) setStats(updated)
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

    return () => {
      window.removeEventListener('chapter_progress_updated', handleProgressUpdate)
      window.removeEventListener('learning_event', handleProgressUpdate)
      window.removeEventListener('student_enrollment_updated', handleEnrollmentUpdate)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('class_progression_advanced', handleProgressUpdate)
      window.removeEventListener('gamification_stats_updated', handleGamificationUpdate)
    }
  }, [loadDashboard])

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
    return '/student/learning'
  }, [data])

  const counts = useMemo(() => {
    const list = data?.assignedChapters || []
    return {
      total: list.length || data?.totalChapters || 6,
      completed: list.filter(c => c.is_completed).length || data?.completedChapters || 0,
      inProgress: list.filter(c => c.is_in_progress).length,
      notStarted: list.filter(c => c.is_not_started).length,
    }
  }, [data])

  if (loading) {
    return (
      <AppLayout>
        <LoadingState message="Loading your assigned curriculum..." />
      </AppLayout>
    )
  }

  const assignedClass = data?.assignedClass
  const assignedSubject = data?.assignedSubject
  const studentFirstName = user?.profile?.full_name?.split(' ')[0] || 'Andrew'
  const overallPercentage = data?.overallPercentage ?? 0

  // Formulate dynamic track & lesson details to mirror the exact inspiration layout
  const trackLabel = assignedClass?.name
    ? `Assigned: ${assignedClass.name}${assignedSubject?.name ? ` • ${assignedSubject.name}` : ''}`
    : 'Assigned: UG 3rd Year • Deep Learning, NLP & Enterprise LLM Engineering'

  const nextLessonSubtitle = data?.nextLesson
    ? `Next Up: ${data.nextLesson.chapterTitle} — ${data.nextLesson.contentTitle}`
    : (data?.assignedChapters && data.assignedChapters.length > 0
        ? `Next Up: Chapter ${data.assignedChapters[0].chapter_number} — ${data.assignedChapters[0].title} — Start Section 1`
        : 'Next Up: Chapter 1 — AI DISCOVER: Generative Intelligence, Inside LLMs & Multi-Head Attention & KV Caching — Start Section 1')

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Error notification if any */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-red-800 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadDashboard()}
              className="text-xs font-bold text-red-700 underline hover:text-red-900 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* ─── HERO BANNER (Exact Inspiration Layout) ─── */}
        <div className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-white via-[#f7f9ff] to-[#edf3fe] border border-blue-100/80 shadow-[0_12px_40px_rgba(37,99,235,0.04)] p-6 sm:p-8 lg:p-10 overflow-hidden">
          {/* Subtle decorative background glow & waves */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 bottom-0 w-64 h-64 bg-indigo-300/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Column: Greeting, Next Up & Actions */}
            <div className="w-full lg:max-w-xl text-left">
              {/* Assigned Track Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-[#f0f3ff] text-[#4338ca] border border-[#e0e7ff] px-3.5 py-1 rounded-full text-xs font-semibold mb-4 shadow-2xs">
                <span className="text-amber-500 text-sm leading-none">☆</span>
                <span className="truncate">{trackLabel}</span>
              </div>

              {/* Big Greeting */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Welcome back,<br />
                <span className="text-[#2563eb]">{studentFirstName}!</span>
              </h1>

              {/* Next Up Lesson Subtitle */}
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-6 max-w-lg">
                {nextLessonSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link to={nextDestination} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#0e1726] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer">
                    <Play size={13} className="fill-white text-white" />
                    <span>{overallPercentage > 0 ? 'Resume Next Lesson' : 'Start First Lesson'}</span>
                  </button>
                </Link>

                <button
                  onClick={() => loadDashboard(true)}
                  disabled={refreshing}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-2xs transition-all active:scale-98 cursor-pointer"
                >
                  <RotateCw size={14} className={refreshing ? 'animate-spin' : ''} />
                  <span>Refresh Progress</span>
                </button>
              </div>
            </div>

            {/* Right Column: Curriculum Mastery Card */}
            <div className="flex items-center justify-center w-full lg:w-auto flex-shrink-0">
              {/* Floating Curriculum Mastery Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full sm:w-auto sm:min-w-[240px] text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Curriculum Mastery
                </p>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-2.5">
                  {overallPercentage}%
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2.5">
                  <div
                    className="bg-[#2563eb] h-full rounded-full transition-all duration-700"
                    style={{ width: `${overallPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {counts.completed} of {counts.total} Chapters Completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── QUICK STATS ROW (4 Cards) ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Completed Chapters */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Completed Chapters</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {counts.completed} / {counts.total}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100/60 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
          </div>

          {/* Card 2: Overall Progress */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Overall Progress</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {overallPercentage}%
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#2563eb] border border-blue-100/60 flex items-center justify-center shrink-0">
              <BarChart3 size={20} />
            </div>
          </div>

          {/* Card 3: Total Earned XP */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Total Earned XP</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {stats.xp} XP
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 border border-amber-100/60 flex items-center justify-center shrink-0">
              <Zap size={20} className="fill-amber-500" />
            </div>
          </div>

          {/* Card 4: Active Streak */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Active Streak</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {stats.streak} Days
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 border border-rose-100/60 flex items-center justify-center shrink-0">
              <Flame size={20} className="fill-rose-500" />
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ROW CARDS (2 Cards) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Card 1: Enrolled Curriculum Track */}
          <Link
            to="/student/learning"
            className="bg-white hover:bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/70 flex items-center justify-center text-indigo-600 mr-3.5 shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-950 truncate">
                ENROLLED CURRICULUM TRACK
              </span>
            </div>
            <div className="shrink-0 ml-3">
              <span className="bg-[#eef4ff] text-[#2563eb] border border-blue-100/80 text-xs font-bold px-3 py-1 rounded-full">
                {assignedClass?.name || 'UG 3rd Year'}
              </span>
            </div>
          </Link>

          {/* Card 2: Learning Milestone */}
          <Link
            to="/student/progress"
            className="bg-white hover:bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/70 flex items-center justify-center text-blue-600 mr-3.5 shrink-0 group-hover:scale-105 transition-transform">
                <Clock size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 truncate">
                LEARNING MILESTONE
              </span>
            </div>
            <div className="shrink-0 ml-3">
              <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
