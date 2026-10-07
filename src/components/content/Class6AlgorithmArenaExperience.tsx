import { useState } from 'react'
import {
  Zap, Play, RotateCcw, CheckCircle2,
  Terminal, Cpu, Activity, Target, Layers
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'
import toast from 'react-hot-toast'

interface Class6Props {
  chapterId?: string
  chapterNum?: string | number
  cNum?: string | number
  chapterTitle?: string
  lessonNumber: number
  topicTitle: string
  hookQuestion?: string
  onComplete?: () => void
}

export function Class6AlgorithmArenaExperience({
  cNum,
  lessonNumber,
  topicTitle,
  onComplete
}: Class6Props) {
  const profile = getCurriculumTopicProfile(topicTitle || 'Algorithm Arena')

  // -------------------------------------------------------------
  // LESSON 1 STATE: Computational Flowchart & Mission Pipeline
  // -------------------------------------------------------------
  const [selectedNode, setSelectedNode] = useState<number>(0)
  const [packetPosition, setPacketPosition] = useState<number>(0)
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false)
  const [pipelineVerified, setPipelineVerified] = useState<boolean>(false)
  const [predictedOutcome, setPredictedOutcome] = useState<string | null>(null)

  // -------------------------------------------------------------
  // LESSON 2 STATE: Algorithm Speed Duel & Live Number Sorting
  // -------------------------------------------------------------
  const [duelArray] = useState<number[]>([42, 17, 89, 29, 63, 12, 75])
  const [duelActiveIdx, setDuelActiveIdx] = useState<number | null>(null)
  const [duelComparisons, setDuelComparisons] = useState<number>(0)
  const [duelFinished, setDuelFinished] = useState<boolean>(false)
  const [duelRunning, setDuelRunning] = useState<boolean>(false)

  // Flowchart Pipeline Stages
  const pipelineNodes = [
    {
      id: 'input',
      title: '1. Raw Input Signal',
      tag: 'Sensor / Data',
      desc: 'Raw observations or user queries enter the system as unstructured input tokens.',
      dataPreview: '{ type: "camera_frame", light_level: "low", motion: true }',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'process',
      title: '2. Algorithmic Rule Engine',
      tag: 'Conditional Logic',
      desc: 'The algorithm compares inputs against defined logical thresholds: IF motion AND night THEN activate night-mode.',
      dataPreview: 'IF (motion === true && light < 20) => Action.ALERT',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'output',
      title: '3. Actuator Output Decision',
      tag: 'Decided Action',
      desc: 'Final verified decision dispatched to smart actuators or user notification systems.',
      dataPreview: '{ status: "DISPATCHED", command: "NIGHT_ILLUMINATION_ON" }',
      color: 'from-emerald-500 to-teal-600',
    },
  ]

  const handleRunPipeline = async () => {
    setPipelineRunning(true)
    setPipelineVerified(false)
    for (let i = 0; i <= 2; i++) {
      setPacketPosition(i)
      setSelectedNode(i)
      await new Promise(r => setTimeout(r, 650))
    }
    setPipelineRunning(false)
    setPipelineVerified(true)
    gamification.addXP(30, undefined, `cls6-pipe-${cNum}-${lessonNumber}`)
    toast.success('⚡ Data packet successfully processed through all algorithm nodes! +30 XP', { icon: '🚀' })
  }

  const handleStepDuel = () => {
    if (duelFinished) return
    const nextIdx = duelActiveIdx === null ? 0 : duelActiveIdx + 1
    if (nextIdx >= duelArray.length) {
      setDuelFinished(true)
      return
    }
    setDuelActiveIdx(nextIdx)
    setDuelComparisons(c => c + 1)
    if (duelArray[nextIdx] === 29) {
      setDuelFinished(true)
      gamification.addXP(35, undefined, `cls6-duel-${cNum}`)
      toast.success('🎯 Target number 29 located! Comparisons: ' + (duelComparisons + 1), { icon: '🏆' })
    }
  }

  const handleAutoRunDuel = async () => {
    setDuelActiveIdx(null)
    setDuelComparisons(0)
    setDuelFinished(false)
    setDuelRunning(true)
    for (let i = 0; i < duelArray.length; i++) {
      setDuelActiveIdx(i)
      setDuelComparisons(i + 1)
      await new Promise(r => setTimeout(r, 500))
      if (duelArray[i] === 29) {
        setDuelFinished(true)
        setDuelRunning(false)
        gamification.addXP(35, undefined, `cls6-duel-${cNum}`)
        toast.success('🎯 Target 29 found in ' + (i + 1) + ' steps! Algorithm completed.', { icon: '🚀' })
        if (onComplete) onComplete()
        return
      }
    }
    setDuelFinished(true)
    setDuelRunning(false)
  }

  const handleResetDuel = () => {
    setDuelActiveIdx(null)
    setDuelComparisons(0)
    setDuelFinished(false)
    setDuelRunning(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1 ARCHITECTURE: CYBER MISSION & COMPUTATIONAL FLOWCHART     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Unique Mission Hero */}
          <div className="bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 border-2 border-cyan-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400" /> CLASS 6 • COMPUTATIONAL LOGIC MISSION
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-black/50 px-3 py-1 rounded-xl border border-cyan-500/30">
                Chapter {cNum} • Step-by-Step AI
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-cyan-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              {profile.goal}
            </p>

            <div className="mt-5 p-4 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl flex items-start gap-3">
              <Zap size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Mission Objective</p>
                <p className="text-xs sm:text-sm text-cyan-100 font-medium mt-0.5">
                  Trace how an algorithm takes raw inputs, evaluates condition nodes, and generates an exact decision!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Flowchart Diagram Canvas */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Activity size={20} className="text-cyan-600" />
                  Live Computational Pipeline
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tap any node to inspect data passing through this algorithmic stage.
                </p>
              </div>
              <button
                onClick={handleRunPipeline}
                disabled={pipelineRunning}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-cyan-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Play size={14} className={pipelineRunning ? 'animate-spin' : ''} />
                {pipelineRunning ? 'Processing Pulse...' : 'Send Live Data Pulse'}
              </button>
            </div>

            {/* Pipeline Stage Cards Connected by Flow Vectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {pipelineNodes.map((node, idx) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(idx)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left relative ${
                    selectedNode === idx
                      ? 'border-cyan-500 bg-cyan-50/50 shadow-md ring-2 ring-cyan-400/20'
                      : 'border-slate-200 bg-slate-50/80 hover:bg-slate-100'
                  }`}
                >
                  {packetPosition === idx && pipelineRunning && (
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow animate-bounce">
                      PACKET HERE
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">
                      {node.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">#0{idx + 1}</span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 mb-1">{node.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{node.desc}</p>

                  <div className="mt-3 p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-cyan-300 overflow-x-auto">
                    {node.dataPreview}
                  </div>
                </div>
              ))}
            </div>

            {pipelineVerified && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                    Pipeline Execution Complete!
                  </p>
                  <p className="text-xs text-emerald-800 font-medium">
                    The algorithm successfully validated rules and dispatched the correct actuator signal.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Prediction Challenge Interactive Activity */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Target size={18} className="text-cyan-600" />
              Algorithm Prediction Challenge
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mb-4">
              If an algorithm receives input: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-cyan-900 font-mono text-xs">motion = true, light_level = 95 (Bright Daylight)</code>, what will the output be?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Turn on Night-Mode Illumination', correct: false },
                { label: 'Keep Night-Mode OFF (Daylight detected)', correct: true },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPredictedOutcome(opt.label)
                    if (opt.correct) {
                      gamification.addXP(20, undefined, `cls6-pred-${cNum}`)
                      toast.success('🎯 Correct prediction! Algorithms follow exact conditional criteria.', { icon: '✨' })
                    } else {
                      toast.error('Not quite! Daylight level 95 is above the light < 20 threshold.')
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-bold text-left transition-all ${
                    predictedOutcome === opt.label
                      ? opt.correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-rose-400 bg-rose-50 text-rose-900'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2 ARCHITECTURE: ALGORITHM SPEED DUEL & LIVE NUMBER SORTING   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Duel Hero Banner */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Cpu size={14} className="text-indigo-400" /> CLASS 6 • ALGORITHM SPEED DUEL
              </span>
              <span className="text-xs font-mono font-bold text-indigo-300 bg-black/50 px-3 py-1 rounded-xl border border-indigo-500/30">
                Target: Find Number 29
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-indigo-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              Discover how computers search and sort through data step-by-step. Step through the array or auto-run to see how many checks it takes!
            </p>
          </div>

          {/* Interactive Sorting / Search Visualizer */}
          <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers size={20} className="text-indigo-600" />
                  Live Array Visualizer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algorithm is scanning the list to find target item <span className="font-mono font-bold text-indigo-600">29</span>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  Comparisons: {duelComparisons}
                </span>
                <button
                  onClick={handleStepDuel}
                  disabled={duelFinished || duelRunning}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40"
                >
                  Step Next
                </button>
                <button
                  onClick={handleAutoRunDuel}
                  disabled={duelRunning || duelFinished}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-1.5"
                >
                  <Play size={12} /> Auto Search
                </button>
                <button
                  onClick={handleResetDuel}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Reset Search"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Visual Number Bars */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 py-4 items-end h-48">
              {duelArray.map((val, idx) => {
                const isActive = duelActiveIdx === idx
                const isTarget = val === 29
                const heightPercent = Math.max(20, Math.round((val / 100) * 100))

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {val}
                    </span>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-2xl transition-all duration-300 relative ${
                        isActive
                          ? isTarget
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                            : 'bg-gradient-to-t from-amber-500 to-yellow-400 shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-800 whitespace-nowrap bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                          {isTarget ? 'FOUND! 🎯' : 'CHECK'}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      [{idx}]
                    </span>
                  </div>
                )
              })}
            </div>

            {duelFinished && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-black text-emerald-900 uppercase">
                      Target 29 Located at Index 3!
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      Linear search inspected 4 elements before stopping.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                  +35 XP Earned
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
