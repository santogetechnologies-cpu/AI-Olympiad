import { supabase, isUuid } from '../lib/supabase'

// ─── Gamification & Duolingo-Style Interactive Learning Utilities ─────────────

export interface StudentStats {
  xp: number
  streak: number
  level: number
  hearts: number
  lastActiveDate: string
  completedActivities: string[]
  unlockedBadges: string[]
}

export interface BadgeInfo {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export const BADGES: BadgeInfo[] = [
  { id: 'first_step', title: 'First Step', description: 'Completed your first learning section', icon: 'Sparkles', color: 'from-blue-500 to-indigo-600' },
  { id: 'quiz_master', title: 'Quiz Ace', description: 'Passed a chapter mastery assessment', icon: 'Target', color: 'from-emerald-500 to-teal-600' },
  { id: 'streak_3', title: 'On Fire', description: 'Maintained a 3-day learning streak', icon: 'Zap', color: 'from-amber-500 to-orange-600' },
  { id: 'chapter_master', title: 'Chapter Master', description: 'Mastered 100% of a curriculum chapter', icon: 'Trophy', color: 'from-yellow-400 to-amber-600' },
  { id: 'practical_pro', title: 'AI Builder', description: 'Completed a hands-on practical experiment', icon: 'Award', color: 'from-purple-500 to-indigo-700' },
  { id: 'scholar', title: 'AI Scholar', description: 'Earned over 250 XP in learning activities', icon: 'Award', color: 'from-rose-500 to-pink-600' },
]

const STATS_KEY = 'nanjil_student_gamification_stats'

export const gamification = {
  getStats(studentId?: string): StudentStats {
    const key = studentId ? `${STATS_KEY}_${studentId}` : STATS_KEY
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored) as StudentStats
        if (!Array.isArray(parsed.completedActivities)) {
          parsed.completedActivities = []
        }
        if (!Array.isArray(parsed.unlockedBadges)) {
          parsed.unlockedBadges = []
        }

        // Check daily streak validity
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        
        // If last active date is older than yesterday, streak is reset
        if (parsed.lastActiveDate && parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
          parsed.streak = 0
          try {
            localStorage.setItem(key, JSON.stringify(parsed))
          } catch {}
        }
        return parsed
      }
    } catch {
      // ignore
    }

    // Default clean stats for new student
    const defaultStats: StudentStats = {
      xp: 0,
      streak: 0,
      level: 1,
      hearts: 5,
      lastActiveDate: '',
      completedActivities: [],
      unlockedBadges: [],
    }

    return defaultStats
  },

  saveStats(stats: StudentStats, studentId?: string) {
    const key = studentId ? `${STATS_KEY}_${studentId}` : STATS_KEY
    try {
      localStorage.setItem(key, JSON.stringify(stats))
      window.dispatchEvent(new CustomEvent('gamification_stats_updated', {
        detail: { studentId, stats }
      }))
    } catch {
      // ignore
    }
  },

  /**
   * Award XP with strict deduplication per activityId.
   * If activityId was already completed, duplicate XP is prevented.
   * Increases streak only upon actual daily learning activity.
   */
  addXP(
    amount: number,
    studentId?: string,
    activityId?: string
  ): { newXP: number; levelUp: boolean; newBadge?: BadgeInfo; awarded: boolean; streak: number } {
    const current = gamification.getStats(studentId)

    // Deduplication check: prevent duplicate XP for the same activity
    if (activityId) {
      if (current.completedActivities.includes(activityId)) {
        return {
          newXP: current.xp,
          levelUp: false,
          awarded: false,
          streak: current.streak,
        }
      }
      current.completedActivities.push(activityId)
    }

    const oldLevel = current.level || Math.floor(current.xp / 100) + 1
    current.xp = (current.xp || 0) + Math.max(0, amount)
    const newLevel = Math.floor(current.xp / 100) + 1
    current.level = newLevel

    // Daily streak logic: consecutive days increment streak, same day keeps streak, missed day resets
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (current.lastActiveDate === today) {
      // Already active today, streak remains unchanged
    } else if (current.lastActiveDate === yesterday) {
      // Consecutive active day!
      current.streak = (current.streak || 0) + 1
      current.lastActiveDate = today
    } else {
      // First active day or after missing a day
      current.streak = 1
      current.lastActiveDate = today
    }

    // Check automatic badge awards
    let newBadge: BadgeInfo | undefined
    if (current.completedActivities.length >= 1 && !current.unlockedBadges.includes('first_step')) {
      current.unlockedBadges.push('first_step')
      newBadge = BADGES.find(b => b.id === 'first_step')
    }
    if (current.streak >= 3 && !current.unlockedBadges.includes('streak_3')) {
      current.unlockedBadges.push('streak_3')
      newBadge = BADGES.find(b => b.id === 'streak_3')
    }
    if (current.xp >= 250 && !current.unlockedBadges.includes('scholar')) {
      current.unlockedBadges.push('scholar')
      newBadge = BADGES.find(b => b.id === 'scholar')
    }

    gamification.saveStats(current, studentId)

    return {
      newXP: current.xp,
      levelUp: newLevel > oldLevel,
      newBadge,
      awarded: true,
      streak: current.streak,
    }
  },

  unlockBadge(badgeId: string, studentId?: string): BadgeInfo | null {
    const current = gamification.getStats(studentId)
    if (!current.unlockedBadges.includes(badgeId)) {
      current.unlockedBadges.push(badgeId)
      gamification.saveStats(current, studentId)
      return BADGES.find(b => b.id === badgeId) || null
    }
    return null
  },

  /**
   * Synchronize gamification stats with Supabase database as single source of truth.
   * Aggregates completed sections from student_content_progress and quiz_attempts.
   */
  async syncWithDatabase(studentId: string, _organizationId?: string): Promise<StudentStats> {
    if (!studentId || studentId === 'guest-student' || !isUuid(studentId)) {
      return gamification.getStats(studentId)
    }

    const current = gamification.getStats(studentId)
    const completedSet = new Set<string>(current.completedActivities || [])
    const activeDates = new Set<string>()
    if (current.lastActiveDate) activeDates.add(current.lastActiveDate)

    // 1. Fetch completed items from Supabase student_content_progress
    try {
      const { data: dbProgress } = await supabase
        .from('student_content_progress')
        .select('chapter_content_id, status, completed_at, last_accessed_at')
        .eq('student_id', studentId)
        .eq('status', 'completed')

      if (dbProgress && dbProgress.length > 0) {
        for (const item of dbProgress) {
          if (item.chapter_content_id) {
            completedSet.add(item.chapter_content_id)
            const dateStr = (item.completed_at || item.last_accessed_at || '').split('T')[0]
            if (dateStr) activeDates.add(dateStr)
          }
        }
      }
    } catch {}

    // 2. Fetch completed quiz attempts from Supabase quiz_attempts
    try {
      const { data: dbQuizzes } = await supabase
        .from('quiz_attempts')
        .select('id, quiz_id, passed, completed_at')
        .eq('student_id', studentId)
        .eq('status', 'completed')

      if (dbQuizzes && dbQuizzes.length > 0) {
        for (const q of dbQuizzes) {
          completedSet.add(`quiz_attempt_${q.id || q.quiz_id}`)
          const dateStr = (q.completed_at || '').split('T')[0]
          if (dateStr) activeDates.add(dateStr)
        }
      }
    } catch {}

    // 3. Scan local chapter progress for completed section keys
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(`progress_${studentId}_`)) {
          const raw = localStorage.getItem(k)
          if (raw) {
            const arr = JSON.parse(raw)
            if (Array.isArray(arr)) {
              arr.forEach((secId: string) => completedSet.add(secId))
            }
          }
        }
      }
    } catch {}

    // 4. Calculate total authoritative XP deterministically
    let totalXP = 0
    completedSet.forEach(itemKey => {
      if (itemKey.includes('-sec-1') || itemKey.includes('-sec-2') || itemKey.includes('-sec-3') || itemKey.includes('-sec-5')) {
        totalXP += 15
      } else if (itemKey.includes('-sec-4') || itemKey.includes('-sec-6')) {
        totalXP += 20
      } else if (itemKey.includes('-sec-7')) {
        totalXP += 25
      } else if (itemKey.includes('-sec-8') || itemKey.includes('quiz_attempt_')) {
        totalXP += 40
      } else {
        totalXP += 20 // standard activity XP
      }
    })

    // 5. Calculate consecutive day streak from active learning dates
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    let calculatedStreak = 0

    const sortedDates = Array.from(activeDates).filter(Boolean).sort().reverse()
    if (sortedDates.length > 0) {
      const mostRecent = sortedDates[0]
      if (mostRecent === today || mostRecent === yesterday) {
        calculatedStreak = 1
        let checkDate = new Date(mostRecent)
        for (let i = 1; i < sortedDates.length; i++) {
          const prevExpected = new Date(checkDate.getTime() - 86400000).toISOString().split('T')[0]
          if (sortedDates.includes(prevExpected)) {
            calculatedStreak++
            checkDate = new Date(prevExpected)
          } else {
            break
          }
        }
      }
    }

    current.xp = Math.max(current.xp, totalXP)
    current.streak = Math.max(current.streak, calculatedStreak)
    current.level = Math.floor(current.xp / 100) + 1
    current.completedActivities = Array.from(completedSet)
    if (sortedDates.length > 0) {
      current.lastActiveDate = sortedDates[0]
    }

    // Unlock badges based on actual verified progress
    if (current.completedActivities.length >= 1 && !current.unlockedBadges.includes('first_step')) {
      current.unlockedBadges.push('first_step')
    }
    if (current.streak >= 3 && !current.unlockedBadges.includes('streak_3')) {
      current.unlockedBadges.push('streak_3')
    }
    if (current.xp >= 250 && !current.unlockedBadges.includes('scholar')) {
      current.unlockedBadges.push('scholar')
    }

    gamification.saveStats(current, studentId)
    return current
  },

  // Sound effects completely removed as requested
  triggerSound(_type: 'correct' | 'wrong' | 'complete' | 'click' | 'success') {
    // No-op: All sound effects disabled across platform
  },

  // Lightweight 60fps Canvas Confetti Celebration
  launchConfetti() {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '99999'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#eab308']
    const particles: {
      x: number
      y: number
      w: number
      h: number
      color: string
      vx: number
      vy: number
      rot: number
      rotSpeed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: Math.random() * -16 - 6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
      })
    }

    let frame = 0
    const render = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.45 // gravity
        p.rot += p.rotSpeed
        if (frame > 35) p.opacity -= 0.015

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = p.color
          ctx.globalAlpha = Math.max(0, p.opacity)
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
          ctx.restore()
        }
      })

      if (alive && frame < 120) {
        requestAnimationFrame(render)
      } else {
        canvas.remove()
      }
    }

    requestAnimationFrame(render)
  },
}
