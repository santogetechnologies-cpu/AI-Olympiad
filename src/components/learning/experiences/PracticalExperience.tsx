import React, { useState } from 'react'
import { Terminal, CheckCircle2, Play, Code2 } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 14. PRACTICAL EXPERIENCE ────────────────────────────────────────────────
// Structure: Step-by-step verified lab workbench with live interactive checklist and command runner
export const PracticalExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [activeCodeStep, setActiveCodeStep] = useState(0)
  const [terminalOutput, setTerminalOutput] = useState<string>('Ready for lab execution...')
  const [isRunning, setIsRunning] = useState(false)
  const [labFinished, setLabFinished] = useState(false)

  const tasks = config?.labTasks || [
    {
      id: 0,
      title: 'Initialize Dataset Loader',
      codeSnippet: `import torchvision.datasets as datasets\ntrain_set = datasets.CIFAR10(root='./data', train=True, download=True)\nprint(f"Loaded {len(train_set)} training samples.")`,
      expectedOutput: '[INFO] Initializing CIFAR-10 data loader...\n[SUCCESS] Loaded 50000 training samples into tensor memory.',
    },
    {
      id: 1,
      title: 'Define Convolutional Feature Extractor',
      codeSnippet: `import torch.nn as nn\nconv_block = nn.Sequential(\n    nn.Conv2d(3, 32, kernel_size=3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2, 2)\n)\nprint("Conv layer parameters registered.")`,
      expectedOutput: '[INFO] Compiling Conv2D kernel weights (3x3)...\n[SUCCESS] Conv layer parameters registered. Output shape: [Batch, 32, 16, 16].',
    },
    {
      id: 2,
      title: 'Execute Backprop Loss Optimization',
      codeSnippet: `optimizer = torch.optim.Adam(model.parameters(), lr=0.001)\nloss.backward()\noptimizer.step()\nprint("Weight tensors updated successfully.")`,
      expectedOutput: '[INFO] Computing autograd Jacobians...\n[SUCCESS] Gradient descent step applied. Loss reduced from 1.84 -> 0.42.',
    },
  ]

  const handleRunStep = (idx: number) => {
    gameAudio.playTap()
    setIsRunning(true)
    setTerminalOutput(`Executing task: ${tasks[idx].title}...\nCompiling Python script environment...`)

    setTimeout(() => {
      setTerminalOutput(tasks[idx].expectedOutput)
      setIsRunning(false)
      gameAudio.playSuccess()

      if (!completedSteps.includes(idx)) {
        const next = [...completedSteps, idx]
        setCompletedSteps(next)
        if (next.length === tasks.length) {
          setLabFinished(true)
          gamification.launchConfetti()
          if (!isCompleted) onComplete()
        }
      }
    }, 900)
  }

  const currentTask = tasks[activeCodeStep] || tasks[0]

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Practical Lab Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 flex items-center justify-center">
            <Terminal size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Practical Laboratory Workbench</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Tasks Verified: {completedSteps.length} / {tasks.length}
        </div>
      </div>

      {/* Lab Tasks & Terminal Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Step Checklist & Code */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-2">
            {tasks.map((task: any, idx: number) => {
              const isDone = completedSteps.includes(idx)
              const isActive = activeCodeStep === idx
              return (
                <div
                  key={task.id}
                  onClick={() => setActiveCodeStep(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-indigo-950/60 border-indigo-400 text-white'
                      : isDone
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm">
                      Task {idx + 1}: {task.title}
                    </span>
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Pending</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Task Code Editor Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Code2 size={14} /> main_experiment.py
              </span>
              <span>Python 3.11</span>
            </div>
            <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {currentTask.codeSnippet}
            </pre>
            <button
              disabled={isRunning}
              onClick={() => handleRunStep(activeCodeStep)}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Play size={14} /> Execute & Verify Task {activeCodeStep + 1}
            </button>
          </div>
        </div>

        {/* Right: Simulated Kernel Output Terminal */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950/90 border-2 border-slate-800 font-mono text-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Live Kernel Terminal
              </span>
              <span>Host: NVIDIA Jetson TensorRT</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed min-h-[160px]">
              {terminalOutput}
            </pre>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            Tip: Complete all {tasks.length} practical stages to earn your verified Practical Lab Certificate.
          </div>
        </div>
      </div>

      {labFinished && (
        <SuccessCelebration
          title="🎉 Practical Lab Successfully Completed!"
          subtitle={`All code blocks executed with clean convergence telemetry for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
