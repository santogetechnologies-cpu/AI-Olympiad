import React, { useState } from 'react'
import { Globe } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { AnimatedSatelliteCitySVG } from '../svg/AnimatedSVGs'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 11. INTERACTIVE MAP EXPERIENCE ──────────────────────────────────────────
// Structure: Smart City / Neural Network Topology node graph, data routing switches, and live telemetry
export const InteractiveMapExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [activeNode, setActiveNode] = useState<number>(0)
  const [routedNodes, setRoutedNodes] = useState<number[]>([0])

  const mapNodes = config?.mapNodes || [
    {
      id: 0,
      name: 'City Central Traffic Grid',
      status: 'Traffic Flow Optimized',
      telemetry: 'LiDAR sensors balance 45,000 vehicles per hour across 12 smart intersections.',
      icon: '🚦',
    },
    {
      id: 1,
      name: 'District Medical Triage',
      status: 'Priority Telemetry Active',
      telemetry: 'Autonomous ambulances receive continuous clear-path green wave radio signals.',
      icon: '🏥',
    },
    {
      id: 2,
      name: 'Clean Solar Microgrid',
      status: 'Load Balancing Active',
      telemetry: 'Predictive neural models forecast cloud cover 2 hours ahead to switch battery reserves.',
      icon: '☀️',
    },
    {
      id: 3,
      name: 'Autonomous Drone Fleet Hub',
      status: 'Automated Airspace Clear',
      telemetry: 'Collision-avoidance transponders dynamically separate delivery drone altitudes.',
      icon: '🚁',
    },
  ]

  const handleRouteNode = (idx: number) => {
    gameAudio.playTap()
    setActiveNode(idx)
    if (!routedNodes.includes(idx)) {
      const next = [...routedNodes, idx]
      setRoutedNodes(next)
      if (next.length === mapNodes.length) {
        gameAudio.playSuccess()
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      }
    }
  }

  const currentNode = mapNodes[activeNode] || mapNodes[0]

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Map Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center">
            <Globe size={24} className="animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Network Topology Controller</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Nodes Linked: {routedNodes.length} / {mapNodes.length}
        </div>
      </div>

      {/* Network Topology Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950/80 border-2 border-cyan-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <AnimatedSatelliteCitySVG size={140} className="mb-4" />
          <div className="grid grid-cols-2 gap-3 w-full">
            {mapNodes.map((n: any, idx: number) => {
              const isLinked = routedNodes.includes(idx)
              const isActive = activeNode === idx
              return (
                <button
                  key={n.id}
                  onClick={() => handleRouteNode(idx)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2.5 text-left ${
                    isActive
                      ? 'bg-cyan-500/30 border-cyan-400 text-white ring-2 ring-cyan-400/30 shadow-lg'
                      : isLinked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-cyan-500/40'
                  }`}
                >
                  <span className="text-2xl">{n.icon}</span>
                  <div className="flex-1 truncate">
                    <div className="text-xs font-bold truncate text-white">{n.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{n.status}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Telemetry Readout */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Node Telemetry Dossier
            </span>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentNode.icon}</span>
              <div>
                <h3 className="font-bold text-white text-base">{currentNode.name}</h3>
                <span className="text-xs font-semibold text-emerald-400">{currentNode.status}</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {currentNode.telemetry}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Routing Bandwidth: 10 Gbps</span>
            <span className="text-emerald-400">Zero Packet Loss</span>
          </div>
        </div>
      </div>

      {routedNodes.length === mapNodes.length && (
        <SuccessCelebration
          title="🎉 City Grid Synchronized!"
          subtitle={`All ${mapNodes.length} telemetry nodes for ${topicTitle} are transmitting harmoniously.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
