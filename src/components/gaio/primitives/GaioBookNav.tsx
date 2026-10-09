// ─────────────────────────────────────────────────────────────────────────────
// GAIO BOOK NAV PRIMITIVE
// Screen Navigation: Prev / Next / Screen Counter / PDF Reference / TTS / TOC
// Exact Specification: "Screen 12 of 286 · Source PDF page 9"
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { ArrowLeft, ArrowRight, Volume2, BookOpen, FileText } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { auraSpeechService } from '../../../services/auraSpeechService'

export interface GaioBookNavProps {
  currentScreenNumber: number
  totalScreens: number
  pdfPageNumber: number
  pdfPartIndex?: number
  pdfTotalParts?: number
  onPrevPage: () => void
  onNextPage: () => void
  onOpenTOC?: () => void
  onTogglePdfPreview?: () => void
  showPdfPreview?: boolean
  isSpeaking?: boolean
  onToggleSpeech?: () => void
}

export const GaioBookNav: React.FC<GaioBookNavProps> = ({
  currentScreenNumber,
  totalScreens,
  pdfPageNumber,
  pdfPartIndex,
  pdfTotalParts,
  onPrevPage,
  onNextPage,
  onOpenTOC,
  onTogglePdfPreview,
  showPdfPreview,
  isSpeaking,
  onToggleSpeech
}) => {
  const isFirstScreen = currentScreenNumber <= 1
  const isLastScreen = currentScreenNumber >= totalScreens

  return (
    <footer className="shrink-0 pt-2 pb-1.5 border-t border-slate-200 flex items-center justify-between gap-1 sm:gap-2 px-2 bg-white/95 rounded-b-2xl select-none">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => {
          gameAudio.playTap()
          auraSpeechService.stop()
          onPrevPage()
        }}
        disabled={isFirstScreen}
        className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
          isFirstScreen
            ? 'opacity-30 cursor-not-allowed bg-slate-50 text-slate-400'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 shadow-xs'
        }`}
        aria-label="Previous Screen"
      >
        <ArrowLeft size={14} />
        <span className="hidden xs:inline">Back</span>
      </button>

      {/* Center Digital Book Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {onOpenTOC && (
          <button
            type="button"
            onClick={onOpenTOC}
            className="p-1.5 rounded-xl bg-sky-50 text-[#0288D1] hover:bg-sky-100 transition-all cursor-pointer border border-sky-200"
            title="Book Index & Table of Contents"
          >
            <BookOpen size={14} />
          </button>
        )}

        {/* The Mandatory Screen & Source PDF Page Indicator */}
        <div className="flex flex-col items-center leading-tight px-1 text-center">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-black text-[#0288D1]">
              Screen {currentScreenNumber}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              of {totalScreens}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-500">
            <span>Source PDF page {pdfPageNumber}</span>
            {pdfTotalParts && pdfTotalParts > 1 && (
              <span className="text-amber-600 font-bold">
                (Part {pdfPartIndex || 1}/{pdfTotalParts})
              </span>
            )}
          </div>
        </div>

        {/* Peek Original PDF Toggle */}
        {onTogglePdfPreview && (
          <button
            type="button"
            onClick={onTogglePdfPreview}
            className={`p-1.5 rounded-xl transition-all cursor-pointer border ${
              showPdfPreview
                ? 'bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
            title="Compare with Original PDF Page"
          >
            <FileText size={14} />
          </button>
        )}

        {/* TTS Audio Read */}
        {onToggleSpeech && (
          <button
            type="button"
            onClick={onToggleSpeech}
            className={`p-1.5 rounded-xl transition-all cursor-pointer border ${
              isSpeaking
                ? 'bg-amber-100 text-amber-700 animate-pulse border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
            title={isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          >
            <Volume2 size={14} />
          </button>
        )}
      </div>

      {/* Next Screen Button */}
      <button
        type="button"
        onClick={() => {
          gameAudio.playTap()
          auraSpeechService.stop()
          onNextPage()
        }}
        className={`py-1.5 px-3 sm:px-4 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
          isLastScreen
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110 active:scale-95'
            : 'bg-[#0288D1] hover:bg-sky-600 text-white active:scale-95'
        }`}
        aria-label="Next Screen"
      >
        <span>{isLastScreen ? 'Finish' : 'Next'}</span>
        <ArrowRight size={14} />
      </button>
    </footer>
  )
}
