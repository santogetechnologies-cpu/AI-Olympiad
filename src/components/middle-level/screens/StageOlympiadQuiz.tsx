// ─────────────────────────────────────────────────────────────────────────────
// STAGE 6: OLYMPIAD ARENA EXAMINATION
// 5 authentic Olympiad-style competitive questions with instant rationales
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData } from '../types'
import { Trophy, HelpCircle, CheckCircle2, XCircle, ArrowRight, Lightbulb, ChevronRight } from 'lucide-react'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

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
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQ = questions[currentQIdx] || questions[0]
  const currentAnswer = storedAnswers[currentQ?.id]

  const handleSelectOption = (optKey: 'A' | 'B' | 'C' | 'D') => {
    if (currentAnswer) return // already answered
    const isCorrect = optKey === currentQ.correctAnswer
    onAnswerQuestion(currentQ.id, optKey, isCorrect)
    setShowExplanation(true)
  }

  const answeredCount = Object.keys(storedAnswers).filter((k) =>
    questions.some((q) => q.id === k)
  ).length
  const correctCount = Object.values(storedAnswers).filter(
    (a) => a.isCorrect && questions.some((q) => storedAnswers[q.id] === a)
  ).length

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
            <Trophy size={14} />
            <span>Stage 6: Olympiad Competitive Arena</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">5 High-Order MCQs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Olympiad Standard Assessment
          </h2>
        </div>

        {/* Question Stepper & Stats */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {questions.map((q, idx) => {
              const ans = storedAnswers[q.id]
              const isCurrent = idx === currentQIdx
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQIdx(idx)
                    setShowHint(false)
                    setShowExplanation(Boolean(storedAnswers[q.id]))
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'border-2 border-rose-400 bg-rose-950/80 text-white'
                      : ans
                      ? ans.isCorrect
                        ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                        : 'bg-rose-950/40 border border-rose-800 text-rose-400'
                      : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-emerald-400 font-bold">{correctCount}</span>/{questions.length} Correct
          </div>
        </div>
      </div>

      {/* GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining the Olympiad Quiz) */}
      <GaioAiGuideAvatar
        conceptTitle={`Question ${currentQ.questionNumber}`}
        simpleText={`You can do this! Take your time, read each choice, and pick the one that matches our story. Tap the question clue if you want a gentle hint!`}
        lessonTitle={lesson.chapterTitle}
      />

      {/* Main Question Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Question Number & Hint Toggle */}
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono">
              Question {currentQ.questionNumber} of {questions.length}
            </span>
            {currentQ.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb size={13} />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
            )}
          </div>

          {/* Hint Card */}
          {showHint && currentQ.hint && (
            <div className="mb-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200 animate-fade-in flex items-start gap-2">
              <Lightbulb size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{currentQ.hint}</span>
            </div>
          )}

          {/* Question Text */}
          <p className="text-slate-100 text-sm sm:text-base font-semibold leading-relaxed mb-4">
            {currentQ.questionText}
          </p>

          {/* Options Grid */}
          <div className="space-y-2 mb-4">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer?.selected === opt.key
              const isCorrectAnswer = opt.key === currentQ.correctAnswer
              const isAnswered = Boolean(currentAnswer)

              let cardStyle = 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-200'
              let badgeStyle = 'bg-slate-800 text-slate-400'

              if (isAnswered) {
                if (isCorrectAnswer) {
                  cardStyle = 'bg-emerald-950/70 border-emerald-500 text-white shadow-md shadow-emerald-950/50'
                  badgeStyle = 'bg-emerald-500 text-white'
                } else if (isSelected) {
                  cardStyle = 'bg-rose-950/70 border-rose-500 text-white shadow-md shadow-rose-950/50'
                  badgeStyle = 'bg-rose-500 text-white'
                } else {
                  cardStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60'
                  badgeStyle = 'bg-slate-900 text-slate-600'
                }
              }

              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  disabled={isAnswered}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 ${badgeStyle}`}>
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {opt.text}
                    </span>
                  </div>

                  {isAnswered && (
                    isCorrectAnswer ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                    ) : isSelected ? (
                      <XCircle size={16} className="text-rose-400 shrink-0 ml-2" />
                    ) : null
                  )}
                </button>
              )
            })}
          </div>

          {/* Rationale & Explanation Reveal */}
          {currentAnswer && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs animate-fade-in space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="text-sky-300">Official Olympiad Analysis:</span>
                <div className="flex items-center gap-2">
                  {onOpenJargonBuster && (
                    <button
                      onClick={onOpenJargonBuster}
                      className="text-[10px] text-amber-400 hover:text-amber-200 underline font-semibold cursor-pointer"
                    >
                      💡 Jargon Buster
                    </button>
                  )}
                  <span className={currentAnswer.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                    {currentAnswer.isCorrect ? '✓ Correct (+50 XP)' : 'Needs Review'}
                  </span>
                </div>
              </div>

              {/* Plain English Kid-friendly take */}
              <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-100/90 text-xs leading-relaxed">
                <strong>👶 Plain English Summary:</strong> The winning choice is <strong>Option {currentQ.correctAnswer}</strong>. Always look for the option that protects safety, tests real examples, and avoids shortcuts!
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigator */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentQIdx > 0) {
                setCurrentQIdx(currentQIdx - 1)
                setShowExplanation(Boolean(storedAnswers[questions[currentQIdx - 1].id]))
              }
            }}
            disabled={currentQIdx === 0}
            className="text-xs text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
          >
            ← Previous Question
          </button>

          {currentQIdx < questions.length - 1 ? (
            <button
              onClick={() => {
                setCurrentQIdx(currentQIdx + 1)
                setShowExplanation(Boolean(storedAnswers[questions[currentQIdx + 1].id]))
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Next Question</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-400">
              Exam Complete ({answeredCount}/5 Answered)
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Ready for the final ethical governance dilemma?
        </span>
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Responsible AI & Badge Unlock</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
