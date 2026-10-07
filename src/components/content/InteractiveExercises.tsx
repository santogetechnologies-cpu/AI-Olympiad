import { useState } from 'react'
import { CheckCircle2, XCircle, Sparkles, HelpCircle, Lightbulb, RefreshCw, ZoomIn, Image as ImageIcon } from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

// ─── 1. Interactive MCQ Widget ─────────────────────────────────────────────────
export interface MCQProps {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  hint?: string
  xpReward?: number
  onComplete?: () => void
}

export function InteractiveMCQ({
  question,
  options,
  correctIndex,
  explanation,
  hint,
  xpReward = 10,
  onComplete,
}: MCQProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleCheck = () => {
    if (selected === null) return
    setChecked(true)
    const isCorrect = selected === correctIndex

    if (isCorrect) {
      if (!completed) {
        setCompleted(true)
        const xpRes = gamification.addXP(xpReward, undefined, `exercise-mcq-${question.substring(0, 24)}`)
        if (xpRes.awarded) {
          toast.success(`🎉 Correct! +${xpReward} XP earned!`)
        } else {
          toast.success(`🎉 Correct!`)
        }
        if (onComplete) onComplete()
      }
    } else {
      gamification.triggerSound('wrong')
    }
  }

  const handleRetry = () => {
    setSelected(null)
    setChecked(false)
  }

  const isCorrect = selected === correctIndex

  return (
    <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 lg:p-8 shadow-sm transition-all space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            <Sparkles size={16} />
          </span>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">Interactive Concept Challenge</h4>
        </div>
        <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
          +{xpReward} XP
        </span>
      </div>

      {/* Question Prompt */}
      <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">{question}</p>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((opt, idx) => {
          const isThisSelected = selected === idx
          const isThisCorrect = idx === correctIndex

          let style = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800'
          if (checked) {
            if (isThisCorrect) {
              style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
            } else if (isThisSelected && !isThisCorrect) {
              style = 'border-rose-400 bg-rose-50 text-rose-950 font-medium'
            }
          } else if (isThisSelected) {
            style = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-200'
          }

          return (
            <button
              key={idx}
              onClick={() => !checked && setSelected(idx)}
              disabled={checked}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {checked && isThisCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
              {checked && isThisSelected && !isThisCorrect && <XCircle size={18} className="text-rose-500" />}
            </button>
          )
        })}
      </div>

      {/* Hint Accordion */}
      {hint && !checked && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-indigo-600 font-bold hover:text-indigo-800 inline-flex items-center gap-1.5"
          >
            <Lightbulb size={14} className="text-amber-500" />
            {showHint ? 'Hide Hint' : 'Need a hint?'}
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              💡 <strong>Hint:</strong> {hint}
            </div>
          )}
        </div>
      )}

      {/* Feedback Banner on Checked */}
      {checked && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <p className="font-bold mb-1 flex items-center gap-1.5">
            {isCorrect ? '🎉 Great Job!' : '❌ Not Quite Right'}
          </p>
          <p>{explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between">
        {!checked ? (
          <Button
            onClick={handleCheck}
            disabled={selected === null}
            className="w-full sm:w-auto px-8"
            size="md"
          >
            Check Answer →
          </Button>
        ) : (
          <div className="flex items-center gap-3 w-full justify-end">
            {!isCorrect && (
              <Button onClick={handleRetry} variant="outline" size="sm" icon={<RefreshCw size={14} />}>
                Try Again
              </Button>
            )}
            {isCorrect && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                ✓ Mastered
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── 2. Matching Pairs Exercise Widget ─────────────────────────────────────────
export interface PairItem {
  id: string
  term: string
  definition: string
}

export function MatchingPairsExercise({
  title,
  pairs,
  xpReward = 15,
  onComplete,
}: {
  title: string
  pairs: PairItem[]
  xpReward?: number
  onComplete?: () => void
}) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedDef, setSelectedDef] = useState<string | null>(null)
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [wrongPair, setWrongPair] = useState<boolean>(false)
  const [finished, setFinished] = useState(false)

  // Shuffled definitions for the right column
  const [shuffledDefs] = useState(() => [...pairs].sort(() => Math.random() - 0.5))

  const handleSelectTerm = (id: string) => {
    if (matchedIds.includes(id)) return
    setSelectedTerm(id)
    if (selectedDef) checkMatch(id, selectedDef)
  }

  const handleSelectDef = (id: string) => {
    if (matchedIds.includes(id)) return
    setSelectedDef(id)
    if (selectedTerm) checkMatch(selectedTerm, id)
  }

  const checkMatch = (termId: string, defId: string) => {
    if (termId === defId) {
      // Match successful
      const updated = [...matchedIds, termId]
      setMatchedIds(updated)
      setSelectedTerm(null)
      setSelectedDef(null)
      gamification.triggerSound('correct')

      if (updated.length === pairs.length && !finished) {
        setFinished(true)
        const xpRes = gamification.addXP(xpReward, undefined, `exercise-pairs-${pairs.map(p => p.id).join('-').substring(0, 30)}`)
        gamification.launchConfetti()
        if (xpRes.awarded) {
          toast.success(`🎉 Perfect Match! You earned +${xpReward} XP!`)
        } else {
          toast.success(`🎉 Perfect Match!`)
        }
        if (onComplete) onComplete()
      }
    } else {
      // Match failed
      setWrongPair(true)
      gamification.triggerSound('wrong')
      setTimeout(() => {
        setSelectedTerm(null)
        setSelectedDef(null)
        setWrongPair(false)
      }, 700)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 rounded-3xl border-2 border-blue-200 p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Matching Challenge</span>
          <h4 className="text-base font-black text-slate-900 mt-0.5">{title}</h4>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
          +{xpReward} XP
        </span>
      </div>

      <p className="text-xs text-slate-600">
        Tap a <strong>concept term</strong> on the left, then tap its matching <strong>explanation</strong> on the right:
      </p>

      {/* Two-Column Matching Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Terms */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concept Terms</p>
          {pairs.map(pair => {
            const isMatched = matchedIds.includes(pair.id)
            const isSelected = selectedTerm === pair.id

            return (
              <button
                key={pair.id}
                onClick={() => handleSelectTerm(pair.id)}
                disabled={isMatched}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80'
                    : isSelected
                    ? wrongPair
                      ? 'bg-rose-50 border-rose-400 text-rose-900'
                      : 'bg-blue-100 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                }`}
              >
                <span>{pair.term}</span>
                {isMatched && <CheckCircle2 size={16} className="text-emerald-600" />}
              </button>
            )
          })}
        </div>

        {/* Right Column: Definitions */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matching Definitions</p>
          {shuffledDefs.map(pair => {
            const isMatched = matchedIds.includes(pair.id)
            const isSelected = selectedDef === pair.id

            return (
              <button
                key={pair.id}
                onClick={() => handleSelectDef(pair.id)}
                disabled={isMatched}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs sm:text-sm leading-snug flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80 font-medium'
                    : isSelected
                    ? wrongPair
                      ? 'bg-rose-50 border-rose-400 text-rose-900'
                      : 'bg-blue-100 border-blue-600 text-blue-950 font-bold shadow-md ring-2 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
                }`}
              >
                <span>{pair.definition}</span>
                {isMatched && <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 ml-2" />}
              </button>
            )
          })}
        </div>
      </div>

      {finished && (
        <div className="p-4 bg-emerald-100/70 border border-emerald-300 rounded-2xl text-center text-emerald-900 font-bold text-sm animate-bounce">
          🎉 All Pairs Matched Successfully! Concept Mastered!
        </div>
      )}
    </div>
  )
}

// ─── 3. Between-Section Image & Diagram Card ──────────────────────────────────
export function SectionImageCard({
  src,
  alt = 'Educational Illustration',
  caption,
  badge = 'Interactive Visual Diagram',
}: {
  src: string
  alt?: string
  caption?: string
  badge?: string
}) {
  const [zoom, setZoom] = useState(false)

  return (
    <div className="my-6 group">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
        {/* Visual Header */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold">
            <ImageIcon size={14} />
            <span>{badge}</span>
          </div>
          <button
            onClick={() => setZoom(true)}
            className="text-slate-400 hover:text-slate-700 flex items-center gap-1 transition"
          >
            <ZoomIn size={14} /> Zoom
          </button>
        </div>

        {/* Image Content */}
        <div className="p-4 bg-slate-900/5 flex items-center justify-center overflow-hidden">
          <img
            src={src}
            alt={alt}
            onClick={() => setZoom(true)}
            className="max-h-[380px] w-auto object-contain rounded-2xl shadow-sm cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="px-5 py-3 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100 flex items-start gap-2">
            <HelpCircle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="italic font-medium">{caption}</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-white rounded-3xl p-4 overflow-hidden shadow-2xl relative">
            <img src={src} alt={alt} className="max-h-[75vh] w-auto object-contain mx-auto rounded-2xl" />
            {caption && <p className="text-xs text-slate-700 text-center mt-3 font-medium">{caption}</p>}
            <button
              onClick={() => setZoom(false)}
              className="absolute top-3 right-3 bg-slate-900/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
