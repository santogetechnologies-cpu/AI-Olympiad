import { useState } from 'react'
import {
  Code, Play, RotateCcw,
  CheckCircle, Check, Lightbulb
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface Class7PythonOdysseyProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: 1 | 2
  hookQuestion?: string
  onComplete?: () => void
}

export function Class7PythonOdysseyExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete,
}: Class7PythonOdysseyProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Lesson 1: Step Navigator & Data Inspector
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})

  // Lesson 2: Python Rover Automation Mission State
  const [roverPos, setRoverPos] = useState({ x: 0, y: 0 })
  const [roverCommands, setRoverCommands] = useState<string[]>([])
  const [roverRunning, setRoverRunning] = useState(false)
  const [roverSuccess, setRoverSuccess] = useState(false)
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleAddRoverCommand = (cmd: string) => {
    if (roverCommands.length >= 6) {
      toast.error('Command queue full (max 6 commands)!')
      return
    }
    setRoverCommands(prev => [...prev, cmd])
  }

  const handleClearRover = () => {
    setRoverCommands([])
    setRoverPos({ x: 0, y: 0 })
    setRoverRunning(false)
    setRoverSuccess(false)
  }

  const handleRunRoverMission = async () => {
    if (roverCommands.length === 0) {
      // Auto-load default program if empty
      setRoverCommands(['forward', 'forward', 'down', 'down', 'collect'])
      toast('Loaded standard Rover automation sequence!', { icon: '🤖' })
    }
    setRoverRunning(true)
    setRoverPos({ x: 0, y: 0 })
    setRoverSuccess(false)

    let curX = 0
    let curY = 0
    const queue = roverCommands.length > 0 ? roverCommands : ['forward', 'forward', 'down', 'down', 'collect']

    for (const cmd of queue) {
      await new Promise(r => setTimeout(r, 500))
      if (cmd === 'forward') curX = Math.min(2, curX + 1)
      if (cmd === 'down') curY = Math.min(2, curY + 1)
      if (cmd === 'up') curY = Math.max(0, curY - 1)
      if (cmd === 'left') curX = Math.max(0, curX - 1)
      setRoverPos({ x: curX, y: curY })
    }

    setRoverRunning(false)
    if (curX === 2 && curY === 2) {
      setRoverSuccess(true)
      gamification.addXP(30, undefined, `cls7-rover-${cNum}`)
      toast.success('🐍 Rover Mission Successful! Sensor data analyzed! +30 XP', { icon: '🚀' })
      if (onComplete) onComplete()
    } else {
      toast('Rover finished path! Navigate to Crystal at (2,2) to complete mission.', { icon: '📍' })
    }
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gamification.addXP(20, undefined, `cls7-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Correct Python understanding! +20 XP', { icon: '🎉' })
    } else {
      toast.error('Review the logic and try again!')
    }
  }

  const handleMatchPair = (id: string) => {
    setMatchedPairs(prev => {
      const next = { ...prev, [id]: true }
      if (Object.keys(next).length === profile.pairs.length) {
        gamification.addXP(25, undefined, `cls7-pairs-${cNum}-${lessonNumber}`)
        toast.success('🧩 All Python concepts matched! +25 XP', { icon: '🏆' })
      }
      return next
    })
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Grade Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-violet-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-violet-500/20 text-violet-300 border border-violet-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Code size={14} className="text-violet-400" /> Class 7: Python Odyssey &amp; Code Rover Lab
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-400/30">
              {lessonNumber === 1 ? '📊 Mode: Data Logic Explorer' : '🐍 Mode: Interactive Python Sandbox'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-violet-300 bg-black/40 px-3 py-1 rounded-xl border border-violet-500/40">
            Python 3.11 • Chapter {cNum}
          </span>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-violet-100/90 mt-1 font-medium">
            {profile.goal}
          </p>
        </div>

        {/* Thought Hook */}
        <div className="mt-4 p-3.5 bg-violet-900/40 border border-violet-400/30 rounded-2xl flex items-start gap-3 relative z-10">
          <Lightbulb size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-violet-100 font-medium">
            <strong className="text-amber-300 font-bold">Thought Question: </strong>
            {profile.hook}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: DATA LOGIC & STEP EXPLORER                                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Everyday Analogy */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider mb-2">
              <span>💡 Real Life Analogy</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {profile.analogy}
            </p>
          </div>

          {/* 3 Step Concept Progression */}
          <div className="bg-white rounded-3xl border-2 border-violet-100 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>🐍 Step-by-Step Concept Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Learn how {topicTitle} works in 3 easy steps.
                </p>
              </div>
              <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-xl">
                Step {activeStepIdx + 1} of 3
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    activeStepIdx === idx
                      ? 'border-violet-500 bg-violet-50/70 shadow-sm scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-100/80 px-2 py-0.5 rounded-md">
                      Part {idx + 1}
                    </span>
                    {activeStepIdx === idx && <Check size={14} className="text-violet-600 font-bold" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{st.desc}</p>
                </button>
              ))}
            </div>

            {/* Step Detail Card */}
            <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-violet-300 font-bold">
                <span>Active Part: {steps[activeStepIdx].title}</span>
                <span className="text-slate-400 font-normal text-[11px]">Beginner-Friendly Explanation</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {steps[activeStepIdx].detail}
              </p>
              {steps[activeStepIdx].code && (
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-[11px] font-mono text-emerald-400">
                  <code>{steps[activeStepIdx].code}</code>
                </div>
              )}
            </div>
          </div>

          {/* Key Term Matcher */}
          {profile.pairs && profile.pairs.length > 0 && (
            <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>🧩 Match the Python Concepts</span>
                  </h3>
                  <p className="text-xs text-slate-500">Tap to lock in each term!</p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                  {Object.keys(matchedPairs).length} / {profile.pairs.length} Mastered
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.pairs.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleMatchPair(p.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      matchedPairs[p.id]
                        ? 'border-emerald-400 bg-emerald-50/70 text-emerald-950'
                        : 'border-slate-200 bg-slate-50 hover:border-violet-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-violet-900">{p.term}</span>
                      {matchedPairs[p.id] && <Check size={14} className="text-emerald-600 font-bold" />}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{p.definition}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2: PYTHON SANDBOX & PRACTICE CHALLENGE                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Real World Scenario */}
          <div className="bg-white rounded-3xl border-2 border-violet-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🌍 Real-World Application Scenario</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {profile.realScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.useCases.map((uc, i) => (
                <div key={i} className="p-3 bg-violet-50/70 border border-violet-200/70 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-violet-700 tracking-wider">Use Case #{i + 1}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{uc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Interactive Python Rover Automation Mission ── */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-violet-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <h4 className="font-bold text-sm text-violet-300">Python Automation Rover Mission</h4>
                  <p className="text-[11px] text-slate-400">Guide the rover to the Energy Crystal at target (2, 2)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleRunRoverMission}
                  disabled={roverRunning}
                  variant="primary"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Play size={13} className={roverRunning ? 'animate-spin' : ''} />
                  <span>{roverRunning ? 'Executing Code...' : 'Run Rover Script ▶'}</span>
                </Button>
                <button
                  onClick={handleClearRover}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer"
                  title="Reset Rover"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Rover 3x3 Terrain Grid */}
            <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto p-3 bg-slate-900 rounded-2xl border border-slate-800">
              {[
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }
              ].map((cell, idx) => {
                const isRoverHere = roverPos.x === cell.x && roverPos.y === cell.y
                const isCrystalHere = cell.x === 2 && cell.y === 2
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 border-2 transition-all transform duration-300 ${
                      isRoverHere
                        ? 'bg-violet-600/30 border-violet-400 text-white scale-105 shadow-md ring-2 ring-violet-400'
                        : isCrystalHere
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    {isRoverHere ? (
                      <span className="text-2xl animate-bounce">🤖</span>
                    ) : isCrystalHere ? (
                      <span className="text-2xl">💎</span>
                    ) : (
                      <span className="text-[10px] font-mono opacity-40">({cell.x},{cell.y})</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Quick Command Chips */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Script Command Queue ({roverCommands.length}/6):</span>
                <span className="font-mono text-violet-300 text-[11px]">rover.py</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'rover.forward()', cmd: 'forward' },
                  { label: 'rover.down()', cmd: 'down' },
                  { label: 'rover.up()', cmd: 'up' },
                  { label: 'rover.left()', cmd: 'left' },
                ].map(c => (
                  <button
                    key={c.cmd}
                    onClick={() => handleAddRoverCommand(c.cmd)}
                    disabled={roverRunning}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-violet-300 border border-violet-500/40 rounded-xl text-xs font-mono font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    + {c.label}
                  </button>
                ))}
              </div>

              {roverCommands.length > 0 && (
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 flex flex-wrap gap-2 items-center">
                  <span className="text-slate-500">Queue:</span>
                  {roverCommands.map((c, i) => (
                    <span key={i} className="bg-slate-950 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                      {i + 1}. rover.{c}()
                    </span>
                  ))}
                </div>
              )}
            </div>

            {roverSuccess && (
              <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs text-emerald-300 font-bold animate-in fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  Target Acquired! Sensor data analyzed and crystal collected successfully!
                </span>
                <span className="text-amber-300 font-bold">+30 XP</span>
              </div>
            )}
          </div>

          {/* Interactive Practice Question */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full">
                  Skill Check Challenge
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mt-2">
                  {profile.practice.question || profile.practice.q}
                </h3>
              </div>
              <button
                onClick={() => setShowHint(h => !h)}
                className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all flex items-center gap-1"
              >
                <Lightbulb size={12} /> {showHint ? 'Hide Hint' : 'Need Hint?'}
              </button>
            </div>

            {showHint && profile.practice.hint && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl font-medium">
                💡 <strong>Hint:</strong> {profile.practice.hint}
              </div>
            )}

            <div className="space-y-2.5">
              {(profile.practice.options || profile.practice.opts || []).map((opt, idx) => {
                const isSelected = selectedPracticeOpt === idx
                const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPractice(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ${
                      practiceAnswered && isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : practiceAnswered && isCorrect
                        ? 'border-emerald-400 bg-emerald-50/60 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:border-violet-400 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {practiceAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                  </button>
                )
              })}
            </div>

            {practiceAnswered && (
              <div className="p-4 bg-violet-50 border border-violet-200 rounded-2xl text-xs text-violet-950 space-y-1">
                <span className="font-bold">Explanation:</span>
                <p>{profile.practice.explanation || profile.practice.exp}</p>
              </div>
            )}
          </div>

          {/* 3 Core Takeaways */}
          <div className="bg-gradient-to-r from-slate-900 to-violet-950 text-white p-6 rounded-3xl border border-violet-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-violet-300">
              📌 Key Takeaways for {topicTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {profile.takeaways.map((tk, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-violet-100 font-medium leading-relaxed">
                  ✓ {tk}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
