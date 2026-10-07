import { useState } from 'react'
import {
  Play, RotateCcw, Check, Sparkles, AlertTriangle, ShieldCheck,
  Search, CheckCircle2, XCircle
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

// ─────────────────────────────────────────────────────────────────────────────
// 1. ROBOT COMMAND INSTRUCTION GAME ("Give Me a Command!")
// ─────────────────────────────────────────────────────────────────────────────
export function RobotCommandInstructionGame({
  topicTitle: _topicTitle,
  onComplete,
}: {
  topicTitle: string
  onComplete?: () => void
}) {
  const [commands, setCommands] = useState<string[]>([])
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [robotDir, setRobotDir] = useState<'right' | 'down' | 'left' | 'up'>('right')
  const [isRunning, setIsRunning] = useState(false)
  const [isWon, setIsWon] = useState(false)

  const targetPos = { x: 3, y: 2 }
  const obstaclePos = { x: 1, y: 1 }

  const addCommand = (cmd: string) => {
    if (isRunning || isWon) return
    if (commands.length >= 8) {
      toast.error('Command queue full! Try running your sequence.')
      return
    }
    setCommands(prev => [...prev, cmd])
  }

  const removeLast = () => {
    if (isRunning || isWon) return
    setCommands(prev => prev.slice(0, -1))
  }

  const resetGrid = () => {
    setRobotPos({ x: 0, y: 0 })
    setRobotDir('right')
    setCommands([])
    setIsRunning(false)
    setIsWon(false)
  }

  const runProgram = async () => {
    if (commands.length === 0 || isRunning) return
    setIsRunning(true)
    let currentX = 0
    let currentY = 0
    let dir = 'right'

    for (const cmd of commands) {
      await new Promise(r => setTimeout(r, 600))
      if (cmd === 'FORWARD') {
        if (dir === 'right' && currentX < 3) currentX++
        else if (dir === 'left' && currentX > 0) currentX--
        else if (dir === 'down' && currentY < 3) currentY++
        else if (dir === 'up' && currentY > 0) currentY--
      } else if (cmd === 'TURN_RIGHT') {
        const order: ('right' | 'down' | 'left' | 'up')[] = ['right', 'down', 'left', 'up']
        const idx = order.indexOf(dir as any)
        dir = order[(idx + 1) % 4]
      } else if (cmd === 'TURN_LEFT') {
        const order: ('right' | 'down' | 'left' | 'up')[] = ['right', 'down', 'left', 'up']
        const idx = order.indexOf(dir as any)
        dir = order[(idx + 3) % 4]
      }
      setRobotPos({ x: currentX, y: currentY })
      setRobotDir(dir as any)

      if (currentX === obstaclePos.x && currentY === obstaclePos.y) {
        toast.error('💥 Beep-boop! The robot hit an obstacle! Resetting.', { icon: '🤖' })
        setIsRunning(false)
        setRobotPos({ x: 0, y: 0 })
        return
      }
    }

    if (currentX === targetPos.x && currentY === targetPos.y) {
      setIsWon(true)
      gamification.addXP(30, undefined, 'robot-cmd-won')
      gamification.launchConfetti()
      toast.success('🌟 Mission Accomplished! The robot followed your exact commands!')
      if (onComplete) onComplete()
    } else {
      toast('🤖 Almost! The robot stopped before the star. Add more steps!', { icon: '💡' })
    }
    setIsRunning(false)
  }

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 text-white max-w-xl mx-auto shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
            Interactive Instruction Game
          </span>
          <h3 className="text-lg font-black text-white mt-1">🤖 Give Me a Command!</h3>
        </div>
        <button
          onClick={resetGrid}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl cursor-pointer"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <p className="text-xs text-slate-300">
        A robot only does <strong className="text-emerald-400">exact instructions</strong> in sequence. Program the robot to reach the Energy Star without hitting the red rock!
      </p>

      {/* Grid Canvas */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-center">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => {
            const x = i % 4
            const y = Math.floor(i / 4)
            const isRobot = robotPos.x === x && robotPos.y === y
            const isTarget = targetPos.x === x && targetPos.y === y
            const isObstacle = obstaclePos.x === x && obstaclePos.y === y

            return (
              <div
                key={i}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300 relative ${
                  isRobot
                    ? 'bg-blue-600 text-white ring-4 ring-blue-400 shadow-lg scale-105'
                    : isTarget
                    ? 'bg-amber-500/20 border-2 border-dashed border-amber-400 text-amber-300 animate-pulse'
                    : isObstacle
                    ? 'bg-rose-950/60 border border-rose-800 text-rose-400'
                    : 'bg-slate-900/80 border border-slate-800/80'
                }`}
              >
                {isRobot && (
                  <span
                    className="text-2xl transition-transform duration-200 inline-block"
                    style={{
                      transform:
                        robotDir === 'right'
                          ? 'rotate(0deg)'
                          : robotDir === 'down'
                          ? 'rotate(90deg)'
                          : robotDir === 'left'
                          ? 'scaleX(-1)'
                          : 'rotate(-90deg)',
                    }}
                    title={`Facing ${robotDir}`}
                  >
                    🤖
                  </span>
                )}
                {!isRobot && isTarget && <span>⭐</span>}
                {!isRobot && isObstacle && <span>🪨</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Command Queue Display */}
      <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Instruction Queue ({commands.length}/8):</span>
          {commands.length > 0 && (
            <button onClick={removeLast} className="text-rose-400 hover:text-rose-300 text-[10px] cursor-pointer">
              Undo Last
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
          {commands.length === 0 ? (
            <span className="text-xs text-slate-500 italic">Tap buttons below to add step-by-step commands...</span>
          ) : (
            commands.map((cmd, idx) => (
              <span
                key={idx}
                className="bg-blue-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm"
              >
                <span className="text-[9px] opacity-75">{idx + 1}.</span>
                {cmd === 'FORWARD' ? 'Forward ⬆️' : cmd === 'TURN_RIGHT' ? 'Turn Right ↪️' : 'Turn Left ↩️'}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => addCommand('TURN_LEFT')}
          disabled={isRunning || isWon}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-3 rounded-xl cursor-pointer active:scale-95 transition"
        >
          ↩️ Turn Left
        </button>
        <button
          onClick={() => addCommand('FORWARD')}
          disabled={isRunning || isWon}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3 rounded-xl cursor-pointer active:scale-95 transition shadow-md"
        >
          ⬆️ Step Forward
        </button>
        <button
          onClick={() => addCommand('TURN_RIGHT')}
          disabled={isRunning || isWon}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-3 rounded-xl cursor-pointer active:scale-95 transition"
        >
          ↪️ Turn Right
        </button>
      </div>

      <button
        onClick={runProgram}
        disabled={commands.length === 0 || isRunning || isWon}
        className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition ${
          isWon
            ? 'bg-emerald-600 text-white'
            : isRunning
            ? 'bg-slate-700 text-slate-400'
            : commands.length === 0
            ? 'bg-slate-800 text-slate-500'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 active:scale-98'
        }`}
      >
        {isWon ? (
          <>
            <CheckCircle2 size={18} /> Lesson Cleared! (+30 XP)
          </>
        ) : isRunning ? (
          <>
            <RotateCcw className="animate-spin" size={16} /> Executing Robot Commands...
          </>
        ) : (
          <>
            <Play size={16} fill="currentColor" /> Run Program ▶️
          </>
        )}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PATTERN DISCOVERY GAME ("Learning from Examples")
// ─────────────────────────────────────────────────────────────────────────────
export function PatternRecognitionDiscoveryGame({
  topicTitle: _topicTitle,
  onComplete,
}: {
  topicTitle: string
  onComplete?: () => void
}) {
  const trainingExamples = [
    { id: 1, name: 'Siamese Cat', traits: 'Pointy Ears + Whiskers', category: 'Cat', emoji: '🐱' },
    { id: 2, name: 'Golden Retriever', traits: 'Floppy Ears + Bark', category: 'Dog', emoji: '🐶' },
    { id: 3, name: 'Persian Cat', traits: 'Pointy Ears + Whiskers', category: 'Cat', emoji: '😸' },
    { id: 4, name: 'Beagle Dog', traits: 'Floppy Ears + Bark', category: 'Dog', emoji: '🐕' },
  ]

  const [trainedIds, setTrainedIds] = useState<number[]>([])
  const [modelTrained, setModelTrained] = useState(false)
  const [testResult, setTestResult] = useState<'correct' | 'wrong' | null>(null)

  const handleTrain = (id: number) => {
    if (trainedIds.includes(id)) return
    const next = [...trainedIds, id]
    setTrainedIds(next)
    if (next.length === trainingExamples.length) {
      setModelTrained(true)
      toast.success('🧠 Model Trained! Pattern rule learned: Whiskers = Cat, Floppy Ears = Dog!')
    }
  }

  const handlePredict = (choice: 'Cat' | 'Dog') => {
    if (choice === 'Cat') {
      setTestResult('correct')
      gamification.addXP(30, undefined, 'pattern-discovery-won')
      gamification.launchConfetti()
      toast.success('🌟 Brilliant! The AI successfully recognized the cat pattern!')
      if (onComplete) onComplete()
    } else {
      setTestResult('wrong')
      toast.error('Look closely at the pointy ears and whiskers!')
    }
  }

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 text-white max-w-xl mx-auto shadow-2xl space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
          Pattern Recognition Game
        </span>
        <h3 className="text-lg font-black text-white mt-1">🧠 Learning from Examples</h3>
      </div>

      <p className="text-xs text-slate-300">
        Computers do not know what a cat or dog is until we feed them <strong className="text-indigo-400">training examples</strong>. Tap each example below to train the AI brain!
      </p>

      {/* Step 1: Training Examples */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
          <span>Step 1: Feed Training Examples ({trainedIds.length}/4)</span>
          <span className="text-indigo-400 font-black">{Math.round((trainedIds.length / 4) * 100)}% Trained</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {trainingExamples.map(item => {
            const isTrained = trainedIds.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => handleTrain(item.id)}
                disabled={isTrained}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                  isTrained
                    ? 'bg-emerald-950/50 border-emerald-700/60 text-emerald-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-400'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{item.name}</div>
                  <div className="text-[10px] opacity-75">{item.traits}</div>
                </div>
                {isTrained && <CheckCircle2 size={16} className="text-emerald-400 ml-auto flex-shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: The Mystery Test */}
      {modelTrained && (
        <div className="bg-indigo-950/50 border-2 border-indigo-500/60 p-4 rounded-2xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
            <Sparkles size={14} /> Step 2: Test the Trained AI on an Unseen Mystery Animal!
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-indigo-800/60 flex items-center gap-4">
            <span className="text-4xl animate-pulse">🐱‍👤</span>
            <div>
              <div className="text-xs font-bold text-white">Mystery Subject #99</div>
              <div className="text-[11px] text-slate-300">
                Visual Sensors Report: <strong className="text-amber-300">Pointy Ears + Whiskers + Purring</strong>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium">Based on learned patterns, what should the AI predict?</p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handlePredict('Cat')}
              className="py-3 px-4 rounded-xl font-black text-xs bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer active:scale-95 transition flex items-center justify-center gap-2"
            >
              🐱 Predict: Cat
            </button>
            <button
              onClick={() => handlePredict('Dog')}
              className="py-3 px-4 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer active:scale-95 transition flex items-center justify-center gap-2"
            >
              🐶 Predict: Dog
            </button>
          </div>

          {testResult === 'correct' && (
            <div className="bg-emerald-950/80 border border-emerald-500 p-3 rounded-xl text-xs text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              100% Match! Machine Learning extracted the rule from examples without hardcoded rules.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DEEPFAKE INVESTIGATION GAME ("Deepfake Alert!")
// ─────────────────────────────────────────────────────────────────────────────
export function DeepfakeInvestigationGame({
  topicTitle: _topicTitle,
  onComplete,
}: {
  topicTitle: string
  onComplete?: () => void
}) {
  const [cluesFound, setCluesFound] = useState<Record<string, boolean>>({})
  const [verdictMade, setVerdictMade] = useState(false)

  const clues = [
    { id: 'hands', title: 'Check Hands & Fingers', desc: 'Inspect the left hand: 6 deformed fingers detected!', isAnomaly: true },
    { id: 'shadows', title: 'Check Lighting & Shadows', desc: 'Sun is on the right, but shadows fall to the right! Physics error.', isAnomaly: true },
    { id: 'background', title: 'Check Background Lines', desc: 'The window frame is curved and melting strangely.', isAnomaly: true },
  ]

  const handleInspect = (id: string) => {
    setCluesFound(prev => ({ ...prev, [id]: true }))
  }

  const allInspected = Object.keys(cluesFound).length === clues.length

  const handleVerdict = (isFake: boolean) => {
    if (isFake) {
      setVerdictMade(true)
      gamification.addXP(30, undefined, 'deepfake-alert-won')
      gamification.launchConfetti()
      toast.success('🕵️ Case Closed! You successfully exposed the deepfake artifact!')
      if (onComplete) onComplete()
    } else {
      toast.error('Look closely at the anomalies discovered by your investigation!')
    }
  }

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 text-white max-w-xl mx-auto shadow-2xl space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800">
          Media Forensics Game
        </span>
        <h3 className="text-lg font-black text-white mt-1">🔍 Deepfake Alert: Real or AI Generated?</h3>
      </div>

      <p className="text-xs text-slate-300">
        AI image generators often struggle with <strong className="text-rose-400">anatomy, lighting consistency, and fine straight lines</strong>. Inspect each forensic zone to uncover the truth!
      </p>

      {/* Forensic Inspection Zones */}
      <div className="space-y-2">
        {clues.map(c => {
          const inspected = cluesFound[c.id]
          return (
            <div
              key={c.id}
              onClick={() => handleInspect(c.id)}
              className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                inspected
                  ? 'bg-rose-950/40 border-rose-600/70 text-rose-200'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Search size={18} className={inspected ? 'text-rose-400' : 'text-slate-400'} />
                <div>
                  <div className="text-xs font-bold">{c.title}</div>
                  {inspected && <div className="text-[11px] text-rose-300 font-medium mt-0.5">{c.desc}</div>}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {inspected ? '⚠️ Anomaly' : 'Tap to Inspect'}
              </span>
            </div>
          )
        })}
      </div>

      {allInspected && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-rose-800 space-y-3">
          <div className="text-xs font-bold text-white">Forensic Evidence Gathered: 3 Critical Anomalies Found.</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleVerdict(true)}
              className="py-3 px-4 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              🚨 Verdict: AI DEEPFAKE
            </button>
            <button
              onClick={() => handleVerdict(false)}
              className="py-3 px-4 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 cursor-pointer active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              📷 Verdict: Authentic Photo
            </button>
          </div>
          {verdictMade && (
            <div className="bg-emerald-950/80 border border-emerald-500 p-2.5 rounded-xl text-xs text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Correct! You identified physical and biological impossibilities that AI generated.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. SMART CAR ROAD MISSION GAME ("Help the Smart Car")
// ─────────────────────────────────────────────────────────────────────────────
export function SmartCarRouteMissionGame({
  topicTitle: _topicTitle,
  onComplete,
}: {
  topicTitle: string
  onComplete?: () => void
}) {
  const [step, setStep] = useState<number>(1)
  const [sensedItems, setSensedItems] = useState<string[]>([])
  const [selectedRoute, setSelectedRoute] = useState<'safe' | 'hazard' | null>(null)

  const sensors = [
    { id: 'camera', label: 'Front Camera', desc: 'Detects lane markings & red traffic lights', icon: '📷' },
    { id: 'lidar', label: 'Roof LiDAR', desc: '3D Laser pulse measures exact distance to objects', icon: '📡' },
    { id: 'radar', label: 'Bumper Radar', desc: 'Punches through heavy rain and fog to see ahead', icon: '📻' },
  ]

  const handleSense = (id: string) => {
    if (!sensedItems.includes(id)) {
      const next = [...sensedItems, id]
      setSensedItems(next)
      if (next.length === sensors.length) {
        setStep(2)
        toast.success('🚗 Sensors Activated! All road obstacles mapped in 3D.')
      }
    }
  }

  const handleRouteChoice = (choice: 'safe' | 'hazard') => {
    setSelectedRoute(choice)
    if (choice === 'safe') {
      setStep(3)
      gamification.addXP(30, undefined, 'smart-car-won')
      gamification.launchConfetti()
      toast.success('🌟 Mission Complete! The autonomous car navigated safely home!')
      if (onComplete) onComplete()
    } else {
      toast.error('Hazard ahead! The obstacle sensor alerted a roadblock. Pick the detour route!')
    }
  }

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 text-white max-w-xl mx-auto shadow-2xl space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
          Autonomous Vehicle Mission
        </span>
        <h3 className="text-lg font-black text-white mt-1">🚗 Mission: Help the Smart Car</h3>
      </div>

      <p className="text-xs text-slate-300">
        A self-driving car does not have human eyes. It combines multiple sensors to perceive the world and decide safe routes in milliseconds.
      </p>

      {/* Step 1: Activate Sensors */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
          <span>Step 1: Activate Vehicle Sensors ({sensedItems.length}/3)</span>
          <span className="text-cyan-400 font-bold">{sensedItems.length === 3 ? 'Sensors Active' : 'Scanning...'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sensors.map(s => {
            const active = sensedItems.includes(s.id)
            return (
              <button
                key={s.id}
                onClick={() => handleSense(s.id)}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition ${
                  active
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                    : 'bg-slate-800 border-slate-700 hover:border-cyan-400 text-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold">{s.label}</div>
                <div className="text-[10px] opacity-75 mt-0.5">{s.desc}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Choose Safe Route */}
      {step >= 2 && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-800/80 space-y-3 animate-in fade-in duration-300">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <AlertTriangle size={15} className="text-amber-400" />
            Sensor Telemetry Alert: Highway Construction 100m Ahead!
          </div>

          <p className="text-xs text-slate-300 font-medium">Which route should the vehicle controller dispatch?</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleRouteChoice('safe')}
              className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                selectedRoute === 'safe'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                  : 'bg-slate-800 border-slate-700 hover:border-emerald-400 text-slate-200'
              }`}
            >
              <div className="font-bold text-xs text-emerald-400 flex items-center gap-1">
                <Check size={14} /> Safe Detour via Bridge
              </div>
              <div className="text-[11px] opacity-80 mt-1">Clear road, gentle curve, +2 mins travel time.</div>
            </button>

            <button
              onClick={() => handleRouteChoice('hazard')}
              className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                selectedRoute === 'hazard'
                  ? 'bg-rose-950 border-rose-500 text-rose-200'
                  : 'bg-slate-800 border-slate-700 hover:border-rose-400 text-slate-200'
              }`}
            >
              <div className="font-bold text-xs text-rose-400 flex items-center gap-1">
                <XCircle size={14} /> Drive Through Highway Cones
              </div>
              <div className="text-[11px] opacity-80 mt-1">Narrow path with active workers and deep potholes.</div>
            </button>
          </div>

          {step === 3 && (
            <div className="bg-emerald-950/80 border border-emerald-500 p-2.5 rounded-xl text-xs text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Route Executed: Sense → Plan → Act cycle kept all passengers safe!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PRIVACY FIREWALL GAME ("Protect Your Data")
// ─────────────────────────────────────────────────────────────────────────────
export function DataFirewallPrivacyGame({
  topicTitle: _topicTitle,
  onComplete,
}: {
  topicTitle: string
  onComplete?: () => void
}) {
  const requests = [
    { id: 1, app: 'Flashlight Utility 🔦', permission: 'GPS Live Location 📍', shouldAllow: false, reason: 'A flashlight only needs LED control, never your location!' },
    { id: 2, app: 'City Maps & Bus 🗺️', permission: 'GPS Live Location 📍', shouldAllow: true, reason: 'Maps need your location to show where you are and navigate!' },
    { id: 3, app: 'Simple Calculator 🧮', permission: 'Read Private Contacts 👥', shouldAllow: false, reason: 'A calculator only computes numbers, it does not need friends lists!' },
    { id: 4, app: 'Art Photo Filter 🎨', permission: 'Access Photo Gallery 📸', shouldAllow: true, reason: 'A photo editor must access your photos to apply art effects!' },
  ]

  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleDecision = (allow: boolean) => {
    const current = requests[currentIdx]
    const isCorrect = allow === current.shouldAllow

    if (isCorrect) {
      setScore(s => s + 1)
      toast.success('🛡️ Correct Privacy Choice! ' + current.reason)
    } else {
      toast.error('⚠️ Privacy Risk! ' + current.reason)
    }

    if (currentIdx + 1 < requests.length) {
      setCurrentIdx(i => i + 1)
    } else {
      setCompleted(true)
      gamification.addXP(30, undefined, 'privacy-shield-won')
      gamification.launchConfetti()
      if (onComplete) onComplete()
    }
  }

  const currentReq = requests[currentIdx]

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 text-white max-w-xl mx-auto shadow-2xl space-y-4">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
            Privacy Firewall Game
          </span>
          <h3 className="text-lg font-black text-white mt-1">🛡️ Protect Your Personal Data</h3>
        </div>
        <span className="text-xs font-bold text-slate-400">Score: {score}/{requests.length}</span>
      </div>

      {!completed ? (
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Only grant permissions that apps actually need to function. Block suspicious data requests!
          </p>

          <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 text-center space-y-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Incoming Permission Request:</span>
            <div className="text-lg font-black text-white">{currentReq.app}</div>
            <div className="bg-slate-900 py-2.5 px-4 rounded-xl border border-slate-800 text-xs font-bold text-amber-300 inline-block">
              Wants access to: {currentReq.permission}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDecision(true)}
              className="py-3 px-4 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <Check size={16} /> ALLOW PERMISSION
            </button>
            <button
              onClick={() => handleDecision(false)}
              className="py-3 px-4 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck size={16} /> BLOCK & PROTECT
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-3 bg-slate-950 p-4 rounded-2xl border border-emerald-800">
          <div className="text-4xl">🏆</div>
          <h4 className="text-base font-black text-white">Privacy Defense Level Cleared!</h4>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            You achieved {score} out of {requests.length} correct privacy decisions. You know how to keep your data safe!
          </p>
        </div>
      )}
    </div>
  )
}
