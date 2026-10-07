import React, { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  RefreshCw,
  Eye,
  Sliders,
  Layers,
  Search,
  Puzzle,
  FileQuestion,
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'

// ─── 1. MCQ ACTIVITY ────────────────────────────────────────────────────────
export interface MCQActivityProps {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  hint?: string
  xpReward?: number
  onComplete?: () => void
}

export const MCQActivity: React.FC<MCQActivityProps> = ({
  question,
  options,
  correctIndex,
  explanation,
  hint,
  xpReward = 15,
  onComplete,
}) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const isCorrect = selected === correctIndex

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelected(idx)
    setIsAnswered(true)

    if (idx === correctIndex) {
      gameAudio.playSuccess()
      gamification.launchConfetti()
      if (onComplete) onComplete()
    } else {
      gameAudio.playWrong()
    }
  }

  const handleRetry = () => {
    setSelected(null)
    setIsAnswered(false)
    setShowHint(false)
  }

  return (
    <div className="bg-slate-900/90 border-2 border-indigo-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <FileQuestion size={16} /> Knowledge Check
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/30">
          +{xpReward} XP
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">{question}</h3>

      <div className="space-y-3">
        {options.map((option, idx) => {
          let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-indigo-400 text-slate-200'
          if (isAnswered) {
            if (idx === correctIndex) {
              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-bold ring-2 ring-emerald-500/30'
            } else if (idx === selected) {
              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-100'
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-700/80 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isAnswered && idx === correctIndex && <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />}
              {isAnswered && idx === selected && idx !== correctIndex && <XCircle size={20} className="text-rose-400 shrink-0" />}
            </button>
          )
        })}
      </div>

      {hint && !isAnswered && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1.5"
          >
            <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              💡 {hint}
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-sm leading-relaxed ${
            isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-black flex items-center gap-1.5">
              {isCorrect ? '🎉 Correct!' : '❌ Not Quite Right'}
            </span>
            {!isCorrect && (
              <button
                onClick={handleRetry}
                className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1"
              >
                <RefreshCw size={12} /> Try Again
              </button>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300">{explanation}</p>
        </div>
      )}
    </div>
  )
}

// ─── 2. MATCHING ACTIVITY ───────────────────────────────────────────────────
export interface MatchingPair {
  id: string
  term: string
  definition: string
}

export interface MatchingActivityProps {
  title?: string
  pairs: MatchingPair[]
  xpReward?: number
  onComplete?: () => void
}

export const MatchingActivity: React.FC<MatchingActivityProps> = ({
  title = 'Match the Concepts',
  pairs,
  xpReward = 20,
  onComplete,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedDef, setSelectedDef] = useState<string | null>(null)
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [wrongFlash, setWrongFlash] = useState(false)
  const [shuffledDefs] = useState(() => [...pairs].sort(() => Math.random() - 0.5))

  const handleSelectTerm = (id: string) => {
    if (matchedIds.includes(id)) return
    setSelectedTerm(id)
    if (selectedDef) evaluatePair(id, selectedDef)
  }

  const handleSelectDef = (id: string) => {
    if (matchedIds.includes(id)) return
    setSelectedDef(id)
    if (selectedTerm) evaluatePair(selectedTerm, id)
  }

  const evaluatePair = (tId: string, dId: string) => {
    if (tId === dId) {
      gameAudio.playSuccess()
      const next = [...matchedIds, tId]
      setMatchedIds(next)
      setSelectedTerm(null)
      setSelectedDef(null)
      if (next.length === pairs.length) {
        gamification.launchConfetti()
        if (onComplete) onComplete()
      }
    } else {
      gameAudio.playWrong()
      setWrongFlash(true)
      setTimeout(() => {
        setSelectedTerm(null)
        setSelectedDef(null)
        setWrongFlash(false)
      }, 700)
    }
  }

  return (
    <div className="bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-cyan-400" /> {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
            +{xpReward} XP
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
            Matched: {matchedIds.length} / {pairs.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Term Cards */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concept Key</p>
          {pairs.map(p => {
            const isMatched = matchedIds.includes(p.id)
            const isSelected = selectedTerm === p.id
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectTerm(p.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-bold text-sm ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 opacity-60'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400/40'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500/50'
                }`}
              >
                {p.term}
              </button>
            )
          })}
        </div>

        {/* Definition Cards */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meaning & Analogy</p>
          {shuffledDefs.map(p => {
            const isMatched = matchedIds.includes(p.id)
            const isSelected = selectedDef === p.id
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectDef(p.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm leading-relaxed ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 opacity-60'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400/40'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                {p.definition}
              </button>
            )
          })}
        </div>
      </div>

      {wrongFlash && (
        <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-center text-xs font-bold text-rose-300 animate-shake">
          ❌ Not a match. Try pairing another term and meaning!
        </div>
      )}
    </div>
  )
}

// ─── 3. SORTING / ORDERING ACTIVITY ─────────────────────────────────────────
export interface StepItem {
  id: string
  label: string
  detail: string
  order: number
}

export interface OrderingActivityProps {
  title?: string
  steps: StepItem[]
  xpReward?: number
  onComplete?: () => void
}

export const OrderingActivity: React.FC<OrderingActivityProps> = ({
  title = 'Arrange in Proper Sequence',
  steps,
  xpReward = 20,
  onComplete,
}) => {
  const [currentOrder, setCurrentOrder] = useState(() =>
    [...steps].sort(() => Math.random() - 0.5)
  )
  const [checked, setChecked] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const moveUp = (idx: number) => {
    if (idx <= 0) return
    const updated = [...currentOrder]
    const temp = updated[idx - 1]
    updated[idx - 1] = updated[idx]
    updated[idx] = temp
    setCurrentOrder(updated)
    setChecked(false)
  }

  const moveDown = (idx: number) => {
    if (idx >= currentOrder.length - 1) return
    const updated = [...currentOrder]
    const temp = updated[idx + 1]
    updated[idx + 1] = updated[idx]
    updated[idx] = temp
    setCurrentOrder(updated)
    setChecked(false)
  }

  const checkSequence = () => {
    const sorted = [...currentOrder].every((s, i) => s.order === i + 1)
    setChecked(true)
    setIsSuccess(sorted)
    if (sorted) {
      gameAudio.playSuccess()
      gamification.launchConfetti()
      if (onComplete) onComplete()
    } else {
      gameAudio.playWrong()
    }
  }

  return (
    <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-amber-400" /> {title}
        </h3>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
          +{xpReward} XP
        </span>
      </div>

      <div className="space-y-3">
        {currentOrder.map((step, idx) => (
          <div
            key={step.id}
            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-white"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
              {idx + 1}
            </span>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-slate-100">{step.label}</h4>
              <p className="text-xs text-slate-400">{step.detail}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button
                disabled={idx === 0}
                onClick={() => moveUp(idx)}
                className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs flex items-center justify-center"
              >
                ▲
              </button>
              <button
                disabled={idx === currentOrder.length - 1}
                onClick={() => moveDown(idx)}
                className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs flex items-center justify-center"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={checkSequence}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm shadow-md"
        >
          Verify Pipeline Order →
        </button>
        {checked && isSuccess && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Perfect Pipeline Order!
          </span>
        )}
        {checked && !isSuccess && (
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <XCircle size={16} /> Order isn't quite right. Review which comes first!
          </span>
        )}
      </div>
    </div>
  )
}

export const SortingActivity = OrderingActivity

// ─── 4. DRAG & DROP / CATEGORIZATION ACTIVITY ───────────────────────────────
export interface DragDropItem {
  id: string
  label: string
  correctZone: 'ai' | 'not_ai'
}

export interface DragDropActivityProps {
  title?: string
  items: DragDropItem[]
  xpReward?: number
  onComplete?: () => void
}

export const DragDropActivity: React.FC<DragDropActivityProps> = ({
  title = 'Sort into Zones',
  items,
  xpReward = 20,
  onComplete,
}) => {
  const [assigned, setAssigned] = useState<Record<string, 'ai' | 'not_ai'>>({})
  const [checked, setChecked] = useState(false)
  const [allCorrect, setAllCorrect] = useState(false)

  const handleAssign = (itemId: string, zone: 'ai' | 'not_ai') => {
    setAssigned(prev => ({ ...prev, [itemId]: zone }))
    setChecked(false)
  }

  const handleVerify = () => {
    const correct = items.every(item => assigned[item.id] === item.correctZone)
    setChecked(true)
    setAllCorrect(correct)
    if (correct) {
      gameAudio.playSuccess()
      gamification.launchConfetti()
      if (onComplete) onComplete()
    } else {
      gameAudio.playWrong()
    }
  }

  return (
    <div className="bg-slate-900/90 border-2 border-indigo-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-indigo-400" /> {title}
        </h3>
        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
          +{xpReward} XP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zone 1: Uses AI */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/40 space-y-3">
          <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
            🤖 Uses AI & Machine Learning
          </h4>
          <div className="min-h-[140px] space-y-2">
            {items
              .filter(i => assigned[i.id] === 'ai')
              .map(i => (
                <div
                  key={i.id}
                  className="p-3 rounded-xl bg-indigo-900/60 border border-indigo-400/40 text-white text-xs font-bold flex items-center justify-between"
                >
                  <span>{i.label}</span>
                  <button
                    onClick={() => handleAssign(i.id, 'not_ai')}
                    className="text-[10px] text-indigo-300 hover:text-white underline ml-2"
                  >
                    Move →
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Zone 2: Regular Technology */}
        <div className="p-4 rounded-2xl bg-slate-950/40 border-2 border-slate-700/60 space-y-3">
          <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            ⚙️ Standard Rule-Based / Hardware
          </h4>
          <div className="min-h-[140px] space-y-2">
            {items
              .filter(i => assigned[i.id] === 'not_ai')
              .map(i => (
                <div
                  key={i.id}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-600 text-white text-xs font-bold flex items-center justify-between"
                >
                  <span>{i.label}</span>
                  <button
                    onClick={() => handleAssign(i.id, 'ai')}
                    className="text-[10px] text-slate-300 hover:text-white underline ml-2"
                  >
                    ← Move
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Unassigned Pool */}
      {items.some(i => !assigned[i.id]) && (
        <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
          <p className="text-xs font-bold text-slate-400">Tap to categorize remaining items:</p>
          <div className="flex flex-wrap gap-2">
            {items
              .filter(i => !assigned[i.id])
              .map(i => (
                <div key={i.id} className="p-2.5 rounded-xl bg-slate-700 text-white text-xs font-semibold flex items-center gap-2">
                  <span>{i.label}</span>
                  <button
                    onClick={() => handleAssign(i.id, 'ai')}
                    className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold"
                  >
                    AI
                  </button>
                  <button
                    onClick={() => handleAssign(i.id, 'not_ai')}
                    className="px-2 py-0.5 rounded bg-slate-600 hover:bg-slate-500 text-[10px] font-bold"
                  >
                    Standard
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleVerify}
          disabled={items.some(i => !assigned[i.id])}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:opacity-40 text-white font-bold text-sm shadow-md"
        >
          Check Classifications →
        </button>
        {checked && allCorrect && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> All Classified Accurately!
          </span>
        )}
        {checked && !allCorrect && (
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <XCircle size={16} /> Some items need re-thinking. Try adjusting!
          </span>
        )}
      </div>
    </div>
  )
}

// ─── 5. PREDICTION ACTIVITY ─────────────────────────────────────────────────
export interface PredictionActivityProps {
  scenario: string
  question: string
  options: { text: string; outcome: string; isOptimal: boolean }[]
  xpReward?: number
  onComplete?: () => void
}

export const PredictionActivity: React.FC<PredictionActivityProps> = ({
  scenario,
  question,
  options,
  xpReward = 20,
  onComplete,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handlePredict = (idx: number) => {
    setSelectedIdx(idx)
    setRevealed(true)
    if (options[idx].isOptimal) {
      gameAudio.playSuccess()
      gamification.launchConfetti()
      if (onComplete) onComplete()
    } else {
      gameAudio.playTap()
    }
  }

  return (
    <div className="bg-slate-900/90 border-2 border-emerald-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Eye size={16} /> Scenario Prediction Trial
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
          +{xpReward} XP
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 text-sm leading-relaxed">
        <strong>Context:</strong> {scenario}
      </div>

      <h4 className="text-base sm:text-lg font-bold text-white">{question}</h4>

      <div className="space-y-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            disabled={revealed}
            onClick={() => handlePredict(idx)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm font-semibold ${
              revealed && idx === selectedIdx
                ? opt.isOptimal
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30'
                  : 'bg-amber-950/80 border-amber-500 text-amber-100'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-emerald-500/50'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {revealed && selectedIdx !== null && (
        <div className="p-4 rounded-2xl bg-slate-800/90 border border-emerald-500/30 space-y-2 animate-in fade-in">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Outcome Revealed:</p>
          <p className="text-sm text-slate-200 leading-relaxed">{options[selectedIdx].outcome}</p>
        </div>
      )}
    </div>
  )
}

// ─── 6. SCENARIO / BRANCHING DECISION ACTIVITY ──────────────────────────────
export const ScenarioActivity = PredictionActivity

// ─── 7. DISCOVERY / HOTSPOT REVEAL ACTIVITY ─────────────────────────────────
export interface DiscoveryActivityProps {
  title?: string
  clues: { id: string; label: string; clueText: string; icon?: string }[]
  xpReward?: number
  onComplete?: () => void
}

export const DiscoveryActivity: React.FC<DiscoveryActivityProps> = ({
  title = 'Click to Discover Secrets',
  clues,
  xpReward = 20,
  onComplete,
}) => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([])
  const [activeClue, setActiveClue] = useState<string | null>(null)

  const handleDiscover = (id: string) => {
    gameAudio.playTap()
    setActiveClue(id)
    if (!discoveredIds.includes(id)) {
      const next = [...discoveredIds, id]
      setDiscoveredIds(next)
      if (next.length === clues.length) {
        gameAudio.playSuccess()
        gamification.launchConfetti()
        if (onComplete) onComplete()
      }
    }
  }

  const selectedItem = clues.find(c => c.id === activeClue)

  return (
    <div className="bg-slate-900/90 border-2 border-teal-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Search size={18} className="text-teal-400" /> {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
            +{xpReward} XP
          </span>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30">
            Found: {discoveredIds.length} / {clues.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {clues.map(c => {
          const isDone = discoveredIds.includes(c.id)
          const isActive = activeClue === c.id
          return (
            <button
              key={c.id}
              onClick={() => handleDiscover(c.id)}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${
                isActive
                  ? 'bg-teal-500/30 border-teal-400 text-white shadow-lg ring-2 ring-teal-400/40'
                  : isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-teal-500/40'
              }`}
            >
              <div className="text-2xl mb-1">{c.icon || '🔍'}</div>
              <span className="font-bold text-xs">{c.label}</span>
            </button>
          )
        })}
      </div>

      {selectedItem && (
        <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/40 text-slate-200 text-sm leading-relaxed space-y-1">
          <strong className="text-teal-300 block font-bold text-base">{selectedItem.label}</strong>
          <p>{selectedItem.clueText}</p>
        </div>
      )}
    </div>
  )
}

// ─── 8. SIMULATION / PARAMETER SLIDER ACTIVITY ──────────────────────────────
export interface SimulationActivityProps {
  title?: string
  parameterName?: string
  min?: number
  max?: number
  defaultValue?: number
  description?: string
  onComplete?: () => void
}

export const SimulationActivity: React.FC<SimulationActivityProps> = ({
  title = 'Interactive Parameter Simulation',
  parameterName = 'Model Confidence Sensitivity',
  min = 10,
  max = 100,
  defaultValue = 50,
  description = 'Adjust the parameter to see how neural predictions shift in real time.',
  onComplete,
}) => {
  const [val, setVal] = useState(defaultValue)
  const [tested, setTested] = useState(false)

  const handleTest = () => {
    gameAudio.playSuccess()
    setTested(true)
    if (onComplete) onComplete()
  }

  return (
    <div className="bg-slate-900/90 border-2 border-purple-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders size={18} className="text-purple-400" /> {title}
        </h3>
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-black text-xs">
          {val}%
        </span>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{description}</p>

      <div className="space-y-2 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
        <div className="flex justify-between text-xs text-slate-400 font-bold">
          <span>{parameterName}</span>
          <span>{val} / {max}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full accent-purple-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Underfitting / Loose</span>
          <span>Balanced Optimal</span>
          <span>Overfitting / Rigid</span>
        </div>
      </div>

      {/* Simulated Live Output Preview */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block font-semibold">Simulated Accuracy:</span>
          <span className="text-lg font-black text-white">
            {val < 30 ? '62%' : val > 80 ? '71% (Overfitting)' : '94.8% (Optimal)'}
          </span>
        </div>
        <button
          onClick={handleTest}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md"
        >
          {tested ? '✓ Validated' : 'Execute Test Run'}
        </button>
      </div>
    </div>
  )
}

// ─── 9. PUZZLE ACTIVITY ─────────────────────────────────────────────────────
export interface PuzzleActivityProps {
  title?: string
  puzzlePrompt?: string
  correctAnswer?: string
  hint?: string
  onComplete?: () => void
}

export const PuzzleActivity: React.FC<PuzzleActivityProps> = ({
  title = 'AI Logic Puzzle',
  puzzlePrompt = 'If an AI car turns right on Red and left on Blue, what does it do on Purple?',
  correctAnswer = 'both',
  hint = 'Purple is made of Red + Blue combined!',
  onComplete,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [solved, setSolved] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const handleCheck = () => {
    if (inputVal.toLowerCase().trim().includes(correctAnswer.toLowerCase())) {
      gameAudio.playSuccess()
      setSolved(true)
      gamification.launchConfetti()
      if (onComplete) onComplete()
    } else {
      gameAudio.playWrong()
      setErrorMsg(true)
      setTimeout(() => setErrorMsg(false), 2000)
    }
  }

  return (
    <div className="bg-slate-900/90 border-2 border-pink-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Puzzle size={18} className="text-pink-400" /> {title}
        </h3>
      </div>

      <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed">{puzzlePrompt}</p>

      <div className="flex gap-3">
        <input
          type="text"
          value={inputVal}
          disabled={solved}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Type your deduction..."
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-pink-500 outline-none"
        />
        <button
          disabled={solved || !inputVal.trim()}
          onClick={handleCheck}
          className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white font-bold text-sm shadow-md"
        >
          {solved ? '✓ Solved' : 'Check Puzzle'}
        </button>
      </div>

      {errorMsg && <p className="text-xs text-rose-400 font-semibold">Hint: {hint}</p>}
    </div>
  )
}

// ─── 10. MEMORY / FLASHCARD ACTIVITY ────────────────────────────────────────
export const MemoryActivity: React.FC<{
  cards: { front: string; back: string }[]
  onComplete?: () => void
}> = ({ cards, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const nextCard = () => {
    setFlipped(false)
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(i => i + 1)
    } else {
      gameAudio.playSuccess()
      if (onComplete) onComplete()
    }
  }

  const c = cards[currentIdx] || cards[0]

  return (
    <div className="bg-slate-900/90 border-2 border-blue-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl text-center">
      <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
        <span>Card {currentIdx + 1} of {cards.length}</span>
        <span>Tap card to flip</span>
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer min-h-[160px] p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/40 flex flex-col items-center justify-center transition-all hover:scale-[1.02]"
      >
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
          {flipped ? 'Answer / Solution' : 'Question / Concept'}
        </span>
        <p className="text-base sm:text-lg font-black text-white">{flipped ? c.back : c.front}</p>
      </div>

      <button
        onClick={nextCard}
        className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md"
      >
        {currentIdx === cards.length - 1 ? 'Finish Flashcards' : 'Next Card →'}
      </button>
    </div>
  )
}

// ─── 11. INVESTIGATION / FORENSIC ACTIVITY ──────────────────────────────────
export const InvestigationActivity = DiscoveryActivity

// ─── 12. CREATION / MODULAR BUILDER ACTIVITY ────────────────────────────────
export const CreationActivity = OrderingActivity

// ─── MODULAR ACTIVITY REGISTRY ──────────────────────────────────────────────
export const activityRegistry: Record<string, React.ComponentType<any>> = {
  mcq: MCQActivity,
  matching: MatchingActivity,
  sorting: SortingActivity,
  ordering: OrderingActivity,
  dragDrop: DragDropActivity,
  prediction: PredictionActivity,
  scenario: ScenarioActivity,
  discovery: DiscoveryActivity,
  simulation: SimulationActivity,
  puzzle: PuzzleActivity,
  memory: MemoryActivity,
  investigation: InvestigationActivity,
  creation: CreationActivity,
}
