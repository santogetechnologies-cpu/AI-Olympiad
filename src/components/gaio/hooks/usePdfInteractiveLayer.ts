// ─────────────────────────────────────────────────────────────────────────────
// USE PDF INTERACTIVE LAYER HOOK
// Extracts words & bounding boxes from PDF.js, handles tap-to-speak,
// karaoke-style read-aloud with real-time word highlighting, and spelling mode
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'

export interface PageWordItem {
  id: string
  word: string
  cleanWord: string
  x: number
  y: number
  w: number
  h: number
  charStart: number
  charEnd: number
}

export interface UsePdfInteractiveLayerOptions {
  pdfDoc: pdfjsLib.PDFDocumentProxy | null
  currentPage: number
  viewportScale: number
  onWordSpoken?: (word: string) => void
  onAddStar?: (count?: number) => void
}

export function usePdfInteractiveLayer({
  pdfDoc,
  currentPage,
  viewportScale,
  onWordSpoken,
  onAddStar
}: UsePdfInteractiveLayerOptions) {
  const [words, setWords] = useState<PageWordItem[]>([])
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null)
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [readingSpeed, setReadingSpeed] = useState<number>(0.85) // Kid-friendly tempo
  const [readingPitch, setReadingPitch] = useState<number>(1.1)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const fullTextRef = useRef<string>('')
  const pressTimerRef = useRef<any>(null)
  const lastTapRef = useRef<{ id: string; time: number }>({ id: '', time: 0 })

  // Load available voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length > 0) {
        setAvailableVoices(v)
        // Prefer natural English voices
        const preferred = v.find(
          (voice) =>
            voice.lang.startsWith('en') &&
            (voice.name.includes('Natural') || voice.name.includes('Google') || voice.name.includes('Samantha') || voice.name.includes('Daniel'))
        )
        if (preferred && !selectedVoiceURI) {
          setSelectedVoiceURI(preferred.voiceURI)
        }
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [selectedVoiceURI])

  // Extract words and exact pixel bounding boxes when page or scale changes
  useEffect(() => {
    if (!pdfDoc || currentPage < 1) {
      setWords([])
      return
    }

    let isCancelled = false

    const extract = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage)
        const vp = page.getViewport({ scale: viewportScale })
        const tc = await page.getTextContent()

        if (isCancelled) return

        const extractedWords: PageWordItem[] = []
        let runningCharIndex = 0
        let fullAccumulated = ''

        for (let itemIdx = 0; itemIdx < tc.items.length; itemIdx++) {
          const it = tc.items[itemIdx] as any
          if (!it.str || !it.str.trim()) continue

          const m = pdfjsLib.Util.transform(vp.transform, it.transform)
          const x = m[4]
          const h = Math.max(12, Math.hypot(m[2], m[3]))
          const y = m[5] - h
          const w = it.width * vp.scale

          const parts = it.str.split(/(\s+)/)
          let offset = 0

          for (const part of parts) {
            if (part.trim()) {
              const partW = Math.max(16, (w * part.length) / Math.max(1, it.str.length))
              const partX = x + (w * offset) / Math.max(1, it.str.length)
              const clean = part.replace(/[^\w\s-]/g, '').trim()

              extractedWords.push({
                id: `w_${currentPage}_${itemIdx}_${offset}`,
                word: part,
                cleanWord: clean || part,
                x: Math.round(partX),
                y: Math.round(y),
                w: Math.round(partW),
                h: Math.round(h),
                charStart: runningCharIndex,
                charEnd: runningCharIndex + part.length,
              })

              fullAccumulated += part + ' '
              runningCharIndex += part.length + 1
            }
            offset += part.length
          }
        }

        fullTextRef.current = fullAccumulated.trim()
        setWords(extractedWords)
      } catch (err) {
        console.warn('Word extraction failed for page', currentPage, err)
        setWords([])
      }
    }

    extract()

    return () => {
      isCancelled = true
      // Stop speech when page changes
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setIsReadingAloud(false)
      setIsPaused(false)
      setActiveWordId(null)
      setActiveWordIndex(null)
    }
  }, [pdfDoc, currentPage, viewportScale])

  // 1. Speak single word
  const speakWord = useCallback(
    (item: PageWordItem) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

      window.speechSynthesis.cancel()
      setIsReadingAloud(false)
      setActiveWordId(item.id)

      // Play soft tap sound & optional vibration
      gameAudio.playTap()
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(25) } catch {}
      }

      const u = new SpeechSynthesisUtterance(item.cleanWord || item.word)
      u.rate = readingSpeed
      u.pitch = readingPitch

      if (selectedVoiceURI) {
        const v = availableVoices.find((voice) => voice.voiceURI === selectedVoiceURI)
        if (v) u.voice = v
      }

      u.onend = () => {
        setTimeout(() => setActiveWordId(null), 400)
      }

      u.onerror = () => setActiveWordId(null)

      window.speechSynthesis.speak(u)
      onWordSpoken?.(item.cleanWord)
    },
    [readingSpeed, readingPitch, selectedVoiceURI, availableVoices, onWordSpoken]
  )

  // 2. Spell Word Mode (Letter by letter: "C... A... T... Cat!")
  const spellWord = useCallback(
    (item: PageWordItem) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

      window.speechSynthesis.cancel()
      setIsReadingAloud(false)
      setActiveWordId(item.id)
      gameAudio.playCoin()

      const letters = item.cleanWord.toUpperCase().split('')
      const spellPhrase = `${letters.join('. ')}! ... ${item.cleanWord}!`

      const u = new SpeechSynthesisUtterance(spellPhrase)
      u.rate = 0.75
      u.pitch = 1.2

      if (selectedVoiceURI) {
        const v = availableVoices.find((voice) => voice.voiceURI === selectedVoiceURI)
        if (v) u.voice = v
      }

      u.onend = () => {
        setTimeout(() => setActiveWordId(null), 500)
        confetti({ particleCount: 15, spread: 45, origin: { x: item.x / window.innerWidth, y: item.y / window.innerHeight } })
      }

      window.speechSynthesis.speak(u)
    },
    [selectedVoiceURI, availableVoices]
  )

  // 3. Full Page Karaoke Read-Aloud with boundary sync
  const startReadAloud = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (words.length === 0) return

    window.speechSynthesis.cancel()
    setIsReadingAloud(true)
    setIsPaused(false)
    gameAudio.playSuccess()

    const fullText = words.map((w) => w.word).join(' ')
    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = readingSpeed
    utterance.pitch = readingPitch

    if (selectedVoiceURI) {
      const v = availableVoices.find((voice) => voice.voiceURI === selectedVoiceURI)
      if (v) utterance.voice = v
    }

    // Synchronize Karaoke word highlighting in real time!
    utterance.onboundary = (e: SpeechSynthesisEvent) => {
      if (e.name === 'word') {
        const charIdx = e.charIndex
        // Find matching word by char range
        const foundIdx = words.findIndex((w) => charIdx >= w.charStart && charIdx <= w.charEnd + 2)
        if (foundIdx !== -1) {
          setActiveWordIndex(foundIdx)
          setActiveWordId(words[foundIdx].id)
        }
      }
    }

    utterance.onend = () => {
      setIsReadingAloud(false)
      setIsPaused(false)
      setActiveWordId(null)
      setActiveWordIndex(null)
      gameAudio.playLevelUp()
      onAddStar?.(1)
      confetti({ particleCount: 30, spread: 60, origin: { x: 0.5, y: 0.5 } })
    }

    utterance.onerror = () => {
      setIsReadingAloud(false)
      setIsPaused(false)
      setActiveWordId(null)
      setActiveWordIndex(null)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [words, readingSpeed, readingPitch, selectedVoiceURI, availableVoices, onAddStar])

  const pauseReadAloud = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (isReadingAloud) {
      window.speechSynthesis.pause()
      setIsPaused(true)
      gameAudio.playTap()
    }
  }, [isReadingAloud])

  const resumeReadAloud = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      gameAudio.playTap()
    }
  }, [isPaused])

  const stopReadAloud = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setIsReadingAloud(false)
    setIsPaused(false)
    setActiveWordId(null)
    setActiveWordIndex(null)
    gameAudio.playTap()
  }, [])

  // 4. Touch & Pointer Handlers (Double tap, Long press, Single tap)
  const handleWordPointerDown = (item: PageWordItem) => {
    // Start 600ms long press timer for spelling or definition hint
    pressTimerRef.current = setTimeout(() => {
      spellWord(item)
    }, 600)
  }

  const handleWordPointerUp = (item: PageWordItem) => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }

    const now = Date.now()
    if (lastTapRef.current.id === item.id && now - lastTapRef.current.time < 320) {
      // Double tap detected -> spell mode!
      spellWord(item)
      lastTapRef.current = { id: '', time: 0 }
    } else {
      // Single tap -> speak word
      speakWord(item)
      lastTapRef.current = { id: item.id, time: now }
    }
  }

  const handleWordPointerCancel = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }

  return {
    words,
    activeWordId,
    activeWordIndex,
    isReadingAloud,
    isPaused,
    readingSpeed,
    setReadingSpeed,
    readingPitch,
    setReadingPitch,
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    speakWord,
    spellWord,
    startReadAloud,
    pauseReadAloud,
    resumeReadAloud,
    stopReadAloud,
    handleWordPointerDown,
    handleWordPointerUp,
    handleWordPointerCancel
  }
}
