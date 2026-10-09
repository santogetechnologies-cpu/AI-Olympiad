// ─────────────────────────────────────────────────────────────────────────────
// SCREEN ASSESSMENT COMPONENTS
// Quiz Time (Parts 1 & 2) • True or False • Home Connect •
// Unit Review (Parts 1 & 2) • Interactive Word Search
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioScreenItem } from '../../types'
import { Check, X, Star, Sparkles, Award, CheckCircle2, Home, Heart } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  onAddStars?: (count: number) => void
}

// 1. QUIZ TIME PART 1 (Questions 1 to 3) — payload-driven
export const ScreenQuizPart1: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  // Load questions from payload — topic-specific!
  const rawQuestions: any[] = screen.payload?.questions || []
  const questions = rawQuestions.length > 0 ? rawQuestions : [
    { id: 1, q: 'Q1. AI stands for Artificial...', options: ['Intelligence', 'Ice-cream', 'Interest'], correct: 0 },
    { id: 2, q: 'Q2. Bolt is a friendly AI...', options: ['Dog', 'Robot', 'Fish'], correct: 1 },
    { id: 3, q: 'Q3. A machine can...', options: ['Feel sad', 'Do work', 'Dream'], correct: 1 },
  ]

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(savedAnswer || {})

  const handleSelect = (qId: number, optIdx: number, correctIdx: number) => {
    if (optIdx === correctIdx) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playTap()
    }
    const updated = { ...selectedAnswers, [qId]: optIdx }
    setSelectedAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-amber-500 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-amber-100">
            QUIZ TIME • PART 1 OF 2
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">
            {screen.title}
          </h2>
        </div>
        <Star size={16} className="text-amber-200 fill-amber-200" />
      </div>

      {/* 3 Questions */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {questions.map((q) => {
          const userChoice = selectedAnswers[q.id]

          return (
            <div key={q.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-black text-slate-900 block leading-tight">
                {q.q}
              </span>
              <div className="grid grid-cols-3 gap-1">
                {q.options.map((opt: string, optIdx: number) => {
                  const isSelected = userChoice === optIdx
                  const isCorrect = isSelected && optIdx === q.correct

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx, q.correct)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center leading-tight cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-rose-500 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Questions 4 & 5 + Stars →
        </button>
      </div>
    </div>
  )
}

// 2. QUIZ TIME PART 2 (Questions 4, 5 & My Stars Celebration) — payload-driven
export const ScreenQuizPart2: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer, onAddStars }) => {
  const rawQuestions: any[] = screen.payload?.questions || []
  const questions = rawQuestions.length > 0 ? rawQuestions : [
    { id: 4, q: 'Q4. AI learns from...', options: ['Examples', 'Pizza', 'Sleeping'], correct: 0 },
    { id: 5, q: 'Q5. Bolt is a...', options: ['Dog', 'Tree', 'Robot'], correct: 2 },
  ]

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(savedAnswer || {})
  const [starsAwarded, setStarsAwarded] = useState(false)

  const handleSelect = (qId: number, optIdx: number, correctIdx: number) => {
    if (optIdx === correctIdx) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playTap()
    }
    const updated = { ...selectedAnswers, [qId]: optIdx }
    setSelectedAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)

    if (Object.keys(updated).length >= questions.length && !starsAwarded) {
      setStarsAwarded(true)
      if (onAddStars) onAddStars(5)
      confetti({ particleCount: 50, spread: 70 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-amber-500 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-amber-100">
            QUIZ TIME • PART 2 OF 2
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">
            {screen.title}
          </h2>
        </div>
        <Sparkles size={16} />
      </div>

      {/* 2 Questions */}
      <div className="space-y-1.5 my-1">
        {questions.map((q) => {
          const userChoice = selectedAnswers[q.id]

          return (
            <div key={q.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-black text-slate-900 block leading-tight">
                {q.q}
              </span>
              <div className="grid grid-cols-3 gap-1">
                {q.options.map((opt: string, optIdx: number) => {
                  const isSelected = userChoice === optIdx
                  const isCorrect = isSelected && optIdx === q.correct

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx, q.correct)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center leading-tight cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-rose-500 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* MY STARS Celebration Box */}
      <div className="flex-1 my-1 p-2.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col items-center justify-center space-y-1 shadow-xs">
        <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
          MY STARS RATING
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={22}
              className="text-amber-400 fill-amber-400 animate-pulse"
              style={{ animationDelay: `${s * 150}ms` }}
            />
          ))}
        </div>
        <p className="text-[11px] font-bold text-amber-900 pt-0.5">
          Great job! You answered all 5 quiz questions!
        </p>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: True or False →
        </button>
      </div>
    </div>
  )
}

// 3. TRUE OR FALSE — payload-driven
export const ScreenTrueFalse: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  // Load statements from payload — topic-specific!
  const rawStatements: any[] = screen.payload?.statements || []
  const statements = rawStatements.length > 0
    ? rawStatements.map((s: any, i: number) => ({ id: i + 1, text: s.statement || s.text || s, isTrue: s.answer !== undefined ? s.answer : true }))
    : [
        { id: 1, text: 'Bolt is a robot.', isTrue: true },
        { id: 2, text: 'AI can feel sad like me.', isTrue: false },
        { id: 3, text: 'AI learns from examples.', isTrue: true },
        { id: 4, text: 'A stone has AI.', isTrue: false },
        { id: 5, text: 'A map app can use AI.', isTrue: true },
        { id: 6, text: 'Some AI understands many languages.', isTrue: true },
      ]

  const [answers, setAnswers] = useState<Record<number, boolean>>(savedAnswer || {})

  const handleChoose = (id: number, choice: boolean) => {
    gameAudio.playTap()
    const updated = { ...answers, [id]: choice }
    setAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          TRUE OR FALSE CHALLENGE
        </span>
        <h2 className="text-sm font-black text-slate-900">
          Tick TRUE or FALSE for each fact!
        </h2>
      </div>

      {/* 6 Statements */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1">
        {statements.map((st) => {
          const userChoice = answers[st.id]
          const isSelectedTrue = userChoice === true
          const isSelectedFalse = userChoice === false

          return (
            <div
              key={st.id}
              className="p-1.5 px-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
            >
              <span className="text-[11px] font-bold text-slate-800 leading-tight pr-2">
                {st.id}. {st.text}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleChoose(st.id, true)}
                  className={`py-0.5 px-2 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                    isSelectedTrue
                      ? 'bg-emerald-500 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  TRUE
                </button>
                <button
                  onClick={() => handleChoose(st.id, false)}
                  className={`py-0.5 px-2 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                    isSelectedFalse
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  FALSE
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Home Connect & Rating →
        </button>
      </div>
    </div>
  )
}

// 4. HOME CONNECT & SELF RATING — payload-driven
export const ScreenHomeConnect: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const homePrompt = payload.prompt || `Find one AI helper at home with your family. Tell them what it does!`
  const talkPrompt = payload.talkPrompt || 'Tell your family: What did you learn about AI today?'
  const [rating, setRating] = useState<string | null>(savedAnswer?.rating || null)
  const [notes, setNotes] = useState(savedAnswer?.notes || '')

  const handleRate = (r: string) => {
    gameAudio.playSuccess()
    setRating(r)
    if (onSaveAnswer) onSaveAnswer({ rating: r, notes })
  }

  const ratings = [
    { id: 'well', emoji: '😃', text: 'I know it well!' },
    { id: 'some', emoji: '🙂', text: 'I know some.' },
    { id: 'practice', emoji: '🤔', text: 'I need practice.' }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <h2 className="text-sm font-black text-slate-900">
          Home Connect & Self Reflection
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {/* Home Connect Prompt */}
        <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Home size={20} />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase text-emerald-800 tracking-wider block">
              HOME CONNECT
            </span>
            <p className="text-xs font-bold text-slate-800 leading-snug">
              "{homePrompt}"
            </p>
          </div>
        </div>

        {/* Talk Prompt */}
        <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2">
          <span className="text-lg shrink-0">💬</span>
          <p className="text-[11px] font-bold text-slate-700 leading-snug">{talkPrompt}</p>
        </div>

        {/* Self Reflection 3 Smiles */}
        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1.5">
          <span className="text-[10px] font-black uppercase text-amber-900 block">
            HOW DID I DO? COLOUR A FACE:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {ratings.map((rt) => (
              <button
                key={rt.id}
                onClick={() => handleRate(rt.id)}
                className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                  rating === rt.id
                    ? 'bg-amber-200 border-amber-500 scale-105 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">{rt.emoji}</span>
                <span className="text-[9px] font-bold text-slate-700 mt-0.5 leading-tight">
                  {rt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
        >
          Complete Topic & Continue →
        </button>
      </div>
    </div>
  )
}

// 5. UNIT REVIEW PART 1 — payload-driven
export const ScreenUnitReviewPart1: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const rawQs: string[] = screen.payload?.questions || []
  // Convert string questions to MCQ format with generic options
  const questions = rawQs.slice(0, 3).map((q: string, i: number) => ({
    id: i + 1,
    q: `Q${i+1}. ${q}`,
    options: ['True', 'I know this!', 'I need to review'],
    correct: 1
  }))
  const fallbackQuestions = [
    { id: 1, q: 'Q1. What did you learn this month?', options: ['AI basics', 'Pizza recipes', 'Dance moves'], correct: 0 },
    { id: 2, q: 'Q2. Bolt is a friendly AI...', options: ['Robot', 'Dinosaur', 'Flower'], correct: 0 },
    { id: 3, q: 'Q3. AI helps machines to...', options: ['Sleep', 'Think and learn', 'Cook food'], correct: 1 },
  ]
  const displayQuestions = questions.length > 0 ? questions : fallbackQuestions

  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswer || {})

  const handleSelect = (qId: number, optIdx: number, correctIdx: number) => {
    if (optIdx === correctIdx) gameAudio.playSuccess()
    else gameAudio.playTap()
    const updated = { ...answers, [qId]: optIdx }
    setAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-[#0288D1] text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-sky-200">
            UNIT REVIEW • PART 1 OF 2
          </span>
          <h2 className="text-xs sm:text-sm font-black">
            Unit Review: {screen.monthTitle}
          </h2>
        </div>
        <Award size={16} />
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {displayQuestions.map((q) => {
          const userChoice = answers[q.id]

          return (
            <div key={q.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-black text-slate-900 block leading-tight">
                {q.q}
              </span>
              <div className="grid grid-cols-3 gap-1">
                {q.options.map((opt, idx) => {
                  const isSelected = userChoice === idx
                  const isCorrect = isSelected && idx === q.correct

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx, q.correct)}
                      className={`p-1 rounded-lg text-[9px] font-bold transition-all text-center leading-tight cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-rose-500 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Review Questions 4 to 6 & Trophy →
        </button>
      </div>
    </div>
  )
}

// 6. UNIT REVIEW PART 2 & TROPHY — payload-driven
export const ScreenUnitReviewPart2: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer, onAddStars }) => {
  const rawQs: string[] = screen.payload?.questions || []
  const baseId = 4
  const questions = rawQs.slice(0, 3).map((q: string, i: number) => ({
    id: baseId + i,
    q: `Q${baseId + i}. ${q}`,
    options: ['Yes, I know!', 'I learned this!', 'I need practice.'],
    correct: 1
  }))
  const fallbackQuestions = [
    { id: 4, q: 'Q4. Can a smart machine feel happy or sad like a human?', options: ['No, it has no feelings', 'Yes, it cries', 'Maybe sometimes'], correct: 0 },
    { id: 5, q: 'Q5. Why do we give clear commands to robots?', options: ['To confuse them', 'So they know what to do', 'To make them sleep'], correct: 1 },
    { id: 6, q: 'Q6. Good AI users are always...', options: ['Careless', 'Angry', 'Safe & respectful'], correct: 2 },
  ]
  const displayQuestions = questions.length > 0 ? questions : fallbackQuestions
  const badgeLabel = screen.payload?.badgeLabel || `Month ${screen.monthNumber} Complete!`

  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswer || {})
  const [trophyAwarded, setTrophyAwarded] = useState(false)

  const handleSelect = (qId: number, optIdx: number, correctIdx: number) => {
    if (optIdx === correctIdx) gameAudio.playSuccess()
    else gameAudio.playTap()
    const updated = { ...answers, [qId]: optIdx }
    setAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)

    if (Object.keys(updated).length >= questions.length && !trophyAwarded) {
      setTrophyAwarded(true)
      if (onAddStars) onAddStars(10)
      confetti({ particleCount: 60, spread: 80 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-[#0288D1] text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-sky-200">
            UNIT REVIEW • PART 2 OF 2
          </span>
          <h2 className="text-xs sm:text-sm font-black">
            Unit Review: {screen.monthTitle}
          </h2>
        </div>
        <Award size={16} />
      </div>

      <div className="space-y-1 my-1">
        {displayQuestions.map((q) => {
          const userChoice = answers[q.id]

          return (
            <div key={q.id} className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-black text-slate-900 block leading-tight">
                {q.q}
              </span>
              <div className="grid grid-cols-3 gap-1">
                {q.options.map((opt, idx) => {
                  const isSelected = userChoice === idx
                  const isCorrect = isSelected && idx === q.correct

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx, q.correct)}
                      className={`p-1 rounded-lg text-[9px] font-bold transition-all text-center leading-tight cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-rose-500 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Month Trophy Box */}
      <div className="flex-1 my-1 p-2 rounded-2xl bg-gradient-to-r from-amber-50 to-sky-50 border-2 border-amber-300 flex items-center justify-center gap-3">
        <span className="text-3xl animate-bounce">🏆</span>
        <div>
          <span className="text-[9px] font-black text-amber-800 uppercase tracking-wider block">
            MONTH MASTERY TROPHY
          </span>
          <p className="text-xs font-black text-slate-800">
            {badgeLabel}
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Word Search Puzzle →
        </button>
      </div>
    </div>
  )
}

// 7. INTERACTIVE WORD SEARCH — payload-driven
export const ScreenWordSearch: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  // Use hiddenWords from payload (set by regeneration script), fallback gracefully
  const wordsToFind: string[] = screen.payload?.hiddenWords || screen.payload?.wordsToFind || screen.payload?.words || ['ROBOT', 'SMART', 'HELPER', 'AI', 'MACHINE', 'BOLT']

  const grid = [
    ['R', 'O', 'B', 'O', 'T', 'X'],
    ['H', 'E', 'L', 'P', 'E', 'R'],
    ['S', 'M', 'A', 'R', 'T', 'A'],
    ['T', 'H', 'I', 'N', 'K', 'I'],
    ['D', 'R', 'O', 'N', 'E', 'Z'],
    ['A', 'I', 'S', 'O', 'L', 'V']
  ]

  const [foundWords, setFoundWords] = useState<string[]>(savedAnswer || [])
  const [selectedCells, setSelectedCells] = useState<string[]>([])

  const toggleCell = (r: number, c: number) => {
    gameAudio.playTap()
    const cellKey = `${r}-${c}`
    const updated = selectedCells.includes(cellKey)
      ? selectedCells.filter((k) => k !== cellKey)
      : [...selectedCells, cellKey]
    setSelectedCells(updated)
  }

  const markFound = (word: string) => {
    gameAudio.playSuccess()
    const updated = foundWords.includes(word)
      ? foundWords
      : [...foundWords, word]
    setFoundWords(updated)
    if (onSaveAnswer) onSaveAnswer(updated)

    if (updated.length === wordsToFind.length) {
      confetti({ particleCount: 60, spread: 80 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          WORD SEARCH PUZZLE
        </span>
        <h2 className="text-sm font-black text-slate-900">
          Find these words: They go across → or down ↓
        </h2>
      </div>

      {/* Word Bank */}
      <div className="flex flex-wrap justify-center gap-1.5 my-1 shrink-0">
        {wordsToFind.map((w: string) => {
          const isFound = foundWords.includes(w)

          return (
            <button
              key={w}
              onClick={() => markFound(w)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all cursor-pointer border ${
                isFound
                  ? 'bg-emerald-500 text-white border-emerald-600 line-through'
                  : 'bg-sky-50 text-[#0288D1] border-sky-200 hover:bg-sky-100'
              }`}
            >
              {w}
            </button>
          )
        })}
      </div>

      {/* 6x6 Letter Grid */}
      <div className="flex-1 my-auto max-w-[240px] mx-auto w-full aspect-square grid grid-cols-6 gap-1 p-2 bg-sky-50 rounded-2xl border-2 border-sky-200 shadow-xs">
        {grid.map((row, rIdx) =>
          row.map((letter, cIdx) => {
            const isSelected = selectedCells.includes(`${rIdx}-${cIdx}`)

            return (
              <button
                key={`${rIdx}-${cIdx}`}
                onClick={() => toggleCell(rIdx, cIdx)}
                className={`w-full h-full rounded-lg font-mono font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 shadow-xs scale-105 ring-2 ring-amber-500'
                    : 'bg-white text-slate-800 hover:bg-sky-100 shadow-2xs'
                }`}
              >
                {letter}
              </button>
            )
          })
        )}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
