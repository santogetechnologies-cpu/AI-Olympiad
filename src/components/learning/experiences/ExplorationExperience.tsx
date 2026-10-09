import React, { useState } from 'react'
import { Compass, CheckCircle2, ChevronRight, Radio } from 'lucide-react'
import { AnimatedRobotSVG } from '../svg/AnimatedSVGs'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'

export interface ExperienceComponentProps {
  gradeKey: string
  chapterNum: number
  chapterTitle: string
  topicTitle: string
  canonicalSection: any
  config?: any
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection?: (idx: number) => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
}

// ─── 1. EXPLORATION EXPERIENCE ───────────────────────────────────────────────
// Structure: Multi-hotspot visual environment with interactive radar, discoverable node cards, and audio-visual feedback
export const ExplorationExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [activeNode, setActiveNode] = useState<number>(0)
  const [exploredNodes, setExploredNodes] = useState<number[]>([0])

  const nodes = config?.explorationNodes || [
    {
      id: 0,
      title: 'Sensor Input Stream',
      description: 'The AI perceives real-world signals (camera frames, microphones, distance lasers).',
      tag: 'Step 1: Input',
      icon: '📡',
      detail: 'Just like human eyes and ears, AI sensors collect raw unstructured signals from the environment.',
    },
    {
      id: 1,
      title: 'Pattern Classifier Core',
      description: 'Neural networks extract edges, colors, frequencies, and features to classify objects.',
      tag: 'Step 2: Processing',
      icon: '🧠',
      detail: 'Features are extracted layer by layer, transforming raw pixels into recognizable shapes and categories.',
    },
    {
      id: 2,
      title: 'Decision & Action Trigger',
      description: 'The algorithm compares scores and commands the motor or screen to execute the optimal action.',
      tag: 'Step 3: Output',
      icon: '⚡',
      detail: 'Confidence probabilities are ranked, choosing the safest and most accurate response.',
    },
    {
      id: 3,
      title: 'Feedback & Learning Loop',
      description: 'Outcomes are measured against expected goals to fine-tune weights for future accuracy.',
      tag: 'Step 4: Adaptation',
      icon: '🔄',
      detail: 'Reward signals and error margins adjust mathematical weights, making the model smarter over time.',
    },
  ]

  const handleSelectNode = (idx: number) => {
    gameAudio.playTap()
    setActiveNode(idx)
    if (!exploredNodes.includes(idx)) {
      const next = [...exploredNodes, idx]
      setExploredNodes(next)
      if (next.length === nodes.length && !isCompleted) {
        gameAudio.playSuccess()
        gamification.launchConfetti()
        onComplete()
      }
    }
  }

  const currentNode = nodes[activeNode] || nodes[0]
  const allExplored = exploredNodes.length === nodes.length

  return (
    <PageTransition className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Exploration Header Deck */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border-2 border-indigo-500/30 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 flex items-center justify-center shrink-0">
            <Compass size={30} className="animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Radio size={12} className="animate-pulse" /> Environmental Exploration
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-300">
            Discovered: <strong className="text-indigo-400">{exploredNodes.length}</strong> / {nodes.length}
          </div>
        </div>
      </div>

      {/* Main Exploration Panoramic Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Visual Radar & Hotspot Grid */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border-2 border-indigo-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[380px]">
          {/* Animated Background Radar Aura */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-72 h-72 rounded-full border border-indigo-400 animate-ping" style={{ animationDuration: '4s' }} />
            <div className="w-96 h-96 rounded-full border border-indigo-400/60" />
          </div>

          <AnimatedRobotSVG size={140} className="relative z-10 mb-6" />

          {/* Interactive Hotspot Node Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full relative z-10">
            {nodes.map((node: any, idx: number) => {
              const isExplored = exploredNodes.includes(idx)
              const isActive = activeNode === idx
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(idx)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg shadow-indigo-600/40 ring-2 ring-indigo-300'
                      : isExplored
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="text-2xl">{node.icon}</span>
                  <span className="text-xs font-bold truncate w-full">{node.title}</span>
                  {isExplored && <CheckCircle2 size={12} className="text-emerald-400" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Discoverable Insight Dossier */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/30 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                {currentNode.tag}
              </span>
              <span className="text-3xl">{currentNode.icon}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">{currentNode.title}</h2>
            <p className="text-sm text-slate-200 leading-relaxed font-semibold">{currentNode.description}</p>
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
              💡 <strong>Observation:</strong> {currentNode.detail}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => handleSelectNode((activeNode + 1) % nodes.length)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              Next Hotspot <ChevronRight size={14} />
            </button>
            {allExplored && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={16} /> Fully Explored
              </span>
            )}
          </div>
        </div>
      </div>

      {allExplored && (
        <SuccessCelebration
          title="🎉 Exploration Mission Complete!"
          subtitle={`You have uncovered all ${nodes.length} key components of ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
