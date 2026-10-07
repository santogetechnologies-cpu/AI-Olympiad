import React from 'react'

interface SVGProps {
  className?: string
  size?: number
}

// 1. Animated Robot Mascot SVG with pulsing radar eyes & glowing core
export const AnimatedRobotSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Antenna */}
    <line x1="100" y1="20" x2="100" y2="45" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" />
    <circle cx="100" cy="18" r="9" fill="#818CF8">
      <animate attributeName="r" values="8;12;8" dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="18" r="16" stroke="#818CF8" strokeWidth="2" opacity="0.4">
      <animate attributeName="r" values="10;22;10" dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Robot Head */}
    <rect x="45" y="45" width="110" height="80" rx="28" fill="url(#headGrad)" stroke="#818CF8" strokeWidth="3" />
    
    {/* Ears / Head Bolts */}
    <rect x="35" y="70" width="10" height="30" rx="5" fill="#4F46E5" />
    <rect x="155" y="70" width="10" height="30" rx="5" fill="#4F46E5" />

    {/* Visor Screen */}
    <rect x="58" y="60" width="84" height="48" rx="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />

    {/* Expressive Glowing Eyes */}
    <g>
      <circle cx="82" cy="84" r="10" fill="#38BDF8">
        <animate attributeName="transform" type="scale" values="1;1.08;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="81" r="3.5" fill="#FFFFFF" />
      <circle cx="118" cy="84" r="10" fill="#38BDF8">
        <animate attributeName="transform" type="scale" values="1;1.08;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="121" cy="81" r="3.5" fill="#FFFFFF" />
    </g>

    {/* Blinking Smile Wave */}
    <path d="M88 98 Q100 104 112 98" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />

    {/* Neck */}
    <rect x="85" y="125" width="30" height="12" rx="4" fill="#334155" />

    {/* Body */}
    <rect x="52" y="137" width="96" height="52" rx="20" fill="url(#bodyGrad)" stroke="#6366F1" strokeWidth="3" />

    {/* Chest Arc Reactor / AI Core */}
    <circle cx="100" cy="162" r="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
    <polygon points="100,154 107,167 93,167" fill="#FBBF24">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
    </polygon>

    {/* Shoulder Joints */}
    <circle cx="44" cy="150" r="8" fill="#6366F1" />
    <circle cx="156" cy="150" r="8" fill="#6366F1" />

    <defs>
      <linearGradient id="headGrad" x1="45" y1="45" x2="155" y2="125" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E1B4B" />
        <stop offset="1" stopColor="#312E81" />
      </linearGradient>
      <linearGradient id="bodyGrad" x1="52" y1="137" x2="148" y2="189" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="1" stopColor="#0F172A" />
      </linearGradient>
    </defs>
  </svg>
)

// 2. Animated Neural Network SVG with firing synaptic pulses
export const AnimatedNeuralNetworkSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Synaptic Axon Lines */}
    <g stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3">
      {/* Input to Hidden Layer */}
      <line x1="40" y1="50" x2="100" y2="40" />
      <line x1="40" y1="50" x2="100" y2="100" />
      <line x1="40" y1="50" x2="100" y2="160" />
      <line x1="40" y1="100" x2="100" y2="40" />
      <line x1="40" y1="100" x2="100" y2="100" />
      <line x1="40" y1="100" x2="100" y2="160" />
      <line x1="40" y1="150" x2="100" y2="40" />
      <line x1="40" y1="150" x2="100" y2="100" />
      <line x1="40" y1="150" x2="100" y2="160" />

      {/* Hidden to Output Layer */}
      <line x1="100" y1="40" x2="160" y2="70" />
      <line x1="100" y1="40" x2="160" y2="130" />
      <line x1="100" y1="100" x2="160" y2="70" />
      <line x1="100" y1="100" x2="160" y2="130" />
      <line x1="100" y1="160" x2="160" y2="70" />
      <line x1="100" y1="160" x2="160" y2="130" />
    </g>

    {/* Firing Electrical Pulse Particles */}
    <circle r="4" fill="#38BDF8">
      <animateMotion path="M40,50 L100,100 L160,70" dur="2.4s" repeatCount="indefinite" />
    </circle>
    <circle r="4" fill="#F43F5E">
      <animateMotion path="M40,150 L100,40 L160,130" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle r="3.5" fill="#10B981">
      <animateMotion path="M40,100 L100,160 L160,70" dur="2.1s" repeatCount="indefinite" />
    </circle>

    {/* Input Layer Nodes */}
    <circle cx="40" cy="50" r="13" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
    <circle cx="40" cy="50" r="6" fill="#38BDF8" />
    <circle cx="40" cy="100" r="13" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
    <circle cx="40" cy="100" r="6" fill="#38BDF8" />
    <circle cx="40" cy="150" r="13" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
    <circle cx="40" cy="150" r="6" fill="#38BDF8" />

    {/* Hidden Layer Nodes */}
    <circle cx="100" cy="40" r="14" fill="#1E293B" stroke="#818CF8" strokeWidth="3" />
    <circle cx="100" cy="40" r="6" fill="#818CF8" />
    <circle cx="100" cy="100" r="16" fill="#1E293B" stroke="#A855F7" strokeWidth="3.5" />
    <circle cx="100" cy="100" r="7" fill="#C084FC" />
    <circle cx="100" cy="160" r="14" fill="#1E293B" stroke="#818CF8" strokeWidth="3" />
    <circle cx="100" cy="160" r="6" fill="#818CF8" />

    {/* Output Layer Nodes */}
    <circle cx="160" cy="70" r="15" fill="#1E293B" stroke="#10B981" strokeWidth="3" />
    <circle cx="160" cy="70" r="7" fill="#34D399" />
    <circle cx="160" cy="130" r="15" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
    <circle cx="160" cy="130" r="7" fill="#FBBF24" />
  </svg>
)

// 3. Animated Data Flow SVG with streaming packets
export const AnimatedDataFlowSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Flow Pipes */}
    <path d="M30 60 H100 V140 H170" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 140 H80 V90 H170" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Glowing Data Packets Moving along tracks */}
    <circle r="6" fill="#38BDF8">
      <animateMotion path="M30 60 H100 V140 H170" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <circle r="5" fill="#F43F5E">
      <animateMotion path="M30 140 H80 V90 H170" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Ingestion Server Node */}
    <rect x="15" y="40" width="30" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
    <line x1="22" y1="52" x2="38" y2="52" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="62" x2="32" y2="62" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <circle cx="38" cy="62" r="2" fill="#10B981" />

    {/* Central Processing Transform Node */}
    <rect x="76" y="80" width="48" height="40" rx="12" fill="#312E81" stroke="#818CF8" strokeWidth="2.5" />
    <path d="M92 92 L108 100 L92 108 Z" fill="#A5B4FC">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
    </path>

    {/* Destination Knowledge Vault / Database */}
    <rect x="150" y="115" width="36" height="50" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
    <ellipse cx="168" cy="128" rx="12" ry="5" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
    <ellipse cx="168" cy="140" rx="12" ry="5" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
    <ellipse cx="168" cy="152" rx="12" ry="5" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
  </svg>
)

// 4. Animated Autonomous Vehicle & LiDAR Scanner SVG
export const AnimatedSmartCarSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Road Surface */}
    <line x1="20" y1="165" x2="180" y2="165" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    <line x1="30" y1="165" x2="60" y2="165" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
    <line x1="85" y1="165" x2="115" y2="165" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
    <line x1="140" y1="165" x2="170" y2="165" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />

    {/* 360-Degree LiDAR Sensor Cone */}
    <path d="M100 80 L170 35 L175 95 Z" fill="url(#lidarGrad)" opacity="0.45">
      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M100 80 L25 45 L30 105 Z" fill="url(#lidarGrad2)" opacity="0.35">
      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
    </path>

    {/* Spinning Rooftop LiDAR Dome */}
    <circle cx="100" cy="80" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="100" cy="80" r="14" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Car Roof & Cabin */}
    <path d="M70 115 L85 90 H120 L140 115 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
    <rect x="88" y="94" width="28" height="18" rx="4" fill="#38BDF8" opacity="0.3" />

    {/* Car Chassis Body */}
    <path d="M45 140 C45 130 55 120 70 120 H140 C155 120 165 130 165 140 L160 152 H48 Z" fill="url(#carBodyGrad)" stroke="#0284C7" strokeWidth="2.5" />

    {/* Headlights & Tail Lights */}
    <rect x="156" y="132" width="8" height="10" rx="3" fill="#FDE047" />
    <polygon points="164,132 195,122 195,148 164,142" fill="#FEF08A" opacity="0.4" />
    <rect x="42" y="132" width="6" height="10" rx="2" fill="#EF4444" />

    {/* Rotating Wheels */}
    <g>
      <circle cx="70" cy="155" r="12" fill="#0F172A" stroke="#64748B" strokeWidth="3" />
      <circle cx="70" cy="155" r="5" fill="#38BDF8" />
      <circle cx="140" cy="155" r="12" fill="#0F172A" stroke="#64748B" strokeWidth="3" />
      <circle cx="140" cy="155" r="5" fill="#38BDF8" />
    </g>

    <defs>
      <linearGradient id="lidarGrad" x1="100" y1="80" x2="175" y2="65" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="lidarGrad2" x1="100" y1="80" x2="25" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="carBodyGrad" x1="45" y1="120" x2="165" y2="152" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="1" stopColor="#0F172A" />
      </linearGradient>
    </defs>
  </svg>
)

// 5. Animated Cyber Security Shield SVG
export const AnimatedShieldSecuritySVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Outer Defense Energy Rings */}
    <circle cx="100" cy="100" r="85" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="12s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="100" r="70" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
      <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="8s" repeatCount="indefinite" />
    </circle>

    {/* Primary Armor Shield */}
    <path
      d="M100 30 L160 55 V105 C160 145 100 175 100 175 C100 175 40 145 40 105 V55 L100 30 Z"
      fill="url(#shieldGrad)"
      stroke="#10B981"
      strokeWidth="3.5"
    />

    {/* Inner Core Shield */}
    <path
      d="M100 45 L145 65 V105 C145 135 100 160 100 160 C100 160 55 135 55 105 V65 L100 45 Z"
      fill="#064E3B"
      stroke="#34D399"
      strokeWidth="2"
      opacity="0.75"
    />

    {/* Central Cryptographic Lock / Keyhole */}
    <g transform="translate(85, 80)">
      <rect x="4" y="16" width="22" height="18" rx="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <path d="M8 16 V10 C8 6.7 10.7 4 15 4 C19.3 4 22 6.7 22 10 V16" stroke="#FBBF24" strokeWidth="3" fill="none" />
      <circle cx="15" cy="24" r="2.5" fill="#78350F" />
      <line x1="15" y1="26" x2="15" y2="30" stroke="#78350F" strokeWidth="2" />
    </g>

    <defs>
      <linearGradient id="shieldGrad" x1="40" y1="30" x2="160" y2="175" gradientUnits="userSpaceOnUse">
        <stop stopColor="#047857" />
        <stop offset="1" stopColor="#022C22" />
      </linearGradient>
    </defs>
  </svg>
)

// 6. Animated AI Accelerator Microchip Circuit SVG
export const AnimatedChipCircuitSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Motherboard Circuit Bus Lines */}
    <g stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.6">
      <line x1="100" y1="15" x2="100" y2="45" />
      <line x1="80" y1="15" x2="80" y2="45" />
      <line x1="120" y1="15" x2="120" y2="45" />
      <line x1="100" y1="155" x2="100" y2="185" />
      <line x1="80" y1="155" x2="80" y2="185" />
      <line x1="120" y1="155" x2="120" y2="185" />
      <line x1="15" y1="100" x2="45" y2="100" />
      <line x1="15" y1="80" x2="45" y2="80" />
      <line x1="15" y1="120" x2="45" y2="120" />
      <line x1="155" y1="100" x2="185" y2="100" />
      <line x1="155" y1="80" x2="185" y2="80" />
      <line x1="155" y1="120" x2="185" y2="120" />
    </g>

    {/* Central Silicon Package */}
    <rect x="45" y="45" width="110" height="110" rx="20" fill="#0F172A" stroke="#818CF8" strokeWidth="3" />

    {/* Core Processor Die */}
    <rect x="65" y="65" width="70" height="70" rx="14" fill="#312E81" stroke="#A855F7" strokeWidth="2" />

    {/* Inner AI Engine Grid Matrix */}
    <g fill="#A78BFA">
      <rect x="74" y="74" width="10" height="10" rx="2" />
      <rect x="90" y="74" width="10" height="10" rx="2" />
      <rect x="106" y="74" width="10" height="10" rx="2" />
      <rect x="122" y="74" width="4" height="10" rx="2" />
      <rect x="74" y="90" width="10" height="10" rx="2" />
      <rect x="90" y="90" width="20" height="20" rx="4" fill="#F43F5E">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="116" y="90" width="10" height="10" rx="2" />
      <rect x="74" y="106" width="10" height="10" rx="2" />
      <rect x="116" y="106" width="10" height="10" rx="2" />
      <rect x="74" y="122" width="42" height="4" rx="2" />
    </g>
  </svg>
)

// 7. Animated Smart City Satellite Network SVG
export const AnimatedSatelliteCitySVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Satellite Beam Waves */}
    <path d="M150 40 L40 170" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
    <path d="M150 40 L100 160" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
    <path d="M150 40 L160 170" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />

    {/* Orbital Satellite */}
    <g transform="translate(130, 25)">
      <rect x="12" y="8" width="16" height="12" rx="3" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="0" y="10" width="10" height="8" rx="2" fill="#FBBF24" />
      <rect x="30" y="10" width="10" height="8" rx="2" fill="#FBBF24" />
      <line x1="20" y1="20" x2="20" y2="28" stroke="#38BDF8" strokeWidth="2" />
      <circle cx="20" cy="30" r="3" fill="#38BDF8">
        <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* City Skyline Buildings */}
    <rect x="25" y="120" width="30" height="60" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
    <rect x="60" y="90" width="35" height="90" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
    <rect x="100" y="110" width="40" height="70" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
    <rect x="145" y="130" width="30" height="50" rx="4" fill="#0F172A" stroke="#818CF8" strokeWidth="1.5" />

    {/* Building Windows glowing */}
    <g fill="#FDE047" opacity="0.8">
      <rect x="68" y="105" width="6" height="6" rx="1" />
      <rect x="80" y="105" width="6" height="6" rx="1" />
      <rect x="68" y="125" width="6" height="6" rx="1" />
      <rect x="80" y="125" width="6" height="6" rx="1" />
      <rect x="68" y="145" width="6" height="6" rx="1" />
      <rect x="80" y="145" width="6" height="6" rx="1" />
    </g>

    {/* Radio Antenna on Tallest Tower */}
    <line x1="77" y1="70" x2="77" y2="90" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="77" cy="70" r="3" fill="#F43F5E">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
    </circle>
  </svg>
)

// 8. Animated Forensic Microscope & Anomaly Slide SVG
export const AnimatedMicroscopeSVG: React.FC<SVGProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
  >
    {/* Microscope Base */}
    <ellipse cx="100" cy="175" rx="55" ry="12" fill="#1E293B" stroke="#475569" strokeWidth="3" />

    {/* Arm Curve */}
    <path d="M60 170 V100 C60 65 90 40 120 40" stroke="#334155" strokeWidth="12" strokeLinecap="round" fill="none" />

    {/* Optical Eyepiece Tube */}
    <rect x="125" y="25" width="22" height="45" rx="5" transform="rotate(30 125 25)" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
    <ellipse cx="150" cy="28" rx="12" ry="6" fill="#38BDF8" />

    {/* Objective Lens Turret */}
    <circle cx="100" cy="95" r="16" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
    <rect x="94" y="108" width="12" height="20" rx="3" fill="#334155" stroke="#FBBF24" strokeWidth="1.5" />

    {/* Specimen Stage Platform */}
    <rect x="65" y="130" width="70" height="8" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />

    {/* Glowing Slide Anomaly Beam */}
    <circle cx="100" cy="134" r="14" fill="#38BDF8" opacity="0.3">
      <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="134" r="5" fill="#38BDF8" />
  </svg>
)
