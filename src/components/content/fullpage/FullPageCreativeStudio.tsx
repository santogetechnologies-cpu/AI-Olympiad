import React, { useState } from 'react'
import {
  Palette, Award, ChevronRight, CheckCircle2,
  Cpu, Shield, Eye
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPageCreativeStudioProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPageCreativeStudio: React.FC<FullPageCreativeStudioProps> = ({
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile: _profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [modelCore, setModelCore] = useState('Neural Perception Engine')
  const [sensorType, setSensorType] = useState('High-Res Optical Camera')
  const [guardrail, setGuardrail] = useState('Human-in-the-Loop Safety Gate')
  const [inventionName, setInventionName] = useState(`Aegis-${topicTitle.substring(0, 10)}`)
  const [certificateIssued, setCertificateIssued] = useState(false)

  const handleIssueCertificate = () => {
    setCertificateIssued(true)
    gamification.addXP(40, undefined, 'maker-cert-issued')
    gamification.launchConfetti()
    toast.success(`🎉 System Blueprint for "${inventionName}" Certified! +40 XP`, { icon: '🏅' })
    onComplete()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-pink-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-3xl shadow-inner">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 bg-pink-950 px-2.5 py-0.5 rounded-full border border-pink-800 flex items-center gap-1">
                  <Palette size={12} /> Creative Maker Studio
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  Design Your Custom AI Solution
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Capstone Foundry: {topicTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleIssueCertificate}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <Award size={15} />
              <span>Issue Official Certificate</span>
            </button>
          </div>
        </div>

        {/* Blueprint Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Component Selection Palette (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            
            <div>
              <label className="text-xs font-black uppercase text-pink-400 tracking-wider block mb-1">
                1. System Invention Name
              </label>
              <input
                type="text"
                value={inventionName}
                onChange={e => setInventionName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Core Brain */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                2. AI Intelligence Core:
              </label>
              {[
                'Neural Perception Engine',
                'Statistical Sequence Predictor',
                'Generative Multimodal Matrix',
              ].map(core => (
                <button
                  key={core}
                  onClick={() => setModelCore(core)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    modelCore === core
                      ? 'bg-pink-950/70 border-pink-500 text-pink-200 ring-1 ring-pink-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{core}</span>
                    {modelCore === core && <CheckCircle2 size={14} className="text-pink-400" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Sensor Array */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                3. Input Sensory Array:
              </label>
              {[
                'High-Res Optical Camera',
                'Audio Acoustic Array',
                'Ultrasonic & Radar Proximity',
              ].map(sensor => (
                <button
                  key={sensor}
                  onClick={() => setSensorType(sensor)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    sensorType === sensor
                      ? 'bg-indigo-950/70 border-indigo-500 text-indigo-200 ring-1 ring-indigo-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{sensor}</span>
                    {sensorType === sensor && <CheckCircle2 size={14} className="text-indigo-400" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Guardrail */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                4. Safety Guardrail:
              </label>
              {[
                'Human-in-the-Loop Safety Gate',
                'Cryptographic Privacy Shield',
                'Adversarial Anomaly Filter',
              ].map(g => (
                <button
                  key={g}
                  onClick={() => setGuardrail(g)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    guardrail === g
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{g}</span>
                    {guardrail === g && <CheckCircle2 size={14} className="text-emerald-400" />}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Live Architecture Blueprint Preview & Certificate (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-pink-400 tracking-wider">
                  Live System Architecture Blueprint
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Target Domain: {topicTitle}
                </span>
              </div>

              {/* Blueprint Graphic */}
              <div className="bg-slate-950 p-6 rounded-2xl border-2 border-dashed border-pink-500/40 relative overflow-hidden space-y-5">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400">
                    CERTIFIED ARCHITECTURAL SPECIFICATION
                  </span>
                  <h3 className="text-2xl font-black text-white">{inventionName}</h3>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
                    <Eye size={20} className="text-indigo-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Input Sensor</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{sensorType}</span>
                  </div>

                  <div className="p-3 bg-pink-950/40 rounded-xl border border-pink-800/60">
                    <Cpu size={20} className="text-pink-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Core Model</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{modelCore}</span>
                  </div>

                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60">
                    <Shield size={20} className="text-emerald-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Guardrail</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{guardrail}</span>
                  </div>
                </div>

                {certificateIssued && (
                  <div className="p-4 bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl border border-amber-400/50 text-center space-y-1 animate-in zoom-in-95">
                    <Award size={32} className="text-amber-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-black text-amber-300">Official AI Architecture Badge Issued</h4>
                    <p className="text-xs text-slate-300">Verified by Junior AI Olympiad Accreditation Board</p>
                  </div>
                )}
              </div>
            </div>

            {/* Advance to Section 8 Boss Arena */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onJumpToSection(7)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
              >
                <span>Enter Section 8: Olympiad Boss Arena</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
