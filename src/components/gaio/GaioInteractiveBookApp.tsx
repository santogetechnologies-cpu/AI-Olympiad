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
  Sparkles,
  Volume2,
  Mic,
  Pen,
  Eraser,
  Type,
  Smile,
  Undo2,
  Trash2,
  Bot,
  Palette,
  Check
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

export interface GaioInteractiveBookAppProps {
  onComplete?: () => void
  onExit?: () => void
  initialPageIndex?: number
  initialMonth?: number
  scopedMonth?: number
  chapterTitle?: string
  chapterNumber?: number
  studentName?: string
  gradeKey?: GradeKey | string
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
]

const PALETTE_COLORS = ['#2563eb', '#9333ea', '#059669', '#d97706', '#dc2626', '#1e293b']

export const GaioInteractiveBookApp: React.FC<GaioInteractiveBookAppProps> = ({
  onComplete,
  onExit,
  initialPageIndex,
  initialMonth,
  scopedMonth,
  studentName = 'AI Explorer',
  gradeKey: propGradeKey = 'class3'
}) => {
  // Normalize selected grade
  const initialGrade = useMemo<GradeKey>(() => {
    const k = String(propGradeKey).toLowerCase()
    if (k in bookCatalogData) return k as GradeKey
    return 'class3'
  }, [propGradeKey])

  const [currentGrade, setCurrentGrade] = useState<GradeKey>(initialGrade)
  const currentBookMeta = useMemo(() => {
    return (bookCatalogData as any)[currentGrade] || (bookCatalogData as any)['class3']
  }, [currentGrade])

  // Active Tool: 'pointer' | 'pen' | 'highlighter' | 'eraser' | 'text' | 'stamp'
  const [activeTool, setActiveTool] = useState<StudioTool>('pointer')
  const [activeColor, setActiveColor] = useState<string>('#2563eb')
  const [strokeWidth, setStrokeWidth] = useState<number>(3)
  const [zoomScale, setZoomScale] = useState<number>(1.35)
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>({
    width: 820,
    height: 1160
  })

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
      const next = prev + count
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
      <header className="flex-shrink-0 h-14 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between gap-3 z-30">
        {/* Left: Exit + Class Selector + Chapter Selector */}
        <div className="flex items-center gap-3">
          {onExit && (
            <button
              onClick={() => {
                gameAudio.playTap()
                onExit()
              }}
              title="Exit Book"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={18} />
              <span className="text-xs font-bold hidden sm:inline">Exit</span>
            </button>
          )}

          {/* Class / Grade Selector */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <BookOpen size={15} className="text-white" />
            </div>
            <select
              value={currentGrade}
              onChange={(e) => {
                setCurrentGrade(e.target.value as GradeKey)
                goToPage(1)
                gameAudio.playTap()
              }}
              className="bg-slate-800 text-white font-black text-xs sm:text-sm px-2.5 py-1.5 rounded-xl border border-slate-700 outline-none hover:border-blue-500 cursor-pointer"
            >
              {GRADE_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selector */}
          {currentBookMeta?.chapters && (
            <select
              value={currentChapter?.startPage || 1}
              onChange={(e) => {
                goToPage(parseInt(e.target.value, 10))
                gameAudio.playTap()
              }}
              className="hidden md:block max-w-[220px] truncate bg-slate-800/80 text-xs font-bold text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-700 outline-none cursor-pointer"
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
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              prevPage()
              gameAudio.playTap()
            }}
            disabled={currentPage <= 1}
            title="Previous Page (Left Arrow)"
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-xs font-black text-white px-1">
            Page {currentPage} <span className="text-slate-500 font-normal">/ {numPages || 218}</span>
          </span>

          <button
            onClick={() => {
              nextPage()
              gameAudio.playTap()
            }}
            disabled={currentPage >= (numPages || 218)}
            title="Next Page (Right Arrow)"
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Right: Stars, Zoom, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Stars Collected */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300 font-black text-xs shadow-sm">
            <Star size={14} className="fill-amber-400 text-amber-400 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          {/* Zoom controls */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => {
                setZoomScale((z) => Math.max(0.8, parseFloat((z - 0.15).toFixed(2))))
                gameAudio.playTap()
              }}
              title="Zoom Out"
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] font-bold text-slate-300 px-1">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => {
                setZoomScale((z) => Math.min(2.2, parseFloat((z + 0.15).toFixed(2))))
                gameAudio.playTap()
              }}
              title="Zoom In"
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Viewport (Full-Screen PDF Canvas + Direct In-Page Interaction) */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 flex items-start justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-40 backdrop-blur-xs">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-bold text-blue-300">Rendering {currentBookMeta.title}...</p>
          </div>
        )}

        {/* ── Giant Left Navigation Arrow Paddle ─────────────────────────── */}
        <button
          onClick={() => {
            prevPage()
            gameAudio.playTap()
          }}
          disabled={currentPage <= 1}
          title="Previous Page (Left Arrow)"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-24 rounded-2xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-blue-400 shadow-2xl disabled:opacity-0 disabled:pointer-events-none group"
        >
          <ChevronLeft size={36} className="text-slate-300 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* ── Giant Right Navigation Arrow Paddle ────────────────────────── */}
        <button
          onClick={() => {
            nextPage()
            gameAudio.playTap()
          }}
          disabled={currentPage >= (numPages || 218)}
          title="Next Page (Right Arrow)"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-24 rounded-2xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-blue-400 shadow-2xl disabled:opacity-0 disabled:pointer-events-none group"
        >
          <ChevronRight size={36} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
        </button>

        {/* ── Authentic Book Page + Unified In-Page Interaction Layer ──────── */}
        <div
          className="relative shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-700 transition-all duration-150 my-auto"
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
            onAddStar={() => handleAddStar(1)}
            onWordClick={wordsLayer.speakWord}
            onWordSpell={wordsLayer.spellWord}
          />
        </div>
      </div>

      {/* ── In-Page Floating Tool Dock ─────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl transition-all">
        {/* Tap Word Mode */}
        <button
          onClick={() => {
            setActiveTool('pointer')
            gameAudio.playTap()
          }}
          title="Tap Word Mode: Tap any word or sentence on the page to hear it!"
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTool === 'pointer' ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <span className="text-sm">👆</span>
          <span>Tap Word</span>
        </button>

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
          <Sparkles size={18} />
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

        {/* Type Tool */}
        <button
          onClick={() => {
            setActiveTool('text')
            gameAudio.playTap()
          }}
          title="Type answers anywhere on the page"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'text' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Type size={18} />
        </button>

        {/* Stamp Tool */}
        <button
          onClick={() => {
            setActiveTool('stamp')
            gameAudio.playTap()
          }}
          title="Stamp Stars ⭐ & Robots"
          className={`p-2.5 rounded-xl transition-all ${
            activeTool === 'stamp' ? 'bg-amber-600 text-white shadow-md scale-105' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Smile size={18} />
        </button>

        {/* Color Palette Selector */}
        {['pen', 'highlighter'].includes(activeTool) && (
          <div className="flex items-center gap-1 pl-1">
            {PALETTE_COLORS.map((col) => (
              <button
                key={col}
                onClick={() => {
                  setActiveColor(col)
                  gameAudio.playTap()
                }}
                className={`w-5 h-5 rounded-full border transition-transform ${
                  activeColor === col ? 'scale-125 border-white shadow-md' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        )}

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Read Page Aloud Button */}
        <button
          onClick={() => {
            if (wordsLayer.isReadingAloud) {
              wordsLayer.stopReadAloud()
            } else {
              setActiveTool('pointer')
              wordsLayer.startReadAloud()
            }
          }}
          title="Read Whole Page Aloud with Karaoke Highlight"
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
            wordsLayer.isReadingAloud
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <Volume2 size={16} />
          <span>{wordsLayer.isReadingAloud ? 'Stop' : 'Read Page'}</span>
        </button>

        {/* Voice Assistant */}
        <button
          onClick={() => {
            if (voice.isListening) {
              voice.stopListening()
            } else {
              voice.startListening()
            }
          }}
          title="Voice Assistant: Speak 'next', 'back', 'read'"
          className={`p-2.5 rounded-xl transition-all ${
            voice.isListening ? 'bg-rose-600 text-white animate-pulse' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Mic size={18} />
        </button>
      </div>

      {/* ── Cute Floating Bolt Avatar (Bottom-Right) ───────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        {isBoltTalking && (
          <div className="mb-2 max-w-xs p-3 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-blue-400 text-xs leading-relaxed animate-in fade-in slide-in-from-bottom-2">
            <div className="font-black text-blue-300 text-[10px] uppercase mb-1">Bolt Says:</div>
            <div>{boltMessage}</div>
          </div>
        )}

        <button
          onClick={handleTalkToBolt}
          title="Tap to talk to Bolt!"
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-2xl border-2 border-white/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        >
          <Bot size={28} className="text-white group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default GaioInteractiveBookApp
