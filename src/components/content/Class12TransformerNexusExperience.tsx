import { useState } from 'react'
import {
  Sparkles, CheckCircle, Check, Bot, Lightbulb
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface Class12TransformerNexusProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: 1 | 2
  hookQuestion?: string
  onComplete?: () => void
}

export function Class12TransformerNexusExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete: _onComplete,
}: Class12TransformerNexusProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Lesson 1: Self-Attention Heatmap State
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(6) // default "it"
  const tokens = ["The", "robot", "charged", "its", "battery", "because", "it", "was", "low"]

  // Lesson 2: Generative Token Probability & Temperature State
  const [temperature, setTemperature] = useState(0.7)
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([])
  const [sampleRunning, setSampleRunning] = useState(false)
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSampleToken = async () => {
    setSampleRunning(true)
    await new Promise(r => setTimeout(r, 400))
    const candidates = ['thinks', 'reasons', 'learns', 'creates', 'acts']
    const nextWord = candidates[Math.floor(Math.random() * candidates.length)]
    setGeneratedTokens(prev => [...prev, nextWord])
    setSampleRunning(false)
    gamification.addXP(15, undefined, `cls12-token-sample-${cNum}`)
    toast.success(`✨ Token "${nextWord}" sampled with temp=${temperature}!`, { icon: '🤖' })
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gamification.addXP(20, undefined, `cls12-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Correct Transformer & GenAI reasoning! +20 XP', { icon: '🎉' })
    } else {
      toast.error('Check the concept details and try again!')
    }
  }

  const handleMatchPair = (id: string) => {
    setMatchedPairs(prev => {
      const next = { ...prev, [id]: true }
      if (Object.keys(next).length === profile.pairs.length) {
        gamification.addXP(25, undefined, `cls12-pairs-${cNum}-${lessonNumber}`)
        toast.success('🧩 All Transformer concepts matched! +25 XP', { icon: '🏆' })
      }
      return next
    })
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Grade Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-fuchsia-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Sparkles size={14} className="text-fuchsia-400" /> Class 12: Transformer Nexus &amp; Generative AI Lab
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-400/30">
              {lessonNumber === 1 ? '✨ Mode: Architecture &amp; Foundations' : '🤖 Mode: Applied GenAI &amp; Workflows'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-fuchsia-300 bg-black/40 px-3 py-1 rounded-xl border border-fuchsia-500/40">
            Chapter {cNum} • Generative AI
          </span>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-fuchsia-100/90 mt-1 font-medium">
            {profile.goal}
          </p>
        </div>

        {/* Thought Hook */}
        <div className="mt-4 p-3.5 bg-fuchsia-900/40 border border-fuchsia-400/30 rounded-2xl flex items-start gap-3 relative z-10">
          <Lightbulb size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-fuchsia-100 font-medium">
            <strong className="text-amber-300 font-bold">Inquiry Starter: </strong>
            {profile.hook}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: TRANSFORMER ARCHITECTURE & STEP BREAKDOWN                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Everyday Analogy */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider mb-2">
              <span>💡 Real-World Intuition &amp; Analogy</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {profile.analogy}
            </p>
          </div>

          {/* 3 Step Concept Progression */}
          <div className="bg-white rounded-3xl border-2 border-fuchsia-100 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>✨ 3-Stage Generative AI Pipeline</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Follow how {topicTitle} operates end-to-end.
                </p>
              </div>
              <span className="text-xs font-bold text-fuchsia-700 bg-fuchsia-50 px-3 py-1 rounded-xl">
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
                      ? 'border-fuchsia-500 bg-fuchsia-50/70 shadow-sm scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-fuchsia-700 bg-fuchsia-100/80 px-2 py-0.5 rounded-md">
                      Stage {idx + 1}
                    </span>
                    {activeStepIdx === idx && <Check size={14} className="text-fuchsia-600 font-bold" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{st.desc}</p>
                </button>
              ))}
            </div>

            {/* Interactive Multi-Head Self-Attention Heatmap */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 border border-fuchsia-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                <span className="text-xs font-bold text-fuchsia-300 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-fuchsia-400" /> Interactive Self-Attention Matrix
                </span>
                <span className="text-[11px] font-mono text-slate-400">Tap any token to inspect attention weights</span>
              </div>

              {/* Token Chips */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                {tokens.map((tok, idx) => {
                  const isQuery = selectedTokenIdx === idx
                  // Calculate dynamic attention weight towards "robot" and "battery" if "it" is selected
                  let weight = 0.05
                  if (selectedTokenIdx === 6) { // "it"
                    if (tok === 'robot') weight = 0.74
                    else if (tok === 'battery') weight = 0.16
                    else if (tok === 'charged') weight = 0.05
                  } else if (selectedTokenIdx === 2) { // "charged"
                    if (tok === 'battery') weight = 0.65
                    else if (tok === 'robot') weight = 0.25
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTokenIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isQuery
                          ? 'bg-fuchsia-600 text-white shadow-lg ring-2 ring-fuchsia-400 scale-105'
                          : weight > 0.3
                          ? 'bg-fuchsia-950 text-fuchsia-200 border border-fuchsia-500/60'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span>{tok}</span>
                      {!isQuery && weight > 0.1 && (
                        <span className="text-[10px] bg-fuchsia-500/20 text-fuchsia-300 px-1 rounded">
                          {(weight * 100).toFixed(0)}%
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>
                  Query Token: <strong className="text-fuchsia-300 font-mono font-bold">"{tokens[selectedTokenIdx]}"</strong>
                </span>
                <span className="text-slate-400 text-[11px]">
                  Self-Attention relates pronouns to their true real-world entity!
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
                    <span>🧩 Match Transformer &amp; GenAI Terminology</span>
                  </h3>
                  <p className="text-xs text-slate-500">Connect each principle with its definition!</p>
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
                        : 'border-slate-200 bg-slate-50 hover:border-fuchsia-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-fuchsia-950">{p.term}</span>
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
      {/* LESSON 2: GENAI SIMULATION SANDBOX & PRACTICE CHALLENGE              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Real World Scenario */}
          <div className="bg-white rounded-3xl border-2 border-fuchsia-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🌍 Real-World Application Scenario</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {profile.realScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.useCases.map((uc, i) => (
                <div key={i} className="p-3 bg-fuchsia-50/70 border border-fuchsia-200/70 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-fuchsia-700 tracking-wider">Use Case #{i + 1}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{uc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Interactive Generative Token Probability Studio ── */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-fuchsia-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-fuchsia-400" />
                <div>
                  <h4 className="font-bold text-sm text-fuchsia-300">Generative Token Sampling Studio</h4>
                  <p className="text-[11px] text-slate-400">Adjust temperature to balance certainty vs creative exploration</p>
                </div>
              </div>

              <Button
                onClick={handleSampleToken}
                disabled={sampleRunning}
                variant="primary"
                className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Sparkles size={13} className={sampleRunning ? 'animate-spin' : ''} />
                <span>Sample Next Token ▶</span>
              </Button>
            </div>

            {/* Prompt & Generated Stream */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Input Prompt &amp; Stream:</span>
              <p className="text-sm font-mono text-slate-200 leading-relaxed">
                "An artificial neural network <strong className="text-fuchsia-400 font-bold">learns</strong> representations and "
                {generatedTokens.map((tok, i) => (
                  <span key={i} className="inline-block bg-fuchsia-600/30 text-fuchsia-300 px-1.5 py-0.5 rounded mx-1 font-bold text-xs animate-in zoom-in-95">
                    {tok}
                  </span>
                ))}
                <span className="inline-block w-2 h-4 bg-fuchsia-400 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Sampling Temperature (T):</span>
                <span className="font-mono text-fuchsia-300 font-bold">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.2"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.1 (Strict / Focused)</span>
                <span>0.7 (Balanced / Natural)</span>
                <span>1.2 (High Entropy / Creative)</span>
              </div>
            </div>
          </div>

          {/* Practice Question */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-fuchsia-700 bg-fuchsia-50 px-2.5 py-1 rounded-full">
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
                        : 'border-slate-200 bg-slate-50 hover:border-fuchsia-400 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {practiceAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                  </button>
                )
              })}
            </div>

            {practiceAnswered && (
              <div className="p-4 bg-fuchsia-50 border border-fuchsia-200 rounded-2xl text-xs text-fuchsia-950 space-y-1">
                <span className="font-bold">Explanation:</span>
                <p>{profile.practice.explanation || profile.practice.exp}</p>
              </div>
            )}
          </div>

          {/* 3 Core Takeaways */}
          <div className="bg-gradient-to-r from-slate-900 to-fuchsia-950 text-white p-6 rounded-3xl border border-fuchsia-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-fuchsia-300">
              📌 Key Takeaways for {topicTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {profile.takeaways.map((tk, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-fuchsia-100 font-medium leading-relaxed">
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
