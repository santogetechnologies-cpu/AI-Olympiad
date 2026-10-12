import React, { useState } from 'react'
import {
  X, Search, Sparkles, HelpCircle, Heart, BookOpen, Lightbulb,
  CheckCircle2, Compass, Layers, Zap
} from 'lucide-react'
import {
  KINDERGARTEN_CONCEPTS_DATABASE,
  KindergartenExplainerService,
  type KindergartenConcept
} from '../../services/kindergartenExplainerService'
import { gameAudio } from '../../utils/gameAudio'

export interface KindergartenExplainerModalProps {
  isOpen: boolean
  onClose: () => void
  initialSearchQuery?: string
  currentLevelKey?: 'ug1' | 'ug2' | 'ug3' | 'ug4' | 'pg1' | 'pg2'
}

export const KindergartenExplainerModal: React.FC<KindergartenExplainerModalProps> = ({
  isOpen,
  onClose,
  initialSearchQuery = '',
  currentLevelKey
}) => {
  const [search, setSearch] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeConcept, setActiveConcept] = useState<KindergartenConcept | null>(() => {
    if (initialSearchQuery) {
      const match = KindergartenExplainerService.findByTerm(initialSearchQuery)
      if (match) return match
    }
    return KINDERGARTEN_CONCEPTS_DATABASE[0]
  })

  if (!isOpen) return null

  const filteredConcepts = KINDERGARTEN_CONCEPTS_DATABASE.filter(c => {
    const matchesSearch =
      !search ||
      c.technicalTerm.toLowerCase().includes(search.toLowerCase()) ||
      c.kindergartenTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.simpleStory.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some(k => k.includes(search.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'all' || c.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* ─── MODAL HEADER ──────────────────────────────────────────────── */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xl shadow-lg">
              🧸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  KINDERGARTEN AI DICTIONARY (ELI5)
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Every concept made simple</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                Understand Any Scary AI Term Like a 5-Year-Old
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ─── SEARCH & FILTER BAR ───────────────────────────────────────── */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/50 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search any scary word (e.g. Tensor, Backprop, Attention, LoRA, Diffusion)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-mono">
            {[
              { id: 'all', label: 'All Terms' },
              { id: 'foundations', label: 'Foundations' },
              { id: 'deep_learning', label: 'Deep Learning' },
              { id: 'llms', label: 'LLMs & GenAI' },
              { id: 'mlops', label: 'MLOps' },
              { id: 'research', label: 'Research' },
              { id: 'safety', label: 'Safety' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── DUAL PANE: LIST & DETAIL VIEW ────────────────────────────── */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Left: Concept List */}
          <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-slate-800 overflow-y-auto p-3 space-y-1.5 shrink-0 max-h-48 md:max-h-full">
            {filteredConcepts.map(concept => {
              const isSelected = activeConcept?.id === concept.id
              return (
                <button
                  key={concept.id}
                  onClick={() => {
                    gameAudio.playTap()
                    setActiveConcept(concept)
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-xl shrink-0">{concept.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate text-slate-100">
                      {concept.kindergartenTitle}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {concept.technicalTerm}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Rich Story & Playground Detail */}
          {activeConcept ? (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-900/40">
              {/* Concept Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{activeConcept.emoji}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 uppercase font-bold border border-slate-700">
                    Levels: {activeConcept.levels.map(l => l.toUpperCase()).join(', ')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {activeConcept.kindergartenTitle}
                </h3>
                <p className="text-xs font-mono text-amber-300">
                  Technical Term: <strong>{activeConcept.technicalTerm}</strong>
                </p>
              </div>

              {/* 1. The Simple Story (Kindergarten Level) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <span>🧸 1. The Simple Story (Explain Like I'm 5)</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
                  {activeConcept.simpleStory}
                </div>
              </div>

              {/* 2. Toy Analogy */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>2. The Everyday Toy Analogy</span>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs sm:text-sm text-cyan-200/90 leading-relaxed">
                  {activeConcept.toyAnalogy}
                </div>
              </div>

              {/* 3. Playground Game */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Compass size={14} />
                  <span>3. How it Works on a Playground</span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {activeConcept.howItWorksInPlayground}
                </div>
              </div>

              {/* 4. Why Scientists Care */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  <Lightbulb size={14} />
                  <span>4. Why Top AI Engineers Care</span>
                </div>
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
                  {activeConcept.whyScientistsCare}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-slate-500 text-xs">
              Select any concept on the left to read its kindergarten story!
            </div>
          )}
        </div>

        {/* ─── MODAL FOOTER ──────────────────────────────────────────────── */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            🧸 Never be intimidated by big words — every AI idea is just a simple game!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
          >
            I Understand Now! Return to Mission
          </button>
        </div>
      </div>
    </div>
  )
}
