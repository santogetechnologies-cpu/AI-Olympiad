import { useState } from 'react'
import {
  Brain, Sliders, CheckCircle, Zap,
  Sparkles, Check, Award, RotateCcw, Volume2, ChevronRight
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASS 11–12 WORKBOOK: "🧠 Neural Node Connector & Tuner" (Zero typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class11To12WorkbookView({
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

  const [activeNodes, setActiveNodes] = useState<number[]>([0, 1])
  const [learningSpeed, setLearningSpeed] = useState(70)
  const [activeChips, setActiveChips] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(isCompleted)

  const nodeLayers = [
    { name: 'Layer 1: Edge Detector', icon: '👁️' },
    { name: 'Layer 2: Shape Combiner', icon: '🧩' },
    { name: 'Layer 3: Decision Engine', icon: '🎯' }
  ]

  const chipOptions = ['ReLU Switch', 'Backprop Spark', 'Softmax Pick', 'Cross-Entropy']

  const handleToggleNode = (idx: number) => {
    gameAudio.playTap()
    setActiveNodes(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const handleToggleChip = (chip: string) => {
    gameAudio.playTap()
    setActiveChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  const handleSubmit = () => {
    gameAudio.playSuccess()
    setSubmitted(true)
    gamification.addXP(20, undefined, `c1112-spec-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🧠 Neural Architecture Registered & Trained! +20 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-5 rounded-3xl border-2 border-purple-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-purple-500/20 text-purple-300 font-bold text-xs px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
            <Brain size={14} className="text-purple-400" />
            <span>Neural Architecture Spec</span>
          </span>
          <span className="text-xs text-purple-200 font-mono">Chapter #{chapterNum}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Neural Node Spec`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Tap nodes to link synaptic connections and slide learning speed. Zero reading walls!
        </p>
      </div>

      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={section.id || 'worksheet'}
        position="header"
      />

      {/* Interactive Node Connector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Zap size={15} className="text-amber-500" />
            <span>Step 1: Connect Neural Pathway Nodes</span>
          </h3>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            {activeNodes.length}/3 Linked
          </span>
        </div>
        <p className="text-[11px] text-slate-500">Tap each layer to activate the signal pipeline:</p>

        <div className="space-y-2">
          {nodeLayers.map((layer, idx) => {
            const isConnected = activeNodes.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => handleToggleNode(idx)}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[44px] active:scale-98 ${
                  isConnected
                    ? 'bg-purple-50 border-purple-400 text-purple-950 shadow-xs ring-1 ring-purple-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{layer.icon}</span>
                  <span>{layer.name}</span>
                </div>
                <span>{isConnected ? '⚡ ACTIVE' : '○ Tap to Link'}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Learning Speed Slider */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Sliders size={15} className="text-indigo-600" />
            <span>Step 2: Tune Learning Rate</span>
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-600">
            Loss: {(0.05 + (100 - learningSpeed) * 0.02).toFixed(2)}
          </span>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold">Optimization Speed:</span>
            <span className="font-mono text-purple-300 font-bold">{learningSpeed}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={99}
            value={learningSpeed}
            onChange={e => {
              setLearningSpeed(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      {/* Word Chips */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Sparkles size={15} className="text-amber-500" />
          <span>Step 3: Equip Neural Modules</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {chipOptions.map((chip, idx) => {
            const isEquipped = activeChips.includes(chip)
            return (
              <button
                key={idx}
                onClick={() => handleToggleChip(chip)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isEquipped
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{isEquipped ? '✓' : '+'}</span>
                <span>{chip}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
      >
        {submitted ? '✓ Neural Architecture Spec Sealed! (+20 XP)' : '🚀 Train & Seal Model Spec (+20 XP)'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASS 11–12 FLASHCARDS: "⚡ Speed Neural Duel"
// ─────────────────────────────────────────────────────────────────────────────
export function Class11To12FlashcardsView({
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
        { q: 'How does an artificial neuron make a decision?', a: '🧠 It multiplies each input signal by a connection weight, adds them together, and checks if it beats the threshold!' },
        { q: 'What is Gradient Descent in simple terms?', a: '⛷️ Like rolling a ball down a hill to find the lowest spot (lowest mistake loss)!' },
        { q: 'Why do deep networks have hidden layers?', a: '🧩 Lower layers detect simple lines/corners, while deeper layers combine them into faces or cars!' },
        { q: 'What does an activation function do?', a: '⚡ It decides whether the neuron should fire electricity or stay quiet!' }
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
      gamification.addXP(20, undefined, `c1112-fc-${chapterNum}`)
      gamification.launchConfetti()
      toast.success('🎉 Speed Duel Finished! All concepts conquered! +20 XP')
      onComplete()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 p-5 rounded-3xl border-2 border-purple-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-purple-500/20 text-purple-300 font-bold text-xs px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
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
            className="bg-purple-400 h-full transition-all duration-300"
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
        className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-white border-2 border-purple-200 shadow-md flex flex-col justify-between items-center text-center transition-all hover:shadow-lg active:scale-98 select-none"
      >
        <span className="text-[10px] uppercase font-black tracking-wider text-purple-500 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
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
          className="text-xs font-bold text-slate-400 hover:text-purple-600 flex items-center gap-1"
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
// 3. CLASS 11–12 PRACTICAL LAB: "🧪 Neural Playground Simulator"
// ─────────────────────────────────────────────────────────────────────────────
export function Class11To12PracticalLabView({
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

  const [weight, setWeight] = useState(75)
  const [tested, setTested] = useState(isCompleted)
  const [running, setRunning] = useState(false)

  const accuracy = Math.min(99, Math.round(50 + weight * 0.49))

  const handleRunSim = async () => {
    gameAudio.playTap()
    setRunning(true)
    await new Promise(r => setTimeout(r, 600))
    setRunning(false)
    setTested(true)
    gameAudio.playSuccess()
    gamification.addXP(25, undefined, `c1112-lab-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🧪 Neural Network Trained with 98% Accuracy! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 p-5 rounded-3xl border-2 border-purple-500/40 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-purple-500/20 text-purple-300 font-bold text-xs px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
            <Brain size={14} className="text-purple-400" />
            <span>Neural Playground Simulator</span>
          </span>
          <span className="text-xs font-mono text-purple-300">Lab #6</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Neural Forge Lab`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Slide the synaptic connection strength and run training epochs!
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
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Model Accuracy</span>
            <span className="text-xl font-black text-purple-950">{accuracy}%</span>
            <span className="text-[10px] text-emerald-600 font-bold block">✓ High Precision</span>
          </div>

          <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">Inference Speed</span>
            <span className="text-xl font-black text-indigo-950">2.1ms</span>
            <span className="text-[10px] text-blue-600 font-bold block">⚡ Real-time</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Synapse Weight Strength:</span>
            <span className="font-mono text-purple-300 font-bold">{(weight / 100).toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={weight}
            onChange={e => {
              setWeight(Number(e.target.value))
              gameAudio.playTap()
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Objective: Reach 90%+ Accuracy on test samples</span>
        </div>

        <Button
          onClick={handleRunSim}
          loading={running}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
        >
          {tested ? '✓ Lab Objectives Complete! (+25 XP)' : '🚀 Run Training Epochs (+25 XP)'}
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS 11–12 ASSIGNMENT: "🏆 AI Innovation Quest" (Zero essay typing!)
// ─────────────────────────────────────────────────────────────────────────────
export function Class11To12AssignmentView({
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
    { text: 'Use Convolutional Filters for Image Vision', stars: 3 },
    { text: 'Flatten all pixels into one giant random list', stars: 1 }
  ]

  const options2 = [
    { text: 'Apply Dropout to prevent memorization/overfitting', stars: 3 },
    { text: 'Memorize training data 100% with no generalization', stars: 1 }
  ]

  const handleFinishMission = () => {
    if (choice1 === null || choice2 === null) {
      toast.error('Choose both strategic design decisions!')
      return
    }
    gameAudio.playVictory()
    setMissionDone(true)
    gamification.addXP(25, undefined, `c1112-assn-${chapterNum}`)
    gamification.launchConfetti()
    toast.success('🏆 Capstone Mission Verified! 3-Star Rating! +25 XP')
    onComplete()
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 p-5 rounded-3xl border-2 border-purple-500/40 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Award size={14} />
          <span>Capstone Hero Mission</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black">
          {section.title || `${profile.title}: Model Quest`}
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Make the two key architectural choices to launch this deep model.
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
            1. Pattern Recognition Strategy:
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
                    ? 'bg-purple-50 border-purple-400 text-purple-950 shadow-xs'
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
            2. Generalization &amp; Overfitting Protection:
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
                    ? 'bg-purple-50 border-purple-400 text-purple-950 shadow-xs'
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
// 5. CLASS 11–12 QUIZ: "🎯 Neural Titan Boss Battle"
// ─────────────────────────────────────────────────────────────────────────────
export function Class11To12MasteryQuizView({
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
          question: 'What is the role of weights in a neural network?',
          options: [
            { text: 'They control how strongly each input influences the decision', isCorrect: true },
            { text: 'They measure how heavy the computer is', isCorrect: false },
            { text: 'They delete unused files from RAM', isCorrect: false },
          ],
          explanation: 'Connection weights act like volume dials on each incoming signal!'
        },
        {
          question: 'Why do we need a validation set during training?',
          options: [
            { text: 'To ensure the model performs well on brand new, unseen data', isCorrect: true },
            { text: 'To slow down training on purpose', isCorrect: false },
            { text: 'It has no real purpose', isCorrect: false },
          ],
          explanation: 'Validation tests if the model truly learned the concept rather than just memorizing!'
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
      gamification.addXP(30, undefined, `c1112-quiz-${chapterNum}`)
      gamification.launchConfetti()
    }
  }

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* Boss HUD */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 p-5 rounded-3xl border-2 border-purple-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">Boss: The Neural Titan</h3>
              <span className="text-[10px] text-purple-300 font-mono">Chapter {chapterNum} Boss Battle</span>
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
            You mastered {profile.title} with neural excellence!
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
                      ? 'bg-purple-100 border-purple-400 text-purple-950'
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
              <p className="text-[11px] text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-100 font-medium">
                💡 {currentQ.explanation}
              </p>
              <Button
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl min-h-[44px]"
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
