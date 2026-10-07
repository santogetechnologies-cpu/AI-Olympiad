import { useState } from 'react'
import {
  FileSearch, Search, CheckCircle,
  Sparkles, Check, Play, Award, RotateCcw, Volume2, ChevronRight, Zap
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASS 4–5 WORKBOOK: "🕵️ Detective Case File & Suspect Lineup" (Zero typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class4To5WorkbookView({
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

  const [inspectedClues, setInspectedClues] = useState<number[]>([0])
  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null)
  const [activeBadges, setActiveBadges] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(isCompleted)

  const clues = [
    { title: 'Clue 1: Pattern Clue', desc: profile.step1?.desc || 'The AI found repeated patterns in incoming camera images.', icon: '🔍' },
    { title: 'Clue 2: Decision Clue', desc: profile.step2?.desc || 'A smart rule separated normal data from unusual obstacles.', icon: '⚖️' },
    { title: 'Clue 3: Action Clue', desc: profile.step3?.desc || 'The robot executed a smart automated rescue move.', icon: '🤖' },
  ]

  const suspects = [
    { name: 'Suspect A: The Glitch Gremlin (Unsorted data causing errors)', isTarget: true },
    { name: 'Suspect B: RoboBuddy Helper (Followed all rules correctly)', isTarget: false },
    { name: 'Suspect C: Friendly Sensor Drone (Working normally)', isTarget: false },
  ]

  const detectiveTools = ['Magnifying Lens', 'Pattern Decoder', 'Sensor Scanner', 'Evidence Seal']

  const handleToggleClue = (idx: number) => {
    gameAudio.playTap()
    setInspectedClues(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const handleToggleBadge = (tool: string) => {
    gameAudio.playTap()
    setActiveBadges(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }

  const handleSubmit = () => {
    gameAudio.playSuccess()
    setSubmitted(true)
    gamification.addXP(20, undefined, `c45-case-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🕵️ Detective Case Dossier Verified & Sealed! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 rounded-3xl border-2 border-emerald-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <FileSearch size={14} className="text-emerald-400" />
            <span>Detective Case Dossier</span>
          </span>
          <span className="text-xs text-emerald-200 font-mono">Chapter #{chapterNum}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Case Evidence`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Inspect clues, identify the suspect, and stamp your detective seal! Zero typing.
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Step 1: Clue Inspection */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Search size={15} className="text-emerald-600" />
            <span>Step 1: Inspect Discovered Clues</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {inspectedClues.length}/3 Inspected
          </span>
        </div>

        <div className="space-y-2">
          {clues.map((clue, idx) => {
            const isFound = inspectedClues.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => handleToggleClue(idx)}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-start gap-2.5 min-h-[44px] ${
                  isFound
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{clue.icon}</span>
                <div className="flex-1">
                  <span className="block font-black text-slate-900">{clue.title}</span>
                  <span className="text-[11px] text-slate-600 block mt-0.5 font-medium">{clue.desc}</span>
                </div>
                <span className="text-xs font-bold mt-1 text-emerald-600">
                  {isFound ? '✓ Discovered' : '+ Tap'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Suspect Lineup */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Zap size={15} className="text-amber-500" />
          <span>Step 2: Spot The Culprit</span>
        </h3>
        <p className="text-[11px] text-slate-500">Who caused the glitch in the smart system?</p>

        <div className="space-y-2">
          {suspects.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setSelectedSuspect(idx)
              }}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all min-h-[44px] flex items-center justify-between gap-2 ${
                selectedSuspect === idx
                  ? s.isTarget
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{s.name}</span>
              {selectedSuspect === idx && (
                <span>{s.isTarget ? '✓ Solved!' : '⚠️ Innocent'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Detective Tools */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Sparkles size={15} className="text-amber-500" />
          <span>Step 3: Equip Detective Equipment</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {detectiveTools.map((tool, idx) => {
            const isEquipped = activeBadges.includes(tool)
            return (
              <button
                key={idx}
                onClick={() => handleToggleBadge(tool)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isEquipped
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{isEquipped ? '✓' : '+'}</span>
                <span>{tool}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
      >
        {submitted ? '✓ Detective Case Sealed! (+20 XP)' : '🚀 Stamp Case Seal & Solve (+20 XP)'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASS 4–5 FLASHCARDS: "⚡ Speed Detective Flashcards"
// ─────────────────────────────────────────────────────────────────────────────
export function Class4To5FlashcardsView({
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
        { q: 'How does a robot know what is in front of it?', a: '👀 It uses camera eyes and ultrasonic echo sensors to measure distance and shape!' },
        { q: 'What is a Pixel in computer graphics?', a: '🟦 A tiny colored square tile! Millions of pixels together make a clear screen image!' },
        { q: 'What is Pattern Recognition?', a: '🔎 Spotting things that repeat — like seeing that all cats have whiskers, pointy ears, and tails!' },
        { q: 'Why do robots follow step-by-step code?', a: '🤖 Robots can only do exactly what we command them to do, step by step!' }
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
      gamification.addXP(20, undefined, `c45-fc-${chapterNum}`)
      gamification.launchConfetti()
      toast.success('🎉 Speed Duel Finished! All concepts conquered! +20 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 rounded-3xl border-2 border-emerald-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" />
            <span>Speed Detective Flashcards</span>
          </span>
          <span className="text-xs font-bold text-amber-400">🔥 {combo}x Combo</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {topicTitle ? `${topicTitle} · ` : ''}Card {currentIndex + 1} of {cards.length}
        </h2>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-400 h-full transition-all duration-300"
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
        className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-white border-2 border-emerald-200 shadow-md flex flex-col justify-between items-center text-center transition-all hover:shadow-lg active:scale-98 select-none"
      >
        <span className="text-[10px] uppercase font-black tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
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
          className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1"
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
// 3. CLASS 4–5 PRACTICAL LAB: "🧪 Robot Sensor & Grid Navigator"
// ─────────────────────────────────────────────────────────────────────────────
export function Class4To5PracticalLabView({
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

  const [robotStep, setRobotStep] = useState(0)
  const [labWon, setLabWon] = useState(isCompleted)

  const steps = ['Home Base 🏁', 'Sensor Scan 🔍', 'Avoid Mud 🧱', 'Rescue Pet 🐶']

  const handleStepForward = () => {
    gameAudio.playTap()
    if (robotStep < steps.length - 1) {
      setRobotStep(s => s + 1)
      if (robotStep + 1 === steps.length - 1) {
        setLabWon(true)
        gameAudio.playVictory()
        gamification.addXP(25, undefined, `c45-lab-${chapterNum}`)
        gamification.launchConfetti()
        toast.success('🎉 Pet Rescued! Robot Navigator Mission Complete! +25 XP')
        onComplete()
      }
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 rounded-3xl border-2 border-emerald-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <Play size={13} className="text-emerald-400" />
            <span>Robot Navigator Lab</span>
          </span>
          <span className="text-xs font-mono text-emerald-300">Lab #6</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Robot Rescue Lab`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Tap the command button to guide the rescue robot along the path!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Step Track */}
        <div className="p-4 bg-slate-900 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
            Path Navigator Progress
          </span>
          <div className="grid grid-cols-4 gap-2">
            {steps.map((st, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl text-center font-bold text-[11px] transition-all ${
                  robotStep === i
                    ? 'bg-emerald-500 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                    : i < robotStep
                    ? 'bg-slate-800 text-emerald-400'
                    : 'bg-slate-800/60 text-slate-500'
                }`}
              >
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Current Position: {steps[robotStep]}</span>
        </div>

        <Button
          onClick={handleStepForward}
          disabled={labWon}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {labWon ? '✓ Rescue Mission Complete! (+25 XP)' : '🤖 Step Forward ➔ (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS 4–5 ASSIGNMENT: "🏆 Detective Rescue Mission" (Zero essay typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class4To5AssignmentView({
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
    { text: 'Use infrared camera sensor to see through dark fog', stars: 3 },
    { text: 'Turn off all robot sensors and walk blindly', stars: 1 }
  ]

  const options2 = [
    { text: 'Send an alert ping to headquarters when rescue target is found', stars: 3 },
    { text: 'Forget to record the location and wander away', stars: 1 }
  ]

  const handleFinishMission = () => {
    if (choice1 === null || choice2 === null) {
      toast.error('Choose both rescue decisions!')
      return
    }
    gameAudio.playVictory()
    setMissionDone(true)
    gamification.addXP(25, undefined, `c45-assn-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏆 Detective Rescue Verified! 3-Star Rating! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 rounded-3xl border-2 border-emerald-500/40 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Award size={14} />
          <span>Capstone Hero Mission</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Rescue Dossier`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Make the two key detective choices to complete the rescue mission.
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
            1. Foggy Terrain Strategy:
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
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
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
            2. Rescue Beacon Action:
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
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
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
// 5. CLASS 4–5 QUIZ: "🎯 Cyber Phantom Boss Battle"
// ─────────────────────────────────────────────────────────────────────────────
export function Class4To5MasteryQuizView({
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
          question: 'What helps a robot distinguish between a cat and a dog?',
          options: [
            { text: 'Looking at patterns in ear shape, whiskers, and sounds', isCorrect: true },
            { text: 'Guessing randomly with its eyes closed', isCorrect: false },
            { text: 'Asking the cat to speak English', isCorrect: false },
          ],
          explanation: 'AI compares visual feature patterns to classify animals correctly!'
        },
        {
          question: 'What is a smart decision rule for a cleaning robot?',
          options: [
            { text: 'IF wall detected THEN turn right, ELSE drive forward', isCorrect: true },
            { text: 'Bump into the wall at full speed forever', isCorrect: false },
            { text: 'Go to sleep immediately', isCorrect: false },
          ],
          explanation: 'Sensor rules allow the robot to navigate around obstacles safely!'
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
      gamification.addXP(30, undefined, `c45-quiz-${chapterNum}`)
      gamification.launchConfetti()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-5 rounded-3xl border-2 border-emerald-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👻</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">Boss: The Cyber Phantom</h3>
              <span className="text-[10px] text-emerald-300 font-mono">Chapter {chapterNum} Boss Battle</span>
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
            You solved the mystery of {profile.title} with true detective skill!
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
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
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
              <p className="text-[11px] text-emerald-950 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
                💡 {currentQ.explanation}
              </p>
              <Button
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl min-h-[44px]"
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
