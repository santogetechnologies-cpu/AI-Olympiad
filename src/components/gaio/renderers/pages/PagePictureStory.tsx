// ─────────────────────────────────────────────────────────────────────────────
// PAGE PICTURE STORY RENDERER (PDF Page 7 & Page 17)
// Exact visual and comic sequence from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Volume2, Sparkles, MessageCircle } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

export interface PagePictureStoryProps {
  pageConfig: GaioPageConfig
}

export const PagePictureStory: React.FC<PagePictureStoryProps> = ({ pageConfig }) => {
  const [activePanel, setActivePanel] = useState<number | null>(null)
  const [showTalkReflection, setShowTalkReflection] = useState<boolean>(false)

  const handleRead = (text: string, panelNum: number) => {
    gameAudio.playTap()
    setActivePanel(panelNum)
    auraSpeechService.speak(text)
  }

  const panels = pageConfig.storyPanels || [
    {
      panelNumber: 1,
      text: 'Meera was drawing. She could not find her yellow crayon.',
      imageSrc: '/gaio/class3/images/p7_img_1.png',
      alt: 'Meera drawing'
    },
    {
      panelNumber: 2,
      text: 'Beep-boop! I saw it under the table!',
      imageSrc: '/gaio/class3/images/p7_img_2.png',
      alt: 'Bolt points under table'
    },
    {
      panelNumber: 3,
      text: 'Meera and Bolt became best friends.',
      imageSrc: '/gaio/class3/images/p7_img_3.png',
      alt: 'Meera and Bolt best friends'
    },
    {
      panelNumber: 4,
      text: 'Can you feel happy like me? Bolt said: No, but I can help you draw!',
      imageSrc: '/gaio/class3/images/p7_img_4.png',
      alt: 'Meera and Bolt talking'
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-2.5 text-slate-800 select-none animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="shrink-0 flex items-center justify-between pb-1 border-b border-slate-100">
        <div>
          <h2 className="text-xs sm:text-sm font-black uppercase text-[#0288D1] tracking-wide">
            {pageConfig.pageHeaderTitle}
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            {pageConfig.subtitle}
          </p>
        </div>
        <button
          onClick={() => {
            const allText = panels.map((p) => p.text).join(' ')
            handleRead(allText, 0)
          }}
          className="p-1.5 rounded-xl bg-sky-50 text-[#0288D1] hover:bg-sky-100 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
        >
          <Volume2 size={14} />
          <span className="hidden xs:inline">Read Story</span>
        </button>
      </div>

      {/* 2. 4-Panel Comic Grid (Fits strictly inside single viewport) */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1 min-h-0 py-1">
        {panels.map((p) => {
          const isActive = activePanel === p.panelNumber
          return (
            <div
              key={p.panelNumber}
              onClick={() => handleRead(p.text, p.panelNumber)}
              className={`rounded-2xl border flex flex-col justify-between p-1.5 overflow-hidden transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-50/70 border-amber-300 shadow-sm ring-2 ring-amber-400/50 scale-101'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              {/* Panel Top Badge */}
              <div className="flex items-center justify-between shrink-0 mb-1">
                <span className="w-4 h-4 rounded-full bg-[#0288D1] text-white text-[9px] font-black flex items-center justify-center">
                  {p.panelNumber}
                </span>
                <Volume2 size={12} className={isActive ? 'text-amber-600 animate-pulse' : 'text-slate-300'} />
              </div>

              {/* Panel Artwork */}
              <div className="flex-1 min-h-0 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                <img
                  src={p.imageSrc}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight mt-1 px-0.5 line-clamp-3">
                {p.text}
              </p>
            </div>
          )
        })}
      </div>

      {/* 3. Bottom Talk About It / Question Prompt */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-1.5 shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <MessageCircle size={15} className="text-[#0288D1] shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-extrabold text-[#0D47A1] leading-tight truncate">
            {showTalkReflection
              ? "Bolt has cameras and chips, but no heart or emotions!"
              : "Talk about it: Why could Bolt not feel happy?"}
          </span>
        </div>
        <button
          onClick={() => {
            gameAudio.playTap()
            setShowTalkReflection(!showTalkReflection)
            if (!showTalkReflection) {
              handleRead("AI is made of code and circuits. It does not have feelings like humans!", 5)
            }
          }}
          className="px-2 py-1 rounded-xl bg-[#0288D1] text-white text-[9px] font-black uppercase shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          {showTalkReflection ? 'Hide' : 'Answer'}
        </button>
      </div>
    </div>
  )
}
