import React, { useState } from 'react'
import { Palette, ShieldCheck } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 8. CREATION EXPERIENCE ──────────────────────────────────────────────────
// Structure: Modular AI Architecture Studio where students pick and assemble modules to construct an AI app
export const CreationExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config: _config,
  isCompleted,
  onComplete,
}) => {
  const [selectedVision, setSelectedVision] = useState<string>('camera')
  const [selectedModel, setSelectedModel] = useState<string>('classifier')
  const [selectedOutput, setSelectedOutput] = useState<string>('audio_alert')
  const [blueprintCreated, setBlueprintCreated] = useState(false)

  const handleBuild = () => {
    gameAudio.playSuccess()
    setBlueprintCreated(true)
    gamification.launchConfetti()
    if (!isCompleted) onComplete()
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Creation Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center">
            <Palette size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Architecture Maker Studio</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Studio Canvas Active
        </div>
      </div>

      {/* Assembly Canvas Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Input Sensor */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border-2 border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">1. Input Ingestion</span>
          {[
            { id: 'camera', label: 'Wide-Angle Optical Camera', icon: '📷' },
            { id: 'lidar', label: '3D Laser LiDAR Rangefinder', icon: '📡' },
            { id: 'thermal', label: 'Infrared Thermal Scanner', icon: '🌡️' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedVision(opt.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center gap-3 ${
                selectedVision === opt.id
                  ? 'bg-emerald-950/60 border-emerald-400 text-white ring-2 ring-emerald-400/30'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Module 2: AI Processor Model */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border-2 border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">2. Model Engine</span>
          {[
            { id: 'classifier', label: 'Edge-CNN Object Classifier', icon: '🧠' },
            { id: 'transformer', label: 'Vision Transformer (ViT)', icon: '⚡' },
            { id: 'yolo', label: 'Real-Time YOLO Bounding Detector', icon: '🎯' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedModel(opt.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center gap-3 ${
                selectedModel === opt.id
                  ? 'bg-emerald-950/60 border-emerald-400 text-white ring-2 ring-emerald-400/30'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Module 3: Output Actuator */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border-2 border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">3. Output Response</span>
          {[
            { id: 'audio_alert', label: 'Audio Warning Chime', icon: '🔔' },
            { id: 'emergency_brake', label: 'Emergency Brake Actuator', icon: '🛑' },
            { id: 'cloud_telemetry', label: 'Cloud Telemetry Uplink', icon: '☁️' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedOutput(opt.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center gap-3 ${
                selectedOutput === opt.id
                  ? 'bg-emerald-950/60 border-emerald-400 text-white ring-2 ring-emerald-400/30'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Validation Deck */}
      <div className="p-6 rounded-3xl bg-slate-950/90 border-2 border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" /> Compiled System Blueprint
          </h4>
          <p className="text-xs text-slate-400">
            Pipeline: <strong className="text-emerald-300">{selectedVision}</strong> →{' '}
            <strong className="text-emerald-300">{selectedModel}</strong> →{' '}
            <strong className="text-emerald-300">{selectedOutput}</strong>
          </p>
        </div>

        <button
          onClick={handleBuild}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25"
        >
          {blueprintCreated ? '✓ Blueprint Approved' : 'Deploy & Certify System →'}
        </button>
      </div>

      {blueprintCreated && (
        <SuccessCelebration
          title="🎉 Blueprint Officially Certified!"
          subtitle={`Your custom AI architecture for ${topicTitle} is verified safe and operational.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
