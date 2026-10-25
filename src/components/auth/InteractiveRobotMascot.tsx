import React, { useState, useEffect } from 'react'

interface InteractiveRobotMascotProps {
  isPasswordFocused: boolean
  isEmailFocused?: boolean
  isPeeking: boolean
  isLoading?: boolean
  customStatus?: string
}

export const InteractiveRobotMascot: React.FC<InteractiveRobotMascotProps> = ({
  isPasswordFocused,
  isEmailFocused = false,
  isPeeking,
  isLoading = false,
  customStatus
}) => {
  const [blink, setBlink] = useState(false)

  // Natural organic blink when eyes are not covered
  useEffect(() => {
    if (isPasswordFocused && !isPeeking) return
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 160)
    }, 4200)
    return () => clearInterval(blinkInterval)
  }, [isPasswordFocused, isPeeking])

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* Dynamic Status Pill */}
      <div className="mb-1.5 sm:mb-2 transition-all duration-300">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50/80 border border-blue-100 text-blue-900 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {isLoading ? (
            <span>Saving new password...</span>
          ) : isPasswordFocused && !isPeeking ? (
            <span className="text-blue-950 font-bold">No peeking — your password is safe! 🙈</span>
          ) : isPasswordFocused && isPeeking ? (
            <span className="text-amber-700 font-bold">Password visible! 👀</span>
          ) : customStatus ? (
            <span className="text-blue-900 font-medium">{customStatus}</span>
          ) : isEmailFocused ? (
            <span>Welcome! Enter your email</span>
          ) : (
            <span className="text-blue-900 font-medium">AI Security Companion</span>
          )}
        </div>
      </div>

      {/* Sleek Minimalist Robot SVG */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 lg:w-56 lg:h-56 transition-transform duration-300 ease-out">
        <svg
          viewBox="0 0 260 260"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ceramic White Head Gradient */}
            <linearGradient id="ceramicHead" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Ceramic White & Dark Blue Body */}
            <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#edf2f7" />
            </linearGradient>

            {/* Deep Dark Blue Visor Glass Gradient */}
            <linearGradient id="visorGlassDarkBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="45%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#0f244a" />
            </linearGradient>

            {/* Cyan Eye Glow */}
            <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft Ambient Shadow */}
            <filter id="robotShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.07" />
            </filter>
          </defs>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* FLOATING ANTENNA                                             */}
          {/* ──────────────────────────────────────────────────────────── */}
          <g className={`transition-all duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
            {/* Stem */}
            <rect x="128" y="24" width="4" height="24" rx="2" fill="#64748b" />
            {/* LED Orb */}
            <circle
              cx="130"
              cy="20"
              r="7"
              fill={isPasswordFocused ? '#f59e0b' : '#38bdf8'}
              filter="url(#cyanGlow)"
            />
            <circle cx="130" cy="20" r="3" fill="#ffffff" />
          </g>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* ROBOT TORSO & SHOULDERS                                      */}
          {/* ──────────────────────────────────────────────────────────── */}
          <g filter="url(#robotShadow)">
            {/* Neck Joint in Dark Blue */}
            <rect x="114" y="148" width="32" height="12" rx="6" fill="#1e3a8a" />

            {/* Torso Shell */}
            <rect
              x="75"
              y="156"
              width="110"
              height="80"
              rx="28"
              fill="url(#ceramicBody)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />

            {/* Dark Blue Chest Core */}
            <circle cx="130" cy="188" r="10" fill="#0f244a" stroke="#1e3a8a" strokeWidth="1.5" />
            <circle
              cx="130"
              cy="188"
              r="4.5"
              fill={isPasswordFocused ? '#f59e0b' : '#38bdf8'}
              filter="url(#cyanGlow)"
              className="transition-colors duration-300"
            />
            {/* Dark Blue Accent Stripe */}
            <line x1="108" y1="206" x2="152" y2="206" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* ROBOT HEAD & VISOR SCREEN                                    */}
          {/* ──────────────────────────────────────────────────────────── */}
          <g
            filter="url(#robotShadow)"
            className="transition-transform duration-300 ease-out"
            style={{
              transformOrigin: '130px 105px',
              transform: isEmailFocused
                ? 'translateY(2px) rotate(1deg)'
                : isPasswordFocused
                ? 'translateY(-1px)'
                : 'translateY(0)'
            }}
          >
            {/* Ear Pods in Dark Blue */}
            <rect x="52" y="88" width="10" height="28" rx="5" fill="#1e3a8a" />
            <circle cx="57" cy="102" r="2.5" fill="#38bdf8" />
            <rect x="198" y="88" width="10" height="28" rx="5" fill="#1e3a8a" />
            <circle cx="203" cy="102" r="2.5" fill="#38bdf8" />

            {/* Head Outer Ceramic Shell */}
            <rect
              x="60"
              y="48"
              width="140"
              height="104"
              rx="38"
              fill="url(#ceramicHead)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />

            {/* Visor Glass Face in Deep Dark Blue */}
            <rect
              x="72"
              y="60"
              width="116"
              height="80"
              rx="26"
              fill="url(#visorGlassDarkBlue)"
            />

            {/* Visor Specular Glass Reflection */}
            <path
              d="M 80 70 Q 130 65 178 74 Q 170 82 86 78 Z"
              fill="#ffffff"
              fillOpacity="0.09"
            />

            {/* ─── EYES ─── */}
            {/* Left Eye */}
            <g
              className="transition-all duration-200"
              style={{
                transformOrigin: '102px 98px',
                transform: blink
                  ? 'scaleY(0.1)'
                  : isEmailFocused
                  ? 'translate(0px, 3.5px)'
                  : isPasswordFocused && !isPeeking
                  ? 'scale(0.85)'
                  : 'scale(1)'
              }}
            >
              <ellipse
                cx="102"
                cy="98"
                rx={blink ? 11 : 10}
                ry={blink ? 1.5 : 12}
                fill="#38bdf8"
                filter="url(#cyanGlow)"
              />
              {!blink && <circle cx="99" cy="94" r="3.5" fill="#ffffff" />}
            </g>

            {/* Right Eye */}
            <g
              className="transition-all duration-200"
              style={{
                transformOrigin: '158px 98px',
                transform: blink
                  ? 'scaleY(0.1)'
                  : isEmailFocused
                  ? 'translate(0px, 3.5px)'
                  : isPasswordFocused && isPeeking
                  ? 'scale(1.15)' // wide curious eye when peeking!
                  : isPasswordFocused
                  ? 'scale(0.85)'
                  : 'scale(1)'
              }}
            >
              <ellipse
                cx="158"
                cy="98"
                rx={blink ? 11 : 10}
                ry={blink ? 1.5 : 12}
                fill={isPasswordFocused && isPeeking ? '#f59e0b' : '#38bdf8'}
                filter="url(#cyanGlow)"
              />
              {!blink && <circle cx="155" cy="94" r="3.5" fill="#ffffff" />}
            </g>

            {/* Minimal Visor Smile / Indicator */}
            {isPasswordFocused && isPeeking ? (
              <path
                d="M 122 120 Q 130 128 138 120"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : isPasswordFocused ? (
              <circle cx="130" cy="122" r="3" fill="#38bdf8" opacity="0.85" />
            ) : isEmailFocused ? (
              <path
                d="M 123 122 Q 130 125 137 122"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M 120 120 Q 130 129 140 120"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* ARTICULATED HANDS (HIDES FACE WHEN TYPING PASSWORD)          */}
          {/* ──────────────────────────────────────────────────────────── */}

          {/* LEFT ARM & HAND */}
          <g
            className="transition-transform duration-500 ease-out"
            style={{
              transformOrigin: '76px 172px',
              transform: isPasswordFocused
                // Smoothly moves hand directly over left eye
                ? 'translate(26px, -74px) rotate(48deg)'
                : isEmailFocused
                ? 'translate(3px, -2px) rotate(4deg)'
                : 'translate(0px, 0px) rotate(0deg)'
            }}
          >
            {/* Shoulder Pod in Dark Blue */}
            <circle cx="68" cy="172" r="10" fill="#1e3a8a" />
            {/* Arm Forearm */}
            <rect x="48" y="172" width="22" height="34" rx="11" fill="url(#ceramicHead)" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Smooth Ceramic Hand with Dark Blue rim */}
            <circle cx="56" cy="210" r="13" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1.5" />
            <circle cx="56" cy="208" r="4" fill="#38bdf8" opacity="0.7" />
          </g>

          {/* RIGHT ARM & HAND */}
          <g
            className="transition-transform duration-500 ease-out"
            style={{
              transformOrigin: '184px 172px',
              transform: isPasswordFocused && isPeeking
                // Lower slightly to peek
                ? 'translate(-18px, -46px) rotate(-22deg)'
                : isPasswordFocused
                // Smoothly moves hand directly over right eye
                ? 'translate(-26px, -74px) rotate(-48deg)'
                : isEmailFocused
                ? 'translate(-3px, -2px) rotate(-4deg)'
                : 'translate(0px, 0px) rotate(0deg)'
            }}
          >
            {/* Shoulder Pod in Dark Blue */}
            <circle cx="192" cy="172" r="10" fill="#1e3a8a" />
            {/* Arm Forearm */}
            <rect x="190" y="172" width="22" height="34" rx="11" fill="url(#ceramicHead)" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Smooth Ceramic Hand with Dark Blue rim */}
            <circle cx="204" cy="210" r="13" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1.5" />
            <circle cx="204" cy="208" r="4" fill="#38bdf8" opacity="0.7" />
          </g>
        </svg>
      </div>

      {/* Soft Ground Reflection */}
      <div className="w-24 sm:w-32 md:w-40 h-2 bg-slate-200/50 rounded-full blur-xs mt-1.5 sm:mt-2" />
    </div>
  )
}
