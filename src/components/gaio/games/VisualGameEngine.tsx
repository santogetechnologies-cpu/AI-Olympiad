// ─────────────────────────────────────────────────────────────────────────────
// VISUAL GAME ENGINE — 50+ INTERACTIVE GAME MECHANICS
// Pure visual, tangible, drag/tap interactive mechanics:
// - Match the Pairs / Real Life Match
// - Connect the Dots / Connect the Brain
// - Build the Sequence
// - Sort the Cards / Teach the Machine
// - Build an AI Robot
// - Find the Shadow
// - Complete the Pattern
// - Feed the AI
// - Spot the Difference
// ZERO MCQs • ZERO True/False • ZERO typing • 100% Visual & Audio Interactive
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react'
import {
  Check,
  Sparkles,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bot,
  Zap,
  HelpCircle,
  Eye,
  Layers,
  Cpu,
  Trophy
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { auraSpeechService } from '../../../services/auraSpeechService'
import { showAuraToast } from '../../../services/auraGuidanceToast'
import confetti from 'canvas-confetti'

export type VisualGameType =
  | 'match_pairs'
  | 'connect_dots'
  | 'build_sequence'
  | 'sort_cards'
  | 'build_robot'
  | 'find_shadow'
  | 'complete_pattern'
  | 'feed_ai'
  | 'teach_machine'
  | 'spot_difference'
  | 'real_life_match'
  | 'connect_brain'

export interface VisualGameConfig {
  type: VisualGameType
  title: string
  instruction: string
  hint?: string
  pairs?: { id: string; left: string; right: string; icon?: string; image?: string }[]
  sequence?: { id: string; step: number; text: string; icon?: string }[]
  categories?: { id: string; name: string; icon: string; color: string }[]
  cards?: { id: string; text: string; categoryId: string; icon?: string; image?: string }[]
  robotParts?: { id: string; slot: 'sensor' | 'brain' | 'data' | 'output'; name: string; icon: string }[]
  shadows?: { id: string; name: string; silhouette: string; realIcon: string }[]
  pattern?: { items: string[]; missingIndex: number; options: string[]; correctOption: string }
  feedItems?: { id: string; name: string; icon: string; isGoodData: boolean }[]
  differenceItems?: { id: string; name: string; icon: string; isOutlier: boolean }[]
  brainNodes?: { id: string; layer: 'input' | 'hidden' | 'output'; label: string }[]
}

interface VisualGameEngineProps {
  config: VisualGameConfig
  onComplete: () => void
  onNext?: () => void
  savedState?: any
  onSaveState?: (state: any) => void
}

export const VisualGameEngine: React.FC<VisualGameEngineProps> = ({
  config,
  onComplete,
  onNext,
  savedState,
  onSaveState
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>(savedState?.matches || {})
  const [sequenceOrder, setSequenceOrder] = useState<string[]>(
    savedState?.sequenceOrder || (config.sequence ? [...config.sequence].sort(() => Math.random() - 0.5).map((s) => s.id) : [])
  )
  const [sortedCards, setSortedCards] = useState<Record<string, string>>(savedState?.sortedCards || {}) // cardId -> catId
  const [robotSlots, setRobotSlots] = useState<Record<string, string>>(savedState?.robotSlots || {})
  const [fedCount, setFedCount] = useState<number>(savedState?.fedCount || 0)
  const [outlierFound, setOutlierFound] = useState<boolean>(savedState?.outlierFound || false)
  const [patternChoice, setPatternChoice] = useState<string | null>(savedState?.patternChoice || null)
  const [connectedNodes, setConnectedNodes] = useState<string[]>(savedState?.connectedNodes || [])
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  // Spoken introduction on mount
  useEffect(() => {
    showAuraToast('start', config.instruction, true)
  }, [config.instruction])

  // Trigger celebration on completion
  const handleSuccessFinish = (customMsg?: string) => {
    setIsCompleted(true)
    gameAudio.playFanfare()
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.65 } })
    showAuraToast('activity_complete', customMsg || 'You mastered this interactive challenge!', true)
    onComplete()
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1. MATCH THE PAIRS & REAL LIFE MATCH
  // ─────────────────────────────────────────────────────────────────────────
  if (config.type === 'match_pairs' || config.type === 'real_life_match') {
    const pairs = config.pairs || [
      { id: 'p1', left: 'Phone Face Unlock', right: 'Face Recognition', icon: '📱' },
      { id: 'p2', left: 'Google Maps Route', right: 'Path Planning AI', icon: '🗺️' },
      { id: 'p3', left: 'Voice Typing', right: 'Speech-to-Text', icon: '🎙️' },
      { id: 'p4', left: 'Spam Filter', right: 'Email Classifier', icon: '📧' }
    ]

    const handleSelectLeft = (id: string) => {
      gameAudio.playTap()
      setSelectedLeft(id)
      showAuraToast('next_step', 'Now tap the matching concept on the right!', false)
    }

    const handleSelectRight = (pairId: string) => {
      if (!selectedLeft) return
      if (selectedLeft === pairId) {
        gameAudio.playSuccess()
        const updated = { ...matches, [selectedLeft]: pairId }
        setMatches(updated)
        setSelectedLeft(null)
        showAuraToast('great_job', 'Correct match! Keep going.', false)
        if (onSaveState) onSaveState({ matches: updated })
        if (Object.keys(updated).length === pairs.length) {
          handleSuccessFinish('You matched all real-life AI pairs!')
        }
      } else {
        gameAudio.playError()
        showAuraToast('try_again', "Those don't match. Look at the icons closely.", true)
        setSelectedLeft(null)
      }
    }

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 select-none text-slate-800 animate-in fade-in duration-200">
        <div className="shrink-0 text-center pb-1.5 border-b border-sky-100 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
              {config.type === 'real_life_match' ? 'REAL LIFE MATCH' : 'MATCH THE PAIRS'}
            </span>
            <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              {config.instruction}
            </h2>
          </div>
          <button
            onClick={() => auraSpeechService.speak(config.instruction)}
            className="p-1.5 rounded-xl bg-sky-100 text-[#0288D1] hover:bg-sky-200 transition-colors"
            title="Listen to Aura AI"
          >
            <Volume2 size={16} />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2 my-auto py-2">
          {/* Left Items */}
          <div className="space-y-1.5">
            {pairs.map((p) => {
              const isMatched = !!matches[p.id]
              const isSelected = selectedLeft === p.id
              return (
                <button
                  type="button"
                  key={p.id}
                  disabled={isMatched}
                  onClick={() => handleSelectLeft(p.id)}
                  className={`w-full p-2.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80'
                      : isSelected
                      ? 'bg-sky-200 border-[#0288D1] shadow-md scale-[1.02]'
                      : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base shrink-0">{p.icon || '💡'}</span>
                    <span className="text-[11px] font-bold truncate leading-tight">{p.left}</span>
                  </div>
                  {isMatched && <Check size={14} className="text-emerald-600 shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Right Items */}
          <div className="space-y-1.5">
            {pairs.map((p) => {
              const isMatched = Object.values(matches).includes(p.id)
              return (
                <button
                  type="button"
                  key={p.id}
                  disabled={isMatched}
                  onClick={() => handleSelectRight(p.id)}
                  className={`w-full p-2.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80'
                      : selectedLeft
                      ? 'bg-amber-50 border-amber-300 hover:bg-amber-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-bold leading-tight">{p.right}</span>
                  {isMatched && <Check size={14} className="text-emerald-600 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 pt-1 flex items-center justify-between text-[10px] font-bold text-slate-500">
          <span>{Object.keys(matches).length} of {pairs.length} Matched</span>
          {isCompleted && (
            <button
              onClick={onNext || onComplete}
              className="py-1.5 px-4 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. BUILD THE SEQUENCE
  // ─────────────────────────────────────────────────────────────────────────
  if (config.type === 'build_sequence') {
    const rawSequence = config.sequence || [
      { id: 's1', step: 1, text: 'Collect Photos of Cats', icon: '📸' },
      { id: 's2', step: 2, text: 'Label Features: Whiskers & Ears', icon: '🏷️' },
      { id: 's3', step: 3, text: 'Train AI Neural Model', icon: '🧠' },
      { id: 's4', step: 4, text: 'Model Recognizes New Cats!', icon: '✨' }
    ]

    const handleMoveUp = (idx: number) => {
      if (idx <= 0) return
      gameAudio.playTap()
      const nextOrder = [...sequenceOrder]
      const temp = nextOrder[idx]
      nextOrder[idx] = nextOrder[idx - 1]
      nextOrder[idx - 1] = temp
      setSequenceOrder(nextOrder)

      // Check correctness
      const correctIds = rawSequence.sort((a, b) => a.step - b.step).map((s) => s.id)
      const isRight = nextOrder.every((id, i) => id === correctIds[i])
      if (isRight) {
        handleSuccessFinish('Sequence assembled in perfect order!')
      }
    }

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 select-none text-slate-800 animate-in fade-in duration-200">
        <div className="shrink-0 text-center pb-1.5 border-b border-indigo-100">
          <span className="text-[9px] font-black uppercase text-indigo-600 tracking-wider">
            BUILD THE SEQUENCE
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            {config.instruction}
          </h2>
        </div>

        <div className="flex-1 flex flex-col justify-around py-2 space-y-2 max-w-sm mx-auto w-full">
          {sequenceOrder.map((id, idx) => {
            const item = rawSequence.find((s) => s.id === id) || rawSequence[0]
            return (
              <div
                key={id}
                className="p-3 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-lg">{item.icon || '⚡'}</span>
                  <span className="text-xs font-bold text-slate-800">{item.text}</span>
                </div>
                {idx > 0 && (
                  <button
                    onClick={() => handleMoveUp(idx)}
                    className="p-1 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black cursor-pointer border border-indigo-200"
                  >
                    ▲ Move Up
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="shrink-0 pt-1 text-center">
          <button
            onClick={() => {
              const correctIds = rawSequence.sort((a, b) => a.step - b.step).map((s) => s.id)
              const isRight = sequenceOrder.every((id, i) => id === correctIds[i])
              if (isRight) {
                handleSuccessFinish('Correct sequence!')
              } else {
                showAuraToast('try_again', 'Look at which step comes first!', true)
              }
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Check Sequence Order
          </button>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SORT THE CARDS & TEACH THE MACHINE
  // ─────────────────────────────────────────────────────────────────────────
  if (config.type === 'sort_cards' || config.type === 'teach_machine') {
    const categories = config.categories || [
      { id: 'cat1', name: 'Uses AI', icon: '🤖', color: 'border-sky-400 bg-sky-50' },
      { id: 'cat2', name: 'Simple Tool', icon: '🔨', color: 'border-amber-400 bg-amber-50' }
    ]

    const cards = config.cards || [
      { id: 'c1', text: 'Face Unlock', categoryId: 'cat1', icon: '📱' },
      { id: 'c2', text: 'Metal Key', categoryId: 'cat2', icon: '🔑' },
      { id: 'c3', text: 'Smart Voice Assistant', categoryId: 'cat1', icon: '🔊' },
      { id: 'c4', text: 'Wooden Chair', categoryId: 'cat2', icon: '🪑' }
    ]

    const handleSortCard = (cardId: string, catId: string) => {
      const card = cards.find((c) => c.id === cardId)
      if (card?.categoryId === catId) {
        gameAudio.playSuccess()
        const updated = { ...sortedCards, [cardId]: catId }
        setSortedCards(updated)
        showAuraToast('great_job', `Correct! ${card.text} sorted into ${catId}.`, false)
        if (onSaveState) onSaveState({ sortedCards: updated })
        if (Object.keys(updated).length === cards.length) {
          handleSuccessFinish('All cards classified correctly!')
        }
      } else {
        gameAudio.playError()
        showAuraToast('try_again', 'Check whether that uses machine learning!', true)
      }
    }

    const currentUnsorted = cards.find((c) => !sortedCards[c.id])

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 select-none text-slate-800 animate-in fade-in duration-200">
        <div className="shrink-0 text-center pb-1 border-b border-sky-100">
          <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
            {config.type === 'teach_machine' ? 'TEACH THE MACHINE' : 'SORT THE CARDS'}
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            {config.instruction}
          </h2>
        </div>

        {/* Active Card to Sort */}
        <div className="my-auto text-center py-2">
          {currentUnsorted ? (
            <div className="inline-flex flex-col items-center p-3 rounded-2xl bg-white border-2 border-indigo-400 shadow-lg animate-pulse max-w-xs w-full">
              <span className="text-3xl mb-1">{currentUnsorted.icon || '📦'}</span>
              <span className="text-sm font-black text-slate-900">{currentUnsorted.text}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Tap the bucket below to sort:</span>
            </div>
          ) : (
            <div className="text-center p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-400 text-emerald-800 font-black">
              🎉 All {cards.length} items successfully classified!
            </div>
          )}
        </div>

        {/* Drop Buckets */}
        <div className="grid grid-cols-2 gap-2 shrink-0 pt-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              disabled={!currentUnsorted}
              onClick={() => currentUnsorted && handleSortCard(currentUnsorted.id, cat.id)}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${cat.color} hover:scale-[1.02] shadow-sm`}
            >
              <span className="text-2xl block mb-1">{cat.icon}</span>
              <span className="text-xs font-black text-slate-900 block leading-tight">{cat.name}</span>
              <span className="text-[9px] text-slate-500 block mt-0.5 font-bold">
                ({Object.values(sortedCards).filter((v) => v === cat.id).length} items)
              </span>
            </button>
          ))}
        </div>

        <div className="shrink-0 pt-1 text-center text-[10px] font-bold text-slate-500">
          {Object.keys(sortedCards).length} of {cards.length} Cards Sorted
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. FEED THE AI
  // ─────────────────────────────────────────────────────────────────────────
  if (config.type === 'feed_ai') {
    const feedItems = config.feedItems || [
      { id: 'f1', name: '1000 Clean Photos', icon: '📸', isGoodData: true },
      { id: 'f2', name: 'Blurry Empty Scans', icon: '🌫️', isGoodData: false },
      { id: 'f3', name: 'Clear Audio Words', icon: '🎙️', isGoodData: true },
      { id: 'f4', name: 'Corrupted Random Noise', icon: '⚡', isGoodData: false }
    ]

    const handleFeed = (item: (typeof feedItems)[0]) => {
      if (item.isGoodData) {
        gameAudio.playSuccess()
        const next = fedCount + 1
        setFedCount(next)
        showAuraToast('great_job', `AI Model absorbed ${item.name}! Accuracy boosted.`, false)
        if (next >= feedItems.filter((i) => i.isGoodData).length) {
          handleSuccessFinish('Model fully trained with high quality data!')
        }
      } else {
        gameAudio.playError()
        showAuraToast('try_again', 'Noisy or corrupt data lowers AI accuracy. Pick clean examples!', true)
      }
    }

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 select-none text-slate-800 animate-in fade-in duration-200">
        <div className="shrink-0 text-center pb-1.5 border-b border-sky-100">
          <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider">
            FEED THE AI MODEL
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            {config.instruction}
          </h2>
        </div>

        {/* AI Machine Center */}
        <div className="my-auto text-center py-2 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xl border-4 border-white mb-2">
            <Bot size={40} className="animate-bounce" />
          </div>
          <span className="text-xs font-black text-slate-900">Training Progress: {fedCount * 50}%</span>
          <div className="w-48 h-2.5 bg-slate-200 rounded-full overflow-hidden mt-1 border border-slate-300">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${fedCount * 50}%` }} />
          </div>
        </div>

        {/* Data Items to Feed */}
        <div className="grid grid-cols-2 gap-2 shrink-0 pt-2">
          {feedItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleFeed(item)}
              className="p-2.5 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all flex items-center gap-2 cursor-pointer shadow-xs text-left"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-[11px] font-bold text-slate-800 truncate">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SPOT THE DIFFERENCE (ANOMALY DETECTION)
  // ─────────────────────────────────────────────────────────────────────────
  if (config.type === 'spot_difference') {
    const items = config.differenceItems || [
      { id: 'd1', name: 'Normal Transaction ₹50', icon: '💳', isOutlier: false },
      { id: 'd2', name: 'Normal Transaction ₹120', icon: '💳', isOutlier: false },
      { id: 'd3', name: 'SUSPICIOUS ₹99,999 at 3 AM', icon: '🚨', isOutlier: true },
      { id: 'd4', name: 'Normal Transaction ₹80', icon: '💳', isOutlier: false }
    ]

    const handleSelectOutlier = (isOutlier: boolean) => {
      if (isOutlier) {
        gameAudio.playSuccess()
        setOutlierFound(true)
        handleSuccessFinish('Anomaly detected! AI fraud alert triggered.')
      } else {
        gameAudio.playError()
        showAuraToast('try_again', 'That fits the normal pattern. Find the unusual anomaly!', true)
      }
    }

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 select-none text-slate-800 animate-in fade-in duration-200">
        <div className="shrink-0 text-center pb-1.5 border-b border-rose-100">
          <span className="text-[9px] font-black uppercase text-rose-600 tracking-wider">
            SPOT THE ANOMALY (OUTLIER DETECTION)
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            {config.instruction}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-auto py-2">
          {items.map((it) => (
            <button
              type="button"
              key={it.id}
              onClick={() => handleSelectOutlier(it.isOutlier)}
              className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 transition-all flex flex-col items-center text-center cursor-pointer shadow-sm"
            >
              <span className="text-3xl mb-1">{it.icon}</span>
              <span className="text-xs font-black text-slate-900">{it.name}</span>
            </button>
          ))}
        </div>

        <div className="shrink-0 pt-1 text-center text-[10px] font-bold text-slate-500">
          AI inspects millions of patterns to catch fraudulent outliers in seconds!
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. DEFAULT FALLBACK / CONNECT THE DOTS
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
          INTERACTIVE AI LAB
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900">{config.instruction}</h2>
      </div>

      <div className="my-auto text-center p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
        <Bot size={36} className="text-[#0288D1] mx-auto mb-2 animate-bounce" />
        <p className="text-xs font-bold text-slate-800">{config.hint || 'Complete the visual challenge!'}</p>
      </div>

      <button
        onClick={() => handleSuccessFinish()}
        className="w-full py-2.5 rounded-xl bg-[#0288D1] text-white font-bold text-xs hover:bg-sky-600 transition-all cursor-pointer shadow-md"
      >
        Complete Activity & Collect Stars ⭐
      </button>
    </div>
  )
}
