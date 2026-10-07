import React from 'react'
import type { CanonicalSection } from '../../pages/student/ChapterLearningPage'
import { resolveLearningWorld } from './worlds/worldResolver'
import { ChapterVideoSection } from './ChapterVideoSection'
import { Class3PlayfulWorld } from './worlds/Class3PlayfulWorld'
import { ThreeStageMasteryQuiz } from './ThreeStageMasteryQuiz'
import { Class4StoryWorld } from './worlds/Class4StoryWorld'
import { Class5PuzzleWorld } from './worlds/Class5PuzzleWorld'
import { Class6MissionWorld } from './worlds/Class6MissionWorld'
import { Class7MysteryWorld } from './worlds/Class7MysteryWorld'
import { Class8ExperimentWorld } from './worlds/Class8ExperimentWorld'
import { Class9ChallengeWorld } from './worlds/Class9ChallengeWorld'
import { Class10SimulationWorld } from './worlds/Class10SimulationWorld'
import { Class11ProjectWorld } from './worlds/Class11ProjectWorld'
import { Class12AILabWorld } from './worlds/Class12AILabWorld'
import { UGProfessionalWorld } from './worlds/UGProfessionalWorld'
import { PGResearchWorld } from './worlds/PGResearchWorld'

export interface LearningExperienceDispatcherProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  currentSectionIdx: number
  canonicalSection: CanonicalSection
  completedSectionIds: string[]
  onCompleteSection: () => void
  onJumpToSection: (idx: number) => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
  tier?: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
}

/**
 * Age-Adapted Learning Experience Dispatcher
 *
 * Routes every academic level (Class 3 to PG Final Year) to its dedicated,
 * bespoke 8-section world designed specifically for that age group:
 *
 * Class 3  -> Playful AI Wonderland (Characters, Pets, Tap Discovery, Stars)
 * Class 4  -> Story & Comic Adventure (Dr. Ada & Rover, Comic Bubbles, Crossroads)
 * Class 5  -> Neon Logic & Puzzle Lab (Jigsaw Connectors, Card Flip, Vault Locks)
 * Class 6  -> Secret Agent Command (Tactical Missions, Recon, Cipher Breakers)
 * Class 7  -> Cyber Detective Bureau (Forensics, Clue Corkboard, Interrogation)
 * Class 8  -> Physics & AI Test Bench (Live Sliders, Variance Dials, Hypothesis)
 * Class 9  -> Smart City & Ethical Challenge (Civic Dilemmas, Trade-offs, Impact)
 * Class 10 -> Autonomous Telemetry Simulator (Hyperparameters, Failover, Trajectory)
 * Class 11 -> Product Architecture Studio (Node Pipeline, PRD Canvas, Capstone)
 * Class 12 -> Foundation Models & AI Lab (Attention Topology, Fairness Auditor)
 * UG       -> Enterprise Engineering Workbench (Microservices, Latency, RFC, Docker)
 * PG       -> Frontier AI Research Hub (Ablation Matrix, Attention Probes, ArXiv)
 */
export const LearningExperienceDispatcher: React.FC<LearningExperienceDispatcherProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  currentSectionIdx,
  canonicalSection,
  completedSectionIds,
  onCompleteSection,
  onJumpToSection,
  onContinueNextChapter,
  isFinalChapter,
  tier = 'primary',
}) => {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const isDone = completedSectionIds.includes(canonicalSection.id)
  const activeTopic = topicTitle || canonicalSection.topicTitle || canonicalSection.title || chapterTitle
  const cType = canonicalSection.contentType

  // Resolve the dedicated age-appropriate world
  const worldMeta = resolveLearningWorld(gradeKey)

  const sharedProps = {
    gradeKey,
    chapterNum: cNum,
    chapterTitle,
    topicTitle: activeTopic,
    canonicalSection,
    isCompleted: isDone,
    onComplete: onCompleteSection,
    onJumpToSection,
    onContinueNextChapter,
    isFinalChapter,
    tier,
    sectionIdx: currentSectionIdx,
  }

  const renderWorldComponent = () => {
    // Section 1 is ALWAYS the compulsory Chapter Video Briefing
    if (currentSectionIdx === 0 || canonicalSection.contentType === 'video') {
      return <ChapterVideoSection {...sharedProps} />
    }

    // Section 8 / Quiz is ALWAYS the authentic 3-stage mastery quiz series
    if (currentSectionIdx === 7 || canonicalSection.contentType === 'quiz') {
      return <ThreeStageMasteryQuiz {...sharedProps} />
    }

    switch (worldMeta.id) {
      case 'class3-playful':
        return <Class3PlayfulWorld {...sharedProps} />
      case 'class4-story':
        return <Class4StoryWorld {...sharedProps} />
      case 'class5-puzzle':
        return <Class5PuzzleWorld {...sharedProps} />
      case 'class6-mission':
        return <Class6MissionWorld {...sharedProps} />
      case 'class7-mystery':
        return <Class7MysteryWorld {...sharedProps} />
      case 'class8-experiment':
        return <Class8ExperimentWorld {...sharedProps} />
      case 'class9-challenge':
        return <Class9ChallengeWorld {...sharedProps} />
      case 'class10-simulation':
        return <Class10SimulationWorld {...sharedProps} />
      case 'class11-project':
        return <Class11ProjectWorld {...sharedProps} />
      case 'class12-ailab':
        return <Class12AILabWorld {...sharedProps} />
      case 'ug-professional':
        return <UGProfessionalWorld {...sharedProps} />
      case 'pg-research':
        return <PGResearchWorld {...sharedProps} />
      default:
        return <Class3PlayfulWorld {...sharedProps} />
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-50 text-slate-800 overflow-hidden">
      {/* Experience Sub-Header Bar (Compact on Mobile, Informative on Desktop) */}
      <div className="px-2.5 sm:px-6 py-1.5 sm:py-2 bg-white/90 border-b border-slate-200/80 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 backdrop-blur-xs shrink-0 shadow-2xs">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
          <span className="font-bold text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r text-white font-mono shadow-2xs" style={{ background: `linear-gradient(to right, #4f46e5, #06b6d4)` }}>
            {worldMeta.badge}
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-indigo-200/60 text-[9px] sm:text-[10px]">
            {cType ? cType.toUpperCase() : `SECTION ${currentSectionIdx + 1}`}
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline font-medium text-slate-600 truncate max-w-xs">
            {worldMeta.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {worldMeta.mascotName && (
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{worldMeta.mascotName}</span>
            </span>
          )}
          <div className="font-mono text-[10px] sm:text-[11px] text-slate-600 font-bold bg-slate-100 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200">
            {currentSectionIdx + 1}/8
          </div>
        </div>
      </div>

      {/* Render Dedicated Age-Appropriate World Component - Fixed Zero-Scroll Area */}
      <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden p-1 sm:p-3">
        {renderWorldComponent()}
      </div>
    </div>
  )
}
export default LearningExperienceDispatcher
