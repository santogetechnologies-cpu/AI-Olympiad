// ─────────────────────────────────────────────────────────────────────────────
// PAGE WORKSHEET PART A RENDERER (PDF Page 10 & Page 20)
// Does it use AI? Yes/No interactive worksheet from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Check, X, Sparkles, Award } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PageWorksheetPartAProps {
  pageConfig: GaioPageConfig
}

export const PageWorksheetPartA: React.FC<PageWorksheetPartAProps> = ({ pageConfig }) => {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({})
  const [robotName, setRobotName] = useState<string>('Bolt')

  const items = pageConfig.worksheetAItems || [
    { id: 'w1', text: 'Smart speaker (plays music)', imageSrc: '/gaio/class3/images/p10_img_1.png', isAi: true },
    { id: 'w2', text: 'Wooden chair', imageSrc: '/gaio/class3/images/p10_img_2.png', isAi: false },
    { id: 'w3', text: 'Self-driving car', imageSrc: '/gaio/class3/images/p10_img_3.png', isAi: true },
    { id: 'w4', text: 'Bicycle', imageSrc: '/gaio/class3/images/p10_img_4.png', isAi: false },
    { id: 'w5', text: 'Phone that recognizes faces', imageSrc: '/gaio/class3/images/p10_img_5.png', isAi: true }
  ]

  const handleChoice = (id: string, choice: 'yes' | 'no', isAi: boolean) => {
    const isCorrect = (choice === 'yes' && isAi) || (choice === 'no' && !isAi)
    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }
    setAnswers((prev) => ({ ...prev, [id]: choice }))
  }

  const answeredCount = Object.keys(answers).length
  const isComplete = answeredCount === items.length

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header & Student Info Strip */}
      <div className="shrink-0 pb-1 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#0288D1]">
            {answeredCount} / {items.length} Done
          </span>
        </div>
        <p className="text-[10px] text-slate-600 font-semibold mt-0.5">
          1. Does it use AI? Tap YES or NO:
        </p>
      </div>

      {/* 2. Interactive Questions List */}
      <div className="space-y-1.5 flex-1 min-h-0 py-1 overflow-hidden flex flex-col justify-center">
        {items.map((item, idx) => {
          const userChoice = answers[item.id]
          const isCorrect = userChoice && ((userChoice === 'yes' && item.isAi) || (userChoice === 'no' && !item.isAi))

          return (
            <div
              key={item.id}
              className={`p-1.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                userChoice
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[9px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 truncate">
                  {item.text}
                </span>
              </div>

              {/* YES / NO Ticks */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice(item.id, 'yes', item.isAi)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                    userChoice === 'yes'
                      ? item.isAi
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice(item.id, 'no', item.isAi)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                    userChoice === 'no'
                      ? !item.isAi
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  NO
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Bottom Robot Friend Customizer (Section 2 from PDF) */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-1.5 shrink-0 flex items-center justify-between gap-2">
        <span className="text-[9px] sm:text-[10px] font-black text-amber-900 truncate">
          2. My Robot Friend is named:
        </span>
        <div className="flex items-center gap-1">
          {['Bolt', 'Sparky', 'Chip', 'Nova'].map((name) => (
            <button
              key={name}
              onClick={() => {
                gameAudio.playTap()
                setRobotName(name)
              }}
              className={`px-1.5 py-0.5 rounded-md text-[9px] font-black cursor-pointer transition-all ${
                robotName === name
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-white text-amber-800 border border-amber-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
