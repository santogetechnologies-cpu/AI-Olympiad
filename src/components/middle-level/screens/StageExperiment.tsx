// ─────────────────────────────────────────────────────────────────────────────
// STAGE 3: GUIDED SIMULATION & EXPERIMENT LAB
// Interactive parameter controls, live diagnostic visualizer & step investigations
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import type { MiddleLessonData } from '../types'
import { FlaskConical, Sliders, Activity, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

interface StageExperimentProps {
  lesson: MiddleLessonData
  onProceed: () => void
  onOpenJargonBuster?: () => void
}

export const StageExperiment: React.FC<StageExperimentProps> = ({ lesson, onProceed, onOpenJargonBuster }) => {
  const { experiment } = lesson

  // State for parameters
  const [params, setParams] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    experiment.parameterControls?.forEach((p) => {
      initial[p.id] = p.defaultValue
    })
    return initial
  })

  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([0])

  // Computed live telemetry simulation based on parameters
  const telemetry = useMemo(() => {
    const p1 = params['param-1'] ?? 5
    const p2 = params['param-2'] ?? 25

    // Synthetic formula for demo feedback
    const simulatedAccuracy = Math.min(99.4, Math.max(62.0, (100 - (p2 * 0.3) + (p1 * 1.5)))).toFixed(1)
    const simulatedLatency = Math.max(12, Math.round(45 + (p1 * 4) - (p2 * 0.2)))
    const convergenceStatus = p2 > 60 ? 'Noisy Drift Detected' : p1 > 8 ? 'High Sensitivity Alert' : 'Optimal Stable State'
    const statusColor = p2 > 60 ? 'text-amber-400' : p1 > 8 ? 'text-sky-400' : 'text-emerald-400'

    return {
      accuracy: simulatedAccuracy,
      latency: simulatedLatency,
      status: convergenceStatus,
      statusColor
    }
  }, [params])

  const handleParamChange = (id: string, val: number) => {
    gameAudio.playTap()
    setParams((prev) => ({ ...prev, [id]: val }))
  }

  const handleStepComplete = (stepIdx: number) => {
    gameAudio.playSuccess()
    if (!completedSteps.includes(stepIdx)) {
      setCompletedSteps((prev) => [...prev, stepIdx])
    }
    if (stepIdx < experiment.steps.length - 1) {
      setActiveStepIdx(stepIdx + 1)
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
          <FlaskConical size={14} />
          <span>Stage 3: Guided Simulation & Experiment Lab</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
          {experiment.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {experiment.objective}
        </p>
      </div>

      {/* GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining Lab Experiment) */}
      <GaioAiGuideAvatar
        conceptTitle={experiment.title}
        simpleText="Welcome to the laboratory! Move the sliders back and forth like toy knobs. Watch how the numbers change and the accuracy meter lights up green when you find the sweet spot!"
        lessonTitle={lesson.chapterTitle}
      />

      {/* Main Grid: Controls vs Live Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Interactive Parameter Tuner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-teal-300">
                <Sliders size={14} /> Runtime Parameter Sliders
              </span>
              <button
                onClick={() => {
                  const initial: Record<string, number> = {}
                  experiment.parameterControls?.forEach((p) => {
                    initial[p.id] = p.defaultValue
                  })
                  setParams(initial)
                  gameAudio.playTap()
                }}
                className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>

            <div className="space-y-4">
              {experiment.parameterControls?.map((ctrl) => {
                const currentVal = params[ctrl.id] ?? ctrl.defaultValue
                return (
                  <div key={ctrl.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-200">{ctrl.label}</span>
                      <span className="font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                        {currentVal} {ctrl.unit || ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={ctrl.min}
                      max={ctrl.max}
                      value={currentVal}
                      onChange={(e) => handleParamChange(ctrl.id, Number(e.target.value))}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>{ctrl.min}{ctrl.unit || ''}</span>
                      <span>Default: {ctrl.defaultValue}</span>
                      <span>{ctrl.max}{ctrl.unit || ''}</span>
                    </div>
                    {/* Kid-friendly slider explanation */}
                    <div className="mt-1.5 pt-1 border-t border-slate-800/40 text-[10px] text-amber-300/90 font-medium">
                      {ctrl.id === 'param-1'
                        ? '🚴 Kid Tip: Like steering a bicycle! Turn too fast and you wobble; turn too slow and you take forever.'
                        : '🕶️ Kid Tip: Sunglasses mode! Blocks out noisy glare and messy data so the robot stays calm.'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/50 text-[11px] text-slate-400 flex items-center justify-between">
            <span>💡 Adjust the sliders to see the robot's reaction time and accuracy change live!</span>
            {onOpenJargonBuster && (
              <button
                onClick={onOpenJargonBuster}
                className="text-[10px] text-amber-400 hover:text-amber-200 underline font-semibold cursor-pointer shrink-0 ml-2"
              >
                Explain Dials
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Simulated Telemetry Visualizer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-sky-300">
                <Activity size={14} /> Robot Brain Monitor
              </span>
              <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> ACTIVE & LEARNING
              </span>
            </div>

            {/* Metric Gauges */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
                  🎯 Accuracy
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 font-mono">
                  {telemetry.accuracy}%
                </div>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  (Correct guesses out of 100)
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
                  ⚡ Reaction Time
                </span>
                <div className="text-xl sm:text-2xl font-black text-sky-400 mt-0.5 font-mono">
                  {telemetry.latency} ms
                </div>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  (Inference latency / speed)
                </span>
              </div>
            </div>

            {/* Diagnostic Terminal Status */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1 border-b border-slate-800 pb-1">
                <span>ROBOT HEALTH STATUS</span>
                <span className={telemetry.statusColor}>{telemetry.status}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                👶 <strong>In Plain English:</strong> The robot is feeling confident! Its math gears are balanced, sensors are clean, and it is ready to make smart predictions.
              </p>
            </div>
          </div>

          {/* Investigation Steps Checklist */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Investigation Phase Checklist
            </span>
            <div className="space-y-1.5">
              {experiment.steps.map((step, idx) => {
                const isDone = completedSteps.includes(idx)
                return (
                  <button
                    key={idx}
                    onClick={() => handleStepComplete(idx)}
                    className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between border cursor-pointer transition-all ${
                      isDone
                        ? 'bg-teal-950/40 border-teal-500/50 text-white'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {step.stepNumber}. {step.title}
                    </span>
                    <CheckCircle
                      size={14}
                      className={`shrink-0 ${isDone ? 'text-teal-400' : 'text-slate-600'}`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Experiments verified. Test your tactical decisions in the arena!
        </span>
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Enter Game Arena</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
