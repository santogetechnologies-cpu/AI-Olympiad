import type { CanonicalSection } from '../../../pages/student/ChapterLearningPage'

export interface WorldExperienceProps {
  gradeKey: string
  chapterNum: number | string
  chapterTitle: string
  topicTitle: string
  canonicalSection: CanonicalSection
  isCompleted: boolean
  onComplete: () => void
  onJumpToSection?: (idx: number) => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
  tier?: string
}

export type LearningWorldId =
  | 'class3-playful'
  | 'class4-story'
  | 'class5-puzzle'
  | 'class6-mission'
  | 'class7-mystery'
  | 'class8-experiment'
  | 'class9-challenge'
  | 'class10-simulation'
  | 'class11-project'
  | 'class12-ailab'
  | 'ug-professional'
  | 'pg-research'

export interface LearningWorldMeta {
  id: LearningWorldId
  title: string
  subtitle: string
  badge: string
  themeColor: string
  ageGroup: string
  mascotName?: string
  mascotAvatar?: string
}
