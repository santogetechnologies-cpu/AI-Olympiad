import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX,
  Layers, Check
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'

export interface ThemeNavProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  currentSectionIdx: number
  totalSections: number
  completedSectionIds: string[]
  sectionIds: string[]
  onSelectSection: (idx: number) => void
  onNextSection?: () => void
  onPrevSection?: () => void
  onToggleMobileMenu?: () => void
  stats?: { xp: number; streak: number }
  tier?: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
}

export const CANONICAL_SECTION_STEPS = [
  { label: '1. Video', fullLabel: 'Video Briefing', type: 'video' },
  { label: '2. Lesson', fullLabel: 'Lesson 1: Concept Discovery', type: 'lesson' },
  { label: '3. Lesson', fullLabel: 'Lesson 2: Scenario Mission', type: 'lesson' },
  { label: '4. Worksheet', fullLabel: 'Worksheet: Workbook', type: 'worksheet' },
  { label: '5. Activity', fullLabel: 'Activity: Challenge Game', type: 'activity' },
  { label: '6. Lab', fullLabel: 'Discovery Lab Studio', type: 'lesson' },
  { label: '7. Project', fullLabel: 'Capstone Assignment', type: 'assignment' },
  { label: '8. Quiz', fullLabel: 'Mastery Assessment', type: 'quiz' },
]

export const ThemeHeaderNavigation: React.FC<ThemeNavProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  currentSectionIdx,
  totalSections = 8,
  completedSectionIds = [],
  sectionIds = [],
  onSelectSection,
  onNextSection,
  onPrevSection,
  onToggleMobileMenu,
}) => {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(() => gameAudio.isMuted())

  useEffect(() => {
    const handleMuteChange = (e: any) => {
      setIsMuted(e.detail?.muted ?? gameAudio.isMuted())
    }
    window.addEventListener('game_audio_mute_toggled', handleMuteChange)
    return () => window.removeEventListener('game_audio_mute_toggled', handleMuteChange)
  }, [])

  const handleToggleMute = () => {
    const next = gameAudio.toggleMute()
    setIsMuted(next)
    if (!next) gameAudio.playTap()
  }

  const currentStep = CANONICAL_SECTION_STEPS[currentSectionIdx] || CANONICAL_SECTION_STEPS[0]
  const sectionNumber = currentSectionIdx + 1
  const canGoPrev = currentSectionIdx > 0 || true // Click at 0 returns to curriculum roadmap
  const canGoNext = currentSectionIdx < totalSections - 1

  const handleBack = () => {
    gameAudio.playTap()
    if (currentSectionIdx > 0 && onPrevSection) {
      onPrevSection()
    } else {
      navigate('/student/learning')
    }
  }

  const handleNext = () => {
    gameAudio.playTap()
    if (onNextSection && canGoNext) {
      onNextSection()
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs px-2.5 sm:px-4 py-2 transition-colors w-full select-none">
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
        {/* Left: Back Button & Section Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <button
            onClick={handleBack}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
            title={currentSectionIdx > 0 ? "Previous Section" : "Return to Curriculum"}
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </button>

          {/* Mobile Sections Drawer Button */}
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 border border-indigo-200 transition-all cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center gap-1 text-[11px] font-bold"
              title="All Sections"
              aria-label="Toggle Sections Menu"
            >
              <Layers size={15} />
              <span className="hidden xs:inline">Sections</span>
            </button>
          )}

          {/* Section Title & Topic Identity */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                {gradeKey.toUpperCase()} · Ch {chapterNum}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate max-w-[130px] xs:max-w-[200px] sm:max-w-xs">
                {chapterTitle}
              </span>
            </div>
            <h1 className="text-xs sm:text-sm md:text-base font-black tracking-tight text-slate-900 truncate mt-0.5">
              Section {sectionNumber}: {currentStep.fullLabel} — {topicTitle}
            </h1>
          </div>
        </div>

        {/* Center/Right: Stepped Progress Indicator & Next Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Progress Capsule & Step Dots */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-xs font-bold text-slate-700 font-mono">
              Progress: {sectionNumber}/{totalSections}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSections }).map((_, idx) => {
                const secId = sectionIds[idx]
                const isDone = secId && completedSectionIds.includes(secId)
                const isCurrent = idx === currentSectionIdx
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectSection(idx)}
                    title={`Section ${idx + 1}: ${CANONICAL_SECTION_STEPS[idx]?.label}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 ring-2 ring-indigo-300 scale-110'
                        : isDone
                        ? 'bg-emerald-500'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                )
              })}
            </div>
          </div>

          {/* Mobile Progress Text Pill */}
          <div className="sm:hidden px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shrink-0">
            {sectionNumber}/{totalSections}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center min-h-[36px] min-w-[36px] ${
              isMuted
                ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
            }`}
            title={isMuted ? 'Sound Muted' : 'Sound Enabled'}
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </header>
  )
}

