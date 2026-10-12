// ─────────────────────────────────────────────────────────────────────────────
// STAGE 2: CONCEPT EXPLORER & ARCHITECTURE
// Interactive concept blocks, comparison tables, and architectural principles
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { MiddleLessonData } from '../types'
import { BookOpen, Layers, Check, ArrowRight, Lightbulb, ChevronRight } from 'lucide-react'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'
import { InteractiveConceptVisualizer } from '../InteractiveConceptVisualizer'

interface StageConceptProps {
  lesson: MiddleLessonData
  onProceed: () => void
  onOpenJargonBuster?: () => void
}

function getKidFriendlyAnalogy(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('rule') || t.includes('algorithm')) {
    return "Think of baking chocolate chip cookies! You follow step 1, step 2, and step 3. If you skip a step, the cookies burn. That strict step-by-step recipe is like a rule-based algorithm!"
  }
  if (t.includes('data') || t.includes('example') || t.includes('learn') || t.includes('train')) {
    return "Think of showing a toddler 100 pictures of fluffy cats. After seeing enough cats, the child learns to spot a real cat in the yard without needing a dictionary!"
  }
  if (t.includes('choice') || t.includes('decision') || t.includes('tree') || t.includes('boundary')) {
    return "Like choosing what to wear on a school morning: Is it raining outside? Yes -> Wear a raincoat. No -> Wear sneakers. It is a branching path of simple 'Yes/No' questions!"
  }
  if (t.includes('road') || t.includes('car') || t.includes('vision') || t.includes('sensor')) {
    return "Just like crossing the road safely: You use your eyes to see moving cars, your ears to hear honking horns, and your brain to decide when it is safe to cross the street!"
  }
  if (t.includes('health') || t.includes('medicine') || t.includes('clinic')) {
    return "Like having a super-powered magnifying glass that helps doctors spot a microscopic splinter in your finger that is too tiny for human eyes to see!"
  }
  if (t.includes('privacy') || t.includes('data') || t.includes('protect') || t.includes('right')) {
    return "Like having a personal secret diary with a heavy brass padlock! Nobody is allowed to read your notes or take photos of it without asking your parents first."
  }
  if (t.includes('fake') || t.includes('trust') || t.includes('deepfake')) {
    return "Imagine someone wearing a hyper-realistic rubber mask and playing a tape recorder of someone else's voice. We look closely for blurry edges around the eyes to spot the disguise!"
  }
  if (t.includes('python') || t.includes('code')) {
    return "Writing code is like writing a friendly instruction note to a robot chef: 'robot.make_sandwich(bread, peanut_butter, jelly)'!"
  }
  return "Imagine training a friendly puppy! When the puppy does the trick right, you give it a tasty treat. When it makes a mistake, you gently guide it until it masters the game!"
}

export const StageConcept: React.FC<StageConceptProps> = ({ lesson, onProceed, onOpenJargonBuster }) => {
  const { concept } = lesson
  const [activeBlockIdx, setActiveBlockIdx] = useState(0)

  const activeBlock = concept.blocks[activeBlockIdx] || concept.blocks[0]

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Top Heading */}
      <div className="border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <BookOpen size={14} />
          <span>Stage 2: Core AI Concepts & Architecture</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
          {concept.mainHeading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {concept.overview}
        </p>
      </div>

      {/* 1. GAIO AI Guide Mentor (Slow, Bold Male Voice Explaining Like I'm 5) */}
      <GaioAiGuideAvatar
        conceptTitle={activeBlock.title}
        simpleText={getKidFriendlyAnalogy(activeBlock.title)}
        lessonTitle={lesson.chapterTitle}
      />

      {/* 2. Interactive Picture & Animation Studio (Feed Robot, Maze Bot, Radar Car, Career Wheel, Magic Painter, Secret Chest) */}
      <InteractiveConceptVisualizer
        chapterNumber={lesson.chapterNumber}
        lessonNumber={lesson.lessonNumber}
        chapterTitle={lesson.chapterTitle}
      />

      {/* Main Concept Tabs & Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Concept Block Selector Navigation */}
        <div className="md:col-span-4 flex flex-col space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
            <Layers size={13} className="text-purple-400" /> Key Architectural Pillars
          </span>
          {concept.blocks.map((block, idx) => {
            const isSelected = idx === activeBlockIdx
            return (
              <button
                key={idx}
                onClick={() => setActiveBlockIdx(idx)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500/80 text-white shadow-lg shadow-purple-950/50'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isSelected
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate">{block.title}</span>
                </div>
                <ChevronRight
                  size={14}
                  className={`shrink-0 transition-transform ${
                    isSelected ? 'translate-x-0.5 text-purple-400' : 'text-slate-600'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Right: Active Concept Deep Dive */}
        <div className="md:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-purple-950 border border-purple-700/50 text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                Module {activeBlockIdx + 1}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activeBlock.title}
              </h3>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
              {activeBlock.summary}
            </p>

            {/* Explain Like I'm 5 (Super Story Analogy) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-yellow-950/20 to-slate-950 border border-amber-500/40 mb-4 shadow-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  🍪 Explain Like I'm 5 (Story Analogy):
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  Zero Jargon
                </span>
              </div>
              <p className="text-amber-100/90 text-xs leading-relaxed font-medium">
                {getKidFriendlyAnalogy(activeBlock.title)}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb size={13} className="text-amber-400" />
                Technical Takeaways & System Markers
              </span>
              <div className="space-y-2">
                {activeBlock.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Pillar {activeBlockIdx + 1} of {concept.blocks.length}</span>
            <span className="text-purple-400 font-medium">Class 6–8 Olympiad Benchmark</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Mastered all concept pillars? Advance to hands-on testing.
        </span>
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Deploy Experiment Lab</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
