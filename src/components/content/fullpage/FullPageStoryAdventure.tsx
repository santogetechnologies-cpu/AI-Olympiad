import React, { useState } from 'react'
import {
  BookOpen, ChevronRight, CheckCircle2,
  HelpCircle, Lightbulb, Play
} from 'lucide-react'
import { gamification } from '../../../utils/gamification'
import toast from 'react-hot-toast'
import type { TopicProfile } from '../../../services/curriculumTopicRegistry'
import {
  RobotCommandInstructionGame,
  PatternRecognitionDiscoveryGame,
  DeepfakeInvestigationGame,
  SmartCarRouteMissionGame,
  DataFirewallPrivacyGame,
} from '../TopicSpecificGameEngines'

export interface FullPageStoryAdventureProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  profile: TopicProfile
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection: (idx: number) => void
}

export const FullPageStoryAdventure: React.FC<FullPageStoryAdventureProps> = ({
  gradeKey,
  chapterNum: _chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  profile,
  isCompleted: _isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [currentAct, setCurrentAct] = useState<number>(1)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [storyCompleted, setStoryCompleted] = useState(false)
  const [showGameEngine, setShowGameEngine] = useState(false)

  const isPrimary = gradeKey === 'class3' || gradeKey === 'class4'
  const isDetective = gradeKey === 'class5' || gradeKey === 'class6' || gradeKey === 'class7'

  // Character Persona based on Tier
  const character = isPrimary
    ? { name: 'Sparky the Robot Puppy', emoji: '🤖🐾', title: 'Curious AI Companion' }
    : isDetective
    ? { name: 'Agent Pixel', emoji: '🕵️‍♂️💻', title: 'Lead Cyber Investigator' }
    : { name: 'Nova AI Engineer', emoji: '🚀⚡', title: 'Systems Architect' }

  // Story Panels derived from topic profile
  const acts = [
    {
      actNumber: 1,
      title: 'Act I: The Unexpected Scenario',
      characterSpeech: `Hey explorer! Today in the world of ${topicTitle}, something fascinating happened: ${profile.analogy || profile.hook}`,
      narrative: profile.step1?.desc || 'Our system received a stream of unorganized signals from the environment.',
      visualCue: '⚡ A surge of new sensory information arrives at the terminal.',
      choicePrompt: 'How should our AI assistant approach this first challenge?',
      options: [
        { text: 'Analyze the incoming pattern step-by-step', correct: true, feedback: 'Spot on! Step-by-step logic prevents errors.' },
        { text: 'Guess randomly without checking sensors', correct: false, feedback: 'Careful! Guessing randomly causes algorithmic failure.' },
      ],
    },
    {
      actNumber: 2,
      title: 'Act II: The Decision Crucible',
      characterSpeech: `Look closer! ${profile.realScenario || 'We must choose the safest and most efficient path forward.'}`,
      narrative: profile.step2?.desc || 'The AI evaluates its learned weights and compares current inputs against known templates.',
      visualCue: '🧠 Processing matrix calculates the optimal probability distribution.',
      choicePrompt: 'What is the most ethical and safe decision here?',
      options: [
        { text: profile.useCases?.[0] ? `Deploy: ${profile.useCases[0]}` : 'Execute calibrated safety protocol', correct: true, feedback: 'Brilliant deduction! Safe and effective.' },
        { text: 'Bypass all safety guardrails to finish faster', correct: false, feedback: 'Never bypass safety! Responsible AI protects everyone.' },
      ],
    },
    {
      actNumber: 3,
      title: 'Act III: Mission Accomplished',
      characterSpeech: `We did it! By applying ${topicTitle}, our solution successfully resolved the dilemma!`,
      narrative: profile.step3?.desc || 'The outputs are validated, actions deployed, and humans assisted safely.',
      visualCue: '🌟 The system lights up in emerald green as telemetry stabilizes!',
      choicePrompt: 'What key lesson did we learn from this journey?',
      options: [
        { text: profile.takeaways?.[0] || 'AI is a powerful helper when guided by clear human rules', correct: true, feedback: 'Perfect! You are thinking like a genuine AI scientist.' },
        { text: 'Computers do magic on their own with no rules', correct: false, feedback: 'AI is mathematics and logic, not magic!' },
      ],
    },
  ]

  const activeActData = acts[currentAct - 1]

  const handleSelectChoice = (idx: number) => {
    setSelectedChoice(idx)
    const opt = activeActData.options[idx]
    if (opt.correct) {
      gamification.addXP(20, undefined, `story-act-${currentAct}`)
      toast.success(opt.feedback, { icon: '✨' })
      if (currentAct < 3) {
        setTimeout(() => {
          setCurrentAct(a => a + 1)
          setSelectedChoice(null)
        }, 1200)
      } else {
        setStoryCompleted(true)
        gamification.launchConfetti()
        toast.success('🏆 Story Adventure Cleared! +50 Story Mastery XP')
        onComplete()
      }
    } else {
      toast.error(opt.feedback)
    }
  }

  // Topic specific game check
  const titleLower = topicTitle.toLowerCase()
  const hasSpecificGame =
    titleLower.includes('command') ||
    titleLower.includes('pattern') ||
    titleLower.includes('example') ||
    titleLower.includes('deepfake') ||
    titleLower.includes('fake') ||
    titleLower.includes('car') ||
    titleLower.includes('vehicle') ||
    titleLower.includes('protect') ||
    titleLower.includes('privacy')

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10 gap-6">
        
        {/* Story Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-3xl shadow-inner">
              {character.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800 flex items-center gap-1">
                  <BookOpen size={12} /> Interactive Comic Adventure
                </span>
                <span className="text-xs text-amber-300 font-bold">{character.name}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                The Quest of {topicTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map(actNum => (
              <div
                key={actNum}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-all ${
                  currentAct === actNum
                    ? 'bg-indigo-500 text-white ring-2 ring-indigo-300 scale-110 shadow-lg'
                    : actNum < currentAct || storyCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {actNum < currentAct || storyCompleted ? <CheckCircle2 size={16} /> : `Act ${actNum}`}
              </div>
            ))}
          </div>
        </div>

        {/* Comic Strip Panel Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Main Comic Panel (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  {activeActData.title}
                </span>
                <span className="text-xs text-slate-400 italic">
                  Episode {currentAct} of 3
                </span>
              </div>

              {/* Character Speech Bubble */}
              <div className="relative bg-indigo-950/70 border-2 border-indigo-500/40 rounded-3xl p-5 text-indigo-100 shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold text-xs">
                  <span>{character.emoji}</span>
                  <span>{character.name}:</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed font-medium">
                  "{activeActData.characterSpeech}"
                </p>
              </div>

              {/* Graphic Scene Illustration Card */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Lightbulb size={14} className="text-amber-400" /> Scene Context
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeActData.narrative}
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl text-xs text-cyan-300 border border-slate-800 font-mono">
                  {activeActData.visualCue}
                </div>
              </div>
            </div>

            {/* Optional Topic Playable Mini-Game Trigger */}
            {hasSpecificGame && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowGameEngine(!showGameEngine)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 flex items-center justify-center gap-2 border border-slate-700 cursor-pointer transition-colors"
                >
                  <Play size={14} />
                  <span>{showGameEngine ? 'Close Hands-On Mini-Game' : 'Play Interactive Mini-Game for this Concept'}</span>
                </button>
              </div>
            )}

          </div>

          {/* Decision Prompts & Interactive Choices (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {showGameEngine && hasSpecificGame ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
                {titleLower.includes('command') && <RobotCommandInstructionGame topicTitle={topicTitle} />}
                {(titleLower.includes('pattern') || titleLower.includes('example')) && <PatternRecognitionDiscoveryGame topicTitle={topicTitle} />}
                {(titleLower.includes('deepfake') || titleLower.includes('fake')) && <DeepfakeInvestigationGame topicTitle={topicTitle} />}
                {(titleLower.includes('car') || titleLower.includes('vehicle')) && <SmartCarRouteMissionGame topicTitle={topicTitle} />}
                {(titleLower.includes('protect') || titleLower.includes('privacy')) && <DataFirewallPrivacyGame topicTitle={topicTitle} />}
              </div>
            ) : (
              <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-cyan-400 tracking-wider">
                    <HelpCircle size={15} /> Your Decision Matters
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    {activeActData.choicePrompt}
                  </h3>

                  <div className="space-y-3 pt-2">
                    {activeActData.options.map((opt, idx) => {
                      const isChosen = selectedChoice === idx
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectChoice(idx)}
                          className={`w-full p-4 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                            isChosen
                              ? opt.correct
                                ? 'bg-emerald-500 text-white border-emerald-400 shadow-xl ring-2 ring-emerald-300'
                                : 'bg-rose-500 text-white border-rose-400'
                              : 'bg-slate-950/80 hover:bg-slate-800/90 text-slate-200 border-slate-700/80 hover:border-slate-500 shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.text}</span>
                            <span className="text-xs opacity-60">Choice {idx + 1}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Section Advance Button */}
                <div className="pt-6 border-t border-slate-800 mt-4 space-y-2">
                  <button
                    onClick={() => onJumpToSection(2)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-98 cursor-pointer"
                  >
                    <span>Enter Section 3: Mystery Puzzle Room</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}
