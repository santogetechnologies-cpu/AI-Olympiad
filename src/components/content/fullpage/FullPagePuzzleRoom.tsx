import React, { useState } from 'react'
import {
  Puzzle, Key, Lock, Unlock, ChevronRight, CheckCircle2,
  HelpCircle, ShieldCheck
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'

export interface FullPagePuzzleRoomProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPagePuzzleRoom: React.FC<FullPagePuzzleRoomProps> = ({
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [activeStation, setActiveStation] = useState<number>(0)
  const [solvedStations, setSolvedStations] = useState<number[]>([])
  const [vaultUnlocked, setVaultUnlocked] = useState(false)

  // Station 1: Concept Match / Term Pair
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({})

  // Station 2: False statement detector
  const [station2Solved, setStation2Solved] = useState(false)

  // Station 3: Algorithmic Keycode Dial (3-digit code)
  const [keyDigits, setKeyDigits] = useState<number[]>([1, 0, 1])
  const [station3Solved, setStation3Solved] = useState(false)

  const pairs = profile.pairs && profile.pairs.length >= 2
    ? profile.pairs.slice(0, 3)
    : [
        { id: 'p1', term: 'Input Sensor', definition: 'Gathers raw signals from the environment' },
        { id: 'p2', term: 'Learned Weights', definition: 'Mathematical adjustments storing pattern memory' },
        { id: 'p3', term: 'Calibrated Action', definition: 'Safe physical or digital output assisting people' },
      ]

  const handleMatchTerm = (term: string) => {
    if (!selectedTerm) {
      setSelectedTerm(term)
    } else {
      if (selectedTerm === term) {
        setSelectedTerm(null)
      } else {
        setSelectedTerm(term)
      }
    }
  }

  const handleMatchDef = (id: string) => {
    if (!selectedTerm) {
      toast('Select a concept term first!', { icon: '💡' })
      return
    }
    const pair = pairs.find(p => p.id === id)
    if (pair && pair.term === selectedTerm) {
      const next = { ...matchedPairs, [id]: true }
      setMatchedPairs(next)
      setSelectedTerm(null)
      toast.success(`Matched: ${pair.term}!`)
      if (Object.keys(next).length === pairs.length) {
        solveStation(0)
      }
    } else {
      toast.error('Not a matching pair. Try again!')
    }
  }

  const handleSelectStation2 = (isLie: boolean) => {
    if (isLie) {
      setStation2Solved(true)
      solveStation(1)
      toast.success('🎯 False statement detected! Clue #2 Secured.')
    } else {
      toast.error('This is a true statement about AI. Find the incorrect statement!')
    }
  }

  const handleDialChange = (idx: number) => {
    if (station3Solved) return
    const next = [...keyDigits]
    next[idx] = (next[idx] + 1) % 10
    setKeyDigits(next)
    // Secret code is 3-1-4 or any sum = 8
    if (next[0] === 3 && next[1] === 1 && next[2] === 4) {
      setStation3Solved(true)
      solveStation(2)
      toast.success('🔓 Code Dial Cracked! Clue #3 Secured.')
    }
  }

  const solveStation = (stationIdx: number) => {
    if (!solvedStations.includes(stationIdx)) {
      const next = [...solvedStations, stationIdx]
      setSolvedStations(next)
      gamification.addXP(20, undefined, `puzzle-station-${stationIdx}`)
      if (next.length === 3) {
        setVaultUnlocked(true)
        gamification.addXP(30, undefined, 'puzzle-vault-opened')
        gamification.launchConfetti()
        toast.success('🌟 The Puzzle Vault Unlocked! Full Master Clearance Granted!', { icon: '🎉' })
        onComplete()
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Room Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
              🧩
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800 flex items-center gap-1">
                  <Puzzle size={12} /> Mystery Puzzle Room
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {solvedStations.length}/3 Clues Solved
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                The Vault of {topicTitle}
              </h2>
            </div>
          </div>

          {/* Central Vault Status Indicator */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs shadow-lg transition-all ${
            vaultUnlocked
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            {vaultUnlocked ? <Unlock size={18} className="text-emerald-400" /> : <Lock size={18} className="text-amber-400 animate-pulse" />}
            <span>{vaultUnlocked ? 'Vault Opened! (+50 XP)' : 'Encrypted Vault Locked'}</span>
          </div>
        </div>

        {/* Station Navigation Tabs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 0, title: 'Station 1: Concept Pairs', icon: Key },
            { id: 1, title: 'Station 2: Spot the Glitch', icon: HelpCircle },
            { id: 2, title: 'Station 3: Cipher Dial', icon: ShieldCheck },
          ].map((st) => {
            const isSolved = solvedStations.includes(st.id)
            const isActive = activeStation === st.id
            const Icon = st.icon

            return (
              <button
                key={st.id}
                onClick={() => setActiveStation(st.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-xl scale-102 ring-2 ring-amber-300'
                    : isSolved
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/80 font-bold'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm flex items-center gap-1.5">
                    <Icon size={16} />
                    <span>{st.title}</span>
                  </span>
                  {isSolved && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Station Workspace */}
        <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col justify-between">
          
          {/* Station 0: Concept Match */}
          {activeStation === 0 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Clue #1: Align Corresponding Mental Models
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Connect each term with its correct real-world function for {topicTitle}:
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Terms */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Terms</span>
                  {pairs.map(p => {
                    const isMatched = matchedPairs[p.id]
                    const isSelected = selectedTerm === p.term
                    return (
                      <button
                        key={p.id}
                        disabled={isMatched}
                        onClick={() => handleMatchTerm(p.term)}
                        className={`w-full p-3.5 rounded-xl text-left font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80 opacity-60'
                            : isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg scale-102 ring-2 ring-amber-300'
                            : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-amber-400/50'
                        }`}
                      >
                        {isMatched ? `✓ ${p.term}` : p.term}
                      </button>
                    )
                  })}
                </div>

                {/* Definitions */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Real-World Functions</span>
                  {pairs.map(p => {
                    const isMatched = matchedPairs[p.id]
                    return (
                      <button
                        key={p.id}
                        disabled={isMatched}
                        onClick={() => handleMatchDef(p.id)}
                        className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all border cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80 opacity-60'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/50'
                        }`}
                      >
                        {p.definition}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Station 1: False statement detector */}
          {activeStation === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Clue #2: The Anomaly Detector
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Spot the INCORRECT statement among the facts below:
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { text: `${topicTitle} uses data patterns to make consistent and useful decisions.`, isLie: false },
                  { text: 'AI is magic that knows everything instantly without needing any data or human rules.', isLie: true },
                  { text: 'Responsible AI includes safeguards to prevent biases and errors.', isLie: false },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    disabled={station2Solved}
                    onClick={() => handleSelectStation2(item.isLie)}
                    className={`w-full p-4 rounded-2xl text-left font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                      station2Solved && item.isLie
                        ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-amber-400/50'
                    }`}
                  >
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Station 2: Cipher Dial */}
          {activeStation === 2 && (
            <div className="space-y-4 text-center">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Clue #3: Vault Keycode Alignment
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Align the 3 security dials to [3 - 1 - 4] to unlock the master clearance:
                </h3>
              </div>

              <div className="flex items-center justify-center gap-4 py-6">
                {keyDigits.map((digit, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleDialChange(idx)}
                      disabled={station3Solved}
                      className="w-16 h-20 bg-slate-950 border-2 border-amber-500/50 hover:border-amber-400 rounded-2xl text-3xl font-black text-amber-300 flex items-center justify-center shadow-2xl active:scale-95 transition-all cursor-pointer"
                    >
                      {digit}
                    </button>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Dial #{idx + 1}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400">
                Tap each dial to cycle numbers. Hint: Set dials to 3, 1, 4!
              </p>
            </div>
          )}

          {/* Bottom Advancement */}
          <div className="pt-6 border-t border-slate-800 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {vaultUnlocked ? '🎉 All clues deciphered! Ready for Live Simulation.' : 'Solve all 3 stations to crack the puzzle vault.'}
            </span>

            <button
              onClick={() => onJumpToSection(3)}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
            >
              <span>Proceed to Section 4: Live Simulation Sandbox</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
