// ─────────────────────────────────────────────────────────────────────────────
// STAGE 4: TOPIC-SPECIFIC GAME ARENA
// Original topic-specific game simulation with tactical decisions & score multipliers
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData, GameScenarioChoice } from '../types'
import { Gamepad2, Award, Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

interface StageGameArenaProps {
  lesson: MiddleLessonData
  onProceed: () => void
  onScoreUpdate: (score: number) => void
}

export const StageGameArena: React.FC<StageGameArenaProps> = ({
  lesson,
  onProceed,
  onScoreUpdate
}) => {
  const { game } = lesson

  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)
  const [lastFeedback, setLastFeedback] = useState<string | null>(null)
  const [isChoiceCorrect, setIsChoiceCorrect] = useState<boolean | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([])

  const currentScenario = game.scenarios[currentScenarioIdx] || game.scenarios[0]
  const isGameFinished = completedScenarios.length >= game.scenarios.length

  const handleChoice = (choice: GameScenarioChoice) => {
    if (selectedChoiceId) return // already answered this round

    setSelectedChoiceId(choice.id)
    setIsChoiceCorrect(choice.isCorrect)
    setLastFeedback(choice.feedback)

    if (choice.isCorrect) {
      gameAudio.playSuccess()
      const multiplier = 1 + streak * 0.2
      const awardedPoints = Math.round(choice.points * multiplier)
      const nextScore = totalScore + awardedPoints
      setTotalScore(nextScore)
      setStreak((prev) => prev + 1)
      onScoreUpdate(nextScore)

      if (!completedScenarios.includes(currentScenarioIdx)) {
        setCompletedScenarios((prev) => [...prev, currentScenarioIdx])
      }

      if (completedScenarios.length + 1 >= game.scenarios.length) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
      }
    } else {
      gameAudio.playError()
      setStreak(0)
    }
  }

  const handleNextScenario = () => {
    gameAudio.playTap()
    setSelectedChoiceId(null)
    setIsChoiceCorrect(null)
    setLastFeedback(null)

    if (currentScenarioIdx < game.scenarios.length - 1) {
      setCurrentScenarioIdx((prev) => prev + 1)
    }
  }

  const handleResetGame = () => {
    gameAudio.playTap()
    setCurrentScenarioIdx(0)
    setSelectedChoiceId(null)
    setIsChoiceCorrect(null)
    setLastFeedback(null)
    setTotalScore(0)
    setStreak(0)
    setCompletedScenarios([])
  }

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Gamepad2 size={14} />
            <span>Stage 4: Gamified Challenge Arena</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">{game.engineType}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            {game.gameTitle}
          </h2>
        </div>

        {/* Live Score & Streak */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono flex items-center gap-1.5">
            <Award size={14} className="text-amber-400" />
            <span className="text-slate-400">Score:</span>
            <span className="text-amber-300 font-black text-sm">{totalScore} pts</span>
          </div>
          {streak > 1 && (
            <div className="px-2.5 py-1 rounded-xl bg-amber-950/70 border border-amber-600/50 text-xs font-bold text-amber-300 flex items-center gap-1">
              <Zap size={13} className="text-amber-400 fill-amber-400" />
              <span>{streak}x Streak</span>
            </div>
          )}
        </div>
      </div>

      {/* GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining the Game) */}
      <GaioAiGuideAvatar
        conceptTitle={game.gameTitle}
        simpleText={`Game Time! In this challenge, look closely at the clues and pick the smartest answer to score points and build a streak!`}
        lessonTitle={lesson.chapterTitle}
      />

      {/* Main Game Interface */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Scenario Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Level {currentScenario.levelNumber} of {game.scenarios.length}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {currentScenario.title}
            </h3>
          </div>
          <div className="flex gap-1.5">
            {game.scenarios.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  completedScenarios.includes(idx)
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                    : idx === currentScenarioIdx
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Evidence Dossier */}
        <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800/80 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Incoming Tactical Telemetry / Case Evidence:
          </span>
          <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
            {currentScenario.evidence}
          </p>
        </div>

        {/* Choices Options */}
        <div className="space-y-2.5 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Select Your Algorithmic Intervention:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentScenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  disabled={selectedChoiceId !== null}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? choice.isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                        : 'bg-rose-950/70 border-rose-500 text-white shadow-lg shadow-rose-950/50'
                      : selectedChoiceId !== null
                      ? 'bg-slate-950/40 border-slate-800/50 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-950/70 border-slate-800 hover:border-amber-500/60 hover:bg-slate-900 text-slate-200 active:scale-98'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{choice.title}</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/30">
                        +{choice.points} XP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {choice.description}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-slate-300">
                    <span>{choice.actionLabel}</span>
                    {isSelected && (
                      choice.isCorrect ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <XCircle size={14} className="text-rose-400" />
                      )
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feedback & Round Progression */}
        {lastFeedback && (
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between animate-fade-in ${
              isChoiceCorrect
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
            }`}
          >
            <span>{lastFeedback}</span>
            {currentScenarioIdx < game.scenarios.length - 1 ? (
              <button
                onClick={handleNextScenario}
                className="ml-3 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                Next Level →
              </button>
            ) : (
              <span className="text-emerald-300 font-bold ml-2">All Levels Cleared! 🏆</span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <button
          onClick={handleResetGame}
          className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={12} /> Replay Game
        </button>
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Open Python Sandbox</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
