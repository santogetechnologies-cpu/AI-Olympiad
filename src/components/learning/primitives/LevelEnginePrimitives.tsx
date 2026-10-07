import React, { useState, useMemo } from 'react'
import {
  CheckCircle2, XCircle, ArrowRight, RotateCcw,
  Sparkles, Award, Zap, Shield, Check, Info,
  ChevronUp, ChevronDown, Compass, Eye, Cpu, Lightbulb,
  Camera, Mic, Sliders, Sun, Moon, Lock, Unlock, Play, Terminal, Wrench, X
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import { AuraGuideAvatar, type GuideMood } from './AuraGuideAvatar'
import { RoboticIllustration, RandomRoboticBadge } from './RoboticIllustrations'
import { TopicLessonIllustration } from './TopicLessonIllustration'
import { useLearningNavigation } from '../LearningNavigationContext'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface LevelHUDProps {
  totalSteps: number
  currentStep: number
  badge: string
  title: string
  xpReward?: number
  onResetStep?: () => void
}

export interface FeedbackState {
  type: 'correct' | 'incorrect' | 'info' | null
  title?: string
  message: string
  hint?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. LEVEL SHELL & PROGRESS HUD (MOBILE-FIRST)
// ─────────────────────────────────────────────────────────────────────────────

export const LevelShell: React.FC<{
  children: React.ReactNode
  totalSteps: number
  currentStep: number
  badge: string
  title: string
  xpReward?: number
  onResetStep?: () => void
}> = ({
  children,
  totalSteps,
  currentStep,
  badge,
  title,
  xpReward = 20,
  onResetStep
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-1.5 sm:px-4 py-1 sm:py-3 h-full max-h-full overflow-hidden">
      {/* Compact Mobile Top HUD */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-slate-200 shadow-2xs mb-1.5 sm:mb-2.5 shrink-0">
        {/* Progress Segmented Capsules */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const isDone = i < currentStep
            const isCurrent = i === currentStep
            return (
              <div
                key={i}
                className={`h-1.5 sm:h-2 rounded-full flex-1 transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-500 shadow-xs'
                    : isCurrent
                    ? 'bg-indigo-600 shadow-xs ring-2 ring-indigo-300 ring-offset-1'
                    : 'bg-slate-200'
                }`}
              />
            )
          })}
        </div>

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md inline-block">
              {badge}
            </span>
            <h2 className="text-[11px] sm:text-sm font-black text-slate-900 truncate mt-0.5">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {onResetStep && (
              <button
                onClick={onResetStep}
                title="Restart current step"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
              </button>
            )}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-black text-amber-800">
              <Zap size={10} className="text-amber-500 fill-amber-500" />
              <span>+{xpReward} XP</span>
            </div>
            <div className="text-[9px] sm:text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-lg">
              {Math.min(currentStep + 1, totalSteps)}/{totalSteps}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Scene Canvas */}
      <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1.1 TWO-PHASE LESSON SHELL (PHASE 1: LEARN -> PHASE 2: PLAY)
// ─────────────────────────────────────────────────────────────────────────────

export interface LessonKeyPoint {
  icon?: React.ElementType
  title: string
  text: string
}

export interface TwoPhaseLessonShellProps {
  badge: string
  title: string
  lessonSubtitle?: string
  simpleDefinition: string
  keyPoints?: LessonKeyPoint[]
  aiDialogue: string
  aiMood?: GuideMood
  htmlContent?: string
  imageSrc?: string
  videoUrl?: string
  children: React.ReactNode
  totalGameSteps: number
  currentGameStep: number
  xpReward?: number
  onResetStep?: () => void
  gamePrompt?: string
}

export const TwoPhaseLessonShell: React.FC<TwoPhaseLessonShellProps> = ({
  badge,
  title,
  lessonSubtitle,
  simpleDefinition,
  keyPoints = [],
  aiDialogue,
  aiMood = 'explaining',
  htmlContent,
  imageSrc,
  videoUrl,
  children,
  totalGameSteps,
  currentGameStep,
  xpReward = 20,
  onResetStep,
}) => {
  const [phase, setPhase] = useState<'learn' | 'play'>('learn')
  const [showReview, setShowReview] = useState(false)
  const [showFullArticle, setShowFullArticle] = useState(false)
  const [cardScene, setCardScene] = useState<number>(0)

  const handleStartGame = () => {
    gameAudio.playTap()
    setPhase('play')
  }

  // Calculate points per scene (max 2 points per page on mobile to guarantee zero scroll)
  const pointsPerPage = 2
  const totalPointScenes = Math.max(1, Math.ceil(keyPoints.length / pointsPerPage))
  const currentPoints = keyPoints.slice(cardScene * pointsPerPage, (cardScene + 1) * pointsPerPage)

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-1.5 sm:px-4 py-1 sm:py-3 h-full max-h-full overflow-hidden">
      {/* Top HUD with Phase Indicator */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-slate-200 shadow-2xs mb-1.5 sm:mb-2.5 shrink-0">
        {/* Progress Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5">
          {/* Phase 1 Pill */}
          <div
            className={`h-1.5 sm:h-2 rounded-full flex-1 transition-all duration-300 ${
              phase === 'play'
                ? 'bg-emerald-500'
                : 'bg-indigo-600 ring-2 ring-indigo-300 ring-offset-1'
            }`}
          />
          {/* Phase 2 Sub-steps */}
          {Array.from({ length: totalGameSteps }).map((_, i) => {
            const isDone = phase === 'play' && i < currentGameStep
            const isCurrent = phase === 'play' && i === currentGameStep
            return (
              <div
                key={i}
                className={`h-1.5 sm:h-2 rounded-full flex-1 transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-500 shadow-xs'
                    : isCurrent
                    ? 'bg-indigo-600 shadow-xs ring-2 ring-indigo-300 ring-offset-1'
                    : 'bg-slate-200'
                }`}
              />
            )
          })}
        </div>

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md inline-block">
                {badge}
              </span>
              <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md inline-block ${
                phase === 'learn'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {phase === 'learn' ? 'Phase 1: Learn' : 'Phase 2: Play'}
              </span>
            </div>
            <h2 className="text-[11px] sm:text-sm font-black text-slate-900 truncate mt-0.5">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {phase === 'play' && (
              <button
                onClick={() => setShowReview(!showReview)}
                title="Review Lesson Notes"
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
              >
                {showReview ? 'Hide' : 'Notes'}
              </button>
            )}
            {phase === 'play' && onResetStep && (
              <button
                onClick={onResetStep}
                title="Restart game challenge"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
              </button>
            )}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-black text-amber-800">
              <Zap size={10} className="text-amber-500 fill-amber-500" />
              <span>+{xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 1: LEARN (Read & Understand) */}
      {phase === 'learn' && (
        <div className="space-y-1.5 sm:space-y-2.5 flex-1 flex flex-col justify-center min-h-0 overflow-hidden animate-in fade-in zoom-in-95">
          {/* AI Robot Teacher Dialogue */}
          <AuraGuideAvatar
            mood={aiMood}
            message={aiDialogue}
            speakerName="Aura (AI Teacher)"
            size="sm"
          />

          {/* MOBILE ONLY: Standalone Lesson SVG FIRST at the top */}
          <div className="sm:hidden w-full flex justify-center py-0.5 shrink-0 select-none">
            <TopicLessonIllustration
              topic={title}
              chapterTitle={badge}
              size={105}
            />
          </div>

          {/* Core Concept Box with Robotic SVG Vector Badge - BELOW SVG on mobile */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/80 rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border-2 border-indigo-200 shadow-2xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black text-indigo-900">
                <Sparkles size={13} className="text-indigo-600" />
                <span>Lesson Concept</span>
              </div>
              <div className="flex items-center gap-1.5">
                {lessonSubtitle && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-indigo-600 bg-white/80 px-1.5 py-0.5 rounded-full border border-indigo-100">
                    {lessonSubtitle}
                  </span>
                )}
                {totalPointScenes > 1 && (
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded-md">
                    Card {cardScene + 1}/{totalPointScenes}
                  </span>
                )}
                {htmlContent && (
                  <button
                    type="button"
                    onClick={() => setShowFullArticle(true)}
                    className="px-1.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[8px] sm:text-[9px] rounded-lg border border-indigo-200 shrink-0 cursor-pointer"
                  >
                    Full Lesson
                  </button>
                )}
              </div>
            </div>

            {/* Mobile: Full-Width Definition below SVG | Desktop: Side-by-side with SVG */}
            <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${
              (title.length % 2 === 1) ? 'sm:flex-row-reverse' : 'sm:flex-row'
            }`}>
              {/* Definition - Full-width on mobile */}
              <div className="w-full flex-1 bg-white/90 p-2 sm:p-2.5 rounded-xl border border-indigo-100 min-w-0">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-800 leading-snug">
                  {simpleDefinition}
                </p>
              </div>

              {/* DESKTOP ONLY: Standalone Topic SVG Illustration (Hidden on mobile) */}
              <div className="hidden sm:flex shrink-0 items-center justify-center select-none">
                <TopicLessonIllustration topic={title} chapterTitle={badge} size={125} />
              </div>
            </div>

            {/* Optional CMS Attached Image */}
            {imageSrc && (
              <div className="w-full max-h-20 sm:max-h-28 rounded-xl overflow-hidden border border-indigo-100 shadow-2xs">
                <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Simple Key Ideas (Paginated Scene Stepper to prevent any mobile vertical overflow) */}
            {keyPoints.length > 0 && (
              <div className="space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5 pt-0.5">
                  {currentPoints.map((pt, idx) => {
                    const Icon = pt.icon || CheckCircle2
                    return (
                      <div
                        key={idx}
                        className="bg-white/95 rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-slate-200 flex items-start gap-1.5 shadow-2xs"
                      >
                        <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                          <Icon size={11} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                            {pt.title}
                          </h4>
                          <p className="text-[9px] sm:text-[10px] text-slate-600 mt-0.5 leading-tight line-clamp-2">
                            {pt.text}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Point Scene Pagination Stepper Controls */}
                {totalPointScenes > 1 && (
                  <div className="flex items-center justify-between pt-0.5">
                    <button
                      type="button"
                      disabled={cardScene === 0}
                      onClick={() => {
                        gameAudio.playTap()
                        setCardScene(prev => Math.max(0, prev - 1))
                      }}
                      className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-30 disabled:hover:text-indigo-600 px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      &larr; Prev Point
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPointScenes }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i === cardScene ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      disabled={cardScene >= totalPointScenes - 1}
                      onClick={() => {
                        gameAudio.playTap()
                        setCardScene(prev => Math.min(totalPointScenes - 1, prev + 1))
                      }}
                      className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-30 disabled:hover:text-indigo-600 px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      Next Point &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Trigger to Play Phase */}
          <div className="pt-0.5">
            <button
              onClick={handleStartGame}
              className="w-full py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-98 text-white font-black text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Play size={13} className="fill-white" />
              <span>I Understand — Start Game</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Full CMS Lesson Text Modal */}
          {showFullArticle && htmlContent && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[85vh] flex flex-col justify-between shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                    {title}
                  </h3>
                  <button
                    onClick={() => setShowFullArticle(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
                <div
                  className="flex-1 overflow-y-auto py-3 text-xs sm:text-sm text-slate-700 space-y-2 prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                <button
                  onClick={() => setShowFullArticle(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm cursor-pointer mt-2"
                >
                  Return to Learning
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: PLAY (Interactive Game Stages) */}
      {phase === 'play' && (
        <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
          {/* Quick Review Drawer if opened */}
          {showReview && (
            <div className="bg-indigo-50/95 rounded-xl p-2 sm:p-3 border-2 border-indigo-200 shadow-2xs animate-in fade-in slide-in-from-top-2 shrink-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-800">
                  Quick Lesson Summary
                </span>
                <button
                  onClick={() => setShowReview(false)}
                  className="text-[9px] text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                {simpleDefinition}
              </p>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. INTEGRATED FEEDBACK DRAWER WITH ANIME GUIDE REACTION
// ─────────────────────────────────────────────────────────────────────────────

export const FeedbackDrawer: React.FC<{
  feedback: FeedbackState
  onContinue: () => void
  onRetry: () => void
  continueLabel?: string
}> = ({
  feedback,
  onContinue,
  onRetry,
  continueLabel = 'Continue'
}) => {
  if (!feedback.type) return null

  const isCorrect = feedback.type === 'correct'
  const mood: GuideMood = isCorrect ? 'correct' : 'retry'

  return (
    <div
      className={`w-full rounded-2xl p-3 sm:p-4 border-2 shadow-md mt-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
          : 'bg-rose-50 border-rose-300 text-rose-950'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
          <AuraGuideAvatar mood={mood} size="sm" />
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-black">
              {feedback.title || (isCorrect ? 'Well Done!' : 'Not Quite Right')}
            </h3>
            <p className="text-[11px] sm:text-xs mt-0.5 leading-relaxed font-medium">
              {feedback.message}
            </p>
            {!isCorrect && feedback.hint && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-lg border border-rose-200">
                <Lightbulb size={12} className="shrink-0 text-amber-600" />
                <span><strong>Hint:</strong> {feedback.hint}</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
          {isCorrect ? (
            <button
              onClick={onContinue}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>{continueLabel}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MISSION SUCCESS CELEBRATION SCREEN
// ─────────────────────────────────────────────────────────────────────────────

export const MissionSuccessScreen: React.FC<{
  sectionTitle: string
  chapterTitle: string
  challengesCount: number
  xpEarned: number
  onContinueNext: () => void
  nextLabel?: string
}> = ({
  sectionTitle,
  chapterTitle,
  challengesCount,
  xpEarned = 25,
  onContinueNext,
  nextLabel = 'Continue to Next Section'
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 my-auto">
      {/* Animated Trophy Shield with Anime Guide & Robot Art */}
      <div className="relative flex justify-center items-center gap-3">
        <AuraGuideAvatar mood="celebrating" size="md" />
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center shadow-lg border-2 border-amber-200">
          <Award size={32} className="text-amber-900" />
        </div>
        <RandomRoboticBadge seed={sectionTitle} size={50} />
      </div>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200">
          <Sparkles size={12} className="text-emerald-600" /> Mission Complete!
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Level Mastered!
        </h1>
        <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
          You mastered all challenges in <strong className="text-slate-800">{sectionTitle}</strong>.
        </p>
      </div>

      {/* Stats Summary Box */}
      <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left">
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Challenges Solved
          </span>
          <div className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>{challengesCount}/{challengesCount} (100%)</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            XP Earned
          </span>
          <div className="text-sm sm:text-base font-black text-amber-600 flex items-center gap-1">
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            <span>+{xpEarned} XP</span>
          </div>
        </div>
      </div>

      {/* Big Action Button */}
      <button
        onClick={onContinueNext}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 text-white font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
      >
        <span>{nextLabel}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. INTERACTIVE GAMEPLAY PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

// Single Choice Cards Grid (Touch Friendly)
export const ChoiceGrid: React.FC<{
  options: { id: string; label: string; desc?: string; icon?: React.ReactNode }[]
  selectedId: string | null
  onSelect: (id: string) => void
  disabled?: boolean
}> = ({ options, selectedId, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3 cursor-pointer touch-manipulation min-h-[52px] ${
              isSelected
                ? 'bg-indigo-50/90 border-indigo-600 shadow-md ring-2 ring-indigo-200 ring-offset-1 text-indigo-950'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
            }`}
          >
            {opt.icon && (
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {opt.icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-black leading-snug">
                {opt.label}
              </div>
              {opt.desc && (
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  {opt.desc}
                </div>
              )}
            </div>
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              {isSelected && <Check size={10} strokeWidth={3} />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Sequence Builder Station (Tap Up/Down arrows to order steps)
export const SequenceBuilder: React.FC<{
  items: { id: string; label: string; detail?: string }[]
  onOrderChange: (orderedIds: string[]) => void
  disabled?: boolean
}> = ({ items, onOrderChange, disabled }) => {
  const [order, setOrder] = useState<string[]>(() => items.map(i => i.id))

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (disabled) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= order.length) return

    const next = [...order]
    const temp = next[index]
    next[index] = next[targetIdx]
    next[targetIdx] = temp
    setOrder(next)
    onOrderChange(next)
    gameAudio.playTap()
  }

  return (
    <div className="space-y-1.5">
      {order.map((itemId, idx) => {
        const item = items.find(i => i.id === itemId)
        if (!item) return null
        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2.5 p-2.5 sm:p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-800 truncate">
                  {item.label}
                </div>
                {item.detail && (
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    {item.detail}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={disabled || idx === 0}
                onClick={() => moveItem(idx, 'up')}
                className="p-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-100 cursor-pointer"
                title="Move step up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                disabled={disabled || idx === order.length - 1}
                onClick={() => moveItem(idx, 'down')}
                className="p-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-100 cursor-pointer"
                title="Move step down"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Tap-To-Connect Matching Station
export const MatchPairStation: React.FC<{
  pairs: { id: string; left: string; right: string; icon?: React.ReactNode }[]
  onAllMatched: () => void
  disabled?: boolean
}> = ({ pairs, onAllMatched, disabled }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [shuffledRights] = useState(() => [...pairs].sort(() => Math.random() - 0.5))

  const handleLeftClick = (id: string) => {
    if (disabled || matchedPairs.includes(id)) return
    setSelectedLeft(id)
    gameAudio.playTap()
  }

  const handleRightClick = (id: string) => {
    if (disabled || !selectedLeft) return
    if (selectedLeft === id) {
      const next = [...matchedPairs, id]
      setMatchedPairs(next)
      setSelectedLeft(null)
      gameAudio.playSuccess()
      if (next.length === pairs.length) {
        onAllMatched()
      }
    } else {
      gameAudio.playWrong()
      setSelectedLeft(null)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <div className="space-y-1.5">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Input Sensor
        </span>
        {pairs.map(p => {
          const isMatched = matchedPairs.includes(p.id)
          const isSelected = selectedLeft === p.id
          return (
            <button
              key={`left-${p.id}`}
              type="button"
              disabled={disabled || isMatched}
              onClick={() => handleLeftClick(p.id)}
              className={`w-full p-2.5 rounded-xl border-2 text-left text-xs font-black transition-all cursor-pointer min-h-[44px] flex items-center justify-between ${
                isMatched
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80'
                  : isSelected
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <span className="truncate">{p.left}</span>
              {isMatched && <Check size={12} className="text-emerald-600 shrink-0" />}
            </button>
          )
        })}
      </div>

      <div className="space-y-1.5">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Robot Action
        </span>
        {shuffledRights.map(p => {
          const isMatched = matchedPairs.includes(p.id)
          return (
            <button
              key={`right-${p.id}`}
              type="button"
              disabled={disabled || isMatched}
              onClick={() => handleRightClick(p.id)}
              className={`w-full p-2.5 rounded-xl border-2 text-left text-xs font-black transition-all cursor-pointer min-h-[44px] flex items-center justify-between ${
                isMatched
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80'
                  : selectedLeft
                  ? 'bg-amber-50/60 border-amber-300 hover:bg-amber-100/80 text-slate-800 hover:border-amber-500'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="truncate">{p.right}</span>
              {isMatched && <Check size={12} className="text-emerald-600 shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 2-Bin Classification Sorter
export const ClassificationSorter: React.FC<{
  items: { id: string; label: string; bin?: 'A' | 'B'; correctBin?: 'A' | 'B'; hint?: string }[]
  binALabel: string
  binBLabel: string
  onComplete: () => void
}> = ({ items, binALabel, binBLabel, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const currentItem = items[currentIdx]

  const handleSort = (selectedBin: 'A' | 'B') => {
    if (!currentItem) return
    const targetBin = currentItem.correctBin || currentItem.bin || 'A'
    const isCorrect = targetBin === selectedBin
    if (isCorrect) {
      gameAudio.playSuccess()
      if (currentIdx + 1 < items.length) {
        setCurrentIdx(prev => prev + 1)
        setFeedback({ type: null, message: '' })
      } else {
        onComplete()
      }
    } else {
      gameAudio.playWrong()
      setFeedback({
        type: 'incorrect',
        message: `Think carefully about where "${currentItem.label}" belongs.`,
        hint: currentItem.hint || `Does this belong to ${binALabel} or ${binBLabel}?`
      })
    }
  }

  if (!currentItem) return null

  return (
    <div className="space-y-3">
      {/* Current Card to Classify */}
      <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm text-center space-y-1.5 animate-in zoom-in-95">
        <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          Card {currentIdx + 1} of {items.length}
        </span>
        <h3 className="text-sm sm:text-base font-black text-slate-900">
          {currentItem.label}
        </h3>
        <p className="text-[11px] text-slate-500 font-medium">
          Which category does this item belong to?
        </p>
      </div>

      {/* 2 Category Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        <button
          onClick={() => handleSort('A')}
          className="p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 hover:border-indigo-500 text-indigo-950 font-black text-xs sm:text-sm text-center transition-all cursor-pointer active:scale-95 shadow-xs"
        >
          {binALabel}
        </button>
        <button
          onClick={() => handleSort('B')}
          className="p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border-2 border-teal-300 hover:border-teal-500 text-teal-950 font-black text-xs sm:text-sm text-center transition-all cursor-pointer active:scale-95 shadow-xs"
        >
          {binBLabel}
        </button>
      </div>

      {feedback.type === 'incorrect' && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => {}}
          onRetry={() => setFeedback({ type: null, message: '' })}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. INTERACTIVE SLIDER / PARAMETER TUNER GAME
// ─────────────────────────────────────────────────────────────────────────────

export const InteractiveSliderTuner: React.FC<{
  title: string
  description: string
  min: number
  max: number
  step?: number
  unit?: string
  targetRange: [number, number]
  optimalLabel: string
  suboptimalLabel: string
  onCorrect: () => void
  disabled?: boolean
}> = ({
  title,
  description,
  min,
  max,
  step = 1,
  unit = '',
  targetRange,
  optimalLabel,
  suboptimalLabel,
  onCorrect,
  disabled
}) => {
  const [value, setValue] = useState(Math.round((min + max) / 2))
  const [locked, setLocked] = useState(false)
  const isOptimal = value >= targetRange[0] && value <= targetRange[1]

  const handleCommit = () => {
    if (isOptimal) {
      gameAudio.playSuccess()
      setLocked(true)
      onCorrect()
    } else {
      gameAudio.playWrong()
    }
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-indigo-200 shadow-sm space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <h3 className="text-xs sm:text-sm font-black text-slate-900">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{description}</p>
      </div>

      <div className="bg-slate-900 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center space-y-2 border border-slate-800">
        <div className="text-xl sm:text-2xl font-mono font-black text-indigo-400">
          {value}{unit}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled || locked}
          value={value}
          onChange={e => {
            setValue(Number(e.target.value))
            gameAudio.playTap()
          }}
          className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[9px] font-mono text-slate-400">
          <span>{min}{unit}</span>
          <span>Target: {targetRange[0]}-{targetRange[1]}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      <div className={`p-2 sm:p-2.5 rounded-xl text-center text-[10px] sm:text-xs font-bold border transition-all ${
        isOptimal
          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
          : 'bg-amber-50 border-amber-300 text-amber-900'
      }`}>
        {isOptimal ? optimalLabel : suboptimalLabel}
      </div>

      <button
        type="button"
        onClick={handleCommit}
        disabled={disabled || locked || !isOptimal}
        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-98"
      >
        <Check size={14} />
        <span>Confirm Parameter Calibration</span>
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. VISUAL INSPECTION SCANNER
// ─────────────────────────────────────────────────────────────────────────────

export interface InspectionSpot {
  id: string
  label: string
  isAnomaly?: boolean
  feedback?: string
  explanation?: string
  icon?: React.ReactNode
}

export const VisualInspectionScanner: React.FC<{
  title: string
  instruction?: string
  prompt?: string
  spots?: InspectionSpot[]
  hotspots?: { id: string; label: string; icon?: React.ReactNode; explanation?: string; feedback?: string; isAnomaly?: boolean }[]
  targetAnomaliesCount?: number
  onScannedAll?: () => void
  onAllDiscovered?: () => void
  disabled?: boolean
}> = ({
  title,
  instruction,
  prompt,
  spots,
  hotspots,
  targetAnomaliesCount,
  onScannedAll,
  onAllDiscovered,
  disabled
}) => {
  const displayInstruction = prompt || instruction || 'Scan and identify all target system components.'
  const rawItems = (hotspots || spots || []).map(item => ({
    id: item.id,
    label: item.label,
    isAnomaly: item.isAnomaly !== undefined ? item.isAnomaly : true,
    feedback: item.explanation || item.feedback || `${item.label} verified and registered!`,
    icon: item.icon
  }))
  const requiredCount = targetAnomaliesCount ?? rawItems.filter(i => i.isAnomaly).length

  const [discovered, setDiscovered] = useState<string[]>([])
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const handleInspect = (spot: typeof rawItems[0]) => {
    if (disabled || discovered.includes(spot.id)) return
    if (spot.isAnomaly) {
      gameAudio.playSuccess()
      const next = [...discovered, spot.id]
      setDiscovered(next)
      setFeedback({
        type: 'correct',
        title: 'Component / Anomaly Verified!',
        message: spot.feedback
      })
      if (next.length >= requiredCount) {
        if (onScannedAll) onScannedAll()
        if (onAllDiscovered) onAllDiscovered()
      }
    } else {
      gameAudio.playWrong()
      setFeedback({
        type: 'incorrect',
        message: spot.feedback || 'This region is operating normally. Continue scanning for targets!',
        hint: 'Check sensor telemetry or anomalies.'
      })
    }
  }

  return (
    <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-emerald-500/60 shadow-xl space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
            Vision HUD Scanner
          </span>
          <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
            Found: {discovered.length}/{requiredCount}
          </span>
        </div>
        <h3 className="text-xs sm:text-sm font-black text-white">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{displayInstruction}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {rawItems.map(spot => {
          const isDone = discovered.includes(spot.id)
          return (
            <button
              key={spot.id}
              type="button"
              disabled={disabled || isDone}
              onClick={() => handleInspect(spot)}
              className={`p-2.5 rounded-xl border text-left font-mono text-[11px] sm:text-xs transition-all flex items-center justify-between min-h-[46px] cursor-pointer ${
                isDone
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 active:scale-95'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                {spot.icon ? (
                  <div className={isDone ? 'text-emerald-400' : 'text-slate-400'}>{spot.icon}</div>
                ) : (
                  <Eye size={13} className={isDone ? 'text-emerald-400' : 'text-slate-500'} />
                )}
                <span className="truncate font-bold">{spot.label}</span>
              </div>
              {isDone && <Check size={13} className="text-emerald-400 shrink-0" />}
            </button>
          )
        })}
      </div>

      {feedback.type && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => setFeedback({ type: null, message: '' })}
          onRetry={() => setFeedback({ type: null, message: '' })}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CIRCUIT & SIGNAL WIRE STATION
// ─────────────────────────────────────────────────────────────────────────────

export interface WireNode {
  id: string
  label: string
  portId: string
  color?: string
}

export const CircuitWireStation: React.FC<{
  title: string
  instruction: string
  terminals: { id: string; label: string; icon?: React.ReactNode }[]
  ports: { id: string; label: string; matchesTerminalId: string }[]
  onAllConnected: () => void
  disabled?: boolean
}> = ({
  title,
  instruction,
  terminals,
  ports,
  onAllConnected,
  disabled
}) => {
  const [selectedTerminal, setSelectedTerminal] = useState<string | null>(null)
  const [connections, setConnections] = useState<{ [terminalId: string]: string }>({})
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const handleTerminalClick = (id: string) => {
    if (disabled || connections[id]) return
    setSelectedTerminal(id)
    gameAudio.playTap()
  }

  const handlePortClick = (port: typeof ports[0]) => {
    if (disabled || !selectedTerminal) return
    if (port.matchesTerminalId === selectedTerminal) {
      gameAudio.playSuccess()
      const next = { ...connections, [selectedTerminal]: port.id }
      setConnections(next)
      setSelectedTerminal(null)
      setFeedback({ type: null, message: '' })
      if (Object.keys(next).length === terminals.length) {
        onAllConnected()
      }
    } else {
      gameAudio.playWrong()
      setFeedback({
        type: 'incorrect',
        message: `Wiring mismatch! Think about which circuit port handles this signal.`,
        hint: `Match the terminal signal to its corresponding receiving port.`
      })
      setSelectedTerminal(null)
    }
  }

  return (
    <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-indigo-500/60 shadow-xl space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
          Circuit Signal Bus
        </span>
        <h3 className="text-xs sm:text-sm font-black text-white">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{instruction}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* Terminals Column */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase block px-1">
            Input Transmitters
          </span>
          {terminals.map(term => {
            const isConnected = !!connections[term.id]
            const isSelected = selectedTerminal === term.id
            return (
              <button
                key={term.id}
                type="button"
                disabled={disabled || isConnected}
                onClick={() => handleTerminalClick(term.id)}
                className={`w-full p-2 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[42px] cursor-pointer ${
                  isConnected
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 opacity-80'
                    : isSelected
                    ? 'bg-cyan-900/90 border-cyan-400 text-cyan-100 ring-2 ring-cyan-400 shadow-md'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {term.icon && <div className="text-cyan-400 shrink-0">{term.icon}</div>}
                  <span className="truncate text-[11px] sm:text-xs">{term.label}</span>
                </div>
                {isConnected ? (
                  <Check size={12} className="text-emerald-400 shrink-0" />
                ) : (
                  <div className={`w-2.5 h-2.5 rounded-full border ${isSelected ? 'bg-cyan-400 border-cyan-300 animate-ping' : 'bg-slate-800 border-slate-600'}`} />
                )}
              </button>
            )
          })}
        </div>

        {/* Ports Column */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-indigo-300 font-bold uppercase block px-1">
            Logic Receiving Ports
          </span>
          {ports.map(port => {
            const connectedTerminalId = Object.keys(connections).find(tId => connections[tId] === port.id)
            const isConnected = !!connectedTerminalId
            return (
              <button
                key={port.id}
                type="button"
                disabled={disabled || isConnected}
                onClick={() => handlePortClick(port)}
                className={`w-full p-2 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[42px] cursor-pointer ${
                  isConnected
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 opacity-80'
                    : selectedTerminal
                    ? 'bg-indigo-950/80 border-indigo-400 hover:bg-indigo-900 text-indigo-200 hover:border-indigo-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`w-2.5 h-2.5 rounded-full border ${isConnected ? 'bg-emerald-400 border-emerald-300' : 'bg-indigo-600 border-indigo-400'}`} />
                  <span className="truncate text-[11px] sm:text-xs">{port.label}</span>
                </div>
                {isConnected && <Check size={12} className="text-emerald-400 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {feedback.type === 'incorrect' && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => {}}
          onRetry={() => setFeedback({ type: null, message: '' })}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. BUG FIX & HARDWARE REPAIR STATION
// ─────────────────────────────────────────────────────────────────────────────

export const BugRepairStation: React.FC<{
  title: string
  scenario: string
  faultyComponent: string
  repairOptions: { id: string; label: string; isCorrect: boolean; explanation: string }[]
  onRepaired: () => void
  disabled?: boolean
}> = ({
  title,
  scenario,
  faultyComponent,
  repairOptions,
  onRepaired,
  disabled
}) => {
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const handleSelect = (opt: typeof repairOptions[0]) => {
    if (disabled) return
    setSelectedOpt(opt.id)
    if (opt.isCorrect) {
      gameAudio.playSuccess()
      setFeedback({
        type: 'correct',
        title: 'System Repaired & Calibrated!',
        message: opt.explanation
      })
      onRepaired()
    } else {
      gameAudio.playWrong()
      setFeedback({
        type: 'incorrect',
        message: opt.explanation || 'That repair part does not resolve the diagnosed error.',
        hint: 'Review what component is currently failing.'
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-rose-200 shadow-sm space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <span className="text-[9px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full inline-block">
          Diagnostics & Repair Lab
        </span>
        <h3 className="text-xs sm:text-sm font-black text-slate-900">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{scenario}</p>
      </div>

      {/* Warning Diagnosis Box */}
      <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Wrench size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-black text-rose-900 uppercase">Diagnosed Fault</div>
          <div className="text-[11px] sm:text-xs font-bold text-rose-800 leading-tight">{faultyComponent}</div>
        </div>
      </div>

      {/* Repair Options Selection */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">
          Select Replacement Component / Logic Patch
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          {repairOptions.map(opt => {
            const isSelected = selectedOpt === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(opt)}
                className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer min-h-[44px] flex items-center justify-between ${
                  isSelected
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                }`}
              >
                <span className="text-[11px] sm:text-xs font-bold">{opt.label}</span>
                {isSelected && opt.isCorrect && <Check size={12} className="text-emerald-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {feedback.type && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => setFeedback({ type: null, message: '' })}
          onRetry={() => setFeedback({ type: null, message: '' })}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. DATA COLLECTOR & TRAINING SET GRID
// ─────────────────────────────────────────────────────────────────────────────

export const DataCollectorGrid: React.FC<{
  title: string
  goalPrompt: string
  tokens: { id: string; label: string; isValid: boolean; icon?: React.ReactNode }[]
  targetCount: number
  onCollectedAll: () => void
  disabled?: boolean
}> = ({
  title,
  goalPrompt,
  tokens,
  targetCount,
  onCollectedAll,
  disabled
}) => {
  const [collected, setCollected] = useState<string[]>([])
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const handleTapToken = (token: typeof tokens[0]) => {
    if (disabled || collected.includes(token.id)) return
    if (token.isValid) {
      gameAudio.playSuccess()
      const next = [...collected, token.id]
      setCollected(next)
      if (next.length >= targetCount) {
        onCollectedAll()
      }
    } else {
      gameAudio.playWrong()
      setFeedback({
        type: 'incorrect',
        message: `"${token.label}" is noisy/invalid data for this training set. Select only valid samples!`,
        hint: 'Look closely at the training objective.'
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-indigo-200 shadow-sm space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
            Dataset Curator
          </span>
          <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Collected: {collected.length}/{targetCount}
          </span>
        </div>
        <h3 className="text-xs sm:text-sm font-black text-slate-900">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{goalPrompt}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
        {tokens.map(tok => {
          const isDone = collected.includes(tok.id)
          return (
            <button
              key={tok.id}
              type="button"
              disabled={disabled || isDone}
              onClick={() => handleTapToken(tok)}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[58px] gap-1 ${
                isDone
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80'
                  : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 hover:border-indigo-400 text-slate-800 active:scale-95'
              }`}
            >
              {tok.icon && <div className="text-indigo-600">{tok.icon}</div>}
              <span className="text-[10px] sm:text-[11px] font-bold truncate max-w-full">{tok.label}</span>
              {isDone && <span className="text-[8px] font-bold text-emerald-600">Added ✓</span>}
            </button>
          )
        })}
      </div>

      {feedback.type === 'incorrect' && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => {}}
          onRetry={() => setFeedback({ type: null, message: '' })}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. CODE & PROMPT BLOCK ASSEMBLER
// ─────────────────────────────────────────────────────────────────────────────

export const CodeBlockAssembler: React.FC<{
  title: string
  instruction: string
  availableBlocks: { id: string; text: string }[]
  targetSequence: string[]
  onCorrectSequence: () => void
  disabled?: boolean
}> = ({
  title,
  instruction,
  availableBlocks,
  targetSequence,
  onCorrectSequence,
  disabled
}) => {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([])
  const [feedback, setFeedback] = useState<FeedbackState>({ type: null, message: '' })

  const handleAddBlock = (id: string) => {
    if (disabled || selectedBlocks.includes(id)) return
    gameAudio.playTap()
    const next = [...selectedBlocks, id]
    setSelectedBlocks(next)

    if (next.length === targetSequence.length) {
      const isMatch = next.every((val, idx) => val === targetSequence[idx])
      if (isMatch) {
        gameAudio.playSuccess()
        setFeedback({
          type: 'correct',
          title: 'Code Pipeline Compiled Successfully!',
          message: 'All blocks are correctly sequenced in executable order.'
        })
        onCorrectSequence()
      } else {
        gameAudio.playWrong()
        setFeedback({
          type: 'incorrect',
          message: 'The blocks are not in the correct executable order. Reset and try again!',
          hint: 'Think about what step must happen first in this logic chain.'
        })
      }
    }
  }

  const handleReset = () => {
    gameAudio.playTap()
    setSelectedBlocks([])
    setFeedback({ type: null, message: '' })
  }

  return (
    <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-indigo-500/60 shadow-xl space-y-2 sm:space-y-3">
      <div className="text-center space-y-0.5">
        <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
          Terminal Block Assembler
        </span>
        <h3 className="text-xs sm:text-sm font-black text-white">{title}</h3>
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{instruction}</p>
      </div>

      {/* Assembled Code Line Buffer */}
      <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 min-h-[48px] flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0 flex-1">
          {selectedBlocks.length === 0 ? (
            <span className="text-[10px] font-mono text-slate-500 italic">[Tap blocks below to assemble instruction...]</span>
          ) : (
            selectedBlocks.map((bId, idx) => {
              const b = availableBlocks.find(x => x.id === bId)
              return (
                <span
                  key={bId}
                  className="bg-indigo-600/90 text-white text-[10px] sm:text-[11px] font-mono font-bold px-2 py-1 rounded-md border border-indigo-400 shadow-2xs"
                >
                  <span className="text-indigo-200 text-[9px] mr-1">{idx + 1}.</span>
                  {b?.text}
                </span>
              )
            })
          )}
        </div>
        {selectedBlocks.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            title="Clear Assembly"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>

      {/* Available Blocks Pool */}
      <div className="grid grid-cols-2 gap-1.5">
        {availableBlocks.map(block => {
          const isUsed = selectedBlocks.includes(block.id)
          return (
            <button
              key={block.id}
              type="button"
              disabled={disabled || isUsed}
              onClick={() => handleAddBlock(block.id)}
              className={`p-2 rounded-xl border text-center font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                isUsed
                  ? 'bg-slate-800/40 border-slate-700 text-slate-600 line-through'
                  : 'bg-slate-800 hover:bg-indigo-900/60 border-slate-700 hover:border-indigo-400 text-indigo-200 active:scale-95'
              }`}
            >
              {block.text}
            </button>
          )
        })}
      </div>

      {feedback.type && (
        <FeedbackDrawer
          feedback={feedback}
          onContinue={() => setFeedback({ type: null, message: '' })}
          onRetry={handleReset}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. UNIVERSAL 5-STEP LESSON ENGINE
// Flow: Learn (Step 0) -> Game 1 (Step 1) -> Game 2 (Step 2) -> Game 3 (Step 3) -> Complete (Step 4)
// Zero scrolling on mobile, paginated concept points, rich interactive games
// ─────────────────────────────────────────────────────────────────────────────

export interface LessonGameDescriptor {
  badge: string
  title: string
  render: (onPass: () => void) => React.ReactNode
}

export interface UniversalLessonGameEngineProps {
  badge: string
  title: string
  lessonSubtitle?: string
  simpleDefinition: string
  keyPoints: LessonKeyPoint[]
  oneWordPoint?: { question: string; answer: string }
  smallExample?: string
  aiDialogue: string
  aiMood?: GuideMood
  htmlContent?: string
  imageSrc?: string
  games: [LessonGameDescriptor, LessonGameDescriptor, LessonGameDescriptor]
  xpReward?: number
  isCompleted?: boolean
  onComplete: () => void
  onClose?: () => void
  onJumpToSection?: (idx: number) => void
  nextSectionIdx?: number
}

export const UniversalLessonGameEngine: React.FC<UniversalLessonGameEngineProps> = ({
  badge,
  title,
  lessonSubtitle,
  simpleDefinition,
  keyPoints = [],
  oneWordPoint,
  smallExample,
  aiDialogue,
  aiMood = 'explaining',
  htmlContent,
  imageSrc,
  games,
  xpReward = 25,
  isCompleted = false,
  onComplete,
  onClose,
  onJumpToSection,
  nextSectionIdx
}) => {
  const navContext = useLearningNavigation()
  const handleClose = onClose || navContext.onClose
  // Step: 0 = Learn, 1 = Game 1, 2 = Game 2, 3 = Game 3, 4 = Lesson Complete
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4>(0)
  const [cardScene, setCardScene] = useState<number>(0)
  const [showFullArticle, setShowFullArticle] = useState(false)

  // Natural layout variation between lessons - Called unconditionally before any early returns
  const layoutVariant = useMemo(() => {
    const sum = (title + badge).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return sum % 3 // 0, 1, or 2
  }, [title, badge])

  const pointsPerPage = 2
  const totalPointScenes = Math.max(1, Math.ceil(keyPoints.length / pointsPerPage))
  const currentPoints = keyPoints.slice(cardScene * pointsPerPage, (cardScene + 1) * pointsPerPage)

  const handleStartGames = () => {
    gameAudio.playTap()
    setCurrentStep(1)
  }

  const handleGamePass = (gameIndex: 1 | 2 | 3) => {
    gameAudio.playSuccess()
    if (gameIndex === 1) {
      setCurrentStep(2)
    } else if (gameIndex === 2) {
      setCurrentStep(3)
    } else {
      gamification.launchConfetti()
      setCurrentStep(4)
      if (!isCompleted) {
        onComplete()
      }
    }
  }

  if (currentStep === 4) {
    return (
      <MissionSuccessScreen
        sectionTitle={title}
        chapterTitle={badge}
        challengesCount={3}
        xpEarned={xpReward}
        onContinueNext={() => {
          if (nextSectionIdx != null && onJumpToSection) {
            onJumpToSection(nextSectionIdx)
          }
        }}
        nextLabel="Continue to Next Section"
      />
    )
  }

  const currentGame = currentStep >= 1 && currentStep <= 3 ? games[currentStep - 1] : null

  // Page 1 = Learn (Step 0), Page 2 = Games (Steps 1, 2, 3)
  const isPage1 = currentStep === 0
  const isPage2 = currentStep >= 1 && currentStep <= 3

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-2 sm:px-4 py-1.5 sm:py-2.5 h-full max-h-full overflow-hidden select-none">
      {/* 1. TOP OF LESSON SCREEN: Clear Lucide Close Button + Stage Status */}
      <div className="w-full flex items-center justify-between pb-1 sm:pb-2 border-b border-slate-200 shrink-0">
        {handleClose ? (
          <button
            type="button"
            onClick={handleClose}
            className="p-1 sm:p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Return to Chapter Sections"
            aria-label="Close Lesson"
          >
            <X size={15} />
            <span>Close</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-1.5 shrink-0">
          {isPage2 && (
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              title="Review Lesson Notes (Page 1)"
              className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
            >
              Notes
            </button>
          )}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-black text-amber-800">
            <Zap size={10} className="text-amber-500 fill-amber-500" />
            <span>+{xpReward} XP</span>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
            {isPage1 ? 'Learn' : `Game ${currentStep}/3`}
          </div>
        </div>
      </div>

      {/* PAGE 1: LEARN CONCEPT */}
      {isPage1 && (
        <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden py-1 space-y-1 sm:space-y-1.5 animate-in fade-in">
          {/* 2. LESSON TITLE */}
          <div className="shrink-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                {badge}
              </span>
              {lessonSubtitle && (
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-500">
                  {lessonSubtitle}
                </span>
              )}
            </div>
            <h1 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight truncate">
              {title}
            </h1>
          </div>

          {/* 3. LARGE TOPIC-BASED SVG (Standalone visual, NOT inside a background box/card!) */}
          <div className="w-full flex justify-center shrink-0 py-0.5 sm:py-1 select-none">
            <TopicLessonIllustration
              topic={title}
              chapterTitle={badge}
              size={135}
              className="drop-shadow-md transition-transform hover:scale-102"
            />
          </div>

          {/* 4. CORE CONCEPT HEADER */}
          <div className="shrink-0 flex items-center justify-between">
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              <Sparkles size={11} className="text-indigo-600" />
              <span>Core Concept</span>
            </div>

            {htmlContent && (
              <button
                type="button"
                onClick={() => setShowFullArticle(true)}
                className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[9px] rounded-lg border border-slate-200 cursor-pointer"
              >
                Full Article
              </button>
            )}
          </div>

          {/* 5. DEFINITION */}
          <div className="w-full bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-2xs shrink-0">
            <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 leading-snug">
              {simpleDefinition}
            </p>
          </div>

          {/* 6. EXAMPLE */}
          {smallExample && (
            <div className="w-full text-[10px] sm:text-xs font-medium text-emerald-900 bg-emerald-50/90 p-1.5 sm:p-2 rounded-xl border border-emerald-200 shrink-0">
              <strong className="text-emerald-950 font-black">Daily Example:</strong> {smallExample}
            </div>
          )}

          {/* 7. KEY POINTS */}
          {keyPoints.length > 0 && (
            <div className="shrink-0 space-y-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {currentPoints.map((pt, idx) => {
                  const Icon = pt.icon || CheckCircle2
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-1.5 border border-slate-200 flex items-start gap-1.5 shadow-2xs"
                    >
                      <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                        <Icon size={10} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                          {pt.title}
                        </h4>
                        <p className="text-[8px] sm:text-[9px] text-slate-600 mt-0.5 leading-tight line-clamp-1">
                          {pt.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Stepper if more points exist */}
              {totalPointScenes > 1 && (
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    disabled={cardScene === 0}
                    onClick={() => {
                      gameAudio.playTap()
                      setCardScene(prev => Math.max(0, prev - 1))
                    }}
                    className="text-[8px] font-bold text-indigo-600 disabled:opacity-20 cursor-pointer"
                  >
                    &larr; Prev Points
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPointScenes }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i === cardScene ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={cardScene >= totalPointScenes - 1}
                    onClick={() => {
                      gameAudio.playTap()
                      setCardScene(prev => Math.min(totalPointScenes - 1, prev + 1))
                    }}
                    className="text-[8px] font-bold text-indigo-600 disabled:opacity-20 cursor-pointer"
                  >
                    More Points &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 8. NEXT / PLAY */}
          <div className="pt-1 shrink-0">
            <button
              type="button"
              onClick={handleStartGames}
              className="w-full py-2.5 sm:py-3 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Play size={13} className="fill-white" />
              <span>Next: Play 3 Lesson Games</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Full CMS Lesson Text Modal */}
          {showFullArticle && htmlContent && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-2xl p-4 max-w-lg w-full max-h-[85vh] flex flex-col justify-between shadow-2xl border border-slate-200 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                  <h3 className="text-sm font-black text-slate-900 truncate">{title}</h3>
                  <button
                    onClick={() => setShowFullArticle(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div
                  className="flex-1 overflow-y-auto py-3 text-xs text-slate-700 space-y-2 prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                <button
                  onClick={() => setShowFullArticle(false)}
                  className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm cursor-pointer mt-2"
                >
                  Return to Learning
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: 3 DISTINCT MINI-GAMES (Steps 1, 2, 3) */}
      {currentStep >= 1 && currentStep <= 3 && currentGame && (
        <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden animate-in fade-in py-1">
          {currentGame.render(() => handleGamePass(currentStep as 1 | 2 | 3))}
        </div>
      )}
    </div>
  )
}

