import React, { useState } from 'react'
import {
  FlaskConical, CheckCircle2, Play, Sliders,
  Sparkles, ChevronRight, Activity, Lock, Unlock
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'

export const DiscoveryLabExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  // Live simulation interactive parameters
  const [sampleSize, setSampleSize] = useState(2500)
  const [complexityLayers, setComplexityLayers] = useState(3)
  const [noiseLevel, setNoiseLevel] = useState(15)
  const [regularization, setRegularization] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [simResults, setSimResults] = useState<{
    trainAcc: number
    valAcc: number
    latency: number
    status: 'optimal' | 'overfitting' | 'underfitting'
  }>({
    trainAcc: 94.2,
    valAcc: 92.5,
    latency: 14,
    status: 'optimal',
  })

  // Unlocked discovery notes
  const [unlockedDiscoveries, setUnlockedDiscoveries] = useState<number[]>([0])

  const estMinutes = canonicalSection.estimatedMinutes || 15
  const xpReward = canonicalSection.xpReward || 20

  const handleRunSimulation = () => {
    setIsRunning(true)
    gameAudio.playTap()

    setTimeout(() => {
      // Calculate realistic neural metrics based on parameters
      let train = 80 + complexityLayers * 2.5 + (sampleSize / 1000) * 0.8
      let val = train - (noiseLevel * 0.4) - (complexityLayers > 5 && !regularization ? 12 : 0)

      train = Math.min(99.4, Math.max(60, train))
      val = Math.min(98.2, Math.max(50, val))

      let status: 'optimal' | 'overfitting' | 'underfitting' = 'optimal'
      if (complexityLayers <= 1) {
        status = 'underfitting'
      } else if (train - val > 8) {
        status = 'overfitting'
      }

      setSimResults({
        trainAcc: parseFloat(train.toFixed(1)),
        valAcc: parseFloat(val.toFixed(1)),
        latency: 8 + complexityLayers * 3,
        status,
      })
      setIsRunning(false)
      gameAudio.playSuccess()

      // Unlock discoveries based on experiments
      if (status === 'underfitting' && !unlockedDiscoveries.includes(1)) {
        setUnlockedDiscoveries(prev => [...prev, 1])
      }
      if (status === 'overfitting' && !unlockedDiscoveries.includes(2)) {
        setUnlockedDiscoveries(prev => [...prev, 2])
      }
      if (status === 'optimal' && complexityLayers >= 3 && !unlockedDiscoveries.includes(3)) {
        setUnlockedDiscoveries(prev => [...prev, 3])
      }

      if (unlockedDiscoveries.length >= 2 && !isCompleted) {
        onComplete()
        gamification.launchConfetti()
      }
    }, 600)
  }

  const discoveries = [
    {
      id: 0,
      title: 'Baseline Convergence',
      condition: 'Initial experiment setup',
      note: `In ${topicTitle}, models seek to minimize empirical risk across observed training vectors.`,
    },
    {
      id: 1,
      title: 'Underfitting Boundary Identified',
      condition: 'Single hidden layer (Complexity = 1)',
      note: 'When model representation capacity is too shallow, it fails to capture non-linear relationships.',
    },
    {
      id: 2,
      title: 'High Variance & Overfitting Triggered',
      condition: 'High complexity (>5) with noise and disabled regularization',
      note: 'The model memorizes noisy training points verbatim, causing test accuracy to plummet dramatically.',
    },
    {
      id: 3,
      title: 'Optimal Generalization Sweet-Spot',
      condition: 'Balanced layers (3-4) with regularization enabled',
      note: 'The model generalizes cleanly with minimal divergence between training and validation scores.',
    },
  ]

  const readyToAdvance = isCompleted || unlockedDiscoveries.length >= 2

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToAdvance && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(6) // Advance to Section 7 (Assignment)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200/60 mb-2">
            <FlaskConical size={13} className="text-cyan-600" />
            <span>Section 6 · Discovery & Experiment Experience (Lesson 3)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Virtual Experiment Lab: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {canonicalSection.description ||
              `Formulate hypotheses, adjust live architectural parameters, and observe how complexity and noise impact system accuracy in real time.`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            <Activity size={14} className="text-slate-500" />
            <span>{estMinutes} Mins Lab</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
            <Sparkles size={14} className="text-cyan-600" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Header Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'resource'}
        sectionNumber={6}
        contentType="resource"
        position="header"
      />

      {/* 2. After Intro / Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'resource'}
        sectionNumber={6}
        contentType="resource"
        position="after_hook"
      />

      {/* Aura AI Lab Assistant */}
      <div className="bg-white/95 rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
        <AuraGuideAvatar
          mood={
            isCompleted
              ? 'celebrating'
              : simResults.status === 'optimal'
              ? 'celebrating'
              : simResults.status === 'overfitting'
              ? 'thinking'
              : 'wrong'
          }
          message={
            isCompleted
              ? 'Experiment verified! You explored how complexity, noise, and regularization affect real-world models.'
              : simResults.status === 'optimal'
              ? `Optimal calibration achieved! Validation accuracy reached ${simResults.valAcc.toFixed(1)}% with low latency.`
              : simResults.status === 'overfitting'
              ? `Overfitting detected! The model is memorizing noise. Try increasing sample size or enabling regularization.`
              : `Underfitting detected! The model is too simple. Increase layers or tune parameters to learn the pattern.`
          }
          size="sm"
          className="w-full"
        />
      </div>

      {/* Main Two-Column Experiment Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Workbench Controls & Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3. Mid-Lesson Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'resource'}
            sectionNumber={6}
            contentType="resource"
            position="mid_lesson"
          />

          {/* Visual Simulation Display */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Live Decision Boundary Visualizer
              </span>
              <span className="text-[11px] font-mono text-slate-400">{sampleSize} Points Ingested</span>
            </div>

            {/* Dynamic Interactive SVG Canvas */}
            <div className="h-56 w-full rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid Lines */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeDasharray="3 3" />
                <line x1="200" y1="0" x2="200" y2="200" stroke="#334155" strokeDasharray="3 3" />

                {/* Simulated Data Clusters */}
                {[...Array(24)].map((_, i) => {
                  const cx = 50 + (i * 14) % 150
                  const cy = 40 + ((i * 19) % 70) + (noiseLevel > 20 ? (i % 2 === 0 ? 15 : -15) : 0)
                  return <circle key={i} cx={cx} cy={cy} r="4" fill="#38bdf8" opacity="0.8" />
                })}
                {[...Array(24)].map((_, i) => {
                  const cx = 200 + (i * 14) % 160
                  const cy = 90 + ((i * 17) % 80) + (noiseLevel > 20 ? (i % 2 === 0 ? -15 : 15) : 0)
                  return <circle key={`b-${i}`} cx={cx} cy={cy} r="4" fill="#f43f5e" opacity="0.8" />
                })}

                {/* Dynamic Boundary Curve based on complexity */}
                <path
                  d={
                    complexityLayers <= 1
                      ? 'M 40 180 L 360 20' // Underfitting: straight line
                      : complexityLayers >= 6
                      ? 'M 40 160 Q 120 40 200 130 T 360 30' // Overfitting: sharp oscillations
                      : 'M 40 170 Q 180 120 220 90 T 360 40' // Optimal smooth curve
                  }
                  fill="none"
                  stroke={
                    simResults.status === 'optimal'
                      ? '#10b981'
                      : simResults.status === 'overfitting'
                      ? '#f59e0b'
                      : '#ef4444'
                  }
                  strokeWidth="3.5"
                  strokeDasharray={isRunning ? '6 3' : 'none'}
                />
              </svg>

              {/* Status Badge Over Visualizer */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono">
                Model State:{' '}
                <strong
                  className={
                    simResults.status === 'optimal'
                      ? 'text-emerald-400'
                      : simResults.status === 'overfitting'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  {simResults.status.toUpperCase()}
                </strong>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Train Accuracy</span>
                <strong className="text-base text-emerald-400 font-mono">{simResults.trainAcc}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Validation Accuracy</span>
                <strong className="text-base text-cyan-400 font-mono">{simResults.valAcc}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Inference Latency</span>
                <strong className="text-base text-slate-200 font-mono">{simResults.latency}ms</strong>
              </div>
            </div>
          </div>

          {/* Parameter Sliders Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders size={16} className="text-cyan-600" />
                <span>Experiment Parameters</span>
              </h3>
              <span className="text-xs text-slate-400">Live Calibration</span>
            </div>

            {/* Slider 1: Sample Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Dataset Sample Size:</span>
                <span className="text-cyan-700 font-mono">{sampleSize} samples</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={sampleSize}
                onChange={e => setSampleSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Slider 2: Layers */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Network Complexity (Hidden Layers):</span>
                <span className="text-cyan-700 font-mono">{complexityLayers} layers</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={complexityLayers}
                onChange={e => setComplexityLayers(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Slider 3: Noise Level */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Sensor Noise Variance:</span>
                <span className="text-cyan-700 font-mono">{noiseLevel}% noise</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="5"
                value={noiseLevel}
                onChange={e => setNoiseLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Toggle: Regularization */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Dropout & L2 Regularization</span>
              <button
                onClick={() => setRegularization(!regularization)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  regularization
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {regularization ? 'Enabled ✓' : 'Disabled'}
              </button>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Play size={16} />
              <span>{isRunning ? 'Running Simulation...' : 'Run Simulation Test'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Discovery Notebook & Section Advance */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4. Activity Image Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'resource'}
            sectionNumber={6}
            contentType="resource"
            position="activity"
          />

          {/* Discovery Findings Log */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider">Lab Notebook</span>
                <h3 className="text-base font-black text-slate-900">Empirical Discoveries</h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
                {unlockedDiscoveries.length} / {discoveries.length}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Experiment with different parameters on the left to trigger and unlock all scientific discoveries:
            </p>

            <div className="space-y-3">
              {discoveries.map(disc => {
                const isUnlocked = unlockedDiscoveries.includes(disc.id)
                return (
                  <div
                    key={disc.id}
                    className={`p-4 rounded-xl border transition-all space-y-1.5 ${
                      isUnlocked
                        ? 'bg-cyan-50/50 border-cyan-200 text-slate-900'
                        : 'bg-slate-50/60 border-slate-200/70 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold flex items-center gap-2">
                        {isUnlocked ? (
                          <Unlock size={14} className="text-cyan-600 shrink-0" />
                        ) : (
                          <Lock size={14} className="text-slate-400 shrink-0" />
                        )}
                        <span>{disc.title}</span>
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">{disc.condition}</span>
                    </div>

                    <p className="text-xs leading-relaxed">
                      {isUnlocked ? disc.note : 'Run simulation under matching parameters to uncover this finding.'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Section 6 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToAdvance ? 'Lab Verified' : 'In Progress'}
              </span>
            </div>

            <p className="text-xs text-cyan-100 leading-relaxed">
              {readyToAdvance || isCompleted
                ? 'Discoveries verified! You successfully modeled generalization boundaries. Continue to the Capstone Assignment.'
                : 'Run simulation tests or continue directly to the Capstone Assignment at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-cyan-800 hover:bg-cyan-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Assignment: Mini-Project Workspace</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Summary Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'resource'}
        sectionNumber={6}
        contentType="resource"
        position="bottom_summary"
      />
    </div>
  )
}
