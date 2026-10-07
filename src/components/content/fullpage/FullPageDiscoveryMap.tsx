import React, { useState } from 'react'
import {
  Map, ChevronRight, CheckCircle2,
  Navigation, Crosshair, AlertCircle
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPageDiscoveryMapProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPageDiscoveryMap: React.FC<FullPageDiscoveryMapProps> = ({
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile: _profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [activeSector, setActiveSector] = useState<number>(0)
  const [stabilizedSectors, setStabilizedSectors] = useState<number[]>([])

  const sectors = [
    {
      id: 0,
      name: 'Sector Alpha: Transportation & Logistics',
      icon: '🚗',
      status: 'High Congestion / Sensor Divergence',
      challenge: `How should AI handle traffic flow optimization using ${topicTitle}?`,
      options: [
        { text: 'Dynamically balance signal green-times using camera streams', correct: true },
        { text: 'Keep traffic lights on fixed 60-second cycles regardless of cars', correct: false },
      ],
      insight: 'Real-time camera sensors allow autonomous controllers to ease traffic bottlenecks instantly.',
      x: '20%',
      y: '30%',
    },
    {
      id: 1,
      name: 'Sector Beta: Bio-Medical & Clinic Health',
      icon: '🩺',
      status: 'Anomalous Scan Readings',
      challenge: `A smart diagnostic model analyzing ${topicTitle} detects a subtle irregularity.`,
      options: [
        { text: 'Flag image with confidence heat-map and notify doctor', correct: true },
        { text: 'Silently discard the scan without human review', correct: false },
      ],
      insight: 'Responsible clinical AI operates with a human-in-the-loop validation paradigm.',
      x: '75%',
      y: '28%',
    },
    {
      id: 2,
      name: 'Sector Gamma: Environmental Energy Grid',
      icon: '⚡',
      status: 'Peak Demand Surge',
      challenge: `Predictive models for ${topicTitle} anticipate a heatwave power spike.`,
      options: [
        { text: 'Pre-charge battery storage and optimize distribution', correct: true },
        { text: 'Ignore solar forecast and shut down the grid', correct: false },
      ],
      insight: 'Predictive intelligence prevents blackouts and conserves renewable power.',
      x: '30%',
      y: '72%',
    },
    {
      id: 3,
      name: 'Sector Delta: Cyber Defense & Privacy Vault',
      icon: '🛡️',
      status: 'Suspicious Network Probe',
      challenge: `An unauthenticated client attempts to query personal records related to ${topicTitle}.`,
      options: [
        { text: 'Enforce cryptographic zero-trust firewall and block query', correct: true },
        { text: 'Provide unrestricted root database access', correct: false },
      ],
      insight: 'Strict data privacy and encryption safeguard student and citizen records.',
      x: '78%',
      y: '70%',
    },
  ]

  const activeSectorData = sectors[activeSector]

  const handleStabilizeSector = (isCorrect: boolean) => {
    if (isCorrect) {
      if (!stabilizedSectors.includes(activeSector)) {
        const next = [...stabilizedSectors, activeSector]
        setStabilizedSectors(next)
        gamification.addXP(25, undefined, `sector-stabilized-${activeSector}`)
        toast.success(`🎯 ${activeSectorData.name} Stabilized! (+25 XP)`)
        if (next.length === sectors.length) {
          gamification.launchConfetti()
          toast.success('🌟 All 4 Global Sectors Stabilized! Sector Mastery Achieved!', { icon: '🗺️' })
          onComplete()
        }
      } else {
        toast.success('Sector is already operating at optimal stability.')
      }
    } else {
      toast.error('Sub-optimal response! Review safety constraints and re-attempt.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-blue-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-3xl shadow-inner">
              🗺️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-800 flex items-center gap-1">
                  <Map size={12} /> Tactical Sector Map
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {stabilizedSectors.length}/{sectors.length} Sectors Stabilized
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Real-World Field Operations: {topicTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-950/80 border border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-300">
            <Crosshair size={14} />
            <span>Interactive Dispatch Matrix</span>
          </div>
        </div>

        {/* Map & Sector Dispatch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Tactical Map Grid (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl relative min-h-[360px] flex flex-col justify-between overflow-hidden">
            
            {/* Map Canvas Background SVG */}
            <div className="relative flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 600 360" className="w-full h-full max-h-[360px] opacity-70 pointer-events-none">
                <defs>
                  <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="360" fill="url(#tacticalGrid)" />

                {/* Radar Rings */}
                <circle cx="300" cy="180" r="140" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
                <circle cx="300" cy="180" r="80" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />
                <circle cx="300" cy="180" r="6" fill="#3b82f6" className="animate-ping" />

                {/* Sector interconnect lines */}
                <line x1="120" y1="108" x2="300" y2="180" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="450" y1="100" x2="300" y2="180" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="180" y1="260" x2="300" y2="180" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="468" y1="252" x2="300" y2="180" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>

              {/* Clickable Sector Hotspot Badges */}
              {sectors.map((sec, idx) => {
                const isSelected = activeSector === idx
                const isStabilized = stabilizedSectors.includes(idx)

                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSector(idx)}
                    style={{ left: sec.x, top: sec.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500 text-slate-950 font-black ring-4 ring-blue-300 shadow-2xl scale-120 z-20'
                        : isStabilized
                        ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-500/80 hover:scale-105 shadow-md'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700 hover:scale-105 shadow-lg'
                    }`}
                  >
                    <span className="text-xl">{sec.icon}</span>
                    <span className="text-xs font-bold hidden sm:inline whitespace-nowrap">
                      {sec.name.split(':')[0]}
                    </span>
                    {isStabilized && (
                      <CheckCircle2 size={14} className="text-emerald-400 absolute -top-1 -right-1" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Navigation size={13} className="text-blue-400" /> Tap sectors to dispatch AI solutions
              </span>
              <span className="text-blue-400 font-bold">Field Operations Active</span>
            </div>

          </div>

          {/* Sector Dispatch Console (Right 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-blue-400 tracking-wider">
                  {activeSectorData.name}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                  stabilizedSectors.includes(activeSector)
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  {stabilizedSectors.includes(activeSector) ? 'STABILIZED ✓' : 'DISPATCH NEEDED'}
                </span>
              </div>

              {/* Status Alert */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-2.5">
                <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Telemetry Status:</span>
                  <span className="text-xs font-bold text-slate-200">{activeSectorData.status}</span>
                </div>
              </div>

              {/* Decision Dilemma */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                  {activeSectorData.challenge}
                </h3>

                <div className="space-y-2 pt-2">
                  {activeSectorData.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleStabilizeSector(opt.correct)}
                      className="w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-400/50 text-slate-200 transition-all cursor-pointer shadow-sm"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector Insight */}
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50 text-xs text-blue-300">
                <strong>Field Takeaway:</strong> {activeSectorData.insight}
              </div>
            </div>

            {/* Advance */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onJumpToSection(5)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
              >
                <span>Proceed to Section 6: Virtual Engineering Lab</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
