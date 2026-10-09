// ─────────────────────────────────────────────────────────────────────────────
// LESSON 2 SCENARIO & INTERACTIVE SOLVE EXPERIENCE ENGINE (SECTION 3)
// 100% Mobile-First Pedagogical Flow:
// Screen 1: Scenario (Real-world situation + Large prominent SVG + Aura AI Guide)
// Screen 2: Explore (3-4 Interactive topic objects to tap, inspect & discover clues)
// Screen 3: Solve (Hands-on real action tool with live environmental transformation)
// Screen 4: What You Learned (3-4 Key takeaways + Visual summary + Aura conclusion)
// Next → Game / Progression
// Zero emojis · Simple English for Class 3 to PG · Single viewport (No scrolling)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Lightbulb,
  Radio, Shield, Eye, Heart, Cpu, Zap, Sliders, Play, Award,
  Check, Lock, Unlock, Flame, Sun, Droplet, Layers, Terminal,
  Globe, Binary, Code, AlertTriangle, Compass, CheckSquare,
  SlidersHorizontal, Camera, Activity, RotateCcw, Stethoscope,
  Bot, Palette, Scale, Building2, Briefcase, GitBranch
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { gamification } from '../../../utils/gamification'
import type { WorldExperienceProps } from '../worlds/types'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'
import { TopicLessonIllustration } from '../primitives/TopicLessonIllustration'

export type Lesson2Screen = 1 | 2 | 3 | 4

export interface ScenarioExploreItem {
  id: string
  name: string
  detail: string
  clue: string
  icon: any
}

export interface Lesson2ScenarioData {
  scenarioTitle: string
  situationText: string
  auraGreeting: string
  exploreItems: ScenarioExploreItem[]
  solveTitle: string
  solveInstruction: string
  solveSuccessMsg: string
  learnedPoints: { title: string; text: string }[]
  renderSolveTool: (
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>,
    onValid: () => void,
    isValid: boolean
  ) => React.ReactNode
  renderScenarioVisual: () => React.ReactNode
  renderSolvedVisual: () => React.ReactNode
}

/**
 * Resolves bespoke topic-bound scenario, exploration items, interactive tool, and key takeaways
 * strictly based on the exact Lesson 2 topic across all 14 curriculum domains.
 */
export function getLesson2ScenarioData(topicTitle: string = '', chapterTitle: string = '', gradeKey: string = ''): Lesson2ScenarioData {
  const t = (topicTitle + ' ' + chapterTitle).toLowerCase()
  const matches = (pattern: RegExp) => pattern.test(t)

  // 1. SMART FARM & AGRICULTURE
  if (matches(/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/)) {
    return {
      scenarioTitle: 'Smart Greenhouse Crisis: Heat Stress Alert',
      situationText: 'The automated vegetable greenhouse detected sudden midday heat spikes. Several crop rows are parched and require immediate targeted hydration before leaves wilt.',
      auraGreeting: 'A sudden heatwave is threatening the greenhouse crops! Let\'s explore the telemetry clues and use our AI tools to save the plants.',
      exploreItems: [
        { id: 'soil_probe', name: 'Soil Moisture Probe', detail: 'Moisture Level: 22%', clue: 'Critically dry. Root zone needs instant water flow.', icon: Droplet },
        { id: 'thermal_cam', name: 'Thermal Canopy Camera', detail: 'Leaf Temp: 35°C', clue: 'High heat stress detected on southern tomato rows.', icon: Eye },
        { id: 'valve_node', name: 'Zone 3 Smart Valve', detail: 'Status: Offline', clue: 'The primary water valve is closed and needs remote activation.', icon: Sliders },
        { id: 'drone_mist', name: 'Precision Spray Drone', detail: 'Battery: 98%', clue: 'Autonomous misting drone is primed for flight.', icon: Radio },
      ],
      solveTitle: 'Precision Irrigation & Drone Cooling',
      solveInstruction: 'Increase the Smart Valve flow to 80%+ and deploy the cooling mist drone.',
      solveSuccessMsg: 'Optimal water pressure restored! Misting drones actively cooling crops.',
      learnedPoints: [
        { title: 'Early Thirst Detection', text: 'Sensors detect crop dehydration hours before visible leaf wilting occurs.' },
        { title: 'Targeted Irrigation', text: 'AI delivers water only to dry zones, saving over 40% more freshwater.' },
        { title: 'Automated Protection', text: 'Combines ground sensors with aerial drones for complete farm management.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const flow = state.flow || 20
        const drone = state.drone || false

        const handleFlow = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, flow: val }
          setState(next)
          if (val >= 75 && drone && !isValid) onValid()
        }

        const toggleDrone = () => {
          gameAudio.playTap()
          const next = { ...state, drone: !drone }
          setState(next)
          if (flow >= 75 && !drone && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Greenhouse Water Flow Rate:</span>
                <span className="font-mono text-indigo-600 font-black">{flow}% (Target: 80%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={flow}
                onChange={handleFlow}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Deploy Cooling Mist Drone:</span>
              <button
                onClick={toggleDrone}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  drone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {drone ? 'Mist Active' : 'Stationary'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="90" fill="#BAE6FD" />
          <circle cx="280" cy="25" r="16" fill="#FBBF24" />
          <rect y="90" width="320" height="50" fill="#78350F" />
          <path d="M40 90 Q 50 78 60 90" stroke="#CA8A04" strokeWidth="3" fill="none" />
          <path d="M140 90 Q 150 75 160 90" stroke="#CA8A04" strokeWidth="3" fill="none" />
          <path d="M240 90 Q 250 80 260 90" stroke="#CA8A04" strokeWidth="3" fill="none" />
          <circle cx="150" cy="110" r="12" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="1.5" className="animate-pulse" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="90" fill="#7DD3FC" />
          <rect y="90" width="320" height="50" fill="#14532D" />
          <path d="M40 90 Q 50 68 60 90" stroke="#22C55E" strokeWidth="4" fill="none" />
          <path d="M140 90 Q 150 65 160 90" stroke="#22C55E" strokeWidth="4" fill="none" />
          <path d="M240 90 Q 250 70 260 90" stroke="#22C55E" strokeWidth="4" fill="none" />
          <circle cx="100" cy="80" r="3" fill="#38BDF8" className="animate-ping" />
          <circle cx="200" cy="80" r="3" fill="#38BDF8" className="animate-ping" />
        </svg>
      ),
    }
  }

  // 2. AUTONOMOUS ROAD & SMART MOBILITY
  if (matches(/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move)\b/)) {
    return {
      scenarioTitle: 'Autonomous Shuttle: Intersection Obstacle Alert',
      situationText: 'An autonomous electric shuttle approaches a complex crosswalk during twilight. A cyclist has entered the blind spot near the turning lane.',
      auraGreeting: 'A cyclist is approaching the vehicle\'s blind spot! Let\'s inspect the sensors and recalibrate our LiDAR system to guarantee safety.',
      exploreItems: [
        { id: 'lidar_cone', name: 'Front LiDAR Beam', detail: 'Angle: 60° (Restricted)', clue: 'Narrow scan arc leaves side cyclists unmonitored.', icon: Radio },
        { id: 'camera_rgb', name: 'Twilight RGB Camera', detail: 'Low Light Mode: Active', clue: 'Contour recognition needs enhanced optical contrast.', icon: Eye },
        { id: 'brake_sub', name: 'Emergency Brake', detail: 'Pressure: 100% Ready', clue: 'Anti-lock braking system is primed for instant stop.', icon: Shield },
        { id: 'crosswalk_sig', name: 'Pedestrian Signal', detail: 'Traffic Light: Red', clue: 'Cyclist crossing with right of way.', icon: Activity },
      ],
      solveTitle: 'LiDAR Sweep & Smart Braking',
      solveInstruction: 'Widen LiDAR scan angle to 160°+ and engage Safe Deceleration.',
      solveSuccessMsg: 'Cyclist safely mapped! Autonomous shuttle decelerated smoothly.',
      learnedPoints: [
        { title: '360° Panoramic Vision', text: 'LiDAR and cameras eliminate blind spots across all vehicle angles.' },
        { title: 'Sub-Millisecond Reflexes', text: 'AI braking algorithms react significantly faster than human drivers.' },
        { title: 'Safety-First Navigation', text: 'Always prioritizes pedestrians and cyclists at complex intersections.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const angle = state.angle || 60
        const brake = state.brake || false

        const handleAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, angle: val }
          setState(next)
          if (val >= 150 && brake && !isValid) onValid()
        }

        const toggleBrake = () => {
          gameAudio.playTap()
          const next = { ...state, brake: !brake }
          setState(next)
          if (angle >= 150 && !brake && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>LiDAR Scan Angle Sweep:</span>
                <span className="font-mono text-indigo-600 font-black">{angle}° (Target: 160°+)</span>
              </div>
              <input
                type="range"
                min="45"
                max="180"
                value={angle}
                onChange={handleAngle}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Engage Smooth Safe Braking:</span>
              <button
                onClick={toggleBrake}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  brake ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {brake ? 'Brakes Engaged' : 'Free Rolling'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#1E293B" />
          <rect y="40" width="320" height="60" fill="#334155" />
          <line x1="0" y1="70" x2="320" y2="70" stroke="#FBBF24" strokeWidth="2" strokeDasharray="8 8" />
          <rect x="60" y="52" width="50" height="25" rx="6" fill="#6366F1" />
          <circle cx="230" cy="50" r="8" fill="#EF4444" className="animate-pulse" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <rect y="40" width="320" height="60" fill="#1E293B" />
          <rect x="70" y="52" width="50" height="25" rx="6" fill="#4F46E5" />
          <path d="M120 64 L 250 20 L 250 110 Z" fill="#10B981" fillOpacity="0.25" />
          <circle cx="230" cy="65" r="8" fill="#10B981" />
        </svg>
      ),
    }
  }

  // 3. CYBER SAFETY & PRIVACY
  if (matches(/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|citizen|security)\b/)) {
    return {
      scenarioTitle: 'Privacy Defense: Unsecured App Permission Trap',
      situationText: 'A third-party mobile quiz game requested unrestricted background access to personal contacts and location without encrypting user profile records.',
      auraGreeting: 'An unverified app is trying to access private data! Let\'s inspect the security permissions and lock our digital privacy shield.',
      exploreItems: [
        { id: 'perm_contacts', name: 'Contacts Permission', detail: 'Status: Requested', clue: 'Quiz games do not require contact book access.', icon: AlertTriangle },
        { id: 'perm_gps', name: 'Background GPS', detail: 'Status: Requested', clue: 'Continuous location tracking poses privacy risks.', icon: Globe },
        { id: 'crypto_vault', name: 'Profile Vault', detail: 'Cipher: 0-bit (Raw)', clue: 'Personal records stored without AES encryption.', icon: Lock },
        { id: 'firewall_filter', name: 'Privacy Filter', detail: 'Status: Standby', clue: 'Automatic data scrubbing filter ready to engage.', icon: Shield },
      ],
      solveTitle: 'Revoke Permissions & Fortify Cipher',
      solveInstruction: 'Deny unnecessary permissions and activate 256-bit AES Privacy Encryption.',
      solveSuccessMsg: 'Unnecessary permissions blocked & private profile vault encrypted!',
      learnedPoints: [
        { title: 'Principle of Least Privilege', text: 'Only grant app permissions that are strictly necessary for core features.' },
        { title: 'End-to-End Encryption', text: 'Always scramble sensitive personal information with strong cryptography.' },
        { title: 'Digital Footprint Awareness', text: 'Regularly audit and clean app permissions to prevent silent data tracking.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const cipher = state.cipher || 64
        const blocked = state.blocked || false

        const handleCipher = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, cipher: val }
          setState(next)
          if (val >= 256 && blocked && !isValid) onValid()
        }

        const toggleBlocked = () => {
          gameAudio.playTap()
          const next = { ...state, blocked: !blocked }
          setState(next)
          if (cipher >= 256 && !blocked && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Vault Encryption Bit Strength:</span>
                <span className="font-mono text-indigo-600 font-black">{cipher}-bit AES (Target: 256-bit)</span>
              </div>
              <input
                type="range"
                min="64"
                max="256"
                step="64"
                value={cipher}
                onChange={handleCipher}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Block Unnecessary Permissions:</span>
              <button
                onClick={toggleBlocked}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  blocked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {blocked ? 'Blocked (Protected)' : 'Open (Vulnerable)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#020617" />
          <circle cx="160" cy="70" r="32" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
          <rect x="145" y="60" width="30" height="20" rx="4" fill="#EF4444" />
          <circle cx="90" cy="40" r="6" fill="#EF4444" className="animate-ping" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#020617" />
          <circle cx="160" cy="70" r="36" fill="#064E3B" stroke="#10B981" strokeWidth="3" />
          <rect x="145" y="60" width="30" height="20" rx="4" fill="#10B981" />
          <circle cx="160" cy="70" r="54" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      ),
    }
  }

  // 4. DATA DETECTIVE & MACHINE LEARNING
  if (matches(/\b(datas?|patterns?|predict\w*|analytics?|learning machines?|intelligence|datasets?)\b/)) {
    return {
      scenarioTitle: 'Data Quality Investigation: Outlier Skew',
      situationText: 'A predictive analytics model failed to forecast accurately because 35% of the input dataset contained extreme noise and corrupted data entries.',
      auraGreeting: 'The training dataset has noisy outliers skewing our model! Let\'s explore the feature clusters and prune the bad data points.',
      exploreItems: [
        { id: 'raw_records', name: 'Raw Ingestion Buffer', detail: 'Total Records: 10,000', clue: 'Unfiltered data stream contains missing values.', icon: Layers },
        { id: 'noise_cluster', name: 'Outlier Scatter Cloud', detail: '35% Noise Points', clue: 'Extreme anomalous records skewing the decision line.', icon: AlertTriangle },
        { id: 'class_ratio', name: 'Class Distribution', detail: 'Ratio: 88/12 Skewed', clue: 'Class B requires synthetic balance augmentation.', icon: SlidersHorizontal },
        { id: 'accuracy_gauge', name: 'Validation Accuracy', detail: 'Current: 58%', clue: 'Target threshold is 95%+ with clean data.', icon: CheckCircle2 },
      ],
      solveTitle: 'Outlier Pruner & SMOTE Balancer',
      solveInstruction: 'Slide Noise Rejection to 85%+ and toggle Synthetic Class Balancing.',
      solveSuccessMsg: 'Dataset sanitized & class distribution balanced perfectly!',
      learnedPoints: [
        { title: 'Data Cleaning Importance', text: 'Clean, verified training data is the foundation of high-accuracy AI models.' },
        { title: 'Outlier Elimination', text: 'Filtering statistical anomalies prevents misleading decision boundaries.' },
        { title: 'Balanced Representation', text: 'Equal class sampling prevents the model from ignoring underrepresented groups.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const filter = state.filter || 20
        const smote = state.smote || false

        const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, filter: val }
          setState(next)
          if (val >= 80 && smote && !isValid) onValid()
        }

        const toggleSmote = () => {
          gameAudio.playTap()
          const next = { ...state, smote: !smote }
          setState(next)
          if (filter >= 80 && !smote && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Noise Rejection Filter:</span>
                <span className="font-mono text-indigo-600 font-black">{filter}% (Target: 85%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filter}
                onChange={handleFilter}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">SMOTE Class Balance Augmentation:</span>
              <button
                onClick={toggleSmote}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  smote ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {smote ? 'Balanced (50/50)' : 'Imbalanced'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <circle cx="90" cy="70" r="4" fill="#6366F1" />
          <circle cx="110" cy="80" r="4" fill="#6366F1" />
          <circle cx="230" cy="30" r="5" fill="#EF4444" className="animate-ping" />
          <circle cx="250" cy="40" r="5" fill="#EF4444" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <circle cx="90" cy="70" r="4" fill="#38BDF8" />
          <circle cx="110" cy="80" r="4" fill="#38BDF8" />
          <circle cx="210" cy="40" r="4" fill="#34D399" />
          <circle cx="225" cy="45" r="4" fill="#34D399" />
          <line x1="160" y1="20" x2="160" y2="110" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      ),
    }
  }

  // 5. NEURAL NETWORKS & DEEP LEARNING
  if (matches(/\b(neur\w*|synapses?|deep learning|gradients?|weights?|perceptrons?|backprop\w*)\b/)) {
    return {
      scenarioTitle: 'Neural Architecture: Synaptic Weight Misalignment',
      situationText: 'A deep neural network is failing to converge on complex patterns because random synaptic weight initializations are causing exploding gradients.',
      auraGreeting: 'The neural network loss is too high! Let\'s inspect the layers, calibrate the synaptic weights, and enable non-linear activations.',
      exploreItems: [
        { id: 'input_tensor', name: 'Input Layer Nodes', detail: 'Normalized: [0, 1]', clue: 'Inputs are clean and ready for forward pass.', icon: Layers },
        { id: 'weight_matrix', name: 'Synaptic Weight Matrix', detail: 'Weights: Uncalibrated', clue: 'Random values causing severe prediction errors.', icon: Cpu },
        { id: 'loss_meter', name: 'Loss Function', detail: 'Loss: 3.48 (High)', clue: 'Requires gradient descent tuning to reach zero error.', icon: Activity },
        { id: 'activation_fn', name: 'Activation Node', detail: 'Function: Linear', clue: 'Non-linear ReLU needed to learn complex curves.', icon: Zap },
      ],
      solveTitle: 'Synaptic Weight Tuner & ReLU Switch',
      solveInstruction: 'Tune the Synaptic Weight Multiplier to +0.80 and enable ReLU Activation.',
      solveSuccessMsg: 'Loss converged to 0.012 & neural network generalized accurately!',
      learnedPoints: [
        { title: 'Hierarchical Representations', text: 'Deeper hidden layers capture increasingly complex textures and concepts.' },
        { title: 'Gradient Optimization', text: 'Backpropagation adjusts millions of parameters simultaneously to reduce error.' },
        { title: 'Non-Linear Activation', text: 'Enables neural networks to map intricate real-world mathematical patterns.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const weight = state.weight || 0.1
        const relu = state.relu || false

        const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseFloat(e.target.value)
          const next = { ...state, weight: val }
          setState(next)
          if (val >= 0.75 && relu && !isValid) onValid()
        }

        const toggleRelu = () => {
          gameAudio.playTap()
          const next = { ...state, relu: !relu }
          setState(next)
          if (weight >= 0.75 && !relu && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Synaptic Weight Multiplier:</span>
                <span className="font-mono text-indigo-600 font-black">+{weight.toFixed(2)} (Target: +0.80)</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={weight}
                onChange={handleWeight}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Enable ReLU Activation Function:</span>
              <button
                onClick={toggleRelu}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  relu ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {relu ? 'Enabled (ReLU)' : 'Linear (Basic)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <circle cx="60" cy="50" r="10" fill="#6366F1" />
          <circle cx="60" cy="90" r="10" fill="#6366F1" />
          <circle cx="160" cy="70" r="10" fill="#EF4444" className="animate-pulse" />
          <circle cx="260" cy="70" r="10" fill="#EF4444" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <circle cx="60" cy="50" r="10" fill="#818CF8" />
          <circle cx="60" cy="90" r="10" fill="#818CF8" />
          <circle cx="160" cy="70" r="10" fill="#34D399" />
          <circle cx="260" cy="70" r="12" fill="#10B981" />
          <line x1="70" y1="50" x2="150" y2="70" stroke="#34D399" strokeWidth="2.5" />
          <line x1="70" y1="90" x2="150" y2="70" stroke="#34D399" strokeWidth="2.5" />
          <line x1="170" y1="70" x2="248" y2="70" stroke="#34D399" strokeWidth="3" />
        </svg>
      ),
    }
  }

  // 6. LARGE LANGUAGE MODELS & NLP
  if (matches(/\b(llms?|languages?|tokens?|transformers?|nlp|prompts?|chatbots?|dialogue|say it clearly|command|words?)\b/)) {
    return {
      scenarioTitle: 'LLM Prompt Engineering: Context Truncation Fix',
      situationText: 'A customer support conversational assistant is hallucinating answers because its context window is too small and missing domain grounding documents.',
      auraGreeting: 'Our AI assistant is losing context mid-conversation! Let\'s inspect the tokenizer and expand the context memory window.',
      exploreItems: [
        { id: 'token_stream', name: 'Byte-Pair Tokenizer', detail: 'Rate: 1.3 Tokens/Word', clue: 'Tokens are parsed efficiently into vector embeddings.', icon: Binary },
        { id: 'context_window', name: 'Attention Buffer', detail: 'Capacity: 512 Tokens (Low)', clue: 'Early conversation instructions are getting dropped.', icon: Layers },
        { id: 'temperature_knob', name: 'Creativity Temperature', detail: 'Temp: 0.95 (High)', clue: 'Excessive randomness causing factual inconsistencies.', icon: Sliders },
        { id: 'rag_docs', name: 'Knowledge Grounding RAG', detail: 'Status: Connected', clue: 'Verified knowledge base ready for vector retrieval.', icon: CheckCircle2 },
      ],
      solveTitle: 'Context Expansion & Temperature Tuner',
      solveInstruction: 'Expand Context Window to 4096+ tokens and set Temperature to 0.2 for strict factual accuracy.',
      solveSuccessMsg: 'Context grounded & temperature tuned! Accurate responses verified.',
      learnedPoints: [
        { title: 'Attention & Context Window', text: 'Wider context enables AI to remember full dialogues and multi-page documents.' },
        { title: 'Temperature Control', text: 'Lower temperature ensures precise factual answers; higher temperature increases creativity.' },
        { title: 'Retrieval Grounding', text: 'Grounding LLMs with trusted sources eliminates hallucinations.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const tokens = state.tokens || 512
        const lowTemp = state.lowTemp || false

        const handleTokens = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, tokens: val }
          setState(next)
          if (val >= 4000 && lowTemp && !isValid) onValid()
        }

        const toggleLowTemp = () => {
          gameAudio.playTap()
          const next = { ...state, lowTemp: !lowTemp }
          setState(next)
          if (tokens >= 4000 && !lowTemp && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Attention Context Window:</span>
                <span className="font-mono text-indigo-600 font-black">{tokens} Tokens (Target: 4096+)</span>
              </div>
              <input
                type="range"
                min="512"
                max="8192"
                step="512"
                value={tokens}
                onChange={handleTokens}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Set Low Temperature (Factual 0.2):</span>
              <button
                onClick={toggleLowTemp}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  lowTemp ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {lowTemp ? 'Factual (0.2)' : 'Random (0.95)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <rect x="30" y="30" width="100" height="80" rx="8" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
          <text x="45" y="75" fill="#EF4444" fontSize="12" fontWeight="bold">??? [Cut Off]</text>
          <path d="M140 70 L 190 70" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="240" cy="70" r="30" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="2" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <rect x="20" y="25" width="130" height="90" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <text x="35" y="75" fill="#34D399" fontSize="11" fontWeight="bold">Complete Memory</text>
          <path d="M160 70 L 200 70" stroke="#10B981" strokeWidth="3" />
          <circle cx="250" cy="70" r="32" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
          <text x="238" y="75" fill="#34D399" fontSize="14" fontWeight="bold">99%</text>
        </svg>
      ),
    }
  }

  // 7. COMPUTER VISION & IMAGE PERCEPTION
  if (matches(/\b(vision|cameras?|images?|visual|pixels?|detection|recognition|see|smart vision|draw)\b/)) {
    return {
      scenarioTitle: 'Computer Vision: Defect Detection in High Speed Assembly',
      situationText: 'An industrial sorting camera is missing microscopic surface fractures on manufacturing parts due to low optical contrast and blurry thresholding.',
      auraGreeting: 'The vision inspection pipeline is letting defective items pass! Let\'s inspect the pixel sensors and sharpen our edge detection filter.',
      exploreItems: [
        { id: 'cmos_sensor', name: 'CMOS Optical Sensor', detail: 'Resolution: 4K 120fps', clue: 'High frame rate captured, but pixel contrast is muted.', icon: Camera },
        { id: 'edge_filter', name: 'Sobel Edge Filter', detail: 'Status: Disabled', clue: 'Edge gradient filtering needed to outline fractures.', icon: Layers },
        { id: 'conf_thresh', name: 'Confidence Threshold', detail: 'Threshold: 40% (Permissive)', clue: 'Raises false positives; target is 88%+ precision.', icon: SlidersHorizontal },
        { id: 'bbox_tracker', name: 'Bounding Box Tracker', detail: 'Latency: 4ms', clue: 'Real-time spatial bounding box tracking active.', icon: Eye },
      ],
      solveTitle: 'Edge Filter & Confidence Calibration',
      solveInstruction: 'Raise Confidence Threshold to 85%+ and toggle Sobel Edge Detection.',
      solveSuccessMsg: 'Sharp edge boundaries mapped! Defective fractures spotted with 99.8% precision.',
      learnedPoints: [
        { title: 'Pixel Gradients & Convolutions', text: 'Vision models scan pixel clusters using convolution kernels to isolate edges.' },
        { title: 'Confidence Calibration', text: 'Balancing detection thresholds eliminates false alarms in critical systems.' },
        { title: 'Real-Time Automation', text: 'Processes high-speed camera streams instantaneously to maintain product quality.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const conf = state.conf || 40
        const edge = state.edge || false

        const handleConf = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, conf: val }
          setState(next)
          if (val >= 80 && edge && !isValid) onValid()
        }

        const toggleEdge = () => {
          gameAudio.playTap()
          const next = { ...state, edge: !edge }
          setState(next)
          if (conf >= 80 && !edge && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Detection Confidence Threshold:</span>
                <span className="font-mono text-indigo-600 font-black">{conf}% (Target: 85%+)</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={conf}
                onChange={handleConf}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Activate Sobel Edge Detection:</span>
              <button
                onClick={toggleEdge}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  edge ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {edge ? 'Edge Kernel On' : 'Raw Blur'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#1E293B" />
          <circle cx="160" cy="70" r="45" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
          <path d="M150 55 L 165 85" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="110" y="130" fill="#EF4444" fontSize="10" fontWeight="bold">Unfocused / Low Contrast</text>
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <circle cx="160" cy="70" r="45" fill="#1E293B" stroke="#10B981" strokeWidth="3" />
          <rect x="135" y="45" width="50" height="50" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M150 55 L 165 85" stroke="#FBBF24" strokeWidth="3" />
          <text x="105" y="130" fill="#34D399" fontSize="10" fontWeight="bold">High Precision Bounding Box</text>
        </svg>
      ),
    }
  }

  // 8. HEALTHCARE & MEDICAL AI
  if (matches(/\b(health|medic\w*|doctor|hospital|patient|diagnos\w*|scan|bio|vital)\b/)) {
    return {
      scenarioTitle: 'Medical Diagnostics: Critical X-Ray Anomaly Scan',
      situationText: 'A diagnostic radiology AI detected ambiguous lung opacity on a chest scan. The system requires fine-tuned sensitivity and physician verification before confirming treatment.',
      auraGreeting: 'A medical scan needs high-precision analysis! Let\'s inspect the vital signs and activate dual-doctor validation.',
      exploreItems: [
        { id: 'dicom_img', name: 'High-Res DICOM Scan', detail: 'Resolution: 16-Bit Gray', clue: 'Subtle density variations visible in lower lung quadrant.', icon: Activity },
        { id: 'anomaly_heat', name: 'Pathology Heatmap', detail: 'Confidence: 74%', clue: 'Localized inflammatory markers spotted.', icon: Eye },
        { id: 'vital_tele', name: 'Patient Vitals Monitor', detail: 'O2 Saturation: 94%', clue: 'Oxygen levels slightly below standard baseline.', icon: Stethoscope },
        { id: 'audit_log', name: 'Clinical Audit Trail', detail: 'Status: Recording', clue: 'All automated diagnostic hints logged for physician sign-off.', icon: Shield },
      ],
      solveTitle: 'Diagnostic Sensitivity & Clinical Sign-Off',
      solveInstruction: 'Calibrate Anomaly Sensitivity to 85%+ and toggle Dual-Doctor Clinical Confirmation.',
      solveSuccessMsg: 'High-confidence diagnostic report verified and sent to physician team!',
      learnedPoints: [
        { title: 'Human-in-the-Loop AI', text: 'Medical AI assists doctors by highlighting anomalies but leaves final decisions to human clinicians.' },
        { title: 'High-Resolution Analysis', text: 'Deep vision algorithms can detect microscopic tissue anomalies before symptoms worsen.' },
        { title: 'Privacy & Compliance', text: 'All healthcare AI systems must strictly protect patient identity and medical records.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const sens = state.sens || 30
        const verified = state.verified || false

        const handleSens = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, sens: val }
          setState(next)
          if (val >= 80 && verified && !isValid) onValid()
        }

        const toggleVerified = () => {
          gameAudio.playTap()
          const next = { ...state, verified: !verified }
          setState(next)
          if (sens >= 80 && !verified && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Radiology Anomaly Sensitivity:</span>
                <span className="font-mono text-indigo-600 font-black">{sens}% (Target: 85%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sens}
                onChange={handleSens}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Dual-Doctor Clinical Sign-Off:</span>
              <button
                onClick={toggleVerified}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  verified ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {verified ? 'Confirmed by Doctor' : 'Pending Review'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <path d="M120 40 Q 140 30 160 40 Q 180 30 200 40 L 200 100 Q 180 120 160 110 Q 140 120 120 100 Z" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
          <circle cx="175" cy="80" r="14" fill="#EF4444" fillOpacity="0.4" className="animate-pulse" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <path d="M120 40 Q 140 30 160 40 Q 180 30 200 40 L 200 100 Q 180 120 160 110 Q 140 120 120 100 Z" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <circle cx="175" cy="80" r="14" fill="#10B981" fillOpacity="0.3" stroke="#34D399" strokeWidth="2" />
          <rect x="230" y="45" width="70" height="50" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
          <text x="240" y="75" fill="#34D399" fontSize="10" fontWeight="bold">Verified</text>
        </svg>
      ),
    }
  }

  // 9. ROBOTICS & HELPER MACHINES
  if (matches(/\b(robots?|helpers?|machines that help|assists?|actuators?|motors?|hardware|vacuum|chores?|friend)\b/)) {
    return {
      scenarioTitle: 'Home Helper Robot: Living Room Navigation Challenge',
      situationText: 'A smart domestic helper robot encountered scattered toys in the hallway. It needs adjusted wheel velocity and proximity guardrails to steer around toys gently.',
      auraGreeting: 'Our helper robot is stuck near the toys! Let\'s calibrate its indoor speed and turn on collision guardrails so it can clean safely.',
      exploreItems: [
        { id: 'sonar_radar', name: 'Ultrasonic Sonar', detail: 'Range: 0.1m - 3.0m', clue: 'Detects plastic toy obstacles 30cm ahead.', icon: Radio },
        { id: 'drive_motor', name: 'Dual Drive Motors', detail: 'Speed: 8 km/h (Fast)', clue: 'Indoor speed is too high for crowded rooms.', icon: Sliders },
        { id: 'bump_bumper', name: 'Tactile Bumper Ring', detail: 'Status: Active', clue: 'Emergency cut-off switches primed upon contact.', icon: Shield },
        { id: 'vacuum_motor', name: 'Suction Intake Power', detail: 'Power: 2200 Pa', clue: 'Sufficient power to lift carpet dust without snagging.', icon: Zap },
      ],
      solveTitle: 'Speed Calibration & Proximity Guardrails',
      solveInstruction: 'Tune Helper Speed to safe 4 km/h and turn on 360° Collision Guardrails.',
      solveSuccessMsg: 'Safe indoor navigation locked! Robot helper gliding smoothly.',
      learnedPoints: [
        { title: 'Sensory Obstacle Avoidance', text: 'Robots combine sonar, cameras, and bumper sensors to avoid household items.' },
        { title: 'Speed Adaptation', text: 'AI dynamically lowers velocity in tight living areas to prevent accidents.' },
        { title: 'Autonomous Path Planning', text: 'Calculates the fastest cleaning route while keeping humans and pets safe.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const speed = state.speed || 8
        const guard = state.guard || false

        const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, speed: val }
          setState(next)
          if (val <= 4 && val >= 2 && guard && !isValid) onValid()
        }

        const toggleGuard = () => {
          gameAudio.playTap()
          const next = { ...state, guard: !guard }
          setState(next)
          if (speed <= 4 && speed >= 2 && !guard && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Robot Indoor Speed:</span>
                <span className="font-mono text-indigo-600 font-black">{speed} km/h (Target: 3-4 km/h)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={handleSpeed}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">360° Collision Guardrails:</span>
              <button
                onClick={toggleGuard}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  guard ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {guard ? 'Guardrails Active' : 'Off (Risky)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#F8FAFC" />
          <rect x="20" y="20" width="280" height="100" rx="10" fill="#E2E8F0" />
          <circle cx="90" cy="70" r="28" fill="#6366F1" />
          <circle cx="90" cy="70" r="14" fill="#FFFFFF" />
          <rect x="180" y="60" width="20" height="20" rx="3" fill="#EF4444" className="animate-bounce" />
          <rect x="210" y="70" width="16" height="16" rx="3" fill="#F59E0B" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#F0FDF4" />
          <rect x="20" y="20" width="280" height="100" rx="10" fill="#DCFCE7" />
          <circle cx="130" cy="70" r="28" fill="#10B981" />
          <circle cx="130" cy="70" r="40" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M70 70 Q 100 40 130 70 T 260 70" stroke="#059669" strokeWidth="3" strokeDasharray="6 6" fill="none" />
        </svg>
      ),
    }
  }

  // 10. GENERATIVE AI & CREATIVE TOOLS
  if (matches(/\b(generat\w*|creative|arts?|story|stories|design|imagine|music|diffusion|synthe\w*)\b/)) {
    return {
      scenarioTitle: 'Generative Studio: Prompt Alignment & Style Drift',
      situationText: 'A generative art engine produced an image with distorted anatomy and surreal background artifacts due to an ambiguous prompt and missing negative token constraints.',
      auraGreeting: 'The AI generated some surreal distortions! Let\'s inspect the prompt tokens, add negative constraints, and refine the artistic fidelity.',
      exploreItems: [
        { id: 'latent_space', name: 'Latent Diffusion Buffer', detail: '50 Denoising Steps', clue: 'Base geometry is formed; fine details need sharpening.', icon: Palette },
        { id: 'text_encoder', name: 'CLIP Prompt Encoder', detail: 'Alignment Score: 62%', clue: 'Vague adjectives causing stylistic drift.', icon: Layers },
        { id: 'negative_filter', name: 'Negative Prompt Filter', detail: 'Status: Disabled', clue: 'Excludes blurry artifacts, bad anatomy, and noise.', icon: Shield },
        { id: 'seed_control', name: 'Deterministic Seed', detail: 'Seed: 4829103', clue: 'Fixed seed ensures reproducible creative experiments.', icon: Zap },
      ],
      solveTitle: 'Prompt Fidelity & Negative Filtering',
      solveInstruction: 'Increase Prompt Specificity to 85%+ and engage the Negative Artifact Filter.',
      solveSuccessMsg: 'High-fidelity artwork synthesized with crystal clarity and balanced style!',
      learnedPoints: [
        { title: 'Prompt Specificity', text: 'Descriptive, well-structured prompts guide diffusion models to accurate visual compositions.' },
        { title: 'Negative Prompting', text: 'Explicitly filtering unwanted traits removes distortions and background clutter.' },
        { title: 'Latent Denoising', text: 'Diffusion models turn random noise into clear imagery across multiple refinement steps.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const spec = state.spec || 30
        const neg = state.neg || false

        const handleSpec = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, spec: val }
          setState(next)
          if (val >= 80 && neg && !isValid) onValid()
        }

        const toggleNeg = () => {
          gameAudio.playTap()
          const next = { ...state, neg: !neg }
          setState(next)
          if (spec >= 80 && !neg && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Prompt Specificity Score:</span>
                <span className="font-mono text-indigo-600 font-black">{spec}% (Target: 85%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={spec}
                onChange={handleSpec}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Engage Negative Artifact Filter:</span>
              <button
                onClick={toggleNeg}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  neg ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {neg ? 'Filter Active' : 'Off (Distorted)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#18181B" />
          <path d="M40 100 Q 90 20 160 80 T 280 40" stroke="#A855F7" strokeWidth="4" fill="none" opacity="0.6" />
          <circle cx="160" cy="70" r="30" fill="#EF4444" opacity="0.4" className="animate-ping" />
          <text x="100" y="130" fill="#EF4444" fontSize="10" fontWeight="bold">Artifacts & Distorted Geometry</text>
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#09090B" />
          <circle cx="160" cy="70" r="40" fill="#8B5CF6" />
          <path d="M120 70 Q 160 30 200 70 Q 160 110 120 70 Z" fill="#F43F5E" opacity="0.8" />
          <circle cx="160" cy="70" r="16" fill="#FBBF24" />
          <text x="105" y="130" fill="#34D399" fontSize="10" fontWeight="bold">Clean High-Definition Composition</text>
        </svg>
      ),
    }
  }

  // 11. ETHICS, BIAS & FAIRNESS IN AI
  if (matches(/\b(ethic\w*|bias\w*|fair\w*|right or wrong|responsible|transpar\w*|accountab\w*|justice)\b/)) {
    return {
      scenarioTitle: 'AI Fairness Audit: Loan Approval Demographic Bias',
      situationText: 'An automated banking credit approval system approved loans with a 72% bias toward urban zip codes while rejecting equally qualified rural applicants.',
      auraGreeting: 'The algorithm has developed demographic bias! Let\'s inspect the feature weighting and balance our fairness audit constraints.',
      exploreItems: [
        { id: 'training_demog', name: 'Training Sample Distribution', detail: '80% Urban / 20% Rural', clue: 'Severe geographic imbalance in historical loan training records.', icon: Scale },
        { id: 'proxy_var', name: 'Proxy Zip Code Feature', detail: 'Weight: 45% (Excessive)', clue: 'Zip codes inadvertently act as a discriminatory proxy variable.', icon: AlertTriangle },
        { id: 'fairness_metric', name: 'Demographic Parity', detail: 'Disparity: 38%', clue: 'Fails equal opportunity thresholds across population groups.', icon: Activity },
        { id: 'xai_explainer', name: 'Explainable AI (SHAP)', detail: 'Status: Armed', clue: 'Reveals which exact features influenced every individual decision.', icon: Eye },
      ],
      solveTitle: 'Feature Re-weighting & Fairness Audit',
      solveInstruction: 'Re-weight Demographic Parity to 90%+ and engage Fair Opportunity Auditing.',
      solveSuccessMsg: 'Demographic bias eliminated! Equal approval rates verified for all qualified applicants.',
      learnedPoints: [
        { title: 'Algorithmic Fairness', text: 'AI models must treat all individuals fairly regardless of demographic background.' },
        { title: 'Hidden Proxy Features', text: 'Seemingly neutral data like postal codes can conceal discriminatory patterns.' },
        { title: 'Explainability & Auditing', text: 'Transparent AI explanations help engineers detect and eliminate biases before deployment.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const parity = state.parity || 40
        const audit = state.audit || false

        const handleParity = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, parity: val }
          setState(next)
          if (val >= 85 && audit && !isValid) onValid()
        }

        const toggleAudit = () => {
          gameAudio.playTap()
          const next = { ...state, audit: !audit }
          setState(next)
          if (parity >= 85 && !audit && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Demographic Parity Constraint:</span>
                <span className="font-mono text-indigo-600 font-black">{parity}% (Target: 90%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={parity}
                onChange={handleParity}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Engage Fair Opportunity Auditing:</span>
              <button
                onClick={toggleAudit}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  audit ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {audit ? 'Audit Active' : 'Off (Biased)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <line x1="160" y1="30" x2="160" y2="110" stroke="#64748B" strokeWidth="4" />
          <line x1="80" y1="50" x2="240" y2="90" stroke="#EF4444" strokeWidth="4" />
          <circle cx="80" cy="50" r="14" fill="#38BDF8" />
          <circle cx="240" cy="90" r="24" fill="#EF4444" />
          <text x="100" y="130" fill="#EF4444" fontSize="10" fontWeight="bold">Unbalanced Decision Scale</text>
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <line x1="160" y1="30" x2="160" y2="110" stroke="#64748B" strokeWidth="4" />
          <line x1="80" y1="70" x2="240" y2="70" stroke="#10B981" strokeWidth="4" />
          <circle cx="80" cy="70" r="18" fill="#10B981" />
          <circle cx="240" cy="70" r="18" fill="#10B981" />
          <text x="110" y="130" fill="#34D399" fontSize="10" fontWeight="bold">Equal Opportunity Balanced</text>
        </svg>
      ),
    }
  }

  // 12. SMART CITIES & IOT NETWORKS
  if (matches(/\b(smart cit\w*|energy|grids?|iot|urban|power|utilit\w*|meters?)\b/)) {
    return {
      scenarioTitle: 'Smart City Grid: Substation Peak Demand Surge',
      situationText: 'A metropolitan district experienced sudden evening electrical spikes from electric vehicle chargers, threatening localized substation transformer brownouts.',
      auraGreeting: 'Electrical demand is surging across the smart grid! Let\'s explore the power distribution nodes and dispatch solar battery reserves.',
      exploreItems: [
        { id: 'grid_load', name: 'Transformer Load Meter', detail: 'Load: 96% (Critical)', clue: 'Brownout risk imminent within 15 minutes.', icon: Zap },
        { id: 'ev_chargers', name: 'Smart EV Charger Bank', detail: 'Consumption: 45 MW', clue: 'Can be scheduled into staggered micro-charging cycles.', icon: Building2 },
        { id: 'bess_storage', name: 'Battery Energy Reserve', detail: 'Charge: 100% Ready', clue: '120 MWh battery storage ready for peak shaving.', icon: Layers },
        { id: 'solar_tele', name: 'Rooftop Solar Nodes', detail: 'Output: 28 MW', clue: 'Active clean power feed flowing into regional microgrid.', icon: Sun },
      ],
      solveTitle: 'Load Balancing & Battery Reserve Dispatch',
      solveInstruction: 'Dispatch Battery Reserve Storage to 80%+ and enable Dynamic EV Staggering.',
      solveSuccessMsg: 'Peak surge shaved! Substation load normalized to 68% optimal capacity.',
      learnedPoints: [
        { title: 'Peak Shaving Automation', text: 'AI releases stored clean energy precisely when city demand reaches critical peaks.' },
        { title: 'Smart IoT Load Balancing', text: 'Micro-adjusts high-power appliances without interrupting user convenience.' },
        { title: 'Resilient Infrastructure', text: 'Prevents blackouts and maximizes renewable energy utilization across urban grids.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const dispatch = state.dispatch || 20
        const stagger = state.stagger || false

        const handleDispatch = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, dispatch: val }
          setState(next)
          if (val >= 75 && stagger && !isValid) onValid()
        }

        const toggleStagger = () => {
          gameAudio.playTap()
          const next = { ...state, stagger: !stagger }
          setState(next)
          if (dispatch >= 75 && !stagger && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Battery Reserve Energy Dispatch:</span>
                <span className="font-mono text-indigo-600 font-black">{dispatch}% (Target: 80%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={dispatch}
                onChange={handleDispatch}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Enable Dynamic EV Staggering:</span>
              <button
                onClick={toggleStagger}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  stagger ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {stagger ? 'Stagger Active' : 'Off (Unregulated)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <rect x="40" y="50" width="40" height="70" fill="#1E293B" stroke="#64748B" />
          <rect x="90" y="30" width="50" height="90" fill="#1E293B" stroke="#64748B" />
          <rect x="150" y="60" width="40" height="60" fill="#1E293B" stroke="#64748B" />
          <circle cx="250" cy="65" r="26" fill="#EF4444" fillOpacity="0.4" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
          <text x="235" y="70" fill="#FFFFFF" fontSize="11" fontWeight="bold">96%</text>
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <rect x="40" y="50" width="40" height="70" fill="#064E3B" stroke="#10B981" />
          <rect x="90" y="30" width="50" height="90" fill="#064E3B" stroke="#10B981" />
          <rect x="150" y="60" width="40" height="60" fill="#064E3B" stroke="#10B981" />
          <circle cx="250" cy="65" r="26" fill="#059669" stroke="#34D399" strokeWidth="2" />
          <text x="235" y="70" fill="#FFFFFF" fontSize="11" fontWeight="bold">68%</text>
        </svg>
      ),
    }
  }

  // 13. AI CAREERS & FUTURE SKILLS
  if (matches(/\b(careers?|jobs?|grow up|talent|workplace|future|collaborat\w*)\b/)) {
    return {
      scenarioTitle: 'Future Workforce Studio: Human + AI Collaborative Team',
      situationText: 'An architectural design firm is assembling a project team for sustainable skyscrapers, aiming to combine human creative vision with automated structural simulations.',
      auraGreeting: 'Let\'s assemble the ideal Human + AI team! We will balance human intuition with fast AI simulation tools.',
      exploreItems: [
        { id: 'architect_human', name: 'Human Design Lead', detail: 'Focus: Creative Aesthetics', clue: 'Provides empathy, cultural context, and artistic originality.', icon: Briefcase },
        { id: 'physics_ai', name: 'Structural Simulation AI', detail: 'Speed: 10,000 Stress Tests/sec', clue: 'Calculates earthquake resilience and wind aerodynamics instantaneously.', icon: Cpu },
        { id: 'materials_bot', name: 'Eco-Materials Advisor', detail: 'Database: 50,000 Composites', clue: 'Suggests carbon-negative timber and recycled steel options.', icon: Layers },
        { id: 'collab_bridge', name: 'Team Communication Bridge', detail: 'Status: Connected', clue: 'Translates architect sketches into 3D CAD models in real time.', icon: CheckCircle2 },
      ],
      solveTitle: 'Team Synergy & Task Allocation',
      solveInstruction: 'Raise Synergy Alignment to 85%+ and toggle Automated Safety Verification.',
      solveSuccessMsg: 'Optimal collaborative workflow unlocked! Human creativity amplified by AI speed.',
      learnedPoints: [
        { title: 'Human-AI Collaboration', text: 'The most productive future careers leverage AI as a tireless co-pilot for human ingenuity.' },
        { title: 'Creativity & Empathy', text: 'Human skills like emotional intelligence, ethical judgment, and vision remain irreplaceable.' },
        { title: 'Continuous Upskilling', text: 'Learning to formulate questions and orchestrate AI tools is a superpower in every field.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const align = state.align || 35
        const verify = state.verify || false

        const handleAlign = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, align: val }
          setState(next)
          if (val >= 80 && verify && !isValid) onValid()
        }

        const toggleVerify = () => {
          gameAudio.playTap()
          const next = { ...state, verify: !verify }
          setState(next)
          if (align >= 80 && !verify && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Team Synergy Alignment:</span>
                <span className="font-mono text-indigo-600 font-black">{align}% (Target: 85%+)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={align}
                onChange={handleAlign}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Automated Structural Verification:</span>
              <button
                onClick={toggleVerify}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  verify ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {verify ? 'Verified by AI' : 'Pending'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <circle cx="100" cy="70" r="25" fill="#6366F1" />
          <circle cx="220" cy="70" r="25" fill="#64748B" />
          <line x1="130" y1="70" x2="190" y2="70" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <circle cx="100" cy="70" r="25" fill="#818CF8" />
          <circle cx="220" cy="70" r="25" fill="#34D399" />
          <line x1="125" y1="70" x2="195" y2="70" stroke="#10B981" strokeWidth="4" />
          <circle cx="160" cy="70" r="12" fill="#FBBF24" />
        </svg>
      ),
    }
  }

  // 14. LOGIC, ALGORITHMS & SEARCH
  if (matches(/\b(logic|orders?|algorithms?|search|trees?|paths?|rules?|sort\w*|decisions?)\b/)) {
    return {
      scenarioTitle: 'Search Optimization: Maze Pathfinding Tree Bottleneck',
      situationText: 'An autonomous warehouse logistics agent is stalling at intersections because unpruned breadth-first search is exploring thousands of dead ends simultaneously.',
      auraGreeting: 'The search algorithm is checking too many dead ends! Let\'s inspect the decision tree and turn on A* heuristic path pruning.',
      exploreItems: [
        { id: 'frontier_queue', name: 'Search Frontier Queue', detail: 'Nodes: 12,400 (High)', clue: 'Memory buffer overflowing with redundant paths.', icon: GitBranch },
        { id: 'heuristic_fn', name: 'Manhattan Heuristic', detail: 'Formula: |x1-x2| + |y1-y2|', clue: 'Guides exploration directly toward the target goal.', icon: Compass },
        { id: 'pruning_depth', name: 'Dead-End Pruner', detail: 'Status: Disabled', clue: 'Branch-and-bound pruning eliminates unproductive paths.', icon: Layers },
        { id: 'goal_state', name: 'Target Destination Node', detail: 'Distance: 14 Steps', clue: 'Optimal shortest path reachable in sub-10ms with heuristics.', icon: CheckCircle2 },
      ],
      solveTitle: 'Heuristic Pruner & A* Path Optimizer',
      solveInstruction: 'Tune Search Pruning Depth to 8+ and enable A* Manhattan Heuristics.',
      solveSuccessMsg: 'Optimal 14-step path resolved in 4ms! Redundant nodes pruned.',
      learnedPoints: [
        { title: 'Heuristic Search (A*)', text: 'Using intelligent guesses about distance allows AI to find the shortest path without checking every route.' },
        { title: 'Branch Pruning', text: 'Cutting off dead ends early saves exponential amounts of computer memory and processing power.' },
        { title: 'Deterministic Logic', text: 'Structured rules and graphs allow algorithms to make provably optimal choices in complex environments.' },
      ],
      renderSolveTool: (state, setState, onValid, isValid) => {
        const depth = state.depth || 2
        const astar = state.astar || false

        const handleDepth = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseInt(e.target.value, 10)
          const next = { ...state, depth: val }
          setState(next)
          if (val >= 8 && astar && !isValid) onValid()
        }

        const toggleAstar = () => {
          gameAudio.playTap()
          const next = { ...state, astar: !astar }
          setState(next)
          if (depth >= 8 && !astar && !isValid) onValid()
        }

        return (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                <span>Branch Pruning Depth:</span>
                <span className="font-mono text-indigo-600 font-black">Level {depth} (Target: Level 8+)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={depth}
                onChange={handleDepth}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-800">Enable A* Manhattan Heuristics:</span>
              <button
                onClick={toggleAstar}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  astar ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {astar ? 'A* Active (Fast)' : 'Brute Force (Slow)'}
              </button>
            </div>
          </div>
        )
      },
      renderScenarioVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0F172A" />
          <circle cx="50" cy="70" r="10" fill="#6366F1" />
          <circle cx="120" cy="40" r="8" fill="#EF4444" />
          <circle cx="120" cy="70" r="8" fill="#EF4444" />
          <circle cx="120" cy="100" r="8" fill="#EF4444" />
          <line x1="50" y1="70" x2="120" y2="40" stroke="#64748B" strokeWidth="1.5" />
          <line x1="50" y1="70" x2="120" y2="70" stroke="#64748B" strokeWidth="1.5" />
          <line x1="50" y1="70" x2="120" y2="100" stroke="#64748B" strokeWidth="1.5" />
          <text x="160" y="75" fill="#EF4444" fontSize="10" fontWeight="bold">12,400 Unpruned Branches</text>
        </svg>
      ),
      renderSolvedVisual: () => (
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          <rect width="320" height="140" fill="#0B0F19" />
          <circle cx="50" cy="70" r="10" fill="#38BDF8" />
          <circle cx="130" cy="70" r="10" fill="#34D399" />
          <circle cx="210" cy="70" r="10" fill="#34D399" />
          <circle cx="270" cy="70" r="12" fill="#10B981" />
          <line x1="60" y1="70" x2="120" y2="70" stroke="#10B981" strokeWidth="3" />
          <line x1="140" y1="70" x2="200" y2="70" stroke="#10B981" strokeWidth="3" />
          <line x1="220" y1="70" x2="258" y2="70" stroke="#10B981" strokeWidth="3" />
          <text x="180" y="115" fill="#34D399" fontSize="10" fontWeight="bold">Direct Optimal Route</text>
        </svg>
      ),
    }
  }

  // 15. DEFAULT / UNIVERSAL TOPIC SCENARIO RESOLVER
  return {
    scenarioTitle: `Practical Challenge: ${topicTitle}`,
    situationText: `A real-world ${topicTitle} system is operating under uncalibrated parameters and needs intelligent alignment to reach full operational accuracy.`,
    auraGreeting: `Welcome to our ${topicTitle} practical challenge! Let's inspect the system clues and calibrate our AI tools to complete the mission.`,
    exploreItems: [
      { id: 'item_1', name: 'Primary Telemetry Node', detail: 'Reading: 38% (Sub-optimal)', clue: 'Operating baseline is unstable.', icon: Activity },
      { id: 'item_2', name: 'Feature Extractor Buffer', detail: 'Throughput: 42%', clue: 'Buffer needs parameter tuning to eliminate lag.', icon: Layers },
      { id: 'item_3', name: 'Safety Guardrail Monitor', detail: 'Status: Armed', clue: 'Safe operating boundaries verified.', icon: Shield },
      { id: 'item_4', name: 'Output Verification Stream', detail: 'Accuracy: 45%', clue: 'Requires calibration to hit 95%+ target.', icon: CheckCircle2 },
    ],
    solveTitle: `${topicTitle} Calibration Station`,
    solveInstruction: `Calibrate the ${topicTitle} parameter slider to 80%+ and lock the optimization switch.`,
    solveSuccessMsg: `Optimal parameters locked! ${topicTitle} system operating at 99.2% precision.`,
    learnedPoints: [
      { title: 'Accurate Sensing', text: `Gathers authentic clues and telemetry before executing ${topicTitle} tasks.` },
      { title: 'Pattern Calibration', text: 'Tunes operating parameters to minimize error and maximize output quality.' },
      { title: 'Safe Automation', text: 'Enforces human-in-the-loop safeguards to ensure dependable performance.' },
    ],
    renderSolveTool: (state, setState, onValid, isValid) => {
      const val = state.val || 25
      const locked = state.locked || false

      const handleVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value, 10)
        const next = { ...state, val: num }
        setState(next)
        if (num >= 80 && locked && !isValid) onValid()
      }

      const toggleLock = () => {
        gameAudio.playTap()
        const next = { ...state, locked: !locked }
        setState(next)
        if (val >= 80 && !locked && !isValid) onValid()
      }

      return (
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
              <span>Optimization Calibration:</span>
              <span className="font-mono text-indigo-600 font-black">{val}% (Target: 80%+)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={val}
              onChange={handleVal}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
            <span className="text-[10px] font-bold text-slate-800">Lock Optimization Matrix:</span>
            <button
              onClick={toggleLock}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                locked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {locked ? 'Locked (Optimal)' : 'Pending'}
            </button>
          </div>
        </div>
      )
    },
    renderScenarioVisual: () => (
      <svg viewBox="0 0 320 140" className="w-full h-full select-none">
        <rect width="320" height="140" fill="#0F172A" />
        <circle cx="160" cy="70" r="35" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
        <rect x="140" y="55" width="40" height="30" rx="6" fill="#4F46E5" />
      </svg>
    ),
    renderSolvedVisual: () => (
      <svg viewBox="0 0 320 140" className="w-full h-full select-none">
        <rect width="320" height="140" fill="#064E3B" />
        <circle cx="160" cy="70" r="40" fill="#059669" stroke="#34D399" strokeWidth="3" />
        <rect x="140" y="55" width="40" height="30" rx="6" fill="#10B981" />
      </svg>
    ),
  }
}

function renderTopicLessonBackground(topicTitle: string = '', chapterTitle: string = '') {
  const t = (topicTitle + ' ' + chapterTitle).toLowerCase()

  if (t.includes('farm') || t.includes('crop') || t.includes('soil')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-emerald-300/15 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-lime-300/15 blur-2xl animate-pulse" />
      </div>
    )
  }

  if (t.includes('road') || t.includes('traffic') || t.includes('move') || t.includes('car')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-blue-300/15 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-amber-300/15 blur-2xl animate-pulse" />
      </div>
    )
  }

  if (t.includes('safety') || t.includes('shield') || t.includes('protect') || t.includes('care') || t.includes('privacy')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-indigo-300/15 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-teal-300/15 blur-2xl animate-pulse" />
      </div>
    )
  }

  if (t.includes('neural') || t.includes('deep') || t.includes('synapse')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-purple-300/15 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-pink-300/15 blur-2xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-indigo-300/15 blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-purple-300/15 blur-2xl animate-pulse" />
    </div>
  )
}

export const Lesson2ScenarioExperience: React.FC<WorldExperienceProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  canonicalSection,
  isCompleted,
  onComplete,
  onJumpToSection,
}) => {
  const [screen, setScreen] = useState<Lesson2Screen>(1)
  const [inspectedItems, setInspectedItems] = useState<string[]>([])
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [solveState, setSolveState] = useState<any>({})
  const [isSolved, setIsSolved] = useState(false)

  const scenario = getLesson2ScenarioData(topicTitle, chapterTitle, gradeKey)

  const handleInspectItem = (id: string) => {
    gameAudio.playTap()
    setActiveItem(id)
    if (!inspectedItems.includes(id)) {
      setInspectedItems(prev => [...prev, id])
    }
  }

  const handleSolveValid = () => {
    gameAudio.playSuccess()
    setIsSolved(true)
  }

  const handleNextScreen = () => {
    gameAudio.playTap()
    if (screen === 1) setScreen(2)
    else if (screen === 2) setScreen(3)
    else if (screen === 3) setScreen(4)
    else {
      // Screen 4 Finish -> advance to Section 4 (Worksheet)
      gameAudio.playVictory()
      gamification.launchConfetti()
      if (!isCompleted) {
        onComplete()
      }
      if (onJumpToSection) {
        onJumpToSection(3) // Advance to Section 4: Worksheet
      }
    }
  }

  const handlePrevScreen = () => {
    gameAudio.playTap()
    if (screen === 4) setScreen(3)
    else if (screen === 3) setScreen(2)
    else if (screen === 2) setScreen(1)
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between h-full max-h-full px-2 sm:px-4 py-1.5 sm:py-2 overflow-hidden select-none animate-in fade-in duration-200">
      {/* Top HUD Stepper Capsule */}
      <div className="shrink-0 mb-1 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl p-2 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="p-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
            <Compass size={13} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-indigo-600">
                Lesson 2 · Step {screen} of 4
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">·</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 truncate max-w-[130px] sm:max-w-xs">
                {screen === 1 ? 'Scenario' : screen === 2 ? 'Explore Clues' : screen === 3 ? 'Solve Challenge' : 'What You Learned'}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black text-slate-900 truncate">
              {topicTitle}
            </h2>
          </div>
        </div>

        {/* 4 Step Progress Pills */}
        <div className="flex items-center gap-1 shrink-0">
          {[1, 2, 3, 4].map((sNum) => (
            <button
              key={sNum}
              onClick={() => setScreen(sNum as Lesson2Screen)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                screen === sNum
                  ? 'w-5 bg-indigo-600 shadow-xs'
                  : screen > sNum
                  ? 'w-2.5 bg-emerald-500'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Step ${sNum}`}
            />
          ))}
        </div>
      </div>

      {/* Main Single-Viewport Dynamic Card (No Scrolling) */}
      <div className="relative flex-1 flex flex-col justify-between min-h-0 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-2.5 sm:p-3.5 shadow-2xs overflow-hidden">
        {renderTopicLessonBackground(topicTitle, chapterTitle)}
        {/* ─────────────────────────────────────────────────────────────────
            SCREEN 1: TOPIC-SPECIFIC REAL-WORLD SCENARIO
            ───────────────────────────────────────────────────────────────── */}
        {screen === 1 && (
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2 animate-in fade-in slide-in-from-right-3 duration-200">
            {/* Anime AI Guide Introduction */}
            <div className="shrink-0 p-2 sm:p-2.5 bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-blue-50/90 border border-indigo-200/80 rounded-2xl shadow-2xs">
              <AuraGuideAvatar
                mood="explaining"
                speakerName="Aura (AI Guide)"
                size="sm"
                message={scenario.auraGreeting}
              />
            </div>

            {/* Large Prominent Topic-Specific Scene SVG */}
            <div className="w-full shrink-0 h-36 sm:h-44 rounded-2xl overflow-hidden border border-indigo-100 shadow-md bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 flex items-center justify-center p-2 relative">
              <TopicLessonIllustration
                topic={topicTitle}
                chapterTitle={chapterTitle}
                gradeKey={gradeKey}
                chapterNum={chapterNum}
                size={280}
                className="w-full h-full max-h-40 object-contain drop-shadow-md select-none transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Scenario Situation Card */}
            <div className="flex-1 flex flex-col justify-center bg-indigo-50/80 border border-indigo-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-1 shrink-0">
                <Sparkles size={14} className="text-indigo-600 shrink-0" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-950">
                  {scenario.scenarioTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug sm:leading-relaxed">
                {scenario.situationText}
              </p>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            SCREEN 2: INTERACTIVE EXPLORATION (3-4 OBJECTS)
            ───────────────────────────────────────────────────────────────── */}
        {screen === 2 && (
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1.5 animate-in fade-in slide-in-from-right-3 duration-200">
            <div className="shrink-0 flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-black text-slate-800 flex items-center gap-1">
                <Radio size={13} className="text-indigo-600 animate-pulse" />
                Tap Objects to Inspect Clues:
              </span>
              <span className="text-[9px] font-bold text-slate-500">
                {inspectedItems.length}/{scenario.exploreItems.length} Explored
              </span>
            </div>

            {/* 3-4 Interactive Objects Grid */}
            <div className="grid grid-cols-2 gap-1.5 shrink-0">
              {scenario.exploreItems.map((item) => {
                const isSelected = activeItem === item.id
                const isDiscovered = inspectedItems.includes(item.id)

                return (
                  <button
                    key={item.id}
                    onClick={() => handleInspectItem(item.id)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                        : isDiscovered
                        ? 'bg-slate-50 border-slate-300 opacity-90'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="p-1 rounded-lg bg-indigo-100 text-indigo-700 shrink-0">
                      <item.icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-black text-slate-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 truncate mt-0.5">
                        {isDiscovered ? item.detail : 'Tap to scan'}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Clue Display Card */}
            <div className="flex-1 flex flex-col justify-center bg-slate-50/90 border border-slate-200 rounded-2xl p-2.5 sm:p-3">
              <div className="flex items-center gap-1.5 mb-1 shrink-0">
                <Lightbulb size={14} className="text-amber-600 shrink-0" />
                <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                  {activeItem ? scenario.exploreItems.find(i => i.id === activeItem)?.name : 'Investigation Radar'}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-snug">
                {activeItem
                  ? scenario.exploreItems.find(i => i.id === activeItem)?.clue
                  : 'Select any object above to scan sensor telemetry, uncover system parameters, and discover critical clues.'}
              </p>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            SCREEN 3: HANDS-ON SOLVE CHALLENGE
            ───────────────────────────────────────────────────────────────── */}
        {screen === 3 && (
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1.5 animate-in fade-in slide-in-from-right-3 duration-200">
            <div className="shrink-0 mb-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                  <Sliders size={13} className="text-indigo-600" />
                  {scenario.solveTitle}
                </span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isSolved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  {isSolved ? 'Solved' : 'In Progress'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
                {scenario.solveInstruction}
              </p>
            </div>

            {/* Environmental Visual Reaction */}
            <div className="w-full shrink-0 h-24 sm:h-28 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative">
              {isSolved ? scenario.renderSolvedVisual() : scenario.renderScenarioVisual()}
            </div>

            {/* Interactive Solve Tool */}
            <div className="flex-1 flex flex-col justify-center min-h-0 bg-slate-50/80 rounded-xl p-2 sm:p-2.5 border border-slate-200">
              {scenario.renderSolveTool(solveState, setSolveState, handleSolveValid, isSolved)}
            </div>

            {/* Solved Validation Status */}
            <div className="shrink-0">
              {isSolved ? (
                <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>{scenario.solveSuccessMsg}</span>
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold text-center">
                  Adjust the controls above to resolve the scenario challenge.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            SCREEN 4: WHAT YOU LEARNED (KEY TAKEAWAYS)
            ───────────────────────────────────────────────────────────────── */}
        {screen === 4 && (
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2 animate-in fade-in slide-in-from-right-3 duration-200">
            {/* Aura Conclusion Avatar */}
            <div className="shrink-0 p-2 sm:p-2.5 bg-gradient-to-r from-emerald-50/90 via-teal-50/90 to-blue-50/90 border border-emerald-200/80 rounded-2xl shadow-2xs">
              <AuraGuideAvatar
                mood="celebrating"
                speakerName="Aura (AI Guide)"
                size="sm"
                message={`Mission accomplished! You diagnosed the ${topicTitle} scenario and successfully restored optimal operation.`}
              />
            </div>

            {/* Key Takeaways Card */}
            <div className="flex-1 flex flex-col justify-center bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 sm:p-4">
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 mb-2 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-600" /> What You Learned:
              </h4>
              <div className="space-y-1.5">
                {scenario.learnedPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] sm:text-[11px] text-emerald-900 font-medium leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span><strong>{pt.title}:</strong> {pt.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            BOTTOM ACTION NAVIGATION
            ───────────────────────────────────────────────────────────────── */}
        <div className="pt-2 flex items-center justify-between gap-2 shrink-0 border-t border-slate-100 mt-1">
          {screen > 1 ? (
            <button
              type="button"
              onClick={handlePrevScreen}
              className="py-2 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 px-1">
              Step 1 of 4
            </div>
          )}

          <button
            type="button"
            onClick={handleNextScreen}
            disabled={(screen === 2 && inspectedItems.length < 2) || (screen === 3 && !isSolved)}
            className={`py-2.5 px-4 sm:px-6 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] ml-auto ${
              (screen === 2 && inspectedItems.length < 2) || (screen === 3 && !isSolved)
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : screen === 4
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white'
            }`}
          >
            <span>
              {screen === 1
                ? 'Next: Explore Clues'
                : screen === 2
                ? (inspectedItems.length >= 2 ? 'Next: Solve Challenge' : 'Inspect 2+ Objects')
                : screen === 3
                ? (isSolved ? 'Next: What You Learned' : 'Solve to Continue')
                : 'Complete Lesson 2 & Continue'}
            </span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lesson2ScenarioExperience
