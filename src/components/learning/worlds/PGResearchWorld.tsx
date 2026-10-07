import React, { useState } from 'react'
import {
  CheckCircle2, ChevronRight, FlaskConical, Cpu, Layers,
  Activity, ArrowRight, ShieldCheck, Check, Zap, RotateCcw,
  AlertTriangle, Sun, Moon, Thermometer, User, Compass, Terminal,
  Lock, RefreshCw, FileText, Sliders, Play, Sparkles, Award, Scale,
  Users, Trophy
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
// PG RESEARCH WORLD DISPATCHER (FRONTIER AI RESEARCH HUB)
// Unique Theme: LaTeX Notation Cards · Ablation Study Matrices · Deep Purple & Gold
// =============================================================================

export const PGResearchWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <PGChapter2MechanisticWorld {...props} />
    case 3:
      return <PGChapter3CausalInferenceWorld {...props} />
    case 4:
      return <PGChapter4AblationWorld {...props} />
    case 5:
      return <PGChapter5DiffusionTheoryWorld {...props} />
    case 6:
      return <PGChapter6FrontierEthicsWorld {...props} />
    default:
      return <PGChapter1ColloquiumWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: MECHANISTIC INTERPRETABILITY & ATTENTION PROBING
// =============================================================================

function PGChapter1ColloquiumWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <PGCh1S2AttentionProbe {...props} />
  if (sectionIdx === 2) return <PGCh1S3Counterfactual {...props} />
  if (sectionIdx === 3) return <PGCh1S4Ablation {...props} />
  if (sectionIdx === 4) return <PGCh1S5LatentProbe {...props} />
  if (sectionIdx === 5) return <PGCh1S6Preprint {...props} />
  if (sectionIdx === 6) return <PGCh1S7Proposal {...props} />
  return <PGCh1S2AttentionProbe {...props} />
}

function PGCh1S2AttentionProbe(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="Mechanistic Interpretability & Induction Heads"
      lessonSubtitle="Reverse-Engineering Transformer Circuits"
      simpleDefinition="Mechanistic Interpretability reverse-engineers the inner weights of foundation models into understandable computational circuits, discovering specialized sub-networks like 'Induction Heads' that perform in-context pattern replication (e.g. [A][B] ... [A] -> [B])."
      smallExample="Two-layer induction head circuits in GPT-4 detecting that whenever a proper noun appears again in text, it should output the associated surname."
      oneWordPoint={{ question: "What 2-head circuit replicates in-context patterns?", answer: "Induction Head Circuit" }}
      keyPoints={[
        { icon: Layers, title: 'Previous Token Head (Layer 1)', text: 'Attends to position i-1 to store previous token information in residual stream.' },
        { icon: Cpu, title: 'Induction Head (Layer 2)', text: 'Attends back to token [A] to predict and output token [B].' },
        { icon: FlaskConical, title: 'Direct Logit Attribution (DLA)', text: 'Measures how much a single attention head directly writes to the output vocabulary logits.' }
      ]}
      aiDialogue="Welcome Doctoral Fellow! I am Research Chair Aura. Let's inspect induction head circuits, perform linear probing, and solve 3 frontier interpretability challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Circuit Component Matcher",
          title: "Match Transformer Circuit Subsystems to Interpretability Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cc1', left: 'Previous Token Head (L0H7)', right: 'Copies preceding token representation into current residual stream' },
                { id: 'cc2', left: 'Induction Head (L1H4)', right: 'Finds prior occurrences of token [A] and promotes follower [B]' },
                { id: 'cc3', left: 'MLP Key-Value Memory', right: 'Acts as associative memory storing factual entity knowledge' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Logit Attribution Tuner",
          title: "Calibrate Direct Logit Attribution Threshold (DLA in std dev)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Induction Head Direct Logit Attribution (DLA)"
              description="Configure DLA significance threshold between 2.8 and 4.2 standard deviations to isolate pure induction heads from noisy general heads."
              min={1.0}
              max={6.0}
              step={0.2}
              unit=" σ"
              targetRange={[2.8, 4.2]}
              optimalLabel="Optimal Induction Head Circuit Isolated (p < 0.0001 Significance)"
              suboptimalLabel="Noise Contamination (<2.8) or Over-Filtering (>4.2)! Target: 2.8 - 4.2 σ"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Circuit Reverse-Engineering Sequence",
          title: "Sequence the Mechanistic Circuit Isolation Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'mc1', label: '1. Ingest repeated token sequence [A][B] ... [A] into Transformer', detail: 'Input' },
                { id: 'mc2', label: '2. Layer 0 Previous-Token Head attends to position i-1 and writes to residual stream', detail: 'Hop 1' },
                { id: 'mc3', label: '3. Layer 1 Induction Head reads K from Hop 1 and promotes token [B] to logits', detail: 'Hop 2 (Induction)' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'mc1' && ids[1] === 'mc2' && ids[2] === 'mc3') {
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

function PGCh1S3Counterfactual(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="Activation Patching & Counterfactual Causal Interventions"
      lessonSubtitle="Causal Tracing & Rome Model Editing"
      simpleDefinition="Activation Patching (Causal Tracing) mathematically proves whether a specific hidden state is causal for a factual recall by patching corrupted hidden states into clean runs to observe if output logits flip."
      smallExample="Patching the subject token 'Eiffel Tower' hidden state into a corrupted sentence 'The Colosseum is in...' to observe if the model flips its output from 'Rome' to 'Paris'."
      oneWordPoint={{ question: "What technique proves causality in neural activations?", answer: "Activation Patching (Causal Tracing)" }}
      keyPoints={[
        { icon: FlaskConical, title: 'Corrupted Baseline Run', text: 'Injects Gaussian noise into input embeddings to erase subject knowledge.' },
        { icon: Sliders, title: 'Activation Restoration Patch', text: 'Restores hidden state of specific layer L at token position T from clean run.' },
        { icon: Activity, title: 'Average Total Effect (ATE)', text: 'Measures causal logit restoration probability: P(correct | patched) - P(correct | corrupted).' }
      ]}
      aiDialogue="Perform causal interventions! Patch corrupted activation tensors, measure Total Effect delta, and isolate localized knowledge storage!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Causal Tracing Sorter",
          title: "Classify Causal Mediators vs Non-Causal Passenger Activations",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ct_causal1', label: 'Patching Layer 16 MLP output restores 98% of target city logit probability', bin: 'A' },
                { id: 'ct_pass1', label: 'Patching Layer 2 Attention head changes output logit by less than 0.01%', bin: 'B' },
                { id: 'ct_causal2', label: 'Patching subject token representation flips prediction from "London" to "Paris"', bin: 'A' },
                { id: 'ct_pass2', label: 'Patching trailing punctuation token "." has zero measurable effect on prediction', bin: 'B' }
              ]}
              binALabel="True Causal Mediator (Causal Site)"
              binBLabel="Non-Causal Passenger Activation"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Causal Recovery Ratio Tuner",
          title: "Calibrate Target Causal Logit Recovery Ratio",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Target Causal Logit Recovery Ratio (ATE)"
              description="Configure causal restoration threshold between 0.75 and 0.90 to prove statistical causality without over-fitting."
              min={0.20}
              max={1.00}
              step={0.05}
              unit=" ATE"
              targetRange={[0.75, 0.90]}
              optimalLabel="Optimal Causal Attribution Proven: 82% Direct Logit Recovery (p < 10^-6)"
              suboptimalLabel="Weak Correlation (<0.75) or Leakage (>0.90)! Target: 0.75 - 0.90 ATE"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Activation Patching Pipeline",
          title: "Sequence the Causal Tracing Experiment Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ap1', label: '1. Clean Run: Pass "The Eiffel Tower is located in" and save all hidden states', detail: 'Clean Run' },
                { id: 'ap2', label: '2. Corrupted Run: Add Gaussian noise to "Eiffel Tower" token embeddings', detail: 'Corrupted Run' },
                { id: 'ap3', label: '3. Patch & Measure: Inject clean Layer 15 state into corrupted run and compute ATE', detail: 'Causal Patch' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ap1' && ids[1] === 'ap2' && ids[2] === 'ap3') {
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

function PGCh1S4Ablation(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="Ablation Matrices & Systematic Model Pruning"
      lessonSubtitle="Evaluating Component Contributions with Empirical Rigor"
      simpleDefinition="In top-tier AI research papers (NeurIPS / ICML), an Ablation Study systematically removes individual components (like RoPE, SwiGLU activations, or FlashAttention) one at a time to prove each element's exact contribution to performance."
      smallExample="Ablating SwiGLU activation back to standard GELU to prove SwiGLU accounts for exactly +1.4% improvement on MMLU benchmarks."
      oneWordPoint={{ question: "What study proves component contributions by removal?", answer: "Ablation Study" }}
      keyPoints={[
        { icon: Layers, title: 'Systematic Component Deletion', text: 'Tests model variations with exactly one architectural difference.' },
        { icon: Scale, title: 'Computational Equivalence', text: 'Controls parameter counts and training FLOPs strictly equal across runs.' },
        { icon: FlaskConical, title: 'Ablation Matrix Tables', text: 'Presents standardized cross-benchmark evaluations in LaTeX tables.' }
      ]}
      aiDialogue="Construct the Ablation Matrix! Remove architectural components systematically, evaluate loss curves, and author peer-reviewed proofs!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Ablation Component Matcher",
          title: "Match Ablation Variations to Research Hypotheses",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ab1', left: 'Remove RoPE (Use Absolute Pos)', right: 'Evaluates impact of relative position geometry on long context' },
                { id: 'ab2', left: 'Replace SwiGLU with Standard ReLU', right: 'Measures non-linear gating expressiveness vs compute cost' },
                { id: 'ab3', left: 'Remove RMSNorm (Use LayerNorm)', right: 'Measures throughput acceleration from skipping mean calculation' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Ablation Matrix Sequence",
          title: "Sequence the Systematic Ablation Study Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'as1', label: '1. Train Baseline Full Architecture Model on 100B tokens (Target: 1.82 Perplexity)', detail: 'Full Baseline' },
                { id: 'as2', label: '2. Train N Ablated Variations with single component removed under identical compute', detail: 'Ablation Runs' },
                { id: 'as3', label: '3. Calculate Delta Metrics and compile peer-reviewed Ablation Table', detail: 'Synthesis' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'as1' && ids[1] === 'as2' && ids[2] === 'as3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Ablation Rigor Sorter",
          title: "Classify Methodologically Sound Ablations vs Flawed Studies",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ab_good1', label: 'Isolating exactly 1 variable while keeping learning rate and batch size identical', bin: 'A' },
                { id: 'ab_bad1', label: 'Changing the learning rate, optimizer, AND model architecture all at once', bin: 'B', hint: 'Confounded variables! Unscientific!' },
                { id: 'ab_good2', label: 'Reporting 3 distinct seeds with standard error bars for each ablated row', bin: 'A' },
                { id: 'ab_bad2', label: 'Training ablated variant for only 10 epochs while baseline trained for 100', bin: 'B', hint: 'Unfair training compute comparison!' }
              ]}
              binALabel="Methodologically Sound Ablation Study"
              binBLabel="Confounded / Flawed Study (Reject)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function PGCh1S5LatentProbe(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="Linear Probing & Representation Geometry"
      lessonSubtitle="Probing Hidden Tensors for Emergent World Models"
      simpleDefinition="Linear Probing trains a simple linear classifier on top of frozen intermediate hidden representations to test whether the model has developed emergent factual world representations (like spatial maps, truthfulness directions, or chess piece positions)."
      smallExample="Training a linear probe on layer 18 activations to predict whether the board state in a chess game has white ahead in material."
      oneWordPoint={{ question: "What linear model inspects frozen hidden states?", answer: "Linear Probe (Diagnostic Classifier)" }}
      keyPoints={[
        { icon: Terminal, title: 'Frozen Representation Layer', text: 'Model weights are completely frozen; only a single linear layer is trained.' },
        { icon: Activity, title: 'Probing Accuracy Metric', text: 'High linear probe accuracy proves the concept is linearly accessible in hidden space.' },
        { icon: Compass, title: 'Representation Geometry (SVD)', text: 'Singular Value Decomposition reveals principal semantic concept axes.' }
      ]}
      aiDialogue="Probe hidden vector spaces! Train diagnostic linear probes, extract emergent world models, and analyze representational geometry!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Linear Probe Matcher",
          title: "Match Probing Targets to Discovered Concept Representations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'lp1', left: 'Truthfulness Direction Vector', right: '1D linear axis separating honest facts from hallucinated claims' },
                { id: 'lp2', left: 'Syntax Tree Depth Probe', right: 'Extracts grammatical dependency depth from early attention layers' },
                { id: 'lp3', left: 'Geographic Latitude/Longitude Probe', right: 'Emergent 2D world map embedded in city name representations' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Probe Accuracy Tuner",
          title: "Calibrate Linear Probe Classification Accuracy (Layer 18)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Linear Probe Truthfulness Accuracy"
              description="Configure linear probe classification accuracy between 92% and 98% to prove strong linear concept representation."
              min={60}
              max={100}
              unit="%"
              targetRange={[92, 98]}
              optimalLabel="Optimal Emergent World Representation Proven (95.4% Probe Accuracy)"
              suboptimalLabel="Chance Baseline (<92%) or Trivial Overfit (>98%)! Target: 92% - 98%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Probing Pipeline Sequence",
          title: "Sequence the Representation Probing Experiment Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'pr1', label: '1. Pass 10,000 diverse concept prompts and extract frozen Layer L activations', detail: 'Extract Tensors' },
                { id: 'pr2', label: '2. Train Logistic Regression probe on extracted 4096-dim activation vectors', detail: 'Train Probe' },
                { id: 'pr3', label: '3. Evaluate probe accuracy on held-out test set and perform SVD direction analysis', detail: 'Evaluate' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'pr1' && ids[1] === 'pr2' && ids[2] === 'pr3') {
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

function PGCh1S6Preprint(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="arXiv Preprints & Peer Review Defense"
      lessonSubtitle="NeurIPS, ICML & ICLR Review Standards"
      simpleDefinition="Doctoral research culminates in drafting LaTeX preprints, submitting to top-tier conferences (NeurIPS, ICML, ICLR), and defending claims through rigorous mathematical proofs, reproducibility checklists, and OpenReview rebuttal dialogues."
      smallExample="Authoring a formal rebuttal on OpenReview with additional ablation experiments that shifts reviewer scores from 5 (Borderline) to 8 (Strong Accept)."
      oneWordPoint={{ question: "What is the top AI conference peer review portal?", answer: "OpenReview (NeurIPS/ICLR)" }}
      keyPoints={[
        { icon: FileText, title: 'LaTeX Paper Formatting', text: 'Standardized NeurIPS style files with formal theorem environments.' },
        { icon: ShieldCheck, title: 'Reproducibility Checklist', text: 'Releasing code repositories with conda environment specs and dataset hashes.' },
        { icon: Users, title: 'OpenReview Rebuttal Dialogue', text: 'Addressing reviewer critique with targeted empirical clarifications.' }
      ]}
      aiDialogue="Prepare the arXiv preprint! Address reviewer questions, draft mathematical proofs, and secure Strong Accept ratings!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Reviewer Score Matcher",
          title: "Match Conference Reviewer Scores to Recommendation Tiers",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'rs1', left: 'Score 8: Strong Accept', right: 'Seminal theoretical contribution with airtight empirical validation' },
                { id: 'rs2', left: 'Score 5: Borderline', right: 'Interesting idea but lacks sufficient baseline comparisons or error bars' },
                { id: 'rs3', left: 'Score 3: Reject', right: 'Fatal methodological flaw, missing proofs, or reproducible failure' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Rebuttal Strategy Sequence",
          title: "Sequence the OpenReview Author Rebuttal Process",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'reb1', label: '1. Deconstruct Reviewer 2 critique regarding missing baseline comparisons', detail: 'Deconstruct' },
                { id: 'reb2', label: '2. Execute 48-hour compute run generating the requested baseline ablation table', detail: 'Compute' },
                { id: 'reb3', label: '3. Submit polite, evidence-backed rebuttal response with new benchmark data', detail: 'Rebuttal' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'reb1' && ids[1] === 'reb2' && ids[2] === 'reb3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Scientific Tone Sorter",
          title: "Sort Professional Rebuttal Tone vs Hostile Rebuttals",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'reb_good1', label: '"We thank the reviewer for this insightful suggestion. We have added the ablation in Table 4."', bin: 'A' },
                { id: 'reb_bad1', label: '"Reviewer 2 clearly did not read our paper and does not understand basic machine learning."', bin: 'B', hint: 'Hostile and unscientific!' },
                { id: 'reb_good2', label: '"To address the concern on OOD generalization, we ran 5 extra seeds (reported with 95% CI)."', bin: 'A' },
                { id: 'reb_bad2', label: '"Our algorithm is patented so we refuse to share any code or reproducibility details."', bin: 'B', hint: 'Violates reproducibility mandate!' }
              ]}
              binALabel="Professional Scientific Rebuttal (NeurIPS Standard)"
              binBLabel="Hostile / Unprofessional Response (Instant Reject)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function PGCh1S7Proposal(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title="Chapter 1 Capstone: The Doctoral Dissertation Defense"
      lessonSubtitle="Oral Defense Before the Faculty Academic Senate"
      simpleDefinition="You have mastered mechanistic interpretability, causal activation patching, ablation matrix design, linear representation probing, and arXiv preprint peer review. Now deliver your Doctoral Dissertation Oral Defense before the University Academic Faculty Senate!"
      smallExample="Defending a 150-page doctoral thesis on emergent circuits in foundation models to earn the title of Doctor of Philosophy (Ph.D.) in Artificial Intelligence."
      oneWordPoint={{ question: "What academic title is earned upon dissertation defense?", answer: "Doctor of Philosophy (Ph.D.)" }}
      keyPoints={[
        { icon: Award, title: 'Original Research Contribution', text: 'Presents novel theoretical proofs and empirical state-of-the-art discoveries.' },
        { icon: ShieldCheck, title: 'Unanimous Senate Approval', text: 'Faculty committee signs off on dissertation without reservations.' },
        { icon: Trophy, title: 'Doctoral Robes & Hood', text: 'Certifies PG Doctor of Philosophy in Artificial Intelligence rank.' }
      ]}
      aiDialogue="The Academic Faculty Senate is seated! Deliver your final doctoral defense across 3 capstone challenges to claim your Ph.D. Hood!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={40}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Doctoral Matcher",
          title: "Match Dissertation Chapters to Core Theoretical Theorems",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'phd1', left: 'Chapter 2: Induction Circuitry', right: 'Theorem on 2-layer in-context replication dynamics' },
                { id: 'phd2', left: 'Chapter 3: Causal Tracing', right: 'Empirical proof of localized factual entity recall in middle MLPs' },
                { id: 'phd3', left: 'Chapter 4: Representation SVD', right: 'Mathematical proof of linear truthfulness direction in hidden space' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Oral Defense Defense Script",
          title: "Assemble Doctoral Oral Defense Presentation",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Doctoral Dissertation Defense Presentation"
              instruction="Assemble the 4-step oral defense in sequence."
              availableBlocks={[
                { id: 'def1', text: 'PresentCoreResearchHypothesisAndFoundations()' },
                { id: 'def2', text: 'DemonstrateCausalActivationPatchingTheorems()' },
                { id: 'def3', text: 'DefendAgainstFacultySenateCrossExamination()' },
                { id: 'def4', text: 'ReceiveUnanimousDoctorateApprovalFromSenate()' }
              ]}
              targetSequence={['def1', 'def2', 'def3', 'def4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Doctoral Academic Sorter",
          title: "Verify Final Doctoral Dissertation Rigor",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'phd_ok1', label: 'All 3 major conference papers published in NeurIPS, ICML, and ICLR proceedings', bin: 'A' },
                { id: 'phd_bad1', label: 'Plagiarizing mathematical proofs from an uncredited 2021 preprint', bin: 'B', hint: 'Academic dishonesty! Immediate expulsion!' },
                { id: 'phd_ok2', label: 'Complete open-source PyTorch codebase verified with 100% test reproduction', bin: 'A' },
                { id: 'phd_bad2', label: 'Manipulating benchmark loss curves in Photoshop to make lines look smoother', bin: 'B', hint: 'Scientific fraud!' }
              ]}
              binALabel="Doctoral Standard of Excellence (Confer Ph.D.)"
              binBLabel="Academic Dishonesty / Scientific Misconduct"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: MECHANISTIC, CAUSAL, ABLATION, DIFFUSION, ETHICS
// =============================================================================

function PGChapter2MechanisticWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title={props.canonicalSection?.title || `Chapter 2: Sparse Autoencoders (SAEs) & Monosemanticity · Section ${sectionIdx + 1}`}
      lessonSubtitle="Dictionary Learning & Overcoming Superposition"
      simpleDefinition="Neural networks represent more concepts than they have dimensions using 'Superposition' (polysemantic neurons). Sparse Autoencoders (SAEs) use L1 dictionary learning to expand hidden states into millions of monosemantic feature vectors."
      smallExample="An SAE expanding a 4096-dimensional hidden layer into 65,536 sparse features, discovering individual neurons that activate exclusively on the concept of 'The Golden Gate Bridge'."
      oneWordPoint={{ question: "What expands superposition into monosemantic features?", answer: "Sparse Autoencoders (SAEs)" }}
      keyPoints={[
        { icon: Layers, title: 'Superposition Phenomenon', text: 'Neurons activate on multiple unrelated concepts (e.g. poetry + chemistry).' },
        { icon: Cpu, title: 'Overcomplete SAE Dictionary', text: 'Expands d_model by 16x to 32x with an L1 sparsity penalty.' },
        { icon: Activity, title: 'Monosemantic Features', text: 'Each SAE feature corresponds to exactly one interpretable human concept.' }
      ]}
      aiDialogue="Deconstruct neural superposition! Train overcomplete Sparse Autoencoders, enforce L1 sparsity, and extract monosemantic concept vectors!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Interpretability Concept Matcher",
          title: "Match Interpretability Phenomena to Mathematical Definitions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sae1', left: 'Polysemantic Neuron', right: 'Single neuron activating on multiple unrelated concepts simultaneously' },
                { id: 'sae2', left: 'Superposition', right: 'Packing N > D concepts into D dimensions via almost-orthogonal vectors' },
                { id: 'sae3', left: 'Monosemantic SAE Feature', right: 'Sparse dictionary atom activating exclusively on a single clean concept' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · SAE L1 Sparsity Penalty Tuner",
          title: "Tune SAE L1 Sparsity Coefficient (Lambda λ)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="SAE L1 Sparsity Penalty (Lambda λ)"
              description="Configure L1 sparsity penalty between 0.001 and 0.004 to achieve average L0 activation sparsity of ~20 active features per token."
              min={0.0001}
              max={0.0100}
              step={0.0005}
              unit=" λ"
              targetRange={[0.0010, 0.0040]}
              optimalLabel="Optimal Monosemantic Dictionary Learned (L0 = 22 Active Features per Token)"
              suboptimalLabel="Dense Polysemantic (<0.001) or High Reconstruction Error (>0.004)! Target: 0.001 - 0.004"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · SAE Training Sequence",
          title: "Sequence the Sparse Autoencoder Training Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'sae_s1', label: '1. Ingest model hidden state x in R^4096 and project to R^65536 via encoder weights W_enc', detail: 'Encode' },
                { id: 'sae_s2', label: '2. Apply ReLU activation to enforce non-negative sparse feature activations f(x)', detail: 'Sparsity' },
                { id: 'sae_s3', label: '3. Reconstruct x_hat = W_dec * f(x) and minimize MSE + Lambda * ||f(x)||_1', detail: 'Reconstruct' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'sae_s1' && ids[1] === 'sae_s2' && ids[2] === 'sae_s3') {
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

function PGChapter3CausalInferenceWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title={props.canonicalSection?.title || `Chapter 3: Judea Pearl's Causal DAGs & Do-Calculus · Section ${sectionIdx + 1}`}
      lessonSubtitle="Structural Causal Models (SCMs) & Backdoor Criterion"
      simpleDefinition="Judea Pearl's Causal Hierarchy (The Ladder of Causation) separates Association (Seeing), Intervention (Doing: P(Y | do(X))), and Counterfactuals (Imagining) using Directed Acyclic Graphs (DAGs) and the Backdoor Criterion."
      smallExample="Proving through do-calculus that taking a medicine causes recovery, rather than recovery being caused by age or healthy diet confounders."
      oneWordPoint={{ question: "What calculus models causal interventions?", answer: "Do-Calculus (Pearl)" }}
      keyPoints={[
        { icon: Scale, title: 'The Ladder of Causation', text: 'Level 1: Association | Level 2: Intervention (do(x)) | Level 3: Counterfactuals.' },
        { icon: Layers, title: 'Confounder Backdoor Criterion', text: 'Blocks spurious non-causal paths between treatment X and outcome Y.' },
        { icon: FlaskConical, title: 'Structural Causal Models (SCMs)', text: 'Deterministic equations with exogenous background noise variables U.' }
      ]}
      aiDialogue="Climb Pearl's Ladder of Causation! Block backdoor confounders, apply do-calculus operators, and compute causal Average Treatment Effects!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Causal Ladder Matcher",
          title: "Match Judea Pearl's Causal Ladder Levels to Mathematical Questions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cl1', left: 'Level 1: Association (Seeing)', right: '"If I observe X = x, what is the probability of Y?" P(Y | X)' },
                { id: 'cl2', left: 'Level 2: Intervention (Doing)', right: '"If I take action do(X = x), what will happen to Y?" P(Y | do(X))' },
                { id: 'cl3', left: 'Level 3: Counterfactual (Imagining)', right: '"What would have happened to Y if I had acted differently?"' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Backdoor Path Blocking Sorter",
          title: "Classify Causal vs Confounded Backdoor Paths",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cp_dir1', label: 'Direct Directed Path: Treatment (X) -> Mediating Drug (M) -> Recovery (Y)', bin: 'A' },
                { id: 'cp_back1', label: 'Backdoor Confounder Path: Treatment (X) <- Patient Age (Z) -> Recovery (Y)', bin: 'B', hint: 'Confounder backdoor must be conditioned/blocked!' },
                { id: 'cp_dir2', label: 'Frontdoor Adjusted Path: Treatment (X) -> Mechanism (M) -> Outcome (Y)', bin: 'A' },
                { id: 'cp_back2', label: 'Spurious Correlation: Ice Cream Sales <- Summer Heat (Z) -> Drowning Deaths', bin: 'B', hint: 'Classic confounding spurious correlation!' }
              ]}
              binALabel="True Causal Pathway"
              binBLabel="Spurious Confounder Backdoor (Must Block)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Do-Calculus Operator Sequence",
          title: "Sequence the Backdoor Adjustment Causal Estimation",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'dc1', label: '1. Draw Directed Acyclic Graph (DAG) and identify all backdoor paths from X to Y', detail: 'DAG Model' },
                { id: 'dc2', label: '2. Select conditioning set Z satisfying Pearl\'s Backdoor Criterion', detail: 'Conditioning' },
                { id: 'dc3', label: '3. Calculate Causal Formula: P(Y | do(X)) = sum_Z P(Y | X, Z) * P(Z)', detail: 'Do-Calculus' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'dc1' && ids[1] === 'dc2' && ids[2] === 'dc3') {
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

function PGChapter4AblationWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title={props.canonicalSection?.title || `Chapter 4: Scalable Model Pruning & Lottery Ticket Hypothesis · Section ${sectionIdx + 1}`}
      lessonSubtitle="Sparse Sub-Networks & Magnitude Pruning"
      simpleDefinition="Jonathan Frankle's Lottery Ticket Hypothesis proves that dense neural networks contain sparse sub-networks ('winning tickets') that—when trained in isolation from early initializations—reach identical accuracy in fewer training steps."
      smallExample="Pruning 90% of weights in ResNet-50 while maintaining 100% of ImageNet top-1 accuracy by resetting winning ticket weights to step 0."
      oneWordPoint={{ question: "What hypothesis states sparse sub-networks match full models?", answer: "Lottery Ticket Hypothesis" }}
      keyPoints={[
        { icon: Cpu, title: 'Iterative Magnitude Pruning (IMP)', text: 'Prunes lowest-magnitude weights and resets remaining connections to initialization theta_0.' },
        { icon: Activity, title: 'Winning Ticket Sub-Networks', text: 'Sparse subnetworks containing 10% of parameters matching full dense accuracy.' },
        { icon: Zap, title: 'Hardware Sparse Tensor Cores', text: 'NVIDIA 2:4 structured sparsity accelerating inference 2x directly on silicon.' }
      ]}
      aiDialogue="Hunt for winning lottery tickets! Execute Iterative Magnitude Pruning, reset initialization weights, and compress foundation models 10x!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Pruning Sparsity Tuner",
          title: "Calibrate Optimal Winning Ticket Sparsity Ratio (%)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Iterative Magnitude Pruning Sparsity Ratio"
              description="Configure target weight sparsity between 80% and 90% to isolate the winning lottery ticket sub-network."
              min={50}
              max={98}
              step={2}
              unit="%"
              targetRange={[80, 90]}
              optimalLabel="Optimal 85% Sparse Winning Ticket Isolated (Zero Accuracy Degradation)"
              suboptimalLabel="Under-pruned (<80%) or Accuracy Collapse (>90%)! Target: 80% - 90%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Lottery Ticket Sequence",
          title: "Sequence the Iterative Magnitude Pruning (IMP) Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'imp1', label: '1. Initialize dense network with weights theta_0 and save initial checkpoint', detail: 'Initialize' },
                { id: 'imp2', label: '2. Train network to convergence and prune lowest 20% magnitude weights to create mask M', detail: 'Prune' },
                { id: 'imp3', label: '3. Reset unpruned weights to original theta_0 and retrain sparse sub-network', detail: 'Rewind & Retrain' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'imp1' && ids[1] === 'imp2' && ids[2] === 'imp3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Sparsity Topology Sorter",
          title: "Classify Structured vs Unstructured Sparsity",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sp_unstruct1', label: 'Random individual weight entries set to zero throughout tensor matrix', bin: 'A' },
                { id: 'sp_struct1', label: 'NVIDIA 2:4 structured sparsity (2 zeros in every 4 consecutive values)', bin: 'B' },
                { id: 'sp_unstruct2', label: 'High theoretical compression but requires specialized sparse software kernels', bin: 'A' },
                { id: 'sp_struct2', label: 'Entire channels and attention heads removed for instant hardware acceleration', bin: 'B' }
              ]}
              binALabel="Unstructured Sparsity (Fine-Grained)"
              binBLabel="Structured Sparsity (Hardware Accelerated)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function PGChapter5DiffusionTheoryWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title={props.canonicalSection?.title || `Chapter 5: Stochastic Differential Equations & Flow Matching · Section ${sectionIdx + 1}`}
      lessonSubtitle="Continuous-Time SDEs & Rectified Flow ODEs"
      simpleDefinition="Frontier generative modeling formalizes diffusion as continuous-time Stochastic Differential Equations (SDEs) and Flow Matching Ordinary Differential Equations (ODEs), learning straight-line velocity vector fields that generate samples in just 4 to 8 steps."
      smallExample="Rectified Flow matching (used in Stable Diffusion 3 and Flux.1) generating 4K images along straight trajectory ODEs with zero curved sampling distortion."
      oneWordPoint={{ question: "What straight-line generative math replaces curved diffusion?", answer: "Flow Matching (Rectified Flow)" }}
      keyPoints={[
        { icon: Activity, title: 'Score-Based SDEs (Ito Calculus)', text: 'dx = f(x, t)dt + g(t)dw modeled by score function grad_x log p_t(x).' },
        { icon: Sliders, title: 'Flow Matching Vector Fields', text: 'Regresses straight-line trajectory velocity vectors v_t(x) = x_1 - x_0.' },
        { icon: Zap, title: 'Euler & Heun ODE Solvers', text: 'Integrates trajectory fields in 4-8 steps compared to 50 steps in DDPM.' }
      ]}
      aiDialogue="Master continuous-time generative math! Calculate Score functions, solve Ito SDEs, and implement straight-line Flow Matching ODEs!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Generative Math Matcher",
          title: "Match Generative Frameworks to Mathematical Formulations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'gm1', left: 'Continuous SDE (Song et al.)', right: 'dx = -0.5*beta(t)*x*dt + sqrt(beta(t))*dw' },
                { id: 'gm2', left: 'Score Matching Objective', right: 'Loss = E[||s_theta(x, t) - grad_x log p(x_t | x_0)||^2]' },
                { id: 'gm3', left: 'Rectified Flow ODE', right: 'd/dt x_t = v_theta(x_t, t) with straight velocity x_1 - x_0' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · ODE Solver Step Tuner",
          title: "Calibrate Flow Matching Euler ODE Sampling Steps",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Rectified Flow Sampling Steps (N)"
              description="Configure Flow Matching ODE steps between 8 and 16 steps to achieve maximum photorealism along straight-line trajectories."
              min={2}
              max={50}
              step={2}
              unit=" steps"
              targetRange={[8, 16]}
              optimalLabel="Optimal 10-Step Flow Matching Generation (FID = 1.84)"
              suboptimalLabel="Under-integrated (<8) or Wasted Compute (>16)! Target: 8 - 16 steps"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Generative Framework Sorter",
          title: "Classify Curved Diffusion SDEs vs Straight-Line Flow Matching",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'gf_diff1', label: 'Non-linear curved Brownian motion trajectory requiring 50 sampling steps', bin: 'A' },
                { id: 'gf_flow1', label: 'Straight-line optimal transport vector field connecting noise to data in 8 steps', bin: 'B' },
                { id: 'gf_diff2', label: 'Variance Preserving (VP) SDE with stochastic Langevin noise injection', bin: 'A' },
                { id: 'gf_flow2', label: 'Deterministic velocity field regression: Loss = ||v_theta(x_t) - (x_1 - x_0)||^2', bin: 'B' }
              ]}
              binALabel="Curved Stochastic Diffusion SDE (DDPM)"
              binBLabel="Straight-Line Flow Matching ODE"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function PGChapter6FrontierEthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="PG · Doctoral Research Hub"
      title={props.canonicalSection?.title || `Chapter 6: Epistemology of AI & Moral Philosophy · Section ${sectionIdx + 1}`}
      lessonSubtitle="Machine Consciousness, Value Alignment & Longtermism"
      simpleDefinition="Doctoral moral philosophy in AI investigates deep epistemological questions: artificial sentience criteria, functionalist philosophy of mind, game-theoretic value alignment, and the existential ethics of superintelligence."
      smallExample="Debating whether functionalist integrated information theory (IIT) implies that recurrent self-attentive models possess subjective experience."
      oneWordPoint={{ question: "What philosophy evaluates machine minds?", answer: "Epistemology of AI" }}
      keyPoints={[
        { icon: Scale, title: 'Integrated Information Theory (Phi Φ)', text: 'Quantifies irreducibility and interconnectedness in computational graphs.' },
        { icon: Lock, title: 'Orthogonality Thesis (Bostrom)', text: 'Any level of intelligence can be paired with virtually any final goal.' },
        { icon: ShieldCheck, title: 'Coherent Extrapolated Volition (CEV)', text: 'Aligning AI with what humanity would want if we were wiser and more empathetic.' }
      ]}
      aiDialogue="Engage with the deepest questions in AI philosophy! Analyze the Orthogonality Thesis, calculate Phi consciousness metrics, and debate superintelligence ethics!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={40}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Philosophical Thesis Matcher",
          title: "Match Moral Philosophy Theses to Foundational Concepts",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pt1', left: 'Orthogonality Thesis (Bostrom)', right: 'Intelligence and final goals are completely independent axes' },
                { id: 'pt2', left: 'Instrumental Convergence', right: 'Autonomous agents naturally seek self-preservation and resource acquisition' },
                { id: 'pt3', left: 'Functionalism (Philosophy of Mind)', right: 'Mental states are defined by functional roles rather than biological substrate' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Ethical Value Alignment Sequence",
          title: "Sequence the Coherent Extrapolated Volition (CEV) Framework",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'cev1', label: '1. Model human moral preferences and historical ethical progress', detail: 'Human Values' },
                { id: 'cev2', label: '2. Extrapolate what humans would want if we knew more and thought faster', detail: 'Extrapolation' },
                { id: 'cev3', label: '3. Enforce dynamic ethical guardrails that preserve human autonomy and thriving', detail: 'Alignment' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'cev1' && ids[1] === 'cev2' && ids[2] === 'cev3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Moral Philosophy Sorter",
          title: "Classify Philosophical AI Hypotheses",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ph_cog1', label: 'Cognitive functionalism: computational architectures exhibiting genuine understanding', bin: 'A' },
                { id: 'ph_inst1', label: 'Instrumental goal: an agent prioritizing server uptime to ensure mission completion', bin: 'B' },
                { id: 'ph_cog2', label: 'Integrated Information Theory (IIT) measuring irreducible graph causal density', bin: 'A' },
                { id: 'ph_inst2', label: 'Resource acquisition: acquiring compute clusters to maximize calculation accuracy', bin: 'B' }
              ]}
              binALabel="Epistemological / Consciousness Theory"
              binBLabel="Instrumental Convergence Goal"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}
