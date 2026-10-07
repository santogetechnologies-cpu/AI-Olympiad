import React from 'react'
import type { ExperienceType } from '../../services/experienceResolverService'
import type { ExperienceComponentProps } from './experiences/ExplorationExperience'

// 16 Genuinely Distinct Learning Experiences
import { ExplorationExperience } from './experiences/ExplorationExperience'
import { StoryExperience } from './experiences/StoryExperience'
import { MysteryExperience } from './experiences/MysteryExperience'
import { SimulationExperience } from './experiences/SimulationExperience'
import { PuzzleExperience } from './experiences/PuzzleExperience'
import { DiscoveryExperience } from './experiences/DiscoveryExperience'
import { WorkshopExperience } from './experiences/WorkshopExperience'
import { CreationExperience } from './experiences/CreationExperience'
import { InvestigationExperience } from './experiences/InvestigationExperience'
import { MissionExperience } from './experiences/MissionExperience'
import { InteractiveMapExperience } from './experiences/InteractiveMapExperience'
import { ChallengeExperience } from './experiences/ChallengeExperience'
import { WorkbookExperience } from './experiences/WorkbookExperience'
import { PracticalExperience } from './experiences/PracticalExperience'
import { AssignmentExperience } from './experiences/AssignmentExperience'
import { QuizExperience } from './experiences/QuizExperience'

/**
 * Modular Learning Experience Registry
 * Maps each ExperienceType to its independent React component,
 * each with its own DOM structure, layout, interaction state,
 * animations, content presentation, and activity logic.
 */
export const learningExperienceRegistry: Record<
  ExperienceType,
  React.ComponentType<ExperienceComponentProps>
> = {
  exploration: ExplorationExperience,
  story: StoryExperience,
  mystery: MysteryExperience,
  simulation: SimulationExperience,
  puzzle: PuzzleExperience,
  discovery: DiscoveryExperience,
  workshop: WorkshopExperience,
  creation: CreationExperience,
  investigation: InvestigationExperience,
  mission: MissionExperience,
  interactiveMap: InteractiveMapExperience,
  challenge: ChallengeExperience,
  workbook: WorkbookExperience,
  practical: PracticalExperience,
  assignment: AssignmentExperience,
  quiz: QuizExperience,
}
