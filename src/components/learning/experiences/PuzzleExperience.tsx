import React, { useState } from 'react'
import { Puzzle, Lock, Unlock, Key } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 5. PUZZLE EXPERIENCE ────────────────────────────────────────────────────
// Structure: AI Logic Escape Room with locked gates, code tiles, tumbler animations, and key unlock rewards
export const PuzzleExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [unlockedGates, setUnlockedGates] = useState<number[]>([])
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, string>>({})
  const [errorGate, setErrorGate] = useState<number | null>(null)

  const puzzleGates = config?.puzzleGates || [
    {
      id: 0,
      name: 'Gate 1: Binary Logic Gate',
      prompt: 'If sensor A detects an obstacle (1) AND sensor B detects safe road (0), what is output of AND gate?',
      options: ['0 (Stop)', '1 (Go Full Speed)'],
      correctAnswer: '0 (Stop)',
      hint: 'AND gate requires BOTH inputs to be 1 to output 1.',
    },
    {
      id: 1,
      name: 'Gate 2: Pattern Sequence Code',
      prompt: 'Sequence: [Pixels -> Edges -> Shapes -> ?]. What is the next layer of abstraction?',
      options: ['Whole Objects', 'Raw Electricity', 'Plastic Cover'],
      correctAnswer: 'Whole Objects',
      hint: 'Deep learning progresses from simple lines to complex objects.',
    },
    {
      id: 2,
      name: 'Gate 3: Safe Firewall Key',
      prompt: 'Which data item should NEVER be fed into an unencrypted public AI model?',
      options: ['Student Private Password', 'Public Weather Report', 'Photos of Mountains'],
      correctAnswer: 'Student Private Password',
      hint: 'Protect Personally Identifiable Information (PII) at all costs.',
    },
  ]

  const handleSelectOption = (gateIdx: number, val: string) => {
    setCurrentAnswers({ ...currentAnswers, [gateIdx]: val })
  }

  const handleUnlockGate = (gateIdx: number) => {
    const gate = puzzleGates[gateIdx]
    const chosen = currentAnswers[gateIdx]
    if (chosen === gate.correctAnswer) {
      gameAudio.playSuccess()
      const nextUnlocked = [...unlockedGates, gateIdx]
      setUnlockedGates(nextUnlocked)

      if (nextUnlocked.length === puzzleGates.length) {
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      }
    } else {
      gameAudio.playWrong()
      setErrorGate(gateIdx)
      setTimeout(() => setErrorGate(null), 1500)
    }
  }

  const allUnlocked = unlockedGates.length === puzzleGates.length

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Puzzle Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-pink-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-400/40 flex items-center justify-center">
            <Puzzle size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Logic Escape Chamber</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5">
          <Key size={14} className="text-amber-400" />
          Gates Unlocked: {unlockedGates.length} / {puzzleGates.length}
        </div>
      </div>

      {/* Logic Gate Chamber Cards */}
      <div className="space-y-4">
        {puzzleGates.map((gate: any, idx: number) => {
          const isGateUnlocked = unlockedGates.includes(idx)
          const isError = errorGate === idx
          return (
            <div
              key={gate.id}
              className={`p-6 rounded-3xl border-2 transition-all ${
                isGateUnlocked
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : isError
                  ? 'bg-rose-950/40 border-rose-500/60 ring-2 ring-rose-500/30'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  {isGateUnlocked ? (
                    <Unlock size={18} className="text-emerald-400" />
                  ) : (
                    <Lock size={18} className="text-pink-400" />
                  )}
                  {gate.name}
                </h3>
                {isGateUnlocked && (
                  <span className="text-xs font-black text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/20">
                    ✓ Unlocked
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 mb-4">{gate.prompt}</p>

              {!isGateUnlocked ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gate.options.map((opt: string, optIdx: number) => {
                      const isSelected = currentAnswers[idx] === opt
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(idx, opt)}
                          className={`p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-pink-500/20 border-pink-400 text-white ring-2 ring-pink-400/40'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-pink-500/40'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">💡 Hint: {gate.hint}</span>
                    <button
                      disabled={!currentAnswers[idx]}
                      onClick={() => handleUnlockGate(idx)}
                      className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white font-bold text-xs shadow-md"
                    >
                      Turn Key & Unlock →
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-emerald-300">Gate bypassed! Correct key: {gate.correctAnswer}</p>
              )}
            </div>
          )
        })}
      </div>

      {allUnlocked && (
        <SuccessCelebration
          title="🎉 Escape Chamber Cleared!"
          subtitle={`You bypassed all ${puzzleGates.length} logic security gates for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
