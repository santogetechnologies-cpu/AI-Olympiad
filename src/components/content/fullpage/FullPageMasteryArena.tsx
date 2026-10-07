import React, { useState } from 'react'
import {
  Trophy, Zap, Flame,
  ChevronRight, Sparkles, RotateCcw
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPageMasteryArenaProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onNavigateHome: () => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
}

export const FullPageMasteryArena: React.FC<FullPageMasteryArenaProps> = ({
  gradeKey: _gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  profile,
  isCompleted: _isCompleted,
  onComplete,
  onNavigateHome,
  onContinueNextChapter,
  isFinalChapter,
}) => {
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [bossHealth, setBossHealth] = useState(100)
  const [combo, setCombo] = useState(0)
  const [isVictory, setIsVictory] = useState(false)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // Questions synthesized from profile.quizzes or practice
  const questions = (profile.quizzes && profile.quizzes.length >= 3)
    ? profile.quizzes.slice(0, 3).map((q, idx) => ({
        id: idx,
        question: q.question || q.q || `What is the core takeaway of ${topicTitle}?`,
        options: (q.options || q.opts || [
          { text: 'Correct principle of AI', isCorrect: true },
          { text: 'Unverified random guess', isCorrect: false },
        ]).map(o => ({ text: o.text, isCorrect: o.isCorrect })),
        explanation: q.explanation || q.exp || 'Understanding this key principle is essential for Olympiad mastery.',
      }))
    : [
        {
          id: 0,
          question: `How does ${topicTitle} differentiate real data signals from random noise?`,
          options: [
            { text: 'By recognizing mathematical patterns and statistical correlations', isCorrect: true },
            { text: 'By flipping a virtual coin with no training data', isCorrect: false },
          ],
          explanation: 'AI systems rely on statistical weights and patterns, not guesswork.',
        },
        {
          id: 1,
          question: 'Why are safety guardrails and human verification essential in AI deployment?',
          options: [
            { text: 'To ensure ethical alignment, protect privacy, and prevent mistakes', isCorrect: true },
            { text: 'To slow down computers so they look busy', isCorrect: false },
          ],
          explanation: 'Responsible AI systems require guardrails to safeguard users.',
        },
        {
          id: 2,
          question: `What is the primary benefit of applying ${topicTitle} in everyday society?`,
          options: [
            { text: 'Automating repetitive tasks and assisting human decision making', isCorrect: true },
            { text: 'Eliminating the need for humans to learn anything', isCorrect: false },
          ],
          explanation: 'AI empowers human potential and automates complex problem solving.',
        },
      ]

  const activeQ = questions[currentQIdx]

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (isAnswered) return
    setSelectedOpt(idx)
    setIsAnswered(true)

    if (isCorrect) {
      const nextCombo = combo + 1
      setCombo(nextCombo)
      const dmg = Math.round(100 / questions.length)
      const nextHealth = Math.max(0, bossHealth - dmg)
      setBossHealth(nextHealth)
      gamification.addXP(20 * nextCombo, undefined, `boss-hit-${currentQIdx}`)
      toast.success(`💥 Direct Hit! ${nextCombo}x Combo Streak! (+${20 * nextCombo} XP)`, { icon: '⚡' })

      setTimeout(() => {
        if (currentQIdx + 1 < questions.length && nextHealth > 0) {
          setCurrentQIdx(i => i + 1)
          setSelectedOpt(null)
          setIsAnswered(false)
        } else {
          setBossHealth(0)
          setIsVictory(true)
          gamification.addXP(60, undefined, 'boss-arena-cleared')
          gamification.launchConfetti()
          toast.success('🏆 Grand Boss Defeated! Chapter Olympiad Trial Mastered!', { icon: '👑' })
          onComplete()
        }
      }, 1200)
    } else {
      setCombo(0)
      toast.error('The Guardian deflected your attack! Review the concept and try again.')
      setTimeout(() => {
        setSelectedOpt(null)
        setIsAnswered(false)
      }, 1500)
    }
  }

  const handleRestart = () => {
    setCurrentQIdx(0)
    setBossHealth(100)
    setCombo(0)
    setIsVictory(false)
    setSelectedOpt(null)
    setIsAnswered(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Arena Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-rose-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800 flex items-center gap-1">
                  <Trophy size={12} /> Olympiad Boss Arena
                </span>
                <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                  <Flame size={13} /> {combo}x Streak Multiplier
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Trial of {topicTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
          >
            <RotateCcw size={13} /> Reset Encounter
          </button>
        </div>

        {/* Victory Celebration Screen */}
        {isVictory ? (
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 rounded-3xl p-8 lg:p-12 text-center space-y-6 border-2 border-amber-400/50 shadow-2xl animate-in zoom-in-95">
            <div className="w-24 h-24 rounded-full bg-amber-400/20 text-amber-300 border-2 border-amber-300/40 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <Trophy size={50} />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
                <Sparkles size={13} /> 100% Chapter Mastery Cleared!
              </div>
              <h3 className="text-3xl font-black tracking-tight text-white">
                Chapter {chapterNum} Mastered!
              </h3>
              <p className="text-blue-100 text-sm max-w-md mx-auto leading-relaxed">
                Outstanding accomplishment! You have explored all 8 unique experiences for <strong>{chapterTitle}</strong>.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onContinueNextChapter && (
                <button
                  onClick={onContinueNextChapter}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl cursor-pointer"
                >
                  <span>{isFinalChapter ? 'Complete Academic Class' : 'Continue to Next Chapter'}</span>
                  <ChevronRight size={18} />
                </button>
              )}

              <button
                onClick={onNavigateHome}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-sm cursor-pointer shadow-md"
              >
                ← Return to Learning Roadmap
              </button>
            </div>
          </div>
        ) : (
          /* Active Boss Battle Arena */
          <div className="space-y-6">
            
            {/* Boss Guardian Avatar & Energy Bar */}
            <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-950 border border-rose-700 flex items-center justify-center text-2xl animate-pulse">
                    👾
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      Guardian Sentinel of {topicTitle}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Phase {currentQIdx + 1} of {questions.length}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-rose-400">{bossHealth}% Energy</span>
                </div>
              </div>

              {/* Dynamic Health Bar */}
              <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${bossHealth}%` }}
                />
              </div>
            </div>

            {/* Scenario Battle Question Card */}
            <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-5">
              <div>
                <span className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5 mb-1">
                  <Zap size={14} /> Rapid Olympiad Challenge
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {activeQ.question}
                </h3>
              </div>

              {/* High Contrast Option Buttons */}
              <div className="space-y-3 pt-2">
                {activeQ.options.map((opt, idx) => {
                  const isChosen = selectedOpt === idx
                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx, opt.isCorrect)}
                      className={`w-full p-4 rounded-2xl text-left font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                        isChosen
                          ? opt.isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-xl ring-2 ring-emerald-300'
                            : 'bg-rose-500 text-white border-rose-400'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-rose-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt.text}</span>
                        <span className="text-xs opacity-60">Trial Option {idx + 1}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 animate-in fade-in">
                  <strong className="text-emerald-400 block mb-0.5">Scientific Insight:</strong>
                  {activeQ.explanation}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  )
}
