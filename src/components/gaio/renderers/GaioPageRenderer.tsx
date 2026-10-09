// ─────────────────────────────────────────────────────────────────────────────
// GAIO PAGE RENDERER DISPATCHER
// Dynamically renders the correct authentic page component based on pageType
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { GaioPageConfig } from '../types'

import { PageCover } from './pages/PageCover'
import { PageIntroWelcome } from './pages/PageIntroWelcome'
import { PageLetsLearn } from './pages/PageLetsLearn'
import { PagePictureStory } from './pages/PagePictureStory'
import { PageLookAroundYou } from './pages/PageLookAroundYou'
import { PageLetsDoIt } from './pages/PageLetsDoIt'
import { PageWorksheetPartA } from './pages/PageWorksheetPartA'
import { PageWorksheetPartB } from './pages/PageWorksheetPartB'
import { PagePuzzleFun } from './pages/PagePuzzleFun'
import { PageTraceColour } from './pages/PageTraceColour'
import { PageQuizTime } from './pages/PageQuizTime'
import { PageTrueOrFalse } from './pages/PageTrueOrFalse'
import { PageUnitReview } from './pages/PageUnitReview'
import { PageWordSearch } from './pages/PageWordSearch'

export interface GaioPageRendererProps {
  pageConfig: GaioPageConfig
  onNextPage: () => void
}

export const GaioPageRenderer: React.FC<GaioPageRendererProps> = ({
  pageConfig,
  onNextPage
}) => {
  switch (pageConfig.pageType) {
    case 'book_cover':
    case 'month_cover':
      return <PageCover pageConfig={pageConfig} onStartReading={onNextPage} />

    case 'intro_welcome':
      return <PageIntroWelcome pageConfig={pageConfig} onContinue={onNextPage} />

    case 'lets_learn':
      return <PageLetsLearn pageConfig={pageConfig} />

    case 'picture_story':
      return <PagePictureStory pageConfig={pageConfig} />

    case 'look_around_you':
      return <PageLookAroundYou pageConfig={pageConfig} />

    case 'lets_do_it':
      return <PageLetsDoIt pageConfig={pageConfig} />

    case 'worksheet_a':
      return <PageWorksheetPartA pageConfig={pageConfig} />

    case 'worksheet_b':
      return <PageWorksheetPartB pageConfig={pageConfig} />

    case 'puzzle_fun':
      return <PagePuzzleFun pageConfig={pageConfig} />

    case 'trace_colour':
      return <PageTraceColour pageConfig={pageConfig} />

    case 'quiz_time':
      return <PageQuizTime pageConfig={pageConfig} />

    case 'true_or_false':
      return <PageTrueOrFalse pageConfig={pageConfig} />

    case 'unit_review':
      return <PageUnitReview pageConfig={pageConfig} />

    case 'word_search':
      return <PageWordSearch pageConfig={pageConfig} />

    default:
      return <PageLetsLearn pageConfig={pageConfig} />
  }
}
