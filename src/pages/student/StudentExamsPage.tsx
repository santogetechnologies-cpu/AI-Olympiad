import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { useAuth } from '../../contexts/AuthContext'
import {
  GraduationCap,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Lock,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react'

export const StudentExamsPage: React.FC = () => {
  const { user } = useAuth()
  const studentName = user?.profile?.full_name || 'Student'
  const studentGrade = (user?.profile as any)?.class_grade || 'AI Olympiad Candidate'

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/90 shadow-2xs">
                <GraduationCap size={13} className="text-amber-600" />
                Examination Hall
              </span>
              <span className="text-xs text-slate-400 font-medium">• {studentGrade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Olympiad Examinations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Official testing platform, Olympiad qualification assessments, and practice mock tests.
            </p>
          </div>

          <Link
            to="/student/help"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-colors shadow-2xs w-fit"
          >
            <HelpCircle size={15} />
            <span>Ask Admin about Schedule</span>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Upcoming & Active Exams
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Past Attempts & Scores
          </button>
        </div>

        {/* Empty State Banner (As requested: "keep it empty as we haven't published exams") */}
        {activeTab === 'upcoming' ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-50 to-blue-50 border border-slate-200/80 flex items-center justify-center mb-5 shadow-inner">
              <div className="relative">
                <GraduationCap size={38} className="text-blue-600" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xs">
                  <Lock size={10} />
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-3 border border-slate-200">
              <Clock size={12} className="text-slate-500" />
              Examination Window Not Yet Opened
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              No Published Exams Right Now
            </h2>

            <p className="max-w-xl mx-auto text-sm text-slate-600 leading-relaxed mb-6">
              The Examination Board has not published live test papers for your cohort yet.
              When Olympiad mock tests, monthly assessments, or finals are scheduled, they will appear here with instructions and timer countdowns.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/student/learning"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
              >
                <BookOpen size={14} />
                <span>Continue Curriculum Chapters</span>
              </Link>
              <Link
                to="/student/help"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                <span>Contact Exam Administrator</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <FileCheck2 size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Past Exam Records</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Once you sit for your scheduled exams, your detailed scorecards, answer breakdowns, and Olympiad percentile ranks will be recorded here.
            </p>
          </div>
        )}

        {/* Feature Grid: What to Expect in Exams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">AI-Proctored System</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated timers, secure tab-monitoring, and live autosaving to protect your progress throughout the exam duration.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Sparkles size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">XP & Score Multipliers</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Earn massive XP boosters and ranking points for accurate answers and swift question completion.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Olympiad Certification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Qualify for official Global AI Olympiad merits, digital badges, and advancement to international championship rounds.
            </p>
          </div>
        </div>

        {/* Guidelines Banner */}
        <div className="rounded-2xl bg-blue-50/70 border border-blue-200/80 p-4 sm:p-5 flex items-start gap-3.5">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 space-y-1">
            <p className="font-bold text-blue-950">Examination Preparation Tip</p>
            <p className="text-blue-800 leading-relaxed">
              Review all chapter concepts, practice worksheets, and quizzes in the <strong>Learn</strong> section before your exams. Exam announcements and schedules are released at least 7 days before commencement.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default StudentExamsPage
