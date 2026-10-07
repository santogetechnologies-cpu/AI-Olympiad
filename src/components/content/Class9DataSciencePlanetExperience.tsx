import { useState } from 'react'
import {
  BarChart3, Shield, CheckCircle,
  Play, Check, TrendingUp, Lightbulb
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface Class9DataSciencePlanetProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: 1 | 2
  hookQuestion?: string
  onComplete?: () => void
}

export function Class9DataSciencePlanetExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete: _onComplete,
}: Class9DataSciencePlanetProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Lesson 1: Scatter Telemetry & Outlier Filter State
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})
  const [showTrendline, setShowTrendline] = useState(true)
  const [filterOutlier, setFilterOutlier] = useState(false)

  // Lesson 2: Fairness Audit & Decision Threshold State
  const [fairnessThreshold, setFairnessThreshold] = useState(0.70)
  const [auditRunning, setAuditRunning] = useState(false)
  const [auditCompleted, setAuditCompleted] = useState(false)
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gamification.addXP(20, undefined, `cls9-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Correct statistical reasoning! +20 XP', { icon: '🎉' })
    } else {
      toast.error('Check the concept details and try again!')
    }
  }

  const handleMatchPair = (id: string) => {
    if (matchedPairs[id]) return
    const next = { ...matchedPairs, [id]: true }
    setMatchedPairs(next)
    if (Object.keys(next).length === profile.pairs.length) {
      gamification.addXP(25, undefined, `cls9-pairs-${cNum}-${lessonNumber}`)
      toast.success('🧩 All data science pairs matched! +25 XP', { icon: '🏆' })
    }
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Grade Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-blue-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <BarChart3 size={14} className="text-blue-400" /> Class 9: Data Science Planet &amp; Statistical Learning
            </span>
            <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-400/30">
              {lessonNumber === 1 ? '📊 Mode: Statistical Discovery & Pipeline' : '🛡️ Mode: Applied Data Engineering & Lab'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-teal-300 bg-black/40 px-3 py-1 rounded-xl border border-teal-500/40">
            Chapter {cNum} • Applied Statistics
          </span>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 font-medium">
            {profile.goal}
          </p>
        </div>

        {/* Thought Hook */}
        <div className="mt-4 p-3.5 bg-blue-900/40 border border-blue-400/30 rounded-2xl flex items-start gap-3 relative z-10">
          <Lightbulb size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-100 font-medium">
            <strong className="text-amber-300 font-bold">Inquiry Question: </strong>
            {profile.hook}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: DATA CONCEPT BREAKDOWN & PIPELINE                         */}
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

          {/* 3 Step Concept Pipeline */}
          <div className="bg-white rounded-3xl border-2 border-blue-100 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>🔬 3-Stage Statistical Flow</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Understand the exact stages behind {topicTitle}.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl">
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
                      ? 'border-blue-500 bg-blue-50/70 shadow-sm scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                      Stage {idx + 1}
                    </span>
                    {activeStepIdx === idx && <Check size={14} className="text-blue-600 font-bold" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{st.desc}</p>
                </button>
              ))}
            </div>

            {/* Interactive Data Scatter & Trendline Studio */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 border border-teal-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-teal-400" /> Live Scatter Telemetry &amp; Regression
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTrendline(t => !t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      showTrendline ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {showTrendline ? '✓ Trendline Active' : '+ Show Trendline'}
                  </button>
                  <button
                    onClick={() => setFilterOutlier(f => !f)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      filterOutlier ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {filterOutlier ? '✓ Outliers Cleaned' : 'Clean Noise'}
                  </button>
                </div>
              </div>

              {/* Visual Scatter Grid */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="h-28 relative border-b border-l border-slate-700 flex items-end justify-between px-3 pb-1">
                  {[
                    { x: 1, y: 20, isOutlier: false },
                    { x: 2, y: 35, isOutlier: false },
                    { x: 3, y: 50, isOutlier: false },
                    { x: 4, y: 95, isOutlier: true },
                    { x: 5, y: 72, isOutlier: false },
                  ].map((pt, i) => {
                    if (filterOutlier && pt.isOutlier) return null
                    return (
                      <div
                        key={i}
                        style={{ height: `${pt.y}%` }}
                        className="flex flex-col items-center justify-start group"
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all transform duration-300 ${
                          pt.isOutlier
                            ? 'bg-rose-500 border-rose-300 shadow-md shadow-rose-500/50'
                            : 'bg-teal-400 border-teal-200'
                        }`} />
                        <span className="text-[9px] font-mono text-slate-400 mt-1">({pt.x}h,{pt.y}%)</span>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <span>Correlation Coefficient: <strong className="text-teal-400 font-mono">{filterOutlier ? 'r = 0.98 (Very Strong)' : 'r = 0.74 (Distorted)'}</strong></span>
                  <span className="text-[11px] text-slate-400">{filterOutlier ? 'Clean Model Fit ✓' : 'Noise Point Detected ⚠️'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Term Matcher */}
          {profile.pairs && profile.pairs.length > 0 && (
            <div className="bg-white rounded-3xl border-2 border-teal-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>🧩 Match Data Science Terminology</span>
                  </h3>
                  <p className="text-xs text-slate-500">Connect each principle with its meaning!</p>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-xl">
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
                        : 'border-slate-200 bg-slate-50 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-teal-950">{p.term}</span>
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
      {/* LESSON 2: DATA PIPELINE SANDBOX & PRACTICE CHALLENGE                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Real World Scenario */}
          <div className="bg-white rounded-3xl border-2 border-blue-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🌍 Real-World Application Scenario</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {profile.realScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.useCases.map((uc, i) => (
                <div key={i} className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Use Case #{i + 1}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{uc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Interactive Model Fairness & Bias Audit Workbench ── */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-teal-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-teal-400" />
                <div>
                  <h4 className="font-bold text-sm text-teal-300">Algorithmic Fairness &amp; Bias Audit</h4>
                  <p className="text-[11px] text-slate-400">Test how threshold calibration impacts diverse sub-populations</p>
                </div>
              </div>

              <Button
                onClick={async () => {
                  setAuditRunning(true)
                  await new Promise(r => setTimeout(r, 600))
                  setAuditRunning(false)
                  setAuditCompleted(true)
                  gamification.addXP(30, undefined, `cls9-audit-${cNum}`)
                  toast.success('🛡️ Fairness Audit Completed! Parity Verified! +30 XP', { icon: '⚖️' })
                }}
                disabled={auditRunning}
                variant="primary"
                className="bg-teal-600 hover:bg-teal-500 text-white font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Play size={13} className={auditRunning ? 'animate-spin' : ''} />
                <span>{auditRunning ? 'Auditing Model...' : 'Run Fairness Audit ▶'}</span>
              </Button>
            </div>

            {/* Threshold Slider */}
            <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Model Approval Threshold:</span>
                <span className="font-mono text-teal-300 font-bold text-sm">{(fairnessThreshold * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="0.90"
                step="0.05"
                value={fairnessThreshold}
                onChange={e => setFairnessThreshold(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Candidate Evaluation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Profile A', score: 0.88, group: 'Traditional Background', reason: 'High formal metrics' },
                { name: 'Profile B', score: 0.74, group: 'Non-Traditional Route', reason: 'Strong project portfolio' },
                { name: 'Profile C', score: 0.62, group: 'Emerging Talent Pool', reason: 'High growth velocity' },
              ].map((cand, idx) => {
                const passed = cand.score >= fairnessThreshold
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border-2 transition-all ${
                      passed
                        ? 'bg-emerald-500/10 border-emerald-400 text-emerald-200'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">{cand.name}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        passed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {passed ? 'QUALIFIED' : 'FILTERED'}
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-300 block">{cand.group}</span>
                    <span className="text-xs font-mono font-bold mt-1 block">Fit Score: {(cand.score * 100).toFixed(0)}%</span>
                    <p className="text-[11px] text-slate-400 mt-1">{cand.reason}</p>
                  </div>
                )
              })}
            </div>

            {auditCompleted && (
              <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs text-emerald-300 font-bold animate-in fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  Audit verified! Demographic parity difference &lt; 5%. Model meets ethical deployment standards.
                </span>
                <span className="text-amber-300">+30 XP</span>
              </div>
            )}
          </div>

          {/* Practice Question */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
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
                        : 'border-slate-200 bg-slate-50 hover:border-blue-400 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {practiceAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                  </button>
                )
              })}
            </div>

            {practiceAnswered && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-1">
                <span className="font-bold">Explanation:</span>
                <p>{profile.practice.explanation || profile.practice.exp}</p>
              </div>
            )}
          </div>

          {/* 3 Core Takeaways */}
          <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white p-6 rounded-3xl border border-teal-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-300">
              📌 Key Takeaways for {topicTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {profile.takeaways.map((tk, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-teal-100 font-medium leading-relaxed">
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
