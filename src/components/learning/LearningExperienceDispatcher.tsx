// ─────────────────────────────────────────────────────────────────────────────
// AGE-ADAPTED LEARNING EXPERIENCE DISPATCHER
// Robustly routes all 8 Canonical Sections across all 16 Academic Levels:
// Section 1 (index 0): Cinematic Video Briefing
// Section 2 (index 1): Lesson 1 (Concept Discovery - 3-Screen Pedagogical Flow)
// Section 3 (index 2): Lesson 2 (Scenario Mission - 3-Screen Pedagogical Flow)
// Section 4 (index 3): Worksheet (Tactile Student Workbook & Synthesis)
// Section 5 (index 4): Activity (Interactive Educational Challenge Game)
// Section 6 (index 5): Discovery Lab (Hands-on Experimentation & Simulation Studio)
// Section 7 (index 6): Capstone Project / Assignment (Project Workspace & Portfolio)
// Section 8 (index 7): Final Mastery Quiz (3-Stage Assessment Series)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { CanonicalSection } from '../../pages/student/ChapterLearningPage'
import { resolveLearningWorld } from './worlds/worldResolver'
import { ChapterVideoSection } from './ChapterVideoSection'
import { ThreeStageMasteryQuiz } from './ThreeStageMasteryQuiz'
import { WorkbookExperience } from './experiences/WorkbookExperience'
import { GameActivityExperience } from './experiences/GameActivityExperience'
import { DiscoveryLabExperience } from './experiences/DiscoveryLabExperience'
import { AssignmentWorkspaceExperience } from './experiences/AssignmentWorkspaceExperience'
import { Lesson2ScenarioExperience } from './engines/Lesson2ScenarioExperience'
import { GaioInteractiveBookApp } from '../gaio/GaioInteractiveBookApp'

import { Class3PlayfulWorld } from './worlds/Class3PlayfulWorld'
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
    config: {},
    sectionIdx: currentSectionIdx,
  }

  const renderWorldComponent = () => {
    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 1: CHAPTER VIDEO BRIEFING
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 0 || cType === 'video') {
      return <ChapterVideoSection {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 8: 3-STAGE MASTERY ASSESSMENT
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 7 || cType === 'quiz') {
      return <ThreeStageMasteryQuiz {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 4: INTERACTIVE STUDENT WORKBOOK / WORKSHEET
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 3 || cType === 'worksheet') {
      return <WorkbookExperience {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 5: INTERACTIVE EDUCATIONAL ACTIVITY & GAME CHALLENGE
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 4 || cType === 'activity') {
      return <GameActivityExperience {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 6: DISCOVERY LAB & PRACTICAL EXPERIMENTATION STUDIO
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 5) {
      return <DiscoveryLabExperience {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 7: CAPSTONE PROJECT & ASSIGNMENT WORKSPACE
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 6 || cType === 'assignment') {
      return <AssignmentWorkspaceExperience {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 3: LESSON 2 (Scenario + Explore + Solve - 4-Screen Pedagogical Flow)
    // ─────────────────────────────────────────────────────────────────────────
    if (currentSectionIdx === 2 || (cType === 'lesson' && canonicalSection.sectionNumber === 3)) {
      return <Lesson2ScenarioExperience {...sharedProps} />
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 2: LESSON 1 (Dedicated World Environments & Discovery Flows)
    // ─────────────────────────────────────────────────────────────────────────
    switch (worldMeta.id) {
      case 'class3-playful':
        return (
          <GaioInteractiveBookApp
            initialMonth={cNum >= 1 && cNum <= 6 ? cNum : 1}
            onComplete={onCompleteSection}
            onExit={() => onJumpToSection(0)}
          />
        )
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
      {/* 100% Focused Interactive Learning Workspace */}
      <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden p-1 sm:p-2.5">
        {renderWorldComponent()}
      </div>
    </div>
  )
}

export default LearningExperienceDispatcher
