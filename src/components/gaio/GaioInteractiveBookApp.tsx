// ─────────────────────────────────────────────────────────────────────────────
// GAIO INTERACTIVE PDF STUDIO — COMPLETE ENGINE (CLASSES 3 TO 10)
// Direct In-PDF Interaction Studio with:
// 1. High-DPI Crisp PDF.js Canvas
// 2. Unified In-Page Layer (Tap to Speak, In-Line Blanks, Multiple Choice Circles, Drawings, Stamps)
// 3. Giant Floating Navigation Paddles (‹ and ›) + Instant Page Turn
// 4. Sleek Retractable Bottom Dock (Pen, Highlight, Text, Stamp, Eraser, Read Aloud, Voice)
// 5. Cute Floating Bolt Assistant
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Star,
  Pen,
  Eraser,
  Type,
  Undo2,
  Trash2,
  Bot,
  Palette,
  Check,
  PaintBucket,
  Lock
} from 'lucide-react'
import { usePdfBook } from './hooks/usePdfBook'
import { usePdfInteractiveLayer } from './hooks/usePdfInteractiveLayer'
import { useVoiceInteraction } from './hooks/useVoiceInteraction'
import { UnifiedPdfInteractionLayer, type StudioTool } from './primitives/UnifiedPdfInteractionLayer'
import bookCatalogData from './config/bookCatalog.json'
import { gameAudio } from '../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export type GradeKey =
  | 'class3'
  | 'class4'
  | 'class5'
  | 'class6'
  | 'class7'
  | 'class8'
  | 'class9'
  | 'class10'
  | 'class11'
  | 'class12'
  | 'ug1'
  | 'ug2'
  | 'ug3'
  | 'ug4'
  | 'pg1'
  | 'pg2'

export interface GaioInteractiveBookAppProps {
  onComplete?: () => void
  onExit?: () => void
  initialPageIndex?: number
  initialMonth?: number
  scopedMonth?: number
  chapterTitle?: string
  chapterNumber?: number | string
  studentName?: string
  gradeKey?: GradeKey | string
  isGradeLocked?: boolean
  topicFilter?: number
}

const GRADE_OPTIONS: { key: GradeKey; label: string }[] = [
  { key: 'class3', label: 'Class 3 • Beginner' },
  { key: 'class4', label: 'Class 4 • Explorer' },
  { key: 'class5', label: 'Class 5 • Innovator' },
  { key: 'class6', label: 'Class 6 • Pioneer' },
  { key: 'class7', label: 'Class 7 • Creator' },
  { key: 'class8', label: 'Class 8 • Engineer' },
  { key: 'class9', label: 'Class 9 • Master' },
  { key: 'class10', label: 'Class 10 • Olympian' },
  { key: 'class11', label: 'Class 11 • Super Senior' },
  { key: 'class12', label: 'Class 12 • Scholar' },
  { key: 'ug1', label: 'UG 1st Year • Innovator' },
  { key: 'ug2', label: 'UG 2nd Year • Lead Innovator' },
  { key: 'ug3', label: 'UG 3rd Year • AI Specialist' },
  { key: 'ug4', label: 'UG Final Year • AI Architect' },
  { key: 'pg1', label: 'PG 1st Year • Research Fellow' },
  { key: 'pg2', label: 'PG Final Year • Principal Researcher' },
]

const PALETTE_COLORS = [
  '#2563eb', // Blue
  '#9333ea', // Purple
  '#059669', // Emerald
  '#d97706', // Amber
  '#dc2626', // Red
  '#ec4899', // Pink
  '#38bdf8', // Sky Blue
  '#facc15', // Yellow
  '#f97316', // Orange
  '#1e293b'  // Slate
]

export const GaioInteractiveBookApp: React.FC<GaioInteractiveBookAppProps> = ({
  onComplete,
  onExit,
  initialPageIndex,
  initialMonth,
  scopedMonth,
  studentName = 'AI Explorer',
  gradeKey: propGradeKey = 'class3',
  isGradeLocked = true
}) => {
  // Normalize selected grade
  const initialGrade = useMemo<GradeKey>(() => {
    const k = String(propGradeKey).toLowerCase()
    if (k in bookCatalogData) return k as GradeKey
    return 'class3'
  }, [propGradeKey])

  const [currentGrade, setCurrentGrade] = useState<GradeKey>(initialGrade)

  // Enforce grade lock for students
  useEffect(() => {
    if (isGradeLocked) {
      setCurrentGrade(initialGrade)
    }
  }, [isGradeLocked, initialGrade])

  const currentBookMeta = useMemo(() => {
    return (bookCatalogData as any)[currentGrade] || (bookCatalogData as any)['class3']
  }, [currentGrade])

  // Active Tool: 'fill' | 'pen' | 'highlighter' | 'eraser' | 'text' | 'stamp'
  const [activeTool, setActiveTool] = useState<StudioTool>('pen')
  const [activeColor, setActiveColor] = useState<string>('#2563eb')
  const [selectedEmoji, setSelectedEmoji] = useState<string>('⭐')
  const [strokeWidth, setStrokeWidth] = useState<number>(3)
  const [undoSignal, setUndoSignal] = useState<number>(0)
  const [clearSignal, setClearSignal] = useState<number>(0)

  // Auto-fit scale detection for mobile and desktop screens (reserves space for right-side vertical tool dock on mobile)
  const getAutoFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 1.15
    const screenWidth = window.innerWidth
    // Reserve horizontal space: 70px on mobile (< 1024px) for right-side vertical tool dock, 48px on desktop
    const availableW = screenWidth < 1024 ? Math.max(260, screenWidth - 70) : Math.min(screenWidth - 48, 1000)
    // Standard A4 width is ~595.3 points
    const fit = parseFloat((availableW / 595.3).toFixed(2))
    return screenWidth < 1024 ? Math.min(1.1, Math.max(0.42, fit)) : Math.min(1.5, Math.max(0.8, fit))
  }, [])

  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 1.15
    const w = window.innerWidth
    if (w < 1024) {
      const avail = Math.max(260, w - 70)
      return Math.min(1.1, Math.max(0.42, parseFloat((avail / 595.3).toFixed(2))))
    }
    return 1.25
  })

  // Auto-fit on viewport resize if on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setZoomScale(getAutoFitScale())
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getAutoFitScale])

  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>(() => {
    if (typeof window === 'undefined') return { width: 820, height: 1160 }
    const w = window.innerWidth
    const s = w < 1024
      ? Math.min(1.1, Math.max(0.42, parseFloat((Math.max(260, w - 70) / 595.3).toFixed(2))))
      : 1.25
    return {
      width: Math.round(595.3 * s),
      height: Math.round(841.9 * s)
    }
  })

  // Touch swipe gesture tracking for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    // In Move (hand) or drawing modes, let touch drag/pan freely instead of flipping pages
    if (activeTool === 'hand' || ['pen', 'fill', 'eraser'].includes(activeTool)) return
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    // Horizontal swipe threshold: 50px, and predominantly horizontal
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        nextPage()
        gameAudio.playTap()
      } else {
        prevPage()
        gameAudio.playTap()
      }
    }
  }

  // Pan & Grab navigation with Hand (Move) tool
  const panStartRef = useRef<{ startX: number; startY: number; scrollLeft: number; scrollTop: number } | null>(null)
  const [isPanning, setIsPanning] = useState<boolean>(false)

  const handlePanPointerDown = (e: React.PointerEvent) => {
    if (activeTool !== 'hand' || !containerRef.current) return
    if ((e.target as HTMLElement).closest('button, input, textarea, [data-draggable="true"]')) return
    panStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop
    }
    setIsPanning(true)
    try {
      containerRef.current.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePanPointerMove = (e: React.PointerEvent) => {
    if (!panStartRef.current || !containerRef.current) return
    const dx = e.clientX - panStartRef.current.startX
    const dy = e.clientY - panStartRef.current.startY
    containerRef.current.scrollLeft = panStartRef.current.scrollLeft - dx
    containerRef.current.scrollTop = panStartRef.current.scrollTop - dy
  }

  const handlePanPointerUp = (e: React.PointerEvent) => {
    if (panStartRef.current) {
      panStartRef.current = null
      setIsPanning(false)
      try {
        containerRef.current?.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  // Start page calculation
  const startPage = useMemo(() => {
    if (scopedMonth && currentBookMeta?.chapters) {
      const ch = currentBookMeta.chapters.find((c: any) =>
        c.title.toLowerCase().includes(`month ${scopedMonth}`)
      )
      if (ch) return ch.startPage
    }
    if (initialMonth && currentBookMeta?.chapters) {
      const ch = currentBookMeta.chapters.find((c: any) =>
        c.title.toLowerCase().includes(`month ${initialMonth}`)
      )
      if (ch) return ch.startPage
    }
    if (initialPageIndex !== undefined) {
      return Math.max(1, initialPageIndex + 1)
    }
    return 1
  }, [scopedMonth, initialMonth, initialPageIndex, currentBookMeta])

  // PDF.js Engine Hook with rock-solid navigation
  const {
    numPages,
    currentPage,
    isLoading,
    error,
    pageText,
    setCurrentPage,
    nextPage,
    prevPage,
    goToPage,
    renderPageToCanvas
  } = usePdfBook({
    pdfUrl: currentBookMeta.pdfPath,
    initialPage: startPage,
    scale: zoomScale
  })

  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Class Manifest & Region Detection Data
  const [classManifest, setClassManifest] = useState<any>(null)
  useEffect(() => {
    fetch(`/manifests/${currentGrade}_manifest.json`)
      .then((r) => r.json())
      .then((data) => setClassManifest(data))
      .catch(() => {})
  }, [currentGrade])

  const currentPageRegions = useMemo(() => {
    if (!classManifest?.pages) return []
    const p = classManifest.pages.find((pg: any) => pg.pageNumber === currentPage)
    return p?.regions || []
  }, [classManifest, currentPage])

  // Stars state
  const [stars, setStars] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('gaio_total_stars') || '30', 10)
    } catch {
      return 30
    }
  })

  const handleAddStar = useCallback((count = 1) => {
    setStars((prev) => {
      const next = Math.max(0, prev + count)
      try {
        localStorage.setItem('gaio_total_stars', String(next))
      } catch {}
      return next
    })
  }, [])

  // Words Layer & Karaoke Reading
  const wordsLayer = usePdfInteractiveLayer({
    pdfDoc: null,
    currentPage,
    viewportScale: zoomScale,
    onAddStar: handleAddStar
  })

  // Voice Interaction Hook
  const voice = useVoiceInteraction({
    onNextPage: () => nextPage(),
    onPrevPage: () => prevPage(),
    onReadAloud: () => {
      setActiveTool('pointer')
      wordsLayer.startReadAloud()
    },
    onSwitchMode: (m) => {
      if (m === 'draw') setActiveTool('pen')
      else if (m === 'read') setActiveTool('pointer')
    }
  })

  // Render current PDF page when page, scale, or book changes
  useEffect(() => {
    if (!pdfCanvasRef.current || isLoading) return
    let isCancelled = false

    renderPageToCanvas(pdfCanvasRef.current, currentPage, zoomScale).then((dim) => {
      if (!isCancelled && dim) {
        setPageDimensions(dim)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [currentPage, zoomScale, isLoading, renderPageToCanvas, currentGrade])

  // Keyboard navigation & gestures
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextPage()
        gameAudio.playTap()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevPage()
        gameAudio.playTap()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage])

  // Current chapter helper
  const currentChapter = useMemo(() => {
    if (!currentBookMeta?.chapters) return null
    return (
      currentBookMeta.chapters.find(
        (c: any) => currentPage >= c.startPage && currentPage <= c.endPage
      ) || currentBookMeta.chapters[0]
    )
  }, [currentPage, currentBookMeta])

  // Bolt avatar speech
  const [isBoltTalking, setIsBoltTalking] = useState<boolean>(false)
  const [boltMessage, setBoltMessage] = useState<string>('')

  const handleTalkToBolt = () => {
    setIsBoltTalking(true)
    gameAudio.playLevelUp()
    confetti({ particleCount: 25, spread: 50, origin: { x: 0.9, y: 0.85 } })

    const tips = [
      `Hi ${studentName}! Tap any word or picture on Page ${currentPage} to hear me speak! 🤖`,
      `Double-tap any word to spell it out letter by letter! 🔤`,
      `Click the blank lines to type your answers directly on the page! ✍️`,
      `Use the Pen or Star Stamps ⭐ to mark completed activities!`,
      `Awesome job! You have ${stars} stars collected! 🏆`
    ]
    const chosen = tips[Math.floor(Math.random() * tips.length)]
    setBoltMessage(chosen)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(chosen.replace(/[\u{1F300}-\u{1F9FF}]/gu, ''))
      u.rate = 1.0
      u.pitch = 1.15
      window.speechSynthesis.speak(u)
    }

    setTimeout(() => {
      setIsBoltTalking(false)
    }, 6000)
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col bg-slate-950 text-slate-100 font-sans select-none overflow-hidden relative"
    >
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-11 sm:h-14 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-2 sm:px-4 flex items-center justify-between gap-1 sm:gap-3 z-30">
        {/* Left: Class Locked Badge */}
        <div className="flex items-center gap-1 sm:gap-2.5 min-w-0 shrink-0">

          {/* Class / Grade Badge (Locked for students so they cannot view other classes) */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-blue-600/20 text-blue-300 border border-blue-500/30 font-black text-xs sm:text-sm rounded-xl shrink-0 shadow-xs">
            <BookOpen size={12} className="text-blue-400 shrink-0" />
            <span className="whitespace-nowrap font-extrabold capitalize">
              {GRADE_OPTIONS.find((o) => o.key === currentGrade)?.label?.split('•')[0].trim() || 'Class 3'}
            </span>
          </div>

          {/* Chapter Selector (Desktop only) */}
          {currentBookMeta?.chapters && (
            <select
              value={currentChapter?.startPage || 1}
              onChange={(e) => {
                goToPage(parseInt(e.target.value, 10))
                gameAudio.playTap()
              }}
              className="hidden lg:block max-w-[200px] truncate bg-slate-800/80 text-xs font-bold text-slate-300 px-2 py-1.5 rounded-xl border border-slate-700 outline-none cursor-pointer"
            >
              {currentBookMeta.chapters.map((ch: any, idx: number) => (
                <option key={idx} value={ch.startPage}>
                  {ch.title} (p.{ch.startPage})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Center: Page Number & Jumper */}
        <div className="flex items-center gap-0.5 sm:gap-2 bg-slate-800/80 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-xl border border-slate-700 shrink-0">
          <button
            onClick={() => {
              prevPage()
              gameAudio.playTap()
            }}
            disabled={currentPage <= 1}
            title="Previous Page (Left Arrow)"
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>

          <span className="text-[11px] sm:text-xs font-black text-white px-0.5 whitespace-nowrap">
            {currentPage} <span className="text-slate-500 font-normal">/ {numPages || 218}</span>
          </span>

          <button
            onClick={() => {
              nextPage()
              gameAudio.playTap()
            }}
            disabled={currentPage >= (numPages || 218)}
            title="Next Page (Right Arrow)"
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Right: Stars & Zoom / Fit */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Undo Action */}
          <button
            onClick={() => {
              setUndoSignal((prev) => prev + 1)
              gameAudio.playTap()
            }}
            title="Undo last action (Ctrl+Z)"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Undo2 size={13} className="text-amber-400" />
            <span className="hidden xs:inline text-[11px] font-bold">Undo</span>
          </button>

          {/* Stars Collected */}
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300 font-black text-[11px] sm:text-xs shadow-sm">
            <Star size={13} className="fill-amber-400 text-amber-400 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/60 p-0.5 sm:p-1 rounded-xl border border-slate-700/60">
            <div className="hidden sm:flex items-center gap-0.5">
              <button
                onClick={() => {
                  setZoomScale((z) => Math.max(0.45, parseFloat((z - 0.15).toFixed(2))))
                  gameAudio.playTap()
                }}
                title="Zoom Out"
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <ZoomOut size={13} />
              </button>
              <span className="text-[10px] font-bold text-slate-300 px-1">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => {
                  setZoomScale((z) => Math.min(2.2, parseFloat((z + 0.15).toFixed(2))))
                  gameAudio.playTap()
                }}
                title="Zoom In"
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Viewport (Full-Screen PDF Canvas + Direct In-Page Interaction) */}
      <div
        ref={containerRef}
        onPointerDown={handlePanPointerDown}
        onPointerMove={handlePanPointerMove}
        onPointerUp={handlePanPointerUp}
        onPointerCancel={handlePanPointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`flex-1 w-full overflow-auto bg-slate-950 p-1 pl-2 pr-16 sm:pl-3 sm:pr-20 lg:p-4 flex flex-col items-center justify-start relative select-none pb-28 lg:pb-16 ${
          activeTool === 'hand' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-40 backdrop-blur-xs">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-bold text-blue-300">Rendering {currentBookMeta.title}...</p>
          </div>
        )}

        {/* ── Giant Left Navigation Arrow Paddle (Desktop Only) ──────────────── */}
        <button
          onClick={() => {
            prevPage()
            gameAudio.playTap()
          }}
          disabled={currentPage <= 1}
          title="Previous Page (Left Arrow)"
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-24 rounded-2xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-white items-center justify-center transition-all duration-200 hover:scale-105 hover:border-blue-400 shadow-2xl disabled:opacity-0 disabled:pointer-events-none group"
        >
          <ChevronLeft size={36} className="text-slate-300 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* ── Giant Right Navigation Arrow Paddle (Desktop Only) ─────────────── */}
        <button
          onClick={() => {
            nextPage()
            gameAudio.playTap()
          }}
          disabled={currentPage >= (numPages || 218)}
          title="Next Page (Right Arrow)"
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-24 rounded-2xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-white items-center justify-center transition-all duration-200 hover:scale-105 hover:border-blue-400 shadow-2xl disabled:opacity-0 disabled:pointer-events-none group"
        >
          <ChevronRight size={36} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
        </button>

        {/* ── Authentic Book Page + Unified In-Page Interaction Layer ──────── */}
        <div
          className="relative shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-700 transition-all duration-150 mx-auto my-auto shrink-0 max-w-full"
          style={{
            width: `${pageDimensions.width}px`,
            height: `${pageDimensions.height}px`,
          }}
        >
          {/* Layer 1: High-DPI Crisp PDF.js Canvas */}
          <canvas ref={pdfCanvasRef} className="block w-full h-full" />

          {/* Layer 2: Unified In-Page Interactive Layer */}
          <UnifiedPdfInteractionLayer
            pageNumber={currentPage}
            bookKey={currentGrade}
            pageWidth={pageDimensions.width}
            pageHeight={pageDimensions.height}
            scale={zoomScale}
            activeTool={activeTool}
            activeColor={activeColor}
            strokeWidth={strokeWidth}
            words={wordsLayer.words}
            activeWordId={wordsLayer.activeWordId}
            regions={currentPageRegions}
            isReadingAloud={wordsLayer.isReadingAloud}
            pdfCanvas={pdfCanvasRef.current}
            selectedEmoji={selectedEmoji}
            undoSignal={undoSignal}
            clearSignal={clearSignal}
            onAddStar={(count) => handleAddStar(count ?? 1)}
            onWordClick={wordsLayer.speakWord}
            onWordSpell={wordsLayer.spellWord}
          />
        </div>
      </div>

      {/* ── In-Page Floating Tool Dock (Vertical on Right Side for Mobile, Horizontal on Desktop) ── */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl transition-all max-h-[85vh] overflow-y-auto overflow-x-hidden lg:flex-row lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 lg:top-auto lg:right-auto lg:translate-y-0 lg:max-w-[96vw] lg:max-h-none lg:overflow-x-auto lg:overflow-y-visible">
        {/* Color */}
        <button
          onClick={() => {
            setActiveTool('fill')
            gameAudio.playTap()
          }}
          title="Color worksheets and shapes"
          className={`w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
            activeTool === 'fill' ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-300' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <PaintBucket size={15} className="sm:w-4 sm:h-4" />
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Color</span>
        </button>

        {/* Write (Pen) */}
        <button
          onClick={() => {
            setActiveTool('pen')
            gameAudio.playTap()
          }}
          title="Write on the page"
          className={`w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
            activeTool === 'pen' ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Pen size={15} className="sm:w-4 sm:h-4" />
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Write</span>
        </button>

        {/* Star */}
        <button
          onClick={() => {
            setActiveTool('stamp')
            setSelectedEmoji('⭐')
            gameAudio.playTap()
            toast('⭐ Star tool active! Tap on the page to rate!', {
              icon: '⭐',
              id: 'star-rate-tip'
            })
          }}
          title="Rate with Stars ⭐"
          className={`w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center relative cursor-pointer transition-all ${
            activeTool === 'stamp'
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-110 ring-2 ring-amber-300'
              : 'text-amber-300 hover:bg-white/10'
          }`}
        >
          <span className="text-base sm:text-lg leading-none select-none drop-shadow">⭐</span>
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Star</span>
          {activeTool === 'stamp' && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
          )}
        </button>

        {/* Erase */}
        <button
          onClick={() => {
            setActiveTool('eraser')
            gameAudio.playTap()
          }}
          title="Erase marks & color fills (tap color to flood-erase, or drag to erase)"
          className={`w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
            activeTool === 'eraser' ? 'bg-rose-600 text-white shadow-md scale-105 ring-2 ring-rose-300' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Eraser size={15} className="sm:w-4 sm:h-4" />
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Erase</span>
        </button>

        {/* Clear All button visible when Erase is active */}
        {activeTool === 'eraser' && (
          <button
            onClick={() => {
              setClearSignal((prev) => prev + 1)
              gameAudio.playTap()
            }}
            title="Clear all drawings and color fills on this page"
            className="w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all bg-rose-700 hover:bg-rose-600 text-white shadow-md active:scale-95 cursor-pointer animate-in fade-in"
          >
            <Trash2 size={15} className="sm:w-4 sm:h-4 text-white" />
            <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Clear</span>
          </button>
        )}

        {/* Type */}
        <button
          onClick={() => {
            setActiveTool('text')
            gameAudio.playTap()
          }}
          title="Type answers anywhere on the page"
          className={`w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
            activeTool === 'text' ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-300' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Type size={15} className="sm:w-4 sm:h-4" />
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Type</span>
        </button>

        {/* Undo */}
        <button
          onClick={() => {
            setUndoSignal((prev) => prev + 1)
            gameAudio.playTap()
          }}
          title="Undo last star, color fill, or drawing (Ctrl+Z)"
          className="w-10 sm:w-12 py-1 sm:py-1.5 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all text-slate-300 hover:bg-white/10 active:scale-95 hover:text-amber-300 cursor-pointer"
        >
          <Undo2 size={15} className="text-amber-400 sm:w-4 sm:h-4" />
          <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 sm:mt-1 leading-none tracking-tight">Undo</span>
        </button>

        {/* Color Palette Selector */}
        {['pen', 'fill'].includes(activeTool) && (
          <div className="flex flex-col lg:flex-row items-center gap-1.5 py-1 lg:py-0 lg:pl-1">
            {PALETTE_COLORS.map((col) => (
              <button
                key={col}
                onClick={() => {
                  setActiveColor(col)
                  gameAudio.playTap()
                }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-transform ${
                  activeColor === col ? 'scale-125 border-white shadow-md ring-2 ring-blue-400' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GaioInteractiveBookApp
