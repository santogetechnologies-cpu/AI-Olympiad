import { useState } from 'react'
import {
  Activity, Layers, TrendingDown,
  ArrowRight
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

export interface Class11To12AdvancedMLProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  onComplete?: () => void
}

function NeuralNetSvg({ className = "w-full h-40 text-purple-500" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="c11NetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Layer connections */}
      {[30, 75, 120].map((y1, i) =>
        [20, 55, 90, 125].map((y2, j) => (
          <line
            key={`l1-${i}-${j}`}
            x1="60"
            y1={y1}
            x2="180"
            y2={y2}
            stroke="url(#c11NetGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
        ))
      )}

      {[20, 55, 90, 125].map((y2, j) =>
        [45, 105].map((y3, k) => (
          <line
            key={`l2-${j}-${k}`}
            x1="180"
            y1={y2}
            x2="320"
            y2={y3}
            stroke="url(#c11NetGrad)"
            strokeWidth="1.6"
          />
        ))
      )}

      {/* Input Layer */}
      {[30, 75, 120].map((y, idx) => (
        <g key={`in-${idx}`}>
          <circle cx="60" cy={y} r="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
          <text x="52" y={y + 4} fill="#e0e7ff" fontSize="9" fontWeight="bold">X{idx + 1}</text>
        </g>
      ))}

      {/* Hidden Layer (ReLU / GELU) */}
      {[20, 55, 90, 125].map((y, idx) => (
        <g key={`h-${idx}`}>
          <circle cx="180" cy={y} r="10" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
          <circle cx="180" cy={y} r="3" fill="#e879f9" />
        </g>
      ))}

      {/* Output Layer */}
      {[45, 105].map((y, idx) => (
        <g key={`out-${idx}`}>
          <circle cx="320" cy={y} r="14" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
          <text x="313" y={y + 4} fill="#ecfdf5" fontSize="10" fontWeight="bold">Y{idx + 1}</text>
        </g>
      ))}

      {/* Layer Labels */}
      <text x="35" y="145" fill="#94a3b8" fontSize="8" fontWeight="bold">INPUT (X)</text>
      <text x="155" y="145" fill="#c084fc" fontSize="8" fontWeight="bold">HIDDEN (ReLU)</text>
      <text x="295" y="145" fill="#34d399" fontSize="8" fontWeight="bold">LOGITS (Softmax)</text>
    </svg>
  )
}

export function Class11To12AdvancedMLExperience({
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  hookQuestion,
  onComplete,
}: Class11To12AdvancedMLProps) {
  // 1. Gradient descent simulator state
  const [learningRate, setLearningRate] = useState(0.05)
  const [epochs, setEpochs] = useState(100)

  // 2. Decision threshold calibrator state
  const [decisionThreshold, setDecisionThreshold] = useState(0.5)

  // Computed loss based on learning rate
  const computedLoss = Math.max(0.04, ((1 / (1 + epochs * learningRate * 2)) + (learningRate > 0.15 ? 0.35 : 0))).toFixed(3)
  const isOverfitting = learningRate > 0.18

  // Computed confusion matrix
  const tp = Math.round(60 * (1 - decisionThreshold * 0.45))
  const fp = Math.round(40 * (1 - decisionThreshold))
  const fn = Math.round(60 * (decisionThreshold * 0.55))
  const tn = Math.round(40 * decisionThreshold)
  const precision = tp / (tp + fp) || 0
  const recall = tp / (tp + fn) || 0
  const f1 = (2 * precision * recall) / (precision + recall) || 0

  const handleCalibrate = () => {
    gamification.addXP(25, undefined, `c1112-calibrated-${_chapterNum}`)
    gamification.launchConfetti()
    toast.success('🎉 Hyperparameter & Threshold Calibrator Evaluated! +25 XP')
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto touch-manipulation pb-6">
      
      {/* ── 1. HEADER ── */}
      <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-purple-400" /> Class 11–12 Advanced Machine Learning &amp; Mathematics
          </span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            Mathematical &amp; Applied Deep Learning
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {topicTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {hookQuestion || 'Investigate empirical loss landscapes, gradient descent step dynamics, and statistical classification boundaries.'}
        </p>
      </div>

      {/* ── 2. NEURAL NETWORK ARCHITECTURE SVG ── */}
      <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
            <Layers size={14} /> Multi-Layer Feedforward &amp; Backpropagation Graph
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Differentiable Graph</span>
        </div>
        <NeuralNetSvg />
      </div>

      {/* ── 3. GRADIENT DESCENT & LOSS LANDSCAPE CONVERGENCE ── */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm flex items-center gap-2">
            <TrendingDown size={16} className="text-amber-400" />
            <span>Gradient Descent &amp; Loss Convergence Simulator</span>
          </h3>
          <span className="text-[10px] text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800 font-bold">
            Optimizer Step: SGD / Adam
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-300 font-bold">
              <span>Learning Rate (α):</span>
              <span className="font-mono text-amber-400">{learningRate.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.25"
              step="0.005"
              value={learningRate}
              onChange={e => setLearningRate(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-300 font-bold">
              <span>Training Epochs (E):</span>
              <span className="font-mono text-cyan-400">{epochs}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={epochs}
              onChange={e => setEpochs(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Diagnostics */}
        <div className="bg-black p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-1.5">
          <p className="text-slate-500">// Optimization State:</p>
          <p className="text-cyan-300">&gt; Final Empirical Cross-Entropy Loss: {computedLoss}</p>
          <p className={isOverfitting ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
            &gt; Gradient Stability: {isOverfitting ? '⚠️ DIVERGENCE: Learning rate too large! Oscillating around local minima.' : '✓ STABLE: Smooth asymptotic convergence.'}
          </p>
        </div>
      </div>

      {/* ── 4. STATISTICAL DECISION BOUNDARY & CONFUSION MATRIX ── */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm flex items-center gap-2">
            <Activity size={16} className="text-purple-400" />
            <span>Statistical Decision Boundary &amp; ROC Metric Calibrator</span>
          </h3>
          <span className="text-[10px] text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
            Metric Suite
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-bold">
            <span>Classification Decision Threshold (τ):</span>
            <span className="text-purple-400 font-mono">{decisionThreshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={decisionThreshold}
            onChange={e => setDecisionThreshold(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Precision</span>
            <span className="text-base font-black text-cyan-400 font-mono">{(precision * 100).toFixed(1)}%</span>
            <span className="text-[9px] text-slate-500 block">TP / (TP + FP)</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Recall</span>
            <span className="text-base font-black text-emerald-400 font-mono">{(recall * 100).toFixed(1)}%</span>
            <span className="text-[9px] text-slate-500 block">TP / (TP + FN)</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">F1-Score</span>
            <span className="text-base font-black text-purple-400 font-mono">{(f1 * 100).toFixed(1)}%</span>
            <span className="text-[9px] text-slate-500 block">Harmonic Mean</span>
          </div>
        </div>

        {/* 2x2 Confusion Matrix Visual */}
        <div className="bg-black p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Confusion Matrix (N = 100 Samples):
          </span>
          <div className="grid grid-cols-2 gap-2 text-center font-mono">
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-xl">
              <span className="text-[10px] text-emerald-400 block font-sans">True Positives (TP)</span>
              <span className="text-lg font-black text-emerald-200">{tp}</span>
            </div>
            <div className="bg-rose-950/60 border border-rose-500/40 p-2.5 rounded-xl">
              <span className="text-[10px] text-rose-400 block font-sans">False Positives (FP)</span>
              <span className="text-lg font-black text-rose-200">{fp}</span>
            </div>
            <div className="bg-amber-950/60 border border-amber-500/40 p-2.5 rounded-xl">
              <span className="text-[10px] text-amber-400 block font-sans">False Negatives (FN)</span>
              <span className="text-lg font-black text-amber-200">{fn}</span>
            </div>
            <div className="bg-blue-950/60 border border-blue-500/40 p-2.5 rounded-xl">
              <span className="text-[10px] text-blue-400 block font-sans">True Negatives (TN)</span>
              <span className="text-lg font-black text-blue-200">{tn}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            onClick={handleCalibrate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-5 py-2.5 rounded-2xl shadow-md cursor-pointer"
          >
            Log Model Calibration Metrics (+25 XP)
          </Button>
        </div>
      </div>

      {/* Footer */}
      {onComplete && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onComplete}
            className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-6 py-2.5 rounded-2xl shadow-md cursor-pointer"
            icon={<ArrowRight size={14} />}
          >
            Advance to Next Section →
          </Button>
        </div>
      )}
    </div>
  )
}
