// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PLACEMENT MANAGEMENT SERVICE
// Strict Mapping: Class → Chapter → Lesson/Section → Image Position
// Supports Upload, Replace, Remove, Preview & Student View (No Auto-generation)
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '../lib/supabase'
import { storageService } from './storageService'

export type ImagePosition = 'header' | 'after_hook' | 'mid_lesson' | 'activity' | 'bottom_summary'

export interface ImagePlacement {
  id: string
  classKey: string        // e.g., 'class3', 'class4', ..., 'pg2'
  className: string       // e.g., 'CLASS 3', 'CLASS 4'
  chapterNum: string | number // '1' - '6'
  chapterTitle: string    // e.g., 'AI DISCOVER'
  sectionKey: string      // e.g., 'lesson1', 'lesson2', 'worksheet', etc.
  sectionTitle: string    // e.g., 'Lesson 1: Meet My AI Friend'
  position: ImagePosition // 'header' | 'after_hook' | 'mid_lesson' | 'activity' | 'bottom_summary'
  imageUrl: string
  caption?: string
  altText?: string
  uploadedAt: string
  uploadedBy?: string
}

const STORAGE_KEY = 'nanjil_curriculum_image_placements_v2'

export function normalizeClassKey(key: string): string {
  if (!key) return 'class3'
  const k = key.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (k.startsWith('class') || k.startsWith('ug') || k.startsWith('pg')) return k
  const match = k.match(/(\d+)/)
  if (match) {
    const num = parseInt(match[1], 10)
    if (num >= 3 && num <= 12) return `class${num}`
  }
  return k
}

export function normalizeChapterNum(num: string | number): string {
  if (!num) return '1'
  const match = String(num).match(/(\d+)/)
  return match ? match[1] : String(num)
}

export function normalizeSectionKey(key: string, sectionNumber?: number, contentType?: string): string {
  if (sectionNumber) {
    if (sectionNumber === 1) return 'video'
    if (sectionNumber === 2) return 'lesson1'
    if (sectionNumber === 3) return 'lesson2'
    if (sectionNumber === 4) return 'worksheet'
    if (sectionNumber === 5) return 'activity'
    if (sectionNumber === 6) return 'resource'
    if (sectionNumber === 7) return 'assignment'
    if (sectionNumber === 8) return 'quiz'
  }
  if (contentType) {
    const c = contentType.toLowerCase()
    if (c === 'video') return 'video'
    if (c === 'worksheet') return 'worksheet'
    if (c === 'activity') return 'activity'
    if (c === 'assignment') return 'assignment'
    if (c === 'quiz') return 'quiz'
    if (c === 'resource' || c === 'flashcards' || c === 'lab') return 'resource'
  }
  if (!key) return 'lesson1'
  const k = key.toLowerCase().trim()
  if (k === 'video' || k.includes('sec-1') || k === '1' || k === 'briefing') return 'video'
  if (k === 'lesson1' || k.includes('sec-2') || k === '2' || k.includes('topic1')) return 'lesson1'
  if (k === 'lesson2' || k.includes('sec-3') || k === '3' || k.includes('topic2')) return 'lesson2'
  if (k === 'worksheet' || k === 'workbook' || k.includes('sec-4') || k === '4') return 'worksheet'
  if (k === 'activity' || k.includes('sec-5') || k === '5' || k === 'game') return 'activity'
  if (k === 'resource' || k === 'flashcards' || k === 'lab' || k === 'lesson3' || k.includes('sec-6') || k === '6') return 'resource'
  if (k === 'assignment' || k === 'capstone' || k.includes('sec-7') || k === '7') return 'assignment'
  if (k === 'quiz' || k === 'assessment' || k.includes('sec-8') || k === '8') return 'quiz'
  return k
}

class ImagePlacementService {
  private cache: ImagePlacement[] = []
  private initialized = false

  constructor() {
    this.loadFromStorage()
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY || e.key === 'nanjil_curriculum_images_timestamp') {
          this.loadFromStorage()
          window.dispatchEvent(new CustomEvent('image_placements_updated', { detail: { placements: this.cache } }))
        }
      })
    }
  }

  private loadFromStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          this.cache = JSON.parse(stored)
        } else {
          this.cache = []
        }
      } else {
        this.cache = []
      }
      this.initialized = true
    } catch (e) {
      console.error('Failed to load image placements from localStorage', e)
      this.cache = []
    }
  }

  private saveToStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache))
        localStorage.setItem('nanjil_curriculum_images_timestamp', String(Date.now()))
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('image_placements_updated', { detail: { placements: this.cache } }))
      }
    } catch (e) {
      console.error('Failed to save image placements to localStorage', e)
    }
  }

  /**
   * Get all placed images
   */
  async getAllPlacements(): Promise<ImagePlacement[]> {
    if (!this.initialized) this.loadFromStorage()
    
    // Attempt to sync from Supabase if online
    try {
      const { data, error } = await supabase
        .from('curriculum_image_placements')
        .select('*')
      if (!error && data && data.length > 0) {
        this.cache = data.map((d: any) => ({
          id: d.id,
          classKey: normalizeClassKey(d.class_key),
          className: d.class_name,
          chapterNum: normalizeChapterNum(d.chapter_num),
          chapterTitle: d.chapter_title,
          sectionKey: normalizeSectionKey(d.section_key),
          sectionTitle: d.section_title,
          position: d.position as ImagePosition,
          imageUrl: d.image_url,
          caption: d.caption,
          altText: d.alt_text,
          uploadedAt: d.uploaded_at || new Date().toISOString(),
          uploadedBy: d.uploaded_by,
        }))
        this.saveToStorage()
      }
    } catch {
      // Supabase table may not exist yet; gracefully fallback to local cache
    }

    return [...this.cache]
  }

  /**
   * Get specific image placement for a lesson/section and position
   */
  getPlacement(
    classKey: string,
    chapterNum: string | number,
    sectionKey: string,
    position?: ImagePosition,
    sectionNumber?: number,
    contentType?: string
  ): ImagePlacement | null {
    if (!this.initialized) this.loadFromStorage()

    const cleanClass = normalizeClassKey(classKey)
    const cNum = normalizeChapterNum(chapterNum)
    const cleanSection = normalizeSectionKey(sectionKey, sectionNumber, contentType)

    return this.cache.find(p => {
      const matchClass = normalizeClassKey(p.classKey) === cleanClass
      const matchChap = normalizeChapterNum(p.chapterNum) === cNum
      const pSec = normalizeSectionKey(p.sectionKey)
      const matchSec = pSec === cleanSection ||
        (cleanSection === 'resource' && (pSec === 'flashcards' || pSec === 'lab' || pSec === 'lesson3')) ||
        (cleanSection === 'lesson2' && (pSec === '3' || pSec === 'sec-3')) ||
        (cleanSection === 'lesson1' && (pSec === '2' || pSec === 'sec-2')) ||
        (cleanSection === 'worksheet' && (pSec === '4' || pSec === 'sec-4' || pSec === 'workbook')) ||
        (cleanSection === 'activity' && (pSec === '5' || pSec === 'sec-5' || pSec === 'game'))
      const matchPos = position ? p.position === position : true
      return matchClass && matchChap && matchSec && matchPos
    }) || null
  }

  /**
   * Get all placements for a chapter/section
   */
  getPlacementsForSection(
    classKey: string,
    chapterNum: string | number,
    sectionKey: string,
    sectionNumber?: number,
    contentType?: string
  ): Record<ImagePosition, ImagePlacement | undefined> {
    if (!this.initialized) this.loadFromStorage()

    const cleanClass = normalizeClassKey(classKey)
    const cNum = normalizeChapterNum(chapterNum)
    const cleanSection = normalizeSectionKey(sectionKey, sectionNumber, contentType)

    const results: Record<string, ImagePlacement> = {}
    this.cache.forEach(p => {
      const matchClass = normalizeClassKey(p.classKey) === cleanClass
      const matchChap = normalizeChapterNum(p.chapterNum) === cNum
      const pSec = normalizeSectionKey(p.sectionKey)
      const matchSec = pSec === cleanSection ||
        (cleanSection === 'resource' && (pSec === 'flashcards' || pSec === 'lab' || pSec === 'lesson3')) ||
        (cleanSection === 'lesson2' && (pSec === '3' || pSec === 'sec-3')) ||
        (cleanSection === 'lesson1' && (pSec === '2' || pSec === 'sec-2'))
      if (matchClass && matchChap && matchSec) {
        results[p.position] = p
      }
    })

    return results as Record<ImagePosition, ImagePlacement | undefined>
  }

  /**
   * Assign or replace an image placement
   */
  async assignPlacement(params: {
    classKey: string
    className: string
    chapterNum: string | number
    chapterTitle: string
    sectionKey: string
    sectionTitle: string
    position: ImagePosition
    imageUrl: string
    caption?: string
    altText?: string
    uploadedBy?: string
  }): Promise<ImagePlacement> {
    if (!this.initialized) this.loadFromStorage()

    const cleanClass = normalizeClassKey(params.classKey)
    const cleanChap = normalizeChapterNum(params.chapterNum)
    const cleanSec = normalizeSectionKey(params.sectionKey)

    const id = `img-${cleanClass}-ch${cleanChap}-${cleanSec}-${params.position}`
    const placement: ImagePlacement = {
      id,
      classKey: cleanClass,
      className: params.className,
      chapterNum: cleanChap,
      chapterTitle: params.chapterTitle,
      sectionKey: cleanSec,
      sectionTitle: params.sectionTitle,
      position: params.position,
      imageUrl: params.imageUrl,
      caption: params.caption || '',
      altText: params.altText || `${params.sectionTitle} - ${params.position}`,
      uploadedAt: new Date().toISOString(),
      uploadedBy: params.uploadedBy,
    }

    // Remove any existing entry for this exact slot
    this.cache = this.cache.filter(p => p.id !== id)
    this.cache.push(placement)
    this.saveToStorage()

    // Try syncing to Supabase
    try {
      await supabase.from('curriculum_image_placements').upsert({
        id: placement.id,
        class_key: placement.classKey,
        class_name: placement.className,
        chapter_num: placement.chapterNum,
        chapter_title: placement.chapterTitle,
        section_key: placement.sectionKey,
        section_title: placement.sectionTitle,
        position: placement.position,
        image_url: placement.imageUrl,
        caption: placement.caption,
        alt_text: placement.altText,
        uploaded_at: placement.uploadedAt,
        uploaded_by: placement.uploadedBy,
      })
    } catch {
      // Ignored if table is not migrated yet
    }

    return placement
  }

  /**
   * Remove an assigned image placement
   */
  async removePlacement(placementId: string): Promise<boolean> {
    if (!this.initialized) this.loadFromStorage()

    this.cache = this.cache.filter(p => p.id !== placementId)
    this.saveToStorage()

    try {
      await supabase.from('curriculum_image_placements').delete().eq('id', placementId)
    } catch {
      // Ignored
    }

    return true
  }

  /**
   * Upload file and return URL
   */
  async uploadImageFile(file: File, folder = 'curriculum-images'): Promise<string> {
    try {
      const url = await storageService.uploadImage(file, folder)
      return url
    } catch {
      // Create object URL or base64 fallback for immediate browser preview
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    }
  }
}

export const imagePlacementService = new ImagePlacementService()
