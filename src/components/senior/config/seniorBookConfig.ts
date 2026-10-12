// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — CONFIGURATION & LOOKUP UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

import type { SeniorScreenItem, SeniorLessonData } from '../types'
import bookData from './seniorBookData.json'

export const SENIOR_BOOK_ALL_SCREENS: SeniorScreenItem[] = bookData.screens as unknown as SeniorScreenItem[]
export const SENIOR_BOOK_ALL_LESSONS: SeniorLessonData[] = bookData.lessons as unknown as SeniorLessonData[]

export const TOTAL_SENIOR_SCREENS = SENIOR_BOOK_ALL_SCREENS.length // 336
export const TOTAL_SENIOR_LESSONS = SENIOR_BOOK_ALL_LESSONS.length // 48

export function getSeniorScreenByIndex(index: number): SeniorScreenItem | undefined {
  if (index < 0 || index >= SENIOR_BOOK_ALL_SCREENS.length) return undefined
  return SENIOR_BOOK_ALL_SCREENS[index]
}

export function findSeniorScreenIndexById(screenId: string): number {
  return SENIOR_BOOK_ALL_SCREENS.findIndex((s) => s.id === screenId)
}

export function getStartingScreenIndexForGrade(gradeNumber: number): number {
  const idx = SENIOR_BOOK_ALL_SCREENS.findIndex((s) => s.gradeNumber === gradeNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForGradeChapter(gradeNumber: number, chapterNumber: number): number {
  const idx = SENIOR_BOOK_ALL_SCREENS.findIndex(
    (s) => s.gradeNumber === gradeNumber && s.chapterNumber === chapterNumber
  )
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForLesson(gradeNumber: number, chapterNumber: number, lessonNumber: number): number {
  const idx = SENIOR_BOOK_ALL_SCREENS.findIndex(
    (s) => s.gradeNumber === gradeNumber && s.chapterNumber === chapterNumber && s.lessonNumber === lessonNumber
  )
  return idx >= 0 ? idx : 0
}

export function getScreensForGrade(gradeNumber: number): SeniorScreenItem[] {
  return SENIOR_BOOK_ALL_SCREENS.filter((s) => s.gradeNumber === gradeNumber)
}

export function getScreensForChapter(gradeNumber: number, chapterNumber: number): SeniorScreenItem[] {
  return SENIOR_BOOK_ALL_SCREENS.filter(
    (s) => s.gradeNumber === gradeNumber && s.chapterNumber === chapterNumber
  )
}

export function getScreensForLesson(gradeNumber: number, chapterNumber: number, lessonNumber: number): SeniorScreenItem[] {
  return SENIOR_BOOK_ALL_SCREENS.filter(
    (s) => s.gradeNumber === gradeNumber && s.chapterNumber === chapterNumber && s.lessonNumber === lessonNumber
  )
}
