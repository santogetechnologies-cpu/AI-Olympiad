// ─────────────────────────────────────────────────────────────────────────────
// GAIO INTERACTIVE BOOK APPLICATION
// Digital Book Experience based 100% on GAIO Class3 Book.pdf (All 153 Pages)
// PDF Page Count != Website Page Count: 286 Interactive Website Screens
// Zero scrolling anywhere: Mobile-first page turning with full interactive activities.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { GaioScreenItem } from './types'
import {
  CLASS3_BOOK_ALL_SCREENS,
  TOTAL_WEBSITE_SCREENS,
  TOTAL_PDF_PAGES,
  getStartingScreenIndexForMonth,
  getStartingScreenIndexForTopic,
  getStartingScreenIndexForChapter,
  findScreenIndexByPdfPage
} from './config/class3BookScreens'
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
  ArrowRight
} from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export interface GaioInteractiveBookAppProps {
  onComplete?: () => void
  onExit?: () => void
  initialPageIndex?: number
  initialMonth?: number // 1 to 6
  initialTopic?: number // 1 to 12
  topicFilter?: number // legacy prop mapped to initialTopic
  monthFilter?: number // legacy prop mapped to initialMonth
  studentName?: string
}

export const GaioInteractiveBookApp: React.FC<GaioInteractiveBookAppProps> = ({
  onComplete,
  onExit,
  initialPageIndex,
  initialMonth,
  initialTopic,
  topicFilter,
  monthFilter,
  studentName = 'AI Explorer'
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 1. Full 286 interactive screens covering all 153 PDF pages are ALWAYS available
  const screens: GaioScreenItem[] = CLASS3_BOOK_ALL_SCREENS

  const targetTopic = initialTopic || topicFilter
  const targetMonth = initialMonth || monthFilter

  // 2. Resolve initial screen index from URL query param or initialMonth/initialTopic
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
        const foundIdx = findScreenIndexByPdfPage(parsedPdf)
        if (foundIdx >= 0) return foundIdx
      }
    }

    const urlMonthParam = searchParams.get('month')
    if (urlMonthParam) {
      const parsedMonth = parseInt(urlMonthParam, 10)
      if (!isNaN(parsedMonth)) {
        return getStartingScreenIndexForMonth(parsedMonth)
      }
    }

    const urlChapterParam = searchParams.get('chapter')
    if (urlChapterParam) {
      const parsedChap = parseInt(urlChapterParam, 10)
      if (!isNaN(parsedChap)) {
        return getStartingScreenIndexForChapter(parsedChap)
      }
    }

    if (initialPageIndex !== undefined && initialPageIndex >= 0 && initialPageIndex < screens.length) {
      return initialPageIndex
    }

    if (targetTopic) {
      return getStartingScreenIndexForTopic(targetTopic)
    }

    if (targetMonth) {
      return getStartingScreenIndexForMonth(targetMonth)
    }

    return 0
  }, [searchParams, screens, initialPageIndex, targetTopic, targetMonth])

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
  const [tocFilterMonth, setTocFilterMonth] = useState<number | null>(null)
  const [tocSearch, setTocSearch] = useState<string>('')
  const [jumpPdfInput, setJumpPdfInput] = useState<string>('')
  const [jumpScreenInput, setJumpScreenInput] = useState<string>('')

  // React to prop changes (e.g. user selected another chapter from LMS)
  useEffect(() => {
    let targetIdx: number | null = null
    if (initialPageIndex !== undefined && initialPageIndex >= 0 && initialPageIndex < screens.length) {
      targetIdx = initialPageIndex
    } else if (targetTopic) {
      targetIdx = getStartingScreenIndexForTopic(targetTopic)
    } else if (targetMonth) {
      targetIdx = getStartingScreenIndexForMonth(targetMonth)
    }

    if (targetIdx !== null && targetIdx >= 0 && targetIdx < screens.length && targetIdx !== currentIndex) {
      setCurrentIndex(targetIdx)
      setStoredScreenIndex(targetIdx)
    }
  }, [initialPageIndex, targetTopic, targetMonth])

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

      // Friendly celebration when advancing across months
      if (activeScreen.monthNumber > 0 && nextScreen.monthNumber > activeScreen.monthNumber) {
        gameAudio.playSuccess()
        toast.success(`🎉 You completed Month ${activeScreen.monthNumber}! Advancing to Month ${nextScreen.monthNumber}...`)
      }

      setCurrentIndex(nextIdx)
      setStoredScreenIndex(nextIdx)
    } else {
      // Completed all 286 screens of the entire book!
      gameAudio.playSuccess()
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } })
      toast.success('🏆 Outstanding! You completed the entire GAIO Class 3 Book!')
      if (onComplete) {
        onComplete()
      }
    }
  }, [activeScreen, currentIndex, screens, markScreenComplete, setStoredScreenIndex, onComplete])

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
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= TOTAL_PDF_PAGES) {
      const targetIdx = findScreenIndexByPdfPage(pageNum)
      if (targetIdx >= 0) {
        gameAudio.playTap()
        setCurrentIndex(targetIdx)
        setStoredScreenIndex(targetIdx)
        setShowTOC(false)
        setJumpPdfInput('')
        toast.success(`Jumped to PDF Page ${pageNum}`)
      }
    } else {
      toast.error('Enter a valid PDF page (1 - 153)')
    }
  }

  const handleJumpToScreen = (e: React.FormEvent) => {
    e.preventDefault()
    const scNum = parseInt(jumpScreenInput.trim(), 10)
    if (!isNaN(scNum) && scNum >= 1 && scNum <= TOTAL_WEBSITE_SCREENS) {
      const targetIdx = screens.findIndex((s) => s.screenNumber === scNum)
      if (targetIdx >= 0) {
        gameAudio.playTap()
        setCurrentIndex(targetIdx)
        setStoredScreenIndex(targetIdx)
        setShowTOC(false)
        setJumpScreenInput('')
        toast.success(`Jumped to Screen ${scNum}`)
      }
    } else {
      toast.error('Enter a valid Screen number (1 - 286)')
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

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-center items-center overflow-hidden p-1 sm:p-2 bg-slate-900/10">
      {/* ── Chapter / Month Fast Switcher Bar (Direct access across all 153 PDF pages) ── */}
      <div className="w-full max-w-md shrink-0 flex items-center gap-1 overflow-x-auto py-1 px-1 scrollbar-none mb-1 select-none">
        <span className="text-[9px] font-black uppercase text-slate-500 shrink-0 px-0.5">Chapters:</span>
        {[
          { label: 'Intro (p.1)', m: 0 },
          { label: 'Ch 1 (M1)', m: 1 },
          { label: 'Ch 2 (M2)', m: 2 },
          { label: 'Ch 3 (M3)', m: 3 },
          { label: 'Ch 4 (M4)', m: 4 },
          { label: 'Ch 5 (M5)', m: 5 },
          { label: 'Ch 6 (M6)', m: 6 },
          { label: 'Finale (p.143)', m: 7 },
        ].map((item) => {
          const isCurrent = activeScreen.monthNumber === item.m
          return (
            <button
              key={item.m}
              type="button"
              onClick={() => {
                gameAudio.playTap()
                const idx = getStartingScreenIndexForMonth(item.m)
                setCurrentIndex(idx)
                setStoredScreenIndex(idx)
              }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer border ${
                isCurrent
                  ? 'bg-[#0288D1] text-white border-sky-400 shadow-xs scale-105'
                  : 'bg-white text-slate-700 hover:bg-sky-50 border-slate-200'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Book Frame with Responsive Mobile Viewport Containment */}
      <div className="w-full max-w-md h-full max-h-[860px] flex flex-col justify-between overflow-hidden shadow-2xl rounded-3xl bg-white relative">
        <GaioBookShell
          categoryText={activeScreen.pageHeaderCategory}
          headerTitle={activeScreen.pageHeaderTitle}
          pdfPageNumber={activeScreen.pdfPageNumber}
          screenNumber={activeScreen.screenNumber}
          totalScreens={TOTAL_WEBSITE_SCREENS}
          contentBlockTitle={activeScreen.contentBlockTitle}
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

        {/* Digital Book Bottom Navigation with Full Screen Mapping Reference */}
        <GaioBookNav
          currentScreenNumber={activeScreen.screenNumber}
          totalScreens={TOTAL_WEBSITE_SCREENS}
          pdfPageNumber={activeScreen.pdfPageNumber}
          pdfPartIndex={activeScreen.pdfPartIndex}
          pdfTotalParts={activeScreen.pdfTotalParts}
          onPrevPage={handlePrevScreen}
          onNextPage={handleNextScreen}
          onOpenTOC={() => setShowTOC(true)}
          onTogglePdfPreview={() => setShowPdfPreview(!showPdfPreview)}
          showPdfPreview={showPdfPreview}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
        />

        {/* ── Table of Contents Modal Drawer (All 286 screens & 153 PDF pages) ── */}
        {showTOC && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-2 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-3 shadow-2xl max-h-[90%] flex flex-col justify-between border-2 border-sky-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#0288D1]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      GAIO Class 3 • Book Contents
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {TOTAL_WEBSITE_SCREENS} Screens · {TOTAL_PDF_PAGES} PDF Pages · 6 Months + Finale
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
    </div>
  )
}

export default GaioInteractiveBookApp
