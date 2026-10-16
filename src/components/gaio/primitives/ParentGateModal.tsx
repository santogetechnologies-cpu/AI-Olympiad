// ─────────────────────────────────────────────────────────────────────────────
// PARENT & TEACHER GATE MODAL
// Child-proof math lock, screen time limits, wake lock, and learning stats
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import { ShieldCheck, Lock, Clock, Moon, Sparkles, X, Sun, BookOpen, Star, Volume2 } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import toast from 'react-hot-toast'

export interface ParentGateModalProps {
  isOpen: boolean
  onClose: () => void
  stars: number
  currentPage: number
  totalPages: number
  isNightMode: boolean
  onToggleNightMode: () => void
  isWakeLockActive: boolean
  onToggleWakeLock: () => void
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  stars,
  currentPage,
  totalPages,
  isNightMode,
  onToggleNightMode,
  isWakeLockActive,
  onToggleWakeLock
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
  const [mathQuestion, setMathQuestion] = useState<{ num1: number; num2: number; ans: number }>({
    num1: 4,
    num2: 3,
    ans: 7
  })
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30)

  // Generate random math challenge
  useEffect(() => {
    if (isOpen) {
      const n1 = Math.floor(Math.random() * 8) + 2
      const n2 = Math.floor(Math.random() * 8) + 2
      setMathQuestion({ num1: n1, num2: n2, ans: n1 + n2 })
      setUserAnswer('')
      setIsUnlocked(false)
    }
  }, [isOpen])

  const handleVerifyMath = (e: React.FormEvent) => {
    e.preventDefault()
    if (parseInt(userAnswer.trim(), 10) === mathQuestion.ans) {
      setIsUnlocked(true)
      gameAudio.playSuccess()
      toast.success('Parent access verified!')
    } else {
      gameAudio.playWrong()
      toast.error('Incorrect answer. Please try again.')
      setUserAnswer('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 text-white rounded-3xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
        >
          <X size={18} />
        </button>

        {!isUnlocked ? (
          // Math Challenge Gate
          <div className="text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center">
              <Lock size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Parent & Teacher Access</h3>
              <p className="text-xs text-slate-400 mt-1">Please answer this simple question to enter settings:</p>
            </div>

            <form onSubmit={handleVerifyMath} className="space-y-4 pt-2">
              <div className="text-2xl font-black text-amber-300 bg-slate-800/80 py-3 rounded-2xl border border-slate-700">
                {mathQuestion.num1} + {mathQuestion.num2} = ?
              </div>
              <input
                type="number"
                autoFocus
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-full text-center text-lg font-bold py-2 bg-slate-800 border border-slate-600 rounded-xl outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition-all shadow-lg"
              >
                Verify & Enter
              </button>
            </form>
          </div>
        ) : (
          // Verified Settings & Dashboard
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="font-black text-base">Parent Dashboard</h3>
                <p className="text-xs text-slate-400">Settings & Reading Progress</p>
              </div>
            </div>

            {/* Reading Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <BookOpen size={14} className="text-blue-400" />
                  <span>Reading Progress</span>
                </div>
                <div className="text-lg font-black text-white mt-1">
                  Page {currentPage} / {totalPages}
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Star size={14} className="text-amber-400" />
                  <span>Stars Collected</span>
                </div>
                <div className="text-lg font-black text-amber-300 mt-1">{stars} ⭐</div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3 pt-2">
              {/* Screen Wake Lock */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <div className="text-xs font-bold text-white">Keep Screen Awake (Wake Lock)</div>
                  <div className="text-[10px] text-slate-400">Prevents tablet/phone screen from sleeping</div>
                </div>
                <button
                  onClick={onToggleWakeLock}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isWakeLockActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isWakeLockActive ? 'Active' : 'Off'}
                </button>
              </div>

              {/* Night Mode */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <div className="text-xs font-bold text-white">Day / Night Theme</div>
                  <div className="text-[10px] text-slate-400">Comfortable reading in low light</div>
                </div>
                <button
                  onClick={onToggleNightMode}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-amber-300"
                >
                  {isNightMode ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>

              {/* Bedtime / Session Limit */}
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white">Screen Time Limit</div>
                  <span className="text-xs font-black text-amber-400">{timeLimitMinutes} mins</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="15"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
