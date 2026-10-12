// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL BOOK SHELL PRIMITIVE
// Sleek, futuristic minimalist dark-tech shell, top status bar, class switcher
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import type { MiddleClassKey, MiddleLessonData } from './types'
import { Sparkles, Star, Volume2, VolumeX, BookOpen, X, ChevronRight, Cpu, Lightbulb, Bot } from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'
import { gaioSpeechService } from '../../services/auraSpeechService'

export interface MiddleLevelShellProps {
  currentClass: MiddleClassKey
  onSelectClass: (cls: MiddleClassKey) => void
  lesson: MiddleLessonData
  totalXp: number
  onOpenTOC: () => void
  onOpenJargonBuster?: () => void
  onExit?: () => void
  children: React.ReactNode
}

export const MiddleLevelShell: React.FC<MiddleLevelShellProps> = ({
  currentClass,
  onSelectClass,
  lesson,
  totalXp,
  onOpenTOC,
  onOpenJargonBuster,
  onExit,
  children
}) => {
  const [isMuted, setIsMuted] = useState(() => gameAudio.isMuted())
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const unsub = gaioSpeechService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const handleMuteChange = (e: any) => {
      setIsMuted(e?.detail?.muted ?? gameAudio.isMuted())
    }
    window.addEventListener('game_audio_mute_toggled', handleMuteChange)
    return () => {
      window.removeEventListener('game_audio_mute_toggled', handleMuteChange)
    }
  }, [])

  const handleToggleMute = () => {
    const nextMuted = gameAudio.toggleMute()
    setIsMuted(nextMuted)
  }

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      gaioSpeechService.stop()
      setIsSpeaking(false)
    } else {
      gameAudio.playTap()
      const textToRead = `Hello explorer! I am your Aura AI Guide. Today we are learning ${lesson.lessonTitle} in ${lesson.chapterTitle}. Let's make learning simple and fun!`
      gaioSpeechService.speak(textToRead, `shell-${lesson.id}`)
    }
  }

  return (
    <div
      className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 rounded-3xl border-2 border-slate-800 shadow-2xl p-1.5 sm:p-2.5 relative select-none"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Futuristic Header Bar */}
      <header className="shrink-0 flex items-center justify-between px-3 py-1.5 text-xs border-b border-slate-800 bg-slate-900/90 rounded-t-2xl gap-2">
        {/* Left: Branding & Class Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-black text-sky-400 tracking-wider">
            <Cpu size={15} className="text-sky-400 animate-pulse" />
            <span className="hidden xs:inline text-[11px] uppercase">AI Olympiad</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden xs:block" />

          {/* Class Switcher Pills */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            {(['class6', 'class7', 'class8'] as MiddleClassKey[]).map((cls) => {
              const isSelected = cls === currentClass
              const label = cls === 'class6' ? 'Class 6' : cls === 'class7' ? 'Class 7' : 'Class 8'
              return (
                <button
                  key={cls}
                  onClick={() => onSelectClass(cls)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Center: Current Chapter & Lesson Breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-medium text-slate-400 truncate max-w-sm">
          <span className="text-slate-300 font-semibold truncate">
            Ch {lesson.chapterNumber}: {lesson.chapterTitle}
          </span>
          <ChevronRight size={12} className="text-slate-600 shrink-0" />
          <span className="text-sky-400 font-bold truncate">
            {lesson.lessonTitle}
          </span>
        </div>

        {/* Right: XP, Audio, Mission Hub, Exit */}
        <div className="flex items-center gap-2">
          {/* XP Pill */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-600/40 text-amber-300 text-[11px] font-mono font-bold">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{totalXp} XP</span>
          </div>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1 rounded-lg border transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-slate-900 border-slate-800 text-sky-400 hover:bg-slate-800'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* GAIO AI Guide Voice Read-Aloud Button */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500/25 border-rose-500 text-rose-300 ring-2 ring-rose-500/30 animate-pulse'
                : 'bg-sky-500/15 border-sky-400/40 text-sky-300 hover:bg-sky-500/25'
            }`}
            title="Aura AI Guide: Listen to voice explanation"
          >
            <Bot size={13} className={isSpeaking ? 'animate-bounce text-yellow-300' : 'text-sky-400'} />
            <span className="hidden xs:inline">{isSpeaking ? 'Speaking...' : 'Aura AI 🎙️'}</span>
          </button>

          {/* Jargon Buster Button */}
          {onOpenJargonBuster && (
            <button
              onClick={onOpenJargonBuster}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all text-[11px] font-bold cursor-pointer"
              title="Jargon Buster: Explain Like I'm 5!"
            >
              <Lightbulb size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Jargon Buster</span>
            </button>
          )}

          {/* TOC / Mission Hub Button */}
          <button
            onClick={onOpenTOC}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-950/60 border border-sky-600/50 text-sky-300 hover:bg-sky-900/60 transition-all text-[11px] font-bold cursor-pointer"
            title="Open Mission Hub (Table of Contents)"
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Mission Hub</span>
          </button>

          {/* Exit */}
          {onExit && (
            <button
              onClick={onExit}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Exit Learning Mode"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Viewport Container: 100% Mobile & Desktop Contained */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col justify-between py-1">
        {children}
      </main>

      {/* 3. Sleek Subtle Watermark Footer */}
      <div className="shrink-0 flex items-center justify-between px-3 pt-0.5 text-[9px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles size={10} className="text-sky-400" />
          <span>Global AI Olympiad • Middle Level Division</span>
        </span>
        <span>
          Ref: <strong className="text-slate-400">{lesson.syllabusReference}</strong>
        </span>
      </div>
    </div>
  )
}
