import { useState } from 'react'
import {
  Wrench, Sparkles, CheckCircle2,
  Award, Play, RotateCcw
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import type { CanonicalSection } from './AssignedImageSlot'

export function Section7MakerStudio({
  section,
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const [selectedBrain, setSelectedBrain] = useState<string>('Vision AI')
  const [selectedSensor, setSelectedSensor] = useState<string>('Dual Cameras')
  const [selectedSafety, setSelectedSafety] = useState<string>('Privacy Shield')
  const [selectedAction, setSelectedAction] = useState<string>('Voice Guidance')
  const [builtSystem, setBuiltSystem] = useState(false)

  const handleBuild = () => {
    setBuiltSystem(true)
    gamification.addXP(30, undefined, `maker-studio-${section.id}`)
    gamification.launchConfetti()
    toast.success('🚀 Custom AI Solution Assembled & Verified!')
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
            <Wrench size={16} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
              Creative Solution Studio
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Maker Lab
        </span>
      </div>

      {/* Description */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-4 text-xs text-emerald-950 font-medium space-y-1">
        <div className="font-black flex items-center gap-1 text-emerald-800">
          <Sparkles size={14} /> Design & Configure Your Intelligent Assistant:
        </div>
        <p className="text-slate-600">
          Select the modular components below to assemble a safe, tailored AI system for {section.topicTitle || 'real-world problems'}.
        </p>
      </div>

      {/* Component Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Slot 1: Brain Model */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            1. AI Model Brain:
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'Vision AI', desc: 'Processes shapes & faces', icon: '👁️' },
              { id: 'Language NLP', desc: 'Understands human words', icon: '🗣️' },
              { id: 'Deep Neural Net', desc: 'Multi-layer complex decisions', icon: '🧠' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedBrain(item.id)}
                className={`py-2 px-3 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  selectedBrain === item.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 2: Sensors */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            2. Sensor Input Hardware:
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'Dual Cameras', desc: 'Optical stereoscopic vision', icon: '📷' },
              { id: 'Audio Array', desc: 'Noise-canceling microphone', icon: '🎙️' },
              { id: 'LIDAR Radar', desc: 'Laser distance telemetry', icon: '📡' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedSensor(item.id)}
                className={`py-2 px-3 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  selectedSensor === item.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 3: Safety Guardrail */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            3. Safety & Ethics Rule:
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'Privacy Shield', desc: 'Anonymizes all face data', icon: '🛡️' },
              { id: 'Human Override', desc: 'Requires human sign-off', icon: '👤' },
              { id: 'Bias Checker', desc: 'Audits fair demographic scores', icon: '⚖️' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedSafety(item.id)}
                className={`py-2 px-3 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  selectedSafety === item.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 4: Output Actuator */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            4. Output Action:
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'Voice Guidance', desc: 'Clear audio instruction', icon: '📢' },
              { id: 'Emergency Alert', desc: 'Immediate priority broadcast', icon: '🚨' },
              { id: 'Autonomous Drive', desc: 'Actuates motors and steering', icon: '🚗' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedAction(item.id)}
                className={`py-2 px-3 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  selectedAction === item.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification / Build Button */}
      {!builtSystem ? (
        <button
          onClick={handleBuild}
          className="w-full py-3.5 rounded-2xl font-black text-sm bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
        >
          <Play size={16} fill="currentColor" /> Assemble & Deploy Solution 🚀
        </button>
      ) : (
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-5 rounded-3xl border-2 border-emerald-500/70 text-white space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Award size={24} className="text-amber-400" />
              <div>
                <h4 className="text-sm font-black text-white">System Architecture Certificate</h4>
                <p className="text-[10px] text-emerald-300">Certified by Junior AI Olympiad</p>
              </div>
            </div>
            <button
              onClick={() => setBuiltSystem(false)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} /> Reconfigure
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 text-[10px] block">Brain:</span>
              <span className="font-bold text-white">{selectedBrain}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 text-[10px] block">Sensor:</span>
              <span className="font-bold text-white">{selectedSensor}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 text-[10px] block">Safety:</span>
              <span className="font-bold text-white">{selectedSafety}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 text-[10px] block">Action:</span>
              <span className="font-bold text-white">{selectedAction}</span>
            </div>
          </div>
        </div>
      )}

      {/* Advance Button */}
      <button
        onClick={onComplete}
        className="w-full py-3.5 rounded-2xl font-black text-sm bg-slate-900 hover:bg-slate-800 text-white cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
      >
        <CheckCircle2 size={18} />
        Save Creation & Continue to Final Arena
      </button>
    </div>
  )
}
