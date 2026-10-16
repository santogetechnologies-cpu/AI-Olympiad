// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 SCREEN MAPPING (LEGACY COMPATIBILITY STUB)
// Primary experience now driven by authentic PDF Interaction Canvas
// ─────────────────────────────────────────────────────────────────────────────

import type { GaioScreenItem } from '../types'

export const CLASS3_BOOK_ALL_SCREENS: GaioScreenItem[] = []
export const TOTAL_WEBSITE_SCREENS = 218
export const TOTAL_PDF_PAGES = 218

export function getScreenByIndex(index: number): GaioScreenItem | undefined {
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
  return Math.max(0, pdfPageNumber - 1)
}

export function getStartingScreenIndexForMonth(monthNumber: number): number {
  return 0
}

export function getStartingScreenIndexForTopic(topicNumber: number): number {
  return 0
}

export function getStartingScreenIndexForChapter(chapterNumber: number): number {
  return 0
}
