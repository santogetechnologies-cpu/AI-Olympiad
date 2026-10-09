// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 INTERACTIVE BOOK — COMPLETE SCREEN MAPPING & CONFIGURATION
// Generated from exact source of truth: GAIO Class3 Book.pdf (All 153 Pages)
// Total Website Screens: 286
// PDF Page Count != Website Screen Count: Every content block mapped & functional.
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioScreenItem } from '../types'
import allScreensData from './gaioFullBookScreens.json'

export const CLASS3_BOOK_ALL_SCREENS: GaioScreenItem[] = allScreensData as GaioScreenItem[]

export const TOTAL_WEBSITE_SCREENS = CLASS3_BOOK_ALL_SCREENS.length // 286
export const TOTAL_PDF_PAGES = 153

export function getScreenByIndex(index: number): GaioScreenItem | undefined {
  if (index < 0 || index >= CLASS3_BOOK_ALL_SCREENS.length) return undefined
  return CLASS3_BOOK_ALL_SCREENS[index]
}

export function getScreensByPdfPage(pdfPageNumber: number): GaioScreenItem[] {
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.pdfPageNumber === pdfPageNumber)
}

export function getScreensForTopic(topicNumber: number): GaioScreenItem[] {
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.topicNumber === topicNumber)
}

export function getScreensForMonth(monthNumber: number): GaioScreenItem[] {
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.monthNumber === monthNumber)
}

export function findScreenIndexById(screenId: string): number {
  return CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.id === screenId)
}

export function findScreenIndexByPdfPage(pdfPageNumber: number): number {
  const idx = CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.pdfPageNumber === pdfPageNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForMonth(monthNumber: number): number {
  if (monthNumber <= 0) return 0
  const idx = CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.monthNumber === monthNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForTopic(topicNumber: number): number {
  const idx = CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.topicNumber === topicNumber)
  return idx >= 0 ? idx : 0
}

export function getStartingScreenIndexForChapter(chapterNumber: number): number {
  // Chapter 1 -> Month 1 (Screen 8)
  // Chapter 2 -> Month 2 (Screen 52)
  // Chapter 3 -> Month 3 (Screen 96)
  // Chapter 4 -> Month 4 (Screen 140)
  // Chapter 5 -> Month 5 (Screen 184)
  // Chapter 6 -> Month 6 (Screen 228)
  return getStartingScreenIndexForMonth(chapterNumber)
}
