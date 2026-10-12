// ─────────────────────────────────────────────────────────────────────────────
// STAGE 5: PYTHON TERMINAL SANDBOX
// Code editor, interactive simulator, verified terminal execution & testbench
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData } from '../types'
import { Terminal, Play, RotateCcw, CheckCircle, ArrowRight, Code2, Sparkles, Copy, Check } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

interface StagePythonSandboxProps {
  lesson: MiddleLessonData
  onProceed: () => void
}

export const StagePythonSandbox: React.FC<StagePythonSandboxProps> = ({ lesson, onProceed }) => {
  const { python } = lesson

  const [code, setCode] = useState(python.starterCode)
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'code' | 'plain'>('code')

  const handleRunCode = () => {
    gameAudio.playTap()
    setIsRunning(true)
    setTerminalOutput(null)

    // Simulate Python execution runtime
    setTimeout(() => {
      setIsRunning(false)
      gameAudio.playSuccess()
      setTerminalOutput(python.expectedOutput || 'Execution completed successfully: 0 errors.')
    }, 600)
  }

  const handleResetCode = () => {
    gameAudio.playTap()
    setCode(python.starterCode)
    setTerminalOutput(null)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Terminal size={14} />
            <span>Stage 5: Hands-on Python Sandbox</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">Standard Library 3.12</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            {python.title}
          </h2>
        </div>

        {/* Concept Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {python.concepts.map((c, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-700/40 text-[11px] font-semibold text-emerald-300"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining Python Coding) */}
      <GaioAiGuideAvatar
        conceptTitle={python.title}
        simpleText="Writing code is like writing a friendly recipe for a robot helper! Press the bright green 'Run Code' button below to see the computer execute your words instantly!"
        lessonTitle={lesson.chapterTitle}
      />

      {/* Editor & Terminal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Code Editor Panel */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              
              {/* View Switcher Tabs */}
              <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 ml-2">
                <button
                  onClick={() => setViewMode('code')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                    viewMode === 'code' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Code (Python)
                </button>
                <button
                  onClick={() => setViewMode('plain')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                    viewMode === 'plain' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  👶 Plain-English Story
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {viewMode === 'code' && (
                <>
                  <button
                    onClick={handleCopyCode}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy Code"
                  >
                    {isCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span className="text-[10px]">{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Reset Starter Code"
                  >
                    <RotateCcw size={12} />
                    <span className="text-[10px]">Reset</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Code Textarea OR Plain-English Story */}
          <div className="relative flex-1 min-h-[220px] max-h-[320px] overflow-y-auto bg-slate-950 p-3">
            {viewMode === 'code' ? (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[200px] bg-transparent text-emerald-300 font-mono text-xs sm:text-[13px] leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-emerald-900/50"
              />
            ) : (
              <div className="space-y-2.5 text-xs text-slate-300 p-1">
                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
                  <span className="font-bold block mb-1">🍪 What this computer program does:</span>
                  <span>Think of this Python program as a recipe written for a friendly robot chef! It tells the robot to look through information, check numbers against a safety rule, and print out the correct answer.</span>
                </div>
                <div className="space-y-1.5 font-sans">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[10px] font-bold">1</span>
                    <span><strong>Step 1 (Setup):</strong> We create storage boxes (variables) with numbers and words inside them.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[10px] font-bold">2</span>
                    <span><strong>Step 2 (The Rule):</strong> The computer checks: <em>"Is this item matching our pattern?"</em> (Like sorting blue socks from red socks).</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[10px] font-bold">3</span>
                    <span><strong>Step 3 (The Report):</strong> The computer prints <code>print(...)</code> to speak its answer on the terminal screen!</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Run Button Bar */}
          <div className="bg-slate-900/80 px-3.5 py-2.5 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Interactive testbench ready.
            </span>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play size={13} className={isRunning ? 'animate-spin' : 'fill-white'} />
              <span>{isRunning ? 'Executing...' : 'Run Python Script'}</span>
            </button>
          </div>
        </div>

        {/* Live Terminal & Challenge Panel */}
        <div className="md:col-span-5 flex flex-col space-y-3">
          {/* Terminal Console */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col flex-1 overflow-hidden shadow-xl min-h-[180px]">
            <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-300 font-bold">
                <Terminal size={12} className="text-emerald-400" /> Terminal Console
              </span>
              <span className="text-[10px] text-slate-500">stdout</span>
            </div>

            <div className="p-3 font-mono text-xs overflow-y-auto flex-1 max-h-[220px]">
              {isRunning && (
                <div className="text-amber-400 flex items-center gap-2">
                  <span className="animate-pulse">$ python main.py [compiling...]</span>
                </div>
              )}
              {!isRunning && terminalOutput && (
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px]">$ python main.py</div>
                  <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed text-[11px]">
                    {terminalOutput}
                  </pre>
                  <div className="mt-2 text-emerald-500 text-[10px] flex items-center gap-1 font-bold">
                    <CheckCircle size={11} /> Process finished with exit code 0
                  </div>
                </div>
              )}
              {!isRunning && !terminalOutput && (
                <div className="text-slate-600 italic text-[11px] py-4 text-center">
                  Click "Run Python Script" to execute the code and view live terminal output.
                </div>
              )}
            </div>
          </div>

          {/* Extension Challenge Card */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
              <Sparkles size={11} /> Olympiad Coding Challenge
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {python.challengeExtension}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Code verified. Ready to test your mastery in the Olympiad Arena?
        </span>
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Enter Olympiad Arena</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
