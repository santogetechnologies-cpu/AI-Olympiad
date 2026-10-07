import React, { useState } from 'react'
import {
  Compass, Eye, Play, Sparkles, ChevronRight, CheckCircle2,
  Cpu, Shield, Search, Layers, Radio
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPageSceneExplorationProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  videoUrl?: string
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPageSceneExploration: React.FC<FullPageSceneExplorationProps> = ({
  gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile,
  videoUrl,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [activeBeacon, setActiveBeacon] = useState<number | null>(0)
  const [discoveredBeacons, setDiscoveredBeacons] = useState<number[]>([0])
  const [showVideo, setShowVideo] = useState(false)
  const [bonusDiscovered, setBonusDiscovered] = useState(false)

  const isPrimary = gradeKey === 'class3' || gradeKey === 'class4'

  // Hotspots synthesized from topic profile
  const hotspots = [
    {
      id: 0,
      title: profile.step1?.title || 'Sensory Data Gateway',
      summary: profile.step1?.desc || 'AI perceives real-world inputs such as light, voice, and touch.',
      detail: profile.step1?.detail || 'Cameras and microphones convert physical signals into numeric arrays for rapid analysis.',
      tag: 'Step 1: Input Sensing',
      x: '24%',
      y: '38%',
      icon: Cpu,
      discoverySecret: 'Did you know? Sensors take hundreds of measurements every second to help AI react instantly!',
    },
    {
      id: 1,
      title: profile.step2?.title || 'Neural Logic Engine',
      summary: profile.step2?.desc || 'The computer recognizes patterns and applies learned rules.',
      detail: profile.step2?.detail || 'Through layered mathematical weights, the system isolates high-confidence matches without human bias.',
      tag: 'Step 2: Processing Matrix',
      x: '52%',
      y: '28%',
      icon: Layers,
      discoverySecret: 'Hidden Clue: Patterns are like digital footprints that tell the AI what category an object belongs to.',
    },
    {
      id: 2,
      title: profile.step3?.title || 'Real-World Actuator',
      summary: profile.step3?.desc || 'AI makes a safe decision and takes useful action.',
      detail: profile.step3?.detail || 'Whether steering a vehicle or recommending a diagnosis, calibrated outputs assist human life safely.',
      tag: 'Step 3: Safe Action',
      x: '78%',
      y: '55%',
      icon: Shield,
      discoverySecret: 'Safety Rule: Reliable AI always has built-in guardrails to protect privacy and avoid mistakes.',
    },
  ]

  const handleSelectBeacon = (idx: number) => {
    setActiveBeacon(idx)
    if (!discoveredBeacons.includes(idx)) {
      const next = [...discoveredBeacons, idx]
      setDiscoveredBeacons(next)
      gamification.addXP(15, undefined, `scene-beacon-${idx}`)
      toast.success(`🎯 Discovered: ${hotspots[idx].title} (+15 XP)`)
      if (next.length === hotspots.length) {
        gamification.launchConfetti()
        toast.success('🌟 Outstanding Explorer! You mapped the entire environment!', { icon: '🗺️' })
        onComplete()
      }
    }
  }

  const handleBonusDiscover = () => {
    if (bonusDiscovered) return
    setBonusDiscovered(true)
    gamification.addXP(25, undefined, 'scene-secret-bonus')
    gamification.launchConfetti()
    toast.success('💎 Secret Easter Egg Discovered! +25 Exploration XP')
  }

  const activeData = activeBeacon !== null ? hotspots[activeBeacon] : null

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Visual Grid & Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Interactive Scene Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 p-4 sm:p-6 lg:p-8 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Left: Immersive Visual World Environment */}
        <div className="flex-1 flex flex-col bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800 flex items-center gap-1">
                  <Compass size={12} /> Visual Exploration World
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {discoveredBeacons.length}/{hotspots.length} Zones Discovered
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {profile.hook || `Explore how ${topicTitle} works in real life!`}
              </h2>
            </div>

            {videoUrl && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <Play size={14} />
                <span>{showVideo ? 'Hide Briefing Video' : 'Watch Video Briefing'}</span>
              </button>
            )}
          </div>

          {/* Optional CMS Video Stream */}
          {showVideo && videoUrl && (
            <div className="mb-4 aspect-video rounded-2xl overflow-hidden border border-indigo-500/40 shadow-xl bg-black">
              <iframe
                src={videoUrl}
                title={topicTitle}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {/* Visual Interactive Landscape SVG */}
          <div className="flex-1 min-h-[380px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800 relative flex items-center justify-center p-4 overflow-hidden select-none">
            
            {/* Ambient Animated Vector Illustration */}
            <svg viewBox="0 0 800 450" className="w-full h-full max-h-[460px] opacity-80 pointer-events-none">
              <defs>
                <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glowEffect">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid landscape lines */}
              <path d="M 0 320 Q 400 380 800 320" stroke="#1e293b" strokeWidth="2" fill="none" />
              <path d="M 0 380 Q 400 440 800 380" stroke="#0f172a" strokeWidth="3" fill="none" />

              {/* Central Facility / Robot Node */}
              <circle cx="400" cy="225" r="90" fill="url(#neonGlow)" opacity="0.15" filter="url(#glowEffect)" />
              <circle cx="400" cy="225" r="50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              <rect x="360" y="185" width="80" height="80" rx="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
              
              {/* Internal Pulse Core */}
              <circle cx="400" cy="225" r="14" fill="#38bdf8" className="animate-pulse" />
              <path d="M 400 130 L 400 185" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 400 265 L 400 320" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 310 225 L 360 225" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 440 225 L 490 225" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />

              {/* Data stream dots */}
              <circle cx="200" cy="180" r="4" fill="#38bdf8" className="animate-ping" />
              <circle cx="620" cy="250" r="5" fill="#a855f7" className="animate-pulse" />
              <circle cx="680" cy="140" r="3" fill="#34d399" />
            </svg>

            {/* Clickable Pulsing Beacons */}
            {hotspots.map((spot, idx) => {
              const isFound = discoveredBeacons.includes(idx)
              const isSelected = activeBeacon === idx
              const Icon = spot.icon

              return (
                <button
                  key={spot.id}
                  onClick={() => handleSelectBeacon(idx)}
                  style={{ left: spot.x, top: spot.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl flex items-center gap-2 transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-300 shadow-2xl scale-125 z-20 font-black'
                      : isFound
                      ? 'bg-slate-900/90 text-cyan-300 border-2 border-cyan-400 hover:scale-110 shadow-lg'
                      : 'bg-indigo-600/90 text-white animate-bounce hover:scale-110 shadow-xl'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-xs font-bold hidden sm:inline whitespace-nowrap">
                    {spot.title.split(':')[0]}
                  </span>
                  {!isFound && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
                  )}
                </button>
              )
            })}

            {/* Hidden Secret Easter Egg Trigger */}
            <button
              onClick={handleBonusDiscover}
              className={`absolute bottom-3 right-3 text-xs p-2 rounded-xl border transition-all cursor-pointer ${
                bonusDiscovered
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                  : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-amber-400 hover:border-amber-400'
              }`}
              title="Inspect Secret Observation Beacon"
            >
              <Radio size={14} className={bonusDiscovered ? 'text-amber-400 animate-pulse' : ''} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Eye size={13} className="text-cyan-400" /> Tap any pulsing beacon on the map to inspect its real-world mechanism
            </span>
            <span className="font-bold text-cyan-400">Explore Freely</span>
          </div>
        </div>

        {/* Right: Dynamic Inspector & Concept Intelligence Card */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          {activeData ? (
            <div className="bg-slate-900/95 border-2 border-slate-700 rounded-3xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                    {activeData.tag}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Active Node
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{activeData.title}</h3>
                  <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
                    {activeData.summary}
                  </p>
                </div>

                {/* Deep Discovery Card */}
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    How it works in practice:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeData.detail}
                  </p>
                </div>

                {/* Secret Clue Box */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start gap-2">
                  <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Exploration Insight:</strong> {activeData.discoverySecret}
                  </p>
                </div>

                {/* Real-World Industry Application */}
                {profile.useCases && profile.useCases.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Everyday Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.useCases.slice(0, 3).map((uc, i) => (
                        <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700">
                          ✓ {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Jump Button */}
              <div className="pt-4 border-t border-slate-800 mt-4 space-y-2">
                <button
                  onClick={() => onJumpToSection(1)}
                  className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer ${
                    isPrimary
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black'
                  }`}
                >
                  <span>Continue to Section 2: Comic Story Adventure</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center text-slate-400 flex flex-col items-center justify-center h-full">
              <Search size={32} className="text-slate-600 mb-2 animate-pulse" />
              <p className="text-xs">Tap any glowing beacon on the landscape to inspect its secrets.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}
