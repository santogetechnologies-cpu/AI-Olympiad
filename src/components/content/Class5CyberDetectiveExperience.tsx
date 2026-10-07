import { useState } from 'react'
import {
  Volume2, Shield, Award, Check, Search, Lock, Unlock
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

import type { LessonJourneyData } from '../../services/curriculumData'

export interface Class5CyberDetectiveProps {
  chapterNum: string | number
  chapterTitle?: string
  topicTitle: string
  lessonNumber: 1 | 2
  hookQuestion?: string
  journey?: LessonJourneyData
  onComplete?: () => void
}

export function Class5CyberDetectiveExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  lessonNumber,
  hookQuestion: _hookQuestion,
  journey,
  onComplete,
}: Class5CyberDetectiveProps) {
  const cNum = parseInt(String(chapterNum || '1'), 10)

  // Game states
  const [detectiveXP, setDetectiveXP] = useState(0)
  const [cluesFound, setCluesFound] = useState<Record<string, boolean>>({})
  const [vaultUnlocked, setVaultUnlocked] = useState(false)

  // Lesson 2 Decision Tree state
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)
  const [solvedDecisions, setSolvedDecisions] = useState<Record<number, boolean>>({})
  const [badgeAwarded, setBadgeAwarded] = useState(false)

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 0.95
      u.pitch = 1.1
      window.speechSynthesis.speak(u)
    }
  }

  // Clues for Lesson 1 (Derived from topic-specific journey steps or topic title)
  const lesson1Clues = journey?.understand?.steps?.map((step, idx) => ({
    id: `clue${idx + 1}`,
    title: `🔍 Evidence ${idx + 1}: ${step.title}`,
    desc: `${step.description} ${step.detail}`,
    actionText: `Inspect ${step.title.replace(/^\d+\.\s*/, '')}`
  })) || [
    {
      id: 'clue1',
      title: `🔍 Evidence 1: Core Foundation of ${topicTitle}`,
      desc: `Smart algorithms process inputs and recognize recurring data patterns for ${topicTitle}.`,
      actionText: 'Inspect Data Records'
    },
    {
      id: 'clue2',
      title: `🧠 Evidence 2: Processing Matrix for ${topicTitle}`,
      desc: `The AI evaluates rules and logic trees to generate calibrated prediction scores.`,
      actionText: 'Analyze Logic Matrix'
    },
    {
      id: 'clue3',
      title: `🚀 Evidence 3: Real-World Action for ${topicTitle}`,
      desc: `The system outputs validated decisions and assists human users safely in society.`,
      actionText: 'Verify Real-World Results'
    }
  ]

  const handleInspectClue = (id: string) => {
    if (cluesFound[id]) return
    const next = { ...cluesFound, [id]: true }
    setCluesFound(next)
    if (Object.keys(next).length === lesson1Clues.length && !vaultUnlocked) {
      setVaultUnlocked(true)
      setDetectiveXP(x => x + 25)
      gamification.addXP(25, undefined, `cls5-l1-vault-${cNum}`)
      toast.success(`🔓 Secret Vault for ${topicTitle} Unlocked! +25 Detective XP`, { icon: '🎉' })
    }
  }

  // Cases for Lesson 2 Decision Tree (Derived from topic-specific real-world scenario & practice question)
  const decisionCases = [
    {
      id: 0,
      title: `Case #501: Real-World Deployment of ${topicTitle}`,
      scenario: journey?.realWorld?.exampleScenario || `Evaluating practical decision logic and sensor safety rules for ${topicTitle}.`,
      ruleBranches: journey?.realWorld?.industryUseCases?.map((uc, i) => ({
        label: uc,
        status: i === 0 ? 'high' : 'verified'
      })) || [
        { label: 'Safety Threshold > 90%', status: 'high' },
        { label: 'Input Integrity: Verified', status: 'verified' },
        { label: 'Human-in-the-Loop Check: Active', status: 'critical' }
      ],
      question: journey?.practice?.question || `What is the safest, most ethical decision when implementing ${topicTitle}?`,
      options: journey?.practice?.options?.map((opt, i) => ({
        text: opt,
        correct: i === (journey.practice.correctIndex ?? 0),
        reason: i === (journey.practice.correctIndex ?? 0) ? (journey.practice.explanation || 'Optimal, safe decision!') : 'Sub-optimal choice. Review safety constraints.'
      })) || [
        { text: `Execute validated ethical protocols for ${topicTitle}! 🛡️`, correct: true, reason: 'Safety First! Always verify integrity before taking automated action.' },
        { text: 'Bypass safety checks and execute randomly ⚡', correct: false, reason: 'High risk! Safety checks must never be skipped.' }
      ]
    },
    {
      id: 1,
      title: `Case #502: Safety & Governance in ${topicTitle}`,
      scenario: `A smart system evaluating ${topicTitle} detects an edge-case anomaly in real-time sensor streams.`,
      ruleBranches: [
        { label: 'Anomaly Detection: POSITIVE', status: 'warning' },
        { label: 'Confidence Score: 88%', status: 'high' },
        { label: 'Human Supervisor Notification: REQUIRED', status: 'critical' }
      ],
      question: `How should the automated system handle this edge case in ${topicTitle}?`,
      options: [
        { text: 'Flag the anomaly and alert the supervisor for verification! 🩺', correct: true, reason: 'Spot on! Responsible AI systems maintain human-in-the-loop oversight for ambiguous edge cases.' },
        { text: 'Ignore the anomaly and pretend everything is normal 🙈', correct: false, reason: 'Never! Ignoring anomalies leads to system failures.' }
      ]
    }
  ]

  const handleSelectDecision = (caseIdx: number, isCorrect: boolean) => {
    if (isCorrect) {
      if (!solvedDecisions[caseIdx]) {
        const next = { ...solvedDecisions, [caseIdx]: true }
        setSolvedDecisions(next)
        if (Object.keys(next).length === decisionCases.length && !badgeAwarded) {
          setBadgeAwarded(true)
          setDetectiveXP(x => x + 30)
          gamification.addXP(30, undefined, `cls5-l2-badge-${cNum}`)
          toast.success(`🏅 AI Detective Badge for ${topicTitle} Awarded! +30 XP`, { icon: '🌟' })
          if (onComplete) onComplete()
        }
      }
      toast.success('Case Solved! Excellent deduction!')
    } else {
      toast.error('Incorrect deduction! Review the decision branches.')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Grade Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-amber-500/30">
        <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Shield size={14} className="text-amber-400" /> Class 5: Cyber Mystery Detective Agency
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-400/30">
              {lessonNumber === 1 ? '🕵️ Mode: Evidence Lab' : '⚖️ Mode: Decision Tree Solver'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-2xl border border-amber-500/40 text-xs font-bold text-amber-300">
              <span>⭐</span> <span>{detectiveXP} Detective XP</span>
            </div>
            <button
              onClick={() => speakText(lessonNumber === 1 ? `Welcome Detective! Let's uncover the clues behind ${topicTitle}` : `Decision Tree Station activated! Let's solve cases for ${topicTitle}`)}
              className="bg-amber-600 hover:bg-amber-500 text-white p-2 rounded-xl text-xs flex items-center gap-1 font-bold shadow-md active:scale-95 transition-all"
            >
              <Volume2 size={14} /> Listen
            </button>
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            Lesson {lessonNumber}: {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 font-medium">
            {lessonNumber === 1
              ? `Uncover how smart algorithms learn from example data patterns to make accurate classifications.`
              : `Evaluate real-world AI decision trees and determine safe, ethical actions for smart systems.`}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1: EVIDENCE VAULT & PATTERN INSPECTOR                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>🔍 Evidence Investigation Board</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect each piece of evidence to unlock the Secret AI Vault!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
              {Object.keys(cluesFound).length}/{lesson1Clues.length} Inspected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson1Clues.map((clue) => {
              const isFound = cluesFound[clue.id]

              return (
                <div
                  key={clue.id}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isFound
                      ? 'border-amber-400 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 hover:border-amber-200'
                  }`}
                >
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{clue.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{clue.desc}</p>
                  </div>

                  <button
                    onClick={() => handleInspectClue(clue.id)}
                    disabled={isFound}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isFound
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
                    }`}
                  >
                    {isFound ? (
                      <>
                        <Check size={14} /> <span>Evidence Verified</span>
                      </>
                    ) : (
                      <>
                        <Search size={14} /> <span>{clue.actionText}</span>
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Vault Status Box */}
          <div className={`p-5 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between flex-wrap gap-4 ${
            vaultUnlocked
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400 shadow-lg animate-fade-in'
              : 'bg-slate-900 text-slate-300 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
                {vaultUnlocked ? <Unlock size={24} className="text-amber-200" /> : <Lock size={24} className="text-slate-400" />}
              </div>
              <div>
                <h4 className="font-black text-sm text-white">
                  {vaultUnlocked ? 'Secret Machine Learning Safe: UNLOCKED!' : 'AI Mystery Safe (Requires 3 Clues)'}
                </h4>
                <p className="text-xs text-amber-100/90 mt-0.5">
                  {vaultUnlocked
                    ? 'Key Takeaway: AI models do not memorize answers; they discover generalizable patterns from training examples!'
                    : 'Inspect all evidence cards above to decrypt the safe password.'}
                </p>
              </div>
            </div>

            {vaultUnlocked && (
              <span className="text-xs font-black bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/30">
                +25 XP Awarded
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2: DECISION TREE & ETHICAL LOGIC SOLVER                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>⚖️ Autonomous Decision Case Solver</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Analyze branching logic and select the optimal, responsible response for each real-world case.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {decisionCases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseIdx(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseIdx === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : solvedDecisions[idx]
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Case #{idx + 1} {solvedDecisions[idx] && '✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Card */}
          {(() => {
            const currentCase = decisionCases[selectedCaseIdx]
            const isSolved = solvedDecisions[selectedCaseIdx]

            return (
              <div className="space-y-5">
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900 text-sm">{currentCase.title}</h4>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      Active Scenario
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {currentCase.scenario}
                  </p>

                  {/* Decision Tree Branch Conditions */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Sensor Telemetry & Policy Rules:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {currentCase.ruleBranches.map((branch, bIdx) => (
                        <div key={bIdx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span>{branch.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question & Deductions */}
                <div className="space-y-3">
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                    {currentCase.question}
                  </h4>

                  <div className="space-y-2.5">
                    {currentCase.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectDecision(selectedCaseIdx, opt.correct)}
                        disabled={isSolved}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3 text-xs sm:text-sm ${
                          isSolved && opt.correct
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSolved && opt.correct ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSolved && opt.correct ? <Check size={12} /> : optIdx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="leading-snug">{opt.text}</span>
                          {isSolved && (
                            <p className="text-xs text-slate-500 mt-1 font-medium italic">{opt.reason}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}

          {badgeAwarded && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-md animate-bounce-subtle">
              <div className="flex items-center gap-2.5">
                <Award size={24} className="text-amber-300" />
                <div>
                  <h4 className="font-black text-sm">Official Class 5 AI Detective Badge Awarded!</h4>
                  <p className="text-xs text-indigo-100">You mastered ethical AI decision branching and telemetry analysis.</p>
                </div>
              </div>
              <span className="text-xs font-black bg-white/20 px-3 py-1.5 rounded-xl border border-white/30">
                +30 XP Earned
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
