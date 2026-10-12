// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — NAV PRIMITIVE
// Cyber-minimalist navigation HUD with Back, Next, Screen Counter, TTS, and Shortcuts.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { ArrowLeft, ArrowRight, Volume2, VolumeX, BookOpen, Compass } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { auraSpeechService } from '../../../services/auraSpeechService'

export interface SeniorBookNavProps {
  currentScreenNumber: number
  totalScreens: number
  gradeNumber: number
  chapterNumber: number
  lessonNumber: number
  stepNumber: number
  totalLessonSteps: number
  onPrevPage: () => void
  onNextPage: () => void
  onOpenTOC?: () => void
  isSpeaking?: boolean
  onToggleSpeech?: () => void
  isLastScreen?: boolean
}

export const SeniorBookNav: React.FC<SeniorBookNavProps> = ({
  currentScreenNumber,
  totalScreens,
  gradeNumber,
  chapterNumber,
  lessonNumber,
  stepNumber,
  totalLessonSteps,
  onPrevPage,
  onNextPage,
  onOpenTOC,
  isSpeaking,
  onToggleSpeech,
  isLastScreen
}) => {
  const isFirstScreen = currentScreenNumber <= 1

  return (
    <footer className="shrink-0 pt-2 pb-2 px-3 sm:px-6 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-between gap-2 z-20 select-none">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => {
          gameAudio.playTap()
          auraSpeechService.stop()
          onPrevPage()
        }}
        disabled={isFirstScreen}
        className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
          isFirstScreen
            ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600 border border-slate-800/50'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 active:scale-95 shadow-xs'
        }`}
        aria-label="Previous Screen"
      >
        <ArrowLeft size={15} />
        <span className="hidden xs:inline">Back</span>
      </button>

      {/* Center Digital Book Indicator */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onOpenTOC && (
          <button
            type="button"
            onClick={onOpenTOC}
            className="p-2 rounded-xl bg-slate-800/90 text-cyan-400 hover:bg-slate-700 border border-slate-700/80 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Table of Contents & Curriculum Index"
          >
            <Compass size={16} />
          </button>
        )}

        {/* Digital Screen & Lesson Position Indicator */}
        <div className="flex flex-col items-center leading-tight px-1 text-center font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black text-cyan-400">
              Screen {currentScreenNumber}
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              of {totalScreens}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Class {gradeNumber} · Ch {chapterNumber} · L{lessonNumber} (Step {stepNumber}/{totalLessonSteps})
          </div>
        </div>

        {/* Speech Audio TTS Toggle */}
        {onToggleSpeech && (
          <button
            type="button"
            onClick={onToggleSpeech}
            className={`p-2 rounded-xl transition-all cursor-pointer border ${
              isSpeaking
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 border-slate-700/80 hover:bg-slate-700'
            }`}
            title={isSpeaking ? 'Stop Reading' : 'Listen with AI Voice (Aura)'}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => {
          gameAudio.playTap()
          auraSpeechService.stop()
          onNextPage()
        }}
        disabled={isLastScreen}
        className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
          isLastScreen
            ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600 border border-slate-800/50'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95'
        }`}
        aria-label="Next Screen"
      >
        <span>{stepNumber === totalLessonSteps ? 'Finish Lesson' : 'Continue'}</span>
        <ArrowRight size={15} />
      </button>
    </footer>
  )
}
