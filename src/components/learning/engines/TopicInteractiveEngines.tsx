// ─────────────────────────────────────────────────────────────────────────────
// TOPIC-BOUND INTERACTIVE GAME ENGINES
// Powered by the global Game Mechanic Registry & Visual Scene System.
// Guarantees:
// 1. Topic strictly controls the game mechanic.
// 2. Class-appropriate complexity with simple, clear English instructions.
// 3. Dynamic animated SVG environment visible at all times (NEVER blank!).
// 4. Zero emojis: strictly Lucide icons & vector graphics.
// 5. Zero internal viewport scrolling (stage-by-stage interactive progression).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles, Check, CheckCircle2, ArrowRight, RotateCcw,
  Zap, Eye, Shield, Cpu, Activity, Lightbulb, Play, AlertCircle,
  Compass, Radio, Camera, Mic, Volume2, Layers, Crosshair,
  Sliders, RefreshCw, Send, CheckSquare, Target
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import {
  RobotFriendLabScene,
  AutonomousRoadTrafficScene,
  SmartFarmDroneScene,
  NeuralSynapseDeepScene,
  TransformerAttentionScene,
  CyberSecurityShieldScene
} from '../../../services/visualRegistry'

// ─────────────────────────────────────────────────────────────────────────────
// 1. ROBOT SENSOR DISCOVERY SCANNER (Topic: Meet AI Friend / Robot Anatomy)
// ─────────────────────────────────────────────────────────────────────────────
export const RobotSensorDiscoveryGame: React.FC<{
  onComplete: () => void
  topicTitle?: string
}> = ({ onComplete, topicTitle = 'Meet My AI Friend' }) => {
  const [discoveredSensors, setDiscoveredSensors] = useState<string[]>([])
  const [activeSensor, setActiveSensor] = useState<string | null>(null)

  const sensors = [
    { id: 'camera', name: 'Camera Eyes', role: 'Sees shapes, colors, and human smiles', icon: Camera },
    { id: 'mic', name: 'Microphone Ears', role: 'Listens to human voice commands', icon: Mic },
    { id: 'processor', name: 'AI Brain Chip', role: 'Calculates answers and remembers lessons', icon: Cpu },
    { id: 'speaker', name: 'Speaker Mouth', role: 'Speaks helpful answers politely', icon: Volume2 },
  ]

  const handleTapSensor = (sId: string) => {
    gameAudio.playSuccess()
    setActiveSensor(sId)
    if (!discoveredSensors.includes(sId)) {
      const next = [...discoveredSensors, sId]
      setDiscoveredSensors(next)
      if (next.length === sensors.length) {
        setTimeout(() => {
          gameAudio.playVictory()
          onComplete()
        }, 1200)
      }
    }
  }

  const isAllDone = discoveredSensors.length === sensors.length

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden select-none">
      {/* Dynamic Animated Lab Scene at Top */}
      <div className="w-full shrink-0 mb-2 rounded-2xl overflow-hidden border border-indigo-100 shadow-2xs">
        <RobotFriendLabScene />
      </div>

      {/* Interactive Sensor Discovery Pad */}
      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-xl p-3 border border-slate-200">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              Tap each Robot Sensor to Discover its Power
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            {discoveredSensors.length}/{sensors.length} Scanned
          </span>
        </div>

        {/* 4 Interactive Sensor Buttons */}
        <div className="grid grid-cols-2 gap-2 my-2">
          {sensors.map((s) => {
            const isDone = discoveredSensors.includes(s.id)
            const Icon = s.icon
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleTapSensor(s.id)}
                className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isDone ? 'bg-emerald-600 text-white' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-900 truncate">{s.name}</h4>
                  <p className="text-[9px] text-slate-500 line-clamp-1">{s.role}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Live Feedback Banner */}
        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-indigo-900">
            {isAllDone
              ? 'Great work! All sensors scanned successfully!'
              : activeSensor
              ? sensors.find(s => s.id === activeSensor)?.role
              : 'Tap a sensor box above to begin robot diagnostic scan.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. AUTONOMOUS ROAD & TRAFFIC RADAR SIMULATION (Topic: AI on Road)
// ─────────────────────────────────────────────────────────────────────────────
export const AutonomousRoadTrafficGame: React.FC<{
  onComplete: () => void
  topicTitle?: string
}> = ({ onComplete, topicTitle = 'AI on Road' }) => {
  const [stage, setStage] = useState<number>(1)
  const [trafficSignal, setTrafficSignal] = useState<'red' | 'green'>('red')
  const [lidarActive, setLidarActive] = useState<boolean>(false)
  const [pedestrianCleared, setPedestrianCleared] = useState<boolean>(false)

  const handleToggleLidar = () => {
    gameAudio.playSuccess()
    setLidarActive(true)
    if (stage === 1) {
      setTimeout(() => setStage(2), 800)
    }
  }

  const handleClearPedestrian = () => {
    gameAudio.playSuccess()
    setPedestrianCleared(true)
    if (stage === 2) {
      setTimeout(() => setStage(3), 800)
    }
  }

  const handleSwitchGreen = () => {
    gameAudio.playVictory()
    setTrafficSignal('green')
    setTimeout(() => {
      onComplete()
    }, 1200)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden select-none">
      {/* Live Animated Road Scene */}
      <div className="w-full shrink-0 mb-2 rounded-2xl overflow-hidden border border-sky-100 shadow-2xs">
        <AutonomousRoadTrafficScene />
      </div>

      {/* Traffic Control & Lidar Simulation Panel */}
      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-xl p-3 border border-slate-200">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Target size={14} className="text-blue-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              AI Road Navigation Telemetry
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Mission Stage {stage} of 3
          </span>
        </div>

        {/* 3 Step Interactive Mission Cards */}
        <div className="space-y-2 my-2">
          {/* Step 1: Lidar Scanner */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
            lidarActive ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <h4 className="text-xs font-black text-slate-900">Step 1: Activate 360° LIDAR Radar</h4>
              <p className="text-[10px] text-slate-500">Detects vehicles and road obstacles in all directions.</p>
            </div>
            <button
              onClick={handleToggleLidar}
              disabled={lidarActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lidarActive ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {lidarActive ? 'Active' : 'Scan'}
            </button>
          </div>

          {/* Step 2: Pedestrian Crosswalk Check */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
            pedestrianCleared ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <h4 className="text-xs font-black text-slate-900">Step 2: Pedestrian Safety Radar</h4>
              <p className="text-[10px] text-slate-500">Wait for pedestrian crosswalk to clear completely.</p>
            </div>
            <button
              onClick={handleClearPedestrian}
              disabled={!lidarActive || pedestrianCleared}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pedestrianCleared ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40'
              }`}
            >
              {pedestrianCleared ? 'Clear' : 'Verify'}
            </button>
          </div>

          {/* Step 3: Green Light Proceed */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
            trafficSignal === 'green' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <h4 className="text-xs font-black text-slate-900">Step 3: Signal Green Wave Flow</h4>
              <p className="text-[10px] text-slate-500">Engage electric motor and proceed safely on road.</p>
            </div>
            <button
              onClick={handleSwitchGreen}
              disabled={!pedestrianCleared || trafficSignal === 'green'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                trafficSignal === 'green' ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40'
              }`}
            >
              {trafficSignal === 'green' ? 'Flowing' : 'Go Green'}
            </button>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-sky-900">
            {trafficSignal === 'green'
              ? 'Road mission complete! Autonomous vehicle navigating safely.'
              : 'Execute each safety step to guide the autonomous car.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SMART FARM & CROP DRONE SCANNER (Topic: AI on Farm)
// ─────────────────────────────────────────────────────────────────────────────
export const SmartFarmDroneGame: React.FC<{
  onComplete: () => void
  topicTitle?: string
}> = ({ onComplete, topicTitle = 'AI on Farm' }) => {
  const [wateredPlots, setWateredPlots] = useState<number[]>([])

  const plots = [
    { id: 0, crop: 'Corn Field', condition: 'Thirsty Soil', needsWater: true },
    { id: 1, crop: 'Wheat Field', condition: 'Healthy Soil', needsWater: false },
    { id: 2, crop: 'Tomato Vines', condition: 'Low Moisture', needsWater: true },
    { id: 3, crop: 'Rice Paddy', condition: 'Optimal Water', needsWater: false },
  ]

  const requiredPlots = [0, 2]

  const handleIrrigate = (pId: number) => {
    gameAudio.playSuccess()
    if (!wateredPlots.includes(pId)) {
      const next = [...wateredPlots, pId]
      setWateredPlots(next)
      const allDone = requiredPlots.every(r => next.includes(r))
      if (allDone) {
        setTimeout(() => {
          gameAudio.playVictory()
          onComplete()
        }, 1000)
      }
    }
  }

  const isComplete = requiredPlots.every(r => wateredPlots.includes(r))

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden select-none">
      {/* Live Farm Drone Scene */}
      <div className="w-full shrink-0 mb-2 rounded-2xl overflow-hidden border border-emerald-100 shadow-2xs">
        <SmartFarmDroneScene />
      </div>

      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-xl p-3 border border-slate-200">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Radio size={14} className="text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              AI Smart Irrigation Drone Dispatch
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {wateredPlots.length}/2 Fields Irrigated
          </span>
        </div>

        {/* 4 Crop Plot Cards */}
        <div className="grid grid-cols-2 gap-2 my-2">
          {plots.map((p) => {
            const isIrrigated = wateredPlots.includes(p.id)
            return (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1.5 ${
                  isIrrigated
                    ? 'bg-emerald-50 border-emerald-300'
                    : p.needsWater
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <h4 className="text-xs font-black text-slate-900">{p.crop}</h4>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    isIrrigated
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.needsWater
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isIrrigated ? 'Moisture Restored' : p.condition}
                  </span>
                </div>
                {p.needsWater && !isIrrigated ? (
                  <button
                    onClick={() => handleIrrigate(p.id)}
                    className="w-full py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer"
                  >
                    Deploy Water Drone
                  </button>
                ) : (
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <Check size={12} /> Optimal
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-emerald-900">
            {isComplete
              ? 'Farm mission successful! All crops receiving precision irrigation.'
              : 'Tap "Deploy Water Drone" on fields showing low moisture.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. NEURAL SYNAPSE WEIGHT TUNER (Topic: Neural Networks / Deep Learning)
// ─────────────────────────────────────────────────────────────────────────────
export const NeuralSynapseWeightGame: React.FC<{
  onComplete: () => void
  topicTitle?: string
}> = ({ onComplete, topicTitle = 'Neural Networks' }) => {
  const [weight, setWeight] = useState<number>(0.3)
  const [isTrained, setIsTrained] = useState<boolean>(false)

  const handleTune = (val: number) => {
    setWeight(val)
    if (val >= 0.8 && val <= 1.0) {
      gameAudio.playSuccess()
      setIsTrained(true)
      setTimeout(() => {
        gameAudio.playVictory()
        onComplete()
      }, 1000)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden select-none">
      <div className="w-full shrink-0 mb-2 rounded-2xl overflow-hidden border border-indigo-900 shadow-2xs">
        <NeuralSynapseDeepScene />
      </div>

      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-xl p-3 border border-slate-200">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-indigo-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              Synaptic Weight & Activation Calibration
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            Accuracy: {Math.round(weight * 100)}%
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 my-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Synapse Weight (w):</span>
            <span className="text-xs font-mono font-bold text-indigo-600">{weight.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={weight}
            onChange={(e) => handleTune(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[9px] font-bold text-slate-400">
            <span>Low Activation (0.1)</span>
            <span>Target Zone (0.8 - 1.0)</span>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-indigo-900">
            {isTrained
              ? 'Model converged! Synapses firing with 98% prediction confidence.'
              : 'Slide the weight towards the target zone to fire neuron activations.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. TRANSFORMER TOKEN ATTENTION CONNECTOR (Topic: Transformers / LLMs)
// ─────────────────────────────────────────────────────────────────────────────
export const TransformerAttentionGame: React.FC<{
  onComplete: () => void
  topicTitle?: string
}> = ({ onComplete, topicTitle = 'Transformers & Attention' }) => {
  const [connectedTokens, setConnectedTokens] = useState<string[]>([])

  const tokens = ['AI', 'Agent', 'Solves', 'Puzzles']

  const handleConnect = (tok: string) => {
    gameAudio.playSuccess()
    if (!connectedTokens.includes(tok)) {
      const next = [...connectedTokens, tok]
      setConnectedTokens(next)
      if (next.length === tokens.length) {
        setTimeout(() => {
          gameAudio.playVictory()
          onComplete()
        }, 1000)
      }
    }
  }

  const isDone = connectedTokens.length === tokens.length

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden select-none">
      <div className="w-full shrink-0 mb-2 rounded-2xl overflow-hidden border border-indigo-100 shadow-2xs">
        <TransformerAttentionScene />
      </div>

      <div className="flex-1 flex flex-col justify-between min-h-0 bg-white rounded-xl p-3 border border-slate-200">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Layers size={14} className="text-indigo-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              Multi-Head Self-Attention Query-Key Router
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            {connectedTokens.length}/{tokens.length} Tokens Linked
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 my-2">
          {tokens.map((tok) => {
            const isLinked = connectedTokens.includes(tok)
            return (
              <button
                key={tok}
                onClick={() => handleConnect(tok)}
                className={`p-3 rounded-xl border-2 font-mono font-black text-xs text-center transition-all cursor-pointer ${
                  isLinked
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-400'
                }`}
              >
                {tok}
              </button>
            )
          })}
        </div>

        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-indigo-900">
            {isDone
              ? 'Attention matrix computed! Query-Key dot products fully aligned.'
              : 'Tap each token block to establish self-attention vector connections.'}
          </p>
        </div>
      </div>
    </div>
  )
}
