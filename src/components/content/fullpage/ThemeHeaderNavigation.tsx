import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Award, Zap, CheckCircle2, Volume2, VolumeX,
  Video, BookOpen, Compass, FileEdit, Gamepad2, FlaskConical, Trophy,
  Layers, Menu
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
  stats: { xp: number; streak: number }
  tier?: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
}

export const CANONICAL_SECTION_STEPS = [
  { label: '1. Video', fullLabel: 'Video Briefing', icon: Video, type: 'video' },
  { label: '2. Lesson', fullLabel: 'Lesson 1: Concept Explore', icon: BookOpen, type: 'lesson' },
  { label: '3. Lesson', fullLabel: 'Lesson 2: Case Scenario', icon: Compass, type: 'lesson' },
  { label: '4. Worksheet', fullLabel: 'Worksheet: Workbook', icon: FileEdit, type: 'worksheet' },
  { label: '5. Activity', fullLabel: 'Activity: Challenge Game', icon: Gamepad2, type: 'activity' },
  { label: '6. Lesson', fullLabel: 'Lesson 3: Discovery Lab', icon: FlaskConical, type: 'lesson' },
  { label: '7. Assignment', fullLabel: 'Capstone Assignment', icon: Award, type: 'assignment' },
  { label: '8. Quiz', fullLabel: 'Mastery Quiz', icon: Trophy, type: 'quiz' },
]

export const ThemeHeaderNavigation: React.FC<ThemeNavProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  currentSectionIdx,
  totalSections,
  completedSectionIds,
  sectionIds,
  onSelectSection,
  onToggleMobileMenu,
  stats,
  tier = 'primary',
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-2 sm:px-4 py-1.5 sm:py-2.5 transition-colors w-full">
      <div className="w-full flex flex-col gap-1 sm:gap-2">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Left: Back to Roadmap & Chapter Identity */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate('/student/learning')}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer shrink-0 touch-manipulation min-h-[34px] min-w-[34px] flex items-center justify-center"
              title="Return to Curriculum Roadmap"
              aria-label="Back to Roadmap"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Mobile Sections Drawer Button (LG hidden) */}
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 border border-indigo-200 transition-all cursor-pointer shrink-0 touch-manipulation min-h-[34px] min-w-[34px] flex items-center justify-center gap-1 text-[11px] font-bold"
                title="View All 8 Sections"
                aria-label="Toggle Sections Menu"
              >
                <Layers size={15} />
                <span className="hidden xs:inline">Sections</span>
              </button>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                  {gradeKey.toUpperCase()}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate max-w-[120px] xs:max-w-[180px] sm:max-w-xs">
                  Ch {chapterNum}: {chapterTitle}
                </span>
              </div>
              <h1 className="text-xs sm:text-sm md:text-base font-black tracking-tight text-slate-900 truncate mt-0.5">
                {topicTitle}
              </h1>
            </div>
          </div>

          {/* Right: Audio Control */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Audio Mute Toggle Button */}
            <button
              onClick={handleToggleMute}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center min-h-[32px] min-w-[32px] ${
                isMuted
                  ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              }`}
              title={isMuted ? 'Sound Muted - Click to Unmute' : 'Sound Enabled - Click to Mute'}
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
