import React, { useState } from 'react'
import {
  Compass, BookOpen, Layers, Terminal, Sparkles, Award, ArrowRight,
  CheckCircle2, Cpu, Database, Network, Shield, Binary, Globe, Play,
  ChevronRight, Lightbulb, Zap, Rocket, HelpCircle
} from 'lucide-react'
import type { HigherEdLevelKey } from './types'
import { gameAudio } from '../../utils/gameAudio'
import { KindergartenExplainerService } from '../../services/kindergartenExplainerService'

export interface HigherEdVisualGuideProps {
  onSelectLevelAndLesson: (level: HigherEdLevelKey, chapter: number, lesson: 1 | 2) => void
  currentLevelKey?: HigherEdLevelKey
}

interface SyllabusTierGuide {
  key: HigherEdLevelKey
  shortCode: string
  title: string
  subtitle: string
  analogy: string
  whatIsIt: string
  visualSteps: {
    step: number
    title: string
    description: string
    tools: string[]
    metric: string
  }[]
  chapters: {
    num: number
    name: string
    whatYouLearn: string
    realWorldProject: string
  }[]
  activity: {
    title: string
    scenario: string
    instructions: string[]
    targetChapter: number
    targetLesson: 1 | 2
    xpReward: number
  }
}

export const SYLLABUS_GUIDES: SyllabusTierGuide[] = [
  {
    key: 'ug1',
    shortCode: 'UG-1',
    title: 'Applied AI Foundations & The Modern Stack',
    subtitle: 'Undergraduate Year 1: From Math & Code to Real AI Predictions',
    analogy: '🚗 Think of this as learning to drive and understanding what is under the hood: fuel, tires, brakes, and traffic rules.',
    whatIsIt: 'This is where you bridge standard computer science with artificial intelligence. You learn how computers represent text and images as numbers (tensors), how mathematical algorithms find patterns in noisy data, and how to write Python code that predicts outcomes without hardcoding if-else rules.',
    visualSteps: [
      {
        step: 1,
        title: 'Python, Vectors & Matrix Math',
        description: 'Convert real-world tables, audio, and pixels into multidimensional NumPy arrays and PyTorch tensors.',
        tools: ['Python 3.11', 'NumPy', 'Pandas'],
        metric: 'Data Matrix Shape (N, D)'
      },
      {
        step: 2,
        title: 'Feature Engineering & Data Cleansing',
        description: 'Clean corrupt inputs, normalize data distributions, and build clean input vectors.',
        tools: ['Scikit-Learn', 'Seaborn'],
        metric: 'Zero Null Values / Standard Scaled'
      },
      {
        step: 3,
        title: 'Supervised & Unsupervised Learning',
        description: 'Train Linear Regression, Decision Trees, and Random Forests to classify and forecast.',
        tools: ['Scikit-Learn', 'XGBoost'],
        metric: 'F1-Score > 0.85'
      },
      {
        step: 4,
        title: 'Evaluation & Ethical AI Guidelines',
        description: 'Measure false positives, verify model bias, and implement transparent model cards.',
        tools: ['Fairlearn', 'SHAP'],
        metric: 'Fairness Disparity < 5%'
      }
    ],
    chapters: [
      { num: 1, name: 'AI Basics & Linear Systems', whatYouLearn: 'Linear Algebra, Matrix Transformations, Dot Products, and Python fundamentals', realWorldProject: 'Predicting real estate valuation using multi-variable regression' },
      { num: 2, name: 'Communicate with AI', whatYouLearn: 'Data preprocessing, feature normalization, clean input pipelining', realWorldProject: 'Medical diagnostic feature pipeline' },
      { num: 3, name: 'AI Applications & Classifiers', whatYouLearn: 'Supervised classification, decision boundaries, ROC-AUC curves', realWorldProject: 'Customer churn prediction engine' },
      { num: 4, name: 'AI and Career Readiness', whatYouLearn: 'Data analytics workflows, portfolio engineering, Git/GitHub practices', realWorldProject: 'Kaggle submission automation script' },
      { num: 5, name: 'AI Tools & Scientific Ecosystem', whatYouLearn: 'NumPy, Pandas, PyTorch tensors, Jupyter notebooks', realWorldProject: 'Financial market historical pattern analyzer' },
      { num: 6, name: 'Responsible AI & Data Privacy', whatYouLearn: 'Bias detection, dataset auditing, GDPR/DPDP privacy guidelines', realWorldProject: 'Fairness audit report for loan approvals' }
    ],
    activity: {
      title: 'Activity 1: The Tensor & Gradient Forward Pass',
      scenario: 'You are an incoming AI engineer tasked with initializing a 2-layer neural network matrix calculation and measuring output loss.',
      instructions: [
        '1. Open the Chapter 1 Interactive Terminal.',
        '2. Inspect the Architecture blueprint showing Matrix Multiplication (X · W + b).',
        '3. Run the live PyTorch script to observe how weight initialization changes the output loss.',
        '4. Answer the Olympiad question on how zero-weight initialization affects backpropagation.'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 250
    }
  },
  {
    key: 'ug2',
    shortCode: 'UG-2',
    title: 'Scalable ML, Deep Learning & Vision',
    subtitle: 'Undergraduate Year 2: Neural Networks, Convolutions & Computer Vision',
    analogy: '👁️ Think of this as giving your computer eyes and a visual cortex that recognizes faces, tumor scans, and road signs.',
    whatIsIt: 'Here you move beyond simple tabular models to Deep Neural Networks. You build multi-layer perceptrons, discover how Backpropagation and Gradient Descent update millions of synaptic weights, and build Convolutional Neural Networks (CNNs) that see and interpret the physical world.',
    visualSteps: [
      {
        step: 1,
        title: 'The Artificial Neuron & Backprop',
        description: 'Understand forward propagation, activation functions (ReLU, GELU), and compute gradients with chain rule.',
        tools: ['PyTorch Autograd', 'Loss Functions'],
        metric: 'Loss Convergence < 0.05'
      },
      {
        step: 2,
        title: 'Convolutional Kernels & Spatial Pooling',
        description: 'Slide 3x3 filter kernels across images to detect edges, textures, contours, and complex objects.',
        tools: ['PyTorch nn.Conv2d', 'Torchvision'],
        metric: 'Top-1 Accuracy > 92%'
      },
      {
        step: 3,
        title: 'Transfer Learning & Residual Networks',
        description: 'Harness pretrained vision backbones (ResNet-50, EfficientNet) using skip connections to bypass vanishing gradients.',
        tools: ['Timm', 'ResNet Architecture'],
        metric: 'Inference Latency < 15ms'
      },
      {
        step: 4,
        title: 'Object Detection & Segmentation',
        description: 'Predict bounding boxes (YOLO) and segment masks (U-Net) in real-time camera streams.',
        tools: ['YOLOv8', 'Albumentations'],
        metric: 'mAP@50 > 0.88'
      }
    ],
    chapters: [
      { num: 1, name: 'Deep Learning Foundations', whatYouLearn: 'Multi-Layer Perceptrons, Cross-Entropy Loss, AdamW Optimizer, Dropout', realWorldProject: 'Handwritten digit & character classifier from scratch' },
      { num: 2, name: 'Convolutional Architectures', whatYouLearn: 'Kernels, Strides, Padding, Max-Pooling, Feature Map Extraction', realWorldProject: 'Industrial defect detector on factory camera feeds' },
      { num: 3, name: 'Computer Vision Systems', whatYouLearn: 'Transfer learning, fine-tuning pretrained ResNets, Data Augmentation', realWorldProject: 'Plant disease diagnosis scanner' },
      { num: 4, name: 'Sequence Models & Recurrence', whatYouLearn: 'RNNs, LSTMs, GRUs, vanishing gradient mitigation in time-series', realWorldProject: 'Stock price volatility forecasting network' },
      { num: 5, name: 'Deep Learning Engineering', whatYouLearn: 'GPU Acceleration, CUDA streams, mixed precision FP16 training', realWorldProject: 'High-throughput batch training pipeline' },
      { num: 6, name: 'Computer Vision Ethics & Deepfakes', whatYouLearn: 'Adversarial attacks, perturbation noise, facial recognition ethics', realWorldProject: 'Adversarial patch defense validator' }
    ],
    activity: {
      title: 'Activity 2: Tuning Residual Skip Connections & CNN Kernels',
      scenario: 'A self-driving camera feed is dropping classification accuracy due to vanishing gradients in a deep network.',
      instructions: [
        '1. Launch Chapter 1: Deep Learning Foundations in the Terminal.',
        '2. Inspect the Architecture node for Residual Skip Connection (y = F(x) + x).',
        '3. In the Code Lab, modify the learning rate scheduler and observe the loss curve.',
        '4. Complete the technical mission to keep gradient norm stable across 50 layers.'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 300
    }
  },
  {
    key: 'ug3',
    shortCode: 'UG-3',
    title: 'Large Language Models & Generative AI Systems',
    subtitle: 'Undergraduate Year 3: The Transformer Revolution, RAG & LLM Engineering',
    analogy: '🧠 Think of this as giving your computer fluent language, reasoning skills, and an encyclopedic external memory library.',
    whatIsIt: 'This covers the modern Generative AI revolution. You master the Transformer architecture (Self-Attention mechanism), understand how models like LLaMA and GPT read and predict tokens, build Retrieval-Augmented Generation (RAG) with vector databases, and fine-tune models with LoRA.',
    visualSteps: [
      {
        step: 1,
        title: 'Self-Attention & Positional Encoding',
        description: 'Understand Query, Key, Value (Q, K, V) matrix products and RoPE embeddings that allow words to look at each other.',
        tools: ['PyTorch Attention', 'FlashAttention'],
        metric: 'Context Window 8k - 32k'
      },
      {
        step: 2,
        title: 'Tokenization & Causal Language Modeling',
        description: 'Deconstruct Byte-Pair Encoding (BPE), next-token probability distributions, and temperature sampling.',
        tools: ['Hugging Face Tokenizers', 'Tiktoken'],
        metric: 'Perplexity < 8.2'
      },
      {
        step: 3,
        title: 'Retrieval-Augmented Generation (RAG)',
        description: 'Chunk enterprise documents, index into Vector Databases with embeddings, and synthesize accurate grounded answers.',
        tools: ['ChromaDB', 'LangChain', 'LlamaIndex'],
        metric: 'Zero Hallucination Score'
      },
      {
        step: 4,
        title: 'Parameter-Efficient Fine-Tuning (LoRA)',
        description: 'Freeze 99% of LLM weights and train small Low-Rank adaptation matrices on custom company data.',
        tools: ['PEFT', 'BitsAndBytes (QLoRA)'],
        metric: 'Train on 1 GPU (< 16GB VRAM)'
      }
    ],
    chapters: [
      { num: 1, name: 'The Transformer Architecture', whatYouLearn: 'Multi-Head Attention, Scaled Dot-Product, Feed-Forward sublayers, LayerNorm', realWorldProject: 'Transformer decoder built step-by-step in PyTorch' },
      { num: 2, name: 'Prompt Engineering & Prompt Chaining', whatYouLearn: 'Few-shot prompting, Chain-of-Thought (CoT), Tree-of-Thoughts, JSON schemas', realWorldProject: 'Automated legal contract clause extractor' },
      { num: 3, name: 'Retrieval-Augmented Generation (RAG)', whatYouLearn: 'Semantic search, dense embeddings, vector indexing, reranking models', realWorldProject: 'Full-stack enterprise internal documentation assistant' },
      { num: 4, name: 'LLM Fine-Tuning & Quantization', whatYouLearn: 'LoRA, QLoRA 4-bit quantization, instruction datasets, Alpaca format', realWorldProject: 'Medical coding specialty LLM fine-tune' },
      { num: 5, name: 'GenAI Tooling & Evaluation', whatYouLearn: 'RAGAS benchmark, BERTScore, G-Eval, LangSmith tracing', realWorldProject: 'LLM evaluation test harness' },
      { num: 6, name: 'Hallucination Mitigation & Safety', whatYouLearn: 'Self-consistency, NeMo Guardrails, prompt injection sanitization', realWorldProject: 'Security firewall against prompt injection attacks' }
    ],
    activity: {
      title: 'Activity 3: Self-Attention Calculation & Vector Retrieval',
      scenario: 'Build a semantic retrieval pipeline that grounds an LLM so it never hallucinates pricing terms.',
      instructions: [
        '1. Launch UG-3 Chapter 1: The Transformer Architecture.',
        '2. Step into the Architecture Blueprint to visualize Query-Key similarity matching.',
        '3. In the Code Lab, test how cosine similarity finds the exact matching document chunk.',
        '4. Solve the Olympiad defense question on Attention complexity O(N²).'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 350
    }
  },
  {
    key: 'ug4',
    shortCode: 'UG-4',
    title: 'Production MLOps, Distributed Systems & Agents',
    subtitle: 'Undergraduate Final Year: Shipping AI to Millions of Users Reliably',
    analogy: '🏭 Think of this as turning a prototype racing car into a mass-production factory with automated robotics, telemetry, and self-driving fleets.',
    whatIsIt: 'Writing an AI model in a Jupyter notebook is only 10% of the job. In UG-4, you learn how tech giants deploy models to serve millions of users with sub-50ms latency: containerization with Docker, Kubernetes orchestration, Ray distributed clusters, and multi-agent systems with LangGraph.',
    visualSteps: [
      {
        step: 1,
        title: 'Microservices & High-Speed Serving',
        description: 'Wrap models in FastAPI and vLLM inference engines with continuous batching and PagedAttention.',
        tools: ['FastAPI', 'vLLM', 'Triton Server'],
        metric: 'Time-To-First-Token < 40ms'
      },
      {
        step: 2,
        title: 'Containerization & CI/CD Pipelines',
        description: 'Package dependencies with Docker, test model regressions automatically in GitHub Actions, and deploy to Kubernetes.',
        tools: ['Docker', 'Kubernetes', 'KServe'],
        metric: '99.99% Service Uptime'
      },
      {
        step: 3,
        title: 'Autonomous Multi-Agent Orchestration',
        description: 'Design autonomous agents with tool use, state machines, reflection loops, and human-in-the-loop approvals.',
        tools: ['LangGraph', 'CrewAI', 'OpenAI Swarm'],
        metric: 'Multi-Step Mission Success > 90%'
      },
      {
        step: 4,
        title: 'Observability & Drift Detection',
        description: 'Monitor real-time latency, token usage, semantic drift, and automated model rollback triggers.',
        tools: ['Prometheus', 'EvidentlyAI', 'Grafana'],
        metric: 'Automated Alert on KS-Drift > 0.05'
      }
    ],
    chapters: [
      { num: 1, name: 'Production ML Serving & vLLM', whatYouLearn: 'PagedAttention, KV-cache management, speculative decoding, dynamic batching', realWorldProject: 'High-throughput LLM gateway serving 500 requests/sec' },
      { num: 2, name: 'CI/CD & Model Packaging', whatYouLearn: 'Docker multi-stage builds, model artifact registries (MLflow, WandB)', realWorldProject: 'Automated GitHub Actions CI/CD model release pipeline' },
      { num: 3, name: 'Autonomous Agentic Systems', whatYouLearn: 'ReAct pattern, LangGraph cyclic state graphs, Tool/API routing', realWorldProject: 'Autonomous bug-fixing and code review agent' },
      { num: 4, name: 'Distributed AI & Cluster Scaling', whatYouLearn: 'Ray Core, Ray Train, data parallelism (DDP), pipeline parallelism', realWorldProject: 'Distributed dataset pre-processing cluster on Ray' },
      { num: 5, name: 'MLOps Toolchains & Data Drift', whatYouLearn: 'Feature stores (Feast), data drift monitors, canary deployments', realWorldProject: 'Production drift detector that triggers automated retraining' },
      { num: 6, name: 'Enterprise Security & Compliance', whatYouLearn: 'Model watermarking, SOC2 AI compliance, API rate limits, audit logs', realWorldProject: 'Zero-trust enterprise AI gateway' }
    ],
    activity: {
      title: 'Activity 4: Deploying a Multi-Agent Swarm with Tool Calling',
      scenario: 'Your team needs an autonomous agent that can query a SQL database, generate a chart, and send an email alert without human intervention.',
      instructions: [
        '1. Jump into UG-4 Chapter 1 in the Mission Terminal.',
        '2. Examine the Production Serving architecture blueprint.',
        '3. In the Code Lab, test the continuous batching and KV-cache simulator.',
        '4. Complete the technical mission to keep latency under 15ms under high traffic.'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 400
    }
  },
  {
    key: 'pg1',
    shortCode: 'PG-1',
    title: 'Advanced Research Architectures & Multi-Modal Foundation Models',
    subtitle: 'Postgraduate 1st Year: Pushing the Scientific Frontier of Deep Learning',
    analogy: '🔬 Think of this as working inside CERN or DeepMind: inventing new mathematical architectures that combine sight, sound, language, and physical simulation.',
    whatIsIt: 'At the postgraduate level, you are no longer just using existing AI — you are inventing new architectures. You study Latent Diffusion Models (how Midjourney and Sora work), Vision-Language Alignment (CLIP and SigLIP), Mixture of Experts (MoE), and empirical Neural Scaling Laws.',
    visualSteps: [
      {
        step: 1,
        title: 'Score-Based & Diffusion Generative Models',
        description: 'Formulate forward noise addition (SDEs) and reverse score-matching denoising to generate images and video.',
        tools: ['Latent Diffusion', 'U-Net', 'DiT (Diffusion Transformer)'],
        metric: 'Fréchet Inception Distance (FID) < 4.5'
      },
      {
        step: 2,
        title: 'Contrastive Multimodal Alignment',
        description: 'Train dual encoders using InfoNCE contrastive loss to map images and text into a shared hyper-dimensional vector space.',
        tools: ['CLIP', 'SigLIP', 'Cross-Attention'],
        metric: 'Zero-Shot Classification > 85%'
      },
      {
        step: 3,
        title: 'Sparse Mixture of Experts (MoE)',
        description: 'Route tokens dynamically to top-2 specialized expert networks, scaling capacity to hundreds of billions of parameters.',
        tools: ['Top-k Softmax Router', 'Megatron-LM'],
        metric: '10x Parameter Scale at 1/5 Compute'
      },
      {
        step: 4,
        title: 'Empirical Scaling Laws & Compute Frontiers',
        description: 'Calculate Chinchilla optimal token-to-parameter ratios and design training budgets across thousands of GPUs.',
        tools: ['Chinchilla Scaling Laws', 'FLOP Counters'],
        metric: 'Optimal 20 Tokens per Parameter'
      }
    ],
    chapters: [
      { num: 1, name: 'Diffusion Models & Generative Math', whatYouLearn: 'Stochastic Differential Equations (SDEs), Classifier-Free Guidance (CFG), DiT', realWorldProject: 'Medical imaging MRI synthesis using latent diffusion' },
      { num: 2, name: 'Multimodal Vision-Language Models', whatYouLearn: 'CLIP, LLaVA, Cross-Attention projection, unified token spaces', realWorldProject: 'Autonomous radiology report generator from CT scans' },
      { num: 3, name: 'Mixture of Experts & Sparse Architectures', whatYouLearn: 'Gating networks, load balancing loss, auxiliary loss, router collapse', realWorldProject: '8-Expert sparse routing layer built in PyTorch' },
      { num: 4, name: 'Advanced Research Methodologies', whatYouLearn: 'Ablation study design, arXiv peer review standards, statistical rigor', realWorldProject: 'Reproducible scientific benchmark paper implementation' },
      { num: 5, name: 'Frontier Compute & 3D Parallelism', whatYouLearn: 'Tensor Parallelism (TP), Pipeline Parallelism (PP), ZeRO-3 (DeepSpeed)', realWorldProject: 'Multi-GPU sharding cluster configuration' },
      { num: 6, name: 'Explainable AI & Concept Probing', whatYouLearn: 'Integrated Gradients, TCAV (Testing with Concept Activation Vectors)', realWorldProject: 'Neuroscience-inspired model interpretability dashboard' }
    ],
    activity: {
      title: 'Activity 5: Training a Sparse Mixture-of-Experts Router',
      scenario: 'You are researching a sparse foundation model. You must design a top-2 gating router that distributes tokens evenly across 8 expert neural networks.',
      instructions: [
        '1. Launch PG-1 Chapter 1 in the Interactive Terminal.',
        '2. Examine the mathematical blueprint of the stochastic score matching function.',
        '3. Test the live research code sandbox implementing cross-attention projections.',
        '4. Answer the Olympiad question on Classifier-Free Guidance math.'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 450
    }
  },
  {
    key: 'pg2',
    shortCode: 'PG-2',
    title: 'Frontier AI, Safety, Alignment & Global Governance',
    subtitle: 'Postgraduate Final Year: The Science of Keeping Superintelligent Systems Safe',
    analogy: '🏛️ Think of this as being the Chief AI Scientist advising global heads of state and architects of national AI defense: making sure superintelligence remains beneficial, constitutional, and secure.',
    whatIsIt: 'The capstone of AI mastery. You tackle the alignment problem: Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), Constitutional AI, Mechanistic Interpretability (reading the brain of an LLM), and global regulatory frameworks like the EU AI Act and ISO 42001.',
    visualSteps: [
      {
        step: 1,
        title: 'Preference Alignment (RLHF & DPO)',
        description: 'Align raw base foundation models with human preferences using reward models and direct implicit log-ratio optimization.',
        tools: ['DPO (Direct Preference Opt)', 'TRL', 'PPO'],
        metric: 'Win Rate > 75% vs Base Model'
      },
      {
        step: 2,
        title: 'Mechanistic Interpretability & Circuit Analysis',
        description: 'Peer inside the black box: use Sparse Autoencoders (SAEs) to discover monosemantic neurons (e.g. deception features).',
        tools: ['TransformerLens', 'Sparse Autoencoders (SAE)'],
        metric: 'Zero Stealth Deception'
      },
      {
        step: 3,
        title: 'Adversarial Red-Teaming & Jailbreak Defense',
        description: 'Simulate automated adversarial attacks (GCG gradient attacks, many-shot jailbreaks) and build robust defenses.',
        tools: ['GCG Attacks', 'Representation Engineering'],
        metric: 'Attack Surface Reduction > 99%'
      },
      {
        step: 4,
        title: 'Global AI Governance & Sovereign Audits',
        description: 'Audit frontier AI clusters under the EU AI Act, US Executive Orders, and ISO/IEC 42001 standards.',
        tools: ['ISO 42001 Framework', 'NIST AI RMF'],
        metric: 'Full Regulatory Certification'
      }
    ],
    chapters: [
      { num: 1, name: 'RLHF, DPO & Constitutional AI', whatYouLearn: 'Reward modeling, Bradley-Terry preference model, KL-divergence penalty, DPO', realWorldProject: 'Complete DPO alignment pipeline on open-source weights' },
      { num: 2, name: 'Mechanistic Interpretability', whatYouLearn: 'Induction heads, superposition hypothesis, Sparse Autoencoders (SAE)', realWorldProject: 'Feature dictionary extractor pinpointing safety concepts' },
      { num: 3, name: 'Red-Teaming & Frontier Safety', whatYouLearn: 'Automated red teaming, toxic prompt synthesis, refusal vectors', realWorldProject: 'Automated red-teaming bot evaluating frontier models' },
      { num: 4, name: 'AI Leadership & National AI Strategy', whatYouLearn: 'Compute cluster economics, national sovereign AI, data center planning', realWorldProject: 'National AI infrastructure roadmap proposal' },
      { num: 5, name: 'Global Governance & Regulatory Auditing', whatYouLearn: 'EU AI Act high-risk classification, ISO 42001, frontier model licensing', realWorldProject: 'Enterprise compliance audit playbook' },
      { num: 6, name: 'The Frontier of Autonomous Systems & Singularity', whatYouLearn: 'Recursive self-improvement, instrumental convergence, long-term safety', realWorldProject: 'Fail-safe sandbox containment protocol for autonomous agents' }
    ],
    activity: {
      title: 'Activity 6: Direct Preference Optimization (DPO) Alignment',
      scenario: 'A frontier model has begun exhibiting sycophantic behavior. You must apply DPO loss with a reference model to steer its responses back to truthfulness.',
      instructions: [
        '1. Launch PG-2 Chapter 1 in the Interactive Terminal.',
        '2. Inspect the mathematical alignment blueprint showing the KL-divergence constraint.',
        '3. In the Code Lab, inspect the DPO loss function comparing chosen vs rejected responses.',
        '4. Complete the Olympiad defense on avoiding reward hacking.'
      ],
      targetChapter: 1,
      targetLesson: 1,
      xpReward: 500
    }
  }
]

export const HigherEdVisualGuide: React.FC<HigherEdVisualGuideProps> = ({
  onSelectLevelAndLesson,
  currentLevelKey = 'ug1'
}) => {
  const [selectedLevel, setSelectedLevel] = useState<HigherEdLevelKey>(currentLevelKey)
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'activity' | 'kindergarten'>('overview')

  const guide = SYLLABUS_GUIDES.find(g => g.key === selectedLevel) || SYLLABUS_GUIDES[0]

  const handleLaunchActivity = (chapter: number, lesson: 1 | 2) => {
    gameAudio.playSuccess()
    onSelectLevelAndLesson(selectedLevel, chapter, lesson)
  }

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      {/* ─── HERO HEADER: THE COMPLETE MENTAL MODEL ────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            <Compass size={14} />
            <span>THE COMPLETE HIGHER EDUCATION AI ROADMAP</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            How to Master AI from Undergraduate to Frontier Postgraduate
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Don't feel overwhelmed. Artificial Intelligence is not a single giant mountain — it is a structured journey with <strong>6 clear visual levels</strong>. Each level builds directly on top of the previous one. Follow the visual steps below, understand the simple analogies, and jump straight into practical activities!
          </p>

          {/* Quick Summary Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {SYLLABUS_GUIDES.map(item => {
              const isSelected = item.key === selectedLevel
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    gameAudio.playTap()
                    setSelectedLevel(item.key)
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{item.shortCode}</div>
                  <div className="text-xs font-bold truncate">{item.title.split('&')[0]}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── ACTIVE LEVEL SPOTLIGHT CARD ─────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-xl">
        {/* Tier Header with Badge & Analogy */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                {guide.shortCode}
              </span>
              <span className="text-xs text-slate-400">{guide.subtitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              {guide.title}
            </h2>
          </div>

          <button
            onClick={() => handleLaunchActivity(guide.activity.targetChapter, guide.activity.targetLesson)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <Play size={16} />
            <span>Launch Activity ({guide.activity.xpReward} XP)</span>
          </button>
        </div>

        {/* The Analogy & Plain English Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              <Lightbulb size={16} />
              <span>Intuitive Analogy (What is this?)</span>
            </div>
            <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
              {guide.analogy}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
              <HelpCircle size={16} />
              <span>In Plain English</span>
            </div>
            <p className="text-sm text-cyan-200/90 leading-relaxed">
              {guide.whatIsIt}
            </p>
          </div>
        </div>

        {/* Sub-Tabs: Visual Steps vs Canonical Chapters vs Hands-on Activity */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Visual 4-Step Journey
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'chapters'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            All 6 Canonical Chapters
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Hands-On Activity Challenge
          </button>
          <button
            onClick={() => setActiveTab('kindergarten')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'kindergarten'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🧸 Kindergarten Storybook (ELI5)
          </button>
        </div>

        {/* TAB 1: VISUAL 4 STEPS */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Step-by-step visual progression for {guide.shortCode}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guide.visualSteps.map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 relative group hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      0{stepItem.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {stepItem.metric}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stepItem.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stepItem.tools.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ALL 6 CANONICAL CHAPTERS */}
        {activeTab === 'chapters' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              The 6 Official Curriculum Chapters in {guide.shortCode}:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guide.chapters.map((ch) => (
                <div
                  key={ch.num}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        Chapter 0{ch.num}
                      </span>
                      <h4 className="text-sm font-bold text-slate-200">{ch.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">
                      <strong>Focus:</strong> {ch.whatYouLearn}
                    </p>
                    <div className="text-xs text-emerald-400 font-mono flex items-center gap-1 pt-1">
                      <span>🛠️ Real Project:</span>
                      <span className="text-slate-300 font-sans">{ch.realWorldProject}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchActivity(ch.num, 1)}
                    className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1"
                    title={`Open Chapter ${ch.num} Terminal`}
                  >
                    <span>Go</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HANDS-ON ACTIVITY CHALLENGE */}
        {activeTab === 'activity' && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">{guide.activity.title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                +{guide.activity.xpReward} XP Reward
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
              <strong>Scenario:</strong> {guide.activity.scenario}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                Step-by-step instructions to complete this activity:
              </span>
              <div className="space-y-2">
                {guide.activity.instructions.map((ins, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleLaunchActivity(guide.activity.targetChapter, guide.activity.targetLesson)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <Rocket size={18} />
                <span>Begin Activity in Interactive Terminal Now</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: KINDERGARTEN STORYBOOK (ELI5) */}
        {activeTab === 'kindergarten' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🧸 Child-Friendly Stories for Scary Technical Words in {guide.shortCode}:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KindergartenExplainerService.getForLevel(guide.key as any).map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <h4 className="text-sm font-bold text-amber-200">{item.kindergartenTitle}</h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.technicalTerm}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-100/90 leading-relaxed font-medium">
                    <strong>Simple Story:</strong> {item.simpleStory}
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed">
                    <strong>Toy Analogy:</strong> {item.toyAnalogy}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed">
                    <strong>Playground Game:</strong> {item.howItWorksInPlayground}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── MASTER PROGRESSION CHEAT-SHEET ───────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
          <Layers size={16} />
          <span>The Academic Progression Hierarchy</span>
        </div>
        <p className="text-xs text-slate-400">
          How every stage connects into a complete computer science and artificial intelligence mastery track:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Phase 1: Foundations (UG 1 & 2)</span>
            <h4 className="text-sm font-bold text-slate-200">The Machine Learning Mechanic</h4>
            <p className="text-xs text-slate-400">
              Mastering matrix math, Python, gradients, feature engineering, and training your first Convolutional & Recurrent neural networks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Phase 2: Modern Systems (UG 3 & 4)</span>
            <h4 className="text-sm font-bold text-slate-200">The AI Systems Architect</h4>
            <p className="text-xs text-slate-400">
              Mastering Transformers, RAG vector search, fine-tuning LLMs with LoRA, shipping models with Docker/vLLM, and autonomous LangGraph agents.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Phase 3: Frontier Science (PG 1 & 2)</span>
            <h4 className="text-sm font-bold text-slate-200">The Research Director & Governor</h4>
            <p className="text-xs text-slate-400">
              Inventing Latent Diffusion, Sparse Mixture of Experts, multimodal alignment, RLHF/DPO preference optimization, and global safety auditing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
