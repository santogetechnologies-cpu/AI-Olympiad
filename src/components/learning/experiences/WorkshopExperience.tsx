import React, { useState } from 'react'
import { Wrench, CheckCircle2, Play, Cpu } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { AnimatedChipCircuitSVG } from '../svg/AnimatedSVGs'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 7. WORKSHOP EXPERIENCE ──────────────────────────────────────────────────
// Structure: Hands-on engineering workbench with component slots, pipeline wiring, and diagnostics test runner
export const WorkshopExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [installedParts, setInstalledParts] = useState<string[]>([])
  const [testedBench, setTestedBench] = useState(false)

  const components = config?.workshopComponents || [
    { id: 'tokenizer', name: 'Text Tokenizer', desc: 'Splits sentences into sub-word chunks & ID numbers', icon: '🔤' },
    { id: 'vector_embed', name: 'Vector Embedding Layer', desc: 'Projects word tokens into high-dimensional geometric space', icon: '📍' },
    { id: 'transformer_core', name: 'Self-Attention Matrix', desc: 'Computes relationship weights between every pair of words', icon: '⚡' },
    { id: 'softmax_gen', name: 'Softmax Probability Head', desc: 'Predicts the single most coherent next word in the sentence', icon: '🎯' },
  ]

  const handleTogglePart = (id: string) => {
    gameAudio.playTap()
    if (installedParts.includes(id)) {
      setInstalledParts(installedParts.filter(p => p !== id))
    } else {
      setInstalledParts([...installedParts, id])
    }
    setTestedBench(false)
  }

  const handleTestBench = () => {
    if (installedParts.length === components.length) {
      gameAudio.playSuccess()
      setTestedBench(true)
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    } else {
      gameAudio.playWrong()
    }
  }

  const allInstalled = installedParts.length === components.length

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Workshop Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
            <Wrench size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Hardware & Pipeline Workbench</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Installed: {installedParts.length} / {components.length}
        </div>
      </div>

      {/* Assembly Breadboard */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border-2 border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu size={18} className="text-cyan-400" /> Pipeline Architecture Breadboard
            </h3>
            <p className="text-xs text-slate-400">Tap components below to assemble the complete pipeline.</p>
          </div>
          <AnimatedChipCircuitSVG size={100} />
        </div>

        {/* Component Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {components.map((c: any) => {
            const isInstalled = installedParts.includes(c.id)
            return (
              <div
                key={c.id}
                onClick={() => handleTogglePart(c.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  isInstalled
                    ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white">{c.name}</h4>
                    {isInstalled && <CheckCircle2 size={16} className="text-cyan-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            disabled={!allInstalled}
            onClick={handleTestBench}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <Play size={16} /> Power On & Test Pipeline
          </button>
          {testedBench && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> Circuit Voltage & Dataflow Nominal!
            </span>
          )}
        </div>
      </div>

      {testedBench && (
        <SuccessCelebration
          title="🎉 Workshop Assembly Certified!"
          subtitle={`You successfully assembled and powered on the operational pipeline for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
