// ─────────────────────────────────────────────────────────────────────────────
// AURA AI CHARACTER — PREMIUM ANIMATED ANIME AI LEARNING MASCOT
// 100% Interactive Vector SVG Mascot with Natural Organic Physics:
// - Natural Idle Breathing & Torso Expansion
// - Randomized Organic Blinking (multi-frame eyelid curves)
// - Dynamic Eye Saccades & Pupil Directional Tracking
// - Head Tilts & Posture Weight Shifting
// - Expressive Multi-Pose Gestural Arms (explaining, thinking, cheering, waving)
// - State Cycle: IDLE → NOTICE → ACTION → REACTION → IDLE
// - Zero Emojis · Clean Scalable Vector · Mobile Responsive (Zero Overflow)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useId } from 'react'
import { Volume2, VolumeX, Sparkles, Heart, Lightbulb, Shield, Award } from 'lucide-react'
import { auraSpeechService } from '../../../services/auraSpeechService'

export type AuraMood =
  | 'idle'
  | 'enter'
  | 'notice'
  | 'explaining'
  | 'thinking'
  | 'correct'
  | 'wrong'
  | 'celebrating'
  | 'waving'

export interface AuraCharacterProps {
  mood?: AuraMood
  variant?: 'full' | 'bust' | 'compact'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  lookDirection?: 'center' | 'left' | 'right' | 'up'
  isSpeaking?: boolean
  message?: string
  speakerName?: string
  showSpeechBubble?: boolean
  showSpeaker?: boolean
  onActionComplete?: () => void
  className?: string
  interactive?: boolean
  hintText?: string
}

export const AuraCharacter: React.FC<AuraCharacterProps> = ({
  mood = 'idle',
  variant = 'bust',
  size = 'md',
  lookDirection = 'center',
  isSpeaking: externalIsSpeaking,
  message,
  speakerName = 'Aura (AI Guide)',
  showSpeechBubble = false,
  showSpeaker = true,
  onActionComplete,
  className = '',
  interactive = true,
  hintText,
}) => {
  const instanceId = useId()

  // ─────────────────────────────────────────────────────────────────────────
  // ANIMATION STATES & NATURAL ORGANIC MOTION TIMING
  // ─────────────────────────────────────────────────────────────────────────
  const [internalMood, setInternalMood] = useState<AuraMood>(mood)
  const [isBlinking, setIsBlinking] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [headTilt, setHeadTilt] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpeakingThis, setIsSpeakingThis] = useState(false)
  const [entered, setEntered] = useState(false)

  // Derive active speech state from authoritative auraSpeechService or external override
  const isSpeaking = externalIsSpeaking !== undefined ? externalIsSpeaking : isSpeakingThis

  // Subscribe to authoritative browser TTS state
  useEffect(() => {
    const unsubscribe = auraSpeechService.subscribe((state) => {
      if (!state.isSpeaking) {
        setIsSpeakingThis(false)
        return
      }

      // Active only if THIS instance initiated speech, or this exact cleaned text is currently being read
      const cleanCurrent = auraSpeechService.cleanText(message || '')
      const isMatch = state.currentId === instanceId || (Boolean(cleanCurrent) && state.currentText === cleanCurrent)
      setIsSpeakingThis(isMatch)
    })

    return () => {
      unsubscribe()
    }
  }, [instanceId, message])

  // Stop previous speech and reset icon on unmount or when screen/section/message changes
  useEffect(() => {
    return () => {
      // If this instance was speaking when unmounting, stop speech immediately
      if (auraSpeechService.isSpeaking(instanceId)) {
        auraSpeechService.stop()
      }
    }
  }, [instanceId])

  useEffect(() => {
    // When message changes (e.g. user advanced to next step or screen), stop speech if this instance was speaking
    if (auraSpeechService.isSpeaking(instanceId)) {
      auraSpeechService.stop()
    }
  }, [message, instanceId])

  // Sync external mood changes into the state machine
  useEffect(() => {
    if (mood === 'correct') {
      // Correct Sequence: Notice -> Celebrate -> Settle -> Idle
      setInternalMood('notice')
      const t1 = setTimeout(() => setInternalMood('celebrating'), 300)
      const t2 = setTimeout(() => {
        setInternalMood('idle')
        onActionComplete?.()
      }, 2400)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    } else if (mood === 'wrong') {
      // Wrong Sequence: Pause -> Think -> Gentle Concern/Encourage -> Settle
      setInternalMood('thinking')
      const t1 = setTimeout(() => setInternalMood('wrong'), 700)
      const t2 = setTimeout(() => {
        setInternalMood('idle')
        onActionComplete?.()
      }, 2600)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    } else {
      setInternalMood(mood)
    }
  }, [mood, onActionComplete])

  // Screen Start Enter Transition
  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setEntered(true)
    }, 100)
    return () => clearTimeout(enterTimer)
  }, [])

  // Natural Randomized Blinking Cycle (every 2.8s to 4.5s)
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>
    const triggerBlink = () => {
      setIsBlinking(true)
      setTimeout(() => {
        setIsBlinking(false)
        // Occasional double-blink (20% chance)
        if (Math.random() < 0.2) {
          setTimeout(() => {
            setIsBlinking(true)
            setTimeout(() => setIsBlinking(false), 140)
          }, 160)
        }
      }, 150)

      const nextInterval = 2800 + Math.random() * 2000
      blinkTimer = setTimeout(triggerBlink, nextInterval)
    }

    blinkTimer = setTimeout(triggerBlink, 2000)
    return () => clearTimeout(blinkTimer)
  }, [])

  // Eye Glance Direction & Micro-Saccades
  useEffect(() => {
    let targetX = 0
    let targetY = 0

    if (lookDirection === 'left') {
      targetX = -3.5
      targetY = 0.5
    } else if (lookDirection === 'right') {
      targetX = 3.5
      targetY = 0.5
    } else if (lookDirection === 'up' || internalMood === 'thinking') {
      targetX = 1.5
      targetY = -3
    } else {
      targetX = 0
      targetY = 0
    }

    if (internalMood === 'explaining') {
      targetX = 2.5
      targetY = 1
      setHeadTilt(3)
    } else if (internalMood === 'thinking') {
      targetX = -2
      targetY = -3
      setHeadTilt(-4)
    } else if (internalMood === 'celebrating') {
      targetX = 0
      targetY = -1
      setHeadTilt(2)
    } else if (internalMood === 'wrong') {
      targetX = -1
      targetY = 1.5
      setHeadTilt(-2)
    } else {
      setHeadTilt(0)
    }

    setEyeOffset({ x: targetX, y: targetY })
  }, [lookDirection, internalMood])

  // Mouth Movement Sync while Speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false)
      return
    }

    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev)
    }, 180)

    return () => clearInterval(interval)
  }, [isSpeaking])

  // Speech synthesis audio handler
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!message) return

    if (isSpeaking) {
      // Click while speaking -> stop speech immediately
      auraSpeechService.stop()
    } else {
      // Click speaker -> Aura actually reads the visible text
      auraSpeechService.speak(message, instanceId)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SIZING MAPS
  // ─────────────────────────────────────────────────────────────────────────
  const sizeMap = {
    xs: { width: 36, height: variant === 'full' ? 70 : 36, viewBox: variant === 'full' ? '0 0 120 220' : '0 0 120 120' },
    sm: { width: 48, height: variant === 'full' ? 95 : 48, viewBox: variant === 'full' ? '0 0 120 220' : '0 0 120 120' },
    md: { width: 68, height: variant === 'full' ? 130 : 68, viewBox: variant === 'full' ? '0 0 120 220' : '0 0 120 120' },
    lg: { width: 96, height: variant === 'full' ? 180 : 96, viewBox: variant === 'full' ? '0 0 120 220' : '0 0 120 120' },
    xl: { width: 140, height: variant === 'full' ? 260 : 140, viewBox: variant === 'full' ? '0 0 120 220' : '0 0 120 120' },
  }

  const currentSize = sizeMap[size]

  // Dynamic Aura Theme Color
  const themeGlow =
    internalMood === 'celebrating' || internalMood === 'correct'
      ? '#10B981'
      : internalMood === 'wrong'
      ? '#F59E0B'
      : internalMood === 'thinking'
      ? '#8B5CF6'
      : '#6366F1'

  // ─────────────────────────────────────────────────────────────────────────
  // VECTOR SVG COMPONENT RENDERER
  // ─────────────────────────────────────────────────────────────────────────
  const renderAuraSVG = () => {
    const isHappy = internalMood === 'celebrating' || internalMood === 'correct'
    const isThinking = internalMood === 'thinking'
    const isConcerned = internalMood === 'wrong'
    const isNotice = internalMood === 'notice'

    return (
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox={currentSize.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none transition-transform duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{
          filter: `drop-shadow(0 4px 10px ${themeGlow}30)`,
        }}
      >
        <defs>
          {/* Cyber Halo Ring Gradient */}
          <linearGradient id="auraHalo" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor={themeGlow} />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>

          {/* Hair Gradient */}
          <linearGradient id="auraHair" x1="20" y1="10" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#312E81" />
            <stop offset="0.5" stopColor="#4338CA" />
            <stop offset="1" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Hair Highlights */}
          <linearGradient id="auraHairSheen" x1="40" y1="20" x2="80" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#C7D2FE" stopOpacity="0.2" />
          </linearGradient>

          {/* Cyber Suit Gradient */}
          <linearGradient id="auraSuit" x1="30" y1="90" x2="90" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>

          {/* Visor Cyan Glass */}
          <linearGradient id="auraVisor" x1="30" y1="35" x2="90" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#818CF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ── 1. BACKGROUND GLOW & AUDIO HALO RING ── */}
        <g className="aura-halo">
          <circle cx="60" cy="55" r="48" fill="url(#auraHalo)" opacity={isHappy ? 0.2 : 0.1} />
          <circle
            cx="60"
            cy="55"
            r="46"
            stroke="url(#auraHalo)"
            strokeWidth={isHappy ? 2.5 : 1.5}
            strokeDasharray={isThinking ? '4 4' : 'none'}
            opacity="0.75"
          >
            {isThinking && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 60 55"
                to="360 60 55"
                dur="12s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* Floating Sparkle Particles on Success */}
          {isHappy && (
            <>
              <circle cx="25" cy="25" r="2.5" fill="#FBBF24" className="animate-ping" />
              <circle cx="95" cy="20" r="3" fill="#34D399" className="animate-ping" />
              <circle cx="100" cy="80" r="2" fill="#38BDF8" />
            </>
          )}
        </g>

        {/* ── 2. FULL BODY SUIT & LEGS (when variant === 'full') ── */}
        {variant === 'full' && (
          <g className="aura-body-lower">
            {/* Legs with Cyber Boots */}
            <g className="aura-legs">
              {/* Left Leg */}
              <rect x="42" y="150" width="12" height="48" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
              <path d="M40 192 L56 192 L58 206 L38 206 Z" fill="#0F172A" />
              <rect x="38" y="202" width="20" height="4" rx="2" fill="#6366F1" />

              {/* Right Leg */}
              <rect x="66" y="150" width="12" height="48" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
              <path d="M64 192 L80 192 L82 206 L62 206 Z" fill="#0F172A" />
              <rect x="62" y="202" width="20" height="4" rx="2" fill="#6366F1" />
            </g>

            {/* Torso & Cyber Vest (with natural breathing rise-fall) */}
            <g className="aura-torso animate-pulse">
              <path
                d="M36 96 C36 88, 84 88, 84 96 L80 152 C80 156, 40 156, 40 152 Z"
                fill="url(#auraSuit)"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Cyber Armor Inset Panel */}
              <path d="M46 100 L74 100 L70 142 L50 142 Z" fill="#334155" opacity="0.6" />

              {/* AI Glowing Core Arc Reactor on Chest */}
              <circle cx="60" cy="116" r="7" fill="#0F172A" stroke={themeGlow} strokeWidth="2" />
              <circle cx="60" cy="116" r="3.5" fill={themeGlow}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Left Arm & Gesturing Hand */}
            <g className="aura-left-arm">
              {isHappy ? (
                // Cheering Upward Arm
                <path d="M36 102 C24 88, 18 70, 22 55" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              ) : isThinking ? (
                // Folded / Resting Hand
                <path d="M36 102 C26 114, 30 134, 46 130" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" fill="none" />
              ) : (
                // Natural Relaxed Arm
                <path d="M36 102 C28 116, 26 136, 30 146" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" fill="none" />
              )}
              {/* Hand */}
              <circle cx={isHappy ? 22 : isThinking ? 46 : 30} cy={isHappy ? 55 : isThinking ? 130 : 146} r="4.5" fill="#FEF3C7" />
            </g>

            {/* Right Arm & Gesturing Hand */}
            <g className="aura-right-arm">
              {isHappy ? (
                // Cheering Right Arm
                <path d="M84 102 C96 88, 102 70, 98 55" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              ) : internalMood === 'explaining' || isNotice ? (
                // Pointing Outward Right Arm (Presenting Content)
                <path d="M84 102 C98 100, 110 94, 116 88" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" fill="none" />
              ) : isThinking ? (
                // Hand to Chin Thinking Pose
                <path d="M84 102 C96 108, 92 82, 76 68" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" fill="none" />
              ) : (
                // Natural Relaxed Arm
                <path d="M84 102 C92 116, 94 136, 90 146" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" fill="none" />
              )}
              {/* Hand */}
              <circle
                cx={isHappy ? 98 : internalMood === 'explaining' || isNotice ? 116 : isThinking ? 74 : 90}
                cy={isHappy ? 55 : internalMood === 'explaining' || isNotice ? 88 : isThinking ? 66 : 146}
                r="4.5"
                fill="#FEF3C7"
              />
            </g>
          </g>
        )}

        {/* ── 3. HEAD & ANIME FACE (with Head-Tilt Physics) ── */}
        <g
          className="aura-head"
          style={{
            transform: `rotate(${headTilt}deg)`,
            transformOrigin: '60px 75px',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Back Hair Strands */}
          <path
            d="M30 46 C24 24, 96 24, 90 46 C98 64, 102 86, 94 98 C84 94, 72 96, 60 100 C48 96, 36 94, 26 98 C18 86, 22 64, 30 46 Z"
            fill="url(#auraHair)"
          />

          {/* Cyber Headset Arc */}
          <path
            d="M24 54 C24 26, 96 26, 96 54"
            stroke="#4338CA"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Headset Ear-Cup */}
          <rect x="18" y="46" width="10" height="22" rx="5" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
          <circle cx="23" cy="57" r="3" fill="#38BDF8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Right Headset Ear-Cup & Antenna Mic */}
          <rect x="92" y="46" width="10" height="22" rx="5" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
          <circle cx="97" cy="57" r="3" fill="#38BDF8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>
          {/* Subtle Mic Boom */}
          <path d="M96 64 C96 74, 82 82, 74 78" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="74" cy="78" r="2" fill="#10B981" />

          {/* Face Base Silhouette */}
          <path
            d="M34 50 C34 38, 86 38, 86 50 C86 72, 74 88, 60 90 C46 88, 34 72, 34 50 Z"
            fill="#FEF3C7"
          />

          {/* Soft Cheeks Blush */}
          <ellipse cx="42" cy="68" rx="5" ry="2.5" fill="#F43F5E" opacity={isHappy ? 0.5 : 0.25} />
          <ellipse cx="78" cy="68" rx="5" ry="2.5" fill="#F43F5E" opacity={isHappy ? 0.5 : 0.25} />

          {/* ── 4. EXPRESSIVE ANIME EYES WITH PUPIL SACCADES ── */}
          <g className="aura-eyes">
            {isBlinking ? (
              // Natural Blink Eyelid Closed Curves
              <>
                <path d="M38 60 Q46 64 54 60" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M66 60 Q74 64 82 60" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : isConcerned ? (
              // Gentle Concerned / Encouraging Eyelids
              <>
                <path d="M38 61 Q46 56 54 61" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M66 61 Q74 56 82 61" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <ellipse cx={46 + eyeOffset.x} cy={63 + eyeOffset.y} rx="3.5" ry="4" fill="#312E81" />
                <ellipse cx={74 + eyeOffset.x} cy={63 + eyeOffset.y} rx="3.5" ry="4" fill="#312E81" />
              </>
            ) : isHappy ? (
              // Sparkly Joyous Eyes (Happy Curved Arcs)
              <>
                <path d="M38 62 Q46 52 54 62" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M66 62 Q74 52 82 62" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="46" cy="58" r="2" fill="#FFFFFF" />
                <circle cx="74" cy="58" r="2" fill="#FFFFFF" />
              </>
            ) : (
              // Natural Open Anime Eyes with Pupils & Specular Glints
              <>
                {/* Left Eye Socket */}
                <ellipse cx="46" cy="60" rx="7" ry="9" fill="#FFFFFF" />
                {/* Left Iris & Pupil */}
                <ellipse
                  cx={46 + eyeOffset.x}
                  cy={60 + eyeOffset.y}
                  rx="5"
                  ry="7"
                  fill="#1E1B4B"
                  style={{ transition: 'cx 0.2s ease-out, cy 0.2s ease-out' }}
                />
                <ellipse cx={46 + eyeOffset.x} cy={61 + eyeOffset.y} rx="3.5" ry="4.5" fill="#4338CA" />
                {/* Specular Highlights */}
                <circle cx={44 + eyeOffset.x * 0.5} cy={57 + eyeOffset.y * 0.5} r="2.5" fill="#FFFFFF" />
                <circle cx={48 + eyeOffset.x * 0.5} cy={63 + eyeOffset.y * 0.5} r="1.2" fill="#38BDF8" />

                {/* Right Eye Socket */}
                <ellipse cx="74" cy="60" rx="7" ry="9" fill="#FFFFFF" />
                {/* Right Iris & Pupil */}
                <ellipse
                  cx={74 + eyeOffset.x}
                  cy={60 + eyeOffset.y}
                  rx="5"
                  ry="7"
                  fill="#1E1B4B"
                  style={{ transition: 'cx 0.2s ease-out, cy 0.2s ease-out' }}
                />
                <ellipse cx={74 + eyeOffset.x} cy={61 + eyeOffset.y} rx="3.5" ry="4.5" fill="#4338CA" />
                {/* Specular Highlights */}
                <circle cx={72 + eyeOffset.x * 0.5} cy={57 + eyeOffset.y * 0.5} r="2.5" fill="#FFFFFF" />
                <circle cx={76 + eyeOffset.x * 0.5} cy={63 + eyeOffset.y * 0.5} r="1.2" fill="#38BDF8" />

                {/* Upper Eyelash Lines */}
                <path d="M37 54 Q46 48 55 54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M65 54 Q74 48 83 54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* Eyebrows */}
            {isThinking ? (
              <>
                <path d="M38 48 Q46 46 53 50" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M67 50 Q74 46 82 48" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            ) : isConcerned ? (
              <>
                <path d="M38 50 Q46 46 54 48" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M66 48 Q74 46 82 50" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path d="M38 48 Q46 44 54 48" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M66 48 Q74 44 82 48" stroke="#312E81" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>

          {/* ── 5. MOUTH (ANIMATED TALKING & EMOTIONS) ── */}
          <g className="aura-mouth">
            {isSpeaking && mouthOpen ? (
              // Open Talking Mouth
              <path d="M52 74 Q60 84 68 74 Z" fill="#E11D48" stroke="#BE123C" strokeWidth="1" />
            ) : isHappy ? (
              // Cheerful Open Smile
              <path d="M50 74 Q60 84 70 74 Z" fill="#E11D48" stroke="#BE123C" strokeWidth="1" />
            ) : isConcerned ? (
              // Soft Empathetic Line
              <path d="M54 77 Q60 74 66 77" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : (
              // Gentle Friendly Closed Smile
              <path d="M54 74 Q60 78 66 74" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}
          </g>

          {/* ── 6. FRONT HAIR BANGS & CYBER CLIP ── */}
          <g className="aura-hair-front">
            {/* Bangs */}
            <path
              d="M34 46 C44 54, 52 54, 58 48 C64 54, 76 54, 86 46 C84 34, 72 28, 60 28 C48 28, 36 34, 34 46 Z"
              fill="url(#auraHair)"
            />
            {/* Center Lock */}
            <path d="M54 36 L62 52 L66 36" fill="#4338CA" opacity="0.7" />
            {/* Hair Highlights Sheen */}
            <path d="M42 34 Q60 28 78 34" stroke="url(#auraHairSheen)" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Cyan Cyber Hairpin */}
            <polygon points="36,40 42,42 40,46 34,44" fill="#38BDF8" />
          </g>
        </g>
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // COMPACT AVATAR ONLY MODE (No speech bubble)
  // ─────────────────────────────────────────────────────────────────────────
  if (!showSpeechBubble && !message) {
    return (
      <div
        className={`inline-flex items-center justify-center relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderAuraSVG()}
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INTERACTIVE SPEECH BUBBLE & COMPANION CONTAINER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className={`flex items-start gap-2.5 sm:gap-3.5 transition-all duration-500 ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Vector Mascot */}
      <div className="shrink-0 relative cursor-pointer" onClick={() => setInternalMood(m => m === 'celebrating' ? 'idle' : 'celebrating')}>
        {renderAuraSVG()}

        {/* Live Active Status Indicator Pip */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
            internalMood === 'celebrating' || internalMood === 'correct'
              ? 'bg-emerald-500 animate-pulse'
              : internalMood === 'wrong'
              ? 'bg-amber-500'
              : isSpeaking
              ? 'bg-indigo-500 animate-ping'
              : 'bg-indigo-600'
          }`}
          title="Aura AI Guide Active"
        />
      </div>

      {/* Interactive Speech Card */}
      {message && (
        <div className="relative flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border-2 border-indigo-100/90 shadow-2xs text-left min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
          {/* Speech bubble arrow pointer */}
          <div className="absolute -left-2 top-3 w-3 h-3 bg-white border-l-2 border-b-2 border-indigo-100/90 rotate-45 transform" />

          {/* Speaker Header */}
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-700 truncate">
                {speakerName}
              </span>
              <span
                className={`text-[8px] font-bold px-1.5 py-0.2 rounded-md border truncate ${
                  internalMood === 'celebrating' || internalMood === 'correct'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : internalMood === 'wrong'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                {internalMood === 'celebrating' || internalMood === 'correct'
                  ? 'Celebrating'
                  : internalMood === 'wrong'
                  ? 'Encouraging'
                  : internalMood === 'thinking'
                  ? 'Analyzing'
                  : 'Guiding'}
              </span>
            </div>

            {/* Audio Voice Narration Button */}
            {showSpeaker && (
              <button
                type="button"
                onClick={handleSpeak}
                title={isSpeaking ? 'Click to stop Aura voice' : "Click to hear Aura read aloud"}
                aria-label={isSpeaking ? 'Stop voice reading' : 'Listen to Aura read aloud'}
                className={`py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 select-none group active:scale-95 ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xs ring-2 ring-indigo-300 ring-offset-1'
                    : 'bg-slate-50 hover:bg-indigo-50/90 text-slate-600 hover:text-indigo-700 border border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 size={13} className="text-white shrink-0 animate-pulse" />
                    {/* Live Equalizer Audio Waves Animation */}
                    <div className="flex items-center gap-[2px] h-3 px-0.5 shrink-0" aria-hidden="true">
                      <span className="w-[2px] bg-white rounded-full animate-aura-wave-1" />
                      <span className="w-[2px] bg-white rounded-full animate-aura-wave-2" />
                      <span className="w-[2px] bg-white rounded-full animate-aura-wave-3" />
                      <span className="w-[2px] bg-white rounded-full animate-aura-wave-4" />
                    </div>
                    <span className="text-[9px] font-black tracking-wide hidden sm:inline text-white">
                      Speaking
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX size={13} className="text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                    <span className="text-[9px] font-bold text-slate-600 group-hover:text-indigo-700 hidden sm:inline">
                      Listen
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Spoken Message Body in Simple English */}
          <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-snug sm:leading-relaxed">
            {message}
          </p>

          {/* Optional Interactive Hint */}
          {hintText && (
            <div className="mt-1.5 pt-1.5 border-t border-indigo-100/80 flex items-center gap-1 text-[10px] text-indigo-900 font-semibold">
              <Lightbulb size={11} className="text-amber-500 shrink-0" />
              <span className="truncate">{hintText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AuraCharacter
