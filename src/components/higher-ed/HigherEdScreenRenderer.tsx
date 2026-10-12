import React, { useState } from 'react'
import {
  Shield, Terminal, Cpu, Play, CheckCircle2, XCircle, ArrowRight,
  Sparkles, Layers, Sliders, AlertCircle, HelpCircle, Check, Award,
  Code2, Database, Zap, BookOpen, FileCode, CheckSquare, RotateCcw
} from 'lucide-react'
import type { HigherEdScreenItem } from './types'
import { gameAudio } from '../../utils/gameAudio'
import { KindergartenExplainerService } from '../../services/kindergartenExplainerService'

export interface HigherEdScreenRendererProps {
  screen: HigherEdScreenItem
  onCompleteScreen: () => void
  onNextScreen: () => void
  isScreenCompleted: boolean
  onAnswerQuestion?: (questionId: string, isCorrect: boolean) => void
}

export const HigherEdScreenRenderer: React.FC<HigherEdScreenRendererProps> = ({
  screen,
  onCompleteScreen,
  onNextScreen,
  isScreenCompleted,
  onAnswerQuestion
}) => {
  switch (screen.screenType) {
    case 'briefing':
      return <BriefingScreen screen={screen} onComplete={onCompleteScreen} isCompleted={isScreenCompleted} />
    case 'architecture':
      return <ArchitectureScreen screen={screen} onComplete={onCompleteScreen} isCompleted={isScreenCompleted} />
    case 'code_lab':
      return <CodeLabScreen screen={screen} onComplete={onCompleteScreen} isCompleted={isScreenCompleted} />
    case 'mission':
      return <MissionScreen screen={screen} onComplete={onCompleteScreen} isCompleted={isScreenCompleted} />
    case 'olympiad_quiz':
      return <OlympiadQuizScreen screen={screen} onComplete={onCompleteScreen} isCompleted={isScreenCompleted} onAnswerQuestion={onAnswerQuestion} />
    default:
      return <div className="text-slate-400">Unknown screen type</div>
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1: BRIEFING & LATEX MATHEMATICAL FOUNDATIONS
// ─────────────────────────────────────────────────────────────────────────────
function BriefingScreen({ screen, onComplete, isCompleted }: { screen: HigherEdScreenItem; onComplete: () => void; isCompleted: boolean }) {
  const p = screen.briefingPayload
  if (!p) return null

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 text-slate-200 overflow-y-auto max-w-4xl mx-auto w-full select-none">
      <div className="space-y-4">
        {/* Scenario Header Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Shield size={16} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Mission Context & High-Stakes Scenario
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {p.scenario}
          </p>
        </div>

        {/* Theoretical & Mathematical Formulation */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code2 size={16} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Theoretical Formulation (LaTeX)
            </span>
          </div>

          {/* LaTeX Formula Display Box */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-lg p-3 my-2 text-center overflow-x-auto shadow-inner">
            <code className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wide">
              {p.theoryLatex}
            </code>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {p.theoryText}
          </p>

          {/* Kindergarten Child-Friendly Explanation Card (ELI5) */}
          <div className="mt-3 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 shadow-md space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧸</span>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  Explain Like I'm in Kindergarten (ELI5)
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Zero Jargon • Pure Common Sense
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/95 leading-relaxed font-medium">
              {KindergartenExplainerService.translateText(`${screen.title} ${p.theoryText} ${p.theoryLatex}`)}
            </p>
          </div>
        </div>

        {/* Learning Outcomes & Prerequisites */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold block mb-2">
              Measurable Outcomes
            </span>
            <ul className="space-y-1.5">
              {p.learningOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block mb-2">
              Technical Prerequisites
            </span>
            <div className="flex flex-wrap gap-1.5">
              {p.prerequisites.map((pre, idx) => (
                <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                  {pre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Action */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onComplete()
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
          }`}
        >
          {isCompleted ? <CheckCircle2 size={16} /> : <Zap size={16} />}
          <span>{isCompleted ? 'Briefing Acknowledged' : 'Acknowledge Briefing & Proceed'}</span>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2: INTERACTIVE ARCHITECTURE & DATAFLOW
// ─────────────────────────────────────────────────────────────────────────────
function ArchitectureScreen({ screen, onComplete, isCompleted }: { screen: HigherEdScreenItem; onComplete: () => void; isCompleted: boolean }) {
  const p = screen.architecturePayload
  const [selectedNode, setSelectedNode] = useState<string | null>(p?.nodes[0]?.id || null)

  if (!p) return null
  const activeNode = p.nodes.find(n => n.id === selectedNode) || p.nodes[0]

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 text-slate-200 overflow-y-auto max-w-4xl mx-auto w-full select-none">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-slate-800 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">System Topography</span>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">{p.title}</h3>
          <p className="text-xs text-slate-400">{p.subtitle}</p>
        </div>

        {/* Interactive Pipeline Node Graph */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Click Subsystem Node to Inspect
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {p.nodes.map((node) => {
              const isSelected = node.id === selectedNode
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedNode(node.id)
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">{node.role}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'active' ? 'bg-emerald-400' : node.status === 'critical' ? 'bg-rose-400' : 'bg-amber-400'
                    }`} />
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate">{node.name}</div>
                  {node.metric && (
                    <div className="text-[10px] font-mono text-cyan-400 mt-1">{node.metric}</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Node Detail Inspector */}
        {activeNode && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400" />
                <span className="text-xs font-bold text-slate-100">{activeNode.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{activeNode.role}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Status: {activeNode.status}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{activeNode.details}</p>

            {/* Kindergarten Node Story */}
            <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 font-mono text-[11px] mb-1">
                <span>🧸 Kindergarten View (What is this Lego block?):</span>
              </div>
              <p>
                {KindergartenExplainerService.translateText(`${activeNode.name} ${activeNode.role} ${activeNode.details}`)}
              </p>
            </div>
          </div>
        )}

        {/* Dataflow & Invariants */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 space-y-2">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Dataflow Sequence</span>
            <p className="text-xs text-slate-300 mt-0.5">{p.dataflowDescription}</p>
          </div>
          <div className="pt-2 border-t border-slate-800/60">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">Architecture Invariants</span>
            <ul className="space-y-1">
              {p.invariants.map((inv, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <CheckSquare size={12} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Completion Action */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onComplete()
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
          }`}
        >
          {isCompleted ? <CheckCircle2 size={16} /> : <Zap size={16} />}
          <span>{isCompleted ? 'Architecture Verified' : 'Verify Architecture & Proceed'}</span>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3: RUNNABLE CODE & LIVE PARAMETER LAB
// ─────────────────────────────────────────────────────────────────────────────
function CodeLabScreen({ screen, onComplete, isCompleted }: { screen: HigherEdScreenItem; onComplete: () => void; isCompleted: boolean }) {
  const p = screen.codeLabPayload
  const [params, setParams] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    p?.parameters.forEach(pr => { init[pr.id] = pr.defaultValue })
    return init
  })
  const [executionResult, setExecutionResult] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)

  if (!p) return null

  const handleRun = () => {
    gameAudio.playTap()
    setIsRunning(true)
    setTimeout(() => {
      const res = p.executionLogs(params)
      setExecutionResult(res)
      setIsRunning(false)
      if (res.success) {
        gameAudio.playSuccess()
        onComplete()
      } else {
        gameAudio.playWrong()
      }
    }, 400)
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 text-slate-200 overflow-y-auto max-w-4xl mx-auto w-full select-none">
      <div className="space-y-3">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <FileCode size={16} className="text-cyan-400" />
            <span className="text-xs font-mono text-slate-200 font-semibold">{p.filename}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
            {p.language} 3.11 Execution Environment
          </span>
        </div>

        {/* Kindergarten Code Story Card */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 font-mono text-[11px] mb-1">
            <span>🧸 The Toy Recipe (What does this code do in plain English?):</span>
          </div>
          <p>
            {KindergartenExplainerService.translateText(`${screen.title} ${p.filename} ${p.code.substring(0, 120)}`)}
          </p>
        </div>

        {/* Syntax Code Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs overflow-x-auto shadow-inner max-h-48 overflow-y-auto">
          <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
            {p.code}
          </pre>
        </div>

        {/* Hyperparameter Controls */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Execution Parameters & Dynamic Sliders
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {p.parameters.map((param) => {
              const val = params[param.id] ?? param.defaultValue
              return (
                <div key={param.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-mono text-[11px]">{param.label}</span>
                    <span className="text-cyan-400 font-mono font-semibold">
                      {val.toFixed(2)} {param.unit || ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={val}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value)
                      setParams(prev => ({ ...prev, [param.id]: v }))
                    }}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play size={14} className={isRunning ? 'animate-spin' : ''} />
              <span>{isRunning ? 'Executing Pipeline...' : 'Run Code In Sandbox'}</span>
            </button>
          </div>
        </div>

        {/* Execution Output Console */}
        {executionResult && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-[10px] text-slate-400 uppercase">Sandbox Terminal Output</span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${executionResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {executionResult.success ? 'EXECUTION SUCCESS' : 'EXECUTION WARNING'}
              </span>
            </div>
            <div className="space-y-0.5 text-[11px] text-slate-300">
              {executionResult.output.map((line: string, i: number) => (
                <div key={i} className={line.includes('[ALERT]') || line.includes('[WARN]') ? 'text-amber-300' : line.includes('[PASS]') ? 'text-emerald-300' : ''}>
                  {line}
                </div>
              ))}
            </div>

            {/* Metrics Chips */}
            <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-2">
              {Object.entries(executionResult.metrics).map(([k, v]) => (
                <div key={k} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px]">
                  <span className="text-slate-400">{k}: </span>
                  <span className="text-cyan-400 font-bold">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Completion Footer */}
      <div className="pt-3 flex justify-end">
        <button
          onClick={() => {
            if (executionResult?.success) {
              onComplete()
            } else {
              handleRun()
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
          }`}
        >
          {isCompleted ? <CheckCircle2 size={16} /> : <Zap size={16} />}
          <span>{isCompleted ? 'Lab Complete (Proceed)' : 'Confirm Run & Proceed'}</span>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4: GAMIFIED MISSION / ENGINEERING QUEST
// ─────────────────────────────────────────────────────────────────────────────
function MissionScreen({ screen, onComplete, isCompleted }: { screen: HigherEdScreenItem; onComplete: () => void; isCompleted: boolean }) {
  const m = screen.missionPayload
  if (!m) return null

  // State for parameter tuner
  const [sliderVals, setSliderVals] = useState<Record<string, number>>(() => {
    const s: Record<string, number> = {}
    m.tunerConfig?.sliders.forEach((sl: any) => { s[sl.id] = sl.initial })
    return s
  })

  // State for bug patcher
  const [selectedBug, setSelectedBug] = useState<string | null>(null)
  const [isBugFixed, setIsBugFixed] = useState(false)

  // State for match pairs
  const [matchedIds, setMatchedIds] = useState<string[]>([])

  // State for decision matrix
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null)

  // Evaluation for Parameter Tuner
  const checkTunerSuccess = () => {
    if (!m.tunerConfig) return false
    return m.tunerConfig.sliders.every((sl: any) => {
      const v = sliderVals[sl.id] ?? sl.initial
      return v >= sl.targetMin && v <= sl.targetMax
    })
  }

  const isTunerSuccess = checkTunerSuccess()

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 text-slate-200 overflow-y-auto max-w-4xl mx-auto w-full select-none">
      <div className="space-y-4">
        {/* Mission Briefing Card */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-3 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
              {m.badge}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Technical Challenge
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">{m.missionTitle}</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.brief}</p>

          <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] text-slate-400">
            {m.constraints.map((c, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                Constraint: {c}
              </span>
            ))}
          </div>
        </div>

        {/* Kindergarten Playground Game Card */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 font-mono text-[11px] mb-1">
            <span>🧸 The Playground Game (How to win this challenge):</span>
          </div>
          <p>
            {KindergartenExplainerService.translateText(`${m.missionTitle} ${m.brief} ${m.successCriteria}`)}
          </p>
        </div>

        {/* VARIANT 1: PARAMETER TUNER MISSION */}
        {m.missionType === 'parameter_tuner' && m.tunerConfig && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Calibration Controls</span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${isTunerSuccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300'}`}>
                {isTunerSuccess ? 'TARGET BOUNDS SATISFIED' : 'ADJUSTING PARAMETERS...'}
              </span>
            </div>

            <p className="text-xs text-slate-400">{m.tunerConfig.targetGoalText}</p>

            <div className="space-y-3 pt-2">
              {m.tunerConfig.sliders.map((sl: any) => {
                const cur = sliderVals[sl.id] ?? sl.initial
                const inRange = cur >= sl.targetMin && cur <= sl.targetMax
                return (
                  <div key={sl.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-mono">{sl.name}</span>
                      <span className={`font-mono font-bold ${inRange ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {cur.toFixed(2)} {sl.unit} {inRange ? '(In Range)' : '(Out of Target)'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={sl.min}
                      max={sl.max}
                      step={sl.step}
                      value={cur}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        setSliderVals(prev => ({ ...prev, [sl.id]: val }))
                      }}
                      className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Min: {sl.min}</span>
                      <span className="text-indigo-400">Target: [{sl.targetMin} - {sl.targetMax}]</span>
                      <span>Max: {sl.max}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* VARIANT 2: BUG PATCHER MISSION */}
        {m.missionType === 'bug_patcher' && m.bugConfig && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-3">
            <span className="text-xs font-semibold text-slate-200">Inspect Code Vulnerability</span>
            <div className="bg-slate-950 p-2.5 rounded-lg font-mono text-xs text-rose-300 border border-rose-900/40">
              <pre>{m.bugConfig.codeSnippet}</pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400">Select the fatal architectural flaw:</span>
              {m.bugConfig.vulnerabilities.map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedBug(v.id)
                    if (v.isCritical) setIsBugFixed(true)
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                    selectedBug === v.id
                      ? v.isCritical
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                        : 'bg-rose-500/20 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">{v.description}</div>
                  {selectedBug === v.id && (
                    <div className="text-[11px] text-slate-400 mt-1">{v.explanation}</div>
                  )}
                </button>
              ))}
            </div>

            {isBugFixed && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Patched: {m.bugConfig.fixAction}</span>
              </div>
            )}
          </div>
        )}

        {/* VARIANT 3: ARCHITECTURE MATCH */}
        {m.missionType === 'architecture_match' && m.matchPairs && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-200">Verify Subsystem Pairings</span>
            <div className="space-y-2">
              {m.matchPairs.map((pair: any) => {
                const isMatched = matchedIds.includes(pair.id)
                return (
                  <button
                    key={pair.id}
                    onClick={() => {
                      gameAudio.playTap()
                      if (!isMatched) {
                        setMatchedIds(prev => [...prev, pair.id])
                        gameAudio.playSuccess()
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 font-bold">{pair.subsystem}</span>
                    <span className="text-slate-300 text-right flex-1 ml-3">{pair.purpose}</span>
                    {isMatched && <Check size={16} className="text-emerald-400 ml-2" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* VARIANT 4: DECISION MATRIX */}
        {m.missionType === 'decision_matrix' && m.decisions && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-200">Evaluate Strategic Trade-Off</span>
            <div className="space-y-2">
              {m.decisions.map((dec: any) => {
                const isSelected = selectedDecision === dec.id
                return (
                  <button
                    key={dec.id}
                    onClick={() => {
                      gameAudio.playTap()
                      setSelectedDecision(dec.id)
                      if (dec.isOptimal) gameAudio.playSuccess()
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? dec.isOptimal
                          ? 'bg-emerald-500/20 border-emerald-500 shadow-md'
                          : 'bg-amber-500/20 border-amber-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-100">{dec.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Score: {dec.score}/100</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{dec.description}</p>
                    {isSelected && (
                      <div className="text-[11px] p-2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {dec.feedback}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Completion Button */}
      <div className="pt-3 flex justify-end">
        <button
          onClick={() => {
            gameAudio.playLevelUp()
            onComplete()
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
          }`}
        >
          <Award size={16} />
          <span>{isCompleted ? 'Mission Cleared' : 'Complete Quest & Claim XP'}</span>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 5: OLYMPIAD CONCEPTUAL & SCENARIO ASSESSMENTS
// ─────────────────────────────────────────────────────────────────────────────
function OlympiadQuizScreen({
  screen,
  onComplete,
  isCompleted,
  onAnswerQuestion
}: {
  screen: HigherEdScreenItem
  onComplete: () => void
  isCompleted: boolean
  onAnswerQuestion?: (questionId: string, isCorrect: boolean) => void
}) {
  const qPayload = screen.quizPayload
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({})
  const [revealedEli5Clues, setRevealedEli5Clues] = useState<Record<string, boolean>>({})

  if (!qPayload) return null

  const handleSelectOption = (qId: string, optIdx: number, correctIdx: number) => {
    gameAudio.playTap()
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }))
    const isCorrect = optIdx === correctIdx
    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playWrong()
    }
    if (onAnswerQuestion) onAnswerQuestion(qId, isCorrect)
  }

  const allAnswered = qPayload.questions.every(q => selectedAnswers[q.id] !== undefined)
  const allCorrect = qPayload.questions.every(q => selectedAnswers[q.id] === q.correctIndex)

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 text-slate-200 overflow-y-auto max-w-4xl mx-auto w-full select-none">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
              AI Olympiad Evaluation
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-100">Conceptual & Applied Defense</h3>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Sparkles size={14} />
            <span>+{qPayload.xpReward} XP</span>
          </span>
        </div>

        {/* Questions Loop */}
        <div className="space-y-4">
          {qPayload.questions.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id]
            const isAnswered = chosen !== undefined
            const isCorrect = isAnswered && chosen === q.correctIndex
            const showHint = revealedHints[q.id]
            const showEli5 = revealedEli5Clues[q.id]

            return (
              <div key={q.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                      Q{qIndex + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {q.type === 'conceptual' ? 'Theory / Proof' : 'Applied Production Scenario'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRevealedEli5Clues(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-[11px] font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                      title="Explain this question like I am 5 years old"
                    >
                      <span>🧸</span>
                      <span>{showEli5 ? 'Hide ELI5' : 'ELI5 Clue'}</span>
                    </button>
                    {q.hint && (
                      <button
                        onClick={() => setRevealedHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle size={12} />
                        <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {q.question}
                </p>

                {showEli5 && (
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed space-y-1">
                    <div className="font-bold text-amber-300 text-[10px] font-mono uppercase">
                      🧸 Kindergarten Common-Sense Clue:
                    </div>
                    <div>
                      {KindergartenExplainerService.translateText(`${q.question} ${q.options.join(' ')}`)}
                    </div>
                  </div>
                )}

                {showHint && q.hint && (
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
                    💡 Hint: {q.hint}
                  </div>
                )}

                {/* 4 Options */}
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx
                    const isOptionCorrect = optIdx === q.correctIndex

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold'
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200'
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500'
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      >
                        <span className="font-mono text-[11px] font-bold text-slate-400 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isAnswered && isOptionCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                        {isAnswered && isSelected && !isOptionCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>

                {/* Detailed Explanation */}
                {isAnswered && (
                  <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                      : 'bg-amber-950/30 border-amber-800/40 text-amber-300'
                  }`}>
                    <span className="font-bold block mb-0.5 font-mono text-[10px] uppercase">
                      {isCorrect ? '✓ Correct Rationale' : '⚠ Technical Analysis'}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Completion & Certification */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-amber-400" />
          <span className="text-xs font-mono text-slate-300">
            Badge: <strong className="text-amber-300">{qPayload.badgeEarned}</strong>
          </span>
        </div>

        <button
          onClick={() => {
            gameAudio.playLevelUp()
            onComplete()
          }}
          disabled={!allAnswered}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : allAnswered
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Award size={16} />
          <span>{isCompleted ? 'Certified & Claimed' : 'Submit & Claim Badge'}</span>
        </button>
      </div>
    </div>
  )
}
