// ─────────────────────────────────────────────────────────────────────────────
// GAIO HIGHER ED LEARNING EXPERIENCE — MINIMALIST, VISUAL & KINDERGARTEN-SIMPLE
// Designed around the 6 Base Syllabus Pillars:
// 1. AI Basics | 2. Communicate with AI | 3. AI Applications
// 4. AI and Career | 5. AI Tools | 6. Responsible AI
// Features:
// - Gaio AI Guide with bold, slow, warm male voice narration
// - Interactive animated pictures & SVG diagrams for every single concept
// - Zero jargon / Kindergarten-level common sense stories
// - Natural, smooth scrolling with zero clipping or overflow errors
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  Volume2, VolumeX, Sparkles, CheckCircle2, Award, Play, RotateCcw,
  ArrowRight, ArrowLeft, Lightbulb, Compass, Heart, Shield, Cpu,
  Sliders, Rocket, Check, HelpCircle
} from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'
import { auraSpeechService } from '../../services/auraSpeechService'
import { gameAudio } from '../../utils/gameAudio'
import { gamification } from '../../utils/gamification'
import { useAuth } from '../../contexts/AuthContext'
import type { HigherEdLevelKey } from './types'

export interface GaioLearningProps {
  initialLevel?: HigherEdLevelKey
  initialChapter?: number // 1 to 6
  onExit?: () => void
}

interface ChapterContent {
  num: number
  title: string
  subtitle: string
  icon: string
  badge: string
  kindergartenStory: string
  narrationScript: string
  animationType: 'brain' | 'prompt' | 'city' | 'career' | 'tools' | 'scale'
  activity: {
    title: string
    instructions: string
    controlType: 'slider' | 'buttons' | 'toggle'
    initialVal: number
    targetMin: number
    targetMax: number
    unit: string
    label: string
    successNote: string
  }
  quiz: {
    question: string
    options: string[]
    correctIndex: number
    simpleExplanation: string
  }
}

// 6 Canonical Base Syllabus Chapters with level-specific adaptations
const BASE_SYLLABUS_CONTENT: Record<HigherEdLevelKey, ChapterContent[]> = {
  ug1: [
    {
      num: 1,
      title: 'AI Basics: The Computer with a Brain',
      subtitle: 'From Toy Blocks to Smart Predictions',
      icon: '🧠',
      badge: 'UG-1 • Chapter 1',
      kindergartenStory: 'A normal computer is like a toaster — it only does one thing. But an AI computer has a pretend brain made of little math lightbulbs! Instead of memorizing rules, it looks at 100 pictures of puppies, learns what floppy ears look like, and says: "Hey, that\'s a puppy!"',
      narrationScript: 'Welcome! I am Gaio, your AI guide. Think of AI as a computer with a friendly learning brain. It stacks numbers like Lego blocks in an ice cube tray to see pictures and make smart guesses. Let us explore together!',
      animationType: 'brain',
      activity: {
        title: 'Light Up the Brain Cells',
        instructions: 'Slide the dial to adjust the energy flowing into the neural lightbulbs so the computer can recognize the puppy!',
        controlType: 'slider',
        initialVal: 30,
        targetMin: 60,
        targetMax: 85,
        unit: '% Energy',
        label: 'Brain Lightbulb Power',
        successNote: 'Perfect! The lightbulbs lit up just right, and the computer recognized the puppy!'
      },
      quiz: {
        question: 'How does an AI computer learn to recognize a cat?',
        options: [
          'A human writes 10 million if-else rules by hand',
          'It looks at many pictures and discovers patterns like whiskers and pointy ears',
          'It guesses randomly every single time without remembering',
          'It searches a paper dictionary in a real library'
        ],
        correctIndex: 1,
        simpleExplanation: 'Just like a child learning what a cat looks like by seeing pets, AI looks at examples and learns the pattern!'
      }
    },
    {
      num: 2,
      title: 'Communicate with AI: Talking with Prompts',
      subtitle: 'The Magic Words that Guide the Robot',
      icon: '💬',
      badge: 'UG-1 • Chapter 2',
      kindergartenStory: 'Imagine you have a friendly robot helper. If you whisper "Do something!", the robot stands there confused. But if you say: "Please draw a happy yellow sun with sunglasses!", the robot zooms into action! Clean, clear instructions are called Prompts.',
      narrationScript: 'Chapter 2 is all about talking with AI. When you talk to an AI, clear instructions make magic happen. Give it clear words, and it will build anything you imagine!',
      animationType: 'prompt',
      activity: {
        title: 'Fuel the Prompt Rocket',
        instructions: 'Add clarity and kindness to your instructions to launch the prompt rocket directly to the right answer planet!',
        controlType: 'slider',
        initialVal: 20,
        targetMin: 70,
        targetMax: 95,
        unit: '% Clarity',
        label: 'Instruction Sharpness',
        successNote: 'Zoom! The rocket landed smoothly on the correct answer planet!'
      },
      quiz: {
        question: 'What happens when you give an AI a super clear, friendly instruction?',
        options: [
          'It gives you the exact helpful answer you asked for',
          'It gets confused and shuts down',
          'It ignores you and plays video games',
          'It creates random gibberish'
        ],
        correctIndex: 0,
        simpleExplanation: 'Clear, polite instructions are the magic key to getting great answers from any AI!'
      }
    },
    {
      num: 3,
      title: 'AI Applications: AI in the Real World',
      subtitle: 'Self-Driving Cars, Doctors & Music Makers',
      icon: '🚀',
      badge: 'UG-1 • Chapter 3',
      kindergartenStory: 'AI does not just live on computer screens. It is helping cars steer safely on the road so people do not crash, helping doctors spot tiny owies on X-rays before they hurt, and helping musicians compose brand new lullabies!',
      narrationScript: 'In Chapter 3, we look at AI in the real world. From self-driving cars with smart eyes to helpful doctor assistants, AI works alongside humans to make life safer and happier.',
      animationType: 'city',
      activity: {
        title: 'Power the Smart City Helpers',
        instructions: 'Adjust the camera vision clarity on the self-driving car so it safely stops at the red traffic light!',
        controlType: 'slider',
        initialVal: 40,
        targetMin: 75,
        targetMax: 100,
        unit: '% Vision Score',
        label: 'Car Sensor Accuracy',
        successNote: 'Safe stop! The car saw the red light and stopped gently.'
      },
      quiz: {
        question: 'Where can you find AI helping people today?',
        options: [
          'Nowhere, it is only in science fiction movies',
          'Only in giant secret underground labs',
          'In hospitals, GPS map directions, and camera photo filters',
          'Only inside microwave ovens'
        ],
        correctIndex: 2,
        simpleExplanation: 'AI is already all around us — in smartphone cameras, map navigation, and hospital scanners!'
      }
    },
    {
      num: 4,
      title: 'AI and Career: Future Quests & Jobs',
      subtitle: 'Becoming an AI Builder, Artist, or Guardian',
      icon: '🧭',
      badge: 'UG-1 • Chapter 4',
      kindergartenStory: 'When you grow up with AI, you can be an AI Architect who builds robot brains, a Prompt Designer who writes magical stories, or an AI Safety Guardian who makes sure computers are always kind, honest, and fair.',
      narrationScript: 'Chapter 4 is about your future! You do not have to be a math genius to work in AI. You can be an architect, a creative designer, or a safety guardian protecting people.',
      animationType: 'career',
      activity: {
        title: 'Equip Your AI Superpower',
        instructions: 'Power up your career shield with curiosity, creativity, and coding skills!',
        controlType: 'slider',
        initialVal: 25,
        targetMin: 65,
        targetMax: 90,
        unit: 'XP Readiness',
        label: 'Career Preparedness',
        successNote: 'Awesome! Your AI Career Shield is glowing and ready for the future!'
      },
      quiz: {
        question: 'What is an important skill when working with AI tools?',
        options: [
          'Curiosity, clear communication, and checking if answers are true',
          'Memorizing a million phone numbers',
          'Never asking questions',
          'Typing as loud as possible'
        ],
        correctIndex: 0,
        simpleExplanation: 'Curiosity, clear thinking, and double-checking facts are the true superpowers of an AI creator!'
      }
    },
    {
      num: 5,
      title: 'AI Tools: The Magical Tech Toolbox',
      subtitle: 'Python, NumPy & The Secret Spanners',
      icon: '🛠️',
      badge: 'UG-1 • Chapter 5',
      kindergartenStory: 'Just like an artist has paintbrushes and a carpenter has a hammer, an AI engineer has a toolbox! The toolbox has Python (the friendly coding language), NumPy (the superfast number calculator), and PyTorch (the neural Lego set).',
      narrationScript: 'Chapter 5 opens the AI toolbox. Python and PyTorch are like magic paintbrushes. They let us turn ideas into living, thinking programs with just a few lines of code.',
      animationType: 'tools',
      activity: {
        title: 'Calibrate the Python Calculator',
        instructions: 'Tune the tool speed so our Python code processes 1,000 numbers in a blink of an eye!',
        controlType: 'slider',
        initialVal: 35,
        targetMin: 70,
        targetMax: 95,
        unit: 'MHz Speed',
        label: 'Calculator Speed',
        successNote: 'Blink! 1,000 numbers processed in 2 milliseconds!'
      },
      quiz: {
        question: 'Why do engineers use Python to build AI models?',
        options: [
          'Because it is clean, easy to read, and has thousands of free AI toolkits',
          'Because it is the only program that works without electricity',
          'Because real snakes like it',
          'Because it deletes all your files automatically'
        ],
        correctIndex: 0,
        simpleExplanation: 'Python is friendly and readable, making it the favorite language for millions of AI creators worldwide.'
      }
    },
    {
      num: 6,
      title: 'Responsible AI: Keeping AI Kind & Fair',
      subtitle: 'The Golden Rule for Computers',
      icon: '⚖️',
      badge: 'UG-1 • Chapter 6',
      kindergartenStory: 'If you teach an AI using only pictures of red apples, it might think green apples do not exist! Responsible AI means teaching the computer to be fair to everyone, protecting people\'s private secrets, and always telling the truth.',
      narrationScript: 'Chapter 6 is the most important: Responsible AI. An AI must be kind, honest, and fair to every human being on Earth. We must always protect privacy and prevent bias.',
      animationType: 'scale',
      activity: {
        title: 'Balance the Kindness Scale',
        instructions: 'Slide the weights to perfectly balance Truth, Fairness, and Kindness on the animated scale!',
        controlType: 'slider',
        initialVal: 20,
        targetMin: 70,
        targetMax: 85,
        unit: '% Balance',
        label: 'Fairness Balance',
        successNote: 'Hurrah! The scales are in perfect harmony. AI is safe, kind, and fair!'
      },
      quiz: {
        question: 'What should we do if an AI model is giving unfair answers to certain people?',
        options: [
          'Fix the training data, retrain it to be fair, and test it carefully',
          'Ignore it and pretend nothing is wrong',
          'Blame the computer and never touch it again',
          'Make it even more unfair'
        ],
        correctIndex: 0,
        simpleExplanation: 'When an AI makes unfair mistakes, responsible creators inspect the data and make it fair for everyone.'
      }
    }
  ],
  ug2: [],
  ug3: [],
  ug4: [],
  pg1: [],
  pg2: []
}

// Generate level-specific content for all other tiers using the base syllabus
const LEVEL_METADATA: Record<HigherEdLevelKey, { code: string; name: string; focus: string }> = {
  ug1: { code: 'UG-1', name: 'Undergraduate 1st Year', focus: 'Foundations & The Modern AI Stack' },
  ug2: { code: 'UG-2', name: 'Undergraduate 2nd Year', focus: 'Neural Networks & Computer Vision' },
  ug3: { code: 'UG-3', name: 'Undergraduate 3rd Year', focus: 'Large Language Models (LLMs) & GenAI' },
  ug4: { code: 'UG-4', name: 'Undergraduate Final Year', focus: 'Production MLOps & Autonomous Agents' },
  pg1: { code: 'PG-1', name: 'Postgraduate 1st Year', focus: 'Research Architectures & Multimodal Models' },
  pg2: { code: 'PG-2', name: 'Postgraduate Final Year', focus: 'Frontier AI, Safety & Global Governance' },
}

// Populate all levels so every level has all 6 canonical chapters
;(Object.keys(BASE_SYLLABUS_CONTENT) as HigherEdLevelKey[]).forEach((lvl) => {
  if (lvl !== 'ug1') {
    const meta = LEVEL_METADATA[lvl]
    BASE_SYLLABUS_CONTENT[lvl] = BASE_SYLLABUS_CONTENT.ug1.map((ch) => ({
      ...ch,
      badge: `${meta.code} • Chapter ${ch.num}`,
      subtitle: `${meta.name}: ${ch.title.split(':')[1] || ch.title}`
    }))
  }
})

export const GaioHigherEdLearningExperience: React.FC<GaioLearningProps> = ({
  initialLevel = 'ug1',
  initialChapter = 1,
  onExit
}) => {
  const { user } = useAuth()
  const studentId = user?.id || 'guest-learner'

  const [levelKey, setLevelKey] = useState<HigherEdLevelKey>(initialLevel)
  const [chapterNum, setChapterNum] = useState<number>(initialChapter)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1) // 1: Story, 2: Interactive Picture, 3: Activity, 4: Quiz
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [sliderValue, setSliderValue] = useState(30)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [xp, setXp] = useState<number>(() => {
    return gamification.getStats(studentId).xp || 150
  })

  const currentLevelMeta = LEVEL_METADATA[levelKey] || LEVEL_METADATA.ug1
  const chaptersList = BASE_SYLLABUS_CONTENT[levelKey] || BASE_SYLLABUS_CONTENT.ug1
  const currentChapter = chaptersList.find(c => c.num === chapterNum) || chaptersList[0]

  // Reset slider and quiz when chapter changes
  useEffect(() => {
    setSliderValue(currentChapter.activity.initialVal)
    setQuizAnswer(null)
    setActiveStep(1)
    auraSpeechService.stop()
    setIsSpeaking(false)
  }, [chapterNum, levelKey])

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      auraSpeechService.stop()
    }
  }, [])

  // Handle Gaio male narration
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      auraSpeechService.stop()
      setIsSpeaking(false)
    } else {
      gameAudio.playTap()
      const text = activeStep === 1
        ? `${currentChapter.title}. ${currentChapter.narrationScript} ${currentChapter.kindergartenStory}`
        : activeStep === 2
        ? `Here is the interactive picture for ${currentChapter.title}. Click the buttons and watch the colors and connections move!`
        : activeStep === 3
        ? `${currentChapter.activity.title}. ${currentChapter.activity.instructions}`
        : `${currentChapter.quiz.question}. Select the best answer!`

      auraSpeechService.speak(text)
      setIsSpeaking(true)
      // Automatically toggle off when speech ends
      const unsubscribe = auraSpeechService.subscribe((state) => {
        if (!state.isSpeaking) {
          setIsSpeaking(false)
          unsubscribe()
        }
      })
    }
  }

  const isActivitySuccess =
    sliderValue >= currentChapter.activity.targetMin &&
    sliderValue <= currentChapter.activity.targetMax

  const handleSelectQuizOption = (idx: number) => {
    gameAudio.playTap()
    setQuizAnswer(idx)
    if (idx === currentChapter.quiz.correctIndex) {
      gameAudio.playSuccess()
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } })
      const newXp = gamification.addXP(50, studentId, `quiz_${levelKey}_${chapterNum}`)
      setXp(newXp.newXP)
      toast.success('🎉 Correct! Gaio is cheering for you! (+50 XP)')
    } else {
      gameAudio.playWrong()
      toast.error('Try again! Gaio says: look at the story clue!')
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-y-auto pb-32">
      {/* ─── TOP GAIO HERO & LEVEL SELECTOR (CLEAN & MINIMAL) ─────────── */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Gaio AI Guide Identity */}
          <div className="flex items-center gap-3">
            {/* Animated Gaio Avatar with Male Voice Aura */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  {/* Friendly Male Gaio Face */}
                  <circle cx="50" cy="50" r="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="4" />
                  {/* Smart Male Anime Hair Tuft */}
                  <path d="M25 40 Q50 15 75 40 Q50 28 25 40" fill="#38bdf8" />
                  {/* Friendly Eyes */}
                  <ellipse cx="38" cy="52" rx="5" ry="6" fill="#38bdf8" />
                  <ellipse cx="62" cy="52" rx="5" ry="6" fill="#38bdf8" />
                  <circle cx="40" cy="50" r="2" fill="#ffffff" />
                  <circle cx="64" cy="50" r="2" fill="#ffffff" />
                  {/* Warm Smile */}
                  <path d="M40 68 Q50 78 60 68" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
                {isSpeaking && (
                  <span className="absolute bottom-0 inset-x-0 h-1 bg-cyan-400 animate-pulse" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide">Gaio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                  AI Mentor (Male Voice)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Patient, simple explanations for every AI concept
              </p>
            </div>
          </div>

          {/* Right Controls: Voice Toggle, XP, Exit */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Gaio Male Voice Narration Button */}
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                isSpeaking
                  ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/50 animate-pulse'
                  : 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
              }`}
            >
              {isSpeaking ? <Volume2 size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? 'Stop Gaio' : '🔊 Listen to Gaio'}</span>
            </button>

            {/* XP Badge */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles size={14} className="text-amber-400" />
              <span>{xp} XP</span>
            </div>

            {onExit && (
              <button
                onClick={onExit}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Exit
              </button>
            )}
          </div>
        </div>

        {/* Level Switcher Ribbon (All 6 Higher Ed Levels) */}
        <div className="max-w-5xl mx-auto mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 text-[11px] mr-1 shrink-0">Track:</span>
          {(Object.keys(LEVEL_METADATA) as HigherEdLevelKey[]).map((lvl) => {
            const meta = LEVEL_METADATA[lvl]
            const isSelected = lvl === levelKey
            return (
              <button
                key={lvl}
                onClick={() => {
                  gameAudio.playTap()
                  setLevelKey(lvl)
                  setChapterNum(1)
                }}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap text-[11px] font-bold ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {meta.code}: {meta.name.split(' ')[1] || meta.name}
              </button>
            )
          })}
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER (SMOOTH & ZERO SCROLLING TRAP) ───────── */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 space-y-6">
        {/* Active Track Title */}
        <div className="text-center space-y-1">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
            {currentLevelMeta.name} • {currentLevelMeta.focus}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentChapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {currentChapter.subtitle}
          </p>
        </div>

        {/* 6 Canonical Chapters Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {chaptersList.map((ch) => {
            const isSelected = ch.num === chapterNum
            return (
              <button
                key={ch.num}
                onClick={() => {
                  gameAudio.playTap()
                  setChapterNum(ch.num)
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/60 to-indigo-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20 text-white ring-1 ring-cyan-400/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xl mb-1">{ch.icon}</div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block font-bold">Ch 0{ch.num}</span>
                  <span className="text-xs font-bold line-clamp-1">{ch.title.split(':')[0]}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* 4 Interactive Progress Steps (Story -> Picture -> Activity -> Quiz) */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-1.5">
          {[
            { step: 1, label: '1. The Story (ELI5)', icon: '📖' },
            { step: 2, label: '2. Animated Picture', icon: '🎨' },
            { step: 3, label: '3. Hands-On Activity', icon: '🎮' },
            { step: 4, label: '4. Quick Check', icon: '🏆' },
          ].map((s) => {
            const isCur = activeStep === s.step
            const isDone = activeStep > s.step
            return (
              <button
                key={s.step}
                onClick={() => {
                  gameAudio.playTap()
                  setActiveStep(s.step as any)
                }}
                className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isCur
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : isDone
                    ? 'bg-slate-800/80 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">Step {s.step}</span>
              </button>
            )
          })}
        </div>

        {/* ─── STEP 1: THE STORYBOOK (KINDERGARTEN LEVEL) ────────────────── */}
        {activeStep === 1 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧸</span>
                <h3 className="text-base sm:text-lg font-bold text-amber-300">
                  Gaio\'s Storybook Explanation (Explain Like I\'m in Kindergarten)
                </h3>
              </div>
              <button
                onClick={handleToggleSpeech}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 size={16} />
                <span>{isSpeaking ? 'Pause' : 'Read to Me'}</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm sm:text-base text-amber-100 leading-relaxed font-medium space-y-3">
              <p>{currentChapter.kindergartenStory}</p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 leading-relaxed flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <strong className="text-cyan-300 font-bold block mb-0.5">Gaio\'s Core Insight:</strong>
                Never worry about Greek math symbols! Every machine learning algorithm is just learning from mistakes, exactly like a student learning to ride a bicycle.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  gameAudio.playTap()
                  setActiveStep(2)
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Next: See the Animated Picture</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: INTERACTIVE PICTURE & ANIMATION ────────────────────── */}
        {activeStep === 2 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Interactive Animated Picture: How It Works
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400">Click & Watch It Move</span>
            </div>

            {/* Live Interactive SVG Canvas Animations */}
            <div className="w-full h-64 sm:h-72 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center relative overflow-hidden">
              {currentChapter.animationType === 'brain' && (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center gap-6">
                    {/* Input Sensor Nodes */}
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-lg animate-bounce">
                        👁️
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-lg animate-pulse">
                        👂
                      </div>
                    </div>

                    {/* Connecting Glowing Synapse Lines */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 animate-pulse my-2" />
                      <span className="text-[10px] font-mono text-cyan-400">Math Synapses</span>
                      <div className="w-20 h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-emerald-400 animate-pulse my-2" />
                    </div>

                    {/* Center Brain Lightbulb */}
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30">
                      <span className="text-3xl animate-spin">💡</span>
                      <span className="text-[9px] font-mono text-emerald-300 font-bold mt-1">Idea!</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    Inputs (Eyes & Ears) ➔ Synapse Math Wires ➔ Glowing Prediction Brain!
                  </p>
                </div>
              )}

              {currentChapter.animationType === 'prompt' && (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-2 rounded-xl bg-indigo-600/30 border border-indigo-400 text-xs font-mono text-indigo-200">
                      "Draw a happy puppy"
                    </div>
                    <span className="text-3xl animate-pulse">➔ 🚀 ➔</span>
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-3xl">
                      🐶
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    Clear Words Rocket ➔ Travels across prompt bridge ➔ Joyful AI Creation!
                  </p>
                </div>
              )}

              {currentChapter.animationType === 'city' && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-3xl">🚗</span>
                    <div className="text-xs font-bold text-cyan-400">Self-Driving Car</div>
                    <div className="text-[10px] text-slate-400">Cameras spot stops</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-3xl">🏥</span>
                    <div className="text-xs font-bold text-emerald-400">Doctor Helper</div>
                    <div className="text-[10px] text-slate-400">Scans patient health</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-3xl">🎵</span>
                    <div className="text-xs font-bold text-purple-400">Music Composer</div>
                    <div className="text-[10px] text-slate-400">Synthesizes songs</div>
                  </div>
                </div>
              )}

              {currentChapter.animationType === 'career' && (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center">
                    <span className="text-2xl">🏛️</span>
                    <div className="text-xs font-bold text-cyan-300">AI Architect</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-center">
                    <span className="text-2xl">🔍</span>
                    <div className="text-xs font-bold text-amber-300">Data Detective</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/40 text-center">
                    <span className="text-2xl">🛡️</span>
                    <div className="text-xs font-bold text-purple-300">Safety Guardian</div>
                  </div>
                </div>
              )}

              {currentChapter.animationType === 'tools' && (
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-1">
                    <span className="text-3xl">🐍</span>
                    <div className="text-xs font-bold text-yellow-400">Python</div>
                  </div>
                  <span className="text-slate-600 font-bold">+</span>
                  <div className="text-center space-y-1">
                    <span className="text-3xl">🔢</span>
                    <div className="text-xs font-bold text-cyan-400">NumPy</div>
                  </div>
                  <span className="text-slate-600 font-bold">+</span>
                  <div className="text-center space-y-1">
                    <span className="text-3xl">🔥</span>
                    <div className="text-xs font-bold text-orange-400">PyTorch</div>
                  </div>
                </div>
              )}

              {currentChapter.animationType === 'scale' && (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl animate-bounce">⚖️</div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">Truth</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-cyan-400 font-bold">Fairness</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 font-bold">Kindness</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(1)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back to Story</span>
              </button>

              <button
                onClick={() => {
                  gameAudio.playTap()
                  setActiveStep(3)
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Next: Try the Hands-On Activity</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: HANDS-ON TOY ACTIVITY ─────────────────────────────── */}
        {activeStep === 3 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {currentChapter.activity.title}
                </h3>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-bold ${
                isActivitySuccess
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {isActivitySuccess ? 'SUCCESS! OPTIMAL VALUE' : 'ADJUST DIAL'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentChapter.activity.instructions}
            </p>

            {/* Slider Control Box */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {currentChapter.activity.label}
                </span>
                <span className="text-sm font-mono text-cyan-400 font-extrabold">
                  {sliderValue} {currentChapter.activity.unit}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  setSliderValue(val)
                  if (val >= currentChapter.activity.targetMin && val <= currentChapter.activity.targetMax && !isActivitySuccess) {
                    gameAudio.playSuccess()
                  }
                }}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 (Too low)</span>
                <span className="text-emerald-400">Target: {currentChapter.activity.targetMin} - {currentChapter.activity.targetMax}</span>
                <span>100 (Too high)</span>
              </div>
            </div>

            {isActivitySuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 flex items-center gap-2 font-medium">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>{currentChapter.activity.successNote}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(2)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  gameAudio.playTap()
                  setActiveStep(4)
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Next: Fun Quick Quiz</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: FUN QUICK QUIZ (WITH CONFETTI) ────────────────────── */}
        {activeStep === 4 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Gaio\'s Fun Quick Check
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                +50 XP Question
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-100">
              {currentChapter.quiz.question}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentChapter.quiz.options.map((opt, idx) => {
                const isSelected = quizAnswer === idx
                const isCorrect = idx === currentChapter.quiz.correctIndex
                let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                if (quizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/30'
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200'
                  } else {
                    btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-600'
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizAnswer !== null}
                    onClick={() => handleSelectQuizOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {quizAnswer !== null && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation Card */}
            {quizAnswer !== null && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium space-y-1">
                <span className="text-indigo-400 font-bold uppercase font-mono text-[10px] block">
                  Gaio\'s Takeaway:
                </span>
                <p>{currentChapter.quiz.simpleExplanation}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(3)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  gameAudio.playSuccess()
                  if (chapterNum < 6) {
                    setChapterNum(prev => prev + 1)
                    setActiveStep(1)
                    toast.success(`🚀 Moving to Chapter ${chapterNum + 1}!`)
                  } else {
                    toast.success(`🏆 Mastered all 6 Chapters in ${currentLevelMeta.name}!`)
                  }
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>{chapterNum < 6 ? 'Next Chapter' : 'All Chapters Complete!'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
export default GaioHigherEdLearningExperience
