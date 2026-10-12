// ─────────────────────────────────────────────────────────────────────────────
// SENIOR LEVEL INTERACTIVE BOOK — TABLE OF CONTENTS & TOPIC NAVIGATOR
// Fast drawer modal to jump across Classes 9-12, 24 Chapters, and 48 Lessons.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import { X, Search, CheckCircle2, ChevronRight, BookOpen, Layers, Award, Sparkles, Terminal } from 'lucide-react'
import type { SeniorLessonData } from '../types'
import { SENIOR_BOOK_ALL_LESSONS, getStartingScreenIndexForLesson } from '../config/seniorBookConfig'
import { gameAudio } from '../../../utils/gameAudio'

export interface SeniorBookTOCProps {
  isOpen: boolean
  onClose: () => void
  onSelectScreenIndex: (index: number) => void
  currentGradeNumber: number
  completedScreenIds: string[]
}

export const SeniorBookTOC: React.FC<SeniorBookTOCProps> = ({
  isOpen,
  onClose,
  onSelectScreenIndex,
  currentGradeNumber,
  completedScreenIds
}) => {
  const [activeGrade, setActiveGrade] = useState<number>(currentGradeNumber || 9)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Filter lessons for active grade or search
  const filteredLessons = useMemo(() => {
    let list = SENIOR_BOOK_ALL_LESSONS
    if (!searchQuery.trim()) {
      list = list.filter((l) => l.gradeNumber === activeGrade)
    } else {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (l) =>
          l.lessonTitle.toLowerCase().includes(q) ||
          l.chapterTitle.toLowerCase().includes(q) ||
          l.strand.toLowerCase().includes(q) ||
          l.vocab.some((v) => v.toLowerCase().includes(q))
      )
    }
    return list
  }, [activeGrade, searchQuery])

  // Group by chapter
  const groupedByChapter = useMemo(() => {
    const groups: { [key: string]: SeniorLessonData[] } = {}
    for (const les of filteredLessons) {
      const key = `Chapter ${les.chapterNumber}: ${les.chapterTitle}`
      if (!groups[key]) groups[key] = []
      groups[key].push(les)
    }
    return groups
  }, [filteredLessons])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
                <span>Senior AI Olympiad Curriculum Index</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Official 6-Month Senior Level (Classes 9–12) · 48 Comprehensive Lessons · 336 Interactive Screens
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grade Tabs & Search Filter Bar */}
        <div className="shrink-0 p-3 sm:px-6 bg-slate-950/60 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Grade Selector Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto bg-slate-900 p-1 rounded-2xl border border-slate-800">
            {[9, 10, 11, 12].map((g) => {
              const active = !searchQuery.trim() && activeGrade === g
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    gameAudio.playTap()
                    setSearchQuery('')
                    setActiveGrade(g)
                  }}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Class {g}
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, topics, labs..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Content Body: Chapters & Lessons */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {Object.keys(groupedByChapter).length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No lessons match "{searchQuery}". Try searching for terms like "neural", "prompt", "python", or "bias".
            </div>
          ) : (
            Object.entries(groupedByChapter).map(([chapTitle, lessons]) => (
              <div key={chapTitle} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-slate-800/60">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider">
                    {chapTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {lessons.map((les) => {
                    const startIdx = getStartingScreenIndexForLesson(
                      les.gradeNumber,
                      les.chapterNumber,
                      les.lessonNumber
                    )
                    const lessonKey = `g${les.gradeNumber}-c${les.chapterNumber}-l${les.lessonNumber}`
                    const isLessonComplete = completedScreenIds.some((id) =>
                      id.startsWith(lessonKey)
                    )

                    return (
                      <div
                        key={lessonKey}
                        onClick={() => {
                          gameAudio.playTap()
                          onSelectScreenIndex(startIdx)
                          onClose()
                        }}
                        className="group bg-slate-900/80 hover:bg-slate-850 hover:border-cyan-500/50 border border-slate-800/80 rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                              Lesson {les.lessonNumber}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 truncate">
                              {les.strand}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {les.lessonTitle}
                          </h4>

                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-medium">
                            {les.mission.title}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Sparkles size={12} />
                            <span>+{les.reflection.xpReward} XP</span>
                          </span>
                          <span className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400 transition-colors font-bold">
                            <span>Open 7 Stages</span>
                            <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
