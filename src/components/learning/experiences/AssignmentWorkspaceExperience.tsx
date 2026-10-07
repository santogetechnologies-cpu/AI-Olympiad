import React, { useState, useEffect } from 'react'
import {
  Award, Send, CheckCircle2,
  ChevronRight, Sparkles, Shield, Link2, Clock, Check
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

export const AssignmentWorkspaceExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [projectTitle, setProjectTitle] = useState('')
  const [executiveSummary, setExecutiveSummary] = useState('')
  const [architectureDetails, setArchitectureDetails] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [selectedGuardrails, setSelectedGuardrails] = useState<number[]>([0])
  const [completedSteps, setCompletedSteps] = useState<number[]>([0])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [saveStatus, setSaveStatus] = useState('Draft saved')

  const maxMarks = canonicalSection.assignmentMarks || 25
  const estMinutes = canonicalSection.estimatedMinutes || 20
  const xpReward = canonicalSection.xpReward || 25
  const instructions = canonicalSection.assignmentBrief ||
    `Design an end-to-end intelligent system specification utilizing ${topicTitle}. Detail the data ingestion pipeline, model training safeguards, and failover mechanisms.`

  const storageKey = `asgn_draft_${canonicalSection.id}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.title) setProjectTitle(p.title)
        if (p.summary) setExecutiveSummary(p.summary)
        if (p.details) setArchitectureDetails(p.details)
        if (p.url) setProjectUrl(p.url)
        if (p.guardrails) setSelectedGuardrails(p.guardrails)
        if (p.steps) setCompletedSteps(p.steps)
        if (p.submitted) setIsSubmitted(true)
      }
    } catch {}
  }, [storageKey])

  const persistDraft = (data: any) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data))
      setSaveStatus('Draft auto-saved ✓')
      setTimeout(() => setSaveStatus('Draft saved'), 2500)
    } catch {}
  }

  const steps = [
    { id: 0, title: 'Step 1: Problem Definition', desc: 'Identify the target user base and core system inputs.' },
    { id: 1, title: 'Step 2: Architecture Design', desc: 'Specify neural model layers, features, and inference pipelines.' },
    { id: 2, title: 'Step 3: Ethical Guardrails', desc: 'Define safeguards against bias and unexpected failures.' },
    { id: 3, title: 'Step 4: Submission & Review', desc: 'Review against the grading rubric and turn in.' },
  ]

  const rubric = [
    { name: 'System Architecture & Feasibility', marks: '10 Marks', desc: 'Clear explanation of input processing, neural models, and latency handling.' },
    { name: 'Safety, Bias & Guardrails', marks: '8 Marks', desc: 'Concrete mitigations against dataset bias and real-world failure states.' },
    { name: 'Technical Depth & Clarity', marks: '7 Marks', desc: 'Comprehensive documentation and structured project deliverables.' },
  ]

  const guardrailOptions = [
    { id: 0, text: 'Independent pre-deployment bias audit on diverse representative datasets' },
    { id: 1, text: 'Real-time telemetry heartbeat with automatic human-in-the-loop fallback' },
    { id: 2, text: 'Cryptographic data provenance to guarantee training data integrity' },
  ]

  const toggleGuardrail = (id: number) => {
    gameAudio.playTap()
    const updated = selectedGuardrails.includes(id)
      ? selectedGuardrails.filter(i => i !== id)
      : [...selectedGuardrails, id]
    setSelectedGuardrails(updated)
    persistDraft({
      title: projectTitle,
      summary: executiveSummary,
      details: architectureDetails,
      url: projectUrl,
      guardrails: updated,
      steps: completedSteps,
      submitted: isSubmitted,
    })
  }

  const toggleStep = (id: number) => {
    gameAudio.playTap()
    const updated = completedSteps.includes(id)
      ? completedSteps.filter(i => i !== id)
      : [...completedSteps, id]
    setCompletedSteps(updated)
  }

  const handleSubmit = () => {
    gameAudio.playSuccess()
    setIsSubmitted(true)
    gamification.launchConfetti()
    persistDraft({
      title: projectTitle,
      summary: executiveSummary,
      details: architectureDetails,
      url: projectUrl,
      guardrails: selectedGuardrails,
      steps: [0, 1, 2, 3],
      submitted: true,
    })
    if (!isCompleted) onComplete()
  }

  const readyToAdvance = isCompleted || isSubmitted

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToAdvance && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(7) // Advance to Section 8 (Quiz)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200/60 mb-2">
            <Award size={13} className="text-blue-600" />
            <span>Section 7 · Mini-Project Workspace (Assignment)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Capstone Project: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {instructions}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            <Clock size={14} className="text-slate-500" />
            <span>Max Marks: {maxMarks}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <Sparkles size={14} className="text-blue-600" />
            <span>+{xpReward} XP</span>
          </div>
          {readyToAdvance && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Submitted</span>
            </div>
          )}
        </div>
      </div>

      {/* Auto-save & Status */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span>{saveStatus}</span>
        <span>Estimated: {estMinutes} mins · Evaluated Mini-Project</span>
      </div>

      {/* 4-Step Project Phase Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map(step => {
          const isDone = completedSteps.includes(step.id) || isSubmitted
          return (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                isDone
                  ? 'bg-blue-50/70 border-blue-300 text-blue-950 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">{step.title}</span>
                {isDone && <Check size={14} className="text-blue-600" />}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight font-normal">{step.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Student Work Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Student Work Area</span>
              <h3 className="text-base font-black text-slate-900">Project Deliverables & Architecture Specification</h3>
            </div>

            {/* Project Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">1. Project Title</label>
              <input
                type="text"
                placeholder={`e.g., Autonomous ${topicTitle} Optimization Architecture`}
                value={projectTitle}
                onChange={e => {
                  setProjectTitle(e.target.value)
                  persistDraft({ title: e.target.value, summary: executiveSummary, details: architectureDetails, url: projectUrl, guardrails: selectedGuardrails, steps: completedSteps, submitted: isSubmitted })
                }}
                disabled={isSubmitted}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Executive Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">2. Executive Summary & Objective</label>
              <textarea
                rows={3}
                placeholder="State the core real-world challenge, target users, and expected performance metrics..."
                value={executiveSummary}
                onChange={e => {
                  setExecutiveSummary(e.target.value)
                  persistDraft({ title: projectTitle, summary: e.target.value, details: architectureDetails, url: projectUrl, guardrails: selectedGuardrails, steps: completedSteps, submitted: isSubmitted })
                }}
                disabled={isSubmitted}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Technical Architecture Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">3. Detailed Technical Architecture & Pipeline</label>
              <textarea
                rows={6}
                placeholder="Detail input sensors, feature extraction layers, neural model choices, optimization loss functions, and inference latency considerations..."
                value={architectureDetails}
                onChange={e => {
                  setArchitectureDetails(e.target.value)
                  persistDraft({ title: projectTitle, summary: executiveSummary, details: e.target.value, url: projectUrl, guardrails: selectedGuardrails, steps: completedSteps, submitted: isSubmitted })
                }}
                disabled={isSubmitted}
                className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[11px]"
              />
            </div>

            {/* Ethical Guardrail Checkboxes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                <Shield size={14} className="text-blue-600" />
                <span>4. Production Safeguards & Guardrails (Select all that apply)</span>
              </label>
              <div className="space-y-2">
                {guardrailOptions.map(g => {
                  const isChecked = selectedGuardrails.includes(g.id)
                  return (
                    <button
                      key={g.id}
                      onClick={() => !isSubmitted && toggleGuardrail(g.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check size={12} />}
                      </div>
                      <span>{g.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Optional Project Artifact URL */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                <Link2 size={14} className="text-slate-500" />
                <span>5. Project Artifact Link (Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/... or Figma or Google Doc link"
                value={projectUrl}
                onChange={e => {
                  setProjectUrl(e.target.value)
                  persistDraft({ title: projectTitle, summary: executiveSummary, details: architectureDetails, url: e.target.value, guardrails: selectedGuardrails, steps: completedSteps, submitted: isSubmitted })
                }}
                disabled={isSubmitted}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Turn in button */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Send size={15} />
                <span>Submit Capstone Assignment for Grading</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Project submitted successfully! Receipt logged to student academic record.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Grading Rubric & Section Advance */}
        <div className="lg:col-span-4 space-y-6">
          {/* Rubric Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Assessment Rubric</span>
            <h3 className="text-base font-black text-slate-900">Grading Criteria ({maxMarks} Marks Total)</h3>

            <div className="space-y-3">
              {rubric.map((r, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-900">{r.name}</span>
                    <span className="text-blue-700 font-mono">{r.marks}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Section 7 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToAdvance ? 'Project Ready' : 'In Progress'}
              </span>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed">
              {readyToAdvance || isCompleted
                ? 'Assignment submitted! Your project documentation is saved. Advance directly to the Section 8 Final Mastery Quiz.'
                : 'Document your project deliverables or advance directly to Section 8: Final Mastery Quiz at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-blue-800 hover:bg-blue-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Section 8: Mastery Quiz</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
