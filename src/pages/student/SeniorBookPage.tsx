import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { SeniorInteractiveBookApp } from '../../components/senior/SeniorInteractiveBookApp'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export const SeniorBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-950 overflow-hidden">
      {/* Top Tier Switcher */}
      <div className="shrink-0 bg-slate-950 border-b border-slate-900 px-3 py-1.5 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 text-[11px] hidden sm:inline">Book Experience:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => navigate(user ? '/student/book' : '/book')}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            >
              Class 3 Playful Book
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.4)] cursor-default"
            >
              Senior Level (Classes 9–12) 🚀
            </button>
          </div>
        </div>
      </div>

      <SeniorInteractiveBookApp
        onExit={() => navigate(user ? '/student/learning' : '/')}
        onComplete={() => {
          toast.success('Congratulations! You completed the Senior Level AI Olympiad Interactive Book!')
        }}
      />
    </div>
  )

  if (user) {
    return <AppLayout>{bookApp}</AppLayout>
  }

  return (
    <div className="min-h-screen h-screen flex flex-col w-full bg-slate-950 overflow-hidden">
      {bookApp}
    </div>
  )
}

export default SeniorBookPage
