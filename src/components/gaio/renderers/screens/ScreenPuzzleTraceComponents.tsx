// ─────────────────────────────────────────────────────────────────────────────
// SCREEN PUZZLE & TRACE COMPONENTS (Puzzle Fun & Trace & Colour)
// Odd One Out • Count & Write • Trace Magic Words • Digital Colouring Studio
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react'
import type { GaioScreenItem } from '../../types'
import { Check, X, RotateCcw, Palette, Sparkles, Plus, Minus } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
}

// 1. PUZZLE FUN • TASK 1: ODD ONE OUT!
export const ScreenPuzzleOddOne: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawRows: any[] = payload.rows || []
  const correctOddIndices: number[] = payload.correctOddIndices || []
  const iconPool = ['📱', '🔊', '🤖', '🪨', '🗺️', '📸', '🍎', '🎙️', '💻', '📺', '🪵', '✂️', '🚲', '🍕', '🚗', '⚡', '💡', '🔍']

  const defaultRows = [
    {
      id: 'Row_1',
      title: 'Row A',
      items: [
        { id: 1, name: 'Smart phone', icon: '📱', isOdd: false },
        { id: 2, name: 'Smart speaker', icon: '🔊', isOdd: false },
        { id: 3, name: 'Robot cleaner', icon: '🤖', isOdd: false },
        { id: 4, name: 'Wooden rock', icon: '🪨', isOdd: true },
      ]
    },
    {
      id: 'Row_2',
      title: 'Row B',
      items: [
        { id: 1, name: 'Map app', icon: '🗺️', isOdd: false },
        { id: 2, name: 'Camera AI', icon: '📸', isOdd: false },
        { id: 3, name: 'Apple fruit', icon: '🍎', isOdd: true },
        { id: 4, name: 'Voice helper', icon: '🎙️', isOdd: false },
      ]
    },
    {
      id: 'Row_3',
      title: 'Row C',
      items: [
        { id: 1, name: 'Computer', icon: '💻', isOdd: false },
        { id: 2, name: 'Smart TV', icon: '📺', isOdd: false },
        { id: 3, name: 'Tablet', icon: '📱', isOdd: false },
        { id: 4, name: 'Wooden stick', icon: '🪵', isOdd: true },
      ]
    }
  ]

  const rows = rawRows.length > 0 ? rawRows.map((r: any, rIdx: number) => {
    const rowItems = (r.items || []).map((it: string, itIdx: number) => {
      const isOdd = itIdx === (r.oddIdx !== undefined ? r.oddIdx : (correctOddIndices[rIdx] ?? 3))
      return {
        id: itIdx + 1,
        name: it,
        icon: iconPool[(rIdx * 4 + itIdx) % iconPool.length],
        isOdd
      }
    })
    return {
      id: `Row_${rIdx + 1}`,
      title: `Row ${String.fromCharCode(65 + rIdx)}`,
      items: rowItems
    }
  }) : defaultRows

  const [selections, setSelections] = useState<Record<string, number>>(savedAnswer || {})

  const handleSelect = (rowId: string, itemId: number, isOdd: boolean) => {
    if (isOdd) gameAudio.playSuccess()
    else gameAudio.playTap()

    const updated = { ...selections, [rowId]: itemId }
    setSelections(updated)
    if (onSaveAnswer) onSaveAnswer(updated)

    if (Object.keys(updated).length === rows.length) {
      confetti({ particleCount: 40, spread: 60 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          PUZZLE FUN • TASK 1
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900">
          Odd one out! Circle what does not belong.
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-2 overflow-y-auto pr-0.5">
        {rows.map((r) => {
          const userSelected = selections[r.id]

          return (
            <div key={r.id} className="p-2 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase px-1">
                {r.title}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {r.items.map((item: any) => {
                  const isChosen = userSelected === item.id
                  const isCorrect = isChosen && item.isOdd

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleSelect(r.id, item.id, !!item.isOdd)}
                      className={`p-1.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-between cursor-pointer ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-500 shadow-xs scale-105'
                            : 'bg-rose-100 border-rose-400'
                          : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[8px] font-bold text-slate-700 truncate w-full mt-0.5">
                        {item.name}
                      </span>
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
          type="button"
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Count & Write →
        </button>
      </div>
    </div>
  )
}

// 2. PUZZLE FUN • TASK 2: COUNT AND WRITE!
export const ScreenPuzzleCount: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawItems: any[] = payload.items || []
  const targetCounts = payload.targetCounts || [4, 3, 5]
  const iconPool = ['🤖', '📱', '🔊', '💡', '🚗', '✂️', '🚲', '⚡']

  const items = rawItems.length > 0 ? rawItems.map((it: any, idx: number) => ({
    id: idx + 1,
    name: it.label || it.name || `Item ${idx + 1}`,
    icon: iconPool[idx % iconPool.length],
    target: it.count || targetCounts[idx] || 3
  })) : [
    { id: 1, name: 'Robots', icon: '🤖', target: targetCounts[0] || 4 },
    { id: 2, name: 'Smart Phones', icon: '📱', target: targetCounts[1] || 3 },
    { id: 3, name: 'Smart Speakers', icon: '🔊', target: targetCounts[2] || 5 },
  ]

  const [counts, setCounts] = useState<Record<number, number>>(savedAnswer || { 1: 0, 2: 0, 3: 0 })

  const updateCount = (id: number, delta: number) => {
    gameAudio.playTap()
    const current = counts[id] || 0
    const next = Math.max(0, current + delta)
    const updated = { ...counts, [id]: next }
    setCounts(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          PUZZLE FUN • TASK 2
        </span>
        <h2 className="text-xs sm:text-sm font-black text-slate-900">
          Count and write! How many can you see?
        </h2>
      </div>

      {/* Target Items Counter Cards */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {items.map((it) => {
          const count = counts[it.id] || 0
          const isTargetReached = count === it.target

          return (
            <div
              key={it.id}
              className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between ${
                isTargetReached
                  ? 'bg-emerald-50 border-emerald-400'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{it.icon}</span>
                <div>
                  <span className="text-xs sm:text-sm font-black text-slate-800 block">
                    {it.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Count: {count}
                  </span>
                </div>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCount(it.id, -1)}
                  className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 cursor-pointer active:scale-95 shadow-2xs"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-black text-[#0288D1]">
                  {count}
                </span>
                <button
                  onClick={() => updateCount(it.id, 1)}
                  className="w-8 h-8 rounded-xl bg-[#0288D1] text-white flex items-center justify-center font-bold hover:bg-sky-600 cursor-pointer active:scale-95 shadow-2xs"
                >
                  <Plus size={14} />
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
          Next: Trace & Write →
        </button>
      </div>
    </div>
  )
}

// 3. TRACE & COLOUR • TASK 1: TRACE WORDS
export const ScreenTraceWords: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const words = screen.payload?.wordsToTrace || ['ROBOT', 'SMART', 'HELPER']
  const [typedWords, setTypedWords] = useState<Record<string, string>>(savedAnswer || {})

  const handleInput = (word: string, val: string) => {
    const updated = { ...typedWords, [word]: val.toUpperCase() }
    setTypedWords(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase text-[#0288D1]">
          TRACE & COLOUR • TASK 1
        </span>
        <h2 className="text-sm font-black text-slate-900">
          Trace the magic words. Then write them again!
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {words.map((w: string) => {
          const userVal = typedWords[w] || ''
          const isDone = userVal === w

          return (
            <div key={w} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                {/* Dotted / Tracing Guide */}
                <span className="text-base sm:text-lg font-mono font-black tracking-widest text-slate-400 select-all border-b-2 border-dashed border-slate-300 pb-0.5">
                  {w}
                </span>
                {isDone && <Check size={16} className="text-emerald-600" />}
              </div>
              <input
                type="text"
                value={userVal}
                onChange={(e) => handleInput(w, e.target.value)}
                placeholder={`Type ${w} here...`}
                className="w-full py-1 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-black tracking-wider uppercase outline-hidden focus:border-[#0288D1]"
              />
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Colour Me Brightly →
        </button>
      </div>
    </div>
  )
}

// 4. TRACE & COLOUR • TASK 2: DIGITAL COLOURING STUDIO
export const ScreenColourCanvas: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const palette = ['#EF4444', '#F59E0B', '#10B981', '#0288D1', '#8B5CF6', '#EC4899', '#1F2937']
  const [selectedColor, setSelectedColor] = useState(palette[3])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const startDraw = (e: any) => {
    setIsDrawing(true)
    draw(e)
  }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) {
      onSaveAnswer(canvasRef.current.toDataURL())
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

    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.strokeStyle = selectedColor
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase text-amber-600">
            TRACE & COLOUR • TASK 2
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            Colour me brightly!
          </h2>
        </div>
        <button
          onClick={clearCanvas}
          className="text-[9px] font-bold text-slate-500 hover:text-red-500 flex items-center gap-0.5 cursor-pointer"
        >
          <RotateCcw size={10} /> Clear
        </button>
      </div>

      {/* Colour Palette Swatches */}
      <div className="flex justify-center gap-2 my-1 shrink-0">
        {palette.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            style={{ backgroundColor: c }}
            className={`w-6 h-6 rounded-full transition-all cursor-pointer shadow-2xs ${
              selectedColor === c ? 'scale-125 ring-2 ring-slate-800' : 'hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Interactive Colouring Canvas with Authentic PDF Outline Underlay */}
      <div className="flex-1 my-1 rounded-2xl border-2 border-amber-300 overflow-hidden relative bg-white shadow-xs flex items-center justify-center">
        {screen.sectionCropImage && (
          <img
            src={screen.sectionCropImage}
            alt="Colouring outline"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-85 select-none"
          />
        )}
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
          onMouseMove={draw}
          onTouchStart={startDraw}
          onTouchEnd={stopDraw}
          onTouchMove={draw}
          className="w-full h-full touch-none cursor-crosshair relative z-10"
        />
        <div className="absolute bottom-1 right-2 pointer-events-none text-[9px] text-slate-500 font-bold z-20 bg-white/70 px-1.5 py-0.5 rounded-md">
          Digital Art Studio
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Quiz Time →
        </button>
      </div>
    </div>
  )
}
