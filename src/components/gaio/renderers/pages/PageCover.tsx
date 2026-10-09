// ─────────────────────────────────────────────────────────────────────────────
// PAGE COVER RENDERER (PDF Pages 1 and 5)
// Exact visual recreation of Book Cover & Month 1 Cover from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, BookOpen } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PageCoverProps {
  pageConfig: GaioPageConfig
  onStartReading: () => void
}

export const PageCover: React.FC<PageCoverProps> = ({ pageConfig, onStartReading }) => {
  const isBookCover = pageConfig.pageType === 'book_cover'

  return (
    <div className="w-full h-full flex flex-col justify-between items-center text-center p-3 text-slate-800 animate-in fade-in duration-300">
      {/* Top Badge */}
      <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0288D1] text-[10px] sm:text-xs font-black uppercase tracking-wider">
        <Sparkles size={12} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{isBookCover ? 'Official Curriculum Guide' : 'Month 1 Journey'}</span>
      </div>

      {/* Main Cover Illustration */}
      <div className="flex-1 min-h-0 w-full max-w-xs flex items-center justify-center p-2 relative">
        <div className="w-full h-full max-h-56 sm:max-h-64 rounded-2xl overflow-hidden border-2 border-sky-200 shadow-md bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-2">
          {pageConfig.assets.heroImage ? (
            <img
              src={pageConfig.assets.heroImage}
              alt={pageConfig.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <BookOpen size={48} className="text-[#0288D1]" />
              <span className="text-xs font-bold text-slate-600">GAIO Class 3</span>
            </div>
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="shrink-0 space-y-1 max-w-sm px-2">
        <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
          {pageConfig.title}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-[#0288D1]">
          {pageConfig.subtitle}
        </p>
      </div>

      {/* Action Button */}
      <div className="shrink-0 pt-2 w-full max-w-xs">
        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onStartReading()
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0288D1] to-[#01579B] hover:from-[#0277BD] hover:to-[#01579B] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <BookOpen size={16} />
          <span>{isBookCover ? 'Open Book • Turn Page' : 'Explore Month 1'}</span>
        </button>
      </div>
    </div>
  )
}
