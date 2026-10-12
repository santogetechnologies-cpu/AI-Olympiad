import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { MiddleLevelApp } from '../../components/middle-level/MiddleLevelApp'
import { useAuth } from '../../contexts/AuthContext'
import { enrollmentService, parseGradeKeyFromClass } from '../../services/progressService'
import toast from 'react-hot-toast'
import type { MiddleClassKey } from '../../components/middle-level/types'

export const MiddleLevelBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [middleClass, setMiddleClass] = useState<MiddleClassKey>(() => {
    // Initialize from local cache
    if (user?.id) {
      try {
        const stored = localStorage.getItem(`nanjil_active_class_${user.id}`)
        if (stored) {
          const gk = parseGradeKeyFromClass(JSON.parse(stored))
          if (gk === 'class7' || gk === 'class8') return gk
        }
      } catch {}
    }
    return 'class6'
  })

  useEffect(() => {
    if (user?.id) {
      enrollmentService.getStudentAssignedGrade(user.id, user.organization_id).then(res => {
        const gk = res.gradeKey
        if (gk === 'class6' || gk === 'class7' || gk === 'class8') {
          setMiddleClass(gk)
        }
      }).catch(() => {})
    }
  }, [user?.id, user?.organization_id])

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-950 overflow-hidden relative">
      <MiddleLevelApp
        initialClass={middleClass}
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
