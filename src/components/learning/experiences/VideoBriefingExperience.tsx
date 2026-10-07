import React, { useState } from 'react'
import {
  Play, Pause, RotateCcw, CheckCircle2,
  Sparkles, ChevronRight, BookOpen, Clock, FileText, Maximize2, ShieldCheck
} from 'lucide-react'
import { formatVideoUrl } from '../../../utils/mediaUtils'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'
import { AssignedImageSlot } from '../../content/AssignedImageSlot'

export const VideoBriefingExperience: React.FC<ExperienceComponentProps> = ({
  gradeKey,
  chapterNum,
  topicTitle,
  chapterTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [takeawaysChecked, setTakeawaysChecked] = useState<number[]>([])
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)

  const videoUrl = canonicalSection.videoUrl || ''
  const parsedVideo = formatVideoUrl(videoUrl)
  const estMinutes = canonicalSection.estimatedMinutes || 8
  const xpReward = canonicalSection.xpReward || 15

  // Interactive slide briefing simulation when no external video URL is provided
  const briefingSlides = [
    {
      title: 'Introduction & Core Premise',
      time: '00:00',
      description: `Understand the fundamental principles of ${topicTitle} and why it matters in modern computing.`,
      icon: '💡',
      accent: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Architecture & Internal Mechanism',
      time: '02:30',
      description: `Explore the step-by-step processing pipeline and mathematical models driving ${topicTitle}.`,
      icon: '⚙️',
      accent: 'from-indigo-600 to-violet-600',
    },
    {
      title: 'Real-World Case Study & Application',
      time: '05:15',
      description: `Discover how leading industries deploy ${topicTitle} to automate decisions and solve complex challenges.`,
      icon: '🚀',
      accent: 'from-violet-600 to-emerald-600',
    },
  ]

  const takeaways = [
    `The core objective of ${topicTitle} is pattern recognition and autonomous decision-making.`,
    `Data quality and feature representation directly determine accuracy and reliability.`,
    `Real-world deployment requires strict safety guardrails and algorithmic fairness.`,
  ]

  const comprehensionQuestion = {
    question: `What is the primary role of ${topicTitle} in real-world intelligent systems?`,
    options: [
      `To process data patterns and inform reliable, automated decisions.`,
      `To replace all human oversight without verification.`,
      `To simply store static text in a spreadsheet without learning.`,
    ],
    correctIndex: 0,
    explanation: `Intelligent systems analyze patterns in raw inputs to make consistent, data-backed inferences.`,
  }

  const toggleTakeaway = (idx: number) => {
    gameAudio.playTap()
    setTakeawaysChecked(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const handleSelectAnswer = (idx: number) => {
    if (isAnswerSubmitted) return
    setCheckAnswer(idx)
    setIsAnswerSubmitted(true)
    if (idx === comprehensionQuestion.correctIndex) {
      gameAudio.playSuccess()
      if (!isCompleted) {
        onComplete()
        gamification.launchConfetti()
      }
    } else {
      gameAudio.playWrong()
    }
  }

  const allTakeawaysDone = takeawaysChecked.length >= 2
  const readyToComplete = isCompleted || (allTakeawaysDone && isAnswerSubmitted && checkAnswer === comprehensionQuestion.correctIndex)

  const handleFinishSection = () => {
    gameAudio.playSuccess()
    if (readyToComplete && !isCompleted) onComplete()
    if (onJumpToSection) onJumpToSection(1) // Move to Section 2 (Lesson 1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Briefing Deck Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 mb-2">
            <Sparkles size={13} className="text-blue-600" />
            <span>Section 1 · Cinematic Interactive Briefing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {canonicalSection.title || `Video Briefing: ${topicTitle}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {canonicalSection.videoDescription ||
              canonicalSection.description ||
              `Watch the interactive video briefing to master the conceptual foundations of ${topicTitle} in ${chapterTitle}.`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
            <Clock size={14} className="text-slate-500" />
            <span>{estMinutes} Mins</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Sparkles size={14} className="text-amber-500" />
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
        sectionKey={canonicalSection.id || 'video'}
        sectionNumber={1}
        contentType="video"
        position="header"
      />

      {/* 2. After Intro / Hook Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'video'}
        sectionNumber={1}
        contentType="video"
        position="after_hook"
      />

      {/* Main Two-Panel Cinematic Workspace */}
      <div className={`grid grid-cols-1 ${theaterMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start`}>
        {/* Left Column: Responsive Video Player Frame */}
        <div className={`${theaterMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-4`}>
          {/* 3. Mid-Lesson Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'video'}
            sectionNumber={1}
            contentType="video"
            position="mid_lesson"
          />
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 relative group aspect-video flex flex-col justify-between">
            {parsedVideo.isEmbed ? (
              <iframe
                src={parsedVideo.embedUrl}
                title="Cinematic Briefing Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : parsedVideo.directUrl ? (
              <video
                src={parsedVideo.directUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              /* Rich Interactive Motion Presentation Fallback */
              <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white select-none">
                {/* Cinematic Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Overlay Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Briefing Scene {activeSlide + 1} / {briefingSlides.length}</span>
                  </div>
                  <span className="font-mono text-slate-400">{briefingSlides[activeSlide].time}</span>
                </div>

                {/* Center Presentation Slide */}
                <div className="relative z-10 max-w-xl mx-auto text-center space-y-4 my-auto">
                  <div className="text-5xl">{briefingSlides[activeSlide].icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {briefingSlides[activeSlide].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {briefingSlides[activeSlide].description}
                  </p>
                </div>

                {/* Bottom Interactive Controls */}
                <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying)
                        gameAudio.playTap()
                      }}
                      className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      <span className="text-xs">{isPlaying ? 'Pause' : 'Play Presentation'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveSlide(0)
                        gameAudio.playTap()
                      }}
                      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
                      title="Restart"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  {/* Scene Tabs */}
                  <div className="flex items-center gap-1.5">
                    {briefingSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveSlide(idx)
                          gameAudio.playTap()
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeSlide === idx
                            ? 'bg-white text-slate-900 shadow-md font-black'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        Scene {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Under-player Utility Toolbar */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FileText size={14} className="text-slate-400" />
              <span>Official Syllabus Media Briefing</span>
            </span>
            <button
              onClick={() => setTheaterMode(!theaterMode)}
              className="hover:text-slate-800 font-semibold flex items-center gap-1 transition-colors"
            >
              <Maximize2 size={13} />
              <span>{theaterMode ? 'Exit Theater' : 'Theater Mode'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Dossier & Verification Checklist */}
        <div className={`${theaterMode ? 'lg:col-span-12' : 'lg:col-span-4'} space-y-6`}>
          {/* Timeline Chapter Markers */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              <span>Key Timeline Highlights</span>
            </h3>
            <div className="space-y-2">
              {briefingSlides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveSlide(idx)
                    gameAudio.playTap()
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    activeSlide === idx
                      ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded">
                      {s.time}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Key Takeaway Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-indigo-600" />
                <span>Verify Key Takeaways</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                {takeawaysChecked.length}/{takeaways.length}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tap each key concept to confirm your understanding from the briefing:
            </p>
            <div className="space-y-2">
              {takeaways.map((item, idx) => {
                const checked = takeawaysChecked.includes(idx)
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTakeaway(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 text-xs ${
                      checked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-semibold'
                        : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-all ${
                        checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked && <CheckCircle2 size={12} />}
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Activity / Task Image Slot */}
          <AssignedImageSlot
            classKey={gradeKey}
            chapterNum={chapterNum}
            sectionKey={canonicalSection.id || 'video'}
            sectionNumber={1}
            contentType="video"
            position="activity"
          />

          {/* Comprehension Checkpoint Question */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> Quick Checkpoint
              </span>
              {isAnswerSubmitted && checkAnswer === comprehensionQuestion.correctIndex && (
                <span className="text-[11px] font-bold text-emerald-600">Verified ✓</span>
              )}
            </div>

            <p className="text-xs font-semibold text-slate-800 leading-snug">
              {comprehensionQuestion.question}
            </p>

            <div className="space-y-2">
              {comprehensionQuestion.options.map((opt, idx) => {
                const isSelected = checkAnswer === idx
                const isCorrect = idx === comprehensionQuestion.correctIndex
                let btnStyle = 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                if (isAnswerSubmitted) {
                  if (isSelected && isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-900'
                  } else if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {isAnswerSubmitted && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                💡 <strong>Explanation:</strong> {comprehensionQuestion.explanation}
              </div>
            )}
          </div>

          {/* Section Advance / Completion Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Section 1 Milestone
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {readyToComplete ? 'Ready to Proceed' : 'In Progress'}
              </span>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed">
              {readyToComplete || isCompleted
                ? 'Great job! You have completed the interactive video briefing. Advance directly to Lesson 1.'
                : 'Watch the briefing and key takeaways, or continue directly to Lesson 1 at any time.'}
            </p>

            <button
              onClick={handleFinishSection}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-white text-blue-700 hover:bg-blue-50 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Lesson 1: Concept Exploration</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Summary Slot */}
      <AssignedImageSlot
        classKey={gradeKey}
        chapterNum={chapterNum}
        sectionKey={canonicalSection.id || 'video'}
        sectionNumber={1}
        contentType="video"
        position="bottom_summary"
      />
    </div>
  )
}
