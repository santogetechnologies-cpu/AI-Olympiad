// ─────────────────────────────────────────────────────────────────────────────
// ONE-TIME GUIDED SIDEBAR SPOTLIGHT TOUR FOR STUDENTS
// Highlights each sidebar item sequentially with focused spotlight overlay,
// clear page descriptions, step indicators, responsive positioning,
// and permanent database-backed completion tracking.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Home,
  BookOpen,
  BarChart3,
  GraduationCap,
  HelpCircle,
  User,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react'
import { tourService } from '../../services/tourService'
import { gameAudio } from '../../utils/gameAudio'

export interface SidebarTourStep {
  id: string
  label: string
  selector: string
  badge: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconBg: string
  iconColor: string
}

export const SIDEBAR_TOUR_STEPS: SidebarTourStep[] = [
  {
    id: 'home',
    label: 'Home',
    selector: '#sidebar-nav-home',
    badge: 'Dashboard',
    title: 'Home Dashboard 🏠',
    description:
      'Your central learning hub to view daily study streaks, review notifications, and immediately resume reading your current chapter.',
    icon: Home,
    iconBg: 'bg-blue-50 border-blue-200/80',
    iconColor: 'text-blue-600',
  },
  {
    id: 'learn',
    label: 'Learn',
    selector: '#sidebar-nav-learn',
    badge: 'Curriculum',
    title: 'Learn & Interactive Books 📚',
    description:
      'Explore chapter-by-chapter AI learning modules, read digital textbooks with drawing & note tools, and practice workbook exercises.',
    icon: BookOpen,
    iconBg: 'bg-emerald-50 border-emerald-200/80',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'progress',
    label: 'Progress',
    selector: '#sidebar-nav-progress',
    badge: 'Analytics',
    title: 'Reading Progress & Milestones 📊',
    description:
      'Track your page-by-page reading percentages, overall syllabus completion, study time milestones, and earned achievement badges.',
    icon: BarChart3,
    iconBg: 'bg-amber-50 border-amber-200/80',
    iconColor: 'text-amber-600',
  },
  {
    id: 'exams',
    label: 'Exams',
    selector: '#sidebar-nav-exams',
    badge: 'Assessments',
    title: 'Exams & Practice Quizzes 🎓',
    description:
      'Test your knowledge with monthly Olympiad assessments, mock tests, and chapter quizzes complete with detailed solutions.',
    icon: GraduationCap,
    iconBg: 'bg-purple-50 border-purple-200/80',
    iconColor: 'text-purple-600',
  },
  {
    id: 'help',
    label: 'Help',
    selector: '#sidebar-nav-help',
    badge: 'Support Desk',
    title: 'Student Help & Messaging 💬',
    description:
      'Chat directly with instructors and administrators in a dedicated two-way support desk to ask questions, solve doubts, and get assistance.',
    icon: HelpCircle,
    iconBg: 'bg-sky-50 border-sky-200/80',
    iconColor: 'text-sky-600',
  },
  {
    id: 'profile',
    label: 'Profile',
    selector: '#sidebar-nav-profile',
    badge: 'Account',
    title: 'Student Profile & Settings 👤',
    description:
      'View your enrolled academic class, student ID number, and update your personal details or password settings.',
    icon: User,
    iconBg: 'bg-rose-50 border-rose-200/80',
    iconColor: 'text-rose-600',
  },
]

interface SidebarSpotlightTourProps {
  userId: string
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  ensureSidebarOpen?: () => void
}

export const SidebarSpotlightTour: React.FC<SidebarSpotlightTourProps> = ({
  userId,
  isOpen,
  onClose,
  onComplete,
  ensureSidebarOpen,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const step = SIDEBAR_TOUR_STEPS[currentStep] || SIDEBAR_TOUR_STEPS[0]
  const isFirst = currentStep === 0
  const isLast = currentStep === SIDEBAR_TOUR_STEPS.length - 1
  const StepIcon = step.icon

  // Update spotlight target bounding rect
  const updateRect = useCallback(() => {
    if (!isOpen) return

    // Ensure mobile sidebar is open so the target element exists in DOM
    if (ensureSidebarOpen) {
      ensureSidebarOpen()
    }

    const el = document.querySelector(step.selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      const rect = el.getBoundingClientRect()
      setTargetRect(rect)
    } else {
      // If element not yet ready or in transition, retry shortly
      setTargetRect(null)
    }
  }, [isOpen, step.selector, ensureSidebarOpen])

  useEffect(() => {
    if (!isOpen) return

    updateRect()
    const timer1 = setTimeout(updateRect, 60)
    const timer2 = setTimeout(updateRect, 220)

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, true)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect, true)
    }
  }, [isOpen, currentStep, updateRect])

  // Mark completion in database and close
  const finishTour = useCallback(async () => {
    try {
      gameAudio.playVictory()
    } catch {
      // ignore
    }
    onClose()
    if (onComplete) onComplete()
    await tourService.completeSidebarTour(userId)
  }, [userId, onClose, onComplete])

  // Skip tour immediately and save to database
  const skipTour = useCallback(async () => {
    try {
      gameAudio.playTap()
    } catch {
      // ignore
    }
    onClose()
    if (onComplete) onComplete()
    await tourService.completeSidebarTour(userId)
  }, [userId, onClose, onComplete])

  const handleNext = () => {
    try {
      gameAudio.playTap()
    } catch {
      // ignore
    }
    if (isLast) {
      finishTour()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    try {
      gameAudio.playTap()
    } catch {
      // ignore
    }
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  if (!isOpen) return null

  // Compute tooltip position
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  let spotlightStyle: React.CSSProperties | null = null
  let tooltipStyle: React.CSSProperties = {}

  if (targetRect) {
    spotlightStyle = {
      position: 'fixed',
      top: `${Math.max(0, targetRect.top - 4)}px`,
      left: `${Math.max(0, targetRect.left - 4)}px`,
      width: `${targetRect.width + 8}px`,
      height: `${targetRect.height + 8}px`,
      borderRadius: '16px',
      boxShadow:
        '0 0 0 9999px rgba(15, 23, 42, 0.62), 0 0 0 3px rgba(37, 99, 235, 0.9), 0 8px 24px -4px rgba(37, 99, 235, 0.45)',
      pointerEvents: 'none',
      zIndex: 80,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    }

    if (isMobile) {
      // On small screens, keep tooltip safely fixed at bottom
      tooltipStyle = {
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 85,
      }
    } else {
      // On desktop / tablet, position tooltip directly to the right of the sidebar item
      const tooltipHeight = 260
      const idealTop = targetRect.top + targetRect.height / 2 - tooltipHeight / 2
      const boundedTop = Math.max(16, Math.min(window.innerHeight - tooltipHeight - 16, idealTop))
      const leftDistance = targetRect.right + 18

      tooltipStyle = {
        position: 'fixed',
        top: `${boundedTop}px`,
        left: `${leftDistance}px`,
        width: '380px',
        maxWidth: 'calc(100vw - 320px)',
        zIndex: 85,
        transition: 'top 0.25s ease-out, left 0.25s ease-out',
      }
    }
  } else {
    // Target element rect fallback (center if measuring)
    tooltipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '380px',
      maxWidth: 'calc(100vw - 32px)',
      zIndex: 85,
    }
  }

  return (
    <>
      {/* Invisible backdrop click-shield to prevent navigating away mid-tour */}
      <div
        className="fixed inset-0 z-[75] bg-transparent"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation()
          // Intentionally do not dismiss on random clicks so student doesn't lose their place
        }}
      />

      {/* Spotlight Cutout Halo */}
      {spotlightStyle && <div style={spotlightStyle} aria-hidden="true" />}

      {/* Floating Popover / Tooltip */}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        role="dialog"
        aria-labelledby="tour-step-title"
        aria-describedby="tour-step-desc"
        className="bg-white rounded-2xl shadow-2xl border border-slate-150/80 p-5 text-slate-800 animate-in fade-in zoom-in-95 duration-200 select-none relative"
      >
        {/* Pointer Arrow on desktop */}
        {!isMobile && targetRect && (
          <div
            className="absolute -left-2 top-8 w-4 h-4 bg-white border-l border-b border-slate-200/90 rotate-45 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Header: Step counter + Badge + Close button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              <Sparkles size={11} className="text-blue-500" />
              Step {currentStep + 1} of {SIDEBAR_TOUR_STEPS.length}
            </span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
              {step.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={skipTour}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Skip Tour"
            aria-label="Skip Tour"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Section: Icon & Title & Description */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${step.iconBg} ${step.iconColor} shadow-2xs`}
          >
            <StepIcon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="tour-step-title" className="text-sm font-bold text-slate-900 leading-snug">
              {step.title}
            </h3>
            <p id="tour-step-desc" className="text-xs text-slate-600 leading-relaxed mt-1">
              {step.description}
            </p>
          </div>
        </div>

        {/* Step Progress Dots Indicator */}
        <div className="flex items-center gap-1.5 mb-4">
          {SIDEBAR_TOUR_STEPS.map((s, idx) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-6 bg-blue-600'
                  : idx < currentStep
                  ? 'w-2 bg-blue-300'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Footer Actions: Skip + Back + Next/Finish */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
          <button
            type="button"
            onClick={skipTour}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer ${
                isLast
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              {isLast ? (
                <>
                  <span>Finish Tour</span>
                  <CheckCircle2 size={14} />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

