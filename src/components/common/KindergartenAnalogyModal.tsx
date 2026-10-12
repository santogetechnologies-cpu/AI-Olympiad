// ─────────────────────────────────────────────────────────────────────────────
// KINDERGARTEN CONCEPT EXPLAINER MODAL & DRAWER
// Displays crystal-clear, story-driven, kindergarten-level analogies for any concept.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { X, Sparkles, Volume2, BookOpen, Cpu, ShieldCheck, HeartHandshake } from 'lucide-react'
import type { KindergartenConcept } from './kindergartenConceptDictionary'
import { auraSpeechService } from '../../services/auraSpeechService'
import { gameAudio } from '../../utils/gameAudio'

export interface KindergartenAnalogyModalProps {
  concept: KindergartenConcept | null
  onClose: () => void
}

export const KindergartenAnalogyModal: React.FC<KindergartenAnalogyModalProps> = ({
  concept,
  onClose
}) => {
  if (!concept) return null

  const handleSpeakAnalogy = () => {
    gameAudio.playTap()
    auraSpeechService.speak(
      `${concept.term}. Here is the kindergarten story: ${concept.kindergartenAnalogy}. In simple words: ${concept.simpleExplanation}`
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-scaleUp">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-800/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-slate-950/60 rounded-2xl border border-cyan-800/40 shadow-inner">
              {concept.emoji}
            </span>
            <div>
              <div className="text-[10px] font-mono uppercase font-black text-cyan-400 tracking-wider">
                Kindergarten Concept Decoded · {concept.category}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {concept.term}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakAnalogy}
              className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all cursor-pointer"
              title="Listen to story"
            >
              <Volume2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                gameAudio.playTap()
                auraSpeechService.stop()
                onClose()
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* 1. THE BIG KINDERGARTEN ANALOGY */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-amber-950/10 border-2 border-amber-500/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-black uppercase tracking-wider">
              <Sparkles size={16} />
              <span>👶 Explain Like I'm in Kindergarten:</span>
            </div>
            <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
              "{concept.kindergartenAnalogy}"
            </p>
          </div>

          {/* 2. PLAIN ENGLISH EXPLANATION */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake size={14} />
              <span>In Plain English:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {concept.simpleExplanation}
            </p>
          </div>

          {/* 3. EVERYDAY EXAMPLE */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-mono text-emerald-400 font-bold uppercase text-[10px]">
              🚀 Everyday Real-Life Example:
            </span>
            <p className="text-slate-300 leading-snug">{concept.funExample}</p>
          </div>

          {/* 4. OLYMPIAD TECHNICAL DEFINITION (FOR SENIORS) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
            <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
              <Cpu size={12} className="text-cyan-500" />
              <span>Olympiad Technical Definition:</span>
            </span>
            <p className="text-cyan-200 text-[11px] leading-relaxed">
              {concept.technicalDefinition}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Global AI Olympiad Concept Engine</span>
          <button
            type="button"
            onClick={() => {
              gameAudio.playSuccess()
              auraSpeechService.stop()
              onClose()
            }}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all cursor-pointer"
          >
            Got It! 👍
          </button>
        </div>
      </div>
    </div>
  )
}
