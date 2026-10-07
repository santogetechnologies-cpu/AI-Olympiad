import React, { useState } from 'react'
import { Award, CheckCircle2, XCircle } from 'lucide-react'
import { PageTransition, SuccessCelebration, StreakBadge } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 16. QUIZ EXPERIENCE ─────────────────────────────────────────────────────
// Structure: Official Olympiad Assessment arena with question progress pills, streak multipliers, and mastery medals
export const QuizExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [streak, setStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const questions = canonicalSection.quizQuestions || config?.quizQuestions || [
    {
      question: `What distinguishes an Artificial Intelligence system from a traditional calculator?`,
      options: [
        { text: 'AI learns patterns from data and adapts to new inputs', isCorrect: true },
        { text: 'AI is powered by steam turbines', isCorrect: false },
        { text: 'AI can only execute fixed arithmetic addition', isCorrect: false },
        { text: 'AI has no electronic chips inside', isCorrect: false },
      ],
      explanation: 'Unlike hardcoded rule machines, AI models infer rules by recognizing complex statistical patterns in data.',
    },
    {
      question: `Why is data diversity essential when training autonomous vehicles?`,
      options: [
        { text: 'To ensure the car can safely handle rain, fog, nighttime, and unexpected pedestrian events', isCorrect: true },
        { text: 'To make the car body paint look shinier', isCorrect: false },
        { text: 'To double the maximum speed of the engine', isCorrect: false },
        { text: 'Because cars only drive in laboratories', isCorrect: false },
      ],
      explanation: 'Models trained on narrow conditions fail when exposed to unexpected real-world weather or obstacles.',
    },
    {
      question: `What is the role of an objective/loss function in neural training?`,
      options: [
        { text: 'It measures the error gap between prediction and truth to guide parameter updates', isCorrect: true },
        { text: 'It deletes the computer hard drive', isCorrect: false },
        { text: 'It plays music during training', isCorrect: false },
        { text: 'It stops electricity from flowing', isCorrect: false },
      ],
      explanation: 'Loss functions quantify error so gradient descent can adjust weights in the direction of maximum accuracy.',
    },
  ]

  const currentQ = questions[currentQIdx] || questions[0]
  const currentOptions = currentQ.options || []

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelectedOpt(idx)
    setIsAnswered(true)

    const opt = currentOptions[idx]
    const isCorrect = opt?.isCorrect || false

    if (isCorrect) {
      gameAudio.playSuccess()
      setStreak(s => s + 1)
      setCorrectCount(c => c + 1)
    } else {
      gameAudio.playWrong()
      setStreak(0)
    }
  }

  const handleNext = () => {
    setSelectedOpt(null)
    setIsAnswered(false)
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(i => i + 1)
    } else {
      setQuizFinished(true)
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    }
  }

  const passingRate = Math.round((correctCount / Math.max(1, questions.length)) * 100)

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Quiz Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 flex items-center justify-center">
            <Award size={24} className="text-indigo-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Mastery Assessment Arena</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} />
          <div className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
            Q {currentQIdx + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Question Tracker Pills */}
      <div className="flex gap-2">
        {questions.map((_: any, i: number) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${
              i < currentQIdx
                ? 'bg-emerald-400'
                : i === currentQIdx
                ? 'bg-indigo-400'
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border-2 border-indigo-500/30 space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentOptions.map((opt: any, idx: number) => {
            const isSelected = selectedOpt === idx
            const isOptCorrect = opt.isCorrect

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between ${
                  isAnswered
                    ? isOptCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-400/40'
                      : isSelected
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                    : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-indigo-400'
                }`}
              >
                <span>{opt.text}</span>
                {isAnswered && isOptCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                {isAnswered && isSelected && !isOptCorrect && <XCircle size={18} className="text-rose-400 shrink-0" />}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-300 max-w-md">{currentQ.explanation}</p>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              {currentQIdx < questions.length - 1 ? 'Next Question →' : 'Complete Assessment 🎓'}
            </button>
          </div>
        )}
      </div>

      {quizFinished && (
        <SuccessCelebration
          title="🏆 Mastery Assessment Completed!"
          subtitle={`You achieved ${passingRate}% correct answers for ${topicTitle}!`}
          xpEarned={canonicalSection.xpReward || 40}
        />
      )}
    </PageTransition>
  )
}
