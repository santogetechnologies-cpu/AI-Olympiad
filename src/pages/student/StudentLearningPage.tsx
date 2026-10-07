import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen, ChevronRight, Search, CheckCircle, Clock, Sparkles,
  GraduationCap, Play, Zap, Compass, Filter, Flame,
  Video, FileEdit, Gamepad2, FlaskConical, Trophy
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, LoadingState, Badge } from '../../components/ui'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterService } from '../../services/chapterService'
import { progressService, enrollmentService } from '../../services/progressService'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import { getIllustrationForTopic } from '../../services/curriculumVisuals'
import { gamification, type StudentStats } from '../../utils/gamification'
import type { Class, Subject, Chapter } from '../../types'
import toast from 'react-hot-toast'

export default function StudentLearningPage() {
  const { user } = useAuth()
  const location = useLocation()

  const [myClass, setMyClass] = useState<Class | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))
  const [chapterProgress, setChapterProgress] = useState<Record<string, { percentage: number; completed: boolean; completedSections?: number; totalSections?: number }>>({})
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all')
  const [loading, setLoading] = useState(true)

  const loadEnrolledCurriculum = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)
      let enrs = await enrollmentService.getAllStudentEnrollments(user.id)
      
      // If student has no DB enrollments yet, initialize their first active enrollment
      if (enrs.length === 0) {
        const initialEnr = await enrollmentService.ensureInitialEnrollment(user.id, user.organization_id)
        if (initialEnr) {
          enrs = [initialEnr]
        }
      }

      const [loadedClasses, allSubjects] = await Promise.all([
        classService.getAll(user.organization_id),
        subjectService.getAll(user.organization_id),
      ])

      const allLevelsData = curriculumCatalogService.getAllLevelsData()
      const mappedClassIds = new Set<string>()
      const mergedClasses: Class[] = allLevelsData.map((lvl, idx) => {
        const found = loadedClasses.find(c =>
          c.name.toLowerCase().replace(/[\s-_]/g, '') === lvl.name.toLowerCase().replace(/[\s-_]/g, '') ||
          (c.code && lvl.code && c.code.toLowerCase().replace(/[\s-_]/g, '') === lvl.code.toLowerCase().replace(/[\s-_]/g, '')) ||
          c.name.toLowerCase().includes(lvl.name.toLowerCase())
        )
        if (found) {
          mappedClassIds.add(found.id)
          return found
        }
        return {
          id: `cat-cls-${lvl.gradeKey}`,
          organization_id: user.organization_id,
          category_id: `cat-${lvl.gradeKey}`,
          name: lvl.name,
          code: lvl.code,
          status: 'published' as const,
          display_order: idx + 1,
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      })

      // Include all database classes created by Admin/Content Manager
      loadedClasses.forEach(c => {
        if (!mappedClassIds.has(c.id) && c.status !== 'archived') {
          mergedClasses.push(c)
        }
      })

      const activeEnrollments = enrs.filter(e => e.status === 'active')
      // Strictly prioritize the latest active enrollment; never show completed class as active
      const targetActiveEnr = activeEnrollments.length > 0
        ? activeEnrollments[activeEnrollments.length - 1]
        : enrs.find(e => e.status !== 'completed') || enrs[enrs.length - 1]
      let enrolledClass: Class | null = null

      if (targetActiveEnr) {
        const cleanTargetName = targetActiveEnr.class?.name?.toLowerCase().replace(/[\s-_]/g, '')
        const cleanTargetCode = targetActiveEnr.class?.code?.toLowerCase().replace(/[\s-_]/g, '')

        enrolledClass = mergedClasses.find(c =>
          c.id === targetActiveEnr.class_id ||
          (cleanTargetName && c.name.toLowerCase().replace(/[\s-_]/g, '') === cleanTargetName) ||
          (cleanTargetCode && c.code && c.code.toLowerCase().replace(/[\s-_]/g, '') === cleanTargetCode) ||
          (cleanTargetName && c.name.toLowerCase().includes(cleanTargetName))
        ) || null
      }

      if (!enrolledClass && mergedClasses.length > 0) {
        enrolledClass = mergedClasses[0]
      }

      setMyClass(enrolledClass)

      const activeSubjects = allSubjects.filter(s => s.status !== 'archived')
      const targetClassId = enrolledClass?.id || mergedClasses[0]?.id

      let filteredSubs = activeSubjects.filter(s => s.class_id === targetClassId)
      if (filteredSubs.length === 0 && targetClassId) {
        const lvl =
          curriculumCatalogService.getLevelData(enrolledClass?.name) ||
          curriculumCatalogService.getLevelData(enrolledClass?.code) ||
          curriculumCatalogService.getLevelData(targetClassId) ||
          allLevelsData[0]

        filteredSubs = [
          {
            id: `cat-sub-${lvl.gradeKey}`,
            organization_id: user.organization_id,
            class_id: enrolledClass?.id || `cat-cls-${lvl.gradeKey}`,
            name: lvl.subjectName,
            code: lvl.subjectCode,
            description: lvl.description,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
      } else if (targetActiveEnr?.subject_id) {
        const matched = activeSubjects.filter(s => s.id === targetActiveEnr.subject_id)
        if (matched.length > 0) filteredSubs = matched
      }

      setSubjects(filteredSubs)

      // Check for state pre-selection
      const stateSubjectId = (location.state as any)?.subjectId
      if (stateSubjectId) {
        const found = filteredSubs.find(s => s.id === stateSubjectId)
        if (found) setSelectedSubject(found)
      } else if (filteredSubs.length > 0) {
        setSelectedSubject(filteredSubs[0])
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to load enrolled curriculum')
    } finally {
      setLoading(false)
    }
  }, [user, location.state])

  useEffect(() => {
    loadEnrolledCurriculum()
    if (user?.id) {
      gamification.syncWithDatabase(user.id, user.organization_id).then(s => setStats(s)).catch(() => {})
    }

    const handleClassAdvanced = (e: any) => {
      const detail = e?.detail
      if (detail?.nextClass) {
        toast.success(`Level Unlocked: ${detail.nextClass}!`, { duration: 6000 })
      }
      loadEnrolledCurriculum()
    }
    const handleGamificationUpdate = (e: any) => {
      const updated = e?.detail?.stats || (user?.id ? gamification.getStats(user.id) : null)
      if (updated) setStats(updated)
    }
    const handleEnrollmentUpdate = (e: any) => {
      const updatedStudentId = e?.detail?.studentId
      if (!updatedStudentId || updatedStudentId === user?.id) {
        loadEnrolledCurriculum()
      }
    }
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nanjil_enrollment_last_changed' || e.key?.startsWith(`nanjil_enrollment_${user?.id}`)) {
        loadEnrolledCurriculum()
      }
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadEnrolledCurriculum()
      }
    }

    window.addEventListener('class_progression_advanced', handleClassAdvanced)
    window.addEventListener('gamification_stats_updated', handleGamificationUpdate)
    window.addEventListener('student_enrollment_updated', handleEnrollmentUpdate)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleVisibility)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('class_progression_advanced', handleClassAdvanced)
      window.removeEventListener('gamification_stats_updated', handleGamificationUpdate)
      window.removeEventListener('student_enrollment_updated', handleEnrollmentUpdate)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleVisibility)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [loadEnrolledCurriculum, user?.id, user?.organization_id])

  // Load chapters and calculate progress when subject selected
  useEffect(() => {
    if (!selectedSubject || !user) {
      setChapters([])
      return
    }

    const studentId = user?.id || 'guest-student'

    const computeChapterProgress = (chapList: Chapter[]) => {
      const progMap: Record<string, { percentage: number; completed: boolean; completedSections?: number; totalSections?: number }> = {}
      for (const ch of chapList) {
        let pct = 0
        let completed = false
        let doneSecs = 0
        const totalSecs = 8
        try {
          const stored = localStorage.getItem(`progress_${studentId}_${ch.id}`)
          if (stored) {
            const arr = JSON.parse(stored)
            doneSecs = Array.isArray(arr) ? Math.min(totalSecs, arr.length) : 0
            pct = Math.min(100, Math.round((doneSecs / totalSecs) * 1000) / 10)
            completed = doneSecs >= totalSecs
          }
        } catch {}

        progMap[ch.id] = {
          percentage: completed ? 100 : pct,
          completed: completed,
          completedSections: doneSecs,
          totalSections: totalSecs,
        }
      }
      return progMap
    }

    const loadFallbackChapters = async () => {
      const allLevelsData = curriculumCatalogService.getAllLevelsData()
      const lvl =
        curriculumCatalogService.getLevelData(selectedSubject.name) ||
        curriculumCatalogService.getLevelData(selectedSubject.code) ||
        curriculumCatalogService.getLevelData(selectedSubject.id) ||
        curriculumCatalogService.getLevelData(myClass?.name) ||
        curriculumCatalogService.getLevelData(myClass?.code) ||
        curriculumCatalogService.getLevelData(myClass?.id) ||
        allLevelsData[0]

      const synChaps: Chapter[] = lvl.chapters.map(c => ({
        id: `cat-${lvl.gradeKey}-${c.chapterNumber}`,
        organization_id: user?.organization_id || '',
        subject_id: selectedSubject.id,
        title: c.chapterTitle,
        chapter_number: c.chapterNumber,
        short_description: c.shortDescription,
        description: c.description,
        status: 'published' as const,
        estimated_duration: c.duration,
        display_order: parseInt(c.chapterNumber, 10),
        created_by: 'system',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      setChapters(synChaps)
      const progMap = computeChapterProgress(synChaps)
      setChapterProgress(progMap)
    }

    if (!selectedSubject.id.startsWith('cat-') && user?.organization_id) {
      chapterService.getPublished(user.organization_id, selectedSubject.id).then(async chaps => {
        if (chaps.length > 0) {
          setChapters(chaps)
          const progMap = computeChapterProgress(chaps)
          for (const ch of chaps) {
            if (!progMap[ch.id]?.completed && user?.id) {
              try {
                const prog = await progressService.getChapterProgress(user.id, ch.id)
                if (prog.percentage > (progMap[ch.id]?.percentage || 0)) {
                  const isDone = prog.percentage === 100 || prog.completed >= (prog.total || 8)
                  progMap[ch.id] = {
                    percentage: isDone ? 100 : prog.percentage,
                    completed: isDone,
                    completedSections: isDone ? 8 : prog.completed,
                    totalSections: 8,
                  }
                }
              } catch {}
            }
          }
          setChapterProgress({ ...progMap })
        } else {
          loadFallbackChapters()
        }
      }).catch(() => loadFallbackChapters())
    } else {
      loadFallbackChapters()
    }
  }, [selectedSubject, user, myClass])

  // Real-time synchronization when returning from chapter view or storage update
  useEffect(() => {
    const studentId = user?.id || 'guest-student'
    const syncProgress = () => {
      if (chapters.length === 0) return
      setChapterProgress(prev => {
        const updated = { ...prev }
        let changed = false
        for (const ch of chapters) {
          try {
            const stored = localStorage.getItem(`progress_${studentId}_${ch.id}`)
            if (stored) {
              const arr = JSON.parse(stored)
              const totalSecs = 8
              const doneSecs = Array.isArray(arr) ? Math.min(totalSecs, arr.length) : 0
              const pct = Math.min(100, Math.round((doneSecs / totalSecs) * 1000) / 10)
              const isCompleted = doneSecs >= totalSecs
              const finalPct = isCompleted ? 100 : pct
              if (
                !updated[ch.id] ||
                updated[ch.id].percentage !== finalPct ||
                updated[ch.id].completed !== isCompleted ||
                updated[ch.id].completedSections !== doneSecs
              ) {
                updated[ch.id] = {
                  percentage: finalPct,
                  completed: isCompleted,
                  completedSections: doneSecs,
                  totalSections: totalSecs,
                }
                changed = true
              }
            }
          } catch {}
        }
        return changed ? updated : prev
      })
    }

    window.addEventListener('focus', syncProgress)
    window.addEventListener('storage', syncProgress)
    window.addEventListener('chapter_progress_updated', syncProgress)

    return () => {
      window.removeEventListener('focus', syncProgress)
      window.removeEventListener('storage', syncProgress)
      window.removeEventListener('chapter_progress_updated', syncProgress)
    }
  }, [chapters, user])

  // Aggregate metrics
  const totalChaptersCount = chapters.length
  const completedChaptersCount = Object.values(chapterProgress).filter(p => p.completed).length
  const overallMastery = totalChaptersCount > 0
    ? Math.round((Object.values(chapterProgress).reduce((acc, curr) => acc + curr.percentage, 0)) / totalChaptersCount)
    : 0

  // Find Continue Learning Chapter
  const continueChapter = useMemo(() => {
    if (chapters.length === 0) return null
    // First chapter in progress
    const inProg = chapters.find(ch => {
      const p = chapterProgress[ch.id]
      return p && p.percentage > 0 && !p.completed
    })
    if (inProg) return inProg
    // Or first unstarted chapter
    const unstarted = chapters.find(ch => {
      const p = chapterProgress[ch.id]
      return !p || p.percentage === 0
    })
    if (unstarted) return unstarted
    return chapters[0]
  }, [chapters, chapterProgress])

  const filteredChapters = chapters.filter(ch => {
    const matchesSearch = !search ||
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      (ch.short_description && ch.short_description.toLowerCase().includes(search.toLowerCase()))

    const prog = chapterProgress[ch.id] || { percentage: 0, completed: false }

    if (statusFilter === 'completed') return matchesSearch && prog.completed
    if (statusFilter === 'in_progress') return matchesSearch && prog.percentage > 0 && !prog.completed
    if (statusFilter === 'not_started') return matchesSearch && prog.percentage === 0
    return matchesSearch
  })

  if (loading) return <AppLayout><LoadingState message="Initializing your AI Learning Workspace..." /></AppLayout>

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto fade-in">
        
        {/* Hero Banner with Dynamic Gradient & Progress Summary */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 p-4 sm:p-6 lg:p-10 text-white shadow-2xl border border-blue-800/40">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-24 translate-x-24 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-y-20 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="space-y-3.5 sm:space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-blue-200 border border-white/15 flex-wrap">
                <GraduationCap size={14} className="text-blue-300 flex-shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">Enrolled: {myClass ? myClass.name : 'AI Olympiad Track'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-emerald-300 font-bold">Active Track</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                AI & Deep Tech Olympiad Portal
              </h1>

              <p className="text-blue-100/90 text-xs sm:text-sm lg:text-base leading-relaxed">
                Step through 10 interactive stages per chapter: Concept Deep Dive, Hands-on Lab Simulation, Matching Activities, Interactive Workbook, and Mastery Quizzes.
              </p>

              {/* Dynamic Metrics Ribbon */}
              <div className="pt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-blue-200 font-medium">Progress</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-0.5">{overallMastery}%</p>
                  <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 mt-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: `${overallMastery}%` }} />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-blue-200 font-medium">Completed</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-0.5">{completedChaptersCount} <span className="text-[10px] sm:text-xs font-normal text-blue-200">/ {totalChaptersCount} Ch</span></p>
                  <span className="text-[9px] sm:text-[10px] text-emerald-300 font-semibold mt-0.5 sm:mt-1 block">Mastered</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-blue-200 font-medium">Earned XP</p>
                  <p className="text-lg sm:text-xl font-black text-amber-300 mt-0.5 flex items-center gap-1">
                    <Zap size={16} className="fill-amber-300 text-amber-300 flex-shrink-0" />
                    <span>{stats.xp}</span>
                  </p>
                  <span className="text-[9px] sm:text-[10px] text-amber-200 font-medium mt-0.5 sm:mt-1 block">Lvl {stats.level}</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-blue-200 font-medium">Streak</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-0.5 flex items-center gap-1">
                    <Flame size={16} className="fill-orange-400 text-orange-400 flex-shrink-0" />
                    <span>{stats.streak} <span className="text-[10px] sm:text-xs font-normal text-blue-200">Days</span></span>
                  </p>
                  <span className="text-[9px] sm:text-[10px] text-emerald-300 font-medium mt-0.5 sm:mt-1 block">
                    {stats.streak >= 3 ? 'On Fire (3+ Days)' : 'Daily'}
                  </span>
                </div>
              </div>
            </div>

            {/* Continue Learning Quick Action Hero Card */}
            {continueChapter && (
              <div className="w-full lg:w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between flex-shrink-0">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-400/20 flex items-center gap-1">
                      <Compass size={12} /> Recommended Next
                    </span>
                    <span className="text-xs font-bold text-amber-300">
                      {chapterProgress[continueChapter.id]?.completed ? '100%' : `${chapterProgress[continueChapter.id]?.percentage || 0}% Complete`}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm sm:text-base mt-2.5 sm:mt-3 line-clamp-2">
                    {continueChapter.title}
                  </h3>
                  <p className="text-xs text-blue-100/80 mt-1 line-clamp-2">
                    {continueChapter.short_description || 'Master core AI concepts with hands-on lab sandbox and interactive quizzes.'}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10">
                  <Link
                    to={`/student/learning/${continueChapter.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-98"
                  >
                    <Play size={15} className="fill-white" />
                    <span>{chapterProgress[continueChapter.id]?.percentage ? 'Resume Chapter' : 'Start Learning'}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student's Enrolled Academic Class Badge & Level Milestone Track */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <GraduationCap size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Enrolled Class Track
                </span>
                <h2 className="text-base font-black text-slate-900">
                  {myClass?.name || 'Class 3'} • {selectedSubject?.name || 'AI Olympiad Track'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                <CheckCircle size={14} className="text-emerald-600" />
                <span>{completedChaptersCount}/{totalChaptersCount} Chapters Mastered</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Step-by-Step Learning Path: Follow the sequential journey from Lesson 1 (Concept Discovery) → Lesson 2 (Mission Challenge) → Chapter Assessment. Complete each chapter to unlock the next!
          </p>
        </div>

        {/* Subjects Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" />
              <span>Assigned Subject Track ({subjects.length})</span>
            </h2>
          </div>

          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map(sub => {
                const isSelected = selectedSubject?.id === sub.id
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub)}
                    className="text-left group w-full"
                  >
                    <Card className={`p-5 transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}>
                      <div className="flex items-start gap-3.5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base transition-colors ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                          <Sparkles size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">{sub.name}</h3>
                            <ChevronRight size={16} className={`transition-transform ${isSelected ? 'rotate-90 text-blue-600' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                          </div>
                          {sub.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sub.description}</p>
                          )}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                              6 Chapters • 12 Lessons
                            </span>
                            <span className="text-[11px] font-bold text-blue-600">
                              {isSelected ? 'Active Track' : 'View Curriculum'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                )
              })}
            </div>
          ) : (
            <Card className="p-10 text-center text-slate-500 bg-white">
              <BookOpen size={40} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Subjects Assigned Yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Your curriculum track is being loaded. Please select an academic level from above.
              </p>
            </Card>
          )}
        </div>

        {/* Chapters Section & Learning Roadmap */}
        {selectedSubject && (
          <div className="space-y-5 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{selectedSubject.name} — Learning Roadmap</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete each chapter's 8-section interactive pipeline to master AI Olympiad skills and unlock next levels.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Status Filter */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({chapters.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('in_progress')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      statusFilter === 'in_progress' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => setStatusFilter('completed')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      statusFilter === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Completed
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search chapters or topics..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Chapters Interactive Grid */}
            {filteredChapters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredChapters.map((chap, idx) => {
                  const prog = chapterProgress[chap.id] || { percentage: 0, completed: false }
                  const isCompleted = prog.completed
                  const visual = getIllustrationForTopic(chap.title, idx + 1)

                  return (
                    <div
                      key={chap.id}
                      className={`group relative rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white shadow-sm hover:shadow-xl ${
                        isCompleted
                          ? 'border-emerald-200 hover:border-emerald-400'
                          : prog.percentage > 0
                          ? 'border-blue-300 hover:border-blue-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Chapter Visual Header */}
                      <div className={`relative h-32 p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${visual.color}`}>
                        <div className="absolute right-2 -bottom-2 text-6xl opacity-30 select-none pointer-events-none">
                          {visual.badge}
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-[11px] font-black uppercase tracking-wider text-white/90 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                            Chapter {chap.chapter_number || idx + 1}
                          </span>
                          <Badge
                            variant={isCompleted ? 'success' : prog.percentage > 0 ? 'info' : 'default'}
                            className="backdrop-blur-md font-bold"
                          >
                            {isCompleted ? '✓ Completed' : prog.percentage > 0 ? 'In Progress' : 'Not Started'}
                          </Badge>
                        </div>

                        <div className="relative z-10">
                          <span className="text-[11px] font-bold text-white/90 flex items-center gap-1">
                            <Clock size={12} />
                            {chap.estimated_duration ? `${chap.estimated_duration} min` : '45 min'} • +190 XP
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                            {chap.title}
                          </h3>

                          {chap.short_description && (
                            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                              {chap.short_description}
                            </p>
                          )}

                          {/* 8-Section Feature Tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Video size={10} /> Video
                            </span>
                            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <BookOpen size={10} /> 2 Lessons
                            </span>
                            <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <FileEdit size={10} /> Workbook
                            </span>
                            <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Gamepad2 size={10} /> Activity
                            </span>
                            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <FlaskConical size={10} /> Lab
                            </span>
                            <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Trophy size={10} /> Quiz
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar & Launch Button */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                              <span>
                                {isCompleted
                                  ? '100% Completed'
                                  : `${prog.completedSections || 0}/8 Sections Completed`}
                              </span>
                              <span className="font-bold text-slate-700">→ {prog.percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                                }`}
                                style={{ width: `${prog.percentage}%` }}
                              />
                            </div>
                          </div>

                          <Link
                            to={`/student/learning/${chap.id}`}
                            className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm ${
                              isCompleted
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : prog.percentage > 0
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 shadow-md'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            <span>{isCompleted ? 'Review Chapter' : prog.percentage > 0 ? 'Continue Stage' : 'Start Chapter'}</span>
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <Card className="p-12 text-center text-slate-400 bg-white">
                <Filter size={36} className="mx-auto text-slate-300 mb-2" />
                <p className="font-bold text-slate-700">No chapters match your search or filter.</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting the status filter or clearing your search term.</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
