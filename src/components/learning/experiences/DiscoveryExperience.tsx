import React, { useState } from 'react'
import { Radio, CheckCircle2, Eye } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 6. DISCOVERY EXPERIENCE ─────────────────────────────────────────────────
// Structure: Sonar scanner expedition grid, tap-to-reveal AI mechanisms, and discovery journal
export const DiscoveryExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [discoveredTokens, setDiscoveredTokens] = useState<number[]>([])
  const [activeToken, setActiveToken] = useState<number | null>(null)

  const tokens = config?.discoveryTokens || [
    {
      id: 0,
      sector: 'Sector Alpha',
      label: 'Edge Weight Matrix',
      secret: 'Connections between artificial neurons store memory as decimal weights (e.g. 0.78, -0.42).',
      icon: '🕸️',
    },
    {
      id: 1,
      sector: 'Sector Beta',
      label: 'Activation Threshold (ReLU)',
      secret: 'Functions like a light switch—if incoming signal is above zero, it transmits onward at full intensity.',
      icon: '💡',
    },
    {
      id: 2,
      sector: 'Sector Gamma',
      label: 'Backpropagation Gradient',
      secret: 'Calculus gradients flow backwards from error outputs to adjust every weight by tiny mathematical fractions.',
      icon: '📐',
    },
    {
      id: 3,
      sector: 'Sector Delta',
      label: 'Validation Checkpoint',
      secret: 'Hidden test images verify whether the AI truly understands general concepts or merely memorized answers.',
      icon: '🛡️',
    },
  ]

  const handleScanSector = (idx: number) => {
    gameAudio.playTap()
    setActiveToken(idx)
    if (!discoveredTokens.includes(idx)) {
      const next = [...discoveredTokens, idx]
      setDiscoveredTokens(next)
      if (next.length === tokens.length) {
        gameAudio.playSuccess()
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      }
    }
  }

  const selected = activeToken !== null ? tokens[activeToken] : null

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Discovery Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-teal-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/40 flex items-center justify-center">
            <Radio size={24} className="animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Deep Sonar Expedition</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Discovered: {discoveredTokens.length} / {tokens.length}
        </div>
      </div>

      {/* Sonar Sector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tokens.map((token: any, idx: number) => {
          const isFound = discoveredTokens.includes(idx)
          const isActive = activeToken === idx
          return (
            <button
              key={token.id}
              onClick={() => handleScanSector(idx)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
                isActive
                  ? 'bg-teal-500/30 border-teal-400 text-white ring-2 ring-teal-400/40 shadow-lg'
                  : isFound
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-teal-500/40'
              }`}
            >
              <div className="text-3xl">{token.icon}</div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{token.sector}</span>
              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{token.label}</h4>
              {isFound ? (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Logged
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 font-semibold">Tap to Scan</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Journal Inspector Panel */}
      {selected && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-teal-500/30 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Eye size={16} /> Discovery Journal Dossier · {selected.sector}
          </div>
          <h3 className="text-lg font-black text-white">{selected.label}</h3>
          <p className="text-sm text-slate-200 leading-relaxed font-semibold">{selected.secret}</p>
        </div>
      )}

      {discoveredTokens.length === tokens.length && (
        <SuccessCelebration
          title="🎉 All Sectors Discovered!"
          subtitle={`Your expedition uncovered all ${tokens.length} hidden mechanisms of ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
