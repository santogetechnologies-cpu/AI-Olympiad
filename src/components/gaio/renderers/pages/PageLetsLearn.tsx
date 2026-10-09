// ─────────────────────────────────────────────────────────────────────────────
// PAGE LET'S LEARN RENDERER (PDF Page 6 & Page 16)
// Exact visual and content recreation of LET'S LEARN from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Volume2, Sparkles, Check } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

export interface PageLetsLearnProps {
  pageConfig: GaioPageConfig
}

export const PageLetsLearn: React.FC<PageLetsLearnProps> = ({ pageConfig }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [tappedWord, setTappedWord] = useState<string | null>(null)

  const handleRead = (text: string) => {
    gameAudio.playTap()
    auraSpeechService.speak(text)
  }

  const liveInsideItems = [
    { img: '/gaio/class3/images/p6_img_7.png', label: 'Smart phone', detail: 'Runs smart apps & maps' },
    { img: '/gaio/class3/images/p6_img_8.png', label: 'Smart speaker', detail: 'Listens & plays tunes' },
    { img: '/gaio/class3/images/p6_img_9.png', label: 'Robot', detail: 'Moves & cleans your room' },
    { img: '/gaio/class3/images/p6_img_10.png', label: 'Computer', detail: 'Solves complex puzzles' },
  ]

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Top Banner */}
      <div className="bg-[#1E88E5] text-white rounded-2xl p-2 sm:p-2.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <img
            src={pageConfig.assets.mascotImage || '/gaio/class3/images/p6_img_0.png'}
            alt="Bolt"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 p-0.5 object-contain"
          />
          <div>
            <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-sky-100">
              {pageConfig.pageHeaderTitle}
            </div>
            <h1 className="text-sm sm:text-base font-black tracking-tight leading-tight">
              {pageConfig.title}
            </h1>
          </div>
        </div>
        <button
          onClick={() => handleRead(`${pageConfig.title}. AI means Artificial Intelligence. AI helps machines think and learn a little, like us.`)}
          className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          title="Read Aloud"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* 2. Hero Illustration */}
      <div className="shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs h-28 sm:h-34 bg-emerald-50">
        <img
          src={pageConfig.assets.heroImage || '/gaio/class3/images/p6_img_1.png'}
          alt="Bolt with Meera and friend under sun"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. LET'S LEARN Bullet Points Box */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-2 sm:p-2.5 shrink-0 space-y-1">
        <div className="flex items-center gap-1.5 text-[#0D47A1] font-black text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#1E88E5]" />
          <span>LET'S LEARN</span>
        </div>
        <div className="space-y-0.5 text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs shrink-0">★</span> AI means Artificial Intelligence.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs shrink-0">★</span> AI helps machines think and learn a little, like us.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs shrink-0">★</span> AI is a helper. It cannot feel happy or sad like you.
          </p>
        </div>
      </div>

      {/* 4. AI can live inside... (Interactive Device Cards) */}
      <div className="shrink-0 space-y-1">
        <span className="text-[10px] sm:text-[11px] font-black text-slate-700 flex items-center gap-1">
          👀 AI can live inside... <span className="text-[9px] font-normal text-slate-500">(tap each)</span>
        </span>
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
          {liveInsideItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setActiveCard(activeCard === idx ? null : idx)
                handleRead(item.label + ": " + item.detail)
              }}
              className={`p-1 sm:p-1.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                activeCard === idx
                  ? 'bg-sky-100 border-[#0288D1] shadow-2xs scale-102 ring-1 ring-[#0288D1]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={item.img} alt={item.label} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
              <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-800 mt-0.5 truncate w-full">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Magic Words */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-2 py-1 shrink-0 flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-black text-amber-800 uppercase flex items-center gap-1">
          <Sparkles size={11} className="text-amber-600" /> Magic Words:
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          {(pageConfig.magicWords || ['Robot', 'Helper', 'Smart']).map((word, wIdx) => (
            <button
              key={wIdx}
              onClick={() => {
                gameAudio.playTap()
                setTappedWord(word)
                handleRead(word)
              }}
              className={`px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase transition-all cursor-pointer ${
                tappedWord === word
                  ? 'bg-amber-500 text-white shadow-2xs scale-105'
                  : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
