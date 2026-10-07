import React from 'react'
import type { CanonicalSection } from '../../pages/student/ChapterLearningPage'
import { MasteryAssessmentEngine } from '../quiz/MasteryAssessmentEngine'
import { useAuth } from '../../contexts/AuthContext'
import { useLearningNavigation } from './LearningNavigationContext'

export interface ThreeStageMasteryQuizProps {
  gradeKey: string
  chapterNum: number | string
  chapterTitle: string
  topicTitle?: string
  canonicalSection: CanonicalSection
  isCompleted?: boolean
  onComplete: () => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
}

export const ThreeStageMasteryQuiz: React.FC<ThreeStageMasteryQuizProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onContinueNextChapter,
  isFinalChapter,
}) => {
  const { user } = useAuth()
  const nav = useLearningNavigation()

  const resolvedChapterId = canonicalSection.id.includes('-sec-')
    ? canonicalSection.id.split('-sec-')[0]
    : canonicalSection.id

  return (
    <MasteryAssessmentEngine
      academicLevel={gradeKey.toUpperCase()}
      gradeKey={gradeKey}
      chapterId={resolvedChapterId}
      chapterNumber={chapterNum}
      chapterTitle={chapterTitle}
      lessonId={canonicalSection.id}
      lessonTitle={canonicalSection.title || `${chapterTitle} — Mastery Assessment`}
      subjectName={topicTitle || chapterTitle}
      studentId={user?.id || 'guest-student'}
      orgId={user?.organization_id || ''}
      isCompleted={isCompleted}
      onComplete={(_score, _accuracy, passed) => {
        if (passed) {
          onComplete()
        }
      }}
      onClose={nav.onClose}
      onContinueNextChapter={onContinueNextChapter}
      isFinalChapter={isFinalChapter}
    />
  )
}

export default ThreeStageMasteryQuiz
