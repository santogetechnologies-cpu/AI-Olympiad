// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL MISSION HUB (TABLE OF CONTENTS DRAWER)
// Filter by class, search across 36 lessons, and jump directly to any mission
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import type { MiddleClassKey, MiddleLessonData } from './types'
import { MIDDLE_LEVEL_CURRICULUM } from './data/middleLevelData'
import { X, Search, CheckCircle2, ChevronRight, Gamepad2, Award, BookOpen } from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'

export interface MiddleLevelTOCProps {
  isOpen: boolean
  onClose: () => void
  currentLessonId: string
  completedLessonIds: string[]
  onSelectLesson: (lessonId: string) => void
}

export const MiddleLevelTOC: React.FC<MiddleLevelTOCProps> = ({
  isOpen,
  onClose,
  currentLessonId,
  completedLessonIds,
  onSelectLesson
}) => {
  const [selectedClassTab, setSelectedClassTab] = useState<MiddleClassKey>('class6')
  const [searchQuery, setSearchQuery] = useState('')

  const activeClassCurriculum = useMemo(() => {
    return MIDDLE_LEVEL_CURRICULUM.find((c) => c.classKey === selectedClassTab) || MIDDLE_LEVEL_CURRICULUM[0]
  }, [selectedClassTab])

  // Filter lessons based on search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeClassCurriculum.chapters
    }
    const q = searchQuery.toLowerCase()
    return activeClassCurriculum.chapters
      .map((ch) => {
        const matchingLessons = ch.lessons.filter(
          (l) =>
            l.lessonTitle.toLowerCase().includes(q) ||
            l.chapterTitle.toLowerCase().includes(q) ||
            l.game.gameTitle.toLowerCase().includes(q) ||
            l.syllabusReference.toLowerCase().includes(q)
        )
        return {
          ...ch,
          lessons: matchingLessons
        }
      })
      .filter((ch) => ch.lessons.length > 0)
  }, [activeClassCurriculum, searchQuery])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-2xl h-[90vh] max-h-[750px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-sky-400" />
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Mission Hub • Curriculum Directory
              </h2>
              <span className="text-[11px] text-slate-400">
                All 36 Lessons & Topic-Specific Game Simulations
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              gameAudio.playTap()
              onClose()
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Controls: Class Tabs & Search Bar */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          {/* Class Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            {MIDDLE_LEVEL_CURRICULUM.map((cls) => {
              const isSelected = cls.classKey === selectedClassTab
              return (
                <button
                  key={cls.classKey}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedClassTab(cls.classKey)
                  }}
                  className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cls.className}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lessons, games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Lessons List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredChapters.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No lessons match your search criteria.
            </div>
          ) : (
            filteredChapters.map((ch) => (
              <div key={ch.id} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
                {/* Chapter Title Banner */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-300 font-bold">
                      Chapter {ch.chapterNumber}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {ch.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    2 Verified Lessons
                  </span>
                </div>

                {/* Lessons in Chapter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {ch.lessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLessonId
                    const isDone = completedLessonIds.includes(lesson.id)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          gameAudio.playTap()
                          onSelectLesson(lesson.id)
                          onClose()
                        }}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-sky-950/70 border-sky-400 shadow-md shadow-sky-950/50'
                            : isDone
                            ? 'bg-emerald-950/30 border-emerald-800/60 hover:bg-slate-900'
                            : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-400">
                              Lesson {lesson.lessonNumber}
                            </span>
                            {isDone && (
                              <CheckCircle2 size={13} className="text-emerald-400" />
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                            {lesson.lessonTitle}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-medium">
                            <Gamepad2 size={11} />
                            <span className="truncate">{lesson.game.gameTitle}</span>
                          </div>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span>+{lesson.xpReward} XP</span>
                          <span className="text-sky-400 font-semibold flex items-center gap-0.5">
                            Launch <ChevronRight size={11} />
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>{completedLessonIds.length} of 36 Missions Certified</span>
          <span className="font-mono text-sky-400">Classes 6, 7 & 8 Olympiad Syllabus</span>
        </div>
      </div>
    </div>
  )
}
