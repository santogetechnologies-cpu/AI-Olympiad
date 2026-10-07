import { gamification } from '../utils/gamification'
import { progressService } from './progressService'

export type LearningEventType =
  | 'activity_started'
  | 'activity_completed'
  | 'section_completed'
  | 'lesson_completed'
  | 'chapter_completed'

export interface LearningProgressRecord {
  studentId: string
  classId: string
  chapterId: string
  lessonId?: string
  sectionId: string
  activityId?: string
  status: 'started' | 'in_progress' | 'completed'
  score?: number
  xpAwarded?: number
  completedAt?: string
}

class LearningProgressTracker {
  private getStorageKey(studentId: string, eventId: string): string {
    return `progress_evt_${studentId}_${eventId}`
  }

  // Check if an activity or section XP was already claimed
  public hasCompleted(studentId: string, eventKey: string): boolean {
    try {
      return localStorage.getItem(this.getStorageKey(studentId, eventKey)) === 'completed'
    } catch {
      return false
    }
  }

  // Track start of an interactive activity
  public trackActivityStarted(params: {
    studentId: string
    classId: string
    chapterId: string
    sectionId: string
    activityId: string
  }): void {
    const key = `act_start_${params.sectionId}_${params.activityId}`
    try {
      localStorage.setItem(this.getStorageKey(params.studentId, key), new Date().toISOString())
      window.dispatchEvent(
        new CustomEvent('learning_event', {
          detail: { type: 'activity_started', ...params },
        })
      )
    } catch {}
  }

  // Track completion of an interactive activity (with idempotent XP)
  public trackActivityCompleted(params: {
    studentId: string
    classId: string
    chapterId: string
    sectionId: string
    activityId: string
    score?: number
    xpReward?: number
  }): { awardedXP: number; isFirstCompletion: boolean } {
    const key = `act_done_${params.sectionId}_${params.activityId}`
    const alreadyDone = this.hasCompleted(params.studentId, key)

    let awardedXP = 0
    if (!alreadyDone && (params.xpReward || 0) > 0) {
      const res = gamification.addXP(params.xpReward || 15, params.studentId, `${params.sectionId}-${params.activityId}`)
      if (res.awarded) {
        awardedXP = params.xpReward || 15
      }
    }

    try {
      localStorage.setItem(this.getStorageKey(params.studentId, key), 'completed')
      window.dispatchEvent(
        new CustomEvent('learning_event', {
          detail: {
            type: 'activity_completed',
            ...params,
            awardedXP,
            completedAt: new Date().toISOString(),
          },
        })
      )
    } catch {}

    return { awardedXP, isFirstCompletion: !alreadyDone }
  }

  // Track section completion (idempotent, triggers database sync)
  public async trackSectionCompleted(params: {
    studentId: string
    orgId?: string
    classId: string
    chapterId: string
    lessonId?: string
    sectionId: string
    xpReward?: number
  }): Promise<{ isFirstCompletion: boolean; xpAwarded: number }> {
    const key = `sec_done_${params.sectionId}`
    const alreadyDone = this.hasCompleted(params.studentId, key)

    let xpAwarded = 0
    if (!alreadyDone && (params.xpReward || 0) > 0) {
      const res = gamification.addXP(params.xpReward || 20, params.studentId, params.sectionId)
      if (res.awarded) {
        xpAwarded = params.xpReward || 20
      }
    }

    try {
      localStorage.setItem(this.getStorageKey(params.studentId, key), 'completed')

      // Sync with existing progress service for database persistence
      if (params.orgId && !params.sectionId.startsWith('cat-')) {
        progressService.markCompleted(params.studentId, params.sectionId, params.orgId).catch(() => {})
      }

      window.dispatchEvent(
        new CustomEvent('learning_event', {
          detail: {
            type: 'section_completed',
            ...params,
            xpAwarded,
            completedAt: new Date().toISOString(),
          },
        })
      )
    } catch {}

    return { isFirstCompletion: !alreadyDone, xpAwarded }
  }
}

export const learningProgressTracker = new LearningProgressTracker()
