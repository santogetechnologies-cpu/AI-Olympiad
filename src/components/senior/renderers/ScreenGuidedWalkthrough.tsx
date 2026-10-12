// ─────────────────────────────────────────────────────────────────────────────
// STAGE 3: GUIDED DEMONSTRATION & COMPUTATIONAL WALKTHROUGH
// Step-by-step master walkthrough, worked derivations, and system mechanics.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { SeniorScreenItem } from '../types'
import { CheckCircle2, ArrowRight, Play, Terminal, Layers, Sparkles } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { GaioGuideBanner } from '../../common/GaioGuideBanner'

export interface ScreenGuidedWalkthroughProps {
  screen: SeniorScreenItem
  onNext: () => void
}

export const ScreenGuidedWalkthrough: React.FC<ScreenGuidedWalkthroughProps> = ({ screen, onNext }) => {
  const { lesson } = screen

  // Clean LaTeX math symbols into plain-English human readable text
  const cleanFriendlyText = (raw: string) => {
    return raw
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 divided by $2)')
      .replace(/\\hat\{([^}]+)\}/g, '$1_predicted')
      .replace(/\\sum/g, 'Total sum')
      .replace(/\\times/g, ' × ')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '')
  }

  const rawWalkthrough = lesson.walkthrough.fullText
  const paragraphs = rawWalkthrough
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Play size={16} />
            <span>Stage 3 · Computational Walkthrough & Worked Examples</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-100">
          Master Demonstration: {lesson.lessonTitle}
        </h2>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          conceptTerm={lesson.vocab[0] || lesson.lessonTitle}
          lessonTitle={`Step-by-Step Guide: ${lesson.lessonTitle}`}
          fallbackAnalogy={`Think of this step like building with Lego bricks following page 1, 2, and 3. We take the pieces, fit them together, and see the finished model!`}
        />

        {/* Content Render Cards */}
        <div className="space-y-4">
          {paragraphs.map((p, idx) => {
            if (p.startsWith('###') || p.startsWith('##')) {
              const headingText = p.replace(/^#+\s*/, '')
              return (
                <div key={idx} className="pt-2">
                  <h3 className="text-base sm:text-lg font-black text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>{headingText}</span>
                  </h3>
                </div>
              )
            }

            const hasMath = p.includes('$$') || p.includes('\\text') || p.includes('\\times') || p.includes('=') && p.includes('$')

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  hasMath
                    ? 'bg-slate-900 border-cyan-800/60 font-mono text-cyan-100'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300'
                }`}
              >
                {hasMath ? cleanFriendlyText(p) : p}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Next: Launch the Live Gamified Simulation</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Launch Gamified Simulation</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
