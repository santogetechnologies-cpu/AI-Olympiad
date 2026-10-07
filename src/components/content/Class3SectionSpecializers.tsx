import { useState } from 'react'
import {
  Volume2
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'

// Helper for speech synthesis
function speakChildText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.25 // Friendly, playful voice
    window.speechSynthesis.speak(utterance)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASS 3 WORKBOOK: "🎨 My AI Adventure Diary & Voice Journal"
// ─────────────────────────────────────────────────────────────────────────────
export function Class3WorkbookView({
  section,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('🤖 Super Smart!')
  const [answerPrompt, setAnswerPrompt] = useState('')
  const [stampCollected, setStampCollected] = useState(isCompleted)

  const quickIdeas = [
    { text: '🐶 A robot puppy that fetches my shoes!', emoji: '🐶' },
    { text: '🚀 A space rocket exploring Jupiter!', emoji: '🚀' },
    { text: '🎨 A paintbrush that turns drawings into cartoons!', emoji: '🎨' },
    { text: '🍰 A magic oven that bakes star cookies!', emoji: '🍪' },
  ]

  const feelings = [
    { emoji: '😄', label: 'Super Happy!' },
    { emoji: '🤖', label: 'Like a Cool Robot!' },
    { emoji: '🚀', label: 'Ready for Adventure!' },
    { emoji: '🤩', label: 'Mind Blown!' },
  ]

  const handleCollectStamp = () => {
    if (!answerPrompt.trim()) {
      toast.error('Pick or type your dream robot idea first!')
      speakChildText('Tell me what your dream robot will do!')
      return
    }
    setStampCollected(true)
    gamification.addXP(20, undefined, `c3-diary-${chapterNum}`)
    gamification.launchConfetti()
    speakChildText('Fantastic dream idea! You earned your Golden AI Inventor Stamp!')
    toast.success('🎉 Golden Explorer Stamp Collected! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto touch-manipulation pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 p-5 sm:p-7 rounded-3xl border-4 border-yellow-200 shadow-md text-slate-900 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-white/95 text-amber-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5">
            <span>🎨 Section 4: AI Adventure Diary</span>
          </span>
          <button
            onClick={() => speakChildText('Welcome to your AI Adventure Diary! Tell us how you feel and what cool robot you want to make!')}
            className="text-xs bg-amber-950 text-white font-black px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:bg-black"
          >
            <Volume2 size={13} /> Read Aloud 🔊
          </button>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-amber-950">
          My AI Dream Diary
        </h2>
        <p className="text-xs sm:text-sm text-amber-900 font-bold">
          Draw your thoughts, collect stickers, and tell RoboBuddy what you learned!
        </p>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Mood Selector */}
      <div className="bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
          <span>1. How do you feel about AI today?</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {feelings.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedFeeling(f.label)
                speakChildText(`I feel ${f.label}`)
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                selectedFeeling === f.label
                  ? 'bg-amber-100 border-amber-500 scale-102 shadow-xs font-black text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
              }`}
            >
              <span className="text-3xl block mb-1">{f.emoji}</span>
              <span className="text-[11px] leading-tight block">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dream Robot Prompt & Quick Ideas */}
      <div className="bg-white p-5 rounded-3xl border-3 border-purple-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900">
            2. If you built a smart AI helper, what would it do?
          </h3>
        </div>

        {/* Quick tap bubbles */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-slate-400">Tap a dream idea or write below:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickIdeas.map((idea, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnswerPrompt(idea.text)
                  speakChildText(idea.text)
                }}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  answerPrompt === idea.text
                    ? 'bg-purple-100 border-purple-500 text-purple-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50'
                }`}
              >
                <span>{idea.emoji}</span>
                <span className="flex-1">{idea.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="pt-2">
          <textarea
            rows={3}
            value={answerPrompt}
            onChange={e => setAnswerPrompt(e.target.value)}
            placeholder="Type your own super cool robot idea here..."
            className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none text-slate-900 font-semibold"
          />
        </div>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="activity"
      />

      {/* Collect Stamp Button & Medal Display */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-3xl border-3 border-emerald-200 text-center space-y-3">
        {stampCollected ? (
          <div className="space-y-2 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-500 text-white text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-md animate-bounce">
              🎖️
            </div>
            <h4 className="text-base font-black text-emerald-950">
              Golden Explorer Stamp Collected!
            </h4>
            <p className="text-xs text-emerald-800 font-bold">
              Your diary entry is saved in your learning adventure treasure chest!
            </p>
            <Button
              onClick={onComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-6 py-2 rounded-2xl shadow-md cursor-pointer"
            >
              Continue to Flashcard Fun →
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleCollectStamp}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg cursor-pointer transform active:scale-98"
          >
            ⭐ Collect My Golden Stamp & Finish Diary (+20 XP)
          </Button>
        )}
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="bottom_summary"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASS 3 FLASHCARDS: "🎴 Magic Animal & Robot Flip Cards"
// ─────────────────────────────────────────────────────────────────────────────
export function Class3FlashcardsView({
  section,
  chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const kidCards = [
    {
      emoji: '👀',
      front: 'What does a robot use to SEE the room?',
      back: '📷 A Camera! It takes pictures and checks shapes and colors!',
      voiceQ: 'What does a robot use to see the room?',
      voiceA: 'A Camera! It takes pictures and checks shapes and colors!'
    },
    {
      emoji: '👂',
      front: 'How does a smart speaker HEAR you talk?',
      back: '🎤 A Microphone! It turns your voice into computer words!',
      voiceQ: 'How does a smart speaker hear you talk?',
      voiceA: 'A Microphone! It turns your voice into computer words!'
    },
    {
      emoji: '🧠',
      front: 'What is inside a robot’s smart brain?',
      back: '⚡ Computer Chips & Smart Code! They follow step-by-step instructions.',
      voiceQ: 'What is inside a robot’s smart brain?',
      voiceA: 'Computer Chips and Smart Code! They follow step-by-step instructions.'
    },
    {
      emoji: '🔋',
      front: 'Do robots eat bananas or pizza?',
      back: '🔌 No! They drink electricity from batteries and power plugs!',
      voiceQ: 'Do robots eat bananas or pizza?',
      voiceA: 'No! They drink electricity from batteries and power plugs!'
    }
  ]

  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [stars, setStars] = useState(0)

  const active = kidCards[cardIdx]

  const handleFlip = () => {
    const nextFlipped = !flipped
    setFlipped(nextFlipped)
    if (nextFlipped) {
      speakChildText(active.voiceA)
      setStars(s => Math.min(10, s + 1))
      toast.success('Star earned! ⭐')
    } else {
      speakChildText(active.voiceQ)
    }
  }

  const handleNext = () => {
    setFlipped(false)
    if (cardIdx < kidCards.length - 1) {
      setCardIdx(i => i + 1)
    } else {
      gamification.addXP(20, undefined, `c3-flashcards-${chapterNum}`)
      gamification.launchConfetti()
      speakChildText('Hooray! You mastered all magic cards!')
      onComplete()
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto touch-manipulation pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 p-5 rounded-3xl border-4 border-cyan-200 text-slate-900 shadow-md">
        <div className="flex items-center justify-between">
          <span className="bg-white/95 text-cyan-950 font-black text-xs px-3 py-0.5 rounded-full uppercase">
            🎴 Magic Flip Cards
          </span>
          <span className="bg-white/90 text-cyan-950 font-black text-xs px-3 py-0.5 rounded-full">
            ⭐ {stars} Stars
          </span>
        </div>
        <h2 className="text-xl font-black text-cyan-950 mt-1">
          {section.title || 'Magic Robot Cards'}
        </h2>
        <p className="text-xs text-cyan-900 font-bold">
          Tap the big card to flip and discover the secret answer!
        </p>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'flashcards'}
        position="header"
      />

      {/* 3D Big Flip Card */}
      <div
        onClick={handleFlip}
        className={`p-6 sm:p-8 rounded-3xl border-4 text-center cursor-pointer transition-all duration-300 shadow-lg min-h-[220px] flex flex-col items-center justify-between transform active:scale-95 ${
          flipped
            ? 'bg-gradient-to-br from-emerald-100 to-teal-50 border-emerald-400'
            : 'bg-white border-cyan-300 hover:border-cyan-500'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-black text-slate-400 uppercase">
            Card {cardIdx + 1} of {kidCards.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              speakChildText(flipped ? active.voiceA : active.voiceQ)
            }}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1"
          >
            <Volume2 size={13} /> Listen 🔊
          </button>
        </div>

        <div className="my-auto space-y-2 py-4">
          <span className="text-5xl block animate-bounce">{active.emoji}</span>
          <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {flipped ? active.back : active.front}
          </p>
        </div>

        <span className="text-xs font-black text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
          👉 {flipped ? 'Tap to see Question again' : 'Tap to Flip & Reveal Secret!'}
        </span>
      </div>

      {/* Card Controls */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => {
            setFlipped(false)
            if (cardIdx > 0) setCardIdx(i => i - 1)
          }}
          disabled={cardIdx === 0}
          className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl disabled:opacity-40 cursor-pointer"
        >
          ← Back
        </button>

        <Button
          onClick={handleNext}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs px-6 py-2.5 rounded-2xl shadow-md cursor-pointer"
        >
          {cardIdx === kidCards.length - 1 ? 'Mastered All Cards! (Finish) ✓' : 'Next Card →'}
        </Button>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'flashcards'}
        position="bottom_summary"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CLASS 3 PRACTICAL LAB: "🕹️ RoboBuddy Maze Remote Control Game"
// ─────────────────────────────────────────────────────────────────────────────
export function Class3PracticalLabView({
  section,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  // 4x4 Grid Position for Robot
  const [robotPos, setRobotPos] = useState({ r: 0, c: 0 })
  const [starsCollected, setStarsCollected] = useState<Record<string, boolean>>({})

  // Star positions on the grid
  const starLocations = [
    { r: 0, c: 3, id: 's1' },
    { r: 2, c: 1, id: 's2' },
    { r: 3, c: 3, id: 's3' },
  ]

  const moveRobot = (dr: number, dc: number) => {
    const nr = Math.max(0, Math.min(3, robotPos.r + dr))
    const nc = Math.max(0, Math.min(3, robotPos.c + dc))
    setRobotPos({ r: nr, c: nc })

    // Check if star collected
    starLocations.forEach(star => {
      if (star.r === nr && star.c === nc && !starsCollected[star.id]) {
        setStarsCollected(sc => ({ ...sc, [star.id]: true }))
        gamification.addXP(5, undefined, `star-${star.id}`)
        gamification.launchConfetti()
        toast.success('⭐ Wonder Star Collected! +5 XP')
        speakChildText('Star collected! Beep boop!')
      }
    })
  }

  const allStarsCollected = starLocations.every(s => starsCollected[s.id])

  const handleFinishLab = () => {
    gamification.addXP(20, undefined, `c3-lab-finish-${chapterNum}`)
    gamification.launchConfetti()
    speakChildText('Super driving! You navigated the robot through the entire maze!')
    toast.success('🎉 Remote Control Lab Complete! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto touch-manipulation pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 p-5 rounded-3xl border-4 border-emerald-200 text-slate-900 shadow-md">
        <div className="flex items-center justify-between">
          <span className="bg-white/95 text-emerald-950 font-black text-xs px-3 py-0.5 rounded-full uppercase">
            🕹️ Section 6: Remote Control Lab
          </span>
          <span className="bg-white/90 text-emerald-950 font-black text-xs px-3 py-0.5 rounded-full">
            ⭐ {Object.keys(starsCollected).length}/3 Stars
          </span>
        </div>
        <h2 className="text-xl font-black text-emerald-950 mt-1">
          {section.title || 'RoboBuddy Maze Runner'}
        </h2>
        <p className="text-xs text-emerald-900 font-bold">
          Use the remote control arrows below to drive RoboBuddy and collect all 3 stars!
        </p>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      {/* 4x4 Grid Maze */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border-4 border-emerald-300 shadow-xl">
        <div className="grid grid-cols-4 gap-2.5 aspect-square max-w-sm mx-auto">
          {Array.from({ length: 16 }).map((_, idx) => {
            const r = Math.floor(idx / 4)
            const c = idx % 4
            const isRobot = robotPos.r === r && robotPos.c === c
            const star = starLocations.find(s => s.r === r && s.c === c)
            const isStarPresent = star && !starsCollected[star.id]

            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl transition-all duration-200 ${
                  isRobot
                    ? 'bg-emerald-500/40 border-emerald-400 shadow-lg scale-105'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                {isRobot ? (
                  <span className="animate-bounce">🤖</span>
                ) : isStarPresent ? (
                  <span className="animate-pulse">⭐</span>
                ) : (
                  <span className="text-slate-700 text-xs font-mono">•</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Virtual D-Pad Remote Controller */}
      <div className="bg-white p-5 rounded-3xl border-3 border-emerald-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-center text-slate-700 uppercase tracking-wider">
          🎮 Robot Remote Controller
        </h3>

        <div className="flex flex-col items-center gap-2">
          {/* UP */}
          <button
            onClick={() => moveRobot(-1, 0)}
            className="w-16 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white font-black text-xl rounded-2xl shadow-md flex items-center justify-center cursor-pointer border-2 border-emerald-600"
          >
            ⬆️
          </button>

          {/* LEFT - BEEP - RIGHT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => moveRobot(0, -1)}
              className="w-16 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white font-black text-xl rounded-2xl shadow-md flex items-center justify-center cursor-pointer border-2 border-emerald-600"
            >
              ⬅️
            </button>

            <button
              onClick={() => {
                speakChildText('HONK HONK! RoboBuddy is ready to zoom!')
                toast.success('🔊 BEEP BEEP!')
              }}
              className="w-16 h-14 bg-amber-400 hover:bg-amber-500 active:scale-90 text-amber-950 font-black text-sm rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer border-2 border-amber-500"
            >
              <span>🔊</span>
              <span className="text-[9px] uppercase font-black">Horn</span>
            </button>

            <button
              onClick={() => moveRobot(0, 1)}
              className="w-16 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white font-black text-xl rounded-2xl shadow-md flex items-center justify-center cursor-pointer border-2 border-emerald-600"
            >
              ➡️
            </button>
          </div>

          {/* DOWN */}
          <button
            onClick={() => moveRobot(1, 0)}
            className="w-16 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white font-black text-xl rounded-2xl shadow-md flex items-center justify-center cursor-pointer border-2 border-emerald-600"
          >
            ⬇️
          </button>
        </div>
      </div>

      {/* Completion Button */}
      <div className="text-center pt-2">
        {allStarsCollected || isCompleted ? (
          <Button
            onClick={handleFinishLab}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg cursor-pointer animate-bounce"
          >
            🏆 All Stars Collected! Complete Lab (+20 XP) →
          </Button>
        ) : (
          <p className="text-xs text-slate-500 font-bold">
            👉 Drive the robot to all 3 star tiles to complete this lab!
          </p>
        )}
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="bottom_summary"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS 3 ASSIGNMENT: "🏆 Junior AI Inventor Studio & Robot Builder"
// ─────────────────────────────────────────────────────────────────────────────
export function Class3AssignmentView({
  section,
  chapterNum,
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [robotHead, setRobotHead] = useState('🤖 Friendly Bot')
  const [robotLegs, setRobotLegs] = useState('🚀 Rocket Boosters')
  const [robotPower, setRobotPower] = useState('🎨 Magic Drawing')
  const [robotName, setRobotName] = useState('Sparky')
  const [built, setBuilt] = useState(isCompleted)

  const heads = [
    { label: '🤖 Friendly Bot', emoji: '🤖' },
    { label: '🐱 Cat Bot', emoji: '🐱' },
    { label: '🦁 Lion Bot', emoji: '🦁' },
    { label: '👽 Alien Bot', emoji: '👽' },
  ]

  const legs = [
    { label: '🚀 Rocket Boosters', emoji: '🚀' },
    { label: '🛞 Speedy Wheels', emoji: '🛞' },
    { label: '🦾 Super Legs', emoji: '🦾' },
    { label: '🛸 Hover Jet', emoji: '🛸' },
  ]

  const powers = [
    { label: '🎨 Magic Drawing', emoji: '🎨' },
    { label: '🧹 Room Cleaner', emoji: '🧹' },
    { label: '🎵 Song Player', emoji: '🎵' },
    { label: '🛡️ Best Friend Shield', emoji: '🛡️' },
  ]

  const handleBuild = () => {
    setBuilt(true)
    gamification.addXP(25, undefined, `c3-assignment-${chapterNum}`)
    gamification.unlockBadge('badge_maker')
    gamification.launchConfetti()
    speakChildText(`Congratulations! You invented ${robotName}! It has ${robotPower} and ${robotLegs}! You are an official Junior AI Inventor!`)
    toast.success(`🎉 ${robotName} Built! Junior AI Inventor Badge Awarded! +25 XP`)
    onComplete()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto touch-manipulation pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 p-5 rounded-3xl border-4 border-pink-200 text-white shadow-md">
        <span className="bg-white/90 text-purple-950 font-black text-xs px-3 py-0.5 rounded-full uppercase">
          🏆 Section 7: Junior Robot Inventor
        </span>
        <h2 className="text-xl sm:text-2xl font-black mt-1">
          {section.title || 'Build Your Custom Robot!'}
        </h2>
        <p className="text-xs sm:text-sm text-pink-100 font-bold">
          Choose parts, name your creation, and get your Official Inventor Certificate!
        </p>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'assignment'}
        position="header"
      />

      {/* 1. Pick Head */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-purple-200 shadow-sm space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900">1. Choose Robot Head:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {heads.map((h, i) => (
            <button
              key={i}
              onClick={() => {
                setRobotHead(h.label)
                speakChildText(h.label)
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                robotHead === h.label
                  ? 'bg-purple-100 border-purple-500 font-black text-purple-950 scale-102'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-3xl block mb-1">{h.emoji}</span>
              <span className="text-[11px] leading-tight block">{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Pick Movement */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-blue-200 shadow-sm space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900">2. Choose How It Moves:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {legs.map((l, i) => (
            <button
              key={i}
              onClick={() => {
                setRobotLegs(l.label)
                speakChildText(l.label)
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                robotLegs === l.label
                  ? 'bg-blue-100 border-blue-500 font-black text-blue-950 scale-102'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-3xl block mb-1">{l.emoji}</span>
              <span className="text-[11px] leading-tight block">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Pick Superpower */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-amber-200 shadow-sm space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900">3. Choose Its Superpower:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {powers.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setRobotPower(p.label)
                speakChildText(p.label)
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                robotPower === p.label
                  ? 'bg-amber-100 border-amber-500 font-black text-amber-950 scale-102'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-3xl block mb-1">{p.emoji}</span>
              <span className="text-[11px] leading-tight block">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Name Your Robot */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-pink-200 shadow-sm space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900">4. Give Your Robot a Name:</h3>
        <input
          type="text"
          value={robotName}
          onChange={e => setRobotName(e.target.value)}
          placeholder="e.g. Sparky, RoboChamp, LunaBot..."
          className="w-full text-sm font-black p-3 bg-pink-50 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 text-purple-950"
        />
      </div>

      {/* Preview Card & Build Button */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-950 p-6 rounded-3xl text-white text-center space-y-4 shadow-xl border-4 border-pink-300">
        <h4 className="text-xs font-black uppercase text-pink-300 tracking-wider">
          Official Inventor Blueprint
        </h4>

        <div className="bg-white/10 p-4 rounded-2xl max-w-sm mx-auto space-y-1">
          <p className="text-2xl font-black text-yellow-300">{robotName}</p>
          <p className="text-xs text-white/90">Head: {robotHead}</p>
          <p className="text-xs text-white/90">Engine: {robotLegs}</p>
          <p className="text-xs text-white/90">Superpower: {robotPower}</p>
        </div>

        {built ? (
          <div className="space-y-2 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-yellow-400 text-yellow-950 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-lg animate-bounce">
              🎖️
            </div>
            <p className="text-sm font-black text-yellow-300">
              Certificate of Invention Awarded!
            </p>
            <Button
              onClick={onComplete}
              className="bg-pink-500 hover:bg-pink-600 text-white font-black text-xs px-6 py-2.5 rounded-2xl shadow-lg cursor-pointer"
            >
              Proceed to Final Crown Star Exam →
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleBuild}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl cursor-pointer"
          >
            🚀 Build & Patent My Robot! (+25 XP)
          </Button>
        )}
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'assignment'}
        position="bottom_summary"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CLASS 3 MASTERY QUIZ: "👑 Golden Crown Star Exam"
// ─────────────────────────────────────────────────────────────────────────────
export function Class3MasteryQuizView({
  section,
  chapterTitle,
  chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterTitle: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const questions = [
    {
      q: 'Does a computer robot need clear step-by-step instructions?',
      options: [
        { text: 'Yes! Step 1, Step 2, Step 3 📜', correct: true },
        { text: 'No, it just guesses randomly 🤷', correct: false }
      ]
    },
    {
      q: 'Which machine has smart AI camera eyes?',
      options: [
        { text: 'A Self-Driving Electric Car 🚗', correct: true },
        { text: 'A wooden dining chair 🪑', correct: false }
      ]
    },
    {
      q: 'What should you always do when using computers and AI?',
      options: [
        { text: 'Be kind, curious & stay safe! 🌟', correct: true },
        { text: 'Tell secret passwords to strangers ❌', correct: false }
      ]
    }
  ]

  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const activeQ = questions[qIdx]

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 1)
      gamification.addXP(10, undefined, `c3-quiz-q${qIdx}-${chapterNum}`)
      gamification.launchConfetti()
      speakChildText('Ding ding! Super correct answer!')
      toast.success('Correct answer! ⭐ +10 XP')
    } else {
      speakChildText('Good try! Let’s keep learning together!')
      toast.error('Almost! Try your best!')
    }

    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1)
    } else {
      setFinished(true)
      gamification.addXP(30, undefined, `c3-quiz-finish-${chapterNum}`)
      gamification.unlockBadge('crown_master')
      gamification.launchConfetti()
      speakChildText('Hooray! You passed the Golden Crown Exam! You are the champion of this chapter!')
      onComplete()
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto touch-manipulation pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 rounded-3xl border-4 border-yellow-200 text-slate-900 text-center shadow-md space-y-2">
        <div className="w-16 h-16 bg-white text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-md animate-bounce border-2 border-amber-300">
          👑
        </div>
        <span className="bg-white/90 text-amber-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
          Section 8: Golden Crown Exam
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-amber-950">
          {section.title || `${chapterTitle} — Star Exam`}
        </h2>
        <p className="text-xs text-amber-900 font-bold">
          Answer 3 quick questions to earn your Chapter Victory Crown!
        </p>
      </div>

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'quiz'}
        position="header"
      />

      {!finished ? (
        <div className="bg-white p-6 rounded-3xl border-4 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase">
              Question {qIdx + 1} of {questions.length}
            </span>
            <button
              onClick={() => speakChildText(activeQ.q)}
              className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold flex items-center gap-1 cursor-pointer hover:bg-amber-200"
            >
              <Volume2 size={13} /> Listen Question 🔊
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {activeQ.q}
          </h3>

          <div className="space-y-3 pt-2">
            {activeQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.correct)}
                className="w-full p-4 rounded-2xl border-3 border-slate-200 hover:border-amber-400 bg-gradient-to-r from-white to-amber-50/50 text-left font-black text-xs sm:text-sm text-slate-900 transition-all transform active:scale-98 shadow-sm cursor-pointer"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border-4 border-amber-300 shadow-xl text-center space-y-4 animate-in zoom-in-95">
          <div className="w-20 h-20 bg-amber-400 text-white rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-lg animate-bounce">
            👑
          </div>
          <h3 className="text-2xl font-black text-amber-950">
            🎉 Level Mastered!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-sm mx-auto">
            You completed all 8 sections and earned the Golden Chapter Trophy! Score: {score}/{questions.length} (+30 Bonus XP!)
          </p>

          <div className="flex justify-center gap-2 pt-2">
            <Button
              onClick={() => {
                setQIdx(0)
                setScore(0)
                setFinished(false)
              }}
              variant="outline"
              size="sm"
              className="rounded-2xl font-bold cursor-pointer"
            >
              Play Again 🔄
            </Button>
            <Button
              onClick={onComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg cursor-pointer"
            >
              Next Chapter →
            </Button>
          </div>
        </div>
      )}

      <AssignedImageSlot
        classKey="class3"
        chapterNum={chapterNum}
        sectionKey={section.id || 'quiz'}
        position="bottom_summary"
      />
    </div>
  )
}
