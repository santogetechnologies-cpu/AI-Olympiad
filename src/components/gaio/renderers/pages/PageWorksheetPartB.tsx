// ─────────────────────────────────────────────────────────────────────────────
// PAGE WORKSHEET PART B RENDERER (PDF Page 11 & Page 21)
// Match helper to job + Word Box Blanks from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Check, Sparkles, RefreshCw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PageWorksheetPartBProps {
  pageConfig: GaioPageConfig
}

export const PageWorksheetPartB: React.FC<PageWorksheetPartBProps> = ({ pageConfig }) => {
  // Matching Activity State
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}) // leftId -> rightId

  // Word Box Blanks State
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({})

  const leftItems = [
    { id: 'speaker', label: 'Smart Speaker', img: '/gaio/class3/images/p11_img_1.png', matchId: 'music' },
    { id: 'drone', label: 'Drone Camera', img: '/gaio/class3/images/p11_img_2.png', matchId: 'sky' },
    { id: 'vacuum', label: 'Robot Vacuum', img: '/gaio/class3/images/p11_img_3.png', matchId: 'floor' },
    { id: 'phone', label: 'Face Unlock', img: '/gaio/class3/images/p11_img_4.png', matchId: 'face' },
  ]

  const rightItems = [
    { id: 'sky', label: 'Takes photos from high in the sky' },
    { id: 'floor', label: 'Cleans the floor' },
    { id: 'music', label: 'Plays your favorite music' },
    { id: 'face', label: 'Opens the phone when it sees you' },
  ]

  const blanks = [
    { idx: 0, textBefore: '1. AI is a', textAfter: 'that does jobs.', answer: 'helper' },
    { idx: 1, textBefore: '2. AI can', textAfter: 'and learn a little.', answer: 'think' },
    { idx: 2, textBefore: '3. A', textAfter: 'phone has AI inside.', answer: 'smart' },
  ]

  const handleSelectRight = (rightId: string) => {
    if (!selectedLeft) return
    const targetLeft = leftItems.find((l) => l.id === selectedLeft)
    if (targetLeft && targetLeft.matchId === rightId) {
      gameAudio.playSuccess()
      setMatchedPairs((prev) => ({ ...prev, [selectedLeft]: rightId }))
      setSelectedLeft(null)
    } else {
      gameAudio.playError()
    }
  }

  const handleWordSelect = (bIdx: number, word: string, targetWord: string) => {
    if (word === targetWord) {
      gameAudio.playSuccess()
      setBlankAnswers((prev) => ({ ...prev, [bIdx]: word }))
    } else {
      gameAudio.playError()
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
            1. Match helper to job (tap left, then tap right):
          </p>
        </div>
        <button
          onClick={() => {
            setMatchedPairs({})
            setSelectedLeft(null)
            setBlankAnswers({})
          }}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          title="Reset"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* 2. Interactive Matching Activity */}
      <div className="grid grid-cols-2 gap-2 py-1 flex-1 min-h-0">
        {/* Left Helpers Column */}
        <div className="space-y-1 flex flex-col justify-around">
          {leftItems.map((item) => {
            const isMatched = !!matchedPairs[item.id]
            const isSelected = selectedLeft === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isMatched) return
                  gameAudio.playTap()
                  setSelectedLeft(item.id)
                }}
                disabled={isMatched}
                className={`w-full p-1 sm:p-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-left cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 opacity-80'
                    : isSelected
                    ? 'bg-sky-100 border-[#0288D1] ring-2 ring-[#0288D1]/40 scale-102'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <img src={item.img} alt={item.label} className="w-6 h-6 object-contain shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 truncate">
                  {item.label}
                </span>
                {isMatched && <Check size={12} className="text-emerald-600 ml-auto shrink-0" />}
              </button>
            )
          })}
        </div>

        {/* Right Jobs Column */}
        <div className="space-y-1 flex flex-col justify-around">
          {rightItems.map((item) => {
            const matchedLeft = Object.keys(matchedPairs).find((k) => matchedPairs[k] === item.id)

            return (
              <button
                key={item.id}
                onClick={() => handleSelectRight(item.id)}
                disabled={!!matchedLeft}
                className={`w-full p-1 sm:p-1.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                  matchedLeft
                    ? 'bg-emerald-50 border-emerald-300 opacity-80'
                    : selectedLeft
                    ? 'bg-amber-50/60 border-amber-300 hover:bg-amber-100/70'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 leading-tight">
                  {item.label}
                </span>
                {matchedLeft && <Check size={12} className="text-emerald-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Word Box Fill in the Blanks (Section 2 from PDF) */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-1.5 shrink-0 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase text-[#0D47A1]">
            2. Word Box: [helper • think • smart]
          </span>
        </div>

        <div className="space-y-0.5">
          {blanks.map((b) => (
            <div key={b.idx} className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-800">
              <span>{b.textBefore}</span>
              {blankAnswers[b.idx] ? (
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-black border border-emerald-300">
                  {blankAnswers[b.idx]}
                </span>
              ) : (
                <div className="flex gap-1">
                  {['helper', 'think', 'smart'].map((w) => (
                    <button
                      key={w}
                      onClick={() => handleWordSelect(b.idx, w, b.answer)}
                      className="px-1 py-0.2 rounded bg-white text-[#0288D1] border border-sky-200 hover:bg-sky-100 text-[8px] font-bold cursor-pointer"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}
              <span>{b.textAfter}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
