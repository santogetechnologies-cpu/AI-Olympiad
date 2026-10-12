// ─────────────────────────────────────────────────────────────────────────────
// STAGE 7: RESPONSIBLE AI ETHICS & CERTIFICATION
// Ethical governance dilemma, impact analysis, XP award & badge unlock
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData } from '../types'
import { ShieldCheck, Award, Star, CheckCircle, ArrowRight, Sparkles, AlertCircle, RotateCcw } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

interface StageResponsibleAIProps {
  lesson: MiddleLessonData
  onCompleteLesson: () => void
  onNextLesson?: () => void
  onOpenJargonBuster?: () => void
}

export const StageResponsibleAI: React.FC<StageResponsibleAIProps> = ({
  lesson,
  onCompleteLesson,
  onNextLesson,
  onOpenJargonBuster
}) => {
  const { responsible } = lesson

  const [selectedEthicId, setSelectedEthicId] = useState<string | null>(null)
  const [hasCompleted, setHasCompleted] = useState(false)

  const selectedChoice = responsible.choices.find((c) => c.id === selectedEthicId)

  const handleSelectEthic = (id: string) => {
    setSelectedEthicId(id)
    gameAudio.playTap()
  }

  const handleClaimBadge = () => {
    setHasCompleted(true)
    gameAudio.playVictory()
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    })
    onCompleteLesson()
  }

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Banner */}
      <div className="border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <ShieldCheck size={14} />
          <span>Stage 7: Responsible AI & Certification</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono">Ethics & Governance</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
          {responsible.title}
        </h2>
      </div>

      {/* GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining Ethics & Safety) */}
      <GaioAiGuideAvatar
        conceptTitle="Being Fair, Safe & Honest"
        simpleText="Rules keep everyone safe! Just like sharing toys at recess and keeping secrets safe in a treasure chest, we always make sure our AI treats every person fairly and never tells private lies!"
        lessonTitle={lesson.chapterTitle}
      />

      {/* Main Dilemma Decision Area */}
      {!hasCompleted ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl space-y-4">
          <div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 mb-3 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Ethical Governance Dilemma:
              </span>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
                {responsible.dilemma}
              </p>

              {/* Kid-friendly playground analogy */}
              <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25 text-amber-100/90 text-xs flex items-start gap-2">
                <span className="text-sm shrink-0">🍪</span>
                <div>
                  <strong>Playground Fairness Rule:</strong> Imagine a playground where a new rule says only kids wearing yellow hats can play on the swings. That is unfair! Responsible AI makes sure robots treat everyone equally, protect your secret diary, and never take sneaky shortcuts.
                </div>
              </div>
            </div>

            {/* Ethical Policy Choices */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Select Your Governance Policy:
              </span>
              {onOpenJargonBuster && (
                <button
                  onClick={onOpenJargonBuster}
                  className="text-[10px] text-amber-400 hover:text-amber-200 underline font-semibold cursor-pointer"
                >
                  💡 What is AI Ethics?
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {responsible.choices.map((choice) => {
                const isSelected = selectedEthicId === choice.id
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectEthic(choice.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{choice.action}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={
                                i < choice.ethicalScore
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-700'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {choice.impactAnalysis}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                      <span>{isSelected ? '✓ Policy Selected' : 'Choose Policy'}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Consequence Reveal */}
            {selectedChoice && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-2 text-slate-300 animate-fade-in">
                <AlertCircle size={15} className="text-sky-400 shrink-0" />
                <span><strong>Regulatory Consequence:</strong> {selectedChoice.consequence}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleClaimBadge}
              disabled={!selectedEthicId}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
            >
              <Sparkles size={16} />
              <span>Complete Mission & Unlock Badge</span>
            </button>
          </div>
        </div>
      ) : (
        /* Mission Celebration & Badge Card */
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-xl shadow-amber-500/20 mb-4 animate-bounce">
            <Award size={36} className="text-slate-950" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            Mission Successfully Accomplished!
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
            {lesson.badgeTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6">
            You have mastered theoretical principles, verified Python implementations, scored in the Olympiad Arena, and enforced ethical AI governance for {lesson.lessonTitle}!
          </p>

          {/* Reward Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 w-full max-w-md">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">XP Awarded</span>
              <div className="text-lg sm:text-xl font-black text-amber-400 mt-0.5">
                +{lesson.xpReward} XP
              </div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Stars</span>
              <div className="text-lg sm:text-xl font-black text-yellow-300 mt-0.5 flex items-center justify-center gap-1">
                3 <Star size={14} className="fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Status</span>
              <div className="text-xs font-bold text-emerald-400 mt-1">
                Certified
              </div>
            </div>
          </div>

          {/* Forward Button */}
          <div className="flex gap-3">
            <button
              onClick={() => setHasCompleted(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Review Dilemma</span>
            </button>
            {onNextLesson && (
              <button
                onClick={onNextLesson}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Advance to Next Lesson</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="pt-2 text-center text-xs text-slate-500">
        AI Olympiad Official Curriculum • Responsible Intelligence Certified
      </div>
    </div>
  )
}
