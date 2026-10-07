import React, { useState } from 'react'
import {
  Activity, Sliders, ChevronRight, CheckCircle2,
  Zap
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPageLiveSimulationProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPageLiveSimulation: React.FC<FullPageLiveSimulationProps> = ({
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile: _profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  // Simulator Controls
  const [sensitivity, setSensitivity] = useState(65)
  const [threshold, setThreshold] = useState(70)
  const [guardrailActive, setGuardrailActive] = useState(true)
  const [simFiredCount, setSimFiredCount] = useState(0)

  // Pipeline Step Re-ordering State
  const initialSteps = [
    { id: 's2', label: 'Layer 2: Pattern Recognition & Weight Calibration', correctPos: 2 },
    { id: 's1', label: 'Layer 1: Sensor Perception & Input Normalization', correctPos: 1 },
    { id: 's3', label: 'Layer 3: Guardrail Verification & Action Deployment', correctPos: 3 },
  ]
  const [pipelineSteps, setPipelineSteps] = useState(initialSteps)
  const [pipelineVerified, setPipelineVerified] = useState(false)

  // Computed live metrics
  const confidenceScore = Math.min(100, Math.round((sensitivity * 0.6) + (threshold * 0.4)))
  const isOptimal = confidenceScore >= 60 && guardrailActive

  const handleFireSim = () => {
    setSimFiredCount(c => c + 1)
    gamification.addXP(15, undefined, 'sim-test-fired')
    if (isOptimal) {
      toast.success(`⚡ Optimal Output Generated! Confidence: ${confidenceScore}%`, { icon: '🎯' })
    } else if (!guardrailActive) {
      toast.error('⚠️ Warning: Guardrail is OFF! High risk of uncalibrated error.', { icon: '🛡️' })
    } else {
      toast('Adjust sensitivity or threshold to improve decision quality.', { icon: '💡' })
    }
  }

  const handleMoveStep = (idx: number, dir: 'up' | 'down') => {
    if (pipelineVerified) return
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= pipelineSteps.length) return
    const next = [...pipelineSteps]
    const temp = next[idx]
    next[idx] = next[targetIdx]
    next[targetIdx] = temp
    setPipelineSteps(next)

    // Check if sorted
    const isSorted = next.every((item, i) => item.correctPos === i + 1)
    if (isSorted) {
      setPipelineVerified(true)
      gamification.addXP(30, undefined, 'pipeline-sorted')
      gamification.launchConfetti()
      toast.success('🧩 Workflow Pipeline Successfully Assembled! +30 XP')
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl shadow-inner">
              🔬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                  <Activity size={12} /> Interactive Live Simulation
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {simFiredCount} Simulation Runs Tested
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Dynamic Parameter Workbench: {topicTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFireSim}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer transition-transform"
            >
              <Zap size={15} />
              <span>Test Parameter Response</span>
            </button>
          </div>
        </div>

        {/* Split Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Controls Console (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-400 tracking-wider">
                <Sliders size={15} /> Sensor & Model Calibration
              </div>

              {/* Slider 1: Sensitivity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Perception Sensitivity</span>
                  <span className="text-emerald-400 font-mono">{sensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sensitivity}
                  onChange={e => setSensitivity(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">Controls how finely sensors capture subtle environmental patterns.</p>
              </div>

              {/* Slider 2: Decision Threshold */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Decision Confidence Threshold</span>
                  <span className="text-teal-400 font-mono">{threshold}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={threshold}
                  onChange={e => setThreshold(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">Minimum certainty required before triggering an automated action.</p>
              </div>

              {/* Guardrail Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Safety Verification Guardrail</span>
                  <span className="text-[11px] text-slate-400">Prevents unverified actions</span>
                </div>
                <button
                  onClick={() => setGuardrailActive(!guardrailActive)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-colors cursor-pointer ${
                    guardrailActive
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}
                >
                  {guardrailActive ? 'ACTIVE ✓' : 'BYPASS ⚠️'}
                </button>
              </div>
            </div>

            {/* Readout stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Overall Confidence</span>
                <span className={`text-2xl font-black ${isOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {confidenceScore}%
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Integrity State</span>
                <span className={`text-xs font-black uppercase mt-1 block ${guardrailActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {guardrailActive ? 'Verified Safe' : 'Unchecked'}
                </span>
              </div>
            </div>

          </div>

          {/* Real-Time Live Visualizer & Dynamic SVG (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Live Telemetry Response Curve
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Input = {sensitivity} | Barrier = {threshold}
                </span>
              </div>

              {/* Dynamic Oscilloscope SVG */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative flex items-center justify-center min-h-[220px]">
                <svg viewBox="0 0 600 220" className="w-full h-full max-h-[220px]">
                  <defs>
                    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="110" x2="600" y2="110" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="300" y1="0" x2="300" y2="220" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Threshold Barrier Line */}
                  <line
                    x1="0"
                    y1={220 - (threshold * 2)}
                    x2="600"
                    y2={220 - (threshold * 2)}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                  <text x="15" y={210 - (threshold * 2)} fill="#f59e0b" fontSize="10" fontWeight="bold">
                    Threshold Barrier: {threshold}%
                  </text>

                  {/* Dynamic Sine/Activation Curve */}
                  <path
                    d={`M 0 110 Q 150 ${110 - (sensitivity * 0.9)} 300 110 T 600 110`}
                    fill="none"
                    stroke="url(#waveGrad)"
                    strokeWidth="4"
                  />

                  {/* Active Output Node */}
                  <circle
                    cx="300"
                    cy={110}
                    r={guardrailActive ? 8 : 12}
                    fill={guardrailActive ? '#10b981' : '#f43f5e'}
                    className="animate-ping"
                  />
                </svg>
              </div>

              {/* Pipeline Step Re-ordering Challenge */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Re-order Pipeline Layers to Match Correct Workflow:
                  </span>
                  {pipelineVerified && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Pipeline Verified!
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {pipelineSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step.label}</span>
                      </span>

                      {!pipelineVerified && (
                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveStep(idx, 'up')}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] cursor-pointer disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            disabled={idx === pipelineSteps.length - 1}
                            onClick={() => handleMoveStep(idx, 'down')}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] cursor-pointer disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Proceed */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onJumpToSection(4)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
              >
                <span>Advance to Section 5: Tactical Sector Map</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
