// ─────────────────────────────────────────────────────────────────────────────
// PAGE TRACE & COLOUR RENDERER (PDF Page 13 & Page 23)
// Word Tracing + Interactive Color Bolt from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Check, Palette, RefreshCw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'

export interface PageTraceColourProps {
  pageConfig: GaioPageConfig
}

export const PageTraceColour: React.FC<PageTraceColourProps> = ({ pageConfig }) => {
  // Traced Words State
  const [tracedWords, setTracedWords] = useState<Record<string, boolean>>({})

  // Coloring Palette & Robot Part Colors
  const [selectedColor, setSelectedColor] = useState<string>('#0288D1') // Default Sky Blue
  const [robotColors, setRobotColors] = useState<Record<string, string>>({
    head: '#E1F5FE',
    chest: '#E1F5FE',
    arms: '#E1F5FE',
    visor: '#FFD54F'
  })

  const palette = [
    { color: '#0288D1', name: 'Sky Blue' },
    { color: '#FFB300', name: 'Golden' },
    { color: '#E53935', name: 'Coral Red' },
    { color: '#43A047', name: 'Emerald' },
    { color: '#8E24AA', name: 'Purple' },
    { color: '#37474F', name: 'Slate' }
  ]

  const traceWords = pageConfig.traceWords || ['ARTIFICIAL', 'INTELLIGENCE', 'HELPER']

  const handleTraceWord = (word: string) => {
    gameAudio.playSuccess()
    setTracedWords((prev) => ({ ...prev, [word]: true }))
  }

  const handlePaintPart = (part: string) => {
    gameAudio.playTap()
    setRobotColors((prev) => ({ ...prev, [part]: selectedColor }))
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 pb-1 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            1. Tap to trace magic words. 2. Pick color & tap Bolt to paint!
          </p>
        </div>
        <button
          onClick={() => {
            setTracedWords({})
            setRobotColors({ head: '#E1F5FE', chest: '#E1F5FE', arms: '#E1F5FE', visor: '#FFD54F' })
          }}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          title="Reset"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* 2. Interactive Word Tracing Strip */}
      <div className="space-y-1 shrink-0 py-1">
        <span className="text-[9px] font-black uppercase text-slate-600 block">
          1. Trace Magic Words:
        </span>
        <div className="flex items-center gap-1.5">
          {traceWords.map((word) => {
            const isDone = tracedWords[word]
            return (
              <button
                key={word}
                onClick={() => handleTraceWord(word)}
                className={`flex-1 py-1 px-1.5 rounded-xl border text-center transition-all cursor-pointer font-mono tracking-widest text-[9px] sm:text-[10px] font-black ${
                  isDone
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-2xs scale-102'
                    : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-slate-400'
                }`}
              >
                {isDone ? `✓ ${word}` : word}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Interactive Color Palette */}
      <div className="shrink-0 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
        <span className="text-[9px] font-black text-slate-600 flex items-center gap-1">
          <Palette size={12} className="text-[#0288D1]" /> Color:
        </span>
        <div className="flex items-center gap-1.5">
          {palette.map((p) => (
            <button
              key={p.color}
              onClick={() => {
                gameAudio.playTap()
                setSelectedColor(p.color)
              }}
              style={{ backgroundColor: p.color }}
              className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                selectedColor === p.color ? 'border-slate-900 scale-120 shadow-xs' : 'border-white'
              }`}
              title={p.name}
            />
          ))}
        </div>
      </div>

      {/* 4. Interactive Paint Bolt Canvas */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-1">
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex flex-col items-center justify-center">
          {/* Head & Ears */}
          <button
            onClick={() => handlePaintPart('head')}
            style={{ backgroundColor: robotColors.head }}
            className="w-16 h-12 rounded-2xl border-2 border-slate-800 flex items-center justify-center relative cursor-pointer shadow-xs transition-colors"
          >
            {/* Visor */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                handlePaintPart('visor')
              }}
              style={{ backgroundColor: robotColors.visor }}
              className="w-10 h-4 rounded-full border border-slate-800 flex items-center justify-center cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            {/* Antennas */}
            <div className="absolute -top-3 w-1.5 h-3 bg-slate-800" />
            <div className="absolute -top-4 w-3 h-3 rounded-full bg-amber-400 border border-slate-800" />
          </button>

          {/* Chest & Arms */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <button
              onClick={() => handlePaintPart('arms')}
              style={{ backgroundColor: robotColors.arms }}
              className="w-3.5 h-10 rounded-full border-2 border-slate-800 cursor-pointer shadow-xs transition-colors"
            />
            <button
              onClick={() => handlePaintPart('chest')}
              style={{ backgroundColor: robotColors.chest }}
              className="w-18 h-14 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center cursor-pointer shadow-xs transition-colors relative"
            >
              <div className="w-6 h-6 rounded-full bg-white/70 border border-slate-800 flex items-center justify-center">
                <Sparkles size={11} className="text-[#0288D1]" />
              </div>
              <span className="text-[7px] font-black text-slate-800 uppercase mt-0.5">BOLT</span>
            </button>
            <button
              onClick={() => handlePaintPart('arms')}
              style={{ backgroundColor: robotColors.arms }}
              className="w-3.5 h-10 rounded-full border-2 border-slate-800 cursor-pointer shadow-xs transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
