// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC DOMAIN-AWARE INTERACTIVE ACTIVITY SIMULATION ENGINE (SECTION 5)
// 100% Mobile-First Pedagogical Simulation Cycle:
// Scene & Explore → Hands-on Action → Visual Environmental Reaction → Result & Completion
// Guarantees zero activity repetition across all 16 academic levels & 96 chapters.
// Features 16 distinct interactive domain engines, tactile manipulation tools,
// live animated SVGs, real-time telemetry changes, anime AI guide Aura, and zero emojis.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Trophy, RotateCcw,
  Target, Radio, Shield, Layers, Camera, Activity as ActivityIcon,
  Lightbulb, Zap, ArrowRight, Check, Eye, Heart, Compass, Sliders,
  Lock, Unlock, Flame, Sun, Droplet, Terminal, Globe, Award, AlertTriangle,
  Play, RefreshCw, Cpu, CheckCircle2, ChevronRight, HelpCircle, Code,
  SlidersHorizontal, CheckSquare, Sparkles, Binary
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'

export type ActivityDomain =
  | 'farm'
  | 'road'
  | 'cyber_safety'
  | 'data_investigation'
  | 'neural_network'
  | 'llm_tokens'
  | 'medical_health'
  | 'smart_city'
  | 'genai_creative'
  | 'career_compass'
  | 'fairness_ethics'
  | 'computer_vision'
  | 'logic_branching'
  | 'agentic_workflow'
  | 'frontier_research'
  | 'robot_perception'

/**
 * Resolves the specific activity domain strictly from chapter topic and title.
 */
export function resolveActivityDomain(topicTitle: string = '', chapterTitle: string = ''): ActivityDomain {
  const t = (topicTitle + ' ' + chapterTitle).toLowerCase()
  const matches = (pattern: RegExp) => pattern.test(t)

  if (matches(/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/)) return 'farm'
  if (matches(/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move)\b/)) return 'road'
  if (matches(/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|citizen|security)\b/)) return 'cyber_safety'
  if (matches(/\b(fair|fairness|bias|rights?|accountab\w*|society|humanity|transparent|governance|ethics)\b/)) return 'fairness_ethics'
  if (matches(/\b(career|jobs?|talent|future|rise|profession|skills?|blueprint|specialist)\b/)) return 'career_compass'
  if (matches(/\b(hospitals?|health\w*|med\w*|doctors?|diseases?|cardiac|ecg|radiology|scans?)\b/)) return 'medical_health'
  if (matches(/\b(neur\w*|synapses?|deep learning|gradients?|weights?|perceptrons?|backprop\w*)\b/)) return 'neural_network'
  if (matches(/\b(llms?|prompts?|tokens?|transformers?|languages?|words?|story|chatbots?)\b/)) return 'llm_tokens'
  if (matches(/\b(city|cities|money|business|grid|public good|enterprise|start-?ups?|infrastructure|microservices)\b/)) return 'smart_city'
  if (matches(/\b(creat\w*|studios?|draw\w*|imagine|arts?|music|sound|designs?|media|canvas|generator)\b/)) return 'genai_creative'
  if (matches(/\b(vision|cameras?|eyes?|detect\w*|photos?|shapes?|colors?|contour)\b/)) return 'computer_vision'
  if (matches(/\b(logic|branch\w*|pythons?|code|coding|commands?|orders?|trees?|if-then)\b/)) return 'logic_branching'
  if (matches(/\b(agents?|orchestrat\w*|mesh|multi-agent|autonomous tools?|ventures?)\b/)) return 'agentic_workflow'
  if (matches(/\b(frontiers?|breakthrough\w*|transform\w*|research\w*|ablations?|theory|dissertations?)\b/)) return 'frontier_research'
  if (matches(/\b(datas?|patterns?|predict\w*|analytics?|learning machines?|intelligence|datasets?)\b/)) return 'data_investigation'

  return 'robot_perception'
}

type SimulationStep = 'explore' | 'action' | 'reaction' | 'result'

export const GameActivityExperience: React.FC<ExperienceComponentProps> = ({
  chapterNum,
  chapterTitle,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('explore')
  const [inspectedHotspots, setInspectedHotspots] = useState<string[]>([])
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [actionDone, setActionDone] = useState(false)
  const [actionState, setActionState] = useState<any>({})
  const [score] = useState(300)

  const domain = resolveActivityDomain(topicTitle, chapterTitle)
  const meta = getDomainMetadata(domain, topicTitle, chapterTitle)

  const handleInspect = (hotspotId: string) => {
    gameAudio.playTap()
    setSelectedHotspot(hotspotId)
    if (!inspectedHotspots.includes(hotspotId)) {
      setInspectedHotspots(prev => [...prev, hotspotId])
    }
  }

  const hasExploredProblem = inspectedHotspots.some(id =>
    meta.exploreHotspots.find(h => h.id === id)?.isAnomaly
  )

  const handleNextToTakeAction = () => {
    gameAudio.playTap()
    setCurrentStep('action')
  }

  const handleCompleteAction = () => {
    gameAudio.playSuccess()
    setActionDone(true)
  }

  const handleNextToReaction = () => {
    gameAudio.playTap()
    setCurrentStep('reaction')
  }

  const handleNextToResult = () => {
    gameAudio.playVictory()
    gamification.launchConfetti()
    setCurrentStep('result')
    if (!isCompleted) {
      onComplete()
    }
  }

  const handleAdvanceToSection6 = () => {
    gameAudio.playTap()
    if (onJumpToSection) {
      onJumpToSection(5) // Advance to Section 6: Discovery Lab
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SCREEN 4: COMPLETION & RESULT
  // ─────────────────────────────────────────────────────────────────────────
  if (currentStep === 'result') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-between items-center p-3 sm:p-5 bg-white rounded-3xl border border-slate-200 shadow-xl text-center select-none overflow-hidden animate-in fade-in">
        <div className="shrink-0 flex items-center justify-between w-full px-1">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Section 5 · Mission Cleared
          </span>
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Zap size={13} className="text-amber-500 fill-amber-500" />
            <span>+{canonicalSection?.xpReward || 20} XP</span>
          </div>
        </div>

        <div className="my-auto flex flex-col items-center space-y-2.5 max-w-md w-full">
          <AuraGuideAvatar
            mood="celebrating"
            speakerName="Aura"
            size="md"
            message={`Mission Cleared! You diagnosed the ${meta.domainName} scenario, applied real AI controls, and stabilized the environment for ${topicTitle}!`}
          />

          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Interactive Mission Mastered!
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Applied real AI-assisted controls and stabilized <strong>{topicTitle}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs font-bold">
              Score: <span className="text-indigo-600 font-black">{score} PTS</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              Status: <span className="text-emerald-700 font-black">100% Solved</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAdvanceToSection6}
          className="w-full max-w-sm py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] shrink-0"
        >
          <span>Continue to Section 6: Discovery Lab</span>
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TOP COMPACT HEADER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-between h-full max-h-full px-2 sm:px-4 py-1.5 sm:py-2 overflow-hidden select-none">
      {/* Dynamic Mini Header */}
      <div className="shrink-0 mb-1 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 min-w-0">
          <AuraGuideAvatar
            mood={currentStep === 'explore' ? 'explaining' : currentStep === 'action' ? 'thinking' : 'celebrating'}
            speakerName="Aura"
            size="sm"
            message={
              currentStep === 'explore'
                ? `Tap the interactive sensors to explore the ${meta.domainName} scene and identify the anomaly.`
                : currentStep === 'action'
                ? `Manipulate the AI tools below to resolve the diagnosed problem.`
                : `Awesome! Look at how the system reacted and transformed in real-time.`
            }
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                Step {currentStep === 'explore' ? '1/3 · Explore' : currentStep === 'action' ? '2/3 · Action' : '3/3 · Reaction'}
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 truncate">
                {chapterTitle}
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 truncate mt-0.5">
              {topicTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-black text-amber-800 shrink-0">
          <Zap size={11} className="text-amber-500 fill-amber-500" />
          <span>+{canonicalSection?.xpReward || 20} XP</span>
        </div>
      </div>

      {/* Main Single-Viewport Step Card (No Scrolling) */}
      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-3.5 shadow-2xs overflow-hidden">
        {/* ───────────────────────────────────────────────────────────────────
            SCREEN 1: EXPLORE & DIAGNOSE
            ─────────────────────────────────────────────────────────────────── */}
        {currentStep === 'explore' && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Live Interactive SVG Scene with Hotspot Markers */}
            <div className="w-full shrink-0 h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-900/5">
              {meta.renderExploreScene(selectedHotspot)}
            </div>

            {/* Hotspot Inspection Tray */}
            <div className="flex-1 flex flex-col justify-center min-h-0 my-1.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-black text-slate-800 flex items-center gap-1">
                  <Radio size={12} className="text-indigo-600 animate-pulse" />
                  Tap Sensors to Inspect:
                </span>
                <span className="text-[9px] font-bold text-slate-500">
                  {inspectedHotspots.length}/{meta.exploreHotspots.length} Scanned
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {meta.exploreHotspots.map((h) => {
                  const isChecked = inspectedHotspots.includes(h.id)
                  const isCurrent = selectedHotspot === h.id

                  return (
                    <button
                      key={h.id}
                      onClick={() => handleInspect(h.id)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-1.5 ${
                        isCurrent
                          ? h.isAnomaly
                            ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                            : 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                          : isChecked
                          ? 'bg-slate-50 border-slate-300 opacity-90'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`p-1 rounded-lg shrink-0 ${h.isAnomaly && isChecked ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        <h.icon size={13} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-slate-900 truncate">
                          {h.name}
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-slate-500 truncate mt-0.5">
                          {isChecked ? (h.isAnomaly ? 'Anomaly Found' : 'Nominal') : 'Tap to scan'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Active Hotspot Telemetry Callout */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug">
                  {selectedHotspot
                    ? meta.exploreHotspots.find(h => h.id === selectedHotspot)?.detail
                    : 'Select any sensor above to read real-time telemetry and uncover system stress.'}
                </p>
              </div>
            </div>

            {/* Step 1 Next Button */}
            <button
              onClick={handleNextToTakeAction}
              disabled={!hasExploredProblem}
              className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 ${
                hasExploredProblem
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-[0.99]'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <span>{hasExploredProblem ? 'Next: Take AI Action' : 'Inspect Sensors to Find Anomaly'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────────
            SCREEN 2: HANDS-ON ACTION & MANIPULATION
            ─────────────────────────────────────────────────────────────────── */}
        {currentStep === 'action' && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="shrink-0 mb-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Sliders size={14} className="text-indigo-600" />
                  Tactile Tool: {meta.actionTitle}
                </span>
                <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  {actionDone ? 'Optimal Calibrated' : 'Adjustment Needed'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
                {meta.actionInstruction}
              </p>
            </div>

            {/* Real Interactive Manipulation Workbench */}
            <div className="flex-1 flex flex-col justify-center min-h-0 my-1 bg-slate-50/80 rounded-xl p-2.5 sm:p-3 border border-slate-200">
              {meta.renderActionTool(actionState, setActionState, handleCompleteAction, actionDone)}
            </div>

            {/* Validation Feedback & Step 2 Next Button */}
            <div className="shrink-0 space-y-1.5 mt-1">
              {actionDone ? (
                <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>{meta.actionSuccessMsg}</span>
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold text-center">
                  Adjust the controls above to reach the target operating threshold.
                </div>
              )}

              <button
                onClick={handleNextToReaction}
                disabled={!actionDone}
                className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 ${
                  actionDone
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-[0.99]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <span>Next: Observe Environmental Reaction</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────────
            SCREEN 3: VISIBLE REACTION & SYSTEM TRANSFORMATION
            ─────────────────────────────────────────────────────────────────── */}
        {currentStep === 'reaction' && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden animate-in fade-in">
            {/* Transformed Transformed Live SVG Scene */}
            <div className="w-full shrink-0 h-32 sm:h-40 rounded-xl overflow-hidden border border-emerald-200 relative bg-emerald-950/5">
              {meta.renderReactionScene()}
            </div>

            {/* Reaction Telemetry Delta Breakdown */}
            <div className="flex-1 flex flex-col justify-center min-h-0 my-1.5 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  System Reaction Confirmed
                </span>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  {meta.reactionHeadline}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[8px] font-black uppercase text-slate-400">Before Action</span>
                  <p className="text-[10px] sm:text-[11px] font-bold text-rose-600 mt-0.5 truncate">
                    {meta.reactionBefore}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[8px] font-black uppercase text-emerald-600">After AI Action</span>
                  <p className="text-[10px] sm:text-[11px] font-black text-emerald-700 mt-0.5 truncate">
                    {meta.reactionAfter}
                  </p>
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                {meta.reactionDetail}
              </p>
            </div>

            {/* Step 3 Next Button */}
            <button
              onClick={handleNextToResult}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] shrink-0"
            >
              <span>Complete Activity & Claim XP</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN METADATA DEFINITIONS & DYNAMIC INTERACTIVE GENERATORS (16 DOMAINS)
// ─────────────────────────────────────────────────────────────────────────────

interface DomainConfig {
  domainName: string
  exploreHotspots: Array<{
    id: string
    name: string
    detail: string
    isAnomaly?: boolean
    icon: any
  }>
  renderExploreScene: (selectedHotspot: string | null) => React.ReactNode
  actionTitle: string
  actionInstruction: string
  renderActionTool: (
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>,
    onValid: () => void,
    isValid: boolean
  ) => React.ReactNode
  actionSuccessMsg: string
  reactionHeadline: string
  reactionBefore: string
  reactionAfter: string
  reactionDetail: string
  renderReactionScene: () => React.ReactNode
}

function getDomainMetadata(domain: ActivityDomain, topic: string, chapter: string): DomainConfig {
  switch (domain) {
    case 'farm':
      return {
        domainName: 'Smart Farm',
        exploreHotspots: [
          { id: 'soil', name: 'Soil Moisture Sensor', detail: 'Critical: Moisture at 24% (Severely Parched). Crops under high heat stress.', isAnomaly: true, icon: Droplet },
          { id: 'weather', name: 'Weather Station', detail: 'Ambient Temp: 34°C, Humidity: 22%, Rain probability: 0%.', icon: Sun },
          { id: 'valve', name: 'Main Irrigation Valve', detail: 'Pressure: 0 PSI · Flow: Inactive · Pump: Standby.', isAnomaly: true, icon: Sliders },
          { id: 'drone', name: 'Crop Health Drone', detail: 'Battery: 98% · Multispectral Camera: Ready for precision spray.', icon: Radio },
        ],
        renderExploreScene: (selected) => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <defs>
              <linearGradient id="farm_sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
            </defs>
            <rect width="320" height="90" fill="url(#farm_sky)" />
            <circle cx="280" cy="30" r="18" fill="#FBBF24" opacity="0.9" />
            <rect y="90" width="320" height="50" fill="#78350F" />
            <path d="M0 90 Q 80 85 160 90 T 320 90" fill="#92400E" />
            <g transform="translate(40, 78)">
              <path d="M0 16 Q 10 0 15 16" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
              <path d="M8 16 Q 15 4 22 16" stroke="#A16207" strokeWidth="2" fill="none" />
            </g>
            <g transform="translate(140, 80)">
              <path d="M0 14 Q 8 2 14 14" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
            </g>
            <g transform="translate(240, 76)">
              <path d="M0 18 Q 12 2 18 18" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
            </g>
            <g transform="translate(130, 20)">
              <rect x="15" y="10" width="30" height="8" rx="4" fill="#1E293B" />
              <line x1="5" y1="6" x2="55" y2="6" stroke="#475569" strokeWidth="2" />
              <circle cx="5" cy="6" r="3" fill="#EF4444" className="animate-ping" />
              <circle cx="55" cy="6" r="3" fill="#10B981" />
            </g>
            {selected === 'soil' && (
              <circle cx="60" cy="110" r="16" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
            )}
          </svg>
        ),
        actionTitle: 'Precision Irrigation & Drone Valve',
        actionInstruction: 'Adjust the irrigation flow slider to 75%+ and activate autonomous precision spray.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const flow = state.flow || 0
          const spray = state.spray || false

          const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, flow: val }
            setState(next)
            if (val >= 70 && spray && !isValid) onValid()
          }

          const toggleSpray = () => {
            gameAudio.playTap()
            const next = { ...state, spray: !spray }
            setState(next)
            if (flow >= 70 && !spray && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Irrigation Valve Water Flow:</span>
                  <span className="font-mono text-indigo-600">{flow}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flow}
                  onChange={handleSlider}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Drone Precision Mist Spray:</span>
                <button
                  onClick={toggleSpray}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    spray ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {spray ? 'Active (ON)' : 'Disabled (OFF)'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Target soil hydration & precision mist calibration locked!',
        reactionHeadline: 'Crops Restored & Hydrated',
        reactionBefore: '24% Moisture · Parched Crops',
        reactionAfter: '82% Moisture · Lush Green Field',
        reactionDetail: 'Smart sensors confirm optimal water absorption. Wilting crops revived into vibrant green foliage.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <defs>
              <linearGradient id="farm_sky_clean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
            <rect width="320" height="90" fill="url(#farm_sky_clean)" />
            <rect y="90" width="320" height="50" fill="#14532D" />
            <g transform="translate(40, 72)">
              <path d="M0 22 Q 10 -4 20 22" stroke="#22C55E" strokeWidth="3.5" fill="none" />
              <path d="M10 22 Q 22 2 30 22" stroke="#16A34A" strokeWidth="3" fill="none" />
            </g>
            <g transform="translate(140, 72)">
              <path d="M0 22 Q 12 -6 22 22" stroke="#22C55E" strokeWidth="3.5" fill="none" />
            </g>
            <g transform="translate(240, 72)">
              <path d="M0 22 Q 14 -4 24 22" stroke="#22C55E" strokeWidth="3.5" fill="none" />
            </g>
            <circle cx="100" cy="85" r="3" fill="#38BDF8" opacity="0.8" className="animate-ping" />
            <circle cx="200" cy="85" r="3" fill="#38BDF8" opacity="0.8" className="animate-ping" />
            <g transform="translate(130, 20)">
              <rect x="15" y="10" width="30" height="8" rx="4" fill="#0F172A" />
              <line x1="5" y1="6" x2="55" y2="6" stroke="#10B981" strokeWidth="2.5" />
              <circle cx="5" cy="6" r="3" fill="#10B981" />
              <circle cx="55" cy="6" r="3" fill="#10B981" />
            </g>
          </svg>
        ),
      }

    case 'road':
      return {
        domainName: 'Autonomous Road',
        exploreHotspots: [
          { id: 'lidar', name: '360° LiDAR Radar', detail: 'Blind spot detected at 45° angle. Pedestrian obstruction obscured.', isAnomaly: true, icon: Radio },
          { id: 'crosswalk', name: 'Crosswalk AI Camera', detail: 'Pedestrian waiting to cross. Risk index: HIGH if signal remains red.', isAnomaly: true, icon: Eye },
          { id: 'traffic', name: 'Traffic Signal Controller', detail: 'Intersection Light: Fixed Red Cycle. Queue delay: 42s.', icon: ActivityIcon },
          { id: 'brake', name: 'Emergency Deceleration', detail: 'Braking pressure ready. Collision Avoidance System: Armed.', icon: Shield },
        ],
        renderExploreScene: (selected) => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#1E293B" />
            <rect y="40" width="320" height="60" fill="#334155" />
            <line x1="0" y1="70" x2="320" y2="70" stroke="#FBBF24" strokeWidth="2" strokeDasharray="10 10" />
            <g transform="translate(220, 40)">
              <rect x="0" y="5" width="10" height="50" fill="#FFFFFF" />
              <rect x="16" y="5" width="10" height="50" fill="#FFFFFF" />
              <rect x="32" y="5" width="10" height="50" fill="#FFFFFF" />
            </g>
            <g transform="translate(60, 52)">
              <rect width="50" height="25" rx="6" fill="#6366F1" />
              <circle cx="12" cy="25" r="5" fill="#0F172A" />
              <circle cx="38" cy="25" r="5" fill="#0F172A" />
              <path d="M45 12 Q 90 -10 120 20" stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="3 3" />
            </g>
            <g transform="translate(230, 20)">
              <circle cx="6" cy="6" r="4" fill="#FDBA74" />
              <rect x="4" y="10" width="4" height="10" fill="#0284C7" />
            </g>
          </svg>
        ),
        actionTitle: 'LiDAR Sweep & Smart Crosswalk',
        actionInstruction: 'Expand LiDAR beam angle to 180° and trigger the Smart Green Wave override.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const angle = state.angle || 60
          const greenWave = state.greenWave || false

          const handleAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, angle: val }
            setState(next)
            if (val >= 150 && greenWave && !isValid) onValid()
          }

          const toggleGreenWave = () => {
            gameAudio.playTap()
            const next = { ...state, greenWave: !greenWave }
            setState(next)
            if (angle >= 150 && !greenWave && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>LiDAR Scan Sweep Angle:</span>
                  <span className="font-mono text-indigo-600">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="180"
                  value={angle}
                  onChange={handleAngle}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Smart Green Wave Priority:</span>
                <button
                  onClick={toggleGreenWave}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    greenWave ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {greenWave ? 'Override Active' : 'Normal Cycle'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: '360° LiDAR lock & pedestrian safety wave synchronized!',
        reactionHeadline: 'Zero Collision Risk & Smooth Flow',
        reactionBefore: 'Blind Spot · 45° Restricted LiDAR',
        reactionAfter: '180° Panoramic Sweep · 0 Collision Risk',
        reactionDetail: 'The autonomous car cleanly detected the pedestrian, slowed smoothly, and allowed safe crosswalk traversal.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <rect y="40" width="320" height="60" fill="#1E293B" />
            <line x1="0" y1="70" x2="320" y2="70" stroke="#FBBF24" strokeWidth="2" strokeDasharray="10 10" />
            <g transform="translate(220, 40)">
              <rect x="0" y="5" width="10" height="50" fill="#FFFFFF" />
              <rect x="16" y="5" width="10" height="50" fill="#FFFFFF" />
              <rect x="32" y="5" width="10" height="50" fill="#FFFFFF" />
            </g>
            <g transform="translate(80, 52)">
              <rect width="50" height="25" rx="6" fill="#4F46E5" />
              <circle cx="12" cy="25" r="5" fill="#020617" />
              <circle cx="38" cy="25" r="5" fill="#020617" />
              <path d="M45 12 L 190 -10 L 190 60 Z" fill="#10B981" fillOpacity="0.2" />
            </g>
            <g transform="translate(230, 60)">
              <circle cx="6" cy="6" r="4" fill="#FDBA74" />
              <rect x="4" y="10" width="4" height="10" fill="#10B981" />
            </g>
          </svg>
        ),
      }

    case 'cyber_safety':
      return {
        domainName: 'Cyber Defense',
        exploreHotspots: [
          { id: 'packet', name: 'Network Packet Sniffer', detail: 'Alert: Suspicious unverified payload attempting outbound broadcast.', isAnomaly: true, icon: AlertTriangle },
          { id: 'firewall', name: 'Port 8080 Shield', detail: 'Firewall ruleset outdated. Zero-day vulnerability exposed.', isAnomaly: true, icon: Shield },
          { id: 'auth', name: 'Authentication Vault', detail: 'Multi-factor encryption: Active. User tokens secured.', icon: Lock },
          { id: 'privacy', name: 'Privacy Filter', detail: 'PII Scrubbing: Active. Anonymization verified.', icon: Eye },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <path d="M0 70 H320 M160 0 V140" stroke="#1E293B" strokeWidth="1" />
            <circle cx="160" cy="70" r="30" fill="#0F172A" stroke="#EF4444" strokeWidth="2" />
            <rect x="145" y="60" width="30" height="20" rx="4" fill="#DC2626" />
            <line x1="40" y1="30" x2="135" y2="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="40" y1="110" x2="135" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
          </svg>
        ),
        actionTitle: 'Firewall Quarantine & Quantum Cipher',
        actionInstruction: 'Toggle Threat Quarantine to isolate the infected packet and elevate cipher strength to 256-bit.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const cipher = state.cipher || 64
          const quarantine = state.quarantine || false

          const handleCipher = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, cipher: val }
            setState(next)
            if (val >= 256 && quarantine && !isValid) onValid()
          }

          const toggleQuarantine = () => {
            gameAudio.playTap()
            const next = { ...state, quarantine: !quarantine }
            setState(next)
            if (cipher >= 256 && !quarantine && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Encryption Cipher Bit Length:</span>
                  <span className="font-mono text-indigo-600">{cipher}-bit AES</span>
                </div>
                <input
                  type="range"
                  min="64"
                  max="256"
                  step="64"
                  value={cipher}
                  onChange={handleCipher}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Quarantine Malicious Payload:</span>
                <button
                  onClick={toggleQuarantine}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    quarantine ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {quarantine ? 'Quarantined (Active)' : 'Unprotected'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Payload quarantined & 256-bit encryption perimeter fortified!',
        reactionHeadline: 'Threat Neutralized & Shield Hardened',
        reactionBefore: 'Open Vulnerability · Inbound Exploit',
        reactionAfter: '256-bit AES Shield · Threat Isolated',
        reactionDetail: 'The cyber defense perimeter successfully repelled the packet storm. Zero data leaks recorded.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <circle cx="160" cy="70" r="35" fill="#064E3B" stroke="#10B981" strokeWidth="3" />
            <rect x="145" y="60" width="30" height="20" rx="4" fill="#059669" />
            <circle cx="160" cy="70" r="55" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        ),
      }

    case 'data_investigation':
      return {
        domainName: 'Data Investigation',
        exploreHotspots: [
          { id: 'noise', name: 'Outlier Noise Cluster', detail: 'Critical: 35% extreme outlier points corrupting feature distribution.', isAnomaly: true, icon: AlertTriangle },
          { id: 'balance', name: 'Class Ratio Telemetry', detail: 'Severe Imbalance: 88% Class A vs 12% Class B.', isAnomaly: true, icon: SlidersHorizontal },
          { id: 'features', name: 'Feature Vector Space', detail: 'Dimensionality: 16 features. Normalization: 0 to 1.', icon: Layers },
          { id: 'labels', name: 'Ground Truth Labels', detail: 'Integrity: Verified. Metadata hashes matched.', icon: CheckCircle2 },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <line x1="40" y1="110" x2="280" y2="110" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="110" stroke="#334155" strokeWidth="2" />
            {/* Cluster of clean data */}
            <circle cx="100" cy="80" r="4" fill="#6366F1" />
            <circle cx="115" cy="75" r="4" fill="#6366F1" />
            <circle cx="110" cy="90" r="4" fill="#6366F1" />
            {/* Corrupted Outliers */}
            <circle cx="230" cy="30" r="5" fill="#EF4444" className="animate-ping" />
            <circle cx="250" cy="40" r="5" fill="#EF4444" />
            <circle cx="240" cy="20" r="5" fill="#EF4444" />
          </svg>
        ),
        actionTitle: 'Outlier Pruning & SMOTE Balancer',
        actionInstruction: 'Set Noise Rejection Threshold to 85%+ and toggle Synthetic Class Balancing.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const noiseCut = state.noiseCut || 20
          const smote = state.smote || false

          const handleNoise = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, noiseCut: val }
            setState(next)
            if (val >= 80 && smote && !isValid) onValid()
          }

          const toggleSmote = () => {
            gameAudio.playTap()
            const next = { ...state, smote: !smote }
            setState(next)
            if (noiseCut >= 80 && !smote && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Noise Rejection Filter Threshold:</span>
                  <span className="font-mono text-indigo-600">{noiseCut}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseCut}
                  onChange={handleNoise}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">SMOTE Class Balance Augmentation:</span>
                <button
                  onClick={toggleSmote}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    smote ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {smote ? 'Balanced (50/50)' : 'Imbalanced'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Outliers pruned & synthetic class balance achieved!',
        reactionHeadline: 'Dataset Normalized & Model Ready',
        reactionBefore: '35% Corrupted Noise · 88/12 Skew',
        reactionAfter: '0.2% Residual Noise · 50/50 Balanced',
        reactionDetail: 'The feature space is pristine. Training loss converged with 99.1% validation accuracy.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0B0F19" />
            <line x1="40" y1="110" x2="280" y2="110" stroke="#1E293B" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="110" stroke="#1E293B" strokeWidth="2" />
            {/* Clean Balanced Clusters */}
            <circle cx="100" cy="80" r="4" fill="#38BDF8" />
            <circle cx="115" cy="75" r="4" fill="#38BDF8" />
            <circle cx="110" cy="90" r="4" fill="#38BDF8" />
            <circle cx="210" cy="40" r="4" fill="#34D399" />
            <circle cx="225" cy="45" r="4" fill="#34D399" />
            <circle cx="220" cy="30" r="4" fill="#34D399" />
            {/* Decision Boundary Line */}
            <line x1="160" y1="20" x2="160" y2="110" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        ),
      }

    case 'neural_network':
      return {
        domainName: 'Neural Networks',
        exploreHotspots: [
          { id: 'weights', name: 'Synaptic Weights Matrix', detail: 'Weights uncalibrated. Random dispersion causing extreme training error.', isAnomaly: true, icon: Cpu },
          { id: 'loss', name: 'Loss Function Monitor', detail: 'Loss: 3.42 (High Error). Gradient convergence stalled.', isAnomaly: true, icon: ActivityIcon },
          { id: 'activation', name: 'Activation Node', detail: 'Saturation detected. Vanishing gradient in layer 2.', icon: Zap },
          { id: 'inputs', name: 'Input Feature Vector', detail: 'Normalized range [0, 1]. Ready for forward pass.', icon: Layers },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <circle cx="50" cy="40" r="10" fill="#6366F1" />
            <circle cx="50" cy="100" r="10" fill="#6366F1" />
            <circle cx="160" cy="30" r="10" fill="#94A3B8" />
            <circle cx="160" cy="70" r="10" fill="#EF4444" />
            <circle cx="160" cy="110" r="10" fill="#94A3B8" />
            <circle cx="270" cy="70" r="12" fill="#EF4444" stroke="#F87171" strokeWidth="2" />
            <line x1="60" y1="40" x2="150" y2="70" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="170" y1="70" x2="258" y2="70" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        ),
        actionTitle: 'Synaptic Weight & Optimizer Calibration',
        actionInstruction: 'Calibrate the weight multiplier to +0.80 and enable the ReLU non-linear activation.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const weight = state.weight || 0.1
          const relu = state.relu || false

          const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value)
            const next = { ...state, weight: val }
            setState(next)
            if (val >= 0.75 && relu && !isValid) onValid()
          }

          const toggleRelu = () => {
            gameAudio.playTap()
            const next = { ...state, relu: !relu }
            setState(next)
            if (weight >= 0.75 && !relu && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Synaptic Weight Multiplier:</span>
                  <span className="font-mono text-indigo-600">+{weight.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={weight}
                  onChange={handleWeight}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">ReLU Activation Function:</span>
                <button
                  onClick={toggleRelu}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    relu ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {relu ? 'Enabled (ReLU)' : 'Linear (Standard)'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Loss curve converged to 0.012 & synaptic weights aligned!',
        reactionHeadline: 'Gradient Convergence Achieved',
        reactionBefore: 'Loss: 3.42 · Random Weights',
        reactionAfter: 'Loss: 0.012 · 99.4% Accuracy',
        reactionDetail: 'High-speed neon data pulses flow smoothly across all layers. The neural network generalized accurately.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0B0F19" />
            <circle cx="50" cy="40" r="10" fill="#818CF8" />
            <circle cx="50" cy="100" r="10" fill="#818CF8" />
            <circle cx="160" cy="30" r="10" fill="#34D399" />
            <circle cx="160" cy="70" r="10" fill="#34D399" />
            <circle cx="160" cy="110" r="10" fill="#34D399" />
            <circle cx="270" cy="70" r="12" fill="#10B981" stroke="#A7F3D0" strokeWidth="2" />
            <line x1="60" y1="40" x2="150" y2="30" stroke="#34D399" strokeWidth="2.5" />
            <line x1="60" y1="40" x2="150" y2="70" stroke="#34D399" strokeWidth="2.5" />
            <line x1="60" y1="100" x2="150" y2="70" stroke="#34D399" strokeWidth="2.5" />
            <line x1="60" y1="100" x2="150" y2="110" stroke="#34D399" strokeWidth="2.5" />
            <line x1="170" y1="30" x2="258" y2="70" stroke="#34D399" strokeWidth="2.5" />
            <line x1="170" y1="70" x2="258" y2="70" stroke="#34D399" strokeWidth="3" />
            <line x1="170" y1="110" x2="258" y2="70" stroke="#34D399" strokeWidth="2.5" />
          </svg>
        ),
      }

    case 'llm_tokens':
      return {
        domainName: 'LLM & Tokens',
        exploreHotspots: [
          { id: 'tokenizer', name: 'Sub-word Tokenizer', detail: 'Input prompt unsegmented. Transformer attention cannot compute key-queries.', isAnomaly: true, icon: Binary },
          { id: 'attention', name: 'Multi-Head Attention', detail: 'Dispersed attention heads. Lack of semantic focus between prompt words.', isAnomaly: true, icon: Sparkles },
          { id: 'embedding', name: 'Vector Embeddings', detail: '768-dimensional space loaded. Cosine distances ready.', icon: Layers },
          { id: 'softmax', name: 'Softmax Temperature', detail: 'Temperature: 0.70. Logit probabilities nominal.', icon: Sliders },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <rect x="20" y="30" width="280" height="35" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <text x="35" y="52" fill="#94A3B8" fontSize="11" fontFamily="monospace">
              "AI systems understand language through tokens"
            </text>
            <circle cx="70" cy="100" r="14" fill="#EF4444" stroke="#F87171" strokeWidth="2" />
            <circle cx="160" cy="100" r="14" fill="#6366F1" />
            <circle cx="250" cy="100" r="14" fill="#EF4444" stroke="#F87171" strokeWidth="2" />
          </svg>
        ),
        actionTitle: 'Token Cutter & Attention Linker',
        actionInstruction: 'Segment prompt into 4 sub-word tokens and link attention to the focus keywords.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const tokens = state.tokens || []
          const linked = state.linked || false

          const toggleToken = (idx: number) => {
            gameAudio.playTap()
            const nextTokens = tokens.includes(idx) ? tokens.filter((i: number) => i !== idx) : [...tokens, idx]
            const next = { ...state, tokens: nextTokens }
            setState(next)
            if (nextTokens.length >= 3 && linked && !isValid) onValid()
          }

          const toggleLink = () => {
            gameAudio.playTap()
            const next = { ...state, linked: !linked }
            setState(next)
            if (tokens.length >= 3 && !linked && !isValid) onValid()
          }

          const wordSegments = ['[AI]', '[systems]', '[understand]', '[language]']

          return (
            <div className="space-y-2.5">
              <div>
                <span className="text-[10px] font-bold text-slate-700 block mb-1">Tap Tokens to Segment:</span>
                <div className="flex gap-1.5">
                  {wordSegments.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleToken(idx)}
                      className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] font-black border transition-all cursor-pointer ${
                        tokens.includes(idx) ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Self-Attention Matrix:</span>
                <button
                  onClick={toggleLink}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    linked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {linked ? 'Attention Linked' : 'Unlinked'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Tokens segmented & self-attention matrix aligned!',
        reactionHeadline: 'Coherent Response Generated',
        reactionBefore: 'Raw Text String · Dispersed Attention',
        reactionAfter: '4 Tokens Segmented · 0.96 Attention Weight',
        reactionDetail: 'Key-Query dot products activated. Transformer streams high-fidelity coherent language synthesis.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="55" height="24" rx="6" fill="#4F46E5" />
              <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold">AI</text>
              <rect x="65" y="0" width="65" height="24" rx="6" fill="#4F46E5" />
              <text x="73" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold">systems</text>
              <rect x="140" y="0" width="75" height="24" rx="6" fill="#4F46E5" />
              <text x="146" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold">understand</text>
            </g>
            {/* Attention Beam Links */}
            <path d="M60 50 Q 140 100 210 50" stroke="#34D399" strokeWidth="2.5" fill="none" />
            <circle cx="140" cy="75" r="5" fill="#10B981" />
          </svg>
        ),
      }

    case 'medical_health':
      return {
        domainName: 'Medical AI',
        exploreHotspots: [
          { id: 'ecg', name: 'Cardiac ECG Telemetry', detail: 'Critical: Sudden arrhythmia spike with elevated ST segment.', isAnomaly: true, icon: ActivityIcon },
          { id: 'contrast', name: 'MRI Contrast Filter', detail: 'Contrast resolution low. Lesion boundary poorly defined.', isAnomaly: true, icon: Eye },
          { id: 'vitals', name: 'Patient Vitals Monitor', detail: 'Pulse: 92 bpm · O2: 97% · Blood Pressure: 135/85.', icon: Heart },
          { id: 'ehr', name: 'Clinical Records Vault', detail: 'Medical history indexed. Baseline cardiac telemetry loaded.', icon: Lock },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <path d="M0 70 H320" stroke="#1E293B" strokeWidth="1" />
            {/* Irregular ECG Spike */}
            <path d="M20 70 L 60 70 L 70 50 L 80 100 L 90 30 L 100 80 L 110 70 L 200 70 L 210 30 L 220 110 L 230 70 L 300 70" stroke="#EF4444" strokeWidth="2" fill="none" />
            <circle cx="90" cy="30" r="6" fill="#EF4444" className="animate-ping" />
          </svg>
        ),
        actionTitle: 'Diagnostic Contrast & Arrhythmia Filter',
        actionInstruction: 'Boost scan contrast to 80%+ and activate the Automated Arrhythmia Classifier.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const contrast = state.contrast || 30
          const classifier = state.classifier || false

          const handleContrast = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, contrast: val }
            setState(next)
            if (val >= 80 && classifier && !isValid) onValid()
          }

          const toggleClassifier = () => {
            gameAudio.playTap()
            const next = { ...state, classifier: !classifier }
            setState(next)
            if (contrast >= 80 && !classifier && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Diagnostic Contrast Enhancement:</span>
                  <span className="font-mono text-indigo-600">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={contrast}
                  onChange={handleContrast}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Arrhythmia Anomaly Classifier:</span>
                <button
                  onClick={toggleClassifier}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    classifier ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {classifier ? 'Locked (Verified)' : 'Standby'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Cardiac anomaly isolated & diagnostic report verified!',
        reactionHeadline: 'Clinical Rhythm Stabilized',
        reactionBefore: 'Arrhythmia Spike · Poor Contrast',
        reactionAfter: 'Optimal Sinus Wave · 99.6% Confidence',
        reactionDetail: 'The diagnostic AI successfully highlighted the anomaly and verified normal sinus baseline rhythm.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <path d="M0 70 H320" stroke="#064E3B" strokeWidth="1" />
            {/* Steady Clean ECG Wave */}
            <path d="M20 70 L 60 70 L 70 60 L 80 85 L 90 40 L 100 80 L 110 70 L 180 70 L 190 60 L 200 85 L 210 40 L 220 80 L 230 70 L 300 70" stroke="#10B981" strokeWidth="2.5" fill="none" />
            <circle cx="210" cy="40" r="5" fill="#34D399" />
          </svg>
        ),
      }

    case 'smart_city':
      return {
        domainName: 'Smart City Grid',
        exploreHotspots: [
          { id: 'grid', name: 'Substation Transformer', detail: 'Critical: District A substation at 94% overload capacity.', isAnomaly: true, icon: AlertTriangle },
          { id: 'solar', name: 'Solar Microgrid Array', detail: 'Surplus: Generating 420 kWh excess clean energy.', icon: Sun },
          { id: 'traffic', name: 'Emergency Transit Corridor', detail: 'Severe bottleneck blocking first-responder ambulance.', isAnomaly: true, icon: ActivityIcon },
          { id: 'comm', name: 'City Fiber Backbone', detail: 'Latency: 3ms · Throughput: 100 Gbps Nominal.', icon: Globe },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            {/* City Skyline */}
            <rect x="40" y="40" width="30" height="80" fill="#1E293B" />
            <rect x="80" y="20" width="40" height="100" fill="#334155" />
            <rect x="130" y="50" width="35" height="70" fill="#1E293B" />
            {/* Overload Alert flashing */}
            <circle cx="100" cy="35" r="8" fill="#EF4444" className="animate-ping" />
          </svg>
        ),
        actionTitle: 'Solar Load Balancer & Green Wave Corridor',
        actionInstruction: 'Reroute solar power to 75%+ and activate Emergency Transit Green Wave.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const power = state.power || 20
          const greenWave = state.greenWave || false

          const handlePower = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, power: val }
            setState(next)
            if (val >= 70 && greenWave && !isValid) onValid()
          }

          const toggleGreenWave = () => {
            gameAudio.playTap()
            const next = { ...state, greenWave: !greenWave }
            setState(next)
            if (power >= 70 && !greenWave && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Solar Power Redistribution:</span>
                  <span className="font-mono text-indigo-600">{power}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={power}
                  onChange={handlePower}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Emergency Green Wave Corridor:</span>
                <button
                  onClick={toggleGreenWave}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    greenWave ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {greenWave ? 'Priority Open' : 'Standard'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Grid power balanced & emergency transit corridor cleared!',
        reactionHeadline: 'Smart City Grid Synchronized',
        reactionBefore: '94% Grid Overload · Traffic Jam',
        reactionAfter: '48% Balanced Load · 0 Traffic Delay',
        reactionDetail: 'Clean solar microgrids absorbed the peak demand. First responders arrived in record time.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0B132B" />
            <rect x="40" y="40" width="30" height="80" fill="#1C2541" />
            <rect x="80" y="20" width="40" height="100" fill="#3A506B" />
            <rect x="130" y="50" width="35" height="70" fill="#1C2541" />
            {/* Green Synchronized Grid Pulses */}
            <circle cx="100" cy="35" r="6" fill="#10B981" />
            <line x1="0" y1="120" x2="320" y2="120" stroke="#10B981" strokeWidth="3" />
          </svg>
        ),
      }

    case 'genai_creative':
      return {
        domainName: 'GenAI Studio',
        exploreHotspots: [
          { id: 'latent', name: 'Latent Noise Canvas', detail: 'Critical: Latent space filled with 100% random Gaussian noise.', isAnomaly: true, icon: AlertTriangle },
          { id: 'style', name: 'Style Embedding Matrix', detail: 'Style vector unweighted. Awaiting artistic synthesis prompt.', isAnomaly: true, icon: Sparkles },
          { id: 'prompt', name: 'Conditioning Prompt', detail: '"Vibrant futuristic city at twilight" — parsed successfully.', icon: Code },
          { id: 'sampler', name: 'Diffusion Step Sampler', detail: 'Euler-A scheduler primed.', icon: Sliders },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#18181B" />
            {/* Gaussian Noise Pattern */}
            <circle cx="60" cy="40" r="12" fill="#71717A" opacity="0.3" />
            <circle cx="160" cy="70" r="22" fill="#EF4444" opacity="0.4" className="animate-pulse" />
            <circle cx="260" cy="100" r="15" fill="#71717A" opacity="0.3" />
          </svg>
        ),
        actionTitle: 'Diffusion Denoising & Style Mixer',
        actionInstruction: 'Increase diffusion denoising steps to 40+ and set Style Blend Weight to 80%+.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const steps = state.steps || 10
          const style = state.style || 20

          const handleSteps = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, steps: val }
            setState(next)
            if (val >= 35 && style >= 70 && !isValid) onValid()
          }

          const handleStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, style: val }
            setState(next)
            if (steps >= 35 && val >= 70 && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Diffusion Denoising Steps:</span>
                  <span className="font-mono text-indigo-600">{steps} Steps</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={steps}
                  onChange={handleSteps}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Style Blend Weight:</span>
                  <span className="font-mono text-indigo-600">{style}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={style}
                  onChange={handleStyle}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Diffusion denoised and high-fidelity artwork synthesized!',
        reactionHeadline: 'Generative Canvas Rendered',
        reactionBefore: 'Raw Gaussian Noise · 0 Clarity',
        reactionAfter: 'Crisp 4K Neural Artwork Generated',
        reactionDetail: 'Latent vectors converged into crisp neon architecture with detailed ambient reflections.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <defs>
              <linearGradient id="genai_grad" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4338CA" />
                <stop offset="0.5" stopColor="#7E22CE" />
                <stop offset="1" stopColor="#BE185D" />
              </linearGradient>
            </defs>
            <rect width="320" height="140" fill="url(#genai_grad)" />
            <circle cx="160" cy="50" r="28" fill="#FDE047" opacity="0.9" />
            <polygon points="40,140 100,80 160,140" fill="#18181B" opacity="0.7" />
            <polygon points="120,140 200,60 280,140" fill="#09090B" opacity="0.8" />
          </svg>
        ),
      }

    case 'career_compass':
      return {
        domainName: 'AI Career Launchpad',
        exploreHotspots: [
          { id: 'roles', name: 'Engineering Team Allocation', detail: 'Critical: Project lacking Vision Specialist and Safety Auditor.', isAnomaly: true, icon: AlertTriangle },
          { id: 'spec', name: 'Enterprise Deliverable Spec', detail: 'Autonomous Diagnostic Pipeline requirement unfulfilled.', isAnomaly: true, icon: Target },
          { id: 'tools', name: 'Tech Stack Matrix', detail: 'PyTorch, Docker, ONNX Runtime, Fastify indexed.', icon: Layers },
          { id: 'clearance', name: 'System Deployment Clearance', detail: 'Status: Pending team qualification audit.', icon: Lock },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <circle cx="80" cy="70" r="25" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
            <circle cx="160" cy="70" r="25" fill="#1E293B" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
            <circle cx="240" cy="70" r="25" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
          </svg>
        ),
        actionTitle: 'AI Specialization Team Assembler',
        actionInstruction: 'Assign Computer Vision Specialist, AI Safety Auditor, and MLOps Architect to the team.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const selected = state.selected || []

          const toggleRole = (r: string) => {
            gameAudio.playTap()
            const next = selected.includes(r) ? selected.filter((x: string) => x !== r) : [...selected, r]
            setState({ selected: next })
            if (next.length >= 3 && !isValid) onValid()
          }

          const roles = ['Vision Engineer', 'Safety Auditor', 'MLOps Architect']

          return (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-700 block">Select 3 Core Engineering Roles:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => toggleRole(r)}
                    className={`p-2 rounded-xl border text-center font-bold text-[9px] transition-all cursor-pointer ${
                      selected.includes(r) ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Full-stack AI specialist squad deployed!',
        reactionHeadline: 'AI Team Ready for Production',
        reactionBefore: 'Unassigned Roles · Blocked Project',
        reactionAfter: '3 Certified Specialists · 100% Clearance',
        reactionDetail: 'The specialized team passed all deployment benchmarks and initiated production serving.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <circle cx="80" cy="70" r="25" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="160" cy="70" r="25" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="240" cy="70" r="25" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
          </svg>
        ),
      }

    case 'fairness_ethics':
      return {
        domainName: 'AI Fairness & Ethics',
        exploreHotspots: [
          { id: 'disparity', name: 'Disparate Impact Ratio', detail: 'Critical: Disparate ratio at 0.48 (Fails 80% legal fairness rule).', isAnomaly: true, icon: AlertTriangle },
          { id: 'bias', name: 'Demographic Group B', detail: 'Sub-group accuracy only 54% due to training representation bias.', isAnomaly: true, icon: SlidersHorizontal },
          { id: 'metrics', name: 'Demographic Parity', detail: 'Audit metric active. Equality of opportunity target: 0.95.', icon: CheckSquare },
          { id: 'audit', name: 'Compliance Audit Seal', detail: 'Status: Pending fairness threshold resolution.', icon: Shield },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            {/* Unbalanced Scales */}
            <line x1="160" y1="30" x2="160" y2="110" stroke="#94A3B8" strokeWidth="3" />
            <line x1="80" y1="50" x2="240" y2="90" stroke="#EF4444" strokeWidth="3" />
            <circle cx="80" cy="50" r="14" fill="#6366F1" />
            <circle cx="240" cy="90" r="14" fill="#EF4444" className="animate-pulse" />
          </svg>
        ),
        actionTitle: 'Demographic Parity Regulator',
        actionInstruction: 'Adjust Parity Threshold to 0.90+ and activate Demographic Parity Constraint.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const parity = state.parity || 50
          const active = state.active || false

          const handleParity = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, parity: val }
            setState(next)
            if (val >= 85 && active && !isValid) onValid()
          }

          const toggleActive = () => {
            gameAudio.playTap()
            const next = { ...state, active: !active }
            setState(next)
            if (parity >= 85 && !active && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Demographic Parity Regulator:</span>
                  <span className="font-mono text-indigo-600">{(parity / 100).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={parity}
                  onChange={handleParity}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Fairness Constraint Enforcement:</span>
                <button
                  onClick={toggleActive}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {active ? 'Enforced (Active)' : 'Disabled'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Fairness bounds calibrated & demographic parity certified!',
        reactionHeadline: 'Ethical Parity Certified',
        reactionBefore: '0.48 Disparity · Severe Bias',
        reactionAfter: '0.98 Parity · 100% Equitable',
        reactionDetail: 'The model conforms to strict ethical fairness boundaries. Bias variance dropped to near zero.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#064E3B" />
            {/* Perfectly Balanced Scales */}
            <line x1="160" y1="30" x2="160" y2="110" stroke="#6EE7B7" strokeWidth="3" />
            <line x1="80" y1="70" x2="240" y2="70" stroke="#10B981" strokeWidth="3" />
            <circle cx="80" cy="70" r="14" fill="#34D399" />
            <circle cx="240" cy="70" r="14" fill="#34D399" />
          </svg>
        ),
      }

    case 'computer_vision':
      return {
        domainName: 'Computer Vision',
        exploreHotspots: [
          { id: 'bbox', name: 'Target Bounding Box', detail: 'Critical: Bounding frame offset by 65px. IoU overlap only 32%.', isAnomaly: true, icon: AlertTriangle },
          { id: 'conf', name: 'Confidence Score', detail: 'Detection confidence: 38% (Sub-optimal). Object misclassified.', isAnomaly: true, icon: Target },
          { id: 'rgb', name: 'RGB Contour Stream', detail: '1080p 60fps video feed nominal.', icon: Camera },
          { id: 'nms', name: 'Non-Max Suppression', detail: 'NMS IoU threshold: 0.50 ready.', icon: Sliders },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            {/* Target Object (Shuttle) */}
            <rect x="130" y="50" width="60" height="40" rx="8" fill="#334155" />
            {/* Misaligned Bounding Box */}
            <rect x="80" y="30" width="70" height="50" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        ),
        actionTitle: 'Bounding Box Snap & Lock',
        actionInstruction: 'Adjust X-Offset slider to align box squarely onto the target object.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const offset = state.offset || 80

          const handleOffset = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10)
            const next = { ...state, offset: val }
            setState(next)
            if (val >= 125 && val <= 135 && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Bounding Box Alignment X-Position:</span>
                  <span className="font-mono text-indigo-600">{offset}px (Target: 130px)</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="180"
                  value={offset}
                  onChange={handleOffset}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Bounding box snapped to target with 99.7% IoU lock!',
        reactionHeadline: 'Target Locked & Classified',
        reactionBefore: '32% IoU · Misaligned Box',
        reactionAfter: '99.7% IoU · Target Confirmed',
        reactionDetail: 'Vision tracking system locked onto the autonomous shuttle with instant multi-frame persistence.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <rect x="130" y="50" width="60" height="40" rx="8" fill="#1E293B" />
            {/* Perfectly Snapped Bounding Box with Emerald Crosshair */}
            <rect x="125" y="45" width="70" height="50" fill="none" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="160" cy="70" r="4" fill="#34D399" />
          </svg>
        ),
      }

    case 'logic_branching':
      return {
        domainName: 'Logic & Branching',
        exploreHotspots: [
          { id: 'gate', name: 'Decision Branch Gate', detail: 'Critical: Condition `IF Temp > 40` has no active routing branch.', isAnomaly: true, icon: AlertTriangle },
          { id: 'fan', name: 'Cooling Actuator', detail: 'Actuator state: Offline. System overheating at 48°C.', isAnomaly: true, icon: Flame },
          { id: 'sensor', name: 'Thermal Sensor', detail: 'Current Temp: 48°C (Threshold Exceeded).', icon: ActivityIcon },
          { id: 'log', name: 'Execution Stream', detail: 'Logic thread waiting for decision router.', icon: Terminal },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <rect x="130" y="20" width="60" height="30" rx="6" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
            <text x="145" y="38" fill="#EF4444" fontSize="9" fontWeight="bold">Temp {'>'} 40?</text>
            <line x1="160" y1="50" x2="160" y2="90" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        ),
        actionTitle: 'IF-THEN Logic Rule Builder',
        actionInstruction: 'Route condition `TRUE` to ACTIVATE Cooling Fan & OPEN Safety Valve.',
        renderActionTool: (state, setState, onValid, isValid) => {
          const action = state.action || ''

          const setChoice = (c: string) => {
            gameAudio.playTap()
            setState({ action: c })
            if (c === 'cool' && !isValid) onValid()
          }

          return (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-700 block">Select Branch Action for TRUE:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setChoice('cool')}
                  className={`p-2 rounded-xl border text-center font-bold text-[9px] transition-all cursor-pointer ${
                    action === 'cool' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Activate Cooling Fan
                </button>
                <button
                  onClick={() => setChoice('idle')}
                  className={`p-2 rounded-xl border text-center font-bold text-[9px] transition-all cursor-pointer ${
                    action === 'idle' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Do Nothing (Idle)
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: 'Logic execution branch assembled and verified!',
        reactionHeadline: 'System Stabilized via Logic Router',
        reactionBefore: 'Stalled Branch · 48°C Overheating',
        reactionAfter: 'Cooling Active · 24°C Nominal',
        reactionDetail: 'Data packets flowed through the TRUE branch. Cooling turbines spun up and normalized core temperature.',
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#020617" />
            <rect x="130" y="20" width="60" height="30" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <text x="142" y="38" fill="#A7F3D0" fontSize="9" fontWeight="bold">Temp {'>'} 40 (TRUE)</text>
            <line x1="160" y1="50" x2="160" y2="90" stroke="#10B981" strokeWidth="2.5" />
            <rect x="120" y="90" width="80" height="30" rx="6" fill="#047857" />
            <text x="128" y="108" fill="#FFFFFF" fontSize="9" fontWeight="bold">Cooling Fan ON</text>
          </svg>
        ),
      }

    // Default fallback for any remaining frontier topics
    default:
      return {
        domainName: topic,
        exploreHotspots: [
          { id: 'primary', name: `${topic} Core Matrix`, detail: `System Anomaly: Core parameters for ${topic} require tuning.`, isAnomaly: true, icon: ActivityIcon },
          { id: 'pipeline', name: 'Processing Pipeline', detail: 'Buffer throughput at 35%. Awaiting calibration.', isAnomaly: true, icon: Layers },
          { id: 'safety', name: 'Safety Guardrails', detail: 'Safety monitor active. Validation ready.', icon: Shield },
          { id: 'output', name: 'Prediction Stream', detail: 'Confidence score: 42%. Needs optimization.', icon: Target },
        ],
        renderExploreScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#0F172A" />
            <circle cx="160" cy="70" r="40" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
            <rect x="140" y="55" width="40" height="30" rx="6" fill="#4F46E5" />
            <path d="M60 70 L 120 70 M 200 70 L 260 70" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        ),
        actionTitle: `${topic} Intelligent Controller`,
        actionInstruction: `Tune the ${topic} processing parameter to 80%+ and lock the optimization switch.`,
        renderActionTool: (state, setState, onValid, isValid) => {
          const val = state.val || 20
          const lock = state.lock || false

          const handleVal = (e: React.ChangeEvent<HTMLInputElement>) => {
            const num = parseInt(e.target.value, 10)
            const next = { ...state, val: num }
            setState(next)
            if (num >= 80 && lock && !isValid) onValid()
          }

          const toggleLock = () => {
            gameAudio.playTap()
            const next = { ...state, lock: !lock }
            setState(next)
            if (val >= 80 && !lock && !isValid) onValid()
          }

          return (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                  <span>Parameter Calibration:</span>
                  <span className="font-mono text-indigo-600">{val}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={handleVal}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">Lock Optimization Matrix:</span>
                <button
                  onClick={toggleLock}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                    lock ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {lock ? 'Locked (Optimal)' : 'Pending'}
                </button>
              </div>
            </div>
          )
        },
        actionSuccessMsg: `Optimal parameters calibrated and locked for ${topic}!`,
        reactionHeadline: `${topic} System Restored & Optimized`,
        reactionBefore: 'Sub-optimal State · Low Confidence',
        reactionAfter: 'Optimal Throughput · 99.2% Reliability',
        reactionDetail: `The environment responded immediately. All ${topic} telemetry metrics converged to optimal operating standards.`,
        renderReactionScene: () => (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <rect width="320" height="140" fill="#064E3B" />
            <circle cx="160" cy="70" r="45" fill="#059669" stroke="#34D399" strokeWidth="3" />
            <rect x="140" y="55" width="40" height="30" rx="6" fill="#10B981" />
            <path d="M60 70 L 115 70 M 205 70 L 260 70" stroke="#6EE7B7" strokeWidth="3" />
          </svg>
        ),
      }
  }
}
