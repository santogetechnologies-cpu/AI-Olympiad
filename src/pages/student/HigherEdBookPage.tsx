import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { HigherEdInteractiveApp } from '../../components/higher-ed/HigherEdInteractiveApp'
import type { HigherEdLevelKey } from '../../components/higher-ed/types'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export const HigherEdBookPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()

  // Support URL query parameters ?level=ug1&chapter=1&lesson=1
  const levelParam = (searchParams.get('level') || 'ug1').toLowerCase() as HigherEdLevelKey
  const chapterParam = parseInt(searchParams.get('chapter') || '1', 10)
  const lessonParam = (parseInt(searchParams.get('lesson') || '1', 10) === 2 ? 2 : 1) as 1 | 2

  const app = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-950 overflow-hidden">
      <HigherEdInteractiveApp
        initialLevel={levelParam}
        initialChapter={chapterParam >= 1 && chapterParam <= 6 ? chapterParam : 1}
        initialLesson={lessonParam}
        studentName={user?.profile?.full_name || 'Higher Ed Scholar'}
        onExit={() => navigate(user ? '/student/learning' : '/')}
        onComplete={() => {
          toast.success('Congratulations! You completed the Higher Education AI Olympiad Mission!')
        }}
      />
    </div>
  )

  if (user) {
    return <AppLayout>{app}</AppLayout>
  }

  return (
    <div className="min-h-screen h-screen flex flex-col w-full bg-slate-950 overflow-hidden">
      {app}
    </div>
  )
}

export default HigherEdBookPage
