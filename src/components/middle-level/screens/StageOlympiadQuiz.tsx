// ─────────────────────────────────────────────────────────────────────────────
// STAGE 6: OLYMPIAD ARENA VISUAL CHALLENGE
// Pure visual matching and conceptual connection — ZERO written MCQs
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData } from '../types'
import { Trophy, CheckCircle2, ArrowRight, Lightbulb, Sparkles, Star } from 'lucide-react'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'
import { gameAudio } from '../../../utils/gameAudio'
import { showAuraToast } from '../../../services/auraGuidanceToast'
import confetti from 'canvas-confetti'

interface StageOlympiadQuizProps {
  lesson: MiddleLessonData
  onProceed: () => void
  onAnswerQuestion: (qId: string, selected: string, isCorrect: boolean) => void
  storedAnswers?: Record<string, { selected: string; isCorrect: boolean }>
  onOpenJargonBuster?: () => void
}

export const StageOlympiadQuiz: React.FC<StageOlympiadQuizProps> = ({
  lesson,
  onProceed,
  onAnswerQuestion,
  storedAnswers = {},
  onOpenJargonBuster
}) => {
  const { olympiad } = lesson
  const questions = olympiad.questions

  const [currentQIdx, setCurrentQIdx] = useState(0)
  const currentQ = questions[currentQIdx] || questions[0]
  const currentAnswer = storedAnswers[currentQ?.id]

  // Extract the correct concept text
  const correctText = currentQ.options[currentQ.correctAnswer] || 'Core AI Concept'

  // Pairs for visual matching: map each question premise to its matching AI concept
  const pairs = questions.map((q, idx) => ({
    id: q.id,
    premise: q.question.replace(/^Q\d+\.\s*/, '').slice(0, 70) + (q.question.length > 70 ? '...' : ''),
    answer: q.options[q.correctAnswer],
    icon: idx === 0 ? '🧠' : idx === 1 ? '⚡' : idx === 2 ? '🎯' : idx === 3 ? '🔍' : '🚀'
  }))

  const [selectedPremise, setSelectedPremise] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})

  const handleSelectPremise = (id: string) => {
    gameAudio.playTap()
    setSelectedPremise(id)
  }

  const handleSelectAnswer = (id: string) => {
    if (!selectedPremise) return
    if (selectedPremise === id) {
      gameAudio.playSuccess()
      const updated = { ...matchedPairs, [id]: id }
      setMatchedPairs(updated)
      setSelectedPremise(null)
      onAnswerQuestion(id, 'MATCH', true)
      showAuraToast('great_job', 'Perfect match in the Olympiad Arena!', false)

      if (Object.keys(updated).length === pairs.length) {
        gameAudio.playFanfare()
        confetti({ particleCount: 60, spread: 80 })
        showAuraToast('activity_complete', 'All Olympiad concepts mastered!', true)
      }
    } else {
      gameAudio.playError()
      showAuraToast('try_again', 'Look at the core AI mechanism closely!', true)
      setSelectedPremise(null)
    }
  }

  const isAllDone = Object.keys(matchedPairs).length >= pairs.length

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
            <Trophy size={14} />
            <span>Stage 6: Olympiad Visual Arena</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">Interactive Knowledge Matching</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Olympiad Concept Connection
          </h2>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
          {Object.keys(matchedPairs).length}/{pairs.length} Matched
        </div>
      </div>

      {/* Guide Avatar */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        <GaioAiGuideAvatar size="sm" isPulsing />
        <p className="text-xs text-slate-300 font-medium">
          Aura AI: "Tap an Olympiad engineering challenge on the left, then connect it to its exact AI solution on the right!"
        </p>
      </div>

      {/* Match Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
        {/* Left: Engineering Challenge */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            AI Challenge & Scenario
          </span>
          {pairs.map((p) => {
            const isMatched = !!matchedPairs[p.id]
            const isSelected = selectedPremise === p.id
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectPremise(p.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300 opacity-80'
                    : isSelected
                    ? 'bg-rose-950/80 border-rose-400 text-white shadow-md scale-[1.01]'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <span className="text-xs font-bold leading-tight line-clamp-2">{p.premise}</span>
                </div>
                {isMatched && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
              </button>
            )
          })}
        </div>

        {/* Right: AI Solution */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Matching Solution / Method
          </span>
          {pairs.map((p) => {
            const isMatched = !!matchedPairs[p.id]
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectAnswer(p.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300 opacity-80'
                    : selectedPremise
                    ? 'bg-amber-950/40 border-amber-600 hover:bg-amber-950/70 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-xs font-bold leading-tight">{p.answer}</span>
                {isMatched && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="text-xs text-slate-400 font-semibold">
          {isAllDone ? '🌟 Challenge Complete!' : 'Connect all pairs to unlock next stage'}
        </span>
        <button
          onClick={onProceed}
          disabled={!isAllDone && Object.keys(matchedPairs).length < 2}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>Continue to Responsible AI</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
