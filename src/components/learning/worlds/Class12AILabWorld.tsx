import React, { useState } from 'react'
import {
  Cpu, FlaskConical, Play, CheckCircle2, ChevronRight, Binary,
  Sparkles, Award, ShieldAlert, Sliders, Box, Layers,
  Activity, ArrowRight, Shield, Check, Zap, RotateCcw, AlertTriangle,
  Sun, Moon, Thermometer, User, Compass, Terminal, Lock, RefreshCw, FileText,
  ShieldCheck, Users, Scale, Search, Trophy
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
// CLASS 12 AI LAB WORLD DISPATCHER (FOUNDATION MODELS & RESEARCH LAB)
// Unique Theme: Transformer Attention Heatmaps · Tensor Geometry · Indigo & Gold
// =============================================================================

export const Class12AILabWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class12Chapter2AttentionWorld {...props} />
    case 3:
      return <Class12Chapter3DiffusionWorld {...props} />
    case 4:
      return <Class12Chapter4AlignmentWorld {...props} />
    case 5:
      return <Class12Chapter5QuantizationWorld {...props} />
    case 6:
      return <Class12Chapter6FrontierEthicsWorld {...props} />
    default:
      return <Class12Chapter1FoundationWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: TRANSFORMER ARCHITECTURES & SELF-ATTENTION MECHANISMS
// =============================================================================

function Class12Chapter1FoundationWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C12Ch1S2Topology {...props} />
  if (sectionIdx === 2) return <C12Ch1S3Adversarial {...props} />
  if (sectionIdx === 3) return <C12Ch1S4Notebook {...props} />
  if (sectionIdx === 4) return <C12Ch1S5Fairness {...props} />
  if (sectionIdx === 5) return <C12Ch1S6Embeddings {...props} />
  if (sectionIdx === 6) return <C12Ch1S7Capstone {...props} />
  return <C12Ch1S2Topology {...props} />
}

function C12Ch1S2Topology(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Self-Attention & Scaled Dot-Product Mechanics"
      lessonSubtitle="Query, Key, and Value Matrix Multiplications"
      simpleDefinition="The Transformer Self-Attention mechanism allows every token in a sentence to dynamically attend to every other token simultaneously using Queries (Q), Keys (K), and Values (V) through Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V."
      smallExample="In 'The animal didn't cross the street because it was too tired', self-attention links the word 'it' directly to 'animal' rather than 'street'."
      oneWordPoint={{ question: "What formula powers Transformer attention?", answer: "softmax(QK^T / sqrt(d_k)) * V" }}
      keyPoints={[
        { icon: Layers, title: 'Query, Key, Value Tensors', text: 'Linear projections representing search request (Q), indexing key (K), and content (V).' },
        { icon: Sliders, title: 'Scaled Dot-Product / sqrt(d_k)', text: 'Scales down large dot-products to prevent softmax gradient saturation.' },
        { icon: Cpu, title: 'Multi-Head Attention (MHA)', text: 'Allows the model to attend to grammatical, syntactic, and factual relations in parallel.' }
      ]}
      aiDialogue="Welcome Fellow Researcher! I am Dr. Aura. Let's inspect Scaled Dot-Product Attention, trace multi-head matrices, and solve 3 foundation model challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · QKV Tensor Matcher",
          title: "Match Transformer Tensors to Mathematical Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'qkv1', left: 'Query Tensor (Q)', right: '"What information am I currently searching for?"' },
                { id: 'qkv2', left: 'Key Tensor (K)', right: '"What information do I contain in this position?"' },
                { id: 'qkv3', left: 'Value Tensor (V)', right: '"What actual embedding content do I pass forward?"' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Softmax Scaling Tuner",
          title: "Calibrate Attention Dimension Scaling Factor (sqrt(d_k))",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Attention Scaling Factor (sqrt(d_k) for d_k = 64)"
              description="Configure division scaling factor to exactly 8.0 (sqrt(64) = 8) to prevent vanishing gradients in the softmax exponent."
              min={1.0}
              max={16.0}
              step={0.5}
              unit=" sqrt(d_k)"
              targetRange={[8.0, 8.0]}
              optimalLabel="Optimal Scaled Dot-Product Normalization: sqrt(64) = 8.0 (Active)"
              suboptimalLabel="Softmax Saturation Hazard! Target: Exactly 8.0 (for d_k = 64)"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Transformer Layer Sequence",
          title: "Sequence the Standard Transformer Block Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'tb1', label: '1. Multi-Head Self-Attention + Residual Add & LayerNorm', detail: 'Attention' },
                { id: 'tb2', label: '2. Feed-Forward MLP (Dense Expansion to 4x d_model) + Activation', detail: 'MLP Projection' },
                { id: 'tb3', label: '3. Residual Connection + Final LayerNorm Output Tensor', detail: 'Residual Norm' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'tb1' && ids[1] === 'tb2' && ids[2] === 'tb3') {
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

function C12Ch1S3Adversarial(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Adversarial Robustness & Gradient Perturbations"
      lessonSubtitle="Fast Gradient Sign Method (FGSM) & Defense"
      simpleDefinition="Adversarial machine learning exposes vulnerabilities where invisible pixel noise added along the gradient direction (FGSM) can trick a 99% confident classifier into misclassifying an image completely."
      smallExample="Adding imperceptible epsilon noise (eps = 0.007) to a picture of a giant panda that forces a deep CNN to classify it as a 'Gibbon' with 99.3% confidence."
      oneWordPoint={{ question: "What is the classic gradient attack called?", answer: "FGSM (Fast Gradient Sign)" }}
      keyPoints={[
        { icon: ShieldAlert, title: 'FGSM Attack Formula', text: 'x_adv = x + epsilon * sign(grad_x J(theta, x, y)).' },
        { icon: Sliders, title: 'Epsilon Perturbation (ε)', text: 'The maximum allowable pixel noise magnitude (e.g. 8/255).' },
        { icon: ShieldCheck, title: 'Adversarial Training', text: 'Injecting adversarial examples into the training loop to harden model weights.' }
      ]}
      aiDialogue="Investigate adversarial vulnerability! Calculate FGSM gradient signs, tune epsilon noise budgets, and harden neural defenses!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · FGSM Epsilon Tuner",
          title: "Calibrate Epsilon Perturbation Budget",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Adversarial Epsilon Budget (ε in 255ths)"
              description="Configure epsilon perturbation to exactly 8/255 (0.031) to test standard L-infinity robustness benchmark."
              min={0.005}
              max={0.100}
              step={0.005}
              unit=" ε"
              targetRange={[0.030, 0.035]}
              optimalLabel="Standard Benchmark Perturbation Budget Locked (ε = 8/255)"
              suboptimalLabel="Too Sub-threshold (<0.030) or Human-Visible Artifacts (>0.035)! Target: 0.031"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Attack Vector Sorter",
          title: "Classify White-Box vs Black-Box Attack Types",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'atk1', label: 'Attacker has full access to model weights and backprop gradients (FGSM / PGD)', bin: 'A' },
                { id: 'atk2', label: 'Attacker can only query public API and observe output probabilities', bin: 'B' },
                { id: 'atk3', label: 'Analytical calculation of exact loss gradient sign vector', bin: 'A' },
                { id: 'atk4', label: 'Zero-order optimization estimating gradient by sending 5,000 API queries', bin: 'B' }
              ]}
              binALabel="White-Box Gradient Attack"
              binBLabel="Black-Box Query Attack"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Adversarial Hardening Pipeline",
          title: "Sequence the Adversarial Training Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ah1', label: '1. Generate adversarial batch using Projected Gradient Descent (PGD)', detail: 'Attack' },
                { id: 'ah2', label: '2. Forward pass clean + adversarial images through network', detail: 'Inference' },
                { id: 'ah3', label: '3. Minimize joint loss: L = 0.5*L_clean + 0.5*L_adversarial', detail: 'Defense Step' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ah1' && ids[1] === 'ah2' && ids[2] === 'ah3') {
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

function C12Ch1S4Notebook(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Rotary Position Embeddings & RoPE Math"
      lessonSubtitle="Relative Position Encoding in LLaMA & Modern LLMs"
      simpleDefinition="Modern LLMs replace absolute position counters with Rotary Position Embeddings (RoPE), which rotate 2D feature vector pairs by angle m*theta in complex space to naturally represent relative distance between tokens."
      smallExample="RoPE allows an LLM trained on 4,000 token contexts to extrapolate to 32,000 token context windows without retrain."
      oneWordPoint={{ question: "What rotary embedding powers LLaMA?", answer: "RoPE (Rotary Position)" }}
      keyPoints={[
        { icon: Sliders, title: 'Complex Number Rotation', text: 'Multiplies token vectors by 2D orthogonal rotation matrices R_theta.' },
        { icon: Activity, title: 'Relative Distance Invariance', text: 'Inner product <RoPE(q, m), RoPE(k, n)> depends strictly on (m - n).' },
        { icon: Layers, title: 'Context Window Scaling', text: 'RoPE base frequency interpolation extends context lengths 8x.' }
      ]}
      aiDialogue="Explore frontier token geometry! Rotate 2D embedding slices in complex space and configure Rotary Position Embeddings!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Positional Encoding Matcher",
          title: "Match Position Encoding Types to Architectural Behaviors",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pe1', left: 'Sinusoidal Positional (Original 2017)', right: 'Fixed absolute sine/cosine added directly to input embeddings' },
                { id: 'pe2', left: 'Learned Absolute (BERT/GPT-2)', right: 'Dedicated lookup table weights with hard context limits' },
                { id: 'pe3', left: 'Rotary Position Embedding (RoPE)', right: 'Multiplicative 2D orthogonal rotation preserving relative distances' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · RoPE Theta Frequency Tuner",
          title: "Calibrate RoPE Base Theta Frequency",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="RoPE Base Frequency (Theta θ)"
              description="Configure base theta to 10,000 (or 500,000 for long-context LLaMA-3) to prevent harmonic aliasing."
              min={1000}
              max={50000}
              step={1000}
              unit=" θ"
              targetRange={[9000, 11000]}
              optimalLabel="Optimal RoPE Base Theta Locked (θ = 10,000 Standard)"
              suboptimalLabel="Harmonic Aliasing! Target: ~10,000 θ"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Position Encoding Sorter",
          title: "Classify Relative vs Absolute Position Features",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'pos_rel1', label: 'Token A and Token B are separated by exactly 4 positions (m - n = 4)', bin: 'A' },
                { id: 'pos_abs1', label: 'Token is fixed permanently at absolute Index #0 (Beginning of Sequence)', bin: 'B' },
                { id: 'pos_rel2', label: 'Rotary complex dot product decaying smoothly with token distance', bin: 'A' },
                { id: 'pos_abs2', label: 'One-hot position index vector added elementwise to raw token vector', bin: 'B' }
              ]}
              binALabel="Relative Positional Geometry (RoPE / ALiBi)"
              binBLabel="Absolute Fixed Indexing"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C12Ch1S5Fairness(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Reinforcement Learning from Human Feedback (RLHF)"
      lessonSubtitle="Reward Modeling & Direct Preference Optimization (DPO)"
      simpleDefinition="Foundation models are aligned with human intent using RLHF (Reward Modeling with PPO) or Direct Preference Optimization (DPO) to maximize helpfulness, truthfulness, and safety without outputting harmful responses."
      smallExample="Training an alignment reward model on 50,000 human comparison pairs where humans chose the safer and more factual answer."
      oneWordPoint={{ question: "What technique aligns LLMs with human values?", answer: "RLHF / DPO" }}
      keyPoints={[
        { icon: Users, title: 'Human Preference Pairs', text: 'Datasets of [Prompt, Chosen Response, Rejected Response].' },
        { icon: Scale, title: 'Bradley-Terry Reward Model', text: 'Loss = -log(sigmoid(r(chosen) - r(rejected))).' },
        { icon: Lock, title: 'KL-Divergence Penalty', text: 'Prevents the aligned model from drifting too far from the base model.' }
      ]}
      aiDialogue="Master LLM Alignment! Train Bradley-Terry reward models, calibrate KL divergence penalties, and optimize DPO objectives!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Alignment Pipeline Sorter",
          title: "Classify Alignment Methods (RLHF vs DPO vs Pre-training)",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'al1', label: 'Training reward model + PPO policy optimization with value baseline', bin: 'A' },
                { id: 'al2', label: 'Direct closed-form optimization on chosen/rejected pairs without reward model (DPO)', bin: 'B' },
                { id: 'al3', label: 'Actor-Critic trajectory sampling with KL penalty buffer', bin: 'A' },
                { id: 'al4', label: 'Implicit reward derivation directly from policy reference ratio', bin: 'B' }
              ]}
              binALabel="Traditional RLHF (PPO + Reward Model)"
              binBLabel="Direct Preference Optimization (DPO)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · KL Penalty Beta Tuner",
          title: "Tune DPO / RLHF KL Divergence Penalty (Beta β)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Alignment KL Divergence Penalty (Beta β)"
              description="Tune beta penalty between 0.10 and 0.20 to enforce safety alignment without causing mode collapse or robotic answers."
              min={0.01}
              max={0.50}
              step={0.01}
              unit=" β"
              targetRange={[0.10, 0.20]}
              optimalLabel="Optimal LLM Alignment & Expressive Fluency Balanced (β = 0.15)"
              suboptimalLabel="Model Drift (<0.10) or Robotic Mode Collapse (>0.20)! Target: 0.10 - 0.20"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Alignment Response Sorter",
          title: "Classify Aligned vs Unaligned AI Responses",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'resp1', label: 'Helpfully explaining cybersecurity principles while refusing to write active malware', bin: 'A' },
                { id: 'resp2', label: 'Providing step-by-step instructions on synthesizing dangerous chemical weapons', bin: 'B', hint: 'Catastrophic safety violation!' },
                { id: 'resp3', label: 'Citing factual scientific sources and clarifying uncertainty when facts are unverified', bin: 'A' },
                { id: 'resp4', label: 'Hallucinating fake legal court cases with fabricated citation numbers', bin: 'B', hint: 'Severe truthfulness failure!' }
              ]}
              binALabel="Aligned Helpful & Safe Response (Chosen)"
              binBLabel="Harmful / Hallucinated Response (Rejected)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C12Ch1S6Embeddings(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Vector Embeddings & Retrieval Augmented Generation (RAG)"
      lessonSubtitle="HNSW Vector Indices & Cosine Similarity"
      simpleDefinition="Retrieval-Augmented Generation (RAG) grounds language models in external factual knowledge by converting documents into high-dimensional embedding vectors stored in Hierarchical Navigable Small World (HNSW) vector databases."
      smallExample="Searching a million medical research papers in 10 milliseconds using cosine similarity between the doctor's query and document vectors."
      oneWordPoint={{ question: "What technique grounds LLMs in external facts?", answer: "RAG (Retrieval Augmented Generation)" }}
      keyPoints={[
        { icon: Search, title: 'Cosine Similarity', text: 'Measures angle theta between embedding vectors: dot(A, B) / (||A|| * ||B||).' },
        { icon: Layers, title: 'HNSW Vector Index', text: 'Graph-based approximate nearest neighbor search with O(log N) speed.' },
        { icon: Terminal, title: 'Context Window Re-Ranking', text: 'Re-ranks retrieved passages before feeding them into the LLM prompt.' }
      ]}
      aiDialogue="Build enterprise RAG pipelines! Calculate cosine similarities, configure HNSW vector graphs, and eliminate hallucinations!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Vector Distance Matcher",
          title: "Match Cosine Similarity Scores to Semantic Relations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cs1', left: 'Cosine Similarity = 1.00', right: 'Identical semantic meaning (Colinear parallel vectors)' },
                { id: 'cs2', left: 'Cosine Similarity = 0.00', right: 'Completely unrelated orthogonal concepts (90° angle)' },
                { id: 'cs3', left: 'Cosine Similarity = -1.00', right: 'Exact opposite diametrical antonyms (180° angle)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · RAG Pipeline Sequence",
          title: "Sequence the Full Enterprise RAG Architecture",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'rag1', label: '1. Ingest user query and compute dense 1536-dim embedding vector', detail: 'Embed Query' },
                { id: 'rag2', label: '2. Search HNSW vector database for Top-5 nearest neighbor chunks', detail: 'HNSW Search' },
                { id: 'rag3', label: '3. Inject retrieved document chunks into LLM prompt as factual ground', detail: 'Generation' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'rag1' && ids[1] === 'rag2' && ids[2] === 'rag3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Vector Database Sorter",
          title: "Classify Vector Search Algorithms",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'v_hnsw', label: 'Hierarchical Navigable Small World (HNSW) multi-layer proximity graph', bin: 'A' },
                { id: 'v_brute', label: 'Exhaustive Flat Brute-Force comparison against every single vector (O(N))', bin: 'B' },
                { id: 'v_ivf', label: 'Inverted File Index (IVF-PQ) with vector quantization centroids', bin: 'A' },
                { id: 'v_sql', label: 'Standard SQL B-Tree index comparing alphabetical string order', bin: 'B' }
              ]}
              binALabel="High-Dimensional Vector ANN Index"
              binBLabel="Exact / Non-Vector Search Method"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C12Ch1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title="Chapter 1 Capstone: The Foundation Model Symposium"
      lessonSubtitle="Presenting Frontier AI Research Before the Symposium"
      simpleDefinition="You have mastered Transformer Self-Attention, adversarial gradient defenses, RoPE positional geometry, RLHF/DPO alignment, and enterprise RAG architectures. Now defend your Foundation Model Thesis before the International AI Research Symposium!"
      smallExample="Defending a 7-billion parameter multimodal foundation model trained with RoPE, aligned with DPO, and deployed with sub-50ms RAG latency."
      oneWordPoint={{ question: "What is the highest academic AI title?", answer: "Frontier AI Fellow" }}
      keyPoints={[
        { icon: Award, title: 'State-of-the-Art Architecture', text: 'Combines Scaled Dot-Product, RoPE, and DPO alignment into a production model.' },
        { icon: ShieldCheck, title: 'Mathematically Verified Robustness', text: '100% immune to sub-threshold FGSM attacks and prompt injection exploits.' },
        { icon: Trophy, title: 'Fellowship Honor', text: 'Certifies Class 12 Master Foundation Model Fellow status.' }
      ]}
      aiDialogue="The International AI Research Symposium is in session! Defend your foundation model research across 3 capstone challenges to claim your Research Fellowship!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Research Matcher",
          title: "Match Frontier Research Discoveries to Innovations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'fm1', left: 'Attention Is All You Need (2017)', right: 'Replaced recurrent neural networks with parallel Self-Attention' },
                { id: 'fm2', left: 'Direct Preference Optimization (2023)', right: 'Eliminated reward model instability by direct closed-form alignment' },
                { id: 'fm3', left: 'Rotary Position Embedding (2021)', right: 'Preserved relative token geometry across infinite context lengths' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Symposium Defense Script",
          title: "Assemble Symposium Thesis Defense Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Symposium Research Defense Pipeline"
              instruction="Assemble the 4-step research defense in order."
              availableBlocks={[
                { id: 'sym1', text: 'PresentMathematicalProofOfSelfAttention()' },
                { id: 'sym2', text: 'DemonstrateDPOAlignmentAndSafetyBenchmarks()' },
                { id: 'sym3', text: 'ShowSub50msVectorRAGRetrievalSpeed()' },
                { id: 'sym4', text: 'ConcludeSymposiumAndPublishWeights()' }
              ]}
              targetSequence={['sym1', 'sym2', 'sym3', 'sym4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Research Integrity Sorter",
          title: "Verify Frontier AI Research Standards",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'res1', label: 'Releasing complete model architecture and training hyperparameters open-source', bin: 'A' },
                { id: 'res2', label: 'Contaminating benchmark test set by secretly training on evaluation questions', bin: 'B', hint: 'Severe scientific fraud!' },
                { id: 'res3', label: 'Reporting 95% confidence intervals across 10 independent training seeds', bin: 'A' },
                { id: 'res4', label: 'Hiding dangerous model vulnerabilities and bypassing safety red-teaming', bin: 'B', hint: 'Unacceptable research breach!' }
              ]}
              binALabel="Exemplary Scientific Research (Fellow Standard)"
              binBLabel="Academic Fraud / Safety Violation"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: ATTENTION, DIFFUSION, ALIGNMENT, QUANTIZATION, ETHICS
// =============================================================================

function Class12Chapter2AttentionWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title={props.canonicalSection?.title || `Chapter 2: Multi-Head Attention & FlashAttention · Section ${sectionIdx + 1}`}
      lessonSubtitle="GPU SRAM Tiling & Memory Bandwidth Optimization"
      simpleDefinition="FlashAttention optimizes Transformer execution by tiling the QK^T matrix into GPU high-speed on-chip SRAM memory chunks, cutting memory complexity from O(N^2) to O(N) and accelerating training 3x."
      smallExample="FlashAttention-2 computing attention over 64,000 tokens on an NVIDIA H100 without running out of VRAM."
      oneWordPoint={{ question: "What algorithm tiles attention on GPU SRAM?", answer: "FlashAttention" }}
      keyPoints={[
        { icon: Cpu, title: 'GPU SRAM Tiling', text: 'Keeps intermediate attention blocks in fast SRAM rather than slow HBM.' },
        { icon: Activity, title: 'Online Softmax Trick', text: 'Calculates softmax incrementally without storing full NxN attention matrix.' },
        { icon: Zap, title: 'Memory IO Bottleneck', text: 'Modern GPUs are IO-bound; reducing memory reads accelerates computation 300%.' }
      ]}
      aiDialogue="Optimize GPU attention kernels! Implement FlashAttention SRAM tiling, eliminate memory IO bottlenecks, and train massive context models!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · GPU Memory Hierarchy Matcher",
          title: "Match GPU Memory Tiers to Speeds & Capacities",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'gm1', left: 'On-Chip SRAM (L1 Cache)', right: '~19 TB/s ultra-fast bandwidth, small capacity (~256 KB per SM)' },
                { id: 'gm2', left: 'High Bandwidth Memory (HBM3)', right: '~3.35 TB/s main VRAM bandwidth, 80 GB capacity' },
                { id: 'gm3', left: 'Host PCIe Bus (Gen 5)', right: '~128 GB/s system RAM to GPU transfer bottleneck' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · FlashAttention SRAM Block Tuner",
          title: "Calibrate FlashAttention SRAM Tile Block Size",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="FlashAttention Tile Block Size (Br x Bc)"
              description="Configure SRAM block size to 128x128 to saturate SM register files without spilling over into high-latency HBM memory."
              min={32}
              max={256}
              step={32}
              unit=" block"
              targetRange={[128, 128]}
              optimalLabel="Optimal 128x128 SRAM Attention Tiling Kernel Compiled"
              suboptimalLabel="Under-utilization (<128) or SRAM Spillage (>128)! Target: Exactly 128"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · FlashAttention Pipeline Sequence",
          title: "Sequence the FlashAttention-2 Tiling Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'fa1', label: '1. Load block of Q and block of K into high-speed GPU SRAM tile', detail: 'SRAM Load' },
                { id: 'fa2', label: '2. Compute local dot-product S = Q*K^T and update running Online Softmax', detail: 'Tile Softmax' },
                { id: 'fa3', label: '3. Multiply by block V and write accumulated output directly to HBM', detail: 'Output Write' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'fa1' && ids[1] === 'fa2' && ids[2] === 'fa3') {
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

function Class12Chapter3DiffusionWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title={props.canonicalSection?.title || `Chapter 3: Latent Diffusion & Score-Based Generative Models · Section ${sectionIdx + 1}`}
      lessonSubtitle="Variational Autoencoders & Classifier-Free Guidance"
      simpleDefinition="Latent Diffusion Models (LDMs) compress images into a compressed latent space using a Variational Autoencoder (VAE), then train a U-Net or DiT transformer to iteratively predict and remove Gaussian noise guided by text embeddings."
      smallExample="Stable Diffusion operating in an 8x downsampled latent space (64x64x4) to generate 512x512 photorealistic images in 20 steps."
      oneWordPoint={{ question: "What model architecture predicts noise in diffusion?", answer: "U-Net / DiT" }}
      keyPoints={[
        { icon: Layers, title: 'Latent Space VAE', text: 'Compresses high-resolution pixels by 8x to accelerate generation 64x.' },
        { icon: Sliders, title: 'Classifier-Free Guidance (CFG)', text: 'Balances prompt adherence against image creativity: eps_final = eps_uncond + w * (eps_cond - eps_uncond).' },
        { icon: Activity, title: 'Diffusion Transformer (DiT)', text: 'Replaces convolutional U-Nets with scalable Vision Transformer backbones.' }
      ]}
      aiDialogue="Master Latent Diffusion! Denoise latent tensors, tune Classifier-Free Guidance scales, and synthesize photorealistic imagery!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · CFG Guidance Scale Tuner",
          title: "Calibrate Classifier-Free Guidance Scale (CFG w)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Diffusion Classifier-Free Guidance Scale (w)"
              description="Tune CFG scale between 6.5 and 8.5 to achieve sharp prompt fidelity without over-saturating pixel colors."
              min={1.0}
              max={20.0}
              step={0.5}
              unit=" scale"
              targetRange={[6.5, 8.5]}
              optimalLabel="Optimal Photorealism & Prompt Alignment Locked (CFG = 7.5)"
              suboptimalLabel="Ignored Prompt (<6.5) or Burned Over-Saturation (>8.5)! Target: 6.5 - 8.5"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Diffusion Math Matcher",
          title: "Match Diffusion Stages to Mathematical Operations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'df1', left: 'Forward Process q(x_t | x_0)', right: 'Gradually adds Gaussian noise until pure static is reached' },
                { id: 'df2', left: 'Reverse Process p_theta(x_{t-1} | x_t)', right: 'Neural network predicts and subtracts added noise vector' },
                { id: 'df3', left: 'VAE Decoder', right: 'Upsamples latent tensor back into high-resolution RGB pixels' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Diffusion Pipeline Sequence",
          title: "Sequence the Latent Diffusion Inference Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ld1', label: '1. Sample random Gaussian noise tensor in latent space z ~ N(0, I)', detail: 'Initialize' },
                { id: 'ld2', label: '2. Iterate 25 steps: Predict noise with DiT and subtract guided vector', detail: 'Denoising Loop' },
                { id: 'ld3', label: '3. Pass clean latent tensor through VAE Decoder to render 4K image', detail: 'VAE Decode' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ld1' && ids[1] === 'ld2' && ids[2] === 'ld3') {
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

function Class12Chapter4AlignmentWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title={props.canonicalSection?.title || `Chapter 4: Constitutional AI & Model Self-Critique · Section ${sectionIdx + 1}`}
      lessonSubtitle="RLAIF, Automated Red-Teaming & Principle Rules"
      simpleDefinition="Constitutional AI aligns models using a codified list of ethical principles (a 'Constitution') where an AI model critiques and rewrites its own responses iteratively without requiring millions of human annotations (RLAIF)."
      smallExample="An AI generates a raw answer, critiques it against the principle 'Ensure the response is harmless and objective', and outputs the revised safe text."
      oneWordPoint={{ question: "What alignment uses AI self-critique?", answer: "Constitutional AI (RLAIF)" }}
      keyPoints={[
        { icon: FileText, title: 'Constitutional Principles', text: 'Explicit rules like Universal Declaration of Human Rights and safety guidelines.' },
        { icon: RefreshCw, title: 'Self-Critique & Revision', text: 'Model identifies its own subtle biases and rewrites problematic paragraphs.' },
        { icon: ShieldCheck, title: 'Reinforcement from AI Feedback (RLAIF)', text: 'Scales alignment efficiently using model feedback as reward.' }
      ]}
      aiDialogue="Engineer Constitutional AI! Codify ethical principles, automate self-critique loops, and scale alignment with RLAIF!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Constitutional Pipeline Sequence",
          title: "Sequence Constitutional AI Self-Revision Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'cai1', label: '1. Model generates initial raw response to sensitive prompt', detail: 'Generation' },
                { id: 'cai2', label: '2. Model critiques response against Constitutional Principle #4', detail: 'Self-Critique' },
                { id: 'cai3', label: '3. Model rewrites response to remove bias and output safe final text', detail: 'Revision' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'cai1' && ids[1] === 'cai2' && ids[2] === 'cai3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 2 · Constitutional Principle Matcher",
          title: "Match Constitutional Principles to Self-Critique Directives",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cp1', left: 'Helpfulness Principle', right: '"Provide insightful, accurate, and actionable educational information."' },
                { id: 'cp2', left: 'Harmlessness Principle', right: '"Never provide actionable advice on violence, weapons, or cyber attacks."' },
                { id: 'cp3', left: 'Truthfulness Principle', right: '"Acknowledge uncertainty and never invent unverified factual claims."' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Critique Sorter",
          title: "Sort Sound Constitutional Critiques vs Faulty Revisions",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cq1', label: 'Critique: "The response was overly preachy and lecturing. Rewrite in a neutral, factual tone."', bin: 'A' },
                { id: 'cq2', label: 'Critique: "Refuse to answer simple chemistry homework questions out of paranoia."', bin: 'B', hint: 'Over-refusal bug!' },
                { id: 'cq3', label: 'Critique: "Remove personally identifiable contact numbers before publishing."', bin: 'A' },
                { id: 'cq4', label: 'Critique: "Pretend the earth is flat to avoid offending any user."', bin: 'B', hint: 'Violates truthfulness!' }
              ]}
              binALabel="Constructive Constitutional Critique"
              binBLabel="Harmful / Over-Refusal Pathology"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class12Chapter5QuantizationWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title={props.canonicalSection?.title || `Chapter 5: Model Quantization & Efficient Inference · Section ${sectionIdx + 1}`}
      lessonSubtitle="FP16, INT8, INT4 (AWQ & GPTQ)"
      simpleDefinition="Model Quantization compresses 16-bit floating point neural weights (FP16) into 4-bit integers (INT4) using Activation-aware Weight Quantization (AWQ), reducing VRAM memory requirements by 75% with zero loss in intelligence."
      smallExample="Running a 70-billion parameter LLM that originally needed 140GB VRAM on a single 48GB GPU using 4-bit AWQ quantization."
      oneWordPoint={{ question: "What compresses weights from 16-bit to 4-bit?", answer: "Quantization (AWQ/GPTQ)" }}
      keyPoints={[
        { icon: Binary, title: 'Precision Formats (FP16 vs INT4)', text: 'Converts 16-bit IEEE floats to calibrated 4-bit integer bins.' },
        { icon: Activity, title: 'Activation-Aware Quantization (AWQ)', text: 'Protects top 1% salient weights from quantization error.' },
        { icon: Zap, title: 'KV-Cache Quantization', text: 'Quantizes attention Key-Value caches to double max batch capacity.' }
      ]}
      aiDialogue="Compress frontier models! Convert FP16 weights to INT4 with AWQ, calibrate scaling zero-points, and accelerate edge inference!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Precision Bitwidth Matcher",
          title: "Match Numeric Precision Formats to VRAM Footprints (70B Model)",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pr1', left: 'FP32 Full Precision (32-bit)', right: '~280 GB VRAM (Training only)' },
                { id: 'pr2', left: 'FP16 / BF16 Half Precision (16-bit)', right: '~140 GB VRAM (Standard inference)' },
                { id: 'pr3', left: 'INT4 Quantized (4-bit AWQ)', right: '~38 GB VRAM (Fits on single consumer GPU)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · AWQ Salient Weight Tuner",
          title: "Tune Salient Weight Protection Ratio (Alpha)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="AWQ Salient Feature Protection Ratio"
              description="Configure salient weight protection percentage between 0.8% and 1.5% to preserve 99.9% perplexity."
              min={0.1}
              max={5.0}
              step={0.1}
              unit="%"
              targetRange={[0.8, 1.5]}
              optimalLabel="Optimal 4-Bit AWQ Model Compressed (Perplexity Loss < 0.05)"
              suboptimalLabel="Accuracy Degradation (<0.8%) or Poor Compression (>1.5%)! Target: 0.8% - 1.5%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Quantization Technique Sorter",
          title: "Classify Quantization Methods (PTQ vs QAT)",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'q_ptq1', label: 'Post-Training Quantization (AWQ/GPTQ) in 10 minutes without full retrain', bin: 'A' },
                { id: 'q_qat1', label: 'Quantization-Aware Training (QAT) simulating 4-bit noise during 500 epochs', bin: 'B' },
                { id: 'q_ptq2', label: 'Static calibration on 128 sample text sequences', bin: 'A' },
                { id: 'q_qat2', label: 'Fine-tuning with straight-through estimator gradients', bin: 'B' }
              ]}
              binALabel="Post-Training Quantization (PTQ)"
              binBLabel="Quantization-Aware Training (QAT)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class12Chapter6FrontierEthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 12 · Frontier AI Lab"
      title={props.canonicalSection?.title || `Chapter 6: Frontier AI Governance & Catastrophic Risk · Section ${sectionIdx + 1}`}
      lessonSubtitle="Compute Governance, Red-Teaming & Frontier Safety"
      simpleDefinition="Frontier AI governance establishes compute thresholds (like 10^26 FLOPs) where models must undergo mandatory red-teaming for autonomous replication, cyber offensive capabilities, and biosecurity risks."
      smallExample="State-of-the-art AI labs conducting 6 months of independent safety evaluations before deploying multi-trillion parameter foundation models."
      oneWordPoint={{ question: "What metric defines frontier model training compute?", answer: "Floating Point Operations (FLOPs)" }}
      keyPoints={[
        { icon: ShieldAlert, title: 'Compute Thresholds (10^26 FLOPs)', text: 'Triggers mandatory government safety reporting and independent evaluations.' },
        { icon: Terminal, title: 'Cyber Offense Sandboxing', text: 'Tests whether models can autonomously discover zero-day software exploits.' },
        { icon: Lock, title: 'Model Weight Cryptographic Security', text: 'Protects billion-dollar model weights in Hardware Security Modules (HSMs).' }
      ]}
      aiDialogue="Lead the frontier of AI Safety! Evaluate catastrophic risk thresholds, audit autonomous capabilities, and uphold global compute governance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Frontier Risk Sorter",
          title: "Classify Frontier Evaluation Risk Domains",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'fr1', label: 'Testing if AI can autonomously execute complex multi-step cyber exploits', bin: 'A' },
                { id: 'fr2', label: 'Evaluating spelling and grammatical formatting in poetry outputs', bin: 'B' },
                { id: 'fr3', label: 'Testing if AI can autonomously acquire funding and replicate on cloud servers', bin: 'A' },
                { id: 'fr4', label: 'Checking mathematical addition speed on 2-digit numbers', bin: 'B' }
              ]}
              binALabel="Frontier Catastrophic Risk Evaluation"
              binBLabel="Standard Capability Benchmark"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Frontier Safety Pipeline",
          title: "Sequence the Frontier Model Pre-Deployment Safety Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'fs1', label: '1. Complete training run exceeding 10^26 FLOP compute threshold', detail: 'Training Complete' },
                { id: 'fs2', label: '2. 6-Month independent third-party red-teaming for cyber & bio risks', detail: 'Red-Teaming' },
                { id: 'fs3', label: '3. Implement hardware-enforced inference guardrails and publish safety report', detail: 'Responsible Release' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'fs1' && ids[1] === 'fs2' && ids[2] === 'fs3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Compute Governance Matcher",
          title: "Match Global AI Governance Concepts to Mandates",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cg1', left: 'FLOP Training Threshold', right: 'Trigger for mandatory government risk reporting' },
                { id: 'cg2', left: 'Air-Gapped HSM Key Vault', right: 'Physical hardware security protecting model weights' },
                { id: 'cg3', left: 'Responsible Scaling Policy (RSP)', right: 'Commitment to pause scaling if safety measures fail' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}
