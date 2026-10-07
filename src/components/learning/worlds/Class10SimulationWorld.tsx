import React, { useState } from 'react'
import {
  Activity, Play, CheckCircle2, ChevronRight, Cpu, Radio,
  Sparkles, Award, ShieldAlert, Sliders, Layers, BarChart2,
  ArrowRight, Shield, Check, Zap, RotateCcw, AlertTriangle,
  Sun, Moon, Thermometer, User, Compass, Terminal, Lock, RefreshCw, FileText,
  Gauge, ShieldCheck, Trophy, Users, Eye, Navigation
} from 'lucide-react'
import type { WorldExperienceProps } from './types'
import { ThreeStageMasteryQuiz } from '../ThreeStageMasteryQuiz'
import {
  UniversalLessonGameEngine,
  MatchPairStation,
  ClassificationSorter,
  SequenceBuilder,
  InteractiveSliderTuner,
  VisualInspectionScanner,
  CircuitWireStation,
  BugRepairStation,
  DataCollectorGrid,
  CodeBlockAssembler
} from '../primitives/LevelEnginePrimitives'

// =============================================================================
// CLASS 10 SIMULATION WORLD DISPATCHER (AUTONOMOUS TELEMETRY SIMULATOR)
// Unique Theme: Deep Space Cockpit HUD · Trajectory Vectors · Hyperparameter Flight
// =============================================================================

export const Class10SimulationWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class10Chapter2TelemetryWorld {...props} />
    case 3:
      return <Class10Chapter3FailoverWorld {...props} />
    case 4:
      return <Class10Chapter4ReinforcementWorld {...props} />
    case 5:
      return <Class10Chapter5MultiAgentWorld {...props} />
    case 6:
      return <Class10Chapter6FlightEthicsWorld {...props} />
    default:
      return <Class10Chapter1FlightSimWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: AUTONOMOUS TELEMETRY & FLIGHT TRAJECTORY SIMULATION
// =============================================================================

function Class10Chapter1FlightSimWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C10Ch1S2Pipeline {...props} />
  if (sectionIdx === 2) return <C10Ch1S3Failover {...props} />
  if (sectionIdx === 3) return <C10Ch1S4Performance {...props} />
  if (sectionIdx === 4) return <C10Ch1S5Trainer {...props} />
  if (sectionIdx === 5) return <C10Ch1S6MultiAgent {...props} />
  if (sectionIdx === 6) return <C10Ch1S7Capstone {...props} />
  return <C10Ch1S2Pipeline {...props} />
}

function C10Ch1S2Pipeline(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Real-Time Telemetry & Sensor Fusion"
      lessonSubtitle="Kalman Filters & Multi-Sensor Integration"
      simpleDefinition="Aerospace telemetry systems use Kalman Filters to fuse noisy measurements from IMU gyroscopes, optical cameras, and GPS satellites into a single, high-precision flight state estimate."
      smallExample="Combining 100Hz gyroscope readings with 10Hz GPS fixes to navigate a drone through a tunnel when satellite signals fade."
      oneWordPoint={{ question: "What algorithm fuses noisy multi-sensor data?", answer: "Kalman Filter" }}
      keyPoints={[
        { icon: Radio, title: 'Sensor Fusion (Kalman Filter)', text: 'Statistically weights sensor noise covariance matrices (Q & R).' },
        { icon: Activity, title: 'Inertial Measurement Unit (IMU)', text: 'Measures 6-axis roll, pitch, yaw rates and linear accelerations.' },
        { icon: Cpu, title: 'Real-Time Telemetry Stream', text: 'Transmits flight telemetry at 1,000 updates per second.' }
      ]}
      aiDialogue="Welcome Commander! I am Flight Director Aura. Let's calibrate Kalman filter covariance, fuse telemetry channels, and solve 3 aerospace challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Sensor Fusion Matcher",
          title: "Match Flight Sensors to Telemetry Properties",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'tf1', left: '3-Axis MEMS Gyroscope', right: 'Angular velocity & rotational rates (High frequency)' },
                { id: 'tf2', left: 'Multi-Constellation GPS', right: 'Absolute global coordinates (Low frequency)' },
                { id: 'tf3', left: 'Barometric Altimeter', right: 'Atmospheric pressure altitude estimation' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Kalman Covariance Tuner",
          title: "Tune Kalman Filter Sensor Noise Covariance (R)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Kalman Measurement Noise Covariance (R)"
              description="Tune measurement noise parameter R between 0.15 and 0.30 to filter out high-vibration engine noise while maintaining rapid tracking."
              min={0.01}
              max={1.00}
              step={0.05}
              unit=" R"
              targetRange={[0.15, 0.30]}
              optimalLabel="Optimal Kalman Telemetry Fusion Achieved (Zero Trajectory Jitter)"
              suboptimalLabel="Noisy Jitter (<0.15) or Sluggish Lag (>0.30)! Target: 0.15 - 0.30"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Sensor Pipeline Sequence",
          title: "Sequence the State Estimation Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'kf1', label: '1. Time Update (Predict): Project state and covariance forward using physics model', detail: 'Prediction' },
                { id: 'kf2', label: '2. Measurement Update (Correct): Compute Kalman Gain based on sensor uncertainty', detail: 'Gain Calc' },
                { id: 'kf3', label: '3. State Output: Publish optimal fused vehicle pose to flight controller', detail: 'State Publish' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'kf1' && ids[1] === 'kf2' && ids[2] === 'kf3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function C10Ch1S3Failover(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Autonomous Failover & Redundant Relays"
      lessonSubtitle="Triple Modular Redundancy (TMR) & Watchdog Timers"
      simpleDefinition="Mission-critical avionics use Triple Modular Redundancy (TMR) with three independent flight computers voting on commands. If one computer fails or glitches, the remaining two override it within 5 milliseconds."
      smallExample="Spacecraft flight computers voting 2-to-1 to execute a thruster burn when cosmic radiation flips a single bit in Computer A."
      oneWordPoint={{ question: "What voting system uses 3 independent computers?", answer: "Triple Modular Redundancy (TMR)" }}
      keyPoints={[
        { icon: ShieldAlert, title: 'TMR Majority Voting', text: '2-out-of-3 voting logic isolates single-point microchip failures.' },
        { icon: Activity, title: 'Hardware Watchdog Timer', text: 'Automatically reboots hung processors if heartbeat pulse stops.' },
        { icon: Lock, title: 'Asynchronous Failover Bus', text: 'Transfers flight control to secondary bus in under 5 milliseconds.' }
      ]}
      aiDialogue="Avionics failover simulation active! Configure 3-node voting logic, test watchdog resets, and isolate flight hardware faults!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · TMR Voting Sorter",
          title: "Evaluate 3-Computer Voting Decisions",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'v1', label: 'CPU1: [Pitch +2°] | CPU2: [Pitch +2°] | CPU3: [Pitch +2°]', bin: 'A' },
                { id: 'v2', label: 'CPU1: [Pitch +2°] | CPU2: [Pitch +2°] | CPU3: [GLITCH: -99°]', bin: 'A' },
                { id: 'v3', label: 'CPU1: [Roll Left] | CPU2: [Roll Right] | CPU3: [GLITCH NaN]', bin: 'B', hint: 'No majority consensus! Disengage autopilot!' },
                { id: 'v4', label: 'CPU1: [Throttle 80%] | CPU2: [Throttle 80%] | CPU3: [OFFLINE]', bin: 'A' }
              ]}
              binALabel="2-of-3 Majority Valid (Execute)"
              binBLabel="Voting Deadlock (Engage Failsafe)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Watchdog Timeout Tuner",
          title: "Tune Hardware Watchdog Heartbeat Timeout",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Watchdog Heartbeat Timeout Duration"
              description="Set watchdog timeout window between 20ms and 50ms to catch frozen loops without false-triggering during intensive bursts."
              min={5}
              max={150}
              step={5}
              unit=" ms"
              targetRange={[20, 50]}
              optimalLabel="Optimal Avionics Watchdog Armed (50ms Max Failover Latency)"
              suboptimalLabel="Spurious Reset (<20ms) or Sluggish Hang (>50ms)! Target: 20 - 50 ms"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Fault Isolation Script",
          title: "Assemble Subsystem Failover Protocol",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Avionics Failover Execution Script"
              instruction="Assemble the emergency computer isolation sequence in order."
              availableBlocks={[
                { id: 'fo1', text: 'DetectFaultyTelemetry(Node_C)' },
                { id: 'fo2', text: 'IsolateNodeCFromFlightBus()' },
                { id: 'fo3', text: 'PromoteNodeBToActiveMaster()' }
              ]}
              targetSequence={['fo1', 'fo2', 'fo3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C10Ch1S4Performance(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Flight Envelope & Aerodynamic Performance"
      lessonSubtitle="Thrust-to-Weight, Angle of Attack & PID Tuning"
      simpleDefinition="Autonomous flight controllers use Proportional-Integral-Derivative (PID) feedback loops to constantly balance aircraft thrust, aerodynamic drag, and pitch angles within safe flight envelope boundaries."
      smallExample="PID flight controllers adjusting drone motor speeds 400 times per second to hold steady hover in 30 knot gusty winds."
      oneWordPoint={{ question: "What feedback loop stabilizes flight control?", answer: "PID Controller" }}
      keyPoints={[
        { icon: Sliders, title: 'Proportional Gain (Kp)', text: 'Corrects errors proportionally to current angular deviation.' },
        { icon: Activity, title: 'Integral Gain (Ki)', text: 'Eliminates accumulated steady-state drift and wind offset.' },
        { icon: Gauge, title: 'Derivative Gain (Kd)', text: 'Dampens oscillations and prevents overshoot.' }
      ]}
      aiDialogue="Stabilize the aircraft! Tune PID gains (Kp, Ki, Kd), calculate thrust-to-weight ratios, and master flight dynamics!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · PID Term Matcher",
          title: "Match PID Controller Terms to Aerodynamic Behaviors",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pid1', left: 'Proportional Term (Kp)', right: 'Main steering force proportional to current error' },
                { id: 'pid2', left: 'Integral Term (Ki)', right: 'Counters persistent crosswind drift over time' },
                { id: 'pid3', left: 'Derivative Term (Kd)', right: 'Brakes rapid rotation to prevent bouncy overshoot' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · PID Proportional Gain Tuner",
          title: "Tune Roll Axis Proportional Gain (Kp)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Roll Axis Kp Gain Calibration"
              description="Tune Kp gain between 4.2 and 5.8 to achieve rapid attitude recovery without high-frequency motor oscillations."
              min={1.0}
              max={10.0}
              step={0.2}
              unit=" Kp"
              targetRange={[4.2, 5.8]}
              optimalLabel="Critically Damped Attitude Response Locked (Zero Oscillations)"
              suboptimalLabel="Sluggish Response (<4.2) or Violent Wobble (>5.8)! Target: 4.2 - 5.8"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Flight Envelope Sorter",
          title: "Classify Safe Flight Parameters vs Envelope Exceedance",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'fe1', label: 'Angle of Attack = +6° (Optimal lift-to-drag ratio)', bin: 'A' },
                { id: 'fe2', label: 'Angle of Attack = +22° (Critical wing aerodynamic stall)', bin: 'B', hint: 'Wing stall! Loss of lift!' },
                { id: 'fe3', label: 'Bank Angle = 25° during coordinated standard rate turn', bin: 'A' },
                { id: 'fe4', label: 'G-Force = +8.5G (Exceeds airframe structural yield stress)', bin: 'B', hint: 'Airframe structural hazard!' }
              ]}
              binALabel="Safe Flight Envelope"
              binBLabel="Aerodynamic / Structural Stall Hazard"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C10Ch1S5Trainer(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Reinforcement Learning & Policy Gradient Flight"
      lessonSubtitle="Markov Decision Processes & Reward Shaping"
      simpleDefinition="In Reinforcement Learning (RL), autonomous flight agents learn optimal navigation maneuvers through trial and error by maximizing mathematical reward points for fuel efficiency, altitude holding, and smooth landings."
      smallExample="An RL flight agent practicing 100,000 simulated landings in a wind tunnel to master crosswind touch-downs."
      oneWordPoint={{ question: "What guides Reinforcement Learning actions?", answer: "Reward Function" }}
      keyPoints={[
        { icon: Award, title: 'Reward Shaping', text: 'Rewards positive behaviors (+10 on-target) and penalizes crashes (-100).' },
        { icon: Activity, title: 'Policy Network (Actor)', text: 'Neural network that selects elevator and throttle actions from state.' },
        { icon: Gauge, title: 'Value Network (Critic)', text: 'Evaluates expected cumulative future rewards from current state.' }
      ]}
      aiDialogue="Enter the RL Flight Simulator! Shape reward functions, train Actor-Critic policies, and achieve autonomous flight mastery!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Reward Shaping Sorter",
          title: "Classify Positive Rewards vs Penalty Penalties",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'rw1', label: 'Holding designated 500m cruise altitude within ±1m (+10.0)', bin: 'A' },
                { id: 'rw2', label: 'Exceeding maximum 15° bank angle during passenger cruise (-25.0)', bin: 'B' },
                { id: 'rw3', label: 'Smooth touchdown with vertical speed < 1.0 m/s (+50.0)', bin: 'A' },
                { id: 'rw4', label: 'Hard ground contact exceeding 5.0 m/s crash threshold (-100.0)', bin: 'B' }
              ]}
              binALabel="Positive Reward Incentive (+)"
              binBLabel="Negative Penalty Penalty (-)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Discount Factor Gamma Tuner",
          title: "Tune RL Horizon Discount Factor (Gamma)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="RL Discount Factor (Gamma γ)"
              description="Tune discount factor between 0.95 and 0.99 so agent values long-term smooth flight trajectories over immediate rewards."
              min={0.80}
              max={0.999}
              step={0.01}
              unit=" γ"
              targetRange={[0.95, 0.99]}
              optimalLabel="Optimal Long-Horizon Strategic Flight Policy Converged"
              suboptimalLabel="Myopic Short-Sighted (<0.95) or Unstable Variance (>0.99)! Target: 0.95 - 0.99"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · RL Training Loop Sequence",
          title: "Sequence the PPO (Proximal Policy Optimization) Training Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'rl1', label: '1. Rollout: Collect 2,048 state-action-reward trajectory steps in flight sim', detail: 'Exploration' },
                { id: 'rl2', label: '2. Advantage Calc: Compute Generalized Advantage Estimation (GAE)', detail: 'Advantage' },
                { id: 'rl3', label: '3. Policy Update: Step actor-critic weights with clipped surrogate loss', detail: 'PPO Step' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'rl1' && ids[1] === 'rl2' && ids[2] === 'rl3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function C10Ch1S6MultiAgent(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Swarm Coordination & Multi-Agent Consensus"
      lessonSubtitle="Decentralized Mesh Telemetry & Flocking"
      simpleDefinition="Multi-agent drone swarms coordinate without a central leader using Reynolds Boids flocking rules: Separation (avoid crowding), Alignment (match heading), and Cohesion (stay together)."
      smallExample="A swarm of 50 autonomous search-and-rescue drones spreading out to scan a mountain valley without collisions."
      oneWordPoint={{ question: "What algorithm controls drone swarm flocking?", answer: "Reynolds Boids Consensus" }}
      keyPoints={[
        { icon: Compass, title: 'Separation Rule', text: 'Repels drones if distance between neighbors is under 3 meters.' },
        { icon: Navigation, title: 'Alignment Rule', text: 'Averages flight velocity and heading with nearby swarm peers.' },
        { icon: Radio, title: 'Ad-Hoc Wireless Mesh', text: 'Peers share target coordinates across dynamic peer-to-peer radio hops.' }
      ]}
      aiDialogue="Command the swarm! Configure decentralized Boids flocking rules, tune inter-drone repulsion, and coordinate swarm search missions!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Flocking Rule Matcher",
          title: "Match Reynolds Flocking Rules to Behavioral Effects",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'fl1', left: 'Separation Rule', right: 'Steers to avoid colliding with nearby swarm neighbors' },
                { id: 'fl2', left: 'Alignment Rule', right: 'Steers towards the average heading of neighbor drones' },
                { id: 'fl3', left: 'Cohesion Rule', right: 'Steers toward the center of mass of the flock' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Swarm Separation Tuner",
          title: "Tune Inter-Drone Separation Safety Radius",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Swarm Inter-Drone Separation Radius"
              description="Set minimum separation radius between 4.0m and 6.5m for safe aerodynamic rotor vortex clearance."
              min={1.0}
              max={15.0}
              step={0.5}
              unit=" m"
              targetRange={[4.0, 6.5]}
              optimalLabel="Optimal Swarm Aerodynamic Clearance Locked (Zero Wake Turbulence)"
              suboptimalLabel="Rotor Collision Risk (<4.0m) or Swarm Dispersion (>6.5m)! Target: 4.0 - 6.5 m"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Swarm Mesh Scanner",
          title: "Inspect 3 Swarm Telemetry Systems",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Swarm Autonomous Telemetry Pod"
              prompt="Inspect all 3 primary swarm peer-to-peer telemetry modules."
              hotspots={[
                { id: 'sw1', label: 'Ultra-Wideband (UWB) Ranging', icon: <Radio size={14} className="text-cyan-400" />, explanation: 'Measures inter-drone distance with sub-centimeter radio pulse timing.' },
                { id: 'sw2', label: 'Mesh Routing Protocol Engine', icon: <Terminal size={14} className="text-cyan-400" />, explanation: 'Relays target telemetry across dynamic multi-hop ad-hoc wireless links.' },
                { id: 'sw3', label: 'Optical Swarm Collision Beacons', icon: <Sun size={14} className="text-cyan-400" />, explanation: 'High-visibility strobe arrays allowing visual neighbor tracking at night.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C10Ch1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title="Chapter 1 Capstone: Suborbital Flight Certification"
      lessonSubtitle="Autonomous Orbital Insertion & Re-entry"
      simpleDefinition="You have mastered Kalman telemetry fusion, TMR failover relays, aerodynamic PID envelope tuning, RL policy gradients, and swarm flocking. Now execute a complete suborbital autonomous flight mission!"
      smallExample="Piloting an autonomous aerospace vehicle through atmospheric re-entry, hypersonic descent, and runway touchdown."
      oneWordPoint={{ question: "What is the highest telemetry flight rating?", answer: "Master Avionics Commander" }}
      keyPoints={[
        { icon: Award, title: 'Hypersonic Precision', text: 'Manages aerodynamic thermal heating and trajectory guidance at Mach 5+.' },
        { icon: ShieldCheck, title: 'Zero Failovers Unhandled', text: 'Automatically resolves simulated sensor cutouts in under 10 milliseconds.' },
        { icon: Trophy, title: 'Avionics Certification', text: 'Certifies Class 10 Master Autonomous Flight Engineer rank.' }
      ]}
      aiDialogue="Flight Director online! Execute the 3 final suborbital capstone challenges to claim your Master Avionics Wings!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Telemetry Matcher",
          title: "Match Suborbital Flight Phases to Avionics Configurations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ap1', left: 'Hypersonic Atmospheric Re-entry', right: 'Reaction Control Thrusters & Thermal Shield Telemetry' },
                { id: 'ap2', left: 'Transonic Glide Transition', right: 'Aerodynamic Elevator PID Flight Envelope Active' },
                { id: 'ap3', left: 'Autoland Runway Touchdown', right: 'Centimeter Differential GPS & Optical LiDAR Alignment' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Flight Mission Script",
          title: "Assemble Suborbital Mission Flight Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Suborbital Flight Control Script"
              instruction="Assemble the complete 4-step mission flight sequence in order."
              availableBlocks={[
                { id: 'fl1', text: 'EngageSuborbitalRocketBoost()' },
                { id: 'fl2', text: 'ExecuteHypersonicReentryTrajectory()' },
                { id: 'fl3', text: 'DeployAerodynamicControlSurfaces()' },
                { id: 'fl4', text: 'PerformAutonomousRunwayTouchdown()' }
              ]}
              targetSequence={['fl1', 'fl2', 'fl3', 'fl4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Avionics Status Sorter",
          title: "Verify Final Suborbital Telemetry Status",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'tl1', label: 'All 3 TMR Flight Computers Synchronized at 1,000 Hz', bin: 'A' },
                { id: 'tl2', label: 'Thermal Sensor Exceeds 2,200°C Max Structural Limit', bin: 'B', hint: 'Re-entry thermal hazard!' },
                { id: 'tl3', label: 'Kalman Position Covariance: 0.02m (Nominal)', bin: 'A' },
                { id: 'tl4', label: 'Hydraulic Actuator Line Pressure Zero Alert', bin: 'B', hint: 'Control surface hydraulic failure!' }
              ]}
              binALabel="Telemetry Nominal (Flight GO)"
              binBLabel="Critical Telemetry Abort Trigger"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: TELEMETRY, FAILOVER, RL, MULTI-AGENT, ETHICS
// =============================================================================

function Class10Chapter2TelemetryWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title={props.canonicalSection?.title || `Chapter 2: Advanced Telemetry Networks · Section ${sectionIdx + 1}`}
      lessonSubtitle="Protobuf Serialization & High-Speed UDP Streams"
      simpleDefinition="Avionics telemetry streams use binary Protocol Buffers (Protobuf) over UDP sockets to transmit thousands of vehicle state metrics with microsecond serialization latency."
      smallExample="Encoding 200 telemetry channels into a compact 128-byte binary packet transmitted at 2,000 packets per second."
      oneWordPoint={{ question: "What binary format minimizes telemetry size?", answer: "Protocol Buffers (Protobuf)" }}
      keyPoints={[
        { icon: Terminal, title: 'Binary Serialization', text: 'Compact Protobuf schemas reduce packet size by 80% compared to JSON.' },
        { icon: Radio, title: 'UDP vs TCP in Telemetry', text: 'Low-latency UDP is preferred for time-critical real-time flight streams.' },
        { icon: Activity, title: 'Ring Buffer Architecture', text: 'Stores sliding telemetry window in lock-free memory buffers.' }
      ]}
      aiDialogue="Welcome to High-Speed Telemetry! Configure Protobuf binary encoders, optimize UDP streams, and minimize telemetry latency!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Protocol Sorter",
          title: "Classify Telemetry Protocols by Use Case",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'pt1', label: 'High-speed 1,000Hz live flight control attitude telemetry', bin: 'A' },
                { id: 'pt2', label: 'Reliable firmware binary over-the-air update transfer', bin: 'B' },
                { id: 'pt3', label: 'Live gyro and acceleration sensor streaming', bin: 'A' },
                { id: 'pt4', label: 'Mission log file upload to ground station archive', bin: 'B' }
              ]}
              binALabel="UDP Socket (Ultra-Low Latency)"
              binBLabel="TCP Socket (Guaranteed Delivery)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Stream Rate Tuner",
          title: "Calibrate Telemetry Packet Broadcast Rate",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Telemetry UDP Packet Frequency"
              description="Tune broadcast frequency between 800 Hz and 1,200 Hz to satisfy flight controller requirements without congesting the bus."
              min={100}
              max={3000}
              step={100}
              unit=" Hz"
              targetRange={[800, 1200]}
              optimalLabel="Optimal 1,000Hz Telemetry Broadcast Rate Synchronized"
              suboptimalLabel="Telemetry Lag (<800Hz) or Bus Congestion (>1200Hz)! Target: 800 - 1200 Hz"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Protobuf Schema Matcher",
          title: "Match Telemetry Data Types to Protobuf Field Types",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pb1', left: 'Vehicle Pitch Angle (+2.45°)', right: 'float / double (32-bit floating point)' },
                { id: 'pb2', left: 'Engine Operating Mode Flag', right: 'enum FlightMode (Enumerated integer)' },
                { id: 'pb3', left: 'Microsecond Timestamp (1728000000)', right: 'uint64 (64-bit unsigned integer)' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class10Chapter3FailoverWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title={props.canonicalSection?.title || `Chapter 3: Fault-Tolerant Avionics · Section ${sectionIdx + 1}`}
      lessonSubtitle="Byzantine Fault Tolerance & Safety Isolation"
      simpleDefinition="Byzantine Fault Tolerance (BFT) algorithms prevent corrupted or rogue sensors from deceiving flight computers by establishing cryptographic consensus across all nodes."
      smallExample="Detecting a damaged pitot tube reporting impossible Mach 3 speeds and isolating it from airspeed calculations."
      oneWordPoint={{ question: "What algorithm handles rogue contradictory sensors?", answer: "Byzantine Agreement" }}
      keyPoints={[
        { icon: ShieldAlert, title: 'Byzantine Nodes', text: 'Sensors that output conflicting or corrupted data to different computers.' },
        { icon: Lock, title: 'Cryptographic Node Signing', text: 'Every sensor digitally signs readings before transmission.' },
        { icon: CheckCircle2, title: 'Consensus Quorum', text: 'Requires 3f+1 total nodes to tolerate f arbitrary faulty sensors.' }
      ]}
      aiDialogue="Master Byzantine Fault Tolerance! Isolate rogue sensor noise, verify cryptographic signatures, and maintain flight quorum!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · BFT Quorum Matcher",
          title: "Match Fault Tolerances to Required Node Counts",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'bft1', left: 'Tolerate 1 Byzantine Fault (f=1)', right: 'Requires 4 Nodes (3f + 1 = 4)' },
                { id: 'bft2', left: 'Tolerate 2 Byzantine Faults (f=2)', right: 'Requires 7 Nodes (3f + 1 = 7)' },
                { id: 'bft3', left: 'Tolerate 3 Byzantine Faults (f=3)', right: 'Requires 10 Nodes (3f + 1 = 10)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Sensor Sanity Sorter",
          title: "Classify Plausible Sensor Telemetry vs Rogue Sensor Faults",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sn1', label: 'Airspeed increasing smoothly from 200 to 205 knots during climb', bin: 'A' },
                { id: 'sn2', label: 'Airspeed jumping from 200 knots to 1,500 knots in 1 millisecond', bin: 'B', hint: 'Sensor discontinuity fault!' },
                { id: 'sn3', label: 'Altimeter confirming barometric pressure drop during ascent', bin: 'A' },
                { id: 'sn4', label: 'Thermometer reading -273°C (Absolute Zero) inside warm jet engine', bin: 'B', hint: 'Broken thermocouple fault!' }
              ]}
              binALabel="Plausible Sensor Telemetry (Valid)"
              binBLabel="Rogue / Broken Sensor Fault (Isolate)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Fault Isolation Sequence",
          title: "Sequence Byzantine Sensor Isolation Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'bi1', label: '1. Detect statistical discrepancy in Pitot Sensor #3 readings', detail: 'Discrepancy' },
                { id: 'bi2', label: '2. Perform cross-check with GPS groundspeed and Angle of Attack', detail: 'Cross-Check' },
                { id: 'bi3', label: '3. Revoke Pitot #3 voting privileges and declare sensor offline', detail: 'Isolation' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'bi1' && ids[1] === 'bi2' && ids[2] === 'bi3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function Class10Chapter4ReinforcementWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title={props.canonicalSection?.title || `Chapter 4: Advanced Reinforcement Learning · Section ${sectionIdx + 1}`}
      lessonSubtitle="Deep Q-Networks (DQN) & Continuous Action Spaces"
      simpleDefinition="Continuous action reinforcement learning algorithms (like SAC and DDPG) control smooth flight surfaces by outputting exact continuous motor torque values rather than discrete step options."
      smallExample="Soft Actor-Critic (SAC) outputting continuous wing aileron deflection angles from -20.0° to +20.0°."
      oneWordPoint={{ question: "What RL handles continuous motor angles?", answer: "Soft Actor-Critic (SAC)" }}
      keyPoints={[
        { icon: Activity, title: 'Continuous Action Spaces', text: 'Outputs exact real numbers for motor throttle and torque.' },
        { icon: Layers, title: 'Experience Replay Buffer', text: 'Stores 1,000,000 transitions to break correlation between consecutive steps.' },
        { icon: RefreshCw, title: 'Entropy Regularization', text: 'Encourages the policy to explore diverse maneuvers without getting stuck.' }
      ]}
      aiDialogue="Welcome to Deep RL Architecture! Master continuous Actor-Critic algorithms, replay buffers, and entropy regularization!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · RL Algorithm Matcher",
          title: "Match RL Algorithms to Action Space Domains",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'rl1', left: 'Deep Q-Network (DQN)', right: 'Discrete action spaces (e.g. Turn Left, Turn Right)' },
                { id: 'rl2', left: 'Soft Actor-Critic (SAC)', right: 'Continuous action spaces with entropy bonus (e.g. Throttle 74.2%)' },
                { id: 'rl3', left: 'Monte Carlo Tree Search (MCTS)', right: 'Heuristic lookahead planning in game boards' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Replay Buffer Sorter",
          title: "Classify Replay Buffer Transition Elements",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'rb1', label: 'State: [Altitude: 500m, Velocity: 120 kt, Pitch: +2°]', bin: 'A' },
                { id: 'rb2', label: 'Action: [Elevator: -1.5°, Throttle: 85%]', bin: 'B' },
                { id: 'rb3', label: 'Next State: [Altitude: 508m, Velocity: 121 kt, Pitch: +2°]', bin: 'A' },
                { id: 'rb4', label: 'Reward: [+12.5 points for smooth altitude gain]', bin: 'B' }
              ]}
              binALabel="State Representation (S, S')"
              binBLabel="Action & Reward (A, R)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · SAC Training Pipeline",
          title: "Sequence the Soft Actor-Critic Update Step",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'sac1', label: '1. Sample random minibatch of (S, A, R, S\') from Replay Buffer', detail: 'Sample' },
                { id: 'sac2', label: '2. Compute Critic Q-loss with Target Networks and entropy term', detail: 'Critic Update' },
                { id: 'sac3', label: '3. Update Actor policy weights via reparameterization trick', detail: 'Actor Update' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'sac1' && ids[1] === 'sac2' && ids[2] === 'sac3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function Class10Chapter5MultiAgentWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title={props.canonicalSection?.title || `Chapter 5: Swarm Intelligence & Mesh Telemetry · Section ${sectionIdx + 1}`}
      lessonSubtitle="Swarm Robotics & Distributed Optimization"
      simpleDefinition="Swarm intelligence algorithms allow large fleets of autonomous robots to solve distributed search, mapping, and formation flight problems without a single point of failure."
      smallExample="A swarm of 20 agricultural drones dividing a 10,000-acre field into optimal non-overlapping scanning sectors."
      oneWordPoint={{ question: "What prevents single points of failure in swarms?", answer: "Distributed Architecture" }}
      keyPoints={[
        { icon: Compass, title: 'Voronoi Partitioning', text: 'Mathematically divides geographic search areas equally among drones.' },
        { icon: Radio, title: 'Mesh Self-Healing', text: 'Reroutes radio communications instantly if a drone lands or drops offline.' },
        { icon: Users, title: 'Consensus Protocols', text: 'Agrees on target priorities without a central command server.' }
      ]}
      aiDialogue="Deploy distributed drone swarms! Calculate Voronoi cell partitions, configure self-healing mesh nodes, and execute area mapping!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Swarm Formation Matcher",
          title: "Match Swarm Formations to Operational Missions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sf1', left: 'Vee / Chevron Formation', right: 'Aerodynamic drafting to save 20% battery energy' },
                { id: 'sf2', left: 'Sweeping Line Front Formation', right: 'Wide-area search-and-rescue scan coverage' },
                { id: 'sf3', left: 'Encircling Ring Formation', right: 'Continuous 360° surveillance around perimeter target' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Mesh Telemetry Wire",
          title: "Wire Mesh Telemetry Relay Network",
          render: (onPass) => (
            <CircuitWireStation
              title="Ad-Hoc Drone Mesh Telemetry"
              instruction="Connect drone radio nodes across the multi-hop relay bus."
              terminals={[
                { id: 't_d1', label: 'Lead Scout Drone #1', icon: <Navigation size={12} /> },
                { id: 't_d2', label: 'Mid-Air Relay Drone #2', icon: <Radio size={12} /> },
                { id: 't_d3', label: 'Perimeter Sensor Drone #3', icon: <Eye size={12} /> }
              ]}
              ports={[
                { id: 'p_relay', label: 'Relay Node 2 Input Bus', matchesTerminalId: 't_d1' },
                { id: 'p_base', label: 'Ground Base Station Uplink', matchesTerminalId: 't_d2' },
                { id: 'p_scout', label: 'Scout Mesh Bridge', matchesTerminalId: 't_d3' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Swarm Coordination Sorter",
          title: "Classify Swarm Coordination Behaviors",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sw_ok1', label: 'Drones dynamically re-allocating search grid when Drone #4 lands to recharge', bin: 'A' },
                { id: 'sw_fail1', label: 'All 20 drones flying towards the exact same spot and crowding each other', bin: 'B', hint: 'Swarm collision bottleneck!' },
                { id: 'sw_ok2', label: 'Passing target GPS coordinates across 3-hop radio mesh to ground team', bin: 'A' },
                { id: 'sw_fail2', label: 'Swarm completely stopping because one drone ran out of battery', bin: 'B', hint: 'Single point of failure!' }
              ]}
              binALabel="Robust Decentralized Swarm Behavior"
              binBLabel="Swarm Coordination Pathology"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class10Chapter6FlightEthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 10 · Telemetry Cockpit"
      title={props.canonicalSection?.title || `Chapter 6: Aerospace AI Safety & FAA Certification · Section ${sectionIdx + 1}`}
      lessonSubtitle="DO-178C Standards & Formal Software Verification"
      simpleDefinition="Aviation software certification standards (like FAA DO-178C Level A) require formal mathematical verification and 100% Modified Condition/Decision Coverage (MC/DC) testing to guarantee flight software never enters an undefined state."
      smallExample="Formal mathematical proofs verifying that flight autopilot logic will never command negative pitch when altitude is below 50 feet."
      oneWordPoint={{ question: "What is the highest FAA software safety level?", answer: "DO-178C Level A" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'DO-178C Level A Certification', text: 'Zero tolerance for catastrophic failure states in flight control code.' },
        { icon: Terminal, title: 'MC/DC Code Coverage', text: 'Tests every single Boolean condition independently in decision logic.' },
        { icon: Lock, title: 'Deterministic Execution Guarantees', text: 'Proves worst-case execution time (WCET) is bounded.' }
      ]}
      aiDialogue="Uphold the highest aerospace safety standards! Master DO-178C certification, formal verification proofs, and MC/DC testing!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Safety Standard Matcher",
          title: "Match Aviation Software Safety Levels to Failure Severities",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'do1', left: 'DO-178C Level A', right: 'Catastrophic failure prevention (Loss of aircraft)' },
                { id: 'do2', left: 'DO-178C Level B', right: 'Hazardous / Severe failure mitigation (Significant injuries)' },
                { id: 'do3', left: 'DO-178C Level C', right: 'Major failure handling (Increased crew workload)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Verification Pipeline",
          title: "Sequence the DO-178C Formal Verification Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ver1', label: '1. High-Level Requirements & Software Architecture Scoping', detail: 'Requirements' },
                { id: 'ver2', label: '2. Source Code Implementation with Static Code Analysis', detail: 'Development' },
                { id: 'ver3', label: '3. 100% MC/DC Test Coverage & Formal Mathematical Proofs', detail: 'Certification' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ver1' && ids[1] === 'ver2' && ids[2] === 'ver3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Certification Code Sorter",
          title: "Classify Certified Aerospace Code vs Risky Unverified Code",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cd_cert1', label: 'Deterministic static memory allocation with zero dynamic malloc() calls', bin: 'A' },
                { id: 'cd_risk1', label: 'Unbounded while(true) loop with no hardware watchdog escape condition', bin: 'B', hint: 'Deadlock risk in flight!' },
                { id: 'cd_cert2', label: '100% MC/DC branch coverage verified by formal theorem prover', bin: 'A' },
                { id: 'cd_risk2', label: 'Untested third-party script downloaded from random internet forum', bin: 'B', hint: 'Uncertified dangerous code!' }
              ]}
              binALabel="Certified Aerospace Grade (DO-178C Level A)"
              binBLabel="Risky / Uncertified Aviation Hazard"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}
