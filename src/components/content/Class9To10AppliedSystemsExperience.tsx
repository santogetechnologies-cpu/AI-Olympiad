import { useState } from 'react'
import {
  Activity, CheckCircle, ShieldCheck,
  Zap, ArrowRight, BarChart3
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

export interface Class9To10AppliedSystemsProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  onComplete?: () => void
}

export function Class9To10AppliedSystemsExperience({
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  hookQuestion,
  onComplete,
}: Class9To10AppliedSystemsProps) {
  // Trade-off weights sandbox
  const [speedWeight, setSpeedWeight] = useState(60)
  const [accuracyWeight, setAccuracyWeight] = useState(85)
  const [privacyWeight, setPrivacyWeight] = useState(70)
  const [selectedCase, setSelectedCase] = useState(0)
  const [caseSubmitted, setCaseSubmitted] = useState(false)

  // Real-world systems
  const industryCases = [
    {
      id: 0,
      title: '🚗 Autonomous Vehicle Highway Pilot',
      domain: 'Transportation & Edge Robotics',
      challenge: 'The self-driving compute unit must detect road obstacles at 120 km/h with <15ms latency while protecting GPS driver privacy.',
      idealWeights: { speed: 85, accuracy: 90, privacy: 60 },
      recommendation: 'Use Quantized TensorRT on edge GPU with on-device camera processing (zero cloud latency).'
    },
    {
      id: 1,
      title: '🏥 AI Clinical Diagnostic Assistant',
      domain: 'Healthcare & Medical Imaging',
      challenge: 'Detect early-stage pneumonia from chest X-rays with near-zero false negatives while strictly complying with HIPAA medical data privacy.',
      idealWeights: { speed: 40, accuracy: 95, privacy: 95 },
      recommendation: 'Deploy Federated Learning with Differential Privacy to train on multi-hospital datasets without transferring patient scans.'
    },
    {
      id: 2,
      title: '🛒 E-Commerce Real-Time Recommendation',
      domain: 'Consumer Tech & Search',
      challenge: 'Serve personalized search rankings to 50,000 queries per second with high relevance without storing raw credit card details.',
      idealWeights: { speed: 90, accuracy: 75, privacy: 80 },
      recommendation: 'Use Two-Tower Vector Embeddings with Approximate Nearest Neighbors (HNSW) cached in Redis clusters.'
    }
  ]

  const activeCase = industryCases[selectedCase]

  // Compute live system trade-off score
  const latencyEst = Math.max(5, Math.round((accuracyWeight * 1.5) - (speedWeight * 0.8) + 10))
  const privacyRiskScore = Math.max(0, 100 - privacyWeight)
  const accuracyScore = accuracyWeight

  const handleTestSystem = () => {
    setCaseSubmitted(true)
    gamification.addXP(20, undefined, `c910-system-${selectedCase}`)
    gamification.launchConfetti()
    toast.success('🎉 System Trade-off Configuration Evaluated! +20 XP')
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto touch-manipulation pb-6">
      
      {/* ── 1. HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-blue-400" /> Class 9–10 Applied AI & Real-World Systems
          </span>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            Engineering & Trade-off Studio
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {topicTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {hookQuestion || 'Analyze real-world industry deployments, configure system trade-offs, and balance accuracy against speed and constitutional privacy.'}
        </p>
      </div>

      {/* ── 2. CASE TABS ── */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
          Industry Case Studies:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {industryCases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(i)
                setCaseSubmitted(false)
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selectedCase === i
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
              }`}
            >
              <span className="text-xs font-black block leading-snug">{c.title}</span>
              <span className={`text-[10px] block mt-0.5 ${selectedCase === i ? 'text-blue-200' : 'text-slate-400'}`}>{c.domain}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. CASE INVESTIGATION ── */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
            Domain Challenge Specification:
          </span>
          <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200">
            {activeCase.challenge}
          </p>
        </div>

        {/* ── 4. TRADE-OFF CONFIGURATION SANDBOX ── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500" /> Configure System Priorities:
            </h4>
            <span className="text-[10px] text-slate-400">Interactive Sliders</span>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-700 font-bold">
                <span className="flex items-center gap-1"><Zap size={13} className="text-amber-500" /> Inference Speed Priority:</span>
                <span className="font-mono text-blue-600">{speedWeight}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={speedWeight}
                onChange={e => setSpeedWeight(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-700 font-bold">
                <span className="flex items-center gap-1"><BarChart3 size={13} className="text-emerald-600" /> Prediction Accuracy Priority:</span>
                <span className="font-mono text-emerald-600">{accuracyWeight}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={accuracyWeight}
                onChange={e => setAccuracyWeight(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-700 font-bold">
                <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-purple-600" /> Data Privacy &amp; Security:</span>
                <span className="font-mono text-purple-600">{privacyWeight}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={privacyWeight}
                onChange={e => setPrivacyWeight(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Computed System Dashboard */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Latency</span>
              <span className="text-sm sm:text-base font-black text-cyan-400 font-mono">{latencyEst} ms</span>
              <span className="text-[9px] text-slate-500 block">Response Time</span>
            </div>
            <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Accuracy</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">{accuracyScore}%</span>
              <span className="text-[9px] text-slate-500 block">F1 Confidence</span>
            </div>
            <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Privacy Risk</span>
              <span className={`text-sm sm:text-base font-black font-mono ${privacyRiskScore > 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {privacyRiskScore}%
              </span>
              <span className="text-[9px] text-slate-500 block">Data Exposure</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              onClick={handleTestSystem}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-2xl shadow-md cursor-pointer"
            >
              Evaluate Architecture Configuration →
            </Button>
          </div>

          {caseSubmitted && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-1 animate-in zoom-in-95">
              <div className="flex items-center gap-1.5 text-emerald-950 font-black text-xs">
                <CheckCircle size={16} className="text-emerald-600" />
                <span>Recommended Production Architecture:</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {activeCase.recommendation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {onComplete && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-2.5 rounded-2xl shadow-md cursor-pointer"
            icon={<ArrowRight size={14} />}
          >
            Advance to Next Section →
          </Button>
        </div>
      )}
    </div>
  )
}
