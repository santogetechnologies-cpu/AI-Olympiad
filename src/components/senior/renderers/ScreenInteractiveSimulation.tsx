// ─────────────────────────────────────────────────────────────────────────────
// STAGE 4: INTERACTIVE GAMIFIED CYBER-SIMULATION
// High-tech, interactive simulations: Neural Decision Boundaries, TRACE Prompting,
// Algorithmic Bias Auditing, and Industrial Telemetry Operations.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import type { SeniorScreenItem } from '../types'
import {
  Gamepad2,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Terminal,
  Activity
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'

import { GaioGuideBanner } from '../../common/GaioGuideBanner'

export interface ScreenInteractiveSimulationProps {
  screen: SeniorScreenItem
  onNext: () => void
  onAddXP?: (amount: number) => void
  onOpenConcept?: (term: string) => void
}

export const ScreenInteractiveSimulation: React.FC<ScreenInteractiveSimulationProps> = ({
  screen,
  onNext,
  onAddXP
}) => {
  const { lesson } = screen
  const simType = lesson.simulation.type

  // State for Neural Playground
  const [w1, setW1] = useState<number>(1.2)
  const [w2, setW2] = useState<number>(-0.8)
  const [bias, setBias] = useState<number>(0.1)

  // State for TRACE Studio
  const [taskScore, setTaskScore] = useState<number>(20)
  const [roleScore, setRoleScore] = useState<number>(20)
  const [audienceScore, setAudienceScore] = useState<number>(20)
  const [contextScore, setContextScore] = useState<number>(20)
  const [exampleScore, setExampleScore] = useState<number>(15)

  // State for Bias Auditor
  const [threshold, setThreshold] = useState<number>(0.5)

  // State for Telemetry Matrix
  const [rpm, setRpm] = useState<number>(1800)
  const [vibration, setVibration] = useState<number>(2.4)
  const [temp, setTemp] = useState<number>(68)

  const [hasClaimedSimXP, setHasClaimedSimXP] = useState<boolean>(false)

  // Compute Neural Boundary Accuracy
  const neuralMetrics = useMemo(() => {
    // 6 sample points: (x1, x2, trueLabel)
    const points = [
      { x1: 0.8, x2: 0.9, y: 1 },
      { x1: 0.7, x2: 0.6, y: 1 },
      { x1: 0.5, x2: 0.8, y: 1 },
      { x1: 0.2, x2: 0.3, y: 0 },
      { x1: 0.1, x2: 0.4, y: 0 },
      { x1: 0.3, x2: 0.1, y: 0 }
    ]
    let correct = 0
    points.forEach((p) => {
      const z = w1 * p.x1 + w2 * p.x2 + bias
      const pred = z >= 0 ? 1 : 0
      if (pred === p.y) correct++
    })
    const acc = Math.round((correct / points.length) * 100)
    return { acc, points }
  }, [w1, w2, bias])

  // Compute TRACE Total Score
  const traceTotal = taskScore + roleScore + audienceScore + contextScore + exampleScore

  // Compute Bias Disparate Impact
  const biasMetrics = useMemo(() => {
    // Selection rates as function of threshold
    const rateA = Math.max(0.1, Math.min(0.95, 1.0 - threshold * 0.9))
    const rateB = Math.max(0.1, Math.min(0.95, 1.0 - threshold * 1.15))
    const diRatio = Math.round((rateB / rateA) * 100) / 100
    const isCompliant = diRatio >= 0.8 && diRatio <= 1.25
    return { rateA: Math.round(rateA * 100), rateB: Math.round(rateB * 100), diRatio, isCompliant }
  }, [threshold])

  // Compute Telemetry Health
  const telemetryHealth = useMemo(() => {
    const vibRatio = vibration / 4.5
    const tempRatio = temp / 85.0
    const score = Math.min(100, Math.round(((vibRatio * 0.6 + tempRatio * 0.4) * 100)))
    const isCritical = vibration >= 4.5 || temp >= 85
    const status = isCritical
      ? 'CRITICAL_FAILURE_IMMINENT'
      : score >= 75
      ? 'WARNING_DEGRADATION'
      : 'NOMINAL_OPTIMAL'
    const reactiveCost = 290000
    const predictiveCost = isCritical ? 240000 : 30000
    const savings = reactiveCost - predictiveCost
    return { score, status, isCritical, savings }
  }, [rpm, vibration, temp])

  const handleTriggerSimSuccess = () => {
    if (!hasClaimedSimXP) {
      gameAudio.playComplete()
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
      if (onAddXP) onAddXP(75)
      setHasClaimedSimXP(true)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Gamepad2 size={16} />
            <span>Stage 4 · Interactive Gamified Cyber-Simulation</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
            <span>{lesson.simulation.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
            Adjust real-time hyperparameters and observation variables to converge the system towards optimal performance.
          </p>
        </div>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          lessonTitle={lesson.simulation.title}
          fallbackAnalogy={
            simType === 'trace_prompt_studio'
              ? 'Like asking the school cafeteria chef for lunch! If you just shout "Food", you might get spinach. But if you give exact steps (Task, Role, Audience, Context, Example), you get the perfect warm pizza!'
              : simType === 'bias_fairness_auditor'
              ? 'Like checking if playground swing passes are given out fairly! If kids in red shirts get 10 passes and kids in blue shirts only get 2 passes, the rule is biased and unfair. Tuning the slider fixes the fairness!'
              : simType === 'telemetry_operations_matrix'
              ? 'Like listening to your bicycle chain squeak before the wheel falls off! You check the temperature and vibration to fix the parts while it’s easy and cheap.'
              : 'Weight W1 and W2 are like Megaphone Volume knobs (how loudly each clue shouts)! Bias is your baseline mood (how easy or hard it is to say YES before any clues arrive)!'
          }
        />

        {/* ── SIMULATION VIEWPORTS ── */}
        {simType === 'trace_prompt_studio' ? (
          /* 1. TRACE Prompt Studio */
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal size={14} />
                <span>TRACE Prompt Architecture Calibrator</span>
              </span>
              <span
                className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                  traceTotal >= 85
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                Quality Score: {traceTotal}/100 {traceTotal >= 85 ? '✓ Production Ready' : '• Optimizing'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Task Definition (T):</span>
                  <span className="font-mono text-cyan-400">{taskScore}/20</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={taskScore}
                  onChange={(e) => setTaskScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Role & Persona (R):</span>
                  <span className="font-mono text-cyan-400">{roleScore}/20</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={roleScore}
                  onChange={(e) => setRoleScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Audience Adaptation (A):</span>
                  <span className="font-mono text-cyan-400">{audienceScore}/20</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={audienceScore}
                  onChange={(e) => setAudienceScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Context & Constraints (C):</span>
                  <span className="font-mono text-cyan-400">{contextScore}/20</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={contextScore}
                  onChange={(e) => setContextScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Few-Shot Demonstrations & Examples (E):</span>
                  <span className="font-mono text-cyan-400">{exampleScore}/20</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={exampleScore}
                  onChange={(e) => setExampleScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">$ Simulated Model Output:</span>
              <p className="mt-1 text-slate-400 leading-relaxed">
                {traceTotal >= 85
                  ? '>> Prompt evaluated with 0% ambiguity. Hallucination risk minimized. Structured output verified against schema constraints.'
                  : '>> Warning: Missing contextual guardrails. Model output variance elevated. Increase few-shot examples and strict negative constraints.'}
              </p>
            </div>
          </div>
        ) : simType === 'bias_fairness_auditor' ? (
          /* 2. Bias & Fairness Auditor */
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} />
                <span>Algorithmic Fairness & Disparate Impact Auditor</span>
              </span>
              <span
                className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                  biasMetrics.isCompliant
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                DI Ratio: {biasMetrics.diRatio}{' '}
                {biasMetrics.isCompliant ? '✓ 80% Rule Compliant' : '⚠ Disparate Impact Alert'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300 font-medium">
                <span>Decision Classification Threshold (τ):</span>
                <span className="font-mono text-cyan-400">{threshold}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px] uppercase">Cohort A Selection Rate</div>
                <div className="text-lg font-black text-cyan-300 mt-1">{biasMetrics.rateA}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px] uppercase">Cohort B Selection Rate</div>
                <div className="text-lg font-black text-violet-300 mt-1">{biasMetrics.rateB}%</div>
              </div>
            </div>
          </div>
        ) : simType === 'telemetry_operations_matrix' ? (
          /* 3. Industrial Telemetry Operations */
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} />
                <span>Turbine Telemetry Health Matrix</span>
              </span>
              <span
                className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                  telemetryHealth.status === 'NOMINAL_OPTIMAL'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : telemetryHealth.status === 'WARNING_DEGRADATION'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {telemetryHealth.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Vibration RMS (mm/s):</span>
                  <span className="font-mono text-cyan-400">{vibration} mm/s</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="6.0"
                  step="0.1"
                  value={vibration}
                  onChange={(e) => setVibration(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Bearing Temperature (°C):</span>
                  <span className="font-mono text-cyan-400">{temp} °C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Net Estimated Cost Savings per Incident:</span>
              <span className="text-emerald-400 font-black text-sm">
                +${telemetryHealth.savings.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          /* 4. Default: Neural Decision Boundary Simulator */
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu size={14} />
                <span>Hyperparameter Convergence & Decision Boundary</span>
              </span>
              <span
                className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                  neuralMetrics.acc >= 85
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                Accuracy: {neuralMetrics.acc}% {neuralMetrics.acc >= 85 ? '✓ Converged' : '• Tuning'}
              </span>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Weight W₁:</span>
                  <span className="font-mono text-cyan-400">{w1}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="3"
                  step="0.1"
                  value={w1}
                  onChange={(e) => setW1(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Weight W₂:</span>
                  <span className="font-mono text-cyan-400">{w2}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="2"
                  step="0.1"
                  value={w2}
                  onChange={(e) => setW2(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Bias b:</span>
                  <span className="font-mono text-cyan-400">{bias}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            {/* 2D Plane SVG Visualization */}
            <div className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 300 120">
                {/* Axes */}
                <line x1="20" y1="100" x2="280" y2="100" stroke="#334155" strokeWidth="1" />
                <line x1="20" y1="10" x2="20" y2="100" stroke="#334155" strokeWidth="1" />

                {/* Decision Line: w1*x1 + w2*x2 + b = 0 => x2 = (-w1*x1 - b)/w2 */}
                {w2 !== 0 && (
                  <line
                    x1="30"
                    y1={Math.max(10, Math.min(110, 60 - ((-w1 * 0.2 - bias) / w2) * 50))}
                    x2="270"
                    y2={Math.max(10, Math.min(110, 60 - ((-w1 * 0.9 - bias) / w2) * 50))}
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Positive and Negative points */}
                <circle cx="220" cy="30" r="5" fill="#10b981" />
                <circle cx="190" cy="45" r="5" fill="#10b981" />
                <circle cx="160" cy="35" r="5" fill="#10b981" />
                <circle cx="60" cy="85" r="5" fill="#f43f5e" />
                <circle cx="45" cy="75" r="5" fill="#f43f5e" />
                <circle cx="85" cy="95" r="5" fill="#f43f5e" />
              </svg>
            </div>
          </div>
        )}

        {/* Claim Reward Button */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles size={14} className="text-amber-400" />
            <span>
              {hasClaimedSimXP
                ? 'Simulation Calibration Mastered (+75 XP Claimed!)'
                : 'Converge your simulation to earn +75 XP bonus'}
            </span>
          </div>
          {!hasClaimedSimXP && (
            <button
              type="button"
              onClick={handleTriggerSimSuccess}
              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition-all cursor-pointer"
            >
              Verify Calibration (+75 XP)
            </button>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Terminal size={14} className="text-cyan-400" />
          <span>Next: Run Python Code in Virtual Sandbox</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Open Python Code Lab</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
