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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Star,
  Sparkles,
  Pen,
  Eraser,
  Type,
  Undo2,
  Trash2,
  Bot,
  Palette,
  Check,
  CheckCircle2,
  PaintBucket,
  Lock,
  Hand,
  Highlighter,
  AlertTriangle
} from 'lucide-react'
import { usePdfBook } from './hooks/usePdfBook'
import { usePdfInteractiveLayer } from './hooks/usePdfInteractiveLayer'
import { useVoiceInteraction } from './hooks/useVoiceInteraction'
import { UnifiedPdfInteractionLayer, type StudioTool } from './primitives/UnifiedPdfInteractionLayer'
import { PdfToolbarSpotlightTour } from './primitives/PdfToolbarSpotlightTour'
import bookCatalogData from './config/bookCatalog.json'
import { gameAudio } from '../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { tourService } from '../../services/tourService'
import { progressService, normalizeChapterKey, getClassChapters, formatProgressPercentage, parseGradeKeyFromClass } from '../../services/progressService'

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
  onNavigateChapter?: (nextChapterKey: string) => void
  initialPageIndex?: number
  initialMonth?: number
  scopedMonth?: number
  chapterTitle?: string
  chapterNumber?: number | string
  studentName?: string
  gradeKey?: GradeKey | string
  isGradeLocked?: boolean
  topicFilter?: number
  studentId?: string
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
  onNavigateChapter,
  initialPageIndex,
  initialMonth,
  scopedMonth,
  chapterTitle,
  chapterNumber,
  studentName = 'AI Explorer',
  gradeKey: propGradeKey = 'class3',
  isGradeLocked = true,
  studentId: propStudentId
}) => {
  const { user } = useAuth()
  const activeStudentId = propStudentId || user?.id || 'demo-student-id'

  // Normalize selected grade
  const initialGrade = useMemo<GradeKey>(() => {
    const k = parseGradeKeyFromClass(propGradeKey)
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
  // ── Spotlight Onboarding Tour & PDF Ready State Synchronization ─────────────
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [isInitialPageRendered, setIsInitialPageRendered] = useState<boolean>(false)
  const hasEvaluatedTourRef = useRef<boolean>(false)
  const lastEvaluatedStudentIdRef = useRef<string | null>(null)

  const [selectedEmoji, setSelectedEmoji] = useState<string>('⭐')
  const [strokeWidth, setStrokeWidth] = useState<number>(3)
  const [undoSignal, setUndoSignal] = useState<number>(0)
  const [clearSignal, setClearSignal] = useState<number>(0)

  // Auto-fit scale detection: fits BOTH width and height so full page is visible without clipping
  // Reserves dedicated horizontal space for the vertical right-side toolbar
  const computeFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 0.85
    const el = containerRef.current
    const viewportW = el?.clientWidth || window.innerWidth
    const viewportH = el?.clientHeight || (window.innerHeight - 130)

    const isMobile = window.innerWidth < 1024
    // Space reserved for right-side vertical toolbar (~44px on mobile, ~68px on desktop)
    const toolbarW = isMobile ? 44 : 68
    // On mobile: zero extra padding around PDF, toolbar touches right edge
    const paddingX = isMobile ? toolbarW : (toolbarW + 110)
    // On mobile: space reserved for bottom progress bar (~42px)
    const paddingY = isMobile ? 42 : 100

    const availW = Math.max(200, viewportW - paddingX)
    const availH = Math.max(220, viewportH - paddingY)

    const scaleW = availW / 595.3
    const scaleH = availH / 841.9

    // Fit BOTH width and height so entire page is fully visible on screen without clipping
    const fit = Math.min(scaleW, scaleH)
    return Math.min(1.4, Math.max(0.25, parseFloat(fit.toFixed(2))))
  }, [])

  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.85
    const w = window.innerWidth
    const h = window.innerHeight
    const isMobile = w < 1024
    const toolbarW = isMobile ? 44 : 68
    const availW = Math.max(200, w - (isMobile ? toolbarW : (toolbarW + 110)))
    const availH = Math.max(220, h - (isMobile ? 96 : 170))
    const fit = Math.min(availW / 595.3, availH / 841.9)
    return Math.min(1.4, Math.max(0.25, parseFloat(fit.toFixed(2))))
  })

  // Measure and apply precise fit to screen once mounted and on resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      const fit = computeFitScale()
      if (fit) setZoomScale(fit)
    }
    const timer = setTimeout(() => {
      handleResize()
    }, 80)
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [computeFitScale])

  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>(() => {
    const initialS = typeof window !== 'undefined'
      ? Math.min(1.4, Math.max(0.25, parseFloat((Math.min(
          Math.max(200, window.innerWidth - (window.innerWidth < 1024 ? 44 : 178)) / 595.3,
          Math.max(220, window.innerHeight - (window.innerWidth < 1024 ? 96 : 170)) / 841.9
        )).toFixed(2))))
      : 0.85
    return {
      width: Math.round(595.3 * initialS),
      height: Math.round(841.9 * initialS)
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

  // ─── CHAPTER & DYNAMIC PDF RESOLUTION ─────────────────────────────────────
  const [internalChapterKey, setInternalChapterKey] = useState<string | null>(null)

  useEffect(() => {
    setInternalChapterKey(null)
  }, [chapterNumber, scopedMonth])

  const currentChapterKey = useMemo(() => {
    if (internalChapterKey) return internalChapterKey
    if (chapterNumber !== undefined && chapterNumber !== null) {
      return normalizeChapterKey(chapterNumber)
    }
    if (scopedMonth !== undefined && scopedMonth !== null) {
      return normalizeChapterKey(scopedMonth)
    }
    return 'intro'
  }, [internalChapterKey, chapterNumber, scopedMonth])

  const chapters = useMemo(() => getClassChapters(currentGrade), [currentGrade])

  const currentChapterDef = useMemo(() => {
    return chapters.find((c) => c.key === currentChapterKey) || chapters[0]
  }, [chapters, currentChapterKey])

  const currentChapterIndex = useMemo(() => {
    return chapters.findIndex((c) => c.key === currentChapterKey)
  }, [chapters, currentChapterKey])

  const nextChapter = useMemo(() => {
    if (currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1) {
      return chapters[currentChapterIndex + 1]
    }
    return null
  }, [chapters, currentChapterIndex])

  const isFinalChapter = useMemo(() => {
    return !nextChapter || currentChapterIndex === chapters.length - 1 || currentChapterKey === 'finale'
  }, [nextChapter, currentChapterIndex, currentChapterKey])

  const resolvedPdfUrl = useMemo(() => {
    return currentChapterDef?.pdfPath || currentBookMeta?.pdfPath || `/books/${currentGrade || 'class3'}.pdf`
  }, [currentChapterDef, currentBookMeta, currentGrade])

  const chapterStartPage = currentChapterDef?.startPage || 1
  const chapterEndPage = currentChapterDef?.endPage || (currentBookMeta?.totalPages || 218)
  const chapterTotalPages = currentChapterDef?.totalPages || Math.max(1, chapterEndPage - chapterStartPage + 1)

  const startPage = useMemo(() => {
    if (initialPageIndex !== undefined) {
      return Math.max(chapterStartPage, Math.min(chapterEndPage, chapterStartPage + initialPageIndex))
    }
    return chapterStartPage
  }, [initialPageIndex, chapterStartPage, chapterEndPage])

  // PDF.js Engine Hook with strictly bounded chapter navigation
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
    pdfUrl: resolvedPdfUrl,
    initialPage: startPage,
    minPage: chapterStartPage,
    maxPage: chapterEndPage,
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
    return (p?.regions || []).filter((r: any) => r.type !== 'choose')
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

  // Reset rendered state when PDF starts loading or changes grade
  useEffect(() => {
    if (isLoading) {
      setIsInitialPageRendered(false)
    }
  }, [isLoading])

  // Reset evaluation guard if student changes
  useEffect(() => {
    const sId = activeStudentId || user?.id
    if (sId && sId !== lastEvaluatedStudentIdRef.current) {
      lastEvaluatedStudentIdRef.current = sId
      hasEvaluatedTourRef.current = false
    }
  }, [activeStudentId, user?.id])

  // Render current PDF page when page, scale, or book changes
  useEffect(() => {
    if (!pdfCanvasRef.current || isLoading) return
    let isCancelled = false

    renderPageToCanvas(pdfCanvasRef.current, currentPage, zoomScale).then((dim) => {
      if (!isCancelled && dim) {
        setPageDimensions(dim)
        setIsInitialPageRendered(true)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [currentPage, zoomScale, isLoading, renderPageToCanvas, currentGrade])

  // Spotlight tour is active only when opened AND initial page rendered AND not in loading state
  const isTourActive = isTourOpen && !isLoading && isInitialPageRendered

  // Suppresses active blue/colored tool backgrounds on toolbar items during the tour
  const isToolActive = (tool: StudioTool) => !isTourActive && activeTool === tool

  // ── PDF Annotation Toolbar Tour Timing & Synchronization ───────────────────
  // Waits until PDF is fully loaded, first page is rendered, and toolbar is mounted before evaluating tour
  useEffect(() => {
    // 1. Do not start while PDF document is loading
    if (isLoading) return

    // 2. Wait until the first page is successfully rendered to the canvas
    if (!isInitialPageRendered) return

    const sId = activeStudentId || user?.id
    if (!sId) return

    // 3. Prevent duplicate tour triggers across re-renders or page changes
    if (hasEvaluatedTourRef.current) return

    // 4. Verify annotation toolbar is mounted and ready in the DOM
    const moveToolEl = document.querySelector('[data-tour="tool-move"]')
    if (!moveToolEl) return

    // Mark as evaluated so page turns or state changes never trigger duplicate checks
    hasEvaluatedTourRef.current = true

    // Check for explicit session replay trigger
    const forceReplay = sessionStorage.getItem('replay_pdf_tutorial') === 'true'
    if (forceReplay) {
      sessionStorage.removeItem('replay_pdf_tutorial')
      setIsTourOpen(true)
      return
    }

    // Fast check: user profile flag from Supabase
    if (user?.profile?.pdf_tour_completed) {
      setIsTourOpen(false)
      return
    }

    // Fast check: localStorage cache
    try {
      if (localStorage.getItem(`student_pdf_tour_completed_${sId}`) === 'true') {
        setIsTourOpen(false)
        return
      }
    } catch {}

    // Database check: query Supabase via tourService
    let active = true
    tourService.isPdfTourCompleted(sId, user?.profile?.pdf_tour_completed)
      .then((isCompleted) => {
        if (!active) return
        if (!isCompleted) {
          setIsTourOpen(true)
        } else {
          setIsTourOpen(false)
        }
      })
      .catch((err) => {
        console.warn('PDF tour status check failed:', err)
        if (active) setIsTourOpen(false)
      })

    const handleTourCompleted = () => {
      setIsTourOpen(false)
    }

    window.addEventListener('student_pdf_tour_completed', handleTourCompleted)
    return () => {
      active = false
      window.removeEventListener('student_pdf_tour_completed', handleTourCompleted)
    }
  }, [
    isLoading,
    isInitialPageRendered,
    activeStudentId,
    user?.id,
    user?.profile?.pdf_tour_completed
  ])

  // ─── CHAPTER PROGRESS & COMPLETED PAGES STATE ───────────────────────────
  const [completedPagesInChapter, setCompletedPagesInChapter] = useState<number[]>([])

  const loadStudentCompletedPages = useCallback(async () => {
    try {
      const pages = await progressService.getCompletedPages(activeStudentId, currentGrade, currentChapterKey)
      setCompletedPagesInChapter(pages)
    } catch (e) {
      console.warn('Could not load completed pages:', e)
    }
  }, [activeStudentId, currentGrade, currentChapterKey])

  useEffect(() => {
    loadStudentCompletedPages()
    const handleProgressUpdate = (e: Event) => {
      const detail = (e as CustomEvent)?.detail
      if (detail && detail.studentId === activeStudentId && detail.chapterKey === currentChapterKey) {
        if (Array.isArray(detail.completedPages)) {
          setCompletedPagesInChapter(detail.completedPages)
          return
        }
      }
      loadStudentCompletedPages()
    }
    window.addEventListener('chapter_progress_updated', handleProgressUpdate)
    return () => {
      window.removeEventListener('chapter_progress_updated', handleProgressUpdate)
    }
  }, [loadStudentCompletedPages, activeStudentId, currentChapterKey])

  // Actual total pages driven dynamically by PDF metadata
  // Chapter-relative page number (e.g. 1 to 33 in Chapter 1)
  const chapterRelativePage = useMemo(() => {
    return Math.max(1, Math.min(chapterTotalPages, currentPage - chapterStartPage + 1))
  }, [currentPage, chapterStartPage, chapterTotalPages])

  // Precise chapter progress calculations matching required percentage specifications
  const chapterProg = useMemo(() => {
    return formatProgressPercentage(completedPagesInChapter.length, chapterTotalPages)
  }, [completedPagesInChapter.length, chapterTotalPages])

  const chapterProgressPct = chapterProg.numeric
  const chapterProgressFormatted = chapterProg.formatted

  const isFinalPageOfChapter = useMemo(() => {
    return currentPage >= chapterEndPage || chapterRelativePage >= chapterTotalPages
  }, [currentPage, chapterEndPage, chapterRelativePage, chapterTotalPages])

  const isChapterCompleted = useMemo(() => {
    return completedPagesInChapter.length >= chapterTotalPages && chapterTotalPages > 0
  }, [completedPagesInChapter.length, chapterTotalPages])

  const isCurrentPageCompleted = useMemo(() => {
    return completedPagesInChapter.includes(chapterRelativePage)
  }, [completedPagesInChapter, chapterRelativePage])

  const isAtFirstPageOfChapter = useMemo(() => {
    return currentPage <= chapterStartPage || chapterRelativePage <= 1
  }, [currentPage, chapterStartPage, chapterRelativePage])

  const isAtLastBookPage = useMemo(() => {
    return isFinalPageOfChapter
  }, [isFinalPageOfChapter])

  // ─── SAVE AND RESTORE LAST-READ PAGE LOGIC ─────────────────────────────
  const hasRestoredLastReadRef = useRef<boolean>(false)

  // Save student's current reading position in database and local cache
  const saveReadingPosition = useCallback((physicalPage: number) => {
    if (!physicalPage || physicalPage < 1) return
    const relPage = Math.max(1, Math.min(chapterTotalPages, physicalPage - chapterStartPage + 1))
    progressService.saveLastReadPage({
      studentId: activeStudentId,
      gradeKey: currentGrade,
      chapterKey: currentChapterKey,
      pageNumber: relPage,
      totalPages: chapterTotalPages,
      organizationId: user?.organization_id
    }).catch(err => {
      console.warn('Notice saving reading position:', err)
    })
  }, [activeStudentId, currentGrade, currentChapterKey, chapterStartPage, chapterTotalPages, user?.organization_id])

  // Restore saved last-read page when opening the chapter
  useEffect(() => {
    let isCancelled = false
    hasRestoredLastReadRef.current = false

    progressService.getLastReadPage({
      studentId: activeStudentId,
      gradeKey: currentGrade,
      chapterKey: currentChapterKey,
      fallbackStartPage: 1
    }).then((savedRelPage) => {
      if (!isCancelled && savedRelPage && savedRelPage >= 1) {
        const relTarget = Math.max(1, Math.min(chapterTotalPages, savedRelPage))
        const physicalTarget = chapterStartPage + relTarget - 1
        goToPage(physicalTarget)
      }
    }).catch((err) => {
      console.warn('Notice restoring last read page:', err)
    }).finally(() => {
      hasRestoredLastReadRef.current = true
    })

    return () => {
      isCancelled = true
    }
  }, [activeStudentId, currentGrade, currentChapterKey, goToPage, chapterStartPage, chapterTotalPages])

  // Continuously persist student's reading position on navigation (debounced by 300ms)
  useEffect(() => {
    if (!hasRestoredLastReadRef.current && currentPage === chapterStartPage) return
    const timer = setTimeout(() => {
      saveReadingPosition(currentPage)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentPage, saveReadingPosition, chapterStartPage])

  // Save reading position safely when unmounting or leaving viewer
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentPage) {
        saveReadingPosition(currentPage)
      }
      progressService.flushPendingUpdates().catch(() => {})
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (currentPage) {
        saveReadingPosition(currentPage)
      }
      progressService.flushPendingUpdates().catch(() => {})
    }
  }, [currentPage, saveReadingPosition])

  // ─── NEXT PAGE & CHAPTER COMPLETION ACTIONS ─────────────────────────────
  // Next Page action: instant page flip with asynchronous background persistence
  const handleNextPageAction = () => {
    const currRel = chapterRelativePage
    const currPhysical = currentPage

    // 1. Instant optimistic update: mark current relative page completed locally
    setCompletedPagesInChapter((prev) => {
      if (prev.includes(currRel)) return prev
      return [...prev, currRel].sort((a, b) => a - b)
    })

    // 2. Instant navigation if not at final page of the chapter
    if (currPhysical < chapterEndPage && currRel < chapterTotalPages) {
      const nextPhysical = currPhysical + 1
      gameAudio.playTap()
      nextPage()

      // 3. Asynchronous background persistence (never blocks UI or rendering)
      saveReadingPosition(nextPhysical)
      progressService.recordPdfPageCompletion({
        studentId: activeStudentId,
        gradeKey: currentGrade,
        chapterKey: currentChapterKey,
        pageNumber: currRel,
        totalPages: chapterTotalPages,
        organizationId: user?.organization_id,
      }).catch((err) => {
        console.warn('Background notice recording page completion:', err)
      })
    } else {
      // On final page: handle chapter completion or final page completion
      handleCompleteChapterAction()
    }
  }

  const handlePaddleNext = () => {
    handleNextPageAction()
  }

  // Active in-page learning interaction marks page complete
  const handlePageActivity = useCallback((_pageNum?: number) => {
    const relPage = chapterRelativePage
    setCompletedPagesInChapter((prev) => {
      if (prev.includes(relPage)) return prev
      return [...prev, relPage].sort((a, b) => a - b)
    })
    progressService.recordPdfPageCompletion({
      studentId: activeStudentId,
      gradeKey: currentGrade,
      chapterKey: currentChapterKey,
      pageNumber: relPage,
      totalPages: chapterTotalPages,
      organizationId: user?.organization_id,
    }).catch(err => {
      console.warn('Notice recording page completion from activity:', err)
    })
  }, [activeStudentId, currentGrade, currentChapterKey, chapterRelativePage, chapterTotalPages, user?.organization_id])

  // Manual mark current page complete toggle
  const handleMarkCurrentPageComplete = () => {
    const relPage = chapterRelativePage
    const newPages = completedPagesInChapter.includes(relPage)
      ? completedPagesInChapter
      : [...completedPagesInChapter, relPage].sort((a, b) => a - b)

    setCompletedPagesInChapter(newPages)
    gameAudio.playCoin()
    confetti({ particleCount: 20, spread: 50 })

    const isAllDone = newPages.length >= chapterTotalPages && chapterTotalPages > 0
    if (isAllDone) {
      gameAudio.playLevelUp()
      toast.success(`Page ${relPage} done! Chapter 100% Completed! 🎉`)
    } else {
      toast.success(`Page ${relPage} completed! ⭐ (${newPages.length} of ${chapterTotalPages} pages)`)
    }

    progressService.recordPdfPageCompletion({
      studentId: activeStudentId,
      gradeKey: currentGrade,
      chapterKey: currentChapterKey,
      pageNumber: relPage,
      totalPages: chapterTotalPages,
      organizationId: user?.organization_id,
    }).catch(err => {
      console.warn('Could not mark page complete:', err)
    })
  }

  const handleCompleteChapterAction = () => {
    const currRel = chapterRelativePage
    const newPages = completedPagesInChapter.includes(currRel)
      ? completedPagesInChapter
      : [...completedPagesInChapter, currRel].sort((a, b) => a - b)

    setCompletedPagesInChapter(newPages)

    progressService.recordPdfPageCompletion({
      studentId: activeStudentId,
      gradeKey: currentGrade,
      chapterKey: currentChapterKey,
      pageNumber: currRel,
      totalPages: chapterTotalPages,
      organizationId: user?.organization_id,
    }).catch((err) => {
      console.warn('Error recording chapter completion:', err)
    })

    const isAllDone = newPages.length >= chapterTotalPages && chapterTotalPages > 0
    if (isAllDone) {
      gameAudio.playLevelUp()
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } })
      toast.success(`🎉 You completed ${chapterTitle || currentChapterDef?.title || 'Chapter'}! (100%)`)
      onComplete?.()
    } else {
      gameAudio.playCoin()
      toast.success(`Page ${currRel} completed! (${newPages.length} of ${chapterTotalPages} pages done)`, { icon: '⭐' })
    }
  }

  // Action: Navigate to next chapter once 100% completed, or celebrate course finish on finale
  const handleContinueToNextChapter = useCallback(() => {
    if (isFinalChapter || !nextChapter) {
      // Final chapter completed - handle completion appropriately without navigating to nonexistent chapter
      gameAudio.playVictory()
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } })
      toast.success(`🎉 Congratulations! You have completed all chapters in ${currentGrade.toUpperCase()}!`, {
        icon: '🏆',
        duration: 4000
      })
      onComplete?.()
      return
    }

    gameAudio.playSuccess()
    toast.success(`🚀 Continuing to ${nextChapter.title}!`, { icon: '📖' })

    // 1. Notify parent via callback
    if (onNavigateChapter) {
      onNavigateChapter(nextChapter.key)
      return
    }

    // 2. React Router location update if inside chapters viewer
    if (typeof window !== 'undefined' && window.location.pathname.includes('/student/learning/chapters')) {
      window.history.pushState({}, '', `/student/learning/chapters/${nextChapter.key}`)
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }

    // 3. Fallback: update internal chapter state
    setInternalChapterKey(nextChapter.key)
  }, [isFinalChapter, nextChapter, currentGrade, onComplete, onNavigateChapter])

  // Keyboard navigation & gestures
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (!isFinalPageOfChapter) {
          handleNextPageAction()
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (!isAtFirstPageOfChapter) {
          prevPage()
          saveReadingPosition(Math.max(chapterStartPage, currentPage - 1))
          gameAudio.playTap()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNextPageAction, prevPage, saveReadingPosition, currentPage, isFinalPageOfChapter, isAtFirstPageOfChapter, chapterStartPage])

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
      className="w-full h-full min-h-0 flex-1 flex flex-col bg-[#f8fafc] text-slate-800 font-sans select-none overflow-hidden relative"
    >
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <header className="hidden lg:flex flex-shrink-0 h-11 sm:h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2 sm:px-4 items-center justify-between gap-1 sm:gap-3 z-30 shadow-2xs">
        {/* Left: Back button + Class Locked Badge */}
        <div className="flex items-center gap-1 sm:gap-2.5 min-w-0 shrink-0">
          {onExit && (
            <button
              onClick={() => {
                saveReadingPosition(currentPage)
                onExit()
              }}
              title="Back to Chapters"
              className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer mr-0.5"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Chapters</span>
            </button>
          )}

          {/* Class / Grade Badge (Locked for students so they cannot view other classes) */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-blue-50 text-blue-700 border border-blue-200/90 font-black text-xs sm:text-sm rounded-xl shrink-0 shadow-2xs">
            <BookOpen size={12} className="text-blue-600 shrink-0" />
            <span className="whitespace-nowrap font-extrabold capitalize">
              {GRADE_OPTIONS.find((o) => o.key === currentGrade)?.label?.split('•')[0].trim() || 'Class 3'}
            </span>
          </div>

          {/* Chapter Selector (Desktop only) */}
          <select
            value={currentChapterDef?.key || 'intro'}
            onChange={(e) => {
              const targetKey = e.target.value
              const chs = getClassChapters(currentGrade)
              const found = chs.find(c => c.key === targetKey)
              if (found) {
                goToPage(found.startPage)
                saveReadingPosition(found.startPage)
                gameAudio.playTap()
              }
            }}
            className="hidden lg:block max-w-[220px] truncate bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-200 outline-none cursor-pointer transition-colors"
          >
            {getClassChapters(currentGrade).map((ch, idx) => (
              <option key={idx} value={ch.key}>
                {ch.code}: {ch.title}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Page Number & Jumper & Completion Indicator */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-100/90 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xl border border-slate-200/90 text-slate-800 shrink-0 shadow-2xs">
          <button
            onClick={() => {
              prevPage()
              saveReadingPosition(Math.max(chapterStartPage, currentPage - 1))
              gameAudio.playTap()
            }}
            disabled={isAtFirstPageOfChapter}
            title="Previous Page (Left Arrow)"
            className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer rounded-lg hover:bg-white transition-colors"
          >
            <ChevronLeft size={15} />
          </button>

          <span className="text-[11px] sm:text-xs font-black text-slate-800 px-1 whitespace-nowrap flex items-center gap-1">
            Page {chapterRelativePage} <span className="text-slate-400 font-normal">of {chapterTotalPages}</span>
            {isCurrentPageCompleted && (
              <span title="Page Completed">
                <CheckCircle2 size={13} className="text-emerald-500 fill-emerald-100 shrink-0" />
              </span>
            )}
          </span>

          <button
            onClick={() => {
              handleNextPageAction()
            }}
            disabled={isFinalPageOfChapter}
            title="Next Page (Right Arrow)"
            className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer rounded-lg hover:bg-white transition-colors"
          >
            <ChevronRight size={15} />
          </button>

          <button
            onClick={handleMarkCurrentPageComplete}
            disabled={isCurrentPageCompleted}
            title={isCurrentPageCompleted ? 'Page already completed' : 'Mark current page as completed'}
            className={`hidden xs:flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
              isCurrentPageCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 opacity-90'
                : 'bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200 shadow-2xs'
            }`}
          >
            <Check size={11} className={isCurrentPageCompleted ? 'text-emerald-600 stroke-[3]' : 'text-slate-400'} />
            <span>{isCurrentPageCompleted ? 'Done' : 'Mark Done'}</span>
          </button>
        </div>

        {/* Right: Stars & Zoom / Fit */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Tutorial / Tour Button */}
          <button
            onClick={() => {
              if (isLoading || !isInitialPageRendered) return
              setIsTourOpen(true)
              gameAudio.playTap()
            }}
            disabled={isLoading || !isInitialPageRendered}
            title="Interactive PDF Tools Tutorial"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-white hover:bg-blue-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-blue-600 hover:text-blue-700 rounded-xl border border-blue-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles size={13} className="text-blue-500" />
            <span className="hidden sm:inline text-[11px] font-bold">Tutorial</span>
          </button>
          {/* Undo Action */}
          <button
            onClick={() => {
              setUndoSignal((prev) => prev + 1)
              gameAudio.playTap()
            }}
            title="Undo last action (Ctrl+Z)"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Undo2 size={13} className="text-amber-500" />
            <span className="hidden xs:inline text-[11px] font-bold">Undo</span>
          </button>

          {/* Stars Collected */}
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-amber-50 border border-amber-300/80 rounded-xl text-amber-700 font-black text-[11px] sm:text-xs shadow-2xs">
            <Star size={13} className="fill-amber-400 text-amber-500 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          {/* Zoom controls with Fit to Screen */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/90 text-slate-700 shadow-2xs">
            <button
              onClick={() => {
                setZoomScale((z) => Math.max(0.4, parseFloat((z - 0.1).toFixed(2))))
                gameAudio.playTap()
              }}
              title="Zoom Out"
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 px-1 min-w-[34px] sm:min-w-[40px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => {
                setZoomScale((z) => Math.min(2.0, parseFloat((z + 0.1).toFixed(2))))
                gameAudio.playTap()
              }}
              title="Zoom In"
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ZoomIn size={13} />
            </button>
            <div className="h-3.5 w-px bg-slate-300 mx-0.5 hidden xs:block" />
            <button
              onClick={() => {
                const fit = computeFitScale()
                setZoomScale(fit)
                gameAudio.playTap()
                toast.success('Fitted to screen!', { id: 'fit-toast', duration: 1500 })
              }}
              title="Fit to Screen"
              className="hidden xs:flex items-center gap-1 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 size={11} />
              <span>Fit</span>
            </button>
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
        className={`flex-1 w-full min-h-0 overflow-auto bg-[#f8fafc] relative select-none scroll-smooth ${
          activeTool === 'hand' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
      >
        {/* Error State Overlay */}
        {error && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-50 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center mb-3 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">Unable to Load PDF Book</h4>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        )}

        {/* Modern Professional Loader without any text */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all duration-300">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-slate-100">
              <div className="absolute inset-2 rounded-xl border-2 border-blue-500/20 animate-ping opacity-75" />
              <div className="w-10 h-10 rounded-full border-[3px] border-slate-200 border-t-blue-600 border-r-indigo-600 animate-spin" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs shadow-blue-500" />
            </div>
          </div>
        )}

        {/* ── Main Layout: PDF & Progress Row in Center Column + Complete Vertical Toolbar on the Right ── */}
        <div className="min-h-full min-w-full flex items-start justify-center p-0 sm:p-4 md:p-6 pb-0 sm:pb-8">
          <div className="flex flex-row items-start justify-center gap-0 sm:gap-3 md:gap-4 max-w-full">
            
            {/* ── Center Column: PDF Canvas + Progress Bar immediately below it ── */}
            <div className="flex flex-col items-center shrink-0">
              {/* Authentic Book Page + Unified In-Page Interaction Layer */}
              <div
                className="relative shadow-none sm:shadow-[0_12px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] sm:hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] rounded-none sm:rounded-2xl overflow-visible bg-white border-0 sm:border border-slate-200/90 transition-shadow duration-200 shrink-0"
                style={{
                  width: `${pageDimensions.width}px`,
                  height: `${pageDimensions.height}px`,
                }}
              >
                {/* ── Near Navigation Arrow: Left (Previous Page) ──────────── */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPage()
                    saveReadingPosition(Math.max(chapterStartPage, currentPage - 1))
                    gameAudio.playTap()
                  }}
                  disabled={isAtFirstPageOfChapter}
                  title="Previous Page (Left Arrow)"
                  className="absolute left-1 sm:-left-6 md:-left-7 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none group cursor-pointer backdrop-blur-xs"
                >
                  <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* ── Near Navigation Arrow: Right (Next Page) ─────────── */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextPageAction()
                  }}
                  disabled={isFinalPageOfChapter}
                  title="Next Page (Right Arrow)"
                  className="absolute right-1 sm:-right-6 md:-right-7 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none group cursor-pointer backdrop-blur-xs"
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Book Inner Canvas Wrapper (with rounded corners and overflow hidden) */}
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
                  {/* Layer 1: High-DPI Crisp PDF.js Canvas */}
                  <canvas ref={pdfCanvasRef} className="block w-full h-full" />

                  {/* Layer 2: Unified In-Page Interactive Layer */}
                  <UnifiedPdfInteractionLayer
                    studentId={activeStudentId}
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
                    onPageActivity={handlePageActivity}
                    onWordClick={wordsLayer.speakWord}
                    onWordSpell={wordsLayer.spellWord}
                  />
                </div>
              </div>

              {/* ── PDF Viewer Bottom Progress Bar (Directly below PDF document) ── */}
              <div
                className="w-full mt-0 sm:mt-3 flex items-center justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2.5 bg-white/95 backdrop-blur-md rounded-none sm:rounded-2xl border-t border-b-0 sm:border border-slate-200/90 shadow-xs sm:shadow-sm shrink-0 select-none z-20"
                style={{ width: `${pageDimensions.width}px`, maxWidth: '100%' }}
              >
                {/* Left: Progress label and percentage */}
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 min-w-0">
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-700 whitespace-nowrap">
                    Progress
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm font-black text-blue-600 whitespace-nowrap">
                    {chapterProgressFormatted}
                  </span>
                  <span className="sm:hidden text-[10px] text-slate-400 font-bold ml-0.5">
                    ({chapterRelativePage}/{chapterTotalPages})
                  </span>
                </div>

                {/* Middle: Progress Bar */}
                <div className="flex-1 flex items-center min-w-[60px] mx-1 sm:mx-2">
                  <div className="w-full bg-slate-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ease-out ${
                        isChapterCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${chapterProgressPct}%` }}
                    />
                  </div>
                </div>

                {/* Right: Next Page / Continue to Next Chapter button */}
                <div className="shrink-0 flex items-center">
                  {isChapterCompleted ? (
                    // ── 100% Chapter Progress Reached: Continue to Next Chapter or Course Completed ──
                    isFinalChapter ? (
                      <button
                        onClick={handleContinueToNextChapter}
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                        title="Course Completed - All chapters finished!"
                      >
                        <span>Course Completed</span>
                        <Check size={14} className="stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        onClick={handleContinueToNextChapter}
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                        title={`Continue to Next Chapter: ${nextChapter?.title || 'Next'}`}
                      >
                        <span>Continue to Next Chapter</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    )
                  ) : (
                    // ── Before 100% Progress: Keep existing Next button unchanged ──
                    <button
                      onClick={handleNextPageAction}
                      disabled={isAtLastBookPage && isCurrentPageCompleted}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                      title="Next Page"
                    >
                      <span>Next</span>
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right Column: Complete Vertical PDF Toolbar (Right Side of PDF Viewer) ── */}
            <div
              data-tour="pdf-toolbar"
              className="sticky top-0 sm:top-4 right-0 mr-0 shrink-0 flex flex-col items-center gap-1 sm:gap-1.5 p-0.5 sm:p-1.5 md:p-2 bg-slate-900/95 backdrop-blur-md rounded-none rounded-l-xl sm:rounded-2xl border-y-0 border-r-0 border-l sm:border border-white/15 shadow-2xl z-30 max-h-[calc(100vh-115px)] sm:max-h-[calc(100vh-90px)] overflow-y-auto overflow-x-hidden scrollbar-thin select-none"
            >
              {/* 1. Move (Hand) Tool */}
              <button
                data-tour="tool-move"
                onClick={() => {
                  setActiveTool('hand')
                  gameAudio.playTap()
                }}
                title="Move / Pan page"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('hand')
                    ? 'bg-amber-600 text-white shadow-md scale-105 ring-2 ring-amber-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Hand size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Move</span>
              </button>

              {/* 2. Color Fill Tool */}
              <button
                data-tour="tool-color"
                onClick={() => {
                  setActiveTool('fill')
                  gameAudio.playTap()
                }}
                title="Color worksheets and shapes"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('fill')
                    ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <PaintBucket size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Color</span>
              </button>

              {/* 3. Write (Pen) Tool */}
              <button
                data-tour="tool-write"
                onClick={() => {
                  setActiveTool('pen')
                  gameAudio.playTap()
                }}
                title="Write and draw on the page"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('pen')
                    ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Pen size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Write</span>
              </button>

              {/* 4. Highlight Tool */}
              <button
                data-tour="tool-highlighter"
                onClick={() => {
                  setActiveTool('highlighter')
                  gameAudio.playTap()
                }}
                title="Highlight text and shapes"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('highlighter')
                    ? 'bg-yellow-500 text-slate-950 shadow-md scale-105 ring-2 ring-yellow-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Highlighter size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Highlight</span>
              </button>

              {/* 5. Star Tool */}
              <button
                data-tour="tool-star"
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
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                  isToolActive('stamp')
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-105 ring-2 ring-amber-300'
                    : 'text-amber-300 hover:bg-white/10'
                }`}
              >
                <span className="text-sm sm:text-base leading-none select-none drop-shadow">⭐</span>
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Star</span>
                {isToolActive('stamp') && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
                )}
              </button>

              {/* 6. Erase Tool */}
              <button
                data-tour="tool-erase"
                onClick={() => {
                  setActiveTool('eraser')
                  gameAudio.playTap()
                }}
                title="Erase marks & color fills (tap color to flood-erase, or drag to erase)"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('eraser')
                    ? 'bg-rose-600 text-white shadow-md scale-105 ring-2 ring-rose-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Eraser size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Erase</span>
              </button>

              {/* 7. Clear All Tool */}
              <button
                data-tour="tool-clear"
                onClick={() => {
                  setClearSignal((prev) => prev + 1)
                  gameAudio.playTap()
                  toast.success('Cleared annotations on this page')
                }}
                title="Clear all drawings and color fills on this page"
                className="w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all bg-rose-700/80 hover:bg-rose-600 text-white shadow-md active:scale-95 cursor-pointer"
              >
                <Trash2 size={15} className="sm:w-4 sm:h-4 text-white" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Clear</span>
              </button>

              {/* 8. Type Tool */}
              <button
                data-tour="tool-type"
                onClick={() => {
                  setActiveTool('text')
                  gameAudio.playTap()
                }}
                title="Type answers anywhere on the page"
                className={`w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isToolActive('text')
                    ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-300'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Type size={15} className="sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Type</span>
              </button>

              {/* 9. Undo Tool */}
              <button
                data-tour="tool-undo"
                onClick={() => {
                  setUndoSignal((prev) => prev + 1)
                  gameAudio.playTap()
                }}
                title="Undo last action (Ctrl+Z)"
                className="w-9 sm:w-11 md:w-12 py-1 sm:py-1.5 px-0.5 rounded-lg sm:rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all text-slate-300 hover:bg-white/10 active:scale-95 hover:text-amber-300 cursor-pointer"
              >
                <Undo2 size={15} className="text-amber-400 sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] font-extrabold mt-0.5 leading-none tracking-tight">Undo</span>
              </button>

              {/* 10. Color Palette Selector */}
              <div className="flex flex-col items-center gap-1 pt-1.5 border-t border-white/15 w-full">
                <div className="grid grid-cols-2 gap-1">
                  {PALETTE_COLORS.map((col) => (
                    <button
                      key={col}
                      onClick={() => {
                        setActiveColor(col)
                        if (!['pen', 'fill', 'highlighter'].includes(activeTool)) {
                          setActiveTool('pen')
                        }
                        gameAudio.playTap()
                      }}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-transform cursor-pointer ${
                        activeColor === col
                          ? 'scale-125 border-white shadow-md ring-2 ring-blue-400 z-10'
                          : 'border-transparent hover:scale-110 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: col }}
                      title={`Select color ${col}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Contextual Spotlight Onboarding Tour for PDF Tools ── */}
      <PdfToolbarSpotlightTour
        isOpen={isTourActive}
        onClose={() => {
          setIsTourOpen(false)
          if (user?.profile) {
            user.profile.pdf_tour_completed = true
          }
        }}
        onComplete={() => {
          setIsTourOpen(false)
          if (user?.profile) {
            user.profile.pdf_tour_completed = true
          }
          toast.success('Tour completed! You are ready to explore the book!', { icon: '🚀' })
        }}
        studentId={activeStudentId || user?.id}
        organizationId={user?.organization_id}
      />
    </div>
  )
}

export default GaioInteractiveBookApp
