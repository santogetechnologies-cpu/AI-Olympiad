// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL AI OLYMPIAD — STUDENT PROGRESS HOOK
// Persists lesson completions, stage advancement, Olympiad scores, and XP
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import type { MiddleClassKey, LessonStageKey, MiddleStudentProgress } from '../types'
import { ALL_MIDDLE_LESSONS } from '../data/middleLevelData'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'

const STORAGE_KEY = 'gaio_middle_level_progress_v2'

const DEFAULT_PROGRESS: MiddleStudentProgress = {
  currentClass: 'class6',
  currentLessonId: ALL_MIDDLE_LESSONS[0]?.id || 'class6-ch1-l1',
  currentStage: 'briefing',
  completedLessonIds: [],
  completedStageIds: {},
  olympiadAnswers: {},
  gameScores: {},
  totalXp: 0,
  stars: 0,
  badgesEarned: []
}

export function useMiddleLevelProgress(initialClass?: MiddleClassKey, initialLessonId?: string) {
  const [progress, setProgress] = useState<MiddleStudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          currentClass: initialClass || parsed.currentClass || 'class6',
          currentLessonId: initialLessonId || parsed.currentLessonId || 'class6-ch1-l1'
        }
      }
    } catch (e) {
      console.warn('Failed to parse middle level progress from localStorage:', e)
    }
    return {
      ...DEFAULT_PROGRESS,
      currentClass: initialClass || 'class6',
      currentLessonId: initialLessonId || ALL_MIDDLE_LESSONS[0]?.id || 'class6-ch1-l1'
    }
  })

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (e) {
      console.warn('Failed to save middle level progress:', e)
    }
  }, [progress])

  const selectClass = useCallback((clsKey: MiddleClassKey) => {
    gameAudio.playTap()
    const firstLessonOfClass = ALL_MIDDLE_LESSONS.find((l) => l.classKey === clsKey)
    setProgress((prev) => ({
      ...prev,
      currentClass: clsKey,
      currentLessonId: firstLessonOfClass?.id || prev.currentLessonId,
      currentStage: 'briefing'
    }))
  }, [])

  const selectLesson = useCallback((lessonId: string, stage: LessonStageKey = 'briefing') => {
    gameAudio.playTap()
    const found = ALL_MIDDLE_LESSONS.find((l) => l.id === lessonId)
    setProgress((prev) => ({
      ...prev,
      currentClass: found ? found.classKey : prev.currentClass,
      currentLessonId: lessonId,
      currentStage: stage
    }))
  }, [])

  const setStage = useCallback((stage: LessonStageKey) => {
    gameAudio.playTap()
    setProgress((prev) => ({
      ...prev,
      currentStage: stage
    }))
  }, [])

  const markStageComplete = useCallback((lessonId: string, stage: LessonStageKey) => {
    setProgress((prev) => {
      const currentList = prev.completedStageIds[lessonId] || []
      if (!currentList.includes(stage)) {
        return {
          ...prev,
          completedStageIds: {
            ...prev.completedStageIds,
            [lessonId]: [...currentList, stage]
          }
        }
      }
      return prev
    })
  }, [])

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const nextXp = prev.totalXp + amount
      // Also notify gamification engine
      try {
        gamification.addXP(amount)
      } catch {}
      return {
        ...prev,
        totalXp: nextXp
      }
    })
  }, [])

  const recordOlympiadAnswer = useCallback((qId: string, selected: string, isCorrect: boolean) => {
    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playError()
    }

    setProgress((prev) => {
      const alreadyAnswered = prev.olympiadAnswers[qId]
      const xpBonus = isCorrect && !alreadyAnswered?.isCorrect ? 50 : 0
      const nextAnswers = {
        ...prev.olympiadAnswers,
        [qId]: { selected, isCorrect }
      }
      return {
        ...prev,
        olympiadAnswers: nextAnswers,
        totalXp: prev.totalXp + xpBonus
      }
    })
  }, [])

  const recordGameScore = useCallback((lessonId: string, score: number) => {
    setProgress((prev) => {
      const prevScore = prev.gameScores[lessonId] || 0
      const delta = Math.max(0, score - prevScore)
      return {
        ...prev,
        gameScores: {
          ...prev.gameScores,
          [lessonId]: Math.max(prevScore, score)
        },
        totalXp: prev.totalXp + delta
      }
    })
  }, [])

  const markLessonComplete = useCallback((lessonId: string, badgeTitle: string) => {
    gameAudio.playVictory()
    setProgress((prev) => {
      const isAlreadyComplete = prev.completedLessonIds.includes(lessonId)
      const nextCompleted = isAlreadyComplete
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId]
      const nextBadges = prev.badgesEarned.includes(badgeTitle)
        ? prev.badgesEarned
        : [...prev.badgesEarned, badgeTitle]
      const nextStars = isAlreadyComplete ? prev.stars : prev.stars + 3
      const nextXp = isAlreadyComplete ? prev.totalXp : prev.totalXp + 350

      return {
        ...prev,
        completedLessonIds: nextCompleted,
        badgesEarned: nextBadges,
        stars: nextStars,
        totalXp: nextXp
      }
    })
  }, [])

  return {
    progress,
    selectClass,
    selectLesson,
    setStage,
    markStageComplete,
    addXp,
    recordOlympiadAnswer,
    recordGameScore,
    markLessonComplete
  }
}
