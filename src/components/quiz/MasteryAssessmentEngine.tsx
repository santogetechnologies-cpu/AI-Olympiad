import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  X, CheckCircle2, XCircle, ArrowRight, RotateCcw,
  Sparkles, Award, Star, HelpCircle, ChevronDown, ChevronUp,
  Check, Lightbulb, Zap, ShieldCheck, Clock, Play, Target,
  Compass, ArrowDown, ArrowUp, Layers
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'
import { gamification } from '../../utils/gamification'
import { TopicLessonIllustration } from '../learning/primitives/TopicLessonIllustration'
import {
  lessonQuizService,
  type DynamicQuizQuestion,
  type GeneratedQuiz,
  type QuizAttemptRecord,
  type MasteryQuestionType
} from '../../services/lessonQuizService'
import toast from 'react-hot-toast'

export interface MasteryAssessmentEngineProps {
  classId?: string
  academicLevel: string
  gradeKey?: string
  subjectId?: string
  subjectName: string
  chapterId: string
  chapterNumber?: string | number
  chapterTitle: string
  lessonId?: string
  lessonTitle: string
  studentId: string
  orgId: string
  isCompleted?: boolean
  onComplete?: (score: number, accuracy: number, passed: boolean) => void
  onClose?: () => void
  onContinueNextChapter?: () => void
  isFinalChapter?: boolean
  standaloneModal?: boolean
}

type AssessmentScreen = 'intro' | 'question' | 'result'

export const MasteryAssessmentEngine: React.FC<MasteryAssessmentEngineProps> = ({
  classId = '',
  academicLevel,
  gradeKey = 'class3',
  subjectId = '',
  subjectName,
  chapterId,
  chapterNumber = '1',
  chapterTitle,
  lessonId = '',
  lessonTitle,
  studentId,
  orgId,
  isCompleted: initialCompleted = false,
  onComplete,
  onClose,
  onContinueNextChapter,
  isFinalChapter = false,
  standaloneModal = false,
}) => {
  const [screen, setScreen] = useState<AssessmentScreen>('intro')
  const [quizData, setQuizData] = useState<GeneratedQuiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)

  // Question interaction state
  const [selectedOptionId, setSelectedOptionId] = useState<string>('')
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null)
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({})
  const [selectedMatchLeft, setSelectedMatchLeft] = useState<string | null>(null)
  const [orderedItemIds, setOrderedItemIds] = useState<string[]>([])
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false)

  // Per-question tracking for the active attempt
  const [answeredRecords, setAnsweredRecords] = useState<{
    questionId: string
    questionText: string
    questionType: MasteryQuestionType
    selectedOptionId?: string
    selectedText: string
    correctText: string
    isCorrect: boolean
    explanation: string
  }[]>([])

  // Attempt & Mastery History
  const [pastAttempts, setPastAttempts] = useState<QuizAttemptRecord[]>([])
  const [latestAttempt, setLatestAttempt] = useState<QuizAttemptRecord | null>(null)
  const [showHistoryAccordion, setShowHistoryAccordion] = useState(false)

  // Timer
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes default
  const timerRef = useRef<any>(null)

  const contextKey = useMemo(() => {
    return `${gradeKey}_${chapterId}_${lessonId || 'chapter_quiz'}`
  }, [gradeKey, chapterId, lessonId])

  // Load Attempt History & Quiz Question Pool
  const loadQuiz = async (forceNewAttempt = false) => {
    try {
      setLoading(true)
      // 1. Fetch previous attempts for duplicate & mastery detection
      const history = lessonQuizService.getAttemptHistory(studentId, contextKey)
      setPastAttempts(history)
      const latest = history.length > 0 ? history[history.length - 1] : null
      setLatestAttempt(latest)

      // 2. Generate / load fresh questions from the lesson topic pool
      const generated = await lessonQuizService.getQuizForLesson({
        studentId,
        contextKey,
        academicLevel,
        gradeKey,
        chapterNum: chapterNumber,
        subjectName,
        chapterTitle,
        lessonTitle,
        forceNewAttempt,
      })

      setQuizData(generated)
      setTimeLeft(generated.timeLimit ? generated.timeLimit * 60 : 600)

      // If user has a past completed attempt and did NOT ask for a fresh one, show Intro with Mastery Completed status
      if (latest && !forceNewAttempt) {
        setScreen('intro')
      }
    } catch (err) {
      console.error('Error loading mastery assessment:', err)
      toast.error('Failed to load assessment questions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuiz(false)
  }, [contextKey, studentId])

  // Timer countdown
  useEffect(() => {
    if (screen === 'question' && !isAnswerSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [screen, isAnswerSubmitted])

  const questions = quizData?.questions || []
  const currentQ = questions[currentIdx]
  const totalQuestions = questions.length || 5

  // Initialize interactive state for current question
  useEffect(() => {
    if (!currentQ) return
    setSelectedOptionId('')
    setSelectedBool(null)
    setMatchingSelections({})
    setSelectedMatchLeft(null)
    setIsAnswerSubmitted(false)

    // For ordering questions, initialize random or current order
    if (currentQ.orderingItems && currentQ.orderingItems.length > 0) {
      setOrderedItemIds(currentQ.orderingItems.map(item => item.id))
    } else {
      setOrderedItemIds([])
    }
  }, [currentIdx, currentQ])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleStartMission = () => {
    gameAudio.playTap()
    setCurrentIdx(0)
    setAnsweredRecords([])
    setScreen('question')
  }

  const handleStartFreshAttempt = () => {
    gameAudio.playTap()
    loadQuiz(true)
    setCurrentIdx(0)
    setAnsweredRecords([])
    setScreen('question')
  }

  // Answer submission & instant verification
  const handleVerifyAnswer = () => {
    if (!currentQ || isAnswerSubmitted) return

    const qType = currentQ.questionType || 'mcq'
    let isCorrect = false
    let selectedText = ''
    let correctText = ''

    if (qType === 'true_false') {
      const correctOpt = currentQ.options.find(o => o.isCorrect)
      const correctBool = correctOpt?.text.toLowerCase().includes('true') ?? true
      isCorrect = selectedBool === correctBool
      selectedText = selectedBool === true ? 'True' : selectedBool === false ? 'False' : 'No response'
      correctText = correctBool ? 'True' : 'False'
    } else if (qType === 'ordering') {
      const items = currentQ.orderingItems || []
      const isSequenceCorrect = orderedItemIds.every((id, idx) => {
        const item = items.find(i => i.id === id)
        return item?.correctOrder === idx + 1
      })
      isCorrect = isSequenceCorrect
      selectedText = 'Arranged Sequence'
      correctText = 'Correct Sequence'
    } else if (qType === 'matching') {
      const pairs = currentQ.matchingPairs || []
      const allMatchedCorrectly = pairs.every(p => matchingSelections[p.id] === p.id)
      isCorrect = allMatchedCorrectly && Object.keys(matchingSelections).length === pairs.length
      selectedText = `${Object.keys(matchingSelections).length} pairs connected`
      correctText = `${pairs.length} pairs connected correctly`
    } else {
      // MCQ & Scenario
      const chosenOpt = currentQ.options.find(o => o.id === selectedOptionId)
      const correctOpt = currentQ.options.find(o => o.isCorrect)
      isCorrect = !!chosenOpt?.isCorrect
      selectedText = chosenOpt?.text || 'No option selected'
      correctText = correctOpt?.text || 'Correct option'
    }

    if (isCorrect) {
      gameAudio.playSuccess()
    } else {
      gameAudio.playWrong()
    }

    setIsCurrentAnswerCorrect(isCorrect)
    setIsAnswerSubmitted(true)

    // Append record
    setAnsweredRecords(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        questionText: currentQ.question,
        questionType: qType,
        selectedOptionId,
        selectedText,
        correctText,
        isCorrect,
        explanation: currentQ.explanation,
      }
    ])
  }

  // Moving to next question or completing the quiz
  const handleNextQuestion = async () => {
    gameAudio.playTap()
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1)
    } else {
      // Assessment Completed!
      await finishAssessment()
    }
  }

  const finishAssessment = async () => {
    const finalRecords = answeredRecords
    const correctCount = finalRecords.filter(r => r.isCorrect).length
    const score = correctCount
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
    const passed = accuracy >= (quizData?.passingPercentage || 60)

    if (passed) {
      gamification.launchConfetti()
    }

    // Persist attempt history
    const recordPayload: QuizAttemptRecord = {
      id: `att-${Date.now()}`,
      studentId,
      classId,
      academicLevel,
      subjectId,
      subjectName,
      chapterId,
      chapterTitle,
      lessonId,
      lessonTitle,
      quizId: quizData?.quizId || `${chapterId}-quiz`,
      attemptNumber: pastAttempts.length + 1,
      totalMarks: totalQuestions,
      scoredMarks: score,
      accuracy,
      passed,
      completedAt: new Date().toISOString(),
      answers: finalRecords,
    }

    await lessonQuizService.recordMasteryAttempt(recordPayload, contextKey)

    // Notify parent progress trackers
    if (onComplete) {
      onComplete(score, accuracy, passed)
    }

    setLatestAttempt(recordPayload)
    setPastAttempts(prev => [...prev, recordPayload])
    setScreen('result')
  }

  // Helper to reorder items in ordering questions
  const moveOrderItem = (fromIdx: number, toIdx: number) => {
    if (isAnswerSubmitted) return
    const updated = [...orderedItemIds]
    const [moved] = updated.splice(fromIdx, 1)
    updated.splice(toIdx, 0, moved)
    setOrderedItemIds(updated)
    gameAudio.playTap()
  }

  // Matching pair handler
  const handleSelectMatchingRight = (pairId: string) => {
    if (isAnswerSubmitted || !selectedMatchLeft) return
    setMatchingSelections(prev => ({
      ...prev,
      [selectedMatchLeft]: pairId
    }))
    setSelectedMatchLeft(null)
    gameAudio.playTap()
  }

  // Determine question category label
  const getQuestionTypeLabel = (type?: MasteryQuestionType) => {
    switch (type) {
      case 'scenario': return 'Scenario Analysis'
      case 'true_false': return 'True / False Challenge'
      case 'matching': return 'Matching Interaction'
      case 'ordering': return 'Sequence Ordering'
      case 'visual_select': return 'Visual Selection'
      case 'short_answer': return 'Concept Choice'
      default: return 'Mastery Multiple Choice'
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-slate-700">Loading Mastery Assessment...</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Selecting topic-verified questions...</p>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. SCREEN: INTRO / MISSION BRIEF OR COMPLETED MASTERY STATE
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    const isAlreadyMastered = latestAttempt?.passed || initialCompleted

    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-2 sm:px-4 py-2 sm:py-3 h-full max-h-full overflow-hidden select-none animate-in fade-in">
        {/* Top Header with Close Button */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              {academicLevel || gradeKey.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-600 truncate max-w-[200px] sm:max-w-xs">
              {chapterTitle}
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Close Assessment"
            >
              <X size={16} />
              <span className="hidden sm:inline">Close</span>
            </button>
          )}
        </div>

        {/* Center Content: Standalone SVG Visual + Mission Brief */}
        <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-4 text-center min-h-0 space-y-3">
          {/* Standalone Topic-Based SVG Visual */}
          <div className="w-full flex justify-center shrink-0">
            <TopicLessonIllustration
              topic={lessonTitle || chapterTitle}
              chapterTitle={chapterTitle}
              gradeKey={gradeKey}
              chapterNum={chapterNumber}
              size={135}
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200">
              <Sparkles size={13} className="text-indigo-600" />
              <span>Verified Mastery Assessment</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
              {lessonTitle || `${chapterTitle} — Mastery Assessment`}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              Demonstrate complete conceptual understanding through scenario analysis, matching, and applied problem solving.
            </p>
          </div>

          {/* If already completed, show Mastery Completed State */}
          {isAlreadyMastered && latestAttempt && (
            <div className="w-full max-w-md bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-600" /> Mastery Achieved
                </span>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                  Score: {latestAttempt.scoredMarks}/{latestAttempt.totalMarks} ({latestAttempt.accuracy}%)
                </span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                You have already mastered this assessment! A new attempt will intentionally select a fresh, unseen question set from the lesson question pool.
              </p>
            </div>
          )}

          {/* Mission Specifications Grid */}
          <div className="w-full max-w-md grid grid-cols-3 gap-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Questions</span>
              <span className="text-sm font-black text-slate-800">{totalQuestions} Challenges</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Passing</span>
              <span className="text-sm font-black text-indigo-600">60% Accuracy</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Reward</span>
              <span className="text-sm font-black text-amber-600">+30 XP</span>
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="pt-2 border-t border-slate-200 shrink-0 space-y-2">
          {isAlreadyMastered ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleStartFreshAttempt}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Target size={16} />
                <span>Start New Attempt (Fresh Questions)</span>
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Return to Sections
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleStartMission}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Play size={16} className="fill-white" />
              <span>Begin Mastery Assessment</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SCREEN: QUESTION EXPERIENCE & INSTANT FEEDBACK
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === 'question' && currentQ) {
    const qType = currentQ.questionType || 'mcq'
    const progressPct = Math.round(((currentIdx + 1) / totalQuestions) * 100)

    // Check if user has made an answer selection to enable "Verify Answer"
    const hasSelection = (() => {
      if (qType === 'true_false') return selectedBool !== null
      if (qType === 'matching') return Object.keys(matchingSelections).length === (currentQ.matchingPairs?.length || 0)
      if (qType === 'ordering') return true // ordering always has an order
      return !!selectedOptionId
    })()

    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-2 sm:px-4 py-2 sm:py-3 h-full max-h-full overflow-hidden select-none animate-in fade-in">
        {/* Top Navigation & Progress Bar HUD */}
        <div className="w-full bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200 shadow-2xs shrink-0 mb-1 sm:mb-2 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                  title="Close Assessment"
                >
                  <X size={15} />
                </button>
              )}
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md truncate">
                {getQuestionTypeLabel(qType)}
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                <Clock size={11} className="text-slate-500" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Center Question Workspace (Single-Column, Compact, No Scroll) */}
        <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2 py-1 overflow-hidden">
          {/* Question Prompt & Scenario Box */}
          <div className="space-y-1.5 shrink-0">
            {currentQ.scenarioContext && (
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-[10px] sm:text-xs leading-relaxed">
                <strong className="font-bold text-amber-900 block mb-0.5">Applied Scenario:</strong>
                {currentQ.scenarioContext}
              </div>
            )}

            <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Interactive Answer Area */}
          <div className="flex-1 flex flex-col justify-center min-h-0 py-1">
            {/* 1. TRUE / FALSE INTERACTION */}
            {qType === 'true_false' && (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedBool(true)
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedBool === true
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <CheckCircle2 size={24} className={selectedBool === true ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className="font-black text-sm sm:text-base">True</span>
                  <span className="text-[10px] text-slate-500">Assertion is accurate</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedBool(false)
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedBool === false
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <XCircle size={24} className={selectedBool === false ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className="font-black text-sm sm:text-base">False</span>
                  <span className="text-[10px] text-slate-500">Assertion is incorrect</span>
                </button>
              </div>
            )}

            {/* 2. MATCHING PAIRS INTERACTION */}
            {qType === 'matching' && currentQ.matchingPairs && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-medium text-center">
                  Select a concept on the left, then tap its matching role on the right.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Left Column */}
                  <div className="space-y-1">
                    {currentQ.matchingPairs.map(pair => {
                      const isMatched = !!matchingSelections[pair.id]
                      const isSelected = selectedMatchLeft === pair.id
                      return (
                        <button
                          key={pair.id}
                          type="button"
                          disabled={isAnswerSubmitted}
                          onClick={() => {
                            gameAudio.playTap()
                            setSelectedMatchLeft(pair.id)
                          }}
                          className={`w-full p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : isSelected
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-400/40'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                          }`}
                        >
                          {pair.left}
                        </button>
                      )
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-1">
                    {currentQ.matchingPairs.map(pair => {
                      const isConnected = Object.values(matchingSelections).includes(pair.id)
                      return (
                        <button
                          key={pair.id}
                          type="button"
                          disabled={isAnswerSubmitted || !selectedMatchLeft}
                          onClick={() => handleSelectMatchingRight(pair.id)}
                          className={`w-full p-2 rounded-xl text-left border text-[10px] transition-all cursor-pointer ${
                            isConnected
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                              : selectedMatchLeft
                              ? 'bg-white border-indigo-300 hover:bg-indigo-50 text-slate-800'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          {pair.right}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ORDERING / SEQUENCE INTERACTION */}
            {qType === 'ordering' && currentQ.orderingItems && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-medium text-center">
                  Arrange the steps in the correct chronological sequence using the arrows.
                </p>
                <div className="space-y-1">
                  {orderedItemIds.map((itemId, idx) => {
                    const item = currentQ.orderingItems?.find(i => i.id === itemId)
                    return (
                      <div
                        key={itemId}
                        className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span>{item?.text}</span>
                        </div>

                        {!isAnswerSubmitted && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveOrderItem(idx, idx - 1)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === orderedItemIds.length - 1}
                              onClick={() => moveOrderItem(idx, idx + 1)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 4. STANDARD MCQ & SCENARIO 4-OPTION INTERACTION */}
            {(qType === 'mcq' || qType === 'scenario' || qType === 'visual_select' || qType === 'short_answer') && (
              <div className="space-y-1.5">
                {currentQ.options.map((opt, oIdx) => {
                  const letter = ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1)
                  const isSelected = selectedOptionId === opt.id

                  let cardStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  let badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200'

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                      badgeStyle = 'bg-emerald-600 text-white border-emerald-600'
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = 'bg-rose-50 border-rose-300 text-rose-950 opacity-75'
                      badgeStyle = 'bg-rose-600 text-white border-rose-600'
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-indigo-50/95 border-indigo-600 text-indigo-950 font-bold shadow-xs ring-2 ring-indigo-400/40'
                    badgeStyle = 'bg-indigo-600 text-white border-indigo-600'
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => {
                        gameAudio.playTap()
                        setSelectedOptionId(opt.id)
                      }}
                      className={`w-full p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-lg border font-mono text-[10px] font-black flex items-center justify-center shrink-0 ${badgeStyle}`}>
                          {letter}
                        </span>
                        <span className="text-[11px] sm:text-xs leading-snug">
                          {opt.text}
                        </span>
                      </div>

                      {isAnswerSubmitted && opt.isCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle size={16} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Instant Feedback Drawer upon submission */}
          {isAnswerSubmitted && (
            <div className={`p-2.5 sm:p-3 rounded-xl border animate-in slide-in-from-bottom duration-200 shrink-0 ${
              isCurrentAnswerCorrect
                ? 'bg-emerald-50/95 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/95 border-rose-200 text-rose-950'
            }`}>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-black flex items-center gap-1">
                  {isCurrentAnswerCorrect ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Correct Deduction</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={14} className="text-rose-600" />
                      <span>Concept Clarification</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Button Footer */}
        <div className="pt-2 border-t border-slate-200 shrink-0">
          {!isAnswerSubmitted ? (
            <button
              type="button"
              disabled={!hasSelection}
              onClick={handleVerifyAnswer}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-35 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ShieldCheck size={16} />
              <span>Verify Deduction</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'View Final Mastery Results'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. SCREEN: FINAL RESULT & MASTERY COMPLETE
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === 'result' && latestAttempt) {
    const { scoredMarks, totalMarks, accuracy, passed, answers } = latestAttempt
    const incorrectCount = totalMarks - scoredMarks

    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-between px-2 sm:px-4 py-2 sm:py-3 h-full max-h-full overflow-hidden select-none animate-in fade-in">
        {/* Top Header with Close */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              {academicLevel || gradeKey.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-600 truncate max-w-[200px] sm:max-w-xs">
              {lessonTitle || chapterTitle}
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Center Mastery Summary */}
        <div className="flex-1 flex flex-col items-center justify-center py-2 text-center min-h-0 space-y-2.5 overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-amber-50 border-2 border-indigo-200 flex items-center justify-center shadow-inner shrink-0">
            {passed ? (
              <Award size={36} className="text-amber-500" />
            ) : (
              <RotateCcw size={32} className="text-indigo-600" />
            )}
          </div>

          <div>
            <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1 border ${
              passed
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {passed ? <CheckCircle2 size={13} className="text-emerald-600" /> : <Lightbulb size={13} className="text-amber-600" />}
              <span>{passed ? 'Concept Mastery Verified' : 'Practice Recommended'}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
              {passed ? 'Mastery Complete!' : 'Assessment Concluded'}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
              {passed
                ? 'Outstanding deduction! You have demonstrated verified mastery of this lesson topic.'
                : 'Good attempt! Review the question explanations below and try a fresh question set.'}
            </p>
          </div>

          {/* Metric Cards Grid */}
          <div className="w-full max-w-sm grid grid-cols-4 gap-1.5 shrink-0">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Score</span>
              <span className="text-sm font-black text-slate-900">{scoredMarks}/{totalMarks}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Accuracy</span>
              <span className={`text-sm font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {accuracy}%
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block">Correct</span>
              <span className="text-sm font-black text-emerald-600">{scoredMarks}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block">Review</span>
              <span className="text-sm font-black text-rose-600">{incorrectCount}</span>
            </div>
          </div>

          {/* Detailed Question Review Toggle */}
          <div className="w-full max-w-md shrink-0">
            <button
              type="button"
              onClick={() => setShowHistoryAccordion(prev => !prev)}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>{showHistoryAccordion ? 'Hide Question Breakdown' : 'View Question Breakdown'} ({totalMarks} Questions)</span>
              {showHistoryAccordion ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showHistoryAccordion && (
              <div className="mt-1.5 max-h-40 overflow-y-auto space-y-1.5 text-left pr-1">
                {answers.map((ans, idx) => (
                  <div
                    key={ans.questionId || idx}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-800 truncate max-w-[240px]">{idx + 1}. {ans.questionText}</span>
                      <span className={ans.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                        {ans.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      <span>Your Answer: <strong>{ans.selectedText}</strong></span>
                      {!ans.isCorrect && <span className="block text-emerald-700">Correct: {ans.correctText}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              Return to Chapter Sections
            </button>
          )}

          <button
            type="button"
            onClick={handleStartFreshAttempt}
            className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw size={15} />
            <span>Practice Fresh Question Pool</span>
          </button>
        </div>
      </div>
    )
  }

  return null
}
