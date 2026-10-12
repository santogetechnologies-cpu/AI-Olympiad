// ─────────────────────────────────────────────────────────────────────────────
// STAGE 1: MISSION BRIEFING & REAL-WORLD PROBLEM SCENARIO
// High-tech, immersive operational brief setting the mission context and stakes.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { SeniorScreenItem } from '../types'
import { Target, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'

import { GaioGuideBanner } from '../../common/GaioGuideBanner'
import { InteractiveConceptPicture } from '../../common/InteractiveConceptPicture'

export interface ScreenMissionBriefingProps {
  screen: SeniorScreenItem
  onNext: () => void
  onOpenConcept?: (term: string) => void
}

export const ScreenMissionBriefing: React.FC<ScreenMissionBriefingProps> = ({
  screen,
  onNext,
  onOpenConcept
}) => {
  const { lesson } = screen

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      {/* Top Identity Badge */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-black bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-slate-900 text-slate-400 border border-slate-800">
            Strand: {lesson.strand}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-amber-950/40 text-amber-400 border border-amber-800/40 flex items-center gap-1">
            <Sparkles size={11} />
            <span>Target: +{lesson.reflection.xpReward} XP</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {lesson.lessonTitle}
        </h1>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/20 border border-cyan-900/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Target size={15} />
            <span>Operational Mission Briefing</span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-cyan-200 mb-2">
            {lesson.mission.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {lesson.mission.body}
          </p>
        </div>

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
      </div>

      {/* Grid: Objectives & Vocabulary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* Objectives */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Core Learning Objectives</span>
          </div>
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vocabulary & Key Architectures */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                <Cpu size={15} className="text-cyan-400" />
                <span>Key Concepts (Tap to Decode)</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono">👶 ELI5 Stories</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lesson.vocab.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    gameAudio.playTap()
                    if (onOpenConcept) onOpenConcept(v)
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-amber-500/20 text-cyan-300 hover:text-amber-200 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  title={`Click to read simple kindergarten story for ${v}`}
                >
                  <span>👶</span>
                  <span>{v}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Estimated Duration: 90 Min</span>
            <span className="text-cyan-400 font-mono">Stage 1 of 7</span>
          </div>
        </div>
      </div>

      {/* Launch Action */}
      <div className="shrink-0 pt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Accept Mission & Unlock Theory</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
