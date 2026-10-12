// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDABLE KINDERGARTEN CONCEPT CARD
// Zero-friction, story-driven breakdown that can be embedded inside any screen or lab.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Volume2, HeartHandshake } from 'lucide-react'
import { findKindergartenConcept } from './kindergartenConceptDictionary'
import { auraSpeechService } from '../../services/auraSpeechService'
import { gameAudio } from '../../utils/gameAudio'

export interface KindergartenAnalogyCardProps {
  term?: string
  customTitle?: string
  customAnalogy?: string
  customExplanation?: string
  defaultOpen?: boolean
  compact?: boolean
}

export const KindergartenAnalogyCard: React.FC<KindergartenAnalogyCardProps> = ({
  term,
  customTitle,
  customAnalogy,
  customExplanation,
  defaultOpen = false,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)
  const matched = term ? findKindergartenConcept(term) : undefined

  const displayTitle = customTitle || (matched ? matched.term : term || 'Concept Story')
  const displayAnalogy =
    customAnalogy ||
    (matched
      ? matched.kindergartenAnalogy
      : 'Imagine this concept like a simple game on a playground where everyone takes turns and shares fairly!')
  const displaySimple =
    customExplanation ||
    (matched
      ? matched.simpleExplanation
      : 'In plain words, this gives computers a simple step-by-step way to learn without making big mistakes.')
  const emoji = matched?.emoji || '👶'

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation()
    gameAudio.playTap()
    auraSpeechService.speak(
      `${displayTitle}. Kindergarten story: ${displayAnalogy}. In plain words: ${displaySimple}`
    )
  }

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-cyan-950/20 border border-amber-500/30 overflow-hidden shadow-md my-2.5 transition-all">
      {/* Header bar that toggles */}
      <div
        onClick={() => {
          gameAudio.playTap()
          setIsOpen(!isOpen)
        }}
        className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-amber-500/5 transition-colors select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{emoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase font-black text-amber-400 tracking-wider">
                Explain Like I'm 5 · Kindergarten Story
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>{displayTitle}</span>
              {!isOpen && (
                <span className="text-[11px] text-slate-400 font-normal hidden sm:inline truncate max-w-xs">
                  — Click to read simple story analogy
                </span>
              )}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOpen && (
            <button
              type="button"
              onClick={handleSpeak}
              className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-all cursor-pointer"
              title="Listen to story"
            >
              <Volume2 size={14} />
            </button>
          )}
          <span className="text-amber-400 p-1 rounded-lg bg-slate-900 border border-amber-500/20">
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {/* Expandable story container */}
      {isOpen && (
        <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-amber-500/20 animate-fadeIn text-xs sm:text-sm">
          {/* The Analogy */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-100 leading-relaxed font-medium">
            "{displayAnalogy}"
          </div>

          {/* Plain English */}
          <div className="flex items-start gap-2 text-slate-300 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <HeartHandshake size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-cyan-300 font-semibold">Plain English: </strong>
              {displaySimple}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
