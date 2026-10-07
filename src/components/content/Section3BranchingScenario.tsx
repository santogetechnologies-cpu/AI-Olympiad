import { useState } from 'react'
import {
  Compass, CheckCircle2,
  Sparkles, RefreshCw
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import type { CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export function Section3BranchingScenario({
  section,
  chapterTitle: _chapterTitle,
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterTitle?: string
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(section.topicTitle || section.title)

  const [selectedBranch, setSelectedBranch] = useState<number | null>(null)
  const [testedBranches, setTestedBranches] = useState<number[]>([])

  const branches = [
    {
      id: 0,
      title: 'Branch Alpha: Fast Heuristic Rule',
      action: 'Apply immediate rule based on previous top 3 historical cases.',
      outcome: 'Quick execution (2ms), but misses rare edge cases during heavy rain or noise.',
      score: 75,
      status: 'Sub-Optimal: Fast but fragile',
      isOptimal: false,
    },
    {
      id: 1,
      title: 'Branch Beta: Multi-Sensor Consensus',
      action: 'Cross-validate camera input with radar and rule thresholds before acting.',
      outcome: '100% reliable detection. Zero false alarms and balanced processing speed.',
      score: 100,
      status: 'Optimal Route: Safe, robust and fair',
      isOptimal: true,
    },
    {
      id: 2,
      title: 'Branch Gamma: Strict Manual Override',
      action: 'Halt all processing and request human supervisor intervention.',
      outcome: 'Safe, but causes a 30-minute delay and stops all autonomous flow.',
      score: 60,
      status: 'Fallback Route: Heavy latency penalty',
      isOptimal: false,
    },
  ]

  const handleSelectBranch = (idx: number) => {
    setSelectedBranch(idx)
    if (!testedBranches.includes(idx)) {
      const next = [...testedBranches, idx]
      setTestedBranches(next)
      if (branches[idx].isOptimal) {
        gamification.addXP(25, undefined, `scenario-optimal-${section.id}`)
        gamification.launchConfetti()
        toast.success('🌟 Optimal Path Found! Balanced accuracy and safety!')
      }
    }
  }

  const currentOutcome = selectedBranch !== null ? branches[selectedBranch] : null

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
            <Compass size={16} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
              Interactive Choose-Your-Path Mission
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
          Paths Tested: {testedBranches.length}/{branches.length}
        </span>
      </div>

      {/* Scenario Situation Card */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white p-5 rounded-3xl border-2 border-purple-900 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} /> Active Situation Briefing:
        </div>

        <p className="text-sm text-slate-200 font-medium leading-relaxed">
          {profile.realScenario || `An unexpected anomaly was reported in the operating environment for ${section.topicTitle || section.title}. As the lead system architect, choose the strategic pipeline path to dispatch:`}
        </p>

        <div className="text-xs text-purple-300 italic">
          Try different branches to observe how each strategy impacts safety, speed, and reliability.
        </div>
      </div>

      {/* Branch Selection Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Choose a strategy branch to simulate:
        </span>

        <div className="grid grid-cols-1 gap-2.5">
          {branches.map((b, idx) => {
            const isSelected = selectedBranch === idx
            const isTested = testedBranches.includes(idx)

            return (
              <button
                key={b.id}
                onClick={() => handleSelectBranch(idx)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg scale-101 ring-2 ring-purple-300'
                    : isTested
                    ? 'bg-purple-50/70 border-purple-200 text-slate-800 hover:bg-purple-100/60'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 shadow-xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-black flex items-center gap-2">
                    <span>{b.id === 1 ? '🌟' : '⚡'}</span>
                    {b.title}
                  </div>
                  <div className={`text-[11px] ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                    {b.action}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {isTested && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      b.isOptimal
                        ? isSelected ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-emerald-100 text-emerald-800'
                        : isSelected ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Score: {b.score}%
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Branch Simulation Result Card */}
      {currentOutcome && (
        <div className={`p-4 sm:p-5 rounded-3xl border-2 space-y-2 animate-in fade-in zoom-in-95 duration-200 ${
          currentOutcome.isOptimal
            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
              currentOutcome.isOptimal
                ? 'bg-emerald-200 border-emerald-400 text-emerald-900'
                : 'bg-amber-200 border-amber-400 text-amber-900'
            }`}>
              {currentOutcome.status}
            </span>
            <button
              onClick={() => setSelectedBranch(null)}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={12} /> Test Another Branch
            </button>
          </div>

          <h4 className="text-sm font-black">
            Simulation Outcome:
          </h4>

          <p className="text-xs font-medium leading-relaxed">
            {currentOutcome.outcome}
          </p>
        </div>
      )}

      {/* Advance button */}
      <button
        onClick={onComplete}
        className="w-full py-3.5 rounded-2xl font-black text-sm bg-purple-600 hover:bg-purple-500 text-white cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
      >
        <CheckCircle2 size={18} />
        Complete Mission & Continue
      </button>
    </div>
  )
}
