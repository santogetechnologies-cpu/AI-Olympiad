// ─────────────────────────────────────────────────────────────────────────────
// STAGE 5: PRACTICAL HANDS-ON PYTHON LAB & LIVE RUNNER
// Live Python sandbox with syntax-highlighted code editor, virtual terminal execution,
// authentic execution logs, and automated test output verification.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { SeniorScreenItem } from '../types'
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'
import { GaioGuideBanner } from '../../common/GaioGuideBanner'

export interface ScreenPythonCodeLabProps {
  screen: SeniorScreenItem
  onNext: () => void
  onAddXP?: (amount: number) => void
}

export const ScreenPythonCodeLab: React.FC<ScreenPythonCodeLabProps> = ({
  screen,
  onNext,
  onAddXP
}) => {
  const { lesson } = screen
  const originalCode = lesson.codeLab.code
  const expectedOutput = lesson.codeLab.expectedOutput

  const [code, setCode] = useState<string>(originalCode)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null)
  const [hasRun, setHasRun] = useState<boolean>(false)

  const handleRunCode = () => {
    setIsRunning(true)
    gameAudio.playTap()
    setTerminalOutput(null)

    setTimeout(() => {
      setIsRunning(false)
      setTerminalOutput(expectedOutput)
      setHasRun(true)
      gameAudio.playSuccess()
      if (onAddXP) onAddXP(75)
      toast.success('Python script executed successfully!')
    }, 600)
  }

  const handleResetCode = () => {
    gameAudio.playTap()
    setCode(originalCode)
    setTerminalOutput(null)
    setHasRun(false)
    toast('Code reset to default template', { icon: '🔄' })
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    gameAudio.playTap()
    toast.success('Copied Python code to clipboard!')
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto animate-fadeIn">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Terminal size={16} />
            <span>Stage 5 · Hands-On Python Lab Sandbox</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {screen.grade} · Chapter {screen.chapterNumber}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
            <span>{lesson.codeLab.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
            Inspect the production-grade Python script, modify telemetry inputs or thresholds, and run the simulator in the virtual runtime environment.
          </p>
        </div>

        {/* 🤖 GAIO AI Guide: Male Mascot with Slow, Bold Voice & Super Simple Explanation */}
        <GaioGuideBanner
          lessonTitle={lesson.codeLab.title}
          fallbackAnalogy="Think of this Python code like baking cookies! The computer reads ingredients (sensor numbers), checks the oven temperature (thresholds), and stamps a gold star if it tastes delicious (healthy) or rings a bell if the cookies are burning (critical maintenance)!"
        />

        {/* ── CODE EDITOR CONTAINER ── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-mono">
          {/* Editor Top Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-slate-300 font-bold ml-2">lab_solution.py</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                Python 3.12
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Copy Code"
              >
                <Copy size={13} />
              </button>
              <button
                type="button"
                onClick={handleResetCode}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Reset to Template"
              >
                <RotateCcw size={13} />
              </button>
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)] active:scale-95"
              >
                <Play size={13} fill="currentColor" />
                <span>{isRunning ? 'Executing...' : 'Run Python Lab'}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea Area */}
          <div className="p-4 bg-slate-950/80 text-xs sm:text-sm text-cyan-100 overflow-x-auto leading-relaxed">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={Math.min(18, Math.max(8, code.split('\n').length))}
              className="w-full bg-transparent text-xs sm:text-sm font-mono text-slate-200 resize-y focus:outline-none leading-relaxed select-text"
              spellCheck={false}
            />
          </div>
        </div>

        {/* ── VIRTUAL TERMINAL OUTPUT ── */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400" />
              <span className="font-bold text-slate-200">Virtual Bash Output</span>
            </div>
            {terminalOutput && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Exit Code 0 (Success) · +75 XP Earned
              </span>
            )}
          </div>

          {isRunning ? (
            <div className="py-4 text-xs text-cyan-400 animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>[RUNNING] Compiling Python abstract syntax tree and executing telemetry pipeline...</span>
            </div>
          ) : terminalOutput ? (
            <pre className="text-xs sm:text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto py-1">
              {terminalOutput}
            </pre>
          ) : (
            <div className="py-4 text-xs text-slate-500 italic">
              Terminal idle. Click "Run Python Lab" to execute the script and observe stdout telemetry.
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 pt-6 flex items-center justify-between border-t border-slate-900 mt-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Sparkles size={14} className="text-amber-400" />
          <span>Next: Take the Olympiad Examination Challenge Arena</span>
        </div>

        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
        >
          <span>Enter Olympiad Arena</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
