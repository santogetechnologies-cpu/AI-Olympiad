// ─────────────────────────────────────────────────────────────────────────────
// CONTEXTUAL FLOATING PDF TOOLBAR SPOTLIGHT TOUR
// Highlights the vertical right-side toolbar tools one by one with a clean,
// compact explanation box, stable non-flickering backdrop, smooth transitions,
// and permanent database-backed completion tracking across all chapters.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Hand,
  PaintBucket,
  Pen,
  Highlighter,
  Sparkles,
  Eraser,
  Trash2,
  Type,
  Undo2,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2
} from 'lucide-react'
import { tourService } from '../../../services/tourService'
import { gameAudio } from '../../../utils/gameAudio'

export interface PdfToolbarSpotlightTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  studentId?: string
  organizationId?: string
}

interface TourStep {
  targetSelector: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  accentBg: string
}

const TOUR_STEPS: TourStep[] = [
  {
    targetSelector: '[data-tour="tool-move"]',
    title: 'Move Tool ✋',
    description: 'Drag to pan around the page or reposition moveable figures and stickers.',
    icon: Hand,
    color: 'text-amber-500',
    accentBg: 'bg-amber-50 border-amber-200/80',
  },
  {
    targetSelector: '[data-tour="tool-color"]',
    title: 'Color Fill Tool 🪣',
    description: 'Tap any line art or shape on the worksheet to flood fill it with color.',
    icon: PaintBucket,
    color: 'text-emerald-500',
    accentBg: 'bg-emerald-50 border-emerald-200/80',
  },
  {
    targetSelector: '[data-tour="tool-write"]',
    title: 'Write Tool ✏️',
    description: 'Freehand pen tool to write, solve equations, and draw diagrams.',
    icon: Pen,
    color: 'text-blue-500',
    accentBg: 'bg-blue-50 border-blue-200/80',
  },
  {
    targetSelector: '[data-tour="tool-highlighter"]',
    title: 'Highlighter Tool 🖍️',
    description: 'Highlight important terms, key formulas, and text takeaways.',
    icon: Highlighter,
    color: 'text-yellow-600',
    accentBg: 'bg-yellow-50 border-yellow-200/80',
  },
  {
    targetSelector: '[data-tour="tool-star"]',
    title: 'Star Rating Tool ⭐',
    description: 'Stamp stars on the page to rate activities and track comprehension.',
    icon: Sparkles,
    color: 'text-amber-500',
    accentBg: 'bg-amber-50 border-amber-200/80',
  },
  {
    targetSelector: '[data-tour="tool-erase"]',
    title: 'Eraser Tool 🧹',
    description: 'Erase pen strokes or tap filled areas to remove color fills cleanly.',
    icon: Eraser,
    color: 'text-rose-500',
    accentBg: 'bg-rose-50 border-rose-200/80',
  },
  {
    targetSelector: '[data-tour="tool-clear"]',
    title: 'Clear Tool 🗑️',
    description: 'Instantly clear all drawings and color fills on the current page.',
    icon: Trash2,
    color: 'text-red-500',
    accentBg: 'bg-red-50 border-red-200/80',
  },
  {
    targetSelector: '[data-tour="tool-type"]',
    title: 'Type Tool ⌨️',
    description: 'Click anywhere on a worksheet line or blank area to type clean text.',
    icon: Type,
    color: 'text-indigo-500',
    accentBg: 'bg-indigo-50 border-indigo-200/80',
  },
  {
    targetSelector: '[data-tour="tool-undo"]',
    title: 'Undo Tool ↩️',
    description: 'Revert your last drawing stroke, color fill, star, or text edit.',
    icon: Undo2,
    color: 'text-amber-600',
    accentBg: 'bg-amber-50 border-amber-200/80',
  },
]

export const PdfToolbarSpotlightTour: React.FC<PdfToolbarSpotlightTourProps> = ({
  isOpen,
  onClose,
  onComplete,
  studentId,
  organizationId,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const step = TOUR_STEPS[currentStep] || TOUR_STEPS[0]
  const isFirst = currentStep === 0
  const isLast = currentStep === TOUR_STEPS.length - 1
  const IconComponent = step.icon

  // Measure and track target element position
  const updateRect = useCallback(() => {
    if (!isOpen) return
    const el = document.querySelector(step.targetSelector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      const rect = el.getBoundingClientRect()
      setTargetRect(rect)
    } else {
      setTargetRect(null)
    }
  }, [isOpen, step.targetSelector])

  useEffect(() => {
    if (!isOpen) return

    updateRect()
    const timer1 = setTimeout(updateRect, 50)
    const timer2 = setTimeout(updateRect, 200)

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, true)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect, true)
    }
  }, [isOpen, currentStep, updateRect])

  // Mark completion permanently in database
  const finishTour = useCallback(async () => {
    try {
      gameAudio.playVictory()
    } catch {
      // ignore
    }
    onClose()
    if (onComplete) onComplete()
    if (studentId) {
      await tourService.completePdfTour(studentId, organizationId)
    }
  }, [studentId, organizationId, onClose, onComplete])

  // Skip tour immediately and save to database
  const handleSkip = useCallback(async () => {
    try {
      gameAudio.playTap()
    } catch {
      // ignore
    }
    onClose()
    if (onComplete) onComplete()
    if (studentId) {
      await tourService.completePdfTour(studentId, organizationId)
    }
  }, [studentId, organizationId, onClose, onComplete])

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

  // Calculate dynamic floating tooltip position beside the toolbar
  let tooltipStyle: React.CSSProperties = {}
  let spotlightStyle: React.CSSProperties | null = null

  if (targetRect) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

    // Stable, non-blinking subtle highlight around only the current tool
    spotlightStyle = {
      position: 'fixed',
      top: `${Math.max(0, targetRect.top - 3)}px`,
      left: `${Math.max(0, targetRect.left - 3)}px`,
      width: `${targetRect.width + 6}px`,
      height: `${targetRect.height + 6}px`,
      borderRadius: '12px',
      boxShadow:
        '0 0 0 9999px rgba(15, 23, 42, 0.55), 0 0 0 2.5px #3b82f6, 0 4px 14px rgba(37, 99, 235, 0.35)',
      pointerEvents: 'none',
      zIndex: 60,
      transition: 'top 0.25s ease-out, left 0.25s ease-out, width 0.25s ease-out, height 0.25s ease-out',
    }

    if (isMobile) {
      tooltipStyle = {
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 65,
      }
    } else {
      // Desktop: place clean tooltip card to the LEFT of the vertical toolbar
      const tooltipHeight = 220
      const idealTop = targetRect.top + targetRect.height / 2 - tooltipHeight / 2
      const boundedTop = Math.max(16, Math.min(window.innerHeight - tooltipHeight - 16, idealTop))
      const rightDistance = window.innerWidth - targetRect.left + 16

      tooltipStyle = {
        position: 'fixed',
        top: `${boundedTop}px`,
        right: `${Math.max(16, rightDistance)}px`,
        width: '300px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 65,
        transition: 'top 0.2s ease-out, right 0.2s ease-out',
      }
    }
  } else {
    // Fallback: center on screen
    tooltipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '320px',
      zIndex: 65,
    }
  }

  return (
    <>
      {/* Invisible backdrop click-shield to prevent navigating away mid-tour */}
      <div
        className="fixed inset-0 z-55 bg-transparent"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation()
        }}
      />

      {/* Target spotlight cutout (stable, no flickering or pulsating) */}
      {spotlightStyle && <div style={spotlightStyle} aria-hidden="true" />}

      {/* Small, clean floating explanation box */}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        role="dialog"
        aria-labelledby="pdf-tool-title"
        aria-describedby="pdf-tool-desc"
        className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xl text-slate-800 flex flex-col animate-in fade-in zoom-in-95 duration-200 select-none relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Right Arrow pointer pointing to the tool button on desktop */}
        {targetRect && typeof window !== 'undefined' && window.innerWidth >= 640 && (
          <div
            className="hidden sm:block absolute -right-2 top-7 w-3.5 h-3.5 bg-white border-r border-t border-slate-200/90 rotate-45 transform pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Header: Step Indicator + Close Button */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
            <Sparkles size={11} className="text-blue-500" />
            Step {currentStep + 1} of {TOUR_STEPS.length}
          </span>

          <button
            type="button"
            onClick={handleSkip}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Skip Tour"
            aria-label="Skip Tour"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content: Icon + Title + Short Explanation */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-9 h-9 rounded-xl ${step.accentBg} border flex items-center justify-center shadow-xs shrink-0`}
          >
            <IconComponent className={`w-4 h-4 ${step.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="pdf-tool-title" className="text-sm font-bold text-slate-900 leading-snug">
              {step.title}
            </h3>
            <p id="pdf-tool-desc" className="text-xs text-slate-600 leading-relaxed mt-0.5">
              {step.description}
            </p>
          </div>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-1.5 mb-3">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentStep(idx)
                try {
                  gameAudio.playTap()
                } catch {
                  // ignore
                }
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentStep
                  ? 'w-5 bg-blue-600'
                  : idx < currentStep
                  ? 'w-2 bg-blue-300'
                  : 'w-1.5 bg-slate-200'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 gap-2">
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer font-semibold py-1 px-1.5 rounded-lg hover:bg-slate-50"
          >
            Skip
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={14} />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all active:scale-95 cursor-pointer ${
                isLast
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              {isLast ? (
                <>
                  <span>Finish</span>
                  <CheckCircle2 size={13} />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight size={13} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PdfToolbarSpotlightTour
