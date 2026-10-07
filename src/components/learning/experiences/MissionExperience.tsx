import React, { useState } from 'react'
import { Navigation, Play, Battery } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { AnimatedSmartCarSVG } from '../svg/AnimatedSVGs'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 10. MISSION EXPERIENCE ──────────────────────────────────────────────────
// Structure: Autonomous Mission Control command deck with instruction queue, route planner, and live rover launch
export const MissionExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config: _config,
  isCompleted,
  onComplete,
}) => {
  const [commands, setCommands] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [roverPosition, setRoverPosition] = useState(0)
  const [missionSuccess, setMissionSuccess] = useState(false)

  const commandOptions = [
    { id: 'FORWARD', label: 'Move Forward (10m)', icon: '⬆️' },
    { id: 'SCAN_LIDAR', label: 'Scan LiDAR Obstacles', icon: '📡' },
    { id: 'TURN_RIGHT', label: 'Turn Right (90°)', icon: '➡️' },
    { id: 'DECELERATE', label: 'Safe Brake & Stop', icon: '🛑' },
  ]

  const handleAddCommand = (cmd: string) => {
    if (commands.length < 5) {
      gameAudio.playTap()
      setCommands([...commands, cmd])
    }
  }

  const handleClear = () => {
    setCommands([])
    setRoverPosition(0)
    setMissionSuccess(false)
  }

  const handleLaunchMission = () => {
    if (commands.length === 0) return
    gameAudio.playTap()
    setIsExecuting(true)

    let step = 0
    const interval = setInterval(() => {
      step++
      setRoverPosition(step)
      if (step >= commands.length) {
        clearInterval(interval)
        setIsExecuting(false)
        setMissionSuccess(true)
        gameAudio.playSuccess()
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      }
    }, 700)
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Mission Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/40 flex items-center justify-center">
            <Navigation size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Autonomous Mission Dispatch</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
          <Battery size={14} className="text-emerald-400" /> System Battery: 96%
        </div>
      </div>

      {/* Grid Rover Field & Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Mission Map & Vehicle */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950/80 border-2 border-blue-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <AnimatedSmartCarSVG size={150} className="mb-4" />
          <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-bold">
              <span>Waypoint Trajectory Progress</span>
              <span>{Math.min(100, Math.round((roverPosition / Math.max(1, commands.length)) * 100))}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (roverPosition / Math.max(1, commands.length)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Command Queue Builder */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-blue-500/30 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Assemble Instruction Queue:</h3>
            <div className="grid grid-cols-2 gap-2">
              {commandOptions.map(cmd => (
                <button
                  key={cmd.id}
                  disabled={isExecuting || commands.length >= 5}
                  onClick={() => handleAddCommand(cmd.id)}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-left text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-2"
                >
                  <span>{cmd.icon}</span>
                  <span className="truncate">{cmd.label}</span>
                </button>
              ))}
            </div>

            {/* Active Queue Display */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 min-h-[90px] space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Execution Pipeline:</span>
              {commands.length === 0 ? (
                <p className="text-xs text-slate-600 italic">Queue is empty. Select commands above.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {commands.map((c, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        i < roverPosition
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : i === roverPosition && isExecuting
                          ? 'bg-blue-500/30 border-blue-400 text-white animate-pulse'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {i + 1}. {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              disabled={isExecuting}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Reset
            </button>
            <button
              disabled={commands.length === 0 || isExecuting}
              onClick={handleLaunchMission}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Play size={14} /> Launch Autonomous Rover
            </button>
          </div>
        </div>
      </div>

      {missionSuccess && (
        <SuccessCelebration
          title="🎉 Mission Safely Completed!"
          subtitle={`Your command sequence piloted the vehicle to all designated waypoints for ${topicTitle}.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
