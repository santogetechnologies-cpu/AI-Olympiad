import { useState } from 'react'
import {
  Trophy, Flame, Check, X,
  CheckCircle2, RotateCcw, ArrowRight
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import type { CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export function Section8BossArena({
  section,
  chapterTitle,
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

  interface ArenaQuestion {
    question: string
    options: { text: string; isCorrect: boolean }[]
    explanation: string
  }

  // Questions from section or topic profile
  const questions: ArenaQuestion[] = (section.quizQuestions && section.quizQuestions.length > 0)
    ? section.quizQuestions
    : (profile.quizzes && profile.quizzes.length > 0)
    ? profile.quizzes.map(q => ({
        question: q.question || (q as any).q || 'What is the primary function of this intelligent system?',
        options: ((q as any).options || (q as any).opts || []).map((o: any) => ({
          text: o.text || String(o),
          isCorrect: o.isCorrect ?? true,
        })),
        explanation: (q as any).explanation || (q as any).exp || 'Great job! Accurate logical deduction.',
      }))
    : [
        {
          question: `How does modern AI recognize patterns in ${section.topicTitle || 'this domain'}?`,
          options: [
            { text: 'By learning from hundreds of verified examples and extracting recurring traits.', isCorrect: true },
            { text: 'By guessing randomly without ever checking any past data.', isCorrect: false },
            { text: 'By manually memorizing only a single photo forever.', isCorrect: false },
          ],
          explanation: 'Machine learning models extract statistical patterns from large collections of training data.',
        },
        {
          question: 'What is the most critical rule when deploying autonomous systems around people?',
          options: [
            { text: 'Verify sensor reliability, enforce strict privacy filters, and prioritize safety.', isCorrect: true },
            { text: 'Ignore all sensor errors and run at maximum speed regardless of weather.', isCorrect: false },
            { text: 'Keep all decisions secret without any safety review.', isCorrect: false },
          ],
          explanation: 'Human safety, algorithmic fairness, and data privacy are the cornerstone pillars of ethical AI.',
        },
      ]

  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [comboStreak, setComboStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [arenaFinished, setArenaFinished] = useState(false)

  const currentQ = questions[currentQIdx] || questions[0]

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return
    setSelectedOpt(idx)
    setIsAnswered(true)

    const isCorrect = currentQ.options[idx]?.isCorrect
    if (isCorrect) {
      setScore(s => s + 1)
      setComboStreak(c => c + 1)
      gamification.addXP(20, undefined, `boss-arena-${currentQIdx}`)
      toast.success(`🔥 Streak x${comboStreak + 1}! Accurate answer! (+20 XP)`)
    } else {
      setComboStreak(0)
      toast.error('Not quite! Review the explanation and keep going!')
    }
  }

  const handleNextQuestion = () => {
    if (currentQIdx + 1 < questions.length) {
      setCurrentQIdx(i => i + 1)
      setSelectedOpt(null)
      setIsAnswered(false)
    } else {
      setArenaFinished(true)
      gamification.addXP(50, undefined, 'boss-arena-cleared')
      gamification.launchConfetti()
      toast.success('🏆 OLYMPIAD ARENA CLEARED! +50 Bonus XP!')
    }
  }

  const handleRestart = () => {
    setCurrentQIdx(0)
    setSelectedOpt(null)
    setIsAnswered(false)
    setComboStreak(0)
    setScore(0)
    setArenaFinished(false)
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Top Arena HUD Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 rounded-3xl text-white shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Trophy size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-100">
              Olympiad Discovery Arena
            </span>
            <h3 className="text-sm font-black leading-tight">
              {chapterTitle || 'Mastery Boss Encounter'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
            <Flame size={14} className={comboStreak > 0 ? 'text-amber-200 fill-amber-200 animate-bounce' : 'text-white/60'} />
            Streak: {comboStreak}x
          </div>
          <span className="text-xs font-bold text-white/90">
            {currentQIdx + 1}/{questions.length}
          </span>
        </div>
      </div>

      {!arenaFinished ? (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Trial Challenge {currentQIdx + 1} of {questions.length}
            </span>
            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx
              const isCorrect = opt.isCorrect

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md'
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold'
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect ? (
                        <Check size={18} strokeWidth={3} className="text-white" />
                      ) : isSelected ? (
                        <X size={18} strokeWidth={3} className="text-white" />
                      ) : null}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Answer Explanation & Continue */}
          {isAnswered && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 font-medium">
                <strong className="text-blue-700">Reasoning: </strong>
                {currentQ.explanation}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition active:scale-98"
              >
                <span>{currentQIdx + 1 < questions.length ? 'Next Trial Challenge' : 'Complete Arena'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-950 to-amber-950 border-2 border-amber-500/70 p-6 rounded-3xl text-white text-center space-y-4 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-3xl animate-bounce">
            🏆
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-black">Chapter Mastered</span>
            <h3 className="text-xl font-black text-white mt-1">Boss Encounter Victory!</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              You scored {score} out of {questions.length} trial challenges. You have successfully conquered this curriculum topic!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <button
              onClick={handleRestart}
              className="py-2.5 px-4 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw size={13} /> Retake Arena
            </button>
            <button
              onClick={onComplete}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 cursor-pointer shadow-md"
            >
              <CheckCircle2 size={13} /> Finish Chapter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
