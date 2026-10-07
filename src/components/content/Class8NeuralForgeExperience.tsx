import { useState } from 'react'
import {
  Brain, Sliders, CheckCircle2,
  Target, Zap, Shield
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

interface Class8Props {
  chapterId?: string
  chapterNum?: string | number
  cNum?: string | number
  chapterTitle?: string
  lessonNumber: number
  topicTitle: string
  hookQuestion?: string
  onComplete?: () => void
}

export function Class8NeuralForgeExperience({
  cNum = '1',
  lessonNumber,
  topicTitle
}: Class8Props) {

  // -------------------------------------------------------------
  // LESSON 1 STATE: Synaptic Weight Tuning Laboratory
  // -------------------------------------------------------------
  const [w1, setW1] = useState<number>(0.8)
  const [w2, setW2] = useState<number>(0.5)
  const [bias, setBias] = useState<number>(-0.4)
  const x1 = 1.0 // Sensor 1 (e.g., sound detected)
  const x2 = 1.0 // Sensor 2 (e.g., motion detected)

  const weightedSum = Number((x1 * w1 + x2 * w2 + bias).toFixed(2))
  const isNeuronFired = weightedSum >= 0.5

  // -------------------------------------------------------------
  // LESSON 2 STATE: AI Prediction Confidence & Decision Boundary
  // -------------------------------------------------------------
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(65)
  const samplePredictions = [
    { id: 1, name: 'Email A: "Lunch tomorrow?"', score: 12, trueLabel: 'ham' },
    { id: 2, name: 'Email B: "Claim your $500 giftcard now!"', score: 92, trueLabel: 'spam' },
    { id: 3, name: 'Email C: "Meeting notes attached"', score: 28, trueLabel: 'ham' },
    { id: 4, name: 'Email D: "URGENT password reset required"', score: 81, trueLabel: 'spam' },
    { id: 5, name: 'Email E: "Special offer inside"', score: 62, trueLabel: 'spam' },
    { id: 6, name: 'Email F: "Family photos from summer"', score: 19, trueLabel: 'ham' },
  ]

  const flaggedSpamCount = samplePredictions.filter(p => p.score >= confidenceThreshold).length
  const falseAlarmCount = samplePredictions.filter(p => p.score >= confidenceThreshold && p.trueLabel === 'ham').length
  const missedSpamCount = samplePredictions.filter(p => p.score < confidenceThreshold && p.trueLabel === 'spam').length

  const handleNeuronTest = () => {
    gamification.addXP(30, undefined, `cls8-neuron-${cNum}-${lessonNumber}`)
    if (isNeuronFired) {
      toast.success('⚡ Synaptic threshold exceeded! Artificial neuron successfully fired! +30 XP', { icon: '🧠' })
    } else {
      toast('Neuron remained dormant. Increase weights or bias to reach threshold 0.50.', { icon: 'ℹ️' })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1 ARCHITECTURE: SYNAPTIC WEIGHT TUNING LAB                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Unique Lab Hero */}
          <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Brain size={14} className="text-amber-400" /> CLASS 8 • NEURAL FORGE LAB
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-black/50 px-3 py-1 rounded-xl border border-amber-500/30">
                Chapter {cNum} • Synaptic Weights
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-amber-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              Discover how AI models make decisions! An artificial neuron multiplies incoming signals by connection weights. Tune the sliders below to see when the neuron fires!
            </p>
          </div>

          {/* Interactive Single-Neuron Mathematical Canvas */}
          <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sliders size={20} className="text-amber-600" />
                  Synaptic Weight Tuning
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust weights <span className="font-mono text-amber-700 font-bold">w1, w2</span> and bias to reach firing threshold <span className="font-mono font-bold text-slate-800">0.50</span>.
                </p>
              </div>

              <button
                onClick={handleNeuronTest}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <Zap size={14} /> Test Neuron Signal
              </button>
            </div>

            {/* Neuron Diagram Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Sliders Column */}
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Input 1 Weight (w1)</span>
                    <span className="font-mono text-amber-600">{w1}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={w1}
                    onChange={(e) => setW1(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Input 2 Weight (w2)</span>
                    <span className="font-mono text-amber-600">{w2}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={w2}
                    onChange={(e) => setW2(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Neuron Bias (b)</span>
                    <span className="font-mono text-amber-600">{bias}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.0"
                    max="1.0"
                    step="0.1"
                    value={bias}
                    onChange={(e) => setBias(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Mathematical Equation & Calculation */}
              <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 text-center space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                  Calculated Net Activation
                </span>
                <div className="text-2xl font-black font-mono text-amber-950">
                  {weightedSum}
                </div>
                <p className="text-[11px] text-amber-800/80 font-mono">
                  (1.0 × {w1}) + (1.0 × {w2}) + ({bias})
                </p>
                <div className="text-xs font-medium text-slate-600 pt-2 border-t border-amber-200">
                  Threshold Required: <span className="font-bold text-slate-800">≥ 0.50</span>
                </div>
              </div>

              {/* Glowing Output Status */}
              <div
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  isNeuronFired
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 transition-all ${
                    isNeuronFired
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Zap size={28} />
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  {isNeuronFired ? '⚡ NEURON FIRED!' : '💤 DORMANT'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isNeuronFired
                    ? 'Activation threshold exceeded. Signal dispatched.'
                    : 'Weighted input is too weak to trigger axon.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2 ARCHITECTURE: AI PREDICTION CONFIDENCE & DECISION STUDIO   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Studio Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 border-2 border-rose-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Target size={14} className="text-rose-400" /> CLASS 8 • AI DECISION BOUNDARY STUDIO
              </span>
              <span className="text-xs font-mono font-bold text-rose-300 bg-black/50 px-3 py-1 rounded-xl border border-rose-500/30">
                Confidence Tuning
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-rose-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              AI models do not simply say "yes" or "no" — they assign a confidence score (0% to 100%). Drag the threshold slider below to balance filtering spam without blocking legitimate emails!
            </p>
          </div>

          {/* Decision Boundary Interactive Simulator */}
          <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Shield size={20} className="text-rose-600" />
                  Spam Filter Decision Boundary
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Threshold: If Confidence ≥ <span className="font-bold text-rose-600 font-mono">{confidenceThreshold}%</span>, flag email as SPAM.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Threshold:</span>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value, 10))}
                  className="w-36 sm:w-48 accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="font-mono font-black text-rose-600 text-sm w-12">
                  {confidenceThreshold}%
                </span>
              </div>
            </div>

            {/* Live Metrics Summary */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Flagged as Spam</p>
                <p className="text-xl font-black text-slate-900 font-mono mt-0.5">{flaggedSpamCount}</p>
              </div>
              <div className={`p-3.5 rounded-2xl border transition-all ${falseAlarmCount > 0 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase tracking-wider text-rose-600">False Alarms (Ham Blocked)</p>
                <p className="text-xl font-black text-rose-900 font-mono mt-0.5">{falseAlarmCount}</p>
              </div>
              <div className={`p-3.5 rounded-2xl border transition-all ${missedSpamCount > 0 ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">Missed Spam</p>
                <p className="text-xl font-black text-amber-900 font-mono mt-0.5">{missedSpamCount}</p>
              </div>
            </div>

            {/* Predictions List */}
            <div className="space-y-2.5">
              {samplePredictions.map(item => {
                const isFlagged = item.score >= confidenceThreshold
                const isCorrect = (isFlagged && item.trueLabel === 'spam') || (!isFlagged && item.trueLabel === 'ham')

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                      isFlagged
                        ? 'border-rose-300 bg-rose-50/50'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-slate-500">
                          AI Model Score: <strong className="text-slate-800">{item.score}%</strong>
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          Actual: {item.trueLabel.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {isCorrect ? '✓ Match' : '✗ Misclassified'}
                      </span>
                      <span
                        className={`text-xs font-black uppercase px-2.5 py-1 rounded-xl ${
                          isFlagged
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isFlagged ? 'SPAM' : 'INBOX'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {falseAlarmCount === 0 && missedSpamCount === 0 && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-black text-emerald-900 uppercase">
                      Perfect Decision Boundary Found!
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      Zero false alarms and zero missed spam emails at this threshold setting.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                  +35 XP Earned
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
