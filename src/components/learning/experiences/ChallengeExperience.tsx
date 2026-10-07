import React, { useState } from 'react'
import { Trophy, CheckCircle2, XCircle } from 'lucide-react'
import { PageTransition, SuccessCelebration, StreakBadge } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 12. CHALLENGE EXPERIENCE ────────────────────────────────────────────────
// Structure: Olympiad Boss Arena with combo streaks, timed trials, shield boosts, and victory podium
export const ChallengeExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [trialFinished, setTrialFinished] = useState(false)

  const questions = config?.challengeQuestions || [
    {
      q: 'Which machine learning paradigm learns strictly by receiving numerical rewards and penalties?',
      options: ['Reinforcement Learning', 'Unsupervised Clustering', 'Linear Regression'],
      correct: 0,
      exp: 'Reinforcement Learning uses agent trial-and-error to maximize cumulative rewards in dynamic environments.',
    },
    {
      q: 'What is the main danger of training an AI model only on images from sunny days?',
      options: ['It crashes on dark or rainy days (Overfitting bias)', 'It requires 10x more electricity', 'It forgets how to do math'],
      correct: 0,
      exp: 'Lack of training diversity causes catastrophic performance failure under real-world weather variations.',
    },
    {
      q: 'What mechanism allows Transformer architectures to process entire sentences simultaneously rather than word-by-word?',
      options: ['Self-Attention & Positional Encoding', 'Mechanical Gears', 'Analog Magnetic Tape'],
      correct: 0,
      exp: 'Self-attention calculates mutual word dependencies simultaneously using matrix dot-product operations.',
    },
  ]

  const currentQ = questions[currentQIdx] || questions[0]

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelectedOpt(idx)
    setAnswered(true)

    const isCorrect = idx === currentQ.correct
    if (isCorrect) {
      gameAudio.playSuccess()
      setStreak(s => s + 1)
      setScore(sc => sc + 100 + (streak + 1) * 20)
    } else {
      gameAudio.playWrong()
      setStreak(0)
    }
  }

  const handleNext = () => {
    setSelectedOpt(null)
    setAnswered(false)
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(i => i + 1)
    } else {
      setTrialFinished(true)
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    }
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Arena Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-xl shadow-amber-500/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center">
            <Trophy size={24} className="text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Olympiad Boss Arena</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} />
          <div className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-black text-amber-300">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Arena Combat Question Deck */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border-2 border-amber-500/30 space-y-6">
        <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
          <span>TRIAL {currentQIdx + 1} OF {questions.length}</span>
          <span>RAPID FIRE ROUND</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">{currentQ.q}</h3>

        <div className="space-y-3">
          {currentQ.options.map((opt: string, idx: number) => {
            const isSelected = selectedOpt === idx
            const isCorrect = idx === currentQ.correct
            return (
              <button
                key={idx}
                disabled={answered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between ${
                  answered
                    ? isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-400/40'
                      : isSelected
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                    : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-amber-400'
                }`}
              >
                <span>{opt}</span>
                {answered && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                {answered && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400 shrink-0" />}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-300 max-w-md">{currentQ.exp}</p>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              {currentQIdx < questions.length - 1 ? 'Next Trial Round →' : 'Claim Victory Trophy 🏆'}
            </button>
          </div>
        )}
      </div>

      {trialFinished && (
        <SuccessCelebration
          title="🏆 Olympiad Arena Conquered!"
          subtitle={`You triumphed with a total score of ${score} Points in ${topicTitle}!`}
          xpEarned={canonicalSection.xpReward || 40}
        />
      )}
    </PageTransition>
  )
}
