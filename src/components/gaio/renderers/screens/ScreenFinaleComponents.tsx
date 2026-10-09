// ─────────────────────────────────────────────────────────────────────────────
// SCREEN FINALE COMPONENTS (Pages 143 to 153)
// Picture Dictionary • Olympiad Practice Test • Certificate • Answer Keys
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioScreenItem } from '../../types'
import { Award, Volume2, CheckCircle2, Star, Sparkles, Printer, Share2, BookOpen } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  studentName?: string
}

// 1. PICTURE DICTIONARY
export const ScreenPictureDictionary: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const isPart1 = screen.payload?.dictionaryRange === 'A to K'

  const termsPart1 = [
    { word: 'AI', def: 'A smart helper' },
    { word: 'Algorithm', def: 'Steps in order' },
    { word: 'Art', def: 'What we create' },
    { word: 'Ask', def: 'Get help with questions' },
    { word: 'Check', def: 'Make sure it is right' },
    { word: 'Clear', def: 'Easy to understand' },
    { word: 'Coder', def: 'Writes computer code' },
    { word: 'Command', def: 'An order or instruction' },
    { word: 'Dream', def: 'What I wish to be' },
    { word: 'Engineer', def: 'Builds machines' },
    { word: 'Explore', def: 'Find out new things' },
    { word: 'Future', def: 'Days yet to come' },
  ]

  const termsPart2 = [
    { word: 'Listen', def: 'Hear carefully' },
    { word: 'Machine', def: 'A thing that does work' },
    { word: 'Order', def: 'First, next, last' },
    { word: 'Picture', def: 'Something we see' },
    { word: 'Private', def: 'Just for me, not shared' },
    { word: 'Question', def: 'Something we ask to learn' },
    { word: 'Reminder', def: 'Helps us remember' },
    { word: 'Robot cleaner', def: 'Cleans the floor' },
    { word: 'Safe', def: 'Free from harm' },
    { word: 'School', def: 'Place to learn' },
    { word: 'Scientist', def: 'Does experiments' },
    { word: 'Smart', def: 'Can learn and assist' },
  ]

  const terms = isPart1 ? termsPart1 : termsPart2
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  const handlePronounce = (term: any) => {
    gameAudio.playTap()
    setSelectedWord(term.word)
    auraSpeechService.speak(`${term.word}. ${term.def}`)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          {isPart1 ? 'MY PICTURE DICTIONARY • PART 1 (A TO K)' : 'MY PICTURE DICTIONARY • PART 2 (L TO S)'}
        </span>
        <h2 className="text-sm font-black text-slate-900">
          Visual AI Dictionary
        </h2>
        <p className="text-[10px] text-slate-500">
          Tap any word to hear pronunciation and meaning!
        </p>
      </div>

      {/* Grid of Dictionary Cards */}
      <div className="flex-1 grid grid-cols-2 gap-1.5 py-1 overflow-hidden">
        {terms.map((t) => {
          const isSelected = selectedWord === t.word

          return (
            <button
              key={t.word}
              onClick={() => handlePronounce(t)}
              className={`p-1.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-sky-100 border-[#0288D1] shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#0288D1]">{t.word}</span>
                <Volume2 size={11} className="text-slate-400" />
              </div>
              <span className="text-[9px] font-medium text-slate-600 line-clamp-1">
                {t.def}
              </span>
            </button>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          {isPart1 ? 'Next: Dictionary Part 2 →' : 'Next: Olympiad Practice Test →'}
        </button>
      </div>
    </div>
  )
}

// 2. OLYMPIAD PRACTICE TEST
export const ScreenOlympiadQuiz: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const qRange = screen.payload?.questionsRange || [1, 2, 3]
  const correctAnswers = screen.payload?.correctAnswers || [0, 1, 2]

  // Questions generator based on range
  const questions = [
    { id: 1, q: 'Q1. Which helper tells the weather?', options: ['Weather app', 'Sock', 'Spoon'], correct: 0 },
    { id: 2, q: 'Q2. Which one is NOT a machine?', options: ['Fan', 'Cow', 'Bus'], correct: 1 },
    { id: 3, q: 'Q3. Which word means "can learn"?', options: ['Simple', 'Sleepy', 'Smart'], correct: 2 },
    { id: 4, q: 'Q4. Bolt is good at learning from...', options: ['Examples', 'Sweets', 'Rain'], correct: 0 },
    { id: 5, q: 'Q5. A clear command is...', options: ['Do stuff', 'Close the door', 'Hmm'], correct: 1 },
    { id: 6, q: 'Q6. After the egg comes the...', options: ['Butterfly', 'Cocoon', 'Caterpillar'], correct: 2 },
    { id: 7, q: 'Q7. To reach the star, Bolt follows...', options: ['Arrows', 'Songs', 'Pizza'], correct: 0 },
    { id: 8, q: 'Q8. Which helper reads stories aloud?', options: ['Hammer', 'Reading app', 'Chair'], correct: 1 },
    { id: 9, q: 'Q9. Which smart helper is at the door?', options: ['Fridge', 'Fan', 'Smart doorbell'], correct: 2 },
    { id: 10, q: 'Q10. Which is a smart home helper?', options: ['Smart light', 'Bucket', 'Broom stick'], correct: 0 },
    { id: 11, q: 'Q11. Who checks X-rays with AI?', options: ['Chef', 'Doctor', 'Farmer'], correct: 1 },
    { id: 12, q: 'Q12. Who builds robots?', options: ['Monkey', 'Teddy', 'Engineer'], correct: 2 },
    { id: 13, q: 'Q13. India landed on the Moon with...', options: ['Chandrayaan-3', 'A cycle', 'A balloon'], correct: 0 },
    { id: 14, q: 'Q14. "When" asks about...', options: ['Place', 'Time', 'Person'], correct: 1 },
    { id: 15, q: 'Q15. AI drawings start with my...', options: ['Shoes', 'Lunch', 'Ideas'], correct: 2 },
    { id: 16, q: 'Q16. To check an AI answer, ask...', options: ['My teacher', 'A fish', 'A rock'], correct: 0 },
    { id: 17, q: 'Q17. A scary message pops up. First I...', options: ['Click', 'Stop', 'Share'], correct: 1 },
    { id: 18, q: 'Q18. Which should I keep private?', options: ['Fav colour', 'A smile', 'Phone number'], correct: 2 },
    { id: 19, q: 'Q19. Screen time should be...', options: ['Short, with breaks', 'All night', 'Forever'], correct: 0 },
    { id: 20, q: 'Q20. Good AI users are...', options: ['Rude', 'Safe & kind', 'Careless'], correct: 1 },
  ].filter((q) => q.id >= qRange[0] && q.id <= qRange[qRange.length - 1])

  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswer || {})

  const handleSelect = (qId: number, idx: number, correct: number) => {
    if (idx === correct) gameAudio.playSuccess()
    else gameAudio.playTap()
    const updated = { ...answers, [qId]: idx }
    setAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-[#0288D1] text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-sky-200">
            OLYMPIAD PRACTICE TEST • 20 QUESTIONS
          </span>
          <h2 className="text-xs sm:text-sm font-black">
            Questions Q{qRange[0]} to Q{qRange[qRange.length - 1]}
          </h2>
        </div>
        <Award size={16} />
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {questions.map((q) => {
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
          {screen.payload?.isFinalScreen ? 'Complete Test & View Certificate →' : 'Next Practice Questions →'}
        </button>
      </div>
    </div>
  )
}

// 3. CERTIFICATE OF AI EXPLORER
export const ScreenCertificate: React.FC<ScreenProps> = ({ screen, studentName = 'Super Student' }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    gameAudio.playSuccess()
    confetti({ particleCount: 70, spread: 80 })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none text-slate-800 bg-gradient-to-b from-amber-50/50 via-white to-sky-50 rounded-2xl animate-in fade-in duration-300">
      <div className="text-center pt-1">
        <span className="text-[9px] font-black uppercase text-amber-700 tracking-widest">
          OFFICIAL COMPLETION DIPLOMA
        </span>
      </div>

      {/* Certificate Frame */}
      <div className="my-auto p-4 rounded-2xl border-4 border-amber-400 bg-white shadow-xl text-center space-y-2 relative">
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-sm shadow-md">
          🏆
        </div>

        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          CERTIFICATE OF AI EXPLORER
        </h1>
        <p className="text-[10px] text-slate-500 font-semibold">
          This is to say that
        </p>

        {/* Student Name */}
        <div className="py-1 border-b-2 border-slate-900 mx-auto max-w-xs">
          <span className="text-base sm:text-lg font-black text-[#0288D1]">
            {studentName}
          </span>
        </div>

        <p className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-relaxed">
          of Class 3 has successfully finished the 6-Month Global AI Olympiad Journey:
        </p>

        {/* 6 Pillars */}
        <div className="flex flex-wrap justify-center gap-1 text-[8px] font-black text-white">
          <span className="px-1.5 py-0.5 rounded-md bg-sky-500">DISCOVER</span>
          <span className="px-1.5 py-0.5 rounded-md bg-teal-500">CONNECT</span>
          <span className="px-1.5 py-0.5 rounded-md bg-indigo-500">SOLVE</span>
          <span className="px-1.5 py-0.5 rounded-md bg-amber-500">RISE</span>
          <span className="px-1.5 py-0.5 rounded-md bg-purple-500">CREATE</span>
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500">CARE</span>
        </div>

        <div className="pt-2 flex items-center justify-between text-[9px] text-slate-500 font-bold border-t border-slate-100">
          <span>Date: {currentDate}</span>
          <span>Teacher: Certified Lead</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={handleShare}
          className="py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles size={14} /> Celebrate!
        </button>
        <button
          onClick={handlePrint}
          className="py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Printer size={14} /> Print Certificate
        </button>
      </div>
    </div>
  )
}

// 4. ANSWER KEY
export const ScreenAnswerKey: React.FC<ScreenProps> = ({ screen, onNext }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-slate-800 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-slate-300">
            TEACHER & PARENT REFERENCE
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">
            {screen.title}
          </h2>
        </div>
        <BookOpen size={16} />
      </div>

      {/* Answer Key Content Box */}
      <div className="flex-1 my-1 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 overflow-y-auto space-y-2 text-xs">
        <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px] whitespace-pre-wrap">
          {screen.payload?.fullText?.trim() || 'Verified answer key details available in official teacher handbook.'}
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
