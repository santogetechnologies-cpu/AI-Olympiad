import { useState } from 'react'
import {
  Building2, CheckCircle,
  Sparkles, Check, Award, RotateCcw, Volume2, ChevronRight, Zap
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASS 9–10 WORKBOOK: "🏙️ Smart City Decision Matrix" (Zero typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class9To10WorkbookView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0)
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)
  const [activeChips, setActiveChips] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(isCompleted)

  const scenarios = [
    {
      title: '🚦 Smart Traffic & Emergency Grid',
      desc: 'An ambulance needs an express green corridor through rush hour downtown.',
      options: [
        { text: 'Auto-sync GPS siren with traffic lights to clear lanes ahead', isBest: true },
        { text: 'Leave all lights on standard 60-second fixed timers', isBest: false }
      ]
    },
    {
      title: '⚡ Clean Energy & Solar Grid',
      desc: 'Cloudy weather reduces solar power output. How should the grid react?',
      options: [
        { text: 'Dynamically draw from neighborhood battery reserves', isBest: true },
        { text: 'Shut off power to half the city without warning', isBest: false }
      ]
    },
    {
      title: '🛡️ Public Privacy & Security',
      desc: 'Smart cameras monitor park pathways for pedestrian safety.',
      options: [
        { text: 'Blur faces locally on the camera before storing data', isBest: true },
        { text: 'Broadcast unencrypted video streams publicly', isBest: false }
      ]
    }
  ]

  const wordBank = ['AI Camera', 'Solar Storage', 'Green Wave', 'Edge Blur']

  const handleToggleChip = (word: string) => {
    gameAudio.playTap()
    setActiveChips(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    )
  }

  const handleSubmit = () => {
    gameAudio.playSuccess()
    setSubmitted(true)
    gamification.addXP(20, undefined, `c910-spec-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏙️ Smart City Blueprint Approved! +20 XP')
    onComplete()
  }

  const currentScenario = scenarios[selectedScenarioIndex]

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-5 rounded-3xl border-2 border-teal-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-teal-500/20 text-teal-300 font-bold text-xs px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
            <Building2 size={14} className="text-teal-400" />
            <span>Smart City Decision Matrix</span>
          </span>
          <span className="text-xs text-teal-200 font-mono">Chapter #{chapterNum}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: City Blueprint Ledger`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Make decisions for your AI smart city. Tap options to solve city challenges!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Scenario Selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Zap size={15} className="text-amber-500" />
            <span>Challenge: {currentScenario.title}</span>
          </h3>
          <div className="flex gap-1.5">
            {scenarios.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  gameAudio.playTap()
                  setSelectedScenarioIndex(i)
                  setSelectedStrategy(null)
                }}
                className={`w-6 h-6 rounded-full text-xs font-black ${
                  selectedScenarioIndex === i ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {currentScenario.desc}
        </p>

        <div className="space-y-2 pt-1">
          {currentScenario.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setSelectedStrategy(idx)
              }}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all min-h-[44px] flex items-center justify-between gap-2 ${
                selectedStrategy === idx
                  ? opt.isBest
                    ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-xs'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{opt.text}</span>
              {selectedStrategy === idx && (
                <span>{opt.isBest ? '✓ Recommended' : '⚠️ Risky'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Word Chips */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Sparkles size={15} className="text-teal-600" />
          <span>Equip Smart City Modules</span>
        </h3>
        <p className="text-[11px] text-slate-500">Tap modules to activate in your city grid:</p>

        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, idx) => {
            const isEquipped = activeChips.includes(word)
            return (
              <button
                key={idx}
                onClick={() => handleToggleChip(word)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isEquipped
                    ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-400/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{isEquipped ? '✓' : '+'}</span>
                <span>{word}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
      >
        {submitted ? '✓ City Matrix Approved! (+20 XP)' : '🚀 Approve & Deploy City Blueprint (+20 XP)'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASS 9–10 FLASHCARDS: "⚡ Speed City Flashcards"
// ─────────────────────────────────────────────────────────────────────────────
export function Class9To10FlashcardsView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const cards = (section.flashcards && section.flashcards.length > 0)
    ? section.flashcards
    : [
        { q: 'How does an AI camera count city traffic?', a: '📷 It detects bounding boxes around vehicles frame-by-frame and counts how many cross a digital line!' },
        { q: 'What is an outlier in data science?', a: '🎯 A data point that is wildly different from the rest (like 50°C in Antarctica) that might be an error or special event!' },
        { q: 'Why do smart cities use IoT sensors?', a: '📡 Small low-power sensors constantly report temperature, air quality, and water levels to prevent floods!' },
        { q: 'What is Predictive Maintenance?', a: '🔧 AI spots tiny vibrations in subway trains or bridges before anything breaks down!' }
      ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [masteredCount, setMasteredCount] = useState(isCompleted ? cards.length : 0)
  const [combo, setCombo] = useState(1)

  const currentCard = cards[currentIndex] || cards[0]

  const handleFlip = () => {
    gameAudio.playTap()
    setFlipped(!flipped)
  }

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      gameAudio.playCoin()
      setMasteredCount(m => Math.min(cards.length, m + 1))
      setCombo(c => c + 1)
      toast.success(`⚡ Mastered! ${combo}x Streak!`, { icon: '🔥' })
    } else {
      gameAudio.playTap()
      setCombo(1)
    }

    setFlipped(false)
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(c => c + 1)
    } else {
      gameAudio.playVictory()
      gamification.addXP(20, undefined, `c910-fc-${chapterNum}`)
      gamification.launchConfetti()
      toast.success('🎉 Speed Duel Finished! All concepts conquered! +20 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-5 rounded-3xl border-2 border-teal-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-teal-500/20 text-teal-300 font-bold text-xs px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" />
            <span>Speed Concept Flashcards</span>
          </span>
          <span className="text-xs font-bold text-amber-400">🔥 {combo}x Combo</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {topicTitle ? `${topicTitle} · ` : ''}Card {currentIndex + 1} of {cards.length}
        </h2>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'resource'}
        position="header"
      />

      <div
        onClick={handleFlip}
        className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-white border-2 border-teal-200 shadow-md flex flex-col justify-between items-center text-center transition-all hover:shadow-lg active:scale-98 select-none"
      >
        <span className="text-[10px] uppercase font-black tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
          {flipped ? '💡 Click to see question' : '👆 Tap to Reveal Answer'}
        </span>

        <div className="my-auto py-4">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {flipped ? currentCard.a : currentCard.q}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            gameAudio.speak(flipped ? currentCard.a : currentCard.q)
          }}
          className="text-xs font-bold text-slate-400 hover:text-teal-600 flex items-center gap-1"
        >
          <Volume2 size={14} /> Read Aloud
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleNext(false)}
          icon={<RotateCcw size={15} />}
          className="rounded-2xl min-h-[44px] font-bold"
        >
          Review Later
        </Button>
        <Button
          onClick={() => handleNext(true)}
          icon={<Check size={15} />}
          className="rounded-2xl min-h-[44px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Got It! (+XP)
        </Button>
      </div>

      <div className="text-center text-xs text-slate-500 font-bold">
        {masteredCount} of {cards.length} cards mastered
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CLASS 9–10 PRACTICAL LAB: "🧪 Smart Sensor & Camera Simulator"
// ─────────────────────────────────────────────────────────────────────────────
export function Class9To10PracticalLabView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const [sensitivity, setSensitivity] = useState(80)
  const [tested, setTested] = useState(isCompleted)
  const [running, setRunning] = useState(false)

  const vehiclesDetected = Math.round(18 + sensitivity * 0.4)
  const falseAlarms = Math.max(0, Math.round((100 - sensitivity) * 0.1))

  const handleRunSim = async () => {
    gameAudio.playTap()
    setRunning(true)
    await new Promise(r => setTimeout(r, 600))
    setRunning(false)
    setTested(true)
    gameAudio.playSuccess()
    gamification.addXP(25, undefined, `c910-lab-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🧪 Smart Sensor Calibration Passed! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-5 rounded-3xl border-2 border-teal-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-teal-500/20 text-teal-300 font-bold text-xs px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
            <Building2 size={14} className="text-teal-400" />
            <span>Smart Sensor Simulator</span>
          </span>
          <span className="text-xs font-mono text-teal-300">Lab #6</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Sensor Simulator`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Tune camera sensitivity to track vehicles with zero false alarms!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100">
            <span className="text-[10px] uppercase font-bold text-teal-700 block">Vehicles Tracked</span>
            <span className="text-xl font-black text-teal-950">{vehiclesDetected} / min</span>
            <span className="text-[10px] text-emerald-600 font-bold block">✓ Accurate Count</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">False Alarms</span>
            <span className="text-xl font-black text-slate-900">{falseAlarms}</span>
            <span className={`text-[10px] font-bold block ${falseAlarms === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {falseAlarms === 0 ? '✓ Zero Noise' : '⚠️ Minor Glitches'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Sensor Confidence Threshold:</span>
            <span className="font-mono text-teal-300 font-bold">{sensitivity}%</span>
          </div>
          <input
            type="range"
            min={40}
            max={99}
            value={sensitivity}
            onChange={e => {
              setSensitivity(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Objective: Keep false alarms at 0 while counting 30+ cars</span>
        </div>

        <Button
          onClick={handleRunSim}
          loading={running}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {tested ? '✓ Lab Objectives Complete! (+25 XP)' : '🚀 Run Sensor Verification (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS 9–10 ASSIGNMENT: "🏆 City Architect Mission" (Zero essay typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class9To10AssignmentView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const [choice1, setChoice1] = useState<number | null>(null)
  const [choice2, setChoice2] = useState<number | null>(null)
  const [missionDone, setMissionDone] = useState(isCompleted)

  const options1 = [
    { text: 'Deploy Smart Drone Inspections for City Bridges', stars: 3 },
    { text: 'Wait for bridges to rust before inspecting by hand', stars: 1 }
  ]

  const options2 = [
    { text: 'Auto-adjust streetlights based on ambient sunset & pedestrian motion', stars: 3 },
    { text: 'Leave all 50,000 streetlights blazing 24/7 in full daylight', stars: 1 }
  ]

  const handleFinishMission = () => {
    if (choice1 === null || choice2 === null) {
      toast.error('Choose both city planning decisions!')
      return
    }
    gameAudio.playVictory()
    setMissionDone(true)
    gamification.addXP(25, undefined, `c910-assn-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏆 City Mission Verified! 3-Star Rating! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-5 rounded-3xl border-2 border-teal-500/40 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Award size={14} />
          <span>Capstone Hero Mission</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Architect Mission`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Make the two key municipal decisions to launch smart city automation.
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'assignment'}
        position="header"
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-900 block">
            1. Infrastructure Safety Strategy:
          </span>
          <div className="space-y-2">
            {options1.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  gameAudio.playTap()
                  setChoice1(i)
                }}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[44px] ${
                  choice1 === i
                    ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{c.text}</span>
                <span>{c.stars === 3 ? '⭐⭐⭐' : '⭐'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-slate-900 block">
            2. Energy Conservation Directive:
          </span>
          <div className="space-y-2">
            {options2.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  gameAudio.playTap()
                  setChoice2(i)
                }}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[44px] ${
                  choice2 === i
                    ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{c.text}</span>
                <span>{c.stars === 3 ? '⭐⭐⭐' : '⭐'}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleFinishMission}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {missionDone ? '✓ Mission Complete! 3-Stars Awarded' : '⭐ Complete Mission & Collect Badge (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CLASS 9–10 QUIZ: "🎯 City Titan Boss Battle"
// ─────────────────────────────────────────────────────────────────────────────
export function Class9To10MasteryQuizView({
  section,
  chapterNum,
  gradeKey,
  topicTitle = '',
  onComplete,
}: {
  section: CanonicalSection
  chapterNum: string | number
  gradeKey: string
  topicTitle?: string
  chapterTitle?: string
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(topicTitle || section.topicTitle || section.title)

  const questions = (section.quizQuestions && section.quizQuestions.length > 0)
    ? section.quizQuestions
    : (profile.quizzes && profile.quizzes.length > 0)
    ? profile.quizzes.map(q => ({
        question: q.question || q.q || '',
        options: (q.options || q.opts || []).map(o => ({ text: o.text, isCorrect: o.isCorrect })),
        explanation: q.explanation || q.exp || '',
      }))
    : [
        {
          question: 'How do smart sensors help prevent city flash floods?',
          options: [
            { text: 'By monitoring river water rise levels and auto-opening drainage gates', isCorrect: true },
            { text: 'By turning off the rain clouds', isCorrect: false },
            { text: 'By sending paper mail to citizens', isCorrect: false },
          ],
          explanation: 'Real-time water depth sensors trigger early flood warnings and sluice gates!'
        },
        {
          question: 'What is the biggest benefit of an intelligent electric grid?',
          options: [
            { text: 'It routes solar and wind energy directly to where power is needed most', isCorrect: true },
            { text: 'It uses more coal on sunny days', isCorrect: false },
            { text: 'It has no real benefit', isCorrect: false },
          ],
          explanation: 'Smart grids balance renewable energy sources dynamically!'
        }
      ]

  const [qIndex, setQIndex] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [bossHp, setBossHp] = useState(100)
  const [answered, setAnswered] = useState(false)
  const [isVictory, setIsVictory] = useState(false)

  const currentQ = questions[qIndex] || questions[0]
  const damagePerHit = Math.ceil(100 / questions.length)

  const handlePickOption = (idx: number) => {
    if (answered) return
    setSelectedOpt(idx)
    setAnswered(true)

    const isCorrect = currentQ.options[idx]?.isCorrect
    if (isCorrect) {
      gameAudio.playHit()
      const newHp = Math.max(0, bossHp - damagePerHit)
      setBossHp(newHp)
      toast.success(`💥 Direct Hit! Boss took -${damagePerHit} HP!`, { icon: '⚔️' })
    } else {
      gameAudio.playTap()
      toast.error('Miss! Study the explanation and strike next!')
    }
  }

  const handleNextQuestion = () => {
    gameAudio.playTap()
    setSelectedOpt(null)
    setAnswered(false)

    if (qIndex < questions.length - 1) {
      setQIndex(q => q + 1)
    } else {
      gameAudio.playVictory()
      setIsVictory(true)
      gamification.addXP(30, undefined, `c910-quiz-${chapterNum}`)
      gamification.launchConfetti()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 p-5 rounded-3xl border-2 border-teal-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏙️</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">Boss: The Traffic Grid Golem</h3>
              <span className="text-[10px] text-teal-300 font-mono">Chapter {chapterNum} Boss Battle</span>
            </div>
          </div>
          <span className="text-xs font-mono font-black text-rose-400 bg-black/50 px-2.5 py-1 rounded-full border border-rose-500/30">
            {bossHp} / 100 HP
          </span>
        </div>

        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-500 ${
              bossHp > 50 ? 'bg-emerald-500' : bossHp > 20 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${bossHp}%` }}
          />
        </div>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'quiz'}
        position="header"
      />

      {isVictory ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 text-center space-y-4 shadow-md">
          <span className="text-5xl block animate-bounce">🏆</span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Boss Defeated! Chapter Conquered!
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            You mastered {profile.title} with smart city engineering skills!
          </p>
          <Button
            onClick={onComplete}
            icon={<CheckCircle size={16} />}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl min-h-[46px]"
          >
            Claim Mastery Rewards &amp; Finish Chapter ✓
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Battle Question {qIndex + 1} of {questions.length}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            {currentQ.question}
          </p>

          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isPicked = selectedOpt === i
              const showResult = answered && isPicked

              return (
                <button
                  key={i}
                  onClick={() => handlePickOption(i)}
                  disabled={answered}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                    showResult
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-rose-100 border-rose-300 text-rose-950'
                      : isPicked
                      ? 'bg-teal-100 border-teal-400 text-teal-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  {showResult && (
                    <span>{opt.isCorrect ? '💥 HIT!' : '🛡️ BLOCKED'}</span>
                  )}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="space-y-3 pt-2">
              <p className="text-[11px] text-teal-900 bg-teal-50 p-2.5 rounded-xl border border-teal-100 font-medium">
                💡 {currentQ.explanation}
              </p>
              <Button
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl min-h-[44px]"
              >
                {qIndex < questions.length - 1 ? 'Next Strike ➔' : 'Finish Battle ➔'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
