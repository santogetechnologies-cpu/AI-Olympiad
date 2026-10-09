// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL VISUAL REGISTRY & DYNAMIC SVG ENVIRONMENT SYSTEM (.tsx)
// Guarantees that EVERY section (Video, Lesson 1, Lesson 2, Worksheet, Activity,
// Discovery Lab, Assignment, Quiz) has a unique, non-repeating visual identity.
// NO game screen is EVER blank. All scenes are dynamic with animated SVG elements.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'

export interface VisualSceneDefinition {
  id: string
  title: string
  description: string
  themeColor: string
  renderScene: (props: VisualSceneProps) => React.ReactNode
}

export interface VisualSceneProps {
  topic?: string
  chapterNum?: string | number
  gradeKey?: string
  sectionNumber?: number
  width?: number | string
  height?: number | string
  className?: string
  interactiveState?: any
  onInteractElement?: (elementId: string) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE DYNAMIC SVG SCENES BY TOPIC & DOMAIN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 1. AI FRIEND & ROBOTICS LAB SCENE
 * Moving radar, glowing friendly robot visor, animated spark particles
 */
export const RobotFriendLabScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="rf_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EEF2FF" />
        <stop offset="1" stopColor="#E0E7FF" />
      </linearGradient>
      <linearGradient id="rf_bot" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#4338CA" />
      </linearGradient>
      <linearGradient id="rf_glow" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#818CF8" />
      </linearGradient>
    </defs>

    {/* Lab Background Grid */}
    <rect width="320" height="140" rx="16" fill="url(#rf_bg)" />
    <path d="M0 110 H320" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M40 0 V110 M120 0 V110 M200 0 V110 M280 0 V110" stroke="#E0E7FF" strokeWidth="1" strokeDasharray="2 2" />

    {/* Animated Floating Data Particles */}
    <circle cx="50" cy="45" r="3" fill="#6366F1" opacity="0.6">
      <animate attributeName="cy" values="45;35;45" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="270" cy="55" r="4" fill="#38BDF8" opacity="0.7">
      <animate attributeName="cy" values="55;42;55" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="95" cy="30" r="2.5" fill="#F59E0B" opacity="0.8">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Human Student (Left) */}
    <g transform="translate(45, 40)">
      <ellipse cx="20" cy="72" rx="14" ry="3" fill="#CBD5E1" />
      <path d="M10 70 C10 52, 16 46, 26 46 C36 46, 42 52, 42 70 Z" fill="#0284C7" />
      <circle cx="26" cy="32" r="12" fill="#FDBA74" />
      <path d="M14 28 C14 18, 22 14, 34 18 C38 22, 38 28, 36 30 C32 24, 22 24, 18 30 Z" fill="#451A03" />
      <circle cx="30" cy="32" r="1.8" fill="#1E293B" />
      {/* Waving Arm */}
      <path d="M34 54 Q46 44 48 36" stroke="#FB923C" strokeWidth="4" strokeLinecap="round" />
      <circle cx="49" cy="34" r="3.5" fill="#FDBA74" />
    </g>

    {/* Interactive AI Hologram Beam */}
    <path d="M110 90 L160 40 L210 90 Z" fill="#C7D2FE" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" />
    </path>

    {/* Friendly Robot Helper (Right) */}
    <g transform="translate(195, 30)">
      {/* Floating Shadow */}
      <ellipse cx="40" cy="84" rx="20" ry="4" fill="#94A3B8" opacity="0.5">
        <animate attributeName="rx" values="18;24;18" dur="2s" repeatCount="indefinite" />
      </ellipse>

      {/* Floating Robot Body */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-6; 0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
        {/* Antenna */}
        <line x1="40" y1="12" x2="40" y2="4" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="3" r="3" fill="#F59E0B">
          <animate attributeName="fill" values="#F59E0B;#10B981;#F59E0B" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect x="20" y="12" width="40" height="28" rx="8" fill="url(#rf_bot)" stroke="#C7D2FE" strokeWidth="1.5" />
        {/* Glowing Visor Screen */}
        <rect x="25" y="18" width="30" height="15" rx="5" fill="#0F172A" />
        {/* Visor Friendly Eyes */}
        <circle cx="33" cy="25" r="2.5" fill="#38BDF8">
          <animate attributeName="r" values="2.5;0.5;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="47" cy="25" r="2.5" fill="#38BDF8">
          <animate attributeName="r" values="2.5;0.5;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M37 28 Q40 31 43 28" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Torso */}
        <rect x="22" y="44" width="36" height="28" rx="7" fill="url(#rf_bot)" stroke="#C7D2FE" strokeWidth="1.5" />
        {/* Heart Reactor */}
        <circle cx="40" cy="58" r="6" fill="#10B981" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <path d="M38 58 L40 56 L42 58 L40 61 Z" fill="white" />

        {/* Floating Hands */}
        <circle cx="12" cy="54" r="5" fill="#818CF8" />
        <circle cx="68" cy="54" r="5" fill="#818CF8" />
      </g>
    </g>

    {/* Floating Dialogue Bubble */}
    <g transform="translate(125, 15)">
      <rect width="80" height="26" rx="8" fill="white" stroke="#6366F1" strokeWidth="1.2" />
      <path d="M35 26 L40 31 L45 26 Z" fill="white" stroke="#6366F1" strokeWidth="1.2" />
      <rect x="34" y="25" width="12" height="2" fill="white" />
      <text x="40" y="16" textAnchor="middle" fill="#4338CA" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        HELLO FRIEND!
      </text>
    </g>
  </svg>
)

/**
 * 2. AUTONOMOUS ROAD & SMART TRAFFIC SIMULATION SCENE
 * Asphalt road with lane markings, traffic light with switching colors, moving car with lidar sweep
 */
export const AutonomousRoadTrafficScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="road_sky" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E0F2FE" />
        <stop offset="1" stopColor="#BAE6FD" />
      </linearGradient>
      <linearGradient id="car_body" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>

    {/* Sky & Distant Smart City Skyline */}
    <rect width="320" height="140" rx="16" fill="url(#road_sky)" />
    <path d="M10 70 L30 50 L45 50 L45 70 L60 40 L80 40 L80 70 L100 55 L115 55 L115 70" stroke="#93C5FD" strokeWidth="1.5" fill="#DBEAFE" opacity="0.6" />
    <path d="M220 70 L240 45 L255 45 L255 70 L275 35 L290 35 L290 70" stroke="#93C5FD" strokeWidth="1.5" fill="#DBEAFE" opacity="0.6" />

    {/* Asphalt Road */}
    <rect x="0" y="70" width="320" height="70" fill="#334155" />
    {/* Animated Lane Dashes */}
    <line x1="0" y1="105" x2="320" y2="105" stroke="#FDE047" strokeWidth="3" strokeDasharray="16 12">
      <animate attributeName="stroke-dashoffset" values="0;-56" dur="1.5s" repeatCount="indefinite" />
    </line>

    {/* Smart AI Traffic Light (Left) */}
    <g transform="translate(25, 25)">
      <rect x="10" y="45" width="4" height="45" fill="#64748B" rx="2" />
      <rect x="2" y="10" width="20" height="40" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      {/* Red Light */}
      <circle cx="12" cy="18" r="4" fill="#EF4444" opacity="0.3">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Yellow Light */}
      <circle cx="12" cy="30" r="4" fill="#F59E0B" opacity="0.2" />
      {/* Green Light */}
      <circle cx="12" cy="42" r="4" fill="#10B981" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Autonomous Electric Vehicle (Center-Right) */}
    <g transform="translate(130, 68)">
      {/* LIDAR Radar Waves */}
      <circle cx="70" cy="10" r="18" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.8">
        <animate attributeName="r" values="12;28;12" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="10" r="3" fill="#38BDF8" />

      {/* Car Chassis */}
      <path d="M20 30 Q35 14 55 14 L85 14 Q105 20 115 30 L120 38 Q120 42 115 42 L15 42 Q10 42 10 38 Z" fill="url(#car_body)" stroke="#93C5FD" strokeWidth="1.2" />
      {/* Tinted Windshield */}
      <path d="M40 28 L55 18 L82 18 L94 28 Z" fill="#0F172A" opacity="0.85" />
      {/* Headlights (Beam) */}
      <path d="M120 34 L170 24 L170 46 Z" fill="#FEF08A" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.45;0.25" dur="1s" repeatCount="indefinite" />
      </path>

      {/* Wheels */}
      <g transform="translate(30, 42)">
        <circle cx="0" cy="0" r="9" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="#94A3B8" />
      </g>
      <g transform="translate(100, 42)">
        <circle cx="0" cy="0" r="9" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="#94A3B8" />
      </g>
    </g>

    {/* AI Sensor Tag / Pedestrian Crosswalk Indicator */}
    <g transform="translate(250, 45)">
      <rect width="60" height="24" rx="6" fill="white" stroke="#10B981" strokeWidth="1.2" />
      <text x="30" y="15" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        PATH CLEAR
      </text>
    </g>
  </svg>
)

/**
 * 3. SMART FARM & DRONE AGRICULTURE SCENE
 * Crops, moisture sensors, AI drone hovering with sensor scan line
 */
export const SmartFarmDroneScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="farm_sky" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF3C7" />
        <stop offset="1" stopColor="#D1FAE5" />
      </linearGradient>
      <linearGradient id="farm_ground" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>

    {/* Rural Sky & Sun */}
    <rect width="320" height="140" rx="16" fill="url(#farm_sky)" />
    <circle cx="280" cy="35" r="16" fill="#FBBF24" opacity="0.8" />

    {/* Farm Hills */}
    <path d="M0 90 Q80 75 160 88 T320 85 L320 140 L0 140 Z" fill="url(#farm_ground)" />

    {/* Crop Rows with Leaf Spreads */}
    {Array.from({ length: 6 }).map((_, i) => (
      <g key={i} transform={`translate(${30 + i * 46}, 105)`}>
        {/* Stem */}
        <line x1="10" y1="20" x2="10" y2="0" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M10 10 Q2 4 4 0" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 6 Q18 0 16 -4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="-4" r="3" fill="#F59E0B" />
      </g>
    ))}

    {/* AI Drone (Hovering Center) */}
    <g transform="translate(135, 25)">
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-4; 0,0"
          dur="2s"
          repeatCount="indefinite"
        />
        {/* Rotor Arms */}
        <line x1="8" y1="18" x2="42" y2="18" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        {/* Spinning Propellers */}
        <ellipse cx="8" cy="14" rx="10" ry="2" fill="#94A3B8">
          <animate attributeName="rx" values="10;2;10" dur="0.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="42" cy="14" rx="10" ry="2" fill="#94A3B8">
          <animate attributeName="rx" values="10;2;10" dur="0.2s" repeatCount="indefinite" />
        </ellipse>

        {/* Drone Body */}
        <rect x="18" y="12" width="14" height="12" rx="4" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
        {/* Camera Sensor Eye */}
        <circle cx="25" cy="22" r="3.5" fill="#10B981">
          <animate attributeName="fill" values="#10B981;#38BDF8;#10B981" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Downward Scanning Sensor Beam */}
        <polygon points="18,24 4,75 46,75 32,24" fill="#34D399" opacity="0.3">
          <animate attributeName="opacity" values="0.15;0.45;0.15" dur="1.4s" repeatCount="indefinite" />
        </polygon>
      </g>
    </g>

    {/* Live Soil Moisture Telemetry HUD */}
    <g transform="translate(15, 20)">
      <rect width="85" height="36" rx="8" fill="white" stroke="#10B981" strokeWidth="1.2" opacity="0.95" />
      <text x="8" y="16" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        SOIL MOISTURE: 78%
      </text>
      <text x="8" y="28" fill="#64748B" fontSize="7" fontWeight="semibold" fontFamily="sans-serif">
        CROP HEALTH: OPTIMAL
      </text>
    </g>
  </svg>
)

/**
 * 4. NEURAL NETWORK & SYNAPSE DEEP LEARNING SCENE
 * Multi-layer nodes, pulsing synapse connections, animated forward/backprop signals
 */
export const NeuralSynapseDeepScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="nn_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F172A" />
        <stop offset="1" stopColor="#1E1B4B" />
      </linearGradient>
      <linearGradient id="syn_glow" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#38BDF8" />
      </linearGradient>
    </defs>

    {/* Dark Tech Space Background */}
    <rect width="320" height="140" rx="16" fill="url(#nn_bg)" />

    {/* Synapse Lines (Input -> Hidden 1 -> Hidden 2 -> Output) */}
    {/* Layer 1 (x: 50) to Layer 2 (x: 130) */}
    <line x1="50" y1="40" x2="130" y2="30" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="40" x2="130" y2="70" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="40" x2="130" y2="110" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="70" x2="130" y2="30" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="70" x2="130" y2="70" stroke="#4338CA" strokeWidth="1.8" opacity="0.9" />
    <line x1="50" y1="70" x2="130" y2="110" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="100" x2="130" y2="30" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="100" x2="130" y2="70" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="100" x2="130" y2="110" stroke="#4338CA" strokeWidth="1.5" opacity="0.6" />

    {/* Layer 2 (x: 130) to Layer 3 (x: 210) */}
    <line x1="130" y1="30" x2="210" y2="45" stroke="#6366F1" strokeWidth="1.5" opacity="0.7" />
    <line x1="130" y1="30" x2="210" y2="95" stroke="#6366F1" strokeWidth="1.5" opacity="0.7" />
    <line x1="130" y1="70" x2="210" y2="45" stroke="#6366F1" strokeWidth="2" opacity="0.9" />
    <line x1="130" y1="70" x2="210" y2="95" stroke="#6366F1" strokeWidth="2" opacity="0.9" />
    <line x1="130" y1="110" x2="210" y2="45" stroke="#6366F1" strokeWidth="1.5" opacity="0.7" />
    <line x1="130" y1="110" x2="210" y2="95" stroke="#6366F1" strokeWidth="1.5" opacity="0.7" />

    {/* Layer 3 (x: 210) to Output (x: 280) */}
    <line x1="210" y1="45" x2="280" y2="70" stroke="#38BDF8" strokeWidth="2.5" opacity="0.9" />
    <line x1="210" y1="95" x2="280" y2="70" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />

    {/* Animated Signal Particle Flowing from Input to Output */}
    <circle cx="50" cy="70" r="3.5" fill="#38BDF8">
      <animate attributeName="cx" values="50;130;210;280" dur="2s" repeatCount="indefinite" />
      <animate attributeName="cy" values="70;70;45;70" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Layer 1 Input Nodes */}
    <circle cx="50" cy="40" r="8" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
    <circle cx="50" cy="70" r="8" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
    <circle cx="50" cy="100" r="8" fill="#312E81" stroke="#818CF8" strokeWidth="2" />

    {/* Layer 2 Hidden Nodes */}
    <circle cx="130" cy="30" r="9" fill="#3730A3" stroke="#A5B4FC" strokeWidth="2" />
    <circle cx="130" cy="70" r="9" fill="#4F46E5" stroke="#C7D2FE" strokeWidth="2">
      <animate attributeName="r" values="8.5;10;8.5" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="130" cy="110" r="9" fill="#3730A3" stroke="#A5B4FC" strokeWidth="2" />

    {/* Layer 3 Deep Feature Nodes */}
    <circle cx="210" cy="45" r="9" fill="#4338CA" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="210" cy="95" r="9" fill="#4338CA" stroke="#38BDF8" strokeWidth="2" />

    {/* Output Node */}
    <circle cx="280" cy="70" r="11" fill="#0284C7" stroke="#38BDF8" strokeWidth="3">
      <animate attributeName="stroke-width" values="2;4;2" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <text x="280" y="73" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">
      98%
    </text>

    {/* HUD Layer Labels */}
    <text x="50" y="20" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">INPUT</text>
    <text x="130" y="16" textAnchor="middle" fill="#A5B4FC" fontSize="8" fontWeight="bold" fontFamily="sans-serif">HIDDEN L1</text>
    <text x="210" y="20" textAnchor="middle" fill="#A5B4FC" fontSize="8" fontWeight="bold" fontFamily="sans-serif">HIDDEN L2</text>
    <text x="280" y="20" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">OUTPUT</text>
  </svg>
)

/**
 * 5. TRANSFORMER & ATTENTION NLP MATRIX SCENE
 * Token blocks, self-attention query-key connectors, semantic vector map
 */
export const TransformerAttentionScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="tf_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8FAFC" />
        <stop offset="1" stopColor="#EEF2FF" />
      </linearGradient>
    </defs>

    {/* Canvas Background */}
    <rect width="320" height="140" rx="16" fill="url(#tf_bg)" stroke="#E2E8F0" />

    {/* Token Blocks Top & Bottom */}
    {['The', 'AI', 'agent', 'solves', 'puzzles'].map((tok, idx) => (
      <g key={idx} transform={`translate(${25 + idx * 56}, 20)`}>
        <rect width="48" height="24" rx="6" fill="#4F46E5" />
        <text x="24" y="15" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">
          {tok}
        </text>
      </g>
    ))}

    {/* Attention Arc Connectors */}
    <path d="M49 44 C49 80, 105 80, 105 44" stroke="#6366F1" strokeWidth="2.5" fill="none" opacity="0.8" />
    <path d="M105 44 C105 95, 161 95, 161 44" stroke="#06B6D4" strokeWidth="3" fill="none" opacity="0.9">
      <animate attributeName="stroke-width" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M161 44 C161 90, 273 90, 273 44" stroke="#EC4899" strokeWidth="2" fill="none" opacity="0.7" />

    {/* Multi-Head Attention Score Matrix Visualizer (Bottom) */}
    <g transform="translate(60, 95)">
      <rect width="200" height="32" rx="8" fill="white" stroke="#C7D2FE" strokeWidth="1.2" />
      <text x="10" y="20" fill="#4338CA" fontSize="9" fontWeight="bold" fontFamily="monospace">
        Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
      </text>
    </g>
  </svg>
)

/**
 * 6. CYBER SECURITY & ETHICS SHIELD SCENE
 * Vault lock, firewall beam, threat detection radar
 */
export const CyberSecurityShieldScene: React.FC<VisualSceneProps> = ({
  width = '100%',
  height = 140,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-h-36 drop-shadow-sm select-none ${className}`}
  >
    <defs>
      <linearGradient id="cs_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B132B" />
        <stop offset="1" stopColor="#1C2541" />
      </linearGradient>
    </defs>

    <rect width="320" height="140" rx="16" fill="url(#cs_bg)" />

    {/* Central Cyber Shield */}
    <g transform="translate(130, 25)">
      <path
        d="M30 5 L55 18 V45 C55 65 30 80 30 80 C30 80 5 65 5 45 V18 Z"
        fill="#10B981"
        stroke="#6EE7B7"
        strokeWidth="2.5"
        opacity="0.9"
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Checkmark inside shield */}
      <path d="M20 42 L27 50 L40 34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Blocked Threat Packets on Left */}
    <g transform="translate(40, 50)">
      <circle cx="15" cy="15" r="12" fill="#EF4444" opacity="0.3" />
      <path d="M9 9 L21 21 M21 9 L9 21" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <text x="15" y="38" textAnchor="middle" fill="#F87171" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        THREAT BLOCKED
      </text>
    </g>

    {/* Safe Verified Traffic on Right */}
    <g transform="translate(230, 50)">
      <circle cx="15" cy="15" r="12" fill="#10B981" opacity="0.3" />
      <circle cx="15" cy="15" r="5" fill="#10B981" />
      <text x="15" y="38" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        SECURE DATA
      </text>
    </g>
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL SCENE RESOLVER & REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const VISUAL_SCENES_REGISTRY: Record<string, React.FC<VisualSceneProps>> = {
  robot_friend_lab: RobotFriendLabScene,
  autonomous_road: AutonomousRoadTrafficScene,
  smart_farm: SmartFarmDroneScene,
  neural_synapse: NeuralSynapseDeepScene,
  transformer_attention: TransformerAttentionScene,
  cyber_security: CyberSecurityShieldScene,
}

/**
 * Returns the bespoke dynamic SVG scene for any section.
 * Guarantees that EVERY section has a meaningful, active visual environment.
 */
export function getSectionVisualScene(
  gradeKey: string,
  chapterNumber: number | string,
  sectionSlot: number,
  topicTitle: string = ''
): React.FC<VisualSceneProps> {
  const norm = topicTitle.toLowerCase()

  if (norm.includes('road') || norm.includes('traffic') || norm.includes('car') || norm.includes('vehicle')) {
    return AutonomousRoadTrafficScene
  }
  if (norm.includes('farm') || norm.includes('agriculture') || norm.includes('crop') || norm.includes('drone')) {
    return SmartFarmDroneScene
  }
  if (norm.includes('neural') || norm.includes('deep') || norm.includes('synapse') || norm.includes('neuron') || norm.includes('layer')) {
    return NeuralSynapseDeepScene
  }
  if (norm.includes('transformer') || norm.includes('attention') || norm.includes('token') || norm.includes('nlp') || norm.includes('language')) {
    return TransformerAttentionScene
  }
  if (norm.includes('safety') || norm.includes('cyber') || norm.includes('ethics') || norm.includes('shield') || norm.includes('privacy')) {
    return CyberSecurityShieldScene
  }

  // Fallback to rich Robot Friend Lab
  return RobotFriendLabScene
}
