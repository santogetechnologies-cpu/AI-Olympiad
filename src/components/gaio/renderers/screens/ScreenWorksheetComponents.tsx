// ─────────────────────────────────────────────────────────────────────────────
// SCREEN WORKSHEET COMPONENTS — 100% VISUAL INTERACTIVE GAME MECHANICS
// Task 1: Category Sorting / Classification (Sort the Cards)
// Task 2: Visual Drawing & AI Picture Canvas (Creative Sketch)
// Task 3: Matching Pairs (Interactive Match the Pairs)
// Task 4: Complete the Pipeline / Sequence (ZERO fill-in-the-blanks typing)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react'
import type { GaioScreenItem } from '../../types'
import { Check, X, CheckCircle2, RotateCcw, Volume2, Sparkles, Layers, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'
import { showAuraToast } from '../../../../services/auraGuidanceToast'
import { VisualGameEngine, type VisualGameConfig } from '../../games/VisualGameEngine'
import confetti from 'canvas-confetti'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
}

// 1. WORKSHEET PART A • TASK 1: SORT THE CARDS (CLASSIFICATION)
export const ScreenWorksheetChoice: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawItems: any[] = payload.items && payload.items.length > 0 ? payload.items : [
    'Smart Phone Camera', 'Wooden Spoon', 'Autonomous Robot Vacuum', 'Plastic Chair', 'Smart AC'
  ]
  const instruction = payload.instruction || screen.subtitle || 'Sort each item: Does it use AI or is it a simple tool?'
  const taskTitle = payload.taskTitle || 'WORKSHEET PART A • TASK 1: SORT THE CARDS'

  const gameConfig: VisualGameConfig = {
    type: 'sort_cards',
    title: taskTitle,
    instruction: instruction,
    categories: [
      { id: 'cat_uses_ai', name: 'Uses Smart AI 🤖', icon: '⚡', color: 'border-sky-400 bg-sky-50' },
      { id: 'cat_simple', name: 'Simple Tool 🔨', icon: '🪑', color: 'border-amber-400 bg-amber-50' },
    ],
    cards: rawItems.map((item: any, idx: number) => {
      const name = typeof item === 'string' ? item : item.name || item.text || `Item ${idx + 1}`
      const isSimple = name.toLowerCase().includes('spoon') ||
                        name.toLowerCase().includes('chair') ||
                        name.toLowerCase().includes('paperclip') ||
                        name.toLowerCase().includes('rock') ||
                        name.toLowerCase().includes('simple')
      return {
        id: `wcard_${idx}`,
        text: name,
        categoryId: isSimple ? 'cat_simple' : 'cat_uses_ai',
        icon: isSimple ? '🔨' : '📱'
      }
    })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
            {taskTitle}
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            {instruction}
          </h2>
        </div>
        <button
          onClick={() => auraSpeechService.speak(instruction)}
          className="p-1.5 rounded-xl bg-sky-100 text-[#0288D1] hover:bg-sky-200 transition-colors shrink-0"
          title="Listen to Aura AI"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-sky-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('great_job', 'All cards sorted into correct categories!', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Visual Drawing Canvas</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 2. WORKSHEET PART A • TASK 2: DRAWING CANVAS & AI VISUAL PLACEHOLDER
export const ScreenWorksheetDraw: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const prompt = payload.prompt || 'Design your dream AI robot helper!'
  const namingPrompt = payload.namingPrompt || 'Give your AI robot a name...'
  const taskTitle = payload.taskTitle || 'WORKSHEET PART A • TASK 2: DESIGN LAB'
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [robotName, setRobotName] = useState(savedAnswer?.name || '')

  const startDraw = (e: any) => { setIsDrawing(true); draw(e) }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) {
      onSaveAnswer({ name: robotName, canvas: canvasRef.current.toDataURL() })
    }
  }

  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0288D1'
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
            {taskTitle}
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            {prompt}
          </h2>
        </div>
        <button
          onClick={() => auraSpeechService.speak(prompt)}
          className="p-1.5 rounded-xl bg-sky-100 text-[#0288D1] hover:bg-sky-200 transition-colors"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between my-1 p-2 rounded-2xl bg-sky-50/50 border border-sky-200 relative">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[10px] font-bold text-slate-600">Draw with your finger or mouse:</span>
          <button
            type="button"
            onClick={clearCanvas}
            className="text-[9px] font-bold text-slate-500 hover:text-red-500 flex items-center gap-0.5 cursor-pointer"
          >
            <RotateCcw size={10} /> Clear
          </button>
        </div>

        <div className="relative flex-1 w-full min-h-[140px] flex">
          <canvas
            ref={canvasRef}
            width={340}
            height={160}
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseMove={draw}
            onTouchStart={startDraw}
            onTouchEnd={stopDraw}
            onTouchMove={draw}
            className="w-full h-full bg-white rounded-xl border border-sky-300 touch-none cursor-crosshair shadow-2xs"
          />

          {/* Image Placeholder Overlay */}
          <div className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-sky-100/80 border border-sky-300 flex items-center gap-1 text-[9px] font-bold text-sky-800 pointer-events-none">
            <ImageIcon size={12} />
            <span>AI Design Placeholder</span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 shrink-0">Name:</span>
          <input
            type="text"
            value={robotName}
            onChange={(e) => {
              setRobotName(e.target.value)
              if (onSaveAnswer) onSaveAnswer({ name: e.target.value })
            }}
            placeholder={namingPrompt}
            className="flex-1 py-1 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold outline-hidden focus:border-[#0288D1]"
          />
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            showAuraToast('worksheet_complete', 'Robot Blueprint saved! Moving to Worksheet Part B.', true)
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Worksheet Part B</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 3. WORKSHEET PART B • TASK 1: MATCHING PAIRS
export const ScreenWorksheetMatching: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const rawPairs: any[] = payload.pairs && payload.pairs.length > 0 ? payload.pairs : [
    { left: 'Google Maps App', right: 'Calculates Fastest Route', icon: '🗺️' },
    { left: 'Smart Home Speaker', right: 'Understands Spoken Voice', icon: '🔊' },
    { left: 'Phone Camera', right: 'Recognizes Human Faces', icon: '📸' },
    { left: 'Language App', right: 'Translates Words Instantly', icon: '🌐' }
  ]
  const taskTitle = payload.taskTitle || 'WORKSHEET PART B • TASK 1: MATCH THE PAIRS'

  const gameConfig: VisualGameConfig = {
    type: 'match_pairs',
    title: taskTitle,
    instruction: 'Tap each item on the left, then tap its matching function on the right!',
    pairs: rawPairs.map((p: any, idx: number) => ({
      id: p.id || `wm_${idx}`,
      left: p.left || p.term || `Tool ${idx + 1}`,
      right: p.right || p.definition || `Function ${idx + 1}`,
      icon: p.icon || '⚡'
    }))
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
            {taskTitle}
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            Match each item on the left to its pair!
          </h2>
        </div>
        <button
          onClick={() => auraSpeechService.speak('Match each item on the left to its function on the right!')}
          className="p-1.5 rounded-xl bg-sky-100 text-[#0288D1] hover:bg-sky-200 transition-colors"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-sky-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('great_job', 'All pairs correctly matched!', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Next: Complete the AI Sequence</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// 4. WORKSHEET PART B • TASK 2: COMPLETE THE SEQUENCE (ZERO TYPING FILL-IN-BLANKS)
export const ScreenWorksheetBlanks: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const taskTitle = payload.taskTitle || 'WORKSHEET PART B • TASK 2: PIPELINE BUILDER'

  const gameConfig: VisualGameConfig = {
    type: 'build_sequence',
    title: taskTitle,
    instruction: 'Arrange these smart steps in order to complete the AI process!',
    sequence: [
      { id: 'b1', step: 1, text: 'Collect Training Photos', icon: '📷' },
      { id: 'b2', step: 2, text: 'Find Patterns in Data', icon: '🔍' },
      { id: 'b3', step: 3, text: 'Train Neural Network', icon: '🧠' },
      { id: 'b4', step: 4, text: 'AI Model Makes Prediction', icon: '✨' },
    ]
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[9px] font-black uppercase text-[#0288D1] tracking-wider">
            {taskTitle}
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            Arrange the AI learning process in order!
          </h2>
        </div>
        <button
          onClick={() => auraSpeechService.speak('Arrange the steps in the correct order to complete the AI pipeline!')}
          className="p-1.5 rounded-xl bg-sky-100 text-[#0288D1] hover:bg-sky-200 transition-colors"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="flex-1 min-h-0 my-1 bg-white/90 rounded-2xl border border-sky-200 p-2 shadow-xs">
        <VisualGameEngine
          config={gameConfig}
          savedState={savedAnswer}
          onSaveState={(s) => onSaveAnswer && onSaveAnswer(s)}
          onComplete={() => {
            showAuraToast('worksheet_complete', 'Worksheet complete! You are ready for Quiz Time.', true)
          }}
          onNext={onNext}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            gameAudio.playSuccess()
            showAuraToast('quiz_time', "Let's practise what you learned in Quiz Time!", true)
            onNext()
          }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0288D1] to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Worksheet Complete → Ready for Quiz Time!</span>
        </button>
      </div>
    </div>
  )
}
