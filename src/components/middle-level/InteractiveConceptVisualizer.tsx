// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE CONCEPT VISUALIZER (PICTURES, ANIMATIONS & KINDERGARTEN CLARITY)
// Transforms abstract AI theory into playful, visual, interactive demonstrations!
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles,
  Bot,
  Car,
  ShieldCheck,
  Compass,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Play,
  Heart,
  Eye,
  Lock,
  Globe
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'

export interface InteractiveConceptVisualizerProps {
  chapterNumber: number
  lessonNumber: number
  chapterTitle: string
}

export const InteractiveConceptVisualizer: React.FC<InteractiveConceptVisualizerProps> = ({
  chapterNumber,
  lessonNumber,
  chapterTitle
}) => {
  // ── Simulator 1: Feed the Robot Scanner (AI Basics - Ch 1) ──
  const [scannedItem, setScannedItem] = useState<{ name: string; emoji: string; color: string; shape: string; guess: string } | null>(null)
  const [robotHappiness, setRobotHappiness] = useState(10)
  const [isScanning, setIsScanning] = useState(false)

  const handleScanItem = (item: { name: string; emoji: string; color: string; shape: string; guess: string }) => {
    gameAudio.playTap()
    setIsScanning(true)
    setScannedItem(null)

    setTimeout(() => {
      setIsScanning(false)
      gameAudio.playSuccess()
      setScannedItem(item)
      setRobotHappiness((prev) => Math.min(100, prev + 20))
    }, 500)
  }

  // ── Simulator 2: Step-by-Step Toy Bot Maze (Communicate with AI - Ch 2) ──
  const [botSteps, setBotSteps] = useState<string[]>([])
  const [botPosition, setBotPosition] = useState(0) // 0 to 4
  const [botFinished, setBotFinished] = useState(false)

  const handleAddStep = (step: string) => {
    if (botSteps.length < 4 && !botFinished) {
      gameAudio.playTap()
      setBotSteps((prev) => [...prev, step])
    }
  }

  const handleRunBot = () => {
    if (botSteps.length === 0) return
    gameAudio.playTap()
    setBotPosition(0)
    setBotFinished(false)

    botSteps.forEach((_, idx) => {
      setTimeout(() => {
        gameAudio.playTap()
        setBotPosition(idx + 1)
        if (idx === botSteps.length - 1) {
          gameAudio.playSuccess()
          setBotFinished(true)
        }
      }, (idx + 1) * 450)
    })
  }

  const handleResetBot = () => {
    gameAudio.playTap()
    setBotSteps([])
    setBotPosition(0)
    setBotFinished(false)
  }

  // ── Simulator 3: Self-Driving Car Vision (AI Applications - Ch 3) ──
  const [carScenario, setCarScenario] = useState<'clear' | 'cat' | 'rain' | 'red_light'>('clear')

  const handleSelectCarScenario = (scen: 'clear' | 'cat' | 'rain' | 'red_light') => {
    if (scen === 'cat' || scen === 'red_light') {
      gameAudio.playSuccess()
    } else {
      gameAudio.playTap()
    }
    setCarScenario(scen)
  }

  // ── Simulator 4: Career Explorer Compass (AI & Career - Ch 4) ──
  const [selectedCareer, setSelectedCareer] = useState<number>(0)
  const careers = [
    { title: 'Robot Doctor 🩺', desc: 'Helps human doctors find tiny invisible splinters and heal sick kids!', perk: 'Superpower: Empathy & Care' },
    { title: 'AI Farm Pilot 🚜', desc: 'Flies friendly crop drones to give thirsty vegetables fresh water!', perk: 'Superpower: Nature & Green Planet' },
    { title: 'Magic Prompt Artist 🎨', desc: 'Creates entire cartoon movies and storybooks from ideas!', perk: 'Superpower: Imagination & Words' },
    { title: 'Cyber Shield Guardian 🛡️', desc: 'Protects families from sneaky digital traps and protects private data!', perk: 'Superpower: Justice & Kindness' }
  ]

  // ── Simulator 5: Magic Prompt Painter (AI Tools - Ch 5) ──
  const [promptAnimal, setPromptAnimal] = useState('Fluffy Kitten 🐱')
  const [promptCostume, setPromptCostume] = useState('Astronaut Helmet 🚀')
  const [promptPlace, setPromptPlace] = useState('on the Moon 🌕')
  const [hasPainted, setHasPainted] = useState(false)

  const handlePaint = () => {
    gameAudio.playSuccess()
    setHasPainted(true)
  }

  // ── Simulator 6: Secret Treasure Chest (Responsible AI - Ch 6) ──
  const [chestItems, setChestItems] = useState([
    { id: 'addr', label: '🏠 Real Home Address', isSecret: true, status: 'unlocked' },
    { id: 'pass', label: '🔑 Secret Password', isSecret: true, status: 'unlocked' },
    { id: 'ice', label: '🍦 Favorite Ice Cream', isSecret: false, status: 'unlocked' },
    { id: 'game', label: '🎮 Video Game Score', isSecret: false, status: 'unlocked' }
  ])

  const handleToggleChestItem = (id: string) => {
    setChestItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          gameAudio.playTap()
          return { ...item, status: item.status === 'unlocked' ? 'locked' : 'unlocked' }
        }
        return item
      })
    )
  }

  // Determine which visualizer to render based on Chapter Number (1 through 6)
  const activeChapter = ((chapterNumber - 1) % 6) + 1

  return (
    <div className="w-full bg-slate-900/90 border-2 border-indigo-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl select-none mb-4 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
            <Sparkles size={16} className="animate-spin" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Interactive Picture Studio 🎨
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold">
                Touch & See!
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white leading-tight">
              {activeChapter === 1 && 'Look How a Robot Learns from Pictures!'}
              {activeChapter === 2 && 'Step-by-Step: Teach the Robot to Walk!'}
              {activeChapter === 3 && 'Self-Driving Car: See Through Eyes & Radar!'}
              {activeChapter === 4 && 'Spin the Wheel: What AI Hero Do You Want to Be?'}
              {activeChapter === 5 && 'Magic Prompt Studio: Mix & Paint Your Story!'}
              {activeChapter === 6 && 'The Secret Treasure Safe: Keep Your Data Private!'}
            </h3>
          </div>
        </div>

        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
          Kindergarten-Simple Visualizer
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 1 VISUALIZER: FEED THE ROBOT SCANNER               */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 1 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            Tap a snack below to slide it into the robot's magic camera scanner. Watch how the robot checks the <strong>color</strong> and <strong>shape</strong> to guess what it is!
          </p>

          {/* Interactive Food Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { name: 'Red Apple', emoji: '🍎', color: 'RED', shape: 'ROUND & SMOOTH', guess: 'It is an Apple! Yum!' },
              { name: 'Choco Cookie', emoji: '🍪', color: 'BROWN with SPOTS', shape: 'FLAT CIRCLE', guess: 'It is a Cookie! Sweet!' },
              { name: 'Yellow Banana', emoji: '🍌', color: 'BRIGHT YELLOW', shape: 'LONG & CURVED', guess: 'It is a Banana! Healthy!' },
              { name: 'Pizza Slice', emoji: '🍕', color: 'YELLOW & RED', shape: 'TRIANGLE', guess: 'It is a Pizza! Delicious!' }
            ].map((snack) => (
              <button
                key={snack.name}
                onClick={() => handleScanItem(snack)}
                className="p-3 rounded-2xl bg-slate-950 border-2 border-slate-800 hover:border-amber-400/80 hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-md group"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform">{snack.emoji}</span>
                <span className="text-xs font-bold text-white mt-1">{snack.name}</span>
                <span className="text-[9px] text-amber-300 font-medium">Tap to Feed Robot</span>
              </button>
            ))}
          </div>

          {/* Animated Scanning Box */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xl relative overflow-hidden">
                <Bot size={36} className={isScanning ? 'animate-bounce' : ''} />
                {isScanning && (
                  <div className="absolute inset-0 bg-yellow-400/20 animate-pulse" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Robot Brain Camera:
                </span>
                <div className="text-sm font-bold text-white">
                  {isScanning ? (
                    <span className="text-yellow-300 animate-pulse flex items-center gap-1">
                      <Zap size={13} /> Scanning colors and shapes...
                    </span>
                  ) : scannedItem ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Heart size={14} className="fill-emerald-400" /> "{scannedItem.guess}"
                    </span>
                  ) : (
                    <span className="text-slate-400">Waiting for a snack...</span>
                  )}
                </div>
                {scannedItem && !isScanning && (
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Clues found: Color is <strong className="text-yellow-300">{scannedItem.color}</strong> and shape is <strong className="text-yellow-300">{scannedItem.shape}</strong>!
                  </div>
                )}
              </div>
            </div>

            {/* Smartness Meter */}
            <div className="w-full sm:w-44 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[10px] font-bold text-slate-300 mb-1">
                <span>Robot Smartness:</span>
                <span className="text-emerald-400">{robotHappiness}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${robotHappiness}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 2 VISUALIZER: STEP-BY-STEP MAZE (ALGORITHMS)       */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 2 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            An <strong>algorithm</strong> is just like giving friendly directions! Tap the arrow buttons to build a 3-step path for the robot to reach the Golden Star.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Left: Direction Buttons */}
            <div className="sm:col-span-5 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Step-by-step Command Blocks:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {['⬆️ Forward', '➡️ Turn Right', '⬆️ Forward', '⭐ Grab Star'].map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddStep(cmd)}
                    disabled={botSteps.length >= 4 || botFinished}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer disabled:opacity-40"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleRunBot}
                  disabled={botSteps.length === 0}
                  className="flex-1 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-40"
                >
                  <Play size={12} className="fill-white" /> Run Algorithm
                </button>
                <button
                  onClick={handleResetBot}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* Right: Visual Step Track */}
            <div className="sm:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-full min-h-[140px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Robot Walking Track:
              </span>

              {/* Track Tiles */}
              <div className="flex items-center justify-between gap-1.5">
                {[0, 1, 2, 3].map((tileIdx) => {
                  const hasBot = botPosition === tileIdx
                  const isGoal = tileIdx === 3
                  return (
                    <div
                      key={tileIdx}
                      className={`flex-1 h-16 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-all ${
                        hasBot
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 scale-105 shadow-lg'
                          : isGoal
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      {hasBot ? (
                        <div className="flex flex-col items-center">
                          <Bot size={22} className="text-sky-300 animate-bounce" />
                          <span className="text-[9px] font-mono">Step {tileIdx}</span>
                        </div>
                      ) : isGoal ? (
                        '⭐'
                      ) : (
                        tileIdx + 1
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Status Message */}
              <div className="mt-2 text-center text-xs font-bold">
                {botFinished ? (
                  <span className="text-emerald-400 flex items-center justify-center gap-1">
                    🎉 Hooray! Robot completed all steps and grabbed the star!
                  </span>
                ) : botSteps.length > 0 ? (
                  <span className="text-sky-300">
                    Program: {botSteps.join(' ➔ ')}
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Click steps on the left to build the algorithm!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 3 VISUALIZER: SELF-DRIVING CAR SENSORS (AI ON ROAD) */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 3 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            A self-driving car uses <strong>cameras</strong> (like human eyes) and <strong>radar</strong> (like bat ears) to see obstacles. Click an event to test the car's safety reflexes!
          </p>

          {/* Trigger Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'clear', label: '☀️ Clear Highway', desc: 'Cruising smoothly at safe speed' },
              { id: 'cat', label: '🐱 Cat on Road!', desc: 'Instant radar alert & gentle brake' },
              { id: 'rain', label: '🌧️ Heavy Rain', desc: 'Switch to radar sensor mode' },
              { id: 'red_light', label: '🚦 Red Light', desc: 'Brake safely before intersection' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleSelectCarScenario(btn.id as any)}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  carScenario === btn.id
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">{btn.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{btn.desc}</div>
              </button>
            ))}
          </div>

          {/* Animated Road Simulation */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[130px]">
            {/* Visual Road Line */}
            <div className="w-full h-1 border-t-2 border-dashed border-slate-700 absolute top-1/2 -translate-y-1/2" />

            {/* Car & Obstacle Display */}
            <div className="w-full flex items-center justify-between px-6 relative z-10">
              {/* Car */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Car size={26} />
                </div>
                {/* Radar Waves Animation */}
                <div className="flex items-center gap-1 text-sky-400">
                  <span className="w-1.5 h-6 bg-sky-400/80 rounded-full animate-ping" />
                  <span className="w-1.5 h-10 bg-sky-400/50 rounded-full animate-ping" />
                </div>
              </div>

              {/* Obstacle on Road */}
              <div className="text-3xl">
                {carScenario === 'cat' && <span className="animate-bounce inline-block">🐱</span>}
                {carScenario === 'red_light' && <span className="animate-pulse inline-block">🚦</span>}
                {carScenario === 'rain' && <span className="animate-pulse inline-block">🌧️</span>}
                {carScenario === 'clear' && <span className="text-sm font-bold text-emerald-400">🛣️ Open Road</span>}
              </div>
            </div>

            {/* Safety Feedback Badge */}
            <div className="mt-4 pt-2 border-t border-slate-900 w-full text-center">
              {carScenario === 'cat' && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold">
                  ✓ SENSORS SPOTTED THE CAT! Car stopped smoothly 10 feet away.
                </span>
              )}
              {carScenario === 'red_light' && (
                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 text-xs font-bold">
                  ✓ CAMERA SAW RED LIGHT! Car waiting patiently at the white line.
                </span>
              )}
              {carScenario === 'rain' && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold">
                  ✓ CAMERAS BLURRED BY RAIN: Radar switched on to see through droplets!
                </span>
              )}
              {carScenario === 'clear' && (
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400 text-sky-300 text-xs font-bold">
                  ✓ ALL CLEAR: Cruising safely along the highway lane markers.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 4 VISUALIZER: CAREER WHEEL (EXPLORE PATHWAYS)       */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 4 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            AI is creating exciting new jobs where humans work alongside smart robots! Click a career to see what superpower you get:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {careers.map((c, idx) => (
              <button
                key={idx}
                onClick={() => {
                  gameAudio.playTap()
                  setSelectedCareer(idx)
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedCareer === idx
                    ? 'bg-purple-950/70 border-purple-400 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-sm font-black text-white">{c.title}</div>
                <div className="text-[10px] text-amber-300 font-semibold mt-1">{c.perk}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Career Mission Brief:
            </span>
            <div className="text-base sm:text-lg font-black text-white">
              {careers[selectedCareer].title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              {careers[selectedCareer].desc}
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 5 VISUALIZER: MAGIC PROMPT PAINTER (GENAI)         */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 5 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            A <strong>prompt</strong> is like giving creative instructions to an artist! Mix a character, costume, and place below, then hit <strong>Paint!</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Animal Choice */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">1. Choose Hero:</span>
              <div className="space-y-1">
                {['Fluffy Kitten 🐱', 'Friendly Puppy 🐶', 'Giant Panda 🐼'].map((a) => (
                  <button
                    key={a}
                    onClick={() => { setPromptAnimal(a); setHasPainted(false) }}
                    className={`w-full text-left px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${promptAnimal === a ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Costume Choice */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">2. Choose Costume:</span>
              <div className="space-y-1">
                {['Astronaut Helmet 🚀', 'Royal Crown 👑', 'Superhero Cape 🦸'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setPromptCostume(c); setHasPainted(false) }}
                    className={`w-full text-left px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${promptCostume === c ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Place Choice */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">3. Choose Place:</span>
              <div className="space-y-1">
                {['on the Moon 🌕', 'under a Rainbow 🌈', 'inside a Castle 🏰'].map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPromptPlace(p); setHasPainted(false) }}
                    className={`w-full text-left px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${promptPlace === p ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Paint Button & Generated Result */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <button
              onClick={handlePaint}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={14} /> Paint My Story Picture!
            </button>

            {hasPainted ? (
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-950/60 to-indigo-950/60 border border-purple-400/50 animate-fade-in w-full max-w-md">
                <span className="text-3xl block mb-1">✨🎨🖼️</span>
                <span className="text-sm font-black text-yellow-300 block">
                  "A {promptAnimal} wearing a {promptCostume} {promptPlace}!"
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  You just wrote a real GenAI prompt! Clear details = beautiful pictures!
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500">
                Current prompt: "A {promptAnimal} wearing a {promptCostume} {promptPlace}."
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CHAPTER 6 VISUALIZER: SECRET TREASURE CHEST (DATA PRIVACY)  */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeChapter === 6 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 font-medium">
            Some data is private like your secret diary (keep it locked 🔒). Other things are fun to share (like your favorite color 🎈). Tap items to lock or unlock them!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {chestItems.map((item) => {
              const isLocked = item.status === 'locked'
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleChestItem(item.id)}
                  className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                    isLocked
                      ? 'bg-emerald-950/70 border-emerald-500 text-white'
                      : item.isSecret
                      ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                    {isLocked ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Lock size={13} /> LOCKED SAFE
                      </span>
                    ) : item.isSecret ? (
                      <span className="text-rose-400 flex items-center gap-1 animate-pulse">
                        <AlertTriangle size={13} /> TAP TO LOCK!
                      </span>
                    ) : (
                      <span className="text-sky-400 flex items-center gap-1">
                        <Globe size={13} /> SAFE TO SHARE
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 text-center text-xs text-slate-300">
            💡 <strong>Kindergarten Golden Rule:</strong> Never share your secret keys (real name, home address, passwords) with any strangers or chatbots online!
          </div>
        </div>
      )}
    </div>
  )
}
