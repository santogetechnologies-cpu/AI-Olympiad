// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — MASTER APPLICATION CONTAINER
// Unified 336-screen cyber-minimalist digital book experience across Classes 9-12.
// Zero scrolling shell, authentic gamified stages, keyboard shortcuts, and state persistence.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SeniorScreenItem } from './types'
import {
  SENIOR_BOOK_ALL_SCREENS,
  TOTAL_SENIOR_SCREENS,
  getSeniorScreenByIndex,
  getStartingScreenIndexForGrade,
  getStartingScreenIndexForGradeChapter,
  getStartingScreenIndexForLesson,
  findSeniorScreenIndexById
} from './config/seniorBookConfig'
import { SeniorBookShell } from './primitives/SeniorBookShell'
import { SeniorBookNav } from './primitives/SeniorBookNav'
import { SeniorBookTOC } from './primitives/SeniorBookTOC'
import { SeniorScreenRenderer } from './renderers/SeniorScreenRenderer'
import { useSeniorBookProgress } from './hooks/useSeniorBookProgress'
import { gameAudio } from '../../utils/gameAudio'
import { auraSpeechService } from '../../services/auraSpeechService'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { ConceptGlossaryModal } from '../common/ConceptGlossaryModal'
import { KindergartenAnalogyModal } from '../common/KindergartenAnalogyModal'
import {
  findKindergartenConcept,
  type KindergartenConcept
} from '../common/kindergartenConceptDictionary'

export interface SeniorInteractiveBookAppProps {
  onExit?: () => void
  onComplete?: () => void
  initialGrade?: number
  initialChapter?: number
  initialLesson?: number
  initialScreenIndex?: number
}

export const SeniorInteractiveBookApp: React.FC<SeniorInteractiveBookAppProps> = ({
  onExit,
  onComplete,
  initialGrade,
  initialChapter,
  initialLesson,
  initialScreenIndex
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const screens = SENIOR_BOOK_ALL_SCREENS

  // 1. Resolve starting screen index from props or search params
  const resolvedInitialIndex = useMemo(() => {
    // Check 'screen' param
    const screenParam = searchParams.get('screen')
    if (screenParam) {
      const parsed = parseInt(screenParam, 10)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= screens.length) {
        return parsed - 1
      }
    }

    // Check grade/chapter/lesson params
    const gParam = searchParams.get('grade')
    const cParam = searchParams.get('chapter')
    const lParam = searchParams.get('lesson')

    const grade = gParam ? parseInt(gParam, 10) : initialGrade
    const chapter = cParam ? parseInt(cParam, 10) : initialChapter
    const lesson = lParam ? parseInt(lParam, 10) : initialLesson

    if (grade && chapter && lesson) {
      return getStartingScreenIndexForLesson(grade, chapter, lesson)
    }
    if (grade && chapter) {
      return getStartingScreenIndexForGradeChapter(grade, chapter)
    }
    if (grade) {
      return getStartingScreenIndexForGrade(grade)
    }
    if (initialScreenIndex !== undefined && initialScreenIndex >= 0 && initialScreenIndex < screens.length) {
      return initialScreenIndex
    }

    return 0
  }, [searchParams, initialGrade, initialChapter, initialLesson, initialScreenIndex, screens.length])

  // 2. Persistent Student Progress State
  const {
    state: progressState,
    setCurrentScreenIndex: setStoredIndex,
    setStudentAnswer,
    markScreenComplete,
    addXP,
    addStars
  } = useSeniorBookProgress(resolvedInitialIndex)

  const [currentIndex, setCurrentIndex] = useState<number>(resolvedInitialIndex)
  const [showTOC, setShowTOC] = useState<boolean>(searchParams.get('toc') === 'true')
  const [showGlossary, setShowGlossary] = useState<boolean>(false)
  const [selectedConcept, setSelectedConcept] = useState<KindergartenConcept | null>(null)
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  // Active Screen reference
  const activeScreen: SeniorScreenItem = screens[currentIndex] || screens[0]

  // Sync with searchParams
  useEffect(() => {
    auraSpeechService.stop()
    setIsSpeaking(false)

    const params = new URLSearchParams(window.location.search)
    params.set('screen', String(activeScreen.screenNumber))
    params.set('grade', String(activeScreen.gradeNumber))
    params.set('chapter', String(activeScreen.chapterNumber))
    params.set('lesson', String(activeScreen.lessonNumber))
    const newSearch = params.toString()
    if (window.location.search !== `?${newSearch}`) {
      window.history.replaceState(null, '', `?${newSearch}`)
    }
  }, [currentIndex, activeScreen])

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      auraSpeechService.stop()
    }
  }, [])

  // Page Navigation Handlers
  const handleNextPage = useCallback(() => {
    if (currentIndex < screens.length - 1) {
      markScreenComplete(activeScreen.id)
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      setStoredIndex(nextIdx)
    } else {
      markScreenComplete(activeScreen.id)
      confetti({ particleCount: 100, spread: 100 })
      toast.success('Congratulations! You completed the Senior Level AI Olympiad Curriculum!')
      if (onComplete) onComplete()
    }
  }, [currentIndex, screens.length, activeScreen.id, markScreenComplete, setStoredIndex, onComplete])

  const handlePrevPage = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1
      setCurrentIndex(prevIdx)
      setStoredIndex(prevIdx)
    }
  }, [currentIndex, setStoredIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNextPage()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevPage()
      } else if (e.key === 'Escape') {
        setShowTOC(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNextPage, handlePrevPage])

  // Speech TTS handler
  const handleToggleSpeech = useCallback(() => {
    if (isSpeaking) {
      auraSpeechService.stop()
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)
      const primaryTerm = activeScreen.lesson.vocab[0] || activeScreen.lesson.lessonTitle
      const concept = findKindergartenConcept(primaryTerm)
      const simpleAnalogy = concept?.kindergartenAnalogy ||
        `Imagine teaching a friendly toy robot! Every time you show it pictures, it learns just like you learned how to ride a tricycle!`
      const simpleDesc = concept?.simpleExplanation ||
        `AI looks at clues and makes smart guesses to help humans!`

      const speechText = `Hello! I am GAIO, your AI guide. Let's learn ${activeScreen.lesson.lessonTitle} in the simplest way. ${simpleAnalogy} ${simpleDesc}`

      auraSpeechService.speak(speechText, activeScreen.id)
    }
  }, [isSpeaking, activeScreen])

  useEffect(() => {
    return auraSpeechService.subscribe((s) => {
      setIsSpeaking(s.isSpeaking)
    })
  }, [])

  // Grade Switching Handler
  const handleSelectGrade = useCallback((gradeNum: number) => {
    gameAudio.playTap()
    const targetIdx = getStartingScreenIndexForGrade(gradeNum)
    setCurrentIndex(targetIdx)
    setStoredIndex(targetIdx)
  }, [setStoredIndex])

  // Jump to specific screen
  const handleSelectScreenIndex = useCallback((index: number) => {
    if (index >= 0 && index < screens.length) {
      setCurrentIndex(index)
      setStoredIndex(index)
    }
  }, [screens.length, setStoredIndex])

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-slate-950 overflow-hidden">
      <SeniorBookShell
        gradeTitle={activeScreen.grade}
        chapterNumber={activeScreen.chapterNumber}
        chapterTitle={activeScreen.chapterTitle}
        lessonNumber={activeScreen.lessonNumber}
        lessonTitle={activeScreen.lessonTitle}
        stepNumber={activeScreen.stepNumber}
        totalLessonSteps={activeScreen.totalLessonSteps}
        stageTitle={activeScreen.stageTitle}
        xpEarned={progressState.xpEarned}
        starsCollected={progressState.starsCollected}
        onOpenTOC={() => setShowTOC(true)}
        onOpenGlossary={() => setShowGlossary(true)}
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={() => {
          gameAudio.playTap()
          setIsSimpleMode((prev) => !prev)
          toast(isSimpleMode ? 'Deep Technical Mode Active' : '👶 Kindergarten Story Mode Active!', {
            icon: isSimpleMode ? '🔬' : '👶'
          })
        }}
        onSelectGrade={handleSelectGrade}
        currentGradeNum={activeScreen.gradeNumber}
      >
        <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col justify-between">
          <SeniorScreenRenderer
            screen={activeScreen}
            onNextScreen={handleNextPage}
            savedAnswer={progressState.answers[activeScreen.id]}
            onSaveAnswer={(val) => setStudentAnswer(activeScreen.id, val)}
            onAddXP={addXP}
            onAddStars={addStars}
            onOpenConcept={(term) => {
              const matched = findKindergartenConcept(term)
              if (matched) {
                setSelectedConcept(matched)
              } else {
                setShowGlossary(true)
              }
            }}
          />
        </div>

        <SeniorBookNav
          currentScreenNumber={activeScreen.screenNumber}
          totalScreens={TOTAL_SENIOR_SCREENS}
          gradeNumber={activeScreen.gradeNumber}
          chapterNumber={activeScreen.chapterNumber}
          lessonNumber={activeScreen.lessonNumber}
          stepNumber={activeScreen.stepNumber}
          totalLessonSteps={activeScreen.totalLessonSteps}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onOpenTOC={() => setShowTOC(true)}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
          isLastScreen={currentIndex >= screens.length - 1}
        />
      </SeniorBookShell>

      {/* Table of Contents Modal */}
      <SeniorBookTOC
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
        onSelectScreenIndex={handleSelectScreenIndex}
        currentGradeNumber={activeScreen.gradeNumber}
        completedScreenIds={progressState.completedScreenIds}
      />

      {/* 👶 Kindergarten Concept Glossary Search Modal */}
      <ConceptGlossaryModal
        isOpen={showGlossary}
        onClose={() => setShowGlossary(false)}
      />

      {/* 👶 Selected Concept Deep Analogy Popover */}
      <KindergartenAnalogyModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
      />
    </div>
  )
}

export default SeniorInteractiveBookApp
