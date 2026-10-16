// ─────────────────────────────────────────────────────────────────────────────
// PDF WORD OVERLAY LAYER
// Transparent interactive word hitboxes for tap-to-speak, spell mode,
// karaoke glowing highlight box, and floating word explorer popup
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { PageWordItem } from '../hooks/usePdfInteractiveLayer'
import { Volume2, Sparkles, Mic, BookOpen, X, Check } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'

export interface PdfWordOverlayProps {
  words: PageWordItem[]
  activeWordId: string | null
  activeWordIndex: number | null
  isReadingAloud: boolean
  isReadMode: boolean
  pageWidth: number
  pageHeight: number
  onWordClick: (item: PageWordItem) => void
  onWordSpell: (item: PageWordItem) => void
  onStartSayWord?: (word: string) => void
  onWordPointerDown: (item: PageWordItem) => void
  onWordPointerUp: (item: PageWordItem) => void
  onWordPointerCancel: () => void
}

export const PdfWordOverlay: React.FC<PdfWordOverlayProps> = ({
  words,
  activeWordId,
  isReadingAloud,
  isReadMode,
  pageWidth,
  pageHeight,
  onWordClick,
  onWordSpell,
  onStartSayWord,
  onWordPointerDown,
  onWordPointerUp,
  onWordPointerCancel
}) => {
  const [selectedWord, setSelectedWord] = useState<PageWordItem | null>(null)

  if (!isReadMode && !isReadingAloud) {
    return null
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
      style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
    >
      {/* Interactive Word Hitboxes */}
      {words.map((item) => {
        const isActive = activeWordId === item.id
        const isSelected = selectedWord?.id === item.id

        return (
          <button
            key={item.id}
            type="button"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.w}px`,
              height: `${item.h}px`,
            }}
            onPointerDown={() => onWordPointerDown(item)}
            onPointerUp={() => {
              onWordPointerUp(item)
              setSelectedWord(item)
            }}
            onPointerCancel={onWordPointerCancel}
            title={`Tap to speak "${item.cleanWord}"`}
            className={`absolute pointer-events-auto rounded-md transition-all duration-150 focus:outline-none select-none ${
              isActive
                ? 'bg-amber-400/50 ring-4 ring-amber-300 shadow-xl scale-110 z-30 animate-pulse'
                : isSelected
                ? 'bg-blue-400/30 ring-2 ring-blue-500 z-20'
                : 'hover:bg-blue-400/20 hover:ring-1 hover:ring-blue-400/50 cursor-pointer'
            }`}
          />
        )
      })}

      {/* Floating Word Explorer Popup Card */}
      {selectedWord && isReadMode && !isReadingAloud && (
        <div
          style={{
            left: `${Math.min(pageWidth - 220, Math.max(20, selectedWord.x - 60))}px`,
            top: `${Math.max(10, selectedWord.y - 75)}px`,
          }}
          className="absolute pointer-events-auto z-40 bg-slate-900/95 backdrop-blur-md text-white p-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Word Label */}
          <div className="px-2">
            <div className="text-xs font-black text-amber-300 tracking-wide uppercase">Word</div>
            <div className="text-sm font-black text-white">{selectedWord.cleanWord}</div>
          </div>

          <div className="w-px h-6 bg-white/20 mx-0.5" />

          {/* Speak Button */}
          <button
            onClick={() => {
              onWordClick(selectedWord)
              gameAudio.playTap()
            }}
            title="Hear word"
            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
          >
            <Volume2 size={15} />
            <span className="hidden sm:inline">Hear</span>
          </button>

          {/* Spell Mode */}
          <button
            onClick={() => {
              onWordSpell(selectedWord)
              gameAudio.playCoin()
            }}
            title="Spell letters"
            className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
          >
            <Sparkles size={15} />
            <span>Spell</span>
          </button>

          {/* Say The Word (Mic practice) */}
          {onStartSayWord && (
            <button
              onClick={() => {
                onStartSayWord(selectedWord.cleanWord)
                setSelectedWord(null)
              }}
              title="Practice saying this word into mic"
              className="p-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
            >
              <Mic size={15} />
              <span>Say It</span>
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setSelectedWord(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
