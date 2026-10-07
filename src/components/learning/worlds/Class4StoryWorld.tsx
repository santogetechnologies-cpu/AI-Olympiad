import React, { useState } from 'react'
import {
  Compass, BookOpen, MessageSquare, CheckCircle2, ChevronRight, Play,
  Sparkles, Star, MapPin, Award, Navigation, ShieldCheck, Eye, Cpu,
  Sliders, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Shield, Check,
  Camera, Mic, Volume2, Lightbulb, Zap, Laptop, Home, School, Clock,
  Activity, Terminal, HelpCircle, Palette, Flame, ShieldAlert,
  UserCheck, AlertTriangle, Layers, Lock, Unlock, Sun, Moon,
  Thermometer, User, Shuffle, Grid, RotateCcw, Target, RefreshCw, Send,
  Droplet, Radio, Wrench, FileCode, CheckSquare, Search
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
// CLASS 4 STORY WORLD DISPATCHER (STORY & COMIC ADVENTURE)
// Unique Theme: Dr. Ada & Nova Rover Comic Quests · Warm Amber & Indigo Storyframes
// =============================================================================

export const Class4StoryWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class4Chapter2PromptWorld {...props} />
    case 3:
      return <Class4Chapter3MobilityWorld {...props} />
    case 4:
      return <Class4Chapter4CareerWorld {...props} />
    case 5:
      return <Class4Chapter5StudioWorld {...props} />
    case 6:
      return <Class4Chapter6GuardianWorld {...props} />
    default:
      return <Class4Chapter1ExplorerWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: WHERE IS AI HIDING? & MEET THE SMART MACHINES
// =============================================================================

function Class4Chapter1ExplorerWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C4Ch1S2Sensors {...props} />
  if (sectionIdx === 2) return <C4Ch1S3Navigation {...props} />
  if (sectionIdx === 3) return <C4Ch1S4Signals {...props} />
  if (sectionIdx === 4) return <C4Ch1S5Classifying {...props} />
  if (sectionIdx === 5) return <C4Ch1S6Proximity {...props} />
  if (sectionIdx === 6) return <C4Ch1S7Capstone {...props} />
  return <C4Ch1S2Sensors {...props} />
}

function C4Ch1S2Sensors(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Meet the Smart Machine Sensors"
      lessonSubtitle="How Robots See & Hear"
      simpleDefinition="Smart machines use sensors to gather clues from the real world, just like our five human senses! Cameras act as eyes, microphones act as ears, and lidar beams act as spatial touch."
      smallExample="A robot vacuum uses optical cameras to see furniture and lidar to avoid tumbling down stairs."
      oneWordPoint={{ question: "What is a robot's eye called?", answer: "Camera Sensor" }}
      keyPoints={[
        { icon: Camera, title: 'Optical Camera', text: 'Captures visual colors, shapes, and movement.' },
        { icon: Mic, title: 'Acoustic Mic', text: 'Listens to human speech commands and voice frequency.' },
        { icon: Radio, title: 'Distance Lidar', text: 'Bounces laser pulses to measure distance to walls.' },
        { icon: Cpu, title: 'AI Neural Core', text: 'Processes sensor data into smart decisions.' },
      ]}
      aiDialogue="Ahoy explorer! Dr. Ada and Nova Rover need your help. Study how robot sensors work, then test your skills in 3 fun sensor challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Sensor Matcher",
          title: "Connect Machine Sensors to Human Senses",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Camera Vision', right: 'Human Eyes (Seeing Shapes)' },
                { id: 'p2', left: 'Microphone Sensor', right: 'Human Ears (Hearing Voices)' },
                { id: 'p3', left: 'Lidar Distance Beam', right: 'Touch & Spatial Awareness' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Sensor Pipeline",
          title: "Sequence Robot Perception Steps",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 's1', label: '1. Camera takes photo of obstacle', detail: 'Optical capture' },
                { id: 's2', label: '2. CPU analyzes shape and distance', detail: 'Neural thinking' },
                { id: 's3', label: '3. Wheels steer rover around obstacle', detail: 'Motor action' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 's1' && ids[1] === 's2' && ids[2] === 's3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Rover Scanner",
          title: "Discover All 3 Sensor Bays on Nova Rover",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Nova Rover Sensor Bay Inspection"
              prompt="Tap all 3 sensor bays on the rover to activate full autonomy!"
              hotspots={[
                { id: 'h1', label: 'Front RGB Camera', icon: <Camera size={14} className="text-indigo-600" />, explanation: 'Identifies paths, signs, and pedestrians ahead.' },
                { id: 'h2', label: 'Dual Mic Array', icon: <Mic size={14} className="text-indigo-600" />, explanation: 'Cancels background noise to hear voice commands clearly.' },
                { id: 'h3', label: '360° Laser Lidar', icon: <Radio size={14} className="text-indigo-600" />, explanation: 'Maps 3D room boundaries at 20 scans per second.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C4Ch1S3Navigation(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Autonomous Rover Navigation"
      lessonSubtitle="How AI Plans the Safest Path"
      simpleDefinition="Autonomous robots make decisions by analyzing map data, avoiding obstacles in real time, and choosing the shortest safe path to reach their destination."
      smallExample="A delivery bot slows down when a dog runs across the sidewalk."
      oneWordPoint={{ question: "What does AI avoid when driving?", answer: "Obstacles" }}
      keyPoints={[
        { icon: MapPin, title: 'Waypoint Targeting', text: 'Sets step-by-step markers toward the goal.' },
        { icon: ShieldAlert, title: 'Obstacle Detection', text: 'Spots unexpected road blocks instantly.' },
        { icon: Sliders, title: 'Speed Control', text: 'Slows down on sharp turns and busy crossings.' },
      ]}
      aiDialogue="Dr. Ada is mapping the smart city! Let's learn how autonomous navigation works and guide Nova Rover safely!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Terrain Sorter",
          title: "Sort Safe Paths vs Road Hazards",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 't1', label: 'Clear Paved Sidewalk', bin: 'A' },
                { id: 't2', label: 'Deep Construction Pit', bin: 'B', hint: 'This is dangerous for wheels!' },
                { id: 't3', label: 'Marked Pedestrian Crosswalk', bin: 'A' },
                { id: 't4', label: 'Fallen Tree Branch', bin: 'B', hint: 'Obstacle blocks the path!' },
              ]}
              binALabel="Safe Path (Proceed)"
              binBLabel="Hazard (Avoid)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Speed Calibrator",
          title: "Tune Rover Safe Cruising Speed",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Nova Rover Cruising Velocity"
              description="Adjust velocity slider between 15 km/h and 25 km/h for sidewalk safety."
              min={5}
              max={50}
              unit=" km/h"
              targetRange={[15, 25]}
              optimalLabel="Safe City Sidewalk Speed Confirmed"
              suboptimalLabel="Too Fast or Too Slow! Target: 15-25 km/h"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Waypoint Assembler",
          title: "Sequence Waypoint Navigation Protocol",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Autonomous Drive Script"
              instruction="Assemble the correct 3-step navigation sequence in order."
              availableBlocks={[
                { id: 'b1', text: 'ScanSurroundings()' },
                { id: 'b2', text: 'CalculateShortestPath()' },
                { id: 'b3', text: 'EngageWheelMotors()' },
              ]}
              targetSequence={['b1', 'b2', 'b3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C4Ch1S4Signals(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Signal Wiring & Data Channels"
      lessonSubtitle="Connecting Hardware to Software"
      simpleDefinition="Inside every smart robot, electrical wires and communication channels carry messages from sensors directly into the computer's central processor."
      smallExample="When you press a TV remote button, an infrared light signal tells the TV to change channels."
      oneWordPoint={{ question: "Where do sensor signals travel to?", answer: "CPU Processor" }}
      keyPoints={[
        { icon: Activity, title: 'Input Channels', text: 'Carries raw data from sensors into the brain.' },
        { icon: Cpu, title: 'Logic Processor', text: 'Calculates the best response in milliseconds.' },
        { icon: Zap, title: 'Output Relays', text: 'Sends electrical current to turn wheels or play sounds.' }
      ]}
      aiDialogue="Nova Rover's internal communication bus needs wiring! Let's learn about data signals and connect the circuit cables!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Wire Bus",
          title: "Connect Transmitters to Circuit Ports",
          render: (onPass) => (
            <CircuitWireStation
              title="Nova Rover Data Bus Wiring"
              instruction="Connect each sensor transmitter to its corresponding processor port."
              terminals={[
                { id: 't_cam', label: 'Vision Stream', icon: <Camera size={12} /> },
                { id: 't_mic', label: 'Audio Signal', icon: <Mic size={12} /> },
                { id: 't_lidar', label: 'Distance Echo', icon: <Radio size={12} /> }
              ]}
              ports={[
                { id: 'p_cam', label: 'Port 1: Image Frame Buffer', matchesTerminalId: 't_cam' },
                { id: 'p_mic', label: 'Port 2: Audio Decoder DSP', matchesTerminalId: 't_mic' },
                { id: 'p_lidar', label: 'Port 3: Proximity Telemetry', matchesTerminalId: 't_lidar' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Signal Sorter",
          title: "Categorize Digital Inputs vs Motor Outputs",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sig1', label: 'Camera Pixel Data', bin: 'A' },
                { id: 'sig2', label: 'Wheel Motor Voltage', bin: 'B' },
                { id: 'sig3', label: 'Microphone Audio Wave', bin: 'A' },
                { id: 'sig4', label: 'Speaker Voice Sound', bin: 'B' }
              ]}
              binALabel="Input Signal"
              binBLabel="Output Action"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Circuit Repair",
          title: "Diagnose Broken Data Cable",
          render: (onPass) => (
            <BugRepairStation
              title="Rover Signal Bus Fault"
              scenario="Nova Rover cannot hear voice commands. Optical camera and wheels are working normally."
              faultyComponent="Acoustic Mic cable disconnected from DSP port"
              repairOptions={[
                { id: 'r1', label: 'Replace Vision Cable', isCorrect: false, explanation: 'Vision is working fine.' },
                { id: 'r2', label: 'Reconnect Shielded Mic Audio Line', isCorrect: true, explanation: 'The audio cable is restored! Rover can hear speech again.' },
                { id: 'r3', label: 'Change Wheel Battery', isCorrect: false, explanation: 'Battery is fully charged.' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C4Ch1S5Classifying(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Smart City Object Classifier"
      lessonSubtitle="Teaching AI to Recognize Things"
      simpleDefinition="Image classification is how AI looks at a picture, compares its shapes and colors to thousands of examples it learned, and decides what the object is."
      smallExample="AI in a smartphone camera recognizes faces and puts a yellow square around them."
      oneWordPoint={{ question: "What is grouping items by type called?", answer: "Classification" }}
      keyPoints={[
        { icon: Search, title: 'Pattern Finding', text: 'Looks for circles, wheels, leaves, or letters.' },
        { icon: Layers, title: 'Labeling', text: 'Assigns tags like "Bicycle", "Car", or "Tree".' },
        { icon: CheckCircle2, title: 'Confidence Score', text: 'AI measures how sure it is (e.g. 98% cat).' }
      ]}
      aiDialogue="Dr. Ada is training the city scanner to recognize vehicles and pedestrians. Let's practice sorting objects!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · City Classifier",
          title: "Classify Vehicles vs Pedestrians",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'c1', label: 'Electric Scooter', bin: 'A' },
                { id: 'c2', label: 'School Child with Backpack', bin: 'B' },
                { id: 'c3', label: 'City Transit Bus', bin: 'A' },
                { id: 'c4', label: 'Runner on Sidewalk', bin: 'B' }
              ]}
              binALabel="Vehicle / Transit"
              binBLabel="Pedestrian / Human"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Dataset Collector",
          title: "Collect Clear Training Images of Traffic Signs",
          render: (onPass) => (
            <DataCollectorGrid
              title="Curate Traffic Sign Dataset"
              goalPrompt="Tap 3 valid traffic signs to train the AI scanner (avoid blurry random photos)."
              targetCount={3}
              tokens={[
                { id: 'tok1', label: 'Red Stop Sign (Clear)', isValid: true, icon: <ShieldAlert size={14} /> },
                { id: 'tok2', label: 'Speed Limit 30 Sign', isValid: true, icon: <Sliders size={14} /> },
                { id: 'tok3', label: 'Blurry Photo of Cloud', isValid: false, icon: <Sun size={14} /> },
                { id: 'tok4', label: 'Pedestrian Crosswalk Sign', isValid: true, icon: <User size={14} /> },
                { id: 'tok5', label: 'Picture of a Pizza', isValid: false, icon: <HelpCircle size={14} /> }
              ]}
              onCollectedAll={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Match Labels",
          title: "Match AI Labels to Visual Features",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: 'Red Octagon Shape', right: 'Stop Sign (Halt)' },
                { id: 'm2', left: 'Yellow Diamond Shape', right: 'Caution / Warning' },
                { id: 'm3', left: 'Green Circle Light', right: 'Safe to Proceed (Go)' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C4Ch1S6Proximity(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Proximity Safety & Emergency Braking"
      lessonSubtitle="Preventing Collisions with Smart Logic"
      simpleDefinition="Emergency braking systems constantly check distance measurements. If an obstacle gets closer than the minimum safety margin, the AI automatically applies the brakes."
      smallExample="Modern cars automatically stop if a pedestrian walks in front while parking."
      oneWordPoint={{ question: "What happens when an obstacle is too close?", answer: "Emergency Brake" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Safe Distance Buffer', text: 'Maintains at least 2 meters of clear room.' },
        { icon: Clock, title: 'Instant Reflex', text: 'Brakes apply within 50 milliseconds.' },
        { icon: AlertTriangle, title: 'Hazard Alert', text: 'Sounds a warning chime to alert nearby people.' }
      ]}
      aiDialogue="Safety is rule number 1! Let's calibrate Nova Rover's proximity radar and test its emergency brake!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Safety Buffer Tuner",
          title: "Calibrate Safe Braking Distance",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Proximity Safety Threshold"
              description="Set minimum emergency brake threshold between 2.0m and 3.5m."
              min={0.5}
              max={6.0}
              step={0.5}
              unit="m"
              targetRange={[2.0, 3.5]}
              optimalLabel="Safety Buffer Calibrated"
              suboptimalLabel="Unsafe! Buffer must be 2.0m - 3.5m"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Emergency Sequence",
          title: "Order the Collision Prevention Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'p1', label: '1. Sensor detects obstacle under 2m', detail: 'Proximity alert' },
                { id: 'p2', label: '2. Cut motor power and engage brake', detail: 'Immediate halt' },
                { id: 'p3', label: '3. Sound audio chime and recalculate path', detail: 'Recovery' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'p1' && ids[1] === 'p2' && ids[2] === 'p3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Safety Audit",
          title: "Inspect Safety Features on Nova Rover",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Rover Safety Checklist"
              prompt="Discover all 3 safety safeguards on Nova Rover."
              hotspots={[
                { id: 's1', label: 'Soft Silicone Front Bumper', icon: <Shield size={14} className="text-emerald-600" />, explanation: 'Cushions unexpected low-speed contact.' },
                { id: 's2', label: 'LED Hazard Headlights', icon: <Sun size={14} className="text-emerald-600" />, explanation: 'Flashes bright amber to signal pedestrians.' },
                { id: 's3', label: 'Dual Emergency Disk Brakes', icon: <DiscBrakes size={14} className="text-emerald-600" />, explanation: 'Locks wheels instantly on slope or hazard.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function DiscBrakes(props: any) {
  return <Sliders {...props} />
}

function C4Ch1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title="Chapter 1 Capstone: Smart City Explorer"
      lessonSubtitle="Putting All Skills Together"
      simpleDefinition="You have mastered sensors, navigation, signal wiring, classification, and proximity safety! Now run the full autonomous mission across the smart city."
      smallExample="Nova Rover delivers medical supplies across town completely autonomously."
      oneWordPoint={{ question: "What enables full robot autonomy?", answer: "Integrated AI System" }}
      keyPoints={[
        { icon: Award, title: 'Integrated Perception', text: 'Combines vision, audio, and lidar data.' },
        { icon: Navigation, title: 'End-to-End Route', text: 'Drives from starting dock to final clinic.' },
        { icon: ShieldCheck, title: 'Zero Collisions', text: 'Protects all pedestrians with 100% safety.' }
      ]}
      aiDialogue="Congratulations explorer! Complete these 3 final capstone challenges to earn your Chapter 1 Explorer Badge!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Final Matcher",
          title: "Match System Components to Functions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cp1', left: 'Camera & Lidar', right: 'Perception & Sensing' },
                { id: 'cp2', left: 'CPU Neural Core', right: 'Decision & Path Planning' },
                { id: 'cp3', left: 'Motor Actuators', right: 'Physical Motion & Steering' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Full Mission Code",
          title: "Assemble Complete Expedition Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Full Expedition Launch Script"
              instruction="Assemble the complete 4-step mission program."
              availableBlocks={[
                { id: 'm1', text: 'InitializeSensors()' },
                { id: 'm2', text: 'LoadCityMap()' },
                { id: 'm3', text: 'ExecuteDeliveryRoute()' },
                { id: 'm4', text: 'DockAtCharger()' }
              ]}
              targetSequence={['m1', 'm2', 'm3', 'm4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Mission Sorter",
          title: "Verify Mission Telemetry vs Anomalies",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'm_ok1', label: 'Battery 95% Charged', bin: 'A' },
                { id: 'm_err1', label: 'Lidar Sensor Disconnected', bin: 'B' },
                { id: 'm_ok2', label: 'GPS Satellite Locked', bin: 'A' },
                { id: 'm_err2', label: 'Tire Pressure Low Alert', bin: 'B' }
              ]}
              binALabel="Mission Normal (Go)"
              binBLabel="Telemetry Fault (Hold)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 2: THE ART OF PROMPTING & GIVING GOOD INSTRUCTIONS
// =============================================================================

function Class4Chapter2PromptWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title={props.canonicalSection?.title || `Chapter 2: The Art of Prompting · Section ${sectionIdx + 1}`}
      lessonSubtitle="Clear Instructions for Smart AI"
      simpleDefinition="A prompt is a clear instruction you give to an AI. When your prompt includes context, specific details, and the desired format, the AI gives high-quality, helpful answers!"
      smallExample="Instead of 'draw animal', prompt: 'Draw a friendly golden retriever wearing a blue astronaut helmet in cartoon style.'"
      oneWordPoint={{ question: "What is an instruction to an AI called?", answer: "Prompt" }}
      keyPoints={[
        { icon: MessageSquare, title: 'Context & Role', text: 'Tell the AI who it is (e.g. "Act as a science tutor").' },
        { icon: Sparkles, title: 'Specific Details', text: 'Add length, tone, grade level, and topics.' },
        { icon: CheckSquare, title: 'Desired Format', text: 'Request bullet points, a poem, or a table.' },
        { icon: RotateCcw, title: 'Iterative Refinement', text: 'Ask follow-up questions to improve the answer.' }
      ]}
      aiDialogue="Welcome to the Prompt Studio! Dr. Ada will teach you how to write super-clear prompts that unlock the best AI answers!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Prompt Quality Sorter",
          title: "Sort Clear Prompts vs Vague Prompts",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'p1', label: '"Write a 3-sentence poem about Mars for 4th graders"', bin: 'A' },
                { id: 'p2', label: '"Write something"', bin: 'B', hint: 'Way too vague! No topic or length.' },
                { id: 'p3', label: '"Explain photosynthesis in 4 simple bullet points"', bin: 'A' },
                { id: 'p4', label: '"Help me"', bin: 'B', hint: 'Needs specific subject and context.' }
              ]}
              binALabel="Clear & Detailed Prompt"
              binBLabel="Vague / Weak Prompt"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Prompt Block Builder",
          title: "Assemble the Golden Prompt Structure",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Structured Prompt Formula"
              instruction="Assemble the 3 components of a golden prompt in logical order."
              availableBlocks={[
                { id: 'pb1', text: 'Role: [Act as a Math Tutor]' },
                { id: 'pb2', text: 'Task: [Explain fractions with pizza slices]' },
                { id: 'pb3', text: 'Format: [Use 3 bullet points]' }
              ]}
              targetSequence={['pb1', 'pb2', 'pb3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Prompt Matcher",
          title: "Match Prompts to Best AI Output Styles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pm1', left: '"Summarize in 3 bullet points"', right: 'Short concise list' },
                { id: 'pm2', left: '"Write a dialogue between two astronauts"', right: 'Conversational script' },
                { id: 'pm3', left: '"Create a 4-step recipe with measurements"', right: 'Ordered instructions' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 3: SMART MOBILITY & SELF-DRIVING VEHICLES
// =============================================================================

function Class4Chapter3MobilityWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title={props.canonicalSection?.title || `Chapter 3: Smart Mobility · Section ${sectionIdx + 1}`}
      lessonSubtitle="Autonomous Cars & Drone Delivery"
      simpleDefinition="Self-driving vehicles use machine learning to perceive roads, predict where other cars and pedestrians will move, and steer with microsecond precision."
      smallExample="An autonomous delivery drone drops a package on a backyard lawn using GPS and optical cameras."
      oneWordPoint={{ question: "What guides delivery drones in the sky?", answer: "GPS & Vision" }}
      keyPoints={[
        { icon: Navigation, title: 'Road Segmentation', text: 'Identifies lanes, curbs, and sidewalk borders.' },
        { icon: Eye, title: 'Object Tracking', text: 'Keeps track of moving cars and cyclists.' },
        { icon: ShieldCheck, title: 'Failsafe Redundancy', text: 'Has backup computers in case one fails.' }
      ]}
      aiDialogue="Welcome to Smart Mobility! Let's examine how self-driving cars navigate city streets safely!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Mobility Sorter",
          title: "Classify Ground Rover vs Sky Drone Features",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'm1', label: 'Tire Traction & Anti-Lock Brakes', bin: 'A' },
                { id: 'm2', label: 'Propeller Altitude Control', bin: 'B' },
                { id: 'm3', label: 'Crosswalk Stop Sensors', bin: 'A' },
                { id: 'm4', label: 'Wind Turbulence Compensator', bin: 'B' }
              ]}
              binALabel="Ground Autonomous Car"
              binBLabel="Sky Delivery Drone"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Altitude Calibrator",
          title: "Tune Drone Safe Flight Corridor",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Drone Delivery Cruise Altitude"
              description="Tune altitude between 40m and 80m to fly safely above trees and houses."
              min={10}
              max={150}
              unit="m"
              targetRange={[40, 80]}
              optimalLabel="Safe Drone Flight Corridor Locked"
              suboptimalLabel="Unsafe Altitude! Target: 40m - 80m"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Traffic Safety Scanner",
          title: "Discover 3 Autonomous Car Safety Systems",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Autonomous Vehicle Safety Systems"
              prompt="Inspect all 3 primary safety systems on the smart vehicle."
              hotspots={[
                { id: 'as1', label: 'Front Radar Radar', icon: <Radio size={14} className="text-indigo-600" />, explanation: 'Sees through rain and fog when optical cameras are blinded.' },
                { id: 'as2', label: 'Lane Departure Cameras', icon: <Eye size={14} className="text-indigo-600" />, explanation: 'Tracks white and yellow lane stripes to stay centered.' },
                { id: 'as3', label: 'Blind Spot Side Sonar', icon: <Sliders size={14} className="text-indigo-600" />, explanation: 'Detects cars changing lanes next to the vehicle.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 4: AI IN DAILY JOBS & HUMAN-AI COLLABORATION
// =============================================================================

function Class4Chapter4CareerWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title={props.canonicalSection?.title || `Chapter 4: AI in Daily Jobs · Section ${sectionIdx + 1}`}
      lessonSubtitle="How Humans & AI Work as a Team"
      simpleDefinition="AI tools assist doctors, teachers, farmers, and pilots by handling heavy calculations and routine work, while humans provide empathy, creativity, and moral judgment."
      smallExample="A doctor uses AI to highlight suspicious spots on X-rays, then decides on the best medicine for the patient."
      oneWordPoint={{ question: "What do humans bring that AI lacks?", answer: "Empathy & Morals" }}
      keyPoints={[
        { icon: UserCheck, title: 'Medical Assistance', text: 'AI reads scans; human doctors care for patients.' },
        { icon: Droplet, title: 'Smart Farming', text: 'Drones monitor crop moisture to save water.' },
        { icon: BookOpen, title: 'Personalized Education', text: 'Adapts math exercises to each student\'s pace.' }
      ]}
      aiDialogue="AI is a powerful teammate! Let's explore how doctors, farmers, and creators collaborate with AI tools."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Role Sorter",
          title: "Sort Human Strengths vs AI Strengths",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'r1', label: 'Empathy & Emotional Comfort', bin: 'A' },
                { id: 'r2', label: 'Processing 10,000 Data Rows in 1s', bin: 'B' },
                { id: 'r3', label: 'Ethical Moral Decisions', bin: 'A' },
                { id: 'r4', label: 'Scanning X-Rays for Pixel Anomalies', bin: 'B' }
              ]}
              binALabel="Human Strength"
              binBLabel="AI Computational Strength"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Career Matcher",
          title: "Match AI Assistant Tools to Professions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cp1', left: 'Medical X-Ray Scanner', right: 'Doctor / Radiologist' },
                { id: 'cp2', left: 'Soil Moisture Satellite', right: 'Organic Farmer' },
                { id: 'cp3', left: 'Autopilot Route Optimizer', right: 'Commercial Airline Pilot' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Collaboration Pipeline",
          title: "Sequence Doctor-AI Teamwork Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'w1', label: '1. Patient takes diagnostic medical scan', detail: 'Imaging' },
                { id: 'w2', label: '2. AI highlights potential areas of concern', detail: 'Pattern analysis' },
                { id: 'w3', label: '3. Human doctor evaluates findings and prescribes care', detail: 'Medical decision' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'w1' && ids[1] === 'w2' && ids[2] === 'w3') {
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

// =============================================================================
// CHAPTER 5: CREATIVE STUDIO & AI ART/MUSIC HELPERS
// =============================================================================

function Class4Chapter5StudioWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title={props.canonicalSection?.title || `Chapter 5: Creative Studio · Section ${sectionIdx + 1}`}
      lessonSubtitle="Generating Art, Music & Stories"
      simpleDefinition="Generative AI creates new images, melodies, and stories based on patterns it learned from millions of human artworks. It turns written prompts into vibrant creative drafts!"
      smallExample="Typing 'a magical watercolor castle on a floating island' creates an instant concept art painting."
      oneWordPoint={{ question: "What is AI that makes new content called?", answer: "Generative AI" }}
      keyPoints={[
        { icon: Palette, title: 'Diffusion Models', text: 'Starts with noise pixels and clears them into sharp art.' },
        { icon: Volume2, title: 'Music Synthesizers', text: 'Generates harmonies, rhythms, and instrument tracks.' },
        { icon: BookOpen, title: 'Story Co-Writing', text: 'Suggests exciting plot twists and character dialogues.' }
      ]}
      aiDialogue="Welcome to the Creative Art Studio! Let's discover how generative AI helps artists sketch, compose, and write!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Art Style Sorter",
          title: "Classify Art Mediums in Generative Prompts",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'a1', label: '"Soft pastel watercolor with bleeding brush edges"', bin: 'A' },
                { id: 'a2', label: '"3D glossy claymation character with studio lighting"', bin: 'B' },
                { id: 'a3', label: '"Classic oil painting with visible canvas texture"', bin: 'A' },
                { id: 'a4', label: '"Low-poly 3D isometric video game model"', bin: 'B' }
              ]}
              binALabel="2D Painterly Medium"
              binBLabel="3D Render / Sculpture"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Art Prompt Assembler",
          title: "Assemble an Expressive Visual Art Prompt",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Creative Art Prompt Formula"
              instruction="Assemble the subject, style, and lighting into a cohesive prompt."
              availableBlocks={[
                { id: 'ap1', text: 'Subject: [A cybernetic snow leopard]' },
                { id: 'ap2', text: 'Style: [Studio Ghibli anime style]' },
                { id: 'ap3', text: 'Lighting: [Golden hour sunset glow]' }
              ]}
              targetSequence={['ap1', 'ap2', 'ap3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Music Element Matcher",
          title: "Match Musical Terms to Sound Properties",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'mu1', left: 'Tempo (BPM)', right: 'Speed of the musical beat' },
                { id: 'mu2', left: 'Timbre', right: 'Unique voice texture of an instrument' },
                { id: 'mu3', left: 'Harmony', right: 'Multiple notes blending together' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 6: THE AI GUARDIAN & SAFE ONLINE HABITS
// =============================================================================

function Class4Chapter6GuardianWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 4 · Story Lab"
      title={props.canonicalSection?.title || `Chapter 6: The AI Guardian · Section ${sectionIdx + 1}`}
      lessonSubtitle="Privacy, Safety & Digital Ethics"
      simpleDefinition="Being a smart digital citizen means never sharing private personal info (like your full name, passwords, or home address) with AI bots, and always verifying facts from trusted books."
      smallExample="If an AI writes an essay about space, check a science encyclopedia to make sure the planet facts are 100% accurate."
      oneWordPoint={{ question: "What should you NEVER share with AI bots?", answer: "Private Passwords" }}
      keyPoints={[
        { icon: Shield, title: 'Personal Privacy', text: 'Keep passwords, phone numbers, and home addresses secret.' },
        { icon: Search, title: 'Fact Checking', text: 'AI can hallucinate (make mistakes); always verify facts.' },
        { icon: UserCheck, title: 'Kindness Online', text: 'Use digital tools to help and inspire others.' }
      ]}
      aiDialogue="The AI Guardian is here! Let's learn essential digital privacy and safe online habits to protect ourselves and our friends!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Privacy Sorter",
          title: "Sort Safe Info vs Private Secret Info",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'pr1', label: 'Favorite Favorite Color (Blue)', bin: 'A' },
                { id: 'pr2', label: 'Home Street Address & Door Keycode', bin: 'B', hint: 'Never share home addresses!' },
                { id: 'pr3', label: 'Favorite Animal (Dolphin)', bin: 'A' },
                { id: 'pr4', label: 'Account Password and Birthday PIN', bin: 'B', hint: 'Keep passwords strictly private!' }
              ]}
              binALabel="Safe to Share with AI"
              binBLabel="Private Secret (NEVER Share)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Fact-Check Validator",
          title: "Identify Trustworthy Fact Verification Steps",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'fc1', label: '1. Read surprising fact generated by AI', detail: 'Discovery' },
                { id: 'fc2', label: '2. Check library book or official science website', detail: 'Verification' },
                { id: 'fc3', label: '3. Confirm fact is accurate before sharing', detail: 'Truth verified' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'fc1' && ids[1] === 'fc2' && ids[2] === 'fc3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Guardian Shield Scanner",
          title: "Inspect 3 Digital Defense Shields",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Cyber Guardian Protection Shields"
              prompt="Inspect all 3 privacy defense shields on your guardian console."
              hotspots={[
                { id: 'g1', label: 'Strong Password Vault', icon: <Lock size={14} className="text-indigo-600" />, explanation: 'Uses 12+ characters with numbers, symbols, and letters.' },
                { id: 'g2', label: 'Camera Privacy Shutter', icon: <Camera size={14} className="text-indigo-600" />, explanation: 'Physically covers webcam when not in a school class.' },
                { id: 'g3', label: 'Encrypted Data Channel', icon: <ShieldCheck size={14} className="text-indigo-600" />, explanation: 'Scrambles messages so hackers cannot read private files.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}
