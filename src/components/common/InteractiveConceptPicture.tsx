// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE CONCEPT PICTURE & ANIMATION STUDIO
// Rich, animated, interactive visual explainers for every core AI concept.
// Allows students of any age to touch, play, toggle, and visually grasp AI.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles, Play, RotateCcw, CheckCircle2, ChevronRight, HelpCircle,
  Eye, Cpu, Layers, Sun, CloudRain, Flame, ShieldAlert, Award, ArrowRight
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'
import confetti from 'canvas-confetti'

export type ConceptPictureType =
  | 'dikw_bakery'
  | 'pet_classifier'
  | 'robot_chef_prompt'
  | 'satellite_earth'
  | 'truth_detective'
  | 'neural_neurons'
  | 'career_suit'

export interface InteractiveConceptPictureProps {
  type?: ConceptPictureType
  conceptTitle?: string
  gradeNumber?: number
  className?: string
}

export const InteractiveConceptPicture: React.FC<InteractiveConceptPictureProps> = ({
  type = 'dikw_bakery',
  conceptTitle = 'From Data to Intelligence',
  gradeNumber = 9,
  className = '',
}) => {
  // Resolve type automatically if not explicitly given
  const resolvedType: ConceptPictureType = (() => {
    if (type) return type
    const lower = conceptTitle.toLowerCase()
    if (lower.includes('data') || lower.includes('predict') || lower.includes('intelligence')) return 'dikw_bakery'
    if (lower.includes('vision') || lower.includes('neural') || lower.includes('machine')) return 'pet_classifier'
    if (lower.includes('python') || lower.includes('prompt') || lower.includes('code') || lower.includes('communicate')) return 'robot_chef_prompt'
    if (lower.includes('planet') || lower.includes('application') || lower.includes('work') || lower.includes('hospital')) return 'satellite_earth'
    if (lower.includes('responsible') || lower.includes('truth') || lower.includes('fake') || lower.includes('footprint') || lower.includes('bias')) return 'truth_detective'
    return 'dikw_bakery'
  })()

  // ─────────────────────────────────────────────────────────────────────────
  // SCENARIO 1: DIKW MAGIC BAKERY CONVEYOR BELT (DATA → INTELLIGENCE)
  // ─────────────────────────────────────────────────────────────────────────
  const [dikwStep, setDikwStep] = useState<number>(0)
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'rainy'>('rainy')

  const dikwStages = [
    {
      label: '1. Raw Data',
      icon: '🥚',
      sub: 'Messy loose ingredients',
      desc: 'Numbers with no meaning yet: [22.4, 180, 0, 1]. Like loose flour and eggs on a table!',
      color: 'border-slate-700 bg-slate-900',
    },
    {
      label: '2. Information',
      icon: '📋',
      sub: 'Recipe with labels',
      desc: 'Organized with a date & name: "Oct 12: 180 hot meals served at 22°C". Now it has a label!',
      color: 'border-blue-700 bg-blue-950/40',
    },
    {
      label: '3. Knowledge',
      icon: '🧠',
      sub: 'Pattern discovered',
      desc: 'We notice a secret rule: "When it rains, students stay inside and eat 50% more hot soup!"',
      color: 'border-purple-700 bg-purple-950/40',
    },
    {
      label: '4. AI Intelligence',
      icon: '🤖',
      sub: 'Autonomous magic decision',
      desc: 'AI reads tomorrow’s weather radar and bakes EXACTLY 245 bowls so zero food is thrown away!',
      color: 'border-emerald-500 bg-emerald-950/40',
    },
  ]

  // ─────────────────────────────────────────────────────────────────────────
  // SCENARIO 2: PUPPY VS KITTY AI SCANNER
  // ─────────────────────────────────────────────────────────────────────────
  const [scannedPet, setScannedPet] = useState<'dog' | 'cat'>('dog')
  const [scannedFeatures, setScannedFeatures] = useState<{ ears: boolean; snout: boolean; tail: boolean }>({
    ears: true,
    snout: true,
    tail: false,
  })
  const [isScanning, setIsScanning] = useState<boolean>(false)

  const togglePetFeature = (feat: 'ears' | 'snout' | 'tail') => {
    try { gameAudio.playTap() } catch {}
    setScannedFeatures((prev) => ({ ...prev, [feat]: !prev[feat] }))
  }

  const triggerPetScan = () => {
    setIsScanning(true)
    try { gameAudio.playTap() } catch {}
    setTimeout(() => {
      setIsScanning(false)
      try { gameAudio.playSuccess() } catch {}
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } })
    }, 700)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SCENARIO 3: ROBOT CHEF PROMPT KITCHEN
  // ─────────────────────────────────────────────────────────────────────────
  const [promptQuality, setPromptQuality] = useState<'vague' | 'detailed'>('detailed')

  // ─────────────────────────────────────────────────────────────────────────
  // SCENARIO 4: TRUTH & DEEPFAKE DETECTIVE
  // ─────────────────────────────────────────────────────────────────────────
  const [detectiveTarget, setDetectiveTarget] = useState<'real' | 'ai'>('ai')

  return (
    <div className={`w-full rounded-3xl bg-slate-950 border border-cyan-500/30 p-4 sm:p-6 shadow-2xl overflow-hidden ${className}`}>
      {/* Top Header with Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/30">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>Interactive Picture & Animation Lab</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-mono border border-cyan-800 uppercase">
                Touch to Learn
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              See the concept move, change rules, and watch how AI thinks!
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          SCENARIO 1: THE DIKW MAGIC BAKERY CONVEYOR BELT
          ───────────────────────────────────────────────────────────────────── */}
      {resolvedType === 'dikw_bakery' && (
        <div className="space-y-4">
          {/* Conveyor Belt Visualizer */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-4 overflow-hidden">
            {/* Belt Track with moving stripes */}
            <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-3 z-10">
              {dikwStages.map((stage, i) => {
                const isActive = dikwStep === i
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      try { gameAudio.playTap() } catch {}
                      setDikwStep(i)
                    }}
                    className={`flex-1 rounded-2xl border p-3.5 text-left transition-all cursor-pointer relative ${
                      isActive
                        ? `${stage.color} ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-102`
                        : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">{stage.icon}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-cyan-400 text-slate-950 font-black' : 'text-slate-500'
                      }`}>
                        Stage {i + 1}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white">{stage.label}</h4>
                    <p className="text-[10px] text-cyan-300 font-medium mt-0.5">{stage.sub}</p>
                  </button>
                )
              })}
            </div>

            {/* Connecting Animated Laser Line */}
            <div className="hidden md:flex items-center justify-between px-8 py-2 relative">
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${((dikwStep + 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Active Stage Big Animated Explanation Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {dikwStages[dikwStep].icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-cyan-300 uppercase tracking-wider font-mono">
                      What is happening right now:
                    </span>
                    <span className="text-xs font-bold text-white">
                      {dikwStages[dikwStep].label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium leading-relaxed">
                    {dikwStages[dikwStep].desc}
                  </p>
                </div>
              </div>

              {/* Step Forward Action Button */}
              <button
                type="button"
                onClick={() => {
                  try { gameAudio.playTap() } catch {}
                  setDikwStep((prev) => (prev + 1) % 4)
                  if (dikwStep === 2) {
                    confetti({ particleCount: 25, spread: 45 })
                  }
                }}
                className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <span>{dikwStep === 3 ? 'Restart Factory 🔄' : 'Advance Next Step ⏩'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Simulation Slider: Rain vs Sun */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌤️</span>
              <div>
                <h5 className="text-xs font-black text-slate-200">Test the AI's Brain with Weather:</h5>
                <p className="text-[11px] text-slate-400">
                  Watch how the AI changes its food order when the weather changes!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  try { gameAudio.playTap() } catch {}
                  setWeatherCondition('sunny')
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  weatherCondition === 'sunny'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun size={13} />
                <span>Sunny (Play on field)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  try { gameAudio.playTap() } catch {}
                  setWeatherCondition('rainy')
                  confetti({ particleCount: 20, spread: 40 })
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  weatherCondition === 'rainy'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CloudRain size={13} />
                <span>Heavy Rain (Stay inside)</span>
              </button>
            </div>
          </div>

          {/* Real-time AI Forecast Output Pill */}
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              {weatherCondition === 'rainy'
                ? '🌧️ Rain detected → AI predicts 245 hot lunches needed (+45% spike). Food cooked just in time!'
                : '☀️ Sun detected → AI predicts 110 hot lunches needed (kids are outside playing). Zero food wasted!'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
              Accuracy: 98.4%
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          SCENARIO 2: PUPPY VS KITTY AI SCANNER
          ───────────────────────────────────────────────────────────────────── */}
      {resolvedType === 'pet_classifier' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Camera Viewfinder */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[200px] overflow-hidden">
              {/* Scan Beams */}
              {isScanning && (
                <div className="absolute inset-0 bg-cyan-500/20 animate-pulse flex items-center justify-center pointer-events-none">
                  <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce" />
                </div>
              )}

              {/* Pet Emoji / Visual */}
              <div className="text-7xl mb-2 transition-transform hover:scale-110 select-none">
                {scannedPet === 'dog' ? '🐶' : '🐱'}
              </div>
              <h4 className="text-sm font-black text-white">
                {scannedPet === 'dog' ? 'Subject: Happy Golden Puppy' : 'Subject: Fluffy Calico Kitten'}
              </h4>

              {/* Switch Subject */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    try { gameAudio.playTap() } catch {}
                    setScannedPet('dog')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    scannedPet === 'dog' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 bg-slate-800'
                  }`}
                >
                  Show Dog
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try { gameAudio.playTap() } catch {}
                    setScannedPet('cat')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    scannedPet === 'cat' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 bg-slate-800'
                  }`}
                >
                  Show Cat
                </button>
              </div>
            </div>

            {/* Neural Feature Extractors */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                  <Cpu size={14} />
                  <span>AI Feature Clues (Toggle Clues):</span>
                </h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => togglePetFeature('ears')}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold cursor-pointer transition-all ${
                      scannedFeatures.ears
                        ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-500'
                    }`}
                  >
                    <span>👂 Ear Shape: {scannedPet === 'dog' ? 'Floppy Ears' : 'Pointy Triangular Ears'}</span>
                    <span>{scannedFeatures.ears ? '✅ Active Clue' : '❌ Ignored'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => togglePetFeature('snout')}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold cursor-pointer transition-all ${
                      scannedFeatures.snout
                        ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-500'
                    }`}
                  >
                    <span>👃 Snout & Whiskers: {scannedPet === 'dog' ? 'Long Snout' : 'Tiny Nose + Whiskers'}</span>
                    <span>{scannedFeatures.snout ? '✅ Active Clue' : '❌ Ignored'}</span>
                  </button>
                </div>
              </div>

              {/* Scan Now Button */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">Prediction Confidence:</span>
                  <div className="text-base font-black text-emerald-400">
                    {scannedPet === 'dog' ? '🐶 Dog: 98.7%' : '🐱 Cat: 99.2%'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={triggerPetScan}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>{isScanning ? 'Scanning...' : 'Run AI Vision Scan ⚡'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          SCENARIO 3: ROBOT CHEF PROMPT KITCHEN
          ───────────────────────────────────────────────────────────────────── */}
      {resolvedType === 'robot_chef_prompt' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card A: Vague Prompt */}
            <div
              onClick={() => {
                try { gameAudio.playTap() } catch {}
                setPromptQuality('vague')
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                promptQuality === 'vague'
                  ? 'border-rose-500 bg-rose-950/20 ring-2 ring-rose-400'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  ❌ Vague / Sloppy Prompt
                </span>
                <span className="text-2xl">🤷‍♂️</span>
              </div>
              <p className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-rose-200">
                "Make me food."
              </p>
              <div className="mt-3 text-xs text-slate-300">
                <span className="font-bold text-rose-300">Robot Chef reaction:</span> Shrugs confused, cooks an empty plate or random raw onions because it had zero clues!
              </div>
            </div>

            {/* Card B: Detailed Prompt */}
            <div
              onClick={() => {
                gameAudio.playSuccess()
                setPromptQuality('detailed')
                confetti({ particleCount: 25, spread: 45 })
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                promptQuality === 'detailed'
                  ? 'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  ✅ Clear & Specific Prompt
                </span>
                <span className="text-2xl">🍕</span>
              </div>
              <p className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-emerald-200">
                "Bake 1 hot cheese pizza with black olives and crust crispy."
              </p>
              <div className="mt-3 text-xs text-slate-300">
                <span className="font-bold text-emerald-300">Robot Chef reaction:</span> Delivers a steaming delicious pizza baked to perfection in 2 minutes!
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <span className="text-amber-400 font-bold">💡 The Golden Rule:</span>
            <span>AI models are powerful engines, but they cannot read your mind. Clear context = Perfect result!</span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          SCENARIO 4: SATELLITE EARTH & PLANET AI
          ───────────────────────────────────────────────────────────────────── */}
      {resolvedType === 'satellite_earth' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-emerald-950/30 border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🛰️</span>
              <div>
                <h4 className="text-sm font-black text-emerald-300">Earth Sentinel AI Satellite</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Scanning 1,000,000 square kilometers of forests and oceans in real time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  gameAudio.playSuccess()
                  confetti({ particleCount: 20 })
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                🌲 Stop Forest Fire in 10s
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          SCENARIO 5: TRUTH & DEEPFAKE DETECTIVE
          ───────────────────────────────────────────────────────────────────── */}
      {resolvedType === 'truth_detective' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🔍</span>
              <div>
                <h4 className="text-sm font-black text-amber-300">Responsible AI Fact Inspector</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Always inspect evidence before sharing! Does the image have unnatural hands or impossible lighting?
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
              🛡️ Verify Before You Trust
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
export default InteractiveConceptPicture
