// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL AI OLYMPIAD APPLICATION
// Master Interactive Learning Flow for Classes 6, 7, and 8
// Minimalist, zero-clutter, mobile-and-desktop contained gamified flow
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MiddleClassKey, LessonStageKey } from './types'
import { ALL_MIDDLE_LESSONS, getLessonById } from './data/middleLevelData'
import { useMiddleLevelProgress } from './hooks/useMiddleLevelProgress'
import { MiddleLevelShell } from './MiddleLevelShell'
import { MiddleLevelNav } from './MiddleLevelNav'
import { MiddleLevelTOC } from './MiddleLevelTOC'
import { JargonBusterModal } from './JargonBusterModal'

// Stage Components
import { StageBriefing } from './screens/StageBriefing'
import { StageConcept } from './screens/StageConcept'
import { StageExperiment } from './screens/StageExperiment'
import { StageGameArena } from './screens/StageGameArena'
import { StagePythonSandbox } from './screens/StagePythonSandbox'
import { StageOlympiadQuiz } from './screens/StageOlympiadQuiz'
import { StageResponsibleAI } from './screens/StageResponsibleAI'

export interface MiddleLevelAppProps {
  onExit?: () => void
  onComplete?: () => void
  initialClass?: MiddleClassKey
  initialLessonId?: string
}

const STAGES_ORDER: LessonStageKey[] = [
  'briefing',
  'concept',
  'experiment',
  'game',
  'python',
  'olympiad',
  'responsible'
]

export const MiddleLevelApp: React.FC<MiddleLevelAppProps> = ({
  onExit,
  onComplete,
  initialClass = 'class6',
  initialLessonId
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 1. Resolve initial parameters from URL if present
  const resolvedClass: MiddleClassKey = useMemo(() => {
    const qCls = searchParams.get('class')
    if (qCls === 'class6' || qCls === 'class7' || qCls === 'class8') {
      return qCls
    }
    return initialClass
  }, [searchParams, initialClass])

  const resolvedLessonId = useMemo(() => {
    const qLesson = searchParams.get('lesson')
    if (qLesson && getLessonById(qLesson)) {
      return qLesson
    }
    if (initialLessonId && getLessonById(initialLessonId)) {
      return initialLessonId
    }
    const firstOfClass = ALL_MIDDLE_LESSONS.find((l) => l.classKey === resolvedClass)
    return firstOfClass ? firstOfClass.id : ALL_MIDDLE_LESSONS[0].id
  }, [searchParams, initialLessonId, resolvedClass])

  // 2. Persistent Progress Hook
  const {
    progress,
    selectClass,
    selectLesson,
    setStage,
    markStageComplete,
    recordOlympiadAnswer,
    recordGameScore,
    markLessonComplete
  } = useMiddleLevelProgress(resolvedClass, resolvedLessonId)

  const [isTOCOpen, setIsTOCOpen] = useState(false)
  const [isJargonBusterOpen, setIsJargonBusterOpen] = useState(false)
  const [jargonTermId, setJargonTermId] = useState<string | undefined>()

  const handleOpenJargonBuster = (termId?: string) => {
    setJargonTermId(termId)
    setIsJargonBusterOpen(true)
  }

  // Current Lesson reference
  const currentLesson = useMemo(() => {
    return getLessonById(progress.currentLessonId) || ALL_MIDDLE_LESSONS[0]
  }, [progress.currentLessonId])

  // Current stage index in order
  const currentStageIdx = STAGES_ORDER.indexOf(progress.currentStage)
  const currentLessonIdx = ALL_MIDDLE_LESSONS.findIndex((l) => l.id === currentLesson.id)

  // Sync to URL search params without reload
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set('class', progress.currentClass)
    currentParams.set('lesson', progress.currentLessonId)
    currentParams.set('stage', progress.currentStage)
    const newSearch = currentParams.toString()
    if (window.location.search !== `?${newSearch}`) {
      window.history.replaceState(null, '', `?${newSearch}`)
    }
  }, [progress.currentClass, progress.currentLessonId, progress.currentStage])

  // Navigation Handlers
  const handlePrev = useCallback(() => {
    if (currentStageIdx > 0) {
      setStage(STAGES_ORDER[currentStageIdx - 1])
    } else if (currentLessonIdx > 0) {
      // Step back to previous lesson's final stage
      const prevLesson = ALL_MIDDLE_LESSONS[currentLessonIdx - 1]
      selectLesson(prevLesson.id, 'responsible')
    } else if (onExit) {
      onExit()
    }
  }, [currentStageIdx, currentLessonIdx, setStage, selectLesson, onExit])

  const handleNext = useCallback(() => {
    markStageComplete(currentLesson.id, progress.currentStage)

    if (currentStageIdx < STAGES_ORDER.length - 1) {
      setStage(STAGES_ORDER[currentStageIdx + 1])
    } else {
      // Finished all 7 stages of this lesson!
      markLessonComplete(currentLesson.id, currentLesson.badgeTitle)

      if (currentLessonIdx < ALL_MIDDLE_LESSONS.length - 1) {
        const nextLesson = ALL_MIDDLE_LESSONS[currentLessonIdx + 1]
        selectLesson(nextLesson.id, 'briefing')
      } else if (onComplete) {
        onComplete()
      }
    }
  }, [
    currentStageIdx,
    currentLessonIdx,
    currentLesson,
    progress.currentStage,
    markStageComplete,
    setStage,
    markLessonComplete,
    selectLesson,
    onComplete
  ])

  const handleAdvanceToNextLesson = useCallback(() => {
    markLessonComplete(currentLesson.id, currentLesson.badgeTitle)
    if (currentLessonIdx < ALL_MIDDLE_LESSONS.length - 1) {
      const nextLesson = ALL_MIDDLE_LESSONS[currentLessonIdx + 1]
      selectLesson(nextLesson.id, 'briefing')
    } else if (onComplete) {
      onComplete()
    }
  }, [currentLesson, currentLessonIdx, markLessonComplete, selectLesson, onComplete])

  const completedStagesForCurrentLesson =
    progress.completedStageIds[currentLesson.id] || []

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-slate-950">
      <MiddleLevelShell
        currentClass={progress.currentClass}
        onSelectClass={selectClass}
        lesson={currentLesson}
        totalXp={progress.totalXp}
        onOpenTOC={() => setIsTOCOpen(true)}
        onOpenJargonBuster={() => handleOpenJargonBuster()}
        onExit={onExit}
      >
        {/* Render Stage Viewport */}
        <div className="w-full h-full min-h-0 flex-1 overflow-hidden relative">
          {progress.currentStage === 'briefing' && (
            <StageBriefing
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'briefing')
                setStage('concept')
              }}
              onOpenJargonBuster={() => handleOpenJargonBuster()}
            />
          )}

          {progress.currentStage === 'concept' && (
            <StageConcept
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'concept')
                setStage('experiment')
              }}
              onOpenJargonBuster={() => handleOpenJargonBuster()}
            />
          )}

          {progress.currentStage === 'experiment' && (
            <StageExperiment
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'experiment')
                setStage('game')
              }}
              onOpenJargonBuster={() => handleOpenJargonBuster()}
            />
          )}

          {progress.currentStage === 'game' && (
            <StageGameArena
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'game')
                setStage('python')
              }}
              onScoreUpdate={(score) => recordGameScore(currentLesson.id, score)}
            />
          )}

          {progress.currentStage === 'python' && (
            <StagePythonSandbox
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'python')
                setStage('olympiad')
              }}
            />
          )}

          {progress.currentStage === 'olympiad' && (
            <StageOlympiadQuiz
              lesson={currentLesson}
              onProceed={() => {
                markStageComplete(currentLesson.id, 'olympiad')
                setStage('responsible')
              }}
              onAnswerQuestion={recordOlympiadAnswer}
              storedAnswers={progress.olympiadAnswers}
              onOpenJargonBuster={() => handleOpenJargonBuster()}
            />
          )}

          {progress.currentStage === 'responsible' && (
            <StageResponsibleAI
              lesson={currentLesson}
              onCompleteLesson={() =>
                markLessonComplete(currentLesson.id, currentLesson.badgeTitle)
              }
              onNextLesson={
                currentLessonIdx < ALL_MIDDLE_LESSONS.length - 1
                  ? handleAdvanceToNextLesson
                  : undefined
              }
              onOpenJargonBuster={() => handleOpenJargonBuster()}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <MiddleLevelNav
          currentStage={progress.currentStage}
          completedStages={completedStagesForCurrentLesson}
          onSelectStage={setStage}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirstLesson={currentLessonIdx === 0}
          isLastLesson={currentLessonIdx === ALL_MIDDLE_LESSONS.length - 1}
        />
      </MiddleLevelShell>

      {/* Mission Hub Table of Contents Drawer */}
      <MiddleLevelTOC
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        currentLessonId={currentLesson.id}
        completedLessonIds={progress.completedLessonIds}
        onSelectLesson={(lessonId) => selectLesson(lessonId, 'briefing')}
      />

      {/* Jargon Buster (Explain Like I'm 5) Modal */}
      <JargonBusterModal
        isOpen={isJargonBusterOpen}
        onClose={() => setIsJargonBusterOpen(false)}
        initialTermId={jargonTermId}
      />
    </div>
  )
}

export default MiddleLevelApp
