import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  X, CheckCircle2, Terminal, BookOpen, Layers, Sparkles, Award,
  ChevronRight, ArrowRight, ShieldCheck, Compass, Check, Lightbulb
} from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'
import type {
  HigherEdLevelKey,
  HigherEdScreenItem,
  HigherEdLesson,
} from './types'
import {
  HIGHER_ED_LEVELS_CATALOG,
  getHigherEdLesson
} from '../../services/higherEdCurriculumData'
import { HigherEdTerminalShell } from './HigherEdTerminalShell'
import { HigherEdScreenRenderer } from './HigherEdScreenRenderer'
import { HigherEdVisualGuide } from './HigherEdVisualGuide'
import { HigherEdMentorDrawer } from './HigherEdMentorDrawer'
import { KindergartenExplainerModal } from './KindergartenExplainerModal'
import { gameAudio } from '../../utils/gameAudio'
import { gamification } from '../../utils/gamification'
import { useAuth } from '../../contexts/AuthContext'

export interface HigherEdInteractiveAppProps {
  initialLevel?: HigherEdLevelKey
  initialChapter?: number // 1 to 6
  initialLesson?: 1 | 2
  onExit?: () => void
  onComplete?: () => void
  studentName?: string
}

const STORAGE_PREFIX = 'nanjil_higher_ed_progress'

export const HigherEdInteractiveApp: React.FC<HigherEdInteractiveAppProps> = ({
  initialLevel = 'ug1',
  initialChapter = 1,
  initialLesson = 1,
  onExit,
  onComplete,
  studentName = 'Higher Ed Scholar'
}) => {
  const { user } = useAuth()
  const studentId = user?.id || 'guest-higher-ed'

  // Navigation State
  const [levelKey, setLevelKey] = useState<HigherEdLevelKey>(initialLevel)
  const [chapterNum, setChapterNum] = useState<number>(initialChapter)
  const [lessonNum, setLessonNum] = useState<1 | 2>(initialLesson)
  const [screenIndex, setScreenIndex] = useState<number>(0) // 0 to 4 within current lesson

  // View Mode: 'guide' (Visual Syllabus Teaching) or 'terminal' (Hands-on Mission Execution)
  const [activeView, setActiveView] = useState<'guide' | 'terminal'>('terminal')
  const [isMentorOpen, setIsMentorOpen] = useState(false)
  const [isKindergartenOpen, setIsKindergartenOpen] = useState(false)

  // UI Modal State
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  // Progress State in LocalStorage
  const [completedScreenIds, setCompletedScreenIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}_${studentId}_screens`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [xpEarned, setXpEarned] = useState<number>(() => {
    const stats = gamification.getStats(studentId)
    return stats.xp || 0
  })

  // Synchronize when initial props change
  useEffect(() => {
    if (initialLevel) setLevelKey(initialLevel)
    if (initialChapter) setChapterNum(initialChapter)
    if (initialLesson) setLessonNum(initialLesson)
    setScreenIndex(0)
  }, [initialLevel, initialChapter, initialLesson])

  // Resolve active lesson object and screens
  const activeLesson: HigherEdLesson = useMemo(() => {
    return getHigherEdLesson(levelKey, chapterNum, lessonNum)
  }, [levelKey, chapterNum, lessonNum])

  const screens: HigherEdScreenItem[] = activeLesson.screens
  const currentScreen: HigherEdScreenItem = screens[screenIndex] || screens[0]
  const isCurrentScreenCompleted = completedScreenIds.includes(currentScreen.id)

  // Level Metadata
  const levelMeta = HIGHER_ED_LEVELS_CATALOG[levelKey] || HIGHER_ED_LEVELS_CATALOG.ug1

  // Handle Marking Screen Complete
  const handleCompleteCurrentScreen = useCallback(() => {
    if (!completedScreenIds.includes(currentScreen.id)) {
      const updated = [...completedScreenIds, currentScreen.id]
      setCompletedScreenIds(updated)
      try {
        localStorage.setItem(`${STORAGE_PREFIX}_${studentId}_screens`, JSON.stringify(updated))
      } catch {}

      // Award XP via gamification service
      const earned = gamification.addXP(25, studentId, `higher_ed_${currentScreen.id}`)
      setXpEarned(earned.newXP)
      toast.success(`+25 XP Earned! (${currentScreen.title})`, {
        icon: '⚡',
        style: { background: '#0f172a', color: '#38bdf8', border: '1px solid #1e293b' }
      })
    }
  }, [completedScreenIds, currentScreen, studentId])

  // Handle Navigating Next
  const handleNextScreen = () => {
    handleCompleteCurrentScreen()

    if (screenIndex < screens.length - 1) {
      setScreenIndex(prev => prev + 1)
    } else {
      // Completed last screen of this lesson!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
      gameAudio.playLevelUp()
      toast.success(`🎉 Lesson Complete: ${activeLesson.title}!`, { duration: 5000 })

      if (onComplete) onComplete()

      // Advance to Lesson 2, or next chapter if already on Lesson 2
      if (lessonNum === 1) {
        setLessonNum(2)
        setScreenIndex(0)
      } else if (chapterNum < 6) {
        setChapterNum(prev => prev + 1)
        setLessonNum(1)
        setScreenIndex(0)
      } else {
        toast.success(`🏆 Chapter Complete! You mastered all chapters in ${levelMeta.name}!`, { duration: 6000 })
      }
    }
  }

  const handlePreviousScreen = () => {
    if (screenIndex > 0) {
      setScreenIndex(prev => prev - 1)
    }
  }

  const STAGE_TITLES = [
    'Stage 1: Tactical Briefing',
    'Stage 2: System Architecture',
    'Stage 3: Execution Lab',
    'Stage 4: Technical Mission',
    'Stage 5: Olympiad Defense'
  ]

  const CHAPTER_NAMES = [
    'AI Basics',
    'Communicate with AI',
    'AI Applications',
    'AI and Career',
    'AI Tools',
    'Responsible AI'
  ]

  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* ─── TOP VIEW MODE SWITCHER BAR ─────────────────────────────────── */}
      <div className="h-11 px-3 sm:px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              gameAudio.playTap()
              setActiveView('guide')
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'guide'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Compass size={14} className="text-cyan-400" />
            <span>Visual Syllabus Guide & Steps</span>
          </button>

          <button
            onClick={() => {
              gameAudio.playTap()
              setActiveView('terminal')
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'terminal'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal size={14} className="text-indigo-400" />
            <span>Interactive Terminal</span>
          </button>
        </div>

        {/* Level Quick Pill & Guide Me Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
            Active: <span className="text-cyan-400 font-bold">{levelMeta.shortCode}</span> ({levelMeta.name})
          </span>

          {/* ELI5 Kids Dictionary Button */}
          <button
            onClick={() => {
              gameAudio.playTap()
              setIsKindergartenOpen(true)
            }}
            className="px-2 sm:px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-mono font-bold hover:bg-amber-500/25 flex items-center gap-1 transition-all cursor-pointer"
            title="Open Kindergarten Concept Explainer (ELI5)"
          >
            <span>🧸</span>
            <span className="hidden sm:inline">ELI5 Mode</span>
          </button>

          {activeView === 'terminal' && (
            <button
              onClick={() => {
                gameAudio.playTap()
                setIsMentorOpen(true)
              }}
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold hover:bg-cyan-500/25 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Guide Me</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── DUAL VIEW RENDERER ─────────────────────────────────────────── */}
      {activeView === 'guide' ? (
        <HigherEdVisualGuide
          currentLevelKey={levelKey}
          onSelectLevelAndLesson={(lvl, ch, les) => {
            setLevelKey(lvl)
            setChapterNum(ch)
            setLessonNum(les)
            setScreenIndex(0)
            setActiveView('terminal')
          }}
        />
      ) : (
        <HigherEdTerminalShell
          levelName={levelMeta.name}
          shortCode={levelMeta.shortCode}
          chapterNumber={chapterNum}
          chapterTitle={CHAPTER_NAMES[chapterNum - 1] || 'AI Curriculum'}
          lessonNumber={lessonNum}
          lessonTitle={activeLesson.title}
          currentScreenNumber={screenIndex + 1}
          totalScreens={5}
          screenTypeTitle={STAGE_TITLES[screenIndex] || `Stage ${screenIndex + 1}`}
          xpEarned={xpEarned}
          onPreviousScreen={handlePreviousScreen}
          onNextScreen={handleNextScreen}
          onOpenSelector={() => setIsSelectorOpen(true)}
          onExit={onExit}
          onOpenGuide={() => setIsMentorOpen(true)}
          onSwitchToVisualGuide={() => setActiveView('guide')}
          onOpenKindergartenModal={() => setIsKindergartenOpen(true)}
          canGoNext={true}
          isCompleted={isCurrentScreenCompleted}
        >
          <HigherEdScreenRenderer
            screen={currentScreen}
            onCompleteScreen={handleCompleteCurrentScreen}
            onNextScreen={handleNextScreen}
            isScreenCompleted={isCurrentScreenCompleted}
          />
        </HigherEdTerminalShell>
      )}

      {/* ─── AI MENTOR & STEP-BY-STEP GUIDANCE DRAWER ────────────────────── */}
      <HigherEdMentorDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        currentScreen={currentScreen}
        levelKey={levelKey}
        levelName={levelMeta.name}
        chapterNum={chapterNum}
        chapterTitle={CHAPTER_NAMES[chapterNum - 1] || 'AI Curriculum'}
        lessonNum={lessonNum}
        lessonTitle={activeLesson.title}
      />

      {/* ─── KINDERGARTEN CONCEPT EXPLAINER MODAL (ELI5) ─────────────────── */}
      <KindergartenExplainerModal
        isOpen={isKindergartenOpen}
        onClose={() => setIsKindergartenOpen(false)}
        currentLevelKey={levelKey}
      />

      {/* ─── LEVEL & CHAPTER SELECTOR MODAL ────────────────────────────── */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Curriculum Navigator
                </span>
                <h3 className="text-base font-bold text-slate-100">Select Academic Level & Chapter</h3>
              </div>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Level Tier Selector Pills */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Target Academic Level:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(HIGHER_ED_LEVELS_CATALOG) as HigherEdLevelKey[]).map((lvl) => {
                  const item = HIGHER_ED_LEVELS_CATALOG[lvl]
                  const isSelected = lvl === levelKey
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        gameAudio.playTap()
                        setLevelKey(lvl)
                        setScreenIndex(0)
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 shadow-lg text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{item.shortCode}</div>
                      <div className="text-xs font-bold text-slate-200">{item.name}</div>
                      <div className="text-[9px] text-slate-500">{item.tier}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 6 Canonical Chapters */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Canonical Chapters & Lessons:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CHAPTER_NAMES.map((name, idx) => {
                  const chIdx = idx + 1
                  const isCurChap = chIdx === chapterNum
                  return (
                    <div
                      key={chIdx}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isCurChap
                          ? 'bg-slate-800/80 border-indigo-500/50'
                          : 'bg-slate-950/40 border-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                        <span>Ch {chIdx}: {name}</span>
                        {isCurChap && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300">Active</span>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            gameAudio.playTap()
                            setChapterNum(chIdx)
                            setLessonNum(1)
                            setScreenIndex(0)
                            setIsSelectorOpen(false)
                          }}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            isCurChap && lessonNum === 1
                              ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Lesson 1
                        </button>
                        <button
                          onClick={() => {
                            gameAudio.playTap()
                            setChapterNum(chIdx)
                            setLessonNum(2)
                            setScreenIndex(0)
                            setIsSelectorOpen(false)
                          }}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            isCurChap && lessonNum === 2
                              ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Lesson 2
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HigherEdInteractiveApp
