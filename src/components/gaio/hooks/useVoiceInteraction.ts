// ─────────────────────────────────────────────────────────────────────────────
// USE VOICE INTERACTION HOOK
// Speech Recognition for Voice Commands ("next page", "read this", "draw mode")
// "Say The Word" Pronunciation Challenge & MediaRecorder Voice Recording
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export interface VoiceCommandHandlers {
  onNextPage?: () => void
  onPrevPage?: () => void
  onReadAloud?: () => void
  onSwitchMode?: (mode: 'read' | 'draw' | 'play' | 'voice') => void
  onClearDrawing?: () => void
}

export function useVoiceInteraction(handlers: VoiceCommandHandlers = {}) {
  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('')
  const [lastVoiceCommand, setLastVoiceCommand] = useState<string | null>(null)

  // "Say the Word" Pronunciation game state
  const [targetWord, setTargetWord] = useState<string | null>(null)
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null) // 1, 2, 3 stars
  const [isPronunciationTesting, setIsPronunciationTesting] = useState<boolean>(false)

  // MediaRecorder Voice Recording state
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const recognitionRef = useRef<any>(null)

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = false
      rec.lang = 'en-US'

      rec.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1]
        if (lastResult && lastResult[0]) {
          const phrase = lastResult[0].transcript.trim().toLowerCase()
          setRecognizedTranscript(phrase)

          // 1. Process voice commands
          handleVoiceCommand(phrase)

          // 2. Process pronunciation test if active
          if (targetWord) {
            evaluatePronunciation(phrase, targetWord)
          }
        }
      }

      rec.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error)
        if (e.error === 'not-allowed') {
          toast.error('Microphone permission required for voice features.')
        }
        setIsListening(false)
      }

      rec.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = rec
    } else {
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort() } catch {}
      }
    }
  }, [targetWord])

  // Handle voice commands
  const handleVoiceCommand = useCallback(
    (phrase: string) => {
      if (phrase.includes('next page') || phrase === 'next' || phrase === 'forward') {
        handlers.onNextPage?.()
        setLastVoiceCommand('Next Page')
        gameAudio.playSuccess()
      } else if (phrase.includes('previous page') || phrase.includes('go back') || phrase === 'back') {
        handlers.onPrevPage?.()
        setLastVoiceCommand('Go Back')
        gameAudio.playSuccess()
      } else if (phrase.includes('read this') || phrase.includes('read aloud') || phrase === 'read') {
        handlers.onReadAloud?.()
        setLastVoiceCommand('Read Aloud')
        gameAudio.playSuccess()
      } else if (phrase.includes('draw mode') || phrase.includes('sketch') || phrase === 'draw') {
        handlers.onSwitchMode?.('draw')
        setLastVoiceCommand('Draw Mode')
        gameAudio.playSuccess()
      } else if (phrase.includes('read mode') || phrase === 'reading') {
        handlers.onSwitchMode?.('read')
        setLastVoiceCommand('Read Mode')
        gameAudio.playSuccess()
      } else if (phrase.includes('play mode') || phrase.includes('game')) {
        handlers.onSwitchMode?.('play')
        setLastVoiceCommand('Play Mode')
        gameAudio.playSuccess()
      } else if (phrase.includes('clear')) {
        handlers.onClearDrawing?.()
        setLastVoiceCommand('Clear')
        gameAudio.playTap()
      }
    },
    [handlers]
  )

  // Start continuous listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error('Voice recognition is not supported in this browser.')
      return
    }
    try {
      recognitionRef.current.start()
      setIsListening(true)
      gameAudio.playTap()
      toast.success('Listening for voice commands: "next", "read", "draw"...')
    } catch (e) {
      console.warn('Could not start recognition', e)
    }
  }, [])

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.stop()
      setIsListening(false)
      gameAudio.playTap()
    } catch {}
  }, [])

  // ── "Say The Word" Pronunciation Game ──
  const startSayTheWord = useCallback((word: string) => {
    setTargetWord(word)
    setPronunciationScore(null)
    setIsPronunciationTesting(true)
    startListening()
  }, [startListening])

  const evaluatePronunciation = (spoken: string, target: string) => {
    const cleanSpoken = spoken.replace(/[^\w]/g, '').toLowerCase()
    const cleanTarget = target.replace(/[^\w]/g, '').toLowerCase()

    let score = 0
    if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget)) {
      score = 3
    } else if (cleanSpoken.slice(0, 3) === cleanTarget.slice(0, 3)) {
      score = 2
    } else {
      score = 1
    }

    setPronunciationScore(score)
    setIsPronunciationTesting(false)
    setTargetWord(null)

    if (score >= 2) {
      gameAudio.playLevelUp()
      confetti({ particleCount: 40, spread: 70 })
      toast.success(`Superstar pronunciation! ${'⭐'.repeat(score)}`)
    } else {
      gameAudio.playWrong()
      toast('Good try! Try speaking clearly into the microphone.')
    }
  }

  // ── "Record Your Own Voice" (MediaRecorder) ──
  const startVoiceRecording = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      toast.error('Microphone not supported.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      const mr = new MediaRecorder(stream)

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mr.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setRecordedAudioUrl(url)
        gameAudio.playSuccess()
        toast.success('Your voice was recorded! Tap play to listen.')
      }

      mr.start()
      mediaRecorderRef.current = mr
      setIsRecordingVoice(true)
      gameAudio.playTap()
    } catch (err) {
      console.error('Failed to access microphone', err)
      toast.error('Microphone permission denied.')
    }
  }

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingVoice) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecordingVoice(false)
    }
  }

  return {
    isSupported,
    isListening,
    recognizedTranscript,
    lastVoiceCommand,
    targetWord,
    pronunciationScore,
    isPronunciationTesting,
    isRecordingVoice,
    recordedAudioUrl,
    startListening,
    stopListening,
    startSayTheWord,
    startVoiceRecording,
    stopVoiceRecording,
  }
}
