import { useState, useId } from 'react'
import {
  Sparkles, CheckCircle2, ArrowRight,
  Lightbulb, Check
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'
import { gamification } from '../../utils/gamification'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'
import toast from 'react-hot-toast'

export interface InteractivePlayfulLessonProps {
  gradeKey: string
  chapterNum: string | number
  lessonNumber: 1 | 2
  topicTitle: string
  chapterTitle: string
  htmlContent?: string
  isCompleted?: boolean
  onComplete?: () => void
}

type GameArchetype =
  | 'mobile_feature_finder'
  | 'robot_commander'
  | 'pattern_matcher'
  | 'decision_simulator'
  | 'synapse_tuner'
  | 'cloud_balancer'

export function InteractivePlayfulLessonEngine({
  gradeKey,
  chapterNum,
  lessonNumber,
  topicTitle,
  chapterTitle,
  htmlContent,
  isCompleted = false,
  onComplete,
}: InteractivePlayfulLessonProps) {
  const profile = getCurriculumTopicProfile(topicTitle)

  // ───────────────────────────────────────────────────────────────────────────
  // DETECT THEMATIC ARCHETYPE BASED ON TOPIC
  // ───────────────────────────────────────────────────────────────────────────
  const getArchetype = (): GameArchetype => {
    const t = (topicTitle || '').toLowerCase()
    if (t.includes('mobile') || t.includes('phone') || t.includes('friend') || t.includes('voice') || t.includes('assistant') || t.includes('everyday')) {
      return 'mobile_feature_finder'
    }
    if (t.includes('command') || t.includes('instruction') || t.includes('robot') || t.includes('step') || t.includes('algorithm') || t.includes('flow') || t.includes('sort')) {
      return 'robot_commander'
    }
    if (t.includes('example') || t.includes('pattern') || t.includes('train') || t.includes('data') || t.includes('recogni') || t.includes('cluster') || t.includes('classif')) {
      return 'pattern_matcher'
    }
    if (t.includes('decision') || t.includes('tree') || t.includes('sensor') || t.includes('camera') || t.includes('city') || t.includes('vision') || t.includes('fairness') || t.includes('ethics')) {
      return 'decision_simulator'
    }
    if (t.includes('neural') || t.includes('brain') || t.includes('weight') || t.includes('deep') || t.includes('activation') || t.includes('transformer') || t.includes('attention')) {
      return 'synapse_tuner'
    }
    return 'cloud_balancer'
  }

  const archetype = getArchetype()

  // ───────────────────────────────────────────────────────────────────────────
  // 5-STAGE GAME STATE
  // 1: SEE (Interactive SVG) -> 2: TRY (Micro-Game) -> 3: DISCOVER (Aha!) -> 4: ANSWER (Scenario Challenge) -> 5: REWARD
  // ───────────────────────────────────────────────────────────────────────────
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4 | 5>(isCompleted ? 5 : 1)
  const [inspectedHotspot, setInspectedHotspot] = useState<string | null>(null)

  // Micro-game states
  // Archetype 1: Mobile Feature Finder
  const [testedFeatures, setTestedFeatures] = useState<Record<string, boolean>>({})

  // Archetype 2: Robot Commander
  const [robotStep, setRobotStep] = useState<number>(0)
  const [robotActionName, setRobotActionName] = useState<string>('Standing ready at starting line')
  const [robotCompleted, setRobotCompleted] = useState<boolean>(false)

  // Archetype 3: Pattern Matcher
  const [matchedItems, setMatchedItems] = useState<Record<string, string>>({})
  const [patternScore, setPatternScore] = useState<number>(0)

  // Archetype 4: Decision Simulator
  const [sensorDaytime, setSensorDaytime] = useState<boolean>(true)
  const [sensorMotion, setSensorMotion] = useState<boolean>(false)

  // Archetype 5: Synapse Tuner
  const [signalWeight, setSignalWeight] = useState<number>(0.3)

  // Archetype 6: Cloud Balancer
  const [serverCount, setServerCount] = useState<number>(1)

  // Challenge stage state
  const [selectedChallengeOpt, setSelectedChallengeOpt] = useState<number | null>(null)
  const [challengeSolved, setChallengeSolved] = useState<boolean>(isCompleted)

  // Real lesson completion handler
  const handleFinishLesson = () => {
    gameAudio.playVictory()
    gamification.launchConfetti()
    gamification.addXP(20, undefined, `lesson-${gradeKey}-${chapterNum}-${lessonNumber}`)
    toast.success('Lesson completed! +20 XP awarded.', { icon: '🎉' })
    if (onComplete) {
      onComplete()
    }
  }

  // Generate unique IDs for SVG gradients
  const uniqueId = useId().replace(/:/g, '')

  return (
    <div className="space-y-5 max-w-xl mx-auto w-full fade-in pb-4">

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. COMPACT ARCADE HEADER & STAGE INDICATOR                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Lesson {lessonNumber} • Interactive Game
          </span>
          <span className="text-xs font-mono font-bold text-amber-300">
            {chapterTitle ? `${chapterTitle}` : `Chapter ${chapterNum}`}
          </span>
        </div>

        <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
          {topicTitle}
        </h1>

        <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
          {profile.goal || `Discover how ${topicTitle} works by playing and testing it live.`}
        </p>

        {/* 5-Step Mini Progress Tracker */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1">
          {[
            { num: 1, label: 'See' },
            { num: 2, label: 'Play' },
            { num: 3, label: 'Discover' },
            { num: 4, label: 'Challenge' },
            { num: 5, label: 'Reward' },
          ].map(s => {
            const isDone = currentStage > s.num
            const isCurrent = currentStage === s.num
            return (
              <button
                key={s.num}
                onClick={() => {
                  gameAudio.playTap()
                  setCurrentStage(s.num as any)
                }}
                className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white font-black shadow-sm'
                    : isDone
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold'
                    : 'bg-slate-800/60 text-slate-400 font-medium'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  {isDone ? <Check size={11} className="stroke-[3]" /> : <span>{s.num}</span>}
                </div>
                <span className="text-[9px] uppercase tracking-wider">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. MAIN INTERACTIVE GAME ARENA (Based on Current Stage)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* STAGE 1: SEE & TAP TO DISCOVER SVG */}
      {currentStage === 1 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                Step 1: Look &amp; Discover
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Inspect the Diagram
              </h2>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg">
              Tap parts to inspect
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Look at this visual model of <strong>{topicTitle}</strong>. Tap on any highlighted part to discover what it does.
          </p>

          {/* Clean Vector SVG Illustration */}
          <div className="relative bg-gradient-to-b from-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[220px] overflow-hidden border border-slate-800">
            {/* Ambient Background Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${uniqueId}`} width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${uniqueId})`} />
            </svg>

            {/* Archetype SVG: Mobile Feature Finder */}
            {archetype === 'mobile_feature_finder' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Smartphone Body */}
                <rect x="75" y="10" width="130" height="180" rx="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                {/* Screen */}
                <rect x="85" y="24" width="110" height="152" rx="12" fill="#0f172a" />
                {/* Camera Eye Hotspot */}
                <circle
                  cx="140"
                  cy="45"
                  r="14"
                  className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Camera: Uses computer vision to recognize faces and adjust lighting!')
                  }}
                />
                <circle cx="140" cy="45" r="5" fill="#e0f2fe" className="animate-pulse" />
                {/* Voice Waveform Hotspot */}
                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Microphone: Listens to your voice and turns spoken sound into words!')
                  }}
                >
                  <rect x="98" y="80" width="84" height="32" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 110 96 L 115 90 L 120 102 L 125 88 L 130 104 L 135 96 L 145 96 L 150 90 L 155 102 L 160 96 L 170 96" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
                </g>
                {/* Battery / Chip Hotspot */}
                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Smart Chip: Automatically saves battery power when you are not using apps!')
                  }}
                >
                  <rect x="98" y="125" width="84" height="34" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                  <text x="140" y="146" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">AI Brain Chip</text>
                </g>
              </svg>
            )}

            {/* Archetype SVG: Robot Commander */}
            {archetype === 'robot_commander' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Grid Track */}
                <line x1="40" y1="150" x2="240" y2="150" stroke="#475569" strokeWidth="4" strokeDasharray="6 6" />
                {/* Goal Flag */}
                <path d="M 230 150 L 230 90 L 210 105 L 230 120" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <circle cx="230" cy="85" r="4" fill="#fbbf24" />
                {/* Robot Character */}
                <g className="cursor-pointer" onClick={() => {
                  gameAudio.playTap()
                  setInspectedHotspot('Robot Rover: Moves forward only when you give clear, ordered instructions!')
                }}>
                  <rect x="80" y="95" width="55" height="45" rx="10" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
                  {/* Eye Screen */}
                  <rect x="90" y="105" width="35" height="16" rx="4" fill="#1e293b" />
                  <circle cx="100" cy="113" r="3.5" fill="#38bdf8" className="animate-ping" />
                  <circle cx="115" cy="113" r="3.5" fill="#38bdf8" />
                  {/* Antenna */}
                  <line x1="107" y1="95" x2="107" y2="80" stroke="#93c5fd" strokeWidth="2" />
                  <circle cx="107" cy="78" r="4" fill="#60a5fa" />
                  {/* Wheels */}
                  <circle cx="92" cy="145" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  <circle cx="123" cy="145" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                </g>
              </svg>
            )}

            {/* Archetype SVG: Pattern Matcher */}
            {archetype === 'pattern_matcher' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Scanner Beam */}
                <rect x="130" y="30" width="20" height="140" fill="#38bdf8" opacity="0.15" />
                <line x1="140" y1="20" x2="140" y2="180" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                {/* Samples */}
                <g
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Sample A: The computer measures shapes to group similar things together!')
                  }}
                >
                  <circle cx="65" cy="100" r="28" fill="#10b981" stroke="#6ee7b7" strokeWidth="2" />
                  <text x="65" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Group 1</text>
                </g>
                <g
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Sample B: When a new item appears, AI checks which group it matches best!')
                  }}
                >
                  <rect x="185" y="72" width="56" height="56" rx="12" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" />
                  <text x="213" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Group 2</text>
                </g>
              </svg>
            )}

            {/* Archetype SVG: Decision Simulator */}
            {archetype === 'decision_simulator' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Logic Node */}
                <rect
                  x="40"
                  y="80"
                  width="70"
                  height="40"
                  rx="10"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Sensor Input: Detects real-world conditions like motion or light!')
                  }}
                />
                <text x="75" y="104" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Sensor</text>
                {/* Arrow */}
                <line x1="110" y1="100" x2="160" y2="100" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                {/* Decision Diamond */}
                <polygon
                  points="195,65 235,100 195,135 155,100"
                  fill="#7c3aed"
                  stroke="#c4b5fd"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => {
                    gameAudio.playTap()
                    setInspectedHotspot('Decision Rule: IF condition is true, THEN take action!')
                  }}
                />
                <text x="195" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Rule</text>
              </svg>
            )}

            {/* Archetype SVG: Synapse Tuner */}
            {archetype === 'synapse_tuner' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Input Neurons */}
                <circle cx="60" cy="60" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" className="cursor-pointer" onClick={() => {
                  gameAudio.playTap()
                  setInspectedHotspot('Input Node: Receives raw signals like sounds or picture pixels!')
                }} />
                <circle cx="60" cy="140" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" className="cursor-pointer" onClick={() => {
                  gameAudio.playTap()
                  setInspectedHotspot('Input Node 2: Feeds additional clues to the neural network!')
                }} />
                {/* Connecting Synapses */}
                <line x1="78" y1="60" x2="195" y2="100" stroke="#818cf8" strokeWidth={2 + signalWeight * 4} />
                <line x1="78" y1="140" x2="195" y2="100" stroke="#818cf8" strokeWidth={2 + signalWeight * 4} />
                {/* Output Neuron */}
                <circle cx="210" cy="100" r="22" fill={signalWeight >= 0.6 ? '#f59e0b' : '#334155'} stroke={signalWeight >= 0.6 ? '#fbbf24' : '#64748b'} strokeWidth="2.5" className="cursor-pointer" onClick={() => {
                  gameAudio.playTap()
                  setInspectedHotspot('Output Neuron: Fires electricity when combined input strength is strong enough!')
                }} />
                <text x="210" y="104" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {signalWeight >= 0.6 ? 'FIRED' : 'QUIET'}
                </text>
              </svg>
            )}

            {/* Archetype SVG: Cloud Balancer */}
            {archetype === 'cloud_balancer' && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto drop-shadow-xl">
                {/* Load Balancer */}
                <rect x="50" y="75" width="60" height="50" rx="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" className="cursor-pointer" onClick={() => {
                  gameAudio.playTap()
                  setInspectedHotspot('Load Balancer: Distributes user traffic evenly so no machine crashes!')
                }} />
                <text x="80" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Router</text>
                {/* Servers */}
                <rect x="170" y="40" width="70" height="32" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <text x="205" y="60" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">Server 1 (Active)</text>
                <rect x="170" y="85" width="70" height="32" rx="6" fill={serverCount >= 2 ? '#065f46' : '#1e293b'} stroke={serverCount >= 2 ? '#34d399' : '#475569'} strokeWidth="1.5" />
                <text x="205" y="105" textAnchor="middle" fill={serverCount >= 2 ? '#a7f3d0' : '#94a3b8'} fontSize="9" fontWeight="bold">Server 2</text>
                <rect x="170" y="130" width="70" height="32" rx="6" fill={serverCount >= 3 ? '#065f46' : '#1e293b'} stroke={serverCount >= 3 ? '#34d399' : '#475569'} strokeWidth="1.5" />
                <text x="205" y="150" textAnchor="middle" fill={serverCount >= 3 ? '#a7f3d0' : '#94a3b8'} fontSize="9" fontWeight="bold">Server 3</text>
              </svg>
            )}
          </div>

          {/* Hotspot Inspection Feedback */}
          {inspectedHotspot ? (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5 animate-in fade-in">
              <Sparkles size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-950 font-semibold">{inspectedHotspot}</p>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[11px] text-slate-500 font-medium">💡 Tap any part above to reveal what it does.</span>
            </div>
          )}

          <button
            onClick={() => {
              gameAudio.playSuccess()
              setCurrentStage(2)
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Ready! Let&apos;s Play the Mini-Game</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* STAGE 2: TRY & PLAY (Micro-Game) */}
      {currentStage === 2 && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                Step 2: Try &amp; Play
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Hands-On Challenge
              </h2>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-lg">
              Live Interaction
            </span>
          </div>

          {/* Micro-Game 1: Mobile Feature Finder */}
          {archetype === 'mobile_feature_finder' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Which of these mobile features uses <strong>AI</strong>? Tap each one to test!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'f1', name: 'Face Unlock', isAi: true, reason: 'AI recognizes your facial features in milliseconds!' },
                  { id: 'f2', name: 'Volume Buttons', isAi: false, reason: 'A mechanical switch! It just connects physical wires.' },
                  { id: 'f3', name: 'Voice Assistant', isAi: true, reason: 'AI turns speech into text and answers questions!' },
                  { id: 'f4', name: 'Screen Glass', isAi: false, reason: 'Protective glass! It protects the screen from scratches.' },
                ].map(feat => {
                  const tested = testedFeatures[feat.id] !== undefined
                  const isCorrect = testedFeatures[feat.id]

                  return (
                    <button
                      key={feat.id}
                      onClick={() => {
                        if (feat.isAi) {
                          gameAudio.playCoin()
                          setTestedFeatures(prev => ({ ...prev, [feat.id]: true }))
                          toast.success(`Correct! ${feat.reason}`)
                        } else {
                          gameAudio.playHit()
                          setTestedFeatures(prev => ({ ...prev, [feat.id]: false }))
                          toast.error(`Not AI! ${feat.reason}`)
                        }
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        tested
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-slate-300 bg-slate-50 text-slate-500 line-through'
                          : 'border-slate-200 bg-white hover:border-indigo-400 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{feat.name}</span>
                        {tested && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isCorrect ? 'Uses AI' : 'Normal Part'}
                          </span>
                        )}
                      </div>
                      {tested && (
                        <p className="text-[11px] text-slate-600 mt-1 font-normal leading-tight">
                          {feat.reason}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Micro-Game 2: Robot Commander */}
          {archetype === 'robot_commander' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Choose an instruction to guide the rover to the goal flag!
              </p>
              <div className="p-3 bg-slate-900 rounded-2xl text-cyan-300 font-mono text-xs flex items-center justify-between">
                <span>Status: {robotActionName}</span>
                <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {robotCompleted ? 'Done! 3/3' : `Step ${robotStep}/3`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Step Forward', action: 'Moving forward along the line!', step: 1 },
                  { label: 'Scan Sensor', action: 'Sensor scanned: Path is clear!', step: 2 },
                  { label: 'Reach Flag', action: 'Goal reached safely! Mission complete!', step: 3 },
                ].map(cmd => (
                  <button
                    key={cmd.step}
                    onClick={() => {
                      gameAudio.playTap()
                      setRobotStep(cmd.step)
                      setRobotActionName(cmd.action)
                      if (cmd.step === 3) {
                        gameAudio.playVictory()
                        setRobotCompleted(true)
                        toast.success('Mission reached! Great instructions!')
                      }
                    }}
                    className={`p-3 rounded-2xl border-2 text-center text-xs font-bold transition-all ${
                      robotStep >= cmd.step
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-indigo-400 text-slate-700'
                    }`}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Micro-Game 3: Pattern Matcher */}
          {archetype === 'pattern_matcher' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Match each item to help the computer find the pattern!
                </p>
                {patternScore > 0 && (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {patternScore} Found
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {[
                  { id: 'm1', item: 'Cat Whiskers & Meow', category: 'Cat' },
                  { id: 'm2', item: 'Barking & Wagging Tail', category: 'Dog' },
                  { id: 'm3', item: 'Swimming with Fins', category: 'Fish' },
                ].map(item => {
                  const chosen = matchedItems[item.id]
                  return (
                    <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">{item.item}</span>
                      <button
                        onClick={() => {
                          gameAudio.playCoin()
                          setMatchedItems(prev => ({ ...prev, [item.id]: item.category }))
                          setPatternScore(s => s + 1)
                          toast.success(`Matched to ${item.category}!`)
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          chosen
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {chosen || 'Tap to Group'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Micro-Game 4: Decision Simulator */}
          {archetype === 'decision_simulator' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Toggle sensors to see how the smart system makes an automatic decision:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    gameAudio.playTap()
                    setSensorDaytime(!sensorDaytime)
                  }}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                    sensorDaytime
                      ? 'border-amber-400 bg-amber-50 text-amber-950'
                      : 'border-slate-800 bg-slate-900 text-slate-100'
                  }`}
                >
                  Lighting: {sensorDaytime ? 'Bright Daylight' : 'Dark Night'}
                </button>
                <button
                  onClick={() => {
                    gameAudio.playTap()
                    setSensorMotion(!sensorMotion)
                  }}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                    sensorMotion
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  Motion: {sensorMotion ? 'Motion Detected' : 'No Movement'}
                </button>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-2xl text-xs text-white flex items-center justify-between">
                <span className="text-slate-300 font-medium">System Output:</span>
                <span className="font-bold text-cyan-300">
                  {!sensorDaytime && sensorMotion ? 'TURN ON FLOODLIGHTS' : 'STANDBY MODE (Energy Saving)'}
                </span>
              </div>
            </div>
          )}

          {/* Micro-Game 5: Synapse Tuner */}
          {archetype === 'synapse_tuner' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Drag the connection slider until the neuron receives enough signal to fire!
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Connection Strength: {Math.round(signalWeight * 100)}%</span>
                  <span className={signalWeight >= 0.6 ? 'text-emerald-600' : 'text-slate-400'}>
                    Threshold: 60%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={signalWeight}
                  onChange={e => {
                    const val = parseFloat(e.target.value)
                    setSignalWeight(val)
                    if (val >= 0.6) {
                      gameAudio.playCoin()
                    }
                  }}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {signalWeight >= 0.6
                  ? 'Strong signal reached! The output neuron fires electricity!'
                  : 'Signal too weak. Slide higher to activate.'}
              </p>
            </div>
          )}

          {/* Micro-Game 6: Cloud Balancer */}
          {archetype === 'cloud_balancer' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Simulate a mobile rush! Tap to add servers so users don&apos;t experience lag.
              </p>
              <div className="p-3.5 bg-slate-900 rounded-2xl text-white flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Active Servers</span>
                  <span className="font-bold text-cyan-300 text-sm">{serverCount} Machines</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">User Wait Time</span>
                  <span className={`font-bold text-sm ${serverCount >= 2 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {serverCount === 1 ? '420 ms (Laggy)' : serverCount === 2 ? '45 ms (Fast)' : '12 ms (Instant)'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    gameAudio.playCoin()
                    setServerCount(c => Math.min(3, c + 1))
                    toast.success('Spawned new server node!')
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  + Add Server Node
                </button>
                <button
                  onClick={() => {
                    gameAudio.playTap()
                    setServerCount(1)
                  }}
                  className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Advance to Stage 3 */}
          <button
            onClick={() => {
              gameAudio.playSuccess()
              setCurrentStage(3)
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>I Discovered It! See Why It Works</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* STAGE 3: DISCOVER & WHY IT WORKS (Aha! Moment) */}
      {currentStage === 3 && (
        <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                Step 3: Discover
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Real-Life Analogy
              </h2>
            </div>
            <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg">
              Simple Concept
            </span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
              <Lightbulb size={16} className="text-amber-600 flex-shrink-0" />
              <span>How to think about it:</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {profile.analogy || `Think of ${topicTitle} like a helpful assistant that practices many times so it never gets tired or forgets!`}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              3 Quick Rules to Remember:
            </h3>
            <ul className="space-y-1.5">
              {(profile.learnPoints || [
                `Rule 1: Computers follow clear instructions step-by-step.`,
                `Rule 2: Better examples give the machine better accuracy.`,
                `Rule 3: Smart technology is built to help humans solve everyday problems.`,
              ]).map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              gameAudio.playSuccess()
              setCurrentStage(4)
            }}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Take Quick Mini-Challenge</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* STAGE 4: QUICK MINI-CHALLENGE */}
      {currentStage === 4 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                Step 4: Mini-Challenge
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Prove Your Discovery
              </h2>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
              1 Quick Question
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            {profile.practice?.q || `What is the primary benefit of ${topicTitle}?`}
          </p>

          <div className="space-y-2">
            {(profile.practice?.opts || [
              `It helps machines solve problems and assist people accurately`,
              `It only works when computers are turned off`,
              `It replaces the need for electricity`,
            ]).map((opt, idx) => {
              const isSelected = selectedChallengeOpt === idx
              const correctIdx = profile.practice?.correct ?? 0
              const isCorrect = isSelected && idx === correctIdx
              const isWrong = isSelected && idx !== correctIdx

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedChallengeOpt(idx)
                    if (idx === correctIdx) {
                      gameAudio.playSuccess()
                      setChallengeSolved(true)
                      toast.success('Spot on! You cracked the challenge!')
                    } else {
                      gameAudio.playHit()
                      toast.error('Not quite! Try another option.')
                    }
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                    isCorrect
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : isWrong
                      ? 'border-rose-400 bg-rose-50 text-rose-950'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs flex-1">{opt}</span>
                </button>
              )
            })}
          </div>

          {challengeSolved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-medium">
              💡 {profile.practice?.exp || 'Great job! Understanding the core principle is the key.'}
            </div>
          )}

          <button
            onClick={() => {
              if (!challengeSolved) {
                toast('Please tap the correct option to finish!')
                return
              }
              gameAudio.playVictory()
              setCurrentStage(5)
            }}
            disabled={!challengeSolved}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Claim Your Mission Reward</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* STAGE 5: REWARD & LESSON COMPLETION */}
      {currentStage === 5 && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl border-2 border-indigo-400/40 p-6 sm:p-8 text-center text-white shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-300/40 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles size={36} className="text-amber-300 animate-bounce" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Lesson {lessonNumber} Mastered
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              🎉 Mission Complete!
            </h2>
            <p className="text-xs text-indigo-100/90 mt-1 max-w-sm mx-auto">
              You played, discovered, and proved your knowledge of <strong>{topicTitle}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto py-2">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] text-slate-300 block uppercase font-bold">Reward</span>
              <span className="text-sm font-black text-amber-400 mt-0.5 block">+20 XP</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] text-slate-300 block uppercase font-bold">Status</span>
              <span className="text-sm font-black text-emerald-400 mt-0.5 block">Verified ✓</span>
            </div>
          </div>

          <button
            onClick={handleFinishLesson}
            className="w-full max-w-sm mx-auto py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Complete Lesson &amp; Continue 🚀</span>
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. OPTIONAL TEACHER INTEL (From Content Manager if authored)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {htmlContent && htmlContent.trim().length > 30 && !htmlContent.includes('content-image-placeholder') && (
        <details className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs group">
          <summary className="cursor-pointer text-xs font-bold text-slate-700 flex items-center justify-between select-none">
            <span className="flex items-center gap-1.5 text-indigo-600">
              <Lightbulb size={14} /> Teacher&apos;s Extra Notes &amp; Curriculum Detail
            </span>
            <span className="text-[10px] text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="pt-3 border-t border-slate-100 mt-2 prose prose-slate max-w-none text-xs leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </details>
      )}
    </div>
  )
}
