import React, { useState } from 'react'
import {
  Compass, CheckCircle2, AlertTriangle, Sparkles,
  ChevronRight, Activity, ArrowRight, Lightbulb, HelpCircle
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'

export const ScenarioExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  chapterTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null)
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null)
  const [mcqSubmitted, setMcqSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const estMinutes = canonicalSection.estimatedMinutes || 15
  const xpReward = canonicalSection.xpReward || 20

  // Real-world scenario branches
  const scenarioBranches = [
    {
      id: 0,
      title: 'Strategy Alpha: High-Speed Edge Inference',
      description: 'Quantize neural network weights to 8-bit integers and deploy directly on mobile edge microcontrollers.',
      tradeOffs: {
        speed: '98% (Ultra Fast)',
        accuracy: '91% (Slight drop on edge cases)',
        privacy: '100% (Zero cloud data transmission)',
      },
      evaluation: 'Excellent for safety-critical real-time edge devices where milliseconds prevent accidents.',
      badge: 'Edge Optimized',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 1,
      title: 'Strategy Beta: Centralized Cloud Ensemble',
      description: 'Stream full telemetry to a massive multi-GPU cloud cluster running a 100-billion parameter ensemble.',
      tradeOffs: {
        speed: '65% (180ms network latency)',
        accuracy: '99.4% (State of the art)',
        privacy: '75% (Encrypted transit required)',
      },
      evaluation: 'Ideal for non-time-critical forensic analytics and deep diagnostic reporting, but vulnerable to internet disconnects.',
      badge: 'Max Accuracy',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 2,
      title: 'Strategy Gamma: Hybrid Fallback Architecture',
      description: 'Run lightweight fast inference locally; trigger cloud ensemble validation only when confidence falls below 85%.',
      tradeOffs: {
        speed: '94% (Near instant for common cases)',
        accuracy: '98.8% (Cloud verification on ambiguous cases)',
        privacy: '92% (Only difficult edge cases shared)',
      },
      evaluation: 'The industry-standard production balance: resilient against network outages with near-zero latency for 90% of requests.',
      badge: 'Balanced Industry Standard (Recommended)',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ]

  // Knowledge check MCQ from Content Manager or curriculum
  const mcq = canonicalSection.mcq || {
    question: `When designing real-world systems around ${topicTitle}, what is the primary risk of relying solely on offline training metrics?`,
    options: [
      `The model may overfit to past training conditions and fail to generalize when encountering novel real-world distributions (distribution shift).`,
      `The computer battery will instantly drain to zero percent.`,
      `Mathematical formulas change their definitions every morning.`,
      `Network routers will refuse to transmit the packets.`,
    ],
    correctIndex: 0,
    hint: `Consider how changing weather, lighting, or user behavior creates scenarios the training dataset never included.`,
    explanation: `Distribution shift occurs when live real-world inputs deviate from historical training distributions. Production systems must implement continuous monitoring and anomaly detection.`,
  }

  const handleSelectBranch = (idx: number) => {
    gameAudio.playTap()
    setSelectedBranch(idx)
  }

  const handleSelectMcq = (idx: number) => {
    if (mcqSubmitted) return
    setMcqAnswer(idx)
    setMcqSubmitted(true)
    if (idx === mcq.correctIndex) {
      gameAudio.playSuccess()
      if (!isCompleted) {
        onComplete()
        gamification.launchConfetti()
      }
    } else {
      gameAudio.playWrong()
    }
  }

  const readyToAdvance = isCompleted || (selectedBranch !== null && mcqSubmitted && mcqAnswer === mcq.correctIndex)

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToAdvance && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(3) // Advance to Section 4 (Worksheet)
  }

  const activeScenario = selectedBranch !== null ? scenarioBranches[selectedBranch] : null

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Scenario Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/60 mb-2">
            <Compass size={13} className="text-amber-600" />
            <span>Section 3 · Scenario & Problem-Solving Experience (Lesson 2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Real-World Scenario Challenge: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {canonicalSection.description ||
              `Step into the role of a Lead Systems Architect. Analyze the mission case study, choose your strategy, and evaluate technical trade-offs.`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            <Activity size={14} className="text-slate-500" />
            <span>{estMinutes} Mins</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Sparkles size={14} className="text-amber-600" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Resolved</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Header Banner Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'lesson2'}
        sectionNumber={3}
        contentType="lesson"
        position="header"
      />

      {/* Mission Scenario Briefing Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest border border-amber-400/30 flex items-center gap-1.5">
            <AlertTriangle size={13} className="text-amber-400" />
            Mission Dilemma Briefing
          </span>
          <span className="text-xs text-slate-300 font-mono">Incident Simulation ID: SYS-{chapterTitle.replace(/\s+/g, '-').slice(0, 10).toUpperCase()}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          System Deployment Crisis: Optimizing {topicTitle} Under Pressure
        </h2>

        <p className="text-sm text-slate-200 leading-relaxed max-w-4xl">
          Your organization is deploying an autonomous decision pipeline utilizing <strong>{topicTitle}</strong> across 50,000 active nodes. During peak load, sensor noise spikes unexpectedly by 28%, causing inference latency to exceed safety thresholds. As Lead Engineer, you must select the optimal deployment architecture to safeguard users without crippling accuracy.
        </p>
      </div>

      {/* 2. After Intro / Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'lesson2'}
        sectionNumber={3}
        contentType="lesson"
        position="after_hook"
      />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Branching Decisions & Consequence Analysis */}
        <div className="lg:col-span-7 space-y-4">
          {/* 3. Mid-Lesson Diagram Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson2'}
            sectionNumber={3}
            contentType="lesson"
            position="mid_lesson"
          />

          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ArrowRight size={18} className="text-amber-600" />
            <span>Step 1: Choose Your Architecture Strategy</span>
          </h3>

          {/* Decision Cards */}
          <div className="space-y-3">
            {scenarioBranches.map((branch, idx) => {
              const isSelected = selectedBranch === idx
              return (
                <div
                  key={branch.id}
                  onClick={() => handleSelectBranch(idx)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-300/60'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900">{branch.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${branch.badgeColor}`}>
                      {branch.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{branch.description}</p>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase">Speed</span>
                      <strong className="text-xs text-slate-800 font-mono">{branch.tradeOffs.speed}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
                      <strong className="text-xs text-slate-800 font-mono">{branch.tradeOffs.accuracy}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase">Privacy</span>
                      <strong className="text-xs text-slate-800 font-mono">{branch.tradeOffs.privacy}</strong>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Real-Time Consequence Feedback Simulator */}
          {activeScenario && (
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Lightbulb size={16} className="text-amber-600" />
                <span>Systems Evaluation Result: {activeScenario.title}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeScenario.evaluation}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Knowledge Check MCQ & Section Advance */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4. Activity / Task Diagram Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson2'}
            sectionNumber={3}
            contentType="lesson"
            position="activity"
          />

          {/* Knowledge Check MCQ Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Step 2: Verification</span>
                <h3 className="text-base font-bold text-slate-900">Scenario Knowledge Check</h3>
              </div>
              {mcqSubmitted && mcqAnswer === mcq.correctIndex && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Passed ✓
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              {mcq.question}
            </p>

            <div className="space-y-2">
              {mcq.options.map((opt: string, idx: number) => {
                const isSelected = mcqAnswer === idx
                const isCorrect = idx === mcq.correctIndex
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                if (mcqSubmitted) {
                  if (isSelected && isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-900'
                  } else if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectMcq(idx)}
                    disabled={mcqSubmitted}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {/* Hint Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <HelpCircle size={13} />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
              {showHint && (
                <p className="mt-2 text-xs text-slate-600 p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                  💡 {mcq.hint}
                </p>
              )}
            </div>

            {mcqSubmitted && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong>Pedagogical Insight:</strong> {mcq.explanation}
              </div>
            )}
          </div>

          {/* 5. Bottom Takeaway / Summary Visual Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson2'}
            sectionNumber={3}
            contentType="lesson"
            position="bottom_summary"
          />

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-100 uppercase tracking-wider">
                Section 3 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToAdvance ? 'Challenge Complete' : 'In Progress'}
              </span>
            </div>

            <p className="text-xs text-amber-50 leading-relaxed">
              {readyToAdvance || isCompleted
                ? 'Mission resolved! You evaluated the trade-offs and verified the scenario question. Continue to the Interactive Workbook.'
                : 'Explore the scenario strategies or proceed directly to the Interactive Workbook at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-orange-700 hover:bg-orange-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Worksheet: Interactive Workbook</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
