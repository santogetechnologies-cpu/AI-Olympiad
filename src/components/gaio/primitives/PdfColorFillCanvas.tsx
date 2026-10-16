// ─────────────────────────────────────────────────────────────────────────────
// PDF COLOR FILL CANVAS
// Scanline flood fill on outline shapes with multiply blend mode
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Palette, Undo2, RotateCcw, Check, Sparkles } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PdfColorFillCanvasProps {
  pageNumber: number
  bookKey: string
  pageWidth: number
  pageHeight: number
  isActive: boolean
  pdfCanvas: HTMLCanvasElement | null
  onAddStar?: () => void
}

const FILL_PALETTE = [
  '#f87171', // Red
  '#fb923c', // Orange
  '#facc15', // Yellow
  '#4ade80', // Green
  '#38bdf8', // Sky Blue
  '#818cf8', // Indigo
  '#c084fc', // Purple
  '#f472b6', // Pink
  '#ffffff', // White / Erase
]

export const PdfColorFillCanvas: React.FC<PdfColorFillCanvasProps> = ({
  pageNumber,
  bookKey,
  pageWidth,
  pageHeight,
  isActive,
  pdfCanvas,
  onAddStar
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('#38bdf8')
  const [history, setHistory] = useState<ImageData[]>([])

  const storageKey = `gaio_color_${bookKey}_p${pageNumber}`

  // Load color layer if saved
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHistory([])

    try {
      const dataUrl = localStorage.getItem(storageKey)
      if (dataUrl) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
        }
        img.src = dataUrl
      }
    } catch {}
  }, [storageKey])

  const saveCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      localStorage.setItem(storageKey, canvas.toDataURL('image/png'))
    } catch {}
  }, [storageKey])

  // Scanline Flood Fill implementation
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const startX = Math.floor((e.clientX - rect.left) * scaleX)
    const startY = Math.floor((e.clientY - rect.top) * scaleY)

    // Save history for undo
    const prevData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory((prev) => [...prev.slice(-6), prevData])

    // Convert hex color to RGBA
    const r = parseInt(selectedColor.slice(1, 3), 16)
    const g = parseInt(selectedColor.slice(3, 5), 16)
    const b = parseInt(selectedColor.slice(5, 7), 16)
    const a = 255

    // Get pixel data from PDF canvas or current canvas
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imgData.data

    // Also sample PDF canvas pixels if available
    let pdfData: Uint8ClampedArray | null = null
    if (pdfCanvas) {
      try {
        const pCtx = pdfCanvas.getContext('2d')
        if (pCtx) {
          pdfData = pCtx.getImageData(0, 0, canvas.width, canvas.height).data
        }
      } catch {}
    }

    const startPos = (startY * canvas.width + startX) * 4
    // If clicked on dark boundary line, ignore
    if (pdfData && (pdfData[startPos] < 60 && pdfData[startPos + 1] < 60 && pdfData[startPos + 2] < 60)) {
      return
    }

    // Queue for flood fill
    const queue: [number, number][] = [[startX, startY]]
    const visited = new Uint8Array(canvas.width * canvas.height)
    visited[startY * canvas.width + startX] = 1

    let fillCount = 0
    const maxPixels = 60000 // safeguard boundary

    while (queue.length > 0 && fillCount < maxPixels) {
      const [cx, cy] = queue.pop()!
      const idx = (cy * canvas.width + cx) * 4

      data[idx] = r
      data[idx + 1] = g
      data[idx + 2] = b
      data[idx + 3] = a
      fillCount++

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ]

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
          const nIdx = ny * canvas.width + nx
          if (!visited[nIdx]) {
            visited[nIdx] = 1
            const pIdx = nIdx * 4
            // Check boundary in PDF: black/dark line blocks flood
            const isDarkEdge =
              pdfData && (pdfData[pIdx] < 70 && pdfData[pIdx + 1] < 70 && pdfData[pIdx + 2] < 70)
            if (!isDarkEdge) {
              queue.push([nx, ny])
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0)
    saveCanvas()
    gameAudio.playCoin()

    if (fillCount > 200) {
      onAddStar?.()
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      })
    }
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const last = history[history.length - 1]
    ctx.putImageData(last, 0, 0)
    setHistory((prev) => prev.slice(0, -1))
    saveCanvas()
    gameAudio.playTap()
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHistory([])
    saveCanvas()
    gameAudio.playTap()
  }

  return (
    <>
      {/* Flood fill layer with multiply blend so outlines remain crisp */}
      <canvas
        ref={canvasRef}
        width={pageWidth}
        height={pageHeight}
        onClick={handleCanvasClick}
        style={{ mixBlendMode: 'multiply' }}
        className={`absolute inset-0 z-15 ${
          isActive ? 'cursor-cell pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      {/* Floating Color Palette Toolbar when in Color Mode */}
      {isActive && (
        <div className="fixed sm:absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-2.5 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-1.5">
            {FILL_PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedColor(c)
                  gameAudio.playTap()
                }}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  selectedColor === c ? 'scale-125 border-white shadow-lg' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-white/20 mx-1" />

          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="p-2 text-slate-300 hover:text-white rounded-lg disabled:opacity-30"
            title="Undo Fill"
          >
            <Undo2 size={16} />
          </button>

          <button
            onClick={handleClear}
            className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"
            title="Clear All Fills"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      )}
    </>
  )
}
