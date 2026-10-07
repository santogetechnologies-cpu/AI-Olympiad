import React from 'react'
import type { CanonicalSection } from '../../pages/student/ChapterLearningPage'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

// Class 3 Specialized Experiences
import { Class3PlayfulGameExperience } from './Class3PlayfulGameExperience'
import {
  Class3WorkbookView,
  Class3FlashcardsView,
  Class3PracticalLabView,
  Class3AssignmentView,
  Class3MasteryQuizView,
} from './Class3SectionSpecializers'

// Class 4–5 Specialized Experiences
import { Class4PixelQuestExperience } from './Class4PixelQuestExperience'
import { Class4To5StoryDetectiveExperience } from './Class4To5StoryDetectiveExperience'
import { Class5CyberDetectiveExperience } from './Class5CyberDetectiveExperience'
import {
  Class4To5WorkbookView,
  Class4To5FlashcardsView,
  Class4To5PracticalLabView,
  Class4To5AssignmentView,
  Class4To5MasteryQuizView,
} from './Class4To5SectionSpecializers'

// Class 6–8 Specialized Experiences
import { Class6AlgorithmArenaExperience } from './Class6AlgorithmArenaExperience'
import { Class7PythonOdysseyExperience } from './Class7PythonOdysseyExperience'
import { Class8NeuralForgeExperience } from './Class8NeuralForgeExperience'
import {
  Class6To8WorkbookView,
  Class6To8FlashcardsView,
  Class6To8PracticalLabView,
  Class6To8AssignmentView,
  Class6To8MasteryQuizView,
} from './Class6To8SectionSpecializers'

// Class 9–10 Specialized Experiences
import { Class9DataSciencePlanetExperience } from './Class9DataSciencePlanetExperience'
import { Class10SmartCityArchitectExperience } from './Class10SmartCityArchitectExperience'
import {
  Class9To10WorkbookView,
  Class9To10FlashcardsView,
  Class9To10PracticalLabView,
  Class9To10AssignmentView,
  Class9To10MasteryQuizView,
} from './Class9To10SectionSpecializers'

// Class 11–12 Specialized Experiences
import { Class11DeepNeuralForgeExperience } from './Class11DeepNeuralForgeExperience'
import { Class12TransformerNexusExperience } from './Class12TransformerNexusExperience'
import {
  Class11To12WorkbookView,
  Class11To12FlashcardsView,
  Class11To12PracticalLabView,
  Class11To12AssignmentView,
  Class11To12MasteryQuizView,
} from './Class11To12SectionSpecializers'

// UG & PG Specialized Experiences
import { UGSystemsEngineeringExperience } from './UGSystemsEngineeringExperience'
import { PGResearchOptimizationExperience } from './PGResearchOptimizationExperience'
import {
  HigherWorkbookView,
  HigherFlashcardsView,
  HigherPracticalLabView,
  HigherAssignmentView,
  HigherMasteryQuizView,
} from './HigherSectionSpecializers'

// Topic-Specific Playable Game Engines
import {
  RobotCommandInstructionGame,
  PatternRecognitionDiscoveryGame,
  DeepfakeInvestigationGame,
  SmartCarRouteMissionGame,
  DataFirewallPrivacyGame,
} from './TopicSpecificGameEngines'

// Full-Page Environmental Explorers
import { FullPageSceneExploration } from './fullpage/FullPageSceneExploration'
import { FullPageStoryAdventure } from './fullpage/FullPageStoryAdventure'
import { FullPagePuzzleRoom } from './fullpage/FullPagePuzzleRoom'
import { FullPageLiveSimulation } from './fullpage/FullPageLiveSimulation'
import { FullPageDiscoveryMap } from './fullpage/FullPageDiscoveryMap'

export interface DynamicCurriculumExperienceProps {
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
}

export const DynamicCurriculumExperienceDispatcher: React.FC<DynamicCurriculumExperienceProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  currentSectionIdx,
  canonicalSection,
  completedSectionIds,
  onCompleteSection,
  onJumpToSection,
  onContinueNextChapter: _onContinueNextChapter,
  isFinalChapter: _isFinalChapter,
}) => {
  const cNum = parseInt(String(chapterNum || '1'), 10)
  const isDone = completedSectionIds.includes(canonicalSection.id)
  const activeTitle = (topicTitle || canonicalSection.topicTitle || canonicalSection.title || '').toLowerCase()
  const profile = getCurriculumTopicProfile(topicTitle || canonicalSection.topicTitle || canonicalSection.title)

  // ─────────────────────────────────────────────────────────────────────────
  // 1. CLASS 3: VERY VISUAL, PLAYFUL, PUPPY MASCOT & TOUCH EXPLORATION
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class3') {
    // CHAPTER 2: Give Me a Command! (Instruction & Sequence Grid Runner)
    if (cNum === 2) {
      if (currentSectionIdx === 0) {
        return (
          <FullPageStoryAdventure
            gradeKey="class3"
            chapterNum={2}
            chapterTitle={chapterTitle}
            topicTitle="Give Me a Command!"
            profile={profile}
            isCompleted={isDone}
            onComplete={onCompleteSection}
            onJumpToSection={onJumpToSection}
          />
        )
      }
      if (currentSectionIdx === 1) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <RobotCommandInstructionGame
              topicTitle="Give Me a Command!"
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      if (currentSectionIdx === 2) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <Class3PlayfulGameExperience
              chapterNum={2}
              chapterTitle={chapterTitle}
              topicTitle="Put It in Order!"
              lessonNumber={2}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      if (currentSectionIdx === 3) {
        return (
          <div className="p-4 sm:p-8 max-w-3xl mx-auto">
            <Class3WorkbookView
              section={canonicalSection}
              chapterNum={2}
              isCompleted={isDone}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      if (currentSectionIdx === 4) {
        return (
          <div className="p-4 sm:p-8 max-w-3xl mx-auto">
            <Class3FlashcardsView
              section={canonicalSection}
              chapterNum={2}
              isCompleted={isDone}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      if (currentSectionIdx === 5) {
        return (
          <div className="p-4 sm:p-8 max-w-3xl mx-auto">
            <Class3PracticalLabView
              section={canonicalSection}
              chapterNum={2}
              isCompleted={isDone}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      if (currentSectionIdx === 6) {
        return (
          <div className="p-4 sm:p-8 max-w-3xl mx-auto">
            <Class3AssignmentView
              section={canonicalSection}
              chapterNum={2}
              isCompleted={isDone}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class3MasteryQuizView
            section={canonicalSection}
            chapterTitle={chapterTitle}
            chapterNum={2}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }

    // ALL OTHER CLASS 3 CHAPTERS: Playful Pet, Dress Up, School Scanner, Wonder Lab, Safety Castle
    if (currentSectionIdx === 0) {
      return (
        <FullPageSceneExploration
          gradeKey="class3"
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          videoUrl={canonicalSection.videoUrl}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class3PlayfulGameExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class3PlayfulGameExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'AI Fun Activity'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class3WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class3FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class3PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class3AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class3MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CLASS 4: PIXEL QUEST, CLEAR PROMPT CRAFTING, SMARTPHONE SIMULATOR
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class4') {
    if (currentSectionIdx === 0) {
      return (
        <FullPageStoryAdventure
          gradeKey="class4"
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class4PixelQuestExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class4To5StoryDetectiveExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Story Mission'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class4"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class4"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class4"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class4"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class4To5MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey="class4"
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. CLASS 5: CYBER DETECTIVE AGENCY, LOGIC ESCAPE, HOSPITAL TRIAGE
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class5') {
    if (currentSectionIdx === 0) {
      return (
        <FullPagePuzzleRoom
          gradeKey="class5"
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class5CyberDetectiveExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class5CyberDetectiveExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Decision Tree Matrix'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class5"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class5"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class5"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class4To5AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class5"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class4To5MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey="class5"
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. CLASS 6: DATASET CLASSIFIER, FLOWCHART STUDIO, SMART HIGHWAY, PRIVACY
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class6') {
    if (currentSectionIdx === 0) {
      return (
        <FullPageDiscoveryMap
          gradeKey="class6"
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      // Topic Specific Game for Learning from Examples
      if (activeTitle.includes('example') || activeTitle.includes('pattern') || cNum === 1) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <PatternRecognitionDiscoveryGame
              topicTitle="Learning from Examples"
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class6AlgorithmArenaExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      // Smart Car Route Mission for AI on the Road
      if (activeTitle.includes('road') || activeTitle.includes('car') || cNum === 3) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <SmartCarRouteMissionGame
              topicTitle="AI on the Road"
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      // Privacy game for Protect Your Data
      if (activeTitle.includes('protect') || activeTitle.includes('data') || cNum === 6) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <DataFirewallPrivacyGame
              topicTitle="Protect Your Data"
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class6AlgorithmArenaExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Algorithm Decision Flow'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class6"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class6"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class6"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey="class6"
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class6To8MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey="class6"
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. CLASS 7 & 8: PYTHON CODING, NEURAL FORGE & DEEPFAKE FORENSICS
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class7' || gradeKey === 'class8') {
    if (currentSectionIdx === 0) {
      return (
        <FullPageLiveSimulation
          gradeKey={gradeKey}
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      if (gradeKey === 'class7') {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <Class7PythonOdysseyExperience
              chapterNum={cNum}
              chapterTitle={chapterTitle}
              topicTitle={profile.title}
              lessonNumber={1}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class8NeuralForgeExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      if (activeTitle.includes('deepfake') || activeTitle.includes('fake') || (gradeKey === 'class8' && cNum === 6)) {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <DeepfakeInvestigationGame
              topicTitle="Deepfake Alert!"
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class8NeuralForgeExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Decision Logic & Tuning'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class6To8AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class6To8MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey={gradeKey}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. CLASS 9 & 10: DATA SCIENCE PLANET & SMART CITY ARCHITECT
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class9' || gradeKey === 'class10') {
    if (currentSectionIdx === 0) {
      return (
        <FullPageDiscoveryMap
          gradeKey={gradeKey}
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      if (gradeKey === 'class9') {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <Class9DataSciencePlanetExperience
              chapterNum={cNum}
              chapterTitle={chapterTitle}
              topicTitle={profile.title}
              lessonNumber={1}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class10SmartCityArchitectExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class10SmartCityArchitectExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Applied System Infrastructure'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class9To10WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class9To10FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class9To10PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class9To10AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class9To10MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey={gradeKey}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CLASS 11 & 12: DEEP NEURAL FORGE & TRANSFORMER NEXUS
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey === 'class11' || gradeKey === 'class12') {
    if (currentSectionIdx === 0) {
      return (
        <FullPageLiveSimulation
          gradeKey={gradeKey}
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1) {
      if (gradeKey === 'class11') {
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <Class11DeepNeuralForgeExperience
              chapterNum={cNum}
              chapterTitle={chapterTitle}
              topicTitle={profile.title}
              lessonNumber={1}
              onComplete={onCompleteSection}
            />
          </div>
        )
      }
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class12TransformerNexusExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={profile.title}
            lessonNumber={1}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <Class12TransformerNexusExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || 'Attention Matrix Architecture'}
            lessonNumber={2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class11To12WorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class11To12FlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class11To12PracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <Class11To12AssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <Class11To12MasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey={gradeKey}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. UG & PG: SYSTEMS ENGINEERING & RESEARCH OPTIMIZATION
  // ─────────────────────────────────────────────────────────────────────────
  if (gradeKey.startsWith('ug')) {
    if (currentSectionIdx === 0) {
      return (
        <FullPageDiscoveryMap
          gradeKey={gradeKey}
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={profile.title}
          profile={profile}
          isCompleted={isDone}
          onComplete={onCompleteSection}
          onJumpToSection={onJumpToSection}
        />
      )
    }
    if (currentSectionIdx === 1 || currentSectionIdx === 2) {
      return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <UGSystemsEngineeringExperience
            chapterNum={cNum}
            chapterTitle={chapterTitle}
            topicTitle={canonicalSection.topicTitle || profile.title}
            lessonNumber={(currentSectionIdx === 1 ? 1 : 2) as 1 | 2}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 3) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <HigherWorkbookView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 4) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <HigherFlashcardsView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 5) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <HigherPracticalLabView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    if (currentSectionIdx === 6) {
      return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
          <HigherAssignmentView
            section={canonicalSection}
            chapterNum={cNum}
            gradeKey={gradeKey}
            topicTitle={profile.title}
            isCompleted={isDone}
            onComplete={onCompleteSection}
          />
        </div>
      )
    }
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <HigherMasteryQuizView
          section={canonicalSection}
          chapterTitle={chapterTitle}
          chapterNum={cNum}
          gradeKey={gradeKey}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }

  // PG Final Frontier
  if (currentSectionIdx === 0) {
    return (
      <FullPageLiveSimulation
        gradeKey={gradeKey}
        chapterNum={cNum}
        chapterTitle={chapterTitle}
        topicTitle={profile.title}
        profile={profile}
        isCompleted={isDone}
        onComplete={onCompleteSection}
        onJumpToSection={onJumpToSection}
      />
    )
  }
  if (currentSectionIdx === 1 || currentSectionIdx === 2) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <PGResearchOptimizationExperience
          chapterNum={cNum}
          chapterTitle={chapterTitle}
          topicTitle={canonicalSection.topicTitle || profile.title}
          lessonNumber={(currentSectionIdx === 1 ? 1 : 2) as 1 | 2}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }
  if (currentSectionIdx === 3) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <HigherWorkbookView
          section={canonicalSection}
          chapterNum={cNum}
          gradeKey={gradeKey}
          topicTitle={profile.title}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }
  if (currentSectionIdx === 4) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <HigherFlashcardsView
          section={canonicalSection}
          chapterNum={cNum}
          gradeKey={gradeKey}
          topicTitle={profile.title}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }
  if (currentSectionIdx === 5) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <HigherPracticalLabView
          section={canonicalSection}
          chapterNum={cNum}
          gradeKey={gradeKey}
          topicTitle={profile.title}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }
  if (currentSectionIdx === 6) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <HigherAssignmentView
          section={canonicalSection}
          chapterNum={cNum}
          gradeKey={gradeKey}
          topicTitle={profile.title}
          isCompleted={isDone}
          onComplete={onCompleteSection}
        />
      </div>
    )
  }
  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <HigherMasteryQuizView
        section={canonicalSection}
        chapterTitle={chapterTitle}
        chapterNum={cNum}
        gradeKey={gradeKey}
        isCompleted={isDone}
        onComplete={onCompleteSection}
      />
    </div>
  )
}
