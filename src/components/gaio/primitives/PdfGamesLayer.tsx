// ─────────────────────────────────────────────────────────────────────────────
// PDF GAMES LAYER
// Interactive mini-games on page: Listen & Tap, Say The Word, Missing Letter, Balloon Pop
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react'
import type { PageWordItem } from '../hooks/usePdfInteractiveLayer'
import {
  Volume2,
  Mic,
  Star,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export type GameType = 'listen_tap' | 'say_word' | 'missing_letter' | 'balloon_pop'

export interface PdfGamesLayerProps {
  words: PageWordItem[]
  pageWidth: number
  pageHeight: number
  onAddStar?: (count?: number) => void
  onStartVoiceTest?: (word: string) => void
  voiceScore?: number | null
}

export const PdfGamesLayer: React.FC<PdfGamesLayerProps> = ({
  words,
  pageWidth,
  pageHeight,
  onAddStar,
  onStartVoiceTest,
  voiceScore
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('listen_tap')
  const [gameScore, setGameScore] = useState<number>(0)

  // Filter valid alphanumeric words with length >= 3
  const candidateWords = useMemo(() => {
    return words.filter((w) => w.cleanWord.length >= 3 && /^[a-zA-Z]+$/.test(w.cleanWord))
  }, [words])

  // Current target word for Listen & Tap / Say Word
  const [targetWordIndex, setTargetWordIndex] = useState<number>(0)
  const currentTarget = candidateWords[targetWordIndex % Math.max(1, candidateWords.length)]

  // Missing letter state
  const [missingLetterIdx, setMissingLetterIdx] = useState<number>(1)
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  // Balloon pop state
  const [balloons, setBalloons] = useState<{ id: number; word: string; x: number; y: number; color: string }[]>([])

  // Play target word audio
  const playTargetWordAudio = () => {
    if (!currentTarget || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(`Find the word: ${currentTarget.cleanWord}`)
    u.rate = 0.85
    u.pitch = 1.1
    window.speechSynthesis.speak(u)
    gameAudio.playTap()
  }

  // Setup game round
  useEffect(() => {
    if (candidateWords.length === 0) return
    setTargetWordIndex(Math.floor(Math.random() * candidateWords.length))
    setSelectedLetter(null)

    // Spawn balloons for Balloon Pop
    const colors = ['bg-rose-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500']
    const shuffled = [...candidateWords].sort(() => 0.5 - Math.random()).slice(0, 5)
    setBalloons(
      shuffled.map((w, i) => ({
        id: i,
        word: w.cleanWord,
        x: 15 + i * 18,
        y: 40 + (i % 2) * 15,
        color: colors[i % colors.length],
      }))
    )
  }, [candidateWords, activeGame])

  // Handle tap in Listen & Tap game
  const handleWordTap = (tappedWord: PageWordItem) => {
    if (activeGame !== 'listen_tap' || !currentTarget) return

    if (tappedWord.cleanWord.toLowerCase() === currentTarget.cleanWord.toLowerCase()) {
      gameAudio.playSuccess()
      confetti({ particleCount: 30, spread: 60 })
      setGameScore((s) => s + 1)
      onAddStar?.(1)
      toast.success(`Correct! You found "${currentTarget.cleanWord}" ⭐`)
      // Next word
      setTimeout(() => {
        setTargetWordIndex((prev) => (prev + 1) % candidateWords.length)
      }, 800)
    } else {
      gameAudio.playWrong()
      toast(`Keep looking! Listen again.`)
    }
  }

  // Missing letter logic
  const missingLetterData = useMemo(() => {
    if (!currentTarget) return null
    const w = currentTarget.cleanWord.toUpperCase()
    const midIdx = Math.floor(w.length / 2)
    const hiddenChar = w[midIdx]
    const masked = w.split('').map((c, i) => (i === midIdx ? '_' : c)).join(' ')
    const vowels = ['A', 'E', 'I', 'O', 'U']
    const options = Array.from(new Set([hiddenChar, ...vowels])).slice(0, 4).sort(() => 0.5 - Math.random())

    return { masked, hiddenChar, options }
  }, [currentTarget])

  const handleSelectLetter = (char: string) => {
    if (!missingLetterData) return
    setSelectedLetter(char)

    if (char === missingLetterData.hiddenChar) {
      gameAudio.playSuccess()
      confetti({ particleCount: 25, spread: 50 })
      setGameScore((s) => s + 1)
      onAddStar?.(1)
      toast.success('Awesome! Correct letter ⭐')
      setTimeout(() => {
        setTargetWordIndex((prev) => (prev + 1) % candidateWords.length)
        setSelectedLetter(null)
      }, 1000)
    } else {
      gameAudio.playWrong()
      toast('Not quite, try another letter!')
    }
  }

  // Balloon pop click
  const handlePopBalloon = (balloonWord: string, id: number) => {
    if (!currentTarget) return
    if (balloonWord.toLowerCase() === currentTarget.cleanWord.toLowerCase()) {
      gameAudio.playLevelUp()
      confetti({ particleCount: 40, spread: 70 })
      setGameScore((s) => s + 2)
      onAddStar?.(2)
      toast.success(`POP! You got "${balloonWord}"! +2 Stars ⭐⭐`)
      setBalloons((prev) => prev.filter((b) => b.id !== id))
    } else {
      gameAudio.playWrong()
    }
  }

  if (candidateWords.length === 0) {
    return (
      <div className="absolute top-4 left-1/2 -translate-x-1/2 p-3 bg-slate-900/90 text-white rounded-2xl border border-white/20 z-30 text-xs">
        No words detected on this page for games. Turn to another page!
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {/* Game Mode Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/20 pointer-events-auto">
        <button
          onClick={() => {
            setActiveGame('listen_tap')
            gameAudio.playTap()
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'listen_tap' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Volume2 size={15} />
          <span>Listen & Tap</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('missing_letter')
            gameAudio.playTap()
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'missing_letter' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Sparkles size={15} />
          <span>Missing Letter</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('balloon_pop')
            gameAudio.playTap()
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'balloon_pop' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Trophy size={15} />
          <span>Balloon Pop</span>
        </button>

        <div className="w-px h-5 bg-white/20 mx-1" />

        {/* Score */}
        <div className="flex items-center gap-1 px-2 text-xs font-black text-amber-300">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span>{gameScore}</span>
        </div>
      </div>

      {/* GAME 1: LISTEN & TAP */}
      {activeGame === 'listen_tap' && (
        <>
          <div className="absolute top-18 left-1/2 -translate-x-1/2 p-3 bg-blue-600/95 text-white rounded-2xl shadow-2xl border-2 border-white/30 flex items-center gap-3 pointer-events-auto animate-bounce-subtle">
            <button
              onClick={playTargetWordAudio}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-transform hover:scale-110"
              title="Hear word"
            >
              <Volume2 size={22} className="text-white" />
            </button>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-200">Listen & Tap on the Book!</div>
              <div className="text-base font-black">"{currentTarget?.cleanWord}"</div>
            </div>
            <button
              onClick={() => setTargetWordIndex((p) => (p + 1) % candidateWords.length)}
              className="p-1.5 bg-blue-700 hover:bg-blue-800 rounded-lg text-xs"
              title="Next word"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Interactive Word Zones for Tap */}
          <div className="absolute inset-0 pointer-events-none">
            {words.map((w) => (
              <div
                key={w.id}
                onClick={() => handleWordTap(w)}
                style={{
                  left: `${w.x}px`,
                  top: `${w.y}px`,
                  width: `${w.w}px`,
                  height: `${w.h}px`,
                }}
                className="absolute pointer-events-auto hover:bg-amber-400/30 hover:ring-2 hover:ring-amber-400 rounded cursor-pointer transition-all"
              />
            ))}
          </div>
        </>
      )}

      {/* GAME 2: MISSING LETTER */}
      {activeGame === 'missing_letter' && missingLetterData && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 p-5 bg-slate-900/95 backdrop-blur-md text-white rounded-3xl shadow-2xl border border-white/20 pointer-events-auto flex flex-col items-center gap-3 min-w-[280px]">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fill the missing letter:</div>
          <div className="text-2xl font-black text-amber-300 tracking-widest bg-slate-800 px-6 py-2 rounded-2xl border border-slate-700">
            {missingLetterData.masked}
          </div>
          <div className="flex gap-2 mt-2">
            {missingLetterData.options.map((char) => (
              <button
                key={char}
                onClick={() => handleSelectLetter(char)}
                className={`w-12 h-12 rounded-2xl text-lg font-black transition-transform hover:scale-110 shadow-lg ${
                  selectedLetter === char
                    ? char === missingLetterData.hiddenChar
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3: BALLOON POP */}
      {activeGame === 'balloon_pop' && (
        <>
          <div className="absolute top-18 left-1/2 -translate-x-1/2 p-3 bg-rose-600/95 text-white rounded-2xl shadow-2xl border-2 border-white/30 flex items-center gap-3 pointer-events-auto">
            <button onClick={playTargetWordAudio} className="p-2 bg-white/20 rounded-xl">
              <Volume2 size={18} />
            </button>
            <div>
              <div className="text-[10px] font-bold text-rose-200 uppercase">Pop the balloon with:</div>
              <div className="text-base font-black">"{currentTarget?.cleanWord}"</div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {balloons.map((b) => (
              <button
                key={b.id}
                onClick={() => handlePopBalloon(b.word, b.id)}
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                className={`absolute pointer-events-auto p-4 rounded-full text-white font-black text-xs shadow-2xl transition-transform hover:scale-125 cursor-pointer animate-float ${b.color} border-2 border-white/40 flex items-center justify-center`}
              >
                {b.word}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
