import React, { useState } from 'react'
import { Search, ShieldAlert, FileText, Check } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 3. MYSTERY EXPERIENCE ───────────────────────────────────────────────────
// Structure: Cyber forensic dossier, evidence pinboard, suspect glitch analyzer, and deduction check
export const MysteryExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [inspectedClues, setInspectedClues] = useState<number[]>([])
  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null)

  const clues = config?.mysteryClues || [
    {
      id: 0,
      title: 'Sensor Glitch Log',
      evidence: 'Camera sensor timestamps show sudden 500ms delay during nighttime lighting transitions.',
      suspectHint: 'Points to inadequate low-light training samples or exposure latency.',
    },
    {
      id: 1,
      title: 'Confidence Drop Anomaly',
      evidence: 'Model classification accuracy dropped from 99% to 41% when reflective rain puddles appeared.',
      suspectHint: 'The training dataset contained only bright sunny weather images.',
    },
    {
      id: 2,
      title: 'Feedback Loop Telemetry',
      evidence: 'The control subsystem tried to apply dry-asphalt braking formulas to wet surfaces.',
      suspectHint: 'Physical friction models were hardcoded without dynamic road condition sensing.',
    },
  ]

  const suspects = config?.mysterySuspects || [
    {
      id: 0,
      name: 'Root Cause A: Insufficient Dataset Diversity',
      detail: 'The AI never learned rainy or nighttime conditions during its training phase.',
      isCorrect: true,
    },
    {
      id: 1,
      name: 'Root Cause B: Broken Battery Cell',
      detail: 'The electric battery dropped voltage causing system crash.',
      isCorrect: false,
    },
    {
      id: 2,
      name: 'Root Cause C: Malicious Hacker Signal',
      detail: 'An external radio jammer blocked the AI network.',
      isCorrect: false,
    },
  ]

  const handleInspectClue = (idx: number) => {
    gameAudio.playTap()
    if (!inspectedClues.includes(idx)) {
      setInspectedClues([...inspectedClues, idx])
    }
  }

  const handleDeduce = () => {
    if (selectedSuspect === null) return
    const suspect = suspects[selectedSuspect]
    if (suspect.isCorrect) {
      gameAudio.playSuccess()
      setSolved(true)
      gamification.launchConfetti()
      setFeedbackMsg('🎉 Case Solved! Dataset bias and lack of environmental variety was the true root cause!')
      if (!isCompleted) onComplete()
    } else {
      gameAudio.playWrong()
      setFeedbackMsg('❌ Deduction rejected. Re-inspect the evidence clues on the pinboard!')
    }
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Mystery Case Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-rose-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/40 flex items-center justify-center">
            <Search size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Forensic Investigation Desk</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">Case File: {topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Clues Inspected: {inspectedClues.length} / {clues.length}
        </div>
      </div>

      {/* Forensic Clue Pinboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clues.map((clue: any, idx: number) => {
          const isInspected = inspectedClues.includes(idx)
          return (
            <div
              key={clue.id}
              onClick={() => handleInspectClue(idx)}
              className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                isInspected
                  ? 'bg-slate-900/90 border-rose-500/50 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} /> Clue #{idx + 1}
                </span>
                {isInspected && <Check size={14} className="text-emerald-400" />}
              </div>
              <h4 className="font-bold text-white text-sm mb-2">{clue.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{clue.evidence}</p>
              {isInspected && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300">
                  🔎 {clue.suspectHint}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Suspect Anomaly Deduction Deck */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border-2 border-rose-500/30 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert size={22} className="text-rose-400" />
          <h3 className="text-lg font-bold text-white">Deliver Your Final Verdict: What caused the anomaly?</h3>
        </div>

        <div className="space-y-3">
          {suspects.map((suspect: any, idx: number) => {
            const isSelected = selectedSuspect === idx
            return (
              <button
                key={suspect.id}
                disabled={solved}
                onClick={() => setSelectedSuspect(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-400 text-white ring-2 ring-rose-400/30'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-rose-400/50'
                }`}
              >
                <div className="font-bold text-sm text-white mb-1">{suspect.name}</div>
                <div className="text-xs text-slate-400">{suspect.detail}</div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            disabled={selectedSuspect === null || solved}
            onClick={handleDeduce}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-40 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
          >
            {solved ? '✓ Verdict Confirmed' : 'Stamp Forensic Verdict →'}
          </button>
          {feedbackMsg && (
            <span className={`text-xs font-bold ${solved ? 'text-emerald-400' : 'text-rose-400'}`}>
              {feedbackMsg}
            </span>
          )}
        </div>
      </div>

      {solved && (
        <SuccessCelebration
          title="🎉 Mystery Successfully Solved!"
          subtitle={`You identified the dataset variance bug and resolved the case for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
