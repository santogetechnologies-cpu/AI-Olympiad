// ─────────────────────────────────────────────────────────────────────────────
// GAIO INTERACTIVE BOOK APPLICATION
// Digital Book Experience based 100% on GAIO Class3 Book.pdf (All 153 Pages)
// PDF Page Count != Website Page Count: 286 Interactive Website Screens
// Zero scrolling anywhere: Mobile-first page turning with full interactive activities.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { GaioScreenItem } from './types'
import { getScreensForAnyGrade } from './config/universalGradeScreens'
import type { GradeKey } from '../../services/progressService'
import { CLASS3_BOOK_ALL_SCREENS } from './config/class3BookScreens'
import { CLASS4_BOOK_ALL_SCREENS } from './config/class4BookScreens'
import { CLASS5_BOOK_ALL_SCREENS } from './config/class5BookScreens'
import { GaioBookShell } from './primitives/GaioBookShell'
import { GaioBookNav } from './primitives/GaioBookNav'
import { GaioScreenRenderer } from './renderers/GaioScreenRenderer'
import { useGaioBookProgress } from './hooks/useGaioBookProgress'
import { gameAudio } from '../../utils/gameAudio'
import { auraSpeechService } from '../../services/auraSpeechService'
import {
  BookOpen,
  X,
  CheckCircle2,
  Star,
  Sparkles,
  FileText,
  Search,
  Filter,
  RotateCcw,
  ArrowRight,
  Bot,
  MessageSquare,
  Compass,
  Rocket,
  Palette,
  HeartHandshake,
  Trophy,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export const CHAPTER_ITEM_KEYS = ['intro', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'finale']

interface ChapterCardMeta {
  m: number
  number: string
  title: string
  subtitle: string
  pageRange: string
  icon: React.ElementType
  gradient: string
  badgeBg: string
}

const CLASS3_METADATA: ChapterCardMeta[] = [
  {
    m: 0,
    number: 'Intro',
    title: 'Welcome & AI Intro',
    subtitle: 'Orientation & Tools',
    pageRange: 'p. 1–4',
    icon: Sparkles,
    gradient: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    m: 1,
    number: 'Ch 1',
    title: 'AI Discover',
    subtitle: 'My AI Friend & Sensors',
    pageRange: 'p. 5–27',
    icon: Bot,
    gradient: 'from-blue-600 to-indigo-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    m: 2,
    number: 'Ch 2',
    title: 'AI Connect',
    subtitle: 'Commands & Prompts',
    pageRange: 'p. 28–50',
    icon: MessageSquare,
    gradient: 'from-indigo-600 to-violet-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    m: 3,
    number: 'Ch 3',
    title: 'AI Solve',
    subtitle: 'School & Home Helpers',
    pageRange: 'p. 51–73',
    icon: Compass,
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    m: 4,
    number: 'Ch 4',
    title: 'AI Rise',
    subtitle: 'Robots, Drones & Careers',
    pageRange: 'p. 74–96',
    icon: Rocket,
    gradient: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    m: 5,
    number: 'Ch 5',
    title: 'AI Create',
    subtitle: 'Art, Music & Stories',
    pageRange: 'p. 97–119',
    icon: Palette,
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    m: 6,
    number: 'Ch 6',
    title: 'AI Care',
    subtitle: 'Safety & Digital Kindness',
    pageRange: 'p. 120–142',
    icon: HeartHandshake,
    gradient: 'from-teal-500 to-cyan-600',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    m: 7,
    number: 'Finale',
    title: 'Olympiad Mastery',
    subtitle: 'Challenge & Certificate',
    pageRange: 'p. 143–153',
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

const CLASS4_METADATA: ChapterCardMeta[] = [
  {
    m: 0,
    number: 'Intro',
    title: 'Welcome & Robo-Pi',
    subtitle: 'Detective Orientation & Tools',
    pageRange: 'p. 1–4',
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    m: 1,
    number: 'Ch 1',
    title: 'AI Basics',
    subtitle: 'Where Is AI Hiding? & Smart Machines',
    pageRange: 'p. 20–39',
    icon: Bot,
    gradient: 'from-emerald-600 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    m: 2,
    number: 'Ch 2',
    title: 'Communicate with AI',
    subtitle: 'Say It Clearly! & Mission Instructions',
    pageRange: 'p. 40–59',
    icon: MessageSquare,
    gradient: 'from-blue-600 to-indigo-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    m: 3,
    number: 'Ch 3',
    title: 'AI Applications',
    subtitle: 'AI in My Mobile & AI on the Move',
    pageRange: 'p. 60–79',
    icon: Compass,
    gradient: 'from-sky-500 to-cyan-600',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    m: 4,
    number: 'Ch 4',
    title: 'AI and Career',
    subtitle: 'Future Job Hunt & Technology Talent',
    pageRange: 'p. 80–99',
    icon: Rocket,
    gradient: 'from-purple-500 to-violet-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    m: 5,
    number: 'Ch 5',
    title: 'AI Tools',
    subtitle: 'Create a Story & Design with AI',
    pageRange: 'p. 100–119',
    icon: Palette,
    gradient: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    m: 6,
    number: 'Ch 6',
    title: 'Responsible AI',
    subtitle: 'Secret or Share? & Right or Wrong?',
    pageRange: 'p. 120–139',
    icon: HeartHandshake,
    gradient: 'from-amber-500 to-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    m: 7,
    number: 'Finale',
    title: 'Olympiad Mastery',
    subtitle: 'Robo-Pi Challenge & Certificate',
    pageRange: 'p. 140–152',
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

const CLASS5_METADATA: ChapterCardMeta[] = [
  {
    m: 0,
    number: 'Intro',
    title: 'Welcome & Data-Volt',
    subtitle: 'Neural Lab Orientation',
    pageRange: 'p. 1–4',
    icon: Sparkles,
    gradient: 'from-violet-600 to-indigo-600',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  {
    m: 1,
    number: 'Ch 1',
    title: 'AI Basics',
    subtitle: 'Secret Behind AI & Learning Machines',
    pageRange: 'p. 20–39',
    icon: Bot,
    gradient: 'from-indigo-600 to-cyan-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    m: 2,
    number: 'Ch 2',
    title: 'Communicate with AI',
    subtitle: 'Crack the Logic! & Command to Creation',
    pageRange: 'p. 40–59',
    icon: MessageSquare,
    gradient: 'from-blue-600 to-teal-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    m: 3,
    number: 'Ch 3',
    title: 'AI Applications',
    subtitle: 'Hospital AI & Classroom AI',
    pageRange: 'p. 60–79',
    icon: Compass,
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    m: 4,
    number: 'Ch 4',
    title: 'AI and Career',
    subtitle: 'Future with AI & Skills of Tomorrow',
    pageRange: 'p. 80–99',
    icon: Rocket,
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    m: 5,
    number: 'Ch 5',
    title: 'AI Tools',
    subtitle: 'AI Study Buddy & Creative Corner',
    pageRange: 'p. 100–119',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  {
    m: 6,
    number: 'Ch 6',
    title: 'Responsible AI',
    subtitle: 'Can AI Be Wrong? & Smart AI User',
    pageRange: 'p. 120–139',
    icon: HeartHandshake,
    gradient: 'from-cyan-600 to-blue-600',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    m: 7,
    number: 'Finale',
    title: 'Olympiad Mastery',
    subtitle: 'Data-Volt Championship & Certificate',
    pageRange: 'p. 140–152',
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

export interface GaioInteractiveBookAppProps {
  onComplete?: () => void
  onExit?: () => void
  initialPageIndex?: number
  initialMonth?: number // 1 to 6
  initialTopic?: number // 1 to 12
  topicFilter?: number // legacy prop mapped to initialTopic
  monthFilter?: number // legacy prop mapped to initialMonth
  scopedMonth?: number // When scoped to an individual chapter, loads ONLY this chapter's screens (1 to 6)
  chapterTitle?: string
  chapterNumber?: number | string
  studentName?: string
  gradeKey?: GradeKey | string
}

export const GaioInteractiveBookApp: React.FC<GaioInteractiveBookAppProps> = ({
  onComplete,
  onExit,
  initialPageIndex,
  initialMonth,
  initialTopic,
  topicFilter,
  monthFilter,
  scopedMonth,
  chapterTitle,
  chapterNumber,
  studentName = 'AI Explorer',
  gradeKey = 'class3'
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const gradeTitle = useMemo(() => {
    const k = String(gradeKey).toLowerCase()
    if (k.startsWith('ug')) return `UG ${k.replace('ug', '')}${k.includes('1') ? 'st' : k.includes('2') ? 'nd' : k.includes('3') ? 'rd' : 'th'} Year`
    if (k.startsWith('pg')) return `PG ${k.replace('pg', '')}${k.includes('1') ? 'st' : ' Final'} Year`
    if (k.startsWith('class')) return `Class ${k.replace('class', '')}`
    return 'Class 3'
  }, [gradeKey])

  const chapterMetaList = useMemo(() => {
    if (gradeKey === 'class4') return CLASS4_METADATA
    if (gradeKey === 'class5') return CLASS5_METADATA
    return CLASS3_METADATA
  }, [gradeKey])

  const rawScreens: GaioScreenItem[] = useMemo(() => {
    return getScreensForAnyGrade(gradeKey)
  }, [gradeKey])

  // 1. When scopedMonth is set, load ONLY that specific chapter's interactive screens!
  const screens: GaioScreenItem[] = useMemo(() => {
    if (scopedMonth !== undefined && scopedMonth !== null) {
      const filtered = rawScreens.filter((s) => s.monthNumber === scopedMonth)
      return filtered.length > 0 ? filtered : rawScreens
    }
    return rawScreens
  }, [rawScreens, scopedMonth])

  const TOTAL_WEBSITE_SCREENS = screens.length
  const TOTAL_PDF_PAGES = 153

  const targetTopic = initialTopic || topicFilter
  const targetMonth = scopedMonth !== undefined ? scopedMonth : (initialMonth || monthFilter)

  // 2. Resolve initial screen index from URL query param or chapter scope
  const resolvedInitialIndex = useMemo(() => {
    const urlScreenParam = searchParams.get('screen')
    if (urlScreenParam) {
      const parsedNum = parseInt(urlScreenParam, 10)
      if (!isNaN(parsedNum)) {
        const foundIdx = screens.findIndex((s) => s.screenNumber === parsedNum)
        if (foundIdx >= 0) return foundIdx
      }
    }

    const urlPdfParam = searchParams.get('pdfPage')
    if (urlPdfParam) {
      const parsedPdf = parseInt(urlPdfParam, 10)
      if (!isNaN(parsedPdf)) {
        const foundIdx = screens.findIndex((s) => s.pdfPageNumber === parsedPdf)
        if (foundIdx >= 0) return foundIdx
      }
    }

    if (scopedMonth !== undefined && scopedMonth !== null) {
      // For an individual chapter view, always start from the chapter's first screen (index 0)
      return 0
    }

    const urlMonthParam = searchParams.get('month')
    if (urlMonthParam) {
      const parsedMonth = parseInt(urlMonthParam, 10)
      if (!isNaN(parsedMonth)) {
        const found = screens.findIndex((s) => s.monthNumber === parsedMonth)
        if (found >= 0) return found
      }
    }

    const urlChapterParam = searchParams.get('chapter')
    if (urlChapterParam) {
      const parsedChap = parseInt(urlChapterParam, 10)
      if (!isNaN(parsedChap)) {
        const found = screens.findIndex((s) => s.monthNumber === parsedChap)
        if (found >= 0) return found
      }
    }

    if (initialPageIndex !== undefined && initialPageIndex >= 0 && initialPageIndex < screens.length) {
      return initialPageIndex
    }

    if (targetTopic) {
      const found = screens.findIndex((s) => s.topicNumber === targetTopic)
      if (found >= 0) return found
    }

    if (targetMonth) {
      const found = screens.findIndex((s) => s.monthNumber === targetMonth)
      if (found >= 0) return found
    }

    return 0
  }, [searchParams, screens, scopedMonth, initialPageIndex, targetTopic, targetMonth])

  // 3. Persistent Student Progress State
  const {
    state: progressState,
    setCurrentScreenIndex: setStoredScreenIndex,
    setStudentAnswer,
    markScreenComplete,
    addStars,
    updateStudentName
  } = useGaioBookProgress(resolvedInitialIndex, studentName)

  const [currentIndex, setCurrentIndex] = useState<number>(resolvedInitialIndex)
  const [showTOC, setShowTOC] = useState<boolean>(searchParams.get('toc') === 'true')
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false)
  const [pdfPreviewTab, setPdfPreviewTab] = useState<'crop' | 'full' | 'assets'>('crop')
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [tocFilterMonth, setTocFilterMonth] = useState<number | null>(() => scopedMonth ?? null)
  const [tocSearch, setTocSearch] = useState<string>('')
  const [jumpPdfInput, setJumpPdfInput] = useState<string>('')
  const [jumpScreenInput, setJumpScreenInput] = useState<string>('')
  const [showChapterCompletionModal, setShowChapterCompletionModal] = useState<boolean>(false)

  // React to prop changes (e.g. user selected another chapter from LMS)
  useEffect(() => {
    let targetIdx: number | null = null
    if (initialPageIndex !== undefined && initialPageIndex >= 0 && initialPageIndex < screens.length) {
      targetIdx = initialPageIndex
    } else if (targetTopic) {
      const found = screens.findIndex((s) => s.topicNumber === targetTopic)
      if (found >= 0) targetIdx = found
    } else if (targetMonth !== undefined && targetMonth !== null) {
      const found = screens.findIndex((s) => s.monthNumber === targetMonth)
      if (found >= 0) targetIdx = found
    }

    if (targetIdx !== null && targetIdx >= 0 && targetIdx < screens.length && targetIdx !== currentIndex) {
      setCurrentIndex(targetIdx)
      setStoredScreenIndex(targetIdx)
    }
  }, [initialPageIndex, targetTopic, targetMonth, screens])

  // Safe active screen reference
  const activeScreen: GaioScreenItem = screens[currentIndex] || screens[0]

  // Sync index to URL search params & speech stop
  useEffect(() => {
    auraSpeechService.stop()
    setIsSpeaking(false)

    // Update URL query parameters without full page reload
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set('screen', String(activeScreen.screenNumber))
    currentParams.set('pdfPage', String(activeScreen.pdfPageNumber))
    const newSearch = currentParams.toString()
    if (window.location.search !== `?${newSearch}`) {
      window.history.replaceState(null, '', `?${newSearch}`)
    }
  }, [currentIndex, activeScreen])

  useEffect(() => {
    return () => {
      auraSpeechService.stop()
    }
  }, [])

  const handlePrevScreen = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setStoredScreenIndex(currentIndex - 1)
    } else if (onExit) {
      onExit()
    }
  }, [currentIndex, onExit, setStoredScreenIndex])

  const handleNextScreen = useCallback(() => {
    // Record screen completion
    markScreenComplete(activeScreen.id)

    if (currentIndex < screens.length - 1) {
      const nextIdx = currentIndex + 1
      const nextScreen = screens[nextIdx]

      // Friendly celebration when advancing across months if in full-book mode
      if (scopedMonth === undefined && activeScreen.monthNumber > 0 && nextScreen.monthNumber > activeScreen.monthNumber) {
        gameAudio.playSuccess()
        toast.success(`🎉 You completed Month ${activeScreen.monthNumber}! Advancing to Month ${nextScreen.monthNumber}...`)
      }

      setCurrentIndex(nextIdx)
      setStoredScreenIndex(nextIdx)
    } else {
      // Completed all screens in current scope
      gameAudio.playSuccess()
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } })
      if (scopedMonth !== undefined && scopedMonth !== null) {
        toast.success(`🏆 Outstanding! You completed Chapter ${chapterNumber || scopedMonth}!`)
        setShowChapterCompletionModal(true)
      } else {
        toast.success('🏆 Outstanding! You completed the entire GAIO Class 3 Book!')
      }
      if (onComplete) {
        onComplete()
      }
    }
  }, [activeScreen, currentIndex, screens, scopedMonth, chapterNumber, markScreenComplete, setStoredScreenIndex, onComplete])

  const handleToggleSpeech = useCallback(() => {
    if (isSpeaking) {
      auraSpeechService.stop()
      setIsSpeaking(false)
    } else {
      const textToSpeak = `${activeScreen.title}. ${activeScreen.subtitle || ''}. ${activeScreen.contentBlockTitle}`
      auraSpeechService.speak(textToSpeak)
      setIsSpeaking(true)
    }
  }, [isSpeaking, activeScreen])

  // Direct Jump Handlers
  const handleJumpToPdf = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNum = parseInt(jumpPdfInput.trim(), 10)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 160) {
      const targetIdx = screens.findIndex((s) => s.pdfPageNumber === pageNum)
      if (targetIdx >= 0) {
        gameAudio.playTap()
        setCurrentIndex(targetIdx)
        setStoredScreenIndex(targetIdx)
        setShowTOC(false)
        setJumpPdfInput('')
        toast.success(`Jumped to PDF Page ${pageNum}`)
      } else {
        toast.error(`PDF page ${pageNum} is not in this chapter`)
      }
    } else {
      toast.error('Enter a valid PDF page (1 - 153)')
    }
  }

  const handleJumpToScreen = (e: React.FormEvent) => {
    e.preventDefault()
    const scNum = parseInt(jumpScreenInput.trim(), 10)
    if (!isNaN(scNum)) {
      const targetIdx = screens.findIndex((s) => s.screenNumber === scNum)
      if (targetIdx >= 0) {
        gameAudio.playTap()
        setCurrentIndex(targetIdx)
        setStoredScreenIndex(targetIdx)
        setShowTOC(false)
        setJumpScreenInput('')
        toast.success(`Jumped to Screen ${scNum}`)
      } else {
        toast.error(`Screen ${scNum} is not in this chapter`)
      }
    } else {
      toast.error('Enter a valid Screen number')
    }
  }

  // Filter TOC screens based on search and selected month
  const filteredTocScreens = useMemo(() => {
    return screens.filter((s) => {
      if (tocFilterMonth !== null && s.monthNumber !== tocFilterMonth) return false
      if (tocSearch.trim()) {
        const query = tocSearch.toLowerCase()
        return (
          s.title.toLowerCase().includes(query) ||
          s.contentBlockTitle.toLowerCase().includes(query) ||
          `p.${s.pdfPageNumber}`.includes(query) ||
          `screen ${s.screenNumber}`.includes(query)
        )
      }
      return true
    })
  }, [screens, tocFilterMonth, tocSearch])

  const activeChapterMeta = useMemo(() => {
    const m = scopedMonth !== undefined && scopedMonth !== null ? scopedMonth : activeScreen.monthNumber
    return chapterMetaList.find((c) => c.m === m) || chapterMetaList[0]
  }, [scopedMonth, activeScreen?.monthNumber, chapterMetaList])

  return (
    <div className="w-full h-full max-h-full flex-1 flex flex-col items-center justify-center p-1 sm:p-2 overflow-hidden bg-slate-100/60 select-none">


      {/* Book Frame with Responsive Viewport Containment */}
      <div className="w-full h-full max-h-full flex-1 flex flex-col justify-between overflow-hidden relative max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <GaioBookShell
          categoryText={`${chapterNumber || activeChapterMeta.number}: ${chapterTitle || activeChapterMeta.title}`}
          pdfPageNumber={activeScreen.pdfPageNumber}
          contentBlockTitle={activeScreen.contentBlockTitle}
          gradeTitle={gradeTitle}
          onExit={onExit}
          onPrevPage={handlePrevScreen}
          canGoPrev={currentIndex > 0}
        >
          {/* Active Screen Interactive Renderer */}
          <div className="w-full h-full overflow-hidden flex flex-col justify-between relative">
            <GaioScreenRenderer
              screen={activeScreen}
              onNextScreen={handleNextScreen}
              savedAnswer={progressState.answers[activeScreen.id]}
              onSaveAnswer={(val) => setStudentAnswer(activeScreen.id, val)}
              onAddStars={addStars}
              studentName={progressState.studentName}
            />
          </div>
        </GaioBookShell>


        {/* ── Table of Contents Modal Drawer ── */}
        {showTOC && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-2 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-3 shadow-2xl max-h-[90%] flex flex-col justify-between border-2 border-sky-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#0288D1]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      GAIO {gradeTitle} • Book Contents
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {rawScreens.length} Screens · 6 Chapters + Finale
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTOC(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Direct Jump to PDF Page & Screen */}
              <div className="grid grid-cols-2 gap-1.5 py-1.5 border-b border-slate-100 shrink-0">
                <form onSubmit={handleJumpToPdf} className="flex gap-1 items-center bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <input
                    type="number"
                    min="1"
                    max={TOTAL_PDF_PAGES}
                    value={jumpPdfInput}
                    onChange={(e) => setJumpPdfInput(e.target.value)}
                    placeholder="PDF Page (1-153)"
                    className="w-full text-[10px] font-bold px-1.5 py-0.5 bg-white rounded-lg border border-slate-200 outline-hidden focus:border-[#0288D1]"
                  />
                  <button
                    type="submit"
                    className="px-2 py-0.5 rounded-lg bg-[#0288D1] text-white text-[10px] font-black cursor-pointer hover:bg-sky-600 shrink-0"
                  >
                    Go
                  </button>
                </form>

                <form onSubmit={handleJumpToScreen} className="flex gap-1 items-center bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <input
                    type="number"
                    min="1"
                    max={TOTAL_WEBSITE_SCREENS}
                    value={jumpScreenInput}
                    onChange={(e) => setJumpScreenInput(e.target.value)}
                    placeholder="Screen (1-286)"
                    className="w-full text-[10px] font-bold px-1.5 py-0.5 bg-white rounded-lg border border-slate-200 outline-hidden focus:border-[#0288D1]"
                  />
                  <button
                    type="submit"
                    className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-black cursor-pointer hover:bg-emerald-700 shrink-0"
                  >
                    Go
                  </button>
                </form>
              </div>

              {/* Month Quick Tabs */}
              <div className="flex gap-1 overflow-x-auto py-1.5 scrollbar-none shrink-0">
                <button
                  type="button"
                  onClick={() => setTocFilterMonth(null)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer ${
                    tocFilterMonth === null ? 'bg-[#0288D1] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  All ({TOTAL_WEBSITE_SCREENS})
                </button>
                {[
                  { label: 'Intro (p.1-4)', m: 0 },
                  { label: 'Month 1 (p.5-27)', m: 1 },
                  { label: 'Month 2 (p.28-50)', m: 2 },
                  { label: 'Month 3 (p.51-73)', m: 3 },
                  { label: 'Month 4 (p.74-96)', m: 4 },
                  { label: 'Month 5 (p.97-119)', m: 5 },
                  { label: 'Month 6 (p.120-142)', m: 6 },
                  { label: 'Finale (p.143-153)', m: 7 },
                ].map((item) => (
                  <button
                    key={item.m}
                    type="button"
                    onClick={() => setTocFilterMonth(item.m)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer ${
                      tocFilterMonth === item.m ? 'bg-[#0288D1] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative py-1 shrink-0">
                <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={tocSearch}
                  onChange={(e) => setTocSearch(e.target.value)}
                  placeholder="Search screens, topics, or PDF page..."
                  className="w-full pl-7 pr-2 py-1 text-xs rounded-xl bg-slate-50 border border-slate-200 font-medium outline-hidden focus:border-[#0288D1]"
                />
              </div>

              {/* Screen List */}
              <div className="flex-1 min-h-0 overflow-y-auto py-1 space-y-1 pr-1">
                {filteredTocScreens.map((s, idx) => {
                  const isActive = s.id === activeScreen.id
                  const isDone = progressState.completedScreens.includes(s.id)
                  const actualGlobalIdx = screens.findIndex((item) => item.id === s.id)

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        gameAudio.playTap()
                        setCurrentIndex(actualGlobalIdx)
                        setStoredScreenIndex(actualGlobalIdx)
                        setShowTOC(false)
                      }}
                      className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-sky-100 text-[#0288D1] border-2 border-sky-400 shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          s.{s.screenNumber}
                        </span>
                        <div className="truncate">
                          <div className="truncate text-slate-900 leading-tight">
                            {s.title}
                          </div>
                          <div className="text-[9px] text-slate-400 font-normal truncate">
                            Source PDF Page {s.pdfPageNumber} {s.pdfTotalParts > 1 ? `(Part ${s.pdfPartIndex}/${s.pdfTotalParts})` : ''} • {s.contentBlockTitle}
                          </div>
                        </div>
                      </div>
                      {isDone && <CheckCircle2 size={14} className="text-emerald-600 shrink-0 ml-1" />}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowTOC(false)}
                className="w-full mt-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 cursor-pointer"
              >
                Close Table of Contents
              </button>
            </div>
          </div>
        )}

        {/* ── Original PDF Page & Asset Verification Drawer (Req. 13 Strict Fidelity) ── */}
        {showPdfPreview && (
          <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-end p-2 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-3 shadow-2xl max-h-[92%] flex flex-col justify-between border-2 border-amber-400">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <FileText size={16} className="text-amber-600" />
                  <div>
                    <span className="text-xs font-black text-slate-900 block leading-tight">
                      Visual Source Verification • PDF Page {activeScreen.pdfPageNumber} of {TOTAL_PDF_PAGES}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">
                      Screen {activeScreen.screenNumber}/{TOTAL_WEBSITE_SCREENS} • {activeScreen.title}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Verification Sub-Tabs */}
              <div className="flex gap-1 py-1 shrink-0 border-b border-slate-100">
                <button
                  onClick={() => setPdfPreviewTab('crop')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    pdfPreviewTab === 'crop'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Screen Section Crop {activeScreen.pdfTotalParts > 1 ? `(Part ${activeScreen.pdfPartIndex}/${activeScreen.pdfTotalParts})` : ''}
                </button>
                <button
                  onClick={() => setPdfPreviewTab('full')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    pdfPreviewTab === 'full'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Full Original Page (A4)
                </button>
                <button
                  onClick={() => setPdfPreviewTab('assets')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    pdfPreviewTab === 'assets'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Source Assets ({activeScreen.extractedAssets?.length || 0})
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="flex-1 min-h-0 overflow-y-auto my-1.5 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center p-1">
                {pdfPreviewTab === 'crop' && (
                  <img
                    src={activeScreen.sectionCropImage || activeScreen.sourcePdfImage}
                    alt={`Section Crop Page ${activeScreen.pdfPageNumber} Part ${activeScreen.pdfPartIndex}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                  />
                )}
                {pdfPreviewTab === 'full' && (
                  <img
                    src={activeScreen.sourcePdfImage}
                    alt={`Full PDF Page ${activeScreen.pdfPageNumber}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                  />
                )}
                {pdfPreviewTab === 'assets' && (
                  <div className="w-full h-full overflow-y-auto p-2">
                    {activeScreen.extractedAssets && activeScreen.extractedAssets.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {activeScreen.extractedAssets.map((ast: any, aIdx: number) => (
                          <div key={aIdx} className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center">
                            <div className="w-full h-16 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden p-1">
                              <img src={ast.url} alt={ast.fileName} className="max-h-full max-w-full object-contain" />
                            </div>
                            <span className="text-[8px] font-mono text-slate-500 truncate w-full text-center mt-1">
                              {ast.width}x{ast.height}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-slate-400">
                        Vector graphics and text layout for this section.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-medium">
                <span className="font-mono">PDF P.{activeScreen.pdfPageNumber} ↔ Screen {activeScreen.screenNumber}</span>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="px-3 py-1 bg-amber-400 text-slate-900 rounded-lg font-bold hover:bg-amber-500 cursor-pointer shadow-2xs"
                >
                  Return to Interactive Screen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Chapter Completion Celebration Modal ── */}
      {showChapterCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-emerald-400 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <Trophy size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Chapter Complete!
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Awesome Work, {progressState.studentName}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You've successfully completed all {screens.length} interactive pages of{' '}
                <strong>Chapter {chapterNumber || scopedMonth}: {chapterTitle || activeChapterMeta.title}</strong>!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowChapterCompletionModal(false)
                  if (onExit) {
                    onExit()
                  } else {
                    window.location.href = '/student/learning/chapters'
                  }
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                ← Back to Chapters
              </button>

              {scopedMonth !== undefined && scopedMonth !== null && scopedMonth < 7 ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowChapterCompletionModal(false)
                    window.location.href = `/student/learning/chapters/${CHAPTER_ITEM_KEYS[scopedMonth + 1]}`
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Next Item ({CHAPTER_ITEM_KEYS[scopedMonth + 1].toUpperCase()})</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowChapterCompletionModal(false)
                    if (onExit) onExit()
                    else window.location.href = '/student/learning/chapters'
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  Return to Chapters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GaioInteractiveBookApp
