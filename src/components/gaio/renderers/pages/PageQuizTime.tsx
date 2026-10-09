// ─────────────────────────────────────────────────────────────────────────────
// PAGE QUIZ TIME RENDERER (PDF Page 14 & Page 24)
// Exact 5 MCQs & Star Collector from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioQuizQuestion, GaioPageConfig } from '../../types'
import { Star, Sparkles, Check, X, RefreshCw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PageQuizTimeProps {
  pageConfig: GaioPageConfig
}

export const PageQuizTime: React.FC<PageQuizTimeProps> = ({ pageConfig }) => {
  // qId -> selectedOptionIdx
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const questions: GaioQuizQuestion[] = pageConfig.quizQuestions || [
    {
      id: 'q1',
      questionNumber: 1,
      questionText: 'Q1. AI is short for...',
      options: ['Apple Inside', 'Artificial Intelligence', 'Always Interesting'],
      correctIndex: 1
    },
    {
      id: 'q2',
      questionNumber: 2,
      questionText: 'Q2. Which of these uses AI?',
      options: ['Smart speaker', 'Wooden pencil', 'Cardboard box'],
      correctIndex: 0
    },
    {
      id: 'q3',
      questionNumber: 3,
      questionText: 'Q3. Can AI feel sad when it rains?',
      options: ['Yes', 'No', 'Only sometimes'],
      correctIndex: 1
    },
    {
      id: 'q4',
      questionNumber: 4,
      questionText: "Q4. What was the robot's name in the story?",
      options: ['Bolt', 'Max', 'Luna'],
      correctIndex: 0
    },
    {
      id: 'q5',
      questionNumber: 5,
      questionText: 'Q5. Which one is NOT an AI helper?',
      options: ['Robot vacuum', 'Drone camera', 'Wooden chair'],
      correctIndex: 2
    }
  ]

  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length

  const handleSelectOption = (q: GaioQuizQuestion, oIdx: number) => {
    const isCorrect = oIdx === q.correctIndex
    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }

    const nextAnswers = { ...answers, [q.id]: oIdx }
    setAnswers(nextAnswers)

    const nextCorrect = questions.filter((item) => nextAnswers[item.id] === item.correctIndex).length
    if (nextCorrect === questions.length) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header & Star Score Counter */}
      <div className="shrink-0 pb-1 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            Circle the right answer! Earn gold stars:
          </p>
        </div>

        {/* Gold Star Rating Score */}
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          <Star size={13} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-black text-amber-900">
            {correctCount} / {questions.length}
          </span>
        </div>
      </div>

      {/* 2. 5 Multiple Choice Questions List (Compact Single-Screen Fit) */}
      <div className="space-y-1.5 flex-1 min-h-0 py-1 overflow-hidden flex flex-col justify-around">
        {questions.map((q) => {
          const userChoice = answers[q.id]
          const isAnswered = userChoice !== undefined
          const isCorrect = userChoice === q.correctIndex

          return (
            <div
              key={q.id}
              className={`p-1.5 rounded-xl border transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">
                  {q.questionText}
                </span>
                {isAnswered && (
                  isCorrect ? (
                    <span className="text-[8px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Check size={9} /> Correct
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <X size={9} /> Try again
                    </span>
                  )
                )}
              </div>

              {/* 3 Option Pills */}
              <div className="grid grid-cols-3 gap-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userChoice === oIdx
                  const isThisCorrect = oIdx === q.correctIndex

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(q, oIdx)}
                      className={`py-1 px-1 rounded-lg text-[9px] font-bold text-center border transition-all cursor-pointer truncate ${
                        isSelected
                          ? isThisCorrect
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                            : 'bg-rose-600 text-white border-rose-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Bottom Reset / Celebration Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl px-2 py-1 shrink-0 flex items-center justify-between">
        <span className="text-[9px] font-bold text-[#0D47A1]">
          {correctCount === questions.length
            ? '🎉 Perfect 5/5 stars! You are an AI Super Star!'
            : `Answer all 5 questions to earn full stars.`}
        </span>
        <button
          onClick={() => setAnswers({})}
          className="p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          title="Retry Quiz"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  )
}
