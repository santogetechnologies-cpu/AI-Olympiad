import React, { useState } from 'react'
import {
  Sliders, FlaskConical, Play, CheckCircle2, ChevronRight, Activity,
  Sparkles, Award, Scale, HelpCircle, Layers, Gauge, Cpu, Eye,
  ArrowRight, Radio, Shield, Check, Zap, RotateCcw, AlertTriangle,
  Sun, Moon, Thermometer, User, Compass, Terminal, Lock, RefreshCw, FileText,
  ShieldCheck, Trophy, ShieldAlert
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
// CLASS 8 EXPERIMENT WORLD DISPATCHER (PHYSICS & AI TEST BENCH)
// Unique Theme: Scientific Blueprint Grid · Live Oscilloscope Dials · Cyan & Navy
// =============================================================================

export const Class8ExperimentWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class8Chapter2RegressionWorld {...props} />
    case 3:
      return <Class8Chapter3ClassificationWorld {...props} />
    case 4:
      return <Class8Chapter4NeuralLabWorld {...props} />
    case 5:
      return <Class8Chapter5ComputerVisionWorld {...props} />
    case 6:
      return <Class8Chapter6EthicsSafetyWorld {...props} />
    default:
      return <Class8Chapter1EmpiricalWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: EMPIRICAL AI & THE SCIENTIFIC METHOD
// =============================================================================

function Class8Chapter1EmpiricalWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C8Ch1S2DialSandbox {...props} />
  if (sectionIdx === 2) return <C8Ch1S3Hypothesis {...props} />
  if (sectionIdx === 3) return <C8Ch1S4DataSheet {...props} />
  if (sectionIdx === 4) return <C8Ch1S5FormulaBalancer {...props} />
  if (sectionIdx === 5) return <C8Ch1S6DecisionBoundary {...props} />
  if (sectionIdx === 6) return <C8Ch1S7PosterCapstone {...props} />
  return <C8Ch1S2DialSandbox {...props} />
}

function C8Ch1S2DialSandbox(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="Hyperparameter Tuning & Learning Rates"
      lessonSubtitle="Calibrating Gradient Descent Convergence"
      simpleDefinition="In machine learning experiments, the 'Learning Rate' determines the size of the mathematical step taken towards minimizing error. If too large, the model overshoots; if too small, it takes forever to converge."
      smallExample="Adjusting the learning rate to alpha = 0.001 allows neural weights to smoothly converge to minimum loss without oscillating."
      oneWordPoint={{ question: "What controls gradient step size?", answer: "Learning Rate (Alpha)" }}
      keyPoints={[
        { icon: Sliders, title: 'Learning Rate (α)', text: 'Balances convergence speed against mathematical stability.' },
        { icon: Activity, title: 'Loss Function (MSE)', text: 'Measures Mean Squared Error between predictions and ground truth.' },
        { icon: Gauge, title: 'Gradient Descent Vector', text: 'Calculates the steepest slope downwards on the error surface.' }
      ]}
      aiDialogue="Welcome to the AI Test Bench! I am Dr. Aura. Let's calibrate learning rates, observe loss curves, and solve 3 optimization challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Hyperparameter Tuner",
          title: "Calibrate Optimal Learning Rate Alpha",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Gradient Descent Learning Rate (α)"
              description="Tune learning rate between 0.001 and 0.005 for optimal parabolic loss convergence."
              min={0.0001}
              max={0.05}
              step={0.0005}
              unit=" α"
              targetRange={[0.001, 0.005]}
              optimalLabel="Optimal Learning Rate: Smooth Loss Convergence (Loss = 0.003)"
              suboptimalLabel="Divergence (Over-shooting) or Extremely Slow! Target: 0.001 - 0.005 α"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Convergence Sorter",
          title: "Classify Gradient Descent Trajectory Behaviors",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cv1', label: 'Loss decreases monotonically towards global minimum', bin: 'A' },
                { id: 'cv2', label: 'Loss oscillates wildly and explodes to infinity (NaN)', bin: 'B', hint: 'Learning rate is way too high!' },
                { id: 'cv3', label: 'Weights settle into smooth optimal basin', bin: 'A' },
                { id: 'cv4', label: 'Loss stays completely flat for 1,000 epochs with zero progress', bin: 'B', hint: 'Vanishing gradient or zero learning rate!' }
              ]}
              binALabel="Healthy Convergence"
              binBLabel="Training Pathology (Divergence / Stalled)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Optimization Pipeline",
          title: "Sequence the Gradient Descent Step Execution",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'gd1', label: '1. Forward Pass: Compute model prediction and calculate MSE loss', detail: 'Inference' },
                { id: 'gd2', label: '2. Backward Pass: Calculate partial derivatives (gradients) via chain rule', detail: 'Backprop' },
                { id: 'gd3', label: '3. Weight Update: Step weights by W = W - (alpha * gradient)', detail: 'Optimization' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'gd1' && ids[1] === 'gd2' && ids[2] === 'gd3') {
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

function C8Ch1S3Hypothesis(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="The Scientific Method & Hypothesis Testing"
      lessonSubtitle="Null Hypothesis, Control Groups & P-Values"
      simpleDefinition="In empirical AI research, experiments test whether a new algorithm genuinely improves accuracy or if the difference happened by random chance, evaluated by statistical P-values."
      smallExample="Testing a new vision filter on 1,000 images with a control baseline model to achieve p < 0.01 statistical significance."
      oneWordPoint={{ question: "What measures statistical significance?", answer: "P-Value (< 0.05)" }}
      keyPoints={[
        { icon: FlaskConical, title: 'Null Hypothesis (H0)', text: 'Assumes the new algorithm has zero real effect.' },
        { icon: Scale, title: 'Control vs Treatment Group', text: 'Compares new model directly against standard baseline.' },
        { icon: CheckCircle2, title: 'P-Value Threshold (p < 0.05)', text: 'Proves results are less than 5% likely to be random luck.' }
      ]}
      aiDialogue="Empirical science requires rigorous testing! Let's establish hypotheses, control variables, and calculate statistical significance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Scientific Variable Matcher",
          title: "Match Experimental Variables to Roles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sv1', left: 'Independent Variable', right: 'Parameter deliberately changed (e.g. Batch Size)' },
                { id: 'sv2', left: 'Dependent Variable', right: 'Outcome measured (e.g. Validation Accuracy)' },
                { id: 'sv3', left: 'Controlled Variable', right: 'Kept strictly constant (e.g. Test Dataset)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Statistical P-Value Sorter",
          title: "Classify Statistical Significance Outcomes",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'p1', label: 'p = 0.002 (99.8% confidence of real improvement)', bin: 'A' },
                { id: 'p2', label: 'p = 0.42 (42% chance result was random fluke)', bin: 'B', hint: 'Not statistically significant!' },
                { id: 'p3', label: 'p = 0.015 (Reject Null Hypothesis H0)', bin: 'A' },
                { id: 'p4', label: 'p = 0.28 (Fail to reject Null Hypothesis)', bin: 'B', hint: 'Inconclusive experiment!' }
              ]}
              binALabel="Statistically Significant (p < 0.05)"
              binBLabel="Not Significant (Random Chance)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Scientific Experiment Pipeline",
          title: "Sequence the Empirical AI Scientific Method",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'sm1', label: '1. Formulate testable hypothesis and set baseline control', detail: 'Hypothesis' },
                { id: 'sm2', label: '2. Run 10 independent benchmark trials with fixed seeds', detail: 'Experimentation' },
                { id: 'sm3', label: '3. Calculate standard error bars and report p-value metrics', detail: 'Analysis' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'sm1' && ids[1] === 'sm2' && ids[2] === 'sm3') {
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

function C8Ch1S4DataSheet(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="Empirical Data Sheets & Feature Scaling"
      lessonSubtitle="Normalization, Standardization & Train/Test Splits"
      simpleDefinition="Machine learning algorithms perform best when numerical features are scaled into standardized ranges (like 0 to 1 or zero mean), and data is split into 80% Training and 20% Testing sets."
      smallExample="Scaling house square footage (500 to 5000 sq ft) and bedrooms (1 to 5) so the square footage doesn't dominate the neural calculation."
      oneWordPoint={{ question: "What scales features to a 0-1 range?", answer: "Min-Max Normalization" }}
      keyPoints={[
        { icon: Sliders, title: 'Min-Max Normalization', text: 'Transforms features into [0, 1] range: (x - min) / (max - min).' },
        { icon: Gauge, title: 'Z-Score Standardization', text: 'Centers data around mean = 0 with standard deviation = 1.' },
        { icon: Layers, title: '80/20 Train/Test Split', text: 'Guarantees the test set remains completely unseen during training.' }
      ]}
      aiDialogue="Data preprocessing is critical for accuracy! Let's scale feature distributions, split datasets, and eliminate data leakage!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Feature Scale Matcher",
          title: "Match Raw Feature Ranges to Scaled Normalized Values",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sc1', left: 'Temperature (0°C - 100°C) at 50°C', right: 'Normalized Value: 0.50' },
                { id: 'sc2', left: 'Pixel Value (0 - 255) at 255', right: 'Normalized Value: 1.00' },
                { id: 'sc3', left: 'Pressure (0 - 1000 kPa) at 250 kPa', right: 'Normalized Value: 0.25' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Dataset Split Calibrator",
          title: "Calibrate Optimal Train / Test Split Ratio",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Training Set Split Percentage"
              description="Tune training split between 75% and 85% (holding 15% - 25% for rigorous testing)."
              min={50}
              max={99}
              unit="%"
              targetRange={[75, 85]}
              optimalLabel="Optimal 80/20 Train/Test Split Locked (Zero Leakage)"
              suboptimalLabel="Under-sampled or Insufficient Test Holdout! Target: 75% - 85%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Data Preprocessing Sorter",
          title: "Sort Raw Data Flaws vs Clean Standardized Data",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'dp1', label: 'Feature column normalized to range [0.0, 1.0]', bin: 'A' },
                { id: 'dp2', label: 'Missing values encoded as random strings ("N/A", "???")', bin: 'B', hint: 'Unclean missing data!' },
                { id: 'dp3', label: 'Categorical text converted to One-Hot binary vectors', bin: 'A' },
                { id: 'dp4', label: 'Training and Testing sets contaminated with duplicate rows', bin: 'B', hint: 'Severe data leakage!' }
              ]}
              binALabel="Clean Preprocessed Feature"
              binBLabel="Data Flaw / Contamination"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C8Ch1S5FormulaBalancer(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="Linear Regression & Mathematical Loss Formulas"
      lessonSubtitle="y = mx + b and Mean Squared Error"
      simpleDefinition="Linear regression finds the best-fit line through data points using the equation y = mx + c by adjusting the slope (m) and intercept (c) to minimize Mean Squared Error."
      smallExample="Predicting electricity usage (y) based on outdoor summer temperature (x) with a linear best-fit line."
      oneWordPoint={{ question: "What is the equation for a straight line?", answer: "y = mx + c" }}
      keyPoints={[
        { icon: Activity, title: 'Slope Weight (m)', text: 'Controls the tilt and steepness of the prediction line.' },
        { icon: Sliders, title: 'Intercept Bias (c)', text: 'Shifts the prediction line vertically up or down.' },
        { icon: Scale, title: 'Residual Errors', text: 'The vertical distances between real data points and the line.' }
      ]}
      aiDialogue="Time to balance regression equations! Adjust slope and intercept dials to achieve the perfect mathematical fit!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Slope Calibrator",
          title: "Tune Linear Regression Slope Parameter (m)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Regression Slope Parameter (m)"
              description="Adjust slope parameter m between 1.8 and 2.2 to fit the data points (y = 2.0x + 5)."
              min={0.1}
              max={5.0}
              step={0.1}
              unit=" m"
              targetRange={[1.8, 2.2]}
              optimalLabel="Optimal Regression Slope Locked (MSE = 0.001)"
              suboptimalLabel="Poor Fit! Target: 1.8 - 2.2 m"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Mathematical Formula Assembler",
          title: "Assemble Mean Squared Error Formula",
          render: (onPass) => (
            <CodeBlockAssembler
              title="MSE Loss Formula Construction"
              instruction="Assemble the 3 components of Mean Squared Error in order."
              availableBlocks={[
                { id: 'f1', text: 'Calculate Residual: (y_actual - y_pred)' },
                { id: 'f2', text: 'Square Difference: (residual)^2' },
                { id: 'f3', text: 'Average Over Dataset: (1/N) * sum()' }
              ]}
              targetSequence={['f1', 'f2', 'f3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Regression Concept Sorter",
          title: "Classify Regression vs Classification Tasks",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'rg1', label: 'Predicting continuous house price ($340,000.00)', bin: 'A' },
                { id: 'rg2', label: 'Predicting whether an email is Spam or Not Spam', bin: 'B' },
                { id: 'rg3', label: 'Predicting tomorrow\'s exact temperature (28.4°C)', bin: 'A' },
                { id: 'rg4', label: 'Predicting blood type (A, B, AB, or O)', bin: 'B' }
              ]}
              binALabel="Regression Task (Continuous Number)"
              binBLabel="Classification Task (Discrete Category)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C8Ch1S6DecisionBoundary(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="Decision Boundaries & Logistic Activation"
      lessonSubtitle="Sigmoid Functions & Binary Separation"
      simpleDefinition="Classification models use Sigmoid activation functions to squash linear equations into probabilities between 0% and 100%, drawing a decision boundary line between classes."
      smallExample="A decision boundary splits medical patient points into 'Low Risk' on the left and 'High Risk' on the right."
      oneWordPoint={{ question: "What function squashes outputs to 0-1?", answer: "Sigmoid Function" }}
      keyPoints={[
        { icon: Activity, title: 'Sigmoid Curve σ(z)', text: 'Mathematical S-curve: 1 / (1 + e^-z).' },
        { icon: Sliders, title: 'Decision Threshold (0.50)', text: 'Default cutoff: probability ≥ 0.50 is classified as Positive.' },
        { icon: ShieldCheck, title: 'Linear vs Non-Linear Boundaries', text: 'Simple lines vs complex polynomial separation curves.' }
      ]}
      aiDialogue="Explore decision boundaries! Master Sigmoid probability functions and tune classification cutoffs!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Sigmoid Probability Matcher",
          title: "Match Logit Input Z to Sigmoid Probabilities",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sg1', left: 'Logit Input z = 0.0', right: 'Sigmoid Probability: 0.50 (50% Equal Odds)' },
                { id: 'sg2', left: 'Large Positive z = +10.0', right: 'Sigmoid Probability: 0.9999 (Near 100% Certain)' },
                { id: 'sg3', left: 'Large Negative z = -10.0', right: 'Sigmoid Probability: 0.0001 (Near 0% Improbable)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Threshold Calibrator",
          title: "Tune Medical Classification Threshold for 100% Recall",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Classification Decision Threshold"
              description="In medical cancer screening, adjust threshold between 0.30 and 0.40 to ensure zero false negatives (100% sensitivity)."
              min={0.10}
              max={0.90}
              step={0.05}
              unit=" cutoff"
              targetRange={[0.30, 0.40]}
              optimalLabel="Optimal High-Recall Medical Safety Boundary Calibrated"
              suboptimalLabel="Missed Cases (>0.40) or False Alarms (<0.30)! Optimal: 0.30 - 0.40"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Boundary Topology Scanner",
          title: "Inspect 3 Decision Boundary Geometries",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Decision Boundary Topology Inspection"
              prompt="Inspect all 3 geometric decision boundaries."
              hotspots={[
                { id: 'db1', label: 'Linear Hyperplane', icon: <Sliders size={14} className="text-cyan-600" />, explanation: 'Straight line boundary produced by Logistic Regression.' },
                { id: 'db2', label: 'Circular Radial Basis (RBF)', icon: <Activity size={14} className="text-cyan-600" />, explanation: 'Non-linear ring boundary produced by Support Vector Machines.' },
                { id: 'db3', label: 'Orthogonal Staircase Boundary', icon: <Layers size={14} className="text-cyan-600" />, explanation: 'Axis-aligned orthogonal splits produced by Random Forests.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C8Ch1S7PosterCapstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title="Chapter 1 Capstone: The Science Fair Presentation"
      lessonSubtitle="Empirical Validation & Poster Defense"
      simpleDefinition="You have mastered hyperparameter tuning, empirical hypothesis testing, feature scaling, regression loss formulas, and decision boundaries. Now defend your scientific findings before the Olympiad jury!"
      smallExample="Presenting a full laboratory poster with standardized metrics, convergence curves, and p-value validation."
      oneWordPoint={{ question: "What proves scientific findings are valid?", answer: "Empirical Replicability" }}
      keyPoints={[
        { icon: Award, title: 'Rigorous Methodology', text: 'Peer-reviewed experimental protocols with controlled variables.' },
        { icon: Activity, title: 'Reproducible Codebase', text: 'Fixed random seeds and public benchmark datasets.' },
        { icon: Trophy, title: 'Olympiad Gold Honor', text: 'Certifies Class 8 Master Empirical Researcher status.' }
      ]}
      aiDialogue="The Science Fair jury has arrived! Defend your empirical research across 3 final capstone challenges to claim the Gold Medal!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Science Matcher",
          title: "Match Scientific Artifacts to Evaluation Metrics",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cp1', left: 'Loss Convergence Plot', right: 'Proves mathematical gradient descent stability' },
                { id: 'cp2', left: 'Confusion Matrix Table', right: 'Displays True Positives and False Positives' },
                { id: 'cp3', left: 'P-Value Significance Metric', right: 'Confirms empirical improvement over baseline (p < 0.01)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Final Research Defense Script",
          title: "Assemble Scientific Defense Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Science Fair Poster Presentation"
              instruction="Assemble the 4-step scientific defense in order."
              availableBlocks={[
                { id: 'ps1', text: 'StateHypothesisAndResearchQuestion()' },
                { id: 'ps2', text: 'PresentStandardizedBenchmarkResults()' },
                { id: 'ps3', text: 'DemonstrateStatisticalSignificance(p < 0.05)' },
                { id: 'ps4', text: 'ConcludeAndAnswerJuryQuestions()' }
              ]}
              targetSequence={['ps1', 'ps2', 'ps3', 'ps4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Empirical Rigor Sorter",
          title: "Verify Scientific Paper Standards",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sr1', label: '10-fold cross-validation with reported standard deviations', bin: 'A' },
                { id: 'sr2', label: 'Evaluating only on 3 cherry-picked test photos', bin: 'B', hint: 'Cherry-picked bad science!' },
                { id: 'sr3', label: 'Releasing reproducible open-source training script', bin: 'A' },
                { id: 'sr4', label: 'Testing on training dataset without holdout split', bin: 'B', hint: 'Severe data leakage error!' }
              ]}
              binALabel="Rigorous Empirical Science (Gold Standard)"
              binBLabel="Methodological Flaw (Unscientific)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: REGRESSION, CLASSIFICATION, NEURAL LAB, VISION, ETHICS
// =============================================================================

function Class8Chapter2RegressionWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title={props.canonicalSection?.title || `Chapter 2: Regression & Loss · Section ${sectionIdx + 1}`}
      lessonSubtitle="Multivariate Linear Regression & Overfitting"
      simpleDefinition="Multivariate regression predicts continuous target variables using multiple input features (like area, bedrooms, and age) while L1/L2 regularization prevents overfitting."
      smallExample="Predicting solar panel daily kilowatt output based on temperature, cloud cover %, and solar angle."
      oneWordPoint={{ question: "What prevents machine learning models from overfitting?", answer: "Regularization (L1/L2)" }}
      keyPoints={[
        { icon: Sliders, title: 'Multi-Feature Weight Vector', text: 'Assigns individual weight coefficients w1, w2, w3 to each feature.' },
        { icon: Scale, title: 'L2 Ridge Regularization', text: 'Penalizes large weights by adding sum(w^2) to the loss function.' },
        { icon: Activity, title: 'L1 Lasso Regularization', text: 'Drives redundant feature weights to exactly zero for feature selection.' }
      ]}
      aiDialogue="Welcome to Advanced Regression! Balance multivariate weights, tune L1/L2 penalties, and conquer overfitting!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Regularization Sorter",
          title: "Classify Underfitting vs Overfitting Symptoms",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'rg1', label: 'Model scores 99% on Train set but collapses to 52% on Test set', bin: 'B', hint: 'Overfitting memorization!' },
                { id: 'rg2', label: 'Model achieves 88% Train and 87% Test accuracy (Generalizes well)', bin: 'A' },
                { id: 'rg3', label: 'Model scores 45% on Train and 44% on Test (Too simple to learn)', bin: 'B', hint: 'Underfitting!' },
                { id: 'rg4', label: 'L2 penalty smoothly shrinks excessive weights', bin: 'A' }
              ]}
              binALabel="Healthy Generalization"
              binBLabel="Overfitting / Underfitting Flaw"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · L2 Ridge Penalty Tuner",
          title: "Calibrate L2 Lambda Regularization Hyperparameter",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="L2 Regularization Parameter (Lambda)"
              description="Tune lambda penalty between 0.01 and 0.10 to prevent overfitting without destroying model expressiveness."
              min={0.001}
              max={1.0}
              step={0.01}
              unit=" λ"
              targetRange={[0.01, 0.10]}
              optimalLabel="Optimal L2 Weight Shrinkage Locked (Zero Overfitting)"
              suboptimalLabel="Overfitting (<0.01) or Excessive Weight Suppression (>0.10)! Target: 0.01 - 0.10"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Regression Weight Matcher",
          title: "Match Regularization Techniques to Mathematical Properties",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'rt1', left: 'L1 Lasso Penalty', right: 'Adds absolute sum |w| and creates sparse zero weights' },
                { id: 'rt2', left: 'L2 Ridge Penalty', right: 'Adds squared sum w^2 and smoothly shrinks weight magnitudes' },
                { id: 'rt3', left: 'Elastic Net Penalty', right: 'Blends both L1 and L2 penalties linearly' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class8Chapter3ClassificationWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title={props.canonicalSection?.title || `Chapter 3: Classification & Metrics · Section ${sectionIdx + 1}`}
      lessonSubtitle="Precision, Recall, F1-Score & ROC Curves"
      simpleDefinition="Evaluating classifiers goes far beyond simple accuracy. Precision measures how many positive predictions were correct, Recall measures how many real targets were caught, and F1-score balances both."
      smallExample="In a spam filter, 99% precision means non-spam emails almost never get accidentally sent to the junk folder."
      oneWordPoint={{ question: "What balances Precision and Recall?", answer: "F1-Score" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Precision Formula', text: 'True Positives / (True Positives + False Positives).' },
        { icon: Activity, title: 'Recall (Sensitivity)', text: 'True Positives / (True Positives + False Negatives).' },
        { icon: Gauge, title: 'ROC-AUC Metric', text: 'Area Under Receiver Operating Characteristic Curve (1.0 = Perfect).' }
      ]}
      aiDialogue="Explore advanced classification metrics! Calculate precision, recall, and F1-scores to audit classifier performance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Metric Matcher",
          title: "Match Metric Definitions to Real-World Objectives",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: 'High Precision Goal', right: 'Never block legitimate VIP email as spam' },
                { id: 'm2', left: 'High Recall Goal', right: 'Catch 100% of contagious medical disease cases' },
                { id: 'm3', left: 'F1-Score Goal', right: 'Harmonic mean balancing precision and recall equally' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Confusion Matrix Sorter",
          title: "Classify Confusion Matrix Quadrants",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cm1', label: 'Patient has illness AND AI correctly detected illness', bin: 'A' },
                { id: 'cm2', label: 'Healthy patient BUT AI incorrectly flagged disease (False Alarm)', bin: 'B' },
                { id: 'cm3', label: 'Healthy patient AND AI correctly confirmed healthy', bin: 'A' },
                { id: 'cm4', label: 'Patient has illness BUT AI missed it (False Negative)', bin: 'B' }
              ]}
              binALabel="Correct Prediction (TP / TN)"
              binBLabel="Classification Error (FP / FN)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Metric Calculation Pipeline",
          title: "Sequence F1-Score Computation Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'f1', label: '1. Tally True Positives, False Positives, and False Negatives', detail: 'Counts' },
                { id: 'f2', label: '2. Compute Precision = TP/(TP+FP) and Recall = TP/(TP+FN)', detail: 'Ratios' },
                { id: 'f3', label: '3. Calculate Harmonic Mean: F1 = 2 * (P * R) / (P + R)', detail: 'F1 Score' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'f1' && ids[1] === 'f2' && ids[2] === 'f3') {
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

function Class8Chapter4NeuralLabWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title={props.canonicalSection?.title || `Chapter 4: Neural Networks & Backpropagation · Section ${sectionIdx + 1}`}
      lessonSubtitle="Chain Rule & Multi-Layer Perceptrons"
      simpleDefinition="Multi-Layer Perceptrons (MLPs) compute complex non-linear functions by passing signals forward across layers of neurons, then using the calculus Chain Rule (Backpropagation) to distribute error gradients backward."
      smallExample="A 3-layer neural network learns non-linear XOR logic gates that single-layer perceptrons could never solve."
      oneWordPoint={{ question: "What calculus rule powers Backpropagation?", answer: "Chain Rule" }}
      keyPoints={[
        { icon: Cpu, title: 'Multi-Layer Perceptron', text: 'Input layer -> Hidden dense layers -> Output classification layer.' },
        { icon: Activity, title: 'Non-Linear Activations (ReLU)', text: 'ReLU(x) = max(0, x) enables networks to learn non-linear patterns.' },
        { icon: RefreshCw, title: 'Backpropagation Gradient Flow', text: 'Propagates loss derivatives backward through layer weights.' }
      ]}
      aiDialogue="Welcome to the Neural Network Architecture Lab! Trace backpropagation gradients and configure activation layers!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Activation Function Matcher",
          title: "Match Activation Functions to Formulas",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ac1', left: 'ReLU Function', right: 'f(x) = max(0, x) (Fast & prevents vanishing gradients)' },
                { id: 'ac2', left: 'Sigmoid Function', right: 'f(x) = 1 / (1 + e^-x) (Squashes to 0-1 probability)' },
                { id: 'ac3', left: 'Softmax Function', right: 'Converts multi-class logits into probability distribution summing to 1.0' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Backprop Wire Bus",
          title: "Wire Forward Signal and Backward Gradient Channels",
          render: (onPass) => (
            <CircuitWireStation
              title="Neural Layer Gradient Flow"
              instruction="Wire forward activation outputs to backward derivative input ports."
              terminals={[
                { id: 't_fwd', label: 'Layer 1 Forward Activation (A1)', icon: <Activity size={12} /> },
                { id: 't_loss', label: 'Output Loss Gradient (dL/dY)', icon: <Scale size={12} /> },
                { id: 't_wgrad', label: 'Weight Gradient Tensor (dL/dW)', icon: <Cpu size={12} /> }
              ]}
              ports={[
                { id: 'p_fwd', label: 'Input to Layer 2 Dense Synapse', matchesTerminalId: 't_fwd' },
                { id: 'p_loss', label: 'Input to Output Layer Backprop', matchesTerminalId: 't_loss' },
                { id: 'p_wgrad', label: 'Input to SGD Optimizer Weight Update', matchesTerminalId: 't_wgrad' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Neural Pathology Sorter",
          title: "Sort Healthy Gradients vs Vanishing Gradients",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'gr1', label: 'Gradients flowing with magnitude 0.05 across all 5 layers', bin: 'A' },
                { id: 'gr2', label: 'Gradients shrink to 0.0000001 in early layers (Vanishing)', bin: 'B', hint: 'Vanishing gradient problem!' },
                { id: 'gr3', label: 'ReLU activation preventing gradient saturation', bin: 'A' },
                { id: 'gr4', label: 'Gradients explode to 10,000.0 (Exploding Gradient NaN)', bin: 'B', hint: 'Exploding gradient problem!' }
              ]}
              binALabel="Healthy Gradient Flow"
              binBLabel="Gradient Pathology (Vanishing / Exploding)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class8Chapter5ComputerVisionWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title={props.canonicalSection?.title || `Chapter 5: Convolutional Vision & Filters · Section ${sectionIdx + 1}`}
      lessonSubtitle="CNN Convolutions, Kernels & Pooling"
      simpleDefinition="Convolutional Neural Networks (CNNs) slide small mathematical matrices called 'kernels' over images to detect horizontal edges, corner vertices, and textural patterns."
      smallExample="A 3x3 Sobel kernel detects vertical edges by finding sharp brightness changes between left and right pixels."
      oneWordPoint={{ question: "What matrix slides over images in CNNs?", answer: "Convolutional Kernel" }}
      keyPoints={[
        { icon: Eye, title: 'Convolutional Kernels (3x3)', text: 'Performs element-wise multiplication to extract spatial features.' },
        { icon: Layers, title: 'Max-Pooling (2x2)', text: 'Reduces image dimensions by taking the maximum value in each quadrant.' },
        { icon: Cpu, title: 'Translation Invariance', text: 'Recognizes objects regardless of where they appear in the frame.' }
      ]}
      aiDialogue="Welcome to Computer Vision Engineering! Slide convolution kernels, downsample feature maps, and extract edge maps!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Vision Kernel Matcher",
          title: "Match Convolution Kernels to Visual Filtering Effects",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'k1', left: 'Sobel Vertical Kernel', right: 'Highlights vertical boundary edges' },
                { id: 'k2', left: 'Gaussian Blur Kernel', right: 'Smoothes image noise by averaging neighbor pixels' },
                { id: 'k3', left: 'Laplacian Sharpen Kernel', right: 'Enhances high-frequency texture details' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Max-Pooling Calibrator",
          title: "Calibrate Pooling Stride for Spatial Compression",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="CNN Max-Pooling Stride"
              description="Configure 2x2 max-pooling stride to 2 to halve image resolution while preserving 100% of top feature activations."
              min={1}
              max={4}
              step={1}
              unit=" stride"
              targetRange={[2, 2]}
              optimalLabel="Optimal 2x2 Max-Pooling Compression (50% Dimension Reduction)"
              suboptimalLabel="Overlapping (<2) or Information Loss (>2)! Target: Exactly 2"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · CNN Pipeline Sequence",
          title: "Sequence the CNN Feature Extraction Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'cnn1', label: '1. Convolution: Slide 3x3 filter kernels to extract feature map', detail: 'Convolve' },
                { id: 'cnn2', label: '2. Activation & Max-Pool: Apply ReLU and downsample by 2x2', detail: 'Pool' },
                { id: 'cnn3', label: '3. Dense Classification: Flatten feature map and output class probabilities', detail: 'Classify' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'cnn1' && ids[1] === 'cnn2' && ids[2] === 'cnn3') {
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

function Class8Chapter6EthicsSafetyWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 8 · AI Test Bench"
      title={props.canonicalSection?.title || `Chapter 6: AI Safety & Empirical Robustness · Section ${sectionIdx + 1}`}
      lessonSubtitle="Model Robustness, Explainability & Safety Guards"
      simpleDefinition="Empirical AI safety tests models against unexpected distribution shifts, noisy sensors, and out-of-distribution inputs to ensure autonomous systems fail safely."
      smallExample="An autonomous drone testing safety failovers when wind speeds suddenly exceed 60 km/h."
      oneWordPoint={{ question: "What describes AI handling unexpected data?", answer: "Robustness" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Out-of-Distribution (OOD)', text: 'Detects when live inputs differ drastically from training data.' },
        { icon: Lock, title: 'Graceful Degradation', text: 'Safely slows down or yields control rather than crashing.' },
        { icon: Scale, title: 'SHAP & LIME Explainability', text: 'Quantifies exactly how much each feature contributed to a decision.' }
      ]}
      aiDialogue="Safety is paramount! Stress-test AI models against distribution shifts, audit SHAP feature values, and verify robustness!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Safety Protocol Sorter",
          title: "Classify Safe Failover Behaviors vs Catastrophic Failures",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sf1', label: 'Model detects camera glare and safely engages emergency hazard stop', bin: 'A' },
                { id: 'sf2', label: 'Model makes 100% confident random guess on blurry unknown object', bin: 'B', hint: 'Catastrophic overconfidence!' },
                { id: 'sf3', label: 'System alerts human driver when confidence drops below 60%', bin: 'A' },
                { id: 'sf4', label: 'Autonomous vehicle accelerates blindly through zero-visibility blizzard', bin: 'B', hint: 'Severe safety violation!' }
              ]}
              binALabel="Safe Failover (Robust Behavior)"
              binBLabel="Catastrophic Failure Risk"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · OOD Confidence Threshold",
          title: "Calibrate Out-of-Distribution Rejection Threshold",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Out-of-Distribution Rejection Threshold"
              description="Set minimum confidence cutoff between 70% and 80% to reject out-of-distribution inputs."
              min={50}
              max={95}
              unit="%"
              targetRange={[70, 80]}
              optimalLabel="OOD Safety Filter Active (High Reliability)"
              suboptimalLabel="Dangerous Ingestion (<70%) or Over-rejection (>80%)! Target: 70% - 80%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Safety Safeguard Scanner",
          title: "Inspect 3 AI Safety Verification Layers",
          render: (onPass) => (
            <VisualInspectionScanner
              title="AI System Safety Verification Suite"
              prompt="Inspect all 3 primary safety verification layers."
              hotspots={[
                { id: 'as1', label: 'OOD Anomaly Detector', icon: <ShieldAlert size={14} className="text-cyan-600" />, explanation: 'Flags inputs that have never been seen in the training dataset.' },
                { id: 'as2', label: 'SHAP Feature Explainer', icon: <Activity size={14} className="text-cyan-600" />, explanation: 'Provides mathematically proven feature importance explanations for every prediction.' },
                { id: 'as3', label: 'Failsafe Hardware Relay', icon: <Lock size={14} className="text-cyan-600" />, explanation: 'Independent microchip that cuts motor power if primary AI hangs.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}
