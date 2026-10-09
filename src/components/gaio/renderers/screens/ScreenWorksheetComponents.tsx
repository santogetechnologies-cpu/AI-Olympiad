// ─────────────────────────────────────────────────────────────────────────────
// SCREEN WORKSHEET COMPONENTS (Worksheet Part A & Part B)
// Task 1: Choice/Classification • Task 2: Drawing Canvas •
// Task 1: Matching Pairs • Task 2: Word Box Blanks
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react'
import type { GaioScreenItem } from '../../types'
import { Check, X, CheckCircle2, RotateCcw, Volume2, Sparkles } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
}

// 1. WORKSHEET PART A • TASK 1: CHOICE / CLASSIFICATION
export const ScreenWorksheetChoice: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawItems: any[] = payload.items && payload.items.length > 0 ? payload.items : [
    'Smart speaker', 'Spoon', 'Map app', 'Chair', 'Smart phone'
  ]
  const instruction = payload.instruction || screen.subtitle || 'Does it use AI? Tick the right box!'
  const taskTitle = payload.taskTitle || 'WORKSHEET PART A • TASK 1'
  const itemImages = payload.itemImages || []
  const iconList = ['🔊', '🥄', '🗺️', '🪑', '📱', '🤖', '💡', '🚗', '✂️', '🚲', '⏰', '🎮']

  const items = rawItems.map((item: any, idx: number) => {
    if (typeof item === 'string') {
      const isYes = !item.toLowerCase().includes('(simple)') &&
                    !item.toLowerCase().includes('spoon') &&
                    !item.toLowerCase().includes('chair') &&
                    !item.toLowerCase().includes('rock') &&
                    !item.toLowerCase().includes('refrigerator') &&
                    !item.toLowerCase().includes('banana')
      return {
        id: `item_${idx}`,
        name: item,
        isYes,
        image: itemImages[idx] || null,
        icon: iconList[idx % iconList.length]
      }
    }
    return {
      id: item.id || `item_${idx}`,
      name: item.name || item.text || `Item ${idx + 1}`,
      isYes: item.isYes !== undefined ? item.isYes : true,
      image: item.image || itemImages[idx] || null,
      icon: item.icon || iconList[idx % iconList.length]
    }
  })

  const [answers, setAnswers] = useState<Record<string, boolean>>(savedAnswer || {})

  const handleToggle = (id: string, choice: boolean) => {
    gameAudio.playTap()
    const updated = { ...answers, [id]: choice }
    setAnswers(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  const isCompleted = Object.keys(answers).length >= items.length

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      {/* Header */}
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          {taskTitle}
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
          {instruction}
        </h2>
      </div>

      {/* Choice Table */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1 overflow-y-auto pr-0.5">
        {items.map((item) => {
          const userChoice = answers[item.id]
          const isSelectedYes = userChoice === true
          const isSelectedNo = userChoice === false

          return (
            <div
              key={item.id}
              className="p-1.5 px-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 object-contain rounded-md bg-white border border-slate-200 shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <span className="text-lg shrink-0">{item.icon}</span>
                )}
                <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, true)}
                  className={`py-1 px-2.5 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                    isSelectedYes
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Check size={11} /> Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, false)}
                  className={`py-1 px-2.5 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                    isSelectedNo
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <X size={11} /> No
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            if (isCompleted) gameAudio.playSuccess()
            onNext()
          }}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Drawing Task 2 →
        </button>
      </div>
    </div>
  )
}

// 2. WORKSHEET PART A • TASK 2: DRAWING CANVAS & ROBOT NAME
export const ScreenWorksheetDraw: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const taskTitle = payload.taskTitle || 'WORKSHEET PART A • TASK 2'
  const prompt = payload.prompt || 'Draw your favourite AI helper or robot!'
  const namingPrompt = payload.namingPrompt || "Give it a fun name!"
  const itemImages = payload.itemImages || []

  const [robotName, setRobotName] = useState(savedAnswer?.name || '')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const startDraw = (e: any) => {
    setIsDrawing(true)
    draw(e)
  }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) {
      onSaveAnswer({ name: robotName, canvas: canvasRef.current.toDataURL() })
    }
  }
  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0288D1'
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearCanvas = () => {
    gameAudio.playTap()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          {taskTitle}
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
          {prompt}
        </h2>
      </div>

      {/* Canvas Area with Clear Button */}
      <div className="flex-1 flex flex-col justify-between my-1 p-2 rounded-2xl bg-sky-50/50 border border-sky-200 relative">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[10px] font-bold text-slate-600">Sketch here:</span>
          <button
            type="button"
            onClick={clearCanvas}
            className="text-[9px] font-bold text-slate-500 hover:text-red-500 flex items-center gap-0.5 cursor-pointer"
          >
            <RotateCcw size={10} /> Clear
          </button>
        </div>
        <div className="relative flex-1 w-full min-h-[140px] flex">
          <canvas
            ref={canvasRef}
            width={340}
            height={160}
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseMove={draw}
            onTouchStart={startDraw}
            onTouchEnd={stopDraw}
            onTouchMove={draw}
            className="w-full h-full bg-white rounded-xl border border-sky-300 touch-none cursor-crosshair shadow-2xs"
          />
          {itemImages.length > 0 && (
            <img
              src={itemImages[0]}
              alt="Reference"
              className="absolute right-2 top-2 w-12 h-12 object-contain opacity-30 pointer-events-none rounded-lg"
              loading="lazy"
            />
          )}
        </div>
        <div className="pt-2 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 shrink-0">Name:</span>
          <input
            type="text"
            value={robotName}
            onChange={(e) => {
              setRobotName(e.target.value)
              if (onSaveAnswer) onSaveAnswer({ name: e.target.value })
            }}
            placeholder={namingPrompt}
            className="flex-1 py-1 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold outline-hidden focus:border-[#0288D1]"
          />
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Worksheet Part B →
        </button>
      </div>
    </div>
  )
}

// 3. WORKSHEET PART B • TASK 1: MATCHING PAIRS
export const ScreenWorksheetMatching: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawPairs: any[] = payload.pairs && payload.pairs.length > 0 ? payload.pairs : [
    { left: 'Map app', right: 'Shows the way' },
    { left: 'Smart speaker', right: 'Plays songs' },
    { left: 'Smart camera', right: 'Finds faces' },
    { left: 'Translate app', right: 'Changes language' }
  ]
  const taskTitle = payload.taskTitle || 'WORKSHEET PART B • TASK 1'
  const itemImages = payload.itemImages || []
  const iconList = ['🗺️', '🔊', '📸', '🌐', '🤖', '⚡', '💡', '🔍']

  const pairs = rawPairs.map((p: any, idx: number) => ({
    id: `p_${idx}`,
    left: p.left || p,
    right: p.right || '',
    icon: iconList[idx % iconList.length],
    image: itemImages[idx] || null
  }))

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>(savedAnswer || {})

  const handleSelectLeft = (leftId: string) => {
    gameAudio.playTap()
    setSelectedLeft(leftId)
  }

  const handleSelectRight = (rightId: string) => {
    if (!selectedLeft) return
    gameAudio.playSuccess()
    const updated = { ...matchedPairs, [selectedLeft]: rightId }
    setMatchedPairs(updated)
    setSelectedLeft(null)
    if (onSaveAnswer) onSaveAnswer(updated)
    if (Object.keys(updated).length === pairs.length) {
      confetti({ particleCount: 30, spread: 60 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          {taskTitle}
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900">
          Match each item on the left to its pair!
        </h2>
        <p className="text-[9px] text-slate-500">
          Tap an item on the left, then tap its matching pair on the right.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2 my-auto py-1">
        {/* Left Column */}
        <div className="space-y-1.5">
          {pairs.map((p) => {
            const isMatched = !!matchedPairs[p.id]
            const isSelected = selectedLeft === p.id

            return (
              <button
                type="button"
                key={p.id}
                onClick={() => handleSelectLeft(p.id)}
                className={`w-full p-2 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-sky-200 border-[#0288D1] shadow-xs'
                    : isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.left}
                      className="w-5 h-5 object-contain rounded shrink-0 bg-white"
                      loading="lazy"
                    />
                  ) : (
                    <span>{p.icon}</span>
                  )}
                  <span className="text-[11px] font-bold truncate">{p.left}</span>
                </div>
                {isMatched && <Check size={12} className="text-emerald-600 shrink-0" />}
              </button>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-1.5">
          {pairs.map((p) => {
            const isMatched = Object.values(matchedPairs).includes(p.id)

            return (
              <button
                type="button"
                key={p.id}
                onClick={() => handleSelectRight(p.id)}
                className={`w-full p-2 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : selectedLeft
                    ? 'bg-amber-50 border-amber-300 hover:bg-amber-100'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-[11px] font-bold leading-tight">{p.right}</span>
                {isMatched && <Check size={12} className="text-emerald-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Word Box Blanks →
        </button>
      </div>
    </div>
  )
}

// 4. WORKSHEET PART B • TASK 2: WORD BOX BLANKS
export const ScreenWorksheetBlanks: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const wordBox: string[] = payload.wordBox && payload.wordBox.length > 0 ? payload.wordBox : ['robot', 'learn', 'helper']
  const taskTitle = payload.taskTitle || 'WORKSHEET PART B • TASK 2'
  const rawSentences: string[] = payload.sentences && payload.sentences.length > 0 ? payload.sentences : [
    'Bolt is a ___ robot.',
    'AI can ___ from examples.',
    'AI is a helpful ___.'
  ]

  const sentences = rawSentences.map((st: string, idx: number) => {
    const parts = st.split(/___+/)
    const expected = wordBox[idx % wordBox.length] || ''
    return {
      id: `s_${idx}`,
      before: parts[0] || '',
      after: parts.length > 1 ? parts.slice(1).join('') : '',
      answer: expected
    }
  })

  const [filledWords, setFilledWords] = useState<Record<string, string>>(savedAnswer || {})
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  const handleSelectWord = (word: string) => {
    gameAudio.playTap()
    setSelectedWord(word)
  }

  const handlePlaceWord = (sentenceId: string) => {
    if (!selectedWord) return
    gameAudio.playSuccess()
    const updated = { ...filledWords, [sentenceId]: selectedWord }
    setFilledWords(updated)
    setSelectedWord(null)
    if (onSaveAnswer) onSaveAnswer(updated)
    if (Object.keys(updated).length === sentences.length) {
      confetti({ particleCount: 30, spread: 60 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          {taskTitle}
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900">
          Fill in the blanks using the Word Box
        </h2>
      </div>

      {/* Word Box */}
      <div className="my-1 p-2 rounded-2xl bg-amber-50 border-2 border-amber-300 shrink-0 text-center">
        <span className="text-[9px] font-black uppercase text-amber-800 block mb-1">
          🌸 WORD BOX (tap to select):
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {wordBox.map((w) => {
            const isSelected = selectedWord === w
            const isUsed = Object.values(filledWords).includes(w)

            return (
              <button
                type="button"
                key={w}
                onClick={() => handleSelectWord(w)}
                className={`py-1 px-3 rounded-full font-black text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 border-amber-500 scale-105 shadow-xs'
                    : isUsed
                    ? 'opacity-40 bg-slate-100 text-slate-500 border-slate-200'
                    : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100 shadow-2xs'
                }`}
              >
                {w}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sentences */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {sentences.map((st) => {
          const userWord = filledWords[st.id]
          const isCorrect = userWord && userWord.toLowerCase() === st.answer.toLowerCase()

          return (
            <div
              key={st.id}
              onClick={() => handlePlaceWord(st.id)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-sky-50/50"
            >
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {st.before}
                <span className={`inline-block mx-1 px-2 py-0.5 rounded-md font-black underline decoration-2 ${
                  userWord
                    ? isCorrect
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800 min-w-[50px] text-center'
                }`}>
                  {userWord || '______'}
                </span>
                {st.after}
              </p>
              {isCorrect && <CheckCircle2 size={15} className="text-emerald-600 shrink-0 ml-1" />}
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Puzzle Fun →
        </button>
      </div>
    </div>
  )
}
