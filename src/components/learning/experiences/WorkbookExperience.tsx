import React, { useState, useEffect } from 'react'
import {
  FileEdit, CheckCircle2, Download, Save,
  ChevronRight, Sparkles, HelpCircle, Check, BookOpen
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'

export const WorkbookExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [activeTab, setActiveTab] = useState<'synthesis' | 'sorter' | 'reflection'>('synthesis')
  const [synthesisAnswers, setSynthesisAnswers] = useState<Record<string, string>>({})
  const [sortedItems, setSortedItems] = useState<Record<string, 'input' | 'processing' | 'output'>>({})
  const [reflectionText, setReflectionText] = useState('')
  const [rubricChecked, setRubricChecked] = useState<number[]>([])
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('All changes saved')

  const estMinutes = canonicalSection.estimatedMinutes || 10
  const xpReward = canonicalSection.xpReward || 20
  const worksheetInstructions = canonicalSection.workbookPrompts || 'Complete the structured workbook exercises below to synthesize your learning.'
  const fileUrl = (canonicalSection as any).fileUrl

  // Auto-save drafts to local storage
  const storageKey = `ws_draft_${canonicalSection.id}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.synthesis) setSynthesisAnswers(parsed.synthesis)
        if (parsed.sorted) setSortedItems(parsed.sorted)
        if (parsed.reflection) setReflectionText(parsed.reflection)
        if (parsed.rubric) setRubricChecked(parsed.rubric)
      }
    } catch {}
  }, [storageKey])

  const saveDraft = (data: any) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data))
      setAutoSaveStatus('Draft auto-saved ✓')
      setTimeout(() => setAutoSaveStatus('All changes saved'), 2500)
    } catch {}
  }

  // Part 1: Concept Synthesis Questions
  const synthesisPrompts = [
    {
      id: 'q1',
      label: 'Core Mechanism Breakdown',
      prompt: `In your own words, summarize how ${topicTitle} processes raw inputs to reach a final output:`,
      placeholder: 'e.g., Raw inputs are digitized, features extracted through mathematical layers, and ranked by probability...',
    },
    {
      id: 'q2',
      label: 'Edge Case Prediction',
      prompt: `Describe one edge case where an algorithm dealing with ${topicTitle} might produce an erroneous prediction:`,
      placeholder: 'e.g., High sensor noise, ambiguous optical lighting, or rare combinations outside the training distribution...',
    },
  ]

  // Part 2: Interactive Categorization Sorter
  const sorterItems = [
    { id: 'item1', text: 'Camera Pixels & Microphone Audio', correct: 'input' },
    { id: 'item2', text: 'Convolutional Layer Feature Weights', correct: 'processing' },
    { id: 'item3', text: 'Steering Wheel Motor Angle Command', correct: 'output' },
    { id: 'item4', text: 'LiDAR Point Cloud Distance Matrix', correct: 'input' },
    { id: 'item5', text: 'Loss Gradient Calculation & Backprop', correct: 'processing' },
    { id: 'item6', text: 'Confidence Probability on Dashboard', correct: 'output' },
  ]

  const rubricItems = [
    'I have clearly articulated the core mechanism with supporting examples.',
    'I have accurately sorted all pipeline components into their proper architectural stages.',
    'I have analyzed potential failure modes and suggested protective guardrails.',
  ]

  const handleSynthesisChange = (id: string, text: string) => {
    const updated = { ...synthesisAnswers, [id]: text }
    setSynthesisAnswers(updated)
    saveDraft({ synthesis: updated, sorted: sortedItems, reflection: reflectionText, rubric: rubricChecked })
  }

  const handleSortItem = (id: string, category: 'input' | 'processing' | 'output') => {
    gameAudio.playTap()
    const updated = { ...sortedItems, [id]: category }
    setSortedItems(updated)
    saveDraft({ synthesis: synthesisAnswers, sorted: updated, reflection: reflectionText, rubric: rubricChecked })
  }

  const handleReflectionChange = (text: string) => {
    setReflectionText(text)
    saveDraft({ synthesis: synthesisAnswers, sorted: sortedItems, reflection: text, rubric: rubricChecked })
  }

  const toggleRubric = (idx: number) => {
    gameAudio.playTap()
    const updated = rubricChecked.includes(idx)
      ? rubricChecked.filter(i => i !== idx)
      : [...rubricChecked, idx]
    setRubricChecked(updated)
    saveDraft({ synthesis: synthesisAnswers, sorted: sortedItems, reflection: reflectionText, rubric: updated })
  }

  // Progress metrics
  const synthesisDone = Object.keys(synthesisAnswers).length >= 1
  const sortedDone = Object.keys(sortedItems).length >= 4
  const rubricDone = rubricChecked.length >= 2
  const readyToAdvance = isCompleted || (synthesisDone && sortedDone && rubricDone)

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToAdvance && !isCompleted) {
      gamification.launchConfetti()
      onComplete()
    }
    if (onJumpToSection) onJumpToSection(4) // Advance to Section 5 (Activity)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60 mb-2">
            <FileEdit size={13} className="text-emerald-600" />
            <span>Section 4 · Interactive Student Workbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Interactive Workbook: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {worksheetInstructions}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Download size={14} className="text-slate-600" />
              <span>Download PDF</span>
            </a>
          )}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Sparkles size={14} className="text-emerald-600" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Header Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'worksheet'}
        sectionNumber={4}
        contentType="worksheet"
        position="header"
      />
      {/* Aura AI Guide Interactive Companion */}
      <div className="bg-white/95 rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
        <AuraGuideAvatar
          mood={readyToAdvance || isCompleted ? 'celebrating' : synthesisDone ? 'explaining' : 'thinking'}
          message={
            readyToAdvance || isCompleted
              ? 'Outstanding work! You have completed all workbook synthesis questions and sorted the pipeline components.'
              : synthesisDone
              ? 'Great progress! Continue sorting the pipeline elements and check your self-evaluation checklist.'
              : 'Welcome to your Workbook! Answer the core synthesis prompts below to capture key ideas from this chapter.'
          }
          size="sm"
          className="w-full"
        />
      </div>

      {/* Auto-save bar */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <Save size={13} className="text-slate-400" />
          <span>{autoSaveStatus}</span>
        </span>
        <span>Estimated: {estMinutes} minutes · Graded Portfolio Record</span>
      </div>

      {/* 2. After Intro / Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'worksheet'}
        sectionNumber={4}
        contentType="worksheet"
        position="after_hook"
      />

      {/* 3. Mid-Lesson Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'worksheet'}
        sectionNumber={4}
        contentType="worksheet"
        position="mid_lesson"
      />

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('synthesis')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'synthesis'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen size={14} />
          <span>Part 1: Concept Synthesis</span>
        </button>
        <button
          onClick={() => setActiveTab('sorter')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'sorter'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Sparkles size={14} />
          <span>Part 2: Pipeline Sorter ({Object.keys(sortedItems).length}/{sorterItems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('reflection')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'reflection'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HelpCircle size={14} />
          <span>Part 3: Reflection & Rubric</span>
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Tasks */}
        <div className="lg:col-span-8 space-y-6">
          {/* Part 1: Synthesis Prompts */}
          {activeTab === 'synthesis' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Part 1</span>
                <h3 className="text-base font-black text-slate-900">Guided Conceptual Synthesis</h3>
                <p className="text-xs text-slate-500 mt-1">Answer the analytical prompts below. Your answers are auto-saved to your student portfolio.</p>
              </div>

              <div className="space-y-4">
                {synthesisPrompts.map(p => (
                  <div key={p.id} className="space-y-2 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                    <label className="text-xs font-bold text-slate-900 block">{p.label}</label>
                    <p className="text-xs text-slate-600">{p.prompt}</p>
                    <textarea
                      rows={3}
                      value={synthesisAnswers[p.id] || ''}
                      onChange={e => handleSynthesisChange(p.id, e.target.value)}
                      placeholder={p.placeholder}
                      className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Part 2: Interactive Pipeline Sorter */}
          {activeTab === 'sorter' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Part 2</span>
                <h3 className="text-base font-black text-slate-900">Tactile Pipeline Categorizer</h3>
                <p className="text-xs text-slate-500 mt-1">Classify each system component into its correct architectural stage: Input, Processing, or Output.</p>
              </div>

              <div className="space-y-3">
                {sorterItems.map(item => {
                  const assigned = sortedItems[item.id]
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <span className="text-xs font-semibold text-slate-800">{item.text}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleSortItem(item.id, 'input')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            assigned === 'input'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Input Stage
                        </button>
                        <button
                          onClick={() => handleSortItem(item.id, 'processing')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            assigned === 'processing'
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Processing
                        </button>
                        <button
                          onClick={() => handleSortItem(item.id, 'output')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            assigned === 'output'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Actuation / Output
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Part 3: Personal Reflection */}
          {activeTab === 'reflection' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Part 3</span>
                <h3 className="text-base font-black text-slate-900">Personal Synthesis & Future Application</h3>
                <p className="text-xs text-slate-500 mt-1">Reflect on how this technology will evolve over the next decade.</p>
              </div>

              <div className="space-y-2">
                <textarea
                  rows={6}
                  value={reflectionText}
                  onChange={e => handleReflectionChange(e.target.value)}
                  placeholder={`Write your structured reflection here: What new societal benefits or ethical guardrails should be established for ${topicTitle}?`}
                  className="w-full text-xs p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Minimum 30 characters recommended</span>
                  <span>{reflectionText.length} characters</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Self-Assessment Rubric & Section Advance */}
        <div className="lg:col-span-4 space-y-6">
          {/* 4. Activity Image Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'worksheet'}
            sectionNumber={4}
            contentType="worksheet"
            position="activity"
          />

          {/* Rubric Verification Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Self-Evaluation Checklist</span>
            </h3>
            <p className="text-xs text-slate-500">
              Check off each criterion before submitting your workbook:
            </p>
            <div className="space-y-2.5">
              {rubricItems.map((criterion, idx) => {
                const isChecked = rubricChecked.includes(idx)
                return (
                  <button
                    key={idx}
                    onClick={() => toggleRubric(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-all ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check size={12} />}
                    </div>
                    <span>{criterion}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Section 4 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToAdvance ? 'Workbook Ready' : 'In Progress'}
              </span>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
              {readyToAdvance || isCompleted
                ? 'Workbook completed! Your responses are preserved. Continue to Section 5: Activity Game.'
                : 'Record your workbook answers or advance directly to Section 5: Activity Game at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-emerald-800 hover:bg-emerald-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Activity: Educational Game</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Summary Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'worksheet'}
        sectionNumber={4}
        contentType="worksheet"
        position="bottom_summary"
      />
    </div>
  )
}
