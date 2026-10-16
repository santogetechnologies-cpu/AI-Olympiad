// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED IN-PAGE PDF INTERACTION LAYER
// 100% In-PDF Interactive Engine for Classes 3 to 10:
// 1. Word Tap & Speak (bounce animation, emphasis, phonetic spelling)
// 2. In-Line Typeable Worksheet Blanks (direct on dotted lines)
// 3. Click-to-Circle & Tick Choices (for "Odd one out!", choices, checkboxes)
// 4. Tap-to-Count Objects (voice counting "One! Two! Three!")
// 5. High-DPR Smooth Drawing & Highlighter Canvas (Pen, Highlighter, Eraser)
// 6. Drag-and-Drop Stickers & Stamps (Gold Stars, Robots, Trophies)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useState, useEffect, useCallback } from 'react'
import type { PageWordItem } from '../hooks/usePdfInteractiveLayer'
import type { PageRegion } from './PdfRegionOverlay'
import {
  Star,
  Bot,
  Trophy,
  Target,
  Heart,
  Check,
  Volume2,
  Sparkles,
  RotateCcw,
  Undo2,
  Trash2,
  CheckCircle2,
  Edit3
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export type StudioTool = 'pointer' | 'pen' | 'highlighter' | 'eraser' | 'text' | 'stamp' | 'circle'

export interface StrokePoint {
  x: number
  y: number
}

export interface DrawingStroke {
  tool: 'pen' | 'highlighter' | 'eraser' | 'circle'
  color: string
  width: number
  points: StrokePoint[]
}

export interface PlacedSticker {
  id: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  type: string
}

export interface TypedNote {
  id: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  text: string
  color: string
}

export interface UnifiedPdfInteractionLayerProps {
  pageNumber: number
  bookKey: string
  pageWidth: number
  pageHeight: number
  scale: number
  activeTool: StudioTool
  activeColor: string
  strokeWidth: number
  words: PageWordItem[]
  activeWordId: string | null
  regions: PageRegion[]
  isReadingAloud: boolean
  onAddStar?: (count?: number) => void
  onWordClick?: (word: PageWordItem) => void
  onWordSpell?: (word: PageWordItem) => void
}

const STAMP_ICONS: { [key: string]: any } = {
  star: { icon: Star, color: 'text-amber-500 fill-amber-400' },
  robot: { icon: Bot, color: 'text-blue-500 fill-blue-100' },
  trophy: { icon: Trophy, color: 'text-yellow-500 fill-yellow-200' },
  target: { icon: Target, color: 'text-rose-500' },
  heart: { icon: Heart, color: 'text-pink-500 fill-pink-400' },
  check: { icon: Check, color: 'text-emerald-500' }
}

export const UnifiedPdfInteractionLayer: React.FC<UnifiedPdfInteractionLayerProps> = ({
  pageNumber,
  bookKey,
  pageWidth,
  pageHeight,
  scale,
  activeTool,
  activeColor,
  strokeWidth,
  words,
  activeWordId,
  regions,
  isReadingAloud,
  onAddStar,
  onWordClick,
  onWordSpell
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef<boolean>(false)
  const currentStrokeRef = useRef<StrokePoint[]>([])

  // Drawing strokes & stickers
  const [strokes, setStrokes] = useState<DrawingStroke[]>([])
  const [stickers, setStickers] = useState<PlacedSticker[]>([])
  const [typedNotes, setTypedNotes] = useState<TypedNote[]>([])
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  // In-line typed blanks & circle toggles
  const [typedBlanks, setTypedBlanks] = useState<{ [id: string]: string }>({})
  const [circledItems, setCircledItems] = useState<{ [id: string]: boolean }>({})

  // Tap-to-count counter state
  const [countNumber, setCountNumber] = useState<number>(0)
  const [bouncingWordId, setBouncingWordId] = useState<string | null>(null)

  const storageKey = `gaio_page_state_${bookKey}_p${pageNumber}`

  // Load saved state for this page
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStrokes(parsed.strokes || [])
        setStickers(parsed.stickers || [])
        setTypedNotes(parsed.typedNotes || [])
        setTypedBlanks(parsed.typedBlanks || {})
        setCircledItems(parsed.circledItems || {})
      } else {
        setStrokes([])
        setStickers([])
        setTypedNotes([])
        setTypedBlanks({})
        setCircledItems({})
      }
    } catch {
      setStrokes([])
      setStickers([])
      setTypedNotes([])
      setTypedBlanks({})
      setCircledItems({})
    }
    setCountNumber(0)
  }, [storageKey])

  // Save state
  const persistState = useCallback(
    (
      newStrokes: DrawingStroke[],
      newStickers: PlacedSticker[],
      newNotes: TypedNote[],
      newBlanks: { [id: string]: string },
      newCircles: { [id: string]: boolean }
    ) => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            strokes: newStrokes,
            stickers: newStickers,
            typedNotes: newNotes,
            typedBlanks: newBlanks,
            circledItems: newCircles
          })
        )
      } catch {}
    },
    [storageKey]
  )

  // Redraw canvas with high DPR
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(pageWidth * dpr)
    canvas.height = Math.floor(pageHeight * dpr)
    canvas.style.width = `${pageWidth}px`
    canvas.style.height = `${pageHeight}px`

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, pageWidth, pageHeight)

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
      }

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (stroke.tool === 'highlighter') {
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.width * 3.5
        ctx.globalAlpha = 0.35
      } else if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = stroke.width * 6
      } else if (stroke.tool === 'circle') {
        ctx.strokeStyle = '#2563eb'
        ctx.lineWidth = 3
        ctx.setLineDash([6, 3])
      } else {
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.width
        ctx.globalAlpha = 1.0
      }

      ctx.stroke()
      ctx.restore()
    })
  }, [strokes, pageWidth, pageHeight])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  // Coordinate helper
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  // Pointer event handlers for drawing / stamping / text
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'pointer') return

    // 1. STAMP TOOL
    if (activeTool === 'stamp') {
      const rect = e.currentTarget.getBoundingClientRect()
      const pctX = ((e.clientX - rect.left) / rect.width) * 100
      const pctY = ((e.clientY - rect.top) / rect.height) * 100

      const newSticker: PlacedSticker = {
        id: `st_${Date.now()}`,
        x: pctX,
        y: pctY,
        type: 'star'
      }
      const updated = [...stickers, newSticker]
      setStickers(updated)
      persistState(strokes, updated, typedNotes, typedBlanks, circledItems)
      gameAudio.playCoin()
      onAddStar?.(1)
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      })
      return
    }

    // 2. TEXT TOOL
    if (activeTool === 'text') {
      const rect = e.currentTarget.getBoundingClientRect()
      const pctX = ((e.clientX - rect.left) / rect.width) * 100
      const pctY = ((e.clientY - rect.top) / rect.height) * 100

      const newId = `note_${Date.now()}`
      const newNote: TypedNote = {
        id: newId,
        x: pctX,
        y: pctY,
        text: '',
        color: activeColor
      }
      const updated = [...typedNotes, newNote]
      setTypedNotes(updated)
      setEditingNoteId(newId)
      persistState(strokes, stickers, updated, typedBlanks, circledItems)
      gameAudio.playTap()
      return
    }

    // 3. FREEHAND DRAWING (Pen, Highlighter, Eraser)
    isDrawingRef.current = true
    const pt = getCanvasCoords(e)
    currentStrokeRef.current = [pt]
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    const pt = getCanvasCoords(e)
    currentStrokeRef.current.push(pt)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pts = currentStrokeRef.current
    if (pts.length < 2) return

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y)
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (activeTool === 'highlighter') {
      ctx.strokeStyle = activeColor
      ctx.lineWidth = strokeWidth * 3.5
      ctx.globalAlpha = 0.35
    } else if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = strokeWidth * 6
    } else {
      ctx.strokeStyle = activeColor
      ctx.lineWidth = strokeWidth
      ctx.globalAlpha = 1.0
    }

    ctx.stroke()
    ctx.restore()
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    isDrawingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    if (currentStrokeRef.current.length > 1) {
      const newStroke: DrawingStroke = {
        tool: activeTool as any,
        color: activeColor,
        width: strokeWidth,
        points: [...currentStrokeRef.current]
      }
      const updated = [...strokes, newStroke]
      setStrokes(updated)
      persistState(updated, stickers, typedNotes, typedBlanks, circledItems)
    }
    currentStrokeRef.current = []
  }

  // 4. TAP TO SPEAK & WORD INTERACTIONS
  const handleWordTap = (item: PageWordItem) => {
    if (activeTool !== 'pointer') return

    setBouncingWordId(item.id)
    setTimeout(() => setBouncingWordId(null), 600)

    if (onWordClick) {
      onWordClick(item)
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(item.cleanWord || item.word)
      u.rate = 0.95
      u.pitch = 1.1
      window.speechSynthesis.speak(u)
      gameAudio.playTap()
    }
  }

  const handleWordDoubleTap = (item: PageWordItem) => {
    if (activeTool !== 'pointer') return
    if (onWordSpell) {
      onWordSpell(item)
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const letters = item.cleanWord.toUpperCase().split('').join('. ')
      const u = new SpeechSynthesisUtterance(`${letters}! ... ${item.cleanWord}!`)
      u.rate = 0.8
      u.pitch = 1.2
      window.speechSynthesis.speak(u)
      gameAudio.playCoin()
      confetti({ particleCount: 15, spread: 40 })
    }
  }

  // 5. IN-LINE TYPED BLANKS
  const handleBlankChange = (id: string, text: string) => {
    const updated = { ...typedBlanks, [id]: text }
    setTypedBlanks(updated)
    persistState(strokes, stickers, typedNotes, updated, circledItems)
  }

  // 6. TAP-TO-COUNT OBJECTS
  const handleCountClick = (label: string, e: React.MouseEvent) => {
    const nextCount = countNumber + 1
    setCountNumber(nextCount)
    gameAudio.playCoin()

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const countWords = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
      const spoken = countWords[nextCount - 1] || String(nextCount)
      const u = new SpeechSynthesisUtterance(`${spoken}!`)
      u.rate = 1.0
      u.pitch = 1.2
      window.speechSynthesis.speak(u)
    }

    confetti({
      particleCount: 15,
      spread: 35,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    })
    onAddStar?.(1)
  }

  // 7. CIRCLE / CHOOSE ITEM TOGGLE
  const handleCircleToggle = (id: string) => {
    const nextVal = !circledItems[id]
    const updated = { ...circledItems, [id]: nextVal }
    setCircledItems(updated)
    persistState(strokes, stickers, typedNotes, typedBlanks, updated)

    if (nextVal) {
      gameAudio.playSuccess()
      onAddStar?.(1)
      confetti({ particleCount: 20, spread: 40 })
      toast.success('Circled choice! ⭐')
    } else {
      gameAudio.playTap()
    }
  }

  // Undo / Clear
  const handleUndo = () => {
    if (strokes.length > 0) {
      const updated = strokes.slice(0, -1)
      setStrokes(updated)
      persistState(updated, stickers, typedNotes, typedBlanks, circledItems)
      gameAudio.playTap()
    } else if (stickers.length > 0) {
      const updated = stickers.slice(0, -1)
      setStickers(updated)
      persistState(strokes, updated, typedNotes, typedBlanks, circledItems)
      gameAudio.playTap()
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Clear all your drawings, typed answers, and circles on this page?')) {
      setStrokes([])
      setStickers([])
      setTypedNotes([])
      setTypedBlanks({})
      setCircledItems({})
      persistState([], [], [], {}, {})
      gameAudio.playTap()
      toast.success('Page annotations cleared')
    }
  }

  return (
    <div className="absolute inset-0 select-none overflow-hidden" style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}>
      {/* ── LAYER A: High-DPR Drawing Canvas (Pen, Highlighter, Eraser) ───── */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`absolute inset-0 z-20 touch-none ${
          activeTool === 'pointer'
            ? 'pointer-events-none'
            : activeTool === 'pen'
            ? 'cursor-crosshair'
            : activeTool === 'highlighter'
            ? 'cursor-cell'
            : activeTool === 'eraser'
            ? 'cursor-grab'
            : 'cursor-pointer'
        }`}
      />

      {/* ── LAYER B: Placed Stickers (Stars, Robots, Trophies) ────────────── */}
      <div className="absolute inset-0 pointer-events-none z-25">
        {stickers.map((st) => {
          const conf = STAMP_ICONS[st.type] || STAMP_ICONS.star
          const Icon = conf.icon
          return (
            <div
              key={st.id}
              style={{ left: `${st.x}%`, top: `${st.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 drop-shadow-lg animate-bounce-subtle pointer-events-auto"
            >
              <Icon className={`w-8 h-8 ${conf.color}`} />
            </div>
          )
        })}
      </div>

      {/* ── LAYER C: Interactive Word Zones (Tap to Speak, Double Tap Spell) ─ */}
      <div
        className={`absolute inset-0 z-15 ${
          activeTool === 'pointer' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {words.map((item) => {
          const isActive = activeWordId === item.id
          const isBouncing = bouncingWordId === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleWordTap(item)}
              onDoubleClick={() => handleWordDoubleTap(item)}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.w}px`,
                height: `${item.h}px`
              }}
              title={`Tap to hear: "${item.cleanWord}" (Double-tap to spell)`}
              className={`absolute rounded transition-all duration-150 focus:outline-none ${
                isActive
                  ? 'bg-amber-400/50 ring-4 ring-amber-300 shadow-xl scale-110 z-30 animate-pulse'
                  : isBouncing
                  ? 'bg-blue-400/40 ring-2 ring-blue-500 scale-105 z-20'
                  : 'hover:bg-blue-400/20 hover:ring-1 hover:ring-blue-400/40 cursor-pointer'
              }`}
            />
          )
        })}
      </div>

      {/* ── LAYER D: In-Line Worksheet Blanks & Clickable Choices ─────────── */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {regions.map((region) => {
          if (!region.bbox) return null
          const [x, y, w, h] = region.bbox
          const sx = x * scale
          const sy = y * scale
          const sw = w * scale
          const sh = h * scale

          // Typeable blank directly on worksheet line
          if (region.type === 'typeable') {
            const val = typedBlanks[region.id] || ''
            return (
              <div
                key={region.id}
                style={{
                  left: `${sx}px`,
                  top: `${sy}px`,
                  width: `${Math.max(75, sw)}px`,
                  height: `${Math.max(26, sh)}px`
                }}
                className="absolute pointer-events-auto"
              >
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleBlankChange(region.id, e.target.value)}
                  placeholder="Type answer..."
                  className="w-full h-full px-2 py-0.5 bg-blue-50/90 hover:bg-white focus:bg-white text-blue-950 font-bold text-xs rounded-lg border-2 border-blue-400/80 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 shadow-sm outline-none transition-all placeholder:text-blue-400/60"
                />
              </div>
            )
          }

          // Choose / Option circle (e.g. A, B, C, D)
          if (region.type === 'choose') {
            const isCircled = !!circledItems[region.id]
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleCircleToggle(region.id)}
                style={{
                  left: `${sx}px`,
                  top: `${sy}px`,
                  width: `${Math.max(28, sw)}px`,
                  height: `${Math.max(28, sh)}px`
                }}
                title={region.optionText || `Option ${region.label}`}
                className={`absolute pointer-events-auto rounded-full font-black text-xs flex items-center justify-center transition-all shadow-md ${
                  isCircled
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-300 scale-110 z-30'
                    : 'bg-white/95 hover:bg-blue-600 text-blue-900 hover:text-white border-2 border-blue-500 hover:scale-105'
                }`}
              >
                {isCircled ? <Check size={16} className="stroke-[3]" /> : region.label || '✓'}
              </button>
            )
          }

          return null
        })}
      </div>

      {/* ── LAYER E: Freeform Typed Notes on Page ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-35">
        {typedNotes.map((note) => {
          const isEditing = editingNoteId === note.id
          return (
            <div
              key={note.id}
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
              className="absolute -translate-x-2 -translate-y-4 pointer-events-auto"
            >
              {isEditing ? (
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-xl border-2 border-blue-500">
                  <input
                    type="text"
                    autoFocus
                    value={note.text}
                    placeholder="Type note..."
                    onChange={(e) => {
                      const updated = typedNotes.map((n) =>
                        n.id === note.id ? { ...n, text: e.target.value } : n
                      )
                      setTypedNotes(updated)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEditingNoteId(null)
                        persistState(strokes, stickers, typedNotes, typedBlanks, circledItems)
                      }
                    }}
                    className="px-2 py-1 text-sm font-bold text-blue-900 outline-none w-44"
                  />
                  <button
                    onClick={() => {
                      setEditingNoteId(null)
                      persistState(strokes, stickers, typedNotes, typedBlanks, circledItems)
                    }}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setEditingNoteId(note.id)}
                  className="px-2.5 py-1 bg-blue-50/95 border border-blue-300 rounded-lg shadow-sm text-sm font-bold text-blue-900 cursor-pointer hover:border-blue-500 transition-all hover:scale-105"
                  style={{ color: note.color }}
                >
                  {note.text || '(empty)'}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
