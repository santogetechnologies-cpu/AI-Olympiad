import React from 'react'

export interface TopicLessonIllustrationProps {
  topic?: string
  chapterTitle?: string
  gradeKey?: string
  chapterNum?: string | number
  size?: number | string
  className?: string
}

/**
 * Authentic, handcrafted topic-specific SVG illustrations.
 * Visually communicates the actual lesson topic:
 * - "Meet My AI Friend": Friendly robot waving & child interacting
 * - "Sensors & Machine Vision": Camera lens scanning objects with bounding boxes
 * - "Voice & Audio Commands": Voice assistant with soundwaves & speech bubble
 * - "Rover Navigation & Autonomous": Planetary rover with lidar dome & radar waves
 * - "Logic & Algorithmic Branching": Robot with decision diamonds & loop arrows
 * - "Smart Helpers / Medical / Home": Assistant robot with medical cross & digital tablet
 * - "Creative Generative AI": Robot artist with stylus painting rainbow digital canvas
 * - "Safety, Ethics & Security": Guardian robot with cyber shield & security vault lock
 * - "Training Data & Machine Learning": Robot curator sorting labeled training tokens
 * - "Neural Networks & Deep Learning": Pulsing multi-layer synapse network
 * - "Smart City & Civic Grid": Robot managing skyscraper grid & green transit
 * - "Python Coding & Terminal": Programmer robot with IDE script & terminal output
 * - "Cyber Detective & Anomaly": Visor detective scanning digital clues & fingerprints
 * - "Physics & Signal Oscilloscope": Blueprint test bench with sinusoidal telemetry
 * - "Cloud Microservices & Distributed": Cluster nodes with API pipeline routes
 * - "Frontier AI & Loss Optimization": Mathematical loss surface descending gradient
 */
export const TopicLessonIllustration: React.FC<TopicLessonIllustrationProps> = ({
  topic = '',
  chapterTitle = '',
  gradeKey = '',
  chapterNum = '1',
  size = 115,
  className = '',
}) => {
  const t = (topic + ' ' + chapterTitle).toLowerCase()

  // Compute 4:3 proportional dimensions so SVGs never distort
  const numWidth = typeof size === 'number' ? size : parseInt(String(size), 10) || 115
  const numHeight = Math.round(numWidth * (120 / 160))

  // 1. "Meet My AI Friend" / Human-Robot Interaction
  if (t.includes('friend') || t.includes('meet') || (gradeKey === 'class3' && String(chapterNum) === '1' && t.includes('ai'))) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="humanSkin" x1="0" y1="0" x2="0" y2="100%">
            <stop stopColor="#FDBA74" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="robotBody" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="sparkleGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EF4444" />
          </linearGradient>
        </defs>

        {/* HUMAN FRIEND (Left) - Clean Standalone Graphic */}
        <path d="M22 108 C22 86, 30 76, 44 76 C58 76, 66 86, 66 108 Z" fill="#0284C7" />
        <rect x="40" y="66" width="8" height="12" rx="3" fill="url(#humanSkin)" />
        <circle cx="44" cy="52" r="16" fill="url(#humanSkin)" />
        <path d="M28 48 C28 34, 40 30, 54 34 C60 38, 62 46, 60 50 C54 42, 40 42, 34 50 Z" fill="#451A03" />
        <circle cx="49" cy="51" r="2.2" fill="#1E293B" />
        <path d="M47 58 Q52 63 56 58" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M58 82 Q70 72 74 64" stroke="#FB923C" strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="75" cy="62" r="5" fill="#FDBA74" />

        {/* CONNECTING FRIENDSHIP SPARKLE & SIGNAL WAVES */}
        <path d="M76 44 Q80 38 84 44" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
        </path>
        <path d="M74 36 Q80 28 86 36" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.8s" repeatCount="indefinite" />
        </path>
        <g transform="translate(74, 50)">
          <path d="M6 3.5 C6 1.5 4 0 2 0 C0 0 -1 2 0 4 L6 10 L12 4 C13 2 12 0 10 0 C8 0 6 1.5 6 3.5 Z" fill="url(#sparkleGrad)" />
        </g>

        {/* ROBOT FRIEND (Right) */}
        <ellipse cx="118" cy="110" rx="24" ry="4.5" fill="#CBD5E1" opacity="0.85">
          <animate attributeName="rx" values="20;26;20" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <rect x="98" y="76" width="38" height="26" rx="9" fill="url(#robotBody)" stroke="#C7D2FE" strokeWidth="1.8" />
        <circle cx="117" cy="89" r="4.5" fill="#38BDF8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <rect x="113" y="68" width="8" height="9" rx="2" fill="#94A3B8" />
        <rect x="96" y="34" width="42" height="36" rx="11" fill="url(#robotBody)" stroke="#C7D2FE" strokeWidth="2" />
        <line x1="117" y1="22" x2="117" y2="34" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="117" cy="20" r="4.5" fill="#38BDF8">
          <animate attributeName="r" values="3.5;5.5;3.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <rect x="103" y="40" width="28" height="23" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
        <circle cx="110" cy="50" r="3.2" fill="#38BDF8" />
        <circle cx="124" cy="50" r="3.2" fill="#38BDF8" />
        <path d="M112 56 Q117 60 122 56" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M100 82 Q90 72 84 65" stroke="#818CF8" strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="83" cy="63" r="5" fill="#38BDF8" />
      </svg>
    )
  }

  // 1B. MEDICAL, HOSPITAL & HEALTHCARE AI HELPERS
  if (t.includes('hospital') || t.includes('doctor') || t.includes('medical') || t.includes('health') || t.includes('nurse') || t.includes('care')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="medRobot" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        {/* Medical Assistant Robot */}
        <rect x="20" y="36" width="46" height="52" rx="12" fill="url(#medRobot)" stroke="#BAE6FD" strokeWidth="2" />
        <circle cx="43" cy="24" r="5" fill="#EF4444" />
        <line x1="43" y1="28" x2="43" y2="36" stroke="#38BDF8" strokeWidth="2.5" />
        <rect x="29" y="46" width="28" height="20" rx="5" fill="#0F172A" />
        <circle cx="37" cy="55" r="3" fill="#38BDF8" />
        <circle cx="49" cy="55" r="3" fill="#38BDF8" />
        {/* Red Cross Badge on Chest */}
        <circle cx="43" cy="74" r="7" fill="#FFFFFF" />
        <rect x="41" y="70" width="4" height="8" rx="1" fill="#EF4444" />
        <rect x="39" y="72" width="8" height="4" rx="1" fill="#EF4444" />

        {/* Diagnostic Heartbeat Monitor */}
        <rect x="76" y="28" width="74" height="66" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <path d="M82 62 L96 62 L102 46 L108 78 L114 56 L120 66 L124 62 L144 62" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <animate attributeName="strokeDashoffset" values="0;20;0" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="134" cy="40" r="4" fill="#EF4444">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="113" y="85" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          HEALTH MONITOR: 100%
        </text>
      </svg>
    )
  }

  // 1C. SMART CITIES, GREEN AI & RECYCLING
  if (t.includes('city') || t.includes('green') || t.includes('recycle') || t.includes('traffic') || t.includes('eco') || t.includes('energy')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        {/* Skyscraper Silhouettes */}
        <rect x="18" y="44" width="28" height="64" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="23" y="52" width="6" height="6" rx="1" fill="#FDE047" />
        <rect x="33" y="52" width="6" height="6" rx="1" fill="#38BDF8" />
        <rect x="23" y="66" width="6" height="6" rx="1" fill="#38BDF8" />
        <rect x="33" y="66" width="6" height="6" rx="1" fill="#FDE047" />

        <rect x="52" y="30" width="34" height="78" rx="5" fill="#0F172A" stroke="#10B981" strokeWidth="1.8" />
        <line x1="69" y1="18" x2="69" y2="30" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="69" cy="16" r="3.5" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <rect x="58" y="40" width="7" height="7" rx="1" fill="#34D399" />
        <rect x="71" y="40" width="7" height="7" rx="1" fill="#34D399" />
        <rect x="58" y="54" width="7" height="7" rx="1" fill="#34D399" />
        <rect x="71" y="54" width="7" height="7" rx="1" fill="#34D399" />

        {/* Eco Wind Turbine & Solar Cell */}
        <line x1="120" y1="44" x2="120" y2="98" stroke="#64748B" strokeWidth="3" />
        <circle cx="120" cy="44" r="5" fill="#0284C7" />
        <line x1="120" y1="44" x2="104" y2="30" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="44" x2="136" y2="30" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="44" x2="120" y2="64" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

        {/* Green Leaf Symbol */}
        <path d="M136 68 C136 56, 150 56, 150 56 C150 68, 136 78, 136 68 Z" fill="#10B981" />
        <path d="M92 98 L152 98" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 2. SENSORS, CAMERAS & MACHINE VISION
  if (t.includes('sensor') || t.includes('see') || t.includes('eye') || t.includes('vision') || t.includes('camera') || t.includes('optic')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="lensGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="scanCone" x1="0" y1="0" x2="100%" y2="0">
            <stop stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="1" stopColor="#6366F1" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Optical Sensor Unit */}
        <rect x="14" y="26" width="48" height="66" rx="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="38" cy="59" r="19" fill="#0F172A" stroke="#0EA5E9" strokeWidth="3" />
        <circle cx="38" cy="59" r="12" fill="url(#lensGrad)" />
        <circle cx="35" cy="55" r="4" fill="#FFFFFF" opacity="0.85" />
        <circle cx="38" cy="36" r="3.2" fill="#10B981">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Laser Vision Scanning Cone */}
        <polygon points="56,46 138,18 138,102 56,74" fill="url(#scanCone)" />
        <line x1="56" y1="59" x2="138" y2="59" stroke="#38BDF8" strokeDasharray="3 3" strokeWidth="1.8" />

        {/* TARGET DETECTED OBJECT */}
        <path d="M106 36 L94 36 L94 48" stroke="#10B981" strokeWidth="2.8" fill="none" />
        <path d="M136 36 L148 36 L148 48" stroke="#10B981" strokeWidth="2.8" fill="none" />
        <path d="M106 84 L94 84 L94 72" stroke="#10B981" strokeWidth="2.8" fill="none" />
        <path d="M136 84 L148 84 L148 72" stroke="#10B981" strokeWidth="2.8" fill="none" />

        <circle cx="121" cy="60" r="17" fill="#EF4444" />
        <path d="M121 43 Q126 37 130 41" stroke="#15803D" strokeWidth="2.8" strokeLinecap="round" />
        <rect x="101" y="88" width="42" height="13" rx="3.5" fill="#0F172A" opacity="0.95" />
        <text x="122" y="98" fill="#34D399" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          MATCH 98%
        </text>
      </svg>
    )
  }

  // 3. VOICE, AUDIO & SPEECH COMMANDS
  if (t.includes('command') || t.includes('voice') || t.includes('audio') || t.includes('speech') || t.includes('hear') || t.includes('talk')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="audioRobot" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        <rect x="22" y="30" width="52" height="58" rx="14" fill="url(#audioRobot)" stroke="#DDD6FE" strokeWidth="2" />
        <path d="M18 56 C18 24, 78 24, 78 56" stroke="#4C1D95" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="19" cy="56" r="9" fill="#EC4899" />
        <circle cx="77" cy="56" r="9" fill="#EC4899" />
        <path d="M19 56 Q23 78 44 82" stroke="#F43F5E" strokeWidth="3.2" fill="none" />
        <circle cx="45" cy="82" r="4" fill="#F43F5E" />

        <rect x="31" y="42" width="34" height="28" rx="6" fill="#0F172A" stroke="#A78BFA" strokeWidth="1.2" />
        <line x1="37" y1="56" x2="37" y2="56" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="51" x2="42" y2="61" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <line x1="48" y1="47" x2="48" y2="65" stroke="#34D399" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="54" y1="50" x2="54" y2="62" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <line x1="59" y1="56" x2="59" y2="56" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />

        {/* Speech Prompt Bubble */}
        <path
          d="M90 32 C90 20, 150 20, 150 36 C150 52, 110 52, 100 60 L96 52 C92 50, 90 42, 90 32 Z"
          fill="#FFFFFF"
          stroke="#C4B5FD"
          strokeWidth="1.8"
        />
        <text x="120" y="39" fill="#6D28D9" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          "Hello Aura!"
        </text>

        {/* Sound Waves */}
        <path d="M102 74 Q109 80 102 86" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M110 68 Q122 80 110 92" stroke="#A78BFA" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M118 62 Q134 80 118 98" stroke="#C4B5FD" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      </svg>
    )
  }

  // 4. ROVER, AUTONOMOUS NAVIGATION & MAPS
  if (t.includes('rover') || t.includes('move') || t.includes('map') || t.includes('vehicle') || t.includes('autonomous') || t.includes('navigation') || t.includes('road')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="chassisGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>

        <path d="M8 102 Q50 95 90 104 T152 98" stroke="#CBD5E1" strokeWidth="3" fill="none" />

        <rect x="32" y="46" width="74" height="36" rx="9" fill="url(#chassisGrad)" stroke="#FEF3C7" strokeWidth="1.8" />
        <path d="M48 46 C48 28, 86 28, 86 46 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.8" />
        <circle cx="67" cy="36" r="4.5" fill="#38BDF8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
        <path d="M67 26 Q80 17 93 26" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M67 19 Q87 8 107 19" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />

        <circle cx="44" cy="88" r="13" fill="#1E293B" stroke="#64748B" strokeWidth="3.2" />
        <circle cx="44" cy="88" r="4.5" fill="#F59E0B" />
        <circle cx="69" cy="88" r="13" fill="#1E293B" stroke="#64748B" strokeWidth="3.2" />
        <circle cx="69" cy="88" r="4.5" fill="#F59E0B" />
        <circle cx="94" cy="88" r="13" fill="#1E293B" stroke="#64748B" strokeWidth="3.2" />
        <circle cx="94" cy="88" r="4.5" fill="#F59E0B" />

        <path d="M106 68 L126 52 L142 66" stroke="#10B981" strokeWidth="2.2" strokeDasharray="3 3" fill="none" />
        <line x1="142" y1="48" x2="142" y2="70" stroke="#1E293B" strokeWidth="2.2" />
        <polygon points="142,48 156,55 142,62" fill="#EF4444" />
      </svg>
    )
  }

  // 5. CODING, PYTHON, LOGIC & ALGORITHMS
  if (t.includes('code') || t.includes('python') || t.includes('logic') || t.includes('order') || t.includes('algorithm') || t.includes('terminal')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="codeGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#0284C7" />
            <stop offset="1" stopColor="#0369A1" />
          </linearGradient>
        </defs>

        <rect x="16" y="36" width="44" height="46" rx="11" fill="url(#codeGrad)" stroke="#BAE6FD" strokeWidth="1.8" />
        <circle cx="38" cy="28" r="4.5" fill="#F59E0B" />
        <line x1="38" y1="32" x2="38" y2="36" stroke="#38BDF8" strokeWidth="2.2" />
        <rect x="23" y="46" width="30" height="14" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
        <circle cx="31" cy="53" r="2.8" fill="#38BDF8" />
        <circle cx="45" cy="53" r="2.8" fill="#38BDF8" />

        <circle cx="28" cy="85" r="4.5" fill="#64748B" />
        <circle cx="48" cy="85" r="4.5" fill="#64748B" />

        <rect x="68" y="22" width="84" height="76" rx="9" fill="#0F172A" stroke="#334155" strokeWidth="1.8" />
        <rect x="68" y="22" width="84" height="15" rx="9" fill="#1E293B" />
        <circle cx="76" cy="30" r="2.8" fill="#EF4444" />
        <circle cx="84" cy="30" r="2.8" fill="#F59E0B" />
        <circle cx="92" cy="30" r="2.8" fill="#10B981" />

        <text x="75" y="50" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold">
          step 1: look()
        </text>
        <text x="75" y="61" fill="#FDE047" fontSize="7" fontFamily="monospace">
          step 2: think()
        </text>
        <text x="75" y="72" fill="#34D399" fontSize="7" fontFamily="monospace">
          step 3: move()
        </text>

        <rect x="74" y="78" width="72" height="15" rx="3.5" fill="#022C22" stroke="#059669" strokeWidth="0.9" />
        <text x="78" y="89" fill="#34D399" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
          &gt; Success: OK!
        </text>
      </svg>
    )
  }

  // 6. CREATIVE AI, ART, MUSIC & STORIES
  if (t.includes('create') || t.includes('art') || t.includes('draw') || t.includes('music') || t.includes('imagine') || t.includes('story')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="artGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#EC4899" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="canvasGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#FEF08A" />
            <stop offset="1" stopColor="#F472B6" />
          </linearGradient>
        </defs>

        <rect x="18" y="34" width="46" height="48" rx="13" fill="url(#artGrad)" stroke="#FBCFE8" strokeWidth="2" />
        <path d="M20 34 Q41 18 62 34" stroke="#BE185D" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="41" cy="21" r="4" fill="#F43F5E" />

        <rect x="27" y="42" width="28" height="22" rx="5" fill="#0F172A" />
        <circle cx="35" cy="53" r="2.8" fill="#F472B6" />
        <circle cx="47" cy="53" r="2.8" fill="#38BDF8" />

        <path d="M54 70 L74 54" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="74,54 80,50 78,57" fill="#EC4899" />
        <circle cx="80" cy="50" r="3.5" fill="#FDE047">
          <animate attributeName="r" values="2.5;4.5;2.5" dur="1s" repeatCount="indefinite" />
        </circle>

        <rect x="84" y="24" width="66" height="68" rx="9" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.2" />
        <circle cx="106" cy="46" r="12" fill="url(#canvasGrad)" />
        <polygon points="124,70 140,46 148,70" fill="#818CF8" />
        <polygon points="96,76 112,54 126,76" fill="#34D399" />

        <g transform="translate(134, 20)">
          <path d="M2 13 L2 2 L11 4 L11 15 M2 7 L11 9" stroke="#A855F7" strokeWidth="2" fill="none" />
          <circle cx="2" cy="13" r="2.2" fill="#A855F7" />
          <circle cx="11" cy="15" r="2.2" fill="#A855F7" />
        </g>
      </svg>
    )
  }

  // 7. SAFETY, ETHICS, PRIVACY & GUARDIAN
  if (t.includes('safety') || t.includes('care') || t.includes('privacy') || t.includes('rule') || t.includes('ethical') || t.includes('guard')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        <rect x="20" y="32" width="48" height="50" rx="13" fill="#1E293B" stroke="#34D399" strokeWidth="2" />
        <circle cx="44" cy="20" r="5.5" fill="#10B981">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <line x1="44" y1="25" x2="44" y2="32" stroke="#10B981" strokeWidth="2.8" />
        <rect x="29" y="42" width="30" height="20" rx="5" fill="#0F172A" stroke="#10B981" strokeWidth="1.2" />
        <circle cx="37" cy="52" r="2.8" fill="#34D399" />
        <circle cx="51" cy="52" r="2.8" fill="#34D399" />

        <path
          d="M112 20 C128 20, 142 26, 142 42 C142 74, 112 92, 112 98 C112 92, 82 74, 82 42 C82 26, 96 20, 112 20 Z"
          fill="url(#shieldGrad)"
          stroke="#A7F3D0"
          strokeWidth="2.2"
        />
        <rect x="101" y="52" width="22" height="20" rx="4.5" fill="#FFFFFF" />
        <path d="M105 52 L105 43 C105 38, 119 38, 119 43 L119 52" stroke="#FFFFFF" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <circle cx="112" cy="61" r="2.8" fill="#059669" />
        <line x1="112" y1="63" x2="112" y2="68" stroke="#059669" strokeWidth="2.2" />
      </svg>
    )
  }

  // 8. DATA, DATASETS, CLASSIFICATION & MACHINE LEARNING
  if (t.includes('data') || t.includes('learn') || t.includes('dataset') || t.includes('classif') || t.includes('pattern')) {
    return (
      <svg
        width={numWidth}
        height={numHeight}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
      >
        <defs>
          <linearGradient id="dataGrad" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>
        </defs>

        <rect x="18" y="30" width="46" height="50" rx="11" fill="url(#dataGrad)" stroke="#C7D2FE" strokeWidth="2" />
        <circle cx="41" cy="20" r="4.5" fill="#38BDF8" />
        <line x1="41" y1="24" x2="41" y2="30" stroke="#818CF8" strokeWidth="2.5" />
        <rect x="27" y="40" width="28" height="19" rx="5" fill="#0F172A" />
        <circle cx="35" cy="49" r="2.8" fill="#38BDF8" />
        <circle cx="47" cy="49" r="2.8" fill="#38BDF8" />

        <rect x="74" y="22" width="34" height="28" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.8" />
        <circle cx="91" cy="34" r="5.5" fill="#3B82F6" />
        <text x="91" y="46" fill="#1E40AF" fontSize="5.5" fontWeight="bold" textAnchor="middle">CAT A</text>

        <rect x="74" y="56" width="34" height="28" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.8" />
        <polygon points="91,62 98,73 84,73" fill="#10B981" />
        <text x="91" y="80" fill="#065F46" fontSize="5.5" fontWeight="bold" textAnchor="middle">CAT B</text>

        <path d="M112 38 L124 50 M112 68 L124 56" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="126" y="36" width="30" height="36" rx="7" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.8" />
        <text x="141" y="51" fill="#A5B4FC" fontSize="6" fontWeight="bold" textAnchor="middle">MODEL</text>
        <circle cx="141" cy="62" r="4.5" fill="#10B981">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    )
  }

  // 9. DEFAULT / DEEP TECH / NEURAL COMPUTING
  return (
    <svg
      width={numWidth}
      height={numHeight}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none transition-transform hover:scale-102 ${className}`}
    >
      <defs>
        <linearGradient id="synthGrad" x1="0" y1="0" x2="100%" y2="100%">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      <rect x="18" y="32" width="48" height="52" rx="13" fill="url(#synthGrad)" stroke="#C7D2FE" strokeWidth="2" />
      <circle cx="42" cy="20" r="5" fill="#38BDF8">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <line x1="42" y1="24" x2="42" y2="32" stroke="#818CF8" strokeWidth="2.5" />
      <rect x="27" y="42" width="30" height="22" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
      <circle cx="36" cy="53" r="3.2" fill="#38BDF8" />
      <circle cx="48" cy="53" r="3.2" fill="#38BDF8" />

      <circle cx="94" cy="34" r="6.5" fill="#38BDF8" />
      <circle cx="94" cy="74" r="6.5" fill="#38BDF8" />
      <circle cx="125" cy="44" r="7.5" fill="#818CF8" />
      <circle cx="125" cy="66" r="7.5" fill="#818CF8" />
      <circle cx="147" cy="55" r="8.5" fill="#10B981" />

      <line x1="94" y1="34" x2="125" y2="44" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="94" y1="34" x2="125" y2="66" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="94" y1="74" x2="125" y2="44" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="94" y1="74" x2="125" y2="66" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="125" y1="44" x2="147" y2="55" stroke="#6EE7B7" strokeWidth="2.2" />
      <line x1="125" y1="66" x2="147" y2="55" stroke="#6EE7B7" strokeWidth="2.2" />
    </svg>
  )
}
