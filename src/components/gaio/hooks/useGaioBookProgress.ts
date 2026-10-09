// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 BOOK PROGRESS & ANSWERS STATE HOOK
// Persists student answers, drawings, quiz selections, and completed screens
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'gaio_class3_book_progress_v2'

export interface GaioStudentAnswers {
  [screenId: string]: any
}

export interface GaioBookProgressState {
  currentScreenIndex: number
  completedScreens: string[] // Screen IDs marked completed
  answers: GaioStudentAnswers
  stars: number
  studentName: string
}

const DEFAULT_STATE: GaioBookProgressState = {
  currentScreenIndex: 0,
  completedScreens: [],
  answers: {},
  stars: 0,
  studentName: 'Super Student'
}

export function useGaioBookProgress(initialIndex: number = 0, initialStudentName?: string) {
  const [state, setState] = useState<GaioBookProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...DEFAULT_STATE,
          ...parsed,
          currentScreenIndex: initialIndex !== undefined && initialIndex > 0 ? initialIndex : (parsed.currentScreenIndex || 0),
          studentName: initialStudentName || parsed.studentName || 'Super Student'
        }
      }
    } catch (e) {
      console.warn('Could not load GAIO progress:', e)
    }
    return {
      ...DEFAULT_STATE,
      currentScreenIndex: initialIndex || 0,
      studentName: initialStudentName || 'Super Student'
    }
  })

  // Respond if initialIndex changes externally (e.g. switching chapter)
  useEffect(() => {
    if (initialIndex !== undefined && initialIndex >= 0) {
      setState((prev) => ({ ...prev, currentScreenIndex: initialIndex }))
    }
  }, [initialIndex])

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Could not save GAIO progress:', e)
    }
  }, [state])

  const setCurrentScreenIndex = useCallback((index: number) => {
    setState((prev) => ({ ...prev, currentScreenIndex: index }))
  }, [])

  const setStudentAnswer = useCallback((screenId: string, answer: any) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [screenId]: answer
      }
    }))
  }, [])

  const markScreenComplete = useCallback((screenId: string) => {
    setState((prev) => {
      if (prev.completedScreens.includes(screenId)) return prev
      return {
        ...prev,
        completedScreens: [...prev.completedScreens, screenId]
      }
    })
  }, [])

  const addStars = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      stars: prev.stars + count
    }))
  }, [])

  const updateStudentName = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      studentName: name
    }))
  }, [])

  const resetAllProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(DEFAULT_STATE)
  }, [])

  return {
    state,
    setCurrentScreenIndex,
    setStudentAnswer,
    markScreenComplete,
    addStars,
    updateStudentName,
    resetAllProgress
  }
}
