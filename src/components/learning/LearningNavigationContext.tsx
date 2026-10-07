import React, { createContext, useContext } from 'react'

export interface LearningNavigationContextType {
  onClose?: () => void
  onReturnToSections?: () => void
  currentSectionIdx?: number
}

export const LearningNavigationContext = createContext<LearningNavigationContextType>({})

export const useLearningNavigation = () => useContext(LearningNavigationContext)
