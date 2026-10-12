// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — SHELL PRIMITIVE
// Cyber-minimalist viewport container with top HUD, step track, and responsive frame.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { Flame, Sparkles, Award, Compass, Layers, ShieldCheck, Terminal, Cpu } from 'lucide-react'

export interface SeniorBookShellProps {
  gradeTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  lessonTitle: string
  stepNumber: number
  totalLessonSteps: number
  stageTitle: string
  xpEarned: number
  starsCollected: number
  onOpenTOC: () => void
  onOpenGlossary?: () => void
  isSimpleMode?: boolean
  onToggleSimpleMode?: () => void
  onSelectGrade?: (gradeNum: number) => void
  currentGradeNum: number
  children: React.ReactNode
}

export const SeniorBookShell: React.FC<SeniorBookShellProps> = ({
  gradeTitle,
  chapterNumber,
  chapterTitle,
  lessonNumber,
  lessonTitle,
  stepNumber,
  totalLessonSteps,
  stageTitle,
  xpEarned,
  starsCollected,
  onOpenTOC,
  onOpenGlossary,
  isSimpleMode = false,
  onToggleSimpleMode,
  onSelectGrade,
  currentGradeNum,
  children
}) => {
  const STAGE_NAMES = [
    'Mission Brief',
    'Core Theory',
    'Walkthrough',
    'Simulation',
    'Python Lab',
    'Olympiad Arena',
    'Debrief & Rubric'
  ]

  return (
    <div
      className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl relative select-none"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 1. TOP CYBER HUD BAR */}
      <header className="shrink-0 flex items-center justify-between px-3 sm:px-5 py-2.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 z-20">
        {/* Left: Brand & Grade Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-[11px] sm:text-xs font-black tracking-wider text-cyan-400 uppercase hidden md:inline">
              AI Olympiad
            </span>
          </div>

          {/* Grade Quick Selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-xl border border-slate-800">
            {[9, 10, 11, 12].map((g) => {
              const active = g === currentGradeNum
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onSelectGrade && onSelectGrade(g)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)] font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Class {g}
                </button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-800">
            <span className="font-semibold text-slate-300">Ch {chapterNumber}:</span>
            <span className="truncate max-w-[130px] font-medium text-slate-400">{chapterTitle}</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-300 font-semibold truncate max-w-[140px]">{lessonTitle}</span>
          </div>
        </div>

        {/* Right: XP, Stars & TOC Launcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shadow-xs">
            <Flame size={14} className="text-amber-400 animate-bounce" />
            <span className="font-mono">{xpEarned}</span>
            <span className="text-[10px] text-amber-500/80 uppercase font-semibold">XP</span>
          </div>

          {/* Stars */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold shadow-xs">
            <Sparkles size={13} className="text-violet-400" />
            <span className="font-mono">{starsCollected}</span>
          </div>

          {/* Kindergarten Concept Stories / Glossary Button */}
          {onOpenGlossary && (
            <button
              type="button"
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 hover:text-amber-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Open Kindergarten Concept Stories & Analogies"
            >
              <span>👶</span>
              <span className="hidden md:inline">Concept Stories</span>
            </button>
          )}

          {/* Simple Mode Toggle */}
          {onToggleSimpleMode && (
            <button
              type="button"
              onClick={onToggleSimpleMode}
              className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isSimpleMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
              }`}
              title="Toggle Super-Simple Kindergarten Explanations"
            >
              <span>👶</span>
              <span className="hidden lg:inline">{isSimpleMode ? 'ELI5 Active' : 'ELI5'}</span>
            </button>
          )}

          {/* Table of Contents Button */}
          <button
            type="button"
            onClick={onOpenTOC}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Browse Syllabus, Chapters & Lessons"
          >
            <Compass size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Index</span>
          </button>
        </div>
      </header>

      {/* 2. SUBHEADER: 7-STEP LESSON STAGE PROGRESS TRACKER */}
      <div className="shrink-0 px-3 sm:px-6 py-2 bg-slate-900/50 border-b border-slate-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/40">
            Stage {stepNumber} of {totalLessonSteps}
          </span>
          <span className="text-xs font-bold text-slate-200 truncate max-w-[200px] sm:max-w-md">
            {stageTitle}
          </span>
        </div>

        {/* Visual Progress Steps Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {STAGE_NAMES.map((name, idx) => {
            const stepIdx = idx + 1
            const isCompleted = stepIdx < stepNumber
            const isCurrent = stepIdx === stepNumber
            return (
              <div
                key={name}
                className="group relative flex items-center"
                title={`Stage ${stepIdx}: ${name}`}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-6 sm:w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                      : isCompleted
                      ? 'w-2 sm:w-2.5 bg-emerald-500/80'
                      : 'w-2 sm:w-2.5 bg-slate-800'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE VIEWPORT CONTAINER */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col justify-between bg-slate-950">
        {children}
      </main>

      {/* 4. FOOTER STATUS BAR */}
      <div className="shrink-0 flex items-center justify-between px-4 py-1 text-[10px] text-slate-500 border-t border-slate-900 bg-slate-950/90 font-mono">
        <span className="flex items-center gap-1.5">
          <Cpu size={12} className="text-cyan-500" />
          <span>Senior AI Olympiad Curriculum · Class {currentGradeNum}</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">
          Official 6-Month Senior Olympiad Standards
        </span>
      </div>
    </div>
  )
}
