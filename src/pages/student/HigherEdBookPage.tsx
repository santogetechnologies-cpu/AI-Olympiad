import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { GaioHigherEdLearningExperience } from '../../components/higher-ed/GaioHigherEdLearningExperience'
import { HigherEdInteractiveApp } from '../../components/higher-ed/HigherEdInteractiveApp'
import type { HigherEdLevelKey } from '../../components/higher-ed/types'
import { useAuth } from '../../contexts/AuthContext'
import { Sparkles, Terminal } from 'lucide-react'
import toast from 'react-hot-toast'

export const HigherEdBookPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()

  // Support URL query parameters ?level=ug1&chapter=1
  const levelParam = (searchParams.get('level') || 'ug1').toLowerCase() as HigherEdLevelKey
  const chapterParam = parseInt(searchParams.get('chapter') || '1', 10)

  // Experience Mode: Default to 'gaio' (Simple, Visual, Animated with Male Voice)
  const [experienceMode, setExperienceMode] = useState<'gaio' | 'terminal'>('gaio')

  const app = (
    <div className="w-full min-h-full flex flex-col bg-slate-950">
      {/* Top Experience Switcher Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExperienceMode('gaio')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              experienceMode === 'gaio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Gaio AI Guide (Visual & Simple)</span>
          </button>

          <button
            onClick={() => setExperienceMode('terminal')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              experienceMode === 'terminal'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal size={14} className="text-indigo-400" />
            <span>Terminal Code Lab</span>
          </button>
        </div>

        <span className="text-slate-500 hidden sm:inline text-[11px]">
          {experienceMode === 'gaio' ? 'Interactive animations • Male voice' : 'PyTorch Code Sandbox'}
        </span>
      </div>

      {/* Render selected experience */}
      {experienceMode === 'gaio' ? (
        <GaioHigherEdLearningExperience
          initialLevel={levelParam}
          initialChapter={chapterParam >= 1 && chapterParam <= 6 ? chapterParam : 1}
          onExit={() => navigate(user ? '/student/learning' : '/')}
        />
      ) : (
        <div className="flex-1 flex flex-col w-full h-[calc(100vh-100px)] min-h-[600px] overflow-hidden">
          <HigherEdInteractiveApp
            initialLevel={levelParam}
            initialChapter={chapterParam >= 1 && chapterParam <= 6 ? chapterParam : 1}
            initialLesson={1}
            studentName={user?.profile?.full_name || 'Higher Ed Scholar'}
            onExit={() => setExperienceMode('gaio')}
            onComplete={() => {
              toast.success('Congratulations! You completed the Higher Education AI Olympiad Mission!')
            }}
          />
        </div>
      )}
    </div>
  )

  if (user) {
    return <AppLayout>{app}</AppLayout>
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col">
      {app}
    </div>
  )
}

export default HigherEdBookPage
