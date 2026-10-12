// ─────────────────────────────────────────────────────────────────────────────
// GAIO AI GUIDE BANNER — INTERACTIVE MALE AI GUIDE ASSISTANT
// Explains any concept in kindergarten-simple language with slow, bold male voice.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useId } from 'react'
import { Volume2, VolumeX, Sparkles, Lightbulb, Baby, BookOpen, ChevronRight, Zap } from 'lucide-react'
import { AuraCharacter } from '../learning/primitives/AuraCharacter'
import { auraSpeechService } from '../../services/auraSpeechService'
import { findKindergartenConcept, type KindergartenConcept } from './kindergartenConceptDictionary'
import { gameAudio } from '../../utils/gameAudio'

export interface GaioGuideBannerProps {
  conceptTerm?: string
  lessonTitle?: string
  fallbackAnalogy?: string
  className?: string
  showDetailedToggle?: boolean
  autoFocusMode?: boolean
}

export const GaioGuideBanner: React.FC<GaioGuideBannerProps> = ({
  conceptTerm,
  lessonTitle = 'AI Concept',
  fallbackAnalogy,
  className = '',
  showDetailedToggle = true,
  autoFocusMode = false,
}) => {
  const instanceId = useId()
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<'kindergarten' | 'deep'>('kindergarten')
  const [concept, setConcept] = useState<KindergartenConcept | null>(null)

  useEffect(() => {
    const termToSearch = conceptTerm || lessonTitle
    const found = findKindergartenConcept(termToSearch)
    setConcept(found)
  }, [conceptTerm, lessonTitle])

  // Subscribe to speech state
  useEffect(() => {
    const unsubscribe = auraSpeechService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking && state.currentId === instanceId)
    })
    return () => {
      unsubscribe()
    }
  }, [instanceId])

  const simpleStory =
    concept?.kindergartenAnalogy ||
    fallbackAnalogy ||
    `Imagine teaching a friendly toy robot! At first it knows nothing, but every time you show it pictures, it learns just like you learn how to ride a bicycle!`

  const simpleExplanation =
    concept?.simpleExplanation ||
    `Computers looking at patterns and making smart guesses so they can help humans solve tricky problems!`

  const technicalDef = concept?.technicalDefinition || `Computational algorithms transforming input patterns into predictive outputs.`

  const handleToggleVoice = () => {
    if (isSpeaking) {
      auraSpeechService.stop()
    } else {
      try {
        gameAudio.playTap()
      } catch {}
      const textToSpeak = `Hello! I am GAIO, your AI guide. Let's understand this in the simplest way: ${simpleStory} ${simpleExplanation}`
      auraSpeechService.speak(textToSpeak, instanceId)
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900 to-cyan-950/40 p-4 sm:p-5 shadow-[0_8px_32px_rgba(6,182,212,0.12)] backdrop-blur-md transition-all ${className}`}
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-600/10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* GAIO Avatar & Voice Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden">
                <AuraCharacter
                  mood={isSpeaking ? 'explaining' : 'idle'}
                  size="sm"
                  variant="bust"
                  speakerName="GAIO (AI Guide)"
                  showSpeaker={false}
                />
              </div>
            </div>
            {/* Online Status Pill */}
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500 text-slate-950 flex items-center gap-0.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-tight flex items-center gap-1">
                GAIO
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 font-mono border border-cyan-800/60 uppercase">
                  AI Guide
                </span>
              </span>
              <span className="text-xs">{concept?.emoji || '🤖'}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Male Voice · Slow & Bold Explanation
            </p>

            {/* Quick Speech Trigger Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isSpeaking
                  ? 'bg-rose-500 text-white shadow-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX size={14} />
                  <span>Pause GAIO</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Listen to GAIO</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story & Analogy Box */}
        <div className="flex-1 w-full bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Baby size={11} />
                <span>Super Simple Decoded</span>
              </span>
              <span className="text-xs font-bold text-slate-200">
                {concept?.term || lessonTitle}
              </span>
            </div>

            {showDetailedToggle && (
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
                <button
                  type="button"
                  onClick={() => setViewMode('kindergarten')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    viewMode === 'kindergarten'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  👶 Simple
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('deep')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    viewMode === 'deep'
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔬 Tech View
                </button>
              </div>
            )}
          </div>

          {viewMode === 'kindergarten' ? (
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal">
                {simpleStory}
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60 text-[11px] text-slate-300">
                <Lightbulb size={12} className="text-amber-400 shrink-0" />
                <span className="font-medium text-slate-300">{simpleExplanation}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed font-mono">
                {technicalDef}
              </p>
              {concept?.funExample && (
                <p className="text-[11px] text-slate-400 italic">
                  💡 Real-World Example: {concept.funExample}
                </p>
              )}
            </div>
          )}

          {/* Equalizer Wave when speaking */}
          {isSpeaking && (
            <div className="mt-2.5 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/40">
              <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                GAIO Speaking:
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-cyan-400 rounded-full animate-aura-wave-1" />
                <span className="w-1 h-4 bg-cyan-300 rounded-full animate-aura-wave-2" />
                <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-aura-wave-3" />
                <span className="w-1 h-4 bg-cyan-200 rounded-full animate-aura-wave-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default GaioGuideBanner
