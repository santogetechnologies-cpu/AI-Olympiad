import { useState } from 'react'
import {
  Brain, Sliders, Play, CheckCircle, Check, Sparkles, Volume2, ShieldCheck
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface PGResearchOptimizationProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  simulationCode?: string
  onComplete?: () => void
}

export function PGResearchOptimizationExperience({
  chapterNum,
  topicTitle,
  lessonNumber,
  onComplete,
}: PGResearchOptimizationProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})

  // Game Mini-Game 1: AI Safety vs Speed Dial
  const [safetyWeight, setSafetyWeight] = useState(80)
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [scenarioResults, setScenarioResults] = useState<Record<number, boolean>>({})

  // Game Mini-Game 2: Real-time Benchmark
  const [benchRunning, setBenchRunning] = useState(false)
  const [benchCompleted, setBenchCompleted] = useState(false)

  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)

  const dilemmaScenarios = [
    {
      title: '🚑 Self-Driving Ambulance Dilemma',
      desc: 'An AI vehicle must quickly navigate heavy city traffic to reach the hospital safely.',
      safeOption: 'Prioritize dedicated safety corridors and siren beacons.',
      creativeOption: 'Take unpaved shortcuts through pedestrian parks.'
    },
    {
      title: '🏥 Medical Diagnostic Assistant',
      desc: 'AI detects a rare condition from an X-ray. Should it auto-prescribe medicine or alert human doctors?',
      safeOption: 'Flag the anomaly for doctor review with confidence notes.',
      creativeOption: 'Directly dispense medications without human sign-off.'
    },
    {
      title: '🔒 Cyber Identity Protector',
      desc: 'A suspicious login attempt is detected at 3 AM from another continent.',
      safeOption: 'Send an instant biometric challenge and temporarily lock sensitive actions.',
      creativeOption: 'Assume it might be the user traveling and do nothing.'
    }
  ]

  const handleTestScenario = (idx: number, isSafe: boolean) => {
    gameAudio.playTap()
    setScenarioResults(prev => ({ ...prev, [idx]: true }))
    if (isSafe) {
      gameAudio.playSuccess()
      gamification.addXP(20, undefined, `pg-safe-${idx}`)
      toast.success('🛡️ Safe, ethical AI decision validated! +20 XP', { icon: '🌟' })
    } else {
      gameAudio.playHit()
      toast.error('Too risky! AI systems must always prioritize human safety.')
    }
  }

  const handleRunAblation = async () => {
    gameAudio.playTap()
    setBenchRunning(true)
    await new Promise(r => setTimeout(r, 500))
    setBenchRunning(false)
    setBenchCompleted(true)
    gameAudio.playVictory()
    gamification.addXP(35, undefined, `pg-ablation-${cNum}`)
    gamification.launchConfetti()
    toast.success('🏆 Frontier AI Model Verified with 99.4% Safety! +35 XP', { icon: '🔬' })
    if (onComplete) onComplete()
  }

  const handleMatchPair = (id: string) => {
    gameAudio.playTap()
    if (matchedPairs[id]) return
    const next = { ...matchedPairs, [id]: true }
    setMatchedPairs(next)
    if (Object.keys(next).length === profile.pairs.length) {
      gameAudio.playSuccess()
      gamification.addXP(25, undefined, `pg-pairs-${cNum}-${lessonNumber}`)
      toast.success('🧩 All AI Frontier concepts matched! +25 XP', { icon: '🏆' })
    }
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gameAudio.playSuccess()
      gamification.addXP(20, undefined, `pg-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Outstanding research intuition! +20 XP', { icon: '🎉' })
    } else {
      gameAudio.playHit()
      toast.error('Re-examine the scenario and try again!')
    }
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* ── 1. MISSION HERO CARD ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white p-5 rounded-3xl border-2 border-purple-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Brain size={13} className="text-purple-400" /> AI Frontier Mission
          </span>
          <span className="text-[11px] font-bold text-slate-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
            Chapter {cNum}
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {lessonNumber === 1 ? '🛡️ AI Safety & Decision Lab' : '⚡ High-Performance AI Benchmark'}
          </h2>
          <p className="text-xs text-purple-200 mt-1 font-medium leading-relaxed">
            {profile.goal || 'Tune AI ethics, prevent hallucination, and benchmark real-world decision models.'}
          </p>
        </div>

        {/* Real life analogy */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-start gap-2.5">
          <span className="text-xl flex-shrink-0">💡</span>
          <div className="text-xs text-purple-100">
            <span className="font-bold text-amber-300">Everyday Example: </span>
            {profile.analogy || 'Like safety air-bags and anti-lock brakes in modern cars, AI needs built-in guardrails!'}
          </div>
        </div>

        <button
          onClick={() => gameAudio.speak(`${topicTitle}. ${profile.goal}`)}
          className="inline-flex items-center gap-1 text-[11px] text-purple-300 hover:text-white font-bold transition-colors"
        >
          <Volume2 size={13} /> Tap to hear audio brief
        </button>
      </div>

      {/* ── 2. MINI-GAME: AI ETHICS & SAFETY DILEMMA MATRIX ── */}
      {lessonNumber === 1 && (
        <div className="bg-white rounded-3xl border-2 border-purple-100 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-purple-600" />
              <span>Mini-Game: Safety Guardrail Slider</span>
            </h3>
            <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              {safetyWeight}% Guardrails
            </span>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">Safety Filter Strength:</span>
              <span className="font-mono text-purple-300 font-bold">{safetyWeight}% Strict</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={safetyWeight}
              onChange={e => {
                setSafetyWeight(Number(e.target.value))
                gameAudio.playTap()
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Dilemma cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Test AI Dilemma Scenario:</span>
              <div className="flex gap-1.5">
                {dilemmaScenarios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      gameAudio.playTap()
                      setActiveScenarioIdx(i)
                    }}
                    className={`w-6 h-6 rounded-full text-xs font-black ${
                      activeScenarioIdx === i ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2.5">
              <h4 className="text-xs font-bold text-purple-950">
                {dilemmaScenarios[activeScenarioIdx].title}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {dilemmaScenarios[activeScenarioIdx].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleTestScenario(activeScenarioIdx, true)}
                  className="p-2.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-left text-xs font-bold text-emerald-950 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                  <span>{dilemmaScenarios[activeScenarioIdx].safeOption}</span>
                </button>
                <button
                  onClick={() => handleTestScenario(activeScenarioIdx, false)}
                  className="p-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-left text-xs font-medium text-rose-900 transition-all flex items-center gap-1.5 opacity-80"
                >
                  <span>⚠️</span>
                  <span>{dilemmaScenarios[activeScenarioIdx].creativeOption}</span>
                </button>
              </div>

              {scenarioResults[activeScenarioIdx] && (
                <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  ✓ Verified by Safety Guardrails!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. MINI-GAME: FRONTIER SPEED & ACCURACY RUNNER ── */}
      {lessonNumber === 2 && (
        <div className="bg-white rounded-3xl border-2 border-purple-100 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Sliders size={16} className="text-purple-600" />
              <span>Mini-Game: Frontier Benchmark</span>
            </h3>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              99.4% Accuracy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-center">
              <span className="text-[10px] uppercase font-bold text-purple-700 block">Response Latency</span>
              <span className="text-base font-black text-purple-950">14ms</span>
              <span className="text-[10px] text-emerald-600 font-bold block">⚡ Real-time</span>
            </div>
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-700 block">Safety Score</span>
              <span className="text-base font-black text-indigo-950">100 / 100</span>
              <span className="text-[10px] text-emerald-600 font-bold block">🛡️ Safe</span>
            </div>
          </div>

          <Button
            onClick={handleRunAblation}
            loading={benchRunning}
            disabled={benchCompleted}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
          >
            {benchCompleted ? '✓ Frontier Model Benchmark Passed! (+35 XP)' : '🚀 Run Full AI Benchmark'}
          </Button>
        </div>
      )}

      {/* ── 4. TAP-THROUGH 3-STEP MISSION INTEL ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Brain size={14} className="text-purple-600" />
            <span>Research Intel Cards</span>
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Card {activeStepIdx + 1} of {steps.length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
              {activeStepIdx + 1}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-purple-950">
              {steps[activeStepIdx]?.title || 'Core Rule'}
            </h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {steps[activeStepIdx]?.desc || 'Modern AI balances lightning speed with strict ethical guardrails.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setActiveStepIdx(idx)
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeStepIdx === idx
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Card {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. PUZZLE MATCHING CHALLENGE ── */}
      {profile.pairs && profile.pairs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Tap &amp; Match Concepts</span>
            </h3>
            <span className="text-[11px] font-bold text-purple-600">
              {Object.keys(matchedPairs).length}/{profile.pairs.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {profile.pairs.map(pair => {
              const isMatched = Boolean(matchedPairs[pair.id])
              return (
                <button
                  key={pair.id}
                  onClick={() => handleMatchPair(pair.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    isMatched ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isMatched ? <Check size={12} /> : '•'}
                  </div>
                  <div>
                    <span className="text-xs font-black block">{pair.term}</span>
                    <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">{pair.definition}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── 6. QUICK MISSION PRACTICE CHOICE ── */}
      {profile.practice && (profile.practice.options || profile.practice.opts) && (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Play size={13} className="text-rose-500 fill-rose-500" />
            <span>Mission Checkpoint</span>
          </span>

          <p className="text-xs sm:text-sm font-bold text-slate-900">
            {profile.practice.question || profile.practice.q || 'What is the primary role of AI safety guardrails?'}
          </p>

          <div className="space-y-2">
            {(profile.practice.options || profile.practice.opts || []).map((opt, idx) => {
              const isSelected = selectedPracticeOpt === idx
              const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
              const showResult = practiceAnswered && isSelected

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPractice(idx)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-rose-100 border-rose-300 text-rose-950'
                      : isSelected
                      ? 'bg-purple-50 border-purple-400 text-purple-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{opt}</span>
                  {showResult && (
                    <span>{isCorrect ? '✓' : '✗'}</span>
                  )}
                </button>
              )
            })}
          </div>

          {practiceAnswered && (
            <p className="text-[11px] text-purple-700 bg-purple-50 p-2.5 rounded-xl border border-purple-100 font-medium">
              💡 {profile.practice.explanation || profile.practice.exp || 'AI safety guardrails ensure systems act reliably and ethically!'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
