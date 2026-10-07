import React, { useState } from 'react'
import { Sliders, Activity, Play, Zap } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { AnimatedNeuralNetworkSVG } from '../svg/AnimatedSVGs'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 4. SIMULATION EXPERIENCE ────────────────────────────────────────────────
// Structure: Scientific laboratory sandbox with parameter sliders, live waveform, stimulus triggers, and telemetry
export const SimulationExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config: _config,
  isCompleted,
  onComplete,
}) => {
  const [learningRate, setLearningRate] = useState<number>(50)
  const [trainingEpochs, setTrainingEpochs] = useState<number>(30)
  const [isRunning, setIsRunning] = useState(false)
  const [simulatedLoss, setSimulatedLoss] = useState<number>(0.84)
  const [accuracy, setAccuracy] = useState<number>(64)
  const [tested, setTested] = useState(false)

  const handleRunSimulation = () => {
    gameAudio.playTap()
    setIsRunning(true)

    // Compute realistic simulation curve based on parameters
    setTimeout(() => {
      let calcAcc = 85
      let calcLoss = 0.15

      if (learningRate > 80) {
        // Divergence due to high learning rate
        calcAcc = 52
        calcLoss = 1.42
      } else if (learningRate < 25) {
        // Slow convergence
        calcAcc = 71
        calcLoss = 0.45
      } else {
        // Optimal range
        calcAcc = Math.min(98.4, 88 + (trainingEpochs / 100) * 10)
        calcLoss = Math.max(0.04, 0.25 - (trainingEpochs / 100) * 0.2)
      }

      setAccuracy(Math.round(calcAcc * 10) / 10)
      setSimulatedLoss(Math.round(calcLoss * 100) / 100)
      setIsRunning(false)
      setTested(true)

      if (calcAcc >= 85) {
        gameAudio.playSuccess()
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      } else {
        gameAudio.playTap()
      }
    }, 1200)
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Simulation Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center justify-center">
            <Sliders size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Interactive Laboratory Sandbox</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-slate-300">Telemetry Live</span>
        </div>
      </div>

      {/* Main Simulation Dual Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Parameter Tuners */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/80 border-2 border-purple-500/30 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-purple-400" /> Hyperparameter Controls
          </h3>

          {/* Slider 1: Learning Rate */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Learning Rate Step (α)</span>
              <span className="text-purple-300">{learningRate / 100}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={learningRate}
              disabled={isRunning}
              onChange={e => setLearningRate(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.05 (Cautious)</span>
              <span>0.50 (Balanced)</span>
              <span>1.00 (Aggressive)</span>
            </div>
          </div>

          {/* Slider 2: Epoch Iterations */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Training Epoch Cycles</span>
              <span className="text-purple-300">{trainingEpochs} Epochs</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={trainingEpochs}
              disabled={isRunning}
              onChange={e => setTrainingEpochs(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10 (Brief)</span>
              <span>50 (Moderate)</span>
              <span>100 (Deep)</span>
            </div>
          </div>

          <button
            disabled={isRunning}
            onClick={handleRunSimulation}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
          >
            {isRunning ? (
              <Activity className="animate-spin" size={18} />
            ) : (
              <Play size={18} />
            )}
            {isRunning ? 'Calculating Gradient Descent...' : 'Execute Neural Training Run'}
          </button>
        </div>

        {/* Right Column: Live Telemetry Output */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950/80 border-2 border-purple-500/30 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" /> Real-Time Telemetry Monitor
            </h3>

            {/* Neural Network SVG Illustration */}
            <div className="flex justify-center py-2">
              <AnimatedNeuralNetworkSVG size={140} />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Validation Accuracy</span>
                <span className={`text-2xl font-black ${accuracy >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {accuracy}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Loss Function Cost</span>
                <span className="text-2xl font-black text-purple-400">{simulatedLoss}</span>
              </div>
            </div>

            {tested && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  accuracy >= 85
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                }`}
              >
                {accuracy >= 85
                  ? '🎯 Optimal hyperparameter convergence achieved! Model generalizes accurately.'
                  : '⚠️ Model converged with sub-optimal accuracy. Try tuning the learning rate closer to 0.40 - 0.60!'}
              </div>
            )}
          </div>
        </div>
      </div>

      {accuracy >= 85 && (
        <SuccessCelebration
          title="🎉 Simulation Benchmark Passed!"
          subtitle={`You achieved ${accuracy}% accuracy by dialing in optimal AI parameters for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
