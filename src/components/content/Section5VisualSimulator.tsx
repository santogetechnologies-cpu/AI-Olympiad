import { useState } from 'react'
import {
  Sliders, CheckCircle2,
  Brain
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import type { CanonicalSection } from './AssignedImageSlot'

export function Section5VisualSimulator({
  section: _section,
  gradeKey,
  chapterNum: _chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const gKey = (gradeKey || 'class3').toLowerCase()
  const isPrimary = gKey === 'class3' || gKey === 'class4' || gKey === 'class5'

  // Primary Simulator State (Friendly Robot Expression)
  const robotColor = '#3b82f6'
  const [robotEyeStyle, setRobotEyeStyle] = useState<'happy' | 'curious' | 'smart'>('happy')
  const [antennaPower, setAntennaPower] = useState(80)

  // Middle/Secondary/Higher Simulator State (Neural Synapse / Weights)
  const [synapseWeight, setSynapseWeight] = useState(65)
  const [biasThreshold, setBiasThreshold] = useState(50)
  const [neuronFired, setNeuronFired] = useState(true)

  const handleSynapseChange = (w: number, b: number) => {
    setSynapseWeight(w)
    setBiasThreshold(b)
    const fired = w >= b
    setNeuronFired(fired)
    if (fired) {
      gamification.addXP(10, undefined, 'synapse-fired')
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-100 text-blue-800 text-xs font-black">
            <Sliders size={16} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
              Live Visual Sandbox & Simulator
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {isPrimary ? 'Friendly Robot Emotion Synthesizer' : 'Neural Synaptic Weight Workbench'}
            </h3>
          </div>
        </div>

        <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          Interactive Live
        </span>
      </div>

      {/* ── 1. PRIMARY SCHOOL INTERACTIVE WORKBENCH (Class 3–5) ── */}
      {isPrimary && (
        <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-3xl text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Robot Expression Canvas:</span>
            <span className="text-xs text-blue-400 font-black">Antenna Energy: {antennaPower}%</span>
          </div>

          {/* Animated SVG Robot Canvas */}
          <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 160" className="w-48 h-40">
              {/* Antenna */}
              <line x1="100" y1="30" x2="100" y2="50" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="100" cy="25" r={8 + (antennaPower / 25)} fill={robotColor} className="animate-pulse" />
              {/* Head */}
              <rect x="50" y="50" width="100" height="85" rx="20" fill="#1e293b" stroke={robotColor} strokeWidth="3" />
              {/* Eyes */}
              {robotEyeStyle === 'happy' && (
                <>
                  <path d="M 70 85 Q 80 75 90 85" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 110 85 Q 120 75 130 85" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                </>
              )}
              {robotEyeStyle === 'curious' && (
                <>
                  <circle cx="80" cy="85" r="7" fill="#38bdf8" />
                  <circle cx="120" cy="85" r="10" fill="#38bdf8" />
                </>
              )}
              {robotEyeStyle === 'smart' && (
                <>
                  <rect x="70" y="80" width="20" height="8" rx="2" fill="#10b981" />
                  <rect x="110" y="80" width="20" height="8" rx="2" fill="#10b981" />
                </>
              )}
              {/* Mouth */}
              <path d="M 80 112 Q 100 124 120 112" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Emotion State:</label>
              <div className="flex gap-1.5">
                {(['happy', 'curious', 'smart'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setRobotEyeStyle(style)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer transition ${
                      robotEyeStyle === style
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Antenna Frequency:</label>
              <input
                type="range"
                min="20"
                max="100"
                value={antennaPower}
                onChange={e => setAntennaPower(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── 2. MIDDLE & HIGHER INTERACTIVE WORKBENCH (Class 6–PG) ── */}
      {!isPrimary && (
        <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-3xl text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Brain size={14} className="text-indigo-400" /> Synaptic Activation Visualizer:
            </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
              neuronFired
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 animate-pulse'
                : 'bg-rose-950 border-rose-700 text-rose-300'
            }`}>
              {neuronFired ? '⚡ Neuron Fired: 1.0 (True)' : '💤 Inhibited: 0.0 (False)'}
            </span>
          </div>

          {/* Interactive Synapse Circuit SVG */}
          <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-64 h-32">
              {/* Input Node */}
              <circle cx="50" cy="60" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              <text x="50" y="64" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Input X</text>

              {/* Connecting Synapse Wire */}
              <line
                x1="72"
                y1="60"
                x2="228"
                y2="60"
                stroke={neuronFired ? '#10b981' : '#475569'}
                strokeWidth={3 + (synapseWeight / 20)}
                strokeDasharray={neuronFired ? '6 3' : 'none'}
                className={neuronFired ? 'animate-pulse' : ''}
              />

              {/* Output Neuron */}
              <circle
                cx="250"
                cy="60"
                r="22"
                fill={neuronFired ? '#065f46' : '#1e293b'}
                stroke={neuronFired ? '#34d399' : '#64748b'}
                strokeWidth="3"
              />
              <text x="250" y="64" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Output Y</text>
            </svg>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                <span>Synaptic Weight (W):</span>
                <span className="text-emerald-400 font-mono font-black">{synapseWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={synapseWeight}
                onChange={e => handleSynapseChange(Number(e.target.value), biasThreshold)}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                <span>Threshold Barrier (θ):</span>
                <span className="text-amber-400 font-mono font-black">{biasThreshold}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={biasThreshold}
                onChange={e => handleSynapseChange(synapseWeight, Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Advance Button */}
      <button
        onClick={onComplete}
        className="w-full py-3.5 rounded-2xl font-black text-sm bg-blue-600 hover:bg-blue-500 text-white cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
      >
        <CheckCircle2 size={18} />
        Complete Simulation & Continue
      </button>
    </div>
  )
}
