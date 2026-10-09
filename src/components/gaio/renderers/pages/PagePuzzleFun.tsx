// ─────────────────────────────────────────────────────────────────────────────
// PAGE PUZZLE FUN RENDERER (PDF Page 12 & Page 22)
// Odd One Out + Count & Write interactive activities from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Check, Plus, Minus } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PagePuzzleFunProps {
  pageConfig: GaioPageConfig
}

export const PagePuzzleFun: React.FC<PagePuzzleFunProps> = ({ pageConfig }) => {
  // Odd One Out State: rowIdx -> selectedItemId
  const [selectedOdd, setSelectedOdd] = useState<Record<number, string>>({})

  // Count & Write State: itemId -> count
  const [counts, setCounts] = useState<Record<string, number>>({
    robots: 0,
    phones: 0,
    drones: 0
  })

  const rows = pageConfig.puzzleRows || [
    {
      rowNumber: 1,
      items: [
        { id: 'r1_1', name: 'Smart speaker', imageSrc: '/gaio/class3/images/p12_img_1.png', isOddOneOut: false, explanation: 'Uses AI' },
        { id: 'r1_2', name: 'Smart phone', imageSrc: '/gaio/class3/images/p12_img_2.png', isOddOneOut: false, explanation: 'Uses AI' },
        { id: 'r1_3', name: 'Apple', imageSrc: '/gaio/class3/images/p12_img_3.png', isOddOneOut: true, explanation: 'Apple is fruit!' },
        { id: 'r1_4', name: 'Computer', imageSrc: '/gaio/class3/images/p12_img_4.png', isOddOneOut: false, explanation: 'Electronic' }
      ]
    },
    {
      rowNumber: 2,
      items: [
        { id: 'r2_1', name: 'Pencil', imageSrc: '/gaio/class3/images/p12_img_5.png', isOddOneOut: true, explanation: 'Pencil is drawing tool!' },
        { id: 'r2_2', name: 'Robot', imageSrc: '/gaio/class3/images/p12_img_6.png', isOddOneOut: false, explanation: 'Automated' },
        { id: 'r2_3', name: 'Car', imageSrc: '/gaio/class3/images/p12_img_7.png', isOddOneOut: false, explanation: 'Smart sensor' },
        { id: 'r2_4', name: 'Drone', imageSrc: '/gaio/class3/images/p12_img_8.png', isOddOneOut: false, explanation: 'Flying helper' }
      ]
    }
  ]

  const countTargets: Record<string, number> = {
    robots: 4,
    phones: 3,
    drones: 2
  }

  const handleSelectOdd = (rowIdx: number, itemId: string, isOdd: boolean) => {
    if (isOdd) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }
    setSelectedOdd((prev) => ({ ...prev, [rowIdx]: itemId }))
  }

  const handleStepCount = (id: string, delta: number) => {
    gameAudio.playTap()
    setCounts((prev) => {
      const cur = prev[id] || 0
      const next = Math.max(0, Math.min(10, cur + delta))
      if (next === countTargets[id]) {
        gameAudio.playSuccess()
      }
      return { ...prev, [id]: next }
    })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 pb-1 border-b border-slate-100">
        <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
          {pageConfig.pageHeaderTitle}
        </h2>
        <p className="text-[10px] text-slate-500 font-medium">
          1. Odd one out! Tap the picture that does not belong:
        </p>
      </div>

      {/* 2. Odd One Out Rows (2 Rows) */}
      <div className="space-y-1.5 py-1 shrink-0">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-1 sm:p-1.5">
            <span className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">
              Row {rIdx + 1}
            </span>
            <div className="grid grid-cols-4 gap-1">
              {row.items.map((item) => {
                const isSelected = selectedOdd[rIdx] === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectOdd(rIdx, item.id, item.isOddOneOut)}
                    className={`p-1 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? item.isOddOneOut
                          ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-400/50 scale-102'
                          : 'bg-rose-100 border-rose-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={item.imageSrc} alt={item.name} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-[8px] font-bold text-slate-700 truncate w-full text-center mt-0.5">
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Count & Write Activity (Section 2 from PDF) */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-2 shrink-0 space-y-1">
        <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#0D47A1] block">
          2. Count and write the helpers:
        </span>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'robots', label: 'Robots (4)', img: '/gaio/class3/images/p12_img_9.png' },
            { id: 'phones', label: 'Phones (3)', img: '/gaio/class3/images/p12_img_10.png' },
            { id: 'drones', label: 'Drones (2)', img: '/gaio/class3/images/p12_img_11.png' }
          ].map((item) => {
            const count = counts[item.id] || 0
            const isTarget = count === countTargets[item.id]

            return (
              <div
                key={item.id}
                className={`p-1 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                  isTarget ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'
                }`}
              >
                <img src={item.img} alt={item.label} className="w-6 h-6 object-contain" />
                <span className="text-[8px] font-bold text-slate-700 truncate w-full">
                  {item.label}
                </span>

                <div className="flex items-center gap-1 mt-1">
                  <button
                    onClick={() => handleStepCount(item.id, -1)}
                    className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className={`w-5 text-center text-xs font-black ${isTarget ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {count}
                  </span>
                  <button
                    onClick={() => handleStepCount(item.id, 1)}
                    className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
