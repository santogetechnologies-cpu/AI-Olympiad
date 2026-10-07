import React, { useState } from 'react'
import {
  BookOpen, CheckCircle2, Sparkles, ChevronRight,
  Eye, Zap, Layers, HelpCircle, Check, Award
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'

export const LessonExplorationExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'theory' | 'interactive' | 'flashcards'>('theory')
  const [activeFlashcard, setActiveFlashcard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0)

  // Extract content from Content Manager or syllabus
  const rawHtml = canonicalSection.htmlContent || ''
  const imageSrc = canonicalSection.imageSrc
  const imageCaption = canonicalSection.imageCaption || `Detailed architectural diagram for ${topicTitle}.`
  const estMinutes = canonicalSection.estimatedMinutes || 15
  const xpReward = canonicalSection.xpReward || 20

  // Interactive Concept Matching items
  const matchingData = (() => {
    if (canonicalSection.matchingPairs && Array.isArray((canonicalSection.matchingPairs as any).pairs)) {
      return (canonicalSection.matchingPairs as any).pairs
    }
    if (Array.isArray(canonicalSection.matchingPairs)) {
      return canonicalSection.matchingPairs
    }
    return [
      {
        id: 'p1',
        term: 'Feature Representation',
        definition: 'Transforming raw real-world sensor measurements into structured mathematical matrices.',
      },
      {
        id: 'p2',
        term: 'Inference Engine',
        definition: 'The operational component that scores live inputs using learned network weights.',
      },
      {
        id: 'p3',
        term: 'Loss Function',
        definition: 'Mathematical metric quantifying the error gap between model output and ground truth.',
      },
      {
        id: 'p4',
        term: 'Generalization',
        definition: 'The capability of an algorithm to perform accurately on novel, unseen real-world data.',
      },
    ]
  })()

  // Concept flashcards
  const flashcards = canonicalSection.flashcards || [
    {
      q: `What is the primary function of ${topicTitle}?`,
      a: `To detect patterns, organize unstructured data, and generate reliable predictions or automated outputs.`,
    },
    {
      q: `Why is feature engineering or embedding important?`,
      a: `It translates human-understandable information (pixels, text, audio) into geometric vectors numbers a model can calculate.`,
    },
    {
      q: `How do systems avoid overfitting?`,
      a: `Through regularization, diverse validation sets, cross-entropy minimization, and cross-validation checkpoints.`,
    },
  ]

  // Deep dive concept pillars
  const pillars = [
    {
      title: '1. Theoretical Foundation',
      summary: `How ${topicTitle} operates under fundamental mathematical and computer science principles.`,
      detail: `At its foundation, ${topicTitle} transforms high-dimensional inputs into probabilistic classifications. Every decision boundary is computed by optimizing parameters against a loss function.`,
    },
    {
      title: '2. Real-World Analogy',
      summary: 'Connecting abstract computational algorithms to familiar real-life systems.',
      detail: `Think of this like an expert detective: rather than memorizing every single object in the universe, the system learns recurring clues (edges, textures, frequencies) to identify new situations instantly.`,
    },
    {
      title: '3. Technical Application',
      summary: 'Deploying this concept in production pipelines and embedded edge hardware.',
      detail: `Applied across modern robotics, autonomous vehicles, medical imaging, and search engines with latency constraints under 20 milliseconds.`,
    },
  ]

  const handleTermClick = (term: string) => {
    gameAudio.playTap()
    setSelectedTerm(term)
  }

  const handleDefClick = (id: string) => {
    if (!selectedTerm) return
    const pair = matchingData.find((p: any) => p.id === id)
    if (pair && pair.term === selectedTerm) {
      gameAudio.playSuccess()
      setMatchedPairs(prev => [...prev, id])
      setSelectedTerm(null)
      if (matchedPairs.length + 1 >= matchingData.length) {
        gamification.launchConfetti()
        if (!isCompleted) onComplete()
      }
    } else {
      gameAudio.playWrong()
      setSelectedTerm(null)
    }
  }

  const allMatched = matchedPairs.length >= matchingData.length
  const readyToAdvance = isCompleted || allMatched || matchedPairs.length >= 2

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToAdvance && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(2) // Advance to Section 3 (Lesson 2: Scenario)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Lesson Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60 mb-2">
            <BookOpen size={13} className="text-indigo-600" />
            <span>Section 2 · Visual Concept Exploration (Lesson 1)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Visual Concept Exploration: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {canonicalSection.description ||
              `Explore the core mechanisms, visual architectural diagrams, and verified conceptual models for ${topicTitle}.`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            <Eye size={14} className="text-slate-500" />
            <span>{estMinutes} Mins Read</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles size={14} className="text-indigo-600" />
            <span>+{xpReward} XP</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Explored</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Header Banner Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'lesson1'}
        sectionNumber={2}
        contentType="lesson"
        position="header"
      />

      {/* 2. After Intro Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'lesson1'}
        sectionNumber={2}
        contentType="lesson"
        position="after_hook"
      />

      {/* Interactive Tabs for Mobile or Alternate Modes */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'theory'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen size={14} />
          <span>Core Theory & Diagram</span>
        </button>
        <button
          onClick={() => setActiveTab('interactive')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'interactive'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Zap size={14} />
          <span>Concept Matcher ({matchedPairs.length}/{matchingData.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Layers size={14} />
          <span>Concept Flashcards</span>
        </button>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Theory & CMS Visual Assets */}
        <div className={`space-y-6 ${activeTab === 'theory' ? 'lg:col-span-7' : 'hidden lg:block lg:col-span-6'}`}>
          {/* 3. Mid-Lesson Diagram Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson1'}
            sectionNumber={2}
            contentType="lesson"
            position="mid_lesson"
          />

          {/* Core Lesson Content from Database / Content Manager */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen size={18} className="text-indigo-600" />
              <span>Core Subject Theory & Foundations</span>
            </h2>

            {rawHtml ? (
              <div
                className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: rawHtml }}
              />
            ) : (
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>{topicTitle}</strong> represents a cornerstone topic in AI Olympiad and modern computing. It equips systems with the ability to observe real-world signals, parse contextual inputs, and draw high-confidence analytical deductions.
                </p>
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-700">Key Scientific Insight:</h4>
                  <p className="text-xs leading-relaxed">
                    By learning parameterized approximations rather than relying on brittle handwritten rules, algorithmic models maintain high accuracy across noisy, dynamic environments.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Deep-Dive Pillars Accordion */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers size={16} className="text-indigo-600" />
              <span>3 Conceptual Pillars of {topicTitle}</span>
            </h3>
            <div className="space-y-2">
              {pillars.map((pillar, idx) => {
                const isExpanded = expandedPillar === idx
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedPillar(isExpanded ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{pillar.summary}</p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-100">
                        {pillar.detail}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Concept Matcher & Flashcards */}
        <div className={`space-y-6 ${activeTab !== 'theory' ? 'lg:col-span-5' : 'lg:col-span-5'}`}>
          {/* 4. Activity / Interactive Diagram Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson1'}
            sectionNumber={2}
            contentType="lesson"
            position="activity"
          />

          {/* Interactive Concept Matcher Challenge */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Interactive Activity</span>
                <h3 className="text-base font-black text-slate-900">Concept Matcher</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
                {matchedPairs.length} / {matchingData.length} Matched
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step 1: Select a term on the left. Step 2: Click its matching definition on the right!
            </p>

            {/* Terms List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">1. Key Terms</span>
              <div className="grid grid-cols-2 gap-2">
                {matchingData.map((pair: any) => {
                  const isMatched = matchedPairs.includes(pair.id)
                  const isSelected = selectedTerm === pair.term
                  return (
                    <button
                      key={pair.id}
                      onClick={() => !isMatched && handleTermClick(pair.term)}
                      disabled={isMatched}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 line-through opacity-70 cursor-not-allowed'
                          : isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300'
                      }`}
                    >
                      {pair.term}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Definitions List */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">2. Matching Definitions</span>
              <div className="space-y-2">
                {matchingData.map((pair: any) => {
                  const isMatched = matchedPairs.includes(pair.id)
                  return (
                    <button
                      key={pair.id}
                      onClick={() => !isMatched && handleDefClick(pair.id)}
                      disabled={isMatched || !selectedTerm}
                      className={`w-full p-3 rounded-xl border text-xs text-left transition-all leading-relaxed ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80'
                          : selectedTerm
                          ? 'bg-indigo-50/50 border-indigo-200 hover:bg-indigo-100/70 text-slate-800 cursor-pointer'
                          : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isMatched ? (
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                        )}
                        <span>{pair.definition}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {allMatched && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Award size={16} className="text-emerald-600 shrink-0" />
                <span>All concepts matched perfectly! +20 XP earned.</span>
              </div>
            )}
          </div>

          {/* Interactive Flashcard Deck */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-amber-500" />
                <span>Concept Quick Flashcards</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                Card {activeFlashcard + 1} of {flashcards.length}
              </span>
            </div>

            <div
              onClick={() => {
                setIsFlipped(!isFlipped)
                gameAudio.playTap()
              }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200/80 cursor-pointer min-h-[140px] flex flex-col justify-between select-none hover:border-indigo-400 transition-all text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                {isFlipped ? 'Answer (Click to Flip)' : 'Question (Click to Reveal)'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 my-auto leading-relaxed">
                {isFlipped ? flashcards[activeFlashcard].a : flashcards[activeFlashcard].q}
              </p>
              <span className="text-[10px] text-slate-400">Tap card to flip</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setActiveFlashcard(prev => (prev > 0 ? prev - 1 : flashcards.length - 1))
                  setIsFlipped(false)
                  gameAudio.playTap()
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  setActiveFlashcard(prev => (prev < flashcards.length - 1 ? prev + 1 : 0))
                  setIsFlipped(false)
                  gameAudio.playTap()
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
              >
                Next Card →
              </button>
            </div>
          </div>

          {/* 5. Bottom Takeaway / Summary Visual Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'lesson1'}
            sectionNumber={2}
            contentType="lesson"
            position="bottom_summary"
          />

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                Section 2 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToAdvance ? 'Ready to Proceed' : 'Review in Progress'}
              </span>
            </div>

            <p className="text-xs text-indigo-100 leading-relaxed">
              {readyToAdvance || isCompleted
                ? 'Excellent work! You have explored the core theory and completed the concept matching. Continue to Lesson 2.'
                : 'Review the theory and match key terms, or continue directly to Lesson 2 at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-indigo-700 hover:bg-indigo-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Lesson 2: Scenario Experience</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
