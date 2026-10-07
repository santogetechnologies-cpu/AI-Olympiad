import { useState } from 'react'
import {
  Cpu, Layers, Play, Check, Server, Zap, Sparkles, Volume2
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import { gameAudio } from '../../utils/gameAudio'
import toast from 'react-hot-toast'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export interface UGSystemsEngineeringProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  simulationCode?: string
  onComplete?: () => void
}

export function UGSystemsEngineeringExperience({
  chapterNum,
  topicTitle,
  lessonNumber,
  onComplete,
}: UGSystemsEngineeringProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const profile = getCurriculumTopicProfile(topicTitle)

  // Game state
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})

  // Game Mini-Game 1: Cloud Server Load Balancer
  const [activeServer, setActiveServer] = useState<number | null>(null)
  const [trafficDistributed, setTrafficDistributed] = useState<number[]>([40, 35, 25])
  const [balanceScore, setBalanceScore] = useState(92)

  // Game Mini-Game 2: Speed vs Cache Slider
  const [cacheHitRate, setCacheHitRate] = useState(85)
  const [stressRunning, setStressRunning] = useState(false)
  const [stressCompleted, setStressCompleted] = useState(false)
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null)
  const [practiceAnswered, setPracticeAnswered] = useState(false)

  // Speed calculation: high cache hit = lightning fast 12ms!
  const responseTimeMs = Math.max(12, Math.round(180 * (1 - cacheHitRate / 100) + 12))
  const isLightningFast = responseTimeMs < 45

  const handleRouteTraffic = (serverIdx: number) => {
    gameAudio.playTap()
    setActiveServer(serverIdx)
    setTrafficDistributed(prev => {
      const next = [...prev]
      next[serverIdx] = Math.min(100, next[serverIdx] + 15)
      // Balance others
      const otherIndices = [0, 1, 2].filter(i => i !== serverIdx)
      otherIndices.forEach(i => {
        next[i] = Math.max(10, next[i] - 7)
      })
      const isBalanced = Math.max(...next) - Math.min(...next) < 30
      setBalanceScore(isBalanced ? 98 : 75)
      return next
    })
    gameAudio.playCoin()
    toast.success(`Server #${serverIdx + 1} scaled! Balanced traffic!`, { icon: '⚡' })
  }

  const handleRunStressTest = async () => {
    gameAudio.playTap()
    setStressRunning(true)
    await new Promise(r => setTimeout(r, 500))
    setStressRunning(false)
    setStressCompleted(true)
    gameAudio.playSuccess()
    gamification.addXP(30, undefined, `ug-stress-${cNum}`)
    gamification.launchConfetti()
    toast.success('⚡ Server Cluster running at 100% health! +30 XP', { icon: '🚀' })
    if (onComplete) onComplete()
  }

  const handleMatchPair = (id: string) => {
    gameAudio.playTap()
    if (matchedPairs[id]) return
    const next = { ...matchedPairs, [id]: true }
    setMatchedPairs(next)
    if (Object.keys(next).length === profile.pairs.length) {
      gameAudio.playSuccess()
      gamification.addXP(25, undefined, `ug-pairs-${cNum}-${lessonNumber}`)
      toast.success('🧩 All smart server concepts matched! +25 XP', { icon: '🏆' })
    }
  }

  const handleSelectPractice = (idx: number) => {
    setSelectedPracticeOpt(idx)
    setPracticeAnswered(true)
    const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
    if (isCorrect) {
      gameAudio.playSuccess()
      gamification.addXP(20, undefined, `ug-practice-${cNum}-${lessonNumber}`)
      toast.success('🎯 Brilliant choice! Server optimized! +20 XP', { icon: '🎉' })
    } else {
      gameAudio.playHit()
      toast.error('Try another option to keep the app lightning fast!')
    }
  }

  const steps = [profile.step1, profile.step2, profile.step3]

  return (
    <div className="space-y-4 max-w-md sm:max-w-xl mx-auto pb-4">
      {/* ── 1. MISSION HERO CARD ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white p-5 rounded-3xl border-2 border-indigo-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Server size={13} className="text-cyan-400" /> Cloud Game Mission
          </span>
          <span className="text-[11px] font-bold text-slate-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
            Chapter {cNum}
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {lessonNumber === 1 ? '⚡ Cloud Server Defender' : '🚀 Super App Speed Booster'}
          </h2>
          <p className="text-xs text-indigo-200 mt-1 font-medium leading-relaxed">
            {profile.goal || 'Keep 1,000,000 players connected with zero lag! Tap to route traffic and optimize speed.'}
          </p>
        </div>

        {/* Real life analogy */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-start gap-2.5">
          <span className="text-xl flex-shrink-0">💡</span>
          <div className="text-xs text-indigo-100">
            <span className="font-bold text-amber-300">Everyday Example: </span>
            {profile.analogy || 'Think of a busy supermarket checkout: having 3 open cashiers keeps lines moving smoothly!'}
          </div>
        </div>

        <button
          onClick={() => gameAudio.speak(`${topicTitle}. ${profile.goal}`)}
          className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-white font-bold transition-colors"
        >
          <Volume2 size={13} /> Tap to hear mission voice
        </button>
      </div>

      {/* ── 2. INTERACTIVE MINI-GAME: SERVER LOAD BALANCER ── */}
      {lessonNumber === 1 && (
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Zap size={16} className="text-indigo-600" />
                <span>Mini-Game: Balance Player Traffic</span>
              </h3>
              <p className="text-[11px] text-slate-500">Tap a server to route incoming mobile game players:</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Health</span>
              <span className="text-sm font-black text-emerald-600">{balanceScore}%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Server A (Lobby)', icon: '🎮', load: trafficDistributed[0] },
              { label: 'Server B (Match)', icon: '⚔️', load: trafficDistributed[1] },
              { label: 'Server C (Scores)', icon: '🏆', load: trafficDistributed[2] },
            ].map((srv, idx) => (
              <button
                key={idx}
                onClick={() => handleRouteTraffic(idx)}
                className={`p-3 rounded-2xl border-2 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1.5 ${
                  activeServer === idx
                    ? 'border-indigo-500 bg-indigo-50/80 shadow-md ring-2 ring-indigo-400/30'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <span className="text-2xl">{srv.icon}</span>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">{srv.label}</span>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full transition-all duration-300 ${
                      srv.load > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${srv.load}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{srv.load}% Load</span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-center font-bold text-indigo-700 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
            {balanceScore > 90 ? '🌟 Perfect Load Distribution! Zero lag for players.' : '⚠️ Balance the servers to keep traffic even!'}
          </p>
        </div>
      )}

      {/* ── 3. INTERACTIVE MINI-GAME: SPEED & CACHE DIAL ── */}
      {lessonNumber === 2 && (
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Cpu size={16} className="text-indigo-600" />
              <span>Mini-Game: Speed Booster Slider</span>
            </h3>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
              isLightningFast ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {responseTimeMs}ms Speed
            </span>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">Fast Memory Cache:</span>
              <span className="font-mono text-cyan-400 font-bold">{cacheHitRate}% Hit Rate</span>
            </div>

            <input
              type="range"
              min={20}
              max={99}
              value={cacheHitRate}
              onChange={e => {
                setCacheHitRate(Number(e.target.value))
                gameAudio.playTap()
              }}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>🐢 20% (Slow Disk)</span>
              <span>⚡ 99% (Instant RAM)</span>
            </div>
          </div>

          <Button
            onClick={handleRunStressTest}
            loading={stressRunning}
            disabled={stressCompleted}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md min-h-[46px]"
          >
            {stressCompleted ? '✓ Server Passed 1M Player Test! (+30 XP)' : '🚀 Test Server With 1M Players'}
          </Button>
        </div>
      )}

      {/* ── 4. TAP-THROUGH 3-STEP MISSION INTEL ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} className="text-blue-600" />
            <span>Mission Intel Cards</span>
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Step {activeStepIdx + 1} of {steps.length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
              {activeStepIdx + 1}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-indigo-950">
              {steps[activeStepIdx]?.title || 'Core Rule'}
            </h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {steps[activeStepIdx]?.desc || 'Smart servers store popular data nearby so users get answers in milliseconds.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setActiveStepIdx(idx)
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeStepIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. PUZZLE MATCHING CHALLENGE ── */}
      {profile.pairs && profile.pairs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Tap &amp; Match Concepts</span>
            </h3>
            <span className="text-[11px] font-bold text-indigo-600">
              {Object.keys(matchedPairs).length}/{profile.pairs.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {profile.pairs.map(pair => {
              const isMatched = Boolean(matchedPairs[pair.id])
              return (
                <button
                  key={pair.id}
                  onClick={() => handleMatchPair(pair.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    isMatched ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isMatched ? <Check size={12} /> : '•'}
                  </div>
                  <div>
                    <span className="text-xs font-black block">{pair.term}</span>
                    <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">{pair.definition}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── 6. QUICK MISSION PRACTICE CHOICE ── */}
      {profile.practice && (profile.practice.options || profile.practice.opts) && (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Play size={13} className="text-rose-500 fill-rose-500" />
            <span>Mission Checkpoint</span>
          </span>

          <p className="text-xs sm:text-sm font-bold text-slate-900">
            {profile.practice.question || profile.practice.q || 'What is the best way to speed up user requests?'}
          </p>

          <div className="space-y-2">
            {(profile.practice.options || profile.practice.opts || []).map((opt, idx) => {
              const isSelected = selectedPracticeOpt === idx
              const isCorrect = idx === (profile.practice.correctIndex ?? profile.practice.correct ?? 0)
              const showResult = practiceAnswered && isSelected

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPractice(idx)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-rose-100 border-rose-300 text-rose-950'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{opt}</span>
                  {showResult && (
                    <span>{isCorrect ? '✓' : '✗'}</span>
                  )}
                </button>
              )
            })}
          </div>

          {practiceAnswered && (
            <p className="text-[11px] text-indigo-700 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 font-medium">
              💡 {profile.practice.explanation || profile.practice.exp || 'Storing hot data in cache avoids slow disk queries!'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
