import { useState } from 'react'
import {
  Server, Cpu, CheckCircle, Zap, Check, Award, RotateCcw, Volume2, Sparkles, ChevronRight
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. HIGHER ED WORKBOOK: "⚡ Smart Systems Decision Ledger" (No long essays!)
// ─────────────────────────────────────────────────────────────────────────────
export function HigherWorkbookView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  // Interactive Game Choices
  const [selectedBottleneck, setSelectedBottleneck] = useState<number | null>(null)
  const [selectedSafety, setSelectedSafety] = useState<number | null>(null)
  const [activeWordChips, setActiveWordChips] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(isCompleted)

  const bottleneckChoices = [
    { text: 'Slow Disk Reads (Add Fast RAM Cache)', isBest: true, feedback: '✓ Exactly! Memory caching reduces latency by 90%.' },
    { text: 'Single Large Server (Cannot handle traffic spikes)', isBest: true, feedback: '✓ Correct! Splitting into micro-nodes prevents crashes.' },
    { text: 'Turn off all logging and monitoring', isBest: false, feedback: '✗ Risky! Without telemetry, engineers are blind to errors.' }
  ]

  const safetyChoices = [
    { text: 'Auto-Rate Limiter (Stops spam & bot storms)', isBest: true, feedback: '✓ Perfect defense against traffic surges!' },
    { text: 'Automatic Failover to backup region', isBest: true, feedback: '✓ Essential for 99.99% uptime!' },
    { text: 'Ignore server crashes and hope for the best', isBest: false, feedback: '✗ Unacceptable for production apps!' }
  ]

  const wordBank = ['Fast RAM Cache', 'Auto-Scaler', 'Zero-Lag', 'Failover']

  const handleToggleChip = (word: string) => {
    gameAudio.playTap()
    setActiveWordChips(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    )
  }

  const handleSubmit = () => {
    if (selectedBottleneck === null && selectedSafety === null) {
      toast.error('Make your architectural choices first!')
      return
    }
    gameAudio.playSuccess()
    setSubmitted(true)
    gamification.addXP(20, undefined, `higher-spec-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('⚡ Systems Architecture Log Verified! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-indigo-500/20 text-indigo-300 font-bold text-xs px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
            <Server size={14} className="text-cyan-400" />
            <span>Systems Architecture Ledger</span>
          </span>
          <span className="text-xs text-indigo-200 font-mono">Chapter #{chapterNum}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Systems Design Ledger`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Tap your architectural decisions to build a bulletproof cloud app. Zero reading walls!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Decision 1: Bottleneck Solver */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Zap size={15} className="text-amber-500" />
            <span>Mission 1: Eliminate The Speed Bottleneck</span>
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tap Best Fix</span>
        </div>

        <div className="space-y-2">
          {bottleneckChoices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setSelectedBottleneck(idx)
              }}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all min-h-[44px] flex items-center justify-between gap-2 ${
                selectedBottleneck === idx
                  ? choice.isBest
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span>{choice.text}</span>
              {selectedBottleneck === idx && (
                <span>{choice.isBest ? '✓' : '⚠️'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Decision 2: High Availability Safeguard */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Cpu size={15} className="text-indigo-600" />
            <span>Mission 2: High-Availability Safeguard</span>
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tap Best Rule</span>
        </div>

        <div className="space-y-2">
          {safetyChoices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setSelectedSafety(idx)
              }}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all min-h-[44px] flex items-center justify-between gap-2 ${
                selectedSafety === idx
                  ? choice.isBest
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span>{choice.text}</span>
              {selectedSafety === idx && (
                <span>{choice.isBest ? '✓' : '⚠️'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Word Chips Assembler */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Sparkles size={15} className="text-purple-600" />
          <span>Mission 3: Tap Key Components to Deploy</span>
        </h3>
        <p className="text-[11px] text-slate-500">Tap to equip essential high-speed modules:</p>

        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, idx) => {
            const isEquipped = activeWordChips.includes(word)
            return (
              <button
                key={idx}
                onClick={() => handleToggleChip(word)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isEquipped
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{isEquipped ? '✓' : '+'}</span>
                <span>{word}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
      >
        {submitted ? '✓ Systems Ledger Sealed! (+20 XP)' : '🚀 Seal Architecture Ledger (+20 XP)'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. HIGHER ED FLASHCARDS: "⚡ Speed Architecture Duel"
// ─────────────────────────────────────────────────────────────────────────────
export function HigherFlashcardsView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const cards = (section.flashcards && section.flashcards.length > 0)
    ? section.flashcards
    : [
        { q: 'How does an In-Memory Cache speed up AI apps?', a: '⚡ Stores hot responses in lightning-fast RAM so the AI doesn\'t recalculate every single time!' },
        { q: 'Why do large apps use multiple servers instead of one big PC?', a: '🛡️ If one machine crashes, the others instantly keep the game or app running without interruption!' },
        { q: 'What is P99 latency?', a: '⏱️ The response time experienced by the 99% fastest requests — ensuring almost nobody sees lag!' },
        { q: 'What happens during a spike in mobile traffic?', a: '🚀 Auto-scalers automatically spawn new server nodes in seconds to absorb the load!' }
      ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [masteredCount, setMasteredCount] = useState(isCompleted ? cards.length : 0)
  const [combo, setCombo] = useState(1)

  const currentCard = cards[currentIndex] || cards[0]

  const handleFlip = () => {
    gameAudio.playTap()
    setFlipped(!flipped)
  }

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      gameAudio.playCoin()
      setMasteredCount(m => Math.min(cards.length, m + 1))
      setCombo(c => c + 1)
      toast.success(`⚡ Mastered! ${combo}x Streak!`, { icon: '🔥' })
    } else {
      gameAudio.playTap()
      setCombo(1)
    }

    setFlipped(false)
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(c => c + 1)
    } else {
      gameAudio.playVictory()
      gamification.addXP(20, undefined, `higher-fc-${chapterNum}`)
      gamification.launchConfetti()
      toast.success('🎉 Speed Duel Finished! All concepts conquered! +20 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-amber-500/20 text-amber-300 font-bold text-xs px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" />
            <span>Speed Concept Flashcards</span>
          </span>
          <span className="text-xs font-bold text-amber-400">🔥 {combo}x Combo</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {topicTitle ? `${topicTitle} · ` : ''}Card {currentIndex + 1} of {cards.length}
        </h2>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'resource'}
        position="header"
      />

      {/* 3D Flip Card */}
      <div
        onClick={handleFlip}
        className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-white border-2 border-indigo-200 shadow-md flex flex-col justify-between items-center text-center transition-all hover:shadow-lg active:scale-98 select-none"
      >
        <span className="text-[10px] uppercase font-black tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          {flipped ? '💡 Click to see question' : '👆 Tap to Reveal Answer'}
        </span>

        <div className="my-auto py-4">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {flipped ? currentCard.a : currentCard.q}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            gameAudio.speak(flipped ? currentCard.a : currentCard.q)
          }}
          className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1"
        >
          <Volume2 size={14} /> Read Aloud
        </button>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleNext(false)}
          icon={<RotateCcw size={15} />}
          className="rounded-2xl min-h-[44px] font-bold"
        >
          Review Later
        </Button>
        <Button
          onClick={() => handleNext(true)}
          icon={<Check size={15} />}
          className="rounded-2xl min-h-[44px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Got It! (+XP)
        </Button>
      </div>

      <div className="text-center text-xs text-slate-500 font-bold">
        {masteredCount} of {cards.length} cards mastered
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HIGHER ED PRACTICAL LAB: "🧪 Server Scaler Simulation"
// ─────────────────────────────────────────────────────────────────────────────
export function HigherPracticalLabView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const [activeNodes, setActiveNodes] = useState(3)
  const [loadPct, setLoadPct] = useState(65)
  const [labTested, setLabTested] = useState(isCompleted)
  const [runningSim, setRunningSim] = useState(false)

  const p99Latency = Math.max(14, Math.round(120 / activeNodes + loadPct * 0.2))
  const isHealthy = p99Latency < 45

  const handleRunSim = async () => {
    gameAudio.playTap()
    setRunningSim(true)
    await new Promise(r => setTimeout(r, 600))
    setRunningSim(false)
    setLabTested(true)
    gameAudio.playSuccess()
    gamification.addXP(25, undefined, `higher-lab-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🧪 Production Simulation Passed with zero packet loss! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-cyan-500/20 text-cyan-300 font-bold text-xs px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
            <Cpu size={14} className="text-cyan-400" />
            <span>Interactive Simulator Lab</span>
          </span>
          <span className="text-xs font-mono text-cyan-300">Lab #6</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Server Scaler Lab`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Slide server nodes to keep user latency under 45ms under peak traffic!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      {/* Simulator Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Gauge indicators */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">P99 Latency</span>
            <span className="text-xl font-black text-indigo-950">{p99Latency}ms</span>
            <span className={`text-[10px] font-bold block ${isHealthy ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isHealthy ? '⚡ Lightning Fast' : '⚠️ Too Slow! Add nodes'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">Active Nodes</span>
            <span className="text-xl font-black text-slate-900">{activeNodes} Clusters</span>
            <span className="text-[10px] text-blue-600 font-bold block">Auto-Balanced</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Cluster Capacity:</span>
            <span className="font-mono text-cyan-400 font-bold">{activeNodes} Servers</span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={activeNodes}
            onChange={e => {
              setActiveNodes(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-bold text-slate-300">Simulated Player Traffic:</span>
            <span className="font-mono text-amber-400 font-bold">{loadPct * 1000} req/s</span>
          </div>
          <input
            type="range"
            min={20}
            max={95}
            value={loadPct}
            onChange={e => {
              setLoadPct(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Live Objectives */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Objective: Keep latency &lt; 45ms while traffic is high</span>
        </div>

        <Button
          onClick={handleRunSim}
          loading={runningSim}
          className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {labTested ? '✓ Lab Objectives Complete! (+25 XP)' : '🚀 Run Stress Test Simulation (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. HIGHER ED ASSIGNMENT: "🏆 Cloud Titan Challenge" (Zero essay typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function HigherAssignmentView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const [step1Pick, setStep1Pick] = useState<number | null>(null)
  const [step2Pick, setStep2Pick] = useState<number | null>(null)
  const [missionDone, setMissionDone] = useState(isCompleted)

  const choices1 = [
    { text: 'Deploy Multi-Region CDN & Edge Cache', stars: 3 },
    { text: 'Route all global users to a single PC', stars: 1 }
  ]

  const choices2 = [
    { text: 'Automated Circuit Breaker & Health Alarms', stars: 3 },
    { text: 'Wait for users to tweet about outages', stars: 1 }
  ]

  const handleFinishMission = () => {
    if (step1Pick === null || step2Pick === null) {
      toast.error('Choose both strategic deployment decisions!')
      return
    }
    gameAudio.playVictory()
    setMissionDone(true)
    gamification.addXP(25, undefined, `higher-assn-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏆 Capstone Mission Verified! 3-Star Rating! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Award size={14} />
          <span>Capstone Hero Mission</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Mission Dossier`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Make the two critical leadership decisions to launch this architecture to 10M users.
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'assignment'}
        position="header"
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Decision 1 */}
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-900 block">
            1. Global Delivery Strategy:
          </span>
          <div className="space-y-2">
            {choices1.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  gameAudio.playTap()
                  setStep1Pick(i)
                }}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[44px] ${
                  step1Pick === i
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{c.text}</span>
                <span>{c.stars === 3 ? '⭐⭐⭐' : '⭐'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Decision 2 */}
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-900 block">
            2. Reliability &amp; Outage Prevention:
          </span>
          <div className="space-y-2">
            {choices2.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  gameAudio.playTap()
                  setStep2Pick(i)
                }}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[44px] ${
                  step2Pick === i
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{c.text}</span>
                <span>{c.stars === 3 ? '⭐⭐⭐' : '⭐'}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleFinishMission}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {missionDone ? '✓ Mission Complete! 3-Stars Awarded' : '⭐ Complete Mission & Collect Badge (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HIGHER ED QUIZ: "🎯 Cloud Boss Battle"
// ─────────────────────────────────────────────────────────────────────────────
export function HigherMasteryQuizView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  chapterTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const questions = (section.quizQuestions && section.quizQuestions.length > 0)
    ? section.quizQuestions
    : (profile.quizzes && profile.quizzes.length > 0)
    ? profile.quizzes.map(q => ({
        question: q.question || q.q || '',
        options: (q.options || q.opts || []).map(o => ({ text: o.text, isCorrect: o.isCorrect })),
        explanation: q.explanation || q.exp || '',
      }))
    : [
        {
          question: 'What is the most effective way to eliminate server crashes under sudden traffic spikes?',
          options: [
            { text: 'Auto-scaling cluster with in-memory caching', isCorrect: true },
            { text: 'Manually restarting servers one by one', isCorrect: false },
            { text: 'Disconnecting half of all players', isCorrect: false },
          ],
          explanation: 'Auto-scaling automatically adds server capacity in seconds!'
        },
        {
          question: 'Why should AI systems log telemetry and health metrics?',
          options: [
            { text: 'To detect and fix latency anomalies before users notice', isCorrect: true },
            { text: 'Just to use extra hard drive space', isCorrect: false },
            { text: 'It has no real purpose in production', isCorrect: false },
          ],
          explanation: 'Real-time telemetry keeps engineers alert to potential issues!'
        }
      ]

  const [qIndex, setQIndex] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [bossHp, setBossHp] = useState(100)
  const [answered, setAnswered] = useState(false)
  const [isVictory, setIsVictory] = useState(false)

  const currentQ = questions[qIndex] || questions[0]
  const damagePerHit = Math.ceil(100 / questions.length)

  const handlePickOption = (idx: number) => {
    if (answered) return
    setSelectedOpt(idx)
    setAnswered(true)

    const isCorrect = currentQ.options[idx]?.isCorrect
    if (isCorrect) {
      gameAudio.playHit()
      const newHp = Math.max(0, bossHp - damagePerHit)
      setBossHp(newHp)
      toast.success(`💥 Direct Hit! Boss took -${damagePerHit} HP!`, { icon: '⚔️' })
    } else {
      gameAudio.playTap()
      toast.error('Miss! Study the explanation and strike next!')
    }
  }

  const handleNextQuestion = () => {
    gameAudio.playTap()
    setSelectedOpt(null)
    setAnswered(false)

    if (qIndex < questions.length - 1) {
      setQIndex(q => q + 1)
    } else {
      gameAudio.playVictory()
      setIsVictory(true)
      gamification.addXP(30, undefined, `higher-quiz-${chapterNum}`)
      gamification.launchConfetti()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* Boss HUD */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 p-5 rounded-3xl border-2 border-purple-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👾</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">Boss: The Cloud Golem</h3>
              <span className="text-[10px] text-purple-300 font-mono">Chapter {chapterNum} Boss Battle</span>
            </div>
          </div>
          <span className="text-xs font-mono font-black text-rose-400 bg-black/50 px-2.5 py-1 rounded-full border border-rose-500/30">
            {bossHp} / 100 HP
          </span>
        </div>

        {/* Health Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-500 ${
              bossHp > 50 ? 'bg-emerald-500' : bossHp > 20 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${bossHp}%` }}
          />
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'quiz'}
        position="header"
      />

      {isVictory ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 text-center space-y-4 shadow-md">
          <span className="text-5xl block animate-bounce">🏆</span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Boss Defeated! Chapter Conquered!
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            You proved mastery of {profile.title} with true cloud systems skill!
          </p>
          <Button
            onClick={onComplete}
            icon={<CheckCircle size={16} />}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl min-h-[46px]"
          >
            Claim Mastery Rewards &amp; Finish Chapter ✓
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Battle Question {qIndex + 1} of {questions.length}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            {currentQ.question}
          </p>

          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isPicked = selectedOpt === i
              const showResult = answered && isPicked

              return (
                <button
                  key={i}
                  onClick={() => handlePickOption(i)}
                  disabled={answered}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                    showResult
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-rose-100 border-rose-300 text-rose-950'
                      : isPicked
                      ? 'bg-purple-100 border-purple-400 text-purple-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  {showResult && (
                    <span>{opt.isCorrect ? '💥 HIT!' : '🛡️ BLOCKED'}</span>
                  )}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="space-y-3 pt-2">
              <p className="text-[11px] text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-100 font-medium">
                💡 {currentQ.explanation}
              </p>
              <Button
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl min-h-[44px]"
              >
                {qIndex < questions.length - 1 ? 'Next Strike ➔' : 'Finish Battle ➔'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
