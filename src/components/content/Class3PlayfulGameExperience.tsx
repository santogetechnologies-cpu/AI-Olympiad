import { useState, useRef } from 'react'
import {
  Volume2, Check, RefreshCw, Star,
  Trophy, Gift, ArrowRight, Heart,
  Gamepad2, CheckCircle, Move, PaintBucket,
  Trash2, Plus, Minus, RotateCw, Sparkles, Palette
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'

export interface PlacedGameEmoji {
  id: string
  emoji: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  size: number
  rotation: number
}

export interface Class3PlayfulGameProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  sectionNumber?: number
  onComplete?: () => void
}

export function Class3PlayfulGameExperience({
  chapterNum,
  chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete,
}: Class3PlayfulGameProps) {
  // Game states
  const [stars, setStars] = useState(0)
  const isLesson1 = lessonNumber === 1
  const [activeMiniGame, setActiveMiniGame] = useState<'identify' | 'order' | 'puzzle' | 'sticker' | 'quiz'>(
    isLesson1 ? 'identify' : 'order'
  )
  const [mascotMood, setMascotMood] = useState<'happy' | 'dancing' | 'cheering' | 'thinking'>('happy')
  const [hearts, setHearts] = useState(3)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<'success' | 'tryagain' | null>(null)

  // Step sequencer state
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [sequenceSuccess, setSequenceSuccess] = useState(false)

  // Puzzle state
  const [puzzleMatched, setPuzzleMatched] = useState<Record<string, boolean>>({})

  // Sticker playground state (Draggable Emojis + Canvas Color Fill)
  const [stickersPlaced, setStickersPlaced] = useState<PlacedGameEmoji[]>([])
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null)
  const [draggingStickerId, setDraggingStickerId] = useState<string | null>(null)
  const [canvasBgStyle, setCanvasBgStyle] = useState<string>('from-indigo-950 via-purple-900 to-slate-900')
  const [activeCanvasTool, setActiveCanvasTool] = useState<'move' | 'fill'>('move')
  const [activeFillColor, setActiveFillColor] = useState<string>('#6366f1')
  const gameCanvasRef = useRef<HTMLDivElement | null>(null)
  const dragStickerRef = useRef<{
    id: string
    startPointerX: number
    startPointerY: number
    initX: number
    initY: number
  } | null>(null)

  // Star Quiz state
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  // Web speech synthesis for voice read-aloud
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.pitch = 1.2 // Friendly, playful higher pitch for kids
      window.speechSynthesis.speak(utterance)
    }
  }

  // Chapter-specific content variations
  const cNum = parseInt(String(chapterNum || '1'), 10)

  // Game 1: Big Visual Identification Cards
  const identificationGame = (() => {
    if (cNum === 1) {
      return {
        prompt: "Tap the SMART machine that has a computer brain inside!",
        voice: "Tap the smart machine that has a computer brain inside!",
        items: [
          { id: '1', emoji: '🤖', label: 'RoboBuddy', isCorrect: true, cheer: 'BEEP BOOP! I have a smart computer brain!' },
          { id: '2', emoji: '🪑', label: 'Wooden Chair', isCorrect: false, cheer: 'A chair is for sitting! It has no wires or brain.' },
          { id: '3', emoji: '🚗', label: 'Self-Driving Car', isCorrect: true, cheer: 'YES! It has camera eyes and drives safely!' },
          { id: '4', emoji: '🍎', label: 'Juicy Apple', isCorrect: false, cheer: 'Yummy fruit! Good to eat, but not a machine!' }
        ]
      }
    }
    if (cNum === 2) {
      return {
        prompt: "Which button gives a SMART command to your robot?",
        voice: "Which button gives a smart command to your robot?",
        items: [
          { id: '1', emoji: '💃', label: 'Robot, Dance!', isCorrect: true, cheer: 'YAY! Watch the robot spin and groove!' },
          { id: '2', emoji: '😴', label: 'Sleep for 100 Years', isCorrect: false, cheer: 'Too long! The robot wants to play with you!' },
          { id: '3', emoji: '🧹', label: 'Clean the Toys', isCorrect: true, cheer: 'SUPER! Robot picks up blocks and tidies the room!' },
          { id: '4', emoji: '🌧️', label: 'Make It Rain Candy', isCorrect: false, cheer: 'Robots cannot change the sky clouds!' }
        ]
      }
    }
    if (cNum === 3) {
      return {
        prompt: "Find the AI Helper inside your Home!",
        voice: "Find the AI helper inside your home!",
        items: [
          { id: '1', emoji: '🔊', label: 'Smart Voice Speaker', isCorrect: true, cheer: 'Plays your favorite music when you ask!' },
          { id: '2', emoji: '🛋️', label: 'Comfy Sofa', isCorrect: false, cheer: 'Cozy for sitting, but cannot talk!' },
          { id: '3', emoji: '🧹', label: 'Robot Vacuum', isCorrect: true, cheer: 'Zips around and cleans the carpet on its own!' },
          { id: '4', emoji: '🚪', label: 'Wooden Door', isCorrect: false, cheer: 'A regular door! You push it open by hand.' }
        ]
      }
    }
    if (cNum === 4) {
      return {
        prompt: "Who builds smart AI friends for the future?",
        voice: "Who builds smart AI friends for the future?",
        items: [
          { id: '1', emoji: '👩‍💻', label: 'Computer Coder', isCorrect: true, cheer: 'Writes friendly instructions for robots!' },
          { id: '2', emoji: '🦖', label: 'Sleepy Dinosaur', isCorrect: false, cheer: 'Dinosaurs lived long ago, before computers!' },
          { id: '3', emoji: '👨‍🚀', label: 'Space Scientist', isCorrect: true, cheer: 'Sends smart rovers to explore red planet Mars!' },
          { id: '4', emoji: '🍦', label: 'Ice Cream Cone', isCorrect: false, cheer: 'Delicious treat, but cannot build robots!' }
        ]
      }
    }
    if (cNum === 5) {
      return {
        prompt: "Which magic tool lets AI draw with you?",
        voice: "Which magic tool lets AI draw with you?",
        items: [
          { id: '1', emoji: '🎨', label: 'Magic AI Paintbrush', isCorrect: true, cheer: 'Turns your shapes into beautiful cartoon dragons!' },
          { id: '2', emoji: '🧱', label: 'Heavy Stone', isCorrect: false, cheer: 'A stone cannot draw paintings!' },
          { id: '3', emoji: '🪄', label: 'Story Generator', isCorrect: true, cheer: 'Creates a bedtime fairy tale with you as the hero!' },
          { id: '4', emoji: '🥄', label: 'Soup Spoon', isCorrect: false, cheer: 'Great for cereal, not for making art!' }
        ]
      }
    }
    return {
      prompt: "Which rule keeps you SAFE with AI?",
      voice: "Which rule keeps you safe with AI?",
      items: [
        { id: '1', emoji: '🛡️', label: 'Keep Passwords Secret', isCorrect: true, cheer: 'YES! Never tell secret passwords to strangers!' },
        { id: '2', emoji: '🗣️', label: 'Shout Secret Address', isCorrect: false, cheer: 'NO! Keep your home address private and safe!' },
        { id: '3', emoji: '🤝', label: 'Ask Parents Before Sharing', isCorrect: true, cheer: 'GOLD STAR! Always check with mom, dad or teacher!' },
        { id: '4', emoji: '🍫', label: 'Eat 50 Chocolates', isCorrect: false, cheer: 'That might give you a tummy ache!' }
      ]
    }
  })()

  // Game 2: Step Sequencer ("Put in Order!")
  const sequenceSteps = [
    { stepNum: 1, emoji: '👀', text: '1. Look at the Toy' },
    { stepNum: 2, emoji: '🧠', text: '2. Think where to put it' },
    { stepNum: 3, emoji: '🦾', text: '3. Pick up gently' },
    { stepNum: 4, emoji: '📦', text: '4. Place in toy box!' }
  ]

  // Game 3: Match Pairs (Sensors to Superpowers)
  const puzzlePairs = [
    { id: 'eyes', emoji: '👀', sensor: 'Camera Eyes', power: 'Sees faces & colors' },
    { id: 'ears', emoji: '👂', sensor: 'Microphone Ears', power: 'Hears your voice' },
    { id: 'brain', emoji: '🧠', sensor: 'Computer Brain', power: 'Solves fun puzzles' },
    { id: 'wheels', emoji: '🛞', sensor: 'Motor Wheels', power: 'Moves around room' }
  ]

  // Game 4: 3-Question Star Quiz Arcade
  const arcadeQuestions = [
    {
      q: 'Does a computer robot need instructions to do things?',
      options: [
        { text: 'Yes! Step-by-step instructions 📜', correct: true },
        { text: 'No, it just guesses randomly 🤷', correct: false }
      ]
    },
    {
      q: 'What is like a robot’s eye?',
      options: [
        { text: 'A digital camera 📷', correct: true },
        { text: 'A glass of water 🥛', correct: false }
      ]
    },
    {
      q: 'When using AI, what should you always do?',
      options: [
        { text: 'Be kind, curious & stay safe! 🌟', correct: true },
        { text: 'Never ask questions 🤐', correct: false }
      ]
    }
  ]

  const handleCardTap = (item: any) => {
    setSelectedCardId(item.id)
    if (item.isCorrect) {
      setFeedbackType('success')
      setFeedbackMessage(item.cheer)
      setMascotMood('cheering')
      setStars(s => Math.min(10, s + 1))
      gamification.addXP(5, undefined, `class3-card-${item.id}`)
      gamification.launchConfetti()
      speakText(item.cheer)
      toast.success('⭐ Star earned! +5 XP')
    } else {
      setFeedbackType('tryagain')
      setFeedbackMessage(item.cheer)
      setMascotMood('thinking')
      setHearts(h => Math.max(1, h - 1))
      speakText(item.cheer)
    }
  }

  const handleSequenceTap = (stepNum: number) => {
    if (userSequence.includes(stepNum)) return
    const updated = [...userSequence, stepNum]
    setUserSequence(updated)

    // Check if current order is correct so far
    const isCorrectSoFar = updated.every((num, idx) => num === idx + 1)
    if (!isCorrectSoFar) {
      toast.error('Oops! Try putting them in order: 1, 2, 3, 4')
      setUserSequence([])
      return
    }

    if (updated.length === 4) {
      setSequenceSuccess(true)
      setStars(s => Math.min(10, s + 2))
      gamification.addXP(10, undefined, `class3-sequence-done`)
      gamification.launchConfetti()
      speakText("Hooray! You arranged the robot steps perfectly!")
      toast.success('🎉 You arranged all 4 steps! +10 XP')
    }
  }

  const handlePuzzlePairTap = (id: string) => {
    setPuzzleMatched(prev => {
      const next = { ...prev, [id]: true }
      if (Object.keys(next).length === puzzlePairs.length) {
        setStars(s => Math.min(10, s + 2))
        gamification.addXP(10, undefined, `class3-puzzle-done`)
        gamification.launchConfetti()
        speakText('Magnificent! You matched all robot superpowers!')
      }
      return next
    })
    toast.success('Matched superpower! ✨')
  }

  const handleStartStickerDrag = (
    e: React.PointerEvent,
    id: string,
    currentX: number,
    currentY: number
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setSelectedStickerId(id)
    setDraggingStickerId(id)
    dragStickerRef.current = {
      id,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      initX: currentX,
      initY: currentY
    }
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
  }

  const handleStickerPointerMove = (e: React.PointerEvent) => {
    if (!dragStickerRef.current || !gameCanvasRef.current) return
    const rect = gameCanvasRef.current.getBoundingClientRect()
    const deltaX = ((e.clientX - dragStickerRef.current.startPointerX) / rect.width) * 100
    const deltaY = ((e.clientY - dragStickerRef.current.startPointerY) / rect.height) * 100

    const newX = Math.max(4, Math.min(92, parseFloat((dragStickerRef.current.initX + deltaX).toFixed(1))))
    const newY = Math.max(6, Math.min(88, parseFloat((dragStickerRef.current.initY + deltaY).toFixed(1))))

    setStickersPlaced(prev =>
      prev.map(s => (s.id === dragStickerRef.current!.id ? { ...s, x: newX, y: newY } : s))
    )
  }

  const handleStickerPointerUp = (e: React.PointerEvent) => {
    if (dragStickerRef.current) {
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {}
      dragStickerRef.current = null
      setDraggingStickerId(null)
      gameAudio.playTap()
    }
  }

  const handleStickerTap = (emoji: string) => {
    const id = `stk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    const newSticker: PlacedGameEmoji = {
      id,
      emoji,
      x: Math.floor(Math.random() * 50) + 25,
      y: Math.floor(Math.random() * 45) + 25,
      size: 40,
      rotation: 0
    }
    setStickersPlaced(prev => [...prev, newSticker])
    setSelectedStickerId(id)
    setStars(s => Math.min(10, s + 1))
    gameAudio.playCoin()
    toast.success('Emoji placed! Tap and drag it anywhere! 🎨', { icon: emoji })
  }

  const handleResizeSticker = (id: string, delta: number) => {
    setStickersPlaced(prev =>
      prev.map(s => s.id === id ? { ...s, size: Math.max(24, Math.min(80, s.size + delta)) } : s)
    )
    gameAudio.playTap()
  }

  const handleRotateSticker = (id: string) => {
    setStickersPlaced(prev =>
      prev.map(s => s.id === id ? { ...s, rotation: (s.rotation + 45) % 360 } : s)
    )
    gameAudio.playTap()
  }

  const handleDeleteSticker = (id: string) => {
    setStickersPlaced(prev => prev.filter(s => s.id !== id))
    if (selectedStickerId === id) setSelectedStickerId(null)
    gameAudio.playTap()
    toast('Emoji removed', { icon: '🗑️' })
  }

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setStars(s => Math.min(10, s + 2))
      gamification.addXP(10, undefined, `class3-quiz-q${quizIdx}`)
      gamification.launchConfetti()
      toast.success('Correct answer! 🌟')
      speakText('Correct! You are super smart!')
    } else {
      toast.error('Nice try! Let us learn together!')
    }

    if (quizIdx < arcadeQuestions.length - 1) {
      setQuizIdx(i => i + 1)
    } else {
      setQuizFinished(true)
      gamification.addXP(15, undefined, `class3-arcade-complete`)
      gamification.unlockBadge('quiz_ace')
      if (onComplete) onComplete()
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto touch-manipulation pb-10">
      
      {/* ── 1. ROBOBUDDY MASCOT & LIVE GAME STATS BAR ── */}
      <div className={`p-4 sm:p-6 rounded-3xl shadow-lg border-4 text-slate-900 relative overflow-hidden ${
        isLesson1
          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 border-yellow-200'
          : 'bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 border-purple-200'
      }`}>
        <div className="flex items-center justify-between gap-3">
          
          {/* Animated Mascot */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMascotMood(m => m === 'happy' ? 'dancing' : m === 'dancing' ? 'cheering' : 'happy')
                speakText(isLesson1 
                  ? "Hi friend! Look at the pictures and tap the smart machines!" 
                  : "Let's give RoboBuddy action commands and place cool stickers!")
              }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl sm:text-5xl transform active:scale-90 hover:scale-105 transition-all duration-300 animate-bounce flex-shrink-0 cursor-pointer border-2 border-amber-300"
              title="Click to talk to RoboBuddy"
            >
              {mascotMood === 'happy' ? (isLesson1 ? '🤖' : '🚀') : mascotMood === 'dancing' ? '💃' : mascotMood === 'cheering' ? '🎉' : '🧐'}
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-white/90 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  {isLesson1 ? '🔍 Lesson 1: Picture Wonder Discovery' : '🎮 Lesson 2: Robot Action Playground'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-amber-950 mt-0.5 leading-tight">
                {topicTitle}
              </h2>
              <p className="text-xs text-amber-900 font-bold">
                {chapterTitle}
              </p>
            </div>
          </div>

          {/* Gamified Health & Star Coins */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full shadow-xs border border-amber-200">
              <Star className="text-amber-500 fill-amber-400" size={16} />
              <span className="font-black text-xs text-amber-950">{stars} Stars</span>
            </div>
            <div className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-rose-600">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  size={14}
                  className={i < hearts ? "fill-rose-500 text-rose-500" : "text-slate-300 fill-slate-200"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Listen / Voice Narration Button */}
        <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-amber-950 truncate flex-1">
            {isLesson1 ? '👀 Tap the picture cards to discover smart AI helpers!' : '🕹️ Order commands and place stickers!'}
          </p>
          <button
            onClick={() => speakText(isLesson1 
              ? `Welcome to ${topicTitle}! Look at the pictures and discover what has a computer brain inside!`
              : `Welcome to Lesson 2! Let's arrange commands and build RoboBuddy's room!`)}
            className="inline-flex items-center gap-1 bg-amber-950 text-white text-[11px] font-black px-3 py-1.5 rounded-full hover:bg-black active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Volume2 size={13} />
            <span>Read to Me 🔊</span>
          </button>
        </div>
      </div>

      {/* ── 2. MINI-GAME SELECTOR TABS (Tailored per Lesson) ── */}
      <div className={`grid gap-1.5 sm:gap-2 p-1.5 rounded-2xl border ${
        isLesson1 ? 'grid-cols-2 bg-amber-50 border-amber-200' : 'grid-cols-3 bg-purple-50 border-purple-200'
      }`}>
        {(isLesson1 ? [
          { id: 'identify', label: '1. Picture Discovery', icon: '🔍' },
          { id: 'puzzle', label: '2. Match Superpowers', icon: '🧩' },
        ] : [
          { id: 'order', label: '1. Command Steps', icon: '🔢' },
          { id: 'sticker', label: '2. Sticker Toybox', icon: '🎨' },
          { id: 'quiz', label: '3. Star Quiz', icon: '⭐' },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveMiniGame(tab.id as any)
              speakText(`Starting ${tab.label}`)
            }}
            className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
              activeMiniGame === tab.id
                ? (isLesson1
                    ? 'bg-amber-400 text-amber-950 font-black shadow-md scale-102 border-2 border-amber-500'
                    : 'bg-purple-500 text-white font-black shadow-md scale-102 border-2 border-purple-600')
                : 'bg-white text-slate-600 font-bold hover:bg-slate-50'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="text-[10px] sm:text-xs leading-tight truncate w-full">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 3. ACTIVE GAME CANVAS ── */}

      {/* GAME 1: TAP & IDENTIFY */}
      {activeMiniGame === 'identify' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <Gamepad2 size={14} /> Game 1: Object Finder
            </span>
            <button
              onClick={() => speakText(identificationGame.voice)}
              className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Volume2 size={13} /> Listen Question
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {identificationGame.prompt}
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
            {identificationGame.items.map(item => {
              const isSelected = selectedCardId === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardTap(item)}
                  className={`p-4 sm:p-6 rounded-3xl border-3 text-center transition-all transform active:scale-95 flex flex-col items-center justify-center gap-2 min-h-[130px] cursor-pointer ${
                    isSelected
                      ? item.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200'
                        : 'bg-rose-50 border-rose-400'
                      : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl animate-bounce">{item.emoji}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">{item.label}</span>
                  {isSelected && item.isCorrect && (
                    <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                      ✓ Correct!
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Instant Feedback Banner */}
          {feedbackMessage && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 animate-in zoom-in-95 ${
              feedbackType === 'success'
                ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-300'
                : 'bg-amber-100 text-amber-950 border-2 border-amber-300'
            }`}>
              <span className="text-2xl">{feedbackType === 'success' ? '🎉' : '💡'}</span>
              <p className="flex-1">{feedbackMessage}</p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => setActiveMiniGame('order')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-md text-xs px-5 min-h-[42px]"
              icon={<ArrowRight size={15} />}
            >
              Next Game: Put Steps in Order →
            </Button>
          </div>
        </div>
      )}

      {/* GAME 2: STEP SEQUENCER (1, 2, 3, 4) */}
      {activeMiniGame === 'order' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-purple-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="bg-purple-100 text-purple-800 text-xs font-black px-3 py-1 rounded-full border border-purple-300 flex items-center gap-1">
              <Gamepad2 size={14} /> Game 2: Step Sequencer
            </span>
            <span className="text-xs font-bold text-slate-500">
              Steps placed: {userSequence.length}/4
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900">
            🤖 Help RoboBuddy clean up! Tap the steps in the right order (1 to 4):
          </h3>

          {/* Unordered Tap Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[sequenceSteps[2], sequenceSteps[0], sequenceSteps[3], sequenceSteps[1]].map((step, idx) => {
              const isTapped = userSequence.includes(step.stepNum)
              return (
                <button
                  key={idx}
                  onClick={() => handleSequenceTap(step.stepNum)}
                  disabled={isTapped}
                  className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                    isTapped
                      ? 'bg-slate-100 border-slate-300 text-slate-400 opacity-60'
                      : 'bg-purple-50/70 border-purple-300 text-purple-950 hover:bg-purple-100 active:scale-98 shadow-xs'
                  }`}
                >
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="flex-1">{step.text}</span>
                  {isTapped && <Check size={16} className="text-emerald-600" />}
                </button>
              )
            })}
          </div>

          {/* Current Ordered Ribbon */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">Your Robot Plan:</p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {userSequence.length === 0 && (
                <span className="text-xs text-slate-400 italic">Tap the steps above to build your sequence...</span>
              )}
              {userSequence.map((num, i) => (
                <span key={i} className="bg-purple-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-xs animate-in zoom-in-95">
                  Step {num} ✓
                </span>
              ))}
            </div>
          </div>

          {sequenceSuccess && (
            <div className="p-4 bg-emerald-100 text-emerald-950 rounded-2xl border-2 border-emerald-300 font-black text-xs sm:text-sm flex items-center gap-3">
              <Trophy size={24} className="text-amber-600 flex-shrink-0" />
              <span>Great Job! You gave the robot a perfect 4-step algorithm! +10 XP</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setUserSequence([])
                setSequenceSuccess(false)
              }}
              className="text-xs text-slate-500 font-bold flex items-center gap-1 hover:text-slate-800 cursor-pointer"
            >
              <RefreshCw size={13} /> Reset Steps
            </button>
            <Button
              onClick={() => setActiveMiniGame('puzzle')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-md text-xs px-5 min-h-[42px]"
            >
              Next: Match Superpowers →
            </Button>
          </div>
        </div>
      )}

      {/* GAME 3: MATCH SUPERPOWERS */}
      {activeMiniGame === 'puzzle' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-cyan-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-3 py-1 rounded-full border border-cyan-300 flex items-center gap-1">
              <Gamepad2 size={14} /> Game 3: Match Superpowers
            </span>
            <span className="text-xs font-bold text-slate-500">
              Matched: {Object.keys(puzzleMatched).length}/4
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900">
            🧩 Tap each Smart Sensor to activate its Superpower!
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {puzzlePairs.map(p => {
              const isDone = puzzleMatched[p.id]
              return (
                <button
                  key={p.id}
                  onClick={() => handlePuzzlePairTap(p.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-cyan-400 active:scale-98'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-xs text-slate-900">{p.sensor}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{isDone ? `⚡ ${p.power}` : 'Tap to unlock superpower'}</p>
                  </div>
                  {isDone && <CheckCircle size={18} className="text-emerald-600" />}
                </button>
              )
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => setActiveMiniGame('sticker')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-2xl shadow-md text-xs px-5 min-h-[42px]"
            >
              Next: Sticker Canvas →
            </Button>
          </div>
        </div>
      )}

      {/* GAME 4: STICKER & EMOJI PLAYGROUND */}
      {activeMiniGame === 'sticker' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-pink-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-black px-3 py-1 rounded-full border border-pink-300 flex items-center gap-1.5 shadow-xs">
              <Gamepad2 size={14} /> Game 4: Emoji World Studio
            </span>
            <div className="flex items-center gap-2">
              {/* Tool Mode Toggles: Drag vs Color Fill */}
              <button
                type="button"
                onClick={() => {
                  setActiveCanvasTool('move')
                  gameAudio.playTap()
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCanvasTool === 'move'
                    ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Move size={13} />
                <span>Move Emojis ✋</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCanvasTool('fill')
                  gameAudio.playTap()
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCanvasTool === 'fill'
                    ? 'bg-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <PaintBucket size={13} />
                <span>Color Fill Canvas 🎨</span>
              </button>

              <span className="text-xs font-bold text-slate-500 ml-1">
                Emojis: {stickersPlaced.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              {activeCanvasTool === 'move'
                ? '🖐️ Tap an emoji to place, then DRAG it anywhere on the canvas!'
                : '🎨 Pick a color below, then tap the canvas to flood fill it!'}
            </h3>
          </div>

          {/* Color Fill Palette (when in fill mode or choosing background) */}
          {activeCanvasTool === 'fill' && (
            <div className="p-3 bg-pink-50 rounded-2xl border-2 border-pink-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-900 flex items-center gap-1">
                  <Palette size={14} /> Tap a color to fill your magic canvas:
                </span>
                <span className="text-[11px] font-bold text-pink-700">6 World Themes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: '🌌 Deep Space', style: 'from-indigo-950 via-purple-900 to-slate-900', color: '#1e1b4b' },
                  { name: '☀️ Sunny Sky', style: 'from-sky-400 via-sky-200 to-amber-100', color: '#38bdf8' },
                  { name: '🌲 Magic Forest', style: 'from-emerald-900 via-teal-900 to-slate-950', color: '#065f46' },
                  { name: '🌸 Candy Pink', style: 'from-pink-500 via-rose-300 to-purple-400', color: '#f472b6' },
                  { name: '⚡ Cyber Neon', style: 'from-violet-950 via-slate-900 to-cyan-950', color: '#581c87' },
                  { name: '🎨 Clean Canvas', style: 'from-slate-100 via-white to-slate-200', color: '#ffffff' }
                ].map((th) => (
                  <button
                    key={th.name}
                    type="button"
                    onClick={() => {
                      setCanvasBgStyle(th.style)
                      setActiveFillColor(th.color)
                      gameAudio.playSuccess()
                      toast.success(`Canvas filled with ${th.name}! 🎨`)
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      canvasBgStyle === th.style
                        ? 'bg-slate-900 text-white ring-2 ring-pink-500 scale-105'
                        : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: th.color }} />
                    {th.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Palette (Categorized Tabs) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
              <span>Tap to spawn an emoji:</span>
              <span className="text-[11px] text-pink-600 font-extrabold">Drag anywhere on canvas →</span>
            </div>
            <div className="flex items-center justify-around bg-pink-50/80 p-2 sm:p-3 rounded-2xl border border-pink-200 overflow-x-auto gap-1">
              {[
                '🤖', '🛸', '🚀', '🧠', '💻', '⚡', '🦾',
                '🐶', '🐱', '🦁', '🐼', '🦄', '🦊', '🐰',
                '⭐', '🌟', '🌈', '🎨', '💡', '🏆', '🍕'
              ].map((em, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleStickerTap(em)}
                  className="text-2xl sm:text-3xl p-1.5 rounded-xl hover:bg-white hover:scale-130 active:scale-90 transition-all cursor-pointer flex-shrink-0"
                  title={`Place ${em}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Emoji Transformation Bar */}
          {selectedStickerId && (
            <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-300 flex items-center justify-between animate-in zoom-in-95 text-xs font-black text-amber-950">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                Selected Emoji Controls:
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleResizeSticker(selectedStickerId, 8)}
                  title="Make Bigger"
                  className="px-2 py-1 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} /> Bigger
                </button>
                <button
                  type="button"
                  onClick={() => handleResizeSticker(selectedStickerId, -8)}
                  title="Make Smaller"
                  className="px-2 py-1 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Minus size={12} /> Smaller
                </button>
                <button
                  type="button"
                  onClick={() => handleRotateSticker(selectedStickerId)}
                  title="Rotate 45°"
                  className="px-2 py-1 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw size={12} /> Spin
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSticker(selectedStickerId)}
                  title="Remove Emoji"
                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          )}

          {/* Magic Canvas Area with Smooth Dragging & Color Fill */}
          <div
            ref={gameCanvasRef}
            onClick={() => {
              if (activeCanvasTool === 'fill') {
                gameAudio.playSuccess()
                toast.success('Canvas filled with color! 🎨')
              }
            }}
            className={`relative bg-gradient-to-br ${canvasBgStyle} rounded-3xl h-64 sm:h-72 overflow-hidden border-4 border-pink-300 shadow-inner select-none transition-all duration-300 ${
              activeCanvasTool === 'fill' ? 'cursor-cell' : 'cursor-default'
            }`}
          >
            {stickersPlaced.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <span className="text-4xl sm:text-5xl mb-2 animate-bounce">🤖 ✨ 🚀</span>
                <p className="text-white/80 text-xs sm:text-sm font-black drop-shadow-md">
                  Tap any emoji above to place it here, then DRAG it anywhere!
                </p>
                <p className="text-white/60 text-[11px] font-semibold mt-1">
                  Use "Color Fill" to change the sky & world theme
                </p>
              </div>
            )}

            {/* Draggable Emojis with Pointer Events */}
            {stickersPlaced.map((st) => {
              const isSelected = selectedStickerId === st.id
              const isDragging = draggingStickerId === st.id

              return (
                <div
                  key={st.id}
                  onPointerDown={(e) => handleStartStickerDrag(e, st.id, st.x, st.y)}
                  onPointerMove={handleStickerPointerMove}
                  onPointerUp={handleStickerPointerUp}
                  style={{
                    left: `${st.x}%`,
                    top: `${st.y}%`,
                    fontSize: `${st.size || 40}px`,
                    transform: `translate(-50%, -50%) rotate(${st.rotation || 0}deg) ${
                      isDragging ? 'scale(1.25)' : isSelected ? 'scale(1.1)' : 'scale(1)'
                    }`
                  }}
                  className={`absolute touch-none select-none cursor-grab active:cursor-grabbing transition-transform duration-75 flex items-center justify-center rounded-2xl ${
                    isSelected ? 'ring-4 ring-amber-400 bg-white/20 backdrop-blur-xs p-1 shadow-2xl z-30' : 'z-20 hover:scale-110'
                  }`}
                  title="Drag me anywhere!"
                >
                  <span className="leading-none drop-shadow-lg pointer-events-none select-none">
                    {st.emoji}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => {
                setStickersPlaced([])
                setSelectedStickerId(null)
                gameAudio.playTap()
              }}
              className="text-xs text-slate-500 font-bold flex items-center gap-1 hover:text-slate-800 cursor-pointer"
            >
              <RefreshCw size={13} /> Clear Canvas
            </button>
            <Button
              onClick={() => setActiveMiniGame('quiz')}
              className="bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl shadow-md text-xs px-5 min-h-[42px]"
            >
              Next: Star Quiz Arcade →
            </Button>
          </div>
        </div>
      )}

      {/* GAME 5: STAR QUIZ ARCADE */}
      {activeMiniGame === 'quiz' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-300 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-500" /> Game 5: Star Quiz Arcade
            </span>
            <span className="text-xs font-bold text-slate-500">
              Question {quizIdx + 1} of {arcadeQuestions.length}
            </span>
          </div>

          {!quizFinished ? (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {arcadeQuestions[quizIdx].q}
              </h3>

              <div className="space-y-2.5">
                {arcadeQuestions[quizIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(opt.correct)}
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-gradient-to-r from-white to-amber-50/40 text-left font-black text-xs sm:text-sm text-slate-900 transition-all transform active:scale-98 shadow-xs cursor-pointer"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 bg-amber-400 text-white rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-lg animate-bounce">
                👑
              </div>
              <h3 className="text-2xl font-black text-amber-950">
                🎉 Level Mastered!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-sm mx-auto">
                You earned all stars and helped RoboBuddy learn today! +25 Bonus XP awarded!
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => {
                    setQuizIdx(0)
                    setQuizFinished(false)
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-2xl font-bold cursor-pointer"
                >
                  Play Again 🔄
                </Button>
                {onComplete && (
                  <Button
                    onClick={onComplete}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg cursor-pointer"
                  >
                    Complete Lesson & Next →
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 4. DUOLINGO-STYLE MINI MILESTONE TRACK ── */}
      <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Gift size={20} className="text-amber-500 animate-pulse" />
          <div>
            <p className="text-xs font-black text-slate-800">Class 3 Explorer Trophy</p>
            <p className="text-[10px] text-slate-500 font-semibold">Play all 5 mini-games to claim badge</p>
          </div>
        </div>
        <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
          ⭐ {stars}/10 Stars
        </span>
      </div>
    </div>
  )
}
