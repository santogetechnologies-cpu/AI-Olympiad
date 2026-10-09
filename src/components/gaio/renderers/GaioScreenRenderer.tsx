// ─────────────────────────────────────────────────────────────────────────────
// GAIO SCREEN RENDERER DISPATCHER
// Dynamically maps every GaioScreenItem to its authentic interactive component
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { GaioScreenItem } from '../types'

import {
  ScreenCover,
  ScreenWelcomeBolt,
  ScreenBookGuide,
  ScreenStudentProfile,
  ScreenStudentFaves,
  ScreenJourneyMap
} from './screens/ScreenIntroComponents'

import {
  ScreenMonthCover,
  ScreenLetsLearnIntro,
  ScreenLetsLearnWords,
  ScreenPictureStoryPart1,
  ScreenPictureStoryPart2,
  ScreenLookAroundGrid,
  ScreenLookAroundBolt,
  ScreenLetsDoItSteps,
  ScreenLetsDoItReflection
} from './screens/ScreenLessonComponents'

import {
  ScreenWorksheetChoice,
  ScreenWorksheetDraw,
  ScreenWorksheetMatching,
  ScreenWorksheetBlanks
} from './screens/ScreenWorksheetComponents'

import {
  ScreenPuzzleOddOne,
  ScreenPuzzleCount,
  ScreenTraceWords,
  ScreenColourCanvas
} from './screens/ScreenPuzzleTraceComponents'

import {
  ScreenQuizPart1,
  ScreenQuizPart2,
  ScreenTrueFalse,
  ScreenHomeConnect,
  ScreenUnitReviewPart1,
  ScreenUnitReviewPart2,
  ScreenWordSearch
} from './screens/ScreenAssessmentComponents'

import {
  ScreenPictureDictionary,
  ScreenOlympiadQuiz,
  ScreenCertificate,
  ScreenAnswerKey
} from './screens/ScreenFinaleComponents'

export interface GaioScreenRendererProps {
  screen: GaioScreenItem
  onNextScreen: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  onAddStars?: (count: number) => void
  studentName?: string
}

export const GaioScreenRenderer: React.FC<GaioScreenRendererProps> = ({
  screen,
  onNextScreen,
  savedAnswer,
  onSaveAnswer,
  onAddStars,
  studentName
}) => {
  const commonProps = {
    screen,
    onNext: onNextScreen,
    savedAnswer,
    onSaveAnswer,
    onAddStars,
    studentName
  }

  switch (screen.interactionType) {
    // 1. Intro Screens (Pages 1 to 4)
    case 'book_cover':
      return <ScreenCover {...commonProps} />
    case 'welcome_bolt':
      return <ScreenWelcomeBolt {...commonProps} />
    case 'book_guide':
      return <ScreenBookGuide {...commonProps} />
    case 'student_profile':
      return <ScreenStudentProfile {...commonProps} />
    case 'student_faves':
      return <ScreenStudentFaves {...commonProps} />
    case 'journey_map':
      return <ScreenJourneyMap {...commonProps} />

    // 2. Month Cover & Lessons
    case 'month_cover':
      return <ScreenMonthCover {...commonProps} />
    case 'lets_learn_intro':
      return <ScreenLetsLearnIntro {...commonProps} />
    case 'lets_learn_words':
      return <ScreenLetsLearnWords {...commonProps} />
    case 'picture_story_part1':
      return <ScreenPictureStoryPart1 {...commonProps} />
    case 'picture_story_part2':
      return <ScreenPictureStoryPart2 {...commonProps} />
    case 'look_around_grid':
      return <ScreenLookAroundGrid {...commonProps} />
    case 'look_around_bolt':
      return <ScreenLookAroundBolt {...commonProps} />
    case 'lets_do_it_steps':
      return <ScreenLetsDoItSteps {...commonProps} />
    case 'lets_do_it_reflection':
      return <ScreenLetsDoItReflection {...commonProps} />

    // 3. Worksheets
    case 'worksheet_choice':
      return <ScreenWorksheetChoice {...commonProps} />
    case 'worksheet_draw':
      return <ScreenWorksheetDraw {...commonProps} />
    case 'worksheet_matching':
      return <ScreenWorksheetMatching {...commonProps} />
    case 'worksheet_blanks':
      return <ScreenWorksheetBlanks {...commonProps} />

    // 4. Puzzles & Creative
    case 'puzzle_odd_one':
      return <ScreenPuzzleOddOne {...commonProps} />
    case 'puzzle_count':
      return <ScreenPuzzleCount {...commonProps} />
    case 'trace_words':
      return <ScreenTraceWords {...commonProps} />
    case 'colour_canvas':
      return <ScreenColourCanvas {...commonProps} />

    // 5. Assessments & Reviews
    case 'quiz_part1':
      return <ScreenQuizPart1 {...commonProps} />
    case 'quiz_part2':
      return <ScreenQuizPart2 {...commonProps} />
    case 'true_false':
      return <ScreenTrueFalse {...commonProps} />
    case 'home_connect':
      return <ScreenHomeConnect {...commonProps} />
    case 'unit_review_part1':
      return <ScreenUnitReviewPart1 {...commonProps} />
    case 'unit_review_part2':
      return <ScreenUnitReviewPart2 {...commonProps} />
    case 'word_search':
      return <ScreenWordSearch {...commonProps} />

    // 6. Finale
    case 'picture_dictionary':
      return <ScreenPictureDictionary {...commonProps} />
    case 'olympiad_quiz':
      return <ScreenOlympiadQuiz {...commonProps} />
    case 'certificate':
      return <ScreenCertificate {...commonProps} />
    case 'answer_key':
      return <ScreenAnswerKey {...commonProps} />

    default:
      return <ScreenLetsLearnIntro {...commonProps} />
  }
}
