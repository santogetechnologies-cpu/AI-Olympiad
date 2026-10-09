// ─────────────────────────────────────────────────────────────────────────────
// PAGE LOOK AROUND YOU RENDERER (PDF Page 8 & Page 18)
// Exact visual and helpers from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Volume2, Info } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

export interface PageLookAroundYouProps {
  pageConfig: GaioPageConfig
}

export const PageLookAroundYou: React.FC<PageLookAroundYouProps> = ({ pageConfig }) => {
  const [activeHelperId, setActiveHelperId] = useState<string | null>(null)

  const handleRead = (text: string) => {
    gameAudio.playTap()
    auraSpeechService.speak(text)
  }

  const helpers = pageConfig.helpers || []

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 flex items-center justify-between pb-1 border-b border-slate-100">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            Tap any helper to see how it works!
          </p>
        </div>
        <button
          onClick={() => handleRead("AI friends all around us. Smart speaker plays songs. Robot vacuum cleans. Drone flies. Face unlock opens your phone.")}
          className="p-1.5 rounded-xl bg-sky-50 text-[#0288D1] hover:bg-sky-100 transition-all cursor-pointer"
          title="Read Aloud"
        >
          <Volume2 size={15} />
        </button>
      </div>

      {/* 2. 6-Helper Interactive Grid (3 rows of 2 columns) */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1 min-h-0 py-1">
        {helpers.map((h) => {
          const isSelected = activeHelperId === h.id
          return (
            <button
              key={h.id}
              onClick={() => {
                setActiveHelperId(isSelected ? null : h.id)
                handleRead(`${h.name}: ${h.description}`)
              }}
              className={`p-1.5 rounded-2xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-100/80 border-[#0288D1] shadow-2xs ring-2 ring-[#0288D1]/40 scale-101'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 p-1">
                <img src={h.imageSrc} alt={h.name} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[10px] sm:text-[11px] font-black text-slate-900 truncate">
                  {h.name}
                </h4>
                <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 leading-tight line-clamp-2">
                  {h.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* 3. Bolt Says Speech Balloon */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2 shrink-0 flex items-center gap-2">
        <img
          src={pageConfig.assets.mascotImage || '/gaio/class3/images/p6_img_0.png'}
          alt="Bolt"
          className="w-8 h-8 rounded-full bg-white p-0.5 border border-amber-300 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <span className="text-[9px] font-black uppercase text-amber-800 block">Bolt Says:</span>
          <p className="text-[10px] font-bold text-slate-800 leading-tight">
            "AI cannot eat ice cream. But it can help find one!"
          </p>
        </div>
        <button
          onClick={() => handleRead("Bolt says: AI cannot eat ice cream. But it can help find one!")}
          className="p-1 rounded-lg bg-amber-200/60 text-amber-800 hover:bg-amber-200 transition-all cursor-pointer"
        >
          <Volume2 size={13} />
        </button>
      </div>

      {/* 4. Fun Fact Box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-2 py-1 shrink-0 flex items-center gap-1.5 mt-1">
        <Info size={13} className="text-emerald-700 shrink-0" />
        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-900 leading-tight truncate">
          Fun Fact: The word <b>ROBOT</b> comes from a word that means helper!
        </span>
      </div>
    </div>
  )
}
