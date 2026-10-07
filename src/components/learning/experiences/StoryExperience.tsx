import React, { useState } from 'react'
import { BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { PageTransition, SuccessCelebration } from '../animations/AnimationPrimitives'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { ExperienceComponentProps } from './ExplorationExperience'

// ─── 2. STORY EXPERIENCE ─────────────────────────────────────────────────────
// Structure: Narrative graphic novel panels with dialogue speech bubbles, decision forks, and story outcomes
export const StoryExperience: React.FC<ExperienceComponentProps> = ({
  topicTitle,
  canonicalSection,
  config,
  isCompleted,
  onComplete,
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0)
  const [chosenDecisions, setChosenDecisions] = useState<Record<number, number>>({})
  const [storyFinished, setStoryFinished] = useState(false)

  const scenes = config?.storyScenes || [
    {
      id: 0,
      speaker: 'Dr. Ada, Chief AI Researcher',
      dialogue: `Welcome to the Robotics Lab! We are launching our autonomous delivery robot for the first time today. But it needs instructions on how to recognize school crosswalks.`,
      avatar: '👩‍🔬',
      backgroundTheme: 'from-amber-950/40 to-slate-900',
      decision: {
        prompt: 'What sensor should Dr. Ada activate first for the robot to detect kids crossing the street?',
        options: [
          { text: 'High-Resolution Visual Camera + Depth LiDAR', outcome: 'Excellent! The robot accurately spots pedestrians 50 meters away.', isOptimal: true },
          { text: 'Sound Horn at Maximum Volume', outcome: 'Uh oh! The horn startles people and gives no visual distance data.', isOptimal: false },
        ],
      },
    },
    {
      id: 1,
      speaker: 'Robo-Rover Companion',
      dialogue: `BEEP-BOOP! Visual feed active! I see a ball bouncing across the sidewalk into the road! My neural classifier estimates a 98% chance that a child might chase it.`,
      avatar: '🤖',
      backgroundTheme: 'from-blue-950/40 to-slate-900',
      decision: {
        prompt: 'What predictive rule should the AI robot execute immediately?',
        options: [
          { text: 'Slow down smoothly and prepare to brake at the crosswalk', outcome: 'Perfect predictive safety! A toddler steps out a moment later and is completely safe.', isOptimal: true },
          { text: 'Accelerate forward before the child arrives', outcome: 'Dangerous! High speed drastically increases stopping distance.', isOptimal: false },
        ],
      },
    },
    {
      id: 2,
      speaker: 'City Safety Inspector',
      dialogue: `Impressive response time! The delivery robot anticipated the hazard, logged the telemetry event to the cloud, and safely completed its mission.`,
      avatar: '🛡️',
      backgroundTheme: 'from-emerald-950/40 to-slate-900',
      decision: {
        prompt: 'How should the AI system utilize this incident data for tomorrow?',
        options: [
          { text: 'Upload the sensor log to fine-tune the shared training dataset for all city rovers', outcome: 'Outstanding! The entire fleet of robots gets smarter and safer together!', isOptimal: true },
          { text: 'Delete the log immediately and forget the incident', outcome: 'Loss of valuable learning experience! The fleet will not improve.', isOptimal: false },
        ],
      },
    },
  ]

  const currentScene = scenes[currentSceneIdx] || scenes[0]
  const currentDecisionChoice = chosenDecisions[currentSceneIdx]

  const handleMakeChoice = (optionIdx: number) => {
    gameAudio.playTap()
    const nextDecisions = { ...chosenDecisions, [currentSceneIdx]: optionIdx }
    setChosenDecisions(nextDecisions)

    const choice = currentScene.decision.options[optionIdx]
    if (choice.isOptimal) {
      gameAudio.playSuccess()
    }

    if (currentSceneIdx === scenes.length - 1) {
      setStoryFinished(true)
      gamification.launchConfetti()
      if (!isCompleted) onComplete()
    }
  }

  const handleNextScene = () => {
    gameAudio.playTap()
    if (currentSceneIdx < scenes.length - 1) {
      setCurrentSceneIdx(i => i + 1)
    }
  }

  return (
    <PageTransition className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Story Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/80 border-2 border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Story Adventure Episode</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{topicTitle}</h1>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          Scene {currentSceneIdx + 1} of {scenes.length}
        </div>
      </div>

      {/* Comic Story Panel Layout */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${currentScene.backgroundTheme} border-2 border-amber-500/30 space-y-6 shadow-2xl relative`}>
        {/* Speaker Profile & Balloon */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-amber-400/50 text-3xl flex items-center justify-center shrink-0 shadow-lg">
            {currentScene.avatar}
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{currentScene.speaker}</h3>
            {/* Speech Dialogue Bubble */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/30 text-slate-100 text-sm sm:text-base leading-relaxed relative shadow-md">
              <div className="absolute -left-2 top-4 w-3 h-3 bg-slate-900 border-l border-t border-amber-400/30 rotate-[-45deg]" />
              <p>{currentScene.dialogue}</p>
            </div>
          </div>
        </div>

        {/* Story Decision Fork */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <h4 className="font-bold text-amber-200 text-sm flex items-center gap-2">
            <Sparkles size={16} /> Choose-Your-Path Decision:
          </h4>
          <p className="text-white text-sm sm:text-base font-semibold">{currentScene.decision.prompt}</p>

          <div className="space-y-3">
            {currentScene.decision.options.map((opt: any, idx: number) => {
              const isSelected = currentDecisionChoice === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleMakeChoice(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm font-bold ${
                    isSelected
                      ? opt.isOptimal
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400/40'
                        : 'bg-amber-950/80 border-amber-500 text-amber-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {isSelected && <CheckCircle2 size={16} className={opt.isOptimal ? 'text-emerald-400' : 'text-amber-400'} />}
                  </div>
                  {isSelected && (
                    <p className="mt-2 text-xs font-normal text-slate-300 border-t border-slate-700 pt-2">
                      Outcome: {opt.outcome}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scene Navigation Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentSceneIdx === 0}
            onClick={() => setCurrentSceneIdx(i => i - 1)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold text-xs"
          >
            ← Previous Scene
          </button>
          {currentDecisionChoice !== undefined && currentSceneIdx < scenes.length - 1 && (
            <button
              onClick={handleNextScene}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              Next Scene <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {storyFinished && (
        <SuccessCelebration
          title="🎉 Story Mission Accomplished!"
          subtitle={`You navigated the challenges of ${topicTitle} with outstanding ethical choices.`}
          xpEarned={canonicalSection.xpReward || 25}
        />
      )}
    </PageTransition>
  )
}
