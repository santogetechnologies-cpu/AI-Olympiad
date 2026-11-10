import { supabase, isUuid } from '../lib/supabase'
import type { StudentContentProgress, Enrollment, Class, Subject } from '../types'
import { SYLLABUS_SPECS, ALL_LEVELS_CURRICULUM } from './curriculumData'
import { curriculumCatalogService } from './curriculumCatalogService'
import { classService } from './classService'
import bookCatalogData from '../components/gaio/config/bookCatalog.json'
import { gamification } from '../utils/gamification'
import { CLASS_CHAPTER_BOUNDARIES, type ChapterBoundary, type ClassBoundaries } from './pdfChapterBoundaries'

export { CLASS_CHAPTER_BOUNDARIES, type ChapterBoundary, type ClassBoundaries }

export interface ProgressionResult {
  lessonCompleted: boolean
  chapterCompleted: boolean
  classCompleted: boolean
  currentGradeKey?: string
  currentClassName?: string
  nextGradeKey?: string
  nextClassName?: string
  nextSubjectName?: string
  nextChapterId?: string
  message?: string
}

export interface StudentChapterProgressionItem {
  id: string
  organization_id?: string
  subject_id?: string
  subject_name?: string
  chapter_number: string | number
  title: string
  short_description?: string
  description?: string
  status: 'published' | 'draft' | 'archived'
  estimated_duration?: number
  display_order?: number
  progress: {
    total: number
    completed: number
    percentage: number
  }
  completedSections: number
  totalSections: number
  percentage: number
  is_completed: boolean
  is_in_progress: boolean
  is_not_started: boolean
}

export interface StudentDashboardData {
  assignedClass: Class | null
  assignedSubject: Subject | null
  assignedChapters: StudentChapterProgressionItem[]
  totalChapters: number
  completedChapters: number
  overallPercentage: number
  currentChapter: StudentChapterProgressionItem | null
  currentSection: string | null
  nextLesson: {
    chapterId: string
    chapterTitle: string
    chapterNumber: string | number
    contentTitle: string
  } | null
  pendingActivities: number
  quizAvg: number
  totalQuizzesTaken: number
  enrollments: Enrollment[]
}

export const SECTION_PERCENTAGES: Record<number, number> = {
  0: 0,
  1: 13,
  2: 25,
  3: 38,
  4: 50,
  5: 63,
  6: 75,
  7: 88,
  8: 100,
}

export interface SectionCompletionRecord {
  student_id: string
  class_id?: string
  chapter_id: string
  section_id: string
  organization_id?: string
  status: 'completed'
  completed_at: string
}

export type AppGradeKey =
  | 'class3'
  | 'class4'
  | 'class5'
  | 'class6'
  | 'class7'
  | 'class8'
  | 'class9'
  | 'class10'
  | 'class11'
  | 'class12'
  | 'ug1'
  | 'ug2'
  | 'ug3'
  | 'ug4'
  | 'pg1'
  | 'pg2'

export function parseGradeKeyFromClass(target: any): AppGradeKey {
  if (!target) return 'class3'
  const text = (
    typeof target === 'string'
      ? target
      : `${target.name || ''} ${target.code || ''} ${target.id || ''} ${target.gradeKey || ''} ${target.class_id || ''}`
  ).toLowerCase()

  // 1. Check PG Levels
  if (
    text.includes('pg 2') ||
    text.includes('pg2') ||
    text.includes('pg 2nd') ||
    text.includes('pg-02') ||
    text.includes('fai-02') ||
    text.includes('pg final')
  ) {
    return 'pg2'
  }

  if (
    text.includes('pg 1') ||
    text.includes('pg1') ||
    text.includes('pg 1st') ||
    text.includes('pg-01') ||
    text.includes('aml-01')
  ) {
    return 'pg1'
  }

  // 2. Check UG Levels
  if (
    text.includes('ug 4') ||
    text.includes('ug4') ||
    text.includes('ug 4th') ||
    text.includes('ug-04') ||
    text.includes('aaa-04') ||
    text.includes('ug final')
  ) {
    return 'ug4'
  }

  if (
    text.includes('ug 3') ||
    text.includes('ug3') ||
    text.includes('ug 3rd') ||
    text.includes('ug-03') ||
    text.includes('dle-03')
  ) {
    return 'ug3'
  }

  if (
    text.includes('ug 2') ||
    text.includes('ug2') ||
    text.includes('ug 2nd') ||
    text.includes('ug-02') ||
    text.includes('cml-02')
  ) {
    return 'ug2'
  }

  if (
    text.includes('ug 1') ||
    text.includes('ug1') ||
    text.includes('ug 1st') ||
    text.includes('ug-01') ||
    text.includes('cai-01')
  ) {
    return 'ug1'
  }

  // 3. Check Two-Digit Classes (12, 11, 10)
  if (
    text.includes('class 12') ||
    text.includes('class12') ||
    text.includes('cls-12') ||
    text.includes('dlt-12') ||
    text.includes('std 12') ||
    text.includes('grade 12') ||
    text.includes('12th') ||
    /\b(class|std|grade)\s*12\b/.test(text) ||
    /\b12\b/.test(text)
  ) {
    return 'class12'
  }

  if (
    text.includes('class 11') ||
    text.includes('class11') ||
    text.includes('cls-11') ||
    text.includes('mmn-11') ||
    text.includes('std 11') ||
    text.includes('grade 11') ||
    text.includes('11th') ||
    /\b(class|std|grade)\s*11\b/.test(text) ||
    /\b11\b/.test(text)
  ) {
    return 'class11'
  }

  if (
    text.includes('class 10') ||
    text.includes('class10') ||
    text.includes('cls-10') ||
    text.includes('mlf-10') ||
    text.includes('std 10') ||
    text.includes('grade 10') ||
    text.includes('10th') ||
    /\b(class|std|grade)\s*10\b/.test(text) ||
    /\b10\b/.test(text)
  ) {
    return 'class10'
  }

  // 3. Check Single-Digit Classes (9 down to 3)
  if (
    text.includes('class 9') ||
    text.includes('class9') ||
    text.includes('cls-09') ||
    text.includes('ais-09') ||
    text.includes('std 9') ||
    text.includes('grade 9') ||
    text.includes('9th') ||
    /\b(class|std|grade)\s*9\b/.test(text) ||
    /\b9\b/.test(text)
  ) {
    return 'class9'
  }

  if (
    text.includes('class 8') ||
    text.includes('class8') ||
    text.includes('cls-08') ||
    text.includes('aai-08') ||
    text.includes('std 8') ||
    text.includes('grade 8') ||
    text.includes('8th') ||
    /\b(class|std|grade)\s*8\b/.test(text) ||
    /\b8\b/.test(text)
  ) {
    return 'class8'
  }

  if (
    text.includes('class 7') ||
    text.includes('class7') ||
    text.includes('cls-07') ||
    text.includes('dlp-07') ||
    text.includes('std 7') ||
    text.includes('grade 7') ||
    text.includes('7th') ||
    /\b(class|std|grade)\s*7\b/.test(text) ||
    /\b7\b/.test(text)
  ) {
    return 'class7'
  }

  if (
    text.includes('class 6') ||
    text.includes('class6') ||
    text.includes('cls-06') ||
    text.includes('mai-06') ||
    text.includes('std 6') ||
    text.includes('grade 6') ||
    text.includes('6th') ||
    /\b(class|std|grade)\s*6\b/.test(text) ||
    /\b6\b/.test(text)
  ) {
    return 'class6'
  }

  if (
    text.includes('class 5') ||
    text.includes('class5') ||
    text.includes('cls-05') ||
    text.includes('fsc-05') ||
    text.includes('std 5') ||
    text.includes('std5') ||
    text.includes('grade 5') ||
    text.includes('5th') ||
    /\b(class|std|grade)\s*5\b/.test(text) ||
    /\b5\b/.test(text)
  ) {
    return 'class5'
  }

  if (
    text.includes('class 4') ||
    text.includes('class4') ||
    text.includes('cls-04') ||
    text.includes('eai-04') ||
    text.includes('std 4') ||
    text.includes('std4') ||
    text.includes('grade 4') ||
    text.includes('4th') ||
    /\b(class|std|grade)\s*4\b/.test(text) ||
    /\b4\b/.test(text)
  ) {
    return 'class4'
  }

  if (
    text.includes('class 3') ||
    text.includes('class3') ||
    text.includes('cls-03') ||
    text.includes('jai-03') ||
    text.includes('std 3') ||
    text.includes('std3') ||
    text.includes('grade 3') ||
    text.includes('3rd') ||
    /\b(class|std|grade)\s*3\b/.test(text) ||
    /\b3\b/.test(text)
  ) {
    return 'class3'
  }

  return 'class3'
}

export function calculateChapterProgress(completedCount: number): {
  total: 8
  required: 8
  completed: number
  requiredCompleted: number
  percentage: number
  isCompleted: boolean
} {
  const count = Math.max(0, Math.min(8, Math.floor(completedCount || 0)))
  const percentage = SECTION_PERCENTAGES[count] ?? Math.min(100, (count / 8) * 100)
  const isCompleted = count === 8
  return {
    total: 8,
    required: 8,
    completed: count,
    requiredCompleted: count,
    percentage: isCompleted ? 100 : percentage,
    isCompleted,
  }
}

function getPersistentRecordKey(studentId: string): string {
  return `nanjil_section_completions_${studentId}`
}

function loadLocalCompletionRecords(studentId: string): Map<string, SectionCompletionRecord> {
  const map = new Map<string, SectionCompletionRecord>()
  if (!studentId) return map
  try {
    const raw = localStorage.getItem(getPersistentRecordKey(studentId))
    if (raw) {
      const list: SectionCompletionRecord[] = JSON.parse(raw)
      if (Array.isArray(list)) {
        list.forEach(item => {
          if (item?.chapter_id && item?.section_id) {
            const key = `${item.chapter_id}::${item.section_id}`
            map.set(key, item)
          }
        })
      }
    }
  } catch {}
  return map
}

function saveLocalCompletionRecords(studentId: string, map: Map<string, SectionCompletionRecord>): void {
  if (!studentId) return
  try {
    const list = Array.from(map.values())
    localStorage.setItem(getPersistentRecordKey(studentId), JSON.stringify(list))
  } catch {}
}


export interface PageCompletionRecord {
  completedPages: number[]
  completedPagesByChapter?: Record<string, number[]>
  completedChapters: string[]
  lastAccessedPage?: number
  lastReadByChapter?: Record<string, number>
  timeSpentSeconds?: number
  timeSpentByChapter?: Record<string, number>
  updatedAt: string
}

export type StudentPageCompletionStore = Record<string, PageCompletionRecord>

export interface StudentLearningTimeStore {
  totalSeconds: number
  byChapter: Record<string, number>
  byGrade?: Record<string, number>
  lastActiveAt?: string
  updatedAt: string
}

// Monotonic sequence tracker to prevent older async requests from overwriting newer page positions
const lastReadSeqMap = new Map<string, number>()

/**
 * Whole-number progress percentage formatter:
 * - 0% when completed <= 0
 * - Exactly 100% when completed >= total (and only when all pages completed)
 * - Whole-number integer strictly between 1% and 99% when partially complete
 * - Never produces decimal values (e.g. 10%, 42%, 85%, 100%)
 */
export function formatProgressPercentage(completed: number, total: number): { numeric: number; formatted: string } {
  if (!total || total <= 0 || !completed || completed <= 0) {
    return { numeric: 0, formatted: '0%' }
  }
  if (completed >= total) {
    return { numeric: 100, formatted: '100%' }
  }
  const rawPct = (completed / total) * 100
  // Whole-number integer strictly between 1% and 99% when not all pages completed
  const numeric = Math.min(99, Math.max(1, Math.round(rawPct)))
  const formatted = `${numeric}%`
  return { numeric, formatted }
}

/**
 * Clean learning time formatter:
 * - Whole-number hours and minutes (e.g. "1h 15m", "45m", "2h")
 * - If under a minute but positive seconds, returns e.g. "45s"
 * - Returns "0m" for zero
 */
export function formatLearningTime(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds || 0))
  if (s === 0) return '0m'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60

  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h}h`
  }
  if (m > 0) {
    return `${m}m`
  }
  return sec > 0 ? `${sec}s` : '0m'
}

export interface ChapterDefinition {
  index: number
  key: string
  code: string
  chapterNumber: number
  title: string
  subtitle?: string
  pdfPath: string
  totalPages: number
  startPage: number
  endPage: number
}

export const CLASS_PDF_MAP: Record<AppGradeKey, {
  pdfPath: string
  totalPages: number
  className: string
  code: string
}> = {
  class3: { pdfPath: '/books/class3.pdf', totalPages: 218, className: 'Class 3', code: 'CLS-03' },
  class4: { pdfPath: '/books/class4.pdf', totalPages: 218, className: 'Class 4', code: 'CLS-04' },
  class5: { pdfPath: '/books/class5.pdf', totalPages: 218, className: 'Class 5', code: 'CLS-05' },
  class6: { pdfPath: '/books/class6.pdf', totalPages: 230, className: 'Class 6', code: 'CLS-06' },
  class7: { pdfPath: '/books/class7.pdf', totalPages: 230, className: 'Class 7', code: 'CLS-07' },
  class8: { pdfPath: '/books/class8.pdf', totalPages: 230, className: 'Class 8', code: 'CLS-08' },
  class9: { pdfPath: '/books/class9.pdf', totalPages: 230, className: 'Class 9', code: 'CLS-09' },
  class10: { pdfPath: '/books/class10.pdf', totalPages: 230, className: 'Class 10', code: 'CLS-10' },
  class11: { pdfPath: '/books/class11.pdf', totalPages: 282, className: 'Class 11', code: 'CLS-11' },
  class12: { pdfPath: '/books/class12.pdf', totalPages: 282, className: 'Class 12', code: 'CLS-12' },
  ug1: { pdfPath: '/books/ug1.pdf', totalPages: 270, className: 'UG 1st Year', code: 'UG-01' },
  ug2: { pdfPath: '/books/ug2.pdf', totalPages: 266, className: 'UG 2nd Year', code: 'UG-02' },
  ug3: { pdfPath: '/books/ug3.pdf', totalPages: 266, className: 'UG 3rd Year', code: 'UG-03' },
  ug4: { pdfPath: '/books/ug4.pdf', totalPages: 266, className: 'UG Final Year', code: 'UG-04' },
  pg1: { pdfPath: '/books/pg1.pdf', totalPages: 266, className: 'PG 1st Year', code: 'PG-01' },
  pg2: { pdfPath: '/books/pg2.pdf', totalPages: 266, className: 'PG 2nd Year', code: 'PG-02' },
}

export function getClassPdfInfo(gradeKey: string): { pdfPath: string; totalPages: number } {
  const gKey = parseGradeKeyFromClass(gradeKey || 'class3')
  const record = CLASS_PDF_MAP[gKey]
  if (record) {
    return {
      pdfPath: record.pdfPath,
      totalPages: pdfPageCountCache.get(record.pdfPath) || record.totalPages,
    }
  }
  const fallbackPath = `/books/${gKey}.pdf`
  return {
    pdfPath: fallbackPath,
    totalPages: pdfPageCountCache.get(fallbackPath) || 218,
  }
}

export const DEFAULT_CHAPTER_PDFS = [
  { pdfPath: '/books/class10.pdf', totalPages: 230 },
  { pdfPath: '/books/class3.pdf', totalPages: 218 },
  { pdfPath: '/books/class6.pdf', totalPages: 230 },
  { pdfPath: '/books/class4.pdf', totalPages: 218 },
  { pdfPath: '/books/class11.pdf', totalPages: 282 },
  { pdfPath: '/books/class5.pdf', totalPages: 218 },
]

export const pdfPageCountCache = new Map<string, number>([
  ['/books/class10.pdf', 230],
  ['/books/class3.pdf', 218],
  ['/books/class6.pdf', 230],
  ['/books/class4.pdf', 218],
  ['/books/class11.pdf', 282],
  ['/books/class5.pdf', 218],
  ['/books/class7.pdf', 230],
  ['/books/class8.pdf', 230],
  ['/books/class9.pdf', 230],
  ['/books/class12.pdf', 282],
  ['/books/ug1.pdf', 270],
  ['/books/ug2.pdf', 266],
  ['/books/ug3.pdf', 266],
  ['/books/ug4.pdf', 266],
  ['/books/pg1.pdf', 266],
  ['/books/pg2.pdf', 266],
])

export function getClassChapters(gradeKey: string): ChapterDefinition[] {
  const gKey = parseGradeKeyFromClass(gradeKey || 'class3')
  const spec = SYLLABUS_SPECS.find(s => s.gradeKey === gKey) || SYLLABUS_SPECS[0]
  const classPdf = getClassPdfInfo(gKey)
  const bounds = CLASS_CHAPTER_BOUNDARIES[gKey] || CLASS_CHAPTER_BOUNDARIES.class3
  const chapters: ChapterDefinition[] = []

  // 1. Intro / Welcome (Segment 1: exactly first 5 pages 1–5)
  chapters.push({
    index: 0,
    key: 'intro',
    code: 'INTRO',
    chapterNumber: 0,
    title: 'Welcome & Orientation',
    subtitle: `${spec?.name || 'AI Olympiad'} Tools & Foundations`,
    pdfPath: classPdf.pdfPath,
    totalPages: bounds.welcome.totalPages,
    startPage: bounds.welcome.startPage,
    endPage: bounds.welcome.endPage,
  })

  // 2. Chapters 1 to 6 (Segments 2 to 7: Month 1 to Month 6)
  for (let i = 1; i <= 6; i++) {
    const chKey = `ch${i}`
    const chCode = `CH${i}`
    const specChapter = (spec as any)[`c${i}`]
    const title = Array.isArray(specChapter) ? specChapter[0] : (specChapter || `Chapter ${i}`)
    const subtitle = Array.isArray(specChapter) && specChapter[1]
      ? `${specChapter[1]}${specChapter[2] ? ` & ${specChapter[2]}` : ''}`
      : undefined
    const b = (bounds as any)[chKey] || { startPage: 1, endPage: classPdf.totalPages, totalPages: classPdf.totalPages }

    chapters.push({
      index: i,
      key: chKey,
      code: chCode,
      chapterNumber: i,
      title,
      subtitle,
      pdfPath: classPdf.pdfPath,
      totalPages: b.totalPages,
      startPage: b.startPage,
      endPage: b.endPage,
    })
  }

  // 3. Finale (Segment 8: Certificate through final page)
  chapters.push({
    index: 7,
    key: 'finale',
    code: 'FINALE',
    chapterNumber: 7,
    title: 'Olympiad Mastery',
    subtitle: 'Championship Challenge & Certificate',
    pdfPath: classPdf.pdfPath,
    totalPages: bounds.finale.totalPages,
    startPage: bounds.finale.startPage,
    endPage: bounds.finale.endPage,
  })

  return chapters
}

export function normalizeChapterKey(input: string | number | undefined | null): string {
  if (input === undefined || input === null) return 'intro'
  const str = String(input).toLowerCase().trim()
  if (str === '0' || str === 'intro' || str === 'month 0' || str === 'welcome' || str === 'orientation') return 'intro'
  if (str === '7' || str === 'finale' || str === 'month 7' || str === 'certificate' || str === 'showcase' || str === 'mastery') return 'finale'
  if (['intro', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'finale'].includes(str)) return str
  if (['1', '2', '3', '4', '5', '6'].includes(str)) return `ch${str}`
  const match = str.match(/\d+/)
  if (match) {
    const num = parseInt(match[0], 10)
    if (num === 0) return 'intro'
    if (num >= 7) return 'finale'
    return `ch${num}`
  }
  return str || 'intro'
}

function getPagePersistentRecordKey(studentId: string): string {
  return `nanjil_page_completions_${studentId}`
}

function loadLocalPageCompletions(studentId: string): StudentPageCompletionStore {
  if (!studentId) return {}
  try {
    const raw = localStorage.getItem(getPagePersistentRecordKey(studentId))
    if (raw) {
      return JSON.parse(raw) as StudentPageCompletionStore
    }
  } catch {}
  return {}
}

function saveLocalPageCompletions(studentId: string, store: StudentPageCompletionStore): void {
  if (!studentId) return
  try {
    localStorage.setItem(getPagePersistentRecordKey(studentId), JSON.stringify(store))
  } catch {}
}

function getLearningTimeStorageKey(studentId: string): string {
  return `nanjil_learning_time_${studentId}`
}

function loadLocalLearningTime(studentId: string): StudentLearningTimeStore {
  if (!studentId) return { totalSeconds: 0, byChapter: {}, updatedAt: new Date().toISOString() }
  try {
    const raw = localStorage.getItem(getLearningTimeStorageKey(studentId))
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        totalSeconds: Math.max(0, Number(parsed.totalSeconds) || 0),
        byChapter: parsed.byChapter && typeof parsed.byChapter === 'object' ? parsed.byChapter : {},
        byGrade: parsed.byGrade && typeof parsed.byGrade === 'object' ? parsed.byGrade : {},
        lastActiveAt: parsed.lastActiveAt,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      }
    }
  } catch {}
  return { totalSeconds: 0, byChapter: {}, updatedAt: new Date().toISOString() }
}

function saveLocalLearningTime(studentId: string, store: StudentLearningTimeStore): void {
  if (!studentId) return
  try {
    localStorage.setItem(getLearningTimeStorageKey(studentId), JSON.stringify(store))
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// SMOOTH BACKGROUND PERSISTENCE & COALESCING CACHE
// Ensures zero freezing/lagging, debounces rapid page navigation,
// coalesces concurrent requests, and prevents duplicate records.
// ─────────────────────────────────────────────────────────────────────────────

interface PendingProgressJob {
  studentId: string
  gradeKey: string
  chapterKey: string
  lastReadPage: number
  totalPages: number
  completedPages: number[]
  completionPercentage: number
  isCompleted: boolean
  organizationId?: string
  newPageNumber?: number
}

const pendingProgressJobs = new Map<string, PendingProgressJob>()
let progressFlushTimer: ReturnType<typeof setTimeout> | null = null

async function executePendingProgressFlush() {
  if (pendingProgressJobs.size === 0) return
  const jobs = Array.from(pendingProgressJobs.values())
  pendingProgressJobs.clear()

  for (const job of jobs) {
    if (!isUuid(job.studentId)) continue

    try {
      await supabase.from('student_chapter_reading_progress').upsert(
        {
          student_id: job.studentId,
          grade_key: job.gradeKey,
          chapter_key: job.chapterKey,
          last_read_page: job.lastReadPage,
          total_pages: job.totalPages,
          completed_pages: job.completedPages,
          completion_percentage: job.completionPercentage,
          is_completed: job.isCompleted,
          organization_id: job.organizationId && isUuid(job.organizationId) ? job.organizationId : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,grade_key,chapter_key' }
      )
    } catch (err) {
      console.warn('Notice saving chapter reading progress in background:', err)
    }

    if (job.newPageNumber !== undefined) {
      try {
        await supabase.from('student_page_completions').upsert(
          {
            student_id: job.studentId,
            grade_key: job.gradeKey,
            chapter_key: job.chapterKey,
            page_number: job.newPageNumber,
            organization_id: job.organizationId && isUuid(job.organizationId) ? job.organizationId : null,
          },
          { onConflict: 'student_id,grade_key,chapter_key,page_number' }
        )
      } catch (err) {
        console.warn('Notice saving individual page completion in background:', err)
      }
    }
  }
}

function queueProgressPersistence(job: PendingProgressJob) {
  const key = `${job.studentId}:${job.gradeKey}:${job.chapterKey}`
  pendingProgressJobs.set(key, job)

  if (progressFlushTimer) clearTimeout(progressFlushTimer)
  progressFlushTimer = setTimeout(() => {
    executePendingProgressFlush().catch(() => {})
  }, 100)
}

// In-flight query deduplication & memory cache for getCompletedPages
const inFlightCompletedPagesQueries = new Map<string, Promise<number[]>>()
const completedPagesMemoryCache = new Map<string, { pages: number[]; timestamp: number }>()

export const progressService = {
  /**
   * Flushes any queued background progress updates to Supabase immediately (called before unload or unmount)
   */
  async flushPendingUpdates(): Promise<void> {
    if (progressFlushTimer) {
      clearTimeout(progressFlushTimer)
      progressFlushTimer = null
    }
    await executePendingProgressFlush()
  },
  // ─── SAVE AND RESTORE LAST-READ PAGE (PER STUDENT & CHAPTER) ────────────────
  async saveLastReadPage(params: {
    studentId: string
    gradeKey: string
    chapterKey: string
    pageNumber: number
    totalPages?: number
    chapterId?: string
    organizationId?: string
  }): Promise<{ success: boolean; pageNumber: number }> {
    let sId = params.studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    const gKey = parseGradeKeyFromClass(params.gradeKey || 'class3')
    const chKey = normalizeChapterKey(params.chapterKey)
    const chapters = getClassChapters(gKey)
    const chapter = chapters.find(c => c.key === chKey) || chapters[0]

    // Normalize pageNumber to relative page within [1, chapter.totalPages]
    let relPage = Math.max(1, Math.floor(params.pageNumber || 1))
    if (relPage > chapter.totalPages && relPage >= chapter.startPage && relPage <= chapter.endPage) {
      relPage = relPage - chapter.startPage + 1
    }
    const pNum = Math.max(1, Math.min(chapter.totalPages, relPage))

    // Monotonic sequence check to prevent older async requests from overwriting newer positions
    const seqKey = `${sId}:${gKey}:${chKey}`
    const currentSeq = Date.now()
    const lastSeq = lastReadSeqMap.get(seqKey) || 0
    if (currentSeq < lastSeq) {
      return { success: false, pageNumber: pNum }
    }
    lastReadSeqMap.set(seqKey, currentSeq)

    // 1. Immediately update student-isolated localStorage cache
    const cacheKey = `nanjil_reading_position_${sId}_${gKey}_${chKey}`
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          pageNumber: pNum,
          updatedAt: new Date().toISOString(),
        })
      )
    } catch {}

    // Also update student's memory/localStorage store
    const store = loadLocalPageCompletions(sId)
    if (!store[gKey]) {
      store[gKey] = {
        completedPages: [],
        completedPagesByChapter: {},
        completedChapters: [],
        updatedAt: new Date().toISOString(),
      }
    }
    if (!store[gKey].completedPagesByChapter) {
      store[gKey].completedPagesByChapter = {}
    }
    if (!store[gKey].lastReadByChapter) {
      store[gKey].lastReadByChapter = {}
    }
    store[gKey].lastAccessedPage = pNum
    store[gKey].lastReadByChapter[chKey] = pNum
    store[gKey].updatedAt = new Date().toISOString()
    saveLocalPageCompletions(sId, store)

    // 2. Persist to Supabase student_chapter_reading_progress if valid student UUID
    if (isUuid(sId)) {
      try {
        const total = chapter.totalPages
        const completedInChapter = store[gKey].completedPagesByChapter[chKey] || []
        const isDone = completedInChapter.length >= total && total > 0
        const pctObj = formatProgressPercentage(completedInChapter.length, total)

        await supabase.from('student_chapter_reading_progress').upsert(
          {
            student_id: sId,
            grade_key: gKey,
            chapter_key: chKey,
            last_read_page: pNum,
            total_pages: total,
            completed_pages: completedInChapter,
            is_completed: isDone,
            completion_percentage: pctObj.numeric,
            organization_id: params.organizationId && isUuid(params.organizationId) ? params.organizationId : null,
            chapter_id: params.chapterId && isUuid(params.chapterId) ? params.chapterId : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'student_id,grade_key,chapter_key' }
        )
      } catch (err) {
        console.warn('Notice saving reading position to Supabase:', err)
      }
    }

    return { success: true, pageNumber: pNum }
  },

  async getLastReadPage(params: {
    studentId: string
    gradeKey: string
    chapterKey: string
    fallbackStartPage?: number
  }): Promise<number> {
    let sId = params.studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    const gKey = parseGradeKeyFromClass(params.gradeKey || 'class3')
    const chKey = normalizeChapterKey(params.chapterKey)
    const chapters = getClassChapters(gKey)
    const currentChapter = chapters.find(c => c.key === chKey) || chapters[0]

    const fallback = params.fallbackStartPage !== undefined && params.fallbackStartPage !== null
      ? Math.max(1, Math.min(currentChapter.totalPages, params.fallbackStartPage))
      : 1

    const normalizeResult = (rawPage: number): number => {
      if (rawPage > currentChapter.totalPages && rawPage >= currentChapter.startPage && rawPage <= currentChapter.endPage) {
        return rawPage - currentChapter.startPage + 1
      }
      return Math.max(1, Math.min(currentChapter.totalPages, rawPage))
    }

    // 1. Try Supabase first if student ID is UUID
    if (isUuid(sId)) {
      try {
        const { data } = await supabase
          .from('student_chapter_reading_progress')
          .select('last_read_page, completed_pages, is_completed, updated_at')
          .eq('student_id', sId)
          .eq('grade_key', gKey)
          .eq('chapter_key', chKey)
          .maybeSingle()

        if (data && data.last_read_page) {
          const page = normalizeResult(data.last_read_page)
          const cacheKey = `nanjil_reading_position_${sId}_${gKey}_${chKey}`
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                pageNumber: page,
                updatedAt: data.updated_at || new Date().toISOString(),
              })
            )
          } catch {}
          return page
        }
      } catch (err) {
        console.warn('Notice fetching last read page from Supabase:', err)
      }
    }

    // 2. Fall back to student-isolated localStorage cache
    const cacheKey = `nanjil_reading_position_${sId}_${gKey}_${chKey}`
    try {
      const raw = localStorage.getItem(cacheKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.pageNumber) {
          return normalizeResult(parsed.pageNumber)
        }
      }
    } catch {}

    // 3. Fall back to store chapter lastReadByChapter
    try {
      const store = loadLocalPageCompletions(sId)
      if (store[gKey]?.lastReadByChapter?.[chKey]) {
        return normalizeResult(store[gKey].lastReadByChapter[chKey])
      }
    } catch {}

    return fallback
  },

  // ─── DYNAMIC PDF PAGE & CHAPTER PROGRESS ENGINE ────────────────────────────
  async recordPdfPageCompletion(params: {
    studentId: string
    gradeKey: string
    pageNumber: number
    chapterKey?: string
    chapterIndex?: number
    totalPages?: number
    organizationId?: string
    isChapterCompletion?: boolean
  }): Promise<{
    isNew: boolean
    completedPages: number[]
    chapterProgress: {
      completedPages: number
      totalPages: number
      percentage: number
      formattedPercentage: string
      isCompleted: boolean
    }
    overallProgress: {
      completedPages: number
      totalPages: number
      percentage: number
      formattedPercentage: string
    }
    chapterCompleted: boolean
  }> {
    let sId = params.studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    const gKey = parseGradeKeyFromClass(params.gradeKey || 'class3')

    // Resolve chapterKey
    let chKey = 'intro'
    if (params.chapterKey) {
      chKey = normalizeChapterKey(params.chapterKey)
    } else if (params.chapterIndex !== undefined && params.chapterIndex !== null) {
      chKey = normalizeChapterKey(params.chapterIndex)
    }

    const store = loadLocalPageCompletions(sId)
    if (!store[gKey]) {
      store[gKey] = {
        completedPages: [],
        completedPagesByChapter: {},
        completedChapters: [],
        updatedAt: new Date().toISOString(),
      }
    }
    if (!store[gKey].completedPagesByChapter) {
      store[gKey].completedPagesByChapter = {}
    }
    if (!store[gKey].completedPagesByChapter[chKey]) {
      store[gKey].completedPagesByChapter[chKey] = []
    }
    if (!Array.isArray(store[gKey].completedChapters)) {
      store[gKey].completedChapters = []
    }

    // Resolve chapter metadata dynamically
    const chapters = getClassChapters(gKey)
    const currentChapter = chapters.find(c => c.key === chKey) || chapters[0]
    const chTotalPages = currentChapter.totalPages

    // Normalize pageNumber to relative page [1..chTotalPages]
    let rawPage = Math.max(1, Math.floor(params.pageNumber || 1))
    if (rawPage > chTotalPages && rawPage >= currentChapter.startPage && rawPage <= currentChapter.endPage) {
      rawPage = rawPage - currentChapter.startPage + 1
    }
    const pNum = Math.max(1, Math.min(chTotalPages, rawPage))

    const chPageSet = new Set<number>(store[gKey].completedPagesByChapter[chKey])
    const isNew = !chPageSet.has(pNum)

    if (isNew) {
      chPageSet.add(pNum)
      try {
        gamification.addXP(5, sId, `pdf_${gKey}_${chKey}_p${pNum}`)
      } catch {}
    }

    const sortedChapterPages = Array.from(chPageSet).sort((a, b) => a - b)
    store[gKey].completedPagesByChapter[chKey] = sortedChapterPages

    // Calculate unique physical pages across all chapters for overall progress
    const physicalPagesSet = new Set<number>()
    let totalClassPages = 0
    for (const c of chapters) {
      totalClassPages += c.totalPages
      const chPages = store[gKey]?.completedPagesByChapter?.[c.key] || []
      for (const p of chPages) {
        if (p >= 1 && p <= c.totalPages) {
          physicalPagesSet.add(c.startPage + p - 1)
        }
      }
    }
    const totalClassDone = physicalPagesSet.size
    store[gKey].completedPages = Array.from(physicalPagesSet).sort((a, b) => a - b)
    store[gKey].lastAccessedPage = pNum
    store[gKey].updatedAt = new Date().toISOString()

    const chCompletedCount = chPageSet.size
    // A chapter is ONLY complete when all unique pages in that chapter are completed
    const isChapterDone = chCompletedCount >= chTotalPages && chTotalPages > 0
    const chProg = formatProgressPercentage(chCompletedCount, chTotalPages)
    const overallProg = formatProgressPercentage(totalClassDone, totalClassPages)

    if (isChapterDone && !store[gKey].completedChapters.includes(chKey)) {
      store[gKey].completedChapters.push(chKey)
      try {
        gamification.addXP(50, sId, `pdf_chapter_done_${gKey}_${chKey}`)
      } catch {}
    }

    saveLocalPageCompletions(sId, store)

    // Update in-memory cache immediately for 0ms reads
    const cacheKey = `${sId}:${gKey}:${chKey}`
    completedPagesMemoryCache.set(cacheKey, { pages: sortedChapterPages, timestamp: Date.now() })
    completedPagesMemoryCache.set(`${sId}:${gKey}:all`, { pages: store[gKey].completedPages, timestamp: Date.now() })

    // Smooth background persistence: queue update to Supabase without blocking PDF navigation
    if (isUuid(sId)) {
      queueProgressPersistence({
        studentId: sId,
        gradeKey: gKey,
        chapterKey: chKey,
        lastReadPage: pNum,
        totalPages: chTotalPages,
        completedPages: sortedChapterPages,
        completionPercentage: chProg.numeric,
        isCompleted: isChapterDone,
        organizationId: params.organizationId,
        newPageNumber: isNew ? pNum : undefined,
      })
    }

    // Advance class progression if all chapters complete
    if (isChapterDone && store[gKey].completedChapters.length >= chapters.length && params.organizationId) {
      setTimeout(() => {
        progressService.checkAndAdvanceClassProgression(sId, params.organizationId!).catch(() => {})
      }, 100)
    }

    // Dispatch global events for real-time reactivity
    try {
      window.dispatchEvent(
        new CustomEvent('chapter_progress_updated', {
          detail: {
            studentId: sId,
            gradeKey: gKey,
            chapterKey: chKey,
            pageNumber: pNum,
            completedCount: totalClassDone,
            chapterProgress: {
              completedPages: chCompletedCount,
              totalPages: chTotalPages,
              percentage: chProg.numeric,
              formattedPercentage: chProg.formatted,
              isCompleted: isChapterDone,
            },
            overallProgress: {
              completedPages: totalClassDone,
              totalPages: totalClassPages,
              percentage: overallProg.numeric,
              formattedPercentage: overallProg.formatted,
            },
          },
        })
      )
      window.dispatchEvent(
        new CustomEvent('learning_event', {
          detail: {
            type: 'page_completed',
            studentId: sId,
            gradeKey: gKey,
            chapterKey: chKey,
            pageNumber: pNum,
            chapterPct: chProg.numeric,
            chapterPctFormatted: chProg.formatted,
            overallPct: overallProg.numeric,
            overallPctFormatted: overallProg.formatted,
          },
        })
      )
    } catch {}

    return {
      isNew,
      completedPages: sortedChapterPages,
      chapterProgress: {
        completedPages: chCompletedCount,
        totalPages: chTotalPages,
        percentage: chProg.numeric,
        formattedPercentage: chProg.formatted,
        isCompleted: isChapterDone,
      },
      overallProgress: {
        completedPages: totalClassDone,
        totalPages: totalClassPages,
        percentage: overallProg.numeric,
        formattedPercentage: overallProg.formatted,
      },
      chapterCompleted: isChapterDone,
    }
  },

  async getCompletedPages(studentId: string, gradeKey: string, chapterKey?: string, forceRefresh = false): Promise<number[]> {
    let sId = studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    const gKey = parseGradeKeyFromClass(gradeKey || 'class3')
    const chKey = chapterKey ? normalizeChapterKey(chapterKey) : undefined
    const cacheKey = `${sId}:${gKey}:${chKey || 'all'}`

    // 1. Fast memory cache check (within 2000ms return cached immediately without network request)
    if (!forceRefresh) {
      const cached = completedPagesMemoryCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < 2000) {
        return cached.pages
      }
    }

    // 2. Query coalescing: reuse existing in-flight promise for this key
    if (inFlightCompletedPagesQueries.has(cacheKey)) {
      return inFlightCompletedPagesQueries.get(cacheKey)!
    }

    const fetchPromise = (async () => {
      const store = loadLocalPageCompletions(sId)
      const chapters = getClassChapters(gKey)

      let pageList: number[] = []
      if (chKey) {
        pageList = store[gKey]?.completedPagesByChapter?.[chKey] || []
      } else {
        pageList = store[gKey]?.completedPages || []
      }
      const pageSet = new Set<number>(pageList)

      // Sync from Supabase if valid UUID
      if (isUuid(sId)) {
        try {
          let query = supabase
            .from('student_chapter_reading_progress')
            .select('chapter_key, completed_pages')
            .eq('student_id', sId)
            .eq('grade_key', gKey)

          if (chKey) {
            query = query.eq('chapter_key', chKey)
          }

          const { data } = await query
          if (data && Array.isArray(data)) {
            let hasNew = false
            if (!store[gKey]) {
              store[gKey] = {
                completedPages: [],
                completedPagesByChapter: {},
                completedChapters: [],
                updatedAt: new Date().toISOString(),
              }
            }
            if (!store[gKey].completedPagesByChapter) {
              store[gKey].completedPagesByChapter = {}
            }

            for (const row of data) {
              const rowChKey = row.chapter_key
              if (!store[gKey].completedPagesByChapter[rowChKey]) {
                store[gKey].completedPagesByChapter[rowChKey] = []
              }
              const existingRowSet = new Set(store[gKey].completedPagesByChapter[rowChKey])
              if (Array.isArray(row.completed_pages)) {
                for (const p of row.completed_pages) {
                  if (typeof p === 'number' && !existingRowSet.has(p)) {
                    existingRowSet.add(p)
                    hasNew = true
                  }
                  if (chKey && rowChKey === chKey) {
                    pageSet.add(p)
                  } else if (!chKey) {
                    const cDef = chapters.find(c => c.key === rowChKey)
                    if (cDef && typeof p === 'number' && p >= 1 && p <= cDef.totalPages) {
                      pageSet.add(cDef.startPage + p - 1)
                    }
                  }
                }
                store[gKey].completedPagesByChapter[rowChKey] = Array.from(existingRowSet).sort((a, b) => a - b)
              }
            }

            // Recalculate physical unique completed pages across all chapters
            const physicalPagesSet = new Set<number>()
            for (const c of chapters) {
              const chPages = store[gKey]?.completedPagesByChapter?.[c.key] || []
              for (const p of chPages) {
                if (p >= 1 && p <= c.totalPages) {
                  physicalPagesSet.add(c.startPage + p - 1)
                }
              }
            }
            store[gKey].completedPages = Array.from(physicalPagesSet).sort((a, b) => a - b)

            if (hasNew) {
              saveLocalPageCompletions(sId, store)
            }
          }
        } catch (err) {
          // Fall back gracefully to local store
        }
      }

      const result = Array.from(pageSet).sort((a, b) => a - b)
      completedPagesMemoryCache.set(cacheKey, { pages: result, timestamp: Date.now() })
      return result
    })().finally(() => {
      inFlightCompletedPagesQueries.delete(cacheKey)
    })

    inFlightCompletedPagesQueries.set(cacheKey, fetchPromise)
    return fetchPromise
  },

  async getAllChaptersProgress(studentId: string, gradeKey: string): Promise<Array<{
    index: number
    key: string
    code: string
    title: string
    subtitle?: string
    pdfPath: string
    startPage: number
    endPage: number
    totalPages: number
    completedPages: number
    percentage: number
    formattedPercentage: string
    isCompleted: boolean
    learningTimeSeconds: number
    learningTimeFormatted: string
  }>> {
    let sId = studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    const gKey = parseGradeKeyFromClass(gradeKey || 'class3')
    const chapters = getClassChapters(gKey)

    // Ensure all completed pages are synced
    await progressService.getCompletedPages(sId, gKey)
    const store = loadLocalPageCompletions(sId)
    const timeStore = progressService.getLearningTimeSync(sId, gKey)

    return chapters.map((ch) => {
      const chDonePages = Array.from(new Set(store[gKey]?.completedPagesByChapter?.[ch.key] || []))
      const doneCount = chDonePages.length
      const isCompleted = doneCount >= ch.totalPages && ch.totalPages > 0
      const prog = formatProgressPercentage(doneCount, ch.totalPages)
      const chSeconds = Math.max(0, Number(timeStore.byChapter?.[ch.key]) || 0)

      return {
        index: ch.index,
        key: ch.key,
        code: ch.code,
        title: ch.title,
        subtitle: ch.subtitle,
        pdfPath: ch.pdfPath,
        startPage: ch.startPage,
        endPage: ch.endPage,
        totalPages: ch.totalPages,
        completedPages: doneCount,
        percentage: prog.numeric,
        formattedPercentage: prog.formatted,
        isCompleted,
        learningTimeSeconds: chSeconds,
        learningTimeFormatted: formatLearningTime(chSeconds),
      }
    })
  },

  async getPdfOverallProgress(studentId: string, gradeKey?: string): Promise<{
    totalPages: number
    completedPages: number
    percentage: number
    formattedPercentage: string
    completedChaptersCount: number
    totalChaptersCount: number
  }> {
    let sId = studentId || 'demo-student-id'
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        sId = user.id
      }
    } catch {}

    let resolvedGrade = gradeKey ? parseGradeKeyFromClass(gradeKey) : 'class3'
    if (!gradeKey && sId) {
      try {
        const assigned = await enrollmentService.getStudentAssignedGrade(sId)
        if (assigned?.gradeKey) resolvedGrade = assigned.gradeKey
      } catch {}
    }

    const chapters = getClassChapters(resolvedGrade)
    await progressService.getCompletedPages(sId, resolvedGrade)
    const store = loadLocalPageCompletions(sId)

    let totalPages = 0
    let completedPages = 0
    let completedChaptersCount = 0

    for (const ch of chapters) {
      totalPages += ch.totalPages
      const chDoneSet = new Set(store[resolvedGrade]?.completedPagesByChapter?.[ch.key] || [])
      const chDone = chDoneSet.size
      completedPages += chDone
      if (chDone >= ch.totalPages && ch.totalPages > 0) {
        completedChaptersCount++
      }
    }

    const prog = formatProgressPercentage(completedPages, totalPages)

    return {
      totalPages,
      completedPages,
      percentage: prog.numeric,
      formattedPercentage: prog.formatted,
      completedChaptersCount,
      totalChaptersCount: chapters.length,
    }
  },

  async getCanonicalSectionIds(chapterId: string): Promise<string[]> {
    if (!chapterId) return []

    // If chapterId is a DB UUID, query chapter_content table
    if (isUuid(chapterId)) {
      try {
        const { data: dbItems } = await supabase
          .from('chapter_content')
          .select('id, display_order, content_type')
          .eq('chapter_id', chapterId)
          .neq('status', 'archived')
          .order('display_order', { ascending: true })

        if (dbItems && dbItems.length > 0) {
          const ids: string[] = []
          for (let slot = 1; slot <= 8; slot++) {
            const matched = dbItems.find(i => i.display_order === slot)
            if (matched) {
              ids.push(matched.id)
            } else {
              ids.push(`${chapterId}-sec-${slot}`)
            }
          }
          return ids
        }
      } catch {}
    }

    // Default 8 canonical sections for catalog or standard chapters
    return [
      `${chapterId}-sec-1`,
      `${chapterId}-sec-2`,
      `${chapterId}-sec-3`,
      `${chapterId}-sec-4`,
      `${chapterId}-sec-5`,
      `${chapterId}-sec-6`,
      `${chapterId}-sec-7`,
      `${chapterId}-sec-8`,
    ]
  },

  async recordSectionCompletion(params: {
    studentId: string
    classId?: string
    chapterId: string
    sectionId: string
    organizationId?: string
  }): Promise<{ isNew: boolean; completedSectionsCount: number; percentage: number; isCompleted: boolean }> {
    const { studentId, classId, chapterId, sectionId, organizationId } = params
    if (!studentId || !chapterId || !sectionId) {
      return { isNew: false, completedSectionsCount: 0, percentage: 0, isCompleted: false }
    }

    const map = loadLocalCompletionRecords(studentId)
    const recordKey = `${chapterId}::${sectionId}`

    const isNew = !map.has(recordKey)
    if (isNew) {
      const record: SectionCompletionRecord = {
        student_id: studentId,
        class_id: classId,
        chapter_id: chapterId,
        section_id: sectionId,
        organization_id: organizationId,
        status: 'completed',
        completed_at: new Date().toISOString(),
      }
      map.set(recordKey, record)
      saveLocalCompletionRecords(studentId, map)

      // Also persist to Supabase student_content_progress if UUIDs are valid
      if (isUuid(studentId) && isUuid(sectionId) && organizationId && isUuid(organizationId)) {
        try {
          await supabase.from('student_content_progress').upsert(
            {
              student_id: studentId,
              chapter_content_id: sectionId,
              organization_id: organizationId,
              status: 'completed',
              completion_percentage: 100,
              completed_at: record.completed_at,
              last_accessed_at: record.completed_at,
            },
            { onConflict: 'student_id,chapter_content_id' }
          )
        } catch (dbErr) {
          console.warn('Notice persisting to Supabase student_content_progress:', dbErr)
        }
      }
    }

    // Calculate strictly from genuine completed section records
    const canonicalIds = await progressService.getCanonicalSectionIds(chapterId)
    const completedIds = canonicalIds.filter(id => map.has(`${chapterId}::${id}`))
    const calc = calculateChapterProgress(completedIds.length)

    // Trigger class progression check if chapter just reached genuine 8/8 completion
    if (calc.isCompleted && isNew && organizationId) {
      setTimeout(() => {
        progressService.checkAndAdvanceClassProgression(studentId, organizationId, chapterId).catch(() => {})
      }, 50)
    }

    return {
      isNew,
      completedSectionsCount: calc.completed,
      percentage: calc.percentage,
      isCompleted: calc.isCompleted,
    }
  },

  async getCompletedSectionIds(
    studentId: string,
    chapterId: string,
    canonicalSectionIds?: string[]
  ): Promise<string[]> {
    if (!studentId || !chapterId) return []

    const canonicalIds = canonicalSectionIds || await progressService.getCanonicalSectionIds(chapterId)
    const canonicalSet = new Set(canonicalIds)
    const completedSet = new Set<string>()

    // 1. Query Supabase database for genuine completion records
    if (isUuid(studentId)) {
      try {
        const uuidItems = canonicalIds.filter(id => isUuid(id))
        let query = supabase
          .from('student_content_progress')
          .select('chapter_content_id, status')
          .eq('student_id', studentId)
          .eq('status', 'completed')

        if (uuidItems.length > 0) {
          query = query.in('chapter_content_id', uuidItems)
        }

        const { data: dbItems } = await query
        if (dbItems) {
          dbItems.forEach(p => {
            if (p.status === 'completed' && canonicalSet.has(p.chapter_content_id)) {
              completedSet.add(p.chapter_content_id)
            }
          })
        }
      } catch (err) {
        console.warn('Notice querying Supabase student_content_progress:', err)
      }
    }

    // 2. Query persistent completion registry for this student and chapter
    const localMap = loadLocalCompletionRecords(studentId)
    canonicalIds.forEach(id => {
      const recordKey = `${chapterId}::${id}`
      if (localMap.has(recordKey)) {
        completedSet.add(id)
      }
    })

    // Return strictly the matching canonical section IDs
    return canonicalIds.filter(id => completedSet.has(id))
  },

  async upsertProgress(payload: Partial<StudentContentProgress> & {
    student_id: string
    chapter_content_id: string
    organization_id: string
  }): Promise<StudentContentProgress> {
    if (!isUuid(payload.student_id) || !isUuid(payload.chapter_content_id) || !isUuid(payload.organization_id)) {
      return {
        id: `mock-prog-${payload.chapter_content_id}`,
        student_id: payload.student_id,
        chapter_content_id: payload.chapter_content_id,
        organization_id: payload.organization_id,
        status: payload.status || 'completed',
        completion_percentage: payload.completion_percentage || 100,
        time_spent: payload.time_spent || 0,
        last_accessed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as StudentContentProgress
    }

    const { data, error } = await supabase
      .from('student_content_progress')
      .upsert(
        { ...payload, last_accessed_at: new Date().toISOString() },
        { onConflict: 'student_id,chapter_content_id' }
      )
      .select()
      .single()
    if (error) throw error
    return data
  },

  async markCompleted(
    studentId: string,
    contentId: string,
    organizationId: string,
    chapterId?: string,
    classId?: string
  ): Promise<StudentContentProgress> {
    const resolvedChapterId = chapterId || (contentId.includes('-sec-') ? contentId.split('-sec-')[0] : '')

    if (resolvedChapterId) {
      await progressService.recordSectionCompletion({
        studentId,
        classId,
        chapterId: resolvedChapterId,
        sectionId: contentId,
        organizationId,
      })
    }

    const res = await progressService.upsertProgress({
      student_id: studentId,
      chapter_content_id: contentId,
      organization_id: organizationId,
      status: 'completed',
      completion_percentage: 100,
      completed_at: new Date().toISOString(),
    })

    return res
  },

  async updateVideoProgress(studentId: string, contentId: string, organizationId: string, position: number, duration: number) {
    const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0
    const status = pct >= 90 ? 'completed' : pct > 0 ? 'in_progress' : 'not_started'
    return progressService.upsertProgress({
      student_id: studentId,
      chapter_content_id: contentId,
      organization_id: organizationId,
      video_position: position,
      completion_percentage: pct,
      status: status as 'not_started' | 'in_progress' | 'completed',
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {}),
      ...(pct > 0 ? { started_at: new Date().toISOString() } : {}),
    })
  },

  async getChapterProgress(
    studentId: string,
    chapterId: string,
    canonicalSectionIds?: string[]
  ): Promise<{
    total: 8
    required: 8
    completed: number
    requiredCompleted: number
    percentage: number
    isCompleted: boolean
    completedSectionIds: string[]
  }> {
    if (!studentId || !chapterId) {
      return {
        total: 8,
        required: 8,
        completed: 0,
        requiredCompleted: 0,
        percentage: 0,
        isCompleted: false,
        completedSectionIds: [],
      }
    }

    const canonicalIds = canonicalSectionIds || await progressService.getCanonicalSectionIds(chapterId)
    const completedIds = await progressService.getCompletedSectionIds(studentId, chapterId, canonicalIds)
    const count = Math.min(8, completedIds.length)

    const calc = calculateChapterProgress(count)

    return {
      total: 8,
      required: 8,
      completed: calc.completed,
      requiredCompleted: calc.completed,
      percentage: calc.percentage,
      isCompleted: calc.isCompleted,
      completedSectionIds: completedIds,
    }
  },

  async getProgressForContents(studentId: string, contentIds: string[]): Promise<Map<string, StudentContentProgress>> {
    const validIds = contentIds.filter(id => isUuid(id))
    if (validIds.length === 0 || !isUuid(studentId)) return new Map()
    const { data } = await supabase
      .from('student_content_progress')
      .select('*')
      .eq('student_id', studentId)
      .in('chapter_content_id', validIds)
    const map = new Map<string, StudentContentProgress>()
    ;(data || []).forEach(p => map.set(p.chapter_content_id, p))
    return map
  },

  getLearningTimeSync(studentId: string, _gradeKey?: string): StudentLearningTimeStore {
    const sId = studentId || 'demo-student-id'
    const store = loadLocalLearningTime(sId)

    // Accurate calculation: sum of genuine active time spent working inside chapters
    const chTotal = Object.values(store.byChapter || {}).reduce((sum, sec) => sum + (Number(sec) || 0), 0)
    store.totalSeconds = Math.max(store.totalSeconds || 0, chTotal)

    return store
  },

  async getLearningTime(studentId: string, gradeKey?: string): Promise<StudentLearningTimeStore> {
    let sId = studentId || 'demo-student-id'
    if (isUuid(sId)) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) sId = user.id
      } catch {}
    }
    const localStore = progressService.getLearningTimeSync(sId, gradeKey)

    // Sync from Supabase student_content_progress if available
    if (isUuid(sId)) {
      try {
        const { data } = await supabase
          .from('student_content_progress')
          .select('time_spent')
          .eq('student_id', sId)

        if (data && data.length > 0) {
          const dbSum = data.reduce((sum, item) => sum + (item.time_spent || 0), 0)
          if (dbSum > localStore.totalSeconds) {
            localStore.totalSeconds = dbSum
            saveLocalLearningTime(sId, localStore)
          }
        }
      } catch {}
    }

    return localStore
  },

  async recordLearningTime(params: {
    studentId: string
    gradeKey?: string
    chapterKey?: string
    elapsedSeconds: number
    organizationId?: string
  }): Promise<{ totalSeconds: number; chapterSeconds: number }> {
    const { studentId, gradeKey, chapterKey, elapsedSeconds, organizationId } = params
    const sId = studentId || 'demo-student-id'
    if (!elapsedSeconds || elapsedSeconds <= 0) {
      const current = progressService.getLearningTimeSync(sId, gradeKey)
      const chKey = normalizeChapterKey(chapterKey || 'intro')
      return { totalSeconds: current.totalSeconds, chapterSeconds: current.byChapter[chKey] || 0 }
    }

    const gKey = parseGradeKeyFromClass(gradeKey || 'class3')
    const chKey = normalizeChapterKey(chapterKey || 'intro')
    // Cap any single delta to 10 minutes (600 seconds) to guard against background sleep jumps
    const safeDelta = Math.min(600, Math.max(1, Math.round(elapsedSeconds)))

    const store = loadLocalLearningTime(sId)
    if (!store.byChapter) store.byChapter = {}
    store.byChapter[chKey] = (store.byChapter[chKey] || 0) + safeDelta

    if (!store.byGrade) store.byGrade = {}
    store.byGrade[gKey] = (store.byGrade[gKey] || 0) + safeDelta

    // Total learning time is the exact sum of time spent working inside chapters
    store.totalSeconds = Object.values(store.byChapter).reduce((sum, s) => sum + (Number(s) || 0), 0)

    store.lastActiveAt = new Date().toISOString()
    store.updatedAt = new Date().toISOString()
    saveLocalLearningTime(sId, store)

    // Mirror to PageCompletionRecord
    try {
      const pageStore = loadLocalPageCompletions(sId)
      if (!pageStore[gKey]) {
        pageStore[gKey] = {
          completedPages: [],
          completedPagesByChapter: {},
          completedChapters: [],
          updatedAt: new Date().toISOString()
        }
      }
      pageStore[gKey].timeSpentSeconds = store.totalSeconds
      if (!pageStore[gKey].timeSpentByChapter) pageStore[gKey].timeSpentByChapter = {}
      pageStore[gKey].timeSpentByChapter[chKey] = store.byChapter[chKey]
      saveLocalPageCompletions(sId, pageStore)
    } catch {}

    // Async sync to Supabase student_content_progress in background if UUID
    if (isUuid(sId) && organizationId && isUuid(organizationId)) {
      try {
        const contentId = `${chKey}-sec-1`
        if (isUuid(contentId)) {
          Promise.resolve(
            supabase.from('student_content_progress').upsert(
              {
                student_id: sId,
                chapter_content_id: contentId,
                organization_id: organizationId,
                time_spent: store.byChapter[chKey],
                last_accessed_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              },
              { onConflict: 'student_id,chapter_content_id' }
            )
          ).catch(() => {})
        }
      } catch {}
    }

    // Broadcast live update events
    try {
      window.dispatchEvent(
        new CustomEvent('learning_time_updated', {
          detail: {
            studentId: sId,
            gradeKey: gKey,
            chapterKey: chKey,
            totalSeconds: store.totalSeconds,
            chapterSeconds: store.byChapter[chKey],
            deltaSeconds: safeDelta
          }
        })
      )
      window.dispatchEvent(
        new CustomEvent('chapter_progress_updated', {
          detail: {
            studentId: sId,
            gradeKey: gKey,
            chapterKey: chKey,
            learningTimeSeconds: store.totalSeconds
          }
        })
      )
    } catch {}

    return { totalSeconds: store.totalSeconds, chapterSeconds: store.byChapter[chKey] }
  },

  async getStudentOverallProgress(studentId: string, _organizationId?: string) {
    let contentTime = 0
    let avgCompletion = 0

    if (isUuid(studentId)) {
      try {
        const { data } = await supabase
          .from('student_content_progress')
          .select('chapter_content_id, status, time_spent, completion_percentage')
          .eq('student_id', studentId)

        if (data && data.length > 0) {
          data.forEach(i => {
            contentTime += i.time_spent || 0
          })
          avgCompletion = data.reduce((sum, i) => sum + (i.completion_percentage || 0), 0) / data.length
        }
      } catch {}
    }

    const pdfOverall = await progressService.getPdfOverallProgress(studentId)
    const learningTime = progressService.getLearningTimeSync(studentId)

    const totalTime = Math.max(learningTime.totalSeconds || 0, contentTime || 0)

    return {
      completed: pdfOverall.completedPages,
      totalTime,
      quizAvg: avgCompletion || pdfOverall.percentage,
      totalItems: pdfOverall.totalPages,
    }
  },

  async checkAndAdvanceClassProgression(
    studentId: string,
    organizationId: string,
    _chapterId?: string
  ): Promise<ProgressionResult> {
    const enrollments = await enrollmentService.getAllStudentEnrollments(studentId)
    const activeEnr = enrollments.find(e => e.status === 'active') || enrollments[enrollments.length - 1]

    let classCompleted = false
    let currentGradeKey: string | undefined
    let currentClassName: string | undefined
    let nextGradeKey: string | undefined
    let nextClassName: string | undefined
    let nextSubjectName: string | undefined
    let message: string | undefined

    // Determine student's current level index in SYLLABUS_SPECS
    let currentSpecIdx = 0
    if (activeEnr) {
      const cleanName = activeEnr.class?.name?.toLowerCase().replace(/[\s-_]/g, '')
      const cleanCode = activeEnr.class?.code?.toLowerCase().replace(/[\s-_]/g, '')
      const idx = SYLLABUS_SPECS.findIndex(s =>
        (cleanName && s.name.toLowerCase().replace(/[\s-_]/g, '') === cleanName) ||
        (cleanCode && s.code.toLowerCase().replace(/[\s-_]/g, '') === cleanCode) ||
        activeEnr.class_id?.includes(s.gradeKey)
      )
      if (idx !== -1) currentSpecIdx = idx
    }

    const currentSpec = SYLLABUS_SPECS[currentSpecIdx]
    currentGradeKey = currentSpec.gradeKey
    currentClassName = currentSpec.name

    // Check all 6 chapters for the CURRENT active class
    let totalCompletedChapters = 0
    const totalChaps = 6

    for (let chIdx = 1; chIdx <= totalChaps; chIdx++) {
      let isChapDone = false
      let targetChapterId = `cat-${currentSpec.gradeKey}-${chIdx}`

      try {
        const { data: dbChaps } = await supabase
          .from('chapters')
          .select('id, subject:subjects!inner(class:classes!inner(name))')
          .ilike('subject.class.name', `%${currentSpec.name}%`)
          .eq('chapter_number', String(chIdx))
        
        if (dbChaps && dbChaps.length > 0 && dbChaps[0].id) {
          targetChapterId = dbChaps[0].id
        }
      } catch {}

      const prog = await progressService.getChapterProgress(studentId, targetChapterId)
      // A chapter is 100% complete ONLY when all 8 sections are genuinely completed
      if (prog.completed === 8 && prog.percentage === 100 && prog.isCompleted) {
        isChapDone = true
      }

      if (isChapDone) {
        totalCompletedChapters++
      }
    }

    // Only if ALL 6 chapters (all 48 sections) in the current class are 100% completed
    if (totalCompletedChapters >= totalChaps) {
      classCompleted = true

      // 1. Mark current and any prior active enrollments as 'completed' in Supabase
      try {
        const { data: currentDbClasses } = await supabase
          .from('classes')
          .select('id')
          .ilike('name', `%${currentSpec.name}%`)
        const classIdsToComplete = (currentDbClasses || []).map(c => c.id).filter(id => isUuid(id))

        if (classIdsToComplete.length > 0 && isUuid(studentId)) {
          await supabase
            .from('enrollments')
            .update({ status: 'completed' })
            .eq('student_id', studentId)
            .in('class_id', classIdsToComplete)
        }

        // Also ensure no multiple lingering active enrollments
        if (isUuid(studentId)) {
          await supabase
            .from('enrollments')
            .update({ status: 'completed' })
            .eq('student_id', studentId)
            .eq('status', 'active')
        }
      } catch (err) {
        console.warn('Failed to update completed enrollment status in DB:', err)
      }

      // 2. Check if there is a next class in the sequential syllabus (Class 3 -> 4 -> 5...)
      if (currentSpecIdx < SYLLABUS_SPECS.length - 1) {
        const nextSpec = SYLLABUS_SPECS[currentSpecIdx + 1]
        nextGradeKey = nextSpec.gradeKey
        nextClassName = nextSpec.name
        nextSubjectName = nextSpec.subjectName

        // Find or create next class in Database
        let nextDbClass: any = null
        if (organizationId && isUuid(organizationId)) {
          const { data: foundCls } = await supabase
            .from('classes')
            .select('id, organization_id')
            .eq('organization_id', organizationId)
            .ilike('name', `%${nextSpec.name}%`)
            .maybeSingle()
          nextDbClass = foundCls
        }

        if (!nextDbClass && organizationId && isUuid(organizationId)) {
          const { data: newCls } = await supabase
            .from('classes')
            .insert({
              organization_id: organizationId,
              name: nextSpec.name,
              code: nextSpec.code,
              status: 'published',
              display_order: currentSpecIdx + 2,
            })
            .select()
            .single()
          nextDbClass = newCls
        }

        // Find or create next subject in Database
        let nextSubId: string | undefined
        if (nextDbClass && isUuid(nextDbClass.id) && organizationId && isUuid(organizationId)) {
          let { data: nextDbSub } = await supabase
            .from('subjects')
            .select('id')
            .eq('organization_id', organizationId)
            .eq('class_id', nextDbClass.id)
            .maybeSingle()

          if (!nextDbSub) {
            const { data: newSub } = await supabase
              .from('subjects')
              .insert({
                organization_id: organizationId,
                class_id: nextDbClass.id,
                name: nextSpec.subjectName,
                code: nextSpec.subjectCode,
                description: `Curriculum for ${nextSpec.name}`,
                status: 'published',
                display_order: 1,
              })
              .select()
              .single()
            nextDbSub = newSub
          }
          nextSubId = nextDbSub?.id
        }

        // 3. Automatically enroll ONLY the next class with status 'active' in Database
        try {
          if (isUuid(studentId) && nextDbClass?.id && isUuid(nextDbClass.id)) {
            await supabase
              .from('enrollments')
              .insert({
                student_id: studentId,
                organization_id: organizationId || nextDbClass.organization_id,
                class_id: nextDbClass.id,
                ...(nextSubId && isUuid(nextSubId) ? { subject_id: nextSubId } : {}),
                status: 'active',
                enrolled_at: new Date().toISOString(),
              })
          }
        } catch (err) {
          console.warn('Failed to insert next enrollment in Supabase:', err)
        }

        // Set local storage to have only the new active class key
        try {
          const enrKey = `enrolled_classes_${studentId}`
          localStorage.setItem(enrKey, JSON.stringify([nextSpec.gradeKey]))
        } catch {}

        message = `Academic Level Mastered! You have completed ${currentSpec.name} and moved to ${nextSpec.name} (${nextSpec.subjectName})!`
        
        // Dispatch window event for live UI reactivity across Dashboard, My Learning, and Header
        window.dispatchEvent(new CustomEvent('class_progression_advanced', {
          detail: {
            completedClass: currentSpec.name,
            nextClass: nextSpec.name,
            nextGradeKey: nextSpec.gradeKey,
            nextSubjectName: nextSpec.subjectName,
          }
        }))
      } else {
        // Mastered final level (PG Final Year)
        message = `Ultimate Academic Achievement! You have mastered the entire AI Olympiad curriculum through ${currentSpec.name}!`
      }
    }

    return {
      lessonCompleted: true,
      chapterCompleted: true,
      classCompleted,
      currentGradeKey,
      currentClassName,
      nextGradeKey,
      nextClassName,
      nextSubjectName,
      message,
    }
  },

  async getSubjectProgressionMap(studentId: string, _orgId?: string, subjectId?: string) {
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*, contents:chapter_content(id, is_required, status)')
      .eq('subject_id', subjectId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (error || !chapters || chapters.length === 0) {
      // Query subject details from DB if subjectId is a UUID
      let subjectMeta: any = null
      if (subjectId && !subjectId.startsWith('cat-')) {
        try {
          const { data: sData } = await supabase
            .from('subjects')
            .select('*, class:classes(*)')
            .eq('id', subjectId)
            .single()
          subjectMeta = sData
        } catch {}
      }

      // Return catalog chapters mapped with genuine progress
      const lvl =
        curriculumCatalogService.getLevelData(subjectMeta?.class?.name) ||
        curriculumCatalogService.getLevelData(subjectMeta?.class?.code) ||
        curriculumCatalogService.getLevelData(subjectMeta?.name) ||
        curriculumCatalogService.getLevelData(subjectMeta?.code) ||
        curriculumCatalogService.getLevelData(subjectId) ||
        ALL_LEVELS_CURRICULUM[0]

      const mappedList = []
      for (const c of lvl.chapters) {
        const catId = `cat-${lvl.gradeKey}-${c.chapterNumber}`
        const prog = await progressService.getChapterProgress(studentId, catId)
        mappedList.push({
          id: catId,
          chapter_number: c.chapterNumber,
          title: c.chapterTitle,
          short_description: c.shortDescription,
          estimated_duration: c.duration,
          progress: prog,
          is_completed: prog.isCompleted,
          is_locked: false,
        })
      }
      return mappedList
    }

    const chapterList = []

    for (let idx = 0; idx < chapters.length; idx++) {
      const chap = chapters[idx]
      const prog = await progressService.getChapterProgress(studentId, chap.id)
      const isCompleted = prog.isCompleted && prog.completed === 8
      const isLocked = false

      chapterList.push({
        ...chap,
        progress: prog,
        is_completed: isCompleted,
        is_locked: isLocked,
      })
    }

    return chapterList
  },

  async getStudentDetailedDashboard(studentId: string, orgId: string): Promise<StudentDashboardData> {
    // 1. Fetch student enrollments
    const enrollments = await enrollmentService.getAllStudentEnrollments(studentId)
    let activeEnr = enrollments.find(e => e.status === 'active') || (enrollments.length > 0 ? enrollments[enrollments.length - 1] : null)

    if (!activeEnr) {
      try {
        const assigned = await enrollmentService.getStudentAssignedGrade(studentId, orgId);
        if (assigned && assigned.gradeKey) {
          activeEnr = {
            id: 'enr-' + studentId,
            student_id: studentId,
            organization_id: orgId,
            class_id: 'cat-cls-' + assigned.gradeKey,
            status: 'active',
            enrolled_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            class: {
              id: 'cat-cls-' + assigned.gradeKey,
              name: assigned.className,
              code: assigned.code || '',
            } as any,
            subject: {
              id: 'cat-sub-' + assigned.gradeKey,
              name: assigned.subjectName || '',
              class_id: 'cat-cls-' + assigned.gradeKey,
            } as any,
          } as any as Enrollment;
        }
      } catch {}
    }

    if (!activeEnr) {
      return {
        assignedClass: null,
        assignedSubject: null,
        assignedChapters: [],
        totalChapters: 0,
        completedChapters: 0,
        overallPercentage: 0,
        currentChapter: null,
        currentSection: null,
        nextLesson: null,
        pendingActivities: 0,
        quizAvg: 0,
        totalQuizzesTaken: 0,
        enrollments: [],
      }
    }

    // 2. Resolve enrolled Class and Subject
    let enrolledClass = activeEnr.class || null
    let enrolledSubject = activeEnr.subject || null

    if (!enrolledClass && activeEnr.class_id && isUuid(activeEnr.class_id)) {
      try {
        const { data: cData } = await supabase.from('classes').select('*, category:categories(*)').eq('id', activeEnr.class_id).maybeSingle()
        if (cData) enrolledClass = cData
      } catch {}
    }
    if (!enrolledSubject && activeEnr.subject_id && isUuid(activeEnr.subject_id)) {
      try {
        const { data: sData } = await supabase.from('subjects').select('*').eq('id', activeEnr.subject_id).maybeSingle()
        if (sData) enrolledSubject = sData
      } catch {}
    }

    // 3. Find ONLY the assigned chapters for this student
    let chapList: any[] = []

    // If specific subject assigned
    if (activeEnr.subject_id && isUuid(activeEnr.subject_id)) {
      const { data: dbChaps } = await supabase
        .from('chapters')
        .select('*, subject:subjects(id, name, class_id), contents:chapter_content(id, title, content_type, is_required, status, display_order)')
        .eq('subject_id', activeEnr.subject_id)
        .neq('status', 'archived')
        .order('display_order', { ascending: true })

      if (dbChaps && dbChaps.length > 0) {
        chapList = dbChaps
      }
    } else if (activeEnr.class_id && isUuid(activeEnr.class_id)) {
      // Find all published subjects for this class
      const { data: classSubs } = await supabase
        .from('subjects')
        .select('id, name, class_id')
        .eq('class_id', activeEnr.class_id)
        .neq('status', 'archived')

      if (classSubs && classSubs.length > 0) {
        const subIds = classSubs.map(s => s.id)
        const { data: dbChaps } = await supabase
          .from('chapters')
          .select('*, subject:subjects(id, name, class_id), contents:chapter_content(id, title, content_type, is_required, status, display_order)')
          .in('subject_id', subIds)
          .neq('status', 'archived')
          .order('display_order', { ascending: true })

        if (dbChaps && dbChaps.length > 0) {
          chapList = dbChaps
        }
      }
    }

    // If no custom DB chapters exist, check if class/subject corresponds to the AI Olympiad Curriculum Catalog
    const resolvedGrade = parseGradeKeyFromClass(enrolledClass || activeEnr?.class_id || 'class3');
    const bookEntry = (bookCatalogData as any)[resolvedGrade] || (bookCatalogData as any)['class3'];

    if (chapList.length === 0 && bookEntry?.chapters && bookEntry.chapters.length > 0) {
      chapList = bookEntry.chapters.map((c: any, idx: number) => ({
        id: `book-${resolvedGrade}-${c.key}`,
        organization_id: orgId,
        subject_id: enrolledSubject?.id || `cat-sub-${resolvedGrade}`,
        subject_name: enrolledSubject?.name || 'AI Olympiad Interactive Curriculum',
        title: c.title,
        chapter_number: idx === 0 ? 'Intro' : idx === 7 ? 'Finale' : String(idx),
        short_description: `Pages ${c.startPage} - ${c.endPage} (${c.endPage - c.startPage + 1} pages)`,
        description: c.title,
        status: 'published',
        estimated_duration: (c.endPage - c.startPage + 1) * 3,
        display_order: idx + 1,
        startPage: c.startPage,
        endPage: c.endPage,
        created_by: 'system',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }

    if (chapList.length === 0) {
      const allLevelsData = curriculumCatalogService.getAllLevelsData()
      const cleanClassName = enrolledClass?.name?.toLowerCase().replace(/[\s-_]/g, '') || ''
      const cleanClassCode = enrolledClass?.code?.toLowerCase().replace(/[\s-_]/g, '') || ''

      const matchedLvl = allLevelsData.find(l =>
        (cleanClassName && l.name.toLowerCase().replace(/[\s-_]/g, '') === cleanClassName) ||
        (cleanClassCode && l.code.toLowerCase().replace(/[\s-_]/g, '') === cleanClassCode) ||
        (cleanClassName && l.name.toLowerCase().includes(cleanClassName)) ||
        (cleanClassName && cleanClassName.includes(l.name.toLowerCase().replace(/[\s-_]/g, ''))) ||
        (activeEnr.class_id && activeEnr.class_id.includes(l.gradeKey))
      )

      if (matchedLvl) {
        if (!enrolledClass) {
          enrolledClass = {
            id: `cat-cls-${matchedLvl.gradeKey}`,
            organization_id: orgId,
            category_id: `cat-${matchedLvl.gradeKey}`,
            name: matchedLvl.name,
            code: matchedLvl.code,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }
        if (!enrolledSubject) {
          enrolledSubject = {
            id: `cat-sub-${matchedLvl.gradeKey}`,
            organization_id: orgId,
            class_id: enrolledClass.id,
            name: matchedLvl.subjectName,
            code: matchedLvl.subjectCode,
            description: matchedLvl.description,
            status: 'published',
            display_order: 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }

        chapList = matchedLvl.chapters.map(c => ({
          id: `cat-${matchedLvl.gradeKey}-${c.chapterNumber}`,
          organization_id: orgId,
          subject_id: enrolledSubject?.id || `cat-sub-${matchedLvl.gradeKey}`,
          subject_name: matchedLvl.subjectName,
          title: c.chapterTitle,
          chapter_number: c.chapterNumber,
          short_description: c.shortDescription,
          description: c.description,
          status: 'published',
          estimated_duration: c.duration,
          display_order: parseInt(c.chapterNumber, 10),
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      }
    }

    // 4. Batch fetch student completions in ONE single query for the entire curriculum
    const allDbContentIds: string[] = []
    for (const chap of chapList) {
      if (Array.isArray(chap.contents)) {
        for (const c of chap.contents) {
          if (c && c.id) allDbContentIds.push(c.id)
        }
      }
    }

    const studentCompletedIdsSet = new Set<string>()
    if (isUuid(studentId)) {
      try {
        let query = supabase
          .from('student_content_progress')
          .select('chapter_content_id')
          .eq('student_id', studentId)
          .eq('status', 'completed')
        
        if (allDbContentIds.length > 0) {
          query = query.in('chapter_content_id', allDbContentIds)
        }

        const { data: dbItems } = await query
        if (dbItems) {
          dbItems.forEach((p: any) => {
            if (p.chapter_content_id) studentCompletedIdsSet.add(p.chapter_content_id)
          })
        }
      } catch (err) {
        console.warn('Notice batch querying student_content_progress:', err)
      }
    }

    // Also include local completion records in memory
    const localCompletionMap = loadLocalCompletionRecords(studentId)

    // Calculate chapter progress synchronously from pre-fetched sets
    const assignedChapters: StudentChapterProgressionItem[] = []
    let completedChaptersCount = 0
    let totalSectionsPossible = 0
    let totalSectionsDone = 0
    let firstIncompleteChap: any = null

    for (const chap of chapList) {
      // Resolve canonical section IDs for this chapter synchronously
      let canonicalIds: string[] = []
      if (Array.isArray(chap.contents) && chap.contents.length > 0) {
        for (let slot = 1; slot <= 8; slot++) {
          const matched = chap.contents.find((i: any) => i.display_order === slot)
          canonicalIds.push(matched ? matched.id : `${chap.id}-sec-${slot}`)
        }
      } else {
        canonicalIds = [
          `${chap.id}-sec-1`,
          `${chap.id}-sec-2`,
          `${chap.id}-sec-3`,
          `${chap.id}-sec-4`,
          `${chap.id}-sec-5`,
          `${chap.id}-sec-6`,
          `${chap.id}-sec-7`,
          `${chap.id}-sec-8`,
        ]
      }

      // Count genuine completed sections from pre-fetched Set and local records
      let doneSec = 0
      for (const secId of canonicalIds) {
        if (studentCompletedIdsSet.has(secId) || localCompletionMap.has(`${chap.id}::${secId}`)) {
          doneSec++
        }
      }
      doneSec = Math.min(8, doneSec)
      const totalSec = 8
      const pct = doneSec === 8 ? 100 : (SECTION_PERCENTAGES[doneSec] ?? Math.min(100, (doneSec / 8) * 100))
      const isDone = doneSec === 8
      const isInProg = !isDone && doneSec > 0
      const isNotStarted = doneSec === 0

      if (isDone) {
        completedChaptersCount++
      } else if (!firstIncompleteChap) {
        firstIncompleteChap = {
          ...chap,
          completedSections: doneSec,
          totalSections: totalSec,
        }
      }

      totalSectionsPossible += totalSec
      totalSectionsDone += doneSec

      assignedChapters.push({
        id: chap.id,
        organization_id: chap.organization_id,
        subject_id: chap.subject_id,
        subject_name: chap.subject?.name || enrolledSubject?.name || 'AI Curriculum',
        chapter_number: chap.chapter_number || '1',
        title: chap.title,
        short_description: chap.short_description,
        description: chap.description,
        status: chap.status || 'published',
        estimated_duration: chap.estimated_duration || 45,
        display_order: chap.display_order,
        progress: {
          total: totalSec,
          completed: doneSec,
          percentage: pct,
        },
        completedSections: doneSec,
        totalSections: totalSec,
        percentage: pct,
        is_completed: isDone,
        is_in_progress: isInProg,
        is_not_started: isNotStarted,
      })
    }

    const overallPercentage = totalSectionsPossible > 0
      ? formatProgressPercentage(totalSectionsDone, totalSectionsPossible).numeric
      : 0

    const currentChapter = firstIncompleteChap || (assignedChapters.length > 0 ? assignedChapters[0] : null)

    const nextLesson = firstIncompleteChap ? {
      chapterId: firstIncompleteChap.id,
      chapterTitle: firstIncompleteChap.title,
      chapterNumber: firstIncompleteChap.chapter_number,
      contentTitle: firstIncompleteChap.completedSections > 0
        ? `Resume Section ${firstIncompleteChap.completedSections + 1}`
        : 'Start Section 1',
    } : null

    // Quizzes & Submissions
    let quizAvg = 0
    let totalQuizzesTaken = 0
    try {
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('scored_marks, total_marks, percentage, passed')
        .eq('student_id', studentId)
        .eq('status', 'completed')

      const completedAttempts = attempts || []
      totalQuizzesTaken = completedAttempts.length
      if (completedAttempts.length > 0) {
        quizAvg = Math.round(completedAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / completedAttempts.length)
      }
    } catch {}

    // Synchronize with dynamic PDF progress if available
    let finalOverallPercentage = overallPercentage;
    try {
      const resolvedGradeKey = parseGradeKeyFromClass(enrolledClass || activeEnr?.class_id);
      const pdfOverall = await progressService.getPdfOverallProgress(studentId, resolvedGradeKey);
      const pdfChapters = await progressService.getAllChaptersProgress(studentId, resolvedGradeKey);

      if (pdfOverall.completedPages > 0 || pdfOverall.percentage > 0) {
        assignedChapters.forEach((ch, idx) => {
          const pCh = pdfChapters[idx];
          if (pCh) {
            ch.progress = {
              total: pCh.totalPages,
              completed: pCh.completedPages,
              percentage: pCh.percentage,
            };
            ch.completedSections = pCh.completedPages;
            ch.totalSections = pCh.totalPages;
            ch.percentage = pCh.percentage;
            ch.is_completed = pCh.isCompleted;
            ch.is_in_progress = !pCh.isCompleted && pCh.completedPages > 0;
            ch.is_not_started = pCh.completedPages === 0;
          }
        });
        completedChaptersCount = pdfOverall.completedChaptersCount;
        finalOverallPercentage = pdfOverall.percentage;
      }
    } catch {}

    return {
      assignedClass: enrolledClass,
      assignedSubject: enrolledSubject,
      assignedChapters,
      totalChapters: assignedChapters.length,
      completedChapters: completedChaptersCount,
      overallPercentage: finalOverallPercentage,
      currentChapter,
      currentSection: nextLesson?.contentTitle || (completedChaptersCount >= assignedChapters.length && assignedChapters.length > 0 ? 'All Chapters Mastered' : null),
      nextLesson,
      pendingActivities: Math.max(0, assignedChapters.length - completedChaptersCount),
      quizAvg,
      totalQuizzesTaken,
      enrollments,
    }
  },
}

export const enrollmentService = {
  async enroll(payload: Partial<Enrollment> & { organization_id: string; student_id: string }): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ ...payload, enrolled_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    const all = await enrollmentService.getAllStudentEnrollments(studentId)
    const active = all.filter(e => e.status === 'active')
    return active.length > 0 ? [active[0]] : []
  },

  async getAllStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    let localEnrs: Enrollment[] = []
    try {
      const stored = localStorage.getItem(`nanjil_enrollment_${studentId}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        localEnrs = Array.isArray(parsed) ? parsed : [parsed]
      }
    } catch {}

    if (!isUuid(studentId)) {
      return localEnrs
    }

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
        .eq('student_id', studentId)
        .order('enrolled_at', { ascending: false })

      if (error) {
        console.warn('Error fetching enrollments from Supabase:', error)
        return localEnrs
      }

      if (data && data.length > 0) {
        // Hydrate any missing class or subject info from catalog if relation was unlinked
        const hydrated = data.map(enr => {
          if (!enr.class && enr.class_id) {
            const spec = SYLLABUS_SPECS.find(s =>
              enr.class_id === `cat-cls-${s.gradeKey}` ||
              enr.class_id.toLowerCase().includes(s.gradeKey.toLowerCase())
            )
            if (spec) {
              enr.class = {
                id: enr.class_id,
                organization_id: enr.organization_id,
                category_id: `cat-${spec.gradeKey}`,
                name: spec.name,
                code: spec.code,
                status: 'published',
                display_order: 1,
                created_by: 'system',
                created_at: enr.enrolled_at,
                updated_at: enr.enrolled_at,
              }
            }
          }
          return enr
        })

        // Active enrollments always take absolute priority
        const activeList = hydrated.filter(e => e.status === 'active')
        if (activeList.length > 0) {
          return activeList
        }
        return hydrated
      }
      return localEnrs
    } catch {
      return localEnrs
    }
  },

  async getActiveEnrollment(studentId: string): Promise<Enrollment | null> {
    const all = await enrollmentService.getAllStudentEnrollments(studentId)
    const active = all.filter(e => e.status === 'active')
    return active.length > 0 ? active[0] : (all.length > 0 ? all[0] : null)
  },

  async getStudentAssignedGrade(studentId: string, orgId?: string): Promise<{
    gradeKey: AppGradeKey
    className: string
    code?: string
    subjectName?: string
    enrollment: Enrollment | null
  }> {
    if (!studentId) {
      return {
        gradeKey: 'class3',
        className: 'Class 3',
        code: 'CLS-03',
        subjectName: 'Junior AI & Playful Logic',
        enrollment: null,
      }
    }

    // 1. Fetch active enrollment (from DB or local cache)
    let activeEnr = await enrollmentService.getActiveEnrollment(studentId)

    // 2. Fallback to ensureInitialEnrollment if nothing enrolled yet and orgId exists
    if (!activeEnr && orgId) {
      try {
        activeEnr = await enrollmentService.ensureInitialEnrollment(studentId, orgId, 'class3')
      } catch {}
    }

    // 3. Fallback to local active class if still null
    let localCls: any = null
    if (!activeEnr) {
      try {
        const stored = localStorage.getItem(`nanjil_active_class_${studentId}`)
        if (stored) localCls = JSON.parse(stored)
      } catch {}
    }

    const clsObj = activeEnr?.class || localCls
    const gradeKey = parseGradeKeyFromClass(clsObj || activeEnr?.class_id)
    const spec = SYLLABUS_SPECS.find(s => s.gradeKey === gradeKey) || SYLLABUS_SPECS[0]

    return {
      gradeKey,
      className: clsObj?.name || spec.name,
      code: clsObj?.code || spec.code,
      subjectName: activeEnr?.subject?.name || spec.subjectName,
      enrollment: activeEnr,
    }
  },

  async assignStudentClass({
    studentId,
    organizationId,
    classId,
    subjectId,
  }: {
    studentId: string
    organizationId: string
    classId: string
    subjectId?: string
  }): Promise<Enrollment> {
    if (!studentId) throw new Error('Student ID is required')
    if (!organizationId) throw new Error('Organization ID is required')
    if (!classId) throw new Error('Class ID is required')

    // 1. Match class specification (supports UUID, cat-cls-*, gradeKey, name, code)
    const spec = SYLLABUS_SPECS.find(s =>
      s.gradeKey.toLowerCase() === classId.toLowerCase().replace(/^(cat-cls-|cls-)/, '') ||
      s.name.toLowerCase().replace(/[\s-_]/g, '') === classId.toLowerCase().replace(/[\s-_]/g, '') ||
      (s.code && s.code.toLowerCase() === classId.toLowerCase()) ||
      classId.toLowerCase().includes(s.gradeKey.toLowerCase())
    )

    let realClass: any = await classService.resolveClassRecord(classId, organizationId)

    // If still not in database, create the class row in Supabase
    if (!realClass) {
      try {
        let { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('organization_id', organizationId)
          .limit(1)
          .maybeSingle()

        if (!cat) {
          const { data: newCat } = await supabase
            .from('categories')
            .insert({
              organization_id: organizationId,
              name: 'AI Olympiad Curriculum',
              slug: 'ai-curriculum',
              status: 'published',
              display_order: 1
            })
            .select('id')
            .single()
          cat = newCat
        }

        const className = spec?.name || classId
        const classCode = spec?.code || `CL-${Date.now()}`
        const dispOrder = spec ? SYLLABUS_SPECS.indexOf(spec) + 1 : 1

        const { data: createdCls, error: createErr } = await supabase
          .from('classes')
          .insert({
            organization_id: organizationId,
            category_id: cat?.id,
            name: className,
            code: classCode,
            status: 'published',
            display_order: dispOrder
          })
          .select('*, category:categories(*)')
          .single()

        if (!createErr && createdCls) {
          realClass = createdCls
        }
      } catch (err) {
        console.warn('Notice creating database class:', err)
      }
    }

    // Fallback representation if DB creation was restricted
    if (!realClass) {
      realClass = {
        id: isUuid(classId) ? classId : `cat-cls-${spec?.gradeKey || 'class3'}`,
        organization_id: organizationId,
        category_id: `cat-${spec?.gradeKey || 'class3'}`,
        name: spec?.name || classId,
        code: spec?.code || classId,
        status: 'published',
        display_order: spec ? SYLLABUS_SPECS.indexOf(spec) + 1 : 1
      }
    }

    // 2. Resolve Subject for this class
    let realSubject: any = null
    if (subjectId && isUuid(subjectId)) {
      try {
        const { data: directSub } = await supabase
          .from('subjects')
          .select('*')
          .eq('id', subjectId)
          .maybeSingle()
        if (directSub) realSubject = directSub
      } catch {}
    }

    if (!realSubject && isUuid(realClass.id)) {
      try {
        const { data: existingSub } = await supabase
          .from('subjects')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('class_id', realClass.id)
          .maybeSingle()

        if (existingSub) {
          realSubject = existingSub
        } else {
          const subName = spec?.subjectName || `${realClass.name} Curriculum`
          const subCode = spec?.subjectCode || `${realClass.code || 'SUB'}-CURR`
          const { data: newSub } = await supabase
            .from('subjects')
            .insert({
              organization_id: organizationId,
              class_id: realClass.id,
              name: subName,
              code: subCode,
              description: `Curriculum for ${realClass.name}`,
              status: 'published',
              display_order: 1
            })
            .select()
            .single()
          if (newSub) realSubject = newSub
        }
      } catch {}
    }

    if (!realSubject) {
      realSubject = {
        id: isUuid(subjectId) ? subjectId : `cat-sub-${spec?.gradeKey || 'class3'}`,
        organization_id: organizationId,
        class_id: realClass.id,
        name: spec?.subjectName || `${realClass.name} Subject`,
        code: spec?.subjectCode || 'SUB',
        status: 'published',
        display_order: 1
      }
    }

    // 3. Database Enrollment Update:
    // Deactivate ALL previous active classes so there is NO duplicate active class
    let activeEnrollmentRecord: any = null

    if (isUuid(studentId) && isUuid(realClass.id)) {
      try {
        // Step A: Mark all previous active classes as inactive
        await supabase
          .from('enrollments')
          .update({ status: 'inactive' })
          .eq('student_id', studentId)
          .eq('organization_id', organizationId)

        // Step B: Check if an enrollment for this student exists
        const { data: existingEnrs } = await supabase
          .from('enrollments')
          .select('id, class_id')
          .eq('student_id', studentId)
          .eq('organization_id', organizationId)

        const matchingClassEnr = existingEnrs?.find(e => e.class_id === realClass.id)

        if (matchingClassEnr) {
          const { data: updated } = await supabase
            .from('enrollments')
            .update({
              status: 'active',
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              enrolled_at: new Date().toISOString()
            })
            .eq('id', matchingClassEnr.id)
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = updated
        } else if (existingEnrs && existingEnrs.length > 0) {
          // Update the first enrollment to the newly assigned active class
          const { data: updated } = await supabase
            .from('enrollments')
            .update({
              class_id: realClass.id,
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              status: 'active',
              enrolled_at: new Date().toISOString()
            })
            .eq('id', existingEnrs[0].id)
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = updated
        } else {
          // Insert fresh active enrollment
          const { data: inserted } = await supabase
            .from('enrollments')
            .insert({
              student_id: studentId,
              organization_id: organizationId,
              class_id: realClass.id,
              subject_id: isUuid(realSubject?.id) ? realSubject.id : null,
              status: 'active',
              enrolled_at: new Date().toISOString()
            })
            .select('*, class:classes(*, category:categories(*)), subject:subjects(*)')
            .single()
          activeEnrollmentRecord = inserted
        }
      } catch (dbErr) {
        console.warn('Database enrollment update notice:', dbErr)
      }
    }

    // 4. Construct unified active enrollment object
    const finalEnrollment: Enrollment = {
      id: activeEnrollmentRecord?.id || `enr-${Date.now()}`,
      student_id: studentId,
      organization_id: organizationId,
      class_id: realClass.id,
      subject_id: realSubject?.id || null,
      status: 'active',
      class: realClass,
      subject: realSubject,
      enrolled_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }

    // 5. Update local storage caches for instant local synchronization
    try {
      localStorage.setItem(`nanjil_enrollment_${studentId}`, JSON.stringify([finalEnrollment]))
      localStorage.setItem(`nanjil_active_class_${studentId}`, JSON.stringify(realClass))
      localStorage.setItem('nanjil_enrollment_last_changed', `${studentId}:${realClass.id}:${Date.now()}`)
    } catch {}

    // 6. Broadcast event so student screen immediately updates
    window.dispatchEvent(new CustomEvent('student_enrollment_updated', {
      detail: { studentId, enrollment: finalEnrollment, classId: realClass.id, className: realClass.name }
    }))

    return finalEnrollment
  },

  async ensureInitialEnrollment(
    studentId: string,
    organizationId: string,
    defaultGradeKey: string = 'class3'
  ): Promise<Enrollment | null> {
    try {
      const all = await enrollmentService.getAllStudentEnrollments(studentId)
      if (all.length > 0) {
        return all.find(e => e.status === 'active') || all[all.length - 1]
      }

      const spec = SYLLABUS_SPECS.find(s => s.gradeKey === defaultGradeKey) || SYLLABUS_SPECS[0]
      let { data: dbClass } = await supabase
        .from('classes')
        .select('id, name')
        .eq('organization_id', organizationId)
        .ilike('name', `%${spec.name}%`)
        .maybeSingle()

      if (!dbClass) {
        const { data: newCls } = await supabase
          .from('classes')
          .insert({
            organization_id: organizationId,
            name: spec.name,
            code: spec.code,
            status: 'published',
            display_order: 1,
          })
          .select()
          .single()
        dbClass = newCls
      }

      let subId: string | undefined
      if (dbClass) {
        let { data: dbSub } = await supabase
          .from('subjects')
          .select('id')
          .eq('organization_id', organizationId)
          .eq('class_id', dbClass.id)
          .maybeSingle()

        if (!dbSub) {
          const { data: newSub } = await supabase
            .from('subjects')
            .insert({
              organization_id: organizationId,
              class_id: dbClass.id,
              name: spec.subjectName,
              code: spec.subjectCode,
              description: `Curriculum for ${spec.name}`,
              status: 'published',
              display_order: 1,
            })
            .select()
            .single()
          dbSub = newSub
        }
        subId = dbSub?.id
      }

      if (!dbClass || !isUuid(dbClass.id) || !isUuid(studentId)) {
        return null
      }

      const { data: enr, error: enrErr } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          organization_id: isUuid(organizationId) ? organizationId : undefined,
          class_id: dbClass.id,
          subject_id: (subId && isUuid(subId)) ? subId : undefined,
          status: 'active',
          enrolled_at: new Date().toISOString(),
        })
        .select('*, class:classes(*), subject:subjects(*)')
        .single()

      if (!enrErr && enr) return enr
    } catch (err) {
      console.warn('ensureInitialEnrollment notice:', err)
    }
    return null
  },

  async getByClass(classId: string, organizationId?: string): Promise<Enrollment[]> {
    if (!classId) return []
    let resolvedClassId = classId
    if (!isUuid(classId)) {
      const realClass = await classService.resolveClassRecord(classId, organizationId)
      if (realClass && isUuid(realClass.id)) {
        resolvedClassId = realClass.id
      } else {
        return []
      }
    }
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, student:profiles(*)')
      .eq('class_id', resolvedClassId)
      .eq('status', 'active')
    if (error) {
      console.warn('Notice querying enrollments by class:', error)
      return []
    }
    return data || []
  },

  async unenroll(id: string) {
    if (!isUuid(id)) return
    const { error } = await supabase
      .from('enrollments')
      .update({ status: 'inactive' })
      .eq('id', id)
    if (error) throw error
  },

  async isEnrolled(studentId: string, classId?: string, subjectId?: string, organizationId?: string): Promise<boolean> {
    if (!studentId || !isUuid(studentId)) return false
    let resolvedClassId: string | undefined = undefined
    if (classId) {
      if (isUuid(classId)) {
        resolvedClassId = classId
      } else {
        const realClass = await classService.resolveClassRecord(classId, organizationId)
        if (realClass && isUuid(realClass.id)) {
          resolvedClassId = realClass.id
        } else {
          return false
        }
      }
    }

    if (subjectId && !isUuid(subjectId)) {
      return false
    }

    let query = supabase
      .from('enrollments')
      .select('id')
      .eq('status', 'active')
      .eq('student_id', studentId)

    if (resolvedClassId) query = query.eq('class_id', resolvedClassId)
    if (subjectId) query = query.eq('subject_id', subjectId)
    const { data } = await query
    return (data?.length || 0) > 0
  },
}
