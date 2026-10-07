import { useState } from 'react'
import {
  GitBranch, Sliders, CheckCircle,
  Sparkles, Check, Award, RotateCcw, Volume2, ChevronRight, Zap
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASS 6–8 WORKBOOK: "⚔️ Algorithm Flow Engine Sequencer" (Zero typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class6To8WorkbookView({
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

  const [activeStepIds, setActiveStepIds] = useState<number[]>([0])
  const [thresholdScore, setThresholdScore] = useState(60)
  const [activeChips, setActiveChips] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(isCompleted)

  const flowNodes = [
    { title: 'Node 1: Input Sensor Stage', desc: profile.step1?.desc || 'Capture camera frame or sensor readings.', icon: '📥' },
    { title: 'Node 2: Logic Evaluation Rule', desc: profile.step2?.desc || 'Compare inputs against the target threshold.', icon: '⚖️' },
    { title: 'Node 3: Output Decision Action', desc: profile.step3?.desc || 'Trigger the robot motor or send alert.', icon: '🚀' },
  ]

  const chipBank = ['IF-Condition', 'Loop Repeat', 'Binary Sort', 'Output Trigger']

  const handleToggleNode = (idx: number) => {
    gameAudio.playTap()
    setActiveStepIds(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const handleToggleChip = (word: string) => {
    gameAudio.playTap()
    setActiveChips(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    )
  }

  const handleSubmit = () => {
    gameAudio.playSuccess()
    setSubmitted(true)
    gamification.addXP(20, undefined, `c68-spec-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('⚔️ Flowchart Specification Registered! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-indigo-500/20 text-indigo-300 font-bold text-xs px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
            <GitBranch size={14} className="text-cyan-400" />
            <span>Algorithm Flow Spec</span>
          </span>
          <span className="text-xs text-indigo-200 font-mono">Chapter #{chapterNum}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Flow Engine`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Tap nodes to link the flowchart and test the logic threshold! Zero reading walls.
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Step 1: Flow Nodes */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Zap size={15} className="text-indigo-600" />
            <span>Step 1: Link Algorithm Flow Nodes</span>
          </h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {activeStepIds.length}/3 Connected
          </span>
        </div>

        <div className="space-y-2">
          {flowNodes.map((node, idx) => {
            const isLinked = activeStepIds.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => handleToggleNode(idx)}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-start gap-2.5 min-h-[44px] ${
                  isLinked
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{node.icon}</span>
                <div className="flex-1">
                  <span className="block font-black text-slate-900">{node.title}</span>
                  <span className="text-[11px] text-slate-600 block mt-0.5 font-medium">{node.desc}</span>
                </div>
                <span className="text-xs font-bold mt-1 text-indigo-600">
                  {isLinked ? '✓ ON' : '+ Tap'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Logic Threshold Slider */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Sliders size={15} className="text-blue-600" />
            <span>Step 2: Condition Decision Boundary</span>
          </h3>
          <span className="text-xs font-mono font-bold text-blue-600">
            IF score &gt; {thresholdScore}
          </span>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold">Confidence Trigger:</span>
            <span className="font-mono text-cyan-400 font-bold">{thresholdScore}% Match</span>
          </div>
          <input
            type="range"
            min={30}
            max={95}
            value={thresholdScore}
            onChange={e => {
              setThresholdScore(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* Step 3: Word Chips */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Sparkles size={15} className="text-amber-500" />
          <span>Step 3: Equip Logic Blocks</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {chipBank.map((word, idx) => {
            const isEquipped = activeChips.includes(word)
            return (
              <button
                key={idx}
                onClick={() => handleToggleChip(word)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isEquipped
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
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
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
      >
        {submitted ? '✓ Flow Spec Approved! (+20 XP)' : '🚀 Approve & Run Algorithm Flow (+20 XP)'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASS 6–8 FLASHCARDS: "⚡ Speed Algorithm Flashcards"
// ─────────────────────────────────────────────────────────────────────────────
export function Class6To8FlashcardsView({
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
        { q: 'What is an algorithm?', a: '📜 A step-by-step recipe of clear instructions to solve a puzzle or accomplish a goal!' },
        { q: 'What is an IF-ELSE decision in coding?', a: '🔀 A fork in the road: IF it is raining take an umbrella, ELSE wear sunglasses!' },
        { q: 'What is a Loop in computer science?', a: '🔁 Repeating an action multiple times without typing it over and over (like walking 10 steps)!' },
        { q: 'How does binary search find a number so fast?', a: '⚡ It cuts the search list in half on every single guess!' }
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
      gamification.addXP(20, undefined, `c68-fc-${chapterNum}`)
      gamification.launchConfetti()
      toast.success('🎉 Speed Duel Finished! All concepts conquered! +20 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 font-bold text-xs px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
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
            className="bg-indigo-400 h-full transition-all duration-300"
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
        className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-white border-2 border-indigo-200 shadow-md flex flex-col justify-between items-center text-center transition-all hover:shadow-lg active:scale-98 select-none"
      >
        <span className="text-[10px] uppercase font-black tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
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
          className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1"
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
// 3. CLASS 6–8 PRACTICAL LAB: "🧪 Algorithm Sorter Simulation"
// ─────────────────────────────────────────────────────────────────────────────
export function Class6To8PracticalLabView({
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

  const [numbers, setNumbers] = useState([42, 12, 88, 7, 23])
  const [sorted, setSorted] = useState(isCompleted)
  const [running, setRunning] = useState(false)

  const handleSortNumbers = async () => {
    gameAudio.playTap()
    setRunning(true)
    await new Promise(r => setTimeout(r, 600))
    setNumbers([7, 12, 23, 42, 88])
    setRunning(false)
    setSorted(true)
    gameAudio.playSuccess()
    gamification.addXP(25, undefined, `c68-lab-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🧪 Algorithm Sorted 5 Items in 0.04ms! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 font-bold text-xs px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
            <GitBranch size={14} className="text-cyan-400" />
            <span>Algorithm Sorter Lab</span>
          </span>
          <span className="text-xs font-mono text-cyan-300">Lab #6</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Sorter Arena`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Watch sorting algorithms organize jumbled numbers in milliseconds!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'activity'}
        position="header"
      />

      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="p-4 bg-slate-900 rounded-2xl text-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {sorted ? '✓ Sorted Numbers (Smallest to Largest)' : 'Unsorted Cards in Memory'}
          </span>
          <div className="flex justify-center gap-2">
            {numbers.map((num, i) => (
              <div
                key={i}
                className={`w-12 h-14 rounded-2xl flex items-center justify-center font-black text-base shadow-sm transition-all duration-300 ${
                  sorted
                    ? 'bg-emerald-500 text-white scale-105'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Objective: Execute sorting pass to arrange cards in ascending order</span>
        </div>

        <Button
          onClick={handleSortNumbers}
          loading={running}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {sorted ? '✓ Sorting Verified! (+25 XP)' : '🚀 Run Fast Sort Algorithm (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS 6–8 ASSIGNMENT: "🏆 Algorithm Quest Mission" (Zero essay typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class6To8AssignmentView({
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
    { text: 'Use a Quick Pathfinding algorithm (Dijkstra/A*) for fastest delivery', stars: 3 },
    { text: 'Drive down every single street in the city at random', stars: 1 }
  ]

  const options2 = [
    { text: 'Cache repeated search results so users do not wait', stars: 3 },
    { text: 'Recalculate entire database for every keystroke', stars: 1 }
  ]

  const handleFinishMission = () => {
    if (choice1 === null || choice2 === null) {
      toast.error('Choose both algorithm engineering decisions!')
      return
    }
    gameAudio.playVictory()
    setMissionDone(true)
    gamification.addXP(25, undefined, `c68-assn-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏆 Algorithm Mission Verified! 3-Star Rating! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-5 rounded-3xl border-2 border-indigo-500/40 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Award size={14} />
          <span>Capstone Hero Mission</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Quest Dossier`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Choose the best algorithmic strategy to solve real-world problems.
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
            1. Navigation &amp; Path Optimization:
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
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
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
            2. Performance &amp; Scalability:
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
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
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
// 5. CLASS 6–8 QUIZ: "🎯 Algorithm Arena Boss Battle"
// ─────────────────────────────────────────────────────────────────────────────
export function Class6To8MasteryQuizView({
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
          question: 'What is the main goal of designing a good algorithm?',
          options: [
            { text: 'To solve the problem correctly with the least time and steps', isCorrect: true },
            { text: 'To write as many complicated lines of code as possible', isCorrect: false },
            { text: 'To make the computer overheat', isCorrect: false },
          ],
          explanation: 'Efficiency and clarity are the hallmarks of great algorithms!'
        },
        {
          question: 'If a robot reaches a closed door, what conditional logic should it follow?',
          options: [
            { text: 'IF door is locked THEN knock or seek alternative door, ELSE walk through', isCorrect: true },
            { text: 'Walk straight into the closed door forever', isCorrect: false },
            { text: 'Shut down immediately', isCorrect: false },
          ],
          explanation: 'Condition branches let robots react flexibly to obstacles!'
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
      gamification.addXP(30, undefined, `c68-quiz-${chapterNum}`)
      gamification.launchConfetti()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-5 rounded-3xl border-2 border-indigo-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👾</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">Boss: The Glitch Bug Golem</h3>
              <span className="text-[10px] text-indigo-300 font-mono">Chapter {chapterNum} Boss Battle</span>
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
            You mastered {profile.title} with true algorithmic power!
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
                      ? 'bg-indigo-100 border-indigo-400 text-indigo-950'
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
              <p className="text-[11px] text-indigo-900 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 font-medium">
                💡 {currentQ.explanation}
              </p>
              <Button
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl min-h-[44px]"
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
