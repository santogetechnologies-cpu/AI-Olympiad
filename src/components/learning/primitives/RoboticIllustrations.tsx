import React from 'react'

export type RobotVariant =
  | 'assistant'
  | 'rover'
  | 'drone'
  | 'scientist'
  | 'brain'
  | 'circuit'
  | 'mech'
  | 'scout'

interface RobotIllustrationProps {
  variant?: RobotVariant
  size?: number | string
  className?: string
}

/**
 * Modern, crisp, vector-based Robotic SVG illustrations for learning sections.
 * Clean lines, cyber glows, and friendly sci-fi anime aesthetics.
 */
export const RoboticIllustration: React.FC<RobotIllustrationProps> = ({
  variant = 'assistant',
  size = 64,
  className = '',
}) => {
  switch (variant) {
    case 'rover':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="roverBody" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="roverGlow" x1="0" y1="0" x2="0" y2="100%">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Antenna */}
          <line x1="60" y1="20" x2="60" y2="40" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="18" r="5" fill="#F43F5E" />
          <circle cx="60" cy="18" r="8" stroke="#F43F5E" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Main Chassis */}
          <rect x="25" y="40" width="70" height="42" rx="12" fill="url(#roverBody)" stroke="#C7D2FE" strokeWidth="2" />
          {/* Sensor Visor */}
          <rect x="35" y="48" width="50" height="16" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="48" cy="56" r="4" fill="url(#roverGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="72" cy="56" r="4" fill="url(#roverGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Side Thrusters / Wheels */}
          <circle cx="30" cy="90" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
          <circle cx="30" cy="90" r="4" fill="#38BDF8" />
          <circle cx="60" cy="90" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
          <circle cx="60" cy="90" r="4" fill="#38BDF8" />
          <circle cx="90" cy="90" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
          <circle cx="90" cy="90" r="4" fill="#38BDF8" />
          {/* Ground shadow */}
          <ellipse cx="60" cy="108" rx="45" ry="5" fill="#CBD5E1" opacity="0.6" />
        </svg>
      )

    case 'drone':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="droneGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          {/* Propeller Rotors */}
          <line x1="15" y1="35" x2="45" y2="35" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="35" r="3" fill="#0EA5E9" />
          <line x1="75" y1="35" x2="105" y2="35" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="90" cy="35" r="3" fill="#0EA5E9" />
          {/* Propeller Arms */}
          <path d="M30 35 L50 55 M90 35 L70 55" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          {/* Central Sphere Pod */}
          <circle cx="60" cy="60" r="22" fill="url(#droneGrad)" stroke="#BAE6FD" strokeWidth="2" />
          {/* Central Eye Lens */}
          <circle cx="60" cy="60" r="10" fill="#0F172A" />
          <circle cx="60" cy="60" r="5" fill="#38BDF8">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Thruster Pulse */}
          <ellipse cx="60" cy="88" rx="8" ry="3" fill="#38BDF8" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      )

    case 'scientist':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="scientistGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          {/* Cyber Goggles Frame */}
          <rect x="36" y="32" width="48" height="38" rx="14" fill="url(#scientistGrad)" stroke="#DDD6FE" strokeWidth="2" />
          {/* Round Goggle Lenses */}
          <circle cx="48" cy="48" r="9" fill="#0F172A" stroke="#A78BFA" strokeWidth="2" />
          <circle cx="72" cy="48" r="9" fill="#0F172A" stroke="#A78BFA" strokeWidth="2" />
          <circle cx="48" cy="48" r="4" fill="#34D399" />
          <circle cx="72" cy="48" r="4" fill="#34D399" />
          <line x1="57" y1="48" x2="63" y2="48" stroke="#A78BFA" strokeWidth="2" />
          {/* Scientist Bowtie / Core */}
          <path d="M48 76 L72 76 L60 84 Z" fill="#F43F5E" />
          {/* Torso Lab Coat */}
          <path d="M30 88 C30 76, 90 76, 90 88 L96 110 L24 110 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="60" y1="84" x2="60" y2="110" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="60" cy="94" r="2" fill="#6366F1" />
          <circle cx="60" cy="102" r="2" fill="#6366F1" />
        </svg>
      )

    case 'brain':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="brainGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#EC4899" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Synapse Network Nodes */}
          <circle cx="60" cy="60" r="32" fill="url(#brainGrad)" opacity="0.15" />
          <path
            d="M40 50 C40 35, 60 30, 60 45 C60 30, 80 35, 80 50 C85 65, 75 80, 60 84 C45 80, 35 65, 40 50 Z"
            fill="none"
            stroke="url(#brainGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glowing Synapse Nodes */}
          <circle cx="45" cy="45" r="3.5" fill="#EC4899" />
          <circle cx="75" cy="45" r="3.5" fill="#8B5CF6" />
          <circle cx="60" cy="62" r="4.5" fill="#38BDF8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <line x1="45" y1="45" x2="60" y2="62" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="75" y1="45" x2="60" y2="62" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      )

    case 'circuit':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="chipGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
          {/* Chip Center */}
          <rect x="36" y="36" width="48" height="48" rx="8" fill="url(#chipGrad)" stroke="#A7F3D0" strokeWidth="2" />
          {/* Core Symbol */}
          <circle cx="60" cy="60" r="10" fill="#064E3B" stroke="#6EE7B7" strokeWidth="2" />
          <circle cx="60" cy="60" r="4" fill="#FBBF24" />
          {/* Pins */}
          <line x1="46" y1="26" x2="46" y2="36" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="26" x2="60" y2="36" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="74" y1="26" x2="74" y2="36" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="84" x2="46" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="84" x2="60" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="74" y1="84" x2="74" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )

    case 'mech':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="mechGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Angular Helmet */}
          <path d="M40 30 L80 30 L90 55 L75 80 L45 80 L30 55 Z" fill="url(#mechGrad)" stroke="#FDE68A" strokeWidth="2" />
          {/* Visor Slit */}
          <path d="M38 52 L82 52 L78 62 L42 62 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="52" y="55" width="16" height="4" rx="2" fill="#38BDF8">
            <animate attributeName="x" values="42;62;42" dur="2s" repeatCount="indefinite" />
          </rect>
          {/* Horns / Antennae */}
          <path d="M38 30 L28 15" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M82 30 L92 15" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )

    case 'scout':
    case 'assistant':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 drop-shadow-sm ${className}`}
        >
          <defs>
            <linearGradient id="asstBody" x1="0" y1="0" x2="100%" y2="100%">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          {/* Floating Glow */}
          <circle cx="60" cy="55" r="42" fill="#EEF2FF" opacity="0.6" />
          {/* Antenna */}
          <line x1="60" y1="18" x2="60" y2="30" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="15" r="4.5" fill="#38BDF8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
          </circle>
          {/* Head Unit */}
          <rect x="32" y="30" width="56" height="46" rx="14" fill="url(#asstBody)" stroke="#C7D2FE" strokeWidth="2" />
          {/* Face Screen */}
          <rect x="39" y="37" width="42" height="30" rx="8" fill="url(#screenGrad)" stroke="#38BDF8" strokeWidth="1" />
          {/* Friendly Eyes */}
          <circle cx="50" cy="52" r="3.5" fill="#38BDF8" />
          <circle cx="70" cy="52" r="3.5" fill="#38BDF8" />
          <path d="M54 59 Q60 63 66 59" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Floating Torso */}
          <rect x="44" y="82" width="32" height="18" rx="8" fill="#4F46E5" stroke="#C7D2FE" strokeWidth="1.5" />
          <circle cx="60" cy="91" r="3" fill="#F43F5E" />
          {/* Pulse Shadow */}
          <ellipse cx="60" cy="108" rx="20" ry="3.5" fill="#CBD5E1" opacity="0.7">
            <animate attributeName="rx" values="16;22;16" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      )
  }
}

/**
 * Randomly select a robot vector illustration for visual variety
 */
export const RandomRoboticBadge: React.FC<{
  seed?: string | number
  size?: number | string
  className?: string
}> = ({ seed = '1', size = 56, className = '' }) => {
  const variants: RobotVariant[] = ['assistant', 'rover', 'drone', 'scientist', 'brain', 'circuit', 'mech', 'scout']
  const num = typeof seed === 'number' ? seed : seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const variant = variants[Math.abs(num) % variants.length]

  return <RoboticIllustration variant={variant} size={size} className={className} />
}
