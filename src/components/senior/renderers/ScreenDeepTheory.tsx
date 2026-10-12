// ─────────────────────────────────────────────────────────────────────────────
// STAGE 2: DEEP THEORY & ALGORITHMIC ARCHITECTURE
// Comprehensive mathematical derivations, neural mechanics, and formal foundations.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { SeniorScreenItem } from '../types'
import { BookOpen, Cpu, Sigma, ArrowRight, Layers, Lightbulb } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'

import { GaioGuideBanner } from '../../common/GaioGuideBanner'
import { InteractiveConceptPicture } from '../../common/InteractiveConceptPicture'

export interface ScreenDeepTheoryProps {
  screen: SeniorScreenItem
  onNext: () => void
  onOpenConcept?: (term: string) => void
}

export const ScreenDeepTheory: React.FC<ScreenDeepTheoryProps> = ({
  screen,
  onNext,
  onOpenConcept
}) => {
  const { lesson } = screen

  // Clean LaTeX math symbols into plain-English human readable text
  const cleanFriendlyText = (raw: string) => {
    return raw
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 divided by $2)')
      .replace(/\\hat\{([^}]+)\}/g, '$1_predicted')
      .replace(/\\sum/g, 'Total sum')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '')
  }

  // Format raw markdown theory into readable paragraphs and callouts
  const rawTheory = lesson.theory.fullText
  const paragraphs = rawTheory
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Stage Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Cpu size={16} />
            <span>Stage 2 · Algorithmic & Mathematical Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-100">
          Technical Foundations: {lesson.lessonTitle}
        </h2>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          conceptTerm={lesson.vocab[0] || lesson.lessonTitle}
          lessonTitle={lesson.lessonTitle}
        />

        {/* 🎨 Interactive Picture & Animation Lab */}
        <InteractiveConceptPicture
          conceptTitle={lesson.lessonTitle}
          gradeNumber={screen.gradeNumber}
        />

        {/* Content Render Cards */}
        <div className="space-y-4">
          {paragraphs.map((p, idx) => {
            // Check if paragraph is a subheader
            if (p.startsWith('###') || p.startsWith('##')) {
              const headingText = p.replace(/^#+\s*/, '')
              return (
                <div key={idx} className="pt-2">
                  <h3 className="text-base sm:text-lg font-black text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                    <span>{headingText}</span>
                  </h3>
                </div>
              )
            }

            // Check if paragraph contains math formulas ($$ or $)
            const hasMath = p.includes('$$') || p.includes('\\text') || p.includes('\\hat') || p.includes('\\sum')

            if (hasMath) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900 border border-cyan-800/50 shadow-lg font-mono text-xs sm:text-sm text-cyan-200"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    <Sigma size={13} />
                    <span>How Numbers Work (Decoded into Plain English)</span>
                  </div>
                  <div className="overflow-x-auto whitespace-pre-wrap leading-relaxed py-1 text-xs text-amber-200">
                    {cleanFriendlyText(p)}
                  </div>
                </div>
              )
            }

            // Standard prose block
            return (
              <div
                key={idx}
                className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/40 p-4 rounded-xl border border-slate-800/80"
              >
                {p}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Lightbulb size={14} className="text-amber-400" />
          <span>Next: Step-by-Step Computational Walkthrough</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Continue to Walkthrough</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
