import React from 'react'
import { Flame, Sparkles } from 'lucide-react'

// 1. Page Transition Container
export const PageTransition: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both ${className}`}>
    {children}
  </div>
)

// 2. Delayed Reveal Animation Wrapper
export const RevealAnimation: React.FC<{
  children: React.ReactNode
  delayMs?: number
  className?: string
}> = ({ children, delayMs = 150, className = '' }) => (
  <div
    style={{ animationDelay: `${delayMs}ms` }}
    className={`animate-in fade-in zoom-in-95 duration-400 fill-mode-both ${className}`}
  >
    {children}
  </div>
)

// 3. Interactive Feedback Trigger Container
export const InteractionFeedback: React.FC<{
  children: React.ReactNode
  active?: boolean
  type?: 'bounce' | 'pulse' | 'glow'
  className?: string
}> = ({ children, active = false, type = 'glow', className = '' }) => {
  let effectClass = ''
  if (active) {
    if (type === 'bounce') effectClass = 'animate-bounce'
    else if (type === 'pulse') effectClass = 'animate-pulse'
    else effectClass = 'ring-4 ring-indigo-400/40 shadow-xl'
  }
  return (
    <div className={`transition-all duration-300 ${effectClass} ${className}`}>
      {children}
    </div>
  )
}

// 4. Streak Counter Badge
export const StreakBadge: React.FC<{
  streak: number
  className?: string
}> = ({ streak, className = '' }) => {
  if (streak <= 0) return null
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300 text-xs font-black shadow-sm animate-pulse ${className}`}
    >
      <Flame size={14} className="text-orange-400 fill-orange-400" />
      <span>{streak} Streak!</span>
    </div>
  )
}

// 5. Success Celebration Banner
export const SuccessCelebration: React.FC<{
  title?: string
  subtitle?: string
  xpEarned?: number
  onContinue?: () => void
  continueLabel?: string
}> = ({
  title = 'Section Mission Completed!',
  subtitle = 'You have mastered this concept and unlocked new cognitive skills.',
  xpEarned = 25,
  onContinue,
  continueLabel = 'Continue Journey →',
}) => (
    <div className="bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-slate-900/80 border-2 border-emerald-400/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-400">
      <div className="w-16 h-16 rounded-2xl bg-emerald-400/20 text-emerald-300 border border-emerald-300/40 flex items-center justify-center mx-auto shadow-inner">
        <Sparkles size={32} className="text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black text-white">{title}</h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">{subtitle}</p>
      </div>
      {xpEarned > 0 && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-sm border border-emerald-400/30">
          <span>+{xpEarned} XP Earned.</span>
        </div>
      )}
      {onContinue && (
        <div className="pt-2">
          <button
            onClick={onContinue}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {continueLabel}
          </button>
        </div>
      )}
    </div>
  )
