// ─────────────────────────────────────────────────────────────────────────────
// PAGE TRUE OR FALSE RENDERER (PDF Page 15 & Page 25)
// 6 True/False statements, Home Connect, and Rating Faces from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioTrueFalseItem, GaioPageConfig } from '../../types'
import { Check, X, Heart, Smile, Sparkles, Home, Star } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PageTrueOrFalseProps {
  pageConfig: GaioPageConfig
}

export const PageTrueOrFalse: React.FC<PageTrueOrFalseProps> = ({ pageConfig }) => {
  // stId -> userChoice (boolean)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [rating, setRating] = useState<'loved' | 'good' | 'okay' | null>(null)

  const statements: GaioTrueFalseItem[] = pageConfig.trueFalseItems || [
    { id: 'tf1', statementNumber: 1, statementText: 'AI means Artificial Intelligence.', isTrue: true },
    { id: 'tf2', statementNumber: 2, statementText: 'A regular bicycle uses AI.', isTrue: false },
    { id: 'tf3', statementNumber: 3, statementText: 'AI can help clean floors.', isTrue: true },
    { id: 'tf4', statementNumber: 4, statementText: 'AI can feel angry.', isTrue: false },
    { id: 'tf5', statementNumber: 5, statementText: 'Smart speakers can play music when you ask.', isTrue: true },
    { id: 'tf6', statementNumber: 6, statementText: 'AI is here to help us.', isTrue: true },
  ]

  const handleSelect = (st: GaioTrueFalseItem, choice: boolean) => {
    const isCorrect = choice === st.isTrue
    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }

    const nextAnswers = { ...answers, [st.id]: choice }
    setAnswers(nextAnswers)

    const correctCount = statements.filter((s) => nextAnswers[s.id] === s.isTrue).length
    if (correctCount === statements.length) {
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
            Look at the picture. Tick TRUE or FALSE:
          </p>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
          {Object.keys(answers).length} / {statements.length} Answered
        </div>
      </div>

      {/* 2. 6 True/False Statements */}
      <div className="space-y-1 flex-1 min-h-0 py-1 overflow-hidden flex flex-col justify-around">
        {statements.map((st) => {
          const userChoice = answers[st.id]
          const isAnswered = userChoice !== undefined
          const isCorrect = userChoice === st.isTrue

          return (
            <div
              key={st.id}
              className={`p-1 sm:p-1.5 rounded-xl border flex items-center justify-between gap-1.5 transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 flex-1 leading-tight pr-1">
                {st.statementNumber}. {st.statementText}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelect(st, true)}
                  className={`px-2 py-0.5 rounded text-[9px] font-black cursor-pointer transition-all ${
                    userChoice === true
                      ? st.isTrue
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  TRUE
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect(st, false)}
                  className={`px-2 py-0.5 rounded text-[9px] font-black cursor-pointer transition-all ${
                    userChoice === false
                      ? !st.isTrue
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  FALSE
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Home Connect Family Prompt */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-1.5 shrink-0 flex items-center gap-2">
        <Home size={15} className="text-amber-700 shrink-0" />
        <p className="text-[9px] font-bold text-amber-900 leading-tight">
          <b>Home Connect:</b> {pageConfig.homeConnectPrompt || 'Ask someone at home: "Do we have any smart devices in our house?" Make a list together!'}
        </p>
      </div>

      {/* 4. Bottom Rating Faces: Loved it / Good / Okay */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shrink-0 flex items-center justify-between mt-1">
        <span className="text-[9px] font-bold text-slate-600">
          How did you like this topic?
        </span>
        <div className="flex items-center gap-2">
          {[
            { id: 'loved' as const, label: 'Loved it! 😍', color: 'text-rose-600' },
            { id: 'good' as const, label: 'Good! 😊', color: 'text-emerald-600' },
            { id: 'okay' as const, label: 'Okay 🙂', color: 'text-amber-600' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => {
                gameAudio.playSuccess()
                setRating(r.id)
              }}
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                rating === r.id
                  ? 'bg-white shadow-xs font-black border border-slate-300 scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
