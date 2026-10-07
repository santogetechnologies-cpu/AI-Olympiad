import { useState } from 'react'
import {
  Terminal, CheckCircle, Zap, Code,
  Bug, ArrowRight, Layers
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

export interface Class6To8AlgorithmProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  onComplete?: () => void
}

export function Class6To8AlgorithmChallengeExperience({
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  hookQuestion,
  onComplete,
}: Class6To8AlgorithmProps) {
  // Experiment 1: Sensor & Condition Slider
  const [sensorReading, setSensorReading] = useState(72)
  const [thresholdVal, setThresholdVal] = useState(50)
  const [activeTab, setActiveTab] = useState<'experiment' | 'bughunter' | 'flowchart'>('experiment')

  // Experiment 2: Bug Hunter Challenge
  const [bugSelection, setBugSelection] = useState<number | null>(null)
  const [bugSolved, setBugSolved] = useState(false)

  // Experiment 3: Flowchart Sequence
  const [flowSteps, setFlowSteps] = useState<number[]>([])
  const [flowSolved, setFlowSolved] = useState(false)

  const isConditionMet = sensorReading > thresholdVal

  // Bug hunter problem
  const bugChallenge = {
    title: '🐛 Bug Hunter: Fix the Autonomous Drone Altitude Controller',
    code: [
      '1 | def adjust_drone_altitude(current_alt, target_alt):',
      '2 |     if current_alt < target_alt: # Altitude is too low',
      '3 |         thruster_power = -50     # [BUG HERE] Thruster should push UP, not decrease!',
      '4 |     else:',
      '5 |         thruster_power = 0',
      '6 |     return thruster_power'
    ],
    question: 'Why did the drone crash into the ground during simulation testing?',
    options: [
      { id: 0, text: 'Line 3 decreased power (-50) when altitude was already too low! It needed positive power (+50) to climb. 🎯', correct: true },
      { id: 1, text: 'Line 1 missing import math library', correct: false },
      { id: 2, text: 'Line 5 should shut down batteries completely', correct: false }
    ]
  }

  const flowchartItems = [
    { id: 1, text: '1. Ingest Distance Sensor (cm)', icon: '📡' },
    { id: 2, text: '2. Check if obstacle < 30cm', icon: '❓' },
    { id: 3, text: '3. Turn Steering Motor 45° Left', icon: '🛞' },
    { id: 4, text: '4. Resume Forward Speed', icon: '⏩' }
  ]

  const handleFlowTap = (id: number) => {
    if (flowSteps.includes(id)) return
    const updated = [...flowSteps, id]
    setFlowSteps(updated)

    const isCorrectSoFar = updated.every((num, idx) => num === idx + 1)
    if (!isCorrectSoFar) {
      toast.error('Incorrect order! Sequence should flow: 1 ➡️ 2 ➡️ 3 ➡️ 4')
      setFlowSteps([])
      return
    }

    if (updated.length === 4) {
      setFlowSolved(true)
      gamification.addXP(15, undefined, 'c68-flowchart')
      gamification.launchConfetti()
      toast.success('🎉 Perfect Algorithmic Flowchart! +15 XP')
    }
  }

  const handleBugAnswer = (optId: number, isCorrect: boolean) => {
    setBugSelection(optId)
    if (isCorrect) {
      setBugSolved(true)
      gamification.addXP(20, undefined, 'c68-bughunter')
      gamification.launchConfetti()
      toast.success('🎉 Bug Squashed! Drone saved! +20 XP')
    } else {
      toast.error('Not the root bug. Check the thruster logic on line 3!')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto touch-manipulation pb-6">
      
      {/* ── 1. HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Terminal size={14} className="text-cyan-400" /> Class 6–8 Algorithm & Logic Lab
          </span>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            Interactive Experiments
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {topicTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {hookQuestion || 'Investigate boolean decision logic, threshold experiments, and debug live algorithmic execution paths.'}
        </p>
      </div>

      {/* ── 2. INTERACTIVE MODE TABS ── */}
      <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { id: 'experiment', label: '1. Sensor Sandbox', icon: <Zap size={14} /> },
          { id: 'flowchart', label: '2. Logic Pipeline', icon: <Layers size={14} /> },
          { id: 'bughunter', label: '3. Bug Hunter', icon: <Bug size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-2 rounded-xl text-center font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 3. TAB 1: SENSOR & LOGIC SANDBOX ── */}
      {activeTab === 'experiment' && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-sm flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <span>Telemetry Threshold Simulator</span>
            </h3>
            <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Live Python Execution
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Sensor Reading (Telemetry):</span>
                <strong className="text-cyan-400 font-mono font-bold text-sm">{sensorReading}</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sensorReading}
                onChange={e => setSensorReading(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Trigger Threshold (Limit):</span>
                <strong className="text-purple-400 font-mono font-bold text-sm">{thresholdVal}</strong>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={thresholdVal}
                onChange={e => setThresholdVal(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Python Branch Highlighter */}
          <div className="bg-black p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-1.5 leading-relaxed">
            <p className="text-slate-500"># Evaluating dynamic logic execution path:</p>
            <p className={isConditionMet ? 'text-amber-400 font-bold bg-amber-950/40 p-1 rounded' : 'text-slate-500'}>
              if telemetry_sensor ({sensorReading}) &gt; threshold ({thresholdVal}):
            </p>
            <p className={`pl-4 ${isConditionMet ? 'text-emerald-400 font-bold bg-emerald-950/40 p-1 rounded' : 'text-slate-600'}`}>
              return &quot;ACTION_REQUIRED: Safety protocol engaged&quot;
            </p>
            <p className={!isConditionMet ? 'text-amber-400 font-bold bg-amber-950/40 p-1 rounded' : 'text-slate-500'}>
              else:
            </p>
            <p className={`pl-4 ${!isConditionMet ? 'text-emerald-400 font-bold bg-emerald-950/40 p-1 rounded' : 'text-slate-600'}`}>
              return &quot;NOMINAL: System idle &amp; healthy&quot;
            </p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Active Execution Output:</span>
              <span className={`font-black text-xs px-2.5 py-0.5 rounded-full ${isConditionMet ? 'bg-amber-400 text-amber-950' : 'bg-emerald-500 text-white'}`}>
                {isConditionMet ? '🔴 THRESHOLD EXCEEDED (Condition: TRUE)' : '🟢 WITHIN NOMINAL LIMIT (Condition: FALSE)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. TAB 2: FLOWCHART LOGIC PIPELINE ── */}
      {activeTab === 'flowchart' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-indigo-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Layers size={16} className="text-indigo-600" />
              <span>Obstacle Avoidance Flowchart Sequencer</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Steps placed: {flowSteps.length}/4
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Tap the execution blocks in the logical sequence (1 to 4) to guide an autonomous robot around an obstacle:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[flowchartItems[2], flowchartItems[0], flowchartItems[3], flowchartItems[1]].map((step, idx) => {
              const isTapped = flowSteps.includes(step.id)
              return (
                <button
                  key={idx}
                  onClick={() => handleFlowTap(step.id)}
                  disabled={isTapped}
                  className={`p-3.5 rounded-2xl border-2 text-left font-black text-xs flex items-center gap-3 transition-all cursor-pointer ${
                    isTapped
                      ? 'bg-slate-100 border-slate-300 text-slate-400 opacity-60'
                      : 'bg-indigo-50/70 border-indigo-300 text-indigo-950 hover:bg-indigo-100 active:scale-98'
                  }`}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span className="flex-1">{step.text}</span>
                  {isTapped && <CheckCircle size={16} className="text-emerald-600" />}
                </button>
              )
            })}
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Your Execution Pipeline:</p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {flowSteps.length === 0 && (
                <span className="text-xs text-slate-400 italic">Tap blocks above to construct the flowchart...</span>
              )}
              {flowSteps.map((id, i) => (
                <span key={i} className="bg-indigo-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-xs">
                  Step {id} ✓
                </span>
              ))}
            </div>
          </div>

          {flowSolved && (
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-950 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle size={20} className="text-emerald-600" />
              <span>Correct pipeline! Logic flow executed in exact order. +15 XP</span>
            </div>
          )}
        </div>
      )}

      {/* ── 5. TAB 3: BUG HUNTER CHALLENGE ── */}
      {activeTab === 'bughunter' && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-sm flex items-center gap-2">
              <Bug size={16} className="text-rose-400" />
              <span>{bugChallenge.title}</span>
            </h3>
            <span className="text-[10px] text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800 font-bold">
              Debug Mission
            </span>
          </div>

          <div className="bg-black p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-1 overflow-x-auto">
            {bugChallenge.code.map((line, i) => (
              <p key={i} className={line.includes('BUG HERE') ? 'text-amber-400 font-bold bg-amber-950/40 p-1 rounded' : ''}>
                {line}
              </p>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs sm:text-sm font-black text-slate-200">
              {bugChallenge.question}
            </p>
            <div className="space-y-2">
              {bugChallenge.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleBugAnswer(opt.id, opt.correct)}
                  className={`w-full p-3.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                    bugSelection === opt.id
                      ? opt.correct
                        ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                        : 'bg-rose-900/60 border-rose-400 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  <Code size={14} className="flex-shrink-0 text-slate-400" />
                  <span className="flex-1">{opt.text}</span>
                </button>
              ))}
            </div>

            {bugSolved && (
              <div className="p-3.5 bg-emerald-950 border border-emerald-500 rounded-2xl text-emerald-200 font-bold text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Fix Verified: Changing thruster_power = +50 safely stabilized altitude! +20 XP</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Footer */}
      {onComplete && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onComplete}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-6 py-2.5 rounded-2xl shadow-md cursor-pointer"
            icon={<ArrowRight size={14} />}
          >
            Complete Algorithm Lab & Next →
          </Button>
        </div>
      )}
    </div>
  )
}
