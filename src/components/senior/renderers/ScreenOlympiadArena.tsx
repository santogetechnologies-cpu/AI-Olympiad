// ─────────────────────────────────────────────────────────────────────────────
// STAGE 6: OLYMPIAD EXAMINATION CHALLENGE ARENA
// 4 rigorous Olympiad questions with interactive multiple-choice options,
// instant grading, dynamic XP rewards, confetti bursts, and in-depth mathematical solutions.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { SeniorScreenItem, OlympiadQuestion } from '../types'
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import { GaioGuideBanner } from '../../common/GaioGuideBanner'

export interface ScreenOlympiadArenaProps {
  screen: SeniorScreenItem
  onNext: () => void
  savedAnswers?: { [qNum: number]: 'A' | 'B' | 'C' | 'D' }
  onSaveAnswers?: (answers: { [qNum: number]: 'A' | 'B' | 'C' | 'D' }) => void
  onAddXP?: (amount: number) => void
}

export const ScreenOlympiadArena: React.FC<ScreenOlympiadArenaProps> = ({
  screen,
  onNext,
  savedAnswers = {},
  onSaveAnswers,
  onAddXP
}) => {
  const { lesson } = screen
  const questions: OlympiadQuestion[] = lesson.olympiad

  const [userAnswers, setUserAnswers] = useState<{ [qNum: number]: 'A' | 'B' | 'C' | 'D' }>(
    savedAnswers
  )
  const [expandedExplanations, setExpandedExplanations] = useState<{ [qNum: number]: boolean }>({})
  const [hintsOpen, setHintsOpen] = useState<{ [qNum: number]: boolean }>({})

  const handleSelectOption = (qNum: number, optKey: 'A' | 'B' | 'C' | 'D') => {
    if (userAnswers[qNum]) return // Already answered

    const updated = { ...userAnswers, [qNum]: optKey }
    setUserAnswers(updated)
    if (onSaveAnswers) onSaveAnswers(updated)

    // Check if correct
    const qObj = questions.find((q) => q.questionNumber === qNum)
    if (qObj && qObj.correctOption === optKey) {
      gameAudio.playSuccess()
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } })
      if (onAddXP) onAddXP(50)
    } else {
      gameAudio.playTap()
    }

    // Auto expand explanation
    setExpandedExplanations((prev) => ({ ...prev, [qNum]: true }))
  }

  // Count correct
  const correctCount = questions.filter(
    (q) => userAnswers[q.questionNumber] === q.correctOption
  ).length
  const totalAnswered = Object.keys(userAnswers).length

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award size={16} />
            <span>Stage 6 · Olympiad Examination Arena</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          lessonTitle={`Olympiad Challenge: ${lesson.lessonTitle}`}
          fallbackAnalogy="Treat these 4 questions like fun puzzle riddles! GAIO will help you decode any tricky word. Think carefully, eliminate the silly answers, and tap your best choice!"
        />

        {/* Challenge Scorecard Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
              <span>Olympiad Examination: {lesson.lessonTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              4 rigorous analytical & algorithmic problems based on official competition formats.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-xs text-slate-400">Scorecard</div>
              <div className="text-base sm:text-lg font-black text-cyan-300">
                {correctCount} / {questions.length} Correct
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center gap-1.5">
              <Flame size={14} />
              <span>+{correctCount * 50} XP</span>
            </div>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-5">
          {questions.map((q) => {
            const selected = userAnswers[q.questionNumber]
            const isAnswered = selected !== undefined
            const isCorrect = isAnswered && selected === q.correctOption
            const showExpl = expandedExplanations[q.questionNumber]

            return (
              <div
                key={q.questionNumber}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-800/60 shadow-lg'
                      : 'bg-rose-950/15 border-rose-800/50'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Question Stem */}
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 text-xs font-mono font-black flex items-center justify-center border border-slate-700">
                    Q{q.questionNumber}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                      {q.stem}
                    </div>

                    {/* 👶 Simple Question Decoder Toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        setHintsOpen((prev) => ({
                          ...prev,
                          [q.questionNumber]: !prev[q.questionNumber]
                        }))
                      }
                      className="mt-1.5 text-[10px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span>👶</span>
                      <span>
                        {hintsOpen[q.questionNumber]
                          ? 'Hide Simple Story Hint'
                          : 'Confused by big words? Click for Kindergarten Hint'}
                      </span>
                    </button>

                    {hintsOpen[q.questionNumber] && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed animate-fadeIn">
                        <strong>👶 In Simple Words: </strong>
                        Think of this like choosing the fairest rule on the playground or finding which clue has the loudest megaphone volume! Look at the options and find which one directly matches the core story we learned.
                      </div>
                    )}
                  </div>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
                  {q.options.map((opt) => {
                    const isSelectedOpt = selected === opt.key
                    const isCorrectOpt = opt.key === q.correctOption

                    let btnStyle =
                      'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    if (isAnswered) {
                      if (isCorrectOpt) {
                        btnStyle =
                          'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      } else if (isSelectedOpt) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold'
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.questionNumber, opt.key)}
                        className={`p-3 rounded-xl border text-xs text-left flex items-start gap-2.5 transition-all cursor-pointer ${btnStyle}`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                            isAnswered && isCorrectOpt
                              ? 'bg-emerald-500 text-slate-950'
                              : isAnswered && isSelectedOpt
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Detailed Solution Explainer */}
                {isAnswered && (
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedExplanations((prev) => ({
                          ...prev,
                          [q.questionNumber]: !prev[q.questionNumber]
                        }))
                      }
                      className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>
                        {showExpl ? 'Hide In-Depth Solution' : 'View In-Depth Technical Solution'}
                      </span>
                      {showExpl ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {showExpl && (
                      <div className="mt-2.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-normal">
                        <div className="font-mono text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          <span>Correct Answer: Option {q.correctOption}</span>
                        </div>
                        <p className="text-slate-400">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="text-xs text-slate-400 font-mono">
          <span>{totalAnswered} of 4 answered</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Complete Stage & View Debrief</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
