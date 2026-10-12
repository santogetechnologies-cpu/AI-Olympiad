// ─────────────────────────────────────────────────────────────────────────────
// GAIO AI GUIDE (MASCULINE, BOLD, PATIENT & KINDERGARTEN-FRIENDLY MENTOR)
// Animated robot mentor with audio sound waves and ultra-simple explanations
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Sparkles, Smile, Bot, MessageSquare } from 'lucide-react'
import { gaioSpeechService } from '../../services/auraSpeechService'
import { gameAudio } from '../../utils/gameAudio'

export interface GaioAiGuideAvatarProps {
  conceptTitle: string
  simpleText: string
  lessonTitle?: string
}

export const GaioAiGuideAvatar: React.FC<GaioAiGuideAvatarProps> = ({
  conceptTitle,
  simpleText,
  lessonTitle
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    const unsub = gaioSpeechService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking)
    })
    return () => {
      unsub()
      gaioSpeechService.stop()
    }
  }, [])

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      gaioSpeechService.stop()
      setIsSpeaking(false)
    } else {
      gameAudio.playTap()
      const speechNarrative = `Hello young explorer! I am your GAIO AI Guide. Today we are learning about ${conceptTitle}. Here is the secret: ${simpleText}`
      gaioSpeechService.speak(speechNarrative, `guide-${conceptTitle}`)
      setIsSpeaking(true)
    }
  }

  return (
    <div className="w-full bg-gradient-to-r from-sky-950/90 via-slate-900 to-indigo-950/90 border-2 border-sky-400/40 rounded-2xl p-3 sm:p-4 shadow-xl select-none mb-3 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3 sm:gap-4 relative z-10">
        {/* Animated Robot Avatar Head */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 shadow-lg transition-all ${
              isSpeaking
                ? 'bg-gradient-to-tr from-sky-500 to-blue-600 border-yellow-300 ring-4 ring-sky-400/30 scale-105'
                : 'bg-gradient-to-tr from-slate-800 to-sky-900 border-sky-400/60'
            }`}
          >
            {/* Robot Head Graphic with Glowing Eyes */}
            <div className="flex flex-col items-center justify-center">
              {/* Antenna */}
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse -mt-1 mb-0.5" />
              {/* Robot Face */}
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSpeaking ? 'bg-yellow-300 animate-ping' : 'bg-cyan-300'
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSpeaking ? 'bg-yellow-300 animate-ping' : 'bg-cyan-300'
                  }`}
                />
              </div>
              {/* Animated Mouth Sound Waves */}
              {isSpeaking ? (
                <div className="flex items-center gap-0.5 h-2">
                  <span className="w-0.5 h-2 bg-yellow-300 animate-bounce" />
                  <span className="w-0.5 h-3 bg-yellow-300 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-yellow-300 animate-bounce" />
                  <span className="w-0.5 h-3 bg-yellow-300 animate-pulse" />
                </div>
              ) : (
                <div className="w-4 h-1 rounded-full bg-cyan-400/70" />
              )}
            </div>
          </div>

          <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 mt-1 flex items-center gap-1">
            <Bot size={11} className="text-sky-400" />
            GAIO Guide
          </span>
        </div>

        {/* Speech Bubble / Story Explainer */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-[10px] font-bold flex items-center gap-1">
                <Smile size={11} /> Explain Like I'm 5!
              </span>
              <span className="text-xs font-bold text-white truncate">
                {conceptTitle}
              </span>
            </div>

            {/* Listen Button (Slow, Bold Male Voice) */}
            <button
              onClick={handleToggleSpeak}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500 hover:bg-rose-600 text-white ring-2 ring-rose-400/50 animate-pulse'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/20 active:scale-95'
              }`}
              title="Click to hear GAIO AI Guide explain in a friendly, slow male voice"
            >
              {isSpeaking ? (
                <>
                  <VolumeX size={13} />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 size={13} />
                  <span>Listen to Guide 🎙️</span>
                </>
              )}
            </button>
          </div>

          {/* Kindergarten Plain-English Text */}
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-sky-900/60 text-slate-100 text-xs sm:text-sm leading-relaxed font-medium">
            <span className="text-yellow-300 font-bold mr-1">"Hey there!</span>
            {simpleText}
            <span className="text-yellow-300 font-bold ml-1">"</span>
          </div>
        </div>
      </div>
    </div>
  )
}
