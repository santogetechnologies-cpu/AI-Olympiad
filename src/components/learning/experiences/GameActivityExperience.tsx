import React, { useState } from 'react'
import {
  Gamepad2, Zap, Trophy, RotateCcw,
  CheckCircle2, Sparkles, ChevronRight,
  Search, Wrench, Play, ShieldAlert,
  ArrowRight
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'

export const GameActivityExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
  config: _config,
}) => {
  const [activeMissionIdx, setActiveMissionIdx] = useState(0)
  const [phase, setPhase] = useState<'observe' | 'diagnose' | 'patch' | 'test'>('observe')
  const [discoveredClues, setDiscoveredClues] = useState<number[]>([])
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number | null>(null)
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [missionsCompleted, setMissionsCompleted] = useState<number[]>([])
  const [gameFinished, setGameFinished] = useState(false)

  const estMinutes = canonicalSection.estimatedMinutes || 12
  const xpReward = canonicalSection.xpReward || 20

  // Multi-step educational investigation missions
  const missions = [
    {
      id: 0,
      title: 'Autonomous Navigation Anomaly in Adverse Weather',
      incident: `During winter trials, an autonomous vehicle utilizing ${topicTitle} experienced sudden trajectory hesitation when entering a tunnel during a snowstorm.`,
      clues: [
        { id: 0, label: 'Sensor Feed A', name: 'Optical Camera Array', detail: 'RGB frames are 85% blinded by reflective snow flurry glare.' },
        { id: 1, label: 'Sensor Feed B', name: 'Millimeter-Wave Radar', detail: 'Radar penetration is unaffected, tracking obstacles clearly at 120m.' },
        { id: 2, label: 'Telemetry C', name: 'Fusion Confidence Score', detail: 'Optical failure dragged down the joint confidence below safe threshold.' },
      ],
      diagnoses: [
        { id: 0, text: 'The system blindly averages sensors instead of dynamically weighting by weather confidence.', isCorrect: true, reason: 'Static averaging allows a corrupted optical signal to override a clean radar return.' },
        { id: 1, text: 'The electric battery overheated due to cold weather.', isCorrect: false, reason: 'Cold temperatures drain batteries faster, but this issue is perceptual sensor fusion.' },
        { id: 2, text: 'GPS satellites were temporarily powered off.', isCorrect: false, reason: 'Tunnel blockage affects GPS, but the immediate crisis is obstacle avoidance.' },
      ],
      patches: [
        { id: 0, title: 'Dynamic Covariance Fusion Filter', desc: 'Downweight optical sensors when variance exceeds glare thresholds; rely on Radar and LiDAR.' },
        { id: 1, title: 'Increase Optical Brightness', desc: 'Digitally amplify camera gain by 300% to burn through the snow glare.' },
        { id: 2, title: 'Disable Obstacle Detection', desc: 'Bypass sensor validation to maintain vehicle speed without hesitating.' },
      ],
      correctPatch: 0,
    },
    {
      id: 1,
      title: 'Severe Generalization Failure on Rare Minority Cases',
      incident: `A diagnostic neural pipeline for ${topicTitle} achieves 99.1% overall accuracy but fails to detect 80% of rare emergency anomalies in live trials.`,
      clues: [
        { id: 0, label: 'Dataset Telemetry', name: 'Class Distribution', detail: 'Common baseline cases represent 98.5% of samples; emergency cases represent only 1.5%.' },
        { id: 1, label: 'Loss Function', name: 'Empirical Risk Metric', detail: 'Standard Cross-Entropy rewards the model for simply predicting the majority class 100% of the time.' },
        { id: 2, label: 'Confusion Matrix', name: 'Recall vs Precision', detail: 'False negatives on emergency cases are dangerously elevated.' },
      ],
      diagnoses: [
        { id: 0, text: 'Extreme class imbalance is causing the naive loss function to ignore the minority class.', isCorrect: true, reason: 'The model optimizes superficial overall accuracy by ignoring the rare critical cases.' },
        { id: 1, text: 'The CPU processor clock speed is set too slow.', isCorrect: false, reason: 'This is a mathematical distribution failure, not a hardware clock bottleneck.' },
        { id: 2, text: 'The neural network has too many memory registers.', isCorrect: false, reason: 'Memory registers do not alter the classification loss objective.' },
      ],
      patches: [
        { id: 0, title: 'Focal Loss & Synthetic Oversampling', desc: 'Implement class-weighted focal loss and SMOTE augmentation to heavily penalize minority errors.' },
        { id: 1, title: 'Delete All Rare Samples', desc: 'Prune the rare 1.5% from the dataset so overall accuracy reaches 100%.' },
        { id: 2, title: 'Double the Display Brightness', desc: 'Brighten the screen display to improve human visual review.' },
      ],
      correctPatch: 0,
    },
  ]

  const currentMission = missions[activeMissionIdx] || missions[0]

  const discoverClue = (idx: number) => {
    if (!discoveredClues.includes(idx)) {
      setDiscoveredClues(prev => [...prev, idx])
    }
  }

  const handleSelectDiagnosis = (diagIdx: number) => {
    setSelectedDiagnosis(diagIdx)
    const isCorrect = currentMission.diagnoses[diagIdx].isCorrect
    if (isCorrect) {
      setScore(s => s + 150)
      setPhase('patch')
    } else {
      setScore(s => Math.max(0, s - 30))
    }
  }

  const handleApplyPatch = (patchIdx: number) => {
    setSelectedPatch(patchIdx)
    const isCorrect = patchIdx === currentMission.correctPatch
    if (isCorrect) {
      setScore(s => s + 250)
      setPhase('test')
      if (!missionsCompleted.includes(activeMissionIdx)) {
        setMissionsCompleted(prev => [...prev, activeMissionIdx])
      }
    } else {
      setScore(s => Math.max(0, s - 50))
    }
  }

  const handleNextMission = () => {
    if (activeMissionIdx + 1 < missions.length) {
      setActiveMissionIdx(i => i + 1)
      setPhase('observe')
      setDiscoveredClues([])
      setSelectedDiagnosis(null)
      setSelectedPatch(null)
    } else {
      setGameFinished(true)
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    }
  }

  const handleRestart = () => {
    setActiveMissionIdx(0)
    setPhase('observe')
    setDiscoveredClues([])
    setSelectedDiagnosis(null)
    setSelectedPatch(null)
    setScore(0)
    setMissionsCompleted([])
    setGameFinished(false)
  }

  const readyToAdvance = isCompleted || gameFinished || missionsCompleted.length >= 1

  const handleFinishSection = () => {
    if (readyToAdvance && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(5) // Advance to Section 6 (Lesson 3: Discovery Lab)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold border border-violet-200/60 mb-2">
            <Gamepad2 size={13} className="text-violet-600" />
            <span>Section 5 · Educational Game & Multi-Step Challenge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Architectural Diagnostic Game: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Lead the diagnostic investigation team. Discover telemetry clues, identify root architectural flaws, apply system patches, and verify reliability under live test loads.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold">
            <Sparkles size={14} className="text-violet-600" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Mastered</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Header Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'activity'}
        sectionNumber={5}
        contentType="activity"
        position="header"
      />

      {/* Game HUD Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-bold text-violet-200 uppercase tracking-widest block">Investigation Score</span>
            <span className="text-2xl sm:text-3xl font-black tracking-tight">{score} PTS</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <span className="text-[10px] font-bold text-violet-200 uppercase tracking-widest block">Active Mission</span>
            <span className="text-sm sm:text-base font-bold text-amber-300">
              Case {activeMissionIdx + 1} of {missions.length}
            </span>
          </div>
        </div>

        {/* 4-Phase Progress Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span className={`px-2.5 py-1 rounded-lg ${phase === 'observe' ? 'bg-white text-indigo-900 font-black shadow-xs' : 'bg-white/10 text-white/70'}`}>
            1. Observe Clues
          </span>
          <ArrowRight size={12} className="text-white/40" />
          <span className={`px-2.5 py-1 rounded-lg ${phase === 'diagnose' ? 'bg-white text-indigo-900 font-black shadow-xs' : 'bg-white/10 text-white/70'}`}>
            2. Diagnose Flaw
          </span>
          <ArrowRight size={12} className="text-white/40" />
          <span className={`px-2.5 py-1 rounded-lg ${phase === 'patch' ? 'bg-white text-indigo-900 font-black shadow-xs' : 'bg-white/10 text-white/70'}`}>
            3. Apply Patch
          </span>
          <ArrowRight size={12} className="text-white/40" />
          <span className={`px-2.5 py-1 rounded-lg ${phase === 'test' ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-white/10 text-white/70'}`}>
            4. Live Test
          </span>
        </div>
      </div>

      {/* 2. After Intro / Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'activity'}
        sectionNumber={5}
        contentType="activity"
        position="after_hook"
      />

      {/* Main Game Arena */}
      {!gameFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
          {/* Incident Briefing Deck */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldAlert size={15} />
              <span>Diagnostic Case Brief: {currentMission.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {currentMission.incident}
            </p>
          </div>

          {/* 3. Mid-Lesson Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'activity'}
            sectionNumber={5}
            contentType="activity"
            position="mid_lesson"
          />

          {/* Phase 1: Subsystem Clue Investigation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search size={16} className="text-violet-600" />
                <span>Phase 1: Tap Subsystems to Inspect Telemetry Clues ({discoveredClues.length}/{currentMission.clues.length})</span>
              </h3>
              {discoveredClues.length >= 2 && phase === 'observe' && (
                <button
                  onClick={() => setPhase('diagnose')}
                  className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>Proceed to Diagnosis</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentMission.clues.map((clue, idx) => {
                const isDiscovered = discoveredClues.includes(idx)
                return (
                  <button
                    key={clue.id}
                    onClick={() => discoverClue(idx)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isDiscovered
                        ? 'bg-violet-50/70 border-violet-300 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-violet-700">{clue.label}</span>
                      {isDiscovered ? (
                        <CheckCircle2 size={14} className="text-emerald-600" />
                      ) : (
                        <span className="text-[10px] text-slate-400">Click to Inspect</span>
                      )}
                    </div>
                    <strong className="text-xs font-black block text-slate-900">{clue.name}</strong>
                    {isDiscovered ? (
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white p-2 rounded-lg border border-violet-200/60 font-mono text-[11px]">
                        {clue.detail}
                      </p>
                    ) : (
                      <span className="text-[11px] text-slate-400 mt-2 block italic">Telemetry Encrypted — Tap to Decrypt</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Activity Image Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'activity'}
            sectionNumber={5}
            contentType="activity"
            position="activity"
          />

          {/* Phase 2: Root Cause Diagnosis */}
          {(phase === 'diagnose' || phase === 'patch' || phase === 'test') && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span>Phase 2: Formulate Root Cause Diagnosis</span>
              </h3>

              <div className="space-y-2">
                {currentMission.diagnoses.map((diag, idx) => {
                  const isSelected = selectedDiagnosis === idx
                  let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  if (isSelected) {
                    style = diag.isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }
                  return (
                    <button
                      key={diag.id}
                      onClick={() => handleSelectDiagnosis(idx)}
                      disabled={phase !== 'diagnose'}
                      className={`w-full p-3.5 rounded-xl border-2 text-left text-xs leading-relaxed transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-400 mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                        <div className="space-y-1">
                          <p>{diag.text}</p>
                          {isSelected && (
                            <p className="text-[11px] text-slate-500 font-mono italic">
                              💡 {diag.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Phase 3: Architectural Patch Selection */}
          {(phase === 'patch' || phase === 'test') && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Wrench size={16} className="text-blue-600" />
                <span>Phase 3: Deploy Corrective Architectural Patch</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentMission.patches.map((patch, idx) => {
                  const isSelected = selectedPatch === idx
                  const isCorrect = idx === currentMission.correctPatch
                  let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  if (isSelected) {
                    style = isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleApplyPatch(idx)}
                      disabled={phase === 'test'}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer space-y-1.5 ${style}`}
                    >
                      <strong className="text-xs font-black block text-slate-900">{patch.title}</strong>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{patch.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Phase 4: Test Run Results & Next Mission */}
          {phase === 'test' && (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-3 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Play size={14} className="fill-emerald-600 text-emerald-600" />
                  Live Test Batch Verification
                </span>
                <span className="font-mono text-xs font-bold text-emerald-800">100% Reliability Restored ✓</span>
              </div>

              <p className="text-xs leading-relaxed">
                The deployed patch resolved the perceptual covariance anomaly. Telemetry shows confidence stabilizing at 98.4% across 1,000 simulated snowflurry frames!
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextMission}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>{activeMissionIdx + 1 < missions.length ? 'Next Diagnostic Mission →' : 'Complete Challenge →'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results & Mastery Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Trophy size={42} />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Diagnostic Mastery Achieved!
            </h2>
            <p className="text-sm text-slate-600">
              You diagnosed and patched all system anomalies in <strong className="text-violet-600">{topicTitle}</strong> with a final score of <strong className="text-slate-900">{score} Points</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Replay Investigation</span>
            </button>
            <button
              onClick={handleFinishSection}
              className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Continue to Lesson 3: Discovery Lab</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Advancement Toolbar */}
      {!gameFinished && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Estimated: {estMinutes} mins · Multi-Step Engineering Diagnostic Game</span>
          <button
            onClick={handleFinishSection}
            className="font-bold flex items-center gap-1.5 transition-colors text-violet-600 hover:text-violet-700 cursor-pointer"
          >
            <span>Advance to Lesson 3</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* 5. Bottom Summary Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'activity'}
        sectionNumber={5}
        contentType="activity"
        position="bottom_summary"
      />
    </div>
  )
}
