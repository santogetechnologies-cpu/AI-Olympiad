import type { LearningWorldId, LearningWorldMeta } from './types'

export const LEARNING_WORLDS: Record<LearningWorldId, LearningWorldMeta> = {
  'class3-playful': {
    id: 'class3-playful',
    title: 'Playful AI Wonderland',
    subtitle: 'Learn through fun, friendly robot companions and interactive puzzles!',
    badge: 'Class 3 · Playful World',
    themeColor: 'from-amber-400 via-orange-400 to-pink-500',
    ageGroup: '8-9 Years (Primary)',
    mascotName: 'Pixel Bot',
    mascotAvatar: 'AI Bot',
  },
  'class4-story': {
    id: 'class4-story',
    title: 'AI Story & Comic Adventure',
    subtitle: 'Explore futuristic story chapters with Dr. Ada & Nova the Rover!',
    badge: 'Class 4 · Story Adventure',
    themeColor: 'from-emerald-400 via-teal-500 to-cyan-600',
    ageGroup: '9-10 Years (Primary)',
    mascotName: 'Nova the Rover',
    mascotAvatar: 'Rover',
  },
  'class5-puzzle': {
    id: 'class5-puzzle',
    title: 'Neon Logic & Puzzle Lab',
    subtitle: 'Connect glowing logic jigsaw tiles and crack secret data locks!',
    badge: 'Class 5 · Puzzle World',
    themeColor: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    ageGroup: '10-11 Years (Primary)',
    mascotName: 'Gizmo Gear',
    mascotAvatar: 'Gizmo',
  },
  'class6-mission': {
    id: 'class6-mission',
    title: 'Secret Agent AI Command',
    subtitle: 'Execute high-stakes tactical missions, decode ciphers, and launch rovers!',
    badge: 'Class 6 · Mission World',
    themeColor: 'from-blue-600 via-indigo-700 to-slate-900',
    ageGroup: '11-12 Years (Middle School)',
    mascotName: 'Agent 06',
    mascotAvatar: 'Agent',
  },
  'class7-mystery': {
    id: 'class7-mystery',
    title: 'Cyber Detective Bureau',
    subtitle: 'Examine crime scene evidence, interrogate algorithms, and solve cases!',
    badge: 'Class 7 · Mystery World',
    themeColor: 'from-violet-700 via-indigo-800 to-slate-900',
    ageGroup: '12-13 Years (Middle School)',
    mascotName: 'Inspector Holmes',
    mascotAvatar: 'Inspector',
  },
  'class8-experiment': {
    id: 'class8-experiment',
    title: 'Interactive Physics & AI Test Bench',
    subtitle: 'Adjust live sliders, observe variance dials, and formulate empirical rules!',
    badge: 'Class 8 · Experiment World',
    themeColor: 'from-cyan-500 via-blue-600 to-indigo-700',
    ageGroup: '13-14 Years (Middle School)',
    mascotName: 'Lab Master Kelvin',
    mascotAvatar: 'Kelvin',
  },
  'class9-challenge': {
    id: 'class9-challenge',
    title: 'Smart City & Ethical Challenge World',
    subtitle: 'Solve real-world civic dilemmas, manage trade-offs, and design public AI!',
    badge: 'Class 9 · Real-World Challenge World',
    themeColor: 'from-teal-600 via-emerald-700 to-slate-900',
    ageGroup: '14-15 Years (High School)',
  },
  'class10-simulation': {
    id: 'class10-simulation',
    title: 'Autonomous Systems & Telemetry Simulator',
    subtitle: 'Tune neural hyperparameters, test failover protocols, and verify telemetry!',
    badge: 'Class 10 · Simulation World',
    themeColor: 'from-sky-600 via-blue-700 to-slate-900',
    ageGroup: '15-16 Years (Secondary Board)',
  },
  'class11-project': {
    id: 'class11-project',
    title: 'Product Architecture & Project Studio',
    subtitle: 'Wire system pipeline nodes, author PRDs, and engineer capstone prototypes!',
    badge: 'Class 11 · Project World',
    themeColor: 'from-indigo-600 via-violet-700 to-slate-900',
    ageGroup: '16-17 Years (Senior Secondary)',
  },
  'class12-ailab': {
    id: 'class12-ailab',
    title: 'Deep Learning & Foundation Models Lab',
    subtitle: 'Project embedding spaces, audit demographic bias, and explore neural manifolds!',
    badge: 'Class 12 · AI Lab World',
    themeColor: 'from-purple-600 via-indigo-700 to-slate-900',
    ageGroup: '17-18 Years (Pre-University)',
  },
  'ug-professional': {
    id: 'ug-professional',
    title: 'Enterprise AI Engineering Workbench',
    subtitle: 'Deploy distributed inference services, load test pipelines, and deliver production specs!',
    badge: 'Undergraduate · Professional Lab',
    themeColor: 'from-blue-700 via-slate-800 to-slate-950',
    ageGroup: '18-22 Years (Undergraduate)',
  },
  'pg-research': {
    id: 'pg-research',
    title: 'Frontier AI Research & Innovation Hub',
    subtitle: 'Conduct ablation studies, probe attention circuits, and author novel research contributions!',
    badge: 'Postgraduate · Innovation & Research',
    themeColor: 'from-slate-800 via-indigo-950 to-black',
    ageGroup: '22+ Years (Postgraduate / Research)',
  },
}

export function resolveLearningWorld(gradeKey?: string): LearningWorldMeta {
  const k = (gradeKey || 'class3').toLowerCase().trim()

  if (k.includes('class3')) return LEARNING_WORLDS['class3-playful']
  if (k.includes('class4')) return LEARNING_WORLDS['class4-story']
  if (k.includes('class5')) return LEARNING_WORLDS['class5-puzzle']
  if (k.includes('class6')) return LEARNING_WORLDS['class6-mission']
  if (k.includes('class7')) return LEARNING_WORLDS['class7-mystery']
  if (k.includes('class8')) return LEARNING_WORLDS['class8-experiment']
  if (k.includes('class9')) return LEARNING_WORLDS['class9-challenge']
  if (k.includes('class10')) return LEARNING_WORLDS['class10-simulation']
  if (k.includes('class11')) return LEARNING_WORLDS['class11-project']
  if (k.includes('class12')) return LEARNING_WORLDS['class12-ailab']
  if (k.includes('ug')) return LEARNING_WORLDS['ug-professional']
  if (k.includes('pg')) return LEARNING_WORLDS['pg-research']

  return LEARNING_WORLDS['class3-playful']
}
