import React, { useState } from 'react'
import {
  Puzzle, Key, Lock, Unlock, CheckCircle2, ChevronRight, Play,
  Sparkles, Star, Zap, Layers, RefreshCw, Trophy, Eye, Cpu,
  Sliders, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Shield, Check,
  Camera, Mic, Volume2, Lightbulb, Compass, Award, Laptop, Home,
  School, BookOpen, Clock, Activity, Terminal, HelpCircle, Palette,
  Flame, ShieldAlert, UserCheck, AlertTriangle, Sun, Moon,
  Thermometer, User, Shuffle, Grid, RotateCcw, Target, Navigation,
  Send, CheckSquare, ShieldCheck, Heart, Radio, Droplet, Wrench,
  MessageSquare, Search
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
// CLASS 5 PUZZLE WORLD DISPATCHER (NEON LOGIC & PUZZLE LAB)
// Unique Theme: Glowing Logic Jigsaws · Cybernetic Cyan & Violet · Logic Gates
// =============================================================================

export const Class5PuzzleWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class5Chapter2LogicWorld {...props} />
    case 3:
      return <Class5Chapter3HospitalWorld {...props} />
    case 4:
      return <Class5Chapter4FutureWorld {...props} />
    case 5:
      return <Class5Chapter5StudioWorld {...props} />
    case 6:
      return <Class5Chapter6EthicsWorld {...props} />
    default:
      return <Class5Chapter1SecretWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: THE SECRET BEHIND AI & LEARNING MACHINES
// =============================================================================

function Class5Chapter1SecretWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C5Ch1S2Jigsaw {...props} />
  if (sectionIdx === 2) return <C5Ch1S3TrainingLab {...props} />
  if (sectionIdx === 3) return <C5Ch1S4PatternWiring {...props} />
  if (sectionIdx === 4) return <C5Ch1S5Conveyor {...props} />
  if (sectionIdx === 5) return <C5Ch1S6LogicGates {...props} />
  if (sectionIdx === 6) return <C5Ch1S7Capstone {...props} />
  return <C5Ch1S2Jigsaw {...props} />
}

function C5Ch1S2Jigsaw(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="The Three Pillars of Artificial Intelligence"
      lessonSubtitle="Input, Neural Processing, and Output"
      simpleDefinition="Every AI system is composed of three interconnected pillars: Input Sensors that gather raw information, Machine Learning Algorithms that discover patterns, and Actuator Outputs that take smart actions."
      smallExample="A smart thermostat reads room temperature (Input), calculates cooling needs (Processing), and powers on the AC (Output)."
      oneWordPoint={{ question: "What is the middle pillar of AI?", answer: "Machine Learning" }}
      keyPoints={[
        { icon: Eye, title: 'Input Layer', text: 'Feeds raw images, text, and sensor readings into the system.' },
        { icon: Cpu, title: 'Learning Algorithm', text: 'Identifies complex patterns and weights mathematical nodes.' },
        { icon: Zap, title: 'Output Action', text: 'Generates text answers, moves robotic arms, or triggers alerts.' },
        { icon: RefreshCw, title: 'Feedback Loop', text: 'Updates algorithm weights when mistakes occur.' }
      ]}
      aiDialogue="Welcome to the Neon Logic Lab! I am Aura. Let's solve the 3 puzzle pillars of AI and test your knowledge across 3 interactive challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Pillar Connect",
          title: "Match AI Stages to Real Hardware Functions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Input Layer', right: 'Microphone & Digital Camera' },
                { id: 'p2', left: 'Processing Core', right: 'Deep Neural Network Model' },
                { id: 'p3', left: 'Output Layer', right: 'Speaker Voice & Motor Actuators' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Logic Pipeline",
          title: "Sequence the 3-Pillar Data Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 's1', label: '1. Ingest camera video stream', detail: 'Input Stage' },
                { id: 's2', label: '2. Run neural object recognition inference', detail: 'Processing Stage' },
                { id: 's3', label: '3. Highlight identified objects on screen', detail: 'Output Stage' }
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
          badge: "Game 3 · Jigsaw Scanner",
          title: "Inspect 3 Modules Inside the Logic Unit",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Neural Processing Unit Inspection"
              prompt="Inspect all 3 core sub-units inside the logic processing core."
              hotspots={[
                { id: 'u1', label: 'Input Preprocessor', icon: <Camera size={14} className="text-teal-600" />, explanation: 'Normalizes and cleans raw sensor inputs.' },
                { id: 'u2', label: 'Weight Matrix Array', icon: <Layers size={14} className="text-teal-600" />, explanation: 'Multiplies input values by learned mathematical weights.' },
                { id: 'u3', label: 'Decision Classifier', icon: <CheckCircle2 size={14} className="text-teal-600" />, explanation: 'Selects the highest probability output category.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C5Ch1S3TrainingLab(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="Training Data & Machine Learning"
      lessonSubtitle="How AI Learns from Examples"
      simpleDefinition="Unlike standard computer programs written with fixed rules, machine learning models learn by studying thousands of labeled examples until they discover the underlying patterns themselves."
      smallExample="Showing an AI 5,000 photos of apples and oranges teaches it to tell them apart by color and peel texture."
      oneWordPoint={{ question: "What does AI need to learn patterns?", answer: "Training Data" }}
      keyPoints={[
        { icon: Layers, title: 'Labeled Data', text: 'Photos or texts marked with the correct answer.' },
        { icon: RefreshCw, title: 'Training Epochs', text: 'Repeating cycles that adjust mathematical weights.' },
        { icon: ShieldCheck, title: 'Validation Testing', text: 'Testing the model on unseen photos to verify accuracy.' }
      ]}
      aiDialogue="Let's step into the Training Data Lab! Curate datasets, calibrate training epochs, and evaluate model performance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Dataset Curator",
          title: "Collect Valid Fruit Training Samples",
          render: (onPass) => (
            <DataCollectorGrid
              title="Train Fruit Vision Classifier"
              goalPrompt="Select 3 high-quality fruit photos (avoid blurry or non-fruit images)."
              targetCount={3}
              tokens={[
                { id: 'f1', label: 'Crisp Red Gala Apple', isValid: true, icon: <Sparkles size={14} /> },
                { id: 'f2', label: 'Ripe Yellow Banana', isValid: true, icon: <Sparkles size={14} /> },
                { id: 'f3', label: 'Blurry Photo of a Shoe', isValid: false, icon: <AlertTriangle size={14} /> },
                { id: 'f4', label: 'Fresh Orange Citrus', isValid: true, icon: <Sparkles size={14} /> },
                { id: 'f5', label: 'Plastic Toy Car', isValid: false, icon: <HelpCircle size={14} /> }
              ]}
              onCollectedAll={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Accuracy Tuner",
          title: "Calibrate Training Epochs to Reach 95%+ Accuracy",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Training Epoch Cycles"
              description="Tune training iterations between 40 and 60 epochs for optimal fit."
              min={10}
              max={100}
              unit=" Epochs"
              targetRange={[40, 60]}
              optimalLabel="Model Convergence Reached (96.4% Accuracy)"
              suboptimalLabel="Underfit or Overfit! Optimal: 40 - 60 Epochs"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Data Type Sorter",
          title: "Classify Supervised vs Unsupervised Data",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'd1', label: 'Photos labeled with "Cat" and "Dog"', bin: 'A' },
                { id: 'd2', label: 'Unlabeled customer shopping clusters', bin: 'B' },
                { id: 'd3', label: 'Audio recordings tagged with transcripts', bin: 'A' },
                { id: 'd4', label: 'Raw sensor anomalies grouped by similarity', bin: 'B' }
              ]}
              binALabel="Supervised (Labeled)"
              binBLabel="Unsupervised (Unlabeled)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C5Ch1S4PatternWiring(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="Pattern Recognition Circuits"
      lessonSubtitle="Connecting Mathematical Synapses"
      simpleDefinition="Neural networks connect artificial neurons in layers. When an input feature triggers a neuron, it passes electrical weight signals forward across the circuit network."
      smallExample="A handwritten digit recognizer activates top-loop neurons when it sees the number '8'."
      oneWordPoint={{ question: "What connects artificial neurons?", answer: "Weights (Synapses)" }}
      keyPoints={[
        { icon: Activity, title: 'Neuron Activation', text: 'Fires when input signal exceeds threshold.' },
        { icon: Layers, title: 'Hidden Layers', text: 'Extracts edges, textures, shapes, and complex parts.' },
        { icon: Zap, title: 'Synaptic Weights', text: 'Controls the strength of connection between neurons.' }
      ]}
      aiDialogue="Time to connect synaptic wires! Let's route signals through input, hidden, and output neuron layers."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Synaptic Bus",
          title: "Wire Feature Detectors to Output Neurons",
          render: (onPass) => (
            <CircuitWireStation
              title="Feature-to-Class Neural Bus"
              instruction="Wire extracted visual features to their correct class recognition nodes."
              terminals={[
                { id: 't_wh', label: 'Circular Wheels Feature', icon: <Sliders size={12} /> },
                { id: 't_wg', label: 'Aerodynamic Wings Feature', icon: <Navigation size={12} /> },
                { id: 't_bk', label: 'Pointed Beak Feature', icon: <Eye size={12} /> }
              ]}
              ports={[
                { id: 'p_car', label: 'Class Node: Automobile', matchesTerminalId: 't_wh' },
                { id: 'p_plane', label: 'Class Node: Airplane', matchesTerminalId: 't_wg' },
                { id: 'p_bird', label: 'Class Node: Bird', matchesTerminalId: 't_bk' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Synapse Sorter",
          title: "Sort Neural Network Layer Types",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'l1', label: 'Raw pixel matrix array (128x128)', bin: 'A' },
                { id: 'l2', label: 'Edge detection & texture convolution', bin: 'B' },
                { id: 'l3', label: 'Acoustic frequency spectrum input', bin: 'A' },
                { id: 'l4', label: 'Deep abstract shape representations', bin: 'B' }
              ]}
              binALabel="Input Layer"
              binBLabel="Hidden Representation Layer"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Synapse Repair",
          title: "Fix Zeroed-Out Neural Weight",
          render: (onPass) => (
            <BugRepairStation
              title="Dead Neuron Synapse"
              scenario="The airplane detector is failing because the wing feature weight was accidentally set to zero."
              faultyComponent="Synapse weight W_wing = 0.00 (Disconnected)"
              repairOptions={[
                { id: 'r1', label: 'Delete the entire network', isCorrect: false, explanation: 'Unnecessary loss of trained model.' },
                { id: 'r2', label: 'Re-calibrate Synapse Weight to W_wing = +0.85', isCorrect: true, explanation: 'Synapse active! Airplane detection confidence restored to 99%.' },
                { id: 'r3', label: 'Lower camera brightness', isCorrect: false, explanation: 'Brightness has no effect on weight value.' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C5Ch1S5Conveyor(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="High-Speed Sorting Automation"
      lessonSubtitle="Industrial Computer Vision"
      simpleDefinition="In smart factories, high-speed cameras snap photos of items on conveyor belts at 60 frames per second. The AI detects defects and triggers robotic arms to sort items into bins."
      smallExample="Recycling plant machines automatically separate plastic bottles from aluminum cans in real time."
      oneWordPoint={{ question: "What is factory vision inspection called?", answer: "Machine Vision" }}
      keyPoints={[
        { icon: Clock, title: 'Real-time Latency', text: 'Decisions must happen in under 20 milliseconds.' },
        { icon: Eye, title: 'Defect Detection', text: 'Identifies cracks, scratches, and missing labels.' },
        { icon: Sliders, title: 'Pneumatic Sorting', text: 'Air jets blow defective items into recycle bins.' }
      ]}
      aiDialogue="Welcome to the Industrial Automation line! Let's calibrate high-speed sorting and eliminate defective parts!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Factory Sorter",
          title: "Classify Quality vs Defective Factory Parts",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'it1', label: 'Pristine Glass Solar Panel (No Cracks)', bin: 'A' },
                { id: 'it2', label: 'Chipped Circuit Board Corner', bin: 'B', hint: 'Hardware defect!' },
                { id: 'it3', label: 'Properly Sealed Medicine Bottle', bin: 'A' },
                { id: 'it4', label: 'Cracked Gear with Missing Tooth', bin: 'B', hint: 'Mechanical flaw!' }
              ]}
              binALabel="Quality Pass (Ship)"
              binBLabel="Defective (Recycle)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Conveyor Speed Tuner",
          title: "Calibrate Belt Speed for 100% Inspection Accuracy",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Conveyor Belt Velocity"
              description="Adjust belt speed between 30 and 45 cm/s so cameras can capture crisp frames."
              min={10}
              max={80}
              unit=" cm/s"
              targetRange={[30, 45]}
              optimalLabel="Optimal Frame Shutter Synchronization Achieved"
              suboptimalLabel="Motion Blur or Too Slow! Target: 30 - 45 cm/s"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Inspection Scanner",
          title: "Inspect 3 Vision Stations on the Assembly Line",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Industrial Inspection Gantry"
              prompt="Inspect all 3 machine vision stations along the factory conveyor."
              hotspots={[
                { id: 'vs1', label: 'High-Speed Ring Strobe Light', icon: <Sun size={14} className="text-teal-600" />, explanation: 'Freezes fast motion with 1/10000s microsecond flash.' },
                { id: 'vs2', label: 'Telecentric Optical Lens', icon: <Eye size={14} className="text-teal-600" />, explanation: 'Eliminates perspective distortion for sub-millimeter measurements.' },
                { id: 'vs3', label: 'High-Speed Air Ejector Valve', icon: <Zap size={14} className="text-teal-600" />, explanation: 'Fires 10ms compressed air pulse to sort defective parts.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C5Ch1S6LogicGates(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="Boolean Logic Gates & Decision Trees"
      lessonSubtitle="AND, OR, NOT Logic Fundamentals"
      simpleDefinition="Computer decision-making is built on Boolean logic. AND gates require all conditions to be true, OR gates require at least one condition, and NOT gates reverse the input state."
      smallExample="A car starts only when (Key Detected AND Brake Pressed)."
      oneWordPoint={{ question: "Which gate needs all inputs TRUE?", answer: "AND Gate" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'AND Gate', text: 'Output TRUE only if Input A AND Input B are TRUE.' },
        { icon: Shuffle, title: 'OR Gate', text: 'Output TRUE if either Input A OR Input B is TRUE.' },
        { icon: RotateCcw, title: 'NOT Gate', text: 'Inverts TRUE to FALSE, and FALSE to TRUE.' }
      ]}
      aiDialogue="Let's build logical reasoning circuits! Master AND, OR, and NOT gates to construct intelligent decision rules!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Logic Gate Matcher",
          title: "Match Logic Operators to Truth Conditions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'g1', left: 'AND Gate (A & B)', right: 'Both inputs must be TRUE' },
                { id: 'g2', left: 'OR Gate (A | B)', right: 'At least one input is TRUE' },
                { id: 'g3', left: 'NOT Gate (!A)', right: 'Flips input to opposite value' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Decision Rule Assembler",
          title: "Assemble Autonomous Driving Decision Rule",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Smart Brake Trigger Logic"
              instruction="Assemble the Boolean conditional expression for emergency braking."
              availableBlocks={[
                { id: 'c1', text: 'IF (ObstacleDistance < 2.0m)' },
                { id: 'c2', text: 'AND (VehicleSpeed > 0)' },
                { id: 'c3', text: 'THEN ApplyBrakes(100%)' }
              ]}
              targetSequence={['c1', 'c2', 'c3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Boolean Output Sorter",
          title: "Evaluate Boolean Logic Equations",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'b1', label: 'TRUE AND TRUE', bin: 'A' },
                { id: 'b2', label: 'TRUE AND FALSE', bin: 'B' },
                { id: 'b3', label: 'FALSE OR TRUE', bin: 'A' },
                { id: 'b4', label: 'NOT (TRUE)', bin: 'B' }
              ]}
              binALabel="Evaluates to TRUE (1)"
              binBLabel="Evaluates to FALSE (0)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C5Ch1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title="Chapter 1 Capstone: The Master Neural Machine"
      lessonSubtitle="Full Pipeline Integration"
      simpleDefinition="You have mastered the three pillars, training workflows, neural circuits, industrial vision, and Boolean decision gates. Now run the complete smart factory intelligence engine!"
      smallExample="A fully automated solar panel manufacturing plant operates with zero defects using end-to-end AI."
      oneWordPoint={{ question: "What connects all AI sub-systems?", answer: "Integrated Neural Architecture" }}
      keyPoints={[
        { icon: Award, title: 'End-to-End System', text: 'Integrates vision, logic, and motor actuation.' },
        { icon: Zap, title: 'Real-Time Telemetry', text: 'Processes 10,000 components per hour with 99.8% precision.' },
        { icon: Trophy, title: 'Mastery Certification', text: 'Unlocks advanced Class 5 logic engineering modules.' }
      ]}
      aiDialogue="Outstanding work! Complete the 3 final capstone challenges to earn your Master Logic Architect certification!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Capstone Matcher",
          title: "Match Architecture Layers to System Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cm1', left: 'Sensor Array', right: 'Input & Data Ingestion' },
                { id: 'cm2', left: 'Neural Processing Core', right: 'Feature Extraction & Classification' },
                { id: 'cm3', left: 'Robotic Actuators', right: 'Mechanical Sorting & Execution' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Full Factory Script",
          title: "Assemble Factory Automation Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Factory Master Control Script"
              instruction="Assemble the complete 4-step production loop."
              availableBlocks={[
                { id: 'f1', text: 'CaptureHighSpeedFrame()' },
                { id: 'f2', text: 'RunDefectClassification()' },
                { id: 'f3', text: 'RouteItemToTargetBin()' },
                { id: 'f4', text: 'LogProductionMetrics()' }
              ]}
              targetSequence={['f1', 'f2', 'f3', 'f4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Final Verification Sorter",
          title: "Verify Production System Health",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'v1', label: 'Neural Model Confidence: 99.4%', bin: 'A' },
                { id: 'v2', label: 'Camera Sensor Lens Dirty Alert', bin: 'B' },
                { id: 'v3', label: 'Pneumatic Pressure: Optimal (6.0 Bar)', bin: 'A' },
                { id: 'v4', label: 'Latency Exceeded 50ms Warning', bin: 'B' }
              ]}
              binALabel="System Operational (Pass)"
              binBLabel="Maintenance Required (Halt)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 2: LOGIC & REASONING PUZZLE LAB
// =============================================================================

function Class5Chapter2LogicWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title={props.canonicalSection?.title || `Chapter 2: Logic & Reasoning · Section ${sectionIdx + 1}`}
      lessonSubtitle="Decision Trees & Rule Engines"
      simpleDefinition="Rule-based expert systems use IF-THEN branching trees to diagnose problems, guide troubleshooting, and make logical inferences."
      smallExample="IF printer light is blinking red AND paper tray is empty THEN display 'Load Paper'."
      oneWordPoint={{ question: "What structure branches decisions?", answer: "Decision Tree" }}
      keyPoints={[
        { icon: GitBranch, title: 'Branching Nodes', text: 'Splits questions based on Yes/No conditions.' },
        { icon: ShieldCheck, title: 'Leaf Predictions', text: 'The final answer reached at the end of a path.' },
        { icon: Sliders, title: 'Tree Depth', text: 'Controls how many questions the AI asks before deciding.' }
      ]}
      aiDialogue="Welcome to Logic & Reasoning! Let's build and prune decision trees to solve diagnostic riddles!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Branch Sorter",
          title: "Classify Decision Tree Question Types",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'q1', label: '"Is temperature greater than 38°C?"', bin: 'A' },
                { id: 'q2', label: '"Diagnosed: Mild Fever (Prescribe Rest)"', bin: 'B' },
                { id: 'q3', label: '"Has patient experienced cough for > 3 days?"', bin: 'A' },
                { id: 'q4', label: '"Diagnosed: Common Cold"', bin: 'B' }
              ]}
              binALabel="Decision Split Question (Node)"
              binBLabel="Final Conclusion (Leaf)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Tree Depth Tuner",
          title: "Calibrate Decision Tree Max Depth",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Decision Tree Max Depth"
              description="Tune tree depth between 3 and 5 levels to avoid overfitting."
              min={1}
              max={12}
              unit=" Levels"
              targetRange={[3, 5]}
              optimalLabel="Optimal Decision Tree Complexity (Balanced)"
              suboptimalLabel="Underfit (<3) or Overfit (>5)! Optimal: 3 - 5"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Rule Assembler",
          title: "Assemble Diagnostic Logic Rule",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Device Troubleshooting Rule"
              instruction="Assemble the 3-step diagnostic logic rule in order."
              availableBlocks={[
                { id: 'r1', text: 'IF (BatteryLevel == 0)' },
                { id: 'r2', text: 'AND (ChargerConnected == FALSE)' },
                { id: 'r3', text: 'THEN Prompt("Connect Power Cable")' }
              ]}
              targetSequence={['r1', 'r2', 'r3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function GitBranch(props: any) {
  return <Layers {...props} />
}

// =============================================================================
// CHAPTER 3: AI IN HEALTHCARE & MEDICAL DISCOVERY
// =============================================================================

function Class5Chapter3HospitalWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title={props.canonicalSection?.title || `Chapter 3: Healthcare AI · Section ${sectionIdx + 1}`}
      lessonSubtitle="Medical Imaging & Drug Discovery"
      simpleDefinition="In healthcare, AI assists medical doctors by analyzing MRI scans, detecting early signs of disease, and simulating molecular structures to discover lifesaving medicines."
      smallExample="AI scans retinal eye photos in seconds to detect diabetic eye diseases years before vision loss."
      oneWordPoint={{ question: "What does AI analyze in radiology?", answer: "Medical Scans" }}
      keyPoints={[
        { icon: Eye, title: 'Radiology Vision', text: 'Highlights anomalies on CT scans and X-rays.' },
        { icon: Heart, title: 'ECG Heart Monitor', text: 'Alerts nurses when irregular heartbeats occur.' },
        { icon: Sparkles, title: 'Protein Folding', text: 'Predicts 3D shapes of proteins to design vaccines.' }
      ]}
      aiDialogue="Welcome to Healthcare AI! Discover how machine learning empowers doctors to save lives and discover medicines!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Medical Tool Matcher",
          title: "Match Healthcare AI Tools to Clinical Uses",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: 'CT Scan Neural Detector', right: 'Locating lung tissue anomalies' },
                { id: 'm2', left: 'Continuous ECG Monitor', right: 'Detecting cardiac arrhythmias' },
                { id: 'm3', left: 'Molecular Folding Simulator', right: 'Synthesizing novel antibiotics' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Clinical Protocol Sorter",
          title: "Sort AI Recommendations vs Doctor Responsibilities",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'c1', label: 'Highlight suspicious pixel clusters on X-Ray', bin: 'A' },
                { id: 'c2', label: 'Discuss treatment options empathetically with patient', bin: 'B' },
                { id: 'c3', label: 'Calculate probability risk score (e.g. 84%)', bin: 'A' },
                { id: 'c4', label: 'Perform surgical operation in operating theater', bin: 'B' }
              ]}
              binALabel="AI Analytical Role"
              binBLabel="Human Doctor Role"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Diagnostic Scanner",
          title: "Inspect 3 Clinical AI Safeguards",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Medical AI Safety Safeguards"
              prompt="Inspect all 3 clinical safeguards ensuring patient safety."
              hotspots={[
                { id: 'ms1', label: 'Doctor-in-the-Loop Sign-off', icon: <UserCheck size={14} className="text-teal-600" />, explanation: 'A licensed human physician must review and approve all AI diagnoses.' },
                { id: 'ms2', label: 'HIPAA Patient Privacy Vault', icon: <Lock size={14} className="text-teal-600" />, explanation: 'Anonymizes medical records so patient identities remain 100% confidential.' },
                { id: 'ms3', label: 'Confidence Threshold Filter', icon: <Sliders size={14} className="text-teal-600" />, explanation: 'Flags uncertain cases for priority specialist review.' }
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
// CHAPTER 4: FUTURE OF ROBOTICS & EXPLORATION
// =============================================================================

function Class5Chapter4FutureWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title={props.canonicalSection?.title || `Chapter 4: Future Robotics · Section ${sectionIdx + 1}`}
      lessonSubtitle="Mars Rovers, Ocean Gliders, and Humanoids"
      simpleDefinition="Frontier robotics combines multi-terrain mechanics with deep reinforcement learning. Robots explore extreme environments—like Mars craters and deep ocean trenches—where humans cannot easily survive."
      smallExample="The Perseverance rover uses AI to choose safe driving routes on Mars while Earth controllers are asleep."
      oneWordPoint={{ question: "Where does AI rover Perseverance explore?", answer: "Mars" }}
      keyPoints={[
        { icon: Navigation, title: 'Deep Space Autonomy', text: 'Handles 20-minute radio delays with self-driving AI.' },
        { icon: Droplet, title: 'Oceanic Submersibles', text: 'Maps uncharted hydrothermal vents under extreme pressure.' },
        { icon: Cpu, title: 'Bipedal Humanoids', text: 'Balances dynamic walking on uneven rubble.' }
      ]}
      aiDialogue="Welcome to Future Robotics! Let's configure exploration rovers and autonomous submersibles for extreme missions!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Frontier Matcher",
          title: "Match Robot Exploration Domains to Hardware Features",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'fr1', left: 'Mars Planetary Rover', right: 'Radiation-hardened CPU & Rock Drill' },
                { id: 'fr2', left: 'Deep Sea Submersible', right: 'Titanium pressure hull & Sonar' },
                { id: 'fr3', left: 'Warehouse Humanoid', right: 'Articulated fingers & LiDAR' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Martian Hazard Sorter",
          title: "Classify Martian Surface Hazards",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'h1', label: 'Flat Bedrock Plateau', bin: 'A' },
                { id: 'h2', label: 'Deep Sand Trap Dune', bin: 'B', hint: 'Wheels will spin and get stuck!' },
                { id: 'h3', label: 'Gentle 5° Soil Incline', bin: 'A' },
                { id: 'h4', label: 'Jagged Basalt Boulder Field', bin: 'B', hint: 'Severe tire puncture risk!' }
              ]}
              binALabel="Safe Rover Path"
              binBLabel="Hazardous Martian Terrain"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Deep Space Script",
          title: "Assemble Autonomous Rock Sampling Sequence",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Perseverance Sample Collection"
              instruction="Assemble the sample drilling protocol in order."
              availableBlocks={[
                { id: 'ds1', text: 'ScanTargetWithSpectrometer()' },
                { id: 'ds2', text: 'ExtendRoboticDrillArm()' },
                { id: 'ds3', text: 'SealSampleInTitaniumTube()' }
              ]}
              targetSequence={['ds1', 'ds2', 'ds3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 5: CREATIVE AI STUDIO & MULTIMODAL SYNTHESIS
// =============================================================================

function Class5Chapter5StudioWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title={props.canonicalSection?.title || `Chapter 5: Multimodal Synthesis · Section ${sectionIdx + 1}`}
      lessonSubtitle="Text-to-Image, Audio & Code Generation"
      simpleDefinition="Multimodal AI models understand and connect multiple types of media at once—such as reading a text prompt and generating a matching image, sound effect, or computer program."
      smallExample="Giving an AI an image of a handwritten math equation and asking it to write Python code that solves it."
      oneWordPoint={{ question: "What models process text, images, and audio together?", answer: "Multimodal AI" }}
      keyPoints={[
        { icon: Eye, title: 'Visual Embeddings', text: 'Converts images into mathematical coordinate vectors.' },
        { icon: MessageSquare, title: 'Text Semantics', text: 'Maps meaning of words into the same vector space.' },
        { icon: Sparkles, title: 'Cross-Attention', text: 'Blends text concepts directly into image diffusion layers.' }
      ]}
      aiDialogue="Step into the Multimodal Studio! Let's explore cross-modal embeddings and generative synthesis!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Modality Sorter",
          title: "Classify AI Modality Data Types",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'mo1', label: '1080p RGB Video Stream', bin: 'A' },
                { id: 'mo2', label: '44.1kHz Stereo WAV Audio', bin: 'B' },
                { id: 'mo3', label: 'PNG Photograph with Depth Map', bin: 'A' },
                { id: 'mo4', label: 'MIDI Musical Note Sequence', bin: 'B' }
              ]}
              binALabel="Visual Modality"
              binBLabel="Acoustic / Sound Modality"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Diffusion Noise Tuner",
          title: "Calibrate Diffusion Denoising Steps",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Image Generation Denoising Steps"
              description="Tune diffusion steps between 25 and 40 steps for crisp photorealism."
              min={5}
              max={60}
              unit=" Steps"
              targetRange={[25, 40]}
              optimalLabel="Optimal Image Clarity & Latency Balanced"
              suboptimalLabel="Blurry (<25) or Slow Latency (>40)! Optimal: 25 - 40"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Cross-Modal Matcher",
          title: "Match Text Prompts to Target Generated Outputs",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cm1', left: '"Cyberpunk city in pouring neon rain"', right: 'Dark glowing cityscape image' },
                { id: 'cm2', left: '"Acoustic classical guitar arpeggio"', right: 'Calm melodic instrumental audio' },
                { id: 'cm3', left: '"def calculate_factorial(n):"', right: 'Executable Python recursive code' }
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
// CHAPTER 6: ETHICAL AI & ALGORITHMIC FAIRNESS
// =============================================================================

function Class5Chapter6EthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 5 · Logic Lab"
      title={props.canonicalSection?.title || `Chapter 6: Algorithmic Fairness · Section ${sectionIdx + 1}`}
      lessonSubtitle="Bias Prevention & Responsible AI"
      simpleDefinition="Because AI learns from historical human data, it can accidentally inherit human biases and unfair stereotypes. AI developers must audit datasets to ensure fair treatment for everyone."
      smallExample="If a hiring AI was only trained on resumes from one group, developers must add diverse resumes so all qualified applicants have an equal chance."
      oneWordPoint={{ question: "What must we eliminate from training data?", answer: "Bias" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Dataset Diversity', text: 'Includes balanced examples from all backgrounds.' },
        { icon: Search, title: 'Algorithmic Auditing', text: 'Regularly tests models for unfair error disparities.' },
        { icon: UserCheck, title: 'Human Accountability', text: 'Humans remain responsible for the impact of AI systems.' }
      ]}
      aiDialogue="Ethics is the cornerstone of great engineering! Let's learn how to identify algorithmic bias and design fair AI systems!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Fairness Sorter",
          title: "Sort Fair Practices vs Biased Practices",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'f1', label: 'Testing speech AI on diverse international accents', bin: 'A' },
                { id: 'f2', label: 'Training facial recognition only on one skin tone', bin: 'B', hint: 'This causes severe bias and high error rates!' },
                { id: 'f3', label: 'Publishing model accuracy metrics transparently', bin: 'A' },
                { id: 'f4', label: 'Hiding known classification errors from the public', bin: 'B', hint: 'Unethical practice!' }
              ]}
              binALabel="Fair & Responsible AI Practice"
              binBLabel="Biased / Unethical Practice"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Bias Audit Pipeline",
          title: "Sequence the Responsible AI Audit Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'a1', label: '1. Audit training dataset for representation gaps', detail: 'Data Inspection' },
                { id: 'a2', label: '2. Measure false positive rates across demographic groups', detail: 'Fairness Testing' },
                { id: 'a3', label: '3. Re-balance weights and certify safety before release', detail: 'Ethical Approval' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'a1' && ids[1] === 'a2' && ids[2] === 'a3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Ethics Scanner",
          title: "Inspect 3 AI Ethical Principles",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Responsible AI Ethical Framework"
              prompt="Inspect all 3 core ethical pillars for responsible AI development."
              hotspots={[
                { id: 'ep1', label: 'Explainability & Transparency', icon: <Search size={14} className="text-teal-600" />, explanation: 'AI decisions must be understandable and explainable in human language.' },
                { id: 'ep2', label: 'Privacy & Data Protection', icon: <Lock size={14} className="text-teal-600" />, explanation: 'Personal user data must never be leaked or misused without consent.' },
                { id: 'ep3', label: 'Universal Inclusivity', icon: <UserCheck size={14} className="text-teal-600" />, explanation: 'AI technology must be accessible and beneficial to all communities.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}
