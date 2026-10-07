// ─────────────────────────────────────────────────────────────────────────────
// CURATED EDUCATIONAL ILLUSTRATIONS & TOPIC DIAGRAMS
// Tailored for every Academic Level and Topic Domain
// ─────────────────────────────────────────────────────────────────────────────

export interface TopicIllustration {
  src: string
  caption: string
  alt: string
  badge: string
  gradient: string
  color: string
}

export const TOPIC_ILLUSTRATIONS: Record<string, TopicIllustration> = {
  // AI Basics & Machine Learning
  ai_basics: {
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 1.1: Artificial Intelligence, Machine Learning, and Deep Learning Neural Hierarchy.',
    alt: 'AI Neural Network Architecture and Data Pipelines',
    badge: 'Neural Architecture',
    gradient: 'from-blue-600 via-indigo-700 to-slate-900',
    color: 'from-blue-600 to-indigo-800',
  },
  machine_learning: {
    src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 1.2: Supervised and Unsupervised Learning Pattern Extraction Pipeline.',
    alt: 'Machine Learning Training vs Inference',
    badge: 'Data Patterns',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-900',
    color: 'from-cyan-600 to-blue-800',
  },
  deep_learning: {
    src: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 1.3: Multi-Layer Perceptron (MLP) Forward & Backward Propagation Flow.',
    alt: 'Deep Neural Network Layers',
    badge: 'Deep Learning',
    gradient: 'from-violet-600 via-purple-700 to-slate-900',
    color: 'from-violet-600 to-purple-800',
  },

  // NLP & Prompt Engineering
  nlp_prompt: {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 2.1: Large Language Model Tokenization and Self-Attention Mechanism.',
    alt: 'Natural Language Processing and Prompt Structure',
    badge: 'NLP & LLMs',
    gradient: 'from-emerald-600 via-teal-700 to-slate-900',
    color: 'from-emerald-600 to-teal-800',
  },
  transformers: {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 2.2: Transformer Multi-Head Attention QKV (Query, Key, Value) Computation.',
    alt: 'Transformer Attention Map',
    badge: 'Transformers',
    gradient: 'from-teal-600 via-cyan-700 to-slate-900',
    color: 'from-teal-600 to-cyan-800',
  },

  // Computer Vision
  computer_vision: {
    src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 3.1: Computer Vision Feature Extraction, Convolutional Filtering & Object Localization.',
    alt: 'Computer Vision Bounding Boxes and Feature Maps',
    badge: 'Computer Vision',
    gradient: 'from-fuchsia-600 via-pink-700 to-slate-900',
    color: 'from-fuchsia-600 to-pink-800',
  },
  medical_ai: {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 3.2: AI Diagnostic Image Segmentation & Radiological Anomaly Detection.',
    alt: 'Healthcare AI Medical Image Processing',
    badge: 'Healthcare AI',
    gradient: 'from-rose-600 via-red-700 to-slate-900',
    color: 'from-rose-600 to-red-800',
  },

  // Robotics & Edge AI
  robotics: {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 4.1: Autonomous Robot Sensor Fusion, Path Planning & Actuator Control Loop.',
    alt: 'Autonomous Robotics Control Systems',
    badge: 'Autonomous Systems',
    gradient: 'from-amber-600 via-orange-700 to-slate-900',
    color: 'from-amber-600 to-orange-800',
  },
  autonomous_vehicles: {
    src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 4.2: LiDAR Point Clouds, Radar Tracking, and Real-Time Trajectory Optimization.',
    alt: 'Self Driving Car Sensor Fusion',
    badge: 'Robotics & Mobility',
    gradient: 'from-orange-600 via-amber-700 to-slate-900',
    color: 'from-orange-600 to-amber-800',
  },

  // Generative AI & Tools
  generative_ai: {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 5.1: Latent Diffusion Denoising Trajectory and Multimodal Conditioning.',
    alt: 'Generative AI and Diffusion Models',
    badge: 'Generative AI',
    gradient: 'from-purple-600 via-indigo-700 to-slate-900',
    color: 'from-purple-600 to-indigo-800',
  },
  ai_agents: {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 5.2: Autonomous Agentic Loops: Planning, Memory Retrieval, and Tool Execution.',
    alt: 'Autonomous Agent Framework',
    badge: 'AI Agents',
    gradient: 'from-blue-700 via-purple-700 to-slate-900',
    color: 'from-blue-700 to-purple-800',
  },

  // Ethics, Safety & Governance
  ai_ethics: {
    src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Figure 6.1: AI Safety Framework: Constitutional Alignment, Bias Mitigation & Differential Privacy.',
    alt: 'AI Ethics and Global Safety Governance',
    badge: 'Responsible AI',
    gradient: 'from-slate-700 via-zinc-800 to-slate-950',
    color: 'from-slate-700 to-zinc-900',
  },
}

export function getIllustrationForTopic(topicTitle: string, chapterNum?: string | number): TopicIllustration {
  const t = topicTitle.toLowerCase()
  if (t.includes('vision') || t.includes('image') || t.includes('pixel') || t.includes('face') || t.includes('object')) {
    return TOPIC_ILLUSTRATIONS.computer_vision
  }
  if (t.includes('health') || t.includes('medical') || t.includes('diagnos')) {
    return TOPIC_ILLUSTRATIONS.medical_ai
  }
  if (t.includes('prompt') || t.includes('nlp') || t.includes('text') || t.includes('chat') || t.includes('language') || t.includes('communicat')) {
    return TOPIC_ILLUSTRATIONS.nlp_prompt
  }
  if (t.includes('transformer') || t.includes('attention') || t.includes('bert') || t.includes('gpt')) {
    return TOPIC_ILLUSTRATIONS.transformers
  }
  if (t.includes('robot') || t.includes('sensor') || t.includes('car') || t.includes('autonomous') || t.includes('drone')) {
    return TOPIC_ILLUSTRATIONS.robotics
  }
  if (t.includes('diffus') || t.includes('generat') || t.includes('creativ') || t.includes('tool') || t.includes('multimodal')) {
    return TOPIC_ILLUSTRATIONS.generative_ai
  }
  if (t.includes('agent') || t.includes('workflow') || t.includes('orchestrat')) {
    return TOPIC_ILLUSTRATIONS.ai_agents
  }
  if (t.includes('ethic') || t.includes('bias') || t.includes('fair') || t.includes('safe') || t.includes('care') || t.includes('responsib')) {
    return TOPIC_ILLUSTRATIONS.ai_ethics
  }
  if (t.includes('deep') || t.includes('neural') || t.includes('backprop')) {
    return TOPIC_ILLUSTRATIONS.deep_learning
  }

  // Fallback based on chapter number
  const ch = String(chapterNum || '1')
  if (ch === '2') return TOPIC_ILLUSTRATIONS.nlp_prompt
  if (ch === '3') return TOPIC_ILLUSTRATIONS.computer_vision
  if (ch === '4') return TOPIC_ILLUSTRATIONS.robotics
  if (ch === '5') return TOPIC_ILLUSTRATIONS.generative_ai
  if (ch === '6') return TOPIC_ILLUSTRATIONS.ai_ethics

  return TOPIC_ILLUSTRATIONS.ai_basics
}
