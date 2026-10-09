import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { GaioInteractiveBookApp } from '../../components/gaio/GaioInteractiveBookApp'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export const GaioBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-900/5 overflow-hidden">
      <GaioInteractiveBookApp
        studentName={user?.profile?.full_name || 'Super Student'}
        onExit={() => navigate(user ? '/student/learning' : '/')}
        onComplete={() => {
          toast.success('Congratulations! You completed the GAIO Class 3 Interactive Book!')
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

export default GaioBookPage
