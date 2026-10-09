// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE STRUCTURED LESSON VIEW ENGINE (SMOOTH MULTI-SCREEN EXPERIENCE)
// Strictly implements the required 3-Screen Pedagogical Flow:
// Screen 1: What is it? / Core Concept → Simple Explanation & Meaning
//   [Next]
// Screen 2: Real-World Example → Prominent Topic-Specific Animated Illustration
//   [Next]
// Screen 3: How It Works → Topic-Bound 3-Step Process & Key Takeaway Points
//   [Next / Play Challenge]
// Features:
// - Dynamic topic-based active backgrounds for EVERY lesson
// - Zero unwanted text/letters on Screen 1
// - Large prominent Screen 2 SVG illustration (not a small icon)
// - Dynamic topic-bound "How It Works" steps for EVERY unique chapter
// - Smooth transitions, hover effects, subtle interactive movement
// - 100% single-viewport mobile containment with NO scrolling
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, BookOpen,
  Lightbulb, Cpu, Zap, Droplet, Shield, Radio, Activity,
  Layers, Lock, Sun, Globe, Binary, Terminal, Flame, Eye,
  Compass, Award, RefreshCw, ChevronRight, HelpCircle
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { TopicLessonIllustration } from '../primitives/TopicLessonIllustration'
import { AuraGuideAvatar } from '../primitives/AuraGuideAvatar'
import { Lesson1ConceptExperience } from './Lesson1ConceptExperience'
import { Lesson1RealWorldExampleExperience } from './Lesson1RealWorldExampleExperience'
import { Class3AuthenticBookExperience } from './Class3AuthenticBookExperience'
import { GaioInteractiveBookApp } from '../../gaio/GaioInteractiveBookApp'

export interface StructuredLessonContent {
  whatIsIt: string
  simpleMeaning: string
  example: string
  howItWorksSteps: { stepNumber: number; title: string; explanation: string }[]
  keyPoints: { title: string; text: string }[]
}

export interface SimpleStructuredLessonProps {
  gradeKey: string
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  sectionNumber: number
  structuredData?: StructuredLessonContent
  simpleDefinition?: string
  smallExample?: string
  keyPointsList?: { title: string; text: string }[]
  htmlContent?: string
  imageSrc?: string
  onStartInteractiveGame: () => void
  interactiveGameTitle?: string
}

/**
 * Generates bespoke topic-bound "How It Works" 3-step pipeline & takeaways based ONLY on the exact lesson topic.
 */
export function getTopicSpecificHowItWorks(topic: string = '', chapter: string = '', gradeKey: string = '') {
  const t = (topic + ' ' + chapter).toLowerCase()
  const matches = (pattern: RegExp) => pattern.test(t)

  // 1. SMART FARMING / AGRICULTURE
  if (matches(/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Scan Soil & Crops', explanation: 'Drones and ground sensors scan soil moisture, nutrients, and leaf health.' },
        { stepNumber: 2, title: '2. AI Diagnoses Needs', explanation: 'Smart algorithms calculate exact weather forecasts and thirst zones across fields.' },
        { stepNumber: 3, title: '3. Precision Water & Spray', explanation: 'Autonomous valves and mist drones deliver exact water and nutrients without waste.' },
      ],
      keyPoints: [
        { title: 'Water Conservation', text: 'Saves up to 40% more freshwater compared to traditional flood irrigation.' },
        { title: 'Early Plant Care', text: 'Detects fungal stress and dry patches days before visible wilting.' },
        { title: 'Bigger Harvests', text: 'Helps farmers produce healthier crops with minimal manual labor.' },
      ],
    }
  }

  // 2. AUTONOMOUS ROAD & VEHICLES
  if (matches(/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. 360° LiDAR & Vision', explanation: 'LiDAR radars, cameras, and ultrasonic sensors scan cars, lane lines, and people.' },
        { stepNumber: 2, title: '2. Predict Paths & Speeds', explanation: 'Deep learning neural models calculate object trajectories to prevent collisions.' },
        { stepNumber: 3, title: '3. Steer & Brake Safely', explanation: 'The drive computer controls steering, smooth braking, and traffic signal timing.' },
      ],
      keyPoints: [
        { title: 'Zero Blind Spots', text: 'Sensor arrays maintain full panoramic visibility in rain, night, and fog.' },
        { title: 'Instant Reflexes', text: 'Reacts to sudden road hazards in milliseconds to protect lives.' },
        { title: 'Smooth Traffic', text: 'Synchronizes with smart intersections to eliminate gridlock and delays.' },
      ],
    }
  }

  // 3. CYBER SAFETY & DEFENSE
  if (matches(/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|citizen|security)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Inspect Data & Packets', explanation: 'Security filters scan incoming network requests, user prompts, and file attachments.' },
        { stepNumber: 2, title: '2. Detect Threat Patterns', explanation: 'Anomaly detection algorithms spot suspicious payloads, phishing traps, and leaks.' },
        { stepNumber: 3, title: '3. Quarantine & Encrypt', explanation: 'Isolates infected files, scrambles private data with 256-bit AES, and locks vaults.' },
      ],
      keyPoints: [
        { title: 'Proactive Defense', text: 'Stops malicious intrusions before they reach private user databases.' },
        { title: 'Privacy Shield', text: 'Automatically scrubs personally identifiable information.' },
        { title: 'Safe Boundaries', text: 'Enforces ethical guardrails to keep AI helpful and safe for all.' },
      ],
    }
  }

  // 4. DATA INVESTIGATION & MACHINE LEARNING
  if (matches(/\b(datas?|patterns?|predict\w*|analytics?|learning machines?|intelligence|datasets?)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Collect & Clean Data', explanation: 'Ingests raw information, removes corrupted noise, and normalizes feature values.' },
        { stepNumber: 2, title: '2. Spot Mathematical Patterns', explanation: 'Maps high-dimensional numbers to find hidden correlations and boundaries.' },
        { stepNumber: 3, title: '3. Deliver Accurate Forecasts', explanation: 'Generates trustworthy predictions, classifications, and actionable insights.' },
      ],
      keyPoints: [
        { title: 'Clean Data Matters', text: 'High-quality training examples ensure AI models generalize accurately.' },
        { title: 'Feature Extraction', text: 'Identifies the most important clues automatically from large datasets.' },
        { title: 'Adaptive Learning', text: 'Continuously refines its accuracy as new authentic records arrive.' },
      ],
    }
  }

  // 5. NEURAL NETWORKS & DEEP LEARNING
  if (matches(/\b(neur\w*|synapses?|deep learning|gradients?|weights?|perceptrons?|backprop\w*)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Feed Input Signals', explanation: 'Numbers and features flow into input neurons and propagate forward through layers.' },
        { stepNumber: 2, title: '2. Adjust Synapse Weights', explanation: 'Backpropagation calculates prediction error and tunes connection strengths.' },
        { stepNumber: 3, title: '3. Non-Linear Activation', explanation: 'Neurons fire through activation functions like ReLU to output final decisions.' },
      ],
      keyPoints: [
        { title: 'Layered Wisdom', text: 'Deeper hidden layers learn increasingly complex concepts and textures.' },
        { title: 'Loss Minimization', text: 'Gradient descent tunes millions of weights to reduce errors to zero.' },
        { title: 'Pattern Mastery', text: 'Mimics biological brain networks to recognize faces, speech, and handwriting.' },
      ],
    }
  }

  // 6. LLMs & LANGUAGE TOKENS
  if (matches(/\b(llms?|prompts?|tokens?|transformers?|languages?|words?|story|chatbots?)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Chop into Sub-word Tokens', explanation: 'The tokenizer breaks user sentences into numbered word chunks and embeddings.' },
        { stepNumber: 2, title: '2. Multi-Head Self-Attention', explanation: 'Attention matrices weigh relationships between every pair of words in context.' },
        { stepNumber: 3, title: '3. Stream Next Best Words', explanation: 'Probability heads predict and stream coherent, fluent sentences sequentially.' },
      ],
      keyPoints: [
        { title: 'Context Awareness', text: 'Understands how word meanings shift based on surrounding sentences.' },
        { title: 'Vast Knowledge', text: 'Pre-trained across vast libraries of text to assist with diverse questions.' },
        { title: 'Clear Prompts', text: 'Structured, detailed prompts guide the model to generate optimal responses.' },
      ],
    }
  }

  // 7. MEDICAL & HEALTHCARE AI
  if (matches(/\b(hospitals?|health\w*|med\w*|doctors?|diseases?|cardiac|ecg|radiology|scans?)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Ingest Clinical Telemetry', explanation: 'Scans patient MRI imaging, ECG heartbeat waves, vitals, and lab markers.' },
        { stepNumber: 2, title: '2. Highlight Hidden Symptoms', explanation: 'Computer vision models highlight micro-fractures, tissue changes, and irregularities.' },
        { stepNumber: 3, title: '3. Assist Doctor Decisions', explanation: 'Generates prioritized clinical reports to help physicians administer fast care.' },
      ],
      keyPoints: [
        { title: 'Diagnostic Accuracy', text: 'Detects microscopic health anomalies reliably and consistently.' },
        { title: 'Rapid Triage', text: 'Delivers urgent emergency scan analyses in seconds when minutes count.' },
        { title: 'Expert Co-Pilot', text: 'Empowers medical specialists with instant diagnostic assistance.' },
      ],
    }
  }

  // 8. SMART CITIES & ENERGY GRIDS
  if (matches(/\b(city|cities|money|business|grid|public good|enterprise|start-?ups?|infrastructure|microservices)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Monitor Infrastructure', explanation: 'IoT sensors measure municipal substation loads, transit flow, and water pipes.' },
        { stepNumber: 2, title: '2. Balance Grid Demands', explanation: 'AI redistributes solar microgrid power and times green light traffic waves.' },
        { stepNumber: 3, title: '3. Prevent Outages & Delays', explanation: 'Automates preventive maintenance and guarantees emergency vehicle corridors.' },
      ],
      keyPoints: [
        { title: 'Clean Energy Dispatch', text: 'Channels surplus solar power dynamically where demand is highest.' },
        { title: 'Zero Traffic Jams', text: 'Adjusts street signal cycles in real time to keep vehicles moving.' },
        { title: 'Resilient Cities', text: 'Isolates power faults in milliseconds to prevent blackouts.' },
      ],
    }
  }

  // 9. GENERATIVE ART & CREATIVITY
  if (matches(/\b(creat\w*|studios?|draw\w*|imagine|arts?|music|sound|designs?|media|canvas|generator)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Encode Creative Prompt', explanation: 'Converts artistic text descriptions into high-dimensional style and concept vectors.' },
        { stepNumber: 2, title: '2. Denoise Latent Canvas', explanation: 'Diffusion models iteratively remove Gaussian noise step-by-step to reveal imagery.' },
        { stepNumber: 3, title: '3. Render Final Masterpiece', explanation: 'Neural upscalers enhance fine brush textures, lighting reflections, and resolution.' },
      ],
      keyPoints: [
        { title: 'Limitless Expression', text: 'Blends artistic styles, color palettes, and imaginations seamlessly.' },
        { title: 'Creative Partner', text: 'Helps students and creators visualize concepts in seconds.' },
        { title: 'Multimodal Art', text: 'Translates ideas across text, vibrant pictures, animations, and sound.' },
      ],
    }
  }

  // 10. COMPUTER VISION & CAMERAS
  if (matches(/\b(vision|cameras?|eyes?|detect\w*|photos?|shapes?|colors?|contour)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Capture Image Pixels', explanation: 'Optical sensors record video frames and convert RGB colors into numerical matrices.' },
        { stepNumber: 2, title: '2. Filter Edges & Shapes', explanation: 'Convolutional feature maps isolate contours, textures, corners, and object outlines.' },
        { stepNumber: 3, title: '3. Lock Bounding Boxes', explanation: 'Object detectors snap tracking frames around targets with high confidence labels.' },
      ],
      keyPoints: [
        { title: 'High-Speed Vision', text: 'Processes over 60 high-definition frames per second in real time.' },
        { title: 'Object Tracking', text: 'Maintains target locks through complex lighting, rotations, and movement.' },
        { title: 'Everyday Power', text: 'Powers face unlock, barcode scanning, medical imaging, and drones.' },
      ],
    }
  }

  // 11. LOGIC, CODING & PYTHON
  if (matches(/\b(logic|branch\w*|pythons?|code|coding|commands?|orders?|trees?|if-then)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Read Input Arguments', explanation: 'Takes in user variables, sensor inputs, and system condition values.' },
        { stepNumber: 2, title: '2. Evaluate IF-THEN Logic', explanation: 'Decision trees evaluate boolean rules, conditions, and iterative loop logic.' },
        { stepNumber: 3, title: '3. Execute Program Command', explanation: 'Runs calculations, triggers device actuators, and returns verified outputs.' },
      ],
      keyPoints: [
        { title: 'Exact Execution', text: 'Follows structured algorithmic rules with zero ambiguity or mistakes.' },
        { title: 'Modular Code', text: 'Functions can be reused thousands of times across large applications.' },
        { title: 'Core Foundation', text: 'All advanced artificial intelligence is built upon logical code statements.' },
      ],
    }
  }

  // 12. AI CAREERS & TALENT
  if (matches(/\b(career|jobs?|talent|future|rise|profession|skills?|blueprint|specialist)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Discover Real Challenges', explanation: 'Explores high-impact needs across healthcare, climate, mobility, and space.' },
        { stepNumber: 2, title: '2. Master Core AI Tools', explanation: 'Builds skills in Python, neural architectures, data pipelines, and safety audits.' },
        { stepNumber: 3, title: '3. Deploy Industry Solutions', explanation: 'Collaborates in engineering teams to build scalable, trustworthy technologies.' },
      ],
      keyPoints: [
        { title: 'High-Demand Careers', text: 'AI engineering, research, and ethics are among the fastest growing roles.' },
        { title: 'Diverse Specializations', text: 'Includes MLOps architects, prompt engineers, safety officers, and scientists.' },
        { title: 'Global Impact', text: 'Enables students to solve critical challenges and improve human lives.' },
      ],
    }
  }

  // 13. ETHICS, FAIRNESS & GOVERNANCE
  if (matches(/\b(fair|fairness|bias|rights?|accountab\w*|society|humanity|transparent|governance|ethics)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Audit Datasets for Bias', explanation: 'Measures demographic representations to ensure training data is fair and balanced.' },
        { stepNumber: 2, title: '2. Apply Parity Constraints', explanation: 'Adjusts mathematical decision boundaries to guarantee equitable outcomes.' },
        { stepNumber: 3, title: '3. Verify Explainability', explanation: 'Generates transparent decision paths and compliance audit proofs for safety.' },
      ],
      keyPoints: [
        { title: 'Equitable Treatment', text: 'Guarantees AI systems make unbiased decisions for all demographics.' },
        { title: 'Explainable AI', text: 'Ensures algorithmic decisions can be understood and audited by humans.' },
        { title: 'Public Trust', text: 'Strict safety standards ensure technological growth serves society safely.' },
      ],
    }
  }

  // 14. ROBOT PERCEPTION & SENSORS (DEFAULT)
  return {
    steps: [
      { stepNumber: 1, title: '1. Gather Environmental Signals', explanation: 'Sensors, cameras, and microphones receive real-world audio, visual, and spatial clues.' },
      { stepNumber: 2, title: '2. Synthesize & Spot Patterns', explanation: 'Intelligent neural models fuse sensor streams and compare clues against learned rules.' },
      { stepNumber: 3, title: '3. Deliver Accurate Action', explanation: 'Performs calibrated physical movements, outputs helpful predictions, and learns continuously.' },
    ],
    keyPoints: [
      { title: 'Always Helpful', text: `Designed to assist humans and solve challenges in ${topic} effortlessly.` },
      { title: 'Continuous Learner', text: 'Improves accuracy and precision with every validated real-world interaction.' },
      { title: 'Safe & Reliable', text: 'Operates within strict safety boundaries to ensure dependable performance.' },
    ],
  }
}

/**
 * Derives the 3-screen structured lesson content cleanly from any topic profile or canonical content.
 */
export function deriveStructuredLesson(
  topicTitle: string,
  chapterTitle: string,
  gradeKey: string,
  simpleDefinition?: string,
  smallExample?: string,
  keyPointsList?: { title: string; text: string }[]
): StructuredLessonContent {
  const t = topicTitle || 'AI Concepts'
  const gk = gradeKey.toLowerCase()

  // Screen 1: What is it?
  const whatIsIt = simpleDefinition || `${t} is an intelligent technology that helps computers analyze information and solve practical tasks automatically.`

  // Screen 1: Simple Meaning
  const simpleMeaning = gk.includes('class3') || gk.includes('class4')
    ? `Instead of a human having to do every single step manually, smart technology looks at clues, remembers patterns, and helps us make great choices quickly!`
    : gk.includes('class5') || gk.includes('class6') || gk.includes('class7') || gk.includes('class8')
    ? `It means giving software rules and data examples so it can spot patterns on its own, like sorting photos, helping doctors, or managing street traffic.`
    : gk.includes('class9') || gk.includes('class10') || gk.includes('class11') || gk.includes('class12')
    ? `It is a mathematical and algorithmic system where data passes through connected nodes or logic rules to calculate the most accurate outcome.`
    : `It is an optimized computational architecture engineered to process high-dimensional inputs, minimize loss, and deliver reliable inferences.`

  // Screen 2: Real-World Example
  const example = smallExample || (
    t.toLowerCase().includes('farm')
      ? `Like an agricultural drone scanning a 50-acre cornfield to spray water only on dry patches!`
      : t.toLowerCase().includes('road') || t.toLowerCase().includes('car')
      ? `Like an autonomous electric vehicle using 360° LiDAR radar to safely brake for a pedestrian!`
      : t.toLowerCase().includes('health') || t.toLowerCase().includes('med')
      ? `Like an AI hospital scanner highlighting micro-fractures in an X-ray to help emergency doctors!`
      : t.toLowerCase().includes('safety') || t.toLowerCase().includes('protect')
      ? `Like a smart cyber shield detecting and blocking suspicious spam emails before they open!`
      : `Like a smart camera assistant automatically centering your face and enhancing light when you smile for a photo!`
  )

  // Screen 3: Topic-Specific How It Works (Bespoke per topic)
  const howItWorksData = getTopicSpecificHowItWorks(topicTitle, chapterTitle, gradeKey)

  return {
    whatIsIt,
    simpleMeaning,
    example,
    howItWorksSteps: howItWorksData.steps,
    keyPoints: keyPointsList && keyPointsList.length > 0 ? keyPointsList : howItWorksData.keyPoints,
  }
}

/**
 * Dynamic Topic-Based Animated Background Generator
 */
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

  if (t.includes('safety') || t.includes('shield') || t.includes('protect') || t.includes('care')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-indigo-300/15 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-teal-300/15 blur-2xl animate-pulse" />
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

export const SimpleStructuredLessonView: React.FC<SimpleStructuredLessonProps> = ({
  gradeKey,
  chapterNum,
  chapterTitle,
  topicTitle,
  sectionNumber,
  structuredData,
  simpleDefinition,
  smallExample,
  keyPointsList,
  htmlContent,
  onStartInteractiveGame,
  interactiveGameTitle = 'Start Interactive Challenge',
}) => {
  const lesson = structuredData || deriveStructuredLesson(
    topicTitle,
    chapterTitle,
    gradeKey,
    simpleDefinition,
    smallExample,
    keyPointsList
  )
  
  // Screen: 1 = Core Concept, 2 = Real-World Example, 3 = How It Works
  const [screen, setScreen] = useState<1 | 2 | 3>(1)
  const [showFullRead, setShowFullRead] = useState<boolean>(false)

  const handleNextScreen = () => {
    gameAudio.playTap()
    if (screen === 1) setScreen(2)
    else if (screen === 2) setScreen(3)
    else {
      onStartInteractiveGame()
    }
  }

  const handlePrevScreen = () => {
    gameAudio.playTap()
    if (screen === 3) setScreen(2)
    else if (screen === 2) setScreen(1)
  }

  if (gradeKey === 'class3') {
    const cNum = parseInt(String(chapterNum || '1'), 10) || 1
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between h-full max-h-full overflow-hidden select-none animate-in fade-in duration-200">
        <GaioInteractiveBookApp
          initialMonth={cNum >= 1 && cNum <= 6 ? cNum : 1}
          onComplete={onStartInteractiveGame}
          onExit={handlePrevScreen}
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between h-full max-h-full px-2 sm:px-4 py-1.5 sm:py-2 overflow-hidden select-none animate-in fade-in duration-200">
      {/* 1. Top Screen Stepper Progress Capsule */}
      <div className="shrink-0 mb-1 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl p-2 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="p-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
            <BookOpen size={13} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-indigo-600">
                Step {screen} of 3
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">·</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 truncate max-w-[120px] sm:max-w-xs">
                {screen === 1 ? 'Core Concept' : screen === 2 ? 'Real-World Example' : 'How It Works'}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black text-slate-900 truncate">
              {topicTitle}
            </h2>
          </div>
        </div>

        {/* 3 Step Indicator Dots */}
        <div className="flex items-center gap-1 shrink-0">
          {[1, 2, 3].map((sNum) => (
            <button
              key={sNum}
              onClick={() => setScreen(sNum as 1 | 2 | 3)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                screen === sNum
                  ? 'w-6 bg-indigo-600 shadow-xs'
                  : screen > sNum
                  ? 'w-3 bg-emerald-500'
                  : 'w-3 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Jump to Screen ${sNum}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Main Dynamic Card Body (Strictly 1 of 3 Screens at a time) */}
      <div className="relative flex-1 flex flex-col justify-between min-h-0 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-2.5 sm:p-4 shadow-2xs overflow-hidden">
        {/* Dynamic Topic-Based Animated Background Pattern */}
        {renderTopicLessonBackground(topicTitle, chapterTitle)}

        {/* Modal Full Notes Toggle if Available */}
        {htmlContent && (
          <div className="flex justify-end pb-1 shrink-0 relative z-10">
            <button
              onClick={() => setShowFullRead(!showFullRead)}
              className="text-[9px] sm:text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
            >
              {showFullRead ? 'Hide Notes' : 'Read Full Notes'}
            </button>
          </div>
        )}

        {showFullRead && htmlContent ? (
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200 my-1 text-xs leading-relaxed text-slate-800 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        ) : (
          <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
            {/* ───────────────────────────────────────────────────────────── */}
            {/* SCREEN 1: ALIVE TOPIC CONCEPT EXPERIENCE                      */}
            {/* ───────────────────────────────────────────────────────────── */}
            {screen === 1 && (
              <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in slide-in-from-right-3 duration-200">
                <Lesson1ConceptExperience
                  badge={chapterTitle}
                  title={topicTitle}
                  topicTitle={topicTitle}
                  chapterTitle={chapterTitle}
                  gradeKey={gradeKey}
                  simpleDefinition={lesson.whatIsIt}
                  simpleMeaning={lesson.simpleMeaning}
                  aiDialogue={`Welcome to ${topicTitle}! Let's discover what it is and explore how it works in the real world.`}
                  onNext={handleNextScreen}
                  nextLabel="Next: Real-World Example"
                />
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* SCREEN 2: REAL-WORLD EXAMPLE (BESPOKE INTERACTIVE SCENE)       */}
            {/* ───────────────────────────────────────────────────────────── */}
            {screen === 2 && (
              <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in slide-in-from-right-3 duration-200">
                <Lesson1RealWorldExampleExperience
                  badge={chapterTitle}
                  title={topicTitle}
                  topicTitle={topicTitle}
                  chapterTitle={chapterTitle}
                  gradeKey={gradeKey}
                  exampleText={lesson.example}
                  onBack={handlePrevScreen}
                  onNext={handleNextScreen}
                  nextLabel="Next: How It Works"
                />
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* SCREEN 3: HOW IT WORKS (TOPIC-BOUND BESPOKE BREAKDOWN)        */}
            {/* ───────────────────────────────────────────────────────────── */}
            {screen === 3 && (
              <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1.5 animate-in fade-in slide-in-from-right-3 duration-200">
                {/* Topic-Bound How It Works 3-Step Pipeline */}
                <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-2 sm:p-2.5 space-y-1 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Cpu size={13} className="text-indigo-600" />
                      <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                        How It Works: {topicTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {lesson.howItWorksSteps.map((st, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200/90 rounded-xl p-1.5 sm:p-2 shadow-2xs flex flex-col justify-between"
                      >
                        <span className="text-[9px] sm:text-[10px] font-black text-indigo-700 block truncate">
                          {st.title}
                        </span>
                        <p className="text-[8px] sm:text-[9px] text-slate-600 font-medium leading-tight mt-0.5">
                          {st.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Points Capsules */}
                <div className="flex-1 flex flex-col justify-center bg-emerald-50/80 border border-emerald-200 rounded-2xl p-2 sm:p-2.5">
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 mb-1 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-600" /> Key Takeaways:
                  </h4>
                  <div className="space-y-1">
                    {lesson.keyPoints.slice(0, 3).map((kp, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[9px] sm:text-[10px] text-emerald-900 font-medium leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>{kp.title}:</strong> {kp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Bottom Contextual Action Navigation (For Screen 3) */}
        {screen === 3 && (
          <div className="relative z-10 pt-2 flex items-center justify-between gap-2 shrink-0 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={handlePrevScreen}
              className="py-2 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNextScreen}
              className="py-2.5 px-4 sm:px-6 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white ml-auto"
            >
              <span>{interactiveGameTitle}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
