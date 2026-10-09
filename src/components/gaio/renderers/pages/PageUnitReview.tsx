// ─────────────────────────────────────────────────────────────────────────────
// PAGE UNIT REVIEW RENDERER (PDF Page 26)
// Month 1 AI DISCOVER Review from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Award, Check, Sparkles, RefreshCw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PageUnitReviewProps {
  pageConfig: GaioPageConfig
}

export const PageUnitReview: React.FC<PageUnitReviewProps> = ({ pageConfig }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const questions = pageConfig.reviewQuestions || [
    {
      id: 'rq1',
      questionNumber: 1,
      questionText: 'Q1. What makes a smart machine different from a regular machine?',
      options: ['It uses batteries', 'It can think and learn a little', 'It is made of wood'],
      correctIndex: 1
    },
    {
      id: 'rq2',
      questionNumber: 2,
      questionText: 'Q2. Which helper can fly to capture videos?',
      options: ['Drone camera', 'Smart TV', 'Robot vacuum'],
      correctIndex: 0
    }
  ]

  const handleSelect = (qId: string, optIdx: number, correctIdx: number) => {
    if (optIdx === correctIdx) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }
    const next = { ...answers, [qId]: optIdx }
    setAnswers(next)

    if (Object.keys(next).length === questions.length && Object.keys(next).every((k) => {
      const q = questions.find((item) => item.id === k)
      return q && next[k] === q.correctIndex
    })) {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 pb-1 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            {pageConfig.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          <Award size={13} className="text-amber-600" />
          <span className="text-[9px] font-black text-amber-900">Month Review</span>
        </div>
      </div>

      {/* 2. Review Questions */}
      <div className="space-y-2 flex-1 min-h-0 py-2 flex flex-col justify-around">
        {questions.map((q) => {
          const userChoice = answers[q.id]
          const isCorrect = userChoice === q.correctIndex

          return (
            <div
              key={q.id}
              className={`p-2 rounded-2xl border transition-all ${
                userChoice !== undefined
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h3 className="text-xs font-black text-slate-900 mb-1.5 leading-tight">
                {q.questionText}
              </h3>

              <div className="space-y-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userChoice === oIdx
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx, q.correctIndex)}
                      className={`w-full py-1.5 px-2.5 rounded-xl text-[10px] font-bold text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                            : 'bg-rose-600 text-white border-rose-700'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && isCorrect && <Check size={12} />}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Celebration Badge */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-2.5 py-1.5 shrink-0 flex items-center justify-between">
        <span className="text-[10px] font-bold text-emerald-900">
          🌟 You completed Month 1: AI Discover! Ready for Month 2!
        </span>
      </div>
    </div>
  )
}
