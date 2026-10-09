import React, { useState } from 'react'
import {
  Video, Play, CheckCircle2, ChevronRight, Sparkles,
  Volume2, ShieldCheck, BookOpen, Layers
} from 'lucide-react'
import { formatVideoUrl } from '../../utils/mediaUtils'
import { gameAudio } from '../../utils/gameAudio'
import { gamification } from '../../utils/gamification'
import { AuraGuideAvatar } from './primitives/AuraGuideAvatar'
import { AssignedImageSlot, type CanonicalSection } from '../content/AssignedImageSlot'

interface ChapterVideoSectionProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  canonicalSection: CanonicalSection
  isCompleted?: boolean
  onComplete: () => void
  onJumpToSection?: (idx: number) => void
  tier?: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
}

export const ChapterVideoSection: React.FC<ChapterVideoSectionProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  canonicalSection,
  isCompleted = false,
  onComplete,
  onJumpToSection,
  tier = 'primary',
}) => {
  const parsedVideo = formatVideoUrl(canonicalSection.videoUrl)
  const [completedState, setCompletedState] = useState(isCompleted)
  const cNum = parseInt(String(chapterNum || '1'), 10)

  const handleFinishVideo = () => {
    gameAudio.playSuccess()
    gamification.launchConfetti()
    setCompletedState(true)
    if (!isCompleted) {
      onComplete()
    }
  }

  const defaultDialogue = `Welcome to Chapter ${chapterNum}! Watch this video introduction to learn how ${topicTitle || chapterTitle} works in real life.`
  const guideMessage = canonicalSection.videoDescription || canonicalSection.description || defaultDialogue

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col justify-between p-2 sm:p-4 gap-2 sm:gap-3.5 select-none overflow-hidden animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Video size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Section 1 · Video Briefing
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">
                ~{canonicalSection.estimatedMinutes || 6} mins
              </span>
            </div>
            <h2 className="text-xs sm:text-sm md:text-base font-black text-slate-900 truncate mt-0.5">
              {canonicalSection.title || `Introduction: ${topicTitle || chapterTitle}`}
            </h2>
          </div>
        </div>

        {completedState ? (
          <span className="shrink-0 flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Completed</span>
          </span>
        ) : (
          <span className="shrink-0 text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl">
            Watch to Complete
          </span>
        )}
      </div>

      {/* Main Video Presentation Area - Scaled for 0-Scroll Mobile */}
      <div className="flex-1 min-h-0 flex flex-col justify-center items-center w-full max-h-[52vh] sm:max-h-[58vh]">
        <div className="w-full h-full max-w-3xl aspect-video max-h-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-slate-900 relative flex items-center justify-center">
          {parsedVideo.isEmbed ? (
            <iframe
              src={parsedVideo.embedUrl}
              title={canonicalSection.title || 'Chapter Video'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : parsedVideo.directUrl ? (
            <video
              src={parsedVideo.directUrl}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="p-4 sm:p-6 text-center text-white space-y-2 sm:space-y-3 max-w-md">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
                <Video size={28} />
              </div>
              <h3 className="text-sm sm:text-lg font-black text-indigo-200">
                {canonicalSection.title || topicTitle}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-3">
                {guideMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Aura AI Guide Interactive Dialogue */}
      <div className="shrink-0 w-full max-w-3xl mx-auto">
        <AuraGuideAvatar
          mood={completedState ? 'celebrating' : 'explaining'}
          message={completedState ? `Great job watching the video! You're now ready to explore Lesson 1.` : guideMessage}
          size="sm"
          className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs"
        />
      </div>

      {/* Bottom Navigation & Completion Controls */}
      <div className="shrink-0 flex items-center justify-between gap-2 max-w-3xl mx-auto w-full pt-1">
        <button
          onClick={handleFinishVideo}
          className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95 ${
            completedState
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <CheckCircle2 size={16} />
          <span>{completedState ? 'Video Completed' : 'Complete Video Briefing'}</span>
        </button>

        {onJumpToSection && (
          <button
            onClick={() => onJumpToSection(1)}
            className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95"
          >
            <span>Next: Lesson 1</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
