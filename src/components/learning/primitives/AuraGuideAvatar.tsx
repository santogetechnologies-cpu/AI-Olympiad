import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'

export type GuideMood = 'explaining' | 'thinking' | 'correct' | 'retry' | 'celebrating'

interface AuraGuideAvatarProps {
  mood?: GuideMood
  message?: string
  speakerName?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showSpeaker?: boolean
}

export const AuraGuideAvatar: React.FC<AuraGuideAvatarProps> = ({
  mood = 'explaining',
  message,
  speakerName = 'Aura (AI Guide)',
  size = 'md',
  className = '',
  showSpeaker = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!message || typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    window.speechSynthesis.cancel()
    const cleanText = message.replace(/<[^>]*>/g, '').trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }
  const sizeMap = {
    sm: { avatar: 40, box: 'p-2 text-xs' },
    md: { avatar: 52, box: 'p-3 text-xs sm:text-sm' },
    lg: { avatar: 64, box: 'p-3.5 text-sm' }
  }

  const { avatar } = sizeMap[size]

  // Render anime-inspired cyber guide avatar
  const renderAvatarSVG = () => {
    const eyeSparkle = mood === 'correct' || mood === 'celebrating'
    const isThinking = mood === 'thinking'
    const isRetry = mood === 'retry'

    return (
      <svg
        width={avatar}
        height={avatar}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        {/* Halo / Cyber Headset Ring */}
        <circle cx="50" cy="50" r="46" fill="url(#haloGrad)" opacity="0.15" />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={mood === 'correct' ? '#10B981' : mood === 'retry' ? '#F43F5E' : '#6366F1'}
          strokeWidth="2.5"
          strokeDasharray={mood === 'thinking' ? '4 4' : 'none'}
        />

        {/* Headset Arc */}
        <path d="M22 50 C22 26, 78 26, 78 50" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Headset Ear Cups with Glow */}
        <rect x="15" y="44" width="8" height="18" rx="4" fill="#3730A3" stroke="#818CF8" strokeWidth="1.5" />
        <rect x="77" y="44" width="8" height="18" rx="4" fill="#3730A3" stroke="#818CF8" strokeWidth="1.5" />
        <circle cx="19" cy="53" r="2.5" fill="#38BDF8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="81" cy="53" r="2.5" fill="#38BDF8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Anime Hair (Back Layer) */}
        <path d="M28 42 C28 20, 72 20, 72 42 C78 58, 80 72, 76 80 C68 76, 60 78, 50 82 C40 78, 32 76, 24 80 C20 72, 22 58, 28 42 Z" fill="#1E1B4B" />

        {/* Face Silhouette */}
        <path d="M30 46 C30 36, 70 36, 70 46 C70 65, 60 76, 50 78 C40 76, 30 65, 30 46 Z" fill="#FEF3C7" />

        {/* Cheeks Blush */}
        <ellipse cx="36" cy="60" rx="3.5" ry="2" fill="#F43F5E" opacity="0.4" />
        <ellipse cx="64" cy="60" rx="3.5" ry="2" fill="#F43F5E" opacity="0.4" />

        {/* Anime Eyes */}
        <g>
          {isRetry ? (
            // Concerned / encouraging eyes
            <>
              <path d="M34 54 Q40 50 44 54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M56 54 Q60 50 66 54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : isThinking ? (
            // Upward thinking eyes
            <>
              <ellipse cx="39" cy="51" rx="4.5" ry="5.5" fill="#1E1B4B" />
              <circle cx="38" cy="49" r="2" fill="#38BDF8" />
              <ellipse cx="61" cy="51" rx="4.5" ry="5.5" fill="#1E1B4B" />
              <circle cx="60" cy="49" r="2" fill="#38BDF8" />
            </>
          ) : eyeSparkle ? (
            // Sparkly happy eyes
            <>
              <ellipse cx="39" cy="53" rx="5" ry="6" fill="#1E1B4B" />
              <circle cx="38" cy="50" r="2.5" fill="#FFFFFF" />
              <circle cx="41" cy="55" r="1.5" fill="#38BDF8" />
              <ellipse cx="61" cy="53" rx="5" ry="6" fill="#1E1B4B" />
              <circle cx="60" cy="50" r="2.5" fill="#FFFFFF" />
              <circle cx="63" cy="55" r="1.5" fill="#38BDF8" />
            </>
          ) : (
            // Calm open eyes
            <>
              <ellipse cx="39" cy="53" rx="4.5" ry="5.5" fill="#1E1B4B" />
              <circle cx="38" cy="50" r="2" fill="#FFFFFF" />
              <ellipse cx="61" cy="53" rx="4.5" ry="5.5" fill="#1E1B4B" />
              <circle cx="60" cy="50" r="2" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Anime Mouth */}
        {mood === 'celebrating' || mood === 'correct' ? (
          <path d="M44 65 Q50 72 56 65 Z" fill="#E11D48" />
        ) : isRetry ? (
          <path d="M46 67 Q50 64 54 67" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M46 64 Q50 68 54 64" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* Front Hair Bangs */}
        <path d="M30 42 C38 48, 44 48, 48 44 C52 48, 62 48, 70 42 C68 32, 58 28, 50 28 C42 28, 32 32, 30 42 Z" fill="#312E81" />
        <path d="M46 36 L52 47 L54 36" fill="#4338CA" opacity="0.6" />

        {/* Gradient Defs */}
        <defs>
          <linearGradient id="haloGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (!message) {
    return <div className={`inline-block ${className}`}>{renderAvatarSVG()}</div>
  }

  return (
    <div className={`flex items-start gap-2.5 sm:gap-3.5 ${className}`}>
      {renderAvatarSVG()}

      <div className="relative flex-1 bg-white rounded-2xl p-3 sm:p-3.5 border-2 border-indigo-100 shadow-xs text-left">
        {/* Speech bubble pointer */}
        <div className="absolute -left-2 top-3 w-3 h-3 bg-white border-l-2 border-b-2 border-indigo-100 rotate-45 transform" />

        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
              {speakerName}
            </span>
            {showSpeaker && (
              <button
                type="button"
                onClick={handleSpeak}
                title={isSpeaking ? "Stop Voice" : "Listen to Aura's explanation"}
                aria-label={isSpeaking ? "Stop Voice" : "Read text aloud"}
                className={`p-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  isSpeaking
                    ? 'bg-indigo-600 text-white shadow-xs animate-pulse ring-2 ring-indigo-300'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/80 hover:scale-105 active:scale-95'
                }`}
              >
                <Volume2 size={13} className={isSpeaking ? 'animate-bounce' : ''} />
                <span className="text-[9px] font-bold">
                  {isSpeaking ? 'Speaking...' : 'Listen'}
                </span>
              </button>
            )}
          </div>
          <span className="text-[9px] font-bold text-slate-400 capitalize">
            {mood}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  )
}
