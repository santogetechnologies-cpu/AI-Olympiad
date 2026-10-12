// ─────────────────────────────────────────────────────────────────────────────
// KINDERGARTEN CONCEPT GLOSSARY MODAL
// Full searchable repository of all AI concepts with instant kindergarten stories.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react'
import { X, Search, Sparkles, Volume2, BookOpen, ChevronRight } from 'lucide-react'
import {
  KINDERGARTEN_CONCEPTS,
  type KindergartenConcept
} from './kindergartenConceptDictionary'
import { KindergartenAnalogyModal } from './KindergartenAnalogyModal'
import { gameAudio } from '../../utils/gameAudio'

export interface ConceptGlossaryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConceptGlossaryModal: React.FC<ConceptGlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedConcept, setSelectedConcept] = useState<KindergartenConcept | null>(null)

  const categories = [
    'All',
    'AI Foundations',
    'Neural Math & Architecture',
    'Machine Learning & Tuning',
    'NLP & Generative AI',
    'Robotics & Industry',
    'Ethics, Bias & Society'
  ]

  const filteredConcepts = useMemo(() => {
    let list = KINDERGARTEN_CONCEPTS
    if (activeCategory !== 'All') {
      list = list.filter((c) => c.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (c) =>
          c.term.toLowerCase().includes(q) ||
          c.simpleExplanation.toLowerCase().includes(q) ||
          c.kindergartenAnalogy.toLowerCase().includes(q) ||
          c.aliases?.some((a) => a.toLowerCase().includes(q))
      )
    }
    return list
  }, [activeCategory, searchQuery])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div className="w-full max-w-4xl h-[88vh] max-h-[800px] bg-slate-900 border border-cyan-800/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
          {/* Header */}
          <div className="shrink-0 p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
                  <span>👶 Kindergarten AI Concept Decoders</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Detailed, friendly explanations & playground analogies for every single technical term!
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

          {/* Search & Categories Bar */}
          <div className="shrink-0 p-3 sm:px-6 bg-slate-950/50 border-b border-slate-800/80 space-y-2.5">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search concepts: 'weight', 'loss', 'prompt', 'bias', 'overfitting'..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {categories.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      gameAudio.playTap()
                      setActiveCategory(cat)
                    }}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-cyan-500 text-slate-950 shadow-xs'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Concept Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredConcepts.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  gameAudio.playTap()
                  setSelectedConcept(item)
                }}
                className="p-4 rounded-2xl bg-slate-950/50 hover:bg-slate-850 hover:border-cyan-500/50 border border-slate-800/80 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.term}
                  </h3>

                  <p className="text-xs text-amber-200/90 line-clamp-2 mt-1.5 italic font-medium">
                    "{item.kindergartenAnalogy}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[200px]">{item.simpleExplanation}</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Story</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Concept Deep Modal */}
      <KindergartenAnalogyModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
      />
    </>
  )
}
