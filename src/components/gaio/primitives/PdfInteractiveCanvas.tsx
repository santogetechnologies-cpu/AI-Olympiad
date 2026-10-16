// ─────────────────────────────────────────────────────────────────────────────
// PDF INTERACTIVE CANVAS & ANNOTATION LAYER
// Authentic drawing, highlighting, typing, and stamping directly on book pages
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  Pen,
  Highlighter,
  Eraser,
  Type,
  Smile,
  Undo2,
  Trash2,
  Download,
  Palette,
  Check,
  Sparkles,
  Star,
  Bot,
  Trophy,
  Target,
  Heart,
  ThumbsUp
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export type ToolType = 'pen' | 'highlighter' | 'eraser' | 'text' | 'stamp' | 'pointer'

export interface StrokePoint {
  x: number
  y: number
}

export interface DrawingStroke {
  tool: 'pen' | 'highlighter' | 'eraser'
  color: string
  width: number
  points: StrokePoint[]
}

export interface TextAnnotation {
  id: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  text: string
  color: string
}

export interface StampAnnotation {
  id: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  iconKey: string
}

export interface PdfInteractiveCanvasProps {
  pageNumber: number
  bookKey: string
  pageWidth: number
  pageHeight: number
  pdfCanvas: HTMLCanvasElement | null
  isDrawMode?: boolean
  onAnnotationChange?: (hasAnnotations: boolean) => void
  onAddStar?: () => void
}

const PALETTE_COLORS = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Vibrant Purple', hex: '#9333ea' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Sunny Amber', hex: '#d97706' },
  { name: 'Ruby Red', hex: '#dc2626' },
  { name: 'Jet Black', hex: '#1e293b' },
]

const STAMP_OPTIONS = [
  { key: 'star', label: 'Star', icon: Star, color: 'text-amber-500 fill-amber-400' },
  { key: 'robot', label: 'Bolt', icon: Bot, color: 'text-blue-500 fill-blue-100' },
  { key: 'trophy', label: 'Winner', icon: Trophy, color: 'text-yellow-500 fill-yellow-200' },
  { key: 'target', label: 'Accurate', icon: Target, color: 'text-rose-500' },
  { key: 'check', label: 'Correct', icon: Check, color: 'text-emerald-500' },
  { key: 'heart', label: 'Loved it', icon: Heart, color: 'text-pink-500 fill-pink-400' },
  { key: 'thumb', label: 'Great', icon: ThumbsUp, color: 'text-indigo-500' },
]

export const PdfInteractiveCanvas: React.FC<PdfInteractiveCanvasProps> = ({
  pageNumber,
  bookKey,
  pageWidth,
  pageHeight,
  pdfCanvas,
  isDrawMode = true,
  onAnnotationChange,
  onAddStar
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef<boolean>(false)
  const currentStrokeRef = useRef<StrokePoint[]>([])

  // Tools state
  const [activeTool, setActiveTool] = useState<ToolType>('pen')
  const [activeColor, setActiveColor] = useState<string>('#2563eb')
  const [activeStrokeWidth, setActiveStrokeWidth] = useState<number>(3)
  const [activeStamp, setActiveStamp] = useState<string>('star')
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [showStampPicker, setShowStampPicker] = useState<boolean>(false)

  // Data state
  const [strokes, setStrokes] = useState<DrawingStroke[]>([])
  const [textNotes, setTextNotes] = useState<TextAnnotation[]>([])
  const [stamps, setStamps] = useState<StampAnnotation[]>([])
  const [editingTextId, setEditingTextId] = useState<string | null>(null)

  const storageKey = `gaio_annot_${bookKey}_p${pageNumber}`

  // Load annotations from localStorage when page changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStrokes(parsed.strokes || [])
        setTextNotes(parsed.textNotes || [])
        setStamps(parsed.stamps || [])
        onAnnotationChange?.(true)
      } else {
        setStrokes([])
        setTextNotes([])
        setStamps([])
        onAnnotationChange?.(false)
      }
    } catch {
      setStrokes([])
      setTextNotes([])
      setStamps([])
    }
  }, [storageKey, onAnnotationChange])

  // Save annotations to localStorage
  const saveAnnotations = useCallback(
    (newStrokes: DrawingStroke[], newTexts: TextAnnotation[], newStamps: StampAnnotation[]) => {
      try {
        const payload = { strokes: newStrokes, textNotes: newTexts, stamps: newStamps }
        localStorage.setItem(storageKey, JSON.stringify(payload))
        const hasItems = newStrokes.length > 0 || newTexts.length > 0 || newStamps.length > 0
        onAnnotationChange?.(hasItems)
      } catch (e) {
        console.warn('Failed to save annotations to localStorage', e)
      }
    },
    [storageKey, onAnnotationChange]
  )

  // Redraw canvas whenever strokes, width, or height changes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

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
        ctx.lineWidth = stroke.width * 4
        ctx.globalAlpha = 0.35
        ctx.globalCompositeOperation = 'multiply'
      } else if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = stroke.width * 5
      } else {
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.width
        ctx.globalAlpha = 1.0
      }

      ctx.stroke()
      ctx.restore()
    })
  }, [strokes])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas, pageWidth, pageHeight])

  // Pointer event handlers for drawing
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'pointer') return

    // If text tool, spawn text box at percentage coordinates
    if (activeTool === 'text') {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const pctX = ((e.clientX - rect.left) / rect.width) * 100
      const pctY = ((e.clientY - rect.top) / rect.height) * 100

      const newId = `note_${Date.now()}`
      const newNote: TextAnnotation = {
        id: newId,
        x: pctX,
        y: pctY,
        text: '',
        color: activeColor,
      }
      const updated = [...textNotes, newNote]
      setTextNotes(updated)
      setEditingTextId(newId)
      saveAnnotations(strokes, updated, stamps)
      gameAudio.playTap()
      return
    }

    // If stamp tool, stamp an icon
    if (activeTool === 'stamp') {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const pctX = ((e.clientX - rect.left) / rect.width) * 100
      const pctY = ((e.clientY - rect.top) / rect.height) * 100

      const newStamp: StampAnnotation = {
        id: `stamp_${Date.now()}`,
        x: pctX,
        y: pctY,
        iconKey: activeStamp,
      }
      const updatedStamps = [...stamps, newStamp]
      setStamps(updatedStamps)
      saveAnnotations(strokes, textNotes, updatedStamps)

      gameAudio.playCoin()
      if (activeStamp === 'star') {
        onAddStar?.()
        confetti({
          particleCount: 20,
          spread: 40,
          origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          },
        })
      }
      return
    }

    // Freehand drawing (pen, highlighter, eraser)
    isDrawingRef.current = true
    const pt = getCoordinates(e)
    currentStrokeRef.current = [pt]

    const canvas = canvasRef.current
    if (canvas) {
      canvas.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    const pt = getCoordinates(e)
    currentStrokeRef.current.push(pt)

    // Fast direct render of active stroke
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
      ctx.lineWidth = activeStrokeWidth * 4
      ctx.globalAlpha = 0.35
      ctx.globalCompositeOperation = 'multiply'
    } else if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = activeStrokeWidth * 5
    } else {
      ctx.strokeStyle = activeColor
      ctx.lineWidth = activeStrokeWidth
      ctx.globalAlpha = 1.0
    }

    ctx.stroke()
    ctx.restore()
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    isDrawingRef.current = false

    const canvas = canvasRef.current
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId)
    }

    if (currentStrokeRef.current.length > 1) {
      const newStroke: DrawingStroke = {
        tool: activeTool as any,
        color: activeColor,
        width: activeStrokeWidth,
        points: [...currentStrokeRef.current],
      }
      const updated = [...strokes, newStroke]
      setStrokes(updated)
      saveAnnotations(updated, textNotes, stamps)
    }
    currentStrokeRef.current = []
  }

  // Undo last action
  const handleUndo = () => {
    if (strokes.length > 0) {
      const updated = strokes.slice(0, -1)
      setStrokes(updated)
      saveAnnotations(updated, textNotes, stamps)
      gameAudio.playTap()
    } else if (stamps.length > 0) {
      const updated = stamps.slice(0, -1)
      setStamps(updated)
      saveAnnotations(strokes, textNotes, updated)
      gameAudio.playTap()
    } else if (textNotes.length > 0) {
      const updated = textNotes.slice(0, -1)
      setTextNotes(updated)
      saveAnnotations(strokes, updated, stamps)
      gameAudio.playTap()
    }
  }

  // Clear all annotations on this page
  const handleClear = () => {
    if (strokes.length === 0 && textNotes.length === 0 && stamps.length === 0) return
    if (window.confirm('Clear all your drawings and notes on this page?')) {
      setStrokes([])
      setTextNotes([])
      setStamps([])
      saveAnnotations([], [], [])
      gameAudio.playTap()
      toast.success('Page annotations cleared')
    }
  }

  // Download / Export merged page
  const handleDownloadPage = () => {
    if (!pdfCanvas || !canvasRef.current) return
    gameAudio.playTap()

    const merged = document.createElement('canvas')
    merged.width = pdfCanvas.width
    merged.height = pdfCanvas.height
    const ctx = merged.getContext('2d')
    if (!ctx) return

    // Draw PDF page first
    ctx.drawImage(pdfCanvas, 0, 0)
    // Draw user annotations over it
    ctx.drawImage(canvasRef.current, 0, 0)

    // Render stamps & texts
    textNotes.forEach((note) => {
      ctx.save()
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif'
      ctx.fillStyle = note.color || '#2563eb'
      const px = (note.x / 100) * merged.width
      const py = (note.y / 100) * merged.height
      ctx.fillText(note.text, px, py)
      ctx.restore()
    })

    const link = document.createElement('a')
    link.download = `${bookKey}_page_${pageNumber}_completed.png`
    link.href = merged.toDataURL('image/png')
    link.click()
    toast.success('Downloaded completed page image!')
  }

  const renderStampIcon = (key: string) => {
    const found = STAMP_OPTIONS.find((s) => s.key === key)
    if (!found) return <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
    const Icon = found.icon
    return <Icon className={`w-8 h-8 ${found.color} drop-shadow-md`} />
  }

  return (
    <div className="relative w-full h-full select-none">
      {/* Floating Interactive Toolbar Dock */}
      <div className="fixed sm:absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-2 bg-slate-900/90 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/20 transition-all">
        {/* Pointer / Hand */}
        <button
          onClick={() => setActiveTool('pointer')}
          title="Pointer / Navigate"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'pointer' ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <span className="text-sm font-bold px-1">👆 Pan</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-0.5" />

        {/* Pen */}
        <button
          onClick={() => {
            setActiveTool('pen')
            gameAudio.playTap()
          }}
          title="Drawing Pen"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'pen' ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Pen size={18} />
        </button>

        {/* Highlighter */}
        <button
          onClick={() => {
            setActiveTool('highlighter')
            gameAudio.playTap()
          }}
          title="Highlighter"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'highlighter' ? 'bg-amber-500 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Highlighter size={18} />
        </button>

        {/* Eraser */}
        <button
          onClick={() => {
            setActiveTool('eraser')
            gameAudio.playTap()
          }}
          title="Eraser"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'eraser' ? 'bg-rose-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Eraser size={18} />
        </button>

        {/* Text tool */}
        <button
          onClick={() => {
            setActiveTool('text')
            gameAudio.playTap()
          }}
          title="Type answers on page"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'text' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Type size={18} />
        </button>

        {/* Stamp tool */}
        <button
          onClick={() => {
            setActiveTool('stamp')
            setShowStampPicker(!showStampPicker)
            gameAudio.playTap()
          }}
          title="Star & Sticker Stamps"
          className={`p-2.5 rounded-xl transition-all flex items-center gap-1 ${
            activeTool === 'stamp' ? 'bg-amber-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Smile size={18} />
          <span className="text-xs font-bold uppercase">{activeStamp}</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-0.5" />

        {/* Palette / Color */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Choose Color"
            className="p-2 rounded-xl hover:bg-white/10 flex items-center gap-1.5"
          >
            <span
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm inline-block"
              style={{ backgroundColor: activeColor }}
            />
            <Palette size={16} className="text-slate-300" />
          </button>

          {showColorPicker && (
            <div className="absolute top-12 left-0 p-3 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col gap-2 z-40 min-w-[160px]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color</div>
              <div className="grid grid-cols-3 gap-2">
                {PALETTE_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      setActiveColor(c.hex)
                      setShowColorPicker(false)
                    }}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      activeColor === c.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">Thickness</div>
              <div className="flex gap-2">
                {[2, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveStrokeWidth(size)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                      activeStrokeWidth === size ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stamp Picker Popover */}
        {showStampPicker && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 p-3 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex items-center gap-2 z-40">
            {STAMP_OPTIONS.map((st) => {
              const Icon = st.icon
              return (
                <button
                  key={st.key}
                  onClick={() => {
                    setActiveStamp(st.key)
                    setShowStampPicker(false)
                    setActiveTool('stamp')
                  }}
                  title={st.label}
                  className={`p-2 rounded-xl transition-transform hover:scale-110 ${
                    activeStamp === st.key ? 'bg-white/20 border border-white/40' : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${st.color}`} />
                </button>
              )
            })}
          </div>
        )}

        <div className="w-px h-6 bg-white/20 mx-0.5" />

        {/* Undo */}
        <button
          onClick={handleUndo}
          title="Undo Last Action"
          className="p-2.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
          disabled={strokes.length === 0 && textNotes.length === 0 && stamps.length === 0}
        >
          <Undo2 size={18} />
        </button>

        {/* Clear */}
        <button
          onClick={handleClear}
          title="Clear Annotations"
          className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-30"
          disabled={strokes.length === 0 && textNotes.length === 0 && stamps.length === 0}
        >
          <Trash2 size={18} />
        </button>

        {/* Download Completed Page */}
        <button
          onClick={handleDownloadPage}
          title="Download Completed Activity Page"
          className="p-2.5 rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-all"
        >
          <Download size={18} />
        </button>
      </div>

      {/* HTML5 Transparent Drawing Canvas */}
      <canvas
        ref={canvasRef}
        width={pageWidth}
        height={pageHeight}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`absolute inset-0 z-10 touch-none ${
          activeTool === 'pointer'
            ? 'cursor-default pointer-events-none'
            : activeTool === 'pen'
            ? 'cursor-crosshair'
            : activeTool === 'highlighter'
            ? 'cursor-cell'
            : activeTool === 'text'
            ? 'cursor-text'
            : activeTool === 'stamp'
            ? 'cursor-pointer'
            : 'cursor-auto'
        }`}
      />

      {/* Interactive Stamp Badges Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            style={{ left: `${stamp.x}%`, top: `${stamp.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-bounce-once"
          >
            {renderStampIcon(stamp.iconKey)}
          </div>
        ))}
      </div>

      {/* Interactive Typed Notes Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {textNotes.map((note) => {
          const isEditing = editingTextId === note.id
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
                    placeholder="Type answer..."
                    onChange={(e) => {
                      const updated = textNotes.map((n) => (n.id === note.id ? { ...n, text: e.target.value } : n))
                      setTextNotes(updated)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEditingTextId(null)
                        saveAnnotations(strokes, textNotes, stamps)
                      }
                    }}
                    className="px-2 py-1 text-sm font-bold text-blue-900 outline-none w-44"
                  />
                  <button
                    onClick={() => {
                      setEditingTextId(null)
                      saveAnnotations(strokes, textNotes, stamps)
                    }}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setEditingTextId(note.id)}
                  className="px-2.5 py-1 bg-blue-50/90 backdrop-blur-xs border border-blue-300 rounded-lg shadow-sm text-sm font-bold text-blue-900 cursor-pointer hover:border-blue-500 transition-all hover:scale-105"
                  style={{ color: note.color }}
                >
                  {note.text || '(empty answer)'}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
