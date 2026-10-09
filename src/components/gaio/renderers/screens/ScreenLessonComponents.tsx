// ─────────────────────────────────────────────────────────────────────────────
// SCREEN LESSON COMPONENTS (Months 1 to 6 Core Lessons & Stories)
// Month Cover • Let's Learn Intro & Words • Picture Story Parts 1 & 2 •
// Look Around You Grid & Bolt • Let's Do It Steps & Reflection
// All content driven from screen.payload — NO hardcoded topic content!
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react'
import type { GaioScreenItem } from '../../types'
import { Volume2, Sparkles, BookOpen, Compass, CheckCircle2, MessageSquare, Gamepad2, ChevronRight, RotateCcw } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
}

// 1. MONTH COVER
export const ScreenMonthCover: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const payload = screen.payload || {}
  const topics = payload.topics || []

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none text-slate-800 bg-gradient-to-b from-sky-50 via-white to-sky-100 rounded-2xl animate-in fade-in duration-200">
      <div className="text-center pt-2">
        <span className="px-3 py-1 rounded-full bg-[#0288D1]/10 text-[#0288D1] font-black text-xs border border-sky-200">
          MONTH {screen.monthNumber} • GAIO CURRICULUM
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
          {screen.title}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-sky-700">
          {screen.subtitle}
        </p>
      </div>

      {/* Topics Overview */}
      <div className="my-auto space-y-2 max-w-sm mx-auto w-full">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block text-center">
          In this unit, you will explore:
        </span>
        {topics.map((tp: any, idx: number) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-white border-2 border-sky-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-[#0288D1]">
                TOPIC {tp.topicNumber}
              </span>
              <h3 className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">
                {tp.title}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Area: {tp.area}
              </p>
            </div>
            <span className="text-2xl">🚀</span>
          </div>
        ))}
      </div>

      <div className="pb-1">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="w-full py-3 rounded-2xl bg-[#0288D1] hover:bg-sky-600 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Start Topic {topics[0]?.topicNumber || 1}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// 2. LET'S LEARN INTRO (Concept & Helper Cards) — payload-driven
export const ScreenLetsLearnIntro: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const [activeHelper, setActiveHelper] = useState<number | null>(null)
  const payload = screen.payload || {}

  // Use concepts from payload
  const concepts: string[] = payload.concepts || [
    'AI is a smart helper that can learn.',
    'AI helps machines think a little like us.',
    'AI can be found in phones, robots, and computers.',
  ]

  // Use examples/helpers from payload
  const helperIcons = ['📱', '🔊', '🤖', '💻', '🚗', '📷']
  const rawHelpers: string[] = payload.helpers || []
  const helpers = rawHelpers.slice(0, 4).map((h: string, i: number) => ({
    name: h,
    icon: helperIcons[i] || '🤖'
  }))
  const displayHelpers = helpers.length > 0 ? helpers : [
    { name: 'Smart phone', icon: '📱' },
    { name: 'Smart speaker', icon: '🔊' },
    { name: 'Robot helper', icon: '🤖' },
    { name: 'Computer', icon: '💻' },
  ]

  const handleRead = () => {
    gameAudio.playTap()
    auraSpeechService.speak(`${screen.title}. ${concepts.join('. ')}`)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#1E88E5] text-white rounded-2xl p-2 sm:p-2.5 flex items-center justify-between shadow-xs shrink-0">
        <div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-sky-100">
            {screen.pageHeaderTitle}
          </span>
          <h2 className="text-xs sm:text-sm font-black leading-tight">
            {screen.title}
          </h2>
        </div>
        <button
          onClick={handleRead}
          className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          title="Read Aloud"
        >
          <Volume2 size={15} />
        </button>
      </div>

      {/* PDF Hero Banner — Authentic 1400x560 Illustration */}
      <div className="shrink-0 my-1 rounded-2xl overflow-hidden border-2 border-sky-300 shadow-xs h-24 sm:h-28 bg-white relative flex items-center justify-center p-1">
        <img
          src={payload.heroImage || screen.sectionCropImage || screen.sourcePdfImage}
          alt={screen.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Concept Box — topic-specific! */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-2 shrink-0 space-y-1">
        <div className="flex items-center gap-1.5 text-[#0288D1] font-black text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#0288D1]" />
          <span>LET'S LEARN</span>
        </div>
        <div className="space-y-0.5 text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
          {concepts.map((c, i) => (
            <p key={i} className="flex items-start gap-1">
              <span className="text-amber-500 text-xs shrink-0 mt-0.5">★</span>
              {c}
            </p>
          ))}
        </div>
      </div>

      {/* Interactive Helper Grid with Authentic Illustrations */}
      <div className="shrink-0 pt-1">
        <span className="text-[10px] font-black text-slate-700 block mb-1">
          👀 Tap to explore: <span className="font-normal text-slate-500">(tap each)</span>
        </span>
        <div className="grid grid-cols-4 gap-1">
          {displayHelpers.map((h: any, idx: number) => {
            const itemImg = payload.itemImages && payload.itemImages[idx]

            return (
              <button
                key={idx}
                onClick={() => {
                  gameAudio.playTap()
                  setActiveHelper(activeHelper === idx ? null : idx)
                  auraSpeechService.speak(h.name)
                }}
                className={`p-1 rounded-xl border text-center transition-all flex flex-col items-center justify-between cursor-pointer ${
                  activeHelper === idx
                    ? 'bg-sky-200 border-[#0288D1] scale-105 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-slate-50 p-0.5">
                  {itemImg ? (
                    <img src={itemImg} alt={h.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-lg">{h.icon}</span>
                  )}
                </div>
                <span className="text-[8.5px] font-black text-slate-800 truncate w-full leading-tight mt-0.5">
                  {h.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="shrink-0 pt-1.5">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Magic Words →
        </button>
      </div>
    </div>
  )
}

// 3. LET'S LEARN WORDS (Magic Words) — payload-driven
export const ScreenLetsLearnWords: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const payload = screen.payload || {}
  const magicWords = payload.magicWords || [
    { word: 'AI', definition: 'A smart helper that thinks and learns a little' },
    { word: 'Machine', definition: 'A thing that does work to make our lives easier' },
    { word: 'Smart', definition: 'Can learn and respond to instructions' }
  ]

  const [tappedIndex, setTappedIndex] = useState<number | null>(null)

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 flex items-center justify-center gap-1">
          <Sparkles size={12} className="text-amber-500" />
          VOCABULARY BUILDER
        </span>
        <h2 className="text-sm sm:text-base font-black text-slate-900">
          Magic Words: {payload.topicTitle || screen.topicTitle}
        </h2>
        <p className="text-[10px] text-slate-500">
          Tap each card to hear pronunciation and meaning!
        </p>
      </div>

      {/* Magic Word Cards */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {magicWords.map((mw: any, idx: number) => {
          const isSelected = tappedIndex === idx
          return (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playSuccess()
                setTappedIndex(idx)
                auraSpeechService.speak(`${mw.word}. Meaning: ${mw.definition}`)
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 shadow-md scale-102'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <span className="text-amber-500">✨</span>
                  {mw.word}
                </span>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 leading-snug">
                  {mw.definition}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-white/80 text-[#0288D1] shrink-0 ml-2 shadow-2xs">
                <Volume2 size={16} />
              </div>
            </button>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
        >
          Next: Picture Story →
        </button>
      </div>
    </div>
  )
}

// 4. PICTURE STORY PART 1 — payload-driven
export const ScreenPictureStoryPart1: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const payload = screen.payload || {}
  const storyTitle = payload.storyTitle || screen.topicTitle || 'Picture Story'
  const rawPanels: any[] = payload.panels || []

  // Build display panels (up to 2 for Part 1)
  const displayPanels = rawPanels.slice(0, 2).length > 0
    ? rawPanels.slice(0, 2).map((p: any, i: number) => ({
        num: i + 1,
        speaker: p.speaker || 'Bolt',
        text: p.speech || p.text || '',
        emoji: p.emoji || (p.speaker === 'Bolt' ? '🤖' : '😊'),
      }))
    : [
        { num: 1, speaker: 'Bolt', text: `Hello! Let's learn about ${storyTitle}!`, emoji: '🤖' },
        { num: 2, speaker: 'Student', text: `Wow, tell me more, Bolt!`, emoji: '😊' },
      ]

  const handleRead = (txt: string) => {
    gameAudio.playTap()
    auraSpeechService.speak(txt)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-sky-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-sky-200">
            PICTURE STORY • PART 1 OF 2
          </span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">
            {storyTitle}
          </h2>
        </div>
        <button
          onClick={() => handleRead(displayPanels.map((p) => `${p.speaker} says: ${p.text}`).join('. '))}
          className="p-1 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          title="Read Panels"
        >
          <Volume2 size={14} />
        </button>
      </div>

      {/* 2 Story Panels with Authentic Illustrations */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {displayPanels.map((p, idx) => {
          const panelImg = payload.storyImages && payload.storyImages[idx]

          return (
            <div
              key={p.num}
              onClick={() => handleRead(`${p.speaker} says: ${p.text}`)}
              className="p-2 rounded-2xl bg-white border-2 border-sky-200 shadow-xs flex flex-col gap-1 cursor-pointer hover:border-sky-400 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-[#0288D1]">
                  PANEL {p.num} • {p.speaker.toUpperCase()}
                </span>
                <Volume2 size={13} className="text-slate-400" />
              </div>
              <div className="flex gap-2.5 items-center">
                <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-sky-50 border border-sky-200 shrink-0 flex items-center justify-center shadow-2xs">
                  {panelImg ? (
                    <img src={panelImg} alt={`Panel ${p.num}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{p.emoji}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    "{p.text}"
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: Story Panels 3 & 4 →
        </button>
      </div>
    </div>
  )
}

// 5. PICTURE STORY PART 2 (Panels 3 & 4 + Draw Picture 5)
export const ScreenPictureStoryPart2: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const storyTitle = payload.storyTitle || screen.topicTitle || 'Picture Story'
  const rawPanels: any[] = payload.panels || []
  const discussionPrompt = payload.discussionPrompt || 'What happened in the story? What would YOU do?'
  const drawPrompt = payload.drawPrompt || 'What happens next? Draw picture 5!'
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [penColor, setPenColor] = useState('#0288D1')

  const displayPanels = rawPanels.slice(0, 2).length > 0
    ? rawPanels.slice(0, 2).map((p: any, i: number) => ({
        num: i + 3,
        speaker: p.speaker || 'Bolt',
        text: p.speech || p.text || '',
        emoji: p.emoji || (p.speaker === 'Bolt' ? '🤖' : '😊'),
      }))
    : [
        { num: 3, speaker: 'Bolt', text: `That is how it works! Remember: ${storyTitle}!`, emoji: '🤖' },
        { num: 4, speaker: 'Student', text: 'I understand now! Thanks Bolt!', emoji: '😊' },
      ]

  const handleRead = (txt: string) => {
    gameAudio.playTap()
    auraSpeechService.speak(txt)
  }

  const startDraw = (e: any) => { setIsDrawing(true); draw(e) }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) onSaveAnswer(canvasRef.current.toDataURL())
  }
  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = penColor
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    if (onSaveAnswer) onSaveAnswer(null)
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-sky-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-sky-200">PICTURE STORY • PART 2 OF 2</span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">{storyTitle}</h2>
        </div>
        <button onClick={() => handleRead(displayPanels.map((p) => p.text).join('. '))} className="p-1 rounded-xl bg-white/20 text-white cursor-pointer">
          <Volume2 size={14} />
        </button>
      </div>

      {/* Panels 3 & 4 with Authentic Artwork */}
      <div className="shrink-0 space-y-1 pt-1">
        {displayPanels.map((p, idx) => {
          // Panels 3 & 4 map to index 2 & 3 or 0 & 1 of second slice
          const panelImg = payload.storyImages && (payload.storyImages[idx + 2] || payload.storyImages[idx])

          return (
            <div
              key={p.num}
              onClick={() => handleRead(`${p.speaker} says: ${p.text}`)}
              className="p-1.5 rounded-xl bg-white border border-sky-200 flex items-center gap-2 cursor-pointer hover:bg-sky-50 transition-all shadow-2xs"
            >
              <div className="w-16 h-12 rounded-lg bg-sky-50 border border-sky-200 overflow-hidden shrink-0 flex items-center justify-center">
                {panelImg ? (
                  <img src={panelImg} alt={`Panel ${p.num}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">{p.emoji}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[8px] font-black text-sky-600 uppercase block leading-none">
                  PANEL {p.num} • {p.speaker}
                </span>
                <p className="text-[10px] font-bold text-slate-800 leading-snug line-clamp-2">
                  "{p.text}"
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Drawing canvas for Picture 5 */}
      <div className="flex-1 min-h-0 flex flex-col py-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black text-slate-700">🎨 {drawPrompt}</span>
          <div className="flex items-center gap-1">
            {['#0288D1', '#EF4444', '#10B981', '#F59E0B'].map((c) => (
              <button key={c} onClick={() => setPenColor(c)}
                className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${penColor === c ? 'scale-125 border-white shadow' : 'border-transparent'}`}
                style={{ background: c }} />
            ))}
            <button onClick={clearCanvas} className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer ml-1">
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={320} height={120}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
          className="w-full flex-1 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 cursor-crosshair touch-none"
          style={{ maxHeight: '100px' }}
        />
      </div>

      {/* Talk About It */}
      <div className="shrink-0 bg-amber-50 border border-amber-200 rounded-xl p-1.5 mb-1">
        <span className="text-[10px] font-black text-amber-700">💬 Talk About It: </span>
        <span className="text-[10px] text-amber-700">{discussionPrompt}</span>
      </div>

      <div className="shrink-0">
        <button onClick={onNext} className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer">
          Next: Look Around You →
        </button>
      </div>
    </div>
  )
}

// 6. LOOK AROUND GRID — payload-driven
export const ScreenLookAroundGrid: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const payload = screen.payload || {}
  const examples: string[] = payload.examples || []
  const topicTitle = payload.topicTitle || screen.topicTitle || 'AI'
  const iSpyPrompt = payload.iSpyPrompt || `Find one example of ${topicTitle.toLowerCase()} near you!`

  const itemIcons = ['📱', '🔊', '🤖', '💻', '🚗', '📷', '🏠', '📡', '🖥️', '🎙️']

  const displayItems = examples.slice(0, 6).map((ex: string, i: number) => ({
    label: ex,
    icon: itemIcons[i] || '🤖'
  }))

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-emerald-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-emerald-100">LOOK AROUND YOU • PART 1 OF 2</span>
          <h2 className="text-xs sm:text-sm font-black truncate max-w-[220px]">{screen.title}</h2>
        </div>
        <Compass size={16} className="text-emerald-200" />
      </div>

      <p className="text-[10px] text-slate-600 font-bold pt-1 px-1">
        👀 Can you spot these in real life? Tap to learn!
      </p>

      <div className="flex-1 grid grid-cols-3 gap-1.5 py-1 content-center">
        {displayItems.map((item: any, i: number) => {
          const itemImg = payload.itemImages && payload.itemImages[i]

          return (
            <button
              key={i}
              onClick={() => {
                gameAudio.playTap()
                auraSpeechService.speak(item.label)
              }}
              className="rounded-2xl bg-white border-2 border-emerald-200 p-1.5 flex flex-col items-center justify-center gap-1 hover:bg-emerald-50 hover:border-emerald-400 transition-all cursor-pointer text-center shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50/50 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                {itemImg ? (
                  <img src={itemImg} alt={item.label} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-2xl">{item.icon}</span>
                )}
              </div>
              <span className="text-[9px] font-black text-slate-800 leading-tight truncate w-full">
                {item.label}
              </span>
            </button>
          )
        })}
        {displayItems.length === 0 && (
          <div className="col-span-3 flex items-center justify-center text-slate-400 text-xs">
            Explore what's around you!
          </div>
        )}
      </div>

      <div className="shrink-0 bg-sky-50 border border-sky-200 rounded-xl p-2">
        <p className="text-[10px] font-black text-[#0288D1]">🔍 I SPY AI: {iSpyPrompt}</p>
      </div>

      <div className="shrink-0 pt-1.5">
        <button onClick={onNext} className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer">
          Next: Bolt Says & Fun Fact →
        </button>
      </div>
    </div>
  )
}

// 7. LOOK AROUND BOLT — payload-driven
export const ScreenLookAroundBolt: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const boltSays = payload.boltSays || `Look around you! You can find ${payload.topicTitle || screen.topicTitle} everywhere!`
  const funFact = payload.funFact || 'AI is becoming more common every day!'
  const iSpyPrompt = payload.iSpyPrompt || 'Draw one AI helper you saw today!'
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const startDraw = (e: any) => { setIsDrawing(true); draw(e) }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) onSaveAnswer(canvasRef.current.toDataURL())
  }
  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#10B981'
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y)
  }
  const clearCanvas = () => { canvasRef.current?.getContext('2d')?.clearRect(0, 0, 999, 999); if (onSaveAnswer) onSaveAnswer(null) }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-emerald-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-emerald-100">LOOK AROUND YOU • PART 2 OF 2</span>
          <h2 className="text-xs sm:text-sm font-black">{screen.title}</h2>
        </div>
        <Compass size={16} className="text-emerald-200" />
      </div>

      {/* Bolt Says with Authentic Mascot Art */}
      <div className="shrink-0 bg-sky-50 border-2 border-sky-200 rounded-2xl p-2 flex gap-2.5 items-center my-1 shadow-2xs">
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-white border border-sky-200 p-0.5 flex items-center justify-center">
          <img
            src={payload.mascotImage || '/gaio/class3/page_assets/page_2/img_17_288x288.jpeg'}
            alt="Bolt"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[9px] font-black uppercase text-[#0288D1]">BOLT SAYS</span>
          <p className="text-[11px] font-bold text-slate-800 leading-snug">{boltSays}</p>
        </div>
      </div>

      {/* Fun Fact with Lightbulb Graphic */}
      <div className="shrink-0 bg-amber-50 border-2 border-amber-200 rounded-2xl p-2 flex gap-2.5 items-center shadow-2xs">
        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 bg-amber-100 border border-amber-300 flex items-center justify-center text-xl">
          💡
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[9px] font-black uppercase text-amber-700">FUN FACT</span>
          <p className="text-[11px] font-bold text-slate-800 leading-snug">{funFact}</p>
        </div>
      </div>

      {/* I Spy Drawing */}
      <div className="flex-1 min-h-0 flex flex-col py-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black text-slate-700">✏️ {iSpyPrompt}</span>
          <button onClick={clearCanvas} className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer">
            <RotateCcw size={12} />
          </button>
        </div>
        <canvas
          ref={canvasRef} width={320} height={80}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
          className="w-full rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 cursor-crosshair touch-none"
          style={{ height: '80px' }}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button onClick={onNext} className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer">
          Next: Let's Do It! →
        </button>
      </div>
    </div>
  )
}

// 8. LET'S DO IT STEPS — payload-driven
export const ScreenLetsDoItSteps: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const steps: any[] = payload.steps || [
    { step: 1, desc: 'Read the activity instructions carefully.' },
    { step: 2, desc: 'Gather your materials and workspace.' },
    { step: 3, desc: 'Complete the activity step by step.' },
    { step: 4, desc: 'Share your result with your class!' },
  ]
  const topicTitle = payload.topicTitle || screen.topicTitle || 'Activity'

  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set(savedAnswer?.checked || []))

  const toggleStep = (idx: number) => {
    gameAudio.playTap()
    const newSet = new Set(checkedSteps)
    if (newSet.has(idx)) newSet.delete(idx)
    else newSet.add(idx)
    setCheckedSteps(newSet)
    if (onSaveAnswer) onSaveAnswer({ checked: Array.from(newSet) })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-purple-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-purple-200">LET'S DO IT! • PART 1 OF 2</span>
          <h2 className="text-xs sm:text-sm font-black">Hands-on Activity: {topicTitle}</h2>
        </div>
        <Gamepad2 size={16} className="text-purple-200" />
      </div>

      <p className="text-[10px] text-slate-500 font-bold pt-1 px-1">
        ✅ Tick each step as you complete it!
      </p>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {steps.map((s: any, idx: number) => {
          const isDone = checkedSteps.has(idx)
          return (
            <button
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`w-full p-2.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                isDone ? 'bg-purple-50 border-purple-400 shadow-xs' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-black text-sm border-2 ${
                isDone ? 'bg-purple-500 border-purple-500 text-white' : 'bg-white border-slate-300 text-slate-500'
              }`}>
                {isDone ? <CheckCircle2 size={16} /> : s.step}
              </div>
              <span className={`text-xs font-bold leading-snug ${isDone ? 'text-purple-800 line-through opacity-70' : 'text-slate-800'}`}>
                {s.desc}
              </span>
            </button>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button onClick={onNext} className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer">
          Next: Think & Talk →
        </button>
      </div>
    </div>
  )
}

// 9. LET'S DO IT REFLECTION — payload-driven
export const ScreenLetsDoItReflection: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const payload = screen.payload || {}
  const talkPrompt = payload.talkPrompt || 'Tell your family what you learned today!'
  const drawPrompt = payload.drawPrompt || 'Draw what you did and share with your teacher!'
  const topicTitle = payload.topicTitle || screen.topicTitle || 'Activity'
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [penColor, setPenColor] = useState('#8B5CF6')

  const startDraw = (e: any) => { setIsDrawing(true); draw(e) }
  const stopDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current && onSaveAnswer) onSaveAnswer(canvasRef.current.toDataURL())
  }
  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = penColor
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y)
  }
  const clearCanvas = () => { canvasRef.current?.getContext('2d')?.clearRect(0, 0, 999, 999); if (onSaveAnswer) onSaveAnswer(null) }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-purple-600 text-white rounded-2xl p-2 flex items-center justify-between shrink-0 shadow-xs">
        <div>
          <span className="text-[8px] font-black uppercase text-purple-200">LET'S DO IT! • PART 2 OF 2</span>
          <h2 className="text-xs sm:text-sm font-black">Think & Talk: {topicTitle}</h2>
        </div>
        <Gamepad2 size={16} className="text-purple-200" />
      </div>

      {/* Talk About It */}
      <div className="shrink-0 bg-amber-50 border-2 border-amber-200 rounded-2xl p-2.5 flex gap-2 items-start mt-1">
        <span className="text-2xl shrink-0">💬</span>
        <div>
          <span className="text-[9px] font-black uppercase text-amber-700">TALK ABOUT IT</span>
          <p className="text-[11px] font-bold text-slate-800 leading-snug">{talkPrompt}</p>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="flex-1 min-h-0 flex flex-col py-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black text-slate-700">🎨 {drawPrompt}</span>
          <div className="flex items-center gap-1">
            {['#8B5CF6', '#EF4444', '#10B981', '#F59E0B'].map((c) => (
              <button key={c} onClick={() => setPenColor(c)}
                className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${penColor === c ? 'scale-125 border-white shadow' : 'border-transparent'}`}
                style={{ background: c }} />
            ))}
            <button onClick={clearCanvas} className="p-1 rounded-lg bg-slate-100 text-slate-500 cursor-pointer ml-1">
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef} width={320} height={120}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
          className="w-full flex-1 rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 cursor-crosshair touch-none"
          style={{ minHeight: '80px', maxHeight: '120px' }}
        />
      </div>

      <div className="shrink-0 pt-1">
        <button onClick={onNext} className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer">
          Next: Worksheet →
        </button>
      </div>
    </div>
  )
}
