// ─────────────────────────────────────────────────────────────────────────────
// AURA SPEECH SERVICE — AUTHORITATIVE BROWSER TTS CONTROLLER
// Solves all Chromium / Web Speech API quirks:
// - Direct synchronous speak() preserving user activation context
// - Retains active utterance reference on window to eliminate V8 GC drop bug
// - Workaround for Chrome 15s pause bug using active watchdog
// - Syncs speech icon strictly with browser's live speech lifecycle (onstart/onend/onerror)
// - Stops speech immediately on screen changes, unmounts, and visibility loss
// ─────────────────────────────────────────────────────────────────────────────

export interface AuraSpeechState {
  isSpeaking: boolean
  currentText: string | null
  currentId: string | null
}

type SpeechSubscriber = (state: AuraSpeechState) => void

class AuraSpeechService {
  private activeUtterance: SpeechSynthesisUtterance | null = null
  private currentText: string | null = null
  private currentId: string | null = null
  private isSpeakingInternal: boolean = false
  private subscribers: Set<SpeechSubscriber> = new Set()
  private watchdogInterval: ReturnType<typeof setInterval> | null = null
  private startTime: number = 0

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Trigger browser voice caching early
      try {
        window.speechSynthesis.getVoices()
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            try {
              window.speechSynthesis.getVoices()
            } catch {}
          }
        }
      } catch {}

      // Stop speech if tab is hidden or page is unloaded
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop()
        }
      })
      window.addEventListener('pagehide', () => this.stop())
      window.addEventListener('beforeunload', () => this.stop())
    }
  }

  private pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null

    // Target friendly natural English voices suitable for AI mascot Aura
    const preferredKeywords = [
      'natural',
      'zira',
      'samantha',
      'google us english',
      'jenny',
      'aria',
      'karen',
      'victoria',
      'female'
    ]

    for (const kw of preferredKeywords) {
      const match = voices.find(
        (v) => v.lang.toLowerCase().startsWith('en') && v.name.toLowerCase().includes(kw)
      )
      if (match) return match
    }

    // Secondary fallback: any English voice
    const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith('en'))
    if (anyEnglish) return anyEnglish

    // Last resort default voice
    return voices.find((v) => v.default) || voices[0] || null
  }

  /**
   * Cleans text to be read aloud: strips HTML, markdown, and excessive spacing.
   */
  public cleanText(raw: string): string {
    return raw
      .replace(/<[^>]*>/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  public subscribe(callback: SpeechSubscriber): () => void {
    this.subscribers.add(callback)
    // Send immediate initial state
    callback(this.getState())
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notify() {
    const state = this.getState()
    this.subscribers.forEach((fn) => {
      try {
        fn(state)
      } catch (e) {
        console.error('Error in Aura speech subscriber:', e)
      }
    })
  }

  public getState(): AuraSpeechState {
    const active = this.isSpeakingInternal
    return {
      isSpeaking: active,
      currentText: active ? this.currentText : null,
      currentId: active ? this.currentId : null
    }
  }

  public isSpeaking(id?: string): boolean {
    if (!this.isSpeakingInternal) return false
    if (id) return this.currentId === id
    return true
  }

  /**
   * Internal cleanup when speech finishes, errors, or is manually cancelled.
   */
  private handleComplete() {
    this.stopWatchdog()
    this.isSpeakingInternal = false
    this.activeUtterance = null
    this.currentText = null
    this.currentId = null

    if (typeof window !== 'undefined') {
      try {
        delete (window as any).__auraActiveUtterance
      } catch {}
    }

    this.notify()
  }

  /**
   * Stops all active speech immediately and resets UI state to muted.
   */
  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    this.stopWatchdog()
    this.isSpeakingInternal = false
    this.activeUtterance = null
    this.currentText = null
    this.currentId = null

    try {
      window.speechSynthesis.cancel()
    } catch {}

    if (typeof window !== 'undefined') {
      try {
        delete (window as any).__auraActiveUtterance
      } catch {}
    }

    this.notify()
  }

  /**
   * Speaks the provided text using the browser's native Web Speech API.
   * If already speaking this identical item, it toggles it off.
   */
  public speak(rawText: string, id: string = 'aura-default') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    // If currently speaking this exact item, toggle off immediately
    if (this.isSpeaking(id)) {
      this.stop()
      return
    }

    // Stop any existing speech first
    this.stop()

    const textToRead = this.cleanText(rawText)
    if (!textToRead) return

    try {
      // 1. Clear any stuck queue in browser
      window.speechSynthesis.cancel()

      // 2. Resume if browser TTS is in paused state
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      // 3. Create utterance synchronously inside user click turn
      const utterance = new SpeechSynthesisUtterance(textToRead)
      utterance.lang = 'en-US'
      utterance.rate = 1.0
      utterance.pitch = 1.05
      utterance.volume = 1.0

      // 4. Select best available voice dynamically
      try {
        const voices = window.speechSynthesis.getVoices()
        if (voices && voices.length > 0) {
          const voice = this.pickBestVoice(voices)
          if (voice) {
            utterance.voice = voice
          }
        }
      } catch {}

      // 5. Retain active utterance globally to eliminate Chromium GC collection bug
      this.activeUtterance = utterance
      this.currentText = textToRead
      this.currentId = id
      this.startTime = Date.now()
      ;(window as any).__auraActiveUtterance = utterance

      // 6. Hook up lifecycle listeners
      utterance.onstart = () => {
        this.isSpeakingInternal = true
        this.notify()
        this.startWatchdog()
      }

      utterance.onend = () => {
        this.handleComplete()
      }

      utterance.onerror = (event) => {
        // e.error === 'canceled' or 'interrupted' is normal when stopped by user
        if (this.activeUtterance === utterance) {
          this.handleComplete()
        }
      }

      // 7. Dispatch speak synchronously
      window.speechSynthesis.speak(utterance)

      // 8. Workaround for Chromium pause bug: force resume if paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      // 9. Immediate fallback: if browser engine started audio but delayed onstart event
      setTimeout(() => {
        if (this.activeUtterance === utterance && !this.isSpeakingInternal) {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
            this.isSpeakingInternal = true
            this.notify()
            this.startWatchdog()
          }
        }
      }, 300)
    } catch (err) {
      console.error('Failed to initiate Aura speech synthesis:', err)
      this.handleComplete()
    }
  }

  /**
   * Watchdog timer to prevent speech stalls and keep Chrome audio engine active.
   */
  private startWatchdog() {
    this.stopWatchdog()
    this.watchdogInterval = setInterval(() => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        this.handleComplete()
        return
      }

      // Workaround for Chrome 15s freeze bug: poke resume while speaking
      if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      // Safe check: if speech has been playing for at least 800ms and browser is now completely idle
      const elapsed = Date.now() - this.startTime
      if (elapsed > 800) {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          this.handleComplete()
        }
      }
    }, 400)
  }

  private stopWatchdog() {
    if (this.watchdogInterval) {
      clearInterval(this.watchdogInterval)
      this.watchdogInterval = null
    }
  }
}

export const auraSpeechService = new AuraSpeechService()
export default auraSpeechService
