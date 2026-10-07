// ─────────────────────────────────────────────────────────────────────────────
// GAME AUDIO SYNTHESIZER (WEB AUDIO API)
// Subtle, pleasant educational audio effects with persistent mute controls
// ─────────────────────────────────────────────────────────────────────────────

class GameAudioSynthesizer {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  constructor() {
    try {
      const stored = localStorage.getItem('nanjil_audio_muted')
      this.muted = stored === 'true'
    } catch {
      this.muted = false
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        if (AudioCtx) {
          this.ctx = new AudioCtx()
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      return this.ctx
    } catch {
      return null
    }
  }

  public isMuted(): boolean {
    return this.muted
  }

  public toggleMute(): boolean {
    this.muted = !this.muted
    try {
      localStorage.setItem('nanjil_audio_muted', String(this.muted))
      window.dispatchEvent(new CustomEvent('game_audio_mute_toggled', { detail: { muted: this.muted } }))
    } catch {}
    return this.muted
  }

  // 1. Subtle Soft Tap / Click
  public playTap() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const now = ctx.currentTime

      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {}
  }

  // 2. Correct Action / Success Chord
  public playSuccess() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5 major chord
      const now = ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const start = now + idx * 0.06
        const dur = 0.22

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.12, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(start)
        osc.stop(start + dur)
      })
    } catch {}
  }

  // 3. Wrong Action (Gentle, encouraging low soft tone)
  public playWrong() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const notes = [329.63, 277.18] // E4 -> C#4 soft descent
      const now = ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const start = now + idx * 0.09
        const dur = 0.2

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.09, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(start)
        osc.stop(start + dur)
      })
    } catch {}
  }

  // 4. Coin / XP Collect Sparkle
  public playCoin() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(987.77, now) // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.07) // E6

      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)
    } catch {}
  }

  // 5. Level Up / Section Complete Fanfare
  public playLevelUp() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      const now = ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const start = now + idx * 0.08
        const dur = 0.35

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.14, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(start)
        osc.stop(start + dur)
      })
    } catch {}
  }

  public playStreakBonus() {
    this.playCoin()
  }

  public playVictory() {
    this.playLevelUp()
  }

  public playBossHit() {
    this.playTap()
  }

  public playHit() {
    this.playTap()
  }

  public speak(text: string) {
    if (this.muted) return
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.0
        utterance.pitch = 1.05
        window.speechSynthesis.speak(utterance)
      }
    } catch {}
  }
}

export const gameAudio = new GameAudioSynthesizer()
export default gameAudio
