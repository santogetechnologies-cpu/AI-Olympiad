// ─────────────────────────────────────────────────────────────────────────────
// LESSON 1: REAL-WORLD EXAMPLE EXPERIENCE (SCREEN 2)
// 100% Mobile-First Interactive Educational Mini-Simulation:
// - Zero separate side action buttons (Scan / Start / Activate / Continue)
// - The objects inside the scene ARE the interactive controls
// - 14 Bespoke, logically grounded real-world interactive simulations:
//   * Farm: Tap Drone -> flies to dry crop sector -> multispectral NDVI scan -> lush crops
//   * Road: Tap Car -> rolls forward -> 180° LiDAR scan -> detects pedestrian -> brakes safely
//   * Safety: Tap Firewall -> intercepts rogue malware packet -> isolates -> server secure
//   * Health: Tap Stethoscope/Heart -> ultrasound probe contacts -> real-time ECG -> 99.4% match
//   * Vision: Tap Camera/Fruit -> autofocus reticle -> instance contour mask -> fresh apple 99.6%
//   * Language: Tap Mic -> speech acoustic waves -> neural transformer tokens -> instant Spanish
//   * Data: Tap Satellite -> Doppler microwave beam -> convective cloud analysis -> rain 92%
//   * Neural: Tap Input Synapses -> feedforward pulse -> weight calibration -> pattern matched
//   * City: Tap Ambulance -> siren radio V2X -> smart traffic light green wave -> cross traffic holds
//   * Robotics: Tap Robot Arm -> inverse kinematics downward -> suction seal -> barcode scan -> sort chute
//   * Creative: Tap Canvas/Stylus -> 3-stage diffusion (noise -> wireframe -> vibrant masterpiece)
//   * Ethics: Tap Scale -> fairness filter conceals bias -> balances candidate merit to 50/50
//   * Logic: Tap Thermostat -> solar heat detected -> motorized shades lower -> battery stored -> -45% load
//   * Frontier: Tap Mars Rover -> stereo HazCam 3D hazard map -> path planning around boulders -> rocks sampled
// - Contained single-viewport design: zero scrolling, zero clipping
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react'
import {
  Sparkles, Lightbulb, ArrowRight, ArrowLeft, CheckCircle2,
  Shield, Zap, Eye, Heart, Activity, Play, Radio, Cpu, RefreshCw, Hand
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'
import { resolveLesson1Domain, type Lesson1Domain } from './Lesson1ConceptExperience'

export interface Lesson1RealWorldExampleExperienceProps {
  badge: string
  title: string
  topicTitle?: string
  chapterTitle?: string
  gradeKey?: string
  exampleText: string
  onBack: () => void
  onNext: () => void
  nextLabel?: string
}

export const Lesson1RealWorldExampleExperience: React.FC<Lesson1RealWorldExampleExperienceProps> = ({
  badge,
  title,
  topicTitle,
  chapterTitle,
  gradeKey,
  exampleText,
  onBack,
  onNext,
  nextLabel = 'Next: How It Works'
}) => {
  const resolvedTopic = topicTitle || title
  const domain: Lesson1Domain = resolveLesson1Domain(resolvedTopic, chapterTitle || badge)
  
  // Simulation State Machine: 0 = Idle / Inviting, 1 = In-Action / Animating, 2 = Complete / Result
  const [phase, setPhase] = useState<0 | 1 | 2>(0)
  const [auraMood, setAuraMood] = useState<'explaining' | 'celebrating' | 'thinking'>('explaining')
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null)

  // Reset simulation when domain / topic changes
  useEffect(() => {
    setPhase(0)
    setAuraMood('explaining')
    setTelemetryMessage(null)
  }, [resolvedTopic, domain])

  const triggerDirectObjectAction = () => {
    // If already in motion, ignore to prevent glitching
    if (phase === 1) return

    // If already completed, allow replay
    gameAudio.playTap()
    setPhase(1)
    setAuraMood('thinking')

    const inActionFeedbacks: Record<Lesson1Domain, string> = {
      farm: 'Drone scanning multispectral NDVI reflection across crop rows...',
      road: 'Autonomous vehicle firing 180° LiDAR laser pulses to map road...',
      safety: 'Deep packet inspection running cryptographic hash check...',
      health: 'Acoustic ultrasound transducer capturing cardiac rhythm...',
      vision: 'Optical convolutional neural network computing edge gradients...',
      language: 'Attention heads decomposing audio spectrogram into phonemes...',
      data: 'Doppler satellite microwave radar measuring cloud water density...',
      neural: 'Feedforward activation wave propagating across synaptic layers...',
      city: 'Smart city grid receiving V2X priority emergency telemetry...',
      robotics: 'Servo actuators calculating kinematic trajectory to package...',
      creative: 'Latent diffusion model executing multi-step denoising passes...',
      ethics: 'Algorithmic fairness filter masking non-merit demographic attributes...',
      logic: 'IoT thermostat evaluating outdoor solar heat and battery storage...',
      frontier: 'Stereo HazCam building 3D elevation map across Martian crater...'
    }

    const completeFeedbacks: Record<Lesson1Domain, string> = {
      farm: 'NDVI Index 0.88 · Dry zone irrigated · Crop health optimal (98%)!',
      road: 'Pedestrian detected at 12m · Safe braking curve executed!',
      safety: 'Malicious exploit isolated · Zero data leaked from secure vault!',
      health: 'Sinus rhythm 72 BPM confirmed · Normal cardiac wall motion!',
      vision: 'Fresh Honeycrisp Apple identified · 99.6% classification match!',
      language: 'Bilingual translation synthesized with zero latency!',
      data: 'Precipitation model locked: 92% rain at 3:00 PM · City alerted!',
      neural: 'Synaptic weights adjusted · Neural classification verified!',
      city: 'Green Wave corridor locked · Ambulance cleared intersection safely!',
      robotics: 'Barcode #884 verified · Parcel placed into destination chute!',
      creative: 'Digital artwork synthesized with rich artistic style depth!',
      ethics: '100% Parity achieved · Both candidates evaluated purely on skill!',
      logic: 'Solar energy routed to battery · Grid consumption reduced by 45%!',
      frontier: 'Safe navigational path planned · Science target rock sampled!'
    }

    setTelemetryMessage(inActionFeedbacks[domain])

    // Smooth transition from active phase to completion phase
    setTimeout(() => {
      gameAudio.playSuccess()
      setPhase(2)
      setAuraMood('celebrating')
      setTelemetryMessage(completeFeedbacks[domain])

      setTimeout(() => {
        setAuraMood('explaining')
      }, 3000)
    }, 1400)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BESPOKE LOGICAL SVG SCENES: THE OBJECTS THEMSELVES ARE THE CONTROLS
  // ─────────────────────────────────────────────────────────────────────────
  const renderInteractiveScene = () => {
    switch (domain) {
      // 1. FARM / PLANET: DRONE -> CROPS
      case 'farm': {
        const droneX = phase === 0 ? 230 : phase === 1 ? 140 : 130
        const droneY = phase === 0 ? 20 : phase === 1 ? 38 : 34

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            {/* Sky & Field Gradient */}
            <defs>
              <linearGradient id="farmSkyGrad" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#BAE6FD" />
                <stop offset="0.55" stopColor="#E0F2FE" />
                <stop offset="0.56" stopColor="#86EFAC" />
                <stop offset="1" stopColor="#4ADE80" />
              </linearGradient>
              <linearGradient id="ndviBeam" x1="0" y1="0" x2="0" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10B981" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="340" height="160" rx="20" fill="url(#farmSkyGrad)" />

            {/* Distant Hills & Wind Turbines */}
            <path d="M0 90 Q80 75 170 85 T340 80 V160 H0 Z" fill="#6EE7B7" opacity="0.6" />
            <g transform="translate(30, 60)" opacity="0.5">
              <line x1="10" y1="25" x2="10" y2="0" stroke="#047857" strokeWidth="1.5" />
              <circle cx="10" cy="0" r="1.5" fill="#047857" />
              <line x1="10" y1="0" x2="4" y2="-8" stroke="#047857" strokeWidth="1" className="animate-spin" style={{ transformOrigin: '10px 0px' }} />
              <line x1="10" y1="0" x2="16" y2="-8" stroke="#047857" strokeWidth="1" className="animate-spin" style={{ transformOrigin: '10px 0px' }} />
            </g>

            {/* Smart Tractor on Left */}
            <g transform="translate(25, 95)">
              <rect x="0" y="15" width="45" height="20" rx="5" fill="#15803D" />
              <rect x="25" y="7" width="18" height="14" rx="3" fill="#166534" />
              <circle cx="12" cy="35" r="8" fill="#1E293B" />
              <circle cx="36" cy="35" r="8" fill="#1E293B" />
              <line x1="40" y1="7" x2="40" y2="0" stroke="#0F172A" strokeWidth="2" />
              <circle cx="40" cy="-1" r="2.5" fill="#38BDF8" className="animate-ping" />
            </g>

            {/* Crop Field Rows */}
            {/* Left Healthy Rows */}
            <g transform="translate(85, 105)">
              {[0, 18, 36].map((x) => (
                <path
                  key={x}
                  d={`M${x} 35 Q${x + 4} 20 ${x} 8 Q${x - 4} 20 ${x} 35`}
                  fill="#15803D"
                  className="animate-ambient-sway"
                  style={{ transformOrigin: `${x}px 35px`, animationDelay: `${(x / 18) * 0.2}s` }}
                />
              ))}
            </g>

            {/* Right Crop Sector (Stressed when phase=0, Becomes Lush when phase>=1) */}
            <g transform="translate(145, 105)">
              {[0, 18, 36, 54, 72].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 35 Q${x + 4} 20 ${x} 8 Q${x - 4} 20 ${x} 35`}
                    fill={phase === 0 ? '#CA8A04' : '#15803D'}
                    className="transition-colors duration-700 animate-ambient-sway"
                    style={{ transformOrigin: `${x}px 35px`, animationDelay: `${(x / 18) * 0.25}s` }}
                  />
                  {/* Moisture droplet indicator when restored */}
                  {phase === 2 && (
                    <circle cx={x} cy={6} r="2" fill="#38BDF8" className="animate-ping" />
                  )}
                </g>
              ))}
            </g>

            {/* Multispectral Scanning Cone from Drone to Field */}
            {phase >= 1 && (
              <g transform={`translate(${droneX - 35}, ${droneY + 14})`}>
                <polygon points="35,0 0,85 70,85" fill="url(#ndviBeam)" />
                <line x1="5" y1="50" x2="65" y2="50" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                <line x1="12" y1="70" x2="58" y2="70" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
              </g>
            )}

            {/* THE INTERACTIVE DRONE OBJECT */}
            <g
              transform={`translate(${droneX}, ${droneY})`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Target Halo when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="0" cy="8" r="28" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="0" cy="8" r="22" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '0px 8px' }} />
                </g>
              )}

              {/* Drone Body Frame */}
              <rect x="-18" y="2" width="36" height="12" rx="6" fill="#0F172A" />
              {/* Rotor Arms */}
              <line x1="-28" y1="2" x2="28" y2="2" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
              {/* Spinning Propeller Discs */}
              <ellipse cx="-28" cy="1" rx="9" ry="2" fill="#94A3B8" className="animate-pulse" />
              <ellipse cx="28" cy="1" rx="9" ry="2" fill="#94A3B8" className="animate-pulse" />
              {/* Optical Multispectral Sensor Lens */}
              <circle cx="0" cy="13" r="3.5" fill={phase >= 1 ? '#10B981' : '#38BDF8'} />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-40, -18)">
                  <rect width="80" height="16" rx="8" fill="#065F46" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP DRONE
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="180" height="20" rx="10" fill="#064E3B" fillOpacity="0.85" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#FBBF24'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP DRONE TO SURVEY FIELD'}
                {phase === 1 && 'SCANNING MULTISPECTRAL NDVI...'}
                {phase === 2 && 'CROPS IRRIGATED · HEALTH 98%'}
              </text>
            </g>
          </svg>
        )
      }

      // 2. ROAD / AUTONOMOUS VEHICLE: CAR -> CROSSWALK & PEDESTRIAN
      case 'road': {
        const carX = phase === 0 ? 50 : phase === 1 ? 100 : 130
        const isBraking = phase >= 1

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#090D16" />

            {/* City Skyline Silhouette */}
            <path d="M0 75 H35 V50 H65 V70 H105 V40 H145 V75 H205 V55 H255 V75 H340 V160 H0 Z" fill="#1E293B" opacity="0.6" />

            {/* Road Surface */}
            <path d="M0 85 L340 85 V160 H0 Z" fill="#1E293B" />
            <line x1="0" y1="120" x2="340" y2="120" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="14 14" />

            {/* Crosswalk Stripes at x: 230 */}
            <g transform="translate(230, 85)" opacity="0.85">
              {[0, 14, 28, 42, 56, 70].map((y) => (
                <rect key={y} x="0" y={y} width="28" height="7" rx="1.5" fill="#E2E8F0" />
              ))}
            </g>

            {/* Pedestrian Crossing */}
            <g transform={`translate(${phase === 2 ? 240 : 240}, ${phase === 2 ? 90 : 70})`} className="transition-all duration-700">
              {/* Dynamic 3D Bounding Box when detected */}
              {phase >= 1 && (
                <g>
                  <rect x="-8" y="-4" width="28" height="48" rx="4" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray={phase === 1 ? '4 4' : 'none'} />
                  <rect x="-8" y="-14" width="62" height="11" rx="2" fill="#0284C7" />
                  <text x="-4" y="-5" fill="white" fontSize="7" fontWeight="bold">
                    PEDESTRIAN 12m
                  </text>
                </g>
              )}
              {/* Pedestrian Body */}
              <circle cx="6" cy="4" r="4.5" fill="#E2E8F0" />
              <path d="M6 9 V22 M1 13 L11 13 M2 32 L6 22 L10 32" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* LiDAR Radar Conical Fan from Car */}
            {phase >= 1 && (
              <g transform={`translate(${carX + 65}, 94)`}>
                <path d="M0 0 L120 -35 L120 40 Z" fill="#0284C7" fillOpacity="0.35" />
                <path d="M0 0 L90 -25 L90 30 Z" fill="#38BDF8" fillOpacity="0.2" />
                <circle cx="70" cy="2" r="30" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-ping" />
              </g>
            )}

            {/* THE INTERACTIVE CAR OBJECT */}
            <g
              transform={`translate(${carX}, 88)`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="35" cy="18" r="32" fill="#0284C7" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="35" cy="18" r="26" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '35px 18px' }} />
                </g>
              )}

              {/* Car Body */}
              <rect x="0" y="10" width="70" height="24" rx="8" fill="#F8FAFC" />
              <path d="M12 10 L22 0 H48 L58 10 Z" fill="#0284C7" />
              {/* Windows */}
              <path d="M16 9 L24 2 H34 V9 Z" fill="#38BDF8" fillOpacity="0.8" />
              <path d="M38 9 V2 H46 L54 9 Z" fill="#38BDF8" fillOpacity="0.8" />
              {/* Wheels */}
              <circle cx="16" cy="34" r="8" fill="#0F172A" />
              <circle cx="54" cy="34" r="8" fill="#0F172A" />
              <circle cx="16" cy="34" r="3.5" fill="#94A3B8" />
              <circle cx="54" cy="34" r="3.5" fill="#94A3B8" />

              {/* Headlights */}
              <polygon points="68,16 110,10 110,30 68,24" fill="#FEF08A" fillOpacity={phase >= 1 ? 0.6 : 0.3} />

              {/* Brake Lights (Glowing bright red when braking) */}
              <rect x="-2" y="14" width="4" height="8" rx="2" fill={isBraking ? '#EF4444' : '#991B1B'} />
              {isBraking && (
                <circle cx="-2" cy="18" r="6" fill="#EF4444" fillOpacity="0.5" className="animate-ping" />
              )}

              {/* Roof LiDAR Spinner Pod */}
              <rect x="30" y="-4" width="10" height="5" rx="2" fill="#0F172A" />
              <circle cx="35" cy="-6" r="3.5" fill="#38BDF8" className="animate-ping" />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-5, -22)">
                  <rect width="80" height="16" rx="8" fill="#0369A1" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP CAR
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="185" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#38BDF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP CAR TO ENGAGE LIDAR'}
                {phase === 1 && 'LIDAR SCANNING ROADWAY...'}
                {phase === 2 && 'BRAKED SAFELY · CROSSWALK CLEAR'}
              </text>
            </g>
          </svg>
        )
      }

      // 3. SAFETY / CYBER DEFENSE: GUARDIAN SHIELD INTERCEPTS ROGUE PACKET
      case 'safety': {
        const packetX = phase === 0 ? 45 : phase === 1 ? 115 : 60
        const packetBlocked = phase >= 1

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0B132B" />

            {/* Glowing Hexagonal Matrix Grid */}
            <g opacity="0.2">
              {[30, 80, 130, 180, 230, 280].map((x) => (
                <path key={x} d={`M${x} 30 L${x + 20} 40 V65 L${x} 75 L${x - 20} 65 V40 Z`} stroke="#10B981" strokeWidth="1" fill="none" />
              ))}
            </g>

            {/* Secure Database Server Vault on Right */}
            <g transform="translate(250, 45)">
              <rect width="65" height="70" rx="8" fill="#1C2541" stroke="#3A506B" strokeWidth="2" />
              <line x1="10" y1="20" x2="55" y2="20" stroke="#3A506B" strokeWidth="2" />
              <line x1="10" y1="40" x2="55" y2="40" stroke="#3A506B" strokeWidth="2" />
              <circle cx="50" cy="12" r="3" fill="#10B981" className="animate-pulse" />
              <circle cx="50" cy="30" r="3" fill="#10B981" />
              <circle cx="50" cy="50" r="3" fill="#10B981" />
              <text x="32" y="62" fill="#A7F3D0" fontSize="7" fontWeight="bold" textAnchor="middle">
                DATA VAULT
              </text>
            </g>

            {/* Transmission Network Line */}
            <line x1="40" y1="80" x2="250" y2="80" stroke="#1E293B" strokeWidth="3" />
            <line x1="180" y1="80" x2="250" y2="80" stroke="#10B981" strokeWidth="2" strokeDasharray="6 6" />

            {/* Rogue Malware Packet (Red glitch) */}
            <g transform={`translate(${packetX}, 70)`} className="transition-all duration-700 ease-out">
              <rect x="0" y="0" width="22" height="20" rx="4" fill={packetBlocked ? '#7F1D1D' : '#EF4444'} />
              <text x="11" y="13" fill="white" fontSize="9" fontWeight="black" textAnchor="middle">
                {packetBlocked ? 'X' : '!'}
              </text>
              {phase === 2 && (
                <g>
                  <circle cx="11" cy="10" r="16" fill="none" stroke="#F87171" strokeWidth="1.5" className="animate-ping" />
                  <text x="11" y="32" fill="#F87171" fontSize="7" fontWeight="bold" textAnchor="middle">
                    ISOLATED
                  </text>
                </g>
              )}
            </g>

            {/* THE INTERACTIVE GUARDIAN FIREWALL OBJECT */}
            <g
              transform="translate(145, 45)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="25" cy="35" r="38" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="25" cy="35" r="30" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '25px 35px' }} />
                </g>
              )}

              {/* Hex Shield Barrier Forcefield */}
              <path
                d="M25 0 L55 15 V45 C55 68 25 80 25 80 C25 80 -5 68 -5 45 V15 Z"
                fill={phase >= 1 ? '#047857' : '#065F46'}
                stroke={phase >= 1 ? '#34D399' : '#10B981'}
                strokeWidth={phase >= 1 ? 3 : 2}
                className="transition-all duration-300"
              />
              <path d="M12 40 L21 50 L38 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Forcefield Deflection Sparks when Active */}
              {phase >= 1 && (
                <g>
                  <circle cx="-5" cy="40" r="14" fill="#34D399" fillOpacity="0.4" className="animate-ping" />
                  <line x1="-12" y1="30" x2="-2" y2="45" stroke="#FBBF24" strokeWidth="2" />
                  <line x1="-12" y1="50" x2="-2" y2="35" stroke="#FBBF24" strokeWidth="2" />
                </g>
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-15, -20)">
                  <rect width="80" height="16" rx="8" fill="#047857" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP SHIELD
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#1C2541" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#10B981'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP SHIELD TO ENGAGE FIREWALL'}
                {phase === 1 && 'ANALYZING THREAT SIGNATURE...'}
                {phase === 2 && 'THREAT ISOLATED · 0 LEAKS'}
              </text>
            </g>
          </svg>
        )
      }

      // 4. HEALTH / MEDICAL AI: DIAGNOSTIC PROBE -> CARDIAC HOLOGRAM
      case 'health': {
        const probeX = phase === 0 ? 55 : phase === 1 ? 130 : 125

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0B132B" />

            {/* Medical Telemetry Grid */}
            <g stroke="#1E293B" strokeWidth="0.5">
              {[25, 55, 85, 115, 145].map((y) => (
                <line key={y} x1="0" y1={y} x2="340" y2={y} />
              ))}
            </g>

            {/* Live Cardiac Rhythm ECG Line */}
            <path
              d="M0 90 H50 L60 70 L70 120 L80 40 L90 105 L100 85 L110 90 H180 L190 70 L200 120 L210 40 L220 105 L230 85 L240 90 H340"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={phase >= 1 ? 'animate-pulse' : ''}
            />

            {/* Patient Heart Hologram */}
            <g transform="translate(170, 45)">
              <circle cx="35" cy="35" r="32" fill="#E11D48" fillOpacity={phase >= 1 ? 0.35 : 0.15} className="animate-pulse" />
              <path
                d="M35 20 C25 8 10 18 18 32 L35 52 L52 32 C60 18 45 8 35 20 Z"
                fill="#E11D48"
                className="transition-transform duration-300"
                style={{ transform: phase >= 1 ? 'scale(1.1)' : 'scale(1)', transformOrigin: '35px 35px' }}
              />
              {phase === 2 && (
                <text x="35" y="65" fill="#FDA4AF" fontSize="8" fontWeight="bold" textAnchor="middle">
                  72 BPM NORMAL
                </text>
              )}
            </g>

            {/* THE INTERACTIVE ULTRASOUND / STETHOSCOPE PROBE */}
            <g
              transform={`translate(${probeX}, 55)`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="20" cy="20" r="30" fill="#E11D48" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="20" cy="20" r="24" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '20px 20px' }} />
                </g>
              )}

              {/* Probe Body */}
              <rect x="0" y="10" width="35" height="18" rx="6" fill="#334155" />
              <circle cx="35" cy="19" r="6" fill="#38BDF8" />
              <line x1="0" y1="19" x2="-40" y2="19" stroke="#64748B" strokeWidth="3" />

              {/* Acoustic Wave Emission when Active */}
              {phase >= 1 && (
                <g transform="translate(38, 19)">
                  <path d="M4 -10 Q14 0 4 10" stroke="#38BDF8" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M12 -16 Q24 0 12 16" stroke="#38BDF8" strokeWidth="2" fill="none" className="animate-ping" />
                </g>
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-20, -18)">
                  <rect width="80" height="16" rx="8" fill="#9F1239" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP PROBE
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="185" height="20" rx="10" fill="#1C2541" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#F43F5E'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP PROBE TO DIAGNOSE VITALS'}
                {phase === 1 && 'SCANNING CARDIAC ACOUSTICS...'}
                {phase === 2 && 'SINUS RHYTHM 72 BPM · 99.4% CONFIDENCE'}
              </text>
            </g>
          </svg>
        )
      }

      // 5. VISION: OPTICAL CAMERA VIEWFINDER -> OBJECT SEGMENTATION
      case 'vision': {
        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#030712" />

            {/* Viewfinder Target Brackets */}
            <g stroke="#38BDF8" strokeWidth="2">
              <path d="M25 35 V25 H35 M305 25 H315 V35 M25 125 V135 H35 M305 135 H315 V125" />
              <line x1="160" y1="80" x2="180" y2="80" stroke="#0284C7" strokeWidth="1" />
              <line x1="170" y1="70" x2="170" y2="90" stroke="#0284C7" strokeWidth="1" />
            </g>

            {/* Conveyor / Inspection Stage Surface */}
            <line x1="40" y1="125" x2="300" y2="125" stroke="#374151" strokeWidth="3" />

            {/* THE INTERACTIVE OBJECT: FRESH APPLE ON CONVEYOR */}
            <g
              transform="translate(130, 50)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="40" cy="45" r="45" fill="#0284C7" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="40" cy="45" r="36" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '40px 45px' }} />
                </g>
              )}

              {/* Bounding Box Frame */}
              <rect
                x="0"
                y="0"
                width="80"
                height="80"
                rx="6"
                fill={phase >= 1 ? '#047857' : 'none'}
                fillOpacity={phase >= 1 ? 0.25 : 0}
                stroke={phase === 2 ? '#10B981' : phase === 1 ? '#38BDF8' : '#64748B'}
                strokeWidth={phase >= 1 ? 2.5 : 1.5}
                strokeDasharray={phase === 0 ? '4 4' : 'none'}
                className="transition-all duration-300"
              />

              {/* Apple Illustration */}
              <circle cx="40" cy="48" r="26" fill="#DC2626" />
              <path d="M40 22 Q44 12 52 10" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />

              {/* AI Classification Confidence Badge */}
              {phase >= 1 && (
                <g transform="translate(0, -16)">
                  <rect width="80" height="16" rx="3" fill={phase === 2 ? '#10B981' : '#0284C7'} />
                  <text x="40" y="11" fill="white" fontSize="7.5" fontWeight="black" textAnchor="middle">
                    {phase === 2 ? 'APPLE: 99.6%' : 'EXTRACTING...'}
                  </text>
                </g>
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(0, -22)">
                  <rect width="80" height="16" rx="8" fill="#0369A1" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP OBJECT
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="185" height="20" rx="10" fill="#111827" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#38BDF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP OBJECT TO IDENTIFY WITH AI'}
                {phase === 1 && 'EXTRACTING VISUAL FEATURES...'}
                {phase === 2 && 'HONEYCRISP APPLE · 99.6% MATCH'}
              </text>
            </g>
          </svg>
        )
      }

      // 6. LANGUAGE / SPEECH / NLP: MICROPHONE -> ATTENTION TOKEN TRANSLATOR
      case 'language': {
        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0F172A" />

            {/* Input Speech Bubble on Left */}
            <g transform="translate(25, 45)">
              <rect width="80" height="36" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="40" y="22" fill="#E2E8F0" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                "Hello World"
              </text>
              <polygon points="40,36 34,44 46,36" fill="#1E293B" />
            </g>

            {/* Output Translation Bubble on Right */}
            <g transform="translate(235, 45)">
              <rect
                width="80"
                height="36"
                rx="8"
                fill={phase === 2 ? '#065F46' : '#1E293B'}
                stroke={phase === 2 ? '#34D399' : '#475569'}
                strokeWidth={1.5}
                className="transition-colors duration-500"
              />
              <text x="40" y="22" fill={phase === 2 ? '#A7F3D0' : '#64748B'} fontSize="8.5" fontWeight="bold" textAnchor="middle">
                {phase === 2 ? '"¡Hola Mundo!"' : '...'}
              </text>
              <polygon points="40,36 34,44 46,36" fill={phase === 2 ? '#065F46' : '#1E293B'} />
            </g>

            {/* Transformer Neural Attention Waves in Middle */}
            <g transform="translate(115, 60)" opacity={phase >= 1 ? 1 : 0.3}>
              <line x1="0" y1="0" x2="110" y2="0" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" className={phase === 1 ? 'animate-pulse' : ''} />
              <circle cx="35" cy="0" r="5" fill="#6366F1" />
              <circle cx="75" cy="0" r="5" fill="#818CF8" />
            </g>

            {/* THE INTERACTIVE MICROPHONE OBJECT */}
            <g
              transform="translate(150, 80)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="20" cy="20" r="32" fill="#6366F1" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="20" cy="20" r="26" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '20px 20px' }} />
                </g>
              )}

              {/* Mic Stand & Transducer */}
              <circle cx="20" cy="20" r="16" fill={phase >= 1 ? '#4F46E5' : '#334155'} />
              <rect x="15" y="10" width="10" height="15" rx="5" fill="white" />
              <line x1="20" y1="28" x2="20" y2="38" stroke="white" strokeWidth="3" />
              <line x1="12" y1="38" x2="28" y2="38" stroke="white" strokeWidth="3" />

              {/* Soundwaves Ripple when Active */}
              {phase >= 1 && (
                <g transform="translate(20, 20)">
                  <circle cx="0" cy="0" r="22" fill="none" stroke="#818CF8" strokeWidth="2" className="animate-ping" />
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#818CF8" strokeWidth="1.5" className="animate-ping" style={{ animationDelay: '0.3s' }} />
                </g>
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-20, -18)">
                  <rect width="80" height="16" rx="8" fill="#4338CA" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP MIC
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#1E293B" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#818CF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP MIC TO TRANSLATE SPEECH'}
                {phase === 1 && 'PROCESSING ATTENTION TOKENS...'}
                {phase === 2 && 'INSTANT TRANSLATION SYNCHRONIZED'}
              </text>
            </g>
          </svg>
        )
      }

      // 7. DATA / CLIMATE: DOPPLER SATELLITE -> STORM CONVECTIVE CORE
      case 'data': {
        const satX = phase === 0 ? 220 : phase === 1 ? 160 : 150

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0C1B33" />

            {/* Earth Horizon Curvature */}
            <path d="M0 130 Q170 110 340 130 V160 H0 Z" fill="#1E3A8A" opacity="0.6" />

            {/* Convective Storm Clouds on Left */}
            <g transform="translate(50, 75)">
              <circle cx="20" cy="20" r="18" fill="#475569" />
              <circle cx="45" cy="15" r="24" fill={phase === 2 ? '#1E293B' : '#64748B'} className="transition-colors duration-500" />
              <circle cx="70" cy="22" r="16" fill="#475569" />
              {/* Rainfall lines when forecast active */}
              {phase === 2 && (
                <g stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse">
                  <line x1="25" y1="45" x2="20" y2="70" />
                  <line x1="45" y1="45" x2="40" y2="70" />
                  <line x1="65" y1="45" x2="60" y2="70" />
                </g>
              )}
            </g>

            {/* Microwave Radar Beam from Satellite to Storm */}
            {phase >= 1 && (
              <polygon points={`${satX + 15},35 50,90 120,90`} fill="#38BDF8" fillOpacity="0.25" className="animate-pulse" />
            )}

            {/* THE INTERACTIVE WEATHER SATELLITE */}
            <g
              transform={`translate(${satX}, 20)`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="15" cy="15" r="30" fill="#0284C7" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="15" cy="15" r="24" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '15px 15px' }} />
                </g>
              )}

              {/* Satellite Body & Solar Arrays */}
              <rect x="5" y="8" width="20" height="14" rx="3" fill="#E2E8F0" />
              <rect x="-18" y="11" width="18" height="8" rx="2" fill="#0284C7" />
              <rect x="30" y="11" width="18" height="8" rx="2" fill="#0284C7" />
              {/* Radar Dish */}
              <path d="M15 22 Q15 32 5 30" stroke="#94A3B8" strokeWidth="2" fill="none" />
              <circle cx="5" cy="30" r="3" fill="#38BDF8" />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-25, -16)">
                  <rect width="80" height="16" rx="8" fill="#0369A1" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP SATELLITE
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="200" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#38BDF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP SATELLITE TO RUN RADAR'}
                {phase === 1 && 'DOPPLER PROBING CLOUD DENSITY...'}
                {phase === 2 && 'RAIN AT 3:00 PM (92% ACCURACY)'}
              </text>
            </g>
          </svg>
        )
      }

      // 8. CITY / SMART INFRASTRUCTURE: AMBULANCE -> SMART TRAFFIC GREEN WAVE
      case 'city': {
        const ambX = phase === 0 ? 35 : phase === 1 ? 120 : 250
        const isGreenWave = phase >= 1

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#090D16" />

            {/* City Architecture */}
            <path d="M0 60 H40 V40 H80 V55 H130 V30 H180 V60 H240 V45 H290 V60 H340 V160 H0 Z" fill="#1E293B" opacity="0.5" />

            {/* Intersection Roadway */}
            <rect x="0" y="80" width="340" height="80" fill="#1E293B" />
            <line x1="0" y1="120" x2="340" y2="120" stroke="#FDE047" strokeWidth="2" strokeDasharray="12 12" />

            {/* Smart Traffic Signal at Intersection */}
            <g transform="translate(200, 45)">
              <rect x="0" y="0" width="14" height="35" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <circle cx="7" cy="8" r="4" fill={isGreenWave ? '#7F1D1D' : '#EF4444'} />
              <circle cx="7" cy="18" r="4" fill="#78350F" />
              <circle cx="7" cy="28" r="4" fill={isGreenWave ? '#10B981' : '#064E3B'} className={isGreenWave ? 'animate-ping' : ''} />
            </g>

            {/* Cross Traffic Car stopped safely */}
            <g transform="translate(190, 125)">
              <rect width="32" height="16" rx="4" fill="#64748B" />
              <circle cx="8" cy="16" r="4" fill="#0F172A" />
              <circle cx="24" cy="16" r="4" fill="#0F172A" />
            </g>

            {/* THE INTERACTIVE EMERGENCY AMBULANCE */}
            <g
              transform={`translate(${ambX}, 88)`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="28" cy="16" r="30" fill="#EF4444" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="28" cy="16" r="24" stroke="#F87171" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '28px 16px' }} />
                </g>
              )}

              {/* Ambulance Body */}
              <rect x="0" y="5" width="56" height="24" rx="6" fill="#FFFFFF" />
              <rect x="36" y="8" width="16" height="12" rx="3" fill="#38BDF8" opacity="0.8" />
              {/* Red Cross */}
              <rect x="16" y="11" width="12" height="4" fill="#EF4444" />
              <rect x="20" y="7" width="4" height="12" fill="#EF4444" />
              {/* Wheels */}
              <circle cx="14" cy="29" r="6" fill="#0F172A" />
              <circle cx="44" cy="29" r="6" fill="#0F172A" />

              {/* Siren Beacon */}
              <rect x="20" y="0" width="8" height="5" rx="2" fill="#EF4444" className="animate-ping" />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-10, -18)">
                  <rect width="80" height="16" rx="8" fill="#B91C1C" />
                  <text x="40" y="11" fill="white" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    TAP AMBULANCE
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#EF4444'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP AMBULANCE TO CLEAR ROUTE'}
                {phase === 1 && 'V2X TELEMETRY SYNCHRONIZING...'}
                {phase === 2 && 'GREEN WAVE LOCKED · 0 DELAY'}
              </text>
            </g>
          </svg>
        )
      }

      // 9. ROBOTICS: PICKING ARM -> CONVEYOR PARCEL
      case 'robotics': {
        const armAngle = phase === 0 ? 0 : phase === 1 ? 35 : 0
        const boxX = phase === 0 ? 120 : phase === 1 ? 160 : 255
        const boxY = phase === 0 ? 110 : phase === 1 ? 75 : 110

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0F172A" />

            {/* Conveyor Belt System */}
            <rect x="30" y="125" width="280" height="15" rx="4" fill="#334155" />
            <line x1="35" y1="132" x2="305" y2="132" stroke="#94A3B8" strokeWidth="2" strokeDasharray="10 10" />

            {/* Destination Chute Bin on Right */}
            <g transform="translate(250, 105)">
              <rect width="45" height="35" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
              <text x="22" y="22" fill="#34D399" fontSize="8" fontWeight="bold" textAnchor="middle">
                CHUTE B
              </text>
            </g>

            {/* Target Parcel Box */}
            <g transform={`translate(${boxX}, ${boxY})`} className="transition-all duration-700 ease-out">
              <rect width="28" height="24" rx="4" fill="#D97706" />
              <line x1="0" y1="12" x2="28" y2="12" stroke="#B45309" strokeWidth="2" />
              <line x1="14" y1="0" x2="14" y2="24" stroke="#B45309" strokeWidth="2" />
              {/* Barcode */}
              <rect x="5" y="4" width="10" height="5" fill="white" />
            </g>

            {/* THE INTERACTIVE ROBOTIC ARM OBJECT */}
            <g
              transform="translate(150, 30)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="20" cy="40" r="32" fill="#0284C7" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="20" cy="40" r="26" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '20px 40px' }} />
                </g>
              )}

              {/* Arm Base Turret */}
              <circle cx="20" cy="15" r="14" fill="#334155" />
              {/* Arm Segments */}
              <line x1="20" y1="15" x2="35" y2="55" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
              <circle cx="35" cy="55" r="6" fill="#1E293B" />
              <line x1="35" y1="55" x2="20" y2="85" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
              {/* Gripper / Suction Cup */}
              <path d="M12 85 H28 M14 85 V95 M26 85 V95" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

              {/* Laser Barcode Scanner Line */}
              {phase === 1 && (
                <line x1="20" y1="95" x2="20" y2="120" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-20, -18)">
                  <rect width="80" height="16" rx="8" fill="#B45309" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP ROBOT
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#F59E0B'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP ROBOT ARM TO SORT PARCEL'}
                {phase === 1 && 'KINEMATIC PICK & BARCODE SCAN...'}
                {phase === 2 && 'PARCEL SORTED TO CHUTE B (100%)'}
              </text>
            </g>
          </svg>
        )
      }

      // 10. CREATIVE: DIGITAL ART CANVAS -> 3-STAGE DIFFUSION
      case 'creative': {
        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#18181B" />

            {/* Digital Easel Stand */}
            <line x1="120" y1="135" x2="170" y2="35" stroke="#52525B" strokeWidth="4" />
            <line x1="220" y1="135" x2="170" y2="35" stroke="#52525B" strokeWidth="4" />

            {/* THE INTERACTIVE ART CANVAS OBJECT */}
            <g
              transform="translate(110, 35)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="60" cy="45" r="45" fill="#A855F7" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="60" cy="45" r="36" stroke="#C084FC" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '60px 45px' }} />
                </g>
              )}

              {/* Canvas Board */}
              <rect width="120" height="90" rx="8" fill="#27272A" stroke="#71717A" strokeWidth="3" />

              {/* Phase 0: Gaussian Random Noise Latice */}
              {phase === 0 && (
                <g opacity="0.4">
                  {[20, 40, 60, 80, 100].map((x) => (
                    <circle key={x} cx={x} cy={35} r="2" fill="#E4E4E7" />
                  ))}
                  {[30, 50, 70, 90].map((x) => (
                    <circle key={x} cx={x} cy={60} r="2.5" fill="#E4E4E7" />
                  ))}
                </g>
              )}

              {/* Phase 1: Generative Contour Wireframe */}
              {phase === 1 && (
                <g stroke="#C084FC" strokeWidth="2" fill="none" className="animate-pulse">
                  <path d="M15 70 Q60 20 105 70" />
                  <circle cx="60" cy="35" r="14" />
                </g>
              )}

              {/* Phase 2: Full Generative Digital Masterpiece */}
              {phase === 2 && (
                <g>
                  <defs>
                    <linearGradient id="artGrad" x1="0" y1="0" x2="0" y2="90" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F43F5E" />
                      <stop offset="0.5" stopColor="#A855F7" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="112" height="82" rx="6" fill="url(#artGrad)" />
                  <circle cx="60" cy="35" r="16" fill="#FDE047" />
                  <path d="M4 86 L40 50 L75 86 Z" fill="#1E1B4B" opacity="0.8" />
                  <path d="M55 86 L85 60 L116 86 Z" fill="#1E1B4B" opacity="0.6" />
                </g>
              )}

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(20, -18)">
                  <rect width="80" height="16" rx="8" fill="#7E22CE" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP CANVAS
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#09090B" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#C084FC'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP CANVAS TO GENERATE ART'}
                {phase === 1 && 'DIFFUSION SYNTHESIS IN PROGRESS...'}
                {phase === 2 && 'MASTERPIECE RENDERED (100%)'}
              </text>
            </g>
          </svg>
        )
      }

      // 11. ETHICS: ALGORITHMIC FAIRNESS SCALE
      case 'ethics': {
        const tiltAngle = phase === 0 ? 15 : phase === 1 ? 8 : 0

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0A0F1D" />

            {/* Pillar Fulcrum */}
            <path d="M165 55 L175 55 L180 135 H160 Z" fill="#475569" />

            {/* THE INTERACTIVE BALANCE SCALE BEAM */}
            <g
              transform="translate(170, 55)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="0" cy="0" r="35" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="28" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />
                </g>
              )}

              {/* Rotatable Scale Crossbar */}
              <g
                transform={`rotate(${tiltAngle})`}
                className="transition-transform duration-700 ease-out"
                style={{ transformOrigin: '0px 0px' }}
              >
                <line x1="-85" y1="0" x2="85" y2="0" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="0" cy="0" r="6" fill="#38BDF8" />

                {/* Left Tray (Candidate A) */}
                <g transform="translate(-85, 0)">
                  <line x1="0" y1="0" x2="-15" y2="35" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="15" y2="35" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M-22 35 H22" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                  <rect x="-14" y="20" width="28" height="14" rx="3" fill="#3B82F6" />
                  <text x="0" y="30" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">
                    SKILL 95
                  </text>
                </g>

                {/* Right Tray (Candidate B) */}
                <g transform="translate(85, 0)">
                  <line x1="0" y1="0" x2="-15" y2="35" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="15" y2="35" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M-22 35 H22" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                  <rect x="-14" y="20" width="28" height="14" rx="3" fill="#10B981" />
                  <text x="0" y="30" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">
                    SKILL 95
                  </text>
                </g>
              </g>

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-40, -32)">
                  <rect width="80" height="16" rx="8" fill="#047857" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP SCALE
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="200" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#38BDF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP SCALE TO BALANCE WITH FAIRNESS'}
                {phase === 1 && 'MASKING UNCONSCIOUS BIAS...'}
                {phase === 2 && '100% MERIT EVALUATION CONFIRMED'}
              </text>
            </g>
          </svg>
        )
      }

      // 12. LOGIC: SMART HOME THERMOSTAT -> SOLAR BATTERY SAVINGS
      case 'logic': {
        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0B132B" />

            {/* Smart House Structure */}
            <polygon points="50,75 140,25 230,75" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <rect x="65" y="75" width="150" height="65" fill="#0F172A" stroke="#334155" strokeWidth="2" />

            {/* Rooftop Solar Panels */}
            <g transform="translate(80, 42)" opacity="0.9">
              <polygon points="0,15 40,0 80,15 40,30" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
            </g>

            {/* Window with Blinds (Lowering when phase >= 1) */}
            <g transform="translate(85, 85)">
              <rect width="30" height="35" rx="3" fill="#FEF08A" fillOpacity={phase >= 1 ? 0.3 : 0.8} />
              {phase >= 1 && (
                <rect width="30" height="25" fill="#64748B" className="transition-all duration-700" />
              )}
            </g>

            {/* THE INTERACTIVE SMART THERMOSTAT OBJECT */}
            <g
              transform="translate(150, 85)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="20" cy="20" r="32" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="20" cy="20" r="26" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '20px 20px' }} />
                </g>
              )}

              {/* Thermostat Dial */}
              <circle cx="20" cy="20" r="18" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <text x="20" y="23" fill={phase >= 1 ? '#34D399' : '#FBBF24'} fontSize="9" fontWeight="black" textAnchor="middle">
                {phase >= 1 ? '71°F' : '78°F'}
              </text>

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-20, -18)">
                  <rect width="80" height="16" rx="8" fill="#047857" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP DIAL
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#FBBF24'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP DIAL TO OPTIMIZE CLIMATE'}
                {phase === 1 && 'ADJUSTING SOLAR STORAGE & BLINDS...'}
                {phase === 2 && 'OPTIMAL 71°F · 45% ENERGY SAVED'}
              </text>
            </g>
          </svg>
        )
      }

      // 13. FRONTIER: AUTONOMOUS MARS ROVER -> BOULDER NAVIGATION
      case 'frontier': {
        const roverX = phase === 0 ? 50 : phase === 1 ? 120 : 190

        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#1C1018" />

            {/* Martian Crater Terrain Horizon */}
            <path d="M0 95 Q80 80 180 90 T340 85 V160 H0 Z" fill="#991B1B" opacity="0.6" />
            <rect x="0" y="105" width="340" height="55" fill="#7F1D1D" />

            {/* Science Target Rock with Laser zapper */}
            <g transform="translate(265, 110)">
              <path d="M0 20 L15 0 L35 8 L40 25 Z" fill="#450A0A" stroke="#B91C1C" strokeWidth="1.5" />
              {phase === 2 && (
                <circle cx="20" cy="12" r="8" fill="#38BDF8" fillOpacity="0.5" className="animate-ping" />
              )}
            </g>

            {/* Autonomous Green Path Planning Vector */}
            {phase >= 1 && (
              <path
                d="M100 120 Q160 100 250 115"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                fill="none"
                className="animate-pulse"
              />
            )}

            {/* THE INTERACTIVE MARS ROVER OBJECT */}
            <g
              transform={`translate(${roverX}, 95)`}
              className="cursor-pointer transition-all duration-700 ease-out"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="25" cy="15" r="30" fill="#EF4444" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="25" cy="15" r="24" stroke="#F87171" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '25px 15px' }} />
                </g>
              )}

              {/* Rover Body Chassis */}
              <rect x="5" y="5" width="40" height="16" rx="4" fill="#E2E8F0" />
              {/* Camera Mast */}
              <line x1="35" y1="5" x2="35" y2="-12" stroke="#94A3B8" strokeWidth="2.5" />
              <rect x="30" y="-16" width="12" height="6" rx="2" fill="#0F172A" />
              <circle cx="36" cy="-13" r="1.5" fill="#38BDF8" />
              {/* Rocker Bogie Wheels */}
              <circle cx="10" cy="24" r="5" fill="#334155" />
              <circle cx="25" cy="24" r="5" fill="#334155" />
              <circle cx="40" cy="24" r="5" fill="#334155" />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-15, -28)">
                  <rect width="80" height="16" rx="8" fill="#991B1B" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP ROVER
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#EF4444'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP ROVER TO AUTONOMOUSLY DRIVE'}
                {phase === 1 && 'HAZCAM 3D PATH PLANNING...'}
                {phase === 2 && 'ROCK REACHED · WATER TRACES FOUND'}
              </text>
            </g>
          </svg>
        )
      }

      // 14. NEURAL / DEFAULT: SYNAPTIC NETWORK -> PATTERN MATCH
      default: {
        return (
          <svg width="100%" height="100%" viewBox="0 0 340 160" fill="none" className="select-none">
            <rect width="340" height="160" rx="20" fill="#0F172A" />

            {/* Neural Connections */}
            <g opacity="0.5">
              <line x1="60" y1="50" x2="160" y2="40" stroke="#818CF8" strokeWidth={phase >= 1 ? 3 : 1.5} />
              <line x1="60" y1="50" x2="160" y2="80" stroke="#818CF8" strokeWidth={phase >= 1 ? 3 : 1.5} />
              <line x1="60" y1="110" x2="160" y2="80" stroke="#818CF8" strokeWidth={phase >= 1 ? 3 : 1.5} />
              <line x1="60" y1="110" x2="160" y2="120" stroke="#818CF8" strokeWidth={phase >= 1 ? 3 : 1.5} />
              <line x1="160" y1="40" x2="260" y2="80" stroke="#34D399" strokeWidth={phase === 2 ? 3.5 : 1.5} />
              <line x1="160" y1="80" x2="260" y2="80" stroke="#34D399" strokeWidth={phase === 2 ? 3.5 : 1.5} />
              <line x1="160" y1="120" x2="260" y2="80" stroke="#34D399" strokeWidth={phase === 2 ? 3.5 : 1.5} />
            </g>

            {/* Hidden Nodes */}
            <circle cx="160" cy="40" r="10" fill="#38BDF8" className={phase >= 1 ? 'animate-pulse' : ''} />
            <circle cx="160" cy="80" r="10" fill="#38BDF8" className={phase >= 1 ? 'animate-pulse' : ''} />
            <circle cx="160" cy="120" r="10" fill="#38BDF8" className={phase >= 1 ? 'animate-pulse' : ''} />

            {/* Output Node */}
            <circle cx="260" cy="80" r="14" fill={phase === 2 ? '#10B981' : '#334155'} />
            {phase === 2 && (
              <circle cx="260" cy="80" r="22" fill="none" stroke="#34D399" strokeWidth="2" className="animate-ping" />
            )}

            {/* THE INTERACTIVE INPUT NODES OBJECT */}
            <g
              transform="translate(60, 80)"
              className="cursor-pointer"
              onClick={triggerDirectObjectAction}
            >
              {/* Pulsing Invitation when Idle */}
              {phase === 0 && (
                <g>
                  <circle cx="0" cy="0" r="32" fill="#6366F1" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="26" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />
                </g>
              )}

              {/* Input Nodes Cluster */}
              <circle cx="0" cy="-30" r="12" fill="#6366F1" />
              <circle cx="0" cy="30" r="12" fill="#6366F1" />

              {/* In-Scene Interactive Prompt Tag */}
              {phase === 0 && (
                <g transform="translate(-40, -55)">
                  <rect width="80" height="16" rx="8" fill="#4338CA" />
                  <text x="40" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TAP INPUTS
                  </text>
                </g>
              )}
            </g>

            {/* Top In-Scene Status Ribbon */}
            <g transform="translate(12, 12)">
              <rect width="195" height="20" rx="10" fill="#0F172A" fillOpacity="0.9" />
              <circle cx="10" cy="10" r="3.5" fill={phase === 2 ? '#34D399' : '#818CF8'} className={phase === 1 ? 'animate-ping' : ''} />
              <text x="20" y="13.5" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                {phase === 0 && 'TAP INPUT TO FIRE NEURAL SYNAPSE'}
                {phase === 1 && 'FEEDFORWARD PULSE PROPAGATING...'}
                {phase === 2 && 'WEIGHTS TUNED · PATTERN VERIFIED'}
              </text>
            </g>
          </svg>
        )
      }
    }
  }

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-200">
      {/* 1. Large Topic-Specific Animated Real-World Scene Canvas (Direct Object Control) */}
      <div className="w-full shrink-0 h-44 sm:h-52 rounded-3xl overflow-hidden border border-indigo-100 shadow-md relative bg-slate-900 group">
        {renderInteractiveScene()}
      </div>

      {/* 2. Real-World Example Explanation Card */}
      <div className="flex-1 flex flex-col justify-center min-h-0 my-1 sm:my-2 bg-amber-50/90 border border-amber-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-2xs space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <Lightbulb size={14} />
            </div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950">
              Real-World Example
            </h2>
          </div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80">
            {badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug sm:leading-relaxed">
          {exampleText}
        </p>

        {/* Dynamic Telemetry / Feedback Bar */}
        <div className="pt-1 border-t border-amber-200/70 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-amber-900">
          <div className="flex items-center gap-1 truncate">
            <CheckCircle2 size={12} className={phase === 2 ? 'text-emerald-600 shrink-0' : 'text-amber-700 shrink-0'} />
            <span className="truncate">
              {telemetryMessage || 'Interact directly with the scene above to see AI technology in action!'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Buttons: Back + Next */}
      <div className="shrink-0 pt-1 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            onBack()
          }}
          className="py-2 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            onNext()
          }}
          className="py-2.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all flex-1 sm:flex-initial ml-auto active:scale-[0.99]"
        >
          <span>{nextLabel}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default Lesson1RealWorldExampleExperience
