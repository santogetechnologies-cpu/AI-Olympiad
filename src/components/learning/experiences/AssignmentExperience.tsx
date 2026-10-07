import React, { useState } from 'react'
import { Award, Send, FileCheck } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 15. ASSIGNMENT EXPERIENCE ───────────────────────────────────────────────
// Structure: Graded Capstone Assignment briefing, rubric breakdown, architecture schematic editor, and submission
export const AssignmentExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config: _config,
  isCompleted,
  onComplete,
}) => {
  const [submissionText, setSubmissionText] = useState('')
  const [selectedEthicalChoice, setSelectedEthicalChoice] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const maxMarks = canonicalSection.assignmentMarks || 25

  const rubric = [
    { title: 'System Architecture Design', marks: '10 Marks', desc: 'Accurate decomposition of sensor ingestion, neural layers, and actuation safety.' },
    { title: 'Ethical & Bias Analysis', marks: '8 Marks', desc: 'Identification of failure edge cases and protective bias mitigation strategies.' },
    { title: 'Real-World Feasibility', marks: '7 Marks', desc: 'Clarity of implementation steps, resource cost, and user experience impact.' },
  ]

  const handleSubmit = () => {
    if (!submissionText.trim()) return
    gameAudio.playSuccess()
    setIsSubmitted(true)
    gamification.launchConfetti()
    if (!isCompleted) onComplete()
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Assignment Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Graded Capstone Assignment</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
          Max Marks: {maxMarks}
        </div>
      </div>

      {/* Assignment Problem Briefing & Rubric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950/80 border-2 border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <FileCheck size={18} className="text-amber-400" /> Engineering Problem Brief
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {canonicalSection.assignmentBrief ||
              `Design a complete end-to-end AI system specification for ${topicTitle}. Detail which sensors are required, how training datasets should be vetted for fairness, and what failsafe rules will prevent real-world accidents.`}
          </p>

          <div className="space-y-3 pt-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Ethical Guardrail Strategy:
            </label>
            {[
              { id: 0, text: 'Mandate independent algorithmic bias auditing before deployment.' },
              { id: 1, text: 'Include human-in-the-loop override switches for high-risk decisions.' },
              { id: 2, text: 'Maintain transparent open telemetry logs of all sensor inferences.' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedEthicalChoice(item.id)}
                className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  selectedEthicalChoice === item.id
                    ? 'bg-amber-500/20 border-amber-400 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {selectedEthicalChoice === item.id ? '✓ ' : '+ '} {item.text}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Rubric */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Grading Rubric</span>
          {rubric.map((r, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white">{r.title}</span>
                <span className="text-amber-400">{r.marks}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Pad */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-amber-500/30 space-y-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Your System Design & Implementation Plan:
        </label>
        <textarea
          rows={5}
          disabled={isSubmitted}
          value={submissionText}
          onChange={e => setSubmissionText(e.target.value)}
          placeholder="Document your system components, dataset curation steps, and safety protocols..."
          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 outline-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {submissionText.length} characters written
          </span>
          <button
            disabled={!submissionText.trim() || isSubmitted}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25"
          >
            <Send size={14} /> {isSubmitted ? '✓ Assignment Submitted' : 'Submit Assignment for Grading →'}
          </button>
        </div>
      </div>

      {isSubmitted && (
        <SuccessCelebration
          title="🎉 Assignment Successfully Submitted!"
          subtitle={`Your architectural submission on ${topicTitle} has been recorded for review.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
