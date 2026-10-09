// ─────────────────────────────────────────────────────────────────────────────
// PAGE INTRO WELCOME RENDERER (PDF Pages 2, 3, 4)
// Welcome to AI Olympiad & Mascot Introduction from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PageIntroWelcomeProps {
  pageConfig: GaioPageConfig
  onContinue: () => void
}

export const PageIntroWelcome: React.FC<PageIntroWelcomeProps> = ({ pageConfig, onContinue }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 flex items-center justify-between pb-1 border-b border-slate-100">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            WELCOME TO AI OLYMPIAD!
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            Class 3 • Your Journey with Bolt
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-sky-100 text-[#0288D1] text-[9px] font-black uppercase">
          Class 3
        </span>
      </div>

      {/* 2. Mascot & Intro Card */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center p-2">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-sky-50 border-2 border-[#0288D1] p-2 flex items-center justify-center shadow-xs mb-2">
          <img
            src="/gaio/class3/images/p6_img_0.png"
            alt="Bolt"
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
          "Hello! I am Bolt, your AI Friend!"
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-600 font-medium max-w-xs mt-1 leading-snug">
          Together we will discover smart helpers, play robot games, solve puzzles, and learn how machines think and help us every day!
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-3 gap-1.5 w-full max-w-xs mt-3">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-1.5 flex flex-col items-center">
            <Sparkles size={14} className="text-[#0288D1] mb-0.5" />
            <span className="text-[9px] font-black text-slate-800">Discover</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-1.5 flex flex-col items-center">
            <Compass size={14} className="text-emerald-600 mb-0.5" />
            <span className="text-[9px] font-black text-slate-800">Interact</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-1.5 flex flex-col items-center">
            <Heart size={14} className="text-amber-600 mb-0.5" />
            <span className="text-[9px] font-black text-slate-800">Learn</span>
          </div>
        </div>
      </div>

      {/* 3. Action */}
      <div className="shrink-0 pt-1">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onContinue()
          }}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#0288D1] to-[#01579B] text-white font-black text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        >
          <span>Start Topic 1: Meet My AI Friend</span>
          <CheckCircle2 size={14} />
        </button>
      </div>
    </div>
  )
}
