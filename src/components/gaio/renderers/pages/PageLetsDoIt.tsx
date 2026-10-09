// ─────────────────────────────────────────────────────────────────────────────
// PAGE LET'S DO IT RENDERER (PDF Page 9 & Page 19)
// Playable Robot Says interactive game directly from GAIO Class3 Book.pdf
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioPageConfig } from '../../types'
import { Sparkles, Play, RotateCcw, Volume2 } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

export interface PageLetsDoItProps {
  pageConfig: GaioPageConfig
}

export const PageLetsDoIt: React.FC<PageLetsDoItProps> = ({ pageConfig }) => {
  const [robotAction, setRobotAction] = useState<'idle' | 'jump' | 'wave' | 'dance' | 'spin'>('idle')
  const [speechBubble, setSpeechBubble] = useState<string>("Hi! I'm Bolt. Tap a command below!")

  const handleCommand = (action: 'jump' | 'wave' | 'dance' | 'spin', text: string) => {
    gameAudio.playSuccess()
    setRobotAction(action)
    setSpeechBubble(text)
    auraSpeechService.speak(text)

    setTimeout(() => {
      setRobotAction('idle')
    }, 2500)
  }

  const commands = pageConfig.robotCommands || [
    { id: 'c1', command: 'Robot, jump!', actionName: 'jump' as const, speech: 'Boing! Jumping high into the air!' },
    { id: 'c2', command: 'Robot, wave!', actionName: 'wave' as const, speech: 'Hello friend! Waving to you!' },
    { id: 'c3', command: 'Robot, dance!', actionName: 'dance' as const, speech: 'Beep boop! Look at my robot dance!' },
    { id: 'c4', command: 'Robot, spin!', actionName: 'spin' as const, speech: 'Wheee! Spinning all around!' },
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
            Tap a command to make your AI friend move!
          </p>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-1">
          <Sparkles size={11} className="text-emerald-600" />
          <span>Interactive Game</span>
        </div>
      </div>

      {/* 2. Interactive Robot Stage */}
      <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center relative my-1">
        {/* Speech Bubble */}
        <div className="relative bg-white border-2 border-[#0288D1] rounded-2xl px-3 py-1.5 shadow-sm max-w-xs mb-2 animate-in fade-in">
          <p className="text-xs font-black text-[#0D47A1] text-center leading-tight">
            {speechBubble}
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#0288D1]" />
        </div>

        {/* Playable Bolt Robot Canvas */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <div
            className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
              robotAction === 'jump'
                ? '-translate-y-8 scale-110'
                : robotAction === 'wave'
                ? 'rotate-6'
                : robotAction === 'dance'
                ? 'scale-105 -rotate-6'
                : robotAction === 'spin'
                ? 'rotate-360 duration-700'
                : 'translate-y-0'
            }`}
          >
            <img
              src="/gaio/class3/images/p6_img_0.png"
              alt="Bolt the Robot"
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-md"
            />
          </div>

          {/* Action Aura Rings */}
          {robotAction !== 'idle' && (
            <div className="absolute inset-0 rounded-full border-4 border-sky-400 animate-ping pointer-events-none opacity-40" />
          )}
        </div>
      </div>

      {/* 3. 4 Command Buttons */}
      <div className="shrink-0 space-y-1">
        <span className="text-[10px] font-black uppercase text-slate-600 block text-center">
          Tap a command for Bolt:
        </span>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {commands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => handleCommand(cmd.actionName, cmd.speech)}
              className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-[#0288D1] hover:from-sky-600 hover:to-[#01579B] text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Play size={12} className="fill-white" />
              <span>{cmd.command}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
