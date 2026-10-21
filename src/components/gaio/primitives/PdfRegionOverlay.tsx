// ─────────────────────────────────────────────────────────────────────────────
// PDF REGION OVERLAY COMPONENT
// Renders authentic interactive DOM widgets directly over the PDF page:
// - Typeable input fields aligned with blank lines
// - Clickable choice options (A, B, C, D / True, False)
// - Say-It microphone pronunciation targets
// - Color-fillable interactive trigger zones
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { Check, Mic, Sparkles, Star, Edit3, HelpCircle } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export interface PageRegion {
  id: string
  type: 'typeable' | 'choose' | 'sayIt' | 'colorFill' | 'draggable'
  bbox?: [number, number, number, number] // x, y, w, h in PDF coordinate points
  placeholder?: string
  prompt?: string
  fontSize?: number
  label?: string
  optionText?: string
  targetWord?: string
}

export interface PdfRegionOverlayProps {
  pageNumber: number
  bookKey: string
  regions: PageRegion[]
  scale: number
  onStartSayWord?: (word: string) => void
  onAddStar?: (count?: number) => void
  showReviewBoxes?: boolean
}

export const PdfRegionOverlay: React.FC<PdfRegionOverlayProps> = ({
  pageNumber,
  bookKey,
  regions,
  scale,
  onStartSayWord,
  onAddStar,
  showReviewBoxes = false
}) => {
  // Stored answers state for this page
  const [typedAnswers, setTypedAnswers] = useState<{ [regionId: string]: string }>({})
  const [selectedChoices, setSelectedChoices] = useState<{ [regionId: string]: boolean }>({})

  const storageKey = `gaio_regions_${bookKey}_p${pageNumber}`

  // Load saved answers
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setTypedAnswers(parsed.typed || {})
        setSelectedChoices(parsed.choices || {})
      } else {
        setTypedAnswers({})
        setSelectedChoices({})
      }
    } catch {
      setTypedAnswers({})
      setSelectedChoices({})
    }
  }, [storageKey])

  // Save answers
  const saveState = useCallback(
    (newTyped: { [k: string]: string }, newChoices: { [k: string]: boolean }) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ typed: newTyped, choices: newChoices }))
      } catch {}
    },
    [storageKey]
  )

  const handleTypeChange = (id: string, val: string) => {
    const updated = { ...typedAnswers, [id]: val }
    setTypedAnswers(updated)
    saveState(updated, selectedChoices)
  }

  const handleChoiceClick = (id: string, label: string) => {
    const nextVal = !selectedChoices[id]
    const updated = { ...selectedChoices, [id]: nextVal }
    setSelectedChoices(updated)
    saveState(typedAnswers, updated)

    if (nextVal) {
      gameAudio.playSuccess()
      onAddStar?.(1)
      confetti({ particleCount: 20, spread: 40 })
      toast.success(`Selected option ${label}! ⭐`)
    } else {
      gameAudio.playTap()
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {regions.map((region) => {
        if (!region.bbox && region.type !== 'sayIt') return null

        // Scale bounding box to canvas pixels
        const [x, y, w, h] = region.bbox || [0, 0, 0, 0]
        const sx = x * scale
        const sy = y * scale
        const sw = w * scale
        const sh = h * scale

        // 1. TYPEABLE INPUT REGIONS (Disabled in favor of freeform text/pen tool)
        if (region.type === 'typeable') {
          return null
        }


        // 2. CHOOSE / MULTIPLE CHOICE TICK REGIONS
        if (region.type === 'choose') {
          const isSelected = !!selectedChoices[region.id]
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => handleChoiceClick(region.id, region.label || '')}
              style={{
                left: `${sx}px`,
                top: `${sy}px`,
                width: `${Math.max(28, sw)}px`,
                height: `${Math.max(28, sh)}px`,
              }}
              title={region.optionText || `Option ${region.label}`}
              className={`absolute pointer-events-auto rounded-full font-black text-xs flex items-center justify-center transition-all shadow-md ${
                isSelected
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-300 scale-110 z-30'
                  : 'bg-white/90 hover:bg-blue-600 text-blue-900 hover:text-white border-2 border-blue-500/80 hover:scale-105'
              } ${showReviewBoxes ? 'ring-2 ring-purple-400' : ''}`}
            >
              {isSelected ? <Check size={16} className="stroke-[3]" /> : region.label || '✓'}
            </button>
          )
        }

        // 3. COLOR FILL REGION PROMPT
        if (region.type === 'colorFill') {
          return (
            <div
              key={region.id}
              style={{ left: `${sx}px`, top: `${sy}px`, width: `${sw}px`, height: `${sh}px` }}
              className={`absolute pointer-events-none rounded-2xl border-2 border-dashed border-pink-400/50 flex items-start justify-end p-2 ${
                showReviewBoxes ? 'bg-pink-500/10' : ''
              }`}
            >
              <span className="px-2 py-1 bg-pink-600/90 text-white text-[10px] font-bold rounded-lg shadow-sm">
                🎨 Colouring Zone
              </span>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
