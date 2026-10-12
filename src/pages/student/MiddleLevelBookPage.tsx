import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { MiddleLevelApp } from '../../components/middle-level/MiddleLevelApp'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export const MiddleLevelBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-950 overflow-hidden relative">
      {/* Floating Level Switcher */}
      <div className="absolute top-2 right-14 sm:right-28 z-40 hidden sm:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-0.5 rounded-full shadow-lg">
        <button
          onClick={() => navigate('/book')}
          className="px-2.5 py-0.5 text-[10px] font-semibold text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
        >
          Primary (Class 3)
        </button>
        <button
          className="px-2.5 py-0.5 text-[10px] font-bold bg-sky-500 text-white rounded-full shadow-xs cursor-default"
        >
          Middle (Classes 6–8)
        </button>
      </div>

      <MiddleLevelApp
        onExit={() => navigate(user ? '/student/learning' : '/')}
        onComplete={() => {
          toast.success('🏆 Congratulations! You have certified all Middle Level AI Olympiad missions!')
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

export default MiddleLevelBookPage
