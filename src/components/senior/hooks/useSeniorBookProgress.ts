// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — STUDENT PROGRESS HOOK
// Persists answers, interactive simulation states, code outputs, XP, and badges.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import type { SeniorProgressState } from '../types'

const STORAGE_KEY = 'senior_ai_olympiad_progress_v1'

const DEFAULT_STATE: SeniorProgressState = {
  currentScreenIndex: 0,
  completedScreenIds: [],
  starsCollected: 0,
  xpEarned: 0,
  streakDays: 1,
  answers: {}
}

export function useSeniorBookProgress(initialIndex: number = 0) {
  const [state, setState] = useState<SeniorProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...DEFAULT_STATE,
          ...parsed,
          currentScreenIndex:
            initialIndex !== undefined && initialIndex >= 0
              ? initialIndex
              : parsed.currentScreenIndex || 0
        }
      }
    } catch (e) {
      console.warn('Could not load Senior Book progress:', e)
    }
    return {
      ...DEFAULT_STATE,
      currentScreenIndex: initialIndex || 0
    }
  })

  useEffect(() => {
    if (initialIndex !== undefined && initialIndex >= 0) {
      setState((prev) => ({ ...prev, currentScreenIndex: initialIndex }))
    }
  }, [initialIndex])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Could not save Senior Book progress:', e)
    }
  }, [state])

  const setCurrentScreenIndex = useCallback((index: number) => {
    setState((prev) => ({ ...prev, currentScreenIndex: index }))
  }, [])

  const setStudentAnswer = useCallback((key: string, answer: any) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [key]: answer
      }
    }))
  }, [])

  const markScreenComplete = useCallback((screenId: string) => {
    setState((prev) => {
      if (prev.completedScreenIds.includes(screenId)) return prev
      return {
        ...prev,
        completedScreenIds: [...prev.completedScreenIds, screenId]
      }
    })
  }, [])

  const addXP = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      xpEarned: prev.xpEarned + amount
    }))
  }, [])

  const addStars = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      starsCollected: prev.starsCollected + count
    }))
  }, [])

  return {
    state,
    setCurrentScreenIndex,
    setStudentAnswer,
    markScreenComplete,
    addXP,
    addStars
  }
}
