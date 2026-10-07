import React from 'react'
import {
  Eye, Cpu, ArrowRight, Shield, Sparkles, Check,
  Camera, Mic, Volume2, Lightbulb, Compass, Award, Zap,
  Laptop, Home, School, BookOpen, Clock, Activity, CheckCircle2,
  Terminal, Play, HelpCircle, Palette, Flame, ShieldAlert,
  UserCheck, AlertTriangle, Layers, Lock, Unlock, Sun, Moon,
  Thermometer, User, Star, Shuffle, Grid, RotateCcw,
  Target, Navigation, RefreshCw, Send, CheckSquare, ShieldCheck,
  Heart, AlertCircle, Radio, Wrench, Droplet, Move
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
// CLASS 3 MAIN DISPATCHER: 6 BESPOKE PLAYABLE GAME WORLDS (MOBILE-FIRST)
// Unique Theme: Playful AI Wonderland · Character Badges · Pastel Neon Candy
// =============================================================================

export const Class3PlayfulWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class3Chapter2ConnectWorld {...props} />
    case 3:
      return <Class3Chapter3SolveWorld {...props} />
    case 4:
      return <Class3Chapter4RiseWorld {...props} />
    case 5:
      return <Class3Chapter5CreateWorld {...props} />
    case 6:
      return <Class3Chapter6CareWorld {...props} />
    default:
      return <Class3Chapter1DiscoverWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: AI DISCOVER — MEET MY AI FRIEND & MACHINES THAT HELP US
// =============================================================================

function Class3Chapter1DiscoverWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch1S2MeetAIFriend {...props} />
  if (sectionIdx === 2) return <C3Ch1S3MachinesThatHelp {...props} />
  if (sectionIdx === 3) return <C3Ch1S4SensorsWorld {...props} />
  if (sectionIdx === 4) return <C3Ch1S5RobotHearing {...props} />
  if (sectionIdx === 5) return <C3Ch1S6SmartVision {...props} />
  if (sectionIdx === 6) return <C3Ch1S7FriendshipForge {...props} />
  return <C3Ch1S2MeetAIFriend {...props} />
}

function C3Ch1S2MeetAIFriend(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Meet My AI Friend"
      lessonSubtitle="What is an AI Helper?"
      simpleDefinition="An AI friend is a smart computer buddy that can talk, listen, and play learning games with you!"
      smallExample="Just like Siri or Alexa answering 'Mount Everest' when you ask about tall mountains!"
      oneWordPoint={{ question: "Can an AI friend learn from us?", answer: "Yes!" }}
      keyPoints={[
        { icon: Heart, title: 'Helpful Buddy', text: 'Helps us solve puzzles and learn fun facts.' },
        { icon: Sparkles, title: 'Super Listener', text: 'Listens when you speak and answers kindly.' },
        { icon: Eye, title: 'Learns Fast', text: 'Gets better every time we practice together.' },
        { icon: Shield, title: 'Safe & Polite', text: 'Always follows good manners and safety rules.' },
      ]}
      aiDialogue="Hi! I am Aura, your friendly AI buddy. Let's play 3 fun games to welcome your new friend!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Friend Matcher",
          title: "Match Human Skills with AI Helper Skills",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Human Friend', right: 'Has feelings & true imagination' },
                { id: 'p2', left: 'AI Friend', right: 'Calculates fast & remembers facts' },
                { id: 'p3', left: 'Teamwork', right: 'Humans and AI solving puzzles together' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Greeting Sequence",
          title: "Order the Steps to Say Hello to AI",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 's1', label: '1. Wake up the helper with "Hello Aura"', detail: 'Voice prompt' },
                { id: 's2', label: '2. Ask your question clearly', detail: 'User inquiry' },
                { id: 's3', label: '3. Listen to the friendly answer', detail: 'AI response' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 's1' && ids[1] === 's2' && ids[2] === 's3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Friend Sorter",
          title: "Sort Friendly AI Behaviors",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'i1', label: 'Explaining homework clues patiently', correctBin: 'A' },
                { id: 'i2', label: 'Saying please and thank you', correctBin: 'A' },
                { id: 'i3', label: 'Asking for your secret home password', correctBin: 'B' },
                { id: 'i4', label: 'Helping you spell a tricky word', correctBin: 'A' },
              ]}
              binALabel="Safe Friend Behavior"
              binBLabel="Not Allowed / Unsafe"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch1S3MachinesThatHelp(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Machines That Help Us"
      lessonSubtitle="Smart Machines in Daily Life"
      simpleDefinition="Helper machines do boring chores so we have more time to learn, draw, and play with friends!"
      smallExample="A robot vacuum rolls around the carpet and cleans up biscuit crumbs all by itself!"
      oneWordPoint={{ question: "Why do we build helper machines?", answer: "To Help Us" }}
      keyPoints={[
        { icon: Home, title: 'Home Helpers', text: 'Clean floors and wash clothes for our family.' },
        { icon: Navigation, title: 'Map Guides', text: 'Show the quickest road to school or the park.' },
        { icon: Activity, title: 'Hospital Carts', text: 'Bring medicines safely to doctors and patients.' },
      ]}
      aiDialogue="Smart machines help us every day! Let's play 3 games to see what they can do."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Machine Sorter",
          title: "Identify Smart AI Helpers vs Simple Tools",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'm1', label: 'Robotic Vacuum navigating around table', correctBin: 'A' },
                { id: 'm2', label: 'Simple wooden broom', correctBin: 'B' },
                { id: 'm3', label: 'Voice-controlled smart light bulb', correctBin: 'A' },
                { id: 'm4', label: 'Standard metal spoon', correctBin: 'B' },
              ]}
              binALabel="Smart Machine (AI/Sensor)"
              binBLabel="Simple Manual Tool"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Power Level",
          title: "Calibrate Robot Helper Speed",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Set Safe Indoor Speed"
              description="Keep the robot helper moving safely inside the living room between 3 and 5 km/h."
              min={1}
              max={10}
              unit=" km/h"
              targetRange={[3, 5]}
              optimalLabel="Safe Speed! Robot avoids running into objects."
              suboptimalLabel="Too fast or stopped. Tune to safe range (3-5 km/h)."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Helper Check",
          title: "Inspect Helper Robot Parts",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Helper Robot Chassis Inspection"
              prompt="Tap all 3 parts of the helper robot."
              hotspots={[
                { id: 'h1', label: 'Rubber Wheels', explanation: 'Allows smooth gliding over floors and rugs.' },
                { id: 'h2', label: 'Front Sensor Ring', explanation: 'Prevents bumping into furniture.' },
                { id: 'h3', label: 'Power Battery', explanation: 'Keeps the robot working for hours.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch1S4SensorsWorld(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Sensors: How AI Senses the World"
      lessonSubtitle="Eyes, Ears & Touch of AI"
      simpleDefinition="Sensors are like the eyes, ears, and hands of a robot so it can see, hear, and feel around it!"
      smallExample="When you clap your hands, a microphone sensor hears the sound and turns on the lamp!"
      oneWordPoint={{ question: "What is a robot's eye called?", answer: "Camera Sensor" }}
      keyPoints={[
        { icon: Camera, title: 'Camera (Sight)', text: 'Sees colors, shapes, toys, and smiling faces.' },
        { icon: Mic, title: 'Microphone (Hearing)', text: 'Hears your voice, music, and claps.' },
        { icon: Activity, title: 'Touchpad (Touch)', text: 'Feels gentle taps and button clicks.' },
      ]}
      aiDialogue="Sensors give robots their superpowers! Let's test them in 3 fun mini-games."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Sensor Matcher",
          title: "Connect Sensors to Machine Superpowers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 's1', left: 'Camera Sensor', right: 'Sees colors and dog shapes' },
                { id: 's2', left: 'Microphone Sensor', right: 'Listens to voice prompts' },
                { id: 's3', left: 'Thermometer Sensor', right: 'Measures hot and cold temperatures' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Sensor Wiring",
          title: "Wire Robot Sensors to Main Board",
          render: (onPass) => (
            <CircuitWireStation
              title="Connect Robot Perception Lines"
              instruction="Connect each sensor wire to its matching motherboard receiver port."
              terminals={[
                { id: 't1', label: 'Camera Cable', icon: <Camera size={12} /> },
                { id: 't2', label: 'Microphone Cable', icon: <Mic size={12} /> },
              ]}
              ports={[
                { id: 'p1', label: 'Visual Processing Port', matchesTerminalId: 't1' },
                { id: 'p2', label: 'Acoustic Audio Port', matchesTerminalId: 't2' },
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Sensor Scanner",
          title: "Scan Sensor Nodes",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Rover Sensor Nodes"
              prompt="Identify all 3 active sensor nodes."
              hotspots={[
                { id: 'n1', label: 'Vision Eye Lens', explanation: 'Detects forward obstacles.' },
                { id: 'n2', label: 'Acoustic Sound Mesh', explanation: 'Picks up voice commands.' },
                { id: 'n3', label: 'Front Touch Bumper', explanation: 'Signals soft physical contact.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch1S5RobotHearing(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Robot Hearing & Sounds"
      lessonSubtitle="How AI Listens to Speech"
      simpleDefinition="A microphone works like robot ears, letting AI hear your voice and turn it into words!"
      smallExample="When you say 'Good morning', the AI hears your voice and says hello back happily!"
      oneWordPoint={{ question: "What is a robot's ear?", answer: "Microphone" }}
      keyPoints={[
        { icon: Mic, title: 'Catching Sounds', text: 'The microphone hears when you speak clearly.' },
        { icon: Cpu, title: 'Understanding Words', text: 'The smart brain turns sound into words.' },
        { icon: Sparkles, title: 'Answering Back', text: 'AI answers your questions with a friendly voice.' },
      ]}
      aiDialogue="Can a robot hear music and words? Yes! Let's play 3 games with sound."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Audio Tuning",
          title: "Tune Audio Receiver Frequency",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Tune Mic Receiver Pitch"
              description="Tune the receiver slider between 400Hz and 600Hz to match clear human voice."
              min={100}
              max={900}
              step={50}
              unit=" Hz"
              targetRange={[400, 600]}
              optimalLabel="Voice Pitch Crystal Clear! AI hears every word."
              suboptimalLabel="Muffled or squeaky sound. Slide to 400-600 Hz."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Word Pipeline",
          title: "Sequence How Audio Becomes Text",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'w1', label: '1. Human speaks words into air', detail: 'Acoustic wave' },
                { id: 'w2', label: '2. Microphone vibrates to sounds', detail: 'Electronic signal' },
                { id: 'w3', label: '3. AI writes down text words', detail: 'Speech-to-text' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'w1' && ids[1] === 'w2' && ids[2] === 'w3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Sound Classifier",
          title: "Classify Speech vs Background Noise",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 's1', label: '"Turn on yellow desk lamp"', correctBin: 'A' },
                { id: 's2', label: 'Whistling wind outside window', correctBin: 'B' },
                { id: 's3', label: '"Play bedtime lullaby music"', correctBin: 'A' },
                { id: 's4', label: 'Barking stray dog down street', correctBin: 'B' },
              ]}
              binALabel="Clear Voice Command"
              binBLabel="Background Noise"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch1S6SmartVision(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Smart Vision & Camera Eyes"
      lessonSubtitle="How Robots See Shapes and Colors"
      simpleDefinition="Cameras give robots eyesight so they can see colors, shapes, toys, and happy smiling faces!"
      smallExample="A tablet camera spots your smile and puts a silly cartoon hat on your head!"
      oneWordPoint={{ question: "What gives robots eyesight?", answer: "Camera Lens" }}
      keyPoints={[
        { icon: Camera, title: 'Bright Colors', text: 'Spots red balls, green trees, and blue skies.' },
        { icon: Eye, title: 'Spotting Shapes', text: 'Tells a round ball apart from a square book.' },
        { icon: Check, title: 'Naming Things', text: 'Gives toys friendly labels like "Dog" or "Ball".' },
      ]}
      aiDialogue="Look around! Everything has a shape and color. Let's explore through robot eyes."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Vision Matcher",
          title: "Match Shapes to Vision Labels",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'v1', left: 'Red Circle Dot', right: 'Round Ball Toy' },
                { id: 'v2', left: 'Yellow Rectangle', right: 'Story Book' },
                { id: 'v3', left: 'Green Triangle', right: 'Toy Tree' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Object Detector",
          title: "Scan Vision Camera Objects",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Camera Viewfinder Scanner"
              prompt="Identify all 3 detected items in the room."
              hotspots={[
                { id: 'o1', label: 'Red Toy Ball (99% Match)', explanation: 'Round contour detected.' },
                { id: 'o2', label: 'Blue Pencil Case', explanation: 'Rectangular prism identified.' },
                { id: 'o3', label: 'Desk Reading Lamp', explanation: 'Illumination fixture registered.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Data Collector",
          title: "Collect Valid Vision Training Photos",
          render: (onPass) => (
            <DataCollectorGrid
              title="Gather Clear Apple Photos"
              goalPrompt="Tap all 3 clear apple photos to train the vision camera."
              tokens={[
                { id: 't1', label: 'Crisp Red Apple', isValid: true, icon: <Sparkles size={12} /> },
                { id: 't2', label: 'Blurry Smudged Photo', isValid: false },
                { id: 't3', label: 'Bright Green Apple', isValid: true, icon: <Sparkles size={12} /> },
                { id: 't4', label: 'Pitch Black Dark Room', isValid: false },
                { id: 't5', label: 'Fresh Yellow Apple', isValid: true, icon: <Sparkles size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch1S7FriendshipForge(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 1"
      title="Friendship Forge & Capstone"
      lessonSubtitle="Building the Ultimate AI Companion"
      simpleDefinition="When camera eyes, mic ears, and a kind robot brain work together, you get a super AI friend!"
      smallExample="You and your AI buddy can solve fun riddles, build games, and learn science together!"
      oneWordPoint={{ question: "What makes a great AI friend?", answer: "Smart Teamwork" }}
      keyPoints={[
        { icon: Sparkles, title: 'All Senses Working', text: 'Seeing, listening, and thinking all together.' },
        { icon: Heart, title: 'Polite & Kind', text: 'Always plays fair and respects human friends.' },
        { icon: Award, title: 'Growing Smarter', text: 'You and AI discover new ideas every single day.' },
      ]}
      aiDialogue="Hurray! You made a wonderful AI friend. Play these 3 final games to celebrate!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Companion Assembly",
          title: "Assemble Final Robot Modules",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Assemble AI Companion Pipeline"
              instruction="Tap blocks in sequence to activate your companion."
              availableBlocks={[
                { id: 'b1', text: '1. Connect Camera Eyes' },
                { id: 'b2', text: '2. Turn on Mic Ears' },
                { id: 'b3', text: '3. Wake up Friendly Brain' },
              ]}
              targetSequence={['b1', 'b2', 'b3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Calibrate Friendship Core",
          title: "Calibrate Companion Heart Light",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Tune Friendship Light Intensity"
              description="Tune the friendly glowing chest light between 70% and 85%."
              min={10}
              max={100}
              unit="%"
              targetRange={[70, 85]}
              optimalLabel="Warm, Friendly Glow Active! Companion is fully awake."
              suboptimalLabel="Light is too dim or too bright. Set between 70% and 85%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Hardware Health Check",
          title: "Diagnose and Verify System",
          render: (onPass) => (
            <BugRepairStation
              title="Companion Pre-Flight Diagnosis"
              scenario="All systems ready. Check final communication handshake with human friend."
              faultyComponent="Unlinked User Handshake"
              repairOptions={[
                { id: 'r1', label: 'Establish Friendly Friendship Handshake', isCorrect: true, explanation: 'Handshake accepted! Companion and student are now connected partners.' },
                { id: 'r2', label: 'Shut down all power sensors', isCorrect: false, explanation: 'Do not shut down power; we want to activate the companion!' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 2: AI CONNECT — COMMANDS & VOICE ASSISTANTS
// =============================================================================

function Class3Chapter2ConnectWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch2S2Commands {...props} />
  if (sectionIdx === 2) return <C3Ch2S3OrderLogic {...props} />
  if (sectionIdx === 3) return <C3Ch2S4VoicePrompts {...props} />
  if (sectionIdx === 4) return <C3Ch2S5ClearSpeech {...props} />
  if (sectionIdx === 5) return <C3Ch2S6AssistantSkills {...props} />
  if (sectionIdx === 6) return <C3Ch2S7ConnectCapstone {...props} />
  return <C3Ch2S2Commands {...props} />
}

function C3Ch2S2Commands(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Give Me a Command!"
      lessonSubtitle="How to Talk to Computers"
      simpleDefinition="A command is a clear, direct instruction that tells a computer or robot exactly what task to perform without getting confused."
      smallExample="Saying 'Robot, turn left 90 degrees' is a clear command, while saying 'maybe go over there' is too vague."
      oneWordPoint={{ question: "What is a direct instruction?", answer: "A Command" }}
      keyPoints={[
        { icon: Terminal, title: 'Clear Verbs', text: 'Use action words like Run, Stop, Jump, or Turn.' },
        { icon: Navigation, title: 'Specific Steps', text: 'Tell the machine exactly how far or how long to move.' },
        { icon: Check, title: 'No Guesswork', text: 'Computers cannot guess what you meant; they follow instructions literally.' },
      ]}
      aiDialogue="Give me a command! If you speak clearly, I can do amazing tricks. Let's practice giving perfect commands."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Command Sorter",
          title: "Separate Clear Commands from Vague Words",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'c1', label: '"Move forward 3 steps"', correctBin: 'A' },
                { id: 'c2', label: '"Umm, do something cool"', correctBin: 'B' },
                { id: 'c3', label: '"Set desk timer for 10 minutes"', correctBin: 'A' },
                { id: 'c4', label: '"Maybe later whatever"', correctBin: 'B' },
              ]}
              binALabel="Clear Precise Command"
              binBLabel="Vague / Confusing"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Step Sequencing",
          title: "Sequence Robot Breakfast Command",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'b1', label: '1. Take out clean bowl from cabinet', detail: 'Prep bowl' },
                { id: 'b2', label: '2. Pour cereal into the bowl', detail: 'Add cereal' },
                { id: 'b3', label: '3. Pour cold milk over cereal', detail: 'Add milk' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'b1' && ids[1] === 'b2' && ids[2] === 'b3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Command Matcher",
          title: "Match Commands to Actions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: '"Lights Off"', right: 'Darkens the bedroom for sleep' },
                { id: 'm2', left: '"Play Music"', right: 'Starts joyful celebration song' },
                { id: 'm3', left: '"Set Alarm 7 AM"', right: 'Rings softly to wake up for school' },
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch2S3OrderLogic(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Put It in Order!"
      lessonSubtitle="The Magic of Algorithms"
      simpleDefinition="The exact order of steps matters! An algorithm is a step-by-step recipe. If you put your shoes on before your socks, your feet get tangled up!"
      smallExample="Recipe for hot chocolate: Heat milk first, then stir in cocoa powder, and top with marshmallows."
      oneWordPoint={{ question: "What is a step-by-step recipe?", answer: "An Algorithm" }}
      keyPoints={[
        { icon: Grid, title: 'Step 1 Comes First', text: 'Machines follow instructions in exact sequential order.' },
        { icon: Sparkles, title: 'No Skipping', text: 'Skipping a crucial step causes an error or funny mistake.' },
        { icon: Award, title: 'Predictable Results', text: 'Good algorithms work correctly every single time.' },
      ]}
      aiDialogue="Order is everything in computer science! Let's arrange steps in the right sequence."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Shoes & Socks",
          title: "Order Morning Routine Steps",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 's1', label: '1. Put on soft cotton socks', detail: 'Underlayer' },
                { id: 's2', label: '2. Slip feet into running shoes', detail: 'Footwear' },
                { id: 's3', label: '3. Tie shoe laces in tight bow', detail: 'Secured' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 's1' && ids[1] === 's2' && ids[2] === 's3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Plant Care Algorithm",
          title: "Sequence How to Plant a Seed",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Seed Planting Algorithm"
              instruction="Assemble the seed planting steps in order."
              availableBlocks={[
                { id: 'p1', text: '1. Dig small soil hole' },
                { id: 'p2', text: '2. Drop seed inside hole' },
                { id: 'p3', text: '3. Water gently with cup' },
              ]}
              targetSequence={['p1', 'p2', 'p3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Glitch Repair",
          title: "Fix the Out-of-Order Instruction",
          render: (onPass) => (
            <BugRepairStation
              title="Out-of-Order Glitch Repair"
              scenario="The robot tried to eat soup with a fork before pouring it into a bowl!"
              faultyComponent="Scrambled Recipe Sequence"
              repairOptions={[
                { id: 'r1', label: 'Reorder: Pour soup into bowl first, then use spoon', isCorrect: true, explanation: 'Correct! Now the robot can enjoy warm soup without spills.' },
                { id: 'r2', label: 'Throw away the bowl completely', isCorrect: false, explanation: 'Throwing away the bowl does not fix the logic.' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch2S4VoicePrompts(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Talking with Voice Assistants"
      lessonSubtitle="Prompts & Speech Clarity"
      simpleDefinition="A prompt is the question or sentence you speak to an AI assistant. The clearer your prompt, the smarter the answer you receive!"
      smallExample="Prompt: 'Tell me a riddle about elephants' gives an instant elephant riddle!"
      oneWordPoint={{ question: "What is your question to an AI?", answer: "A Prompt" }}
      keyPoints={[
        { icon: Mic, title: 'Speak Clearly', text: 'Use a calm, steady voice so the microphone hears every syllable.' },
        { icon: Sparkles, title: 'Provide Details', text: 'Say "Play gentle rain sounds" instead of just "Play sound".' },
        { icon: CheckCircle2, title: 'Polite Prompts', text: 'Being polite makes using technology a kind, happy habit.' },
      ]}
      aiDialogue="Voice assistants love clear prompts. Let's see what happens when we ask great questions."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Prompt Matcher",
          title: "Match Great Prompts to Best AI Answers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: '"How many planets in solar system?"', right: '8 Planets (Mercury to Neptune)' },
                { id: 'p2', left: '"Spell the word Butterfly"', right: 'B-U-T-T-E-R-F-L-Y' },
                { id: 'p3', left: '"What is 5 plus 7?"', right: 'The answer is 12' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Volume Tuning",
          title: "Tune Speech Volume for Assistant",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Calibrate Mic Input Volume"
              description="Keep your speech input volume between 60dB and 75dB."
              min={20}
              max={110}
              unit=" dB"
              targetRange={[60, 75]}
              optimalLabel="Perfect Volume! Clear and easy to understand."
              suboptimalLabel="Too quiet (whisper) or too loud (shouting). Tune to 60-75 dB."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Prompt Detective",
          title: "Find the 3 Great Prompts",
          render: (onPass) => (
            <DataCollectorGrid
              title="Curate Clear Prompts"
              goalPrompt="Tap all 3 clear, detailed prompts."
              tokens={[
                { id: 't1', label: '"Set study timer for 15 mins"', isValid: true, icon: <Check size={12} /> },
                { id: 't2', label: '"Hey you do stuff"', isValid: false },
                { id: 't3', label: '"Read Chapter 2 aloud"', isValid: true, icon: <Check size={12} /> },
                { id: 't4', label: '"Blah blah blah"', isValid: false },
                { id: 't5', label: '"Show photo of planet Saturn"', isValid: true, icon: <Check size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch2S5ClearSpeech(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Clear Speech & Sound Clarity"
      lessonSubtitle="Helping Machines Understand Us"
      simpleDefinition="When we mumble or speak with loud noise nearby, the microphone gets confused. Speaking clearly helps both humans and AI understand each other."
      smallExample="Turning down the TV before asking your smart assistant a question helps it hear you on the first try."
      oneWordPoint={{ question: "What ruins voice understanding?", answer: "Loud Noise" }}
      keyPoints={[
        { icon: Volume2, title: 'Quiet Space', text: 'Step away from barking pets or loud blender sounds.' },
        { icon: Mic, title: 'Speak Naturally', text: 'No need to shout; normal conversational tones work best.' },
        { icon: Check, title: 'Listen for Beep', text: 'Wait for the gentle chime that means the AI is listening.' },
      ]}
      aiDialogue="Quiet please! Sound travels best when there is no background racket. Let's test sound clarity."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Audio Classifier",
          title: "Classify Clear Audio vs Noisy Audio",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'a1', label: 'Clear voice in a quiet bedroom', correctBin: 'A' },
                { id: 'a2', label: 'Shouting next to a loud lawn mower', correctBin: 'B' },
                { id: 'a3', label: 'Talking in a peaceful classroom', correctBin: 'A' },
                { id: 'a4', label: 'Chewing crunchy crackers into microphone', correctBin: 'B' },
              ]}
              binALabel="Easy to Understand"
              binBLabel="Noisy Distraction"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Noise Filter",
          title: "Tune Background Noise Canceler",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Noise Reduction Filter"
              description="Tune the background noise filter between 80% and 95%."
              min={10}
              max={100}
              unit="%"
              targetRange={[80, 95]}
              optimalLabel="Noise Suppressed! Only pure human voice remains."
              suboptimalLabel="Background noise still leaking through. Slide to 80-95%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Clean Sound Nodes",
          title: "Scan Clean Sound Channels",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Audio Channel Spectrogram"
              prompt="Identify all 3 clean voice channels."
              hotspots={[
                { id: 'c1', label: 'Channel Alpha (Clear)', explanation: 'Zero background hiss.' },
                { id: 'c2', label: 'Channel Beta (Crisp)', explanation: 'Optimal voice frequencies.' },
                { id: 'c3', label: 'Channel Gamma (Filtered)', explanation: 'Noise cancellation locked.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch2S6AssistantSkills(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Assistant Skills & Fun Tricks"
      lessonSubtitle="What Voice AI Can Do"
      simpleDefinition="Voice assistants have hundreds of built-in skills! They can tell knock-knock jokes, play animal sounds, translate greetings into French, and set alarms."
      smallExample="Asking 'What sound does a dolphin make?' plays a cheerful click-whistle underwater recording."
      oneWordPoint={{ question: "Can AI tell funny jokes?", answer: "Yes!" }}
      keyPoints={[
        { icon: Sparkles, title: 'Animal Sounds', text: 'Hear lions roar, birds chirp, and whales sing underwater.' },
        { icon: BookOpen, title: 'Story Time', text: 'Listen to bedtime tales and interactive adventure stories.' },
        { icon: Award, title: 'Math Quizzer', text: 'Practice addition, subtraction, and times tables.' },
      ]}
      aiDialogue="AI has so many superpowers! Which skill is your favorite? Let's test them."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Skill Matcher",
          title: "Match Prompts to AI Skill Category",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'k1', left: '"Roar like a lion"', right: 'Animal Audio Skill' },
                { id: 'k2', left: '"Tell a knock-knock joke"', right: 'Humor & Fun Skill' },
                { id: 'k3', left: '"How do you say Hello in Spanish?"', right: 'Language Translation Skill' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Skill Activator",
          title: "Assemble Skill Activation Code",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Skill Invocation Pipeline"
              instruction="Assemble the command sequence to activate the joke skill."
              availableBlocks={[
                { id: 'j1', text: '1. Say "Hey Assistant"' },
                { id: 'j2', text: '2. Say "Tell me a joke"' },
                { id: 'j3', text: '3. Laugh at punchline!' },
              ]}
              targetSequence={['j1', 'j2', 'j3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Favorite Skill Scanner",
          title: "Inspect Assistant Skill Bays",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Assistant Skill Registry"
              prompt="Scan all 3 available skill modules."
              hotspots={[
                { id: 'm1', label: 'Trivia Quiz Hub', explanation: 'Science and geography questions.' },
                { id: 'm2', label: 'Audio Storybook', explanation: 'Read-along bedtime tales.' },
                { id: 'm3', label: 'Weather Forecaster', explanation: 'Sunny skies and umbrella alerts.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch2S7ConnectCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 2"
      title="Connect Capstone: Master of Commands"
      lessonSubtitle="Becoming a Pro Communicator"
      simpleDefinition="You are now a master of communicating with smart machines! Giving clear, sequential, polite commands lets you unlock the full power of technology."
      smallExample="A prompt engineer is a real job where people write clever instructions to help AI solve big world problems!"
      oneWordPoint={{ question: "Who controls the AI?", answer: "The Human!" }}
      keyPoints={[
        { icon: Award, title: 'Human in Charge', text: 'Humans create the goals; AI simply carries out the steps.' },
        { icon: Sparkles, title: 'Clear Thinking', text: 'Good prompts require clear thoughts and logical sentences.' },
        { icon: Check, title: 'Endless Discovery', text: 'Every question you ask teaches you something brand new.' },
      ]}
      aiDialogue="Outstanding work! You've completed Chapter 2. Let's finish the grand capstone games!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Pipeline",
          title: "Assemble Full Voice Interaction Chain",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'p1', label: '1. Human decides on goal', detail: 'Idea in mind' },
                { id: 'p2', label: '2. Speaks clear verbal prompt', detail: 'Voice command' },
                { id: 'p3', label: '3. Machine executes task accurately', detail: 'Successful result' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'p1' && ids[1] === 'p2' && ids[2] === 'p3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Connect Wire Station",
          title: "Wire Final Communication Bus",
          render: (onPass) => (
            <CircuitWireStation
              title="Connect Voice Control Bus"
              instruction="Link user voice input to AI action motor."
              terminals={[
                { id: 't1', label: 'Human Speech Mic', icon: <Mic size={12} /> },
                { id: 't2', label: 'AI Language Processor', icon: <Cpu size={12} /> },
              ]}
              ports={[
                { id: 'p1', label: 'Audio Ingestion Port', matchesTerminalId: 't1' },
                { id: 'p2', label: 'Action Motor Trigger', matchesTerminalId: 't2' },
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Master Diagnosis",
          title: "Final Communication Health Check",
          render: (onPass) => (
            <BugRepairStation
              title="Master Communication Check"
              scenario="Testing voice pipeline latency."
              faultyComponent="Voice Handshake Delay"
              repairOptions={[
                { id: 'r1', label: 'Optimize Voice Parser Cache', isCorrect: true, explanation: 'Response time is now super fast (under 0.2 seconds)!' },
                { id: 'r2', label: 'Unplug the power plug', isCorrect: false, explanation: 'Unplugging cuts all power.' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 3: AI SOLVE — SMART HELPERS IN SCHOOLS, HOMES & HOSPITALS
// =============================================================================

function Class3Chapter3SolveWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch3S2SchoolHelper {...props} />
  if (sectionIdx === 2) return <C3Ch3S3HomeHelper {...props} />
  if (sectionIdx === 3) return <C3Ch3S4HospitalHelper {...props} />
  if (sectionIdx === 4) return <C3Ch3S5EcoHelper {...props} />
  if (sectionIdx === 5) return <C3Ch3S6NeighborhoodHelper {...props} />
  if (sectionIdx === 6) return <C3Ch3S7SolveCapstone {...props} />
  return <C3Ch3S2SchoolHelper {...props} />
}

function C3Ch3S2SchoolHelper(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="AI Goes to School"
      lessonSubtitle="Smart Learning Buddies"
      simpleDefinition="In schools, AI can read storybooks aloud, check spelling, and give you math hints when you are stuck, while real teachers guide your learning journey."
      smallExample="An AI reading app listens as you read aloud and highlights words in green when you pronounce them correctly!"
      oneWordPoint={{ question: "Can AI help you learn spelling?", answer: "Yes!" }}
      keyPoints={[
        { icon: BookOpen, title: 'Story Readers', text: 'Speaks stories in different fun voices like pirates or wizards.' },
        { icon: Sparkles, title: 'Gentle Hints', text: 'Gives helpful clues instead of just giving away the final answer.' },
        { icon: School, title: 'Teacher Partner', text: 'Helps teachers prepare fun classroom science experiments.' },
      ]}
      aiDialogue="School is full of exciting questions! AI makes study time feel like a joyful game."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Tool Matcher",
          title: "Match School Tasks with AI Helpers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 's1', left: 'Reading Practice', right: 'Word pronunciation guide' },
                { id: 's2', left: 'Math Practice', right: 'Interactive counting counters' },
                { id: 's3', left: 'Art Class', right: 'Color harmony suggestion tool' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Study Rhythm",
          title: "Tune Classroom Focus Timer",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Set Focus Study Time"
              description="Keep study intervals between 15 and 25 minutes for maximum brain power."
              min={5}
              max={60}
              unit=" mins"
              targetRange={[15, 25]}
              optimalLabel="Optimal Focus Time! Brain stays energized and happy."
              suboptimalLabel="Too short to learn or too long without a stretch. Set to 15-25 mins."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Classroom Scanner",
          title: "Inspect School AI Tools",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Classroom Smart Desk"
              prompt="Identify all 3 learning tools on the smart desk."
              hotspots={[
                { id: 'd1', label: 'Interactive Digital Tablet', explanation: 'Displays science diagrams.' },
                { id: 'd2', label: 'Audio Pronunciation Mic', explanation: 'Checks reading fluency.' },
                { id: 'd3', label: 'Desk Focus Timer', explanation: 'Encourages healthy study breaks.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch3S3HomeHelper(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="AI Comes Home"
      lessonSubtitle="Smart Living & Helpful Gadgets"
      simpleDefinition="At home, smart gadgets keep us comfortable and safe. Smart thermostats adjust room heat, and smart doorbells let parents see visitors safely."
      smallExample="A smart thermostat notices everyone is asleep and gently lowers the bedroom temperature for cozy rest."
      oneWordPoint={{ question: "Where do smart cleaners work?", answer: "At Home" }}
      keyPoints={[
        { icon: Home, title: 'Cozy Rooms', text: 'Keeps homes warm in winter and cool in summer.' },
        { icon: Shield, title: 'Safe Doors', text: 'Alerts parents when postal packages arrive.' },
        { icon: Zap, title: 'Energy Saving', text: 'Turns off forgotten basement lights automatically.' },
      ]}
      aiDialogue="Welcome home! Smart gadgets work quietly in the background to save electricity and keep homes safe."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Home Gadget Sorter",
          title: "Sort Helpful Gadgets vs Outdoor Equipment",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'g1', label: 'Smart room thermostat', correctBin: 'A' },
                { id: 'g2', label: 'Heavy tractor farm plow', correctBin: 'B' },
                { id: 'g3', label: 'Robotic kitchen floor mop', correctBin: 'A' },
                { id: 'g4', label: 'Airport runway radar dish', correctBin: 'B' },
              ]}
              binALabel="Home Helper Gadget"
              binBLabel="Heavy Industrial Machine"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Cozy Temp",
          title: "Tune Room Thermostat",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Set Room Temperature"
              description="Keep room temperature comfortable between 20°C and 23°C."
              min={14}
              max={32}
              unit="°C"
              targetRange={[20, 23]}
              optimalLabel="Cozy & Comfortable! Perfect for family homework time."
              suboptimalLabel="Too chilly or too stuffy. Tune to 20-23°C."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Energy Collector",
          title: "Collect Energy-Saving Actions",
          render: (onPass) => (
            <DataCollectorGrid
              title="Smart Home Energy Saver"
              goalPrompt="Tap all 3 energy-saving smart actions."
              tokens={[
                { id: 'e1', label: 'Dim lights in empty hallway', isValid: true, icon: <Zap size={12} /> },
                { id: 'e2', label: 'Leave refrigerator door wide open', isValid: false },
                { id: 'e3', label: 'Turn off TV when nobody is watching', isValid: true, icon: <Zap size={12} /> },
                { id: 'e4', label: 'Leave heater running with windows open', isValid: false },
                { id: 'e5', label: 'Sleep mode on computer overnight', isValid: true, icon: <Zap size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch3S4HospitalHelper(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="Smart Helpers in Hospitals"
      lessonSubtitle="Technology Saving Lives"
      simpleDefinition="In hospitals, doctors and nurses use AI scanners to look at X-rays, monitor heartbeats, and deliver clean bandages to patients."
      smallExample="A heart monitor sounds a gentle chime if a sleeping patient's pulse changes, calling the nurse right away."
      oneWordPoint={{ question: "Who guides the hospital AI?", answer: "Doctors & Nurses" }}
      keyPoints={[
        { icon: Heart, title: 'Heart Monitoring', text: 'Watches vital signs day and night without getting tired.' },
        { icon: Eye, title: 'X-ray Scanners', text: 'Helps doctors spot tiny hairline bone cracks.' },
        { icon: Shield, title: 'Clean Delivery Carts', text: 'Transports clean towels and medicines safely.' },
      ]}
      aiDialogue="Hospitals are full of heroes! AI is the trusty helper that supports doctors and nurses."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Hospital Matcher",
          title: "Match Hospital Needs to Smart Helpers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'h1', left: 'Heartbeat Monitor', right: 'Tracks steady, healthy pulse' },
                { id: 'h2', left: 'Digital Thermometer', right: 'Measures body fever in 1 second' },
                { id: 'h3', left: 'Hospital Delivery Cart', right: 'Carries medicine down long corridors' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Pulse Monitor",
          title: "Calibrate Resting Pulse Range",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Healthy Resting Pulse"
              description="Keep normal resting child pulse between 70 and 100 beats per minute."
              min={40}
              max={150}
              unit=" BPM"
              targetRange={[70, 100]}
              optimalLabel="Healthy Resting Rhythm! Heart is beating smoothly."
              suboptimalLabel="Abnormal reading. Tune to safe resting range (70-100 BPM)."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Medical Bay Check",
          title: "Inspect Care Robot Tools",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Medical Care Cart"
              prompt="Identify all 3 sanitized care components."
              hotspots={[
                { id: 'c1', label: 'Clean Bandage Dispenser', explanation: 'Sterile cotton bandages ready.' },
                { id: 'c2', label: 'Infrared Fever Scanner', explanation: 'Touchless temperature sensor.' },
                { id: 'c3', label: 'Silent Wheels', explanation: 'Allows quiet travel past sleeping rooms.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch3S5EcoHelper(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="AI for Nature & Planet Earth"
      lessonSubtitle="Saving Forests, Oceans & Wildlife"
      simpleDefinition="Drones with cameras count endangered animals from high in the sky, and smart sensors in rivers alert rangers if clean water is being polluted."
      smallExample="Satellites take photos of rainforests and AI spots smoke to warn firefighters before wildfires spread!"
      oneWordPoint={{ question: "Can AI help protect forests?", answer: "Yes!" }}
      keyPoints={[
        { icon: Sparkles, title: 'Forest Watchers', text: 'Detects smoke and wild fires before they get big.' },
        { icon: Droplet, title: 'Clean Waters', text: 'Monitors ocean health and coral reefs.' },
        { icon: Eye, title: 'Counting Animals', text: 'Counts baby sea turtles without disturbing their nests.' },
      ]}
      aiDialogue="Our planet is our only home! Let's see how smart sensors protect green forests and blue oceans."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Eco Sorter",
          title: "Sort Recyclable Materials",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'r1', label: 'Clean plastic water bottle', correctBin: 'A' },
                { id: 'r2', label: 'Banana peel and apple core', correctBin: 'B' },
                { id: 'r3', label: 'Cardboard cereal box', correctBin: 'A' },
                { id: 'r4', label: 'Fallen garden autumn leaves', correctBin: 'B' },
              ]}
              binALabel="Recyclable Dry Goods"
              binBLabel="Organic Garden Compost"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Forest Drone",
          title: "Sequence Drone Patrol Mission",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'd1', label: '1. Drone launches above forest canopy', detail: 'Liftoff' },
                { id: 'd2', label: '2. Thermal cameras scan for campfire smoke', detail: 'Infrared check' },
                { id: 'd3', label: '3. Alerts park rangers of safe perimeter', detail: 'Report clean' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'd1' && ids[1] === 'd2' && ids[2] === 'd3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Wildlife Scanner",
          title: "Scan Forest Camera Trap",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Forest Sanctuary Camera"
              prompt="Identify all 3 spotted wild animals."
              hotspots={[
                { id: 'w1', label: 'Mother Deer & Fawn', explanation: 'Healthy herd spotted grazing peacefully.' },
                { id: 'w2', label: 'Barn Owl in Oak Tree', explanation: 'Nocturnal protector active.' },
                { id: 'w3', label: 'Playful River Otter', explanation: 'Clean freshwater indicator species.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch3S6NeighborhoodHelper(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="Smart Helpers in the Neighborhood"
      lessonSubtitle="Street Lights & Clean Parks"
      simpleDefinition="In friendly towns, smart streetlights turn on when the sun sets, and pedestrian crossings beep to help visually impaired neighbors cross the street safely."
      smallExample="Crosswalk sensors notice when a grandmother is crossing with her groceries and hold the green light a few extra seconds."
      oneWordPoint={{ question: "When do smart streetlights turn on?", answer: "At Sunset" }}
      keyPoints={[
        { icon: Sun, title: 'Solar Streetlights', text: 'Soaks up sunlight by day, lights streets at night.' },
        { icon: ShieldCheck, title: 'Safe Crosswalks', text: 'Beeping signals keep every pedestrian safe.' },
        { icon: Sparkles, title: 'Clean Public Parks', text: 'Solar trash compactors keep parks free of litter.' },
      ]}
      aiDialogue="A smart neighborhood is a safe, kind neighborhood where everyone is looked after!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Crosswalk Matcher",
          title: "Match City Signals to Meanings",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 's1', left: 'Green Walking Light', right: 'Safe to walk across crosswalk' },
                { id: 's2', left: 'Red Hand Signal', right: 'Wait patiently on sidewalk' },
                { id: 's3', left: 'Gentle Beeping Chime', right: 'Helps blind neighbors know it is safe' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Street Light Dial",
          title: "Tune Solar Street Light Sensitivity",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Light Sensor Threshold"
              description="Tune dusk sensor to turn on lights when evening darkness reaches 70-85%."
              min={10}
              max={100}
              unit="%"
              targetRange={[70, 85]}
              optimalLabel="Lights On at Perfect Dusk! Streets are safe and bright."
              suboptimalLabel="Turns on during midday or too late at midnight. Set to 70-85%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Park Scanner",
          title: "Inspect Clean Park Features",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Neighborhood Park Amenities"
              prompt="Identify all 3 smart park features."
              hotspots={[
                { id: 'p1', label: 'Solar Powered Bench', explanation: 'Charges emergency phones with sunlight.' },
                { id: 'p2', label: 'Smart Water Fountain', explanation: 'Provides clean drinking water.' },
                { id: 'p3', label: 'Bicycle Lock Rack', explanation: 'Encourages green, healthy transport.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch3S7SolveCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 3"
      title="Solve Capstone: Helper of the World"
      lessonSubtitle="Community Problem Solvers"
      simpleDefinition="You've seen how smart machines help schools, homes, hospitals, and parks. When technology serves human happiness and kindness, wonderful things happen."
      smallExample="You can brainstorm your own smart machine to solve a problem in your town, like a beach sand cleaner!"
      oneWordPoint={{ question: "What is technology's biggest purpose?", answer: "Helping People" }}
      keyPoints={[
        { icon: Award, title: 'Kind Purpose', text: 'Technology is best when it helps people stay healthy and learn.' },
        { icon: Sparkles, title: 'Creative Minds', text: 'Kids like you will design tomorrow\'s helper robots.' },
        { icon: Heart, title: 'Team Effort', text: 'Engineers, doctors, and artists work together.' },
      ]}
      aiDialogue="You're an official Community Helper Champion! Let's complete the Chapter 3 capstone."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Helper Pipeline",
          title: "Assemble Community Help Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'c1', label: '1. Notice a neighborhood need', detail: 'Spot problem' },
                { id: 'c2', label: '2. Design smart helper machine', detail: 'Invent solution' },
                { id: 'c3', label: '3. Make life happier for neighbors', detail: 'Positive impact' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'c1' && ids[1] === 'c2' && ids[2] === 'c3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Grid Balancer",
          title: "Tune Neighborhood Solar Storage",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Neighborhood Solar Reserve"
              description="Keep clean community solar storage between 75% and 90%."
              min={20}
              max={100}
              unit="%"
              targetRange={[75, 90]}
              optimalLabel="Community Reserve Fully Charged! Clean power for everyone."
              suboptimalLabel="Battery reserve below target. Set to 75-90%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Town Health Check",
          title: "Diagnose and Verify Community Bus",
          render: (onPass) => (
            <BugRepairStation
              title="Smart Town Network Check"
              scenario="All community sensors connected. Final check for solar grid signal."
              faultyComponent="Unsynced Solar Inverter"
              repairOptions={[
                { id: 'r1', label: 'Synchronize Inverter to Smart Grid', isCorrect: true, explanation: 'Solar power is flowing smoothly across the neighborhood!' },
                { id: 'r2', label: 'Cut the clean power cables', isCorrect: false, explanation: 'Cutting cables causes an outage.' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 4: AI RISE — FUTURE TECH HELPERS, ROBOTS & DRONES
// =============================================================================

function Class3Chapter4RiseWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch4S2FutureJobs {...props} />
  if (sectionIdx === 2) return <C3Ch4S3TechPeople {...props} />
  if (sectionIdx === 3) return <C3Ch4S4RobotsAndDrones {...props} />
  if (sectionIdx === 4) return <C3Ch4S5SpaceExplorers {...props} />
  if (sectionIdx === 5) return <C3Ch4S6MyTechTalent {...props} />
  if (sectionIdx === 6) return <C3Ch4S7RiseCapstone {...props} />
  return <C3Ch4S2FutureJobs {...props} />
}

function C3Ch4S2FutureJobs(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="When I Grow Up"
      lessonSubtitle="Future Tech Careers"
      simpleDefinition="In the future, there will be exciting new jobs like Robot Doctor (fixing machines), Prompt Creator (talking to AI), and Space Drone Pilot (exploring Mars)!"
      smallExample="A drone pilot sits at a mission desk and flies a camera drone through tall mountain canyons."
      oneWordPoint={{ question: "Who invents tomorrow's technology?", answer: "Curious Kids!" }}
      keyPoints={[
        { icon: Award, title: 'Robot Engineer', text: 'Designs mechanical gears, wheels, and camera sensors.' },
        { icon: Terminal, title: 'AI Teacher', text: 'Teaches computers how to speak politely and recognize art.' },
        { icon: Sparkles, title: 'Creative Designer', text: 'Invents video game worlds, characters, and sound effects.' },
      ]}
      aiDialogue="What do you want to be when you grow up? There are so many incredible jobs waiting for you!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Career Matcher",
          title: "Match Dreams to Future Tech Careers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'j1', left: 'Loves Building Blocks', right: 'Robotics Hardware Engineer' },
                { id: 'j2', left: 'Loves Drawing & Cartoons', right: 'Digital Character Animator' },
                { id: 'j3', left: 'Loves Solving Math Riddles', right: 'AI Logic Scientist' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Drone Flight",
          title: "Calibrate Explorer Drone Altitude",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Safe Drone Flight Altitude"
              description="Keep drone flying smoothly between 25 and 40 meters above trees."
              min={5}
              max={100}
              unit=" m"
              targetRange={[25, 40]}
              optimalLabel="Smooth Cruising Altitude! Clear sky view."
              suboptimalLabel="Too close to branches or too high. Slide to 25-40 meters."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Tech Toolkit",
          title: "Scan Future Career Toolkit",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Inventor Workbench"
              prompt="Identify all 3 tools on the engineer workbench."
              hotspots={[
                { id: 't1', label: 'Circuit Screwdriver', explanation: 'Tightens motor screws securely.' },
                { id: 't2', label: 'Coding Keyboard', explanation: 'Types instructions into microchips.' },
                { id: 't3', label: 'Safety Goggles', explanation: 'Protects curious eyes in the lab.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch4S3TechPeople(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="People Behind Technology"
      lessonSubtitle="Human Creators & Teamwork"
      simpleDefinition="Computers don't build themselves! Teams of people—including artists, storytellers, mathematicians, and safety experts—work together to build every app you use."
      smallExample="To build an educational math game, an artist draws the cute characters while a programmer makes them jump!"
      oneWordPoint={{ question: "Does AI need human teams?", answer: "Always!" }}
      keyPoints={[
        { icon: User, title: 'The Storyteller', text: 'Writes the characters, dialogues, and fun adventures.' },
        { icon: Palette, title: 'The Artist', text: 'Paints vibrant buttons, worlds, and friendly faces.' },
        { icon: Cpu, title: 'The Programmer', text: 'Writes the logic code that makes everything work.' },
      ]}
      aiDialogue="Teamwork makes the dream work! Let's see how different roles join forces to create tech."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Team Matcher",
          title: "Match Roles to What They Create",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 't1', left: 'Graphic Designer', right: 'Paints colorful game icons' },
                { id: 't2', left: 'Software Coder', right: 'Writes the button click logic' },
                { id: 't3', left: 'Safety Auditor', right: 'Makes sure games are safe for children' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Project Stages",
          title: "Sequence How an App is Created",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'a1', label: '1. Brainstorm creative idea on paper', detail: 'Sketch concept' },
                { id: 'a2', label: '2. Code and build prototype', detail: 'Build software' },
                { id: 'a3', label: '3. Test with kids and fix bugs', detail: 'Polish & play' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'a1' && ids[1] === 'a2' && ids[2] === 'a3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Role Sorter",
          title: "Sort Creative vs Technical Contributions",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'r1', label: 'Composing a cheerful background song', correctBin: 'A' },
                { id: 'r2', label: 'Optimizing database speed', correctBin: 'B' },
                { id: 'r3', label: 'Writing a funny robot dialogue joke', correctBin: 'A' },
                { id: 'r4', label: 'Fixing a broken memory memory bug', correctBin: 'B' },
              ]}
              binALabel="Creative Story & Art"
              binBLabel="Technical Engineering"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch4S4RobotsAndDrones(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="Robots, Drones & Flying Helpers"
      lessonSubtitle="Machines with Wings & Wheels"
      simpleDefinition="Drones have spinning propellers to fly over mountains and deliver medicine, while wheeled robots explore caves and ocean depths where humans cannot easily go."
      smallExample="Marine exploration robots dive deep under arctic ice to take photos of glowing jellyfish!"
      oneWordPoint={{ question: "What spins to help drones fly?", answer: "Propellers" }}
      keyPoints={[
        { icon: Navigation, title: 'Drone Wings', text: 'Spinning rotors generate lift to fly smoothly in the air.' },
        { icon: Camera, title: 'Aerial Vision', text: 'Takes high-altitude photos to monitor storms and crops.' },
        { icon: Shield, title: 'Rescue Helpers', text: 'Finds lost hikers in snowy mountains and drops warm blankets.' },
      ]}
      aiDialogue="Up in the air and down in the ocean! Drones and rovers are real-life adventure machines."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Machine Sorter",
          title: "Sort Flying Drones vs Ground Rovers",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'd1', label: 'Quadcopter with 4 spinning rotors', correctBin: 'A' },
                { id: 'd2', label: 'Tread-wheeled cave explorer rover', correctBin: 'B' },
                { id: 'd3', label: 'Aerial delivery drone carrying package', correctBin: 'A' },
                { id: 'd4', label: 'Six-wheeled Mars surface rover', correctBin: 'B' },
              ]}
              binALabel="Flying Drone (Air)"
              binBLabel="Ground Rover (Wheels/Tracks)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Rotor Speed",
          title: "Tune Rotor RPM for Hover",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Drone Hover Rotor RPM"
              description="Keep drone propeller speed between 3000 and 4200 RPM for stable hover."
              min={1000}
              max={6000}
              unit=" RPM"
              targetRange={[3000, 4200]}
              optimalLabel="Stable Hover! Drone sits still in mid-air."
              suboptimalLabel="Spinning too slow (falling) or too fast (climbing). Set to 3000-4200 RPM."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Drone Check",
          title: "Inspect Quadcopter Rotors",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Quadcopter Inspection"
              prompt="Identify all 3 drone flight components."
              hotspots={[
                { id: 'r1', label: 'Carbon Fiber Propeller', explanation: 'Aerodynamic lift blades verified.' },
                { id: 'r2', label: 'Gimbal 4K Camera', explanation: 'Stabilized visual stream active.' },
                { id: 'r3', label: 'Landing Skids', explanation: 'Absorbs gentle ground contact.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch4S5SpaceExplorers(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="Space Explorers: AI Beyond Earth"
      lessonSubtitle="Rovers on Mars & Deep Space Probes"
      simpleDefinition="Radio signals take up to 20 minutes to travel from Earth to Mars! Because of this delay, Mars rovers like Perseverance must use AI to steer themselves around rocks."
      smallExample="When the rover sees a giant boulder, its computer steers around it automatically without waiting for Earth to answer."
      oneWordPoint={{ question: "Where do rovers explore rocks?", answer: "On Mars" }}
      keyPoints={[
        { icon: Sparkles, title: 'Autonomous Driving', text: 'Thinks for itself to avoid falling into craters.' },
        { icon: Camera, title: 'Rock Lasers', text: 'Zaps rocks with laser beams to check what minerals are inside.' },
        { icon: Award, title: 'Sample Collector', text: 'Seals red dust in tubes for future astronauts to collect.' },
      ]}
      aiDialogue="Greetings from the Red Planet! Mars rovers are the bravest robotic explorers in the universe."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Space Matcher",
          title: "Match Rover Parts to Martian Duties",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: 'Solar Panels & Battery', right: 'Harvests power from sunlight' },
                { id: 'm2', left: 'Titanium Wheels', right: 'Climbs over sharp red rocks' },
                { id: 'm3', left: 'High Gain Antenna', right: 'Sends photos all the way to Earth' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Martian Waypoints",
          title: "Sequence Rover Waypoints on Mars",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'w1', label: '1. Take 360 panorama photo of crater', detail: 'Survey site' },
                { id: 'w2', label: '2. Roll 10 meters toward smooth bedrock', detail: 'Drive forward' },
                { id: 'w3', label: '3. Extend robotic arm to drill sample', detail: 'Collect sample' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'w1' && ids[1] === 'w2' && ids[2] === 'w3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Mineral Collector",
          title: "Collect Valid Mineral Samples",
          render: (onPass) => (
            <DataCollectorGrid
              title="Mars Mineral Sample Curator"
              goalPrompt="Tap all 3 interesting scientific rock samples."
              tokens={[
                { id: 's1', label: 'Layered River Bedrock', isValid: true, icon: <Sparkles size={12} /> },
                { id: 's2', label: 'Crushed Plastic Wrapper (Trash)', isValid: false },
                { id: 's3', label: 'Crystalline Quartz Core', isValid: true, icon: <Sparkles size={12} /> },
                { id: 's4', label: 'Shattered Mirror Fragment', isValid: false },
                { id: 's5', label: 'Ancient Volcanic Basalt', isValid: true, icon: <Sparkles size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch4S6MyTechTalent(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="Discover Your Tech Talent"
      lessonSubtitle="What are You Good At?"
      simpleDefinition="Everyone has a unique talent! Some kids love drawing, some love math, some love organizing games, and some love making people laugh. All of these talents help build great technology."
      smallExample="If you love telling stories, you can be a video game writer creating epic quests and heroes!"
      oneWordPoint={{ question: "Does everyone have a talent?", answer: "Yes!" }}
      keyPoints={[
        { icon: Sparkles, title: 'Curiosity', text: 'Asking "How does this work?" is the start of every invention.' },
        { icon: Heart, title: 'Kindness', text: 'Caring about others helps you build technology that helps people.' },
        { icon: Award, title: 'Practice', text: 'You don\'t have to be perfect; practicing makes you better every day.' },
      ]}
      aiDialogue="You have wonderful talents inside you! Let's explore what makes you special."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Talent Matcher",
          title: "Match Passions to Tech Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Loves Music & Rhymes', right: 'Audio Designer for Games' },
                { id: 'p2', left: 'Loves Building Legos', right: 'Robotics Hardware Architect' },
                { id: 'p3', left: 'Loves Organizing Books', right: 'Database Information Curator' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Curiosity Meter",
          title: "Calibrate Curiosity Energy",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Daily Learning Curiosity"
              description="Keep curiosity level at 100% full power!"
              min={50}
              max={100}
              unit="%"
              targetRange={[90, 100]}
              optimalLabel="Full Power Curiosity! Ready to explore and invent."
              suboptimalLabel="Don't hold back! Push curiosity all the way to 90-100%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Talent Badge Scanner",
          title: "Scan Superpower Badges",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Student Superpower Badges"
              prompt="Identify all 3 positive learner traits."
              hotspots={[
                { id: 'b1', label: 'Curious Problem Solver', explanation: 'Asks great questions.' },
                { id: 'b2', label: 'Kind Team Player', explanation: 'Shares ideas with classmates.' },
                { id: 'b3', label: 'Resilient Explorer', explanation: 'Tries again when making a mistake.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch4S7RiseCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 4"
      title="Rise Capstone: Future Inventor"
      lessonSubtitle="Dreaming Big with AI"
      simpleDefinition="You've explored future jobs, people behind tech, drones, and Mars rovers. With curiosity and teamwork, you are ready to be an inventor of the future."
      smallExample="You can sketch your own dream robot helper in a notebook right now!"
      oneWordPoint={{ question: "Can you be an inventor?", answer: "Yes!" }}
      keyPoints={[
        { icon: Award, title: 'Unlimited Potential', text: 'There is no limit to what you can learn and create.' },
        { icon: Sparkles, title: 'Build with Care', text: 'Always use technology to make the world kinder and greener.' },
        { icon: Heart, title: 'Never Stop Learning', text: 'The future belongs to curious explorers.' },
      ]}
      aiDialogue="Congratulations on completing Chapter 4! You're officially an honorary Future Tech Inventor."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Inventor Pipeline",
          title: "Assemble Future Invention Lifecycle",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'i1', label: '1. Dream up an invention to help people', detail: 'Inspiration' },
                { id: 'i2', label: '2. Build and test prototype with friends', detail: 'Creation' },
                { id: 'i3', label: '3. Launch machine to improve the world', detail: 'Triumph' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'i1' && ids[1] === 'i2' && ids[2] === 'i3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Core Calibration",
          title: "Calibrate Inventor Beacon",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Inventor Beacon Frequency"
              description="Tune beacon between 80% and 95%."
              min={20}
              max={100}
              unit="%"
              targetRange={[80, 95]}
              optimalLabel="Beacon Glowing Bright! Ready for future adventures."
              suboptimalLabel="Tune to 80-95% to lock beacon signal."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Pre-Flight Check",
          title: "Verify Inventor Badge",
          render: (onPass) => (
            <BugRepairStation
              title="Inventor Credentials Check"
              scenario="All modules completed. Final certification check."
              faultyComponent="Uncertified Inventor Status"
              repairOptions={[
                { id: 'r1', label: 'Grant Official Junior Inventor Star Badge', isCorrect: true, explanation: 'Star Badge unlocked! You are an official Class 3 Inventor.' },
                { id: 'r2', label: 'Cancel certificate and exit', isCorrect: false, explanation: 'You earned this badge; do not cancel!' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 5: AI CREATE — DRAW, IMAGINE & MUSIC WITH CREATIVE AI
// =============================================================================

function Class3Chapter5CreateWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch5S2AskExplore {...props} />
  if (sectionIdx === 2) return <C3Ch5S3DrawImagine {...props} />
  if (sectionIdx === 3) return <C3Ch5S4MusicStories {...props} />
  if (sectionIdx === 4) return <C3Ch5S5ColorStudio {...props} />
  if (sectionIdx === 5) return <C3Ch5S6StoryMaker {...props} />
  if (sectionIdx === 6) return <C3Ch5S7CreateCapstone {...props} />
  return <C3Ch5S2AskExplore {...props} />
}

function C3Ch5S2AskExplore(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Ask & Explore"
      lessonSubtitle="Curious Questions & Creative AI"
      simpleDefinition="Creative AI is like an endless coloring book and encyclopedia. When you ask 'Why is the sky blue?', it explains how sunlight bounces off air molecules!"
      smallExample="You can ask: 'What does a butterfly eat?' and AI explains: 'Butterflies sip sweet nectar from flowers through a straw-like tongue called a proboscis!'"
      oneWordPoint={{ question: "Can AI answer curious questions?", answer: "Yes!" }}
      keyPoints={[
        { icon: Sparkles, title: 'Infinite Questions', text: 'You can ask as many questions as you like without running out.' },
        { icon: BookOpen, title: 'Everyday Analogies', text: 'AI uses simple comparisons like baking cookies to explain science.' },
        { icon: Award, title: 'Think for Yourself', text: 'Always check exciting facts in library books or with your teacher.' },
      ]}
      aiDialogue="Curiosity is your biggest superpower! Ask and explore everything around you."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Curiosity Matcher",
          title: "Match Curious Questions to Fun Answers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'q1', left: '"Why do birds sing?"', right: 'To say hello and defend their nests' },
                { id: 'q2', left: '"How do clouds form?"', right: 'Warm water vapor rises and cools in the sky' },
                { id: 'q3', left: '"Why do we dream?"', right: 'Our brain organizes memories while we sleep' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Question Pipeline",
          title: "Sequence How an Inquiry Works",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'i1', label: '1. Notice something mysterious in nature', detail: 'Curious spark' },
                { id: 'i2', label: '2. Ask AI a specific, polite question', detail: 'Inquiry prompt' },
                { id: 'i3', label: '3. Learn fascinating facts and share with friends', detail: 'New knowledge' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'i1' && ids[1] === 'i2' && ids[2] === 'i3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Fact Curator",
          title: "Collect Real Scientific Facts",
          render: (onPass) => (
            <DataCollectorGrid
              title="Curate True Science Facts"
              goalPrompt="Tap all 3 real science facts."
              tokens={[
                { id: 'f1', label: 'Water freezes into ice at 0°C', isValid: true, icon: <Check size={12} /> },
                { id: 'f2', label: 'The moon is made of cheddar cheese', isValid: false },
                { id: 'f3', label: 'Honey bees do a waggle dance to communicate', isValid: true, icon: <Check size={12} /> },
                { id: 'f4', label: 'Trees walk around when humans are asleep', isValid: false },
                { id: 'f5', label: 'Plants make food using sunlight photosynthesis', isValid: true, icon: <Check size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch5S3DrawImagine(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Draw & Imagine"
      lessonSubtitle="Artistic AI & Visual Prompts"
      simpleDefinition="With image-generating AI, you describe a scene in words, and the computer paints a brand new picture based on the shapes and styles it studied!"
      smallExample="Prompt: 'A smiling purple kitten wearing astronaut boots on a green hill' turns your words into an adorable digital painting."
      oneWordPoint={{ question: "What creates the picture?", answer: "Your Words!" }}
      keyPoints={[
        { icon: Palette, title: 'Word to Art', text: 'Descriptive words like colors, lighting, and textures guide the image.' },
        { icon: Sparkles, title: 'Unique Every Time', text: 'Even the same prompt creates different artistic variations.' },
        { icon: Heart, title: 'Human Creativity', text: 'The idea always starts in your imagination!' },
      ]}
      aiDialogue="Imagine a dragon reading a book or a rabbit on roller skates! Words become pictures."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Art Matcher",
          title: "Match Art Styles to Prompts",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'a1', left: '"Watercolor style sunset"', right: 'Soft pastel bleeding brush strokes' },
                { id: 'a2', left: '"Pixel art arcade hero"', right: 'Retro blocky 8-bit squares' },
                { id: 'a3', left: '"Claymation cute bear"', right: 'Hand-sculpted 3D plasticine model' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Art Palette Dial",
          title: "Tune Creative Brightness",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Canvas Vibrant Brightness"
              description="Keep canvas color brightness between 75% and 90%."
              min={20}
              max={100}
              unit="%"
              targetRange={[75, 90]}
              optimalLabel="Colors Bursting with Joy! Vibrant and cheerful art."
              suboptimalLabel="Too dark or washed out. Slide to 75-90%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Art Studio Check",
          title: "Inspect Digital Canvas Studio",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Digital Painter Studio"
              prompt="Identify all 3 digital painting tools."
              hotspots={[
                { id: 'p1', label: 'Color Mixing Wheel', explanation: 'Mixes rainbow pigments.' },
                { id: 'p2', label: 'Texture Stylus Pen', explanation: 'Draws soft watercolor strokes.' },
                { id: 'p3', label: 'Style Filter Lens', explanation: 'Applies oil painting effect.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch5S4MusicStories(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Making Music & Stories with Creative AI"
      lessonSubtitle="Co-Creating Songs and Rhymes"
      simpleDefinition="You can co-create with AI! You provide the funny story idea or beat, and AI helps add rhyming lines, catchy melodies, and cheerful sound effects."
      smallExample="You write: 'The dancing turtle went to town', and AI suggests: 'Wearing a bright magenta crown!'"
      oneWordPoint={{ question: "What do words that sound alike do?", answer: "They Rhyme!" }}
      keyPoints={[
        { icon: Volume2, title: 'Catchy Rhythms', text: 'Drum beats and bass lines set the tempo for songs.' },
        { icon: BookOpen, title: 'Rhyme Finder', text: 'Helps you find words that rhyme with star, blue, or moon.' },
        { icon: Sparkles, title: 'Story Twists', text: 'Adds unexpected surprises to your bedtime fairy tales.' },
      ]}
      aiDialogue="Let's make some music! Tell me a story and we will turn it into a rhyming song."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Rhyme Matcher",
          title: "Match Rhyming Word Pairs",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'r1', left: 'Bright yellow Star', right: 'Traveling very Far' },
                { id: 'r2', left: 'Happy little Cat', right: 'Sitting on the Mat' },
                { id: 'r3', left: 'Silver shining Moon', right: 'Eating with a Spoon' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Song Tempo",
          title: "Tune Happy Dance Tempo",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Song Beat Tempo (BPM)"
              description="Keep upbeat dance music tempo between 110 and 125 BPM."
              min={60}
              max={180}
              unit=" BPM"
              targetRange={[110, 125]}
              optimalLabel="Upbeat & Joyful! Perfect tempo for happy dancing."
              suboptimalLabel="Too sluggish (slow) or too fast (racing). Set to 110-125 BPM."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Story Sequencer",
          title: "Assemble 3-Act Fairy Tale",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'f1', label: '1. Brave little hedgehog sets out on path', detail: 'Beginning' },
                { id: 'f2', label: '2. Discovers a lost magical glowing pebble', detail: 'Adventure' },
                { id: 'f3', label: '3. Returns home to share light with family', detail: 'Happy ending' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'f1' && ids[1] === 'f2' && ids[2] === 'f3') onPass()
              }}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch5S5ColorStudio(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Color Studio & Moods"
      lessonSubtitle="How Colors Tell Stories"
      simpleDefinition="Colors carry emotions! Warm yellows feel cheerful, cool blues feel calm and peaceful, and bright greens feel lively like a springtime meadow."
      smallExample="Painting a sunny playground in bright warm oranges and yellows makes people feel energetic and joyful."
      oneWordPoint={{ question: "What color feels calm?", answer: "Cool Blue" }}
      keyPoints={[
        { icon: Sun, title: 'Warm Colors', text: 'Reds, oranges, and yellows feel cozy, energetic, and sunny.' },
        { icon: Droplet, title: 'Cool Colors', text: 'Blues, purples, and teals feel calm, quiet, and peaceful.' },
        { icon: Palette, title: 'Contrast', text: 'Putting bright colors against dark backgrounds makes them pop!' },
      ]}
      aiDialogue="Every color tells a feeling! Let's explore moods and color harmonies."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Color Sorter",
          title: "Sort Warm vs Cool Colors",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'c1', label: 'Sunny Golden Yellow', correctBin: 'A' },
                { id: 'c2', label: 'Deep Ocean Blue', correctBin: 'B' },
                { id: 'c3', label: 'Warm Pumpkin Orange', correctBin: 'A' },
                { id: 'c4', label: 'Quiet Midnight Indigo', correctBin: 'B' },
              ]}
              binALabel="Warm Sunny Palette"
              binBLabel="Cool Calm Palette"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Color Harmony",
          title: "Tune Palette Saturation",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Color Saturation Balance"
              description="Keep color saturation between 65% and 80% for natural, pleasing artwork."
              min={20}
              max={100}
              unit="%"
              targetRange={[65, 80]}
              optimalLabel="Harmonious & Pleasing! Colors look natural and vibrant."
              suboptimalLabel="Colors look gray or eye-straining. Set to 65-80%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Color Palette Scan",
          title: "Scan Art Palette Nodes",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Creative Color Swatches"
              prompt="Identify all 3 harmonious primary swatches."
              hotspots={[
                { id: 's1', label: 'Sunburst Crimson', explanation: 'Warm energy focal point.' },
                { id: 's2', label: 'Meadow Emerald', explanation: 'Natural balance tone.' },
                { id: 's3', label: 'Sky Cerulean', explanation: 'Calm foundation backdrop.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch5S6StoryMaker(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Story Maker Studio"
      lessonSubtitle="Characters, Quests & Endings"
      simpleDefinition="Every great story has three parts: a hero we care about, an exciting challenge they must solve, and a happy resolution where they learn something meaningful."
      smallExample="Hero: A brave squirrel. Quest: Finding a lost acorn before winter. Ending: Friends share acorns together!"
      oneWordPoint={{ question: "Who is the main person in a story?", answer: "The Hero" }}
      keyPoints={[
        { icon: User, title: 'The Hero', text: 'Give your hero a fun quirk, like a puppy who loves wearing sunglasses.' },
        { icon: Target, title: 'The Quest', text: 'The exciting goal that gets your hero out on the adventure.' },
        { icon: Award, title: 'The Lesson', text: 'What the hero discovers about kindness, courage, or honesty.' },
      ]}
      aiDialogue="You are the author! What incredible quest will our hero undertake today?"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Story Element Matcher",
          title: "Match Story Elements to Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'e1', left: 'Main Character', right: 'Little blue robot who loves gardening' },
                { id: 'e2', left: 'Central Conflict', right: 'Drought makes flower garden thirsty' },
                { id: 'e3', left: 'Resolution', right: 'Robot builds solar rainwater collector' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Plot Sequencer",
          title: "Order the Adventure Plot",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'p1', label: '1. Hero leaves home on exciting quest', detail: 'Departure' },
                { id: 'p2', label: '2. Meets friendly helper in dark woods', detail: 'Ally joins' },
                { id: 'p3', label: '3. Solves puzzle and brings peace to kingdom', detail: 'Triumph' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'p1' && ids[1] === 'p2' && ids[2] === 'p3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Story Idea Collector",
          title: "Collect Inspiring Story Ideas",
          render: (onPass) => (
            <DataCollectorGrid
              title="Creative Story Prompts"
              goalPrompt="Tap all 3 imaginative story prompts."
              tokens={[
                { id: 'p1', label: 'A secret library hidden behind a waterfall', isValid: true, icon: <BookOpen size={12} /> },
                { id: 'p2', label: 'Staring at a blank gray wall for 2 hours', isValid: false },
                { id: 'p3', label: 'A mechanical clockwork bird that delivers letters', isValid: true, icon: <BookOpen size={12} /> },
                { id: 'p4', label: 'Sitting completely still in an empty room', isValid: false },
                { id: 'p5', label: 'A telescope that lets you peek at cloud castles', isValid: true, icon: <BookOpen size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch5S7CreateCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 5"
      title="Create Capstone: Master Artist"
      lessonSubtitle="Showcasing Your Imagination"
      simpleDefinition="You are now a master of creative co-creation! You've combined words, drawings, songs, and stories with AI to express your unique imagination."
      smallExample="You can keep an art folder with all the creative ideas you dreamed up!"
      oneWordPoint={{ question: "Whose imagination leads the art?", answer: "Yours!" }}
      keyPoints={[
        { icon: Award, title: 'Creative Master', text: 'You know how to use words to spark beautiful visuals.' },
        { icon: Sparkles, title: 'Original Ideas', text: 'Nobody in the world thinks exactly like you.' },
        { icon: Heart, title: 'Share Joy', text: 'Share your songs and stories to make friends smile.' },
      ]}
      aiDialogue="You are an amazing artist and storyteller! Let's celebrate with the Chapter 5 capstone."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Creative Chain",
          title: "Assemble Complete Creative Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'c1', label: '1. Spark of human imagination', detail: 'Original thought' },
                { id: 'c2', label: '2. Express idea in clear descriptive words', detail: 'Creative prompt' },
                { id: 'c3', label: '3. Digital canvas renders masterpiece', detail: 'Beautiful artwork' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'c1' && ids[1] === 'c2' && ids[2] === 'c3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Gallery Lighting",
          title: "Tune Digital Gallery Lighting",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Gallery Illumination Level"
              description="Keep gallery showcase lighting between 80% and 95%."
              min={20}
              max={100}
              unit="%"
              targetRange={[80, 95]}
              optimalLabel="Gallery Spotlight Perfect! Artwork shines with clarity."
              suboptimalLabel="Too dim or glaring. Tune to 80-95%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Art Badge Check",
          title: "Verify Master Artist Credentials",
          render: (onPass) => (
            <BugRepairStation
              title="Master Creator Certification"
              scenario="All artistic modules completed. Ready for Creative Star award."
              faultyComponent="Unsigned Creative Canvas"
              repairOptions={[
                { id: 'r1', label: 'Sign Canvas with Official Artist Signature', isCorrect: true, explanation: 'Canvas signed! You are now a certified Class 3 Creative Artist.' },
                { id: 'r2', label: 'Erase all colors and delete file', isCorrect: false, explanation: 'Never delete your hard work!' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTER 6: AI CARE — SAFETY RULES, PRIVACY & DIGITAL CITIZENSHIP
// =============================================================================

function Class3Chapter6CareWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C3Ch6S2SafetyRules {...props} />
  if (sectionIdx === 2) return <C3Ch6S3ShareWithCare {...props} />
  if (sectionIdx === 3) return <C3Ch6S4KindnessScreenTime {...props} />
  if (sectionIdx === 4) return <C3Ch6S5ProtectSecrets {...props} />
  if (sectionIdx === 5) return <C3Ch6S6DigitalCitizen {...props} />
  if (sectionIdx === 6) return <C3Ch6S7CareCapstone {...props} />
  return <C3Ch6S2SafetyRules {...props} />
}

function C3Ch6S2SafetyRules(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="My AI Safety Rules"
      lessonSubtitle="Staying Safe with Smart Tech"
      simpleDefinition="Just like looking both ways before crossing the road, there are golden safety rules online: Never share secret passwords, always ask a parent, and be kind!"
      smallExample="Rule #1: If a website asks for your home address or telephone number, ask an adult before typing anything!"
      oneWordPoint={{ question: "Should you share secret passwords?", answer: "Never!" }}
      keyPoints={[
        { icon: Lock, title: 'Secret Passwords', text: 'Keep passwords private like your toothbrush—never share them.' },
        { icon: Shield, title: 'Ask an Adult', text: 'If something feels weird or confusing, tell a parent or teacher immediately.' },
        { icon: Check, title: 'Safe Playgrounds', text: 'Use child-safe apps built especially for curious kids.' },
      ]}
      aiDialogue="Safety comes first! When we follow smart safety rules, technology is always fun and safe."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Safety Sorter",
          title: "Sort Safe Online Choices vs Unsafe Choices",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 's1', label: 'Asking Mom before downloading a game', correctBin: 'A' },
                { id: 's2', label: 'Typing home street address into a stranger quiz', correctBin: 'B' },
                { id: 's3', label: 'Keeping your password secret in your memory', correctBin: 'A' },
                { id: 's4', label: 'Sharing family bank numbers with a chatbot', correctBin: 'B' },
              ]}
              binALabel="Safe & Smart Choice"
              binBLabel="Dangerous / Unsafe"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Golden Rules Pipeline",
          title: "Order the 3 Steps of Online Safety",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'r1', label: '1. Spot unexpected popup or question', detail: 'Pause' },
                { id: 'r2', label: '2. Think: Is this personal private info?', detail: 'Reflect' },
                { id: 'r3', label: '3. Ask a trusted parent or teacher', detail: 'Ask adult' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'r1' && ids[1] === 'r2' && ids[2] === 'r3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Safety Shield Scanner",
          title: "Inspect Cyber Shield Badges",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Cyber Safety Shield"
              prompt="Identify all 3 active safety guardian badges."
              hotspots={[
                { id: 's1', label: 'Password Vault Lock', explanation: 'Prevents unauthorized access.' },
                { id: 's2', label: 'Parent Permission Gateway', explanation: 'Ensures trusted adult guidance.' },
                { id: 's3', label: 'Privacy Filter Mesh', explanation: 'Keeps personal identity safe.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch6S3ShareWithCare(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="Share with Care"
      lessonSubtitle="Protecting Your Personal Footprint"
      simpleDefinition="Whatever you post or share online stays there for a long time. Share fun drawings and happy thoughts, but keep real full names and locations private."
      smallExample="Safe to share: A photo of a painting of a dinosaur you drew. Private: A photo of your school ID card."
      oneWordPoint={{ question: "Does online sharing last long?", answer: "Yes!" }}
      keyPoints={[
        { icon: Shield, title: 'Private Clues', text: 'Don\'t share street signs, house numbers, or school uniform badges.' },
        { icon: Heart, title: 'Kind Words Only', text: 'Only post comments that would make someone smile.' },
        { icon: Lock, title: 'Think Before Posting', text: 'Ask yourself: "Would I show this to my grandma?"' },
      ]}
      aiDialogue="Share with care! A good digital footprint is full of kindness and creativity."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Share Sorter",
          title: "Classify Safe to Share vs Private Secrets",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'p1', label: 'Photo of a rocket drawing you painted', correctBin: 'A' },
                { id: 'p2', label: 'Photo of your family passport or ID', correctBin: 'B' },
                { id: 'p3', label: 'Audio of a funny knock-knock joke', correctBin: 'A' },
                { id: 'p4', label: 'Your home street address and door number', correctBin: 'B' },
              ]}
              binALabel="Safe to Share with Friends"
              binBLabel="Private Family Secret"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Privacy Filter",
          title: "Tune Privacy Protection Filter",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Personal Privacy Shield Strength"
              description="Keep privacy shield strength between 90% and 100%."
              min={50}
              max={100}
              unit="%"
              targetRange={[90, 100]}
              optimalLabel="Privacy Shield Locked! Personal identity 100% safe."
              suboptimalLabel="Shield strength too low. Slide to 90-100%."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Safe Tokens",
          title: "Collect Safe Items to Share",
          render: (onPass) => (
            <DataCollectorGrid
              title="Safe Portfolio Curator"
              goalPrompt="Tap all 3 safe items to include in an art portfolio."
              tokens={[
                { id: 't1', label: 'Drawing of a cartoon spaceship', isValid: true, icon: <Check size={12} /> },
                { id: 't2', label: 'Photo of front door key and address', isValid: false },
                { id: 't3', label: 'Fun poem about autumn leaves', isValid: true, icon: <Check size={12} /> },
                { id: 't4', label: 'Parents credit card number', isValid: false },
                { id: 't5', label: 'Science poster about Jupiter', isValid: true, icon: <Check size={12} /> },
              ]}
              targetCount={3}
              onCollectedAll={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch6S4KindnessScreenTime(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="Kindness & Balanced Screen Time"
      lessonSubtitle="Healthy Habits in the Digital World"
      simpleDefinition="Screens are great for learning and creativity, but real life is where your body grows! Playing outside, reading paper books, and sleeping well keep you happy and strong."
      smallExample="The 20-20-20 rule: Every 20 minutes of screen time, look at something 20 feet away for 20 seconds to rest your eyes!"
      oneWordPoint={{ question: "Should you take breaks from screens?", answer: "Yes!" }}
      keyPoints={[
        { icon: Clock, title: 'Screen Time Limits', text: 'Set a friendly timer so you remember when to run and play outside.' },
        { icon: Eye, title: 'Rest Your Eyes', text: 'Look out the window at green trees to give your eyes a break.' },
        { icon: Heart, title: 'Digital Kindness', text: 'Always use polite words in chat games, just like on the school playground.' },
      ]}
      aiDialogue="Balance is beautiful! Let's build healthy habits for screens and outdoor sunshine."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Habit Matcher",
          title: "Match Healthy Habits to Benefits",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'h1', left: 'Playing Soccer in Park', right: 'Builds strong bones and muscles' },
                { id: 'h2', left: '20-20-20 Eye Breaks', right: 'Keeps eyes relaxed and fresh' },
                { id: 'h3', left: 'Turning Off Screens at Bedtime', right: 'Gives peaceful, deep sleep' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Screen Balance",
          title: "Tune Daily Creative Screen Time",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Balanced Daily Screen Interval"
              description="Keep creative study screen time between 30 and 45 minutes before a play break."
              min={10}
              max={120}
              unit=" mins"
              targetRange={[30, 45]}
              optimalLabel="Perfect Balance! Great learning time followed by outdoor fun."
              suboptimalLabel="Too short or too long without a stretch. Set to 30-45 mins."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Kind Action Sorter",
          title: "Sort Kind Words vs Mean Words",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'w1', label: '"Great job on that drawing, friend!"', correctBin: 'A' },
                { id: 'w2', label: '"You are bad at this game"', correctBin: 'B' },
                { id: 'w3', label: '"Thank you for sharing your ideas!"', correctBin: 'A' },
                { id: 'w4', label: '"Nobody likes your score"', correctBin: 'B' },
              ]}
              binALabel="Kind Digital Citizen"
              binBLabel="Mean / Unkind Comment"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch6S5ProtectSecrets(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="Protect Secrets & Password Safety"
      lessonSubtitle="Building Strong Vault Locks"
      simpleDefinition="A strong password is like a magical castle gate. Make it long, use secret words that strangers can't guess, and keep it safe from prying eyes."
      smallExample="Weak password: '123456'. Strong password: 'Blue-Panda-Bouncing-77!' (hard to guess, easy to remember!)."
      oneWordPoint={{ question: "Is '123456' a good password?", answer: "No!" }}
      keyPoints={[
        { icon: Lock, title: 'No Easy Numbers', text: 'Never use 1234 or your own birthday.' },
        { icon: Shield, title: 'Word Combos', text: 'Combine 3 fun, unrelated words like Panda-Bicycle-Star.' },
        { icon: Check, title: 'Never Tell Friends', text: 'Real friends won\'t ask for your secret password.' },
      ]}
      aiDialogue="Keep your digital castle locked tight! Let's test what makes a password super strong."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Password Sorter",
          title: "Sort Strong Passwords vs Weak Passwords",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'p1', label: '"Tiger-Jump-Yellow-88!"', correctBin: 'A' },
                { id: 'p2', label: '"123456"', correctBin: 'B' },
                { id: 'p3', label: '"Cloud-Whistle-999#"', correctBin: 'A' },
                { id: 'p4', label: '"password"', correctBin: 'B' },
              ]}
              binALabel="Strong Secret Password"
              binBLabel="Weak / Easily Guessed"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Lock Strength Dial",
          title: "Calibrate Vault Encryption",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Vault Key Strength (Bits)"
              description="Keep security key strength between 128 and 256 bits."
              min={32}
              max={512}
              step={16}
              unit=" bits"
              targetRange={[128, 256]}
              optimalLabel="Vault Locked! Invulnerable to cyber guessing attacks."
              suboptimalLabel="Key too weak or overpowered. Slide to 128-256 bits."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Password Blocks",
          title: "Assemble 3-Part Strong Password",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Build Safe Passphrase"
              instruction="Assemble the 3 parts of a strong passphrase in order."
              availableBlocks={[
                { id: 'w1', text: '1. Animal Word (Panda)' },
                { id: 'w2', text: '2. Action Word (Dancing)' },
                { id: 'w3', text: '3. Number & Symbol (99!)' },
              ]}
              targetSequence={['w1', 'w2', 'w3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch6S6DigitalCitizen(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="Being a Smart Digital Citizen"
      lessonSubtitle="Honesty, Respect & Helping Others"
      simpleDefinition="A digital citizen is someone who uses the internet responsibly: giving credit when sharing other people's art, speaking with kindness, and standing up for friends."
      smallExample="If someone in an online game is feeling sad or left out, saying 'Hey, come join our team!' is being a true digital citizen."
      oneWordPoint={{ question: "Should we stand up for friends online?", answer: "Always!" }}
      keyPoints={[
        { icon: Award, title: 'Give Credit', text: 'If you use a friend\'s drawing in a presentation, write "Art by Maya".' },
        { icon: Heart, title: 'Stand Up for Kindness', text: 'Report bullying and invite lonely classmates to play.' },
        { icon: Sparkles, title: 'Make Internet Better', text: 'Leave every digital playground better than you found it.' },
      ]}
      aiDialogue="You have the power to make the internet a happier, kinder place for everyone."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Citizen Matcher",
          title: "Match Online Challenges to Kind Actions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'c1', left: 'Someone is being mean in chat', right: 'Tell teacher and block the user' },
                { id: 'c2', left: 'A classmate shares a cool project', right: 'Leave a polite, cheering compliment' },
                { id: 'c3', left: 'Using an online photo for science', right: 'Add the creator source link' },
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Citizen Pipeline",
          title: "Sequence Responsible Actions",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'c1', label: '1. Treat online people with real playground respect', detail: 'Golden rule' },
                { id: 'c2', label: '2. Protect personal family data and passwords', detail: 'Privacy lock' },
                { id: 'c3', label: '3. Spread knowledge, helpfulness, and joy', detail: 'Positive impact' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'c1' && ids[1] === 'c2' && ids[2] === 'c3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 3 · Citizen Badge Check",
          title: "Scan Citizen Virtues",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Digital Citizen Honor Badges"
              prompt="Identify all 3 digital citizen core virtues."
              hotspots={[
                { id: 'v1', label: 'Digital Kindness Star', explanation: 'Always speaks respectfully.' },
                { id: 'v2', label: 'Privacy Guardian Shield', explanation: 'Guards family passwords securely.' },
                { id: 'v3', label: 'Truth & Honesty Beacon', explanation: 'Shares authentic, helpful facts.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C3Ch6S7CareCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 3 · Chapter 6"
      title="Care Capstone: Digital Citizen Star"
      lessonSubtitle="Class 3 Grand Graduation"
      simpleDefinition="Congratulations! You have completed all 6 chapters of Class 3 Junior AI & Playful Logic. You understand sensors, prompts, helper machines, and digital safety rules."
      smallExample="You are now officially ready to graduate and step forward into Class 4 Elementary AI!"
      oneWordPoint={{ question: "Are you ready for Class 4?", answer: "100% Yes!" }}
      keyPoints={[
        { icon: Award, title: 'Grand Champion', text: 'You conquered all lessons, mini-games, and safety challenges!' },
        { icon: Star, title: 'Star Citizen', text: 'You use technology with kindness, wisdom, and curiosity.' },
        { icon: Sparkles, title: 'Next Level Awaits', text: 'Class 4 Story & Algorithmic Adventure is ready for you.' },
      ]}
      aiDialogue="Hooray! I am so proud of you. You are officially an accredited Class 3 AI Graduate! Let's conquer the final graduation games."
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={40}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Graduation Chain",
          title: "Assemble Full Class 3 Journey",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'g1', label: '1. Chapter 1 & 2: Sensors & Voice Prompts', detail: 'Foundations' },
                { id: 'g2', label: '2. Chapter 3 & 4: Helpers in Towns & Future Tech', detail: 'Applications' },
                { id: 'g3', label: '3. Chapter 5 & 6: Creative Art & Safety Rules', detail: 'Mastery' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'g1' && ids[1] === 'g2' && ids[2] === 'g3') onPass()
              }}
            />
          )
        },
        {
          badge: "Game 2 · Star Graduation Dial",
          title: "Calibrate Graduation Energy",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Mastery Certification Index"
              description="Keep graduation mastery at 100% full power!"
              min={50}
              max={100}
              unit="%"
              targetRange={[90, 100]}
              optimalLabel="100% Mastery Confirmed! Class 3 Completed."
              suboptimalLabel="Push mastery to 90-100% for full honors."
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Graduation Shield",
          title: "Award Official Graduation Star",
          render: (onPass) => (
            <BugRepairStation
              title="Official Class 3 Certification"
              scenario="All 6 chapters completed. Ready to award Class 3 Star Diploma."
              faultyComponent="Pending Graduation Ceremony"
              repairOptions={[
                { id: 'r1', label: 'Award Official Class 3 AI Star Diploma & Unlock Class 4', isCorrect: true, explanation: 'Diploma Awarded! Class 4 Elementary AI is now unlocked for you!' },
                { id: 'r2', label: 'Reset back to start', isCorrect: false, explanation: 'You earned graduation; claim your diploma!' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}
