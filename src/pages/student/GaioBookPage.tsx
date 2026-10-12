import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { GaioInteractiveBookApp } from '../../components/gaio/GaioInteractiveBookApp'
import { useAuth } from '../../contexts/AuthContext'
import { enrollmentService, parseGradeKeyFromClass, type GradeKey } from '../../services/progressService'
import toast from 'react-hot-toast'

export const GaioBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [gradeKey, setGradeKey] = useState<GradeKey>(() => {
    if (user?.id) {
      try {
        const stored = localStorage.getItem(`nanjil_active_class_${user.id}`)
        const parsed = stored ? parseGradeKeyFromClass(JSON.parse(stored)) : null
        if (parsed) return parsed
        const enrStored = localStorage.getItem(`nanjil_enrollment_${user.id}`)
        if (enrStored) {
          const e = JSON.parse(enrStored)
          const enr = Array.isArray(e) ? e[0] : e
          if (enr) {
            return parseGradeKeyFromClass(enr.class || enr.class_id)
          }
        }
      } catch {}
    }
    return 'class3'
  })

  useEffect(() => {
    if (user?.id) {
      enrollmentService.getStudentAssignedGrade(user.id, user.organization_id).then(res => {
        if (res.gradeKey) setGradeKey(res.gradeKey)
      }).catch(() => {})
    }
  }, [user?.id, user?.organization_id])

  const bookApp = (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-slate-900/5 overflow-hidden relative">
      {/* Floating Level Switcher */}
      <div className="absolute top-2 right-14 sm:right-28 z-40 hidden sm:flex items-center gap-1 bg-white/95 border border-sky-200 p-0.5 rounded-full shadow-lg">
        <button
          className="px-2.5 py-0.5 text-[10px] font-bold bg-[#0288D1] text-white rounded-full shadow-xs cursor-default"
        >
          Primary (Class 3)
        </button>
        <button
          onClick={() => navigate('/middle')}
          className="px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 hover:text-[#0288D1] rounded-full transition-colors cursor-pointer"
        >
          Middle (Classes 6–8)
        </button>
      </div>

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
