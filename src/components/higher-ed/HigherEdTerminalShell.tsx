import React from 'react'
import {
  Volume2, VolumeX, Maximize2, Minimize2, X, ChevronLeft, ChevronRight,
  Layers, Sparkles, Award, Compass, Terminal, Shield, CheckCircle2
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'

export interface HigherEdTerminalShellProps {
  children: React.ReactNode
  levelName: string
  shortCode: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
  lessonTitle: string
  currentScreenNumber: number // 1 to 5
  totalScreens: number        // 5
  screenTypeTitle: string
  xpEarned: number
  onPreviousScreen: () => void
  onNextScreen: () => void
  onOpenSelector?: () => void
  onExit?: () => void
  onOpenGuide?: () => void
  onSwitchToVisualGuide?: () => void
  onOpenKindergartenModal?: () => void
  canGoNext?: boolean
  isCompleted?: boolean
}

export const HigherEdTerminalShell: React.FC<HigherEdTerminalShellProps> = ({
  children,
  levelName,
  shortCode,
  chapterNumber,
  chapterTitle,
  lessonNumber,
  lessonTitle,
  currentScreenNumber,
  totalScreens = 5,
  screenTypeTitle,
  xpEarned,
  onPreviousScreen,
  onNextScreen,
  onOpenSelector,
  onExit,
  onOpenGuide,
  onSwitchToVisualGuide,
  onOpenKindergartenModal,
  canGoNext = true,
  isCompleted = false
}) => {
  const [isMuted, setIsMuted] = React.useState(() => gameAudio.isMuted())
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const handleToggleMute = () => {
    const muted = gameAudio.toggleMute()
    setIsMuted(muted)
  }

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const STAGE_NAMES = [
    'Tactical Briefing',
    'System Architecture',
    'Execution Code Lab',
    'Technical Mission',
    'Olympiad Defense'
  ]

  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none border border-slate-800/80 rounded-2xl shadow-2xl relative">
      {/* ─── TOP CONTROL HUD ────────────────────────────────────────────── */}
      <header className="h-14 sm:h-16 px-3 sm:px-6 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0 z-20">
        {/* Left: Level Pill & Chapter Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onOpenSelector ? (
            <button
              onClick={() => {
                gameAudio.playTap()
                onOpenSelector()
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-mono text-[11px] sm:text-xs font-bold hover:bg-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Change Academic Level or Chapter"
            >
              <Terminal size={14} />
              <span>{shortCode}</span>
              <span className="text-slate-500">▼</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-mono text-[11px] sm:text-xs font-bold shrink-0">
              {shortCode}
            </span>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate">
              <span>Ch {chapterNumber}: {chapterTitle}</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-bold">Lesson {lessonNumber}</span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-100 truncate mt-0.5">
              {lessonTitle}
            </h2>
          </div>
        </div>

        {/* Center: Stage Progress Capsules (Hidden on tiny screens) */}
        <div className="hidden md:flex flex-col items-center gap-1 px-4">
          <div className="flex items-center gap-1.5 w-48">
            {Array.from({ length: totalScreens }).map((_, i) => {
              const screenNum = i + 1
              const isPast = screenNum < currentScreenNumber
              const isCurrent = screenNum === currentScreenNumber
              return (
                <div
                  key={i}
                  title={STAGE_NAMES[i] || `Stage ${screenNum}`}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    isPast
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                      : isCurrent
                      ? 'bg-cyan-400 ring-2 ring-cyan-400/30'
                      : 'bg-slate-800'
                  }`}
                />
              )
            })}
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Stage {currentScreenNumber} of {totalScreens}: {STAGE_NAMES[currentScreenNumber - 1]}
          </span>
        </div>

        {/* Right: Controls & Exit */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Switch to Visual Roadmap */}
          {onSwitchToVisualGuide && (
            <button
              onClick={() => {
                gameAudio.playTap()
                onSwitchToVisualGuide()
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] font-bold hover:bg-indigo-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Open Complete Visual Syllabus Roadmap"
            >
              <Compass size={13} className="text-indigo-400" />
              <span className="hidden sm:inline">Visual Roadmap</span>
            </button>
          )}

          {/* Guide Me / AI Mentor Button */}
          {onOpenGuide && (
            <button
              onClick={() => {
                gameAudio.playTap()
                onOpenGuide()
              }}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-[11px] font-bold hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-500/20 animate-pulse"
              title="Get Step-by-Step Guidance & Explanation"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Guide Me</span>
            </button>
          )}

          {/* Kindergarten / ELI5 Modal Button */}
          {onOpenKindergartenModal && (
            <button
              onClick={() => {
                gameAudio.playTap()
                onOpenKindergartenModal()
              }}
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-[11px] font-bold hover:bg-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-500/20"
              title="Explain Any Scary Concept Like I Am 5"
            >
              <span>🧸</span>
              <span className="hidden sm:inline">ELI5 Mode</span>
            </button>
          )}

          {/* XP Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold">
            <Sparkles size={13} className="text-amber-400" />
            <span>{xpEarned} XP</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-all cursor-pointer hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Exit Button */}
          {onExit && (
            <button
              onClick={() => {
                gameAudio.playTap()
                onExit()
              }}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer ml-1"
              title="Exit Mission Flow"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      {/* ─── MOBILE STAGE PROGRESS BAR ─────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between px-3 py-1 bg-slate-900 border-b border-slate-800/60 text-[10px] font-mono text-slate-400">
        <span>Stage {currentScreenNumber}/{totalScreens}: {STAGE_NAMES[currentScreenNumber - 1]}</span>
        <div className="flex items-center gap-1 w-24">
          {Array.from({ length: totalScreens }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 ${
                i + 1 < currentScreenNumber
                  ? 'bg-emerald-500'
                  : i + 1 === currentScreenNumber
                  ? 'bg-cyan-400'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── MAIN WORKSPACE CANVAS (FOCUSED ZERO-SCROLL FLOW) ──────────── */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {children}
      </main>

      {/* ─── BOTTOM NAVIGATION HUD ─────────────────────────────────────── */}
      <footer className="h-14 sm:h-16 px-3 sm:px-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-between shrink-0 z-20">
        {/* Previous Button */}
        <button
          onClick={() => {
            gameAudio.playTap()
            onPreviousScreen()
          }}
          disabled={currentScreenNumber <= 1}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide transition-all cursor-pointer ${
            currentScreenNumber <= 1
              ? 'opacity-30 text-slate-600 cursor-not-allowed'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous Stage</span>
        </button>

        {/* Center Stage Tag */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{screenTypeTitle}</span>
        </div>

        {/* Next / Complete Button */}
        <button
          onClick={() => {
            gameAudio.playTap()
            onNextScreen()
          }}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer shadow-lg ${
            currentScreenNumber >= totalScreens
              ? isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
          }`}
        >
          <span>
            {currentScreenNumber >= totalScreens
              ? isCompleted
                ? 'Mission Completed ✓'
                : 'Complete Lesson'
              : 'Next Stage'}
          </span>
          <ChevronRight size={16} />
        </button>
      </footer>
    </div>
  )
}
