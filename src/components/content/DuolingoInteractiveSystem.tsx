import { useState, useMemo } from 'react'
import {
  Check, ChevronRight, X,
  Sparkles, Award, Heart, Flame, Zap,
  RefreshCw, ArrowRight,
  Sliders, Shield, Cpu,
  BookOpen, Layers, Lightbulb, Camera, Brain, Compass, Gamepad2, Navigation, Puzzle, Microscope, Search, Wrench, Trophy
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. TOP DUOLINGO APP HUD & PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoTopHUD({
  chapterTitle,
  currentSectionIdx,
  totalSections,
  completedCount,
  streakDays = 3,
  xp = 0,
  hearts = 3,
  onBack,
}: {
  chapterTitle: string
  currentSectionIdx: number
  totalSections: number
  completedCount: number
  streakDays?: number
  xp?: number
  hearts?: number
  onBack?: () => void
}) {
  const safeTotal = totalSections || 8
  const progressPct = Math.min(100, Math.round((completedCount / safeTotal) * 1000) / 10)

  return (
    <header className="bg-white/95 backdrop-blur-md border-b-2 border-slate-200 sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
              title="Back to Roadmap"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black text-slate-900 truncate">
              {chapterTitle}
            </h1>
            <p className="text-[10px] text-slate-500 font-bold truncate">
              Stage {currentSectionIdx + 1} of {totalSections || 8} · {progressPct}% Done
            </p>
          </div>
        </div>

        {/* Center: Duolingo Progress Bar */}
        <div className="flex-1 max-w-xs mx-2 hidden xs:block">
          <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${Math.max(5, progressPct)}%` }}
            />
          </div>
        </div>

        {/* Right: Gamified Stats (Hearts, Streak, XP) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl text-rose-600 text-xs font-black">
            <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" />
            <span>{hearts}</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl text-amber-600 text-xs font-black">
            <Flame size={14} className="fill-amber-500 text-amber-500" />
            <span>{streakDays}</span>
          </div>

          <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-xl text-indigo-600 text-xs font-black">
            <Zap size={14} className="fill-indigo-500 text-indigo-500" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DUOLINGO STAGE NAVIGATION RAIL (8 Stages with Unlock Logic)
// ─────────────────────────────────────────────────────────────────────────────

export interface StageDescriptor {
  idx: number
  id: string
  label: string
  title: string
  icon: any
  isDone: boolean
  isUnlocked: boolean
  isActive: boolean
}

export function DuolingoStageRail({
  sections,
  currentSectionIdx,
  completedSectionIds,
  onSelectSection,
}: {
  sections: CanonicalSection[]
  currentSectionIdx: number
  completedSectionIds: string[]
  onSelectSection: (idx: number) => void
}) {
  const stages: { label: string; icon: any }[] = [
    { label: 'Explore', icon: Compass },
    { label: 'Topic Game', icon: Gamepad2 },
    { label: 'Path Mission', icon: Navigation },
    { label: 'Sort & Snap', icon: Puzzle },
    { label: 'Live Sandbox', icon: Microscope },
    { label: 'Clue Mystery', icon: Search },
    { label: 'Maker Studio', icon: Wrench },
    { label: 'Boss Arena', icon: Trophy },
  ]

  return (
    <div className="bg-white border-b border-slate-200 px-2 py-2 overflow-x-auto scrollbar-none sticky top-[53px] z-30 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1.5 min-w-[560px]">
        {sections.map((sec, idx) => {
          const isDone = completedSectionIds.includes(sec.id)
          const isActive = currentSectionIdx === idx
          const stageMeta = stages[idx] || { label: `S${idx + 1}`, icon: Sparkles }
          const IconComp = stageMeta.icon

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(idx)}
              className={`flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all duration-200 text-center relative cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md scale-102 ring-2 ring-blue-400'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1">
                {isDone ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    <Check size={11} strokeWidth={3} />
                  </span>
                ) : (
                  <IconComp size={13} className={isActive ? 'text-white' : 'text-slate-500'} />
                )}
                <span className="text-[10px] font-black tracking-tight">{stageMeta.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DUOLINGO SLIDING BOTTOM FEEDBACK SHEET
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoBottomFeedback({
  status,
  explanation,
  onContinue,
  onRetry,
}: {
  status: 'correct' | 'wrong' | null
  explanation?: string
  onContinue: () => void
  onRetry?: () => void
}) {
  if (!status) return null

  const isCorrect = status === 'correct'

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-4 transition-all duration-300 animate-duolingo-slide-up shadow-2xl ${
      isCorrect
        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
        : 'bg-rose-50 border-rose-500 text-rose-950'
    }`}>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white ${
            isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
          }`}>
            {isCorrect ? <Check size={28} strokeWidth={3} /> : <X size={28} strokeWidth={3} />}
          </div>
          <div className="min-w-0">
            <h4 className="text-base sm:text-lg font-black">
              {isCorrect ? 'Awesome! That is correct!' : 'Not quite right yet!'}
            </h4>
            {explanation && (
              <p className="text-xs sm:text-sm font-medium mt-0.5 opacity-90 line-clamp-2">
                {explanation}
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          {!isCorrect && onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-3 rounded-2xl font-black text-xs text-rose-700 bg-white border-2 border-rose-300 hover:bg-rose-100 duolingo-btn-3d flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          )}
          <button
            onClick={onContinue}
            className={`px-8 py-3 rounded-2xl font-black text-xs sm:text-sm text-white duolingo-btn-3d flex items-center justify-center gap-2 flex-1 sm:flex-initial shadow-md ${
              isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TOPIC-SPECIFIC ANIMATED SVG ILLUSTRATION SYSTEM (Clean, Zero Emojis)
// ─────────────────────────────────────────────────────────────────────────────

export function TopicInteractiveSVG({
  topicTitle,
  archetype = 'mobile',
  interactiveState = 0,
}: {
  topicTitle: string
  archetype?: 'mobile' | 'transport' | 'robot' | 'patterns' | 'sensor' | 'neural' | 'cloud'
  interactiveState?: number
}) {
  const title = (topicTitle || '').toLowerCase()

  // Archetype auto-detection
  const resolvedType = useMemo(() => {
    if (archetype) return archetype
    if (title.includes('mobile') || title.includes('phone') || title.includes('assistant')) return 'mobile'
    if (title.includes('move') || title.includes('car') || title.includes('transport') || title.includes('drive')) return 'transport'
    if (title.includes('command') || title.includes('robot') || title.includes('rover')) return 'robot'
    if (title.includes('pattern') || title.includes('example') || title.includes('learn')) return 'patterns'
    if (title.includes('sensor') || title.includes('vision') || title.includes('camera')) return 'sensor'
    if (title.includes('neural') || title.includes('brain') || title.includes('network')) return 'neural'
    return 'mobile'
  }, [archetype, title])

  return (
    <div className="w-full h-56 sm:h-64 rounded-3xl bg-slate-900 border-2 border-slate-800 p-4 flex items-center justify-center overflow-hidden relative shadow-inner">
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ── 1. MOBILE SMARTPHONE SVG ── */}
      {resolvedType === 'mobile' && (
        <svg viewBox="0 0 240 200" className="w-full h-full max-w-xs animate-duolingo-float">
          {/* Phone body */}
          <rect x="70" y="20" width="100" height="160" rx="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
          <rect x="78" y="36" width="84" height="128" rx="8" fill="#0f172a" />
          {/* Screen notch / camera */}
          <circle cx="120" cy="28" r="3" fill="#38bdf8" />
          {/* AI Scanner Ring */}
          <circle
            cx="120"
            cy="100"
            r={interactiveState > 0 ? 32 : 24}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="6 3"
            className="animate-spin"
            style={{ animationDuration: '6s', transformOrigin: '120px 100px' }}
          />
          <circle cx="120" cy="100" r="14" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
          <path d="M112 100 L118 106 L128 94" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Feature indicators */}
          <rect x="86" y="46" width="30" height="10" rx="4" fill="#3b82f6" fillOpacity="0.7" />
          <rect x="124" y="46" width="30" height="10" rx="4" fill="#a855f7" fillOpacity="0.7" />
          <rect x="86" y="140" width="68" height="14" rx="5" fill="#334155" />
          <circle cx="120" cy="147" r="3" fill="#38bdf8" />
        </svg>
      )}

      {/* ── 2. TRANSPORT / SMART VEHICLE SVG ── */}
      {resolvedType === 'transport' && (
        <svg viewBox="0 0 260 200" className="w-full h-full max-w-xs">
          {/* Road */}
          <path d="M10 160 L250 160" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 160 L70 160 M110 160 L140 160 M180 160 L210 160" stroke="#facc15" strokeWidth="3" strokeDasharray="8 6" />
          {/* Vehicle Body */}
          <path d="M60 140 L75 110 L155 110 L185 140 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="90" cy="145" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="160" cy="145" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
          {/* Windows */}
          <path d="M85 115 L105 115 L105 135 L75 135 Z" fill="#e0f2fe" fillOpacity="0.8" />
          <path d="M112 115 L150 115 L165 135 L112 135 Z" fill="#e0f2fe" fillOpacity="0.8" />
          {/* Lidar Sensor on Roof */}
          <rect x="110" y="100" width="16" height="10" rx="3" fill="#f43f5e" />
          {/* Radar Waves */}
          <circle cx="118" cy="105" r="28" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="118" cy="105" r="44" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
        </svg>
      )}

      {/* ── 3. ROVER / ROBOT COMMAND SVG ── */}
      {resolvedType === 'robot' && (
        <svg viewBox="0 0 240 200" className="w-full h-full max-w-xs animate-duolingo-float">
          {/* Robot Head */}
          <rect x="80" y="55" width="80" height="65" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
          {/* Antenna */}
          <line x1="120" y1="55" x2="120" y2="35" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="120" cy="30" r="6" fill="#10b981" />
          {/* Eyes */}
          <circle cx="102" cy="85" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="102" cy="85" r="4" fill="#38bdf8" />
          <circle cx="138" cy="85" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="138" cy="85" r="4" fill="#38bdf8" />
          {/* Smile / Screen line */}
          <path d="M106 106 Q120 114 134 106" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Neck & Body */}
          <rect x="110" y="120" width="20" height="10" fill="#475569" />
          <rect x="75" y="130" width="90" height="40" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
          {/* Status light */}
          <circle cx="120" cy="150" r="5" fill="#f59e0b" />
        </svg>
      )}

      {/* ── 4. PATTERNS / EXAMPLES SVG ── */}
      {resolvedType === 'patterns' && (
        <svg viewBox="0 0 240 200" className="w-full h-full max-w-xs">
          {/* Group A (Circles) */}
          <g transform="translate(40, 60)">
            <rect x="0" y="0" width="60" height="80" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="30" cy="30" r="14" fill="#0284c7" />
            <circle cx="30" cy="58" r="8" fill="#38bdf8" />
          </g>
          {/* Group B (Triangles) */}
          <g transform="translate(140, 60)">
            <rect x="0" y="0" width="60" height="80" rx="12" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <polygon points="30,16 16,42 44,42" fill="#9333ea" />
            <polygon points="30,50 20,68 40,68" fill="#c084fc" />
          </g>
          {/* Pattern Classifier Bridge */}
          <path d="M105 100 L135 100" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
          <circle cx="120" cy="100" r="10" fill="#10b981" />
          <path d="M117 100 L123 100" stroke="#ffffff" strokeWidth="2" />
        </svg>
      )}

      {/* ── 5. NEURAL / DATA FLOW SVG ── */}
      {resolvedType === 'neural' && (
        <svg viewBox="0 0 240 200" className="w-full h-full max-w-xs">
          {/* Layer 1 */}
          <circle cx="50" cy="60" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="50" cy="100" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="50" cy="140" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          {/* Layer 2 */}
          <circle cx="120" cy="80" r="12" fill="#7c3aed" stroke="#a855f7" strokeWidth="2" />
          <circle cx="120" cy="120" r="12" fill="#7c3aed" stroke="#a855f7" strokeWidth="2" />
          {/* Layer 3 */}
          <circle cx="190" cy="100" r="14" fill="#059669" stroke="#10b981" strokeWidth="2.5" />
          {/* Connections */}
          <line x1="62" y1="60" x2="108" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="62" y1="100" x2="108" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="62" y1="100" x2="108" y2="120" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="62" y1="140" x2="108" y2="120" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="132" y1="80" x2="176" y2="100" stroke="#10b981" strokeWidth="2" />
          <line x1="132" y1="120" x2="176" y2="100" stroke="#10b981" strokeWidth="2" />
        </svg>
      )}

      {/* Floating Status Pill */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-cyan-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles size={11} className="text-cyan-400" />
        <span>Active Concept Model</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SECTION 1: DUOLINGO MISSION BRIEFING
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoMissionBriefing({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(section.topicTitle || section.title)
  const [cluesRead, setCluesRead] = useState<Record<number, boolean>>({ 0: true })

  const intelItems = (profile.learnPoints && profile.learnPoints.length > 0)
    ? profile.learnPoints.slice(0, 3)
    : [
        'See how this intelligent technology solves problems in daily life.',
        'Discover the simple steps machines follow to make smart decisions.',
        'Apply basic safety rules to build helpful and fair AI solutions.',
      ]

  const handleStart = () => {
    gamification.launchConfetti()
    gamification.addXP(15, undefined, `briefing-${section.id}`)
    toast.success('Mission Briefing Accepted! +15 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-6 animate-duolingo-pop">
      {/* Hero Visual Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Zap size={11} /> Mission 1 · Briefing
          </span>
          <span className="text-[11px] font-bold text-slate-500">~{section.estimatedMinutes || 5} mins</span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
            {section.title}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
            {section.description || profile.goal || 'Read the mission clues below and prepare your strategy before diving in!'}
          </p>
        </div>

        {/* Animated SVG Visual */}
        <TopicInteractiveSVG topicTitle={section.title} />

        {/* Real-world everyday example */}
        {profile.analogy && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-start gap-2.5">
            <Lightbulb size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950 font-medium">
              <strong className="text-blue-700">Everyday Example: </strong>
              {profile.analogy}
            </div>
          </div>
        )}
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'sec-1'}
        position="header"
      />

      {/* Tap-to-read Mission Intel */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2.5">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          <span>Mission Objectives</span>
        </h3>

        <div className="space-y-2">
          {intelItems.map((point, idx) => {
            const isRead = cluesRead[idx]
            return (
              <button
                key={idx}
                onClick={() => setCluesRead(prev => ({ ...prev, [idx]: true }))}
                className={`w-full p-3 rounded-2xl text-left text-xs transition-all flex items-start gap-2.5 border-2 ${
                  isRead
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 font-medium'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                  isRead ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isRead ? '✓' : idx + 1}
                </span>
                <span className="flex-1">{point}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Start Mission CTA */}
      <button
        onClick={handleStart}
        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm duolingo-btn-emerald-3d flex items-center justify-center gap-2 shadow-md cursor-pointer"
      >
        <span>{isCompleted ? 'Next Stage: Lesson 1 ➔' : 'START MISSION (+15 XP)'}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SECTION 2: DUOLINGO DISCOVERY LESSON (Concept 1)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoConceptDiscovery({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(section.topicTitle || section.title)
  const [activeHotspot, setActiveHotspot] = useState<number>(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)
  const [showTeacherNotes, setShowTeacherNotes] = useState(false)

  const discoveryFeatures = [
    {
      id: 0,
      title: '1. Input & Sensor',
      shortDesc: 'A camera, microphone, or sensor collects clean information from the world.',
      icon: Camera,
    },
    {
      id: 1,
      title: '2. Smart Pattern Engine',
      shortDesc: 'The computer checks past examples to identify what it is looking at.',
      icon: Brain,
    },
    {
      id: 2,
      title: '3. Instant Action',
      shortDesc: 'It unlocks the phone, answers a question, or warns of an obstacle!',
      icon: Zap,
    },
  ]

  const challengeQuestion = {
    prompt: `How does ${section.topicTitle || 'AI'} help people the most?`,
    options: [
      `It automates repetitive tasks and helps humans make faster, safer decisions`,
      `It completely turns off electricity when plugged in`,
      `It only works if you do not touch any screen`,
    ],
    correctIdx: 0,
    hint: 'AI learns from examples to give fast assistance and find helpful patterns!',
  }

  const handleCheckAnswer = (idx: number) => {
    setSelectedOpt(idx)
    if (idx === challengeQuestion.correctIdx) {
      setFeedbackStatus('correct')
    } else {
      setFeedbackStatus('wrong')
    }
  }

  const handleContinue = () => {
    gamification.launchConfetti()
    gamification.addXP(20, undefined, `c1-${section.id}`)
    toast.success('Stage Complete! +20 XP awarded')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      {/* Header Info */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <BookOpen size={11} /> Concept 1 · Interactive Discovery
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Completed
            </span>
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          {section.topicTitle || section.title}
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Tap each component below to see how it works!
        </p>

        {/* Interactive SVG Diagram */}
        <TopicInteractiveSVG topicTitle={section.title} interactiveState={activeHotspot} />

        {/* Hotspot Discovery Pills */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {discoveryFeatures.map(feat => {
            const FeatIcon = feat.icon
            return (
              <button
                key={feat.id}
                onClick={() => setActiveHotspot(feat.id)}
                className={`p-2.5 rounded-2xl border-2 text-center text-xs font-black transition-all ${
                  activeHotspot === feat.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900 duolingo-card-3d'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-center text-blue-600"><FeatIcon size={18} /></div>
                <div className="text-[10px] truncate mt-1">{feat.title}</div>
              </button>
            )
          })}
        </div>

        {/* Selected Hotspot Explanation Card */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-950 font-medium flex items-start gap-2">
          <Sparkles size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <span>{discoveryFeatures[activeHotspot].shortDesc}</span>
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'lesson1'}
        position="header"
      />

      {/* Everyday Takeaway */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={14} className="text-emerald-500" />
          <span>Core Concept In Simple Words</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {profile.analogy || 'A smart machine does not guess randomly. It inspects clues, checks past examples, and picks the most accurate answer!'}
        </p>
      </div>

      {/* Duolingo Mini Challenge Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
          <Award size={14} className="text-amber-500" />
          <span>Quick Check</span>
        </h3>
        <p className="text-xs font-bold text-slate-800">
          {challengeQuestion.prompt}
        </p>

        <div className="space-y-2">
          {challengeQuestion.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx
            return (
              <button
                key={idx}
                onClick={() => handleCheckAnswer(idx)}
                className={`w-full text-left p-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-2.5 duolingo-card-3d ${
                  isSelected
                    ? idx === challengeQuestion.correctIdx
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : 'border-rose-400 bg-rose-50 text-rose-950 animate-duolingo-shake'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className={`w-6 h-6 rounded-xl flex items-center justify-center font-bold text-[11px] flex-shrink-0 ${
                  isSelected
                    ? idx === challengeQuestion.correctIdx ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Manager Teacher Notes Accordion (Preserving Admin edits) */}
      {section.htmlContent && section.htmlContent.length > 20 && (
        <div className="bg-slate-100 rounded-2xl border border-slate-300 p-3 space-y-2">
          <button
            onClick={() => setShowTeacherNotes(v => !v)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-700"
          >
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> Teacher Notes &amp; Curriculum Detail</span>
            <span>{showTeacherNotes ? '▲ Hide' : '▼ View'}</span>
          </button>
          {showTeacherNotes && (
            <div
              className="text-xs text-slate-600 prose prose-xs max-w-none pt-2 border-t border-slate-200"
              dangerouslySetInnerHTML={{ __html: section.htmlContent }}
            />
          )}
        </div>
      )}

      {/* Bottom Feedback Sheet */}
      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation={challengeQuestion.hint}
        onContinue={handleContinue}
        onRetry={() => {
          setSelectedOpt(null)
          setFeedbackStatus(null)
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. SECTION 3: DUOLINGO APPLIED LESSON (Concept 2 - Step Sequence / Slider)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoAppliedLesson({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [sliderStep, setSliderStep] = useState<number>(1)
  const [stepOrdered, setStepOrdered] = useState<number[]>([])
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)
  const [showTeacherNotes, setShowTeacherNotes] = useState(false)

  const pipelineSteps = [
    { id: 1, label: '1. Collect Sensory Input', desc: 'Sensors detect surroundings and send data.' },
    { id: 2, label: '2. Compare Known Patterns', desc: 'Processor maps inputs to learned models.' },
    { id: 3, label: '3. Execute Best Action', desc: 'Motors or displays respond accurately.' },
  ]

  const handleAddStep = (id: number) => {
    if (stepOrdered.includes(id)) return
    const nextOrder = [...stepOrdered, id]
    setStepOrdered(nextOrder)

    if (nextOrder.length === 3) {
      if (nextOrder[0] === 1 && nextOrder[1] === 2 && nextOrder[2] === 3) {
        setFeedbackStatus('correct')
      } else {
        setFeedbackStatus('wrong')
      }
    }
  }

  const handleContinue = () => {
    gamification.launchConfetti()
    gamification.addXP(20, undefined, `c2-${section.id}`)
    toast.success('Stage 3 Completed! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Layers size={11} /> Concept 2 · Step Pipeline
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Completed
            </span>
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          {section.topicTitle || section.title}
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Slide the confidence tuner or arrange the pipeline steps in correct sequence!
        </p>

        {/* Workflow Diagram SVG */}
        <TopicInteractiveSVG topicTitle={section.title} archetype="neural" interactiveState={sliderStep} />

        {/* Confidence Slider Tuner */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1">
              <Sliders size={13} className="text-purple-600" />
              <span>Sensor Sensitivity Threshold:</span>
            </span>
            <span className="text-purple-700 font-black">{sliderStep * 33}% Confidence</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            value={sliderStep}
            onChange={e => setSliderStep(parseInt(e.target.value, 10))}
            className="w-full accent-purple-600 cursor-pointer"
          />
          <p className="text-[11px] text-slate-500">
            {sliderStep === 1 ? 'Low Threshold: Detects fast, might catch noise.' : sliderStep === 2 ? 'Balanced: Reliable in normal conditions.' : 'High Precision: Very strict, only responds to confirmed data.'}
          </p>
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'lesson2'}
        position="header"
      />

      {/* Hands-on Pipeline Ordering Activity */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
            <Cpu size={14} className="text-purple-600" />
            <span>Arrange the 3 Steps in Order</span>
          </h3>
          {stepOrdered.length > 0 && (
            <button
              onClick={() => {
                setStepOrdered([])
                setFeedbackStatus(null)
              }}
              className="text-[10px] text-slate-500 font-bold hover:text-slate-800 underline"
            >
              Reset
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600">Tap each step in the order it happens:</p>

        <div className="space-y-2">
          {pipelineSteps.map(step => {
            const isChosen = stepOrdered.includes(step.id)
            const orderIndex = stepOrdered.indexOf(step.id)

            return (
              <button
                key={step.id}
                onClick={() => handleAddStep(step.id)}
                disabled={isChosen}
                className={`w-full text-left p-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-between duolingo-card-3d ${
                  isChosen
                    ? 'border-purple-300 bg-purple-50 text-purple-950 opacity-80'
                    : 'border-slate-200 bg-white hover:border-purple-300 text-slate-700'
                }`}
              >
                <span>{step.label}</span>
                {isChosen && (
                  <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    Step {orderIndex + 1}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Teacher Notes Accordion */}
      {section.htmlContent && section.htmlContent.length > 20 && (
        <div className="bg-slate-100 rounded-2xl border border-slate-300 p-3 space-y-2">
          <button
            onClick={() => setShowTeacherNotes(v => !v)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-700"
          >
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> Teacher Notes &amp; Detailed Curriculum</span>
            <span>{showTeacherNotes ? '▲ Hide' : '▼ View'}</span>
          </button>
          {showTeacherNotes && (
            <div
              className="text-xs text-slate-600 prose prose-xs max-w-none pt-2 border-t border-slate-200"
              dangerouslySetInnerHTML={{ __html: section.htmlContent }}
            />
          )}
        </div>
      )}

      {/* Bottom Feedback Sheet */}
      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation="First collect input, then analyze patterns, then execute the final decision!"
        onContinue={handleContinue}
        onRetry={() => {
          setStepOrdered([])
          setFeedbackStatus(null)
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. SECTION 4: DUOLINGO PRACTICE (Match & Sort Activity)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoMatchSort({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)

  const pairs = [
    { id: 'p1', left: 'Camera Vision', right: 'Detects road signs & pedestrian crosswalks' },
    { id: 'p2', left: 'Voice Recognition', right: 'Converts spoken sound waves into digital text' },
    { id: 'p3', left: 'Recommendation AI', right: 'Suggests songs and videos you may enjoy' },
    { id: 'p4', left: 'Safety Filter', right: 'Blocks harmful or incorrect content' },
  ]

  const handleSelectLeft = (id: string) => {
    setSelectedLeft(id)
  }

  const handleSelectRight = (pairId: string) => {
    if (!selectedLeft) return

    if (selectedLeft === pairId) {
      const updated = { ...matchedPairs, [pairId]: pairId }
      setMatchedPairs(updated)
      setSelectedLeft(null)
      toast.success('Matched!')

      if (Object.keys(updated).length === pairs.length) {
        setFeedbackStatus('correct')
      }
    } else {
      toast.error('Not a match! Try another pair.')
      setSelectedLeft(null)
    }
  }

  const handleContinue = () => {
    gamification.launchConfetti()
    gamification.addXP(20, undefined, `match-${section.id}`)
    toast.success('All Pairs Matched! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Zap size={11} /> Section 4 · Match &amp; Sort Practice
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Completed
            </span>
          )}
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          Match the AI Concept to Its Real-Life Job
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Tap a concept on the left, then tap its real-world purpose on the right!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Matching Grid */}
      <div className="space-y-3">
        {pairs.map(pair => {
          const isMatched = Boolean(matchedPairs[pair.id])
          const isLeftSelected = selectedLeft === pair.id

          return (
            <div key={pair.id} className="grid grid-cols-2 gap-2">
              {/* Left tile */}
              <button
                onClick={() => handleSelectLeft(pair.id)}
                disabled={isMatched}
                className={`p-3 rounded-2xl border-2 text-left text-xs font-black transition-all duolingo-card-3d ${
                  isMatched
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : isLeftSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-400'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                {isMatched ? `✓ ${pair.left}` : pair.left}
              </button>

              {/* Right tile */}
              <button
                onClick={() => handleSelectRight(pair.id)}
                disabled={isMatched}
                className={`p-3 rounded-2xl border-2 text-left text-xs font-medium transition-all duolingo-card-3d ${
                  isMatched
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                {pair.right}
              </button>
            </div>
          )
        })}
      </div>

      {/* Progress pill */}
      <div className="text-center">
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {Object.keys(matchedPairs).length} of {pairs.length} Matched
        </span>
      </div>

      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation="Outstanding! Every concept was matched to its real-world function."
        onContinue={handleContinue}
        onRetry={() => {
          setMatchedPairs({})
          setFeedbackStatus(null)
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. SECTION 5: DUOLINGO FLASH DUEL (Quick Concept Reinforcement)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoFlashDuel({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)

  const cards = [
    {
      statement: 'AI learns from examples rather than having every single answer hardcoded by hand.',
      isTrue: true,
      explanation: 'True! Modern AI trains on datasets to recognize patterns automatically.',
    },
    {
      statement: 'Self-driving vehicles only use battery power and do not need any sensors.',
      isTrue: false,
      explanation: 'False! They rely on radar, lidar, cameras, and computers to navigate safely.',
    },
    {
      statement: 'High quality and diverse training data helps machines avoid unfair mistakes.',
      isTrue: true,
      explanation: 'True! Clean, balanced training data produces fair and reliable decisions.',
    },
  ]

  const card = cards[currentCardIdx] || cards[0]

  const handleDecision = (pickTrue: boolean) => {
    if (pickTrue === card.isTrue) {
      setStreakCount(s => s + 1)
      setFeedbackStatus('correct')
    } else {
      setFeedbackStatus('wrong')
    }
  }

  const handleContinue = () => {
    setFeedbackStatus(null)
    if (currentCardIdx < cards.length - 1) {
      setCurrentCardIdx(i => i + 1)
    } else {
      gamification.launchConfetti()
      gamification.addXP(15, undefined, `duel-${section.id}`)
      toast.success('Flash Duel Mastered! +15 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Flame size={11} /> Section 5 · Quick Concept Duel
          </span>
          <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
            {isCompleted ? '✓ Completed' : <><Flame size={12} className="fill-amber-500 text-amber-500" /> {streakCount} Streak</>}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          True or False Challenge
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Card {currentCardIdx + 1} of {cards.length}
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'resource'}
        position="header"
      />

      {/* Duel Flashcard */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-400/30 shadow-xl space-y-4 text-center">
        <div className="flex justify-center"><Zap size={28} className="text-amber-400" /></div>
        <p className="text-base sm:text-lg font-bold leading-relaxed text-indigo-100">
          "{card.statement}"
        </p>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            onClick={() => handleDecision(true)}
            className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm duolingo-btn-emerald-3d shadow-md"
          >
            ✓ TRUE
          </button>
          <button
            onClick={() => handleDecision(false)}
            className="py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm duolingo-btn-rose-3d shadow-md"
          >
            ✕ FALSE
          </button>
        </div>
      </div>

      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation={card.explanation}
        onContinue={handleContinue}
        onRetry={() => setFeedbackStatus(null)}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. SECTION 6: DUOLINGO PRACTICAL LAB (Mini Simulation Sandbox)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoPracticalLab({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [filterMode, setFilterMode] = useState<'boxes' | 'edges' | 'radar'>('boxes')
  const [labTicks, setLabTicks] = useState<Record<string, boolean>>({})

  const handleToggleCheck = (key: string) => {
    setLabTicks(prev => ({ ...prev, [key]: true }))
  }

  const allDone = Boolean(labTicks['t1'] && labTicks['t2'])

  const handleFinish = () => {
    gamification.launchConfetti()
    gamification.addXP(20, undefined, `lab-${section.id}`)
    toast.success('Lab Experiment Completed! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-6 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <span className="bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Sliders size={11} /> Section 6 · Interactive Sandbox
        </span>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          Virtual AI Vision Lab
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Toggle vision filters to see how the computer processes incoming video frames in real time!
        </p>
      </div>

      {/* Simulator Screen */}
      <div className="relative rounded-3xl bg-slate-950 border-2 border-cyan-500/40 p-4 aspect-video flex flex-col justify-between overflow-hidden shadow-xl">
        <div className="flex items-center justify-between text-[11px] text-cyan-300 font-mono">
          <span>FRAME: #1042</span>
          <span>FPS: 60 · DETECTIONS: 3</span>
        </div>

        {/* Dynamic Canvas Simulation */}
        <div className="relative flex-1 flex items-center justify-center">
          {filterMode === 'boxes' && (
            <div className="w-36 h-28 border-2 border-emerald-400 bg-emerald-500/10 rounded-xl relative flex items-start justify-start p-1.5 animate-pulse">
              <span className="bg-emerald-600 text-white text-[9px] font-mono px-1 rounded">
                OBJECT: 98%
              </span>
            </div>
          )}
          {filterMode === 'edges' && (
            <div className="w-44 h-28 border-2 border-dashed border-cyan-400 rounded-xl flex items-center justify-center text-cyan-300 text-xs font-mono">
              [EDGE CONTOURS EXTRACTED]
            </div>
          )}
          {filterMode === 'radar' && (
            <div className="w-32 h-32 rounded-full border-2 border-rose-500 flex items-center justify-center relative">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              <div className="absolute inset-0 border border-rose-400/40 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Filter Switcher Bar */}
        <div className="flex items-center justify-center gap-2">
          {(['boxes', 'edges', 'radar'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => {
                setFilterMode(mode)
                handleToggleCheck(mode === 'boxes' ? 't1' : 't2')
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                filterMode === mode
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      {/* Lab Tasks Checklist */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2.5">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Lab Missions Checklist
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-2 bg-slate-50 rounded-xl">
            <span className={labTicks['t1'] ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {labTicks['t1'] ? '✓' : '○'}
            </span>
            <span>Test Object Bounding Box detection filter</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-2 bg-slate-50 rounded-xl">
            <span className={labTicks['t2'] ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {labTicks['t2'] ? '✓' : '○'}
            </span>
            <span>Switch to Edge/Radar sensor feeds to confirm obstacle clearance</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinish}
        disabled={!allDone && !isCompleted}
        className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md duolingo-btn-3d ${
          allDone || isCompleted
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        <span>Complete Lab &amp; Continue ➔</span>
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. SECTION 7: DUOLINGO CAPSTONE MISSION (Applied Scenario Decisions)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoCapstoneMission({
  section,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [missionStep, setMissionStep] = useState(0)
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)

  const scenarios = [
    {
      scenario: 'Mission 1: The smart camera sees heavy rain and low light. How should it ensure safety?',
      options: [
        'Activate auxiliary radar sensors and reduce vehicle speed',
        'Turn off all sensors and drive faster',
      ],
      correctIdx: 0,
      tip: 'Multi-sensor fusion (radar + lidar) provides safety even when optical vision is impaired by weather.',
    },
    {
      scenario: 'Mission 2: Privacy Check: A smart home device records voice notes. How should user data be handled?',
      options: [
        'Encrypt data securely and ask for clear permission',
        'Broadcast private recordings to random websites',
      ],
      correctIdx: 0,
      tip: 'Responsible AI always protects user data with encryption and transparent permissions.',
    },
  ]

  const sc = scenarios[missionStep] || scenarios[0]

  const handlePick = (idx: number) => {
    if (idx === sc.correctIdx) {
      setFeedbackStatus('correct')
    } else {
      setFeedbackStatus('wrong')
    }
  }

  const handleContinue = () => {
    setFeedbackStatus(null)
    if (missionStep < scenarios.length - 1) {
      setMissionStep(s => s + 1)
    } else {
      gamification.launchConfetti()
      gamification.addXP(25, undefined, `mission-${section.id}`)
      toast.success('Capstone Mission Accomplished! +25 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Shield size={11} /> Section 7 · Capstone Mission
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Completed
            </span>
          )}
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          Field Commander Decision
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Scenario {missionStep + 1} of {scenarios.length}
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'assignment'}
        position="header"
      />

      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-black text-slate-900 leading-snug">
          {sc.scenario}
        </h3>

        <div className="space-y-2 pt-2">
          {sc.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className="w-full text-left p-3.5 rounded-2xl border-2 border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50 text-xs font-bold text-slate-800 transition-all duolingo-card-3d"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation={sc.tip}
        onContinue={handleContinue}
        onRetry={() => setFeedbackStatus(null)}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. SECTION 8: DUOLINGO MASTERY QUIZ (Comprehensive Assessment & Celebration)
// ─────────────────────────────────────────────────────────────────────────────

export function DuolingoMasteryQuiz({
  section,
  chapterTitle,
  gradeKey,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterTitle: string
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [qIdx, setQIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)

  const quizList = useMemo(() => {
    if (section.quizQuestions && section.quizQuestions.length > 0) {
      return section.quizQuestions.map(q => ({
        question: q.question,
        options: q.options.map(o => o.text),
        correctIdx: q.options.findIndex(o => o.isCorrect) >= 0 ? q.options.findIndex(o => o.isCorrect) : 0,
        explanation: q.explanation || 'Great job understanding this core concept!',
      }))
    }
    return [
      {
        question: `What is the primary way computers learn to recognize patterns?`,
        options: [
          `By analyzing multiple real-world examples and updating weights`,
          `By randomly guessing without any data`,
          `By remaining powered off`,
        ],
        correctIdx: 0,
        explanation: 'Machine learning looks at clean examples to find reliable patterns.',
      },
      {
        question: `Why is safety and privacy vital in modern smart applications?`,
        options: [
          `To protect user trust, avoid bias, and ensure reliable decisions`,
          `It is not important at all`,
          `To make apps slower on purpose`,
        ],
        correctIdx: 0,
        explanation: 'Responsible AI prioritizes user safety, privacy, and fairness.',
      },
      {
        question: `How does multi-sensor fusion help an autonomous robot?`,
        options: [
          `It combines data from cameras, radar, and lidar for reliable perception`,
          `It removes the need for computer processing`,
          `It only works on sunny days`,
        ],
        correctIdx: 0,
        explanation: 'Combining sensors gives redundant, 360-degree awareness.',
      },
    ]
  }, [section.quizQuestions])

  const curQ = quizList[qIdx] || quizList[0]

  const handlePick = (optIdx: number) => {
    setSelectedOpt(optIdx)
    if (optIdx === curQ.correctIdx) {
      setScore(s => s + 1)
      setFeedbackStatus('correct')
    } else {
      setFeedbackStatus('wrong')
    }
  }

  const handleContinue = () => {
    setSelectedOpt(null)
    setFeedbackStatus(null)

    if (qIdx < quizList.length - 1) {
      setQIdx(i => i + 1)
    } else {
      gamification.launchConfetti()
      gamification.addXP(40, undefined, `quiz-${section.id}`)
      toast.success('Chapter Mastery Quiz Completed! +40 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-20 animate-duolingo-pop">
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Award size={11} /> Section 8 · {chapterTitle || 'Mastery Assessment'}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {isCompleted ? `✓ Done (${score}/${quizList.length})` : `Question ${qIdx + 1} of ${quizList.length}`}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          {curQ.question}
        </h2>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'quiz'}
        position="header"
      />

      <div className="space-y-2.5">
        {curQ.options.map((opt, idx) => {
          const isSelected = selectedOpt === idx
          return (
            <button
              key={idx}
              onClick={() => handlePick(idx)}
              className={`w-full text-left p-4 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-3 duolingo-card-3d ${
                isSelected
                  ? idx === curQ.correctIdx
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black'
                    : 'border-rose-400 bg-rose-50 text-rose-950 animate-duolingo-shake'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
              }`}
            >
              <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                isSelected
                  ? idx === curQ.correctIdx ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          )
        })}
      </div>

      <DuolingoBottomFeedback
        status={feedbackStatus}
        explanation={curQ.explanation}
        onContinue={handleContinue}
        onRetry={() => {
          setSelectedOpt(null)
          setFeedbackStatus(null)
        }}
      />
    </div>
  )
}
