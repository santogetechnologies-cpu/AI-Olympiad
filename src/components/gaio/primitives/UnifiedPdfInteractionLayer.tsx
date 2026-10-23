// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED IN-PAGE PDF INTERACTION LAYER (CLASSES 3 TO 12 & UG)
// 100% In-PDF Interactive Engine:
// 1. Word Tap & Speak (bounce animation, phonetic spelling)
// 2. In-Line Typeable Worksheet Blanks (direct on dotted lines)
// 3. Click-to-Circle & Tick Choices (choices, checkboxes)
// 4. Tap-to-Count Objects (voice counting "One! Two! Three!")
// 5. Drawing & Highlighter Canvas (Pen, Highlighter, Eraser)
// 6. Moveable Elements & Images with Hand Tool (Stickers, EMIs, Custom Images)
// 7. Instant Flood Fill Tool with outline boundary awareness
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
  Sparkles,
  Zap,
  Trash2
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export type StudioTool =
  | 'pointer'
  | 'hand'
  | 'fill'
  | 'pen'
  | 'highlighter'
  | 'eraser'
  | 'text'
  | 'stamp'
  | 'circle'

export interface StrokePoint {
  x: number
  y: number
  nx?: number
  ny?: number
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
  emoji?: string // Direct emoji character e.g. 🤖, ⭐
  url?: string // custom image URL or EMI data URI
  label?: string
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
  pdfCanvas?: HTMLCanvasElement | null
  selectedEmoji?: string
  undoSignal?: number
  clearSignal?: number
  onAddStar?: (count?: number) => void
  onWordClick?: (word: PageWordItem) => void
  onWordSpell?: (word: PageWordItem) => void
}

export const STAMP_ICONS: { [key: string]: { icon: any; color: string; label: string } } = {
  star: { icon: Star, color: 'text-amber-500 fill-amber-400', label: 'Star' },
  robot: { icon: Bot, color: 'text-blue-500 fill-blue-100', label: 'AI Robot' },
  trophy: { icon: Trophy, color: 'text-yellow-500 fill-yellow-200', label: 'Trophy' },
  target: { icon: Target, color: 'text-rose-500', label: 'Target' },
  heart: { icon: Heart, color: 'text-pink-500 fill-pink-400', label: 'Heart' },
  check: { icon: Check, color: 'text-emerald-500', label: 'Check' },
  sparkle: { icon: Sparkles, color: 'text-purple-400 fill-purple-300', label: 'Sparkle' },
  zap: { icon: Zap, color: 'text-amber-400 fill-amber-300', label: 'Energy' }
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
  pdfCanvas,
  selectedEmoji = '⭐',
  undoSignal,
  clearSignal,
  onAddStar,
  onWordClick,
  onWordSpell
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const colorFillCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  // Synchronous refs to prevent race conditions when writing/drawing quickly
  const strokesRef = useRef<DrawingStroke[]>(strokes)
  strokesRef.current = strokes

  const stickersRef = useRef<PlacedSticker[]>(stickers)
  stickersRef.current = stickers

  const typedNotesRef = useRef<TypedNote[]>(typedNotes)
  typedNotesRef.current = typedNotes

  const typedBlanksRef = useRef<{ [id: string]: string }>(typedBlanks)
  typedBlanksRef.current = typedBlanks

  const circledItemsRef = useRef<{ [id: string]: boolean }>(circledItems)
  circledItemsRef.current = circledItems

  // Fill tool history stack
  const [fillHistory, setFillHistory] = useState<ImageData[]>([])

  // Moving items with Hand Tool state
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null)
  const dragStartRef = useRef<{
    id: string
    kind: 'sticker' | 'note' | 'image'
    startPointerX: number
    startPointerY: number
    initX: number
    initY: number
  } | null>(null)

  // Moveable authentic book figures extracted from PDF
  const [imageOffsets, setImageOffsets] = useState<{ [id: string]: { x: number; y: number } }>({})

  // Action history stack for robust Undo (stars, color fills, strokes, notes)
  const [historyStack, setHistoryStack] = useState<
    Array<{ type: 'fill' } | { type: 'sticker'; id: string } | { type: 'stroke' } | { type: 'note'; id: string }>
  >([])

  // Tap-to-count counter state
  const [countNumber, setCountNumber] = useState<number>(0)
  const [bouncingWordId, setBouncingWordId] = useState<string | null>(null)

  const storageKey = `gaio_page_state_${bookKey}_p${pageNumber}`
  const imageOffsetsKey = `gaio_dragged_images_${bookKey}_p${pageNumber}`
  const fillStorageKey = `gaio_fill_${bookKey}_p${pageNumber}`

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

    // Load moved book image offsets
    try {
      const savedImgs = localStorage.getItem(imageOffsetsKey)
      if (savedImgs) {
        setImageOffsets(JSON.parse(savedImgs))
      } else {
        setImageOffsets({})
      }
    } catch {
      setImageOffsets({})
    }

    setCountNumber(0)
  }, [storageKey, imageOffsetsKey])

  // Load fill layer for this page
  useEffect(() => {
    const canvas = colorFillCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    canvas.width = Math.floor(pageWidth)
    canvas.height = Math.floor(pageHeight)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFillHistory([])

    try {
      const dataUrl = localStorage.getItem(fillStorageKey)
      if (dataUrl) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
        }
        img.src = dataUrl
      }
    } catch {}
  }, [fillStorageKey, pageWidth, pageHeight])

  // Save drawing state
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

  const saveFillCanvas = useCallback(() => {
    const canvas = colorFillCanvasRef.current
    if (!canvas) return
    try {
      localStorage.setItem(fillStorageKey, canvas.toDataURL('image/png'))
    } catch {}
  }, [fillStorageKey])

  // Redraw canvas with high DPR and normalized coordinates
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

    const list = strokesRef.current.length > 0 ? strokesRef.current : strokes
    list.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return
      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (stroke.tool === 'highlighter') {
        ctx.strokeStyle = stroke.color
        ctx.fillStyle = stroke.color
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
        ctx.fillStyle = stroke.color
        ctx.lineWidth = stroke.width
        ctx.globalAlpha = 1.0
      }

      const p0 = stroke.points[0]
      const x0 = p0.nx !== undefined ? p0.nx * pageWidth : p0.x
      const y0 = p0.ny !== undefined ? p0.ny * pageHeight : p0.y

      if (stroke.points.length === 1) {
        ctx.beginPath()
        const r = stroke.tool === 'highlighter' ? stroke.width * 1.75 : stroke.width / 2
        ctx.arc(x0, y0, Math.max(1, r), 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        for (let i = 1; i < stroke.points.length; i++) {
          const pt = stroke.points[i]
          const px = pt.nx !== undefined ? pt.nx * pageWidth : pt.x
          const py = pt.ny !== undefined ? pt.ny * pageHeight : pt.y
          ctx.lineTo(px, py)
        }
        ctx.stroke()
      }

      ctx.restore()
    })
  }, [strokes, pageWidth, pageHeight])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  // Coordinate helper with normalized positions
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0, nx: 0, ny: 0 }
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width > 0 ? rect.width : pageWidth
    const h = rect.height > 0 ? rect.height : pageHeight
    return {
      x,
      y,
      nx: x / w,
      ny: y / h
    }
  }

  // ── Drag & Move Logic for Hand Tool & Emojis & Extracted Figures ───────────
  const handleStartItemDrag = (
    e: React.PointerEvent,
    id: string,
    kind: 'sticker' | 'note' | 'image',
    currentX: number,
    currentY: number
  ) => {
    // Only block if currently drawing with pen/highlighter/eraser
    if (['pen', 'highlighter', 'eraser', 'fill'].includes(activeTool)) return
    e.stopPropagation()
    e.preventDefault()
    setDraggingItemId(id)
    dragStartRef.current = {
      id,
      kind,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      initX: currentX,
      initY: currentY
    }
  }

  const handleResetImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setImageOffsets((prev) => {
      const next = { ...prev }
      delete next[id]
      try {
        localStorage.setItem(imageOffsetsKey, JSON.stringify(next))
      } catch {}
      return next
    })
    toast.success('Figure returned to original spot! ↺')
  }

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const deltaX = ((e.clientX - dragStartRef.current.startPointerX) / rect.width) * 100
      const deltaY = ((e.clientY - dragStartRef.current.startPointerY) / rect.height) * 100

      if (dragStartRef.current.kind === 'sticker') {
        const newX = Math.max(2, Math.min(98, parseFloat((dragStartRef.current.initX + deltaX).toFixed(1))))
        const newY = Math.max(2, Math.min(98, parseFloat((dragStartRef.current.initY + deltaY).toFixed(1))))
        setStickers((prev) =>
          prev.map((s) => (s.id === dragStartRef.current!.id ? { ...s, x: newX, y: newY } : s))
        )
      } else if (dragStartRef.current.kind === 'note') {
        const newX = Math.max(2, Math.min(98, parseFloat((dragStartRef.current.initX + deltaX).toFixed(1))))
        const newY = Math.max(2, Math.min(98, parseFloat((dragStartRef.current.initY + deltaY).toFixed(1))))
        setTypedNotes((prev) =>
          prev.map((n) => (n.id === dragStartRef.current!.id ? { ...n, x: newX, y: newY } : n))
        )
      } else if (dragStartRef.current.kind === 'image') {
        const deltaPxX = e.clientX - dragStartRef.current.startPointerX
        const deltaPxY = e.clientY - dragStartRef.current.startPointerY
        const nextX = parseFloat((dragStartRef.current.initX + deltaPxX).toFixed(1))
        const nextY = parseFloat((dragStartRef.current.initY + deltaPxY).toFixed(1))
        setImageOffsets((prev) => ({
          ...prev,
          [dragStartRef.current!.id]: { x: nextX, y: nextY }
        }))
      }
    }

    const handleGlobalPointerUp = () => {
      if (dragStartRef.current) {
        const finishedKind = dragStartRef.current.kind
        dragStartRef.current = null
        setDraggingItemId(null)
        if (finishedKind === 'image') {
          setImageOffsets((latest) => {
            try {
              localStorage.setItem(imageOffsetsKey, JSON.stringify(latest))
            } catch {}
            return latest
          })
          toast.success('Figure moved! ✨', { id: 'img-moved' })
        } else {
          persistState(strokes, stickers, typedNotes, typedBlanks, circledItems)
        }
        gameAudio.playTap()
      }
    }

    window.addEventListener('pointermove', handleGlobalPointerMove)
    window.addEventListener('pointerup', handleGlobalPointerUp)
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove)
      window.removeEventListener('pointerup', handleGlobalPointerUp)
    }
  }, [strokes, stickers, typedNotes, typedBlanks, circledItems, imageOffsetsKey, persistState])

  // ── Color Fill Tool (Smart boundary-aware Flood Fill with PDF high-DPI scaling) ─────
  const handleColorFillClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'fill') return

    const canvas = colorFillCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    let startX = Math.floor((e.clientX - rect.left) * scaleX)
    let startY = Math.floor((e.clientY - rect.top) * scaleY)

    if (startX < 0 || startX >= canvas.width || startY < 0 || startY >= canvas.height) return

    // Save previous snapshot for Undo
    const prevData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setFillHistory((prev) => [...prev.slice(-8), prevData])
    setHistoryStack((prev) => [...prev.slice(-20), { type: 'fill' }])

    // Convert activeColor to RGBA
    let hex = activeColor.replace('#', '')
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
    const r = parseInt(hex.slice(0, 2), 16) || 0
    const g = parseInt(hex.slice(2, 4), 16) || 0
    const b = parseInt(hex.slice(4, 6), 16) || 0
    const a = 230

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imgData.data

    // Sample PDF canvas pixels if available
    let pdfData: Uint8ClampedArray | null = null
    let pdfW = canvas.width
    let pdfH = canvas.height
    if (pdfCanvas) {
      try {
        const pCtx = pdfCanvas.getContext('2d', { willReadFrequently: true })
        if (pCtx) {
          pdfW = pdfCanvas.width
          pdfH = pdfCanvas.height
          pdfData = pCtx.getImageData(0, 0, pdfW, pdfH).data
        }
      } catch {}
    }
    const scaleToPdfX = pdfW / canvas.width
    const scaleToPdfY = pdfH / canvas.height

    // Sample user-drawn strokes canvas as well
    let drawData: Uint8ClampedArray | null = null
    let drawW = canvas.width
    let drawH = canvas.height
    if (canvasRef.current) {
      try {
        const dCtx = canvasRef.current.getContext('2d', { willReadFrequently: true })
        if (dCtx) {
          drawW = canvasRef.current.width
          drawH = canvasRef.current.height
          drawData = dCtx.getImageData(0, 0, drawW, drawH).data
        }
      } catch {}
    }
    const scaleToDrawX = drawW / canvas.width
    const scaleToDrawY = drawH / canvas.height

    const isBoundaryPixel = (x: number, y: number): boolean => {
      // 1. PDF outline/boundary check (luminance)
      if (pdfData) {
        const px = Math.min(pdfW - 1, Math.max(0, Math.floor(x * scaleToPdfX)))
        const py = Math.min(pdfH - 1, Math.max(0, Math.floor(y * scaleToPdfY)))
        const pIdx = (py * pdfW + px) * 4
        const pr = pdfData[pIdx]
        const pg = pdfData[pIdx + 1]
        const pb = pdfData[pIdx + 2]
        const lum = 0.299 * pr + 0.587 * pg + 0.114 * pb
        if (lum < 115) return true
      }
      // 2. User drawing strokes check
      if (drawData) {
        const dx = Math.min(drawW - 1, Math.max(0, Math.floor(x * scaleToDrawX)))
        const dy = Math.min(drawH - 1, Math.max(0, Math.floor(y * scaleToDrawY)))
        const dIdx = (dy * drawW + dx) * 4
        if (drawData[dIdx + 3] > 80) return true
      }
      return false
    }

    // If user clicked directly on a boundary line, look around in a 6px radius for open fillable area
    if (isBoundaryPixel(startX, startY)) {
      let foundOpen = false
      for (let rad = 1; rad <= 6 && !foundOpen; rad++) {
        for (let dy = -rad; dy <= rad && !foundOpen; dy++) {
          for (let dx = -rad; dx <= rad && !foundOpen; dx++) {
            const tx = startX + dx
            const ty = startY + dy
            if (tx >= 0 && tx < canvas.width && ty >= 0 && ty < canvas.height) {
              if (!isBoundaryPixel(tx, ty)) {
                startX = tx
                startY = ty
                foundOpen = true
              }
            }
          }
        }
      }
      if (!foundOpen) {
        toast('Tap inside the shape to color it! 🎨', { icon: '💡' })
        return
      }
    }

    // Check if clicked pixel already has the target color
    const clickPos = (startY * canvas.width + startX) * 4
    if (
      Math.abs(data[clickPos] - r) < 5 &&
      Math.abs(data[clickPos + 1] - g) < 5 &&
      Math.abs(data[clickPos + 2] - b) < 5 &&
      Math.abs(data[clickPos + 3] - a) < 10
    ) {
      return
    }

    // High performance typed queue for flood fill
    const w = canvas.width
    const h = canvas.height
    const visited = new Uint8Array(w * h)
    const queue = new Int32Array(w * h)
    let head = 0
    let tail = 0

    const initialPos = startY * w + startX
    visited[initialPos] = 1
    queue[tail++] = initialPos

    let fillCount = 0
    const maxPixels = 650000

    while (head < tail && fillCount < maxPixels) {
      const pos = queue[head++]
      const cx = pos % w
      const cy = Math.floor(pos / w)
      const idx = pos * 4

      data[idx] = r
      data[idx + 1] = g
      data[idx + 2] = b
      data[idx + 3] = a
      fillCount++

      // 4-way neighbors
      if (cx + 1 < w) {
        const npos = pos + 1
        if (!visited[npos]) {
          visited[npos] = 1
          if (!isBoundaryPixel(cx + 1, cy)) queue[tail++] = npos
        }
      }
      if (cx - 1 >= 0) {
        const npos = pos - 1
        if (!visited[npos]) {
          visited[npos] = 1
          if (!isBoundaryPixel(cx - 1, cy)) queue[tail++] = npos
        }
      }
      if (cy + 1 < h) {
        const npos = pos + w
        if (!visited[npos]) {
          visited[npos] = 1
          if (!isBoundaryPixel(cx, cy + 1)) queue[tail++] = npos
        }
      }
      if (cy - 1 >= 0) {
        const npos = pos - w
        if (!visited[npos]) {
          visited[npos] = 1
          if (!isBoundaryPixel(cx, cy - 1)) queue[tail++] = npos
        }
      }
    }

    ctx.putImageData(imgData, 0, 0)
    saveFillCanvas()
    gameAudio.playCoin()

    if (fillCount > 50) {
      onAddStar?.(1)
      confetti({
        particleCount: 24,
        spread: 45,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      })
      toast.success('Color filled! 🎨 ⭐')
    }
  }

  // ── File upload for custom EMI / image placement ────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string
      if (!dataUrl) return

      const newSticker: PlacedSticker = {
        id: `img_${Date.now()}`,
        x: 45,
        y: 45,
        type: 'custom_image',
        url: dataUrl,
        label: file.name
      }
      const updated = [...stickers, newSticker]
      setStickers(updated)
      persistState(strokes, updated, typedNotes, typedBlanks, circledItems)
      gameAudio.playCoin()
      onAddStar?.(1)
      toast.success('Image placed! Use Hand Tool ✋ to move it anywhere.')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ── Pointer event handlers for drawing / stamping / text ───────────────────
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'pointer' || activeTool === 'hand' || activeTool === 'fill') return

    // 1. STAMP / STAR RATING TOOL
    if (activeTool === 'stamp') {
      const rect = e.currentTarget.getBoundingClientRect()
      const pctX = ((e.clientX - rect.left) / rect.width) * 100
      const pctY = ((e.clientY - rect.top) / rect.height) * 100

      const isStar = (selectedEmoji === '⭐' || selectedEmoji === '🌟')
      const newSticker: PlacedSticker = {
        id: `st_${Date.now()}`,
        x: pctX,
        y: pctY,
        type: 'emoji',
        emoji: selectedEmoji || '⭐'
      }
      const updated = [...stickersRef.current, newSticker]
      setStickers(updated)
      stickersRef.current = updated
      setHistoryStack((prev) => [...prev.slice(-20), { type: 'sticker', id: newSticker.id }])
      persistState(strokesRef.current, updated, typedNotesRef.current, typedBlanksRef.current, circledItemsRef.current)
      gameAudio.playCoin()
      onAddStar?.(1)
      confetti({
        particleCount: isStar ? 32 : 20,
        spread: 55,
        colors: isStar ? ['#f59e0b', '#fbbf24', '#fde047', '#ffffff'] : undefined,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      })
      if (isStar) {
        toast.success('⭐ Star rated! You rated this lesson! (Drag with Hand tool ✋ to position)', { id: 'star-rated' })
      } else {
        toast.success(`${selectedEmoji} placed! Drag it anywhere on the page! ✨`)
      }
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
      const updated = [...typedNotesRef.current, newNote]
      setTypedNotes(updated)
      typedNotesRef.current = updated
      setHistoryStack((prev) => [...prev.slice(-20), { type: 'note', id: newId }])
      setEditingNoteId(newId)
      persistState(strokesRef.current, stickersRef.current, updated, typedBlanksRef.current, circledItemsRef.current)
      gameAudio.playTap()
      return
    }

    // 3. FREEHAND DRAWING & ERASING (Pen, Highlighter, Eraser)
    isDrawingRef.current = true
    const pt = getCanvasCoords(e)
    currentStrokeRef.current = [pt]
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    if (activeTool === 'eraser') {
      const eraseRadius = Math.max(16, strokeWidth * 5)

      // A. Erase strokes on canvasRef
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, eraseRadius, 0, Math.PI * 2)
          ctx.globalCompositeOperation = 'destination-out'
          ctx.fill()
          ctx.restore()
        }
      }

      // B. Erase / Flood-erase on colorFillCanvasRef
      const fillCanvas = colorFillCanvasRef.current
      if (fillCanvas) {
        const fCtx = fillCanvas.getContext('2d', { willReadFrequently: true })
        if (fCtx) {
          const nx = pt.nx !== undefined ? pt.nx : (fillCanvas.width > 0 ? pt.x / fillCanvas.width : 0)
          const ny = pt.ny !== undefined ? pt.ny : (fillCanvas.height > 0 ? pt.y / fillCanvas.height : 0)
          const fx = Math.floor(nx * fillCanvas.width)
          const fy = Math.floor(ny * fillCanvas.height)

          if (fx >= 0 && fx < fillCanvas.width && fy >= 0 && fy < fillCanvas.height) {
            const imgData = fCtx.getImageData(0, 0, fillCanvas.width, fillCanvas.height)
            const d = imgData.data
            const startIdx = (fy * fillCanvas.width + fx) * 4

            // If tapped directly on a filled color area (alpha > 40), flood-erase the entire filled shape!
            if (d[startIdx + 3] > 40) {
              const w = fillCanvas.width
              const h = fillCanvas.height
              const targetR = d[startIdx]
              const targetG = d[startIdx + 1]
              const targetB = d[startIdx + 2]
              const queue = new Int32Array(w * h)
              const visited = new Uint8Array(w * h)
              let head = 0
              let tail = 0
              const startPos = fy * w + fx
              queue[tail++] = startPos
              visited[startPos] = 1

              while (head < tail) {
                const pos = queue[head++]
                const cx = pos % w
                const cy = Math.floor(pos / w)
                const pIdx = pos * 4
                d[pIdx + 3] = 0 // Clear alpha completely

                const neighbors = [
                  cx + 1 < w ? pos + 1 : -1,
                  cx - 1 >= 0 ? pos - 1 : -1,
                  cy + 1 < h ? pos + w : -1,
                  cy - 1 >= 0 ? pos - w : -1
                ]

                for (let k = 0; k < 4; k++) {
                  const npos = neighbors[k]
                  if (npos >= 0 && !visited[npos]) {
                    visited[npos] = 1
                    const nIdx = npos * 4
                    if (d[nIdx + 3] > 30) {
                      const diff = Math.abs(d[nIdx] - targetR) + Math.abs(d[nIdx + 1] - targetG) + Math.abs(d[nIdx + 2] - targetB)
                      if (diff < 120) {
                        queue[tail++] = npos
                      }
                    }
                  }
                }
              }

              fCtx.putImageData(imgData, 0, 0)
              saveFillCanvas()
              gameAudio.playTap()
              toast.success('Color fill erased! 🧼', { id: 'erase-fill' })
              return
            } else {
              // Tap on un-filled area: erase circular patch on fillCanvas
              fCtx.save()
              fCtx.beginPath()
              fCtx.arc(fx, fy, eraseRadius * (fillCanvas.width / pageWidth), 0, Math.PI * 2)
              fCtx.globalCompositeOperation = 'destination-out'
              fCtx.fill()
              fCtx.restore()
            }
          }
        }
      }
      return
    }

    // Immediate visual stroke dot feedback for pen / highlighter
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.save()
        ctx.beginPath()
        const r = activeTool === 'highlighter' ? strokeWidth * 1.75 : strokeWidth / 2
        ctx.arc(pt.x, pt.y, Math.max(1, r), 0, Math.PI * 2)
        ctx.fillStyle = activeColor
        if (activeTool === 'highlighter') ctx.globalAlpha = 0.35
        ctx.fill()
        ctx.restore()
      }
    }
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

    if (activeTool === 'eraser') {
      const eraseWidth = Math.max(32, strokeWidth * 8)

      // 1. Erase strokes on canvasRef
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y)
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = eraseWidth
      ctx.globalCompositeOperation = 'destination-out'
      ctx.stroke()
      ctx.restore()

      // 2. Erase color fill on colorFillCanvasRef
      const fillCanvas = colorFillCanvasRef.current
      if (fillCanvas) {
        const fCtx = fillCanvas.getContext('2d')
        if (fCtx) {
          const fx1 = (pts[pts.length - 2].nx ?? (pts[pts.length - 2].x / pageWidth)) * fillCanvas.width
          const fy1 = (pts[pts.length - 2].ny ?? (pts[pts.length - 2].y / pageHeight)) * fillCanvas.height
          const fx2 = (pts[pts.length - 1].nx ?? (pts[pts.length - 1].x / pageWidth)) * fillCanvas.width
          const fy2 = (pts[pts.length - 1].ny ?? (pts[pts.length - 1].y / pageHeight)) * fillCanvas.height

          fCtx.save()
          fCtx.beginPath()
          fCtx.moveTo(fx1, fy1)
          fCtx.lineTo(fx2, fy2)
          fCtx.lineCap = 'round'
          fCtx.lineJoin = 'round'
          fCtx.lineWidth = eraseWidth * (fillCanvas.width / pageWidth)
          fCtx.globalCompositeOperation = 'destination-out'
          fCtx.stroke()
          fCtx.restore()
        }
      }
      return
    }

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

    if (activeTool === 'eraser') {
      saveFillCanvas()
    }

    const pts = currentStrokeRef.current
    if (pts.length > 0) {
      const finalPoints = pts.length === 1
        ? [pts[0], { x: pts[0].x + 0.5, y: pts[0].y + 0.5, nx: pts[0].nx, ny: pts[0].ny }]
        : [...pts]

      const newStroke: DrawingStroke = {
        tool: activeTool as any,
        color: activeColor,
        width: strokeWidth,
        points: finalPoints
      }
      setStrokes((prev) => {
        const updated = [...prev, newStroke]
        strokesRef.current = updated
        persistState(updated, stickersRef.current, typedNotesRef.current, typedBlanksRef.current, circledItemsRef.current)
        return updated
      })
      setHistoryStack((prev) => [...prev.slice(-20), { type: 'stroke' }])
    }
    currentStrokeRef.current = []
  }

  // ── Unified Undo Handler (Reverts stars, color fill, or drawing) ───────────
  const handleUndo = useCallback(() => {
    if (historyStack.length === 0) {
      // Fallback: check if any stickers, strokes, or fill exist
      if (stickers.length > 0) {
        const next = stickers.slice(0, -1)
        setStickers(next)
        stickersRef.current = next
        persistState(strokes, next, typedNotes, typedBlanks, circledItems)
        onAddStar?.(-1)
        gameAudio.playTap()
        toast.success('Removed last star / sticker! ↺', { id: 'undo-sticker' })
        return
      }
      if (colorFillCanvasRef.current && (fillHistory.length > 0 || localStorage.getItem(fillStorageKey))) {
        const prevData = fillHistory.length > 0 ? fillHistory[fillHistory.length - 1] : null
        const ctx = colorFillCanvasRef.current.getContext('2d')
        if (ctx) {
          if (prevData) {
            ctx.putImageData(prevData, 0, 0)
            setFillHistory((h) => h.slice(0, -1))
            try {
              localStorage.setItem(fillStorageKey, colorFillCanvasRef.current.toDataURL())
            } catch {}
          } else {
            ctx.clearRect(0, 0, colorFillCanvasRef.current.width, colorFillCanvasRef.current.height)
            setFillHistory([])
            try {
              localStorage.removeItem(fillStorageKey)
            } catch {}
          }
          gameAudio.playTap()
          toast.success('Undid color fill! ↺', { id: 'undo-fill' })
          return
        }
      }
      if (strokes.length > 0) {
        const next = strokes.slice(0, -1)
        setStrokes(next)
        strokesRef.current = next
        persistState(next, stickers, typedNotes, typedBlanks, circledItems)
        gameAudio.playTap()
        toast.success('Undid last drawing! ↺', { id: 'undo-stroke' })
        return
      }
      toast('Nothing to undo on this page!', { id: 'undo-empty', icon: 'ℹ️' })
      return
    }

    const last = historyStack[historyStack.length - 1]
    setHistoryStack((prev) => prev.slice(0, -1))

    if (last.type === 'sticker') {
      const next = stickers.filter((s) => s.id !== last.id)
      setStickers(next)
      stickersRef.current = next
      persistState(strokes, next, typedNotes, typedBlanks, circledItems)
      onAddStar?.(-1)
      gameAudio.playTap()
      toast.success('Undid star / sticker! ↺', { id: 'undo-act' })
    } else if (last.type === 'fill') {
      if (colorFillCanvasRef.current) {
        const prevData = fillHistory[fillHistory.length - 1]
        const ctx = colorFillCanvasRef.current.getContext('2d')
        if (ctx) {
          if (prevData) {
            ctx.putImageData(prevData, 0, 0)
            setFillHistory((h) => h.slice(0, -1))
          } else {
            ctx.clearRect(0, 0, colorFillCanvasRef.current.width, colorFillCanvasRef.current.height)
            setFillHistory([])
          }
          try {
            localStorage.setItem(fillStorageKey, colorFillCanvasRef.current.toDataURL())
          } catch {}
        }
      }
      gameAudio.playTap()
      toast.success('Undid color fill! ↺', { id: 'undo-act' })
    } else if (last.type === 'stroke') {
      const next = strokes.slice(0, -1)
      setStrokes(next)
      strokesRef.current = next
      persistState(next, stickers, typedNotes, typedBlanks, circledItems)
      gameAudio.playTap()
      toast.success('Undid drawing mark! ↺', { id: 'undo-act' })
    } else if (last.type === 'note') {
      const next = typedNotes.filter((n) => n.id !== last.id)
      setTypedNotes(next)
      typedNotesRef.current = next
      persistState(strokes, stickers, next, typedBlanks, circledItems)
      gameAudio.playTap()
      toast.success('Undid note! ↺', { id: 'undo-act' })
    }
  }, [historyStack, stickers, fillHistory, strokes, typedNotes, typedBlanks, circledItems, fillStorageKey, persistState])

  // Trigger undo on undoSignal change
  const lastUndoRef = useRef<number>(0)
  useEffect(() => {
    if (undoSignal && undoSignal !== lastUndoRef.current) {
      lastUndoRef.current = undoSignal
      handleUndo()
    }
  }, [undoSignal, handleUndo])

  // ── Clear entire page markings & color fills ──────────────────────────────
  const handleClearPage = useCallback(() => {
    // 1. Clear strokes
    setStrokes([])
    strokesRef.current = []

    // 2. Clear color fill canvas
    if (colorFillCanvasRef.current) {
      const ctx = colorFillCanvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, colorFillCanvasRef.current.width, colorFillCanvasRef.current.height)
      }
    }
    setFillHistory([])
    try {
      localStorage.removeItem(fillStorageKey)
    } catch {}

    // 3. Clear drawing canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }

    // 4. Save state
    persistState([], stickersRef.current, typedNotesRef.current, typedBlanksRef.current, circledItemsRef.current)
    setHistoryStack([])
    gameAudio.playTap()
    toast.success('Page markings & colors cleared! 🧼', { id: 'clear-page' })
  }, [fillStorageKey, persistState])

  const lastClearRef = useRef<number>(0)
  useEffect(() => {
    if (clearSignal && clearSignal !== lastClearRef.current) {
      lastClearRef.current = clearSignal
      handleClearPage()
    }
  }, [clearSignal, handleClearPage])

  // Global Ctrl+Z / Cmd+Z keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
        e.preventDefault()
        handleUndo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo])

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

  // 5. IN-LINE TYPED BLANKS (Preserved for backwards compatibility with saved blanks)
  const _handleBlankChange = (id: string, text: string) => {
    const updated = { ...typedBlanks, [id]: text }
    setTypedBlanks(updated)
    persistState(strokes, stickers, typedNotes, updated, circledItems)
  }
  void _handleBlankChange


  // 6. CIRCLE / CHOOSE ITEM TOGGLE
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

  // Delete placed item
  const handleDeleteSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = stickers.filter((s) => s.id !== id)
    setStickers(updated)
    persistState(strokes, updated, typedNotes, typedBlanks, circledItems)
    gameAudio.playTap()
  }

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = typedNotes.filter((n) => n.id !== id)
    setTypedNotes(updated)
    persistState(strokes, stickers, updated, typedBlanks, circledItems)
    gameAudio.playTap()
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none overflow-hidden ${
        activeTool === 'hand' ? (draggingItemId ? 'cursor-grabbing' : 'cursor-grab') : ''
      }`}
      style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
    >
      {/* Hidden file input for custom EMI / image placement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* ── LAYER A0: Color Flood Fill Layer ──────────────────────────────── */}
      <canvas
        ref={colorFillCanvasRef}
        onClick={handleColorFillClick}
        style={{ mixBlendMode: 'multiply' }}
        className={`absolute inset-0 z-10 ${
          activeTool === 'fill' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      {/* ── LAYER A: High-DPR Drawing Canvas (Pen, Highlighter, Eraser) ───── */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={(e) => {
          if (isDrawingRef.current) handlePointerUp(e)
        }}
        className={`absolute inset-0 z-20 touch-none ${
          ['pointer', 'hand', 'fill'].includes(activeTool)
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

      {/* ── LAYER D: Extracted Moveable Figures from Stripped PDF ───────── */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          activeTool === 'hand' || activeTool === 'pointer' ? 'z-30' : 'z-20'
        }`}
      >
        {(regions || [])
          .filter((r) => r.type === 'draggable' && r.imageSrc && r.bbox)
          .map((reg) => {
            const [bx, by, bw, bh] = reg.bbox!
            const offset = imageOffsets[reg.id] || { x: 0, y: 0 }
            const sx = bx * scale + offset.x
            const sy = by * scale + offset.y
            const sw = bw * scale
            const sh = bh * scale
            const isDragging = draggingItemId === reg.id
            const isMoved = Math.abs(offset.x) > 2 || Math.abs(offset.y) > 2

            return (
              <div
                key={reg.id}
                onPointerDown={(e) =>
                  handleStartItemDrag(e, reg.id, 'image', offset.x, offset.y)
                }
                onDoubleClick={(e) => handleResetImage(reg.id, e)}
                style={{
                  left: `${sx}px`,
                  top: `${sy}px`,
                  width: `${sw}px`,
                  height: `${sh}px`
                }}
                title={
                  activeTool === 'hand' || activeTool === 'pointer'
                    ? 'Drag to move this figure anywhere! Double-click or click ↺ to reset.'
                    : 'Switch to Hand tool to drag'
                }
                className={`absolute pointer-events-auto touch-none select-none group ${
                  activeTool === 'hand' || activeTool === 'pointer'
                    ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded-lg'
                    : 'cursor-default'
                } ${
                  isDragging
                    ? 'scale-105 z-50 opacity-95 ring-4 ring-amber-400 shadow-2xl drop-shadow-2xl'
                    : isMoved
                    ? 'ring-2 ring-emerald-500/80 shadow-md'
                    : ''
                }`}
              >
                <img
                  src={reg.imageSrc}
                  alt={reg.label || 'Book Diagram'}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                  draggable={false}
                />

                {/* Reset badge on hover if moved */}
                {isMoved && (
                  <button
                    type="button"
                    onClick={(e) => handleResetImage(reg.id, e)}
                    title="Reset to original spot"
                    className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-slate-900/90 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-rose-600 shadow-md ring-1 ring-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ↺
                  </button>
                )}
              </div>
            )
          })}
      </div>

      {/* ── LAYER B: Placed Stickers, EMIs & Images (Moveable with Hand Tool) ─ */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          activeTool === 'hand' ? 'z-40' : 'z-25'
        }`}
      >
        {stickers.map((st) => {
          const isDragging = draggingItemId === st.id
          const isCustomImage = st.type === 'custom_image' && st.url
          const conf = STAMP_ICONS[st.type] || STAMP_ICONS.star
          const Icon = conf.icon

          return (
            <div
              key={st.id}
              onPointerDown={(e) => handleStartItemDrag(e, st.id, 'sticker', st.x, st.y)}
              style={{ left: `${st.x}%`, top: `${st.y}%` }}
              title={activeTool === 'hand' ? "Drag to move anywhere" : "Switch to Move tool to drag"}
              className={`absolute -translate-x-1/2 -translate-y-1/2 drop-shadow-xl pointer-events-auto group touch-none select-none ${
                activeTool === 'hand'
                  ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-500 rounded-xl p-1 bg-white/20 backdrop-blur-xs'
                  : 'cursor-pointer hover:ring-1 hover:ring-blue-400/50 rounded-xl p-1'
              } ${
                isDragging ? 'scale-125 z-50 opacity-95 ring-4 ring-amber-400' : 'transition-transform duration-100'
              }`}
            >
              {st.emoji ? (
                <span className="text-4xl select-none leading-none drop-shadow-md pointer-events-none">
                  {st.emoji}
                </span>
              ) : isCustomImage ? (
                <img
                  src={st.url}
                  alt={st.label || 'EMI Image'}
                  className="w-16 h-16 object-contain rounded-lg border-2 border-white/80 shadow-md bg-white/40 backdrop-blur-xs pointer-events-none"
                />
              ) : (
                <Icon className={`w-8 h-8 ${conf.color} pointer-events-none`} />
              )}

              {/* Hand Tool delete badge on hover */}
              {activeTool === 'hand' && (
                <button
                  type="button"
                  onClick={(e) => handleDeleteSticker(st.id, e)}
                  title="Remove Item"
                  className="absolute -top-2 -right-2 w-5 h-5 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
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

          // Note: Pre-filled 'typeable' boxes are disabled per user request since students can use the freeform Text tool (T) or Pen tool.


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

      {/* ── LAYER E: Freeform Typed Notes on Page (Moveable with Hand Tool) ─ */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          activeTool === 'hand' ? 'z-40' : 'z-35'
        }`}
      >
        {typedNotes.map((note) => {
          const isEditing = editingNoteId === note.id
          const isDragging = draggingItemId === note.id

          return (
            <div
              key={note.id}
              onPointerDown={(e) => handleStartItemDrag(e, note.id, 'note', note.x, note.y)}
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
              className={`absolute -translate-x-1 sm:-translate-x-2 -translate-y-2 sm:-translate-y-4 pointer-events-auto group ${
                activeTool === 'hand'
                  ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-500 rounded-lg'
                  : ''
              } ${isDragging ? 'scale-110 opacity-90' : ''}`}
            >
              {isEditing ? (
                <div className="flex items-center gap-0.5 sm:gap-1 bg-white p-0.5 sm:p-1 rounded-md sm:rounded-lg shadow-xl border border-blue-500 sm:border-2">
                  <input
                    type="text"
                    autoFocus
                    value={note.text}
                    placeholder="Type..."
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
                    style={{
                      fontSize: `${Math.max(10, Math.min(15, Math.round(13 * Math.max(0.65, scale))))}px`,
                      width: `${Math.max(84, Math.min(176, Math.round(150 * Math.max(0.6, scale))))}px`
                    }}
                    className="px-1 sm:px-2 py-0.5 sm:py-1 font-bold text-blue-900 outline-none"
                  />
                  <button
                    onClick={() => {
                      setEditingNoteId(null)
                      persistState(strokes, stickers, typedNotes, typedBlanks, circledItems)
                    }}
                    className="p-1 sm:p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 shrink-0"
                    title="Done"
                  >
                    <Check size={12} className="sm:hidden" />
                    <Check size={14} className="hidden sm:block" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (activeTool !== 'hand') setEditingNoteId(note.id)
                  }}
                  style={{
                    color: note.color,
                    fontSize: `${Math.max(10, Math.min(15, Math.round(13 * Math.max(0.65, scale))))}px`
                  }}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-white/95 sm:bg-blue-50/95 border border-blue-300 rounded sm:rounded-lg shadow-xs sm:shadow-sm font-bold text-blue-900 cursor-pointer hover:border-blue-500 transition-all hover:scale-105 flex items-center gap-1 max-w-[130px] sm:max-w-none break-words"
                >
                  <span>{note.text || '(empty)'}</span>
                  {activeTool === 'hand' && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      title="Delete Note"
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-rose-100 rounded text-rose-600"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
