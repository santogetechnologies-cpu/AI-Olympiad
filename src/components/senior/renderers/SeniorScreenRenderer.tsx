// ─────────────────────────────────────────────────────────────────────────────
// SENIOR SCREEN RENDERER DISPATCHER
// Dynamically maps SeniorScreenItem stage types to their authentic interactive screen components.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { SeniorScreenItem } from '../types'
import { ScreenMissionBriefing } from './ScreenMissionBriefing'
import { ScreenDeepTheory } from './ScreenDeepTheory'
import { ScreenGuidedWalkthrough } from './ScreenGuidedWalkthrough'
import { ScreenInteractiveSimulation } from './ScreenInteractiveSimulation'
import { ScreenPythonCodeLab } from './ScreenPythonCodeLab'
import { ScreenOlympiadArena } from './ScreenOlympiadArena'
import { ScreenResponsibleDebrief } from './ScreenResponsibleDebrief'

export interface SeniorScreenRendererProps {
  screen: SeniorScreenItem
  onNextScreen: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  onAddXP?: (amount: number) => void
  onAddStars?: (count: number) => void
  onOpenConcept?: (term: string) => void
}

export const SeniorScreenRenderer: React.FC<SeniorScreenRendererProps> = ({
  screen,
  onNextScreen,
  savedAnswer,
  onSaveAnswer,
  onAddXP,
  onAddStars,
  onOpenConcept
}) => {
  switch (screen.stageType) {
    case 'mission_briefing':
      return (
        <ScreenMissionBriefing
          screen={screen}
          onNext={onNextScreen}
          onOpenConcept={onOpenConcept}
        />
      )

    case 'deep_theory':
      return (
        <ScreenDeepTheory
          screen={screen}
          onNext={onNextScreen}
          onOpenConcept={onOpenConcept}
        />
      )

    case 'guided_walkthrough':
      return <ScreenGuidedWalkthrough screen={screen} onNext={onNextScreen} />

    case 'interactive_simulation':
      return (
        <ScreenInteractiveSimulation
          screen={screen}
          onNext={onNextScreen}
          onAddXP={onAddXP}
        />
      )

    case 'python_code_lab':
      return (
        <ScreenPythonCodeLab
          screen={screen}
          onNext={onNextScreen}
          onAddXP={onAddXP}
        />
      )

    case 'olympiad_arena':
      return (
        <ScreenOlympiadArena
          screen={screen}
          onNext={onNextScreen}
          savedAnswers={savedAnswer}
          onSaveAnswers={onSaveAnswer}
          onAddXP={onAddXP}
        />
      )

    case 'responsible_ai_debrief':
      return (
        <ScreenResponsibleDebrief
          screen={screen}
          onNext={onNextScreen}
          onAddXP={onAddXP}
          onAddStars={onAddStars}
        />
      )

    default:
      return <ScreenMissionBriefing screen={screen} onNext={onNextScreen} />
  }
}
