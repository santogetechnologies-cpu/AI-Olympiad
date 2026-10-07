import { useState } from 'react'
import {
  Play, CheckCircle,
  Zap, RefreshCw, Lightbulb
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface Class4PixelQuestProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: 1 | 2
  onComplete?: () => void
}

export function Class4PixelQuestExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  onComplete,
}: Class4PixelQuestProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Game state
  const [powerGems, setPowerGems] = useState(0)

  // LESSON 1 STATE: Sensor Scanner & Concept Breakdown
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [scannedItems, setScannedItems] = useState<Record<string, 'smart' | 'normal' | null>>({})
  const [scannerCompleted, setScannerCompleted] = useState(false)

  // LESSON 2 STATE: Robot Grid Navigation & Algorithm Path
  const [commands, setCommands] = useState<string[]>([])
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [gridRunning, setGridRunning] = useState(false)
  const [missionWon, setMissionWon] = useState(false)
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)

  // Sound / Speech
  const speakVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 1.0
      u.pitch = 1.15
      window.speechSynthesis.speak(u)
    }
  }

  // Dynamic scanner items derived from topic profile use cases and everyday items
  const scannerTargets = [
    {
      id: 'item1',
      name: profile.useCases[0] || 'Smart Assistant Tool',
      icon: '🤖',
      type: 'smart' as const,
      clue: `Uses smart computing logic to assist with: ${profile.learnPoints[0] || 'learning patterns'}`
    },
    {
      id: 'item2',
      name: 'Ordinary Wooden Desk',
      icon: '🪵',
      type: 'normal' as const,
      clue: 'A basic physical object. It has no computer chip, sensors, or code inside.'
    },
    {
      id: 'item3',
      name: profile.useCases[1] || 'Digital Smart Sensor',
      icon: '⚡',
      type: 'smart' as const,
      clue: `Processes input signals automatically: ${profile.learnPoints[1] || 'automated decisions'}`
    },
    {
      id: 'item4',
      name: 'Plastic Water Bottle',
      icon: '🧴',
      type: 'normal' as const,
      clue: 'Holds water safely for drinking, but cannot calculate or follow computer commands.'
    },
  ]

  const handleScanItem = (id: string, choice: 'smart' | 'normal', correctType: string) => {
    setScannedItems(prev => ({ ...prev, [id]: choice }))
    if (choice === correctType) {
      setPowerGems(p => p + 1)
      toast.success('🎯 Correct scan! +1 Power Gem', { icon: '💎' })
      const allDone = scannerTargets.every(t => (t.id === id ? choice : scannedItems[t.id]) === t.type)
      if (allDone) {
        setScannerCompleted(true)
        gamification.addXP(25, undefined, `cls4-l1-scan-${cNum}-${lessonNumber}`)
        toast.success('🏆 Lesson 1 Sensor Mission Completed! +25 XP')
      }
    } else {
      toast.error('Not quite! Inspect the clue and try again.')
    }
  }

  // Robot Grid Navigation Config (3x3 Grid)
  const gridGoal = { x: 2, y: 2 }
  const gridObstacle = { x: 1, y: 1 }

  const handleAddCommand = (cmd: string) => {
    if (commands.length >= 8) {
      toast.error('Command queue full (max 8 steps)!')
      return
    }
    setCommands(prev => [...prev, cmd])
  }

  const handleClearCommands = () => {
    setCommands([])
    setRobotPos({ x: 0, y: 0 })
    setGridRunning(false)
    setMissionWon(false)
  }

  const handleRunProgram = async () => {
    if (commands.length === 0) {
      toast.error('Add commands to your program first!')
      return
    }
    setGridRunning(true)
    let curX = 0
    let curY = 0

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i]
      await new Promise(r => setTimeout(r, 500))

      if (cmd === 'FORWARD') {
        if (curX < 2) curX++
      } else if (cmd === 'DOWN') {
        if (curY < 2) curY++
      } else if (cmd === 'UP') {
        if (curY > 0) curY--
      } else if (cmd === 'LEFT') {
        if (curX > 0) curX--
      }

      setRobotPos({ x: curX, y: curY })

      if (curX === gridObstacle.x && curY === gridObstacle.y) {
        setGridRunning(false)
        toast.error('💥 Obstacle Hit! Adjust your path instructions.', { icon: '⚠️' })
        return
      }
    }

    setGridRunning(false)
    if (curX === gridGoal.x && curY === gridGoal.y) {
      setMissionWon(true)
      gamification.addXP(30, undefined, `cls4-l2-grid-${cNum}-${lessonNumber}`)
      toast.success(`🎉 Mission Accomplished! Robot mastered ${topicTitle}! +30 XP`, { icon: '🚀' })
      if (onComplete) onComplete()
    } else {
      toast("Robot reached the end of instructions! Add more commands to reach the Star 🌟", { icon: '🤖' })
    }
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gamification.addXP(20, undefined, `cls4-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Super Star! Correct answer! +20 XP', { icon: '⭐' })
    } else {
      toast.error('Try again! You can do it!')
    }
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Level Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-emerald-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Zap size={14} className="text-emerald-400" /> Class 4: Pixel Quest &amp; Smart Robot Rescue
            </span>
            <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-400/30">
              {lessonNumber === 1 ? '🕹️ Mode: Sensor Scanner' : '🚀 Mode: Robot Code Runner'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-2xl border border-emerald-500/40 text-xs font-bold text-amber-300">
              <span>💎</span> <span>{powerGems} Gems</span>
            </div>
            <button
              onClick={() => speakVoice(`${profile.goal}. ${profile.hook}`)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl text-xs flex items-center gap-1 font-bold shadow-md active:scale-95 transition-all"
            >
              <Zap size={14} /> Listen
            </button>
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-medium">
            {profile.goal}
          </p>
        </div>

        {/* Thought Hook */}
        <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-400/30 rounded-2xl flex items-start gap-3 relative z-10">
          <Lightbulb size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-100 font-medium">
            <strong className="text-amber-300 font-bold">Curious Question: </strong>
            {profile.hook}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: SENSOR SCANNER & CONCEPT DISCOVERY                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Everyday Analogy */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider mb-2">
              <span>💡 Easy Everyday Analogy</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {profile.analogy}
            </p>
          </div>

          {/* 3 Step Concept Cards */}
          <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🔍 3-Step Discovery Journey</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    activeStepIdx === idx
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Step {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs mt-1.5 line-clamp-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{st.desc}</p>
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs space-y-2 border border-slate-800">
              <div className="text-emerald-400 font-bold">{steps[activeStepIdx].title}</div>
              <p className="leading-relaxed">{steps[activeStepIdx].detail}</p>
            </div>
          </div>

          {/* Smart Scanner Mission */}
          <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>🕹️ Smart Scanner Challenge</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Scan each item to decide if it uses smart computer logic or is a regular tool!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scannerTargets.map(item => {
                const choice = scannedItems[item.id]
                const isCorrect = choice === item.type
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                      choice
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/70'
                          : 'border-rose-300 bg-rose-50/70'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{item.clue}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleScanItem(item.id, 'smart', item.type)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          choice === 'smart'
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-200 hover:bg-emerald-100 text-slate-800'
                        }`}
                      >
                        🤖 Smart AI Tool
                      </button>
                      <button
                        onClick={() => handleScanItem(item.id, 'normal', item.type)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          choice === 'normal'
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        🪵 Regular Tool
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {scannerCompleted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                <span>All items scanned correctly! You earned +25 XP and unlocked the next challenge!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2: ROBOT GRID NAVIGATOR & PRACTICE CHALLENGE                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Real World Scenario */}
          <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🌍 Real-World Smart Story</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {profile.realScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.useCases.map((uc, i) => (
                <div key={i} className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Example #{i + 1}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{uc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Robot Code Grid */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                  <span>🚀 Robot Sparky Code Navigator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Give clear, step-by-step commands to guide Sparky from (0,0) to Star (2,2)! Avoid the rock!
                </p>
              </div>
              <Button
                onClick={handleClearCommands}
                variant="ghost"
                className="text-xs text-slate-400 hover:text-white"
              >
                <RefreshCw size={12} className="mr-1" /> Reset
              </Button>
            </div>

            {/* 3x3 Visual Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto p-3 bg-slate-900 rounded-2xl border border-slate-800">
              {[0, 1, 2].map(y =>
                [0, 1, 2].map(x => {
                  const isRobot = robotPos.x === x && robotPos.y === y
                  const isObstacle = gridObstacle.x === x && gridObstacle.y === y
                  const isGoal = gridGoal.x === x && gridGoal.y === y

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`h-16 rounded-xl flex items-center justify-center text-2xl transition-all border ${
                        isRobot
                          ? 'bg-emerald-600/60 border-emerald-400 shadow-lg scale-105'
                          : isObstacle
                          ? 'bg-rose-950/60 border-rose-600/60'
                          : isGoal
                          ? 'bg-amber-950/60 border-amber-500/60 animate-pulse'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      {isRobot ? '🤖' : isObstacle ? '🪨' : isGoal ? '🌟' : ''}
                    </div>
                  )
                })
              )}
            </div>

            {/* Command Controller */}
            <div className="space-y-3">
              <div className="flex justify-center gap-2 flex-wrap">
                <Button
                  onClick={() => handleAddCommand('FORWARD')}
                  disabled={gridRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 font-bold rounded-xl"
                >
                  ➡️ Right
                </Button>
                <Button
                  onClick={() => handleAddCommand('DOWN')}
                  disabled={gridRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 font-bold rounded-xl"
                >
                  ⬇️ Down
                </Button>
                <Button
                  onClick={() => handleAddCommand('UP')}
                  disabled={gridRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 font-bold rounded-xl"
                >
                  ⬆️ Up
                </Button>
                <Button
                  onClick={() => handleAddCommand('LEFT')}
                  disabled={gridRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 font-bold rounded-xl"
                >
                  ⬅️ Left
                </Button>
              </div>

              {/* Command Queue */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Your Code Program:</div>
                <div className="flex gap-1.5 flex-wrap min-h-[24px]">
                  {commands.length === 0 ? (
                    <span className="text-slate-600 italic">No commands added yet. Tap directions above!</span>
                  ) : (
                    commands.map((cmd, idx) => (
                      <span key={idx} className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                        {idx + 1}. {cmd}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <Button
                onClick={handleRunProgram}
                disabled={gridRunning || commands.length === 0}
                variant="primary"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={16} className={gridRunning ? 'animate-spin' : ''} />
                <span>{gridRunning ? 'Robot is moving...' : 'Run Robot Program ▶'}</span>
              </Button>

              {missionWon && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Victory! Robot reached the Star safely! +30 XP</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Practice Question */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Skill Challenge
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mt-2">
                  {profile.practice.question || profile.practice.q}
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {(profile.practice.options || profile.practice.opts || []).map((opt, idx) => {
                const isSelected = selectedPracticeOpt === idx
                const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPractice(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ${
                      practiceAnswered && isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : practiceAnswered && isCorrect
                        ? 'border-emerald-400 bg-emerald-50/60 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:border-emerald-400 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {practiceAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                  </button>
                )
              })}
            </div>

            {practiceAnswered && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
                <span className="font-bold">Why this is correct:</span>
                <p>{profile.practice.explanation || profile.practice.exp}</p>
              </div>
            )}
          </div>

          {/* 3 Core Takeaways */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-6 rounded-3xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">
              📌 Key Takeaways for {topicTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {profile.takeaways.map((tk, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-emerald-100 font-medium leading-relaxed">
                  ✓ {tk}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
