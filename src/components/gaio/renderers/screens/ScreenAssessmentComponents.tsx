// ─────────────────────────────────────────────────────────────────────────────
// SCREEN ASSESSMENT COMPONENTS — ZERO MCQS • ZERO TRUE/FALSE • 100% VISUAL GAMES
// All assessment screens replaced with permitted interactive visual game mechanics:
// - Quiz Part 1: Real Life Match / Match the Pairs
// - Quiz Part 2: Connect the Dots / Build the Sequence + My Stars Celebration
// - True or False: Teach the Machine / Sort the Cards
// - Unit Review Part 1: Spot the Anomaly / Outlier Detection
// - Unit Review Part 2: Feed the AI / Train the Model + Trophy Celebration
// - Home Connect & Word Search: Pure Visual & Conversational Activities
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioScreenItem } from '../../types'
import { Check, X, Star, Sparkles, Award, CheckCircle2, Home, Heart, Trophy, Bot, Volume2 } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'
import { showAuraToast } from '../../../../services/auraGuidanceToast'
import { VisualGameEngine, type VisualGameConfig } from '../../games/VisualGameEngine'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  onAddStars?: (count: number) => void
}

// 1. QUIZ TIME PART 1 — INTERACTIVE VISUAL GAME: MATCH THE PAIRS / REAL LIFE MATCH
export const ScreenQuizPart1: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawPairs = payload.matchingPairs || payload.pairs || [
    { id: 'qp1', left: 'Phone Face Unlock', right: 'Face Recognition AI', icon: '📱' },
    { id: 'qp2', left: 'Map Route Planner', right: 'Pathfinding Algorithm', icon: '🗺️' },
    { id: 'qp3', left: 'Voice Keyboard', right: 'Speech Recognition', icon: '🎙️' },
    { id: 'qp4', left: 'Spam Mail Blocker', right: 'Text Classification', icon: '📧' },
  ]

  const gameConfig: VisualGameConfig = {
    type: 'real_life_match',
    title: screen.title || 'Quiz Time: Real Life Match',
    instruction: 'Drag & match everyday life situations to the smart AI concepts behind them!',
    pairs: rawPairs.map((p: any, i: number) => ({
      id: p.id || `qp_${i}`,
      left: p.left || p.term || `Concept ${i + 1}`,
      right: p.right || p.definition || `Match ${i + 1}`,
      icon: p.icon || (i === 0 ? '📱' : i === 1 ? '🗺️' : i === 2 ? '🎙️' : '📧')
    }))
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-amber-100 tracking-wider">
            QUIZ TIME • INTERACTIVE CHALLENGE (PART 1 OF 2)
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            {screen.title}
          </h2>
        </div>
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
          <Star size={18} className="text-amber-200 fill-amber-200" />
        </div>
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-amber-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('great_job', 'Quiz Challenge Part 1 mastered! Ready for Part 2.', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Quiz Challenge Part 2 & Stars</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 2. QUIZ TIME PART 2 — INTERACTIVE VISUAL GAME: BUILD THE SEQUENCE + STARS CELEBRATION
export const ScreenQuizPart2: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer, onAddStars }) => {
  const payload = screen.payload || {}
  const rawSteps = payload.sequence || [
    { id: 'qs1', step: 1, text: 'Collect Data (Examples)', icon: '📦' },
    { id: 'qs2', step: 2, text: 'Train Model (Spot Patterns)', icon: '🧠' },
    { id: 'qs3', step: 3, text: 'Evaluate Accuracy (Test)', icon: '🎯' },
    { id: 'qs4', step: 4, text: 'Deploy Smart Application', icon: '🚀' },
  ]

  const [starsAwarded, setStarsAwarded] = useState(false)

  const gameConfig: VisualGameConfig = {
    type: 'build_sequence',
    title: screen.title || 'Quiz Time: Build the Sequence',
    instruction: 'Arrange the smart AI pipeline steps in their exact logical order!',
    sequence: rawSteps
  }

  const handleGameComplete = () => {
    if (!starsAwarded) {
      setStarsAwarded(true)
      if (onAddStars) onAddStars(5)
      gameAudio.playFanfare()
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } })
      showAuraToast('worksheet_complete', 'You earned 5 Gold Stars for perfect sequencing!', true)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-amber-100 tracking-wider">
            QUIZ TIME • PIPELINE SEQUENCING (PART 2 OF 2)
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            {screen.title}
          </h2>
        </div>
        <Sparkles size={18} className="text-amber-200" />
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-amber-200 p-2 shadow-xs flex flex-col justify-between">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={handleGameComplete}
          onNext={onNext}
        />
      </div>

      {/* MY STARS RATING CELEBRATION BOX */}
      <div className="shrink-0 p-2 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between shadow-xs mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
            MY STARS:
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className="text-amber-400 fill-amber-400 animate-bounce"
                style={{ animationDelay: `${s * 100}ms` }}
              />
            ))}
          </div>
        </div>
        <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
          +5 Gold Stars Earned!
        </span>
      </div>

      <div className="shrink-0 pt-0.5">
        <button
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Teach the Machine Classification</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 3. TEACH THE MACHINE / SORT THE CARDS (REPLACING TRUE OR FALSE)
export const ScreenTrueFalse: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawCards = payload.cards || [
    { id: 'tf1', text: 'Voice Assistant Understanding Accents', categoryId: 'cat_ai', icon: '🎙️' },
    { id: 'tf2', text: 'Mechanical Kitchen Whisk', categoryId: 'cat_manual', icon: '🥄' },
    { id: 'tf3', text: 'Autonomous Drone Obstacle Radar', categoryId: 'cat_ai', icon: '🚁' },
    { id: 'tf4', text: 'Traditional Wooden Door Lock', categoryId: 'cat_manual', icon: '🔑' },
    { id: 'tf5', text: 'Smart Camera Face Auto-Focus', categoryId: 'cat_ai', icon: '📷' },
    { id: 'tf6', text: 'Simple Metal Paperclip', categoryId: 'cat_manual', icon: '📎' },
  ]

  const gameConfig: VisualGameConfig = {
    type: 'teach_machine',
    title: 'Teach the Machine: AI vs Simple Tools',
    instruction: 'Sort each card into the right bucket to train the machine classifier!',
    categories: [
      { id: 'cat_ai', name: 'Learns with AI 🤖', icon: '⚡', color: 'border-sky-400 bg-sky-50' },
      { id: 'cat_manual', name: 'Simple Tool 🔧', icon: '🔩', color: 'border-amber-400 bg-amber-50' },
    ],
    cards: rawCards
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-sky-200 tracking-wider">
            TEACH THE MACHINE • VISUAL CLASSIFIER LAB
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            {screen.title || 'Machine Teaching Challenge'}
          </h2>
        </div>
        <Bot size={18} className="text-sky-200" />
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-sky-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('great_job', 'All cards classified into machine buckets!', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Home Connect Activity</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 4. HOME CONNECT & REAL-LIFE SHARING
export const ScreenHomeConnect: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const task = payload.task || 'Look around your home or school today. Find 2 gadgets that use smart AI and 2 that do not. Tell someone in your family!'
  const prompt = payload.prompt || 'Who did you talk to?'
  const options = ['Mom / Dad 👨‍👩‍👧', 'Grandparents 👵', 'Brother / Sister 👦', 'Teacher / Friend 🏫']

  const [selectedPerson, setSelectedPerson] = useState<string | null>(savedAnswer?.person || null)
  const [completed, setCompleted] = useState<boolean>(Boolean(savedAnswer?.person))

  const handleSelectPerson = (p: string) => {
    gameAudio.playSuccess()
    setSelectedPerson(p)
    setCompleted(true)
    if (onSaveAnswer) onSaveAnswer({ person: p })
    confetti({ particleCount: 40, spread: 60 })
    showAuraToast('great_job', `Connected with ${p}! Spreading AI knowledge makes you a true leader.`, true)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-emerald-200 tracking-wider">
            HOME CONNECT • REAL-LIFE SHARING
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            Share What You Learned at Home
          </h2>
        </div>
        <Home size={18} className="text-emerald-200" />
      </div>

      <div className="my-auto space-y-3 max-w-sm mx-auto w-full py-2">
        <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-xs text-center space-y-2">
          <span className="text-3xl block">🏠</span>
          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            {task}
          </p>
          <button
            onClick={() => auraSpeechService.speak(task)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold hover:bg-emerald-200 transition-colors"
          >
            <Volume2 size={12} />
            <span>Listen to Mission</span>
          </button>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase text-slate-500 block text-center mb-1.5">
            {prompt}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt) => {
              const isSelected = selectedPerson === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectPerson(opt)}
                  className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-[1.02]'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-800'
                  }`}
                >
                  {isSelected && <Check size={14} className="text-white shrink-0" />}
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Complete Home Connect & Continue</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 5. UNIT REVIEW PART 1 — SPOT THE ANOMALY (ANOMALY DETECTION GAME)
export const ScreenUnitReviewPart1: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawItems = payload.anomalyItems || [
    { id: 'an1', name: 'Regular Traffic 40 km/h', icon: '🚗', isOutlier: false },
    { id: 'an2', name: 'Regular Traffic 45 km/h', icon: '🚗', isOutlier: false },
    { id: 'an3', name: 'SUDDEN COLLISION 0 km/h', icon: '💥', isOutlier: true },
    { id: 'an4', name: 'Regular Traffic 50 km/h', icon: '🚗', isOutlier: false },
  ]

  const gameConfig: VisualGameConfig = {
    type: 'spot_difference',
    title: screen.title || 'Unit Review: Spot the Anomaly',
    instruction: 'Find the unusual outlier pattern that triggers an automated AI alert!',
    differenceItems: rawItems
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-blue-200 tracking-wider">
            UNIT REVIEW • ANOMALY DETECTION LAB (PART 1 OF 2)
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            {screen.title || 'Review Challenge'}
          </h2>
        </div>
        <Award size={18} className="text-blue-200" />
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-blue-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('great_job', 'Anomaly spotted! Model flagged outlier instantly.', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Feed the AI Training Model</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 6. UNIT REVIEW PART 2 — FEED THE AI MODEL + TROPHY CELEBRATION
export const ScreenUnitReviewPart2: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer, onAddStars }) => {
  const payload = screen.payload || {}
  const rawFeed = payload.feedItems || [
    { id: 'fd1', name: '1,000 High-Res Medical Scans', icon: '🩻', isGoodData: true },
    { id: 'fd2', name: 'Corrupted Incomplete Pixels', icon: '🌫️', isGoodData: false },
    { id: 'fd3', name: 'Labeled Doctor Annotations', icon: '🩺', isGoodData: true },
    { id: 'fd4', name: 'Random Background Static', icon: '⚡', isGoodData: false },
  ]

  const [trophyAwarded, setTrophyAwarded] = useState(false)

  const gameConfig: VisualGameConfig = {
    type: 'feed_ai',
    title: screen.title || 'Unit Review: Feed the AI Model',
    instruction: 'Feed high-quality training examples into the machine to achieve 100% accuracy!',
    feedItems: rawFeed
  }

  const handleFeedComplete = () => {
    if (!trophyAwarded) {
      setTrophyAwarded(true)
      if (onAddStars) onAddStars(10)
      gameAudio.playFanfare()
      confetti({ particleCount: 70, spread: 90, origin: { y: 0.55 } })
      showAuraToast('lesson_complete', 'Month Unit Completed! You unlocked the Unit Trophy 🏆', true)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-purple-200 tracking-wider">
            UNIT REVIEW • MODEL TRAINING & TROPHY (PART 2 OF 2)
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            {screen.title || 'Model Training Mastery'}
          </h2>
        </div>
        <Trophy size={18} className="text-amber-300" />
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-purple-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={handleFeedComplete}
          onNext={onNext}
        />
      </div>

      {/* UNIT TROPHY BADGE CELEBRATION */}
      <div className="shrink-0 p-2 rounded-2xl bg-gradient-to-r from-amber-50 to-purple-50 border-2 border-amber-300 flex items-center justify-between shadow-xs mb-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-white flex items-center justify-center font-black text-sm shadow-sm">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-900 block">
              MONTH {screen.monthNumber} MASTER TROPHY UNLOCKED
            </span>
            <span className="text-[9px] font-bold text-slate-600">
              +10 Olympiad Stars Credited to Your Profile
            </span>
          </div>
        </div>
        <span className="text-xs font-black text-amber-700 bg-amber-200/80 px-2.5 py-1 rounded-full">
          Level Master
        </span>
      </div>

      <div className="shrink-0 pt-0.5">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Visual AI Word Finder</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 7. VISUAL WORD SEARCH PUZZLE
export const ScreenWordSearch: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const targetWords: string[] = payload.words || ['ROBOT', 'SMART', 'BRAIN', 'DATA', 'LEARN']
  const [foundWords, setFoundWords] = useState<string[]>(savedAnswer?.foundWords || [])

  const handleTapWord = (w: string) => {
    if (foundWords.includes(w)) return
    gameAudio.playSuccess()
    const updated = [...foundWords, w]
    setFoundWords(updated)
    if (onSaveAnswer) onSaveAnswer({ foundWords: updated })
    showAuraToast('great_job', `Found ${w}!`, false)
    if (updated.length >= targetWords.length) {
      gameAudio.playFanfare()
      confetti({ particleCount: 50, spread: 70 })
      showAuraToast('activity_complete', 'All key AI vocabulary terms discovered!', true)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-2xl p-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div>
          <span className="text-[9px] font-black uppercase text-sky-200 tracking-wider">
            VISUAL VOCABULARY FINDER
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[260px]">
            Tap Each AI Word to Collect It
          </h2>
        </div>
        <Sparkles size={18} className="text-amber-300" />
      </div>

      <div className="my-auto space-y-3 max-w-sm mx-auto w-full py-2">
        <p className="text-xs font-bold text-center text-slate-600">
          Find and tap the {targetWords.length} important concepts you explored this month:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {targetWords.map((word) => {
            const isFound = foundWords.includes(word)
            return (
              <button
                key={word}
                type="button"
                onClick={() => handleTapWord(word)}
                className={`p-3 rounded-xl border-2 text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                  isFound
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-800 shadow-xs'
                }`}
              >
                <span>{word}</span>
                {isFound && <Check size={14} className="text-white shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="shrink-0 pt-1 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span>{foundWords.length} of {targetWords.length} Words Found</span>
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="py-2 px-4 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center gap-1"
        >
          <span>Complete Month & Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
