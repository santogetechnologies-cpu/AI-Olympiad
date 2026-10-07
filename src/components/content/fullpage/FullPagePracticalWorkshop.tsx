import React, { useState } from 'react'
import {
  Wrench, Terminal, Play, AlertTriangle,
  ChevronRight, RefreshCw
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPagePracticalWorkshopProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPagePracticalWorkshop: React.FC<FullPagePracticalWorkshopProps> = ({
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({})
  const [deviceStatus, setDeviceStatus] = useState<'normal' | 'glitched' | 'patched'>('normal')
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[INIT] Virtual Testing Station Loaded for ${topicTitle}...`,
    '[READY] All sensory channels online. Ready for diagnostic check.',
  ])

  const task = profile.practicalTask || {
    title: `Practical Implementation Lab: ${topicTitle}`,
    objective: `Test the sensory perception and decision accuracy of an automated agent applying ${topicTitle}.`,
    steps: [
      'Initialize sensory array and normalize input values.',
      'Evaluate neural weights against real-world test cases.',
      'Verify safety guardrails before deploying final decisions.',
    ],
    expectedResult: 'System achieves 100% operational fidelity with zero safety regressions.',
  }

  const handleToggleStep = (idx: number) => {
    const next = { ...checkedSteps, [idx]: !checkedSteps[idx] }
    setCheckedSteps(next)
    if (Object.values(next).filter(Boolean).length === task.steps.length) {
      gamification.addXP(25, undefined, 'practical-checklist-complete')
      toast.success('🛠️ All Lab Steps Verified! Ready for Live Diagnostic.')
    }
  }

  const handleRunDiagnostic = () => {
    setTerminalLogs(prev => [
      ...prev,
      `[EXEC] Running full diagnostics on ${topicTitle}...`,
      '[INFO] Checking sensor stream: STABLE',
      '[INFO] Evaluating decision latency: 12ms (Optimal)',
      '[SUCCESS] All tests PASSED! System operational.',
    ])
    setDeviceStatus('normal')
    gamification.addXP(20, undefined, 'diag-run-pass')
    toast.success('⚡ Diagnostics Successful! System operating at peak performance.')
  }

  const handleInjectGlitch = () => {
    setDeviceStatus('glitched')
    setTerminalLogs(prev => [
      ...prev,
      '[ALERT] Injected unexpected edge-case anomaly into data stream!',
      '[ERROR] Model confidence dropped below threshold. Glitch detected!',
    ])
    toast.error('💥 Anomaly Injected! Subsystem requires hotfix patch.', { icon: '⚠️' })
  }

  const handleDeployPatch = () => {
    setDeviceStatus('patched')
    setTerminalLogs(prev => [
      ...prev,
      '[PATCH] Applying automated heuristic guardrail hotfix...',
      '[PATCH] Sensor inputs sanitized and weights recalibrated.',
      '[RESOLVED] System recovered! 100% Health restored.',
    ])
    gamification.addXP(30, undefined, 'patch-deployed-success')
    gamification.launchConfetti()
    toast.success('🛡️ Hotfix Deployed! Lab Challenge Cleared!', { icon: '🎉' })
    onComplete()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-purple-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-3xl shadow-inner">
              🛠️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800 flex items-center gap-1">
                  <Wrench size={12} /> Virtual Engineering Workshop
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  Hands-On Testing Workbench
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {task.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunDiagnostic}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <Play size={14} />
              <span>Run Diagnostic</span>
            </button>
            <button
              onClick={handleInjectGlitch}
              className="px-3.5 py-2 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <AlertTriangle size={14} />
              <span>Inject Glitch</span>
            </button>
          </div>
        </div>

        {/* Dual Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Lab Protocol & Steps (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Laboratory Objective
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">
                  {task.objective}
                </p>
              </div>

              {/* Step by Step Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Experimental Protocol:
                </span>
                {task.steps.map((st, i) => {
                  const isChecked = !!checkedSteps[i]
                  return (
                    <button
                      key={i}
                      onClick={() => handleToggleStep(i)}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-purple-950/60 border-purple-500/60 text-purple-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-400/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                        isChecked ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isChecked ? '✓' : i + 1}
                      </div>
                      <span className={isChecked ? 'line-through opacity-80' : ''}>{st}</span>
                    </button>
                  )
                })}
              </div>

              {/* Expected Output */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-purple-400 block mb-1">Expected Outcome:</strong>
                {task.expectedResult}
              </div>
            </div>

            {/* Patch Action if glitched */}
            {deviceStatus === 'glitched' && (
              <div className="pt-2 animate-bounce">
                <button
                  onClick={handleDeployPatch}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <RefreshCw size={16} />
                  <span>Deploy Subsystem Patch Hotfix Now</span>
                </button>
              </div>
            )}
          </div>

          {/* Virtual Terminal Console (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider flex items-center gap-2">
                  <Terminal size={14} /> Virtual Hardware Terminal Console
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                  deviceStatus === 'normal'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : deviceStatus === 'glitched'
                    ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                    : 'bg-purple-950 text-purple-300 border-purple-800'
                }`}>
                  STATUS: {deviceStatus.toUpperCase()}
                </span>
              </div>

              {/* Terminal Screen */}
              <div className="flex-1 bg-black p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-y-auto max-h-[300px] space-y-1.5 shadow-inner">
                {terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('[ALERT]') || log.includes('[ERROR]')
                        ? 'text-rose-400 font-bold'
                        : log.includes('[SUCCESS]') || log.includes('[RESOLVED]')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('[PATCH]')
                        ? 'text-cyan-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Advance to Section 7 */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onJumpToSection(6)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
              >
                <span>Proceed to Section 7: Creative Maker Studio</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
