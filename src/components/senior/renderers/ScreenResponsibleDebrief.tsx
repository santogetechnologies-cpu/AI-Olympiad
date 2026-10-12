// ─────────────────────────────────────────────────────────────────────────────
// STAGE 7: RESPONSIBLE AI AUDIT & MASTERY DEBRIEF
// Ethical case dilemmas, 3-tier rubrics, badge unlocks, XP celebration & progression.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { SeniorScreenItem } from '../types'
import {
  ShieldAlert,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame,
  Check,
  RotateCcw
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import { GaioGuideBanner } from '../../common/GaioGuideBanner'

export interface ScreenResponsibleDebriefProps {
  screen: SeniorScreenItem
  onNext: () => void
  onAddXP?: (amount: number) => void
  onAddStars?: (count: number) => void
}

export const ScreenResponsibleDebrief: React.FC<ScreenResponsibleDebriefProps> = ({
  screen,
  onNext,
  onAddXP,
  onAddStars
}) => {
  const { lesson } = screen
  const [selectedRubric, setSelectedRubric] = useState<'exemplary' | 'proficient' | 'developing'>(
    'exemplary'
  )
  const [hasClaimedBadge, setHasClaimedBadge] = useState<boolean>(false)

  const handleClaimBadge = () => {
    if (hasClaimedBadge) return
    setHasClaimedBadge(true)
    gameAudio.playComplete()
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } })
    if (onAddXP) onAddXP(lesson.reflection.xpReward)
    if (onAddStars) onAddStars(3)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>Stage 7 · Responsible AI & Capstone Debrief</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        {/* Responsible AI Dilemma Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-cyan-800/50 shadow-xl space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert size={15} />
            <span>Ethical Reflection & Societal Impact</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100">
            Real-World Responsibility: {lesson.lessonTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {lesson.reflection.text}
          </p>
        </div>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          lessonTitle="Responsible AI: Fairness & Kindness"
          fallbackAnalogy="Imagine a teacher who baked fresh cookies for the whole class. If the teacher only gives cookies to kids with blue backpacks and leaves everyone else hungry, that is unfair bias! Responsible AI makes sure everyone gets treated with respect, kindness, and equal opportunity."
        />

        {/* 3-Tier Rubric Self-Assessment */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Measurable Mastery Rubric Self-Assessment:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Exemplary */}
            <div
              onClick={() => setSelectedRubric('exemplary')}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedRubric === 'exemplary'
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
                  <span>Tier 1: Exemplary</span>
                  {selectedRubric === 'exemplary' && <Check size={14} />}
                </div>
                <p className="text-slate-300 leading-snug">{lesson.reflection.rubric.exemplary}</p>
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                Score: 90–100% (Gold Standard)
              </div>
            </div>

            {/* Proficient */}
            <div
              onClick={() => setSelectedRubric('proficient')}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedRubric === 'proficient'
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-bold text-cyan-400 mb-1">
                  <span>Tier 2: Proficient</span>
                  {selectedRubric === 'proficient' && <Check size={14} />}
                </div>
                <p className="text-slate-300 leading-snug">{lesson.reflection.rubric.proficient}</p>
              </div>
              <div className="mt-2 text-[10px] font-mono text-cyan-400 font-bold uppercase">
                Score: 75–89% (Silver Standard)
              </div>
            </div>

            {/* Developing */}
            <div
              onClick={() => setSelectedRubric('developing')}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedRubric === 'developing'
                  ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-bold text-amber-400 mb-1">
                  <span>Tier 3: Developing</span>
                  {selectedRubric === 'developing' && <Check size={14} />}
                </div>
                <p className="text-slate-300 leading-snug">{lesson.reflection.rubric.developing}</p>
              </div>
              <div className="mt-2 text-[10px] font-mono text-amber-400 font-bold uppercase">
                Score: 60–74% (Bronze Standard)
              </div>
            </div>
          </div>
        </div>

        {/* ── MASTERY BADGE CELEBRATION BOX ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0">
              <Award size={26} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase font-black text-cyan-400 tracking-wider">
                Official Lesson Certification
              </div>
              <h3 className="text-base font-black text-slate-100">
                {lesson.reflection.badgeTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Awarded for completing all 7 stages of {lesson.lessonTitle}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={hasClaimedBadge}
              onClick={handleClaimBadge}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                hasClaimedBadge
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] active:scale-95'
              }`}
            >
              <Sparkles size={14} />
              <span>
                {hasClaimedBadge
                  ? `Badge Claimed (+${lesson.reflection.xpReward} XP)`
                  : `Claim Badge (+${lesson.reflection.xpReward} XP)`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="text-xs text-slate-400 font-mono">
          <span>Lesson 100% Completed</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Continue to Next Lesson</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
