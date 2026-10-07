import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, Video, BookOpen, Compass, FileEdit,
  Gamepad2, FlaskConical, Award, Trophy,
  ChevronRight, User, LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import type { CanonicalSection } from '../../pages/student/ChapterLearningPage'
import { toast } from 'react-hot-toast'

export interface LearningSidebarProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  sections: CanonicalSection[]
  currentSectionIdx: number
  completedSectionIds: string[]
  onSelectSection: (idx: number) => void
  stats?: { xp: number; streak: number }
  tier: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
}

const SECTION_ICONS = [
  Video,        // 1. VIDEO
  BookOpen,     // 2. LESSON 1
  Compass,      // 3. LESSON 2
  FileEdit,     // 4. WORKSHEET
  Gamepad2,     // 5. ACTIVITY
  FlaskConical, // 6. LESSON 3 / DISCOVERY LAB
  Award,        // 7. ASSIGNMENT
  Trophy,       // 8. QUIZ
]

export const LearningSidebar: React.FC<LearningSidebarProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  sections,
  currentSectionIdx,
  completedSectionIds,
  onSelectSection,
  tier,
}) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Tier-specific styling accents
  const tierColor = (() => {
    switch (tier) {
      case 'primary': return { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-800', bar: 'from-amber-500 to-orange-500', badge: 'bg-amber-100 text-amber-900' }
      case 'middle': return { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-800', bar: 'from-blue-600 to-indigo-600', badge: 'bg-blue-100 text-blue-900' }
      case 'high': return { border: 'border-indigo-300', bg: 'bg-indigo-50', text: 'text-indigo-800', bar: 'from-indigo-600 to-violet-600', badge: 'bg-indigo-100 text-indigo-900' }
      case 'ug': return { border: 'border-cyan-300', bg: 'bg-cyan-50', text: 'text-cyan-800', bar: 'from-cyan-600 to-blue-600', badge: 'bg-cyan-100 text-cyan-900' }
      case 'pg': return { border: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-800', bar: 'from-emerald-600 to-teal-600', badge: 'bg-emerald-100 text-emerald-900' }
    }
  })()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      navigate('/login')
    } catch {
      navigate('/login')
    }
  }

  return (
    <aside className="w-72 xl:w-80 shrink-0 bg-white flex flex-col justify-between h-full overflow-hidden select-none">
      {/* Top Sidebar Header (Compact, No Chapter Progress box) */}
      <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-slate-100 shrink-0 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${tierColor.badge}`}>
            {gradeKey.toUpperCase()} • TIER {tier.toUpperCase()}
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-500">
            Chapter {chapterNum}
          </span>
        </div>

        <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug truncate mt-1">
          {chapterTitle}
        </h2>
        <p className="text-[11px] font-medium text-slate-500 truncate">
          {topicTitle}
        </p>
      </div>

      {/* Center: The 8 Sections (Evenly Distributed, Zero Scrolling) */}
      <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between overflow-hidden gap-1">
        {sections.slice(0, 8).map((sec, idx) => {
          const isCompleted = completedSectionIds.includes(sec.id)
          const isActive = currentSectionIdx === idx
          const IconComponent = SECTION_ICONS[idx] || BookOpen

          // Canonical labels
          const canonicalLabels = [
            '1. Video Briefing',
            '2. Lesson 1: Concept Explore',
            '3. Lesson 2: Case Scenario',
            '4. Worksheet: Workbook',
            '5. Activity: Challenge Game',
            '6. Lesson 3: Discovery Lab',
            '7. Capstone Assignment',
            '8. Final Mastery Quiz',
          ]
          const displayLabel = canonicalLabels[idx] || sec.title

          let stateStyle = 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200'
          if (isActive) {
            stateStyle = 'bg-indigo-50/95 border-indigo-300 text-indigo-950 font-bold shadow-2xs ring-1 ring-indigo-200'
          } else if (isCompleted) {
            stateStyle = 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900 font-semibold hover:bg-emerald-50'
          }

          return (
            <button
              key={sec.id || idx}
              onClick={() => onSelectSection(idx)}
              className={`w-full text-left px-2.5 py-1.5 sm:py-2 rounded-xl border transition-all flex items-center justify-between group cursor-pointer flex-1 min-h-0 ${stateStyle}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Status Dot / Checkmark */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <CheckCircle2 size={13} className="stroke-[2.5]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px] shadow-xs animate-pulse">
                      <span>●</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center text-[10px] font-mono text-slate-500 font-bold">
                      {idx + 1}
                    </div>
                  )}
                </div>

                {/* Section Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <IconComponent size={13} className={isActive ? 'text-indigo-600 shrink-0' : isCompleted ? 'text-emerald-600 shrink-0' : 'text-slate-400 shrink-0'} />
                    <span className="text-xs font-semibold truncate block leading-tight">
                      {displayLabel}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">
                    {sec.contentType?.toUpperCase()} · {sec.estimatedMinutes || 8}m · +{sec.xpReward || 20} XP
                  </span>
                </div>
              </div>

              <ChevronRight
                size={13}
                className={`shrink-0 transition-transform ml-1 ${
                  isActive ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* Bottom Sidebar Footer: Profile + Sign Out (Fixed at bottom) */}
      <div className="p-2.5 sm:p-3 border-t border-slate-200/90 bg-slate-50/95 space-y-1.5 shrink-0">
        {/* Profile Card */}
        <button
          onClick={() => navigate('/student/profile')}
          className="w-full p-2 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all flex items-center justify-between group cursor-pointer shadow-2xs text-left"
          title="View Student Profile"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {user?.profile?.full_name ? user.profile.full_name.charAt(0).toUpperCase() : <User size={14} />}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate block leading-tight group-hover:text-indigo-600">
                {user?.profile?.full_name || 'Student Profile'}
              </span>
              <span className="text-[10px] text-slate-500 truncate block">
                {user?.email || gradeKey.toUpperCase()}
              </span>
            </div>
          </div>
          <ChevronRight size={13} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-1.5 px-2.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        >
          <LogOut size={13} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default LearningSidebar

