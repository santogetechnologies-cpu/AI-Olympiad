// ─────────────────────────────────────────────────────────────────────────────
// LESSON 1: ALIVE TOPIC-SPECIFIC CONCEPT EXPERIENCE (WHAT IS IT? + SIMPLE MEANING)
// Replaces static cards with 14 unique, alive, interactive domain environments:
// Farm, Road, Safety, Data, Vision, Health, Neural, Language, City, Robotics,
// Creative, Ethics, Logic, Frontier.
// Features ambient SVG animations, tactile touch reactions, Aura mascot reactions,
// high-contrast frosted glass HUD, zero clipping, zero scrolling.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles, Lightbulb, ArrowRight, CheckCircle2, Shield,
  Zap, Cpu, Eye, Heart, Compass, Activity, Play,
  Wifi, Lock, Terminal, Layers, Radio, RefreshCw
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'

export type Lesson1Domain =
  | 'farm'
  | 'road'
  | 'safety'
  | 'data'
  | 'vision'
  | 'health'
  | 'neural'
  | 'language'
  | 'city'
  | 'robotics'
  | 'creative'
  | 'ethics'
  | 'logic'
  | 'frontier'

export function resolveLesson1Domain(topic: string = '', chapter: string = ''): Lesson1Domain {
  const t = (topic + ' ' + chapter).toLowerCase()
  const has = (regex: RegExp) => regex.test(t)

  if (has(/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/)) return 'farm'
  if (has(/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move)\b/)) return 'road'
  if (has(/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|security)\b/)) return 'safety'
  if (has(/\b(hospitals?|health\w*|med\w*|doctors?|diseases?|cardiac|ecg|radiology|scans?)\b/)) return 'health'
  if (has(/\b(vision|cameras?|eyes?|detect\w*|photos?|shapes?|colors?|contour|pixel)\b/)) return 'vision'
  if (has(/\b(neur\w*|synapses?|deep learning|gradients?|weights?|perceptrons?|backprop\w*)\b/)) return 'neural'
  if (has(/\b(llms?|prompts?|tokens?|transformers?|languages?|words?|story|chatbots?|speech|voice)\b/)) return 'language'
  if (has(/\b(city|cities|buildings?|infrastructure|grid|smart city|traffic light)\b/)) return 'city'
  if (has(/\b(creat\w*|studios?|draw\w*|imagine|arts?|music|sound|designs?|media|canvas|generator)\b/)) return 'creative'
  if (has(/\b(fair|fairness|bias|rights?|accountab\w*|society|humanity|transparent|governance|ethics)\b/)) return 'ethics'
  if (has(/\b(logic|branch\w*|pythons?|code|coding|commands?|orders?|trees?|if-then|algorithms?)\b/)) return 'logic'
  if (has(/\b(space|satellite|telescope|astro\w*|agents?|mesh|frontiers?|breakthrough\w*|research)\b/)) return 'frontier'
  if (has(/\b(datas?|patterns?|predict\w*|analytics?|learning machines?|intelligence|datasets?)\b/)) return 'data'

  return 'robotics'
}

export interface Lesson1ConceptExperienceProps {
  badge: string
  title: string
  topicTitle?: string
  chapterTitle?: string
  gradeKey?: string
  simpleDefinition: string
  simpleMeaning?: string
  aiDialogue?: string
  onNext: () => void
  nextLabel?: string
}

export const Lesson1ConceptExperience: React.FC<Lesson1ConceptExperienceProps> = ({
  badge,
  title,
  topicTitle,
  chapterTitle,
  gradeKey,
  simpleDefinition,
  simpleMeaning,
  aiDialogue,
  onNext,
  nextLabel = 'Next: Real-World Example'
}) => {
  const resolvedTopic = topicTitle || title
  const domain = resolveLesson1Domain(resolvedTopic, chapterTitle || badge)
  const [interacted, setInteracted] = useState(false)
  const [auraMood, setAuraMood] = useState<'explaining' | 'celebrating' | 'thinking'>('explaining')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleInteract = () => {
    gameAudio.playSuccess()
    setInteracted(true)
    setAuraMood('celebrating')

    const responses: Record<Lesson1Domain, string> = {
      farm: 'Soil sensor connected! Moisture levels calibrated.',
      road: 'LiDAR sweep active! Autonomous lane verified.',
      safety: 'Firewall locked! Encryption matrix active.',
      data: 'Pattern clustered! Data correlation discovered.',
      vision: 'Object recognized! Optical contour verified.',
      health: 'Vital rhythm scanned! Telemetry normal.',
      neural: 'Synapse fired! Neural weights updated.',
      language: 'Token predicted! Language context aligned.',
      city: 'Smart grid balanced! Transit flowing smoothly.',
      robotics: 'Servo actuated! Precision gripper aligned.',
      creative: 'Palette generated! Generative strokes active.',
      ethics: 'Fairness scale balanced! Parity verified.',
      logic: 'Condition true! Flowchart path executed.',
      frontier: 'Satellite downlink verified! Signal beamed.'
    }

    setStatusMessage(responses[domain])
    setTimeout(() => {
      setAuraMood('explaining')
    }, 2800)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ALIVE BACKGROUND SVG ENVIRONMENT PER DOMAIN
  // ─────────────────────────────────────────────────────────────────────────
  const renderAliveBackground = () => {
    switch (domain) {
      case 'farm':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-100/90 via-emerald-50/70 to-emerald-100/80" />
            
            {/* Animated Farm Drone with Radar Pulse */}
            <div
              className="absolute top-3 right-4 sm:right-8 animate-drone-float pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to scan farm field"
            >
              <div className="relative">
                <svg width="68" height="34" viewBox="0 0 68 34" fill="none">
                  {/* Drone Body */}
                  <rect x="18" y="10" width="32" height="12" rx="6" fill="#1E293B" />
                  <circle cx="34" cy="16" r="3" fill="#10B981" className="animate-ping" />
                  {/* Propellers */}
                  <path d="M4 6 H26 M42 6 H64" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Sensor beam */}
                  <path d="M26 22 L10 34 H58 L42 22 Z" fill="#10B981" opacity={interacted ? '0.45' : '0.2'} />
                </svg>
              </div>
            </div>

            {/* Swaying Crop Stalks */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around opacity-40">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-ambient-sway" style={{ animationDelay: `${i * 0.4}s` }}>
                  <svg width="34" height="48" viewBox="0 0 34 48" fill="none">
                    <path d="M17 48 C17 30, 8 20, 4 8 C16 14, 17 32, 17 48 Z" fill="#059669" />
                    <path d="M17 48 C17 30, 26 20, 30 8 C18 14, 17 32, 17 48 Z" fill="#10B981" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )

      case 'road':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-sky-50/70 to-slate-200/80" />
            
            {/* Perspective Road Surface */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-slate-800/20 flex flex-col justify-center items-center">
              <svg width="100%" height="24" className="w-full">
                <line x1="0" y1="12" x2="100%" y2="12" stroke="#FDE047" strokeWidth="3" strokeDasharray="16 16" className="animate-road-dash" />
              </svg>
            </div>

            {/* Smart Vehicle with LiDAR Dome */}
            <div
              className="absolute bottom-6 right-6 sm:right-12 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to trigger autonomous LiDAR radar"
            >
              <svg width="80" height="42" viewBox="0 0 80 42" fill="none">
                <rect x="8" y="16" width="64" height="20" rx="8" fill="#1E293B" />
                <path d="M22 16 L32 6 H48 L58 16 Z" fill="#334155" />
                {/* Wheels */}
                <circle cx="24" cy="36" r="6" fill="#0F172A" />
                <circle cx="56" cy="36" r="6" fill="#0F172A" />
                {/* LiDAR sensor */}
                <circle cx="40" cy="4" r="3" fill="#38BDF8" className="animate-ping" />
                {/* Radar beam arc */}
                <path d="M40 4 L10 0 M40 4 L70 0" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity={interacted ? '1' : '0.4'} />
              </svg>
            </div>
          </div>
        )

      case 'safety':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-emerald-50/40 to-indigo-50/60" />
            
            {/* Hexagonal Cyber Defense Matrix */}
            <div className="absolute inset-0 opacity-25">
              <svg width="100%" height="100%">
                <pattern id="hexGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20 0 L40 10 V30 L20 40 L0 30 V10 Z" fill="none" stroke="#10B981" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#hexGrid)" />
              </svg>
            </div>

            {/* Glowing Shield Hotspot */}
            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to activate cybersecurity shield"
            >
              <div className={`p-2 rounded-2xl border transition-all ${
                interacted
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-200 ring-2 ring-emerald-400'
                  : 'bg-white/80 border-emerald-200 hover:scale-105'
              }`}>
                <Shield size={28} className={interacted ? 'text-emerald-600 fill-emerald-100' : 'text-emerald-500'} />
              </div>
            </div>
          </div>
        )

      case 'data':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-blue-50/60 to-purple-50/80" />
            
            {/* Floating Data Matrix Nodes */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%">
                <g className="animate-pulse-glow">
                  <circle cx="20%" cy="25%" r="6" fill="#6366F1" />
                  <circle cx="35%" cy="30%" r="4" fill="#3B82F6" />
                  <circle cx="50%" cy="20%" r="5" fill="#8B5CF6" />
                  <circle cx="80%" cy="28%" r="7" fill="#6366F1" />
                  <line x1="20%" y1="25%" x2="35%" y2="30%" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="35%" y1="30%" x2="50%" y2="20%" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50%" y1="20%" x2="80%" y2="28%" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
                </g>
              </svg>
            </div>

            {/* Data Cluster Interactive Hotspot */}
            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to cluster data points"
            >
              <div className="p-2 rounded-2xl bg-white/85 border border-indigo-200 shadow-2xs hover:scale-105 transition-transform flex items-center gap-1.5">
                <Layers size={22} className="text-indigo-600" />
                <span className="text-[9px] font-black uppercase text-indigo-700">Cluster</span>
              </div>
            </div>
          </div>
        )

      case 'health':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 via-white to-red-50/60" />
            
            {/* Pulsing ECG Heartbeat Wave */}
            <div className="absolute bottom-6 left-0 right-0 h-16 opacity-35">
              <svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path
                  d="M0 30 H120 L130 10 L140 50 L150 15 L160 35 L170 30 H400"
                  fill="none"
                  stroke="#E11D48"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className={interacted ? 'animate-pulse' : ''}
                />
              </svg>
            </div>

            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to record vital rhythm"
            >
              <div className="p-2 rounded-2xl bg-white/85 border border-rose-200 shadow-2xs hover:scale-105 transition-transform flex items-center gap-1.5">
                <Heart size={22} className="text-rose-500 fill-rose-100 animate-pulse" />
                <span className="text-[9px] font-black uppercase text-rose-700">72 BPM</span>
              </div>
            </div>
          </div>
        )

      case 'vision':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-indigo-50/70" />
            
            {/* Viewfinder Target Reticle */}
            <div className="absolute inset-6 border border-sky-300/40 rounded-3xl pointer-events-none">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-500" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-500" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-500" />
            </div>

            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to scan optical contour"
            >
              <div className="p-2 rounded-2xl bg-white/85 border border-sky-200 shadow-2xs hover:scale-105 transition-transform flex items-center gap-1.5">
                <Eye size={22} className="text-sky-600" />
                <span className="text-[9px] font-black uppercase text-sky-700">99% Match</span>
              </div>
            </div>
          </div>
        )

      case 'neural':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-indigo-50/60 to-violet-100/70" />
            
            {/* Synaptic Network Connections */}
            <div className="absolute inset-0 opacity-40">
              <svg width="100%" height="100%">
                <g className="animate-pulse-glow">
                  <circle cx="15%" cy="35%" r="6" fill="#8B5CF6" />
                  <circle cx="15%" cy="65%" r="6" fill="#8B5CF6" />
                  <circle cx="50%" cy="25%" r="7" fill="#6366F1" />
                  <circle cx="50%" cy="50%" r="7" fill="#6366F1" />
                  <circle cx="50%" cy="75%" r="7" fill="#6366F1" />
                  <circle cx="85%" cy="50%" r="8" fill="#EC4899" />
                  <line x1="15%" y1="35%" x2="50%" y2="25%" stroke="#8B5CF6" strokeWidth="2" />
                  <line x1="15%" y1="35%" x2="50%" y2="50%" stroke="#8B5CF6" strokeWidth="2" />
                  <line x1="15%" y1="65%" x2="50%" y2="50%" stroke="#8B5CF6" strokeWidth="2" />
                  <line x1="15%" y1="65%" x2="50%" y2="75%" stroke="#8B5CF6" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#EC4899" strokeWidth="2.5" />
                </g>
              </svg>
            </div>

            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to fire neural pulse"
            >
              <div className="p-2 rounded-2xl bg-white/85 border border-purple-200 shadow-2xs hover:scale-105 transition-transform flex items-center gap-1.5">
                <Cpu size={22} className="text-purple-600 animate-pulse" />
                <span className="text-[9px] font-black uppercase text-purple-700">Weights</span>
              </div>
            </div>
          </div>
        )

      default:
        // Default futuristic tech lab environment
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-sky-50/70" />
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <pattern id="labGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1.5" fill="#6366F1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#labGrid)" />
              </svg>
            </div>

            <div
              className="absolute top-4 right-6 pointer-events-auto cursor-pointer"
              onClick={handleInteract}
              title="Click to calibrate AI companion sensor"
            >
              <div className="p-2 rounded-2xl bg-white/85 border border-indigo-200 shadow-2xs hover:scale-105 transition-transform flex items-center gap-1.5">
                <Zap size={22} className="text-indigo-600" />
                <span className="text-[9px] font-black uppercase text-indigo-700">Calibrate</span>
              </div>
            </div>
          </div>
        )
    }
  }

  // Derive simple meaning with authentic pedagogy
  const displaySimpleMeaning =
    simpleMeaning ||
    'A smart way computers look at clues, remember patterns, and solve problems quickly to help us!'

  return (
    <div className="relative w-full h-full max-h-full flex flex-col justify-between overflow-hidden select-none rounded-3xl border border-slate-200/80 shadow-md">
      {/* 1. Alive Dynamic Background Scene */}
      {renderAliveBackground()}

      {/* 2. Top Header HUD with Aura AI Guide */}
      <div className="relative z-10 shrink-0 p-2 sm:p-2.5 m-2 sm:m-3 mb-1 bg-white/90 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-2xs">
        <AuraGuideAvatar
          mood={auraMood}
          speakerName="Aura (AI Guide)"
          size="sm"
          message={
            statusMessage ||
            aiDialogue ||
            `Welcome to ${title}! Let's discover what it is and explore how it works in the real world.`
          }
        />
      </div>

      {/* 3. Center Floating Concept & Simple Meaning Cards */}
      <div className="relative z-10 flex-1 flex flex-col justify-center min-h-0 mx-2 sm:mx-3 my-0.5 space-y-1.5 sm:space-y-2 overflow-y-auto">
        {/* "What is it?" Primary Concept Card */}
        <div className="bg-white/92 backdrop-blur-md border border-indigo-200/90 rounded-2xl p-3 sm:p-4 shadow-sm space-y-1.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-indigo-600 shrink-0" />
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-950">
                What is it?
              </h2>
            </div>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-snug sm:leading-relaxed">
            {simpleDefinition}
          </p>
        </div>

        {/* "Simple Meaning" Intuitive Translation Card */}
        <div className="bg-amber-50/90 backdrop-blur-md border border-amber-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Lightbulb size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                Simple Meaning:
              </span>
              <p className="text-[11px] sm:text-xs text-amber-950 font-semibold leading-tight mt-0.5">
                {displaySimpleMeaning}
              </p>
            </div>
          </div>
        </div>

        {/* In-Card Telemetry Feedback when object is tapped */}
        {statusMessage && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-bold animate-in fade-in">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <span className="truncate">{statusMessage}</span>
          </div>
        )}
      </div>

      {/* 4. Bottom Footer Navigation */}
      <div className="relative z-10 shrink-0 p-2 sm:p-3 border-t border-slate-200/80 bg-white/90 backdrop-blur-md rounded-b-3xl">
        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span>{nextLabel}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default Lesson1ConceptExperience
