import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { GaioInteractiveBookApp } from '../../components/gaio/GaioInteractiveBookApp'
import { useAuth } from '../../contexts/AuthContext'
import { enrollmentService, parseGradeKeyFromClass } from '../../services/progressService'
import toast from 'react-hot-toast'

export const GaioBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [gradeKey, setGradeKey] = useState<'class3' | 'class4' | 'class5'>(() => {
    if (user?.id) {
      try {
        const stored = localStorage.getItem(`nanjil_active_class_${user.id}`)
        if (stored) return parseGradeKeyFromClass(JSON.parse(stored))
        const enrStored = localStorage.getItem(`nanjil_enrollment_${user.id}`)
        if (enrStored) {
          const parsed = JSON.parse(enrStored)
          const enr = Array.isArray(parsed) ? parsed[0] : parsed
          if (enr) return parseGradeKeyFromClass(enr.class || enr.class_id)
        }
      } catch {}
    }
    return 'class3'
  })

  useEffect(() => {
    if (user?.id) {
      enrollmentService.getStudentAssignedGrade(user.id, user.organization_id).then(res => {
        setGradeKey(res.gradeKey)
      }).catch(() => {})
    }
  }, [user?.id, user?.organization_id])

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-900/5 overflow-hidden">
      <GaioInteractiveBookApp
        gradeKey={gradeKey}
        studentName={user?.profile?.full_name || 'Super Student'}
        onExit={() => navigate(user ? '/student/learning' : '/')}
        onComplete={() => {
          toast.success(`Congratulations! You completed the GAIO ${gradeKey.toUpperCase()} Coursebook!`)
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
