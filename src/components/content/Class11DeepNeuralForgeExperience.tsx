import { useState } from 'react'
import {
  Brain, Layers, RotateCcw,
  CheckCircle, Play, Check, Zap, TrendingDown, Lightbulb
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface Class11DeepNeuralForgeProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: 1 | 2
  hookQuestion?: string
  onComplete?: () => void
}

export function Class11DeepNeuralForgeExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete: _onComplete,
}: Class11DeepNeuralForgeProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Lesson 1: Neural Architecture & Activation State
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})
  const [activationFn, setActivationFn] = useState<'relu' | 'sigmoid'>('relu')
  const [signalPulsing, setSignalPulsing] = useState(false)

  // Lesson 2: Gradient Descent Optimization State
  const [learningRate, setLearningRate] = useState(0.20)
  const [ballX, setBallX] = useState(-2.5)
  const [optEpoch, setOptEpoch] = useState(0)
  const currentLoss = parseFloat((ballX * ballX).toFixed(3))
  const isConverged = currentLoss < 0.05
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleStepGradient = () => {
    if (isConverged) return
    const grad = 2 * ballX // derivative of x^2
    const nextX = ballX - learningRate * grad
    setBallX(parseFloat(nextX.toFixed(3)))
    setOptEpoch(e => e + 1)
    if (nextX * nextX < 0.05) {
      gamification.addXP(30, undefined, `cls11-opt-${cNum}`)
      toast.success('🎯 Optimization Converged! Minimum Loss Reached! +30 XP', { icon: '📐' })
    }
  }

  const handleResetOptimizer = () => {
    setBallX(-2.5)
    setOptEpoch(0)
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gamification.addXP(20, undefined, `cls11-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Correct mathematical intuition! +20 XP', { icon: '🎉' })
    } else {
      toast.error('Review the concept steps and try again!')
    }
  }

  const handleMatchPair = (id: string) => {
    setMatchedPairs(prev => {
      const next = { ...prev, [id]: true }
      if (Object.keys(next).length === profile.pairs.length) {
        gamification.addXP(25, undefined, `cls11-pairs-${cNum}-${lessonNumber}`)
        toast.success('🧩 All neural network concepts matched! +25 XP', { icon: '🏆' })
      }
      return next
    })
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Grade Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-purple-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Brain size={14} className="text-purple-400" /> Class 11: Deep Neural Forge &amp; Mathematical Lab
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-400/30">
              {lessonNumber === 1 ? '🧠 Mode: Architectural Foundations' : '⚡ Mode: Computational Tensor Execution'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-purple-300 bg-black/40 px-3 py-1 rounded-xl border border-purple-500/40">
            Chapter {cNum} • Deep Learning
          </span>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-1 font-medium">
            {profile.goal}
          </p>
        </div>

        {/* Thought Hook */}
        <div className="mt-4 p-3.5 bg-purple-900/40 border border-purple-400/30 rounded-2xl flex items-start gap-3 relative z-10">
          <Lightbulb size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-purple-100 font-medium">
            <strong className="text-amber-300 font-bold">Inquiry Question: </strong>
            {profile.hook}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: FOUNDATIONS & STEP-BY-STEP BREAKDOWN                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Everyday Analogy */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider mb-2">
              <span>💡 Intuitive Everyday Analogy</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {profile.analogy}
            </p>
          </div>

          {/* 3 Step Concept Progression */}
          <div className="bg-white rounded-3xl border-2 border-purple-100 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>🔬 3-Stage Mathematical Mechanism</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Follow how {topicTitle} works systematically.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
                Stage {activeStepIdx + 1} of 3
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    activeStepIdx === idx
                      ? 'border-purple-500 bg-purple-50/70 shadow-sm scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                      Stage {idx + 1}
                    </span>
                    {activeStepIdx === idx && <Check size={14} className="text-purple-600 font-bold" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{st.desc}</p>
                </button>
              ))}
            </div>

            {/* Interactive Multi-Layer Neural Architecture Canvas */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 border border-purple-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Layers size={14} className="text-purple-400" /> Multi-Layer Neural Architecture Flow
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivationFn('relu')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      activationFn === 'relu' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    ReLU: max(0, x)
                  </button>
                  <button
                    onClick={() => setActivationFn('sigmoid')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      activationFn === 'sigmoid' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Sigmoid: σ(x)
                  </button>
                </div>
              </div>

              {/* Neural Layers Visual Flow */}
              <div className="flex items-center justify-around p-4 bg-slate-900 rounded-xl border border-slate-800">
                {/* Input Layer */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Input Layer</span>
                  {[1, 2, 3].map(n => (
                    <div key={n} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-mono">
                      x{n}
                    </div>
                  ))}
                </div>

                <div className="text-slate-600 font-mono text-sm animate-pulse">⟶</div>

                {/* Hidden Layer */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-purple-400 uppercase">Hidden Layer (4)</span>
                  {[1, 2, 3, 4].map(n => (
                    <div
                      key={n}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        signalPulsing
                          ? 'bg-purple-600 border-purple-300 text-white shadow-lg shadow-purple-500/50 scale-110'
                          : 'bg-purple-950/60 border-purple-500 text-purple-200'
                      }`}
                    >
                      h{n}
                    </div>
                  ))}
                </div>

                <div className="text-slate-600 font-mono text-sm animate-pulse">⟶</div>

                {/* Output Layer */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Output</span>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                    signalPulsing
                      ? 'bg-emerald-500 border-emerald-300 text-slate-950 scale-110'
                      : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  }`}>
                    ŷ
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <Button
                  onClick={async () => {
                    setSignalPulsing(true)
                    await new Promise(r => setTimeout(r, 600))
                    setSignalPulsing(false)
                    toast.success('Forward Pass Propagated! Non-linearity computed.', { icon: '⚡' })
                  }}
                  variant="primary"
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md cursor-pointer"
                >
                  <Zap size={13} className={signalPulsing ? 'animate-spin' : ''} />
                  <span>Pulse Forward Pass ⚡</span>
                </Button>
                <span className="text-slate-400 font-mono text-[11px]">
                  Activation: <strong className="text-purple-300">{activationFn.toUpperCase()}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Key Term Matcher */}
          {profile.pairs && profile.pairs.length > 0 && (
            <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>🧩 Connect Neural Network Principles</span>
                  </h3>
                  <p className="text-xs text-slate-500">Tap to lock in each core principle!</p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                  {Object.keys(matchedPairs).length} / {profile.pairs.length} Mastered
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.pairs.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleMatchPair(p.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      matchedPairs[p.id]
                        ? 'border-emerald-400 bg-emerald-50/70 text-emerald-950'
                        : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-purple-950">{p.term}</span>
                      {matchedPairs[p.id] && <Check size={14} className="text-emerald-600 font-bold" />}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{p.definition}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2: DEEP LEARNING SANDBOX & PRACTICE CHALLENGE                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Real World Scenario */}
          <div className="bg-white rounded-3xl border-2 border-purple-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🌍 Real-World Application Scenario</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {profile.realScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.useCases.map((uc, i) => (
                <div key={i} className="p-3 bg-purple-50/70 border border-purple-200/70 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Use Case #{i + 1}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{uc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Interactive Gradient Descent Optimization Playground ── */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-purple-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <TrendingDown size={18} className="text-purple-400" />
                <div>
                  <h4 className="font-bold text-sm text-purple-300">Gradient Descent &amp; Loss Surface Descent</h4>
                  <p className="text-[11px] text-slate-400">Step through the optimization trajectory toward the global minimum</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleStepGradient}
                  disabled={isConverged}
                  variant="primary"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Play size={13} />
                  <span>Take Gradient Step ▶</span>
                </Button>
                <button
                  onClick={handleResetOptimizer}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer"
                  title="Reset Optimization"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Loss</span>
                <span className="text-xl font-black font-mono text-amber-400 mt-0.5 block">{currentLoss.toFixed(3)}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Step (Epoch)</span>
                <span className="text-xl font-black font-mono text-white mt-0.5 block">{optEpoch}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Parameter Position (θ)</span>
                <span className="text-xl font-black font-mono text-purple-300 mt-0.5 block">{ballX.toFixed(2)}</span>
              </div>
            </div>

            {/* Learning Rate Slider */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Learning Rate (α):</span>
                <span className="font-mono text-purple-300 font-bold">{learningRate.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.80"
                step="0.05"
                value={learningRate}
                onChange={e => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {isConverged && (
              <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs text-emerald-300 font-bold animate-in fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  Global minimum reached! Model loss has converged to {currentLoss.toFixed(3)}.
                </span>
                <span className="text-amber-300 font-bold">+30 XP</span>
              </div>
            )}
          </div>

          {/* Practice Question */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  Skill Challenge
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mt-2">
                  {profile.practice.question || profile.practice.q}
                </h3>
              </div>
              <button
                onClick={() => setShowHint(h => !h)}
                className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all flex items-center gap-1"
              >
                <Lightbulb size={12} /> {showHint ? 'Hide Hint' : 'Need Hint?'}
              </button>
            </div>

            {showHint && profile.practice.hint && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl font-medium">
                💡 <strong>Hint:</strong> {profile.practice.hint}
              </div>
            )}

            <div className="space-y-2.5">
              {(profile.practice.options || profile.practice.opts || []).map((opt, idx) => {
                const isSelected = selectedPracticeOpt === idx
                const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPractice(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ${
                      practiceAnswered && isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : practiceAnswered && isCorrect
                        ? 'border-emerald-400 bg-emerald-50/60 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:border-purple-400 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {practiceAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                  </button>
                )
              })}
            </div>

            {practiceAnswered && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-950 space-y-1">
                <span className="font-bold">Explanation:</span>
                <p>{profile.practice.explanation || profile.practice.exp}</p>
              </div>
            )}
          </div>

          {/* 3 Core Takeaways */}
          <div className="bg-gradient-to-r from-slate-900 to-purple-950 text-white p-6 rounded-3xl border border-purple-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-purple-300">
              📌 Key Takeaways for {topicTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {profile.takeaways.map((tk, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-purple-100 font-medium leading-relaxed">
                  ✓ {tk}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
