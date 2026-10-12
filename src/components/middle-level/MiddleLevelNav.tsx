// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL BOTTOM NAVIGATION PRIMITIVE
// Stage stepper pills, Back / Next controls, stage completion indicators
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { LessonStageKey } from './types'
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  BookOpen,
  FlaskConical,
  Gamepad2,
  Terminal,
  Trophy,
  ShieldCheck,
  Check
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'

export interface MiddleLevelNavProps {
  currentStage: LessonStageKey
  completedStages: LessonStageKey[]
  onSelectStage: (stage: LessonStageKey) => void
  onPrev: () => void
  onNext: () => void
  isFirstLesson?: boolean
  isLastLesson?: boolean
}

const STAGES_META: { key: LessonStageKey; label: string; icon: any }[] = [
  { key: 'briefing', label: 'Briefing', icon: Shield },
  { key: 'concept', label: 'Concept', icon: BookOpen },
  { key: 'experiment', label: 'Lab', icon: FlaskConical },
  { key: 'game', label: 'Game', icon: Gamepad2 },
  { key: 'python', label: 'Python', icon: Terminal },
  { key: 'olympiad', label: 'Olympiad', icon: Trophy },
  { key: 'responsible', label: 'Ethics', icon: ShieldCheck }
]

export const MiddleLevelNav: React.FC<MiddleLevelNavProps> = ({
  currentStage,
  completedStages,
  onSelectStage,
  onPrev,
  onNext,
  isFirstLesson,
  isLastLesson
}) => {
  const currentStageIdx = STAGES_META.findIndex((s) => s.key === currentStage)
  const isFirstStage = currentStageIdx === 0
  const isLastStage = currentStageIdx === STAGES_META.length - 1

  return (
    <footer className="shrink-0 pt-2 pb-1.5 border-t border-slate-800 flex items-center justify-between gap-1 sm:gap-2 px-2.5 bg-slate-900/95 rounded-b-2xl select-none">
      {/* Back Button */}
      <button
        onClick={() => {
          gameAudio.playTap()
          onPrev()
        }}
        disabled={isFirstStage && isFirstLesson}
        className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
          isFirstStage && isFirstLesson
            ? 'opacity-30 cursor-not-allowed bg-slate-950 text-slate-600'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 active:scale-95'
        }`}
        aria-label="Previous Stage"
      >
        <ArrowLeft size={14} />
        <span className="hidden xs:inline">Back</span>
      </button>

      {/* Center 7-Stage Stepper Pills */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[65vw]">
        {STAGES_META.map((stage, idx) => {
          const isCurrent = stage.key === currentStage
          const isCompleted = completedStages.includes(stage.key)
          const Icon = stage.icon

          let style = 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          if (isCurrent) {
            style = 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold shadow-xs shadow-sky-500/20 ring-1 ring-sky-400'
          } else if (isCompleted) {
            style = 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400'
          }

          return (
            <button
              key={stage.key}
              onClick={() => {
                gameAudio.playTap()
                onSelectStage(stage.key)
              }}
              className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all shrink-0 cursor-pointer ${style}`}
              title={`Stage ${idx + 1}: ${stage.label}`}
            >
              <Icon size={12} className={isCurrent ? 'text-sky-300' : isCompleted ? 'text-emerald-400' : 'text-slate-500'} />
              <span className="hidden sm:inline">{stage.label}</span>
              {isCompleted && !isCurrent && (
                <Check size={10} className="text-emerald-400 shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          gameAudio.playTap()
          onNext()
        }}
        className="py-1.5 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
        aria-label="Next Stage"
      >
        <span className="hidden xs:inline">
          {isLastStage ? 'Finish Lesson' : 'Next'}
        </span>
        <ArrowRight size={14} />
      </button>
    </footer>
  )
}
