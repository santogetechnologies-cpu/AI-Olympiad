// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS5 INTERACTIVE BOOK — COMPLETE SCREEN MAPPING & CONFIGURATION
// Generated from Authentic Curriculum Topic Profiles
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioScreenItem } from '../types'
import allScreensData from './class5BookScreens.json'

export const CLASS5_BOOK_ALL_SCREENS: GaioScreenItem[] = allScreensData as GaioScreenItem[]

export const TOTAL_WEBSITE_SCREENS = CLASS5_BOOK_ALL_SCREENS.length

export function getScreenByIndex(index: number): GaioScreenItem | undefined {
  if (index < 0 || index >= CLASS5_BOOK_ALL_SCREENS.length) return undefined
  return CLASS5_BOOK_ALL_SCREENS[index]
}

export function getScreensByPdfPage(pdfPageNumber: number): GaioScreenItem[] {
  return CLASS5_BOOK_ALL_SCREENS.filter((s) => s.pdfPageNumber === pdfPageNumber)
}

export function getScreensForTopic(topicNumber: number): GaioScreenItem[] {
  return CLASS5_BOOK_ALL_SCREENS.filter((s) => s.topicNumber === topicNumber)
}

export function getScreensForMonth(monthNumber: number): GaioScreenItem[] {
  return CLASS5_BOOK_ALL_SCREENS.filter((s) => s.monthNumber === monthNumber)
}

export function findScreenIndexById(screenId: string): number {
  return CLASS5_BOOK_ALL_SCREENS.findIndex((s) => s.id === screenId)
}

export function findScreenIndexByPdfPage(pdfPageNumber: number): number {
  const idx = CLASS5_BOOK_ALL_SCREENS.findIndex((s) => s.pdfPageNumber === pdfPageNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForMonth(monthNumber: number): number {
  if (monthNumber <= 0) return 0
  const idx = CLASS5_BOOK_ALL_SCREENS.findIndex((s) => s.monthNumber === monthNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForTopic(topicNumber: number): number {
  const idx = CLASS5_BOOK_ALL_SCREENS.findIndex((s) => s.topicNumber === topicNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForChapter(chapterNumber: number): number {
  return getStartingScreenIndexForMonth(chapterNumber)
}
