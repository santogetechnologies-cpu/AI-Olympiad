import { supabase } from '../lib/supabase'
import { quizService } from './contentServices'
import { curriculumCatalogService } from './curriculumCatalogService'

export type MasteryQuestionType = 'mcq' | 'scenario' | 'true_false' | 'matching' | 'ordering' | 'visual_select' | 'short_answer'

export interface DynamicQuizQuestion {
  id: string
  question: string
  options: { id: string; text: string; isCorrect: boolean }[]
  explanation: string
  hint?: string
  difficulty: 'easy' | 'medium' | 'hard'
  questionType?: MasteryQuestionType
  scenarioContext?: string
  matchingPairs?: { id: string; left: string; right: string }[]
  orderingItems?: { id: string; text: string; correctOrder: number }[]
  topic?: string
}

export interface QuizAttemptRecord {
  id: string
  studentId: string
  classId?: string
  academicLevel?: string
  subjectId?: string
  subjectName?: string
  chapterId?: string
  chapterTitle?: string
  lessonId?: string
  lessonTitle?: string
  quizId?: string
  attemptNumber: number
  totalMarks: number
  scoredMarks: number
  accuracy: number
  passed: boolean
  completedAt: string
  answers: {
    questionId: string
    questionText: string
    questionType?: MasteryQuestionType
    selectedOptionId?: string
    selectedText?: string
    correctText?: string
    isCorrect: boolean
    explanation: string
  }[]
}

export interface StructuredQuizJson {
  class: string
  chapter: string
  subject: string
  lesson: string
  questions: Array<{
    id: string
    question: string
    options: {
      A: string
      B: string
      C: string
      D: string
    }
    correct_answer: 'A' | 'B' | 'C' | 'D'
    explanation: string
  }>
}

export interface GeneratedQuiz {
  quizId?: string
  title: string
  class?: string
  chapter?: string
  subject?: string
  lesson?: string
  subjectName: string
  chapterTitle: string
  lessonTitle: string
  academicLevel: string
  timeLimit: number
  passingPercentage: number
  questions: DynamicQuizQuestion[]
  structuredJson?: StructuredQuizJson
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION ID GENERATOR (SECTION 8)
// Class + Chapter + Lesson + Question Number (e.g. C3-AID-01-Q001)
// ─────────────────────────────────────────────────────────────────────────────

export function getShortClassCode(academicLevel: string = '', gradeKey: string = ''): string {
  const norm = `${gradeKey} ${academicLevel}`.toLowerCase()
  if (norm.includes('class 3') || norm.includes('class3') || norm.includes('cls-03')) return 'C3'
  if (norm.includes('class 4') || norm.includes('class4') || norm.includes('cls-04')) return 'C4'
  if (norm.includes('class 5') || norm.includes('class5') || norm.includes('cls-05')) return 'C5'
  if (norm.includes('class 6') || norm.includes('class6') || norm.includes('cls-06')) return 'C6'
  if (norm.includes('class 7') || norm.includes('class7') || norm.includes('cls-07')) return 'C7'
  if (norm.includes('class 8') || norm.includes('class8') || norm.includes('cls-08')) return 'C8'
  if (norm.includes('class 9') || norm.includes('class9') || norm.includes('cls-09')) return 'C9'
  if (norm.includes('class 10') || norm.includes('class10') || norm.includes('cls-10')) return 'C10'
  if (norm.includes('class 11') || norm.includes('class11') || norm.includes('cls-11')) return 'C11'
  if (norm.includes('class 12') || norm.includes('class12') || norm.includes('cls-12')) return 'C12'
  if (norm.includes('ug 1') || norm.includes('ug1') || norm.includes('ug-01')) return 'UG1'
  if (norm.includes('ug 2') || norm.includes('ug2') || norm.includes('ug-02')) return 'UG2'
  if (norm.includes('ug 3') || norm.includes('ug3') || norm.includes('ug-03')) return 'UG3'
  if (norm.includes('ug final') || norm.includes('ug4') || norm.includes('ug-04')) return 'UG4'
  if (norm.includes('pg 1') || norm.includes('pg1') || norm.includes('pg-01')) return 'PG1'
  if (norm.includes('pg final') || norm.includes('pg2') || norm.includes('pg-02')) return 'PG2'
  return 'C3'
}

export function getShortChapterCode(chapterTitle: string = '', chapterNum: string | number = '1'): string {
  const norm = `${chapterTitle} ${chapterNum}`.toLowerCase()
  if (norm.includes('discover') || norm.includes('basics') || String(chapterNum) === '1') return 'AID'
  if (norm.includes('connect') || norm.includes('communicate') || String(chapterNum) === '2') return 'AIC'
  if (norm.includes('solve') || norm.includes('applications') || String(chapterNum) === '3') return 'AIS'
  if (norm.includes('rise') || norm.includes('career') || String(chapterNum) === '4') return 'AIR'
  if (norm.includes('create') || norm.includes('tools') || String(chapterNum) === '5') return 'ACR'
  if (norm.includes('care') || norm.includes('responsible') || String(chapterNum) === '6') return 'ACA'
  return 'AID'
}

export function getShortLessonNum(lessonTitle: string = ''): string {
  const norm = lessonTitle.toLowerCase()
  if (norm.includes('full chapter') || norm.includes('mastery') || norm.includes('all lessons')) return 'FULL'
  if (norm.includes('lesson 2') || norm.includes('- 2') || norm.includes('part 2') || norm.includes('topic 2')) return '02'
  return '01'
}

export function generateQuestionId(
  classCode: string,
  chapterCode: string,
  lessonCode: string,
  index: number
): string {
  const qNum = String(index + 1).padStart(3, '0')
  return `${classCode}-${chapterCode}-${lessonCode}-Q${qNum}`
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE CURRICULUM TOPIC QUESTION REGISTRY
// Real, authentic questions generated specifically from curriculum lessons
// ─────────────────────────────────────────────────────────────────────────────

const TOPIC_QUESTION_MAP: Record<string, DynamicQuizQuestion[]> = {
  // ── WHAT IS ARTIFICIAL INTELLIGENCE? / AI BASICS ──────────────────────────
  'what is artificial intelligence?': [
    {
      id: 'wai-1',
      question: 'What is the primary definition of Artificial Intelligence (AI)?',
      options: [
        { id: '1', text: 'Computer systems capable of performing tasks that typically require human intelligence, such as perception, reasoning, and learning', isCorrect: true },
        { id: '2', text: 'Mechanical clockwork machines powered purely by wound springs', isCorrect: false },
        { id: '3', text: 'Static calculators that only execute fixed addition without memory', isCorrect: false },
        { id: '4', text: 'Biological brains transplanted into plastic cases', isCorrect: false },
      ],
      explanation: 'Artificial Intelligence refers to software and systems that simulate cognitive functions like problem solving, visual understanding, and learning.',
      hint: 'Think about computer programs that can perceive, learn, and make decisions.',
      difficulty: 'easy',
    },
    {
      id: 'wai-2',
      question: 'Which of the following is a real-world example of Narrow (Weak) AI used daily?',
      options: [
        { id: '1', text: 'Email spam filtering and smartphone facial recognition unlock', isCorrect: true },
        { id: '2', text: 'A conscious machine that has real human emotions', isCorrect: false },
        { id: '3', text: 'A regular non-electric ballpoint pen', isCorrect: false },
        { id: '4', text: 'A wooden bookshelf holding paper encyclopedias', isCorrect: false },
      ],
      explanation: 'Narrow AI excels at performing dedicated single tasks, such as classifying spam or recognizing facial features.',
      hint: 'Look for common phone or web software that makes smart predictions.',
      difficulty: 'easy',
    },
    {
      id: 'wai-3',
      question: 'What is the key difference between Artificial Intelligence and traditional rule-based programs?',
      options: [
        { id: '1', text: 'AI systems can learn patterns from data and adapt, whereas traditional code only follows hardcoded if-else steps', isCorrect: true },
        { id: '2', text: 'Traditional programs require electricity while AI does not', isCorrect: false },
        { id: '3', text: 'AI cannot process numbers or text', isCorrect: false },
        { id: '4', text: 'Traditional software can feel sad while AI cannot', isCorrect: false },
      ],
      explanation: 'Machine learning allows AI to infer rules and relationships from training examples rather than requiring humans to program every condition.',
      hint: 'AI learns from data instead of relying solely on fixed manual rules.',
      difficulty: 'medium',
    },
    {
      id: 'wai-4',
      question: 'Which hardware component allows an AI assistant to "hear" human spoken commands?',
      options: [
        { id: '1', text: 'Microphone sensor', isCorrect: true },
        { id: '2', text: 'Computer monitor bezel', isCorrect: false },
        { id: '3', text: 'Power wall adapter', isCorrect: false },
        { id: '4', text: 'Plastic desk stand', isCorrect: false },
      ],
      explanation: 'Microphones convert acoustic sound waves into digital audio signals that speech recognition models process.',
      hint: 'The audio input sensor.',
      difficulty: 'easy',
    },
    {
      id: 'wai-5',
      question: 'What is Machine Learning (ML) in relation to Artificial Intelligence?',
      options: [
        { id: '1', text: 'A core branch of AI that enables systems to automatically learn and improve from experience and data', isCorrect: true },
        { id: '2', text: 'A screen cleaning cloth used for computer monitors', isCorrect: false },
        { id: '3', text: 'A physical robot arm used solely in car factories', isCorrect: false },
        { id: '4', text: 'A replacement for all internet cables', isCorrect: false },
      ],
      explanation: 'Machine Learning is a subset of AI focused on training statistical models on datasets to make predictions.',
      hint: 'Subset of AI focused on learning from data.',
      difficulty: 'medium',
    },
  ],

  'introduction to ai': [
    {
      id: 'intro-ai-1',
      question: 'Who is widely regarded as the "Father of Artificial Intelligence" for proposing the Turing Test?',
      options: [
        { id: '1', text: 'Alan Turing', isCorrect: true },
        { id: '2', text: 'Alexander Graham Bell', isCorrect: false },
        { id: '3', text: 'Thomas Edison', isCorrect: false },
        { id: '4', text: 'Isaac Newton', isCorrect: false },
      ],
      explanation: 'Alan Turing introduced the concept of machine intelligence and the Turing Test in 1950.',
      hint: 'British mathematician who cracked the Enigma code.',
      difficulty: 'easy',
    },
    {
      id: 'intro-ai-2',
      question: 'What term describes an AI designed to handle any intellectual task that a human being can do?',
      options: [
        { id: '1', text: 'Artificial General Intelligence (AGI)', isCorrect: true },
        { id: '2', text: 'Narrow AI', isCorrect: false },
        { id: '3', text: 'Weak AI', isCorrect: false },
        { id: '4', text: 'Embedded Microcontroller', isCorrect: false },
      ],
      explanation: 'Artificial General Intelligence (AGI) refers to hypothetical AI systems that match or exceed human generalized cognitive breadth.',
      hint: 'General Intelligence across all domains.',
      difficulty: 'medium',
    },
    {
      id: 'intro-ai-3',
      question: 'Which of the following is essential for training modern Artificial Intelligence models?',
      options: [
        { id: '1', text: 'Large volumes of clean, structured data and computational processing power', isCorrect: true },
        { id: '2', text: 'A physical paper filing cabinet', isCorrect: false },
        { id: '3', text: 'Turning off computer cooling fans', isCorrect: false },
        { id: '4', text: 'Removing all operating system drivers', isCorrect: false },
      ],
      explanation: 'Modern deep learning requires vast datasets (images, text, audio) and parallel compute (GPUs/TPUs).',
      hint: 'Data and compute are the fuel of modern AI.',
      difficulty: 'easy',
    },
    {
      id: 'intro-ai-4',
      question: 'How do smart camera applications recognize whether a photo contains a dog or a cat?',
      options: [
        { id: '1', text: 'Using Convolutional Neural Networks trained on thousands of labeled pet images', isCorrect: true },
        { id: '2', text: 'By listening to the camera battery', isCorrect: false },
        { id: '3', text: 'By guessing randomly on each snapshot', isCorrect: false },
        { id: '4', text: 'Cameras cannot classify animals', isCorrect: false },
      ],
      explanation: 'Computer vision models extract visual features (edges, textures, shapes) to classify image contents accurately.',
      hint: 'Computer vision neural networks learn visual features.',
      difficulty: 'medium',
    },
    {
      id: 'intro-ai-5',
      question: 'True or False: An AI system can become biased if its training data over-represents one group and under-represents another.',
      options: [
        { id: '1', text: 'True! Training data skews directly influence the model’s predictions and decisions', isCorrect: true },
        { id: '2', text: 'False! Computers automatically eliminate all human biases without intervention', isCorrect: false },
      ],
      explanation: 'Machine learning algorithms mirror the statistical distributions and biases present in their training datasets.',
      hint: 'Biased training data produces biased model outputs.',
      difficulty: 'easy',
    },
  ],

  // ── CHAPTER 1: AI DISCOVER ────────────────────────────────────────────────
  'meet my ai friend': [
    {
      id: 'mmaf-1',
      question: 'What is an AI friend like Alexa or Siri?',
      options: [
        { id: '1', text: 'A smart software program that listens to voice and responds helpfully', isCorrect: true },
        { id: '2', text: 'A real animal with fur and paws', isCorrect: false },
        { id: '3', text: 'A regular wooden table or chair', isCorrect: false },
        { id: '4', text: 'A paper book with printed words', isCorrect: false },
      ],
      explanation: 'AI assistants are software programs designed to recognize human speech and provide helpful answers.',
      hint: 'Think about what powers smart speakers.',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-2',
      question: 'Which hardware component acts like the "ears" of an AI assistant?',
      options: [
        { id: '1', text: 'Microphone', isCorrect: true },
        { id: '2', text: 'Power switch', isCorrect: false },
        { id: '3', text: 'Charging cable', isCorrect: false },
        { id: '4', text: 'Plastic case', isCorrect: false },
      ],
      explanation: 'Microphones capture human sound waves and convert them into electrical audio signals for AI models.',
      hint: 'What do we speak into to record sound?',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-3',
      question: 'How does an AI friend learn to recognize your voice?',
      options: [
        { id: '1', text: 'By analyzing audio wave patterns from speech data', isCorrect: true },
        { id: '2', text: 'By eating delicious food', isCorrect: false },
        { id: '3', text: 'By taking a long nap', isCorrect: false },
        { id: '4', text: 'By looking into a mirror', isCorrect: false },
      ],
      explanation: 'Smart devices use speech recognition models to detect frequency and waveform patterns.',
      hint: 'It studies patterns in audio signals.',
      difficulty: 'medium',
    },
    {
      id: 'mmaf-4',
      question: 'Can an AI assistant experience real human feelings like sadness or joy?',
      options: [
        { id: '1', text: 'No, AI has no real biological feelings; it executes coded algorithms', isCorrect: true },
        { id: '2', text: 'Yes, computers cry when their batteries run low', isCorrect: false },
        { id: '3', text: 'Yes, machines get angry when turned off', isCorrect: false },
        { id: '4', text: 'Only on weekends', isCorrect: false },
      ],
      explanation: 'AI models simulate conversational responses without having consciousness or biological emotions.',
      hint: 'Remember that computers are machines, not living organisms.',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-5',
      question: 'What is the most effective way to speak to an AI assistant?',
      options: [
        { id: '1', text: 'Speak clearly with simple and specific instructions', isCorrect: true },
        { id: '2', text: 'Whisper so quietly nobody can hear', isCorrect: false },
        { id: '3', text: 'Shout loud random sounds', isCorrect: false },
        { id: '4', text: 'Speak in complete silence', isCorrect: false },
      ],
      explanation: 'Clear pronunciation and precise instructions allow the speech model to transcribe words accurately.',
      hint: 'Clear words produce clear results.',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-6',
      question: 'How did the AI speaker know the tallest animal is a giraffe?',
      options: [
        { id: '1', text: 'By searching its trained knowledge base for animal facts', isCorrect: true },
        { id: '2', text: 'By visiting the zoo in person yesterday', isCorrect: false },
        { id: '3', text: 'By flipping a wooden coin', isCorrect: false },
        { id: '4', text: 'By guessing randomly', isCorrect: false },
      ],
      explanation: 'AI assistants query structured knowledge bases to retrieve verified factual data.',
      scenarioContext: 'Scenario: A child asks an AI smart speaker, "What is the tallest animal on Earth?" The speaker answers "A giraffe!" in two seconds.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-7',
      question: 'An AI friend learns to understand your voice clearer as you practice talking to it.',
      options: [
        { id: '1', text: 'True — Speech models adapt to user acoustic patterns and pronunciation', isCorrect: true },
        { id: '2', text: 'False — AI voice recognition never changes after factory assembly', isCorrect: false },
      ],
      explanation: 'Voice recognition algorithms adapt to speech patterns over time to improve transcription accuracy.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-8',
      question: 'Match Human Friend traits with AI Helper traits:',
      options: [
        { id: '1', text: 'Humans provide empathy and imagination; AI provides speed and memory', isCorrect: true },
        { id: '2', text: 'AI has biological feelings while humans only calculate numbers', isCorrect: false },
      ],
      matchingPairs: [
        { id: 'p1', left: 'Human Friend', right: 'Has true feelings, empathy and creativity' },
        { id: 'p2', left: 'AI Helper', right: 'Calculates fast, remembers facts and follows instructions' },
        { id: 'p3', left: 'Great Teamwork', right: 'Humans and AI solving puzzles together' },
      ],
      explanation: 'Humans bring emotional depth and ethical wisdom, while AI provides rapid information processing.',
      questionType: 'matching',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-9',
      question: 'Order the proper steps to talk to an AI helper:',
      options: [
        { id: '1', text: '1. Wake up helper -> 2. Ask question -> 3. Listen to answer', isCorrect: true },
        { id: '2', text: '1. Listen to answer -> 2. Wake up helper -> 3. Ask question', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'Wake up the helper with its name ("Hello Aura")', correctOrder: 1 },
        { id: 'ord-2', text: 'Ask your question clearly in normal tone', correctOrder: 2 },
        { id: 'ord-3', text: 'Listen to the helpful spoken response', correctOrder: 3 },
      ],
      explanation: 'Interacting with an AI assistant follows wake-word detection, speech processing, and audio output generation.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-10',
      question: 'Why should we always follow digital safety and good manners when using AI helpers?',
      options: [
        { id: '1', text: 'Because good manners and safety protect our personal privacy and keep devices secure', isCorrect: true },
        { id: '2', text: 'Because computers get angry and stop working', isCorrect: false },
        { id: '3', text: 'Because microphones break when you ask questions', isCorrect: false },
        { id: '4', text: 'It does not matter how we speak to AI', isCorrect: false },
      ],
      explanation: 'Practicing digital safety prevents accidental sharing of sensitive private information.',
      hint: 'Protecting privacy and safety.',
      difficulty: 'easy',
    },
    {
      id: 'mmaf-11',
      question: 'True or False: An AI helper is powered by computer software code and electricity.',
      options: [
        { id: '1', text: 'True — AI helpers run on digital code and electronic processors', isCorrect: true },
        { id: '2', text: 'False — AI helpers are biological living creatures', isCorrect: false },
      ],
      explanation: 'AI assistants are purely digital software tools running on electronic hardware.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
  ],

  'machines that help us': [
    {
      id: 'mthu-1',
      question: 'Which of the following is an automated machine that cleans floors independently?',
      options: [
        { id: '1', text: 'Robotic vacuum cleaner', isCorrect: true },
        { id: '2', text: 'Manual feather duster', isCorrect: false },
        { id: '3', text: 'Standard wooden broom', isCorrect: false },
        { id: '4', text: 'Plastic mop bucket', isCorrect: false },
      ],
      explanation: 'Robotic vacuums use obstacle sensors and floor mapping software to clean without manual effort.',
      hint: 'It has wheels, sensors, and an internal motor.',
      difficulty: 'easy',
    },
    {
      id: 'mthu-2',
      question: 'How do smart machines detect obstacles like chairs and walls?',
      options: [
        { id: '1', text: 'Using infrared sensors, ultrasonic detectors, and cameras', isCorrect: true },
        { id: '2', text: 'Using human reading glasses', isCorrect: false },
        { id: '3', text: 'By crashing at high speed repeatedly', isCorrect: false },
        { id: '4', text: 'Using magnifying lenses', isCorrect: false },
      ],
      explanation: 'Sensors bounce light or sound waves to calculate distance and avoid collisions.',
      hint: 'Think of electronic sensors.',
      difficulty: 'easy',
    },
    {
      id: 'mthu-3',
      question: 'What distinguishes an AI machine from a simple traditional machine?',
      options: [
        { id: '1', text: 'AI machines can adapt and make decisions based on sensor data', isCorrect: true },
        { id: '2', text: 'Simple machines can fly without fuel', isCorrect: false },
        { id: '3', text: 'AI machines never need electricity', isCorrect: false },
        { id: '4', text: 'There is no difference between them', isCorrect: false },
      ],
      explanation: 'Traditional machines only repeat fixed mechanical movements, whereas AI processes input to decide actions dynamically.',
      hint: 'AI machines adapt to new inputs.',
      difficulty: 'medium',
    },
    {
      id: 'mthu-4',
      question: 'Where can we observe smart machines actively assisting humans today?',
      options: [
        { id: '1', text: 'In hospitals, airports, factories, and smart homes', isCorrect: true },
        { id: '2', text: 'Only in fictional movies', isCorrect: false },
        { id: '3', text: 'Only on outer space planets', isCorrect: false },
        { id: '4', text: 'Nowhere in the real world', isCorrect: false },
      ],
      explanation: 'Smart machines operate across modern society assisting doctors, teachers, drivers, and families.',
      hint: 'They are widely used in daily environments.',
      difficulty: 'easy',
    },
    {
      id: 'mthu-5',
      question: 'Why do engineers design smart robotic machines for hazardous tasks?',
      options: [
        { id: '1', text: 'To protect human workers from dangerous or toxic environments', isCorrect: true },
        { id: '2', text: 'To prevent people from reading books', isCorrect: false },
        { id: '3', text: 'To cause electrical blackouts', isCorrect: false },
        { id: '4', text: 'To create more paperwork', isCorrect: false },
      ],
      explanation: 'Robots handle dangerous tasks such as bomb disposal, chemical inspection, and deep-sea exploration.',
      hint: 'Safety and human protection are top priorities.',
      difficulty: 'easy',
    },
    {
      id: 'mthu-6',
      question: 'What action should a smart delivery robot take when its sensor detects a sudden drop or stairs?',
      options: [
        { id: '1', text: 'Immediately halt and recalculate an alternate wheelchair-accessible route', isCorrect: true },
        { id: '2', text: 'Accelerate forward at top speed down the stairs', isCorrect: false },
        { id: '3', text: 'Turn off its sensors completely', isCorrect: false },
        { id: '4', text: 'Delete its delivery packages', isCorrect: false },
      ],
      explanation: 'Safety protocols dictate that autonomous mobile robots stop and recalculate routes upon encountering hazard drop-offs.',
      scenarioContext: 'Scenario: A campus delivery robot approaches a flight of outdoor stone stairs without a ramp. Its ground-facing optical sensor detects a sharp 2-meter drop.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'mthu-7',
      question: 'True or False: Helper robots in hospitals can safely transport medicine carts to nurse stations.',
      options: [
        { id: '1', text: 'True — Hospital robots navigate hallways using LIDAR to deliver linens and medicines', isCorrect: true },
        { id: '2', text: 'False — Hospitals do not permit any electronic robotic assistance', isCorrect: false },
      ],
      explanation: 'Automated Guided Vehicles (AGVs) regularly transport meals, linens, and pharmaceuticals in modern hospitals.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'mthu-8',
      question: 'Match the automated helper machine to its specialized function:',
      options: [
        { id: '1', text: 'Robotic Vacuum -> Floor cleaning; Smart Thermostat -> Climate control; Hospital Cart -> Medicine delivery', isCorrect: true },
        { id: '2', text: 'All machines perform identical functions', isCorrect: false },
      ],
      matchingPairs: [
        { id: 'p1', left: 'Robotic Vacuum', right: 'Navigates around furniture and sweeps floors clean' },
        { id: 'p2', left: 'Smart Thermostat', right: 'Adjusts room temperature automatically to save energy' },
        { id: 'p3', left: 'Hospital Helper AGV', right: 'Carries medicine carts to nurse stations safely' },
      ],
      explanation: 'Different smart machines use tailored sensor suites designed for their specific environments.',
      questionType: 'matching',
      difficulty: 'easy',
    },
    {
      id: 'mthu-9',
      question: 'Order how a smart robotic vacuum navigates around a chair leg:',
      options: [
        { id: '1', text: '1. Sensor bounces infrared off chair -> 2. Computer detects obstacle -> 3. Wheels pivot away', isCorrect: true },
        { id: '2', text: '1. Wheels pivot -> 2. Sensor detects obstacle -> 3. Robot stops', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'Infrared sensor beam reflects off the chair leg', correctOrder: 1 },
        { id: 'ord-2', text: 'Onboard microcontroller calculates obstacle distance', correctOrder: 2 },
        { id: 'ord-3', text: 'Motor controller turns wheels to steer safely around', correctOrder: 3 },
      ],
      explanation: 'Sensing, computation, and actuation form the fundamental robotics control loop.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
  ],

  // ── AI ON FARM (PRECISION AGRICULTURE & SUSTAINABLE HARVEST) ─────────────
  'ai on farm': [
    {
      id: 'aifarm-1',
      question: 'How do farmers use AI drones in modern precision agriculture?',
      options: [
        { id: '1', text: 'To fly over crop fields and scan plant health from aerial camera sensors', isCorrect: true },
        { id: '2', text: 'To play loud music to scare butterflies away', isCorrect: false },
        { id: '3', text: 'To paint farm fence posts white', isCorrect: false },
        { id: '4', text: 'Drones cannot fly over farms', isCorrect: false },
      ],
      explanation: 'Agricultural drones capture multispectral imagery to measure chlorophyll levels and spot crop stress.',
      hint: 'Aerial crop scanning with cameras.',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-2',
      question: 'What is the primary function of smart soil moisture sensors on an AI farm?',
      options: [
        { id: '1', text: 'Measuring moisture in the soil to activate drip irrigation only when plants are thirsty', isCorrect: true },
        { id: '2', text: 'Counting the number of worms in the dirt', isCorrect: false },
        { id: '3', text: 'Heating up the soil to boiling temperatures', isCorrect: false },
        { id: '4', text: 'Turning soil into concrete', isCorrect: false },
      ],
      explanation: 'Soil moisture probes connect to IoT controllers, delivering precision irrigation and conserving water.',
      hint: 'Smart sensors regulate water.',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-3',
      question: 'What should an agricultural AI system do when its camera detects yellow fungus spots on corn leaves?',
      options: [
        { id: '1', text: 'Flag the exact GPS coordinates so only infected plants receive targeted organic treatment', isCorrect: true },
        { id: '2', text: 'Burn down the entire 500-acre corn field', isCorrect: false },
        { id: '3', text: 'Ignore the fungus spots completely', isCorrect: false },
        { id: '4', text: 'Turn off all farm electricity', isCorrect: false },
      ],
      explanation: 'Early detection allows targeted micro-treatments, eliminating the need for blanket chemical spraying.',
      scenarioContext: 'Scenario: An AI drone scans an organic farm. Optical leaf classification spots brown blight fungus on 4 apple trees among 1,000 healthy trees.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-4',
      question: 'Precision AI farming helps grow more nutritious food while saving millions of liters of fresh water.',
      options: [
        { id: '1', text: 'True — Targeted watering and automated monitoring conserve resources significantly', isCorrect: true },
        { id: '2', text: 'False — AI farming requires more water and chemicals than traditional farming', isCorrect: false },
      ],
      explanation: 'Precision farming reduces water waste by up to 40% and chemical runoff by over 80%.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-5',
      question: 'How can AI weeding robots eliminate invasive weeds without spraying toxic chemicals?',
      options: [
        { id: '1', text: 'Computer vision identifies weeds among crops and zaps them with targeted thermal lasers', isCorrect: true },
        { id: '2', text: 'By digging up the entire field with a bulldozer', isCorrect: false },
        { id: '3', text: 'By blowing hot hair dryers at the field', isCorrect: false },
        { id: '4', text: 'Robots cannot distinguish weeds from crops', isCorrect: false },
      ],
      explanation: 'Laser weeding robots use high-speed neural networks to classify weeds and neutralize them with millimeter laser precision.',
      hint: 'Laser weeding uses computer vision.',
      difficulty: 'medium',
    },
    {
      id: 'aifarm-6',
      question: 'Match each AI farm technology with its practical agricultural benefit:',
      options: [
        { id: '1', text: 'AI Drone -> Aerial health mapping; Soil Sensor -> Precision irrigation; Laser Weeder -> Chemical-free weed removal', isCorrect: true },
        { id: '2', text: 'All tools perform identical operations', isCorrect: false },
      ],
      matchingPairs: [
        { id: 'p1', left: 'Multispectral AI Drone', right: 'Flies aerial survey to map crop hydration and growth' },
        { id: 'p2', left: 'IoT Soil Sensor', right: 'Monitors underground moisture to automate drip lines' },
        { id: 'p3', left: 'Laser Weeding Robot', right: 'Zaps weeds precisely without spraying toxic pesticides' },
      ],
      explanation: 'Modern regenerative farms combine aerial inspection, ground IoT telemetry, and autonomous robotics.',
      questionType: 'matching',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-7',
      question: 'Order the steps in an automated precision irrigation cycle:',
      options: [
        { id: '1', text: '1. Sensor detects dry soil -> 2. AI verifies weather forecast -> 3. Drip lines activate', isCorrect: true },
        { id: '2', text: '1. Drip lines activate -> 2. Sensor detects dry soil -> 3. Weather check', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'IoT soil sensor detects moisture dropped below 25%', correctOrder: 1 },
        { id: 'ord-2', text: 'AI controller checks local satellite weather: No rain predicted', correctOrder: 2 },
        { id: 'ord-3', text: 'Precision drip irrigation activates to hydrate roots directly', correctOrder: 3 },
      ],
      explanation: 'Checking satellite forecasts before irrigating ensures water is not wasted right before a natural rainstorm.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-8',
      question: 'What should an automated farm controller do if soil is slightly dry, but satellite radar shows heavy rain in 1 hour?',
      options: [
        { id: '1', text: 'Hold irrigation and let natural rainfall water the crops, saving fresh water', isCorrect: true },
        { id: '2', text: 'Turn on all water pumps at maximum pressure immediately', isCorrect: false },
        { id: '3', text: 'Harvest all crops before the rain touches them', isCorrect: false },
        { id: '4', text: 'Erase all farm sensor records', isCorrect: false },
      ],
      explanation: 'Weather-aware AI controllers conserve municipal water reservoirs by prioritizing incoming precipitation.',
      scenarioContext: 'Scenario: Soil moisture in an organic tomato field measures 28% (dry threshold is 30%). Satellite telemetry predicts an 85% probability of heavy rain within 60 minutes.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-9',
      question: 'True or False: Autonomous GPS tractors can steer themselves along millimeter-accurate rows to plant seeds.',
      options: [
        { id: '1', text: 'True — RTK-GPS and steer-by-wire allow autonomous tractors to plant straight rows without overlap', isCorrect: true },
        { id: '2', text: 'False — Tractors cannot use satellite GPS technology', isCorrect: false },
      ],
      explanation: 'Real-Time Kinematic (RTK) GPS enables autonomous agricultural machinery to operate within 2-centimeter accuracy.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-10',
      question: 'How does optical AI sorting benefit farmers after harvesting fruits and vegetables?',
      options: [
        { id: '1', text: 'High-speed camera vision sorts ripe, premium produce from damaged items automatically', isCorrect: true },
        { id: '2', text: 'By throwing all harvested fruits into the trash', isCorrect: false },
        { id: '3', text: 'By changing the colors of vegetables artificially', isCorrect: false },
        { id: '4', text: 'Produce sorting cannot be done with cameras', isCorrect: false },
      ],
      explanation: 'Computer vision sorters inspect produce for size, color, blemish, and sugar content at high speeds.',
      hint: 'Sorting produce by quality.',
      difficulty: 'easy',
    },
  ],

  'ai on the farm': [
    {
      id: 'aifarm-b1',
      question: 'What is the primary mission of Artificial Intelligence on a sustainable modern farm?',
      options: [
        { id: '1', text: 'Growing more healthy food using less water, less fuel, and zero toxic chemical runoff', isCorrect: true },
        { id: '2', text: 'Replacing natural farm soil with plastic grass', isCorrect: false },
        { id: '3', text: 'Preventing sunlight from reaching crop plants', isCorrect: false },
        { id: '4', text: 'Shutting down all agricultural operations', isCorrect: false },
      ],
      explanation: 'Sustainable AI farming optimizes resource efficiency, yields, and ecological health.',
      hint: 'Growing food sustainably with less waste.',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-b2',
      question: 'How do satellite vegetation indices (like NDVI) assist farm managers?',
      options: [
        { id: '1', text: 'By measuring light reflection to track photosynthesis and crop vigor across large acres', isCorrect: true },
        { id: '2', text: 'By beaming electricity directly into plant roots', isCorrect: false },
        { id: '3', text: 'By taking personal photos of farm owners', isCorrect: false },
        { id: '4', text: 'Satellites cannot observe plant health', isCorrect: false },
      ],
      explanation: 'NDVI evaluates near-infrared light reflectance to compute vegetative health indexes.',
      hint: 'Measuring plant vigor from orbit.',
      difficulty: 'medium',
    },
    {
      id: 'aifarm-b3',
      question: 'True or False: Precision agricultural AI provides tailored care to individual plants rather than treating whole fields uniformly.',
      options: [
        { id: '1', text: 'True — Individual plant micro-management is the foundation of precision agriculture', isCorrect: true },
        { id: '2', text: 'False — AI only applies identical treatment to every plant without variation', isCorrect: false },
      ],
      explanation: 'Precision agriculture treats crops on a per-plant or per-meter basis instead of field-wide averages.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'aifarm-b4',
      question: 'What technology allows a robotic fruit harvester to pick ripe strawberries without bruising them?',
      options: [
        { id: '1', text: 'RGB-D depth cameras detecting ripeness paired with soft silicone pneumatic grippers', isCorrect: true },
        { id: '2', text: 'Heavy steel sledgehammers smashing the strawberry bushes', isCorrect: false },
        { id: '3', text: 'Vacuum cleaners operating at extreme suction', isCorrect: false },
        { id: '4', text: 'Strawberries cannot be harvested by robots', isCorrect: false },
      ],
      explanation: 'Soft robotics and 3D computer vision allow gentle manipulation of delicate fruit crops.',
      hint: 'Soft robotic grippers and computer vision.',
      difficulty: 'medium',
    },
    {
      id: 'aifarm-b5',
      question: 'Order the workflow of a smart farm drone survey:',
      options: [
        { id: '1', text: '1. Drone flies automated grid -> 2. AI stitches multispectral map -> 3. Farmer reviews hydration report', isCorrect: true },
        { id: '2', text: '1. Review report -> 2. Drone flies -> 3. Map stitched', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'Autonomous drone flies programmed grid pattern over 200-acre field', correctOrder: 1 },
        { id: 'ord-2', text: 'Computer vision stitches aerial photos into high-resolution NDVI map', correctOrder: 2 },
        { id: 'ord-3', text: 'Farmer receives smartphone alert showing 3 dry sectors needing irrigation', correctOrder: 3 },
      ],
      explanation: 'Flight planning, automated imaging, photogrammetry, and dashboard alerts form the drone workflow.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
  ],

  // ── AI ON ROAD (SMART VEHICLES & TRAFFIC INFRASTRUCTURE) ──────────────────
  'ai on road': [
    {
      id: 'airoad-1',
      question: 'What three primary sensor systems do autonomous vehicles use to perceive the road?',
      options: [
        { id: '1', text: 'Optical cameras, radar detectors, and LIDAR laser scanners', isCorrect: true },
        { id: '2', text: 'Reading glasses, flashlights, and car horns', isCorrect: false },
        { id: '3', text: 'Paper road atlases, windshield wipers, and radio antennas', isCorrect: false },
        { id: '4', text: 'Passenger smartphone batteries', isCorrect: false },
      ],
      explanation: 'Cameras recognize signs and colors; radar measures speed; LIDAR builds dense 3D point clouds.',
      hint: 'Cameras, Radar, and LIDAR.',
      difficulty: 'easy',
    },
    {
      id: 'airoad-2',
      question: 'How does a smart traffic light with AI improve city rush-hour commuting?',
      options: [
        { id: '1', text: 'By dynamically adjusting green-light timing based on live camera vehicle counts', isCorrect: true },
        { id: '2', text: 'By turning all traffic lights purple permanently', isCorrect: false },
        { id: '3', text: 'By blinking randomly without schedule', isCorrect: false },
        { id: '4', text: 'By honking loud sirens at all drivers', isCorrect: false },
      ],
      explanation: 'Adaptive traffic control systems reduce intersection wait times and vehicle emissions by optimizing signals.',
      hint: 'Dynamic green-light timing.',
      difficulty: 'easy',
    },
    {
      id: 'airoad-3',
      question: 'What safety decision should an autonomous car make when camera sensors detect a red octagonal stop sign?',
      options: [
        { id: '1', text: 'Gradually apply braking to come to a complete stop before the white painted crosswalk line', isCorrect: true },
        { id: '2', text: 'Accelerate at full speed through the intersection', isCorrect: false },
        { id: '3', text: 'Honk the horn and ignore the stop sign', isCorrect: false },
        { id: '4', text: 'Turn off the car headlights', isCorrect: false },
      ],
      explanation: 'Perception pipelines identify traffic regulatory signs and trigger standard deceleration trajectories.',
      scenarioContext: 'Scenario: An autonomous taxi drives down a quiet suburban street at 25 MPH. The front computer vision camera classifies a red octagonal stop sign 40 meters ahead.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'airoad-4',
      question: 'LIDAR sensors fire thousands of invisible infrared laser beams per second to create a 3D distance map.',
      options: [
        { id: '1', text: 'True — Time-of-flight laser pulses measure exact millimeter distances to surrounding objects', isCorrect: true },
        { id: '2', text: 'False — LIDAR only captures black-and-white paper photocopies', isCorrect: false },
      ],
      explanation: 'LIDAR (Light Detection and Ranging) calculates distance by measuring time taken for laser pulses to bounce back.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'airoad-5',
      question: 'What is the purpose of Lane Keeping Assist (LKA) in intelligent vehicles?',
      options: [
        { id: '1', text: 'Using camera vision to track painted road markings and keep the car safely centered', isCorrect: true },
        { id: '2', text: 'Changing the car radio station when you change lanes', isCorrect: false },
        { id: '3', text: 'Locking all vehicle windows tight', isCorrect: false },
        { id: '4', text: 'Turning on the air conditioner', isCorrect: false },
      ],
      explanation: 'Lane detection algorithms recognize solid and dashed road markings to gently steer vehicles in their lane.',
      hint: 'Tracking painted road lines.',
      difficulty: 'easy',
    },
    {
      id: 'airoad-6',
      question: 'Match each road vehicle sensor with its unique perceptual strength:',
      options: [
        { id: '1', text: 'Optical Camera -> Color and sign text; LIDAR -> 3D point cloud distances; Radar -> Velocity in fog/rain', isCorrect: true },
        { id: '2', text: 'All sensors perform identical functions', isCorrect: false },
      ],
      matchingPairs: [
        { id: 'p1', left: 'Optical Camera', right: 'Recognizes colors, lane lines, and written traffic signs' },
        { id: 'p2', left: 'LIDAR Scanner', right: 'Generates 3D structural point clouds of surrounding shapes' },
        { id: 'p3', left: 'Radar Sensor', right: 'Measures vehicle speeds accurately through fog, rain and dust' },
      ],
      explanation: 'Sensor fusion combines strengths: cameras read text, radar pierces bad weather, LIDAR measures geometry.',
      questionType: 'matching',
      difficulty: 'easy',
    },
    {
      id: 'airoad-7',
      question: 'Order the safety actions when an autonomous vehicle detects an emergency pedestrian crossing:',
      options: [
        { id: '1', text: '1. Sensors detect pedestrian -> 2. AI calculates collision risk -> 3. Emergency brakes engage', isCorrect: true },
        { id: '2', text: '1. Brakes engage -> 2. Sensors detect -> 3. Collision risk', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'Optical cameras and LIDAR detect pedestrian stepping onto street', correctOrder: 1 },
        { id: 'ord-2', text: 'Trajectory prediction model calculates high risk of path collision', correctOrder: 2 },
        { id: 'ord-3', text: 'Autonomous emergency braking (AEB) activates smoothly to halt car', correctOrder: 3 },
      ],
      explanation: 'Perception, trajectory projection, and emergency actuation occur within milliseconds.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
    {
      id: 'airoad-8',
      question: 'What predictive precaution should an autonomous car take when a soccer ball rolls into the road?',
      options: [
        { id: '1', text: 'Immediately decelerate because a child or pet might run into the road after the ball', isCorrect: true },
        { id: '2', text: 'Accelerate forward and pop the ball with the tires', isCorrect: false },
        { id: '3', text: 'Ignore the ball and keep driving at full speed', isCorrect: false },
        { id: '4', text: 'Honk the horn continuously without slowing down', isCorrect: false },
      ],
      explanation: 'Contextual risk assessment recognizes that toys rolling into roads often precede young children running.',
      scenarioContext: 'Scenario: Driving through a residential neighborhood, the vehicle\'s front camera spots a bright yellow soccer ball rolling across the street from a front lawn.',
      questionType: 'scenario',
      difficulty: 'easy',
    },
    {
      id: 'airoad-9',
      question: 'True or False: Modern AI navigation systems evaluate live vehicle speed data from millions of smartphones to route drivers around traffic jams.',
      options: [
        { id: '1', text: 'True — Real-time crowdsourced telemetry allows routing algorithms to bypass traffic congestion', isCorrect: true },
        { id: '2', text: 'False — Navigation apps only use static printed paper maps from 1980', isCorrect: false },
      ],
      explanation: 'GPS mapping services use aggregated telemetry and graph algorithms (like A* or Dijkstra) to find fastest routes.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'airoad-10',
      question: 'What is Vehicle-to-Everything (V2X) communication in smart cities?',
      options: [
        { id: '1', text: 'Wireless networks allowing cars to exchange safety alerts with traffic lights, pedestrians, and nearby vehicles', isCorrect: true },
        { id: '2', text: 'Connecting a phone to play music through car speakers', isCorrect: false },
        { id: '3', text: 'Washing the car windshield with water', isCorrect: false },
        { id: '4', text: 'Plugging in a car key', isCorrect: false },
      ],
      explanation: 'V2X protocol enables connected vehicles to perceive hazards around blind corners before sensors can see them.',
      hint: 'Wireless vehicle and infrastructure networking.',
      difficulty: 'medium',
    },
  ],

  'ai on the road': [
    {
      id: 'airoad-b1',
      question: 'What is the most critical goal of deploying AI perception systems in road transportation?',
      options: [
        { id: '1', text: 'Eliminating traffic accidents and saving lives by preventing human error and distraction', isCorrect: true },
        { id: '2', text: 'Making cars drive faster than aeroplanes', isCorrect: false },
        { id: '3', text: 'Preventing people from riding bicycles', isCorrect: false },
        { id: '4', text: 'Eliminating all road signs', isCorrect: false },
      ],
      explanation: 'Over 90% of vehicle accidents result from human error; autonomous safety features aim to eliminate fatalities.',
      hint: 'Eliminating accidents and human error.',
      difficulty: 'easy',
    },
    {
      id: 'airoad-b2',
      question: 'How do self-driving cars identify the difference between a pedestrian and a mailbox?',
      options: [
        { id: '1', text: 'Using Convolutional Neural Networks (CNNs) trained on millions of labeled street objects', isCorrect: true },
        { id: '2', text: 'By smelling objects on the sidewalk', isCorrect: false },
        { id: '3', text: 'By asking passengers to shout out names of objects', isCorrect: false },
        { id: '4', text: 'Cars cannot distinguish objects', isCorrect: false },
      ],
      explanation: 'Object detection models (YOLO, Faster R-CNN) classify bounding boxes around pedestrians, cyclists, and obstacles.',
      hint: 'Neural networks trained on labeled road objects.',
      difficulty: 'easy',
    },
    {
      id: 'airoad-b3',
      question: 'True or False: Autonomous vehicle reaction times (under 100 milliseconds) are significantly faster than average human reaction times.',
      options: [
        { id: '1', text: 'True — Electronic sensor processing acts in milliseconds compared to ~1-second human driver reflexes', isCorrect: true },
        { id: '2', text: 'False — Computers react much slower than human drivers', isCorrect: false },
      ],
      explanation: 'Electronic sensor fusion and brake-by-wire eliminate physiological human perception delays.',
      questionType: 'true_false',
      difficulty: 'easy',
    },
    {
      id: 'airoad-b4',
      question: 'What role do High-Definition (HD) digital maps play in autonomous navigation?',
      options: [
        { id: '1', text: 'They provide centimeter-accurate lane boundaries, curb heights, and permanent street geometry', isCorrect: true },
        { id: '2', text: 'They show tourist photos of restaurants', isCorrect: false },
        { id: '3', text: 'They play music videos for passengers', isCorrect: false },
        { id: '4', text: 'HD maps are not used by autonomous vehicles', isCorrect: false },
      ],
      explanation: 'HD maps act as a virtual sensor, letting vehicles cross-reference real-time perception against surveyed ground truth.',
      hint: 'Centimeter-accurate road geometry.',
      difficulty: 'medium',
    },
    {
      id: 'airoad-b5',
      question: 'Order how an autonomous taxi makes a safe left turn across oncoming traffic:',
      options: [
        { id: '1', text: '1. Detect oncoming cars -> 2. Calculate safe speed gap -> 3. Complete turn smoothly', isCorrect: true },
        { id: '2', text: '1. Turn steering wheel -> 2. Detect cars -> 3. Brake', isCorrect: false },
      ],
      orderingItems: [
        { id: 'ord-1', text: 'Radar and cameras calculate speed and distance of oncoming vehicles', correctOrder: 1 },
        { id: 'ord-2', text: 'Motion planning AI identifies an 8-second safe gap in traffic', correctOrder: 2 },
        { id: 'ord-3', text: 'Vehicle executes smooth turning trajectory into designated lane', correctOrder: 3 },
      ],
      explanation: 'Gap acceptance modeling and trajectory generation ensure collisions are avoided during left turns.',
      questionType: 'ordering',
      difficulty: 'easy',
    },
  ],

  'where is ai hiding?': [
    {
      id: 'wiah-1',
      question: 'Where is AI actively working when you use a smartphone camera?',
      options: [
        { id: '1', text: 'Autofocusing on human faces and adjusting lighting automatically', isCorrect: true },
        { id: '2', text: 'Polishing the glass lens with water', isCorrect: false },
        { id: '3', text: 'Printing physical photos onto paper', isCorrect: false },
        { id: '4', text: 'Adding weight to the phone battery', isCorrect: false },
      ],
      explanation: 'Smartphones use computer vision neural networks to detect faces, adjust portrait lighting, and stabilize images.',
      hint: 'Face detection in camera apps.',
      difficulty: 'easy',
    },
    {
      id: 'wiah-2',
      question: 'How does an online streaming app (like YouTube or Netflix) suggest videos you might like?',
      options: [
        { id: '1', text: 'An AI recommendation algorithm learns your watch history patterns', isCorrect: true },
        { id: '2', text: 'A random coin toss picks videos', isCorrect: false },
        { id: '3', text: 'Someone manually calls every subscriber on the phone', isCorrect: false },
        { id: '4', text: 'It shows every video in alphabetical order', isCorrect: false },
      ],
      explanation: 'Recommendation engines analyze your past viewing patterns and preferences to recommend tailored content.',
      hint: 'Recommendation algorithms study viewing patterns.',
      difficulty: 'medium',
    },
    {
      id: 'wiah-3',
      question: 'When a GPS map predicts the fastest route home, what data is AI evaluating?',
      options: [
        { id: '1', text: 'Real-time traffic flow, road closures, and average vehicle speeds', isCorrect: true },
        { id: '2', text: 'The color of the cars on the road', isCorrect: false },
        { id: '3', text: 'The music playing on car radios', isCorrect: false },
        { id: '4', text: 'The price of smartphones', isCorrect: false },
      ],
      explanation: 'GPS navigation systems use routing algorithms that evaluate live traffic telemetry to suggest optimal paths.',
      hint: 'Live traffic congestion and road speeds.',
      difficulty: 'medium',
    },
    {
      id: 'wiah-4',
      question: 'Which common keyboard feature relies on AI machine learning?',
      options: [
        { id: '1', text: 'Predictive text and auto-correct word completion', isCorrect: true },
        { id: '2', text: 'The physical plastic keys clicking', isCorrect: false },
        { id: '3', text: 'The phone charging cord', isCorrect: false },
        { id: '4', text: 'The volume up button', isCorrect: false },
      ],
      explanation: 'Predictive keyboards use n-gram and transformer language models to predict your next word.',
      hint: 'Word suggestions above keyboard.',
      difficulty: 'easy',
    },
    {
      id: 'wiah-5',
      question: 'True or False: AI is used behind the scenes in email apps to filter spam messages.',
      options: [
        { id: '1', text: 'True! AI spam classifiers identify suspicious text patterns', isCorrect: true },
        { id: '2', text: 'False! All emails are delivered without any filtering', isCorrect: false },
      ],
      explanation: 'Spam filters employ Naive Bayes and deep learning models to identify fraudulent or phishing emails.',
      hint: 'Spam filters detect suspicious text patterns.',
      difficulty: 'easy',
    },
  ],

  'how ai thinks with data': [
    {
      id: 'hatd-1',
      question: 'What is the primary foundation that machine learning models use to make predictions?',
      options: [
        { id: '1', text: 'Statistical patterns and correlations in training datasets', isCorrect: true },
        { id: '2', text: 'Handwritten if-else rules for every possible input', isCorrect: false },
        { id: '3', text: 'Random number generators guessing answers', isCorrect: false },
        { id: '4', text: 'Electromagnetic waves traveling through air', isCorrect: false },
      ],
      explanation: 'Machine learning algorithms learn generalized mathematical representations and statistical weights from training datasets.',
      hint: 'It extracts patterns from data.',
      difficulty: 'medium',
    },
    {
      id: 'hatd-2',
      question: 'What happens when an AI model is trained on poor-quality or biased data?',
      options: [
        { id: '1', text: 'The model outputs inaccurate, skewed, or biased predictions (Garbage In, Garbage Out)', isCorrect: true },
        { id: '2', text: 'The model automatically fixes all errors on its own', isCorrect: false },
        { id: '3', text: 'The computer hardware burns out', isCorrect: false },
        { id: '4', text: 'The data quality does not affect the model output', isCorrect: false },
      ],
      explanation: 'Models reflect the distribution of the data they are trained on. Flawed datasets produce flawed predictions.',
      hint: 'Garbage In, Garbage Out principle.',
      difficulty: 'medium',
    },
    {
      id: 'hatd-3',
      question: 'Which phase comes first in the traditional machine learning pipeline?',
      options: [
        { id: '1', text: 'Data Collection and Cleaning', isCorrect: true },
        { id: '2', text: 'Hyperparameter Optimization', isCorrect: false },
        { id: '3', text: 'Production Model Deployment', isCorrect: false },
        { id: '4', text: 'Customer Feedback Survey', isCorrect: false },
      ],
      explanation: 'Before training or evaluating any model, high-quality data must be gathered, cleaned, and normalized.',
      hint: 'Data must be acquired and prepared first.',
      difficulty: 'easy',
    },
    {
      id: 'hatd-4',
      question: 'What is the purpose of splitting data into "Training" and "Testing" subsets?',
      options: [
        { id: '1', text: 'To evaluate how well the trained model generalizes to unseen data', isCorrect: true },
        { id: '2', text: 'To save hard drive storage space', isCorrect: false },
        { id: '3', text: 'To slow down model compilation', isCorrect: false },
        { id: '4', text: 'Because computer screens cannot display all data at once', isCorrect: false },
      ],
      explanation: 'Testing on unseen data measures model generalization and prevents overfitting.',
      hint: 'Unseen data tests generalization.',
      difficulty: 'hard',
    },
    {
      id: 'hatd-5',
      question: 'What phenomenon occurs when a model performs with 100% accuracy on training data but fails on real-world inputs?',
      options: [
        { id: '1', text: 'Overfitting', isCorrect: true },
        { id: '2', text: 'Underfitting', isCorrect: false },
        { id: '3', text: 'Linear Regression', isCorrect: false },
        { id: '4', text: 'Data Normalization', isCorrect: false },
      ],
      explanation: 'Overfitting happens when a model memorizes noise in the training set rather than learning generalized features.',
      hint: 'Memorizing training noise is called...',
      difficulty: 'hard',
    },
  ],

  'generative ai uncovered': [
    {
      id: 'gau-1',
      question: 'What distinguishes Generative AI from traditional Discriminative AI?',
      options: [
        { id: '1', text: 'Generative AI produces new synthetic text, images, or audio, while discriminative models classify existing data', isCorrect: true },
        { id: '2', text: 'Generative AI only works on supercomputers without monitors', isCorrect: false },
        { id: '3', text: 'Generative AI cannot understand human languages', isCorrect: false },
        { id: '4', text: 'Generative AI is purely hardware-based with no neural networks', isCorrect: false },
      ],
      explanation: 'Generative models learn data distributions to sample new synthetic artifacts (text, code, imagery).',
      hint: 'Generative means creating new outputs.',
      difficulty: 'medium',
    },
    {
      id: 'gau-2',
      question: 'What fundamental neural architecture powers modern Large Language Models (LLMs) like GPT and Gemini?',
      options: [
        { id: '1', text: 'Transformer Architecture with Self-Attention Mechanisms', isCorrect: true },
        { id: '2', text: 'Simple Linear Regression Trees', isCorrect: false },
        { id: '3', text: 'Basic Boolean Logic Gates only', isCorrect: false },
        { id: '4', text: 'Fixed Finite State Automata', isCorrect: false },
      ],
      explanation: 'The Transformer architecture (Vaswani et al., 2017) uses multi-head self-attention to process token relationships in parallel.',
      hint: '"Attention Is All You Need" introduced this.',
      difficulty: 'hard',
    },
    {
      id: 'gau-3',
      question: 'In Generative Language Models, what is a "token"?',
      options: [
        { id: '1', text: 'A fragment of text (word, syllable, or character sequence) converted into a numerical vector', isCorrect: true },
        { id: '2', text: 'A physical gold coin used in board games', isCorrect: false },
        { id: '3', text: 'A type of plastic computer battery', isCorrect: false },
        { id: '4', text: 'An error message displayed on website footers', isCorrect: false },
      ],
      explanation: 'Tokenizers convert strings into discrete numerical indices that neural network embeddings process.',
      hint: 'Sub-word units converted into vectors.',
      difficulty: 'medium',
    },
    {
      id: 'gau-4',
      question: 'What is meant by an AI "hallucination"?',
      options: [
        { id: '1', text: 'When a generative model produces plausible-sounding but factually false statements', isCorrect: true },
        { id: '2', text: 'When the computer monitor turns off unexpectedly', isCorrect: false },
        { id: '3', text: 'When software downloads games without user permission', isCorrect: false },
        { id: '4', text: 'When code runs faster than expected', isCorrect: false },
      ],
      explanation: 'Hallucination occurs when an LLM predicts probable token sequences that do not correlate with ground-truth facts.',
      hint: 'Plausible sounding but incorrect information.',
      difficulty: 'medium',
    },
    {
      id: 'gau-5',
      question: 'Which technique helps reduce hallucinations and grounds LLM responses with trusted external data?',
      options: [
        { id: '1', text: 'Retrieval-Augmented Generation (RAG)', isCorrect: true },
        { id: '2', text: 'Deleting the system BIOS', isCorrect: false },
        { id: '3', text: 'Decreasing screen resolution', isCorrect: false },
        { id: '4', text: 'Removing all punctuation marks', isCorrect: false },
      ],
      explanation: 'RAG retrieves authoritative source documents from a vector database and inserts them into the model prompt context.',
      hint: 'RAG retrieves facts before generating.',
      difficulty: 'hard',
    },
  ],

  // ── CHAPTER 2: AI CONNECT ──────────────────────────────────────────────────
  'give me a command!': [
    {
      id: 'gmac-1',
      question: 'What is a "command" in computer science?',
      options: [
        { id: '1', text: 'A direct instruction that tells a computer what specific action to perform', isCorrect: true },
        { id: '2', text: 'A fictional story in a poetry book', isCorrect: false },
        { id: '3', text: 'A musical song played on a flute', isCorrect: false },
        { id: '4', text: 'A picture drawn with watercolor paints', isCorrect: false },
      ],
      explanation: 'Commands are precise directions that a computer software interpreter executes.',
      hint: 'It directs the computer to act.',
      difficulty: 'easy',
    },
    {
      id: 'gmac-2',
      question: 'Which command is the most clear and specific for a drawing robot?',
      options: [
        { id: '1', text: 'Draw a blue square with 10 cm sides in the center of the canvas', isCorrect: true },
        { id: '2', text: 'Draw something nice for me', isCorrect: false },
        { id: '3', text: 'Make a picture right now', isCorrect: false },
        { id: '4', text: 'Do whatever you feel like doing', isCorrect: false },
      ],
      explanation: 'Computers require specific parameters such as color, shape, size, and position to carry out instructions accurately.',
      hint: 'Look for colors, dimensions, and shape details.',
      difficulty: 'medium',
    },
    {
      id: 'gmac-3',
      question: 'What happens if you give an incomplete or confusing command to a computer?',
      options: [
        { id: '1', text: 'The computer may show an error message or execute the wrong behavior', isCorrect: true },
        { id: '2', text: 'The computer will guess your exact thoughts telepathically', isCorrect: false },
        { id: '3', text: 'The computer will turn into gold', isCorrect: false },
        { id: '4', text: 'Nothing happens to the screen', isCorrect: false },
      ],
      explanation: 'Computers cannot read human minds; ambiguous instructions result in syntax or runtime errors.',
      hint: 'Computers cannot read human thoughts.',
      difficulty: 'easy',
    },
    {
      id: 'gmac-4',
      question: 'When talking to a voice AI, what helps it understand your command accurately?',
      options: [
        { id: '1', text: 'Clear pronunciation, appropriate volume, and minimal background noise', isCorrect: true },
        { id: '2', text: 'Playing loud drums right next to the microphone', isCorrect: false },
        { id: '3', text: 'Mumbling words backwards', isCorrect: false },
        { id: '4', text: 'Covering the microphone with heavy tape', isCorrect: false },
      ],
      explanation: 'Clear acoustic input allows the speech recognition model to transcribe words with high accuracy.',
      hint: 'Quiet background and clear voice help audio recognition.',
      difficulty: 'easy',
    },
    {
      id: 'gmac-5',
      question: 'Which of the following is a valid command for a music player AI?',
      options: [
        { id: '1', text: '"Play the acoustic guitar melody track on volume 5"', isCorrect: true },
        { id: '2', text: '"Maybe sound could happen"', isCorrect: false },
        { id: '3', text: '"Music is nice"', isCorrect: false },
        { id: '4', text: '"What is sound?"', isCorrect: false },
      ],
      explanation: 'A command uses an action verb ("Play") followed by the target and parameters.',
      hint: 'Look for the action verb.',
      difficulty: 'easy',
    },
  ],

  'put it in order!': [
    {
      id: 'piio-1',
      question: 'What is an "algorithm"?',
      options: [
        { id: '1', text: 'A step-by-step sequence of instructions to solve a problem or task', isCorrect: true },
        { id: '2', text: 'A type of video game console cable', isCorrect: false },
        { id: '3', text: 'A secret password with letters only', isCorrect: false },
        { id: '4', text: 'A plastic computer monitor stand', isCorrect: false },
      ],
      explanation: 'An algorithm is a finite, ordered list of unambiguous steps designed to achieve an expected outcome.',
      hint: 'Step-by-step recipe for computers.',
      difficulty: 'easy',
    },
    {
      id: 'piio-2',
      question: 'What is the correct order for making morning cereal?',
      options: [
        { id: '1', text: '1. Take a clean bowl → 2. Pour cereal → 3. Add fresh milk → 4. Eat with a spoon', isCorrect: true },
        { id: '2', text: '1. Eat with spoon → 2. Add milk → 3. Find bowl → 4. Pour cereal', isCorrect: false },
        { id: '3', text: '1. Pour cereal on table → 2. Throw bowl → 3. Drink milk', isCorrect: false },
        { id: '4', text: '1. Wash hands → 2. Go to sleep → 3. Buy cereal', isCorrect: false },
      ],
      explanation: 'Every algorithm requires sequential execution where prerequisites occur before subsequent steps.',
      hint: 'Bowl first, then cereal, then milk.',
      difficulty: 'easy',
    },
    {
      id: 'piio-3',
      question: 'Why does the sequence of steps matter in an algorithm?',
      options: [
        { id: '1', text: 'Because performing steps out of order causes errors and failures', isCorrect: true },
        { id: '2', text: 'Because computers get bored if order is correct', isCorrect: false },
        { id: '3', text: 'Because steps can only be done backwards', isCorrect: false },
        { id: '4', text: 'Sequence does not matter at all', isCorrect: false },
      ],
      explanation: 'Computers execute commands in sequence; swapping order leads to logical bugs (e.g. putting shoes on before socks).',
      hint: 'Think of what happens if you wear shoes before socks.',
      difficulty: 'medium',
    },
    {
      id: 'piio-4',
      question: 'If a robot stops in the middle of a task, what is the most likely problem?',
      options: [
        { id: '1', text: 'A missing or incorrect instruction step in the algorithm', isCorrect: true },
        { id: '2', text: 'The robot is thinking about lunch', isCorrect: false },
        { id: '3', text: 'The robot decided to take a holiday', isCorrect: false },
        { id: '4', text: 'The screen color is too blue', isCorrect: false },
      ],
      explanation: 'Incomplete or unhandled conditions in an algorithm cause the execution engine to halt or fail.',
      hint: 'Check the instruction steps.',
      difficulty: 'medium',
    },
    {
      id: 'piio-5',
      question: 'What do programmers call fixing a mistake in an ordered sequence of instructions?',
      options: [
        { id: '1', text: 'Debugging', isCorrect: true },
        { id: '2', text: 'Baking', isCorrect: false },
        { id: '3', text: 'Painting', isCorrect: false },
        { id: '4', text: 'Shuffling', isCorrect: false },
      ],
      explanation: 'Debugging is the process of locating, analyzing, and resolving bugs or incorrect steps in code.',
      hint: 'Removing a computer bug is called...',
      difficulty: 'easy',
    },
  ],

  'hello, python!': [
    {
      id: 'hp-1',
      question: 'Which built-in Python function is used to display messages on the screen?',
      options: [
        { id: '1', text: 'print()', isCorrect: true },
        { id: '2', text: 'display()', isCorrect: false },
        { id: '3', text: 'speak()', isCorrect: false },
        { id: '4', text: 'shout()', isCorrect: false },
      ],
      explanation: 'The `print()` function writes the specified message to the screen or console output.',
      hint: 'It prints text to the screen.',
      difficulty: 'easy',
    },
    {
      id: 'hp-2',
      question: 'In Python, what is a variable used for?',
      options: [
        { id: '1', text: 'Storing data values in computer memory with a descriptive name', isCorrect: true },
        { id: '2', text: 'Changing the color of the computer mouse', isCorrect: false },
        { id: '3', text: 'Turning off the keyboard backlight', isCorrect: false },
        { id: '4', text: 'Deleting all installed software', isCorrect: false },
      ],
      explanation: 'Variables act as labeled containers that hold numbers, text strings, lists, or objects in RAM.',
      hint: 'Labeled storage box for data.',
      difficulty: 'easy',
    },
    {
      id: 'hp-3',
      question: 'Which of the following is a valid Python string assignment?',
      options: [
        { id: '1', text: 'message = "Hello, AI Olympiad!"', isCorrect: true },
        { id: '2', text: 'message = Hello World', isCorrect: false },
        { id: '3', text: 'string message: Hello', isCorrect: false },
        { id: '4', text: 'var "message" = 10', isCorrect: false },
      ],
      explanation: 'Strings in Python must be enclosed in single or double quotes.',
      hint: 'Quotation marks enclose strings in Python.',
      difficulty: 'easy',
    },
    {
      id: 'hp-4',
      question: 'Why is Python the most popular programming language for Artificial Intelligence?',
      options: [
        { id: '1', text: 'Readable clean syntax and powerful AI libraries (PyTorch, TensorFlow, Scikit-Learn)', isCorrect: true },
        { id: '2', text: 'It can only run on vintage 1980 computers', isCorrect: false },
        { id: '3', text: 'It does not allow mathematical numbers', isCorrect: false },
        { id: '4', text: 'It requires no computer processor', isCorrect: false },
      ],
      explanation: 'Python’s rich ecosystem of open-source machine learning frameworks makes it the industry standard.',
      hint: 'Rich AI libraries like PyTorch and NumPy.',
      difficulty: 'medium',
    },
    {
      id: 'hp-5',
      question: 'What is the output of the Python code: `print(5 + 3 * 2)`?',
      options: [
        { id: '1', text: '11 (multiplication precedes addition)', isCorrect: true },
        { id: '2', text: '16', isCorrect: false },
        { id: '3', text: '10', isCorrect: false },
        { id: '4', text: 'Error', isCorrect: false },
      ],
      explanation: 'Python follows standard operator precedence (PEMDAS/BODMAS): 3 * 2 = 6, then 5 + 6 = 11.',
      hint: 'Multiplication happens before addition.',
      difficulty: 'medium',
    },
  ],

  'the art of prompting': [
    {
      id: 'taop-1',
      question: 'In generative AI, what is a "prompt"?',
      options: [
        { id: '1', text: 'The natural language instruction or query given to an AI model to guide its output', isCorrect: true },
        { id: '2', text: 'The physical power cord of the computer', isCorrect: false },
        { id: '3', text: 'A special type of computer monitor screw', isCorrect: false },
        { id: '4', text: 'An antivirus license key', isCorrect: false },
      ],
      explanation: 'A prompt is the textual or multimodal input supplied to an LLM to trigger a specific generation.',
      hint: 'The instructions you give to an AI.',
      difficulty: 'easy',
    },
    {
      id: 'taop-2',
      question: 'Which prompt structure yields the highest quality response from an AI assistant?',
      options: [
        { id: '1', text: 'Clear Role + Context + Precise Task + Desired Output Format + Constraints', isCorrect: true },
        { id: '2', text: 'One single vague word like "Help"', isCorrect: false },
        { id: '3', text: 'Typing random symbols and exclamation marks', isCorrect: false },
        { id: '4', text: 'Copying unrelated dictionary entries', isCorrect: false },
      ],
      explanation: 'Role, context, explicit instructions, and constraints provide sufficient signal for the model to align its generation.',
      hint: 'Role, Context, Task, Format, and Constraints.',
      difficulty: 'medium',
    },
    {
      id: 'taop-3',
      question: 'What is "Few-Shot Prompting"?',
      options: [
        { id: '1', text: 'Providing several input-output demonstration examples inside the prompt before asking for the result', isCorrect: true },
        { id: '2', text: 'Restarting the computer three times', isCorrect: false },
        { id: '3', text: 'Taking photos of the computer screen', isCorrect: false },
        { id: '4', text: 'Writing code in three different programming languages', isCorrect: false },
      ],
      explanation: 'Few-shot prompting conditions the model’s attention by giving concrete demonstration pairs in context.',
      hint: 'Giving examples in the prompt.',
      difficulty: 'hard',
    },
    {
      id: 'taop-4',
      question: 'What does "Chain-of-Thought" (CoT) prompting encourage the AI to do?',
      options: [
        { id: '1', text: 'Explain its reasoning step-by-step before arriving at the final answer', isCorrect: true },
        { id: '2', text: 'Guess the answer without any intermediate calculations', isCorrect: false },
        { id: '3', text: 'Translate the response into binary numbers', isCorrect: false },
        { id: '4', text: 'Delete user chat history', isCorrect: false },
      ],
      explanation: 'Chain-of-thought prompting forces the model to generate intermediate reasoning tokens, drastically improving reasoning accuracy.',
      hint: 'Step-by-step thinking improves accuracy.',
      difficulty: 'hard',
    },
    {
      id: 'taop-5',
      question: 'What is a "system prompt" or system instruction?',
      options: [
        { id: '1', text: 'A persistent high-priority directive that defines the AI’s persona, tone, rules, and boundaries', isCorrect: true },
        { id: '2', text: 'An alert showing low battery status', isCorrect: false },
        { id: '3', text: 'The computer operating system wallpaper', isCorrect: false },
        { id: '4', text: 'A text message from the internet provider', isCorrect: false },
      ],
      explanation: 'System prompts anchor model behavior across conversational turns.',
      hint: 'Defines the AI persona and guidelines.',
      difficulty: 'medium',
    },
  ],

  // ── CHAPTER 3: AI SOLVE ────────────────────────────────────────────────────
  'smart road systems & autonomous driving': [
    {
      id: 'aotr-1',
      question: 'How do self-driving cars perceive pedestrians and road signs?',
      options: [
        { id: '1', text: 'Using LiDAR sensors, RADAR, and high-resolution computer vision cameras', isCorrect: true },
        { id: '2', text: 'Using magnetic compasses and paper maps only', isCorrect: false },
        { id: '3', text: 'By honking the horn continuously', isCorrect: false },
        { id: '4', text: 'By driving with closed windshields', isCorrect: false },
      ],
      explanation: 'Autonomous vehicles fuse multimodal sensor streams (LiDAR point clouds, camera pixels, RADAR Doppler data) into a 3D semantic map.',
      hint: 'LiDAR, RADAR, and computer vision cameras.',
      difficulty: 'medium',
    },
    {
      id: 'aotr-2',
      question: 'What is the role of smart AI traffic light management in modern cities?',
      options: [
        { id: '1', text: 'Dynamically adjusting green light durations based on live vehicle queue density', isCorrect: true },
        { id: '2', text: 'Turning all lights red permanently', isCorrect: false },
        { id: '3', text: 'Flashing party colors on weekends', isCorrect: false },
        { id: '4', text: 'Taking photos of car paint colors', isCorrect: false },
      ],
      explanation: 'Intelligent traffic signals reduce congestion and emissions by adapting signal timings to real-time traffic volume.',
      hint: 'Adapting green light times to traffic flow.',
      difficulty: 'easy',
    },
    {
      id: 'aotr-3',
      question: 'What is "Lane Departure Warning" in smart automotive safety?',
      options: [
        { id: '1', text: 'An AI vision feature that alerts drivers when drifting across lane lines unintentionally', isCorrect: true },
        { id: '2', text: 'A GPS voice telling you to stop driving', isCorrect: false },
        { id: '3', text: 'A tire pressure alert system', isCorrect: false },
        { id: '4', text: 'An automatic radio channel changer', isCorrect: false },
      ],
      explanation: 'Edge vision cameras continuously track painted road dividers to prevent unintended drift accidents.',
      hint: 'Alerts when drifting across painted lane lines.',
      difficulty: 'easy',
    },
    {
      id: 'aotr-4',
      question: 'What is the purpose of "Edge Computing" in autonomous vehicles?',
      options: [
        { id: '1', text: 'Processing emergency braking decisions in milliseconds locally without waiting for cloud latency', isCorrect: true },
        { id: '2', text: 'Playing online multiplayer games in the car', isCorrect: false },
        { id: '3', text: 'Charging electric car batteries faster', isCorrect: false },
        { id: '4', text: 'Washing the car windshield', isCorrect: false },
      ],
      explanation: 'Critical safety decisions require sub-millisecond local inference; cloud transmission would introduce lethal latency.',
      hint: 'Ultra-low latency local processing.',
      difficulty: 'hard',
    },
    {
      id: 'aotr-5',
      question: 'True or False: Autonomous delivery robots use SLAM (Simultaneous Localization and Mapping) to navigate sidewalks.',
      options: [
        { id: '1', text: 'True! SLAM constructs a map of the environment while tracking the robot’s location inside it', isCorrect: true },
        { id: '2', text: 'False! Robots cannot navigate sidewalks without a human pulling them', isCorrect: false },
      ],
      explanation: 'SLAM is a cornerstone robotic navigation algorithm combining odometry and sensor data.',
      hint: 'SLAM tracks location and maps surroundings simultaneously.',
      difficulty: 'hard',
    },
  ],

  'ai for better health': [
    {
      id: 'afbh-1',
      question: 'How is AI transforming pharmaceutical drug discovery?',
      options: [
        { id: '1', text: 'By predicting 3D protein structures (like AlphaFold) and simulating molecular interactions in days instead of years', isCorrect: true },
        { id: '2', text: 'By replacing all medicines with drinking water', isCorrect: false },
        { id: '3', text: 'By making lab microscopes heavier', isCorrect: false },
        { id: '4', text: 'By closing hospital pharmacies', isCorrect: false },
      ],
      explanation: 'Deep learning protein folding models simulate molecular docking rapidly, expediting targeted therapy candidate discovery.',
      hint: 'Predicting 3D protein structures and molecular simulations.',
      difficulty: 'hard',
    },
    {
      id: 'afbh-2',
      question: 'What role does AI computer vision play in radiology?',
      options: [
        { id: '1', text: 'Screening thousands of X-rays, CT scans, and MRIs to highlight early tumors and anomalies for doctors', isCorrect: true },
        { id: '2', text: 'Replacing hospital beds with office chairs', isCorrect: false },
        { id: '3', text: 'Changing the color of patient hospital gowns', isCorrect: false },
        { id: '4', text: 'Turning off radiation safety shields', isCorrect: false },
      ],
      explanation: 'Convolutional neural networks achieve human-expert-level sensitivity in identifying microscopic lesions in radiologic scans.',
      hint: 'Screening X-rays and CT scans for anomalies.',
      difficulty: 'medium',
    },
    {
      id: 'afbh-3',
      question: 'How do wearable smartwatches use AI to monitor cardiovascular health?',
      options: [
        { id: '1', text: 'By analyzing photoplethysmography (PPG) optical pulse data to detect irregular heart rhythms like Atrial Fibrillation', isCorrect: true },
        { id: '2', text: 'By measuring the room wallpaper brightness', isCorrect: false },
        { id: '3', text: 'By playing relaxing nature songs only', isCorrect: false },
        { id: '4', text: 'By checking calendar appointments', isCorrect: false },
      ],
      explanation: 'Optical sensors and ML algorithms continuously evaluate pulse waveform variations to flag arrhythmias early.',
      hint: 'Detecting irregular heart rhythms from pulse sensors.',
      difficulty: 'medium',
    },
    {
      id: 'afbh-4',
      question: 'What is personalized medicine in the context of healthcare AI?',
      options: [
        { id: '1', text: 'Tailoring treatments and drug dosages based on an individual patient’s genetic profile and biomarkers', isCorrect: true },
        { id: '2', text: 'Giving identical medicine to all patients regardless of symptoms', isCorrect: false },
        { id: '3', text: 'Asking patients to write their own prescriptions', isCorrect: false },
        { id: '4', text: 'Removing all doctor consultations', isCorrect: false },
      ],
      explanation: 'Genomic AI models identify individual metabolic markers to predict which therapy offers maximum efficacy with minimal side effects.',
      hint: 'Tailoring treatments to genetic markers.',
      difficulty: 'hard',
    },
    {
      id: 'afbh-5',
      question: 'Why must human clinicians always verify AI healthcare diagnostic recommendations?',
      options: [
        { id: '1', text: 'Because clinical responsibility, patient empathy, and edge-case validation require human medical oversight', isCorrect: true },
        { id: '2', text: 'Because computer screens cannot display text clearly', isCorrect: false },
        { id: '3', text: 'Because medical AI is strictly prohibited worldwide', isCorrect: false },
        { id: '4', text: 'Because doctors do not use computers', isCorrect: false },
      ],
      explanation: 'AI serves as a clinical decision support tool (CDSS); final patient diagnosis remains a human medical responsibility.',
      hint: 'Human medical oversight and clinical responsibility.',
      difficulty: 'easy',
    },
  ],

  // ── CHAPTER 6: AI CARE ────────────────────────────────────────────────────
  'deepfake alert!': [
    {
      id: 'dfa-1',
      question: 'What is a "deepfake"?',
      options: [
        { id: '1', text: 'Synthetic media (video, audio, or image) generated or altered by AI to realistically depict someone doing or saying something they never did', isCorrect: true },
        { id: '2', text: 'A deep submarine swimming in the ocean', isCorrect: false },
        { id: '3', text: 'A broken computer screen with cracks', isCorrect: false },
        { id: '4', text: 'A regular video recorded on a standard smartphone without edits', isCorrect: false },
      ],
      explanation: 'Deepfakes use Generative Adversarial Networks (GANs) and diffusion models to swap faces, synthesize voices, or manipulate body movements.',
      hint: 'Synthetic AI-manipulated video or audio.',
      difficulty: 'easy',
    },
    {
      id: 'dfa-2',
      question: 'Which of the following is a common visual clue that can help identify a video deepfake?',
      options: [
        { id: '1', text: 'Unnatural blinking, facial boundary blurring, inconsistent lighting, or distorted teeth and ear shapes', isCorrect: true },
        { id: '2', text: 'The video being shown in full 4K resolution', isCorrect: false },
        { id: '3', text: 'The speaker wearing a black suit', isCorrect: false },
        { id: '4', text: 'The video having background audio', isCorrect: false },
      ],
      explanation: 'Generative models often struggle with temporal consistency, fine reflections, realistic pupil dilation, and edge blending.',
      hint: 'Look for unnatural blinking and blurred facial edges.',
      difficulty: 'medium',
    },
    {
      id: 'dfa-3',
      question: 'What technology helps verify the authenticity and origin of digital media content?',
      options: [
        { id: '1', text: 'Cryptographic digital watermarks and C2PA content credentials provenance metadata', isCorrect: true },
        { id: '2', text: 'Deleting the media file permanently', isCorrect: false },
        { id: '3', text: 'Taking a screenshot of the video', isCorrect: false },
        { id: '4', text: 'Compressing the video into a ZIP file', isCorrect: false },
      ],
      explanation: 'Standards like C2PA bind cryptographic signatures at the camera or generation level to track editing history and origin.',
      hint: 'Digital watermarking and provenance metadata.',
      difficulty: 'hard',
    },
    {
      id: 'dfa-4',
      question: 'Why are AI voice cloning deepfakes particularly dangerous for cybersecurity?',
      options: [
        { id: '1', text: 'They can impersonate trusted family members or executives in phone scams to authorize fraudulent money transfers', isCorrect: true },
        { id: '2', text: 'They cause mobile phone screens to break', isCorrect: false },
        { id: '3', text: 'They turn off mobile cellular antennas', isCorrect: false },
        { id: '4', text: 'They increase monthly telephone billing rates', isCorrect: false },
      ],
      explanation: 'Voice cloning requires only a few seconds of sample audio to convincingly replicate cadence and pitch in social engineering attacks.',
      hint: 'Impersonating trusted people in fraudulent calls.',
      difficulty: 'medium',
    },
    {
      id: 'dfa-5',
      question: 'If you encounter an alarming viral video claiming a shocking event, what is the most responsible action?',
      options: [
        { id: '1', text: 'Cross-verify with reputable independent news sources and fact-checkers before sharing', isCorrect: true },
        { id: '2', text: 'Immediately forward it to all social media groups', isCorrect: false },
        { id: '3', text: 'Believe it without questioning because video is always true', isCorrect: false },
        { id: '4', text: 'Delete your internet browser', isCorrect: false },
      ],
      explanation: 'Critical digital media literacy requires verifying shocking claims with established fact-checking organizations.',
      hint: 'Verify with reputable fact-checkers before sharing.',
      difficulty: 'easy',
    },
  ],

  'protect your data': [
    {
      id: 'pyd-1',
      question: 'What is Personally Identifiable Information (PII)?',
      options: [
        { id: '1', text: 'Data that can identify a specific individual (e.g. full name, home address, biometric scan, government ID)', isCorrect: true },
        { id: '2', text: 'The brand of the computer monitor', isCorrect: false },
        { id: '3', text: 'The weather forecast for next week', isCorrect: false },
        { id: '4', text: 'A random stock photograph of trees', isCorrect: false },
      ],
      explanation: 'PII encompasses any information that distinguishes or traces an individual’s identity.',
      hint: 'Information identifying a real individual.',
      difficulty: 'easy',
    },
    {
      id: 'pyd-2',
      question: 'Why is it risky to share sensitive personal passwords or phone numbers with public online AI tools?',
      options: [
        { id: '1', text: 'Prompts may be stored, reviewed by human evaluators, or used in future model training data', isCorrect: true },
        { id: '2', text: 'The computer will automatically shut off', isCorrect: false },
        { id: '3', text: 'The internet speed will permanently drop to zero', isCorrect: false },
        { id: '4', text: 'There is no risk whatsoever', isCorrect: false },
      ],
      explanation: 'Public LLM providers often log user prompts for moderation and retraining unless enterprise zero-data-retention is enabled.',
      hint: 'Prompts can be logged or used to train future models.',
      difficulty: 'medium',
    },
    {
      id: 'pyd-3',
      question: 'What is "Data Anonymization" in responsible AI development?',
      options: [
        { id: '1', text: 'Stripping or encrypting direct identifiers from datasets so records cannot be traced back to real individuals', isCorrect: true },
        { id: '2', text: 'Changing the file name to uppercase letters', isCorrect: false },
        { id: '3', text: 'Deleting all numbers from the dataset', isCorrect: false },
        { id: '4', text: 'Storing data on flash drives only', isCorrect: false },
      ],
      explanation: 'Techniques like differential privacy, k-anonymity, and hashing protect user privacy while preserving analytical utility.',
      hint: 'Removing personal identifiers from training data.',
      difficulty: 'hard',
    },
    {
      id: 'pyd-4',
      question: 'Under modern data privacy laws (like GDPR and DPDP), what right do users have regarding their personal data?',
      options: [
        { id: '1', text: 'The right to access, correct, and request deletion of their stored personal data', isCorrect: true },
        { id: '2', text: 'The requirement to publish all personal photos publicly', isCorrect: false },
        { id: '3', text: 'The obligation to pay for every website visit', isCorrect: false },
        { id: '4', text: 'Users have no rights under any privacy law', isCorrect: false },
      ],
      explanation: 'Data sovereignty frameworks enforce transparency, user consent, and the "Right to be Forgotten".',
      hint: 'Right to access, correct, and delete personal data.',
      difficulty: 'medium',
    },
    {
      id: 'pyd-5',
      question: 'What is a "Digital Footprint"?',
      options: [
        { id: '1', text: 'The trail of data, search history, clicks, and uploads you leave behind while browsing online', isCorrect: true },
        { id: '2', text: 'A physical footprint left on a laptop keyboard', isCorrect: false },
        { id: '3', text: 'A special mouse pad for gaming', isCorrect: false },
        { id: '4', text: 'The physical weight of a desktop computer', isCorrect: false },
      ],
      explanation: 'Every digital action contributes to a persistent record analyzed by tracking cookies and data brokers.',
      hint: 'Trail of data left behind while using the internet.',
      difficulty: 'easy',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT-BASED QUESTION EXTRACTOR
// Parses the actual HTML / text lesson content and generates factual questions
// ─────────────────────────────────────────────────────────────────────────────

function shuffleOptions<T>(options: T[]): T[] {
  const shuffled = [...options]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT-BASED QUESTION EXTRACTOR
// Parses the actual HTML / text lesson content and generates factual questions
// ─────────────────────────────────────────────────────────────────────────────

function extractQuestionsFromContent(
  lessonContent: string,
  lessonTitle: string,
  _chapterTitle: string
): DynamicQuizQuestion[] | null {
  if (!lessonContent || lessonContent.trim().length < 50) return null

  // 1. Strip HTML tags to extract clean text
  const cleanText = lessonContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const sentences = cleanText.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 20)

  // 2. Extract bullet points (<li><strong>Term:</strong> explanation</li>)
  const liMatches = Array.from(lessonContent.matchAll(/<li>\s*(?:<strong>(.*?)(?:<\/strong>)?[:\-]?\s*)?(.*?)<\/li>/gi))
  
  // 3. Extract bold terms (<strong>Term</strong>)
  const strongMatches = Array.from(lessonContent.matchAll(/<strong>(.*?)<\/strong>/gi))
    .map(m => m[1].replace(/<[^>]*>/g, '').trim())
    .filter(s => s.length > 2 && s.length < 50 && !s.toLowerCase().includes('step') && !s.toLowerCase().includes('fun fact') && !s.toLowerCase().includes('note'))

  // 4. Extract headings (<h3>Title</h3> or <h4>Title</h4>)
  const headingMatches = Array.from(lessonContent.matchAll(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi))
    .map(m => m[1].replace(/<[^>]*>/g, '').replace(/^[^\w]+/, '').trim())
    .filter(h => h.length > 3 && h.length < 60)

  const questions: DynamicQuizQuestion[] = []
  const usedStems = new Set<string>()

  // A. Generate questions from structured list items (li)
  for (const match of liMatches) {
    if (questions.length >= 5) break
    const term = (match[1] || '').replace(/<[^>]*>/g, '').replace(/[:\-]/g, '').trim()
    const desc = (match[2] || '').replace(/<[^>]*>/g, '').trim()

    if (term && desc && desc.length > 15) {
      const qText = `According to this lesson, what is the role or function of "${term}"?`
      if (!usedStems.has(qText)) {
        usedStems.add(qText)
        questions.push({
          id: `cnt-li-${Date.now()}-${questions.length + 1}`,
          question: qText,
          options: [
            { id: '1', text: desc.length > 100 ? desc.slice(0, 97) + '...' : desc, isCorrect: true },
            { id: '2', text: 'A mechanical gear that operates manually without electronic signals', isCorrect: false },
            { id: '3', text: 'An error message displayed when software fails to load', isCorrect: false },
            { id: '4', text: 'A peripheral device disconnected from computer memory', isCorrect: false },
          ],
          explanation: `In "${lessonTitle}", ${term} is described as: ${desc}`,
          hint: `Recall the section discussing ${term}.`,
          difficulty: 'medium',
        })
      }
    }
  }

  // B. Generate questions from bold key terms using actual text sentences
  const uniqueStrongs = Array.from(new Set(strongMatches))
  for (const term of uniqueStrongs) {
    if (questions.length >= 5) break
    const containingSentence = sentences.find(s => s.toLowerCase().includes(term.toLowerCase()) && s.length > 25 && s.length < 160)
    const targetExplanation = containingSentence || `The lesson highlights "${term}" as a foundational concept in ${lessonTitle}.`
    const correctText = containingSentence
      ? (containingSentence.length > 110 ? containingSentence.slice(0, 107) + '...' : containingSentence)
      : `An essential operational mechanism in ${lessonTitle} computational systems`

    const qText = `Based on the lesson content, how is "${term}" applied or defined?`
    if (!usedStems.has(qText)) {
      usedStems.add(qText)
      questions.push({
        id: `cnt-st-${Date.now()}-${questions.length + 1}`,
        question: qText,
        options: [
          { id: '1', text: correctText, isCorrect: true },
          { id: '2', text: 'An obsolete manual paper-filing procedure excluded from modern software', isCorrect: false },
          { id: '3', text: 'A hardware error warning signaling complete system failure', isCorrect: false },
          { id: '4', text: 'A random static variable with zero functional importance', isCorrect: false },
        ],
        explanation: `From the lesson: ${targetExplanation}`,
        hint: `Look for the concept "${term}" in your lesson text.`,
        difficulty: 'medium',
      })
    }
  }

  // C. Generate question from primary heading / lesson core
  if (headingMatches.length > 0 && questions.length < 5) {
    const heading = headingMatches[0]
    const headingSentence = sentences.find(s => s.toLowerCase().includes(heading.toLowerCase().slice(0, 15)) && s.length > 25 && s.length < 160) || sentences[0]
    const qText = `What is the core focus of the section "${heading}"?`
    if (!usedStems.has(qText)) {
      usedStems.add(qText)
      questions.push({
        id: `cnt-hd-${Date.now()}-${questions.length + 1}`,
        question: qText,
        options: [
          { id: '1', text: headingSentence ? (headingSentence.length > 110 ? headingSentence.slice(0, 107) + '...' : headingSentence) : `Understanding and applying ${lessonTitle}`, isCorrect: true },
          { id: '2', text: 'Manual non-electronic typewriter mechanical maintenance', isCorrect: false },
          { id: '3', text: 'Bypassing software security safeguards completely', isCorrect: false },
          { id: '4', text: 'Deleting all database tables and network configurations', isCorrect: false },
        ],
        explanation: `"${heading}" introduces key principles and examples covered in ${lessonTitle}.`,
        hint: `Review the section "${heading}" in your lesson study notes.`,
        difficulty: 'easy',
      })
    }
  }

  return questions.length >= 3 ? questions.slice(0, 5) : null
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN-ACCURATE CONCEPTUAL GENERATOR (NO META-QUESTIONS)
// Generates domain questions testing the actual subject concept
// ─────────────────────────────────────────────────────────────────────────────

function generateConceptQuestions(
  cleanTopic: string,
  chapterTitle: string,
  subjectName: string
): DynamicQuizQuestion[] {
  const norm = `${cleanTopic} ${chapterTitle} ${subjectName}`.toLowerCase()

  // 1. Python & Coding Concepts
  if (norm.includes('python') || norm.includes('code') || norm.includes('coding') || norm.includes('logic') || norm.includes('program')) {
    return [
      {
        id: `py-${Date.now()}-1`,
        question: 'Which built-in Python function is used to output text and variables to the screen?',
        options: [
          { id: '1', text: 'print()', isCorrect: true },
          { id: '2', text: 'echo()', isCorrect: false },
          { id: '3', text: 'display()', isCorrect: false },
          { id: '4', text: 'write()', isCorrect: false },
        ],
        explanation: 'The `print()` function sends text or calculated values to the standard console output.',
        hint: 'It prints text to the screen.',
        difficulty: 'easy',
      },
      {
        id: `py-${Date.now()}-2`,
        question: 'What is a "variable" in programming?',
        options: [
          { id: '1', text: 'A named storage location in memory that holds a data value', isCorrect: true },
          { id: '2', text: 'A physical button on the computer keyboard', isCorrect: false },
          { id: '3', text: 'A permanent error that stops code from running', isCorrect: false },
          { id: '4', text: 'A cable connecting the monitor to power', isCorrect: false },
        ],
        explanation: 'Variables act as labeled containers for storing numbers, strings, lists, and objects.',
        hint: 'Named storage location for data in memory.',
        difficulty: 'easy',
      },
      {
        id: `py-${Date.now()}-3`,
        question: 'Which control structure allows a program to execute code repeatedly over a sequence of items?',
        options: [
          { id: '1', text: 'For and While loops', isCorrect: true },
          { id: '2', text: 'If-else statements only', isCorrect: false },
          { id: '3', text: 'Variable assignments', isCorrect: false },
          { id: '4', text: 'Import statements', isCorrect: false },
        ],
        explanation: 'Loops iterate through sequences (like lists or ranges) executing a code block on each cycle.',
        hint: 'Loops iterate over sequences.',
        difficulty: 'medium',
      },
      {
        id: `py-${Date.now()}-4`,
        question: 'What is "debugging" in software development?',
        options: [
          { id: '1', text: 'The process of locating, analyzing, and fixing syntax or logic errors in code', isCorrect: true },
          { id: '2', text: 'Physically removing dust from the computer casing', isCorrect: false },
          { id: '3', text: 'Deleting all lines of code and starting over', isCorrect: false },
          { id: '4', text: 'Purchasing a faster internet router', isCorrect: false },
        ],
        explanation: 'Debugging systematically isolates unexpected behavior to ensure programs execute as intended.',
        hint: 'Finding and fixing errors in code.',
        difficulty: 'easy',
      },
      {
        id: `py-${Date.now()}-5`,
        question: 'What is an "algorithm"?',
        options: [
          { id: '1', text: 'A step-by-step, ordered set of instructions designed to solve a specific problem', isCorrect: true },
          { id: '2', text: 'A piece of metal inside a computer processor', isCorrect: false },
          { id: '3', text: 'A password used to unlock Wi-Fi', isCorrect: false },
          { id: '4', text: 'A random guess made by software', isCorrect: false },
        ],
        explanation: 'Algorithms provide unambiguous, finite procedures that transform inputs into required outputs.',
        hint: 'Step-by-step procedure for solving a task.',
        difficulty: 'medium',
      },
    ]
  }

  // 2. Data, Machine Learning & Prediction
  if (norm.includes('data') || norm.includes('learn') || norm.includes('predict') || norm.includes('pattern') || norm.includes('decision')) {
    return [
      {
        id: `dat-${Date.now()}-1`,
        question: 'In Machine Learning, what is the purpose of training a model on historical data?',
        options: [
          { id: '1', text: 'To discover underlying mathematical patterns and statistical correlations to make predictions on new data', isCorrect: true },
          { id: '2', text: 'To store duplicate copies of files on hard drives', isCorrect: false },
          { id: '3', text: 'To manually type if-else code for every scenario', isCorrect: false },
          { id: '4', text: 'To delete data rows after 24 hours', isCorrect: false },
        ],
        explanation: 'Machine learning algorithms learn parameters from training examples to generalize to unseen inputs.',
        hint: 'Learning patterns to predict outcomes on new data.',
        difficulty: 'medium',
      },
      {
        id: `dat-${Date.now()}-2`,
        question: 'What happens when a machine learning model is trained on poor-quality or heavily biased data?',
        options: [
          { id: '1', text: 'The model produces inaccurate, skewed, or unfair predictions (Garbage In, Garbage Out)', isCorrect: true },
          { id: '2', text: 'The model automatically detects and fixes all errors without guidance', isCorrect: false },
          { id: '3', text: 'The computer graphics card turns off', isCorrect: false },
          { id: '4', text: 'The model becomes 100% accurate', isCorrect: false },
        ],
        explanation: 'Model inference reflects the quality and representation of its training data.',
        hint: 'Garbage In, Garbage Out principle.',
        difficulty: 'easy',
      },
      {
        id: `dat-${Date.now()}-3`,
        question: 'In Supervised Learning, what are "Features" versus "Labels"?',
        options: [
          { id: '1', text: 'Features are the input data attributes, while Labels are the target values to predict', isCorrect: true },
          { id: '2', text: 'Labels are input numbers; Features are error logs', isCorrect: false },
          { id: '3', text: 'Features and Labels are identical terms', isCorrect: false },
          { id: '4', text: 'Features are physical wires; Labels are sticky notes', isCorrect: false },
        ],
        explanation: 'Supervised models learn the mapping function from feature inputs to known ground-truth labels.',
        hint: 'Inputs are features; targets are labels.',
        difficulty: 'medium',
      },
      {
        id: `dat-${Date.now()}-4`,
        question: 'Why do data scientists split datasets into Training and Testing subsets?',
        options: [
          { id: '1', text: 'To evaluate how effectively the trained model generalizes to completely new, unseen data', isCorrect: true },
          { id: '2', text: 'To make dataset files smaller for email attachments', isCorrect: false },
          { id: '3', text: 'Because computer screens cannot display all rows at once', isCorrect: false },
          { id: '4', text: 'To delete half the data', isCorrect: false },
        ],
        explanation: 'Testing on held-out data verifies that the model has learned true patterns rather than just memorizing training noise.',
        hint: 'Testing evaluates generalization to unseen data.',
        difficulty: 'hard',
      },
      {
        id: `dat-${Date.now()}-5`,
        question: 'What is "Overfitting" in machine learning?',
        options: [
          { id: '1', text: 'When a model learns training data noise too closely and fails to generalize to real-world inputs', isCorrect: true },
          { id: '2', text: 'When a computer monitor runs out of desktop space', isCorrect: false },
          { id: '3', text: 'When code runs too fast for the CPU', isCorrect: false },
          { id: '4', text: 'When a dataset has zero rows', isCorrect: false },
        ],
        explanation: 'Overfitting occurs when high-capacity models memorize idiosyncrasies of the training set rather than broad underlying patterns.',
        hint: 'Memorizing training noise instead of generalizing.',
        difficulty: 'hard',
      },
    ]
  }

  // 3. Generative AI, LLMs & Transformers
  if (norm.includes('generative') || norm.includes('llm') || norm.includes('prompt') || norm.includes('chat') || norm.includes('story') || norm.includes('draw')) {
    return [
      {
        id: `gen-${Date.now()}-1`,
        question: 'What is the primary function of Generative AI models?',
        options: [
          { id: '1', text: 'To synthesize novel text, images, audio, or code by learning probability distributions of training data', isCorrect: true },
          { id: '2', text: 'To copy and paste pre-written text verbatim from encyclopedias', isCorrect: false },
          { id: '3', text: 'To replace mechanical electricity grids', isCorrect: false },
          { id: '4', text: 'To act as a physical typewriter', isCorrect: false },
        ],
        explanation: 'Generative models sample from learned representations to generate new, original content.',
        hint: 'Generating new original text, code, or images.',
        difficulty: 'easy',
      },
      {
        id: `gen-${Date.now()}-2`,
        question: 'What is a "prompt" when communicating with Large Language Models?',
        options: [
          { id: '1', text: 'The natural language instruction, question, or context provided by a user to guide the AI output', isCorrect: true },
          { id: '2', text: 'The physical power button of the monitor', isCorrect: false },
          { id: '3', text: 'A software error that crashes the browser', isCorrect: false },
          { id: '4', text: 'A network router cable', isCorrect: false },
        ],
        explanation: 'Prompts provide the conditioning tokens that steer autoregressive text generation.',
        hint: 'The instructions or query given to an AI.',
        difficulty: 'easy',
      },
      {
        id: `gen-${Date.now()}-3`,
        question: 'What is meant by an AI "hallucination"?',
        options: [
          { id: '1', text: 'When an AI model generates factually incorrect or fabricated information with high confidence', isCorrect: true },
          { id: '2', text: 'When a computer screen flickers unexpectedly', isCorrect: false },
          { id: '3', text: 'When computer fans make loud noises', isCorrect: false },
          { id: '4', text: 'When internet download speeds drop', isCorrect: false },
        ],
        explanation: 'Hallucination occurs when an LLM predicts statistically plausible token sequences that do not correlate with ground truth.',
        hint: 'Generating confident but factually untrue information.',
        difficulty: 'medium',
      },
      {
        id: `gen-${Date.now()}-4`,
        question: 'Which architecture powers modern state-of-the-art language models like Gemini and GPT?',
        options: [
          { id: '1', text: 'Transformer architecture with self-attention mechanisms', isCorrect: true },
          { id: '2', text: 'Simple binary decision trees', isCorrect: false },
          { id: '3', text: 'Linear regression curves only', isCorrect: false },
          { id: '4', text: 'Finite state automata machines', isCorrect: false },
        ],
        explanation: 'Transformers process all input tokens in parallel using multi-head self-attention to capture long-range contextual dependencies.',
        hint: 'Transformer architecture with self-attention.',
        difficulty: 'hard',
      },
      {
        id: `gen-${Date.now()}-5`,
        question: 'What is Retrieval-Augmented Generation (RAG)?',
        options: [
          { id: '1', text: 'A technique that retrieves factual information from verified databases and provides it as context to the LLM', isCorrect: true },
          { id: '2', text: 'Deleting all database tables before generating text', isCorrect: false },
          { id: '3', text: 'Turning off the computer screen during generation', isCorrect: false },
          { id: '4', text: 'Increasing model randomness to maximum', isCorrect: false },
        ],
        explanation: 'RAG grounds generative models with authoritative, up-to-date source documents, drastically reducing hallucinations.',
        hint: 'Retrieving external factual context to ground generations.',
        difficulty: 'hard',
      },
    ]
  }

  // 4. Responsible AI, Ethics, Safety & Privacy
  if (norm.includes('care') || norm.includes('safe') || norm.includes('ethic') || norm.includes('privacy') || norm.includes('trust') || norm.includes('deepfake')) {
    return [
      {
        id: `eth-${Date.now()}-1`,
        question: 'What is a "deepfake"?',
        options: [
          { id: '1', text: 'Synthetic media (video, audio, or image) manipulated by AI to depict someone doing or saying something they never did', isCorrect: true },
          { id: '2', text: 'A submarine diving deep underwater', isCorrect: false },
          { id: '3', text: 'A broken computer screen', isCorrect: false },
          { id: '4', text: 'An unedited camera photo', isCorrect: false },
      ],
      explanation: 'Deepfakes use generative neural models to synthesize realistic voice clones and facial replacements.',
      hint: 'Synthetic AI-manipulated video or audio.',
      difficulty: 'easy',
    },
    {
      id: 'eth-2',
      question: 'What is Personally Identifiable Information (PII) and why must it be safeguarded?',
      options: [
        { id: '1', text: 'Information that identifies an individual (names, addresses, biometric data) which must be protected against theft and unauthorized use', isCorrect: true },
        { id: '2', text: 'The brand name of computer monitors', isCorrect: false },
        { id: '3', text: 'Stock photos of landscapes', isCorrect: false },
        { id: '4', text: 'The physical weight of desktop towers', isCorrect: false },
      ],
      explanation: 'PII privacy protection is legally mandated (GDPR, DPDP) to prevent identity theft and surveillance abuses.',
      hint: 'Personal data that traces to a real individual.',
      difficulty: 'easy',
    },
    {
      id: 'eth-3',
      question: 'What causes algorithmic bias in Artificial Intelligence decision systems?',
      options: [
        { id: '1', text: 'Historical prejudices, unrepresentative data samples, or flawed labeling in training datasets', isCorrect: true },
        { id: '2', text: 'Using fast internet connections', isCorrect: false },
        { id: '3', text: 'Having too many lines of code', isCorrect: false },
        { id: '4', text: 'Computer monitors getting warm', isCorrect: false },
      ],
      explanation: 'Models learn the statistical skews present in their training data, perpetuating historical inequities unless actively debiased.',
      hint: 'Biased training data causes biased model outcomes.',
      difficulty: 'medium',
    },
    {
      id: 'eth-4',
      question: 'What is the purpose of Explainable AI (XAI)?',
      options: [
        { id: '1', text: 'Enabling human auditors to understand the reasoning, evidence, and factors behind an AI model’s decisions', isCorrect: true },
        { id: '2', text: 'Making the computer hardware case transparent glass', isCorrect: false },
        { id: '3', text: 'Publishing user passwords online', isCorrect: false },
        { id: '4', text: 'Slowing down processor clock speed', isCorrect: false },
      ],
      explanation: 'Explainability ensures transparency, accountability, and contestability in automated decision-making systems.',
      hint: 'Explaining the reasoning behind AI decisions.',
      difficulty: 'hard',
    },
    {
      id: 'eth-5',
      question: 'Who bears ultimate ethical and legal responsibility for decisions made by deployed AI systems?',
      options: [
        { id: '1', text: 'The human developers, executives, and organizations deploying the AI system', isCorrect: true },
        { id: '2', text: 'The software code itself as a legal person', isCorrect: false },
        { id: '3', text: 'The physical silicon microchips', isCorrect: false },
        { id: '4', text: 'Nobody bears any responsibility', isCorrect: false },
      ],
      explanation: 'Software has no legal personhood; human creators and deploying organizations are accountable for algorithmic outcomes.',
      hint: 'Humans and institutions bear responsibility.',
      difficulty: 'easy',
    },
  ]
}

  // 5. Default High-Yield Topic Synthesis (strictly asks about the topic entity, NEVER meta-questions!)
  const entity = cleanTopic.replace(/^(lesson|chapter|section|\d+|\:|\-|\—)\s*/gi, '').trim() || 'Artificial Intelligence'

  return [
    {
      id: `top-${Date.now()}-1`,
      question: `What is the core concept explored in "${entity}"?`,
      options: [
        { id: '1', text: `Understanding and applying the principles of ${entity} to solve computational problems`, isCorrect: true },
        { id: '2', text: 'Mechanical non-electronic clockwork systems with manual gears', isCorrect: false },
        { id: '3', text: 'Unrelated paper filing methods without computational processing', isCorrect: false },
        { id: '4', text: 'Static calculators executing fixed formulas without data adaptation', isCorrect: false },
      ],
      explanation: `"${entity}" focuses on foundational principles and real-world computational problem solving.`,
      hint: `Recall the primary focus of ${entity}.`,
      difficulty: 'easy',
    },
    {
      id: `top-${Date.now()}-2`,
      question: `How does mastering "${entity}" enhance analytical problem-solving?`,
      options: [
        { id: '1', text: 'By enabling structured logic, data-driven evaluation, and systematic pattern analysis', isCorrect: true },
        { id: '2', text: 'By eliminating the need to test or verify software outputs', isCorrect: false },
        { id: '3', text: 'By preventing exploration of creative technological solutions', isCorrect: false },
        { id: '4', text: 'By replacing all digital tools with manual calculations', isCorrect: false },
      ],
      explanation: `Mastery of ${entity} fosters rigorous analytical thinking and practical implementation skills.`,
      hint: 'Structured logic and data-driven evaluation.',
      difficulty: 'medium',
    },
    {
      id: `top-${Date.now()}-3`,
      question: `Which methodology is essential when evaluating solutions in "${entity}"?`,
      options: [
        { id: '1', text: 'Rigorous step-by-step testing, validating edge cases, and checking real-world assumptions', isCorrect: true },
        { id: '2', text: 'Accepting initial assumptions without testing or verification', isCorrect: false },
        { id: '3', text: 'Skipping instructions and guessing random outcomes', isCorrect: false },
        { id: '4', text: 'Disregarding safety and ethical guidelines completely', isCorrect: false },
      ],
      explanation: 'Systematic testing and edge-case evaluation ensure dependable, accurate outcomes.',
      hint: 'Rigorous testing and verification.',
      difficulty: 'medium',
    },
    {
      id: `top-${Date.now()}-4`,
      question: `In modern applications, what distinguishes effective work in "${entity}" from ad-hoc guesswork?`,
      options: [
        { id: '1', text: 'Clear problem framing, reproducible workflows, and verifiable data analysis', isCorrect: true },
        { id: '2', text: 'Unmonitored trial-and-error without recording observations', isCorrect: false },
        { id: '3', text: 'Relying exclusively on unverified intuition', isCorrect: false },
        { id: '4', text: 'Ignoring error logs and validation metrics', isCorrect: false },
      ],
      explanation: 'Reproducible methodologies and clear problem framing produce scalable and reliable results.',
      hint: 'Reproducible workflows and verifiable analysis.',
      difficulty: 'hard',
    },
    {
      id: `top-${Date.now()}-5`,
      question: `True or False: The principles learned in "${entity}" directly connect theoretical understanding with practical application.`,
      options: [
        { id: '1', text: `True! Theoretical concepts in ${entity} provide the foundation for practical innovation`, isCorrect: true },
        { id: '2', text: 'False! This topic has no connection to practical real-world applications', isCorrect: false },
      ],
      explanation: `Understanding ${entity} connects foundational computational theory with real-world technological solutions.`,
      hint: 'Theory forms the foundation for practical application.',
      difficulty: 'easy',
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC SERVICE API
// ─────────────────────────────────────────────────────────────────────────────

export const lessonQuizService = {
  /**
   * Generates or fetches a topic-specific quiz for any selected Subject, Chapter, and Lesson.
   * If lessonTitle indicates full chapter or isFullChapter is true, returns questions across ALL lessons in the chapter.
   */
  async getQuizForLesson(params: {
    subjectName: string
    chapterTitle: string
    lessonTitle: string
    academicLevel?: string
    contentId?: string
    chapterId?: string
    lessonContent?: string
    gradeKey?: string
    chapterNum?: string | number
    isFullChapter?: boolean
    studentId?: string
    contextKey?: string
    forceNewAttempt?: boolean
  }): Promise<GeneratedQuiz> {
    const {
      subjectName,
      chapterTitle,
      lessonTitle,
      academicLevel = 'Standard',
      contentId,
      lessonContent,
      gradeKey,
      chapterNum,
      isFullChapter = false,
      studentId,
      contextKey,
      forceNewAttempt: _forceNewAttempt = false,
    } = params

    const isFullChapterQuiz =
      isFullChapter ||
      lessonTitle.toLowerCase().includes('full chapter') ||
      lessonTitle.toLowerCase().includes('mastery assessment') ||
      lessonTitle.toLowerCase().includes('all lessons')

    // Clean lesson title: remove section numbers, prefixes
    const cleanLesson = lessonTitle
      .replace(/^section\s*\d*\s*:\s*/i, '')
      .replace(/^(video briefing|visual & infographic|lesson|interactive workbook & matching activity|olympiad flashcards & discussion|practical lab & observation sandbox|graded capstone assignment|duolingo mastery assessment|full chapter assessment|chapter mastery quiz)\s*:\s*/i, '')
      .replace(/^lesson\s*\d*:\s*/i, '')
      .trim()

    const cleanKey = cleanLesson.toLowerCase()
    let questions: DynamicQuizQuestion[] = []

    // 1. Check curriculum catalog curated questions (strictly class, chapter, and lesson-specific)
    if (gradeKey && chapterNum) {
      try {
        const chapContent = curriculumCatalogService.getCurriculumChapterContent(gradeKey, chapterNum)
        if (isFullChapterQuiz && chapContent?.quizQuestions && chapContent.quizQuestions.length > 0) {
          questions = chapContent.quizQuestions.map((qq, idx) => ({
            id: `cur-full-${idx + 1}`,
            question: qq.question,
            options: qq.options.map((o, oIdx) => ({
              id: `cur-opt-f-${idx + 1}-${oIdx + 1}`,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
            explanation: qq.explanation,
            difficulty: 'medium',
          }))
        } else if (
          (cleanKey.includes('lesson 1') || cleanKey.includes(chapContent.topic1.toLowerCase()) || !cleanKey.includes(chapContent.topic2.toLowerCase())) &&
          chapContent.lesson1QuizQuestions &&
          chapContent.lesson1QuizQuestions.length > 0
        ) {
          questions = chapContent.lesson1QuizQuestions.map((qq, idx) => ({
            id: `cur-l1-${idx + 1}`,
            question: qq.question,
            options: qq.options.map((o, oIdx) => ({
              id: `cur-opt-l1-${idx + 1}-${oIdx + 1}`,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
            explanation: qq.explanation,
            difficulty: 'medium',
          }))
        } else if (
          chapContent.lesson2QuizQuestions &&
          chapContent.lesson2QuizQuestions.length > 0
        ) {
          questions = chapContent.lesson2QuizQuestions.map((qq, idx) => ({
            id: `cur-l2-${idx + 1}`,
            question: qq.question,
            options: qq.options.map((o, oIdx) => ({
              id: `cur-opt-l2-${idx + 1}-${oIdx + 1}`,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
            explanation: qq.explanation,
            difficulty: 'medium',
          }))
        }
      } catch (curErr) {
        console.warn('Could not load curriculum chapter quiz questions:', curErr)
      }
    }

    // 2. Check exact match in Topic Question Map
    if (questions.length === 0 && TOPIC_QUESTION_MAP[cleanKey]) {
      questions = [...TOPIC_QUESTION_MAP[cleanKey]]
    }

    // 3. Check substring / partial match in Topic Question Map
    if (questions.length === 0) {
      for (const [key, qList] of Object.entries(TOPIC_QUESTION_MAP)) {
        if (cleanKey.includes(key) || key.includes(cleanKey)) {
          questions = [...qList]
          break
        }
      }
    }

    // 4. If contentId is provided, check if questions exist in the database for this quiz
    if (questions.length === 0 && contentId) {
      try {
        const dbQuiz = await quizService.getByContentId(contentId)
        if (dbQuiz?.id) {
          const dbQuestions = await quizService.getQuestionsForQuiz(dbQuiz.id)
          if (dbQuestions && dbQuestions.length > 0) {
            questions = dbQuestions.map((qq, idx) => {
              const q = qq.question
              return {
                id: q?.id || `q-${idx}`,
                question: q?.question || `Question ${idx + 1}`,
                options: (q?.options || []).map((o, oIdx) => ({
                  id: o.id || `opt-${oIdx}`,
                  text: o.option_text,
                  isCorrect: o.is_correct,
                })),
                explanation: q?.explanation || 'Review the lesson concepts for detailed explanation.',
                difficulty: q?.difficulty || 'medium',
              }
            })
          }
        }
      } catch (err) {
        console.warn('Could not query database quiz questions:', err)
      }
    }

    // 5. Try extracting factual questions directly from lessonContent if provided
    if (questions.length === 0 && lessonContent) {
      const fromContent = extractQuestionsFromContent(lessonContent, cleanLesson, chapterTitle)
      if (fromContent && fromContent.length >= 3) {
        questions = fromContent
      }
    }

    // 6. Generate domain-accurate concept questions (strictly testing the topic entity)
    if (questions.length === 0) {
      questions = generateConceptQuestions(cleanLesson, chapterTitle, subjectName)
    }

    // 7. Stable Question Pool & IDs matching Section 8
    const classCode = getShortClassCode(academicLevel, gradeKey)
    const chapterCode = getShortChapterCode(chapterTitle, chapterNum || '1')
    const lessonCode = isFullChapterQuiz ? 'FULL' : getShortLessonNum(lessonTitle)

    // Guarantee NO duplicate questions inside the pool
    const uniquePool: DynamicQuizQuestion[] = []
    const seenTexts = new Set<string>()
    for (let pIdx = 0; pIdx < questions.length; pIdx++) {
      const q = questions[pIdx]
      const normalizedQ = q.question.toLowerCase().trim()
      if (!seenTexts.has(normalizedQ)) {
        seenTexts.add(normalizedQ)
        const stableId = generateQuestionId(classCode, chapterCode, lessonCode, pIdx)
        uniquePool.push({
          ...q,
          id: stableId,
        })
      }
    }

    // 8. Prevent repeating questions from previous attempts
    let finalizedQuestions: DynamicQuizQuestion[] = []
    if (studentId && contextKey) {
      const answeredIds = new Set(lessonQuizService.getAnsweredQuestionIds(studentId, contextKey))
      const unseenQuestions = uniquePool.filter(q => !answeredIds.has(q.id))
      const history = lessonQuizService.getAttemptHistory(studentId, contextKey)
      const attemptNum = history.length

      if (unseenQuestions.length >= 5) {
        finalizedQuestions = unseenQuestions.slice(0, 5)
      } else if (unseenQuestions.length > 0) {
        const remainingNeeded = 5 - unseenQuestions.length
        const seenQuestions = uniquePool.filter(q => answeredIds.has(q.id))
        // Rotate offset so even seen questions don't appear in identical order
        const rotateOffset = (attemptNum * 2) % Math.max(1, seenQuestions.length)
        const rotatedSeen = [
          ...seenQuestions.slice(rotateOffset),
          ...seenQuestions.slice(0, rotateOffset)
        ]
        finalizedQuestions = [...unseenQuestions, ...rotatedSeen.slice(0, remainingNeeded)]
      } else {
        // Pool is exhausted! Rotate question set based on attempt number so student doesn't see identical questions
        const rotateOffset = (attemptNum * 3) % Math.max(1, uniquePool.length)
        const rotated = [
          ...uniquePool.slice(rotateOffset),
          ...uniquePool.slice(0, rotateOffset)
        ]
        finalizedQuestions = rotated.slice(0, 5)
      }
    } else {
      finalizedQuestions = uniquePool.slice(0, 5)
    }

    // Fallback if pool is small
    if (finalizedQuestions.length === 0) {
      finalizedQuestions = uniquePool.slice(0, 5)
    }

    // 9. Shuffle options for presentation
    finalizedQuestions = finalizedQuestions.map(q => ({
      ...q,
      options: shuffleOptions(q.options),
    }))

    // 10. Format Section 7 standard JSON export
    const jsonQuestions = finalizedQuestions.map(q => {
      const optMap: { A: string; B: string; C: string; D: string } = {
        A: q.options[0]?.text || '',
        B: q.options[1]?.text || '',
        C: q.options[2]?.text || '',
        D: q.options[3]?.text || '',
      }
      const correctIdx = q.options.findIndex(o => o.isCorrect)
      const letter = (['A', 'B', 'C', 'D'][correctIdx >= 0 ? correctIdx : 0] || 'A') as 'A' | 'B' | 'C' | 'D'
      return {
        id: q.id,
        question: q.question,
        options: optMap,
        correct_answer: letter,
        explanation: q.explanation,
      }
    })

    const cleanChapterName = chapterTitle.replace(/^chapter\s*\d*\s*[-—:]\s*/i, '').trim()
    const cleanClassName = academicLevel.toUpperCase()
    const finalTitle = isFullChapterQuiz
      ? `${chapterTitle} — Full Chapter Assessment`
      : `${cleanLesson} — Lesson Quiz`

    const structuredJson: StructuredQuizJson = {
      class: cleanClassName,
      chapter: cleanChapterName,
      subject: subjectName,
      lesson: isFullChapterQuiz ? 'Full Chapter Assessment' : cleanLesson,
      questions: jsonQuestions,
    }

    return {
      quizId: contentId,
      title: finalTitle,
      class: cleanClassName,
      chapter: cleanChapterName,
      subject: subjectName,
      lesson: isFullChapterQuiz ? 'Full Chapter Assessment' : cleanLesson,
      subjectName,
      chapterTitle,
      lessonTitle: isFullChapterQuiz ? 'Full Chapter Assessment' : cleanLesson,
      academicLevel,
      timeLimit: isFullChapterQuiz ? 15 : 10,
      passingPercentage: 60,
      questions: finalizedQuestions,
      structuredJson,
    }
  },

  /**
   * Generates a Full Chapter Quiz covering ALL lessons in the chapter.
   */
  async getQuizForChapter(params: {
    subjectName: string
    chapterTitle: string
    academicLevel?: string
    gradeKey?: string
    chapterNum?: string | number
    chapterId?: string
  }): Promise<GeneratedQuiz> {
    return this.getQuizForLesson({
      ...params,
      lessonTitle: `${params.chapterTitle} — Full Chapter Assessment`,
      isFullChapter: true,
    })
  },

  /**
   * Generates and returns structured JSON conforming strictly to Section 7 & 8 format.
   */
  async generateStructuredQuizJson(params: {
    className: string
    chapterName: string
    subjectName: string
    lessonName: string
    lessonContent?: string
    gradeKey?: string
    chapterNum?: string | number
  }): Promise<StructuredQuizJson> {
    const res = await this.getQuizForLesson({
      academicLevel: params.className,
      chapterTitle: params.chapterName,
      subjectName: params.subjectName,
      lessonTitle: params.lessonName,
      lessonContent: params.lessonContent,
      gradeKey: params.gradeKey,
      chapterNum: params.chapterNum,
    })

    return res.structuredJson!
  },

  /**
   * Records a student's quiz attempt into Supabase and updates progress
   */
  async recordAttempt(params: {
    studentId: string
    orgId: string
    quizId?: string
    contentId?: string
    totalMarks: number
    scoredMarks: number
    percentage: number
    passed: boolean
    answers: { questionId: string; selectedOptionId: string; isCorrect: boolean }[]
  }): Promise<{ success: boolean; attemptId?: string }> {
    try {
      const { studentId, orgId, quizId, contentId, totalMarks, scoredMarks, percentage: _percentage, passed, answers } = params

      // If we have an existing quiz in DB
      let finalQuizId = quizId
      if (!finalQuizId && contentId) {
        const qz = await quizService.getByContentId(contentId).catch(() => null)
        if (qz) finalQuizId = qz.id
      }

      if (finalQuizId) {
        try {
          const attempt = await quizService.startAttempt(finalQuizId, studentId)
          const answerPayloads = answers.map(a => ({
            attempt_id: attempt.id,
            question_id: a.questionId,
            selected_option_ids: a.selectedOptionId ? [a.selectedOptionId] : [],
            is_correct: a.isCorrect,
            marks_awarded: a.isCorrect ? 1 : 0,
          }))

          await quizService.submitAttempt(
            attempt.id,
            answerPayloads,
            Math.max(1, totalMarks),
            Math.max(0, scoredMarks),
            60
          )
          return { success: true, attemptId: attempt.id }
        } catch (dbErr) {
          console.warn('Could not record via quizService, falling back to content progress:', dbErr)
        }
      }

      // If no DB quiz record or DB attempt failed, mark content progress directly
      if (contentId && orgId) {
        const { error } = await supabase
          .from('student_content_progress')
          .upsert({
            student_id: studentId,
            chapter_content_id: contentId,
            organization_id: orgId,
            status: passed ? 'completed' : 'in_progress',
            completed_at: passed ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'student_id,chapter_content_id' })
        if (error) console.error('Failed to update student content progress:', error)
      }

      return { success: true }
    } catch (err) {
      console.error('Error recording attempt:', err)
      return { success: false }
    }
  },

  /**
   * Retrieves all past quiz attempts for a student and chapter/lesson context.
   * Guarantees persistent tracking across sessions.
   */
  getAttemptHistory(studentId: string, contextKey: string): QuizAttemptRecord[] {
    try {
      const storageKey = `nanjil_quiz_attempts_${studentId || 'guest'}_${contextKey}`
      const raw = localStorage.getItem(storageKey)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      console.warn('Error reading attempt history:', e)
      return []
    }
  },

  /**
   * Returns a list of all question IDs previously answered by the student in this context.
   */
  getAnsweredQuestionIds(studentId: string, contextKey: string): string[] {
    try {
      const history = this.getAttemptHistory(studentId, contextKey)
      const ids: string[] = []
      for (const attempt of history) {
        if (attempt.answers && Array.isArray(attempt.answers)) {
          for (const ans of attempt.answers) {
            if (ans.questionId) ids.push(ans.questionId)
          }
        }
      }
      return ids
    } catch (e) {
      console.warn('Error extracting answered question IDs:', e)
      return []
    }
  },

  /**
   * Saves a completed Mastery Assessment attempt locally and pushes to Supabase.
   */
  async recordMasteryAttempt(
    record: QuizAttemptRecord,
    contextKey: string
  ): Promise<{ success: boolean; attemptId?: string }> {
    try {
      // 1. Store in localStorage for instant retrieval and question rotation
      const storageKey = `nanjil_quiz_attempts_${record.studentId || 'guest'}_${contextKey}`
      const existing = this.getAttemptHistory(record.studentId, contextKey)
      const updated = [...existing, record]
      localStorage.setItem(storageKey, JSON.stringify(updated))

      // 2. Also record to database if online
      if (record.studentId && record.studentId !== 'guest') {
        const answersPayload = record.answers.map(a => ({
          questionId: a.questionId,
          selectedOptionId: a.selectedOptionId || '',
          isCorrect: a.isCorrect,
        }))

        await this.recordAttempt({
          studentId: record.studentId,
          orgId: 'nanjil_org',
          quizId: record.quizId,
          contentId: record.lessonId,
          totalMarks: record.totalMarks,
          scoredMarks: record.scoredMarks,
          percentage: record.accuracy,
          passed: record.passed,
          answers: answersPayload,
        })
      }

      return { success: true, attemptId: record.id }
    } catch (e) {
      console.error('Error saving mastery attempt:', e)
      return { success: false }
    }
  },
}
