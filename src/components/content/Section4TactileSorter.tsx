import { useState } from 'react'
import {
  Sparkles, CheckCircle2, RotateCcw,
  Award
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import type { CanonicalSection } from './AssignedImageSlot'

export function Section4TactileSorter({
  section,
  gradeKey: _gradeKey,
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

  // 4 sequential steps to sort into proper execution order
  const initialSteps = [
    { id: 'step-eval', title: 'Evaluate Model Prediction', desc: 'Verify confidence score against safety threshold.', expectedPos: 3, icon: '⚖️' },
    { id: 'step-input', title: 'Capture Raw Sensor Inputs', desc: 'Camera, audio, or telemetry data ingested.', expectedPos: 1, icon: '📥' },
    { id: 'step-act', title: 'Trigger Real-World Action', desc: 'Display recommendation or steer safely.', expectedPos: 4, icon: '🚀' },
    { id: 'step-clean', title: 'Filter Noise & Normalize', desc: 'Remove glare, static, and corrupted pixels.', expectedPos: 2, icon: '🧹' },
  ]

  const [orderedSteps, setOrderedSteps] = useState(initialSteps)
  const [isSortedCorrectly, setIsSortedCorrectly] = useState(false)

  const moveUp = (index: number) => {
    if (index === 0) return
    const next = [...orderedSteps]
    const temp = next[index]
    next[index] = next[index - 1]
    next[index - 1] = temp
    setOrderedSteps(next)
    checkOrder(next)
  }

  const moveDown = (index: number) => {
    if (index === orderedSteps.length - 1) return
    const next = [...orderedSteps]
    const temp = next[index]
    next[index] = next[index + 1]
    next[index + 1] = temp
    setOrderedSteps(next)
    checkOrder(next)
  }

  const checkOrder = (steps: typeof initialSteps) => {
    const isCorrect = steps.every((s, idx) => s.expectedPos === idx + 1)
    if (isCorrect) {
      setIsSortedCorrectly(true)
      gamification.addXP(25, undefined, `tactile-sorter-${section.id}`)
      gamification.launchConfetti()
      toast.success('🎉 Perfect Execution Order! The AI pipeline flow is properly aligned!')
    }
  }

  const reset = () => {
    setOrderedSteps(initialSteps)
    setIsSortedCorrectly(false)
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
            🧩
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
              Tactile Pipeline Sorting Challenge
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <button
          onClick={reset}
          className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Description Card */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-4 text-xs text-amber-950 font-medium space-y-1">
        <div className="font-black flex items-center gap-1 text-amber-800">
          <Sparkles size={14} /> Arrange the AI Decision Steps in Order (1 to 4):
        </div>
        <p className="text-slate-600">
          In {section.topicTitle || 'intelligent computing'}, tasks must run in logical pipeline order. Use the up and down arrows to place each step from start to finish!
        </p>
      </div>

      {/* Reorderable Step Cards */}
      <div className="space-y-2">
        {orderedSteps.map((step, idx) => {
          const isAtCorrectSpot = step.expectedPos === idx + 1
          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs ${
                isSortedCorrectly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-1 ring-emerald-400/30'
                  : isAtCorrectSpot
                  ? 'bg-white border-blue-200 text-slate-800'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  isSortedCorrectly || isAtCorrectSpot
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx + 1}
                </span>

                <span className="text-2xl">{step.icon}</span>

                <div>
                  <h4 className="text-xs font-black text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{step.desc}</p>
                </div>
              </div>

              {/* Arrow controls */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0 || isSortedCorrectly}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === orderedSteps.length - 1 || isSortedCorrectly}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ▼
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {isSortedCorrectly && (
        <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-3xl text-center space-y-2 animate-in fade-in duration-300">
          <Award size={28} className="text-emerald-600 mx-auto" />
          <h4 className="text-sm font-black text-emerald-950">Optimal Pipeline Sequence Established!</h4>
          <p className="text-xs text-emerald-800 font-medium max-w-sm mx-auto">
            Input → Clean & Normalize → Model Evaluation → Safe Action is the universal architecture of modern AI systems.
          </p>
        </div>
      )}

      {/* Completion */}
      <button
        onClick={onComplete}
        className="w-full py-3.5 rounded-2xl font-black text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
      >
        <CheckCircle2 size={18} />
        Complete Step & Continue
      </button>
    </div>
  )
}
