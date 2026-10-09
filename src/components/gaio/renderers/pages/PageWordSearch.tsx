// ─────────────────────────────────────────────────────────────────────────────
// PAGE WORD SEARCH RENDERER (PDF Page 27)
// Interactive Word Search for Month 1 AI DISCOVER from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Check, RefreshCw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PageWordSearchProps {
  pageConfig: GaioPageConfig
}

export const PageWordSearch: React.FC<PageWordSearchProps> = ({ pageConfig }) => {
  const [foundWords, setFoundWords] = useState<string[]>([])

  const targetWords = ['ROBOT', 'HELPER', 'SMART', 'THINK', 'DRONE']

  const grid = [
    ['R', 'O', 'B', 'O', 'T', 'X'],
    ['H', 'E', 'L', 'P', 'E', 'R'],
    ['S', 'M', 'A', 'R', 'T', 'A'],
    ['T', 'H', 'I', 'N', 'K', 'I'],
    ['D', 'R', 'O', 'N', 'E', 'Z']
  ]

  const handleWordFound = (w: string) => {
    if (foundWords.includes(w)) return
    gameAudio.playSuccess()
    const next = [...foundWords, w]
    setFoundWords(next)
    if (next.length === targetWords.length) {
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
            Find the hidden AI words!
          </p>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          {foundWords.length} / {targetWords.length} Found
        </span>
      </div>

      {/* 2. Interactive Letter Grid */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-1">
        <div className="grid grid-cols-6 gap-1 bg-sky-50/60 p-2 rounded-2xl border border-sky-200 shadow-2xs">
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => {
              // Row 0 = ROBOT, Row 1 = HELPER, Row 2 = SMART, Row 3 = THINK, Row 4 = DRONE
              const wordForRow = targetWords[rIdx]
              const isWordFound = foundWords.includes(wordForRow)

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleWordFound(wordForRow)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center transition-all cursor-pointer ${
                    isWordFound
                      ? 'bg-emerald-500 text-white shadow-2xs scale-102'
                      : 'bg-white text-slate-800 border border-slate-200 hover:bg-sky-100'
                  }`}
                >
                  {letter}
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* 3. Word Checklist */}
      <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
        <span className="text-[8px] font-black uppercase text-slate-500 block mb-1">
          Words to Find:
        </span>
        <div className="flex items-center justify-around gap-1">
          {targetWords.map((w) => {
            const isDone = foundWords.includes(w)
            return (
              <button
                key={w}
                onClick={() => handleWordFound(w)}
                className={`px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {isDone ? `✓ ${w}` : w}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
