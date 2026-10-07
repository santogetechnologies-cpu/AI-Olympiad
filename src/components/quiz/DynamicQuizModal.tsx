import React from 'react'
import { MasteryAssessmentEngine } from './MasteryAssessmentEngine'
import type { GeneratedQuiz } from '../../services/lessonQuizService'

interface DynamicQuizModalProps {
  open: boolean
  onClose: () => void
  quizData: GeneratedQuiz | null
  studentId: string
  orgId: string
  contentId?: string
  onQuizCompleted?: (score: number, passed: boolean) => void
}

export function DynamicQuizModal({
  open,
  onClose,
  quizData,
  studentId,
  orgId,
  contentId,
  onQuizCompleted,
}: DynamicQuizModalProps) {
  if (!open || !quizData) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-2xl h-[95dvh] max-h-[820px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <MasteryAssessmentEngine
          academicLevel={quizData.academicLevel || 'Standard'}
          subjectName={quizData.subjectName || ''}
          chapterId={contentId || quizData.quizId || 'quiz-chapter'}
          chapterTitle={quizData.chapterTitle || ''}
          lessonId={contentId || quizData.quizId || ''}
          lessonTitle={quizData.lessonTitle || quizData.title}
          studentId={studentId}
          orgId={orgId}
          onClose={onClose}
          onComplete={(score, _accuracy, passed) => {
            if (onQuizCompleted) {
              onQuizCompleted(score, passed)
            }
          }}
          standaloneModal={true}
        />
      </div>
    </div>
  )
}
