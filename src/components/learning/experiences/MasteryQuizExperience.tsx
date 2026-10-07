import React, { useState, useEffect } from 'react'
import {
  CheckCircle2, XCircle, RotateCcw,
  Sparkles, ChevronRight, ChevronLeft, HelpCircle,
  Flag, Trophy
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

export const MasteryQuizExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  chapterTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onContinueNextChapter,
  isFinalChapter,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showExplanations, setShowExplanations] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60)

  const passingPct = (canonicalSection as any)?.passingPercentage || 60
  const xpReward = canonicalSection.xpReward || 40

  // Real quiz questions from Content Manager or syllabus
  const questions = React.useMemo(() => {
    if (canonicalSection.quizQuestions && canonicalSection.quizQuestions.length > 0) {
      return canonicalSection.quizQuestions
    }
    return [
      {
        question: `In modern computing, what fundamentally defines the concept of ${topicTitle}?`,
        options: [
          { text: 'A mathematical and statistical framework that infers patterns from data to automate decisions.', isCorrect: true },
          { text: 'A rigid mechanical clockwork system with fixed physical gears.', isCorrect: false },
          { text: 'A basic text spreadsheet that performs only static row sorting.', isCorrect: false },
          { text: 'An analog magnetic tape that requires continuous manual human rewinding.', isCorrect: false },
        ],
        explanation: 'Unlike deterministic rule-based calculators, modern intelligent models optimize parameter weights to recognize statistical representations in empirical data.',
      },
      {
        question: `Why is cross-validation and a held-out test split critical when evaluating ${topicTitle}?`,
        options: [
          { text: 'To prove that the model generalizes cleanly to unseen real-world inputs without overfitting.', isCorrect: true },
          { text: 'To double the physical weight of the computer server.', isCorrect: false },
          { text: 'To eliminate the need for electricity during model training.', isCorrect: false },
          { text: 'Because models cannot run without two separate monitors connected.', isCorrect: false },
        ],
        explanation: 'Testing solely on training data produces deceptive overconfidence; validation splits prove genuine generalization capabilities on novel data distributions.',
      },
      {
        question: `When deploying ${topicTitle} into mission-critical production environments, which factor is most crucial?`,
        options: [
          { text: 'Safety guardrails, low inference latency, and systematic bias mitigation.', isCorrect: true },
          { text: 'Playing celebratory music after every single numerical inference.', isCorrect: false },
          { text: 'Removing all human oversight and disabling error logs entirely.', isCorrect: false },
          { text: 'Limiting system deployment to sunny afternoons only.', isCorrect: false },
        ],
        explanation: 'Production architectures require strict runtime verification, fallback failsafes, low latency budgets, and transparent audit logging.',
      },
      {
        question: `What is the primary consequence of extreme dataset imbalance during training?`,
        options: [
          { text: 'The model achieves high superficial accuracy by simply predicting the majority class while failing completely on critical minority edge cases.', isCorrect: true },
          { text: 'The graphics card begins to run backwards.', isCorrect: false },
          { text: 'All computer memory is permanently deleted within 10 seconds.', isCorrect: false },
          { text: 'The computer screen turns completely transparent.', isCorrect: false },
        ],
        explanation: 'Class imbalance skews naive loss functions toward the majority class; techniques like synthetic oversampling (SMOTE) or focal loss are required to balance minority sensitivity.',
      },
      {
        question: `How does continuous monitoring safeguard ${topicTitle} systems after deployment?`,
        options: [
          { text: 'It detects distribution shift, sensor drift, and degradation in inference confidence over time.', isCorrect: true },
          { text: 'It prevents the physical server from accumulating room dust.', isCorrect: false },
          { text: 'It rewrites the source code into a completely different programming language every night.', isCorrect: false },
          { text: 'It generates randomized answers to keep users surprised.', isCorrect: false },
        ],
        explanation: 'Real-world environments shift over seasons and years; drift detection triggers automated retraining before catastrophic failures occur.',
      },
    ]
  }, [canonicalSection.quizQuestions, topicTitle])

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isSubmitted])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const currentQ = questions[currentIdx] || questions[0]
  const currentOptions = currentQ.options || []

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return
    gameAudio.playTap()
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }))
  }

  const toggleFlag = (qIdx: number) => {
    gameAudio.playTap()
    setFlaggedQuestions(prev =>
      prev.includes(qIdx) ? prev.filter(i => i !== qIdx) : [...prev, qIdx]
    )
  }

  // Calculate score
  let correctCount = 0
  questions.forEach((q: any, i: number) => {
    const selected = selectedAnswers[i]
    if (selected !== undefined && q.options[selected]?.isCorrect) {
      correctCount++
    }
  })
  const scorePct = Math.round((correctCount / questions.length) * 100)
  const isPassed = scorePct >= passingPct

  const handleSubmitQuiz = () => {
    setIsSubmitted(true)
    setShowExplanations(true)
    if (isPassed) {
      gameAudio.playSuccess()
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    } else {
      gameAudio.playWrong()
    }
  }

  const handleRetry = () => {
    setSelectedAnswers({})
    setFlaggedQuestions([])
    setIsSubmitted(false)
    setShowExplanations(false)
    setCurrentIdx(0)
    setSecondsRemaining(15 * 60)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Assessment Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200/60 mb-2">
            <Trophy size={13} className="text-indigo-600" />
            <span>Section 8 · Final Mastery Challenge (Quiz Assessment)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Mastery Assessment: ${chapterTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Demonstrate your complete subject mastery. Answer all questions to verify your academic retention and earn your chapter certification.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold">
            <span>⏱️ {formatTime(secondsRemaining)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Sparkles size={14} className="text-amber-500" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Chapter Mastered</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Assessment Layout */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Active Question Arena */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
              {/* Question Meta Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Question {currentIdx + 1} of {questions.length}
                </span>

                <button
                  onClick={() => toggleFlag(currentIdx)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    flaggedQuestions.includes(currentIdx)
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Flag size={14} />
                  <span>{flaggedQuestions.includes(currentIdx) ? 'Flagged' : 'Flag Question'}</span>
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentOptions.map((opt: any, optIdx: number) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 font-bold shadow-xs ring-2 ring-indigo-200'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black mt-0.5 border ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-slate-100 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  )
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (currentIdx > 0) setCurrentIdx(i => i - 1)
                    gameAudio.playTap()
                  }}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentIdx(i => i + 1)
                      gameAudio.playTap()
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Next Question</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Submit Mastery Assessment</span>
                    <CheckCircle2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Question Navigator Grid & Submit Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Question Navigator</h3>
                <span className="text-xs text-slate-400">
                  {Object.keys(selectedAnswers).length}/{questions.length} Answered
                </span>
              </div>

              {/* Navigator Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_: any, idx: number) => {
                  const isCurrent = currentIdx === idx
                  const isAnswered = selectedAnswers[idx] !== undefined
                  const isFlagged = flaggedQuestions.includes(idx)

                  let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  if (isCurrent) {
                    style = 'bg-indigo-600 border-indigo-600 text-white font-black shadow-xs ring-2 ring-indigo-300'
                  } else if (isFlagged) {
                    style = 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                  } else if (isAnswered) {
                    style = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIdx(idx)
                        gameAudio.playTap()
                      }}
                      className={`h-10 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${style}`}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Flagged
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Pending
                </span>
              </div>
            </div>

            {/* Assessment Rules */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Passing Standard:</span>
              <p>Achieve at least {passingPct}% to demonstrate mastery of this chapter.</p>
            </div>
          </div>
        </div>
      ) : (
        /* Results & Chapter Completion Screen */
        <div className="space-y-6">
          {/* Score Summary Deck */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl max-w-3xl mx-auto text-center space-y-6">
            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-inner ${
                isPassed ? 'bg-emerald-50 border border-emerald-200 text-emerald-600' : 'bg-rose-50 border border-rose-200 text-rose-600'
              }`}
            >
              {isPassed ? <Trophy size={42} /> : <XCircle size={42} />}
            </div>

            <div className="space-y-1">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isPassed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {isPassed ? '🎉 Assessment Passed & Chapter Mastered!' : 'Needs Review · Passing Threshold: ' + passingPct + '%'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 pt-2">
                Score: {scorePct}%
              </h2>
              <p className="text-sm text-slate-600">
                You answered <strong className="text-slate-900">{correctCount} of {questions.length}</strong> questions correctly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Retry Assessment</span>
              </button>

              {onContinueNextChapter && (
                <button
                  onClick={onContinueNextChapter}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>{isFinalChapter ? 'Complete Class Progression 🎉' : 'Continue to Next Chapter 🚀'}</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Detailed Question Review with Explanations */}
          {showExplanations && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600" />
                <span>Detailed Academic Question Review</span>
              </h3>

              <div className="space-y-4">
                {questions.map((q: any, idx: number) => {
                  const selected = selectedAnswers[idx]
                  const isCorrect = selected !== undefined && q.options[selected]?.isCorrect
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border-2 space-y-3 ${
                        isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">Question {idx + 1}</span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}
                        >
                          {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-900">{q.question}</p>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
