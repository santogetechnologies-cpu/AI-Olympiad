// ─────────────────────────────────────────────────────────────────────────────
// JARGON BUSTER MODAL (EXPLAIN TO ME LIKE I'M 5)
// Instant kid-friendly analogies and crystal-clear explanations for every AI term
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import {
  MIDDLE_LEVEL_GLOSSARY,
  searchGlossary,
  type GlossaryTerm
} from './data/middleLevelGlossary'
import {
  X,
  Search,
  Lightbulb,
  Sparkles,
  BookOpen,
  Volume2,
  Smile,
  Cookie,
  Globe,
  HelpCircle
} from 'lucide-react'
import { gameAudio } from '../../utils/gameAudio'
import { gaioSpeechService } from '../../services/auraSpeechService'

export interface JargonBusterModalProps {
  isOpen: boolean
  onClose: () => void
  initialTermId?: string
}

const CATEGORIES = [
  'All',
  'AI Basics',
  'Coding & Data',
  'AI Applications',
  'Tools & GenAI',
  'Ethics & Privacy'
]

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose,
  initialTermId
}) => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTermId, setSelectedTermId] = useState<string>(
    initialTermId || MIDDLE_LEVEL_GLOSSARY[0].id
  )

  const filteredTerms = useMemo(() => {
    let list = searchGlossary(search)
    if (selectedCategory !== 'All') {
      list = list.filter((t) => t.category === selectedCategory)
    }
    return list
  }, [search, selectedCategory])

  const activeTerm: GlossaryTerm = useMemo(() => {
    const found = MIDDLE_LEVEL_GLOSSARY.find((t) => t.id === selectedTermId)
    return found || filteredTerms[0] || MIDDLE_LEVEL_GLOSSARY[0]
  }, [selectedTermId, filteredTerms])

  if (!isOpen) return null

  const handleSpeak = (text: string) => {
    gameAudio.playTap()
    gaioSpeechService.speak(text)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-3xl h-[90vh] max-h-[760px] bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lightbulb size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  AI Jargon Buster
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                  Explain Like I'm 5! 👶
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Simple real-life stories & analogies for tricky technical terms
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              gameAudio.playTap()
              gaioSpeechService.stop()
              onClose()
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-3 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms (e.g. Latency, Overfitting, Algorithm)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
            {CATEGORIES.map((cat) => {
              const isSelected = cat === selectedCategory
              return (
                <button
                  key={cat}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedCategory(cat)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Layout: Term List & Detail Panel */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Term List Navigation */}
          <div className="md:col-span-5 border-r border-slate-800/80 overflow-y-auto p-2 space-y-1.5 bg-slate-950/60 max-h-[220px] md:max-h-full">
            {filteredTerms.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No terms found. Try another word!
              </div>
            ) : (
              filteredTerms.map((t) => {
                const isSelected = t.id === activeTerm?.id
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      gameAudio.playTap()
                      setSelectedTermId(t.id)
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500/80 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-white truncate">
                        {t.term}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {t.inOneSentence}
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                      {t.category.split(' ')[0]}
                    </span>
                  </button>
                )
              })
            )}
          </div>

          {/* Right: Rich Super-Analogy Explainer Card */}
          <div className="md:col-span-7 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between space-y-4 bg-slate-900/90">
            {activeTerm && (
              <div className="space-y-4">
                {/* Term Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                      {activeTerm.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      {activeTerm.term}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      handleSpeak(
                        `${activeTerm.term}. In simple words: ${activeTerm.inOneSentence}. Here is a story: ${activeTerm.superAnalogy}`
                      )
                    }
                    className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
                    title="Read Aloud"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                {/* 1. Plain English One-Liner */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1 mb-1">
                    <Smile size={12} /> In Plain English (One Sentence):
                  </span>
                  <p className="text-slate-100 text-sm font-semibold leading-snug">
                    {activeTerm.inOneSentence}
                  </p>
                </div>

                {/* 2. The Kindergarten Story Analogy (Big Highlight) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-yellow-950/20 to-slate-950 border-2 border-amber-500/40 shadow-xl">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
                    <Cookie size={16} className="text-amber-400" />
                    <span>Storytime Analogy (Even a 5-Year-Old Gets This!):</span>
                  </div>
                  <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed font-medium">
                    {activeTerm.superAnalogy}
                  </p>
                </div>

                {/* 3. Real World Example */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                    <Globe size={12} /> Where You See It In Real Life:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {activeTerm.realWorldExample}
                  </p>
                </div>

                {/* 4. Fun Fact */}
                <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200 text-xs flex items-start gap-2">
                  <Sparkles size={14} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-purple-300">Fun Fact:</strong>{' '}
                    {activeTerm.funFact}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>Click any word to get the simplest plain-English analogy</span>
          <span className="font-mono text-amber-400">AI Olympiad Plain English Engine</span>
        </div>
      </div>
    </div>
  )
}
